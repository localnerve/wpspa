/*
 * The search router
 * Routes search requests
 */
define([
  "backbone.marionette",
  "app",
  "components/search/controller"
], function(Marionette, app) {

  var thisModule = app.module("search", function(search) {

    // The definition for the search router
    var SearchRouter = Marionette.AppRouter.extend({
      appRoutes: {
        "search/*query": "search"
      }
    });

    app.vent.once("app:router:initialize", function() {
      search.router = new SearchRouter({
        controller: search.controller
      });
    });

    search.addFinalizer(function() {
      if (this.router)
        delete this.router;
    });
  });

  return thisModule;
});