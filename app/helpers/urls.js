/*
 * urls.js
 *
 * Simple helper methods to work on urls.
 */
define(function() {

  // Ensure a url root is well formed and ok to add on to
  function normalizeUrlRoot(urlRoot) {
    urlRoot = urlRoot.replace(/^\/|\/$/g, "") + "/";
    if (!/^https?:\/\//.test(urlRoot))
      urlRoot = "/"+urlRoot;
    return urlRoot;
  }

  return {
    normalizeUrlRoot: normalizeUrlRoot
  };

});