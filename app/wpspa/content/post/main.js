define([
  "backbone.marionette",
  "wpspa/content/post/entities"
  ], function (Marionette, entities) {

    var PostView = Marionette.ItemView.extend({
      template: "wpspa/content/post/template",
      serializeData: function() {
        return {
          title: this.model.get("title"),
          content: this.model.get("content")
        };
      }
    });

    return {
      create: function(options) {
        return new PostView({
          model: entities.create(options)
        });
      }
    };
  });