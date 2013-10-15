/*
 * middleware.js
 * Build the server middleware stack in order
 */

// module dependencies
var rewrite = require("connect-modrewrite");
//var injector = require("connect-injector");

var proxy = require("./proxy");
var notfound = require("./notfound");

function addProxy(stack, options) {
  if (options.proxy) {
    stack.push(proxy(options.proxy.host, options.proxy.port, options.proxy.pattern));
  }
}

/*function addInjector(stack, options) {
  if (options.inject) {
    stack.push(injector(options.inject.condition, options.inject.responder));
  }
}*/

function addCompressor(stack, options) {
  if (options.compress) {
    stack.push(options.compress);
  }
}

function addRewrites(stack, options) {
  if (options.rewrite) {
    stack.push(rewrite(options.rewrite));
  }
}

function addStatic(stack, options) {
  if (options.static) {
    stack.push(options.static);
  }
}

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

  addProxy(stack, options);
//  addInjector(stack, options);
  addCompressor(stack, options);
  addRewrites(stack, options);
  addStatic(stack, options);

  // always add 404 at the end
  stack.push(notfound.four04);

  return stack;
}

module.exports = middleware;