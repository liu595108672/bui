define("bui/swf/ua",function(){function e(){var e,n="ShockwaveFlash";if(navigator.plugins&&navigator.mimeTypes.length)e=(navigator.plugins["Shockwave Flash"]||0).description;else if(l.ActiveXObject)try{e=new ActiveXObject(n+"."+n).GetVariable("$version")}catch(a){BUI.log("getFlashVersion failed via ActiveXObject")}return e?t(e):void 0}function t(e){return e.match(/\d+/g).splice(0,3)}function n(e){var n="string"==typeof e?t(e):e,r=e;return BUI.isArray(n)&&(r=parseFloat(n[0]+"."+a(n[1],3)+a(n[2],5))),r||0}function a(e,t){e=e||0,e+="";var n=t+1-e.length;return new Array(n>0?n:0).join("0")+e}function r(t){return(t||o)&&(o=!1,s=e()),s}function i(e,t){return n(r(t))>=n(e)}var s,o=!0,l=window;return{fpv:r,fpvGTE:i}}),define("bui/swf",["bui/common","bui/swf/ua"],function(require){function e(e){for(var t in e)"function"==typeof e[t]&&(e[t]=null);e.parentNode.removeChild(e)}function t(e){var t,n,a,r="",i=[],s=e.nodeName.toLowerCase();if("object"==s)for(r=$(e).attr("data"),r&&i.push(e),t=e.childNodes,n=0;n<t.length;n++)a=t[n],1==a.nodeType&&("movie"==($(a).attr("name")||"").toLowerCase()?i.push(a):"embed"==a.nodeName.toLowerCase()?i.push(a):"object"==a.nodeName.toLowerCase()&&i.push(a));else"embed"==s&&i.push(e);return i}function n(e){var t=m;return u.each(e,function(e,n){n=n.toLowerCase(),n in A?t+=o(n,e):n==p&&(t+=o(n,s(e)))}),t}function a(e,t,n){return r(e,t,n,f.ie)+y+"/"+C+S}function r(e,t,a,r){var i,c=m,d=m;if(void 0==r&&(r=f.ie),r)u.each(t,function(e,t){c+=l(t,e)}),c+=l("classid",v),d+=o("movie",e),d+=n(a),i=y+C+c+S+d;else{c+=l("src",e),u.each(t,function(e,t){c+=l(t,e)}),c+=l("data",e),c+=l("type",h);for(k in a)k in A&&(d+=l(k,a[k]));a[p]&&(d+=l(p,s(a[p]))),i=y+N+c+d+"/"+S}return i}function i(e,t,n){var a,i;return f.ie?(a=r(e,t,n,1),delete t.id,delete t.style,i=r(e,t,n,0)):(i=r(e,t,n,0),delete t.id,delete t.style,a=r(e,t,n,1)),a+i+y+"/"+C+S+y+"/"+C+S}function s(e){var t,n=[];return u.each(e,function(e,t){"string"!=typeof e&&(e=d.stringify(e)),e&&n.push(t+"="+I(e))}),t=n.join("&")}function o(e,t){return'<param name="'+e+'" value="'+t+'"></param>'}function l(e,t){return g+e+w+b+t+b}var u=require("bui/common"),c=require("bui/swf/ua"),f=u.UA,d=u.JSON,h="application/x-shockwave-flash",v="clsid:d27cdb6e-ae6d-11cf-96b8-444553540000",p="flashvars",m="",g=" ",w="=",b='"',y="<",S=">",T=document,L=c.fpv,O=c.fpvGEQ,j=c.fpvGTE,C="object",N="embed",I=encodeURIComponent,A={wmode:m,allowscriptaccess:m,allownetworking:m,allowfullscreen:m,play:"false",loop:m,menu:m,quality:m,scale:m,salign:m,bgcolor:m,devicefont:m,hasPriority:m,base:m,swliveconnect:m,seamlesstabbing:m},E=function(e){E.superclass.constructor.call(this,e),this.initializer()};return u.extend(E,u.Base,{initializer:function(){var e,t,n,r,s=this,o=s.get("expressInstall"),l=s.get("htmlMode"),c=s.get("params"),d=s.get("attrs"),h=s.get("document"),v=$("<span>"),p=s.get("elBefore"),m=s.get("src"),g=s.get("version");return n=d.id=d.id||u.guid("ks-swf-"),L()?(g&&!j(g)&&(s.set("status",E.Status.TOO_LOW),o&&(m=o,(!("width"in d)||!/%$/.test(d.width)&&parseInt(d.width,10)<310)&&(d.width="310"),(!("height"in d)||!/%$/.test(d.height)&&parseInt(d.height,10)<137)&&(d.height="137"),r=c.flashVars=c.flashVars||{},u.mix(r,{MMredirectURL:location.href,MMplayerType:f.ie?"ActiveX":"PlugIn",MMdoctitle:h.title.slice(0,47)+" - Flash Player Installation"}))),t="full"==l?i(m,d,c):a(m,d,c),s.set("html",t),p?v.insertBefore(p):v.appendTo(s.get("render")),"outerHTML"in v[0]?v[0].outerHTML=t:v.replaceWith($(t)),e=h.getElementById(n),s.set("swfObject",e),"full"==l&&(f.ie?s.set("swfObject",e):s.set("swfObject",e.parentNode)),s.set("el",e),void(s.get("status")||s.set("status",E.Status.SUCCESS))):void s.set("status",E.Status.NOT_INSTALLED)},callSWF:function(e,t){var n,a,r=this.get("el");t=t||[];try{r[e]&&(n=r[e].apply(r,t))}catch(i){a="",0!==t.length&&(a="'"+t.join("', '")+"'"),n=new Function("swf","return swf."+e+"("+a+");")(r)}return n},destroy:function(){var t=this;t.detach();var n=t.get("swfObject");f.ie?(n.style.display="none",function(){4==n.readyState?e(n):setTimeout(arguments.callee,10)}()):n.parentNode.removeChild(n)}},{ATTRS:{expressInstall:{},src:{},version:{value:"9"},params:{value:{},shared:!1},attrs:{value:{},shared:!1},render:{setter:function(e){return"string"==typeof e&&(e=$(e)[0]),e},valueFn:function(){return document.body}},elBefore:{setter:function(e){return"string"==typeof e&&(e=$(e)[0]),e}},document:{value:T},status:{},el:{},swfObject:{},html:{},htmlMode:{value:"default"}},getSrc:function(e){var n=t(e)[0],a=n&&n.nodeName.toLowerCase();return"embed"==a?$(n).attr("src"):"object"==a?$(n).attr("data"):"param"==a?$(n).attr("value"):null},Status:{TOO_LOW:"flash version is too low",NOT_INSTALLED:"flash is not installed",SUCCESS:"success"},HtmlMode:{DEFAULT:"default",FULL:"full"},fpv:L,fpvGEQ:O,fpvGTE:j}),E});