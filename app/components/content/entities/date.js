/*
 * date
 * A collection of date posts
 *
 */
define([
  "lodash",
  "backbone",
  "helpers/urls",
  "components/content/entities/parser",
  "module"
], function(_, Backbone, urls, parser, module) {

  // definition of a date model
  var DateModel = Backbone.Model.extend({

    urlRoot: module.config().urlRoot,

    url: function() {
      var items = this.get("items");
      if (items && items.length > 0) {
        var urlRoot = urls.normalizeUrlRoot(this.urlRoot);
        // api allows one date get
        return urlRoot + "?date="+items[0].object_id;
      }
    },

    // Since we're really just a directory for date posts,
    // Return this directory if appropriate.
    get: function(attr) {
      if (_.isObject(attr)) {
        return this;
      }
      return this.attributes[attr];
    },

    parse: function(data) {
      // we can do this because this is not part of a real collection
      this.collection = new Backbone.Collection(parser(data));
      return {
        // TODO: change this
        id: this.get("items")[0].object_id
      };
    }
  });

  return DateModel;
});