/*
 * cachecontrol
 *
 * Special cache control methods
 */

// absolutely no caching allowed ever
function noCache() {
  return function(req, res, next) {
    res.setHeader("Cache-Control", "no-cache, no-store, max-age=0, must-revalidate");
    res.setHeader("Expires", "0");
    res.setHeader("Pragma", "no-cache");
    next();
  };
}

// discourage caching, but allow storage so we still allow conditional gets
function allow304() {
  return function(req, res, next) {
    res.setHeader("Cache-Control", "no-cache, max-age=0, must-revalidate");
    next();
  };
}

module.exports = {
  noCache: noCache,
  allow304: allow304
};