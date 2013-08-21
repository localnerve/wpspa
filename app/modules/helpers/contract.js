define(function() {

  /**
   * Makes sure that the given arguments are found and defined in options
   */
  function enforceContract(options) {
    var contract = Array.prototype.slice.call(arguments, 1);

    if (!options)
      throw new Error("No options container was supplied");
    if (contract.length === 0)
      throw new Error("No contract specified");

    for (var i=0; i < contract.length; i++) {
      if (typeof options[contract[i]] == "undefined")
        throw new Error ("Property '"+contract[i]+"' was not supplied in options.");
    }
  }

  return enforceContract;
});