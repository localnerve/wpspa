define([
  "backbone.marionette"
  ], function(Marionette) {

    var navView = Marionette.ItemView.extend({
      template: "navigation",

      initialize: function(options) {
        options = options || {};
        this.vent = options.vent;
      }
    });

    return navView;
  });