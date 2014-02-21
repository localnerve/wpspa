/**
 * contrib-cssmin
 *
 * Output is index.css, the only stylesheet in the app
 * Relies on contrib-compass running first.
 */
module.exports = function(grunt) {

  grunt.config("cssmin", {
    options: {
      report: "gzip"
    },
    release: {
      files: [{
        src: ["<%= project.app %>/styles/index.css"],
        dest: "<%= project.dist.release %>/index.css"
      }]
    }
  });

  grunt.loadNpmTasks("grunt-contrib-cssmin");
};