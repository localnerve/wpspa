define([
  "backbone.marionette",
  "helpers/contract",
  "components/content/views/multi/header",
  "components/content/views/multi/content"
], function(Marionette, contract, Header, Content) {

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

    onRender: function() {
      var content = Content.create(this.options);

      if (this.options.params && this.options.params.header) {
        contract(this.options.params.header, "empty", "view.message", "view.replacement", "view.query");

        var headerMessage = this.options.params.header.empty;
        if (content.collection.length > 0) {
          headerMessage = this.options.params.header.view.message.replace(
            this.options.params.header.view.replacement,
            this.options.params.header.view.query
            );
        }
        this.ui.header.removeClass("hide");
        this.header.show(Header.create({ headerMessage: headerMessage }));
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