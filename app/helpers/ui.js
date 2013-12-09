/*
 * ui.js
 *
 * A module of method to assist ui manipulation
 */
define([
  "jquery"
], function($) {

  var doc = document;
  var $doc = $(document);

  /**
   * Scroll to the top of the offset
   */
  function scrollTop(offset) {
    if (offset) {
      // overflow property android browser hack, https://code.google.com/p/android/issues/detail?id=19625
      $doc.css("overflow-y", "hidden");
      $doc.scrollTop(offset.top);
      $doc.css("overflow-y", "auto");
    }
  }

  /**
   * If the top is currently not visible, scroll to it
   */
  function scrollTopConditional(offset) {
    if (offset) {
      var currentTop = $doc.scrollTop();
      if (currentTop > offset.top) {
        scrollTop(offset);
      }
    }
  }

  /**
   * Update the title and description of the page
   */
  function updateTitleDescription(title, description) {
    doc.title = title;
    $("meta[name=description]").attr("content", description);
  }

  return {
    scrollTop: scrollTop,
    scrollTopConditional: scrollTopConditional,
    updateTitleDescription: updateTitleDescription
  };
});