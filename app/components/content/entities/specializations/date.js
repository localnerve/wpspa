/*
 * date
 * A collection of posts by date
 */
define([
  "helpers/contract",
  "helpers/urls",
  "helpers/params",
  "module",
  "components/content/entities/parser",
  "components/content/entities/specializations/onetomany"
], function(contract, urls, params, module, parser, OneToMany) {

  // Definition of a date model
  var DateModel = OneToMany.extend({

    urlRoot: module.config().urlRoot,

    initialize: function() {
      // Make sure this was created as expected
      contract(this.get("items"), "0.object_id");
    },

    url: function() {
      var items = this.get("items");

      // api allows one date get
      return urls.normalizeUrlRoot(this.urlRoot) + "?date="+
        items[0].object_id +
        "&"+params.meta.custom_fields;
    },

    parse: function(data) {
      OneToMany.prototype.createCollection.call(this, parser(data));
      var id = this.get("items")[0].object_id;
      return {
        id: id,
        title: id
      };
    }
  });

  return DateModel;
});