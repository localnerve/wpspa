/*
 * siteInfo
 * Shows the site info
 */
define([
  "backbone.marionette",
  "app"
], function(Marionette, app) {

  // Create a partial definition for container.footer module
  var thisModule = app.module("container.footer", function(footer) {

    // The definition of the siteInfo view
    var SiteInfoView = Marionette.ItemView.extend({
      template: "components/layout/footer/siteInfo/template",
      className: "site-info-placeholder"
    });

    // add another footer module initializer
    footer.addInitializer(function(options) {
      this.siteInfo = new SiteInfoView(options);
    });

    footer.addFinalizer(function() {
      delete this.siteInfo;
    });

  });

  return thisModule;
});
