/*
 * The search module
 * Defines the search module
 *
 * This is an add on module that will have output in the content area.
 */
define([
  "lodash",
  "app",
  "components/search/router"
], function(_, app) {

  // Create a partial definition for search module
  var thisModule = app.module("search", function(search) {

    app.on("initialize:after", function() {
      app.vent.trigger("container:complete");
    });

  });

  return thisModule;

});
