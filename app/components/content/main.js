/*
 * content/main
 * The content message handler
 *
 * Views are returned by request for TYPE
 * Message = content:view:TYPE
 *    Where TYPE is the WPSPA Post Type as configured in the Wordpress menu via the WPSPA plugin.
 *
 * Entities are returned by request for TYPE
 * Message = content:entity, Param = TYPE
 *    Where TYPE is the WPSPA Post Type as configured in the Wordpress menu via the WPSPA plugin.
 */
define([
  "app",
  "helpers/contract",
  "components/content/post/singleView",
  "components/content/post/multiView",
  "components/content/post/entities/main"
  ], function(app, contract, singleView, multiView, entities) {

    app.reqres.setHandler("content:view", function(object_type) {
      switch(object_type) {
        case "recent":
        case "category":
          return multiView;

        case "post":
        case "page":
          return singleView;

        default:
          throw new Error("Unexpected view type requested");
      }
    });

    var cache = {};
    app.reqres.setHandler("content:entity", function(options) {
      contract(options, "object_type");

      // get the cached entity
      var entity = cache[options.object_type];

      // if there is no entity, create a new one, empty is desired.
      if (!entity) {
        var object_type = options.object_type;
        options = options.emptyOnNew ? { object_type: "empty" } : options;
        entity = cache[object_type] = entities.createCollection(options);
      }
        

      return entity;
    });

  });