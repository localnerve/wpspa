/*
 * jst-dev
 *
 * Development only code to process JST templates
 *
 * Development uses blocking, synchronous ajax to retrieve templates
 * Development uses lodash to compile templates
 */
define([
  "jquery",
  "lodash"
], function($, _) {

  // If the root is supplied and not already specified in template path,
  // upate the template path
  function alterTemplatePath(template, root) {
    if (_.isString(root) && template.substring(0, root.length - 1) != root) {
      template = root + template;
    }
    return template;
  }

  // Synchronously load the template
  function syncLoad(template, data, root, failure, JST) {

    template = alterTemplatePath(template, root);

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

    return template;
  }

  return {
    load: syncLoad
  };
});