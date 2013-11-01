define([
  "backbone.marionette"
], function(Marionette) {

  var ProgressView = Marionette.ItemView.extend({
    template: "components/search/views/progress/view",
    className: "grid-row"
  });

  return {
    create: function() {
      return new ProgressView();
    }
  };
});