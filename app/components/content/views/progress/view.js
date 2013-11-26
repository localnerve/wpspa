define([
  "backbone.marionette"
], function(Marionette) {
  
  var ProgressView = Marionette.ItemView.extend({
    template: "components/content/views/progress/view",
    className: "grid-row"
  });

  return {
    create: function(options) {
      return new ProgressView(options);
    }
  };
});