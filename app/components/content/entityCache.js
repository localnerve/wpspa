/*
 * entityCache
 *
 * Contains the entity cache and method(s) for retreival
 */
define([
  "lodash",
  "helpers/contract",
  "components/content/entities/main"
], function(_, contract, entities) {

  // The entity cache. Entities are keyed by object_type.
  var cache = {};

  // Create and cache a new default entity
  function createDefaultEntity(options) {
    // If an empty entity was requested, honor that
    options = options.emptyOnNew ? { object_type: "empty" } : options;
    return entities.createCollection(options);
  }

  // Create and cache a new custom entity
  function createCustomEntity(options) {
    var entity;
    if (_.isFunction(options.create)) {
      entity = options.create(options);
    }
    return entity;
  }

  // Create an entity. First try custom, if none specified create default.
  function createEntity(options) {
    return createCustomEntity(options) || createDefaultEntity(options);
  }

  // If options.create is specified, it creates the entity.
  function getEntity(options) {
    contract(options, "object_type");

    // get the cached entity
    var entity = cache[options.object_type];

    // if there is no entity, create a new one.
    if (!entity) {
      entity = cache[options.object_type] = createEntity(options);
    }

    return entity;
  }

  // remove an entity from the cache
  function removeEntity(options) {
    contract(options, "object_type");

    // get the cached entity
    var entity = cache[options.object_type];

    // if there is an entity, evict it and destroy it.
    if (entity) {
      delete cache[options.object_type];
    }

    return entity;
  }

  return {
    getEntity: getEntity,
    removeEntity: removeEntity
  };
});