var Xf=Object.defineProperty;var Gf=(g,s,i)=>s in g?Xf(g,s,{enumerable:!0,configurable:!0,writable:!0,value:i}):g[s]=i;var P=(g,s,i)=>Gf(g,typeof s!="symbol"?s+"":s,i);(function(){const s=document.createElement("link").relList;if(s&&s.supports&&s.supports("modulepreload"))return;for(const p of document.querySelectorAll('link[rel="modulepreload"]'))a(p);new MutationObserver(p=>{for(const y of p)if(y.type==="childList")for(const w of y.addedNodes)w.tagName==="LINK"&&w.rel==="modulepreload"&&a(w)}).observe(document,{childList:!0,subtree:!0});function i(p){const y={};return p.integrity&&(y.integrity=p.integrity),p.referrerPolicy&&(y.referrerPolicy=p.referrerPolicy),p.crossOrigin==="use-credentials"?y.credentials="include":p.crossOrigin==="anonymous"?y.credentials="omit":y.credentials="same-origin",y}function a(p){if(p.ep)return;p.ep=!0;const y=i(p);fetch(p.href,y)}})();var Li={exports:{}},Cr={},Ai={exports:{}},Y={};/**
 * @license React
 * react.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */var Ua;function Yf(){if(Ua)return Y;Ua=1;var g=Symbol.for("react.element"),s=Symbol.for("react.portal"),i=Symbol.for("react.fragment"),a=Symbol.for("react.strict_mode"),p=Symbol.for("react.profiler"),y=Symbol.for("react.provider"),w=Symbol.for("react.context"),S=Symbol.for("react.forward_ref"),T=Symbol.for("react.suspense"),f=Symbol.for("react.memo"),D=Symbol.for("react.lazy"),M=Symbol.iterator;function $(h){return h===null||typeof h!="object"?null:(h=M&&h[M]||h["@@iterator"],typeof h=="function"?h:null)}var te={isMounted:function(){return!1},enqueueForceUpdate:function(){},enqueueReplaceState:function(){},enqueueSetState:function(){}},ie=Object.assign,G={};function W(h,k,X){this.props=h,this.context=k,this.refs=G,this.updater=X||te}W.prototype.isReactComponent={},W.prototype.setState=function(h,k){if(typeof h!="object"&&typeof h!="function"&&h!=null)throw Error("setState(...): takes an object of state variables to update or a function which returns an object of state variables.");this.updater.enqueueSetState(this,h,k,"setState")},W.prototype.forceUpdate=function(h){this.updater.enqueueForceUpdate(this,h,"forceUpdate")};function ye(){}ye.prototype=W.prototype;function _e(h,k,X){this.props=h,this.context=k,this.refs=G,this.updater=X||te}var ke=_e.prototype=new ye;ke.constructor=_e,ie(ke,W.prototype),ke.isPureReactComponent=!0;var ue=Array.isArray,ze=Object.prototype.hasOwnProperty,se={current:null},oe={key:!0,ref:!0,__self:!0,__source:!0};function ne(h,k,X){var K,Z={},J=null,ae=null;if(k!=null)for(K in k.ref!==void 0&&(ae=k.ref),k.key!==void 0&&(J=""+k.key),k)ze.call(k,K)&&!oe.hasOwnProperty(K)&&(Z[K]=k[K]);var re=arguments.length-2;if(re===1)Z.children=X;else if(1<re){for(var me=Array(re),Je=0;Je<re;Je++)me[Je]=arguments[Je+2];Z.children=me}if(h&&h.defaultProps)for(K in re=h.defaultProps,re)Z[K]===void 0&&(Z[K]=re[K]);return{$$typeof:g,type:h,key:J,ref:ae,props:Z,_owner:se.current}}function we(h,k){return{$$typeof:g,type:h.type,key:k,ref:h.ref,props:h.props,_owner:h._owner}}function Ne(h){return typeof h=="object"&&h!==null&&h.$$typeof===g}function $e(h){var k={"=":"=0",":":"=2"};return"$"+h.replace(/[=:]/g,function(X){return k[X]})}var Le=/\/+/g;function Ie(h,k){return typeof h=="object"&&h!==null&&h.key!=null?$e(""+h.key):k.toString(36)}function be(h,k,X,K,Z){var J=typeof h;(J==="undefined"||J==="boolean")&&(h=null);var ae=!1;if(h===null)ae=!0;else switch(J){case"string":case"number":ae=!0;break;case"object":switch(h.$$typeof){case g:case s:ae=!0}}if(ae)return ae=h,Z=Z(ae),h=K===""?"."+Ie(ae,0):K,ue(Z)?(X="",h!=null&&(X=h.replace(Le,"$&/")+"/"),be(Z,k,X,"",function(Je){return Je})):Z!=null&&(Ne(Z)&&(Z=we(Z,X+(!Z.key||ae&&ae.key===Z.key?"":(""+Z.key).replace(Le,"$&/")+"/")+h)),k.push(Z)),1;if(ae=0,K=K===""?".":K+":",ue(h))for(var re=0;re<h.length;re++){J=h[re];var me=K+Ie(J,re);ae+=be(J,k,X,me,Z)}else if(me=$(h),typeof me=="function")for(h=me.call(h),re=0;!(J=h.next()).done;)J=J.value,me=K+Ie(J,re++),ae+=be(J,k,X,me,Z);else if(J==="object")throw k=String(h),Error("Objects are not valid as a React child (found: "+(k==="[object Object]"?"object with keys {"+Object.keys(h).join(", ")+"}":k)+"). If you meant to render a collection of children, use an array instead.");return ae}function Qe(h,k,X){if(h==null)return h;var K=[],Z=0;return be(h,K,"","",function(J){return k.call(X,J,Z++)}),K}function Fe(h){if(h._status===-1){var k=h._result;k=k(),k.then(function(X){(h._status===0||h._status===-1)&&(h._status=1,h._result=X)},function(X){(h._status===0||h._status===-1)&&(h._status=2,h._result=X)}),h._status===-1&&(h._status=0,h._result=k)}if(h._status===1)return h._result.default;throw h._result}var fe={current:null},z={transition:null},U={ReactCurrentDispatcher:fe,ReactCurrentBatchConfig:z,ReactCurrentOwner:se};function L(){throw Error("act(...) is not supported in production builds of React.")}return Y.Children={map:Qe,forEach:function(h,k,X){Qe(h,function(){k.apply(this,arguments)},X)},count:function(h){var k=0;return Qe(h,function(){k++}),k},toArray:function(h){return Qe(h,function(k){return k})||[]},only:function(h){if(!Ne(h))throw Error("React.Children.only expected to receive a single React element child.");return h}},Y.Component=W,Y.Fragment=i,Y.Profiler=p,Y.PureComponent=_e,Y.StrictMode=a,Y.Suspense=T,Y.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED=U,Y.act=L,Y.cloneElement=function(h,k,X){if(h==null)throw Error("React.cloneElement(...): The argument must be a React element, but you passed "+h+".");var K=ie({},h.props),Z=h.key,J=h.ref,ae=h._owner;if(k!=null){if(k.ref!==void 0&&(J=k.ref,ae=se.current),k.key!==void 0&&(Z=""+k.key),h.type&&h.type.defaultProps)var re=h.type.defaultProps;for(me in k)ze.call(k,me)&&!oe.hasOwnProperty(me)&&(K[me]=k[me]===void 0&&re!==void 0?re[me]:k[me])}var me=arguments.length-2;if(me===1)K.children=X;else if(1<me){re=Array(me);for(var Je=0;Je<me;Je++)re[Je]=arguments[Je+2];K.children=re}return{$$typeof:g,type:h.type,key:Z,ref:J,props:K,_owner:ae}},Y.createContext=function(h){return h={$$typeof:w,_currentValue:h,_currentValue2:h,_threadCount:0,Provider:null,Consumer:null,_defaultValue:null,_globalName:null},h.Provider={$$typeof:y,_context:h},h.Consumer=h},Y.createElement=ne,Y.createFactory=function(h){var k=ne.bind(null,h);return k.type=h,k},Y.createRef=function(){return{current:null}},Y.forwardRef=function(h){return{$$typeof:S,render:h}},Y.isValidElement=Ne,Y.lazy=function(h){return{$$typeof:D,_payload:{_status:-1,_result:h},_init:Fe}},Y.memo=function(h,k){return{$$typeof:f,type:h,compare:k===void 0?null:k}},Y.startTransition=function(h){var k=z.transition;z.transition={};try{h()}finally{z.transition=k}},Y.unstable_act=L,Y.useCallback=function(h,k){return fe.current.useCallback(h,k)},Y.useContext=function(h){return fe.current.useContext(h)},Y.useDebugValue=function(){},Y.useDeferredValue=function(h){return fe.current.useDeferredValue(h)},Y.useEffect=function(h,k){return fe.current.useEffect(h,k)},Y.useId=function(){return fe.current.useId()},Y.useImperativeHandle=function(h,k,X){return fe.current.useImperativeHandle(h,k,X)},Y.useInsertionEffect=function(h,k){return fe.current.useInsertionEffect(h,k)},Y.useLayoutEffect=function(h,k){return fe.current.useLayoutEffect(h,k)},Y.useMemo=function(h,k){return fe.current.useMemo(h,k)},Y.useReducer=function(h,k,X){return fe.current.useReducer(h,k,X)},Y.useRef=function(h){return fe.current.useRef(h)},Y.useState=function(h){return fe.current.useState(h)},Y.useSyncExternalStore=function(h,k,X){return fe.current.useSyncExternalStore(h,k,X)},Y.useTransition=function(){return fe.current.useTransition()},Y.version="18.3.1",Y}var Va;function $i(){return Va||(Va=1,Ai.exports=Yf()),Ai.exports}/**
 * @license React
 * react-jsx-runtime.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */var ba;function Kf(){if(ba)return Cr;ba=1;var g=$i(),s=Symbol.for("react.element"),i=Symbol.for("react.fragment"),a=Object.prototype.hasOwnProperty,p=g.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED.ReactCurrentOwner,y={key:!0,ref:!0,__self:!0,__source:!0};function w(S,T,f){var D,M={},$=null,te=null;f!==void 0&&($=""+f),T.key!==void 0&&($=""+T.key),T.ref!==void 0&&(te=T.ref);for(D in T)a.call(T,D)&&!y.hasOwnProperty(D)&&(M[D]=T[D]);if(S&&S.defaultProps)for(D in T=S.defaultProps,T)M[D]===void 0&&(M[D]=T[D]);return{$$typeof:s,type:S,key:$,ref:te,props:M,_owner:p.current}}return Cr.Fragment=i,Cr.jsx=w,Cr.jsxs=w,Cr}var Wa;function qf(){return Wa||(Wa=1,Li.exports=Kf()),Li.exports}var I=qf(),Q=$i(),Ll={},Oi={exports:{}},Ze={},ji={exports:{}},Bi={};/**
 * @license React
 * scheduler.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */var Ha;function Zf(){return Ha||(Ha=1,(function(g){function s(z,U){var L=z.length;z.push(U);e:for(;0<L;){var h=L-1>>>1,k=z[h];if(0<p(k,U))z[h]=U,z[L]=k,L=h;else break e}}function i(z){return z.length===0?null:z[0]}function a(z){if(z.length===0)return null;var U=z[0],L=z.pop();if(L!==U){z[0]=L;e:for(var h=0,k=z.length,X=k>>>1;h<X;){var K=2*(h+1)-1,Z=z[K],J=K+1,ae=z[J];if(0>p(Z,L))J<k&&0>p(ae,Z)?(z[h]=ae,z[J]=L,h=J):(z[h]=Z,z[K]=L,h=K);else if(J<k&&0>p(ae,L))z[h]=ae,z[J]=L,h=J;else break e}}return U}function p(z,U){var L=z.sortIndex-U.sortIndex;return L!==0?L:z.id-U.id}if(typeof performance=="object"&&typeof performance.now=="function"){var y=performance;g.unstable_now=function(){return y.now()}}else{var w=Date,S=w.now();g.unstable_now=function(){return w.now()-S}}var T=[],f=[],D=1,M=null,$=3,te=!1,ie=!1,G=!1,W=typeof setTimeout=="function"?setTimeout:null,ye=typeof clearTimeout=="function"?clearTimeout:null,_e=typeof setImmediate<"u"?setImmediate:null;typeof navigator<"u"&&navigator.scheduling!==void 0&&navigator.scheduling.isInputPending!==void 0&&navigator.scheduling.isInputPending.bind(navigator.scheduling);function ke(z){for(var U=i(f);U!==null;){if(U.callback===null)a(f);else if(U.startTime<=z)a(f),U.sortIndex=U.expirationTime,s(T,U);else break;U=i(f)}}function ue(z){if(G=!1,ke(z),!ie)if(i(T)!==null)ie=!0,Fe(ze);else{var U=i(f);U!==null&&fe(ue,U.startTime-z)}}function ze(z,U){ie=!1,G&&(G=!1,ye(ne),ne=-1),te=!0;var L=$;try{for(ke(U),M=i(T);M!==null&&(!(M.expirationTime>U)||z&&!$e());){var h=M.callback;if(typeof h=="function"){M.callback=null,$=M.priorityLevel;var k=h(M.expirationTime<=U);U=g.unstable_now(),typeof k=="function"?M.callback=k:M===i(T)&&a(T),ke(U)}else a(T);M=i(T)}if(M!==null)var X=!0;else{var K=i(f);K!==null&&fe(ue,K.startTime-U),X=!1}return X}finally{M=null,$=L,te=!1}}var se=!1,oe=null,ne=-1,we=5,Ne=-1;function $e(){return!(g.unstable_now()-Ne<we)}function Le(){if(oe!==null){var z=g.unstable_now();Ne=z;var U=!0;try{U=oe(!0,z)}finally{U?Ie():(se=!1,oe=null)}}else se=!1}var Ie;if(typeof _e=="function")Ie=function(){_e(Le)};else if(typeof MessageChannel<"u"){var be=new MessageChannel,Qe=be.port2;be.port1.onmessage=Le,Ie=function(){Qe.postMessage(null)}}else Ie=function(){W(Le,0)};function Fe(z){oe=z,se||(se=!0,Ie())}function fe(z,U){ne=W(function(){z(g.unstable_now())},U)}g.unstable_IdlePriority=5,g.unstable_ImmediatePriority=1,g.unstable_LowPriority=4,g.unstable_NormalPriority=3,g.unstable_Profiling=null,g.unstable_UserBlockingPriority=2,g.unstable_cancelCallback=function(z){z.callback=null},g.unstable_continueExecution=function(){ie||te||(ie=!0,Fe(ze))},g.unstable_forceFrameRate=function(z){0>z||125<z?console.error("forceFrameRate takes a positive int between 0 and 125, forcing frame rates higher than 125 fps is not supported"):we=0<z?Math.floor(1e3/z):5},g.unstable_getCurrentPriorityLevel=function(){return $},g.unstable_getFirstCallbackNode=function(){return i(T)},g.unstable_next=function(z){switch($){case 1:case 2:case 3:var U=3;break;default:U=$}var L=$;$=U;try{return z()}finally{$=L}},g.unstable_pauseExecution=function(){},g.unstable_requestPaint=function(){},g.unstable_runWithPriority=function(z,U){switch(z){case 1:case 2:case 3:case 4:case 5:break;default:z=3}var L=$;$=z;try{return U()}finally{$=L}},g.unstable_scheduleCallback=function(z,U,L){var h=g.unstable_now();switch(typeof L=="object"&&L!==null?(L=L.delay,L=typeof L=="number"&&0<L?h+L:h):L=h,z){case 1:var k=-1;break;case 2:k=250;break;case 5:k=1073741823;break;case 4:k=1e4;break;default:k=5e3}return k=L+k,z={id:D++,callback:U,priorityLevel:z,startTime:L,expirationTime:k,sortIndex:-1},L>h?(z.sortIndex=L,s(f,z),i(T)===null&&z===i(f)&&(G?(ye(ne),ne=-1):G=!0,fe(ue,L-h))):(z.sortIndex=k,s(T,z),ie||te||(ie=!0,Fe(ze))),z},g.unstable_shouldYield=$e,g.unstable_wrapCallback=function(z){var U=$;return function(){var L=$;$=U;try{return z.apply(this,arguments)}finally{$=L}}}})(Bi)),Bi}var $a;function Jf(){return $a||($a=1,ji.exports=Zf()),ji.exports}/**
 * @license React
 * react-dom.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */var Qa;function ed(){if(Qa)return Ze;Qa=1;var g=$i(),s=Jf();function i(e){for(var t="https://reactjs.org/docs/error-decoder.html?invariant="+e,n=1;n<arguments.length;n++)t+="&args[]="+encodeURIComponent(arguments[n]);return"Minified React error #"+e+"; visit "+t+" for the full message or use the non-minified dev environment for full errors and additional helpful warnings."}var a=new Set,p={};function y(e,t){w(e,t),w(e+"Capture",t)}function w(e,t){for(p[e]=t,e=0;e<t.length;e++)a.add(t[e])}var S=!(typeof window>"u"||typeof window.document>"u"||typeof window.document.createElement>"u"),T=Object.prototype.hasOwnProperty,f=/^[:A-Z_a-z\u00C0-\u00D6\u00D8-\u00F6\u00F8-\u02FF\u0370-\u037D\u037F-\u1FFF\u200C-\u200D\u2070-\u218F\u2C00-\u2FEF\u3001-\uD7FF\uF900-\uFDCF\uFDF0-\uFFFD][:A-Z_a-z\u00C0-\u00D6\u00D8-\u00F6\u00F8-\u02FF\u0370-\u037D\u037F-\u1FFF\u200C-\u200D\u2070-\u218F\u2C00-\u2FEF\u3001-\uD7FF\uF900-\uFDCF\uFDF0-\uFFFD\-.0-9\u00B7\u0300-\u036F\u203F-\u2040]*$/,D={},M={};function $(e){return T.call(M,e)?!0:T.call(D,e)?!1:f.test(e)?M[e]=!0:(D[e]=!0,!1)}function te(e,t,n,r){if(n!==null&&n.type===0)return!1;switch(typeof t){case"function":case"symbol":return!0;case"boolean":return r?!1:n!==null?!n.acceptsBooleans:(e=e.toLowerCase().slice(0,5),e!=="data-"&&e!=="aria-");default:return!1}}function ie(e,t,n,r){if(t===null||typeof t>"u"||te(e,t,n,r))return!0;if(r)return!1;if(n!==null)switch(n.type){case 3:return!t;case 4:return t===!1;case 5:return isNaN(t);case 6:return isNaN(t)||1>t}return!1}function G(e,t,n,r,l,o,u){this.acceptsBooleans=t===2||t===3||t===4,this.attributeName=r,this.attributeNamespace=l,this.mustUseProperty=n,this.propertyName=e,this.type=t,this.sanitizeURL=o,this.removeEmptyString=u}var W={};"children dangerouslySetInnerHTML defaultValue defaultChecked innerHTML suppressContentEditableWarning suppressHydrationWarning style".split(" ").forEach(function(e){W[e]=new G(e,0,!1,e,null,!1,!1)}),[["acceptCharset","accept-charset"],["className","class"],["htmlFor","for"],["httpEquiv","http-equiv"]].forEach(function(e){var t=e[0];W[t]=new G(t,1,!1,e[1],null,!1,!1)}),["contentEditable","draggable","spellCheck","value"].forEach(function(e){W[e]=new G(e,2,!1,e.toLowerCase(),null,!1,!1)}),["autoReverse","externalResourcesRequired","focusable","preserveAlpha"].forEach(function(e){W[e]=new G(e,2,!1,e,null,!1,!1)}),"allowFullScreen async autoFocus autoPlay controls default defer disabled disablePictureInPicture disableRemotePlayback formNoValidate hidden loop noModule noValidate open playsInline readOnly required reversed scoped seamless itemScope".split(" ").forEach(function(e){W[e]=new G(e,3,!1,e.toLowerCase(),null,!1,!1)}),["checked","multiple","muted","selected"].forEach(function(e){W[e]=new G(e,3,!0,e,null,!1,!1)}),["capture","download"].forEach(function(e){W[e]=new G(e,4,!1,e,null,!1,!1)}),["cols","rows","size","span"].forEach(function(e){W[e]=new G(e,6,!1,e,null,!1,!1)}),["rowSpan","start"].forEach(function(e){W[e]=new G(e,5,!1,e.toLowerCase(),null,!1,!1)});var ye=/[\-:]([a-z])/g;function _e(e){return e[1].toUpperCase()}"accent-height alignment-baseline arabic-form baseline-shift cap-height clip-path clip-rule color-interpolation color-interpolation-filters color-profile color-rendering dominant-baseline enable-background fill-opacity fill-rule flood-color flood-opacity font-family font-size font-size-adjust font-stretch font-style font-variant font-weight glyph-name glyph-orientation-horizontal glyph-orientation-vertical horiz-adv-x horiz-origin-x image-rendering letter-spacing lighting-color marker-end marker-mid marker-start overline-position overline-thickness paint-order panose-1 pointer-events rendering-intent shape-rendering stop-color stop-opacity strikethrough-position strikethrough-thickness stroke-dasharray stroke-dashoffset stroke-linecap stroke-linejoin stroke-miterlimit stroke-opacity stroke-width text-anchor text-decoration text-rendering underline-position underline-thickness unicode-bidi unicode-range units-per-em v-alphabetic v-hanging v-ideographic v-mathematical vector-effect vert-adv-y vert-origin-x vert-origin-y word-spacing writing-mode xmlns:xlink x-height".split(" ").forEach(function(e){var t=e.replace(ye,_e);W[t]=new G(t,1,!1,e,null,!1,!1)}),"xlink:actuate xlink:arcrole xlink:role xlink:show xlink:title xlink:type".split(" ").forEach(function(e){var t=e.replace(ye,_e);W[t]=new G(t,1,!1,e,"http://www.w3.org/1999/xlink",!1,!1)}),["xml:base","xml:lang","xml:space"].forEach(function(e){var t=e.replace(ye,_e);W[t]=new G(t,1,!1,e,"http://www.w3.org/XML/1998/namespace",!1,!1)}),["tabIndex","crossOrigin"].forEach(function(e){W[e]=new G(e,1,!1,e.toLowerCase(),null,!1,!1)}),W.xlinkHref=new G("xlinkHref",1,!1,"xlink:href","http://www.w3.org/1999/xlink",!0,!1),["src","href","action","formAction"].forEach(function(e){W[e]=new G(e,1,!1,e.toLowerCase(),null,!0,!0)});function ke(e,t,n,r){var l=W.hasOwnProperty(t)?W[t]:null;(l!==null?l.type!==0:r||!(2<t.length)||t[0]!=="o"&&t[0]!=="O"||t[1]!=="n"&&t[1]!=="N")&&(ie(t,n,l,r)&&(n=null),r||l===null?$(t)&&(n===null?e.removeAttribute(t):e.setAttribute(t,""+n)):l.mustUseProperty?e[l.propertyName]=n===null?l.type===3?!1:"":n:(t=l.attributeName,r=l.attributeNamespace,n===null?e.removeAttribute(t):(l=l.type,n=l===3||l===4&&n===!0?"":""+n,r?e.setAttributeNS(r,t,n):e.setAttribute(t,n))))}var ue=g.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED,ze=Symbol.for("react.element"),se=Symbol.for("react.portal"),oe=Symbol.for("react.fragment"),ne=Symbol.for("react.strict_mode"),we=Symbol.for("react.profiler"),Ne=Symbol.for("react.provider"),$e=Symbol.for("react.context"),Le=Symbol.for("react.forward_ref"),Ie=Symbol.for("react.suspense"),be=Symbol.for("react.suspense_list"),Qe=Symbol.for("react.memo"),Fe=Symbol.for("react.lazy"),fe=Symbol.for("react.offscreen"),z=Symbol.iterator;function U(e){return e===null||typeof e!="object"?null:(e=z&&e[z]||e["@@iterator"],typeof e=="function"?e:null)}var L=Object.assign,h;function k(e){if(h===void 0)try{throw Error()}catch(n){var t=n.stack.trim().match(/\n( *(at )?)/);h=t&&t[1]||""}return`
`+h+e}var X=!1;function K(e,t){if(!e||X)return"";X=!0;var n=Error.prepareStackTrace;Error.prepareStackTrace=void 0;try{if(t)if(t=function(){throw Error()},Object.defineProperty(t.prototype,"props",{set:function(){throw Error()}}),typeof Reflect=="object"&&Reflect.construct){try{Reflect.construct(t,[])}catch(_){var r=_}Reflect.construct(e,[],t)}else{try{t.call()}catch(_){r=_}e.call(t.prototype)}else{try{throw Error()}catch(_){r=_}e()}}catch(_){if(_&&r&&typeof _.stack=="string"){for(var l=_.stack.split(`
`),o=r.stack.split(`
`),u=l.length-1,c=o.length-1;1<=u&&0<=c&&l[u]!==o[c];)c--;for(;1<=u&&0<=c;u--,c--)if(l[u]!==o[c]){if(u!==1||c!==1)do if(u--,c--,0>c||l[u]!==o[c]){var d=`
`+l[u].replace(" at new "," at ");return e.displayName&&d.includes("<anonymous>")&&(d=d.replace("<anonymous>",e.displayName)),d}while(1<=u&&0<=c);break}}}finally{X=!1,Error.prepareStackTrace=n}return(e=e?e.displayName||e.name:"")?k(e):""}function Z(e){switch(e.tag){case 5:return k(e.type);case 16:return k("Lazy");case 13:return k("Suspense");case 19:return k("SuspenseList");case 0:case 2:case 15:return e=K(e.type,!1),e;case 11:return e=K(e.type.render,!1),e;case 1:return e=K(e.type,!0),e;default:return""}}function J(e){if(e==null)return null;if(typeof e=="function")return e.displayName||e.name||null;if(typeof e=="string")return e;switch(e){case oe:return"Fragment";case se:return"Portal";case we:return"Profiler";case ne:return"StrictMode";case Ie:return"Suspense";case be:return"SuspenseList"}if(typeof e=="object")switch(e.$$typeof){case $e:return(e.displayName||"Context")+".Consumer";case Ne:return(e._context.displayName||"Context")+".Provider";case Le:var t=e.render;return e=e.displayName,e||(e=t.displayName||t.name||"",e=e!==""?"ForwardRef("+e+")":"ForwardRef"),e;case Qe:return t=e.displayName||null,t!==null?t:J(e.type)||"Memo";case Fe:t=e._payload,e=e._init;try{return J(e(t))}catch{}}return null}function ae(e){var t=e.type;switch(e.tag){case 24:return"Cache";case 9:return(t.displayName||"Context")+".Consumer";case 10:return(t._context.displayName||"Context")+".Provider";case 18:return"DehydratedFragment";case 11:return e=t.render,e=e.displayName||e.name||"",t.displayName||(e!==""?"ForwardRef("+e+")":"ForwardRef");case 7:return"Fragment";case 5:return t;case 4:return"Portal";case 3:return"Root";case 6:return"Text";case 16:return J(t);case 8:return t===ne?"StrictMode":"Mode";case 22:return"Offscreen";case 12:return"Profiler";case 21:return"Scope";case 13:return"Suspense";case 19:return"SuspenseList";case 25:return"TracingMarker";case 1:case 0:case 17:case 2:case 14:case 15:if(typeof t=="function")return t.displayName||t.name||null;if(typeof t=="string")return t}return null}function re(e){switch(typeof e){case"boolean":case"number":case"string":case"undefined":return e;case"object":return e;default:return""}}function me(e){var t=e.type;return(e=e.nodeName)&&e.toLowerCase()==="input"&&(t==="checkbox"||t==="radio")}function Je(e){var t=me(e)?"checked":"value",n=Object.getOwnPropertyDescriptor(e.constructor.prototype,t),r=""+e[t];if(!e.hasOwnProperty(t)&&typeof n<"u"&&typeof n.get=="function"&&typeof n.set=="function"){var l=n.get,o=n.set;return Object.defineProperty(e,t,{configurable:!0,get:function(){return l.call(this)},set:function(u){r=""+u,o.call(this,u)}}),Object.defineProperty(e,t,{enumerable:n.enumerable}),{getValue:function(){return r},setValue:function(u){r=""+u},stopTracking:function(){e._valueTracker=null,delete e[t]}}}}function Er(e){e._valueTracker||(e._valueTracker=Je(e))}function Qi(e){if(!e)return!1;var t=e._valueTracker;if(!t)return!0;var n=t.getValue(),r="";return e&&(r=me(e)?e.checked?"true":"false":e.value),e=r,e!==n?(t.setValue(e),!0):!1}function Tr(e){if(e=e||(typeof document<"u"?document:void 0),typeof e>"u")return null;try{return e.activeElement||e.body}catch{return e.body}}function Vl(e,t){var n=t.checked;return L({},t,{defaultChecked:void 0,defaultValue:void 0,value:void 0,checked:n??e._wrapperState.initialChecked})}function Xi(e,t){var n=t.defaultValue==null?"":t.defaultValue,r=t.checked!=null?t.checked:t.defaultChecked;n=re(t.value!=null?t.value:n),e._wrapperState={initialChecked:r,initialValue:n,controlled:t.type==="checkbox"||t.type==="radio"?t.checked!=null:t.value!=null}}function Gi(e,t){t=t.checked,t!=null&&ke(e,"checked",t,!1)}function bl(e,t){Gi(e,t);var n=re(t.value),r=t.type;if(n!=null)r==="number"?(n===0&&e.value===""||e.value!=n)&&(e.value=""+n):e.value!==""+n&&(e.value=""+n);else if(r==="submit"||r==="reset"){e.removeAttribute("value");return}t.hasOwnProperty("value")?Wl(e,t.type,n):t.hasOwnProperty("defaultValue")&&Wl(e,t.type,re(t.defaultValue)),t.checked==null&&t.defaultChecked!=null&&(e.defaultChecked=!!t.defaultChecked)}function Yi(e,t,n){if(t.hasOwnProperty("value")||t.hasOwnProperty("defaultValue")){var r=t.type;if(!(r!=="submit"&&r!=="reset"||t.value!==void 0&&t.value!==null))return;t=""+e._wrapperState.initialValue,n||t===e.value||(e.value=t),e.defaultValue=t}n=e.name,n!==""&&(e.name=""),e.defaultChecked=!!e._wrapperState.initialChecked,n!==""&&(e.name=n)}function Wl(e,t,n){(t!=="number"||Tr(e.ownerDocument)!==e)&&(n==null?e.defaultValue=""+e._wrapperState.initialValue:e.defaultValue!==""+n&&(e.defaultValue=""+n))}var jn=Array.isArray;function dn(e,t,n,r){if(e=e.options,t){t={};for(var l=0;l<n.length;l++)t["$"+n[l]]=!0;for(n=0;n<e.length;n++)l=t.hasOwnProperty("$"+e[n].value),e[n].selected!==l&&(e[n].selected=l),l&&r&&(e[n].defaultSelected=!0)}else{for(n=""+re(n),t=null,l=0;l<e.length;l++){if(e[l].value===n){e[l].selected=!0,r&&(e[l].defaultSelected=!0);return}t!==null||e[l].disabled||(t=e[l])}t!==null&&(t.selected=!0)}}function Hl(e,t){if(t.dangerouslySetInnerHTML!=null)throw Error(i(91));return L({},t,{value:void 0,defaultValue:void 0,children:""+e._wrapperState.initialValue})}function Ki(e,t){var n=t.value;if(n==null){if(n=t.children,t=t.defaultValue,n!=null){if(t!=null)throw Error(i(92));if(jn(n)){if(1<n.length)throw Error(i(93));n=n[0]}t=n}t==null&&(t=""),n=t}e._wrapperState={initialValue:re(n)}}function qi(e,t){var n=re(t.value),r=re(t.defaultValue);n!=null&&(n=""+n,n!==e.value&&(e.value=n),t.defaultValue==null&&e.defaultValue!==n&&(e.defaultValue=n)),r!=null&&(e.defaultValue=""+r)}function Zi(e){var t=e.textContent;t===e._wrapperState.initialValue&&t!==""&&t!==null&&(e.value=t)}function Ji(e){switch(e){case"svg":return"http://www.w3.org/2000/svg";case"math":return"http://www.w3.org/1998/Math/MathML";default:return"http://www.w3.org/1999/xhtml"}}function $l(e,t){return e==null||e==="http://www.w3.org/1999/xhtml"?Ji(t):e==="http://www.w3.org/2000/svg"&&t==="foreignObject"?"http://www.w3.org/1999/xhtml":e}var Rr,eu=(function(e){return typeof MSApp<"u"&&MSApp.execUnsafeLocalFunction?function(t,n,r,l){MSApp.execUnsafeLocalFunction(function(){return e(t,n,r,l)})}:e})(function(e,t){if(e.namespaceURI!=="http://www.w3.org/2000/svg"||"innerHTML"in e)e.innerHTML=t;else{for(Rr=Rr||document.createElement("div"),Rr.innerHTML="<svg>"+t.valueOf().toString()+"</svg>",t=Rr.firstChild;e.firstChild;)e.removeChild(e.firstChild);for(;t.firstChild;)e.appendChild(t.firstChild)}});function Bn(e,t){if(t){var n=e.firstChild;if(n&&n===e.lastChild&&n.nodeType===3){n.nodeValue=t;return}}e.textContent=t}var Un={animationIterationCount:!0,aspectRatio:!0,borderImageOutset:!0,borderImageSlice:!0,borderImageWidth:!0,boxFlex:!0,boxFlexGroup:!0,boxOrdinalGroup:!0,columnCount:!0,columns:!0,flex:!0,flexGrow:!0,flexPositive:!0,flexShrink:!0,flexNegative:!0,flexOrder:!0,gridArea:!0,gridRow:!0,gridRowEnd:!0,gridRowSpan:!0,gridRowStart:!0,gridColumn:!0,gridColumnEnd:!0,gridColumnSpan:!0,gridColumnStart:!0,fontWeight:!0,lineClamp:!0,lineHeight:!0,opacity:!0,order:!0,orphans:!0,tabSize:!0,widows:!0,zIndex:!0,zoom:!0,fillOpacity:!0,floodOpacity:!0,stopOpacity:!0,strokeDasharray:!0,strokeDashoffset:!0,strokeMiterlimit:!0,strokeOpacity:!0,strokeWidth:!0},Ka=["Webkit","ms","Moz","O"];Object.keys(Un).forEach(function(e){Ka.forEach(function(t){t=t+e.charAt(0).toUpperCase()+e.substring(1),Un[t]=Un[e]})});function tu(e,t,n){return t==null||typeof t=="boolean"||t===""?"":n||typeof t!="number"||t===0||Un.hasOwnProperty(e)&&Un[e]?(""+t).trim():t+"px"}function nu(e,t){e=e.style;for(var n in t)if(t.hasOwnProperty(n)){var r=n.indexOf("--")===0,l=tu(n,t[n],r);n==="float"&&(n="cssFloat"),r?e.setProperty(n,l):e[n]=l}}var qa=L({menuitem:!0},{area:!0,base:!0,br:!0,col:!0,embed:!0,hr:!0,img:!0,input:!0,keygen:!0,link:!0,meta:!0,param:!0,source:!0,track:!0,wbr:!0});function Ql(e,t){if(t){if(qa[e]&&(t.children!=null||t.dangerouslySetInnerHTML!=null))throw Error(i(137,e));if(t.dangerouslySetInnerHTML!=null){if(t.children!=null)throw Error(i(60));if(typeof t.dangerouslySetInnerHTML!="object"||!("__html"in t.dangerouslySetInnerHTML))throw Error(i(61))}if(t.style!=null&&typeof t.style!="object")throw Error(i(62))}}function Xl(e,t){if(e.indexOf("-")===-1)return typeof t.is=="string";switch(e){case"annotation-xml":case"color-profile":case"font-face":case"font-face-src":case"font-face-uri":case"font-face-format":case"font-face-name":case"missing-glyph":return!1;default:return!0}}var Gl=null;function Yl(e){return e=e.target||e.srcElement||window,e.correspondingUseElement&&(e=e.correspondingUseElement),e.nodeType===3?e.parentNode:e}var Kl=null,pn=null,mn=null;function ru(e){if(e=sr(e)){if(typeof Kl!="function")throw Error(i(280));var t=e.stateNode;t&&(t=Kr(t),Kl(e.stateNode,e.type,t))}}function lu(e){pn?mn?mn.push(e):mn=[e]:pn=e}function ou(){if(pn){var e=pn,t=mn;if(mn=pn=null,ru(e),t)for(e=0;e<t.length;e++)ru(t[e])}}function iu(e,t){return e(t)}function uu(){}var ql=!1;function su(e,t,n){if(ql)return e(t,n);ql=!0;try{return iu(e,t,n)}finally{ql=!1,(pn!==null||mn!==null)&&(uu(),ou())}}function Vn(e,t){var n=e.stateNode;if(n===null)return null;var r=Kr(n);if(r===null)return null;n=r[t];e:switch(t){case"onClick":case"onClickCapture":case"onDoubleClick":case"onDoubleClickCapture":case"onMouseDown":case"onMouseDownCapture":case"onMouseMove":case"onMouseMoveCapture":case"onMouseUp":case"onMouseUpCapture":case"onMouseEnter":(r=!r.disabled)||(e=e.type,r=!(e==="button"||e==="input"||e==="select"||e==="textarea")),e=!r;break e;default:e=!1}if(e)return null;if(n&&typeof n!="function")throw Error(i(231,t,typeof n));return n}var Zl=!1;if(S)try{var bn={};Object.defineProperty(bn,"passive",{get:function(){Zl=!0}}),window.addEventListener("test",bn,bn),window.removeEventListener("test",bn,bn)}catch{Zl=!1}function Za(e,t,n,r,l,o,u,c,d){var _=Array.prototype.slice.call(arguments,3);try{t.apply(n,_)}catch(E){this.onError(E)}}var Wn=!1,Ir=null,Fr=!1,Jl=null,Ja={onError:function(e){Wn=!0,Ir=e}};function ec(e,t,n,r,l,o,u,c,d){Wn=!1,Ir=null,Za.apply(Ja,arguments)}function tc(e,t,n,r,l,o,u,c,d){if(ec.apply(this,arguments),Wn){if(Wn){var _=Ir;Wn=!1,Ir=null}else throw Error(i(198));Fr||(Fr=!0,Jl=_)}}function qt(e){var t=e,n=e;if(e.alternate)for(;t.return;)t=t.return;else{e=t;do t=e,(t.flags&4098)!==0&&(n=t.return),e=t.return;while(e)}return t.tag===3?n:null}function au(e){if(e.tag===13){var t=e.memoizedState;if(t===null&&(e=e.alternate,e!==null&&(t=e.memoizedState)),t!==null)return t.dehydrated}return null}function cu(e){if(qt(e)!==e)throw Error(i(188))}function nc(e){var t=e.alternate;if(!t){if(t=qt(e),t===null)throw Error(i(188));return t!==e?null:e}for(var n=e,r=t;;){var l=n.return;if(l===null)break;var o=l.alternate;if(o===null){if(r=l.return,r!==null){n=r;continue}break}if(l.child===o.child){for(o=l.child;o;){if(o===n)return cu(l),e;if(o===r)return cu(l),t;o=o.sibling}throw Error(i(188))}if(n.return!==r.return)n=l,r=o;else{for(var u=!1,c=l.child;c;){if(c===n){u=!0,n=l,r=o;break}if(c===r){u=!0,r=l,n=o;break}c=c.sibling}if(!u){for(c=o.child;c;){if(c===n){u=!0,n=o,r=l;break}if(c===r){u=!0,r=o,n=l;break}c=c.sibling}if(!u)throw Error(i(189))}}if(n.alternate!==r)throw Error(i(190))}if(n.tag!==3)throw Error(i(188));return n.stateNode.current===n?e:t}function fu(e){return e=nc(e),e!==null?du(e):null}function du(e){if(e.tag===5||e.tag===6)return e;for(e=e.child;e!==null;){var t=du(e);if(t!==null)return t;e=e.sibling}return null}var pu=s.unstable_scheduleCallback,mu=s.unstable_cancelCallback,rc=s.unstable_shouldYield,lc=s.unstable_requestPaint,Se=s.unstable_now,oc=s.unstable_getCurrentPriorityLevel,eo=s.unstable_ImmediatePriority,hu=s.unstable_UserBlockingPriority,Pr=s.unstable_NormalPriority,ic=s.unstable_LowPriority,vu=s.unstable_IdlePriority,Mr=null,gt=null;function uc(e){if(gt&&typeof gt.onCommitFiberRoot=="function")try{gt.onCommitFiberRoot(Mr,e,void 0,(e.current.flags&128)===128)}catch{}}var ct=Math.clz32?Math.clz32:cc,sc=Math.log,ac=Math.LN2;function cc(e){return e>>>=0,e===0?32:31-(sc(e)/ac|0)|0}var Dr=64,zr=4194304;function Hn(e){switch(e&-e){case 1:return 1;case 2:return 2;case 4:return 4;case 8:return 8;case 16:return 16;case 32:return 32;case 64:case 128:case 256:case 512:case 1024:case 2048:case 4096:case 8192:case 16384:case 32768:case 65536:case 131072:case 262144:case 524288:case 1048576:case 2097152:return e&4194240;case 4194304:case 8388608:case 16777216:case 33554432:case 67108864:return e&130023424;case 134217728:return 134217728;case 268435456:return 268435456;case 536870912:return 536870912;case 1073741824:return 1073741824;default:return e}}function Nr(e,t){var n=e.pendingLanes;if(n===0)return 0;var r=0,l=e.suspendedLanes,o=e.pingedLanes,u=n&268435455;if(u!==0){var c=u&~l;c!==0?r=Hn(c):(o&=u,o!==0&&(r=Hn(o)))}else u=n&~l,u!==0?r=Hn(u):o!==0&&(r=Hn(o));if(r===0)return 0;if(t!==0&&t!==r&&(t&l)===0&&(l=r&-r,o=t&-t,l>=o||l===16&&(o&4194240)!==0))return t;if((r&4)!==0&&(r|=n&16),t=e.entangledLanes,t!==0)for(e=e.entanglements,t&=r;0<t;)n=31-ct(t),l=1<<n,r|=e[n],t&=~l;return r}function fc(e,t){switch(e){case 1:case 2:case 4:return t+250;case 8:case 16:case 32:case 64:case 128:case 256:case 512:case 1024:case 2048:case 4096:case 8192:case 16384:case 32768:case 65536:case 131072:case 262144:case 524288:case 1048576:case 2097152:return t+5e3;case 4194304:case 8388608:case 16777216:case 33554432:case 67108864:return-1;case 134217728:case 268435456:case 536870912:case 1073741824:return-1;default:return-1}}function dc(e,t){for(var n=e.suspendedLanes,r=e.pingedLanes,l=e.expirationTimes,o=e.pendingLanes;0<o;){var u=31-ct(o),c=1<<u,d=l[u];d===-1?((c&n)===0||(c&r)!==0)&&(l[u]=fc(c,t)):d<=t&&(e.expiredLanes|=c),o&=~c}}function to(e){return e=e.pendingLanes&-1073741825,e!==0?e:e&1073741824?1073741824:0}function gu(){var e=Dr;return Dr<<=1,(Dr&4194240)===0&&(Dr=64),e}function no(e){for(var t=[],n=0;31>n;n++)t.push(e);return t}function $n(e,t,n){e.pendingLanes|=t,t!==536870912&&(e.suspendedLanes=0,e.pingedLanes=0),e=e.eventTimes,t=31-ct(t),e[t]=n}function pc(e,t){var n=e.pendingLanes&~t;e.pendingLanes=t,e.suspendedLanes=0,e.pingedLanes=0,e.expiredLanes&=t,e.mutableReadLanes&=t,e.entangledLanes&=t,t=e.entanglements;var r=e.eventTimes;for(e=e.expirationTimes;0<n;){var l=31-ct(n),o=1<<l;t[l]=0,r[l]=-1,e[l]=-1,n&=~o}}function ro(e,t){var n=e.entangledLanes|=t;for(e=e.entanglements;n;){var r=31-ct(n),l=1<<r;l&t|e[r]&t&&(e[r]|=t),n&=~l}}var le=0;function yu(e){return e&=-e,1<e?4<e?(e&268435455)!==0?16:536870912:4:1}var xu,lo,_u,wu,Su,oo=!1,Lr=[],Dt=null,zt=null,Nt=null,Qn=new Map,Xn=new Map,Lt=[],mc="mousedown mouseup touchcancel touchend touchstart auxclick dblclick pointercancel pointerdown pointerup dragend dragstart drop compositionend compositionstart keydown keypress keyup input textInput copy cut paste click change contextmenu reset submit".split(" ");function Cu(e,t){switch(e){case"focusin":case"focusout":Dt=null;break;case"dragenter":case"dragleave":zt=null;break;case"mouseover":case"mouseout":Nt=null;break;case"pointerover":case"pointerout":Qn.delete(t.pointerId);break;case"gotpointercapture":case"lostpointercapture":Xn.delete(t.pointerId)}}function Gn(e,t,n,r,l,o){return e===null||e.nativeEvent!==o?(e={blockedOn:t,domEventName:n,eventSystemFlags:r,nativeEvent:o,targetContainers:[l]},t!==null&&(t=sr(t),t!==null&&lo(t)),e):(e.eventSystemFlags|=r,t=e.targetContainers,l!==null&&t.indexOf(l)===-1&&t.push(l),e)}function hc(e,t,n,r,l){switch(t){case"focusin":return Dt=Gn(Dt,e,t,n,r,l),!0;case"dragenter":return zt=Gn(zt,e,t,n,r,l),!0;case"mouseover":return Nt=Gn(Nt,e,t,n,r,l),!0;case"pointerover":var o=l.pointerId;return Qn.set(o,Gn(Qn.get(o)||null,e,t,n,r,l)),!0;case"gotpointercapture":return o=l.pointerId,Xn.set(o,Gn(Xn.get(o)||null,e,t,n,r,l)),!0}return!1}function ku(e){var t=Zt(e.target);if(t!==null){var n=qt(t);if(n!==null){if(t=n.tag,t===13){if(t=au(n),t!==null){e.blockedOn=t,Su(e.priority,function(){_u(n)});return}}else if(t===3&&n.stateNode.current.memoizedState.isDehydrated){e.blockedOn=n.tag===3?n.stateNode.containerInfo:null;return}}}e.blockedOn=null}function Ar(e){if(e.blockedOn!==null)return!1;for(var t=e.targetContainers;0<t.length;){var n=uo(e.domEventName,e.eventSystemFlags,t[0],e.nativeEvent);if(n===null){n=e.nativeEvent;var r=new n.constructor(n.type,n);Gl=r,n.target.dispatchEvent(r),Gl=null}else return t=sr(n),t!==null&&lo(t),e.blockedOn=n,!1;t.shift()}return!0}function Eu(e,t,n){Ar(e)&&n.delete(t)}function vc(){oo=!1,Dt!==null&&Ar(Dt)&&(Dt=null),zt!==null&&Ar(zt)&&(zt=null),Nt!==null&&Ar(Nt)&&(Nt=null),Qn.forEach(Eu),Xn.forEach(Eu)}function Yn(e,t){e.blockedOn===t&&(e.blockedOn=null,oo||(oo=!0,s.unstable_scheduleCallback(s.unstable_NormalPriority,vc)))}function Kn(e){function t(l){return Yn(l,e)}if(0<Lr.length){Yn(Lr[0],e);for(var n=1;n<Lr.length;n++){var r=Lr[n];r.blockedOn===e&&(r.blockedOn=null)}}for(Dt!==null&&Yn(Dt,e),zt!==null&&Yn(zt,e),Nt!==null&&Yn(Nt,e),Qn.forEach(t),Xn.forEach(t),n=0;n<Lt.length;n++)r=Lt[n],r.blockedOn===e&&(r.blockedOn=null);for(;0<Lt.length&&(n=Lt[0],n.blockedOn===null);)ku(n),n.blockedOn===null&&Lt.shift()}var hn=ue.ReactCurrentBatchConfig,Or=!0;function gc(e,t,n,r){var l=le,o=hn.transition;hn.transition=null;try{le=1,io(e,t,n,r)}finally{le=l,hn.transition=o}}function yc(e,t,n,r){var l=le,o=hn.transition;hn.transition=null;try{le=4,io(e,t,n,r)}finally{le=l,hn.transition=o}}function io(e,t,n,r){if(Or){var l=uo(e,t,n,r);if(l===null)Eo(e,t,r,jr,n),Cu(e,r);else if(hc(l,e,t,n,r))r.stopPropagation();else if(Cu(e,r),t&4&&-1<mc.indexOf(e)){for(;l!==null;){var o=sr(l);if(o!==null&&xu(o),o=uo(e,t,n,r),o===null&&Eo(e,t,r,jr,n),o===l)break;l=o}l!==null&&r.stopPropagation()}else Eo(e,t,r,null,n)}}var jr=null;function uo(e,t,n,r){if(jr=null,e=Yl(r),e=Zt(e),e!==null)if(t=qt(e),t===null)e=null;else if(n=t.tag,n===13){if(e=au(t),e!==null)return e;e=null}else if(n===3){if(t.stateNode.current.memoizedState.isDehydrated)return t.tag===3?t.stateNode.containerInfo:null;e=null}else t!==e&&(e=null);return jr=e,null}function Tu(e){switch(e){case"cancel":case"click":case"close":case"contextmenu":case"copy":case"cut":case"auxclick":case"dblclick":case"dragend":case"dragstart":case"drop":case"focusin":case"focusout":case"input":case"invalid":case"keydown":case"keypress":case"keyup":case"mousedown":case"mouseup":case"paste":case"pause":case"play":case"pointercancel":case"pointerdown":case"pointerup":case"ratechange":case"reset":case"resize":case"seeked":case"submit":case"touchcancel":case"touchend":case"touchstart":case"volumechange":case"change":case"selectionchange":case"textInput":case"compositionstart":case"compositionend":case"compositionupdate":case"beforeblur":case"afterblur":case"beforeinput":case"blur":case"fullscreenchange":case"focus":case"hashchange":case"popstate":case"select":case"selectstart":return 1;case"drag":case"dragenter":case"dragexit":case"dragleave":case"dragover":case"mousemove":case"mouseout":case"mouseover":case"pointermove":case"pointerout":case"pointerover":case"scroll":case"toggle":case"touchmove":case"wheel":case"mouseenter":case"mouseleave":case"pointerenter":case"pointerleave":return 4;case"message":switch(oc()){case eo:return 1;case hu:return 4;case Pr:case ic:return 16;case vu:return 536870912;default:return 16}default:return 16}}var At=null,so=null,Br=null;function Ru(){if(Br)return Br;var e,t=so,n=t.length,r,l="value"in At?At.value:At.textContent,o=l.length;for(e=0;e<n&&t[e]===l[e];e++);var u=n-e;for(r=1;r<=u&&t[n-r]===l[o-r];r++);return Br=l.slice(e,1<r?1-r:void 0)}function Ur(e){var t=e.keyCode;return"charCode"in e?(e=e.charCode,e===0&&t===13&&(e=13)):e=t,e===10&&(e=13),32<=e||e===13?e:0}function Vr(){return!0}function Iu(){return!1}function et(e){function t(n,r,l,o,u){this._reactName=n,this._targetInst=l,this.type=r,this.nativeEvent=o,this.target=u,this.currentTarget=null;for(var c in e)e.hasOwnProperty(c)&&(n=e[c],this[c]=n?n(o):o[c]);return this.isDefaultPrevented=(o.defaultPrevented!=null?o.defaultPrevented:o.returnValue===!1)?Vr:Iu,this.isPropagationStopped=Iu,this}return L(t.prototype,{preventDefault:function(){this.defaultPrevented=!0;var n=this.nativeEvent;n&&(n.preventDefault?n.preventDefault():typeof n.returnValue!="unknown"&&(n.returnValue=!1),this.isDefaultPrevented=Vr)},stopPropagation:function(){var n=this.nativeEvent;n&&(n.stopPropagation?n.stopPropagation():typeof n.cancelBubble!="unknown"&&(n.cancelBubble=!0),this.isPropagationStopped=Vr)},persist:function(){},isPersistent:Vr}),t}var vn={eventPhase:0,bubbles:0,cancelable:0,timeStamp:function(e){return e.timeStamp||Date.now()},defaultPrevented:0,isTrusted:0},ao=et(vn),qn=L({},vn,{view:0,detail:0}),xc=et(qn),co,fo,Zn,br=L({},qn,{screenX:0,screenY:0,clientX:0,clientY:0,pageX:0,pageY:0,ctrlKey:0,shiftKey:0,altKey:0,metaKey:0,getModifierState:mo,button:0,buttons:0,relatedTarget:function(e){return e.relatedTarget===void 0?e.fromElement===e.srcElement?e.toElement:e.fromElement:e.relatedTarget},movementX:function(e){return"movementX"in e?e.movementX:(e!==Zn&&(Zn&&e.type==="mousemove"?(co=e.screenX-Zn.screenX,fo=e.screenY-Zn.screenY):fo=co=0,Zn=e),co)},movementY:function(e){return"movementY"in e?e.movementY:fo}}),Fu=et(br),_c=L({},br,{dataTransfer:0}),wc=et(_c),Sc=L({},qn,{relatedTarget:0}),po=et(Sc),Cc=L({},vn,{animationName:0,elapsedTime:0,pseudoElement:0}),kc=et(Cc),Ec=L({},vn,{clipboardData:function(e){return"clipboardData"in e?e.clipboardData:window.clipboardData}}),Tc=et(Ec),Rc=L({},vn,{data:0}),Pu=et(Rc),Ic={Esc:"Escape",Spacebar:" ",Left:"ArrowLeft",Up:"ArrowUp",Right:"ArrowRight",Down:"ArrowDown",Del:"Delete",Win:"OS",Menu:"ContextMenu",Apps:"ContextMenu",Scroll:"ScrollLock",MozPrintableKey:"Unidentified"},Fc={8:"Backspace",9:"Tab",12:"Clear",13:"Enter",16:"Shift",17:"Control",18:"Alt",19:"Pause",20:"CapsLock",27:"Escape",32:" ",33:"PageUp",34:"PageDown",35:"End",36:"Home",37:"ArrowLeft",38:"ArrowUp",39:"ArrowRight",40:"ArrowDown",45:"Insert",46:"Delete",112:"F1",113:"F2",114:"F3",115:"F4",116:"F5",117:"F6",118:"F7",119:"F8",120:"F9",121:"F10",122:"F11",123:"F12",144:"NumLock",145:"ScrollLock",224:"Meta"},Pc={Alt:"altKey",Control:"ctrlKey",Meta:"metaKey",Shift:"shiftKey"};function Mc(e){var t=this.nativeEvent;return t.getModifierState?t.getModifierState(e):(e=Pc[e])?!!t[e]:!1}function mo(){return Mc}var Dc=L({},qn,{key:function(e){if(e.key){var t=Ic[e.key]||e.key;if(t!=="Unidentified")return t}return e.type==="keypress"?(e=Ur(e),e===13?"Enter":String.fromCharCode(e)):e.type==="keydown"||e.type==="keyup"?Fc[e.keyCode]||"Unidentified":""},code:0,location:0,ctrlKey:0,shiftKey:0,altKey:0,metaKey:0,repeat:0,locale:0,getModifierState:mo,charCode:function(e){return e.type==="keypress"?Ur(e):0},keyCode:function(e){return e.type==="keydown"||e.type==="keyup"?e.keyCode:0},which:function(e){return e.type==="keypress"?Ur(e):e.type==="keydown"||e.type==="keyup"?e.keyCode:0}}),zc=et(Dc),Nc=L({},br,{pointerId:0,width:0,height:0,pressure:0,tangentialPressure:0,tiltX:0,tiltY:0,twist:0,pointerType:0,isPrimary:0}),Mu=et(Nc),Lc=L({},qn,{touches:0,targetTouches:0,changedTouches:0,altKey:0,metaKey:0,ctrlKey:0,shiftKey:0,getModifierState:mo}),Ac=et(Lc),Oc=L({},vn,{propertyName:0,elapsedTime:0,pseudoElement:0}),jc=et(Oc),Bc=L({},br,{deltaX:function(e){return"deltaX"in e?e.deltaX:"wheelDeltaX"in e?-e.wheelDeltaX:0},deltaY:function(e){return"deltaY"in e?e.deltaY:"wheelDeltaY"in e?-e.wheelDeltaY:"wheelDelta"in e?-e.wheelDelta:0},deltaZ:0,deltaMode:0}),Uc=et(Bc),Vc=[9,13,27,32],ho=S&&"CompositionEvent"in window,Jn=null;S&&"documentMode"in document&&(Jn=document.documentMode);var bc=S&&"TextEvent"in window&&!Jn,Du=S&&(!ho||Jn&&8<Jn&&11>=Jn),zu=" ",Nu=!1;function Lu(e,t){switch(e){case"keyup":return Vc.indexOf(t.keyCode)!==-1;case"keydown":return t.keyCode!==229;case"keypress":case"mousedown":case"focusout":return!0;default:return!1}}function Au(e){return e=e.detail,typeof e=="object"&&"data"in e?e.data:null}var gn=!1;function Wc(e,t){switch(e){case"compositionend":return Au(t);case"keypress":return t.which!==32?null:(Nu=!0,zu);case"textInput":return e=t.data,e===zu&&Nu?null:e;default:return null}}function Hc(e,t){if(gn)return e==="compositionend"||!ho&&Lu(e,t)?(e=Ru(),Br=so=At=null,gn=!1,e):null;switch(e){case"paste":return null;case"keypress":if(!(t.ctrlKey||t.altKey||t.metaKey)||t.ctrlKey&&t.altKey){if(t.char&&1<t.char.length)return t.char;if(t.which)return String.fromCharCode(t.which)}return null;case"compositionend":return Du&&t.locale!=="ko"?null:t.data;default:return null}}var $c={color:!0,date:!0,datetime:!0,"datetime-local":!0,email:!0,month:!0,number:!0,password:!0,range:!0,search:!0,tel:!0,text:!0,time:!0,url:!0,week:!0};function Ou(e){var t=e&&e.nodeName&&e.nodeName.toLowerCase();return t==="input"?!!$c[e.type]:t==="textarea"}function ju(e,t,n,r){lu(r),t=Xr(t,"onChange"),0<t.length&&(n=new ao("onChange","change",null,n,r),e.push({event:n,listeners:t}))}var er=null,tr=null;function Qc(e){ns(e,0)}function Wr(e){var t=Sn(e);if(Qi(t))return e}function Xc(e,t){if(e==="change")return t}var Bu=!1;if(S){var vo;if(S){var go="oninput"in document;if(!go){var Uu=document.createElement("div");Uu.setAttribute("oninput","return;"),go=typeof Uu.oninput=="function"}vo=go}else vo=!1;Bu=vo&&(!document.documentMode||9<document.documentMode)}function Vu(){er&&(er.detachEvent("onpropertychange",bu),tr=er=null)}function bu(e){if(e.propertyName==="value"&&Wr(tr)){var t=[];ju(t,tr,e,Yl(e)),su(Qc,t)}}function Gc(e,t,n){e==="focusin"?(Vu(),er=t,tr=n,er.attachEvent("onpropertychange",bu)):e==="focusout"&&Vu()}function Yc(e){if(e==="selectionchange"||e==="keyup"||e==="keydown")return Wr(tr)}function Kc(e,t){if(e==="click")return Wr(t)}function qc(e,t){if(e==="input"||e==="change")return Wr(t)}function Zc(e,t){return e===t&&(e!==0||1/e===1/t)||e!==e&&t!==t}var ft=typeof Object.is=="function"?Object.is:Zc;function nr(e,t){if(ft(e,t))return!0;if(typeof e!="object"||e===null||typeof t!="object"||t===null)return!1;var n=Object.keys(e),r=Object.keys(t);if(n.length!==r.length)return!1;for(r=0;r<n.length;r++){var l=n[r];if(!T.call(t,l)||!ft(e[l],t[l]))return!1}return!0}function Wu(e){for(;e&&e.firstChild;)e=e.firstChild;return e}function Hu(e,t){var n=Wu(e);e=0;for(var r;n;){if(n.nodeType===3){if(r=e+n.textContent.length,e<=t&&r>=t)return{node:n,offset:t-e};e=r}e:{for(;n;){if(n.nextSibling){n=n.nextSibling;break e}n=n.parentNode}n=void 0}n=Wu(n)}}function $u(e,t){return e&&t?e===t?!0:e&&e.nodeType===3?!1:t&&t.nodeType===3?$u(e,t.parentNode):"contains"in e?e.contains(t):e.compareDocumentPosition?!!(e.compareDocumentPosition(t)&16):!1:!1}function Qu(){for(var e=window,t=Tr();t instanceof e.HTMLIFrameElement;){try{var n=typeof t.contentWindow.location.href=="string"}catch{n=!1}if(n)e=t.contentWindow;else break;t=Tr(e.document)}return t}function yo(e){var t=e&&e.nodeName&&e.nodeName.toLowerCase();return t&&(t==="input"&&(e.type==="text"||e.type==="search"||e.type==="tel"||e.type==="url"||e.type==="password")||t==="textarea"||e.contentEditable==="true")}function Jc(e){var t=Qu(),n=e.focusedElem,r=e.selectionRange;if(t!==n&&n&&n.ownerDocument&&$u(n.ownerDocument.documentElement,n)){if(r!==null&&yo(n)){if(t=r.start,e=r.end,e===void 0&&(e=t),"selectionStart"in n)n.selectionStart=t,n.selectionEnd=Math.min(e,n.value.length);else if(e=(t=n.ownerDocument||document)&&t.defaultView||window,e.getSelection){e=e.getSelection();var l=n.textContent.length,o=Math.min(r.start,l);r=r.end===void 0?o:Math.min(r.end,l),!e.extend&&o>r&&(l=r,r=o,o=l),l=Hu(n,o);var u=Hu(n,r);l&&u&&(e.rangeCount!==1||e.anchorNode!==l.node||e.anchorOffset!==l.offset||e.focusNode!==u.node||e.focusOffset!==u.offset)&&(t=t.createRange(),t.setStart(l.node,l.offset),e.removeAllRanges(),o>r?(e.addRange(t),e.extend(u.node,u.offset)):(t.setEnd(u.node,u.offset),e.addRange(t)))}}for(t=[],e=n;e=e.parentNode;)e.nodeType===1&&t.push({element:e,left:e.scrollLeft,top:e.scrollTop});for(typeof n.focus=="function"&&n.focus(),n=0;n<t.length;n++)e=t[n],e.element.scrollLeft=e.left,e.element.scrollTop=e.top}}var ef=S&&"documentMode"in document&&11>=document.documentMode,yn=null,xo=null,rr=null,_o=!1;function Xu(e,t,n){var r=n.window===n?n.document:n.nodeType===9?n:n.ownerDocument;_o||yn==null||yn!==Tr(r)||(r=yn,"selectionStart"in r&&yo(r)?r={start:r.selectionStart,end:r.selectionEnd}:(r=(r.ownerDocument&&r.ownerDocument.defaultView||window).getSelection(),r={anchorNode:r.anchorNode,anchorOffset:r.anchorOffset,focusNode:r.focusNode,focusOffset:r.focusOffset}),rr&&nr(rr,r)||(rr=r,r=Xr(xo,"onSelect"),0<r.length&&(t=new ao("onSelect","select",null,t,n),e.push({event:t,listeners:r}),t.target=yn)))}function Hr(e,t){var n={};return n[e.toLowerCase()]=t.toLowerCase(),n["Webkit"+e]="webkit"+t,n["Moz"+e]="moz"+t,n}var xn={animationend:Hr("Animation","AnimationEnd"),animationiteration:Hr("Animation","AnimationIteration"),animationstart:Hr("Animation","AnimationStart"),transitionend:Hr("Transition","TransitionEnd")},wo={},Gu={};S&&(Gu=document.createElement("div").style,"AnimationEvent"in window||(delete xn.animationend.animation,delete xn.animationiteration.animation,delete xn.animationstart.animation),"TransitionEvent"in window||delete xn.transitionend.transition);function $r(e){if(wo[e])return wo[e];if(!xn[e])return e;var t=xn[e],n;for(n in t)if(t.hasOwnProperty(n)&&n in Gu)return wo[e]=t[n];return e}var Yu=$r("animationend"),Ku=$r("animationiteration"),qu=$r("animationstart"),Zu=$r("transitionend"),Ju=new Map,es="abort auxClick cancel canPlay canPlayThrough click close contextMenu copy cut drag dragEnd dragEnter dragExit dragLeave dragOver dragStart drop durationChange emptied encrypted ended error gotPointerCapture input invalid keyDown keyPress keyUp load loadedData loadedMetadata loadStart lostPointerCapture mouseDown mouseMove mouseOut mouseOver mouseUp paste pause play playing pointerCancel pointerDown pointerMove pointerOut pointerOver pointerUp progress rateChange reset resize seeked seeking stalled submit suspend timeUpdate touchCancel touchEnd touchStart volumeChange scroll toggle touchMove waiting wheel".split(" ");function Ot(e,t){Ju.set(e,t),y(t,[e])}for(var So=0;So<es.length;So++){var Co=es[So],tf=Co.toLowerCase(),nf=Co[0].toUpperCase()+Co.slice(1);Ot(tf,"on"+nf)}Ot(Yu,"onAnimationEnd"),Ot(Ku,"onAnimationIteration"),Ot(qu,"onAnimationStart"),Ot("dblclick","onDoubleClick"),Ot("focusin","onFocus"),Ot("focusout","onBlur"),Ot(Zu,"onTransitionEnd"),w("onMouseEnter",["mouseout","mouseover"]),w("onMouseLeave",["mouseout","mouseover"]),w("onPointerEnter",["pointerout","pointerover"]),w("onPointerLeave",["pointerout","pointerover"]),y("onChange","change click focusin focusout input keydown keyup selectionchange".split(" ")),y("onSelect","focusout contextmenu dragend focusin keydown keyup mousedown mouseup selectionchange".split(" ")),y("onBeforeInput",["compositionend","keypress","textInput","paste"]),y("onCompositionEnd","compositionend focusout keydown keypress keyup mousedown".split(" ")),y("onCompositionStart","compositionstart focusout keydown keypress keyup mousedown".split(" ")),y("onCompositionUpdate","compositionupdate focusout keydown keypress keyup mousedown".split(" "));var lr="abort canplay canplaythrough durationchange emptied encrypted ended error loadeddata loadedmetadata loadstart pause play playing progress ratechange resize seeked seeking stalled suspend timeupdate volumechange waiting".split(" "),rf=new Set("cancel close invalid load scroll toggle".split(" ").concat(lr));function ts(e,t,n){var r=e.type||"unknown-event";e.currentTarget=n,tc(r,t,void 0,e),e.currentTarget=null}function ns(e,t){t=(t&4)!==0;for(var n=0;n<e.length;n++){var r=e[n],l=r.event;r=r.listeners;e:{var o=void 0;if(t)for(var u=r.length-1;0<=u;u--){var c=r[u],d=c.instance,_=c.currentTarget;if(c=c.listener,d!==o&&l.isPropagationStopped())break e;ts(l,c,_),o=d}else for(u=0;u<r.length;u++){if(c=r[u],d=c.instance,_=c.currentTarget,c=c.listener,d!==o&&l.isPropagationStopped())break e;ts(l,c,_),o=d}}}if(Fr)throw e=Jl,Fr=!1,Jl=null,e}function de(e,t){var n=t[Mo];n===void 0&&(n=t[Mo]=new Set);var r=e+"__bubble";n.has(r)||(rs(t,e,2,!1),n.add(r))}function ko(e,t,n){var r=0;t&&(r|=4),rs(n,e,r,t)}var Qr="_reactListening"+Math.random().toString(36).slice(2);function or(e){if(!e[Qr]){e[Qr]=!0,a.forEach(function(n){n!=="selectionchange"&&(rf.has(n)||ko(n,!1,e),ko(n,!0,e))});var t=e.nodeType===9?e:e.ownerDocument;t===null||t[Qr]||(t[Qr]=!0,ko("selectionchange",!1,t))}}function rs(e,t,n,r){switch(Tu(t)){case 1:var l=gc;break;case 4:l=yc;break;default:l=io}n=l.bind(null,t,n,e),l=void 0,!Zl||t!=="touchstart"&&t!=="touchmove"&&t!=="wheel"||(l=!0),r?l!==void 0?e.addEventListener(t,n,{capture:!0,passive:l}):e.addEventListener(t,n,!0):l!==void 0?e.addEventListener(t,n,{passive:l}):e.addEventListener(t,n,!1)}function Eo(e,t,n,r,l){var o=r;if((t&1)===0&&(t&2)===0&&r!==null)e:for(;;){if(r===null)return;var u=r.tag;if(u===3||u===4){var c=r.stateNode.containerInfo;if(c===l||c.nodeType===8&&c.parentNode===l)break;if(u===4)for(u=r.return;u!==null;){var d=u.tag;if((d===3||d===4)&&(d=u.stateNode.containerInfo,d===l||d.nodeType===8&&d.parentNode===l))return;u=u.return}for(;c!==null;){if(u=Zt(c),u===null)return;if(d=u.tag,d===5||d===6){r=o=u;continue e}c=c.parentNode}}r=r.return}su(function(){var _=o,E=Yl(n),R=[];e:{var C=Ju.get(e);if(C!==void 0){var N=ao,O=e;switch(e){case"keypress":if(Ur(n)===0)break e;case"keydown":case"keyup":N=zc;break;case"focusin":O="focus",N=po;break;case"focusout":O="blur",N=po;break;case"beforeblur":case"afterblur":N=po;break;case"click":if(n.button===2)break e;case"auxclick":case"dblclick":case"mousedown":case"mousemove":case"mouseup":case"mouseout":case"mouseover":case"contextmenu":N=Fu;break;case"drag":case"dragend":case"dragenter":case"dragexit":case"dragleave":case"dragover":case"dragstart":case"drop":N=wc;break;case"touchcancel":case"touchend":case"touchmove":case"touchstart":N=Ac;break;case Yu:case Ku:case qu:N=kc;break;case Zu:N=jc;break;case"scroll":N=xc;break;case"wheel":N=Uc;break;case"copy":case"cut":case"paste":N=Tc;break;case"gotpointercapture":case"lostpointercapture":case"pointercancel":case"pointerdown":case"pointermove":case"pointerout":case"pointerover":case"pointerup":N=Mu}var j=(t&4)!==0,Ce=!j&&e==="scroll",v=j?C!==null?C+"Capture":null:C;j=[];for(var m=_,x;m!==null;){x=m;var F=x.stateNode;if(x.tag===5&&F!==null&&(x=F,v!==null&&(F=Vn(m,v),F!=null&&j.push(ir(m,F,x)))),Ce)break;m=m.return}0<j.length&&(C=new N(C,O,null,n,E),R.push({event:C,listeners:j}))}}if((t&7)===0){e:{if(C=e==="mouseover"||e==="pointerover",N=e==="mouseout"||e==="pointerout",C&&n!==Gl&&(O=n.relatedTarget||n.fromElement)&&(Zt(O)||O[St]))break e;if((N||C)&&(C=E.window===E?E:(C=E.ownerDocument)?C.defaultView||C.parentWindow:window,N?(O=n.relatedTarget||n.toElement,N=_,O=O?Zt(O):null,O!==null&&(Ce=qt(O),O!==Ce||O.tag!==5&&O.tag!==6)&&(O=null)):(N=null,O=_),N!==O)){if(j=Fu,F="onMouseLeave",v="onMouseEnter",m="mouse",(e==="pointerout"||e==="pointerover")&&(j=Mu,F="onPointerLeave",v="onPointerEnter",m="pointer"),Ce=N==null?C:Sn(N),x=O==null?C:Sn(O),C=new j(F,m+"leave",N,n,E),C.target=Ce,C.relatedTarget=x,F=null,Zt(E)===_&&(j=new j(v,m+"enter",O,n,E),j.target=x,j.relatedTarget=Ce,F=j),Ce=F,N&&O)t:{for(j=N,v=O,m=0,x=j;x;x=_n(x))m++;for(x=0,F=v;F;F=_n(F))x++;for(;0<m-x;)j=_n(j),m--;for(;0<x-m;)v=_n(v),x--;for(;m--;){if(j===v||v!==null&&j===v.alternate)break t;j=_n(j),v=_n(v)}j=null}else j=null;N!==null&&ls(R,C,N,j,!1),O!==null&&Ce!==null&&ls(R,Ce,O,j,!0)}}e:{if(C=_?Sn(_):window,N=C.nodeName&&C.nodeName.toLowerCase(),N==="select"||N==="input"&&C.type==="file")var B=Xc;else if(Ou(C))if(Bu)B=qc;else{B=Yc;var V=Gc}else(N=C.nodeName)&&N.toLowerCase()==="input"&&(C.type==="checkbox"||C.type==="radio")&&(B=Kc);if(B&&(B=B(e,_))){ju(R,B,n,E);break e}V&&V(e,C,_),e==="focusout"&&(V=C._wrapperState)&&V.controlled&&C.type==="number"&&Wl(C,"number",C.value)}switch(V=_?Sn(_):window,e){case"focusin":(Ou(V)||V.contentEditable==="true")&&(yn=V,xo=_,rr=null);break;case"focusout":rr=xo=yn=null;break;case"mousedown":_o=!0;break;case"contextmenu":case"mouseup":case"dragend":_o=!1,Xu(R,n,E);break;case"selectionchange":if(ef)break;case"keydown":case"keyup":Xu(R,n,E)}var b;if(ho)e:{switch(e){case"compositionstart":var H="onCompositionStart";break e;case"compositionend":H="onCompositionEnd";break e;case"compositionupdate":H="onCompositionUpdate";break e}H=void 0}else gn?Lu(e,n)&&(H="onCompositionEnd"):e==="keydown"&&n.keyCode===229&&(H="onCompositionStart");H&&(Du&&n.locale!=="ko"&&(gn||H!=="onCompositionStart"?H==="onCompositionEnd"&&gn&&(b=Ru()):(At=E,so="value"in At?At.value:At.textContent,gn=!0)),V=Xr(_,H),0<V.length&&(H=new Pu(H,e,null,n,E),R.push({event:H,listeners:V}),b?H.data=b:(b=Au(n),b!==null&&(H.data=b)))),(b=bc?Wc(e,n):Hc(e,n))&&(_=Xr(_,"onBeforeInput"),0<_.length&&(E=new Pu("onBeforeInput","beforeinput",null,n,E),R.push({event:E,listeners:_}),E.data=b))}ns(R,t)})}function ir(e,t,n){return{instance:e,listener:t,currentTarget:n}}function Xr(e,t){for(var n=t+"Capture",r=[];e!==null;){var l=e,o=l.stateNode;l.tag===5&&o!==null&&(l=o,o=Vn(e,n),o!=null&&r.unshift(ir(e,o,l)),o=Vn(e,t),o!=null&&r.push(ir(e,o,l))),e=e.return}return r}function _n(e){if(e===null)return null;do e=e.return;while(e&&e.tag!==5);return e||null}function ls(e,t,n,r,l){for(var o=t._reactName,u=[];n!==null&&n!==r;){var c=n,d=c.alternate,_=c.stateNode;if(d!==null&&d===r)break;c.tag===5&&_!==null&&(c=_,l?(d=Vn(n,o),d!=null&&u.unshift(ir(n,d,c))):l||(d=Vn(n,o),d!=null&&u.push(ir(n,d,c)))),n=n.return}u.length!==0&&e.push({event:t,listeners:u})}var lf=/\r\n?/g,of=/\u0000|\uFFFD/g;function os(e){return(typeof e=="string"?e:""+e).replace(lf,`
`).replace(of,"")}function Gr(e,t,n){if(t=os(t),os(e)!==t&&n)throw Error(i(425))}function Yr(){}var To=null,Ro=null;function Io(e,t){return e==="textarea"||e==="noscript"||typeof t.children=="string"||typeof t.children=="number"||typeof t.dangerouslySetInnerHTML=="object"&&t.dangerouslySetInnerHTML!==null&&t.dangerouslySetInnerHTML.__html!=null}var Fo=typeof setTimeout=="function"?setTimeout:void 0,uf=typeof clearTimeout=="function"?clearTimeout:void 0,is=typeof Promise=="function"?Promise:void 0,sf=typeof queueMicrotask=="function"?queueMicrotask:typeof is<"u"?function(e){return is.resolve(null).then(e).catch(af)}:Fo;function af(e){setTimeout(function(){throw e})}function Po(e,t){var n=t,r=0;do{var l=n.nextSibling;if(e.removeChild(n),l&&l.nodeType===8)if(n=l.data,n==="/$"){if(r===0){e.removeChild(l),Kn(t);return}r--}else n!=="$"&&n!=="$?"&&n!=="$!"||r++;n=l}while(n);Kn(t)}function jt(e){for(;e!=null;e=e.nextSibling){var t=e.nodeType;if(t===1||t===3)break;if(t===8){if(t=e.data,t==="$"||t==="$!"||t==="$?")break;if(t==="/$")return null}}return e}function us(e){e=e.previousSibling;for(var t=0;e;){if(e.nodeType===8){var n=e.data;if(n==="$"||n==="$!"||n==="$?"){if(t===0)return e;t--}else n==="/$"&&t++}e=e.previousSibling}return null}var wn=Math.random().toString(36).slice(2),yt="__reactFiber$"+wn,ur="__reactProps$"+wn,St="__reactContainer$"+wn,Mo="__reactEvents$"+wn,cf="__reactListeners$"+wn,ff="__reactHandles$"+wn;function Zt(e){var t=e[yt];if(t)return t;for(var n=e.parentNode;n;){if(t=n[St]||n[yt]){if(n=t.alternate,t.child!==null||n!==null&&n.child!==null)for(e=us(e);e!==null;){if(n=e[yt])return n;e=us(e)}return t}e=n,n=e.parentNode}return null}function sr(e){return e=e[yt]||e[St],!e||e.tag!==5&&e.tag!==6&&e.tag!==13&&e.tag!==3?null:e}function Sn(e){if(e.tag===5||e.tag===6)return e.stateNode;throw Error(i(33))}function Kr(e){return e[ur]||null}var Do=[],Cn=-1;function Bt(e){return{current:e}}function pe(e){0>Cn||(e.current=Do[Cn],Do[Cn]=null,Cn--)}function ce(e,t){Cn++,Do[Cn]=e.current,e.current=t}var Ut={},je=Bt(Ut),Xe=Bt(!1),Jt=Ut;function kn(e,t){var n=e.type.contextTypes;if(!n)return Ut;var r=e.stateNode;if(r&&r.__reactInternalMemoizedUnmaskedChildContext===t)return r.__reactInternalMemoizedMaskedChildContext;var l={},o;for(o in n)l[o]=t[o];return r&&(e=e.stateNode,e.__reactInternalMemoizedUnmaskedChildContext=t,e.__reactInternalMemoizedMaskedChildContext=l),l}function Ge(e){return e=e.childContextTypes,e!=null}function qr(){pe(Xe),pe(je)}function ss(e,t,n){if(je.current!==Ut)throw Error(i(168));ce(je,t),ce(Xe,n)}function as(e,t,n){var r=e.stateNode;if(t=t.childContextTypes,typeof r.getChildContext!="function")return n;r=r.getChildContext();for(var l in r)if(!(l in t))throw Error(i(108,ae(e)||"Unknown",l));return L({},n,r)}function Zr(e){return e=(e=e.stateNode)&&e.__reactInternalMemoizedMergedChildContext||Ut,Jt=je.current,ce(je,e),ce(Xe,Xe.current),!0}function cs(e,t,n){var r=e.stateNode;if(!r)throw Error(i(169));n?(e=as(e,t,Jt),r.__reactInternalMemoizedMergedChildContext=e,pe(Xe),pe(je),ce(je,e)):pe(Xe),ce(Xe,n)}var Ct=null,Jr=!1,zo=!1;function fs(e){Ct===null?Ct=[e]:Ct.push(e)}function df(e){Jr=!0,fs(e)}function Vt(){if(!zo&&Ct!==null){zo=!0;var e=0,t=le;try{var n=Ct;for(le=1;e<n.length;e++){var r=n[e];do r=r(!0);while(r!==null)}Ct=null,Jr=!1}catch(l){throw Ct!==null&&(Ct=Ct.slice(e+1)),pu(eo,Vt),l}finally{le=t,zo=!1}}return null}var En=[],Tn=0,el=null,tl=0,lt=[],ot=0,en=null,kt=1,Et="";function tn(e,t){En[Tn++]=tl,En[Tn++]=el,el=e,tl=t}function ds(e,t,n){lt[ot++]=kt,lt[ot++]=Et,lt[ot++]=en,en=e;var r=kt;e=Et;var l=32-ct(r)-1;r&=~(1<<l),n+=1;var o=32-ct(t)+l;if(30<o){var u=l-l%5;o=(r&(1<<u)-1).toString(32),r>>=u,l-=u,kt=1<<32-ct(t)+l|n<<l|r,Et=o+e}else kt=1<<o|n<<l|r,Et=e}function No(e){e.return!==null&&(tn(e,1),ds(e,1,0))}function Lo(e){for(;e===el;)el=En[--Tn],En[Tn]=null,tl=En[--Tn],En[Tn]=null;for(;e===en;)en=lt[--ot],lt[ot]=null,Et=lt[--ot],lt[ot]=null,kt=lt[--ot],lt[ot]=null}var tt=null,nt=null,he=!1,dt=null;function ps(e,t){var n=at(5,null,null,0);n.elementType="DELETED",n.stateNode=t,n.return=e,t=e.deletions,t===null?(e.deletions=[n],e.flags|=16):t.push(n)}function ms(e,t){switch(e.tag){case 5:var n=e.type;return t=t.nodeType!==1||n.toLowerCase()!==t.nodeName.toLowerCase()?null:t,t!==null?(e.stateNode=t,tt=e,nt=jt(t.firstChild),!0):!1;case 6:return t=e.pendingProps===""||t.nodeType!==3?null:t,t!==null?(e.stateNode=t,tt=e,nt=null,!0):!1;case 13:return t=t.nodeType!==8?null:t,t!==null?(n=en!==null?{id:kt,overflow:Et}:null,e.memoizedState={dehydrated:t,treeContext:n,retryLane:1073741824},n=at(18,null,null,0),n.stateNode=t,n.return=e,e.child=n,tt=e,nt=null,!0):!1;default:return!1}}function Ao(e){return(e.mode&1)!==0&&(e.flags&128)===0}function Oo(e){if(he){var t=nt;if(t){var n=t;if(!ms(e,t)){if(Ao(e))throw Error(i(418));t=jt(n.nextSibling);var r=tt;t&&ms(e,t)?ps(r,n):(e.flags=e.flags&-4097|2,he=!1,tt=e)}}else{if(Ao(e))throw Error(i(418));e.flags=e.flags&-4097|2,he=!1,tt=e}}}function hs(e){for(e=e.return;e!==null&&e.tag!==5&&e.tag!==3&&e.tag!==13;)e=e.return;tt=e}function nl(e){if(e!==tt)return!1;if(!he)return hs(e),he=!0,!1;var t;if((t=e.tag!==3)&&!(t=e.tag!==5)&&(t=e.type,t=t!=="head"&&t!=="body"&&!Io(e.type,e.memoizedProps)),t&&(t=nt)){if(Ao(e))throw vs(),Error(i(418));for(;t;)ps(e,t),t=jt(t.nextSibling)}if(hs(e),e.tag===13){if(e=e.memoizedState,e=e!==null?e.dehydrated:null,!e)throw Error(i(317));e:{for(e=e.nextSibling,t=0;e;){if(e.nodeType===8){var n=e.data;if(n==="/$"){if(t===0){nt=jt(e.nextSibling);break e}t--}else n!=="$"&&n!=="$!"&&n!=="$?"||t++}e=e.nextSibling}nt=null}}else nt=tt?jt(e.stateNode.nextSibling):null;return!0}function vs(){for(var e=nt;e;)e=jt(e.nextSibling)}function Rn(){nt=tt=null,he=!1}function jo(e){dt===null?dt=[e]:dt.push(e)}var pf=ue.ReactCurrentBatchConfig;function ar(e,t,n){if(e=n.ref,e!==null&&typeof e!="function"&&typeof e!="object"){if(n._owner){if(n=n._owner,n){if(n.tag!==1)throw Error(i(309));var r=n.stateNode}if(!r)throw Error(i(147,e));var l=r,o=""+e;return t!==null&&t.ref!==null&&typeof t.ref=="function"&&t.ref._stringRef===o?t.ref:(t=function(u){var c=l.refs;u===null?delete c[o]:c[o]=u},t._stringRef=o,t)}if(typeof e!="string")throw Error(i(284));if(!n._owner)throw Error(i(290,e))}return e}function rl(e,t){throw e=Object.prototype.toString.call(t),Error(i(31,e==="[object Object]"?"object with keys {"+Object.keys(t).join(", ")+"}":e))}function gs(e){var t=e._init;return t(e._payload)}function ys(e){function t(v,m){if(e){var x=v.deletions;x===null?(v.deletions=[m],v.flags|=16):x.push(m)}}function n(v,m){if(!e)return null;for(;m!==null;)t(v,m),m=m.sibling;return null}function r(v,m){for(v=new Map;m!==null;)m.key!==null?v.set(m.key,m):v.set(m.index,m),m=m.sibling;return v}function l(v,m){return v=Yt(v,m),v.index=0,v.sibling=null,v}function o(v,m,x){return v.index=x,e?(x=v.alternate,x!==null?(x=x.index,x<m?(v.flags|=2,m):x):(v.flags|=2,m)):(v.flags|=1048576,m)}function u(v){return e&&v.alternate===null&&(v.flags|=2),v}function c(v,m,x,F){return m===null||m.tag!==6?(m=Fi(x,v.mode,F),m.return=v,m):(m=l(m,x),m.return=v,m)}function d(v,m,x,F){var B=x.type;return B===oe?E(v,m,x.props.children,F,x.key):m!==null&&(m.elementType===B||typeof B=="object"&&B!==null&&B.$$typeof===Fe&&gs(B)===m.type)?(F=l(m,x.props),F.ref=ar(v,m,x),F.return=v,F):(F=Rl(x.type,x.key,x.props,null,v.mode,F),F.ref=ar(v,m,x),F.return=v,F)}function _(v,m,x,F){return m===null||m.tag!==4||m.stateNode.containerInfo!==x.containerInfo||m.stateNode.implementation!==x.implementation?(m=Pi(x,v.mode,F),m.return=v,m):(m=l(m,x.children||[]),m.return=v,m)}function E(v,m,x,F,B){return m===null||m.tag!==7?(m=cn(x,v.mode,F,B),m.return=v,m):(m=l(m,x),m.return=v,m)}function R(v,m,x){if(typeof m=="string"&&m!==""||typeof m=="number")return m=Fi(""+m,v.mode,x),m.return=v,m;if(typeof m=="object"&&m!==null){switch(m.$$typeof){case ze:return x=Rl(m.type,m.key,m.props,null,v.mode,x),x.ref=ar(v,null,m),x.return=v,x;case se:return m=Pi(m,v.mode,x),m.return=v,m;case Fe:var F=m._init;return R(v,F(m._payload),x)}if(jn(m)||U(m))return m=cn(m,v.mode,x,null),m.return=v,m;rl(v,m)}return null}function C(v,m,x,F){var B=m!==null?m.key:null;if(typeof x=="string"&&x!==""||typeof x=="number")return B!==null?null:c(v,m,""+x,F);if(typeof x=="object"&&x!==null){switch(x.$$typeof){case ze:return x.key===B?d(v,m,x,F):null;case se:return x.key===B?_(v,m,x,F):null;case Fe:return B=x._init,C(v,m,B(x._payload),F)}if(jn(x)||U(x))return B!==null?null:E(v,m,x,F,null);rl(v,x)}return null}function N(v,m,x,F,B){if(typeof F=="string"&&F!==""||typeof F=="number")return v=v.get(x)||null,c(m,v,""+F,B);if(typeof F=="object"&&F!==null){switch(F.$$typeof){case ze:return v=v.get(F.key===null?x:F.key)||null,d(m,v,F,B);case se:return v=v.get(F.key===null?x:F.key)||null,_(m,v,F,B);case Fe:var V=F._init;return N(v,m,x,V(F._payload),B)}if(jn(F)||U(F))return v=v.get(x)||null,E(m,v,F,B,null);rl(m,F)}return null}function O(v,m,x,F){for(var B=null,V=null,b=m,H=m=0,De=null;b!==null&&H<x.length;H++){b.index>H?(De=b,b=null):De=b.sibling;var ee=C(v,b,x[H],F);if(ee===null){b===null&&(b=De);break}e&&b&&ee.alternate===null&&t(v,b),m=o(ee,m,H),V===null?B=ee:V.sibling=ee,V=ee,b=De}if(H===x.length)return n(v,b),he&&tn(v,H),B;if(b===null){for(;H<x.length;H++)b=R(v,x[H],F),b!==null&&(m=o(b,m,H),V===null?B=b:V.sibling=b,V=b);return he&&tn(v,H),B}for(b=r(v,b);H<x.length;H++)De=N(b,v,H,x[H],F),De!==null&&(e&&De.alternate!==null&&b.delete(De.key===null?H:De.key),m=o(De,m,H),V===null?B=De:V.sibling=De,V=De);return e&&b.forEach(function(Kt){return t(v,Kt)}),he&&tn(v,H),B}function j(v,m,x,F){var B=U(x);if(typeof B!="function")throw Error(i(150));if(x=B.call(x),x==null)throw Error(i(151));for(var V=B=null,b=m,H=m=0,De=null,ee=x.next();b!==null&&!ee.done;H++,ee=x.next()){b.index>H?(De=b,b=null):De=b.sibling;var Kt=C(v,b,ee.value,F);if(Kt===null){b===null&&(b=De);break}e&&b&&Kt.alternate===null&&t(v,b),m=o(Kt,m,H),V===null?B=Kt:V.sibling=Kt,V=Kt,b=De}if(ee.done)return n(v,b),he&&tn(v,H),B;if(b===null){for(;!ee.done;H++,ee=x.next())ee=R(v,ee.value,F),ee!==null&&(m=o(ee,m,H),V===null?B=ee:V.sibling=ee,V=ee);return he&&tn(v,H),B}for(b=r(v,b);!ee.done;H++,ee=x.next())ee=N(b,v,H,ee.value,F),ee!==null&&(e&&ee.alternate!==null&&b.delete(ee.key===null?H:ee.key),m=o(ee,m,H),V===null?B=ee:V.sibling=ee,V=ee);return e&&b.forEach(function(Qf){return t(v,Qf)}),he&&tn(v,H),B}function Ce(v,m,x,F){if(typeof x=="object"&&x!==null&&x.type===oe&&x.key===null&&(x=x.props.children),typeof x=="object"&&x!==null){switch(x.$$typeof){case ze:e:{for(var B=x.key,V=m;V!==null;){if(V.key===B){if(B=x.type,B===oe){if(V.tag===7){n(v,V.sibling),m=l(V,x.props.children),m.return=v,v=m;break e}}else if(V.elementType===B||typeof B=="object"&&B!==null&&B.$$typeof===Fe&&gs(B)===V.type){n(v,V.sibling),m=l(V,x.props),m.ref=ar(v,V,x),m.return=v,v=m;break e}n(v,V);break}else t(v,V);V=V.sibling}x.type===oe?(m=cn(x.props.children,v.mode,F,x.key),m.return=v,v=m):(F=Rl(x.type,x.key,x.props,null,v.mode,F),F.ref=ar(v,m,x),F.return=v,v=F)}return u(v);case se:e:{for(V=x.key;m!==null;){if(m.key===V)if(m.tag===4&&m.stateNode.containerInfo===x.containerInfo&&m.stateNode.implementation===x.implementation){n(v,m.sibling),m=l(m,x.children||[]),m.return=v,v=m;break e}else{n(v,m);break}else t(v,m);m=m.sibling}m=Pi(x,v.mode,F),m.return=v,v=m}return u(v);case Fe:return V=x._init,Ce(v,m,V(x._payload),F)}if(jn(x))return O(v,m,x,F);if(U(x))return j(v,m,x,F);rl(v,x)}return typeof x=="string"&&x!==""||typeof x=="number"?(x=""+x,m!==null&&m.tag===6?(n(v,m.sibling),m=l(m,x),m.return=v,v=m):(n(v,m),m=Fi(x,v.mode,F),m.return=v,v=m),u(v)):n(v,m)}return Ce}var In=ys(!0),xs=ys(!1),ll=Bt(null),ol=null,Fn=null,Bo=null;function Uo(){Bo=Fn=ol=null}function Vo(e){var t=ll.current;pe(ll),e._currentValue=t}function bo(e,t,n){for(;e!==null;){var r=e.alternate;if((e.childLanes&t)!==t?(e.childLanes|=t,r!==null&&(r.childLanes|=t)):r!==null&&(r.childLanes&t)!==t&&(r.childLanes|=t),e===n)break;e=e.return}}function Pn(e,t){ol=e,Bo=Fn=null,e=e.dependencies,e!==null&&e.firstContext!==null&&((e.lanes&t)!==0&&(Ye=!0),e.firstContext=null)}function it(e){var t=e._currentValue;if(Bo!==e)if(e={context:e,memoizedValue:t,next:null},Fn===null){if(ol===null)throw Error(i(308));Fn=e,ol.dependencies={lanes:0,firstContext:e}}else Fn=Fn.next=e;return t}var nn=null;function Wo(e){nn===null?nn=[e]:nn.push(e)}function _s(e,t,n,r){var l=t.interleaved;return l===null?(n.next=n,Wo(t)):(n.next=l.next,l.next=n),t.interleaved=n,Tt(e,r)}function Tt(e,t){e.lanes|=t;var n=e.alternate;for(n!==null&&(n.lanes|=t),n=e,e=e.return;e!==null;)e.childLanes|=t,n=e.alternate,n!==null&&(n.childLanes|=t),n=e,e=e.return;return n.tag===3?n.stateNode:null}var bt=!1;function Ho(e){e.updateQueue={baseState:e.memoizedState,firstBaseUpdate:null,lastBaseUpdate:null,shared:{pending:null,interleaved:null,lanes:0},effects:null}}function ws(e,t){e=e.updateQueue,t.updateQueue===e&&(t.updateQueue={baseState:e.baseState,firstBaseUpdate:e.firstBaseUpdate,lastBaseUpdate:e.lastBaseUpdate,shared:e.shared,effects:e.effects})}function Rt(e,t){return{eventTime:e,lane:t,tag:0,payload:null,callback:null,next:null}}function Wt(e,t,n){var r=e.updateQueue;if(r===null)return null;if(r=r.shared,(q&2)!==0){var l=r.pending;return l===null?t.next=t:(t.next=l.next,l.next=t),r.pending=t,Tt(e,n)}return l=r.interleaved,l===null?(t.next=t,Wo(r)):(t.next=l.next,l.next=t),r.interleaved=t,Tt(e,n)}function il(e,t,n){if(t=t.updateQueue,t!==null&&(t=t.shared,(n&4194240)!==0)){var r=t.lanes;r&=e.pendingLanes,n|=r,t.lanes=n,ro(e,n)}}function Ss(e,t){var n=e.updateQueue,r=e.alternate;if(r!==null&&(r=r.updateQueue,n===r)){var l=null,o=null;if(n=n.firstBaseUpdate,n!==null){do{var u={eventTime:n.eventTime,lane:n.lane,tag:n.tag,payload:n.payload,callback:n.callback,next:null};o===null?l=o=u:o=o.next=u,n=n.next}while(n!==null);o===null?l=o=t:o=o.next=t}else l=o=t;n={baseState:r.baseState,firstBaseUpdate:l,lastBaseUpdate:o,shared:r.shared,effects:r.effects},e.updateQueue=n;return}e=n.lastBaseUpdate,e===null?n.firstBaseUpdate=t:e.next=t,n.lastBaseUpdate=t}function ul(e,t,n,r){var l=e.updateQueue;bt=!1;var o=l.firstBaseUpdate,u=l.lastBaseUpdate,c=l.shared.pending;if(c!==null){l.shared.pending=null;var d=c,_=d.next;d.next=null,u===null?o=_:u.next=_,u=d;var E=e.alternate;E!==null&&(E=E.updateQueue,c=E.lastBaseUpdate,c!==u&&(c===null?E.firstBaseUpdate=_:c.next=_,E.lastBaseUpdate=d))}if(o!==null){var R=l.baseState;u=0,E=_=d=null,c=o;do{var C=c.lane,N=c.eventTime;if((r&C)===C){E!==null&&(E=E.next={eventTime:N,lane:0,tag:c.tag,payload:c.payload,callback:c.callback,next:null});e:{var O=e,j=c;switch(C=t,N=n,j.tag){case 1:if(O=j.payload,typeof O=="function"){R=O.call(N,R,C);break e}R=O;break e;case 3:O.flags=O.flags&-65537|128;case 0:if(O=j.payload,C=typeof O=="function"?O.call(N,R,C):O,C==null)break e;R=L({},R,C);break e;case 2:bt=!0}}c.callback!==null&&c.lane!==0&&(e.flags|=64,C=l.effects,C===null?l.effects=[c]:C.push(c))}else N={eventTime:N,lane:C,tag:c.tag,payload:c.payload,callback:c.callback,next:null},E===null?(_=E=N,d=R):E=E.next=N,u|=C;if(c=c.next,c===null){if(c=l.shared.pending,c===null)break;C=c,c=C.next,C.next=null,l.lastBaseUpdate=C,l.shared.pending=null}}while(!0);if(E===null&&(d=R),l.baseState=d,l.firstBaseUpdate=_,l.lastBaseUpdate=E,t=l.shared.interleaved,t!==null){l=t;do u|=l.lane,l=l.next;while(l!==t)}else o===null&&(l.shared.lanes=0);on|=u,e.lanes=u,e.memoizedState=R}}function Cs(e,t,n){if(e=t.effects,t.effects=null,e!==null)for(t=0;t<e.length;t++){var r=e[t],l=r.callback;if(l!==null){if(r.callback=null,r=n,typeof l!="function")throw Error(i(191,l));l.call(r)}}}var cr={},xt=Bt(cr),fr=Bt(cr),dr=Bt(cr);function rn(e){if(e===cr)throw Error(i(174));return e}function $o(e,t){switch(ce(dr,t),ce(fr,e),ce(xt,cr),e=t.nodeType,e){case 9:case 11:t=(t=t.documentElement)?t.namespaceURI:$l(null,"");break;default:e=e===8?t.parentNode:t,t=e.namespaceURI||null,e=e.tagName,t=$l(t,e)}pe(xt),ce(xt,t)}function Mn(){pe(xt),pe(fr),pe(dr)}function ks(e){rn(dr.current);var t=rn(xt.current),n=$l(t,e.type);t!==n&&(ce(fr,e),ce(xt,n))}function Qo(e){fr.current===e&&(pe(xt),pe(fr))}var ve=Bt(0);function sl(e){for(var t=e;t!==null;){if(t.tag===13){var n=t.memoizedState;if(n!==null&&(n=n.dehydrated,n===null||n.data==="$?"||n.data==="$!"))return t}else if(t.tag===19&&t.memoizedProps.revealOrder!==void 0){if((t.flags&128)!==0)return t}else if(t.child!==null){t.child.return=t,t=t.child;continue}if(t===e)break;for(;t.sibling===null;){if(t.return===null||t.return===e)return null;t=t.return}t.sibling.return=t.return,t=t.sibling}return null}var Xo=[];function Go(){for(var e=0;e<Xo.length;e++)Xo[e]._workInProgressVersionPrimary=null;Xo.length=0}var al=ue.ReactCurrentDispatcher,Yo=ue.ReactCurrentBatchConfig,ln=0,ge=null,Te=null,Pe=null,cl=!1,pr=!1,mr=0,mf=0;function Be(){throw Error(i(321))}function Ko(e,t){if(t===null)return!1;for(var n=0;n<t.length&&n<e.length;n++)if(!ft(e[n],t[n]))return!1;return!0}function qo(e,t,n,r,l,o){if(ln=o,ge=t,t.memoizedState=null,t.updateQueue=null,t.lanes=0,al.current=e===null||e.memoizedState===null?yf:xf,e=n(r,l),pr){o=0;do{if(pr=!1,mr=0,25<=o)throw Error(i(301));o+=1,Pe=Te=null,t.updateQueue=null,al.current=_f,e=n(r,l)}while(pr)}if(al.current=pl,t=Te!==null&&Te.next!==null,ln=0,Pe=Te=ge=null,cl=!1,t)throw Error(i(300));return e}function Zo(){var e=mr!==0;return mr=0,e}function _t(){var e={memoizedState:null,baseState:null,baseQueue:null,queue:null,next:null};return Pe===null?ge.memoizedState=Pe=e:Pe=Pe.next=e,Pe}function ut(){if(Te===null){var e=ge.alternate;e=e!==null?e.memoizedState:null}else e=Te.next;var t=Pe===null?ge.memoizedState:Pe.next;if(t!==null)Pe=t,Te=e;else{if(e===null)throw Error(i(310));Te=e,e={memoizedState:Te.memoizedState,baseState:Te.baseState,baseQueue:Te.baseQueue,queue:Te.queue,next:null},Pe===null?ge.memoizedState=Pe=e:Pe=Pe.next=e}return Pe}function hr(e,t){return typeof t=="function"?t(e):t}function Jo(e){var t=ut(),n=t.queue;if(n===null)throw Error(i(311));n.lastRenderedReducer=e;var r=Te,l=r.baseQueue,o=n.pending;if(o!==null){if(l!==null){var u=l.next;l.next=o.next,o.next=u}r.baseQueue=l=o,n.pending=null}if(l!==null){o=l.next,r=r.baseState;var c=u=null,d=null,_=o;do{var E=_.lane;if((ln&E)===E)d!==null&&(d=d.next={lane:0,action:_.action,hasEagerState:_.hasEagerState,eagerState:_.eagerState,next:null}),r=_.hasEagerState?_.eagerState:e(r,_.action);else{var R={lane:E,action:_.action,hasEagerState:_.hasEagerState,eagerState:_.eagerState,next:null};d===null?(c=d=R,u=r):d=d.next=R,ge.lanes|=E,on|=E}_=_.next}while(_!==null&&_!==o);d===null?u=r:d.next=c,ft(r,t.memoizedState)||(Ye=!0),t.memoizedState=r,t.baseState=u,t.baseQueue=d,n.lastRenderedState=r}if(e=n.interleaved,e!==null){l=e;do o=l.lane,ge.lanes|=o,on|=o,l=l.next;while(l!==e)}else l===null&&(n.lanes=0);return[t.memoizedState,n.dispatch]}function ei(e){var t=ut(),n=t.queue;if(n===null)throw Error(i(311));n.lastRenderedReducer=e;var r=n.dispatch,l=n.pending,o=t.memoizedState;if(l!==null){n.pending=null;var u=l=l.next;do o=e(o,u.action),u=u.next;while(u!==l);ft(o,t.memoizedState)||(Ye=!0),t.memoizedState=o,t.baseQueue===null&&(t.baseState=o),n.lastRenderedState=o}return[o,r]}function Es(){}function Ts(e,t){var n=ge,r=ut(),l=t(),o=!ft(r.memoizedState,l);if(o&&(r.memoizedState=l,Ye=!0),r=r.queue,ti(Fs.bind(null,n,r,e),[e]),r.getSnapshot!==t||o||Pe!==null&&Pe.memoizedState.tag&1){if(n.flags|=2048,vr(9,Is.bind(null,n,r,l,t),void 0,null),Me===null)throw Error(i(349));(ln&30)!==0||Rs(n,t,l)}return l}function Rs(e,t,n){e.flags|=16384,e={getSnapshot:t,value:n},t=ge.updateQueue,t===null?(t={lastEffect:null,stores:null},ge.updateQueue=t,t.stores=[e]):(n=t.stores,n===null?t.stores=[e]:n.push(e))}function Is(e,t,n,r){t.value=n,t.getSnapshot=r,Ps(t)&&Ms(e)}function Fs(e,t,n){return n(function(){Ps(t)&&Ms(e)})}function Ps(e){var t=e.getSnapshot;e=e.value;try{var n=t();return!ft(e,n)}catch{return!0}}function Ms(e){var t=Tt(e,1);t!==null&&vt(t,e,1,-1)}function Ds(e){var t=_t();return typeof e=="function"&&(e=e()),t.memoizedState=t.baseState=e,e={pending:null,interleaved:null,lanes:0,dispatch:null,lastRenderedReducer:hr,lastRenderedState:e},t.queue=e,e=e.dispatch=gf.bind(null,ge,e),[t.memoizedState,e]}function vr(e,t,n,r){return e={tag:e,create:t,destroy:n,deps:r,next:null},t=ge.updateQueue,t===null?(t={lastEffect:null,stores:null},ge.updateQueue=t,t.lastEffect=e.next=e):(n=t.lastEffect,n===null?t.lastEffect=e.next=e:(r=n.next,n.next=e,e.next=r,t.lastEffect=e)),e}function zs(){return ut().memoizedState}function fl(e,t,n,r){var l=_t();ge.flags|=e,l.memoizedState=vr(1|t,n,void 0,r===void 0?null:r)}function dl(e,t,n,r){var l=ut();r=r===void 0?null:r;var o=void 0;if(Te!==null){var u=Te.memoizedState;if(o=u.destroy,r!==null&&Ko(r,u.deps)){l.memoizedState=vr(t,n,o,r);return}}ge.flags|=e,l.memoizedState=vr(1|t,n,o,r)}function Ns(e,t){return fl(8390656,8,e,t)}function ti(e,t){return dl(2048,8,e,t)}function Ls(e,t){return dl(4,2,e,t)}function As(e,t){return dl(4,4,e,t)}function Os(e,t){if(typeof t=="function")return e=e(),t(e),function(){t(null)};if(t!=null)return e=e(),t.current=e,function(){t.current=null}}function js(e,t,n){return n=n!=null?n.concat([e]):null,dl(4,4,Os.bind(null,t,e),n)}function ni(){}function Bs(e,t){var n=ut();t=t===void 0?null:t;var r=n.memoizedState;return r!==null&&t!==null&&Ko(t,r[1])?r[0]:(n.memoizedState=[e,t],e)}function Us(e,t){var n=ut();t=t===void 0?null:t;var r=n.memoizedState;return r!==null&&t!==null&&Ko(t,r[1])?r[0]:(e=e(),n.memoizedState=[e,t],e)}function Vs(e,t,n){return(ln&21)===0?(e.baseState&&(e.baseState=!1,Ye=!0),e.memoizedState=n):(ft(n,t)||(n=gu(),ge.lanes|=n,on|=n,e.baseState=!0),t)}function hf(e,t){var n=le;le=n!==0&&4>n?n:4,e(!0);var r=Yo.transition;Yo.transition={};try{e(!1),t()}finally{le=n,Yo.transition=r}}function bs(){return ut().memoizedState}function vf(e,t,n){var r=Xt(e);if(n={lane:r,action:n,hasEagerState:!1,eagerState:null,next:null},Ws(e))Hs(t,n);else if(n=_s(e,t,n,r),n!==null){var l=He();vt(n,e,r,l),$s(n,t,r)}}function gf(e,t,n){var r=Xt(e),l={lane:r,action:n,hasEagerState:!1,eagerState:null,next:null};if(Ws(e))Hs(t,l);else{var o=e.alternate;if(e.lanes===0&&(o===null||o.lanes===0)&&(o=t.lastRenderedReducer,o!==null))try{var u=t.lastRenderedState,c=o(u,n);if(l.hasEagerState=!0,l.eagerState=c,ft(c,u)){var d=t.interleaved;d===null?(l.next=l,Wo(t)):(l.next=d.next,d.next=l),t.interleaved=l;return}}catch{}finally{}n=_s(e,t,l,r),n!==null&&(l=He(),vt(n,e,r,l),$s(n,t,r))}}function Ws(e){var t=e.alternate;return e===ge||t!==null&&t===ge}function Hs(e,t){pr=cl=!0;var n=e.pending;n===null?t.next=t:(t.next=n.next,n.next=t),e.pending=t}function $s(e,t,n){if((n&4194240)!==0){var r=t.lanes;r&=e.pendingLanes,n|=r,t.lanes=n,ro(e,n)}}var pl={readContext:it,useCallback:Be,useContext:Be,useEffect:Be,useImperativeHandle:Be,useInsertionEffect:Be,useLayoutEffect:Be,useMemo:Be,useReducer:Be,useRef:Be,useState:Be,useDebugValue:Be,useDeferredValue:Be,useTransition:Be,useMutableSource:Be,useSyncExternalStore:Be,useId:Be,unstable_isNewReconciler:!1},yf={readContext:it,useCallback:function(e,t){return _t().memoizedState=[e,t===void 0?null:t],e},useContext:it,useEffect:Ns,useImperativeHandle:function(e,t,n){return n=n!=null?n.concat([e]):null,fl(4194308,4,Os.bind(null,t,e),n)},useLayoutEffect:function(e,t){return fl(4194308,4,e,t)},useInsertionEffect:function(e,t){return fl(4,2,e,t)},useMemo:function(e,t){var n=_t();return t=t===void 0?null:t,e=e(),n.memoizedState=[e,t],e},useReducer:function(e,t,n){var r=_t();return t=n!==void 0?n(t):t,r.memoizedState=r.baseState=t,e={pending:null,interleaved:null,lanes:0,dispatch:null,lastRenderedReducer:e,lastRenderedState:t},r.queue=e,e=e.dispatch=vf.bind(null,ge,e),[r.memoizedState,e]},useRef:function(e){var t=_t();return e={current:e},t.memoizedState=e},useState:Ds,useDebugValue:ni,useDeferredValue:function(e){return _t().memoizedState=e},useTransition:function(){var e=Ds(!1),t=e[0];return e=hf.bind(null,e[1]),_t().memoizedState=e,[t,e]},useMutableSource:function(){},useSyncExternalStore:function(e,t,n){var r=ge,l=_t();if(he){if(n===void 0)throw Error(i(407));n=n()}else{if(n=t(),Me===null)throw Error(i(349));(ln&30)!==0||Rs(r,t,n)}l.memoizedState=n;var o={value:n,getSnapshot:t};return l.queue=o,Ns(Fs.bind(null,r,o,e),[e]),r.flags|=2048,vr(9,Is.bind(null,r,o,n,t),void 0,null),n},useId:function(){var e=_t(),t=Me.identifierPrefix;if(he){var n=Et,r=kt;n=(r&~(1<<32-ct(r)-1)).toString(32)+n,t=":"+t+"R"+n,n=mr++,0<n&&(t+="H"+n.toString(32)),t+=":"}else n=mf++,t=":"+t+"r"+n.toString(32)+":";return e.memoizedState=t},unstable_isNewReconciler:!1},xf={readContext:it,useCallback:Bs,useContext:it,useEffect:ti,useImperativeHandle:js,useInsertionEffect:Ls,useLayoutEffect:As,useMemo:Us,useReducer:Jo,useRef:zs,useState:function(){return Jo(hr)},useDebugValue:ni,useDeferredValue:function(e){var t=ut();return Vs(t,Te.memoizedState,e)},useTransition:function(){var e=Jo(hr)[0],t=ut().memoizedState;return[e,t]},useMutableSource:Es,useSyncExternalStore:Ts,useId:bs,unstable_isNewReconciler:!1},_f={readContext:it,useCallback:Bs,useContext:it,useEffect:ti,useImperativeHandle:js,useInsertionEffect:Ls,useLayoutEffect:As,useMemo:Us,useReducer:ei,useRef:zs,useState:function(){return ei(hr)},useDebugValue:ni,useDeferredValue:function(e){var t=ut();return Te===null?t.memoizedState=e:Vs(t,Te.memoizedState,e)},useTransition:function(){var e=ei(hr)[0],t=ut().memoizedState;return[e,t]},useMutableSource:Es,useSyncExternalStore:Ts,useId:bs,unstable_isNewReconciler:!1};function pt(e,t){if(e&&e.defaultProps){t=L({},t),e=e.defaultProps;for(var n in e)t[n]===void 0&&(t[n]=e[n]);return t}return t}function ri(e,t,n,r){t=e.memoizedState,n=n(r,t),n=n==null?t:L({},t,n),e.memoizedState=n,e.lanes===0&&(e.updateQueue.baseState=n)}var ml={isMounted:function(e){return(e=e._reactInternals)?qt(e)===e:!1},enqueueSetState:function(e,t,n){e=e._reactInternals;var r=He(),l=Xt(e),o=Rt(r,l);o.payload=t,n!=null&&(o.callback=n),t=Wt(e,o,l),t!==null&&(vt(t,e,l,r),il(t,e,l))},enqueueReplaceState:function(e,t,n){e=e._reactInternals;var r=He(),l=Xt(e),o=Rt(r,l);o.tag=1,o.payload=t,n!=null&&(o.callback=n),t=Wt(e,o,l),t!==null&&(vt(t,e,l,r),il(t,e,l))},enqueueForceUpdate:function(e,t){e=e._reactInternals;var n=He(),r=Xt(e),l=Rt(n,r);l.tag=2,t!=null&&(l.callback=t),t=Wt(e,l,r),t!==null&&(vt(t,e,r,n),il(t,e,r))}};function Qs(e,t,n,r,l,o,u){return e=e.stateNode,typeof e.shouldComponentUpdate=="function"?e.shouldComponentUpdate(r,o,u):t.prototype&&t.prototype.isPureReactComponent?!nr(n,r)||!nr(l,o):!0}function Xs(e,t,n){var r=!1,l=Ut,o=t.contextType;return typeof o=="object"&&o!==null?o=it(o):(l=Ge(t)?Jt:je.current,r=t.contextTypes,o=(r=r!=null)?kn(e,l):Ut),t=new t(n,o),e.memoizedState=t.state!==null&&t.state!==void 0?t.state:null,t.updater=ml,e.stateNode=t,t._reactInternals=e,r&&(e=e.stateNode,e.__reactInternalMemoizedUnmaskedChildContext=l,e.__reactInternalMemoizedMaskedChildContext=o),t}function Gs(e,t,n,r){e=t.state,typeof t.componentWillReceiveProps=="function"&&t.componentWillReceiveProps(n,r),typeof t.UNSAFE_componentWillReceiveProps=="function"&&t.UNSAFE_componentWillReceiveProps(n,r),t.state!==e&&ml.enqueueReplaceState(t,t.state,null)}function li(e,t,n,r){var l=e.stateNode;l.props=n,l.state=e.memoizedState,l.refs={},Ho(e);var o=t.contextType;typeof o=="object"&&o!==null?l.context=it(o):(o=Ge(t)?Jt:je.current,l.context=kn(e,o)),l.state=e.memoizedState,o=t.getDerivedStateFromProps,typeof o=="function"&&(ri(e,t,o,n),l.state=e.memoizedState),typeof t.getDerivedStateFromProps=="function"||typeof l.getSnapshotBeforeUpdate=="function"||typeof l.UNSAFE_componentWillMount!="function"&&typeof l.componentWillMount!="function"||(t=l.state,typeof l.componentWillMount=="function"&&l.componentWillMount(),typeof l.UNSAFE_componentWillMount=="function"&&l.UNSAFE_componentWillMount(),t!==l.state&&ml.enqueueReplaceState(l,l.state,null),ul(e,n,l,r),l.state=e.memoizedState),typeof l.componentDidMount=="function"&&(e.flags|=4194308)}function Dn(e,t){try{var n="",r=t;do n+=Z(r),r=r.return;while(r);var l=n}catch(o){l=`
Error generating stack: `+o.message+`
`+o.stack}return{value:e,source:t,stack:l,digest:null}}function oi(e,t,n){return{value:e,source:null,stack:n??null,digest:t??null}}function ii(e,t){try{console.error(t.value)}catch(n){setTimeout(function(){throw n})}}var wf=typeof WeakMap=="function"?WeakMap:Map;function Ys(e,t,n){n=Rt(-1,n),n.tag=3,n.payload={element:null};var r=t.value;return n.callback=function(){wl||(wl=!0,wi=r),ii(e,t)},n}function Ks(e,t,n){n=Rt(-1,n),n.tag=3;var r=e.type.getDerivedStateFromError;if(typeof r=="function"){var l=t.value;n.payload=function(){return r(l)},n.callback=function(){ii(e,t)}}var o=e.stateNode;return o!==null&&typeof o.componentDidCatch=="function"&&(n.callback=function(){ii(e,t),typeof r!="function"&&($t===null?$t=new Set([this]):$t.add(this));var u=t.stack;this.componentDidCatch(t.value,{componentStack:u!==null?u:""})}),n}function qs(e,t,n){var r=e.pingCache;if(r===null){r=e.pingCache=new wf;var l=new Set;r.set(t,l)}else l=r.get(t),l===void 0&&(l=new Set,r.set(t,l));l.has(n)||(l.add(n),e=Lf.bind(null,e,t,n),t.then(e,e))}function Zs(e){do{var t;if((t=e.tag===13)&&(t=e.memoizedState,t=t!==null?t.dehydrated!==null:!0),t)return e;e=e.return}while(e!==null);return null}function Js(e,t,n,r,l){return(e.mode&1)===0?(e===t?e.flags|=65536:(e.flags|=128,n.flags|=131072,n.flags&=-52805,n.tag===1&&(n.alternate===null?n.tag=17:(t=Rt(-1,1),t.tag=2,Wt(n,t,1))),n.lanes|=1),e):(e.flags|=65536,e.lanes=l,e)}var Sf=ue.ReactCurrentOwner,Ye=!1;function We(e,t,n,r){t.child=e===null?xs(t,null,n,r):In(t,e.child,n,r)}function ea(e,t,n,r,l){n=n.render;var o=t.ref;return Pn(t,l),r=qo(e,t,n,r,o,l),n=Zo(),e!==null&&!Ye?(t.updateQueue=e.updateQueue,t.flags&=-2053,e.lanes&=~l,It(e,t,l)):(he&&n&&No(t),t.flags|=1,We(e,t,r,l),t.child)}function ta(e,t,n,r,l){if(e===null){var o=n.type;return typeof o=="function"&&!Ii(o)&&o.defaultProps===void 0&&n.compare===null&&n.defaultProps===void 0?(t.tag=15,t.type=o,na(e,t,o,r,l)):(e=Rl(n.type,null,r,t,t.mode,l),e.ref=t.ref,e.return=t,t.child=e)}if(o=e.child,(e.lanes&l)===0){var u=o.memoizedProps;if(n=n.compare,n=n!==null?n:nr,n(u,r)&&e.ref===t.ref)return It(e,t,l)}return t.flags|=1,e=Yt(o,r),e.ref=t.ref,e.return=t,t.child=e}function na(e,t,n,r,l){if(e!==null){var o=e.memoizedProps;if(nr(o,r)&&e.ref===t.ref)if(Ye=!1,t.pendingProps=r=o,(e.lanes&l)!==0)(e.flags&131072)!==0&&(Ye=!0);else return t.lanes=e.lanes,It(e,t,l)}return ui(e,t,n,r,l)}function ra(e,t,n){var r=t.pendingProps,l=r.children,o=e!==null?e.memoizedState:null;if(r.mode==="hidden")if((t.mode&1)===0)t.memoizedState={baseLanes:0,cachePool:null,transitions:null},ce(Nn,rt),rt|=n;else{if((n&1073741824)===0)return e=o!==null?o.baseLanes|n:n,t.lanes=t.childLanes=1073741824,t.memoizedState={baseLanes:e,cachePool:null,transitions:null},t.updateQueue=null,ce(Nn,rt),rt|=e,null;t.memoizedState={baseLanes:0,cachePool:null,transitions:null},r=o!==null?o.baseLanes:n,ce(Nn,rt),rt|=r}else o!==null?(r=o.baseLanes|n,t.memoizedState=null):r=n,ce(Nn,rt),rt|=r;return We(e,t,l,n),t.child}function la(e,t){var n=t.ref;(e===null&&n!==null||e!==null&&e.ref!==n)&&(t.flags|=512,t.flags|=2097152)}function ui(e,t,n,r,l){var o=Ge(n)?Jt:je.current;return o=kn(t,o),Pn(t,l),n=qo(e,t,n,r,o,l),r=Zo(),e!==null&&!Ye?(t.updateQueue=e.updateQueue,t.flags&=-2053,e.lanes&=~l,It(e,t,l)):(he&&r&&No(t),t.flags|=1,We(e,t,n,l),t.child)}function oa(e,t,n,r,l){if(Ge(n)){var o=!0;Zr(t)}else o=!1;if(Pn(t,l),t.stateNode===null)vl(e,t),Xs(t,n,r),li(t,n,r,l),r=!0;else if(e===null){var u=t.stateNode,c=t.memoizedProps;u.props=c;var d=u.context,_=n.contextType;typeof _=="object"&&_!==null?_=it(_):(_=Ge(n)?Jt:je.current,_=kn(t,_));var E=n.getDerivedStateFromProps,R=typeof E=="function"||typeof u.getSnapshotBeforeUpdate=="function";R||typeof u.UNSAFE_componentWillReceiveProps!="function"&&typeof u.componentWillReceiveProps!="function"||(c!==r||d!==_)&&Gs(t,u,r,_),bt=!1;var C=t.memoizedState;u.state=C,ul(t,r,u,l),d=t.memoizedState,c!==r||C!==d||Xe.current||bt?(typeof E=="function"&&(ri(t,n,E,r),d=t.memoizedState),(c=bt||Qs(t,n,c,r,C,d,_))?(R||typeof u.UNSAFE_componentWillMount!="function"&&typeof u.componentWillMount!="function"||(typeof u.componentWillMount=="function"&&u.componentWillMount(),typeof u.UNSAFE_componentWillMount=="function"&&u.UNSAFE_componentWillMount()),typeof u.componentDidMount=="function"&&(t.flags|=4194308)):(typeof u.componentDidMount=="function"&&(t.flags|=4194308),t.memoizedProps=r,t.memoizedState=d),u.props=r,u.state=d,u.context=_,r=c):(typeof u.componentDidMount=="function"&&(t.flags|=4194308),r=!1)}else{u=t.stateNode,ws(e,t),c=t.memoizedProps,_=t.type===t.elementType?c:pt(t.type,c),u.props=_,R=t.pendingProps,C=u.context,d=n.contextType,typeof d=="object"&&d!==null?d=it(d):(d=Ge(n)?Jt:je.current,d=kn(t,d));var N=n.getDerivedStateFromProps;(E=typeof N=="function"||typeof u.getSnapshotBeforeUpdate=="function")||typeof u.UNSAFE_componentWillReceiveProps!="function"&&typeof u.componentWillReceiveProps!="function"||(c!==R||C!==d)&&Gs(t,u,r,d),bt=!1,C=t.memoizedState,u.state=C,ul(t,r,u,l);var O=t.memoizedState;c!==R||C!==O||Xe.current||bt?(typeof N=="function"&&(ri(t,n,N,r),O=t.memoizedState),(_=bt||Qs(t,n,_,r,C,O,d)||!1)?(E||typeof u.UNSAFE_componentWillUpdate!="function"&&typeof u.componentWillUpdate!="function"||(typeof u.componentWillUpdate=="function"&&u.componentWillUpdate(r,O,d),typeof u.UNSAFE_componentWillUpdate=="function"&&u.UNSAFE_componentWillUpdate(r,O,d)),typeof u.componentDidUpdate=="function"&&(t.flags|=4),typeof u.getSnapshotBeforeUpdate=="function"&&(t.flags|=1024)):(typeof u.componentDidUpdate!="function"||c===e.memoizedProps&&C===e.memoizedState||(t.flags|=4),typeof u.getSnapshotBeforeUpdate!="function"||c===e.memoizedProps&&C===e.memoizedState||(t.flags|=1024),t.memoizedProps=r,t.memoizedState=O),u.props=r,u.state=O,u.context=d,r=_):(typeof u.componentDidUpdate!="function"||c===e.memoizedProps&&C===e.memoizedState||(t.flags|=4),typeof u.getSnapshotBeforeUpdate!="function"||c===e.memoizedProps&&C===e.memoizedState||(t.flags|=1024),r=!1)}return si(e,t,n,r,o,l)}function si(e,t,n,r,l,o){la(e,t);var u=(t.flags&128)!==0;if(!r&&!u)return l&&cs(t,n,!1),It(e,t,o);r=t.stateNode,Sf.current=t;var c=u&&typeof n.getDerivedStateFromError!="function"?null:r.render();return t.flags|=1,e!==null&&u?(t.child=In(t,e.child,null,o),t.child=In(t,null,c,o)):We(e,t,c,o),t.memoizedState=r.state,l&&cs(t,n,!0),t.child}function ia(e){var t=e.stateNode;t.pendingContext?ss(e,t.pendingContext,t.pendingContext!==t.context):t.context&&ss(e,t.context,!1),$o(e,t.containerInfo)}function ua(e,t,n,r,l){return Rn(),jo(l),t.flags|=256,We(e,t,n,r),t.child}var ai={dehydrated:null,treeContext:null,retryLane:0};function ci(e){return{baseLanes:e,cachePool:null,transitions:null}}function sa(e,t,n){var r=t.pendingProps,l=ve.current,o=!1,u=(t.flags&128)!==0,c;if((c=u)||(c=e!==null&&e.memoizedState===null?!1:(l&2)!==0),c?(o=!0,t.flags&=-129):(e===null||e.memoizedState!==null)&&(l|=1),ce(ve,l&1),e===null)return Oo(t),e=t.memoizedState,e!==null&&(e=e.dehydrated,e!==null)?((t.mode&1)===0?t.lanes=1:e.data==="$!"?t.lanes=8:t.lanes=1073741824,null):(u=r.children,e=r.fallback,o?(r=t.mode,o=t.child,u={mode:"hidden",children:u},(r&1)===0&&o!==null?(o.childLanes=0,o.pendingProps=u):o=Il(u,r,0,null),e=cn(e,r,n,null),o.return=t,e.return=t,o.sibling=e,t.child=o,t.child.memoizedState=ci(n),t.memoizedState=ai,e):fi(t,u));if(l=e.memoizedState,l!==null&&(c=l.dehydrated,c!==null))return Cf(e,t,u,r,c,l,n);if(o){o=r.fallback,u=t.mode,l=e.child,c=l.sibling;var d={mode:"hidden",children:r.children};return(u&1)===0&&t.child!==l?(r=t.child,r.childLanes=0,r.pendingProps=d,t.deletions=null):(r=Yt(l,d),r.subtreeFlags=l.subtreeFlags&14680064),c!==null?o=Yt(c,o):(o=cn(o,u,n,null),o.flags|=2),o.return=t,r.return=t,r.sibling=o,t.child=r,r=o,o=t.child,u=e.child.memoizedState,u=u===null?ci(n):{baseLanes:u.baseLanes|n,cachePool:null,transitions:u.transitions},o.memoizedState=u,o.childLanes=e.childLanes&~n,t.memoizedState=ai,r}return o=e.child,e=o.sibling,r=Yt(o,{mode:"visible",children:r.children}),(t.mode&1)===0&&(r.lanes=n),r.return=t,r.sibling=null,e!==null&&(n=t.deletions,n===null?(t.deletions=[e],t.flags|=16):n.push(e)),t.child=r,t.memoizedState=null,r}function fi(e,t){return t=Il({mode:"visible",children:t},e.mode,0,null),t.return=e,e.child=t}function hl(e,t,n,r){return r!==null&&jo(r),In(t,e.child,null,n),e=fi(t,t.pendingProps.children),e.flags|=2,t.memoizedState=null,e}function Cf(e,t,n,r,l,o,u){if(n)return t.flags&256?(t.flags&=-257,r=oi(Error(i(422))),hl(e,t,u,r)):t.memoizedState!==null?(t.child=e.child,t.flags|=128,null):(o=r.fallback,l=t.mode,r=Il({mode:"visible",children:r.children},l,0,null),o=cn(o,l,u,null),o.flags|=2,r.return=t,o.return=t,r.sibling=o,t.child=r,(t.mode&1)!==0&&In(t,e.child,null,u),t.child.memoizedState=ci(u),t.memoizedState=ai,o);if((t.mode&1)===0)return hl(e,t,u,null);if(l.data==="$!"){if(r=l.nextSibling&&l.nextSibling.dataset,r)var c=r.dgst;return r=c,o=Error(i(419)),r=oi(o,r,void 0),hl(e,t,u,r)}if(c=(u&e.childLanes)!==0,Ye||c){if(r=Me,r!==null){switch(u&-u){case 4:l=2;break;case 16:l=8;break;case 64:case 128:case 256:case 512:case 1024:case 2048:case 4096:case 8192:case 16384:case 32768:case 65536:case 131072:case 262144:case 524288:case 1048576:case 2097152:case 4194304:case 8388608:case 16777216:case 33554432:case 67108864:l=32;break;case 536870912:l=268435456;break;default:l=0}l=(l&(r.suspendedLanes|u))!==0?0:l,l!==0&&l!==o.retryLane&&(o.retryLane=l,Tt(e,l),vt(r,e,l,-1))}return Ri(),r=oi(Error(i(421))),hl(e,t,u,r)}return l.data==="$?"?(t.flags|=128,t.child=e.child,t=Af.bind(null,e),l._reactRetry=t,null):(e=o.treeContext,nt=jt(l.nextSibling),tt=t,he=!0,dt=null,e!==null&&(lt[ot++]=kt,lt[ot++]=Et,lt[ot++]=en,kt=e.id,Et=e.overflow,en=t),t=fi(t,r.children),t.flags|=4096,t)}function aa(e,t,n){e.lanes|=t;var r=e.alternate;r!==null&&(r.lanes|=t),bo(e.return,t,n)}function di(e,t,n,r,l){var o=e.memoizedState;o===null?e.memoizedState={isBackwards:t,rendering:null,renderingStartTime:0,last:r,tail:n,tailMode:l}:(o.isBackwards=t,o.rendering=null,o.renderingStartTime=0,o.last=r,o.tail=n,o.tailMode=l)}function ca(e,t,n){var r=t.pendingProps,l=r.revealOrder,o=r.tail;if(We(e,t,r.children,n),r=ve.current,(r&2)!==0)r=r&1|2,t.flags|=128;else{if(e!==null&&(e.flags&128)!==0)e:for(e=t.child;e!==null;){if(e.tag===13)e.memoizedState!==null&&aa(e,n,t);else if(e.tag===19)aa(e,n,t);else if(e.child!==null){e.child.return=e,e=e.child;continue}if(e===t)break e;for(;e.sibling===null;){if(e.return===null||e.return===t)break e;e=e.return}e.sibling.return=e.return,e=e.sibling}r&=1}if(ce(ve,r),(t.mode&1)===0)t.memoizedState=null;else switch(l){case"forwards":for(n=t.child,l=null;n!==null;)e=n.alternate,e!==null&&sl(e)===null&&(l=n),n=n.sibling;n=l,n===null?(l=t.child,t.child=null):(l=n.sibling,n.sibling=null),di(t,!1,l,n,o);break;case"backwards":for(n=null,l=t.child,t.child=null;l!==null;){if(e=l.alternate,e!==null&&sl(e)===null){t.child=l;break}e=l.sibling,l.sibling=n,n=l,l=e}di(t,!0,n,null,o);break;case"together":di(t,!1,null,null,void 0);break;default:t.memoizedState=null}return t.child}function vl(e,t){(t.mode&1)===0&&e!==null&&(e.alternate=null,t.alternate=null,t.flags|=2)}function It(e,t,n){if(e!==null&&(t.dependencies=e.dependencies),on|=t.lanes,(n&t.childLanes)===0)return null;if(e!==null&&t.child!==e.child)throw Error(i(153));if(t.child!==null){for(e=t.child,n=Yt(e,e.pendingProps),t.child=n,n.return=t;e.sibling!==null;)e=e.sibling,n=n.sibling=Yt(e,e.pendingProps),n.return=t;n.sibling=null}return t.child}function kf(e,t,n){switch(t.tag){case 3:ia(t),Rn();break;case 5:ks(t);break;case 1:Ge(t.type)&&Zr(t);break;case 4:$o(t,t.stateNode.containerInfo);break;case 10:var r=t.type._context,l=t.memoizedProps.value;ce(ll,r._currentValue),r._currentValue=l;break;case 13:if(r=t.memoizedState,r!==null)return r.dehydrated!==null?(ce(ve,ve.current&1),t.flags|=128,null):(n&t.child.childLanes)!==0?sa(e,t,n):(ce(ve,ve.current&1),e=It(e,t,n),e!==null?e.sibling:null);ce(ve,ve.current&1);break;case 19:if(r=(n&t.childLanes)!==0,(e.flags&128)!==0){if(r)return ca(e,t,n);t.flags|=128}if(l=t.memoizedState,l!==null&&(l.rendering=null,l.tail=null,l.lastEffect=null),ce(ve,ve.current),r)break;return null;case 22:case 23:return t.lanes=0,ra(e,t,n)}return It(e,t,n)}var fa,pi,da,pa;fa=function(e,t){for(var n=t.child;n!==null;){if(n.tag===5||n.tag===6)e.appendChild(n.stateNode);else if(n.tag!==4&&n.child!==null){n.child.return=n,n=n.child;continue}if(n===t)break;for(;n.sibling===null;){if(n.return===null||n.return===t)return;n=n.return}n.sibling.return=n.return,n=n.sibling}},pi=function(){},da=function(e,t,n,r){var l=e.memoizedProps;if(l!==r){e=t.stateNode,rn(xt.current);var o=null;switch(n){case"input":l=Vl(e,l),r=Vl(e,r),o=[];break;case"select":l=L({},l,{value:void 0}),r=L({},r,{value:void 0}),o=[];break;case"textarea":l=Hl(e,l),r=Hl(e,r),o=[];break;default:typeof l.onClick!="function"&&typeof r.onClick=="function"&&(e.onclick=Yr)}Ql(n,r);var u;n=null;for(_ in l)if(!r.hasOwnProperty(_)&&l.hasOwnProperty(_)&&l[_]!=null)if(_==="style"){var c=l[_];for(u in c)c.hasOwnProperty(u)&&(n||(n={}),n[u]="")}else _!=="dangerouslySetInnerHTML"&&_!=="children"&&_!=="suppressContentEditableWarning"&&_!=="suppressHydrationWarning"&&_!=="autoFocus"&&(p.hasOwnProperty(_)?o||(o=[]):(o=o||[]).push(_,null));for(_ in r){var d=r[_];if(c=l!=null?l[_]:void 0,r.hasOwnProperty(_)&&d!==c&&(d!=null||c!=null))if(_==="style")if(c){for(u in c)!c.hasOwnProperty(u)||d&&d.hasOwnProperty(u)||(n||(n={}),n[u]="");for(u in d)d.hasOwnProperty(u)&&c[u]!==d[u]&&(n||(n={}),n[u]=d[u])}else n||(o||(o=[]),o.push(_,n)),n=d;else _==="dangerouslySetInnerHTML"?(d=d?d.__html:void 0,c=c?c.__html:void 0,d!=null&&c!==d&&(o=o||[]).push(_,d)):_==="children"?typeof d!="string"&&typeof d!="number"||(o=o||[]).push(_,""+d):_!=="suppressContentEditableWarning"&&_!=="suppressHydrationWarning"&&(p.hasOwnProperty(_)?(d!=null&&_==="onScroll"&&de("scroll",e),o||c===d||(o=[])):(o=o||[]).push(_,d))}n&&(o=o||[]).push("style",n);var _=o;(t.updateQueue=_)&&(t.flags|=4)}},pa=function(e,t,n,r){n!==r&&(t.flags|=4)};function gr(e,t){if(!he)switch(e.tailMode){case"hidden":t=e.tail;for(var n=null;t!==null;)t.alternate!==null&&(n=t),t=t.sibling;n===null?e.tail=null:n.sibling=null;break;case"collapsed":n=e.tail;for(var r=null;n!==null;)n.alternate!==null&&(r=n),n=n.sibling;r===null?t||e.tail===null?e.tail=null:e.tail.sibling=null:r.sibling=null}}function Ue(e){var t=e.alternate!==null&&e.alternate.child===e.child,n=0,r=0;if(t)for(var l=e.child;l!==null;)n|=l.lanes|l.childLanes,r|=l.subtreeFlags&14680064,r|=l.flags&14680064,l.return=e,l=l.sibling;else for(l=e.child;l!==null;)n|=l.lanes|l.childLanes,r|=l.subtreeFlags,r|=l.flags,l.return=e,l=l.sibling;return e.subtreeFlags|=r,e.childLanes=n,t}function Ef(e,t,n){var r=t.pendingProps;switch(Lo(t),t.tag){case 2:case 16:case 15:case 0:case 11:case 7:case 8:case 12:case 9:case 14:return Ue(t),null;case 1:return Ge(t.type)&&qr(),Ue(t),null;case 3:return r=t.stateNode,Mn(),pe(Xe),pe(je),Go(),r.pendingContext&&(r.context=r.pendingContext,r.pendingContext=null),(e===null||e.child===null)&&(nl(t)?t.flags|=4:e===null||e.memoizedState.isDehydrated&&(t.flags&256)===0||(t.flags|=1024,dt!==null&&(ki(dt),dt=null))),pi(e,t),Ue(t),null;case 5:Qo(t);var l=rn(dr.current);if(n=t.type,e!==null&&t.stateNode!=null)da(e,t,n,r,l),e.ref!==t.ref&&(t.flags|=512,t.flags|=2097152);else{if(!r){if(t.stateNode===null)throw Error(i(166));return Ue(t),null}if(e=rn(xt.current),nl(t)){r=t.stateNode,n=t.type;var o=t.memoizedProps;switch(r[yt]=t,r[ur]=o,e=(t.mode&1)!==0,n){case"dialog":de("cancel",r),de("close",r);break;case"iframe":case"object":case"embed":de("load",r);break;case"video":case"audio":for(l=0;l<lr.length;l++)de(lr[l],r);break;case"source":de("error",r);break;case"img":case"image":case"link":de("error",r),de("load",r);break;case"details":de("toggle",r);break;case"input":Xi(r,o),de("invalid",r);break;case"select":r._wrapperState={wasMultiple:!!o.multiple},de("invalid",r);break;case"textarea":Ki(r,o),de("invalid",r)}Ql(n,o),l=null;for(var u in o)if(o.hasOwnProperty(u)){var c=o[u];u==="children"?typeof c=="string"?r.textContent!==c&&(o.suppressHydrationWarning!==!0&&Gr(r.textContent,c,e),l=["children",c]):typeof c=="number"&&r.textContent!==""+c&&(o.suppressHydrationWarning!==!0&&Gr(r.textContent,c,e),l=["children",""+c]):p.hasOwnProperty(u)&&c!=null&&u==="onScroll"&&de("scroll",r)}switch(n){case"input":Er(r),Yi(r,o,!0);break;case"textarea":Er(r),Zi(r);break;case"select":case"option":break;default:typeof o.onClick=="function"&&(r.onclick=Yr)}r=l,t.updateQueue=r,r!==null&&(t.flags|=4)}else{u=l.nodeType===9?l:l.ownerDocument,e==="http://www.w3.org/1999/xhtml"&&(e=Ji(n)),e==="http://www.w3.org/1999/xhtml"?n==="script"?(e=u.createElement("div"),e.innerHTML="<script><\/script>",e=e.removeChild(e.firstChild)):typeof r.is=="string"?e=u.createElement(n,{is:r.is}):(e=u.createElement(n),n==="select"&&(u=e,r.multiple?u.multiple=!0:r.size&&(u.size=r.size))):e=u.createElementNS(e,n),e[yt]=t,e[ur]=r,fa(e,t,!1,!1),t.stateNode=e;e:{switch(u=Xl(n,r),n){case"dialog":de("cancel",e),de("close",e),l=r;break;case"iframe":case"object":case"embed":de("load",e),l=r;break;case"video":case"audio":for(l=0;l<lr.length;l++)de(lr[l],e);l=r;break;case"source":de("error",e),l=r;break;case"img":case"image":case"link":de("error",e),de("load",e),l=r;break;case"details":de("toggle",e),l=r;break;case"input":Xi(e,r),l=Vl(e,r),de("invalid",e);break;case"option":l=r;break;case"select":e._wrapperState={wasMultiple:!!r.multiple},l=L({},r,{value:void 0}),de("invalid",e);break;case"textarea":Ki(e,r),l=Hl(e,r),de("invalid",e);break;default:l=r}Ql(n,l),c=l;for(o in c)if(c.hasOwnProperty(o)){var d=c[o];o==="style"?nu(e,d):o==="dangerouslySetInnerHTML"?(d=d?d.__html:void 0,d!=null&&eu(e,d)):o==="children"?typeof d=="string"?(n!=="textarea"||d!=="")&&Bn(e,d):typeof d=="number"&&Bn(e,""+d):o!=="suppressContentEditableWarning"&&o!=="suppressHydrationWarning"&&o!=="autoFocus"&&(p.hasOwnProperty(o)?d!=null&&o==="onScroll"&&de("scroll",e):d!=null&&ke(e,o,d,u))}switch(n){case"input":Er(e),Yi(e,r,!1);break;case"textarea":Er(e),Zi(e);break;case"option":r.value!=null&&e.setAttribute("value",""+re(r.value));break;case"select":e.multiple=!!r.multiple,o=r.value,o!=null?dn(e,!!r.multiple,o,!1):r.defaultValue!=null&&dn(e,!!r.multiple,r.defaultValue,!0);break;default:typeof l.onClick=="function"&&(e.onclick=Yr)}switch(n){case"button":case"input":case"select":case"textarea":r=!!r.autoFocus;break e;case"img":r=!0;break e;default:r=!1}}r&&(t.flags|=4)}t.ref!==null&&(t.flags|=512,t.flags|=2097152)}return Ue(t),null;case 6:if(e&&t.stateNode!=null)pa(e,t,e.memoizedProps,r);else{if(typeof r!="string"&&t.stateNode===null)throw Error(i(166));if(n=rn(dr.current),rn(xt.current),nl(t)){if(r=t.stateNode,n=t.memoizedProps,r[yt]=t,(o=r.nodeValue!==n)&&(e=tt,e!==null))switch(e.tag){case 3:Gr(r.nodeValue,n,(e.mode&1)!==0);break;case 5:e.memoizedProps.suppressHydrationWarning!==!0&&Gr(r.nodeValue,n,(e.mode&1)!==0)}o&&(t.flags|=4)}else r=(n.nodeType===9?n:n.ownerDocument).createTextNode(r),r[yt]=t,t.stateNode=r}return Ue(t),null;case 13:if(pe(ve),r=t.memoizedState,e===null||e.memoizedState!==null&&e.memoizedState.dehydrated!==null){if(he&&nt!==null&&(t.mode&1)!==0&&(t.flags&128)===0)vs(),Rn(),t.flags|=98560,o=!1;else if(o=nl(t),r!==null&&r.dehydrated!==null){if(e===null){if(!o)throw Error(i(318));if(o=t.memoizedState,o=o!==null?o.dehydrated:null,!o)throw Error(i(317));o[yt]=t}else Rn(),(t.flags&128)===0&&(t.memoizedState=null),t.flags|=4;Ue(t),o=!1}else dt!==null&&(ki(dt),dt=null),o=!0;if(!o)return t.flags&65536?t:null}return(t.flags&128)!==0?(t.lanes=n,t):(r=r!==null,r!==(e!==null&&e.memoizedState!==null)&&r&&(t.child.flags|=8192,(t.mode&1)!==0&&(e===null||(ve.current&1)!==0?Re===0&&(Re=3):Ri())),t.updateQueue!==null&&(t.flags|=4),Ue(t),null);case 4:return Mn(),pi(e,t),e===null&&or(t.stateNode.containerInfo),Ue(t),null;case 10:return Vo(t.type._context),Ue(t),null;case 17:return Ge(t.type)&&qr(),Ue(t),null;case 19:if(pe(ve),o=t.memoizedState,o===null)return Ue(t),null;if(r=(t.flags&128)!==0,u=o.rendering,u===null)if(r)gr(o,!1);else{if(Re!==0||e!==null&&(e.flags&128)!==0)for(e=t.child;e!==null;){if(u=sl(e),u!==null){for(t.flags|=128,gr(o,!1),r=u.updateQueue,r!==null&&(t.updateQueue=r,t.flags|=4),t.subtreeFlags=0,r=n,n=t.child;n!==null;)o=n,e=r,o.flags&=14680066,u=o.alternate,u===null?(o.childLanes=0,o.lanes=e,o.child=null,o.subtreeFlags=0,o.memoizedProps=null,o.memoizedState=null,o.updateQueue=null,o.dependencies=null,o.stateNode=null):(o.childLanes=u.childLanes,o.lanes=u.lanes,o.child=u.child,o.subtreeFlags=0,o.deletions=null,o.memoizedProps=u.memoizedProps,o.memoizedState=u.memoizedState,o.updateQueue=u.updateQueue,o.type=u.type,e=u.dependencies,o.dependencies=e===null?null:{lanes:e.lanes,firstContext:e.firstContext}),n=n.sibling;return ce(ve,ve.current&1|2),t.child}e=e.sibling}o.tail!==null&&Se()>Ln&&(t.flags|=128,r=!0,gr(o,!1),t.lanes=4194304)}else{if(!r)if(e=sl(u),e!==null){if(t.flags|=128,r=!0,n=e.updateQueue,n!==null&&(t.updateQueue=n,t.flags|=4),gr(o,!0),o.tail===null&&o.tailMode==="hidden"&&!u.alternate&&!he)return Ue(t),null}else 2*Se()-o.renderingStartTime>Ln&&n!==1073741824&&(t.flags|=128,r=!0,gr(o,!1),t.lanes=4194304);o.isBackwards?(u.sibling=t.child,t.child=u):(n=o.last,n!==null?n.sibling=u:t.child=u,o.last=u)}return o.tail!==null?(t=o.tail,o.rendering=t,o.tail=t.sibling,o.renderingStartTime=Se(),t.sibling=null,n=ve.current,ce(ve,r?n&1|2:n&1),t):(Ue(t),null);case 22:case 23:return Ti(),r=t.memoizedState!==null,e!==null&&e.memoizedState!==null!==r&&(t.flags|=8192),r&&(t.mode&1)!==0?(rt&1073741824)!==0&&(Ue(t),t.subtreeFlags&6&&(t.flags|=8192)):Ue(t),null;case 24:return null;case 25:return null}throw Error(i(156,t.tag))}function Tf(e,t){switch(Lo(t),t.tag){case 1:return Ge(t.type)&&qr(),e=t.flags,e&65536?(t.flags=e&-65537|128,t):null;case 3:return Mn(),pe(Xe),pe(je),Go(),e=t.flags,(e&65536)!==0&&(e&128)===0?(t.flags=e&-65537|128,t):null;case 5:return Qo(t),null;case 13:if(pe(ve),e=t.memoizedState,e!==null&&e.dehydrated!==null){if(t.alternate===null)throw Error(i(340));Rn()}return e=t.flags,e&65536?(t.flags=e&-65537|128,t):null;case 19:return pe(ve),null;case 4:return Mn(),null;case 10:return Vo(t.type._context),null;case 22:case 23:return Ti(),null;case 24:return null;default:return null}}var gl=!1,Ve=!1,Rf=typeof WeakSet=="function"?WeakSet:Set,A=null;function zn(e,t){var n=e.ref;if(n!==null)if(typeof n=="function")try{n(null)}catch(r){xe(e,t,r)}else n.current=null}function mi(e,t,n){try{n()}catch(r){xe(e,t,r)}}var ma=!1;function If(e,t){if(To=Or,e=Qu(),yo(e)){if("selectionStart"in e)var n={start:e.selectionStart,end:e.selectionEnd};else e:{n=(n=e.ownerDocument)&&n.defaultView||window;var r=n.getSelection&&n.getSelection();if(r&&r.rangeCount!==0){n=r.anchorNode;var l=r.anchorOffset,o=r.focusNode;r=r.focusOffset;try{n.nodeType,o.nodeType}catch{n=null;break e}var u=0,c=-1,d=-1,_=0,E=0,R=e,C=null;t:for(;;){for(var N;R!==n||l!==0&&R.nodeType!==3||(c=u+l),R!==o||r!==0&&R.nodeType!==3||(d=u+r),R.nodeType===3&&(u+=R.nodeValue.length),(N=R.firstChild)!==null;)C=R,R=N;for(;;){if(R===e)break t;if(C===n&&++_===l&&(c=u),C===o&&++E===r&&(d=u),(N=R.nextSibling)!==null)break;R=C,C=R.parentNode}R=N}n=c===-1||d===-1?null:{start:c,end:d}}else n=null}n=n||{start:0,end:0}}else n=null;for(Ro={focusedElem:e,selectionRange:n},Or=!1,A=t;A!==null;)if(t=A,e=t.child,(t.subtreeFlags&1028)!==0&&e!==null)e.return=t,A=e;else for(;A!==null;){t=A;try{var O=t.alternate;if((t.flags&1024)!==0)switch(t.tag){case 0:case 11:case 15:break;case 1:if(O!==null){var j=O.memoizedProps,Ce=O.memoizedState,v=t.stateNode,m=v.getSnapshotBeforeUpdate(t.elementType===t.type?j:pt(t.type,j),Ce);v.__reactInternalSnapshotBeforeUpdate=m}break;case 3:var x=t.stateNode.containerInfo;x.nodeType===1?x.textContent="":x.nodeType===9&&x.documentElement&&x.removeChild(x.documentElement);break;case 5:case 6:case 4:case 17:break;default:throw Error(i(163))}}catch(F){xe(t,t.return,F)}if(e=t.sibling,e!==null){e.return=t.return,A=e;break}A=t.return}return O=ma,ma=!1,O}function yr(e,t,n){var r=t.updateQueue;if(r=r!==null?r.lastEffect:null,r!==null){var l=r=r.next;do{if((l.tag&e)===e){var o=l.destroy;l.destroy=void 0,o!==void 0&&mi(t,n,o)}l=l.next}while(l!==r)}}function yl(e,t){if(t=t.updateQueue,t=t!==null?t.lastEffect:null,t!==null){var n=t=t.next;do{if((n.tag&e)===e){var r=n.create;n.destroy=r()}n=n.next}while(n!==t)}}function hi(e){var t=e.ref;if(t!==null){var n=e.stateNode;switch(e.tag){case 5:e=n;break;default:e=n}typeof t=="function"?t(e):t.current=e}}function ha(e){var t=e.alternate;t!==null&&(e.alternate=null,ha(t)),e.child=null,e.deletions=null,e.sibling=null,e.tag===5&&(t=e.stateNode,t!==null&&(delete t[yt],delete t[ur],delete t[Mo],delete t[cf],delete t[ff])),e.stateNode=null,e.return=null,e.dependencies=null,e.memoizedProps=null,e.memoizedState=null,e.pendingProps=null,e.stateNode=null,e.updateQueue=null}function va(e){return e.tag===5||e.tag===3||e.tag===4}function ga(e){e:for(;;){for(;e.sibling===null;){if(e.return===null||va(e.return))return null;e=e.return}for(e.sibling.return=e.return,e=e.sibling;e.tag!==5&&e.tag!==6&&e.tag!==18;){if(e.flags&2||e.child===null||e.tag===4)continue e;e.child.return=e,e=e.child}if(!(e.flags&2))return e.stateNode}}function vi(e,t,n){var r=e.tag;if(r===5||r===6)e=e.stateNode,t?n.nodeType===8?n.parentNode.insertBefore(e,t):n.insertBefore(e,t):(n.nodeType===8?(t=n.parentNode,t.insertBefore(e,n)):(t=n,t.appendChild(e)),n=n._reactRootContainer,n!=null||t.onclick!==null||(t.onclick=Yr));else if(r!==4&&(e=e.child,e!==null))for(vi(e,t,n),e=e.sibling;e!==null;)vi(e,t,n),e=e.sibling}function gi(e,t,n){var r=e.tag;if(r===5||r===6)e=e.stateNode,t?n.insertBefore(e,t):n.appendChild(e);else if(r!==4&&(e=e.child,e!==null))for(gi(e,t,n),e=e.sibling;e!==null;)gi(e,t,n),e=e.sibling}var Ae=null,mt=!1;function Ht(e,t,n){for(n=n.child;n!==null;)ya(e,t,n),n=n.sibling}function ya(e,t,n){if(gt&&typeof gt.onCommitFiberUnmount=="function")try{gt.onCommitFiberUnmount(Mr,n)}catch{}switch(n.tag){case 5:Ve||zn(n,t);case 6:var r=Ae,l=mt;Ae=null,Ht(e,t,n),Ae=r,mt=l,Ae!==null&&(mt?(e=Ae,n=n.stateNode,e.nodeType===8?e.parentNode.removeChild(n):e.removeChild(n)):Ae.removeChild(n.stateNode));break;case 18:Ae!==null&&(mt?(e=Ae,n=n.stateNode,e.nodeType===8?Po(e.parentNode,n):e.nodeType===1&&Po(e,n),Kn(e)):Po(Ae,n.stateNode));break;case 4:r=Ae,l=mt,Ae=n.stateNode.containerInfo,mt=!0,Ht(e,t,n),Ae=r,mt=l;break;case 0:case 11:case 14:case 15:if(!Ve&&(r=n.updateQueue,r!==null&&(r=r.lastEffect,r!==null))){l=r=r.next;do{var o=l,u=o.destroy;o=o.tag,u!==void 0&&((o&2)!==0||(o&4)!==0)&&mi(n,t,u),l=l.next}while(l!==r)}Ht(e,t,n);break;case 1:if(!Ve&&(zn(n,t),r=n.stateNode,typeof r.componentWillUnmount=="function"))try{r.props=n.memoizedProps,r.state=n.memoizedState,r.componentWillUnmount()}catch(c){xe(n,t,c)}Ht(e,t,n);break;case 21:Ht(e,t,n);break;case 22:n.mode&1?(Ve=(r=Ve)||n.memoizedState!==null,Ht(e,t,n),Ve=r):Ht(e,t,n);break;default:Ht(e,t,n)}}function xa(e){var t=e.updateQueue;if(t!==null){e.updateQueue=null;var n=e.stateNode;n===null&&(n=e.stateNode=new Rf),t.forEach(function(r){var l=Of.bind(null,e,r);n.has(r)||(n.add(r),r.then(l,l))})}}function ht(e,t){var n=t.deletions;if(n!==null)for(var r=0;r<n.length;r++){var l=n[r];try{var o=e,u=t,c=u;e:for(;c!==null;){switch(c.tag){case 5:Ae=c.stateNode,mt=!1;break e;case 3:Ae=c.stateNode.containerInfo,mt=!0;break e;case 4:Ae=c.stateNode.containerInfo,mt=!0;break e}c=c.return}if(Ae===null)throw Error(i(160));ya(o,u,l),Ae=null,mt=!1;var d=l.alternate;d!==null&&(d.return=null),l.return=null}catch(_){xe(l,t,_)}}if(t.subtreeFlags&12854)for(t=t.child;t!==null;)_a(t,e),t=t.sibling}function _a(e,t){var n=e.alternate,r=e.flags;switch(e.tag){case 0:case 11:case 14:case 15:if(ht(t,e),wt(e),r&4){try{yr(3,e,e.return),yl(3,e)}catch(j){xe(e,e.return,j)}try{yr(5,e,e.return)}catch(j){xe(e,e.return,j)}}break;case 1:ht(t,e),wt(e),r&512&&n!==null&&zn(n,n.return);break;case 5:if(ht(t,e),wt(e),r&512&&n!==null&&zn(n,n.return),e.flags&32){var l=e.stateNode;try{Bn(l,"")}catch(j){xe(e,e.return,j)}}if(r&4&&(l=e.stateNode,l!=null)){var o=e.memoizedProps,u=n!==null?n.memoizedProps:o,c=e.type,d=e.updateQueue;if(e.updateQueue=null,d!==null)try{c==="input"&&o.type==="radio"&&o.name!=null&&Gi(l,o),Xl(c,u);var _=Xl(c,o);for(u=0;u<d.length;u+=2){var E=d[u],R=d[u+1];E==="style"?nu(l,R):E==="dangerouslySetInnerHTML"?eu(l,R):E==="children"?Bn(l,R):ke(l,E,R,_)}switch(c){case"input":bl(l,o);break;case"textarea":qi(l,o);break;case"select":var C=l._wrapperState.wasMultiple;l._wrapperState.wasMultiple=!!o.multiple;var N=o.value;N!=null?dn(l,!!o.multiple,N,!1):C!==!!o.multiple&&(o.defaultValue!=null?dn(l,!!o.multiple,o.defaultValue,!0):dn(l,!!o.multiple,o.multiple?[]:"",!1))}l[ur]=o}catch(j){xe(e,e.return,j)}}break;case 6:if(ht(t,e),wt(e),r&4){if(e.stateNode===null)throw Error(i(162));l=e.stateNode,o=e.memoizedProps;try{l.nodeValue=o}catch(j){xe(e,e.return,j)}}break;case 3:if(ht(t,e),wt(e),r&4&&n!==null&&n.memoizedState.isDehydrated)try{Kn(t.containerInfo)}catch(j){xe(e,e.return,j)}break;case 4:ht(t,e),wt(e);break;case 13:ht(t,e),wt(e),l=e.child,l.flags&8192&&(o=l.memoizedState!==null,l.stateNode.isHidden=o,!o||l.alternate!==null&&l.alternate.memoizedState!==null||(_i=Se())),r&4&&xa(e);break;case 22:if(E=n!==null&&n.memoizedState!==null,e.mode&1?(Ve=(_=Ve)||E,ht(t,e),Ve=_):ht(t,e),wt(e),r&8192){if(_=e.memoizedState!==null,(e.stateNode.isHidden=_)&&!E&&(e.mode&1)!==0)for(A=e,E=e.child;E!==null;){for(R=A=E;A!==null;){switch(C=A,N=C.child,C.tag){case 0:case 11:case 14:case 15:yr(4,C,C.return);break;case 1:zn(C,C.return);var O=C.stateNode;if(typeof O.componentWillUnmount=="function"){r=C,n=C.return;try{t=r,O.props=t.memoizedProps,O.state=t.memoizedState,O.componentWillUnmount()}catch(j){xe(r,n,j)}}break;case 5:zn(C,C.return);break;case 22:if(C.memoizedState!==null){Ca(R);continue}}N!==null?(N.return=C,A=N):Ca(R)}E=E.sibling}e:for(E=null,R=e;;){if(R.tag===5){if(E===null){E=R;try{l=R.stateNode,_?(o=l.style,typeof o.setProperty=="function"?o.setProperty("display","none","important"):o.display="none"):(c=R.stateNode,d=R.memoizedProps.style,u=d!=null&&d.hasOwnProperty("display")?d.display:null,c.style.display=tu("display",u))}catch(j){xe(e,e.return,j)}}}else if(R.tag===6){if(E===null)try{R.stateNode.nodeValue=_?"":R.memoizedProps}catch(j){xe(e,e.return,j)}}else if((R.tag!==22&&R.tag!==23||R.memoizedState===null||R===e)&&R.child!==null){R.child.return=R,R=R.child;continue}if(R===e)break e;for(;R.sibling===null;){if(R.return===null||R.return===e)break e;E===R&&(E=null),R=R.return}E===R&&(E=null),R.sibling.return=R.return,R=R.sibling}}break;case 19:ht(t,e),wt(e),r&4&&xa(e);break;case 21:break;default:ht(t,e),wt(e)}}function wt(e){var t=e.flags;if(t&2){try{e:{for(var n=e.return;n!==null;){if(va(n)){var r=n;break e}n=n.return}throw Error(i(160))}switch(r.tag){case 5:var l=r.stateNode;r.flags&32&&(Bn(l,""),r.flags&=-33);var o=ga(e);gi(e,o,l);break;case 3:case 4:var u=r.stateNode.containerInfo,c=ga(e);vi(e,c,u);break;default:throw Error(i(161))}}catch(d){xe(e,e.return,d)}e.flags&=-3}t&4096&&(e.flags&=-4097)}function Ff(e,t,n){A=e,wa(e)}function wa(e,t,n){for(var r=(e.mode&1)!==0;A!==null;){var l=A,o=l.child;if(l.tag===22&&r){var u=l.memoizedState!==null||gl;if(!u){var c=l.alternate,d=c!==null&&c.memoizedState!==null||Ve;c=gl;var _=Ve;if(gl=u,(Ve=d)&&!_)for(A=l;A!==null;)u=A,d=u.child,u.tag===22&&u.memoizedState!==null?ka(l):d!==null?(d.return=u,A=d):ka(l);for(;o!==null;)A=o,wa(o),o=o.sibling;A=l,gl=c,Ve=_}Sa(e)}else(l.subtreeFlags&8772)!==0&&o!==null?(o.return=l,A=o):Sa(e)}}function Sa(e){for(;A!==null;){var t=A;if((t.flags&8772)!==0){var n=t.alternate;try{if((t.flags&8772)!==0)switch(t.tag){case 0:case 11:case 15:Ve||yl(5,t);break;case 1:var r=t.stateNode;if(t.flags&4&&!Ve)if(n===null)r.componentDidMount();else{var l=t.elementType===t.type?n.memoizedProps:pt(t.type,n.memoizedProps);r.componentDidUpdate(l,n.memoizedState,r.__reactInternalSnapshotBeforeUpdate)}var o=t.updateQueue;o!==null&&Cs(t,o,r);break;case 3:var u=t.updateQueue;if(u!==null){if(n=null,t.child!==null)switch(t.child.tag){case 5:n=t.child.stateNode;break;case 1:n=t.child.stateNode}Cs(t,u,n)}break;case 5:var c=t.stateNode;if(n===null&&t.flags&4){n=c;var d=t.memoizedProps;switch(t.type){case"button":case"input":case"select":case"textarea":d.autoFocus&&n.focus();break;case"img":d.src&&(n.src=d.src)}}break;case 6:break;case 4:break;case 12:break;case 13:if(t.memoizedState===null){var _=t.alternate;if(_!==null){var E=_.memoizedState;if(E!==null){var R=E.dehydrated;R!==null&&Kn(R)}}}break;case 19:case 17:case 21:case 22:case 23:case 25:break;default:throw Error(i(163))}Ve||t.flags&512&&hi(t)}catch(C){xe(t,t.return,C)}}if(t===e){A=null;break}if(n=t.sibling,n!==null){n.return=t.return,A=n;break}A=t.return}}function Ca(e){for(;A!==null;){var t=A;if(t===e){A=null;break}var n=t.sibling;if(n!==null){n.return=t.return,A=n;break}A=t.return}}function ka(e){for(;A!==null;){var t=A;try{switch(t.tag){case 0:case 11:case 15:var n=t.return;try{yl(4,t)}catch(d){xe(t,n,d)}break;case 1:var r=t.stateNode;if(typeof r.componentDidMount=="function"){var l=t.return;try{r.componentDidMount()}catch(d){xe(t,l,d)}}var o=t.return;try{hi(t)}catch(d){xe(t,o,d)}break;case 5:var u=t.return;try{hi(t)}catch(d){xe(t,u,d)}}}catch(d){xe(t,t.return,d)}if(t===e){A=null;break}var c=t.sibling;if(c!==null){c.return=t.return,A=c;break}A=t.return}}var Pf=Math.ceil,xl=ue.ReactCurrentDispatcher,yi=ue.ReactCurrentOwner,st=ue.ReactCurrentBatchConfig,q=0,Me=null,Ee=null,Oe=0,rt=0,Nn=Bt(0),Re=0,xr=null,on=0,_l=0,xi=0,_r=null,Ke=null,_i=0,Ln=1/0,Ft=null,wl=!1,wi=null,$t=null,Sl=!1,Qt=null,Cl=0,wr=0,Si=null,kl=-1,El=0;function He(){return(q&6)!==0?Se():kl!==-1?kl:kl=Se()}function Xt(e){return(e.mode&1)===0?1:(q&2)!==0&&Oe!==0?Oe&-Oe:pf.transition!==null?(El===0&&(El=gu()),El):(e=le,e!==0||(e=window.event,e=e===void 0?16:Tu(e.type)),e)}function vt(e,t,n,r){if(50<wr)throw wr=0,Si=null,Error(i(185));$n(e,n,r),((q&2)===0||e!==Me)&&(e===Me&&((q&2)===0&&(_l|=n),Re===4&&Gt(e,Oe)),qe(e,r),n===1&&q===0&&(t.mode&1)===0&&(Ln=Se()+500,Jr&&Vt()))}function qe(e,t){var n=e.callbackNode;dc(e,t);var r=Nr(e,e===Me?Oe:0);if(r===0)n!==null&&mu(n),e.callbackNode=null,e.callbackPriority=0;else if(t=r&-r,e.callbackPriority!==t){if(n!=null&&mu(n),t===1)e.tag===0?df(Ta.bind(null,e)):fs(Ta.bind(null,e)),sf(function(){(q&6)===0&&Vt()}),n=null;else{switch(yu(r)){case 1:n=eo;break;case 4:n=hu;break;case 16:n=Pr;break;case 536870912:n=vu;break;default:n=Pr}n=Na(n,Ea.bind(null,e))}e.callbackPriority=t,e.callbackNode=n}}function Ea(e,t){if(kl=-1,El=0,(q&6)!==0)throw Error(i(327));var n=e.callbackNode;if(An()&&e.callbackNode!==n)return null;var r=Nr(e,e===Me?Oe:0);if(r===0)return null;if((r&30)!==0||(r&e.expiredLanes)!==0||t)t=Tl(e,r);else{t=r;var l=q;q|=2;var o=Ia();(Me!==e||Oe!==t)&&(Ft=null,Ln=Se()+500,sn(e,t));do try{zf();break}catch(c){Ra(e,c)}while(!0);Uo(),xl.current=o,q=l,Ee!==null?t=0:(Me=null,Oe=0,t=Re)}if(t!==0){if(t===2&&(l=to(e),l!==0&&(r=l,t=Ci(e,l))),t===1)throw n=xr,sn(e,0),Gt(e,r),qe(e,Se()),n;if(t===6)Gt(e,r);else{if(l=e.current.alternate,(r&30)===0&&!Mf(l)&&(t=Tl(e,r),t===2&&(o=to(e),o!==0&&(r=o,t=Ci(e,o))),t===1))throw n=xr,sn(e,0),Gt(e,r),qe(e,Se()),n;switch(e.finishedWork=l,e.finishedLanes=r,t){case 0:case 1:throw Error(i(345));case 2:an(e,Ke,Ft);break;case 3:if(Gt(e,r),(r&130023424)===r&&(t=_i+500-Se(),10<t)){if(Nr(e,0)!==0)break;if(l=e.suspendedLanes,(l&r)!==r){He(),e.pingedLanes|=e.suspendedLanes&l;break}e.timeoutHandle=Fo(an.bind(null,e,Ke,Ft),t);break}an(e,Ke,Ft);break;case 4:if(Gt(e,r),(r&4194240)===r)break;for(t=e.eventTimes,l=-1;0<r;){var u=31-ct(r);o=1<<u,u=t[u],u>l&&(l=u),r&=~o}if(r=l,r=Se()-r,r=(120>r?120:480>r?480:1080>r?1080:1920>r?1920:3e3>r?3e3:4320>r?4320:1960*Pf(r/1960))-r,10<r){e.timeoutHandle=Fo(an.bind(null,e,Ke,Ft),r);break}an(e,Ke,Ft);break;case 5:an(e,Ke,Ft);break;default:throw Error(i(329))}}}return qe(e,Se()),e.callbackNode===n?Ea.bind(null,e):null}function Ci(e,t){var n=_r;return e.current.memoizedState.isDehydrated&&(sn(e,t).flags|=256),e=Tl(e,t),e!==2&&(t=Ke,Ke=n,t!==null&&ki(t)),e}function ki(e){Ke===null?Ke=e:Ke.push.apply(Ke,e)}function Mf(e){for(var t=e;;){if(t.flags&16384){var n=t.updateQueue;if(n!==null&&(n=n.stores,n!==null))for(var r=0;r<n.length;r++){var l=n[r],o=l.getSnapshot;l=l.value;try{if(!ft(o(),l))return!1}catch{return!1}}}if(n=t.child,t.subtreeFlags&16384&&n!==null)n.return=t,t=n;else{if(t===e)break;for(;t.sibling===null;){if(t.return===null||t.return===e)return!0;t=t.return}t.sibling.return=t.return,t=t.sibling}}return!0}function Gt(e,t){for(t&=~xi,t&=~_l,e.suspendedLanes|=t,e.pingedLanes&=~t,e=e.expirationTimes;0<t;){var n=31-ct(t),r=1<<n;e[n]=-1,t&=~r}}function Ta(e){if((q&6)!==0)throw Error(i(327));An();var t=Nr(e,0);if((t&1)===0)return qe(e,Se()),null;var n=Tl(e,t);if(e.tag!==0&&n===2){var r=to(e);r!==0&&(t=r,n=Ci(e,r))}if(n===1)throw n=xr,sn(e,0),Gt(e,t),qe(e,Se()),n;if(n===6)throw Error(i(345));return e.finishedWork=e.current.alternate,e.finishedLanes=t,an(e,Ke,Ft),qe(e,Se()),null}function Ei(e,t){var n=q;q|=1;try{return e(t)}finally{q=n,q===0&&(Ln=Se()+500,Jr&&Vt())}}function un(e){Qt!==null&&Qt.tag===0&&(q&6)===0&&An();var t=q;q|=1;var n=st.transition,r=le;try{if(st.transition=null,le=1,e)return e()}finally{le=r,st.transition=n,q=t,(q&6)===0&&Vt()}}function Ti(){rt=Nn.current,pe(Nn)}function sn(e,t){e.finishedWork=null,e.finishedLanes=0;var n=e.timeoutHandle;if(n!==-1&&(e.timeoutHandle=-1,uf(n)),Ee!==null)for(n=Ee.return;n!==null;){var r=n;switch(Lo(r),r.tag){case 1:r=r.type.childContextTypes,r!=null&&qr();break;case 3:Mn(),pe(Xe),pe(je),Go();break;case 5:Qo(r);break;case 4:Mn();break;case 13:pe(ve);break;case 19:pe(ve);break;case 10:Vo(r.type._context);break;case 22:case 23:Ti()}n=n.return}if(Me=e,Ee=e=Yt(e.current,null),Oe=rt=t,Re=0,xr=null,xi=_l=on=0,Ke=_r=null,nn!==null){for(t=0;t<nn.length;t++)if(n=nn[t],r=n.interleaved,r!==null){n.interleaved=null;var l=r.next,o=n.pending;if(o!==null){var u=o.next;o.next=l,r.next=u}n.pending=r}nn=null}return e}function Ra(e,t){do{var n=Ee;try{if(Uo(),al.current=pl,cl){for(var r=ge.memoizedState;r!==null;){var l=r.queue;l!==null&&(l.pending=null),r=r.next}cl=!1}if(ln=0,Pe=Te=ge=null,pr=!1,mr=0,yi.current=null,n===null||n.return===null){Re=1,xr=t,Ee=null;break}e:{var o=e,u=n.return,c=n,d=t;if(t=Oe,c.flags|=32768,d!==null&&typeof d=="object"&&typeof d.then=="function"){var _=d,E=c,R=E.tag;if((E.mode&1)===0&&(R===0||R===11||R===15)){var C=E.alternate;C?(E.updateQueue=C.updateQueue,E.memoizedState=C.memoizedState,E.lanes=C.lanes):(E.updateQueue=null,E.memoizedState=null)}var N=Zs(u);if(N!==null){N.flags&=-257,Js(N,u,c,o,t),N.mode&1&&qs(o,_,t),t=N,d=_;var O=t.updateQueue;if(O===null){var j=new Set;j.add(d),t.updateQueue=j}else O.add(d);break e}else{if((t&1)===0){qs(o,_,t),Ri();break e}d=Error(i(426))}}else if(he&&c.mode&1){var Ce=Zs(u);if(Ce!==null){(Ce.flags&65536)===0&&(Ce.flags|=256),Js(Ce,u,c,o,t),jo(Dn(d,c));break e}}o=d=Dn(d,c),Re!==4&&(Re=2),_r===null?_r=[o]:_r.push(o),o=u;do{switch(o.tag){case 3:o.flags|=65536,t&=-t,o.lanes|=t;var v=Ys(o,d,t);Ss(o,v);break e;case 1:c=d;var m=o.type,x=o.stateNode;if((o.flags&128)===0&&(typeof m.getDerivedStateFromError=="function"||x!==null&&typeof x.componentDidCatch=="function"&&($t===null||!$t.has(x)))){o.flags|=65536,t&=-t,o.lanes|=t;var F=Ks(o,c,t);Ss(o,F);break e}}o=o.return}while(o!==null)}Pa(n)}catch(B){t=B,Ee===n&&n!==null&&(Ee=n=n.return);continue}break}while(!0)}function Ia(){var e=xl.current;return xl.current=pl,e===null?pl:e}function Ri(){(Re===0||Re===3||Re===2)&&(Re=4),Me===null||(on&268435455)===0&&(_l&268435455)===0||Gt(Me,Oe)}function Tl(e,t){var n=q;q|=2;var r=Ia();(Me!==e||Oe!==t)&&(Ft=null,sn(e,t));do try{Df();break}catch(l){Ra(e,l)}while(!0);if(Uo(),q=n,xl.current=r,Ee!==null)throw Error(i(261));return Me=null,Oe=0,Re}function Df(){for(;Ee!==null;)Fa(Ee)}function zf(){for(;Ee!==null&&!rc();)Fa(Ee)}function Fa(e){var t=za(e.alternate,e,rt);e.memoizedProps=e.pendingProps,t===null?Pa(e):Ee=t,yi.current=null}function Pa(e){var t=e;do{var n=t.alternate;if(e=t.return,(t.flags&32768)===0){if(n=Ef(n,t,rt),n!==null){Ee=n;return}}else{if(n=Tf(n,t),n!==null){n.flags&=32767,Ee=n;return}if(e!==null)e.flags|=32768,e.subtreeFlags=0,e.deletions=null;else{Re=6,Ee=null;return}}if(t=t.sibling,t!==null){Ee=t;return}Ee=t=e}while(t!==null);Re===0&&(Re=5)}function an(e,t,n){var r=le,l=st.transition;try{st.transition=null,le=1,Nf(e,t,n,r)}finally{st.transition=l,le=r}return null}function Nf(e,t,n,r){do An();while(Qt!==null);if((q&6)!==0)throw Error(i(327));n=e.finishedWork;var l=e.finishedLanes;if(n===null)return null;if(e.finishedWork=null,e.finishedLanes=0,n===e.current)throw Error(i(177));e.callbackNode=null,e.callbackPriority=0;var o=n.lanes|n.childLanes;if(pc(e,o),e===Me&&(Ee=Me=null,Oe=0),(n.subtreeFlags&2064)===0&&(n.flags&2064)===0||Sl||(Sl=!0,Na(Pr,function(){return An(),null})),o=(n.flags&15990)!==0,(n.subtreeFlags&15990)!==0||o){o=st.transition,st.transition=null;var u=le;le=1;var c=q;q|=4,yi.current=null,If(e,n),_a(n,e),Jc(Ro),Or=!!To,Ro=To=null,e.current=n,Ff(n),lc(),q=c,le=u,st.transition=o}else e.current=n;if(Sl&&(Sl=!1,Qt=e,Cl=l),o=e.pendingLanes,o===0&&($t=null),uc(n.stateNode),qe(e,Se()),t!==null)for(r=e.onRecoverableError,n=0;n<t.length;n++)l=t[n],r(l.value,{componentStack:l.stack,digest:l.digest});if(wl)throw wl=!1,e=wi,wi=null,e;return(Cl&1)!==0&&e.tag!==0&&An(),o=e.pendingLanes,(o&1)!==0?e===Si?wr++:(wr=0,Si=e):wr=0,Vt(),null}function An(){if(Qt!==null){var e=yu(Cl),t=st.transition,n=le;try{if(st.transition=null,le=16>e?16:e,Qt===null)var r=!1;else{if(e=Qt,Qt=null,Cl=0,(q&6)!==0)throw Error(i(331));var l=q;for(q|=4,A=e.current;A!==null;){var o=A,u=o.child;if((A.flags&16)!==0){var c=o.deletions;if(c!==null){for(var d=0;d<c.length;d++){var _=c[d];for(A=_;A!==null;){var E=A;switch(E.tag){case 0:case 11:case 15:yr(8,E,o)}var R=E.child;if(R!==null)R.return=E,A=R;else for(;A!==null;){E=A;var C=E.sibling,N=E.return;if(ha(E),E===_){A=null;break}if(C!==null){C.return=N,A=C;break}A=N}}}var O=o.alternate;if(O!==null){var j=O.child;if(j!==null){O.child=null;do{var Ce=j.sibling;j.sibling=null,j=Ce}while(j!==null)}}A=o}}if((o.subtreeFlags&2064)!==0&&u!==null)u.return=o,A=u;else e:for(;A!==null;){if(o=A,(o.flags&2048)!==0)switch(o.tag){case 0:case 11:case 15:yr(9,o,o.return)}var v=o.sibling;if(v!==null){v.return=o.return,A=v;break e}A=o.return}}var m=e.current;for(A=m;A!==null;){u=A;var x=u.child;if((u.subtreeFlags&2064)!==0&&x!==null)x.return=u,A=x;else e:for(u=m;A!==null;){if(c=A,(c.flags&2048)!==0)try{switch(c.tag){case 0:case 11:case 15:yl(9,c)}}catch(B){xe(c,c.return,B)}if(c===u){A=null;break e}var F=c.sibling;if(F!==null){F.return=c.return,A=F;break e}A=c.return}}if(q=l,Vt(),gt&&typeof gt.onPostCommitFiberRoot=="function")try{gt.onPostCommitFiberRoot(Mr,e)}catch{}r=!0}return r}finally{le=n,st.transition=t}}return!1}function Ma(e,t,n){t=Dn(n,t),t=Ys(e,t,1),e=Wt(e,t,1),t=He(),e!==null&&($n(e,1,t),qe(e,t))}function xe(e,t,n){if(e.tag===3)Ma(e,e,n);else for(;t!==null;){if(t.tag===3){Ma(t,e,n);break}else if(t.tag===1){var r=t.stateNode;if(typeof t.type.getDerivedStateFromError=="function"||typeof r.componentDidCatch=="function"&&($t===null||!$t.has(r))){e=Dn(n,e),e=Ks(t,e,1),t=Wt(t,e,1),e=He(),t!==null&&($n(t,1,e),qe(t,e));break}}t=t.return}}function Lf(e,t,n){var r=e.pingCache;r!==null&&r.delete(t),t=He(),e.pingedLanes|=e.suspendedLanes&n,Me===e&&(Oe&n)===n&&(Re===4||Re===3&&(Oe&130023424)===Oe&&500>Se()-_i?sn(e,0):xi|=n),qe(e,t)}function Da(e,t){t===0&&((e.mode&1)===0?t=1:(t=zr,zr<<=1,(zr&130023424)===0&&(zr=4194304)));var n=He();e=Tt(e,t),e!==null&&($n(e,t,n),qe(e,n))}function Af(e){var t=e.memoizedState,n=0;t!==null&&(n=t.retryLane),Da(e,n)}function Of(e,t){var n=0;switch(e.tag){case 13:var r=e.stateNode,l=e.memoizedState;l!==null&&(n=l.retryLane);break;case 19:r=e.stateNode;break;default:throw Error(i(314))}r!==null&&r.delete(t),Da(e,n)}var za;za=function(e,t,n){if(e!==null)if(e.memoizedProps!==t.pendingProps||Xe.current)Ye=!0;else{if((e.lanes&n)===0&&(t.flags&128)===0)return Ye=!1,kf(e,t,n);Ye=(e.flags&131072)!==0}else Ye=!1,he&&(t.flags&1048576)!==0&&ds(t,tl,t.index);switch(t.lanes=0,t.tag){case 2:var r=t.type;vl(e,t),e=t.pendingProps;var l=kn(t,je.current);Pn(t,n),l=qo(null,t,r,e,l,n);var o=Zo();return t.flags|=1,typeof l=="object"&&l!==null&&typeof l.render=="function"&&l.$$typeof===void 0?(t.tag=1,t.memoizedState=null,t.updateQueue=null,Ge(r)?(o=!0,Zr(t)):o=!1,t.memoizedState=l.state!==null&&l.state!==void 0?l.state:null,Ho(t),l.updater=ml,t.stateNode=l,l._reactInternals=t,li(t,r,e,n),t=si(null,t,r,!0,o,n)):(t.tag=0,he&&o&&No(t),We(null,t,l,n),t=t.child),t;case 16:r=t.elementType;e:{switch(vl(e,t),e=t.pendingProps,l=r._init,r=l(r._payload),t.type=r,l=t.tag=Bf(r),e=pt(r,e),l){case 0:t=ui(null,t,r,e,n);break e;case 1:t=oa(null,t,r,e,n);break e;case 11:t=ea(null,t,r,e,n);break e;case 14:t=ta(null,t,r,pt(r.type,e),n);break e}throw Error(i(306,r,""))}return t;case 0:return r=t.type,l=t.pendingProps,l=t.elementType===r?l:pt(r,l),ui(e,t,r,l,n);case 1:return r=t.type,l=t.pendingProps,l=t.elementType===r?l:pt(r,l),oa(e,t,r,l,n);case 3:e:{if(ia(t),e===null)throw Error(i(387));r=t.pendingProps,o=t.memoizedState,l=o.element,ws(e,t),ul(t,r,null,n);var u=t.memoizedState;if(r=u.element,o.isDehydrated)if(o={element:r,isDehydrated:!1,cache:u.cache,pendingSuspenseBoundaries:u.pendingSuspenseBoundaries,transitions:u.transitions},t.updateQueue.baseState=o,t.memoizedState=o,t.flags&256){l=Dn(Error(i(423)),t),t=ua(e,t,r,n,l);break e}else if(r!==l){l=Dn(Error(i(424)),t),t=ua(e,t,r,n,l);break e}else for(nt=jt(t.stateNode.containerInfo.firstChild),tt=t,he=!0,dt=null,n=xs(t,null,r,n),t.child=n;n;)n.flags=n.flags&-3|4096,n=n.sibling;else{if(Rn(),r===l){t=It(e,t,n);break e}We(e,t,r,n)}t=t.child}return t;case 5:return ks(t),e===null&&Oo(t),r=t.type,l=t.pendingProps,o=e!==null?e.memoizedProps:null,u=l.children,Io(r,l)?u=null:o!==null&&Io(r,o)&&(t.flags|=32),la(e,t),We(e,t,u,n),t.child;case 6:return e===null&&Oo(t),null;case 13:return sa(e,t,n);case 4:return $o(t,t.stateNode.containerInfo),r=t.pendingProps,e===null?t.child=In(t,null,r,n):We(e,t,r,n),t.child;case 11:return r=t.type,l=t.pendingProps,l=t.elementType===r?l:pt(r,l),ea(e,t,r,l,n);case 7:return We(e,t,t.pendingProps,n),t.child;case 8:return We(e,t,t.pendingProps.children,n),t.child;case 12:return We(e,t,t.pendingProps.children,n),t.child;case 10:e:{if(r=t.type._context,l=t.pendingProps,o=t.memoizedProps,u=l.value,ce(ll,r._currentValue),r._currentValue=u,o!==null)if(ft(o.value,u)){if(o.children===l.children&&!Xe.current){t=It(e,t,n);break e}}else for(o=t.child,o!==null&&(o.return=t);o!==null;){var c=o.dependencies;if(c!==null){u=o.child;for(var d=c.firstContext;d!==null;){if(d.context===r){if(o.tag===1){d=Rt(-1,n&-n),d.tag=2;var _=o.updateQueue;if(_!==null){_=_.shared;var E=_.pending;E===null?d.next=d:(d.next=E.next,E.next=d),_.pending=d}}o.lanes|=n,d=o.alternate,d!==null&&(d.lanes|=n),bo(o.return,n,t),c.lanes|=n;break}d=d.next}}else if(o.tag===10)u=o.type===t.type?null:o.child;else if(o.tag===18){if(u=o.return,u===null)throw Error(i(341));u.lanes|=n,c=u.alternate,c!==null&&(c.lanes|=n),bo(u,n,t),u=o.sibling}else u=o.child;if(u!==null)u.return=o;else for(u=o;u!==null;){if(u===t){u=null;break}if(o=u.sibling,o!==null){o.return=u.return,u=o;break}u=u.return}o=u}We(e,t,l.children,n),t=t.child}return t;case 9:return l=t.type,r=t.pendingProps.children,Pn(t,n),l=it(l),r=r(l),t.flags|=1,We(e,t,r,n),t.child;case 14:return r=t.type,l=pt(r,t.pendingProps),l=pt(r.type,l),ta(e,t,r,l,n);case 15:return na(e,t,t.type,t.pendingProps,n);case 17:return r=t.type,l=t.pendingProps,l=t.elementType===r?l:pt(r,l),vl(e,t),t.tag=1,Ge(r)?(e=!0,Zr(t)):e=!1,Pn(t,n),Xs(t,r,l),li(t,r,l,n),si(null,t,r,!0,e,n);case 19:return ca(e,t,n);case 22:return ra(e,t,n)}throw Error(i(156,t.tag))};function Na(e,t){return pu(e,t)}function jf(e,t,n,r){this.tag=e,this.key=n,this.sibling=this.child=this.return=this.stateNode=this.type=this.elementType=null,this.index=0,this.ref=null,this.pendingProps=t,this.dependencies=this.memoizedState=this.updateQueue=this.memoizedProps=null,this.mode=r,this.subtreeFlags=this.flags=0,this.deletions=null,this.childLanes=this.lanes=0,this.alternate=null}function at(e,t,n,r){return new jf(e,t,n,r)}function Ii(e){return e=e.prototype,!(!e||!e.isReactComponent)}function Bf(e){if(typeof e=="function")return Ii(e)?1:0;if(e!=null){if(e=e.$$typeof,e===Le)return 11;if(e===Qe)return 14}return 2}function Yt(e,t){var n=e.alternate;return n===null?(n=at(e.tag,t,e.key,e.mode),n.elementType=e.elementType,n.type=e.type,n.stateNode=e.stateNode,n.alternate=e,e.alternate=n):(n.pendingProps=t,n.type=e.type,n.flags=0,n.subtreeFlags=0,n.deletions=null),n.flags=e.flags&14680064,n.childLanes=e.childLanes,n.lanes=e.lanes,n.child=e.child,n.memoizedProps=e.memoizedProps,n.memoizedState=e.memoizedState,n.updateQueue=e.updateQueue,t=e.dependencies,n.dependencies=t===null?null:{lanes:t.lanes,firstContext:t.firstContext},n.sibling=e.sibling,n.index=e.index,n.ref=e.ref,n}function Rl(e,t,n,r,l,o){var u=2;if(r=e,typeof e=="function")Ii(e)&&(u=1);else if(typeof e=="string")u=5;else e:switch(e){case oe:return cn(n.children,l,o,t);case ne:u=8,l|=8;break;case we:return e=at(12,n,t,l|2),e.elementType=we,e.lanes=o,e;case Ie:return e=at(13,n,t,l),e.elementType=Ie,e.lanes=o,e;case be:return e=at(19,n,t,l),e.elementType=be,e.lanes=o,e;case fe:return Il(n,l,o,t);default:if(typeof e=="object"&&e!==null)switch(e.$$typeof){case Ne:u=10;break e;case $e:u=9;break e;case Le:u=11;break e;case Qe:u=14;break e;case Fe:u=16,r=null;break e}throw Error(i(130,e==null?e:typeof e,""))}return t=at(u,n,t,l),t.elementType=e,t.type=r,t.lanes=o,t}function cn(e,t,n,r){return e=at(7,e,r,t),e.lanes=n,e}function Il(e,t,n,r){return e=at(22,e,r,t),e.elementType=fe,e.lanes=n,e.stateNode={isHidden:!1},e}function Fi(e,t,n){return e=at(6,e,null,t),e.lanes=n,e}function Pi(e,t,n){return t=at(4,e.children!==null?e.children:[],e.key,t),t.lanes=n,t.stateNode={containerInfo:e.containerInfo,pendingChildren:null,implementation:e.implementation},t}function Uf(e,t,n,r,l){this.tag=t,this.containerInfo=e,this.finishedWork=this.pingCache=this.current=this.pendingChildren=null,this.timeoutHandle=-1,this.callbackNode=this.pendingContext=this.context=null,this.callbackPriority=0,this.eventTimes=no(0),this.expirationTimes=no(-1),this.entangledLanes=this.finishedLanes=this.mutableReadLanes=this.expiredLanes=this.pingedLanes=this.suspendedLanes=this.pendingLanes=0,this.entanglements=no(0),this.identifierPrefix=r,this.onRecoverableError=l,this.mutableSourceEagerHydrationData=null}function Mi(e,t,n,r,l,o,u,c,d){return e=new Uf(e,t,n,c,d),t===1?(t=1,o===!0&&(t|=8)):t=0,o=at(3,null,null,t),e.current=o,o.stateNode=e,o.memoizedState={element:r,isDehydrated:n,cache:null,transitions:null,pendingSuspenseBoundaries:null},Ho(o),e}function Vf(e,t,n){var r=3<arguments.length&&arguments[3]!==void 0?arguments[3]:null;return{$$typeof:se,key:r==null?null:""+r,children:e,containerInfo:t,implementation:n}}function La(e){if(!e)return Ut;e=e._reactInternals;e:{if(qt(e)!==e||e.tag!==1)throw Error(i(170));var t=e;do{switch(t.tag){case 3:t=t.stateNode.context;break e;case 1:if(Ge(t.type)){t=t.stateNode.__reactInternalMemoizedMergedChildContext;break e}}t=t.return}while(t!==null);throw Error(i(171))}if(e.tag===1){var n=e.type;if(Ge(n))return as(e,n,t)}return t}function Aa(e,t,n,r,l,o,u,c,d){return e=Mi(n,r,!0,e,l,o,u,c,d),e.context=La(null),n=e.current,r=He(),l=Xt(n),o=Rt(r,l),o.callback=t??null,Wt(n,o,l),e.current.lanes=l,$n(e,l,r),qe(e,r),e}function Fl(e,t,n,r){var l=t.current,o=He(),u=Xt(l);return n=La(n),t.context===null?t.context=n:t.pendingContext=n,t=Rt(o,u),t.payload={element:e},r=r===void 0?null:r,r!==null&&(t.callback=r),e=Wt(l,t,u),e!==null&&(vt(e,l,u,o),il(e,l,u)),u}function Pl(e){if(e=e.current,!e.child)return null;switch(e.child.tag){case 5:return e.child.stateNode;default:return e.child.stateNode}}function Oa(e,t){if(e=e.memoizedState,e!==null&&e.dehydrated!==null){var n=e.retryLane;e.retryLane=n!==0&&n<t?n:t}}function Di(e,t){Oa(e,t),(e=e.alternate)&&Oa(e,t)}function bf(){return null}var ja=typeof reportError=="function"?reportError:function(e){console.error(e)};function zi(e){this._internalRoot=e}Ml.prototype.render=zi.prototype.render=function(e){var t=this._internalRoot;if(t===null)throw Error(i(409));Fl(e,t,null,null)},Ml.prototype.unmount=zi.prototype.unmount=function(){var e=this._internalRoot;if(e!==null){this._internalRoot=null;var t=e.containerInfo;un(function(){Fl(null,e,null,null)}),t[St]=null}};function Ml(e){this._internalRoot=e}Ml.prototype.unstable_scheduleHydration=function(e){if(e){var t=wu();e={blockedOn:null,target:e,priority:t};for(var n=0;n<Lt.length&&t!==0&&t<Lt[n].priority;n++);Lt.splice(n,0,e),n===0&&ku(e)}};function Ni(e){return!(!e||e.nodeType!==1&&e.nodeType!==9&&e.nodeType!==11)}function Dl(e){return!(!e||e.nodeType!==1&&e.nodeType!==9&&e.nodeType!==11&&(e.nodeType!==8||e.nodeValue!==" react-mount-point-unstable "))}function Ba(){}function Wf(e,t,n,r,l){if(l){if(typeof r=="function"){var o=r;r=function(){var _=Pl(u);o.call(_)}}var u=Aa(t,r,e,0,null,!1,!1,"",Ba);return e._reactRootContainer=u,e[St]=u.current,or(e.nodeType===8?e.parentNode:e),un(),u}for(;l=e.lastChild;)e.removeChild(l);if(typeof r=="function"){var c=r;r=function(){var _=Pl(d);c.call(_)}}var d=Mi(e,0,!1,null,null,!1,!1,"",Ba);return e._reactRootContainer=d,e[St]=d.current,or(e.nodeType===8?e.parentNode:e),un(function(){Fl(t,d,n,r)}),d}function zl(e,t,n,r,l){var o=n._reactRootContainer;if(o){var u=o;if(typeof l=="function"){var c=l;l=function(){var d=Pl(u);c.call(d)}}Fl(t,u,e,l)}else u=Wf(n,t,e,l,r);return Pl(u)}xu=function(e){switch(e.tag){case 3:var t=e.stateNode;if(t.current.memoizedState.isDehydrated){var n=Hn(t.pendingLanes);n!==0&&(ro(t,n|1),qe(t,Se()),(q&6)===0&&(Ln=Se()+500,Vt()))}break;case 13:un(function(){var r=Tt(e,1);if(r!==null){var l=He();vt(r,e,1,l)}}),Di(e,1)}},lo=function(e){if(e.tag===13){var t=Tt(e,134217728);if(t!==null){var n=He();vt(t,e,134217728,n)}Di(e,134217728)}},_u=function(e){if(e.tag===13){var t=Xt(e),n=Tt(e,t);if(n!==null){var r=He();vt(n,e,t,r)}Di(e,t)}},wu=function(){return le},Su=function(e,t){var n=le;try{return le=e,t()}finally{le=n}},Kl=function(e,t,n){switch(t){case"input":if(bl(e,n),t=n.name,n.type==="radio"&&t!=null){for(n=e;n.parentNode;)n=n.parentNode;for(n=n.querySelectorAll("input[name="+JSON.stringify(""+t)+'][type="radio"]'),t=0;t<n.length;t++){var r=n[t];if(r!==e&&r.form===e.form){var l=Kr(r);if(!l)throw Error(i(90));Qi(r),bl(r,l)}}}break;case"textarea":qi(e,n);break;case"select":t=n.value,t!=null&&dn(e,!!n.multiple,t,!1)}},iu=Ei,uu=un;var Hf={usingClientEntryPoint:!1,Events:[sr,Sn,Kr,lu,ou,Ei]},Sr={findFiberByHostInstance:Zt,bundleType:0,version:"18.3.1",rendererPackageName:"react-dom"},$f={bundleType:Sr.bundleType,version:Sr.version,rendererPackageName:Sr.rendererPackageName,rendererConfig:Sr.rendererConfig,overrideHookState:null,overrideHookStateDeletePath:null,overrideHookStateRenamePath:null,overrideProps:null,overridePropsDeletePath:null,overridePropsRenamePath:null,setErrorHandler:null,setSuspenseHandler:null,scheduleUpdate:null,currentDispatcherRef:ue.ReactCurrentDispatcher,findHostInstanceByFiber:function(e){return e=fu(e),e===null?null:e.stateNode},findFiberByHostInstance:Sr.findFiberByHostInstance||bf,findHostInstancesForRefresh:null,scheduleRefresh:null,scheduleRoot:null,setRefreshHandler:null,getCurrentFiber:null,reconcilerVersion:"18.3.1-next-f1338f8080-20240426"};if(typeof __REACT_DEVTOOLS_GLOBAL_HOOK__<"u"){var Nl=__REACT_DEVTOOLS_GLOBAL_HOOK__;if(!Nl.isDisabled&&Nl.supportsFiber)try{Mr=Nl.inject($f),gt=Nl}catch{}}return Ze.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED=Hf,Ze.createPortal=function(e,t){var n=2<arguments.length&&arguments[2]!==void 0?arguments[2]:null;if(!Ni(t))throw Error(i(200));return Vf(e,t,null,n)},Ze.createRoot=function(e,t){if(!Ni(e))throw Error(i(299));var n=!1,r="",l=ja;return t!=null&&(t.unstable_strictMode===!0&&(n=!0),t.identifierPrefix!==void 0&&(r=t.identifierPrefix),t.onRecoverableError!==void 0&&(l=t.onRecoverableError)),t=Mi(e,1,!1,null,null,n,!1,r,l),e[St]=t.current,or(e.nodeType===8?e.parentNode:e),new zi(t)},Ze.findDOMNode=function(e){if(e==null)return null;if(e.nodeType===1)return e;var t=e._reactInternals;if(t===void 0)throw typeof e.render=="function"?Error(i(188)):(e=Object.keys(e).join(","),Error(i(268,e)));return e=fu(t),e=e===null?null:e.stateNode,e},Ze.flushSync=function(e){return un(e)},Ze.hydrate=function(e,t,n){if(!Dl(t))throw Error(i(200));return zl(null,e,t,!0,n)},Ze.hydrateRoot=function(e,t,n){if(!Ni(e))throw Error(i(405));var r=n!=null&&n.hydratedSources||null,l=!1,o="",u=ja;if(n!=null&&(n.unstable_strictMode===!0&&(l=!0),n.identifierPrefix!==void 0&&(o=n.identifierPrefix),n.onRecoverableError!==void 0&&(u=n.onRecoverableError)),t=Aa(t,null,e,1,n??null,l,!1,o,u),e[St]=t.current,or(e),r)for(e=0;e<r.length;e++)n=r[e],l=n._getVersion,l=l(n._source),t.mutableSourceEagerHydrationData==null?t.mutableSourceEagerHydrationData=[n,l]:t.mutableSourceEagerHydrationData.push(n,l);return new Ml(t)},Ze.render=function(e,t,n){if(!Dl(t))throw Error(i(200));return zl(null,e,t,!1,n)},Ze.unmountComponentAtNode=function(e){if(!Dl(e))throw Error(i(40));return e._reactRootContainer?(un(function(){zl(null,null,e,!1,function(){e._reactRootContainer=null,e[St]=null})}),!0):!1},Ze.unstable_batchedUpdates=Ei,Ze.unstable_renderSubtreeIntoContainer=function(e,t,n,r){if(!Dl(n))throw Error(i(200));if(e==null||e._reactInternals===void 0)throw Error(i(38));return zl(e,t,n,!1,r)},Ze.version="18.3.1-next-f1338f8080-20240426",Ze}var Xa;function td(){if(Xa)return Oi.exports;Xa=1;function g(){if(!(typeof __REACT_DEVTOOLS_GLOBAL_HOOK__>"u"||typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE!="function"))try{__REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE(g)}catch(s){console.error(s)}}return g(),Oi.exports=ed(),Oi.exports}var Ga;function nd(){if(Ga)return Ll;Ga=1;var g=td();return Ll.createRoot=g.createRoot,Ll.hydrateRoot=g.hydrateRoot,Ll}var rd=nd();class ld{constructor(s){P(this,"gl");P(this,"emptyVAO");P(this,"lost",!1);const i=s.getContext("webgl2",{alpha:!1,antialias:!1,preserveDrawingBuffer:!0,powerPreference:"high-performance"});if(!i)throw new Error("WebGL 2 is not supported in this browser");this.gl=i,i.getExtension("EXT_color_buffer_float"),i.getExtension("OES_texture_float_linear");const a=i.createVertexArray();if(!a)throw new Error("Failed to create VAO");this.emptyVAO=a,s.addEventListener("webglcontextlost",p=>{p.preventDefault(),this.lost=!0,console.warn("WebGL context lost")}),s.addEventListener("webglcontextrestored",()=>{this.lost=!1,console.info("WebGL context restored")})}get isLost(){return this.lost}bindFullscreenQuad(){this.gl.bindVertexArray(this.emptyVAO)}drawFullscreenQuad(){this.gl.bindVertexArray(this.emptyVAO),this.gl.drawArrays(this.gl.TRIANGLES,0,6)}dispose(){this.gl.deleteVertexArray(this.emptyVAO)}}class od{constructor(){P(this,"startTime",0);P(this,"lastTime",0);P(this,"time",0);P(this,"deltaTime",0);P(this,"frameCount",0)}start(){this.startTime=performance.now()/1e3,this.lastTime=this.startTime,this.time=0,this.deltaTime=0,this.frameCount=0}tick(){const s=performance.now()/1e3;this.deltaTime=s-this.lastTime,this.lastTime=s,this.time=s-this.startTime,this.frameCount++}}class id{constructor(s){P(this,"pool",new Map);P(this,"gl");this.gl=s}acquire(s,i){const a=`${s}x${i}`,p=this.pool.get(a);if(p){const f=p.find(D=>!D.inUse);if(f)return f.inUse=!0,{fbo:f.fbo,texture:f.texture,width:s,height:i}}const{gl:y}=this,w=y.createFramebuffer(),S=y.createTexture();y.bindTexture(y.TEXTURE_2D,S),y.texImage2D(y.TEXTURE_2D,0,y.RGBA16F,s,i,0,y.RGBA,y.FLOAT,null),y.texParameteri(y.TEXTURE_2D,y.TEXTURE_MIN_FILTER,y.LINEAR),y.texParameteri(y.TEXTURE_2D,y.TEXTURE_MAG_FILTER,y.LINEAR),y.texParameteri(y.TEXTURE_2D,y.TEXTURE_WRAP_S,y.CLAMP_TO_EDGE),y.texParameteri(y.TEXTURE_2D,y.TEXTURE_WRAP_T,y.CLAMP_TO_EDGE),y.bindFramebuffer(y.FRAMEBUFFER,w),y.framebufferTexture2D(y.FRAMEBUFFER,y.COLOR_ATTACHMENT0,y.TEXTURE_2D,S,0),y.bindFramebuffer(y.FRAMEBUFFER,null);const T={fbo:w,texture:S,inUse:!0};return this.pool.has(a)||this.pool.set(a,[]),this.pool.get(a).push(T),{fbo:w,texture:S,width:s,height:i}}release(s){const i=`${s.width}x${s.height}`,a=this.pool.get(i);if(!a)return;const p=a.find(y=>y.fbo===s.fbo);p&&(p.inUse=!1)}handleResize(){const{gl:s}=this;for(const i of this.pool.values())for(const a of i)s.deleteFramebuffer(a.fbo),s.deleteTexture(a.texture);this.pool.clear()}dispose(){this.handleResize()}}class ud{constructor(s){P(this,"canvas");P(this,"state",{mouse:{x:.5,y:.5,px:0,py:0,down:!1,button:0,dx:0,dy:0},keys:new Set,touches:[]});P(this,"prevMx",0);P(this,"prevMy",0);P(this,"bound",!1);P(this,"handlers",[]);P(this,"audioContext",null);P(this,"analyser",null);P(this,"fftData",null);P(this,"audioSource",null);P(this,"audioEnabled",!1);P(this,"midiAccess",null);P(this,"midiValues",new Map);P(this,"midiEnabled",!1);P(this,"handleMIDIMessage",s=>{const i=s.data;if(!i||i.length<3)return;if((i[0]&240)===176){const p=i[1],y=i[2]/127;this.midiValues.set(p,y)}});this.canvas=s}attach(){if(this.bound)return;this.bound=!0;const s=(i,a,p)=>{i.addEventListener(a,p),this.handlers.push([a,p,i])};s(this.canvas,"mousemove",i=>{const a=i,p=this.canvas.getBoundingClientRect();this.state.mouse.px=a.clientX-p.left,this.state.mouse.py=a.clientY-p.top,this.state.mouse.x=this.state.mouse.px/p.width,this.state.mouse.y=1-this.state.mouse.py/p.height}),s(this.canvas,"mousedown",i=>{const a=i;this.state.mouse.down=!0,this.state.mouse.button=a.button}),s(this.canvas,"mouseup",()=>{this.state.mouse.down=!1}),s(this.canvas,"mouseleave",()=>{this.state.mouse.down=!1}),s(window,"keydown",i=>{this.state.keys.add(i.code)}),s(window,"keyup",i=>{this.state.keys.delete(i.code)}),s(this.canvas,"touchstart",i=>{i.preventDefault(),this.updateTouches(i)}),s(this.canvas,"touchmove",i=>{i.preventDefault(),this.updateTouches(i)}),s(this.canvas,"touchend",i=>{this.updateTouches(i)}),s(this.canvas,"contextmenu",i=>i.preventDefault())}updateTouches(s){const i=this.canvas.getBoundingClientRect();if(this.state.touches=Array.from(s.touches).map(a=>({id:a.identifier,x:(a.clientX-i.left)/i.width,y:1-(a.clientY-i.top)/i.height})),s.touches.length>0){const a=s.touches[0];this.state.mouse.px=a.clientX-i.left,this.state.mouse.py=a.clientY-i.top,this.state.mouse.x=this.state.mouse.px/i.width,this.state.mouse.y=1-this.state.mouse.py/i.height,this.state.mouse.down=!0}else this.state.mouse.down=!1}async enableAudio(){if(!this.audioEnabled)try{this.audioContext=new AudioContext,this.analyser=this.audioContext.createAnalyser(),this.analyser.fftSize=256,this.analyser.smoothingTimeConstant=.8,this.fftData=new Float32Array(this.analyser.frequencyBinCount);const s=await navigator.mediaDevices.getUserMedia({audio:!0});this.audioSource=this.audioContext.createMediaStreamSource(s),this.audioSource.connect(this.analyser),this.audioEnabled=!0}catch(s){console.warn("Audio input not available:",s)}}disableAudio(){this.audioSource&&(this.audioSource.disconnect(),this.audioSource.mediaStream.getTracks().forEach(s=>s.stop()),this.audioSource=null),this.audioContext&&(this.audioContext.close(),this.audioContext=null),this.analyser=null,this.fftData=null,this.audioEnabled=!1,delete this.state.audioFFT}async enableMIDI(){if(!this.midiEnabled)try{this.midiAccess=await navigator.requestMIDIAccess(),this.midiAccess.inputs.forEach(s=>{s.onmidimessage=this.handleMIDIMessage}),this.midiAccess.onstatechange=()=>{var s;(s=this.midiAccess)==null||s.inputs.forEach(i=>{i.onmidimessage=this.handleMIDIMessage})},this.midiEnabled=!0,this.state.midiCC=this.midiValues}catch(s){console.warn("MIDI not available:",s)}}disableMIDI(){this.midiAccess&&this.midiAccess.inputs.forEach(s=>{s.onmidimessage=null}),this.midiAccess=null,this.midiValues.clear(),this.midiEnabled=!1,delete this.state.midiCC}poll(){return this.state.mouse.dx=this.state.mouse.x-this.prevMx,this.state.mouse.dy=this.state.mouse.y-this.prevMy,this.prevMx=this.state.mouse.x,this.prevMy=this.state.mouse.y,this.analyser&&this.fftData&&(this.analyser.getFloatFrequencyData(this.fftData),this.state.audioFFT=this.fftData),this.state}detach(){for(const[s,i,a]of this.handlers)a.removeEventListener(s,i);this.handlers=[],this.bound=!1,this.disableAudio(),this.disableMIDI()}}class sd{constructor(){P(this,"values",new Map);P(this,"descriptors",new Map);P(this,"listeners",new Set);P(this,"version",0);P(this,"subscribe",s=>(this.listeners.add(s),()=>this.listeners.delete(s)));P(this,"getSnapshot",()=>this.version)}registerEffect(s,i){this.descriptors.set(s,i);const a=new Map;for(const p of i.parameters)a.set(p.id,p.default);this.values.set(s,a),this.notify()}unregisterEffect(s){this.values.delete(s),this.descriptors.delete(s),this.notify()}setValue(s,i,a){const p=this.values.get(s);p&&(p.set(i,a),this.notify())}getValues(s){const i=this.values.get(s);if(!i)return{};const a={};for(const[p,y]of i)a[p]=y;return a}getDescriptor(s){return this.descriptors.get(s)}getAllInstanceIds(){return Array.from(this.descriptors.keys())}setValues(s,i){const a=this.values.get(s);if(a){for(const[p,y]of Object.entries(i))a.set(p,y);this.notify()}}serialize(){const s={};for(const[i,a]of this.values)s[i]=this.getValues(i);return s}notify(){this.version++;for(const s of this.listeners)s()}}const ad=/#include\s+<(.+?)>/g;class fn{constructor(s,i,a,p){P(this,"program");P(this,"gl");P(this,"uniformCache",new Map);this.gl=s;const y=fn.preprocess(i,p),w=fn.preprocess(a,p),S=fn.compile(s,s.VERTEX_SHADER,y),T=fn.compile(s,s.FRAGMENT_SHADER,w),f=s.createProgram();if(!f)throw new Error("Failed to create program");if(s.attachShader(f,S),s.attachShader(f,T),s.linkProgram(f),s.deleteShader(S),s.deleteShader(T),!s.getProgramParameter(f,s.LINK_STATUS)){const D=s.getProgramInfoLog(f);throw s.deleteProgram(f),new Error(`Program link failed: ${D}`)}this.program=f}static preprocess(s,i){return i?s.replace(ad,(a,p)=>{const y=i.get(p);return y===void 0?(console.warn(`Shader include not found: ${p}`),""):y}):s}static compile(s,i,a){const p=s.createShader(i);if(!p)throw new Error("Failed to create shader");if(s.shaderSource(p,a),s.compileShader(p),!s.getShaderParameter(p,s.COMPILE_STATUS)){const y=s.getShaderInfoLog(p),w=i===s.VERTEX_SHADER?"vertex":"fragment";throw s.deleteShader(p),new Error(`${w} shader compile failed:
${y}

