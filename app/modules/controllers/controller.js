define([
  "backbone.marionette"
  ], function(Marionette) {

    var Controller = Marionette.Controller.extend({

      initialize: function(options) {
        options = options || {};
        this.vent = options.vent;
      },

      index: function() {
        this.vent.trigger("appLayout:render", { vent: this.vent });
      },

      notfound: function(path) {
        // fire the app:exit event
        this.vent.trigger("app:exit", {
          path: path,
          exit: function() {
            window.location.replace("/" + path + ".notfound");
          }
        });
      }
    });

    return {
      create: function(options) {
        return new Controller(options);
      }
    };

  });