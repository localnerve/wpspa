/**
 * sitemap.xml route
 *
 * Handle sitemap requests
 */
var smLib = require("sitemap");
var urlm = require("url");
var redis = require("../helpers/redis");
var configLib = require("../config");

var config = configLib.create(process.env.NODE_ENV || "development");

var sm = smLib.createSitemap({
  hostname: urlm.format({
          protocol: "http",
          hostname: config.app.hostname,
          port: config.app.port || 80
        }),
  cacheTime: 0
});


// Policies to determine change frequency and priority
function sitemapPolicy(route) {
  var components = route.split("/");
  var term = components[1];

  function primaryPolicy(term) {
    return term ? null : {
      changeFreq: "daily",
      priority: 1.0
    };
  }

  function secondaryPolicy(term) {
    return term === "category" || !isNaN(parseInt(term, 10)) ? {
      changeFreq: "monthly",
      priority: 0.5
    } : null;
  }

  function defaultPolicy(term) {
    return {
      changeFreq: "weekly",
      priority: 0.7
    };
  }

  return primaryPolicy(term) || secondaryPolicy(term) || defaultPolicy(term);
}

// Serve the dynamic sitemap
function sitemap(req, res, next) {
  var redisClient = redis.client();
  redisClient.get(config.keys.routes, function(err, appRoutes) {
    if (err) {
      next(err);
    } else {
      if (!appRoutes) {
        next("sitemap could not retieve appRoutes from Redis");
      } else {
        sm.urls = appRoutes.split(",").map(function(appRoute) {
          var policy = sitemapPolicy(appRoute);
          return {
            url: appRoute,
            changefreq: policy.changeFreq,
            priority: policy.priority
          };
        });
        sm.toXML(function(xml) {
          res.header("Content-Type", "text/xml");
          res.send(xml);
        });
      }
    }
    redisClient.quit();
  });
}

module.exports = sitemap;