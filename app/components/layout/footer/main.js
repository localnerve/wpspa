define([
  "backbone.marionette",
  "app"
], function(Marionette, app) {

  // Create a partial definition for wpspa.container module
  var thisModule = app.module("container.footer", function(footer, app) {

    // define the FooterLayout.
    // just a plain item view for now...
    var FooterLayout = Marionette.ItemView.extend({
      template: "components/layout/footer/template",
      className: "site-footer",
      tagName: "footer"
    });

    footer.addInitializer(function(options) {
      this.layout = new FooterLayout(options);
    });

    footer.addFinalizer(function() {
      delete this.layout;
    });

  });

});
