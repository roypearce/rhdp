/**
   * @license MIT
   * author: Roy Pearce <rhdp@roypearce.us> (github.com/roypearce)
   * rhdp.js v1.0.0
   * Released under the MIT license.
   */
"use strict";Object.defineProperty(exports,"__esModule",{value:!0});var e,t=require("react");exports.TimePeriod=void 0,(e=exports.TimePeriod||(exports.TimePeriod={}))[e.Day=0]="Day",e[e.Month=1]="Month",e[e.Week=2]="Week",e[e.Year=3]="Year";const a=class{constructor(e){if(this.date=e&&e instanceof Date?new Date(e):new Date,e&&!(e instanceof Date)){let t;"string"==typeof e&&10===e.length&&(t=e.split("-"),3===t.length&&(this.setFullDate(+t[0],+t[1],+t[2]),this.date.setHours(0,0,0,0),this.regenDate()))}}date;add=(e,t,a=!1)=>{switch(t){case exports.TimePeriod.Year:this.setYear(this.date.getFullYear()+e,a);break;case exports.TimePeriod.Month:this.setMonth(this.date.getMonth()+1+e,a);break;case exports.TimePeriod.Week:this.date.setDate(this.date.getDate()+7*e);break;case exports.TimePeriod.Day:this.date.setDate(this.date.getDate()+e)}return this.regenDate(),this};clone=()=>new a(this.date);endOfMonth=()=>(this.date.setFullYear(this.date.getFullYear(),this.date.getMonth()+1,0),this.regenDate(),this);endOfYear=()=>(this.date.setFullYear(this.date.getFullYear(),12,0),this.regenDate(),this);format=()=>{const e=this.date.getMonth()+1,t=this.date.getDate();return[this.date.getFullYear(),e<10?"0"+e:e,t<10?"0"+t:t].join("-")};getDate=()=>this.date.getDate();getDay=()=>this.date.getDay();getFullYear=()=>this.date.getFullYear();getMonth=()=>this.date.getMonth()+1;regenDate=()=>{this.date=new Date(this.date)};setDay=e=>(this.date.setDate(e),this.regenDate(),this);setFullDate=(e,t,a)=>(this.date.setFullYear.apply(this.date,[e,t-1,a]),this.regenDate(),this);setMonth=(e,t=!1)=>{let a;return t&&this.getDate()>28&&(a=this.clone().setFullDate(this.getFullYear(),e+1,0)),this.date.setMonth(e-1),this.regenDate(),t&&a&&this.getMonth()!==e&&(this.date=a.date),this};setYear=(e,t=!1)=>{let a;return t&&this.getDate()>28&&(a=this.clone().setFullDate(e,this.getMonth()+1,0)),this.date.setFullYear(e),this.regenDate(),t&&a&&this.getMonth()!==a.getMonth()&&(this.date=a.date),this};startOfMonth=()=>(this.date.setFullYear(this.getFullYear(),this.date.getMonth(),1),this.regenDate(),this);startOfYear=()=>(this.date.setFullYear(this.getFullYear(),0,1),this.regenDate(),this)};var r,n;exports.SearchDirection=void 0,(r=exports.SearchDirection||(exports.SearchDirection={}))[r.Down=0]="Down",r[r.Left=1]="Left",r[r.Right=2]="Right",r[r.Up=3]="Up",exports.RenderType=void 0,(n=exports.RenderType||(exports.RenderType={}))[n.Initial=0]="Initial",n[n.Programmatic=1]="Programmatic",n[n.User=2]="User";const o=[[0,1,2,3,4,5,6],[0,-1,1,2,3,4,5],[0,-1,1,-2,2,3,4],[0,-1,1,-2,2,-3,3],[0,-1,1,-2,2,-3,-4],[0,-1,1,-2,-3,-4,-5],[0,-1,-2,-3,-4,-5,-6]],s=e=>e[0].toUpperCase()+e.slice(1),d=e=>Array.isArray(e)?e:[e],i=(e,t,a)=>s(new Intl.DateTimeFormat(e,{weekday:a}).format(t)),c=(e,t)=>{const r=new a,n=r.getDay(),o=r.add(-1*(n-t),exports.TimePeriod.Day);return[l(e,o.date),l(e,o.add(1,exports.TimePeriod.Day).date),l(e,o.add(1,exports.TimePeriod.Day).date),l(e,o.add(1,exports.TimePeriod.Day).date),l(e,o.add(1,exports.TimePeriod.Day).date),l(e,o.add(1,exports.TimePeriod.Day).date),l(e,o.add(1,exports.TimePeriod.Day).date)]},l=(e,t)=>({long:i(e,t,"long"),narrow:i(e,t,"narrow"),short:i(e,t,"short")}),u=(e,t)=>s(new Intl.DateTimeFormat(t,{month:"long"}).format(e.date)),h=e=>e.getFullYear();let D=0;const f=(e,t)=>{const a=t-e.length;if(a<1)return e;for(let t=1;t<=a;t+=1)e=`0${e}`;return e},p=new a;exports.ChainDate=a,exports.useDatepicker=({blockedDates:e=[],focusOnInit:r=!1,hideDatepicker:n,labels:s,locale:i="en-US",maxDate:l,minDate:m,mode:g="single",onChange:y,selectDates:M,weekStart:x=0})=>{const[b,w]=t.useState([[]]),[T,k]=t.useState(!1),[P,Y]=t.useState(!1),[S,E]=t.useState(!1),[F,v]=t.useState(""),O=t.useRef({closeButton:"close",dateSelected:"date selected",disabled:"disabled",nextMonth:"next month",nextYear:"next year",previousMonth:"previous month",previousYear:"previous year",today:"today",...s}),$=t.useRef({blockedDatesMap:{},calendarDisplayMonth:p,calendarMonthEndDate:p.clone().endOfMonth().format(),calendarMonthStartDate:p.clone().startOfMonth().format(),dateClicked:"",displayDaysOfTheWeek:c(i,x),focusedDate:"",id:"",isInitialRender:!0,lastActiveElement:document.activeElement,lastFocusedDate:"",locale:i,newSelectedDate:"",newRemovedDate:"",newTimePeriod:"",now:p,oneYearAfterMinDate:"",oneYearAfterStartOfMonth:"",oneYearBeforeEndOfMonth:"",oneYearBeforeMaxDate:"",selectDates:[],selectedDates:[],selectedDatesMap:{},today:(new a).format(),weekStart:x});$.current.id||($.current.id=function(e="rdhp-id-"){return`${e}${D+=1}`}());const[B,C]=t.useState({displayMonth:u(p,i),displayYear:h(p),selectedDates:[""]}),R=()=>{$.current.oneYearBeforeEndOfMonth=new a($.current.calendarMonthEndDate).add(-1,exports.TimePeriod.Year).format()},I=()=>{$.current.oneYearAfterStartOfMonth=new a($.current.calendarMonthStartDate).add(1,exports.TimePeriod.Year).format()},W=()=>{let{blockedDatesMap:t,calendarDisplayMonth:o,calendarMonthEndDate:s,calendarMonthStartDate:D,dateClicked:p,displayDaysOfTheWeek:y,focusedDate:b,isInitialRender:w,lastFocusedDate:T,newSelectedDate:k,newRemovedDate:P,newTimePeriod:Y,selectedDates:S,selectedDatesMap:E,today:F}=$.current,v=!1,O=!1,B=[],R=[...k&&[k],...S],I=!1,W=!1;switch(`${M}`!=`${$.current.selectDates}`&&(M?.length?(I=!0,W=!0,R=d(M)):R=[]),i===$.current.locale&&x===$.current.weekStart||(y=c(i,x)),t={},e&&d(e).forEach((e=>{t[e]=null})),(e||m||l||P||W)&&(R=R.filter((e=>!!(e=>{try{const[t,a,r]=e.match(/\d+/g)||["","",""],n=/^\d{4}-\d{2}-\d{2}$/u,o=new Date(`${f(a,2)}/${f(r,2)}/${t}`);return!isNaN(o.getTime())&&n.test(e)&&+a===o.getMonth()+1&&+r===o.getDate()&&+t===o.getFullYear()}catch(e){return!1}})(e)&&(!(m&&e<m)&&(!(l&&e>l)&&(e!==P&&!(e in t))))))),g){case"single":R.length>1&&(R.length=1),1===R.length&&(B=[R[0]],O=!0);break;case"range":R.length>2&&k&&(R=[k]),B=[...R],B.length>=2&&(B.length=2,O=!0);break;case"multiple":B.push(...R);break;default:"number"==typeof g&&(B.push(...R),B.length>=g&&(B.length=g,O=!0))}E={},B&&B.forEach((e=>{E[e]=null})),(w&&B.length||I||Y)&&({calendarDisplayMonth:o,calendarMonthEndDate:s,calendarMonthStartDate:D}=(e=>{const t=new a(e).startOfMonth();return{calendarDisplayMonth:t,calendarMonthEndDate:t.clone().endOfMonth().format(),calendarMonthStartDate:t.format()}})(Y||B[0])),w&&(T=B.length?B[0]:F,`${B}`!=`${M}`&&(v=!0),r&&setTimeout((()=>{document.getElementById(T)?.focus()}),0)),B.sort(),w||`${$.current.selectedDates}`!=`${B}`&&(v=!0),(k||P||v)&&q(B),b&&k&&Y&&setTimeout((()=>{document.getElementById(b)?.focus()}),0),n&&p&&O&&n(),C({displayMonth:u(o,i),displayYear:h(o),selectedDates:B}),$.current={...$.current,blockedDatesMap:t,calendarDisplayMonth:o,calendarMonthEndDate:s,calendarMonthStartDate:D,dateClicked:"",displayDaysOfTheWeek:y,isInitialRender:!1,...w&&{lastFocusedDate:T},newSelectedDate:"",newRemovedDate:"",newTimePeriod:"",selectDates:M,selectedDates:B,selectedDatesMap:E}};t.useEffect((()=>{const{focusedDate:e,lastFocusedDate:t}=$.current;T?t&&($.current.focusedDate=t):($.current.lastFocusedDate=e,$.current.focusedDate="")}),[T]),t.useEffect((()=>{document.getElementById($.current.focusedDate)?.focus()}),[$.current.focusedDate]),t.useEffect((()=>(R(),I(),W(),()=>{$.current.lastActiveElement.focus?.()})),[]),t.useEffect((()=>{W()}),[`${e}`,s,i,l,m,g,`${M}`,x]),t.useEffect((()=>{$.current.oneYearBeforeMaxDate=l?new a(l).add(-1,exports.TimePeriod.Year).format():""}),[l]),t.useEffect((()=>{$.current.oneYearAfterMinDate=m?new a(m).add(1,exports.TimePeriod.Year).format():""}),[m]),t.useEffect(R,[$.current.calendarMonthStartDate]),t.useEffect(I,[$.current.calendarMonthEndDate]),t.useEffect((()=>{Q()}),[B]);const A=(e,t)=>{_(new KeyboardEvent("keydown",{ctrlKey:e===exports.TimePeriod.Year,key:1===t?"PageDown":"PageUp"}))},U=(e,t,r=!1)=>{let n=l?new a(l).add(1,exports.TimePeriod.Week).format():new a(e).add(6,exports.TimePeriod.Week).format(),s=m?new a(m).add(-1,exports.TimePeriod.Week).format():new a(e).add(-6,exports.TimePeriod.Week).format(),d="",i=new a(e);if($.current.selectedDates.forEach((e=>{e<s?s=e:e>n&&(n=e)})),r&&z(e,s,n))return e;let c,u,h,D,f=1,p=1;switch(t){case exports.SearchDirection.Left:f=-1;case exports.SearchDirection.Right:for(u=i.add(f,exports.TimePeriod.Day).format();u>s&&u<n&&(N(u)||H(u));)u=i.add(f,exports.TimePeriod.Day).format();z(u,s,n)&&(d=u);break;case exports.SearchDirection.Up:p=-1;case exports.SearchDirection.Down:for(i.add(p,exports.TimePeriod.Week),c=i.getDay(),h=o[c],u=i.format();!d&&u>s&&u<n;)D=h.find((e=>z(i.clone().add(e,exports.TimePeriod.Day).format(),s,n))),"number"==typeof D&&(d=i.clone().add(D,exports.TimePeriod.Day).format()),i.add(p,exports.TimePeriod.Week),u=i.format()}return d},L=e=>{const t=e.format();P||!S?($.current.focusedDate="",$.current.lastFocusedDate=t):$.current.focusedDate=t,$.current.newTimePeriod=t,W()},K=e=>$.current.focusedDate?e.formatted===$.current.focusedDate?0:-1:$.current.lastFocusedDate?e.formatted===$.current.lastFocusedDate?0:-1:e.formatted===$.current.today?0:-1,N=e=>e in $.current.blockedDatesMap,H=e=>!!(m&&e<m)||(!!(l&&e>l)||!(!J()||e in $.current.selectedDatesMap)),j=e=>e===F,_=e=>{if("Tab"===e.key||P&&"PageDown"!==e.key&&"PageUp"!==e.key)return;const{calendarMonthEndDate:t,calendarMonthStartDate:r,focusedDate:o,lastFocusedDate:s}=$.current;let d=P?s:o;(d<r||d>t)&&(d=m&&m>=r&&m<=t?m:r);let i="";switch(e.key){case"ArrowLeft":i=U(d,exports.SearchDirection.Left);break;case"ArrowRight":i=U(d,exports.SearchDirection.Right);break;case"ArrowUp":i=U(d,exports.SearchDirection.Up);break;case"ArrowDown":i=U(d,exports.SearchDirection.Down);break;case"Home":i=U(new a(d).startOfMonth().format(),exports.SearchDirection.Right,!0);break;case"End":i=U(new a(d).endOfMonth().format(),exports.SearchDirection.Left,!0);break;case"PageUp":i=e.ctrlKey?new a(d).add(-1,exports.TimePeriod.Year,!0).format():new a(d).add(-1,exports.TimePeriod.Month,!0).format();break;case"PageDown":i=e.ctrlKey?new a(d).add(1,exports.TimePeriod.Year,!0).format():new a(d).add(1,exports.TimePeriod.Month,!0).format();break;case" ":case"Enter":return e.preventDefault(),void document.getElementById(d)?.click();case"Esc":case"Escape":return n&&n(),void e.preventDefault()}return i&&(e.preventDefault(),m&&i<m||l&&i>l?i="":(i>t||i<r)&&($.current.newTimePeriod=i,W())),i&&(P?$.current.lastFocusedDate=i:$.current.focusedDate=i,Q()),!1},q=e=>{if(y){let t=e;"single"===g&&(t=e.length?e[0]:null),y(t)}},z=(e,t,a)=>e>=t&&e<=a&&!N(e)&&!H(e),G=e=>e.inRange||e.rangeStart||e.rangeEnd||e.selected,J=()=>"number"==typeof g&&B.selectedDates.length>=g,Q=()=>{const{calendarDisplayMonth:e}=$.current,t=(e=>{const t=e.getMonth(),a=[],r=e.clone().startOfMonth(),n=r.add(-1*(r.getDay()-x),exports.TimePeriod.Day);let o=0;for(;!(o>=4&&n.getMonth()!==t);){a.push([]);for(let e=0;e<=6;e+=1){const r=n.format();a[o].push({blocked:N(r),disabled:H(r),displayText:String(n.getDate()),formatted:r,hovered:j(r),index:e,inMonth:n.getMonth()===t,inRange:"range"===g&&r>=B.selectedDates[0]&&r<=B.selectedDates[1],rangeEnd:"range"===g&&r===B.selectedDates[1],rangeStart:"range"===g&&r===B.selectedDates[0],selected:(s=n,s.format()in $.current.selectedDatesMap),today:$.current.today===r}),n.add(1,exports.TimePeriod.Day)}o+=1}var s;return a})(e);w(t)};return{calendar:b,displayDaysOfTheWeek:$.current.displayDaysOfTheWeek,displayMonth:B.displayMonth,displayYear:B.displayYear,focusedDate:$.current.focusedDate,getCalendarContainerProps:()=>({"aria-labelledby":`${$.current.id}-month-year-label`,onBlur:e=>{e.currentTarget?.contains(e.relatedTarget)||k(!1)},onFocus:()=>{k(!0),Y(!1)},role:"grid"}),getCalendarWeekContainerProps:()=>({role:"row"}),getDayOfTheWeekProps:e=>{const t=$.current.displayDaysOfTheWeek[e];return{abbr:t.long,"aria-label":t.long,id:`day-of-the-week-${e}`,role:"columnheader",scope:"col"}},getDaysOfTheWeekContainerProps:()=>({role:"row"}),getHideDatepickerButtonProps:()=>({"aria-label":O.current.closeButton,onClick:()=>{n&&(k(!1),Y(!1),E(!1),n())},tabIndex:S?0:-1,title:O.current.closeButton,type:"button"}),getControlsContainerProps:()=>({onBlur:e=>{e.currentTarget?.contains(e.relatedTarget)||Y(!1)},onFocus:()=>{Y(!0)}}),getDatepickerContainerProps:()=>({"aria-activedescendant":$.current.focusedDate,onBlur:e=>{e.currentTarget?.contains(e.relatedTarget)||E(!1)},onFocus:()=>E(!0),onKeyDown:_}),getDayButtonProps:e=>{const{focusedDate:t,id:r,lastFocusedDate:n}=$.current,o=e.blocked||e.disabled;return{...o&&{"aria-disabled":!0},"aria-label":`${e.displayText} ${o?O.current.disabled:""} ${e.today?O.current.today:""} ${G(e)?O.current.dateSelected:""}`,"aria-describedby":`${r}-month-year-label`,...G(e)&&{"aria-selected":!0},...!(e.formatted===t||e.formatted===n)&&o&&{disabled:!0},id:e.formatted,key:e.formatted,onClick:()=>{e.blocked||e.disabled||(!e.selected||"multiple"!==g&&"number"!=typeof g?e.selected||($.current.newSelectedDate=e.formatted):$.current.newRemovedDate=e.formatted,$.current.dateClicked=e.formatted,L(new a(e.formatted)))},onMouseOut:()=>{v("")},onMouseOver:()=>{v(e.formatted)},role:"gridcell",tabIndex:K(e),type:"button"}},getMonthYearContainerProps:()=>({"aria-atomic":"true","aria-live":"assertive",id:`${$.current.id}-month-year-label`}),getNextMonthButtonProps:()=>{const{calendarMonthEndDate:e,selectedDates:t}=$.current,{nextMonth:a}=O.current;return{"aria-label":a,disabled:l&&e>l||J()&&t[t.length-1]<=e,onClick:()=>{A(exports.TimePeriod.Month,1)},tabIndex:S?0:-1,title:a,type:"button"}},getNextYearButtonProps:()=>{const{calendarMonthEndDate:e,oneYearBeforeMaxDate:t,oneYearAfterStartOfMonth:a,selectedDates:r}=$.current,{nextYear:n}=O.current;return{"aria-label":n,disabled:l&&e>t||J()&&r[r.length-1]<a,onClick:()=>{A(exports.TimePeriod.Year,1)},tabIndex:S?0:-1,title:n,type:"button"}},getPreviousMonthButtonProps:()=>{const{calendarMonthStartDate:e,selectedDates:t}=$.current,{previousMonth:a}=O.current;return{"aria-label":a,disabled:m&&e<m||J()&&t[0]>e,onClick:()=>{A(exports.TimePeriod.Month,-1)},tabIndex:S?0:-1,title:a,type:"button"}},getPreviousYearButtonProps:()=>{const{calendarMonthStartDate:e,oneYearAfterMinDate:t,oneYearBeforeEndOfMonth:a,selectedDates:r}=$.current,{previousYear:n}=O.current;return{"aria-label":n,disabled:m&&e<t||J()&&r[0]>a,onClick:()=>{A(exports.TimePeriod.Year,-1)},tabIndex:S?0:-1,title:n,type:"button"}},hoveredDate:F,selectedDates:B.selectedDates,setMonth:e=>{const t=new a($.current.focusedDate||$.current.lastFocusedDate).setMonth(e,!0);L(t)},setYear:e=>{const t=new a($.current.focusedDate||$.current.lastFocusedDate).setYear(e);L(t)},today:$.current.today}};
//# sourceMappingURL=main.js.map
