define([
  "backbone.marionette",
  "app",
  "modules/helpers/contract"
], function(Marionette, app, contract) {

  var thisModule = app.module("appLayout.footerLayout");

  // define the FooterLayout.
  // just a plain item view for now...
  var FooterLayout = Marionette.ItemView.extend({
    template: "footer",
    className: "grid-row",
    tagName: "footer",

    initialize: function(options) {
      contract(options, "reqres");
      options.reqres.setHandler("footerLayout:instance", function() {
        return thisModule.instance;
      });
    }
  });

  thisModule.addInitializer(function(options) {
    thisModule.instance = new FooterLayout(options);
  });

  thisModule.addFinalizer(function() {
    delete thisModule.instance;
  });
});
