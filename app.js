/*
 * Front end server
 * 
 * Features a configurable middleware stack used in any environment
 */

// module dependencies
var express = require("express");
var http = require("http");
var path = require("path");
var rewrite = require("connect-modrewrite");

var rewriteHelper = require("./server/helpers/rewrites");
var proxy = require("./server/middleware/proxy");
var notfound = require("./server/middleware/notfound");
var Config = require("./server/config");

// create the app
var app = express();

// environment specific configuration
var config = new Config(process.env.NODE_ENV);

// set the port
app.set("port", config.appPort || process.env.PORT);

// define rewrite rules
var rewriteRules = [
  // if application marked request notfound, exit here
  "^" + rewriteHelper.notfound('(.+)', {
    regex: true
  }) + "$ /"+config.four04File+" [NC L]",
  // if request is forbidden
  config.rewriteForbidden,
  // if request is for snapshot, TODO: fix
  '^(.*)\\?_escaped_fragment_=.*$ /snapshots/$1 [NC L]',
  // if a static resource is not being requested, its an in-app route
  '!(\\.(css$|js$|png$|ico$|txt$|xml$|html$)) /index.html [NC L]'
];

// build the middleware stack in order
app.use(express.favicon());
app.use(express.logger(config.loggerFormat));
app.use(express.compress());
app.use(proxy(config.proxy.host, config.proxy.port, config.proxy.pattern));
app.use(rewrite(rewriteRules));
app.use(express.static(path.resolve(config.staticBase)));

// development only
if ('development' == app.get('env')) {
  app.use(express.errorHandler());
}

http.createServer(app).listen(app.get('port'), function(){
  console.log('Express server listening on port ' + app.get('port'));
});