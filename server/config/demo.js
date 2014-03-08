/*
 * demo.js
 *
 * Demo that runs the release build against the mock api backend
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

Config.prototype.staticBase = "dist/release";
// Define the far-future expiry of statics (in milliseconds)
Config.prototype.staticAge = 31556926000; // one year

module.exports = Config;