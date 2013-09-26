/*
 * prefetch
 *
 * Starts the request on the prefetch collection and notifies everyone.
 * Prefetch is started on the "content:fetch" event for the given event aggregator.
 * Allows multiple fetches, can be rerun to add additional, unique fetches.
 *
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
    eventAggregator.on("content:prefetch", function(items) {
      self._fetch(items);
    });

    // Method that performs the fetching
    this._fetch = function(items) {
      if (!_.isArray(items))
        items = _.toArray(items);

      // if we didn't get at least one item, someone should know
      contract(items, "0");

      // Prefetch unique entity types
      _.each(items, function(item) {
        // if not already fetched
        if (!self.promises[item.object_type]) {
          var dfd = $.Deferred();

          // setup unique object_type
          var entity = app.request("content:entity", {
            object_type: item.object_type,
            items: _.where(items, { object_type: item.object_type })
          });
          entity.once("request", function() {
            if (dfd.state() === "pending") {
              // progress notification
              dfd.notify();
            }
          });
          self.promises[item.object_type] = dfd.promise();

          // fetch the object_type
          entity.fetch({
            // Forward the "success" event
            success: function(collection, response, options) {
              // success notification
              dfd.resolve(collection);
            },
            // Forward the "fail" event
            error: function(collection, response, options) {
              // fail notification
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
