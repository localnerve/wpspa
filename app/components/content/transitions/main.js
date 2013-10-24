define([
  "components/content/transitions/transitionView"
], function(transitionView) {

  // right now, we only have one default transition view for all types.
  function getView() {
    return transitionView;
  }

  return {
    getView: getView
  };
});