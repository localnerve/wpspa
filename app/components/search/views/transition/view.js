define([
  "backbone.marionette"
], function(Marionette) {

  var TransitionView = Marionette.ItemView.extend({
    template: "components/search/views/transition/view",
    className: "grid-row"
  });

  return {
    create: function() {
      return new TransitionView();
    }
  };
});