/*
 * http notfound middleware
 * for use with connect/express
 */
var fs = require("fs");
var path = require("path");

function serve404Html(res) {
  // TODO: make the path part of config
  var path404 = path.normalize(__dirname + "../../../../404.html");
  fs.readFile(path404, { encoding: "utf8" }, function(e, html) {
    res.setHeader("Content-Type", "text/html; charset=utf-8");
    res.end(html);
  });
}

function serve404Json(res) {
  var json = "{ error: \"not found\" }";
  res.setHeader("Content-Type", "application/json");
  res.end(json);
}

function serve404Text(res) {
  res.writeHead(res.statusCode, { "Content-Type": "text/plain" });
  res.end(req.url + " was not found on this server");
}

function four04(req, res, next) {
  res.statusCode = 404;
  
  var accept = req.headers.accept || "";
  if (~accept.indexOf("html")) {
    serve404Html(res);
  } else if (~accept.indexOf("json")) {
    serve404Json(res);
  } else {
    serve404Text(res);
  }
}

module.exports = {
  four04: four04
};