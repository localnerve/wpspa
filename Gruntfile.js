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

  grunt.loadTasks("build/grunt/tasks");

  // menu
  grunt.registerTask("default", "workflow menu", function() {
    grunt.log.writeln("Workflow menu:");
    grunt.log.writeln("\tgrunt test - Run the test suites");
    grunt.log.writeln("\tgrunt lint - Run the linter");
    grunt.log.writeln("\tgrunt ccss - Run compass");
    grunt.log.writeln("\tgrunt watch - Run the watch process");
    grunt.log.writeln("\tgrunt push - Prepare to push to remote");
    grunt.log.writeln("\tgrunt format - Run the js formatter");
    grunt.log.writeln("\tgrunt dev - Run the development watch and webserver");
    grunt.log.writeln("\tgrunt devTest - Run the development watch and webserver for the test suite");
    grunt.log.writeln("\tgrunt demo - Run the demo development webserver against the mockapi");
    grunt.log.writeln("\tgrunt plato - Run the static analysis report");
    grunt.log.writeln("\tgrunt debug - Build the debug version of the app");
    grunt.log.writeln("\tgrunt express:devDebug - Run the debug build server on port "+config.projectConfig.port.debug);
    grunt.log.writeln("\tgrunt release - Build the release version of the app");
    grunt.log.writeln("\tgrunt express:devRelease - Run the release build server on port "+config.projectConfig.port.release);
  });

  // the standalone test task
  grunt.registerTask("test", ["compass:test", "connect:test", "atfUpdate:test", "requirejs-transformconfig:test", "express:test", "mocha", "atfRemove:test"]);

  // the standalone lint task
  grunt.registerTask("lint", ["jshint"]);

  // the standalone push task
  grunt.registerTask("push", ["lint", "test", "plato"]);

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
  grunt.registerTask("dev", ["ccss", "requirejs-transformconfig:dev", "devTasks"]);

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

  // demo - run mock api, and the development webserver in parallel
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
  grunt.registerTask("demo", ["release", "requirejs-transformconfig:demo", "demoTasks"]);

  // build tasks: debug, release

  // tasks common to any build
  var commonTasks = ["bower", "jshint", "jst"];

  // The debug task will remove all contents inside the dist/ folder, lint
  // all your code, precompile all the underscore templates into
  // dist/debug/templates.js, compile all the application code into
  // dist/debug/require.js, and then concatenate the require/define shim
  // almond.js and dist/debug/templates.js into the require.js file.
  var debugTasks = ["clean:debug"].concat(commonTasks);
  debugTasks.push(
    "requirejs-transformconfig:debug",
    "requirejs", "concat",
    "compass:debug",
    "targethtml:debug",
    "copy:debug",
    "inline:debug",
    "clean:debugAfterInline",
    "rev:debug",
    "useminOptions:debug",
    "usemin",
    "atfUpdate:debug"
  );
  grunt.registerTask("debug", debugTasks);

  // The release task will run the debug tasks and then minify the
  // dist/debug/require.js file and CSS files.
  var releaseTasks = ["clean:release"].concat(commonTasks);
  releaseTasks.push(
    "requirejs-transformconfig:release",
    "requirejs", "concat",
    "compass:release",
    "uglify:release",
    "cssmin:release",
    "imagemin:release",
    "targethtml:release",
    "copy:release",
    "inline:release",
    "clean:releaseAfterInline",
    "rev:release",
    "useminOptions:release",
    "usemin",
    "atfUpdate:release",
    "clean:release-post"
  );
  grunt.registerTask("release", releaseTasks);

};