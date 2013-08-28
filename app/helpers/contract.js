define(function() {

  /**
   * Makes sure that the given arguments are found and defined in options
   */
  function enforceContract(options) {

    // get the arguments after options as an array (or preserve if they are already an array)
    var contract = Array.prototype.concat.apply(Array.prototype, Array.prototype.slice.call(arguments, 1));

    if (!options)
      throw new Error("No options container was supplied");
    if (contract.length === 0)
      throw new Error("No contract specified");

    // loop through the supplied contract
    for (var i=0; i < contract.length; i++) {
      // each contract spec can have "." props
      var props = contract[i].split(".");
      // start each contract spec at the top
      var topObj = options;
      // go through the properties
      for (var j=0; j < props.length; j++) {
        if (typeof topObj[ props[j] ] === "undefined") {
          throw new Error (
            "Property '"+contract[i]+"' was not supplied in options"+
              (enforceContract.caller ? " to "+enforceContract.caller+"." : ".")
          );
        }
        else {
          // replace the topObj with next level down
          topObj = topObj[ props[j] ];
        }
      }
    }

  }

  return enforceContract;
});