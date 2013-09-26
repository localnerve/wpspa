/*
 * connect
 *
 * Connect a new post to the application so it can be shown as content.
 */
define([
  "lodash",
  "jquery",
  "helpers/contract",
  "app"
], function(_, $, contract, app) {

  // Connect a post to the app content dispatch, if it needs it
  // Posts sent into connect have already been fetched, so they just need to be connected.
  function connect(post) {
    contract(post, "type", "id", "slug", "route");

    // get a new or existing entity
    var entity = app.request("content:entity", {
      object_type: post.type,
      emptyOnNew: true
    });

    // If new, give main content dispatch a reference to the resolved promise
    if (entity.isEmpty()) {
      var dfd = $.Deferred();
      dfd.resolve(entity);
      app.container.layout.content.promises[post.type] = dfd.promise();
    }

    // Add the post to the new or existing entity, skip duplicates.
    entity.add(post);

    // add the route (idempotent)
    app.vent.trigger("wpspa:router:addRoute", {
      name: post.slug,
      route: post.route,
      options: {
        object_type: post.type,
        object_id: post.id
      }
    });

    return post;
  }

  return connect;
});