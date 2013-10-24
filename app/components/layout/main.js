/*
 * The main container layout
 * Defines the container layout and composition
 */
define([
  "lodash",
  "backbone.marionette",
  "app",
  "module",
  "components/layout/content/main",
  "components/layout/header/main",
  "components/layout/footer/main"
], function(_, Marionette, app, module, content) {

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

    // Extend the container object
    _.extend(container, {
      startRouting: function() {
        app.vent.trigger("app:startRoutes");
      },
      // after N container:complete events, start application routing
      completions: module.config().containerCompletions
    });

    container.addInitializer(function(options) {
      this.layout = new AppLayout(options);

      this.listenTo(app.vent, "container:complete", _.after(container.completions, function() {
        container.startRouting();
        container.stopListening();
      }));
    });

    container.addFinalizer(function() {
      this.stopListening();
      delete this.layout;
    });

  });

  return thisModule;

});
