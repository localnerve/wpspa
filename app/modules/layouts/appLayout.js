define([
  "backbone.marionette",
  "modules/views/header",
  "modules/views/footer",
  "modules/views/page"
  ], function(Marionette, header, footer, page) {

    var AppLayout = Backbone.Marionette.Layout.extend({

      template: "app-layout",

      regions: {
        header: "#header",
        content: "#content",
        footer: "#footer"
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