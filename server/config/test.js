/*
 * test.js
 *
 * Test environment configuration settings
 */
var util = require("util");
var Base = require("./base");

function Config() {}
util.inherits(Config, Base);

// The main application port that browsers use
Config.prototype.appPort = 9000;

// Proxy to the the test server
Config.prototype.proxy = {
  host: "localhost",
  port: 9010,
  pattern: '^\/api\/'
};

// Allow access to shared server modules (before the build)
Config.prototype.rewriteForbidden = '^/(node_modules|app.js$|package.json$) [F NC L]';

module.exports = Config;