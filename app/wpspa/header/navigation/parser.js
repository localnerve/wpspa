// parser for wpspa wordpress plugin nav_menu_item Wordpress type posts
define([
  "lodash",
  "helpers/contract"
  ], function(_, contract) {
  
  // parse a single wpspa nav_menu_item post to a model
  function parsePost(post) {
    contract(post, "id",
      "custom_fields._menu_item_wpspa_menu_text",
      "custom_fields._menu_item_wpspa_route",
      "custom_fields._menu_item_wpspa_post_type",
      "custom_fields._menu_item_wpspa_object_id",
      "custom_fields._menu_item_menu_item_parent"
    );
    var model = {
      name: post.custom_fields._menu_item_wpspa_menu_text[0],
      route: (function() {
        var route = post.custom_fields._menu_item_wpspa_route[0];
        
        if (route.charAt(0) === '/')
          route = route.substring(1);
        
        return route;
      }()),
      id: post.id,
      nav_item: post.id,
      object_type: post.custom_fields._menu_item_wpspa_post_type[0],
      object_id: post.custom_fields._menu_item_wpspa_object_id[0],
      parent: post.custom_fields._menu_item_menu_item_parent[0]
    };
    return model;
  }

  // parse a response containing wpspa nav_menu_item posts
  function parse(data) {
    contract(data, "posts");

    // make the models and give them back to the collection
    return _.map(data.posts, function(post) {
      return parsePost(post);
    });
  }

  return parse;
});