define([
  "components/content/errors/errorView"
], function(errorView) {

  // right now, we only have one default error view for all types.
  function getView() {
    return errorView;
  }

  return {
    getView: getView
  };
});