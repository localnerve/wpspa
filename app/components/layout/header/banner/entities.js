define([
  "backbone",
  "helpers/backbone/sync",
  "module"
], function(Backbone, sync, module) {
  var $w = window;

  // definition of the siteinfo model
  var SiteInfoModel = Backbone.Model.extend({
    // get endpoint from config
    url: module.config().endpoint,

    // override sync, if injected data not here, delegate to Backbone
    sync: sync($w.wpspa ? $w.wpspa.siteInfo : null)

  });

  return {
    create: function() {
      return new SiteInfoModel();
    }
  };

});