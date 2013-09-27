/*
 * content/main
 * The content message handler
 * Handles content:view and content:entity requests from the main content container.
 *
 * Views are returned by request for WPSPA_TYPE
 * Message = (content:view | content:entity), Param = { object_type: WPSPA_TYPE }
 *    Where WPSPA_TYPE is the object Type as configured in the Wordpress menu via the WPSPA plugin.
 *
 */
define([
  "app",
  "helpers/contract",
  "components/content/views/main",
  "components/content/entities/main"
  ], function(app, contract, views, entities) {

    // handle content:view requests
    app.reqres.setHandler("content:view", function(options) {
      return views.getView(options);
    });

    // the entity cache
    // entities are stored by object_type
    var cache = {};

    // handle content:entity requests
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