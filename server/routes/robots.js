/**
 * robots.txt route
 *
 * Handles robots.txt requests.
 * Serves a dynamic robots.txt based on app routes in Redis.
 * Remember, anything below 1024 will not be compressed by default.
 */
var path = require("path");
var fs = require("fs");
var urlm = require("url");

var redis = require("../helpers/redis");
var configLib = require("../config");

var config = configLib.create(process.env.NODE_ENV);

function robots(req, res, next) {
  
  function allowUrls(appRoutes, data) {
    if (!appRoutes) {
      next("robots could not retrieve appRoutes from Redis");
    } else {
      var replacement = appRoutes.split(",").map(function(appRoute) {
        return "Allow: "+appRoute;
      }).join("\n");
      data = data.replace(/(ALLOWURLS)/i, replacement);
      res.header("Content-Type", "text/plain");
      res.send(data);
    }
  }

  // read the robots.txt template and fill it in
  fs.readFile(path.join(__dirname, "/../../", config.robotsFile), { encoding: "utf8" }, function(err, data) {
    if (err) {
      next(err);
    } else {
      data = data.replace(/(SITEMAPURL)/i, function() {
        return urlm.format({
          protocol: "http",
          hostname: config.app.hostname,
          port: config.app.port || 80,
          pathname: "/sitemap.xml"
        });
      });
      var redisClient = redis.client();
      redisClient.get(config.keys.routes, function(err, appRoutes) {
        if (err) {
          next(err);
        } else {
          allowUrls(appRoutes, data);
        }
        redisClient.quit();
      });
    }
  });
}

module.exports = robots;