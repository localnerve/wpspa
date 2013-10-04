/*
 * The container.search controller.
 * Responds to search queries.
 */
define([
  "backbone.marionette",
  "app",
  "components/layout/search/model",
  // TODO: restructure this
  "components/content/views/multiView"
], function(Marionette, app, model, view) {

  var thisModule = app.module("container.search", function(search) {

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
          view: function() {
            return view;
          }
        });
      }
    });

    // Add the initializer for this module partial
    search.addInitializer(function(options) {
      // Create the search controller instance
      this.controller = new SearchController(options);
    });

  });

  return thisModule;
});