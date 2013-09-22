define([
  "backbone",
  "helpers/sync",
  "components/layout/header/navigation/parser",
  "module"
], function(Backbone, sync, parser, module) {
  var $w = window;

  // definition of the navigation collection
  var NavigationCollection = Backbone.Collection.extend({
    // get endpoint from config
    url: module.config().endpoint,

    // override sync, if injected data not here, delegate to Backbone
    sync: sync($w.wpspa ? $w.wpspa.navigation : null),

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
