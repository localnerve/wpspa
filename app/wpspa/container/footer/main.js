define([
  "backbone.marionette",
  "app"
], function(Marionette, app) {

  // Create a partial definition for wpspa.container module
  var thisModule = app.module("wpspa.container", function(container, app) {

    // define the FooterLayout.
    // just a plain item view for now...
    var FooterLayout = Marionette.ItemView.extend({
      template: "wpspa/container/footer/template",
      className: "grid-row",
      tagName: "footer"
    });

    app.addInitializer(function(options) {
      container.footer = new FooterLayout(options);
    });

  });

  thisModule.addFinalizer(function() {
    delete app.wpspa.container.footer;
  });
});
