/**
 * routes.js
 *
 * Helper methods to assist with routes.
 */
define([
  "lodash",
  "helpers/types",
  "resources/strings"
], function(_, types, strings) {

  // Archive route helpers
  var archives = {

    archiveHeader: {
      date: function(model) {
        return strings.content.multi.header.monthlyArchives +
          model.get("title").replace(/(\d+)\/(\d+)/, function(m, m1, m2) {
              return strings.content.months[parseInt(m2, 10)] + " " +m1;
          });
      },
      category: function(model) {
          return strings.content.multi.header.categoryArchives + model.get("title");
      }
    },
    archiveOptions: {
      date: function(id) {
        var name = id.replace("/", "-");
        return {
          object_type: types.objectTypes.date(name),
          object_id: id
        };
      },
      category: function(id) {
        var name = id.replace("category/", "");
        return {
          object_type: types.objectTypes.category(name),
          object_id: name
        };
      }
    }
  };

  // Comment route helpers
  var comments = {
    // The names of comment actions
    actions: {
      comment: "comment",
      respond: "respond"
    },

    /**
     * Build comment route parameters
     *
     * Formats standard comment route parameters for creating comment/respond
     * routes. comment/respond routes will both use the same route options.
     *
     * The given route can be in route or href format, if it is already a route
     * it will pass-thru, if it is an href it will be converted to a route.
     *
     * Returns sources and routeParams. Sources are used to create the acutal routes.
     * If you supply an href for the route, then sources will also be in href format.
     */
    buildRouteParams: function(pushState, route, slug, options) {
      var sources = {
        comment: buildRoutePath(pushState, route, comments.actions.comment),
        respond: buildRoutePath(pushState, route, comments.actions.respond)
      };

      function makeRouteParam(href, action) {
        return {
          name: slug+"-"+action,
          route: hrefToRoute(href),
          params: {
            action: action
          },
          options: options
        };
      }

      return {
        sources: sources,
        routeParams: [
          makeRouteParam(sources.comment, comments.actions.comment),
          makeRouteParam(sources.respond, comments.actions.respond)
        ]
      };
    }
  };

  /**
   * Add dynamic routes and optionally prefetch data
   *
   * To prefetch data, the route params must have route options defined.
   */
  function addRoutes(eventAggregator, routes, prefetch) {
    if (prefetch) {
      // start the data download
      eventAggregator.trigger("content:prefetch", _.map(routes, function(route) {
        return route.options;
      }));
    }
    // add the routes
    eventAggregator.trigger("app:router:addRoute", routes);
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
    var path = start.replace(new RegExp(sep+"$"), "");
    var components = Array.prototype.slice.call(arguments, 2);

    _.each(components, function (component) {
      path += sep + encodeURIComponent(component);
    });

    return path;
  }

  // Convert a route to an href
  function routeToHref(route) {
    return route.charAt(0) !== '/' ? "/" + route : route;
  }

  // href to route mapping, handle relative and absolute urls
  // Extract the url path in third catpure.
  // Remove leading and trailing slash.
  // Ref: http://my.safaribooksonline.com/book/programming/regular-expressions/9780596802837/7dot-urls-paths-and-internet-addresses/id3029853#X2ludGVybmFsX0h0bWxWaWV3P3htbGlkPTk3ODA1OTY4MDI4MzclMkZpZDMwMjEzODcmcXVlcnk9
  function hrefToRoute(href) {
    var re = /^([a-z][a-z0-9+\-.]*:(\/\/[^\/?#]+)?)?([a-z0-9\-._~%!$&'()*+,;=:@\/]*)/i;
    var route = href.replace(re, "$3");
    return route.replace(/^\/|\/$/g, "");
  }

  return {
    buildRoutePath: buildRoutePath,
    routeToHref: routeToHref,
    hrefToRoute: hrefToRoute,
    addRoutes: addRoutes,
    comments: comments,
    archives: archives
  };

});