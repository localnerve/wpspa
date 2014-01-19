describe("routes", function() {

  var routes;

  beforeEach(function() {
    routes = __test.standalone.routes;
  });

  it("should be able to get a standalone instance to routes", function() {
    expect(routes).to.exist;
    expect(routes).to.be.an("object");
  });

  it("should convert a simple absolute href to route", function() {
    var route = "simple-route";
    var href = "http://jsonapi.local/"+route;

    var convertedRoute = routes.hrefToRoute(href);

    expect(convertedRoute).to.equal(route);
  });

  it("should convert a multi-path absolute href to route", function() {
    var route = "simple-route/a-subpage";
    var href = "http://jsonapi.local/"+route;

    var convertedRoute = routes.hrefToRoute(href);

    expect(convertedRoute).to.equal(route);
  });

  it("should convert a simple relative href to route", function() {
    var href = "/simple-route/extra";
    var route = href.substring(1);

    var convertedRoute = routes.hrefToRoute(href);

    expect(convertedRoute).to.equal(route);
  });

  it("should convert a route to an href", function() {
    var route = "simple-route/extra";

    var href = routes.routeToHref(route);

    expect(href).to.equal("/"+route);
  });

  it("should convert a home route properly", function() {
    var route = "";

    var href = routes.routeToHref(route);

    expect(href).to.equal("/");
  });

  it("should build a route path for pushState", function() {
    var pushState = true;
    var root = "/start/";
    var path = routes.buildRoutePath(pushState, root, "one", "two");

    expect(path).to.equal(root+"one/two");
  });

  it("should build a route path for hash fragments", function() {
    var pushState = false;
    var root = "/start-";
    var path = routes.buildRoutePath(pushState, root, "one", "two");

    expect(path).to.equal(root.substr(0, root.length-1)+"-one-two");
  });

});