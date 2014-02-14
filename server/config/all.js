/*
 * all.js
 *
 * non-environment specific configuration
 */
var common = require("./common");

function Config() {}

// base properties that are configurable and writeable
Config.prototype = {

  // the default static file base path
  staticBase: ".",

  // the default static max-age of static files (in milliseconds)
  staticAge: 0,

  // the logger format
  loggerFormat: "dev",

  // the forbidden access rewrite expression
  rewriteForbidden: '^/(server|node_modules|Procfile$|app.js$|package.json$) [F NC L]'
};

// define restricted properties for all environments
// properties are not writable or configurable by default
Object.defineProperties(Config.prototype, {
  
  scriptsDir: {
    value: "scripts",
    enumerable: true
  },

  imagesDir: {
    value: "images",
    enumerable: true
  },

  fontsDir: {
    value: "fonts",
    enumerable: true
  },

  snapshotsDir: {
    value: "snapshots",
    enumerable: true
  },

  four04File: {
    value: "404.html",
    enumerable: true
  },

  faviconFile: {
    value: "favicon.ico",
    enumerable: true
  },

  robotsFile: {
    value: "robots.txt",
    enumerable: true
  },

  // keys to data from the database
  keys: {
    value: {
      htmlSnapshots: "html-snapshots",
      routes: "app-routes",
      atf: "atf-content"
    },
    enumerable: true
  },
  
  // endpoint for navigation (requires JSON API + WPSPA plugin)
  navigationPath: {
    value: "/api/wpspa/menu",
    enumerable: true
  },

  // endpoint for site_info (requires JSON API + WPSPA plugin)
  siteInfoPath: {
    value: "/api/wpspa/site_info",
    enumerable: true
  },

  // endpoint for footer content (requires JSON API)
  footerPath: {
    value: "/api/widgets/get_sidebar/?sidebar_id=sidebar-1",
    enumerable: true
  },

  // endpoint for home content (requires JSON API)
  recentPath: {
    value: "/api/get_recent_posts/?"+common.customFieldsParam,
    enumerable: true
  }
});

module.exports = Config;