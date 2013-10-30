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

  return {
    baseObjectType: baseObjectType
  };
});