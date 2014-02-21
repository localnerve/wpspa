/**
 * mocha
 *
 * Load and config the grunt-mocha task.
 */
module.exports = function(grunt) {

  grunt.config("mocha", {
    all: {
      options: {
        run: false,
        log: true,
        bail: false,
        urls: [
          "http://localhost:<%= project.port.test %>/<%= project.test %>/index.html"
        ]
      }
    }
  });

  grunt.loadNpmTasks("grunt-mocha");
};