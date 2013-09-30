// parser for sidebar widgets
define([
  "lodash",
  "jquery",
  "app",
  "helpers/contract",
  "helpers/anchor"
], function(_, $, app, contract, anchor) {

  // helper to alter content
  function alterContent(content, selector, callback) {
    if (callback) {
      var tmp = $("<div id='_alter-content'>"+content+"</div>").appendTo("body");
      $("#_alter-content "+selector).each(function(i ,el) {
        callback(el);
      });
      content = tmp.html();
      tmp.remove();
    }
    return content;
  }

  // replace the protocol and host with app.root and remove any trailing /
  function updateLinks(content, callback) {
    return content.replace(/(href=(?:\"|'))(https?:\/\/[^\/]+\/)([^\"']+)/ig,
      function(match, m1, m2, last) {
        if (last.charAt(last.length-1) === '/')
          last = last.substr(0, last.length-1);
        var result = m1+app.root+last;
        if (callback) callback(last, app.root+last);
        return result;
      });
  }

  // update the category content
  function updateCategories(content) {
    // for now, we are not supporting uncategorized
    return alterContent(content, "li a:contains('Uncategorized')", function(el) {
      // protect ourselves against jquery
      if (el && el.parentNode && typeof el.parentNode.remove === "function")
        el.parentNode.remove();
    });
  }

  // update comment content
  function updateComments(content) {
    if (app.pushState) {
      // for now, just change a comment link to a supported link
      return alterContent(content, "a[href]", function(el) {
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
      route: anchor.hrefToRoute(path),
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

  // parse a single widget to a model
  function parseWidget(widget) {
    contract(widget, "id", "widget", "params.before_widget", "params.after_widget", "params.widget_name");

    // strip off the before/after widget content
    var content = widget.widget.replace(widget.params.before_widget, "");
    var last = content.lastIndexOf(widget.params.after_widget);
    content = content.substr(0, last);

    // process specific widget types
    switch(widget.params.widget_name.toLowerCase()) {
      case "categories":
        content = updateLinks(updateCategories(content));
        break;

      case "recent comments":
        content = updateLinks(updateComments(content));
        break;

      case "recent posts":
        content = updateLinks(content);
        break;

      case "archives":
        var archiveRoutes = [];
        content = updateLinks(content, _.partial(prepareArchiveRoute, "date", archiveRoutes));
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
