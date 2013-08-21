define([
  "backbone.marionette",
  "modules/helpers/contract",
  "app",
  "modules/controllers/appController"
], function(Marionette, contract, app) {

  // create the application module
  var thisModule = app.module("appRouter");

  // the definition for the appRouter
  var Router = Marionette.AppRouter.extend({
    appRoutes: {
      "*default": "notfound"
    },

    initialize: function(options) {
      contract(options, "vent", "reqres");

      // honor requests for this instance
      options.reqres.setHandler("appRouter:instance", function() {
        return thisModule.instance;
      });

      // listen for add route events for appRouter
      this.listenTo(options.vent, "appRouter:addRoute", this.addRoute);
    },

    // addRoute handler
    // dynamically add a route and a handler
    addRoute: function(options) {
      contract(options, "route", "name");
      this.options.vent.trigger("appController:createHandler", options);
      this.appRoutes[options.name] = options.route;
      this.appRoute(options.route, options.name);
    }
  });

  // app module initialization
  thisModule.addInitializer(function(options) {
    options.controller = app.request("appController:instance");
    this.instance = new Router(options);
  });

  thisModule.addFinalizer(function() {
    delete this.instance;
  });

  return thisModule;

});
