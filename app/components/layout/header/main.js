define([
  "backbone.marionette",
  "app",
  "helpers/contract",
  "components/layout/header/navigation/main",
  "components/layout/header/banner/main"
], function(Marionette, app, contract) {

  // Create a partial definition for container.header module
  var thisModule = app.module("container.header", function(header) {

    // The definition of the headerLayout
    var HeaderLayout = Marionette.Layout.extend({

      template: "components/layout/header/template",
      tagName: "header",
      //className: "grid-row",

      regions: {
        navigation: "#navigation",
        banner: "#banner"
      },

      // render handler
      // renders all child views of this layout
      onRender: function() {
        this.navigation.show(header.navigation);
        this.banner.show(header.banner);
      }

    });

    header.addInitializer(function(options) {
      this.layout = new HeaderLayout(options);
    });

    header.addFinalizer(function() {
      delete this.layout;
    });

  });

  return thisModule;

});
