/*
 * singleView
 * A view of a single Wordpress post type
 */
define([
  "backbone.marionette",
  "components/content/entities/main"
], function(Marionette, entities) {

  var PostView = Marionette.ItemView.extend({
    template: "components/content/views/single/view",
    className: "grid-row",

    serializeData: function() {
      return {
        title: this.model.get("title"),
        content: this.model.get("content")
      };
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

      // If options.model exists, then make the view from that
      return new PostView({
        model: options.model || entities.createPostModel(options)
      });
    }
  };
});
