/*
 * container.footer
 * Defines the container.footer submodule and layout
 */
define([
  "backbone.marionette",
  "app",
  "components/layout/footer/sidebarContainer/main",
  "components/layout/footer/siteInfo/main"
], function(Marionette, app) {

  // Create a partial definition for container.footer
  var thisModule = app.module("container.footer", function(footer) {

    // Definition of the Footer Layout.
    var FooterLayout = Marionette.Layout.extend({
      template: "components/layout/footer/template",
      className: "site-footer",

      regions: {
        sidebarContainer: ".sidebar-container",
        siteInfo: ".site-info"
      },

      onRender: function() {
        this.sidebarContainer.show(footer.sidebarContainer);
        this.siteInfo.show(footer.siteInfo);
      }

    });

    footer.addInitializer(function(options) {
      this.layout = new FooterLayout(options);
    });

    footer.addFinalizer(function() {
      delete this.layout;
    });

  });

});
