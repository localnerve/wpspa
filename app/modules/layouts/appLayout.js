define([
  "backbone.marionette",
  "app",
  "modules/helpers/contract",
  "modules/regions/contentRegion",
  "modules/layouts/headerLayout"//,
  //"modules/views/footer"
], function(Marionette, app, contract, content) {

  // create the app module
  var thisModule = app.module("appLayout");

  // definition of the appLayout
  var AppLayout = Marionette.Layout.extend({

    template: "app-layout",
    className: "main-grid-row",

    regions: {
      header: "#header",
      footer: "#footer",
      content: content
    },

    initialize: function(options) {
      contract(options, "vent", "reqres");

      // honor requests for this instance
      options.reqres.setHandler("appLayout:instance", function() {
        return thisModule.instance;
      });
    },

    onRender: function(options) {
      this.header.show(app.request("headerLayout:instance"));
      // TODO:
      //this.footer.show(footer.create(options));
      //this.content.show(page.create(options));
    }

  });

  // app module initialization
  thisModule.addInitializer(function(options) {
    this.instance = new AppLayout(options);
  });

  thisModule.addFinalizer(function() {
    delete this.instance;
  });

  return thisModule;

});
