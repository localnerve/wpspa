define([
  "backbone.marionette",
  "app",
  "resources/strings"
], function(Marionette, app, strings) {

  var lessThanFour = {
    1: strings.content.numbers.One,
    2: strings.content.numbers.Two,
    3: strings.content.numbers.Three
  };

  // The view definition of each post item
  var PostItemView = Marionette.ItemView.extend({
    template: "components/content/views/content/multi/content/item",
    tagName: "article",
    className: "type-post",

    labelComment: function(length) {
      return length < 2 ? strings.content.labels.comment : strings.content.labels.commentPlural;
    },

    labelNumber: function(number) {
      return lessThanFour[parseInt(number, 10)] || number.toString();
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
