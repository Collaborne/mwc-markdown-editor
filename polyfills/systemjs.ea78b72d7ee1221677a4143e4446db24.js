!function(){function e(e,n){return(n||"")+" (SystemJS https://git.io/JvFET#"+e+")"}function n(e,n){if(-1!==e.indexOf("\\")&&(e=e.replace(/\\/g,"/")),"/"===e[0]&&"/"===e[1])return n.slice(0,n.indexOf(":")+1)+e;if("."===e[0]&&("/"===e[1]||"."===e[1]&&("/"===e[2]||2===e.length&&(e+="/"))||1===e.length&&(e+="/"))||"/"===e[0]){var t,r=n.slice(0,n.indexOf(":")+1);if(t="/"===n[r.length+1]?"file:"!==r?(t=n.slice(r.length+2)).slice(t.indexOf("/")+1):n.slice(8):n.slice(r.length+("/"===n[r.length])),"/"===e[0])return n.slice(0,n.length-t.length-1)+e;for(var i=t.slice(0,t.lastIndexOf("/")+1)+e,o=[],c=-1,u=0;i.length>u;u++)-1!==c?"/"===i[u]&&(o.push(i.slice(c,u+1)),c=-1):"."===i[u]?"."!==i[u+1]||"/"!==i[u+2]&&u+2!==i.length?"/"===i[u+1]||u+1===i.length?u+=1:c=u:(o.pop(),u+=2):c=u;return-1!==c&&o.push(i.slice(c)),n.slice(0,n.length-t.length)+o.join("")}}function t(e,t){return n(e,t)||(-1!==e.indexOf(":")?e:n("./"+e,t))}function r(e,n){for(var t in n)e[t]=n[t];return e}function i(e,t,r,i,o){for(var c in e){var f=n(c,r)||c,l=e[c];if("string"==typeof l){var a=s(i,n(l,r)||l,o);a?t[f]=a:u("W1",c,l)}}}function o(e,n){if(n[e])return e;var t=e.length;do{var r=e.slice(0,t+1);if(r in n)return r}while(-1!==(t=e.lastIndexOf("/",t-1)))}function c(e,n){var t=o(e,n);if(t){var r=n[t];if(null===r)return;if(t.length>=e.length||"/"===r[r.length-1])return r+e.slice(t.length);u("W2",t,r)}}function u(n,t,r){console.warn(e(n,[r,t].join(", ")))}function s(e,n,t){for(var r=e.scopes,i=t&&o(t,r);i;){var u=c(n,r[i]);if(u)return u;i=o(i.slice(0,i.lastIndexOf("/")),r)}return c(n,e.imports)||-1!==n.indexOf(":")&&n}function f(){this[O]={}}function l(e,n){p&&[].forEach.call(document.querySelectorAll('script[type="systemjs-importmap"]'+n),e)}function a(){[].forEach.call(document.querySelectorAll("script[type=systemjs-module]"),(function(e){e.src&&System.import("import:"===e.src.slice(0,7)?e.src.slice(7):t(e.src,h))}))}var h,v="undefined"!=typeof Symbol,d="undefined"!=typeof self,p="undefined"!=typeof document,m=d?self:global;if(p){var g=document.querySelector("base[href]");g&&(h=g.href)}if(!h&&"undefined"!=typeof location){var y=(h=location.href.split("#")[0].split("?")[0]).lastIndexOf("/");-1!==y&&(h=h.slice(0,y+1))}var E,S=v&&Symbol.toStringTag,O=v?Symbol():"@",x=f.prototype;x.import=function(n,t){var r=this;return Promise.resolve(r.prepareImport()).then((function(){return r.resolve(n,t)})).then((function(n){var t=function n(t,r,i){var o=t[O][r];if(o)return o;var c=[],u=Object.create(null);S&&Object.defineProperty(u,S,{value:"Module"});var s=Promise.resolve().then((function(){return t.instantiate(r,i)})).then((function(n){if(!n)throw Error(e(2,r));var i=n[1]((function(e,n){o.h=!0;var t=!1;if("object"!=typeof e)e in u&&u[e]===n||(u[e]=n,t=!0);else{for(var r in e)n=e[r],r in u&&u[r]===n||(u[r]=n,t=!0);e.__esModule&&(u.__esModule=e.__esModule)}if(t)for(var i=0;c.length>i;i++)c[i](u);return n}),2===n[1].length?{import:function(e){return t.import(e,r)},meta:t.createContext(r)}:void 0);return o.e=i.execute||function(){},[n[0],i.setters||[]]})),f=s.then((function(e){return Promise.all(e[0].map((function(i,o){var c=e[1][o];return Promise.resolve(t.resolve(i,r)).then((function(e){var i=n(t,e,r);return Promise.resolve(i.I).then((function(){return c&&(i.i.push(c),!i.h&&i.I||c(i.n)),i}))}))}))).then((function(e){o.d=e}))}));return f.catch((function(e){o.e=null,o.er=e})),o=t[O][r]={id:r,i:c,n:u,I:s,L:f,h:!1,d:void 0,e:void 0,er:void 0,E:void 0,C:void 0}}(r,n);return t.C||function(e,n){return n.C=function e(n,t,r){if(!r[t.id])return r[t.id]=!0,Promise.resolve(t.L).then((function(){return Promise.all(t.d.map((function(t){return e(n,t,r)})))}))}(e,n,{}).then((function(){return function e(n,t,r){function i(){try{var e=t.e.call(w);if(e)return e=e.then((function(){t.C=t.n,t.E=null})),t.E=t.E||e;t.C=t.n}catch(n){throw t.er=n,n}finally{t.L=t.I=void 0,t.e=null}}if(!r[t.id]){if(r[t.id]=!0,!t.e){if(t.er)throw t.er;return t.E?t.E:void 0}var o;return t.d.forEach((function(t){var i;(i=e(n,t,r))&&(o=o||[]).push(i)})),o?Promise.all(o).then(i):i()}}(e,n,{})})).then((function(){return n.n}))}(r,t)}))},x.createContext=function(e){return{url:e}},x.register=function(e,n){E=[e,n]},x.getRegister=function(){var e=E;return E=void 0,e};var w=Object.freeze(Object.create(null));m.System=new f;var P=v?Symbol():"#",b=v?Symbol():"$";l((function(e){e._t=fetch(e.src).then((function(e){return e.text()}))}),"[src]"),x.prepareImport=function(){var n=this;return n[b]||(n[P]={imports:{},scopes:{}},n[b]=Promise.resolve(),l((function(o){n[b]=n[b].then((function(){return(o._t||o.src&&fetch(o.src).then((function(e){return e.text()}))||Promise.resolve(o.innerHTML)).then((function(n){try{return JSON.parse(n)}catch(t){throw Error(e(1))}})).then((function(e){n[P]=function(e,n,o){var c={imports:r({},o.imports),scopes:r({},o.scopes)};if(e.imports&&i(e.imports,c.imports,n,o,null),e.scopes)for(var u in e.scopes){var s=t(u,n);i(e.scopes[u],c.scopes[s]||(c.scopes[s]={}),n,o,s)}return c}(e,o.src||h,n[P])}))}))}),"")),n[b]},x.resolve=function(t,r){return s(this[P],n(t,r=r||h)||t,r)||function(n,t){throw Error(e(8,[n,t].join(", ")))}(t,r)};var j,C,I=x.register;x.register=function(e,n){I.call(this,e,n)},x.createScript=function(e){var n=document.createElement("script");return n.charset="utf-8",n.async=!0,n.crossOrigin="anonymous",n.src=e,n},x.instantiate=function(n,t){var r=this;return new Promise((function(i,o){var c=x.createScript(n);c.addEventListener("error",(function(){o(Error(e(3,[n,t].join(", "))))})),c.addEventListener("load",(function(){document.head.removeChild(c),j===n?o(C):i(r.getRegister())})),document.head.appendChild(c)}))},p&&(window.addEventListener("error",(function(e){j=e.filename,C=e.error})),window.addEventListener("DOMContentLoaded",a),a()),d&&"function"==typeof importScripts&&(x.instantiate=function(e){var n=this;return Promise.resolve().then((function(){return importScripts(e),n.getRegister()}))})}();
//# sourceMappingURL=s.min.js.map
