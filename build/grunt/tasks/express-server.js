/**
 * express-server
 *
 * Load and config expressJS.
 */
module.exports = function(grunt) {

  grunt.config("express", {
    options: {
      script: "<%= project.serverMain %>"
    },
    // this server is for interactive development
    dev: {
      options: {
        node_env: "development",
        background: false
      }
    },
    // this server is for running the development server in the background
    development: {
      options: {
        node_env: "development",
        background: true
      }
    },
    // this server is for automated tests
    test: {
      options: {
        node_env: "test",
        background: true
      }
    },
    // this server is for interactive test development
    devTest: {
      options: {
        node_env: "test",
        background: false
      }
    },
    // this server is for demo use without a live backend
    demo: {
      options: {
        script: "<%= project.dist.release %>/<%= project.serverMain %>",
        node_env: "demo",
        background: false
      }
    },
    // this server is for the automated debug build
    debug: {
      options: {
        script: "<%= project.dist.debug %>/<%= project.serverMain %>",
        node_env: "debug",
        background: true
      }
    },
    // this server is for interactively testing the debug distribution
    devDebug: {
      options: {
        script: "<%= project.dist.debug %>/<%= project.serverMain %>",
        node_env: "debug",
        background: false
      }
    },
    // this server is for the automated release build
    release: {
      options: {
        script: "<%= project.dist.release %>/<%= project.serverMain %>",
        node_env: "release",
        background: true
      }
    },
    // this server is for interactively testing the release distribution
    devRelease: {
      options: {
        script: "<%= project.dist.release %>/<%= project.serverMain %>",
        node_env: "release",
        background: false
      }
    }
  });

  grunt.loadNpmTasks("grunt-express-server");
};