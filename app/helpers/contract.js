/*
 * contract
 * Enforces a contract of expected input
 * If the contract is broken, throws an error
 * Usage:
 *  contract(options, "prop", "prop.etc")
 *    Here, options has have options.prop and options.prop.etc defined
 * Supports arrays also:
 *  contract(options, ["prop", "prop.etc"])
 */
define(function() {

  // Handle failures
  function contractFailure(property) {
    throw new Error(
      "Property '" + property + "' was not supplied as expected."
    );
  }

  // Examine one contract spec, "prop.etc"
  function examineContract(options, contract) {
    var props = contract.split(".");
    var topObj = options;

    for (var j = 0; j < props.length; j++) {
      if (typeof topObj[props[j]] === "undefined") {
        contractFailure(contract);
      } else {
        topObj = topObj[props[j]];
      }
    }
  }

  // Make sure that the given arguments are found and defined in options
  function enforceContract(options) {

    // get the arguments after options as an array (or preserve if they are already an array)
    var contract = Array.prototype.concat.apply(Array.prototype, Array.prototype.slice.call(arguments, 1));

    if (!options)
      throw new Error("No options container was supplied");
    if (contract.length === 0)
      throw new Error("No contract specified");

    // go through the contract looking for undefined args in the options
    for (var i = 0; i < contract.length; i++) {
      examineContract(options, contract[i]);
    }

  }

  return enforceContract;
});
