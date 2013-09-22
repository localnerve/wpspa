/*
 * prefetch
 * Starts the request on the prefetch collection and notifies everyone.
 * prefetch is started on the "content:fetch" event for the given event aggregator.
 */
define([
  "lodash",
  "jquery",
  "helpers/contract",
  "app"
], function(_, $, contract, app) {

  // Construct a prefetch for the given event aggregator
  function prefetch(eventAggregator) {

    // The collection of promises
    this.promises = {};

    // Catch the prefetch event
    var self = this;
    eventAggregator.once("content:prefetch", function(items) {
      self._fetch(items);
    });

    // Method that performs the fetching
    this._fetch = function(items) {
      contract(items, "0");

      // Prefetch unique entity types
      var oTypes = {};
      _.each(items, function(item) {
        if (!oTypes[item.object_type]) {
          oTypes[item.object_type] = 1;

          // setup unique object_type
          var entity = app.request("content:entity", item.object_type);
          var dfd = $.Deferred();
          entity.once("request", function() {
            if (dfd.state() === "pending") {
              // progress
              dfd.notify();
            }
          });
          self.promises[item.object_type] = dfd.promise();

          // fetch the object_type
          entity.fetch({
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
        }
      });
    };
  }

  return {
    // Create and return a new prefetch object
    _create: function(eventAggregator) {
      return new prefetch(eventAggregator);
    },
    // Create a new prefetch and get the promises
    // promises can be retrieved by object_type
    promises: function(eventAggregator) {
      return (new prefetch(eventAggregator)).promises;
    }
  };

});
