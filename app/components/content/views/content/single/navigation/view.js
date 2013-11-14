/*
 * single/navigation
 * The navigation view of a single Wordpress post
 */
define([
  "backbone.marionette",
  "helpers/contract",
  "resources/strings",
  "components/content/views/content/single/navigation/item"
], function(Marionette, contract, strings, navItem) {

  var NavigationView = Marionette.CompositeView.extend({
    template: "components/content/views/content/single/navigation/view",
    tagName: "nav",
    className: "post-navigation",
    attributes: {
      role: "navigation"
    },
    itemViewContainer: ".nav-links",
    itemView: navItem,
    remove: function() {
      delete this.collection;
      Marionette.CompositeView.prototype.remove.apply(this, arguments);
    },
    itemViewOptions: function(item, index) {
      return {
        next: this.options.next[index]
      };
    },
    getEmptyView: function() {
      this.$el.addClass("hide");
      return null;
    },
    serializeData: function() {
      return {
        title: strings.content.single.navigation.title
      };
    }
  });

  return {
    create: function(options) {
      contract(options, "model.collection");

      var collection = options.model.collection;
      var subjectIndex = collection.indexOf(options.model);
      var next = [];

      return new NavigationView({
        collection: new Backbone.Collection(collection.filter(function(model, index) {
          var diff = index - subjectIndex;
          var truth = Math.abs(diff) === 1;
          if (truth) next.push(diff > 0);
          return truth;
        })),
        next: next
      });
    }
  };
});