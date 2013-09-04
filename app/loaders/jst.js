define([
    "jquery",
    "lodash",
    "module"
  ], function($, _, module) {

    // cache the templates, if this is development, mark it
    var JST = window.JST = window.JST || {
      development: true
    };

    // assign template prefix
    var prefix = module.config().prefix;
    prefix = prefix.charAt(prefix.length - 1) !== '/' ? prefix + "/" : prefix;
    prefix = prefix.charAt(0) === '/' ? prefix.substring(1) : prefix;

    // assign template suffix
    var suffix = module.config().suffix;
    suffix = suffix.charAt(0) !== '.' ? "." + suffix : suffix;

    // template retrieval failure handler

    function failure(template, jqXHR, msg) {
      var err = "Template '" + template + "' could not be retrieved. ";
      if (jqXHR) {
        err += jqXHR.status + (msg ? ", " + msg : "");
      }
      throw new Error(err);
    }

    // return the method that will process templates for render
    return function(template, data, root) {
      template = prefix + template + suffix;
      // if not cached
      if (!JST[template]) {
        // If not development
        if (!JST.development) {
          // this was a real build, so you should've built your templates - shameful.
          failure(template);
        } else {
          // development-only code    
          if (_.isString(root) && template.substring(0, root.length - 1) != root)
            template = root + template;
          // we have to block for marionette... unless you are willing to support marionette.async...
          $.ajax(template, {
            async: false
          })
            .done(function(data, textStatus, jqXHR) {
              if (textStatus === "success")
              // compile and cache
                JST[template] = _.template(data);
              else
                failure(template, jqXHR);
            })
            .fail(function(jqXHR, textStatus, errorThrown) {
              failure(template, jqXHR, errorThrown.message);
            });
        }
      }
      return JST[template](data);
    };
  });
