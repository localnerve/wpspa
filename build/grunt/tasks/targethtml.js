/**
 * targethtml
 *
 * Load and config grunt-targethtml.
 */
module.exports = function(grunt) {

  grunt.config("targethtml", {
    debug: {
      src: "index.html",
      dest: "<%= project.dist.debug %>/index.html"
    },

    release: {
      src: "index.html",
      dest: "<%= project.dist.release %>/index.html"
    }
  });

  grunt.loadNpmTasks("grunt-targethtml");
};