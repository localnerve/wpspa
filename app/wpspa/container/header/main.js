define([
  "backbone.marionette",
  "app",
  "helpers/contract",
  "wpspa/container/header/navigation/main",
  "wpspa/container/header/banner/main"
], function(Marionette, app, contract) {

  // Create a partial definition for wpspa.container module
  var thisModule = app.module("wpspa.container", function(container, app) {

    // The definition of the headerLayout
    var HeaderLayout = Marionette.Layout.extend({

      template: "wpspa/container/header/template",
      tagName: "header",
      className: "grid-row",

      regions: {
        navigation: "#navigation",
        banner: "#banner"
      },

      // render handler
      // renders all child views of this layout
      onRender: function( /*options*/ ) {
        this.navigation.show(container.navigation);
        // TODO:
        //this.banner.show(banner.create(options));
      }

    });

    // app module initialization
    app.addInitializer(function(options) {
      container.header = new HeaderLayout(options);
    });

  });

  thisModule.addFinalizer(function() {
    delete app.wpspa.container.header;
  });

  return thisModule;

});
