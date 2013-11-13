/*
 * date
 * A collection of posts by date
 */
define([
  "helpers/contract",
  "helpers/urls",
  "module",
  "components/content/entities/parser",
  "components/content/entities/specializations/onetomany"
], function(contract, urls, module, parser, OneToMany) {

  // Definition of a date model
  var DateModel = OneToMany.extend({

    urlRoot: module.config().urlRoot,

    url: function() {
      var items = this.get("items");
      contract(items, "0");

      // api allows one date get
      return urls.normalizeUrlRoot(this.urlRoot) + "?date="+items[0].object_id;
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