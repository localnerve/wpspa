describe("Container", function() {

  var app = window.__test.app;
  var sandbox, container;

  beforeEach(function() {
    container = app.container;
    sandbox = sinon.sandbox.create();
  });

  afterEach(function() {
    sandbox.restore();
  });

  it("should be able to get the container instance", function() {
    expect(container).to.exist;
    expect(container).to.be.an("object");
  });

  it("should be able to get the container.layout instance", function() {
    expect(container.layout).to.exist;
    expect(container.layout).to.be.an("object");
  });

  it("should have header in the layout", function() {
    expect(container.layout.header).to.exist;
    expect(container.layout.header).to.be.an("object");
  });

  it("should have footer in the layout", function() {
    expect(container.layout.footer).to.exist;
    expect(container.layout.footer).to.be.an("object");
  });

  it("should have content in the layout", function() {
    expect(container.layout.content).to.exist;
    expect(container.layout.content).to.be.an("object");
  });

  it("should have access to header layout", function() {
    expect(container.header.layout).to.exist;
    expect(container.header.layout).to.be.an("object");
  });

  it("should have access to the footer layout", function() {
    expect(container.footer.layout).to.exist;
    expect(container.footer.layout).to.be.an("object");
  });

  it("should have a reasonable completion event number", function() {
    expect(container.completions).to.be.within(1,10);
  });

  it("should have already started routing after container:complete events", function() {
    expect(Backbone.History.started).to.be.true;
  });

  it("should NOT respond to the container:complete event after loaded", function() {
    var startRouting_stub = sandbox.stub(container, "startRouting");
    app.vent.trigger("container:complete");
    assert(!startRouting_stub.called, "startRouting should not have been called");
  });
});