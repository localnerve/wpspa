define([
  "backbone.marionette",
  "app",
  "helpers/routes",
  "module"
], function(Marionette, app, routes, module) {

  // The view definition of each navigation item
  var NavItemView = Marionette.ItemView.extend({
    template: "components/layout/header/navigation/item",
    tagName: "li",

    initialize: function() {
      if (module.config().hideHome) {
        if (this.model.get("route") === "") {
          this.$el.css("display", "none");
        }
      }
    },

    serializeData: function() {
      return {
        name: this.model.get("name"),
        href: routes.routeToHref(this.model.get("route")),
        navItem: this.model.get("nav_item")
      };
    }
  });

  return NavItemView;
});
