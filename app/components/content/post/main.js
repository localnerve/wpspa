/*
 * PostView
 * A simple view of a Wordpress post or page
 */
define([
  "backbone.marionette",
  "components/content/post/entities"
], function(Marionette, entities) {

  var PostView = Marionette.ItemView.extend({
    template: "components/content/post/template",
    className: "grid-row",

    serializeData: function() {
      return {
        title: this.model.get("title"),
        content: this.model.get("content")
      };
    }
  });

  return {
    create: function(options) {
      options = options || {};

      // If options.model exists, then make the view from that
      return new PostView({
        model: options.model || entities.create(options)
      });
    }
  };
});
