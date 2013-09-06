define([
  "backbone.marionette",
  "app",
  "components/layout/header/navigation/view"
], function(Marionette, app, navigationView) {

  // Create a partial definition for wpspa.container module
  var thisModule = app.module("container.header", function(header, app) {

    // add another header module initializer
    header.addInitializer(function(options) {

      // create the navigation view instance
      this.navigation = navigationView.create(options);

      // start the navigation download
      this.navigation.collection.fetch({
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

    header.addFinalizer(function() {
      this.navigation.stopListening();
      delete this.navigation;
    });

  });

  return thisModule;
});
