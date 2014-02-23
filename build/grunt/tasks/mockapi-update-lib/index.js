/**
 * mockapi-update-lib
 *
 * Automatically generate much of the mockapi from the application itself
 *
 * NOTE:
 * phantomjs res.body has not been implemented yet:
 * https://github.com/ariya/phantomjs/pull/11484
 *   Waiting...
 *
 * Main process sequence:
 *  nextPage => processMain => [ [nextRoute => nextPage => processPage], ...]
 */
var util = require("util");
var path = require("path");
var phantom = require("node-phantom");
var urlm = require("url");
var _ = require("underscore");
var configLib = require("../../config").configLib;

// Module globals set in run export
var _config, _timeout, _mockHost, _callback, _proxyRe, _ph, _routes;

// The storage for all the api requests and responses.
// Populated in page resource handlers.
var _reqres = {};

// Exit phantom, callback
function exit(err, code) {
  _ph.exit(function() {
    _callback(err, _reqres);
  });
}

// Make a url using the env config and given route
function makeUrl(route) {
  return urlm.format({
    protocol: "http",
    hostname: _config.app.hostname,
    port: _config.app.port || 80,
    pathname: route
  });
}

// Make the replacements on the response body
function replacements(body) {
  return body.replace(new RegExp(_config.proxy.hostname+"|"+_config.proxy.hostname+":"+_config.proxy.port, "ig"), _mockHost);
}

// Handle a resource request. Capture requests proxied to the backend.
function onResourceRequested(args) {
  var req = args[0];
  if (req.url.match(_proxyRe)) {
    console.log("API Resource Requested:\n"+util.inspect(req));
    _reqres[urlm.parse(req.url).path] = {
      method: req.method,
      url: req.url
    };
  }
}

// Handle the resource received. Capture responses from the backend proxy.
function onResourceReceived(res) {
  if (res.url.match(_proxyRe) && res.stage === "end") {
    console.log("API Resource Received:\n"+util.inspect(res));
    _.extend(_reqres[urlm.parse(res.url).path], {
      body: "FAKE RESPONSE BODY",//replacements(res.body)
      contentType: res.contentType
    });
  }
}

// Open a page and let the resource handlers do the work
function processPage(page) {

  // Wait and intercept asynchronous api calls
  setTimeout(nextRoute, _timeout, page);
}

// Collect the app routes from the main page and start processing
function processMain(page) {
  setTimeout(function() {
    page.evaluate(function() {
      // grab the exposed routes from the app
      return window.wpspa.appRoutes;
    }, function(err, result) {
      if (err) {
        exit("failed to get appRoutes", -1);
      } else {
        _routes = Object.keys(result);
        setTimeout(nextRoute, 500, page);
      }
    });
  }, _timeout);
}

// Make a new page object, connect it to handlers, open it, and process it
function nextPage(url, callback) {
  _ph.createPage(function(err, page) {
    if (err) { exit(err, -1); }

    // hook up resource request and received handlers to populate _reqres
    page.onResourceRequested = onResourceRequested;
    page.onResourceReceived = onResourceReceived;

    page.open(url, function(err, status) {
      if (err) { exit(err, -1); }
      if (status !== "success") {
        exit("Unable to load page "+url, -1);
      }
      
      callback(page);
    });
  });
}

// Consume and process the next route
function nextRoute(lastPage) {
  lastPage.close();

  var route = _routes.shift();
  while (route === "" || /[*\(\:]/.test(route)) {
    route = _routes.shift();
  }

  if (!route) {
    exit(undefined, 0); // all done
  } else {
    nextPage(makeUrl(route), processPage);
  }
}

// Run the mockapi update process.
// Sets the operational module globals, then starts processing.
function run(environment, timeout, phantomjs, mockHost, callback) {
  _timeout = timeout;
  _callback = callback;
  _mockHost = mockHost;

  // update the path to include phantomjs
  process.env.PATH = process.env.PATH.split(path.delimiter).concat(phantomjs).join(path.delimiter);

  // Load the config by environment
  _config = configLib.create(environment);
  
  // Get the pattern for matching a proxied api call
  _proxyRe = new RegExp(_config.proxy.pattern.replace(/^\^/, ""));

  // Create phantom and start processing
  phantom.create(function(err, ph) {
    if (err) { exit(err, -1); }
    _ph = ph;

    nextPage(makeUrl("/"), processMain);
  });
}

module.exports = {
  run: run
};