describe("container.content", function() {

  var app = window.__test.app;
  var sandbox, contentRegion;

  beforeEach(function() {
    contentRegion = app.container.layout.content;
    sandbox = sinon.sandbox.create();
  });

  afterEach(function() {
    sandbox.restore();
  });

  describe("contentRegion", function() {
    it("should be able to get the contentRegion instance", function() {
      expect(contentRegion).to.exist;
      expect(contentRegion).to.be.an("object");
    });

    it("should respond to the expected content events", function() {

      var contentStart_stub = sandbox.stub(contentRegion, "contentStart");

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

    it("should throw an error when a bad view type is requested", function() {
      var object_type = "superbad99";

      expect(function() {
        var never = app.request("content:view", object_type);
      }).to.throw(Error);
    });

  });

});