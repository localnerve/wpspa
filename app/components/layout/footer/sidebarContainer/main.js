/*
 * sidebarContainer
 * Defines the sidebar container and composition
 */
define([
  "backbone.marionette",
  "app"
], function(Marionette, app) {

  // Create a partial definition for container.footer module
  var thisModule = app.module("container.footer", function(footer) {

    // The definition of the SideBarContainerView
    var SideBarContainerView = Marionette.ItemView.extend({
      template: "components/layout/footer/sidebarContainer/template",
      className: "widget-area"
    });

    // add another footer module initializer
    footer.addInitializer(function(options) {
      this.sidebarContainer = new SideBarContainerView(options);
    });

    footer.addFinalizer(function() {
      delete this.sidebarContainer;
    });

  });

  return thisModule;
});
