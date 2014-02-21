/**
 * contrib-jst
 *
 * The javascript templates (jst) task compiles all application templates 
 * into JavaScript functions with the underscore.js template function.
 * 
 * The templates are made available at runtime to the loader via a browser global, JST.
 * 
 * The concat task depends on this file to exist, so if you decide to
 * remove this, ensure concat is updated accordingly.
 */
module.exports = function(grunt) {

  grunt.config("jst", {
    compile: {
      files: [{
        src: ["<%= project.app %>/**/*.html"],
        dest: "<%= project.dist.debug %>/<%= project.scripts %>/templates.js"
      }]
    }
  });

  grunt.loadNpmTasks("grunt-contrib-jst");
};