Source:
${a}`)}return p}use(){this.gl.useProgram(this.program)}loc(s){let i=this.uniformCache.get(s);return i===void 0&&(i=this.gl.getUniformLocation(this.program,s),this.uniformCache.set(s,i)),i}setFloat(s,i){const a=this.loc(s);a&&this.gl.uniform1f(a,i)}setInt(s,i){const a=this.loc(s);a&&this.gl.uniform1i(a,i)}setVec2(s,i,a){const p=this.loc(s);p&&this.gl.uniform2f(p,i,a)}setVec3(s,i,a,p){const y=this.loc(s);y&&this.gl.uniform3f(y,i,a,p)}setVec4(s,i,a,p,y){const w=this.loc(s);w&&this.gl.uniform4f(w,i,a,p,y)}setTexture(s,i,a){this.gl.activeTexture(this.gl.TEXTURE0+a),this.gl.bindTexture(this.gl.TEXTURE_2D,i);const p=this.loc(s);p&&this.gl.uniform1i(p,a)}dispose(){this.gl.deleteProgram(this.program)}}const cd=`// Simplex 2D noise - adapted from Ashima Arts
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
`,dd=new Map([["noise.glsl",cd],["color-utils.glsl",fd]]);class Pt{constructor(){P(this,"shader",null);P(this,"outputTexture",null);P(this,"gl",null);P(this,"w",0);P(this,"h",0)}resize(s,i){this.w=s,this.h=i}dispose(){var s;(s=this.shader)==null||s.dispose(),this.shader=null}getOutputTexture(s){return this.outputTexture}createShader(s,i,a){return new fn(s,i,a,dd)}}const Mt=`#version 300 es

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
`,md={id:"noise-flow-field",name:"Noise Flow Field",description:"Simplex noise driven flow field with configurable turbulence",parameters:[{id:"speed",type:"float",label:"Flow Speed",min:0,max:5,step:.01,default:.8,group:"Motion"},{id:"scale",type:"float",label:"Noise Scale",min:.1,max:20,step:.1,default:4,group:"Shape"},{id:"octaves",type:"int",label:"Octaves",min:1,max:8,default:4,group:"Shape"},{id:"lacunarity",type:"float",label:"Lacunarity",min:1,max:4,step:.01,default:2,group:"Shape"},{id:"gain",type:"float",label:"Gain",min:.1,max:1,step:.01,default:.5,group:"Shape"},{id:"distortion",type:"float",label:"Distortion",min:0,max:5,step:.01,default:1.5,group:"Shape"},{id:"brightness",type:"float",label:"Brightness",min:.1,max:3,step:.01,default:1.2,group:"Color"},{id:"color1",type:"color",label:"Color A",default:[.05,.1,.35,1],group:"Color"},{id:"color2",type:"color",label:"Color B",default:[.95,.4,.1,1],group:"Color"},{id:"mouseInfluence",type:"float",label:"Mouse Influence",min:0,max:2,step:.01,default:.5,group:"Interaction"}],inputs:[{id:"input0",label:"Background",type:"texture"}],outputs:[{id:"output0",label:"Result",type:"texture"}]};class hd extends Pt{constructor(){super(...arguments);P(this,"descriptor",md)}init(i){this.gl=i,this.shader=this.createShader(i,Mt,pd)}render(i,a,p){const{gl:y,time:w,resolution:S,input:T}=i,f=this.shader;f.use(),f.setFloat("u_time",w),f.setVec2("u_resolution",S[0],S[1]),f.setVec2("u_mouse",T.mouse.x,T.mouse.y),f.setFloat("u_speed",a.speed),f.setFloat("u_scale",a.scale),f.setInt("u_octaves",a.octaves),f.setFloat("u_lacunarity",a.lacunarity),f.setFloat("u_gain",a.gain),f.setFloat("u_distortion",a.distortion),f.setFloat("u_brightness",a.brightness),f.setFloat("u_mouseInfluence",a.mouseInfluence);const D=a.color1;f.setVec4("u_color1",D[0],D[1],D[2],D[3]);const M=a.color2;f.setVec4("u_color2",M[0],M[1],M[2],M[3]);const $=p.get("input0");$?(f.setTexture("u_inputTexture",$,0),f.setInt("u_hasInput",1)):f.setInt("u_hasInput",0),y.drawArrays(y.TRIANGLES,0,6)}}const vd=`#version 300 es
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
`,gd={id:"fractal-explorer",name:"Fractal Explorer",description:"Interactive Mandelbrot and Julia set explorer",parameters:[{id:"zoom",type:"float",label:"Zoom",min:.1,max:1e3,step:.1,default:1,group:"View"},{id:"centerX",type:"float",label:"Center X",min:-3,max:3,step:.001,default:-.5,group:"View"},{id:"centerY",type:"float",label:"Center Y",min:-3,max:3,step:.001,default:0,group:"View"},{id:"maxIterations",type:"int",label:"Max Iterations",min:10,max:1e3,default:200,group:"Quality"},{id:"escapeRadius",type:"float",label:"Escape Radius",min:2,max:100,step:.1,default:4,group:"Quality"},{id:"power",type:"float",label:"Power",min:2,max:8,step:.1,default:2,group:"Shape"},{id:"juliaMode",type:"bool",label:"Julia Mode",default:!1,group:"Shape"},{id:"juliaCx",type:"float",label:"Julia C.x",min:-2,max:2,step:.001,default:-.7,group:"Shape"},{id:"juliaCy",type:"float",label:"Julia C.y",min:-2,max:2,step:.001,default:.27015,group:"Shape"},{id:"colorSpeed",type:"float",label:"Color Speed",min:.1,max:20,step:.1,default:3,group:"Color"},{id:"colorOffset",type:"float",label:"Color Offset",min:0,max:1,step:.01,default:0,group:"Color"},{id:"innerColor",type:"color",label:"Inner Color",default:[0,0,0,1],group:"Color"},{id:"mouseInfluence",type:"float",label:"Mouse Influence",min:0,max:2,step:.01,default:.3,group:"Interaction"}],inputs:[{id:"input0",label:"Background",type:"texture"}],outputs:[{id:"output0",label:"Result",type:"texture"}]};class yd extends Pt{constructor(){super(...arguments);P(this,"descriptor",gd)}init(i){this.gl=i,this.shader=this.createShader(i,Mt,vd)}render(i,a,p){const{gl:y,time:w,resolution:S,input:T}=i,f=this.shader;f.use(),f.setFloat("u_time",w),f.setVec2("u_resolution",S[0],S[1]),f.setVec2("u_mouse",T.mouse.x,T.mouse.y),f.setFloat("u_zoom",a.zoom),f.setVec2("u_center",a.centerX,a.centerY),f.setInt("u_maxIterations",a.maxIterations),f.setFloat("u_escapeRadius",a.escapeRadius),f.setFloat("u_power",a.power),f.setInt("u_juliaMode",a.juliaMode?1:0),f.setVec2("u_juliaC",a.juliaCx,a.juliaCy),f.setFloat("u_colorSpeed",a.colorSpeed),f.setFloat("u_colorOffset",a.colorOffset),f.setFloat("u_mouseInfluence",a.mouseInfluence);const D=a.innerColor;f.setVec4("u_innerColor",D[0],D[1],D[2],D[3]);const M=p.get("input0");M?(f.setTexture("u_inputTexture",M,0),f.setInt("u_hasInput",1)):f.setInt("u_hasInput",0),y.drawArrays(y.TRIANGLES,0,6)}}const xd=`#version 300 es

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
`,wd=typeof navigator<"u"&&/Mobi|Android/i.test(navigator.userAgent),On=wd?15e3:5e4,Al=0,Ol=1,Ui=2,Vi=3,jl=4,bi=5,Bl=6,Wi=4,Sd={id:"particle-system",name:"Particle System",description:"Particle system with lazy wandering attractor and touch interaction",parameters:[{id:"speed",type:"float",label:"Speed",min:.1,max:5,step:.01,default:1,group:"Motion"},{id:"mouseAttract",type:"float",label:"Attract Force",min:0,max:3,step:.01,default:.8,group:"Interaction"},{id:"followLag",type:"float",label:"Follow Lag",min:.5,max:8,step:.1,default:3,group:"Interaction"},{id:"turbulence",type:"float",label:"Turbulence",min:0,max:3,step:.01,default:.5,group:"Motion"},{id:"damping",type:"float",label:"Damping",min:0,max:5,step:.01,default:1.5,group:"Motion"},{id:"wanderSpeed",type:"float",label:"Wander Speed",min:.05,max:1,step:.01,default:.2,group:"Wander"},{id:"wanderRadius",type:"float",label:"Wander Radius",min:.1,max:.5,step:.01,default:.3,group:"Wander"},{id:"lifeDecay",type:"float",label:"Life Decay",min:.05,max:3,step:.01,default:.3,group:"Lifecycle"},{id:"pointScale",type:"float",label:"Point Scale",min:.5,max:10,step:.1,default:3,group:"Appearance"},{id:"colorBirth",type:"color",label:"Birth Color",default:[1,.8,.3,1],group:"Color"},{id:"colorDeath",type:"color",label:"Death Color",default:[.2,.05,.5,0],group:"Color"}],inputs:[{id:"input0",label:"Background",type:"texture"}],outputs:[{id:"output0",label:"Result",type:"texture"}]};class Cd{constructor(){P(this,"descriptor",Sd);P(this,"gl",null);P(this,"renderProgram",null);P(this,"vbo",null);P(this,"vao",null);P(this,"outputTexture",null);P(this,"particles",null);P(this,"renderData",null);P(this,"wanderX",.5);P(this,"wanderY",.5);P(this,"wanderAngle",0);P(this,"targetX",.5);P(this,"targetY",.5);P(this,"touching",!1)}init(s){this.gl=s,this.renderProgram=new fn(s,xd,_d),this.particles=new Float32Array(On*Bl),this.renderData=new Float32Array(On*Wi);for(let a=0;a<On;a++){const p=a*Bl;this.particles[p+Al]=Math.random(),this.particles[p+Ol]=Math.random(),this.particles[p+Ui]=(Math.random()-.5)*.1,this.particles[p+Vi]=(Math.random()-.5)*.1,this.particles[p+jl]=Math.random(),this.particles[p+bi]=1+Math.random()*3}this.vbo=s.createBuffer(),s.bindBuffer(s.ARRAY_BUFFER,this.vbo),s.bufferData(s.ARRAY_BUFFER,this.renderData.byteLength,s.DYNAMIC_DRAW),this.vao=s.createVertexArray(),s.bindVertexArray(this.vao),s.bindBuffer(s.ARRAY_BUFFER,this.vbo);const i=Wi*4;s.enableVertexAttribArray(0),s.vertexAttribPointer(0,2,s.FLOAT,!1,i,0),s.enableVertexAttribArray(1),s.vertexAttribPointer(1,1,s.FLOAT,!1,i,8),s.enableVertexAttribArray(2),s.vertexAttribPointer(2,1,s.FLOAT,!1,i,12),s.bindVertexArray(null)}updateWanderer(s,i,a){this.wanderAngle+=(Math.random()-.5)*2*s,this.wanderX+=Math.cos(this.wanderAngle)*i*s,this.wanderY+=Math.sin(this.wanderAngle)*i*s;const p=this.wanderX-.5,y=this.wanderY-.5;if(Math.max(Math.abs(p),Math.abs(y))>a){const f=((Math.atan2(-y,-p)-this.wanderAngle+Math.PI)%(Math.PI*2)+Math.PI*2)%(Math.PI*2)-Math.PI;this.wanderAngle+=f*2*s}this.wanderX=Math.max(.05,Math.min(.95,this.wanderX)),this.wanderY=Math.max(.05,Math.min(.95,this.wanderY))}simulate(s,i,a,p,y,w){const S=this.particles,T=w.speed,f=w.mouseAttract,D=w.followLag,M=w.turbulence,$=w.damping,te=w.wanderSpeed,ie=w.wanderRadius,G=w.lifeDecay,W=s*T;this.updateWanderer(s,te,ie),this.touching=p;const ye=this.touching?i:this.wanderX,_e=this.touching?a:this.wanderY,ke=1-Math.exp(-s/(D*.3));this.targetX+=(ye-this.targetX)*ke,this.targetY+=(_e-this.targetY)*ke;const ue=this.targetX,ze=this.targetY;for(let oe=0;oe<On;oe++){const ne=oe*Bl;let we=S[ne+Al],Ne=S[ne+Ol],$e=S[ne+Ui],Le=S[ne+Vi],Ie=S[ne+jl];const be=ue-we,Qe=ze-Ne,Fe=Math.sqrt(be*be+Qe*Qe)+.001,fe=f*W/(Fe*5+.1);$e+=be/Fe*fe,Le+=Qe/Fe*fe;const z=we*12.9898+Ne*78.233+y*.7+oe*.001,U=Math.sin(z)*43758.5453%6.28318;$e+=Math.cos(U)*M*W,Le+=Math.sin(U)*M*W;const L=Math.max(0,1-$*W);$e*=L,Le*=L,we+=$e*W,Ne+=Le*W,Ie-=G*W,Ie<=0&&(we=ue+(Math.random()-.5)*.08,Ne=ze+(Math.random()-.5)*.08,$e=(Math.random()-.5)*.2,Le=(Math.random()-.5)*.2,Ie=.5+Math.random()*.5,S[ne+bi]=1+Math.random()*3),we=(we%1+1)%1,Ne=(Ne%1+1)%1,S[ne+Al]=we,S[ne+Ol]=Ne,S[ne+Ui]=$e,S[ne+Vi]=Le,S[ne+jl]=Ie}const se=this.renderData;for(let oe=0;oe<On;oe++){const ne=oe*Bl,we=oe*Wi;se[we]=S[ne+Al],se[we+1]=S[ne+Ol],se[we+2]=S[ne+jl],se[we+3]=S[ne+bi]}}render(s,i,a){const p=this.gl;this.simulate(s.deltaTime,s.input.mouse.x,s.input.mouse.y,s.input.mouse.down,s.time,i),p.bindBuffer(p.ARRAY_BUFFER,this.vbo),p.bufferSubData(p.ARRAY_BUFFER,0,this.renderData),p.clearColor(.02,.02,.04,1),p.clear(p.COLOR_BUFFER_BIT),p.enable(p.BLEND),p.blendFunc(p.SRC_ALPHA,p.ONE);const y=this.renderProgram;y.use(),y.setVec2("u_resolution",s.resolution[0],s.resolution[1]),y.setFloat("u_pointScale",i.pointScale);const w=i.colorBirth;y.setVec4("u_colorBirth",w[0],w[1],w[2],w[3]);const S=i.colorDeath;y.setVec4("u_colorDeath",S[0],S[1],S[2],S[3]),p.bindVertexArray(this.vao),p.drawArrays(p.POINTS,0,On),p.bindVertexArray(null),p.disable(p.BLEND)}resize(s,i){}dispose(){var i;const s=this.gl;s&&((i=this.renderProgram)==null||i.dispose(),this.vbo&&s.deleteBuffer(this.vbo),this.vao&&s.deleteVertexArray(this.vao),this.particles=null,this.renderData=null)}getOutputTexture(s){return this.outputTexture}}const kd=`#version 300 es
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
`,Ed={id:"feedback-echo",name:"Feedback Echo",description:"Frame-buffer feedback with decay, zoom, rotation, and color shifting",parameters:[{id:"decay",type:"float",label:"Decay",min:.8,max:1,step:.001,default:.97,group:"Feedback"},{id:"zoom",type:"float",label:"Zoom",min:.95,max:1.05,step:.001,default:.995,group:"Transform"},{id:"rotation",type:"float",label:"Rotation",min:-.1,max:.1,step:1e-4,default:.003,group:"Transform"},{id:"blurAmount",type:"float",label:"Blur",min:0,max:5,step:.1,default:1,group:"Feedback"},{id:"colorShiftSpeed",type:"float",label:"Color Shift",min:0,max:5,step:.01,default:.5,group:"Color"},{id:"tintColor",type:"color",label:"Tint Color",default:[.3,.1,.8,1],group:"Color"},{id:"tintStrength",type:"float",label:"Tint Strength",min:0,max:.5,step:.01,default:.02,group:"Color"},{id:"mirror",type:"bool",label:"Mirror",default:!1,group:"Transform"}],inputs:[{id:"input0",label:"Input",type:"texture"}],outputs:[{id:"output0",label:"Result",type:"texture"}]};class Td extends Pt{constructor(){super(...arguments);P(this,"descriptor",Ed);P(this,"fboA",null);P(this,"fboB",null);P(this,"texA",null);P(this,"texB",null);P(this,"pingPong",0)}init(i){this.gl=i,this.shader=this.createShader(i,Mt,kd)}resize(i,a){super.resize(i,a),this.createFBOs()}createFBOs(){const i=this.gl;this.fboA&&i.deleteFramebuffer(this.fboA),this.fboB&&i.deleteFramebuffer(this.fboB),this.texA&&i.deleteTexture(this.texA),this.texB&&i.deleteTexture(this.texB);const a=()=>{const w=i.createTexture();i.bindTexture(i.TEXTURE_2D,w),i.texImage2D(i.TEXTURE_2D,0,i.RGBA16F,this.w,this.h,0,i.RGBA,i.FLOAT,null),i.texParameteri(i.TEXTURE_2D,i.TEXTURE_MIN_FILTER,i.LINEAR),i.texParameteri(i.TEXTURE_2D,i.TEXTURE_MAG_FILTER,i.LINEAR),i.texParameteri(i.TEXTURE_2D,i.TEXTURE_WRAP_S,i.CLAMP_TO_EDGE),i.texParameteri(i.TEXTURE_2D,i.TEXTURE_WRAP_T,i.CLAMP_TO_EDGE);const S=i.createFramebuffer();return i.bindFramebuffer(i.FRAMEBUFFER,S),i.framebufferTexture2D(i.FRAMEBUFFER,i.COLOR_ATTACHMENT0,i.TEXTURE_2D,w,0),i.bindFramebuffer(i.FRAMEBUFFER,null),{fbo:S,tex:w}},p=a(),y=a();this.fboA=p.fbo,this.texA=p.tex,this.fboB=y.fbo,this.texB=y.tex}render(i,a,p){const y=this.gl;if(!this.fboA||!this.fboB)return;const w=this.shader,S=this.pingPong===0?this.texA:this.texB,T=this.pingPong===0?this.fboB:this.fboA,f=this.pingPong===0?this.texB:this.texA;y.bindFramebuffer(y.FRAMEBUFFER,T),y.viewport(0,0,this.w,this.h),w.use(),w.setVec2("u_resolution",this.w,this.h),w.setFloat("u_time",i.time),w.setFloat("u_decay",a.decay),w.setFloat("u_zoom",a.zoom),w.setFloat("u_rotation",a.rotation),w.setFloat("u_blurAmount",a.blurAmount),w.setFloat("u_colorShiftSpeed",a.colorShiftSpeed),w.setFloat("u_tintStrength",a.tintStrength),w.setFloat("u_mirror",a.mirror?1:0);const D=a.tintColor;w.setVec4("u_tintColor",D[0],D[1],D[2],D[3]),w.setTexture("u_prevFrame",S,0);const M=p.get("input0");M?(w.setTexture("u_inputTexture",M,1),w.setInt("u_hasInput",1)):w.setInt("u_hasInput",0),y.drawArrays(y.TRIANGLES,0,6),this.outputTexture=f,this.pingPong=1-this.pingPong}dispose(){super.dispose();const i=this.gl;i&&(this.fboA&&i.deleteFramebuffer(this.fboA),this.fboB&&i.deleteFramebuffer(this.fboB),this.texA&&i.deleteTexture(this.texA),this.texB&&i.deleteTexture(this.texB))}}const Rd=`#version 300 es
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
`,Id={id:"kaleidoscope",name:"Kaleidoscope",description:"Symmetrical kaleidoscope with multiple pattern generators",parameters:[{id:"segments",type:"int",label:"Segments",min:2,max:24,default:8,group:"Shape"},{id:"rotation",type:"float",label:"Rotation",min:-2,max:2,step:.01,default:.3,group:"Shape"},{id:"zoom",type:"float",label:"Zoom",min:.2,max:5,step:.01,default:1.5,group:"Shape"},{id:"spiralAmount",type:"float",label:"Spiral",min:-5,max:5,step:.01,default:.5,group:"Shape"},{id:"patternType",type:"enum",label:"Pattern",options:[{value:"0",label:"Plasma"},{value:"1",label:"Electric Rings"},{value:"2",label:"Cellular"}],default:"0",group:"Pattern"},{id:"patternSpeed",type:"float",label:"Speed",min:0,max:3,step:.01,default:.8,group:"Pattern"},{id:"colorCycle",type:"float",label:"Color Cycle",min:0,max:5,step:.01,default:1,group:"Color"},{id:"brightness",type:"float",label:"Brightness",min:.2,max:2,step:.01,default:1,group:"Color"},{id:"mouseInfluence",type:"float",label:"Mouse Influence",min:0,max:2,step:.01,default:.5,group:"Interaction"}],inputs:[{id:"input0",label:"Background",type:"texture"}],outputs:[{id:"output0",label:"Result",type:"texture"}]};class Fd extends Pt{constructor(){super(...arguments);P(this,"descriptor",Id)}init(i){this.gl=i,this.shader=this.createShader(i,Mt,Rd)}render(i,a,p){const{gl:y,time:w,resolution:S,input:T}=i,f=this.shader;f.use(),f.setFloat("u_time",w),f.setVec2("u_resolution",S[0],S[1]),f.setVec2("u_mouse",T.mouse.x,T.mouse.y),f.setInt("u_segments",a.segments),f.setFloat("u_rotation",a.rotation),f.setFloat("u_zoom",a.zoom),f.setFloat("u_spiralAmount",a.spiralAmount),f.setInt("u_patternType",parseInt(a.patternType,10)),f.setFloat("u_patternSpeed",a.patternSpeed),f.setFloat("u_colorCycle",a.colorCycle),f.setFloat("u_brightness",a.brightness),f.setFloat("u_mouseInfluence",a.mouseInfluence);const D=p.get("input0");D?(f.setTexture("u_inputTexture",D,0),f.setInt("u_hasInput",1)):f.setInt("u_hasInput",0),y.drawArrays(y.TRIANGLES,0,6)}}const Pd=`#version 300 es
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
`,Md={id:"audio-waveform",name:"Audio Waveform",description:"Audio-reactive visualizer with waveforms, circular, and bar modes",parameters:[{id:"visualMode",type:"enum",label:"Mode",options:[{value:"0",label:"Waveforms"},{value:"1",label:"Circular"},{value:"2",label:"Frequency Bars"}],default:"0",group:"Visualization"},{id:"waveCount",type:"int",label:"Wave Count",min:1,max:8,default:4,group:"Shape"},{id:"waveAmplitude",type:"float",label:"Amplitude",min:0,max:.5,step:.01,default:.15,group:"Shape"},{id:"waveSpeed",type:"float",label:"Speed",min:0,max:5,step:.01,default:1,group:"Shape"},{id:"lineWidth",type:"float",label:"Line Width",min:.5,max:5,step:.1,default:2,group:"Shape"},{id:"glowIntensity",type:"float",label:"Glow",min:0,max:3,step:.01,default:1,group:"Appearance"},{id:"colorCycle",type:"float",label:"Color Cycle",min:0,max:5,step:.01,default:1,group:"Color"},{id:"mouseInfluence",type:"float",label:"Mouse Influence",min:0,max:2,step:.01,default:.3,group:"Interaction"}],inputs:[{id:"input0",label:"Background",type:"texture"}],outputs:[{id:"output0",label:"Result",type:"texture"}]};class Dd extends Pt{constructor(){super(...arguments);P(this,"descriptor",Md)}init(i){this.gl=i,this.shader=this.createShader(i,Mt,Pd)}render(i,a,p){const{gl:y,time:w,resolution:S,input:T}=i,f=this.shader;f.use();let D=0,M=0,$=0,te=0;if(T.audioFFT){const G=T.audioFFT,W=G.length,ye=Math.floor(W*.15),_e=Math.floor(W*.5);let ke=0,ue=0,ze=0;for(let se=0;se<W;se++){const oe=Math.max(0,(G[se]+100)/100);se<ye?ke+=oe:se<_e?ue+=oe:ze+=oe}M=ke/ye,$=ue/(_e-ye),te=ze/(W-_e),D=(M+$+te)/3}else M=.3+Math.sin(w*1.2)*.2+Math.sin(w*.5)*.15,$=.25+Math.sin(w*2.1)*.15+Math.sin(w*.8)*.1,te=.2+Math.sin(w*3.7)*.12+Math.sin(w*1.5)*.08,D=(M+$+te)/3;f.setFloat("u_time",w),f.setVec2("u_resolution",S[0],S[1]),f.setVec2("u_mouse",T.mouse.x,T.mouse.y),f.setFloat("u_audioLevel",D),f.setFloat("u_bassLevel",M),f.setFloat("u_midLevel",$),f.setFloat("u_trebleLevel",te),f.setFloat("u_lineWidth",a.lineWidth),f.setFloat("u_glowIntensity",a.glowIntensity),f.setFloat("u_waveAmplitude",a.waveAmplitude),f.setFloat("u_waveSpeed",a.waveSpeed),f.setInt("u_waveCount",a.waveCount),f.setFloat("u_colorCycle",a.colorCycle),f.setFloat("u_mouseInfluence",a.mouseInfluence),f.setInt("u_visualMode",parseInt(a.visualMode,10));const ie=p.get("input0");ie?(f.setTexture("u_inputTexture",ie,0),f.setInt("u_hasInput",1)):f.setInt("u_hasInput",0),y.drawArrays(y.TRIANGLES,0,6)}}const zd=`#version 300 es
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
`,Nd={id:"voronoi-liquid",name:"Voronoi Liquid",description:"Organic flowing cellular patterns with domain warping",parameters:[{id:"cellScale",type:"float",label:"Cell Scale",min:1,max:12,step:.1,default:4,group:"Shape"},{id:"warpStrength",type:"float",label:"Warp",min:0,max:2,step:.01,default:.6,group:"Shape"},{id:"animSpeed",type:"float",label:"Speed",min:0,max:3,step:.01,default:.8,group:"Motion"},{id:"edgeWidth",type:"float",label:"Edge Width",min:.01,max:.5,step:.01,default:.12,group:"Shape"},{id:"innerDetail",type:"float",label:"Inner Detail",min:0,max:1,step:.01,default:.4,group:"Shape"},{id:"colorSpeed",type:"float",label:"Color Speed",min:0,max:3,step:.01,default:.5,group:"Color"},{id:"colorSaturation",type:"float",label:"Saturation",min:0,max:1,step:.01,default:.75,group:"Color"},{id:"brightness",type:"float",label:"Brightness",min:.2,max:2,step:.01,default:1,group:"Color"},{id:"mouseInfluence",type:"float",label:"Mouse Influence",min:0,max:3,step:.01,default:1,group:"Interaction"}],inputs:[{id:"input0",label:"Background",type:"texture"}],outputs:[{id:"output0",label:"Result",type:"texture"}]};class Ld extends Pt{constructor(){super(...arguments);P(this,"descriptor",Nd)}init(i){this.gl=i,this.shader=this.createShader(i,Mt,zd)}render(i,a,p){const{gl:y,time:w,resolution:S,input:T}=i,f=this.shader;f.use(),f.setFloat("u_time",w),f.setVec2("u_resolution",S[0],S[1]),f.setVec2("u_mouse",T.mouse.x,T.mouse.y),f.setFloat("u_cellScale",a.cellScale),f.setFloat("u_warpStrength",a.warpStrength),f.setFloat("u_animSpeed",a.animSpeed),f.setFloat("u_edgeWidth",a.edgeWidth),f.setFloat("u_innerDetail",a.innerDetail),f.setFloat("u_colorSpeed",a.colorSpeed),f.setFloat("u_colorSaturation",a.colorSaturation),f.setFloat("u_brightness",a.brightness),f.setFloat("u_mouseInfluence",a.mouseInfluence);const D=p.get("input0");D?(f.setTexture("u_inputTexture",D,0),f.setInt("u_hasInput",1)):f.setInt("u_hasInput",0),y.drawArrays(y.TRIANGLES,0,6)}}const Ad=`#version 300 es
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
`,Od={id:"raymarched-metaballs",name:"Raymarched Metaballs",description:"3D soft bodies with smooth blending, lighting, and fresnel",parameters:[{id:"blobCount",type:"int",label:"Blob Count",min:2,max:8,default:5,group:"Shape"},{id:"smoothBlend",type:"float",label:"Smooth Blend",min:.1,max:3,step:.01,default:1,group:"Shape"},{id:"roughness",type:"float",label:"Roughness",min:0,max:1,step:.01,default:.2,group:"Surface"},{id:"specularPower",type:"float",label:"Specular",min:4,max:128,step:1,default:32,group:"Lighting"},{id:"fresnelStrength",type:"float",label:"Fresnel",min:0,max:2,step:.01,default:.6,group:"Lighting"},{id:"ambientOcclusion",type:"float",label:"AO Strength",min:0,max:2,step:.01,default:1,group:"Lighting"},{id:"envReflect",type:"float",label:"Env Reflect",min:0,max:1,step:.01,default:.3,group:"Lighting"},{id:"animSpeed",type:"float",label:"Speed",min:0,max:3,step:.01,default:.8,group:"Motion"},{id:"baseColor",type:"color",label:"Base Color",default:[.2,.5,.9,1],group:"Color"},{id:"specColor",type:"color",label:"Specular Color",default:[1,.95,.8,1],group:"Color"},{id:"mouseInfluence",type:"float",label:"Mouse Influence",min:0,max:2,step:.01,default:1,group:"Interaction"}],inputs:[{id:"input0",label:"Background",type:"texture"}],outputs:[{id:"output0",label:"Result",type:"texture"}]};class jd extends Pt{constructor(){super(...arguments);P(this,"descriptor",Od)}init(i){this.gl=i,this.shader=this.createShader(i,Mt,Ad)}render(i,a,p){const{gl:y,time:w,resolution:S,input:T}=i,f=this.shader;f.use(),f.setFloat("u_time",w),f.setVec2("u_resolution",S[0],S[1]),f.setVec2("u_mouse",T.mouse.x,T.mouse.y),f.setInt("u_blobCount",a.blobCount),f.setFloat("u_smoothBlend",a.smoothBlend),f.setFloat("u_roughness",a.roughness),f.setFloat("u_specularPower",a.specularPower),f.setFloat("u_fresnelStrength",a.fresnelStrength),f.setFloat("u_ambientOcclusion",a.ambientOcclusion),f.setFloat("u_envReflect",a.envReflect),f.setFloat("u_animSpeed",a.animSpeed),f.setFloat("u_mouseInfluence",a.mouseInfluence);const D=a.baseColor;f.setVec4("u_baseColor",D[0],D[1],D[2],D[3]);const M=a.specColor;f.setVec4("u_specColor",M[0],M[1],M[2],M[3]);const $=p.get("input0");$?(f.setTexture("u_inputTexture",$,0),f.setInt("u_hasInput",1)):f.setInt("u_hasInput",0),y.drawArrays(y.TRIANGLES,0,6)}}const Bd=`#version 300 es
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
`,Ud={id:"domain-warp-tunnel",name:"Domain Warp",description:"Hypnotic recursive domain warping with geometric patterns",parameters:[{id:"warpScale",type:"float",label:"Scale",min:.5,max:5,step:.01,default:1.5,group:"Warp"},{id:"warpStrength",type:"float",label:"Warp Strength",min:0,max:3,step:.01,default:1,group:"Warp"},{id:"warpLayers",type:"float",label:"Warp Layers",min:1,max:5,step:1,default:3,group:"Warp"},{id:"speed",type:"float",label:"Speed",min:0,max:3,step:.01,default:.6,group:"Motion"},{id:"patternMode",type:"enum",label:"Pattern",options:[{value:"0",label:"Lattice"},{value:"1",label:"Ribbons"},{value:"2",label:"Crystal"}],default:"0",group:"Pattern"},{id:"patternScale",type:"float",label:"Pattern Scale",min:1,max:15,step:.1,default:5,group:"Pattern"},{id:"contrast",type:"float",label:"Contrast",min:.2,max:3,step:.01,default:1.2,group:"Color"},{id:"colorShift",type:"float",label:"Color Shift",min:0,max:1,step:.01,default:0,group:"Color"},{id:"glowAmount",type:"float",label:"Glow",min:0,max:2,step:.01,default:.5,group:"Color"},{id:"brightness",type:"float",label:"Brightness",min:.2,max:2,step:.01,default:1,group:"Color"},{id:"mouseInfluence",type:"float",label:"Mouse Influence",min:0,max:3,step:.01,default:1,group:"Interaction"}],inputs:[{id:"input0",label:"Background",type:"texture"}],outputs:[{id:"output0",label:"Result",type:"texture"}]};class Vd extends Pt{constructor(){super(...arguments);P(this,"descriptor",Ud)}init(i){this.gl=i,this.shader=this.createShader(i,Mt,Bd)}render(i,a,p){const{gl:y,time:w,resolution:S,input:T}=i,f=this.shader;f.use(),f.setFloat("u_time",w),f.setVec2("u_resolution",S[0],S[1]),f.setVec2("u_mouse",T.mouse.x,T.mouse.y),f.setFloat("u_warpScale",a.warpScale),f.setFloat("u_warpStrength",a.warpStrength),f.setFloat("u_warpLayers",a.warpLayers),f.setFloat("u_speed",a.speed),f.setInt("u_patternMode",parseInt(a.patternMode,10)),f.setFloat("u_patternScale",a.patternScale),f.setFloat("u_contrast",a.contrast),f.setFloat("u_colorShift",a.colorShift),f.setFloat("u_glowAmount",a.glowAmount),f.setFloat("u_brightness",a.brightness),f.setFloat("u_mouseInfluence",a.mouseInfluence);const D=p.get("input0");D?(f.setTexture("u_inputTexture",D,0),f.setInt("u_hasInput",1)):f.setInt("u_hasInput",0),y.drawArrays(y.TRIANGLES,0,6)}}const bd=`#version 300 es
precision highp float;

