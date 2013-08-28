/*
 * app.js
 * The main application module
 *  Creates and composes the application
 *  Exposes the app instance
 */
define([
  "lodash",
  "backbone",
  "backbone.marionette",
  "loaders/jst",
  "helpers/anchor",
  "helpers/contract",
  "helpers/rewrites",
  "module"
], function(_, Backbone, Marionette, loader, anchor, contract, rewrites, module) {
  // Denote global reference
  var $w = window;

  // Override the render method to work with a loader
  Marionette.Renderer.render = function(template, data) {
    return loader(template, data, module.config().root);
  };

  // Create the app
  var app = new Marionette.Application({
    root: module.config().root
  });

  // Add the main region
  app.addRegions({
    main: "#main"
  });

  // Handle app exit events
  app.vent.on("app:exit", function(options) {
    contract(options, "path");
    
    // Run the test harness. Otherwise, exit the app.
    _.defer($w.__test || function(path) {
      $w.location.replace(rewrites.notfound("/"+path));
    }, options.path, app);
  });

  // After app initialization
  app.on("initialize:after", function(options) {

    // Trigger the initial, application render chain
    app.main.show(app.wpspa.layout);

    // Wait for navigation to arrive
    app.vent.once("app:navigation:success", function() {
      // Trigger the initial route and enable HTML5 History API support, set the
      // root folder to app.root.    
      Backbone.history.start({
        pushState: true,
        root: app.root
      });

      // Initialize anchors
      anchor.init(app);
    });

    // Wait for navigation to fail
    app.vent.once("app:navigation:fail", function(options) {
      // TODO: implement application, categorized error handling
    });

  });

  return app;
});
