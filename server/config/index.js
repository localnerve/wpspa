/*
 * config.js
 *
 * The environment specific server config
 */

var environments = {
  production: require("./production"),
  development: require("./development"),
  test: require("./test"),
  debug: require("./debug"),
  release: require("./release")
};

module.exports = function(env) {
  env = env || process.env.NODE_ENV;

  var config = environments[env];
  if (!config)
    config = environments.development;

  return new config();
};