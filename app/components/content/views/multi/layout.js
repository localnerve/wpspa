define([
  "backbone.marionette",
  "components/content/views/multi/header",
  "components/content/views/multi/content"
], function(Marionette, Header, Content) {

  var MultiPostLayout = Marionette.Layout.extend({
    template: "components/content/views/multi/layout",
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
    }
  });

  return {
    create: function(options) {
      return new MultiPostLayout(options);
    }
  };
});