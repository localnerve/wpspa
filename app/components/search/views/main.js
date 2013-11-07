define([
  // Reuse multiview for our content view
  "components/content/views/multi/view",
  "components/search/views/empty/view",
  "components/search/views/error/view",
  "components/search/views/progress/view"
], function(content, Empty, error, progress) {
  return {
    content: content,
    Empty: Empty,
    error: error,
    progress: progress
  };
});