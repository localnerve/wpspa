/*
 * atf.js
 *
 * The purpose of this worker is to retrieve the ATF content from the backend and inline it.
 * This decouples the back-end from the front-end for ATF content thereby removing any 
 * back-end slowness from the equation.
 * The more often you run it, the more up-to-date the ATF content from frontend is with the backend.
 */
var fs = require("fs");
var path = require("path");
var async = require("async");
var request = require("../../../helpers/request");
var configLib = require("../../../config");

// script helpers
var scriptExpression = /(<script id=(?:"|')wpspa-data-atf(?:"|')>)(.*)(<\/script>)/ig,
    scriptStart = "var wpspa=";

// remove any existing bootstrapped results from html
function stripBootstrappedResults(html) {
  return html.toString().replace(scriptExpression, function(match, startTag, content, endTag) {
    return startTag+endTag;
  });
}

/**
 * Update the target with the remote atf content
 * target is the path to the target file
 * success is a callback that is called if the operation succeeds, else throws error.
 */
function update(target, success, environment) {
  var config = configLib.create(environment || process.env.NODE_ENV);

  // start the atf content requests in parallel
  async.parallel({
    navigation: request(config.proxy.hostname, config.proxy.port, config.navigationPath),
    siteInfo: request(config.proxy.hostname, config.proxy.port, config.siteInfoPath),
    footer: request(config.proxy.hostname, config.proxy.port, config.footerPath),
    recent: request(config.proxy.hostname, config.proxy.port, config.recentPath)
  },
  // When they complete, update the target
  function(errorAsync, results) {
    if (errorAsync) throw errorAsync;

    // read the target file
    fs.readFile(target, { encoding: "utf8" }, function(errorRead, html) {
      if (errorRead) throw errorRead;

      html = stripBootstrappedResults(html);

      // update the target file
      fs.writeFile(
        target,
        html.replace(scriptExpression, function(match, startTag, content, endTag) {
          return startTag+scriptStart+JSON.stringify(results)+";"+endTag;
        }),
        { encoding: "utf8" },
        function(errorWrite) {
          if (errorWrite) throw errorWrite;
          if (success) success(target);
        }
      );
    });
  });
}

/**
 * Remove the remote atf content from the target
 */
function remove(target, success) {
  // read the target file
  fs.readFile(target, { encoding: "utf8" }, function(errorRead, html) {
    if (errorRead) throw errorRead;

    html = stripBootstrappedResults(html);

    // update the target file
    fs.writeFile(target, html, { encoding: "utf8" }, function(errorWrite) {
        if (errorWrite) throw errorWrite;
        if (success) success(target);
      }
    );
  });
}

module.exports = {
  update: update,
  remove: remove
};