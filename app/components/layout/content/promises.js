/**
 * promises.js
 *
 * The public interface for promises.
 * Provides on-demand fetch for missing promises.
 */
define([
  "lodash",
  "helpers/contract"
], function(_, contract) {

  function Promises(eventAggregator, promises) {
    this._promises = promises;
    this._ea = eventAggregator;
  }

  _.extend(Promises.prototype, {

    // Given the route options, get a promise
    // Handles any on-demand registration and fetching
    get: function(options) {
      contract(options, "object_type");

      var promise = this._promises[options.object_type];
      if (!promise) {
        // on-demand promise registration and fetch required
        this._ea.trigger("content:prefetch", options);
        promise = this._promises[options.object_type];
      }

      return promise;
    }
  });

  return {
    create: function(eventAggregator, promises) {
      return new Promises(eventAggregator, promises);
    }
  };
});