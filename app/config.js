// The requirejs configuration
require.config({
  deps: [
    "main"
  ],
  paths: {
    jquery: "../vendor/bower/jquery/jquery",
    lodash: "../vendor/bower/lodash/dist/lodash.underscore",
    backbone: "../vendor/bower/backbone/backbone",
    "backbone.wreqr": "../vendor/bower/backbone.marionette/public/javascripts/backbone.wreqr",
    "backbone.babysitter": "../vendor/bower/backbone.marionette/public/javascripts/backbone.babysitter",
    unmanaged: "../vendor/js",
    vendor: "../vendor",
    foundation: "../vendor/bower/foundation/js/foundation",
    polyfiller: "../vendor/bower/webshim/demos/js-webshim/minified/polyfiller",
    "backbone.marionette": "../vendor/bower/backbone.marionette/lib/core/amd/backbone.marionette",
    requirejs: "../vendor/bower/requirejs/require",
    "requirejs-text": "../vendor/bower/requirejs-text/text",
    underscore: "../vendor/bower/underscore/underscore"
  },
  config: {
    "modules/loaders/jst": {
      prefix: "app/templates",
      suffix: ".html"
    },
    "modules/entities/navigation": {
      endpoint: "/api/get_posts/?post_type=nav_menu_item&order=ASC&orderby=menu_order&custom_fields=_menu_item_menu_item_parent,_menu_item_wpspa_route,_menu_item_wpspa_menu_text,_menu_item_wpspa_post_type,_menu_item_wpspa_object_id"
    },
    app: {
      root: "/"
    }
  },
  map: {
    "*": {
      underscore: "lodash"
    }
  },
  shim: {
    jquery: {
      exports: "jQuery"
    },
    lodash: {
      exports: "_"
    },
    backbone: {
      deps: [
        "lodash",
        "jquery"
      ],
      exports: "Backbone"
    },
    "backbone.wreqr": {
      deps: [
        "backbone"
      ]
    },
    "backbone.babysitter": {
      deps: [
        "backbone"
      ]
    }
  }
});
