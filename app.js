/*
 * Front end server
 */

// module dependencies
var express = require("express");
var http = require("http");
var path = require("path");
var rewrite = require("connect-modrewrite");
var cons = require("consolidate");

var rewriteHelper = require("./server/helpers/rewrites");
var proxy = require("./server/middleware/proxy");
var notfound = require("./server/middleware/notfound");
var cacheControl = require("./server/middleware/cachecontrol");
var snapshots = require("./server/middleware/snapshots");
var routes = require("./server/routes");

var config = require("./server/config").create(process.env.NODE_ENV);

// create the app
var app = express();

// define rewrite rules
var rewriteRules = [
  // if application marked request notfound
  '^' + rewriteHelper.notfound('(.+)', {
    regex: true
  }) + '$ /'+config.four04File+' [NC L]',
  // if request is forbidden
  config.rewriteForbidden,
  // if a static resource is not being requested, its an in-app route
  '!(\\.(css$|js$|png$|ico$|txt$|xml$|html$|ttf$|eot$|svg$|woff$)) /index.html [NC L]'
];

// setup server-side templating
app.engine('.html', cons.underscore);
app.set('views', __dirname);
app.set('view engine', 'html');

// set the port
app.set('port', config.app.port || process.env.PORT);

// requests are processed in this middleware stack order
app.use(
  express.favicon(path.join(config.staticBase, config.faviconFile), { maxAge: config.staticAge })
);
app.use(express.logger(config.loggerFormat));
app.use(express.compress());
app.use(proxy(config.proxy.hostname, config.proxy.port, config.proxy.pattern));
app.use(snapshots.htmlSnapshot);

app.use(rewrite(rewriteRules));
// requests continue after rewrites except redirects, gones, forbiddens, and proxies

// Special resource GETs
app.get("/index.html", routes.main);
app.get("/sitemap.xml", routes.sitemap);
app.get("/robots.txt", routes.robots);

app.use(path.join('/', config.scriptsDir),
  express.static(path.resolve(path.join(config.staticBase, config.scriptsDir)), { maxAge: config.staticAge })
);
app.use(path.join('/', config.imagesDir),
  express.static(path.resolve(path.join(config.staticBase, config.imagesDir)), { maxAge: config.staticAge })
);
// what's left are all the no-cache statics
app.use(cacheControl.allow304());
app.use(express.static(path.resolve(config.staticBase)));

app.use(notfound.four04);

// development only
// TODO: replace with express-error-handler for all envs
if ('development' == app.get('env')) {
  app.use(express.errorHandler());
}

http.createServer(app).listen(app.get('port'), function(){
  console.log('Express server listening on port ' + app.get('port'));
});