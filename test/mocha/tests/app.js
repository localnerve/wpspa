describe("Application", function() {

  var app = window.__test.app;

  it("should have a main region as an object", function() {
    expect(app.main).to.exist;
    expect(app.main).to.be.an("object");
  });

  it("should have a root as a string", function() {
    expect(app.root).to.exist;
    expect(app.root).to.be.a("string");
  });

  it("should be able to get the main layout instance", function() {
    var appLayout = app.wpspa.layout;
    expect(appLayout).to.exist;
    expect(appLayout).to.be.an("object");
  });

});
