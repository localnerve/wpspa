/*
 * respond.js
 * A comment response model
 */
define([
  "jquery",
  "backbone",
  "helpers/urls",
  "module"
], function($, Backbone, urls, module) {

  // Definition of a ResponseModel
  var ResponseModel = Backbone.Model.extend({

    // get urlRoot from config
    urlRoot: module.config().urlRoot,

    url: function() {
      var urlRoot = urls.normalizeUrlRoot(this.urlRoot);
      return urlRoot + "?" + $.param(this.attributes);
    }
  });

  return ResponseModel;
});