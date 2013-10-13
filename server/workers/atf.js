/*
 * atf.js
 *
 * The purpose of this worker is to retrieve the ATF content from the backend and store it in Redis for quick retrieval.
 * This decouples the back-end from the front-end for ATF content thereby removing any back-end slowness from the equation.
 * The more often you run it, the more up-to-date the ATF content from frontend is with the backend.
 */
var async = require("async");
var request = require("../helpers/request");
var redisClient = require("../helpers/redisClient");
var Config = require("../config");

var config = new Config(process.env.NODE_ENV || "development");

// start the atf content requests in parallel
async.parallel({
  navigation: request(config.proxy.host, config.proxy.port, config.navigationPath),
  // banner: request(config.proxy.host, config.proxy.port, config.bannerPath),
  footer: request(config.proxy.host, config.proxy.port, config.footerPath),
  recent: request(config.proxy.host, config.proxy.port, config.recentPath)
},
// When they complete, insert into redis
function(err, results) {
  var redis = redisClient();
  redis.set("atf", JSON.stringify(results), function(err) {
    if (err) {
      console.error("redis atf set failed: "+err);
    }
    redis.quit();
  });
});