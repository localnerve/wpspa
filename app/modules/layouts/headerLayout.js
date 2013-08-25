define([
  "backbone.marionette",
  "app",
  "modules/helpers/contract",
  "modules/views/navigation",
  "modules/views/banner"
], function(Marionette, app, contract) {

  // create the application module
  var thisModule = app.module("appLayout.headerLayout");

  // definition of the headerLayout
  var HeaderLayout = Marionette.Layout.extend({

    template: "header-layout",
    tagName: "header",
    className: "grid-row",

    regions: {
      navigation: "#navigation",
      banner: "#banner"
    },

    initialize: function(options) {
      contract(options, "reqres");
      options.reqres.setHandler("headerLayout:instance", function() {
        return thisModule.instance;
      });
    },

    // render handler
    // renders all child views of this layout
    onRender: function(options) {
      this.navigation.show(app.request("headerLayout:navigation:instance"));
      // TODO:
      //this.banner.show(banner.create(options));
    }

  });

  // app module initialization
  thisModule.addInitializer(function(options) {
    this.instance = new HeaderLayout(options);
  });

  thisModule.addFinalizer(function() {
    delete this.instance;
  });

  return thisModule;

});
