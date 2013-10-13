/*
 * development.js
 *
 * Development environment configuration settings
 */
var util = require("util");
var Base = require("./base");

function Config() {}
util.inherits(Config, Base);

// The main application port that browsers use
Config.prototype.appPort = 9001;

// Use a proxy
Config.prototype.proxy = {
  host: "jsonapi.local",
  port: 80,
  pattern: '^\/api\/'
};

// TODO: remove or automate redis usage, and move to base
Config.prototype.injectorUseRedis = true;

// Allow access to shared server modules (before the build)
Config.prototype.rewriteForbidden = '^/(node_modules|Procfile$|app.js$|package.json$) [F NC L]';

// add more development properties/functions here

module.exports = Config;