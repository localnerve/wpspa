/*
 * banner
 * Shows the main banner of the site
 */
define([
  "backbone.marionette",
  "app",
  "components/layout/header/banner/view"
], function(Marionette, app, bannerView) {

  // Create a partial definition for container.header module
  var thisModule = app.module("container.header", function(header) {

    // add another header module initializer
    header.addInitializer(function(options) {
      this.banner = bannerView.create(options);
    });

    header.addFinalizer(function() {
      delete this.banner;
    });

    header.on("container:ready", function() {
      header.banner.model.fetch({
        timeout: header.timeout,

        success: function() {
          // banner successfully loaded, tell the container
          app.vent.trigger("container:complete");
          // signal that the banner can be shown
          header.banner.trigger("banner:show");
        },
        error: function(collection, response, options) {
          // banner failed to load, tell the app
          app.vent.trigger("app:error", {
            collection: collection,
            response: response,
            options: options
          });
        }
      });
    });

  });

  return thisModule;
});
