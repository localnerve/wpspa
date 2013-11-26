/*
 * prefetch
 *
 * Starts requests to populate entities.
 * Prefetch is started on the "content:fetch" event for the given event aggregator.
 * Allows multiple fetches, can be rerun to add additional, unique fetches.
 *
 */
define([
  "lodash",
  "jquery",
  "app",
  "module"
], function(_, $, app, module) {

  // Construct a prefetch object on the given event aggregator
  function Prefetch(eventAggregator, timeout) {
    var self = this;

    // The collection of promises, keyed by object_type
    this.promises = {};

    // The request timeout for this Prefetch instance
    this.timeout = timeout || module.config().timeout;

    // Handle content:prefetch
    eventAggregator.on("content:prefetch", function(items) {
      self._fetch(items);
    });
  }

  //
  // Prefetch methods
  //
  _.extend(Prefetch.prototype, {

    // Method that performs the fetching
    _fetch: function(items) {
      var self = this;
      if (!_.isArray(items)) items = [items];

      // Prefetch unique entity types
      _.each(items, function(item) {
        var promise = self.promises[item.object_type];

        // If not already fetched or has previously failed
        if (!promise || promise.state() === "rejected") {
          var dfd = $.Deferred();

          // Get a unqiue set by object_type, items might not be homogenous
          var typedItems = _.where(items, { object_type: item.object_type });

          // Get the first custom entity creator for the set, if any
          var entityFactory = _.find(typedItems, function(i) { return !!item.create; });

          // Create or retrieve the entity
          var entity = app.request("content:entity", {
            object_type: item.object_type,
            items: typedItems,
            create: entityFactory ? entityFactory.create : undefined
          });

          // Listen to the request event and notify the promise holder
          entity.once("request", function() {
            if (dfd.state() === "pending") {
              // Progress notification
              dfd.notify();
            }
          });

          // Keep this promise, blow away a failed promise
          self.promises[item.object_type] = dfd.promise();

          // Fetch the object_type
          entity.fetch({
            // Request timeout
            timeout: self.timeout,

            // Forward the "success" event to the promise holder
            success: function(collection) {
              // Success notification
              dfd.resolve(collection);
            },
            // Forward the "fail" event to the promise holder
            error: function() {
              // Fail notification
              dfd.reject(typedItems);
            }
          });
        }
      });
    }
  });

  return {
    // Create and return a new Prefetch object
    _create: function(eventAggregator) {
      return new Prefetch(eventAggregator);
    },
    // Get a promises collection on a new Prefetch
    promises: function(eventAggregator) {
      return (new Prefetch(eventAggregator)).promises;
    }
  };

});
