/*
 * The app router
 * Main router for the application
 */
define([
  "lodash",
  "backbone.marionette",
  "helpers/contract",
  "app",
  "components/controller"
], function(_, Marionette, contract, app) {

  // The definition for the dynamic application level router
  var AppRouter = Marionette.AppRouter.extend({
    appRoutes: {
      "*default": "notfound"
    },

    initialize: function() {

      // Add route events handler, adds a dynamic route
      // NOTE: instead of calling this.addRoute, using a function allows test stubs.
      //  This appears to be because handlers are bound at definition, disallowing stubs later (during test).
      app.vent.on("wpspa:router:addRoute", function(options) {
        app.router.addRoute(options);
      });
    },

    // The addRoute handler
    // Dynamically add a route AND a handler
    addRoute: function(options) {
      contract(options, "route", "name");
      if (!this.appRoutes[options.route]) {

        app.vent.trigger("wpspa:controller:createHandler", options);

        // the next line should be un-necessary, come on Marionette.
        this.appRoutes[options.route] = options.name;
        this.appRoute(options.route, options.name);
      }
    }
  });

  // Add the initializer for this module partial
  app.addInitializer(function(options) {
    // Create a router at the app level
    app.router = new AppRouter(_.extend({
      controller: app.controller
    }, options));
  });

  return AppRouter;

});
