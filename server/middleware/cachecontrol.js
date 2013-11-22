/*
 * cachecontrol
 *
 * Special cache control methods
 */

function noCache() {
  return function(req, res, next) {
    res.setHeader("Cache-Control", "no-cache, no-store, max-age=0, must-revalidate");
    res.setHeader("Expires", "0");
    res.setHeader("Pragma", "no-cache");
    next();
  };
}

module.exports = {
  noCache: noCache
};