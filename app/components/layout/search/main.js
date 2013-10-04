/*
 * The search module
 * Defines the container.search
 *
 * This is a container module that will have output in the content area.
 * So 
 */
define([
  "lodash",
  "app",
  "components/layout/search/router"
], function(_, app) {

  // Create a partial definition for container.search module
  var thisModule = app.module("container.search", function(search) {

    app.on("initialize:after", function() {
      app.vent.trigger("container:complete");
    });

  });

  return thisModule;

});
