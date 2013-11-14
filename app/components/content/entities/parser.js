/*
 * Parser for Wordpress json api posts
 */
define([
  "lodash",
  "helpers/contract",
  "helpers/routes",
  "resources/strings",
  "app"
], function(_, contract, routes, strings, app) {

  // Parse the categories of a post
  function parseCategories(post) {
    
    // not supporting uncategorized for now...
    _.each(post.categories, function(category) {

      // make the object type specific to this category
      var object_type = "category:"+category.slug;
      
      // Add derived properties to the category object
      category.route = routes.buildRoutePath(app.pushState, "category", category.slug);
      category.url = routes.routeToHref(category.route);

      // The category in a post doesn't contain the post contents.
      // Also, since the category might contain posts that we haven't downloaded, get them.
      app.vent.trigger("content:prefetch", [{
        object_type: object_type,
        object_id: category.id
      }]);

      // Setup to route this category
      app.vent.trigger("wpspa:router:addRoute", {
        name: category.slug,
        route: category.route,
        params: {
          header: {
            message: function(model) {
              return strings.content.multi.header.categoryArchives + model.get("title");
            }
          }
        },
        options: {
          object_type: object_type,
          object_id: category.id
        }
      });
    });
  }

  function parseComments(post) {

    // Add derived properties to the comments object
    post.comments.commentUrl = routes.buildRoutePath(app.pushState, post.url, "comment");
    post.comments.respondUrl = routes.buildRoutePath(app.pushState, post.url, "respond");

    // Add a route to handle comments for this post.
    // Since the content will be served by type/id, send in a parameter
    // to tell the presentation that it will need to prepare for comments.
    app.vent.trigger("wpspa:router:addRoute", {
      name: post.slug+"-comment",
      route: routes.hrefToRoute(post.comments.commentUrl),
      params: {
        action: "comment"
      },
      options: {
        object_type: post.type,
        object_id: post.id
      }
    });
    
    // Add a route to handle responses for this post.
    // Since the content will be served by type/id, send in a parameter
    // to tell the presentation that it will need to prepare for responses.
    app.vent.trigger("wpspa:router:addRoute", {
      name: post.slug+"-respond",
      route: routes.hrefToRoute(post.comments.respondUrl),
      params: {
        action: "respond"
      },
      options: {
        object_type: post.type,
        object_id: post.id
      }
    });
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

    if (data.posts) {

      // make the models and give them back to the collection
      return _.map(data.posts, function(post) {
        return process(post);
      });

    } else if (data.post) {

      return process(data.post);

    } else {
      throw new Error("Unexpected post data format");
    }
  }

  return parse;
});