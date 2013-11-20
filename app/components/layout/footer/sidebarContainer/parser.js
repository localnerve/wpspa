// parser for sidebar widgets
define([
  "lodash",
  "jquery",
  "app",
  "helpers/contract",
  "helpers/routes",
  "helpers/content",
  "resources/strings"
], function(_, $, app, contract, routesLib, contentLib, strings) {

  // update the category content
  function updateCategories(content) {
    // for now, we are not supporting uncategorized
    return contentLib.alterContent(content, "li a:contains('Uncategorized')", function(el) {
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
          el.href = el.href.replace(/#comment(?:[^\"']+)/i, "comment");
      });
    } else {
      return content;
    }
  }

  function prepareArchiveRoute(type, routes, id, path) {
    var slug = id.replace("/", "-");
    routes.push({
      name: slug,
      route: routesLib.hrefToRoute(path),
      params: {
        header: {
          message: function(model) {
            return strings.content.multi.header.monthlyArchives +
              model.get("title").replace(/(\d+)\/(\d+)/, function(m, m1, m2) {
                return strings.content.months[parseInt(m2, 10)] + " " +m1;
              });
          }
        }
      },
      options: {
        object_type: type+":"+slug,
        object_id: id
      }
    });
  }

  function addArchiveRoutes(type, routes) {
    // prefetch the items
    app.vent.trigger("content:prefetch", _.map(routes, function(route) {
      return route.options;
    }));
    // add the routes
    _.each(routes, function(route) {
      app.vent.trigger("wpspa:router:addRoute", route);
    });
  }

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

  // parse a single widget to a model
  function parseWidget(widget) {
    contract(widget, "id", "widget", "params.before_widget", "params.after_widget", "params.widget_name");

    // strip off the before/after widget content
    var content = widget.widget.replace(widget.params.before_widget, "");
    var last = content.lastIndexOf(widget.params.after_widget);
    content = content.substr(0, last);

    // process specific widget types
    switch(widget.params.widget_name.toLowerCase()) {
      case "search":
        content = updateSearch(content);
        break;

      case "categories":
        content = contentLib.alterLinks(app.root, updateCategories(content));
        break;

      case "recent comments":
        content = contentLib.alterLinks(app.root, updateComments(content));
        break;

      case "recent posts":
        content = contentLib.alterLinks(app.root, content);
        break;

      case "archives":
        var archiveRoutes = [];
        content = contentLib.alterLinks(app.root, content, _.partial(prepareArchiveRoute, "date", archiveRoutes));
        addArchiveRoutes("date", archiveRoutes);
        break;

      default:
        break;
    }

    return {
      id: widget.id,
      content: content
    };
  }

  // parse a response containing wpspa nav_menu_item posts

  function parse(data) {
    contract(data, "widgets");

    // make the models and give them back to the collection
    return _.map(data.widgets, function(widget) {
      return parseWidget(widget);
    });
  }

  return parse;
});