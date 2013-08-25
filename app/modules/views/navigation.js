define([
  "backbone.marionette",
  "app",
  "modules/helpers/contract",
  "modules/entities/navigation"
], function(Marionette, app, contract, navigationEntity) {

  // create this app module in the proper namespace
  var thisModule = app.module("appLayout.headerLayout.navigation");

  // The view definition of each navigation item
  var NavItemView = Marionette.ItemView.extend({
    template: "navigation-item",
    tagName: "li",

    serializeData: function() {
      return {
        name: this.model.get("name"),
        route: this.model.get("route"),
        navItem: this.model.get("nav_item")
      };
    }
  });

  // The view definition of navigation
  var NavigationView = Marionette.CompositeView.extend({
    template: "navigation",
    itemView: NavItemView,
    tagName: "nav",
    className: "top-bar",
    itemViewContainer: ".wpspa-nav",

    initialize: function(options) {
      contract(options, "reqres", "vent");
      options.reqres.setHandler("headerLayout:navigation:instance", function() {
        return thisModule.instance;
      });
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
      this.options.vent.trigger("appRouter:addRoute", {
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
  thisModule.addInitializer(function(options) {
    
    // dont expose the navigation entity to the rest of application
    var navigationOptions = _.clone(options);
    navigationOptions.collection = navigationEntity.create(options);

    // create the navigation view instance
    this.instance = new NavigationView(navigationOptions);

    // start the navigation download
    navigationOptions.collection.fetch({
      success: function(collection, response, options) {
        // navigation successfully loaded, tell the app
        app.vent.trigger("app:navigation:success");
      },
      error: function(collection, response, options) {
        // navigation failed to load, tell the app
        app.vent.trigger("app:navigation:error", collection, response, options);
      }
    });
  });

  thisModule.addFinalizer(function() {
    delete this.instance;
  });

  return thisModule;
});
