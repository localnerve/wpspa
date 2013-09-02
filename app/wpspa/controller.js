/*
 * The wpspa controller.
 * Handles notfound events and dynamic wpspa added routes.
 */
define([
  "backbone.marionette",
  "app",
  "helpers/contract",
  "wpspa/layout/main"
], function(Marionette, app, contract) {

  // Create a partial definition for WPSPA module
  var thisModule = app.module("wpspa", function(wpspa, app) {

    // The definition of the appController
    var AppController = Marionette.Controller.extend({

      initialize: function( /*options*/ ) {
        var self = this;
        // Create the handler to dynamically add a route handler
        this.listenTo(app.vent, "wpspa:controller:createHandler", function(options) {
          self.createHandler(options);
        });
      },

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
          app.vent.trigger("content:start", options.options);
        };
      }
    });

    // app module initialization
    app.addInitializer(function(options) {
      // Create the wpspa controller
      wpspa.controller = new AppController(options);
    });

  });

  thisModule.addFinalizer(function() {
    app.wpspa.controller.stopListening();
    delete app.wpspa.controller;
  });

  return thisModule;

});
