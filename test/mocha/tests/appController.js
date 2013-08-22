describe("appController", function() {

  var app = window.__test.app;
  var appController = app.request("appController:instance");
  var appRouter = app.request("appRouter:instance");
  var stubs = [];

  afterEach(function() {
    // clean up stubs
    for (var i = 0; i < stubs.length; i++) {
      stubs[i].restore();
    }
    stubs.length = 0;
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
      stubs.push(sinon.stub(__test, "exit", function(path) {
        expect(path).to.be.equal(route);
        done();
      }));

      Backbone.history.loadUrl(route);
    });
  });

  describe("createHandler", function() {

    it("should get called in response to the appController:createHandler event", function() {
      var name = "dummy1",
          object_type = "obbie",
          createHandler_stub = sinon.stub(appController, "createHandler");

      stubs.push(createHandler_stub);

      app.vent.trigger("appController:createHandler", {
        name: name,
        options: { object_type: object_type }
      });

      assert(createHandler_stub.calledOnce, "appController.createHandler should have been called once");
    });

    it("should fail if it doesn't get name, options, and options.object_type", function() {
      expect(function() {
        app.vent.trigger("appController:createHandler", {
        });
      }).to.throw(Error);
      expect(function() {
        app.vent.trigger("appController:createHandler", {
          name: "name"
        });
      }).to.throw(Error);
      expect(function() {
        app.vent.trigger("appController:createHandler", {
          options: {}
        });
      }).to.throw(Error);
      expect(function() {
        app.vent.trigger("appController:createHandler", {
          name: "name",
          options: {}
        });
      }).to.throw(Error);
      expect(function() {
        app.vent.trigger("appController:createHandler", {
          options: { object_type: "blah" }
        });
      }).to.throw(Error);
    });

    it("should create an event handler for the given name", function() {
      var name = "dummy1",
          object_type = "obbie";

      app.vent.trigger("appController:createHandler", {
        name: name,
        options: { object_type: object_type }
      });

      expect(appController[name]).to.exist;
      expect(appController[name]).to.be.a("function");
      delete appController[name];

    });

  });

});
