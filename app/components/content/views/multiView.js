/*
 * multiView
 * A view of multiple posts
 */
define([
  "backbone.marionette",
  "components/content/views/item",
  "components/content/entities/main"
], function(Marionette, itemView, entities) {

  var MultiPostView = Marionette.CollectionView.extend({
    className: "multiple-posts",
    itemView: itemView
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
          )
      });
    }
  };
});
