/*
 * A select collection of zepto helpers
 *  https://gist.github.com/pamelafox/1379704
 *  This is supposed to be in zepto, but I don't see where
 */
define(function() {

  // scrollLeft, scrollTop
  ["Left", "Top"].forEach(function(name, i) {
    var method = "scroll" + name;
 
    function isWindow( obj ) {
        return obj && typeof obj === "object" && "setInterval" in obj;
    }
 
    function getWindow( elem ) {
      return isWindow( elem ) ? elem : elem.nodeType === 9 ? elem.defaultView || elem.parentWindow : false;
    }
 
    $.fn[ method ] = function( val ) {
      var elem, win;
 
      if ( val === undefined ) {
 
        elem = this[ 0 ];
 
        if ( !elem ) {
          return null;
        }
 
        win = getWindow( elem );
 
        // Return the scroll offset
        return win ? ("pageXOffset" in win) ? win[ i ? "pageYOffset" : "pageXOffset" ] :
            win.document.documentElement[ method ] ||
            win.document.body[ method ] :
            elem[ method ];
      }
 
      // Set the scroll offset
      this.each(function() {
        win = getWindow( this );
 
        if ( win ) {
          var xCoord = !i ? val : $( win ).scrollLeft();
          var yCoord = i ? val : $( win ).scrollTop();
          win.scrollTo(xCoord, yCoord);
        } else {
          this[ method ] = val;
        }
      });
    };
  });

});