/*
 * code helper
 *
 * A common set of methods to do work on code.
 */
define(function() {

  // get the parameter names from a function
  // BEWARE: this code can cause problems with minification
  // If uglifyjs does not see you reference a parameter, the parameter will be removed from the list
  var STRIP_COMMENTS = /((\/\/.*$)|(\/\*[\s\S]*?\*\/))/mg;
  function getParamNames(func) {
      var fnStr = func.toString().replace(STRIP_COMMENTS, '');
      var result = fnStr.slice(fnStr.indexOf('(')+1, fnStr.indexOf(')')).match(/([^\s,]+)/g);
      if (result === null) {
          result = [];
      }
      return result;
  }

  return {
    getParamNames: getParamNames
  };
});
