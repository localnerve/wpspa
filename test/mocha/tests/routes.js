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

  it("should convert a home href to route properly", function() {
    var href = "/";
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

  describe("comments", function() {

    it("should expose comment and respond actions", function() {
     expect(routes.comments.actions.comment).to.be.a("string");
     expect(routes.comments.actions.respond).to.be.a("string");
    });

    describe("buildRouteParams", function() {
      
      it("should return expected sources and routes", function() {
        var href = "http://jsonapi.local/some/path";
        var slug = "yep";
        var options = {
          one: 1,
          two: 2
        };
        
        var result = routes.comments.buildRouteParams(true, href, slug, options);

        expect(result.sources).to.be.an("object");
        expect(_.keys(result.sources).length).to.equal(2);
        expect(result.sources.comment).to.be.a("string");
        expect(result.sources.respond).to.be.a("string");
        expect(result.routeParams).to.be.an("array");
        expect(result.routeParams.length).to.equal(2);
      });

      it("should preserve options in new route params", function() {
        var href = "http://jsonapi.local/some/path";
        var slug = "yep";
        var options = {
          one: 1,
          two: 2
        };
        
        var result = routes.comments.buildRouteParams(true, href, slug, options);

        expect(result.routeParams[0].options).to.be.an("object");
        expect(result.routeParams[1].options).to.be.an("object");
        expect(result.routeParams[0].options).to.deep.equal(result.routeParams[1].options);
        expect(result.routeParams[0].options).to.deep.equal(options);
      });

      it("should preserve href in sources", function() {
        var href = "http://jsonapi.local/some/path";
        var slug = "yep";
        var options = {
          one: 1,
          two: 2
        };
        
        var result = routes.comments.buildRouteParams(true, href, slug, options);

        expect(result.sources.comment).to.contain(href);
        expect(result.sources.respond).to.contain(href);
      });
      
    });
  });
});