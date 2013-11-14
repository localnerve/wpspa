define([
  "backbone.marionette",
  "resources/strings"
], function(Marionette, strings) {

  var CommentItemView = Marionette.ItemView.extend({
    template: "components/content/views/content/single/comments/item",
    tagName: "li",
    initialize: function() {
      this.$el.prop("id", "comment-"+this.model.get("id"));
    },
    serializeData: function() {
      return {
        model: this.model
      };
    }
  });

  return CommentItemView;
});