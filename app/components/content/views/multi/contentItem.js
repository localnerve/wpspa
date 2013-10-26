define([
  "backbone.marionette",
  "app",
  "resources/strings"
], function(Marionette, app, strings) {

  // The view definition of each post item
  var PostItemView = Marionette.ItemView.extend({
    template: "components/content/views/multi/contentItem",
    tagName: "article",
    className: "type-post",

    labelComment: function(length) {
      return length < 2 ? strings.content.item.comment : strings.content.item.commentPlural;
    },

    labelNumber: function(number) {
      switch (number) {
        case 1: return strings.content.item.One;
        case 2: return strings.content.item.Two;
        case 3: return strings.content.item.Three;
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
