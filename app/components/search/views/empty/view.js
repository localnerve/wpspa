/*
 * empty/view.js
 *
 * Displays the empty search result page
 */
define([
  "backbone.marionette",
  "app",
  "resources/strings"
], function(Marionette, app, strings) {

  var EmptyView = Marionette.ItemView.extend({
    template: "components/search/views/empty/view",
    className: "grid-row",

    events: {
      "submit .search-form": "search"
    },

    search: function(event) {
      return app.search.formSubmit(event);
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