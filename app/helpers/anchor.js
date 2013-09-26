define([
  "lodash",
  "jquery",
  "backbone"
], function(_, $, Backbone) {

  // build a url path
  function buildUrlPath(app, start) {
    var sep = app.pushState ? "/" : "-";

    if (start.charAt(start.length - 1) === sep)
      start = start.substr(0, start.length - 1);

    var path = start;
    var components = Array.prototype.slice.call(arguments, 2);
    _.each(components, function (component) {
      path += sep + encodeURIComponent(component);
    });

    return path;
  }

  // ensure a url root is ok to add on to
  function normalizeUrlRoot(urlRoot) {
    if (urlRoot.charAt(urlRoot.length - 1) !== '/') {
      urlRoot += "/";
    }
    if (!/^https?:\/\//.test(urlRoot)) {
      if (urlRoot.charAt(0) !== '/')
        urlRoot = "/"+urlRoot;
    }
    return urlRoot;
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

  // Initialize anchors for the application
  function init(app) {

    // All navigation that is relative should be passed through the navigate
    // method, to be processed by the router. If the link has a `data-bypass`
    // attribute, bypass the delegation completely.
    $(document).on("click", "a[href]:not([data-bypass])", function(evt) {
      // Get the absolute anchor href.
      var href = {
        prop: $(this).prop("href"),
        attr: $(this).attr("href")
      };

      // Get the absolute root.
      var root = location.protocol + "//" + location.host + app.root;

      // If the browser is normalizing, remove the absolute root from the href attr
      // Switch to normalizr instead when if/when it becomes available
      if (!$.support.hrefNormalized)
        href.attr = href.attr.replace(root, "");

      // Ensure the root is part of the anchor href, meaning it's relative.
      if (href.prop.slice(0, root.length) === root) {
        // Stop the default event to ensure the link will not cause a page
        // refresh.
        evt.preventDefault();

        // `Backbone.history.navigate` is sufficient for all Routers and will
        // trigger the correct events. The Router's internal `navigate` method
        // calls this anyways.  The fragment is sliced from the root.
        Backbone.history.navigate(href.attr, true);
      }
    });

  }

  return {
    init: init,
    hrefToRoute: hrefToRoute,
    routeToHref: routeToHref,
    normalizeUrlRoot: normalizeUrlRoot,
    buildUrlPath: buildUrlPath
  };

});
