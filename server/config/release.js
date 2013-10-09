/*
 * release.js
 *
 * Release build configuration settings
 */
var util = require("util");
var Base = require("./base");

function Config() {}
util.inherits(Config, Base);

// The main application port that browsers use
Config.prototype.appPort = 9003;

// Use a proxy
Config.prototype.proxy = {
  host: "wpspa.localnerve.com",
  port: 80,
  pattern: '^\/api\/'
};

Config.prototype.staticBase = "dist/release";

// add more development properties/functions here

module.exports = Config;