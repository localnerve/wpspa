define([
  "helpers/contract",
  "components/content/views/single/view",
  "components/content/views/multi/layout"
], function(contract, SingleView, MultiView) {

  function getView(options) {
    contract(options, "object_type");

    // if this is a delimited object type, get the base type
    var type = options.object_type.split(":")[0];

    // if this is a singular wordpress type, return the SingleView.
    // otherwise, its a MultiView by default.
    // To override this behavior, specify a view factory to content/main.
    if (type === "post" || type === "page")
      return SingleView;
    else
      return MultiView;
  }

  return {
    getView: getView
  };

});
