/**
 * A collection of methods to assist dealing with types
 */
define(function() {

  // Get the base object type from object_type
  function baseObjectType(object_type) {
    return object_type.split(":")[0];
  }

  // Produce a selector name from an object_id
  function objectIdType(id) {
    return parseInt(id, 10) ? "id" : "slug";
  }

  // Produce a qualified object_type from a slug
  var objectTypes = {
    category: function(slug) {
      return "category:"+slug;
    },
    date: function(slug) {
      return "date:"+slug;
    }
  };

  return {
    baseObjectType: baseObjectType,
    objectTypes: objectTypes,
    objectIdType: objectIdType
  };
});