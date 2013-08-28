define([
  "backbone.marionette",
  "app",
  "helpers/contract",
  "wpspa/header/navigation/main",
  "wpspa/header/banner/main"
], function(Marionette, app, contract) {

  // Create a partial definition for WPSPA module
  var thisModule = app.module("wpspa", function(wpspa, app) {

    // The definition of the headerLayout
    var HeaderLayout = Marionette.Layout.extend({

      template: "wpspa/header/template",
      tagName: "header",
      className: "grid-row",

      regions: {
        navigation: "#navigation",
        banner: "#banner"
      },

      // render handler
      // renders all child views of this layout
      onRender: function(/*options*/) {
        this.navigation.show(wpspa.navigation);
        // TODO:
        //this.banner.show(banner.create(options));
      }

    });

    // app module initialization
    app.addInitializer(function(options) {
      wpspa.header = new HeaderLayout(options);
    });

  });

  thisModule.addFinalizer(function() {
    delete app.wpspa.header;
  });

  return thisModule;

});
