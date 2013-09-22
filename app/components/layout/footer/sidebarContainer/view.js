define([
  "lodash",
  "backbone.marionette",
  "components/layout/footer/sidebarContainer/item",
  "components/layout/footer/sidebarContainer/entities"
  ], function(_, Marionette, itemView, entities) {

  // The definition of the SideBarContainerView
  var SideBarContainerView = Marionette.CollectionView.extend({
    className: "widget-area",
    itemView: itemView
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