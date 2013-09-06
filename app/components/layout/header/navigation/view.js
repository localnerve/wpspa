define([
  "lodash",
  "backbone.marionette",
  "app",
  "helpers/anchor",
  "helpers/contract",
  "components/layout/header/navigation/item",
  "components/layout/header/navigation/entities"
], function(_, Marionette, app, anchor, contract, itemView, entities) {

  // The definition of navigation view
  var NavigationView = Marionette.CompositeView.extend({
    template: "components/layout/header/navigation/view",
    itemView: itemView,
    tagName: "nav",
    className: "top-bar",
    itemViewContainer: ".wpspa-nav",

    collectionEvents: {
      "add": "onAdd"
    },

    initialize: function() {
      // listen to message bus navigation events        
      this.listenTo(app.vent, "content:start", this.onContentStart);
    },
    /*
    appendHtml: function(collectionView, itemView, index) {
      // TODO: implement navigation hierarchy
    },
    */

    // When this view's collection adds a model, this method is triggered
    // We tell the appRouter to add a route
    onAdd: function(model) {
      app.vent.trigger("wpspa:router:addRoute", {
        name: model.get("name"),
        route: model.get("route"),
        options: {
          object_type: model.get("object_type"),
          object_id: model.get("object_id")
        }
      });
    },

    // Manage the top-bar when content changes
    // Reassign the active item, close the menu if required
    onContentStart: function(options) {
      contract(options, "route");
      
      this.$itemViewContainer.find(".active").removeClass("active");

      var href = anchor.routeToHref(options.route);
      var item = this.$itemViewContainer.find("a[href='"+href+"']").parent();
      item.addClass("active");

      if (this.$el.hasClass("expanded"))
        this.$(".toggle-topbar").click();
    }
  });

  return {
    create: function(options) {
      return new NavigationView(_.extend({
        collection: entities.createCollection()
      }, options));
    }
  };

});