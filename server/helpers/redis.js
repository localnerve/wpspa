/**
 * Helpers for redis
 */
var redis = require("redis");
var url = require("url");

function createAuthClient() {
  var rtg = url.parse(process.env.REDISTOGO_URL);
  var client = redis.createClient(rtg.port, rtg.hostname);
  client.auth(rtg.auth.split(":")[1]);
  return client;
}

function createDefaultClient() {
  return redis.createClient();
}

module.exports = {

  // Get a connected redis client
  client: function() {
    // In production, REDISTOGO_URL is defined and we need to authenticate
    return process.env.REDISTOGO_URL ? createAuthClient() : createDefaultClient();
  }
};