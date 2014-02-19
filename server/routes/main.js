/**
 * main route
 *
 * Handles index.html requests.
 * Serves index.html with ATF content subsitutions from Redis.
 */
var redis = require("../helpers/redis");
var configLib = require("../config");

var config = configLib.create(process.env.NODE_ENV);

function index(req, res, next) {
  var redisClient = redis.client();
  
  redisClient.get(config.keys.atf, function(err, results) {
    if (err) {
      next(err);
    } else {
      res.render("index", { atfContent: results });
    }
    redisClient.quit();
  });
}

 module.exports = index;