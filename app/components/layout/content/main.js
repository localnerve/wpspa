/*
 * The main content region
 * This is a fixed region that represents the main content area of the app.
 * It holds a reference to all the prefetched content data from the cms.
 * When it receives a content:start event from the app, it 
 *   creates the appropriate content view for the content by type and id.
 */
define([
  "backbone.marionette",
  "app",
  "helpers/vendor-interface",
  "helpers/contract",
  "helpers/prefetch/main"
], function(Marionette, app, vendor, contract, prefetch) {

  // definition of the content region
  var ContentRegion = Marionette.Region.extend({
    el: "#content",

    initialize: function() {
      // Create a prefetch promise on the app.vent
      this.promise = prefetch.promise(app.vent);

      // Handle content start
      // The handler itself is anonymous because of the testing implications
      var self = this;
      app.vent.on("content:start", function(options) {
        self.contentStart(options);
      });
    },

    // Swap out the content from the prefetch
    // See the prefetch create to match up the handlers by signature to the events on the deferred promise
    contentStart: function(options) {
      contract(options, "options.object_id", "options.object_type");
      options = options.options;

      // Request the appropriate content view type
      var content = app.request("content:view:"+options.object_type);

      var self = this;
      this.promise.then(
        // success
        function(collection) {
          self.show(
            content.create({
              model: collection.get({
                id: options.object_id
              })
            })
          );
        },
        // fail
        function(response, options) {
          // TODO: Add error implementation
          // self.show(errorView)
          var test = 0;
        },
        // progress
        function() {
          // This will only get called if the promise is pending
          // TODO: Add content transition implementation
          // self.show(transitionView)
          var test = 0;
        }
      );
    },

    // Called after the region contents render
    onShow: function( /* view */ ) {
      vendor.initialize();
    }

  });

  return ContentRegion;
});
