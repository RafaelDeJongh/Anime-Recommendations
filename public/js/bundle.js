"use strict";function _typeof(e){return(_typeof="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(e){return typeof e}:function(e){return e&&"function"==typeof Symbol&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e})(e)}!function(e,t){var n=function(c,F){var R,D;if(function(){var e,t={lazyClass:"lazyload",loadedClass:"lazyloaded",loadingClass:"lazyloading",preloadClass:"lazypreload",errorClass:"lazyerror",autosizesClass:"lazyautosizes",srcAttr:"data-src",srcsetAttr:"data-srcset",sizesAttr:"data-sizes",minSize:40,customMedia:{},init:!0,expFactor:1.5,hFac:.8,loadMode:2,loadHidden:!0,ricTimeout:0,throttleDelay:125};for(e in D=c.lazySizesConfig||c.lazysizesConfig||{},t)e in D||(D[e]=t[e])}(),!F||!F.getElementsByClassName)return{init:function(){},cfg:D,noSupport:!0};var k=F.documentElement,u=c.Date,i=c.HTMLPictureElement,H="addEventListener",O="getAttribute",P=c[H],$=c.setTimeout,s=c.requestAnimationFrame||$,I=c.requestIdleCallback,q=/^picture$/i,o=["load","error","lazyincluded","_lazyloaded"],n={},U=Array.prototype.forEach,j=function(e,t){return n[t]||(n[t]=new RegExp("(\\s|^)"+t+"(\\s|$)")),n[t].test(e[O]("class")||"")&&n[t]},G=function(e,t){j(e,t)||e.setAttribute("class",(e[O]("class")||"").trim()+" "+t)},J=function(e,t){var n;(n=j(e,t))&&e.setAttribute("class",(e[O]("class")||"").replace(n," "))},K=function e(t,n,i){var a=i?H:"removeEventListener";i&&e(t,n),o.forEach(function(e){t[a](e,n)})},Q=function(e,t,n,i,a){var o=F.createEvent("Event");return n||(n={}),n.instance=R,o.initEvent(t,!i,!a),o.detail=n,e.dispatchEvent(o),o},V=function(e,t){var n;!i&&(n=c.picturefill||D.pf)?(t&&t.src&&!e[O]("srcset")&&e.setAttribute("srcset",t.src),n({reevaluate:!0,elements:[e]})):t&&t.src&&(e.src=t.src)},X=function(e,t){return(getComputedStyle(e,null)||{})[t]},r=function(e,t,n){for(n=n||e.offsetWidth;n<D.minSize&&t&&!e._lazysizesWidth;)n=t.offsetWidth,t=t.parentNode;return n},Y=function(){var n,i,t=[],a=[],o=t,r=function(){var e=o;for(o=t.length?a:t,i=!(n=!0);e.length;)e.shift()();n=!1},e=function(e,t){n&&!t?e.apply(this,arguments):(o.push(e),i||(i=!0,(F.hidden?$:s)(r)))};return e._lsFlush=r,e}(),Z=function(n,e){return e?function(){Y(n)}:function(){var e=this,t=arguments;Y(function(){n.apply(e,t)})}},ee=function(e){var t,n,i=function(){t=null,e()},a=function e(){var t=u.now()-n;t<99?$(e,99-t):(I||i)(i)};return function(){n=u.now(),t||(t=$(a,99))}},t=function(){var y,m,d,z,t,p,h,v,g,C,b,A,o=/^img$/i,f=/^iframe$/i,_="onscroll"in c&&!/(gle|ing)bot/.test(navigator.userAgent),E=0,w=0,N=-1,M=function(e){w--,(!e||w<0||!e.target)&&(w=0)},S=function(e){return null==A&&(A="hidden"==X(F.body,"visibility")),A||"hidden"!=X(e.parentNode,"visibility")&&"hidden"!=X(e,"visibility")},x=function(e,t){var n,i=e,a=S(e);for(v-=t,b+=t,g-=t,C+=t;a&&(i=i.offsetParent)&&i!=F.body&&i!=k;)(a=0<(X(i,"opacity")||1))&&"visible"!=X(i,"overflow")&&(n=i.getBoundingClientRect(),a=C>n.left&&g<n.right&&b>n.top-1&&v<n.bottom+1);return a},e=function(){var e,t,n,i,a,o,r,s,l,c,u,d,f=R.elements;if((z=D.loadMode)&&w<8&&(e=f.length)){for(t=0,N++;t<e;t++)if(f[t]&&!f[t]._lazyRace)if(!_||R.prematureUnveil&&R.prematureUnveil(f[t]))T(f[t]);else if((s=f[t][O]("data-expand"))&&(o=1*s)||(o=E),c||(c=!D.expand||D.expand<1?500<k.clientHeight&&500<k.clientWidth?500:370:D.expand,R._defEx=c,u=c*D.expFactor,d=D.hFac,A=null,E<u&&w<1&&2<N&&2<z&&!F.hidden?(E=u,N=0):E=1<z&&1<N&&w<6?c:0),l!==o&&(p=innerWidth+o*d,h=innerHeight+o,r=-1*o,l=o),n=f[t].getBoundingClientRect(),(b=n.bottom)>=r&&(v=n.top)<=h&&(C=n.right)>=r*d&&(g=n.left)<=p&&(b||C||g||v)&&(D.loadHidden||S(f[t]))&&(m&&w<3&&!s&&(z<3||N<4)||x(f[t],o))){if(T(f[t]),a=!0,9<w)break}else!a&&m&&!i&&w<4&&N<4&&2<z&&(y[0]||D.preloadAfterLoad)&&(y[0]||!s&&(b||C||g||v||"auto"!=f[t][O](D.sizesAttr)))&&(i=y[0]||f[t]);i&&!a&&T(i)}},n=function(e){var n,i=0,a=D.throttleDelay,o=D.ricTimeout,t=function(){n=!1,i=u.now(),e()},r=I&&49<o?function(){I(t,{timeout:o}),o!==D.ricTimeout&&(o=D.ricTimeout)}:Z(function(){$(t)},!0);return function(e){var t;(e=!0===e)&&(o=33),n||(n=!0,(t=a-(u.now()-i))<0&&(t=0),e||t<9?r():$(r,t))}}(e),W=function(e){var t=e.target;t._lazyCache?delete t._lazyCache:(M(e),G(t,D.loadedClass),J(t,D.loadingClass),K(t,B),Q(t,"lazyloaded"))},i=Z(W),B=function(e){i({target:e.target})},L=function(e){var t,n=e[O](D.srcsetAttr);(t=D.customMedia[e[O]("data-media")||e[O]("media")])&&e.setAttribute("media",t),n&&e.setAttribute("srcset",n)},r=Z(function(t,e,n,i,a){var o,r,s,l,c,u;(c=Q(t,"lazybeforeunveil",e)).defaultPrevented||(i&&(n?G(t,D.autosizesClass):t.setAttribute("sizes",i)),r=t[O](D.srcsetAttr),o=t[O](D.srcAttr),a&&(s=t.parentNode,l=s&&q.test(s.nodeName||"")),u=e.firesLoad||"src"in t&&(r||o||l),c={target:t},G(t,D.loadingClass),u&&(clearTimeout(d),d=$(M,2500),K(t,B,!0)),l&&U.call(s.getElementsByTagName("source"),L),r?t.setAttribute("srcset",r):o&&!l&&(f.test(t.nodeName)?function(t,n){try{t.contentWindow.location.replace(n)}catch(e){t.src=n}}(t,o):t.src=o),a&&(r||l)&&V(t,{src:o})),t._lazyRace&&delete t._lazyRace,J(t,D.lazyClass),Y(function(){var e=t.complete&&1<t.naturalWidth;u&&!e||(e&&G(t,"ls-is-cached"),W(c),t._lazyCache=!0,$(function(){"_lazyCache"in t&&delete t._lazyCache},9)),"lazy"==t.loading&&w--},!0)}),T=function(e){if(!e._lazyRace){var t,n=o.test(e.nodeName),i=n&&(e[O](D.sizesAttr)||e[O]("sizes")),a="auto"==i;(!a&&m||!n||!e[O]("src")&&!e.srcset||e.complete||j(e,D.errorClass)||!j(e,D.lazyClass))&&(t=Q(e,"lazyunveilread").detail,a&&te.updateElem(e,!0,e.offsetWidth),e._lazyRace=!0,w++,r(e,t,a,i,n))}},a=ee(function(){D.loadMode=3,n()}),s=function(){3==D.loadMode&&(D.loadMode=2),a()},l=function e(){if(!m){if(u.now()-t<999)return void $(e,999);m=!0,D.loadMode=3,n(),P("scroll",s,!0)}};return{_:function(){t=u.now(),R.elements=F.getElementsByClassName(D.lazyClass),y=F.getElementsByClassName(D.lazyClass+" "+D.preloadClass),P("scroll",n,!0),P("resize",n,!0),c.MutationObserver?new MutationObserver(n).observe(k,{childList:!0,subtree:!0,attributes:!0}):(k[H]("DOMNodeInserted",n,!0),k[H]("DOMAttrModified",n,!0),setInterval(n,999)),P("hashchange",n,!0),["focus","mouseover","click","load","transitionend","animationend"].forEach(function(e){F[H](e,n,!0)}),/d$|^c/.test(F.readyState)?l():(P("load",l),F[H]("DOMContentLoaded",n),$(l,2e4)),R.elements.length?(e(),Y._lsFlush()):n()},checkElems:n,unveil:T,_aLSL:s}}(),te=function(){var n,o=Z(function(e,t,n,i){var a,o,r;if(e._lazysizesWidth=i,i+="px",e.setAttribute("sizes",i),q.test(t.nodeName||""))for(a=t.getElementsByTagName("source"),o=0,r=a.length;o<r;o++)a[o].setAttribute("sizes",i);n.detail.dataAttr||V(e,n.detail)}),i=function(e,t,n){var i,a=e.parentNode;a&&(n=r(e,a,n),i=Q(e,"lazybeforesizes",{width:n,dataAttr:!!t}),i.defaultPrevented||(n=i.detail.width)&&n!==e._lazysizesWidth&&o(e,a,i,n))},e=ee(function(){var e,t=n.length;if(t)for(e=0;e<t;e++)i(n[e])});return{_:function(){n=F.getElementsByClassName(D.autosizesClass),P("resize",e)},checkElems:e,updateElem:i}}(),e=function e(){!e.i&&F.getElementsByClassName&&(e.i=!0,te._(),t._())};return $(function(){D.init&&e()}),R={cfg:D,autoSizer:te,loader:t,init:e,uP:V,aC:G,rC:J,hC:j,fire:Q,gW:r,rAF:Y}}(e,e.document);e.lazySizes=n,"object"==("undefined"==typeof module?"undefined":_typeof(module))&&module.exports&&(module.exports=n)}("undefined"!=typeof window?window:{});
"use strict";function debounce(i,a,l){var n;return function(){var e=this,t=arguments,r=l&&!n;clearTimeout(n),n=setTimeout(function(){n=null,l||i.apply(e,t)},a),r&&i.apply(e,t)}}var filter_input=document.querySelector("[data-search]"),clear_filter=document.getElementById("search-clear");clear_filter.addEventListener("click",function(){filter_input.value="",filter()});var category=[];function filter(){var e=filter_input.value.toLowerCase(),t=document.querySelector(".items").getElementsByTagName("a"),r=document.querySelector(".items").getElementsByTagName("figcaption");0<category.length&&(t=document.querySelectorAll(".items ."+category),r=document.querySelectorAll(".items ."+category+" figcaption"));for(var i=0;i<t.length;i++)-1!==r[i].innerHTML.toLowerCase().indexOf(e)?t[i].classList.remove("hidden"):t[i].classList.add("hidden");if(e&&!category.includes("top-10")){var a=document.querySelectorAll(".top-list");for(i=0;i<a.length;i++)a[i].classList.add("hidden")}e?clear_filter.classList.remove("hidden"):clear_filter.classList.add("hidden")}filter_input.addEventListener("keyup",debounce(filter,200));var filtersElem=document.querySelector(".filter-button-group");filtersElem.addEventListener("click",function(e){if(e.preventDefault(),!e.target.classList.contains("filter-button-group")){if(e.target.classList.contains("filter-button-active")){e.target.classList.remove("filter-button-active");for(var t=document.getElementsByClassName("anime"),r=0;r<t.length;r++){t[r].classList.remove("hidden")}return category=[],void filter()}for(var i=document.getElementsByClassName("filter-button"),a=0;a<i.length;a++){i[a].classList.remove("filter-button-active")}if(e.target.classList.add("filter-button-active"),null!==(category=e.target.getAttribute("data-filter"))){for(var l=document.getElementsByClassName("anime"),n=0;n<l.length;n++){l[n].classList.add("hidden")}for(var s=document.getElementsByClassName(category),c=0;c<s.length;c++){s[c].classList.remove("hidden")}filter()}}});