define([
  "components/search/views/empty/view",
  "components/search/views/error/view",
  "components/search/views/progress/view"
], function(Empty, error, progress) {
  return {
    Empty: Empty,
    error: error,
    progress: progress
  };
});