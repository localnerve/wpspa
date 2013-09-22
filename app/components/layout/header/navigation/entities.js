define([
  "backbone",
  "components/layout/header/navigation/parser",
  "module"
], function(Backbone, parser, module) {
  $w = window;

  // definition of the navigation collection
  var NavigationCollection = Backbone.Collection.extend({
    // get endpoint from config
    url: module.config().endpoint,

    // override sync, if injected data not here, delegate to Backbone
    sync: function(method, collection, options) {
      // if we have the data already, use it
      if ($w.wpspa && $w.wpspa.navigation) {
        options.success($w.wpspa.navigation);
        return {
          done: function(callback) {
            callback.apply(callback, arguments);
          }
        };
      } else {
        return Backbone.sync.apply(this, arguments);
      }
    },

    // delegate response parsing to the given parser
    parse: function(data) {
      return parser(data);
    }
  });

  return {
    createCollection: function() {
      return new NavigationCollection();
    }
  };

});
