describe("Environment", function() {

  describe("Globals", function() {

    it("test harness should be loaded with defined app", function() {
      expect(window.__test).to.exist;
      expect(window.__test.app).to.exist;
    });

    it("modernizr should be loaded", function() {
      expect(window.Modernizr).to.exist;
    });

    it("jquery should be loaded", function() {
      expect(window.$).to.exist;
    });

    it("lodash should be loaded", function() {
      expect(window._).to.exist;
    });

    it("backbone should be loaded", function() {
      expect(window.Backbone).to.exist;
    });

    it("backbone.marionette should be loaded", function() {
      expect(window.Backbone.Marionette).to.exist;
    });

  });

  describe("Document", function() {

    it("should contain an application container", function() {
      expect($("#main").length).to.equal(1);
    });

  });

  describe("Selectors", function() {

    // add environmentally significant selectors here, if applicable
  });
});
