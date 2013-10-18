/*
 * debug.js
 *
 * Debug build configuration settings
 */
var util = require("util");
var All = require("./all");

function Config() {}
util.inherits(Config, All);

// The main application port that browsers use
Config.prototype.appPort = 9002;

// Use a proxy
Config.prototype.proxy = {
  host: "jsonapi.local",
  port: 80,
  pattern: '^\/api\/'
};

Config.prototype.staticBase = "dist/debug";
Config.prototype.staticAge = 9002; // for debugging response headers

// add more development properties/functions here

module.exports = Config;