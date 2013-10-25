/*
 * content/main
 * The content message handler
 * Handles view and entity requests from the main content container.
 *
 */
define([
  "lodash",
  "app",
  "helpers/contract",
  "components/content/views/main",
  "components/content/transitions/main",
  "components/content/errors/main",
  "components/content/entities/main"
  ], function(_, app, contract, contentViews, transitionViews, errorViews, entities) {

    /**
     * Get a view type
     * Use a custom factory if one was specified, otherwise use a default
     */
    function getView(options, viewType, defaultViewFactory) {
      contract(options, "options");

      var view;

      // if a custom view factory was specified, use that
      if (options[viewType])
        view = options[viewType](options.options);
      else
        view = defaultViewFactory.getView(options.options);

      return view;
    }

    // handle content:view requests
    app.reqres.setHandler("content:view", function(options) {
      return getView(options, "content", contentViews);
    });

    // handle content:transition requests
    app.reqres.setHandler("content:transition", function(options) {
      return getView(options, "transition", transitionViews);
    });

    // handle content:error requests
    app.reqres.setHandler("content:error", function(options) {
      return getView(options, "error", errorViews);
    });

    // the entity cache
    // entities are keyed by object_type
    var cache = {};

    // handle content:entity requests
    app.reqres.setHandler("content:entity", function(options) {
      contract(options, "object_type");

      // get the cached entity
      var entity = cache[options.object_type];

      // if there is no entity, create a new one, empty if desired.
      if (!entity) {
        var object_type = options.object_type;

        // if a custom create was specified, use that
        if (options.create) {
          entity = cache[object_type] = options.create(options);
        } else {
          options = options.emptyOnNew ? { object_type: "empty" } : options;
          entity = cache[object_type] = entities.createCollection(options);
        }
      }

      return entity;
    });

  });