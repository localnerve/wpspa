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

  // Create a default post collection
  function createDefaultCollection(type, options) {
    return new PostCollection(null,
      type === "empty" ? { createdEmpty: true } : options
    );
  }

  // If there is a specialized prototype, create it
  function createSpecialization(type, options) {
    var result;
    if (specializations[type]) {
      result = new specializations[type](options);
    }
    return result;
  }

  // Create a specialized or vanilla post collection
  function createCollection(options) {
    contract(options, "object_type");

    var type = types.baseObjectType(options.object_type);

    return createSpecialization(type, options) || createDefaultCollection(type, options);
  }

  return {
    createModel: createModel,
    createCollection: createCollection
  };

});