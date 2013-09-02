/*
 * prefetch
 * Starts the request on the prefetch collection and notifies everyone.
 * prefetch is started on the "content:fetch" event for the given event aggregator.
 */
define([
  "jquery",
  "wpspa/layout/content/prefetch/entities"
], function($, entities) {

  // Construct a prefetch for the given event aggregator
  function prefetch(eventAggregator) {

    // Create the deferred object
    var dfd = $.Deferred();

    // Catch the prefetch event
    var self = this;
    eventAggregator.once("content:prefetch", function(items) {
      self._fetch(items);
    });

    // Method that performs the fetching
    this._fetch = function(items) {
      // Create the collection of the prefetch items
      var collection = entities.createCollection({
        fetchItems: items
      });

      // "start" of the request will emit this event
      collection.once("request", function() {
        if (dfd.state() === "pending") {
          // progress
          dfd.notify();
        }
      });

      collection.fetch({
        // Forward the "success" event
        success: function(collection, response, options) {
          // success
          dfd.resolve(collection);
        },
        // Forward the "fail" event
        error: function(collection, response, options) {
          // fail
          dfd.reject(response, options);
        }
      });
    };

    // Expose the promise interface to the deferred
    this.promise = dfd.promise();
  }

  return {
    // Create and return a new prefetch object
    _create: function(eventAggregator) {
      return new prefetch(eventAggregator);
    },
    // Create a new prefetch and get the promise
    promise: function(eventAggregator) {
      return (new prefetch(eventAggregator)).promise;
    }
  };

});
