/*
 * http proxy middleware
 * for use with connect/express
 */
var httpProxy = require("http-proxy");

// Make a routing proxy in stealth mode
var proxy = new httpProxy.RoutingProxy({
  changeOrigin: true,
  enable: { xforward: false }
});

// forard api requests to host, port
var apiProxy = function(host, port) {
  return function(req, res, next) {
    if (req.url.match(new RegExp('^\/api\/'))) {
      console.log("routing api to service...");
      proxy.proxyRequest(req, res, {host: host, port: port});
    } else {
      next();
    }
  };
};

module.exports = {
  api: apiProxy
};