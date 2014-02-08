/**
 * The routes worker process
 *
 * This worker process gets the app routes by running the application dynamically
 *   on the server, then stores the publicly exposed routes in an intermediate format 
 *   (just the url paths) in Redis.
 * From there, the paths are used by the live app for serving /sitemap.xml and /robots.txt requests.
 * The paths are also used by downstream worker processes (snapshots) to produce the site's html snapshots
 *   for _escaped_fragment_ requests.
 *
 * Run this worker anytime the app menu has changed and needs to be refreshed.
 *
 * PATH and NODE_ENV have to set in the environment before running this.
 * PATH has to include phantomjs bin
 */
 
var phantom = require("node-phantom");
var urlm = require("url");

var redis = require("../../../helpers/redis");
var configLib = require("../../../config");

var config = configLib.create();

// Write the appRoutes to Redis
function writeAppRoutes(appRoutes) {
  // remove pattern routes, and prepend /
  appRoutes = appRoutes.filter(function(appRoute) {
    return !/[*\(\:]/.test(appRoute);
  }).map(function(appRoute) {
    return "/"+appRoute;
  });
  if (appRoutes.length > 0) {
    var redisClient = redis.client();
    redisClient.set(config.keys.routes, appRoutes, function(err) {
      if (err) {
        console.error("failed to store the routes for "+config.keys.routes);
      } else {
        console.log("successfully stored "+appRoutes.length+" routes in "+config.keys.routes);
      }
      redisClient.quit();
    });
  } else {
    console.error("no routes found for "+config.app.hostname);
  }
}

// Start up phantom, wait for the page, get the appRoutes
function routes(urlPath, timeout) {
  var url = urlm.format({
    protocol: "http",
    hostname: config.app.hostname,
    port: config.app.port || 80,
    pathname: urlPath
  });

  phantom.create(function(err, ph) {
    return ph.createPage(function(err, page) {
      return page.open(url, function(err, status) {

        if (status !== "success") {
          console.error("Unable to load page " + url);
          ph.exit();
        } else {
          setTimeout(function() {
            return page.evaluate(function() {
              return window.wpspa.appRoutes;
            }, function(err, result) {
              if (err) {
                console.error("failed to get appRoutes");
              } else {
                writeAppRoutes(Object.keys(result));
              }
              ph.exit();
            });
          }, timeout);
        }

      });
    });
  });
}

module.exports = {
  routes: routes
};