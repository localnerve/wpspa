/*
 * container.header layout
 * Defines the header layout and composition
 */
define([
  "backbone.marionette",
  "app",
  "module",
  "components/layout/header/navigation/main",
  "components/layout/header/banner/main"
], function(Marionette, app, module) {

  // Create a partial definition for container.header module
  var thisModule = app.module("container.header", function(header) {

    // The definition of container.header.layout
    var HeaderLayout = Marionette.Layout.extend({

      template: "components/layout/header/template",
      className: "site-header",

      regions: {
        navigation: "#navigation",
        banner: "#banner"
      },

      // renders all child views of this layout
      onRender: function() {
        this.navigation.show(header.navigation);
        this.banner.show(header.banner);
      }

    });

    header.addInitializer(function(options) {
      this.layout = new HeaderLayout(options);
      this.timeout = module.config().timeout;
    });

    header.addFinalizer(function() {
      delete this.layout;
    });

  });

  return thisModule;

});
