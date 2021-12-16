/**
   * @license MIT
   * author: Roy Pearce <rhdp@roypearce.us> (github.com/roypearce)
   * rhdp.js v1.0.3
   * Released under the MIT license.
   */
import{useState as e,useRef as t,useEffect as a}from"react";var r;!function(e){e[e.Day=0]="Day",e[e.Month=1]="Month",e[e.Week=2]="Week",e[e.Year=3]="Year"}(r||(r={}));const n=new Date,o=class{date=n;constructor(e){if(this.date=e&&e instanceof Date?new Date(e):new Date,e&&!(e instanceof Date)){let t;"string"==typeof e&&10===e.length&&(t=e.split("-"),3===t.length&&(this.setFullDate(+t[0],+t[1],+t[2]),this.date.setHours(0,0,0,0),this.regenDate()))}}add=(e,t,a=!1)=>{switch(t){case r.Year:this.setYear(this.date.getFullYear()+e,a);break;case r.Month:this.setMonth(this.date.getMonth()+1+e,a);break;case r.Week:this.date.setDate(this.date.getDate()+7*e);break;case r.Day:this.date.setDate(this.date.getDate()+e)}return this.regenDate(),this};clone=()=>new o(this.date);endOfMonth=()=>(this.date.setFullYear(this.date.getFullYear(),this.date.getMonth()+1,0),this.regenDate(),this);endOfYear=()=>(this.date.setFullYear(this.date.getFullYear(),12,0),this.regenDate(),this);format=()=>{const e=this.date.getMonth()+1,t=this.date.getDate();return[this.date.getFullYear(),e<10?"0"+e:e,t<10?"0"+t:t].join("-")};getDate=()=>this.date.getDate();getDay=()=>this.date.getDay();getFullYear=()=>this.date.getFullYear();getMonth=()=>this.date.getMonth()+1;regenDate=()=>{this.date=new Date(this.date)};setDay=e=>(this.date.setDate(e),this.regenDate(),this);setFullDate=(e,t,a)=>(this.date.setFullYear.apply(this.date,[e,t-1,a]),this.regenDate(),this);setMonth=(e,t=!1)=>{let a;return t&&this.getDate()>28&&(a=this.clone().setFullDate(this.getFullYear(),e+1,0)),this.date.setMonth(e-1),this.regenDate(),t&&a&&this.getMonth()!==e&&(this.date=a.date),this};setYear=(e,t=!1)=>{let a;return t&&this.getDate()>28&&(a=this.clone().setFullDate(e,this.getMonth()+1,0)),this.date.setFullYear(e),this.regenDate(),t&&a&&this.getMonth()!==a.getMonth()&&(this.date=a.date),this};startOfMonth=()=>(this.date.setFullYear(this.getFullYear(),this.date.getMonth(),1),this.regenDate(),this);startOfYear=()=>(this.date.setFullYear(this.getFullYear(),0,1),this.regenDate(),this)};var s,d;!function(e){e[e.Down=0]="Down",e[e.Left=1]="Left",e[e.Right=2]="Right",e[e.Up=3]="Up"}(s||(s={})),function(e){e[e.Initial=0]="Initial",e[e.Programmatic=1]="Programmatic",e[e.User=2]="User"}(d||(d={}));const l=[[0,1,2,3,4,5,6],[0,-1,1,2,3,4,5],[0,-1,1,-2,2,3,4],[0,-1,1,-2,2,-3,3],[0,-1,1,-2,2,-3,-4],[0,-1,1,-2,-3,-4,-5],[0,-1,-2,-3,-4,-5,-6]],c=e=>e[0].toUpperCase()+e.slice(1),i=e=>Array.isArray(e)?e:[e],u=(e,t,a)=>c(new Intl.DateTimeFormat(e,{weekday:a}).format(t)),h=(e,t)=>{const a=new o,n=a.getDay(),s=a.add(-1*(n-t),r.Day);return[D(e,s.date),D(e,s.add(1,r.Day).date),D(e,s.add(1,r.Day).date),D(e,s.add(1,r.Day).date),D(e,s.add(1,r.Day).date),D(e,s.add(1,r.Day).date),D(e,s.add(1,r.Day).date)]},D=(e,t)=>({long:u(e,t,"long"),narrow:u(e,t,"narrow"),short:u(e,t,"short")}),f=(e,t)=>c(new Intl.DateTimeFormat(t,{month:"long"}).format(e.date)),g=e=>e.getFullYear();let y=0;const m=(e,t)=>{const a=t-e.length;if(a<1)return e;for(let t=1;t<=a;t+=1)e=`0${e}`;return e},M=new o,p=({blockedDates:n=[],focusOnInit:d=!1,hideDatepicker:c,labels:u,locale:D="en-US",maxDate:p,minDate:w,mode:b="single",onChange:k,selectDates:Y,weekStart:F=0})=>{const[v,E]=e([[]]),[O,P]=e(!1),[T,S]=e(!1),[$,x]=e(!1),[B,C]=e(""),I=t({closeButton:"close",dateSelected:"date selected",disabled:"disabled",nextMonth:"next month",nextYear:"next year",previousMonth:"previous month",previousYear:"previous year",today:"today",...u}),W=t({blockedDatesMap:{},calendarDisplayMonth:M,calendarMonthEndDate:M.clone().endOfMonth().format(),calendarMonthStartDate:M.clone().startOfMonth().format(),dateClicked:"",displayDaysOfTheWeek:h(D,F),focusedDate:"",id:"",isInitialRender:!0,lastActiveElement:document.activeElement,lastFocusedDate:"",locale:D,newSelectedDate:"",newRemovedDate:"",newTimePeriod:"",now:M,oneYearAfterMinDate:"",oneYearAfterStartOfMonth:"",oneYearBeforeEndOfMonth:"",oneYearBeforeMaxDate:"",selectDates:[],selectedDates:[],selectedDatesMap:{},today:(new o).format(),weekStart:F});W.current.id||(W.current.id=function(e="rdhp-id-"){return`${e}${y+=1}`}());const[R,A]=e({displayMonth:f(M,D),displayYear:g(M),selectedDates:[""]}),U=()=>{W.current.oneYearBeforeEndOfMonth=new o(W.current.calendarMonthEndDate).add(-1,r.Year).format()},L=()=>{W.current.oneYearAfterStartOfMonth=new o(W.current.calendarMonthStartDate).add(1,r.Year).format()},K=()=>{let{blockedDatesMap:e,calendarDisplayMonth:t,calendarMonthEndDate:a,calendarMonthStartDate:r,dateClicked:s,displayDaysOfTheWeek:l,focusedDate:u,isInitialRender:y,lastFocusedDate:M,newSelectedDate:k,newRemovedDate:v,newTimePeriod:E,selectedDates:O,selectedDatesMap:P,today:T}=W.current,S=!1,$=!1,x=[],B=[...k&&[k],...O],C=!1,I=!1;switch(`${Y}`!=`${W.current.selectDates}`&&(Y?.length?(C=!0,I=!0,B=i(Y)):B=[]),D===W.current.locale&&F===W.current.weekStart||(l=h(D,F)),e={},n&&i(n).forEach((t=>{e[t]=null})),(n||w||p||v||I)&&(B=B.filter((t=>!!(e=>{try{const[t,a,r]=e.match(/\d+/g)||["","",""],n=/^\d{4}-\d{2}-\d{2}$/u,o=new Date(`${m(a,2)}/${m(r,2)}/${t}`);return!isNaN(o.getTime())&&n.test(e)&&+a===o.getMonth()+1&&+r===o.getDate()&&+t===o.getFullYear()}catch(e){return!1}})(t)&&(!(w&&t<w)&&(!(p&&t>p)&&(t!==v&&!(t in e))))))),b){case"single":B.length>1&&(B.length=1),1===B.length&&(x=[B[0]],$=!0);break;case"range":B.length>2&&k&&(B=[k]),x=[...B],x.length>=2&&(x.length=2,$=!0);break;case"multiple":x.push(...B);break;default:"number"==typeof b&&(x.push(...B),x.length>=b&&(x.length=b,$=!0))}P={},x&&x.forEach((e=>{P[e]=null})),(y&&x.length||C||E)&&({calendarDisplayMonth:t,calendarMonthEndDate:a,calendarMonthStartDate:r}=(e=>{const t=new o(e).startOfMonth();return{calendarDisplayMonth:t,calendarMonthEndDate:t.clone().endOfMonth().format(),calendarMonthStartDate:t.format()}})(E||x[0])),y&&(M=x.length?x[0]:T,`${x}`!=`${Y}`&&(S=!0),d&&setTimeout((()=>{document.getElementById(M)?.focus()}),0)),x.sort(),y||`${W.current.selectedDates}`!=`${x}`&&(S=!0),(k||v||S)&&V(x),u&&k&&E&&setTimeout((()=>{document.getElementById(u)?.focus()}),0),c&&s&&$&&c(),A({displayMonth:f(t,D),displayYear:g(t),selectedDates:x}),W.current={...W.current,blockedDatesMap:e,calendarDisplayMonth:t,calendarMonthEndDate:a,calendarMonthStartDate:r,dateClicked:"",displayDaysOfTheWeek:l,isInitialRender:!1,...y&&{lastFocusedDate:M},newSelectedDate:"",newRemovedDate:"",newTimePeriod:"",selectDates:Y,selectedDates:x,selectedDatesMap:P}};a((()=>{const{focusedDate:e,lastFocusedDate:t}=W.current;O?t&&(W.current.focusedDate=t):(W.current.lastFocusedDate=e,W.current.focusedDate="")}),[O]),a((()=>{document.getElementById(W.current.focusedDate)?.focus()}),[W.current.focusedDate]),a((()=>(U(),L(),K(),()=>{W.current.lastActiveElement.focus?.()})),[]),a((()=>{K()}),[`${n}`,u,D,p,w,b,`${Y}`,F]),a((()=>{W.current.oneYearBeforeMaxDate=p?new o(p).add(-1,r.Year).format():""}),[p]),a((()=>{W.current.oneYearAfterMinDate=w?new o(w).add(1,r.Year).format():""}),[w]),a(U,[W.current.calendarMonthStartDate]),a(L,[W.current.calendarMonthEndDate]),a((()=>{ee()}),[R]);const N=(e,t)=>{Q(new KeyboardEvent("keydown",{ctrlKey:e===r.Year,key:1===t?"PageDown":"PageUp"}))},H=(e,t,a=!1)=>{let n=p?new o(p).add(1,r.Week).format():new o(e).add(6,r.Week).format(),d=w?new o(w).add(-1,r.Week).format():new o(e).add(-6,r.Week).format(),c="",i=new o(e);if(W.current.selectedDates.forEach((e=>{e<d?d=e:e>n&&(n=e)})),a&&X(e,d,n))return e;let u,h,D,f,g=1,y=1;switch(t){case s.Left:g=-1;case s.Right:for(h=i.add(g,r.Day).format();h>d&&h<n&&(z(h)||G(h));)h=i.add(g,r.Day).format();X(h,d,n)&&(c=h);break;case s.Up:y=-1;case s.Down:for(i.add(y,r.Week),u=i.getDay(),D=l[u],h=i.format();!c&&h>d&&h<n;)f=D.find((e=>X(i.clone().add(e,r.Day).format(),d,n))),"number"==typeof f&&(c=i.clone().add(f,r.Day).format()),i.add(y,r.Week),h=i.format()}return c},j=e=>{const t=e.format();T||!$?(W.current.focusedDate="",W.current.lastFocusedDate=t):W.current.focusedDate=t,W.current.newTimePeriod=t,K()},q=e=>W.current.focusedDate?e.formatted===W.current.focusedDate?0:-1:W.current.lastFocusedDate?e.formatted===W.current.lastFocusedDate?0:-1:e.formatted===W.current.today?0:-1,z=e=>e in W.current.blockedDatesMap,G=e=>!!(w&&e<w)||(!!(p&&e>p)||!(!_()||e in W.current.selectedDatesMap)),J=e=>e===B,Q=e=>{if("Tab"===e.key||T&&"PageDown"!==e.key&&"PageUp"!==e.key)return;const{calendarMonthEndDate:t,calendarMonthStartDate:a,focusedDate:n,lastFocusedDate:d}=W.current;let l=T?d:n;(l<a||l>t)&&(l=w&&w>=a&&w<=t?w:a);let i="";switch(e.key){case"ArrowLeft":i=H(l,s.Left);break;case"ArrowRight":i=H(l,s.Right);break;case"ArrowUp":i=H(l,s.Up);break;case"ArrowDown":i=H(l,s.Down);break;case"Home":i=H(new o(l).startOfMonth().format(),s.Right,!0);break;case"End":i=H(new o(l).endOfMonth().format(),s.Left,!0);break;case"PageUp":i=e.ctrlKey?new o(l).add(-1,r.Year,!0).format():new o(l).add(-1,r.Month,!0).format();break;case"PageDown":i=e.ctrlKey?new o(l).add(1,r.Year,!0).format():new o(l).add(1,r.Month,!0).format();break;case" ":case"Enter":return e.preventDefault(),void document.getElementById(l)?.click();case"Esc":case"Escape":return c&&c(),void e.preventDefault()}return i&&(e.preventDefault(),w&&i<w||p&&i>p?i="":(i>t||i<a)&&(W.current.newTimePeriod=i,K())),i&&(T?W.current.lastFocusedDate=i:W.current.focusedDate=i,ee()),!1},V=e=>{if(k){let t=e;"single"===b&&(t=e.length?e[0]:null),k(t)}},X=(e,t,a)=>e>=t&&e<=a&&!z(e)&&!G(e),Z=e=>e.inRange||e.rangeStart||e.rangeEnd||e.selected,_=()=>"number"==typeof b&&R.selectedDates.length>=b,ee=()=>{const{calendarDisplayMonth:e}=W.current,t=(e=>{const t=e.getMonth(),a=[],n=e.clone().startOfMonth(),o=n.add(-1*(n.getDay()-F),r.Day);let s=0;for(;!(s>=4&&o.getMonth()!==t);){a.push([]);for(let e=0;e<=6;e+=1){const n=o.format();a[s].push({blocked:z(n),disabled:G(n),displayText:String(o.getDate()),formatted:n,hovered:J(n),index:e,inMonth:o.getMonth()===t,inRange:"range"===b&&n>=R.selectedDates[0]&&n<=R.selectedDates[1],rangeEnd:"range"===b&&n===R.selectedDates[1],rangeStart:"range"===b&&n===R.selectedDates[0],selected:(d=o,d.format()in W.current.selectedDatesMap),today:W.current.today===n}),o.add(1,r.Day)}s+=1}var d;return a})(e);E(t)};return{calendar:v,displayDaysOfTheWeek:W.current.displayDaysOfTheWeek,displayMonth:R.displayMonth,displayYear:R.displayYear,focusedDate:W.current.focusedDate,getCalendarContainerProps:()=>({"aria-labelledby":`${W.current.id}-month-year-label`,onBlur:e=>{e.currentTarget?.contains(e.relatedTarget)||P(!1)},onFocus:()=>{P(!0),S(!1)},role:"grid"}),getCalendarWeekContainerProps:()=>({role:"row"}),getDayOfTheWeekProps:e=>{const t=W.current.displayDaysOfTheWeek[e];return{abbr:t.long,"aria-label":t.long,id:`day-of-the-week-${e}`,role:"columnheader",scope:"col"}},getDaysOfTheWeekContainerProps:()=>({role:"row"}),getHideDatepickerButtonProps:()=>({"aria-label":I.current.closeButton,onClick:()=>{c&&(P(!1),S(!1),x(!1),c())},tabIndex:$?0:-1,title:I.current.closeButton,type:"button"}),getControlsContainerProps:()=>({onBlur:e=>{e.currentTarget?.contains(e.relatedTarget)||S(!1)},onFocus:()=>{S(!0)}}),getDatepickerContainerProps:()=>({"aria-activedescendant":W.current.focusedDate,onBlur:e=>{e.currentTarget?.contains(e.relatedTarget)||x(!1)},onFocus:()=>x(!0),onKeyDown:Q}),getDayButtonProps:e=>{const{focusedDate:t,id:a,lastFocusedDate:r}=W.current,n=e.blocked||e.disabled;return{...n&&{"aria-disabled":!0},"aria-label":`${e.displayText} ${n?I.current.disabled:""} ${e.today?I.current.today:""} ${Z(e)?I.current.dateSelected:""}`,"aria-describedby":`${a}-month-year-label`,...Z(e)&&{"aria-selected":!0},...!(e.formatted===t||e.formatted===r)&&n&&{disabled:!0},id:e.formatted,key:e.formatted,onClick:()=>{e.blocked||e.disabled||(!e.selected||"multiple"!==b&&"number"!=typeof b?e.selected||(W.current.newSelectedDate=e.formatted):W.current.newRemovedDate=e.formatted,W.current.dateClicked=e.formatted,j(new o(e.formatted)))},onMouseOut:()=>{C("")},onMouseOver:()=>{C(e.formatted)},role:"gridcell",tabIndex:q(e),type:"button"}},getMonthYearContainerProps:()=>({"aria-atomic":"true","aria-live":"assertive",id:`${W.current.id}-month-year-label`}),getNextMonthButtonProps:()=>{const{calendarMonthEndDate:e,selectedDates:t}=W.current,{nextMonth:a}=I.current;return{"aria-label":a,disabled:p&&e>p||_()&&t[t.length-1]<=e,onClick:()=>{N(r.Month,1)},tabIndex:$?0:-1,title:a,type:"button"}},getNextYearButtonProps:()=>{const{calendarMonthEndDate:e,oneYearBeforeMaxDate:t,oneYearAfterStartOfMonth:a,selectedDates:n}=W.current,{nextYear:o}=I.current;return{"aria-label":o,disabled:p&&e>t||_()&&n[n.length-1]<a,onClick:()=>{N(r.Year,1)},tabIndex:$?0:-1,title:o,type:"button"}},getPreviousMonthButtonProps:()=>{const{calendarMonthStartDate:e,selectedDates:t}=W.current,{previousMonth:a}=I.current;return{"aria-label":a,disabled:w&&e<w||_()&&t[0]>e,onClick:()=>{N(r.Month,-1)},tabIndex:$?0:-1,title:a,type:"button"}},getPreviousYearButtonProps:()=>{const{calendarMonthStartDate:e,oneYearAfterMinDate:t,oneYearBeforeEndOfMonth:a,selectedDates:n}=W.current,{previousYear:o}=I.current;return{"aria-label":o,disabled:w&&e<t||_()&&n[0]>a,onClick:()=>{N(r.Year,-1)},tabIndex:$?0:-1,title:o,type:"button"}},hoveredDate:B,selectedDates:R.selectedDates,setMonth:e=>{const t=new o(W.current.focusedDate||W.current.lastFocusedDate).setMonth(e,!0);j(t)},setYear:e=>{const t=new o(W.current.focusedDate||W.current.lastFocusedDate).setYear(e);j(t)},today:W.current.today}};export{o as ChainDate,d as RenderType,s as SearchDirection,r as TimePeriod,p as useDatepicker};
//# sourceMappingURL=module.js.map
