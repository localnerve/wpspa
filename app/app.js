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
  "server/helpers/rewrites",
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
    root: module.config().root,
    pushState: module.config().pushState
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
      $w.location.replace(rewrites.notfound("/" + path));
    }, options.path, app);
  });

  // Wait for it to be ok to start routing...
  app.vent.once("app:startRoutes", function() {
    // Trigger the initial route and enable HTML5 History API support, set the
    // root folder to app.root.    
    Backbone.history.start({
      pushState: app.pushState,
      root: app.root
    });

    // Initialize anchors
    anchor.init(app);
  });

  // On a failure
  app.vent.once("app:error", function(options) {
    // TODO: implement application level, categorized error handling
    throw new Error("app:error, needs implementation...");
  });

  // After app initialization
  app.on("initialize:after", function(options) {
    // Trigger the initial application render chain
    app.main.show(app.container.layout);
  });

  return app;
});
