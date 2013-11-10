define([
  "backbone.marionette",
  "resources/strings"
], function(Marionette, strings) {

  var NavigationItemView = Marionette.ItemView.extend({
    template: "components/content/views/single/navigation/item",
    tagName: "li",
    initialize: function() {
      this.strings = strings.content.single.navigation;
    },
    styleItemView: function() {
      var title = this.model.get("title");
      if (!title) { // this should not be required... TODO: fix
        this.$el.css("display", "none");
      }
    },
    onRender: function() {
      this.styleItemView();
    },
    textRel: function() {
      return this.options.next ? "next" : "prev";
    },
    textEntity: function() {
      return this.options.next ? this.strings.nextEntity : this.strings.previousEntity;
    },
    serializeData: function() {
      return {
        href: this.model.get("route"),
        text: this.model.get("title"),
        rel: this.textRel(),
        entity: this.textEntity()
      };
    }
  });

  return NavigationItemView;
});