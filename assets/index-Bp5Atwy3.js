var Xf=Object.defineProperty;var Gf=(y,s,i)=>s in y?Xf(y,s,{enumerable:!0,configurable:!0,writable:!0,value:i}):y[s]=i;var N=(y,s,i)=>Gf(y,typeof s!="symbol"?s+"":s,i);(function(){const s=document.createElement("link").relList;if(s&&s.supports&&s.supports("modulepreload"))return;for(const p of document.querySelectorAll('link[rel="modulepreload"]'))a(p);new MutationObserver(p=>{for(const h of p)if(h.type==="childList")for(const w of h.addedNodes)w.tagName==="LINK"&&w.rel==="modulepreload"&&a(w)}).observe(document,{childList:!0,subtree:!0});function i(p){const h={};return p.integrity&&(h.integrity=p.integrity),p.referrerPolicy&&(h.referrerPolicy=p.referrerPolicy),p.crossOrigin==="use-credentials"?h.credentials="include":p.crossOrigin==="anonymous"?h.credentials="omit":h.credentials="same-origin",h}function a(p){if(p.ep)return;p.ep=!0;const h=i(p);fetch(p.href,h)}})();var Li={exports:{}},Cr={},Ai={exports:{}},Y={};/**
 * @license React
 * react.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */var Ba;function Kf(){if(Ba)return Y;Ba=1;var y=Symbol.for("react.element"),s=Symbol.for("react.portal"),i=Symbol.for("react.fragment"),a=Symbol.for("react.strict_mode"),p=Symbol.for("react.profiler"),h=Symbol.for("react.provider"),w=Symbol.for("react.context"),S=Symbol.for("react.forward_ref"),F=Symbol.for("react.suspense"),d=Symbol.for("react.memo"),M=Symbol.for("react.lazy"),P=Symbol.iterator;function W(v){return v===null||typeof v!="object"?null:(v=P&&v[P]||v["@@iterator"],typeof v=="function"?v:null)}var q={isMounted:function(){return!1},enqueueForceUpdate:function(){},enqueueReplaceState:function(){},enqueueSetState:function(){}},G=Object.assign,b={};function $(v,k,K){this.props=v,this.context=k,this.refs=b,this.updater=K||q}$.prototype.isReactComponent={},$.prototype.setState=function(v,k){if(typeof v!="object"&&typeof v!="function"&&v!=null)throw Error("setState(...): takes an object of state variables to update or a function which returns an object of state variables.");this.updater.enqueueSetState(this,v,k,"setState")},$.prototype.forceUpdate=function(v){this.updater.enqueueForceUpdate(this,v,"forceUpdate")};function oe(){}oe.prototype=$.prototype;function ue(v,k,K){this.props=v,this.context=k,this.refs=b,this.updater=K||q}var ge=ue.prototype=new oe;ge.constructor=ue,G(ge,$.prototype),ge.isPureReactComponent=!0;var ie=Array.isArray,Te=Object.prototype.hasOwnProperty,ce={current:null},_e={key:!0,ref:!0,__self:!0,__source:!0};function Ae(v,k,K){var Z,ee={},te=null,se=null;if(k!=null)for(Z in k.ref!==void 0&&(se=k.ref),k.key!==void 0&&(te=""+k.key),k)Te.call(k,Z)&&!_e.hasOwnProperty(Z)&&(ee[Z]=k[Z]);var re=arguments.length-2;if(re===1)ee.children=K;else if(1<re){for(var pe=Array(re),Xe=0;Xe<re;Xe++)pe[Xe]=arguments[Xe+2];ee.children=pe}if(v&&v.defaultProps)for(Z in re=v.defaultProps,re)ee[Z]===void 0&&(ee[Z]=re[Z]);return{$$typeof:y,type:v,key:te,ref:se,props:ee,_owner:ce.current}}function lt(v,k){return{$$typeof:y,type:v.type,key:k,ref:v.ref,props:v.props,_owner:v._owner}}function _t(v){return typeof v=="object"&&v!==null&&v.$$typeof===y}function Yt(v){var k={"=":"=0",":":"=2"};return"$"+v.replace(/[=:]/g,function(K){return k[K]})}var pt=/\/+/g;function Qe(v,k){return typeof v=="object"&&v!==null&&v.key!=null?Yt(""+v.key):k.toString(36)}function ot(v,k,K,Z,ee){var te=typeof v;(te==="undefined"||te==="boolean")&&(v=null);var se=!1;if(v===null)se=!0;else switch(te){case"string":case"number":se=!0;break;case"object":switch(v.$$typeof){case y:case s:se=!0}}if(se)return se=v,ee=ee(se),v=Z===""?"."+Qe(se,0):Z,ie(ee)?(K="",v!=null&&(K=v.replace(pt,"$&/")+"/"),ot(ee,k,K,"",function(Xe){return Xe})):ee!=null&&(_t(ee)&&(ee=lt(ee,K+(!ee.key||se&&se.key===ee.key?"":(""+ee.key).replace(pt,"$&/")+"/")+v)),k.push(ee)),1;if(se=0,Z=Z===""?".":Z+":",ie(v))for(var re=0;re<v.length;re++){te=v[re];var pe=Z+Qe(te,re);se+=ot(te,k,K,pe,ee)}else if(pe=W(v),typeof pe=="function")for(v=pe.call(v),re=0;!(te=v.next()).done;)te=te.value,pe=Z+Qe(te,re++),se+=ot(te,k,K,pe,ee);else if(te==="object")throw k=String(v),Error("Objects are not valid as a React child (found: "+(k==="[object Object]"?"object with keys {"+Object.keys(v).join(", ")+"}":k)+"). If you meant to render a collection of children, use an array instead.");return se}function mt(v,k,K){if(v==null)return v;var Z=[],ee=0;return ot(v,Z,"","",function(te){return k.call(K,te,ee++)}),Z}function Ue(v){if(v._status===-1){var k=v._result;k=k(),k.then(function(K){(v._status===0||v._status===-1)&&(v._status=1,v._result=K)},function(K){(v._status===0||v._status===-1)&&(v._status=2,v._result=K)}),v._status===-1&&(v._status=0,v._result=k)}if(v._status===1)return v._result.default;throw v._result}var ye={current:null},D={transition:null},H={ReactCurrentDispatcher:ye,ReactCurrentBatchConfig:D,ReactCurrentOwner:ce};function A(){throw Error("act(...) is not supported in production builds of React.")}return Y.Children={map:mt,forEach:function(v,k,K){mt(v,function(){k.apply(this,arguments)},K)},count:function(v){var k=0;return mt(v,function(){k++}),k},toArray:function(v){return mt(v,function(k){return k})||[]},only:function(v){if(!_t(v))throw Error("React.Children.only expected to receive a single React element child.");return v}},Y.Component=$,Y.Fragment=i,Y.Profiler=p,Y.PureComponent=ue,Y.StrictMode=a,Y.Suspense=F,Y.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED=H,Y.act=A,Y.cloneElement=function(v,k,K){if(v==null)throw Error("React.cloneElement(...): The argument must be a React element, but you passed "+v+".");var Z=G({},v.props),ee=v.key,te=v.ref,se=v._owner;if(k!=null){if(k.ref!==void 0&&(te=k.ref,se=ce.current),k.key!==void 0&&(ee=""+k.key),v.type&&v.type.defaultProps)var re=v.type.defaultProps;for(pe in k)Te.call(k,pe)&&!_e.hasOwnProperty(pe)&&(Z[pe]=k[pe]===void 0&&re!==void 0?re[pe]:k[pe])}var pe=arguments.length-2;if(pe===1)Z.children=K;else if(1<pe){re=Array(pe);for(var Xe=0;Xe<pe;Xe++)re[Xe]=arguments[Xe+2];Z.children=re}return{$$typeof:y,type:v.type,key:ee,ref:te,props:Z,_owner:se}},Y.createContext=function(v){return v={$$typeof:w,_currentValue:v,_currentValue2:v,_threadCount:0,Provider:null,Consumer:null,_defaultValue:null,_globalName:null},v.Provider={$$typeof:h,_context:v},v.Consumer=v},Y.createElement=Ae,Y.createFactory=function(v){var k=Ae.bind(null,v);return k.type=v,k},Y.createRef=function(){return{current:null}},Y.forwardRef=function(v){return{$$typeof:S,render:v}},Y.isValidElement=_t,Y.lazy=function(v){return{$$typeof:M,_payload:{_status:-1,_result:v},_init:Ue}},Y.memo=function(v,k){return{$$typeof:d,type:v,compare:k===void 0?null:k}},Y.startTransition=function(v){var k=D.transition;D.transition={};try{v()}finally{D.transition=k}},Y.unstable_act=A,Y.useCallback=function(v,k){return ye.current.useCallback(v,k)},Y.useContext=function(v){return ye.current.useContext(v)},Y.useDebugValue=function(){},Y.useDeferredValue=function(v){return ye.current.useDeferredValue(v)},Y.useEffect=function(v,k){return ye.current.useEffect(v,k)},Y.useId=function(){return ye.current.useId()},Y.useImperativeHandle=function(v,k,K){return ye.current.useImperativeHandle(v,k,K)},Y.useInsertionEffect=function(v,k){return ye.current.useInsertionEffect(v,k)},Y.useLayoutEffect=function(v,k){return ye.current.useLayoutEffect(v,k)},Y.useMemo=function(v,k){return ye.current.useMemo(v,k)},Y.useReducer=function(v,k,K){return ye.current.useReducer(v,k,K)},Y.useRef=function(v){return ye.current.useRef(v)},Y.useState=function(v){return ye.current.useState(v)},Y.useSyncExternalStore=function(v,k,K){return ye.current.useSyncExternalStore(v,k,K)},Y.useTransition=function(){return ye.current.useTransition()},Y.version="18.3.1",Y}var Va;function $i(){return Va||(Va=1,Ai.exports=Kf()),Ai.exports}/**
 * @license React
 * react-jsx-runtime.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */var Wa;function Yf(){if(Wa)return Cr;Wa=1;var y=$i(),s=Symbol.for("react.element"),i=Symbol.for("react.fragment"),a=Object.prototype.hasOwnProperty,p=y.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED.ReactCurrentOwner,h={key:!0,ref:!0,__self:!0,__source:!0};function w(S,F,d){var M,P={},W=null,q=null;d!==void 0&&(W=""+d),F.key!==void 0&&(W=""+F.key),F.ref!==void 0&&(q=F.ref);for(M in F)a.call(F,M)&&!h.hasOwnProperty(M)&&(P[M]=F[M]);if(S&&S.defaultProps)for(M in F=S.defaultProps,F)P[M]===void 0&&(P[M]=F[M]);return{$$typeof:s,type:S,key:W,ref:q,props:P,_owner:p.current}}return Cr.Fragment=i,Cr.jsx=w,Cr.jsxs=w,Cr}var ba;function qf(){return ba||(ba=1,Li.exports=Yf()),Li.exports}var R=qf(),X=$i(),Ll={},Oi={exports:{}},$e={},ji={exports:{}},Ui={};/**
 * @license React
 * scheduler.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */var Ha;function Zf(){return Ha||(Ha=1,(function(y){function s(D,H){var A=D.length;D.push(H);e:for(;0<A;){var v=A-1>>>1,k=D[v];if(0<p(k,H))D[v]=H,D[A]=k,A=v;else break e}}function i(D){return D.length===0?null:D[0]}function a(D){if(D.length===0)return null;var H=D[0],A=D.pop();if(A!==H){D[0]=A;e:for(var v=0,k=D.length,K=k>>>1;v<K;){var Z=2*(v+1)-1,ee=D[Z],te=Z+1,se=D[te];if(0>p(ee,A))te<k&&0>p(se,ee)?(D[v]=se,D[te]=A,v=te):(D[v]=ee,D[Z]=A,v=Z);else if(te<k&&0>p(se,A))D[v]=se,D[te]=A,v=te;else break e}}return H}function p(D,H){var A=D.sortIndex-H.sortIndex;return A!==0?A:D.id-H.id}if(typeof performance=="object"&&typeof performance.now=="function"){var h=performance;y.unstable_now=function(){return h.now()}}else{var w=Date,S=w.now();y.unstable_now=function(){return w.now()-S}}var F=[],d=[],M=1,P=null,W=3,q=!1,G=!1,b=!1,$=typeof setTimeout=="function"?setTimeout:null,oe=typeof clearTimeout=="function"?clearTimeout:null,ue=typeof setImmediate<"u"?setImmediate:null;typeof navigator<"u"&&navigator.scheduling!==void 0&&navigator.scheduling.isInputPending!==void 0&&navigator.scheduling.isInputPending.bind(navigator.scheduling);function ge(D){for(var H=i(d);H!==null;){if(H.callback===null)a(d);else if(H.startTime<=D)a(d),H.sortIndex=H.expirationTime,s(F,H);else break;H=i(d)}}function ie(D){if(b=!1,ge(D),!G)if(i(F)!==null)G=!0,Ue(Te);else{var H=i(d);H!==null&&ye(ie,H.startTime-D)}}function Te(D,H){G=!1,b&&(b=!1,oe(Ae),Ae=-1),q=!0;var A=W;try{for(ge(H),P=i(F);P!==null&&(!(P.expirationTime>H)||D&&!Yt());){var v=P.callback;if(typeof v=="function"){P.callback=null,W=P.priorityLevel;var k=v(P.expirationTime<=H);H=y.unstable_now(),typeof k=="function"?P.callback=k:P===i(F)&&a(F),ge(H)}else a(F);P=i(F)}if(P!==null)var K=!0;else{var Z=i(d);Z!==null&&ye(ie,Z.startTime-H),K=!1}return K}finally{P=null,W=A,q=!1}}var ce=!1,_e=null,Ae=-1,lt=5,_t=-1;function Yt(){return!(y.unstable_now()-_t<lt)}function pt(){if(_e!==null){var D=y.unstable_now();_t=D;var H=!0;try{H=_e(!0,D)}finally{H?Qe():(ce=!1,_e=null)}}else ce=!1}var Qe;if(typeof ue=="function")Qe=function(){ue(pt)};else if(typeof MessageChannel<"u"){var ot=new MessageChannel,mt=ot.port2;ot.port1.onmessage=pt,Qe=function(){mt.postMessage(null)}}else Qe=function(){$(pt,0)};function Ue(D){_e=D,ce||(ce=!0,Qe())}function ye(D,H){Ae=$(function(){D(y.unstable_now())},H)}y.unstable_IdlePriority=5,y.unstable_ImmediatePriority=1,y.unstable_LowPriority=4,y.unstable_NormalPriority=3,y.unstable_Profiling=null,y.unstable_UserBlockingPriority=2,y.unstable_cancelCallback=function(D){D.callback=null},y.unstable_continueExecution=function(){G||q||(G=!0,Ue(Te))},y.unstable_forceFrameRate=function(D){0>D||125<D?console.error("forceFrameRate takes a positive int between 0 and 125, forcing frame rates higher than 125 fps is not supported"):lt=0<D?Math.floor(1e3/D):5},y.unstable_getCurrentPriorityLevel=function(){return W},y.unstable_getFirstCallbackNode=function(){return i(F)},y.unstable_next=function(D){switch(W){case 1:case 2:case 3:var H=3;break;default:H=W}var A=W;W=H;try{return D()}finally{W=A}},y.unstable_pauseExecution=function(){},y.unstable_requestPaint=function(){},y.unstable_runWithPriority=function(D,H){switch(D){case 1:case 2:case 3:case 4:case 5:break;default:D=3}var A=W;W=D;try{return H()}finally{W=A}},y.unstable_scheduleCallback=function(D,H,A){var v=y.unstable_now();switch(typeof A=="object"&&A!==null?(A=A.delay,A=typeof A=="number"&&0<A?v+A:v):A=v,D){case 1:var k=-1;break;case 2:k=250;break;case 5:k=1073741823;break;case 4:k=1e4;break;default:k=5e3}return k=A+k,D={id:M++,callback:H,priorityLevel:D,startTime:A,expirationTime:k,sortIndex:-1},A>v?(D.sortIndex=A,s(d,D),i(F)===null&&D===i(d)&&(b?(oe(Ae),Ae=-1):b=!0,ye(ie,A-v))):(D.sortIndex=k,s(F,D),G||q||(G=!0,Ue(Te))),D},y.unstable_shouldYield=Yt,y.unstable_wrapCallback=function(D){var H=W;return function(){var A=W;W=H;try{return D.apply(this,arguments)}finally{W=A}}}})(Ui)),Ui}var $a;function Jf(){return $a||($a=1,ji.exports=Zf()),ji.exports}/**
 * @license React
 * react-dom.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */var Qa;function ed(){if(Qa)return $e;Qa=1;var y=$i(),s=Jf();function i(e){for(var t="https://reactjs.org/docs/error-decoder.html?invariant="+e,n=1;n<arguments.length;n++)t+="&args[]="+encodeURIComponent(arguments[n]);return"Minified React error #"+e+"; visit "+t+" for the full message or use the non-minified dev environment for full errors and additional helpful warnings."}var a=new Set,p={};function h(e,t){w(e,t),w(e+"Capture",t)}function w(e,t){for(p[e]=t,e=0;e<t.length;e++)a.add(t[e])}var S=!(typeof window>"u"||typeof window.document>"u"||typeof window.document.createElement>"u"),F=Object.prototype.hasOwnProperty,d=/^[:A-Z_a-z\u00C0-\u00D6\u00D8-\u00F6\u00F8-\u02FF\u0370-\u037D\u037F-\u1FFF\u200C-\u200D\u2070-\u218F\u2C00-\u2FEF\u3001-\uD7FF\uF900-\uFDCF\uFDF0-\uFFFD][:A-Z_a-z\u00C0-\u00D6\u00D8-\u00F6\u00F8-\u02FF\u0370-\u037D\u037F-\u1FFF\u200C-\u200D\u2070-\u218F\u2C00-\u2FEF\u3001-\uD7FF\uF900-\uFDCF\uFDF0-\uFFFD\-.0-9\u00B7\u0300-\u036F\u203F-\u2040]*$/,M={},P={};function W(e){return F.call(P,e)?!0:F.call(M,e)?!1:d.test(e)?P[e]=!0:(M[e]=!0,!1)}function q(e,t,n,r){if(n!==null&&n.type===0)return!1;switch(typeof t){case"function":case"symbol":return!0;case"boolean":return r?!1:n!==null?!n.acceptsBooleans:(e=e.toLowerCase().slice(0,5),e!=="data-"&&e!=="aria-");default:return!1}}function G(e,t,n,r){if(t===null||typeof t>"u"||q(e,t,n,r))return!0;if(r)return!1;if(n!==null)switch(n.type){case 3:return!t;case 4:return t===!1;case 5:return isNaN(t);case 6:return isNaN(t)||1>t}return!1}function b(e,t,n,r,l,o,u){this.acceptsBooleans=t===2||t===3||t===4,this.attributeName=r,this.attributeNamespace=l,this.mustUseProperty=n,this.propertyName=e,this.type=t,this.sanitizeURL=o,this.removeEmptyString=u}var $={};"children dangerouslySetInnerHTML defaultValue defaultChecked innerHTML suppressContentEditableWarning suppressHydrationWarning style".split(" ").forEach(function(e){$[e]=new b(e,0,!1,e,null,!1,!1)}),[["acceptCharset","accept-charset"],["className","class"],["htmlFor","for"],["httpEquiv","http-equiv"]].forEach(function(e){var t=e[0];$[t]=new b(t,1,!1,e[1],null,!1,!1)}),["contentEditable","draggable","spellCheck","value"].forEach(function(e){$[e]=new b(e,2,!1,e.toLowerCase(),null,!1,!1)}),["autoReverse","externalResourcesRequired","focusable","preserveAlpha"].forEach(function(e){$[e]=new b(e,2,!1,e,null,!1,!1)}),"allowFullScreen async autoFocus autoPlay controls default defer disabled disablePictureInPicture disableRemotePlayback formNoValidate hidden loop noModule noValidate open playsInline readOnly required reversed scoped seamless itemScope".split(" ").forEach(function(e){$[e]=new b(e,3,!1,e.toLowerCase(),null,!1,!1)}),["checked","multiple","muted","selected"].forEach(function(e){$[e]=new b(e,3,!0,e,null,!1,!1)}),["capture","download"].forEach(function(e){$[e]=new b(e,4,!1,e,null,!1,!1)}),["cols","rows","size","span"].forEach(function(e){$[e]=new b(e,6,!1,e,null,!1,!1)}),["rowSpan","start"].forEach(function(e){$[e]=new b(e,5,!1,e.toLowerCase(),null,!1,!1)});var oe=/[\-:]([a-z])/g;function ue(e){return e[1].toUpperCase()}"accent-height alignment-baseline arabic-form baseline-shift cap-height clip-path clip-rule color-interpolation color-interpolation-filters color-profile color-rendering dominant-baseline enable-background fill-opacity fill-rule flood-color flood-opacity font-family font-size font-size-adjust font-stretch font-style font-variant font-weight glyph-name glyph-orientation-horizontal glyph-orientation-vertical horiz-adv-x horiz-origin-x image-rendering letter-spacing lighting-color marker-end marker-mid marker-start overline-position overline-thickness paint-order panose-1 pointer-events rendering-intent shape-rendering stop-color stop-opacity strikethrough-position strikethrough-thickness stroke-dasharray stroke-dashoffset stroke-linecap stroke-linejoin stroke-miterlimit stroke-opacity stroke-width text-anchor text-decoration text-rendering underline-position underline-thickness unicode-bidi unicode-range units-per-em v-alphabetic v-hanging v-ideographic v-mathematical vector-effect vert-adv-y vert-origin-x vert-origin-y word-spacing writing-mode xmlns:xlink x-height".split(" ").forEach(function(e){var t=e.replace(oe,ue);$[t]=new b(t,1,!1,e,null,!1,!1)}),"xlink:actuate xlink:arcrole xlink:role xlink:show xlink:title xlink:type".split(" ").forEach(function(e){var t=e.replace(oe,ue);$[t]=new b(t,1,!1,e,"http://www.w3.org/1999/xlink",!1,!1)}),["xml:base","xml:lang","xml:space"].forEach(function(e){var t=e.replace(oe,ue);$[t]=new b(t,1,!1,e,"http://www.w3.org/XML/1998/namespace",!1,!1)}),["tabIndex","crossOrigin"].forEach(function(e){$[e]=new b(e,1,!1,e.toLowerCase(),null,!1,!1)}),$.xlinkHref=new b("xlinkHref",1,!1,"xlink:href","http://www.w3.org/1999/xlink",!0,!1),["src","href","action","formAction"].forEach(function(e){$[e]=new b(e,1,!1,e.toLowerCase(),null,!0,!0)});function ge(e,t,n,r){var l=$.hasOwnProperty(t)?$[t]:null;(l!==null?l.type!==0:r||!(2<t.length)||t[0]!=="o"&&t[0]!=="O"||t[1]!=="n"&&t[1]!=="N")&&(G(t,n,l,r)&&(n=null),r||l===null?W(t)&&(n===null?e.removeAttribute(t):e.setAttribute(t,""+n)):l.mustUseProperty?e[l.propertyName]=n===null?l.type===3?!1:"":n:(t=l.attributeName,r=l.attributeNamespace,n===null?e.removeAttribute(t):(l=l.type,n=l===3||l===4&&n===!0?"":""+n,r?e.setAttributeNS(r,t,n):e.setAttribute(t,n))))}var ie=y.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED,Te=Symbol.for("react.element"),ce=Symbol.for("react.portal"),_e=Symbol.for("react.fragment"),Ae=Symbol.for("react.strict_mode"),lt=Symbol.for("react.profiler"),_t=Symbol.for("react.provider"),Yt=Symbol.for("react.context"),pt=Symbol.for("react.forward_ref"),Qe=Symbol.for("react.suspense"),ot=Symbol.for("react.suspense_list"),mt=Symbol.for("react.memo"),Ue=Symbol.for("react.lazy"),ye=Symbol.for("react.offscreen"),D=Symbol.iterator;function H(e){return e===null||typeof e!="object"?null:(e=D&&e[D]||e["@@iterator"],typeof e=="function"?e:null)}var A=Object.assign,v;function k(e){if(v===void 0)try{throw Error()}catch(n){var t=n.stack.trim().match(/\n( *(at )?)/);v=t&&t[1]||""}return`
`+v+e}var K=!1;function Z(e,t){if(!e||K)return"";K=!0;var n=Error.prepareStackTrace;Error.prepareStackTrace=void 0;try{if(t)if(t=function(){throw Error()},Object.defineProperty(t.prototype,"props",{set:function(){throw Error()}}),typeof Reflect=="object"&&Reflect.construct){try{Reflect.construct(t,[])}catch(_){var r=_}Reflect.construct(e,[],t)}else{try{t.call()}catch(_){r=_}e.call(t.prototype)}else{try{throw Error()}catch(_){r=_}e()}}catch(_){if(_&&r&&typeof _.stack=="string"){for(var l=_.stack.split(`
`),o=r.stack.split(`
`),u=l.length-1,c=o.length-1;1<=u&&0<=c&&l[u]!==o[c];)c--;for(;1<=u&&0<=c;u--,c--)if(l[u]!==o[c]){if(u!==1||c!==1)do if(u--,c--,0>c||l[u]!==o[c]){var f=`
`+l[u].replace(" at new "," at ");return e.displayName&&f.includes("<anonymous>")&&(f=f.replace("<anonymous>",e.displayName)),f}while(1<=u&&0<=c);break}}}finally{K=!1,Error.prepareStackTrace=n}return(e=e?e.displayName||e.name:"")?k(e):""}function ee(e){switch(e.tag){case 5:return k(e.type);case 16:return k("Lazy");case 13:return k("Suspense");case 19:return k("SuspenseList");case 0:case 2:case 15:return e=Z(e.type,!1),e;case 11:return e=Z(e.type.render,!1),e;case 1:return e=Z(e.type,!0),e;default:return""}}function te(e){if(e==null)return null;if(typeof e=="function")return e.displayName||e.name||null;if(typeof e=="string")return e;switch(e){case _e:return"Fragment";case ce:return"Portal";case lt:return"Profiler";case Ae:return"StrictMode";case Qe:return"Suspense";case ot:return"SuspenseList"}if(typeof e=="object")switch(e.$$typeof){case Yt:return(e.displayName||"Context")+".Consumer";case _t:return(e._context.displayName||"Context")+".Provider";case pt:var t=e.render;return e=e.displayName,e||(e=t.displayName||t.name||"",e=e!==""?"ForwardRef("+e+")":"ForwardRef"),e;case mt:return t=e.displayName||null,t!==null?t:te(e.type)||"Memo";case Ue:t=e._payload,e=e._init;try{return te(e(t))}catch{}}return null}function se(e){var t=e.type;switch(e.tag){case 24:return"Cache";case 9:return(t.displayName||"Context")+".Consumer";case 10:return(t._context.displayName||"Context")+".Provider";case 18:return"DehydratedFragment";case 11:return e=t.render,e=e.displayName||e.name||"",t.displayName||(e!==""?"ForwardRef("+e+")":"ForwardRef");case 7:return"Fragment";case 5:return t;case 4:return"Portal";case 3:return"Root";case 6:return"Text";case 16:return te(t);case 8:return t===Ae?"StrictMode":"Mode";case 22:return"Offscreen";case 12:return"Profiler";case 21:return"Scope";case 13:return"Suspense";case 19:return"SuspenseList";case 25:return"TracingMarker";case 1:case 0:case 17:case 2:case 14:case 15:if(typeof t=="function")return t.displayName||t.name||null;if(typeof t=="string")return t}return null}function re(e){switch(typeof e){case"boolean":case"number":case"string":case"undefined":return e;case"object":return e;default:return""}}function pe(e){var t=e.type;return(e=e.nodeName)&&e.toLowerCase()==="input"&&(t==="checkbox"||t==="radio")}function Xe(e){var t=pe(e)?"checked":"value",n=Object.getOwnPropertyDescriptor(e.constructor.prototype,t),r=""+e[t];if(!e.hasOwnProperty(t)&&typeof n<"u"&&typeof n.get=="function"&&typeof n.set=="function"){var l=n.get,o=n.set;return Object.defineProperty(e,t,{configurable:!0,get:function(){return l.call(this)},set:function(u){r=""+u,o.call(this,u)}}),Object.defineProperty(e,t,{enumerable:n.enumerable}),{getValue:function(){return r},setValue:function(u){r=""+u},stopTracking:function(){e._valueTracker=null,delete e[t]}}}}function Er(e){e._valueTracker||(e._valueTracker=Xe(e))}function Qi(e){if(!e)return!1;var t=e._valueTracker;if(!t)return!0;var n=t.getValue(),r="";return e&&(r=pe(e)?e.checked?"true":"false":e.value),e=r,e!==n?(t.setValue(e),!0):!1}function Tr(e){if(e=e||(typeof document<"u"?document:void 0),typeof e>"u")return null;try{return e.activeElement||e.body}catch{return e.body}}function Vl(e,t){var n=t.checked;return A({},t,{defaultChecked:void 0,defaultValue:void 0,value:void 0,checked:n??e._wrapperState.initialChecked})}function Xi(e,t){var n=t.defaultValue==null?"":t.defaultValue,r=t.checked!=null?t.checked:t.defaultChecked;n=re(t.value!=null?t.value:n),e._wrapperState={initialChecked:r,initialValue:n,controlled:t.type==="checkbox"||t.type==="radio"?t.checked!=null:t.value!=null}}function Gi(e,t){t=t.checked,t!=null&&ge(e,"checked",t,!1)}function Wl(e,t){Gi(e,t);var n=re(t.value),r=t.type;if(n!=null)r==="number"?(n===0&&e.value===""||e.value!=n)&&(e.value=""+n):e.value!==""+n&&(e.value=""+n);else if(r==="submit"||r==="reset"){e.removeAttribute("value");return}t.hasOwnProperty("value")?bl(e,t.type,n):t.hasOwnProperty("defaultValue")&&bl(e,t.type,re(t.defaultValue)),t.checked==null&&t.defaultChecked!=null&&(e.defaultChecked=!!t.defaultChecked)}function Ki(e,t,n){if(t.hasOwnProperty("value")||t.hasOwnProperty("defaultValue")){var r=t.type;if(!(r!=="submit"&&r!=="reset"||t.value!==void 0&&t.value!==null))return;t=""+e._wrapperState.initialValue,n||t===e.value||(e.value=t),e.defaultValue=t}n=e.name,n!==""&&(e.name=""),e.defaultChecked=!!e._wrapperState.initialChecked,n!==""&&(e.name=n)}function bl(e,t,n){(t!=="number"||Tr(e.ownerDocument)!==e)&&(n==null?e.defaultValue=""+e._wrapperState.initialValue:e.defaultValue!==""+n&&(e.defaultValue=""+n))}var jn=Array.isArray;function dn(e,t,n,r){if(e=e.options,t){t={};for(var l=0;l<n.length;l++)t["$"+n[l]]=!0;for(n=0;n<e.length;n++)l=t.hasOwnProperty("$"+e[n].value),e[n].selected!==l&&(e[n].selected=l),l&&r&&(e[n].defaultSelected=!0)}else{for(n=""+re(n),t=null,l=0;l<e.length;l++){if(e[l].value===n){e[l].selected=!0,r&&(e[l].defaultSelected=!0);return}t!==null||e[l].disabled||(t=e[l])}t!==null&&(t.selected=!0)}}function Hl(e,t){if(t.dangerouslySetInnerHTML!=null)throw Error(i(91));return A({},t,{value:void 0,defaultValue:void 0,children:""+e._wrapperState.initialValue})}function Yi(e,t){var n=t.value;if(n==null){if(n=t.children,t=t.defaultValue,n!=null){if(t!=null)throw Error(i(92));if(jn(n)){if(1<n.length)throw Error(i(93));n=n[0]}t=n}t==null&&(t=""),n=t}e._wrapperState={initialValue:re(n)}}function qi(e,t){var n=re(t.value),r=re(t.defaultValue);n!=null&&(n=""+n,n!==e.value&&(e.value=n),t.defaultValue==null&&e.defaultValue!==n&&(e.defaultValue=n)),r!=null&&(e.defaultValue=""+r)}function Zi(e){var t=e.textContent;t===e._wrapperState.initialValue&&t!==""&&t!==null&&(e.value=t)}function Ji(e){switch(e){case"svg":return"http://www.w3.org/2000/svg";case"math":return"http://www.w3.org/1998/Math/MathML";default:return"http://www.w3.org/1999/xhtml"}}function $l(e,t){return e==null||e==="http://www.w3.org/1999/xhtml"?Ji(t):e==="http://www.w3.org/2000/svg"&&t==="foreignObject"?"http://www.w3.org/1999/xhtml":e}var Rr,eu=(function(e){return typeof MSApp<"u"&&MSApp.execUnsafeLocalFunction?function(t,n,r,l){MSApp.execUnsafeLocalFunction(function(){return e(t,n,r,l)})}:e})(function(e,t){if(e.namespaceURI!=="http://www.w3.org/2000/svg"||"innerHTML"in e)e.innerHTML=t;else{for(Rr=Rr||document.createElement("div"),Rr.innerHTML="<svg>"+t.valueOf().toString()+"</svg>",t=Rr.firstChild;e.firstChild;)e.removeChild(e.firstChild);for(;t.firstChild;)e.appendChild(t.firstChild)}});function Un(e,t){if(t){var n=e.firstChild;if(n&&n===e.lastChild&&n.nodeType===3){n.nodeValue=t;return}}e.textContent=t}var Bn={animationIterationCount:!0,aspectRatio:!0,borderImageOutset:!0,borderImageSlice:!0,borderImageWidth:!0,boxFlex:!0,boxFlexGroup:!0,boxOrdinalGroup:!0,columnCount:!0,columns:!0,flex:!0,flexGrow:!0,flexPositive:!0,flexShrink:!0,flexNegative:!0,flexOrder:!0,gridArea:!0,gridRow:!0,gridRowEnd:!0,gridRowSpan:!0,gridRowStart:!0,gridColumn:!0,gridColumnEnd:!0,gridColumnSpan:!0,gridColumnStart:!0,fontWeight:!0,lineClamp:!0,lineHeight:!0,opacity:!0,order:!0,orphans:!0,tabSize:!0,widows:!0,zIndex:!0,zoom:!0,fillOpacity:!0,floodOpacity:!0,stopOpacity:!0,strokeDasharray:!0,strokeDashoffset:!0,strokeMiterlimit:!0,strokeOpacity:!0,strokeWidth:!0},Ya=["Webkit","ms","Moz","O"];Object.keys(Bn).forEach(function(e){Ya.forEach(function(t){t=t+e.charAt(0).toUpperCase()+e.substring(1),Bn[t]=Bn[e]})});function tu(e,t,n){return t==null||typeof t=="boolean"||t===""?"":n||typeof t!="number"||t===0||Bn.hasOwnProperty(e)&&Bn[e]?(""+t).trim():t+"px"}function nu(e,t){e=e.style;for(var n in t)if(t.hasOwnProperty(n)){var r=n.indexOf("--")===0,l=tu(n,t[n],r);n==="float"&&(n="cssFloat"),r?e.setProperty(n,l):e[n]=l}}var qa=A({menuitem:!0},{area:!0,base:!0,br:!0,col:!0,embed:!0,hr:!0,img:!0,input:!0,keygen:!0,link:!0,meta:!0,param:!0,source:!0,track:!0,wbr:!0});function Ql(e,t){if(t){if(qa[e]&&(t.children!=null||t.dangerouslySetInnerHTML!=null))throw Error(i(137,e));if(t.dangerouslySetInnerHTML!=null){if(t.children!=null)throw Error(i(60));if(typeof t.dangerouslySetInnerHTML!="object"||!("__html"in t.dangerouslySetInnerHTML))throw Error(i(61))}if(t.style!=null&&typeof t.style!="object")throw Error(i(62))}}function Xl(e,t){if(e.indexOf("-")===-1)return typeof t.is=="string";switch(e){case"annotation-xml":case"color-profile":case"font-face":case"font-face-src":case"font-face-uri":case"font-face-format":case"font-face-name":case"missing-glyph":return!1;default:return!0}}var Gl=null;function Kl(e){return e=e.target||e.srcElement||window,e.correspondingUseElement&&(e=e.correspondingUseElement),e.nodeType===3?e.parentNode:e}var Yl=null,pn=null,mn=null;function ru(e){if(e=sr(e)){if(typeof Yl!="function")throw Error(i(280));var t=e.stateNode;t&&(t=Yr(t),Yl(e.stateNode,e.type,t))}}function lu(e){pn?mn?mn.push(e):mn=[e]:pn=e}function ou(){if(pn){var e=pn,t=mn;if(mn=pn=null,ru(e),t)for(e=0;e<t.length;e++)ru(t[e])}}function iu(e,t){return e(t)}function uu(){}var ql=!1;function su(e,t,n){if(ql)return e(t,n);ql=!0;try{return iu(e,t,n)}finally{ql=!1,(pn!==null||mn!==null)&&(uu(),ou())}}function Vn(e,t){var n=e.stateNode;if(n===null)return null;var r=Yr(n);if(r===null)return null;n=r[t];e:switch(t){case"onClick":case"onClickCapture":case"onDoubleClick":case"onDoubleClickCapture":case"onMouseDown":case"onMouseDownCapture":case"onMouseMove":case"onMouseMoveCapture":case"onMouseUp":case"onMouseUpCapture":case"onMouseEnter":(r=!r.disabled)||(e=e.type,r=!(e==="button"||e==="input"||e==="select"||e==="textarea")),e=!r;break e;default:e=!1}if(e)return null;if(n&&typeof n!="function")throw Error(i(231,t,typeof n));return n}var Zl=!1;if(S)try{var Wn={};Object.defineProperty(Wn,"passive",{get:function(){Zl=!0}}),window.addEventListener("test",Wn,Wn),window.removeEventListener("test",Wn,Wn)}catch{Zl=!1}function Za(e,t,n,r,l,o,u,c,f){var _=Array.prototype.slice.call(arguments,3);try{t.apply(n,_)}catch(E){this.onError(E)}}var bn=!1,Fr=null,Ir=!1,Jl=null,Ja={onError:function(e){bn=!0,Fr=e}};function ec(e,t,n,r,l,o,u,c,f){bn=!1,Fr=null,Za.apply(Ja,arguments)}function tc(e,t,n,r,l,o,u,c,f){if(ec.apply(this,arguments),bn){if(bn){var _=Fr;bn=!1,Fr=null}else throw Error(i(198));Ir||(Ir=!0,Jl=_)}}function qt(e){var t=e,n=e;if(e.alternate)for(;t.return;)t=t.return;else{e=t;do t=e,(t.flags&4098)!==0&&(n=t.return),e=t.return;while(e)}return t.tag===3?n:null}function au(e){if(e.tag===13){var t=e.memoizedState;if(t===null&&(e=e.alternate,e!==null&&(t=e.memoizedState)),t!==null)return t.dehydrated}return null}function cu(e){if(qt(e)!==e)throw Error(i(188))}function nc(e){var t=e.alternate;if(!t){if(t=qt(e),t===null)throw Error(i(188));return t!==e?null:e}for(var n=e,r=t;;){var l=n.return;if(l===null)break;var o=l.alternate;if(o===null){if(r=l.return,r!==null){n=r;continue}break}if(l.child===o.child){for(o=l.child;o;){if(o===n)return cu(l),e;if(o===r)return cu(l),t;o=o.sibling}throw Error(i(188))}if(n.return!==r.return)n=l,r=o;else{for(var u=!1,c=l.child;c;){if(c===n){u=!0,n=l,r=o;break}if(c===r){u=!0,r=l,n=o;break}c=c.sibling}if(!u){for(c=o.child;c;){if(c===n){u=!0,n=o,r=l;break}if(c===r){u=!0,r=o,n=l;break}c=c.sibling}if(!u)throw Error(i(189))}}if(n.alternate!==r)throw Error(i(190))}if(n.tag!==3)throw Error(i(188));return n.stateNode.current===n?e:t}function fu(e){return e=nc(e),e!==null?du(e):null}function du(e){if(e.tag===5||e.tag===6)return e;for(e=e.child;e!==null;){var t=du(e);if(t!==null)return t;e=e.sibling}return null}var pu=s.unstable_scheduleCallback,mu=s.unstable_cancelCallback,rc=s.unstable_shouldYield,lc=s.unstable_requestPaint,we=s.unstable_now,oc=s.unstable_getCurrentPriorityLevel,eo=s.unstable_ImmediatePriority,hu=s.unstable_UserBlockingPriority,Pr=s.unstable_NormalPriority,ic=s.unstable_LowPriority,vu=s.unstable_IdlePriority,Nr=null,ht=null;function uc(e){if(ht&&typeof ht.onCommitFiberRoot=="function")try{ht.onCommitFiberRoot(Nr,e,void 0,(e.current.flags&128)===128)}catch{}}var it=Math.clz32?Math.clz32:cc,sc=Math.log,ac=Math.LN2;function cc(e){return e>>>=0,e===0?32:31-(sc(e)/ac|0)|0}var Mr=64,Dr=4194304;function Hn(e){switch(e&-e){case 1:return 1;case 2:return 2;case 4:return 4;case 8:return 8;case 16:return 16;case 32:return 32;case 64:case 128:case 256:case 512:case 1024:case 2048:case 4096:case 8192:case 16384:case 32768:case 65536:case 131072:case 262144:case 524288:case 1048576:case 2097152:return e&4194240;case 4194304:case 8388608:case 16777216:case 33554432:case 67108864:return e&130023424;case 134217728:return 134217728;case 268435456:return 268435456;case 536870912:return 536870912;case 1073741824:return 1073741824;default:return e}}function zr(e,t){var n=e.pendingLanes;if(n===0)return 0;var r=0,l=e.suspendedLanes,o=e.pingedLanes,u=n&268435455;if(u!==0){var c=u&~l;c!==0?r=Hn(c):(o&=u,o!==0&&(r=Hn(o)))}else u=n&~l,u!==0?r=Hn(u):o!==0&&(r=Hn(o));if(r===0)return 0;if(t!==0&&t!==r&&(t&l)===0&&(l=r&-r,o=t&-t,l>=o||l===16&&(o&4194240)!==0))return t;if((r&4)!==0&&(r|=n&16),t=e.entangledLanes,t!==0)for(e=e.entanglements,t&=r;0<t;)n=31-it(t),l=1<<n,r|=e[n],t&=~l;return r}function fc(e,t){switch(e){case 1:case 2:case 4:return t+250;case 8:case 16:case 32:case 64:case 128:case 256:case 512:case 1024:case 2048:case 4096:case 8192:case 16384:case 32768:case 65536:case 131072:case 262144:case 524288:case 1048576:case 2097152:return t+5e3;case 4194304:case 8388608:case 16777216:case 33554432:case 67108864:return-1;case 134217728:case 268435456:case 536870912:case 1073741824:return-1;default:return-1}}function dc(e,t){for(var n=e.suspendedLanes,r=e.pingedLanes,l=e.expirationTimes,o=e.pendingLanes;0<o;){var u=31-it(o),c=1<<u,f=l[u];f===-1?((c&n)===0||(c&r)!==0)&&(l[u]=fc(c,t)):f<=t&&(e.expiredLanes|=c),o&=~c}}function to(e){return e=e.pendingLanes&-1073741825,e!==0?e:e&1073741824?1073741824:0}function gu(){var e=Mr;return Mr<<=1,(Mr&4194240)===0&&(Mr=64),e}function no(e){for(var t=[],n=0;31>n;n++)t.push(e);return t}function $n(e,t,n){e.pendingLanes|=t,t!==536870912&&(e.suspendedLanes=0,e.pingedLanes=0),e=e.eventTimes,t=31-it(t),e[t]=n}function pc(e,t){var n=e.pendingLanes&~t;e.pendingLanes=t,e.suspendedLanes=0,e.pingedLanes=0,e.expiredLanes&=t,e.mutableReadLanes&=t,e.entangledLanes&=t,t=e.entanglements;var r=e.eventTimes;for(e=e.expirationTimes;0<n;){var l=31-it(n),o=1<<l;t[l]=0,r[l]=-1,e[l]=-1,n&=~o}}function ro(e,t){var n=e.entangledLanes|=t;for(e=e.entanglements;n;){var r=31-it(n),l=1<<r;l&t|e[r]&t&&(e[r]|=t),n&=~l}}var le=0;function yu(e){return e&=-e,1<e?4<e?(e&268435455)!==0?16:536870912:4:1}var xu,lo,_u,wu,Su,oo=!1,Lr=[],It=null,Pt=null,Nt=null,Qn=new Map,Xn=new Map,Mt=[],mc="mousedown mouseup touchcancel touchend touchstart auxclick dblclick pointercancel pointerdown pointerup dragend dragstart drop compositionend compositionstart keydown keypress keyup input textInput copy cut paste click change contextmenu reset submit".split(" ");function Cu(e,t){switch(e){case"focusin":case"focusout":It=null;break;case"dragenter":case"dragleave":Pt=null;break;case"mouseover":case"mouseout":Nt=null;break;case"pointerover":case"pointerout":Qn.delete(t.pointerId);break;case"gotpointercapture":case"lostpointercapture":Xn.delete(t.pointerId)}}function Gn(e,t,n,r,l,o){return e===null||e.nativeEvent!==o?(e={blockedOn:t,domEventName:n,eventSystemFlags:r,nativeEvent:o,targetContainers:[l]},t!==null&&(t=sr(t),t!==null&&lo(t)),e):(e.eventSystemFlags|=r,t=e.targetContainers,l!==null&&t.indexOf(l)===-1&&t.push(l),e)}function hc(e,t,n,r,l){switch(t){case"focusin":return It=Gn(It,e,t,n,r,l),!0;case"dragenter":return Pt=Gn(Pt,e,t,n,r,l),!0;case"mouseover":return Nt=Gn(Nt,e,t,n,r,l),!0;case"pointerover":var o=l.pointerId;return Qn.set(o,Gn(Qn.get(o)||null,e,t,n,r,l)),!0;case"gotpointercapture":return o=l.pointerId,Xn.set(o,Gn(Xn.get(o)||null,e,t,n,r,l)),!0}return!1}function ku(e){var t=Zt(e.target);if(t!==null){var n=qt(t);if(n!==null){if(t=n.tag,t===13){if(t=au(n),t!==null){e.blockedOn=t,Su(e.priority,function(){_u(n)});return}}else if(t===3&&n.stateNode.current.memoizedState.isDehydrated){e.blockedOn=n.tag===3?n.stateNode.containerInfo:null;return}}}e.blockedOn=null}function Ar(e){if(e.blockedOn!==null)return!1;for(var t=e.targetContainers;0<t.length;){var n=uo(e.domEventName,e.eventSystemFlags,t[0],e.nativeEvent);if(n===null){n=e.nativeEvent;var r=new n.constructor(n.type,n);Gl=r,n.target.dispatchEvent(r),Gl=null}else return t=sr(n),t!==null&&lo(t),e.blockedOn=n,!1;t.shift()}return!0}function Eu(e,t,n){Ar(e)&&n.delete(t)}function vc(){oo=!1,It!==null&&Ar(It)&&(It=null),Pt!==null&&Ar(Pt)&&(Pt=null),Nt!==null&&Ar(Nt)&&(Nt=null),Qn.forEach(Eu),Xn.forEach(Eu)}function Kn(e,t){e.blockedOn===t&&(e.blockedOn=null,oo||(oo=!0,s.unstable_scheduleCallback(s.unstable_NormalPriority,vc)))}function Yn(e){function t(l){return Kn(l,e)}if(0<Lr.length){Kn(Lr[0],e);for(var n=1;n<Lr.length;n++){var r=Lr[n];r.blockedOn===e&&(r.blockedOn=null)}}for(It!==null&&Kn(It,e),Pt!==null&&Kn(Pt,e),Nt!==null&&Kn(Nt,e),Qn.forEach(t),Xn.forEach(t),n=0;n<Mt.length;n++)r=Mt[n],r.blockedOn===e&&(r.blockedOn=null);for(;0<Mt.length&&(n=Mt[0],n.blockedOn===null);)ku(n),n.blockedOn===null&&Mt.shift()}var hn=ie.ReactCurrentBatchConfig,Or=!0;function gc(e,t,n,r){var l=le,o=hn.transition;hn.transition=null;try{le=1,io(e,t,n,r)}finally{le=l,hn.transition=o}}function yc(e,t,n,r){var l=le,o=hn.transition;hn.transition=null;try{le=4,io(e,t,n,r)}finally{le=l,hn.transition=o}}function io(e,t,n,r){if(Or){var l=uo(e,t,n,r);if(l===null)Eo(e,t,r,jr,n),Cu(e,r);else if(hc(l,e,t,n,r))r.stopPropagation();else if(Cu(e,r),t&4&&-1<mc.indexOf(e)){for(;l!==null;){var o=sr(l);if(o!==null&&xu(o),o=uo(e,t,n,r),o===null&&Eo(e,t,r,jr,n),o===l)break;l=o}l!==null&&r.stopPropagation()}else Eo(e,t,r,null,n)}}var jr=null;function uo(e,t,n,r){if(jr=null,e=Kl(r),e=Zt(e),e!==null)if(t=qt(e),t===null)e=null;else if(n=t.tag,n===13){if(e=au(t),e!==null)return e;e=null}else if(n===3){if(t.stateNode.current.memoizedState.isDehydrated)return t.tag===3?t.stateNode.containerInfo:null;e=null}else t!==e&&(e=null);return jr=e,null}function Tu(e){switch(e){case"cancel":case"click":case"close":case"contextmenu":case"copy":case"cut":case"auxclick":case"dblclick":case"dragend":case"dragstart":case"drop":case"focusin":case"focusout":case"input":case"invalid":case"keydown":case"keypress":case"keyup":case"mousedown":case"mouseup":case"paste":case"pause":case"play":case"pointercancel":case"pointerdown":case"pointerup":case"ratechange":case"reset":case"resize":case"seeked":case"submit":case"touchcancel":case"touchend":case"touchstart":case"volumechange":case"change":case"selectionchange":case"textInput":case"compositionstart":case"compositionend":case"compositionupdate":case"beforeblur":case"afterblur":case"beforeinput":case"blur":case"fullscreenchange":case"focus":case"hashchange":case"popstate":case"select":case"selectstart":return 1;case"drag":case"dragenter":case"dragexit":case"dragleave":case"dragover":case"mousemove":case"mouseout":case"mouseover":case"pointermove":case"pointerout":case"pointerover":case"scroll":case"toggle":case"touchmove":case"wheel":case"mouseenter":case"mouseleave":case"pointerenter":case"pointerleave":return 4;case"message":switch(oc()){case eo:return 1;case hu:return 4;case Pr:case ic:return 16;case vu:return 536870912;default:return 16}default:return 16}}var Dt=null,so=null,Ur=null;function Ru(){if(Ur)return Ur;var e,t=so,n=t.length,r,l="value"in Dt?Dt.value:Dt.textContent,o=l.length;for(e=0;e<n&&t[e]===l[e];e++);var u=n-e;for(r=1;r<=u&&t[n-r]===l[o-r];r++);return Ur=l.slice(e,1<r?1-r:void 0)}function Br(e){var t=e.keyCode;return"charCode"in e?(e=e.charCode,e===0&&t===13&&(e=13)):e=t,e===10&&(e=13),32<=e||e===13?e:0}function Vr(){return!0}function Fu(){return!1}function Ge(e){function t(n,r,l,o,u){this._reactName=n,this._targetInst=l,this.type=r,this.nativeEvent=o,this.target=u,this.currentTarget=null;for(var c in e)e.hasOwnProperty(c)&&(n=e[c],this[c]=n?n(o):o[c]);return this.isDefaultPrevented=(o.defaultPrevented!=null?o.defaultPrevented:o.returnValue===!1)?Vr:Fu,this.isPropagationStopped=Fu,this}return A(t.prototype,{preventDefault:function(){this.defaultPrevented=!0;var n=this.nativeEvent;n&&(n.preventDefault?n.preventDefault():typeof n.returnValue!="unknown"&&(n.returnValue=!1),this.isDefaultPrevented=Vr)},stopPropagation:function(){var n=this.nativeEvent;n&&(n.stopPropagation?n.stopPropagation():typeof n.cancelBubble!="unknown"&&(n.cancelBubble=!0),this.isPropagationStopped=Vr)},persist:function(){},isPersistent:Vr}),t}var vn={eventPhase:0,bubbles:0,cancelable:0,timeStamp:function(e){return e.timeStamp||Date.now()},defaultPrevented:0,isTrusted:0},ao=Ge(vn),qn=A({},vn,{view:0,detail:0}),xc=Ge(qn),co,fo,Zn,Wr=A({},qn,{screenX:0,screenY:0,clientX:0,clientY:0,pageX:0,pageY:0,ctrlKey:0,shiftKey:0,altKey:0,metaKey:0,getModifierState:mo,button:0,buttons:0,relatedTarget:function(e){return e.relatedTarget===void 0?e.fromElement===e.srcElement?e.toElement:e.fromElement:e.relatedTarget},movementX:function(e){return"movementX"in e?e.movementX:(e!==Zn&&(Zn&&e.type==="mousemove"?(co=e.screenX-Zn.screenX,fo=e.screenY-Zn.screenY):fo=co=0,Zn=e),co)},movementY:function(e){return"movementY"in e?e.movementY:fo}}),Iu=Ge(Wr),_c=A({},Wr,{dataTransfer:0}),wc=Ge(_c),Sc=A({},qn,{relatedTarget:0}),po=Ge(Sc),Cc=A({},vn,{animationName:0,elapsedTime:0,pseudoElement:0}),kc=Ge(Cc),Ec=A({},vn,{clipboardData:function(e){return"clipboardData"in e?e.clipboardData:window.clipboardData}}),Tc=Ge(Ec),Rc=A({},vn,{data:0}),Pu=Ge(Rc),Fc={Esc:"Escape",Spacebar:" ",Left:"ArrowLeft",Up:"ArrowUp",Right:"ArrowRight",Down:"ArrowDown",Del:"Delete",Win:"OS",Menu:"ContextMenu",Apps:"ContextMenu",Scroll:"ScrollLock",MozPrintableKey:"Unidentified"},Ic={8:"Backspace",9:"Tab",12:"Clear",13:"Enter",16:"Shift",17:"Control",18:"Alt",19:"Pause",20:"CapsLock",27:"Escape",32:" ",33:"PageUp",34:"PageDown",35:"End",36:"Home",37:"ArrowLeft",38:"ArrowUp",39:"ArrowRight",40:"ArrowDown",45:"Insert",46:"Delete",112:"F1",113:"F2",114:"F3",115:"F4",116:"F5",117:"F6",118:"F7",119:"F8",120:"F9",121:"F10",122:"F11",123:"F12",144:"NumLock",145:"ScrollLock",224:"Meta"},Pc={Alt:"altKey",Control:"ctrlKey",Meta:"metaKey",Shift:"shiftKey"};function Nc(e){var t=this.nativeEvent;return t.getModifierState?t.getModifierState(e):(e=Pc[e])?!!t[e]:!1}function mo(){return Nc}var Mc=A({},qn,{key:function(e){if(e.key){var t=Fc[e.key]||e.key;if(t!=="Unidentified")return t}return e.type==="keypress"?(e=Br(e),e===13?"Enter":String.fromCharCode(e)):e.type==="keydown"||e.type==="keyup"?Ic[e.keyCode]||"Unidentified":""},code:0,location:0,ctrlKey:0,shiftKey:0,altKey:0,metaKey:0,repeat:0,locale:0,getModifierState:mo,charCode:function(e){return e.type==="keypress"?Br(e):0},keyCode:function(e){return e.type==="keydown"||e.type==="keyup"?e.keyCode:0},which:function(e){return e.type==="keypress"?Br(e):e.type==="keydown"||e.type==="keyup"?e.keyCode:0}}),Dc=Ge(Mc),zc=A({},Wr,{pointerId:0,width:0,height:0,pressure:0,tangentialPressure:0,tiltX:0,tiltY:0,twist:0,pointerType:0,isPrimary:0}),Nu=Ge(zc),Lc=A({},qn,{touches:0,targetTouches:0,changedTouches:0,altKey:0,metaKey:0,ctrlKey:0,shiftKey:0,getModifierState:mo}),Ac=Ge(Lc),Oc=A({},vn,{propertyName:0,elapsedTime:0,pseudoElement:0}),jc=Ge(Oc),Uc=A({},Wr,{deltaX:function(e){return"deltaX"in e?e.deltaX:"wheelDeltaX"in e?-e.wheelDeltaX:0},deltaY:function(e){return"deltaY"in e?e.deltaY:"wheelDeltaY"in e?-e.wheelDeltaY:"wheelDelta"in e?-e.wheelDelta:0},deltaZ:0,deltaMode:0}),Bc=Ge(Uc),Vc=[9,13,27,32],ho=S&&"CompositionEvent"in window,Jn=null;S&&"documentMode"in document&&(Jn=document.documentMode);var Wc=S&&"TextEvent"in window&&!Jn,Mu=S&&(!ho||Jn&&8<Jn&&11>=Jn),Du=" ",zu=!1;function Lu(e,t){switch(e){case"keyup":return Vc.indexOf(t.keyCode)!==-1;case"keydown":return t.keyCode!==229;case"keypress":case"mousedown":case"focusout":return!0;default:return!1}}function Au(e){return e=e.detail,typeof e=="object"&&"data"in e?e.data:null}var gn=!1;function bc(e,t){switch(e){case"compositionend":return Au(t);case"keypress":return t.which!==32?null:(zu=!0,Du);case"textInput":return e=t.data,e===Du&&zu?null:e;default:return null}}function Hc(e,t){if(gn)return e==="compositionend"||!ho&&Lu(e,t)?(e=Ru(),Ur=so=Dt=null,gn=!1,e):null;switch(e){case"paste":return null;case"keypress":if(!(t.ctrlKey||t.altKey||t.metaKey)||t.ctrlKey&&t.altKey){if(t.char&&1<t.char.length)return t.char;if(t.which)return String.fromCharCode(t.which)}return null;case"compositionend":return Mu&&t.locale!=="ko"?null:t.data;default:return null}}var $c={color:!0,date:!0,datetime:!0,"datetime-local":!0,email:!0,month:!0,number:!0,password:!0,range:!0,search:!0,tel:!0,text:!0,time:!0,url:!0,week:!0};function Ou(e){var t=e&&e.nodeName&&e.nodeName.toLowerCase();return t==="input"?!!$c[e.type]:t==="textarea"}function ju(e,t,n,r){lu(r),t=Xr(t,"onChange"),0<t.length&&(n=new ao("onChange","change",null,n,r),e.push({event:n,listeners:t}))}var er=null,tr=null;function Qc(e){ns(e,0)}function br(e){var t=Sn(e);if(Qi(t))return e}function Xc(e,t){if(e==="change")return t}var Uu=!1;if(S){var vo;if(S){var go="oninput"in document;if(!go){var Bu=document.createElement("div");Bu.setAttribute("oninput","return;"),go=typeof Bu.oninput=="function"}vo=go}else vo=!1;Uu=vo&&(!document.documentMode||9<document.documentMode)}function Vu(){er&&(er.detachEvent("onpropertychange",Wu),tr=er=null)}function Wu(e){if(e.propertyName==="value"&&br(tr)){var t=[];ju(t,tr,e,Kl(e)),su(Qc,t)}}function Gc(e,t,n){e==="focusin"?(Vu(),er=t,tr=n,er.attachEvent("onpropertychange",Wu)):e==="focusout"&&Vu()}function Kc(e){if(e==="selectionchange"||e==="keyup"||e==="keydown")return br(tr)}function Yc(e,t){if(e==="click")return br(t)}function qc(e,t){if(e==="input"||e==="change")return br(t)}function Zc(e,t){return e===t&&(e!==0||1/e===1/t)||e!==e&&t!==t}var ut=typeof Object.is=="function"?Object.is:Zc;function nr(e,t){if(ut(e,t))return!0;if(typeof e!="object"||e===null||typeof t!="object"||t===null)return!1;var n=Object.keys(e),r=Object.keys(t);if(n.length!==r.length)return!1;for(r=0;r<n.length;r++){var l=n[r];if(!F.call(t,l)||!ut(e[l],t[l]))return!1}return!0}function bu(e){for(;e&&e.firstChild;)e=e.firstChild;return e}function Hu(e,t){var n=bu(e);e=0;for(var r;n;){if(n.nodeType===3){if(r=e+n.textContent.length,e<=t&&r>=t)return{node:n,offset:t-e};e=r}e:{for(;n;){if(n.nextSibling){n=n.nextSibling;break e}n=n.parentNode}n=void 0}n=bu(n)}}function $u(e,t){return e&&t?e===t?!0:e&&e.nodeType===3?!1:t&&t.nodeType===3?$u(e,t.parentNode):"contains"in e?e.contains(t):e.compareDocumentPosition?!!(e.compareDocumentPosition(t)&16):!1:!1}function Qu(){for(var e=window,t=Tr();t instanceof e.HTMLIFrameElement;){try{var n=typeof t.contentWindow.location.href=="string"}catch{n=!1}if(n)e=t.contentWindow;else break;t=Tr(e.document)}return t}function yo(e){var t=e&&e.nodeName&&e.nodeName.toLowerCase();return t&&(t==="input"&&(e.type==="text"||e.type==="search"||e.type==="tel"||e.type==="url"||e.type==="password")||t==="textarea"||e.contentEditable==="true")}function Jc(e){var t=Qu(),n=e.focusedElem,r=e.selectionRange;if(t!==n&&n&&n.ownerDocument&&$u(n.ownerDocument.documentElement,n)){if(r!==null&&yo(n)){if(t=r.start,e=r.end,e===void 0&&(e=t),"selectionStart"in n)n.selectionStart=t,n.selectionEnd=Math.min(e,n.value.length);else if(e=(t=n.ownerDocument||document)&&t.defaultView||window,e.getSelection){e=e.getSelection();var l=n.textContent.length,o=Math.min(r.start,l);r=r.end===void 0?o:Math.min(r.end,l),!e.extend&&o>r&&(l=r,r=o,o=l),l=Hu(n,o);var u=Hu(n,r);l&&u&&(e.rangeCount!==1||e.anchorNode!==l.node||e.anchorOffset!==l.offset||e.focusNode!==u.node||e.focusOffset!==u.offset)&&(t=t.createRange(),t.setStart(l.node,l.offset),e.removeAllRanges(),o>r?(e.addRange(t),e.extend(u.node,u.offset)):(t.setEnd(u.node,u.offset),e.addRange(t)))}}for(t=[],e=n;e=e.parentNode;)e.nodeType===1&&t.push({element:e,left:e.scrollLeft,top:e.scrollTop});for(typeof n.focus=="function"&&n.focus(),n=0;n<t.length;n++)e=t[n],e.element.scrollLeft=e.left,e.element.scrollTop=e.top}}var ef=S&&"documentMode"in document&&11>=document.documentMode,yn=null,xo=null,rr=null,_o=!1;function Xu(e,t,n){var r=n.window===n?n.document:n.nodeType===9?n:n.ownerDocument;_o||yn==null||yn!==Tr(r)||(r=yn,"selectionStart"in r&&yo(r)?r={start:r.selectionStart,end:r.selectionEnd}:(r=(r.ownerDocument&&r.ownerDocument.defaultView||window).getSelection(),r={anchorNode:r.anchorNode,anchorOffset:r.anchorOffset,focusNode:r.focusNode,focusOffset:r.focusOffset}),rr&&nr(rr,r)||(rr=r,r=Xr(xo,"onSelect"),0<r.length&&(t=new ao("onSelect","select",null,t,n),e.push({event:t,listeners:r}),t.target=yn)))}function Hr(e,t){var n={};return n[e.toLowerCase()]=t.toLowerCase(),n["Webkit"+e]="webkit"+t,n["Moz"+e]="moz"+t,n}var xn={animationend:Hr("Animation","AnimationEnd"),animationiteration:Hr("Animation","AnimationIteration"),animationstart:Hr("Animation","AnimationStart"),transitionend:Hr("Transition","TransitionEnd")},wo={},Gu={};S&&(Gu=document.createElement("div").style,"AnimationEvent"in window||(delete xn.animationend.animation,delete xn.animationiteration.animation,delete xn.animationstart.animation),"TransitionEvent"in window||delete xn.transitionend.transition);function $r(e){if(wo[e])return wo[e];if(!xn[e])return e;var t=xn[e],n;for(n in t)if(t.hasOwnProperty(n)&&n in Gu)return wo[e]=t[n];return e}var Ku=$r("animationend"),Yu=$r("animationiteration"),qu=$r("animationstart"),Zu=$r("transitionend"),Ju=new Map,es="abort auxClick cancel canPlay canPlayThrough click close contextMenu copy cut drag dragEnd dragEnter dragExit dragLeave dragOver dragStart drop durationChange emptied encrypted ended error gotPointerCapture input invalid keyDown keyPress keyUp load loadedData loadedMetadata loadStart lostPointerCapture mouseDown mouseMove mouseOut mouseOver mouseUp paste pause play playing pointerCancel pointerDown pointerMove pointerOut pointerOver pointerUp progress rateChange reset resize seeked seeking stalled submit suspend timeUpdate touchCancel touchEnd touchStart volumeChange scroll toggle touchMove waiting wheel".split(" ");function zt(e,t){Ju.set(e,t),h(t,[e])}for(var So=0;So<es.length;So++){var Co=es[So],tf=Co.toLowerCase(),nf=Co[0].toUpperCase()+Co.slice(1);zt(tf,"on"+nf)}zt(Ku,"onAnimationEnd"),zt(Yu,"onAnimationIteration"),zt(qu,"onAnimationStart"),zt("dblclick","onDoubleClick"),zt("focusin","onFocus"),zt("focusout","onBlur"),zt(Zu,"onTransitionEnd"),w("onMouseEnter",["mouseout","mouseover"]),w("onMouseLeave",["mouseout","mouseover"]),w("onPointerEnter",["pointerout","pointerover"]),w("onPointerLeave",["pointerout","pointerover"]),h("onChange","change click focusin focusout input keydown keyup selectionchange".split(" ")),h("onSelect","focusout contextmenu dragend focusin keydown keyup mousedown mouseup selectionchange".split(" ")),h("onBeforeInput",["compositionend","keypress","textInput","paste"]),h("onCompositionEnd","compositionend focusout keydown keypress keyup mousedown".split(" ")),h("onCompositionStart","compositionstart focusout keydown keypress keyup mousedown".split(" ")),h("onCompositionUpdate","compositionupdate focusout keydown keypress keyup mousedown".split(" "));var lr="abort canplay canplaythrough durationchange emptied encrypted ended error loadeddata loadedmetadata loadstart pause play playing progress ratechange resize seeked seeking stalled suspend timeupdate volumechange waiting".split(" "),rf=new Set("cancel close invalid load scroll toggle".split(" ").concat(lr));function ts(e,t,n){var r=e.type||"unknown-event";e.currentTarget=n,tc(r,t,void 0,e),e.currentTarget=null}function ns(e,t){t=(t&4)!==0;for(var n=0;n<e.length;n++){var r=e[n],l=r.event;r=r.listeners;e:{var o=void 0;if(t)for(var u=r.length-1;0<=u;u--){var c=r[u],f=c.instance,_=c.currentTarget;if(c=c.listener,f!==o&&l.isPropagationStopped())break e;ts(l,c,_),o=f}else for(u=0;u<r.length;u++){if(c=r[u],f=c.instance,_=c.currentTarget,c=c.listener,f!==o&&l.isPropagationStopped())break e;ts(l,c,_),o=f}}}if(Ir)throw e=Jl,Ir=!1,Jl=null,e}function fe(e,t){var n=t[No];n===void 0&&(n=t[No]=new Set);var r=e+"__bubble";n.has(r)||(rs(t,e,2,!1),n.add(r))}function ko(e,t,n){var r=0;t&&(r|=4),rs(n,e,r,t)}var Qr="_reactListening"+Math.random().toString(36).slice(2);function or(e){if(!e[Qr]){e[Qr]=!0,a.forEach(function(n){n!=="selectionchange"&&(rf.has(n)||ko(n,!1,e),ko(n,!0,e))});var t=e.nodeType===9?e:e.ownerDocument;t===null||t[Qr]||(t[Qr]=!0,ko("selectionchange",!1,t))}}function rs(e,t,n,r){switch(Tu(t)){case 1:var l=gc;break;case 4:l=yc;break;default:l=io}n=l.bind(null,t,n,e),l=void 0,!Zl||t!=="touchstart"&&t!=="touchmove"&&t!=="wheel"||(l=!0),r?l!==void 0?e.addEventListener(t,n,{capture:!0,passive:l}):e.addEventListener(t,n,!0):l!==void 0?e.addEventListener(t,n,{passive:l}):e.addEventListener(t,n,!1)}function Eo(e,t,n,r,l){var o=r;if((t&1)===0&&(t&2)===0&&r!==null)e:for(;;){if(r===null)return;var u=r.tag;if(u===3||u===4){var c=r.stateNode.containerInfo;if(c===l||c.nodeType===8&&c.parentNode===l)break;if(u===4)for(u=r.return;u!==null;){var f=u.tag;if((f===3||f===4)&&(f=u.stateNode.containerInfo,f===l||f.nodeType===8&&f.parentNode===l))return;u=u.return}for(;c!==null;){if(u=Zt(c),u===null)return;if(f=u.tag,f===5||f===6){r=o=u;continue e}c=c.parentNode}}r=r.return}su(function(){var _=o,E=Kl(n),T=[];e:{var C=Ju.get(e);if(C!==void 0){var z=ao,O=e;switch(e){case"keypress":if(Br(n)===0)break e;case"keydown":case"keyup":z=Dc;break;case"focusin":O="focus",z=po;break;case"focusout":O="blur",z=po;break;case"beforeblur":case"afterblur":z=po;break;case"click":if(n.button===2)break e;case"auxclick":case"dblclick":case"mousedown":case"mousemove":case"mouseup":case"mouseout":case"mouseover":case"contextmenu":z=Iu;break;case"drag":case"dragend":case"dragenter":case"dragexit":case"dragleave":case"dragover":case"dragstart":case"drop":z=wc;break;case"touchcancel":case"touchend":case"touchmove":case"touchstart":z=Ac;break;case Ku:case Yu:case qu:z=kc;break;case Zu:z=jc;break;case"scroll":z=xc;break;case"wheel":z=Bc;break;case"copy":case"cut":case"paste":z=Tc;break;case"gotpointercapture":case"lostpointercapture":case"pointercancel":case"pointerdown":case"pointermove":case"pointerout":case"pointerover":case"pointerup":z=Nu}var j=(t&4)!==0,Se=!j&&e==="scroll",g=j?C!==null?C+"Capture":null:C;j=[];for(var m=_,x;m!==null;){x=m;var I=x.stateNode;if(x.tag===5&&I!==null&&(x=I,g!==null&&(I=Vn(m,g),I!=null&&j.push(ir(m,I,x)))),Se)break;m=m.return}0<j.length&&(C=new z(C,O,null,n,E),T.push({event:C,listeners:j}))}}if((t&7)===0){e:{if(C=e==="mouseover"||e==="pointerover",z=e==="mouseout"||e==="pointerout",C&&n!==Gl&&(O=n.relatedTarget||n.fromElement)&&(Zt(O)||O[wt]))break e;if((z||C)&&(C=E.window===E?E:(C=E.ownerDocument)?C.defaultView||C.parentWindow:window,z?(O=n.relatedTarget||n.toElement,z=_,O=O?Zt(O):null,O!==null&&(Se=qt(O),O!==Se||O.tag!==5&&O.tag!==6)&&(O=null)):(z=null,O=_),z!==O)){if(j=Iu,I="onMouseLeave",g="onMouseEnter",m="mouse",(e==="pointerout"||e==="pointerover")&&(j=Nu,I="onPointerLeave",g="onPointerEnter",m="pointer"),Se=z==null?C:Sn(z),x=O==null?C:Sn(O),C=new j(I,m+"leave",z,n,E),C.target=Se,C.relatedTarget=x,I=null,Zt(E)===_&&(j=new j(g,m+"enter",O,n,E),j.target=x,j.relatedTarget=Se,I=j),Se=I,z&&O)t:{for(j=z,g=O,m=0,x=j;x;x=_n(x))m++;for(x=0,I=g;I;I=_n(I))x++;for(;0<m-x;)j=_n(j),m--;for(;0<x-m;)g=_n(g),x--;for(;m--;){if(j===g||g!==null&&j===g.alternate)break t;j=_n(j),g=_n(g)}j=null}else j=null;z!==null&&ls(T,C,z,j,!1),O!==null&&Se!==null&&ls(T,Se,O,j,!0)}}e:{if(C=_?Sn(_):window,z=C.nodeName&&C.nodeName.toLowerCase(),z==="select"||z==="input"&&C.type==="file")var U=Xc;else if(Ou(C))if(Uu)U=qc;else{U=Kc;var B=Gc}else(z=C.nodeName)&&z.toLowerCase()==="input"&&(C.type==="checkbox"||C.type==="radio")&&(U=Yc);if(U&&(U=U(e,_))){ju(T,U,n,E);break e}B&&B(e,C,_),e==="focusout"&&(B=C._wrapperState)&&B.controlled&&C.type==="number"&&bl(C,"number",C.value)}switch(B=_?Sn(_):window,e){case"focusin":(Ou(B)||B.contentEditable==="true")&&(yn=B,xo=_,rr=null);break;case"focusout":rr=xo=yn=null;break;case"mousedown":_o=!0;break;case"contextmenu":case"mouseup":case"dragend":_o=!1,Xu(T,n,E);break;case"selectionchange":if(ef)break;case"keydown":case"keyup":Xu(T,n,E)}var V;if(ho)e:{switch(e){case"compositionstart":var Q="onCompositionStart";break e;case"compositionend":Q="onCompositionEnd";break e;case"compositionupdate":Q="onCompositionUpdate";break e}Q=void 0}else gn?Lu(e,n)&&(Q="onCompositionEnd"):e==="keydown"&&n.keyCode===229&&(Q="onCompositionStart");Q&&(Mu&&n.locale!=="ko"&&(gn||Q!=="onCompositionStart"?Q==="onCompositionEnd"&&gn&&(V=Ru()):(Dt=E,so="value"in Dt?Dt.value:Dt.textContent,gn=!0)),B=Xr(_,Q),0<B.length&&(Q=new Pu(Q,e,null,n,E),T.push({event:Q,listeners:B}),V?Q.data=V:(V=Au(n),V!==null&&(Q.data=V)))),(V=Wc?bc(e,n):Hc(e,n))&&(_=Xr(_,"onBeforeInput"),0<_.length&&(E=new Pu("onBeforeInput","beforeinput",null,n,E),T.push({event:E,listeners:_}),E.data=V))}ns(T,t)})}function ir(e,t,n){return{instance:e,listener:t,currentTarget:n}}function Xr(e,t){for(var n=t+"Capture",r=[];e!==null;){var l=e,o=l.stateNode;l.tag===5&&o!==null&&(l=o,o=Vn(e,n),o!=null&&r.unshift(ir(e,o,l)),o=Vn(e,t),o!=null&&r.push(ir(e,o,l))),e=e.return}return r}function _n(e){if(e===null)return null;do e=e.return;while(e&&e.tag!==5);return e||null}function ls(e,t,n,r,l){for(var o=t._reactName,u=[];n!==null&&n!==r;){var c=n,f=c.alternate,_=c.stateNode;if(f!==null&&f===r)break;c.tag===5&&_!==null&&(c=_,l?(f=Vn(n,o),f!=null&&u.unshift(ir(n,f,c))):l||(f=Vn(n,o),f!=null&&u.push(ir(n,f,c)))),n=n.return}u.length!==0&&e.push({event:t,listeners:u})}var lf=/\r\n?/g,of=/\u0000|\uFFFD/g;function os(e){return(typeof e=="string"?e:""+e).replace(lf,`
`).replace(of,"")}function Gr(e,t,n){if(t=os(t),os(e)!==t&&n)throw Error(i(425))}function Kr(){}var To=null,Ro=null;function Fo(e,t){return e==="textarea"||e==="noscript"||typeof t.children=="string"||typeof t.children=="number"||typeof t.dangerouslySetInnerHTML=="object"&&t.dangerouslySetInnerHTML!==null&&t.dangerouslySetInnerHTML.__html!=null}var Io=typeof setTimeout=="function"?setTimeout:void 0,uf=typeof clearTimeout=="function"?clearTimeout:void 0,is=typeof Promise=="function"?Promise:void 0,sf=typeof queueMicrotask=="function"?queueMicrotask:typeof is<"u"?function(e){return is.resolve(null).then(e).catch(af)}:Io;function af(e){setTimeout(function(){throw e})}function Po(e,t){var n=t,r=0;do{var l=n.nextSibling;if(e.removeChild(n),l&&l.nodeType===8)if(n=l.data,n==="/$"){if(r===0){e.removeChild(l),Yn(t);return}r--}else n!=="$"&&n!=="$?"&&n!=="$!"||r++;n=l}while(n);Yn(t)}function Lt(e){for(;e!=null;e=e.nextSibling){var t=e.nodeType;if(t===1||t===3)break;if(t===8){if(t=e.data,t==="$"||t==="$!"||t==="$?")break;if(t==="/$")return null}}return e}function us(e){e=e.previousSibling;for(var t=0;e;){if(e.nodeType===8){var n=e.data;if(n==="$"||n==="$!"||n==="$?"){if(t===0)return e;t--}else n==="/$"&&t++}e=e.previousSibling}return null}var wn=Math.random().toString(36).slice(2),vt="__reactFiber$"+wn,ur="__reactProps$"+wn,wt="__reactContainer$"+wn,No="__reactEvents$"+wn,cf="__reactListeners$"+wn,ff="__reactHandles$"+wn;function Zt(e){var t=e[vt];if(t)return t;for(var n=e.parentNode;n;){if(t=n[wt]||n[vt]){if(n=t.alternate,t.child!==null||n!==null&&n.child!==null)for(e=us(e);e!==null;){if(n=e[vt])return n;e=us(e)}return t}e=n,n=e.parentNode}return null}function sr(e){return e=e[vt]||e[wt],!e||e.tag!==5&&e.tag!==6&&e.tag!==13&&e.tag!==3?null:e}function Sn(e){if(e.tag===5||e.tag===6)return e.stateNode;throw Error(i(33))}function Yr(e){return e[ur]||null}var Mo=[],Cn=-1;function At(e){return{current:e}}function de(e){0>Cn||(e.current=Mo[Cn],Mo[Cn]=null,Cn--)}function ae(e,t){Cn++,Mo[Cn]=e.current,e.current=t}var Ot={},Me=At(Ot),Be=At(!1),Jt=Ot;function kn(e,t){var n=e.type.contextTypes;if(!n)return Ot;var r=e.stateNode;if(r&&r.__reactInternalMemoizedUnmaskedChildContext===t)return r.__reactInternalMemoizedMaskedChildContext;var l={},o;for(o in n)l[o]=t[o];return r&&(e=e.stateNode,e.__reactInternalMemoizedUnmaskedChildContext=t,e.__reactInternalMemoizedMaskedChildContext=l),l}function Ve(e){return e=e.childContextTypes,e!=null}function qr(){de(Be),de(Me)}function ss(e,t,n){if(Me.current!==Ot)throw Error(i(168));ae(Me,t),ae(Be,n)}function as(e,t,n){var r=e.stateNode;if(t=t.childContextTypes,typeof r.getChildContext!="function")return n;r=r.getChildContext();for(var l in r)if(!(l in t))throw Error(i(108,se(e)||"Unknown",l));return A({},n,r)}function Zr(e){return e=(e=e.stateNode)&&e.__reactInternalMemoizedMergedChildContext||Ot,Jt=Me.current,ae(Me,e),ae(Be,Be.current),!0}function cs(e,t,n){var r=e.stateNode;if(!r)throw Error(i(169));n?(e=as(e,t,Jt),r.__reactInternalMemoizedMergedChildContext=e,de(Be),de(Me),ae(Me,e)):de(Be),ae(Be,n)}var St=null,Jr=!1,Do=!1;function fs(e){St===null?St=[e]:St.push(e)}function df(e){Jr=!0,fs(e)}function jt(){if(!Do&&St!==null){Do=!0;var e=0,t=le;try{var n=St;for(le=1;e<n.length;e++){var r=n[e];do r=r(!0);while(r!==null)}St=null,Jr=!1}catch(l){throw St!==null&&(St=St.slice(e+1)),pu(eo,jt),l}finally{le=t,Do=!1}}return null}var En=[],Tn=0,el=null,tl=0,Ze=[],Je=0,en=null,Ct=1,kt="";function tn(e,t){En[Tn++]=tl,En[Tn++]=el,el=e,tl=t}function ds(e,t,n){Ze[Je++]=Ct,Ze[Je++]=kt,Ze[Je++]=en,en=e;var r=Ct;e=kt;var l=32-it(r)-1;r&=~(1<<l),n+=1;var o=32-it(t)+l;if(30<o){var u=l-l%5;o=(r&(1<<u)-1).toString(32),r>>=u,l-=u,Ct=1<<32-it(t)+l|n<<l|r,kt=o+e}else Ct=1<<o|n<<l|r,kt=e}function zo(e){e.return!==null&&(tn(e,1),ds(e,1,0))}function Lo(e){for(;e===el;)el=En[--Tn],En[Tn]=null,tl=En[--Tn],En[Tn]=null;for(;e===en;)en=Ze[--Je],Ze[Je]=null,kt=Ze[--Je],Ze[Je]=null,Ct=Ze[--Je],Ze[Je]=null}var Ke=null,Ye=null,me=!1,st=null;function ps(e,t){var n=rt(5,null,null,0);n.elementType="DELETED",n.stateNode=t,n.return=e,t=e.deletions,t===null?(e.deletions=[n],e.flags|=16):t.push(n)}function ms(e,t){switch(e.tag){case 5:var n=e.type;return t=t.nodeType!==1||n.toLowerCase()!==t.nodeName.toLowerCase()?null:t,t!==null?(e.stateNode=t,Ke=e,Ye=Lt(t.firstChild),!0):!1;case 6:return t=e.pendingProps===""||t.nodeType!==3?null:t,t!==null?(e.stateNode=t,Ke=e,Ye=null,!0):!1;case 13:return t=t.nodeType!==8?null:t,t!==null?(n=en!==null?{id:Ct,overflow:kt}:null,e.memoizedState={dehydrated:t,treeContext:n,retryLane:1073741824},n=rt(18,null,null,0),n.stateNode=t,n.return=e,e.child=n,Ke=e,Ye=null,!0):!1;default:return!1}}function Ao(e){return(e.mode&1)!==0&&(e.flags&128)===0}function Oo(e){if(me){var t=Ye;if(t){var n=t;if(!ms(e,t)){if(Ao(e))throw Error(i(418));t=Lt(n.nextSibling);var r=Ke;t&&ms(e,t)?ps(r,n):(e.flags=e.flags&-4097|2,me=!1,Ke=e)}}else{if(Ao(e))throw Error(i(418));e.flags=e.flags&-4097|2,me=!1,Ke=e}}}function hs(e){for(e=e.return;e!==null&&e.tag!==5&&e.tag!==3&&e.tag!==13;)e=e.return;Ke=e}function nl(e){if(e!==Ke)return!1;if(!me)return hs(e),me=!0,!1;var t;if((t=e.tag!==3)&&!(t=e.tag!==5)&&(t=e.type,t=t!=="head"&&t!=="body"&&!Fo(e.type,e.memoizedProps)),t&&(t=Ye)){if(Ao(e))throw vs(),Error(i(418));for(;t;)ps(e,t),t=Lt(t.nextSibling)}if(hs(e),e.tag===13){if(e=e.memoizedState,e=e!==null?e.dehydrated:null,!e)throw Error(i(317));e:{for(e=e.nextSibling,t=0;e;){if(e.nodeType===8){var n=e.data;if(n==="/$"){if(t===0){Ye=Lt(e.nextSibling);break e}t--}else n!=="$"&&n!=="$!"&&n!=="$?"||t++}e=e.nextSibling}Ye=null}}else Ye=Ke?Lt(e.stateNode.nextSibling):null;return!0}function vs(){for(var e=Ye;e;)e=Lt(e.nextSibling)}function Rn(){Ye=Ke=null,me=!1}function jo(e){st===null?st=[e]:st.push(e)}var pf=ie.ReactCurrentBatchConfig;function ar(e,t,n){if(e=n.ref,e!==null&&typeof e!="function"&&typeof e!="object"){if(n._owner){if(n=n._owner,n){if(n.tag!==1)throw Error(i(309));var r=n.stateNode}if(!r)throw Error(i(147,e));var l=r,o=""+e;return t!==null&&t.ref!==null&&typeof t.ref=="function"&&t.ref._stringRef===o?t.ref:(t=function(u){var c=l.refs;u===null?delete c[o]:c[o]=u},t._stringRef=o,t)}if(typeof e!="string")throw Error(i(284));if(!n._owner)throw Error(i(290,e))}return e}function rl(e,t){throw e=Object.prototype.toString.call(t),Error(i(31,e==="[object Object]"?"object with keys {"+Object.keys(t).join(", ")+"}":e))}function gs(e){var t=e._init;return t(e._payload)}function ys(e){function t(g,m){if(e){var x=g.deletions;x===null?(g.deletions=[m],g.flags|=16):x.push(m)}}function n(g,m){if(!e)return null;for(;m!==null;)t(g,m),m=m.sibling;return null}function r(g,m){for(g=new Map;m!==null;)m.key!==null?g.set(m.key,m):g.set(m.index,m),m=m.sibling;return g}function l(g,m){return g=Qt(g,m),g.index=0,g.sibling=null,g}function o(g,m,x){return g.index=x,e?(x=g.alternate,x!==null?(x=x.index,x<m?(g.flags|=2,m):x):(g.flags|=2,m)):(g.flags|=1048576,m)}function u(g){return e&&g.alternate===null&&(g.flags|=2),g}function c(g,m,x,I){return m===null||m.tag!==6?(m=Ii(x,g.mode,I),m.return=g,m):(m=l(m,x),m.return=g,m)}function f(g,m,x,I){var U=x.type;return U===_e?E(g,m,x.props.children,I,x.key):m!==null&&(m.elementType===U||typeof U=="object"&&U!==null&&U.$$typeof===Ue&&gs(U)===m.type)?(I=l(m,x.props),I.ref=ar(g,m,x),I.return=g,I):(I=Rl(x.type,x.key,x.props,null,g.mode,I),I.ref=ar(g,m,x),I.return=g,I)}function _(g,m,x,I){return m===null||m.tag!==4||m.stateNode.containerInfo!==x.containerInfo||m.stateNode.implementation!==x.implementation?(m=Pi(x,g.mode,I),m.return=g,m):(m=l(m,x.children||[]),m.return=g,m)}function E(g,m,x,I,U){return m===null||m.tag!==7?(m=cn(x,g.mode,I,U),m.return=g,m):(m=l(m,x),m.return=g,m)}function T(g,m,x){if(typeof m=="string"&&m!==""||typeof m=="number")return m=Ii(""+m,g.mode,x),m.return=g,m;if(typeof m=="object"&&m!==null){switch(m.$$typeof){case Te:return x=Rl(m.type,m.key,m.props,null,g.mode,x),x.ref=ar(g,null,m),x.return=g,x;case ce:return m=Pi(m,g.mode,x),m.return=g,m;case Ue:var I=m._init;return T(g,I(m._payload),x)}if(jn(m)||H(m))return m=cn(m,g.mode,x,null),m.return=g,m;rl(g,m)}return null}function C(g,m,x,I){var U=m!==null?m.key:null;if(typeof x=="string"&&x!==""||typeof x=="number")return U!==null?null:c(g,m,""+x,I);if(typeof x=="object"&&x!==null){switch(x.$$typeof){case Te:return x.key===U?f(g,m,x,I):null;case ce:return x.key===U?_(g,m,x,I):null;case Ue:return U=x._init,C(g,m,U(x._payload),I)}if(jn(x)||H(x))return U!==null?null:E(g,m,x,I,null);rl(g,x)}return null}function z(g,m,x,I,U){if(typeof I=="string"&&I!==""||typeof I=="number")return g=g.get(x)||null,c(m,g,""+I,U);if(typeof I=="object"&&I!==null){switch(I.$$typeof){case Te:return g=g.get(I.key===null?x:I.key)||null,f(m,g,I,U);case ce:return g=g.get(I.key===null?x:I.key)||null,_(m,g,I,U);case Ue:var B=I._init;return z(g,m,x,B(I._payload),U)}if(jn(I)||H(I))return g=g.get(x)||null,E(m,g,I,U,null);rl(m,I)}return null}function O(g,m,x,I){for(var U=null,B=null,V=m,Q=m=0,Ie=null;V!==null&&Q<x.length;Q++){V.index>Q?(Ie=V,V=null):Ie=V.sibling;var ne=C(g,V,x[Q],I);if(ne===null){V===null&&(V=Ie);break}e&&V&&ne.alternate===null&&t(g,V),m=o(ne,m,Q),B===null?U=ne:B.sibling=ne,B=ne,V=Ie}if(Q===x.length)return n(g,V),me&&tn(g,Q),U;if(V===null){for(;Q<x.length;Q++)V=T(g,x[Q],I),V!==null&&(m=o(V,m,Q),B===null?U=V:B.sibling=V,B=V);return me&&tn(g,Q),U}for(V=r(g,V);Q<x.length;Q++)Ie=z(V,g,Q,x[Q],I),Ie!==null&&(e&&Ie.alternate!==null&&V.delete(Ie.key===null?Q:Ie.key),m=o(Ie,m,Q),B===null?U=Ie:B.sibling=Ie,B=Ie);return e&&V.forEach(function(Xt){return t(g,Xt)}),me&&tn(g,Q),U}function j(g,m,x,I){var U=H(x);if(typeof U!="function")throw Error(i(150));if(x=U.call(x),x==null)throw Error(i(151));for(var B=U=null,V=m,Q=m=0,Ie=null,ne=x.next();V!==null&&!ne.done;Q++,ne=x.next()){V.index>Q?(Ie=V,V=null):Ie=V.sibling;var Xt=C(g,V,ne.value,I);if(Xt===null){V===null&&(V=Ie);break}e&&V&&Xt.alternate===null&&t(g,V),m=o(Xt,m,Q),B===null?U=Xt:B.sibling=Xt,B=Xt,V=Ie}if(ne.done)return n(g,V),me&&tn(g,Q),U;if(V===null){for(;!ne.done;Q++,ne=x.next())ne=T(g,ne.value,I),ne!==null&&(m=o(ne,m,Q),B===null?U=ne:B.sibling=ne,B=ne);return me&&tn(g,Q),U}for(V=r(g,V);!ne.done;Q++,ne=x.next())ne=z(V,g,Q,ne.value,I),ne!==null&&(e&&ne.alternate!==null&&V.delete(ne.key===null?Q:ne.key),m=o(ne,m,Q),B===null?U=ne:B.sibling=ne,B=ne);return e&&V.forEach(function(Qf){return t(g,Qf)}),me&&tn(g,Q),U}function Se(g,m,x,I){if(typeof x=="object"&&x!==null&&x.type===_e&&x.key===null&&(x=x.props.children),typeof x=="object"&&x!==null){switch(x.$$typeof){case Te:e:{for(var U=x.key,B=m;B!==null;){if(B.key===U){if(U=x.type,U===_e){if(B.tag===7){n(g,B.sibling),m=l(B,x.props.children),m.return=g,g=m;break e}}else if(B.elementType===U||typeof U=="object"&&U!==null&&U.$$typeof===Ue&&gs(U)===B.type){n(g,B.sibling),m=l(B,x.props),m.ref=ar(g,B,x),m.return=g,g=m;break e}n(g,B);break}else t(g,B);B=B.sibling}x.type===_e?(m=cn(x.props.children,g.mode,I,x.key),m.return=g,g=m):(I=Rl(x.type,x.key,x.props,null,g.mode,I),I.ref=ar(g,m,x),I.return=g,g=I)}return u(g);case ce:e:{for(B=x.key;m!==null;){if(m.key===B)if(m.tag===4&&m.stateNode.containerInfo===x.containerInfo&&m.stateNode.implementation===x.implementation){n(g,m.sibling),m=l(m,x.children||[]),m.return=g,g=m;break e}else{n(g,m);break}else t(g,m);m=m.sibling}m=Pi(x,g.mode,I),m.return=g,g=m}return u(g);case Ue:return B=x._init,Se(g,m,B(x._payload),I)}if(jn(x))return O(g,m,x,I);if(H(x))return j(g,m,x,I);rl(g,x)}return typeof x=="string"&&x!==""||typeof x=="number"?(x=""+x,m!==null&&m.tag===6?(n(g,m.sibling),m=l(m,x),m.return=g,g=m):(n(g,m),m=Ii(x,g.mode,I),m.return=g,g=m),u(g)):n(g,m)}return Se}var Fn=ys(!0),xs=ys(!1),ll=At(null),ol=null,In=null,Uo=null;function Bo(){Uo=In=ol=null}function Vo(e){var t=ll.current;de(ll),e._currentValue=t}function Wo(e,t,n){for(;e!==null;){var r=e.alternate;if((e.childLanes&t)!==t?(e.childLanes|=t,r!==null&&(r.childLanes|=t)):r!==null&&(r.childLanes&t)!==t&&(r.childLanes|=t),e===n)break;e=e.return}}function Pn(e,t){ol=e,Uo=In=null,e=e.dependencies,e!==null&&e.firstContext!==null&&((e.lanes&t)!==0&&(We=!0),e.firstContext=null)}function et(e){var t=e._currentValue;if(Uo!==e)if(e={context:e,memoizedValue:t,next:null},In===null){if(ol===null)throw Error(i(308));In=e,ol.dependencies={lanes:0,firstContext:e}}else In=In.next=e;return t}var nn=null;function bo(e){nn===null?nn=[e]:nn.push(e)}function _s(e,t,n,r){var l=t.interleaved;return l===null?(n.next=n,bo(t)):(n.next=l.next,l.next=n),t.interleaved=n,Et(e,r)}function Et(e,t){e.lanes|=t;var n=e.alternate;for(n!==null&&(n.lanes|=t),n=e,e=e.return;e!==null;)e.childLanes|=t,n=e.alternate,n!==null&&(n.childLanes|=t),n=e,e=e.return;return n.tag===3?n.stateNode:null}var Ut=!1;function Ho(e){e.updateQueue={baseState:e.memoizedState,firstBaseUpdate:null,lastBaseUpdate:null,shared:{pending:null,interleaved:null,lanes:0},effects:null}}function ws(e,t){e=e.updateQueue,t.updateQueue===e&&(t.updateQueue={baseState:e.baseState,firstBaseUpdate:e.firstBaseUpdate,lastBaseUpdate:e.lastBaseUpdate,shared:e.shared,effects:e.effects})}function Tt(e,t){return{eventTime:e,lane:t,tag:0,payload:null,callback:null,next:null}}function Bt(e,t,n){var r=e.updateQueue;if(r===null)return null;if(r=r.shared,(J&2)!==0){var l=r.pending;return l===null?t.next=t:(t.next=l.next,l.next=t),r.pending=t,Et(e,n)}return l=r.interleaved,l===null?(t.next=t,bo(r)):(t.next=l.next,l.next=t),r.interleaved=t,Et(e,n)}function il(e,t,n){if(t=t.updateQueue,t!==null&&(t=t.shared,(n&4194240)!==0)){var r=t.lanes;r&=e.pendingLanes,n|=r,t.lanes=n,ro(e,n)}}function Ss(e,t){var n=e.updateQueue,r=e.alternate;if(r!==null&&(r=r.updateQueue,n===r)){var l=null,o=null;if(n=n.firstBaseUpdate,n!==null){do{var u={eventTime:n.eventTime,lane:n.lane,tag:n.tag,payload:n.payload,callback:n.callback,next:null};o===null?l=o=u:o=o.next=u,n=n.next}while(n!==null);o===null?l=o=t:o=o.next=t}else l=o=t;n={baseState:r.baseState,firstBaseUpdate:l,lastBaseUpdate:o,shared:r.shared,effects:r.effects},e.updateQueue=n;return}e=n.lastBaseUpdate,e===null?n.firstBaseUpdate=t:e.next=t,n.lastBaseUpdate=t}function ul(e,t,n,r){var l=e.updateQueue;Ut=!1;var o=l.firstBaseUpdate,u=l.lastBaseUpdate,c=l.shared.pending;if(c!==null){l.shared.pending=null;var f=c,_=f.next;f.next=null,u===null?o=_:u.next=_,u=f;var E=e.alternate;E!==null&&(E=E.updateQueue,c=E.lastBaseUpdate,c!==u&&(c===null?E.firstBaseUpdate=_:c.next=_,E.lastBaseUpdate=f))}if(o!==null){var T=l.baseState;u=0,E=_=f=null,c=o;do{var C=c.lane,z=c.eventTime;if((r&C)===C){E!==null&&(E=E.next={eventTime:z,lane:0,tag:c.tag,payload:c.payload,callback:c.callback,next:null});e:{var O=e,j=c;switch(C=t,z=n,j.tag){case 1:if(O=j.payload,typeof O=="function"){T=O.call(z,T,C);break e}T=O;break e;case 3:O.flags=O.flags&-65537|128;case 0:if(O=j.payload,C=typeof O=="function"?O.call(z,T,C):O,C==null)break e;T=A({},T,C);break e;case 2:Ut=!0}}c.callback!==null&&c.lane!==0&&(e.flags|=64,C=l.effects,C===null?l.effects=[c]:C.push(c))}else z={eventTime:z,lane:C,tag:c.tag,payload:c.payload,callback:c.callback,next:null},E===null?(_=E=z,f=T):E=E.next=z,u|=C;if(c=c.next,c===null){if(c=l.shared.pending,c===null)break;C=c,c=C.next,C.next=null,l.lastBaseUpdate=C,l.shared.pending=null}}while(!0);if(E===null&&(f=T),l.baseState=f,l.firstBaseUpdate=_,l.lastBaseUpdate=E,t=l.shared.interleaved,t!==null){l=t;do u|=l.lane,l=l.next;while(l!==t)}else o===null&&(l.shared.lanes=0);on|=u,e.lanes=u,e.memoizedState=T}}function Cs(e,t,n){if(e=t.effects,t.effects=null,e!==null)for(t=0;t<e.length;t++){var r=e[t],l=r.callback;if(l!==null){if(r.callback=null,r=n,typeof l!="function")throw Error(i(191,l));l.call(r)}}}var cr={},gt=At(cr),fr=At(cr),dr=At(cr);function rn(e){if(e===cr)throw Error(i(174));return e}function $o(e,t){switch(ae(dr,t),ae(fr,e),ae(gt,cr),e=t.nodeType,e){case 9:case 11:t=(t=t.documentElement)?t.namespaceURI:$l(null,"");break;default:e=e===8?t.parentNode:t,t=e.namespaceURI||null,e=e.tagName,t=$l(t,e)}de(gt),ae(gt,t)}function Nn(){de(gt),de(fr),de(dr)}function ks(e){rn(dr.current);var t=rn(gt.current),n=$l(t,e.type);t!==n&&(ae(fr,e),ae(gt,n))}function Qo(e){fr.current===e&&(de(gt),de(fr))}var he=At(0);function sl(e){for(var t=e;t!==null;){if(t.tag===13){var n=t.memoizedState;if(n!==null&&(n=n.dehydrated,n===null||n.data==="$?"||n.data==="$!"))return t}else if(t.tag===19&&t.memoizedProps.revealOrder!==void 0){if((t.flags&128)!==0)return t}else if(t.child!==null){t.child.return=t,t=t.child;continue}if(t===e)break;for(;t.sibling===null;){if(t.return===null||t.return===e)return null;t=t.return}t.sibling.return=t.return,t=t.sibling}return null}var Xo=[];function Go(){for(var e=0;e<Xo.length;e++)Xo[e]._workInProgressVersionPrimary=null;Xo.length=0}var al=ie.ReactCurrentDispatcher,Ko=ie.ReactCurrentBatchConfig,ln=0,ve=null,ke=null,Re=null,cl=!1,pr=!1,mr=0,mf=0;function De(){throw Error(i(321))}function Yo(e,t){if(t===null)return!1;for(var n=0;n<t.length&&n<e.length;n++)if(!ut(e[n],t[n]))return!1;return!0}function qo(e,t,n,r,l,o){if(ln=o,ve=t,t.memoizedState=null,t.updateQueue=null,t.lanes=0,al.current=e===null||e.memoizedState===null?yf:xf,e=n(r,l),pr){o=0;do{if(pr=!1,mr=0,25<=o)throw Error(i(301));o+=1,Re=ke=null,t.updateQueue=null,al.current=_f,e=n(r,l)}while(pr)}if(al.current=pl,t=ke!==null&&ke.next!==null,ln=0,Re=ke=ve=null,cl=!1,t)throw Error(i(300));return e}function Zo(){var e=mr!==0;return mr=0,e}function yt(){var e={memoizedState:null,baseState:null,baseQueue:null,queue:null,next:null};return Re===null?ve.memoizedState=Re=e:Re=Re.next=e,Re}function tt(){if(ke===null){var e=ve.alternate;e=e!==null?e.memoizedState:null}else e=ke.next;var t=Re===null?ve.memoizedState:Re.next;if(t!==null)Re=t,ke=e;else{if(e===null)throw Error(i(310));ke=e,e={memoizedState:ke.memoizedState,baseState:ke.baseState,baseQueue:ke.baseQueue,queue:ke.queue,next:null},Re===null?ve.memoizedState=Re=e:Re=Re.next=e}return Re}function hr(e,t){return typeof t=="function"?t(e):t}function Jo(e){var t=tt(),n=t.queue;if(n===null)throw Error(i(311));n.lastRenderedReducer=e;var r=ke,l=r.baseQueue,o=n.pending;if(o!==null){if(l!==null){var u=l.next;l.next=o.next,o.next=u}r.baseQueue=l=o,n.pending=null}if(l!==null){o=l.next,r=r.baseState;var c=u=null,f=null,_=o;do{var E=_.lane;if((ln&E)===E)f!==null&&(f=f.next={lane:0,action:_.action,hasEagerState:_.hasEagerState,eagerState:_.eagerState,next:null}),r=_.hasEagerState?_.eagerState:e(r,_.action);else{var T={lane:E,action:_.action,hasEagerState:_.hasEagerState,eagerState:_.eagerState,next:null};f===null?(c=f=T,u=r):f=f.next=T,ve.lanes|=E,on|=E}_=_.next}while(_!==null&&_!==o);f===null?u=r:f.next=c,ut(r,t.memoizedState)||(We=!0),t.memoizedState=r,t.baseState=u,t.baseQueue=f,n.lastRenderedState=r}if(e=n.interleaved,e!==null){l=e;do o=l.lane,ve.lanes|=o,on|=o,l=l.next;while(l!==e)}else l===null&&(n.lanes=0);return[t.memoizedState,n.dispatch]}function ei(e){var t=tt(),n=t.queue;if(n===null)throw Error(i(311));n.lastRenderedReducer=e;var r=n.dispatch,l=n.pending,o=t.memoizedState;if(l!==null){n.pending=null;var u=l=l.next;do o=e(o,u.action),u=u.next;while(u!==l);ut(o,t.memoizedState)||(We=!0),t.memoizedState=o,t.baseQueue===null&&(t.baseState=o),n.lastRenderedState=o}return[o,r]}function Es(){}function Ts(e,t){var n=ve,r=tt(),l=t(),o=!ut(r.memoizedState,l);if(o&&(r.memoizedState=l,We=!0),r=r.queue,ti(Is.bind(null,n,r,e),[e]),r.getSnapshot!==t||o||Re!==null&&Re.memoizedState.tag&1){if(n.flags|=2048,vr(9,Fs.bind(null,n,r,l,t),void 0,null),Fe===null)throw Error(i(349));(ln&30)!==0||Rs(n,t,l)}return l}function Rs(e,t,n){e.flags|=16384,e={getSnapshot:t,value:n},t=ve.updateQueue,t===null?(t={lastEffect:null,stores:null},ve.updateQueue=t,t.stores=[e]):(n=t.stores,n===null?t.stores=[e]:n.push(e))}function Fs(e,t,n,r){t.value=n,t.getSnapshot=r,Ps(t)&&Ns(e)}function Is(e,t,n){return n(function(){Ps(t)&&Ns(e)})}function Ps(e){var t=e.getSnapshot;e=e.value;try{var n=t();return!ut(e,n)}catch{return!0}}function Ns(e){var t=Et(e,1);t!==null&&dt(t,e,1,-1)}function Ms(e){var t=yt();return typeof e=="function"&&(e=e()),t.memoizedState=t.baseState=e,e={pending:null,interleaved:null,lanes:0,dispatch:null,lastRenderedReducer:hr,lastRenderedState:e},t.queue=e,e=e.dispatch=gf.bind(null,ve,e),[t.memoizedState,e]}function vr(e,t,n,r){return e={tag:e,create:t,destroy:n,deps:r,next:null},t=ve.updateQueue,t===null?(t={lastEffect:null,stores:null},ve.updateQueue=t,t.lastEffect=e.next=e):(n=t.lastEffect,n===null?t.lastEffect=e.next=e:(r=n.next,n.next=e,e.next=r,t.lastEffect=e)),e}function Ds(){return tt().memoizedState}function fl(e,t,n,r){var l=yt();ve.flags|=e,l.memoizedState=vr(1|t,n,void 0,r===void 0?null:r)}function dl(e,t,n,r){var l=tt();r=r===void 0?null:r;var o=void 0;if(ke!==null){var u=ke.memoizedState;if(o=u.destroy,r!==null&&Yo(r,u.deps)){l.memoizedState=vr(t,n,o,r);return}}ve.flags|=e,l.memoizedState=vr(1|t,n,o,r)}function zs(e,t){return fl(8390656,8,e,t)}function ti(e,t){return dl(2048,8,e,t)}function Ls(e,t){return dl(4,2,e,t)}function As(e,t){return dl(4,4,e,t)}function Os(e,t){if(typeof t=="function")return e=e(),t(e),function(){t(null)};if(t!=null)return e=e(),t.current=e,function(){t.current=null}}function js(e,t,n){return n=n!=null?n.concat([e]):null,dl(4,4,Os.bind(null,t,e),n)}function ni(){}function Us(e,t){var n=tt();t=t===void 0?null:t;var r=n.memoizedState;return r!==null&&t!==null&&Yo(t,r[1])?r[0]:(n.memoizedState=[e,t],e)}function Bs(e,t){var n=tt();t=t===void 0?null:t;var r=n.memoizedState;return r!==null&&t!==null&&Yo(t,r[1])?r[0]:(e=e(),n.memoizedState=[e,t],e)}function Vs(e,t,n){return(ln&21)===0?(e.baseState&&(e.baseState=!1,We=!0),e.memoizedState=n):(ut(n,t)||(n=gu(),ve.lanes|=n,on|=n,e.baseState=!0),t)}function hf(e,t){var n=le;le=n!==0&&4>n?n:4,e(!0);var r=Ko.transition;Ko.transition={};try{e(!1),t()}finally{le=n,Ko.transition=r}}function Ws(){return tt().memoizedState}function vf(e,t,n){var r=Ht(e);if(n={lane:r,action:n,hasEagerState:!1,eagerState:null,next:null},bs(e))Hs(t,n);else if(n=_s(e,t,n,r),n!==null){var l=je();dt(n,e,r,l),$s(n,t,r)}}function gf(e,t,n){var r=Ht(e),l={lane:r,action:n,hasEagerState:!1,eagerState:null,next:null};if(bs(e))Hs(t,l);else{var o=e.alternate;if(e.lanes===0&&(o===null||o.lanes===0)&&(o=t.lastRenderedReducer,o!==null))try{var u=t.lastRenderedState,c=o(u,n);if(l.hasEagerState=!0,l.eagerState=c,ut(c,u)){var f=t.interleaved;f===null?(l.next=l,bo(t)):(l.next=f.next,f.next=l),t.interleaved=l;return}}catch{}finally{}n=_s(e,t,l,r),n!==null&&(l=je(),dt(n,e,r,l),$s(n,t,r))}}function bs(e){var t=e.alternate;return e===ve||t!==null&&t===ve}function Hs(e,t){pr=cl=!0;var n=e.pending;n===null?t.next=t:(t.next=n.next,n.next=t),e.pending=t}function $s(e,t,n){if((n&4194240)!==0){var r=t.lanes;r&=e.pendingLanes,n|=r,t.lanes=n,ro(e,n)}}var pl={readContext:et,useCallback:De,useContext:De,useEffect:De,useImperativeHandle:De,useInsertionEffect:De,useLayoutEffect:De,useMemo:De,useReducer:De,useRef:De,useState:De,useDebugValue:De,useDeferredValue:De,useTransition:De,useMutableSource:De,useSyncExternalStore:De,useId:De,unstable_isNewReconciler:!1},yf={readContext:et,useCallback:function(e,t){return yt().memoizedState=[e,t===void 0?null:t],e},useContext:et,useEffect:zs,useImperativeHandle:function(e,t,n){return n=n!=null?n.concat([e]):null,fl(4194308,4,Os.bind(null,t,e),n)},useLayoutEffect:function(e,t){return fl(4194308,4,e,t)},useInsertionEffect:function(e,t){return fl(4,2,e,t)},useMemo:function(e,t){var n=yt();return t=t===void 0?null:t,e=e(),n.memoizedState=[e,t],e},useReducer:function(e,t,n){var r=yt();return t=n!==void 0?n(t):t,r.memoizedState=r.baseState=t,e={pending:null,interleaved:null,lanes:0,dispatch:null,lastRenderedReducer:e,lastRenderedState:t},r.queue=e,e=e.dispatch=vf.bind(null,ve,e),[r.memoizedState,e]},useRef:function(e){var t=yt();return e={current:e},t.memoizedState=e},useState:Ms,useDebugValue:ni,useDeferredValue:function(e){return yt().memoizedState=e},useTransition:function(){var e=Ms(!1),t=e[0];return e=hf.bind(null,e[1]),yt().memoizedState=e,[t,e]},useMutableSource:function(){},useSyncExternalStore:function(e,t,n){var r=ve,l=yt();if(me){if(n===void 0)throw Error(i(407));n=n()}else{if(n=t(),Fe===null)throw Error(i(349));(ln&30)!==0||Rs(r,t,n)}l.memoizedState=n;var o={value:n,getSnapshot:t};return l.queue=o,zs(Is.bind(null,r,o,e),[e]),r.flags|=2048,vr(9,Fs.bind(null,r,o,n,t),void 0,null),n},useId:function(){var e=yt(),t=Fe.identifierPrefix;if(me){var n=kt,r=Ct;n=(r&~(1<<32-it(r)-1)).toString(32)+n,t=":"+t+"R"+n,n=mr++,0<n&&(t+="H"+n.toString(32)),t+=":"}else n=mf++,t=":"+t+"r"+n.toString(32)+":";return e.memoizedState=t},unstable_isNewReconciler:!1},xf={readContext:et,useCallback:Us,useContext:et,useEffect:ti,useImperativeHandle:js,useInsertionEffect:Ls,useLayoutEffect:As,useMemo:Bs,useReducer:Jo,useRef:Ds,useState:function(){return Jo(hr)},useDebugValue:ni,useDeferredValue:function(e){var t=tt();return Vs(t,ke.memoizedState,e)},useTransition:function(){var e=Jo(hr)[0],t=tt().memoizedState;return[e,t]},useMutableSource:Es,useSyncExternalStore:Ts,useId:Ws,unstable_isNewReconciler:!1},_f={readContext:et,useCallback:Us,useContext:et,useEffect:ti,useImperativeHandle:js,useInsertionEffect:Ls,useLayoutEffect:As,useMemo:Bs,useReducer:ei,useRef:Ds,useState:function(){return ei(hr)},useDebugValue:ni,useDeferredValue:function(e){var t=tt();return ke===null?t.memoizedState=e:Vs(t,ke.memoizedState,e)},useTransition:function(){var e=ei(hr)[0],t=tt().memoizedState;return[e,t]},useMutableSource:Es,useSyncExternalStore:Ts,useId:Ws,unstable_isNewReconciler:!1};function at(e,t){if(e&&e.defaultProps){t=A({},t),e=e.defaultProps;for(var n in e)t[n]===void 0&&(t[n]=e[n]);return t}return t}function ri(e,t,n,r){t=e.memoizedState,n=n(r,t),n=n==null?t:A({},t,n),e.memoizedState=n,e.lanes===0&&(e.updateQueue.baseState=n)}var ml={isMounted:function(e){return(e=e._reactInternals)?qt(e)===e:!1},enqueueSetState:function(e,t,n){e=e._reactInternals;var r=je(),l=Ht(e),o=Tt(r,l);o.payload=t,n!=null&&(o.callback=n),t=Bt(e,o,l),t!==null&&(dt(t,e,l,r),il(t,e,l))},enqueueReplaceState:function(e,t,n){e=e._reactInternals;var r=je(),l=Ht(e),o=Tt(r,l);o.tag=1,o.payload=t,n!=null&&(o.callback=n),t=Bt(e,o,l),t!==null&&(dt(t,e,l,r),il(t,e,l))},enqueueForceUpdate:function(e,t){e=e._reactInternals;var n=je(),r=Ht(e),l=Tt(n,r);l.tag=2,t!=null&&(l.callback=t),t=Bt(e,l,r),t!==null&&(dt(t,e,r,n),il(t,e,r))}};function Qs(e,t,n,r,l,o,u){return e=e.stateNode,typeof e.shouldComponentUpdate=="function"?e.shouldComponentUpdate(r,o,u):t.prototype&&t.prototype.isPureReactComponent?!nr(n,r)||!nr(l,o):!0}function Xs(e,t,n){var r=!1,l=Ot,o=t.contextType;return typeof o=="object"&&o!==null?o=et(o):(l=Ve(t)?Jt:Me.current,r=t.contextTypes,o=(r=r!=null)?kn(e,l):Ot),t=new t(n,o),e.memoizedState=t.state!==null&&t.state!==void 0?t.state:null,t.updater=ml,e.stateNode=t,t._reactInternals=e,r&&(e=e.stateNode,e.__reactInternalMemoizedUnmaskedChildContext=l,e.__reactInternalMemoizedMaskedChildContext=o),t}function Gs(e,t,n,r){e=t.state,typeof t.componentWillReceiveProps=="function"&&t.componentWillReceiveProps(n,r),typeof t.UNSAFE_componentWillReceiveProps=="function"&&t.UNSAFE_componentWillReceiveProps(n,r),t.state!==e&&ml.enqueueReplaceState(t,t.state,null)}function li(e,t,n,r){var l=e.stateNode;l.props=n,l.state=e.memoizedState,l.refs={},Ho(e);var o=t.contextType;typeof o=="object"&&o!==null?l.context=et(o):(o=Ve(t)?Jt:Me.current,l.context=kn(e,o)),l.state=e.memoizedState,o=t.getDerivedStateFromProps,typeof o=="function"&&(ri(e,t,o,n),l.state=e.memoizedState),typeof t.getDerivedStateFromProps=="function"||typeof l.getSnapshotBeforeUpdate=="function"||typeof l.UNSAFE_componentWillMount!="function"&&typeof l.componentWillMount!="function"||(t=l.state,typeof l.componentWillMount=="function"&&l.componentWillMount(),typeof l.UNSAFE_componentWillMount=="function"&&l.UNSAFE_componentWillMount(),t!==l.state&&ml.enqueueReplaceState(l,l.state,null),ul(e,n,l,r),l.state=e.memoizedState),typeof l.componentDidMount=="function"&&(e.flags|=4194308)}function Mn(e,t){try{var n="",r=t;do n+=ee(r),r=r.return;while(r);var l=n}catch(o){l=`
Error generating stack: `+o.message+`
`+o.stack}return{value:e,source:t,stack:l,digest:null}}function oi(e,t,n){return{value:e,source:null,stack:n??null,digest:t??null}}function ii(e,t){try{console.error(t.value)}catch(n){setTimeout(function(){throw n})}}var wf=typeof WeakMap=="function"?WeakMap:Map;function Ks(e,t,n){n=Tt(-1,n),n.tag=3,n.payload={element:null};var r=t.value;return n.callback=function(){wl||(wl=!0,wi=r),ii(e,t)},n}function Ys(e,t,n){n=Tt(-1,n),n.tag=3;var r=e.type.getDerivedStateFromError;if(typeof r=="function"){var l=t.value;n.payload=function(){return r(l)},n.callback=function(){ii(e,t)}}var o=e.stateNode;return o!==null&&typeof o.componentDidCatch=="function"&&(n.callback=function(){ii(e,t),typeof r!="function"&&(Wt===null?Wt=new Set([this]):Wt.add(this));var u=t.stack;this.componentDidCatch(t.value,{componentStack:u!==null?u:""})}),n}function qs(e,t,n){var r=e.pingCache;if(r===null){r=e.pingCache=new wf;var l=new Set;r.set(t,l)}else l=r.get(t),l===void 0&&(l=new Set,r.set(t,l));l.has(n)||(l.add(n),e=Lf.bind(null,e,t,n),t.then(e,e))}function Zs(e){do{var t;if((t=e.tag===13)&&(t=e.memoizedState,t=t!==null?t.dehydrated!==null:!0),t)return e;e=e.return}while(e!==null);return null}function Js(e,t,n,r,l){return(e.mode&1)===0?(e===t?e.flags|=65536:(e.flags|=128,n.flags|=131072,n.flags&=-52805,n.tag===1&&(n.alternate===null?n.tag=17:(t=Tt(-1,1),t.tag=2,Bt(n,t,1))),n.lanes|=1),e):(e.flags|=65536,e.lanes=l,e)}var Sf=ie.ReactCurrentOwner,We=!1;function Oe(e,t,n,r){t.child=e===null?xs(t,null,n,r):Fn(t,e.child,n,r)}function ea(e,t,n,r,l){n=n.render;var o=t.ref;return Pn(t,l),r=qo(e,t,n,r,o,l),n=Zo(),e!==null&&!We?(t.updateQueue=e.updateQueue,t.flags&=-2053,e.lanes&=~l,Rt(e,t,l)):(me&&n&&zo(t),t.flags|=1,Oe(e,t,r,l),t.child)}function ta(e,t,n,r,l){if(e===null){var o=n.type;return typeof o=="function"&&!Fi(o)&&o.defaultProps===void 0&&n.compare===null&&n.defaultProps===void 0?(t.tag=15,t.type=o,na(e,t,o,r,l)):(e=Rl(n.type,null,r,t,t.mode,l),e.ref=t.ref,e.return=t,t.child=e)}if(o=e.child,(e.lanes&l)===0){var u=o.memoizedProps;if(n=n.compare,n=n!==null?n:nr,n(u,r)&&e.ref===t.ref)return Rt(e,t,l)}return t.flags|=1,e=Qt(o,r),e.ref=t.ref,e.return=t,t.child=e}function na(e,t,n,r,l){if(e!==null){var o=e.memoizedProps;if(nr(o,r)&&e.ref===t.ref)if(We=!1,t.pendingProps=r=o,(e.lanes&l)!==0)(e.flags&131072)!==0&&(We=!0);else return t.lanes=e.lanes,Rt(e,t,l)}return ui(e,t,n,r,l)}function ra(e,t,n){var r=t.pendingProps,l=r.children,o=e!==null?e.memoizedState:null;if(r.mode==="hidden")if((t.mode&1)===0)t.memoizedState={baseLanes:0,cachePool:null,transitions:null},ae(zn,qe),qe|=n;else{if((n&1073741824)===0)return e=o!==null?o.baseLanes|n:n,t.lanes=t.childLanes=1073741824,t.memoizedState={baseLanes:e,cachePool:null,transitions:null},t.updateQueue=null,ae(zn,qe),qe|=e,null;t.memoizedState={baseLanes:0,cachePool:null,transitions:null},r=o!==null?o.baseLanes:n,ae(zn,qe),qe|=r}else o!==null?(r=o.baseLanes|n,t.memoizedState=null):r=n,ae(zn,qe),qe|=r;return Oe(e,t,l,n),t.child}function la(e,t){var n=t.ref;(e===null&&n!==null||e!==null&&e.ref!==n)&&(t.flags|=512,t.flags|=2097152)}function ui(e,t,n,r,l){var o=Ve(n)?Jt:Me.current;return o=kn(t,o),Pn(t,l),n=qo(e,t,n,r,o,l),r=Zo(),e!==null&&!We?(t.updateQueue=e.updateQueue,t.flags&=-2053,e.lanes&=~l,Rt(e,t,l)):(me&&r&&zo(t),t.flags|=1,Oe(e,t,n,l),t.child)}function oa(e,t,n,r,l){if(Ve(n)){var o=!0;Zr(t)}else o=!1;if(Pn(t,l),t.stateNode===null)vl(e,t),Xs(t,n,r),li(t,n,r,l),r=!0;else if(e===null){var u=t.stateNode,c=t.memoizedProps;u.props=c;var f=u.context,_=n.contextType;typeof _=="object"&&_!==null?_=et(_):(_=Ve(n)?Jt:Me.current,_=kn(t,_));var E=n.getDerivedStateFromProps,T=typeof E=="function"||typeof u.getSnapshotBeforeUpdate=="function";T||typeof u.UNSAFE_componentWillReceiveProps!="function"&&typeof u.componentWillReceiveProps!="function"||(c!==r||f!==_)&&Gs(t,u,r,_),Ut=!1;var C=t.memoizedState;u.state=C,ul(t,r,u,l),f=t.memoizedState,c!==r||C!==f||Be.current||Ut?(typeof E=="function"&&(ri(t,n,E,r),f=t.memoizedState),(c=Ut||Qs(t,n,c,r,C,f,_))?(T||typeof u.UNSAFE_componentWillMount!="function"&&typeof u.componentWillMount!="function"||(typeof u.componentWillMount=="function"&&u.componentWillMount(),typeof u.UNSAFE_componentWillMount=="function"&&u.UNSAFE_componentWillMount()),typeof u.componentDidMount=="function"&&(t.flags|=4194308)):(typeof u.componentDidMount=="function"&&(t.flags|=4194308),t.memoizedProps=r,t.memoizedState=f),u.props=r,u.state=f,u.context=_,r=c):(typeof u.componentDidMount=="function"&&(t.flags|=4194308),r=!1)}else{u=t.stateNode,ws(e,t),c=t.memoizedProps,_=t.type===t.elementType?c:at(t.type,c),u.props=_,T=t.pendingProps,C=u.context,f=n.contextType,typeof f=="object"&&f!==null?f=et(f):(f=Ve(n)?Jt:Me.current,f=kn(t,f));var z=n.getDerivedStateFromProps;(E=typeof z=="function"||typeof u.getSnapshotBeforeUpdate=="function")||typeof u.UNSAFE_componentWillReceiveProps!="function"&&typeof u.componentWillReceiveProps!="function"||(c!==T||C!==f)&&Gs(t,u,r,f),Ut=!1,C=t.memoizedState,u.state=C,ul(t,r,u,l);var O=t.memoizedState;c!==T||C!==O||Be.current||Ut?(typeof z=="function"&&(ri(t,n,z,r),O=t.memoizedState),(_=Ut||Qs(t,n,_,r,C,O,f)||!1)?(E||typeof u.UNSAFE_componentWillUpdate!="function"&&typeof u.componentWillUpdate!="function"||(typeof u.componentWillUpdate=="function"&&u.componentWillUpdate(r,O,f),typeof u.UNSAFE_componentWillUpdate=="function"&&u.UNSAFE_componentWillUpdate(r,O,f)),typeof u.componentDidUpdate=="function"&&(t.flags|=4),typeof u.getSnapshotBeforeUpdate=="function"&&(t.flags|=1024)):(typeof u.componentDidUpdate!="function"||c===e.memoizedProps&&C===e.memoizedState||(t.flags|=4),typeof u.getSnapshotBeforeUpdate!="function"||c===e.memoizedProps&&C===e.memoizedState||(t.flags|=1024),t.memoizedProps=r,t.memoizedState=O),u.props=r,u.state=O,u.context=f,r=_):(typeof u.componentDidUpdate!="function"||c===e.memoizedProps&&C===e.memoizedState||(t.flags|=4),typeof u.getSnapshotBeforeUpdate!="function"||c===e.memoizedProps&&C===e.memoizedState||(t.flags|=1024),r=!1)}return si(e,t,n,r,o,l)}function si(e,t,n,r,l,o){la(e,t);var u=(t.flags&128)!==0;if(!r&&!u)return l&&cs(t,n,!1),Rt(e,t,o);r=t.stateNode,Sf.current=t;var c=u&&typeof n.getDerivedStateFromError!="function"?null:r.render();return t.flags|=1,e!==null&&u?(t.child=Fn(t,e.child,null,o),t.child=Fn(t,null,c,o)):Oe(e,t,c,o),t.memoizedState=r.state,l&&cs(t,n,!0),t.child}function ia(e){var t=e.stateNode;t.pendingContext?ss(e,t.pendingContext,t.pendingContext!==t.context):t.context&&ss(e,t.context,!1),$o(e,t.containerInfo)}function ua(e,t,n,r,l){return Rn(),jo(l),t.flags|=256,Oe(e,t,n,r),t.child}var ai={dehydrated:null,treeContext:null,retryLane:0};function ci(e){return{baseLanes:e,cachePool:null,transitions:null}}function sa(e,t,n){var r=t.pendingProps,l=he.current,o=!1,u=(t.flags&128)!==0,c;if((c=u)||(c=e!==null&&e.memoizedState===null?!1:(l&2)!==0),c?(o=!0,t.flags&=-129):(e===null||e.memoizedState!==null)&&(l|=1),ae(he,l&1),e===null)return Oo(t),e=t.memoizedState,e!==null&&(e=e.dehydrated,e!==null)?((t.mode&1)===0?t.lanes=1:e.data==="$!"?t.lanes=8:t.lanes=1073741824,null):(u=r.children,e=r.fallback,o?(r=t.mode,o=t.child,u={mode:"hidden",children:u},(r&1)===0&&o!==null?(o.childLanes=0,o.pendingProps=u):o=Fl(u,r,0,null),e=cn(e,r,n,null),o.return=t,e.return=t,o.sibling=e,t.child=o,t.child.memoizedState=ci(n),t.memoizedState=ai,e):fi(t,u));if(l=e.memoizedState,l!==null&&(c=l.dehydrated,c!==null))return Cf(e,t,u,r,c,l,n);if(o){o=r.fallback,u=t.mode,l=e.child,c=l.sibling;var f={mode:"hidden",children:r.children};return(u&1)===0&&t.child!==l?(r=t.child,r.childLanes=0,r.pendingProps=f,t.deletions=null):(r=Qt(l,f),r.subtreeFlags=l.subtreeFlags&14680064),c!==null?o=Qt(c,o):(o=cn(o,u,n,null),o.flags|=2),o.return=t,r.return=t,r.sibling=o,t.child=r,r=o,o=t.child,u=e.child.memoizedState,u=u===null?ci(n):{baseLanes:u.baseLanes|n,cachePool:null,transitions:u.transitions},o.memoizedState=u,o.childLanes=e.childLanes&~n,t.memoizedState=ai,r}return o=e.child,e=o.sibling,r=Qt(o,{mode:"visible",children:r.children}),(t.mode&1)===0&&(r.lanes=n),r.return=t,r.sibling=null,e!==null&&(n=t.deletions,n===null?(t.deletions=[e],t.flags|=16):n.push(e)),t.child=r,t.memoizedState=null,r}function fi(e,t){return t=Fl({mode:"visible",children:t},e.mode,0,null),t.return=e,e.child=t}function hl(e,t,n,r){return r!==null&&jo(r),Fn(t,e.child,null,n),e=fi(t,t.pendingProps.children),e.flags|=2,t.memoizedState=null,e}function Cf(e,t,n,r,l,o,u){if(n)return t.flags&256?(t.flags&=-257,r=oi(Error(i(422))),hl(e,t,u,r)):t.memoizedState!==null?(t.child=e.child,t.flags|=128,null):(o=r.fallback,l=t.mode,r=Fl({mode:"visible",children:r.children},l,0,null),o=cn(o,l,u,null),o.flags|=2,r.return=t,o.return=t,r.sibling=o,t.child=r,(t.mode&1)!==0&&Fn(t,e.child,null,u),t.child.memoizedState=ci(u),t.memoizedState=ai,o);if((t.mode&1)===0)return hl(e,t,u,null);if(l.data==="$!"){if(r=l.nextSibling&&l.nextSibling.dataset,r)var c=r.dgst;return r=c,o=Error(i(419)),r=oi(o,r,void 0),hl(e,t,u,r)}if(c=(u&e.childLanes)!==0,We||c){if(r=Fe,r!==null){switch(u&-u){case 4:l=2;break;case 16:l=8;break;case 64:case 128:case 256:case 512:case 1024:case 2048:case 4096:case 8192:case 16384:case 32768:case 65536:case 131072:case 262144:case 524288:case 1048576:case 2097152:case 4194304:case 8388608:case 16777216:case 33554432:case 67108864:l=32;break;case 536870912:l=268435456;break;default:l=0}l=(l&(r.suspendedLanes|u))!==0?0:l,l!==0&&l!==o.retryLane&&(o.retryLane=l,Et(e,l),dt(r,e,l,-1))}return Ri(),r=oi(Error(i(421))),hl(e,t,u,r)}return l.data==="$?"?(t.flags|=128,t.child=e.child,t=Af.bind(null,e),l._reactRetry=t,null):(e=o.treeContext,Ye=Lt(l.nextSibling),Ke=t,me=!0,st=null,e!==null&&(Ze[Je++]=Ct,Ze[Je++]=kt,Ze[Je++]=en,Ct=e.id,kt=e.overflow,en=t),t=fi(t,r.children),t.flags|=4096,t)}function aa(e,t,n){e.lanes|=t;var r=e.alternate;r!==null&&(r.lanes|=t),Wo(e.return,t,n)}function di(e,t,n,r,l){var o=e.memoizedState;o===null?e.memoizedState={isBackwards:t,rendering:null,renderingStartTime:0,last:r,tail:n,tailMode:l}:(o.isBackwards=t,o.rendering=null,o.renderingStartTime=0,o.last=r,o.tail=n,o.tailMode=l)}function ca(e,t,n){var r=t.pendingProps,l=r.revealOrder,o=r.tail;if(Oe(e,t,r.children,n),r=he.current,(r&2)!==0)r=r&1|2,t.flags|=128;else{if(e!==null&&(e.flags&128)!==0)e:for(e=t.child;e!==null;){if(e.tag===13)e.memoizedState!==null&&aa(e,n,t);else if(e.tag===19)aa(e,n,t);else if(e.child!==null){e.child.return=e,e=e.child;continue}if(e===t)break e;for(;e.sibling===null;){if(e.return===null||e.return===t)break e;e=e.return}e.sibling.return=e.return,e=e.sibling}r&=1}if(ae(he,r),(t.mode&1)===0)t.memoizedState=null;else switch(l){case"forwards":for(n=t.child,l=null;n!==null;)e=n.alternate,e!==null&&sl(e)===null&&(l=n),n=n.sibling;n=l,n===null?(l=t.child,t.child=null):(l=n.sibling,n.sibling=null),di(t,!1,l,n,o);break;case"backwards":for(n=null,l=t.child,t.child=null;l!==null;){if(e=l.alternate,e!==null&&sl(e)===null){t.child=l;break}e=l.sibling,l.sibling=n,n=l,l=e}di(t,!0,n,null,o);break;case"together":di(t,!1,null,null,void 0);break;default:t.memoizedState=null}return t.child}function vl(e,t){(t.mode&1)===0&&e!==null&&(e.alternate=null,t.alternate=null,t.flags|=2)}function Rt(e,t,n){if(e!==null&&(t.dependencies=e.dependencies),on|=t.lanes,(n&t.childLanes)===0)return null;if(e!==null&&t.child!==e.child)throw Error(i(153));if(t.child!==null){for(e=t.child,n=Qt(e,e.pendingProps),t.child=n,n.return=t;e.sibling!==null;)e=e.sibling,n=n.sibling=Qt(e,e.pendingProps),n.return=t;n.sibling=null}return t.child}function kf(e,t,n){switch(t.tag){case 3:ia(t),Rn();break;case 5:ks(t);break;case 1:Ve(t.type)&&Zr(t);break;case 4:$o(t,t.stateNode.containerInfo);break;case 10:var r=t.type._context,l=t.memoizedProps.value;ae(ll,r._currentValue),r._currentValue=l;break;case 13:if(r=t.memoizedState,r!==null)return r.dehydrated!==null?(ae(he,he.current&1),t.flags|=128,null):(n&t.child.childLanes)!==0?sa(e,t,n):(ae(he,he.current&1),e=Rt(e,t,n),e!==null?e.sibling:null);ae(he,he.current&1);break;case 19:if(r=(n&t.childLanes)!==0,(e.flags&128)!==0){if(r)return ca(e,t,n);t.flags|=128}if(l=t.memoizedState,l!==null&&(l.rendering=null,l.tail=null,l.lastEffect=null),ae(he,he.current),r)break;return null;case 22:case 23:return t.lanes=0,ra(e,t,n)}return Rt(e,t,n)}var fa,pi,da,pa;fa=function(e,t){for(var n=t.child;n!==null;){if(n.tag===5||n.tag===6)e.appendChild(n.stateNode);else if(n.tag!==4&&n.child!==null){n.child.return=n,n=n.child;continue}if(n===t)break;for(;n.sibling===null;){if(n.return===null||n.return===t)return;n=n.return}n.sibling.return=n.return,n=n.sibling}},pi=function(){},da=function(e,t,n,r){var l=e.memoizedProps;if(l!==r){e=t.stateNode,rn(gt.current);var o=null;switch(n){case"input":l=Vl(e,l),r=Vl(e,r),o=[];break;case"select":l=A({},l,{value:void 0}),r=A({},r,{value:void 0}),o=[];break;case"textarea":l=Hl(e,l),r=Hl(e,r),o=[];break;default:typeof l.onClick!="function"&&typeof r.onClick=="function"&&(e.onclick=Kr)}Ql(n,r);var u;n=null;for(_ in l)if(!r.hasOwnProperty(_)&&l.hasOwnProperty(_)&&l[_]!=null)if(_==="style"){var c=l[_];for(u in c)c.hasOwnProperty(u)&&(n||(n={}),n[u]="")}else _!=="dangerouslySetInnerHTML"&&_!=="children"&&_!=="suppressContentEditableWarning"&&_!=="suppressHydrationWarning"&&_!=="autoFocus"&&(p.hasOwnProperty(_)?o||(o=[]):(o=o||[]).push(_,null));for(_ in r){var f=r[_];if(c=l!=null?l[_]:void 0,r.hasOwnProperty(_)&&f!==c&&(f!=null||c!=null))if(_==="style")if(c){for(u in c)!c.hasOwnProperty(u)||f&&f.hasOwnProperty(u)||(n||(n={}),n[u]="");for(u in f)f.hasOwnProperty(u)&&c[u]!==f[u]&&(n||(n={}),n[u]=f[u])}else n||(o||(o=[]),o.push(_,n)),n=f;else _==="dangerouslySetInnerHTML"?(f=f?f.__html:void 0,c=c?c.__html:void 0,f!=null&&c!==f&&(o=o||[]).push(_,f)):_==="children"?typeof f!="string"&&typeof f!="number"||(o=o||[]).push(_,""+f):_!=="suppressContentEditableWarning"&&_!=="suppressHydrationWarning"&&(p.hasOwnProperty(_)?(f!=null&&_==="onScroll"&&fe("scroll",e),o||c===f||(o=[])):(o=o||[]).push(_,f))}n&&(o=o||[]).push("style",n);var _=o;(t.updateQueue=_)&&(t.flags|=4)}},pa=function(e,t,n,r){n!==r&&(t.flags|=4)};function gr(e,t){if(!me)switch(e.tailMode){case"hidden":t=e.tail;for(var n=null;t!==null;)t.alternate!==null&&(n=t),t=t.sibling;n===null?e.tail=null:n.sibling=null;break;case"collapsed":n=e.tail;for(var r=null;n!==null;)n.alternate!==null&&(r=n),n=n.sibling;r===null?t||e.tail===null?e.tail=null:e.tail.sibling=null:r.sibling=null}}function ze(e){var t=e.alternate!==null&&e.alternate.child===e.child,n=0,r=0;if(t)for(var l=e.child;l!==null;)n|=l.lanes|l.childLanes,r|=l.subtreeFlags&14680064,r|=l.flags&14680064,l.return=e,l=l.sibling;else for(l=e.child;l!==null;)n|=l.lanes|l.childLanes,r|=l.subtreeFlags,r|=l.flags,l.return=e,l=l.sibling;return e.subtreeFlags|=r,e.childLanes=n,t}function Ef(e,t,n){var r=t.pendingProps;switch(Lo(t),t.tag){case 2:case 16:case 15:case 0:case 11:case 7:case 8:case 12:case 9:case 14:return ze(t),null;case 1:return Ve(t.type)&&qr(),ze(t),null;case 3:return r=t.stateNode,Nn(),de(Be),de(Me),Go(),r.pendingContext&&(r.context=r.pendingContext,r.pendingContext=null),(e===null||e.child===null)&&(nl(t)?t.flags|=4:e===null||e.memoizedState.isDehydrated&&(t.flags&256)===0||(t.flags|=1024,st!==null&&(ki(st),st=null))),pi(e,t),ze(t),null;case 5:Qo(t);var l=rn(dr.current);if(n=t.type,e!==null&&t.stateNode!=null)da(e,t,n,r,l),e.ref!==t.ref&&(t.flags|=512,t.flags|=2097152);else{if(!r){if(t.stateNode===null)throw Error(i(166));return ze(t),null}if(e=rn(gt.current),nl(t)){r=t.stateNode,n=t.type;var o=t.memoizedProps;switch(r[vt]=t,r[ur]=o,e=(t.mode&1)!==0,n){case"dialog":fe("cancel",r),fe("close",r);break;case"iframe":case"object":case"embed":fe("load",r);break;case"video":case"audio":for(l=0;l<lr.length;l++)fe(lr[l],r);break;case"source":fe("error",r);break;case"img":case"image":case"link":fe("error",r),fe("load",r);break;case"details":fe("toggle",r);break;case"input":Xi(r,o),fe("invalid",r);break;case"select":r._wrapperState={wasMultiple:!!o.multiple},fe("invalid",r);break;case"textarea":Yi(r,o),fe("invalid",r)}Ql(n,o),l=null;for(var u in o)if(o.hasOwnProperty(u)){var c=o[u];u==="children"?typeof c=="string"?r.textContent!==c&&(o.suppressHydrationWarning!==!0&&Gr(r.textContent,c,e),l=["children",c]):typeof c=="number"&&r.textContent!==""+c&&(o.suppressHydrationWarning!==!0&&Gr(r.textContent,c,e),l=["children",""+c]):p.hasOwnProperty(u)&&c!=null&&u==="onScroll"&&fe("scroll",r)}switch(n){case"input":Er(r),Ki(r,o,!0);break;case"textarea":Er(r),Zi(r);break;case"select":case"option":break;default:typeof o.onClick=="function"&&(r.onclick=Kr)}r=l,t.updateQueue=r,r!==null&&(t.flags|=4)}else{u=l.nodeType===9?l:l.ownerDocument,e==="http://www.w3.org/1999/xhtml"&&(e=Ji(n)),e==="http://www.w3.org/1999/xhtml"?n==="script"?(e=u.createElement("div"),e.innerHTML="<script><\/script>",e=e.removeChild(e.firstChild)):typeof r.is=="string"?e=u.createElement(n,{is:r.is}):(e=u.createElement(n),n==="select"&&(u=e,r.multiple?u.multiple=!0:r.size&&(u.size=r.size))):e=u.createElementNS(e,n),e[vt]=t,e[ur]=r,fa(e,t,!1,!1),t.stateNode=e;e:{switch(u=Xl(n,r),n){case"dialog":fe("cancel",e),fe("close",e),l=r;break;case"iframe":case"object":case"embed":fe("load",e),l=r;break;case"video":case"audio":for(l=0;l<lr.length;l++)fe(lr[l],e);l=r;break;case"source":fe("error",e),l=r;break;case"img":case"image":case"link":fe("error",e),fe("load",e),l=r;break;case"details":fe("toggle",e),l=r;break;case"input":Xi(e,r),l=Vl(e,r),fe("invalid",e);break;case"option":l=r;break;case"select":e._wrapperState={wasMultiple:!!r.multiple},l=A({},r,{value:void 0}),fe("invalid",e);break;case"textarea":Yi(e,r),l=Hl(e,r),fe("invalid",e);break;default:l=r}Ql(n,l),c=l;for(o in c)if(c.hasOwnProperty(o)){var f=c[o];o==="style"?nu(e,f):o==="dangerouslySetInnerHTML"?(f=f?f.__html:void 0,f!=null&&eu(e,f)):o==="children"?typeof f=="string"?(n!=="textarea"||f!=="")&&Un(e,f):typeof f=="number"&&Un(e,""+f):o!=="suppressContentEditableWarning"&&o!=="suppressHydrationWarning"&&o!=="autoFocus"&&(p.hasOwnProperty(o)?f!=null&&o==="onScroll"&&fe("scroll",e):f!=null&&ge(e,o,f,u))}switch(n){case"input":Er(e),Ki(e,r,!1);break;case"textarea":Er(e),Zi(e);break;case"option":r.value!=null&&e.setAttribute("value",""+re(r.value));break;case"select":e.multiple=!!r.multiple,o=r.value,o!=null?dn(e,!!r.multiple,o,!1):r.defaultValue!=null&&dn(e,!!r.multiple,r.defaultValue,!0);break;default:typeof l.onClick=="function"&&(e.onclick=Kr)}switch(n){case"button":case"input":case"select":case"textarea":r=!!r.autoFocus;break e;case"img":r=!0;break e;default:r=!1}}r&&(t.flags|=4)}t.ref!==null&&(t.flags|=512,t.flags|=2097152)}return ze(t),null;case 6:if(e&&t.stateNode!=null)pa(e,t,e.memoizedProps,r);else{if(typeof r!="string"&&t.stateNode===null)throw Error(i(166));if(n=rn(dr.current),rn(gt.current),nl(t)){if(r=t.stateNode,n=t.memoizedProps,r[vt]=t,(o=r.nodeValue!==n)&&(e=Ke,e!==null))switch(e.tag){case 3:Gr(r.nodeValue,n,(e.mode&1)!==0);break;case 5:e.memoizedProps.suppressHydrationWarning!==!0&&Gr(r.nodeValue,n,(e.mode&1)!==0)}o&&(t.flags|=4)}else r=(n.nodeType===9?n:n.ownerDocument).createTextNode(r),r[vt]=t,t.stateNode=r}return ze(t),null;case 13:if(de(he),r=t.memoizedState,e===null||e.memoizedState!==null&&e.memoizedState.dehydrated!==null){if(me&&Ye!==null&&(t.mode&1)!==0&&(t.flags&128)===0)vs(),Rn(),t.flags|=98560,o=!1;else if(o=nl(t),r!==null&&r.dehydrated!==null){if(e===null){if(!o)throw Error(i(318));if(o=t.memoizedState,o=o!==null?o.dehydrated:null,!o)throw Error(i(317));o[vt]=t}else Rn(),(t.flags&128)===0&&(t.memoizedState=null),t.flags|=4;ze(t),o=!1}else st!==null&&(ki(st),st=null),o=!0;if(!o)return t.flags&65536?t:null}return(t.flags&128)!==0?(t.lanes=n,t):(r=r!==null,r!==(e!==null&&e.memoizedState!==null)&&r&&(t.child.flags|=8192,(t.mode&1)!==0&&(e===null||(he.current&1)!==0?Ee===0&&(Ee=3):Ri())),t.updateQueue!==null&&(t.flags|=4),ze(t),null);case 4:return Nn(),pi(e,t),e===null&&or(t.stateNode.containerInfo),ze(t),null;case 10:return Vo(t.type._context),ze(t),null;case 17:return Ve(t.type)&&qr(),ze(t),null;case 19:if(de(he),o=t.memoizedState,o===null)return ze(t),null;if(r=(t.flags&128)!==0,u=o.rendering,u===null)if(r)gr(o,!1);else{if(Ee!==0||e!==null&&(e.flags&128)!==0)for(e=t.child;e!==null;){if(u=sl(e),u!==null){for(t.flags|=128,gr(o,!1),r=u.updateQueue,r!==null&&(t.updateQueue=r,t.flags|=4),t.subtreeFlags=0,r=n,n=t.child;n!==null;)o=n,e=r,o.flags&=14680066,u=o.alternate,u===null?(o.childLanes=0,o.lanes=e,o.child=null,o.subtreeFlags=0,o.memoizedProps=null,o.memoizedState=null,o.updateQueue=null,o.dependencies=null,o.stateNode=null):(o.childLanes=u.childLanes,o.lanes=u.lanes,o.child=u.child,o.subtreeFlags=0,o.deletions=null,o.memoizedProps=u.memoizedProps,o.memoizedState=u.memoizedState,o.updateQueue=u.updateQueue,o.type=u.type,e=u.dependencies,o.dependencies=e===null?null:{lanes:e.lanes,firstContext:e.firstContext}),n=n.sibling;return ae(he,he.current&1|2),t.child}e=e.sibling}o.tail!==null&&we()>Ln&&(t.flags|=128,r=!0,gr(o,!1),t.lanes=4194304)}else{if(!r)if(e=sl(u),e!==null){if(t.flags|=128,r=!0,n=e.updateQueue,n!==null&&(t.updateQueue=n,t.flags|=4),gr(o,!0),o.tail===null&&o.tailMode==="hidden"&&!u.alternate&&!me)return ze(t),null}else 2*we()-o.renderingStartTime>Ln&&n!==1073741824&&(t.flags|=128,r=!0,gr(o,!1),t.lanes=4194304);o.isBackwards?(u.sibling=t.child,t.child=u):(n=o.last,n!==null?n.sibling=u:t.child=u,o.last=u)}return o.tail!==null?(t=o.tail,o.rendering=t,o.tail=t.sibling,o.renderingStartTime=we(),t.sibling=null,n=he.current,ae(he,r?n&1|2:n&1),t):(ze(t),null);case 22:case 23:return Ti(),r=t.memoizedState!==null,e!==null&&e.memoizedState!==null!==r&&(t.flags|=8192),r&&(t.mode&1)!==0?(qe&1073741824)!==0&&(ze(t),t.subtreeFlags&6&&(t.flags|=8192)):ze(t),null;case 24:return null;case 25:return null}throw Error(i(156,t.tag))}function Tf(e,t){switch(Lo(t),t.tag){case 1:return Ve(t.type)&&qr(),e=t.flags,e&65536?(t.flags=e&-65537|128,t):null;case 3:return Nn(),de(Be),de(Me),Go(),e=t.flags,(e&65536)!==0&&(e&128)===0?(t.flags=e&-65537|128,t):null;case 5:return Qo(t),null;case 13:if(de(he),e=t.memoizedState,e!==null&&e.dehydrated!==null){if(t.alternate===null)throw Error(i(340));Rn()}return e=t.flags,e&65536?(t.flags=e&-65537|128,t):null;case 19:return de(he),null;case 4:return Nn(),null;case 10:return Vo(t.type._context),null;case 22:case 23:return Ti(),null;case 24:return null;default:return null}}var gl=!1,Le=!1,Rf=typeof WeakSet=="function"?WeakSet:Set,L=null;function Dn(e,t){var n=e.ref;if(n!==null)if(typeof n=="function")try{n(null)}catch(r){xe(e,t,r)}else n.current=null}function mi(e,t,n){try{n()}catch(r){xe(e,t,r)}}var ma=!1;function Ff(e,t){if(To=Or,e=Qu(),yo(e)){if("selectionStart"in e)var n={start:e.selectionStart,end:e.selectionEnd};else e:{n=(n=e.ownerDocument)&&n.defaultView||window;var r=n.getSelection&&n.getSelection();if(r&&r.rangeCount!==0){n=r.anchorNode;var l=r.anchorOffset,o=r.focusNode;r=r.focusOffset;try{n.nodeType,o.nodeType}catch{n=null;break e}var u=0,c=-1,f=-1,_=0,E=0,T=e,C=null;t:for(;;){for(var z;T!==n||l!==0&&T.nodeType!==3||(c=u+l),T!==o||r!==0&&T.nodeType!==3||(f=u+r),T.nodeType===3&&(u+=T.nodeValue.length),(z=T.firstChild)!==null;)C=T,T=z;for(;;){if(T===e)break t;if(C===n&&++_===l&&(c=u),C===o&&++E===r&&(f=u),(z=T.nextSibling)!==null)break;T=C,C=T.parentNode}T=z}n=c===-1||f===-1?null:{start:c,end:f}}else n=null}n=n||{start:0,end:0}}else n=null;for(Ro={focusedElem:e,selectionRange:n},Or=!1,L=t;L!==null;)if(t=L,e=t.child,(t.subtreeFlags&1028)!==0&&e!==null)e.return=t,L=e;else for(;L!==null;){t=L;try{var O=t.alternate;if((t.flags&1024)!==0)switch(t.tag){case 0:case 11:case 15:break;case 1:if(O!==null){var j=O.memoizedProps,Se=O.memoizedState,g=t.stateNode,m=g.getSnapshotBeforeUpdate(t.elementType===t.type?j:at(t.type,j),Se);g.__reactInternalSnapshotBeforeUpdate=m}break;case 3:var x=t.stateNode.containerInfo;x.nodeType===1?x.textContent="":x.nodeType===9&&x.documentElement&&x.removeChild(x.documentElement);break;case 5:case 6:case 4:case 17:break;default:throw Error(i(163))}}catch(I){xe(t,t.return,I)}if(e=t.sibling,e!==null){e.return=t.return,L=e;break}L=t.return}return O=ma,ma=!1,O}function yr(e,t,n){var r=t.updateQueue;if(r=r!==null?r.lastEffect:null,r!==null){var l=r=r.next;do{if((l.tag&e)===e){var o=l.destroy;l.destroy=void 0,o!==void 0&&mi(t,n,o)}l=l.next}while(l!==r)}}function yl(e,t){if(t=t.updateQueue,t=t!==null?t.lastEffect:null,t!==null){var n=t=t.next;do{if((n.tag&e)===e){var r=n.create;n.destroy=r()}n=n.next}while(n!==t)}}function hi(e){var t=e.ref;if(t!==null){var n=e.stateNode;switch(e.tag){case 5:e=n;break;default:e=n}typeof t=="function"?t(e):t.current=e}}function ha(e){var t=e.alternate;t!==null&&(e.alternate=null,ha(t)),e.child=null,e.deletions=null,e.sibling=null,e.tag===5&&(t=e.stateNode,t!==null&&(delete t[vt],delete t[ur],delete t[No],delete t[cf],delete t[ff])),e.stateNode=null,e.return=null,e.dependencies=null,e.memoizedProps=null,e.memoizedState=null,e.pendingProps=null,e.stateNode=null,e.updateQueue=null}function va(e){return e.tag===5||e.tag===3||e.tag===4}function ga(e){e:for(;;){for(;e.sibling===null;){if(e.return===null||va(e.return))return null;e=e.return}for(e.sibling.return=e.return,e=e.sibling;e.tag!==5&&e.tag!==6&&e.tag!==18;){if(e.flags&2||e.child===null||e.tag===4)continue e;e.child.return=e,e=e.child}if(!(e.flags&2))return e.stateNode}}function vi(e,t,n){var r=e.tag;if(r===5||r===6)e=e.stateNode,t?n.nodeType===8?n.parentNode.insertBefore(e,t):n.insertBefore(e,t):(n.nodeType===8?(t=n.parentNode,t.insertBefore(e,n)):(t=n,t.appendChild(e)),n=n._reactRootContainer,n!=null||t.onclick!==null||(t.onclick=Kr));else if(r!==4&&(e=e.child,e!==null))for(vi(e,t,n),e=e.sibling;e!==null;)vi(e,t,n),e=e.sibling}function gi(e,t,n){var r=e.tag;if(r===5||r===6)e=e.stateNode,t?n.insertBefore(e,t):n.appendChild(e);else if(r!==4&&(e=e.child,e!==null))for(gi(e,t,n),e=e.sibling;e!==null;)gi(e,t,n),e=e.sibling}var Pe=null,ct=!1;function Vt(e,t,n){for(n=n.child;n!==null;)ya(e,t,n),n=n.sibling}function ya(e,t,n){if(ht&&typeof ht.onCommitFiberUnmount=="function")try{ht.onCommitFiberUnmount(Nr,n)}catch{}switch(n.tag){case 5:Le||Dn(n,t);case 6:var r=Pe,l=ct;Pe=null,Vt(e,t,n),Pe=r,ct=l,Pe!==null&&(ct?(e=Pe,n=n.stateNode,e.nodeType===8?e.parentNode.removeChild(n):e.removeChild(n)):Pe.removeChild(n.stateNode));break;case 18:Pe!==null&&(ct?(e=Pe,n=n.stateNode,e.nodeType===8?Po(e.parentNode,n):e.nodeType===1&&Po(e,n),Yn(e)):Po(Pe,n.stateNode));break;case 4:r=Pe,l=ct,Pe=n.stateNode.containerInfo,ct=!0,Vt(e,t,n),Pe=r,ct=l;break;case 0:case 11:case 14:case 15:if(!Le&&(r=n.updateQueue,r!==null&&(r=r.lastEffect,r!==null))){l=r=r.next;do{var o=l,u=o.destroy;o=o.tag,u!==void 0&&((o&2)!==0||(o&4)!==0)&&mi(n,t,u),l=l.next}while(l!==r)}Vt(e,t,n);break;case 1:if(!Le&&(Dn(n,t),r=n.stateNode,typeof r.componentWillUnmount=="function"))try{r.props=n.memoizedProps,r.state=n.memoizedState,r.componentWillUnmount()}catch(c){xe(n,t,c)}Vt(e,t,n);break;case 21:Vt(e,t,n);break;case 22:n.mode&1?(Le=(r=Le)||n.memoizedState!==null,Vt(e,t,n),Le=r):Vt(e,t,n);break;default:Vt(e,t,n)}}function xa(e){var t=e.updateQueue;if(t!==null){e.updateQueue=null;var n=e.stateNode;n===null&&(n=e.stateNode=new Rf),t.forEach(function(r){var l=Of.bind(null,e,r);n.has(r)||(n.add(r),r.then(l,l))})}}function ft(e,t){var n=t.deletions;if(n!==null)for(var r=0;r<n.length;r++){var l=n[r];try{var o=e,u=t,c=u;e:for(;c!==null;){switch(c.tag){case 5:Pe=c.stateNode,ct=!1;break e;case 3:Pe=c.stateNode.containerInfo,ct=!0;break e;case 4:Pe=c.stateNode.containerInfo,ct=!0;break e}c=c.return}if(Pe===null)throw Error(i(160));ya(o,u,l),Pe=null,ct=!1;var f=l.alternate;f!==null&&(f.return=null),l.return=null}catch(_){xe(l,t,_)}}if(t.subtreeFlags&12854)for(t=t.child;t!==null;)_a(t,e),t=t.sibling}function _a(e,t){var n=e.alternate,r=e.flags;switch(e.tag){case 0:case 11:case 14:case 15:if(ft(t,e),xt(e),r&4){try{yr(3,e,e.return),yl(3,e)}catch(j){xe(e,e.return,j)}try{yr(5,e,e.return)}catch(j){xe(e,e.return,j)}}break;case 1:ft(t,e),xt(e),r&512&&n!==null&&Dn(n,n.return);break;case 5:if(ft(t,e),xt(e),r&512&&n!==null&&Dn(n,n.return),e.flags&32){var l=e.stateNode;try{Un(l,"")}catch(j){xe(e,e.return,j)}}if(r&4&&(l=e.stateNode,l!=null)){var o=e.memoizedProps,u=n!==null?n.memoizedProps:o,c=e.type,f=e.updateQueue;if(e.updateQueue=null,f!==null)try{c==="input"&&o.type==="radio"&&o.name!=null&&Gi(l,o),Xl(c,u);var _=Xl(c,o);for(u=0;u<f.length;u+=2){var E=f[u],T=f[u+1];E==="style"?nu(l,T):E==="dangerouslySetInnerHTML"?eu(l,T):E==="children"?Un(l,T):ge(l,E,T,_)}switch(c){case"input":Wl(l,o);break;case"textarea":qi(l,o);break;case"select":var C=l._wrapperState.wasMultiple;l._wrapperState.wasMultiple=!!o.multiple;var z=o.value;z!=null?dn(l,!!o.multiple,z,!1):C!==!!o.multiple&&(o.defaultValue!=null?dn(l,!!o.multiple,o.defaultValue,!0):dn(l,!!o.multiple,o.multiple?[]:"",!1))}l[ur]=o}catch(j){xe(e,e.return,j)}}break;case 6:if(ft(t,e),xt(e),r&4){if(e.stateNode===null)throw Error(i(162));l=e.stateNode,o=e.memoizedProps;try{l.nodeValue=o}catch(j){xe(e,e.return,j)}}break;case 3:if(ft(t,e),xt(e),r&4&&n!==null&&n.memoizedState.isDehydrated)try{Yn(t.containerInfo)}catch(j){xe(e,e.return,j)}break;case 4:ft(t,e),xt(e);break;case 13:ft(t,e),xt(e),l=e.child,l.flags&8192&&(o=l.memoizedState!==null,l.stateNode.isHidden=o,!o||l.alternate!==null&&l.alternate.memoizedState!==null||(_i=we())),r&4&&xa(e);break;case 22:if(E=n!==null&&n.memoizedState!==null,e.mode&1?(Le=(_=Le)||E,ft(t,e),Le=_):ft(t,e),xt(e),r&8192){if(_=e.memoizedState!==null,(e.stateNode.isHidden=_)&&!E&&(e.mode&1)!==0)for(L=e,E=e.child;E!==null;){for(T=L=E;L!==null;){switch(C=L,z=C.child,C.tag){case 0:case 11:case 14:case 15:yr(4,C,C.return);break;case 1:Dn(C,C.return);var O=C.stateNode;if(typeof O.componentWillUnmount=="function"){r=C,n=C.return;try{t=r,O.props=t.memoizedProps,O.state=t.memoizedState,O.componentWillUnmount()}catch(j){xe(r,n,j)}}break;case 5:Dn(C,C.return);break;case 22:if(C.memoizedState!==null){Ca(T);continue}}z!==null?(z.return=C,L=z):Ca(T)}E=E.sibling}e:for(E=null,T=e;;){if(T.tag===5){if(E===null){E=T;try{l=T.stateNode,_?(o=l.style,typeof o.setProperty=="function"?o.setProperty("display","none","important"):o.display="none"):(c=T.stateNode,f=T.memoizedProps.style,u=f!=null&&f.hasOwnProperty("display")?f.display:null,c.style.display=tu("display",u))}catch(j){xe(e,e.return,j)}}}else if(T.tag===6){if(E===null)try{T.stateNode.nodeValue=_?"":T.memoizedProps}catch(j){xe(e,e.return,j)}}else if((T.tag!==22&&T.tag!==23||T.memoizedState===null||T===e)&&T.child!==null){T.child.return=T,T=T.child;continue}if(T===e)break e;for(;T.sibling===null;){if(T.return===null||T.return===e)break e;E===T&&(E=null),T=T.return}E===T&&(E=null),T.sibling.return=T.return,T=T.sibling}}break;case 19:ft(t,e),xt(e),r&4&&xa(e);break;case 21:break;default:ft(t,e),xt(e)}}function xt(e){var t=e.flags;if(t&2){try{e:{for(var n=e.return;n!==null;){if(va(n)){var r=n;break e}n=n.return}throw Error(i(160))}switch(r.tag){case 5:var l=r.stateNode;r.flags&32&&(Un(l,""),r.flags&=-33);var o=ga(e);gi(e,o,l);break;case 3:case 4:var u=r.stateNode.containerInfo,c=ga(e);vi(e,c,u);break;default:throw Error(i(161))}}catch(f){xe(e,e.return,f)}e.flags&=-3}t&4096&&(e.flags&=-4097)}function If(e,t,n){L=e,wa(e)}function wa(e,t,n){for(var r=(e.mode&1)!==0;L!==null;){var l=L,o=l.child;if(l.tag===22&&r){var u=l.memoizedState!==null||gl;if(!u){var c=l.alternate,f=c!==null&&c.memoizedState!==null||Le;c=gl;var _=Le;if(gl=u,(Le=f)&&!_)for(L=l;L!==null;)u=L,f=u.child,u.tag===22&&u.memoizedState!==null?ka(l):f!==null?(f.return=u,L=f):ka(l);for(;o!==null;)L=o,wa(o),o=o.sibling;L=l,gl=c,Le=_}Sa(e)}else(l.subtreeFlags&8772)!==0&&o!==null?(o.return=l,L=o):Sa(e)}}function Sa(e){for(;L!==null;){var t=L;if((t.flags&8772)!==0){var n=t.alternate;try{if((t.flags&8772)!==0)switch(t.tag){case 0:case 11:case 15:Le||yl(5,t);break;case 1:var r=t.stateNode;if(t.flags&4&&!Le)if(n===null)r.componentDidMount();else{var l=t.elementType===t.type?n.memoizedProps:at(t.type,n.memoizedProps);r.componentDidUpdate(l,n.memoizedState,r.__reactInternalSnapshotBeforeUpdate)}var o=t.updateQueue;o!==null&&Cs(t,o,r);break;case 3:var u=t.updateQueue;if(u!==null){if(n=null,t.child!==null)switch(t.child.tag){case 5:n=t.child.stateNode;break;case 1:n=t.child.stateNode}Cs(t,u,n)}break;case 5:var c=t.stateNode;if(n===null&&t.flags&4){n=c;var f=t.memoizedProps;switch(t.type){case"button":case"input":case"select":case"textarea":f.autoFocus&&n.focus();break;case"img":f.src&&(n.src=f.src)}}break;case 6:break;case 4:break;case 12:break;case 13:if(t.memoizedState===null){var _=t.alternate;if(_!==null){var E=_.memoizedState;if(E!==null){var T=E.dehydrated;T!==null&&Yn(T)}}}break;case 19:case 17:case 21:case 22:case 23:case 25:break;default:throw Error(i(163))}Le||t.flags&512&&hi(t)}catch(C){xe(t,t.return,C)}}if(t===e){L=null;break}if(n=t.sibling,n!==null){n.return=t.return,L=n;break}L=t.return}}function Ca(e){for(;L!==null;){var t=L;if(t===e){L=null;break}var n=t.sibling;if(n!==null){n.return=t.return,L=n;break}L=t.return}}function ka(e){for(;L!==null;){var t=L;try{switch(t.tag){case 0:case 11:case 15:var n=t.return;try{yl(4,t)}catch(f){xe(t,n,f)}break;case 1:var r=t.stateNode;if(typeof r.componentDidMount=="function"){var l=t.return;try{r.componentDidMount()}catch(f){xe(t,l,f)}}var o=t.return;try{hi(t)}catch(f){xe(t,o,f)}break;case 5:var u=t.return;try{hi(t)}catch(f){xe(t,u,f)}}}catch(f){xe(t,t.return,f)}if(t===e){L=null;break}var c=t.sibling;if(c!==null){c.return=t.return,L=c;break}L=t.return}}var Pf=Math.ceil,xl=ie.ReactCurrentDispatcher,yi=ie.ReactCurrentOwner,nt=ie.ReactCurrentBatchConfig,J=0,Fe=null,Ce=null,Ne=0,qe=0,zn=At(0),Ee=0,xr=null,on=0,_l=0,xi=0,_r=null,be=null,_i=0,Ln=1/0,Ft=null,wl=!1,wi=null,Wt=null,Sl=!1,bt=null,Cl=0,wr=0,Si=null,kl=-1,El=0;function je(){return(J&6)!==0?we():kl!==-1?kl:kl=we()}function Ht(e){return(e.mode&1)===0?1:(J&2)!==0&&Ne!==0?Ne&-Ne:pf.transition!==null?(El===0&&(El=gu()),El):(e=le,e!==0||(e=window.event,e=e===void 0?16:Tu(e.type)),e)}function dt(e,t,n,r){if(50<wr)throw wr=0,Si=null,Error(i(185));$n(e,n,r),((J&2)===0||e!==Fe)&&(e===Fe&&((J&2)===0&&(_l|=n),Ee===4&&$t(e,Ne)),He(e,r),n===1&&J===0&&(t.mode&1)===0&&(Ln=we()+500,Jr&&jt()))}function He(e,t){var n=e.callbackNode;dc(e,t);var r=zr(e,e===Fe?Ne:0);if(r===0)n!==null&&mu(n),e.callbackNode=null,e.callbackPriority=0;else if(t=r&-r,e.callbackPriority!==t){if(n!=null&&mu(n),t===1)e.tag===0?df(Ta.bind(null,e)):fs(Ta.bind(null,e)),sf(function(){(J&6)===0&&jt()}),n=null;else{switch(yu(r)){case 1:n=eo;break;case 4:n=hu;break;case 16:n=Pr;break;case 536870912:n=vu;break;default:n=Pr}n=za(n,Ea.bind(null,e))}e.callbackPriority=t,e.callbackNode=n}}function Ea(e,t){if(kl=-1,El=0,(J&6)!==0)throw Error(i(327));var n=e.callbackNode;if(An()&&e.callbackNode!==n)return null;var r=zr(e,e===Fe?Ne:0);if(r===0)return null;if((r&30)!==0||(r&e.expiredLanes)!==0||t)t=Tl(e,r);else{t=r;var l=J;J|=2;var o=Fa();(Fe!==e||Ne!==t)&&(Ft=null,Ln=we()+500,sn(e,t));do try{Df();break}catch(c){Ra(e,c)}while(!0);Bo(),xl.current=o,J=l,Ce!==null?t=0:(Fe=null,Ne=0,t=Ee)}if(t!==0){if(t===2&&(l=to(e),l!==0&&(r=l,t=Ci(e,l))),t===1)throw n=xr,sn(e,0),$t(e,r),He(e,we()),n;if(t===6)$t(e,r);else{if(l=e.current.alternate,(r&30)===0&&!Nf(l)&&(t=Tl(e,r),t===2&&(o=to(e),o!==0&&(r=o,t=Ci(e,o))),t===1))throw n=xr,sn(e,0),$t(e,r),He(e,we()),n;switch(e.finishedWork=l,e.finishedLanes=r,t){case 0:case 1:throw Error(i(345));case 2:an(e,be,Ft);break;case 3:if($t(e,r),(r&130023424)===r&&(t=_i+500-we(),10<t)){if(zr(e,0)!==0)break;if(l=e.suspendedLanes,(l&r)!==r){je(),e.pingedLanes|=e.suspendedLanes&l;break}e.timeoutHandle=Io(an.bind(null,e,be,Ft),t);break}an(e,be,Ft);break;case 4:if($t(e,r),(r&4194240)===r)break;for(t=e.eventTimes,l=-1;0<r;){var u=31-it(r);o=1<<u,u=t[u],u>l&&(l=u),r&=~o}if(r=l,r=we()-r,r=(120>r?120:480>r?480:1080>r?1080:1920>r?1920:3e3>r?3e3:4320>r?4320:1960*Pf(r/1960))-r,10<r){e.timeoutHandle=Io(an.bind(null,e,be,Ft),r);break}an(e,be,Ft);break;case 5:an(e,be,Ft);break;default:throw Error(i(329))}}}return He(e,we()),e.callbackNode===n?Ea.bind(null,e):null}function Ci(e,t){var n=_r;return e.current.memoizedState.isDehydrated&&(sn(e,t).flags|=256),e=Tl(e,t),e!==2&&(t=be,be=n,t!==null&&ki(t)),e}function ki(e){be===null?be=e:be.push.apply(be,e)}function Nf(e){for(var t=e;;){if(t.flags&16384){var n=t.updateQueue;if(n!==null&&(n=n.stores,n!==null))for(var r=0;r<n.length;r++){var l=n[r],o=l.getSnapshot;l=l.value;try{if(!ut(o(),l))return!1}catch{return!1}}}if(n=t.child,t.subtreeFlags&16384&&n!==null)n.return=t,t=n;else{if(t===e)break;for(;t.sibling===null;){if(t.return===null||t.return===e)return!0;t=t.return}t.sibling.return=t.return,t=t.sibling}}return!0}function $t(e,t){for(t&=~xi,t&=~_l,e.suspendedLanes|=t,e.pingedLanes&=~t,e=e.expirationTimes;0<t;){var n=31-it(t),r=1<<n;e[n]=-1,t&=~r}}function Ta(e){if((J&6)!==0)throw Error(i(327));An();var t=zr(e,0);if((t&1)===0)return He(e,we()),null;var n=Tl(e,t);if(e.tag!==0&&n===2){var r=to(e);r!==0&&(t=r,n=Ci(e,r))}if(n===1)throw n=xr,sn(e,0),$t(e,t),He(e,we()),n;if(n===6)throw Error(i(345));return e.finishedWork=e.current.alternate,e.finishedLanes=t,an(e,be,Ft),He(e,we()),null}function Ei(e,t){var n=J;J|=1;try{return e(t)}finally{J=n,J===0&&(Ln=we()+500,Jr&&jt())}}function un(e){bt!==null&&bt.tag===0&&(J&6)===0&&An();var t=J;J|=1;var n=nt.transition,r=le;try{if(nt.transition=null,le=1,e)return e()}finally{le=r,nt.transition=n,J=t,(J&6)===0&&jt()}}function Ti(){qe=zn.current,de(zn)}function sn(e,t){e.finishedWork=null,e.finishedLanes=0;var n=e.timeoutHandle;if(n!==-1&&(e.timeoutHandle=-1,uf(n)),Ce!==null)for(n=Ce.return;n!==null;){var r=n;switch(Lo(r),r.tag){case 1:r=r.type.childContextTypes,r!=null&&qr();break;case 3:Nn(),de(Be),de(Me),Go();break;case 5:Qo(r);break;case 4:Nn();break;case 13:de(he);break;case 19:de(he);break;case 10:Vo(r.type._context);break;case 22:case 23:Ti()}n=n.return}if(Fe=e,Ce=e=Qt(e.current,null),Ne=qe=t,Ee=0,xr=null,xi=_l=on=0,be=_r=null,nn!==null){for(t=0;t<nn.length;t++)if(n=nn[t],r=n.interleaved,r!==null){n.interleaved=null;var l=r.next,o=n.pending;if(o!==null){var u=o.next;o.next=l,r.next=u}n.pending=r}nn=null}return e}function Ra(e,t){do{var n=Ce;try{if(Bo(),al.current=pl,cl){for(var r=ve.memoizedState;r!==null;){var l=r.queue;l!==null&&(l.pending=null),r=r.next}cl=!1}if(ln=0,Re=ke=ve=null,pr=!1,mr=0,yi.current=null,n===null||n.return===null){Ee=1,xr=t,Ce=null;break}e:{var o=e,u=n.return,c=n,f=t;if(t=Ne,c.flags|=32768,f!==null&&typeof f=="object"&&typeof f.then=="function"){var _=f,E=c,T=E.tag;if((E.mode&1)===0&&(T===0||T===11||T===15)){var C=E.alternate;C?(E.updateQueue=C.updateQueue,E.memoizedState=C.memoizedState,E.lanes=C.lanes):(E.updateQueue=null,E.memoizedState=null)}var z=Zs(u);if(z!==null){z.flags&=-257,Js(z,u,c,o,t),z.mode&1&&qs(o,_,t),t=z,f=_;var O=t.updateQueue;if(O===null){var j=new Set;j.add(f),t.updateQueue=j}else O.add(f);break e}else{if((t&1)===0){qs(o,_,t),Ri();break e}f=Error(i(426))}}else if(me&&c.mode&1){var Se=Zs(u);if(Se!==null){(Se.flags&65536)===0&&(Se.flags|=256),Js(Se,u,c,o,t),jo(Mn(f,c));break e}}o=f=Mn(f,c),Ee!==4&&(Ee=2),_r===null?_r=[o]:_r.push(o),o=u;do{switch(o.tag){case 3:o.flags|=65536,t&=-t,o.lanes|=t;var g=Ks(o,f,t);Ss(o,g);break e;case 1:c=f;var m=o.type,x=o.stateNode;if((o.flags&128)===0&&(typeof m.getDerivedStateFromError=="function"||x!==null&&typeof x.componentDidCatch=="function"&&(Wt===null||!Wt.has(x)))){o.flags|=65536,t&=-t,o.lanes|=t;var I=Ys(o,c,t);Ss(o,I);break e}}o=o.return}while(o!==null)}Pa(n)}catch(U){t=U,Ce===n&&n!==null&&(Ce=n=n.return);continue}break}while(!0)}function Fa(){var e=xl.current;return xl.current=pl,e===null?pl:e}function Ri(){(Ee===0||Ee===3||Ee===2)&&(Ee=4),Fe===null||(on&268435455)===0&&(_l&268435455)===0||$t(Fe,Ne)}function Tl(e,t){var n=J;J|=2;var r=Fa();(Fe!==e||Ne!==t)&&(Ft=null,sn(e,t));do try{Mf();break}catch(l){Ra(e,l)}while(!0);if(Bo(),J=n,xl.current=r,Ce!==null)throw Error(i(261));return Fe=null,Ne=0,Ee}function Mf(){for(;Ce!==null;)Ia(Ce)}function Df(){for(;Ce!==null&&!rc();)Ia(Ce)}function Ia(e){var t=Da(e.alternate,e,qe);e.memoizedProps=e.pendingProps,t===null?Pa(e):Ce=t,yi.current=null}function Pa(e){var t=e;do{var n=t.alternate;if(e=t.return,(t.flags&32768)===0){if(n=Ef(n,t,qe),n!==null){Ce=n;return}}else{if(n=Tf(n,t),n!==null){n.flags&=32767,Ce=n;return}if(e!==null)e.flags|=32768,e.subtreeFlags=0,e.deletions=null;else{Ee=6,Ce=null;return}}if(t=t.sibling,t!==null){Ce=t;return}Ce=t=e}while(t!==null);Ee===0&&(Ee=5)}function an(e,t,n){var r=le,l=nt.transition;try{nt.transition=null,le=1,zf(e,t,n,r)}finally{nt.transition=l,le=r}return null}function zf(e,t,n,r){do An();while(bt!==null);if((J&6)!==0)throw Error(i(327));n=e.finishedWork;var l=e.finishedLanes;if(n===null)return null;if(e.finishedWork=null,e.finishedLanes=0,n===e.current)throw Error(i(177));e.callbackNode=null,e.callbackPriority=0;var o=n.lanes|n.childLanes;if(pc(e,o),e===Fe&&(Ce=Fe=null,Ne=0),(n.subtreeFlags&2064)===0&&(n.flags&2064)===0||Sl||(Sl=!0,za(Pr,function(){return An(),null})),o=(n.flags&15990)!==0,(n.subtreeFlags&15990)!==0||o){o=nt.transition,nt.transition=null;var u=le;le=1;var c=J;J|=4,yi.current=null,Ff(e,n),_a(n,e),Jc(Ro),Or=!!To,Ro=To=null,e.current=n,If(n),lc(),J=c,le=u,nt.transition=o}else e.current=n;if(Sl&&(Sl=!1,bt=e,Cl=l),o=e.pendingLanes,o===0&&(Wt=null),uc(n.stateNode),He(e,we()),t!==null)for(r=e.onRecoverableError,n=0;n<t.length;n++)l=t[n],r(l.value,{componentStack:l.stack,digest:l.digest});if(wl)throw wl=!1,e=wi,wi=null,e;return(Cl&1)!==0&&e.tag!==0&&An(),o=e.pendingLanes,(o&1)!==0?e===Si?wr++:(wr=0,Si=e):wr=0,jt(),null}function An(){if(bt!==null){var e=yu(Cl),t=nt.transition,n=le;try{if(nt.transition=null,le=16>e?16:e,bt===null)var r=!1;else{if(e=bt,bt=null,Cl=0,(J&6)!==0)throw Error(i(331));var l=J;for(J|=4,L=e.current;L!==null;){var o=L,u=o.child;if((L.flags&16)!==0){var c=o.deletions;if(c!==null){for(var f=0;f<c.length;f++){var _=c[f];for(L=_;L!==null;){var E=L;switch(E.tag){case 0:case 11:case 15:yr(8,E,o)}var T=E.child;if(T!==null)T.return=E,L=T;else for(;L!==null;){E=L;var C=E.sibling,z=E.return;if(ha(E),E===_){L=null;break}if(C!==null){C.return=z,L=C;break}L=z}}}var O=o.alternate;if(O!==null){var j=O.child;if(j!==null){O.child=null;do{var Se=j.sibling;j.sibling=null,j=Se}while(j!==null)}}L=o}}if((o.subtreeFlags&2064)!==0&&u!==null)u.return=o,L=u;else e:for(;L!==null;){if(o=L,(o.flags&2048)!==0)switch(o.tag){case 0:case 11:case 15:yr(9,o,o.return)}var g=o.sibling;if(g!==null){g.return=o.return,L=g;break e}L=o.return}}var m=e.current;for(L=m;L!==null;){u=L;var x=u.child;if((u.subtreeFlags&2064)!==0&&x!==null)x.return=u,L=x;else e:for(u=m;L!==null;){if(c=L,(c.flags&2048)!==0)try{switch(c.tag){case 0:case 11:case 15:yl(9,c)}}catch(U){xe(c,c.return,U)}if(c===u){L=null;break e}var I=c.sibling;if(I!==null){I.return=c.return,L=I;break e}L=c.return}}if(J=l,jt(),ht&&typeof ht.onPostCommitFiberRoot=="function")try{ht.onPostCommitFiberRoot(Nr,e)}catch{}r=!0}return r}finally{le=n,nt.transition=t}}return!1}function Na(e,t,n){t=Mn(n,t),t=Ks(e,t,1),e=Bt(e,t,1),t=je(),e!==null&&($n(e,1,t),He(e,t))}function xe(e,t,n){if(e.tag===3)Na(e,e,n);else for(;t!==null;){if(t.tag===3){Na(t,e,n);break}else if(t.tag===1){var r=t.stateNode;if(typeof t.type.getDerivedStateFromError=="function"||typeof r.componentDidCatch=="function"&&(Wt===null||!Wt.has(r))){e=Mn(n,e),e=Ys(t,e,1),t=Bt(t,e,1),e=je(),t!==null&&($n(t,1,e),He(t,e));break}}t=t.return}}function Lf(e,t,n){var r=e.pingCache;r!==null&&r.delete(t),t=je(),e.pingedLanes|=e.suspendedLanes&n,Fe===e&&(Ne&n)===n&&(Ee===4||Ee===3&&(Ne&130023424)===Ne&&500>we()-_i?sn(e,0):xi|=n),He(e,t)}function Ma(e,t){t===0&&((e.mode&1)===0?t=1:(t=Dr,Dr<<=1,(Dr&130023424)===0&&(Dr=4194304)));var n=je();e=Et(e,t),e!==null&&($n(e,t,n),He(e,n))}function Af(e){var t=e.memoizedState,n=0;t!==null&&(n=t.retryLane),Ma(e,n)}function Of(e,t){var n=0;switch(e.tag){case 13:var r=e.stateNode,l=e.memoizedState;l!==null&&(n=l.retryLane);break;case 19:r=e.stateNode;break;default:throw Error(i(314))}r!==null&&r.delete(t),Ma(e,n)}var Da;Da=function(e,t,n){if(e!==null)if(e.memoizedProps!==t.pendingProps||Be.current)We=!0;else{if((e.lanes&n)===0&&(t.flags&128)===0)return We=!1,kf(e,t,n);We=(e.flags&131072)!==0}else We=!1,me&&(t.flags&1048576)!==0&&ds(t,tl,t.index);switch(t.lanes=0,t.tag){case 2:var r=t.type;vl(e,t),e=t.pendingProps;var l=kn(t,Me.current);Pn(t,n),l=qo(null,t,r,e,l,n);var o=Zo();return t.flags|=1,typeof l=="object"&&l!==null&&typeof l.render=="function"&&l.$$typeof===void 0?(t.tag=1,t.memoizedState=null,t.updateQueue=null,Ve(r)?(o=!0,Zr(t)):o=!1,t.memoizedState=l.state!==null&&l.state!==void 0?l.state:null,Ho(t),l.updater=ml,t.stateNode=l,l._reactInternals=t,li(t,r,e,n),t=si(null,t,r,!0,o,n)):(t.tag=0,me&&o&&zo(t),Oe(null,t,l,n),t=t.child),t;case 16:r=t.elementType;e:{switch(vl(e,t),e=t.pendingProps,l=r._init,r=l(r._payload),t.type=r,l=t.tag=Uf(r),e=at(r,e),l){case 0:t=ui(null,t,r,e,n);break e;case 1:t=oa(null,t,r,e,n);break e;case 11:t=ea(null,t,r,e,n);break e;case 14:t=ta(null,t,r,at(r.type,e),n);break e}throw Error(i(306,r,""))}return t;case 0:return r=t.type,l=t.pendingProps,l=t.elementType===r?l:at(r,l),ui(e,t,r,l,n);case 1:return r=t.type,l=t.pendingProps,l=t.elementType===r?l:at(r,l),oa(e,t,r,l,n);case 3:e:{if(ia(t),e===null)throw Error(i(387));r=t.pendingProps,o=t.memoizedState,l=o.element,ws(e,t),ul(t,r,null,n);var u=t.memoizedState;if(r=u.element,o.isDehydrated)if(o={element:r,isDehydrated:!1,cache:u.cache,pendingSuspenseBoundaries:u.pendingSuspenseBoundaries,transitions:u.transitions},t.updateQueue.baseState=o,t.memoizedState=o,t.flags&256){l=Mn(Error(i(423)),t),t=ua(e,t,r,n,l);break e}else if(r!==l){l=Mn(Error(i(424)),t),t=ua(e,t,r,n,l);break e}else for(Ye=Lt(t.stateNode.containerInfo.firstChild),Ke=t,me=!0,st=null,n=xs(t,null,r,n),t.child=n;n;)n.flags=n.flags&-3|4096,n=n.sibling;else{if(Rn(),r===l){t=Rt(e,t,n);break e}Oe(e,t,r,n)}t=t.child}return t;case 5:return ks(t),e===null&&Oo(t),r=t.type,l=t.pendingProps,o=e!==null?e.memoizedProps:null,u=l.children,Fo(r,l)?u=null:o!==null&&Fo(r,o)&&(t.flags|=32),la(e,t),Oe(e,t,u,n),t.child;case 6:return e===null&&Oo(t),null;case 13:return sa(e,t,n);case 4:return $o(t,t.stateNode.containerInfo),r=t.pendingProps,e===null?t.child=Fn(t,null,r,n):Oe(e,t,r,n),t.child;case 11:return r=t.type,l=t.pendingProps,l=t.elementType===r?l:at(r,l),ea(e,t,r,l,n);case 7:return Oe(e,t,t.pendingProps,n),t.child;case 8:return Oe(e,t,t.pendingProps.children,n),t.child;case 12:return Oe(e,t,t.pendingProps.children,n),t.child;case 10:e:{if(r=t.type._context,l=t.pendingProps,o=t.memoizedProps,u=l.value,ae(ll,r._currentValue),r._currentValue=u,o!==null)if(ut(o.value,u)){if(o.children===l.children&&!Be.current){t=Rt(e,t,n);break e}}else for(o=t.child,o!==null&&(o.return=t);o!==null;){var c=o.dependencies;if(c!==null){u=o.child;for(var f=c.firstContext;f!==null;){if(f.context===r){if(o.tag===1){f=Tt(-1,n&-n),f.tag=2;var _=o.updateQueue;if(_!==null){_=_.shared;var E=_.pending;E===null?f.next=f:(f.next=E.next,E.next=f),_.pending=f}}o.lanes|=n,f=o.alternate,f!==null&&(f.lanes|=n),Wo(o.return,n,t),c.lanes|=n;break}f=f.next}}else if(o.tag===10)u=o.type===t.type?null:o.child;else if(o.tag===18){if(u=o.return,u===null)throw Error(i(341));u.lanes|=n,c=u.alternate,c!==null&&(c.lanes|=n),Wo(u,n,t),u=o.sibling}else u=o.child;if(u!==null)u.return=o;else for(u=o;u!==null;){if(u===t){u=null;break}if(o=u.sibling,o!==null){o.return=u.return,u=o;break}u=u.return}o=u}Oe(e,t,l.children,n),t=t.child}return t;case 9:return l=t.type,r=t.pendingProps.children,Pn(t,n),l=et(l),r=r(l),t.flags|=1,Oe(e,t,r,n),t.child;case 14:return r=t.type,l=at(r,t.pendingProps),l=at(r.type,l),ta(e,t,r,l,n);case 15:return na(e,t,t.type,t.pendingProps,n);case 17:return r=t.type,l=t.pendingProps,l=t.elementType===r?l:at(r,l),vl(e,t),t.tag=1,Ve(r)?(e=!0,Zr(t)):e=!1,Pn(t,n),Xs(t,r,l),li(t,r,l,n),si(null,t,r,!0,e,n);case 19:return ca(e,t,n);case 22:return ra(e,t,n)}throw Error(i(156,t.tag))};function za(e,t){return pu(e,t)}function jf(e,t,n,r){this.tag=e,this.key=n,this.sibling=this.child=this.return=this.stateNode=this.type=this.elementType=null,this.index=0,this.ref=null,this.pendingProps=t,this.dependencies=this.memoizedState=this.updateQueue=this.memoizedProps=null,this.mode=r,this.subtreeFlags=this.flags=0,this.deletions=null,this.childLanes=this.lanes=0,this.alternate=null}function rt(e,t,n,r){return new jf(e,t,n,r)}function Fi(e){return e=e.prototype,!(!e||!e.isReactComponent)}function Uf(e){if(typeof e=="function")return Fi(e)?1:0;if(e!=null){if(e=e.$$typeof,e===pt)return 11;if(e===mt)return 14}return 2}function Qt(e,t){var n=e.alternate;return n===null?(n=rt(e.tag,t,e.key,e.mode),n.elementType=e.elementType,n.type=e.type,n.stateNode=e.stateNode,n.alternate=e,e.alternate=n):(n.pendingProps=t,n.type=e.type,n.flags=0,n.subtreeFlags=0,n.deletions=null),n.flags=e.flags&14680064,n.childLanes=e.childLanes,n.lanes=e.lanes,n.child=e.child,n.memoizedProps=e.memoizedProps,n.memoizedState=e.memoizedState,n.updateQueue=e.updateQueue,t=e.dependencies,n.dependencies=t===null?null:{lanes:t.lanes,firstContext:t.firstContext},n.sibling=e.sibling,n.index=e.index,n.ref=e.ref,n}function Rl(e,t,n,r,l,o){var u=2;if(r=e,typeof e=="function")Fi(e)&&(u=1);else if(typeof e=="string")u=5;else e:switch(e){case _e:return cn(n.children,l,o,t);case Ae:u=8,l|=8;break;case lt:return e=rt(12,n,t,l|2),e.elementType=lt,e.lanes=o,e;case Qe:return e=rt(13,n,t,l),e.elementType=Qe,e.lanes=o,e;case ot:return e=rt(19,n,t,l),e.elementType=ot,e.lanes=o,e;case ye:return Fl(n,l,o,t);default:if(typeof e=="object"&&e!==null)switch(e.$$typeof){case _t:u=10;break e;case Yt:u=9;break e;case pt:u=11;break e;case mt:u=14;break e;case Ue:u=16,r=null;break e}throw Error(i(130,e==null?e:typeof e,""))}return t=rt(u,n,t,l),t.elementType=e,t.type=r,t.lanes=o,t}function cn(e,t,n,r){return e=rt(7,e,r,t),e.lanes=n,e}function Fl(e,t,n,r){return e=rt(22,e,r,t),e.elementType=ye,e.lanes=n,e.stateNode={isHidden:!1},e}function Ii(e,t,n){return e=rt(6,e,null,t),e.lanes=n,e}function Pi(e,t,n){return t=rt(4,e.children!==null?e.children:[],e.key,t),t.lanes=n,t.stateNode={containerInfo:e.containerInfo,pendingChildren:null,implementation:e.implementation},t}function Bf(e,t,n,r,l){this.tag=t,this.containerInfo=e,this.finishedWork=this.pingCache=this.current=this.pendingChildren=null,this.timeoutHandle=-1,this.callbackNode=this.pendingContext=this.context=null,this.callbackPriority=0,this.eventTimes=no(0),this.expirationTimes=no(-1),this.entangledLanes=this.finishedLanes=this.mutableReadLanes=this.expiredLanes=this.pingedLanes=this.suspendedLanes=this.pendingLanes=0,this.entanglements=no(0),this.identifierPrefix=r,this.onRecoverableError=l,this.mutableSourceEagerHydrationData=null}function Ni(e,t,n,r,l,o,u,c,f){return e=new Bf(e,t,n,c,f),t===1?(t=1,o===!0&&(t|=8)):t=0,o=rt(3,null,null,t),e.current=o,o.stateNode=e,o.memoizedState={element:r,isDehydrated:n,cache:null,transitions:null,pendingSuspenseBoundaries:null},Ho(o),e}function Vf(e,t,n){var r=3<arguments.length&&arguments[3]!==void 0?arguments[3]:null;return{$$typeof:ce,key:r==null?null:""+r,children:e,containerInfo:t,implementation:n}}function La(e){if(!e)return Ot;e=e._reactInternals;e:{if(qt(e)!==e||e.tag!==1)throw Error(i(170));var t=e;do{switch(t.tag){case 3:t=t.stateNode.context;break e;case 1:if(Ve(t.type)){t=t.stateNode.__reactInternalMemoizedMergedChildContext;break e}}t=t.return}while(t!==null);throw Error(i(171))}if(e.tag===1){var n=e.type;if(Ve(n))return as(e,n,t)}return t}function Aa(e,t,n,r,l,o,u,c,f){return e=Ni(n,r,!0,e,l,o,u,c,f),e.context=La(null),n=e.current,r=je(),l=Ht(n),o=Tt(r,l),o.callback=t??null,Bt(n,o,l),e.current.lanes=l,$n(e,l,r),He(e,r),e}function Il(e,t,n,r){var l=t.current,o=je(),u=Ht(l);return n=La(n),t.context===null?t.context=n:t.pendingContext=n,t=Tt(o,u),t.payload={element:e},r=r===void 0?null:r,r!==null&&(t.callback=r),e=Bt(l,t,u),e!==null&&(dt(e,l,u,o),il(e,l,u)),u}function Pl(e){if(e=e.current,!e.child)return null;switch(e.child.tag){case 5:return e.child.stateNode;default:return e.child.stateNode}}function Oa(e,t){if(e=e.memoizedState,e!==null&&e.dehydrated!==null){var n=e.retryLane;e.retryLane=n!==0&&n<t?n:t}}function Mi(e,t){Oa(e,t),(e=e.alternate)&&Oa(e,t)}function Wf(){return null}var ja=typeof reportError=="function"?reportError:function(e){console.error(e)};function Di(e){this._internalRoot=e}Nl.prototype.render=Di.prototype.render=function(e){var t=this._internalRoot;if(t===null)throw Error(i(409));Il(e,t,null,null)},Nl.prototype.unmount=Di.prototype.unmount=function(){var e=this._internalRoot;if(e!==null){this._internalRoot=null;var t=e.containerInfo;un(function(){Il(null,e,null,null)}),t[wt]=null}};function Nl(e){this._internalRoot=e}Nl.prototype.unstable_scheduleHydration=function(e){if(e){var t=wu();e={blockedOn:null,target:e,priority:t};for(var n=0;n<Mt.length&&t!==0&&t<Mt[n].priority;n++);Mt.splice(n,0,e),n===0&&ku(e)}};function zi(e){return!(!e||e.nodeType!==1&&e.nodeType!==9&&e.nodeType!==11)}function Ml(e){return!(!e||e.nodeType!==1&&e.nodeType!==9&&e.nodeType!==11&&(e.nodeType!==8||e.nodeValue!==" react-mount-point-unstable "))}function Ua(){}function bf(e,t,n,r,l){if(l){if(typeof r=="function"){var o=r;r=function(){var _=Pl(u);o.call(_)}}var u=Aa(t,r,e,0,null,!1,!1,"",Ua);return e._reactRootContainer=u,e[wt]=u.current,or(e.nodeType===8?e.parentNode:e),un(),u}for(;l=e.lastChild;)e.removeChild(l);if(typeof r=="function"){var c=r;r=function(){var _=Pl(f);c.call(_)}}var f=Ni(e,0,!1,null,null,!1,!1,"",Ua);return e._reactRootContainer=f,e[wt]=f.current,or(e.nodeType===8?e.parentNode:e),un(function(){Il(t,f,n,r)}),f}function Dl(e,t,n,r,l){var o=n._reactRootContainer;if(o){var u=o;if(typeof l=="function"){var c=l;l=function(){var f=Pl(u);c.call(f)}}Il(t,u,e,l)}else u=bf(n,t,e,l,r);return Pl(u)}xu=function(e){switch(e.tag){case 3:var t=e.stateNode;if(t.current.memoizedState.isDehydrated){var n=Hn(t.pendingLanes);n!==0&&(ro(t,n|1),He(t,we()),(J&6)===0&&(Ln=we()+500,jt()))}break;case 13:un(function(){var r=Et(e,1);if(r!==null){var l=je();dt(r,e,1,l)}}),Mi(e,1)}},lo=function(e){if(e.tag===13){var t=Et(e,134217728);if(t!==null){var n=je();dt(t,e,134217728,n)}Mi(e,134217728)}},_u=function(e){if(e.tag===13){var t=Ht(e),n=Et(e,t);if(n!==null){var r=je();dt(n,e,t,r)}Mi(e,t)}},wu=function(){return le},Su=function(e,t){var n=le;try{return le=e,t()}finally{le=n}},Yl=function(e,t,n){switch(t){case"input":if(Wl(e,n),t=n.name,n.type==="radio"&&t!=null){for(n=e;n.parentNode;)n=n.parentNode;for(n=n.querySelectorAll("input[name="+JSON.stringify(""+t)+'][type="radio"]'),t=0;t<n.length;t++){var r=n[t];if(r!==e&&r.form===e.form){var l=Yr(r);if(!l)throw Error(i(90));Qi(r),Wl(r,l)}}}break;case"textarea":qi(e,n);break;case"select":t=n.value,t!=null&&dn(e,!!n.multiple,t,!1)}},iu=Ei,uu=un;var Hf={usingClientEntryPoint:!1,Events:[sr,Sn,Yr,lu,ou,Ei]},Sr={findFiberByHostInstance:Zt,bundleType:0,version:"18.3.1",rendererPackageName:"react-dom"},$f={bundleType:Sr.bundleType,version:Sr.version,rendererPackageName:Sr.rendererPackageName,rendererConfig:Sr.rendererConfig,overrideHookState:null,overrideHookStateDeletePath:null,overrideHookStateRenamePath:null,overrideProps:null,overridePropsDeletePath:null,overridePropsRenamePath:null,setErrorHandler:null,setSuspenseHandler:null,scheduleUpdate:null,currentDispatcherRef:ie.ReactCurrentDispatcher,findHostInstanceByFiber:function(e){return e=fu(e),e===null?null:e.stateNode},findFiberByHostInstance:Sr.findFiberByHostInstance||Wf,findHostInstancesForRefresh:null,scheduleRefresh:null,scheduleRoot:null,setRefreshHandler:null,getCurrentFiber:null,reconcilerVersion:"18.3.1-next-f1338f8080-20240426"};if(typeof __REACT_DEVTOOLS_GLOBAL_HOOK__<"u"){var zl=__REACT_DEVTOOLS_GLOBAL_HOOK__;if(!zl.isDisabled&&zl.supportsFiber)try{Nr=zl.inject($f),ht=zl}catch{}}return $e.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED=Hf,$e.createPortal=function(e,t){var n=2<arguments.length&&arguments[2]!==void 0?arguments[2]:null;if(!zi(t))throw Error(i(200));return Vf(e,t,null,n)},$e.createRoot=function(e,t){if(!zi(e))throw Error(i(299));var n=!1,r="",l=ja;return t!=null&&(t.unstable_strictMode===!0&&(n=!0),t.identifierPrefix!==void 0&&(r=t.identifierPrefix),t.onRecoverableError!==void 0&&(l=t.onRecoverableError)),t=Ni(e,1,!1,null,null,n,!1,r,l),e[wt]=t.current,or(e.nodeType===8?e.parentNode:e),new Di(t)},$e.findDOMNode=function(e){if(e==null)return null;if(e.nodeType===1)return e;var t=e._reactInternals;if(t===void 0)throw typeof e.render=="function"?Error(i(188)):(e=Object.keys(e).join(","),Error(i(268,e)));return e=fu(t),e=e===null?null:e.stateNode,e},$e.flushSync=function(e){return un(e)},$e.hydrate=function(e,t,n){if(!Ml(t))throw Error(i(200));return Dl(null,e,t,!0,n)},$e.hydrateRoot=function(e,t,n){if(!zi(e))throw Error(i(405));var r=n!=null&&n.hydratedSources||null,l=!1,o="",u=ja;if(n!=null&&(n.unstable_strictMode===!0&&(l=!0),n.identifierPrefix!==void 0&&(o=n.identifierPrefix),n.onRecoverableError!==void 0&&(u=n.onRecoverableError)),t=Aa(t,null,e,1,n??null,l,!1,o,u),e[wt]=t.current,or(e),r)for(e=0;e<r.length;e++)n=r[e],l=n._getVersion,l=l(n._source),t.mutableSourceEagerHydrationData==null?t.mutableSourceEagerHydrationData=[n,l]:t.mutableSourceEagerHydrationData.push(n,l);return new Nl(t)},$e.render=function(e,t,n){if(!Ml(t))throw Error(i(200));return Dl(null,e,t,!1,n)},$e.unmountComponentAtNode=function(e){if(!Ml(e))throw Error(i(40));return e._reactRootContainer?(un(function(){Dl(null,null,e,!1,function(){e._reactRootContainer=null,e[wt]=null})}),!0):!1},$e.unstable_batchedUpdates=Ei,$e.unstable_renderSubtreeIntoContainer=function(e,t,n,r){if(!Ml(n))throw Error(i(200));if(e==null||e._reactInternals===void 0)throw Error(i(38));return Dl(e,t,n,!1,r)},$e.version="18.3.1-next-f1338f8080-20240426",$e}var Xa;function td(){if(Xa)return Oi.exports;Xa=1;function y(){if(!(typeof __REACT_DEVTOOLS_GLOBAL_HOOK__>"u"||typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE!="function"))try{__REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE(y)}catch(s){console.error(s)}}return y(),Oi.exports=ed(),Oi.exports}var Ga;function nd(){if(Ga)return Ll;Ga=1;var y=td();return Ll.createRoot=y.createRoot,Ll.hydrateRoot=y.hydrateRoot,Ll}var rd=nd();class ld{constructor(s){N(this,"gl");N(this,"emptyVAO");N(this,"lost",!1);const i=s.getContext("webgl2",{alpha:!1,antialias:!1,preserveDrawingBuffer:!0,powerPreference:"high-performance"});if(!i)throw new Error("WebGL 2 is not supported in this browser");this.gl=i,i.getExtension("EXT_color_buffer_float"),i.getExtension("OES_texture_float_linear");const a=i.createVertexArray();if(!a)throw new Error("Failed to create VAO");this.emptyVAO=a,s.addEventListener("webglcontextlost",p=>{p.preventDefault(),this.lost=!0,console.warn("WebGL context lost")}),s.addEventListener("webglcontextrestored",()=>{this.lost=!1,console.info("WebGL context restored")})}get isLost(){return this.lost}bindFullscreenQuad(){this.gl.bindVertexArray(this.emptyVAO)}drawFullscreenQuad(){this.gl.bindVertexArray(this.emptyVAO),this.gl.drawArrays(this.gl.TRIANGLES,0,6)}dispose(){this.gl.deleteVertexArray(this.emptyVAO)}}class od{constructor(){N(this,"startTime",0);N(this,"lastTime",0);N(this,"time",0);N(this,"deltaTime",0);N(this,"frameCount",0)}start(){this.startTime=performance.now()/1e3,this.lastTime=this.startTime,this.time=0,this.deltaTime=0,this.frameCount=0}tick(){const s=performance.now()/1e3;this.deltaTime=s-this.lastTime,this.lastTime=s,this.time=s-this.startTime,this.frameCount++}}class id{constructor(s){N(this,"pool",new Map);N(this,"gl");this.gl=s}acquire(s,i){const a=`${s}x${i}`,p=this.pool.get(a);if(p){const d=p.find(M=>!M.inUse);if(d)return d.inUse=!0,{fbo:d.fbo,texture:d.texture,width:s,height:i}}const{gl:h}=this,w=h.createFramebuffer(),S=h.createTexture();h.bindTexture(h.TEXTURE_2D,S),h.texImage2D(h.TEXTURE_2D,0,h.RGBA16F,s,i,0,h.RGBA,h.FLOAT,null),h.texParameteri(h.TEXTURE_2D,h.TEXTURE_MIN_FILTER,h.LINEAR),h.texParameteri(h.TEXTURE_2D,h.TEXTURE_MAG_FILTER,h.LINEAR),h.texParameteri(h.TEXTURE_2D,h.TEXTURE_WRAP_S,h.CLAMP_TO_EDGE),h.texParameteri(h.TEXTURE_2D,h.TEXTURE_WRAP_T,h.CLAMP_TO_EDGE),h.bindFramebuffer(h.FRAMEBUFFER,w),h.framebufferTexture2D(h.FRAMEBUFFER,h.COLOR_ATTACHMENT0,h.TEXTURE_2D,S,0),h.bindFramebuffer(h.FRAMEBUFFER,null);const F={fbo:w,texture:S,inUse:!0};return this.pool.has(a)||this.pool.set(a,[]),this.pool.get(a).push(F),{fbo:w,texture:S,width:s,height:i}}release(s){const i=`${s.width}x${s.height}`,a=this.pool.get(i);if(!a)return;const p=a.find(h=>h.fbo===s.fbo);p&&(p.inUse=!1)}handleResize(){const{gl:s}=this;for(const i of this.pool.values())for(const a of i)s.deleteFramebuffer(a.fbo),s.deleteTexture(a.texture);this.pool.clear()}dispose(){this.handleResize()}}class ud{constructor(s){N(this,"canvas");N(this,"state",{mouse:{x:.5,y:.5,px:0,py:0,down:!1,button:0,dx:0,dy:0},keys:new Set,touches:[]});N(this,"prevMx",0);N(this,"prevMy",0);N(this,"bound",!1);N(this,"handlers",[]);N(this,"audioContext",null);N(this,"analyser",null);N(this,"fftData",null);N(this,"audioSource",null);N(this,"audioEnabled",!1);N(this,"midiAccess",null);N(this,"midiValues",new Map);N(this,"midiEnabled",!1);N(this,"handleMIDIMessage",s=>{const i=s.data;if(!i||i.length<3)return;if((i[0]&240)===176){const p=i[1],h=i[2]/127;this.midiValues.set(p,h)}});this.canvas=s}attach(){if(this.bound)return;this.bound=!0;const s=(i,a,p)=>{i.addEventListener(a,p),this.handlers.push([a,p,i])};s(this.canvas,"mousemove",i=>{const a=i,p=this.canvas.getBoundingClientRect();this.state.mouse.px=a.clientX-p.left,this.state.mouse.py=a.clientY-p.top,this.state.mouse.x=this.state.mouse.px/p.width,this.state.mouse.y=1-this.state.mouse.py/p.height}),s(this.canvas,"mousedown",i=>{const a=i;this.state.mouse.down=!0,this.state.mouse.button=a.button}),s(this.canvas,"mouseup",()=>{this.state.mouse.down=!1}),s(this.canvas,"mouseleave",()=>{this.state.mouse.down=!1}),s(window,"keydown",i=>{this.state.keys.add(i.code)}),s(window,"keyup",i=>{this.state.keys.delete(i.code)}),s(this.canvas,"touchstart",i=>{i.preventDefault(),this.updateTouches(i)}),s(this.canvas,"touchmove",i=>{i.preventDefault(),this.updateTouches(i)}),s(this.canvas,"touchend",i=>{this.updateTouches(i)}),s(this.canvas,"contextmenu",i=>i.preventDefault())}updateTouches(s){const i=this.canvas.getBoundingClientRect();if(this.state.touches=Array.from(s.touches).map(a=>({id:a.identifier,x:(a.clientX-i.left)/i.width,y:1-(a.clientY-i.top)/i.height})),s.touches.length>0){const a=s.touches[0];this.state.mouse.px=a.clientX-i.left,this.state.mouse.py=a.clientY-i.top,this.state.mouse.x=this.state.mouse.px/i.width,this.state.mouse.y=1-this.state.mouse.py/i.height,this.state.mouse.down=!0}else this.state.mouse.down=!1}async enableAudio(){if(!this.audioEnabled)try{this.audioContext=new AudioContext,this.analyser=this.audioContext.createAnalyser(),this.analyser.fftSize=256,this.analyser.smoothingTimeConstant=.8,this.fftData=new Float32Array(this.analyser.frequencyBinCount);const s=await navigator.mediaDevices.getUserMedia({audio:!0});this.audioSource=this.audioContext.createMediaStreamSource(s),this.audioSource.connect(this.analyser),this.audioEnabled=!0}catch(s){console.warn("Audio input not available:",s)}}disableAudio(){this.audioSource&&(this.audioSource.disconnect(),this.audioSource.mediaStream.getTracks().forEach(s=>s.stop()),this.audioSource=null),this.audioContext&&(this.audioContext.close(),this.audioContext=null),this.analyser=null,this.fftData=null,this.audioEnabled=!1,delete this.state.audioFFT}async enableMIDI(){if(!this.midiEnabled)try{this.midiAccess=await navigator.requestMIDIAccess(),this.midiAccess.inputs.forEach(s=>{s.onmidimessage=this.handleMIDIMessage}),this.midiAccess.onstatechange=()=>{var s;(s=this.midiAccess)==null||s.inputs.forEach(i=>{i.onmidimessage=this.handleMIDIMessage})},this.midiEnabled=!0,this.state.midiCC=this.midiValues}catch(s){console.warn("MIDI not available:",s)}}disableMIDI(){this.midiAccess&&this.midiAccess.inputs.forEach(s=>{s.onmidimessage=null}),this.midiAccess=null,this.midiValues.clear(),this.midiEnabled=!1,delete this.state.midiCC}poll(){return this.state.mouse.dx=this.state.mouse.x-this.prevMx,this.state.mouse.dy=this.state.mouse.y-this.prevMy,this.prevMx=this.state.mouse.x,this.prevMy=this.state.mouse.y,this.analyser&&this.fftData&&(this.analyser.getFloatFrequencyData(this.fftData),this.state.audioFFT=this.fftData),this.state}detach(){for(const[s,i,a]of this.handlers)a.removeEventListener(s,i);this.handlers=[],this.bound=!1,this.disableAudio(),this.disableMIDI()}}class sd{constructor(){N(this,"values",new Map);N(this,"descriptors",new Map);N(this,"listeners",new Set);N(this,"version",0);N(this,"subscribe",s=>(this.listeners.add(s),()=>this.listeners.delete(s)));N(this,"getSnapshot",()=>this.version)}registerEffect(s,i){this.descriptors.set(s,i);const a=new Map;for(const p of i.parameters)a.set(p.id,p.default);this.values.set(s,a),this.notify()}unregisterEffect(s){this.values.delete(s),this.descriptors.delete(s),this.notify()}setValue(s,i,a){const p=this.values.get(s);p&&(p.set(i,a),this.notify())}getValues(s){const i=this.values.get(s);if(!i)return{};const a={};for(const[p,h]of i)a[p]=h;return a}getDescriptor(s){return this.descriptors.get(s)}getAllInstanceIds(){return Array.from(this.descriptors.keys())}setValues(s,i){const a=this.values.get(s);if(a){for(const[p,h]of Object.entries(i))a.set(p,h);this.notify()}}serialize(){const s={};for(const[i,a]of this.values)s[i]=this.getValues(i);return s}notify(){this.version++;for(const s of this.listeners)s()}}const ad=/#include\s+<(.+?)>/g;class fn{constructor(s,i,a,p){N(this,"program");N(this,"gl");N(this,"uniformCache",new Map);this.gl=s;const h=fn.preprocess(i,p),w=fn.preprocess(a,p),S=fn.compile(s,s.VERTEX_SHADER,h),F=fn.compile(s,s.FRAGMENT_SHADER,w),d=s.createProgram();if(!d)throw new Error("Failed to create program");if(s.attachShader(d,S),s.attachShader(d,F),s.linkProgram(d),s.deleteShader(S),s.deleteShader(F),!s.getProgramParameter(d,s.LINK_STATUS)){const M=s.getProgramInfoLog(d);throw s.deleteProgram(d),new Error(`Program link failed: ${M}`)}this.program=d}static preprocess(s,i){return i?s.replace(ad,(a,p)=>{const h=i.get(p);return h===void 0?(console.warn(`Shader include not found: ${p}`),""):h}):s}static compile(s,i,a){const p=s.createShader(i);if(!p)throw new Error("Failed to create shader");if(s.shaderSource(p,a),s.compileShader(p),!s.getShaderParameter(p,s.COMPILE_STATUS)){const h=s.getShaderInfoLog(p),w=i===s.VERTEX_SHADER?"vertex":"fragment";throw s.deleteShader(p),new Error(`${w} shader compile failed:
${h}

