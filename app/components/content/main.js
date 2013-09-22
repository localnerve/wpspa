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
  "components/content/post/singleView",
  "components/content/post/multiView",
  "components/content/post/entities/main"
  ], function(app, singleView, multiView, entities) {

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

    app.reqres.setHandler("content:entity", function(object_type) {
      return entities.createCollection({ object_type: object_type});
    });

  });