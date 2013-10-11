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
  "components/content/entities/parser",
  "module"
], function(_, Backbone, urls, parser, module) {

  // definition of a post collection
  var PostCollection = Backbone.Collection.extend({

    urlRoot: module.config().urlRoot,

    initialize: function(options) {
      options = options || {};
      // preserve any options specified to constructor
      this.options = _.extend(this.options || {}, options);
    },

    url: function() {
      // if fetch items are specified, get the specific items
      if (this.options.items && this.options.items.length > 0) {
        var urlRoot = urls.normalizeUrlRoot(this.urlRoot);
        var object_type = this.options.items[0].object_type;
        var object_ids = _.pluck(this.options.items, "object_id");
        return urlRoot + "?post_type="+object_type+"&post__in("+object_ids.join(",")+")";
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