define([
  "backbone.marionette",
  "app"
], function(Marionette, app) {

  var thisModule = app.module("wpspa", function(wpspa, app) {

    // define the FooterLayout.
    // just a plain item view for now...
    var FooterLayout = Marionette.ItemView.extend({
      template: "wpspa/footer/template",
      className: "grid-row",
      tagName: "footer"
    });

    app.addInitializer(function(options) {
      wpspa.footer = new FooterLayout(options);
    });

  });

  thisModule.addFinalizer(function() {
    delete wpspa.footer;
  });
});
