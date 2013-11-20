/*
 * The search controller.
 * Responds to search queries.
 */
define([
  "backbone.marionette",
  "app",
  "resources/strings",
  "components/search/model",
  "components/search/views/main"
], function(Marionette, app, strings, model, views) {

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
          route: "search/"+query,
          options: {
            object_type: object_type,
            object_id: object_id
          },
          params: {
            empty: {
              view: function() {
                views.Empty.prototype.query = query;
                return views.Empty;
              }
            },
            header: {
              message: function(model) {
                if (model.collection.length > 0) {
                  return strings.search.view.heading.message.replace(
                    strings.search.view.heading.replacement,
                    query
                  );
                } else {
                  return strings.search.empty.heading;
                }
              }
            }
          },
          error: function() {
            return views.error;
          },
          progress: function() {
            return views.progress;
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