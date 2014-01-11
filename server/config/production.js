/*
 * production.js
 *
 * production configuration settings
 */
var util = require("util");
var All = require("./all");

function Config() {}
util.inherits(Config, All);

// Define the app host as the name for the cloud env router
// The application info
Config.prototype.app = {
  hostname: "enigmatic-refuge-9006.herokuapp.com"
  //port: undefined, let the env define
};

// Reduce production logging to minimal
Config.prototype.loggerFormat = "tiny";

// Define the far-future expiry of statics (in milliseconds)
Config.prototype.staticAge = 31556926000; // one year

// Use a proxy
Config.prototype.proxy = {
  hostname: "wpspa.localnerve.com",
  port: 80,
  pattern: '^\/api\/'
};

// add more development properties/functions here

module.exports = Config;