define([
  "backbone.marionette",
  "app",
  "wpspa/layout/content/main",
  "wpspa/header/main",
  "wpspa/footer/main"
], function(Marionette, app, content) {

  // Create a partial definition for WPSPA module
  var thisModule = app.module("wpspa", function(wpspa, app) {

    // The definition of the appLayout
    var AppLayout = Marionette.Layout.extend({

      template: "wpspa/layout/template",
      className: "main-grid-row",

      regions: {
        header: "#header",
        footer: "#footer",
        content: content
      },

      onRender: function(/*options*/) {
        this.header.show(wpspa.header);
        this.footer.show(wpspa.footer);

        // content is shown dynamically
        // see appController.createHandler for view initiation call.
      }

    });

    // Add the initializer for this module partial
    app.addInitializer(function(options) {
      wpspa.layout = new AppLayout(options);
    });

  });

  thisModule.addFinalizer(function() {
    delete app.wpspa.layout;
  });

  return thisModule;

});
