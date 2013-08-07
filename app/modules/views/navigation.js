define([
  "backbone.marionette"
], function(Marionette) {

  var NavigationView = Marionette.ItemView.extend({
    template: "navigation",

    initialize: function(options) {
      options = options || {};
      this.vent = options.vent;
    }
  });

  return {
    create: function(options) {
      return new NavigationView(options);
    }
  };
});
