/*
 * content.js
 *
 * A module of methods to assist content updates
 */
define([
  "jquery",
  "module"
], function($, module) {

  // The hostname of the backend
  var backendHostname = module.config().backendHostname;

  // Selects elements from content using selector, then calls the callback for each
  //   Callback is passed the DOM element selected
  //   Callback must modify content
  //   Returns the aggregate modified content result
  function alterContent(content, selector, callback) {
    if (callback) {
      var tmp = $("<div>"+content+"</div>");
      tmp.find(selector).each(function(i ,el) {
        callback(el);
      });
      content = tmp.html();
      tmp.empty();
    }
    return content;
  }

  // Finds all hrefs in content and replaces the protocol and host with appRoot 
  //  and removes any trailing /. If not protocol/host found, still process
  //   If a callback is supplied, it is called given the arguments:
  //     1) All of the URI matched after "http://host/" (if found), no trailing /
  //     2) appRoot prepended to argument 1
  //     3) The host portion of the URI
  //     If the callback returns true, the link is not altered
  //   The callback cannot directly modify the link result
  // Returns all content containing the modified link results
  function alterLinks(appRoot, content, callback) {
    return content.replace(/(href=(?:\"|'))(https?:\/\/([^\/?#]+))?(?:[\/?#])?([^\"']+)/ig,
      function(match, m1, m2, host, last) {
        if (last.charAt(last.length-1) === '/') {
          last = last.substr(0, last.length-1);
        }
        var result = host ? match : last;
        var hostOK = host && host.indexOf(backendHostname) !== -1;
        if (!host || hostOK) {
          result = m1+appRoot+last;
          if (callback && callback(last, appRoot+last)) {
            result = host ? match : last;
          }
        }
        return result;
      });
  }

  return {
    alterContent: alterContent,
    alterLinks: alterLinks
  };
});
