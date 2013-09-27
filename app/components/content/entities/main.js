define([
  "helpers/contract",
  "components/content/entities/model",
  "components/content/entities/collection",
  "components/content/entities/recent",
  "components/content/entities/category"
], function(contract, PostModel, PostCollection, Recent, Category) {

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

    switch (type) {
      case "recent":
        return new Recent();
      case "empty":
        return new PostCollection({ createdEmpty: true });
      case "category":
        return new Category(options);
      default:
        return new PostCollection(options);
    }
  }

  return {
    createModel: createModel,
    createCollection: createCollection
  };

});
