/*
 * all.js
 *
 * non-environment specific configuration
 */
var _ = require("underscore");
var common = require("./config.json");

function Config() {}

// self pre-process
Config.prototype = JSON.parse(
  _.template(JSON.stringify(common), common, { variable: "self" })
);

module.exports = Config;