define([
  "backbone.marionette",
  "app",
  "modules/helpers/contract",
  "modules/layouts/appLayout"
], function(Marionette, app, contract) {

  // create application module
  var thisModule = app.module("appController");

  // definition of the appController
  var Controller = Marionette.Controller.extend({

    initialize: function(options) {
      contract(options, "vent", "reqres");

      // honor requests for this instance
      options.reqres.setHandler("appController:instance", function() {
        return thisModule.instance;
      });

      // listen for requests to dynamically add a route handler
      this.listenTo(options.vent, "appController:createHandler", function(options) {
        thisModule.instance.createHandler(options);
      });
    },

    // handle the notfound route
    notfound: function(path) {
      // signal that the application should exit
      this.options.vent.trigger("app:exit", {
        path: path
      });
    },

    // dynamically add a route handler
    createHandler: function(options) {
      contract(options, "name", "options", "options.object_type");

      // expand this controller to include the new route handler.
      // it will always delegate to the proper handler for the object type.
      // NEXT TODO: finish content [page|post|category] hierarchy with prefetch.
      this[options.name] = function() {
        this.options.vent.trigger("content:"+options.options.object_type+":start", options.options);
      };
    }
  });

  // app module initialization
  thisModule.addInitializer(function(options) {
    this.instance = new Controller(options);
  });

  thisModule.addFinalizer(function() {
    delete this.instance;
  });

  return thisModule;

});
