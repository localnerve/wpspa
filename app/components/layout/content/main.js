/*
 * The main content region
 * This is a fixed region that represents the main content area of the app.
 * It holds a reference to all the prefetched content data from the cms.
 * When it receives a content:start event from the app, it 
 *   creates the appropriate content view for the content by type and id.
 * Content types and ids are object_type and object_id defined in the database on the backend.
 * object_type and object_id corresponds to the WPSPA object type and id defined by the 
 *   WPSPA plugin in concert with your normal wordpress menu.
 */
define([
  "backbone.marionette",
  "app",
  "helpers/vendor-interface",
  "helpers/contract",
  "components/layout/content/prefetch"
], function(Marionette, app, vendor, contract, prefetch) {

  // definition of the content region
  var ContentRegion = Marionette.Region.extend({
    el: "#content",

    initialize: function() {
      
      // Create prefetch promises on the app.vent
      this.promises = prefetch.promises(app.vent);

      // Handle content start
      // The handler itself is anonymous because of the testing implications
      var self = this;
      app.vent.on("content:start", function(options) {
        self.contentStart(options);
      });
    },

    // Swap out the content from the prefetch
    // See the prefetch to match up the handlers by signature to the events on the deferred promise
    contentStart: function(options) {
      contract(options, "options.object_id", "options.object_type");
      var subopts = options.options;

      // Request the appropriate content view
      var content = app.request("content:view", subopts.object_type);

      var self = this;
      this.promises[subopts.object_type].then(
        // success
        function(collection) {
          self.show(
            content.create({
              model: collection.get({
                id: subopts.object_id
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
    onShow: function() {
      vendor.initialize();
    }

  });

  return ContentRegion;
});
