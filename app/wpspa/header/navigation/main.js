define([
  "lodash",
  "backbone.marionette",
  "app",
  "wpspa/header/navigation/entities"
], function(_, Marionette, app, entities) {

  // create this app module in the proper namespace
  var thisModule = app.module("wpspa", function(wpspa, app) {

    // The view definition of each navigation item
    var NavItemView = Marionette.ItemView.extend({
      template: "wpspa/header/navigation/item",
      tagName: "li",

      serializeData: function() {
        return {
          name: this.model.get("name"),
          route: (function(route) {
            if (_.isString(route)) {
              if (route.length === 0)
                route = "/";
            }
            return route;
          }(this.model.get("route"))),
          navItem: this.model.get("nav_item")
        };
      }
    });

    // The view definition of navigation
    var NavigationView = Marionette.CompositeView.extend({
      template: "wpspa/header/navigation/view",
      itemView: NavItemView,
      tagName: "nav",
      className: "top-bar",
      itemViewContainer: ".wpspa-nav",

      initialize: function(/*options*/) {
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

    // app module initialization
    app.addInitializer(function(options) {
      
      // create the navigation view instance
      wpspa.navigation = new NavigationView(_.extend({
        collection: entities.create({ collection: true })
      }, options));

      // start the navigation download
      wpspa.navigation.collection.fetch({
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
    app.wpspa.navigation.stopListening();
    delete app.wpspa.navigation;
  });

  return thisModule;
});
