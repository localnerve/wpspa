/*
 * base.js
 * non-environment specific configuration
 */
function Config() {}
Config.prototype = {

  // endpoint for navigation (requires JSON API + WPSPA plugin)
  navigationPath: "/api/get_posts/?post_type=nav_menu_item&order=ASC&orderby=menu_order&custom_fields=_menu_item_menu_item_parent,_menu_item_wpspa_route,_menu_item_wpspa_menu_text,_menu_item_wpspa_post_type,_menu_item_wpspa_object_id",
  
  // endpoint for footer content (requires JSON API)
  footerPath: "/api/widgets/get_sidebar/?sidebar_id=sidebar-1",
  
  // endpoint for home content (requires JSON API)
  recentPath: "/api/get_recent_posts",

  // the default static file base path
  staticBase: ".",

  // the name of the 404 file resource
  four04File: "404.html",

  // the forbidden access rewrite expression
  rewriteForbidden: '^/(server|node_modules|Procfile$|app.js$|package.json$) [F NC L]'
};

module.exports = Config;