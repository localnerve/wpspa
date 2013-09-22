/*
 * Parser for Wordpress json api posts
 */
define([
  "lodash",
  "helpers/contract"
], function(_, contract) {

  // parse a single post
  function parsePost(post) {
    contract(post, "date");

    return _.extend({
      // convenience datetime property converts date to YYYY-MM-DDTHH:MM:SS+00:00
      datetime: post.date.replace(" ", "T")+"+00.00"
    }, post);
  }

  // parse response data from json api
  function parse(data) {

    if (data.posts) {
      // make the models and give them back to the collection
      return _.map(data.posts, function(post) {
        return parsePost(post);
      });
    } else if (data.post) {
      return parsePost(data.post);
    } else {
      throw new Error("Unexpected response data format");
    }
  }

  return parse;
});
