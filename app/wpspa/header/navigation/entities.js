define([
  "backbone",
  "wpspa/header/navigation/parser",
  "module"
  ], function(Backbone, parser, module) {

    // definition of the navigation collection
    var NavigationCollection = Backbone.Collection.extend({
      // get endpoint from config
      url: module.config().endpoint,
      // delegate response parsing to the given parser
      parse: function(data) {
        return parser(data);
      }
    });

    return {
      createCollection: function(/*options*/) {
        return new NavigationCollection();
      }
    };

  });