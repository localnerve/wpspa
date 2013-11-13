define([
  "backbone.marionette"
], function(Marionette) {

  var MultiPostHeader = Marionette.ItemView.extend({
    template: "components/content/views/multi/header/view",
    className: "grid-row",
    ui: {
      archiveMeta: ".archive-meta"
    },
    onBeforeRender: function() {
      if (!this.options.archiveMeta) {
        this.ui.archiveMeta.addClass("hide");
      }
    },
    serializeData: function() {
      return {
        headerMessage: this.options.headerMessage,
        archiveMeta: this.options.archiveMeta || ""
      };
    }
  });

  return {
    create: function(options) {
      return new MultiPostHeader(options);
    }
  };
});