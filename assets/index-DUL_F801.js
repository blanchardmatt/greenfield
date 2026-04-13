var Vf=Object.defineProperty;var Uf=(g,s,i)=>s in g?Vf(g,s,{enumerable:!0,configurable:!0,writable:!0,value:i}):g[s]=i;var P=(g,s,i)=>Uf(g,typeof s!="symbol"?s+"":s,i);(function(){const s=document.createElement("link").relList;if(s&&s.supports&&s.supports("modulepreload"))return;for(const f of document.querySelectorAll('link[rel="modulepreload"]'))a(f);new MutationObserver(f=>{for(const y of f)if(y.type==="childList")for(const w of y.addedNodes)w.tagName==="LINK"&&w.rel==="modulepreload"&&a(w)}).observe(document,{childList:!0,subtree:!0});function i(f){const y={};return f.integrity&&(y.integrity=f.integrity),f.referrerPolicy&&(y.referrerPolicy=f.referrerPolicy),f.crossOrigin==="use-credentials"?y.credentials="include":f.crossOrigin==="anonymous"?y.credentials="omit":y.credentials="same-origin",y}function a(f){if(f.ep)return;f.ep=!0;const y=i(f);fetch(f.href,y)}})();var Ai={exports:{}},Sr={},Ni={exports:{}},K={};/**
 * @license React
 * react.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */var Da;function bf(){if(Da)return K;Da=1;var g=Symbol.for("react.element"),s=Symbol.for("react.portal"),i=Symbol.for("react.fragment"),a=Symbol.for("react.strict_mode"),f=Symbol.for("react.profiler"),y=Symbol.for("react.provider"),w=Symbol.for("react.context"),S=Symbol.for("react.forward_ref"),T=Symbol.for("react.suspense"),p=Symbol.for("react.memo"),N=Symbol.for("react.lazy"),A=Symbol.iterator;function $(h){return h===null||typeof h!="object"?null:(h=A&&h[A]||h["@@iterator"],typeof h=="function"?h:null)}var re={isMounted:function(){return!1},enqueueForceUpdate:function(){},enqueueReplaceState:function(){},enqueueSetState:function(){}},se=Object.assign,Y={};function Q(h,k,G){this.props=h,this.context=k,this.refs=Y,this.updater=G||re}Q.prototype.isReactComponent={},Q.prototype.setState=function(h,k){if(typeof h!="object"&&typeof h!="function"&&h!=null)throw Error("setState(...): takes an object of state variables to update or a function which returns an object of state variables.");this.updater.enqueueSetState(this,h,k,"setState")},Q.prototype.forceUpdate=function(h){this.updater.enqueueForceUpdate(this,h,"forceUpdate")};function _e(){}_e.prototype=Q.prototype;function we(h,k,G){this.props=h,this.context=k,this.refs=Y,this.updater=G||re}var Fe=we.prototype=new _e;Fe.constructor=we,se(Fe,Q.prototype),Fe.isPureReactComponent=!0;var fe=Array.isArray,Oe=Object.prototype.hasOwnProperty,ve={current:null},ke={key:!0,ref:!0,__self:!0,__source:!0};function qe(h,k,G){var X,Z={},J=null,le=null;if(k!=null)for(X in k.ref!==void 0&&(le=k.ref),k.key!==void 0&&(J=""+k.key),k)Oe.call(k,X)&&!ke.hasOwnProperty(X)&&(Z[X]=k[X]);var te=arguments.length-2;if(te===1)Z.children=G;else if(1<te){for(var ae=Array(te),Qe=0;Qe<te;Qe++)ae[Qe]=arguments[Qe+2];Z.children=ae}if(h&&h.defaultProps)for(X in te=h.defaultProps,te)Z[X]===void 0&&(Z[X]=te[X]);return{$$typeof:g,type:h,key:J,ref:le,props:Z,_owner:ve.current}}function Ft(h,k){return{$$typeof:g,type:h.type,key:k,ref:h.ref,props:h.props,_owner:h._owner}}function _t(h){return typeof h=="object"&&h!==null&&h.$$typeof===g}function Yt(h){var k={"=":"=0",":":"=2"};return"$"+h.replace(/[=:]/g,function(G){return k[G]})}var dt=/\/+/g;function $e(h,k){return typeof h=="object"&&h!==null&&h.key!=null?Yt(""+h.key):k.toString(36)}function lt(h,k,G,X,Z){var J=typeof h;(J==="undefined"||J==="boolean")&&(h=null);var le=!1;if(h===null)le=!0;else switch(J){case"string":case"number":le=!0;break;case"object":switch(h.$$typeof){case g:case s:le=!0}}if(le)return le=h,Z=Z(le),h=X===""?"."+$e(le,0):X,fe(Z)?(G="",h!=null&&(G=h.replace(dt,"$&/")+"/"),lt(Z,k,G,"",function(Qe){return Qe})):Z!=null&&(_t(Z)&&(Z=Ft(Z,G+(!Z.key||le&&le.key===Z.key?"":(""+Z.key).replace(dt,"$&/")+"/")+h)),k.push(Z)),1;if(le=0,X=X===""?".":X+":",fe(h))for(var te=0;te<h.length;te++){J=h[te];var ae=X+$e(J,te);le+=lt(J,k,G,ae,Z)}else if(ae=$(h),typeof ae=="function")for(h=ae.call(h),te=0;!(J=h.next()).done;)J=J.value,ae=X+$e(J,te++),le+=lt(J,k,G,ae,Z);else if(J==="object")throw k=String(h),Error("Objects are not valid as a React child (found: "+(k==="[object Object]"?"object with keys {"+Object.keys(h).join(", ")+"}":k)+"). If you meant to render a collection of children, use an array instead.");return le}function pt(h,k,G){if(h==null)return h;var X=[],Z=0;return lt(h,X,"","",function(J){return k.call(G,J,Z++)}),X}function je(h){if(h._status===-1){var k=h._result;k=k(),k.then(function(G){(h._status===0||h._status===-1)&&(h._status=1,h._result=G)},function(G){(h._status===0||h._status===-1)&&(h._status=2,h._result=G)}),h._status===-1&&(h._status=0,h._result=k)}if(h._status===1)return h._result.default;throw h._result}var me={current:null},D={transition:null},b={ReactCurrentDispatcher:me,ReactCurrentBatchConfig:D,ReactCurrentOwner:ve};function L(){throw Error("act(...) is not supported in production builds of React.")}return K.Children={map:pt,forEach:function(h,k,G){pt(h,function(){k.apply(this,arguments)},G)},count:function(h){var k=0;return pt(h,function(){k++}),k},toArray:function(h){return pt(h,function(k){return k})||[]},only:function(h){if(!_t(h))throw Error("React.Children.only expected to receive a single React element child.");return h}},K.Component=Q,K.Fragment=i,K.Profiler=f,K.PureComponent=we,K.StrictMode=a,K.Suspense=T,K.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED=b,K.act=L,K.cloneElement=function(h,k,G){if(h==null)throw Error("React.cloneElement(...): The argument must be a React element, but you passed "+h+".");var X=se({},h.props),Z=h.key,J=h.ref,le=h._owner;if(k!=null){if(k.ref!==void 0&&(J=k.ref,le=ve.current),k.key!==void 0&&(Z=""+k.key),h.type&&h.type.defaultProps)var te=h.type.defaultProps;for(ae in k)Oe.call(k,ae)&&!ke.hasOwnProperty(ae)&&(X[ae]=k[ae]===void 0&&te!==void 0?te[ae]:k[ae])}var ae=arguments.length-2;if(ae===1)X.children=G;else if(1<ae){te=Array(ae);for(var Qe=0;Qe<ae;Qe++)te[Qe]=arguments[Qe+2];X.children=te}return{$$typeof:g,type:h.type,key:Z,ref:J,props:X,_owner:le}},K.createContext=function(h){return h={$$typeof:w,_currentValue:h,_currentValue2:h,_threadCount:0,Provider:null,Consumer:null,_defaultValue:null,_globalName:null},h.Provider={$$typeof:y,_context:h},h.Consumer=h},K.createElement=qe,K.createFactory=function(h){var k=qe.bind(null,h);return k.type=h,k},K.createRef=function(){return{current:null}},K.forwardRef=function(h){return{$$typeof:S,render:h}},K.isValidElement=_t,K.lazy=function(h){return{$$typeof:N,_payload:{_status:-1,_result:h},_init:je}},K.memo=function(h,k){return{$$typeof:p,type:h,compare:k===void 0?null:k}},K.startTransition=function(h){var k=D.transition;D.transition={};try{h()}finally{D.transition=k}},K.unstable_act=L,K.useCallback=function(h,k){return me.current.useCallback(h,k)},K.useContext=function(h){return me.current.useContext(h)},K.useDebugValue=function(){},K.useDeferredValue=function(h){return me.current.useDeferredValue(h)},K.useEffect=function(h,k){return me.current.useEffect(h,k)},K.useId=function(){return me.current.useId()},K.useImperativeHandle=function(h,k,G){return me.current.useImperativeHandle(h,k,G)},K.useInsertionEffect=function(h,k){return me.current.useInsertionEffect(h,k)},K.useLayoutEffect=function(h,k){return me.current.useLayoutEffect(h,k)},K.useMemo=function(h,k){return me.current.useMemo(h,k)},K.useReducer=function(h,k,G){return me.current.useReducer(h,k,G)},K.useRef=function(h){return me.current.useRef(h)},K.useState=function(h){return me.current.useState(h)},K.useSyncExternalStore=function(h,k,G){return me.current.useSyncExternalStore(h,k,G)},K.useTransition=function(){return me.current.useTransition()},K.version="18.3.1",K}var za;function ji(){return za||(za=1,Ni.exports=bf()),Ni.exports}/**
 * @license React
 * react-jsx-runtime.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */var Ma;function Wf(){if(Ma)return Sr;Ma=1;var g=ji(),s=Symbol.for("react.element"),i=Symbol.for("react.fragment"),a=Object.prototype.hasOwnProperty,f=g.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED.ReactCurrentOwner,y={key:!0,ref:!0,__self:!0,__source:!0};function w(S,T,p){var N,A={},$=null,re=null;p!==void 0&&($=""+p),T.key!==void 0&&($=""+T.key),T.ref!==void 0&&(re=T.ref);for(N in T)a.call(T,N)&&!y.hasOwnProperty(N)&&(A[N]=T[N]);if(S&&S.defaultProps)for(N in T=S.defaultProps,T)A[N]===void 0&&(A[N]=T[N]);return{$$typeof:s,type:S,key:$,ref:re,props:A,_owner:f.current}}return Sr.Fragment=i,Sr.jsx=w,Sr.jsxs=w,Sr}var La;function Hf(){return La||(La=1,Ai.exports=Wf()),Ai.exports}var F=Hf(),H=ji(),zl={},Di={exports:{}},He={},zi={exports:{}},Mi={};/**
 * @license React
 * scheduler.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */var Oa;function $f(){return Oa||(Oa=1,(function(g){function s(D,b){var L=D.length;D.push(b);e:for(;0<L;){var h=L-1>>>1,k=D[h];if(0<f(k,b))D[h]=b,D[L]=k,L=h;else break e}}function i(D){return D.length===0?null:D[0]}function a(D){if(D.length===0)return null;var b=D[0],L=D.pop();if(L!==b){D[0]=L;e:for(var h=0,k=D.length,G=k>>>1;h<G;){var X=2*(h+1)-1,Z=D[X],J=X+1,le=D[J];if(0>f(Z,L))J<k&&0>f(le,Z)?(D[h]=le,D[J]=L,h=J):(D[h]=Z,D[X]=L,h=X);else if(J<k&&0>f(le,L))D[h]=le,D[J]=L,h=J;else break e}}return b}function f(D,b){var L=D.sortIndex-b.sortIndex;return L!==0?L:D.id-b.id}if(typeof performance=="object"&&typeof performance.now=="function"){var y=performance;g.unstable_now=function(){return y.now()}}else{var w=Date,S=w.now();g.unstable_now=function(){return w.now()-S}}var T=[],p=[],N=1,A=null,$=3,re=!1,se=!1,Y=!1,Q=typeof setTimeout=="function"?setTimeout:null,_e=typeof clearTimeout=="function"?clearTimeout:null,we=typeof setImmediate<"u"?setImmediate:null;typeof navigator<"u"&&navigator.scheduling!==void 0&&navigator.scheduling.isInputPending!==void 0&&navigator.scheduling.isInputPending.bind(navigator.scheduling);function Fe(D){for(var b=i(p);b!==null;){if(b.callback===null)a(p);else if(b.startTime<=D)a(p),b.sortIndex=b.expirationTime,s(T,b);else break;b=i(p)}}function fe(D){if(Y=!1,Fe(D),!se)if(i(T)!==null)se=!0,je(Oe);else{var b=i(p);b!==null&&me(fe,b.startTime-D)}}function Oe(D,b){se=!1,Y&&(Y=!1,_e(qe),qe=-1),re=!0;var L=$;try{for(Fe(b),A=i(T);A!==null&&(!(A.expirationTime>b)||D&&!Yt());){var h=A.callback;if(typeof h=="function"){A.callback=null,$=A.priorityLevel;var k=h(A.expirationTime<=b);b=g.unstable_now(),typeof k=="function"?A.callback=k:A===i(T)&&a(T),Fe(b)}else a(T);A=i(T)}if(A!==null)var G=!0;else{var X=i(p);X!==null&&me(fe,X.startTime-b),G=!1}return G}finally{A=null,$=L,re=!1}}var ve=!1,ke=null,qe=-1,Ft=5,_t=-1;function Yt(){return!(g.unstable_now()-_t<Ft)}function dt(){if(ke!==null){var D=g.unstable_now();_t=D;var b=!0;try{b=ke(!0,D)}finally{b?$e():(ve=!1,ke=null)}}else ve=!1}var $e;if(typeof we=="function")$e=function(){we(dt)};else if(typeof MessageChannel<"u"){var lt=new MessageChannel,pt=lt.port2;lt.port1.onmessage=dt,$e=function(){pt.postMessage(null)}}else $e=function(){Q(dt,0)};function je(D){ke=D,ve||(ve=!0,$e())}function me(D,b){qe=Q(function(){D(g.unstable_now())},b)}g.unstable_IdlePriority=5,g.unstable_ImmediatePriority=1,g.unstable_LowPriority=4,g.unstable_NormalPriority=3,g.unstable_Profiling=null,g.unstable_UserBlockingPriority=2,g.unstable_cancelCallback=function(D){D.callback=null},g.unstable_continueExecution=function(){se||re||(se=!0,je(Oe))},g.unstable_forceFrameRate=function(D){0>D||125<D?console.error("forceFrameRate takes a positive int between 0 and 125, forcing frame rates higher than 125 fps is not supported"):Ft=0<D?Math.floor(1e3/D):5},g.unstable_getCurrentPriorityLevel=function(){return $},g.unstable_getFirstCallbackNode=function(){return i(T)},g.unstable_next=function(D){switch($){case 1:case 2:case 3:var b=3;break;default:b=$}var L=$;$=b;try{return D()}finally{$=L}},g.unstable_pauseExecution=function(){},g.unstable_requestPaint=function(){},g.unstable_runWithPriority=function(D,b){switch(D){case 1:case 2:case 3:case 4:case 5:break;default:D=3}var L=$;$=D;try{return b()}finally{$=L}},g.unstable_scheduleCallback=function(D,b,L){var h=g.unstable_now();switch(typeof L=="object"&&L!==null?(L=L.delay,L=typeof L=="number"&&0<L?h+L:h):L=h,D){case 1:var k=-1;break;case 2:k=250;break;case 5:k=1073741823;break;case 4:k=1e4;break;default:k=5e3}return k=L+k,D={id:N++,callback:b,priorityLevel:D,startTime:L,expirationTime:k,sortIndex:-1},L>h?(D.sortIndex=L,s(p,D),i(T)===null&&D===i(p)&&(Y?(_e(qe),qe=-1):Y=!0,me(fe,L-h))):(D.sortIndex=k,s(T,D),se||re||(se=!0,je(Oe))),D},g.unstable_shouldYield=Yt,g.unstable_wrapCallback=function(D){var b=$;return function(){var L=$;$=b;try{return D.apply(this,arguments)}finally{$=L}}}})(Mi)),Mi}var ja;function Qf(){return ja||(ja=1,zi.exports=$f()),zi.exports}/**
 * @license React
 * react-dom.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */var Ba;function Gf(){if(Ba)return He;Ba=1;var g=ji(),s=Qf();function i(e){for(var t="https://reactjs.org/docs/error-decoder.html?invariant="+e,n=1;n<arguments.length;n++)t+="&args[]="+encodeURIComponent(arguments[n]);return"Minified React error #"+e+"; visit "+t+" for the full message or use the non-minified dev environment for full errors and additional helpful warnings."}var a=new Set,f={};function y(e,t){w(e,t),w(e+"Capture",t)}function w(e,t){for(f[e]=t,e=0;e<t.length;e++)a.add(t[e])}var S=!(typeof window>"u"||typeof window.document>"u"||typeof window.document.createElement>"u"),T=Object.prototype.hasOwnProperty,p=/^[:A-Z_a-z\u00C0-\u00D6\u00D8-\u00F6\u00F8-\u02FF\u0370-\u037D\u037F-\u1FFF\u200C-\u200D\u2070-\u218F\u2C00-\u2FEF\u3001-\uD7FF\uF900-\uFDCF\uFDF0-\uFFFD][:A-Z_a-z\u00C0-\u00D6\u00D8-\u00F6\u00F8-\u02FF\u0370-\u037D\u037F-\u1FFF\u200C-\u200D\u2070-\u218F\u2C00-\u2FEF\u3001-\uD7FF\uF900-\uFDCF\uFDF0-\uFFFD\-.0-9\u00B7\u0300-\u036F\u203F-\u2040]*$/,N={},A={};function $(e){return T.call(A,e)?!0:T.call(N,e)?!1:p.test(e)?A[e]=!0:(N[e]=!0,!1)}function re(e,t,n,r){if(n!==null&&n.type===0)return!1;switch(typeof t){case"function":case"symbol":return!0;case"boolean":return r?!1:n!==null?!n.acceptsBooleans:(e=e.toLowerCase().slice(0,5),e!=="data-"&&e!=="aria-");default:return!1}}function se(e,t,n,r){if(t===null||typeof t>"u"||re(e,t,n,r))return!0;if(r)return!1;if(n!==null)switch(n.type){case 3:return!t;case 4:return t===!1;case 5:return isNaN(t);case 6:return isNaN(t)||1>t}return!1}function Y(e,t,n,r,l,o,u){this.acceptsBooleans=t===2||t===3||t===4,this.attributeName=r,this.attributeNamespace=l,this.mustUseProperty=n,this.propertyName=e,this.type=t,this.sanitizeURL=o,this.removeEmptyString=u}var Q={};"children dangerouslySetInnerHTML defaultValue defaultChecked innerHTML suppressContentEditableWarning suppressHydrationWarning style".split(" ").forEach(function(e){Q[e]=new Y(e,0,!1,e,null,!1,!1)}),[["acceptCharset","accept-charset"],["className","class"],["htmlFor","for"],["httpEquiv","http-equiv"]].forEach(function(e){var t=e[0];Q[t]=new Y(t,1,!1,e[1],null,!1,!1)}),["contentEditable","draggable","spellCheck","value"].forEach(function(e){Q[e]=new Y(e,2,!1,e.toLowerCase(),null,!1,!1)}),["autoReverse","externalResourcesRequired","focusable","preserveAlpha"].forEach(function(e){Q[e]=new Y(e,2,!1,e,null,!1,!1)}),"allowFullScreen async autoFocus autoPlay controls default defer disabled disablePictureInPicture disableRemotePlayback formNoValidate hidden loop noModule noValidate open playsInline readOnly required reversed scoped seamless itemScope".split(" ").forEach(function(e){Q[e]=new Y(e,3,!1,e.toLowerCase(),null,!1,!1)}),["checked","multiple","muted","selected"].forEach(function(e){Q[e]=new Y(e,3,!0,e,null,!1,!1)}),["capture","download"].forEach(function(e){Q[e]=new Y(e,4,!1,e,null,!1,!1)}),["cols","rows","size","span"].forEach(function(e){Q[e]=new Y(e,6,!1,e,null,!1,!1)}),["rowSpan","start"].forEach(function(e){Q[e]=new Y(e,5,!1,e.toLowerCase(),null,!1,!1)});var _e=/[\-:]([a-z])/g;function we(e){return e[1].toUpperCase()}"accent-height alignment-baseline arabic-form baseline-shift cap-height clip-path clip-rule color-interpolation color-interpolation-filters color-profile color-rendering dominant-baseline enable-background fill-opacity fill-rule flood-color flood-opacity font-family font-size font-size-adjust font-stretch font-style font-variant font-weight glyph-name glyph-orientation-horizontal glyph-orientation-vertical horiz-adv-x horiz-origin-x image-rendering letter-spacing lighting-color marker-end marker-mid marker-start overline-position overline-thickness paint-order panose-1 pointer-events rendering-intent shape-rendering stop-color stop-opacity strikethrough-position strikethrough-thickness stroke-dasharray stroke-dashoffset stroke-linecap stroke-linejoin stroke-miterlimit stroke-opacity stroke-width text-anchor text-decoration text-rendering underline-position underline-thickness unicode-bidi unicode-range units-per-em v-alphabetic v-hanging v-ideographic v-mathematical vector-effect vert-adv-y vert-origin-x vert-origin-y word-spacing writing-mode xmlns:xlink x-height".split(" ").forEach(function(e){var t=e.replace(_e,we);Q[t]=new Y(t,1,!1,e,null,!1,!1)}),"xlink:actuate xlink:arcrole xlink:role xlink:show xlink:title xlink:type".split(" ").forEach(function(e){var t=e.replace(_e,we);Q[t]=new Y(t,1,!1,e,"http://www.w3.org/1999/xlink",!1,!1)}),["xml:base","xml:lang","xml:space"].forEach(function(e){var t=e.replace(_e,we);Q[t]=new Y(t,1,!1,e,"http://www.w3.org/XML/1998/namespace",!1,!1)}),["tabIndex","crossOrigin"].forEach(function(e){Q[e]=new Y(e,1,!1,e.toLowerCase(),null,!1,!1)}),Q.xlinkHref=new Y("xlinkHref",1,!1,"xlink:href","http://www.w3.org/1999/xlink",!0,!1),["src","href","action","formAction"].forEach(function(e){Q[e]=new Y(e,1,!1,e.toLowerCase(),null,!0,!0)});function Fe(e,t,n,r){var l=Q.hasOwnProperty(t)?Q[t]:null;(l!==null?l.type!==0:r||!(2<t.length)||t[0]!=="o"&&t[0]!=="O"||t[1]!=="n"&&t[1]!=="N")&&(se(t,n,l,r)&&(n=null),r||l===null?$(t)&&(n===null?e.removeAttribute(t):e.setAttribute(t,""+n)):l.mustUseProperty?e[l.propertyName]=n===null?l.type===3?!1:"":n:(t=l.attributeName,r=l.attributeNamespace,n===null?e.removeAttribute(t):(l=l.type,n=l===3||l===4&&n===!0?"":""+n,r?e.setAttributeNS(r,t,n):e.setAttribute(t,n))))}var fe=g.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED,Oe=Symbol.for("react.element"),ve=Symbol.for("react.portal"),ke=Symbol.for("react.fragment"),qe=Symbol.for("react.strict_mode"),Ft=Symbol.for("react.profiler"),_t=Symbol.for("react.provider"),Yt=Symbol.for("react.context"),dt=Symbol.for("react.forward_ref"),$e=Symbol.for("react.suspense"),lt=Symbol.for("react.suspense_list"),pt=Symbol.for("react.memo"),je=Symbol.for("react.lazy"),me=Symbol.for("react.offscreen"),D=Symbol.iterator;function b(e){return e===null||typeof e!="object"?null:(e=D&&e[D]||e["@@iterator"],typeof e=="function"?e:null)}var L=Object.assign,h;function k(e){if(h===void 0)try{throw Error()}catch(n){var t=n.stack.trim().match(/\n( *(at )?)/);h=t&&t[1]||""}return`
`+h+e}var G=!1;function X(e,t){if(!e||G)return"";G=!0;var n=Error.prepareStackTrace;Error.prepareStackTrace=void 0;try{if(t)if(t=function(){throw Error()},Object.defineProperty(t.prototype,"props",{set:function(){throw Error()}}),typeof Reflect=="object"&&Reflect.construct){try{Reflect.construct(t,[])}catch(x){var r=x}Reflect.construct(e,[],t)}else{try{t.call()}catch(x){r=x}e.call(t.prototype)}else{try{throw Error()}catch(x){r=x}e()}}catch(x){if(x&&r&&typeof x.stack=="string"){for(var l=x.stack.split(`
`),o=r.stack.split(`
`),u=l.length-1,c=o.length-1;1<=u&&0<=c&&l[u]!==o[c];)c--;for(;1<=u&&0<=c;u--,c--)if(l[u]!==o[c]){if(u!==1||c!==1)do if(u--,c--,0>c||l[u]!==o[c]){var d=`
`+l[u].replace(" at new "," at ");return e.displayName&&d.includes("<anonymous>")&&(d=d.replace("<anonymous>",e.displayName)),d}while(1<=u&&0<=c);break}}}finally{G=!1,Error.prepareStackTrace=n}return(e=e?e.displayName||e.name:"")?k(e):""}function Z(e){switch(e.tag){case 5:return k(e.type);case 16:return k("Lazy");case 13:return k("Suspense");case 19:return k("SuspenseList");case 0:case 2:case 15:return e=X(e.type,!1),e;case 11:return e=X(e.type.render,!1),e;case 1:return e=X(e.type,!0),e;default:return""}}function J(e){if(e==null)return null;if(typeof e=="function")return e.displayName||e.name||null;if(typeof e=="string")return e;switch(e){case ke:return"Fragment";case ve:return"Portal";case Ft:return"Profiler";case qe:return"StrictMode";case $e:return"Suspense";case lt:return"SuspenseList"}if(typeof e=="object")switch(e.$$typeof){case Yt:return(e.displayName||"Context")+".Consumer";case _t:return(e._context.displayName||"Context")+".Provider";case dt:var t=e.render;return e=e.displayName,e||(e=t.displayName||t.name||"",e=e!==""?"ForwardRef("+e+")":"ForwardRef"),e;case pt:return t=e.displayName||null,t!==null?t:J(e.type)||"Memo";case je:t=e._payload,e=e._init;try{return J(e(t))}catch{}}return null}function le(e){var t=e.type;switch(e.tag){case 24:return"Cache";case 9:return(t.displayName||"Context")+".Consumer";case 10:return(t._context.displayName||"Context")+".Provider";case 18:return"DehydratedFragment";case 11:return e=t.render,e=e.displayName||e.name||"",t.displayName||(e!==""?"ForwardRef("+e+")":"ForwardRef");case 7:return"Fragment";case 5:return t;case 4:return"Portal";case 3:return"Root";case 6:return"Text";case 16:return J(t);case 8:return t===qe?"StrictMode":"Mode";case 22:return"Offscreen";case 12:return"Profiler";case 21:return"Scope";case 13:return"Suspense";case 19:return"SuspenseList";case 25:return"TracingMarker";case 1:case 0:case 17:case 2:case 14:case 15:if(typeof t=="function")return t.displayName||t.name||null;if(typeof t=="string")return t}return null}function te(e){switch(typeof e){case"boolean":case"number":case"string":case"undefined":return e;case"object":return e;default:return""}}function ae(e){var t=e.type;return(e=e.nodeName)&&e.toLowerCase()==="input"&&(t==="checkbox"||t==="radio")}function Qe(e){var t=ae(e)?"checked":"value",n=Object.getOwnPropertyDescriptor(e.constructor.prototype,t),r=""+e[t];if(!e.hasOwnProperty(t)&&typeof n<"u"&&typeof n.get=="function"&&typeof n.set=="function"){var l=n.get,o=n.set;return Object.defineProperty(e,t,{configurable:!0,get:function(){return l.call(this)},set:function(u){r=""+u,o.call(this,u)}}),Object.defineProperty(e,t,{enumerable:n.enumerable}),{getValue:function(){return r},setValue:function(u){r=""+u},stopTracking:function(){e._valueTracker=null,delete e[t]}}}}function kr(e){e._valueTracker||(e._valueTracker=Qe(e))}function Bi(e){if(!e)return!1;var t=e._valueTracker;if(!t)return!0;var n=t.getValue(),r="";return e&&(r=ae(e)?e.checked?"true":"false":e.value),e=r,e!==n?(t.setValue(e),!0):!1}function Er(e){if(e=e||(typeof document<"u"?document:void 0),typeof e>"u")return null;try{return e.activeElement||e.body}catch{return e.body}}function Ol(e,t){var n=t.checked;return L({},t,{defaultChecked:void 0,defaultValue:void 0,value:void 0,checked:n??e._wrapperState.initialChecked})}function Vi(e,t){var n=t.defaultValue==null?"":t.defaultValue,r=t.checked!=null?t.checked:t.defaultChecked;n=te(t.value!=null?t.value:n),e._wrapperState={initialChecked:r,initialValue:n,controlled:t.type==="checkbox"||t.type==="radio"?t.checked!=null:t.value!=null}}function Ui(e,t){t=t.checked,t!=null&&Fe(e,"checked",t,!1)}function jl(e,t){Ui(e,t);var n=te(t.value),r=t.type;if(n!=null)r==="number"?(n===0&&e.value===""||e.value!=n)&&(e.value=""+n):e.value!==""+n&&(e.value=""+n);else if(r==="submit"||r==="reset"){e.removeAttribute("value");return}t.hasOwnProperty("value")?Bl(e,t.type,n):t.hasOwnProperty("defaultValue")&&Bl(e,t.type,te(t.defaultValue)),t.checked==null&&t.defaultChecked!=null&&(e.defaultChecked=!!t.defaultChecked)}function bi(e,t,n){if(t.hasOwnProperty("value")||t.hasOwnProperty("defaultValue")){var r=t.type;if(!(r!=="submit"&&r!=="reset"||t.value!==void 0&&t.value!==null))return;t=""+e._wrapperState.initialValue,n||t===e.value||(e.value=t),e.defaultValue=t}n=e.name,n!==""&&(e.name=""),e.defaultChecked=!!e._wrapperState.initialChecked,n!==""&&(e.name=n)}function Bl(e,t,n){(t!=="number"||Er(e.ownerDocument)!==e)&&(n==null?e.defaultValue=""+e._wrapperState.initialValue:e.defaultValue!==""+n&&(e.defaultValue=""+n))}var On=Array.isArray;function dn(e,t,n,r){if(e=e.options,t){t={};for(var l=0;l<n.length;l++)t["$"+n[l]]=!0;for(n=0;n<e.length;n++)l=t.hasOwnProperty("$"+e[n].value),e[n].selected!==l&&(e[n].selected=l),l&&r&&(e[n].defaultSelected=!0)}else{for(n=""+te(n),t=null,l=0;l<e.length;l++){if(e[l].value===n){e[l].selected=!0,r&&(e[l].defaultSelected=!0);return}t!==null||e[l].disabled||(t=e[l])}t!==null&&(t.selected=!0)}}function Vl(e,t){if(t.dangerouslySetInnerHTML!=null)throw Error(i(91));return L({},t,{value:void 0,defaultValue:void 0,children:""+e._wrapperState.initialValue})}function Wi(e,t){var n=t.value;if(n==null){if(n=t.children,t=t.defaultValue,n!=null){if(t!=null)throw Error(i(92));if(On(n)){if(1<n.length)throw Error(i(93));n=n[0]}t=n}t==null&&(t=""),n=t}e._wrapperState={initialValue:te(n)}}function Hi(e,t){var n=te(t.value),r=te(t.defaultValue);n!=null&&(n=""+n,n!==e.value&&(e.value=n),t.defaultValue==null&&e.defaultValue!==n&&(e.defaultValue=n)),r!=null&&(e.defaultValue=""+r)}function $i(e){var t=e.textContent;t===e._wrapperState.initialValue&&t!==""&&t!==null&&(e.value=t)}function Qi(e){switch(e){case"svg":return"http://www.w3.org/2000/svg";case"math":return"http://www.w3.org/1998/Math/MathML";default:return"http://www.w3.org/1999/xhtml"}}function Ul(e,t){return e==null||e==="http://www.w3.org/1999/xhtml"?Qi(t):e==="http://www.w3.org/2000/svg"&&t==="foreignObject"?"http://www.w3.org/1999/xhtml":e}var Tr,Gi=(function(e){return typeof MSApp<"u"&&MSApp.execUnsafeLocalFunction?function(t,n,r,l){MSApp.execUnsafeLocalFunction(function(){return e(t,n,r,l)})}:e})(function(e,t){if(e.namespaceURI!=="http://www.w3.org/2000/svg"||"innerHTML"in e)e.innerHTML=t;else{for(Tr=Tr||document.createElement("div"),Tr.innerHTML="<svg>"+t.valueOf().toString()+"</svg>",t=Tr.firstChild;e.firstChild;)e.removeChild(e.firstChild);for(;t.firstChild;)e.appendChild(t.firstChild)}});function jn(e,t){if(t){var n=e.firstChild;if(n&&n===e.lastChild&&n.nodeType===3){n.nodeValue=t;return}}e.textContent=t}var Bn={animationIterationCount:!0,aspectRatio:!0,borderImageOutset:!0,borderImageSlice:!0,borderImageWidth:!0,boxFlex:!0,boxFlexGroup:!0,boxOrdinalGroup:!0,columnCount:!0,columns:!0,flex:!0,flexGrow:!0,flexPositive:!0,flexShrink:!0,flexNegative:!0,flexOrder:!0,gridArea:!0,gridRow:!0,gridRowEnd:!0,gridRowSpan:!0,gridRowStart:!0,gridColumn:!0,gridColumnEnd:!0,gridColumnSpan:!0,gridColumnStart:!0,fontWeight:!0,lineClamp:!0,lineHeight:!0,opacity:!0,order:!0,orphans:!0,tabSize:!0,widows:!0,zIndex:!0,zoom:!0,fillOpacity:!0,floodOpacity:!0,stopOpacity:!0,strokeDasharray:!0,strokeDashoffset:!0,strokeMiterlimit:!0,strokeOpacity:!0,strokeWidth:!0},Wa=["Webkit","ms","Moz","O"];Object.keys(Bn).forEach(function(e){Wa.forEach(function(t){t=t+e.charAt(0).toUpperCase()+e.substring(1),Bn[t]=Bn[e]})});function Ki(e,t,n){return t==null||typeof t=="boolean"||t===""?"":n||typeof t!="number"||t===0||Bn.hasOwnProperty(e)&&Bn[e]?(""+t).trim():t+"px"}function Xi(e,t){e=e.style;for(var n in t)if(t.hasOwnProperty(n)){var r=n.indexOf("--")===0,l=Ki(n,t[n],r);n==="float"&&(n="cssFloat"),r?e.setProperty(n,l):e[n]=l}}var Ha=L({menuitem:!0},{area:!0,base:!0,br:!0,col:!0,embed:!0,hr:!0,img:!0,input:!0,keygen:!0,link:!0,meta:!0,param:!0,source:!0,track:!0,wbr:!0});function bl(e,t){if(t){if(Ha[e]&&(t.children!=null||t.dangerouslySetInnerHTML!=null))throw Error(i(137,e));if(t.dangerouslySetInnerHTML!=null){if(t.children!=null)throw Error(i(60));if(typeof t.dangerouslySetInnerHTML!="object"||!("__html"in t.dangerouslySetInnerHTML))throw Error(i(61))}if(t.style!=null&&typeof t.style!="object")throw Error(i(62))}}function Wl(e,t){if(e.indexOf("-")===-1)return typeof t.is=="string";switch(e){case"annotation-xml":case"color-profile":case"font-face":case"font-face-src":case"font-face-uri":case"font-face-format":case"font-face-name":case"missing-glyph":return!1;default:return!0}}var Hl=null;function $l(e){return e=e.target||e.srcElement||window,e.correspondingUseElement&&(e=e.correspondingUseElement),e.nodeType===3?e.parentNode:e}var Ql=null,pn=null,mn=null;function Yi(e){if(e=ur(e)){if(typeof Ql!="function")throw Error(i(280));var t=e.stateNode;t&&(t=Xr(t),Ql(e.stateNode,e.type,t))}}function qi(e){pn?mn?mn.push(e):mn=[e]:pn=e}function Zi(){if(pn){var e=pn,t=mn;if(mn=pn=null,Yi(e),t)for(e=0;e<t.length;e++)Yi(t[e])}}function Ji(e,t){return e(t)}function eu(){}var Gl=!1;function tu(e,t,n){if(Gl)return e(t,n);Gl=!0;try{return Ji(e,t,n)}finally{Gl=!1,(pn!==null||mn!==null)&&(eu(),Zi())}}function Vn(e,t){var n=e.stateNode;if(n===null)return null;var r=Xr(n);if(r===null)return null;n=r[t];e:switch(t){case"onClick":case"onClickCapture":case"onDoubleClick":case"onDoubleClickCapture":case"onMouseDown":case"onMouseDownCapture":case"onMouseMove":case"onMouseMoveCapture":case"onMouseUp":case"onMouseUpCapture":case"onMouseEnter":(r=!r.disabled)||(e=e.type,r=!(e==="button"||e==="input"||e==="select"||e==="textarea")),e=!r;break e;default:e=!1}if(e)return null;if(n&&typeof n!="function")throw Error(i(231,t,typeof n));return n}var Kl=!1;if(S)try{var Un={};Object.defineProperty(Un,"passive",{get:function(){Kl=!0}}),window.addEventListener("test",Un,Un),window.removeEventListener("test",Un,Un)}catch{Kl=!1}function $a(e,t,n,r,l,o,u,c,d){var x=Array.prototype.slice.call(arguments,3);try{t.apply(n,x)}catch(E){this.onError(E)}}var bn=!1,Rr=null,Fr=!1,Xl=null,Qa={onError:function(e){bn=!0,Rr=e}};function Ga(e,t,n,r,l,o,u,c,d){bn=!1,Rr=null,$a.apply(Qa,arguments)}function Ka(e,t,n,r,l,o,u,c,d){if(Ga.apply(this,arguments),bn){if(bn){var x=Rr;bn=!1,Rr=null}else throw Error(i(198));Fr||(Fr=!0,Xl=x)}}function qt(e){var t=e,n=e;if(e.alternate)for(;t.return;)t=t.return;else{e=t;do t=e,(t.flags&4098)!==0&&(n=t.return),e=t.return;while(e)}return t.tag===3?n:null}function nu(e){if(e.tag===13){var t=e.memoizedState;if(t===null&&(e=e.alternate,e!==null&&(t=e.memoizedState)),t!==null)return t.dehydrated}return null}function ru(e){if(qt(e)!==e)throw Error(i(188))}function Xa(e){var t=e.alternate;if(!t){if(t=qt(e),t===null)throw Error(i(188));return t!==e?null:e}for(var n=e,r=t;;){var l=n.return;if(l===null)break;var o=l.alternate;if(o===null){if(r=l.return,r!==null){n=r;continue}break}if(l.child===o.child){for(o=l.child;o;){if(o===n)return ru(l),e;if(o===r)return ru(l),t;o=o.sibling}throw Error(i(188))}if(n.return!==r.return)n=l,r=o;else{for(var u=!1,c=l.child;c;){if(c===n){u=!0,n=l,r=o;break}if(c===r){u=!0,r=l,n=o;break}c=c.sibling}if(!u){for(c=o.child;c;){if(c===n){u=!0,n=o,r=l;break}if(c===r){u=!0,r=o,n=l;break}c=c.sibling}if(!u)throw Error(i(189))}}if(n.alternate!==r)throw Error(i(190))}if(n.tag!==3)throw Error(i(188));return n.stateNode.current===n?e:t}function lu(e){return e=Xa(e),e!==null?ou(e):null}function ou(e){if(e.tag===5||e.tag===6)return e;for(e=e.child;e!==null;){var t=ou(e);if(t!==null)return t;e=e.sibling}return null}var iu=s.unstable_scheduleCallback,uu=s.unstable_cancelCallback,Ya=s.unstable_shouldYield,qa=s.unstable_requestPaint,ge=s.unstable_now,Za=s.unstable_getCurrentPriorityLevel,Yl=s.unstable_ImmediatePriority,su=s.unstable_UserBlockingPriority,Ir=s.unstable_NormalPriority,Ja=s.unstable_LowPriority,au=s.unstable_IdlePriority,Pr=null,mt=null;function ec(e){if(mt&&typeof mt.onCommitFiberRoot=="function")try{mt.onCommitFiberRoot(Pr,e,void 0,(e.current.flags&128)===128)}catch{}}var ot=Math.clz32?Math.clz32:rc,tc=Math.log,nc=Math.LN2;function rc(e){return e>>>=0,e===0?32:31-(tc(e)/nc|0)|0}var Ar=64,Nr=4194304;function Wn(e){switch(e&-e){case 1:return 1;case 2:return 2;case 4:return 4;case 8:return 8;case 16:return 16;case 32:return 32;case 64:case 128:case 256:case 512:case 1024:case 2048:case 4096:case 8192:case 16384:case 32768:case 65536:case 131072:case 262144:case 524288:case 1048576:case 2097152:return e&4194240;case 4194304:case 8388608:case 16777216:case 33554432:case 67108864:return e&130023424;case 134217728:return 134217728;case 268435456:return 268435456;case 536870912:return 536870912;case 1073741824:return 1073741824;default:return e}}function Dr(e,t){var n=e.pendingLanes;if(n===0)return 0;var r=0,l=e.suspendedLanes,o=e.pingedLanes,u=n&268435455;if(u!==0){var c=u&~l;c!==0?r=Wn(c):(o&=u,o!==0&&(r=Wn(o)))}else u=n&~l,u!==0?r=Wn(u):o!==0&&(r=Wn(o));if(r===0)return 0;if(t!==0&&t!==r&&(t&l)===0&&(l=r&-r,o=t&-t,l>=o||l===16&&(o&4194240)!==0))return t;if((r&4)!==0&&(r|=n&16),t=e.entangledLanes,t!==0)for(e=e.entanglements,t&=r;0<t;)n=31-ot(t),l=1<<n,r|=e[n],t&=~l;return r}function lc(e,t){switch(e){case 1:case 2:case 4:return t+250;case 8:case 16:case 32:case 64:case 128:case 256:case 512:case 1024:case 2048:case 4096:case 8192:case 16384:case 32768:case 65536:case 131072:case 262144:case 524288:case 1048576:case 2097152:return t+5e3;case 4194304:case 8388608:case 16777216:case 33554432:case 67108864:return-1;case 134217728:case 268435456:case 536870912:case 1073741824:return-1;default:return-1}}function oc(e,t){for(var n=e.suspendedLanes,r=e.pingedLanes,l=e.expirationTimes,o=e.pendingLanes;0<o;){var u=31-ot(o),c=1<<u,d=l[u];d===-1?((c&n)===0||(c&r)!==0)&&(l[u]=lc(c,t)):d<=t&&(e.expiredLanes|=c),o&=~c}}function ql(e){return e=e.pendingLanes&-1073741825,e!==0?e:e&1073741824?1073741824:0}function cu(){var e=Ar;return Ar<<=1,(Ar&4194240)===0&&(Ar=64),e}function Zl(e){for(var t=[],n=0;31>n;n++)t.push(e);return t}function Hn(e,t,n){e.pendingLanes|=t,t!==536870912&&(e.suspendedLanes=0,e.pingedLanes=0),e=e.eventTimes,t=31-ot(t),e[t]=n}function ic(e,t){var n=e.pendingLanes&~t;e.pendingLanes=t,e.suspendedLanes=0,e.pingedLanes=0,e.expiredLanes&=t,e.mutableReadLanes&=t,e.entangledLanes&=t,t=e.entanglements;var r=e.eventTimes;for(e=e.expirationTimes;0<n;){var l=31-ot(n),o=1<<l;t[l]=0,r[l]=-1,e[l]=-1,n&=~o}}function Jl(e,t){var n=e.entangledLanes|=t;for(e=e.entanglements;n;){var r=31-ot(n),l=1<<r;l&t|e[r]&t&&(e[r]|=t),n&=~l}}var ne=0;function fu(e){return e&=-e,1<e?4<e?(e&268435455)!==0?16:536870912:4:1}var du,eo,pu,mu,hu,to=!1,zr=[],It=null,Pt=null,At=null,$n=new Map,Qn=new Map,Nt=[],uc="mousedown mouseup touchcancel touchend touchstart auxclick dblclick pointercancel pointerdown pointerup dragend dragstart drop compositionend compositionstart keydown keypress keyup input textInput copy cut paste click change contextmenu reset submit".split(" ");function vu(e,t){switch(e){case"focusin":case"focusout":It=null;break;case"dragenter":case"dragleave":Pt=null;break;case"mouseover":case"mouseout":At=null;break;case"pointerover":case"pointerout":$n.delete(t.pointerId);break;case"gotpointercapture":case"lostpointercapture":Qn.delete(t.pointerId)}}function Gn(e,t,n,r,l,o){return e===null||e.nativeEvent!==o?(e={blockedOn:t,domEventName:n,eventSystemFlags:r,nativeEvent:o,targetContainers:[l]},t!==null&&(t=ur(t),t!==null&&eo(t)),e):(e.eventSystemFlags|=r,t=e.targetContainers,l!==null&&t.indexOf(l)===-1&&t.push(l),e)}function sc(e,t,n,r,l){switch(t){case"focusin":return It=Gn(It,e,t,n,r,l),!0;case"dragenter":return Pt=Gn(Pt,e,t,n,r,l),!0;case"mouseover":return At=Gn(At,e,t,n,r,l),!0;case"pointerover":var o=l.pointerId;return $n.set(o,Gn($n.get(o)||null,e,t,n,r,l)),!0;case"gotpointercapture":return o=l.pointerId,Qn.set(o,Gn(Qn.get(o)||null,e,t,n,r,l)),!0}return!1}function gu(e){var t=Zt(e.target);if(t!==null){var n=qt(t);if(n!==null){if(t=n.tag,t===13){if(t=nu(n),t!==null){e.blockedOn=t,hu(e.priority,function(){pu(n)});return}}else if(t===3&&n.stateNode.current.memoizedState.isDehydrated){e.blockedOn=n.tag===3?n.stateNode.containerInfo:null;return}}}e.blockedOn=null}function Mr(e){if(e.blockedOn!==null)return!1;for(var t=e.targetContainers;0<t.length;){var n=ro(e.domEventName,e.eventSystemFlags,t[0],e.nativeEvent);if(n===null){n=e.nativeEvent;var r=new n.constructor(n.type,n);Hl=r,n.target.dispatchEvent(r),Hl=null}else return t=ur(n),t!==null&&eo(t),e.blockedOn=n,!1;t.shift()}return!0}function yu(e,t,n){Mr(e)&&n.delete(t)}function ac(){to=!1,It!==null&&Mr(It)&&(It=null),Pt!==null&&Mr(Pt)&&(Pt=null),At!==null&&Mr(At)&&(At=null),$n.forEach(yu),Qn.forEach(yu)}function Kn(e,t){e.blockedOn===t&&(e.blockedOn=null,to||(to=!0,s.unstable_scheduleCallback(s.unstable_NormalPriority,ac)))}function Xn(e){function t(l){return Kn(l,e)}if(0<zr.length){Kn(zr[0],e);for(var n=1;n<zr.length;n++){var r=zr[n];r.blockedOn===e&&(r.blockedOn=null)}}for(It!==null&&Kn(It,e),Pt!==null&&Kn(Pt,e),At!==null&&Kn(At,e),$n.forEach(t),Qn.forEach(t),n=0;n<Nt.length;n++)r=Nt[n],r.blockedOn===e&&(r.blockedOn=null);for(;0<Nt.length&&(n=Nt[0],n.blockedOn===null);)gu(n),n.blockedOn===null&&Nt.shift()}var hn=fe.ReactCurrentBatchConfig,Lr=!0;function cc(e,t,n,r){var l=ne,o=hn.transition;hn.transition=null;try{ne=1,no(e,t,n,r)}finally{ne=l,hn.transition=o}}function fc(e,t,n,r){var l=ne,o=hn.transition;hn.transition=null;try{ne=4,no(e,t,n,r)}finally{ne=l,hn.transition=o}}function no(e,t,n,r){if(Lr){var l=ro(e,t,n,r);if(l===null)wo(e,t,r,Or,n),vu(e,r);else if(sc(l,e,t,n,r))r.stopPropagation();else if(vu(e,r),t&4&&-1<uc.indexOf(e)){for(;l!==null;){var o=ur(l);if(o!==null&&du(o),o=ro(e,t,n,r),o===null&&wo(e,t,r,Or,n),o===l)break;l=o}l!==null&&r.stopPropagation()}else wo(e,t,r,null,n)}}var Or=null;function ro(e,t,n,r){if(Or=null,e=$l(r),e=Zt(e),e!==null)if(t=qt(e),t===null)e=null;else if(n=t.tag,n===13){if(e=nu(t),e!==null)return e;e=null}else if(n===3){if(t.stateNode.current.memoizedState.isDehydrated)return t.tag===3?t.stateNode.containerInfo:null;e=null}else t!==e&&(e=null);return Or=e,null}function _u(e){switch(e){case"cancel":case"click":case"close":case"contextmenu":case"copy":case"cut":case"auxclick":case"dblclick":case"dragend":case"dragstart":case"drop":case"focusin":case"focusout":case"input":case"invalid":case"keydown":case"keypress":case"keyup":case"mousedown":case"mouseup":case"paste":case"pause":case"play":case"pointercancel":case"pointerdown":case"pointerup":case"ratechange":case"reset":case"resize":case"seeked":case"submit":case"touchcancel":case"touchend":case"touchstart":case"volumechange":case"change":case"selectionchange":case"textInput":case"compositionstart":case"compositionend":case"compositionupdate":case"beforeblur":case"afterblur":case"beforeinput":case"blur":case"fullscreenchange":case"focus":case"hashchange":case"popstate":case"select":case"selectstart":return 1;case"drag":case"dragenter":case"dragexit":case"dragleave":case"dragover":case"mousemove":case"mouseout":case"mouseover":case"pointermove":case"pointerout":case"pointerover":case"scroll":case"toggle":case"touchmove":case"wheel":case"mouseenter":case"mouseleave":case"pointerenter":case"pointerleave":return 4;case"message":switch(Za()){case Yl:return 1;case su:return 4;case Ir:case Ja:return 16;case au:return 536870912;default:return 16}default:return 16}}var Dt=null,lo=null,jr=null;function xu(){if(jr)return jr;var e,t=lo,n=t.length,r,l="value"in Dt?Dt.value:Dt.textContent,o=l.length;for(e=0;e<n&&t[e]===l[e];e++);var u=n-e;for(r=1;r<=u&&t[n-r]===l[o-r];r++);return jr=l.slice(e,1<r?1-r:void 0)}function Br(e){var t=e.keyCode;return"charCode"in e?(e=e.charCode,e===0&&t===13&&(e=13)):e=t,e===10&&(e=13),32<=e||e===13?e:0}function Vr(){return!0}function wu(){return!1}function Ge(e){function t(n,r,l,o,u){this._reactName=n,this._targetInst=l,this.type=r,this.nativeEvent=o,this.target=u,this.currentTarget=null;for(var c in e)e.hasOwnProperty(c)&&(n=e[c],this[c]=n?n(o):o[c]);return this.isDefaultPrevented=(o.defaultPrevented!=null?o.defaultPrevented:o.returnValue===!1)?Vr:wu,this.isPropagationStopped=wu,this}return L(t.prototype,{preventDefault:function(){this.defaultPrevented=!0;var n=this.nativeEvent;n&&(n.preventDefault?n.preventDefault():typeof n.returnValue!="unknown"&&(n.returnValue=!1),this.isDefaultPrevented=Vr)},stopPropagation:function(){var n=this.nativeEvent;n&&(n.stopPropagation?n.stopPropagation():typeof n.cancelBubble!="unknown"&&(n.cancelBubble=!0),this.isPropagationStopped=Vr)},persist:function(){},isPersistent:Vr}),t}var vn={eventPhase:0,bubbles:0,cancelable:0,timeStamp:function(e){return e.timeStamp||Date.now()},defaultPrevented:0,isTrusted:0},oo=Ge(vn),Yn=L({},vn,{view:0,detail:0}),dc=Ge(Yn),io,uo,qn,Ur=L({},Yn,{screenX:0,screenY:0,clientX:0,clientY:0,pageX:0,pageY:0,ctrlKey:0,shiftKey:0,altKey:0,metaKey:0,getModifierState:ao,button:0,buttons:0,relatedTarget:function(e){return e.relatedTarget===void 0?e.fromElement===e.srcElement?e.toElement:e.fromElement:e.relatedTarget},movementX:function(e){return"movementX"in e?e.movementX:(e!==qn&&(qn&&e.type==="mousemove"?(io=e.screenX-qn.screenX,uo=e.screenY-qn.screenY):uo=io=0,qn=e),io)},movementY:function(e){return"movementY"in e?e.movementY:uo}}),Su=Ge(Ur),pc=L({},Ur,{dataTransfer:0}),mc=Ge(pc),hc=L({},Yn,{relatedTarget:0}),so=Ge(hc),vc=L({},vn,{animationName:0,elapsedTime:0,pseudoElement:0}),gc=Ge(vc),yc=L({},vn,{clipboardData:function(e){return"clipboardData"in e?e.clipboardData:window.clipboardData}}),_c=Ge(yc),xc=L({},vn,{data:0}),Cu=Ge(xc),wc={Esc:"Escape",Spacebar:" ",Left:"ArrowLeft",Up:"ArrowUp",Right:"ArrowRight",Down:"ArrowDown",Del:"Delete",Win:"OS",Menu:"ContextMenu",Apps:"ContextMenu",Scroll:"ScrollLock",MozPrintableKey:"Unidentified"},Sc={8:"Backspace",9:"Tab",12:"Clear",13:"Enter",16:"Shift",17:"Control",18:"Alt",19:"Pause",20:"CapsLock",27:"Escape",32:" ",33:"PageUp",34:"PageDown",35:"End",36:"Home",37:"ArrowLeft",38:"ArrowUp",39:"ArrowRight",40:"ArrowDown",45:"Insert",46:"Delete",112:"F1",113:"F2",114:"F3",115:"F4",116:"F5",117:"F6",118:"F7",119:"F8",120:"F9",121:"F10",122:"F11",123:"F12",144:"NumLock",145:"ScrollLock",224:"Meta"},Cc={Alt:"altKey",Control:"ctrlKey",Meta:"metaKey",Shift:"shiftKey"};function kc(e){var t=this.nativeEvent;return t.getModifierState?t.getModifierState(e):(e=Cc[e])?!!t[e]:!1}function ao(){return kc}var Ec=L({},Yn,{key:function(e){if(e.key){var t=wc[e.key]||e.key;if(t!=="Unidentified")return t}return e.type==="keypress"?(e=Br(e),e===13?"Enter":String.fromCharCode(e)):e.type==="keydown"||e.type==="keyup"?Sc[e.keyCode]||"Unidentified":""},code:0,location:0,ctrlKey:0,shiftKey:0,altKey:0,metaKey:0,repeat:0,locale:0,getModifierState:ao,charCode:function(e){return e.type==="keypress"?Br(e):0},keyCode:function(e){return e.type==="keydown"||e.type==="keyup"?e.keyCode:0},which:function(e){return e.type==="keypress"?Br(e):e.type==="keydown"||e.type==="keyup"?e.keyCode:0}}),Tc=Ge(Ec),Rc=L({},Ur,{pointerId:0,width:0,height:0,pressure:0,tangentialPressure:0,tiltX:0,tiltY:0,twist:0,pointerType:0,isPrimary:0}),ku=Ge(Rc),Fc=L({},Yn,{touches:0,targetTouches:0,changedTouches:0,altKey:0,metaKey:0,ctrlKey:0,shiftKey:0,getModifierState:ao}),Ic=Ge(Fc),Pc=L({},vn,{propertyName:0,elapsedTime:0,pseudoElement:0}),Ac=Ge(Pc),Nc=L({},Ur,{deltaX:function(e){return"deltaX"in e?e.deltaX:"wheelDeltaX"in e?-e.wheelDeltaX:0},deltaY:function(e){return"deltaY"in e?e.deltaY:"wheelDeltaY"in e?-e.wheelDeltaY:"wheelDelta"in e?-e.wheelDelta:0},deltaZ:0,deltaMode:0}),Dc=Ge(Nc),zc=[9,13,27,32],co=S&&"CompositionEvent"in window,Zn=null;S&&"documentMode"in document&&(Zn=document.documentMode);var Mc=S&&"TextEvent"in window&&!Zn,Eu=S&&(!co||Zn&&8<Zn&&11>=Zn),Tu=" ",Ru=!1;function Fu(e,t){switch(e){case"keyup":return zc.indexOf(t.keyCode)!==-1;case"keydown":return t.keyCode!==229;case"keypress":case"mousedown":case"focusout":return!0;default:return!1}}function Iu(e){return e=e.detail,typeof e=="object"&&"data"in e?e.data:null}var gn=!1;function Lc(e,t){switch(e){case"compositionend":return Iu(t);case"keypress":return t.which!==32?null:(Ru=!0,Tu);case"textInput":return e=t.data,e===Tu&&Ru?null:e;default:return null}}function Oc(e,t){if(gn)return e==="compositionend"||!co&&Fu(e,t)?(e=xu(),jr=lo=Dt=null,gn=!1,e):null;switch(e){case"paste":return null;case"keypress":if(!(t.ctrlKey||t.altKey||t.metaKey)||t.ctrlKey&&t.altKey){if(t.char&&1<t.char.length)return t.char;if(t.which)return String.fromCharCode(t.which)}return null;case"compositionend":return Eu&&t.locale!=="ko"?null:t.data;default:return null}}var jc={color:!0,date:!0,datetime:!0,"datetime-local":!0,email:!0,month:!0,number:!0,password:!0,range:!0,search:!0,tel:!0,text:!0,time:!0,url:!0,week:!0};function Pu(e){var t=e&&e.nodeName&&e.nodeName.toLowerCase();return t==="input"?!!jc[e.type]:t==="textarea"}function Au(e,t,n,r){qi(r),t=Qr(t,"onChange"),0<t.length&&(n=new oo("onChange","change",null,n,r),e.push({event:n,listeners:t}))}var Jn=null,er=null;function Bc(e){Xu(e,0)}function br(e){var t=Sn(e);if(Bi(t))return e}function Vc(e,t){if(e==="change")return t}var Nu=!1;if(S){var fo;if(S){var po="oninput"in document;if(!po){var Du=document.createElement("div");Du.setAttribute("oninput","return;"),po=typeof Du.oninput=="function"}fo=po}else fo=!1;Nu=fo&&(!document.documentMode||9<document.documentMode)}function zu(){Jn&&(Jn.detachEvent("onpropertychange",Mu),er=Jn=null)}function Mu(e){if(e.propertyName==="value"&&br(er)){var t=[];Au(t,er,e,$l(e)),tu(Bc,t)}}function Uc(e,t,n){e==="focusin"?(zu(),Jn=t,er=n,Jn.attachEvent("onpropertychange",Mu)):e==="focusout"&&zu()}function bc(e){if(e==="selectionchange"||e==="keyup"||e==="keydown")return br(er)}function Wc(e,t){if(e==="click")return br(t)}function Hc(e,t){if(e==="input"||e==="change")return br(t)}function $c(e,t){return e===t&&(e!==0||1/e===1/t)||e!==e&&t!==t}var it=typeof Object.is=="function"?Object.is:$c;function tr(e,t){if(it(e,t))return!0;if(typeof e!="object"||e===null||typeof t!="object"||t===null)return!1;var n=Object.keys(e),r=Object.keys(t);if(n.length!==r.length)return!1;for(r=0;r<n.length;r++){var l=n[r];if(!T.call(t,l)||!it(e[l],t[l]))return!1}return!0}function Lu(e){for(;e&&e.firstChild;)e=e.firstChild;return e}function Ou(e,t){var n=Lu(e);e=0;for(var r;n;){if(n.nodeType===3){if(r=e+n.textContent.length,e<=t&&r>=t)return{node:n,offset:t-e};e=r}e:{for(;n;){if(n.nextSibling){n=n.nextSibling;break e}n=n.parentNode}n=void 0}n=Lu(n)}}function ju(e,t){return e&&t?e===t?!0:e&&e.nodeType===3?!1:t&&t.nodeType===3?ju(e,t.parentNode):"contains"in e?e.contains(t):e.compareDocumentPosition?!!(e.compareDocumentPosition(t)&16):!1:!1}function Bu(){for(var e=window,t=Er();t instanceof e.HTMLIFrameElement;){try{var n=typeof t.contentWindow.location.href=="string"}catch{n=!1}if(n)e=t.contentWindow;else break;t=Er(e.document)}return t}function mo(e){var t=e&&e.nodeName&&e.nodeName.toLowerCase();return t&&(t==="input"&&(e.type==="text"||e.type==="search"||e.type==="tel"||e.type==="url"||e.type==="password")||t==="textarea"||e.contentEditable==="true")}function Qc(e){var t=Bu(),n=e.focusedElem,r=e.selectionRange;if(t!==n&&n&&n.ownerDocument&&ju(n.ownerDocument.documentElement,n)){if(r!==null&&mo(n)){if(t=r.start,e=r.end,e===void 0&&(e=t),"selectionStart"in n)n.selectionStart=t,n.selectionEnd=Math.min(e,n.value.length);else if(e=(t=n.ownerDocument||document)&&t.defaultView||window,e.getSelection){e=e.getSelection();var l=n.textContent.length,o=Math.min(r.start,l);r=r.end===void 0?o:Math.min(r.end,l),!e.extend&&o>r&&(l=r,r=o,o=l),l=Ou(n,o);var u=Ou(n,r);l&&u&&(e.rangeCount!==1||e.anchorNode!==l.node||e.anchorOffset!==l.offset||e.focusNode!==u.node||e.focusOffset!==u.offset)&&(t=t.createRange(),t.setStart(l.node,l.offset),e.removeAllRanges(),o>r?(e.addRange(t),e.extend(u.node,u.offset)):(t.setEnd(u.node,u.offset),e.addRange(t)))}}for(t=[],e=n;e=e.parentNode;)e.nodeType===1&&t.push({element:e,left:e.scrollLeft,top:e.scrollTop});for(typeof n.focus=="function"&&n.focus(),n=0;n<t.length;n++)e=t[n],e.element.scrollLeft=e.left,e.element.scrollTop=e.top}}var Gc=S&&"documentMode"in document&&11>=document.documentMode,yn=null,ho=null,nr=null,vo=!1;function Vu(e,t,n){var r=n.window===n?n.document:n.nodeType===9?n:n.ownerDocument;vo||yn==null||yn!==Er(r)||(r=yn,"selectionStart"in r&&mo(r)?r={start:r.selectionStart,end:r.selectionEnd}:(r=(r.ownerDocument&&r.ownerDocument.defaultView||window).getSelection(),r={anchorNode:r.anchorNode,anchorOffset:r.anchorOffset,focusNode:r.focusNode,focusOffset:r.focusOffset}),nr&&tr(nr,r)||(nr=r,r=Qr(ho,"onSelect"),0<r.length&&(t=new oo("onSelect","select",null,t,n),e.push({event:t,listeners:r}),t.target=yn)))}function Wr(e,t){var n={};return n[e.toLowerCase()]=t.toLowerCase(),n["Webkit"+e]="webkit"+t,n["Moz"+e]="moz"+t,n}var _n={animationend:Wr("Animation","AnimationEnd"),animationiteration:Wr("Animation","AnimationIteration"),animationstart:Wr("Animation","AnimationStart"),transitionend:Wr("Transition","TransitionEnd")},go={},Uu={};S&&(Uu=document.createElement("div").style,"AnimationEvent"in window||(delete _n.animationend.animation,delete _n.animationiteration.animation,delete _n.animationstart.animation),"TransitionEvent"in window||delete _n.transitionend.transition);function Hr(e){if(go[e])return go[e];if(!_n[e])return e;var t=_n[e],n;for(n in t)if(t.hasOwnProperty(n)&&n in Uu)return go[e]=t[n];return e}var bu=Hr("animationend"),Wu=Hr("animationiteration"),Hu=Hr("animationstart"),$u=Hr("transitionend"),Qu=new Map,Gu="abort auxClick cancel canPlay canPlayThrough click close contextMenu copy cut drag dragEnd dragEnter dragExit dragLeave dragOver dragStart drop durationChange emptied encrypted ended error gotPointerCapture input invalid keyDown keyPress keyUp load loadedData loadedMetadata loadStart lostPointerCapture mouseDown mouseMove mouseOut mouseOver mouseUp paste pause play playing pointerCancel pointerDown pointerMove pointerOut pointerOver pointerUp progress rateChange reset resize seeked seeking stalled submit suspend timeUpdate touchCancel touchEnd touchStart volumeChange scroll toggle touchMove waiting wheel".split(" ");function zt(e,t){Qu.set(e,t),y(t,[e])}for(var yo=0;yo<Gu.length;yo++){var _o=Gu[yo],Kc=_o.toLowerCase(),Xc=_o[0].toUpperCase()+_o.slice(1);zt(Kc,"on"+Xc)}zt(bu,"onAnimationEnd"),zt(Wu,"onAnimationIteration"),zt(Hu,"onAnimationStart"),zt("dblclick","onDoubleClick"),zt("focusin","onFocus"),zt("focusout","onBlur"),zt($u,"onTransitionEnd"),w("onMouseEnter",["mouseout","mouseover"]),w("onMouseLeave",["mouseout","mouseover"]),w("onPointerEnter",["pointerout","pointerover"]),w("onPointerLeave",["pointerout","pointerover"]),y("onChange","change click focusin focusout input keydown keyup selectionchange".split(" ")),y("onSelect","focusout contextmenu dragend focusin keydown keyup mousedown mouseup selectionchange".split(" ")),y("onBeforeInput",["compositionend","keypress","textInput","paste"]),y("onCompositionEnd","compositionend focusout keydown keypress keyup mousedown".split(" ")),y("onCompositionStart","compositionstart focusout keydown keypress keyup mousedown".split(" ")),y("onCompositionUpdate","compositionupdate focusout keydown keypress keyup mousedown".split(" "));var rr="abort canplay canplaythrough durationchange emptied encrypted ended error loadeddata loadedmetadata loadstart pause play playing progress ratechange resize seeked seeking stalled suspend timeupdate volumechange waiting".split(" "),Yc=new Set("cancel close invalid load scroll toggle".split(" ").concat(rr));function Ku(e,t,n){var r=e.type||"unknown-event";e.currentTarget=n,Ka(r,t,void 0,e),e.currentTarget=null}function Xu(e,t){t=(t&4)!==0;for(var n=0;n<e.length;n++){var r=e[n],l=r.event;r=r.listeners;e:{var o=void 0;if(t)for(var u=r.length-1;0<=u;u--){var c=r[u],d=c.instance,x=c.currentTarget;if(c=c.listener,d!==o&&l.isPropagationStopped())break e;Ku(l,c,x),o=d}else for(u=0;u<r.length;u++){if(c=r[u],d=c.instance,x=c.currentTarget,c=c.listener,d!==o&&l.isPropagationStopped())break e;Ku(l,c,x),o=d}}}if(Fr)throw e=Xl,Fr=!1,Xl=null,e}function ie(e,t){var n=t[Ro];n===void 0&&(n=t[Ro]=new Set);var r=e+"__bubble";n.has(r)||(Yu(t,e,2,!1),n.add(r))}function xo(e,t,n){var r=0;t&&(r|=4),Yu(n,e,r,t)}var $r="_reactListening"+Math.random().toString(36).slice(2);function lr(e){if(!e[$r]){e[$r]=!0,a.forEach(function(n){n!=="selectionchange"&&(Yc.has(n)||xo(n,!1,e),xo(n,!0,e))});var t=e.nodeType===9?e:e.ownerDocument;t===null||t[$r]||(t[$r]=!0,xo("selectionchange",!1,t))}}function Yu(e,t,n,r){switch(_u(t)){case 1:var l=cc;break;case 4:l=fc;break;default:l=no}n=l.bind(null,t,n,e),l=void 0,!Kl||t!=="touchstart"&&t!=="touchmove"&&t!=="wheel"||(l=!0),r?l!==void 0?e.addEventListener(t,n,{capture:!0,passive:l}):e.addEventListener(t,n,!0):l!==void 0?e.addEventListener(t,n,{passive:l}):e.addEventListener(t,n,!1)}function wo(e,t,n,r,l){var o=r;if((t&1)===0&&(t&2)===0&&r!==null)e:for(;;){if(r===null)return;var u=r.tag;if(u===3||u===4){var c=r.stateNode.containerInfo;if(c===l||c.nodeType===8&&c.parentNode===l)break;if(u===4)for(u=r.return;u!==null;){var d=u.tag;if((d===3||d===4)&&(d=u.stateNode.containerInfo,d===l||d.nodeType===8&&d.parentNode===l))return;u=u.return}for(;c!==null;){if(u=Zt(c),u===null)return;if(d=u.tag,d===5||d===6){r=o=u;continue e}c=c.parentNode}}r=r.return}tu(function(){var x=o,E=$l(n),R=[];e:{var C=Qu.get(e);if(C!==void 0){var z=oo,O=e;switch(e){case"keypress":if(Br(n)===0)break e;case"keydown":case"keyup":z=Tc;break;case"focusin":O="focus",z=so;break;case"focusout":O="blur",z=so;break;case"beforeblur":case"afterblur":z=so;break;case"click":if(n.button===2)break e;case"auxclick":case"dblclick":case"mousedown":case"mousemove":case"mouseup":case"mouseout":case"mouseover":case"contextmenu":z=Su;break;case"drag":case"dragend":case"dragenter":case"dragexit":case"dragleave":case"dragover":case"dragstart":case"drop":z=mc;break;case"touchcancel":case"touchend":case"touchmove":case"touchstart":z=Ic;break;case bu:case Wu:case Hu:z=gc;break;case $u:z=Ac;break;case"scroll":z=dc;break;case"wheel":z=Dc;break;case"copy":case"cut":case"paste":z=_c;break;case"gotpointercapture":case"lostpointercapture":case"pointercancel":case"pointerdown":case"pointermove":case"pointerout":case"pointerover":case"pointerup":z=ku}var j=(t&4)!==0,ye=!j&&e==="scroll",v=j?C!==null?C+"Capture":null:C;j=[];for(var m=x,_;m!==null;){_=m;var I=_.stateNode;if(_.tag===5&&I!==null&&(_=I,v!==null&&(I=Vn(m,v),I!=null&&j.push(or(m,I,_)))),ye)break;m=m.return}0<j.length&&(C=new z(C,O,null,n,E),R.push({event:C,listeners:j}))}}if((t&7)===0){e:{if(C=e==="mouseover"||e==="pointerover",z=e==="mouseout"||e==="pointerout",C&&n!==Hl&&(O=n.relatedTarget||n.fromElement)&&(Zt(O)||O[xt]))break e;if((z||C)&&(C=E.window===E?E:(C=E.ownerDocument)?C.defaultView||C.parentWindow:window,z?(O=n.relatedTarget||n.toElement,z=x,O=O?Zt(O):null,O!==null&&(ye=qt(O),O!==ye||O.tag!==5&&O.tag!==6)&&(O=null)):(z=null,O=x),z!==O)){if(j=Su,I="onMouseLeave",v="onMouseEnter",m="mouse",(e==="pointerout"||e==="pointerover")&&(j=ku,I="onPointerLeave",v="onPointerEnter",m="pointer"),ye=z==null?C:Sn(z),_=O==null?C:Sn(O),C=new j(I,m+"leave",z,n,E),C.target=ye,C.relatedTarget=_,I=null,Zt(E)===x&&(j=new j(v,m+"enter",O,n,E),j.target=_,j.relatedTarget=ye,I=j),ye=I,z&&O)t:{for(j=z,v=O,m=0,_=j;_;_=xn(_))m++;for(_=0,I=v;I;I=xn(I))_++;for(;0<m-_;)j=xn(j),m--;for(;0<_-m;)v=xn(v),_--;for(;m--;){if(j===v||v!==null&&j===v.alternate)break t;j=xn(j),v=xn(v)}j=null}else j=null;z!==null&&qu(R,C,z,j,!1),O!==null&&ye!==null&&qu(R,ye,O,j,!0)}}e:{if(C=x?Sn(x):window,z=C.nodeName&&C.nodeName.toLowerCase(),z==="select"||z==="input"&&C.type==="file")var B=Vc;else if(Pu(C))if(Nu)B=Hc;else{B=bc;var V=Uc}else(z=C.nodeName)&&z.toLowerCase()==="input"&&(C.type==="checkbox"||C.type==="radio")&&(B=Wc);if(B&&(B=B(e,x))){Au(R,B,n,E);break e}V&&V(e,C,x),e==="focusout"&&(V=C._wrapperState)&&V.controlled&&C.type==="number"&&Bl(C,"number",C.value)}switch(V=x?Sn(x):window,e){case"focusin":(Pu(V)||V.contentEditable==="true")&&(yn=V,ho=x,nr=null);break;case"focusout":nr=ho=yn=null;break;case"mousedown":vo=!0;break;case"contextmenu":case"mouseup":case"dragend":vo=!1,Vu(R,n,E);break;case"selectionchange":if(Gc)break;case"keydown":case"keyup":Vu(R,n,E)}var U;if(co)e:{switch(e){case"compositionstart":var W="onCompositionStart";break e;case"compositionend":W="onCompositionEnd";break e;case"compositionupdate":W="onCompositionUpdate";break e}W=void 0}else gn?Fu(e,n)&&(W="onCompositionEnd"):e==="keydown"&&n.keyCode===229&&(W="onCompositionStart");W&&(Eu&&n.locale!=="ko"&&(gn||W!=="onCompositionStart"?W==="onCompositionEnd"&&gn&&(U=xu()):(Dt=E,lo="value"in Dt?Dt.value:Dt.textContent,gn=!0)),V=Qr(x,W),0<V.length&&(W=new Cu(W,e,null,n,E),R.push({event:W,listeners:V}),U?W.data=U:(U=Iu(n),U!==null&&(W.data=U)))),(U=Mc?Lc(e,n):Oc(e,n))&&(x=Qr(x,"onBeforeInput"),0<x.length&&(E=new Cu("onBeforeInput","beforeinput",null,n,E),R.push({event:E,listeners:x}),E.data=U))}Xu(R,t)})}function or(e,t,n){return{instance:e,listener:t,currentTarget:n}}function Qr(e,t){for(var n=t+"Capture",r=[];e!==null;){var l=e,o=l.stateNode;l.tag===5&&o!==null&&(l=o,o=Vn(e,n),o!=null&&r.unshift(or(e,o,l)),o=Vn(e,t),o!=null&&r.push(or(e,o,l))),e=e.return}return r}function xn(e){if(e===null)return null;do e=e.return;while(e&&e.tag!==5);return e||null}function qu(e,t,n,r,l){for(var o=t._reactName,u=[];n!==null&&n!==r;){var c=n,d=c.alternate,x=c.stateNode;if(d!==null&&d===r)break;c.tag===5&&x!==null&&(c=x,l?(d=Vn(n,o),d!=null&&u.unshift(or(n,d,c))):l||(d=Vn(n,o),d!=null&&u.push(or(n,d,c)))),n=n.return}u.length!==0&&e.push({event:t,listeners:u})}var qc=/\r\n?/g,Zc=/\u0000|\uFFFD/g;function Zu(e){return(typeof e=="string"?e:""+e).replace(qc,`
`).replace(Zc,"")}function Gr(e,t,n){if(t=Zu(t),Zu(e)!==t&&n)throw Error(i(425))}function Kr(){}var So=null,Co=null;function ko(e,t){return e==="textarea"||e==="noscript"||typeof t.children=="string"||typeof t.children=="number"||typeof t.dangerouslySetInnerHTML=="object"&&t.dangerouslySetInnerHTML!==null&&t.dangerouslySetInnerHTML.__html!=null}var Eo=typeof setTimeout=="function"?setTimeout:void 0,Jc=typeof clearTimeout=="function"?clearTimeout:void 0,Ju=typeof Promise=="function"?Promise:void 0,ef=typeof queueMicrotask=="function"?queueMicrotask:typeof Ju<"u"?function(e){return Ju.resolve(null).then(e).catch(tf)}:Eo;function tf(e){setTimeout(function(){throw e})}function To(e,t){var n=t,r=0;do{var l=n.nextSibling;if(e.removeChild(n),l&&l.nodeType===8)if(n=l.data,n==="/$"){if(r===0){e.removeChild(l),Xn(t);return}r--}else n!=="$"&&n!=="$?"&&n!=="$!"||r++;n=l}while(n);Xn(t)}function Mt(e){for(;e!=null;e=e.nextSibling){var t=e.nodeType;if(t===1||t===3)break;if(t===8){if(t=e.data,t==="$"||t==="$!"||t==="$?")break;if(t==="/$")return null}}return e}function es(e){e=e.previousSibling;for(var t=0;e;){if(e.nodeType===8){var n=e.data;if(n==="$"||n==="$!"||n==="$?"){if(t===0)return e;t--}else n==="/$"&&t++}e=e.previousSibling}return null}var wn=Math.random().toString(36).slice(2),ht="__reactFiber$"+wn,ir="__reactProps$"+wn,xt="__reactContainer$"+wn,Ro="__reactEvents$"+wn,nf="__reactListeners$"+wn,rf="__reactHandles$"+wn;function Zt(e){var t=e[ht];if(t)return t;for(var n=e.parentNode;n;){if(t=n[xt]||n[ht]){if(n=t.alternate,t.child!==null||n!==null&&n.child!==null)for(e=es(e);e!==null;){if(n=e[ht])return n;e=es(e)}return t}e=n,n=e.parentNode}return null}function ur(e){return e=e[ht]||e[xt],!e||e.tag!==5&&e.tag!==6&&e.tag!==13&&e.tag!==3?null:e}function Sn(e){if(e.tag===5||e.tag===6)return e.stateNode;throw Error(i(33))}function Xr(e){return e[ir]||null}var Fo=[],Cn=-1;function Lt(e){return{current:e}}function ue(e){0>Cn||(e.current=Fo[Cn],Fo[Cn]=null,Cn--)}function oe(e,t){Cn++,Fo[Cn]=e.current,e.current=t}var Ot={},Ae=Lt(Ot),Be=Lt(!1),Jt=Ot;function kn(e,t){var n=e.type.contextTypes;if(!n)return Ot;var r=e.stateNode;if(r&&r.__reactInternalMemoizedUnmaskedChildContext===t)return r.__reactInternalMemoizedMaskedChildContext;var l={},o;for(o in n)l[o]=t[o];return r&&(e=e.stateNode,e.__reactInternalMemoizedUnmaskedChildContext=t,e.__reactInternalMemoizedMaskedChildContext=l),l}function Ve(e){return e=e.childContextTypes,e!=null}function Yr(){ue(Be),ue(Ae)}function ts(e,t,n){if(Ae.current!==Ot)throw Error(i(168));oe(Ae,t),oe(Be,n)}function ns(e,t,n){var r=e.stateNode;if(t=t.childContextTypes,typeof r.getChildContext!="function")return n;r=r.getChildContext();for(var l in r)if(!(l in t))throw Error(i(108,le(e)||"Unknown",l));return L({},n,r)}function qr(e){return e=(e=e.stateNode)&&e.__reactInternalMemoizedMergedChildContext||Ot,Jt=Ae.current,oe(Ae,e),oe(Be,Be.current),!0}function rs(e,t,n){var r=e.stateNode;if(!r)throw Error(i(169));n?(e=ns(e,t,Jt),r.__reactInternalMemoizedMergedChildContext=e,ue(Be),ue(Ae),oe(Ae,e)):ue(Be),oe(Be,n)}var wt=null,Zr=!1,Io=!1;function ls(e){wt===null?wt=[e]:wt.push(e)}function lf(e){Zr=!0,ls(e)}function jt(){if(!Io&&wt!==null){Io=!0;var e=0,t=ne;try{var n=wt;for(ne=1;e<n.length;e++){var r=n[e];do r=r(!0);while(r!==null)}wt=null,Zr=!1}catch(l){throw wt!==null&&(wt=wt.slice(e+1)),iu(Yl,jt),l}finally{ne=t,Io=!1}}return null}var En=[],Tn=0,Jr=null,el=0,Ze=[],Je=0,en=null,St=1,Ct="";function tn(e,t){En[Tn++]=el,En[Tn++]=Jr,Jr=e,el=t}function os(e,t,n){Ze[Je++]=St,Ze[Je++]=Ct,Ze[Je++]=en,en=e;var r=St;e=Ct;var l=32-ot(r)-1;r&=~(1<<l),n+=1;var o=32-ot(t)+l;if(30<o){var u=l-l%5;o=(r&(1<<u)-1).toString(32),r>>=u,l-=u,St=1<<32-ot(t)+l|n<<l|r,Ct=o+e}else St=1<<o|n<<l|r,Ct=e}function Po(e){e.return!==null&&(tn(e,1),os(e,1,0))}function Ao(e){for(;e===Jr;)Jr=En[--Tn],En[Tn]=null,el=En[--Tn],En[Tn]=null;for(;e===en;)en=Ze[--Je],Ze[Je]=null,Ct=Ze[--Je],Ze[Je]=null,St=Ze[--Je],Ze[Je]=null}var Ke=null,Xe=null,ce=!1,ut=null;function is(e,t){var n=rt(5,null,null,0);n.elementType="DELETED",n.stateNode=t,n.return=e,t=e.deletions,t===null?(e.deletions=[n],e.flags|=16):t.push(n)}function us(e,t){switch(e.tag){case 5:var n=e.type;return t=t.nodeType!==1||n.toLowerCase()!==t.nodeName.toLowerCase()?null:t,t!==null?(e.stateNode=t,Ke=e,Xe=Mt(t.firstChild),!0):!1;case 6:return t=e.pendingProps===""||t.nodeType!==3?null:t,t!==null?(e.stateNode=t,Ke=e,Xe=null,!0):!1;case 13:return t=t.nodeType!==8?null:t,t!==null?(n=en!==null?{id:St,overflow:Ct}:null,e.memoizedState={dehydrated:t,treeContext:n,retryLane:1073741824},n=rt(18,null,null,0),n.stateNode=t,n.return=e,e.child=n,Ke=e,Xe=null,!0):!1;default:return!1}}function No(e){return(e.mode&1)!==0&&(e.flags&128)===0}function Do(e){if(ce){var t=Xe;if(t){var n=t;if(!us(e,t)){if(No(e))throw Error(i(418));t=Mt(n.nextSibling);var r=Ke;t&&us(e,t)?is(r,n):(e.flags=e.flags&-4097|2,ce=!1,Ke=e)}}else{if(No(e))throw Error(i(418));e.flags=e.flags&-4097|2,ce=!1,Ke=e}}}function ss(e){for(e=e.return;e!==null&&e.tag!==5&&e.tag!==3&&e.tag!==13;)e=e.return;Ke=e}function tl(e){if(e!==Ke)return!1;if(!ce)return ss(e),ce=!0,!1;var t;if((t=e.tag!==3)&&!(t=e.tag!==5)&&(t=e.type,t=t!=="head"&&t!=="body"&&!ko(e.type,e.memoizedProps)),t&&(t=Xe)){if(No(e))throw as(),Error(i(418));for(;t;)is(e,t),t=Mt(t.nextSibling)}if(ss(e),e.tag===13){if(e=e.memoizedState,e=e!==null?e.dehydrated:null,!e)throw Error(i(317));e:{for(e=e.nextSibling,t=0;e;){if(e.nodeType===8){var n=e.data;if(n==="/$"){if(t===0){Xe=Mt(e.nextSibling);break e}t--}else n!=="$"&&n!=="$!"&&n!=="$?"||t++}e=e.nextSibling}Xe=null}}else Xe=Ke?Mt(e.stateNode.nextSibling):null;return!0}function as(){for(var e=Xe;e;)e=Mt(e.nextSibling)}function Rn(){Xe=Ke=null,ce=!1}function zo(e){ut===null?ut=[e]:ut.push(e)}var of=fe.ReactCurrentBatchConfig;function sr(e,t,n){if(e=n.ref,e!==null&&typeof e!="function"&&typeof e!="object"){if(n._owner){if(n=n._owner,n){if(n.tag!==1)throw Error(i(309));var r=n.stateNode}if(!r)throw Error(i(147,e));var l=r,o=""+e;return t!==null&&t.ref!==null&&typeof t.ref=="function"&&t.ref._stringRef===o?t.ref:(t=function(u){var c=l.refs;u===null?delete c[o]:c[o]=u},t._stringRef=o,t)}if(typeof e!="string")throw Error(i(284));if(!n._owner)throw Error(i(290,e))}return e}function nl(e,t){throw e=Object.prototype.toString.call(t),Error(i(31,e==="[object Object]"?"object with keys {"+Object.keys(t).join(", ")+"}":e))}function cs(e){var t=e._init;return t(e._payload)}function fs(e){function t(v,m){if(e){var _=v.deletions;_===null?(v.deletions=[m],v.flags|=16):_.push(m)}}function n(v,m){if(!e)return null;for(;m!==null;)t(v,m),m=m.sibling;return null}function r(v,m){for(v=new Map;m!==null;)m.key!==null?v.set(m.key,m):v.set(m.index,m),m=m.sibling;return v}function l(v,m){return v=Qt(v,m),v.index=0,v.sibling=null,v}function o(v,m,_){return v.index=_,e?(_=v.alternate,_!==null?(_=_.index,_<m?(v.flags|=2,m):_):(v.flags|=2,m)):(v.flags|=1048576,m)}function u(v){return e&&v.alternate===null&&(v.flags|=2),v}function c(v,m,_,I){return m===null||m.tag!==6?(m=Ei(_,v.mode,I),m.return=v,m):(m=l(m,_),m.return=v,m)}function d(v,m,_,I){var B=_.type;return B===ke?E(v,m,_.props.children,I,_.key):m!==null&&(m.elementType===B||typeof B=="object"&&B!==null&&B.$$typeof===je&&cs(B)===m.type)?(I=l(m,_.props),I.ref=sr(v,m,_),I.return=v,I):(I=Tl(_.type,_.key,_.props,null,v.mode,I),I.ref=sr(v,m,_),I.return=v,I)}function x(v,m,_,I){return m===null||m.tag!==4||m.stateNode.containerInfo!==_.containerInfo||m.stateNode.implementation!==_.implementation?(m=Ti(_,v.mode,I),m.return=v,m):(m=l(m,_.children||[]),m.return=v,m)}function E(v,m,_,I,B){return m===null||m.tag!==7?(m=cn(_,v.mode,I,B),m.return=v,m):(m=l(m,_),m.return=v,m)}function R(v,m,_){if(typeof m=="string"&&m!==""||typeof m=="number")return m=Ei(""+m,v.mode,_),m.return=v,m;if(typeof m=="object"&&m!==null){switch(m.$$typeof){case Oe:return _=Tl(m.type,m.key,m.props,null,v.mode,_),_.ref=sr(v,null,m),_.return=v,_;case ve:return m=Ti(m,v.mode,_),m.return=v,m;case je:var I=m._init;return R(v,I(m._payload),_)}if(On(m)||b(m))return m=cn(m,v.mode,_,null),m.return=v,m;nl(v,m)}return null}function C(v,m,_,I){var B=m!==null?m.key:null;if(typeof _=="string"&&_!==""||typeof _=="number")return B!==null?null:c(v,m,""+_,I);if(typeof _=="object"&&_!==null){switch(_.$$typeof){case Oe:return _.key===B?d(v,m,_,I):null;case ve:return _.key===B?x(v,m,_,I):null;case je:return B=_._init,C(v,m,B(_._payload),I)}if(On(_)||b(_))return B!==null?null:E(v,m,_,I,null);nl(v,_)}return null}function z(v,m,_,I,B){if(typeof I=="string"&&I!==""||typeof I=="number")return v=v.get(_)||null,c(m,v,""+I,B);if(typeof I=="object"&&I!==null){switch(I.$$typeof){case Oe:return v=v.get(I.key===null?_:I.key)||null,d(m,v,I,B);case ve:return v=v.get(I.key===null?_:I.key)||null,x(m,v,I,B);case je:var V=I._init;return z(v,m,_,V(I._payload),B)}if(On(I)||b(I))return v=v.get(_)||null,E(m,v,I,B,null);nl(m,I)}return null}function O(v,m,_,I){for(var B=null,V=null,U=m,W=m=0,Re=null;U!==null&&W<_.length;W++){U.index>W?(Re=U,U=null):Re=U.sibling;var ee=C(v,U,_[W],I);if(ee===null){U===null&&(U=Re);break}e&&U&&ee.alternate===null&&t(v,U),m=o(ee,m,W),V===null?B=ee:V.sibling=ee,V=ee,U=Re}if(W===_.length)return n(v,U),ce&&tn(v,W),B;if(U===null){for(;W<_.length;W++)U=R(v,_[W],I),U!==null&&(m=o(U,m,W),V===null?B=U:V.sibling=U,V=U);return ce&&tn(v,W),B}for(U=r(v,U);W<_.length;W++)Re=z(U,v,W,_[W],I),Re!==null&&(e&&Re.alternate!==null&&U.delete(Re.key===null?W:Re.key),m=o(Re,m,W),V===null?B=Re:V.sibling=Re,V=Re);return e&&U.forEach(function(Gt){return t(v,Gt)}),ce&&tn(v,W),B}function j(v,m,_,I){var B=b(_);if(typeof B!="function")throw Error(i(150));if(_=B.call(_),_==null)throw Error(i(151));for(var V=B=null,U=m,W=m=0,Re=null,ee=_.next();U!==null&&!ee.done;W++,ee=_.next()){U.index>W?(Re=U,U=null):Re=U.sibling;var Gt=C(v,U,ee.value,I);if(Gt===null){U===null&&(U=Re);break}e&&U&&Gt.alternate===null&&t(v,U),m=o(Gt,m,W),V===null?B=Gt:V.sibling=Gt,V=Gt,U=Re}if(ee.done)return n(v,U),ce&&tn(v,W),B;if(U===null){for(;!ee.done;W++,ee=_.next())ee=R(v,ee.value,I),ee!==null&&(m=o(ee,m,W),V===null?B=ee:V.sibling=ee,V=ee);return ce&&tn(v,W),B}for(U=r(v,U);!ee.done;W++,ee=_.next())ee=z(U,v,W,ee.value,I),ee!==null&&(e&&ee.alternate!==null&&U.delete(ee.key===null?W:ee.key),m=o(ee,m,W),V===null?B=ee:V.sibling=ee,V=ee);return e&&U.forEach(function(Bf){return t(v,Bf)}),ce&&tn(v,W),B}function ye(v,m,_,I){if(typeof _=="object"&&_!==null&&_.type===ke&&_.key===null&&(_=_.props.children),typeof _=="object"&&_!==null){switch(_.$$typeof){case Oe:e:{for(var B=_.key,V=m;V!==null;){if(V.key===B){if(B=_.type,B===ke){if(V.tag===7){n(v,V.sibling),m=l(V,_.props.children),m.return=v,v=m;break e}}else if(V.elementType===B||typeof B=="object"&&B!==null&&B.$$typeof===je&&cs(B)===V.type){n(v,V.sibling),m=l(V,_.props),m.ref=sr(v,V,_),m.return=v,v=m;break e}n(v,V);break}else t(v,V);V=V.sibling}_.type===ke?(m=cn(_.props.children,v.mode,I,_.key),m.return=v,v=m):(I=Tl(_.type,_.key,_.props,null,v.mode,I),I.ref=sr(v,m,_),I.return=v,v=I)}return u(v);case ve:e:{for(V=_.key;m!==null;){if(m.key===V)if(m.tag===4&&m.stateNode.containerInfo===_.containerInfo&&m.stateNode.implementation===_.implementation){n(v,m.sibling),m=l(m,_.children||[]),m.return=v,v=m;break e}else{n(v,m);break}else t(v,m);m=m.sibling}m=Ti(_,v.mode,I),m.return=v,v=m}return u(v);case je:return V=_._init,ye(v,m,V(_._payload),I)}if(On(_))return O(v,m,_,I);if(b(_))return j(v,m,_,I);nl(v,_)}return typeof _=="string"&&_!==""||typeof _=="number"?(_=""+_,m!==null&&m.tag===6?(n(v,m.sibling),m=l(m,_),m.return=v,v=m):(n(v,m),m=Ei(_,v.mode,I),m.return=v,v=m),u(v)):n(v,m)}return ye}var Fn=fs(!0),ds=fs(!1),rl=Lt(null),ll=null,In=null,Mo=null;function Lo(){Mo=In=ll=null}function Oo(e){var t=rl.current;ue(rl),e._currentValue=t}function jo(e,t,n){for(;e!==null;){var r=e.alternate;if((e.childLanes&t)!==t?(e.childLanes|=t,r!==null&&(r.childLanes|=t)):r!==null&&(r.childLanes&t)!==t&&(r.childLanes|=t),e===n)break;e=e.return}}function Pn(e,t){ll=e,Mo=In=null,e=e.dependencies,e!==null&&e.firstContext!==null&&((e.lanes&t)!==0&&(Ue=!0),e.firstContext=null)}function et(e){var t=e._currentValue;if(Mo!==e)if(e={context:e,memoizedValue:t,next:null},In===null){if(ll===null)throw Error(i(308));In=e,ll.dependencies={lanes:0,firstContext:e}}else In=In.next=e;return t}var nn=null;function Bo(e){nn===null?nn=[e]:nn.push(e)}function ps(e,t,n,r){var l=t.interleaved;return l===null?(n.next=n,Bo(t)):(n.next=l.next,l.next=n),t.interleaved=n,kt(e,r)}function kt(e,t){e.lanes|=t;var n=e.alternate;for(n!==null&&(n.lanes|=t),n=e,e=e.return;e!==null;)e.childLanes|=t,n=e.alternate,n!==null&&(n.childLanes|=t),n=e,e=e.return;return n.tag===3?n.stateNode:null}var Bt=!1;function Vo(e){e.updateQueue={baseState:e.memoizedState,firstBaseUpdate:null,lastBaseUpdate:null,shared:{pending:null,interleaved:null,lanes:0},effects:null}}function ms(e,t){e=e.updateQueue,t.updateQueue===e&&(t.updateQueue={baseState:e.baseState,firstBaseUpdate:e.firstBaseUpdate,lastBaseUpdate:e.lastBaseUpdate,shared:e.shared,effects:e.effects})}function Et(e,t){return{eventTime:e,lane:t,tag:0,payload:null,callback:null,next:null}}function Vt(e,t,n){var r=e.updateQueue;if(r===null)return null;if(r=r.shared,(q&2)!==0){var l=r.pending;return l===null?t.next=t:(t.next=l.next,l.next=t),r.pending=t,kt(e,n)}return l=r.interleaved,l===null?(t.next=t,Bo(r)):(t.next=l.next,l.next=t),r.interleaved=t,kt(e,n)}function ol(e,t,n){if(t=t.updateQueue,t!==null&&(t=t.shared,(n&4194240)!==0)){var r=t.lanes;r&=e.pendingLanes,n|=r,t.lanes=n,Jl(e,n)}}function hs(e,t){var n=e.updateQueue,r=e.alternate;if(r!==null&&(r=r.updateQueue,n===r)){var l=null,o=null;if(n=n.firstBaseUpdate,n!==null){do{var u={eventTime:n.eventTime,lane:n.lane,tag:n.tag,payload:n.payload,callback:n.callback,next:null};o===null?l=o=u:o=o.next=u,n=n.next}while(n!==null);o===null?l=o=t:o=o.next=t}else l=o=t;n={baseState:r.baseState,firstBaseUpdate:l,lastBaseUpdate:o,shared:r.shared,effects:r.effects},e.updateQueue=n;return}e=n.lastBaseUpdate,e===null?n.firstBaseUpdate=t:e.next=t,n.lastBaseUpdate=t}function il(e,t,n,r){var l=e.updateQueue;Bt=!1;var o=l.firstBaseUpdate,u=l.lastBaseUpdate,c=l.shared.pending;if(c!==null){l.shared.pending=null;var d=c,x=d.next;d.next=null,u===null?o=x:u.next=x,u=d;var E=e.alternate;E!==null&&(E=E.updateQueue,c=E.lastBaseUpdate,c!==u&&(c===null?E.firstBaseUpdate=x:c.next=x,E.lastBaseUpdate=d))}if(o!==null){var R=l.baseState;u=0,E=x=d=null,c=o;do{var C=c.lane,z=c.eventTime;if((r&C)===C){E!==null&&(E=E.next={eventTime:z,lane:0,tag:c.tag,payload:c.payload,callback:c.callback,next:null});e:{var O=e,j=c;switch(C=t,z=n,j.tag){case 1:if(O=j.payload,typeof O=="function"){R=O.call(z,R,C);break e}R=O;break e;case 3:O.flags=O.flags&-65537|128;case 0:if(O=j.payload,C=typeof O=="function"?O.call(z,R,C):O,C==null)break e;R=L({},R,C);break e;case 2:Bt=!0}}c.callback!==null&&c.lane!==0&&(e.flags|=64,C=l.effects,C===null?l.effects=[c]:C.push(c))}else z={eventTime:z,lane:C,tag:c.tag,payload:c.payload,callback:c.callback,next:null},E===null?(x=E=z,d=R):E=E.next=z,u|=C;if(c=c.next,c===null){if(c=l.shared.pending,c===null)break;C=c,c=C.next,C.next=null,l.lastBaseUpdate=C,l.shared.pending=null}}while(!0);if(E===null&&(d=R),l.baseState=d,l.firstBaseUpdate=x,l.lastBaseUpdate=E,t=l.shared.interleaved,t!==null){l=t;do u|=l.lane,l=l.next;while(l!==t)}else o===null&&(l.shared.lanes=0);on|=u,e.lanes=u,e.memoizedState=R}}function vs(e,t,n){if(e=t.effects,t.effects=null,e!==null)for(t=0;t<e.length;t++){var r=e[t],l=r.callback;if(l!==null){if(r.callback=null,r=n,typeof l!="function")throw Error(i(191,l));l.call(r)}}}var ar={},vt=Lt(ar),cr=Lt(ar),fr=Lt(ar);function rn(e){if(e===ar)throw Error(i(174));return e}function Uo(e,t){switch(oe(fr,t),oe(cr,e),oe(vt,ar),e=t.nodeType,e){case 9:case 11:t=(t=t.documentElement)?t.namespaceURI:Ul(null,"");break;default:e=e===8?t.parentNode:t,t=e.namespaceURI||null,e=e.tagName,t=Ul(t,e)}ue(vt),oe(vt,t)}function An(){ue(vt),ue(cr),ue(fr)}function gs(e){rn(fr.current);var t=rn(vt.current),n=Ul(t,e.type);t!==n&&(oe(cr,e),oe(vt,n))}function bo(e){cr.current===e&&(ue(vt),ue(cr))}var de=Lt(0);function ul(e){for(var t=e;t!==null;){if(t.tag===13){var n=t.memoizedState;if(n!==null&&(n=n.dehydrated,n===null||n.data==="$?"||n.data==="$!"))return t}else if(t.tag===19&&t.memoizedProps.revealOrder!==void 0){if((t.flags&128)!==0)return t}else if(t.child!==null){t.child.return=t,t=t.child;continue}if(t===e)break;for(;t.sibling===null;){if(t.return===null||t.return===e)return null;t=t.return}t.sibling.return=t.return,t=t.sibling}return null}var Wo=[];function Ho(){for(var e=0;e<Wo.length;e++)Wo[e]._workInProgressVersionPrimary=null;Wo.length=0}var sl=fe.ReactCurrentDispatcher,$o=fe.ReactCurrentBatchConfig,ln=0,pe=null,Se=null,Ee=null,al=!1,dr=!1,pr=0,uf=0;function Ne(){throw Error(i(321))}function Qo(e,t){if(t===null)return!1;for(var n=0;n<t.length&&n<e.length;n++)if(!it(e[n],t[n]))return!1;return!0}function Go(e,t,n,r,l,o){if(ln=o,pe=t,t.memoizedState=null,t.updateQueue=null,t.lanes=0,sl.current=e===null||e.memoizedState===null?ff:df,e=n(r,l),dr){o=0;do{if(dr=!1,pr=0,25<=o)throw Error(i(301));o+=1,Ee=Se=null,t.updateQueue=null,sl.current=pf,e=n(r,l)}while(dr)}if(sl.current=dl,t=Se!==null&&Se.next!==null,ln=0,Ee=Se=pe=null,al=!1,t)throw Error(i(300));return e}function Ko(){var e=pr!==0;return pr=0,e}function gt(){var e={memoizedState:null,baseState:null,baseQueue:null,queue:null,next:null};return Ee===null?pe.memoizedState=Ee=e:Ee=Ee.next=e,Ee}function tt(){if(Se===null){var e=pe.alternate;e=e!==null?e.memoizedState:null}else e=Se.next;var t=Ee===null?pe.memoizedState:Ee.next;if(t!==null)Ee=t,Se=e;else{if(e===null)throw Error(i(310));Se=e,e={memoizedState:Se.memoizedState,baseState:Se.baseState,baseQueue:Se.baseQueue,queue:Se.queue,next:null},Ee===null?pe.memoizedState=Ee=e:Ee=Ee.next=e}return Ee}function mr(e,t){return typeof t=="function"?t(e):t}function Xo(e){var t=tt(),n=t.queue;if(n===null)throw Error(i(311));n.lastRenderedReducer=e;var r=Se,l=r.baseQueue,o=n.pending;if(o!==null){if(l!==null){var u=l.next;l.next=o.next,o.next=u}r.baseQueue=l=o,n.pending=null}if(l!==null){o=l.next,r=r.baseState;var c=u=null,d=null,x=o;do{var E=x.lane;if((ln&E)===E)d!==null&&(d=d.next={lane:0,action:x.action,hasEagerState:x.hasEagerState,eagerState:x.eagerState,next:null}),r=x.hasEagerState?x.eagerState:e(r,x.action);else{var R={lane:E,action:x.action,hasEagerState:x.hasEagerState,eagerState:x.eagerState,next:null};d===null?(c=d=R,u=r):d=d.next=R,pe.lanes|=E,on|=E}x=x.next}while(x!==null&&x!==o);d===null?u=r:d.next=c,it(r,t.memoizedState)||(Ue=!0),t.memoizedState=r,t.baseState=u,t.baseQueue=d,n.lastRenderedState=r}if(e=n.interleaved,e!==null){l=e;do o=l.lane,pe.lanes|=o,on|=o,l=l.next;while(l!==e)}else l===null&&(n.lanes=0);return[t.memoizedState,n.dispatch]}function Yo(e){var t=tt(),n=t.queue;if(n===null)throw Error(i(311));n.lastRenderedReducer=e;var r=n.dispatch,l=n.pending,o=t.memoizedState;if(l!==null){n.pending=null;var u=l=l.next;do o=e(o,u.action),u=u.next;while(u!==l);it(o,t.memoizedState)||(Ue=!0),t.memoizedState=o,t.baseQueue===null&&(t.baseState=o),n.lastRenderedState=o}return[o,r]}function ys(){}function _s(e,t){var n=pe,r=tt(),l=t(),o=!it(r.memoizedState,l);if(o&&(r.memoizedState=l,Ue=!0),r=r.queue,qo(Ss.bind(null,n,r,e),[e]),r.getSnapshot!==t||o||Ee!==null&&Ee.memoizedState.tag&1){if(n.flags|=2048,hr(9,ws.bind(null,n,r,l,t),void 0,null),Te===null)throw Error(i(349));(ln&30)!==0||xs(n,t,l)}return l}function xs(e,t,n){e.flags|=16384,e={getSnapshot:t,value:n},t=pe.updateQueue,t===null?(t={lastEffect:null,stores:null},pe.updateQueue=t,t.stores=[e]):(n=t.stores,n===null?t.stores=[e]:n.push(e))}function ws(e,t,n,r){t.value=n,t.getSnapshot=r,Cs(t)&&ks(e)}function Ss(e,t,n){return n(function(){Cs(t)&&ks(e)})}function Cs(e){var t=e.getSnapshot;e=e.value;try{var n=t();return!it(e,n)}catch{return!0}}function ks(e){var t=kt(e,1);t!==null&&ft(t,e,1,-1)}function Es(e){var t=gt();return typeof e=="function"&&(e=e()),t.memoizedState=t.baseState=e,e={pending:null,interleaved:null,lanes:0,dispatch:null,lastRenderedReducer:mr,lastRenderedState:e},t.queue=e,e=e.dispatch=cf.bind(null,pe,e),[t.memoizedState,e]}function hr(e,t,n,r){return e={tag:e,create:t,destroy:n,deps:r,next:null},t=pe.updateQueue,t===null?(t={lastEffect:null,stores:null},pe.updateQueue=t,t.lastEffect=e.next=e):(n=t.lastEffect,n===null?t.lastEffect=e.next=e:(r=n.next,n.next=e,e.next=r,t.lastEffect=e)),e}function Ts(){return tt().memoizedState}function cl(e,t,n,r){var l=gt();pe.flags|=e,l.memoizedState=hr(1|t,n,void 0,r===void 0?null:r)}function fl(e,t,n,r){var l=tt();r=r===void 0?null:r;var o=void 0;if(Se!==null){var u=Se.memoizedState;if(o=u.destroy,r!==null&&Qo(r,u.deps)){l.memoizedState=hr(t,n,o,r);return}}pe.flags|=e,l.memoizedState=hr(1|t,n,o,r)}function Rs(e,t){return cl(8390656,8,e,t)}function qo(e,t){return fl(2048,8,e,t)}function Fs(e,t){return fl(4,2,e,t)}function Is(e,t){return fl(4,4,e,t)}function Ps(e,t){if(typeof t=="function")return e=e(),t(e),function(){t(null)};if(t!=null)return e=e(),t.current=e,function(){t.current=null}}function As(e,t,n){return n=n!=null?n.concat([e]):null,fl(4,4,Ps.bind(null,t,e),n)}function Zo(){}function Ns(e,t){var n=tt();t=t===void 0?null:t;var r=n.memoizedState;return r!==null&&t!==null&&Qo(t,r[1])?r[0]:(n.memoizedState=[e,t],e)}function Ds(e,t){var n=tt();t=t===void 0?null:t;var r=n.memoizedState;return r!==null&&t!==null&&Qo(t,r[1])?r[0]:(e=e(),n.memoizedState=[e,t],e)}function zs(e,t,n){return(ln&21)===0?(e.baseState&&(e.baseState=!1,Ue=!0),e.memoizedState=n):(it(n,t)||(n=cu(),pe.lanes|=n,on|=n,e.baseState=!0),t)}function sf(e,t){var n=ne;ne=n!==0&&4>n?n:4,e(!0);var r=$o.transition;$o.transition={};try{e(!1),t()}finally{ne=n,$o.transition=r}}function Ms(){return tt().memoizedState}function af(e,t,n){var r=Ht(e);if(n={lane:r,action:n,hasEagerState:!1,eagerState:null,next:null},Ls(e))Os(t,n);else if(n=ps(e,t,n,r),n!==null){var l=Le();ft(n,e,r,l),js(n,t,r)}}function cf(e,t,n){var r=Ht(e),l={lane:r,action:n,hasEagerState:!1,eagerState:null,next:null};if(Ls(e))Os(t,l);else{var o=e.alternate;if(e.lanes===0&&(o===null||o.lanes===0)&&(o=t.lastRenderedReducer,o!==null))try{var u=t.lastRenderedState,c=o(u,n);if(l.hasEagerState=!0,l.eagerState=c,it(c,u)){var d=t.interleaved;d===null?(l.next=l,Bo(t)):(l.next=d.next,d.next=l),t.interleaved=l;return}}catch{}finally{}n=ps(e,t,l,r),n!==null&&(l=Le(),ft(n,e,r,l),js(n,t,r))}}function Ls(e){var t=e.alternate;return e===pe||t!==null&&t===pe}function Os(e,t){dr=al=!0;var n=e.pending;n===null?t.next=t:(t.next=n.next,n.next=t),e.pending=t}function js(e,t,n){if((n&4194240)!==0){var r=t.lanes;r&=e.pendingLanes,n|=r,t.lanes=n,Jl(e,n)}}var dl={readContext:et,useCallback:Ne,useContext:Ne,useEffect:Ne,useImperativeHandle:Ne,useInsertionEffect:Ne,useLayoutEffect:Ne,useMemo:Ne,useReducer:Ne,useRef:Ne,useState:Ne,useDebugValue:Ne,useDeferredValue:Ne,useTransition:Ne,useMutableSource:Ne,useSyncExternalStore:Ne,useId:Ne,unstable_isNewReconciler:!1},ff={readContext:et,useCallback:function(e,t){return gt().memoizedState=[e,t===void 0?null:t],e},useContext:et,useEffect:Rs,useImperativeHandle:function(e,t,n){return n=n!=null?n.concat([e]):null,cl(4194308,4,Ps.bind(null,t,e),n)},useLayoutEffect:function(e,t){return cl(4194308,4,e,t)},useInsertionEffect:function(e,t){return cl(4,2,e,t)},useMemo:function(e,t){var n=gt();return t=t===void 0?null:t,e=e(),n.memoizedState=[e,t],e},useReducer:function(e,t,n){var r=gt();return t=n!==void 0?n(t):t,r.memoizedState=r.baseState=t,e={pending:null,interleaved:null,lanes:0,dispatch:null,lastRenderedReducer:e,lastRenderedState:t},r.queue=e,e=e.dispatch=af.bind(null,pe,e),[r.memoizedState,e]},useRef:function(e){var t=gt();return e={current:e},t.memoizedState=e},useState:Es,useDebugValue:Zo,useDeferredValue:function(e){return gt().memoizedState=e},useTransition:function(){var e=Es(!1),t=e[0];return e=sf.bind(null,e[1]),gt().memoizedState=e,[t,e]},useMutableSource:function(){},useSyncExternalStore:function(e,t,n){var r=pe,l=gt();if(ce){if(n===void 0)throw Error(i(407));n=n()}else{if(n=t(),Te===null)throw Error(i(349));(ln&30)!==0||xs(r,t,n)}l.memoizedState=n;var o={value:n,getSnapshot:t};return l.queue=o,Rs(Ss.bind(null,r,o,e),[e]),r.flags|=2048,hr(9,ws.bind(null,r,o,n,t),void 0,null),n},useId:function(){var e=gt(),t=Te.identifierPrefix;if(ce){var n=Ct,r=St;n=(r&~(1<<32-ot(r)-1)).toString(32)+n,t=":"+t+"R"+n,n=pr++,0<n&&(t+="H"+n.toString(32)),t+=":"}else n=uf++,t=":"+t+"r"+n.toString(32)+":";return e.memoizedState=t},unstable_isNewReconciler:!1},df={readContext:et,useCallback:Ns,useContext:et,useEffect:qo,useImperativeHandle:As,useInsertionEffect:Fs,useLayoutEffect:Is,useMemo:Ds,useReducer:Xo,useRef:Ts,useState:function(){return Xo(mr)},useDebugValue:Zo,useDeferredValue:function(e){var t=tt();return zs(t,Se.memoizedState,e)},useTransition:function(){var e=Xo(mr)[0],t=tt().memoizedState;return[e,t]},useMutableSource:ys,useSyncExternalStore:_s,useId:Ms,unstable_isNewReconciler:!1},pf={readContext:et,useCallback:Ns,useContext:et,useEffect:qo,useImperativeHandle:As,useInsertionEffect:Fs,useLayoutEffect:Is,useMemo:Ds,useReducer:Yo,useRef:Ts,useState:function(){return Yo(mr)},useDebugValue:Zo,useDeferredValue:function(e){var t=tt();return Se===null?t.memoizedState=e:zs(t,Se.memoizedState,e)},useTransition:function(){var e=Yo(mr)[0],t=tt().memoizedState;return[e,t]},useMutableSource:ys,useSyncExternalStore:_s,useId:Ms,unstable_isNewReconciler:!1};function st(e,t){if(e&&e.defaultProps){t=L({},t),e=e.defaultProps;for(var n in e)t[n]===void 0&&(t[n]=e[n]);return t}return t}function Jo(e,t,n,r){t=e.memoizedState,n=n(r,t),n=n==null?t:L({},t,n),e.memoizedState=n,e.lanes===0&&(e.updateQueue.baseState=n)}var pl={isMounted:function(e){return(e=e._reactInternals)?qt(e)===e:!1},enqueueSetState:function(e,t,n){e=e._reactInternals;var r=Le(),l=Ht(e),o=Et(r,l);o.payload=t,n!=null&&(o.callback=n),t=Vt(e,o,l),t!==null&&(ft(t,e,l,r),ol(t,e,l))},enqueueReplaceState:function(e,t,n){e=e._reactInternals;var r=Le(),l=Ht(e),o=Et(r,l);o.tag=1,o.payload=t,n!=null&&(o.callback=n),t=Vt(e,o,l),t!==null&&(ft(t,e,l,r),ol(t,e,l))},enqueueForceUpdate:function(e,t){e=e._reactInternals;var n=Le(),r=Ht(e),l=Et(n,r);l.tag=2,t!=null&&(l.callback=t),t=Vt(e,l,r),t!==null&&(ft(t,e,r,n),ol(t,e,r))}};function Bs(e,t,n,r,l,o,u){return e=e.stateNode,typeof e.shouldComponentUpdate=="function"?e.shouldComponentUpdate(r,o,u):t.prototype&&t.prototype.isPureReactComponent?!tr(n,r)||!tr(l,o):!0}function Vs(e,t,n){var r=!1,l=Ot,o=t.contextType;return typeof o=="object"&&o!==null?o=et(o):(l=Ve(t)?Jt:Ae.current,r=t.contextTypes,o=(r=r!=null)?kn(e,l):Ot),t=new t(n,o),e.memoizedState=t.state!==null&&t.state!==void 0?t.state:null,t.updater=pl,e.stateNode=t,t._reactInternals=e,r&&(e=e.stateNode,e.__reactInternalMemoizedUnmaskedChildContext=l,e.__reactInternalMemoizedMaskedChildContext=o),t}function Us(e,t,n,r){e=t.state,typeof t.componentWillReceiveProps=="function"&&t.componentWillReceiveProps(n,r),typeof t.UNSAFE_componentWillReceiveProps=="function"&&t.UNSAFE_componentWillReceiveProps(n,r),t.state!==e&&pl.enqueueReplaceState(t,t.state,null)}function ei(e,t,n,r){var l=e.stateNode;l.props=n,l.state=e.memoizedState,l.refs={},Vo(e);var o=t.contextType;typeof o=="object"&&o!==null?l.context=et(o):(o=Ve(t)?Jt:Ae.current,l.context=kn(e,o)),l.state=e.memoizedState,o=t.getDerivedStateFromProps,typeof o=="function"&&(Jo(e,t,o,n),l.state=e.memoizedState),typeof t.getDerivedStateFromProps=="function"||typeof l.getSnapshotBeforeUpdate=="function"||typeof l.UNSAFE_componentWillMount!="function"&&typeof l.componentWillMount!="function"||(t=l.state,typeof l.componentWillMount=="function"&&l.componentWillMount(),typeof l.UNSAFE_componentWillMount=="function"&&l.UNSAFE_componentWillMount(),t!==l.state&&pl.enqueueReplaceState(l,l.state,null),il(e,n,l,r),l.state=e.memoizedState),typeof l.componentDidMount=="function"&&(e.flags|=4194308)}function Nn(e,t){try{var n="",r=t;do n+=Z(r),r=r.return;while(r);var l=n}catch(o){l=`
Error generating stack: `+o.message+`
`+o.stack}return{value:e,source:t,stack:l,digest:null}}function ti(e,t,n){return{value:e,source:null,stack:n??null,digest:t??null}}function ni(e,t){try{console.error(t.value)}catch(n){setTimeout(function(){throw n})}}var mf=typeof WeakMap=="function"?WeakMap:Map;function bs(e,t,n){n=Et(-1,n),n.tag=3,n.payload={element:null};var r=t.value;return n.callback=function(){xl||(xl=!0,gi=r),ni(e,t)},n}function Ws(e,t,n){n=Et(-1,n),n.tag=3;var r=e.type.getDerivedStateFromError;if(typeof r=="function"){var l=t.value;n.payload=function(){return r(l)},n.callback=function(){ni(e,t)}}var o=e.stateNode;return o!==null&&typeof o.componentDidCatch=="function"&&(n.callback=function(){ni(e,t),typeof r!="function"&&(bt===null?bt=new Set([this]):bt.add(this));var u=t.stack;this.componentDidCatch(t.value,{componentStack:u!==null?u:""})}),n}function Hs(e,t,n){var r=e.pingCache;if(r===null){r=e.pingCache=new mf;var l=new Set;r.set(t,l)}else l=r.get(t),l===void 0&&(l=new Set,r.set(t,l));l.has(n)||(l.add(n),e=Ff.bind(null,e,t,n),t.then(e,e))}function $s(e){do{var t;if((t=e.tag===13)&&(t=e.memoizedState,t=t!==null?t.dehydrated!==null:!0),t)return e;e=e.return}while(e!==null);return null}function Qs(e,t,n,r,l){return(e.mode&1)===0?(e===t?e.flags|=65536:(e.flags|=128,n.flags|=131072,n.flags&=-52805,n.tag===1&&(n.alternate===null?n.tag=17:(t=Et(-1,1),t.tag=2,Vt(n,t,1))),n.lanes|=1),e):(e.flags|=65536,e.lanes=l,e)}var hf=fe.ReactCurrentOwner,Ue=!1;function Me(e,t,n,r){t.child=e===null?ds(t,null,n,r):Fn(t,e.child,n,r)}function Gs(e,t,n,r,l){n=n.render;var o=t.ref;return Pn(t,l),r=Go(e,t,n,r,o,l),n=Ko(),e!==null&&!Ue?(t.updateQueue=e.updateQueue,t.flags&=-2053,e.lanes&=~l,Tt(e,t,l)):(ce&&n&&Po(t),t.flags|=1,Me(e,t,r,l),t.child)}function Ks(e,t,n,r,l){if(e===null){var o=n.type;return typeof o=="function"&&!ki(o)&&o.defaultProps===void 0&&n.compare===null&&n.defaultProps===void 0?(t.tag=15,t.type=o,Xs(e,t,o,r,l)):(e=Tl(n.type,null,r,t,t.mode,l),e.ref=t.ref,e.return=t,t.child=e)}if(o=e.child,(e.lanes&l)===0){var u=o.memoizedProps;if(n=n.compare,n=n!==null?n:tr,n(u,r)&&e.ref===t.ref)return Tt(e,t,l)}return t.flags|=1,e=Qt(o,r),e.ref=t.ref,e.return=t,t.child=e}function Xs(e,t,n,r,l){if(e!==null){var o=e.memoizedProps;if(tr(o,r)&&e.ref===t.ref)if(Ue=!1,t.pendingProps=r=o,(e.lanes&l)!==0)(e.flags&131072)!==0&&(Ue=!0);else return t.lanes=e.lanes,Tt(e,t,l)}return ri(e,t,n,r,l)}function Ys(e,t,n){var r=t.pendingProps,l=r.children,o=e!==null?e.memoizedState:null;if(r.mode==="hidden")if((t.mode&1)===0)t.memoizedState={baseLanes:0,cachePool:null,transitions:null},oe(zn,Ye),Ye|=n;else{if((n&1073741824)===0)return e=o!==null?o.baseLanes|n:n,t.lanes=t.childLanes=1073741824,t.memoizedState={baseLanes:e,cachePool:null,transitions:null},t.updateQueue=null,oe(zn,Ye),Ye|=e,null;t.memoizedState={baseLanes:0,cachePool:null,transitions:null},r=o!==null?o.baseLanes:n,oe(zn,Ye),Ye|=r}else o!==null?(r=o.baseLanes|n,t.memoizedState=null):r=n,oe(zn,Ye),Ye|=r;return Me(e,t,l,n),t.child}function qs(e,t){var n=t.ref;(e===null&&n!==null||e!==null&&e.ref!==n)&&(t.flags|=512,t.flags|=2097152)}function ri(e,t,n,r,l){var o=Ve(n)?Jt:Ae.current;return o=kn(t,o),Pn(t,l),n=Go(e,t,n,r,o,l),r=Ko(),e!==null&&!Ue?(t.updateQueue=e.updateQueue,t.flags&=-2053,e.lanes&=~l,Tt(e,t,l)):(ce&&r&&Po(t),t.flags|=1,Me(e,t,n,l),t.child)}function Zs(e,t,n,r,l){if(Ve(n)){var o=!0;qr(t)}else o=!1;if(Pn(t,l),t.stateNode===null)hl(e,t),Vs(t,n,r),ei(t,n,r,l),r=!0;else if(e===null){var u=t.stateNode,c=t.memoizedProps;u.props=c;var d=u.context,x=n.contextType;typeof x=="object"&&x!==null?x=et(x):(x=Ve(n)?Jt:Ae.current,x=kn(t,x));var E=n.getDerivedStateFromProps,R=typeof E=="function"||typeof u.getSnapshotBeforeUpdate=="function";R||typeof u.UNSAFE_componentWillReceiveProps!="function"&&typeof u.componentWillReceiveProps!="function"||(c!==r||d!==x)&&Us(t,u,r,x),Bt=!1;var C=t.memoizedState;u.state=C,il(t,r,u,l),d=t.memoizedState,c!==r||C!==d||Be.current||Bt?(typeof E=="function"&&(Jo(t,n,E,r),d=t.memoizedState),(c=Bt||Bs(t,n,c,r,C,d,x))?(R||typeof u.UNSAFE_componentWillMount!="function"&&typeof u.componentWillMount!="function"||(typeof u.componentWillMount=="function"&&u.componentWillMount(),typeof u.UNSAFE_componentWillMount=="function"&&u.UNSAFE_componentWillMount()),typeof u.componentDidMount=="function"&&(t.flags|=4194308)):(typeof u.componentDidMount=="function"&&(t.flags|=4194308),t.memoizedProps=r,t.memoizedState=d),u.props=r,u.state=d,u.context=x,r=c):(typeof u.componentDidMount=="function"&&(t.flags|=4194308),r=!1)}else{u=t.stateNode,ms(e,t),c=t.memoizedProps,x=t.type===t.elementType?c:st(t.type,c),u.props=x,R=t.pendingProps,C=u.context,d=n.contextType,typeof d=="object"&&d!==null?d=et(d):(d=Ve(n)?Jt:Ae.current,d=kn(t,d));var z=n.getDerivedStateFromProps;(E=typeof z=="function"||typeof u.getSnapshotBeforeUpdate=="function")||typeof u.UNSAFE_componentWillReceiveProps!="function"&&typeof u.componentWillReceiveProps!="function"||(c!==R||C!==d)&&Us(t,u,r,d),Bt=!1,C=t.memoizedState,u.state=C,il(t,r,u,l);var O=t.memoizedState;c!==R||C!==O||Be.current||Bt?(typeof z=="function"&&(Jo(t,n,z,r),O=t.memoizedState),(x=Bt||Bs(t,n,x,r,C,O,d)||!1)?(E||typeof u.UNSAFE_componentWillUpdate!="function"&&typeof u.componentWillUpdate!="function"||(typeof u.componentWillUpdate=="function"&&u.componentWillUpdate(r,O,d),typeof u.UNSAFE_componentWillUpdate=="function"&&u.UNSAFE_componentWillUpdate(r,O,d)),typeof u.componentDidUpdate=="function"&&(t.flags|=4),typeof u.getSnapshotBeforeUpdate=="function"&&(t.flags|=1024)):(typeof u.componentDidUpdate!="function"||c===e.memoizedProps&&C===e.memoizedState||(t.flags|=4),typeof u.getSnapshotBeforeUpdate!="function"||c===e.memoizedProps&&C===e.memoizedState||(t.flags|=1024),t.memoizedProps=r,t.memoizedState=O),u.props=r,u.state=O,u.context=d,r=x):(typeof u.componentDidUpdate!="function"||c===e.memoizedProps&&C===e.memoizedState||(t.flags|=4),typeof u.getSnapshotBeforeUpdate!="function"||c===e.memoizedProps&&C===e.memoizedState||(t.flags|=1024),r=!1)}return li(e,t,n,r,o,l)}function li(e,t,n,r,l,o){qs(e,t);var u=(t.flags&128)!==0;if(!r&&!u)return l&&rs(t,n,!1),Tt(e,t,o);r=t.stateNode,hf.current=t;var c=u&&typeof n.getDerivedStateFromError!="function"?null:r.render();return t.flags|=1,e!==null&&u?(t.child=Fn(t,e.child,null,o),t.child=Fn(t,null,c,o)):Me(e,t,c,o),t.memoizedState=r.state,l&&rs(t,n,!0),t.child}function Js(e){var t=e.stateNode;t.pendingContext?ts(e,t.pendingContext,t.pendingContext!==t.context):t.context&&ts(e,t.context,!1),Uo(e,t.containerInfo)}function ea(e,t,n,r,l){return Rn(),zo(l),t.flags|=256,Me(e,t,n,r),t.child}var oi={dehydrated:null,treeContext:null,retryLane:0};function ii(e){return{baseLanes:e,cachePool:null,transitions:null}}function ta(e,t,n){var r=t.pendingProps,l=de.current,o=!1,u=(t.flags&128)!==0,c;if((c=u)||(c=e!==null&&e.memoizedState===null?!1:(l&2)!==0),c?(o=!0,t.flags&=-129):(e===null||e.memoizedState!==null)&&(l|=1),oe(de,l&1),e===null)return Do(t),e=t.memoizedState,e!==null&&(e=e.dehydrated,e!==null)?((t.mode&1)===0?t.lanes=1:e.data==="$!"?t.lanes=8:t.lanes=1073741824,null):(u=r.children,e=r.fallback,o?(r=t.mode,o=t.child,u={mode:"hidden",children:u},(r&1)===0&&o!==null?(o.childLanes=0,o.pendingProps=u):o=Rl(u,r,0,null),e=cn(e,r,n,null),o.return=t,e.return=t,o.sibling=e,t.child=o,t.child.memoizedState=ii(n),t.memoizedState=oi,e):ui(t,u));if(l=e.memoizedState,l!==null&&(c=l.dehydrated,c!==null))return vf(e,t,u,r,c,l,n);if(o){o=r.fallback,u=t.mode,l=e.child,c=l.sibling;var d={mode:"hidden",children:r.children};return(u&1)===0&&t.child!==l?(r=t.child,r.childLanes=0,r.pendingProps=d,t.deletions=null):(r=Qt(l,d),r.subtreeFlags=l.subtreeFlags&14680064),c!==null?o=Qt(c,o):(o=cn(o,u,n,null),o.flags|=2),o.return=t,r.return=t,r.sibling=o,t.child=r,r=o,o=t.child,u=e.child.memoizedState,u=u===null?ii(n):{baseLanes:u.baseLanes|n,cachePool:null,transitions:u.transitions},o.memoizedState=u,o.childLanes=e.childLanes&~n,t.memoizedState=oi,r}return o=e.child,e=o.sibling,r=Qt(o,{mode:"visible",children:r.children}),(t.mode&1)===0&&(r.lanes=n),r.return=t,r.sibling=null,e!==null&&(n=t.deletions,n===null?(t.deletions=[e],t.flags|=16):n.push(e)),t.child=r,t.memoizedState=null,r}function ui(e,t){return t=Rl({mode:"visible",children:t},e.mode,0,null),t.return=e,e.child=t}function ml(e,t,n,r){return r!==null&&zo(r),Fn(t,e.child,null,n),e=ui(t,t.pendingProps.children),e.flags|=2,t.memoizedState=null,e}function vf(e,t,n,r,l,o,u){if(n)return t.flags&256?(t.flags&=-257,r=ti(Error(i(422))),ml(e,t,u,r)):t.memoizedState!==null?(t.child=e.child,t.flags|=128,null):(o=r.fallback,l=t.mode,r=Rl({mode:"visible",children:r.children},l,0,null),o=cn(o,l,u,null),o.flags|=2,r.return=t,o.return=t,r.sibling=o,t.child=r,(t.mode&1)!==0&&Fn(t,e.child,null,u),t.child.memoizedState=ii(u),t.memoizedState=oi,o);if((t.mode&1)===0)return ml(e,t,u,null);if(l.data==="$!"){if(r=l.nextSibling&&l.nextSibling.dataset,r)var c=r.dgst;return r=c,o=Error(i(419)),r=ti(o,r,void 0),ml(e,t,u,r)}if(c=(u&e.childLanes)!==0,Ue||c){if(r=Te,r!==null){switch(u&-u){case 4:l=2;break;case 16:l=8;break;case 64:case 128:case 256:case 512:case 1024:case 2048:case 4096:case 8192:case 16384:case 32768:case 65536:case 131072:case 262144:case 524288:case 1048576:case 2097152:case 4194304:case 8388608:case 16777216:case 33554432:case 67108864:l=32;break;case 536870912:l=268435456;break;default:l=0}l=(l&(r.suspendedLanes|u))!==0?0:l,l!==0&&l!==o.retryLane&&(o.retryLane=l,kt(e,l),ft(r,e,l,-1))}return Ci(),r=ti(Error(i(421))),ml(e,t,u,r)}return l.data==="$?"?(t.flags|=128,t.child=e.child,t=If.bind(null,e),l._reactRetry=t,null):(e=o.treeContext,Xe=Mt(l.nextSibling),Ke=t,ce=!0,ut=null,e!==null&&(Ze[Je++]=St,Ze[Je++]=Ct,Ze[Je++]=en,St=e.id,Ct=e.overflow,en=t),t=ui(t,r.children),t.flags|=4096,t)}function na(e,t,n){e.lanes|=t;var r=e.alternate;r!==null&&(r.lanes|=t),jo(e.return,t,n)}function si(e,t,n,r,l){var o=e.memoizedState;o===null?e.memoizedState={isBackwards:t,rendering:null,renderingStartTime:0,last:r,tail:n,tailMode:l}:(o.isBackwards=t,o.rendering=null,o.renderingStartTime=0,o.last=r,o.tail=n,o.tailMode=l)}function ra(e,t,n){var r=t.pendingProps,l=r.revealOrder,o=r.tail;if(Me(e,t,r.children,n),r=de.current,(r&2)!==0)r=r&1|2,t.flags|=128;else{if(e!==null&&(e.flags&128)!==0)e:for(e=t.child;e!==null;){if(e.tag===13)e.memoizedState!==null&&na(e,n,t);else if(e.tag===19)na(e,n,t);else if(e.child!==null){e.child.return=e,e=e.child;continue}if(e===t)break e;for(;e.sibling===null;){if(e.return===null||e.return===t)break e;e=e.return}e.sibling.return=e.return,e=e.sibling}r&=1}if(oe(de,r),(t.mode&1)===0)t.memoizedState=null;else switch(l){case"forwards":for(n=t.child,l=null;n!==null;)e=n.alternate,e!==null&&ul(e)===null&&(l=n),n=n.sibling;n=l,n===null?(l=t.child,t.child=null):(l=n.sibling,n.sibling=null),si(t,!1,l,n,o);break;case"backwards":for(n=null,l=t.child,t.child=null;l!==null;){if(e=l.alternate,e!==null&&ul(e)===null){t.child=l;break}e=l.sibling,l.sibling=n,n=l,l=e}si(t,!0,n,null,o);break;case"together":si(t,!1,null,null,void 0);break;default:t.memoizedState=null}return t.child}function hl(e,t){(t.mode&1)===0&&e!==null&&(e.alternate=null,t.alternate=null,t.flags|=2)}function Tt(e,t,n){if(e!==null&&(t.dependencies=e.dependencies),on|=t.lanes,(n&t.childLanes)===0)return null;if(e!==null&&t.child!==e.child)throw Error(i(153));if(t.child!==null){for(e=t.child,n=Qt(e,e.pendingProps),t.child=n,n.return=t;e.sibling!==null;)e=e.sibling,n=n.sibling=Qt(e,e.pendingProps),n.return=t;n.sibling=null}return t.child}function gf(e,t,n){switch(t.tag){case 3:Js(t),Rn();break;case 5:gs(t);break;case 1:Ve(t.type)&&qr(t);break;case 4:Uo(t,t.stateNode.containerInfo);break;case 10:var r=t.type._context,l=t.memoizedProps.value;oe(rl,r._currentValue),r._currentValue=l;break;case 13:if(r=t.memoizedState,r!==null)return r.dehydrated!==null?(oe(de,de.current&1),t.flags|=128,null):(n&t.child.childLanes)!==0?ta(e,t,n):(oe(de,de.current&1),e=Tt(e,t,n),e!==null?e.sibling:null);oe(de,de.current&1);break;case 19:if(r=(n&t.childLanes)!==0,(e.flags&128)!==0){if(r)return ra(e,t,n);t.flags|=128}if(l=t.memoizedState,l!==null&&(l.rendering=null,l.tail=null,l.lastEffect=null),oe(de,de.current),r)break;return null;case 22:case 23:return t.lanes=0,Ys(e,t,n)}return Tt(e,t,n)}var la,ai,oa,ia;la=function(e,t){for(var n=t.child;n!==null;){if(n.tag===5||n.tag===6)e.appendChild(n.stateNode);else if(n.tag!==4&&n.child!==null){n.child.return=n,n=n.child;continue}if(n===t)break;for(;n.sibling===null;){if(n.return===null||n.return===t)return;n=n.return}n.sibling.return=n.return,n=n.sibling}},ai=function(){},oa=function(e,t,n,r){var l=e.memoizedProps;if(l!==r){e=t.stateNode,rn(vt.current);var o=null;switch(n){case"input":l=Ol(e,l),r=Ol(e,r),o=[];break;case"select":l=L({},l,{value:void 0}),r=L({},r,{value:void 0}),o=[];break;case"textarea":l=Vl(e,l),r=Vl(e,r),o=[];break;default:typeof l.onClick!="function"&&typeof r.onClick=="function"&&(e.onclick=Kr)}bl(n,r);var u;n=null;for(x in l)if(!r.hasOwnProperty(x)&&l.hasOwnProperty(x)&&l[x]!=null)if(x==="style"){var c=l[x];for(u in c)c.hasOwnProperty(u)&&(n||(n={}),n[u]="")}else x!=="dangerouslySetInnerHTML"&&x!=="children"&&x!=="suppressContentEditableWarning"&&x!=="suppressHydrationWarning"&&x!=="autoFocus"&&(f.hasOwnProperty(x)?o||(o=[]):(o=o||[]).push(x,null));for(x in r){var d=r[x];if(c=l!=null?l[x]:void 0,r.hasOwnProperty(x)&&d!==c&&(d!=null||c!=null))if(x==="style")if(c){for(u in c)!c.hasOwnProperty(u)||d&&d.hasOwnProperty(u)||(n||(n={}),n[u]="");for(u in d)d.hasOwnProperty(u)&&c[u]!==d[u]&&(n||(n={}),n[u]=d[u])}else n||(o||(o=[]),o.push(x,n)),n=d;else x==="dangerouslySetInnerHTML"?(d=d?d.__html:void 0,c=c?c.__html:void 0,d!=null&&c!==d&&(o=o||[]).push(x,d)):x==="children"?typeof d!="string"&&typeof d!="number"||(o=o||[]).push(x,""+d):x!=="suppressContentEditableWarning"&&x!=="suppressHydrationWarning"&&(f.hasOwnProperty(x)?(d!=null&&x==="onScroll"&&ie("scroll",e),o||c===d||(o=[])):(o=o||[]).push(x,d))}n&&(o=o||[]).push("style",n);var x=o;(t.updateQueue=x)&&(t.flags|=4)}},ia=function(e,t,n,r){n!==r&&(t.flags|=4)};function vr(e,t){if(!ce)switch(e.tailMode){case"hidden":t=e.tail;for(var n=null;t!==null;)t.alternate!==null&&(n=t),t=t.sibling;n===null?e.tail=null:n.sibling=null;break;case"collapsed":n=e.tail;for(var r=null;n!==null;)n.alternate!==null&&(r=n),n=n.sibling;r===null?t||e.tail===null?e.tail=null:e.tail.sibling=null:r.sibling=null}}function De(e){var t=e.alternate!==null&&e.alternate.child===e.child,n=0,r=0;if(t)for(var l=e.child;l!==null;)n|=l.lanes|l.childLanes,r|=l.subtreeFlags&14680064,r|=l.flags&14680064,l.return=e,l=l.sibling;else for(l=e.child;l!==null;)n|=l.lanes|l.childLanes,r|=l.subtreeFlags,r|=l.flags,l.return=e,l=l.sibling;return e.subtreeFlags|=r,e.childLanes=n,t}function yf(e,t,n){var r=t.pendingProps;switch(Ao(t),t.tag){case 2:case 16:case 15:case 0:case 11:case 7:case 8:case 12:case 9:case 14:return De(t),null;case 1:return Ve(t.type)&&Yr(),De(t),null;case 3:return r=t.stateNode,An(),ue(Be),ue(Ae),Ho(),r.pendingContext&&(r.context=r.pendingContext,r.pendingContext=null),(e===null||e.child===null)&&(tl(t)?t.flags|=4:e===null||e.memoizedState.isDehydrated&&(t.flags&256)===0||(t.flags|=1024,ut!==null&&(xi(ut),ut=null))),ai(e,t),De(t),null;case 5:bo(t);var l=rn(fr.current);if(n=t.type,e!==null&&t.stateNode!=null)oa(e,t,n,r,l),e.ref!==t.ref&&(t.flags|=512,t.flags|=2097152);else{if(!r){if(t.stateNode===null)throw Error(i(166));return De(t),null}if(e=rn(vt.current),tl(t)){r=t.stateNode,n=t.type;var o=t.memoizedProps;switch(r[ht]=t,r[ir]=o,e=(t.mode&1)!==0,n){case"dialog":ie("cancel",r),ie("close",r);break;case"iframe":case"object":case"embed":ie("load",r);break;case"video":case"audio":for(l=0;l<rr.length;l++)ie(rr[l],r);break;case"source":ie("error",r);break;case"img":case"image":case"link":ie("error",r),ie("load",r);break;case"details":ie("toggle",r);break;case"input":Vi(r,o),ie("invalid",r);break;case"select":r._wrapperState={wasMultiple:!!o.multiple},ie("invalid",r);break;case"textarea":Wi(r,o),ie("invalid",r)}bl(n,o),l=null;for(var u in o)if(o.hasOwnProperty(u)){var c=o[u];u==="children"?typeof c=="string"?r.textContent!==c&&(o.suppressHydrationWarning!==!0&&Gr(r.textContent,c,e),l=["children",c]):typeof c=="number"&&r.textContent!==""+c&&(o.suppressHydrationWarning!==!0&&Gr(r.textContent,c,e),l=["children",""+c]):f.hasOwnProperty(u)&&c!=null&&u==="onScroll"&&ie("scroll",r)}switch(n){case"input":kr(r),bi(r,o,!0);break;case"textarea":kr(r),$i(r);break;case"select":case"option":break;default:typeof o.onClick=="function"&&(r.onclick=Kr)}r=l,t.updateQueue=r,r!==null&&(t.flags|=4)}else{u=l.nodeType===9?l:l.ownerDocument,e==="http://www.w3.org/1999/xhtml"&&(e=Qi(n)),e==="http://www.w3.org/1999/xhtml"?n==="script"?(e=u.createElement("div"),e.innerHTML="<script><\/script>",e=e.removeChild(e.firstChild)):typeof r.is=="string"?e=u.createElement(n,{is:r.is}):(e=u.createElement(n),n==="select"&&(u=e,r.multiple?u.multiple=!0:r.size&&(u.size=r.size))):e=u.createElementNS(e,n),e[ht]=t,e[ir]=r,la(e,t,!1,!1),t.stateNode=e;e:{switch(u=Wl(n,r),n){case"dialog":ie("cancel",e),ie("close",e),l=r;break;case"iframe":case"object":case"embed":ie("load",e),l=r;break;case"video":case"audio":for(l=0;l<rr.length;l++)ie(rr[l],e);l=r;break;case"source":ie("error",e),l=r;break;case"img":case"image":case"link":ie("error",e),ie("load",e),l=r;break;case"details":ie("toggle",e),l=r;break;case"input":Vi(e,r),l=Ol(e,r),ie("invalid",e);break;case"option":l=r;break;case"select":e._wrapperState={wasMultiple:!!r.multiple},l=L({},r,{value:void 0}),ie("invalid",e);break;case"textarea":Wi(e,r),l=Vl(e,r),ie("invalid",e);break;default:l=r}bl(n,l),c=l;for(o in c)if(c.hasOwnProperty(o)){var d=c[o];o==="style"?Xi(e,d):o==="dangerouslySetInnerHTML"?(d=d?d.__html:void 0,d!=null&&Gi(e,d)):o==="children"?typeof d=="string"?(n!=="textarea"||d!=="")&&jn(e,d):typeof d=="number"&&jn(e,""+d):o!=="suppressContentEditableWarning"&&o!=="suppressHydrationWarning"&&o!=="autoFocus"&&(f.hasOwnProperty(o)?d!=null&&o==="onScroll"&&ie("scroll",e):d!=null&&Fe(e,o,d,u))}switch(n){case"input":kr(e),bi(e,r,!1);break;case"textarea":kr(e),$i(e);break;case"option":r.value!=null&&e.setAttribute("value",""+te(r.value));break;case"select":e.multiple=!!r.multiple,o=r.value,o!=null?dn(e,!!r.multiple,o,!1):r.defaultValue!=null&&dn(e,!!r.multiple,r.defaultValue,!0);break;default:typeof l.onClick=="function"&&(e.onclick=Kr)}switch(n){case"button":case"input":case"select":case"textarea":r=!!r.autoFocus;break e;case"img":r=!0;break e;default:r=!1}}r&&(t.flags|=4)}t.ref!==null&&(t.flags|=512,t.flags|=2097152)}return De(t),null;case 6:if(e&&t.stateNode!=null)ia(e,t,e.memoizedProps,r);else{if(typeof r!="string"&&t.stateNode===null)throw Error(i(166));if(n=rn(fr.current),rn(vt.current),tl(t)){if(r=t.stateNode,n=t.memoizedProps,r[ht]=t,(o=r.nodeValue!==n)&&(e=Ke,e!==null))switch(e.tag){case 3:Gr(r.nodeValue,n,(e.mode&1)!==0);break;case 5:e.memoizedProps.suppressHydrationWarning!==!0&&Gr(r.nodeValue,n,(e.mode&1)!==0)}o&&(t.flags|=4)}else r=(n.nodeType===9?n:n.ownerDocument).createTextNode(r),r[ht]=t,t.stateNode=r}return De(t),null;case 13:if(ue(de),r=t.memoizedState,e===null||e.memoizedState!==null&&e.memoizedState.dehydrated!==null){if(ce&&Xe!==null&&(t.mode&1)!==0&&(t.flags&128)===0)as(),Rn(),t.flags|=98560,o=!1;else if(o=tl(t),r!==null&&r.dehydrated!==null){if(e===null){if(!o)throw Error(i(318));if(o=t.memoizedState,o=o!==null?o.dehydrated:null,!o)throw Error(i(317));o[ht]=t}else Rn(),(t.flags&128)===0&&(t.memoizedState=null),t.flags|=4;De(t),o=!1}else ut!==null&&(xi(ut),ut=null),o=!0;if(!o)return t.flags&65536?t:null}return(t.flags&128)!==0?(t.lanes=n,t):(r=r!==null,r!==(e!==null&&e.memoizedState!==null)&&r&&(t.child.flags|=8192,(t.mode&1)!==0&&(e===null||(de.current&1)!==0?Ce===0&&(Ce=3):Ci())),t.updateQueue!==null&&(t.flags|=4),De(t),null);case 4:return An(),ai(e,t),e===null&&lr(t.stateNode.containerInfo),De(t),null;case 10:return Oo(t.type._context),De(t),null;case 17:return Ve(t.type)&&Yr(),De(t),null;case 19:if(ue(de),o=t.memoizedState,o===null)return De(t),null;if(r=(t.flags&128)!==0,u=o.rendering,u===null)if(r)vr(o,!1);else{if(Ce!==0||e!==null&&(e.flags&128)!==0)for(e=t.child;e!==null;){if(u=ul(e),u!==null){for(t.flags|=128,vr(o,!1),r=u.updateQueue,r!==null&&(t.updateQueue=r,t.flags|=4),t.subtreeFlags=0,r=n,n=t.child;n!==null;)o=n,e=r,o.flags&=14680066,u=o.alternate,u===null?(o.childLanes=0,o.lanes=e,o.child=null,o.subtreeFlags=0,o.memoizedProps=null,o.memoizedState=null,o.updateQueue=null,o.dependencies=null,o.stateNode=null):(o.childLanes=u.childLanes,o.lanes=u.lanes,o.child=u.child,o.subtreeFlags=0,o.deletions=null,o.memoizedProps=u.memoizedProps,o.memoizedState=u.memoizedState,o.updateQueue=u.updateQueue,o.type=u.type,e=u.dependencies,o.dependencies=e===null?null:{lanes:e.lanes,firstContext:e.firstContext}),n=n.sibling;return oe(de,de.current&1|2),t.child}e=e.sibling}o.tail!==null&&ge()>Mn&&(t.flags|=128,r=!0,vr(o,!1),t.lanes=4194304)}else{if(!r)if(e=ul(u),e!==null){if(t.flags|=128,r=!0,n=e.updateQueue,n!==null&&(t.updateQueue=n,t.flags|=4),vr(o,!0),o.tail===null&&o.tailMode==="hidden"&&!u.alternate&&!ce)return De(t),null}else 2*ge()-o.renderingStartTime>Mn&&n!==1073741824&&(t.flags|=128,r=!0,vr(o,!1),t.lanes=4194304);o.isBackwards?(u.sibling=t.child,t.child=u):(n=o.last,n!==null?n.sibling=u:t.child=u,o.last=u)}return o.tail!==null?(t=o.tail,o.rendering=t,o.tail=t.sibling,o.renderingStartTime=ge(),t.sibling=null,n=de.current,oe(de,r?n&1|2:n&1),t):(De(t),null);case 22:case 23:return Si(),r=t.memoizedState!==null,e!==null&&e.memoizedState!==null!==r&&(t.flags|=8192),r&&(t.mode&1)!==0?(Ye&1073741824)!==0&&(De(t),t.subtreeFlags&6&&(t.flags|=8192)):De(t),null;case 24:return null;case 25:return null}throw Error(i(156,t.tag))}function _f(e,t){switch(Ao(t),t.tag){case 1:return Ve(t.type)&&Yr(),e=t.flags,e&65536?(t.flags=e&-65537|128,t):null;case 3:return An(),ue(Be),ue(Ae),Ho(),e=t.flags,(e&65536)!==0&&(e&128)===0?(t.flags=e&-65537|128,t):null;case 5:return bo(t),null;case 13:if(ue(de),e=t.memoizedState,e!==null&&e.dehydrated!==null){if(t.alternate===null)throw Error(i(340));Rn()}return e=t.flags,e&65536?(t.flags=e&-65537|128,t):null;case 19:return ue(de),null;case 4:return An(),null;case 10:return Oo(t.type._context),null;case 22:case 23:return Si(),null;case 24:return null;default:return null}}var vl=!1,ze=!1,xf=typeof WeakSet=="function"?WeakSet:Set,M=null;function Dn(e,t){var n=e.ref;if(n!==null)if(typeof n=="function")try{n(null)}catch(r){he(e,t,r)}else n.current=null}function ci(e,t,n){try{n()}catch(r){he(e,t,r)}}var ua=!1;function wf(e,t){if(So=Lr,e=Bu(),mo(e)){if("selectionStart"in e)var n={start:e.selectionStart,end:e.selectionEnd};else e:{n=(n=e.ownerDocument)&&n.defaultView||window;var r=n.getSelection&&n.getSelection();if(r&&r.rangeCount!==0){n=r.anchorNode;var l=r.anchorOffset,o=r.focusNode;r=r.focusOffset;try{n.nodeType,o.nodeType}catch{n=null;break e}var u=0,c=-1,d=-1,x=0,E=0,R=e,C=null;t:for(;;){for(var z;R!==n||l!==0&&R.nodeType!==3||(c=u+l),R!==o||r!==0&&R.nodeType!==3||(d=u+r),R.nodeType===3&&(u+=R.nodeValue.length),(z=R.firstChild)!==null;)C=R,R=z;for(;;){if(R===e)break t;if(C===n&&++x===l&&(c=u),C===o&&++E===r&&(d=u),(z=R.nextSibling)!==null)break;R=C,C=R.parentNode}R=z}n=c===-1||d===-1?null:{start:c,end:d}}else n=null}n=n||{start:0,end:0}}else n=null;for(Co={focusedElem:e,selectionRange:n},Lr=!1,M=t;M!==null;)if(t=M,e=t.child,(t.subtreeFlags&1028)!==0&&e!==null)e.return=t,M=e;else for(;M!==null;){t=M;try{var O=t.alternate;if((t.flags&1024)!==0)switch(t.tag){case 0:case 11:case 15:break;case 1:if(O!==null){var j=O.memoizedProps,ye=O.memoizedState,v=t.stateNode,m=v.getSnapshotBeforeUpdate(t.elementType===t.type?j:st(t.type,j),ye);v.__reactInternalSnapshotBeforeUpdate=m}break;case 3:var _=t.stateNode.containerInfo;_.nodeType===1?_.textContent="":_.nodeType===9&&_.documentElement&&_.removeChild(_.documentElement);break;case 5:case 6:case 4:case 17:break;default:throw Error(i(163))}}catch(I){he(t,t.return,I)}if(e=t.sibling,e!==null){e.return=t.return,M=e;break}M=t.return}return O=ua,ua=!1,O}function gr(e,t,n){var r=t.updateQueue;if(r=r!==null?r.lastEffect:null,r!==null){var l=r=r.next;do{if((l.tag&e)===e){var o=l.destroy;l.destroy=void 0,o!==void 0&&ci(t,n,o)}l=l.next}while(l!==r)}}function gl(e,t){if(t=t.updateQueue,t=t!==null?t.lastEffect:null,t!==null){var n=t=t.next;do{if((n.tag&e)===e){var r=n.create;n.destroy=r()}n=n.next}while(n!==t)}}function fi(e){var t=e.ref;if(t!==null){var n=e.stateNode;switch(e.tag){case 5:e=n;break;default:e=n}typeof t=="function"?t(e):t.current=e}}function sa(e){var t=e.alternate;t!==null&&(e.alternate=null,sa(t)),e.child=null,e.deletions=null,e.sibling=null,e.tag===5&&(t=e.stateNode,t!==null&&(delete t[ht],delete t[ir],delete t[Ro],delete t[nf],delete t[rf])),e.stateNode=null,e.return=null,e.dependencies=null,e.memoizedProps=null,e.memoizedState=null,e.pendingProps=null,e.stateNode=null,e.updateQueue=null}function aa(e){return e.tag===5||e.tag===3||e.tag===4}function ca(e){e:for(;;){for(;e.sibling===null;){if(e.return===null||aa(e.return))return null;e=e.return}for(e.sibling.return=e.return,e=e.sibling;e.tag!==5&&e.tag!==6&&e.tag!==18;){if(e.flags&2||e.child===null||e.tag===4)continue e;e.child.return=e,e=e.child}if(!(e.flags&2))return e.stateNode}}function di(e,t,n){var r=e.tag;if(r===5||r===6)e=e.stateNode,t?n.nodeType===8?n.parentNode.insertBefore(e,t):n.insertBefore(e,t):(n.nodeType===8?(t=n.parentNode,t.insertBefore(e,n)):(t=n,t.appendChild(e)),n=n._reactRootContainer,n!=null||t.onclick!==null||(t.onclick=Kr));else if(r!==4&&(e=e.child,e!==null))for(di(e,t,n),e=e.sibling;e!==null;)di(e,t,n),e=e.sibling}function pi(e,t,n){var r=e.tag;if(r===5||r===6)e=e.stateNode,t?n.insertBefore(e,t):n.appendChild(e);else if(r!==4&&(e=e.child,e!==null))for(pi(e,t,n),e=e.sibling;e!==null;)pi(e,t,n),e=e.sibling}var Ie=null,at=!1;function Ut(e,t,n){for(n=n.child;n!==null;)fa(e,t,n),n=n.sibling}function fa(e,t,n){if(mt&&typeof mt.onCommitFiberUnmount=="function")try{mt.onCommitFiberUnmount(Pr,n)}catch{}switch(n.tag){case 5:ze||Dn(n,t);case 6:var r=Ie,l=at;Ie=null,Ut(e,t,n),Ie=r,at=l,Ie!==null&&(at?(e=Ie,n=n.stateNode,e.nodeType===8?e.parentNode.removeChild(n):e.removeChild(n)):Ie.removeChild(n.stateNode));break;case 18:Ie!==null&&(at?(e=Ie,n=n.stateNode,e.nodeType===8?To(e.parentNode,n):e.nodeType===1&&To(e,n),Xn(e)):To(Ie,n.stateNode));break;case 4:r=Ie,l=at,Ie=n.stateNode.containerInfo,at=!0,Ut(e,t,n),Ie=r,at=l;break;case 0:case 11:case 14:case 15:if(!ze&&(r=n.updateQueue,r!==null&&(r=r.lastEffect,r!==null))){l=r=r.next;do{var o=l,u=o.destroy;o=o.tag,u!==void 0&&((o&2)!==0||(o&4)!==0)&&ci(n,t,u),l=l.next}while(l!==r)}Ut(e,t,n);break;case 1:if(!ze&&(Dn(n,t),r=n.stateNode,typeof r.componentWillUnmount=="function"))try{r.props=n.memoizedProps,r.state=n.memoizedState,r.componentWillUnmount()}catch(c){he(n,t,c)}Ut(e,t,n);break;case 21:Ut(e,t,n);break;case 22:n.mode&1?(ze=(r=ze)||n.memoizedState!==null,Ut(e,t,n),ze=r):Ut(e,t,n);break;default:Ut(e,t,n)}}function da(e){var t=e.updateQueue;if(t!==null){e.updateQueue=null;var n=e.stateNode;n===null&&(n=e.stateNode=new xf),t.forEach(function(r){var l=Pf.bind(null,e,r);n.has(r)||(n.add(r),r.then(l,l))})}}function ct(e,t){var n=t.deletions;if(n!==null)for(var r=0;r<n.length;r++){var l=n[r];try{var o=e,u=t,c=u;e:for(;c!==null;){switch(c.tag){case 5:Ie=c.stateNode,at=!1;break e;case 3:Ie=c.stateNode.containerInfo,at=!0;break e;case 4:Ie=c.stateNode.containerInfo,at=!0;break e}c=c.return}if(Ie===null)throw Error(i(160));fa(o,u,l),Ie=null,at=!1;var d=l.alternate;d!==null&&(d.return=null),l.return=null}catch(x){he(l,t,x)}}if(t.subtreeFlags&12854)for(t=t.child;t!==null;)pa(t,e),t=t.sibling}function pa(e,t){var n=e.alternate,r=e.flags;switch(e.tag){case 0:case 11:case 14:case 15:if(ct(t,e),yt(e),r&4){try{gr(3,e,e.return),gl(3,e)}catch(j){he(e,e.return,j)}try{gr(5,e,e.return)}catch(j){he(e,e.return,j)}}break;case 1:ct(t,e),yt(e),r&512&&n!==null&&Dn(n,n.return);break;case 5:if(ct(t,e),yt(e),r&512&&n!==null&&Dn(n,n.return),e.flags&32){var l=e.stateNode;try{jn(l,"")}catch(j){he(e,e.return,j)}}if(r&4&&(l=e.stateNode,l!=null)){var o=e.memoizedProps,u=n!==null?n.memoizedProps:o,c=e.type,d=e.updateQueue;if(e.updateQueue=null,d!==null)try{c==="input"&&o.type==="radio"&&o.name!=null&&Ui(l,o),Wl(c,u);var x=Wl(c,o);for(u=0;u<d.length;u+=2){var E=d[u],R=d[u+1];E==="style"?Xi(l,R):E==="dangerouslySetInnerHTML"?Gi(l,R):E==="children"?jn(l,R):Fe(l,E,R,x)}switch(c){case"input":jl(l,o);break;case"textarea":Hi(l,o);break;case"select":var C=l._wrapperState.wasMultiple;l._wrapperState.wasMultiple=!!o.multiple;var z=o.value;z!=null?dn(l,!!o.multiple,z,!1):C!==!!o.multiple&&(o.defaultValue!=null?dn(l,!!o.multiple,o.defaultValue,!0):dn(l,!!o.multiple,o.multiple?[]:"",!1))}l[ir]=o}catch(j){he(e,e.return,j)}}break;case 6:if(ct(t,e),yt(e),r&4){if(e.stateNode===null)throw Error(i(162));l=e.stateNode,o=e.memoizedProps;try{l.nodeValue=o}catch(j){he(e,e.return,j)}}break;case 3:if(ct(t,e),yt(e),r&4&&n!==null&&n.memoizedState.isDehydrated)try{Xn(t.containerInfo)}catch(j){he(e,e.return,j)}break;case 4:ct(t,e),yt(e);break;case 13:ct(t,e),yt(e),l=e.child,l.flags&8192&&(o=l.memoizedState!==null,l.stateNode.isHidden=o,!o||l.alternate!==null&&l.alternate.memoizedState!==null||(vi=ge())),r&4&&da(e);break;case 22:if(E=n!==null&&n.memoizedState!==null,e.mode&1?(ze=(x=ze)||E,ct(t,e),ze=x):ct(t,e),yt(e),r&8192){if(x=e.memoizedState!==null,(e.stateNode.isHidden=x)&&!E&&(e.mode&1)!==0)for(M=e,E=e.child;E!==null;){for(R=M=E;M!==null;){switch(C=M,z=C.child,C.tag){case 0:case 11:case 14:case 15:gr(4,C,C.return);break;case 1:Dn(C,C.return);var O=C.stateNode;if(typeof O.componentWillUnmount=="function"){r=C,n=C.return;try{t=r,O.props=t.memoizedProps,O.state=t.memoizedState,O.componentWillUnmount()}catch(j){he(r,n,j)}}break;case 5:Dn(C,C.return);break;case 22:if(C.memoizedState!==null){va(R);continue}}z!==null?(z.return=C,M=z):va(R)}E=E.sibling}e:for(E=null,R=e;;){if(R.tag===5){if(E===null){E=R;try{l=R.stateNode,x?(o=l.style,typeof o.setProperty=="function"?o.setProperty("display","none","important"):o.display="none"):(c=R.stateNode,d=R.memoizedProps.style,u=d!=null&&d.hasOwnProperty("display")?d.display:null,c.style.display=Ki("display",u))}catch(j){he(e,e.return,j)}}}else if(R.tag===6){if(E===null)try{R.stateNode.nodeValue=x?"":R.memoizedProps}catch(j){he(e,e.return,j)}}else if((R.tag!==22&&R.tag!==23||R.memoizedState===null||R===e)&&R.child!==null){R.child.return=R,R=R.child;continue}if(R===e)break e;for(;R.sibling===null;){if(R.return===null||R.return===e)break e;E===R&&(E=null),R=R.return}E===R&&(E=null),R.sibling.return=R.return,R=R.sibling}}break;case 19:ct(t,e),yt(e),r&4&&da(e);break;case 21:break;default:ct(t,e),yt(e)}}function yt(e){var t=e.flags;if(t&2){try{e:{for(var n=e.return;n!==null;){if(aa(n)){var r=n;break e}n=n.return}throw Error(i(160))}switch(r.tag){case 5:var l=r.stateNode;r.flags&32&&(jn(l,""),r.flags&=-33);var o=ca(e);pi(e,o,l);break;case 3:case 4:var u=r.stateNode.containerInfo,c=ca(e);di(e,c,u);break;default:throw Error(i(161))}}catch(d){he(e,e.return,d)}e.flags&=-3}t&4096&&(e.flags&=-4097)}function Sf(e,t,n){M=e,ma(e)}function ma(e,t,n){for(var r=(e.mode&1)!==0;M!==null;){var l=M,o=l.child;if(l.tag===22&&r){var u=l.memoizedState!==null||vl;if(!u){var c=l.alternate,d=c!==null&&c.memoizedState!==null||ze;c=vl;var x=ze;if(vl=u,(ze=d)&&!x)for(M=l;M!==null;)u=M,d=u.child,u.tag===22&&u.memoizedState!==null?ga(l):d!==null?(d.return=u,M=d):ga(l);for(;o!==null;)M=o,ma(o),o=o.sibling;M=l,vl=c,ze=x}ha(e)}else(l.subtreeFlags&8772)!==0&&o!==null?(o.return=l,M=o):ha(e)}}function ha(e){for(;M!==null;){var t=M;if((t.flags&8772)!==0){var n=t.alternate;try{if((t.flags&8772)!==0)switch(t.tag){case 0:case 11:case 15:ze||gl(5,t);break;case 1:var r=t.stateNode;if(t.flags&4&&!ze)if(n===null)r.componentDidMount();else{var l=t.elementType===t.type?n.memoizedProps:st(t.type,n.memoizedProps);r.componentDidUpdate(l,n.memoizedState,r.__reactInternalSnapshotBeforeUpdate)}var o=t.updateQueue;o!==null&&vs(t,o,r);break;case 3:var u=t.updateQueue;if(u!==null){if(n=null,t.child!==null)switch(t.child.tag){case 5:n=t.child.stateNode;break;case 1:n=t.child.stateNode}vs(t,u,n)}break;case 5:var c=t.stateNode;if(n===null&&t.flags&4){n=c;var d=t.memoizedProps;switch(t.type){case"button":case"input":case"select":case"textarea":d.autoFocus&&n.focus();break;case"img":d.src&&(n.src=d.src)}}break;case 6:break;case 4:break;case 12:break;case 13:if(t.memoizedState===null){var x=t.alternate;if(x!==null){var E=x.memoizedState;if(E!==null){var R=E.dehydrated;R!==null&&Xn(R)}}}break;case 19:case 17:case 21:case 22:case 23:case 25:break;default:throw Error(i(163))}ze||t.flags&512&&fi(t)}catch(C){he(t,t.return,C)}}if(t===e){M=null;break}if(n=t.sibling,n!==null){n.return=t.return,M=n;break}M=t.return}}function va(e){for(;M!==null;){var t=M;if(t===e){M=null;break}var n=t.sibling;if(n!==null){n.return=t.return,M=n;break}M=t.return}}function ga(e){for(;M!==null;){var t=M;try{switch(t.tag){case 0:case 11:case 15:var n=t.return;try{gl(4,t)}catch(d){he(t,n,d)}break;case 1:var r=t.stateNode;if(typeof r.componentDidMount=="function"){var l=t.return;try{r.componentDidMount()}catch(d){he(t,l,d)}}var o=t.return;try{fi(t)}catch(d){he(t,o,d)}break;case 5:var u=t.return;try{fi(t)}catch(d){he(t,u,d)}}}catch(d){he(t,t.return,d)}if(t===e){M=null;break}var c=t.sibling;if(c!==null){c.return=t.return,M=c;break}M=t.return}}var Cf=Math.ceil,yl=fe.ReactCurrentDispatcher,mi=fe.ReactCurrentOwner,nt=fe.ReactCurrentBatchConfig,q=0,Te=null,xe=null,Pe=0,Ye=0,zn=Lt(0),Ce=0,yr=null,on=0,_l=0,hi=0,_r=null,be=null,vi=0,Mn=1/0,Rt=null,xl=!1,gi=null,bt=null,wl=!1,Wt=null,Sl=0,xr=0,yi=null,Cl=-1,kl=0;function Le(){return(q&6)!==0?ge():Cl!==-1?Cl:Cl=ge()}function Ht(e){return(e.mode&1)===0?1:(q&2)!==0&&Pe!==0?Pe&-Pe:of.transition!==null?(kl===0&&(kl=cu()),kl):(e=ne,e!==0||(e=window.event,e=e===void 0?16:_u(e.type)),e)}function ft(e,t,n,r){if(50<xr)throw xr=0,yi=null,Error(i(185));Hn(e,n,r),((q&2)===0||e!==Te)&&(e===Te&&((q&2)===0&&(_l|=n),Ce===4&&$t(e,Pe)),We(e,r),n===1&&q===0&&(t.mode&1)===0&&(Mn=ge()+500,Zr&&jt()))}function We(e,t){var n=e.callbackNode;oc(e,t);var r=Dr(e,e===Te?Pe:0);if(r===0)n!==null&&uu(n),e.callbackNode=null,e.callbackPriority=0;else if(t=r&-r,e.callbackPriority!==t){if(n!=null&&uu(n),t===1)e.tag===0?lf(_a.bind(null,e)):ls(_a.bind(null,e)),ef(function(){(q&6)===0&&jt()}),n=null;else{switch(fu(r)){case 1:n=Yl;break;case 4:n=su;break;case 16:n=Ir;break;case 536870912:n=au;break;default:n=Ir}n=Ra(n,ya.bind(null,e))}e.callbackPriority=t,e.callbackNode=n}}function ya(e,t){if(Cl=-1,kl=0,(q&6)!==0)throw Error(i(327));var n=e.callbackNode;if(Ln()&&e.callbackNode!==n)return null;var r=Dr(e,e===Te?Pe:0);if(r===0)return null;if((r&30)!==0||(r&e.expiredLanes)!==0||t)t=El(e,r);else{t=r;var l=q;q|=2;var o=wa();(Te!==e||Pe!==t)&&(Rt=null,Mn=ge()+500,sn(e,t));do try{Tf();break}catch(c){xa(e,c)}while(!0);Lo(),yl.current=o,q=l,xe!==null?t=0:(Te=null,Pe=0,t=Ce)}if(t!==0){if(t===2&&(l=ql(e),l!==0&&(r=l,t=_i(e,l))),t===1)throw n=yr,sn(e,0),$t(e,r),We(e,ge()),n;if(t===6)$t(e,r);else{if(l=e.current.alternate,(r&30)===0&&!kf(l)&&(t=El(e,r),t===2&&(o=ql(e),o!==0&&(r=o,t=_i(e,o))),t===1))throw n=yr,sn(e,0),$t(e,r),We(e,ge()),n;switch(e.finishedWork=l,e.finishedLanes=r,t){case 0:case 1:throw Error(i(345));case 2:an(e,be,Rt);break;case 3:if($t(e,r),(r&130023424)===r&&(t=vi+500-ge(),10<t)){if(Dr(e,0)!==0)break;if(l=e.suspendedLanes,(l&r)!==r){Le(),e.pingedLanes|=e.suspendedLanes&l;break}e.timeoutHandle=Eo(an.bind(null,e,be,Rt),t);break}an(e,be,Rt);break;case 4:if($t(e,r),(r&4194240)===r)break;for(t=e.eventTimes,l=-1;0<r;){var u=31-ot(r);o=1<<u,u=t[u],u>l&&(l=u),r&=~o}if(r=l,r=ge()-r,r=(120>r?120:480>r?480:1080>r?1080:1920>r?1920:3e3>r?3e3:4320>r?4320:1960*Cf(r/1960))-r,10<r){e.timeoutHandle=Eo(an.bind(null,e,be,Rt),r);break}an(e,be,Rt);break;case 5:an(e,be,Rt);break;default:throw Error(i(329))}}}return We(e,ge()),e.callbackNode===n?ya.bind(null,e):null}function _i(e,t){var n=_r;return e.current.memoizedState.isDehydrated&&(sn(e,t).flags|=256),e=El(e,t),e!==2&&(t=be,be=n,t!==null&&xi(t)),e}function xi(e){be===null?be=e:be.push.apply(be,e)}function kf(e){for(var t=e;;){if(t.flags&16384){var n=t.updateQueue;if(n!==null&&(n=n.stores,n!==null))for(var r=0;r<n.length;r++){var l=n[r],o=l.getSnapshot;l=l.value;try{if(!it(o(),l))return!1}catch{return!1}}}if(n=t.child,t.subtreeFlags&16384&&n!==null)n.return=t,t=n;else{if(t===e)break;for(;t.sibling===null;){if(t.return===null||t.return===e)return!0;t=t.return}t.sibling.return=t.return,t=t.sibling}}return!0}function $t(e,t){for(t&=~hi,t&=~_l,e.suspendedLanes|=t,e.pingedLanes&=~t,e=e.expirationTimes;0<t;){var n=31-ot(t),r=1<<n;e[n]=-1,t&=~r}}function _a(e){if((q&6)!==0)throw Error(i(327));Ln();var t=Dr(e,0);if((t&1)===0)return We(e,ge()),null;var n=El(e,t);if(e.tag!==0&&n===2){var r=ql(e);r!==0&&(t=r,n=_i(e,r))}if(n===1)throw n=yr,sn(e,0),$t(e,t),We(e,ge()),n;if(n===6)throw Error(i(345));return e.finishedWork=e.current.alternate,e.finishedLanes=t,an(e,be,Rt),We(e,ge()),null}function wi(e,t){var n=q;q|=1;try{return e(t)}finally{q=n,q===0&&(Mn=ge()+500,Zr&&jt())}}function un(e){Wt!==null&&Wt.tag===0&&(q&6)===0&&Ln();var t=q;q|=1;var n=nt.transition,r=ne;try{if(nt.transition=null,ne=1,e)return e()}finally{ne=r,nt.transition=n,q=t,(q&6)===0&&jt()}}function Si(){Ye=zn.current,ue(zn)}function sn(e,t){e.finishedWork=null,e.finishedLanes=0;var n=e.timeoutHandle;if(n!==-1&&(e.timeoutHandle=-1,Jc(n)),xe!==null)for(n=xe.return;n!==null;){var r=n;switch(Ao(r),r.tag){case 1:r=r.type.childContextTypes,r!=null&&Yr();break;case 3:An(),ue(Be),ue(Ae),Ho();break;case 5:bo(r);break;case 4:An();break;case 13:ue(de);break;case 19:ue(de);break;case 10:Oo(r.type._context);break;case 22:case 23:Si()}n=n.return}if(Te=e,xe=e=Qt(e.current,null),Pe=Ye=t,Ce=0,yr=null,hi=_l=on=0,be=_r=null,nn!==null){for(t=0;t<nn.length;t++)if(n=nn[t],r=n.interleaved,r!==null){n.interleaved=null;var l=r.next,o=n.pending;if(o!==null){var u=o.next;o.next=l,r.next=u}n.pending=r}nn=null}return e}function xa(e,t){do{var n=xe;try{if(Lo(),sl.current=dl,al){for(var r=pe.memoizedState;r!==null;){var l=r.queue;l!==null&&(l.pending=null),r=r.next}al=!1}if(ln=0,Ee=Se=pe=null,dr=!1,pr=0,mi.current=null,n===null||n.return===null){Ce=1,yr=t,xe=null;break}e:{var o=e,u=n.return,c=n,d=t;if(t=Pe,c.flags|=32768,d!==null&&typeof d=="object"&&typeof d.then=="function"){var x=d,E=c,R=E.tag;if((E.mode&1)===0&&(R===0||R===11||R===15)){var C=E.alternate;C?(E.updateQueue=C.updateQueue,E.memoizedState=C.memoizedState,E.lanes=C.lanes):(E.updateQueue=null,E.memoizedState=null)}var z=$s(u);if(z!==null){z.flags&=-257,Qs(z,u,c,o,t),z.mode&1&&Hs(o,x,t),t=z,d=x;var O=t.updateQueue;if(O===null){var j=new Set;j.add(d),t.updateQueue=j}else O.add(d);break e}else{if((t&1)===0){Hs(o,x,t),Ci();break e}d=Error(i(426))}}else if(ce&&c.mode&1){var ye=$s(u);if(ye!==null){(ye.flags&65536)===0&&(ye.flags|=256),Qs(ye,u,c,o,t),zo(Nn(d,c));break e}}o=d=Nn(d,c),Ce!==4&&(Ce=2),_r===null?_r=[o]:_r.push(o),o=u;do{switch(o.tag){case 3:o.flags|=65536,t&=-t,o.lanes|=t;var v=bs(o,d,t);hs(o,v);break e;case 1:c=d;var m=o.type,_=o.stateNode;if((o.flags&128)===0&&(typeof m.getDerivedStateFromError=="function"||_!==null&&typeof _.componentDidCatch=="function"&&(bt===null||!bt.has(_)))){o.flags|=65536,t&=-t,o.lanes|=t;var I=Ws(o,c,t);hs(o,I);break e}}o=o.return}while(o!==null)}Ca(n)}catch(B){t=B,xe===n&&n!==null&&(xe=n=n.return);continue}break}while(!0)}function wa(){var e=yl.current;return yl.current=dl,e===null?dl:e}function Ci(){(Ce===0||Ce===3||Ce===2)&&(Ce=4),Te===null||(on&268435455)===0&&(_l&268435455)===0||$t(Te,Pe)}function El(e,t){var n=q;q|=2;var r=wa();(Te!==e||Pe!==t)&&(Rt=null,sn(e,t));do try{Ef();break}catch(l){xa(e,l)}while(!0);if(Lo(),q=n,yl.current=r,xe!==null)throw Error(i(261));return Te=null,Pe=0,Ce}function Ef(){for(;xe!==null;)Sa(xe)}function Tf(){for(;xe!==null&&!Ya();)Sa(xe)}function Sa(e){var t=Ta(e.alternate,e,Ye);e.memoizedProps=e.pendingProps,t===null?Ca(e):xe=t,mi.current=null}function Ca(e){var t=e;do{var n=t.alternate;if(e=t.return,(t.flags&32768)===0){if(n=yf(n,t,Ye),n!==null){xe=n;return}}else{if(n=_f(n,t),n!==null){n.flags&=32767,xe=n;return}if(e!==null)e.flags|=32768,e.subtreeFlags=0,e.deletions=null;else{Ce=6,xe=null;return}}if(t=t.sibling,t!==null){xe=t;return}xe=t=e}while(t!==null);Ce===0&&(Ce=5)}function an(e,t,n){var r=ne,l=nt.transition;try{nt.transition=null,ne=1,Rf(e,t,n,r)}finally{nt.transition=l,ne=r}return null}function Rf(e,t,n,r){do Ln();while(Wt!==null);if((q&6)!==0)throw Error(i(327));n=e.finishedWork;var l=e.finishedLanes;if(n===null)return null;if(e.finishedWork=null,e.finishedLanes=0,n===e.current)throw Error(i(177));e.callbackNode=null,e.callbackPriority=0;var o=n.lanes|n.childLanes;if(ic(e,o),e===Te&&(xe=Te=null,Pe=0),(n.subtreeFlags&2064)===0&&(n.flags&2064)===0||wl||(wl=!0,Ra(Ir,function(){return Ln(),null})),o=(n.flags&15990)!==0,(n.subtreeFlags&15990)!==0||o){o=nt.transition,nt.transition=null;var u=ne;ne=1;var c=q;q|=4,mi.current=null,wf(e,n),pa(n,e),Qc(Co),Lr=!!So,Co=So=null,e.current=n,Sf(n),qa(),q=c,ne=u,nt.transition=o}else e.current=n;if(wl&&(wl=!1,Wt=e,Sl=l),o=e.pendingLanes,o===0&&(bt=null),ec(n.stateNode),We(e,ge()),t!==null)for(r=e.onRecoverableError,n=0;n<t.length;n++)l=t[n],r(l.value,{componentStack:l.stack,digest:l.digest});if(xl)throw xl=!1,e=gi,gi=null,e;return(Sl&1)!==0&&e.tag!==0&&Ln(),o=e.pendingLanes,(o&1)!==0?e===yi?xr++:(xr=0,yi=e):xr=0,jt(),null}function Ln(){if(Wt!==null){var e=fu(Sl),t=nt.transition,n=ne;try{if(nt.transition=null,ne=16>e?16:e,Wt===null)var r=!1;else{if(e=Wt,Wt=null,Sl=0,(q&6)!==0)throw Error(i(331));var l=q;for(q|=4,M=e.current;M!==null;){var o=M,u=o.child;if((M.flags&16)!==0){var c=o.deletions;if(c!==null){for(var d=0;d<c.length;d++){var x=c[d];for(M=x;M!==null;){var E=M;switch(E.tag){case 0:case 11:case 15:gr(8,E,o)}var R=E.child;if(R!==null)R.return=E,M=R;else for(;M!==null;){E=M;var C=E.sibling,z=E.return;if(sa(E),E===x){M=null;break}if(C!==null){C.return=z,M=C;break}M=z}}}var O=o.alternate;if(O!==null){var j=O.child;if(j!==null){O.child=null;do{var ye=j.sibling;j.sibling=null,j=ye}while(j!==null)}}M=o}}if((o.subtreeFlags&2064)!==0&&u!==null)u.return=o,M=u;else e:for(;M!==null;){if(o=M,(o.flags&2048)!==0)switch(o.tag){case 0:case 11:case 15:gr(9,o,o.return)}var v=o.sibling;if(v!==null){v.return=o.return,M=v;break e}M=o.return}}var m=e.current;for(M=m;M!==null;){u=M;var _=u.child;if((u.subtreeFlags&2064)!==0&&_!==null)_.return=u,M=_;else e:for(u=m;M!==null;){if(c=M,(c.flags&2048)!==0)try{switch(c.tag){case 0:case 11:case 15:gl(9,c)}}catch(B){he(c,c.return,B)}if(c===u){M=null;break e}var I=c.sibling;if(I!==null){I.return=c.return,M=I;break e}M=c.return}}if(q=l,jt(),mt&&typeof mt.onPostCommitFiberRoot=="function")try{mt.onPostCommitFiberRoot(Pr,e)}catch{}r=!0}return r}finally{ne=n,nt.transition=t}}return!1}function ka(e,t,n){t=Nn(n,t),t=bs(e,t,1),e=Vt(e,t,1),t=Le(),e!==null&&(Hn(e,1,t),We(e,t))}function he(e,t,n){if(e.tag===3)ka(e,e,n);else for(;t!==null;){if(t.tag===3){ka(t,e,n);break}else if(t.tag===1){var r=t.stateNode;if(typeof t.type.getDerivedStateFromError=="function"||typeof r.componentDidCatch=="function"&&(bt===null||!bt.has(r))){e=Nn(n,e),e=Ws(t,e,1),t=Vt(t,e,1),e=Le(),t!==null&&(Hn(t,1,e),We(t,e));break}}t=t.return}}function Ff(e,t,n){var r=e.pingCache;r!==null&&r.delete(t),t=Le(),e.pingedLanes|=e.suspendedLanes&n,Te===e&&(Pe&n)===n&&(Ce===4||Ce===3&&(Pe&130023424)===Pe&&500>ge()-vi?sn(e,0):hi|=n),We(e,t)}function Ea(e,t){t===0&&((e.mode&1)===0?t=1:(t=Nr,Nr<<=1,(Nr&130023424)===0&&(Nr=4194304)));var n=Le();e=kt(e,t),e!==null&&(Hn(e,t,n),We(e,n))}function If(e){var t=e.memoizedState,n=0;t!==null&&(n=t.retryLane),Ea(e,n)}function Pf(e,t){var n=0;switch(e.tag){case 13:var r=e.stateNode,l=e.memoizedState;l!==null&&(n=l.retryLane);break;case 19:r=e.stateNode;break;default:throw Error(i(314))}r!==null&&r.delete(t),Ea(e,n)}var Ta;Ta=function(e,t,n){if(e!==null)if(e.memoizedProps!==t.pendingProps||Be.current)Ue=!0;else{if((e.lanes&n)===0&&(t.flags&128)===0)return Ue=!1,gf(e,t,n);Ue=(e.flags&131072)!==0}else Ue=!1,ce&&(t.flags&1048576)!==0&&os(t,el,t.index);switch(t.lanes=0,t.tag){case 2:var r=t.type;hl(e,t),e=t.pendingProps;var l=kn(t,Ae.current);Pn(t,n),l=Go(null,t,r,e,l,n);var o=Ko();return t.flags|=1,typeof l=="object"&&l!==null&&typeof l.render=="function"&&l.$$typeof===void 0?(t.tag=1,t.memoizedState=null,t.updateQueue=null,Ve(r)?(o=!0,qr(t)):o=!1,t.memoizedState=l.state!==null&&l.state!==void 0?l.state:null,Vo(t),l.updater=pl,t.stateNode=l,l._reactInternals=t,ei(t,r,e,n),t=li(null,t,r,!0,o,n)):(t.tag=0,ce&&o&&Po(t),Me(null,t,l,n),t=t.child),t;case 16:r=t.elementType;e:{switch(hl(e,t),e=t.pendingProps,l=r._init,r=l(r._payload),t.type=r,l=t.tag=Nf(r),e=st(r,e),l){case 0:t=ri(null,t,r,e,n);break e;case 1:t=Zs(null,t,r,e,n);break e;case 11:t=Gs(null,t,r,e,n);break e;case 14:t=Ks(null,t,r,st(r.type,e),n);break e}throw Error(i(306,r,""))}return t;case 0:return r=t.type,l=t.pendingProps,l=t.elementType===r?l:st(r,l),ri(e,t,r,l,n);case 1:return r=t.type,l=t.pendingProps,l=t.elementType===r?l:st(r,l),Zs(e,t,r,l,n);case 3:e:{if(Js(t),e===null)throw Error(i(387));r=t.pendingProps,o=t.memoizedState,l=o.element,ms(e,t),il(t,r,null,n);var u=t.memoizedState;if(r=u.element,o.isDehydrated)if(o={element:r,isDehydrated:!1,cache:u.cache,pendingSuspenseBoundaries:u.pendingSuspenseBoundaries,transitions:u.transitions},t.updateQueue.baseState=o,t.memoizedState=o,t.flags&256){l=Nn(Error(i(423)),t),t=ea(e,t,r,n,l);break e}else if(r!==l){l=Nn(Error(i(424)),t),t=ea(e,t,r,n,l);break e}else for(Xe=Mt(t.stateNode.containerInfo.firstChild),Ke=t,ce=!0,ut=null,n=ds(t,null,r,n),t.child=n;n;)n.flags=n.flags&-3|4096,n=n.sibling;else{if(Rn(),r===l){t=Tt(e,t,n);break e}Me(e,t,r,n)}t=t.child}return t;case 5:return gs(t),e===null&&Do(t),r=t.type,l=t.pendingProps,o=e!==null?e.memoizedProps:null,u=l.children,ko(r,l)?u=null:o!==null&&ko(r,o)&&(t.flags|=32),qs(e,t),Me(e,t,u,n),t.child;case 6:return e===null&&Do(t),null;case 13:return ta(e,t,n);case 4:return Uo(t,t.stateNode.containerInfo),r=t.pendingProps,e===null?t.child=Fn(t,null,r,n):Me(e,t,r,n),t.child;case 11:return r=t.type,l=t.pendingProps,l=t.elementType===r?l:st(r,l),Gs(e,t,r,l,n);case 7:return Me(e,t,t.pendingProps,n),t.child;case 8:return Me(e,t,t.pendingProps.children,n),t.child;case 12:return Me(e,t,t.pendingProps.children,n),t.child;case 10:e:{if(r=t.type._context,l=t.pendingProps,o=t.memoizedProps,u=l.value,oe(rl,r._currentValue),r._currentValue=u,o!==null)if(it(o.value,u)){if(o.children===l.children&&!Be.current){t=Tt(e,t,n);break e}}else for(o=t.child,o!==null&&(o.return=t);o!==null;){var c=o.dependencies;if(c!==null){u=o.child;for(var d=c.firstContext;d!==null;){if(d.context===r){if(o.tag===1){d=Et(-1,n&-n),d.tag=2;var x=o.updateQueue;if(x!==null){x=x.shared;var E=x.pending;E===null?d.next=d:(d.next=E.next,E.next=d),x.pending=d}}o.lanes|=n,d=o.alternate,d!==null&&(d.lanes|=n),jo(o.return,n,t),c.lanes|=n;break}d=d.next}}else if(o.tag===10)u=o.type===t.type?null:o.child;else if(o.tag===18){if(u=o.return,u===null)throw Error(i(341));u.lanes|=n,c=u.alternate,c!==null&&(c.lanes|=n),jo(u,n,t),u=o.sibling}else u=o.child;if(u!==null)u.return=o;else for(u=o;u!==null;){if(u===t){u=null;break}if(o=u.sibling,o!==null){o.return=u.return,u=o;break}u=u.return}o=u}Me(e,t,l.children,n),t=t.child}return t;case 9:return l=t.type,r=t.pendingProps.children,Pn(t,n),l=et(l),r=r(l),t.flags|=1,Me(e,t,r,n),t.child;case 14:return r=t.type,l=st(r,t.pendingProps),l=st(r.type,l),Ks(e,t,r,l,n);case 15:return Xs(e,t,t.type,t.pendingProps,n);case 17:return r=t.type,l=t.pendingProps,l=t.elementType===r?l:st(r,l),hl(e,t),t.tag=1,Ve(r)?(e=!0,qr(t)):e=!1,Pn(t,n),Vs(t,r,l),ei(t,r,l,n),li(null,t,r,!0,e,n);case 19:return ra(e,t,n);case 22:return Ys(e,t,n)}throw Error(i(156,t.tag))};function Ra(e,t){return iu(e,t)}function Af(e,t,n,r){this.tag=e,this.key=n,this.sibling=this.child=this.return=this.stateNode=this.type=this.elementType=null,this.index=0,this.ref=null,this.pendingProps=t,this.dependencies=this.memoizedState=this.updateQueue=this.memoizedProps=null,this.mode=r,this.subtreeFlags=this.flags=0,this.deletions=null,this.childLanes=this.lanes=0,this.alternate=null}function rt(e,t,n,r){return new Af(e,t,n,r)}function ki(e){return e=e.prototype,!(!e||!e.isReactComponent)}function Nf(e){if(typeof e=="function")return ki(e)?1:0;if(e!=null){if(e=e.$$typeof,e===dt)return 11;if(e===pt)return 14}return 2}function Qt(e,t){var n=e.alternate;return n===null?(n=rt(e.tag,t,e.key,e.mode),n.elementType=e.elementType,n.type=e.type,n.stateNode=e.stateNode,n.alternate=e,e.alternate=n):(n.pendingProps=t,n.type=e.type,n.flags=0,n.subtreeFlags=0,n.deletions=null),n.flags=e.flags&14680064,n.childLanes=e.childLanes,n.lanes=e.lanes,n.child=e.child,n.memoizedProps=e.memoizedProps,n.memoizedState=e.memoizedState,n.updateQueue=e.updateQueue,t=e.dependencies,n.dependencies=t===null?null:{lanes:t.lanes,firstContext:t.firstContext},n.sibling=e.sibling,n.index=e.index,n.ref=e.ref,n}function Tl(e,t,n,r,l,o){var u=2;if(r=e,typeof e=="function")ki(e)&&(u=1);else if(typeof e=="string")u=5;else e:switch(e){case ke:return cn(n.children,l,o,t);case qe:u=8,l|=8;break;case Ft:return e=rt(12,n,t,l|2),e.elementType=Ft,e.lanes=o,e;case $e:return e=rt(13,n,t,l),e.elementType=$e,e.lanes=o,e;case lt:return e=rt(19,n,t,l),e.elementType=lt,e.lanes=o,e;case me:return Rl(n,l,o,t);default:if(typeof e=="object"&&e!==null)switch(e.$$typeof){case _t:u=10;break e;case Yt:u=9;break e;case dt:u=11;break e;case pt:u=14;break e;case je:u=16,r=null;break e}throw Error(i(130,e==null?e:typeof e,""))}return t=rt(u,n,t,l),t.elementType=e,t.type=r,t.lanes=o,t}function cn(e,t,n,r){return e=rt(7,e,r,t),e.lanes=n,e}function Rl(e,t,n,r){return e=rt(22,e,r,t),e.elementType=me,e.lanes=n,e.stateNode={isHidden:!1},e}function Ei(e,t,n){return e=rt(6,e,null,t),e.lanes=n,e}function Ti(e,t,n){return t=rt(4,e.children!==null?e.children:[],e.key,t),t.lanes=n,t.stateNode={containerInfo:e.containerInfo,pendingChildren:null,implementation:e.implementation},t}function Df(e,t,n,r,l){this.tag=t,this.containerInfo=e,this.finishedWork=this.pingCache=this.current=this.pendingChildren=null,this.timeoutHandle=-1,this.callbackNode=this.pendingContext=this.context=null,this.callbackPriority=0,this.eventTimes=Zl(0),this.expirationTimes=Zl(-1),this.entangledLanes=this.finishedLanes=this.mutableReadLanes=this.expiredLanes=this.pingedLanes=this.suspendedLanes=this.pendingLanes=0,this.entanglements=Zl(0),this.identifierPrefix=r,this.onRecoverableError=l,this.mutableSourceEagerHydrationData=null}function Ri(e,t,n,r,l,o,u,c,d){return e=new Df(e,t,n,c,d),t===1?(t=1,o===!0&&(t|=8)):t=0,o=rt(3,null,null,t),e.current=o,o.stateNode=e,o.memoizedState={element:r,isDehydrated:n,cache:null,transitions:null,pendingSuspenseBoundaries:null},Vo(o),e}function zf(e,t,n){var r=3<arguments.length&&arguments[3]!==void 0?arguments[3]:null;return{$$typeof:ve,key:r==null?null:""+r,children:e,containerInfo:t,implementation:n}}function Fa(e){if(!e)return Ot;e=e._reactInternals;e:{if(qt(e)!==e||e.tag!==1)throw Error(i(170));var t=e;do{switch(t.tag){case 3:t=t.stateNode.context;break e;case 1:if(Ve(t.type)){t=t.stateNode.__reactInternalMemoizedMergedChildContext;break e}}t=t.return}while(t!==null);throw Error(i(171))}if(e.tag===1){var n=e.type;if(Ve(n))return ns(e,n,t)}return t}function Ia(e,t,n,r,l,o,u,c,d){return e=Ri(n,r,!0,e,l,o,u,c,d),e.context=Fa(null),n=e.current,r=Le(),l=Ht(n),o=Et(r,l),o.callback=t??null,Vt(n,o,l),e.current.lanes=l,Hn(e,l,r),We(e,r),e}function Fl(e,t,n,r){var l=t.current,o=Le(),u=Ht(l);return n=Fa(n),t.context===null?t.context=n:t.pendingContext=n,t=Et(o,u),t.payload={element:e},r=r===void 0?null:r,r!==null&&(t.callback=r),e=Vt(l,t,u),e!==null&&(ft(e,l,u,o),ol(e,l,u)),u}function Il(e){if(e=e.current,!e.child)return null;switch(e.child.tag){case 5:return e.child.stateNode;default:return e.child.stateNode}}function Pa(e,t){if(e=e.memoizedState,e!==null&&e.dehydrated!==null){var n=e.retryLane;e.retryLane=n!==0&&n<t?n:t}}function Fi(e,t){Pa(e,t),(e=e.alternate)&&Pa(e,t)}function Mf(){return null}var Aa=typeof reportError=="function"?reportError:function(e){console.error(e)};function Ii(e){this._internalRoot=e}Pl.prototype.render=Ii.prototype.render=function(e){var t=this._internalRoot;if(t===null)throw Error(i(409));Fl(e,t,null,null)},Pl.prototype.unmount=Ii.prototype.unmount=function(){var e=this._internalRoot;if(e!==null){this._internalRoot=null;var t=e.containerInfo;un(function(){Fl(null,e,null,null)}),t[xt]=null}};function Pl(e){this._internalRoot=e}Pl.prototype.unstable_scheduleHydration=function(e){if(e){var t=mu();e={blockedOn:null,target:e,priority:t};for(var n=0;n<Nt.length&&t!==0&&t<Nt[n].priority;n++);Nt.splice(n,0,e),n===0&&gu(e)}};function Pi(e){return!(!e||e.nodeType!==1&&e.nodeType!==9&&e.nodeType!==11)}function Al(e){return!(!e||e.nodeType!==1&&e.nodeType!==9&&e.nodeType!==11&&(e.nodeType!==8||e.nodeValue!==" react-mount-point-unstable "))}function Na(){}function Lf(e,t,n,r,l){if(l){if(typeof r=="function"){var o=r;r=function(){var x=Il(u);o.call(x)}}var u=Ia(t,r,e,0,null,!1,!1,"",Na);return e._reactRootContainer=u,e[xt]=u.current,lr(e.nodeType===8?e.parentNode:e),un(),u}for(;l=e.lastChild;)e.removeChild(l);if(typeof r=="function"){var c=r;r=function(){var x=Il(d);c.call(x)}}var d=Ri(e,0,!1,null,null,!1,!1,"",Na);return e._reactRootContainer=d,e[xt]=d.current,lr(e.nodeType===8?e.parentNode:e),un(function(){Fl(t,d,n,r)}),d}function Nl(e,t,n,r,l){var o=n._reactRootContainer;if(o){var u=o;if(typeof l=="function"){var c=l;l=function(){var d=Il(u);c.call(d)}}Fl(t,u,e,l)}else u=Lf(n,t,e,l,r);return Il(u)}du=function(e){switch(e.tag){case 3:var t=e.stateNode;if(t.current.memoizedState.isDehydrated){var n=Wn(t.pendingLanes);n!==0&&(Jl(t,n|1),We(t,ge()),(q&6)===0&&(Mn=ge()+500,jt()))}break;case 13:un(function(){var r=kt(e,1);if(r!==null){var l=Le();ft(r,e,1,l)}}),Fi(e,1)}},eo=function(e){if(e.tag===13){var t=kt(e,134217728);if(t!==null){var n=Le();ft(t,e,134217728,n)}Fi(e,134217728)}},pu=function(e){if(e.tag===13){var t=Ht(e),n=kt(e,t);if(n!==null){var r=Le();ft(n,e,t,r)}Fi(e,t)}},mu=function(){return ne},hu=function(e,t){var n=ne;try{return ne=e,t()}finally{ne=n}},Ql=function(e,t,n){switch(t){case"input":if(jl(e,n),t=n.name,n.type==="radio"&&t!=null){for(n=e;n.parentNode;)n=n.parentNode;for(n=n.querySelectorAll("input[name="+JSON.stringify(""+t)+'][type="radio"]'),t=0;t<n.length;t++){var r=n[t];if(r!==e&&r.form===e.form){var l=Xr(r);if(!l)throw Error(i(90));Bi(r),jl(r,l)}}}break;case"textarea":Hi(e,n);break;case"select":t=n.value,t!=null&&dn(e,!!n.multiple,t,!1)}},Ji=wi,eu=un;var Of={usingClientEntryPoint:!1,Events:[ur,Sn,Xr,qi,Zi,wi]},wr={findFiberByHostInstance:Zt,bundleType:0,version:"18.3.1",rendererPackageName:"react-dom"},jf={bundleType:wr.bundleType,version:wr.version,rendererPackageName:wr.rendererPackageName,rendererConfig:wr.rendererConfig,overrideHookState:null,overrideHookStateDeletePath:null,overrideHookStateRenamePath:null,overrideProps:null,overridePropsDeletePath:null,overridePropsRenamePath:null,setErrorHandler:null,setSuspenseHandler:null,scheduleUpdate:null,currentDispatcherRef:fe.ReactCurrentDispatcher,findHostInstanceByFiber:function(e){return e=lu(e),e===null?null:e.stateNode},findFiberByHostInstance:wr.findFiberByHostInstance||Mf,findHostInstancesForRefresh:null,scheduleRefresh:null,scheduleRoot:null,setRefreshHandler:null,getCurrentFiber:null,reconcilerVersion:"18.3.1-next-f1338f8080-20240426"};if(typeof __REACT_DEVTOOLS_GLOBAL_HOOK__<"u"){var Dl=__REACT_DEVTOOLS_GLOBAL_HOOK__;if(!Dl.isDisabled&&Dl.supportsFiber)try{Pr=Dl.inject(jf),mt=Dl}catch{}}return He.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED=Of,He.createPortal=function(e,t){var n=2<arguments.length&&arguments[2]!==void 0?arguments[2]:null;if(!Pi(t))throw Error(i(200));return zf(e,t,null,n)},He.createRoot=function(e,t){if(!Pi(e))throw Error(i(299));var n=!1,r="",l=Aa;return t!=null&&(t.unstable_strictMode===!0&&(n=!0),t.identifierPrefix!==void 0&&(r=t.identifierPrefix),t.onRecoverableError!==void 0&&(l=t.onRecoverableError)),t=Ri(e,1,!1,null,null,n,!1,r,l),e[xt]=t.current,lr(e.nodeType===8?e.parentNode:e),new Ii(t)},He.findDOMNode=function(e){if(e==null)return null;if(e.nodeType===1)return e;var t=e._reactInternals;if(t===void 0)throw typeof e.render=="function"?Error(i(188)):(e=Object.keys(e).join(","),Error(i(268,e)));return e=lu(t),e=e===null?null:e.stateNode,e},He.flushSync=function(e){return un(e)},He.hydrate=function(e,t,n){if(!Al(t))throw Error(i(200));return Nl(null,e,t,!0,n)},He.hydrateRoot=function(e,t,n){if(!Pi(e))throw Error(i(405));var r=n!=null&&n.hydratedSources||null,l=!1,o="",u=Aa;if(n!=null&&(n.unstable_strictMode===!0&&(l=!0),n.identifierPrefix!==void 0&&(o=n.identifierPrefix),n.onRecoverableError!==void 0&&(u=n.onRecoverableError)),t=Ia(t,null,e,1,n??null,l,!1,o,u),e[xt]=t.current,lr(e),r)for(e=0;e<r.length;e++)n=r[e],l=n._getVersion,l=l(n._source),t.mutableSourceEagerHydrationData==null?t.mutableSourceEagerHydrationData=[n,l]:t.mutableSourceEagerHydrationData.push(n,l);return new Pl(t)},He.render=function(e,t,n){if(!Al(t))throw Error(i(200));return Nl(null,e,t,!1,n)},He.unmountComponentAtNode=function(e){if(!Al(e))throw Error(i(40));return e._reactRootContainer?(un(function(){Nl(null,null,e,!1,function(){e._reactRootContainer=null,e[xt]=null})}),!0):!1},He.unstable_batchedUpdates=wi,He.unstable_renderSubtreeIntoContainer=function(e,t,n,r){if(!Al(n))throw Error(i(200));if(e==null||e._reactInternals===void 0)throw Error(i(38));return Nl(e,t,n,!1,r)},He.version="18.3.1-next-f1338f8080-20240426",He}var Va;function Kf(){if(Va)return Di.exports;Va=1;function g(){if(!(typeof __REACT_DEVTOOLS_GLOBAL_HOOK__>"u"||typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE!="function"))try{__REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE(g)}catch(s){console.error(s)}}return g(),Di.exports=Gf(),Di.exports}var Ua;function Xf(){if(Ua)return zl;Ua=1;var g=Kf();return zl.createRoot=g.createRoot,zl.hydrateRoot=g.hydrateRoot,zl}var Yf=Xf();class qf{constructor(s){P(this,"gl");P(this,"emptyVAO");P(this,"lost",!1);const i=s.getContext("webgl2",{alpha:!1,antialias:!1,preserveDrawingBuffer:!0,powerPreference:"high-performance"});if(!i)throw new Error("WebGL 2 is not supported in this browser");this.gl=i,i.getExtension("EXT_color_buffer_float"),i.getExtension("OES_texture_float_linear");const a=i.createVertexArray();if(!a)throw new Error("Failed to create VAO");this.emptyVAO=a,s.addEventListener("webglcontextlost",f=>{f.preventDefault(),this.lost=!0,console.warn("WebGL context lost")}),s.addEventListener("webglcontextrestored",()=>{this.lost=!1,console.info("WebGL context restored")})}get isLost(){return this.lost}bindFullscreenQuad(){this.gl.bindVertexArray(this.emptyVAO)}drawFullscreenQuad(){this.gl.bindVertexArray(this.emptyVAO),this.gl.drawArrays(this.gl.TRIANGLES,0,6)}dispose(){this.gl.deleteVertexArray(this.emptyVAO)}}class Zf{constructor(){P(this,"startTime",0);P(this,"lastTime",0);P(this,"time",0);P(this,"deltaTime",0);P(this,"frameCount",0)}start(){this.startTime=performance.now()/1e3,this.lastTime=this.startTime,this.time=0,this.deltaTime=0,this.frameCount=0}tick(){const s=performance.now()/1e3;this.deltaTime=s-this.lastTime,this.lastTime=s,this.time=s-this.startTime,this.frameCount++}}class Jf{constructor(s){P(this,"pool",new Map);P(this,"gl");this.gl=s}acquire(s,i){const a=`${s}x${i}`,f=this.pool.get(a);if(f){const p=f.find(N=>!N.inUse);if(p)return p.inUse=!0,{fbo:p.fbo,texture:p.texture,width:s,height:i}}const{gl:y}=this,w=y.createFramebuffer(),S=y.createTexture();y.bindTexture(y.TEXTURE_2D,S),y.texImage2D(y.TEXTURE_2D,0,y.RGBA16F,s,i,0,y.RGBA,y.FLOAT,null),y.texParameteri(y.TEXTURE_2D,y.TEXTURE_MIN_FILTER,y.LINEAR),y.texParameteri(y.TEXTURE_2D,y.TEXTURE_MAG_FILTER,y.LINEAR),y.texParameteri(y.TEXTURE_2D,y.TEXTURE_WRAP_S,y.CLAMP_TO_EDGE),y.texParameteri(y.TEXTURE_2D,y.TEXTURE_WRAP_T,y.CLAMP_TO_EDGE),y.bindFramebuffer(y.FRAMEBUFFER,w),y.framebufferTexture2D(y.FRAMEBUFFER,y.COLOR_ATTACHMENT0,y.TEXTURE_2D,S,0),y.bindFramebuffer(y.FRAMEBUFFER,null);const T={fbo:w,texture:S,inUse:!0};return this.pool.has(a)||this.pool.set(a,[]),this.pool.get(a).push(T),{fbo:w,texture:S,width:s,height:i}}release(s){const i=`${s.width}x${s.height}`,a=this.pool.get(i);if(!a)return;const f=a.find(y=>y.fbo===s.fbo);f&&(f.inUse=!1)}handleResize(){const{gl:s}=this;for(const i of this.pool.values())for(const a of i)s.deleteFramebuffer(a.fbo),s.deleteTexture(a.texture);this.pool.clear()}dispose(){this.handleResize()}}class ed{constructor(s){P(this,"canvas");P(this,"state",{mouse:{x:.5,y:.5,px:0,py:0,down:!1,button:0,dx:0,dy:0},keys:new Set,touches:[]});P(this,"prevMx",0);P(this,"prevMy",0);P(this,"bound",!1);P(this,"handlers",[]);P(this,"audioContext",null);P(this,"analyser",null);P(this,"fftData",null);P(this,"audioSource",null);P(this,"audioEnabled",!1);P(this,"midiAccess",null);P(this,"midiValues",new Map);P(this,"midiEnabled",!1);P(this,"handleMIDIMessage",s=>{const i=s.data;if(!i||i.length<3)return;if((i[0]&240)===176){const f=i[1],y=i[2]/127;this.midiValues.set(f,y)}});this.canvas=s}attach(){if(this.bound)return;this.bound=!0;const s=(i,a,f)=>{i.addEventListener(a,f),this.handlers.push([a,f,i])};s(this.canvas,"mousemove",i=>{const a=i,f=this.canvas.getBoundingClientRect();this.state.mouse.px=a.clientX-f.left,this.state.mouse.py=a.clientY-f.top,this.state.mouse.x=this.state.mouse.px/f.width,this.state.mouse.y=1-this.state.mouse.py/f.height}),s(this.canvas,"mousedown",i=>{const a=i;this.state.mouse.down=!0,this.state.mouse.button=a.button}),s(this.canvas,"mouseup",()=>{this.state.mouse.down=!1}),s(this.canvas,"mouseleave",()=>{this.state.mouse.down=!1}),s(window,"keydown",i=>{this.state.keys.add(i.code)}),s(window,"keyup",i=>{this.state.keys.delete(i.code)}),s(this.canvas,"touchstart",i=>{i.preventDefault(),this.updateTouches(i)}),s(this.canvas,"touchmove",i=>{i.preventDefault(),this.updateTouches(i)}),s(this.canvas,"touchend",i=>{this.updateTouches(i)}),s(this.canvas,"contextmenu",i=>i.preventDefault())}updateTouches(s){const i=this.canvas.getBoundingClientRect();if(this.state.touches=Array.from(s.touches).map(a=>({id:a.identifier,x:(a.clientX-i.left)/i.width,y:1-(a.clientY-i.top)/i.height})),s.touches.length>0){const a=s.touches[0];this.state.mouse.px=a.clientX-i.left,this.state.mouse.py=a.clientY-i.top,this.state.mouse.x=this.state.mouse.px/i.width,this.state.mouse.y=1-this.state.mouse.py/i.height,this.state.mouse.down=!0}else this.state.mouse.down=!1}async enableAudio(){if(!this.audioEnabled)try{this.audioContext=new AudioContext,this.analyser=this.audioContext.createAnalyser(),this.analyser.fftSize=256,this.analyser.smoothingTimeConstant=.8,this.fftData=new Float32Array(this.analyser.frequencyBinCount);const s=await navigator.mediaDevices.getUserMedia({audio:!0});this.audioSource=this.audioContext.createMediaStreamSource(s),this.audioSource.connect(this.analyser),this.audioEnabled=!0}catch(s){console.warn("Audio input not available:",s)}}disableAudio(){this.audioSource&&(this.audioSource.disconnect(),this.audioSource.mediaStream.getTracks().forEach(s=>s.stop()),this.audioSource=null),this.audioContext&&(this.audioContext.close(),this.audioContext=null),this.analyser=null,this.fftData=null,this.audioEnabled=!1,delete this.state.audioFFT}async enableMIDI(){if(!this.midiEnabled)try{this.midiAccess=await navigator.requestMIDIAccess(),this.midiAccess.inputs.forEach(s=>{s.onmidimessage=this.handleMIDIMessage}),this.midiAccess.onstatechange=()=>{var s;(s=this.midiAccess)==null||s.inputs.forEach(i=>{i.onmidimessage=this.handleMIDIMessage})},this.midiEnabled=!0,this.state.midiCC=this.midiValues}catch(s){console.warn("MIDI not available:",s)}}disableMIDI(){this.midiAccess&&this.midiAccess.inputs.forEach(s=>{s.onmidimessage=null}),this.midiAccess=null,this.midiValues.clear(),this.midiEnabled=!1,delete this.state.midiCC}poll(){return this.state.mouse.dx=this.state.mouse.x-this.prevMx,this.state.mouse.dy=this.state.mouse.y-this.prevMy,this.prevMx=this.state.mouse.x,this.prevMy=this.state.mouse.y,this.analyser&&this.fftData&&(this.analyser.getFloatFrequencyData(this.fftData),this.state.audioFFT=this.fftData),this.state}detach(){for(const[s,i,a]of this.handlers)a.removeEventListener(s,i);this.handlers=[],this.bound=!1,this.disableAudio(),this.disableMIDI()}}class td{constructor(){P(this,"values",new Map);P(this,"descriptors",new Map);P(this,"listeners",new Set);P(this,"version",0);P(this,"subscribe",s=>(this.listeners.add(s),()=>this.listeners.delete(s)));P(this,"getSnapshot",()=>this.version)}registerEffect(s,i){this.descriptors.set(s,i);const a=new Map;for(const f of i.parameters)a.set(f.id,f.default);this.values.set(s,a),this.notify()}unregisterEffect(s){this.values.delete(s),this.descriptors.delete(s),this.notify()}setValue(s,i,a){const f=this.values.get(s);f&&(f.set(i,a),this.notify())}getValues(s){const i=this.values.get(s);if(!i)return{};const a={};for(const[f,y]of i)a[f]=y;return a}getDescriptor(s){return this.descriptors.get(s)}getAllInstanceIds(){return Array.from(this.descriptors.keys())}setValues(s,i){const a=this.values.get(s);if(a){for(const[f,y]of Object.entries(i))a.set(f,y);this.notify()}}serialize(){const s={};for(const[i,a]of this.values)s[i]=this.getValues(i);return s}notify(){this.version++;for(const s of this.listeners)s()}}const nd=/#include\s+<(.+?)>/g;class fn{constructor(s,i,a,f){P(this,"program");P(this,"gl");P(this,"uniformCache",new Map);this.gl=s;const y=fn.preprocess(i,f),w=fn.preprocess(a,f),S=fn.compile(s,s.VERTEX_SHADER,y),T=fn.compile(s,s.FRAGMENT_SHADER,w),p=s.createProgram();if(!p)throw new Error("Failed to create program");if(s.attachShader(p,S),s.attachShader(p,T),s.linkProgram(p),s.deleteShader(S),s.deleteShader(T),!s.getProgramParameter(p,s.LINK_STATUS)){const N=s.getProgramInfoLog(p);throw s.deleteProgram(p),new Error(`Program link failed: ${N}`)}this.program=p}static preprocess(s,i){return i?s.replace(nd,(a,f)=>{const y=i.get(f);return y===void 0?(console.warn(`Shader include not found: ${f}`),""):y}):s}static compile(s,i,a){const f=s.createShader(i);if(!f)throw new Error("Failed to create shader");if(s.shaderSource(f,a),s.compileShader(f),!s.getShaderParameter(f,s.COMPILE_STATUS)){const y=s.getShaderInfoLog(f),w=i===s.VERTEX_SHADER?"vertex":"fragment";throw s.deleteShader(f),new Error(`${w} shader compile failed:
${y}

