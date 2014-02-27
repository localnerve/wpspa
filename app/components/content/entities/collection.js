/*
 * collection
 * A collection of posts
 *
 * If fetch items are specified, then only gets those posts.
 * Otherwise, gets the posts specified from a configuration endpoint.
 */
define([
  "lodash",
  "backbone",
  "helpers/urls",
  "helpers/types",
  "helpers/params",
  "components/content/entities/parser",
  "module"
], function(_, Backbone, urls, types, params, parser, module) {

  // Definition of a post collection
  var PostCollection = Backbone.Collection.extend({

    urlRoot: module.config().urlRoot,

    initialize: function(models, options) {
      options = options || {};
      // preserve any options specified to constructor
      this.options = _.extend(this.options || {}, options);
    },

    // remove fetch items as they become models
    _maintainItems: function(model) {
      this.options.items = _.reject(this.options.items, function(item) {
        return item.object_id == model[types.objectIdType(item.object_id)];
      });
      if (this.options.items.length === 0) {
        this.off("add", this.maintainItems, this);
      }
    },

    // merge in additional fetch items after initialize
    mergeItems: function(items) {
      // remove any new fetch items that are already fetched
      items = _.reject(items, function(item) {
        return this.get(item.object_id);
      }, this);
      // create a union of previous fetch items and the new fetch items
      this.options.items = _.union(this.options.items, items);
    },

    url: function() {
      var fetchItems = this.options.items;

      // if fetch items are specified, get the specific items
      //   object_ids all have to be homogenous (same types)
      if (fetchItems && fetchItems.length > 0) {
        var method = types.objectIdType(fetchItems[0].object_id);
        var posts = params.collection[method](_.pluck(fetchItems, "object_id"));

        // maintain the fetchItems as they are added
        this.on("add", this._maintainItems, this);

        return urls.normalizeUrlRoot(this.urlRoot) +
               "?post_type=any" +
               "&"+posts +
               "&"+params.meta.custom_fields;
      } else {
        return module.config().endpoint;
      }
    },

    parse: function(data) {
      return parser(data);
    }
  });

  return PostCollection;
});