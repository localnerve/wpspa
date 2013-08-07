define([
  "backbone.marionette"
], function(Marionette) {

  var PageView = Marionette.ItemView.extend({
    template: "page",
    className: "page",

    initialize: function(options) {
      options = options || {};
      this.vent = options.vent;
    }
  });

  return {
    create: function(options) {
      return new PageView(options);
    }
  };
});
