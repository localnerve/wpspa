define([
  "backbone.marionette"
], function(Marionette) {

  var ErrorView = Marionette.ItemView.extend({
    template: "components/search/views/error/view",
    className: "grid-row"
  });

  return {
    create: function() {
      return new ErrorView();
    }
  };
});