// parser for sidebar widgets
define([
  "lodash",
  "jquery",
  "app",
  "helpers/contract",
  "helpers/routes",
  "helpers/content",
  "helpers/types",
  "resources/strings"
], function(_, $, app, contract, routesLib, contentLib, types, strings) {

  // update the category content
  function updateCategories(content) {
    // for now, we are not supporting uncategorized
    return contentLib.alterContent(content, "li a[href*='uncategorized']", function(el) {
      var $el = $(el);
      $el.parent().remove();
    });
  }

  // update comment content
  function updateComments(content) {
    if (app.pushState) {
      // for now, just change a comment link to a supported link
      return contentLib.alterContent(content, "a[href]", function(el) {
        if (el && el.href)
          el.href = el.href.replace(/#comment(?:[^\"']+)/i, routesLib.comments.actions.comment);
      });
    } else {
      return content;
    }
  }

  // update search content
  function updateSearch(content) {
    // remove the method and action from the search form
    return contentLib.alterContent(content, "form.search-form", function(el) {
      var $el = $(el);
      $el.removeAttr("method");
      $el.removeAttr("action");
      
      // add required to search input
      var $search = $el.find(".search-field");
      $search.prop("required", true);
      $search.attr("aria-required", true);
    });
  }

  function prepareArchiveRoute(type, routes, id, path) {
    var routeParam = {
      name: id,
      route: routesLib.hrefToRoute(path),
      params: {
        header: {
          message: routesLib.archives.archiveHeader[type]
        }
      }
    };

    if (_.isFunction(routesLib.archives.archiveOptions[type])) {
      routeParam.options = routesLib.archives.archiveOptions[type](id, routeParam.route);
    }

    routes.push(routeParam);
  }

  // filter the content for the various widget supported types
  var widgetFilter = {
    search: function(content) {
      return updateSearch(content);
    },
    categories: function(content) {
      var archiveRoutes = [];
      content = contentLib.alterLinks(
        app.root, updateCategories(content), _.partial(prepareArchiveRoute, "category", archiveRoutes)
      );
      routesLib.addRoutes(app.vent, archiveRoutes);
      return content;
    },
    "recent comments": function(content) {
      return contentLib.alterLinks(app.root, updateComments(content));
    },
    "recent posts": function(content) {
      return contentLib.alterLinks(app.root, content);
    },
    archives: function(content) {
      var archiveRoutes = [];
      content = contentLib.alterLinks(
        app.root, content, _.partial(prepareArchiveRoute, "date", archiveRoutes)
      );
      routesLib.addRoutes(app.vent, archiveRoutes, true);
      return content;
    }
  };

  // parse a single widget to a model
  function parseWidget(widget) {
    contract(widget, "id", "widget", "params.before_widget", "params.after_widget", "params.widget_name");

    // strip off the before/after widget content
    var content = widget.widget.replace(widget.params.before_widget, "");
    var last = content.lastIndexOf(widget.params.after_widget);
    content = content.substr(0, last);

    // process specific widget types
    var widgetType = widget.params.widget_name.toLowerCase();
    if (_.isFunction(widgetFilter[widgetType])) {
      content = widgetFilter[widgetType](content);
    }

    return {
      id: widget.id,
      content: content
    };
  }

  // parse a response containing wordpress widgets

  function parse(data) {
    contract(data, "widgets");

    // make the models and give them back to the collection
    return _.map(data.widgets, function(widget) {
      return parseWidget(widget);
    });
  }

  return parse;
});