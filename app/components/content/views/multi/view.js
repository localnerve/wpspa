/*
 * multi view layout
 *
 * Multi views have an optional header region.
 */
define([
  "backbone.marionette",
  "components/content/views/multi/header",
  "components/content/views/multi/content"
], function(Marionette, Header, Content) {

  var MultiPostLayout = Marionette.Layout.extend({
    template: "components/content/views/multi/view",
    className: "page-layout",

    ui : {
      header: ".page-header"
    },

    regions: {
      header: ".page-header",
      content: ".page-content"
    },

    initialize: function(options) {
      this.headerParams = options.params ? options.params.header : undefined;
    },

    onRender: function() {
      var content = Content.create(this.options);

      if (this.headerParams) {
        this.ui.header.removeClass("hide");
        this.header.show(Header.create({
          headerMessage: this.headerParams.message(content.collection.length)
        }));
      } else {
        this.ui.header.addClass("hide");
        this.header.close();
      }
      this.content.show(content);
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