define([
  "helpers/contract",
  "components/content/views/singleView",
  "components/content/views/multiView",
  "components/content/views/transitionView"
], function(contract, SingleView, MultiView, TransitionView) {

  function getView(options) {
    contract(options, "object_type");

    // if this is a delimited object type, get the base type
    var type = options.object_type.split(":")[0];

    switch(type) {
      case "transition":
        return TransitionView;

      case "recent":
      case "category":
        return MultiView;

      case "post":
      case "page":
        return SingleView;

      default:
        throw new Error("Unexpected view type requested");
    }
  }

  return {
    getView: getView
  };

});
