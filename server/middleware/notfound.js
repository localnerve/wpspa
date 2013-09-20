/*
 * http notfound middleware
 * for use with connect/express
 */
var fs = require("fs");
var path = require("path");

function four04(req, res, next) {
  res.statusCode = 404;
  
  var accept = req.headers.accept || '';
  if (~accept.indexOf("html")) {
    var path404 = path.normalize(__dirname + "../../../../404.html");
    fs.readFile(path404, { encoding: "utf8" }, function(e, html) {
      res.setHeader("Content-Type", "text/html; charset=utf-8");
      res.end(html);
    });
  } else if (~accept.indexOf("json")) {
    var json = "{ error: \"not found\" }";
    res.setHeader("Content-Type", "application/json");
    res.end(json);
  } else {
    res.writeHead(res.statusCode, { "Content-Type": "text/plain" });
    res.end(req.url + " was not found on this server");
  }
}

module.exports = {
  four04: four04
};