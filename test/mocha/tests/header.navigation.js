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

/*  it("should fire addRoute event when item is added to the collection after initialization", function() {
    var name = "dummy1",
      route = "someroute",
      object_type = "post",
      object_id = "1",
      nav_item = "999999999",
      is_single = false,
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
      object_props: {
        is_single: is_single
      },
      parent: "0"
    });

    var beforeLength = navigationView.collection.length;

    navigationView.collection.add(models);

    assert(addRoute_stub.called, "addRoute should have been called");

    // cleanup the collection
    var foundModels = navigationView.collection.where({
      nav_item: nav_item
    });
    expect(foundModels.length).to.equal(1);
    navigationView.collection.remove(foundModels);
    expect(beforeLength).to.equal(navigationView.collection.length);
  });*/

  it("should respond to expected content events", function() {
    contentStart_stub = sandbox.stub(navigationView, "onContentStart");
    app.vent.trigger("content:start", {
      name: "name",
      route: "",
      options: {
        object_id: "1",
        object_type: "post"
      }
    });
    assert(contentStart_stub.calledOnce, "contentStart should have been called once");
  });
});
