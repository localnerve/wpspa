/*
 * code helper
 *
 * A common set of methods to do work on code.
 */
define(function() {

  // get the parameter names from a function
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
