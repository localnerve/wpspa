define([
    "backbone.marionette"
  ], function(Marionette) {
  
  var HeaderView = Marionette.ItemView.extend({
    template: "header",

    initialize: function(options) {
      options = options || {};
      this.vent = options.vent;
    }
  });

  return {
    create: function(options) {
      return new HeaderView(options);
    }
  };
});