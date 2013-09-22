define([
  "helpers/contract",
  "components/content/post/entities/model",
  "components/content/post/entities/collection",
  "components/content/post/entities/recent"
], function(contract, PostModel, PostCollection, RecentCollection) {

  function createModel(options) {
    contract(options, "object_id");
    return new PostModel({
      id: options.object_id
    });
  }

  function createCollection(options) {
    contract(options, "object_type");
    switch (options.object_type) {
      case "recent":
        return new RecentCollection();
      // TODO:
      //case "category":        
      default:
        return new PostCollection();
    }
  }

  return {
    createModel: createModel,
    createCollection: createCollection
  };

});
