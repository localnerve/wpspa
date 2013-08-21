define([
  "lodash",
  "backbone",
  "backbone.marionette",
  "modules/loaders/jst",
  "modules/helpers/anchor",
  "modules/helpers/contract",
  "module"
], function(_, Backbone, Marionette, loader, anchor, contract, module) {

  var $w = window;

  // override the render method to work with a loader
  Marionette.Renderer.render = function(template, data) {
    return loader(template, data, module.config().root);
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
    contract(options, "path");
    
    // Run the test harness. Otherwise, exit the app.
    _.defer($w.__test || function(path) {
      // kill cookie here, too? TODO...
      $w.location.replace("/" + path + ".notfound");
    }, options.path, this);
  
  });

  // after app initialization
  app.on("initialize:after", function(options) {

    // Trigger the initial, application render chain
    app.main.show(app.request("appLayout:instance"));

    // wait for navigation to arrive
    app.listenTo(app.vent, "app:navigation:success", function(options) {
      // Trigger the initial route and enable HTML5 History API support, set the
      // root folder to app.root.    
      Backbone.history.start({
        pushState: true,
        root: app.root
      });

      // initialize anchors
      anchor.init(app);
    });

    // wait for navigation to fail
    app.listenTo(app.vent, "app:navigation:fail", function(options) {
      // TODO: implement application, categorized error handling
    });

  });

  return app;
});
