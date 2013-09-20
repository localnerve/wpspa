/*
 * http proxy middleware
 * for use with connect/express
 */
var httpProxy = require("http-proxy");

// Make a routing proxy in stealth mode
var routingProxy = new httpProxy.RoutingProxy({
  changeOrigin: true,
  enable: { xforward: false }
});

// forard requests to host, port that match pattern
function proxy(host, port, pattern) {
  return function(req, res, next) {
    if (req.url.match(new RegExp(pattern))) {
      routingProxy.proxyRequest(req, res, {host: host, port: port});
    } else {
      next();
    }
  };
}

module.exports = proxy;