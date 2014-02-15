/**
 * Route Processing for navigation items
 */
define([
  "lodash",
  "helpers/routes",
  "app"
], function(_, routes, app) {

  // Make route parameters for the navigation collection
  function routeParamsCollection(model) {
    var routeOptions = routes.makeRouteOptions(
      model.get("object_type"), model.get("object_id")
    );
    var routeParams = routes.makeRouteParam(
      model.get("name"), model.get("route"), routeOptions
    );
    var props = model.get("object_props");
    if (props.is_single) {
      // always add non-prefetch comment/respond routes for singles
      routes.addRoutes(app.vent, routes.comments.buildRouteParams(
        app.pushState, routeParams.route, routeParams.name, routeOptions
      ).routeParams);
    }
    routeParams.prefetch = props.prefetch;
    return routeParams;
  }
  
  // Make route parameters for object_links for a navigation target
  function routeParamsObjectLinks(link) {
    var routeOptions = routes.makeRouteOptions(link.type, link.id);
    var routeParams = routes.makeRouteParam(link.name, link.href, routeOptions);
    if (link.is_single) {
      // always add non-prefetch comment/respond routes for singles
      routes.addRoutes(app.vent, routes.comments.buildRouteParams(
        app.pushState, link.href, link.name, routeOptions
      ).routeParams);
    }
    routeParams.prefetch = link.prefetch;
    return routeParams;
  }

  /**
   * Add the routes retrieved for navigation.
   *
   * Maps the collection to an array of route params that includes each item's
   * object_links. The resulting array of arrays is flattened to one dimension
   * and made unique by route. The resulting route params are then grouped by
   * their prefetch policy: { true:[{routeParam, ...}], false: [{routeParam, ...}] }
   *
   * Finally, the true and false prefetch route params are added to the dynamic
   * application router.
   */
  function addRoutes(collection) {
    // Combine unique routeParams for navigation and deep links
    // Divide into prefetch policies, { true:[], false: [] }
    var routeParams = _.groupBy(
      _.uniq(
        _.flatten(
          collection.map(function(model) {
            return [routeParamsCollection(model)].concat(_.map(
              model.get("object_links"), routeParamsObjectLinks
            ));
          })
        ), false, function(routeParam) {
          return routeParam.route; // unique by route, fcfs
      }), function(routeParam) {
        return routeParam.prefetch; // group by prefetch preference
    });

    // Add the prefetch and non-prefetch routes
    _.each(routeParams, function(_routeParams, prefetchFlag) {
      routes.addRoutes(app.vent, _routeParams, prefetchFlag);
    });
  }

  return {
    addRoutes: addRoutes
  };
});