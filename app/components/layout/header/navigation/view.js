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

    initialize: function() {
      // listen to message bus for content events
      var self = this;
      this.listenTo(app.vent, "content:start", function(options) {
        self.onContentStart(options);
      });
    },

    /*
    appendHtml: function(collectionView, itemView, index) {
      // TODO: implement navigation hierarchy
    },
    */

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
      options = options || {};
      return new NavigationView(_.extend({
        collection: options.collection || entities.createCollection()
      }, options));
    }
  };

});