/**
 * snapshots.js
 *
 * Refreshes the html snapshots.
 * The more often this is run, the more up-to-date the snapshots will be.
 */
var path = require("path");
var htmlSnapshots = require('html-snapshots');
var configLib = require("../../../config");

// Configure the selectors here
var selectors = {
  "/": "#content .post-container",
  "__default": "#content .grid-row"
};

/**
 * Create the html snapshots from the robots.txt file
 * If config.app.port is undefined, then it is production, so we must use the cloud routing
 */
function robots(appRoot, callback, environment) {
  var config = configLib.create(environment || process.env.NODE_ENV);

  return htmlSnapshots.run({
    hostname: config.app.hostname,
    port: config.app.port || 80,
    source: path.join(appRoot, "robots.txt"),
    outputDir: path.join(appRoot, config.snapshotsDir),
    outputDirClean: true,
    selector: selectors
  }, callback);
}

module.exports = {
  robots: robots
};