describe("appRouter", function() {

  var app = window.__test.app;
  var appRouter = app.request("appRouter:instance");
  var appController = app.request("appController:instance");
  var stubs = [];

  afterEach(function() {
    // clean up stubs
    for (var i = 0; i < stubs.length; i++) {
      stubs[i].restore();
    }
    stubs.length = 0;
  });

  it("should exist and be an object", function() {
    expect(appRouter).to.exist;
    expect(appRouter).to.be.an("object");
  });

  it("should be able to get the appController instance", function() {
    expect(appController).to.exist;
    expect(appController).to.be.an("object");
  });

  it("should have an appController properly defined", function() {
    var controller = Backbone.Marionette.getOption(appRouter, "controller");
    expect(controller).to.exist;
    expect(controller).to.be.an("object");
    expect(controller).to.equal(appController);
  });

  it("should have a home route defined and it should trigger an event", function(done) {
    // listen to all events.
    // the home route should trigger an event.
    // we can't assume what the name is, but we know it should happen now.
    app.vent.once("all", function(eventName) {
      expect(eventName).to.satisfy(function(name) {
        // eventName startsWith "content:"
        return (name.toString().indexOf("content:") === 0);
      });
      done();
    });

    // trigger the home route
    for (var name in appRouter.appRoutes) {
      if (appRouter.appRoutes[name] === "") {
        appController[name].call(appController);
        break;
      }
    }
  });

  describe("addRoute", function() {
    it("should fail if it doesn't get route and name", function() {
      expect(function() {
        app.vent.trigger("appRouter:addRoute", {
        });
      }).to.throw(Error);
      expect(function() {
        app.vent.trigger("appRouter:addRoute", {
          route: "route"
        });
      }).to.throw(Error);
      expect(function() {
        app.vent.trigger("appRouter:addRoute", {
          name: "name"
        });
      }).to.throw(Error);
    });

    it("should correctly add a route", function() {
      var route = "dummy1", name = "dummy1",
          createHandler_stub, route_stub;

      stubs.push(createHandler_stub = sinon.stub(appController, "createHandler"));
      stubs.push(route_stub = sinon.stub(Backbone.Router.prototype, "route"));

      appController[name] = function() {};
      app.vent.trigger("appRouter:addRoute", {
        route: route,
        name: name
      });
      delete appController[name];

      expect(appRouter.appRoutes[name]).to.exist;
      expect(appRouter.appRoutes[name]).to.be.a("string");
      delete appRouter.appRoutes[name];

      assert(route_stub.calledOnce, "Backbone.Router.route should have been called once");
      assert(createHandler_stub.calledOnce, "createHandler should have been called once");

    });
  });

});
