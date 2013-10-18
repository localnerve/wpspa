/*
 * release.js
 *
 * Release build configuration settings
 */
var util = require("util");
var All = require("./all");

function Config() {}
util.inherits(Config, All);

// The main application port that browsers use
Config.prototype.appPort = 9003;

// Use a proxy
Config.prototype.proxy = {
  host: "wpspa.localnerve.com",
  port: 80,
  pattern: '^\/api\/'
};

Config.prototype.staticBase = "dist/release";
Config.prototype.staticAge = 9003; // for debugging response headers

// add more development properties/functions here

module.exports = Config;