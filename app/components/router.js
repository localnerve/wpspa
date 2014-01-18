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
  // denote a global reference to window
  var $w = window;

  // The definition for the dynamic application level router
  var AppRouter = Marionette.AppRouter.extend({
    appRoutes: {
      "*default": "notfound"
    },

    initialize: function() {

      // Add route events handler, adds a dynamic route
      // NOTE: instead of calling this.addRoute, using a function allows test stubs.
      //  This appears to be because handlers are bound at definition, disallowing stubs later (during test).
      app.vent.on("app:router:addRoute", function(options) {
        app.router.addRoute(options);
      });
    },

    // The addRoute handler
    // Dynamically add a route AND a handler
    addRoute: function(options) {
      contract(options, "route", "name");
      if (!this.appRoutes[options.route]) {
        
        app.controller.createHandler(options);

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

    // Expose the dynamic route array to the global namespace
    ($w.wpspa = $w.wpspa || {}).appRoutes = app.router.appRoutes;

    // Signal that its ok to add other routers.
    // Since this handles a default route, it needs to be first, so that it's last to be evaluated by Backbone.Router
    app.vent.trigger("app:router:initialize");
  });

  return AppRouter;

});