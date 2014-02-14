define([
  "backbone",
  "helpers/urls",
  "helpers/params",
  "helpers/backbone/sync",
  "components/content/entities/parser",
  "module"
], function(Backbone, urls, params, sync, parser, module) {
  var $w = window;

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
      return urls.normalizeUrlRoot(this.urlRoot) + "?" +
        params.typedId(this.id, true) +
        "&"+params.meta.custom_fields;
    },

    // delegate response parsing to the given parser
    parse: function(data) {
      return parser(data);
    }
  });

  return PostModel;
});