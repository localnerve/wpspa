/**
 * snapshots
 *
 * Snapshotting middlewares
 */
var path = require("path");
var redis = require("../helpers/redis");
var configLib = require("../config");

var config = require("../config").create(process.env.NODE_ENV || "development");

/**
 * Middleware to respond with an html snapshot from redis if it's an escaped fragment request.
 * Snapshot is assumed to be stored with snapshots worker process using the html-snapshots lib.
 */
function htmlSnapshot(req, res, next) {
  var result = /^(.*)\?_escaped_fragment_=.*$/.exec(req.url);

  // serve the data or record failure
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
    var hash = config.keys.htmlSnapshots;
    var redisClient = redis.client();

    // normalize the key so that it always ends in '/index.html' per html-snapshots
    var key = result[1].replace(/(?:\/)?([^\/]*)$/, function(match, last) {
      return last === "index.html" ? match : path.join(match, "/index.html");
    });
    
    // get the data from redis
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