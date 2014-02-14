/*
 * Common configuration
 *
 * A common set of configurations for the application front/back end.
 * Loaded in AMD and CommonJS, so UMD notation is used.
 */
(function(factory) {
  if (typeof define === "function" && define.amd) {
    // AMD. Register as an anonymous module.
    define(factory);
  } else if (typeof module !== "undefined") {
    // Node/CommonJS
    module.exports = factory();
  } else {
    throw new Error("Browser globals not supported");
  }
}(function() {

  return {
    customFieldsParam: "custom_fields=_wpspa_meta_description%2C_wpspa_page_title%2C_wpspa_prefetch"
    // TODO: add ATF urls and share with requirejs
  };

}));