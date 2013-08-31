define([
  "backbone",
  "helpers/contract",
  "wpspa/layout/content/prefetch/parser"
], function(Backbone, contract, parser) {
  // The definition of the prefetch collection
  var Collection = Backbone.Collection.extend({
    initialize: function(options) {
      this.options = options;
    },
    
    url: function() {
      var test = this.options.fetchItems;
      // should be creating the url from options.fetchItems, 
      //   skipping for now until I can find/create API support
      // this just grabs any posts
      return "/api/get_posts/?post_type=any";
    },
    parse: function(data) {
      return parser(data);
    }
  });

  return {
    createCollection: function(options) {
      contract(options, "fetchItems");
      return new Collection({
        fetchItems: options.fetchItems
      });
    }
  };

});