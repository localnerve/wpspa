define([
  "backbone.marionette"
], function(Marionette) {

  var FooterView = Marionette.ItemView.extend({
    template: "footer",

    initialize: function(options) {
      options = options || {};
      this.vent = options.vent;
    }
  });

  return {
    create: function(options) {
      return new FooterView(options);
    }
  };
});
