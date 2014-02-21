/**
 * contrib-uglify
 *
 * Minification and js compilation is provided by grunt-contrib-uglify.
 * Takes the built require.js file and minifies it for filesize benefits.
 * This produces the release version of the application from the debug version,
 *   output by the concat task.
 * This tasks depends on the output of contrib-requirejs.
 */
module.exports = function(grunt) {

  grunt.config("uglify", {
    options: {
      /*report: "gzip"*/
      report: "min"
    },
    release: {
      files: [{
        src: ["<%= project.dist.debug %>/<%= project.scripts %>/require.js"],
        dest: "<%= project.dist.release %>/<%= project.scripts %>/require.js"
      }]
    }
  });

  grunt.loadNpmTasks("grunt-contrib-uglify");
};