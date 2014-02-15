// parser for wpspa wordpress plugin nav_menu_item Wordpress type posts
define([
  "lodash",
  "helpers/contract",
  "helpers/routes"
], function(_, contract, routes) {

  // parse a single wpspa nav_menu_item post to a model
  function parsePost(post) {
    contract(post, "id",
      "custom_fields._menu_item_wpspa_menu_text.0",
      "custom_fields._menu_item_wpspa_route.0",
      "custom_fields._menu_item_menu_item_parent.0",
      "custom_fields._menu_item_wpspa_post_type.0",
      "custom_fields._menu_item_wpspa_object_id.0",
      "custom_fields._menu_item_wpspa_object_props",
      "custom_fields._menu_item_wpspa_object_links"
    );
    return {
      name: post.custom_fields._menu_item_wpspa_menu_text[0],
      route: routes.hrefToRoute(post.custom_fields._menu_item_wpspa_route[0]),
      id: post.id,
      nav_item: post.id,
      parent: post.custom_fields._menu_item_menu_item_parent[0],
      object_type: post.custom_fields._menu_item_wpspa_post_type[0],
      object_id: post.custom_fields._menu_item_wpspa_object_id[0],
      object_props: post.custom_fields._menu_item_wpspa_object_props,
      object_links: post.custom_fields._menu_item_wpspa_object_links
    };
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
