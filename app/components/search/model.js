define([
  "helpers/urls",
  "helpers/contract",
  "module",
  // Reuse the main content parser
  "components/content/entities/parser",
  // Reuse the one to many type
  "components/content/entities/specializations/onetomany"
], function(urls, contract, module, parser, OneToMany) {

  // definition of the search model
  var SearchModel = OneToMany.extend({
    
    urlRoot: module.config().urlRoot,

    url: function() {
      // api allows just one search result
      return urls.normalizeUrlRoot(this.urlRoot) + "?search="+this.get("id");
    },

    parse: function(data) {
      OneToMany.prototype.createCollection.call(this, parser(data));
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