define([
  "backbone",
  "helpers/sync",
  "components/content/post/entities/parser",
  "module"
], function(Backbone, sync, parser, module) {
  var $w = window;

  // definition of a recent posts collection
  var RecentPostsCollection = Backbone.Collection.extend({

    url: module.config().endpoint,

    sync: sync($w.wpspa ? $w.wpspa.recent : null),

    parse: function(data) {
      return parser(data);
    }
  });

  return RecentPostsCollection;
});