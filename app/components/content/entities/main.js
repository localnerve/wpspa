define([
  "helpers/contract",
  "helpers/types",
  "components/content/entities/model",
  "components/content/entities/collection",
  "components/content/entities/specializations/main"
],
function(contract, types, PostModel, PostCollection, specializations) {

  // Create a default post model
  function createModel(options) {
    contract(options, "object_id");
    return new PostModel({
      id: options.object_id
    });
  }

  // Create a specialized or vanilla post collection
  function createCollection(options) {
    contract(options, "object_type");

    var type = types.baseObjectType(options.object_type);

    // if we have a specialized prototype, create it
    if (specializations[type]) {
      return new specializations[type](options);
    } else {
      // otherwise, this is a generic PostCollection
      return new PostCollection(null,
        type === "empty" ? { createdEmpty: true } : options
      );
    }
  }

  return {
    createModel: createModel,
    createCollection: createCollection
  };

});