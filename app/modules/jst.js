define([
    "jquery",
    "lodash",
    "module"
  ],
  function($, _, module) {

    // cache the templates, if this is development, mark it
    var JST = window.JST = window.JST || {
      development: true
    };

    // ajax retrieval failure handler
    function failure(jqXHR, msg) {
      throw "Template '" + template + "' could not be retrieved: " + jqXHR.status + (msg ? ", " + msg : "");
    }

    // return the method that will process templates for render
    return function(template, data) {
      template = module.config().prefix + "/" + template + ".html";
      // if not cached
      if (!JST[template]) {
        // If not development
        if (!JST.development) {
          // this was a real build, so you should've built your templates - shameful.
          throw "Template '" + template + "' not found!";
        }
        else {
          // we have to block for development on marionette... unless you are willing to support marionette.async...
          $.ajax(template, {
            async: false
          })
            .done(function(data, textStatus, jqXHR) {
              if (textStatus === "success")
                // compile and cache
                JST[template] = _.template(data);
              else
                failure(jqXHR);
            })
            .fail(function(jqXHR, textStatus, errorThrown) {
              failure(jqXHR, errorThrown.message);
            });
        }
      }
      return JST[template](data);
    };
  });
