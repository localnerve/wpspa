/*
 * The container.search router
 * Routes search requests
 */
define([
  "backbone.marionette",
  "app",
  "components/layout/search/controller"
], function(Marionette, app) {

  var thisModule = app.module("container.search", function(search) {

    // The definition for the search router
    var SearchRouter = Marionette.AppRouter.extend({
      appRoutes: {
        "search/*query": "search"
      }
    });

    app.vent.once("wpspa:router:initialize", function() {
      search.router = new SearchRouter({
        controller: search.controller
      });
    });

  });

  return thisModule;
});
