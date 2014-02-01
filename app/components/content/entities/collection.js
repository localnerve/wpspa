/*
 * collection
 * A collection of posts
 *
 * If items are initially specified, then only gets those posts.
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

  // definition of a post collection
  var PostCollection = Backbone.Collection.extend({

    urlRoot: module.config().urlRoot,

    initialize: function(models, options) {
      options = options || {};
      // preserve any options specified to constructor
      this.options = _.extend(this.options || {}, options);
    },

    url: function() {
      // if fetch items are specified, get the specific items
      if (this.options.items && this.options.items.length > 0) {
        var index = 0;

        // create the post__in WP_Query filter for these items, URI encoded
        var fetchIds = _.map(this.options.items, function(value) {
          return "post__in%5B"+(index++)+"%5D="+value.object_id;
        });

        return urls.normalizeUrlRoot(this.urlRoot) +
               "?post_type="+types.baseObjectType(this.options.object_type) +
               "&"+fetchIds.join("&") +
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