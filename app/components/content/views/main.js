/*
 * views/main
 * Load and expose the different view type factories
 */
define([
  "components/content/views/content/main",
  "components/content/views/progress/main",
  "components/content/views/error/main"
], function(contentViews, progressViews, errorViews) {
  return {
    "content": contentViews,
    "progress": progressViews,
    "error": errorViews
  };
});