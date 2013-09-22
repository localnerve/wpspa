define([
  "backbone",
  "helpers/sync",
  "components/content/post/entities/parser",
  "module"
], function(Backbone, sync, parser, module) {
  var $w = window;

  // definition of a post collection
  var PostCollection = Backbone.Collection.extend({

    initialize: function(options) {
      // TODO: check if overwriting is always safe
      this.options = options;
    },

    url: function() {
      // TODO: implement
      // if (this.options.fetchItems)
      //   (make url from module.config().urlRoot and fetchItems)
      // else
      return module.config().endpoint;
    },

    sync: sync($w.wpspa ? $w.wpspa.posts : null),

    parse: function(data) {
      return parser(data);
    }
  });

  return PostCollection;
});