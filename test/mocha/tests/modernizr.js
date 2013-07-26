describe("Modernizr build", function() {

  var $m = window.Modernizr;

  it("should have css boxsizing test", function() {
    expect($m.boxsizing).to.exist;
  });

  it("should have canvas test", function() {
    expect($m.canvas).to.exist;
  });

  it("should have our forms tests", function() {
    expect($m.input).to.exist;
    expect($m.inputtypes).to.exist;
    expect($m.formvalidation).to.exist;
  });

  it("should not have a loader", function() {
    expect($m.yepnope).to.not.exist;
  });

});
