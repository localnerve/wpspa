define([
  "backbone.marionette",
  "wpspa/layout/content/post/entities"
  ], function (Marionette, entities) {

    var PostView = Marionette.ItemView.extend({
      template: "wpspa/layout/content/post/template",
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
        var postView = new PostView({
          model: options.model || entities.create(options)
        });
        return postView;
      }
    };
  });