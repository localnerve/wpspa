/*
 * empty/view.js
 *
 * Displays the empty search result page
 */
define([
  "backbone.marionette"
], function(Marionette) {

  var EmptyView = Marionette.ItemView.extend({
    template: "components/search/views/empty/view",
    className: "grid-row",

    serializeData: function() {
      return {
        query: this.query
      };
    }
  });

  return EmptyView;
});