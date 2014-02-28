/**
 * The html snapshots worker process.

 * This takes the html snapshots and updates redis.
 *
 * process.env.NODE_ENV must be defined
 * phantomjs executable must exist in the path
 *
 * Depends on the routes worker process being run successfully beforehand.
 */
var path = require("path");
var fs = require("fs");
var urlLib = require("url");
var _ = require("underscore");
var htmlSnapshots = require('html-snapshots');

var configLib = require("../../../config");
var redis = require("../../../helpers/redis");

// Get the configuration
var config = configLib.create();

// Get the normalized path to the app root
var appRoot = path.join(__dirname, "../../../../");

// Get an appropriate, connected redis client
var redisClient = redis.client();

function quitRedis() {
  redisClient.quit();
}

// Actions to perform on error
function errorAction(message, callback) {
  console.error(message);
  // TODO: add SENDGRID or other email notification here
  if (callback) callback();
}

function processSnapshots(completedSnapshots) {
  // Make a reducer to form the hash property names
  // Removes the appRoot and snapshotsDir from the path so the name
  //   to lookup is just the request url.
  var reducer = path.join(appRoot, config.workers.htmlSnapshots.snapshotsDir);

  // Make the snapshots hash
  // The name is the app-relative path: "/snapshots/index.html"
  // The value is the html snapshot contents
  var hash = {};
  for (var i = 0; i < completedSnapshots.length; i++) {
    hash[completedSnapshots[i].replace(reducer, "")] =
      fs.readFileSync(completedSnapshots[i], { encoding: "utf8" });
  }

  // Update Redis
  redisClient.hmset(config.keys.htmlSnapshots, hash, function(err, res) {
    if (err) {
      errorAction("Failed to update "+config.keys.htmlSnapshots+" in Redis");
    } else {
      console.log("Successfully updated "+config.keys.htmlSnapshots+" in Redis");
    }
    quitRedis();
  });
}

function takeSnapshots(appRoutes) {
  // Convert the app routes into full urls
  var appUrls = appRoutes.split(",").map(function(appRoute) {
    return urlLib.format({
      protocol: "http",
      hostname: config.app.hostname,
      port: config.app.port || 80,
      pathname: appRoute
    });
  });

  // Take the html snapshots
  var result = htmlSnapshots.run(_.extend(config.workers.htmlSnapshots.options, {
    source: appUrls,
    outputDir: path.join(appRoot, config.workers.htmlSnapshots.snapshotsDir)
  }), function(nonError, completedSnapshots) {
    if (typeof nonError === "undefined" && result) {
      console.log("Html Snapshots took "+completedSnapshots.length+" snapshots");
      processSnapshots(completedSnapshots);
    } else {
      errorAction("Failed to complete Html Snapshots", quitRedis);
    }
  });
}

function snapshots() {
  // Get the routes from the route worker process output
  //  and use them to drive html-snapshots
  redisClient.get(config.keys.routes, function(err, appRoutes) {
    if (!err && appRoutes && appRoutes.length > 0) {
      takeSnapshots(appRoutes);
    }
    else {
      errorAction("Failed to read "+config.keys.routes+ " from Redis", quitRedis);
    }
  });
}

module.exports = {
  snapshots: snapshots
};