/*
 * The main container layout
 * Defines the container layout and composition
 */
define([
  "lodash",
  "backbone.marionette",
  "app",
  "components/layout/content/main",
  "components/layout/header/main",
  "components/layout/footer/main",
  "components/layout/search/main"
], function(_, Marionette, app, content) {

  // Create a partial definition for container module
  var thisModule = app.module("container", function(container) {

    // The definition of the container layout
    var AppLayout = Marionette.Layout.extend({

      template: "components/layout/template",
      className: "grid-row",

      regions: {
        header: "#header",
        footer: "#footer",
        content: content
      },

      onRender: function() {
        this.header.show(container.header.layout);
        this.footer.show(container.footer.layout);
        // content is shown dynamically and shows itself on routing events
      }
    });


    container.addInitializer(function(options) {
      this.layout = new AppLayout(options);

      // this is the number of container:complete calls required to trigger app:startRoutes
      // for now, this is header + footer + search = 3
      var completions = 3;

      this.listenTo(app.vent, "container:complete", _.after(completions, function() {
        app.vent.trigger("app:startRoutes");
      }));
    });

    container.addFinalizer(function() {
      this.stopListening();
      delete this.layout;
    });

  });

  return thisModule;

});
