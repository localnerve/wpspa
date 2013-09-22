define([
  "app",
  "components/layout/header/navigation/view"
], function(app, navigationView) {

  // Create a partial definition for container.header module
  var thisModule = app.module("container.header", function(header) {

    // add another header module initializer
    header.addInitializer(function(options) {
      this.navigation = navigationView.create(options);
    });

    // add a finalizer to the container.header module 
    header.addFinalizer(function() {
      delete this.navigation;
    });

    // after app initialization, download the data
    app.on("initialize:after", function() {

      // forward the add event
      header.listenTo(header.navigation.collection, "add", function(model) {
        app.vent.trigger("wpspa:router:addRoute", {
          name: model.get("name"),
          route: model.get("route"),
          options: {
            object_type: model.get("object_type"),
            object_id: model.get("object_id")
          }
        });
      });
      
      // start the navigation download
      header.navigation.collection.fetch({
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
      }).done(function() {
        header.stopListening();
      });
    });

  });

  return thisModule;
});