uniform float u_time;
uniform vec2 u_resolution;
uniform vec2 u_mouse;
uniform float u_growSpeed;
uniform float u_branchChance;
uniform float u_curliness;
uniform float u_thickness;
uniform float u_leafSize;
uniform float u_leafDensity;
uniform float u_fadeTrail;
uniform float u_mouseInfluence;
uniform int u_invertColors;
uniform float u_complexity;

uniform sampler2D u_inputTexture;
uniform int u_hasInput;

out vec4 fragColor;

#include <noise.glsl>

// SDF for a line segment
float sdSegment(vec2 p, vec2 a, vec2 b) {
    vec2 pa = p - a, ba = b - a;
    float h = clamp(dot(pa, ba) / dot(ba, ba), 0.0, 1.0);
    return length(pa - ba * h);
}

// Leaf shape SDF
float sdLeaf(vec2 p, vec2 pos, float angle, float size) {
    vec2 d = p - pos;
    float c = cos(angle), s = sin(angle);
    d = vec2(d.x * c + d.y * s, -d.x * s + d.y * c);
    // Teardrop shape
    float r = length(d / vec2(size * 0.4, size));
    r -= 0.5 + d.y / (size * 3.0);
    return r;
}

// Generate a vine branch using noise-driven path
float vine(vec2 uv, float seed, float startTime, vec2 origin, float baseAngle) {
    float d = 1e6;
    float t = u_time * u_growSpeed;
    float growth = clamp((t - startTime) * 0.5, 0.0, 1.0);

    // Number of segments visible
    int maxSegs = int(growth * 40.0 * u_complexity);

    vec2 pos = origin;
    float angle = baseAngle;
    float segLen = 0.02;
    float thickness = u_thickness * 0.008;

    for (int i = 0; i < 80; i++) {
        if (i >= maxSegs) break;

        float fi = float(i);
        float progress = fi / 40.0;

        // Curl the vine using noise
        float curl = snoise(vec2(fi * 0.15 + seed, startTime * 0.3)) * u_curliness;

        // Mouse influence — bend toward mouse
        vec2 toMouse = u_mouse - pos;
        float mouseDist = length(toMouse);
        float mouseEffect = u_mouseInfluence * exp(-mouseDist * 4.0) * 0.5;
        float mouseAngle = atan(toMouse.y, toMouse.x);
        float angleDiff = mouseAngle - angle;
        // Normalize angle difference
        angleDiff = mod(angleDiff + 3.14159, 6.28318) - 3.14159;
        angle += angleDiff * mouseEffect;

        angle += curl * 0.15;

        vec2 nextPos = pos + vec2(cos(angle), sin(angle)) * segLen;

        // Taper thickness along the vine
        float taper = thickness * (1.0 - progress * 0.6);
        float segDist = sdSegment(uv, pos, nextPos) - taper;
        d = min(d, segDist);

        // Leaves
        if (u_leafSize > 0.01 && mod(fi, max(1.0, 5.0 - u_leafDensity * 4.0)) < 1.0 && fi > 3.0) {
            float leafAngle = angle + (snoise(vec2(fi + seed, 0.0)) > 0.0 ? 1.2 : -1.2);
            float lSize = u_leafSize * 0.03 * (0.5 + snoise(vec2(fi * 0.5, seed)) * 0.5);
            float leafD = sdLeaf(uv, pos, leafAngle, lSize);
            d = min(d, leafD * 0.8);
        }

        pos = nextPos;
    }

    return d;
}

