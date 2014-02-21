/**
 * contrib-compass
 *
 * Load and config compass. Compass must be globally installed in the environment
 */
 module.exports = function(grunt) {

  grunt.config("compass", {
    options: {
      sassDir: "<%= project.app %>/sass",
      cssDir: "<%= project.app %>/styles",
      javascriptsDir: "<%= project.vendor %>/gem/foundation",
      imagesDir: "<%= project.images %>",
      fontsDir: "<%= project.fonts %>",
      importPath: [
        "<%= project.vendor %>/bower/foundation/scss",
        "<%= project.app %>"
      ]
    },
    test: {
      options: {
        environment: "development"
      }
    },
    dev: {
      options: {
        environment: "development",
        debugInfo: true
      }
    },
    debug: {
      options: {
        environment: "development",
        debugInfo: true
      }
    },
    release: {
      options: {
        environment: "production"
      }
    }
  });

  grunt.loadNpmTasks("grunt-contrib-compass");
 };