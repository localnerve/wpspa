/**
 * js-beautifier
 *
 * Load and config the js-beautifier task.
 * Relies on config from contrib-jshint task.
 */
module.exports = function(grunt) {

  grunt.config("jsbeautifier", {
      files: ["<%= jshint.files %>", "<%= jshint.test.src %>"],
      options: {
        indent_size: 2,
        indent_char: " ",
        indent_level: 0,
        indent_with_tabs: false,
        preserve_newlines: true,
        max_preserve_newlines: 2,
        jslint_happy: false,
        brace_style: "collapse",
        keep_array_indentation: false,
        keep_function_indentation: false,
        space_before_conditional: true,
        break_chained_methods: false,
        eval_code: false,
        wrap_line_length: 0,
        unescape_strings: false
      }
  });

  grunt.loadNpmTasks("grunt-jsbeautifier");
};