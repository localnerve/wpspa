define([
  "helpers/contract",
  "components/content/post/entities/model",
  "components/content/post/entities/collection",
  "components/content/post/entities/recent",
  "components/content/post/entities/category"
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
        return new PostCollection();
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
