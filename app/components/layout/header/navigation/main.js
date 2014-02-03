define([
  "helpers/routes",
  "app",
  "components/layout/header/navigation/view"
], function(routes, app, navigationView) {

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

      // When an item is added to navigation, add it to the app router
      header.listenTo(header.navigation.collection, "add", function(model) {
        var object_props = model.get("object_props");
        var param = {
          name: model.get("name"),
          route: model.get("route"),
          options: {
            object_type: model.get("object_type"),
            object_id: model.get("object_id"),
            object_props: object_props
          }
        };

        // If the target object is_single, add comment routes
        var altParams = object_props.is_single ?
          routes.buildCommentRoutes(
            app.pushState, param.route, param.name, param.options
          ).routeParams : [];

        // Add the new routes
        app.vent.trigger("app:router:addRoute", [param].concat(altParams));
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