/*
 * config.js
 *
 * The environment specific server config
 */

//var production = require("./production");
var Development = require("./development");
var Test = require("./test");
var Debug = require("./debug");
var Release = require("./release");

module.exports = function(environment) {
  environment = environment || process.env.NODE_ENV;

  switch(environment) {

//    case "production":
//      return new Production();

    case "release":
      return new Release();

    case "debug":
      return new Debug();

    case "test":
      return new Test();

    default:
      return new Development();
  }
};