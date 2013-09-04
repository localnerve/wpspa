// parser for wordpress json api
define([
  "lodash",
  "helpers/contract"
], function(_, contract) {

  // parse a single post to a model
  function parsePost(post) {
    contract(post, "id", "title", "content", "excerpt");

    return {
      id: post.id,
      title: post.title,
      content: post.content,
      excerpt: post.excerpt
    };
  }

  // parse a response containing json api posts

  function parse(data) {
    contract(data, "posts");

    // make the models and give them back to the collection
    return _.map(data.posts, function(post) {
      return parsePost(post);
    });
  }

  return parse;
});
