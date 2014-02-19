/*
 * grunt-requirejs-config
 * http://github.com/garryyao/grunt-requirejs-config
 *
 * Copyright (c) 2013 Garry Yao
 * Licensed under the MIT license.
 */

'use strict';

module.exports = function (grunt) {
  // load all npm grunt tasks
  require('load-grunt-tasks')(grunt);

  // Project configuration.
  grunt.initConfig({
    jshint: {
      all: [
        'Gruntfile.js',
        'tasks/*.js',
        '<%= nodeunit.tests %>'
      ],
      options: {
        jshintrc: '.jshintrc',
        reporter: require('jshint-stylish')
      }
    },

    // Before generating any new files, remove any previously-created files.
    clean: {
      tests: ['tmp']
    },

    // Configuration to be run (and then tested).
    "requirejs-transformconfig": {
			options: {
				// Some transformation goes here.
				transform: function(config) {
					config.baseUrl = '.';
					config.packages.push({
						name: "foo",
						location: "/my/path/foo"
					});
					return config;
				}
			},
			test: {
				src: 'test/fixtures/config.js',
				dest: 'tmp/config.js'
			}
    },

    // Unit tests.
    nodeunit: {
      tests: ['test/test.js']
    }

  });

  // Actually load this plugin's task(s).
  grunt.loadTasks('tasks');

  // Whenever the "test" task is run, first clean the "tmp" dir, then run this
  // plugin's task(s), then test the result.
  grunt.registerTask('test', ['clean', 'requirejs-transformconfig:test', 'nodeunit']);

  // By default, lint and run all tests.
  grunt.registerTask('default', ['jshint', 'test']);

};
