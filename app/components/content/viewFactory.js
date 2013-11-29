/*
 * viewFactory
 *
 * Gets a factory that creates a view by type.
 *
 * Caller can override the default view factory by one of the following ways (in order of preference):
 * 1) Specify a custom view factory (a constructor function) in the input options depending on the view type.
 *    View type can be 'content', 'progress', or 'error'.
 * 2) Register a view factory with the application via reqres.setHandler. 
 *    The request format will be
 *      view:<content | progress | error>:<object_type>
 *        Example Request: view:content:myCustomWordpressPostType
 *
 * Custom view factories should NOT "new" the views when the constructor is called.
 *   Instead, return an object with a "create" method that does this.
 */
define([
  "lodash",
  "helpers/contract",
  "helpers/types",
  "app",
  "components/content/views/main"
], function(_, contract, types, app, viewTypes) {

  function getDefaultViewFactory(options, viewType) {
    var defaultViewFactory = viewTypes[viewType];
    return defaultViewFactory.getView(options.options);
  }

  // If a viewType factory was registered with the application, use that
  function getHandlerViewFactory(options, viewType) {
    contract(options, "options.object_type");

    var viewFactory;
    
    var objectType = types.baseObjectType(options.options.object_type);
    
    var viewFactoryRequest = "view:"+viewType+":"+objectType;
    
    if (app.reqres.hasHandler(viewFactoryRequest)) {
      viewFactory = app.request(viewFactoryRequest, options);
    }
    
    return viewFactory;
  }

  // If a viewType factory was specified in options, use that
  function getInputViewFactory(options, viewType) {
    var viewFactory;

    if (_.isFunction(options[viewType])) {
      viewFactory = options[viewType](options.options);
    }

    return viewFactory;
  }

  function getViewFactory(options, viewType) {
    return getInputViewFactory(options, viewType) ||
           getHandlerViewFactory(options, viewType) ||
           getDefaultViewFactory(options, viewType);
  }

  return {
    getViewFactory: getViewFactory
  };
});