define([
  "backbone.marionette",
  "modules/views/header",
  "modules/views/footer",
  "modules/views/page",
  "modules/regions/contentRegion"
], function(Marionette, header, footer, page, content) {

  var AppLayout = Backbone.Marionette.Layout.extend({

    template: "app-layout",
    className: "main-grid-row",

    regions: {
      header: "#header",
      footer: "#footer",
      content: content
    },

    initialize: function(options) {
      options = options || {};
      this.vent = options.vent;
      this.listenTo(this.vent, "appLayout:render", this.onAppLayoutRender);
    },

    onAppLayoutRender: function(options) {
      this.header.show(header.create(options));
      this.footer.show(footer.create(options));
      this.content.show(page.create(options));
    }

  });

  return {
    create: function(options) {
      return new AppLayout(options);
    }
  };

});
