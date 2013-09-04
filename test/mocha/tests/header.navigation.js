describe("Navigation", function() {

  var app = __test.app;
  var navigationView;
  var sandbox;

  beforeEach(function() {
    navigationView = app.container.header.navigation;
    sandbox = sinon.sandbox.create();
  });

  afterEach(function() {
    sandbox.restore();
  });

  it("should be able to get a navigation instance", function() {
    expect(navigationView).to.exist;
    expect(navigationView).to.be.an("object");
  });

  it("should have a valid collection", function() {
    expect(navigationView.collection).to.exist;
    expect(navigationView.collection).to.be.an("object");
    expect(navigationView.collection.length).to.be.at.least(1);
  });

  it("should fire addRoute event when item is added to the collection", function(done) {
    var name = "dummy1",
      route = "someroute",
      object_type = "post",
      object_id = "1",
      nav_item = "999999999",
      addRoute_stub;

    // stub the appRouter.addRoute so that we don't have to clean up.
    var appRouter = app.router;
    addRoute_stub = sandbox.stub(appRouter, "addRoute");

    var models = [];
    models.push({
      name: name,
      route: route,
      nav_item: nav_item,
      object_type: object_type,
      object_id: object_id,
      parent: "0"
    });

    var beforeLength = navigationView.collection.length;

    app.vent.once("wpspa:router:addRoute", function(options) {
      // inspect the event arguments
      expect(options.name).to.equal(name);
      expect(options.route).to.equal(route);
      expect(options.options.object_type).to.equal(object_type);
      expect(options.options.object_id).to.equal(object_id);

      assert(addRoute_stub.calledOnce, "addRoute should have been called once");

      // cleanup the collection
      var models = navigationView.collection.where({
        nav_item: nav_item
      });
      expect(models.length).to.equal(1);
      navigationView.collection.remove(models);
      expect(beforeLength).to.equal(navigationView.collection.length);

      done();
    });

    navigationView.collection.add(models);
  });
});
