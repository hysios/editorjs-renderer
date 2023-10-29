"use strict";var e=["left","right","center","justify"],t={delimiter:function(){return"<br/>"},header:function(e){var t=e.data,r=e.id;return t.level?1===t.level?"<div id="+r+' style="text-align:center"><h'+t.level+">"+t.text+"</h"+t.level+"></div>":t.level<4?"<div id="+r+' style="padding-top: 15px"><h'+t.level+">"+t.text+"</h"+t.level+"></div>":"<div id="+r+' style="padding-top: 10px"><h'+t.level+">"+t.text+"</h"+t.level+"></div>":""},paragraph:function(t){var r=t.data,i=(t.id,r.alignment||r.align);return void 0!==i&&e.includes(i)?'<p style="text-align:'+i+';">'+r.text+"</p>":"<p>"+r.text+"</p>"},list:function(e){var t=e.data,r=(e.id,"unordered"===t.style?"ul":"ol"),i=function(e,t){var r=e.map((function(e){if(!e.content&&!e.items)return"<li>"+e+"</li>";var r="";return e.items&&(r=i(e.items,t)),e.content?"<li> "+e.content+" </li>"+r:void 0}));return"<"+t+">"+r.join("")+"</"+t+">"};return i(t.items,r)},image:function(e){var t=e.data,r=(e.id,t.caption?t.caption:"Image");return""===t.caption?'<img src="'+(t.file&&t.file.url?t.file.url:t.url)+'" alt="'+r+'" style="display: block; margin: 0 auto; max-width: 100%; height: auto;" /></br>':'<img src="'+(t.file&&t.file.url?t.file.url:t.url)+'" alt="'+r+'" style="display: block; margin: 0 auto; max-width: 100%; height: auto;" />\n    <p class="image-caption">'+t.caption+"</p>"},simpleImage:function(e){var t=e.data,r=(e.id,t.url),i=t.caption?t.caption:"Image";return'<img src="'+r+'" alt="'+i+'" style="display: block; margin: 0 auto; max-width: 100%; height: auto;" />\n  <p class="image-caption">'+i+"</p>"},quote:function(e){var t=e.data;e.id;return"<blockquote>"+t.text+"</blockquote> - "+t.caption},code:function(e){var t=e.data;e.id;return"<pre><code>"+t.code+"</code></pre>"},embed:function(e){var t=e.data;e.id;switch(t.service){case"vimeo":return'<iframe src="'+t.embed+'" height="'+t.height+'" frameborder="0" allow="autoplay; fullscreen; picture-in-picture" allowfullscreen></iframe>';case"youtube":return'<iframe width="'+t.width+'" height="'+t.height+'" src="'+t.embed+'" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>';default:throw new Error("Only Youtube and Vime Embeds are supported right now.")}},faq:function(e){e.data,e.id;return""}};function r(e){return new Error('[31m The Parser function of type "'+e+'" is not defined. \n\n  Define your custom parser functions as: [34mhttps://github.com/pavittarx/editorjs-html#extend-for-custom-blocks [0m')}var i=function(e){void 0===e&&(e={});var n=Object.assign({},t,e);return{parse:function(e){return e.blocks.map((function(e){return n[e.type]?n[e.type](e):r(e.type)}))},parseBlock:function(e){return n[e.type]?n[e.type](e):r(e.type)},parseStrict:function(e){var t=e.blocks,a=i(n).validate({blocks:t});if(a.length)throw new Error("Parser Functions missing for blocks: "+a.toString());for(var o=[],l=0;l<t.length;l++){if(!n[t[l].type])throw r(t[l].type);o.push(n[t[l].type](t[l]))}return o},validate:function(e){var t=e.blocks.map((function(e){return e.type})).filter((function(e,t,r){return r.indexOf(e)===t})),r=Object.keys(n);return t.filter((function(e){return!r.includes(e)}))}}};module.exports=i;
