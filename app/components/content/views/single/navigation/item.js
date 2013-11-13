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
    onBeforeRender: function() {
      if (this.options.next) {
        this.$el.addClass("next");
      } else {
        this.$el.addClass("previous");
      }
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