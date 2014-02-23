/**
 * mockapi
 *
 * Updates the mockapi automated.json file with environment specific requests/responses.
 *
 * Convenient wrapper multi task for atfRemove, express (et.al.), and mockapi-update
 * Has the same targets as mockapi-update.
 */
 module.exports = function(grunt) {

  grunt.config("mockapi", {
    dev: {
      options: {
        serverTask: "express:development"
      }
    },
    debug: {
      options: {
        serverTask: "express:debug"
      }
    },
    release: {
      options: {
        serverTask: "express:release"
      }
    }
  });

  grunt.registerMultiTask("mockapi", "update the mockapi automated.json source", function() {
    var options = this.options();

    // start with any prerequisite build
    var taskList = this.target === "dev" ? [] : [this.target];

    // add the required tasks
    taskList = taskList.concat([
      "atfRemove:redis",
      options.serverTask,
      "mockapi-update:"+this.target,
      "atfUpdate:"+this.target
    ]);

    grunt.task.run(taskList);
  });

 };