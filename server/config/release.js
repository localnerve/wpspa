/*
 * release.js
 *
 * Release build configuration settings
 */
var util = require("util");
var All = require("./all");

function Config() {}
util.inherits(Config, All);

// The application info
Config.prototype.app = {
  hostname: "localhost",
  port: 9003
};

// Use a proxy
Config.prototype.proxy = {
  hostname: "wpspa.localnerve.com",
  port: 80,
  pattern: '^\/api\/'
};

Config.prototype.staticBase = "dist/release";
Config.prototype.staticAge = 9003; // for debugging response headers

module.exports = Config;