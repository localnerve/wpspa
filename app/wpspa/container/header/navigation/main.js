define([
  "lodash",
  "backbone.marionette",
  "app",
  "wpspa/container/header/navigation/item",
  "wpspa/container/header/navigation/entities"
], function(_, Marionette, app, itemView, entities) {

  // Create a partial definition for wpspa.container module
  var thisModule = app.module("wpspa.container", function(container, app) {

    // The view definition of navigation
    var NavigationView = Marionette.CompositeView.extend({
      template: "wpspa/container/header/navigation/view",
      itemView: itemView,
      tagName: "nav",
      className: "top-bar",
      itemViewContainer: ".wpspa-nav",

      initialize: function( /*options*/ ) {
        // connect the add event handler to the collection
        this.listenTo(this.collection, "add", this.onAdd);
      },
      /*
      appendHtml: function(collectionView, itemView, index) {
        // TODO: implement navigation hierarchy
      },
  */
      // "add" event handler
      // when a collection adds a model, this method is triggered
      // we tell the appRouter to add a route
      onAdd: function(model) {
        app.vent.trigger("wpspa:router:addRoute", {
          name: model.get("name"),
          route: model.get("route"),
          options: {
            object_type: model.get("object_type"),
            object_id: model.get("object_id")
          }
        });
      }
    });

    // add another app module initializer
    app.addInitializer(function(options) {

      // create the navigation view instance
      container.navigation = new NavigationView(_.extend({
        collection: entities.createCollection()
      }, options));

      // start the navigation download
      container.navigation.collection.fetch({
        success: function(collection) {
          // send out a pretch content event
          app.vent.trigger("content:prefetch", collection.map(function(model) {
            return {
              object_type: model.get("object_type"),
              object_id: model.get("object_id")
            };
          }));

          // navigation successfully loaded, tell the app
          app.vent.trigger("app:navigation:success");
        },
        error: function(collection, response, options) {
          // navigation failed to load, tell the app
          app.vent.trigger("app:navigation:error", {
            collection: collection,
            response: response,
            options: options
          });
        }
      });
    });
  });

  thisModule.addFinalizer(function() {
    app.wpspa.container.navigation.stopListening();
    delete app.wpspa.container.navigation;
  });

  return thisModule;
});
