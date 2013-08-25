define([
  "backbone.marionette",
  "app",
  "modules/helpers/vendor-interface",
  "modules/views/post"
], function(Marionette, app, vendor, post) {

  // definition of the content region
  var ContentRegion = Marionette.Region.extend({
    el: "#content",

    // setup to get dynamic updates
    initialize: function() {
      var self = this;

      // handle post start
      app.vent.on("content:post:start", function(options) {
        var postView = post.create(options);
        self.listenTo(postView.model, "sync", function() {
          // TODO: content transition view
          // self.show(transitionView)
          var test = 0;
        });
        postView.model.fetch({
          success: function(model, response, options) {
            self.show(postView);
          },
          error: function(model, response, options) {
            // TODO: add error implementation
            // self.show(errorView)
            var test = 0;
          }
        });
      });

      // handle page start
      app.vent.on("content:page:start", function() {
        // TODO: implement pages
        var test = 0;
      });

      // handle category start
      app.vent.on("content:category:start", function() {
        // TODO: implement category
        var test = 0;
      });
    },

    // called after the region contents render
    onShow: function(/* view */) {
      vendor.initialize();
    }

  });

  return ContentRegion;
});
