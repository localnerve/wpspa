    describe("Environment", function() {

      describe("Globals", function() {

        it("test harness should be loaded with defined modules", function() {
          expect(window.__test).to.exist;
          expect(window.__test.app).to.exist;
        });

        it("test harness should contain our application modules", function() {
          expect(window.__test.app.modules).to.exist;
          expect(window.__test.app.router).to.exist;
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

        it("backbone.layoutmanager should be loaded", function() {
          expect(window.Backbone.Layout).to.exist;
        });

      });

      describe("Document", function() {

        it("should contain an application container", function() {
          expect($("#main").length).to.equal(1);
        });

        it("should contain a canvas container", function() {
          expect($("#canvas-section").length).to.equal(1);
        });
      });

      describe("Selectors", function() {

        it("'image-ctl-inner > img' should exist", function() {
          //expect($(".image-ctl-inner>img").length).to.equal(1);
        });
      });
    });
