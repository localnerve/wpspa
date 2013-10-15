/*
 * atf.js
 *
 * The purpose of this worker is to retrieve the ATF content from the backend and inline it.
 * This decouples the back-end from the front-end for ATF content thereby removing any 
 * back-end slowness from the equation.
 * The more often you run it, the more up-to-date the ATF content from frontend is with the backend.
 */
var fs = require("fs");
var path = require("path");
var async = require("async");
var request = require("../../../helpers/request");
var Config = require("../../../config");

var config = new Config(process.env.NODE_ENV || "development");

/**
 * Update the target with the remote atf content
 * target is the path to the target file
 * success is a callback that is called if the operation succeeds, else throws error.
 */
function update(target, success) {
  // start the atf content requests in parallel
  async.parallel({
    navigation: request(config.proxy.host, config.proxy.port, config.navigationPath),
    // banner: request(config.proxy.host, config.proxy.port, config.bannerPath),
    footer: request(config.proxy.host, config.proxy.port, config.footerPath),
    recent: request(config.proxy.host, config.proxy.port, config.recentPath)
  },
  // When they complete, update the target
  function(errorAsync, results) {
    
    if (errorAsync) throw errorAsync;

    fs.readFile(target, { encoding: "utf8" }, function(errorRead, html) {
      if (errorRead) throw errorRead;

      var scriptStart = "<script>var wpspa=",
          scriptEnd = "</script></body>";

      // remove any existing bootstrapped results
      html = html.replace(new RegExp(scriptStart+".+</script></body>"), "</body>");

      // write the new target file
      fs.writeFile(
        target,
        html.replace("</body>", scriptStart+JSON.stringify(results)+";"+scriptEnd),
        { encoding: "utf8" },
        function(errorWrite) {
          if (errorWrite) throw errorWrite;
          if (success) success();
        }
      );
    });
  });
}

module.exports = {
  update: update
};