Source:
${a}`)}return p}use(){this.gl.useProgram(this.program)}loc(s){let i=this.uniformCache.get(s);return i===void 0&&(i=this.gl.getUniformLocation(this.program,s),this.uniformCache.set(s,i)),i}setFloat(s,i){const a=this.loc(s);a&&this.gl.uniform1f(a,i)}setInt(s,i){const a=this.loc(s);a&&this.gl.uniform1i(a,i)}setVec2(s,i,a){const p=this.loc(s);p&&this.gl.uniform2f(p,i,a)}setVec3(s,i,a,p){const h=this.loc(s);h&&this.gl.uniform3f(h,i,a,p)}setVec4(s,i,a,p,h){const w=this.loc(s);w&&this.gl.uniform4f(w,i,a,p,h)}setTexture(s,i,a){this.gl.activeTexture(this.gl.TEXTURE0+a),this.gl.bindTexture(this.gl.TEXTURE_2D,i);const p=this.loc(s);p&&this.gl.uniform1i(p,a)}dispose(){this.gl.deleteProgram(this.program)}}const cd=`// Simplex 2D noise - adapted from Ashima Arts
vec3 mod289(vec3 x) { return x - floor(x * (1.0 / 289.0)) * 289.0; }
vec2 mod289(vec2 x) { return x - floor(x * (1.0 / 289.0)) * 289.0; }
vec3 permute(vec3 x) { return mod289(((x * 34.0) + 10.0) * x); }

