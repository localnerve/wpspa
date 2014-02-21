/**
 * requirejs-transformconfig
 *
 * Load and config grunt-requirejs-transformconfig.
 * Transform the requirejs config with common and env specific config.
 * By maintaining one requirejs config at build time, we can avoid the cost of multiple calls
 *   to a runtime config update, which equates to 6x size increase in that role because
 *   then we can't use almond. These are not runtime updates, so the cost is unwarranted.
 */
var mixinEnvConfig = require("../helpers").mixinEnvConfig;

module.exports = function(grunt) {

  grunt.config("requirejs-transformconfig", {
    test: {
      options: {
        transform: (function(env) {
          return function(config) {
            return mixinEnvConfig(env, config);
          };
        }("test"))
      },
      src: "<%= project.app %>/config.js",
      dest: "<%= project.app %>/config.js"
    },
    demo: {
      options: {
        transform: (function(env) {
          return function(config) {
            return mixinEnvConfig(env, config);
          };
        }("demo"))
      },
      src: "<%= project.app %>/config.js",
      dest: "<%= project.app %>/config.js"
    },
    dev: {
      options: {
        transform: (function(env) {
          return function(config) {
            return mixinEnvConfig(env, config);
          };
        }("development"))
      },
      src: "<%= project.app %>/config.js",
      dest: "<%= project.app %>/config.js"
    },
    debug: {
      options: {
        transform: (function(env) {
          return function(config) {
            return mixinEnvConfig(env, config);
          };
        }("debug"))
      },
      src: "<%= project.app %>/config.js",
      dest: "<%= project.app %>/config.js"
    },
    release: {
      options: {
        transform: (function(env) {
          return function(config) {
            return mixinEnvConfig(env, config);
          };
        }("release"))
      },
      src: "<%= project.app %>/config.js",
      dest: "<%= project.app %>/config.js"
    }
  });

  grunt.loadNpmTasks("grunt-requirejs-transformconfig");
};