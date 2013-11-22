/*
 * connect
 *
 * Connect a new post to the application so it can be shown as content.
 * Adds a post that has already been fetched to the main content dispatch.
 */
define([
  "lodash",
  "jquery",
  "helpers/contract",
  "app"
], function(_, $, contract, app) {

  function connect(eventAggregator, promises) {

    var self = this;
    eventAggregator.on("content:connect", function(post) {
      self._connect(post);
    });

    // Connect a post to the app content dispatch, if it needs it
    // Posts sent into connect have already been fetched, so they just need to be connected.
    this._connect = function(post) {
      contract(post, "type", "id", "slug", "route");

      // get a new or existing entity
      var entity = app.request("content:entity", {
        object_type: post.type,
        emptyOnNew: true
      });

      // If new, give main content dispatch a reference to the resolved promise
      if (entity.options.createdEmpty) {
        var dfd = $.Deferred();
        dfd.resolve(entity);
        promises[post.type] = dfd.promise();
      }

      // Add the post to the new or existing entity, ignores duplicates.
      entity.add(post);

      // add the route, ignores duplicates
      app.vent.trigger("app:router:addRoute", {
        name: post.slug,
        route: post.route,
        options: {
          object_type: post.type,
          object_id: post.id
        }
      });
    };
  }

  return {
    // Create and return a new connect object
    create: function(eventAggregator, promises) {
      return new connect(eventAggregator, promises);
    }
  };
});