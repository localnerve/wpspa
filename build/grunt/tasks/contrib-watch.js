/**
 * contrib-watch
 *
 * Watch changes to all js, css, and markup.
 * When a change is detected, we run any associated tasks and signal livereload.
 * This task relies on jshint src settings for js file detection.
 */
module.exports = function(grunt) {

  grunt.config("watch", {
    options: {
      livereload: true
    },
    js: {
      files: [
      "<%= jshint.client.src %>",
      "<%= jshint.test.src %>",
      "<%= jshint.server.src %>"
      ],
      tasks: ["jshint"]
    },
    css: {
      files: ["<%= project.app %>/**/*.scss"],
      tasks: ["compass:dev"]
    },
    html: {
      files: ["<%= project.app %>/**/*.html"]
    }
  });

  grunt.loadNpmTasks("grunt-contrib-watch");
};