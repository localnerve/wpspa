/*
 * error/view
 *
 * The default content error view
 * Presents a heading, message, and an option to replay the failed content request.
 * params.error object dictates the content of the text in the view.
 * params are first sourced from options.startOpts (if supplied).
 *   If none supplied defaults are used.
 * params.error format:
 *   params.error.heading (optional) to override the default heading
 *   params.error.message (optional) to override the default message
 *   params.error.retryButtonText (optional) to override the retry button text
 * Other options:
 *   items (optional) to refer to a failed object_type set that was fetched. This options enables retry.
 *   startOpts (required if options.items was specified) to refer to the content:start options for replay
 */
define([
  "lodash",
  "backbone.marionette",
  "app",
  "resources/strings"
], function(_, Marionette, app, strings) {
  
  var ErrorView = Marionette.ItemView.extend({
    template: "components/content/views/error/view",
    className: "grid-row",
    events: {
      "click .retry-button": "retry"
    },

    // Assign the view params from options.startOpts.params, if found
    initialize: function(options) {
      this.params = {};
      if (options.startOpts) {
        this.params = options.startOpts.params || this.params;
      }
      this.params.error = this.params.error || {};

      _.defaults(this.params.error, {
        heading: strings.content.error.heading,
        message: strings.content.error.message,
        retryButtonText: strings.content.error.retryButtonText
      });
    },

    serializeData: function() {
      return {
        heading: this.params.error.heading,
        message: this.params.error.message,
        retryClass: !!this.options.items ? "retry-button" : "hide",
        retryButtonText: this.params.error.retryButtonText
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