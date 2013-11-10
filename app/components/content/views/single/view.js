/*
 * singleView
 * A view of a single Wordpress post type
 */
define([
  "lodash",
  "backbone.marionette",
  "components/content/views/single/content/view",
  "components/content/views/single/navigation/view",
  "components/content/views/single/comments/view",
  "components/content/entities/main"
], function(_, Marionette, content, navigation, comments, entities) {

  var SingleLayout = Marionette.Layout.extend({
    template: "components/content/views/single/view",
    className: "post-container",

    regions: {
      content: "#post-content",
      navigation: "#post-navigation",
      comments: "#post-comments"
    },

    onRender: function() {
      this.content.show(content.create(this.options));
      if (this.model.get("type") === "post") {
        this.navigation.show(navigation.create(this.options));
      }
      this.comments.show(comments.create(this.options));
    },

    onTransitionOpenBefore: function() {
      this.$el.hide();
    },
    onTransitionOpenAfter: function() {
      this.$el.fadeIn("fast");
    }
  });

  return {
    create: function(options) {
      options = options || {};

      return new SingleLayout(_.extend(options, {
        model: options.model || entities.createModel(options)
      }));
    }
  };
});
