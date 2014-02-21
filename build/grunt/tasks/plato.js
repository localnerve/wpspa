/**
 * plato
 *
 * Load and config the grunt-plato task.
 * This runs introspection reports. 
 * projectDir is used so that this can be run from a reporting repo and tracked there.
 */

module.exports = function(grunt) {

  grunt.config("plato", {
    client: {
      options: {
        exclude: /config\.js/
      },
      files: [{
        dest: "<%= project.report %>",
        src: [
          "<%= project.projectDir %>/<%= project.app %>/**/*.js",
          "<%= project.projectDir %>/<%= project.server %>/**/*.js",
          "<%= project.projectDir %>/<%= project.serverMain %>"
        ]
      }]
    }
  });

  grunt.loadNpmTasks("grunt-plato");
};