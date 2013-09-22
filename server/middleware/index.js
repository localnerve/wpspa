/*
 * middleware.js
 * Build the server middleware stack in order
 */

// module dependencies
var rewrite = require("connect-modrewrite");
var injector = require("connect-injector");

var proxy = require("./proxy");
var notfound = require("./notfound");

/*
 * Build the middleware stack
 * This controls the order of the middleware stack
 *
 * options:
 *   compress - The response compressor
 *   proxy - { host, port, pattern } A proxy to addd
 *   inject - The condition and responder to inject content
 *   rewrites - An array of connect-modrewrite rules
 *   static - A reference to the static responder (connect | express) 
 */
function middleware(options) {
  options = options || {};
  var stack = [];

  // add a proxy
  if (options.proxy) {
    stack.push(proxy(options.proxy.host, options.proxy.port, options.proxy.pattern));
  }

  // add response injector
  if (options.inject) {
    stack.push(injector(options.inject.condition, options.inject.responder));
  }

  // add compressor
  if (options.compress) {
    stack.push(options.compress);
  }

  // add rewrite rules
  if (options.rewrite) {
    stack.push(rewrite(options.rewrite));
  }

  // add static files
  if (options.static) {
    stack.push(options.static);
  }

  // add 404
  stack.push(notfound.four04);

  return stack;
}

module.exports = middleware;