define([
  "backbone",
  "helpers/anchor",
  "helpers/sync",
  "components/content/entities/parser",
  "module"
], function(Backbone, anchor, sync, parser, module) {
  $w = window;

  // definition of a post model
  var PostModel = Backbone.Model.extend({

    initialize: function(options) {
      options = options || {};
      this.sync = sync($w.wpspa[options.name]);
    },

    // get urlRoot from config
    urlRoot: module.config().urlRoot,

    // make a jsonapi url
    url: function() {
      var urlRoot = anchor.normalizeUrlRoot(this.urlRoot);
      return urlRoot + "?id=" + this.id;
    },

    // delegate response parsing to the given parser
    parse: function(data) {
      return parser(data);
    }
  });

  return PostModel;
});