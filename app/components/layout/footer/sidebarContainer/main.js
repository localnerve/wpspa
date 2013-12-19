/*
 * sidebarContainer
 * Defines the sidebar container and composition
 */
define([
  "app",
  "module",
  "components/layout/footer/sidebarContainer/view"
], function(app, module, sidebarView) {

  // Create a partial definition for container.footer module
  var thisModule = app.module("container.footer", function(footer) {

    // add another footer module initializer
    footer.addInitializer(function(options) {
      this.sidebarContainer = sidebarView.create(options);
      this.timeout = module.config().timeout;
    });

    footer.addFinalizer(function() {
      delete this.sidebarContainer;
    });

    footer.on("container:ready", function() {
      footer.sidebarContainer.collection.fetch({
        timeout: footer.timeout,
        
        success: function(collection) {
          // footer successfully loaded, tell container
          app.vent.trigger("container:complete");
        },
        error: function(collection, response, options) {
          // footer failed to load, tell the app
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
