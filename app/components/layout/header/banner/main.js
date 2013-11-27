/*
 * banner
 * Shows the main banner of the site
 */
define([
  "backbone.marionette",
  "app"
], function(Marionette, app) {

  // Create a partial definition for container.header module
  var thisModule = app.module("container.header", function(header) {

    // The definition of the banner view
    var BannerView = Marionette.ItemView.extend({
      template: "components/layout/header/banner/template",
      className: "main-circle",
      attributes: {
        role: "banner"
      },

      serializeData: function() {
        // TODO: get these from a model
        return {
          siteTitle: "WPSPA",
          siteDescription: "Just another WordPress site"
        };
      }
    });

    // add another header module initializer
    header.addInitializer(function(options) {
      this.banner = new BannerView(options);
    });

    header.addFinalizer(function() {
      delete this.banner;
    });

  });

  return thisModule;
});
