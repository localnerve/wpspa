define([
  // Reuse multiview for our content view
  "components/content/views/multi/layout",
  "components/search/views/empty/view",
  "components/search/views/error/view",
  "components/search/views/transition/view"
], function(content, Empty, error, transition) {
  return {
    content: content,
    Empty: Empty,
    error: error,
    transition: transition
  };
});