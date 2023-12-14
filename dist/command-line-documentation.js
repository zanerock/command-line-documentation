"use strict"
function n(n,t){(null==t||t>n.length)&&(t=n.length)
for(var r=0,e=new Array(t);r<t;r++)e[r]=n[r]
return e}function t(t){return function(t){if(Array.isArray(t))return n(t)}(t)||function(n){if("undefined"!=typeof Symbol&&null!=n[Symbol.iterator]||null!=n["@@iterator"])return Array.from(n)}(t)||function(t,r){if(t){if("string"==typeof t)return n(t,r)
var e=Object.prototype.toString.call(t).slice(8,-1)
return"Object"===e&&t.constructor&&(e=t.constructor.name),"Map"===e||"Set"===e?Array.from(t):"Arguments"===e||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(e)?n(t,r):void 0}}(t)||function(){throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}()}function r(n,t){var r="undefined"!=typeof Symbol&&n[Symbol.iterator]||n["@@iterator"]
if(!r){if(Array.isArray(n)||(r=function(n,t){if(!n)return
if("string"==typeof n)return e(n,t)
var r=Object.prototype.toString.call(n).slice(8,-1)
"Object"===r&&n.constructor&&(r=n.constructor.name)
if("Map"===r||"Set"===r)return Array.from(n)
if("Arguments"===r||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(r))return e(n,t)}(n))||t&&n&&"number"==typeof n.length){r&&(n=r)
var o=0,i=function(){}
return{s:i,n:function(){return o>=n.length?{done:!0}:{done:!1,value:n[o++]}},e:function(n){throw n},f:i}}throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}var a,u=!0,l=!1
return{s:function(){r=r.call(n)},n:function(){var n=r.next()
return u=n.done,n},e:function(n){l=!0,a=n},f:function(){try{u||null==r.return||r.return()}finally{if(l)throw a}}}}function e(n,t){(null==t||t>n.length)&&(t=n.length)
for(var r=0,e=new Array(t);r<t;r++)e[r]=n[r]
return e}Object.defineProperty(exports,Symbol.toStringTag,{value:"Module"})
var o=function(n){var t=n.depth,e=n.header,o=n.allOptions,i=u(o).options,l=a(t+1)+" "+e+"\n\n"
l+="|Option|Description|\n",console.log(i)
var c,f=r(i)
try{for(f.s();!(c=f.n()).done;){var s=c.value,d=s.alias,p=s.name,m=s.description
console.log("name:",p),l+="|"+p,void 0!==d&&(l+=", "+d),l+="|"+m+"|\n"}}catch(n){f.e(n)}finally{f.f()}return l+="\n"},i=function(n){var t=n.depth,r=n.mainCommand,e=n.mainOptions,o=a(t+1)+" Usage\n\n"
o+="`"+r
var i=u(e),l=i.defaultOption
if(i.options.length>0&&(o+=" <options>"),void 0!==l){var c=l.required
o+=" "+(!0===c?"[":"<")+l.name+(!0===c?"]":">")}return o+="`\n\n"},a=function(n){return"#".repeat(n)},u=function(n){var r=n.findIndex((function(n){return!0===n.defaultOption})),e=-1===r?void 0:n[r]
console.log("defaultOptionIndex:",r)
var o=t(n)
return-1!==r&&o.splice(r,1),console.log(),{defaultOption:e,options:o}}
exports.commandLineDocumentation=function(n){var t=n.cliSpec,r=void 0===t?function(n){throw new Error("Missing required parameter 'cliSpec'.")}():t,e=n.mainCommand,u=void 0===e?function(n){throw new Error("Missing required parameter 'mainCommand'.")}():e
n.output
var l=n.sectionDepth,c=void 0===l?1:l,f=n.title,s=void 0===f?"".concat(u," Command Reference"):f,d="",p=c,m=r.mainOptions,v=r.commands
return d=a(p)+" "+s+"\n\n",d+=i({depth:p,mainCommand:u,mainOptions:m}),d+=o({depth:p,header:void 0===v?"Options":"Main options",allOptions:m})}
//# sourceMappingURL=command-line-documentation.js.map
