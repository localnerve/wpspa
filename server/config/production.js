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
Config.prototype.appPort = 80;

// Use a proxy
Config.prototype.proxy = {
  host: "wpspa.localerve.com",
  port: 80,
  pattern: '^\/api\/'
};

// add more development properties/functions here

module.exports = Config;