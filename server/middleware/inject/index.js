/*
 * The main index content injector
 * Bootstraps specfic backend content into the main index.html
 * We do this to save requests over mobile networks for ATF content
 */
var async = require("async");
var Config = require("../../config");
var request = require("./request");

var config = new Config(process.env.NODE_ENV || "development");

// If serving index.html...
function condition(req, res) {
  return (req.path.indexOf("index.html") !== -1);
}

// ...Respond by bootstrapping some of the content
function responder(callback, data, req, res) {
  // Start parallel requests
  async.parallel({
    navigation: request(config.proxy.host, config.proxy.port, config.navigationPath),
    // banner: request(config.proxy.host, config.proxy.port, config.bannerPath),
    footer: request(config.proxy.host, config.proxy.port, config.footerPath),
    recent: request(config.proxy.host, config.proxy.port, config.recentPath)
  },
  // When they complete, inject the content
  function(err, results) {
    callback(
      err,
      data.toString().replace("</body>",
        "<script>var wpspa="+JSON.stringify(results)+";</script></body>")
    );
  });
}

module.exports = {
  condition : condition,
  responder : responder
};