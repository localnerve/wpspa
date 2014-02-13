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
  "components/content/entities/parser",
  "module"
], function(_, Backbone, urls, types, parser, module) {

  // Methods for creating params for fetching WP posts
  var fetchParam = {
    id: function(ids) {
      var index = 0;
      // create the post__in WP_Query filter for these items, URI encoded
      var params = _.map(ids, function(value) {
        return "post__in%5B"+(index++)+"%5D="+value;
      });
      return params.join("&");
    },
    slug: function(names) {
      if (names.length > 1) throw new Error("WP Query does not support multiple slugs");
      return "name="+names[0];
    }
  };

  // Definition of a post collection
  var PostCollection = Backbone.Collection.extend({

    urlRoot: module.config().urlRoot,

    initialize: function(models, options) {
      options = options || {};
      // preserve any options specified to constructor
      this.options = _.extend(this.options || {}, options);
    },

    // remove fetch items as they become models
    maintainItems: function(model) {
      this.options.items = _.reject(this.options.items, function(item) {
        return item.object_id == model[types.objectIdType(item.object_id)];
      });
      if (this.options.items.length === 0) {
        this.off("add", this.maintainItems, this);
      }
    },

    // add fetch items after initialize
    addItems: function(items) {
      _.each(items, function(item) {
        this.options.items.push(item);
      }, this);
    },

    url: function() {
      var fetchItems = this.options.items;

      // if fetch items are specified, get the specific items
      //   object_ids all have to be homogenous (same types)
      if (fetchItems && fetchItems.length > 0) {
        //var postType = types.baseObjectType(this.options.object_type);
        var method = types.objectIdType(fetchItems[0].object_id);
        var params = fetchParam[method](_.pluck(fetchItems, "object_id"));

        // maintain the fetchItems as they are added
        this.on("add", this.maintainItems, this);

        return urls.normalizeUrlRoot(this.urlRoot) +
               "?post_type=any"+//postType +
               "&"+params +
               "&custom_fields=_wpspa_meta_description,_wpspa_page_title";
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