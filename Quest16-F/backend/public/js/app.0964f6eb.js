(function(){"use strict";var n={1464:function(n,t,e){var r=e(9242),o=e(3396);const i={id:"app"};function s(n,t,e,r,s,a){const u=(0,o.up)("router-view");return(0,o.wg)(),(0,o.iD)("div",i,[(0,o.Wm)(u)])}var a={name:"App",components:{}},u=e(89);const l=(0,u.Z)(a,[["render",s]]);var c=l,d=e(2483),f=e(7139);const p={class:"wrap"},v=(0,o._)("h1",null,"5월 마지막주 영화 예매 순위",-1),m={class:"movies"},h={class:"rank"},w=["src"],_={class:"detail"},g={class:"tit"},b={class:"rate"},k={class:"num"};function y(n,t,e,r,i,s){const a=(0,o.up)("router-link");return(0,o.wg)(),(0,o.iD)("div",p,[v,(0,o._)("ul",m,[((0,o.wg)(!0),(0,o.iD)(o.HY,null,(0,o.Ko)(i.movies,(n=>((0,o.wg)(),(0,o.iD)("li",{class:"item",key:n},[(0,o._)("span",h,(0,f.zw)(n.id),1),(0,o.Wm)(a,{to:{name:"show",params:{id:n.id}}},{default:(0,o.w5)((()=>[(0,o._)("img",{src:n.poster,class:"poster"},null,8,w)])),_:2},1032,["to"]),(0,o._)("div",_,[(0,o._)("strong",g,(0,f.zw)(n.name),1),(0,o._)("span",b,[(0,o.Uk)("예매율 "),(0,o._)("span",k,(0,f.zw)(n.rate),1)]),(0,o.Wm)(a,{to:{name:"show",params:{id:n.id}},class:"link"},{default:(0,o.w5)((()=>[(0,o.Uk)("자세히보기")])),_:2},1032,["to"])])])))),128))])])}var O={created(){this.$http.get("/api/movies").then((n=>{this.movies=n.data}))},data(){return{movies:[]}}};const x=(0,u.Z)(O,[["render",y]]);var z=x;const j={class:"detail"},D=["src"],Z=(0,o._)("h2",null,"영화정보",-1),P={class:"info"},T=(0,o._)("dt",null,"감독",-1),W=(0,o._)("dt",null,"출연",-1),H=(0,o._)("dt",null,"러닝타임",-1),M=(0,o._)("h2",null,"줄거리",-1),U=["innerHTML"];function $(n,t,e,r,i,s){const a=(0,o.up)("router-link");return(0,o.wg)(),(0,o.iD)("div",j,[(0,o._)("h1",null,(0,f.zw)(n.movie.name),1),(0,o._)("img",{src:n.movie.poster,class:"poster"},null,8,D),(0,o._)("section",null,[Z,(0,o._)("dl",P,[T,(0,o._)("dd",null,(0,f.zw)(n.movie.director),1),W,(0,o._)("dd",null,(0,f.zw)(n.movie.actors),1),H,(0,o._)("dd",null,(0,f.zw)(n.movie.time),1)])]),(0,o._)("section",null,[M,(0,o._)("p",{innerHTML:n.movie.synopsis,class:"synopsis"},null,8,U)]),(0,o.Wm)(a,{to:{name:"index",params:{id:n.movie.id}},class:"link"},{default:(0,o.w5)((()=>[(0,o.Uk)("돌아가기")])),_:1},8,["to"])])}var C=e(4161),L={created:function(){var n=this.$route.params.id;C.Z.get("/api/movies/"+n).then((n=>{this.movie=n.data[0]}))},data:function(){return{movie:{}}}};const A=(0,u.Z)(L,[["render",$]]);var E=A;const F=[{path:"/",name:"index",component:z},{path:"/:id",name:"show",component:E}],K=(0,d.p7)({history:(0,d.PO)(),routes:F});var Y=K;const q=(0,r.ri)(c);q.config.globalProperties.$axios=C.Z,q.use(Y),q.mount("#app")}},t={};function e(r){var o=t[r];if(void 0!==o)return o.exports;var i=t[r]={exports:{}};return n[r].call(i.exports,i,i.exports,e),i.exports}e.m=n,function(){var n=[];e.O=function(t,r,o,i){if(!r){var s=1/0;for(c=0;c<n.length;c++){r=n[c][0],o=n[c][1],i=n[c][2];for(var a=!0,u=0;u<r.length;u++)(!1&i||s>=i)&&Object.keys(e.O).every((function(n){return e.O[n](r[u])}))?r.splice(u--,1):(a=!1,i<s&&(s=i));if(a){n.splice(c--,1);var l=o();void 0!==l&&(t=l)}}return t}i=i||0;for(var c=n.length;c>0&&n[c-1][2]>i;c--)n[c]=n[c-1];n[c]=[r,o,i]}}(),function(){e.n=function(n){var t=n&&n.__esModule?function(){return n["default"]}:function(){return n};return e.d(t,{a:t}),t}}(),function(){e.d=function(n,t){for(var r in t)e.o(t,r)&&!e.o(n,r)&&Object.defineProperty(n,r,{enumerable:!0,get:t[r]})}}(),function(){e.g=function(){if("object"===typeof globalThis)return globalThis;try{return this||new Function("return this")()}catch(n){if("object"===typeof window)return window}}()}(),function(){e.o=function(n,t){return Object.prototype.hasOwnProperty.call(n,t)}}(),function(){var n={143:0};e.O.j=function(t){return 0===n[t]};var t=function(t,r){var o,i,s=r[0],a=r[1],u=r[2],l=0;if(s.some((function(t){return 0!==n[t]}))){for(o in a)e.o(a,o)&&(e.m[o]=a[o]);if(u)var c=u(e)}for(t&&t(r);l<s.length;l++)i=s[l],e.o(n,i)&&n[i]&&n[i][0](),n[i]=0;return e.O(c)},r=self["webpackChunkfrontend"]=self["webpackChunkfrontend"]||[];r.forEach(t.bind(null,0)),r.push=t.bind(null,r.push.bind(r))}();var r=e.O(void 0,[998],(function(){return e(1464)}));r=e.O(r)})();
//# sourceMappingURL=app.0964f6eb.js.map