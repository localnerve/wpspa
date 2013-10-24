define([
  "jquery",
  "backbone.marionette"
], function($, Marionette) {
  
  var TransitionView = Marionette.ItemView.extend({
    template: "components/content/transitions/transitionView",
    className: "grid-row",

    onRender: function() {
      // TODO: implement
    },

    onBeforeClose: function() {
      // TODO: implement
    }
  });

  return {
    create: function(options) {
      return new TransitionView(options);
    }
  };
});