float snoise(vec2 v) {
    const vec4 C = vec4(0.211324865405187, 0.366025403784439,
                        -0.577350269189626, 0.024390243902439);
    vec2 i  = floor(v + dot(v, C.yy));
    vec2 x0 = v - i + dot(i, C.xx);
    vec2 i1 = (x0.x > x0.y) ? vec2(1.0, 0.0) : vec2(0.0, 1.0);
    vec4 x12 = x0.xyxy + C.xxzz;
    x12.xy -= i1;
    i = mod289(i);
    vec3 p = permute(permute(i.y + vec3(0.0, i1.y, 1.0))
                            + i.x + vec3(0.0, i1.x, 1.0));
    vec3 m = max(0.5 - vec3(dot(x0, x0), dot(x12.xy, x12.xy),
                             dot(x12.zw, x12.zw)), 0.0);
    m = m * m;
    m = m * m;
    vec3 x = 2.0 * fract(p * C.www) - 1.0;
    vec3 h = abs(x) - 0.5;
    vec3 ox = floor(x + 0.5);
    vec3 a0 = x - ox;
    m *= 1.79284291400159 - 0.85373472095314 * (a0 * a0 + h * h);
    vec3 g;
    g.x = a0.x * x0.x + h.x * x0.y;
    g.yz = a0.yz * x12.xz + h.yz * x12.yw;
    return 130.0 * dot(m, g);
}

