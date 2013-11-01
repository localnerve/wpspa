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
  "jquery",
  "backbone.marionette",
  "app",
  "helpers/contract",
  "components/layout/content/vendor-interface",
  "components/layout/content/prefetch",
  "components/layout/content/connect",
  "module"
], function($, Marionette, app, contract, vendor, prefetch, connect, module) {

  // definition of the content region
  var ContentRegion = Marionette.Region.extend({
    el: "#content",

    initialize: function() {
      
      // Create prefetch promises on the app.vent
      this._promises = prefetch.promises(app.vent);

      // Create the connector on the app.vent and promises
      this._connect = connect.create(app.vent, this._promises);

      // Handle content start
      // The handler itself is anonymous because of the testing implications
      var self = this;
      app.vent.on("content:start", function(options) {
        self.contentStart(options);
      });
    },

    // Ensure this region is at the top
    ensureTop: function() {
      var offset = $(this.el).offset();
      var currentTop = $(document).scrollTop();
      if (currentTop > offset.top) {
        $("html, body").animate({
            scrollTop: offset.top,
            scrollLeft: offset.left
          }, {
            duration: module.config().scrollTopDuration
          }
        );
      }
    },

    // Swap out the content from the prefetch
    // See the prefetch to match up the handlers by signature to the events on the deferred promise
    contentStart: function(options) {
      contract(options, "options.object_id", "options.object_type");
      var subopts = options.options;

      // Request the appropriate content view
      var content = app.request("content:view", options);

      // Request the appropriate transition view
      var transition = app.request("content:transition", options);

      // Request the appropriate error view
      var error = app.request("content:error", options);

      // make sure this region is at the top for viewing
      this.ensureTop();

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
          self.show(error.create());
        },
        // progress
        function() {
          if (this.state() === "pending") {
            self.show(transition.create());
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
