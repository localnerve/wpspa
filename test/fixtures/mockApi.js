/*
 * connect middleware to mock the api
 */
module.exports = function(req, res, next) {
  if (req.url.indexOf("/api/wpspa/menu") === 0) {
    res.setHeader("Content-Type", "application/json");
    res.end(
      JSON.stringify({"status":"ok","count":4,"count_total":4,"pages":1,"posts":[{"id":59,"type":"nav_menu_item","slug":"home","url":"http:\/\/jsonapi.local\/home\/","status":"publish","title":"Home","title_plain":"Home","content":"","excerpt":"","date":"2013-08-15 21:49:29","modified":"2014-02-03 03:18:16","categories":[],"tags":[],"author":{"id":1,"slug":"jsonuser","name":"jsonuser","first_name":"","last_name":"","nickname":"jsonuser","url":"","description":""},"comments":[],"attachments":[],"comment_count":0,"comment_status":"open","custom_fields":{"_menu_item_menu_item_parent":["0"],"_menu_item_wpspa_route":["\/"],"_menu_item_wpspa_menu_text":["Home"],"_menu_item_wpspa_post_type":["recent"],"_menu_item_wpspa_object_id":["9999"],"_menu_item_wpspa_object_links":[],"_menu_item_wpspa_object_props":{"is_single":false,"prefetch":false}}},{"id":60,"type":"nav_menu_item","slug":"60","url":"http:\/\/jsonapi.local\/60\/","status":"publish","title":"","title_plain":"","content":"","excerpt":"","date":"2013-08-15 21:49:29","modified":"2014-02-03 03:18:16","categories":[],"tags":[],"author":{"id":1,"slug":"jsonuser","name":"jsonuser","first_name":"","last_name":"","nickname":"jsonuser","url":"","description":""},"comments":[],"attachments":[],"comment_count":0,"comment_status":"open","custom_fields":{"_menu_item_menu_item_parent":["0"],"_menu_item_wpspa_route":["\/sample-page"],"_menu_item_wpspa_menu_text":["Sample Page"],"_menu_item_wpspa_post_type":["page"],"_menu_item_wpspa_object_id":["2"],"_menu_item_wpspa_object_links":[],"_menu_item_wpspa_object_props":{"is_single":true,"prefetch":true}}},{"id":61,"type":"nav_menu_item","slug":"61","url":"http:\/\/jsonapi.local\/61\/","status":"publish","title":"","title_plain":"","content":"","excerpt":"","date":"2013-08-15 21:49:30","modified":"2014-02-03 03:18:16","categories":[],"tags":[],"author":{"id":1,"slug":"jsonuser","name":"jsonuser","first_name":"","last_name":"","nickname":"jsonuser","url":"","description":""},"comments":[],"attachments":[],"comment_count":0,"comment_status":"open","custom_fields":{"_menu_item_menu_item_parent":["0"],"_menu_item_wpspa_route":["\/page-two"],"_menu_item_wpspa_menu_text":["Page Two"],"_menu_item_wpspa_post_type":["page"],"_menu_item_wpspa_object_id":["11"],"_menu_item_wpspa_object_links":[{"id":76,"type":"page","name":"an-internal-page","href":"http:\/\/jsonapi.local\/an-internal-page\/","is_single":true,"prefetch":true}],"_menu_item_wpspa_object_props":{"is_single":true,"prefetch":true}}},{"id":68,"type":"nav_menu_item","slug":"68","url":"http:\/\/jsonapi.local\/68\/","status":"publish","title":"","title_plain":"","content":"","excerpt":"","date":"2013-10-01 17:47:03","modified":"2014-02-03 03:18:16","categories":[],"tags":[],"author":{"id":1,"slug":"jsonuser","name":"jsonuser","first_name":"","last_name":"","nickname":"jsonuser","url":"","description":""},"comments":[],"attachments":[],"comment_count":0,"comment_status":"open","custom_fields":{"_menu_item_menu_item_parent":["61"],"_menu_item_wpspa_route":["\/page-two\/page-two-subpage"],"_menu_item_wpspa_menu_text":["Page Two Subpage"],"_menu_item_wpspa_post_type":["page"],"_menu_item_wpspa_object_id":["66"],"_menu_item_wpspa_object_links":[],"_menu_item_wpspa_object_props":{"is_single":true,"prefetch":true}}}],"query":{"post_type":"nav_menu_item","order":"ASC","orderby":"menu_order","custom_fields":"_menu_item_menu_item_parent,_menu_item_wpspa_route,_menu_item_wpspa_menu_text,_menu_item_wpspa_post_type,_menu_item_wpspa_object_id,_menu_item_wpspa_object_links,_menu_item_wpspa_object_props","ignore_sticky_posts":true}})
    );
  } else if (req.url.indexOf("/api/wpspa/site_info") === 0) {
    res.setHeader("Content-Type", "application/json");
    res.end(
      JSON.stringify({"status":"ok","name":"WPSPA","description":"Just another WordPress site"})
    );
  } else if (req.url.indexOf("/api/get_posts/?post_type=") === 0) {
    res.setHeader("Content-Type", "application/json");
    res.end(
      // 'http://localhost:9002/api/get_posts/?post_type=any&post__in%5B0%5D=2&post__in%5B1%5D=11&post__in%5B2%5D=76&post__in%5B3%5D=66&custom_fields=_wpspa_meta_description%2C_wpspa_page_title%2C_wpspa_prefetch'
      JSON.stringify({"status":"ok","count":5,"count_total":4,"pages":1,"posts":[{"id":76,"type":"page","slug":"an-internal-page","url":"http:\/\/jsonapi.local\/an-internal-page\/","status":"publish","title":"An Internal Page","title_plain":"An Internal Page","content":"<p>Here is an internal page that is not connected to the menu, but rather just linked to from a page that IS in the menu. WPSPA picks this up automatically by looking through your content&#8217;s links. So this could really be anything: A page, a post, a custom type. Totally up to you. All that is required is that this has a type and id (those are also picked up by WPSPA automatically).<\/p>\n<p>If a link in your content does not relate to a WordPress type and id, it is assumed to be an external link and is not processed by WPSPA.<\/p>\n<p>When this page is picked up, it is added to the router and scheduled for fetch according to your wpspa prefetch preference.<\/p>\n<p>If prefetch preference is set to &#8216;true&#8217;, then this entity will immediately be scheduled for fetch. Remember most browsers only have 6 connections available in the connection pool to work with at any given time, so tread lightly, or test to make sure you&#8217;re not causing a bottleneck for your app.<\/p>\n<p>If the prefetch preference is set to &#8216;false&#8217;, then this entity will only be fetched when the user clicks on the link that corresponds to this content.<\/p>\n","excerpt":"<p>Here is an internal page that is not connected to the menu, but rather just linked to from a page that IS in the menu. WPSPA picks this up automatically by looking through your content&#8217;s links. So this could really be anything: A page, a post, a custom type. Totally up to you. All that [&hellip;]<\/p>\n","date":"2013-12-15 16:47:47","modified":"2014-02-14 02:26:34","categories":[],"tags":[],"author":{"id":1,"slug":"jsonuser","name":"jsonuser","first_name":"","last_name":"","nickname":"jsonuser","url":"","description":""},"comments":[],"attachments":[],"comment_count":0,"comment_status":"open","custom_fields":{"_wpspa_meta_description":["An internal page that explains internal pages and prefetch preferences"],"_wpspa_page_title":["Explanatory Internal Page - WPSPA"],"_wpspa_prefetch":["yes"],"_wpspa_child_link":false}},{"id":66,"type":"page","slug":"page-two-subpage","url":"http:\/\/jsonapi.local\/page-two\/page-two-subpage\/","status":"publish","title":"Page Two Subpage","title_plain":"Page Two Subpage","content":"<p>This is a child page of page two. Enjoy&#8230;<\/p>\n","excerpt":"<p>This is a child page of page two. Enjoy&#8230;<\/p>\n","date":"2013-10-01 17:33:07","modified":"2014-02-14 02:27:23","categories":[],"tags":[],"author":{"id":1,"slug":"jsonuser","name":"jsonuser","first_name":"","last_name":"","nickname":"jsonuser","url":"","description":""},"comments":[],"attachments":[],"comment_count":0,"comment_status":"open","custom_fields":{"_wpspa_meta_description":[""],"_wpspa_page_title":[""],"_wpspa_prefetch":["yes"],"_wpspa_child_link":false}},{"id":11,"type":"page","slug":"page-two","url":"http:\/\/jsonapi.local\/page-two\/","status":"publish","title":"Page Two","title_plain":"Page Two","content":"<p>This is the second page. La Ti Da&#8230;<\/p>\n<p>Wait a minute, here is a link to another <a title=\"An Internal Page\" href=\"http:\/\/jsonapi.local\/an-internal-page\/\">page<\/a> on this site.<\/p>\n","excerpt":"<p>This is the second page. La Ti Da&#8230; Wait a minute, here is a link to another page on this site.<\/p>\n","date":"2013-08-15 01:06:07","modified":"2014-02-14 02:27:10","categories":[],"tags":[],"author":{"id":1,"slug":"jsonuser","name":"jsonuser","first_name":"","last_name":"","nickname":"jsonuser","url":"","description":""},"comments":[],"attachments":[],"comment_count":0,"comment_status":"open","custom_fields":{"_wpspa_meta_description":["This is the LTD (La Ti Da) Description of a wonderful secondary page, booya."],"_wpspa_page_title":["La Ti Da"],"_wpspa_prefetch":["yes"],"_wpspa_child_link":false}},{"id":2,"type":"page","slug":"sample-page","url":"http:\/\/jsonapi.local\/sample-page\/","status":"publish","title":"Sample Page","title_plain":"Sample Page","content":"<p>This is an example page. It&#8217;s different from a blog post because it will stay in one place and will show up in your site navigation (in most themes). Most people start with an About page that introduces them to potential site visitors. It might say something like this:<\/p>\n<blockquote><p>Hi there! I&#8217;m a bike messenger by day, aspiring actor by night, and this is my blog. I live in Los Angeles, have a great dog named Jack, and I like pi\u00f1a coladas. (And gettin&#8217; caught in the rain.)<\/p><\/blockquote>\n<p>&#8230;or something like this:<\/p>\n<blockquote><p>The XYZ Doohickey Company was founded in 1971, and has been providing quality doohickeys to the public ever since. Located in Gotham City, XYZ employs over 2,000 people and does all kinds of awesome things for the Gotham community.<\/p><\/blockquote>\n<p>As a new WordPress user, you should go to <a href=\"http:\/\/jsonapi.local\/wp-admin\/\">your dashboard<\/a> to delete this page and create new pages for your content. Have fun!<\/p>\n","excerpt":"<p>This is an example page. It&#8217;s different from a blog post because it will stay in one place and will show up in your site navigation (in most themes). Most people start with an About page that introduces them to potential site visitors. It might say something like this: Hi there! I&#8217;m a bike messenger [&hellip;]<\/p>\n","date":"2013-07-25 16:20:06","modified":"2014-02-14 02:26:50","categories":[],"tags":[],"author":{"id":1,"slug":"jsonuser","name":"jsonuser","first_name":"","last_name":"","nickname":"jsonuser","url":"","description":""},"comments":[],"attachments":[],"comment_count":0,"comment_status":"open","custom_fields":{"_wpspa_meta_description":[""],"_wpspa_page_title":[""],"_wpspa_prefetch":["yes"],"_wpspa_child_link":false}},{"id":76,"type":"page","slug":"an-internal-page","url":"http:\/\/jsonapi.local\/an-internal-page\/","status":"publish","title":"An Internal Page","title_plain":"An Internal Page","content":"<p>Here is an internal page that is not connected to the menu, but rather just linked to from a page that IS in the menu. WPSPA picks this up automatically by looking through your content&#8217;s links. So this could really be anything: A page, a post, a custom type. Totally up to you. All that is required is that this has a type and id (those are also picked up by WPSPA automatically).<\/p>\n<p>If a link in your content does not relate to a WordPress type and id, it is assumed to be an external link and is not processed by WPSPA.<\/p>\n<p>When this page is picked up, it is added to the router and scheduled for fetch according to your wpspa prefetch preference.<\/p>\n<p>If prefetch preference is set to &#8216;true&#8217;, then this entity will immediately be scheduled for fetch. Remember most browsers only have 6 connections available in the connection pool to work with at any given time, so tread lightly, or test to make sure you&#8217;re not causing a bottleneck for your app.<\/p>\n<p>If the prefetch preference is set to &#8216;false&#8217;, then this entity will only be fetched when the user clicks on the link that corresponds to this content.<\/p>\n","excerpt":"<p>Here is an internal page that is not connected to the menu, but rather just linked to from a page that IS in the menu. WPSPA picks this up automatically by looking through your content&#8217;s links. So this could really be anything: A page, a post, a custom type. Totally up to you. All that [&hellip;]<\/p>\n","date":"2013-12-15 16:47:47","modified":"2014-02-14 02:26:34","categories":[],"tags":[],"author":{"id":1,"slug":"jsonuser","name":"jsonuser","first_name":"","last_name":"","nickname":"jsonuser","url":"","description":""},"comments":[],"attachments":[],"comment_count":0,"comment_status":"open","custom_fields":{"_wpspa_meta_description":["An internal page that explains internal pages and prefetch preferences"],"_wpspa_page_title":["Explanatory Internal Page - WPSPA"],"_wpspa_prefetch":["yes"],"_wpspa_child_link":true}}],"query":{"ignore_sticky_posts":true,"post_type":"any","post__in":["2","11","76","66"],"custom_fields":"_wpspa_meta_description,_wpspa_page_title,_wpspa_prefetch"}})
    );
  } else if (req.url.indexOf("/api/widgets/get_sidebar/?sidebar_id=sidebar-1") === 0) {
    res.setHeader("Content-type", "application/json");
    res.end(
      JSON.stringify({"status":"ok","sidebar_id":"sidebar-1","widgets":[{"id":"search-2","widget":"<aside id=\"search-2\" class=\"widget widget_search\"><form role=\"search\" method=\"get\" class=\"search-form\" action=\"http:\/\/jsonapi.local\/\">\n\t\t\t\t<label>\n\t\t\t\t\t<span class=\"screen-reader-text\">Search for:<\/span>\n\t\t\t\t\t<input type=\"search\" class=\"search-field\" placeholder=\"Search &hellip;\" value=\"\" name=\"s\" title=\"Search for:\" \/>\n\t\t\t\t<\/label>\n\t\t\t\t<input type=\"submit\" class=\"search-submit\" value=\"Search\" \/>\n\t\t\t<\/form><\/aside>","params":{"name":"Main Widget Area","id":"sidebar-1","description":"Appears in the footer section of the site.","class":"","before_widget":"<aside id=\"search-2\" class=\"widget widget_search\">","after_widget":"<\/aside>","before_title":"<h3 class=\"widget-title\">","after_title":"<\/h3>","widget_id":"search-2","widget_name":"Search"},"instance":{"title":""}},{"id":"recent-posts-2","widget":"<aside id=\"recent-posts-2\" class=\"widget widget_recent_entries\">\t\t<h3 class=\"widget-title\">Recent Posts<\/h3>\t\t<ul>\n\t\t\t\t\t<li>\n\t\t\t\t<a href=\"http:\/\/jsonapi.local\/another-test-post\/\" title=\"Another Test Post\">Another Test Post<\/a>\n\t\t\t\t\t\t<\/li>\n\t\t\t\t\t<li>\n\t\t\t\t<a href=\"http:\/\/jsonapi.local\/hello-world\/\" title=\"Hello world!\">Hello world!<\/a>\n\t\t\t\t\t\t<\/li>\n\t\t\t\t<\/ul>\n\t\t<\/aside>","params":{"name":"Main Widget Area","id":"sidebar-1","description":"Appears in the footer section of the site.","class":"","before_widget":"<aside id=\"recent-posts-2\" class=\"widget widget_recent_entries\">","after_widget":"<\/aside>","before_title":"<h3 class=\"widget-title\">","after_title":"<\/h3>","widget_id":"recent-posts-2","widget_name":"Recent Posts"},"instance":{"title":"","number":5}},{"id":"recent-comments-2","widget":"<aside id=\"recent-comments-2\" class=\"widget widget_recent_comments\"><h3 class=\"widget-title\">Recent Comments<\/h3><ul id=\"recentcomments\"><li class=\"recentcomments\"><a href='http:\/\/wordpress.org\/' rel='external nofollow' class='url'>Mr WordPress<\/a> on <a href=\"http:\/\/jsonapi.local\/hello-world\/#comment-1\">Hello world!<\/a><\/li><\/ul><\/aside>","params":{"name":"Main Widget Area","id":"sidebar-1","description":"Appears in the footer section of the site.","class":"","before_widget":"<aside id=\"recent-comments-2\" class=\"widget widget_recent_comments\">","after_widget":"<\/aside>","before_title":"<h3 class=\"widget-title\">","after_title":"<\/h3>","widget_id":"recent-comments-2","widget_name":"Recent Comments"},"instance":{"title":"","number":5}},{"id":"archives-2","widget":"<aside id=\"archives-2\" class=\"widget widget_archive\"><h3 class=\"widget-title\">Archives<\/h3>\t\t<ul>\n\t\t\t<li><a href='http:\/\/jsonapi.local\/2013\/08\/' title='August 2013'>August 2013<\/a><\/li>\n\t<li><a href='http:\/\/jsonapi.local\/2013\/07\/' title='July 2013'>July 2013<\/a><\/li>\n\t\t<\/ul>\n<\/aside>","params":{"name":"Main Widget Area","id":"sidebar-1","description":"Appears in the footer section of the site.","class":"","before_widget":"<aside id=\"archives-2\" class=\"widget widget_archive\">","after_widget":"<\/aside>","before_title":"<h3 class=\"widget-title\">","after_title":"<\/h3>","widget_id":"archives-2","widget_name":"Archives"},"instance":{"title":"","count":0,"dropdown":0}},{"id":"categories-2","widget":"<aside id=\"categories-2\" class=\"widget widget_categories\"><h3 class=\"widget-title\">Categories<\/h3>\t\t<ul>\n\t<li class=\"cat-item cat-item-8\"><a href=\"http:\/\/jsonapi.local\/category\/another-category\/\" title=\"This is a test category to see what multiple categories look like\">Another Category<\/a>\n<\/li>\n\t<li class=\"cat-item cat-item-7\"><a href=\"http:\/\/jsonapi.local\/category\/my-test-category\/\" title=\"This is a test category to see what the API results look like.\">My Test Category<\/a>\n<\/li>\n\t<li class=\"cat-item cat-item-1\"><a href=\"http:\/\/jsonapi.local\/category\/uncategorized\/\" title=\"View all posts filed under Uncategorized\">Uncategorized<\/a>\n<\/li>\n\t\t<\/ul>\n<\/aside>","params":{"name":"Main Widget Area","id":"sidebar-1","description":"Appears in the footer section of the site.","class":"","before_widget":"<aside id=\"categories-2\" class=\"widget widget_categories\">","after_widget":"<\/aside>","before_title":"<h3 class=\"widget-title\">","after_title":"<\/h3>","widget_id":"categories-2","widget_name":"Categories"},"instance":{"title":"","count":0,"hierarchical":0,"dropdown":0}},{"id":"meta-2","widget":"<aside id=\"meta-2\" class=\"widget widget_meta\"><h3 class=\"widget-title\">Meta<\/h3>\t\t\t<ul>\n\t\t\t\t\t\t<li><a href=\"http:\/\/jsonapi.local\/wp-login.php\">Log in<\/a><\/li>\n\t\t\t<li><a href=\"http:\/\/jsonapi.local\/feed\/\" title=\"Syndicate this site using RSS 2.0\">Entries <abbr title=\"Really Simple Syndication\">RSS<\/abbr><\/a><\/li>\n\t\t\t<li><a href=\"http:\/\/jsonapi.local\/comments\/feed\/\" title=\"The latest comments to all posts in RSS\">Comments <abbr title=\"Really Simple Syndication\">RSS<\/abbr><\/a><\/li>\n\t\t\t<li><a href=\"http:\/\/wordpress.org\/\" title=\"Powered by WordPress, state-of-the-art semantic personal publishing platform.\">WordPress.org<\/a><\/li>\t\t\t\t\t\t<\/ul>\n<\/aside>","params":{"name":"Main Widget Area","id":"sidebar-1","description":"Appears in the footer section of the site.","class":"","before_widget":"<aside id=\"meta-2\" class=\"widget widget_meta\">","after_widget":"<\/aside>","before_title":"<h3 class=\"widget-title\">","after_title":"<\/h3>","widget_id":"meta-2","widget_name":"Meta"},"instance":{"title":""}}]})
    );
  } else if (req.url.indexOf("/api/get_recent_posts") === 0) {
    res.setHeader("Content-type", "application/json");
    res.end(
      JSON.stringify({"status":"ok","count":2,"count_total":2,"pages":1,"posts":[{"id":63,"type":"post","slug":"another-test-post","url":"http:\/\/jsonapi.local\/another-test-post\/","status":"publish","title":"Another Test Post","title_plain":"Another Test Post","content":"<p>This is another test post except it contains a link\u00a0to a page.<\/p>\n","excerpt":"<p>This is another test post except it contains a link\u00a0to a page.<\/p>\n","date":"2013-08-25 20:30:16","modified":"2014-02-15 18:13:27","categories":[{"id":8,"slug":"another-category","title":"Another Category","description":"This is a test category to see what multiple categories look like","parent":0,"post_count":1},{"id":7,"slug":"my-test-category","title":"My Test Category","description":"This is a test category to see what the API results look like.","parent":0,"post_count":1}],"tags":[],"author":{"id":1,"slug":"jsonuser","name":"jsonuser","first_name":"","last_name":"","nickname":"jsonuser","url":"","description":""},"comments":[],"attachments":[],"comment_count":0,"comment_status":"open","custom_fields":{"_wpspa_meta_description":["This is a beautiful test post that just serves to test the WPSPA plugin and app"],"_wpspa_page_title":["WPSPA | Another Test Post"],"_wpspa_prefetch":[""],"_wpspa_child_link":false}},{"id":1,"type":"post","slug":"hello-world","url":"http:\/\/jsonapi.local\/hello-world\/","status":"publish","title":"Hello world!","title_plain":"Hello world!","content":"<p>Welcome to WordPress. This is your first post. Edit or delete it, then start blogging!<\/p>\n","excerpt":"<p>Welcome to WordPress. This is your first post. Edit or delete it, then start blogging!<\/p>\n","date":"2013-07-25 16:20:06","modified":"2014-02-13 23:00:55","categories":[],"tags":[],"author":{"id":1,"slug":"jsonuser","name":"jsonuser","first_name":"","last_name":"","nickname":"jsonuser","url":"","description":""},"comments":[{"id":1,"name":"Mr WordPress","url":"http:\/\/wordpress.org\/","date":"2013-07-25 16:20:06","content":"<p>Hi, this is a comment.<br \/>\nTo delete a comment, just log in and view the post&#039;s comments. There you will have the option to edit or delete them.<\/p>\n","parent":0}],"attachments":[],"comment_count":1,"comment_status":"open","custom_fields":{"_wpspa_meta_description":["This is the first test post that is traditionally placed in by the Wordpress installation itself. It doesn't have any more meaning than that."],"_wpspa_page_title":["WPSPA | Hello World"],"_wpspa_prefetch":[""],"_wpspa_child_link":false}}]})
    );
  } else if (req.url.indexOf("/api/get_category_posts/?id=7") === 0) {
    res.setHeader("Content-type", "application/json");
    res.end(
      // 'http://localhost:9002/api/get_category_posts/?id=7&custom_fields=_wpspa_meta_description%2C_wpspa_page_title%2C_wpspa_prefetch'
      JSON.stringify({"status":"ok","count":1,"pages":1,"category":{"id":7,"slug":"my-test-category","title":"My Test Category","description":"This is a test category to see what the API results look like.","parent":0,"post_count":1},"posts":[{"id":63,"type":"post","slug":"another-test-post","url":"http:\/\/jsonapi.local\/another-test-post\/","status":"publish","title":"Another Test Post","title_plain":"Another Test Post","content":"<p>This is another test post except it contains a link\u00a0to a page.<\/p>\n","excerpt":"<p>This is another test post except it contains a link\u00a0to a page.<\/p>\n","date":"2013-08-25 20:30:16","modified":"2014-02-15 18:13:27","categories":[{"id":8,"slug":"another-category","title":"Another Category","description":"This is a test category to see what multiple categories look like","parent":0,"post_count":1},{"id":7,"slug":"my-test-category","title":"My Test Category","description":"This is a test category to see what the API results look like.","parent":0,"post_count":1}],"tags":[],"author":{"id":1,"slug":"jsonuser","name":"jsonuser","first_name":"","last_name":"","nickname":"jsonuser","url":"","description":""},"comments":[],"attachments":[],"comment_count":0,"comment_status":"open","custom_fields":{"_wpspa_meta_description":["This is a beautiful test post that just serves to test the WPSPA plugin and app"],"_wpspa_page_title":["WPSPA | Another Test Post"],"_wpspa_prefetch":[""],"_wpspa_child_link":false}}]})
    );
  } else if (req.url.indexOf("/api/get_category_posts/?id=8") === 0) {
    res.setHeader("Content-type", "application/json");
    res.end(
      // http://localhost:9002/api/get_category_posts/?id=8&custom_fields=_wpspa_meta_description%2C_wpspa_page_title%2C_wpspa_prefetch
      JSON.stringify({"status":"ok","count":1,"pages":1,"category":{"id":8,"slug":"another-category","title":"Another Category","description":"This is a test category to see what multiple categories look like","parent":0,"post_count":1},"posts":[{"id":63,"type":"post","slug":"another-test-post","url":"http:\/\/jsonapi.local\/another-test-post\/","status":"publish","title":"Another Test Post","title_plain":"Another Test Post","content":"<p>This is another test post except it contains a link\u00a0to a page.<\/p>\n","excerpt":"<p>This is another test post except it contains a link\u00a0to a page.<\/p>\n","date":"2013-08-25 20:30:16","modified":"2014-02-15 18:13:27","categories":[{"id":8,"slug":"another-category","title":"Another Category","description":"This is a test category to see what multiple categories look like","parent":0,"post_count":1},{"id":7,"slug":"my-test-category","title":"My Test Category","description":"This is a test category to see what the API results look like.","parent":0,"post_count":1}],"tags":[],"author":{"id":1,"slug":"jsonuser","name":"jsonuser","first_name":"","last_name":"","nickname":"jsonuser","url":"","description":""},"comments":[],"attachments":[],"comment_count":0,"comment_status":"open","custom_fields":{"_wpspa_meta_description":["This is a beautiful test post that just serves to test the WPSPA plugin and app"],"_wpspa_page_title":["WPSPA | Another Test Post"],"_wpspa_prefetch":[""],"_wpspa_child_link":false}}]})
    );
  } else if (req.url.indexOf("/api/get_date_posts/?date=2013/08") === 0) {
    res.setHeader("Content-type", "application/json");
    res.end(
      // http://localhost:9002/api/get_date_posts/?date=2013/08&custom_fields=_wpspa_meta_description%2C_wpspa_page_title%2C_wpspa_prefetch
      JSON.stringify({"status":"ok","count":1,"count_total":1,"pages":1,"posts":[{"id":63,"type":"post","slug":"another-test-post","url":"http:\/\/jsonapi.local\/another-test-post\/","status":"publish","title":"Another Test Post","title_plain":"Another Test Post","content":"<p>This is another test post except it contains a link\u00a0to a page.<\/p>\n","excerpt":"<p>This is another test post except it contains a link\u00a0to a page.<\/p>\n","date":"2013-08-25 20:30:16","modified":"2014-02-15 18:13:27","categories":[{"id":8,"slug":"another-category","title":"Another Category","description":"This is a test category to see what multiple categories look like","parent":0,"post_count":1},{"id":7,"slug":"my-test-category","title":"My Test Category","description":"This is a test category to see what the API results look like.","parent":0,"post_count":1}],"tags":[],"author":{"id":1,"slug":"jsonuser","name":"jsonuser","first_name":"","last_name":"","nickname":"jsonuser","url":"","description":""},"comments":[],"attachments":[],"comment_count":0,"comment_status":"open","custom_fields":{"_wpspa_meta_description":["This is a beautiful test post that just serves to test the WPSPA plugin and app"],"_wpspa_page_title":["WPSPA | Another Test Post"],"_wpspa_prefetch":[""],"_wpspa_child_link":false}}]})
    );
  } else if (req.url.indexOf("/api/get_date_posts/?date=2013/07") === 0) {
    res.setHeader("Content-type", "application/json");
    res.end(
      // http://localhost:9002/api/get_date_posts/?date=2013/07&custom_fields=_wpspa_meta_description%2C_wpspa_page_title%2C_wpspa_prefetch
      JSON.stringify({"status":"ok","count":1,"count_total":1,"pages":1,"posts":[{"id":1,"type":"post","slug":"hello-world","url":"http:\/\/jsonapi.local\/hello-world\/","status":"publish","title":"Hello world!","title_plain":"Hello world!","content":"<p>Welcome to WordPress. This is your first post. Edit or delete it, then start blogging!<\/p>\n","excerpt":"<p>Welcome to WordPress. This is your first post. Edit or delete it, then start blogging!<\/p>\n","date":"2013-07-25 16:20:06","modified":"2014-02-13 23:00:55","categories":[],"tags":[],"author":{"id":1,"slug":"jsonuser","name":"jsonuser","first_name":"","last_name":"","nickname":"jsonuser","url":"","description":""},"comments":[{"id":1,"name":"Mr WordPress","url":"http:\/\/wordpress.org\/","date":"2013-07-25 16:20:06","content":"<p>Hi, this is a comment.<br \/>\nTo delete a comment, just log in and view the post&#039;s comments. There you will have the option to edit or delete them.<\/p>\n","parent":0}],"attachments":[],"comment_count":1,"comment_status":"open","custom_fields":{"_wpspa_meta_description":["This is the first test post that is traditionally placed in by the Wordpress installation itself. It doesn't have any more meaning than that."],"_wpspa_page_title":["WPSPA | Hello World"],"_wpspa_prefetch":[""],"_wpspa_child_link":false}}]})
    );
  } else if (req.url.indexOf("/api/get_search_results/?search=page%20two") === 0) {
    res.setHeader("Content-type", "application/json");
    res.end(
      JSON.stringify({"status":"ok","count":3,"count_total":2,"pages":1,"posts":[{"id":66,"type":"page","slug":"page-two-subpage","url":"http:\/\/jsonapi.local\/page-two\/page-two-subpage\/","status":"publish","title":"Page Two Subpage","title_plain":"Page Two Subpage","content":"<p>This is a child page of page two. Enjoy&#8230;<\/p>\n","excerpt":"<p>This is a child page of page two. Enjoy&#8230;<\/p>\n","date":"2013-10-01 17:33:07","modified":"2014-02-14 02:27:23","categories":[],"tags":[],"author":{"id":1,"slug":"jsonuser","name":"jsonuser","first_name":"","last_name":"","nickname":"jsonuser","url":"","description":""},"comments":[],"attachments":[],"comment_count":0,"comment_status":"open","custom_fields":{"_wpspa_child_link":false}},{"id":11,"type":"page","slug":"page-two","url":"http:\/\/jsonapi.local\/page-two\/","status":"publish","title":"Page Two","title_plain":"Page Two","content":"<p>This is the second page. La Ti Da&#8230;<\/p>\n<p>Wait a minute, here is a link to another <a title=\"An Internal Page\" href=\"http:\/\/jsonapi.local\/an-internal-page\/\">page<\/a> on this site.<\/p>\n","excerpt":"<p>This is the second page. La Ti Da&#8230; Wait a minute, here is a link to another page on this site.<\/p>\n","date":"2013-08-15 01:06:07","modified":"2014-02-14 02:27:10","categories":[],"tags":[],"author":{"id":1,"slug":"jsonuser","name":"jsonuser","first_name":"","last_name":"","nickname":"jsonuser","url":"","description":""},"comments":[],"attachments":[],"comment_count":0,"comment_status":"open","custom_fields":{"_wpspa_child_link":false}},{"id":76,"type":"page","slug":"an-internal-page","url":"http:\/\/jsonapi.local\/an-internal-page\/","status":"publish","title":"An Internal Page","title_plain":"An Internal Page","content":"<p>Here is an internal page that is not connected to the menu, but rather just linked to from a page that IS in the menu. WPSPA picks this up automatically by looking through your content&#8217;s links. So this could really be anything: A page, a post, a custom type. Totally up to you. All that is required is that this has a type and id (those are also picked up by WPSPA automatically).<\/p>\n<p>If a link in your content does not relate to a WordPress type and id, it is assumed to be an external link and is not processed by WPSPA.<\/p>\n<p>When this page is picked up, it is added to the router and scheduled for fetch according to your wpspa prefetch preference.<\/p>\n<p>If prefetch preference is set to &#8216;true&#8217;, then this entity will immediately be scheduled for fetch. Remember most browsers only have 6 connections available in the connection pool to work with at any given time, so tread lightly, or test to make sure you&#8217;re not causing a bottleneck for your app.<\/p>\n<p>If the prefetch preference is set to &#8216;false&#8217;, then this entity will only be fetched when the user clicks on the link that corresponds to this content.<\/p>\n","excerpt":"<p>Here is an internal page that is not connected to the menu, but rather just linked to from a page that IS in the menu. WPSPA picks this up automatically by looking through your content&#8217;s links. So this could really be anything: A page, a post, a custom type. Totally up to you. All that [&hellip;]<\/p>\n","date":"2013-12-15 16:47:47","modified":"2014-02-14 02:26:34","categories":[],"tags":[],"author":{"id":1,"slug":"jsonuser","name":"jsonuser","first_name":"","last_name":"","nickname":"jsonuser","url":"","description":""},"comments":[],"attachments":[],"comment_count":0,"comment_status":"open","custom_fields":{"_wpspa_child_link":true}}]})
    );
  } else if (req.url.indexOf("/api/respond/submit_comment/") === 0) {
    res.setHeader("Content-type", "application/json");
    res.end(
      JSON.stringify({"status":"pending","id":6,"name":"test guy 5","url":"","date":"2014-02-07 19:35:44","content":"<p>This is another test comment (again). please (again) delete<\/p>\n","parent":0})
    );
  } else {
    next();
  }
};
