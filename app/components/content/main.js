/*
 * content/main
 * The content message handler
 * Handles view and entity requests from the main content container.
 */
define([
  "app",
  "components/content/entityCache",
  "components/content/viewFactory"
  ], function(app, entityCache, viewFactory) {

    // handle content:view requests
    app.reqres.setHandler("content:view", function(options) {
      return viewFactory.getViewFactory(options, "content");
    });

    // handle content:progress requests
    app.reqres.setHandler("content:progress", function(options) {
      return viewFactory.getViewFactory(options, "progress");
    });

    // handle content:error requests
    app.reqres.setHandler("content:error", function(options) {
      return viewFactory.getViewFactory(options, "error");
    });

    // handle content:entity requests. Creates or gets an entity.
    app.reqres.setHandler("content:entity", function(options) {
      return entityCache.getEntity(options);
    });

    // handle content:entity:remove requests. Returns the removed entity.
    app.reqres.setHandler("content:entity:remove", function(options) {
      return entityCache.removeEntity(options);
    });

    // handle content:entity:find requests. Returns the found entity or null.
    app.reqres.setHandler("content:entity:find", function(options) {
      return entityCache.findEntity(options);
    });

  });