define([
  "backbone.marionette",
  "resources/strings"
], function(Marionette, strings) {

  var CommentItemView = Marionette.ItemView.extend({
    template: "components/content/views/content/single/comments/item",
    tagName: "li",
    events: {
      "click .comment-reply-link": "reply"
    },
    ui: {
      reply: ".reply"
    },
    initialize: function() {
      this.$el.prop("id", "comment-"+this.model.get("id"));
    },
    onRender: function() {
      if (!this.options.respond) {
        this.ui.reply.css("display", "none");
      }
    },
    serializeData: function() {
      return {
        model: this.model,
        replyText: strings.content.single.comments.Reply
      };
    },
    reply: function() {
      this.trigger("comment:reply", { commentParentId: this.model.get("id") });
    }
  });

  return CommentItemView;
});