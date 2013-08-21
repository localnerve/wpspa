describe("appRouter", function() {

  var app = window.__test.app;
  var router = app.request("appRouter:instance");
  var appController = app.request("appController:instance");

  it("should exist and be an object", function() {
    expect(router).to.exist;
    expect(router).to.be.an("object");
  });

  it("should be able to get the appController instance", function() {
    expect(appController).to.exist;
    expect(appController).to.be.an("object");
  });

  it("should have a home route defined and it should trigger an event", function(done) {
    // listen to all events.
    // the home route should trigger an event.
    // we can't assume what the name is, but we know it should happen now.
    app.vent.once("all", function() {
      done();
    });

    // trigger the home route
    for (var name in router.appRoutes) {
      if (router.appRoutes[name] === "") {
        appController[name].call(appController);
        break;
      }
    }
  });

});
