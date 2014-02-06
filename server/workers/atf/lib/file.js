/**
 * file.js
 *
 * Methods to enable atf lib to operate on file resources.
 */
var fs = require("fs");
var script = require("./script");

/**
 * Update the target file with the remote atf content
 * target is the full path to the target file to update
 * callback signature: callback(err, target)
 */
function update(target, callback) {
  // callback for atf lib to update a file resource
  return function(err, results) {
    if (err) return callback(err, target);

    fs.readFile(target, { encoding: "utf8" }, function(errorRead, html) {
      if (errorRead) return callback(errorRead, target);

      html = script.stripBootstrappedResults(html);

      // update the target file
      fs.writeFile(
        target,
        html.replace(script.scriptExpression, function(match, startTag, content, endTag) {
          return startTag+script.makeScriptBody(results)+endTag;
        }),
        { encoding: "utf8" },
        function(errorWrite) {
          callback(errorWrite, target);
        }
      );
    });
  };
}

/**
 * Remove the remote atf content from the target file
 */
function remove(target, callback) {
  // read the target file
  fs.readFile(target, { encoding: "utf8" }, function(errorRead, html) {
    if (errorRead) return callback(errorRead, target);

    html = script.stripBootstrappedResults(html);

    // update the target file
    fs.writeFile(target, html, { encoding: "utf8" }, function(errorWrite) {
      callback(errorWrite, target);
    });
  });
}

module.exports = {
  update: update,
  remove: remove
};