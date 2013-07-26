describe("Application", function() {

  var selector = "#dynamic-content";
  var app = window.__test.app;
  var router = window.__test.app.router;

  describe("Router", function() {
    it("router should exist", function() {
      //expect(router).to.exist;
      //expect(router).to.be.an('object');
    });

    it("mainLayout should exist and be an object", function() {
      //expect(router.mainLayout).to.exist;
      //expect(router.mainLayout).to.be.an('object');
    });

    it("should have an index route", function() {
      //expect(router.index).to.be.a('function');
    });

    it("should have a contact route", function() {
      //expect(router.contact).to.be.a('function');
    });

    it("should have a service route", function() {
      //expect(router.service).to.be.a('function');
    });

    it("should have a service event", function() {
      //expect(router._events.service.length).to.equal(1);
    });
  });

});
