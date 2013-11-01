define([
  "backbone.marionette",
  "resources/strings"
], function(Marionette, strings) {

  var ProgressView = Marionette.ItemView.extend({
    template: "components/search/views/progress/view",
    className: "grid-row",

    serializeData: function() {
      return {
        heading: strings.search.progress.heading
      };
    }
  });

  return {
    create: function() {
      return new ProgressView();
    }
  };
});