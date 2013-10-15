/*
 * Get a connected redis client
 *
 * This is presently not in use, but left, for now, in case it becomes useful
 */

module.exports = function() {
  var redis;

  // in production, REDISTOGO_URL is defined and we need to authenticate
  if (process.env.REDISTOGO_URL) {
    var rtg = require("url").parse(process.env.REDISTOGO_URL);
    redis = require("redis").createClient(rtg.port, rtg.hostname);
    redis.auth(rtg.auth.split(":")[1]);
  } else {
    // for now, just use the default host and port for all other environments
    redis = require("redis").createClient();
  }

  return redis;
};