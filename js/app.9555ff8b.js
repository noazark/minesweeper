(function(t){function e(e){for(var i,o,s=e[0],c=e[1],u=e[2],m=0,l=[];m<s.length;m++)o=s[m],Object.prototype.hasOwnProperty.call(r,o)&&r[o]&&l.push(r[o][0]),r[o]=0;for(i in c)Object.prototype.hasOwnProperty.call(c,i)&&(t[i]=c[i]);h&&h(e);while(l.length)l.shift()();return a.push.apply(a,u||[]),n()}function n(){for(var t,e=0;e<a.length;e++){for(var n=a[e],i=!0,s=1;s<n.length;s++){var c=n[s];0!==r[c]&&(i=!1)}i&&(a.splice(e--,1),t=o(o.s=n[0]))}return t}var i={},r={app:0},a=[];function o(e){if(i[e])return i[e].exports;var n=i[e]={i:e,l:!1,exports:{}};return t[e].call(n.exports,n,n.exports,o),n.l=!0,n.exports}o.m=t,o.c=i,o.d=function(t,e,n){o.o(t,e)||Object.defineProperty(t,e,{enumerable:!0,get:n})},o.r=function(t){"undefined"!==typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(t,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(t,"__esModule",{value:!0})},o.t=function(t,e){if(1&e&&(t=o(t)),8&e)return t;if(4&e&&"object"===typeof t&&t&&t.__esModule)return t;var n=Object.create(null);if(o.r(n),Object.defineProperty(n,"default",{enumerable:!0,value:t}),2&e&&"string"!=typeof t)for(var i in t)o.d(n,i,function(e){return t[e]}.bind(null,i));return n},o.n=function(t){var e=t&&t.__esModule?function(){return t["default"]}:function(){return t};return o.d(e,"a",e),e},o.o=function(t,e){return Object.prototype.hasOwnProperty.call(t,e)},o.p="https://noazark.github.io/minesweeper/";var s=window["webpackJsonp"]=window["webpackJsonp"]||[],c=s.push.bind(s);s.push=e,s=s.slice();for(var u=0;u<s.length;u++)e(s[u]);var h=c;a.push([0,"chunk-vendors"]),n()})({0:function(t,e,n){t.exports=n("cd49")},1781:function(t,e,n){},3224:function(t,e,n){"use strict";n("83eb")},"5fee":function(t,e,n){"use strict";n("bb41")},"6a5c":function(t,e,n){},7687:function(t,e,n){},"7cb9":function(t,e,n){"use strict";n("7687")},"83eb":function(t,e,n){},bb41:function(t,e,n){},cd49:function(t,e,n){"use strict";n.r(e);n("e260"),n("e6cf"),n("cca6"),n("a79d");var i=n("7a23");function r(t,e,n,r,a,o){return Object(i["g"])(),Object(i["c"])(Object(i["l"])(a.gameMode))}n("a9e3");var a=Object(i["r"])("data-v-1102f209");Object(i["i"])("data-v-1102f209");var o={class:"classic-app"},s={class:"timer"},c={class:"right"},u=Object(i["e"])(" : "),h=Object(i["e"])(" : ");Object(i["h"])();var m,l=a(function(t,e,n,r,a,m){var l=Object(i["k"])("timer"),f=Object(i["k"])("tile");return Object(i["g"])(),Object(i["c"])("div",o,[Object(i["f"])("div",s,[Object(i["f"])("span",c,Object(i["m"])(m.flagCount),1),u,Object(i["f"])(l,{class:"left",time:a.time},null,8,["time"]),h,Object(i["f"])("a",{href:"",onClick:e[1]||(e[1]=Object(i["q"])(function(){return m.restart&&m.restart.apply(m,arguments)},["prevent"]))},"restart")]),Object(i["f"])("div",{class:"map",style:{"--columns":a.gameSize[0]}},[(Object(i["g"])(!0),Object(i["c"])(i["a"],null,Object(i["j"])(m.times(a.matrix.w*a.matrix.h,Number),function(t,e){return Object(i["g"])(),Object(i["c"])(f,{key:e,isBomb:m.isCell(a.matrix,e,a.PROPS.BOMB),isMasked:m.isCell(a.matrix,e,a.PROPS.MASK),isFlagged:m.isCell(a.matrix,e,a.PROPS.FLAG),bombCount:m.countNeighbors(a.matrix,e,a.PROPS.BOMB),onFlag:function(t){return m.flag(e)},onUnmaskAroundFlags:function(t){return m.unmaskAroundFlags(e)},onUnmask:function(t){return m.unmask(e)}},null,8,["isBomb","isMasked","isFlagged","bombCount","onFlag","onUnmaskAroundFlags","onUnmask"])}),128))],4)])}),f=(n("159b"),n("2ef0")),d=n("2909"),b=n("3835"),p=n("ade3"),v=(n("ace4"),n("d3b7"),n("fb2c"),n("9a8c"),n("a975"),n("735e"),n("c1ac"),n("d139"),n("3a7b"),n("d5d6"),n("82f8"),n("e91f"),n("60bd"),n("5f96"),n("3280"),n("3fcc"),n("ca91"),n("25a1"),n("cd26"),n("3c5d"),n("2954"),n("649e"),n("219c"),n("170b"),n("b39a"),n("72f7"),n("99af"),n("d81d"),32);function g(t,e,n){var i=O(t,e);if(null==n&&(n=Math.floor(.2*i.size)),i.size<=n||n<0)throw new Error("invalid map");var r=j(i,n);return r.forEach(function(t){k(i,t,m.BOMB,!0)}),i}function O(t,e){for(var n,i=t*e,r=(n={},Object(p["a"])(n,m.BOMB,new Uint32Array(Math.ceil(i/v))),Object(p["a"])(n,m.MASK,new Uint32Array(Math.ceil(i/v))),Object(p["a"])(n,m.FLAG,new Uint32Array(Math.ceil(i/v))),Object(p["a"])(n,"w",t),Object(p["a"])(n,"h",e),Object(p["a"])(n,"size",i),n),a=0;a<i;a++)w(r[m.MASK],a),y(r[m.BOMB],a),y(r[m.FLAG],a);return r}function j(t,e){var n=[];return Object(f["times"])(e,function(){var e;do{e=Math.floor(Math.random()*t.size)}while(n.indexOf(e)>=0);n.push(e)}),n}function x(t,e){var n=Math.floor(e/v),i=e%v;return(t[n]>>i)%2!=0}function w(t,e){var n=Math.floor(e/v),i=e%v;return t[n]=t[n]|1<<i}function y(t,e){var n=Math.floor(e/v),i=e%v;return t[n]=t[n]&~(1<<i)}function M(t,e,n){return null!=n?n?w(t,e):y(t,e):x(t,e)?y(t,e):w(t,e)}function k(t,e,n,i){return M(t[n],e,i),x(t[n],e)}function B(t,e){return x(t[m.MASK],e)&&M(t[m.FLAG],e),x(t[m.FLAG],e)}function A(t,e,n){return x(t[n],e)}function S(t,e){var n=t.w,i=t.h,r=e.r,a=e.c;return r>=0&&a>=0&&r<i&&a<n}function P(t){return F(t)&&!Object(f["times"])(t.size,Number).some(function(e){return z(t,e)||T(t,e)})}function F(t){return!Object(f["times"])(t.size,Number).some(function(e){return C(t,e)})}function C(t,e){return A(t,e,m.BOMB)&&!A(t,e,m.MASK)}function z(t,e){return!A(t,e,m.BOMB)&&A(t,e,m.FLAG)}function T(t,e){return!A(t,e,m.BOMB)&&A(t,e,m.MASK)}function L(t,e){return Object(f["times"])(t.size,Number).reduce(function(n,i){return A(t,i,e)&&n.push(i),n},[])}function U(t){return L(t,m.BOMB)}function K(t){return L(t,m.FLAG).length}function I(t,e){if(e>t.size-1)throw new Error("offset is out of range");var n=Math.floor(e/t.w),i=e%t.w;return{r:n,c:i}}function _(t,e){return e.r*t.w+e.c}function G(t,e){var n=[[-1,-1],[-1,0],[-1,1],[0,-1],[0,1],[1,-1],[1,0],[1,1]],i=I(t,e);return n.reduce(function(e,n){var r=Object(b["a"])(n,2),a=r[0],o=r[1],s={r:i.r+a,c:i.c+o};return S(t,s)&&(e=[].concat(Object(d["a"])(e),[_(t,s)])),e},[])}(function(t){t["BOMB"]="bomb",t["FLAG"]="flag",t["MASK"]="mask"})(m||(m={}));var N=function(t,e){return t+e};function E(t,e,n){return G(t,e).map(function(e){return A(t,e,n)?1:0}).reduce(N,0)}function $(t,e){var n=arguments.length>2&&void 0!==arguments[2]?arguments[2]:[];return A(t,e,m.FLAG)||n.push(e),A(t,e,m.BOMB)||E(t,e,m.BOMB)>0?n:n.concat(q(t,e,n))}function R(t,e){return!A(t,e,m.MASK)&&E(t,e,m.FLAG)>=E(t,e,m.BOMB)?q(t,e,[],!0):[]}function q(t,e){var n=arguments.length>2&&void 0!==arguments[2]?arguments[2]:[],i=arguments.length>3&&void 0!==arguments[3]&&arguments[3];return A(t,e,m.FLAG)?[]:G(t,e).reduce(function(e,r){var a=n.concat(e).some(function(t){return r==t});if(A(t,r,m.FLAG)||a)return e;var o=E(t,r,m.BOMB)>0;if(!o)return Object(f["difference"])($(t,r,n.concat(e)),n);var s=!A(t,r,m.BOMB);return i||s?[].concat(Object(d["a"])(e),[r]):e},[])}function D(t,e){return!(E(t,e,m.BOMB)>0)&&!A(t,e,m.BOMB)}var H=Object(i["r"])("data-v-62d95a69"),J=H(function(t,e,n,r,a,o){var s;return Object(i["g"])(),Object(i["c"])("div",{class:["tile",(s={},Object(p["a"])(s,"val-".concat(n.bombCount),!n.isMasked),Object(p["a"])(s,"debug",a.debug&&!n.isMasked),Object(p["a"])(s,"bomb",n.isBomb),Object(p["a"])(s,"masked",n.isMasked&&!a.debug),Object(p["a"])(s,"unmasked",!n.isMasked||a.debug),Object(p["a"])(s,"flagged",n.isFlagged),s)],onContextmenu:e[1]||(e[1]=Object(i["q"])(function(){},["stop","prevent"])),onMouseup:e[2]||(e[2]=function(t){return o.unmask(t)}),onMousedown:e[3]||(e[3]=function(t){return o.track(t)})},[a.debug||!n.isMasked&&!n.isBomb&&n.bombCount?(Object(i["g"])(),Object(i["c"])(i["a"],{key:0},[Object(i["e"])(Object(i["m"])(n.bombCount),1)],64)):Object(i["d"])("",!0)],34)}),Y={props:["isBomb","isMasked","isFlagged","bombCount"],data:function(){return{debug:!1}},methods:{track:function(t){t.preventDefault(),t.stopPropagation(),this.evt=t},unmask:function(t){t.preventDefault(),t.stopPropagation(),null==this.evt&&(this.evt=t),2===this.evt.buttons?this.$emit("flag"):3===this.evt.buttons||1===this.evt.buttons&&this.evt.metaKey?this.$emit("unmaskAroundFlags"):1===this.evt.buttons&&this.$emit("unmask"),this.evt=void 0}}};n("e380");Y.render=J,Y.__scopeId="data-v-62d95a69";var V=Y;function W(t,e,n,r,a,o){return Object(i["g"])(),Object(i["c"])("span",null,Object(i["m"])(o.displayTime),1)}n("b680");var Q={props:["time"],computed:{displayTime:function(){return(this.time/1e3).toFixed()}}};Q.render=W;var X=Q,Z={components:{Tile:V,Timer:X},data:function(){return{PROPS:m,gameSize:[30,16],bombCount:99,matrix:[],playing:!0,startedAt:0,time:0}},mounted:function(){this.matrix=g(this.gameSize[0],this.gameSize[1],this.bombCount)},watch:{startedAt:function(){var t=this,e=function e(){window.requestIdleCallback(function(){t.playing&&(t.time=Date.now()-t.startedAt,e())})};e()},matrix:{handler:function(){var t=this;if((this.playing&&P(this.matrix)||!F(this.matrix))&&this.stop(),!P(this.matrix)&&!F(this.matrix)){var e=U(this.matrix);e.forEach(function(e){return A(t.matrix,e).isMasked=!1})}},deep:!0}},computed:{flagCount:function(){return this.bombCount-K(this.matrix)}},methods:{times:f["times"],isCell:A,countNeighbors:E,start:function(t){while(!D(this.matrix,t))this.matrix=g(this.gameSize[0],this.gameSize[1],this.bombCount);this.playing=!0,this.startedAt=Date.now()},restart:function(){this.matrix=g(this.gameSize[0],this.gameSize[1],this.bombCount),this.playing=!1,this.startedAt=0,this.time=0},stop:function(){this.playing=!1},flag:function(t){F(this.matrix)&&(this.startedAt||this.start(t),B(this.matrix,t))},unmaskAroundFlags:function(t){var e=this;if(F(this.matrix)){var n=R(this.matrix,t);n.forEach(function(t){return A(e.matrix,t,m.MASK)}),n.forEach(function(t){return e.doUnmask(t)})}},unmask:function(t){var e=this;if(F(this.matrix)){this.startedAt||this.start(t);var n=$(this.matrix,t);n.forEach(function(t){return e.doUnmask(t)})}},doUnmask:function(t){return k(this.matrix,t,m.MASK,!1),!0}}};n("3224");Z.render=l,Z.__scopeId="data-v-1102f209";var tt=Z,et=void 0,nt=Object(i["r"])("data-v-47133b14");Object(i["i"])("data-v-47133b14");var it={class:"txt-app"},rt={class:"history"};Object(i["h"])();var at=nt(function(t,e,n,r,a,o){var s=Object(i["k"])("tile"),c=Object(i["k"])("terminal");return Object(i["g"])(),Object(i["c"])("div",it,[Object(i["f"])("code",{class:"map",style:{"--columns":a.gameSize[0]}},[(Object(i["g"])(!0),Object(i["c"])(i["a"],null,Object(i["j"])(o.times(a.matrix.size,Number),function(t,e){return Object(i["g"])(),Object(i["c"])(s,{key:e,isBomb:o.isBomb(a.matrix,e),isMasked:o.isMasked(a.matrix,e),isFlagged:o.isFlagged(a.matrix,e),bombCount:o.neighboringBombs(a.matrix,e),isActive:a.cursor===e,isPreview:null!=a.preview&&a.preview===e},null,8,["isBomb","isMasked","isFlagged","bombCount","isActive","isPreview"])}),128))],4),Object(i["f"])("p",null,[Object(i["f"])(c,{onInput:et.playPreview,onSubmit:et.play},null,8,["onInput","onSubmit"])]),Object(i["f"])("code",rt,[Object(i["f"])("pre",{innerHTML:a.output},null,8,["innerHTML"])])])}),ot=n("8785"),st=(n("ac1f"),n("466d"),n("4de4"),n("a15b"),Object(i["e"])(" > "));function ct(t,e,n,r,a,o){return Object(i["g"])(),Object(i["c"])("div",null,[st,Object(i["o"])(Object(i["f"])("input",{class:"cli",onKeyup:[e[1]||(e[1]=Object(i["p"])(function(){return o.historyNext&&o.historyNext.apply(o,arguments)},["up"])),e[2]||(e[2]=Object(i["p"])(function(){return o.historyPrev&&o.historyPrev.apply(o,arguments)},["down"])),e[3]||(e[3]=Object(i["p"])(Object(i["q"])(function(t){return o.submit(a.next)},["prevent"]),["enter"]))],onInput:e[4]||(e[4]=function(t){return o.input(t.target.value)}),"onUpdate:modelValue":e[5]||(e[5]=function(t){return a.next=t}),placeholder:"try, /howto",autofocus:"",onBlur:e[6]||(e[6]=function(t){return t.target.focus()})},null,544),[[i["n"],a.next]])])}var ut={data:function(){return{next:"",commands:[],cursor:0,mem:void 0}},methods:{reset:function(){var t=this.cursor;null==!this.mem&&(this.mem=this.next),this.next=this.commands[t],null==this.next&&(this.next=this.mem)},historyPrev:function(){var t=this.cursor+1;t>this.commands.length-1?this.cursor=this.commands.length:this.cursor=t,this.reset()},historyNext:function(){var t=this.cursor-1;this.cursor=t<0?0:t,this.reset()},input:function(t){this.$emit("input",t)},submit:function(t){this.commands.push(t),this.cursor=this.commands.length,this.next="",this.$emit("submit",t)}}};n("edee");ut.render=ct;var ht=ut,mt=Object(i["r"])("data-v-58fbd08d"),lt=mt(function(t,e,n,r,a,o){var s;return Object(i["g"])(),Object(i["c"])("div",{class:["tile",(s={},Object(p["a"])(s,"val-".concat(n.bombCount),!n.isMasked),Object(p["a"])(s,"bomb",n.isBomb),Object(p["a"])(s,"masked",n.isMasked),Object(p["a"])(s,"unmasked",!n.isMasked),Object(p["a"])(s,"flagged",n.isFlagged),Object(p["a"])(s,"active",n.isActive),Object(p["a"])(s,"preview",n.isPreview),s)],innerHTML:o.display},null,10,["innerHTML"])}),ft={props:["isBomb","isMasked","isFlagged","bombCount","isActive","isPreview"],computed:{display:function(){return this.isFlagged?"x":this.isMasked?"o":this.isBomb?"*":this.bombCount>0?this.bombCount:this.isActive?"#":"."}}};n("5fee");ft.render=lt,ft.__scopeId="data-v-58fbd08d";var dt,bt=ft,pt=n("eb29"),vt={components:{Terminal:ht,Tile:bt},data:function(){return{cursor:0,preview:null,gameSize:[10,10],matrix:{},playing:!0,score:0,output:"",commands:[[/^m(?:ove)?\s*?(u(?:p)?|d(?:own)?|l(?:eft)?|r(?:ight)?)(?:\s*(\d+))?/i,"move","move right 5"],[/^f(?:lag)?\s*?(u(?:p)?|d(?:own)?|l(?:eft)?|r(?:ight)?)(?:\s*(\d+))?/i,"flag","flag down"],[/^s(weep)?/i,"sweep","sweep"],[/^\/reset(?: (\d+) (\d+)(?: (\d+))?)?$/,"restart","/reset 10 10 10"],[/^\/score/,"showScore","/score"],[/^\/flags/,"showFlagCount","/flags"],[/^\/clear/,"clear","/clear"],[/^\/help/,"help","/help"],[/^\/howto/,"howto","/howto"]]}},mounted:function(){this.restart()},watch:{score:{handler:function(){var t=this;if(P(this.matrix)?this.output="you win!\n\n/reset to play again":F(this.matrix)||(this.output="game over\n\n/reset to play again"),(this.playing&&P(this.matrix)||!F(this.matrix))&&this.stop(),!P(this.matrix)&&!F(this.matrix)){var e=U(this.matrix);e.forEach(function(e){return t.doUnmask(e)})}},deep:!0}},methods:{times:f["times"],offsetToPoint:I,neighboringBombs:function(t,e){return E(t,e,m.BOMB)},isBomb:function(t,e){return A(t,e,m.BOMB)},isMasked:function(t,e){return A(t,e,m.MASK)},isFlagged:function(t,e){return A(t,e,m.FLAG)},start:function(){this.playing=!0},restart:function(t,e,n,i){var r=this;e&&(this.gameSize[0]=parseInt(e)),n&&(this.gameSize[1]=parseInt(n)),i&&(i=parseInt(i)),this.cursor=0;do{this.matrix=g(this.gameSize[0],this.gameSize[1],i)}while(!D(this.matrix,this.cursor));var a=$(this.matrix,this.cursor);a.forEach(function(t){return r.doUnmask(t)}),this.score=0,this.playing=!1},stop:function(){this.playing=!1},play:function(t){var e=this,n="/"===t[0];if(this.preview=null,!n){if(P(this.matrix)||!F(this.matrix))return void(this.output="game is over, please '/reset'");this.playing||this.start()}var i=this.commands.some(function(i){var r=Object(b["a"])(i,2),a=r[0],o=r[1],s=t.match(a);return s&&(e.output=e[o].apply(e,Object(d["a"])(s)),n||e.score++),s});i||(this.output="unknown command")},playPreview:function(t){var e=this,n=this.commands.some(function(n){var i=Object(b["a"])(n,2),r=i[0],a=i[1],o=a+"Preview",s=t.match(r);return s&&e.funcPreview&&(e.output=e[o].apply(e,Object(d["a"])(s))),s});n||(this.preview=null)},move:function(t,e){var n=this,i=arguments.length>2&&void 0!==arguments[2]?arguments[2]:1;i=parseInt(i);var r=Object(f["times"])(i,function(){var t=I(n.matrix,n.cursor),i=t.r,r=t.c;if("up"!==e&&"u"!==e||(i-=1),"down"!==e&&"d"!==e||(i+=1),"left"!==e&&"l"!==e||(r-=1),"right"!==e&&"r"!==e||(r+=1),S(n.matrix,{r:i,c:r})){n.cursor=_(n.matrix,{r:i,c:r});var a=$(n.matrix,n.cursor).filter(n.doUnmask);return a.length}});return"".concat(r.reduce(function(t,e){return t+e})," cleared")},cmdPreview:function(t,e){var n=arguments.length>2&&void 0!==arguments[2]?arguments[2]:1;n=parseInt(n);var i=I(this.matrix,this.cursor),r=i.r,a=i.c;"up"!==e&&"u"!==e||(r-=n),"down"!==e&&"d"!==e||(r+=n),"left"!==e&&"l"!==e||(a-=n),"right"!==e&&"r"!==e||(a+=n),S(this.matrix,{r:r,c:a})?this.preview=_(this.matrix,{r:r,c:a}):this.preview=null},movePreview:function(){this.cmdPreview.apply(this,arguments)},flagPreview:function(){this.cmdPreview.apply(this,arguments)},flag:function(t,e){var n=arguments.length>2&&void 0!==arguments[2]?arguments[2]:1;n=parseInt(n);var i=I(this.matrix,this.cursor),r=i.r,a=i.c;"up"!==e&&"u"!==e||(r-=n),"down"!==e&&"d"!==e||(r+=n),"left"!==e&&"l"!==e||(a-=n),"right"!==e&&"r"!==e||(a+=n);var o={r:r,c:a},s=_(this.matrix,o);if(S(this.matrix,o))return B(this.matrix,s)?"OK":"Flag removed"},showScore:function(){return"".concat(this.score," (lower is better)")},showFlagCount:function(){return"".concat(K(this.matrix)," of ").concat(U(this.matrix).length)},sweep:function(){var t=R(this.matrix,this.cursor).filter(this.doUnmask);return"".concat(t.length," cleared")},help:function(){return this.commands.map(function(t){return t[2]}).join("\r\n")},howto:function(){return Object(pt["a"])(dt||(dt=Object(ot["a"])(['\n        Welcome!\n\n        This game is not timed, so have fun and explore. The goal is to\n        uncover all the bombs, "*", hidden underneith the masked tiles, "o".\n\n        There are currently '," bombs randomly placed underneith ","\n        tiles. You are welcome to change the size of the game by typing something like:\n\n          /reset 15 10 20\n\n        This will make the game 15 tiles wide, 10 tiles tall and have 20 hidden bombs.\n        You are scored by the number of moves it takes to unmask all the bombs. Lower\n        score is better! Now it's time to get started. Type '/help' for a list of\n        commands, explore them and have fun!\n\n        Oh... and if you think this game sounds a lot like another game you've played\n        before, you are correct."])),U(this.matrix).length,this.gameSize[0]*this.gameSize[1])},clear:function(){return""},doUnmask:function(t){return k(this.matrix,t,m.MASK,!1),!0}}};n("7cb9");vt.render=at,vt.__scopeId="data-v-47133b14";var gt=vt,Ot={name:"app",components:{Classic:tt,Txt:gt},data:function(){return{gameMode:"txt"}}};Ot.render=r;var jt=Ot;Object(i["b"])(jt).mount("#app")},e380:function(t,e,n){"use strict";n("6a5c")},edee:function(t,e,n){"use strict";n("1781")}});
//# sourceMappingURL=app.9555ff8b.js.map