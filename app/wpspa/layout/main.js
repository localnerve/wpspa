define([
  "backbone.marionette",
  "app",
  "wpspa/layout/content/main",
  "wpspa/container/header/main",
  "wpspa/container/footer/main"
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

      onRender: function( /*options*/ ) {
        this.header.show(wpspa.container.header);
        this.footer.show(wpspa.container.footer);

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
