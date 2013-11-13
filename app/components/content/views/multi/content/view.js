/*
 * multiView
 * A view of multiple posts
 */
define([
  "backbone.marionette",
  "helpers/contract",
  "components/content/entities/main",
  "components/content/views/multi/content/item"
], function(Marionette, contract, entities, itemView) {

  var MultiPostView = Marionette.CollectionView.extend({
    className: "post-container",
    itemView: itemView,

    getEmptyView: function() {
      if (this.options.params) {
        contract(this.options.params, "empty.view");
        return this.options.params.empty.view();
      }
      return undefined;
    }
  });

  return {
    create: function(options) {
      options = options || { object_type: "post" };

      // If options.collection exists, then make the view from that
      // otherwise, if options.model.collection was supplied, then make the view from that
      // otherwise, create the collection from the options
      return new MultiPostView({
        collection:
          options.collection ||
          (options.model && options.model.collection ?
            options.model.collection : entities.createCollection(options)
          ),
        params: options.params
      });
    }
  };
});
