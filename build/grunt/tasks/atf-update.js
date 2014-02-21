/**
 * atf-update
 *
 * Updates a target file | redis with remote content to be delivered ATF
 * options:
 *   environment - NODE_ENV for the server configuration
 *   update - "file" (requires corresponding src) | <redisKey>
 */
module.exports = function(grunt) {
 
   grunt.config("atfUpdate", {
     options: {
        atfLib: "<%= project.projectDir %>/<%= project.server %>/workers/atf/lib"
      },
      dev: {
        options: {
          environment: "development",
          update: "<%= project.atfKey %>"
        }
      },
      test: {
        options: {
          update: "file",
          environment: "test"
        },
        src: ["<%= project.test %>/index.html"]
      },
      demo: {
        options: {
          update: "file",
          environment: "test"
        },
        src: ["<%= project.dist.release %>/index.html"]
      },
      debug: {
        options: {
          environment: "debug",
          update: "<%= project.atfKey %>"
        }
      },
      release: {
        options: {
          environment: "release",
          update: "<%= project.atfKey %>"
        }
      }
   });

  // Custom internal task to update files or redis with atf content
  grunt.registerMultiTask("atfUpdate", "update atf content in targets", function() {
    var options = this.options();
    var done = this.async();
    var atf = require(options.atfLib);
    
    if (options.update === "file") {
      var count = 0,
          files = this.filesSrc;
      files.forEach(function(file) {
        atf.run(atf.file.update(file, function(err, target) {
          if (err) {
            grunt.fail.fatal(err);
          }
          grunt.log.writeln("updated "+target+" with atf content");
          count++;
          if (count === files.length) {
            grunt.log.ok(files.length + " files updated");
            done();
          }
        }), options.environment);
      });
    } else {
      atf.run(atf.redis.update(options.update, function(err, key) {
        if (err) {
          grunt.fail.fatal(err);
        } else {
          grunt.log.ok("updated atf content in redis '"+key+"'");
        }
        done();
      }), options.environment);
    }
  });
 
 };