define([
  "backbone.marionette"
], function(Marionette) {

  // TODO: implement
  var ContentRegion = Marionette.Region.extend({
    el: "#content",

    initialize: function(options) {

    },

    // called after the region contents render
    onShow: function(view) {
      // initialize the vendor here
    }

  });

  return ContentRegion;
});
