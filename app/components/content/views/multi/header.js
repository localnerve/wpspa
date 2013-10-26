define([
  "backbone.marionette"
], function(Marionette) {

  var MultiPostHeader = Marionette.ItemView.extend({
    template: "components/content/views/multi/header",
    className: "grid-row",

    serializeData: function() {
      return {
        headerMessage: this.options.headerMessage
      };
    }
  });

  return {
    create: function(options) {
      return new MultiPostHeader(options);
    }
  };
});