void main() {
    vec2 uv = gl_FragCoord.xy / u_resolution;
    float aspect = u_resolution.x / u_resolution.y;
    vec2 p = uv;
    p.x *= aspect;

    float t = u_time * u_growSpeed;

    // Multiple vine sources
    float d = 1e6;

    // Bottom vines growing upward
    d = min(d, vine(p, 0.0, 0.0, vec2(0.2 * aspect, 0.0), 1.3));
    d = min(d, vine(p, 1.7, 0.5, vec2(0.7 * aspect, 0.0), 1.5));
    d = min(d, vine(p, 3.1, 1.0, vec2(0.5 * aspect, 0.0), 1.4));

    // Side vines
    d = min(d, vine(p, 4.5, 1.5, vec2(0.0, 0.3), 0.2));
    d = min(d, vine(p, 6.2, 2.0, vec2(aspect, 0.6), 2.9));

    // Top vines growing downward
    d = min(d, vine(p, 7.8, 2.5, vec2(0.3 * aspect, 1.0), -1.3));
    d = min(d, vine(p, 9.1, 3.0, vec2(0.8 * aspect, 1.0), -1.6));

    // Extra complexity vines
    if (u_complexity > 0.5) {
        d = min(d, vine(p, 10.5, 3.5, vec2(0.0, 0.7), 0.3));
        d = min(d, vine(p, 11.9, 4.0, vec2(aspect, 0.3), 2.8));
    }

    // Anti-aliased rendering
    float px = 1.0 / u_resolution.y;
    float vineShape = 1.0 - smoothstep(-px, px * 1.5, d);

    // Subtle inner glow / depth
    float innerGlow = exp(-max(d, 0.0) * 200.0) * 0.3;
    vineShape += innerGlow;

    // Fade trail effect — older parts slightly fade
    vineShape *= (1.0 - u_fadeTrail * 0.3);

    // Color
    vec3 fg = vec3(1.0);
    vec3 bg = vec3(0.0);

    if (u_invertColors == 1) {
        fg = vec3(0.0);
        bg = vec3(1.0);
    }

    vec3 color = mix(bg, fg, clamp(vineShape, 0.0, 1.0));

    // Blend with input
    if (u_hasInput == 1) {
        vec4 inputColor = texture(u_inputTexture, uv);
        // Use vine as mask over input
        color = mix(inputColor.rgb, fg, clamp(vineShape, 0.0, 1.0));
    }

    fragColor = vec4(color, 1.0);
}
`,Wd={id:"organic-vines",name:"Organic Vines",description:"Minimalist black and white vines slowly growing across the screen",parameters:[{id:"growSpeed",type:"float",label:"Grow Speed",min:.05,max:2,step:.01,default:.3,group:"Growth"},{id:"complexity",type:"float",label:"Complexity",min:.2,max:1,step:.01,default:.7,group:"Growth"},{id:"branchChance",type:"float",label:"Branching",min:0,max:1,step:.01,default:.4,group:"Growth"},{id:"curliness",type:"float",label:"Curliness",min:0,max:3,step:.01,default:1.2,group:"Shape"},{id:"thickness",type:"float",label:"Thickness",min:.2,max:3,step:.01,default:1,group:"Shape"},{id:"leafSize",type:"float",label:"Leaf Size",min:0,max:2,step:.01,default:.8,group:"Leaves"},{id:"leafDensity",type:"float",label:"Leaf Density",min:0,max:1,step:.01,default:.5,group:"Leaves"},{id:"fadeTrail",type:"float",label:"Fade Trail",min:0,max:1,step:.01,default:0,group:"Style"},{id:"invertColors",type:"bool",label:"Invert B/W",default:!1,group:"Style"},{id:"mouseInfluence",type:"float",label:"Mouse Influence",min:0,max:3,step:.01,default:1,group:"Interaction"}],inputs:[{id:"input0",label:"Background",type:"texture"}],outputs:[{id:"output0",label:"Result",type:"texture"}]};class Hd extends Pt{constructor(){super(...arguments);P(this,"descriptor",Wd)}init(i){this.gl=i,this.shader=this.createShader(i,Mt,bd)}render(i,a,p){const{gl:y,time:w,resolution:S,input:T}=i,f=this.shader;f.use(),f.setFloat("u_time",w),f.setVec2("u_resolution",S[0],S[1]),f.setVec2("u_mouse",T.mouse.x,T.mouse.y),f.setFloat("u_growSpeed",a.growSpeed),f.setFloat("u_branchChance",a.branchChance),f.setFloat("u_curliness",a.curliness),f.setFloat("u_thickness",a.thickness),f.setFloat("u_leafSize",a.leafSize),f.setFloat("u_leafDensity",a.leafDensity),f.setFloat("u_fadeTrail",a.fadeTrail),f.setFloat("u_mouseInfluence",a.mouseInfluence),f.setInt("u_invertColors",a.invertColors?1:0),f.setFloat("u_complexity",a.complexity);const D=p.get("input0");D?(f.setTexture("u_inputTexture",D,0),f.setInt("u_hasInput",1)):f.setInt("u_hasInput",0),y.drawArrays(y.TRIANGLES,0,6)}}const Ya=new Map([["noise-flow-field",()=>new hd],["fractal-explorer",()=>new yd],["particle-system",()=>new Cd],["feedback-echo",()=>new Td],["kaleidoscope",()=>new Fd],["audio-waveform",()=>new Dd],["voronoi-liquid",()=>new Ld],["raymarched-metaballs",()=>new jd],["domain-warp-tunnel",()=>new Vd],["organic-vines",()=>new Hd]]);function $d(){return Array.from(Ya.keys())}class Qd{constructor(s){P(this,"glContext");P(this,"gl");P(this,"fbManager");P(this,"clock");P(this,"inputManager");P(this,"parameterStore");P(this,"canvas");P(this,"activeEffects",[]);P(this,"activeIds",[]);P(this,"rafId",null);P(this,"running",!1);P(this,"width",0);P(this,"height",0);P(this,"frame",()=>{if(!this.running||this.glContext.isLost){this.rafId=requestAnimationFrame(this.frame);return}this.clock.tick();const s=this.inputManager.poll(),i={gl:this.gl,time:this.clock.time,deltaTime:this.clock.deltaTime,frameCount:this.clock.frameCount,resolution:[this.width,this.height],input:s},{gl:a}=this;if(this.activeEffects.length===0)a.bindFramebuffer(a.FRAMEBUFFER,null),a.viewport(0,0,this.width,this.height),a.clearColor(.05,.05,.08,1),a.clear(a.COLOR_BUFFER_BIT);else{const p=[];let y=null;for(let w=0;w<this.activeEffects.length;w++){const S=this.activeEffects[w],T=w===this.activeEffects.length-1,f=this.parameterStore.getValues(S.descriptor.id),D=new Map;if(y&&D.set("input0",y),T)a.bindFramebuffer(a.FRAMEBUFFER,null),a.viewport(0,0,this.width,this.height);else{const M=this.fbManager.acquire(this.width,this.height);p.push(M),a.bindFramebuffer(a.FRAMEBUFFER,M.fbo),a.viewport(0,0,this.width,this.height),a.clear(a.COLOR_BUFFER_BIT)}S.render(i,f,D),T||(y=S.getOutputTexture()??p[p.length-1].texture)}for(const w of p)this.fbManager.release(w)}this.rafId=requestAnimationFrame(this.frame)});this.canvas=s,this.glContext=new ld(s),this.gl=this.glContext.gl,this.fbManager=new id(this.gl),this.clock=new od,this.inputManager=new ud(s),this.parameterStore=new sd,this.handleResize()}setEffectChain(s){for(const i of this.activeEffects)this.parameterStore.unregisterEffect(i.descriptor.id),i.dispose();this.activeEffects=[],this.activeIds=[];for(const i of s){const a=Ya.get(i);if(!a){console.warn(`Unknown effect: ${i}`);continue}const p=a();p.init(this.gl),p.resize(this.width,this.height),this.parameterStore.registerEffect(p.descriptor.id,p.descriptor),this.activeEffects.push(p),this.activeIds.push(i)}}getActiveEffectIds(){return this.activeIds}start(){this.running||(this.running=!0,this.inputManager.attach(),this.clock.start(),this.frame())}stop(){this.running=!1,this.rafId!==null&&(cancelAnimationFrame(this.rafId),this.rafId=null),this.inputManager.detach()}handleResize(){const s=window.devicePixelRatio||1,i=this.canvas.getBoundingClientRect();this.width=Math.floor(i.width*s),this.height=Math.floor(i.height*s),this.canvas.width=this.width,this.canvas.height=this.height,this.fbManager.handleResize();for(const a of this.activeEffects)a.resize(this.width,this.height)}dispose(){this.stop();for(const s of this.activeEffects)s.dispose();this.activeEffects=[],this.fbManager.dispose(),this.glContext.dispose()}}const Xd=Q.memo(function({onPipelineReady:s}){const i=Q.useRef(null),a=Q.useRef(null);return Q.useEffect(()=>{const p=i.current;if(!p)return;const y=new Qd(p);a.current=y,y.start(),s(y);let w;const S=new ResizeObserver(()=>{clearTimeout(w),w=setTimeout(()=>{y.handleResize()},100)});return S.observe(p),()=>{clearTimeout(w),S.disconnect(),y.dispose(),a.current=null}},[s]),I.jsx("canvas",{ref:i})});function Gd({def:g,value:s,onChange:i}){const[a,p]=Q.useState(s),y=g.type==="int"?1:g.step??.01,w=Q.useCallback(T=>{const f=g.type==="int"?parseInt(T.target.value,10):parseFloat(T.target.value);p(f),i(f)},[g.type,i]);Math.abs(a-s)>y*.5&&p(s);const S=g.type==="int"?a.toString():a.toFixed(y<.01?4:y<.1?2:1);return I.jsxs("div",{className:"param-row",children:[I.jsx("span",{className:"param-label",title:g.label,children:g.label}),I.jsxs("div",{className:"param-control",children:[I.jsx("input",{type:"range",min:g.min,max:g.max,step:y,value:a,onChange:w}),I.jsx("span",{className:"param-value",children:S})]})]})}function Yd(g,s,i){const a=p=>Math.round(p*255).toString(16).padStart(2,"0");return`#${a(g)}${a(s)}${a(i)}`}function Kd(g,s){const i=parseInt(g.slice(1,3),16)/255,a=parseInt(g.slice(3,5),16)/255,p=parseInt(g.slice(5,7),16)/255;return[i,a,p,s]}function qd({def:g,value:s,onChange:i}){const a=Yd(s[0],s[1],s[2]),p=Q.useCallback(y=>{i(Kd(y.target.value,s[3]))},[i,s]);return I.jsxs("div",{className:"param-row",children:[I.jsx("span",{className:"param-label",title:g.label,children:g.label}),I.jsxs("div",{className:"param-control",children:[I.jsx("input",{type:"color",value:a,onChange:p}),I.jsx("span",{className:"param-value",children:a})]})]})}function Zd({def:g,value:s,onChange:i}){const a=Q.useCallback(p=>{i(p.target.value)},[i]);return I.jsxs("div",{className:"param-row",children:[I.jsx("span",{className:"param-label",title:g.label,children:g.label}),I.jsx("div",{className:"param-control",children:I.jsx("select",{value:s,onChange:a,children:g.options.map(p=>I.jsx("option",{value:p.value,children:p.label},p.value))})})]})}function Jd({def:g,value:s,onChange:i}){const a=Q.useCallback(p=>{i(p.target.checked)},[i]);return I.jsxs("div",{className:"param-row",children:[I.jsx("span",{className:"param-label",title:g.label,children:g.label}),I.jsx("div",{className:"param-control",children:I.jsxs("label",{className:"toggle-switch",children:[I.jsx("input",{type:"checkbox",checked:s,onChange:a}),I.jsx("span",{className:"toggle-track"})]})})]})}function ep({def:g,value:s,onChange:i}){switch(g.type){case"float":case"int":return I.jsx(Gd,{def:g,value:s,onChange:i});case"color":return I.jsx(qd,{def:g,value:s,onChange:i});case"enum":return I.jsx(Zd,{def:g,value:s,onChange:i});case"bool":return I.jsx(Jd,{def:g,value:s,onChange:i});case"vec2":return null;default:return null}}function tp({parameterStore:g}){Q.useSyncExternalStore(g.subscribe,g.getSnapshot);const s=g.getAllInstanceIds();return I.jsx("div",{className:"parameter-panel",children:s.map(i=>I.jsx(np,{instanceId:i,parameterStore:g},i))})}function np({instanceId:g,parameterStore:s}){const i=s.getDescriptor(g),a=s.getValues(g);if(!i)return null;const p=Q.useCallback(()=>{for(const S of i.parameters)s.setValue(g,S.id,S.default)},[i,s,g]),y=Q.useCallback(()=>{for(const S of i.parameters){let T=S.default;switch(S.type){case"float":{const f=S;T=Math.random()*(f.max-f.min)+f.min;break}case"int":{const f=S;T=Math.floor(Math.random()*(f.max-f.min+1))+f.min;break}case"bool":T=Math.random()>.5;break;case"color":T=[Math.random(),Math.random(),Math.random(),1];break;case"enum":{const f=S.options;T=f[Math.floor(Math.random()*f.length)].value;break}}s.setValue(g,S.id,T)}},[i,s,g]),w=new Map;for(const S of i.parameters){const T=S.group??"General";w.has(T)||w.set(T,[]),w.get(T).push(S)}return I.jsxs(I.Fragment,{children:[I.jsxs("div",{className:"param-actions",children:[I.jsx("button",{className:"btn param-action-btn",onClick:p,children:"Reset"}),I.jsx("button",{className:"btn param-action-btn",onClick:y,children:"Randomize"})]}),Array.from(w.entries()).map(([S,T])=>I.jsxs("div",{className:"param-group",children:[I.jsx("div",{className:"param-group-header",children:S}),T.map(f=>I.jsx(rp,{instanceId:g,def:f,value:a[f.id]??f.default,parameterStore:s},f.id))]},`${g}-${S}`))]})}function rp({instanceId:g,def:s,value:i,parameterStore:a}){const p=Q.useCallback(y=>{a.setValue(g,s.id,y)},[a,g,s.id]);return I.jsx(ep,{def:s,value:i,onChange:p})}const Hi={"noise-flow-field":"Noise Flow Field","fractal-explorer":"Fractal Explorer","particle-system":"Particle System","feedback-echo":"Feedback Echo",kaleidoscope:"Kaleidoscope","audio-waveform":"Audio Waveform","voronoi-liquid":"Voronoi Liquid","raymarched-metaballs":"Raymarched Metaballs","domain-warp-tunnel":"Domain Warp","organic-vines":"Organic Vines"};function lp({activeEffects:g,onChange:s}){const i=$d(),a=Q.useCallback(w=>{s([w.target.value])},[s]),p=Q.useCallback(w=>{const S=w.target.value;S&&!g.includes(S)&&s([...g,S]),w.target.value=""},[g,s]),y=Q.useCallback(w=>{const S=g.filter(T=>T!==w);S.length>0&&s(S)},[g,s]);return I.jsxs("div",{className:"effect-selector",children:[I.jsx("label",{children:"Active Effect"}),I.jsx("select",{value:g[0]??"",onChange:a,children:i.map(w=>I.jsx("option",{value:w,children:Hi[w]??w},w))}),g.length>1&&I.jsxs("div",{style:{marginTop:8},children:[I.jsx("label",{style:{fontSize:11,color:"#888"},children:"Effect Chain"}),g.map((w,S)=>I.jsxs("div",{style:{display:"flex",alignItems:"center",gap:6,marginTop:4},children:[I.jsxs("span",{style:{fontSize:12,color:"#aaa",flex:1},children:[S+1,". ",Hi[w]??w]}),g.length>1&&I.jsx("button",{className:"btn btn-danger",onClick:()=>y(w),style:{padding:"2px 6px",fontSize:11},children:"x"})]},w))]}),I.jsx("div",{style:{marginTop:8},children:I.jsxs("select",{onChange:p,defaultValue:"",children:[I.jsx("option",{value:"",disabled:!0,children:"+ Add to chain..."}),i.filter(w=>!g.includes(w)).map(w=>I.jsx("option",{value:w,children:Hi[w]??w},w))]})})]})}const Ul="procedural-art-presets",op=1;class kr{constructor(s){P(this,"parameterStore");this.parameterStore=s}save(s,i){const a={version:op,name:s,createdAt:new Date().toISOString(),pipeline:{chain:i,parameterOverrides:this.parameterStore.serialize()}},p=this.loadAll(),y=p.findIndex(w=>w.name===s);return y>=0?p[y]=a:p.push(a),localStorage.setItem(Ul,JSON.stringify(p)),a}loadAll(){try{const s=localStorage.getItem(Ul);return s?JSON.parse(s):[]}catch{return[]}}load(s){const a=this.loadAll().find(p=>p.name===s);return(a==null?void 0:a.pipeline)??null}delete(s){const i=this.loadAll().filter(a=>a.name!==s);localStorage.setItem(Ul,JSON.stringify(i))}rename(s,i){const a=this.loadAll(),p=a.find(y=>y.name===s);p&&(p.name=i,localStorage.setItem(Ul,JSON.stringify(a)))}}function ip({pipeline:g,activeEffects:s,onLoadPreset:i}){const[a,p]=Q.useState(""),[y,w]=Q.useState(()=>new kr(g.parameterStore).loadAll()),S=Q.useCallback(()=>{const M=new kr(g.parameterStore);w(M.loadAll())},[g.parameterStore]),T=Q.useCallback(()=>{if(!a.trim())return;new kr(g.parameterStore).save(a.trim(),s),p(""),S()},[a,g.parameterStore,s,S]),f=Q.useCallback(M=>{const te=new kr(g.parameterStore).load(M);te&&(i(te.chain),setTimeout(()=>{for(const[ie,G]of Object.entries(te.parameterOverrides))g.parameterStore.setValues(ie,G)},0))},[g,i]),D=Q.useCallback(M=>{new kr(g.parameterStore).delete(M),S()},[g.parameterStore,S]);return I.jsxs("div",{className:"preset-bar",children:[I.jsx("label",{children:"Presets"}),I.jsxs("div",{className:"preset-actions",children:[I.jsx("input",{type:"text",placeholder:"Preset name...",value:a,onChange:M=>p(M.target.value),onKeyDown:M=>M.key==="Enter"&&T()}),I.jsx("button",{className:"btn btn-primary",onClick:T,children:"Save"})]}),I.jsxs("div",{className:"preset-list",children:[y.map(M=>I.jsxs("div",{className:"preset-item",children:[I.jsx("span",{className:"preset-item-name",onClick:()=>f(M.name),children:M.name}),I.jsx("button",{className:"btn btn-danger",onClick:()=>D(M.name),style:{padding:"2px 6px",fontSize:11},children:"x"})]},M.name)),y.length===0&&I.jsx("div",{style:{fontSize:12,color:"#555",padding:8},children:"No presets saved yet"})]})]})}function up({pipeline:g}){const[s,i]=Q.useState(!1),[a,p]=Q.useState(!1),[y,w]=Q.useState(!1),S=Q.useRef(null),T=Q.useRef([]),f=Q.useCallback(()=>{g.canvas.toBlob(G=>{if(!G)return;const W=URL.createObjectURL(G),ye=document.createElement("a");ye.href=W,ye.download=`procedural-art-${Date.now()}.png`,ye.click(),URL.revokeObjectURL(W)},"image/png")},[g]),D=Q.useCallback(()=>{var ye;if(s){(ye=S.current)==null||ye.stop(),i(!1);return}const G=g.canvas.captureStream(60),W=new MediaRecorder(G,{mimeType:MediaRecorder.isTypeSupported("video/webm;codecs=vp9")?"video/webm;codecs=vp9":"video/webm",videoBitsPerSecond:8e6});T.current=[],W.ondataavailable=_e=>{_e.data.size>0&&T.current.push(_e.data)},W.onstop=()=>{const _e=new Blob(T.current,{type:"video/webm"}),ke=URL.createObjectURL(_e),ue=document.createElement("a");ue.href=ke,ue.download=`procedural-art-${Date.now()}.webm`,ue.click(),URL.revokeObjectURL(ke),T.current=[]},W.start(100),S.current=W,i(!0)},[s,g]),M=Q.useCallback(()=>{var ie;document.fullscreenElement?document.exitFullscreen():(ie=g.canvas.parentElement)==null||ie.requestFullscreen()},[g]),$=Q.useCallback(async()=>{a?(g.inputManager.disableAudio(),p(!1)):(await g.inputManager.enableAudio(),p(g.inputManager.audioEnabled))},[a,g]),te=Q.useCallback(async()=>{y?(g.inputManager.disableMIDI(),w(!1)):(await g.inputManager.enableMIDI(),w(g.inputManager.midiEnabled))},[y,g]);return I.jsxs("div",{className:"toolbar",children:[I.jsxs("div",{className:"toolbar-group",children:[I.jsx("label",{children:"Inputs"}),I.jsxs("div",{className:"toolbar-buttons",children:[I.jsx("button",{className:`btn toolbar-btn ${a?"btn-active":""}`,onClick:$,title:"Toggle microphone input",children:a?"Mic ON":"Mic"}),I.jsx("button",{className:`btn toolbar-btn ${y?"btn-active":""}`,onClick:te,title:"Toggle MIDI input",children:y?"MIDI ON":"MIDI"})]})]}),I.jsxs("div",{className:"toolbar-group",children:[I.jsx("label",{children:"Export"}),I.jsxs("div",{className:"toolbar-buttons",children:[I.jsx("button",{className:"btn toolbar-btn",onClick:f,title:"Save screenshot",children:"Photo"}),I.jsx("button",{className:`btn toolbar-btn ${s?"btn-recording":""}`,onClick:D,title:s?"Stop recording":"Record video",children:s?"Stop":"Record"})]})]}),I.jsx("div",{className:"toolbar-group",children:I.jsx("div",{className:"toolbar-buttons",children:I.jsx("button",{className:"btn toolbar-btn",onClick:M,title:"Toggle fullscreen",children:"Fullscreen"})})})]})}function sp({pipeline:g}){const[s,i]=Q.useState(0),[a,p]=Q.useState({x:0,y:0}),y=Q.useRef([]),w=Q.useRef(performance.now());return Q.useEffect(()=>{if(!g)return;let S;const T=()=>{const f=performance.now(),D=f-w.current;w.current=f;const M=y.current;M.push(D),M.length>60&&M.shift();const $=M.reduce((ie,G)=>ie+G,0)/M.length;i(Math.round(1e3/$));const te=g.inputManager.poll();p({x:te.mouse.x,y:te.mouse.y}),S=requestAnimationFrame(T)};return S=requestAnimationFrame(T),()=>cancelAnimationFrame(S)},[g]),g?I.jsxs("div",{className:"debug-overlay",children:["FPS: ",s," | Mouse: ",a.x.toFixed(2),", ",a.y.toFixed(2)]}):null}class ap extends Q.Component{constructor(){super(...arguments);P(this,"state",{hasError:!1,error:null})}static getDerivedStateFromError(i){return{hasError:!0,error:i.message}}render(){return this.state.hasError?I.jsx("div",{style:{position:"absolute",inset:0,display:"flex",alignItems:"center",justifyContent:"center",background:"#0a0a0f",color:"#ff6666",textAlign:"center",zIndex:1e3,padding:20,fontFamily:"inherit"},children:I.jsxs("div",{children:[I.jsx("h2",{style:{fontSize:18,marginBottom:8},children:"Rendering Error"}),I.jsx("p",{style:{fontSize:12,color:"#aaa",maxWidth:400},children:this.state.error}),I.jsx("button",{className:"btn",onClick:()=>window.location.reload(),style:{marginTop:16},children:"Reload"})]})}):this.props.children}}function cp(){const g=Q.useRef(null),[s,i]=Q.useState(["noise-flow-field"]),[,a]=Q.useState(0),[p,y]=Q.useState(!1),w=Q.useCallback(D=>{g.current=D,D.setEffectChain(["noise-flow-field"]),a(M=>M+1)},[]),S=Q.useCallback(D=>{var M;i(D),(M=g.current)==null||M.setEffectChain(D),a($=>$+1)},[]),T=Q.useCallback(()=>{y(D=>!D)},[]),f=g.current;return I.jsxs("div",{className:"app",children:[I.jsxs("div",{className:"canvas-area",children:[I.jsx(ap,{children:I.jsx(Xd,{onPipelineReady:w})}),I.jsx(sp,{pipeline:f}),I.jsx("button",{className:"menu-toggle",onClick:T,"aria-label":"Toggle menu",children:p?"✕":"☰"})]}),p&&I.jsx("div",{className:"sidebar-backdrop",onClick:T}),I.jsxs("div",{className:`sidebar ${p?"sidebar--open":""}`,children:[I.jsx("div",{className:"sidebar-header",children:I.jsx("h1",{children:"Procedural Art"})}),I.jsx(lp,{activeEffects:s,onChange:S}),f&&I.jsx(tp,{parameterStore:f.parameterStore}),f&&I.jsx(up,{pipeline:f}),f&&I.jsx(ip,{pipeline:f,activeEffects:s,onLoadPreset:S})]})]})}rd.createRoot(document.getElementById("root")).render(I.jsx(Q.StrictMode,{children:I.jsx(cp,{})}));
