describe("contract", function() {

  var contract;
  beforeEach(function() {
    contract = __test.helpers.contract;
  });

  it("should fail if no options supplied", function() {
    expect(function() {
      contract();
    }).to.throw(Error);
  });

  it("should fail if no contract supplied", function() {
    expect(function() {
      contract({ test: 1 });
    }).to.throw(Error);
  });

  it ("should pass simple expected input", function() {
    var props = ["name", "address", "time", "waste"];

    expect(function() {
      contract(_.object(props, [1,2,3,4]), props);
    }).to.not.throw(Error);
  });

  it("should pass nested expected input", function() {
    var props = ["name", "address", "time", "waste"];
    var options = _.object(props, [1,2,3,4]);
    
    props.push("waste.money");
    options.waste = { money: 5 };

    expect(function() {
      contract(options, props);
    }).to.not.throw(Error);
  });

  it("should pass simple expected input with unexpected properties in options", function() {
    var props = ["name", "address", "time", "waste"];

    expect(function() {
      contract(_.object(props, [1,2,3,4]), _.without(props, "waste"));
    }).to.not.throw(Error);
  });

  it ("should fail simple unexpected input", function() {
    var props = ["name", "address", "time", "waste"];

    expect(function() {
      contract(_.pick(_.object(props, [1,2,3,4]), _.without(props, "waste")), props);
    }).to.throw(Error);
  });

  it("should fail nested unexpected input", function() {
    var props = ["name", "address", "time", "waste"];
    var options = _.object(props, [1,2,3,4]);
    
    props.push("waste.money");
    expect(function() {
      contract(options, props);
    }).to.throw(Error);
  });

  it("should allow named or array contract arguments", function() {
    var props = ["name", "address", "time", "waste"];
    var options = _.object(props, [1,2,3,4]);

    // array
    expect(function() {
      contract(options, props);
    }).to.not.throw(Error);

    // named
    expect(function() {
      contract(options, "name", "address", "time", "waste");
    }).to.not.throw(Error);
  });

});