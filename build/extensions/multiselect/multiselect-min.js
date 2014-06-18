define("bui/extensions/multiselect/multiselect",["bui/common","bui/extensions/multiselect/multilist","bui/extensions/multiselect/multilistpicker","bui/extensions/search"],function(require){var e=require("bui/common"),t=e.Component,i=require("bui/extensions/multiselect/multilist"),n=require("bui/extensions/multiselect/multilistpicker"),s=require("bui/extensions/search"),l=e.prefix+"select-input",u=t.Controller.extend({initializer:function(){var e,t=this,n=t.get("search"),l=t.get("searchTpl"),u={};n&&(l&&(u.tpl=l),n=new s(u),e=[n]);var r=new i({items:t.get("items"),url:t.get("url"),plugins:e});t.set("multilist",r)},renderUI:function(){var e=this,t=e.get("el"),i=t.find("."+l),s=e.get("multilist"),u=new n({trigger:i,autoRender:!0,textField:i,valueField:e.get("valueField"),children:[s]});e.set("picker",u),e.set("textField",i)},bindUI:function(){var e=this,t=e.get("multilist");t.on("selected",function(t){var i=t.items;return e.fire("selected",{items:i})}),t.on("unselected",function(t){var i=t.items;return e.fire("unselected",{items:i})})}},{ATTRS:{elCls:{value:"bui-select"},searchTpl:{},search:{},url:{},items:{},source:{getter:function(){return this.get("multilist").get("source")}},target:{getter:function(){return this.get("multilist").get("target")}},valueField:{setter:function(e){return $(e)}},textField:{},tpl:{view:!0,value:'<input type="text" readonly="readonly" class="'+l+'"/><span class="x-icon x-icon-normal"><i class="icon icon-caret icon-caret-down"></i></span>'}}},{xclass:"multiselect"});return u});