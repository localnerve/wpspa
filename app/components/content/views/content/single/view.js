/*
 * singleView
 * A view of a single Wordpress post type
 */
define([
  "lodash",
  "backbone.marionette",
  "components/content/views/content/single/content/view",
  "components/content/views/content/single/navigation/view",
  "components/content/views/content/single/comments/view",
  "components/content/entities/main"
], function(_, Marionette, content, navigation, comments, entities) {

  var SingleLayout = Marionette.Layout.extend({
    template: "components/content/views/content/single/view",
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
    onTransitionOpenAfter: function(options) {
      var transitionClass = "single-page-fade-in";
      if (options.view.transition) {
        transitionClass = options.view.transition;
        options.view.transition = null;
      }
      this.$el.addClass(transitionClass);
      this.$el.show();
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