/*
 * production.js
 *
 * production configuration settings
 */
var util = require("util");
var All = require("./all");

function Config() {}
util.inherits(Config, All);

// The main application port that browsers use
// This is left for the host to define
//Config.prototype.appPort = 80;

// Reduce production logging to minimal
Config.prototype.loggerFormat = "tiny";

// Define the far-future expiry of statics (in milliseconds)
Config.prototype.staticAge = 31556926000; // one year

// Use a proxy
Config.prototype.proxy = {
  host: "wpspa.localnerve.com",
  port: 80,
  pattern: '^\/api\/'
};

// add more development properties/functions here

module.exports = Config;