/*
 * empty/view.js
 *
 * Displays the empty search result page
 */
define([
  "backbone.marionette",
  "resources/strings"
], function(Marionette, strings) {

  var EmptyView = Marionette.ItemView.extend({
    template: "components/search/views/empty/view",
    className: "grid-row",

    events: {
      "submit .search-form": "search"
    },

    search: function(event) {
      var searchField = $(event.currentTarget).find("input.search-field");
      var query = searchField.prop("value");
      if (query && query.length > 0) {
        Backbone.history.navigate("search/"+query, true);
        return false;
      }
    },

    serializeData: function() {
      return {
        query: this.query,
        message: strings.search.empty.message,
        label: strings.search.empty.label
      };
    }
  });

  return EmptyView;
});