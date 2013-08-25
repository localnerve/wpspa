define([
  "backbone.marionette",
  "modules/entities/post"
  ], function (Marionette, postEntity) {

    var PostView = Marionette.ItemView.extend({
      template: "post",
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
          model: postEntity.create(options)
        });
      }
    };
  });