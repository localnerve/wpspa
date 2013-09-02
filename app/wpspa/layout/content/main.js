define([
  "backbone.marionette",
  "app",
  "helpers/vendor-interface",
  "helpers/contract",
  "wpspa/layout/content/prefetch/main",
  "wpspa/layout/content/post/main"
], function(Marionette, app, vendor, contract, prefetch, post) {

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
      contract(options, "object_id");

      var self = this;
      this.promise.then(
        // success

        function(collection) {
          self.show(
            // for now, this is always going to be a "post" view.
            // next possibly create a factory for views based on options.object_type.
            post.create({
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
          // TODO: Add content transition implementation
          // self.show(transitionView)
          var test = 0;
        }
      );
    },

    // called after the region contents render
    onShow: function( /* view */ ) {
      vendor.initialize();
    }

  });

  return ContentRegion;
});
