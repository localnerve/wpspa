define([
  "lodash",
  "backbone.marionette",
  "app",
  "components/layout/footer/sidebarContainer/item",
  "components/layout/footer/sidebarContainer/entities"
  ], function(_, Marionette, app, itemView, entities) {

  // The definition of the SideBarContainerView
  var SideBarContainerView = Marionette.CollectionView.extend({
    className: "widget-area",
    itemView: itemView,

    events: {
      "submit .search-form": "search"
    },

    search: function(event) {
      return app.search.formSubmit(event);
    }
  });

  return {
    create: function(options) {
      options = options || {};
      return new SideBarContainerView(_.extend({
        collection: options.collection || entities.createCollection()
      }));
    }
  };
});