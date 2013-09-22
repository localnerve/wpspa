define([
  "backbone.marionette",
  "app"
], function(Marionette, app) {

  // The view definition of each home item
  var PostItemView = Marionette.ItemView.extend({
    template: "components/content/post/item",
    tagName: "article",
    className: "type-post",

    serializeData: function() {
      return {
        model: this.model
      };
    }
  });

  return PostItemView;
});
