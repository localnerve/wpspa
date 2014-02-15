/*
 * connect
 *
 * Connect data to the application so it can be shown as content.
 */
define([
  "lodash",
  "jquery",
  "helpers/contract",
  "helpers/routes",
  "app"
], function(_, $, contract, routes, app) {

  // Construct a Connect object on the given eventAggregator and promises
  function Connect(eventAggregator, promises) {
    var self = this;

    this._promises = promises;

    // Handle content:connect
    eventAggregator.on("content:connect", function(post) {
      self._connect(post);
    });
  }

  //
  // Connect methods
  //
  _.extend(Connect.prototype, {

    // Connect a post to the main content dispatch, if it needs it
    // Posts sent into connect have already been fetched, so they just need to be connected.
    _connect: function(post) {
      contract(post, "type", "id", "slug", "route");

      // get a new or existing entity
      var entity = app.request("content:entity", {
        object_type: post.type,
        emptyOnNew: true
      }).entity;

      // If new, give main content dispatch a reference to the resolved promise
      if (entity.options.createdEmpty) {
        var dfd = $.Deferred();
        entity.options.createdEmpty = undefined;
        dfd.resolve(entity);
        this._promises[post.type] = dfd.promise();
      }

      // Add the post to the new or existing entity, ignores duplicates.
      entity.add(post);

      // add the route, ignores duplicates
      routes.addRoutes(
        app.vent, routes.makeRouteParam(
          post.slug, post.route, routes.makeRouteOptions(post.type, post.id)
        )
      );
    }
  });

  return {
    // Create and return a new connect object
    create: function(eventAggregator, promises) {
      return new Connect(eventAggregator, promises);
    }
  };
});