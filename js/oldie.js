/**
 * Minified by jsDelivr using Terser v5.19.2.
 * Original file: /npm/oldie@1.3.0/index.js
 *
 * Do NOT use SRI with dynamically generated files! More information: https://www.jsdelivr.com/using-sri-with-dynamic-files
 */
var assign=require("object-assign"),postcss=require("postcss"),processors=[{plugin:require("postcss-calc"),namespace:"calc",defaults:{}},{plugin:require("postcss-unmq"),namespace:"media",defaults:{}},{plugin:require("postcss-unroot"),namespace:"root",defaults:{}},{plugin:require("postcss-unnth"),namespace:"nth",defaults:{}},{plugin:require("postcss-unnot"),namespace:"not",defaults:{}},{plugin:require("postcss-unopacity"),namespace:"opacity",defaults:{}},{plugin:require("postcss-unrgba"),namespace:"rgba",defaults:{}},{plugin:require("pixrem"),namespace:"rem",defaults:{replace:!0}},{plugin:require("postcss-pseudoelements"),namespace:"pseudo",defaults:{}}];module.exports=postcss.plugin("oldie",(function(s){s=assign({},s);var e=postcss();return processors.forEach((function(a){var u,n=a.namespace in s?s[a.namespace]:s;u=assign({},a.defaults,n),n&&!u.disable&&e.use(a.plugin(u))})),e}));
//# sourceMappingURL=/sm/4d10fe6212a6f0b0101429d21b9d89fc8fde623f36e86b9537aac8f3a58b2603.map