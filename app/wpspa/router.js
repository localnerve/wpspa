/*
 * The wpspa router
 * Routes wpspa level state changes
 */
define([
  "lodash",
  "backbone.marionette",
  "helpers/contract",
  "app",
  "wpspa/controller"
], function(_, Marionette, contract, app) {

  // Create a partial definition for WPSPA module
  var thisModule = app.module("wpspa", function(wpspa, app) {

    // The definition for the dynamic WPSPA.router
    var AppRouter = Marionette.AppRouter.extend({
      appRoutes: {
        "*default": "notfound"
      },

      initialize: function( /*options*/ ) {

        // Add route events handler, adds a dynamic route
        // NOTE: instead of calling this.addRoute, using a function allows test stubs.
        //  This appears to be because handlers are bound at definition, disallowing stubs later (during test).
        this.listenTo(app.vent, "wpspa:router:addRoute", function(options) {
          wpspa.router.addRoute(options);
        });
      },

      // The addRoute handler
      // Dynamically add a route AND a handler
      addRoute: function(options) {
        contract(options, "route", "name");
        app.vent.trigger("wpspa:controller:createHandler", options);
        // the next line should be un-necessary.
        this.appRoutes[options.name] = options.route;
        this.appRoute(options.route, options.name);
      }
    });

    // Add the initializer for this module partial
    app.addInitializer(function(options) {
      // Create the wpspa router
      wpspa.router = new AppRouter(_.extend({
        controller: app.wpspa.controller
      }, options));
    });

  });

  thisModule.addFinalizer(function() {
    app.wpspa.router.stopListening();
    delete app.wpspa.router;
  });

  return thisModule;

});
