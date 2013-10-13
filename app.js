/*
 * Front end server
 * 
 * Features a configurable middleware stack used in any environment
 */

// module dependencies
var express = require("express");
var http = require("http");
var path = require("path");

var middleware = require("./server/middleware");
var inject = require("./server/middleware/inject");
var Config = require("./server/config");
var rewriteHelper = require("./server/helpers/rewrites");

// create the app
var app = express();

// environment specific configuration
var config = new Config(process.env.NODE_ENV);

// set the port
app.set("port", config.appPort || process.env.PORT);

// build middleware stack
var stack = middleware({
  proxy: config.proxy,
  inject: {
    condition: inject.condition,
    responder: inject.responder
  },
  compress: express.compress({
    filter: function(req, res) {
      return config.compressExpression.test(res.getHeader('Content-Type'));
    }
  }),
  rewrite: [
    // if application marked notfound, exit here
    "^" + rewriteHelper.notfound('(.+)', {
      regex: true
    }) + "$ /"+config.four04File+" [NC L]",
    // if request is forbidden
    config.rewriteForbidden,
    // if request is for snapshot, TODO: fix
    '^(.*)\\?_escaped_fragment_=.*$ /snapshots/$1 [NC L]',
    // if a static resource is not being requested, its an in-app route
    '!(\\.(css$|js$|png$|ico$|txt$|xml$|html$)) /index.html [NC L]'
  ],
  static: express.static(path.resolve(config.staticBase))
});

// assign the middleware stack to the application
app.use(express.favicon());
app.use(express.logger("dev"));
for (var i = 0; i < stack.length; i++) {
  app.use(stack[i]);
}

// development only
if ('development' == app.get('env')) {
  app.use(express.errorHandler());
}

http.createServer(app).listen(app.get('port'), function(){
  console.log('Express server listening on port ' + app.get('port'));
});