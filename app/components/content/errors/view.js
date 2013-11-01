define([
  "backbone.marionette"
], function(Marionette) {
  
  var ErrorView = Marionette.ItemView.extend({
    template: "components/content/errors/view",
    className: "grid-row"
  });

  return {
    create: function(options) {
      return new ErrorView(options);
    }
  };
});