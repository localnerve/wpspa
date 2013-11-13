/*
 * multi view layout
 *
 * Multi views show many posts and have an optional header region.
 */
define([
  "backbone.marionette",
  "components/content/views/multi/header/view",
  "components/content/views/multi/content/view"
], function(Marionette, Header, Content) {

  var MultiPostLayout = Marionette.Layout.extend({
    template: "components/content/views/multi/view",
    className: "page-layout",
    regions: {
      header: ".page-header",
      content: ".page-content"
    },
    initialize: function(options) {
      this.headerParams = options.params ? options.params.header : undefined;
    },
    onRender: function() {
      if (this.headerParams) {
        this.header.show(Header.create({
          headerMessage: this.headerParams.message(this.model),
          headerMeta: this.model.get("description")
        }));
      }
      this.content.show(Content.create(this.options));
    },

    onTransitionOpenBefore: function() {
      this.$el.hide();
      this.$el.addClass("multi-page-transition");
    },
    onTransitionOpenAfter: function(options) {
      this.$el.addClass("multi-page-transition-"+(options.count % 2));
      this.$el.show();
    }
  });

  return {
    create: function(options) {
      return new MultiPostLayout(options);
    }
  };
});