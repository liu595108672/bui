define("bui/calendar",["bui/common","bui/calendar/calendar","bui/calendar/monthpicker","bui/calendar/datepicker"],function(require){var e=require("bui/common"),t=e.namespace("Calendar");return e.mix(t,{Calendar:require("bui/calendar/calendar"),MonthPicker:require("bui/calendar/monthpicker"),DatePicker:require("bui/calendar/datepicker")}),t}),define("bui/calendar/monthpicker",["bui/common","bui/overlay","bui/list","bui/toolbar"],function(require){function e(){return $.map(u,function(e,t){return{text:e,value:t}})}var t=require("bui/common"),n=(t.Component,require("bui/overlay").Overlay),a=require("bui/list").SimpleList,i=require("bui/toolbar"),r=t.prefix,s="x-monthpicker-month",c="x-monthpicker-year",l="x-monthpicker-yearnav",o="x-monthpicker-item",u=["\u4e00\u6708","\u4e8c\u6708","\u4e09\u6708","\u56db\u6708","\u4e94\u6708","\u516d\u6708","\u4e03\u6708","\u516b\u6708","\u4e5d\u6708","\u5341\u6708","\u5341\u4e00\u6708","\u5341\u4e8c\u6708"],d=a.extend({bindUI:function(){var e=this;e.get("el").delegate("a","click",function(e){e.preventDefault()}).delegate("."+s,"dblclick",function(){e.fire("dblclick")})}},{ATTRS:{itemTpl:{view:!0,value:'<li class="'+o+' x-monthpicker-month"><a href="#" hidefocus="on">{text}</a></li>'},itemCls:{value:o},items:{view:!0,value:e()},elCls:{view:!0,value:"x-monthpicker-months"}}},{xclass:"calendar-month-panel"}),h=a.extend({bindUI:function(){var e=this,t=e.get("el");t.delegate("a","click",function(e){e.preventDefault()}),t.delegate("."+c,"dblclick",function(){e.fire("dblclick")}),t.delegate(".x-icon","click",function(t){var n=$(t.currentTarget);n.hasClass(l+"-prev")?e._prevPage():n.hasClass(l+"-next")&&e._nextPage()}),e.on("itemselected",function(t){t.item&&e.setInternal("year",t.item.value)})},_prevPage:function(){var e=this,t=e.get("start"),n=e.get("yearCount");e.set("start",t-n)},_nextPage:function(){var e=this,t=e.get("start"),n=e.get("yearCount");e.set("start",t+n)},_uiSetStart:function(){var e=this;e._setYearsContent()},_uiSetYear:function(e){var t=this,n=t.findItemByField("value",e);n?t.setSelectedByField(e):t.set("start",e)},_setYearsContent:function(){for(var e=this,t=e.get("year"),n=e.get("start"),a=e.get("yearCount"),i=[],r=n;n+a>r;r++){var s=r.toString();i.push({text:s,value:r})}e.set("items",i),e.setSelectedByField(t)}},{ATTRS:{items:{view:!0,value:[]},elCls:{view:!0,value:"x-monthpicker-years"},itemCls:{value:o},year:{},start:{value:(new Date).getFullYear()},yearCount:{value:10},itemTpl:{view:!0,value:'<li class="'+o+" "+c+'"><a href="#" hidefocus="on">{text}</a></li>'},tpl:{view:!0,value:'<div class="'+l+'"><span class="'+l+'-prev x-icon x-icon-normal x-icon-small"><span class="icon icon-caret icon-caret-left"></span></span><span class="'+l+'-next x-icon x-icon-normal x-icon-small"><span class="icon icon-caret icon-caret-right"></span></span></div><ul></ul>'}}},{xclass:"calendar-year-panel"}),g=n.extend({initializer:function(){var e=this,t=e.get("children"),n=new d,a=new h,i=e._createFooter();t.push(n),t.push(a),t.push(i),e.set("yearPanel",a),e.set("monthPanel",n)},bindUI:function(){var e=this;e.get("monthPanel").on("itemselected",function(t){t.item&&e.setInternal("month",t.item.value)}).on("dblclick",function(){e._successCall()}),e.get("yearPanel").on("itemselected",function(t){t.item&&e.setInternal("year",t.item.value)}).on("dblclick",function(){e._successCall()})},_successCall:function(){var e=this,t=e.get("success");t&&t.call(e)},_createFooter:function(){var e=this;return new i.Bar({elCls:r+"clear x-monthpicker-footer",children:[{xclass:"bar-item-button",text:"\u786e\u5b9a",btnCls:"button button-small button-primary",handler:function(){e._successCall()}},{xclass:"bar-item-button",text:"\u53d6\u6d88",btnCls:"button button-small last",handler:function(){var t=e.get("cancel");t&&t.call(e)}}]})},_uiSetYear:function(e){this.get("yearPanel").set("year",e)},_uiSetMonth:function(e){this.get("monthPanel").setSelectedByField(e)}},{ATTRS:{footer:{},align:{value:{}},year:{},success:{value:function(){}},cancel:{value:function(){}},width:{value:180},month:{},yearPanel:{},monthPanel:{}}},{xclass:"monthpicker"});return g}),define("bui/calendar/header",["bui/common"],function(require){var e=require("bui/common"),t=e.prefix,n=e.Component,a="year-text",i="month-text",r="x-datepicker-arrow",s="x-datepicker-prev",c="x-datepicker-next",l=n.Controller.extend({bindUI:function(){var e=this,t=e.get("el");t.delegate("."+r,"click",function(t){t.preventDefault();var n=$(t.currentTarget);n.hasClass(c)?e.nextMonth():n.hasClass(s)&&e.prevMonth()}),t.delegate(".x-datepicker-month","click",function(){e.fire("headerclick")})},setMonth:function(e,t){var n=this,a=n.get("year"),i=n.get("month");(e!==a||t!==i)&&(n.set("year",e),n.set("month",t),n.fire("monthchange",{year:e,month:t}))},nextMonth:function(){var e=this,t=new Date(e.get("year"),e.get("month")+1);e.setMonth(t.getFullYear(),t.getMonth())},prevMonth:function(){var e=this,t=new Date(e.get("year"),e.get("month")-1);e.setMonth(t.getFullYear(),t.getMonth())},_uiSetYear:function(e){var t=this;t.get("el").find("."+a).text(e)},_uiSetMonth:function(e){var t=this;t.get("el").find("."+i).text(e+1)}},{ATTRS:{year:{sync:!1},month:{sync:!1,setter:function(e){this.set("monthText",e+1)}},monthText:{},tpl:{view:!0,value:'<div class="'+r+" "+s+'"><span class="icon icon-white icon-caret  icon-caret-left"></span></div><div class="x-datepicker-month"><div class="month-text-container"><span><span class="year-text">{year}</span>\u5e74 <span class="month-text">{monthText}</span>\u6708</span><span class="'+t+"caret "+t+'caret-down"></span></div></div><div class="'+r+" "+c+'"><span class="icon icon-white icon-caret  icon-caret-right"></span></div>'},elCls:{view:!0,value:"x-datepicker-header"},events:{value:{monthchange:!0}}}},{xclass:"calendar-header"});return l}),define("bui/calendar/panel",["bui/common"],function(require){var e=require("bui/common"),t=e.Component,n=e.Date,a="x-datepicker-date",i="x-datepicker-today",r="x-datepicker-disabled",s="isoDate",c="x-datepicker-selected",l=6,o={deactive:"prevday",active:"active",disabled:"disabled"},u=["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"],d=t.View.extend({renderUI:function(){this.updatePanel()},updatePanel:function(){var e=this,t=e.get("el"),n=t.find("tbody"),a=e._getPanelInnerTpl();n.empty(),$(a).appendTo(n)},_getPanelInnerTpl:function(){for(var e=this,t=e._getFirstDate(),a=[],i=0;l>i;i++){var r=n.addWeek(i,t);a.push(e._getWeekTpl(r))}return a.join("")},_getWeekTpl:function(t){for(var a=this,i=a.get("weekTpl"),r=[],s=0;s<u.length;s++){var c=n.addDay(s,t);r.push(a._getDayTpl(c))}return e.substitute(i,{daysTpl:r.join("")})},_getDayTpl:function(t){var a=this,r=a.get("dayTpl"),c=t.getDay(),l=a._isToday(t)?i:"",d=u[c],h=t.getDate(),g=a._isInRange(t)?a._isCurrentMonth(t)?o.active:o.deactive:o.disabled;return e.substitute(r,{dayOfWeek:d,dateType:g,dateNumber:h,todayCls:l,date:n.format(t,s)})},_getFirstDate:function(e,t){var a=this,i=a._getMonthFirstDate(e,t),r=i.getDay();return n.addDay(-1*r,i)},_getMonthFirstDate:function(e,t){var n=this,e=e||n.get("year"),t=t||n.get("month");return new Date(e,t)},_isCurrentMonth:function(e){return e.getMonth()===this.get("month")},_isToday:function(e){var t=new Date;return t.getFullYear()===e.getFullYear()&&t.getMonth()===e.getMonth()&&t.getDate()===e.getDate()},_isInRange:function(e){var t=this,n=t.get("maxDate"),a=t.get("minDate");return a&&a>e?!1:n&&e>n?!1:!0},_clearSelectedDate:function(){var e=this;e.get("el").find("."+c).removeClass(c)},_findDateElement:function(e){var t=this,i=n.format(e,s),r=t.get("el").find("."+a),c=null;return i&&r.each(function(e,t){return $(t).attr("title")===i?(c=$(t),!1):void 0}),c},_setSelectedDate:function(e){var t=this,n=t._findDateElement(e);t._clearSelectedDate(),n&&n.addClass(c)}},{ATTRS:{}}),h=t.Controller.extend({initializer:function(){var e=this,t=new Date;e.get("year")||e.set("year",t.getFullYear()),e.get("month")||e.set("month",t.getMonth())},bindUI:function(){var e=this,t=e.get("el");t.delegate("."+a,"click",function(e){e.preventDefault()}),t.delegate("."+r,"mouseup",function(e){e.stopPropagation()})},performActionInternal:function(e){var t=this,i=$(e.target).closest("."+a);if(i){var r=i.attr("title");r&&(r=n.parse(r),t.get("view")._isInRange(r)&&t.set("selected",r))}},setMonth:function(e,t){var n=this,a=n.get("year"),i=n.get("month");(e!==a||t!==i)&&(n.set("year",e),n.set("month",t),n.get("view").updatePanel())},_uiSetSelected:function(e,t){var a=this;t&&t.prevVal&&n.isDateEquals(e,t.prevVal)||(a.setMonth(e.getFullYear(),e.getMonth()),a.get("view")._setSelectedDate(e),a.fire("selectedchange",{date:e}))},_uiSetMaxDate:function(e){e&&this.get("view").updatePanel()},_uiSetMinDate:function(e){e&&this.get("view").updatePanel()}},{ATTRS:{year:{view:!0},month:{view:!0},selected:{},focusable:{value:!0},dayTpl:{view:!0,value:'<td class="x-datepicker-date x-datepicker-{dateType} {todayCls} day-{dayOfWeek}" title="{date}"><a href="#" hidefocus="on" tabindex="1"><em><span>{dateNumber}</span></em></a></td>'},events:{value:{click:!1,selectedchange:!0}},maxDate:{view:!0,setter:function(t){return t?e.isString(t)?n.parse(t):t:void 0}},minDate:{view:!0,setter:function(t){return t?e.isString(t)?n.parse(t):t:void 0}},weekTpl:{view:!0,value:"<tr>{daysTpl}</tr>"},tpl:{view:!0,value:'<table class="x-datepicker-inner" cellspacing="0"><thead><tr><th  title="Sunday"><span>\u65e5</span></th><th  title="Monday"><span>\u4e00</span></th><th  title="Tuesday"><span>\u4e8c</span></th><th  title="Wednesday"><span>\u4e09</span></th><th  title="Thursday"><span>\u56db</span></th><th  title="Friday"><span>\u4e94</span></th><th  title="Saturday"><span>\u516d</span></th></tr></thead><tbody class="x-datepicker-body"></tbody></table>'},xview:{value:d}}},{xclass:"calendar-panel",priority:0});return h}),define("bui/calendar/calendar",["bui/picker","bui/calendar/monthpicker","bui/calendar/header","bui/calendar/panel","bui/toolbar"],function(require){function e(){var e=new Date;return new Date(e.getFullYear(),e.getMonth(),e.getDate())}function t(e){return 10>e?"0"+e:e.toString()}function n(e){for(var n=[],a=0;e>a;a++)n.push({text:t(a),value:t(a)});return n}function a(e,n,a){var r=e.get("el").find("."+n);i.isNumber(a)&&(a=t(a)),r.val(a)}var i=require("bui/common"),r=i.prefix,s="x-datepicker-time",c="x-datepicker-hour",l="x-datepicker-minute",o="x-datepicker-second",u="x-timepicker",d=require("bui/picker").ListPicker,h=require("bui/calendar/monthpicker"),g=require("bui/calendar/header"),p=require("bui/calendar/panel"),m=require("bui/toolbar"),v=i.Component,f=i.Date,y=v.Controller.extend({initializer:function(){var e=this,t=e.get("children"),n=new g,a=new p,i=e.get("footer")||e._createFooter();t.push(n),t.push(a),t.push(i),e.set("header",n),e.set("panel",a),e.set("footer",i)},renderUI:function(){var e=this,t=e.get("children");if(e.get("showTime")){var n=e.get("timepicker")||e._initTimePicker();t.push(n),e.set("timepicker",n)}},bindUI:function(){var e=this,t=e.get("header"),n=e.get("panel");n.on("selectedchange",function(t){var n=t.date;f.isDateEquals(n,e.get("selectedDate"))||e.set("selectedDate",n)}),e.get("showTime")?e._initTimePickerEvent():n.on("click",function(){e.fire("accept")}),t.on("monthchange",function(t){e._setYearMonth(t.year,t.month)}),t.on("headerclick",function(){var n=e.get("monthpicker")||e._createMonthPicker();n.set("year",t.get("year")),n.set("month",t.get("month")),n.show()})},_initTimePicker:function(){var e=this,t=e.get("lockTime"),n={hour:c,minute:l,second:o};if(t)for(var a in t){var i=n[a.toLowerCase()];e.set(a,t[a]),e.get("el").find("."+i).attr("disabled","")}var r=new d({elCls:u,children:[{itemTpl:'<li><a href="#">{text}</a></li>'}],autoAlign:!1,align:{node:e.get("el"),points:["bl","bl"],offset:[0,-30]},trigger:e.get("el").find("."+s)});return r.render(),e._initTimePickerEvent(r),r},_initTimePickerEvent:function(e){var t=this,e=t.get("timepicker");e&&(e.get("el").delegate("a","click",function(e){e.preventDefault()}),e.on("triggerchange",function(t){var a=t.curTrigger;a.hasClass(c)?e.get("list").set("items",n(24)):e.get("list").set("items",n(60))}),e.on("selectedchange",function(e){var n=e.curTrigger,a=e.value;n.hasClass(c)?t.setInternal("hour",a):n.hasClass(l)?t.setInternal("minute",a):t.setInternal("second",a)}))},_setYearMonth:function(e,t){var n=this,a=n.get("selectedDate"),i=a.getDate();(e!==a.getFullYear()||t!==a.getMonth())&&n.set("selectedDate",new Date(e,t,i))},_createMonthPicker:function(){var e,t=this;return e=new h({render:t.get("el"),effect:{effect:"slide",duration:300},visibleMode:"display",success:function(){var e=this;t._setYearMonth(e.get("year"),e.get("month")),e.hide()},cancel:function(){this.hide()}}),t.set("monthpicker",e),t.get("children").push(e),e},_createFooter:function(){var t=this,n=this.get("showTime"),a=[];return n?(a.push({content:t.get("timeTpl")}),a.push({xclass:"bar-item-button",text:"\u786e\u5b9a",btnCls:"button button-small button-primary",listeners:{click:function(){t.fire("accept")}}})):a.push({xclass:"bar-item-button",text:"\u4eca\u5929",btnCls:"button button-small",id:"todayBtn",listeners:{click:function(){var n=e();t.set("selectedDate",n),t.fire("accept")}}}),new m.Bar({elCls:r+"calendar-footer",children:a})},_updateTodayBtnAble:function(){var t=this;if(!t.get("showTime")){var n=t.get("footer"),a=t.get("panel").get("view"),i=e(),r=n.getItem("todayBtn");a._isInRange(i)?r.enable():r.disable()}},_uiSetSelectedDate:function(e){var t=this,n=e.getFullYear(),a=e.getMonth();t.get("header").setMonth(n,a),t.get("panel").set("selected",e),t.fire("datechange",{date:e})},_uiSetHour:function(e){a(this,c,e)},_uiSetMinute:function(e){a(this,l,e)},_uiSetSecond:function(e){a(this,o,e)},_uiSetMaxDate:function(e){var t=this;t.get("panel").set("maxDate",e),t._updateTodayBtnAble()},_uiSetMinDate:function(e){var t=this;t.get("panel").set("minDate",e),t._updateTodayBtnAble()}},{ATTRS:{header:{},panel:{},maxDate:{},minDate:{},monthPicker:{},timepicker:{},width:{value:180},events:{value:{click:!1,accept:!1,datechange:!1,monthchange:!1}},showTime:{value:!1},lockTime:{},timeTpl:{value:'<input type="text" readonly class="'+s+" "+c+'" />:<input type="text" readonly class="'+s+" "+l+'" />:<input type="text" readonly class="'+s+" "+o+'" />'},selectedDate:{value:e()},hour:{value:(new Date).getHours()},minute:{value:(new Date).getMinutes()},second:{value:0}}},{xclass:"calendar",priority:0});return y}),define("bui/calendar/datepicker",["bui/common","bui/picker","bui/calendar/calendar"],function(require){var e=require("bui/common"),t=require("bui/picker").Picker,n=require("bui/calendar/calendar"),a=e.Date,i=t.extend({initializer:function(){},createControl:function(){var e=this,t=e.get("children"),a=new n({render:e.get("el"),showTime:e.get("showTime"),lockTime:e.get("lockTime"),minDate:e.get("minDate"),maxDate:e.get("maxDate"),autoRender:!0});return e.get("dateMask")||(e.get("showTime")?e.set("dateMask","yyyy-mm-dd HH:MM:ss"):e.set("dateMask","yyyy-mm-dd")),t.push(a),e.set("calendar",a),a},setSelectedValue:function(e){if(this.get("calendar")){var t=this,n=this.get("calendar"),i=a.parse(e,t.get("dateMask"));if(i=i||new Date((new Date).setSeconds(0)),n.set("selectedDate",a.getDate(i)),t.get("showTime")){var r=this.get("lockTime"),s=r&&r.hour?r.hour:i.getHours(),c=r&&r.minute?r.minute:i.getMinutes(),l=r&&r.second?r.second:i.getSeconds();n.set("hour",s),n.set("minute",c),n.set("second",l)}}},getSelectedValue:function(){if(!this.get("calendar"))return null;var e=this,t=e.get("calendar"),n=a.getDate(t.get("selectedDate"));return e.get("showTime")&&(n=a.addHour(t.get("hour"),n),n=a.addMinute(t.get("minute"),n),n=a.addSecond(t.get("second"),n)),n},getSelectedText:function(){return this.get("calendar")?a.format(this.getSelectedValue(),this._getFormatType()):""},_getFormatType:function(){return this.get("dateMask")},_uiSetMaxDate:function(e){if(!this.get("calendar"))return null;var t=this;t.get("calendar").set("maxDate",e)},_uiSetMinDate:function(e){if(!this.get("calendar"))return null;var t=this;t.get("calendar").set("minDate",e)}},{ATTRS:{showTime:{value:!1},lockTime:{},maxDate:{},minDate:{},dateMask:{},changeEvent:{value:"accept"},hideEvent:{value:"accept"},calendar:{}}},{xclass:"datepicker",priority:0});return i});