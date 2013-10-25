define([
  "helpers/contract",
  "helpers/code",
  "components/content/entities/model",
  "components/content/entities/collection",
  "components/content/entities/specializations/main"
],
function(contract, code, PostModel, PostCollection, specializations) {

  function createModel(options) {
    contract(options, "object_id");
    return new PostModel({
      id: options.object_id
    });
  }

  function createCollection(options) {
    contract(options, "object_type");

    // if this is a delimited object type, get the base type
    var type = options.object_type.split(":")[0];

    // if we have a specialized prototype, create it
    if (specializations[type]) {
      return new specializations[type](options);
    } else {
      // otherwise, this is a generic PostCollection
      return new PostCollection(
        type === "empty" ? { createdEmpty: true } : options
      );
    }
  }

  return {
    createModel: createModel,
    createCollection: createCollection
  };

});