/*
 * sync
 * An alternate sync implementation that allows for boostrap data to be sourced.
 * If no bootstrapped data is found, delegates to the normal Backbone.sync.
 */
define([
  "jquery",
  "backbone"
], function($, Backbone) {
  
  function bootstrapSync(bootstrap) {

    return function(method, entity, options) {
      options = options || {};

      if (bootstrap && options.success) {
        // prepare to mimic an xhr response.
        var dfd = $.Deferred();

        // boostrapped data is here, so succeed now
        options.success(bootstrap);
        dfd.resolve(bootstrap);

        // mimic an xhr response.
        return dfd.promise();
      } else {

        // delegate to Backbone.sync
        return Backbone.sync.apply(this, arguments);
      }
    };

  }

  return bootstrapSync;
});