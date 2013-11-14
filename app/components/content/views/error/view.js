define([
  "backbone.marionette",
  "resources/strings"
], function(Marionette, strings) {
  
  var ErrorView = Marionette.ItemView.extend({
    template: "components/content/views/error/view",
    className: "grid-row",

    serializeData: function() {
      return {
        heading: this.options.heading || strings.content.error.heading,
        message: this.options.message || strings.content.error.message
      };
    }
  });

  return {
    create: function(options) {
      return new ErrorView(options);
    }
  };
});