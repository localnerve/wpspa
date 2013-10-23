/*
 * http notfound middleware
 * for use with connect/express
 */
var fs = require("fs");
var path = require("path");
var config = require("../config").create(process.env.NODE_ENV || "development");

function serve404Html(res) {
  var path404 = path.join(__dirname, "/../../", config.four04File);
  fs.readFile(path404, { encoding: "utf8" }, function(e, html) {
    res.setHeader("Content-Type", "text/html; charset=utf-8");
    res.end(html);
  });
}

function serve404Json(req, res) {
  var json = "{ error: \""+req.url+" not found\" }";
  res.setHeader("Content-Type", "application/json");
  res.end(json);
}

function serve404Text(req, res) {
  res.writeHead(res.statusCode, { "Content-Type": "text/plain" });
  res.end(req.url + " was not found on this server");
}

function four04(req, res, next) {
  res.statusCode = 404;
  
  var accept = req.headers.accept || "";
  if (~accept.indexOf("html")) {
    serve404Html(res);
  } else if (~accept.indexOf("json")) {
    serve404Json(req, res);
  } else {
    serve404Text(req, res);
  }
}

module.exports = {
  four04: four04
};