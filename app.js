/*
 * Front end server
 */

// module dependencies
var express = require("express");
var http = require("http");
var path = require("path");
var rewrite = require("connect-modrewrite");

var rewriteHelper = require("./server/helpers/rewrites");
var proxy = require("./server/middleware/proxy");
var notfound = require("./server/middleware/notfound");

var config = require("./server/config").create(process.env.NODE_ENV);

// create the app
var app = express();

// set the port
app.set("port", config.appPort || process.env.PORT);

// define rewrite rules
var rewriteRules = [
  // if application marked request notfound
  "^" + rewriteHelper.notfound('(.+)', {
    regex: true
  }) + "$ /"+config.four04File+" [NC L]",
  // if request is forbidden
  config.rewriteForbidden,
  // if request is for snapshot, TODO: fix
  '^(.*)\\?_escaped_fragment_=.*$ /snapshots/$1 [NC L]',
  // if a static resource is not being requested, its an in-app route
  '!(\\.(css$|js$|png$|ico$|txt$|xml$|html$|ttf$|eot$|svg$|woff$)) /index.html [NC L]'
];

// requests are processed in this middleware stack order
app.use(
  express.favicon(path.join(config.staticBase, config.faviconFile), { maxAge: config.staticAge })
);
app.use(express.logger(config.loggerFormat));
app.use(express.compress());
app.use(proxy(config.proxy.host, config.proxy.port, config.proxy.pattern));
app.use(rewrite(rewriteRules));
// requests continue after rewrites except redirects, gones, forbiddens, and proxies
app.use(path.join("/", config.scriptsDir),
  express.static(path.resolve(path.join(config.staticBase, config.scriptsDir)), { maxAge: config.staticAge })
);
app.use(path.join("/", config.imagesDir),
  express.static(path.resolve(path.join(config.staticBase, config.imagesDir)), { maxAge: config.staticAge })
);
app.use(express.static(path.resolve(config.staticBase)));
app.use(notfound.four04);

// development only
if ('development' == app.get('env')) {
  app.use(express.errorHandler());
}

http.createServer(app).listen(app.get('port'), function(){
  console.log('Express server listening on port ' + app.get('port'));
});