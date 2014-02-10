describe("prefetch", function() {

  var app = window.__test.app;
  var prefetch;
  var sandbox;

  beforeEach(function() {
    prefetch = __test.standalone.prefetch;
    sandbox = sinon.sandbox.create();
  });

  afterEach(function() {
    sandbox.restore();
  });

  // Factory to create an event aggregator
  function eventAggregator() {
    return _.extend({}, Backbone.Events);
  }

  it("should be able to get a standalone instance to prefetch", function() {
    expect(prefetch).to.exist;
    expect(prefetch).to.be.an("object");
  });

  it("should create itself as expected", function() {
    var promises = prefetch.promises(eventAggregator());

    expect(promises).to.exist;
    expect(promises).to.be.an("object");
  });

  it("should respond to the prefetch event", function() {
    var ea = eventAggregator();

    var prefetch_stub = sandbox.stub(prefetch._create(ea), "_fetch");

    ea.trigger("content:prefetch");

    assert(prefetch_stub.calledOnce, "prefetch should have been called once");
  });

  it("should fail a bad fetch as expected", function(done) {
    var object_type = "page";
    var ea = eventAggregator();
    var progress_fn = sandbox.spy();
    var success_fn = sandbox.spy();
    var modelurl_stub;
    var pf = prefetch._create(ea);

    // intercept the Backbone.sync call and make a bad url, forcing an error.
    var backboneSync = Backbone.sync;
    var sync_stub = sandbox.stub(Backbone, "sync", function(method, model, options) {
      modelurl_stub = sandbox.stub(model, "url", function() {
        return "badurl";
      });
      backboneSync(method, model, options);
    });

    // trigger the prefetch
    var options = {
      object_type: object_type,
      object_id: 1
    };
    ea.trigger("content:prefetch", options);

    assert(modelurl_stub.calledOnce, "model.url should have been called once");
    assert(sync_stub.calledOnce, "Backbone.sync should have been called once");

    pf.promises.get(options)
    .then(
      success_fn,
      function(items) {
        expect(items).to.exist;
        expect(success_fn.callCount).to.equal(0);
        assert(progress_fn.calledOnce, "progress should have been called once");
        // fail was called with items, so we're good:
        done();
      },
      progress_fn
    );
  });

  it("should succeed as expected", function(done) {
    var object_type = "page";
    var ea = eventAggregator();
    var progress_fn = sandbox.spy();
    var fail_fn = sandbox.spy();

    var pf = prefetch._create(ea);
    var options = {
      object_type: object_type,
      object_id: 1
    };
    ea.trigger("content:prefetch", options);

    pf.promises.get(options).then(
      function(collection) {
        expect(collection).to.exist;
        expect(fail_fn.callCount).to.equal(0);
        assert(progress_fn.calledOnce, "progress should have been called once");
        done();
      },
      fail_fn,
      progress_fn
    );
  });

  it("should throw on no item input", function() {
    var ea = eventAggregator();

    // create a pf we don't do anything with
    var pf = prefetch._create(ea);

    expect(function() {
      ea.trigger("content:prefetch" /* nothing */ );
    }).to.
    throw (Error);
  });
});