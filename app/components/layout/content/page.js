/** 
 * page.js
 *
 * On content:start:success, updates page level data
 */
define([
  "lodash",
  "helpers/contract",
  "helpers/ui",
  "resources/strings"
], function(_, contract, ui, strings) {

  // The page data elements to update
  var pageData = [
    "_wpspa_page_title", "_wpspa_meta_description"
  ];

  /**
   * Definition of a PageData object.
   * Handles the assignment of document level data such as
   *  page title and page meta data.
   */
  var PageData = function(eventAggregator) {
    var self = this;
    eventAggregator.on("content:start:success", function(options) {
      self._customFieldsPageData(options);
      ui.updateTitleDescription(self._wpspa_page_title, self._wpspa_meta_description);
    });
  };

  //
  // PageData methods
  //
  _.extend(PageData.prototype, {

     // Find and assign the page data from custom fields
    _customFieldsPageData: function(options) {
      contract(options, "model");

      var self = this,
          customFields = options.model.get("custom_fields") || {};

      _.each(pageData, function(el) {
        self[el] = customFields[el] || strings.content.page[el];
      });
    }

  });


  return {
    create: function(eventAggregator) {
      return new PageData(eventAggregator);
    }
  };

});