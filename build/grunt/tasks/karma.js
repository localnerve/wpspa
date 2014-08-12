/**
 * karma
 *
 * Load and config the grunt-karma task.
 */
var path = require("path");

module.exports = function(grunt) {

  grunt.config("karma", {
    options: {
      configFile: "<%= project.test %>/karma-shared.conf.js",
      port: "<%= project.port.test %>",
      //basePath: "<%= project.test %>",
      basePath: "..",
      files: [
        "<%= project.vendor %>/bower/chai/chai.js",
        "<%= project.vendor %>/bower/sinon/lib/sinon.js",
        "<%= project.vendor %>/bower/sinon/lib/sinon/spy.js",
        "<%= project.vendor %>/bower/sinon/lib/sinon/call.js",
        "<%= project.vendor %>/bower/sinon/lib/sinon/stub.js",
        "<%= project.vendor %>/bower/sinon/lib/sinon/mock.js",
        "<%= project.vendor %>/bower/sinon/lib/sinon/collection.js",
        "<%= project.vendor %>/bower/sinon/lib/sinon/util/fake_timers.js",
        "<%= project.vendor %>/bower/sinon/lib/sinon/util/event.js",
        "<%= project.vendor %>/bower/sinon/lib/sinon/util/fake_xml_http_request.js",
        "<%= project.vendor %>/bower/sinon/lib/sinon/util/fake_server.js",
        "<%= project.vendor %>/bower/sinon/lib/sinon/util/fake_server_with_clock.js",
        "<%= project.vendor %>/bower/sinon/lib/sinon/sandbox.js",

        "<%= project.vendor %>/bower/requirejs/require.js",
        "<%= project.test %>/karma/runner.js",

        { pattern: "<%= project.app %>/**/*.js", included: false },
        {
          pattern: "<%= project.test %>/mocha/**/*.js",
          included: false
        },
        { pattern: "<%= project.vendor %>/bower/**/*.js", included: false }
    ],

    },
    devTest: {
      //background: true,      
      browsers: ["Chrome"]
    },
    test: {
      singleRun: true,
      browsers: ["PhantomJS"]
    }
  });

  grunt.loadNpmTasks("grunt-karma");
};