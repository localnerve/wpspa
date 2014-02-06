/**
 * atf.js
 *
 * The purpose of this worker is to retrieve the ATF content from the backend and inline it.
 * This decouples the back-end from the front-end for ATF content thereby removing any 
 * back-end slowness from the equation.
 * The more often you run it, the more up-to-date the ATF content is.
 *
 * Examples:
 *   var atfLib = require('./workers/atf/lib');
 *
 *   atfLib.run(atfLib.file.update('path/to/file.html', function(err, fileName) {
 *     if (!err)
 *       console.log("file update succeeded");
 *   }));
 *
 *   atfLib.run(atfLib.redis.update('somekey', function(err, key) {
 *     if (!err)
 *       console.log("redis update succeeded");
 *   }));
 */
var async = require("async");
var file = require("./file");
var redis = require("./redis");
var request = require("../../../helpers/request");
var configLib = require("../../../config");

/**
 * Get the remote ATF content and callback to update a target
 * callback is the callback to perform the update, signature:
 *   callback(err, results)
 */
function run(callback, environment) {
  var config = configLib.create(environment || process.env.NODE_ENV);

  // This defines what is in the atf content
  // start the atf content requests in parallel
  async.parallel({
    navigation: request(config.proxy.hostname, config.proxy.port, config.navigationPath),
    siteInfo: request(config.proxy.hostname, config.proxy.port, config.siteInfoPath),
    footer: request(config.proxy.hostname, config.proxy.port, config.footerPath),
    recent: request(config.proxy.hostname, config.proxy.port, config.recentPath)
  },
  // When the requests all complete, call the callback
  callback
  );
}

module.exports = {
  run: run,
  file: file,
  redis: redis
};