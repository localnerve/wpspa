/**
 * bower-requirejs
 *
 * Auto-updates the requirejs config.path with bower dependencies
 * Does not remove, just add.
 *
 * Exlusions/reasons listed below fall into two categories:
 *   1. Not used by the app runtime
 *   2. app uses special builds not listed in vendor package.main
 * 
 */
module.exports = function(grunt) {

  grunt.config("bower", {
    all: {
      rjsConfig: "<%= project.app %>/config.js",
      options: {
        exclude: [
          // these are not compiled/referenced
          "chai", "underscore", "mocha", "sinon", "almond", "requirejs",
          // these are custom (deviate from package main)
          "lodash", "backbone.marionette"
        ]
      }
    }
  });

  grunt.loadNpmTasks("grunt-bower-requirejs");
};