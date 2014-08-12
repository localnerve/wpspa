/**
 * The main configuration sources for grunt tasks
 *
 */
var path = require("path");

// name of the server directory from project root
var serverDir = "server";

// Setup the environment and project configuration
function init(projectDir) {

  var configLib = module.exports.configLib =
    require(path.join(projectDir,serverDir,"config"));

  var configEnv = module.exports.configEnv = {
    all: configLib.create("all"),
    test: configLib.create("test"),
    debug: configLib.create("debug"),
    release: configLib.create("release"),
    dev: configLib.create("development")
  };

  module.exports.projectConfig = {
    projectDir: projectDir,
    dist: {
      debug: configEnv.debug.staticBase,
      release: configEnv.release.staticBase
    },
    app: "app",
    report: "report",
    images: configEnv.all.imagesDir,
    fonts: configEnv.all.fontsDir,
    scripts: configEnv.all.scriptsDir,
    atfKey: configEnv.all.keys.atf,
    server: serverDir,
    serverMain: "app.js",
    test: "test",
    vendor: "vendor",
    mock: {
      host: configEnv.test.proxy.hostname,
      port: configEnv.test.proxy.port
    },
    port: {
      test: configEnv.test.app.port,
      dev: configEnv.dev.app.port,
      debug: configEnv.debug.app.port,
      release: configEnv.release.app.port
    }
  };
}

module.exports = {
  serverDir: serverDir,
  init: init
};