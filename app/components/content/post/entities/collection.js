define([
  "lodash",
  "backbone",
  "helpers/anchor",
  "helpers/sync",
  "components/content/post/entities/parser",
  "module"
], function(_, Backbone, anchor, sync, parser, module) {
  var $w = window;

  // definition of a post collection
  var PostCollection = Backbone.Collection.extend({

    urlRoot: module.config().urlRoot,

    initialize: function(options) {
      options = options || {};
      // preserve any options specified to constructor
      this.options = _.extend(this.options || {}, { fetchItems: options.items });
    },

    url: function() {
      // if fetchItems are specified, get the specific items
      if (this.options.fetchItems && this.options.fetchItems.length > 0) {
        var urlRoot = anchor.normalizeUrlRoot(this.urlRoot);
        var object_type = this.options.fetchItems[0].object_type;
        var object_ids = _.pluck(this.options.fetchItems, "object_id");
        return urlRoot + "?post_type="+object_type+"&post__in("+object_ids.join(",")+")";
      } else {
        return module.config().endpoint;
      }
    },

    //sync: sync($w.wpspa ? $w.wpspa.posts : null),

    parse: function(data) {
      return parser(data);
    }
  });

  return PostCollection;
});