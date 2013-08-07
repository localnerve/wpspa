define([
  "lodash",
  "backbone",
  "backbone.marionette",
  "modules/loaders/jst",
  "modules/helpers/anchor",
  "modules/layouts/appLayout",
  "modules/routers/router",
  "module"
], function(_, Backbone, Marionette, loader, anchor, appLayout, router, module) {

  var $w = window;

  // override the render method to work with a loader
  Marionette.Renderer.render = function(template, data) {
    return loader(template, data);
  };

  // create the app
  var app = new Marionette.Application({
    root: module.config().root
  });

  // add the main region
  app.addRegions({
    main: "#main"
  });

  // handle app exit events
  app.listenTo(app.vent, "app:exit", function(options) {
    options = options || {};

    // Run the test harness. Otherwise, run the given exit routine
    _.defer($w.__test || options.exit, options.path, this);
  });

  // application initialization
  app.addInitializer(function(options) {
    app.router = router.create(options);
    app.main.show(appLayout.create(options));
  });

  app.on("initialize:after", function(options) {

    // Trigger the initial route and enable HTML5 History API support, set the
    // root folder to app.root.    
    Backbone.history.start({
      pushState: true,
      root: app.root
    });

    // initialize anchors
    anchor.init();
  });

  return app;
});
