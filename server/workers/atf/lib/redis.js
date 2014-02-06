/**
 * redis.js
 *
 * Methods to enable atf lib to operate on redis.
 *
 */
var redis = require("../../../helpers/redis");
var script = require("./script");

/**
 * Update redis with the remote atf content
 * target is the path to the target file to update
 * callback signature: callback(err, key)
 */
function update(key, callback) {
  // callback for atf lib to update redis
  return function(err, results) {
    if (err) return callback(err, key);

    var redisClient = redis.client();

    redisClient.set(key, script.makeScriptBody(results), function(err) {
      callback(err, key);
      redisClient.quit();
    });
  };
}

function remove(key, callback) {
  var redisClient = redis.client();
  
  redisClient.del(key, function(err, reply) {
    callback(err, key);
    redisClient.quit();
  });
}

module.exports = {
  update: update,
  remove: remove
};