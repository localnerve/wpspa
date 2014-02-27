/*
 * Worker process configuration
 *
 * A set of configuration values for worker processes
 */

module.exports = {
    // html snapshots constant configuration
    htmlSnapshots: {
      input: "array",
      outputDirClean: true,
      timeout: 30000,
      selector: "#content .page-content",
      phantomjs: "phantomjs", // global phantomjs
      processLimit: 1
    }
};