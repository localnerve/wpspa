/*
 * category
 * A collection of posts by category
 */
define([
  "helpers/contract",
  "helpers/urls",
  "module",
  "components/content/entities/parser",
  "components/content/entities/specializations/onetomany"
], function(contract, urls, module, parser, OneToMany) {
  
  // Definition of a category model
  var CategoryModel = OneToMany.extend({
    
    // get urlRoot from config
    urlRoot: module.config().urlRoot,

    // make a jsonapi url
    url: function() {
      var items = this.get("items");
      if (items && items.length > 0) {
        var urlRoot = urls.normalizeUrlRoot(this.urlRoot);
        var id = items[0].object_id;
        var idType = parseInt(id, 10) ? "id" : "slug";
        // for the model, we just do one category at a time
        return urlRoot + "?"+idType+"="+id+"&custom_fields=_wpspa_meta_description,_wpspa_page_title";
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