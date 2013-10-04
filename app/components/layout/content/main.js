/*
 * The main content region
 * This is a fixed region that represents the main content area of the app.
 * It holds a reference to all the prefetched content data from the cms.
 * The main content dispatcher
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
  "components/layout/content/prefetch",
  "components/layout/content/connect"
], function(Marionette, app, vendor, contract, prefetch, connect) {

  // definition of the content region
  var ContentRegion = Marionette.Region.extend({
    el: "#content",

    initialize: function() {
      
      // Create prefetch promises on the app.vent
      this._promises = prefetch.promises(app.vent);

      // Create the connector on the app.vent and promises
      this._connect = connect.create(app.vent, this._promises);

      // For now, just get a single, context free transition
      this.transition = app.request("content:view", {object_type: "transition"});

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
      var content;
      if (options.view)
        content = options.view(options);
      else
        content = app.request("content:view", subopts);

      var self = this;
      this._promises[subopts.object_type].then(
        // success
        function(collection) {
          self.show(
            content.create({
              model: collection.get({
                id: subopts.object_id
              }),
              params: options.params
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
          if (this.state() === "pending") {
            self.show(self.transition.create());
            var test = 0;
          }
        }
      );
    },

    // Called after the region contents render
    onShow: function() {
      vendor.initialize();
      app.container.trigger("container:afterVendorInitialize", vendor);
    }

  });

  return ContentRegion;
});
