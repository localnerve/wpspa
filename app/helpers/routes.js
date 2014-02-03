/**
 * routes.js
 *
 * Helper methods to assist with routes.
 */
define([
  "lodash"
], function(_) {

  // The names of comment actions
  var commentActions = {
    comment: "comment",
    respond: "respond"
  };

  /**
   * Build comment route parameters
   *
   * Formats standard comment route parameters for creating comment/respond
   * routes. Use this to create comment and respond routes. The created routes 
   * will pass the same given options when invoked.
   * The given route can be in route or href format, if it is already a route
   * it will pass-thru, if it is an href it will be converted to a route.
   *
   * Returns sources and routeParams. Sources are used to create the acutal routes.
   * If you supply an href for the route, then these will also be in href format.
   */
  function buildCommentRoutes(pushState, route, slug, options) {
    var result = {
      sources: {
        comment: buildRoutePath(pushState, route, commentActions.comment),
        respond: buildRoutePath(pushState, route, commentActions.respond)
      },
      routeParams: []
    };

    result.routeParams.push({
      name: slug+"-"+commentActions.comment,
      route: hrefToRoute(result.sources.comment),
      params: {
        action: commentActions.comment
      },
      options: options
    });
    
    result.routeParams.push({
      name: slug+"-"+commentActions.respond,
      route: hrefToRoute(result.sources.respond),
      params: {
        action: commentActions.respond
      },
      options: options
    });

    return result;
  }

  /**
   * Build a route path
   *
   * Arguments: 
   *  1: pushstate boolean
   *  2: a url or route to start building on to
   *  others: URI components to add on the start path
   *
   * Returns the built route result
   */
  function buildRoutePath(pushState, start) {
    var sep = pushState ? "/" : "-";

    if (start.charAt(start.length - 1) === sep)
      start = start.substr(0, start.length - 1);

    var path = start;
    var components = Array.prototype.slice.call(arguments, 2);
    _.each(components, function (component) {
      path += sep + encodeURIComponent(component);
    });

    return path;
  }

  // Convert a route to an href
  function routeToHref(route) {
    var href = route;
    if (route.charAt(0) !== '/') {
      href = "/" + href;
    }
    return href;
  }

  // href to route mapping
  // Extract the url path in third catpure.
  // Handle relative and absolute urls
  // Ref: http://my.safaribooksonline.com/book/programming/regular-expressions/9780596802837/7dot-urls-paths-and-internet-addresses/id3029853#X2ludGVybmFsX0h0bWxWaWV3P3htbGlkPTk3ODA1OTY4MDI4MzclMkZpZDMwMjEzODcmcXVlcnk9
  function hrefToRoute(href) {
    var re = /^([a-z][a-z0-9+\-.]*:(\/\/[^\/?#]+)?)?([a-z0-9\-._~%!$&'()*+,;=:@\/]*)/i;
    var route = href.replace(re, "$3");
    if (route.charAt(route.length - 1) === '/')
      route = route.substr(0, route.length - 1);
    if (route.charAt(0) === '/')
      route = route.substring(1);
    return route;
  }

  return {
    buildRoutePath: buildRoutePath,
    routeToHref: routeToHref,
    hrefToRoute: hrefToRoute,
    buildCommentRoutes: buildCommentRoutes,
    commentActions: commentActions
  };

});