float fbm(vec2 p, int octaves, float lacunarity, float gain) {
    float sum = 0.0;
    float amp = 0.5;
    float freq = 1.0;
    for (int i = 0; i < 8; i++) {
        if (i >= octaves) break;
        sum += amp * snoise(p * freq);
        freq *= lacunarity;
        amp *= gain;
    }
    return sum;
}
`,fd=`vec3 hsv2rgb(vec3 c) {
    vec4 K = vec4(1.0, 2.0 / 3.0, 1.0 / 3.0, 3.0);
    vec3 p = abs(fract(c.xxx + K.xyz) * 6.0 - K.www);
    return c.z * mix(K.xxx, clamp(p - K.xxx, 0.0, 1.0), c.y);
}

vec3 rgb2hsv(vec3 c) {
    vec4 K = vec4(0.0, -1.0 / 3.0, 2.0 / 3.0, -1.0);
    vec4 p = mix(vec4(c.bg, K.wz), vec4(c.gb, K.xy), step(c.b, c.g));
    vec4 q = mix(vec4(p.xyw, c.r), vec4(c.r, p.yzx), step(p.x, c.r));
    float d = q.x - min(q.w, q.y);
    float e = 1.0e-10;
    return vec3(abs(q.z + (q.w - q.y) / (6.0 * d + e)), d / (q.x + e), q.x);
}

vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d) {
    return a + b * cos(6.28318 * (c * t + d));
}
`,dd=new Map([["noise.glsl",cd],["color-utils.glsl",fd]]);class Gt{constructor(){N(this,"shader",null);N(this,"outputTexture",null);N(this,"gl",null);N(this,"w",0);N(this,"h",0)}resize(s,i){this.w=s,this.h=i}dispose(){var s;(s=this.shader)==null||s.dispose(),this.shader=null}getOutputTexture(s){return this.outputTexture}createShader(s,i,a){return new fn(s,i,a,dd)}}const Kt=`#version 300 es

const vec2 positions[6] = vec2[](
    vec2(-1, -1), vec2(1, -1), vec2(-1, 1),
    vec2(-1, 1), vec2(1, -1), vec2(1, 1)
);

void main() {
    gl_Position = vec4(positions[gl_VertexID], 0.0, 1.0);
}
`,pd=`#version 300 es
precision highp float;

uniform float u_time;
uniform vec2 u_resolution;
uniform vec2 u_mouse;
uniform float u_speed;
uniform float u_scale;
uniform int u_octaves;
uniform float u_lacunarity;
uniform float u_gain;
uniform vec4 u_color1;
uniform vec4 u_color2;
uniform float u_mouseInfluence;
uniform float u_distortion;
uniform float u_brightness;

