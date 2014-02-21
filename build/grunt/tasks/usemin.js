/**
 * usemin
 *
 * Load and config grunt-usemin.
 * The useminOptions task only exists to make grunt-usemin a multi-task.
 * useminOptions must always be run before grunt-usemin, and provides all its configuration.
 * Relies on the output of the targethtml task.
 */
module.exports = function(grunt) {

  grunt.config("useminOptions", {
    debug: {
      usemin: {
        html: ["<%= project.dist.debug %>/index.html"],
        options: {
          dirs: ["<%= project.dist.debug %>"],
          basedir: "<%= project.dist.debug %>"
        }
      }
    },
    release: {
      usemin: {
        html: ["<%= project.dist.release %>/index.html"],
        options: {
          dirs: ["<%= project.dist.release %>"],
          basedir: "<%= project.dist.release %>"
        }
      }
    }
  });

  // Get usemin to support multiple targets
  grunt.registerMultiTask("useminOptions", "prepareOptions for usemin", function() {
    grunt.config.set("usemin", this.data.usemin);
  });

  grunt.loadNpmTasks("grunt-usemin");
};
