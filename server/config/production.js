/*
 * production.js
 *
 * production configuration settings
 */
var util = require("util");
var Base = require("./base");

function Config() {}
util.inherits(Config, Base);

// The main application port that browsers use
// This is left for the host to define
//Config.prototype.appPort = 80;

// Reduce production logging to minimal
Config.prototype.loggerFormat = "tiny";

// Use a proxy
Config.prototype.proxy = {
  host: "wpspa.localnerve.com",
  port: 80,
  pattern: '^\/api\/'
};

// add more development properties/functions here

module.exports = Config;