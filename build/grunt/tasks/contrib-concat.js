/**
 * contrib-concat
 *
 * Builds the un-optimized application distribution js.
 * Merges the almond require/define shim, compiled templates, and app into the app bundle.
 * (Must run rjs and compile templates before this task)
 */
module.exports = function(grunt) {

  grunt.config("concat", {
    options: {
      separator: ";"
    },
    dist: {
      src: [
        // use require if you have dynamically amd modules or multi-config calls
        //"<%= project.vendor %>/bower/requirejs/require.js",
        // use almond if you don't (much less expensive)
        "<%= project.vendor %>/bower/almond/almond.js",
        "<%= project.dist.debug %>/<%= project.scripts %>/templates.js",
        "<%= project.dist.debug %>/<%= project.scripts %>/require.js"
      ],
      dest: "<%= project.dist.debug %>/<%= project.scripts %>/require.js"
    }
  });

  grunt.loadNpmTasks("grunt-contrib-concat");
};
