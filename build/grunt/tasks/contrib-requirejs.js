/**
 * contrib-requirejs
 *
 * Load and config grunt-contrib-requirejs.
 * This task uses James Burke's excellent r.js AMD build tool.
 */
module.exports = function(grunt) {

  grunt.config("requirejs", {
    compile: {
      options: {
        // We do this in the uglify step so we can debug
        optimize: "none",

        // Ensure modules are inserted
        skipModuleInsertion: false,

        // Include the main configuration file.
        mainConfigFile: "<%= project.app %>/config.js",

        // Always output file to dist debug, release build will take care of the rest.
        out: "<%= project.dist.debug %>/<%= project.scripts %>/require.js",

        // Root application module.
        name: "config",

        // Do not wrap everything in an IIFE.
        wrap: false,

        done: function(done, output) {

          var duplicates = require("rjs-build-analysis").duplicates(output);

          if (duplicates.length > 0) {
            grunt.log.subhead("Duplicates found in requirejs build:");
            grunt.log.warn(duplicates);
            done(new Error("r.js built duplicate modules, please check the excludes option."));
          }

          done();
        }
      }
    }
  });

  grunt.loadNpmTasks("grunt-contrib-requirejs");
};