define([
  "jquery",
  "backbone.marionette"
], function($, Marionette) {
  
  var ProgressView = Marionette.ItemView.extend({
    template: "components/content/progress/view",
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
      return new ProgressView(options);
    }
  };
});