uniform sampler2D u_inputTexture;
uniform int u_hasInput;

out vec4 fragColor;

#include <noise.glsl>

void main() {
    vec2 uv = gl_FragCoord.xy / u_resolution;
    vec2 p = uv * u_scale;

    // Mouse influence — distort the noise space
    vec2 mouseUV = u_mouse;
    float mouseDist = length(uv - mouseUV);
    float mouseEffect = u_mouseInfluence * exp(-mouseDist * 4.0);
    p += mouseEffect * (uv - mouseUV) * u_distortion;

    // Animated FBM noise
    float t = u_time * u_speed;
    float n1 = fbm(p + vec2(t * 0.3, t * 0.1), u_octaves, u_lacunarity, u_gain);
    float n2 = fbm(p + vec2(n1 * 1.5, t * 0.2), u_octaves, u_lacunarity, u_gain);

    // Flow distortion
    float flow = fbm(p + vec2(n2 * u_distortion, n1 * u_distortion) + vec2(t * 0.1), u_octaves, u_lacunarity, u_gain);

    // Map to color
    float val = flow * 0.5 + 0.5;
    val = clamp(val * u_brightness, 0.0, 1.0);
    vec4 color = mix(u_color1, u_color2, val);

    // Add subtle iridescence
    float hueShift = snoise(p * 0.5 + t * 0.05) * 0.1;
    color.rgb = mix(color.rgb, color.gbr, hueShift + 0.5);

    // Blend with input texture if present
    if (u_hasInput == 1) {
        vec4 inputColor = texture(u_inputTexture, uv);
        color = mix(inputColor, color, 0.7);
    }

    fragColor = color;
}
`,md={id:"noise-flow-field",name:"Noise Flow Field",description:"Simplex noise driven flow field with configurable turbulence",parameters:[{id:"speed",type:"float",label:"Flow Speed",min:0,max:5,step:.01,default:.8,group:"Motion"},{id:"scale",type:"float",label:"Noise Scale",min:.1,max:20,step:.1,default:4,group:"Shape"},{id:"octaves",type:"int",label:"Octaves",min:1,max:8,default:4,group:"Shape"},{id:"lacunarity",type:"float",label:"Lacunarity",min:1,max:4,step:.01,default:2,group:"Shape"},{id:"gain",type:"float",label:"Gain",min:.1,max:1,step:.01,default:.5,group:"Shape"},{id:"distortion",type:"float",label:"Distortion",min:0,max:5,step:.01,default:1.5,group:"Shape"},{id:"brightness",type:"float",label:"Brightness",min:.1,max:3,step:.01,default:1.2,group:"Color"},{id:"color1",type:"color",label:"Color A",default:[.05,.1,.35,1],group:"Color"},{id:"color2",type:"color",label:"Color B",default:[.95,.4,.1,1],group:"Color"},{id:"mouseInfluence",type:"float",label:"Mouse Influence",min:0,max:2,step:.01,default:.5,group:"Interaction"}],inputs:[{id:"input0",label:"Background",type:"texture"}],outputs:[{id:"output0",label:"Result",type:"texture"}]};class hd extends Gt{constructor(){super(...arguments);N(this,"descriptor",md)}init(i){this.gl=i,this.shader=this.createShader(i,Kt,pd)}render(i,a,p){const{gl:h,time:w,resolution:S,input:F}=i,d=this.shader;d.use(),d.setFloat("u_time",w),d.setVec2("u_resolution",S[0],S[1]),d.setVec2("u_mouse",F.mouse.x,F.mouse.y),d.setFloat("u_speed",a.speed),d.setFloat("u_scale",a.scale),d.setInt("u_octaves",a.octaves),d.setFloat("u_lacunarity",a.lacunarity),d.setFloat("u_gain",a.gain),d.setFloat("u_distortion",a.distortion),d.setFloat("u_brightness",a.brightness),d.setFloat("u_mouseInfluence",a.mouseInfluence);const M=a.color1;d.setVec4("u_color1",M[0],M[1],M[2],M[3]);const P=a.color2;d.setVec4("u_color2",P[0],P[1],P[2],P[3]);const W=p.get("input0");W?(d.setTexture("u_inputTexture",W,0),d.setInt("u_hasInput",1)):d.setInt("u_hasInput",0),h.drawArrays(h.TRIANGLES,0,6)}}const vd=`#version 300 es
precision highp float;

uniform float u_time;
uniform vec2 u_resolution;
uniform vec2 u_mouse;
uniform float u_zoom;
uniform vec2 u_center;
uniform int u_maxIterations;
uniform float u_escapeRadius;
uniform float u_colorSpeed;
uniform float u_colorOffset;
uniform vec4 u_innerColor;
uniform float u_mouseInfluence;
uniform int u_juliaMode;
uniform vec2 u_juliaC;
uniform float u_power;

uniform sampler2D u_inputTexture;
uniform int u_hasInput;

out vec4 fragColor;

#include <color-utils.glsl>

void main() {
    vec2 uv = gl_FragCoord.xy / u_resolution;
    float aspect = u_resolution.x / u_resolution.y;

    // Map UV to complex plane
    vec2 c;
    vec2 z;

    vec2 pos = (uv - 0.5) * 2.0;
    pos.x *= aspect;
    pos /= u_zoom;
    pos += u_center;

    // Mouse influence - shift the view
    vec2 mouseShift = (u_mouse - 0.5) * u_mouseInfluence / u_zoom;
    pos += mouseShift;

    if (u_juliaMode == 1) {
        z = pos;
        c = u_juliaC;
    } else {
        z = vec2(0.0);
        c = pos;
    }

    // Iterate
    float iter = 0.0;
    for (int i = 0; i < 1000; i++) {
        if (i >= u_maxIterations) break;
        if (dot(z, z) > u_escapeRadius * u_escapeRadius) break;

        // z = z^power + c (generalized)
        if (u_power == 2.0) {
            z = vec2(z.x * z.x - z.y * z.y, 2.0 * z.x * z.y) + c;
        } else {
            float r = length(z);
            float theta = atan(z.y, z.x);
            float rn = pow(r, u_power);
            float tn = theta * u_power;
            z = vec2(rn * cos(tn), rn * sin(tn)) + c;
        }
        iter += 1.0;
    }

    vec4 color;
    if (iter >= float(u_maxIterations)) {
        color = u_innerColor;
    } else {
        // Smooth iteration count
        float smoothIter = iter - log2(log2(dot(z, z))) + 4.0;
        float t = smoothIter * u_colorSpeed * 0.01 + u_colorOffset + u_time * 0.05;

        // Palette-based coloring
        vec3 col = palette(
            fract(t),
            vec3(0.5, 0.5, 0.5),
            vec3(0.5, 0.5, 0.5),
            vec3(1.0, 1.0, 1.0),
            vec3(0.0, 0.33, 0.67)
        );
        color = vec4(col, 1.0);
    }

    if (u_hasInput == 1) {
        vec4 inputColor = texture(u_inputTexture, uv);
        color = mix(inputColor, color, 0.8);
    }

    fragColor = color;
}
`,gd={id:"fractal-explorer",name:"Fractal Explorer",description:"Interactive Mandelbrot and Julia set explorer",parameters:[{id:"zoom",type:"float",label:"Zoom",min:.1,max:1e3,step:.1,default:1,group:"View"},{id:"centerX",type:"float",label:"Center X",min:-3,max:3,step:.001,default:-.5,group:"View"},{id:"centerY",type:"float",label:"Center Y",min:-3,max:3,step:.001,default:0,group:"View"},{id:"maxIterations",type:"int",label:"Max Iterations",min:10,max:1e3,default:200,group:"Quality"},{id:"escapeRadius",type:"float",label:"Escape Radius",min:2,max:100,step:.1,default:4,group:"Quality"},{id:"power",type:"float",label:"Power",min:2,max:8,step:.1,default:2,group:"Shape"},{id:"juliaMode",type:"bool",label:"Julia Mode",default:!1,group:"Shape"},{id:"juliaCx",type:"float",label:"Julia C.x",min:-2,max:2,step:.001,default:-.7,group:"Shape"},{id:"juliaCy",type:"float",label:"Julia C.y",min:-2,max:2,step:.001,default:.27015,group:"Shape"},{id:"colorSpeed",type:"float",label:"Color Speed",min:.1,max:20,step:.1,default:3,group:"Color"},{id:"colorOffset",type:"float",label:"Color Offset",min:0,max:1,step:.01,default:0,group:"Color"},{id:"innerColor",type:"color",label:"Inner Color",default:[0,0,0,1],group:"Color"},{id:"mouseInfluence",type:"float",label:"Mouse Influence",min:0,max:2,step:.01,default:.3,group:"Interaction"}],inputs:[{id:"input0",label:"Background",type:"texture"}],outputs:[{id:"output0",label:"Result",type:"texture"}]};class yd extends Gt{constructor(){super(...arguments);N(this,"descriptor",gd)}init(i){this.gl=i,this.shader=this.createShader(i,Kt,vd)}render(i,a,p){const{gl:h,time:w,resolution:S,input:F}=i,d=this.shader;d.use(),d.setFloat("u_time",w),d.setVec2("u_resolution",S[0],S[1]),d.setVec2("u_mouse",F.mouse.x,F.mouse.y),d.setFloat("u_zoom",a.zoom),d.setVec2("u_center",a.centerX,a.centerY),d.setInt("u_maxIterations",a.maxIterations),d.setFloat("u_escapeRadius",a.escapeRadius),d.setFloat("u_power",a.power),d.setInt("u_juliaMode",a.juliaMode?1:0),d.setVec2("u_juliaC",a.juliaCx,a.juliaCy),d.setFloat("u_colorSpeed",a.colorSpeed),d.setFloat("u_colorOffset",a.colorOffset),d.setFloat("u_mouseInfluence",a.mouseInfluence);const M=a.innerColor;d.setVec4("u_innerColor",M[0],M[1],M[2],M[3]);const P=p.get("input0");P?(d.setTexture("u_inputTexture",P,0),d.setInt("u_hasInput",1)):d.setInt("u_hasInput",0),h.drawArrays(h.TRIANGLES,0,6)}}const xd=`#version 300 es

