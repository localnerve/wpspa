define([
   "backbone.marionette",
   "modules/controllers/controller"
], function (Marionette, controller){

    var Router = Marionette.AppRouter.extend({
      appRoutes: {
          "(/)" : "index",
          "*default" : "notfound"
      }
    });

    return {
      create: function(options) {
        return new Router({
          controller: controller.create(options)
        });
      }
    };

});