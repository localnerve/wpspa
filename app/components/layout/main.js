define([
  "backbone.marionette",
  "app",
  "components/layout/content/main",
  "components/layout/header/main",
  "components/layout/footer/main"
], function(Marionette, app, content) {

  // Create a partial definition for WPSPA module
  var thisModule = app.module("container", function(container, app) {

    // The definition of the appLayout
    var AppLayout = Marionette.Layout.extend({

      template: "components/layout/template",
      className: "main-grid-row",

      regions: {
        header: "#header",
        footer: "#footer",
        content: content
      },

      onRender: function( /*options*/ ) {
        this.header.show(container.header.layout);
        this.footer.show(container.footer.layout);

        // content is shown dynamically
        // see appController.createHandler for view initiation call.
      }

    });

    // Add the initializer for this module partial
    container.addInitializer(function(options) {
      this.layout = new AppLayout(options);
    });

    container.addFinalizer(function() {
      delete this.layout;
    });

  });

  return thisModule;

});
