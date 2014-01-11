/*
 * development.js
 *
 * Development environment configuration settings
 */
var util = require("util");
var All = require("./all");

function Config() {}
util.inherits(Config, All);

// The application info
Config.prototype.app = {
  hostname: "localhost",
  port: 9001
};

// Use a proxy
Config.prototype.proxy = {
  hostname: "jsonapi.local",
  port: 80,
  pattern: '^\/api\/'
};

// Allow access to shared server modules (before the build)
Config.prototype.rewriteForbidden = '^/(node_modules|Procfile$|app.js$|package.json$) [F NC L]';

// add more development properties/functions here

module.exports = Config;