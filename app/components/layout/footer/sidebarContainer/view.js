define([
  "lodash",
  "jquery",
  "backbone",
  "backbone.marionette",
  "components/layout/footer/sidebarContainer/item",
  "components/layout/footer/sidebarContainer/entities"
  ], function(_, $, Backbone, Marionette, itemView, entities) {

  // The definition of the SideBarContainerView
  var SideBarContainerView = Marionette.CollectionView.extend({
    className: "widget-area",
    itemView: itemView,

    events: {
      "submit .search-form": "search"
    },

    search: function(event) {
      var searchField = $(event.currentTarget).find("input.search-field");
      var query = searchField.prop("value");
      if (query && query.length > 0) {
        Backbone.history.navigate("search/"+query, true);
        return false;
      }
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