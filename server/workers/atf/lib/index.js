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
var _ = require("underscore");
var async = require("async");
var file = require("./file");
var redis = require("./redis");
var request = require("../../../helpers/request");
var configLib = require("../../../config");

// The application definition of atf content
// This defines what constitutes all bootstrapped, above the fold content for the app
function atfContent(config) {
  return _.object(_.map(config.atf, function(value, key) {
    return [
      key, request(config.proxy.hostname, config.proxy.port, value)
    ];
  }));
}

/**
 * Get the remote ATF content and callback to update a target.
 * callback is the callback to perform the update, signature:
 *   callback(err, results)
 * The object returned by config.atfContent defines what constitutes 
 * the literal atf content for the app.
 */
function run(callback, environment) {
  var config = configLib.create(environment || process.env.NODE_ENV);
  async.parallel(atfContent(config), callback);
}

module.exports = {
  run: run,
  file: file,
  redis: redis
};