layout(location = 0) in vec2 a_position;
layout(location = 1) in float a_life;
layout(location = 2) in float a_size;

out float v_life;

uniform vec2 u_resolution;
uniform float u_pointScale;

void main() {
    // Map from 0-1 to clip space -1 to 1
    vec2 clipPos = a_position * 2.0 - 1.0;
    gl_Position = vec4(clipPos, 0.0, 1.0);
    gl_PointSize = a_size * u_pointScale * (0.3 + a_life * 0.7);
    v_life = a_life;
}
`,_d=`#version 300 es
precision highp float;

in float v_life;

uniform vec4 u_colorBirth;
uniform vec4 u_colorDeath;
uniform int u_hasInput;
uniform sampler2D u_inputTexture;
uniform vec2 u_resolution;

out vec4 fragColor;

void main() {
    // Soft circle
    vec2 center = gl_PointCoord - 0.5;
    float dist = length(center);
    if (dist > 0.5) discard;

    float alpha = smoothstep(0.5, 0.2, dist) * v_life;
    vec4 color = mix(u_colorDeath, u_colorBirth, v_life);
    color.a *= alpha;

    // Additive blending contribution
    fragColor = color;
}
`,wd=typeof navigator<"u"&&/Mobi|Android/i.test(navigator.userAgent),On=wd?15e3:5e4,Al=0,Ol=1,Bi=2,Vi=3,jl=4,Wi=5,Ul=6,bi=4,Sd={id:"particle-system",name:"Particle System",description:"Particle system with mouse interaction",parameters:[{id:"speed",type:"float",label:"Speed",min:.1,max:5,step:.01,default:1,group:"Motion"},{id:"mouseAttract",type:"float",label:"Mouse Attract",min:-2,max:2,step:.01,default:.5,group:"Interaction"},{id:"turbulence",type:"float",label:"Turbulence",min:0,max:3,step:.01,default:.5,group:"Motion"},{id:"damping",type:"float",label:"Damping",min:0,max:5,step:.01,default:1,group:"Motion"},{id:"lifeDecay",type:"float",label:"Life Decay",min:.05,max:3,step:.01,default:.4,group:"Lifecycle"},{id:"pointScale",type:"float",label:"Point Scale",min:.5,max:10,step:.1,default:3,group:"Appearance"},{id:"colorBirth",type:"color",label:"Birth Color",default:[1,.8,.3,1],group:"Color"},{id:"colorDeath",type:"color",label:"Death Color",default:[.2,.05,.5,0],group:"Color"}],inputs:[{id:"input0",label:"Background",type:"texture"}],outputs:[{id:"output0",label:"Result",type:"texture"}]};class Cd{constructor(){N(this,"descriptor",Sd);N(this,"gl",null);N(this,"renderProgram",null);N(this,"vbo",null);N(this,"vao",null);N(this,"outputTexture",null);N(this,"particles",null);N(this,"renderData",null)}init(s){this.gl=s,this.renderProgram=new fn(s,xd,_d),this.particles=new Float32Array(On*Ul),this.renderData=new Float32Array(On*bi);for(let a=0;a<On;a++){const p=a*Ul;this.particles[p+Al]=Math.random(),this.particles[p+Ol]=Math.random(),this.particles[p+Bi]=(Math.random()-.5)*.2,this.particles[p+Vi]=(Math.random()-.5)*.2,this.particles[p+jl]=Math.random(),this.particles[p+Wi]=1+Math.random()*3}this.vbo=s.createBuffer(),s.bindBuffer(s.ARRAY_BUFFER,this.vbo),s.bufferData(s.ARRAY_BUFFER,this.renderData.byteLength,s.DYNAMIC_DRAW),this.vao=s.createVertexArray(),s.bindVertexArray(this.vao),s.bindBuffer(s.ARRAY_BUFFER,this.vbo);const i=bi*4;s.enableVertexAttribArray(0),s.vertexAttribPointer(0,2,s.FLOAT,!1,i,0),s.enableVertexAttribArray(1),s.vertexAttribPointer(1,1,s.FLOAT,!1,i,8),s.enableVertexAttribArray(2),s.vertexAttribPointer(2,1,s.FLOAT,!1,i,12),s.bindVertexArray(null)}simulate(s,i,a,p){const h=this.particles,w=p.speed,S=p.mouseAttract,F=p.turbulence,d=p.damping,M=p.lifeDecay,P=s*w;for(let q=0;q<On;q++){const G=q*Ul;let b=h[G+Al],$=h[G+Ol],oe=h[G+Bi],ue=h[G+Vi],ge=h[G+jl];const ie=i-b,Te=a-$,ce=Math.sqrt(ie*ie+Te*Te)+.001,_e=S*P/(ce*5+.1);oe+=ie/ce*_e,ue+=Te/ce*_e;const Ae=Math.sin(b*12.9898+$*78.233+q*.01)*43758.5453%6.28318;oe+=Math.cos(Ae)*F*P,ue+=Math.sin(Ae)*F*P;const lt=1-d*P;oe*=lt,ue*=lt,b+=oe*P,$+=ue*P,ge-=M*P,ge<=0&&(b=i+(Math.random()-.5)*.05,$=a+(Math.random()-.5)*.05,oe=(Math.random()-.5)*.3,ue=(Math.random()-.5)*.3,ge=.5+Math.random()*.5,h[G+Wi]=1+Math.random()*3),b=(b%1+1)%1,$=($%1+1)%1,h[G+Al]=b,h[G+Ol]=$,h[G+Bi]=oe,h[G+Vi]=ue,h[G+jl]=ge}const W=this.renderData;for(let q=0;q<On;q++){const G=q*Ul,b=q*bi;W[b]=h[G+Al],W[b+1]=h[G+Ol],W[b+2]=h[G+jl],W[b+3]=h[G+Wi]}}render(s,i,a){const p=this.gl;this.simulate(s.deltaTime,s.input.mouse.x,s.input.mouse.y,i),p.bindBuffer(p.ARRAY_BUFFER,this.vbo),p.bufferSubData(p.ARRAY_BUFFER,0,this.renderData),p.clearColor(.02,.02,.04,1),p.clear(p.COLOR_BUFFER_BIT),p.enable(p.BLEND),p.blendFunc(p.SRC_ALPHA,p.ONE);const h=this.renderProgram;h.use(),h.setVec2("u_resolution",s.resolution[0],s.resolution[1]),h.setFloat("u_pointScale",i.pointScale);const w=i.colorBirth;h.setVec4("u_colorBirth",w[0],w[1],w[2],w[3]);const S=i.colorDeath;h.setVec4("u_colorDeath",S[0],S[1],S[2],S[3]),p.bindVertexArray(this.vao),p.drawArrays(p.POINTS,0,On),p.bindVertexArray(null),p.disable(p.BLEND)}resize(s,i){}dispose(){var i;const s=this.gl;s&&((i=this.renderProgram)==null||i.dispose(),this.vbo&&s.deleteBuffer(this.vbo),this.vao&&s.deleteVertexArray(this.vao),this.particles=null,this.renderData=null)}getOutputTexture(s){return this.outputTexture}}const kd=`#version 300 es
precision highp float;

uniform vec2 u_resolution;
uniform float u_decay;
uniform float u_zoom;
uniform float u_rotation;
uniform float u_colorShiftSpeed;
uniform float u_time;
uniform float u_blurAmount;
uniform vec4 u_tintColor;
uniform float u_tintStrength;
uniform float u_mirror;

uniform sampler2D u_prevFrame;
uniform sampler2D u_inputTexture;
uniform int u_hasInput;

out vec4 fragColor;

#include <color-utils.glsl>

void main() {
    vec2 uv = gl_FragCoord.xy / u_resolution;
    vec2 center = vec2(0.5);

    // Apply zoom and rotation to sample previous frame
    vec2 p = uv - center;

    // Zoom toward center
    p *= u_zoom;

    // Rotate
    float s = sin(u_rotation);
    float c = cos(u_rotation);
    p = vec2(p.x * c - p.y * s, p.x * s + p.y * c);

    // Mirror
    if (u_mirror > 0.5) {
        p = abs(p);
    }

    p += center;

    // Sample previous frame with slight blur
    vec4 prev = vec4(0.0);
    if (u_blurAmount > 0.001) {
        vec2 texel = 1.0 / u_resolution;
        float b = u_blurAmount;
        prev += texture(u_prevFrame, p) * 0.4;
        prev += texture(u_prevFrame, p + vec2(texel.x * b, 0.0)) * 0.15;
        prev += texture(u_prevFrame, p - vec2(texel.x * b, 0.0)) * 0.15;
        prev += texture(u_prevFrame, p + vec2(0.0, texel.y * b)) * 0.15;
        prev += texture(u_prevFrame, p - vec2(0.0, texel.y * b)) * 0.15;
    } else {
        prev = texture(u_prevFrame, p);
    }

    // Decay
    prev *= u_decay;

    // Color shift
    if (u_colorShiftSpeed > 0.001) {
        vec3 hsv = rgb2hsv(prev.rgb);
        hsv.x = fract(hsv.x + u_colorShiftSpeed * 0.01);
        prev.rgb = hsv2rgb(hsv);
    }

    // Tint
    prev.rgb = mix(prev.rgb, u_tintColor.rgb * prev.a, u_tintStrength);

    // Composite with input
    vec4 color = prev;
    if (u_hasInput == 1) {
        vec4 inputColor = texture(u_inputTexture, uv);
        // Additive blend the input on top of the feedback
        color.rgb = max(color.rgb, inputColor.rgb);
        color.a = max(color.a, inputColor.a);
    }

    fragColor = color;
}
`,Ed={id:"feedback-echo",name:"Feedback Echo",description:"Frame-buffer feedback with decay, zoom, rotation, and color shifting",parameters:[{id:"decay",type:"float",label:"Decay",min:.8,max:1,step:.001,default:.97,group:"Feedback"},{id:"zoom",type:"float",label:"Zoom",min:.95,max:1.05,step:.001,default:.995,group:"Transform"},{id:"rotation",type:"float",label:"Rotation",min:-.1,max:.1,step:1e-4,default:.003,group:"Transform"},{id:"blurAmount",type:"float",label:"Blur",min:0,max:5,step:.1,default:1,group:"Feedback"},{id:"colorShiftSpeed",type:"float",label:"Color Shift",min:0,max:5,step:.01,default:.5,group:"Color"},{id:"tintColor",type:"color",label:"Tint Color",default:[.3,.1,.8,1],group:"Color"},{id:"tintStrength",type:"float",label:"Tint Strength",min:0,max:.5,step:.01,default:.02,group:"Color"},{id:"mirror",type:"bool",label:"Mirror",default:!1,group:"Transform"}],inputs:[{id:"input0",label:"Input",type:"texture"}],outputs:[{id:"output0",label:"Result",type:"texture"}]};class Td extends Gt{constructor(){super(...arguments);N(this,"descriptor",Ed);N(this,"fboA",null);N(this,"fboB",null);N(this,"texA",null);N(this,"texB",null);N(this,"pingPong",0)}init(i){this.gl=i,this.shader=this.createShader(i,Kt,kd)}resize(i,a){super.resize(i,a),this.createFBOs()}createFBOs(){const i=this.gl;this.fboA&&i.deleteFramebuffer(this.fboA),this.fboB&&i.deleteFramebuffer(this.fboB),this.texA&&i.deleteTexture(this.texA),this.texB&&i.deleteTexture(this.texB);const a=()=>{const w=i.createTexture();i.bindTexture(i.TEXTURE_2D,w),i.texImage2D(i.TEXTURE_2D,0,i.RGBA16F,this.w,this.h,0,i.RGBA,i.FLOAT,null),i.texParameteri(i.TEXTURE_2D,i.TEXTURE_MIN_FILTER,i.LINEAR),i.texParameteri(i.TEXTURE_2D,i.TEXTURE_MAG_FILTER,i.LINEAR),i.texParameteri(i.TEXTURE_2D,i.TEXTURE_WRAP_S,i.CLAMP_TO_EDGE),i.texParameteri(i.TEXTURE_2D,i.TEXTURE_WRAP_T,i.CLAMP_TO_EDGE);const S=i.createFramebuffer();return i.bindFramebuffer(i.FRAMEBUFFER,S),i.framebufferTexture2D(i.FRAMEBUFFER,i.COLOR_ATTACHMENT0,i.TEXTURE_2D,w,0),i.bindFramebuffer(i.FRAMEBUFFER,null),{fbo:S,tex:w}},p=a(),h=a();this.fboA=p.fbo,this.texA=p.tex,this.fboB=h.fbo,this.texB=h.tex}render(i,a,p){const h=this.gl;if(!this.fboA||!this.fboB)return;const w=this.shader,S=this.pingPong===0?this.texA:this.texB,F=this.pingPong===0?this.fboB:this.fboA,d=this.pingPong===0?this.texB:this.texA;h.bindFramebuffer(h.FRAMEBUFFER,F),h.viewport(0,0,this.w,this.h),w.use(),w.setVec2("u_resolution",this.w,this.h),w.setFloat("u_time",i.time),w.setFloat("u_decay",a.decay),w.setFloat("u_zoom",a.zoom),w.setFloat("u_rotation",a.rotation),w.setFloat("u_blurAmount",a.blurAmount),w.setFloat("u_colorShiftSpeed",a.colorShiftSpeed),w.setFloat("u_tintStrength",a.tintStrength),w.setFloat("u_mirror",a.mirror?1:0);const M=a.tintColor;w.setVec4("u_tintColor",M[0],M[1],M[2],M[3]),w.setTexture("u_prevFrame",S,0);const P=p.get("input0");P?(w.setTexture("u_inputTexture",P,1),w.setInt("u_hasInput",1)):w.setInt("u_hasInput",0),h.drawArrays(h.TRIANGLES,0,6),this.outputTexture=d,this.pingPong=1-this.pingPong}dispose(){super.dispose();const i=this.gl;i&&(this.fboA&&i.deleteFramebuffer(this.fboA),this.fboB&&i.deleteFramebuffer(this.fboB),this.texA&&i.deleteTexture(this.texA),this.texB&&i.deleteTexture(this.texB))}}const Rd=`#version 300 es
precision highp float;

uniform float u_time;
uniform vec2 u_resolution;
uniform vec2 u_mouse;
uniform int u_segments;
uniform float u_rotation;
uniform float u_zoom;
uniform float u_spiralAmount;
uniform float u_colorCycle;
uniform float u_mouseInfluence;
uniform float u_patternSpeed;
uniform int u_patternType;
uniform float u_brightness;

uniform sampler2D u_inputTexture;
uniform int u_hasInput;

out vec4 fragColor;

#include <noise.glsl>
#include <color-utils.glsl>

vec3 generatePattern(vec2 p, float t) {
    vec3 col;

    if (u_patternType == 0) {
        // Flowing plasma
        float n = fbm(p * 2.0 + t * 0.3, 4, 2.0, 0.5);
        float n2 = fbm(p * 3.0 - t * 0.2 + n, 3, 2.0, 0.5);
        col = palette(
            n2 * 0.5 + 0.5 + u_colorCycle * t * 0.1,
            vec3(0.5), vec3(0.5), vec3(1.0, 1.0, 0.5), vec3(0.8, 0.9, 0.3)
        );
    } else if (u_patternType == 1) {
        // Electric rings
        float r = length(p);
        float a = atan(p.y, p.x);
        float ring = sin(r * 10.0 - t * 2.0 + sin(a * 3.0) * 2.0);
        float n = snoise(p * 3.0 + t * 0.5);
        col = palette(
            ring * 0.5 + 0.5 + n * 0.2 + u_colorCycle * t * 0.1,
            vec3(0.5), vec3(0.5), vec3(1.0, 0.7, 0.4), vec3(0.0, 0.15, 0.2)
        );
        col *= 0.8 + ring * 0.4;
    } else {
        // Cellular
        vec2 ip = floor(p * 4.0);
        vec2 fp = fract(p * 4.0);
        float minDist = 1.0;
        for (int y = -1; y <= 1; y++) {
            for (int x = -1; x <= 1; x++) {
                vec2 neighbor = vec2(float(x), float(y));
                vec2 point = vec2(
                    snoise(ip + neighbor + t * 0.2) * 0.5 + 0.5,
                    snoise(ip + neighbor + t * 0.2 + 100.0) * 0.5 + 0.5
                );
                float d = length(fp - neighbor - point);
                minDist = min(minDist, d);
            }
        }
        col = palette(
            minDist + u_colorCycle * t * 0.1,
            vec3(0.5), vec3(0.5), vec3(2.0, 1.0, 0.0), vec3(0.5, 0.2, 0.25)
        );
    }

    return col;
}

void main() {
    vec2 uv = gl_FragCoord.xy / u_resolution;
    float aspect = u_resolution.x / u_resolution.y;

    // Center and correct aspect ratio
    vec2 p = (uv - 0.5) * 2.0;
    p.x *= aspect;

    // Mouse influence
    vec2 mouseOffset = (u_mouse - 0.5) * u_mouseInfluence;
    p += mouseOffset;

    // Convert to polar
    float r = length(p);
    float a = atan(p.y, p.x);

    // Apply rotation
    a += u_rotation * u_time * 0.5;

    // Spiral distortion
    a += r * u_spiralAmount;

    // Kaleidoscope: fold angle into segment
    float segAngle = 3.14159265 * 2.0 / float(u_segments);
    a = mod(a, segAngle);
    // Mirror every other segment
    if (mod(floor(a / segAngle * float(u_segments)), 2.0) > 0.5) {
        a = segAngle - a;
    }
    a = abs(a);

    // Convert back to cartesian for pattern generation
    vec2 kp = vec2(cos(a), sin(a)) * r * u_zoom;

    float t = u_time * u_patternSpeed;
    vec3 color = generatePattern(kp, t);
    color *= u_brightness;

    // Vignette
    float vig = 1.0 - r * 0.3;
    color *= vig;

    // Blend with input if present
    if (u_hasInput == 1) {
        vec4 inputColor = texture(u_inputTexture, uv);
        color = mix(inputColor.rgb, color, 0.7);
    }

    fragColor = vec4(color, 1.0);
}
`,Fd={id:"kaleidoscope",name:"Kaleidoscope",description:"Symmetrical kaleidoscope with multiple pattern generators",parameters:[{id:"segments",type:"int",label:"Segments",min:2,max:24,default:8,group:"Shape"},{id:"rotation",type:"float",label:"Rotation",min:-2,max:2,step:.01,default:.3,group:"Shape"},{id:"zoom",type:"float",label:"Zoom",min:.2,max:5,step:.01,default:1.5,group:"Shape"},{id:"spiralAmount",type:"float",label:"Spiral",min:-5,max:5,step:.01,default:.5,group:"Shape"},{id:"patternType",type:"enum",label:"Pattern",options:[{value:"0",label:"Plasma"},{value:"1",label:"Electric Rings"},{value:"2",label:"Cellular"}],default:"0",group:"Pattern"},{id:"patternSpeed",type:"float",label:"Speed",min:0,max:3,step:.01,default:.8,group:"Pattern"},{id:"colorCycle",type:"float",label:"Color Cycle",min:0,max:5,step:.01,default:1,group:"Color"},{id:"brightness",type:"float",label:"Brightness",min:.2,max:2,step:.01,default:1,group:"Color"},{id:"mouseInfluence",type:"float",label:"Mouse Influence",min:0,max:2,step:.01,default:.5,group:"Interaction"}],inputs:[{id:"input0",label:"Background",type:"texture"}],outputs:[{id:"output0",label:"Result",type:"texture"}]};class Id extends Gt{constructor(){super(...arguments);N(this,"descriptor",Fd)}init(i){this.gl=i,this.shader=this.createShader(i,Kt,Rd)}render(i,a,p){const{gl:h,time:w,resolution:S,input:F}=i,d=this.shader;d.use(),d.setFloat("u_time",w),d.setVec2("u_resolution",S[0],S[1]),d.setVec2("u_mouse",F.mouse.x,F.mouse.y),d.setInt("u_segments",a.segments),d.setFloat("u_rotation",a.rotation),d.setFloat("u_zoom",a.zoom),d.setFloat("u_spiralAmount",a.spiralAmount),d.setInt("u_patternType",parseInt(a.patternType,10)),d.setFloat("u_patternSpeed",a.patternSpeed),d.setFloat("u_colorCycle",a.colorCycle),d.setFloat("u_brightness",a.brightness),d.setFloat("u_mouseInfluence",a.mouseInfluence);const M=p.get("input0");M?(d.setTexture("u_inputTexture",M,0),d.setInt("u_hasInput",1)):d.setInt("u_hasInput",0),h.drawArrays(h.TRIANGLES,0,6)}}const Pd=`#version 300 es
precision highp float;

uniform float u_time;
uniform vec2 u_resolution;
uniform vec2 u_mouse;
uniform float u_audioLevel;
uniform float u_bassLevel;
uniform float u_midLevel;
uniform float u_trebleLevel;
uniform float u_lineWidth;
uniform float u_glowIntensity;
uniform float u_waveAmplitude;
uniform float u_waveSpeed;
uniform int u_waveCount;
uniform float u_colorCycle;
uniform float u_mouseInfluence;
uniform int u_visualMode;

uniform sampler2D u_inputTexture;
uniform int u_hasInput;

out vec4 fragColor;

#include <noise.glsl>
#include <color-utils.glsl>

float sdLine(vec2 p, vec2 a, vec2 b) {
    vec2 pa = p - a;
    vec2 ba = b - a;
    float h = clamp(dot(pa, ba) / dot(ba, ba), 0.0, 1.0);
    return length(pa - ba * h);
}

void main() {
    vec2 uv = gl_FragCoord.xy / u_resolution;
    float aspect = u_resolution.x / u_resolution.y;
    vec2 p = uv;

    // Mouse influence
    p += (u_mouse - 0.5) * u_mouseInfluence * 0.1;

    vec3 totalColor = vec3(0.0);
    float audioBoost = 1.0 + u_audioLevel * 2.0;

    if (u_visualMode == 0) {
        // === Waveform lines ===
        for (int w = 0; w < 8; w++) {
            if (w >= u_waveCount) break;
            float wf = float(w);
            float phase = wf * 0.7 + u_time * u_waveSpeed * (0.5 + wf * 0.2);

            // Compute wave at this x
            float amp = u_waveAmplitude * (0.5 + wf * 0.15);
            // Modulate by audio bands
            amp *= 1.0 + u_bassLevel * 0.5 * step(wf, 2.0)
                       + u_midLevel * 0.5 * step(2.0, wf) * step(wf, 5.0)
                       + u_trebleLevel * 0.5 * step(5.0, wf);

            float waveY = 0.5;
            waveY += sin(p.x * (3.0 + wf) * 3.14159 + phase) * amp;
            waveY += snoise(vec2(p.x * 2.0 + phase * 0.3, wf)) * amp * 0.5;

            float dist = abs(p.y - waveY);
            float lineW = u_lineWidth * 0.003 * audioBoost;
            float line = smoothstep(lineW, 0.0, dist);

            // Glow
            float glow = exp(-dist * 80.0 / u_glowIntensity) * 0.5 * audioBoost;

            // Color per wave
            float hue = fract(wf * 0.12 + u_colorCycle * u_time * 0.05);
            vec3 waveColor = hsv2rgb(vec3(hue, 0.8, 1.0));

            totalColor += waveColor * (line + glow);
        }
    } else if (u_visualMode == 1) {
        // === Circular visualizer ===
        vec2 center = vec2(0.5 * aspect, 0.5);
        vec2 cp = vec2(p.x * aspect, p.y) - center;
        float r = length(cp);
        float a = atan(cp.y, cp.x);

        float baseRadius = 0.15 + u_audioLevel * 0.1;

        // Inner circle ring
        for (int w = 0; w < 4; w++) {
            if (w >= u_waveCount) break;
            float wf = float(w);
            float ringR = baseRadius + wf * 0.06;

            // Perturb the ring with audio
            float perturbation = sin(a * (8.0 + wf * 4.0) + u_time * u_waveSpeed) * 0.02;
            perturbation += snoise(vec2(a * 3.0, u_time * 0.5 + wf)) * 0.03;
            perturbation *= 1.0 + u_bassLevel * 2.0;
            ringR += perturbation * u_waveAmplitude;

            float dist = abs(r - ringR);
            float lineW = u_lineWidth * 0.002 * audioBoost;
            float line = smoothstep(lineW, 0.0, dist);
            float glow = exp(-dist * 100.0 / u_glowIntensity) * 0.4 * audioBoost;

            float hue = fract(wf * 0.2 + a / 6.28318 + u_colorCycle * u_time * 0.05);
            vec3 ringColor = hsv2rgb(vec3(hue, 0.7, 1.0));

            totalColor += ringColor * (line + glow);
        }

        // Center glow
        float centerGlow = exp(-r * 8.0) * u_audioLevel * 2.0;
        totalColor += vec3(0.5, 0.3, 1.0) * centerGlow;
    } else {
        // === Frequency bars ===
        float barCount = 32.0;
        float barWidth = aspect / barCount;
        float barIdx = floor(p.x * aspect / barWidth);
        float barCenter = (barIdx + 0.5) * barWidth / aspect;
        float barDist = abs(p.x - barCenter);

        // Simulate frequency data from audio levels
        float freq = barIdx / barCount;
        float barHeight;
        if (freq < 0.33) {
            barHeight = u_bassLevel * (0.5 + sin(freq * 20.0 + u_time) * 0.3);
        } else if (freq < 0.66) {
            barHeight = u_midLevel * (0.5 + sin(freq * 15.0 + u_time * 1.3) * 0.3);
        } else {
            barHeight = u_trebleLevel * (0.5 + sin(freq * 25.0 + u_time * 0.8) * 0.3);
        }
        barHeight = barHeight * u_waveAmplitude * 2.0 + 0.02;

        float inBar = step(barDist, barWidth * 0.4 / aspect) * step(p.y, barHeight);

        float hue = fract(freq + u_colorCycle * u_time * 0.05);
        vec3 barColor = hsv2rgb(vec3(hue, 0.7, 1.0));

        float glow = exp(-abs(p.y - barHeight) * 30.0) * step(barDist, barWidth * 0.5 / aspect) * u_glowIntensity * 0.3;

        totalColor += barColor * (inBar + glow);
    }

    // Background
    if (u_hasInput == 1) {
        vec4 inputColor = texture(u_inputTexture, uv);
        fragColor = vec4(inputColor.rgb + totalColor, 1.0);
    } else {
        vec3 bg = vec3(0.02, 0.02, 0.04);
        fragColor = vec4(bg + totalColor, 1.0);
    }
}
`,Nd={id:"audio-waveform",name:"Audio Waveform",description:"Audio-reactive visualizer with waveforms, circular, and bar modes",parameters:[{id:"visualMode",type:"enum",label:"Mode",options:[{value:"0",label:"Waveforms"},{value:"1",label:"Circular"},{value:"2",label:"Frequency Bars"}],default:"0",group:"Visualization"},{id:"waveCount",type:"int",label:"Wave Count",min:1,max:8,default:4,group:"Shape"},{id:"waveAmplitude",type:"float",label:"Amplitude",min:0,max:.5,step:.01,default:.15,group:"Shape"},{id:"waveSpeed",type:"float",label:"Speed",min:0,max:5,step:.01,default:1,group:"Shape"},{id:"lineWidth",type:"float",label:"Line Width",min:.5,max:5,step:.1,default:2,group:"Shape"},{id:"glowIntensity",type:"float",label:"Glow",min:0,max:3,step:.01,default:1,group:"Appearance"},{id:"colorCycle",type:"float",label:"Color Cycle",min:0,max:5,step:.01,default:1,group:"Color"},{id:"mouseInfluence",type:"float",label:"Mouse Influence",min:0,max:2,step:.01,default:.3,group:"Interaction"}],inputs:[{id:"input0",label:"Background",type:"texture"}],outputs:[{id:"output0",label:"Result",type:"texture"}]};class Md extends Gt{constructor(){super(...arguments);N(this,"descriptor",Nd)}init(i){this.gl=i,this.shader=this.createShader(i,Kt,Pd)}render(i,a,p){const{gl:h,time:w,resolution:S,input:F}=i,d=this.shader;d.use();let M=0,P=0,W=0,q=0;if(F.audioFFT){const b=F.audioFFT,$=b.length,oe=Math.floor($*.15),ue=Math.floor($*.5);let ge=0,ie=0,Te=0;for(let ce=0;ce<$;ce++){const _e=Math.max(0,(b[ce]+100)/100);ce<oe?ge+=_e:ce<ue?ie+=_e:Te+=_e}P=ge/oe,W=ie/(ue-oe),q=Te/($-ue),M=(P+W+q)/3}else P=.3+Math.sin(w*1.2)*.2+Math.sin(w*.5)*.15,W=.25+Math.sin(w*2.1)*.15+Math.sin(w*.8)*.1,q=.2+Math.sin(w*3.7)*.12+Math.sin(w*1.5)*.08,M=(P+W+q)/3;d.setFloat("u_time",w),d.setVec2("u_resolution",S[0],S[1]),d.setVec2("u_mouse",F.mouse.x,F.mouse.y),d.setFloat("u_audioLevel",M),d.setFloat("u_bassLevel",P),d.setFloat("u_midLevel",W),d.setFloat("u_trebleLevel",q),d.setFloat("u_lineWidth",a.lineWidth),d.setFloat("u_glowIntensity",a.glowIntensity),d.setFloat("u_waveAmplitude",a.waveAmplitude),d.setFloat("u_waveSpeed",a.waveSpeed),d.setInt("u_waveCount",a.waveCount),d.setFloat("u_colorCycle",a.colorCycle),d.setFloat("u_mouseInfluence",a.mouseInfluence),d.setInt("u_visualMode",parseInt(a.visualMode,10));const G=p.get("input0");G?(d.setTexture("u_inputTexture",G,0),d.setInt("u_hasInput",1)):d.setInt("u_hasInput",0),h.drawArrays(h.TRIANGLES,0,6)}}const Dd=`#version 300 es
precision highp float;

uniform float u_time;
uniform vec2 u_resolution;
uniform vec2 u_mouse;
uniform float u_cellScale;
uniform float u_warpStrength;
uniform float u_animSpeed;
uniform float u_edgeWidth;
uniform float u_innerDetail;
uniform float u_colorSpeed;
uniform float u_colorSaturation;
uniform float u_mouseInfluence;
uniform float u_brightness;

uniform sampler2D u_inputTexture;
uniform int u_hasInput;

out vec4 fragColor;

#include <noise.glsl>
#include <color-utils.glsl>

// Voronoi with F1, F2 distances and cell ID
vec4 voronoi(vec2 p, float t) {
    vec2 n = floor(p);
    vec2 f = fract(p);

    float f1 = 8.0;
    float f2 = 8.0;
    vec2 cellId = vec2(0.0);

    for (int j = -1; j <= 1; j++) {
        for (int i = -1; i <= 1; i++) {
            vec2 g = vec2(float(i), float(j));
            vec2 o = n + g;

            // Animated seed positions
            vec2 seed = vec2(
                snoise(o * 0.37 + t * 0.2) * 0.5 + 0.5,
                snoise(o * 0.51 + t * 0.15 + 100.0) * 0.5 + 0.5
            );

            vec2 diff = g + seed - f;
            float d = dot(diff, diff);

            if (d < f1) {
                f2 = f1;
                f1 = d;
                cellId = o;
            } else if (d < f2) {
                f2 = d;
            }
        }
    }

    f1 = sqrt(f1);
    f2 = sqrt(f2);

    return vec4(f1, f2, cellId);
}

void main() {
    vec2 uv = gl_FragCoord.xy / u_resolution;
    float aspect = u_resolution.x / u_resolution.y;
    vec2 p = uv;
    p.x *= aspect;

    float t = u_time * u_animSpeed;

    // Domain warping with mouse influence
    vec2 mouseUV = vec2(u_mouse.x * aspect, u_mouse.y);
    float mouseDist = length(p - mouseUV);
    float mouseWarp = u_mouseInfluence * exp(-mouseDist * 3.0);

    // Primary warp
    vec2 warp1 = vec2(
        fbm(p * 1.5 + t * 0.15, 3, 2.0, 0.5),
        fbm(p * 1.5 + t * 0.12 + 50.0, 3, 2.0, 0.5)
    );
    p += warp1 * u_warpStrength;

    // Mouse-driven warp
    vec2 mouseDir = normalize(p - mouseUV + 0.001);
    p += mouseDir * mouseWarp * 0.5;

    // Primary Voronoi layer
    vec4 v1 = voronoi(p * u_cellScale, t);
    float f1 = v1.x;
    float f2 = v1.y;
    vec2 cell = v1.zw;

    // Edge detection from F2-F1
    float edge = smoothstep(u_edgeWidth, u_edgeWidth * 0.1, f2 - f1);

    // Inner detail layer
    vec2 innerP = p + vec2(f1 * 0.5, f2 * 0.3);
    vec4 v2 = voronoi(innerP * u_cellScale * 2.5, t * 0.7);
    float innerPattern = v2.x * u_innerDetail;

    // Cell-based color
    float cellHue = snoise(cell * 0.3 + t * u_colorSpeed * 0.1) * 0.5 + 0.5;
    cellHue += f1 * 0.3;
    vec3 cellColor = hsv2rgb(vec3(
        fract(cellHue),
        u_colorSaturation,
        0.7 + innerPattern * 0.3
    ));

    // Edge glow
    vec3 edgeColor = hsv2rgb(vec3(
        fract(cellHue + 0.5),
        0.6,
        1.0
    ));

    // Composite
    vec3 color = mix(cellColor, edgeColor, edge);
    color += innerPattern * 0.15;
    color *= u_brightness;

    // Vignette
    float vig = 1.0 - length(uv - 0.5) * 0.5;
    color *= vig;

    // Blend with input
    if (u_hasInput == 1) {
        vec4 inputColor = texture(u_inputTexture, uv);
        color = mix(inputColor.rgb, color, 0.75);
    }

    fragColor = vec4(color, 1.0);
}
`,zd={id:"voronoi-liquid",name:"Voronoi Liquid",description:"Organic flowing cellular patterns with domain warping",parameters:[{id:"cellScale",type:"float",label:"Cell Scale",min:1,max:12,step:.1,default:4,group:"Shape"},{id:"warpStrength",type:"float",label:"Warp",min:0,max:2,step:.01,default:.6,group:"Shape"},{id:"animSpeed",type:"float",label:"Speed",min:0,max:3,step:.01,default:.8,group:"Motion"},{id:"edgeWidth",type:"float",label:"Edge Width",min:.01,max:.5,step:.01,default:.12,group:"Shape"},{id:"innerDetail",type:"float",label:"Inner Detail",min:0,max:1,step:.01,default:.4,group:"Shape"},{id:"colorSpeed",type:"float",label:"Color Speed",min:0,max:3,step:.01,default:.5,group:"Color"},{id:"colorSaturation",type:"float",label:"Saturation",min:0,max:1,step:.01,default:.75,group:"Color"},{id:"brightness",type:"float",label:"Brightness",min:.2,max:2,step:.01,default:1,group:"Color"},{id:"mouseInfluence",type:"float",label:"Mouse Influence",min:0,max:3,step:.01,default:1,group:"Interaction"}],inputs:[{id:"input0",label:"Background",type:"texture"}],outputs:[{id:"output0",label:"Result",type:"texture"}]};class Ld extends Gt{constructor(){super(...arguments);N(this,"descriptor",zd)}init(i){this.gl=i,this.shader=this.createShader(i,Kt,Dd)}render(i,a,p){const{gl:h,time:w,resolution:S,input:F}=i,d=this.shader;d.use(),d.setFloat("u_time",w),d.setVec2("u_resolution",S[0],S[1]),d.setVec2("u_mouse",F.mouse.x,F.mouse.y),d.setFloat("u_cellScale",a.cellScale),d.setFloat("u_warpStrength",a.warpStrength),d.setFloat("u_animSpeed",a.animSpeed),d.setFloat("u_edgeWidth",a.edgeWidth),d.setFloat("u_innerDetail",a.innerDetail),d.setFloat("u_colorSpeed",a.colorSpeed),d.setFloat("u_colorSaturation",a.colorSaturation),d.setFloat("u_brightness",a.brightness),d.setFloat("u_mouseInfluence",a.mouseInfluence);const M=p.get("input0");M?(d.setTexture("u_inputTexture",M,0),d.setInt("u_hasInput",1)):d.setInt("u_hasInput",0),h.drawArrays(h.TRIANGLES,0,6)}}const Ad=`#version 300 es
precision highp float;

uniform float u_time;
uniform vec2 u_resolution;
uniform vec2 u_mouse;
uniform int u_blobCount;
uniform float u_smoothBlend;
uniform float u_roughness;
uniform float u_specularPower;
uniform float u_fresnelStrength;
uniform float u_animSpeed;
uniform float u_mouseInfluence;
uniform vec4 u_baseColor;
uniform vec4 u_specColor;
uniform float u_ambientOcclusion;
uniform float u_envReflect;

