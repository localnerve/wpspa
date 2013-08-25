define([
  "backbone",
  "modules/helpers/contract",
  "modules/entities/parsers/jsonapi_post",
  "module"
  ], function(Backbone, contract, parser, module) {

    // definition of a post model
    var PostModel = Backbone.Model.extend({
      // get endpoint from config
      urlRoot: module.config().endpoint,
      
      // make a jsonapi url
      url: function() {
        var urlRoot = this.urlRoot.charAt(this.urlRoot.length-1) === '/' ?
          this.urlRoot : this.urlRoot + "/";

        return urlRoot + "?id="+this.id;
      },

      // delegate response parsing to the given parser
      parse: function(data) {
        return parser(data);
      }
    });

    return {
      create: function(options) {
        contract(options, "object_id");
        return new PostModel({
          id: options.object_id
        });
      }
    };

  });