define([
  "components/content/views/progress/view"
], function(progressView) {

  // right now, we only have one default progress view for all types.
  function getView() {
    return progressView;
  }

  return {
    getView: getView
  };
});