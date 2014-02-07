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
  release: require("./release"),
  all: require("./all"),
  demo: require("./demo")
};

function create(env) {
  env = env || process.env.NODE_ENV;
  return new environments[env]();
}

module.exports = {
  create: create
};