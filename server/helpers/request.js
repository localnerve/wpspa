/*
 * request.js
 * Perform a server to server request.
 */

var http = require("http");

module.exports = function(hostname, port, path) {

  return function(callback) {
    req = http.request({
      hostname: hostname,
      port: port,
      path: path
    }, function(res) {
      var buffer = "";
      res.on("data", function(chunk) {
        buffer += chunk;
      });
      res.on("end", function() {
        callback(null, JSON.parse(buffer));
      });
    });

    req.on("error", function(err) {
      callback(err, null);
    });

    req.end();
  };

};