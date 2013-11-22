/*
 * The app controller.
 * Handles notfound events and dynamically added routes.
 */
define([
  "backbone.marionette",
  "app",
  "helpers/contract",
  // Load the layout container
  "components/layout/main",
  // Load the content factory
  "components/content/main",
  // Load the search component
  "components/search/main"
], function(Marionette, app, contract) {

  // The definition of the application level controller
  var AppController = Marionette.Controller.extend({

    // Always handle the notfound route
    notfound: function(path) {
      // signal that the application should exit
      app.vent.trigger("app:exit", {
        path: path
      });
    },

    // Handler to dynamically add a route handler, pay attention.
    createHandler: function(options) {
      contract(options, "name", "options");

      // Here, we expand this controller to include the new route handler.
      // It will always delegate to the proper handler for the object type.
      // For now, it will always be a content event: See contentRegion.
      this[options.name] = function() {
        app.vent.trigger("content:start", options);
      };
    }
  });

  // add an app initialization
  app.addInitializer(function(options) {
    // Create a controller at the app level
    app.controller = new AppController(options);
  });

  return AppController;

});