/*
 * debug.js
 *
 * Debug build configuration settings
 */
var util = require("util");
var Base = require("./base");

function Config() {}
util.inherits(Config, Base);

// The main application port that browsers use
Config.prototype.appPort = 9002;

// Use a proxy
Config.prototype.proxy = {
  host: "jsonapi.local",
  port: 80,
  pattern: '^\/api\/'
};

// TODO: read this from a common config
Config.prototype.staticBase = "dist/debug";

// add more development properties/functions here

module.exports = Config;