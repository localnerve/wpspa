/**
 * htmlSnapshot
 *
 * Middleware to respond with html snapshot from redis if it's an escaped fragment request.
 */
var redis = require("../helpers/redis");
var configLib = require("../config");

var config = require("../config").create(process.env.NODE_ENV || "development");

function htmlSnapshot(req, res, next) {
  var result = /^(.*)\?_escaped_fragment_=.*$/.exec(req.url);

  function handleData(hash, key, data) {
    if (data) {
      console.log("Redis retrieved '"+key+"' from '"+hash+"'");
      res.setHeader("Content-Type", "text/html; charset=utf-8");
      res.end(data);
    } else {
      next("Redis failed to find '"+key+"' in '"+hash+"'");
    }
  }

  if (!result) {
    next();
  } else {
    var hash = config.htmlSnapshotsHash;
    var key = result[1];
    if (key.charAt(key.length-1) === '/')
      key += "index.html";

    var redisClient = redis.client();
    redisClient.hget(hash, key, function(err, data) {
      if (err) {
        next("Redis error when retrieving '"+key+"' from '"+hash+"'");
      } else {
        handleData(hash, key, data);
      }
      redisClient.quit();
    });
  }
}

module.exports = {
  htmlSnapshot: htmlSnapshot
};