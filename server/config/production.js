/*
 * production.js
 *
 * production configuration settings
 *
 * IMPORTANT: Do not add any application consumed values here
 *   Only add values that affect/reflect server operational characteristics
 *   Production application values must be added to config/release.js
 */
var util = require("util");
var Release = require("./release");

function Config() {}
util.inherits(Config, Release);

// Define the app host as the name for the cloud env router
// The application info
Config.prototype.app = {
  hostname: "enigmatic-refuge-9006.herokuapp.com",
  port: undefined // must be defined by the real host environment
};

// Reduce production logging to minimal
Config.prototype.loggerFormat = "tiny";

Config.prototype.staticBase = ".";

// Define the far-future expiry of statics (in milliseconds)
Config.prototype.staticAge = 31556926000; // one year

module.exports = Config;