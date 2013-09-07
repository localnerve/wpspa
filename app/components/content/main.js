/*
 * content/main
 * The content view message handler
 */
define([
  "app",
  "components/content/post/simpleView"
  ], function(app, post) {

    app.reqres.setHandler("content:view:post", function() {
      return post;
    });

    app.reqres.setHandler("content:view:page", function() {
      return post;
    });

    app.reqres.setHandler("content:view:category", function() {
      // TODO: implement
      return null;
    });

  });