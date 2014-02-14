/*
 * category
 * A collection of posts by category
 */
define([
  "jquery",
  "helpers/contract",
  "helpers/urls",
  "helpers/params",
  "module",
  "components/content/entities/parser",
  "components/content/entities/specializations/onetomany"
], function($, contract, urls, params, module, parser, OneToMany) {
  
  // Definition of a category model
  var CategoryModel = OneToMany.extend({
    
    // get urlRoot from config
    urlRoot: module.config().urlRoot,

    // make a jsonapi url
    url: function() {
      var items = this.get("items");
      if (items && items.length > 0) {
        // for the model, we just do one category at a time
        return urls.normalizeUrlRoot(this.urlRoot) + "?" +
          $.param(params.typedId(items[0].object_id, true)) +
          "&"+params.meta.custom_fields;
      } else {
        return module.config().endpoint;
      }
    },

    parse: function(data) {
      contract(data, "category");
      OneToMany.prototype.createCollection.call(this, parser(data));
      return data.category;
    }
  });

  return CategoryModel;
});