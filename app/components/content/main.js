/*
 * content/main
 * The content message handler
 * Handles view and entity requests from the main content container.
 */
define([
  "lodash",
  "app",
  "helpers/contract",
  "helpers/types",
  "components/content/views/main",
  "components/content/transitions/main",
  "components/content/errors/main",
  "components/content/entities/main"
  ], function(_, app, contract, types, contentViews, transitionViews, errorViews, entities) {

    /**
     * Get a view type
     * Use a custom view factory if one was specified or found in the app, otherwise use the default
     *
     * Caller can override the default view factory by one of the following ways (in order of preference):
     * 1) Specify a custom view factory (a function) in the input options depending on the view type, this is either
     *    options.content or options.transition or options.error. The custom view factory will receive the options
     *    as input.
     * 2) Register a view factory with the application via reqres.setHandler. The request will be
     *    view:<content | transition | error>:<object_type>
     *      Example Request: view:content:myCustomWordpressPostType
     *
     * Custom view factories should NOT "new" the views. Instead, return an object with a "create" method that does this.
     */
    function getView(options, viewType, defaultViewFactory) {
      contract(options, "options", "options.object_type");

      var view;

      if (options[viewType]) {
        view = options[viewType](options.options);
      }
      else {
        var viewFactoryRequest = "view:"+viewType+":"+types.baseObjectType(options.options.object_type);

        if (app.reqres.hasHandler(viewFactoryRequest)) {
          view = app.request(viewFactoryRequest);
        }
        else {
          view = defaultViewFactory.getView(options.options);
        }
      }

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

    /**
     * Handle entity requests
     *
     * Entities are retrieved from cache or created. If options.create is specified, it is a function
     * that creates the entity. The create function is passed the input options.
     * If a options.create is not specified, the default entity creator is used.
     */
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