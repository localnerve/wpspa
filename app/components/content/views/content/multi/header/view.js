define([
  "backbone.marionette"
], function(Marionette) {

  var MultiPostHeader = Marionette.ItemView.extend({
    template: "components/content/views/content/multi/header/view",
    className: "grid-row",
    ui: {
      headerMeta: ".title-meta"
    },
    onRender: function() {
      if (!this.options.headerMeta) {
        this.ui.headerMeta.addClass("hide");
      }
    },
    serializeData: function() {
      return {
        headerMessage: this.options.headerMessage,
        headerMeta: this.options.headerMeta || ""
      };
    }
  });

  return {
    create: function(options) {
      return new MultiPostHeader(options);
    }
  };
});