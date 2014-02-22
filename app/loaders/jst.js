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
  "loaders/jst-dev",
  "module"
], function(devLoader, module) {

    // Cache the templates, if this is development, mark it
    var JST = window.JST = window.JST || {
      development: true
    };
    
    // conform a template prefix
    function conformPrefix(prefix) {
      return prefix.replace(/^\/|\/$/g, "") + "/";
    }

    // conform a template suffix
    function conformSuffix(suffix) {
      return "." + suffix.replace(/^\./, "");
    }

    // Template retrieval failure handler
    function failure(template, jqXHR, msg) {
      var err = "Template '" + template + "' could not be retrieved. ";
      if (jqXHR) {
        err += jqXHR.status + (msg ? ", " + msg : "");
      }
      throw new Error(err);
    }
    
    // Handle a cache miss
    function cacheMiss(template, data, root) {
      // If it is not development, always fail
      return (!JST.development && failure(template)) ||
        devLoader.load(template, data, root, failure, JST);
    }

    // Run the factory startup code against the configuration
    var prefix = conformPrefix(module.config().prefix);
    var suffix = conformSuffix(module.config().suffix);

    // Process a template for rendering.
    // Expect JST to be precompiled and cached except in development.
    function processTemplate(template, data, root) {
      template = prefix + template + suffix;

      // if not cached
      if (!JST[template]) {
        template = cacheMiss(template, data, root);
      }

      return JST[template](data);
    }

    // Return the method that will process templates for render
    return processTemplate;
  });