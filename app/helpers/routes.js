/*
 * routes.js
 *
 * Helper methods to assist with routes.
 */
define([
  "lodash"
], function(_) {

  /**
   * Build a route path
   *
   * Arguments: 
   *  1: pushstate boolean
   *  2: the path to start building a url on to
   *  others: URI components to add on the start path
   *
   * Returns the built url result
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

  // super simple href to route mapping
  // handle relative and absolute urls
  function hrefToRoute(href) {
    var re = /^https?:\/\/.+(\/)([^\\?]+)\/?$/;
    var route = href.replace(re, "$2");
    if (route.charAt(route.length - 1) === '/')
      route = route.substr(0, route.length - 1);
    if (route.charAt(0) === '/')
      route = route.substring(1);
    return route;
  }

  return {
    buildRoutePath: buildRoutePath,
    routeToHref: routeToHref,
    hrefToRoute: hrefToRoute
  };

});