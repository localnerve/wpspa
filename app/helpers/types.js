/*
 * A collection of methods to assist dealing with types
 */
define(function() {
  /*
   * Get the base object type from object_type
   */
  function baseObjectType(object_type) {
    return object_type.split(":")[0];
  }

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
    objectTypes: objectTypes
  };
});