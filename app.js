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
// TODO: this needs to be refactored:
var rewriteHelper = require("./app/helpers/rewrites");

// create the app
var app = express();

// environment specific configuration
var config = new Config(process.env.NODE_ENV);

//console.log("NODE_ENV: "+process.env.NODE_ENV);

// set the port
app.set("port", config.appPort || process.env.PORT);

// build middleware stack
var stack = middleware({
  proxy: config.proxy,
  inject: {
    condition: inject.condition,
    responder: inject.responder
  },
  //compress: express.compress(),
  rewrite: [
    // if application marked notfound, exit here
    "^" + rewriteHelper.notfound('(.+)', {
      regex: true
    }) + "$ /404.html [NC L]",
    // if request is forbidden
    '^/(server|node_modules|app.js$|package.json$) [F NC L]',
    // if request is for snapshot
    '^(.*)\\?_escaped_fragment_=.*$ /snapshots/$1 [NC L]',
    // if a static resource is not being requested, its an in-app route
    '!(\\.(css$|js$|png$|ico$|txt$|xml$|html$)) /index.html [NC L]'
  ],
  //
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