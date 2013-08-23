/*
 * url rewrites helper
 *
 * A common set of methods to do the rewrites of the application.
 * Invoked in AMD and CommonJS, so UMD notation is used.
 */
(function (factory) {
    if (typeof define === "function" && define.amd) {
      // AMD. Register as an anonymous module.
      define(factory);
    } else if (typeof module !== "undefined") {
      // Node/CommonJS
      module.exports = factory();
    } else {
      throw new Error("Browser globals not supported");
    }
}(function() {

  function prependPage(input) {
    return "page/"+input;
  }

  function appendNotFound(input) {
    return input + ".notfound";
  }

  return {
    page: prependPage,
    notfound: appendNotFound
  };

}));