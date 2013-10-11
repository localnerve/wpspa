define([
  "backbone",
  "helpers/backbone/sync",
  "components/layout/footer/sidebarContainer/parser",
  "module"
], function(Backbone, sync, parser, module) {
  $w = window;

  // definition of the footer sidebar collection
  var SidebarCollection = Backbone.Collection.extend({
    // get endpoint from config
    url: module.config().endpoint,

    // override sync, if injected data not here, delegate to Backbone
    sync: sync($w.wpspa ? $w.wpspa.footer : null),

    // delegate response parsing to the given parser
    parse: function(data) {
      return parser(data);
    }
  });

  return {
    createCollection: function() {
      return new SidebarCollection();
    }
  };

});
