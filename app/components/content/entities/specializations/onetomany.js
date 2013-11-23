/*
 * onetomany
 * A OneToMany model has attributes and a collection, but is itself not part of a collection.
 * OneToMany models are standalone "directories" for collections of post types.
 * This takes advantage of the fact that Backbone models always have a collection
 * property that points back to the collection they belong to, but OneToMany models
 * can't belong to any collection.
 */
define([
  "lodash",
  "backbone"
], function(_, Backbone) {
  
  // Definition of a one-to-many model
  var OneToManyModel = Backbone.Model.extend({
    
    // Since we're really just a directory for posts,
    // Return this directory if appropriate.
    get: function(attr) {
      if (_.isObject(attr)) {
        return this;
      }
      return this.attributes[attr];
    },

    createCollection: function(models) {
      // we can do this because this is not part of a real collection
      this.collection = new Backbone.Collection(models);
    },

    destroyCollection: function() {
      if (this.collection) {
        this.collection.remove(this.collection.models);
        delete this.collection;
      }
    }
  });

  return OneToManyModel;
});