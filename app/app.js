define([
  "backbone.marionette"
], function(Marionette) {
  var app = _.extend({ root: "/" }, new Marionette.Application());
  return app;
});
