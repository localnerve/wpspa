define([
  "jquery",
  "foundation/foundation",
  "foundation/foundation.topbar"
  ], function($) {

    var vendorInit = false;

    return {
      initialize: function() {
        if (!vendorInit) {
          vendorInit = true;
          $(document).foundation();
        }
      }
    };

  });