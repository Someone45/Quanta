var W=Object.defineProperty;var X=(e,t,n)=>t in e?W(e,t,{enumerable:!0,configurable:!0,writable:!0,value:n}):e[t]=n;var C=(e,t,n)=>(X(e,typeof t!="symbol"?t+"":t,n),n);(function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const o of document.querySelectorAll('link[rel="modulepreload"]'))r(o);new MutationObserver(o=>{for(const i of o)if(i.type==="childList")for(const s of i.addedNodes)s.tagName==="LINK"&&s.rel==="modulepreload"&&r(s)}).observe(document,{childList:!0,subtree:!0});function n(o){const i={};return o.integrity&&(i.integrity=o.integrity),o.referrerPolicy&&(i.referrerPolicy=o.referrerPolicy),o.crossOrigin==="use-credentials"?i.credentials="include":o.crossOrigin==="anonymous"?i.credentials="omit":i.credentials="same-origin",i}function r(o){if(o.ep)return;o.ep=!0;const i=n(o);fetch(o.href,i)}})();function v(){}function I(e){return e()}function F(){return Object.create(null)}function E(e){e.forEach(I)}function R(e){return typeof e=="function"}function T(e,t){return e!=e?t==t:e!==t||e&&typeof e=="object"||typeof e=="function"}function Z(e){return Object.keys(e).length===0}function a(e,t){e.appendChild(t)}function H(e,t,n){e.insertBefore(t,n||null)}function P(e){e.parentNode&&e.parentNode.removeChild(e)}function u(e){return document.createElement(e)}function k(e){return document.createTextNode(e)}function x(){return k(" ")}function K(e,t,n,r){return e.addEventListener(t,n,r),()=>e.removeEventListener(t,n,r)}function V(e,t,n){n==null?e.removeAttribute(t):e.getAttribute(t)!==n&&e.setAttribute(t,n)}function ee(e){return Array.from(e.childNodes)}function te(e,t){t=""+t,e.data!==t&&(e.data=t)}let A;function b(e){A=e}const _=[],q=[];let $=[];const B=[],ne=Promise.resolve();let M=!1;function re(){M||(M=!0,ne.then(J))}function N(e){$.push(e)}const O=new Set;let m=0;function J(){if(m!==0)return;const e=A;do{try{for(;m<_.length;){const t=_[m];m++,b(t),oe(t.$$)}}catch(t){throw _.length=0,m=0,t}for(b(null),_.length=0,m=0;q.length;)q.pop()();for(let t=0;t<$.length;t+=1){const n=$[t];O.has(n)||(O.add(n),n())}$.length=0}while(_.length);for(;B.length;)B.pop()();M=!1,O.clear(),b(e)}function oe(e){if(e.fragment!==null){e.update(),E(e.before_update);const t=e.dirty;e.dirty=[-1],e.fragment&&e.fragment.p(e.ctx,t),e.after_update.forEach(N)}}function ie(e){const t=[],n=[];$.forEach(r=>e.indexOf(r)===-1?t.push(r):n.push(r)),n.forEach(r=>r()),$=t}const L=new Set;let le;function U(e,t){e&&e.i&&(L.delete(e),e.i(t))}function se(e,t,n,r){if(e&&e.o){if(L.has(e))return;L.add(e),le.c.push(()=>{L.delete(e),r&&(n&&e.d(1),r())}),e.o(t)}else r&&r()}function ae(e){e&&e.c()}function Y(e,t,n){const{fragment:r,after_update:o}=e.$$;r&&r.m(t,n),N(()=>{const i=e.$$.on_mount.map(I).filter(R);e.$$.on_destroy?e.$$.on_destroy.push(...i):E(i),e.$$.on_mount=[]}),o.forEach(N)}function z(e,t){const n=e.$$;n.fragment!==null&&(ie(n.after_update),E(n.on_destroy),n.fragment&&n.fragment.d(t),n.on_destroy=n.fragment=null,n.ctx=[])}function ce(e,t){e.$$.dirty[0]===-1&&(_.push(e),re(),e.$$.dirty.fill(0)),e.$$.dirty[t/31|0]|=1<<t%31}function D(e,t,n,r,o,i,s=null,c=[-1]){const d=A;b(e);const l=e.$$={fragment:null,ctx:[],props:i,update:v,not_equal:o,bound:F(),on_mount:[],on_destroy:[],on_disconnect:[],before_update:[],after_update:[],context:new Map(t.context||(d?d.$$.context:[])),callbacks:F(),dirty:c,skip_bound:!1,root:t.target||d.$$.root};s&&s(l.root);let y=!1;if(l.ctx=n?n(e,t.props||{},(f,w,...h)=>{const p=h.length?h[0]:w;return l.ctx&&o(l.ctx[f],l.ctx[f]=p)&&(!l.skip_bound&&l.bound[f]&&l.bound[f](p),y&&ce(e,f)),w}):[],l.update(),y=!0,E(l.before_update),l.fragment=r?r(l.ctx):!1,t.target){if(t.hydrate){const f=ee(t.target);l.fragment&&l.fragment.l(f),f.forEach(P)}else l.fragment&&l.fragment.c();t.intro&&U(e.$$.fragment),Y(e,t.target,t.anchor),J()}b(d)}class G{constructor(){C(this,"$$");C(this,"$$set")}$destroy(){z(this,1),this.$destroy=v}$on(t,n){if(!R(n))return v;const r=this.$$.callbacks[t]||(this.$$.callbacks[t]=[]);return r.push(n),()=>{const o=r.indexOf(n);o!==-1&&r.splice(o,1)}}$set(t){this.$$set&&!Z(t)&&(this.$$.skip_bound=!0,this.$$set(t),this.$$.skip_bound=!1)}}const fe="4";typeof window<"u"&&(window.__svelte||(window.__svelte={v:new Set})).v.add(fe);const ue="data:image/svg+xml,%3csvg%20xmlns='http://www.w3.org/2000/svg'%20xmlns:xlink='http://www.w3.org/1999/xlink'%20aria-hidden='true'%20role='img'%20class='iconify%20iconify--logos'%20width='26.6'%20height='32'%20preserveAspectRatio='xMidYMid%20meet'%20viewBox='0%200%20256%20308'%3e%3cpath%20fill='%23FF3E00'%20d='M239.682%2040.707C211.113-.182%20154.69-12.301%20113.895%2013.69L42.247%2059.356a82.198%2082.198%200%200%200-37.135%2055.056a86.566%2086.566%200%200%200%208.536%2055.576a82.425%2082.425%200%200%200-12.296%2030.719a87.596%2087.596%200%200%200%2014.964%2066.244c28.574%2040.893%2084.997%2053.007%20125.787%2027.016l71.648-45.664a82.182%2082.182%200%200%200%2037.135-55.057a86.601%2086.601%200%200%200-8.53-55.577a82.409%2082.409%200%200%200%2012.29-30.718a87.573%2087.573%200%200%200-14.963-66.244'%3e%3c/path%3e%3cpath%20fill='%23FFF'%20d='M106.889%20270.841c-23.102%206.007-47.497-3.036-61.103-22.648a52.685%2052.685%200%200%201-9.003-39.85a49.978%2049.978%200%200%201%201.713-6.693l1.35-4.115l3.671%202.697a92.447%2092.447%200%200%200%2028.036%2014.007l2.663.808l-.245%202.659a16.067%2016.067%200%200%200%202.89%2010.656a17.143%2017.143%200%200%200%2018.397%206.828a15.786%2015.786%200%200%200%204.403-1.935l71.67-45.672a14.922%2014.922%200%200%200%206.734-9.977a15.923%2015.923%200%200%200-2.713-12.011a17.156%2017.156%200%200%200-18.404-6.832a15.78%2015.78%200%200%200-4.396%201.933l-27.35%2017.434a52.298%2052.298%200%200%201-14.553%206.391c-23.101%206.007-47.497-3.036-61.101-22.649a52.681%2052.681%200%200%201-9.004-39.849a49.428%2049.428%200%200%201%2022.34-33.114l71.664-45.677a52.218%2052.218%200%200%201%2014.563-6.398c23.101-6.007%2047.497%203.036%2061.101%2022.648a52.685%2052.685%200%200%201%209.004%2039.85a50.559%2050.559%200%200%201-1.713%206.692l-1.35%204.116l-3.67-2.693a92.373%2092.373%200%200%200-28.037-14.013l-2.664-.809l.246-2.658a16.099%2016.099%200%200%200-2.89-10.656a17.143%2017.143%200%200%200-18.398-6.828a15.786%2015.786%200%200%200-4.402%201.935l-71.67%2045.674a14.898%2014.898%200%200%200-6.73%209.975a15.9%2015.9%200%200%200%202.709%2012.012a17.156%2017.156%200%200%200%2018.404%206.832a15.841%2015.841%200%200%200%204.402-1.935l27.345-17.427a52.147%2052.147%200%200%201%2014.552-6.397c23.101-6.006%2047.497%203.037%2061.102%2022.65a52.681%2052.681%200%200%201%209.003%2039.848a49.453%2049.453%200%200%201-22.34%2033.12l-71.664%2045.673a52.218%2052.218%200%200%201-14.563%206.398'%3e%3c/path%3e%3c/svg%3e",de="/vite.svg";function he(e){let t,n,r,o,i;return{c(){t=u("button"),n=k("count is "),r=k(e[0])},m(s,c){H(s,t,c),a(t,n),a(t,r),o||(i=K(t,"click",e[1]),o=!0)},p(s,[c]){c&1&&te(r,s[0])},i:v,o:v,d(s){s&&P(t),o=!1,i()}}}function pe(e,t,n){let r=0;return[r,()=>{n(0,r+=1)}]}class ge extends G{constructor(t){super(),D(this,t,pe,he,T,{})}}function me(e){let t,n,r,o,i,s,c,d,l,y,f,w,h,p,S,j;return c=new ge({}),{c(){t=u("main"),n=u("div"),n.innerHTML=`<a href="https://vitejs.dev" target="_blank" rel="noreferrer"><img src="${de}" class="logo svelte-11cv5lq" alt="Vite Logo"/></a> <a href="https://svelte.dev" target="_blank" rel="noreferrer"><img src="${ue}" class="logo svelte svelte-11cv5lq" alt="Svelte Logo"/></a>`,r=x(),o=u("h1"),o.textContent="Vite + Svelte",i=x(),s=u("div"),ae(c.$$.fragment),d=x(),l=u("button"),l.textContent="Run Python code",y=x(),f=u("p"),f.innerHTML='Check out <a href="https://github.com/sveltejs/kit#readme" target="_blank" rel="noreferrer">SvelteKit</a>, the official Svelte app framework powered by Vite!',w=x(),h=u("p"),h.textContent="Click on the Vite and Svelte logos to learn more",V(s,"class","card"),V(h,"class","read-the-docs svelte-11cv5lq")},m(g,Q){H(g,t,Q),a(t,n),a(t,r),a(t,o),a(t,i),a(t,s),Y(c,s,null),a(t,d),a(t,l),a(t,y),a(t,f),a(t,w),a(t,h),p=!0,S||(j=K(l,"click",eel.say_hello_py("Running Python from JS")),S=!0)},p:v,i(g){p||(U(c.$$.fragment,g),p=!0)},o(g){se(c.$$.fragment,g),p=!1},d(g){g&&P(t),z(c),S=!1,j()}}}class _e extends G{constructor(t){super(),D(this,t,null,me,T,{})}}new _e({target:document.getElementById("app")});
