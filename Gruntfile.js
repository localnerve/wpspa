// path helper to make this portable for other support repos
var path = require("path");

// async helper, grunt.util.async deprecated
var async = require("async");

// helpers
var helpers = require("./build/grunt/helpers");

// config
var config = require("./build/grunt/config");

// Grunt callback
module.exports = function(grunt) {

  // Initialize config
  config.init(__dirname);
  grunt.initConfig({
    project: config.projectConfig,
    pkg: grunt.file.readJSON("package.json")
  });

  grunt.loadTasks(path.join(__dirname, "build/grunt/tasks"));

  // menu
  grunt.registerTask("default", "workflow menu", function() {
    grunt.log.writeln("Workflow menu:");
    grunt.log.writeln("\tgrunt test - Run the test suites");
    grunt.log.writeln("\tgrunt lint - Run the linter");
    grunt.log.writeln("\tgrunt ccss - Run Compass");
    grunt.log.writeln("\tgrunt watch - Run the watch process");
    grunt.log.writeln("\tgrunt plato - Run the static analysis report");
    grunt.log.writeln("\tgrunt commit - Prepare to commit a changeset: lint, test, analyze");
    grunt.log.writeln("\tgrunt format - Run the js formatter");
    grunt.log.writeln("\tgrunt mockapi:<dev|debug|release> - Update the mockapi by environment");
    grunt.log.writeln("\tgrunt dev - Run the development watch and webserver");
    grunt.log.writeln("\tgrunt devTest - Run the development watch and webserver for the test suite");
    grunt.log.writeln("\tgrunt debug - Build the debug version of the app");
    grunt.log.writeln("\tgrunt express:devDebug - Run the debug build server on port "+config.projectConfig.port.debug);
    grunt.log.writeln("\tgrunt release - Build the release version of the app");
    grunt.log.writeln("\tgrunt express:devRelease - Run the release build server on port "+config.projectConfig.port.release);
    grunt.log.writeln("\tgrunt demo - Run the demo development webserver against the mockapi");
  });

  // the standalone test task
  grunt.registerTask("test", ["compass:test", "connect:test", "atfUpdate:test", "requirejs-transformconfig:test", "express:test", "mocha", "atfRemove:test"]);

  // the standalone lint task
  grunt.registerTask("lint", ["jshint"]);

  // the standalone commit task
  grunt.registerTask("commit", ["lint", "test", "plato"]);

  // the standalone css compile task
  grunt.registerTask("ccss", ["compass:dev"]);

  // the standalone formatter
  grunt.registerTask("format", ["jsbeautifier"]);

  // the standard development task, run watch and the development webserver in parallel
  // use this for interactive front-end development
  grunt.registerTask("devTasks", "parallel development tasks", function() {
    async.parallel([
      function() {
        helpers.runTask(grunt, "watch");
      },
      function() {
        helpers.runTask(grunt, "atfUpdate:dev");
      },
      function() {
        helpers.runTask(grunt, "express:dev");
      }
    ], this.async());
  });
  grunt.registerTask("dev", ["lint", "ccss", "requirejs-transformconfig:dev", "devTasks"]);

  // the test development task, run watch, mock api, and the development webserver in parallel
  // use this for interactive test suite development
  grunt.registerTask("devTest", "develop the test suite", function() {
    async.parallel([
      function() {
        helpers.runTask(grunt, "watch");
      },
      function() {
        helpers.runTask(grunt, "connect:devTest", function(chunk) {
          if (/Started connect/ig.test(chunk)) {
            helpers.runTask(grunt, "requirejs-transformconfig:test");
            helpers.runTask(grunt, "atfUpdate:test");
          }
        });
      },
      function() {
        helpers.runTask(grunt, "express:devTest");
      }
    ], this.async());
  });

  // tasks common to any build
  var commonTasks = ["bower", "jshint", "jst", "requirejs", "concat"];

  // Debug build
  // Builds an app useful for debugging/testing an app build
  // Similar to release but:
  //   Sass source map support
  //   Does not include uglify, cssmin, imagemin
  //   Uses the debug config
  // Fully encapsulated result runnable from dist/debug
  var debugTasks = ["clean:debug", "requirejs-transformconfig:debug"].concat(commonTasks);
  debugTasks.push(
    "compass:debug",
    "targethtml:debug",
    "copy:debug",
    "inline:debug",
    "clean:debugAfterInline",
    "rev:debug",
    "useminOptions:debug", "usemin",
    "atfUpdate:debug",
    "requirejs-transformconfig:test"
  );
  grunt.registerTask("debug", debugTasks);

  // Release build
  // Builds the release app for production
  // Fully encapsulated result runnable from dist/release
  var releaseTasks = ["clean:release", "requirejs-transformconfig:release"].concat(commonTasks);
  releaseTasks.push(
    "compass:release",
    "uglify:release",
    "cssmin:release",
    "imagemin:release",
    "targethtml:release",
    "copy:release",
    "inline:release",
    "clean:releaseAfterInline",
    "rev:release",
    "useminOptions:release", "usemin",
    "atfUpdate:release",
    "requirejs-transformconfig:test",
    "clean:release-post"
  );
  grunt.registerTask("release", releaseTasks);

  // Demo build and servers
  // Creates a standalone demo based on the release with no external dependencies
  // Builds the demo app based on the release build, 
  //   runs local mock api for the backend, and the demo webserver for the frontend
  var demoTasks = helpers.mapTasks(releaseTasks, {
    "requirejs-transformconfig:release": "requirejs-transformconfig:demo",
    "atfUpdate:release": null
  }).concat(["demoTasks"]);
  grunt.registerTask("demoTasks", "parallel demo tasks", function() {
    async.parallel([
      function() {
        helpers.runTask(grunt, "connect:demo", function(chunk) {
          if (/Started connect/ig.test(chunk)) {
            helpers.runTask(grunt, "atfUpdate:demo");
          }
        });
      },
      function() {
        helpers.runTask(grunt, "express:demo");
      }
    ], this.async());
  });
  grunt.registerTask("demo", demoTasks);

};