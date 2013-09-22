/*
 * sidebarContainer
 * Defines the sidebar container and composition
 */
define([
  "app",
  "components/layout/footer/sidebarContainer/view"
], function(app, sidebarView) {

  // Create a partial definition for container.footer module
  var thisModule = app.module("container.footer", function(footer) {

    // add another footer module initializer
    footer.addInitializer(function(options) {
      this.sidebarContainer = sidebarView.create(options);
    });

    footer.addFinalizer(function() {
      delete this.sidebarContainer;
    });

    app.on("initialize:after", function() {
      footer.sidebarContainer.collection.fetch({
        // TODO: finish implementation
        success: function(collection) {
          //console.log("sidebar success");
        },
        error: function(collection, response, options) {
          //console.log("sidebar error");
        }
      });
    });
  });

  return thisModule;
});
