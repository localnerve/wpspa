/*
 * urls.js
 *
 * Simple helper methods to work on urls.
 */
define(function() {

  // Ensure a url root well formed and ok to add on to
  function normalizeUrlRoot(urlRoot) {
    if (urlRoot.charAt(urlRoot.length - 1) !== '/') {
      urlRoot += "/";
    }
    if (!/^https?:\/\//.test(urlRoot)) {
      if (urlRoot.charAt(0) !== '/')
        urlRoot = "/"+urlRoot;
    }
    return urlRoot;
  }

  return {
    normalizeUrlRoot: normalizeUrlRoot
  };

});