describe("Controller", function() {

  var app = window.__test.app;
  var appController, appRouter;
  var sandbox;

  beforeEach(function() {
    appController = app.controller;
    appRouter = app.router;
    sandbox = sinon.sandbox.create();
  });

  afterEach(function() {
    sandbox.restore();
  });

  it("should be able to get the appController instance", function() {
    expect(appController).to.exist;
    expect(appController).to.be.an("object");
  });

  // we already tested this, but this verifies the mechanism
  describe("notfound", function() {

    it("should get invoked by a bad route", function(done) {
      var route = "dummy1";

      expect(appRouter.appRoutes[route]).to.not.exist;

      // routing event handlers are previously bound to context, so we stub the target exit handler
      sandbox.stub(__test, "exit", function(path) {
        expect(path).to.be.equal(route);
        done();
      });

      Backbone.history.loadUrl(route);
    });
  });

  describe("createHandler", function() {

    it("should fail if createHandler event does not get the correct options", function() {
      expect(function() {
        app.controller.createHandler({});
      }).to.
      throw (Error);
      expect(function() {
        app.controller.createHandler({
          name: "name"
        });
      }).to.
      throw (Error);
      expect(function() {
        app.controller.createHandler({
          options: {}
        });
      }).to.
      throw (Error);
      expect(function() {
        app.controller.createHandler({
          options: {
            object_type: "blah"
          }
        });
      }).to.
      throw (Error);
    });

    it("should create an event handler for the given name", function() {
      var name = "dummy1",
        object_type = "obbie";

      app.controller.createHandler({
        name: name,
        options: {
          object_type: object_type
        }
      });

      expect(appController[name]).to.exist;
      expect(appController[name]).to.be.a("function");
      delete appController[name];

    });

  });

});
