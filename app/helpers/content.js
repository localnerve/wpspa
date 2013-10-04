/*
 * content.js
 *
 * A module of methods to assist content updates
 */
define([
  "jquery"
], function($) {

  // Selects elements from content using selector, then calls the callback for each
  //   Callback is passed the DOM element selected
  //   Callback must modify content
  //   Returns the aggregate modified content result
  function alterContent(content, selector, callback) {
    if (callback) {
      var tmp = $("<div id='_alter-content'>"+content+"</div>").appendTo("body");
      $("#_alter-content "+selector).each(function(i ,el) {
        callback(el);
      });
      content = tmp.html();
      tmp.remove();
    }
    return content;
  }

  // Finds all hrefs in content and replaces the protocol and host with appRoot and removes any trailing /
  //   If a callback is supplied, it is called given the arguments:
  //     1) All of the URI matched after "http://host/"
  //     2) appRoot prepended to argument 1
  //   Callback cannot modify the link result
  //   Returns the modified link result
  function alterLinks(appRoot, content, callback) {
    return content.replace(/(href=(?:\"|'))(https?:\/\/[^\/]+\/)([^\"']+)/ig,
      function(match, m1, m2, last) {
        if (last.charAt(last.length-1) === '/')
          last = last.substr(0, last.length-1);
        var result = m1+appRoot+last;
        if (callback) callback(last, appRoot+last);
        return result;
      });
  }

  return {
    alterContent: alterContent,
    alterLinks: alterLinks
  };
});
