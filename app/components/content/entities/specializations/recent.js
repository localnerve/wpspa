/*
 * recent
 * A collection of recent posts
 *
 * If recent posts have been bootstrapped, then uses those to hydrate the collection.
 */
define([
  "helpers/backbone/sync",
  "helpers/contract",
  "helpers/urls",
  "helpers/params",
  "module",
  "components/content/entities/parser",
  "components/content/entities/specializations/onetomany"
], function(sync, contract, urls, params, module, parser, OneToMany) {
  var $w = window;

  // Definition of a recent posts collection
  var RecentPostsCollection = OneToMany.extend({

    urlRoot: module.config().urlRoot,

    initialize: function() {
      // Make sure this was created as expected
      contract(this.get("items"), "0.object_id", "0.object_type");
    },

    url: function() {
      return urls.normalizeUrlRoot(this.urlRoot) + "?" +
        params.meta.custom_fields;
    },

    sync: sync($w.wpspa ? $w.wpspa.recent : null),

    parse: function(data) {
      OneToMany.prototype.createCollection.call(this, parser(data));
      var item = this.get("items")[0];
      return {
        id: item.object_id,
        title: item.object_type
      };
    }
  });

  return RecentPostsCollection;
});