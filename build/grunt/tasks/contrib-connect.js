/**
 * contrib-connect
 *
 * Load and configure sencha connect
 */

// middleware to mock /api for test
var mockApi = require("../../../test/fixtures/mockApi");

module.exports = function(grunt) {

  grunt.config("connect", {
    options: {
      hostname: "<%= project.mock.hostname %>",
      port: "<%= project.mock.port %>",
      middleware: function(connect) {
        return [
          mockApi
          //, TODO: add better error here
        ];
      }
    },
    // the server to mock the api to run the test suites against
    test: {
      options: {
        keepalive: false
      }
    },
    // the server to mock the api to run the test suites against, interactive
    // corresponds to express:devTest
    devTest: {
      options: {
        keepalive: true
      }
    },
    // the server to mock the api to run an interactive demo against
    // corresponds to express:demo
    demo: {
      options: {
        keepalive: true
      }
    }
  });

  grunt.loadNpmTasks("grunt-contrib-connect");
};