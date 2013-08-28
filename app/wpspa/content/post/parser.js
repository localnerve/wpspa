// parser for a single Wordpress json api post
define([
  "helpers/contract"
  ], function(contract) {
  
  // parse a response containing a post
  function parse(data) {
    contract(data, "post", "post.content");

    return {
      title: data.post.title,
      content: data.post.content,
      excerpt: data.post.excerpt
    };
  }

  return parse;
});