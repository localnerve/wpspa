describe("anchor", function() {

  var anchor;
  var sandbox;

  beforeEach(function() {
    anchor = __test.standalone.anchor;
    sandbox = sinon.sandbox.create();
  });

  afterEach(function() {
    sandbox.restore();
  });

  it("should be able to get a standalone instance to anchor", function() {
    expect(anchor).to.exist;
    expect(anchor).to.be.an("object");
  });

  it("should convert a simple absolute href to route", function() {
    var route = "simple-route";
    var href = "http://jsonapi.local/"+route;

    var convertedRoute = anchor.hrefToRoute(href);

    expect(convertedRoute).to.equal(route);
  });

  it("should convert a simple relative href to route", function() {
    var href = "/simple-route/extra";
    var route = href.substring(1);

    var convertedRoute = anchor.hrefToRoute(href);

    expect(convertedRoute).to.equal(route);
  });

  it("should convert a route to an href", function() {
    var route = "simple-route/extra";

    var href = anchor.routeToHref(route);

    expect(href).to.equal("/"+route);
  });

  it("should convert a home route properly", function() {
    var route = "";

    var href = anchor.routeToHref(route);

    expect(href).to.equal("/");
  });

  it("should make a relative urlRoot normal", function() {
    var urlRoot = "api/bogus";

    // add both "/"
    var normal = anchor.normalizeUrlRoot(urlRoot);
    expect(normal).to.equal("/"+urlRoot+"/");

    // append "/"
    urlRoot = "/"+urlRoot;
    normal = anchor.normalizeUrlRoot(urlRoot);
    expect(normal).to.equal(urlRoot+"/");

    // pass-thru
    urlRoot = urlRoot + "/";
    normal = anchor.normalizeUrlRoot(urlRoot);
    expect(normal).to.equal(urlRoot);
  });

  it("should make an absoute urlRoot normal", function() {
    var urlRoot = "http://host:9/someroot";

    // append "/"
    var normal = anchor.normalizeUrlRoot(urlRoot);
    expect(normal).to.equal(urlRoot+"/");

    urlRoot = urlRoot.replace("http:", "https:");
    normal = anchor.normalizeUrlRoot(urlRoot);
    expect(normal).to.equal(urlRoot+"/");
  });

  it("should build a url path for pushState", function() {
    var app = { pushState: true };
    var root = "/start/";
    var path = anchor.buildUrlPath(app, root, "one", "two");

    expect(path).to.equal(root+"one/two");
  });

  it("should build a url path for hash fragments", function() {
    var app = { pushState: false };
    var root = "/start-";
    var path = anchor.buildUrlPath(app, root, "one", "two");

    expect(path).to.equal(root.substr(0, root.length-1)+"-one-two");
  });
});
