/*
 * test.js
 *
 * Test environment configuration settings
 */
var util = require("util");
var All = require("./all");

function Config() {}
util.inherits(Config, All);

// The application info
Config.prototype.app = {
  hostname: "localhost",
  port: 9000
};

// Proxy to the the test server
Config.prototype.proxy = {
  hostname: "localhost",
  port: 9010,
  pattern: '^\/api\/'
};

// Allow access to shared server modules (before the build)
Config.prototype.rewriteForbidden = '^/(node_modules|Procfile$|app.js$|package.json$) [F NC L]';

module.exports = Config;