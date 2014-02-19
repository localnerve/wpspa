/*
 * grunt-requirejs-transformconfig
 * Copyright (c) 2013
 * Licensed under the MIT license.
 */

'use strict';

module.exports = function(grunt) {

	// Please see the Grunt documentation for more information regarding task
	// creation: http://gruntjs.com/creating-tasks

	grunt.registerMultiTask('requirejs-transformconfig', '', function() {
		var done = this.async();
		var me = this;
		var options = this.options({
			transform: function(config) {
				return config;
			}
		});

		require('requirejs/bin/r.js').tools.useLib(function(require) {

			if (!(grunt.util.kindOf(me.files) === 'array' && me.files.length)) {
				grunt.log.error("requirejs config file(s) are not specified.");
				return;
			}

			me.files.forEach(function(group) {
				var contents = grunt.file.read(group.src[0]);
				contents = require('transform').modifyConfig(contents, options.transform);
				grunt.file.write(group.dest, contents);
				grunt.log.writeln('RequireJS config file "' + group.dest + '" created.');
			});

			done();
		});
	});

};
