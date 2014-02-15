define([
  "helpers/routes",
  "app",
  "components/layout/header/navigation/routes",
  "components/layout/header/navigation/view"
], function(routes, app, navigationRoutes, navigationView) {

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

    // After app initialization, update routing and start the download
    app.on("initialize:after", function() {
      
      // Start the navigation download
      header.navigation.collection.fetch({
        timeout: header.timeout,

        success: function(collection) {

          navigationRoutes.addRoutes(collection);

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
      });
    });

  });

  return thisModule;
});