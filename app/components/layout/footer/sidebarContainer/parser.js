// parser for sidebar widgets
define([
  "lodash",
  "helpers/contract"
], function( _, contract) {

  // parse a single widget to a model
  function parseWidget(widget) {
    contract(widget, "id", "widget", "params.before_widget", "params.after_widget");

    var content = widget.widget.replace(widget.params.before_widget, "");
    var last = content.lastIndexOf(widget.params.after_widget);
    content = content.substr(0, last);

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
