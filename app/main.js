require([
    "app",
    "modules/routers/appRouter"
  ], function(app) {

    app.start({
      vent: app.vent,
      reqres: app.reqres,
      commands: app.commands
    });

  });
