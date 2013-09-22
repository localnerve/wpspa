define([
  "backbone.marionette",
  "app"
], function(Marionette, app) {

  // The view definition of each sidebar item
  var SidebarItemView = Marionette.ItemView.extend({
    template: "components/layout/footer/sidebarContainer/item",
    tagName: "aside",
    className: "widget masonry-brick",

    serializeData: function() {
      return {
        content: this.model.get("content")
      };
    }
  });

  return SidebarItemView;
});
