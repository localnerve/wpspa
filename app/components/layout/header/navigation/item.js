define([
  "lodash",
  "backbone.marionette"
], function(_, Marionette) {

  // for the UI, make the "" route a slash href
  function routeToHref(route) {
    if (_.isString(route) && route.length === 0) {
      route = "/";
    }
    return route;
  }

  // The view definition of each navigation item
  var NavItemView = Marionette.ItemView.extend({
    template: "components/layout/header/navigation/item",
    tagName: "li",

    serializeData: function() {
      return {
        name: this.model.get("name"),
        route: routeToHref(this.model.get("route")),
        navItem: this.model.get("nav_item")
      };
    }
  });

  return NavItemView;
});
