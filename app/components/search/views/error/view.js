define([
  "backbone.marionette",
  "resources/strings"
], function(Marionette, strings) {

  var ErrorView = Marionette.ItemView.extend({
    template: "components/search/views/error/view",
    className: "grid-row",

    serializeData: function() {
      return {
        heading: strings.search.error.heading,
        message: strings.search.error.message
      };
    }
  });

  return {
    create: function() {
      return new ErrorView();
    }
  };
});