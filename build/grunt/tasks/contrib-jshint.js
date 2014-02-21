/**
 * contrib-jshint
 *
 * Load and config the contrib-jshint task.
 */
module.exports = function(grunt) {

  grunt.config("jshint", {
    client: {
      // The jshint option for scripturl is set to lax, because the anchor
      // override inside anchor.js needs to test for them so as to not accidentally
      // route.
      options: {
        scripturl: true,

        // Allows the use of expressions in assignments. 
        // "Expected an assignment or function call and instead saw an expression."
        "-W093": false
      },
      src: [
        "Gruntfile.js", "<%= project.app %>/**/*.js"
      ]
    },
    server: {
      src: [
        "<%= project.serverMain %>",
        "<%= project.server %>/**/*.js"
      ]
    },
    test: {
      options: {
        // This is because we use chai chain syntax for readability
        "-W030": false,
        "-W024": false
      },
      src: ["<%= project.test %>/**/*.js"]
    }
  });

  grunt.loadNpmTasks("grunt-contrib-jshint");
};