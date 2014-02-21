/**
 * inline
 *
 * This inlines the ATF blocking css and js
 */
module.exports = function(grunt) {

  grunt.config("inline", {
    debug: {
      src: ["<%= project.dist.debug %>/index.html"]
    },
    release: {
      src: ["<%= project.dist.release %>/index.html"]
    }
  });

  grunt.loadNpmTasks("grunt-inline");
};