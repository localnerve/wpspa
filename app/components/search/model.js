define([
  "lodash",
  "backbone",
  "helpers/urls",
  "helpers/contract",
  // Reuse the main content parser
  "components/content/entities/parser",
  "module"
], function(_, Backbone, urls, contract, parser, module) {

  // definition of the search model
  var SearchModel = Backbone.Model.extend({
    
    urlRoot: module.config().urlRoot,

    url: function() {
      // api allows one search retrieval
      return urls.normalizeUrlRoot(this.urlRoot) + "?search="+this.get("id");
    },

    // Since we're really just a directory for search results,
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
        id: this.get("id")
      };
    }
  });

  return {
    create: function(options) {
      contract(options, "items.0.object_id");

      return new SearchModel({
        id: options.items[0].object_id
      });
    }
  };
});