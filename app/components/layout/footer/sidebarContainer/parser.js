// parser for sidebar widgets
define([
  "lodash",
  "jquery",
  "app",
  "helpers/contract"
], function(_, $, app, contract) {

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
  function updateLinks(content) {
    return content.replace(/(href=(?:\"|'))(https?:\/\/[^\/]+\/)([^\"']+)/ig,
      function(match, m1, m2, last) {
        if (last.charAt(last.length-1) === '/')
          last = last.substr(0, last.length-1);
        return m1+app.root+last;
      });
  }

  // update the category content
  function updateCategories(content) {
    // for now, we are not supporting uncategorized
    return alterContent(content, "li a:contains('Uncategorized')", function(el) {
      // TODO: revisit why this doesn't work for test sometimes. had to rebuild mockapi.
      // Make more robust...
      if (el && el.parentNode && typeof el.parentNode.remove === "function")
        el.parentNode.remove();
    });
  }

  // update comment content
  function updateComments(content) {
    if (app.pushState) {
      // for now, just change a comment link to a supported link
      return alterContent(content, "a[href]", function(el) {
        el.href = el.href.replace(/#comment(?:[^\"']+)/i, "comment");
      });
    } else {
      return content;
    }
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
      case "archives":
        content = updateLinks(content);
        break;
      default:
        break;
    }

    var model = {
      id: widget.id,
      content: content
    };
    return model;
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
