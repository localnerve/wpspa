define([
  "lodash",
  "backbone",
  "modules/jst",
  "backbone.marionette"
], function(_, Backbone, jst, Marionette) {

  // patch the render method to work with JST
  Marionette.Renderer.render = function(template, data) {
    return jst(template, data);
  };

  // create the app
  var app = _.extend({
    root: "/"
  }, new Marionette.Application());

  // add the main region
  app.addRegions({
    main: "#main"
  });

  return app;
});
