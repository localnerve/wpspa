require([
    "app"
  ],
  function(app) {

    app.start({
      vent: app.vent,
      reqres: app.reqres,
      commands: app.commands
    });

  });
