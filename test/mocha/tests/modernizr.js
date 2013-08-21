describe("Modernizr build", function() {

  var $m = window.Modernizr;

  it("should have css boxsizing test", function() {
    expect($m.boxsizing).to.exist;
  });

  it("should not have a loader", function() {
    expect($m.load).to.not.exist;
  });

  it("should have touch test", function() {
    expect($m.touch).to.exist;
  });

  it("should have mq test", function() {
    expect($m.mq).to.exist;
  });
});
