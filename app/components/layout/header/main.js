/*
 * container.header layout
 * Defines the header layout and composition
 */
define([
  "lodash",
  "backbone.marionette",
  "app",
  "module",
  "components/layout/header/navigation/main",
  "components/layout/header/banner/main"
], function(_, Marionette, app, module) {

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
        header.banner.trigger("banner:show");
      }

    });

    header.addInitializer(function(options) {
      this.layout = new HeaderLayout(options);
      this.timeout = module.config().timeout;

      this.listenTo(this.banner, "banner:show", _.after(module.config().bannerShowEvents, function() {
        this.layout.banner.show(this.banner);
      }));
    });

    header.addFinalizer(function() {
      delete this.layout;
    });

  });

  return thisModule;

});
