define([
  "helpers/contract",
  "helpers/types",
  "components/content/views/content/single/view",
  "components/content/views/content/multi/view"
], function(contract, types, SingleView, MultiView) {

  function getView(options) {
    contract(options, "object_type");
    
    var type = types.baseObjectType(options.object_type);

    // if this is a singular wordpress type, return the SingleView.
    // otherwise, its a MultiView by default.
    // To override this behavior, specify or register a custom view factory.
    if (type === "post" || type === "page")
      return SingleView;
    else
      return MultiView;
  }

  return {
    getView: getView
  };

});