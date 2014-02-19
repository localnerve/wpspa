'use strict';

var grunt = require('grunt');
var rjs = require('requirejs');

exports["requirejs-config"] = {
	setUp: function(done) {
		// setup here if necessary
		done();
	},
	"transform requirejs config": function(test) {
		rjs.tools.useLib(function(require) {
			var actual = grunt.file.read('tmp/config.js');
			var expected = grunt.file.read('test/expected/config.js');
			require('transform').modifyConfig(actual, function(actual) {
				require('transform').modifyConfig(expected, function(expected) {
					test.deepEqual(actual, expected, "Transformed rjs configuration doesn't match.");
					test.done();
				});
			});
		});
	}
};
