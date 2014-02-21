/**
 * atf-remove
 *
 * Removes ATF content from a target file | redis
 * options:
 *   update - "file" (requires corresponding src) | <redisKey>
 */
module.exports = function(grunt) {
 
   grunt.config("atfRemove", {
      options: {
        atfLib: "<%= project.projectDir %>/<%= project.server %>/workers/atf/lib"
      },
      test: {
        options: {
          update: "file"
        },
        src: [
          "<%= project.test %>/index.html"
        ]
      },
      redis: {
        options: {
          update: "<%= project.atfKey %>"
        }
      }
    });

  // Custom internal task to remove atf content from files or redis
  grunt.registerMultiTask("atfRemove", "remove atf content from target", function() {
    var options = this.options();
    var done = this.async();
    var atf = require(options.atfLib);

    if (options.update === "file") {
      var count = 0,
          files = this.filesSrc;
      files.forEach(function(file) {
        atf.file.remove(file, function(err, target) {
          if (err) {
            grunt.fail.fatal(err);
          }
          grunt.log.writeln("removed atf content from "+target);
          count++;
          if (count === files.length) {
            grunt.log.ok(files.length + " files updated");
            done();
          }
        });
      });
    } else {
      atf.redis.remove(options.update, function(err, key) {
        if (err) {
          grunt.fail.fatal(err);
        } else {
          grunt.log.ok("removed atf content from Redis '"+key+"'");
        }
        done();
      });
    }
  });
 
 };