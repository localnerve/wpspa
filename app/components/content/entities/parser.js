/*
 * Parser for Wordpress json api posts
 */
define([
  "lodash",
  "helpers/contract",
  "helpers/routes",
  "helpers/types",
  "resources/strings",
  "app"
], function(_, contract, routes, types, strings, app) {

  // Parse the categories of a post
  function parseCategories(post) {
    
    // not supporting uncategorized for now...
    _.each(post.categories, function(category) {

      // make the object type specific to this category
      var object_type = types.objectTypes.category(category.slug);
      
      // make the route options
      var options = {
        object_type: object_type,
        object_id: category.id
      };

      // Add derived properties to the category object
      category.route = routes.buildRoutePath(app.pushState, "category", category.slug);
      category.url = routes.routeToHref(category.route);

      // A category in a post doesn't contain the post contents.
      // Furthermore, the category might contain posts that we haven't downloaded, get them.
      routes.addRoutes(app.vent, [{
        name: category.slug,
        route: category.route,
        params: {
          header: {
            message: routes.archives.archiveHeader.category
          }
        },
        options: options
      }], true);
    });
  }

  function parseComments(post) {

    var result = routes.comments.buildRouteParams(app.pushState, post.url, post.slug, {
      object_type: post.type,
      object_id: post.id
    });

    // Add derived properties to the comments object
    post.comments.commentUrl = result.sources.comment;
    post.comments.respondUrl = result.sources.respond;

    // Add a routes to handle comments for this post.
    routes.addRoutes(app.vent, result.routeParams, false);
  }

  // parse a single post
  function parsePost(post) {
    contract(post, "date", "url");
    
    // Add derived properties to the post object
    post.route = routes.hrefToRoute(post.url);
    post.url = routes.routeToHref(post.route);
    post.datetime = post.date.replace(" ", "T")+"+00.00";

    parseCategories(post);
    parseComments(post);

    return post;
  }

  // process a new post
  function process(post) {
    post = parsePost(post);
    app.vent.trigger("content:connect", post);
    return post;
  }

  // parse response data from json api
  function parse(data) {
    var input = data.posts || [data.post];

    if (!input.length || input.length <= 0) {
      throw new Error("Unexpected post data format");
    }

    // make the models and give them back to the collection
    return _.map(data.posts, function(post) {
      return process(post);
    });
  }

  return parse;
});