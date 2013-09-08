// parser for a single Wordpress json api post
define([
  "helpers/contract"
], function(contract) {

  // parse a response containing a post
  function parse(data) {
    contract(data,
      "post.title",
      "post.content",
      "post.excerpt",
      "post.date",
      "post.categories",
      "post.tags",
      "post.author"
    );

    return {
      title: data.post.title,
      content: data.post.content,
      excerpt: data.post.excerpt,
      date: data.post.date,
      categories: data.post.categories,
      tags: data.post.tags,
      author: data.post.author
    };
  }

  return parse;
});
