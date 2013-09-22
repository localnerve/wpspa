describe("sync", function() {

  var sync;
  var sandbox;

  beforeEach(function() {
    sync = __test.standalone.sync;
    sandbox = sinon.sandbox.create();
  });

  afterEach(function() {
    sandbox.restore();
  });

  it("should be able to get a standalone instance to sync", function() {
    expect(sync).to.exist;
    expect(sync).to.be.a("function");
  });

  it("should call Backbone sync if missing bootstrap", function() {
    var bootstrap;
    var sync_stub = sandbox.stub(Backbone, "sync");
    var syncMethod = sync(bootstrap);
    syncMethod();

    assert(sync_stub.calledOnce, "Backbone.sync should have been called once.");
  });

  it("should call Backbone sync if missing success callback", function() {
    var bootstrap = window.wpspa.navigation;
    expect(bootstrap).to.exist;
    expect(bootstrap).to.be.an("object");

    var sync_stub = sandbox.stub(Backbone, "sync");
    var syncMethod = sync(bootstrap);
    syncMethod("read", null, null);
    
    assert(sync_stub.calledOnce, "Backbone.sync should have been called once.");
  });

  it("should give Backbone sync the correct arguments when called", function() {
    var bootstrap;
    var successTest = "yep", methodTest = "read";
    var Collection = Backbone.Collection.extend({});
    var collection = new Collection();

    var sync_stub = sandbox.stub(Backbone, "sync", function(method, model, options) {
      expect(method).to.equal(methodTest);
      expect(model).to.deep.equal(collection);
      expect(options.success()).to.equal(successTest);
    });
    var syncMethod = sync(bootstrap);

    function success() {
      return successTest;
    }

    syncMethod(methodTest, collection, { success: success });
    
    assert(sync_stub.calledOnce, "Backbone.sync should have been called once.");
  });

  it("should call options success when bootstrap and success callback supplied", function() {
    var bootstrap = window.wpspa.navigation;
    var Collection = Backbone.Collection.extend({});
    var collection = new Collection();
    
    expect(bootstrap).to.exist;
    expect(bootstrap).to.be.an("object");

    var sync_stub = sandbox.stub(Backbone, "sync");
    var syncMethod = sync(bootstrap);
    
    var success_spy = sandbox.spy(function(b) {
      expect(b).to.deep.equal(bootstrap);
    });

    syncMethod("read", collection, { success: success_spy });

    assert(success_spy.calledOnce, "success should have been called once.");
    assert(!sync_stub.called, "Backbone.sync should NOT have been called.");
  });

  it("should execute a valid promise and call success when bootstrap and success callback supplied", function() {
    var bootstrap = window.wpspa.navigation;
    
    expect(bootstrap).to.exist;
    expect(bootstrap).to.be.an("object");

    var sync_stub = sandbox.stub(Backbone, "sync");
    var syncMethod = sync(bootstrap);
    
    var success_spy = sandbox.spy();
    var done_spy = sandbox.spy();

    syncMethod("read", null, { success: success_spy }).done(done_spy);

    assert(done_spy.calledOnce, "done should have been called once.");
    assert(success_spy.calledOnce, "success should have been called once.");
    assert(!sync_stub.called, "Backbone.sync should NOT have been called.");
  });
});
