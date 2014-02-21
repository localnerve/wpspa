/**
 * rev
 *
 * Load and config grunt-rev
 * Relies on output from contrib-requirejs
 */
module.exports = function(grunt) {
  
  grunt.config("rev", {
    options: {
      encoding: "utf8",
      algorithm: "md5",
      length: 8
    },
    debug: {
      files: {
        src: [
          "<%= project.dist.debug %>/<%= project.scripts %>/require.js"
        ]
      }
    },
    release: {
      files: {
        src: [
          "<%= project.dist.release %>/<%= project.scripts %>/require.js"
        ]
      }
    }
  });

  grunt.loadNpmTasks("grunt-rev");
};