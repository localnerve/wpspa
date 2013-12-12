/*
 * jst
 * Process JST templates for an application
 * Configured with module configuration in rjs config
 * Allows for development and pre-built modes
 * Development uses synchronous ajax to retrieve templates
 * Development uses lodash to compile templates
 * Built code expects the templates to be precompiled and cached
 */
define([
    "jquery",
    "lodash",
    "module"
  ], function($, _, module) {

    // Cache the templates, if this is development, mark it
    var JST = window.JST = window.JST || {
      development: true
    };
    
    // Process a template prefix
    function processTemplatePrefix(prefix) {
      prefix = prefix.charAt(prefix.length - 1) !== '/' ? prefix + "/" : prefix;
      prefix = prefix.charAt(0) === '/' ? prefix.substring(1) : prefix;
      return prefix;
    }

    // Process a template suffix
    function processTemplateSuffix(suffix) {
      suffix = suffix.charAt(0) !== '.' ? "." + suffix : suffix;
      return suffix;
    }

    // Template retrieval failure handler
    function failure(template, jqXHR, msg) {
      var err = "Template '" + template + "' could not be retrieved. ";
      if (jqXHR) {
        err += jqXHR.status + (msg ? ", " + msg : "");
      }
      throw new Error(err);
    }
    
    // Run the factory startup code against the configuration
    var prefix = processTemplatePrefix(module.config().prefix);
    var suffix = processTemplateSuffix(module.config().suffix);

    // Process a template for rendering.
    // Expect JST to be precompiled and cached except in development.
    function processTemplate(template, data, root) {
      template = prefix + template + suffix;
      // if not cached
      if (!JST[template]) {
        // If not development
        if (!JST.development) {
          // this was a real build, so you should've built your templates - shameful.
          failure(template);
        } else {
          // development-only code
          if (_.isString(root) && template.substring(0, root.length - 1) != root) {
            template = root + template;
          }
          // For development, its ok to block, you won't notice it - much.
          $.ajax({
            url: template,
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
    }

    // Return the method that will process templates for render
    return processTemplate;
  });
