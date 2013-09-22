define([
  "backbone",
  "components/content/post/entities/parser",
  "module"
], function(Backbone, parser, module) {
  
  // definition of a post model
  var PostModel = Backbone.Model.extend({
    // get urlRoot from config
    urlRoot: module.config().urlRoot,

    // make a jsonapi url
    url: function() {
      var urlRoot = this.urlRoot.charAt(this.urlRoot.length - 1) === '/' ?
        this.urlRoot : this.urlRoot + "/";

      return urlRoot + "?id=" + this.id;
    },

    // delegate response parsing to the given parser
    parse: function(data) {
      return parser(data);
    }
  });

  return PostModel;

});
