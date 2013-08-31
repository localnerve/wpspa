describe("Content", function() {
  
  var app = window.__test.app;
  var sandbox, contentRegion;

  beforeEach(function() {
    contentRegion = app.wpspa.layout.content;
    sandbox = sinon.sandbox.create();
  });

  afterEach(function() {
    sandbox.restore();
  });

  it("should be able to get the contentRegion instance", function() {
    expect(contentRegion).to.exist;
    expect(contentRegion).to.be.an("object");
  });

  it("should respond to the expected content events", function() {

    var contentStart_stub = sandbox.stub(contentRegion, "contentStart");

    app.vent.trigger("content:start");
    assert(contentStart_stub.calledOnce, "contentStart should have been called once");
  });

  describe("prefetch", function() {

    var prefetch;

    beforeEach(function() {
      prefetch = window.__test.modules.prefetch;
    });

    // factory to create an event aggregator
    function eventAggregator() {
      return _.extend({}, Backbone.Events);
    }

    it("should be able to get a standalone instance to prefetch", function() {
      expect(prefetch).to.exist;
      expect(prefetch).to.be.an("object");
    });

    it("should create itself as expected", function() {
      var promise = prefetch.promise(eventAggregator());

      expect(promise).to.exist;
      expect(promise.then).to.exist;
      expect(promise.then).to.be.a("function");
    });

    it("should respond to the prefetch event", function() {
      var ea = eventAggregator();

      var prefetch_stub = sandbox.stub(prefetch._create(ea), "_fetch");

      ea.trigger("content:prefetch");

      assert(prefetch_stub.calledOnce, "prefetch should have been called once");
    });

    it("should fail a bad fetch as expected", function(done) {
      var ea = eventAggregator();
      var progress_fn = sandbox.spy();
      var success_fn = sandbox.spy();

      prefetch.promise(ea).then(
        success_fn,
        function(response, options) {
          expect(response).to.exist;
          expect(options).to.exist;
          expect(success_fn.callCount).to.equal(0);
          assert(progress_fn.calledOnce, "progress should have been called once");
          done();
        },
        progress_fn
      );

      // intercept the Backbone.sync call and make a bad url, forcing an error.
      var backboneSync = Backbone.sync;
      var sync_stub = sandbox.stub(Backbone, "sync", function(method, model, options) {
        model.url = "badurl";
        backboneSync(method, model, options);
      });      

      // start the prefetch
      ea.trigger("content:prefetch", { items: [1,2,3] });

      assert(sync_stub.calledOnce, "Backbone.sync should have been called once");
    });

    it("should succeed as expected", function(done) {
      var ea = eventAggregator();
      var progress_fn = sandbox.spy();
      var fail_fn = sandbox.spy();

      prefetch.promise(ea).then(
        function(collection) {
          expect(collection).to.exist;
          expect(fail_fn.callCount).to.equal(0);
          assert(progress_fn.calledOnce, "progress should have been called once");
          done();
        },
        fail_fn,
        progress_fn
      );

      ea.trigger("content:prefetch", { items: [1,2,3] });
    });

    it("should throw on no item input", function() {
      var ea = eventAggregator();

      // create a promise we don't do anything with
      var promise = prefetch.promise(ea);

      expect(function() {
        ea.trigger("content:prefetch" /* nothing */ );
      }).to.throw(Error);
    });
  });

});