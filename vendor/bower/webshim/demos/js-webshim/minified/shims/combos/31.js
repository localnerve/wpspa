webshims.register("dom-extend",function(e,t,a,i,n){"use strict";if(t.assumeARIA=e.support.getSetAttribute||Modernizr.canvas||Modernizr.video||Modernizr.boxsizing,("text"==e('<input type="email" />').attr("type")||""===e("<form />").attr("novalidate")||"required"in e("<input />")[0].attributes)&&t.error("IE browser modes are busted in IE10. Please test your HTML/CSS/JS with a real IE version or at least IETester or similiar tools"),e.parseHTML||t.error("Webshims needs jQuery 1.8+ to work properly. Please update your jQuery version or downgrade webshims."),1===t.cfg.extendNative&&t.warn("extendNative configuration will be set to false by default with next release. In case you rely on it set it to 'true' otherwise to 'false'. See http://bit.ly/16OOTQO"),!t.cfg.no$Switch){var r=function(){if(!a.jQuery||a.$&&a.jQuery!=a.$||a.jQuery.webshims||(t.error("jQuery was included more than once. Make sure to include it only once or try the $.noConflict(extreme) feature! Webshims and other Plugins might not work properly. Or set webshims.cfg.no$Switch to 'true'."),a.$&&(a.$=t.$),a.jQuery=t.$),t.M!=Modernizr){t.error("Modernizr was included more than once. Make sure to include it only once! Webshims and other scripts might not work properly.");for(var e in Modernizr)e in t.M||(t.M[e]=Modernizr[e]);Modernizr=t.M}};r(),setTimeout(r,90),t.ready("DOM",r),e(r),t.ready("WINDOWLOAD",r)}var o=t.modules,s=/\s*,\s*/,l={},u={},c={},d={},p={},f=e.fn.val,h=function(t,a,i,n,r){return r?f.call(e(t)):f.call(e(t),i)};e.widget||function(){var t=e.cleanData;e.cleanData=function(a){if(!e.widget)for(var i,n=0;null!=(i=a[n]);n++)try{e(i).triggerHandler("remove")}catch(r){}t(a)}}(),e.fn.val=function(t){var a=this[0];if(arguments.length&&null==t&&(t=""),!arguments.length)return a&&1===a.nodeType?e.prop(a,"value",t,"val",!0):f.call(this);if(e.isArray(t))return f.apply(this,arguments);var i=e.isFunction(t);return this.each(function(r){if(a=this,1===a.nodeType)if(i){var o=t.call(a,r,e.prop(a,"value",n,"val",!0));null==o&&(o=""),e.prop(a,"value",o,"val")}else e.prop(a,"value",t,"val")})},e.fn.onTrigger=function(e,t){return this.on(e,t).each(t)},e.fn.onWSOff=function(t,a,n,r){return r||(r=i),e(r)[n?"onTrigger":"on"](t,a),this.on("remove",function(i){i.originalEvent||e(r).off(t,a)}),this};var m="_webshimsLib"+Math.round(1e3*Math.random()),v=function(t,a,i){if(t=t.jquery?t[0]:t,!t)return i||{};var r=e.data(t,m);return i!==n&&(r||(r=e.data(t,m,{})),a&&(r[a]=i)),a?r&&r[a]:r};[{name:"getNativeElement",prop:"nativeElement"},{name:"getShadowElement",prop:"shadowElement"},{name:"getShadowFocusElement",prop:"shadowFocusElement"}].forEach(function(t){e.fn[t.name]=function(){var a=[];return this.each(function(){var i=v(this,"shadowData"),n=i&&i[t.prop]||this;-1==e.inArray(n,a)&&a.push(n)}),this.pushStack(a)}}),["removeAttr","prop","attr"].forEach(function(a){l[a]=e[a],e[a]=function(t,i,r,o,s){var d="val"==o,f=d?h:l[a];if(!t||!u[i]||1!==t.nodeType||!d&&o&&"attr"==a&&e.attrFn[i])return f(t,i,r,o,s);var m,v,g,y=(t.nodeName||"").toLowerCase(),b=c[y],w="attr"!=a||r!==!1&&null!==r?a:"removeAttr";if(b||(b=c["*"]),b&&(b=b[i]),b&&(m=b[w]),m){if("value"==i&&(v=m.isVal,m.isVal=d),"removeAttr"===w)return m.value.call(t);if(r===n)return m.get?m.get.call(t):m.value;m.set&&("attr"==a&&r===!0&&(r=i),g=m.set.call(t,r)),"value"==i&&(m.isVal=v)}else g=f(t,i,r,o,s);if((r!==n||"removeAttr"===w)&&p[y]&&p[y][i]){var T;T="removeAttr"==w?!1:"prop"==w?!!r:!0,p[y][i].forEach(function(e){(!e.only||(e.only="prop"&&"prop"==a)||"attr"==e.only&&"prop"!=a)&&e.call(t,r,T,d?"val":w,a)})}return g},d[a]=function(e,i,r){c[e]||(c[e]={}),c[e][i]||(c[e][i]={});var o=c[e][i][a],s=function(e,t,n){return t&&t[e]?t[e]:n&&n[e]?n[e]:"prop"==a&&"value"==i?function(e){var t=this;return r.isVal?h(t,i,e,!1,0===arguments.length):l[a](t,i,e)}:"prop"==a&&"value"==e&&r.value.apply?function(){var e=l[a](this,i);return e&&e.apply&&(e=e.apply(this,arguments)),e}:function(e){return l[a](this,i,e)}};c[e][i][a]=r,r.value===n&&(r.set||(r.set=r.writeable?s("set",r,o):t.cfg.useStrict&&"prop"==i?function(){throw i+" is readonly on "+e}:function(){t.info(i+" is readonly on "+e)}),r.get||(r.get=s("get",r,o))),["value","get","set"].forEach(function(e){r[e]&&(r["_sup"+e]=s(e,o))})}});var g=function(){var e=t.getPrototypeOf(i.createElement("foobar")),a=Object.prototype.hasOwnProperty,n=Modernizr.advancedObjectProperties&&Modernizr.objectAccessor;return function(r,o,s){var l,u;if(!(n&&(l=i.createElement(r))&&(u=t.getPrototypeOf(l))&&e!==u)||l[o]&&a.call(l,o))s._supvalue=function(){var e=v(this,"propValue");return e&&e[o]&&e[o].apply?e[o].apply(this,arguments):e&&e[o]},y.extendValue(r,o,s.value);else{var c=l[o];s._supvalue=function(){return c&&c.apply?c.apply(this,arguments):c},u[o]=s.value}s.value._supvalue=s._supvalue}}(),y=function(){var a={};t.addReady(function(i,r){var o={},s=function(t){o[t]||(o[t]=e(i.getElementsByTagName(t)),r[0]&&e.nodeName(r[0],t)&&(o[t]=o[t].add(r)))};e.each(a,function(e,a){return s(e),a&&a.forEach?(a.forEach(function(t){o[e].each(t)}),n):(t.warn("Error: with "+e+"-property. methods: "+a),n)}),o=null});var r,o=e([]),s=function(t,n){a[t]?a[t].push(n):a[t]=[n],e.isDOMReady&&(r||e(i.getElementsByTagName(t))).each(n)};return{createTmpCache:function(t){return e.isDOMReady&&(r=r||e(i.getElementsByTagName(t))),r||o},flushTmpCache:function(){r=null},content:function(t,a){s(t,function(){var t=e.attr(this,a);null!=t&&e.attr(this,a,t)})},createElement:function(e,t){s(e,t)},extendValue:function(t,a,i){s(t,function(){e(this).each(function(){var e=v(this,"propValue",{});e[a]=this[a],this[a]=i})})}}}(),b=function(e,t){e.defaultValue===n&&(e.defaultValue=""),e.removeAttr||(e.removeAttr={value:function(){e[t||"prop"].set.call(this,e.defaultValue),e.removeAttr._supvalue.call(this)}}),e.attr||(e.attr={})};e.extend(t,{getID:function(){var t=(new Date).getTime();return function(a){a=e(a);var i=a.prop("id");return i||(t++,i="ID-"+t,a.eq(0).prop("id",i)),i}}(),implement:function(e,a){var i=v(e,"implemented")||v(e,"implemented",{});return i[a]?(t.warn(a+" already implemented for element #"+e.id),!1):(i[a]=!0,!0)},extendUNDEFProp:function(t,a){e.each(a,function(e,a){e in t||(t[e]=a)})},createPropDefault:b,data:v,moveToFirstEvent:function(t,a,i){var n,r=(e._data(t,"events")||{})[a];r&&r.length>1&&(n=r.pop(),i||(i="bind"),"bind"==i&&r.delegateCount?r.splice(r.delegateCount,0,n):r.unshift(n)),t=null},addShadowDom:function(){var n,r,o,s={init:!1,runs:0,test:function(){var e=s.getHeight(),t=s.getWidth();e!=s.height||t!=s.width?(s.height=e,s.width=t,s.handler({type:"docresize"}),s.runs++,9>s.runs&&setTimeout(s.test,90)):s.runs=0},handler:function(t){clearTimeout(n),n=setTimeout(function(){if("resize"==t.type){var n=e(a).width(),l=e(a).width();if(l==r&&n==o)return;r=l,o=n,s.height=s.getHeight(),s.width=s.getWidth()}e(i).triggerHandler("updateshadowdom")},"resize"==t.type?50:9)},_create:function(){e.each({Height:"getHeight",Width:"getWidth"},function(e,t){var a=i.body,n=i.documentElement;s[t]=function(){return Math.max(a["scroll"+e],n["scroll"+e],a["offset"+e],n["offset"+e],n["client"+e])}})},start:function(){!this.init&&i.body&&(this.init=!0,this._create(),this.height=s.getHeight(),this.width=s.getWidth(),setInterval(this.test,600),e(this.test),t.ready("WINDOWLOAD",this.test),e(i).on("updatelayout",this.handler),e(a).bind("resize",this.handler),function(){var t,a=e.fn.animate;e.fn.animate=function(){return clearTimeout(t),t=setTimeout(function(){s.test()},99),a.apply(this,arguments)}}())}};return t.docObserve=function(){t.ready("DOM",function(){s.start()})},function(a,i,n){if(a&&i){n=n||{},a.jquery&&(a=a[0]),i.jquery&&(i=i[0]);var r=e.data(a,m)||e.data(a,m,{}),o=e.data(i,m)||e.data(i,m,{}),s={};n.shadowFocusElement?n.shadowFocusElement&&(n.shadowFocusElement.jquery&&(n.shadowFocusElement=n.shadowFocusElement[0]),s=e.data(n.shadowFocusElement,m)||e.data(n.shadowFocusElement,m,s)):n.shadowFocusElement=i,e(a).on("remove",function(t){t.originalEvent||setTimeout(function(){e(i).remove()},4)}),r.hasShadow=i,s.nativeElement=o.nativeElement=a,s.shadowData=o.shadowData=r.shadowData={nativeElement:a,shadowElement:i,shadowFocusElement:n.shadowFocusElement},n.shadowChilds&&n.shadowChilds.each(function(){v(this,"shadowData",o.shadowData)}),n.data&&(s.shadowData.data=o.shadowData.data=r.shadowData.data=n.data),n=null}t.docObserve()}}(),propTypes:{standard:function(e){b(e),e.prop||(e.prop={set:function(t){e.attr.set.call(this,""+t)},get:function(){return e.attr.get.call(this)||e.defaultValue}})},"boolean":function(e){b(e),e.prop||(e.prop={set:function(t){t?e.attr.set.call(this,""):e.removeAttr.value.call(this)},get:function(){return null!=e.attr.get.call(this)}})},src:function(){var t=i.createElement("a");return t.style.display="none",function(a,i){b(a),a.prop||(a.prop={set:function(e){a.attr.set.call(this,e)},get:function(){var a,n=this.getAttribute(i);if(null==n)return"";if(t.setAttribute("href",n+""),!e.support.hrefNormalized){try{e(t).insertAfter(this),a=t.getAttribute("href",4)}catch(r){a=t.getAttribute("href",4)}e(t).detach()}return a||t.href}})}}(),enumarated:function(e){b(e),e.prop||(e.prop={set:function(t){e.attr.set.call(this,t)},get:function(){var t=(e.attr.get.call(this)||"").toLowerCase();return t&&-1!=e.limitedTo.indexOf(t)||(t=e.defaultValue),t}})}},reflectProperties:function(a,i){"string"==typeof i&&(i=i.split(s)),i.forEach(function(i){t.defineNodeNamesProperty(a,i,{prop:{set:function(t){e.attr(this,i,t)},get:function(){return e.attr(this,i)||""}}})})},defineNodeNameProperty:function(a,i,n){return u[i]=!0,n.reflect&&t.propTypes[n.propType||"standard"](n,i),["prop","attr","removeAttr"].forEach(function(r){var o=n[r];o&&(o="prop"===r?e.extend({writeable:!0},o):e.extend({},o,{writeable:!0}),d[r](a,i,o),"*"!=a&&t.cfg.extendNative&&"prop"==r&&o.value&&e.isFunction(o.value)&&g(a,i,o),n[r]=o)}),n.initAttr&&y.content(a,i),n},defineNodeNameProperties:function(e,a,i,n){for(var r in a)!n&&a[r].initAttr&&y.createTmpCache(e),i&&(a[r][i]||(a[r][i]={},["value","set","get"].forEach(function(e){e in a[r]&&(a[r][i][e]=a[r][e],delete a[r][e])}))),a[r]=t.defineNodeNameProperty(e,r,a[r]);return n||y.flushTmpCache(),a},createElement:function(a,i,n){var r;return e.isFunction(i)&&(i={after:i}),y.createTmpCache(a),i.before&&y.createElement(a,i.before),n&&(r=t.defineNodeNameProperties(a,n,!1,!0)),i.after&&y.createElement(a,i.after),y.flushTmpCache(),r},onNodeNamesPropertyModify:function(t,a,i,n){"string"==typeof t&&(t=t.split(s)),e.isFunction(i)&&(i={set:i}),t.forEach(function(e){p[e]||(p[e]={}),"string"==typeof a&&(a=a.split(s)),i.initAttr&&y.createTmpCache(e),a.forEach(function(t){p[e][t]||(p[e][t]=[],u[t]=!0),i.set&&(n&&(i.set.only=n),p[e][t].push(i.set)),i.initAttr&&y.content(e,t)}),y.flushTmpCache()})},defineNodeNamesBooleanProperty:function(a,i,r){r||(r={}),e.isFunction(r)&&(r.set=r),t.defineNodeNamesProperty(a,i,{attr:{set:function(e){this.setAttribute(i,e),r.set&&r.set.call(this,!0)},get:function(){var e=this.getAttribute(i);return null==e?n:i}},removeAttr:{value:function(){this.removeAttribute(i),r.set&&r.set.call(this,!1)}},reflect:!0,propType:"boolean",initAttr:r.initAttr||!1})},contentAttr:function(e,t,a){if(e.nodeName){var i;return a===n?(i=e.attributes[t]||{},a=i.specified?i.value:null,null==a?n:a):("boolean"==typeof a?a?e.setAttribute(t,t):e.removeAttribute(t):e.setAttribute(t,a),n)}},activeLang:function(){var a,i,n=[],r={},s=/:\/\/|^\.*\//,l=function(a,i,n){var r;return i&&n&&-1!==e.inArray(i,n.availabeLangs||[])?(a.loading=!0,r=n.langSrc,s.test(r)||(r=t.cfg.basePath+r),t.loader.loadScript(r+i+".js",function(){a.langObj[i]?(a.loading=!1,c(a,!0)):e(function(){a.langObj[i]&&c(a,!0),a.loading=!1})}),!0):!1},u=function(e){r[e]&&r[e].forEach(function(e){e.callback(a,i,"")})},c=function(e,t){if(e.activeLang!=a&&e.activeLang!==i){var n=o[e.module].options;e.langObj[a]||i&&e.langObj[i]?(e.activeLang=a,e.callback(e.langObj[a]||e.langObj[i],a),u(e.module)):t||l(e,a,n)||l(e,i,n)||!e.langObj[""]||""===e.activeLang||(e.activeLang="",e.callback(e.langObj[""],a),u(e.module))}},d=function(t){return"string"==typeof t&&t!==a?(a=t,i=a.split("-")[0],a==i&&(i=!1),e.each(n,function(e,t){c(t)})):"object"==typeof t&&(t.register?(r[t.register]||(r[t.register]=[]),r[t.register].push(t),t.callback(a,i,"")):(t.activeLang||(t.activeLang=""),n.push(t),c(t))),a};return d}()}),e.each({defineNodeNamesProperty:"defineNodeNameProperty",defineNodeNamesProperties:"defineNodeNameProperties",createElements:"createElement"},function(e,a){t[e]=function(e,i,n,r){"string"==typeof e&&(e=e.split(s));var o={};return e.forEach(function(e){o[e]=t[a](e,i,n,r)}),o}}),t.isReady("webshimLocalization",!0)}),function(e,t){if(!(!e.webshims.assumeARIA||"content"in t.createElement("template")||(e(function(){var t=e("main").attr({role:"main"});t.length>1?webshims.error("only one main element allowed in document"):t.is("article *, section *")&&webshims.error("main not allowed inside of article/section elements")}),"hidden"in t.createElement("a")))){var a={article:"article",aside:"complementary",section:"region",nav:"navigation",address:"contentinfo"},i=function(e,t){var a=e.getAttribute("role");a||e.setAttribute("role",t)};e.webshims.addReady(function(n,r){if(e.each(a,function(t,a){for(var o=e(t,n).add(r.filter(t)),s=0,l=o.length;l>s;s++)i(o[s],a)}),n===t){var o=t.getElementsByTagName("header")[0],s=t.getElementsByTagName("footer"),l=s.length;if(o&&!e(o).closest("section, article")[0]&&i(o,"banner"),!l)return;var u=s[l-1];e(u).closest("section, article")[0]||i(u,"contentinfo")}})}}(webshims.$,document),webshims.register("form-core",function(e,t,a,i,n,r){"use strict";t.capturingEventPrevented=function(t){if(!t._isPolyfilled){var a=t.isDefaultPrevented,i=t.preventDefault;t.preventDefault=function(){return clearTimeout(e.data(t.target,t.type+"DefaultPrevented")),e.data(t.target,t.type+"DefaultPrevented",setTimeout(function(){e.removeData(t.target,t.type+"DefaultPrevented")},30)),i.apply(this,arguments)},t.isDefaultPrevented=function(){return!(!a.apply(this,arguments)&&!e.data(t.target,t.type+"DefaultPrevented"))},t._isPolyfilled=!0}},Modernizr.formvalidation&&!t.bugs.bustedValidity&&t.capturingEvents(["invalid"],!0);var o=function(t){return(e.prop(t,"validity")||{valid:1}).valid},s=function(){var a=["form-validation"];r.lazyCustomMessages&&(r.customMessages=!0,a.push("form-message")),r.addValidators&&a.push("form-validators"),t.reTest(a),e(i).off(".lazyloadvalidation")},l=function(t){var a=!1;return e(t).jProp("elements").each(function(){return a=e(this).is(":invalid"),a?!1:n}),a},u=/^(?:form)$/i;e.extend(e.expr[":"],{"valid-element":function(t){return u.test(t.nodeName||"")?!l(t):!(!e.prop(t,"willValidate")||!o(t))},"invalid-element":function(t){return u.test(t.nodeName||"")?l(t):!(!e.prop(t,"willValidate")||o(t))},"required-element":function(t){return!(!e.prop(t,"willValidate")||!e.prop(t,"required"))},"user-error":function(t){return e.prop(t,"willValidate")&&e(t).hasClass("user-error")},"optional-element":function(t){return!(!e.prop(t,"willValidate")||e.prop(t,"required")!==!1)}}),["valid","invalid","required","optional"].forEach(function(t){e.expr[":"][t]=e.expr.filters[t+"-element"]});var c=e.expr[":"].focus;e.expr[":"].focus=function(){try{return c.apply(this,arguments)}catch(e){t.error(e)}return!1},t.triggerInlineForm=function(t,a){e(t).trigger(a)};var d=function(e,a,i){s(),t.ready("form-validation",function(){e[a].apply(e,i)})},p="transitionDelay"in i.documentElement.style?"":" no-transition",f=t.cfg.wspopover;f.position||f.position===!1||(f.position={at:"left bottom",my:"left top",collision:"fit flip"}),t.wsPopover={id:0,_create:function(){this.options=e.extend(!0,{},f,this.options),this.id=t.wsPopover.id++,this.eventns=".wsoverlay"+this.id,this.timers={},this.element=e('<div class="ws-popover'+p+'" tabindex="-1"><div class="ws-po-outerbox"><div class="ws-po-arrow"><div class="ws-po-arrowbox" /></div><div class="ws-po-box" /></div></div>'),this.contentElement=e(".ws-po-box",this.element),this.lastElement=e([]),this.bindElement(),this.element.data("wspopover",this)},options:{},content:function(e){this.contentElement.html(e)},bindElement:function(){var e=this,t=function(){e.stopBlur=!1};this.preventBlur=function(){e.stopBlur=!0,clearTimeout(e.timers.stopBlur),e.timers.stopBlur=setTimeout(t,9)},this.element.on({mousedown:this.preventBlur})},show:function(){d(this,"show",arguments)}},t.validityAlert={showFor:function(){d(this,"showFor",arguments)}},t.getContentValidationMessage=function(t,a,i){var r=e(t).data("errormessage")||t.getAttribute("x-moz-errormessage")||"";return i&&r[i]?r=r[i]:r&&(a=a||e.prop(t,"validity")||{valid:1},a.valid&&(r="")),"object"==typeof r&&(a=a||e.prop(t,"validity")||{valid:1},a.valid||e.each(a,function(e,t){return t&&"valid"!=e&&r[e]?(r=r[e],!1):n})),"object"==typeof r&&(r=r.defaultMessage),r||""},e.fn.getErrorMessage=function(a){var i="",n=this[0];return n&&(i=t.getContentValidationMessage(n,!1,a)||e.prop(n,"customValidationMessage")||e.prop(n,"validationMessage")),i},e(i).on("focusin.lazyloadvalidation",function(t){"form"in t.target&&e(t.target).is(":invalid")&&s()}),t.ready("WINDOWLOAD",s),r.replaceValidationUI&&t.ready("DOM forms",function(){e(i).on("firstinvalid",function(e){e.isInvalidUIPrevented()||(e.preventDefault(),t.validityAlert.showFor(e.target))})}),function(){var t,a,n=[];e(i).on("invalid",function(r){if(!r.wrongWebkitInvalid){var o=e(r.target);if(!t){t=e.Event("firstinvalid"),t.isInvalidUIPrevented=r.isDefaultPrevented;var s=e.Event("firstinvalidsystem");e(i).triggerHandler(s,{element:r.target,form:r.target.form,isInvalidUIPrevented:r.isDefaultPrevented}),o.trigger(t)}t&&t.isDefaultPrevented()&&r.preventDefault(),n.push(r.target),r.extraData="fix",clearTimeout(a),a=setTimeout(function(){var a={type:"lastinvalid",cancelable:!1,invalidlist:e(n)};t=!1,n=[],e(r.target).trigger(a,a)},9),o=null}})}()}),webshims.register("form-datalist",function(e,t,a,i,n,r){"use strict";var o=function(e){e&&"string"==typeof e||(e="DOM"),o[e+"Loaded"]||(o[e+"Loaded"]=!0,t.ready(e,function(){t.loader.loadList(["form-datalist-lazy"])}))},s={submit:1,button:1,reset:1,hidden:1,range:1,date:1,month:1};t.modules["form-number-date-ui"].loaded&&e.extend(s,{number:1,time:1}),t.propTypes.element=function(a){t.createPropDefault(a,"attr"),a.prop||(a.prop={get:function(){var t=e.attr(this,"list");return t&&(t=i.getElementById(t),t&&a.propNodeName&&!e.nodeName(t,a.propNodeName)&&(t=null)),t||null},writeable:!1})},function(){var l=e.webshims.cfg.forms,u=Modernizr.input.list;if(!u||l.customDatalist){var c=function(){var a={autocomplete:{attr:{get:function(){var t=this,a=e.data(t,"datalistWidget");return a?a._autocomplete:"autocomplete"in t?t.autocomplete:t.getAttribute("autocomplete")},set:function(t){var a=this,i=e.data(a,"datalistWidget");i?(i._autocomplete=t,"off"==t&&i.hideList()):"autocomplete"in a?a.autocomplete=t:a.setAttribute("autocomplete",t)}}}};!l.customDatalist||u&&"selectedOption"in e("<input />")[0]||(a.selectedOption={prop:{writeable:!1,get:function(){var t,a,i=this,r=e.prop(i,"list"),o=null;return r?(t=e.prop(i,"value"))?(a=e.prop(r,"options"),a.length?(e.each(a,function(a,i){return t==e.prop(i,"value")?(o=i,!1):n}),o):o):o:o}}}),u&&((e("<datalist><select><option></option></select></datalist>").prop("options")||[]).length||t.defineNodeNameProperty("datalist","options",{prop:{writeable:!1,get:function(){var t=this.options||[];if(!t.length){var a=this,i=e("select",a);i[0]&&i[0].options&&i[0].options.length&&(t=i[0].options)}return t}}}),a.list={attr:{get:function(){var a=t.contentAttr(this,"list");return null!=a?(e.data(this,"datalistListAttr",a),s[e.prop(this,"type")]||s[e.attr(this,"type")]||this.removeAttribute("list")):a=e.data(this,"datalistListAttr"),null==a?n:a},set:function(a){var i=this;e.data(i,"datalistListAttr",a),s[e.prop(this,"type")]||s[e.attr(this,"type")]?i.setAttribute("list",a):t.objectCreate(d,n,{input:i,id:a,datalist:e.prop(i,"list")}),e(i).triggerHandler("listdatalistchange")}},initAttr:!0,reflect:!0,propType:"element",propNodeName:"datalist"}),t.defineNodeNameProperties("input",a),t.addReady(function(t,a){a.filter("datalist > select, datalist, datalist > option, datalist > select > option").closest("datalist").each(function(){e(this).triggerHandler("updateDatalist")})})},d={_create:function(a){if(!s[e.prop(a.input,"type")]&&!s[e.attr(a.input,"type")]){var i=a.datalist,r=e.data(a.input,"datalistWidget"),l=this;return i&&r&&r.datalist!==i?(r.datalist=i,r.id=a.id,e(r.datalist).off("updateDatalist.datalistWidget").on("updateDatalist.datalistWidget",e.proxy(r,"_resetListCached")),r._resetListCached(),n):i?(r&&r.datalist===i||(this.datalist=i,this.id=a.id,this.hasViewableData=!0,this._autocomplete=e.attr(a.input,"autocomplete"),e.data(a.input,"datalistWidget",this),o("WINDOWLOAD"),t.isReady("form-datalist-lazy")?this._lazyCreate(a):(e(a.input).one("focus",o),t.ready("form-datalist-lazy",function(){l._destroyed||l._lazyCreate(a)}))),n):(r&&r.destroy(),n)}},destroy:function(t){var r,o=e.attr(this.input,"autocomplete");e(this.input).off(".datalistWidget").removeData("datalistWidget"),this.shadowList.remove(),e(i).off(".datalist"+this.id),e(a).off(".datalist"+this.id),this.input.form&&this.input.id&&e(this.input.form).off("submit.datalistWidget"+this.input.id),this.input.removeAttribute("aria-haspopup"),o===n?this.input.removeAttribute("autocomplete"):e(this.input).attr("autocomplete",o),t&&"beforeunload"==t.type&&(r=this.input,setTimeout(function(){e.attr(r,"list",e.attr(r,"list"))},9)),this._destroyed=!0}};t.loader.addModule("form-datalist-lazy",{noAutoCallback:!0,options:e.extend(r,{shadowListProto:d})}),c()}}()});