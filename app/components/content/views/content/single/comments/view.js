/*
 * single/comments
 * The comments view of a single Wordpress post type (page or post or whatever)
 */
define([
  "lodash",
  "backbone.marionette",
  "helpers/contract",
  "helpers/ui",
  "helpers/routes",
  "resources/strings",
  "module",
  "components/content/views/content/single/comments/item",
  "components/content/entities/specializations/respond"
], function(_, Marionette, contract, ui, routes, strings, module, commentItem, ResponseModel) {

  var CommentsView = Marionette.CompositeView.extend({
    template: "components/content/views/content/single/comments/view",
    className: "comments-area",
    itemViewContainer: ".comment-list",
    itemView: commentItem,
    events: {
      "submit #commentform": "respond"
    },
    ui: {
      comments: "#comments",
      respond: "#respond",
      author: "#author",
      email: "#email",
      url: "#url",
      content: "#comment",
      submitButton: "#comment-submit-input",
      progress: "#comment-progress",
      result: ".comment-result"
    },
    initialize: function(options) {
      this.collection = new Backbone.Collection(options.models);
      this.strings = strings.content.single.comments;
    },
    remove: function() {
      delete this.collection;
      Marionette.CompositeView.prototype.remove.apply(this, arguments);
    },
    getEmptyView: function() {
      this.ui.comments.css("display", "none");
      return null;
    },
    itemViewOptions: function() {
      return {
        respond: this.options.respond
      };
    },
    scrollToRespond: function() {
      _.defer(function(self) { ui.scrollTop(self.ui.respond.offset()); }, this);
    },
    processParams: function(params) {
      if (params.action === routes.comments.actions.comment) {
        _.defer(function(self) { ui.scrollTop(self.ui.comments.offset()); }, this);
      } else if (params.action === routes.comments.actions.respond) {
        this.scrollToRespond();
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
        comments: this.strings,
        labels: strings.content.labels
      };
    },
    onItemviewCommentReply: function(/*itemView, options*/) {
      // note, jsonapi does not support comments as reply to comments
      // for now, just go with normal respond as is
      //   comment_parent_id = options.commentParentId
      this.scrollToRespond();
    },
    clearForm: function() {
      this.ui.author.prop("value", "");
      this.ui.email.prop("value", "");
      this.ui.url.prop("value", "");
      this.ui.content.prop("value", "");
    },
    setResultText: function(text, good) {
      this.ui.result.removeClass("hide success failure");
      if (text) {
        this.ui.result.text(text);
        this.ui.result.addClass(good ? "success" : "failure");
      } else {
        this.ui.result.addClass("hide");
      }
    },
    responseSuccess_ok: function(data) {
      this.clearForm();
      this.setResultText(this.strings.respond.resultComment, true);
      // TODO, non-moderation case:
      // insert comment into collection/ui
    },
    responseSuccess_pending: function(data) {
      this.clearForm();
      this.setResultText(this.strings.respond.resultModeration, true);
    },
    responseSuccess_error: function(data) {
      this.setResultText(data.error || this.strings.respond.resultServerError, false);
    },
    responseFail: function() {
      this.setResultText(this.strings.respond.resultFail, false);
    },
    responseProgress: function(done) {
      this.ui.progress.removeClass("hide");
      if (done) {
        this.ui.progress.addClass("hide");
      }
      ui.scrollTopConditional(this.ui.content.offset());
    },
    performRespond: _.debounce(
      function(self) {
        var model = new ResponseModel({
          post_id: self.options.postId,
          name: self.ui.author.prop("value"),
          email: self.ui.email.prop("value"),
          // jsonapi does not except url :-(
          content: self.ui.content.prop("value")
        });

        self.listenTo(model, "request", function() {
          self.responseProgress(false);
        });

        self.setResultText();
        model.fetch({ timeout: module.config().timeout })
          .done(function(data) {
            var method = CommentsView.prototype["responseSuccess_"+data.status];
            if (method) {
              method.call(self, data);
            } else {
              self.responseSuccess_error(data);
            }
          })
          .fail(function() {
            self.responseFail();
          })
          .always(function() {
            self.stopListening(model);
            self.responseProgress(true);
          });
      }, 1000, true // discard invocations within leading edge time (ms)
    ),
    respond: function() {
      this.performRespond(this);
      return false;
    }
  });

  return {
    create: function(options) {
      contract(options, "model");
      return new CommentsView({
        models: options.model.get("comments"),
        title: options.model.get("title"),
        respond: options.model.get("comment_status") === "open",
        postId: options.model.get("id"),
        params: options.params
      });
    }
  };
});