uniform sampler2D u_inputTexture;
uniform int u_hasInput;

out vec4 fragColor;

#include <noise.glsl>

// Smooth minimum for blending SDFs
float smin(float a, float b, float k) {
    float h = clamp(0.5 + 0.5 * (b - a) / k, 0.0, 1.0);
    return mix(b, a, h) - k * h * (1.0 - h);
}

// Scene SDF
float sceneSDF(vec3 p) {
    float t = u_time * u_animSpeed;
    float d = 1e6;

    // Mouse-controlled primary blob
    vec3 mousePos = vec3((u_mouse.x - 0.5) * 3.0, (u_mouse.y - 0.5) * 2.0, 0.0);

    for (int i = 0; i < 8; i++) {
        if (i >= u_blobCount) break;
        float fi = float(i);

        vec3 center;
        if (i == 0) {
            // Primary blob follows mouse
            center = mousePos * u_mouseInfluence;
        } else {
            // Orbiting blobs
            float phase = fi * 1.618 * 6.28318;
            float orbitRadius = 1.0 + fi * 0.3;
            center = vec3(
                sin(t * 0.4 + phase) * orbitRadius,
                cos(t * 0.5 + phase * 0.7) * orbitRadius * 0.7,
                sin(t * 0.3 + phase * 1.3) * orbitRadius * 0.5
            );

            // Attract toward mouse
            center = mix(center, mousePos, u_mouseInfluence * 0.15 * exp(-length(center - mousePos) * 0.5));
        }

        // Varying radius per blob
        float radius = 0.5 + sin(t * 0.6 + fi * 2.0) * 0.15;
        radius += snoise(vec2(fi * 7.0, t * 0.3)) * 0.1;

        float sphereDist = length(p - center) - radius;

        // Surface roughness
        if (u_roughness > 0.01) {
            sphereDist += snoise(vec2(p.x * 3.0 + p.y, p.z * 3.0 + t * 0.5)) * u_roughness * 0.1;
        }

        d = smin(d, sphereDist, u_smoothBlend);
    }

    // Ground plane (subtle)
    float ground = p.y + 2.0;
    d = smin(d, ground, 0.8);

    return d;
}

vec3 calcNormal(vec3 p) {
    const float e = 0.001;
    return normalize(vec3(
        sceneSDF(p + vec3(e, 0, 0)) - sceneSDF(p - vec3(e, 0, 0)),
        sceneSDF(p + vec3(0, e, 0)) - sceneSDF(p - vec3(0, e, 0)),
        sceneSDF(p + vec3(0, 0, e)) - sceneSDF(p - vec3(0, 0, e))
    ));
}

float calcAO(vec3 p, vec3 n) {
    float ao = 0.0;
    float scale = 1.0;
    for (int i = 0; i < 5; i++) {
        float dist = 0.05 + 0.1 * float(i);
        float d = sceneSDF(p + n * dist);
        ao += (dist - d) * scale;
        scale *= 0.5;
    }
    return clamp(1.0 - ao * u_ambientOcclusion * 3.0, 0.0, 1.0);
}

void main() {
    vec2 uv = gl_FragCoord.xy / u_resolution;
    float aspect = u_resolution.x / u_resolution.y;
    vec2 screenPos = (uv - 0.5) * 2.0;
    screenPos.x *= aspect;

    // Camera
    vec3 ro = vec3(0.0, 0.5, -4.5);
    vec3 rd = normalize(vec3(screenPos, 1.8));

    // Slight camera sway
    float camSway = u_time * 0.1;
    float cs = cos(camSway * 0.3);
    float ss = sin(camSway * 0.3);
    rd.xz = mat2(cs, -ss, ss, cs) * rd.xz;

    // Raymarch
    float t = 0.0;
    float d;
    bool hit = false;
    for (int i = 0; i < 128; i++) {
        d = sceneSDF(ro + rd * t);
        if (d < 0.001) {
            hit = true;
            break;
        }
        t += d * 0.8;
        if (t > 50.0) break;
    }

    vec3 color;

    if (hit) {
        vec3 p = ro + rd * t;
        vec3 n = calcNormal(p);

        // Lighting
        vec3 lightDir1 = normalize(vec3(0.6, 0.8, -0.5));
        vec3 lightDir2 = normalize(vec3(-0.4, 0.3, 0.8));
        vec3 viewDir = -rd;

        // Diffuse
        float diff1 = max(0.0, dot(n, lightDir1));
        float diff2 = max(0.0, dot(n, lightDir2)) * 0.3;

        // Specular (Blinn-Phong)
        vec3 h1 = normalize(lightDir1 + viewDir);
        float spec1 = pow(max(0.0, dot(n, h1)), u_specularPower);
        vec3 h2 = normalize(lightDir2 + viewDir);
        float spec2 = pow(max(0.0, dot(n, h2)), u_specularPower * 0.5) * 0.3;

        // Fresnel
        float fresnel = pow(1.0 - max(0.0, dot(n, viewDir)), 3.0) * u_fresnelStrength;

        // AO
        float ao = calcAO(p, n);

        // Iridescent base color
        float iridescence = dot(n, viewDir) * 0.5 + 0.5;
        vec3 baseCol = u_baseColor.rgb;
        baseCol = mix(baseCol, baseCol.gbr, iridescence * 0.3);

        // Compose
        color = baseCol * (diff1 + diff2) * 0.6;
        color += u_specColor.rgb * (spec1 + spec2);
        color += fresnel * mix(u_specColor.rgb, vec3(1.0), 0.5);

        // Environment reflection
        vec3 reflDir = reflect(rd, n);
        float envLight = max(0.0, reflDir.y) * 0.5 + 0.5;
        color += envLight * u_envReflect * baseCol * 0.3;

        color *= ao;

        // Depth fog
        float fog = exp(-t * 0.08);
        color = mix(vec3(0.02, 0.02, 0.05), color, fog);

    } else {
        // Background gradient
        color = mix(vec3(0.02, 0.02, 0.05), vec3(0.05, 0.03, 0.1), uv.y);

        // Subtle background glow near blobs
        float glowDist = sceneSDF(ro + rd * 3.0);
        float glow = exp(-glowDist * 2.0) * 0.15;
        color += u_baseColor.rgb * glow;
    }

    if (u_hasInput == 1) {
        vec4 inputColor = texture(u_inputTexture, uv);
        color = mix(inputColor.rgb, color, 0.8);
    }

    // Tone mapping
    color = color / (color + 1.0);
    // Gamma
    color = pow(color, vec3(0.9));

    fragColor = vec4(color, 1.0);
}
`,Od={id:"raymarched-metaballs",name:"Raymarched Metaballs",description:"3D soft bodies with smooth blending, lighting, and fresnel",parameters:[{id:"blobCount",type:"int",label:"Blob Count",min:2,max:8,default:5,group:"Shape"},{id:"smoothBlend",type:"float",label:"Smooth Blend",min:.1,max:3,step:.01,default:1,group:"Shape"},{id:"roughness",type:"float",label:"Roughness",min:0,max:1,step:.01,default:.2,group:"Surface"},{id:"specularPower",type:"float",label:"Specular",min:4,max:128,step:1,default:32,group:"Lighting"},{id:"fresnelStrength",type:"float",label:"Fresnel",min:0,max:2,step:.01,default:.6,group:"Lighting"},{id:"ambientOcclusion",type:"float",label:"AO Strength",min:0,max:2,step:.01,default:1,group:"Lighting"},{id:"envReflect",type:"float",label:"Env Reflect",min:0,max:1,step:.01,default:.3,group:"Lighting"},{id:"animSpeed",type:"float",label:"Speed",min:0,max:3,step:.01,default:.8,group:"Motion"},{id:"baseColor",type:"color",label:"Base Color",default:[.2,.5,.9,1],group:"Color"},{id:"specColor",type:"color",label:"Specular Color",default:[1,.95,.8,1],group:"Color"},{id:"mouseInfluence",type:"float",label:"Mouse Influence",min:0,max:2,step:.01,default:1,group:"Interaction"}],inputs:[{id:"input0",label:"Background",type:"texture"}],outputs:[{id:"output0",label:"Result",type:"texture"}]};class jd extends Gt{constructor(){super(...arguments);N(this,"descriptor",Od)}init(i){this.gl=i,this.shader=this.createShader(i,Kt,Ad)}render(i,a,p){const{gl:h,time:w,resolution:S,input:F}=i,d=this.shader;d.use(),d.setFloat("u_time",w),d.setVec2("u_resolution",S[0],S[1]),d.setVec2("u_mouse",F.mouse.x,F.mouse.y),d.setInt("u_blobCount",a.blobCount),d.setFloat("u_smoothBlend",a.smoothBlend),d.setFloat("u_roughness",a.roughness),d.setFloat("u_specularPower",a.specularPower),d.setFloat("u_fresnelStrength",a.fresnelStrength),d.setFloat("u_ambientOcclusion",a.ambientOcclusion),d.setFloat("u_envReflect",a.envReflect),d.setFloat("u_animSpeed",a.animSpeed),d.setFloat("u_mouseInfluence",a.mouseInfluence);const M=a.baseColor;d.setVec4("u_baseColor",M[0],M[1],M[2],M[3]);const P=a.specColor;d.setVec4("u_specColor",P[0],P[1],P[2],P[3]);const W=p.get("input0");W?(d.setTexture("u_inputTexture",W,0),d.setInt("u_hasInput",1)):d.setInt("u_hasInput",0),h.drawArrays(h.TRIANGLES,0,6)}}const Ud=`#version 300 es
precision highp float;

uniform float u_time;
uniform vec2 u_resolution;
uniform vec2 u_mouse;
uniform float u_warpScale;
uniform float u_warpStrength;
uniform float u_warpLayers;
uniform float u_speed;
uniform float u_colorShift;
uniform float u_contrast;
uniform float u_patternScale;
uniform float u_mouseInfluence;
uniform float u_glowAmount;
uniform float u_brightness;
uniform int u_patternMode;

uniform sampler2D u_inputTexture;
uniform int u_hasInput;

out vec4 fragColor;

#include <noise.glsl>
#include <color-utils.glsl>

mat2 rot(float a) {
    float c = cos(a), s = sin(a);
    return mat2(c, -s, s, c);
}

// Multi-layer domain warping
vec2 domainWarp(vec2 p, float t, vec2 mouseUV) {
    float str = u_warpStrength;

    // Mouse influence — local warp amplification
    float mDist = length(p - mouseUV);
    float mBoost = 1.0 + u_mouseInfluence * exp(-mDist * 2.0);

    for (float i = 0.0; i < 5.0; i++) {
        if (i >= u_warpLayers) break;

        // Each layer warps with different rotation and scale
        float angle = i * 0.7 + t * 0.1;
        vec2 offset = vec2(
            fbm(p * rot(angle) * (1.0 + i * 0.5) + t * (0.1 + i * 0.05), 3, 2.0, 0.5),
            fbm(p * rot(angle + 1.5) * (1.0 + i * 0.5) + t * (0.08 + i * 0.04) + 100.0, 3, 2.0, 0.5)
        );

        p += offset * str * mBoost;
        str *= 0.6; // Reduce each layer
    }

    return p;
}

// Pattern evaluation at warped coordinates
vec3 evaluatePattern(vec2 p, float t) {
    vec3 color;

    if (u_patternMode == 0) {
        // Geometric lattice
        vec2 grid = sin(p * u_patternScale) * cos(p.yx * u_patternScale * 0.7);
        float pattern = length(grid);
        float lines = abs(sin(p.x * u_patternScale * 2.0 + p.y * u_patternScale));
        pattern = mix(pattern, lines, 0.3);

        float hue = atan(p.y, p.x) / 6.28318 + u_colorShift + t * 0.02;
        color = palette(
            fract(hue + pattern * 0.3),
            vec3(0.5), vec3(0.5),
            vec3(1.0, 0.7, 0.4),
            vec3(0.0, 0.15, 0.2)
        );
        color *= (0.5 + pattern * u_contrast);
    } else if (u_patternMode == 1) {
        // Flowing ribbons
        float ribbon = 0.0;
        for (float i = 0.0; i < 6.0; i++) {
            float phase = i * 1.2 + t * 0.3;
            float wave = sin(p.x * (2.0 + i) + p.y * (1.5 + i * 0.5) + phase);
            ribbon += exp(-abs(wave) * (3.0 + u_contrast * 2.0));
        }
        ribbon = clamp(ribbon * 0.4, 0.0, 1.0);

        float hue = fract(ribbon * 0.5 + p.x * 0.1 + u_colorShift + t * 0.03);
        color = hsv2rgb(vec3(hue, 0.7, ribbon));
        color += exp(-abs(ribbon - 0.5) * 8.0) * u_glowAmount * 0.5;
    } else {
        // Crystal mosaic
        vec2 ip = floor(p * u_patternScale * 0.5);
        vec2 fp = fract(p * u_patternScale * 0.5) - 0.5;

        // Hexagonal-ish tiling
        float d1 = abs(fp.x) + abs(fp.y); // diamond
        float d2 = length(fp);             // circle
        float d = mix(d1, d2, 0.5 + sin(t + ip.x * 3.0 + ip.y * 5.0) * 0.5);

        float facet = smoothstep(0.5, 0.45, d);
        float edge = smoothstep(0.48, 0.5, d) * 0.8;

        float hue = fract(
            snoise(ip * 0.2 + t * 0.05) * 0.5 + 0.5
            + u_colorShift
        );
        color = hsv2rgb(vec3(hue, 0.6, 0.3 + facet * 0.7));
        color += edge * vec3(0.8, 0.9, 1.0) * u_glowAmount;
    }

    return color;
}

void main() {
    vec2 uv = gl_FragCoord.xy / u_resolution;
    float aspect = u_resolution.x / u_resolution.y;
    vec2 p = (uv - 0.5) * 2.0;
    p.x *= aspect;
    p *= u_warpScale;

    float t = u_time * u_speed;
    vec2 mouseUV = vec2((u_mouse.x - 0.5) * 2.0 * aspect, (u_mouse.y - 0.5) * 2.0) * u_warpScale;

    // Apply domain warping
    vec2 warped = domainWarp(p, t, mouseUV);

    // Evaluate pattern at warped coordinates
    vec3 color = evaluatePattern(warped, t);
    color *= u_brightness;

    // Vignette
    float vig = 1.0 - length(uv - 0.5) * 0.6;
    color *= vig;

    if (u_hasInput == 1) {
        vec4 inputColor = texture(u_inputTexture, uv);
        color = mix(inputColor.rgb, color, 0.75);
    }

    fragColor = vec4(color, 1.0);
}
`,Bd={id:"domain-warp-tunnel",name:"Domain Warp",description:"Hypnotic recursive domain warping with geometric patterns",parameters:[{id:"warpScale",type:"float",label:"Scale",min:.5,max:5,step:.01,default:1.5,group:"Warp"},{id:"warpStrength",type:"float",label:"Warp Strength",min:0,max:3,step:.01,default:1,group:"Warp"},{id:"warpLayers",type:"float",label:"Warp Layers",min:1,max:5,step:1,default:3,group:"Warp"},{id:"speed",type:"float",label:"Speed",min:0,max:3,step:.01,default:.6,group:"Motion"},{id:"patternMode",type:"enum",label:"Pattern",options:[{value:"0",label:"Lattice"},{value:"1",label:"Ribbons"},{value:"2",label:"Crystal"}],default:"0",group:"Pattern"},{id:"patternScale",type:"float",label:"Pattern Scale",min:1,max:15,step:.1,default:5,group:"Pattern"},{id:"contrast",type:"float",label:"Contrast",min:.2,max:3,step:.01,default:1.2,group:"Color"},{id:"colorShift",type:"float",label:"Color Shift",min:0,max:1,step:.01,default:0,group:"Color"},{id:"glowAmount",type:"float",label:"Glow",min:0,max:2,step:.01,default:.5,group:"Color"},{id:"brightness",type:"float",label:"Brightness",min:.2,max:2,step:.01,default:1,group:"Color"},{id:"mouseInfluence",type:"float",label:"Mouse Influence",min:0,max:3,step:.01,default:1,group:"Interaction"}],inputs:[{id:"input0",label:"Background",type:"texture"}],outputs:[{id:"output0",label:"Result",type:"texture"}]};class Vd extends Gt{constructor(){super(...arguments);N(this,"descriptor",Bd)}init(i){this.gl=i,this.shader=this.createShader(i,Kt,Ud)}render(i,a,p){const{gl:h,time:w,resolution:S,input:F}=i,d=this.shader;d.use(),d.setFloat("u_time",w),d.setVec2("u_resolution",S[0],S[1]),d.setVec2("u_mouse",F.mouse.x,F.mouse.y),d.setFloat("u_warpScale",a.warpScale),d.setFloat("u_warpStrength",a.warpStrength),d.setFloat("u_warpLayers",a.warpLayers),d.setFloat("u_speed",a.speed),d.setInt("u_patternMode",parseInt(a.patternMode,10)),d.setFloat("u_patternScale",a.patternScale),d.setFloat("u_contrast",a.contrast),d.setFloat("u_colorShift",a.colorShift),d.setFloat("u_glowAmount",a.glowAmount),d.setFloat("u_brightness",a.brightness),d.setFloat("u_mouseInfluence",a.mouseInfluence);const M=p.get("input0");M?(d.setTexture("u_inputTexture",M,0),d.setInt("u_hasInput",1)):d.setInt("u_hasInput",0),h.drawArrays(h.TRIANGLES,0,6)}}const Ka=new Map([["noise-flow-field",()=>new hd],["fractal-explorer",()=>new yd],["particle-system",()=>new Cd],["feedback-echo",()=>new Td],["kaleidoscope",()=>new Id],["audio-waveform",()=>new Md],["voronoi-liquid",()=>new Ld],["raymarched-metaballs",()=>new jd],["domain-warp-tunnel",()=>new Vd]]);function Wd(){return Array.from(Ka.keys())}class bd{constructor(s){N(this,"glContext");N(this,"gl");N(this,"fbManager");N(this,"clock");N(this,"inputManager");N(this,"parameterStore");N(this,"canvas");N(this,"activeEffects",[]);N(this,"activeIds",[]);N(this,"rafId",null);N(this,"running",!1);N(this,"width",0);N(this,"height",0);N(this,"frame",()=>{if(!this.running||this.glContext.isLost){this.rafId=requestAnimationFrame(this.frame);return}this.clock.tick();const s=this.inputManager.poll(),i={gl:this.gl,time:this.clock.time,deltaTime:this.clock.deltaTime,frameCount:this.clock.frameCount,resolution:[this.width,this.height],input:s},{gl:a}=this;if(this.activeEffects.length===0)a.bindFramebuffer(a.FRAMEBUFFER,null),a.viewport(0,0,this.width,this.height),a.clearColor(.05,.05,.08,1),a.clear(a.COLOR_BUFFER_BIT);else{const p=[];let h=null;for(let w=0;w<this.activeEffects.length;w++){const S=this.activeEffects[w],F=w===this.activeEffects.length-1,d=this.parameterStore.getValues(S.descriptor.id),M=new Map;if(h&&M.set("input0",h),F)a.bindFramebuffer(a.FRAMEBUFFER,null),a.viewport(0,0,this.width,this.height);else{const P=this.fbManager.acquire(this.width,this.height);p.push(P),a.bindFramebuffer(a.FRAMEBUFFER,P.fbo),a.viewport(0,0,this.width,this.height),a.clear(a.COLOR_BUFFER_BIT)}S.render(i,d,M),F||(h=S.getOutputTexture()??p[p.length-1].texture)}for(const w of p)this.fbManager.release(w)}this.rafId=requestAnimationFrame(this.frame)});this.canvas=s,this.glContext=new ld(s),this.gl=this.glContext.gl,this.fbManager=new id(this.gl),this.clock=new od,this.inputManager=new ud(s),this.parameterStore=new sd,this.handleResize()}setEffectChain(s){for(const i of this.activeEffects)this.parameterStore.unregisterEffect(i.descriptor.id),i.dispose();this.activeEffects=[],this.activeIds=[];for(const i of s){const a=Ka.get(i);if(!a){console.warn(`Unknown effect: ${i}`);continue}const p=a();p.init(this.gl),p.resize(this.width,this.height),this.parameterStore.registerEffect(p.descriptor.id,p.descriptor),this.activeEffects.push(p),this.activeIds.push(i)}}getActiveEffectIds(){return this.activeIds}start(){this.running||(this.running=!0,this.inputManager.attach(),this.clock.start(),this.frame())}stop(){this.running=!1,this.rafId!==null&&(cancelAnimationFrame(this.rafId),this.rafId=null),this.inputManager.detach()}handleResize(){const s=window.devicePixelRatio||1,i=this.canvas.getBoundingClientRect();this.width=Math.floor(i.width*s),this.height=Math.floor(i.height*s),this.canvas.width=this.width,this.canvas.height=this.height,this.fbManager.handleResize();for(const a of this.activeEffects)a.resize(this.width,this.height)}dispose(){this.stop();for(const s of this.activeEffects)s.dispose();this.activeEffects=[],this.fbManager.dispose(),this.glContext.dispose()}}const Hd=X.memo(function({onPipelineReady:s}){const i=X.useRef(null),a=X.useRef(null);return X.useEffect(()=>{const p=i.current;if(!p)return;const h=new bd(p);a.current=h,h.start(),s(h);let w;const S=new ResizeObserver(()=>{clearTimeout(w),w=setTimeout(()=>{h.handleResize()},100)});return S.observe(p),()=>{clearTimeout(w),S.disconnect(),h.dispose(),a.current=null}},[s]),R.jsx("canvas",{ref:i})});function $d({def:y,value:s,onChange:i}){const[a,p]=X.useState(s),h=y.type==="int"?1:y.step??.01,w=X.useCallback(F=>{const d=y.type==="int"?parseInt(F.target.value,10):parseFloat(F.target.value);p(d),i(d)},[y.type,i]);Math.abs(a-s)>h*.5&&p(s);const S=y.type==="int"?a.toString():a.toFixed(h<.01?4:h<.1?2:1);return R.jsxs("div",{className:"param-row",children:[R.jsx("span",{className:"param-label",title:y.label,children:y.label}),R.jsxs("div",{className:"param-control",children:[R.jsx("input",{type:"range",min:y.min,max:y.max,step:h,value:a,onChange:w}),R.jsx("span",{className:"param-value",children:S})]})]})}function Qd(y,s,i){const a=p=>Math.round(p*255).toString(16).padStart(2,"0");return`#${a(y)}${a(s)}${a(i)}`}function Xd(y,s){const i=parseInt(y.slice(1,3),16)/255,a=parseInt(y.slice(3,5),16)/255,p=parseInt(y.slice(5,7),16)/255;return[i,a,p,s]}function Gd({def:y,value:s,onChange:i}){const a=Qd(s[0],s[1],s[2]),p=X.useCallback(h=>{i(Xd(h.target.value,s[3]))},[i,s]);return R.jsxs("div",{className:"param-row",children:[R.jsx("span",{className:"param-label",title:y.label,children:y.label}),R.jsxs("div",{className:"param-control",children:[R.jsx("input",{type:"color",value:a,onChange:p}),R.jsx("span",{className:"param-value",children:a})]})]})}function Kd({def:y,value:s,onChange:i}){const a=X.useCallback(p=>{i(p.target.value)},[i]);return R.jsxs("div",{className:"param-row",children:[R.jsx("span",{className:"param-label",title:y.label,children:y.label}),R.jsx("div",{className:"param-control",children:R.jsx("select",{value:s,onChange:a,children:y.options.map(p=>R.jsx("option",{value:p.value,children:p.label},p.value))})})]})}function Yd({def:y,value:s,onChange:i}){const a=X.useCallback(p=>{i(p.target.checked)},[i]);return R.jsxs("div",{className:"param-row",children:[R.jsx("span",{className:"param-label",title:y.label,children:y.label}),R.jsx("div",{className:"param-control",children:R.jsxs("label",{className:"toggle-switch",children:[R.jsx("input",{type:"checkbox",checked:s,onChange:a}),R.jsx("span",{className:"toggle-track"})]})})]})}function qd({def:y,value:s,onChange:i}){switch(y.type){case"float":case"int":return R.jsx($d,{def:y,value:s,onChange:i});case"color":return R.jsx(Gd,{def:y,value:s,onChange:i});case"enum":return R.jsx(Kd,{def:y,value:s,onChange:i});case"bool":return R.jsx(Yd,{def:y,value:s,onChange:i});case"vec2":return null;default:return null}}function Zd({parameterStore:y}){X.useSyncExternalStore(y.subscribe,y.getSnapshot);const s=y.getAllInstanceIds();return R.jsx("div",{className:"parameter-panel",children:s.map(i=>R.jsx(Jd,{instanceId:i,parameterStore:y},i))})}function Jd({instanceId:y,parameterStore:s}){const i=s.getDescriptor(y),a=s.getValues(y);if(!i)return null;const p=X.useCallback(()=>{for(const S of i.parameters)s.setValue(y,S.id,S.default)},[i,s,y]),h=X.useCallback(()=>{for(const S of i.parameters){let F=S.default;switch(S.type){case"float":{const d=S;F=Math.random()*(d.max-d.min)+d.min;break}case"int":{const d=S;F=Math.floor(Math.random()*(d.max-d.min+1))+d.min;break}case"bool":F=Math.random()>.5;break;case"color":F=[Math.random(),Math.random(),Math.random(),1];break;case"enum":{const d=S.options;F=d[Math.floor(Math.random()*d.length)].value;break}}s.setValue(y,S.id,F)}},[i,s,y]),w=new Map;for(const S of i.parameters){const F=S.group??"General";w.has(F)||w.set(F,[]),w.get(F).push(S)}return R.jsxs(R.Fragment,{children:[R.jsxs("div",{className:"param-actions",children:[R.jsx("button",{className:"btn param-action-btn",onClick:p,children:"Reset"}),R.jsx("button",{className:"btn param-action-btn",onClick:h,children:"Randomize"})]}),Array.from(w.entries()).map(([S,F])=>R.jsxs("div",{className:"param-group",children:[R.jsx("div",{className:"param-group-header",children:S}),F.map(d=>R.jsx(ep,{instanceId:y,def:d,value:a[d.id]??d.default,parameterStore:s},d.id))]},`${y}-${S}`))]})}function ep({instanceId:y,def:s,value:i,parameterStore:a}){const p=X.useCallback(h=>{a.setValue(y,s.id,h)},[a,y,s.id]);return R.jsx(qd,{def:s,value:i,onChange:p})}const Hi={"noise-flow-field":"Noise Flow Field","fractal-explorer":"Fractal Explorer","particle-system":"Particle System","feedback-echo":"Feedback Echo",kaleidoscope:"Kaleidoscope","audio-waveform":"Audio Waveform","voronoi-liquid":"Voronoi Liquid","raymarched-metaballs":"Raymarched Metaballs","domain-warp-tunnel":"Domain Warp"};function tp({activeEffects:y,onChange:s}){const i=Wd(),a=X.useCallback(w=>{s([w.target.value])},[s]),p=X.useCallback(w=>{const S=w.target.value;S&&!y.includes(S)&&s([...y,S]),w.target.value=""},[y,s]),h=X.useCallback(w=>{const S=y.filter(F=>F!==w);S.length>0&&s(S)},[y,s]);return R.jsxs("div",{className:"effect-selector",children:[R.jsx("label",{children:"Active Effect"}),R.jsx("select",{value:y[0]??"",onChange:a,children:i.map(w=>R.jsx("option",{value:w,children:Hi[w]??w},w))}),y.length>1&&R.jsxs("div",{style:{marginTop:8},children:[R.jsx("label",{style:{fontSize:11,color:"#888"},children:"Effect Chain"}),y.map((w,S)=>R.jsxs("div",{style:{display:"flex",alignItems:"center",gap:6,marginTop:4},children:[R.jsxs("span",{style:{fontSize:12,color:"#aaa",flex:1},children:[S+1,". ",Hi[w]??w]}),y.length>1&&R.jsx("button",{className:"btn btn-danger",onClick:()=>h(w),style:{padding:"2px 6px",fontSize:11},children:"x"})]},w))]}),R.jsx("div",{style:{marginTop:8},children:R.jsxs("select",{onChange:p,defaultValue:"",children:[R.jsx("option",{value:"",disabled:!0,children:"+ Add to chain..."}),i.filter(w=>!y.includes(w)).map(w=>R.jsx("option",{value:w,children:Hi[w]??w},w))]})})]})}const Bl="procedural-art-presets",np=1;class kr{constructor(s){N(this,"parameterStore");this.parameterStore=s}save(s,i){const a={version:np,name:s,createdAt:new Date().toISOString(),pipeline:{chain:i,parameterOverrides:this.parameterStore.serialize()}},p=this.loadAll(),h=p.findIndex(w=>w.name===s);return h>=0?p[h]=a:p.push(a),localStorage.setItem(Bl,JSON.stringify(p)),a}loadAll(){try{const s=localStorage.getItem(Bl);return s?JSON.parse(s):[]}catch{return[]}}load(s){const a=this.loadAll().find(p=>p.name===s);return(a==null?void 0:a.pipeline)??null}delete(s){const i=this.loadAll().filter(a=>a.name!==s);localStorage.setItem(Bl,JSON.stringify(i))}rename(s,i){const a=this.loadAll(),p=a.find(h=>h.name===s);p&&(p.name=i,localStorage.setItem(Bl,JSON.stringify(a)))}}function rp({pipeline:y,activeEffects:s,onLoadPreset:i}){const[a,p]=X.useState(""),[h,w]=X.useState(()=>new kr(y.parameterStore).loadAll()),S=X.useCallback(()=>{const P=new kr(y.parameterStore);w(P.loadAll())},[y.parameterStore]),F=X.useCallback(()=>{if(!a.trim())return;new kr(y.parameterStore).save(a.trim(),s),p(""),S()},[a,y.parameterStore,s,S]),d=X.useCallback(P=>{const q=new kr(y.parameterStore).load(P);q&&(i(q.chain),setTimeout(()=>{for(const[G,b]of Object.entries(q.parameterOverrides))y.parameterStore.setValues(G,b)},0))},[y,i]),M=X.useCallback(P=>{new kr(y.parameterStore).delete(P),S()},[y.parameterStore,S]);return R.jsxs("div",{className:"preset-bar",children:[R.jsx("label",{children:"Presets"}),R.jsxs("div",{className:"preset-actions",children:[R.jsx("input",{type:"text",placeholder:"Preset name...",value:a,onChange:P=>p(P.target.value),onKeyDown:P=>P.key==="Enter"&&F()}),R.jsx("button",{className:"btn btn-primary",onClick:F,children:"Save"})]}),R.jsxs("div",{className:"preset-list",children:[h.map(P=>R.jsxs("div",{className:"preset-item",children:[R.jsx("span",{className:"preset-item-name",onClick:()=>d(P.name),children:P.name}),R.jsx("button",{className:"btn btn-danger",onClick:()=>M(P.name),style:{padding:"2px 6px",fontSize:11},children:"x"})]},P.name)),h.length===0&&R.jsx("div",{style:{fontSize:12,color:"#555",padding:8},children:"No presets saved yet"})]})]})}function lp({pipeline:y}){const[s,i]=X.useState(!1),[a,p]=X.useState(!1),[h,w]=X.useState(!1),S=X.useRef(null),F=X.useRef([]),d=X.useCallback(()=>{y.canvas.toBlob(b=>{if(!b)return;const $=URL.createObjectURL(b),oe=document.createElement("a");oe.href=$,oe.download=`procedural-art-${Date.now()}.png`,oe.click(),URL.revokeObjectURL($)},"image/png")},[y]),M=X.useCallback(()=>{var oe;if(s){(oe=S.current)==null||oe.stop(),i(!1);return}const b=y.canvas.captureStream(60),$=new MediaRecorder(b,{mimeType:MediaRecorder.isTypeSupported("video/webm;codecs=vp9")?"video/webm;codecs=vp9":"video/webm",videoBitsPerSecond:8e6});F.current=[],$.ondataavailable=ue=>{ue.data.size>0&&F.current.push(ue.data)},$.onstop=()=>{const ue=new Blob(F.current,{type:"video/webm"}),ge=URL.createObjectURL(ue),ie=document.createElement("a");ie.href=ge,ie.download=`procedural-art-${Date.now()}.webm`,ie.click(),URL.revokeObjectURL(ge),F.current=[]},$.start(100),S.current=$,i(!0)},[s,y]),P=X.useCallback(()=>{var G;document.fullscreenElement?document.exitFullscreen():(G=y.canvas.parentElement)==null||G.requestFullscreen()},[y]),W=X.useCallback(async()=>{a?(y.inputManager.disableAudio(),p(!1)):(await y.inputManager.enableAudio(),p(y.inputManager.audioEnabled))},[a,y]),q=X.useCallback(async()=>{h?(y.inputManager.disableMIDI(),w(!1)):(await y.inputManager.enableMIDI(),w(y.inputManager.midiEnabled))},[h,y]);return R.jsxs("div",{className:"toolbar",children:[R.jsxs("div",{className:"toolbar-group",children:[R.jsx("label",{children:"Inputs"}),R.jsxs("div",{className:"toolbar-buttons",children:[R.jsx("button",{className:`btn toolbar-btn ${a?"btn-active":""}`,onClick:W,title:"Toggle microphone input",children:a?"Mic ON":"Mic"}),R.jsx("button",{className:`btn toolbar-btn ${h?"btn-active":""}`,onClick:q,title:"Toggle MIDI input",children:h?"MIDI ON":"MIDI"})]})]}),R.jsxs("div",{className:"toolbar-group",children:[R.jsx("label",{children:"Export"}),R.jsxs("div",{className:"toolbar-buttons",children:[R.jsx("button",{className:"btn toolbar-btn",onClick:d,title:"Save screenshot",children:"Photo"}),R.jsx("button",{className:`btn toolbar-btn ${s?"btn-recording":""}`,onClick:M,title:s?"Stop recording":"Record video",children:s?"Stop":"Record"})]})]}),R.jsx("div",{className:"toolbar-group",children:R.jsx("div",{className:"toolbar-buttons",children:R.jsx("button",{className:"btn toolbar-btn",onClick:P,title:"Toggle fullscreen",children:"Fullscreen"})})})]})}function op({pipeline:y}){const[s,i]=X.useState(0),[a,p]=X.useState({x:0,y:0}),h=X.useRef([]),w=X.useRef(performance.now());return X.useEffect(()=>{if(!y)return;let S;const F=()=>{const d=performance.now(),M=d-w.current;w.current=d;const P=h.current;P.push(M),P.length>60&&P.shift();const W=P.reduce((G,b)=>G+b,0)/P.length;i(Math.round(1e3/W));const q=y.inputManager.poll();p({x:q.mouse.x,y:q.mouse.y}),S=requestAnimationFrame(F)};return S=requestAnimationFrame(F),()=>cancelAnimationFrame(S)},[y]),y?R.jsxs("div",{className:"debug-overlay",children:["FPS: ",s," | Mouse: ",a.x.toFixed(2),", ",a.y.toFixed(2)]}):null}class ip extends X.Component{constructor(){super(...arguments);N(this,"state",{hasError:!1,error:null})}static getDerivedStateFromError(i){return{hasError:!0,error:i.message}}render(){return this.state.hasError?R.jsx("div",{style:{position:"absolute",inset:0,display:"flex",alignItems:"center",justifyContent:"center",background:"#0a0a0f",color:"#ff6666",textAlign:"center",zIndex:1e3,padding:20,fontFamily:"inherit"},children:R.jsxs("div",{children:[R.jsx("h2",{style:{fontSize:18,marginBottom:8},children:"Rendering Error"}),R.jsx("p",{style:{fontSize:12,color:"#aaa",maxWidth:400},children:this.state.error}),R.jsx("button",{className:"btn",onClick:()=>window.location.reload(),style:{marginTop:16},children:"Reload"})]})}):this.props.children}}function up(){const y=X.useRef(null),[s,i]=X.useState(["noise-flow-field"]),[,a]=X.useState(0),[p,h]=X.useState(!1),w=X.useCallback(M=>{y.current=M,M.setEffectChain(["noise-flow-field"]),a(P=>P+1)},[]),S=X.useCallback(M=>{var P;i(M),(P=y.current)==null||P.setEffectChain(M),a(W=>W+1)},[]),F=X.useCallback(()=>{h(M=>!M)},[]),d=y.current;return R.jsxs("div",{className:"app",children:[R.jsxs("div",{className:"canvas-area",children:[R.jsx(ip,{children:R.jsx(Hd,{onPipelineReady:w})}),R.jsx(op,{pipeline:d}),R.jsx("button",{className:"menu-toggle",onClick:F,"aria-label":"Toggle menu",children:p?"✕":"☰"})]}),p&&R.jsx("div",{className:"sidebar-backdrop",onClick:F}),R.jsxs("div",{className:`sidebar ${p?"sidebar--open":""}`,children:[R.jsx("div",{className:"sidebar-header",children:R.jsx("h1",{children:"Procedural Art"})}),R.jsx(tp,{activeEffects:s,onChange:S}),d&&R.jsx(Zd,{parameterStore:d.parameterStore}),d&&R.jsx(lp,{pipeline:d}),d&&R.jsx(rp,{pipeline:d,activeEffects:s,onLoadPreset:S})]})]})}rd.createRoot(document.getElementById("root")).render(R.jsx(X.StrictMode,{children:R.jsx(up,{})}));
