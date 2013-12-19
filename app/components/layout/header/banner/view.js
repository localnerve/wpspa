define([
  "lodash",
  "backbone.marionette",
  "components/layout/header/banner/entities"
], function(_, Marionette, entities) {
    
  // The definition of the banner view
  var BannerView = Marionette.ItemView.extend({
    template: "components/layout/header/banner/view",
    className: "main-circle",
    attributes: {
      role: "banner"
    },

    serializeData: function() {
      return {
        name: this.model.get('name'),
        description: this.model.get('description')
      };
    }
  });

  return {
    create: function(options) {
      options = options || {};
      return new BannerView(_.extend({
        model: options.model || entities.create()
      }, options));
    }
  };
});