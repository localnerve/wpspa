/*
 * single/content
 * A view of a single Wordpress post type (page or post or whatever)
 */
define([
  "backbone.marionette"
], function(Marionette) {

  var ContentView = Marionette.ItemView.extend({
    template: "components/content/views/content/single/content/view",
    tagName: "article",

    serializeData: function() {
      return {
        title: this.model.get("title"),
        content: this.model.get("content")
      };
    }
  });

  return {
    create: function(options) {
      return new ContentView(options);
    }
  };
});
