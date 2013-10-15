define([
  "lodash",
  "jquery",
  "backbone.marionette",
  "app",
  "helpers/routes",
  "helpers/contract",
  "components/layout/header/navigation/item",
  "components/layout/header/navigation/entities"
], function(_, $, Marionette, app, routes, contract, itemView, entities) {

  // The definition of navigation view
  var NavigationView = Marionette.CompositeView.extend({
    template: "components/layout/header/navigation/view",
    itemView: itemView,
    tagName: "nav",
    className: "top-bar",
    itemViewContainer: ".wpspa-nav",

    initialize: function() {
      var self = this;
      // listen to container message buss for vendor initialize work
      this.listenTo(app.container, "container:afterVendorInitialize", function(options) {
        self.initializeVendor(options);
      });
      // listen to app message bus for content events
      this.listenTo(app.vent, "content:start", function(options) {
        self.onContentStart(options);
      });
      // handle resize events and adjust the navigation accordingly
      this.resizeHandler = _.debounce(function() {
        if (self.topbar) {
          var newBreakpoint = self.topbar.breakpoint();
          // if breakpoint activation changed, then reapply updateDropdowns
          if (self.breakpoint != newBreakpoint) {
            self.breakpoint = newBreakpoint;
            self.updateDropdowns();
          }
        }
      }, 100);
      $(window).on("resize", this.resizeHandler);
    },

    remove: function() {
      $(window).off("resize",this.resizeHandler);
      // call the superclass remove method
      Marionette.CompositeView.prototype.remove.apply(this, arguments);
    },

    // handle vendor initialization
    initializeVendor: function(options) {
      contract(options, "topbar");

      if (!this.topbar) {
        this.topbar = options.topbar;
        this.breakpoint = this.topbar.breakpoint();

        // don't let vendor navigation helpers participate in routing
        this.$itemViewContainer.find(".js-generated a[href='#']").attr("data-bypass", true);

        this.updateDropdowns();
      }
    },

    // update navigation dropdowns, if required
    updateDropdowns: function() {
      // if one of our routes was converted into a navigation parent, remove the parent from routing
      var dropdowns = this.$itemViewContainer.find("li.has-dropdown.not-click");
      dropdowns.each(function(index, item) {
        var $item = $(item);
        var anchor = $item.children("a[data-nav-item]").first();
        if (anchor.length > 0) {
          
          // find the anchor substitutes
          var substitutes =
            $item.find("ul li a.js-generated.parent-link[href='"+anchor[0].pathname+"']")
              .filter(":visible");

          if (substitutes.length > 0) {
            // if the anchor was substituted, turn it into a navigation helper only
            anchor.attr("data-nav-path", anchor[0].pathname);
            anchor.attr("href", "#");
            anchor.attr("data-bypass", true);
          } else {
            // otherwise, restore it to the original state
            var navPath = anchor.attr("data-nav-path");
            if (navPath) {
              anchor.attr("href", navPath);
              anchor.removeAttr("data-bypass");
            }
          }
        }
      });
    },

    // update/insert a drop down
    upsertDropdown: function(parent, itemView) {
      if (!parent.hasClass("has-dropdown")) {
        parent.addClass("has-dropdown");
        parent.append("<ul class='dropdown' data-nav-list></ul>");
      }
      parent.find("ul.dropdown[data-nav-list]").append(itemView.$el);
    },

    // if the itemView model has a parent, we shake things up.
    appendHtml: function(collectionView, itemView, index) {
      var $container = this.getItemViewContainer(collectionView);
      var parentId = itemView.model.get("parent");

      // if this itemView has a parent, initialize it if required, then add this itemView to the sublist
      if (parentId && parentId > 0) {
        var parent = $container.find("li a[data-nav-item='"+parentId+"']").parent();
        this.upsertDropdown(parent, itemView);
      } else {
        $container.append(itemView.el);
      }
    },

    // Manage the top-bar when content changes
    // Reassign the active item, close the menu if required
    onContentStart: function(options) {
      // if this is content we respond to
      if (typeof options.route !== "undefined") {
        // clear anything marked active
        this.$itemViewContainer.find(".active").removeClass("active");

        // get the anchor we are targeting and mark it active
        var href = routes.routeToHref(options.route);
        var item = this.$itemViewContainer.find("a[href='"+href+"']");
        item.parent().addClass("active");
        
        // also mark any parent anchors up the tree as active
        var parentAnchors = item.parents("ul").siblings("a").first();
        if (parentAnchors.length > 0)
          parentAnchors.parent().addClass("active");

        // this was a route, so close the menu if required
        if (this.$el.hasClass("expanded")) {
          this.$(".toggle-topbar").click();
        }
      }
    }
  });

  return {
    create: function(options) {
      options = options || {};
      return new NavigationView(_.extend({
        collection: options.collection || entities.createCollection()
      }, options));
    }
  };

});