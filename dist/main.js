/**
   * @license MIT
   * author: Roy Pearce <rhdp@roypearce.us> (github.com/roypearce)
   * rhdp.js v3.0.0
   * Released under the MIT license.
   */
"use strict";Object.defineProperty(exports,"__esModule",{value:!0});var e,t=require("react");exports.TimePeriod=void 0,(e=exports.TimePeriod||(exports.TimePeriod={}))[e.Day=0]="Day",e[e.Month=1]="Month",e[e.Week=2]="Week",e[e.Year=3]="Year";const a=class{date;constructor(e){if(this.date=e&&e instanceof Date?new Date(e):new Date,e&&!(e instanceof Date)){let t;"string"==typeof e&&10===e.length&&(t=e.split("-"),3===t.length&&(this.setFullDate(+t[0],+t[1],+t[2]),this.date.setHours(0,0,0,0),this.regenDate()))}}add=(e,t,a=!1)=>{switch(t){case exports.TimePeriod.Year:this.setYear(this.date.getFullYear()+e,a);break;case exports.TimePeriod.Month:this.setMonth(this.date.getMonth()+1+e,a);break;case exports.TimePeriod.Week:this.date.setDate(this.date.getDate()+7*e);break;case exports.TimePeriod.Day:this.date.setDate(this.date.getDate()+e)}return this.regenDate(),this};clone=()=>new a(this.date);endOfMonth=()=>(this.date.setFullYear(this.date.getFullYear(),this.date.getMonth()+1,0),this.regenDate(),this);endOfYear=()=>(this.date.setFullYear(this.date.getFullYear(),12,0),this.regenDate(),this);format=()=>{const e=this.date.getMonth()+1,t=this.date.getDate();return[this.date.getFullYear(),e<10?"0"+e:e,t<10?"0"+t:t].join("-")};getDate=()=>this.date.getDate();getDay=()=>this.date.getDay();getFullYear=()=>this.date.getFullYear();getMonth=()=>this.date.getMonth()+1;regenDate=()=>{this.date=new Date(this.date)};setDay=e=>(this.date.setDate(e),this.regenDate(),this);setFullDate=(e,t,a)=>(this.date.setFullYear.apply(this.date,[e,t-1,a]),this.regenDate(),this);setMonth=(e,t=!1)=>{let a;return t&&this.getDate()>28&&(a=this.clone().setFullDate(this.getFullYear(),e+1,0)),this.date.setMonth(e-1),this.regenDate(),t&&a&&this.getMonth()!==e&&(this.date=a.date),this};setYear=(e,t=!1)=>{let a;return t&&this.getDate()>28&&(a=this.clone().setFullDate(e,this.getMonth()+1,0)),this.date.setFullYear(e),this.regenDate(),t&&a&&this.getMonth()!==a.getMonth()&&(this.date=a.date),this};startOfMonth=()=>(this.date.setFullYear(this.getFullYear(),this.date.getMonth(),1),this.regenDate(),this);startOfYear=()=>(this.date.setFullYear(this.getFullYear(),0,1),this.regenDate(),this)};var r,n;exports.SearchDirection=void 0,(r=exports.SearchDirection||(exports.SearchDirection={}))[r.Down=0]="Down",r[r.Left=1]="Left",r[r.Right=2]="Right",r[r.Up=3]="Up",exports.RenderType=void 0,(n=exports.RenderType||(exports.RenderType={}))[n.Initial=0]="Initial",n[n.Programmatic=1]="Programmatic",n[n.User=2]="User";const o=[[0,1,2,3,4,5,6],[0,-1,1,2,3,4,5],[0,-1,1,-2,2,3,4],[0,-1,1,-2,2,-3,3],[0,-1,1,-2,2,-3,-4],[0,-1,1,-2,-3,-4,-5],[0,-1,-2,-3,-4,-5,-6]],s=e=>e[0].toUpperCase()+e.slice(1),d=e=>Array.isArray(e)?e:[e],i=(e,t,a)=>s(new Intl.DateTimeFormat(e,{weekday:a}).format(t)),c=(e,t)=>{const r=new a,n=r.getDay(),o=r.add(-1*(n-t),exports.TimePeriod.Day);return[l(e,o.date),l(e,o.add(1,exports.TimePeriod.Day).date),l(e,o.add(1,exports.TimePeriod.Day).date),l(e,o.add(1,exports.TimePeriod.Day).date),l(e,o.add(1,exports.TimePeriod.Day).date),l(e,o.add(1,exports.TimePeriod.Day).date),l(e,o.add(1,exports.TimePeriod.Day).date)]},l=(e,t)=>({long:i(e,t,"long"),narrow:i(e,t,"narrow"),short:i(e,t,"short")}),u=(e,t)=>s(new Intl.DateTimeFormat(t,{month:"long"}).format(e.date)),h=e=>e.getFullYear();let D=0;const f=e=>{try{const[t,a,r]=e.match(/\d+/g)||["","",""],n=/^\d{4}-\d{2}-\d{2}$/u,o=new Date(`${p(a,2)}/${p(r,2)}/${t}`);return!isNaN(o.getTime())&&n.test(e)&&+a===o.getMonth()+1&&+r===o.getDate()&&+t===o.getFullYear()}catch(e){return!1}},p=(e,t)=>{const a=t-e.length;if(a<1)return e;for(let t=1;t<=a;t+=1)e=`0${e}`;return e},m=new a;exports.ChainDate=a,exports.isDateValid=f,exports.useDatepicker=({blockedDates:e=[],focusOnInit:r=!1,hasFocusTrap:n=!1,labels:s,locale:i="en-US",maxDate:l,minDate:p,mode:g="single",onChange:y,onClose:M,selectDates:x,weekStart:b=0})=>{const[w,T]=t.useState([[]]),[P,k]=t.useState(!1),[Y,S]=t.useState(!1),[E,F]=t.useState(!1),[v,O]=t.useState(""),C=t.useRef({closeButton:"close",dateSelected:"date selected",disabled:"disabled",nextMonth:"next month",nextYear:"next year",previousMonth:"previous month",previousYear:"previous year",today:"today",...s}),$=t.useRef({blockedDatesMap:{},calendarDisplayMonth:m,calendarMonthEndDate:m.clone().endOfMonth().format(),calendarMonthStartDate:m.clone().startOfMonth().format(),dateClicked:"",displayDaysOfTheWeek:c(i,b),focusedDate:"",id:"",isInitialRender:!0,lastActiveElement:document.activeElement,lastFocusedDate:"",locale:i,newSelectedDate:"",newRemovedDate:"",newTimePeriod:"",now:m,oneYearAfterMinDate:"",oneYearAfterStartOfMonth:"",oneYearBeforeEndOfMonth:"",oneYearBeforeMaxDate:"",selectDates:[],selectedDates:[],selectedDatesMap:{},today:(new a).format(),weekStart:b});$.current.id||($.current.id=function(e="rhdp-id-"){return`${e}${D+=1}`}());const[B,R]=t.useState({displayMonth:u(m,i),displayYear:h(m),selectedDates:[""]}),I=()=>{$.current.oneYearBeforeEndOfMonth=new a($.current.calendarMonthEndDate).add(-1,exports.TimePeriod.Year).format()},W=()=>{$.current.oneYearAfterStartOfMonth=new a($.current.calendarMonthStartDate).add(1,exports.TimePeriod.Year).format()},A=()=>{let{blockedDatesMap:t,calendarDisplayMonth:n,calendarMonthEndDate:o,calendarMonthStartDate:s,dateClicked:D,displayDaysOfTheWeek:m,focusedDate:y,isInitialRender:w,lastFocusedDate:T,newSelectedDate:P,newRemovedDate:k,newTimePeriod:Y,selectedDates:S,selectedDatesMap:E,today:F}=$.current,v=!1,O=!1,C=[],B=[...P&&[P],...S],I=!1,W=!1;switch(`${x}`!=`${$.current.selectDates}`&&(x?.length?(I=!0,W=!0,B=d(x)):B=[]),i===$.current.locale&&b===$.current.weekStart||(m=c(i,b)),t={},e&&d(e).forEach((e=>{t[e]=null})),(e||p||l||k||W)&&(B=B.filter((e=>!!f(e)&&(!(p&&e<p)&&(!(l&&e>l)&&(e!==k&&!(e in t))))))),g){case"single":B.length>1&&(B.length=1),1===B.length&&(C=[B[0]],O=!0);break;case"range":B.length>2&&P&&(B=[P]),C=[...B],C.length>=2&&(C.length=2,O=!0);break;case"multiple":C.push(...B);break;default:"number"==typeof g&&(C.push(...B),C.length>=g&&(C.length=g,O=!0))}B.length||(I=!1),E={},C&&C.forEach((e=>{E[e]=null})),(w&&C.length||I||Y)&&({calendarDisplayMonth:n,calendarMonthEndDate:o,calendarMonthStartDate:s}=(e=>{const t=new a(e).startOfMonth();return{calendarDisplayMonth:t,calendarMonthEndDate:t.clone().endOfMonth().format(),calendarMonthStartDate:t.format()}})(Y||C[0])),w&&(T=C.length?C[0]:F,`${C}`!=`${x}`&&(v=!0),r&&setTimeout((()=>{document.getElementById(T)?.focus()}),0)),C.sort(),w||`${$.current.selectedDates}`!=`${C}`&&(v=!0),(P||k||v)&&V(C),y&&P&&Y&&setTimeout((()=>{document.getElementById(y)?.focus()}),0),M&&D&&O&&M(),R({displayMonth:u(n,i),displayYear:h(n),selectedDates:C}),$.current={...$.current,blockedDatesMap:t,calendarDisplayMonth:n,calendarMonthEndDate:o,calendarMonthStartDate:s,dateClicked:"",displayDaysOfTheWeek:m,isInitialRender:!1,...w&&{lastFocusedDate:T},newSelectedDate:"",newRemovedDate:"",newTimePeriod:"",selectDates:x,selectedDates:C,selectedDatesMap:E}};t.useEffect((()=>{const{focusedDate:e,lastFocusedDate:t}=$.current;P?t&&($.current.focusedDate=t):($.current.lastFocusedDate=e,$.current.focusedDate="")}),[P]),t.useEffect((()=>{document.getElementById($.current.focusedDate)?.focus()}),[$.current.focusedDate]),t.useEffect((()=>(I(),W(),A(),()=>{$.current.lastActiveElement.focus?.()})),[]),t.useEffect((()=>{A()}),[`${e}`,s,i,l,p,g,`${x}`,b]),t.useEffect((()=>{$.current.oneYearBeforeMaxDate=l?new a(l).add(-1,exports.TimePeriod.Year).format():""}),[l]),t.useEffect((()=>{$.current.oneYearAfterMinDate=p?new a(p).add(1,exports.TimePeriod.Year).format():""}),[p]),t.useEffect(I,[$.current.calendarMonthStartDate]),t.useEffect(W,[$.current.calendarMonthEndDate]),t.useEffect((()=>{Q()}),[B]);const U=(e,t)=>{_(new KeyboardEvent("keydown",{ctrlKey:e===exports.TimePeriod.Year,key:1===t?"PageDown":"PageUp"}))},K=(e,t,r=!1)=>{let n=l?new a(l).add(1,exports.TimePeriod.Week).format():new a(e).add(6,exports.TimePeriod.Week).format(),s=p?new a(p).add(-1,exports.TimePeriod.Week).format():new a(e).add(-6,exports.TimePeriod.Week).format(),d="",i=new a(e);if($.current.selectedDates.forEach((e=>{e<s?s=e:e>n&&(n=e)})),r&&z(e,s,n))return e;let c,u,h,D,f=1,m=1;switch(t){case exports.SearchDirection.Left:f=-1;case exports.SearchDirection.Right:for(u=i.add(f,exports.TimePeriod.Day).format();u>s&&u<n&&(j(u)||q(u));)u=i.add(f,exports.TimePeriod.Day).format();z(u,s,n)&&(d=u);break;case exports.SearchDirection.Up:m=-1;case exports.SearchDirection.Down:for(i.add(m,exports.TimePeriod.Week),c=i.getDay(),h=o[c],u=i.format();!d&&u>=s&&u<=n;)D=h.find((e=>z(i.clone().add(e,exports.TimePeriod.Day).format(),s,n))),"number"==typeof D&&(d=i.clone().add(D,exports.TimePeriod.Day).format()),i.add(m,exports.TimePeriod.Week),u=i.format()}return d},L=e=>{const t=e.format();Y||!E?($.current.focusedDate="",$.current.lastFocusedDate=t):$.current.focusedDate=t,$.current.newTimePeriod=t,A()},N=e=>$.current.focusedDate?e.formatted===$.current.focusedDate?0:-1:$.current.lastFocusedDate?e.formatted===$.current.lastFocusedDate?0:-1:e.formatted===$.current.today?0:-1,j=e=>e in $.current.blockedDatesMap,q=e=>!!(p&&e<p)||(!!(l&&e>l)||!(!J()||e in $.current.selectedDatesMap)),H=e=>e===v,_=e=>{if("Tab"===e.key&&!n||Y&&"PageDown"!==e.key&&"PageUp"!==e.key)return;const{calendarMonthEndDate:t,calendarMonthStartDate:r,focusedDate:o,lastFocusedDate:s}=$.current;let d=Y?s:o;(!d||d<r||d>t)&&(d=r);let i="";switch(e.key){case"ArrowLeft":i=K(d,exports.SearchDirection.Left);break;case"ArrowRight":i=K(d,exports.SearchDirection.Right);break;case"ArrowUp":i=K(d,exports.SearchDirection.Up);break;case"ArrowDown":i=K(d,exports.SearchDirection.Down);break;case"Home":i=K(new a(d).startOfMonth().format(),exports.SearchDirection.Right,!0);break;case"End":i=K(new a(d).endOfMonth().format(),exports.SearchDirection.Left,!0);break;case"PageUp":i=e.ctrlKey?new a(d).add(-1,exports.TimePeriod.Year,!0).format():new a(d).add(-1,exports.TimePeriod.Month,!0).format();break;case"PageDown":i=e.ctrlKey?new a(d).add(1,exports.TimePeriod.Year,!0).format():new a(d).add(1,exports.TimePeriod.Month,!0).format();break;case"Tab":const t=[...document.getElementById($.current.id)?.querySelectorAll('a:not([disabled]):not([tabindex="-1"]), button:not([disabled]):not([tabindex="-1"]), input:not([disabled]):not([tabindex="-1"]), [tabindex]:not([disabled]):not([tabindex="-1"])')||[]];if(t.length){const a=t.findIndex((e=>e===document.activeElement));0===a&&e.shiftKey?(e.preventDefault(),t[t.length-1].focus()):a!==t.length-1||e.shiftKey||(e.preventDefault(),t[0].focus())}break;case" ":case"Enter":return;case"Esc":case"Escape":return M&&M(),void e.preventDefault()}return i&&(e.preventDefault(),p&&i<p||l&&i>l?i="":(i>t||i<r)&&($.current.newTimePeriod=i,A())),i&&(Y?$.current.lastFocusedDate=i:$.current.focusedDate=i,Q()),!1},V=e=>{if(y){let t=e;"single"===g&&(t=e.length?e[0]:""),y(t)}},z=(e,t,a)=>e>=t&&e<=a&&!j(e)&&!q(e),G=e=>e.inRange||e.rangeStart||e.rangeEnd||e.selected,J=()=>"number"==typeof g&&B.selectedDates.length>=g,Q=()=>{const{calendarDisplayMonth:e}=$.current,t=(e=>{const t=e.getMonth(),a=[],r=e.clone().startOfMonth(),n=r.add(-1*(r.getDay()-b),exports.TimePeriod.Day);let o=0;for(;!(o>=4&&n.getMonth()!==t);){a.push([]);for(let e=0;e<=6;e+=1){const r=n.format();a[o].push({blocked:j(r),disabled:q(r),displayText:String(n.getDate()),formatted:r,hovered:H(r),index:e,inMonth:n.getMonth()===t,inRange:"range"===g&&r>=B.selectedDates[0]&&r<=B.selectedDates[1],rangeEnd:"range"===g&&r===B.selectedDates[1],rangeStart:"range"===g&&r===B.selectedDates[0],selected:(s=n,s.format()in $.current.selectedDatesMap),today:$.current.today===r}),n.add(1,exports.TimePeriod.Day)}o+=1}var s;return a})(e);T(t)};return{calendar:w,displayDaysOfTheWeek:$.current.displayDaysOfTheWeek,displayMonth:B.displayMonth,displayYear:B.displayYear,focusedDate:$.current.focusedDate,getCalendarContainerProps:()=>({"aria-labelledby":`${$.current.id}-month-year-label`,onBlur:e=>{e.currentTarget?.contains(e.relatedTarget)||k(!1)},onFocus:()=>{k(!0),S(!1)},role:"grid"}),getCalendarDayContainerProps:()=>({role:"gridcell"}),getCalendarWeekContainerProps:()=>({role:"row"}),getDayOfTheWeekProps:e=>{const t=$.current.displayDaysOfTheWeek[e];return{abbr:t.long,"aria-label":t.long,id:`day-of-the-week-${e}`,role:"columnheader",scope:"col"}},getDaysOfTheWeekContainerProps:()=>({role:"row"}),getOnCloseButtonProps:()=>({"aria-label":C.current.closeButton,onClick:()=>{M&&(k(!1),S(!1),F(!1),M())},tabIndex:E?0:-1,title:C.current.closeButton,type:"button"}),getControlsContainerProps:()=>({onBlur:e=>{e.currentTarget?.contains(e.relatedTarget)||S(!1)},onFocus:()=>{S(!0)}}),getDatepickerContainerProps:()=>({"aria-activedescendant":$.current.focusedDate,id:$.current.id,onBlur:e=>{e.currentTarget?.contains(e.relatedTarget)||F(!1)},onFocus:()=>F(!0),onKeyDown:_}),getDayButtonProps:e=>{const{focusedDate:t,id:r,lastFocusedDate:n}=$.current,o=e.blocked||e.disabled;return{...o&&{"aria-disabled":!0},"aria-label":`${e.displayText} ${o?C.current.disabled:""} ${e.today?C.current.today:""} ${G(e)?C.current.dateSelected:""}`,"aria-describedby":`${r}-month-year-label`,"aria-pressed":G(e),...!(e.formatted===t||e.formatted===n)&&o&&{disabled:!0},id:e.formatted,key:e.formatted,onClick:()=>{e.blocked||e.disabled||(!e.selected||"multiple"!==g&&"number"!=typeof g?e.selected||($.current.newSelectedDate=e.formatted):$.current.newRemovedDate=e.formatted,$.current.dateClicked=e.formatted,L(new a(e.formatted)))},onMouseOut:()=>{O("")},onMouseOver:()=>{O(e.formatted)},tabIndex:N(e),type:"button"}},getMonthYearContainerProps:()=>({"aria-atomic":"true","aria-live":"assertive",id:`${$.current.id}-month-year-label`}),getNextMonthButtonProps:()=>{const{calendarMonthEndDate:e,selectedDates:t}=$.current,{nextMonth:a}=C.current;return{"aria-label":a,disabled:l&&e>l||J()&&t[t.length-1]<=e,onClick:()=>{U(exports.TimePeriod.Month,1)},tabIndex:E?0:-1,title:a,type:"button"}},getNextYearButtonProps:()=>{const{calendarMonthEndDate:e,oneYearBeforeMaxDate:t,oneYearAfterStartOfMonth:a,selectedDates:r}=$.current,{nextYear:n}=C.current;return{"aria-label":n,disabled:l&&e>t||J()&&r[r.length-1]<a,onClick:()=>{U(exports.TimePeriod.Year,1)},tabIndex:E?0:-1,title:n,type:"button"}},getPreviousMonthButtonProps:()=>{const{calendarMonthStartDate:e,selectedDates:t}=$.current,{previousMonth:a}=C.current;return{"aria-label":a,disabled:p&&e<p||J()&&t[0]>=e,onClick:()=>{U(exports.TimePeriod.Month,-1)},tabIndex:E?0:-1,title:a,type:"button"}},getPreviousYearButtonProps:()=>{const{calendarMonthStartDate:e,oneYearAfterMinDate:t,oneYearBeforeEndOfMonth:a,selectedDates:r}=$.current,{previousYear:n}=C.current;return{"aria-label":n,disabled:p&&e<t||J()&&r[0]>a,onClick:()=>{U(exports.TimePeriod.Year,-1)},tabIndex:E?0:-1,title:n,type:"button"}},hoveredDate:v,id:$.current.id,selectedDates:B.selectedDates,setMonth:e=>{const t=new a($.current.focusedDate||$.current.lastFocusedDate).setMonth(e,!0);L(t)},setYear:e=>{const t=new a($.current.focusedDate||$.current.lastFocusedDate).setYear(e);L(t)},today:$.current.today}};
//# sourceMappingURL=main.js.map
