/*
 * The main content region
 * This is a fixed region that represents the main content area of the app.
 * It holds a reference to all the content data from the cms.
 *
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
  "helpers/ui",
  "components/layout/content/vendor-interface",
  "components/layout/content/prefetch",
  "components/layout/content/connect",
  "components/layout/content/page",
  "module"
], function($, Marionette, app, contract, ui, vendor, prefetch, connect, page, module) {

  // definition of the content region
  var ContentRegion = Marionette.Region.extend({
    el: "#content",

    initialize: function() {
      
      // Create prefetch promises on the app.vent
      this._promises = prefetch.promises(app.vent);

      // Create the connector on the app.vent and promises
      this._connect = connect.create(app.vent, this._promises);

      // Create the page updater on this event source
      this._page = page.create(this);

      // transition options
      this.transition = {
        count: 0,
        view: {}
      };

      var self = this;

      // Handle content start      
      app.vent.on("content:start", function(options) {
        self.contentStart(options);
      });

      // Catch any view transition events
      app.vent.on("view:transition", function(options) {
        self.transition.view = options;
      });
    },
    
    // Make sure this area is visible
    ensureVisible: function() {
      ui.scrollTopConditional($(this.el).offset());
    },

    // Swap out the content from the prefetch
    // See the prefetch to match up the handlers by signature to the events on the deferred promise
    contentStart: function(options) {
      contract(options, "options.object_id", "options.object_type");
      var subopts = options.options;
      var self = this;

      // Request the appropriate content view
      var content = app.request("content:view", options);

      // Request the appropriate progress view
      var progress = app.request("content:progress", options);

      // Request the appropriate error view
      var error = app.request("content:error", options);

      this.ensureVisible();
      
      this._promises[subopts.object_type].then(
        // success
        function(collection) {
          var model = collection.get({
            id: subopts.object_id
          });
          self.trigger("content:start:success", {
            model: model
          });
          self.show(
            content.create({
              model: model,
              params: options.params
            })
          );
        },
        // fail
        function(items) {
          self.show(error.create({ items: items, startOpts : options }));
        },
        // progress
        function() {
          if (this.state() === "pending") {
            self.show(progress.create());
          }
        }
      );
    },

    // overriding the default open to allow for transitions
    open: function(view) {
      view.triggerMethod("transition:open:before", this.transition);
      this.$el.empty().append(view.el);
      view.triggerMethod("transition:open:after", this.transition);
      this.transition.count++;
    },

    // Called after the region contents render
    onShow: function() {
      vendor.initialize();
      app.container.trigger("container:afterVendorInitialize", vendor);
    }

  });

  return ContentRegion;
});