Source:
${a}`)}return f}use(){this.gl.useProgram(this.program)}loc(s){let i=this.uniformCache.get(s);return i===void 0&&(i=this.gl.getUniformLocation(this.program,s),this.uniformCache.set(s,i)),i}setFloat(s,i){const a=this.loc(s);a&&this.gl.uniform1f(a,i)}setInt(s,i){const a=this.loc(s);a&&this.gl.uniform1i(a,i)}setVec2(s,i,a){const f=this.loc(s);f&&this.gl.uniform2f(f,i,a)}setVec3(s,i,a,f){const y=this.loc(s);y&&this.gl.uniform3f(y,i,a,f)}setVec4(s,i,a,f,y){const w=this.loc(s);w&&this.gl.uniform4f(w,i,a,f,y)}setTexture(s,i,a){this.gl.activeTexture(this.gl.TEXTURE0+a),this.gl.bindTexture(this.gl.TEXTURE_2D,i);const f=this.loc(s);f&&this.gl.uniform1i(f,a)}dispose(){this.gl.deleteProgram(this.program)}}const rd=`// Simplex 2D noise - adapted from Ashima Arts
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
`,ld=`vec3 hsv2rgb(vec3 c) {
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
`,od=new Map([["noise.glsl",rd],["color-utils.glsl",ld]]);class Kt{constructor(){P(this,"shader",null);P(this,"outputTexture",null);P(this,"gl",null);P(this,"w",0);P(this,"h",0)}resize(s,i){this.w=s,this.h=i}dispose(){var s;(s=this.shader)==null||s.dispose(),this.shader=null}getOutputTexture(s){return this.outputTexture}createShader(s,i,a){return new fn(s,i,a,od)}}const Xt=`#version 300 es

const vec2 positions[6] = vec2[](
    vec2(-1, -1), vec2(1, -1), vec2(-1, 1),
    vec2(-1, 1), vec2(1, -1), vec2(1, 1)
);

void main() {
    gl_Position = vec4(positions[gl_VertexID], 0.0, 1.0);
}
`,id=`#version 300 es
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
`,ud={id:"noise-flow-field",name:"Noise Flow Field",description:"Simplex noise driven flow field with configurable turbulence",parameters:[{id:"speed",type:"float",label:"Flow Speed",min:0,max:5,step:.01,default:.8,group:"Motion"},{id:"scale",type:"float",label:"Noise Scale",min:.1,max:20,step:.1,default:4,group:"Shape"},{id:"octaves",type:"int",label:"Octaves",min:1,max:8,default:4,group:"Shape"},{id:"lacunarity",type:"float",label:"Lacunarity",min:1,max:4,step:.01,default:2,group:"Shape"},{id:"gain",type:"float",label:"Gain",min:.1,max:1,step:.01,default:.5,group:"Shape"},{id:"distortion",type:"float",label:"Distortion",min:0,max:5,step:.01,default:1.5,group:"Shape"},{id:"brightness",type:"float",label:"Brightness",min:.1,max:3,step:.01,default:1.2,group:"Color"},{id:"color1",type:"color",label:"Color A",default:[.05,.1,.35,1],group:"Color"},{id:"color2",type:"color",label:"Color B",default:[.95,.4,.1,1],group:"Color"},{id:"mouseInfluence",type:"float",label:"Mouse Influence",min:0,max:2,step:.01,default:.5,group:"Interaction"}],inputs:[{id:"input0",label:"Background",type:"texture"}],outputs:[{id:"output0",label:"Result",type:"texture"}]};class sd extends Kt{constructor(){super(...arguments);P(this,"descriptor",ud)}init(i){this.gl=i,this.shader=this.createShader(i,Xt,id)}render(i,a,f){const{gl:y,time:w,resolution:S,input:T}=i,p=this.shader;p.use(),p.setFloat("u_time",w),p.setVec2("u_resolution",S[0],S[1]),p.setVec2("u_mouse",T.mouse.x,T.mouse.y),p.setFloat("u_speed",a.speed),p.setFloat("u_scale",a.scale),p.setInt("u_octaves",a.octaves),p.setFloat("u_lacunarity",a.lacunarity),p.setFloat("u_gain",a.gain),p.setFloat("u_distortion",a.distortion),p.setFloat("u_brightness",a.brightness),p.setFloat("u_mouseInfluence",a.mouseInfluence);const N=a.color1;p.setVec4("u_color1",N[0],N[1],N[2],N[3]);const A=a.color2;p.setVec4("u_color2",A[0],A[1],A[2],A[3]);const $=f.get("input0");$?(p.setTexture("u_inputTexture",$,0),p.setInt("u_hasInput",1)):p.setInt("u_hasInput",0),y.drawArrays(y.TRIANGLES,0,6)}}const ad=`#version 300 es
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
`,cd={id:"fractal-explorer",name:"Fractal Explorer",description:"Interactive Mandelbrot and Julia set explorer",parameters:[{id:"zoom",type:"float",label:"Zoom",min:.1,max:1e3,step:.1,default:1,group:"View"},{id:"centerX",type:"float",label:"Center X",min:-3,max:3,step:.001,default:-.5,group:"View"},{id:"centerY",type:"float",label:"Center Y",min:-3,max:3,step:.001,default:0,group:"View"},{id:"maxIterations",type:"int",label:"Max Iterations",min:10,max:1e3,default:200,group:"Quality"},{id:"escapeRadius",type:"float",label:"Escape Radius",min:2,max:100,step:.1,default:4,group:"Quality"},{id:"power",type:"float",label:"Power",min:2,max:8,step:.1,default:2,group:"Shape"},{id:"juliaMode",type:"bool",label:"Julia Mode",default:!1,group:"Shape"},{id:"juliaCx",type:"float",label:"Julia C.x",min:-2,max:2,step:.001,default:-.7,group:"Shape"},{id:"juliaCy",type:"float",label:"Julia C.y",min:-2,max:2,step:.001,default:.27015,group:"Shape"},{id:"colorSpeed",type:"float",label:"Color Speed",min:.1,max:20,step:.1,default:3,group:"Color"},{id:"colorOffset",type:"float",label:"Color Offset",min:0,max:1,step:.01,default:0,group:"Color"},{id:"innerColor",type:"color",label:"Inner Color",default:[0,0,0,1],group:"Color"},{id:"mouseInfluence",type:"float",label:"Mouse Influence",min:0,max:2,step:.01,default:.3,group:"Interaction"}],inputs:[{id:"input0",label:"Background",type:"texture"}],outputs:[{id:"output0",label:"Result",type:"texture"}]};class fd extends Kt{constructor(){super(...arguments);P(this,"descriptor",cd)}init(i){this.gl=i,this.shader=this.createShader(i,Xt,ad)}render(i,a,f){const{gl:y,time:w,resolution:S,input:T}=i,p=this.shader;p.use(),p.setFloat("u_time",w),p.setVec2("u_resolution",S[0],S[1]),p.setVec2("u_mouse",T.mouse.x,T.mouse.y),p.setFloat("u_zoom",a.zoom),p.setVec2("u_center",a.centerX,a.centerY),p.setInt("u_maxIterations",a.maxIterations),p.setFloat("u_escapeRadius",a.escapeRadius),p.setFloat("u_power",a.power),p.setInt("u_juliaMode",a.juliaMode?1:0),p.setVec2("u_juliaC",a.juliaCx,a.juliaCy),p.setFloat("u_colorSpeed",a.colorSpeed),p.setFloat("u_colorOffset",a.colorOffset),p.setFloat("u_mouseInfluence",a.mouseInfluence);const N=a.innerColor;p.setVec4("u_innerColor",N[0],N[1],N[2],N[3]);const A=f.get("input0");A?(p.setTexture("u_inputTexture",A,0),p.setInt("u_hasInput",1)):p.setInt("u_hasInput",0),y.drawArrays(y.TRIANGLES,0,6)}}const dd=`#version 300 es

layout(location = 0) in vec2 a_position;
layout(location = 1) in vec2 a_velocity;
layout(location = 2) in float a_life;
layout(location = 3) in float a_size;

out vec2 v_position;
out vec2 v_velocity;
out float v_life;
out float v_size;

uniform float u_deltaTime;
uniform vec2 u_mouse;
uniform float u_mouseAttract;
uniform float u_speed;
uniform float u_turbulence;
uniform float u_time;
uniform float u_damping;
uniform float u_lifeDecay;

// Simple hash for pseudo-random
float hash(float n) {
    return fract(sin(n) * 43758.5453123);
}

void main() {
    vec2 pos = a_position;
    vec2 vel = a_velocity;
    float life = a_life;
    float size = a_size;

    float dt = u_deltaTime * u_speed;

    // Mouse attraction/repulsion
    vec2 toMouse = u_mouse - pos;
    float dist = length(toMouse);
    if (dist > 0.001) {
        vel += normalize(toMouse) * u_mouseAttract * dt / (dist * 5.0 + 0.1);
    }

    // Turbulence (simple pseudo-noise based on position and time)
    float angle = hash(dot(pos, vec2(12.9898, 78.233)) + u_time) * 6.28318;
    vel += vec2(cos(angle), sin(angle)) * u_turbulence * dt;

    // Damping
    vel *= (1.0 - u_damping * dt);

    // Integrate
    pos += vel * dt;

    // Life decay
    life -= u_lifeDecay * dt;

    // Respawn dead particles at mouse position
    if (life <= 0.0) {
        pos = u_mouse + vec2(
            hash(float(gl_VertexID) + u_time * 1.1) - 0.5,
            hash(float(gl_VertexID) + u_time * 2.3) - 0.5
        ) * 0.05;
        vel = vec2(
            hash(float(gl_VertexID) + u_time * 3.7) - 0.5,
            hash(float(gl_VertexID) + u_time * 5.1) - 0.5
        ) * 0.3;
        life = 0.5 + hash(float(gl_VertexID) + u_time * 7.9) * 0.5;
        size = 1.0 + hash(float(gl_VertexID) + u_time * 9.3) * 3.0;
    }

    // Wrap around
    pos = fract(pos + 1.0);

    v_position = pos;
    v_velocity = vel;
    v_life = life;
    v_size = size;
}
`,pd=`#version 300 es

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
`,md=`#version 300 es
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
`,hd=`#version 300 es
precision highp float;
out vec4 fragColor;
void main() { fragColor = vec4(0.0); }
`,vd=typeof navigator<"u"&&/Mobi|Android/i.test(navigator.userAgent),Ml=vd?15e3:5e4,Li=6,gd={id:"particle-system",name:"Particle System",description:"GPU-driven particle system with mouse interaction",parameters:[{id:"speed",type:"float",label:"Speed",min:.1,max:5,step:.01,default:1,group:"Motion"},{id:"mouseAttract",type:"float",label:"Mouse Attract",min:-2,max:2,step:.01,default:.5,group:"Interaction"},{id:"turbulence",type:"float",label:"Turbulence",min:0,max:3,step:.01,default:.5,group:"Motion"},{id:"damping",type:"float",label:"Damping",min:0,max:5,step:.01,default:1,group:"Motion"},{id:"lifeDecay",type:"float",label:"Life Decay",min:.05,max:3,step:.01,default:.4,group:"Lifecycle"},{id:"pointScale",type:"float",label:"Point Scale",min:.5,max:10,step:.1,default:3,group:"Appearance"},{id:"colorBirth",type:"color",label:"Birth Color",default:[1,.8,.3,1],group:"Color"},{id:"colorDeath",type:"color",label:"Death Color",default:[.2,.05,.5,0],group:"Color"}],inputs:[{id:"input0",label:"Background",type:"texture"}],outputs:[{id:"output0",label:"Result",type:"texture"}]};class yd{constructor(){P(this,"descriptor",gd);P(this,"gl",null);P(this,"updateProgram",null);P(this,"renderProgram",null);P(this,"vboA",null);P(this,"vboB",null);P(this,"vaoUpdate",null);P(this,"vaoRender",null);P(this,"transformFeedback",null);P(this,"pingPong",0);P(this,"outputTexture",null)}init(s){this.gl=s;const i=s.createProgram(),a=this.compileShader(s,s.VERTEX_SHADER,dd),f=this.compileShader(s,s.FRAGMENT_SHADER,hd);if(s.attachShader(i,a),s.attachShader(i,f),s.transformFeedbackVaryings(i,["v_position","v_velocity","v_life","v_size"],s.INTERLEAVED_ATTRIBS),s.linkProgram(i),s.deleteShader(a),s.deleteShader(f),!s.getProgramParameter(i,s.LINK_STATUS))throw new Error(`TF program link failed: ${s.getProgramInfoLog(i)}`);this.updateProgram=new _d(s,i),this.renderProgram=new fn(s,pd,md);const y=new Float32Array(Ml*Li);for(let w=0;w<Ml;w++){const S=w*Li;y[S]=Math.random(),y[S+1]=Math.random(),y[S+2]=(Math.random()-.5)*.2,y[S+3]=(Math.random()-.5)*.2,y[S+4]=Math.random(),y[S+5]=1+Math.random()*3}this.vboA=s.createBuffer(),s.bindBuffer(s.ARRAY_BUFFER,this.vboA),s.bufferData(s.ARRAY_BUFFER,y,s.DYNAMIC_COPY),this.vboB=s.createBuffer(),s.bindBuffer(s.ARRAY_BUFFER,this.vboB),s.bufferData(s.ARRAY_BUFFER,y.byteLength,s.DYNAMIC_COPY),this.vaoUpdate=s.createVertexArray(),this.vaoRender=s.createVertexArray(),this.transformFeedback=s.createTransformFeedback(),this.setupVAOs()}compileShader(s,i,a){const f=s.createShader(i);if(s.shaderSource(f,a),s.compileShader(f),!s.getShaderParameter(f,s.COMPILE_STATUS)){const y=s.getShaderInfoLog(f);throw s.deleteShader(f),new Error(`Shader compile failed: ${y}`)}return f}setupVAOs(){const s=this.gl,i=Li*4,a=this.pingPong===0?this.vboA:this.vboB,f=this.pingPong===0?this.vboB:this.vboA;s.bindVertexArray(this.vaoUpdate),s.bindBuffer(s.ARRAY_BUFFER,a),s.enableVertexAttribArray(0),s.vertexAttribPointer(0,2,s.FLOAT,!1,i,0),s.enableVertexAttribArray(1),s.vertexAttribPointer(1,2,s.FLOAT,!1,i,8),s.enableVertexAttribArray(2),s.vertexAttribPointer(2,1,s.FLOAT,!1,i,16),s.enableVertexAttribArray(3),s.vertexAttribPointer(3,1,s.FLOAT,!1,i,20),s.bindVertexArray(this.vaoRender),s.bindBuffer(s.ARRAY_BUFFER,f),s.enableVertexAttribArray(0),s.vertexAttribPointer(0,2,s.FLOAT,!1,i,0),s.enableVertexAttribArray(1),s.vertexAttribPointer(1,1,s.FLOAT,!1,i,16),s.enableVertexAttribArray(2),s.vertexAttribPointer(2,1,s.FLOAT,!1,i,20),s.bindVertexArray(null)}render(s,i,a){const f=this.gl;this.setupVAOs();const y=this.pingPong===0?this.vboB:this.vboA,w=this.updateProgram;w.use(),w.setFloat("u_deltaTime",s.deltaTime),w.setVec2("u_mouse",s.input.mouse.x,s.input.mouse.y),w.setFloat("u_mouseAttract",i.mouseAttract),w.setFloat("u_speed",i.speed),w.setFloat("u_turbulence",i.turbulence),w.setFloat("u_time",s.time),w.setFloat("u_damping",i.damping),w.setFloat("u_lifeDecay",i.lifeDecay),f.bindVertexArray(this.vaoUpdate),f.bindTransformFeedback(f.TRANSFORM_FEEDBACK,this.transformFeedback),f.bindBufferBase(f.TRANSFORM_FEEDBACK_BUFFER,0,y),f.enable(f.RASTERIZER_DISCARD),f.beginTransformFeedback(f.POINTS),f.drawArrays(f.POINTS,0,Ml),f.endTransformFeedback(),f.disable(f.RASTERIZER_DISCARD),f.bindTransformFeedback(f.TRANSFORM_FEEDBACK,null),f.bindBufferBase(f.TRANSFORM_FEEDBACK_BUFFER,0,null),a.get("input0")||(f.clearColor(.02,.02,.04,1),f.clear(f.COLOR_BUFFER_BIT)),f.enable(f.BLEND),f.blendFunc(f.SRC_ALPHA,f.ONE);const T=this.renderProgram;T.use(),T.setVec2("u_resolution",s.resolution[0],s.resolution[1]),T.setFloat("u_pointScale",i.pointScale);const p=i.colorBirth;T.setVec4("u_colorBirth",p[0],p[1],p[2],p[3]);const N=i.colorDeath;T.setVec4("u_colorDeath",N[0],N[1],N[2],N[3]),f.bindVertexArray(this.vaoRender),f.drawArrays(f.POINTS,0,Ml),f.bindVertexArray(null),f.disable(f.BLEND),this.pingPong=1-this.pingPong}resize(s,i){}dispose(){var i,a;const s=this.gl;s&&((i=this.updateProgram)==null||i.dispose(),(a=this.renderProgram)==null||a.dispose(),this.vboA&&s.deleteBuffer(this.vboA),this.vboB&&s.deleteBuffer(this.vboB),this.vaoUpdate&&s.deleteVertexArray(this.vaoUpdate),this.vaoRender&&s.deleteVertexArray(this.vaoRender),this.transformFeedback&&s.deleteTransformFeedback(this.transformFeedback))}getOutputTexture(s){return this.outputTexture}}class _d{constructor(s,i){P(this,"program");P(this,"gl");P(this,"cache",new Map);this.gl=s,this.program=i}use(){this.gl.useProgram(this.program)}loc(s){let i=this.cache.get(s);return i===void 0&&(i=this.gl.getUniformLocation(this.program,s),this.cache.set(s,i)),i}setFloat(s,i){const a=this.loc(s);a&&this.gl.uniform1f(a,i)}setVec2(s,i,a){const f=this.loc(s);f&&this.gl.uniform2f(f,i,a)}dispose(){this.gl.deleteProgram(this.program)}}const xd=`#version 300 es
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
`,wd={id:"feedback-echo",name:"Feedback Echo",description:"Frame-buffer feedback with decay, zoom, rotation, and color shifting",parameters:[{id:"decay",type:"float",label:"Decay",min:.8,max:1,step:.001,default:.97,group:"Feedback"},{id:"zoom",type:"float",label:"Zoom",min:.95,max:1.05,step:.001,default:.995,group:"Transform"},{id:"rotation",type:"float",label:"Rotation",min:-.1,max:.1,step:1e-4,default:.003,group:"Transform"},{id:"blurAmount",type:"float",label:"Blur",min:0,max:5,step:.1,default:1,group:"Feedback"},{id:"colorShiftSpeed",type:"float",label:"Color Shift",min:0,max:5,step:.01,default:.5,group:"Color"},{id:"tintColor",type:"color",label:"Tint Color",default:[.3,.1,.8,1],group:"Color"},{id:"tintStrength",type:"float",label:"Tint Strength",min:0,max:.5,step:.01,default:.02,group:"Color"},{id:"mirror",type:"bool",label:"Mirror",default:!1,group:"Transform"}],inputs:[{id:"input0",label:"Input",type:"texture"}],outputs:[{id:"output0",label:"Result",type:"texture"}]};class Sd extends Kt{constructor(){super(...arguments);P(this,"descriptor",wd);P(this,"fboA",null);P(this,"fboB",null);P(this,"texA",null);P(this,"texB",null);P(this,"pingPong",0)}init(i){this.gl=i,this.shader=this.createShader(i,Xt,xd)}resize(i,a){super.resize(i,a),this.createFBOs()}createFBOs(){const i=this.gl;this.fboA&&i.deleteFramebuffer(this.fboA),this.fboB&&i.deleteFramebuffer(this.fboB),this.texA&&i.deleteTexture(this.texA),this.texB&&i.deleteTexture(this.texB);const a=()=>{const w=i.createTexture();i.bindTexture(i.TEXTURE_2D,w),i.texImage2D(i.TEXTURE_2D,0,i.RGBA16F,this.w,this.h,0,i.RGBA,i.FLOAT,null),i.texParameteri(i.TEXTURE_2D,i.TEXTURE_MIN_FILTER,i.LINEAR),i.texParameteri(i.TEXTURE_2D,i.TEXTURE_MAG_FILTER,i.LINEAR),i.texParameteri(i.TEXTURE_2D,i.TEXTURE_WRAP_S,i.CLAMP_TO_EDGE),i.texParameteri(i.TEXTURE_2D,i.TEXTURE_WRAP_T,i.CLAMP_TO_EDGE);const S=i.createFramebuffer();return i.bindFramebuffer(i.FRAMEBUFFER,S),i.framebufferTexture2D(i.FRAMEBUFFER,i.COLOR_ATTACHMENT0,i.TEXTURE_2D,w,0),i.bindFramebuffer(i.FRAMEBUFFER,null),{fbo:S,tex:w}},f=a(),y=a();this.fboA=f.fbo,this.texA=f.tex,this.fboB=y.fbo,this.texB=y.tex}render(i,a,f){const y=this.gl;if(!this.fboA||!this.fboB)return;const w=this.shader,S=this.pingPong===0?this.texA:this.texB,T=this.pingPong===0?this.fboB:this.fboA,p=this.pingPong===0?this.texB:this.texA;y.bindFramebuffer(y.FRAMEBUFFER,T),y.viewport(0,0,this.w,this.h),w.use(),w.setVec2("u_resolution",this.w,this.h),w.setFloat("u_time",i.time),w.setFloat("u_decay",a.decay),w.setFloat("u_zoom",a.zoom),w.setFloat("u_rotation",a.rotation),w.setFloat("u_blurAmount",a.blurAmount),w.setFloat("u_colorShiftSpeed",a.colorShiftSpeed),w.setFloat("u_tintStrength",a.tintStrength),w.setFloat("u_mirror",a.mirror?1:0);const N=a.tintColor;w.setVec4("u_tintColor",N[0],N[1],N[2],N[3]),w.setTexture("u_prevFrame",S,0);const A=f.get("input0");A?(w.setTexture("u_inputTexture",A,1),w.setInt("u_hasInput",1)):w.setInt("u_hasInput",0),y.drawArrays(y.TRIANGLES,0,6),this.outputTexture=p,this.pingPong=1-this.pingPong}dispose(){super.dispose();const i=this.gl;i&&(this.fboA&&i.deleteFramebuffer(this.fboA),this.fboB&&i.deleteFramebuffer(this.fboB),this.texA&&i.deleteTexture(this.texA),this.texB&&i.deleteTexture(this.texB))}}const Cd=`#version 300 es
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
`,kd={id:"kaleidoscope",name:"Kaleidoscope",description:"Symmetrical kaleidoscope with multiple pattern generators",parameters:[{id:"segments",type:"int",label:"Segments",min:2,max:24,default:8,group:"Shape"},{id:"rotation",type:"float",label:"Rotation",min:-2,max:2,step:.01,default:.3,group:"Shape"},{id:"zoom",type:"float",label:"Zoom",min:.2,max:5,step:.01,default:1.5,group:"Shape"},{id:"spiralAmount",type:"float",label:"Spiral",min:-5,max:5,step:.01,default:.5,group:"Shape"},{id:"patternType",type:"enum",label:"Pattern",options:[{value:"0",label:"Plasma"},{value:"1",label:"Electric Rings"},{value:"2",label:"Cellular"}],default:"0",group:"Pattern"},{id:"patternSpeed",type:"float",label:"Speed",min:0,max:3,step:.01,default:.8,group:"Pattern"},{id:"colorCycle",type:"float",label:"Color Cycle",min:0,max:5,step:.01,default:1,group:"Color"},{id:"brightness",type:"float",label:"Brightness",min:.2,max:2,step:.01,default:1,group:"Color"},{id:"mouseInfluence",type:"float",label:"Mouse Influence",min:0,max:2,step:.01,default:.5,group:"Interaction"}],inputs:[{id:"input0",label:"Background",type:"texture"}],outputs:[{id:"output0",label:"Result",type:"texture"}]};class Ed extends Kt{constructor(){super(...arguments);P(this,"descriptor",kd)}init(i){this.gl=i,this.shader=this.createShader(i,Xt,Cd)}render(i,a,f){const{gl:y,time:w,resolution:S,input:T}=i,p=this.shader;p.use(),p.setFloat("u_time",w),p.setVec2("u_resolution",S[0],S[1]),p.setVec2("u_mouse",T.mouse.x,T.mouse.y),p.setInt("u_segments",a.segments),p.setFloat("u_rotation",a.rotation),p.setFloat("u_zoom",a.zoom),p.setFloat("u_spiralAmount",a.spiralAmount),p.setInt("u_patternType",parseInt(a.patternType,10)),p.setFloat("u_patternSpeed",a.patternSpeed),p.setFloat("u_colorCycle",a.colorCycle),p.setFloat("u_brightness",a.brightness),p.setFloat("u_mouseInfluence",a.mouseInfluence);const N=f.get("input0");N?(p.setTexture("u_inputTexture",N,0),p.setInt("u_hasInput",1)):p.setInt("u_hasInput",0),y.drawArrays(y.TRIANGLES,0,6)}}const Td=`#version 300 es
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
`,Rd={id:"audio-waveform",name:"Audio Waveform",description:"Audio-reactive visualizer with waveforms, circular, and bar modes",parameters:[{id:"visualMode",type:"enum",label:"Mode",options:[{value:"0",label:"Waveforms"},{value:"1",label:"Circular"},{value:"2",label:"Frequency Bars"}],default:"0",group:"Visualization"},{id:"waveCount",type:"int",label:"Wave Count",min:1,max:8,default:4,group:"Shape"},{id:"waveAmplitude",type:"float",label:"Amplitude",min:0,max:.5,step:.01,default:.15,group:"Shape"},{id:"waveSpeed",type:"float",label:"Speed",min:0,max:5,step:.01,default:1,group:"Shape"},{id:"lineWidth",type:"float",label:"Line Width",min:.5,max:5,step:.1,default:2,group:"Shape"},{id:"glowIntensity",type:"float",label:"Glow",min:0,max:3,step:.01,default:1,group:"Appearance"},{id:"colorCycle",type:"float",label:"Color Cycle",min:0,max:5,step:.01,default:1,group:"Color"},{id:"mouseInfluence",type:"float",label:"Mouse Influence",min:0,max:2,step:.01,default:.3,group:"Interaction"}],inputs:[{id:"input0",label:"Background",type:"texture"}],outputs:[{id:"output0",label:"Result",type:"texture"}]};class Fd extends Kt{constructor(){super(...arguments);P(this,"descriptor",Rd)}init(i){this.gl=i,this.shader=this.createShader(i,Xt,Td)}render(i,a,f){const{gl:y,time:w,resolution:S,input:T}=i,p=this.shader;p.use();let N=0,A=0,$=0,re=0;if(T.audioFFT){const Y=T.audioFFT,Q=Y.length,_e=Math.floor(Q*.15),we=Math.floor(Q*.5);let Fe=0,fe=0,Oe=0;for(let ve=0;ve<Q;ve++){const ke=Math.max(0,(Y[ve]+100)/100);ve<_e?Fe+=ke:ve<we?fe+=ke:Oe+=ke}A=Fe/_e,$=fe/(we-_e),re=Oe/(Q-we),N=(A+$+re)/3}else A=.3+Math.sin(w*1.2)*.2+Math.sin(w*.5)*.15,$=.25+Math.sin(w*2.1)*.15+Math.sin(w*.8)*.1,re=.2+Math.sin(w*3.7)*.12+Math.sin(w*1.5)*.08,N=(A+$+re)/3;p.setFloat("u_time",w),p.setVec2("u_resolution",S[0],S[1]),p.setVec2("u_mouse",T.mouse.x,T.mouse.y),p.setFloat("u_audioLevel",N),p.setFloat("u_bassLevel",A),p.setFloat("u_midLevel",$),p.setFloat("u_trebleLevel",re),p.setFloat("u_lineWidth",a.lineWidth),p.setFloat("u_glowIntensity",a.glowIntensity),p.setFloat("u_waveAmplitude",a.waveAmplitude),p.setFloat("u_waveSpeed",a.waveSpeed),p.setInt("u_waveCount",a.waveCount),p.setFloat("u_colorCycle",a.colorCycle),p.setFloat("u_mouseInfluence",a.mouseInfluence),p.setInt("u_visualMode",parseInt(a.visualMode,10));const se=f.get("input0");se?(p.setTexture("u_inputTexture",se,0),p.setInt("u_hasInput",1)):p.setInt("u_hasInput",0),y.drawArrays(y.TRIANGLES,0,6)}}const Id=`#version 300 es
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
`,Pd={id:"voronoi-liquid",name:"Voronoi Liquid",description:"Organic flowing cellular patterns with domain warping",parameters:[{id:"cellScale",type:"float",label:"Cell Scale",min:1,max:12,step:.1,default:4,group:"Shape"},{id:"warpStrength",type:"float",label:"Warp",min:0,max:2,step:.01,default:.6,group:"Shape"},{id:"animSpeed",type:"float",label:"Speed",min:0,max:3,step:.01,default:.8,group:"Motion"},{id:"edgeWidth",type:"float",label:"Edge Width",min:.01,max:.5,step:.01,default:.12,group:"Shape"},{id:"innerDetail",type:"float",label:"Inner Detail",min:0,max:1,step:.01,default:.4,group:"Shape"},{id:"colorSpeed",type:"float",label:"Color Speed",min:0,max:3,step:.01,default:.5,group:"Color"},{id:"colorSaturation",type:"float",label:"Saturation",min:0,max:1,step:.01,default:.75,group:"Color"},{id:"brightness",type:"float",label:"Brightness",min:.2,max:2,step:.01,default:1,group:"Color"},{id:"mouseInfluence",type:"float",label:"Mouse Influence",min:0,max:3,step:.01,default:1,group:"Interaction"}],inputs:[{id:"input0",label:"Background",type:"texture"}],outputs:[{id:"output0",label:"Result",type:"texture"}]};class Ad extends Kt{constructor(){super(...arguments);P(this,"descriptor",Pd)}init(i){this.gl=i,this.shader=this.createShader(i,Xt,Id)}render(i,a,f){const{gl:y,time:w,resolution:S,input:T}=i,p=this.shader;p.use(),p.setFloat("u_time",w),p.setVec2("u_resolution",S[0],S[1]),p.setVec2("u_mouse",T.mouse.x,T.mouse.y),p.setFloat("u_cellScale",a.cellScale),p.setFloat("u_warpStrength",a.warpStrength),p.setFloat("u_animSpeed",a.animSpeed),p.setFloat("u_edgeWidth",a.edgeWidth),p.setFloat("u_innerDetail",a.innerDetail),p.setFloat("u_colorSpeed",a.colorSpeed),p.setFloat("u_colorSaturation",a.colorSaturation),p.setFloat("u_brightness",a.brightness),p.setFloat("u_mouseInfluence",a.mouseInfluence);const N=f.get("input0");N?(p.setTexture("u_inputTexture",N,0),p.setInt("u_hasInput",1)):p.setInt("u_hasInput",0),y.drawArrays(y.TRIANGLES,0,6)}}const Nd=`#version 300 es
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
`,Dd={id:"raymarched-metaballs",name:"Raymarched Metaballs",description:"3D soft bodies with smooth blending, lighting, and fresnel",parameters:[{id:"blobCount",type:"int",label:"Blob Count",min:2,max:8,default:5,group:"Shape"},{id:"smoothBlend",type:"float",label:"Smooth Blend",min:.1,max:3,step:.01,default:1,group:"Shape"},{id:"roughness",type:"float",label:"Roughness",min:0,max:1,step:.01,default:.2,group:"Surface"},{id:"specularPower",type:"float",label:"Specular",min:4,max:128,step:1,default:32,group:"Lighting"},{id:"fresnelStrength",type:"float",label:"Fresnel",min:0,max:2,step:.01,default:.6,group:"Lighting"},{id:"ambientOcclusion",type:"float",label:"AO Strength",min:0,max:2,step:.01,default:1,group:"Lighting"},{id:"envReflect",type:"float",label:"Env Reflect",min:0,max:1,step:.01,default:.3,group:"Lighting"},{id:"animSpeed",type:"float",label:"Speed",min:0,max:3,step:.01,default:.8,group:"Motion"},{id:"baseColor",type:"color",label:"Base Color",default:[.2,.5,.9,1],group:"Color"},{id:"specColor",type:"color",label:"Specular Color",default:[1,.95,.8,1],group:"Color"},{id:"mouseInfluence",type:"float",label:"Mouse Influence",min:0,max:2,step:.01,default:1,group:"Interaction"}],inputs:[{id:"input0",label:"Background",type:"texture"}],outputs:[{id:"output0",label:"Result",type:"texture"}]};class zd extends Kt{constructor(){super(...arguments);P(this,"descriptor",Dd)}init(i){this.gl=i,this.shader=this.createShader(i,Xt,Nd)}render(i,a,f){const{gl:y,time:w,resolution:S,input:T}=i,p=this.shader;p.use(),p.setFloat("u_time",w),p.setVec2("u_resolution",S[0],S[1]),p.setVec2("u_mouse",T.mouse.x,T.mouse.y),p.setInt("u_blobCount",a.blobCount),p.setFloat("u_smoothBlend",a.smoothBlend),p.setFloat("u_roughness",a.roughness),p.setFloat("u_specularPower",a.specularPower),p.setFloat("u_fresnelStrength",a.fresnelStrength),p.setFloat("u_ambientOcclusion",a.ambientOcclusion),p.setFloat("u_envReflect",a.envReflect),p.setFloat("u_animSpeed",a.animSpeed),p.setFloat("u_mouseInfluence",a.mouseInfluence);const N=a.baseColor;p.setVec4("u_baseColor",N[0],N[1],N[2],N[3]);const A=a.specColor;p.setVec4("u_specColor",A[0],A[1],A[2],A[3]);const $=f.get("input0");$?(p.setTexture("u_inputTexture",$,0),p.setInt("u_hasInput",1)):p.setInt("u_hasInput",0),y.drawArrays(y.TRIANGLES,0,6)}}const Md=`#version 300 es
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
`,Ld={id:"domain-warp-tunnel",name:"Domain Warp",description:"Hypnotic recursive domain warping with geometric patterns",parameters:[{id:"warpScale",type:"float",label:"Scale",min:.5,max:5,step:.01,default:1.5,group:"Warp"},{id:"warpStrength",type:"float",label:"Warp Strength",min:0,max:3,step:.01,default:1,group:"Warp"},{id:"warpLayers",type:"float",label:"Warp Layers",min:1,max:5,step:1,default:3,group:"Warp"},{id:"speed",type:"float",label:"Speed",min:0,max:3,step:.01,default:.6,group:"Motion"},{id:"patternMode",type:"enum",label:"Pattern",options:[{value:"0",label:"Lattice"},{value:"1",label:"Ribbons"},{value:"2",label:"Crystal"}],default:"0",group:"Pattern"},{id:"patternScale",type:"float",label:"Pattern Scale",min:1,max:15,step:.1,default:5,group:"Pattern"},{id:"contrast",type:"float",label:"Contrast",min:.2,max:3,step:.01,default:1.2,group:"Color"},{id:"colorShift",type:"float",label:"Color Shift",min:0,max:1,step:.01,default:0,group:"Color"},{id:"glowAmount",type:"float",label:"Glow",min:0,max:2,step:.01,default:.5,group:"Color"},{id:"brightness",type:"float",label:"Brightness",min:.2,max:2,step:.01,default:1,group:"Color"},{id:"mouseInfluence",type:"float",label:"Mouse Influence",min:0,max:3,step:.01,default:1,group:"Interaction"}],inputs:[{id:"input0",label:"Background",type:"texture"}],outputs:[{id:"output0",label:"Result",type:"texture"}]};class Od extends Kt{constructor(){super(...arguments);P(this,"descriptor",Ld)}init(i){this.gl=i,this.shader=this.createShader(i,Xt,Md)}render(i,a,f){const{gl:y,time:w,resolution:S,input:T}=i,p=this.shader;p.use(),p.setFloat("u_time",w),p.setVec2("u_resolution",S[0],S[1]),p.setVec2("u_mouse",T.mouse.x,T.mouse.y),p.setFloat("u_warpScale",a.warpScale),p.setFloat("u_warpStrength",a.warpStrength),p.setFloat("u_warpLayers",a.warpLayers),p.setFloat("u_speed",a.speed),p.setInt("u_patternMode",parseInt(a.patternMode,10)),p.setFloat("u_patternScale",a.patternScale),p.setFloat("u_contrast",a.contrast),p.setFloat("u_colorShift",a.colorShift),p.setFloat("u_glowAmount",a.glowAmount),p.setFloat("u_brightness",a.brightness),p.setFloat("u_mouseInfluence",a.mouseInfluence);const N=f.get("input0");N?(p.setTexture("u_inputTexture",N,0),p.setInt("u_hasInput",1)):p.setInt("u_hasInput",0),y.drawArrays(y.TRIANGLES,0,6)}}const ba=new Map([["noise-flow-field",()=>new sd],["fractal-explorer",()=>new fd],["particle-system",()=>new yd],["feedback-echo",()=>new Sd],["kaleidoscope",()=>new Ed],["audio-waveform",()=>new Fd],["voronoi-liquid",()=>new Ad],["raymarched-metaballs",()=>new zd],["domain-warp-tunnel",()=>new Od]]);function jd(){return Array.from(ba.keys())}class Bd{constructor(s){P(this,"glContext");P(this,"gl");P(this,"fbManager");P(this,"clock");P(this,"inputManager");P(this,"parameterStore");P(this,"canvas");P(this,"activeEffects",[]);P(this,"activeIds",[]);P(this,"rafId",null);P(this,"running",!1);P(this,"width",0);P(this,"height",0);P(this,"frame",()=>{if(!this.running||this.glContext.isLost){this.rafId=requestAnimationFrame(this.frame);return}this.clock.tick();const s=this.inputManager.poll(),i={gl:this.gl,time:this.clock.time,deltaTime:this.clock.deltaTime,frameCount:this.clock.frameCount,resolution:[this.width,this.height],input:s},{gl:a}=this;if(this.activeEffects.length===0)a.bindFramebuffer(a.FRAMEBUFFER,null),a.viewport(0,0,this.width,this.height),a.clearColor(.05,.05,.08,1),a.clear(a.COLOR_BUFFER_BIT);else{const f=[];let y=null;for(let w=0;w<this.activeEffects.length;w++){const S=this.activeEffects[w],T=w===this.activeEffects.length-1,p=this.parameterStore.getValues(S.descriptor.id),N=new Map;if(y&&N.set("input0",y),T)a.bindFramebuffer(a.FRAMEBUFFER,null),a.viewport(0,0,this.width,this.height);else{const A=this.fbManager.acquire(this.width,this.height);f.push(A),a.bindFramebuffer(a.FRAMEBUFFER,A.fbo),a.viewport(0,0,this.width,this.height),a.clear(a.COLOR_BUFFER_BIT)}S.render(i,p,N),T||(y=S.getOutputTexture()??f[f.length-1].texture)}for(const w of f)this.fbManager.release(w)}this.rafId=requestAnimationFrame(this.frame)});this.canvas=s,this.glContext=new qf(s),this.gl=this.glContext.gl,this.fbManager=new Jf(this.gl),this.clock=new Zf,this.inputManager=new ed(s),this.parameterStore=new td,this.handleResize()}setEffectChain(s){for(const i of this.activeEffects)this.parameterStore.unregisterEffect(i.descriptor.id),i.dispose();this.activeEffects=[],this.activeIds=[];for(const i of s){const a=ba.get(i);if(!a){console.warn(`Unknown effect: ${i}`);continue}const f=a();f.init(this.gl),f.resize(this.width,this.height),this.parameterStore.registerEffect(f.descriptor.id,f.descriptor),this.activeEffects.push(f),this.activeIds.push(i)}}getActiveEffectIds(){return this.activeIds}start(){this.running||(this.running=!0,this.inputManager.attach(),this.clock.start(),this.frame())}stop(){this.running=!1,this.rafId!==null&&(cancelAnimationFrame(this.rafId),this.rafId=null),this.inputManager.detach()}handleResize(){const s=window.devicePixelRatio||1,i=this.canvas.getBoundingClientRect();this.width=Math.floor(i.width*s),this.height=Math.floor(i.height*s),this.canvas.width=this.width,this.canvas.height=this.height,this.fbManager.handleResize();for(const a of this.activeEffects)a.resize(this.width,this.height)}dispose(){this.stop();for(const s of this.activeEffects)s.dispose();this.activeEffects=[],this.fbManager.dispose(),this.glContext.dispose()}}const Vd=H.memo(function({onPipelineReady:s}){const i=H.useRef(null),a=H.useRef(null);return H.useEffect(()=>{const f=i.current;if(!f)return;const y=new Bd(f);a.current=y,y.start(),s(y);let w;const S=new ResizeObserver(()=>{clearTimeout(w),w=setTimeout(()=>{y.handleResize()},100)});return S.observe(f),()=>{clearTimeout(w),S.disconnect(),y.dispose(),a.current=null}},[s]),F.jsx("canvas",{ref:i})});function Ud({def:g,value:s,onChange:i}){const[a,f]=H.useState(s),y=g.type==="int"?1:g.step??.01,w=H.useCallback(T=>{const p=g.type==="int"?parseInt(T.target.value,10):parseFloat(T.target.value);f(p),i(p)},[g.type,i]);Math.abs(a-s)>y*.5&&f(s);const S=g.type==="int"?a.toString():a.toFixed(y<.01?4:y<.1?2:1);return F.jsxs("div",{className:"param-row",children:[F.jsx("span",{className:"param-label",title:g.label,children:g.label}),F.jsxs("div",{className:"param-control",children:[F.jsx("input",{type:"range",min:g.min,max:g.max,step:y,value:a,onChange:w}),F.jsx("span",{className:"param-value",children:S})]})]})}function bd(g,s,i){const a=f=>Math.round(f*255).toString(16).padStart(2,"0");return`#${a(g)}${a(s)}${a(i)}`}function Wd(g,s){const i=parseInt(g.slice(1,3),16)/255,a=parseInt(g.slice(3,5),16)/255,f=parseInt(g.slice(5,7),16)/255;return[i,a,f,s]}function Hd({def:g,value:s,onChange:i}){const a=bd(s[0],s[1],s[2]),f=H.useCallback(y=>{i(Wd(y.target.value,s[3]))},[i,s]);return F.jsxs("div",{className:"param-row",children:[F.jsx("span",{className:"param-label",title:g.label,children:g.label}),F.jsxs("div",{className:"param-control",children:[F.jsx("input",{type:"color",value:a,onChange:f}),F.jsx("span",{className:"param-value",children:a})]})]})}function $d({def:g,value:s,onChange:i}){const a=H.useCallback(f=>{i(f.target.value)},[i]);return F.jsxs("div",{className:"param-row",children:[F.jsx("span",{className:"param-label",title:g.label,children:g.label}),F.jsx("div",{className:"param-control",children:F.jsx("select",{value:s,onChange:a,children:g.options.map(f=>F.jsx("option",{value:f.value,children:f.label},f.value))})})]})}function Qd({def:g,value:s,onChange:i}){const a=H.useCallback(f=>{i(f.target.checked)},[i]);return F.jsxs("div",{className:"param-row",children:[F.jsx("span",{className:"param-label",title:g.label,children:g.label}),F.jsx("div",{className:"param-control",children:F.jsxs("label",{className:"toggle-switch",children:[F.jsx("input",{type:"checkbox",checked:s,onChange:a}),F.jsx("span",{className:"toggle-track"})]})})]})}function Gd({def:g,value:s,onChange:i}){switch(g.type){case"float":case"int":return F.jsx(Ud,{def:g,value:s,onChange:i});case"color":return F.jsx(Hd,{def:g,value:s,onChange:i});case"enum":return F.jsx($d,{def:g,value:s,onChange:i});case"bool":return F.jsx(Qd,{def:g,value:s,onChange:i});case"vec2":return null;default:return null}}function Kd({parameterStore:g}){H.useSyncExternalStore(g.subscribe,g.getSnapshot);const s=g.getAllInstanceIds();return F.jsx("div",{className:"parameter-panel",children:s.map(i=>F.jsx(Xd,{instanceId:i,parameterStore:g},i))})}function Xd({instanceId:g,parameterStore:s}){const i=s.getDescriptor(g),a=s.getValues(g);if(!i)return null;const f=H.useCallback(()=>{for(const S of i.parameters)s.setValue(g,S.id,S.default)},[i,s,g]),y=H.useCallback(()=>{for(const S of i.parameters){let T=S.default;switch(S.type){case"float":{const p=S;T=Math.random()*(p.max-p.min)+p.min;break}case"int":{const p=S;T=Math.floor(Math.random()*(p.max-p.min+1))+p.min;break}case"bool":T=Math.random()>.5;break;case"color":T=[Math.random(),Math.random(),Math.random(),1];break;case"enum":{const p=S.options;T=p[Math.floor(Math.random()*p.length)].value;break}}s.setValue(g,S.id,T)}},[i,s,g]),w=new Map;for(const S of i.parameters){const T=S.group??"General";w.has(T)||w.set(T,[]),w.get(T).push(S)}return F.jsxs(F.Fragment,{children:[F.jsxs("div",{className:"param-actions",children:[F.jsx("button",{className:"btn param-action-btn",onClick:f,children:"Reset"}),F.jsx("button",{className:"btn param-action-btn",onClick:y,children:"Randomize"})]}),Array.from(w.entries()).map(([S,T])=>F.jsxs("div",{className:"param-group",children:[F.jsx("div",{className:"param-group-header",children:S}),T.map(p=>F.jsx(Yd,{instanceId:g,def:p,value:a[p.id]??p.default,parameterStore:s},p.id))]},`${g}-${S}`))]})}function Yd({instanceId:g,def:s,value:i,parameterStore:a}){const f=H.useCallback(y=>{a.setValue(g,s.id,y)},[a,g,s.id]);return F.jsx(Gd,{def:s,value:i,onChange:f})}const Oi={"noise-flow-field":"Noise Flow Field","fractal-explorer":"Fractal Explorer","particle-system":"Particle System","feedback-echo":"Feedback Echo",kaleidoscope:"Kaleidoscope","audio-waveform":"Audio Waveform","voronoi-liquid":"Voronoi Liquid","raymarched-metaballs":"Raymarched Metaballs","domain-warp-tunnel":"Domain Warp"};function qd({activeEffects:g,onChange:s}){const i=jd(),a=H.useCallback(w=>{s([w.target.value])},[s]),f=H.useCallback(w=>{const S=w.target.value;S&&!g.includes(S)&&s([...g,S]),w.target.value=""},[g,s]),y=H.useCallback(w=>{const S=g.filter(T=>T!==w);S.length>0&&s(S)},[g,s]);return F.jsxs("div",{className:"effect-selector",children:[F.jsx("label",{children:"Active Effect"}),F.jsx("select",{value:g[0]??"",onChange:a,children:i.map(w=>F.jsx("option",{value:w,children:Oi[w]??w},w))}),g.length>1&&F.jsxs("div",{style:{marginTop:8},children:[F.jsx("label",{style:{fontSize:11,color:"#888"},children:"Effect Chain"}),g.map((w,S)=>F.jsxs("div",{style:{display:"flex",alignItems:"center",gap:6,marginTop:4},children:[F.jsxs("span",{style:{fontSize:12,color:"#aaa",flex:1},children:[S+1,". ",Oi[w]??w]}),g.length>1&&F.jsx("button",{className:"btn btn-danger",onClick:()=>y(w),style:{padding:"2px 6px",fontSize:11},children:"x"})]},w))]}),F.jsx("div",{style:{marginTop:8},children:F.jsxs("select",{onChange:f,defaultValue:"",children:[F.jsx("option",{value:"",disabled:!0,children:"+ Add to chain..."}),i.filter(w=>!g.includes(w)).map(w=>F.jsx("option",{value:w,children:Oi[w]??w},w))]})})]})}const Ll="procedural-art-presets",Zd=1;class Cr{constructor(s){P(this,"parameterStore");this.parameterStore=s}save(s,i){const a={version:Zd,name:s,createdAt:new Date().toISOString(),pipeline:{chain:i,parameterOverrides:this.parameterStore.serialize()}},f=this.loadAll(),y=f.findIndex(w=>w.name===s);return y>=0?f[y]=a:f.push(a),localStorage.setItem(Ll,JSON.stringify(f)),a}loadAll(){try{const s=localStorage.getItem(Ll);return s?JSON.parse(s):[]}catch{return[]}}load(s){const a=this.loadAll().find(f=>f.name===s);return(a==null?void 0:a.pipeline)??null}delete(s){const i=this.loadAll().filter(a=>a.name!==s);localStorage.setItem(Ll,JSON.stringify(i))}rename(s,i){const a=this.loadAll(),f=a.find(y=>y.name===s);f&&(f.name=i,localStorage.setItem(Ll,JSON.stringify(a)))}}function Jd({pipeline:g,activeEffects:s,onLoadPreset:i}){const[a,f]=H.useState(""),[y,w]=H.useState(()=>new Cr(g.parameterStore).loadAll()),S=H.useCallback(()=>{const A=new Cr(g.parameterStore);w(A.loadAll())},[g.parameterStore]),T=H.useCallback(()=>{if(!a.trim())return;new Cr(g.parameterStore).save(a.trim(),s),f(""),S()},[a,g.parameterStore,s,S]),p=H.useCallback(A=>{const re=new Cr(g.parameterStore).load(A);re&&(i(re.chain),setTimeout(()=>{for(const[se,Y]of Object.entries(re.parameterOverrides))g.parameterStore.setValues(se,Y)},0))},[g,i]),N=H.useCallback(A=>{new Cr(g.parameterStore).delete(A),S()},[g.parameterStore,S]);return F.jsxs("div",{className:"preset-bar",children:[F.jsx("label",{children:"Presets"}),F.jsxs("div",{className:"preset-actions",children:[F.jsx("input",{type:"text",placeholder:"Preset name...",value:a,onChange:A=>f(A.target.value),onKeyDown:A=>A.key==="Enter"&&T()}),F.jsx("button",{className:"btn btn-primary",onClick:T,children:"Save"})]}),F.jsxs("div",{className:"preset-list",children:[y.map(A=>F.jsxs("div",{className:"preset-item",children:[F.jsx("span",{className:"preset-item-name",onClick:()=>p(A.name),children:A.name}),F.jsx("button",{className:"btn btn-danger",onClick:()=>N(A.name),style:{padding:"2px 6px",fontSize:11},children:"x"})]},A.name)),y.length===0&&F.jsx("div",{style:{fontSize:12,color:"#555",padding:8},children:"No presets saved yet"})]})]})}function ep({pipeline:g}){const[s,i]=H.useState(!1),[a,f]=H.useState(!1),[y,w]=H.useState(!1),S=H.useRef(null),T=H.useRef([]),p=H.useCallback(()=>{g.canvas.toBlob(Y=>{if(!Y)return;const Q=URL.createObjectURL(Y),_e=document.createElement("a");_e.href=Q,_e.download=`procedural-art-${Date.now()}.png`,_e.click(),URL.revokeObjectURL(Q)},"image/png")},[g]),N=H.useCallback(()=>{var _e;if(s){(_e=S.current)==null||_e.stop(),i(!1);return}const Y=g.canvas.captureStream(60),Q=new MediaRecorder(Y,{mimeType:MediaRecorder.isTypeSupported("video/webm;codecs=vp9")?"video/webm;codecs=vp9":"video/webm",videoBitsPerSecond:8e6});T.current=[],Q.ondataavailable=we=>{we.data.size>0&&T.current.push(we.data)},Q.onstop=()=>{const we=new Blob(T.current,{type:"video/webm"}),Fe=URL.createObjectURL(we),fe=document.createElement("a");fe.href=Fe,fe.download=`procedural-art-${Date.now()}.webm`,fe.click(),URL.revokeObjectURL(Fe),T.current=[]},Q.start(100),S.current=Q,i(!0)},[s,g]),A=H.useCallback(()=>{var se;document.fullscreenElement?document.exitFullscreen():(se=g.canvas.parentElement)==null||se.requestFullscreen()},[g]),$=H.useCallback(async()=>{a?(g.inputManager.disableAudio(),f(!1)):(await g.inputManager.enableAudio(),f(g.inputManager.audioEnabled))},[a,g]),re=H.useCallback(async()=>{y?(g.inputManager.disableMIDI(),w(!1)):(await g.inputManager.enableMIDI(),w(g.inputManager.midiEnabled))},[y,g]);return F.jsxs("div",{className:"toolbar",children:[F.jsxs("div",{className:"toolbar-group",children:[F.jsx("label",{children:"Inputs"}),F.jsxs("div",{className:"toolbar-buttons",children:[F.jsx("button",{className:`btn toolbar-btn ${a?"btn-active":""}`,onClick:$,title:"Toggle microphone input",children:a?"Mic ON":"Mic"}),F.jsx("button",{className:`btn toolbar-btn ${y?"btn-active":""}`,onClick:re,title:"Toggle MIDI input",children:y?"MIDI ON":"MIDI"})]})]}),F.jsxs("div",{className:"toolbar-group",children:[F.jsx("label",{children:"Export"}),F.jsxs("div",{className:"toolbar-buttons",children:[F.jsx("button",{className:"btn toolbar-btn",onClick:p,title:"Save screenshot",children:"Photo"}),F.jsx("button",{className:`btn toolbar-btn ${s?"btn-recording":""}`,onClick:N,title:s?"Stop recording":"Record video",children:s?"Stop":"Record"})]})]}),F.jsx("div",{className:"toolbar-group",children:F.jsx("div",{className:"toolbar-buttons",children:F.jsx("button",{className:"btn toolbar-btn",onClick:A,title:"Toggle fullscreen",children:"Fullscreen"})})})]})}function tp({pipeline:g}){const[s,i]=H.useState(0),[a,f]=H.useState({x:0,y:0}),y=H.useRef([]),w=H.useRef(performance.now());return H.useEffect(()=>{if(!g)return;let S;const T=()=>{const p=performance.now(),N=p-w.current;w.current=p;const A=y.current;A.push(N),A.length>60&&A.shift();const $=A.reduce((se,Y)=>se+Y,0)/A.length;i(Math.round(1e3/$));const re=g.inputManager.poll();f({x:re.mouse.x,y:re.mouse.y}),S=requestAnimationFrame(T)};return S=requestAnimationFrame(T),()=>cancelAnimationFrame(S)},[g]),g?F.jsxs("div",{className:"debug-overlay",children:["FPS: ",s," | Mouse: ",a.x.toFixed(2),", ",a.y.toFixed(2)]}):null}class np extends H.Component{constructor(){super(...arguments);P(this,"state",{hasError:!1,error:null})}static getDerivedStateFromError(i){return{hasError:!0,error:i.message}}render(){return this.state.hasError?F.jsx("div",{style:{position:"absolute",inset:0,display:"flex",alignItems:"center",justifyContent:"center",background:"#0a0a0f",color:"#ff6666",textAlign:"center",zIndex:1e3,padding:20,fontFamily:"inherit"},children:F.jsxs("div",{children:[F.jsx("h2",{style:{fontSize:18,marginBottom:8},children:"Rendering Error"}),F.jsx("p",{style:{fontSize:12,color:"#aaa",maxWidth:400},children:this.state.error}),F.jsx("button",{className:"btn",onClick:()=>window.location.reload(),style:{marginTop:16},children:"Reload"})]})}):this.props.children}}function rp(){const g=H.useRef(null),[s,i]=H.useState(["noise-flow-field"]),[,a]=H.useState(0),[f,y]=H.useState(!1),w=H.useCallback(N=>{g.current=N,N.setEffectChain(["noise-flow-field"]),a(A=>A+1)},[]),S=H.useCallback(N=>{var A;i(N),(A=g.current)==null||A.setEffectChain(N),a($=>$+1)},[]),T=H.useCallback(()=>{y(N=>!N)},[]),p=g.current;return F.jsxs("div",{className:"app",children:[F.jsxs("div",{className:"canvas-area",children:[F.jsx(np,{children:F.jsx(Vd,{onPipelineReady:w})}),F.jsx(tp,{pipeline:p}),F.jsx("button",{className:"menu-toggle",onClick:T,"aria-label":"Toggle menu",children:f?"✕":"☰"})]}),f&&F.jsx("div",{className:"sidebar-backdrop",onClick:T}),F.jsxs("div",{className:`sidebar ${f?"sidebar--open":""}`,children:[F.jsx("div",{className:"sidebar-header",children:F.jsx("h1",{children:"Procedural Art"})}),F.jsx(qd,{activeEffects:s,onChange:S}),p&&F.jsx(Kd,{parameterStore:p.parameterStore}),p&&F.jsx(ep,{pipeline:p}),p&&F.jsx(Jd,{pipeline:p,activeEffects:s,onLoadPreset:S})]})]})}Yf.createRoot(document.getElementById("root")).render(F.jsx(H.StrictMode,{children:F.jsx(rp,{})}));
