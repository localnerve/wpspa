describe("Application", function() {

  var app = window.__test.app;

  it("main region should exist and be an object", function() {
    expect(app.main).to.exist;
    expect(app.main).to.be.an("object");
  });

  it("root property should be defined and be a string", function() {
    expect(app.root).to.exist;
    expect(app.root).to.be.a("string");
  });

  it("should be able to get the appLayout instance", function() {
    var appLayout = app.request("appLayout:instance");
    expect(appLayout).to.exist;
    expect(appLayout).to.be.an("object");
  });

});
