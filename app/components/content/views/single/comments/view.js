/*
 * single/comments
 * The comments view of a single Wordpress post type (page or post or whatever)
 */
define([
  "lodash",
  "backbone.marionette",
  "helpers/contract",
  "helpers/ui",
  "resources/strings",
  "components/content/views/single/comments/item"
], function(_, Marionette, contract, ui, strings, commentItem) {

  var CommentsView = Marionette.CompositeView.extend({
    template: "components/content/views/single/comments/view",
    id: "comments",
    className: "comments-area",
    itemViewContainer: ".comment-list",
    itemView: commentItem,
    ui: {
      comments: "#comments",
      respond: "#respond"
    },
    remove: function() {
      delete this.collection;
      Marionette.CompositeView.prototype.remove.apply(this, arguments);
    },
    getEmptyView: function() {
      this.ui.comments.css("display", "none");
      return null;
    },
    processParams: function(params) {
      if (params.action === "comment") {
        _.defer(function(self) { ui.scrollTop(self.ui.comments.offset().top); }, this);
      } else if (params.action === "respond") {
        _.defer(function(self) { ui.scrollTop(self.ui.respond.offset().top); }, this);
      }
    },
    onRender: function() {
      if (this.options.params) {
        this.processParams(this.options.params);
      }
      if (!this.options.respond) {
        this.ui.respond.css("display", "none");
      }
    },
    serializeData: function() {
      return {
        title: this.options.title,
        comments: strings.content.single.comments,
        labels: strings.content.labels
      };
    }
  });

  return {
    create: function(options) {
      contract(options, "model");
      return new CommentsView({
        collection: new Backbone.Collection(options.model.get("comments")),
        title: options.model.get("title"),
        respond: options.model.get("comment_status") === "open",
        params: options.params
      });
    }
  };
});