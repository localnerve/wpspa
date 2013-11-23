/*
 * error/view
 *
 * The default content error view
 * Presents a heading, message, and an option to replay the failed content request
 * options:
 *   params.error.heading (optional) to override the default heading
 *   params.error.message (optional) to override the default message
 *   params.error.retryButtonText (optional) to override the retry button text
 *   items (optional) to refer to a failed object_type set that was fetched
 *   startOpts (required if options.items was specified) to refer to the content:start options for replay
 */
define([
  "backbone.marionette",
  "app",
  "resources/strings"
], function(Marionette, app, strings) {
  
  var ErrorView = Marionette.ItemView.extend({
    template: "components/content/views/error/view",
    className: "grid-row",
    events: {
      "click .retry-button": "retry"
    },

    initialize: function(options) {
      this.params = options.startOpts ? options.startOpts.params : undefined;
    },

    serializeData: function() {
      return {
        heading: this.params.error.heading || strings.content.error.heading,
        message: this.params.error.message || strings.content.error.message,
        retryClass: !!this.options.items ? "retry-button" : "hide",
        retryButtonText: this.params.error.retryButtonText || strings.content.error.retryButtonText
      };
    },

    retry: function() {
      app.vent.trigger("content:prefetch", this.options.items);
      app.vent.trigger("content:start", this.options.startOpts);
    }
  });

  return {
    create: function(options) {
      return new ErrorView(options);
    }
  };
});