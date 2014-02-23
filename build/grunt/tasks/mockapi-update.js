/**
 * mockapi-update
 *
 * Updates the mock api fixture with a snapshot of the backend data
 * 
 * Relies on tasks atfRemove, express-server to be run prior (externally) before this runs
 */
var path = require("path");
var mockapiUpdate = require("./mockapi-update-lib");

module.exports = function(grunt) {

  grunt.config("mockapi-update", {
    options: {
      timeout: 6000,
      output: "test/fixtures/api-automated.json",
      mockHost: "<%= project.mock.host %>:<%= project.mock.port %>",
      phantomjs: path.join("<%= project.projectDir%>", "node_modules/phantomjs/lib/phantom/bin")
    },
    dev: {
      options: {
        timeout: 12000,
        environment: "development"
      }
    },
    debug: {
      options: {
        environment: "debug"
      }
    },
    release: {
      options: {
        environment: "release"
      }
    }
  });

  grunt.registerMultiTask("mockapi-update", "update the mockapi fixture with backend data", function() {
    var options = this.options({
      environment: "development",
      timeout: 5000
    });

    var done = this.async();

    mockapiUpdate.run(options.environment, options.timeout, options.phantomjs, options.mockHost,
    function(err, result) {
      if (!err) {
        grunt.log.writeln("writing "+options.output+"...");
        grunt.file.write(options.output, JSON.stringify(result), { encoding: "utf8" });
      } else {
        grunt.fail.fatal(err);
      }
      done(err);
    });
  });

};