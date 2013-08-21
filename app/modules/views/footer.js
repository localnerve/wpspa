define([
  "backbone.marionette"
], function(Marionette) {

  // TODO: implement
  var FooterView = Marionette.ItemView.extend({
    template: "footer",

    initialize: function(options) {
    }
  });

  return {
    create: function(options) {
      return new FooterView(options);
    }
  };
});
