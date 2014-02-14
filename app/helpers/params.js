/**
 * params.js
 *
 * Helper methods and objects for request parameters
 */
define([
  "lodash",
  "helpers/types",
  "server/config/common"
], function(_, types, common) {
  
  // Standard meta parameters for a request
  var meta = {
    custom_fields: common.customFieldsParam
  };

  // Methods for creating params for fetching WP posts for a collection
  var collection = {
    id: function(ids) {
      var index = 0;
      // create the post__in WP_Query filter for these items, URI encoded
      var params = _.map(ids, function(value) {
        return "post__in%5B"+(index++)+"%5D="+value;
      });
      return params.join("&");
    },
    slug: function(names) {
      if (names.length > 1) throw new Error("WP Query does not support multiple slugs");
      return "name="+encodeURIComponent(names[0]);
    }
  };

  // Create a typed id
  function typedId(id, uri) {
    var result = {};
    if (uri)
      result[types.objectIdType(id)] = encodeURIComponent(id);
    else
      result[types.objectIdType(id)] = parseInt(id, 10) || id;
    return result;
  }

  return {
    meta: meta,
    collection: collection,
    typedId: typedId
  };
});