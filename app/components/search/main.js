/*
 * The search module
 * Defines the search module
 *
 * This is an add on module that will have output in the content area.
 */
define([
  "jquery",
  "backbone",
  "app",
  "components/search/router"
], function($, Backbone, app) {

  // Create a partial definition for search module
  var thisModule = app.module("search", function(search) {

    app.on("initialize:after", function() {
      app.vent.trigger("container:complete");
    });

    // The main submit handler for search all form submissions
    function formSubmit(event) {
      var $searchField = $(event.currentTarget).find("input.search-field");
      var query = $searchField.prop("value");
      if (query && query.length > 0) {
        $searchField.prop("value", "").blur();
        Backbone.history.navigate("search/"+query, true);
        return false;
      }
    }

    // Add an initializer to the search module
    search.addInitializer(function() {
      // expose the search form submit handler
      this.formSubmit = formSubmit;
    });

  });

  return thisModule;

});