// The requirejs configuration
require.config({
  deps: [
    "main"
  ],
  paths: {
    zepto: "../vendor/bower/zeptojs/build/zepto",
    lodash: "../vendor/bower/lodash/dist/lodash.underscore",
    backbone: "../vendor/bower/backbone/backbone",
    "backbone.wreqr": "../vendor/bower/backbone.marionette/public/javascripts/backbone.wreqr",
    "backbone.babysitter": "../vendor/bower/backbone.marionette/public/javascripts/backbone.babysitter",
    server: "../server",
    vendor: "../vendor",
    foundation: "../vendor/bower/foundation/js/foundation",
    "backbone.marionette": "../vendor/bower/backbone.marionette/lib/core/amd/backbone.marionette"
  },
  config: {
    "loaders/jst": {
      prefix: "app",
      suffix: ".html"
    },
    "components/layout/main": {
      containerCompletions: 4
    },
    "components/layout/content/prefetch": {
      timeout: 15000
    },
    "components/layout/header/main": {
      timeout: 30000,
      bannerShowEvents: 2
    },
    "components/layout/header/navigation/entities": {
      endpoint: "/api/wpspa/menu"
    },
    "components/layout/header/navigation/item": {
      hideHome: true
    },
    "components/layout/header/banner/entities": {
      endpoint: "/api/wpspa/site_info"
    },
    "components/layout/footer/sidebarContainer/main": {
      timeout: 30000
    },
    "components/layout/footer/sidebarContainer/entities": {
      endpoint: "/api/widgets/get_sidebar/?sidebar_id=sidebar-1"
    },
    "components/content/entities/model": {
      urlRoot: "/api/get_post"
    },
    "components/content/entities/collection": {
      urlRoot: "/api/get_posts",
      endpoint: "/api/get_posts/?post_type=any"
    },
    "components/content/entities/specializations/recent": {
      endpoint: "/api/get_recent_posts/?custom_fields=_wpspa_meta_description,_wpspa_page_title"
    },
    "components/content/entities/specializations/category": {
      urlRoot: "/api/get_category_posts/",
      endpoint: "/api/get_category_posts/?slug=Uncategorized"
    },
    "components/content/entities/specializations/date": {
      urlRoot: "/api/get_date_posts"
    },
    "components/content/entities/specializations/respond": {
      urlRoot: "/api/respond/submit_comment"
    },
    "components/content/views/content/single/comments/view": {
      timeout: 15000
    },
    "components/search/model": {
      urlRoot: "/api/get_search_results"
    },
    app: {
      root: "/",
      pushState: true
    }
  },
  map: {
    "*": {
      underscore: "lodash",
      jquery: "zepto"
    }
  },
  shim: {
    zepto: {
      exports: "Zepto"
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
    },
    "foundation/foundation": {
      deps: [
        "jquery"
      ],
      exports: "Foundation"
    },
    "foundation/foundation.topbar": {
      deps: [
        "foundation/foundation"
      ]
    }
  }
});
