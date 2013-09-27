define([
  "backbone.marionette",
  "app"
], function(Marionette, app) {

  // The view definition of each home item
  var PostItemView = Marionette.ItemView.extend({
    template: "components/content/views/item",
    tagName: "article",
    className: "type-post",

    labelComment: function(length) {
      return length < 2 ? "comment" : "comments";
    },

    labelNumber: function(number) {
      switch (number) {
        case 1: return "One";
        case 2: return "Two";
        case 3: return "Three";
        default: return number.toString();
      }
    },

    serializeData: function() {
      return {
        labelComment: this.labelComment,
        labelNumber: this.labelNumber,
        model: this.model
      };
    }
  });

  return PostItemView;
});
