describe("urls", function() {

  var urls;

  beforeEach(function() {
    urls = __test.standalone.urls;
  });

  it("should be able to get a standalone instance to anchor", function() {
    expect(urls).to.exist;
    expect(urls).to.be.an("object");
  });

  it("should make a relative urlRoot normal", function() {
    var urlRoot = "api/bogus";

    // add both "/"
    var normal = urls.normalizeUrlRoot(urlRoot);
    expect(normal).to.equal("/"+urlRoot+"/");

    // append "/"
    urlRoot = "/"+urlRoot;
    normal = urls.normalizeUrlRoot(urlRoot);
    expect(normal).to.equal(urlRoot+"/");

    // pass-thru
    urlRoot = urlRoot + "/";
    normal = urls.normalizeUrlRoot(urlRoot);
    expect(normal).to.equal(urlRoot);
  });

  it("should make an absoute urlRoot normal", function() {
    var urlRoot = "http://host:9/someroot";

    // append "/"
    var normal = urls.normalizeUrlRoot(urlRoot);
    expect(normal).to.equal(urlRoot+"/");

    urlRoot = urlRoot.replace("http:", "https:");
    normal = urls.normalizeUrlRoot(urlRoot);
    expect(normal).to.equal(urlRoot+"/");
  });

});