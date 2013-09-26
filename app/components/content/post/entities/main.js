define([
  "helpers/contract",
  "components/content/post/entities/model",
  "components/content/post/entities/collection",
  "components/content/post/entities/recent",
  "components/content/post/entities/category"
], function(contract, PostModel, PostCollection, RecentPostsCollection, CategoryPostsCollection) {

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
        return new RecentPostsCollection();
      case "empty":
        return new PostCollection();
      case "category":
        return new CategoryPostsCollection(options);
      default:
        return new PostCollection(options);
    }
  }

  return {
    createModel: createModel,
    createCollection: createCollection
  };

});
