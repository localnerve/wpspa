describe("content", function() {

  var app = window.__test.app;
  var content;

  beforeEach(function() {
    content = __test.standalone.content;
  });

  it("should be able to get a standalone instance of content", function() {
    expect(content).to.exist;
    expect(content).to.be.a("object");
  });

  var protocol = "http://";
  var host = "somehost";
  var port = 8080;
  var path = "somepath", path2 = "somepath2";
  var containerStart = "<div>";
  var containerEnd = "</div>";
  var anchorStart = "<a href=";
  var anchorMiddle = "sometext";
  var anchorEnd = "</a>";
  
  var htmlNoTrail = containerStart+anchorStart+"'"+protocol+host+":"+port+"/"+path+"'>"+anchorMiddle+anchorEnd+containerEnd;
  var htmlTrail = containerStart+anchorStart+"'"+protocol+host+":"+port+"/"+path+"/'>"+anchorMiddle+anchorEnd+containerEnd;
  var htmlTrailDQ = containerStart+anchorStart+"\""+protocol+host+":"+port+"/"+path+"\">"+anchorMiddle+anchorEnd+containerEnd;
  var htmlTwoAnchor = containerStart+anchorStart+"'"+protocol+host+":"+port+"/"+path+"'>"+anchorMiddle+anchorEnd+
                        anchorStart+"'"+protocol+host+":"+port+"/"+path2+"'>"+anchorMiddle+anchorEnd+containerEnd;

  describe("alterLinks", function() {

    function simpleHtmlCase(html) {
      var result = content.alterLinks(app.root, html);

      expect(result).to.not.contain(protocol);
      expect(result).to.not.contain(host);
      expect(result).to.not.contain(port);

      expect(result).to.contain(app.root);
      expect(result).to.contain(path);
      expect(result).to.contain(containerStart);
      expect(result).to.contain(containerEnd);
      expect(result).to.contain(anchorStart);
      expect(result).to.contain(anchorMiddle);
      expect(result).to.contain(anchorEnd);

      expect(result.indexOf("/"+path)).to.be.greaterThan(0);

      return result;
    }

    it("should replace http protocol, host, and port with appRoot - simple no trail case", function() {
      simpleHtmlCase(htmlNoTrail);
    });

    it("should replace http protocol, host, and port with appRoot - simple trail case", function() {
      var result = simpleHtmlCase(htmlTrail);
      expect(result.indexOf("/"+path+"/")).to.equal(-1);
    });

    it("should replace http protocol, host, and port with appRoot - simple trail dq case", function() {
      var result = simpleHtmlCase(htmlTrailDQ);
      expect(result.indexOf("/"+path+"/")).to.equal(-1);
    });

    it("should not callback if no match", function() {
      var spy = sinon.spy();
      var input = "badstring";

      var result = content.alterLinks(app.root, input, spy);

      expect(spy.calledOnce).to.be.false;
    });

    it("should pass input through on no match", function() {
      var input = "badstring";

      var result = content.alterLinks(app.root, input);

      expect(result).to.equal(input);
    });

    it("should callback on match with expected args", function() {
      var spy = sinon.spy(function (part, whole) {
        expect(part).to.equal(path);
        expect(whole).to.equal(app.root+path);
      });

      var result = content.alterLinks(app.root, htmlTrail, spy);

      expect(spy.calledOnce).to.be.true;
    });
  });

  describe("alterContent", function() {

    it("should pass through if no callback supplied", function() {
      var input = "input";

      var result = content.alterContent(input, "shouldntmatter");

      expect(result).to.equal(input);
    });

    it("should not call the callback if no match", function() {
      var selector = "dog";
      var spy = sinon.spy();

      var result = content.alterContent(htmlTrail, selector, spy);

      expect(spy.calledOnce).to.be.false;
    });

    it("should call the callback on match", function() {
      var selector = "a[href]";
      var spy = sinon.spy();
      var result = content.alterContent(htmlTrail, selector, spy);

      expect(spy.calledOnce).to.be.true;
    });

    it("should allow the callback to alter content", function() {
      var selector = "a[href]";
      var cat = "cat";
      var spy = sinon.spy(function(el) {
        expect(el).to.be.an("object");
        expect(el.href).to.be.a("string");
        el.href = cat;
      });

      var result = content.alterContent(htmlTrail, selector, spy);

      expect(spy.calledOnce).to.be.true;
      expect(result).to.contain(cat);
    });

    it("should call the callback for each match", function() {
      var selector = "a[href]";
      var spy = sinon.spy();

      var result = content.alterContent(htmlTwoAnchor, selector, spy);

      expect(spy.calledTwice).to.be.true;
    });
  });
});