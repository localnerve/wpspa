define([
  "backbone.marionette",
  "app",
  "resources/strings"
], function(Marionette, app, strings) {

  var NavigationItemView = Marionette.ItemView.extend({
    template: "components/content/views/content/single/navigation/item",
    tagName: "li",
    events: {
      "click a": "navigate"
    },
    initialize: function() {
      this.strings = strings.content.single.navigation;
    },
    onBeforeRender: function() {
      if (this.options.next) {
        this.transition = "single-page-rtl";
        this.$el.addClass("next");
      } else {
        this.transition = "single-page-ltr";
        this.$el.addClass("previous");
      }
    },
    navigate: function() {
      app.vent.trigger("view:transition", {
        transition: this.transition
      });
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