/*
 * ui.js
 *
 * A module of method to assist ui manipulation
 */
define([
  "jquery"
], function($) {

  var $doc = $(document);

  function scrollTop(top) {
    // overflow property android browser hack, https://code.google.com/p/android/issues/detail?id=19625
    $doc.css("overflow-y", "hidden");
    $doc.scrollTop(top);
    $doc.css("overflow-y", "auto");
  }

  // If the top is currently not visible, scroll to it
  function scrollTopConditional(top) {
    var currentTop = $doc.scrollTop();
    if (currentTop > top) {
      scrollTop(top);
    }
  }

  return {
    scrollTop: scrollTop,
    scrollTopConditional: scrollTopConditional
  };
});