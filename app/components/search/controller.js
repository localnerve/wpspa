/*
 * The search controller.
 * Responds to search queries.
 */
define([
  "backbone.marionette",
  "app",
  "components/search/model",
  "components/search/views/main"
], function(Marionette, app, model, views) {

  var thisModule = app.module("search", function(search) {

    // The definition of the search controller
    var SearchController = Marionette.Controller.extend({
      search: function(query) {
        var object_type = "search:"+query;
        var object_id = query;

        // start the results download, if required
        app.vent.trigger("content:prefetch", {
          object_type: object_type,
          object_id: object_id,
          create: function(options) {
            return model.create(options);
          }
        });

        // start the content
        app.vent.trigger("content:start", {
          options: {
            object_type: object_type,
            object_id: object_id
          },
          params: {
            emptyView: function() {
              views.Empty.prototype.query = query;
              return views.Empty;
            }
          },
          content: function() {
            return views.content;
          },
          error: function() {
            return views.error;
          },
          transition: function() {
            return views.transition;
          }
        });
      }
    });

    // Add the initializer for this module partial
    search.addInitializer(function(options) {
      // Create the search controller instance
      this.controller = new SearchController(options);
    });

    search.addFinalizer(function() {
      delete this.controller;
    });

  });

  return thisModule;
});