define([
  "app",
  "module",
  "components/layout/header/navigation/view"
], function(app, module, navigationView) {

  // Create a partial definition for container.header module
  var thisModule = app.module("container.header", function(header) {

    // add another header module initializer
    header.addInitializer(function(options) {
      this.navigation = navigationView.create(options);
      this.timeout = module.config().timeout;
    });

    // add a finalizer to the container.header module 
    header.addFinalizer(function() {
      delete this.navigation;
    });

    // After app initialization, update routing and start the download
    app.on("initialize:after", function() {

      // When an item is added to navigation, add it to the app router
      header.listenTo(header.navigation.collection, "add", function(model) {
        app.vent.trigger("app:router:addRoute", {
          name: model.get("name"),
          route: model.get("route"),
          options: {
            object_type: model.get("object_type"),
            object_id: model.get("object_id")
          }
        });
      });
      
      // Start the navigation download
      header.navigation.collection.fetch({
        timeout: header.timeout,

        success: function(collection) {
          // send out a pretch content event
          app.vent.trigger("content:prefetch", collection.map(function(model) {
            return {
              object_type: model.get("object_type"),
              object_id: model.get("object_id")
            };
          }));

          // navigation successfully loaded, tell the container
          app.vent.trigger("container:complete");
        },
        error: function(collection, response, options) {
          // navigation failed to load, tell the app
          app.vent.trigger("app:error", {
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