/*
 * all.js
 *
 * non-environment specific configuration
 */
function Config() {}

// base properties that are configurable and writeable
Config.prototype = {

  // the default static file base path
  staticBase: ".",

  // the default static max-age of static files (in milliseconds)
  staticAge: 0,

  // the default static max-age of static files NOT intended for far-future expiry (in milliseconds)
  staticAgeShort: 0,

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

  four04File: {
    value: "404.html",
    enumerable: true
  },

  faviconFile: {
    value: "favicon.ico",
    enumerable: true
  },

  // endpoint for navigation (requires JSON API + WPSPA plugin)
  navigationPath: {
    value: "/api/get_posts/?post_type=nav_menu_item&order=ASC&orderby=menu_order&custom_fields=_menu_item_menu_item_parent,_menu_item_wpspa_route,_menu_item_wpspa_menu_text,_menu_item_wpspa_post_type,_menu_item_wpspa_object_id",
    enumerable: true
  },

  // endpoint for footer content (requires JSON API)
  footerPath: {
    value: "/api/widgets/get_sidebar/?sidebar_id=sidebar-1",
    enumerable: true
  },

  // endpoint for home content (requires JSON API)
  recentPath: {
    value: "/api/get_recent_posts",
    enumerable: true
  }
});

module.exports = Config;