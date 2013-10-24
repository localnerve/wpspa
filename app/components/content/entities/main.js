define([
  "lodash",
  "helpers/contract",
  "helpers/code",
  "components/content/entities/model",
  "components/content/entities/collection",
  "components/content/entities/recent",
  "components/content/entities/category",
  "components/content/entities/date"
],
// parameters preceeded with two underscores get considered as collection prototypes
function(_, contract, code, PostModel, PostCollection, __recent, __category, __date) {

  // create a parameter object of this factory's parameters by name, value
  var params = _.object(
    code.getParamNames(arguments.callee),
    Array.prototype.slice.call(arguments)
  );

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

    // conform the type to a collection prototype specialization
    type = "__"+type.toString();

    // if we have a specialized prototype, create it
    if (params[type]) {
      return new params[type](options);
    } else {
      // otherwise, this is a generic PostCollection
      return new PostCollection(
        type === "__empty" ? { createdEmpty: true } : options
      );
    }
  }

  return {
    createModel: createModel,
    createCollection: createCollection
  };

});
