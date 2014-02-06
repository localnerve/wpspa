/**
 * script.js
 *
 * Script helpers for WPSPA
 */

// script helpers for WPSPA
var scriptExpression = /(<script id=(?:"|')wpspa-data-atf(?:"|')>)(.*)(<\/script>)/ig,
    scriptStart = "var wpspa=";

// remove any existing bootstrapped results from html
function stripBootstrappedResults(html) {
  return html.toString().replace(scriptExpression, function(match, startTag, content, endTag) {
    return startTag+endTag;
  });
}

// generate the contents of the atf script tag
function makeScriptBody(body) {
  return scriptStart+JSON.stringify(body)+";";
}

module.exports = {
  scriptExpression: scriptExpression,
  makeScriptBody: makeScriptBody,
  stripBootstrappedResults: stripBootstrappedResults
};