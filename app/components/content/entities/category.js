define([
  "lodash",
  "backbone",
  "helpers/urls",
  "components/content/entities/parser",
  "module"
], function(_, Backbone, urls, parser, module) {
  
  // Definition of a category model
  // a CategoryModel is a model with its own collection of posts.
  // This takes advantage of the fact that Backbone models always have a collection
  // property that points back to the collection they belong to.
  // In this case, this model doesn't belong to the collection, it's just a directory of select posts.
  var CategoryModel = Backbone.Model.extend({
    
    // get urlRoot from config
    urlRoot: module.config().urlRoot,

    // make a jsonapi url
    url: function() {
      var items = this.get("items");
      if (items && items.length > 0) {
        var urlRoot = urls.normalizeUrlRoot(this.urlRoot);
        // for the model, we just do one category at a time
        return urlRoot + "?id=" + items[0].object_id;
      } else {
        return module.config().endpoint;
      }
    },

    // Since we're really just a directory for category posts,
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
        id: data.category.id
      };
    }
  });

  return CategoryModel;
});