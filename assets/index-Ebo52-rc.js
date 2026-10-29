(function(){let e=document.createElement(`link`).relList;if(e&&e.supports&&e.supports(`modulepreload`))return;for(let e of document.querySelectorAll(`link[rel="modulepreload"]`))n(e);new MutationObserver(e=>{for(let t of e)if(t.type===`childList`)for(let e of t.addedNodes)e.tagName===`LINK`&&e.rel===`modulepreload`&&n(e)}).observe(document,{childList:!0,subtree:!0});function t(e){let t={};return e.integrity&&(t.integrity=e.integrity),e.referrerPolicy&&(t.referrerPolicy=e.referrerPolicy),t.credentials=e.crossOrigin===`use-credentials`?`include`:e.crossOrigin===`anonymous`?`omit`:`same-origin`,t}function n(e){if(e.ep)return;e.ep=!0;let n=t(e);fetch(e.href,n)}})();var e=[`絶対値`,`平方根`],t=[`横`,`縦`,`幅`,`高さ`,`大きさ`,`言葉`,`向き`,`年`,`月`,`日`,`曜日`,`時`,`分`,`秒`],n={押している:!0,押していない:!1},r=`乱数`,i=`その`,a=`どれか`,o=[`番目`,`文字目`],s=[`個数`,`文字数`],c=e=>o.includes(e),l=e=>s.includes(e);function u(i){return i.map((o,s)=>{if(o.kind===`助詞`&&o.text===`を`&&i[s+1]?.kind===`語`&&i[s+1].text in n)return{kind:`記号`,text:o.text,op:`を`,start:o.start,end:o.end};if(o.kind!==`助詞`||o.text!==`の`)return o;let u=i[s+1];if(u?.kind===`語`&&t.includes(u.text)){let e=s;for(;e<i.length&&i[e].kind!==`句点`&&i[e].kind!==`コロン`;)e++;let t=s+2;for(;t<e&&(i[t].kind!==`助詞`||i[t].text===`と`||i[t].text===`の`);)t++;return i[t]?.text===`を`&&i[e-1]?.text===`する`?o:{kind:`記号`,text:o.text,op:`の`,start:o.start,end:o.end}}let d=i[s+1],f=!1;return(d?.kind===`数`&&d.unit!==null&&c(d.unit)||d?.kind===`語`&&(l(d.text)||d.text===r||d.text===a)||d?.kind===`語`&&i[s+2]?.kind===`語`&&c(i[s+2].text)||d?.kind===`記号`&&d.op===`(`||d?.kind===`文字`||d?.kind===`項目`||d?.kind===`語`&&e.includes(d.text)||(d?.kind===`数`||d?.kind===`語`)&&i[s+2]?.kind===`記号`&&i[s+2].op===`〜`)&&(f=!0),f?{kind:`記号`,text:o.text,op:`の`,start:o.start,end:o.end}:o})}var d=[`と`,`の`],f=`とは`,p=[`は`,`が`,`を`,`に`,`から`,`だけ`,`まで`],m=`繰り返す`,h=`間`,g=`1つずつ`,_=`入れて`,v=`ずっと`,y=`なら`,ee=`そうでなく`,te=`そうでなければ`,ne=`作る`,b=class extends Error{start;end;constructor(e,t,n){super(e),this.start=t,this.end=n}};function x(e){return{kind:`語`,tokens:e,start:e[0].start,end:e[e.length-1].end}}var S=[`<`,`>`,`<=`,`>=`,`=`,`!=`],re=`「ねこ の 横」のような持ち物を比べるときは、「(ねこ の 横) >= 100」のように ( ) で囲みます。`;function ie(e){return e.some(e=>e.kind===`記号`&&e.op!==null&&S.includes(e.op))&&e.some(e=>e.kind===`助詞`&&e.text===`の`)}function C(e){return e?.kind===`記号`?e.op:null}function w(e){if(e.kind===`項`)return e.token.text;if(e.kind===`その`)return`${i} ${e.thing.text}`;if(e.kind===`道具`)return`${w(e.target)} の ${e.tool}`;if(e.kind===`距離`)return`${w(e.a)} と ${w(e.b)} の 距離`;if(e.kind===`番目`){let t=e.index.kind===`項`?w(e.index):`(${w(e.index)})`;return`${w(e.list)} の ${t} ${e.unit}`}if(e.kind===`個数`)return`${w(e.list)} の ${e.word}`;if(e.kind===`見出し`)return`${w(e.table)} の ${e.key.kind===`項`?w(e.key):`(${w(e.key)})`}`;if(e.kind===`項目`)return`${w(e.record)} の ${e.field.text}`;if(e.kind===`範囲`){let t=e=>e.kind===`項`?w(e):`(${w(e)})`;return`${w(e.list)} の ${t(e.from)}〜${t(e.to)} ${e.unit}`}if(e.kind===`乱数`){let t=e=>e.kind===`項`?w(e):`(${w(e)})`;return`${t(e.min)}〜${t(e.max)} の ${r}`}if(e.kind===`どれか`)return`${w(e.list)} の ${a}`;if(e.kind===`様子`)return`${w(e.thing)} の ${e.property}`;if(e.kind===`押している`)return`${w(e.key)} を ${e.held?`押している`:`押していない`}`;if(e.kind===`でない`)return`${e.expr.kind===`計算`?`(${w(e.expr)})`:w(e.expr)} でない`;if(e.kind===`呼ぶ`)return`(${e.sentence.verb.map(e=>e.text).join(` `)})`;let t=e=>e.kind===`計算`?`(${w(e)})`:w(e);return`${t(e.left)} ${e.op} ${t(e.right)}`}function ae(o){let s=u(o),d=0;function f(){let e=p();for(;C(s[d])===`または`;){d++;let t=p();e={kind:`計算`,op:`または`,left:e,right:t,start:e.start,end:t.end}}return e}function p(){let e=m();for(;C(s[d])===`かつ`;){d++;let t=m();e={kind:`計算`,op:`かつ`,left:e,right:t,start:e.start,end:t.end}}return e}function m(){let e=h();for(;C(s[d])===`でない`;){let t=s[d];d++,e={kind:`でない`,expr:e,start:e.start,end:t.end}}return e}function h(){let e=g(),t=C(s[d]);if(t===null||!S.includes(t))return e;d++;let n=g(),r=s[d],i=C(r);if(r&&i!==null&&S.includes(i))throw new b(`比べる記号は、1つの式に1つまでです。`,r.start,r.end);return{kind:`計算`,op:t,left:e,right:n,start:e.start,end:n.end}}function g(){let e=_(),t=C(s[d]);for(;t===`+`||t===`-`;){d++;let n=_();e={kind:`計算`,op:t,left:e,right:n,start:e.start,end:n.end},t=C(s[d])}return e}function _(){let e=v(),t=C(s[d]);for(;t===`*`||t===`/`||t===`%`;){d++;let n=v();e={kind:`計算`,op:t,left:e,right:n,start:e.start,end:n.end},t=C(s[d])}return e}function v(){let i=y();if(C(s[d])===`〜`){let e=s[d];d++;let t=y(),n=s[d],a=s[d+1];if(C(n)!==`の`||a?.kind!==`語`||a.text!==r)throw new b(`「〜」は、「1〜6 の ${r}」のように使います。`,e.start,e.end);d+=2,i={kind:`乱数`,min:i,max:t,start:i.start,end:a.end}}for(;C(s[d])===`の`||C(s[d])===`を`;){if(C(s[d])===`を`){let e=s[d+1];d+=2,i={kind:`押している`,key:i,held:n[e.text],start:i.start,end:e.end};continue}d++;let r=s[d];if(r?.kind===`項目`)d++,i={kind:`項目`,record:i,field:r,start:i.start,end:r.end};else if(r?.kind===`文字`){d++;let e={kind:`項`,token:r,start:r.start,end:r.end};i={kind:`見出し`,table:i,key:e,start:i.start,end:r.end}}else if(r?.kind===`語`&&e.includes(r.text))d++,i={kind:`道具`,tool:r.text,target:i,start:i.start,end:r.end};else if(r?.kind===`語`&&t.includes(r.text))d++,i={kind:`様子`,thing:i,property:r.text,start:i.start,end:r.end};else if(r?.kind===`語`&&r.text===a)d++,i={kind:`どれか`,list:i,start:i.start,end:r.end};else if(r?.kind===`数`&&r.unit!==null&&c(r.unit)){d++;let e={kind:`項`,token:{...r,text:String(r.value),unit:null},start:r.start,end:r.end};i={kind:`番目`,unit:r.unit,list:i,index:e,start:i.start,end:r.end}}else if(r?.kind===`語`&&l(r.text))d++,i={kind:`個数`,word:r.text,list:i,start:i.start,end:r.end};else{let e=C(s[d])===`(`,t=y();if(e&&C(s[d])!==`〜`&&!(s[d]?.kind===`語`&&c(s[d].text))){i={kind:`見出し`,table:i,key:t,start:i.start,end:s[d-1].end};continue}if(C(s[d])===`〜`){d++;let e=s[d],n,r;if(e?.kind===`数`&&e.unit!==null&&c(e.unit))d++,n={kind:`項`,token:{...e,text:String(e.value),unit:null},start:e.start,end:e.end},r=e.unit;else{n=y();let e=s[d];if(e?.kind!==`語`||!c(e.text))throw new b(`範囲は「2〜3文字目」「2〜3番目」のように書きます。`,t.start,n.end);d++,r=e.text}i={kind:`範囲`,unit:r,list:i,from:t,to:n,start:i.start,end:s[d-1].end};continue}let n=s[d];if(n?.kind!==`語`||!c(n.text))throw new b(`「の」の後には、「1番目」「i 番目」「個数」「1文字目」「文字数」のどれかを書きます。`,t.start,t.end);d++,i={kind:`番目`,unit:n.text,list:i,index:t,start:i.start,end:n.end}}}return i}function y(){let e=s[d],t=s[d-1];if(!e)throw new b(`「${t.text}」の後に、数か名前を書きます。`,t.start,t.end);if(C(e)===`(`){let t=0,n=-1;for(let e=d;e<s.length;e++)if(C(s[e])===`(`&&t++,C(s[e])===`)`&&t--,t===0){n=e;break}let r=n===-1?[]:s.slice(d+1,n),i=me(r);if(i)return d=n+1,{...i,start:e.start,end:s[n].end};if(r.some(e=>e.kind===`助詞`)){let t=s[n],[i,...a]=ve([...r,{kind:`句点`,text:`。`,start:t.start,end:t.end}]);if(!i||a.length>0||i.condition||i.branch||i.every||i.body||i.always)throw new b(`かっこの中で呼べるのは、作った動詞を使う文1つだけです。`,e.start,t.end);return d=n+1,{kind:`呼ぶ`,sentence:i,start:e.start,end:t.end}}d++;let a=f();if(C(s[d])!==`)`)throw new b(`かっこが閉じていません。「)」を書いてください。`,e.start,e.end);return d++,a}if(e.kind===`記号`)throw e.op===`)`?new b(`「)」に合う「(」がありません。`,e.start,e.end):new b(`${t?`「${t.text}」と「${e.text}」の間`:`「${e.text}」の前`}に、数か名前を書きます。${!t&&e.op!==null&&S.includes(e.op)?re:``}`,e.start,e.end);let n=s[d+1];return e.kind===`語`&&e.text===i&&n?.kind===`語`?(d+=2,{kind:`その`,thing:n,start:e.start,end:n.end}):(d++,{kind:`項`,token:e,start:e.start,end:e.end})}let ee=f(),te=s[d];if(te){if(C(te)===`)`)throw new b(`「)」に合う「(」がありません。`,te.start,te.end);let e=s[d-1];throw new b(`「${e.text}」と「${te.text}」の間に、計算の記号がありません。`,e.start,te.end)}return ee}var oe=[`横`,`縦`];function se(e){let t={},n=null;for(let r of e)if(r.kind===`語`&&oe.includes(r.text)&&!(r.text in t))n=r.text,t[n]=[];else{if(n===null)throw new b(`位置は「横 100 縦 300」のように書きます。`,r.start,r.end);t[n].push(r)}for(let[n,r]of Object.entries(t))if(r.length===0)throw new b(`「${n}」の後に、数か名前か式を書きます。`,e[0].start,e[e.length-1].end);return{kind:`位置の式`,x:t.横?ae(t.横):null,y:t.縦?ae(t.縦):null,start:e[0].start,end:e[e.length-1].end}}function ce(e){if(e[0]?.kind===`語`&&oe.includes(e[0].text)&&e.length>=2&&e.some(e=>!(e.kind===`数`||e.kind===`語`&&oe.includes(e.text))))return se(e);let[t,n]=e;if(t?.kind===`語`&&t.text===`毎秒`&&e.length>=2&&(e.some(e=>e.kind===`記号`)||e.length===2&&n.kind===`語`)){let n=ae(e.slice(1));return{kind:`毎秒`,expr:n,start:t.start,end:n.end}}if(e.some(e=>e.kind===`記号`)){let t=ae(e);return{kind:`式`,expr:t,start:t.start,end:t.end}}return x(e)}function le(e){let t=e.find(e=>e.kind===`記号`);if(t)throw new b(`「${t.text}」のある式の後に、助詞（を、に など）を書きます。`,t.start,t.end)}function ue(e,t,n){return t.text===`と`?{kind:`並び`,items:e.kind===`並び`?[...e.items,n]:[e,n],start:e.start,end:n.end}:{kind:`持ち物`,owner:e,property:n,start:e.start,end:n.end}}function de(e,t){if(t.length===0)return e[0];let n=e[0].start,r=e[e.length-1].end;if(t.some(e=>e.text!==t[0].text))return{kind:`混ざり`,items:e,connectors:t,start:n,end:r};let i=e[0];return t.forEach((t,n)=>{i=ue(i,t,e[n+1])}),i}function fe(e){return e.kind===`数`&&e.unit===`回`}function pe(e,t){let n=[];for(let r of e)fe(r)?t.push(r):n.push(r);return n}function me(e){let t=e.length;if(t<5||e[t-1].text!==`距離`||e[t-2].text!==`の`)return null;let n=e.findIndex(e=>e.kind===`助詞`&&e.text===`と`);if(n<=0)return null;let r=e=>e.length===1&&e[0].kind===`語`?{kind:`項`,token:e[0],start:e[0].start,end:e[0].end}:e.length===2&&e[0].text===i&&e[1].kind===`語`?{kind:`その`,thing:e[1],start:e[0].start,end:e[1].end}:null,a=r(e.slice(0,n)),o=r(e.slice(n+1,t-2));return!a||!o?null:{kind:`距離`,a,b:o,start:e[0].start,end:e[t-1].end}}function he(e,t=``){return _e(ve(e),t)}function ge(e,t){let n=t===0?0:e.lastIndexOf(`
`,t-1)+1,r=n;for(;r<e.length&&/[\t 　]/.test(e[r]);)r++;let i=e.slice(n,r);if(/[ 　]/.test(i))throw new b(`字下げはタブで書きます（空白では字下げできません）。`,n,r);return i.length}function _e(e,t){let n=[],r=[{depth:0,list:n,header:null}],i=()=>{let e=r.pop();if(e?.header&&e.list.length===0){let{header:t}=e;throw new b(`「：」の次の行から、タブで1段字下げして中身を書きます。`,t.start,t.end)}};for(let n of e){let e=t===``?0:ge(t,n.start);for(;e<r[r.length-1].depth;)i();let a=r[r.length-1];if(e>a.depth)throw new b(`字下げが深すぎます。深くできるのは、「：」で終わる行の次の行だけで、1段ずつです。`,n.start,n.end);if(n.define&&r.length>1)throw new b(`動詞を作る文（〜 とは：）は、字下げせずに、いちばん外に書きます。`,n.start,n.end);a.list.push(n),n.body&&r.push({depth:e+1,list:n.body,header:n})}for(;r.length>1;)i();return n}function ve(e){let t=u(e),n=[],r=null,i=null,a=null,o=null,s=null,c=[],l=null,x=[],S=[],C=[],w=[];function oe(e,t,n,r){let a=w[w.length-1];if(a)throw new b(`「${a.text}」の後に、言葉と助詞が続いていません。`,a.start,a.end);t=pe(t,x),t.length>=2&&t[0].kind===`数`&&t[0].unit===`秒`&&(x.push(t[0]),t=t.slice(1));let o=n[0],l=n[n.length-1];if(t.length===0)throw new b(`「${o.text}」の前に動詞がありません。`,o.start,o.end);if(s||i)throw new b(`条件は、1つの文に1つまでです。`,o.start,l.end);if(x.length>1)throw new b(`回数は、1つの条件に1つまでです。`,x[1].start,x[1].end);s={kind:e,count:x.length===1?x[0]:null,phrases:c,verb:t,ending:n,start:r,end:l.end},c=[],S=[],x=[]}function se(e,t){let n=`1つずつ繰り返すときは、「果物 を ${g} 果 に ${_} ${m}：」と書きます。`,[i,a]=c;if(c.length!==2||i.particle.text!==`を`||a.particle.text!==`に`)throw new b(n,r??e.start,e.end);let o=a.words,[s,l]=o.kind===`語`?o.tokens:[];if(o.kind!==`語`||o.tokens.length!==2||s.text!==g||l.kind!==`語`)throw new b(n,a.start,a.end);let{words:u}=i,d;if(u.kind===`式`)d=u.expr;else if(u.kind===`語`&&u.tokens.length===1)d={kind:`項`,token:u.tokens[0],start:u.start,end:u.end};else throw new b(`「を」の前には、配列を書きます。`,u.start,u.end);return{kind:`1つずつ`,list:d,name:l,marks:[s,t],start:i.start,end:e.end}}function ue(e){let t=S[S.length-1];if(s||l||C.length>0)throw new b(`「〜 ${f}：」には、受け取る値の組と、作る動詞の名前だけを書きます。`,r??e.start,e.end);if(S.length!==2||S[0].kind!==`語`){let e=S.length>1?S[0]:t;throw new b(`「${f}」の前には、作る動詞の名前を1語で書きます（「あいさつする ${f}：」）。`,e.start,t.end)}let n=[];for(let e of c){let{words:t,particle:r}=e;if(!p.includes(r.text))throw new b(`受け取る値には、「${r.text}」の組は使えません。使えるのは は（が）・を・に・から・だけ・まで です。`,e.start,e.end);if(t.kind!==`語`||t.tokens.length!==1||t.tokens[0].kind!==`語`)throw new b(`受け取る値の名前は、1語で書きます（「相手 に」）。`,t.start,t.end);let i=e=>e===`が`?`は`:e;if(n.some(e=>i(e.particle.text)===i(r.text)))throw new b(`「${r.text}」の組は、1回までです。`,e.start,e.end);n.push({particle:r,name:t.tokens[0]})}return{name:S[0],params:n,marks:[t],start:r??e.start,end:e.end}}function fe(e){let[t,n]=S;if(S.length===2&&t.text===_&&n.text===m&&!s&&!l&&C.length===0)return se(e,t);let i=S[S.length-1];if(s||l||c.length>0||!i||i.text!==m||S.length!==2)throw new b(`「：」で始められるのは、「〜 なら：」「そうでなく 〜 なら：」「そうでなければ：」「10回 繰り返す：」「〜 の 間 繰り返す：」「〜 とは：」「〜たら：」「〜 ごと に：」です。`,r??e.start,e.end);let[a]=S;if(C.length===0&&a.kind===`数`&&a.unit===`回`){if(!Number.isInteger(a.value)||a.value<0)throw new b(`繰り返す回数は、「10回」のように0以上の整数で書きます。`,a.start,a.end);return{kind:`回数`,count:a,marks:[],start:a.start,end:e.end}}let o=w[0];if(a.text===h&&C.length===1&&w.length===1&&o.text===`の`){let t=C[0],n;if(t.kind===`式`)n=t.expr;else if(t.kind===`語`&&t.tokens.length===1)n={kind:`項`,token:t.tokens[0],start:t.start,end:t.end};else throw new b(`「の ${h}」の前には、比べる式（体力 > 0 など）を書きます。`,t.start,t.end);return{kind:`間`,test:n,marks:[o,a],start:t.start,end:e.end}}throw new b(`繰り返しは、「10回 ${m}：」か「体力 > 0 の ${h} ${m}：」と書きます。`,r??e.start,e.end)}function me(e){if(i||s)throw new b(`条件は、1つの文に1つまでです。`,e.start,e.end);if(c.length>0||C.length>0)throw new b(`「${y}」の条件は、文の頭に書きます。${ie(t.filter(t=>r!==null&&t.start>=r&&t.end<=e.end))?re:``}`,e.start,e.end);let n=S[0]?.kind===`語`&&S[0].text===ee?S[0]:null,a=n?S.slice(1):S;if(a.length===0)throw new b(`「${y}」の前に、比べる式（体力 > 0 など）を書きます。`,e.start,e.end);let o=ae(a),l=n?[n,e]:[e];i={kind:n?`そうでなく`:`なら`,test:o,marks:l,start:l[0].start,end:e.end},S=[]}let he=0;for(let e of t){if(r===null&&(r=e.start),e.kind===`記号`&&e.op===`(`)he++;else if(e.kind===`記号`&&e.op===`)`)he=Math.max(0,he-1);else if(he>0&&e.kind!==`句点`){S.push(e);continue}if(e.kind===`語`&&e.text===v&&e.start===r)o=e;else if(e.kind===`語`&&e.text===te){if(e.start!==r)throw new b(`「${te}」は、文の頭に書きます。`,e.start,e.end);i={kind:`そうでなければ`,marks:[e],start:e.start,end:e.end}}else if(e.kind===`語`&&e.text===y)me(e);else if(e.kind===`語`&&e.text===ee&&e.start===r&&(a=e),e.kind===`助詞`){let[t,n]=S;if(e.text===`に`&&S.length===2&&t.kind===`数`&&n.text===`ごと`&&C.length===0){if(l)throw new b(`「〜 ごと に」は、1つの文に1つまでです。`,t.start,e.end);l={count:t,start:t.start,end:e.end},S=[];continue}let i=S[S.length-1],a=S[S.length-2];if(e.text===`に`&&S.length>=2&&i.text===`ごと`&&a.kind!==`数`&&C.length===0){oe(`ごと`,S.slice(0,-1),[i,e],r);continue}if(S.length===0)throw new b(`「${e.text}」の前に言葉がありません。`,e.start,e.end);if(S.length>1&&(S=pe(S,x)),C.push(ce(S)),S=[],d.includes(e.text))w.push(e);else{let t=de(C,w);c.push({words:t,particle:e,start:t.start,end:e.end}),C=[],w=[]}}else if(e.kind===`コロン`){let t=i;if(a&&t?.kind!==`そうでなく`)throw new b(`「${ee}」の後には、「〜 ${y}：」の条件を書きます。`,a.start,a.end);if(o&&!t&&!s&&!l&&S.length===0&&c.length===0&&C.length===0){n.push({body:[],branch:null,loop:null,define:null,always:o,condition:null,phrases:[],every:null,verb:[],start:r,end:e.end}),r=null,o=null,x=[];continue}if(o)throw new b(`「${v}」の文には、条件（たら、ごと、なら）や繰り返しは付けられません。`,o.start,o.end);let u=s;if(!t&&(u||l)&&S.length===0&&c.length===0&&C.length===0){n.push({body:[],branch:null,loop:null,define:null,always:null,condition:u,phrases:[],every:l,verb:[],start:r,end:e.end}),r=null,s=null,l=null,S=[],x=[];continue}if(!t&&!u&&!l&&S.length===1&&S[0].text===ne&&c.length>0&&C.length===0){n.push({body:[],branch:null,loop:null,define:null,always:null,record:!0,condition:null,phrases:c,every:null,verb:[S[0]],start:r,end:e.end}),r=null,S=[],c=[],x=[];continue}if(!t&&S[S.length-1]?.text===f){let t=ue(e);n.push({body:[],branch:null,loop:null,define:t,always:null,condition:null,phrases:c,every:null,verb:[t.name],start:r,end:e.end}),r=null,S=[],c=[],x=[];continue}if(!t){let t=fe(e);n.push({body:[],branch:null,loop:t,define:null,always:null,condition:null,phrases:c,every:null,verb:[S[S.length-1]],start:r,end:e.end}),r=null,S=[],c=[],C=[],w=[],x=[];continue}if(S.length>0||c.length>0||C.length>0||l)throw new b(`「：」の行には条件だけを書き、する事は次の行から字下げして書きます。`,(c[0]??S[0]??C[0]??l).start,e.end);n.push({body:[],branch:t,loop:null,define:null,always:null,condition:null,phrases:[],every:null,verb:[],start:r,end:e.end}),r=null,i=null,a=null,x=[]}else if(e.kind===`語尾`)le(S),oe(`たら`,S,[e],r);else if(e.kind===`句点`){if(S[S.length-1]?.text===f){let e=S[S.length-1];throw new b(`動詞を作るときは、「〜 ${f}：」のように「：」を付けて、次の行から字下げして中身を書きます。`,e.start,e.end)}if(S[S.length-1]?.text===m){let e=S[S.length-1];throw new b(`繰り返すときは、「10回 ${m}：」のように「：」を付けて、次の行から字下げして中身を書きます。`,e.start,e.end)}let t=w[w.length-1];if(t)throw new b(`「${t.text}」の後に、言葉と助詞が続いていません。`,t.start,t.end);if(S.length===0)throw new b(`文の最後に動詞がありません。`,e.start,e.end);if(le(S),pe(S,x),x.length>0)throw new b(`「${x[0].text}」は、条件の中か、「まで」の前に書きます。`,x[0].start,x[0].end);if(a&&i?.kind!==`そうでなく`)throw new b(`「${ee}」の後には、「〜 ${y}、」の条件を書きます。`,a.start,a.end);if(i&&l)throw new b(`「${y}」の文には、「〜 ごと に」は付けられません。`,l.start,l.end);if(o&&(i||s||l))throw new b(`「${v}」の文には、条件（たら、ごと、なら）は付けられません。${i?`「${v}：」で行を終えて、次の行からタブで字下げして書くと、「${y}」の文も入れられます。`:``}`,o.start,o.end);n.push({body:null,branch:i,loop:null,define:null,always:o,condition:s,phrases:c,every:l,verb:S,start:r,end:e.end}),r=null,i=null,a=null,o=null,s=null,c=[],l=null,S=[]}else S.push(e)}if(r!==null){let e=t[t.length-1];throw new b(`文の終わりに「。」がありません。`,e.start,e.end)}return n}var ye=[`〜`,`~`];function be(e,t){if(!/^#[0-9a-fA-F]{6}/.test(e.slice(t,t+7)))return!1;let n=e[t+7];return n===void 0||/[\s、。「」()〜~:]/.test(n)}function xe(e,t){if(e[t]!==`#`||be(e,t))return null;let n=e.indexOf(`
`,t);return n===-1?e.length:n}function Se(e){let t=T(e),n=[],r=0;for(;r<t.length;){if(t[r]===`「`){let e=t.indexOf(`」`,r+1);r=e===-1?t.length:e+1;continue}let e=xe(t,r);e===null?r++:(n.push({start:r,end:e}),r=e)}return n}var Ce=[`は`,`が`,`を`,`に`,`から`,`だけ`,`まで`,`と`,`の`,`で`],we=[`たら`,`だら`],Te=/^(-?[0-9]+(?:\.[0-9]+)?)(.*)$/,Ee={"+":`+`,"-":`-`,"*":`*`,"/":`/`,"%":`%`,"×":`*`,"÷":`/`,"<":`<`,">":`>`,"<=":`<=`,">=":`>=`,"=":`=`,"!=":`!=`,"≦":`<=`,"≧":`>=`,"≤":`<=`,"≥":`>=`,"≠":`!=`},De=`:`,Oe={"(":`(`,")":`)`},ke=`ー`,Ae=/^#[0-9a-fA-F]{6}$/,je=`「`,Me=`」`,Ne=`{`,Pe=`}`;function Fe(e){return/\s/.test(e)||e===`、`}function T(e){return e.replace(/[！-～]/g,e=>String.fromCharCode(e.charCodeAt(0)-65248))}function Ie(e){for(let t of we)if(e.length>t.length&&e.endsWith(t))return t;return null}var Le=/^([〇一二三四五六七八九十百千万]+)(秒|回)?$/,Re=`〇一二三四五六七八九`,ze={十:10,百:100,千:1e3};function Be(e){let t=0,n=0,r=0;for(let i of e)Re.includes(i)?r=r*10+Re.indexOf(i):i===`万`?(t+=(n+r)*1e4,n=0,r=0):(n+=(r===0?1:r)*ze[i],r=0);return t+n+r}function Ve(e,t,n,r){if(Ce.includes(t))return{kind:`助詞`,text:e,start:n,end:r};if(t===`かつ`||t===`または`||t===`でない`)return{kind:`記号`,text:e,op:t,start:n,end:r};if(t in Ee)return{kind:`記号`,text:e,op:Ee[t],start:n,end:r};if(t===`==`)throw new b(`同じかどうかは、「=」1つで書きます。`,n,r);if(t===ke)throw new b(`引き算は「-」か「－」で書きます。「ー」（のばす音）は使えません。`,n,r);let i=Te.exec(t);if(i){let t=Number(i[1]),a=i[2]===``?null:i[2];if(a===`なら`)throw new b(`「なら」の前には、空白を入れます（「0 なら」）。`,n,r);return{kind:`数`,text:e,value:t,unit:a,start:n,end:r}}if(Ae.test(t))return{kind:`色`,text:e,value:t.toLowerCase(),start:n,end:r};let a=Le.exec(t);if(a)throw new b(`数は数字で書いてください。「${e}」は「${`${Be(a[1])}${a[2]??``}`}」と書きます。`,n,r);return{kind:`語`,text:e,start:n,end:r}}function He(e){let t=T(e),n=[],r=0;for(;r<t.length;){let i=t[r];if(Fe(i)){r++;continue}if(i===`。`){n.push({kind:`句点`,text:i,start:r,end:r+1}),r++;continue}let a=xe(t,r);if(a!==null){r=a;continue}if(i in Oe){n.push({kind:`記号`,text:e[r],op:Oe[i],start:r,end:r+1}),r++;continue}if(ye.includes(i)){n.push({kind:`記号`,text:e[r],op:`〜`,start:r,end:r+1}),r++;continue}if(i===De){n.push({kind:`コロン`,text:e[r],start:r,end:r+1}),r++;continue}if(i===je){let i=t.indexOf(Me,r+1);if(i===-1)throw new b(`「」で囲んだ文字が閉じていません。最後に「${Me}」を書いてください。`,r,t.length);n.push({kind:`文字`,text:e.slice(r,i+1),value:e.slice(r+1,i),start:r,end:i+1}),r=i+1;continue}if(i===Ne){let i=t.indexOf(Pe,r+1),a=i===-1?``:t.slice(r+1,i).trim();if(i===-1||/[\s。]/.test(t.slice(r+1,i)))throw new b(`｛｝で囲んだ項目が閉じていません。項目の名前のすぐ後に「｝」を書いてください。`,r,i===-1?t.length:i+1);if(a===``)throw new b(`｛｝の中に、項目の名前を書きます（｛最高点｝）。`,r,i+1);n.push({kind:`項目`,text:e.slice(r,i+1),name:a,start:r,end:i+1}),r=i+1;continue}if(i===Pe)throw new b(`「｝」の前に「｛」がありません。項目は ｛最高点｝ のように囲みます。`,r,r+1);let o=r;for(;r<t.length&&!Fe(t[r])&&t[r]!==`。`&&t[r]!==je&&t[r]!==Ne&&t[r]!==Pe&&!(t[r]in Oe)&&!ye.includes(t[r])&&t[r]!==De&&xe(t,r)===null;)r++;let s=Ie(t.slice(o,r));if(s){let i=r-s.length;n.push(Ve(e.slice(o,i),t.slice(o,i),o,i)),n.push({kind:`語尾`,text:e.slice(i,r),start:i,end:r})}else n.push(Ve(e.slice(o,r),t.slice(o,r),o,r))}return n}var Ue=[`夜`,`藤`,`紙`,`海`,`桜`,`向日葵`],We=1e5,Ge=3e3,Ke={width:40,height:40,color:`灰`,pattern:`なし`,label:``,part:``,items:[],image:``,angle:0,frames:[],frameGap:.2},qe=[`四角`,`丸`,`三角`],Je=[`ボタン`,`欄`,`一覧`,`字`],Ye=[...qe,...Je],Xe={ボタン:{width:120,height:44,color:`白`},欄:{width:240,height:40,color:`白`},一覧:{width:300,height:200,color:`白`},字:{width:0,height:32,color:`白`}},Ze=`#cfe3f0`,Qe={左:100,右端:800},$e=1/60,et={...Object.fromEntries(Array.from({length:26},(e,t)=>[String.fromCharCode(65+t),`キー`])),ゲーム:`もの`,重力:`もの`,背景:`もの`,幅:`持ち物`,高さ:`持ち物`,大きさ:`持ち物`,形:`持ち物`,色:`持ち物`,模様:`持ち物`,言葉:`持ち物`,絵:`持ち物`,向き:`持ち物`,ほう:`持ち物`,コマの間:`持ち物`,音:`音`,中身:`持ち物`,行:`持ち物`,四角:`形の値`,丸:`形の値`,三角:`形の値`,赤:`色の値`,青:`色の値`,緑:`色の値`,黄:`色の値`,橙:`色の値`,紫:`色の値`,白:`色の値`,黒:`色の値`,灰:`色の値`,筋:`模様の値`,なし:`模様の値`,スペース:`キー`,エンター:`キー`,上キー:`キー`,下キー:`キー`,左キー:`キー`,右キー:`キー`,左:`場所・向き`,右端:`場所・向き`,数:`型`,文字:`型`,右:`場所・向き`,上:`場所・向き`,下:`場所・向き`,横:`場所・向き`,前:`場所・向き`,後ろ:`場所・向き`,画面:`画面`,世界:`画面`,カメラ:`もの`,マウス:`マウス`,今日:`日時`,今:`日時`,整数:`型`,記録:`記録`},tt={今日:[`年`,`月`,`日`,`曜日`],今:[`時`,`分`,`秒`]},nt={幅:{accepts:[`数`],owners:[],forThings:!0},高さ:{accepts:[`数`],owners:[],forThings:!0},大きさ:{accepts:[`数`],owners:[],forThings:!0},形:{accepts:[`形の値`],owners:[],forThings:!0},色:{accepts:[`色の値`],owners:[`背景`],forThings:!0},模様:{accepts:[`模様の値`],owners:[],forThings:!0},言葉:{accepts:[`文字`],owners:[],forThings:!0},コマの間:{accepts:[`数`],owners:[],forThings:!0},向き:{accepts:[`数`],owners:[],forThings:!0},ほう:{accepts:[],owners:[],forThings:!0},絵:{accepts:[`文字`],owners:[`背景`],forThings:!0},中身:{accepts:[`空の配列`],owners:[],forThings:!0},行:{accepts:[],owners:[],forThings:!0}},rt={が:`は`},it={いる:{forms:{言い切り:`いる`,たら:`い`},roles:{は:{role:`主語`,accepts:[`もの`]},に:{role:`場所`,accepts:[`場所・向き`,`位置`]}}},する:{forms:{言い切り:`する`,たら:`し`},roles:{を:{role:`対象`,accepts:[`持ち物`,`名前`,`式`,`画面の大きさ`]},に:{role:`値`,accepts:[`数`,`形の値`,`色の値`,`模様の値`,`文字`,`名前`,`式`,`空の配列`,`真偽`,`空の表`,`位置`]}}},含む:{forms:{言い切り:`含む`,たら:`含ん`},roles:{は:{role:`主語`,accepts:[`文字`,`名前`,`式`,`空の配列`]},を:{role:`対象`,accepts:[`数`,`文字`,`名前`,`式`,`真偽`]}}},置き換える:{forms:{言い切り:`置き換える`,たら:`置き換え`},roles:{から:{role:`出発点`,accepts:[`文字`,`名前`,`式`]},を:{role:`対象`,accepts:[`文字`,`名前`,`式`]},に:{role:`値`,accepts:[`文字`,`名前`,`式`]}}},変える:{forms:{言い切り:`変える`,たら:`変え`},roles:{を:{role:`対象`,accepts:[`数`,`文字`,`名前`,`式`,`真偽`]},に:{role:`値`,accepts:[`型`]}}},返す:{forms:{言い切り:`返す`,たら:`返し`},roles:{を:{role:`対象`,accepts:[`数`,`文字`,`名前`,`式`,`真偽`,`空の配列`,`空の表`]}}},消す:{forms:{言い切り:`消す`,たら:`消し`},roles:{を:{role:`対象`,accepts:[`もの`,`名前`,`式`,`数`,`文字`,`真偽`]},から:{role:`出発点`,accepts:[`名前`]}},optional:[`出発点`]},動かす:{forms:{言い切り:`動かす`,たら:`動かし`},roles:{を:{role:`対象`,accepts:[`もの`,`名前`,`式`]},に:{role:`場所`,accepts:[`場所・向き`,`位置`]},だけ:{role:`量`,accepts:[`数`,`名前`,`式`]}},optional:[`量`]},作る:{forms:{言い切り:`作る`,たら:`作っ`},roles:{を:{role:`対象`,accepts:[`名付け`]}}},入れる:{forms:{言い切り:`入れる`,たら:`入れ`},roles:{に:{role:`相手`,accepts:[`名前`]},を:{role:`対象`,accepts:[`数`,`文字`,`名前`,`式`,`真偽`]}}},表示する:{forms:{言い切り:`表示する`,たら:`表示し`},roles:{を:{role:`対象`,accepts:[`数`,`文字`,`名前`,`式`,`真偽`]}}},流す:{forms:{言い切り:`流す`,たら:`流し`},roles:{を:{role:`対象`,accepts:[`もの`]},に:{role:`向き`,accepts:[`場所・向き`]},だけ:{role:`量`,accepts:[`毎秒の数`]}}},出す:{forms:{言い切り:`出す`,たら:`出し`},roles:{を:{role:`対象`,accepts:[`もの`]},から:{role:`出発点`,accepts:[`場所・向き`,`位置`]}}},かける:{forms:{言い切り:`かける`,たら:`かけ`},roles:{を:{role:`対象`,accepts:[`もの`]},に:{role:`相手`,accepts:[`もの`]},だけ:{role:`量`,accepts:[`数`,`名前`,`式`]}}},乗る:{forms:{言い切り:`乗る`,たら:`乗っ`},roles:{は:{role:`主語`,accepts:[`もの`]},に:{role:`相手`,accepts:[`もの`]}}},押す:{forms:{言い切り:`押す`,たら:`押し`},roles:{を:{role:`対象`,accepts:[`キー`]},で:{role:`場所`,accepts:[`もの`]}},optional:[`場所`]},触れる:{forms:{言い切り:`触れる`,たら:`触れ`},roles:{は:{role:`主語`,accepts:[`もの`]},に:{role:`相手`,accepts:[`もの`]},から:{role:`出発点`,accepts:[`場所・向き`]}},optional:[`出発点`]},"ドラッグ できる":{forms:{言い切り:`ドラッグ できる`,たら:`ドラッグ でき`},roles:{は:{role:`主語`,accepts:[`もの`]}}},ドラッグする:{forms:{言い切り:`ドラッグする`,たら:`ドラッグし`},roles:{を:{role:`対象`,accepts:[`もの`]}}},離す:{forms:{言い切り:`離す`,たら:`離し`},roles:{を:{role:`対象`,accepts:[`もの`]}}},追う:{forms:{言い切り:`追う`,たら:`追っ`},roles:{は:{role:`主語`,accepts:[`もの`]},を:{role:`対象`,accepts:[`もの`]}}},通れない:{forms:{言い切り:`通れない`,たら:`通れなかっ`},roles:{は:{role:`主語`,accepts:[`もの`]},を:{role:`対象`,accepts:[`もの`]}}},よける:{forms:{言い切り:`よける`,たら:`よけ`},roles:{は:{role:`主語`,accepts:[`もの`]},を:{role:`対象`,accepts:[`もの`]}}},出る:{forms:{言い切り:`出る`,たら:`出`},roles:{は:{role:`主語`,accepts:[`もの`]},から:{role:`出発点`,accepts:[`画面`]}}},クリックする:{forms:{言い切り:`クリックする`,たら:`クリックし`},roles:{を:{role:`対象`,accepts:[`画面`,`もの`,`持ち物`]}}},"ジャンプ させる":{forms:{言い切り:`ジャンプ させる`,たら:`ジャンプ させ`},roles:{を:{role:`対象`,accepts:[`もの`]},だけ:{role:`量`,accepts:[`数`,`名前`,`式`]},まで:{role:`上限`,accepts:[`回数`]}},optional:[`量`,`上限`]},書く:{forms:{言い切り:`書く`,たら:`書い`},roles:{を:{role:`対象`,accepts:[`文字`,`数`,`名前`,`式`,`真偽`]},に:{role:`場所`,accepts:[`位置`]},だけ:{role:`量`,accepts:[`秒数`]},で:{role:`値`,accepts:[`色の値`,`文字の大きさ`]}},optional:[`場所`,`量`,`値`],repeatable:[`で`]},終わる:{forms:{言い切り:`終わる`,たら:`終わっ`},roles:{は:{role:`主語`,accepts:[`もの`]}}},始める:{forms:{言い切り:`始める`,たら:`始め`},roles:{を:{role:`対象`,accepts:[`もの`,`場面`]}}},回す:{forms:{言い切り:`回す`,たら:`回し`},roles:{を:{role:`対象`,accepts:[`もの`,`名前`,`式`]},に:{role:`向き`,accepts:[`場所・向き`]},だけ:{role:`量`,accepts:[`数`,`名前`,`式`]}}},向ける:{forms:{言い切り:`向ける`,たら:`向け`},roles:{を:{role:`対象`,accepts:[`もの`,`名前`,`式`]},に:{role:`向き`,accepts:[`持ち物`,`数`,`名前`,`式`]}}},たつ:{forms:{言い切り:`たつ`,たら:`たっ`},roles:{}},鳴らす:{forms:{言い切り:`鳴らす`,たら:`鳴らし`},roles:{を:{role:`対象`,accepts:[`文字`,`名前`,`式`]}}},"何度も 鳴らす":{forms:{言い切り:`何度も 鳴らす`,たら:`何度も 鳴らし`},roles:{を:{role:`対象`,accepts:[`文字`,`名前`,`式`]}}},止める:{forms:{言い切り:`止める`,たら:`止め`},roles:{を:{role:`対象`,accepts:[`音`]}}},切り替える:{forms:{言い切り:`切り替える`,たら:`切り替え`},roles:{に:{role:`相手`,accepts:[`場面`]}}},終わらせる:{forms:{言い切り:`終わらせる`,たら:`終わらせ`},roles:{を:{role:`対象`,accepts:[`もの`]}}}},at=[`含む`,`置き換える`,`変える`],ot={words:et,properties:nt,verbs:it},st=[`主語`,`対象`,`相手`,`場所`,`数量`,`動作`],ct={words:{...Object.fromEntries(st.map(e=>[e,`もの`])),テーマ:`テーマ`,...Object.fromEntries(Ue.map(e=>[e,`テーマの値`])),背景:`もの`,文字:`もの`,音楽:`もの`,効果音:`もの`,色:`持ち物`,大きさ:`持ち物`,音量:`持ち物`,...Object.fromEntries([`赤`,`青`,`緑`,`黄`,`橙`,`紫`,`白`,`黒`,`灰`].map(e=>[e,`色の値`])),サイドバー:`部品`,パネル:`部品`,実行プレビュー:`部品`,ステータスバー:`部品`},properties:{色:{accepts:[`色の値`],owners:[...st,`背景`]},大きさ:{accepts:[`数`],owners:[`文字`]},音量:{accepts:[`数`],owners:[`音楽`,`効果音`]}},verbs:{する:{forms:{言い切り:`する`,たら:`し`},roles:{を:{role:`対象`,accepts:[`持ち物`,`テーマ`]},に:{role:`値`,accepts:[`数`,`色の値`,`テーマの値`]}}},隠す:{forms:{言い切り:`隠す`,たら:`隠し`},roles:{を:{role:`対象`,accepts:[`部品`]}}}}},lt=[`左`,`右`,`上`,`下`],ut=`画面`,dt=`世界`,ft=[ut,dt];function pt(e){let{owner:t,property:n}=e;return t.kind===`語`&&t.tokens.length===1&&ft.includes(t.tokens[0].text)&&n.kind===`語`&&n.tokens.length===1&&n.tokens[0].text===`大きさ`}function mt(e){let{owner:t,property:n}=e;if(t.kind!==`語`||t.tokens.length!==1||!ft.includes(t.tokens[0].text)||pt(e))return null;let r=n.kind===`語`&&n.tokens.length===1?n.tokens[0].text:``;if(!lt.includes(r))throw new E(`「${ut} の」の後には、向き（${lt.join(`・`)}）か「大きさ」を書きます。`,n.start,n.end);return r}var ht=`表`,gt={真:!0,偽:!1},_t=`空`,E=class extends Error{start;end;constructor(e,t,n){super(e),this.start=t,this.end=n}},vt=class extends E{all;constructor(e){super(e[0].message,e[0].start,e[0].end),this.all=e}};function yt(e,t,n=ot){let r=e.map(e=>e.text).join(` `),i=e[0].start,a=e[e.length-1].end;for(let[e,i]of Object.entries(n.verbs))if(i.forms[t]===r)return e;let o=t===`たら`?`言い切り`:`たら`;for(let e of Object.values(n.verbs))if(e.forms[o]===r){let n=t===`たら`?`${e.forms.たら}たら`:e.forms.言い切り;throw new E(`「${t===`たら`?`${r}たら`:r}」ではなく、「${n}」と書きます。`,i,a)}throw new E(`「${r}」は、動詞の表にありません。`,i,a)}function bt(e){return e.kind===`語`?e.tokens.map(e=>e.text).join(` `):e.kind===`並び`?e.items.map(bt).join(` と `):e.kind===`混ざり`?e.items.map((t,n)=>(n===0?``:` ${e.connectors[n-1].text} `)+bt(t)).join(``):e.kind===`式`?w(e.expr):e.kind===`毎秒`?`毎秒 ${w(e.expr)}`:e.kind===`位置の式`?[e.x?`横 ${w(e.x)}`:``,e.y?`縦 ${w(e.y)}`:``].join(` `).trim():`${bt(e.owner)} の ${bt(e.property)}`}function xt(e,t,n){let r=e.start,i=n.end;return t.text===`と`?{kind:`並び`,items:[e,n].flatMap(e=>e.kind===`並び`?e.items:[e]),start:r,end:i}:{kind:`持ち物`,owner:e,property:n,start:r,end:i}}function St(e,t,n,r){if(n===r)return[e[n]];let i=[];for(let a=n;a<r;a++)for(let o of St(e,t,n,a))for(let n of St(e,t,a+1,r))i.push(xt(o,t[a],n));return i}function Ct(e){return e.kind===`並び`?`(${e.items.map(Ct).join(` と `)})`:e.kind===`持ち物`?`(${Ct(e.owner)} の ${Ct(e.property)})`:bt(e)}function wt(e,t=ot){if(e.kind!==`混ざり`)return e;let n=St(e.items,e.connectors,0,e.items.length-1),r=[...new Map(n.map(e=>[Ct(e),e])).values()].filter(e=>{try{return Rt(e,t),!0}catch(e){if(e instanceof E)return!1;throw e}});if(r.length===1)return r[0];let i=bt(e);throw r.length===0?new E(`「${i}」の読み方が分かりません。「の」の前にはもの、後には持ち物を書き、「と」では同じ種類のものを並べます。`,e.start,e.end):new E(`「${i}」は、何通りにも読めます。文を分けて書いてください。`,e.start,e.end)}function Tt(e,t){return e.kind===`語`&&e.text!==_t&&e.text!==ht&&!(e.text in gt)&&!t.words[T(e.text)]}var Et=`その`,Dt=`行`;function Ot(e){return e.length===2&&e[0].text===Et&&T(e[1].text)===Dt}function kt(e,t){return e.length===2&&e[0].text===Et&&t.words[T(e[1].text)]===`もの`}function At(e,t){if(e.kind===`語`)return kt(e.tokens,t)?`その`:e.tokens.length===1&&Tt(e.tokens[0],t)?`名前`:void 0}var jt=`という`;function Mt(e){return e.length===3&&e[0].kind===`語`&&e[1].text===jt&&e[2].kind===`語`}var Nt=[`数`,`文字`,`名前`,`式`,`空の配列`,`真偽`,`空の表`];function Pt(e,t){if(e.kind===`数`){if(e.unit===null)return`数`;if(e.unit===`回`)return`回数`;if(e.unit===`秒`)return`秒数`;throw new E(`「${e.unit}」という単位はありません。単位は「秒」と「回」です。`,e.start,e.end)}if(e.kind===`色`)return`色の値`;if(e.kind===`文字`)return`文字`;if(e.kind===`項目`)throw new E(`項目は「成績 の ${e.text}」のように、記録の名前と一緒に書きます。`,e.start,e.end);let n=t.words[T(e.text)];if(!n)throw new E(`「${e.text}」は、言葉の表にありません。`,e.start,e.end);return n}function Ft(e){return e.kind===`語`?e.tokens:e.kind===`並び`?e.items.flatMap(Ft):[]}var It=[`横`,`縦`];function Lt(e){if(e.length<=1||!It.includes(e[0].text))return null;let t=e[0].start,n=e[e.length-1].end;if(e.length!==2&&e.length!==4)throw new E(`位置は「横 100 縦 300」か「横 100」のように書きます。`,t,n);let r={};for(let i=0;i<e.length;i+=2){let a=e[i],o=e[i+1];if(!It.includes(a.text)||r[a.text]!==void 0)throw new E(`位置は「横 100 縦 300」か「横 100」のように書きます。`,t,n);if(o.kind!==`数`||o.unit!==null)throw new E(`「${a.text}」の後には、単位のない数を書きます。`,o.start,o.end);r[a.text]=o.value}if(r.横===void 0)throw new E(`位置には「横」も書きます（横 100 縦 300）。縦は省けますが、横は省けません。`,t,n);return{x:r.横,y:r.縦??null}}function Rt(e,t=ot){if(e.kind===`混ざり`)return Rt(wt(e,t),t);if(e.kind===`並び`){let n=e.items.map(e=>Rt(e,t)),r=n.findIndex(e=>e!==n[0]);if(r!==-1&&n.every(e=>Nt.includes(e)))return`式`;if(r!==-1)throw new E(`「と」で並べるものは、同じ種類にします。「${bt(e.items[0])}」は${n[0]}、「${bt(e.items[r])}」は${n[r]}です。`,e.start,e.end);return n[0]}if(e.kind===`持ち物`){if(pt(e))return`画面の大きさ`;if(mt(e))return`画面`;let n=At(e.owner,t);if(n===`名前`){let{property:n}=e;if(n.kind!==`語`||n.tokens.length!==1||Pt(n.tokens[0],t)!==`持ち物`)throw new E(`「の」の後には、持ち物（大きさ、色など）を書きます。`,n.start,n.end);return`持ち物`}if(Rt(e.owner,t)!==`もの`)throw new E(`「の」の前には、もの（主人公、障害物など）を書きます。`,e.owner.start,e.owner.end);let{property:r}=e;if(r.kind!==`語`||r.tokens.length!==1||Pt(r.tokens[0],t)!==`持ち物`)throw new E(`「の」の後には、持ち物（大きさ、色など）を書きます。`,r.start,r.end);let i=r.tokens[0].text;for(let r of n===`その`?Ft(e.owner).slice(1):Ft(e.owner))if(!t.properties[i].owners.includes(r.text))throw new E(`「${r.text}」は、「${i}」を持っていません。`,e.start,e.end);return`持ち物`}if(e.kind===`式`)return`式`;if(e.kind===`毎秒`)return`毎秒の数`;if(e.kind===`位置の式`){if(!e.x)throw new E(`位置には「横」も書きます（横 100 縦 300）。縦は省けますが、横は省けません。`,e.start,e.end);return`位置`}let{tokens:n}=e;if(Lt(n))return`位置`;if(n.length===1&&Tt(n[0],t))return`名前`;if(n.length===1&&n[0].kind===`語`&&n[0].text===_t)return`空の配列`;if(n.length===1&&n[0].kind===`語`&&n[0].text in gt)return`真偽`;if(n.length===1&&n[0].kind===`語`&&n[0].text===ht)return`空の表`;if(Mt(n))return`名付け`;if(n.length===1){let r=Pt(n[0],t);if(r===`持ち物`){let t=n[0].text;throw new E(`「${t}」は持ち物です。「主人公 の ${t}」のように、どのものの持ち物かを書きます。`,e.start,e.end)}return r}if(kt(n,t))return`もの`;let[r,i]=n;if(n.length===2&&r.text===`毎秒`&&i.kind===`数`&&i.unit===null)return`毎秒の数`;if(n.length===2&&r.text===`大きさ`&&i.kind===`数`&&i.unit===null)return`文字の大きさ`;throw new E(`「${bt(e)}」は、1つの言葉として読み取れません。`,e.start,e.end)}function zt(e,t=ot){if(e.kind===`混ざり`)return zt(wt(e,t),t);if(e.kind===`並び`)return e.items.flatMap(e=>zt(e,t));let{start:n,end:r}=e;if(e.kind===`持ち物`){let i=e.owner.kind===`語`&&e.owner.tokens[0]?.text===dt;if(pt(e))return[{kind:`画面の大きさ`,world:i,start:n,end:r}];let a=mt(e);if(a)return[{kind:`画面`,side:a,world:i,start:n,end:r}];let o=At(e.owner,t),s=Ft(e.owner).map(e=>T(e.text));return o?[{kind:`持ち物`,owners:s.slice(-1),property:bt(e.property),pick:o,start:n,end:r}]:[{kind:`持ち物`,owners:Ft(e.owner).map(e=>e.text),property:bt(e.property),start:n,end:r}]}if(e.kind===`式`)return[{kind:`式`,expr:e.expr,start:n,end:r}];if(e.kind===`毎秒`)return[{kind:`毎秒の式`,expr:e.expr,start:n,end:r}];if(e.kind===`位置の式`){if(!e.x)throw new E(`位置には「横」も書きます（横 100 縦 300）。縦は省けますが、横は省けません。`,n,r);return[{kind:`位置の式`,x:e.x,y:e.y,start:n,end:r}]}let{tokens:i}=e,a=Lt(i);if(a)return[{kind:`位置`,...a,start:n,end:r}];if(i.length===1&&Tt(i[0],t))return[{kind:`名前`,name:T(i[0].text),start:n,end:r}];if(i.length===1&&i[0].kind===`語`&&i[0].text===_t)return[{kind:`空`,start:n,end:r}];if(i.length===1&&i[0].kind===`語`&&i[0].text in gt)return[{kind:`真偽`,value:gt[i[0].text],start:n,end:r}];if(i.length===1&&i[0].kind===`語`&&i[0].text===ht)return[{kind:`表`,start:n,end:r}];if(Mt(i))return[{kind:`名付け`,name:T(i[0].text),base:T(i[2].text),start:n,end:r}];if(kt(i,t))return[{kind:`もの`,name:T(i[1].text),start:n,end:r,that:!0}];if(i.length===2){let e=i[1];if(e.kind===`数`&&i[0].text===`大きさ`)return[{kind:`文字の大きさ`,number:e.value,start:n,end:r}];if(e.kind===`数`)return[{kind:`毎秒の数`,number:e.value,start:n,end:r}]}let o=i[0];if(o.kind===`数`)return[{kind:Pt(o,t),number:o.value,start:n,end:r}];if(o.kind===`色`)return[{kind:`色の値`,name:o.value,start:n,end:r}];if(o.kind===`文字`)return[{kind:`文字`,text:o.value,start:n,end:r}];let s=T(o.text);return t.words[s]===`画面`?[{kind:`画面`,side:null,world:s===dt,start:n,end:r}]:[{kind:t.words[s],name:s,start:n,end:r}]}function Bt(e,t,n,r){let i=yt(t,n,r),a=r.verbs[i],o={};for(let t of e){let e={...t,words:wt(t.words,r)},n=e.particle.text,s=rt[n]??n,c=a.roles[s];if(!c)throw new E(`「${i}」には、「${n}」の組を付けられません。`,e.start,e.end);let{role:l,accepts:u}=c,d=o[l]!==void 0&&(a.repeatable?.includes(s)??!1);if(o[l]&&!d)throw new E(`「${n}」の組は、1つの文に1つまでです。いくつも書くときは「と」で並べます。`,e.start,e.end);let{words:f}=e,p=f.kind===`語`&&Ot(f.tokens);if(f.kind===`語`&&(p||kt(f.tokens,r)&&!u.includes(`もの`))&&u.includes(`式`)){let[t,n]=f.tokens;e.words={kind:`式`,expr:{kind:`その`,thing:n,start:t.start,end:n.end},start:f.start,end:f.end}}let m=Rt(e.words,r);if(m===`場所・向き`&&bt(e.words)===`横`&&i!==`触れる`)throw new E(`位置は「横 100 縦 300」か「横 100」のように書きます。`,e.words.start,e.words.end);if(m===`名前`&&!u.includes(m))throw new E(`「${bt(e.words)}」は、言葉の表にありません。`,e.words.start,e.words.end);if(!u.includes(m))throw new E(`「${i}」の${l}（〜 ${n}）には、${u.join(`か`)}を書きます。「${bt(e.words)}」は${m}です。`,e.words.start,e.words.end);let h=zt(e.words,r),g=o[l];if(g&&d){let t=g.values.map(e=>e.kind),r=h.find(e=>t.includes(e.kind));if(r)throw new E(`「${n}」で添える${r.kind===`色の値`?`色`:`大きさ`}は、1つまでです。`,e.start,e.end);o[l]={phrase:g.phrase,values:[...g.values,...h],more:[...g.more??[],e]}}else o[l]={phrase:e,values:h}}let s=o.対象?.phrase.words,c=o.値?.phrase,l=s?.kind===`持ち物`&&pt(s);if(i===`する`&&c&&!l&&[`位置`,`位置の式`].includes(Rt(c.words,r)))throw new E(`「横 〜 縦 〜」を「する」に書けるのは、画面の大きさだけです（${wn}）。`,c.words.start,c.words.end);if(s?.kind===`持ち物`&&c&&!l){let e=bt(s.property);if(r.properties[e]?.accepts.length===0)throw new E(`「${e}」は、読んだり変えたりできません。「買い物 の 行 を クリックしたら」のように使います。`,s.start,s.end);let t=Rt(c.words,r);if(!(t===`名前`||t===`式`||t===`文字`&&!r.properties[e].accepts.includes(`数`))&&!r.properties[e].accepts.includes(t))throw new E(`「${e}」には、${r.properties[e].accepts.join(`か`)}を書きます。「${bt(c.words)}」は${t}です。`,c.words.start,c.words.end)}let u=e.length>0?e[0].start:t[0].start,d=t[t.length-1].end;for(let[e,{role:t}]of Object.entries(a.roles))if(!o[t]&&!a.optional?.includes(t))throw new E(`「${i}」の文には、「〜 ${e}」（${t}）が要ります。`,u,d);return{verb:i,roles:o,start:u,end:d}}function Vt(e){let{every:t,condition:n}=e;if(!t)return;if(n)throw new E(`「N秒 ごと に」は、条件の文（〜たら、〜 ごと に）には付けられません。条件のない文に書きます。`,t.start,t.end);let{count:r}=t;if(r.unit===`回`)throw new E(`「${r.text} ごと に」とは書けません。回数で繰り返すときは、「スペース を ${r.text} 押す ごと に」のように条件に書きます。`,t.start,t.end);if(r.unit!==`秒`||r.value<=0)throw new E(`「ごと に」の前には、「2秒」のように0より大きい秒数を書きます。`,t.start,t.end)}var Ht={"+":`+`,"-":`-`,"*":`×`,"/":`÷`,"%":`%`,"<":`<`,">":`>`,"<=":`<=`,">=":`>=`,"=":`=`,"!=":`!=`,かつ:`かつ`,または:`または`};function D(e,t,n){if(e.kind===`番目`||e.kind===`個数`||e.kind===`範囲`){let r=e.kind===`個数`?e.word===`文字数`:e.unit===`文字目`,i=D(e.list,t,n),a=w(e.list);if(i===`ものの並び`){if(r||e.kind===`範囲`)throw new E(`「${a}」は画面のものの並びです。「の 1番目」「の 個数」で書きます。`,e.start,e.end);if(e.kind===`個数`)return`数`;let i=D(e.index,t,n);if(i!==`数`&&i!==`不明`)throw new E(`何番目かは、数で書きます。`,e.index.start,e.index.end);return`もの1つ`}if(r&&i===`配列`)throw new E(`「${a}」は配列です。配列は「1番目」「個数」で書きます。`,e.start,e.end);if(!r&&i===`文字`)throw new E(`「${a}」は文字です。文字は「1文字目」「文字数」で書きます。`,e.start,e.end);if(i!==(r?`文字`:`配列`)&&i!==`不明`&&(e.kind!==`個数`||i!==`表`))throw new E(`「${a}」は${r?`文字`:`配列`}ではありません。`,e.list.start,e.list.end);if(e.kind===`個数`)return`数`;for(let r of e.kind===`範囲`?[e.from,e.to]:[e.index]){let e=D(r,t,n);if(e!==`数`&&e!==`不明`)throw new E(`何番目かは、数で書きます。`,r.start,r.end)}return e.kind===`範囲`?r?`文字`:`配列`:r?`文字`:`不明`}if(e.kind===`計算`){let r=D(e.left,t,n),i=D(e.right,t,n),a=Ht[e.op];if(e.op===`かつ`||e.op===`または`){if(!Ut(r)||!Ut(i))throw new E(`「${a}」の前後には、比べる式（体力 > 0 など）を書きます。`,e.start,e.end);return`真偽`}if(r===`なし`||i===`なし`){if(e.op===`=`||e.op===`!=`)return`真偽`;throw new E(`「なし」は、何も入っていないことを表す値です。「=」と「!=」で比べるだけに使います。`,e.start,e.end)}let o=r===`ものの並び`?e.left:i===`ものの並び`?e.right:null;if(o)throw new E(`「${w(o)}」は画面のものなので、計算や比べるのに使えません。値は「${w(o)} の 横」「${w(o)} の 個数」のように読みます。`,e.start,e.end);if(r===`配列`||i===`配列`)throw new E(`配列は、計算や比べるのに使えません。中身は「〜 の 1番目」のように取り出して使います。`,e.start,e.end);if((r===`もの1つ`||i===`もの1つ`)&&e.op!==`=`&&e.op!==`!=`)throw new E(`ものは、計算に使えません。「${a}」の前後には、数か文字を書きます。`,e.start,e.end);let s=r!==`不明`&&i!==`不明`;if(e.op===`=`||e.op===`!=`){if(s&&r!==i)throw new E(`「${a}」で比べられるのは、数どうし、文字どうし、真偽どうしです。`,e.start,e.end);return`真偽`}if(e.op===`<`||e.op===`>`||e.op===`<=`||e.op===`>=`){if(r===`文字`||i===`文字`||r===`真偽`||i===`真偽`)throw new E(`「${a}」で比べられるのは、数どうしだけです。`,e.start,e.end);return`真偽`}if(r===`真偽`||i===`真偽`)throw new E(`比べた結果は、計算に使えません。`,e.start,e.end);if(e.op===`+`)return r===`文字`||i===`文字`?`文字`:s?`数`:`不明`;if(r===`文字`||i===`文字`)throw new E(`文字に「${a}」は使えません。文字に使える記号は「+」（つなぐ）だけです。`,e.start,e.end);return`数`}if(e.kind===`乱数`){for(let r of[e.min,e.max]){let e=D(r,t,n);if(e!==`数`&&e!==`不明`)throw new E(`乱数の範囲は、数で書きます（1〜6 の 乱数）。`,r.start,r.end)}return`数`}if(e.kind===`項目`)return vn(e,t,n)?.type??`不明`;if(e.kind===`道具`){let r=D(e.target,t,n);if(r!==`数`&&r!==`不明`)throw new E(`「${e.tool}」は、数に使います。「${w(e.target)}」は${r}です。`,e.target.start,e.target.end);return`数`}if(e.kind===`距離`){for(let r of[e.a,e.b]){let e=D(r,t,n);if(e!==`ものの並び`&&e!==`もの1つ`&&e!==`不明`)throw new E(`「距離」は、ものどうしで測ります。「${w(r)}」は${e}です。`,r.start,r.end)}return`数`}if(e.kind===`その`)return T(e.thing.text)===Dt?`不明`:(yn(e.thing,n),`もの1つ`);if(e.kind===`見出し`){let r=D(e.table,t,n);if(r!==`表`&&r!==`不明`)throw new E(`「${w(e.table)}」は表ではありません。`,e.table.start,e.table.end);let i=D(e.key,t,n);if(i!==`文字`&&i!==`数`&&i!==`不明`)throw new E(`表の見出しには、文字か数を書きます。`,e.key.start,e.key.end);return`不明`}if(e.kind===`呼ぶ`){let{sentence:r}=e,i=Bt(r.phrases,r.verb,`言い切り`,n);if(!at.includes(i.verb)&&!n.userVerbs?.includes(i.verb))throw new E(`式の中で呼べるのは、自分で作った動詞と、含む・置き換える・変える です。「${i.verb}」は呼べません。`,e.start,e.end);if(Zt(i,t,n),e.checked=i,i.verb===`含む`)return`真偽`;if(i.verb===`置き換える`)return`文字`;if(i.verb===`変える`){let[e]=i.roles.値?.values??[];return e?.kind===`型`&&(e.name===`数`||e.name===`整数`)?`数`:`文字`}return`不明`}if(e.kind===`でない`){if(!Ut(D(e.expr,t,n)))throw new E(`「でない」の前には、真偽（比べる式や、真偽の名前）を書きます。`,e.expr.start,e.expr.end);return`真偽`}if(e.kind===`様子`){let{thing:r}=e,i=r.kind===`項`?T(r.token.text):null;if(i!==null&&n.words[i]===`日時`){let t=tt[i]??[];if(!t.includes(e.property))throw new E(`「${i} の」の後には、${t.join(`・`)} のどれかを書きます。`,e.start,e.end);return e.property===`曜日`?`文字`:`数`}if(i!==null&&n.words[i]===`マウス`){if(e.property!==`横`&&e.property!==`縦`)throw new E(`「${i}」で読めるのは、横 と 縦 です。`,e.start,e.end);return`数`}let a=e.property===`言葉`?`文字`:`数`;if(i!==null&&n.words[i]===`もの`&&!on.includes(i))return a;if(r.kind!==`項`||Tt(r.token,n)){let e=D(r,t,n);if(e===`もの1つ`||e===`不明`)return a}throw new E(`「${w(r)}」は、画面のもの（主人公、障害物 など）ではありません。`,r.start,r.end)}if(e.kind===`押している`){let{key:t}=e,r=t.kind===`項`?T(t.token.text):null;if(r===null||n.words[r]!==`キー`&&n.words[r]!==`マウス`)throw new E(`「${w(t)}」は、キー（スペース、右キー など）かマウスではありません。`,t.start,t.end);return`真偽`}if(e.kind===`どれか`){let r=D(e.list,t,n);if(r===`ものの並び`)return`もの1つ`;if(r!==`配列`&&r!==`不明`)throw new E(`「${w(e.list)}」は配列ではありません。「の どれか」は配列に使います。`,e.list.start,e.list.end);return`不明`}let{token:r}=e;if(r.kind===`数`){if(r.unit!==null)throw new E(`「${r.text}」のような単位の付いた数は、計算や値を覚えるのに使えません。`,r.start,r.end);return`数`}if(r.kind===`文字`)return`文字`;if(r.kind===`語`&&r.text in gt)return`真偽`;if(r.kind===`語`&&T(r.text)===`なし`)return`なし`;if(Tt(r,n))return Wt(T(r.text),t,r.start,r.end);if(r.kind===`語`&&n.words[T(r.text)]===`もの`&&!on.includes(T(r.text)))return`ものの並び`;throw new E(`「${r.text}」は、計算や値を覚えるのに使えません。使えるのは、数、文字、作った名前です。`,r.start,r.end)}function Ut(e){return e===`真偽`||e===`不明`}function Wt(e,t,n,r){let i=t.get(e);if(!i){let t=qt(e);throw new E(`「${e}」は、まだ作っていません。${t?`色の言葉なら「${t}」と書きます。`:`先に「${e} を 〜 に する。」で作ります。`}`,n,r)}return i}var Gt=[`赤`,`青`,`緑`,`黄`,`橙`,`紫`,`白`,`黒`,`灰`],Kt={グレー:`灰`,グレイ:`灰`,ねずみ色:`灰`,オレンジ:`橙`,だいだい:`橙`,黄色い:`黄`,赤い:`赤`,青い:`青`,白い:`白`,黒い:`黒`,レッド:`赤`,ブルー:`青`,グリーン:`緑`,イエロー:`黄`,パープル:`紫`,ホワイト:`白`,ブラック:`黒`};function qt(e){let t=e.endsWith(`色`)?e.slice(0,-1):e;return Gt.includes(t)?t:Kt[e]??Kt[t]??null}function Jt(e,t,n){switch(e.kind){case`数`:return`数`;case`文字`:return`文字`;case`名前`:return Wt(e.name,t,e.start,e.end);case`式`:{let r=D(e.expr,t,n);if(r===`ものの並び`)throw new E(`「${w(e.expr)}」は画面のものの並びなので、ここには書けません。「の 1番目」「の 個数」で取り出すか、1つずつ繰り返します。`,e.start,e.end);return r===`なし`?`不明`:r}case`真偽`:return`真偽`;case`表`:return`表`;case`空`:return`配列`;case`毎秒の式`:return D(e.expr,t,n),null;case`位置の式`:for(let r of[e.x,e.y])if(r){let e=D(r,t,n);if(e!==`数`&&e!==`不明`)throw new E(`位置には数を書きます。「${w(r)}」は${e}です。`,r.start,r.end)}return null;default:return null}}var Yt=[`する`,`ジャンプ させる`,`かける`,`流す`,`動かす`,`回す`];function Xt(e,t,n){let r=Jt(e,t,n);if(!r)throw new E(`配列の中身には、数か文字（「」で囲む）を書きます。`,e.start,e.end);if(r===`配列`||r===`表`)throw new E(`配列や表の中に、${r}は入れられません。`,e.start,e.end);if(r===`もの1つ`)throw new E(`配列や表の中に、ものは今は入れられません。`,e.start,e.end)}function Zt(e,t,n){let r=e.roles.対象?.values,i=e.verb===`する`&&r?.length===1&&r[0].kind===`名前`?r[0]:null;if(e.verb===`する`&&r?.length===1&&r[0].kind===`式`&&r[0].expr.kind===`項目`){let i=r[0].expr.field,a=vn(r[0].expr,t,n)?.type??`不明`,o=e.roles.値?.values??[],s=o.length>=2?_n(o,t,n):Jt(o[0],t,n);if(s===`もの1つ`){let t=e.roles.値?.phrase??e;throw new E(`項目には、ものは入れられません。`,t.start,t.end)}if(s!==null&&s!==`不明`&&a!==`不明`&&s!==a){let t=e.roles.値?.phrase.words,n=t??e;throw new E(`${i.text} には、${a}を入れます。「${t?bt(t):``}」は${s}です。`,n.start,n.end)}return}if(e.verb===`する`&&r?.length===1&&r[0].kind===`式`){let[i]=r;if(i.kind===`式`&&i.expr.kind===`番目`&&i.expr.unit===`文字目`)throw new E(`文字の一部は書き換えられません。新しい文字を作って、名前に入れ直します。`,i.start,i.end);if(!(i.kind===`式`&&(i.expr.kind===`番目`&&i.expr.list.kind===`項`||i.expr.kind===`見出し`&&i.expr.table.kind===`項`)))throw new E(`「を」には、名前か「〜 の 1番目」か「〜 の 「見出し」」を書きます。`,i.start,i.end);D(i.expr,t,n);let a=e.roles.値?.values??[];if(a.length!==1){let t=e.roles.値?.phrase??e;throw new E(`書き換えるときは、値を1つだけ書きます。`,t.start,t.end)}Xt(a[0],t,n);return}if(e.verb===`消す`&&e.roles.出発点){let[r]=e.roles.出発点.values;if(r?.kind===`名前`){let e=Wt(r.name,t,r.start,r.end);if(e!==`配列`&&e!==`不明`)throw new E(`「${r.name}」は配列ではありません。「から 〜 を 消す」は配列に使います。`,r.start,r.end)}for(let r of e.roles.対象?.values??[])Xt(r,t,n);return}if(e.verb===`消す`){let t=(e.roles.対象?.values??[]).find(e=>e.kind===`数`||e.kind===`文字`||e.kind===`真偽`);if(t)throw new E(`配列から消すときは、「品物 から 「牛乳」 を 消す。」のように「から」で配列を書きます。`,t.start,t.end)}if(e.verb===`入れる`){let[r]=e.roles.相手?.values??[],i=e.roles.対象?.values??[];if(r?.kind===`名前`){let e=t.get(r.name);if(e===void 0)t.set(r.name,`配列`);else if(e!==`配列`&&e!==`不明`)throw new E(`「${r.name}」は配列ではありません。`,r.start,r.end)}for(let e of i)Xt(e,t,n);return}for(let r of Object.values(e.roles))for(let e of r?.values??[])e!==i&&Jt(e,t,n);let a=[`動かす`,`消す`,`回す`,`向ける`].includes(e.verb)?r??[]:[];for(let e of a)if(e.kind===`名前`||e.kind===`式`){let r=Jt(e,t,n);if(r!==`もの1つ`&&r!==`不明`)throw new E(`「${e.kind===`名前`?e.name:w(e.expr)}」は${r}です。ここには、もの（敵、その 敵、1つを入れた名前）を書きます。`,e.start,e.end)}let o=r?.[0]?.kind===`持ち物`&&r[0].pick===`名前`?r[0]:null;if(o){let e=Wt(o.owners[0],t,o.start,o.end);if(e!==`もの1つ`&&e!==`不明`)throw new E(`「${o.owners[0]}」は${e}です。「の」の前には、もの（主人公、障害物など）を書きます。`,o.start,o.end)}let s=r?.[0]?.kind===`持ち物`?r[0].property:null,c=s===`中身`?`配列`:e.verb===`する`&&s!==null&&!n.properties[s]?.accepts.includes(`数`)?`文字`:`数`;if(!i&&Yt.includes(e.verb)){for(let r of Object.values(e.roles))if(e.verb!==`動かす`&&e.verb!==`回す`||r!==e.roles.対象)for(let e of r?.values??[]){if(e.kind!==`名前`&&e.kind!==`式`&&e.kind!==`毎秒の式`)continue;let r=e.kind===`毎秒の式`?D(e.expr,t,n):Jt(e,t,n);if(r!==c&&r!==`不明`&&(s!==`絵`||r!==`配列`))throw new E(`ここには${c}を書きます。「${e.kind===`名前`?e.name:`この式`}」は${r}です。`,e.start,e.end)}}if(!i)return;let l=e.roles.値?.values??[];if(l.length>=2)for(let e of l)Xt(e,t,n);if(l.length===1&&l[0].kind===`模様の値`&&l[0].name===`なし`){t.has(i.name)||t.set(i.name,`不明`);return}let u=l.length>=2?`配列`:Jt(l[0],t,n);if(!u)throw new E(`値を覚えるときは、数か文字（「」で囲む）を書きます。`,l[0].start,l[0].end);let d=t.get(i.name);if(d&&d!==`不明`&&u!==`不明`&&d!==u)throw new E(`「${i.name}」は${d}です。${d}を入れます（値の種類は、最初に入れた値で決まります）。`,l[0].start,l[0].end);d&&d!==`不明`||t.set(i.name,u)}function Qt(e,t,n,r){if(e.kind!==`なら`&&(t===null||t.kind===`そうでなければ`))throw new E(`「${e.kind}」は、「〜 なら、」の文のすぐ後に書きます。`,e.marks[0].start,e.marks[0].end);if(e.kind!==`そうでなければ`&&!Ut(D(e.test,n,r)))throw new E(`「なら」の前には、比べる式（体力 > 0 など）を書きます。`,e.test.start,e.test.end)}function $t(e=ot,t=new Map){let n=null;return{checkOne(r){let i=n;n=null;let a=kn(r,t,i,e);return n=r.branch,a}}}function en(e,t,n){let r=$t(n,t);return e.map(e=>r.checkOne(e))}var tn={は:`主語`,を:`対象`,に:`相手`,から:`出発点`,だけ:`量`,まで:`上限`,で:`場所`};function nn(e){return rt[e.text]??e.text}function rn(e){return tn[nn(e)]}function an(e,t){let n={...t.verbs};for(let r of e){let{define:e}=r;if(!e)continue;let i=T(e.name.text),{start:a,end:o}=e.name;if(t.verbs[i]||t.words[i])throw new E(`「${i}」は、もとからある言葉なので、動詞として作れません。`,a,o);if(n[i])throw new E(`「${i}」は、もう作ってあります。同じ名前の動詞は1つだけです。`,a,o);let s={};for(let t of e.params){let e=nn(t.particle);s[e]={role:tn[e],accepts:[`数`,`文字`,`名前`,`式`,`真偽`,`空の配列`]}}n[i]={forms:{言い切り:i,たら:`${i}（たらの形はない）`},roles:s}}let r=e.flatMap(e=>e.define?[T(e.define.name.text)]:[]);return{...t,verbs:n,userVerbs:[...t.userVerbs??[],...r]}}var on=[`ゲーム`,`重力`,`背景`,`カメラ`];function sn(e,t){if(!t.verbs.作る)return t;let n=[];for(let t of e){if(t.verb.length!==1||t.verb[0].text!==`作る`||t.condition||t.branch||un(t)||fn(t))continue;let e=t.phrases.find(e=>e.particle.text===`を`)?.words;e?.kind===`語`&&Mt(e.tokens)&&n.push({name:e.tokens[0],base:e.tokens[2]})}let r={...t.words},i=new Map;for(let{name:e,base:a}of n){let n=T(e.text);if(t.words[n]||t.verbs[n]||Ye.includes(n))throw new E(`「${n}」は、もとからある言葉なので、名前に使えません。`,e.start,e.end);if(i.has(n))throw new E(`「${n}」は、もう作ってあります。`,e.start,e.end);i.set(n,T(a.text)),r[n]=`もの`}for(let{name:e,base:t}of n){let n=T(t.text);if(!Ye.includes(n)&&!i.has(n))throw new E(`「${n}」からは作れません。「という」の後には、四角・丸・三角・ボタン・欄・一覧か、作ったものを書きます。`,t.start,t.end);let r=n,a=new Set([T(e.text)]);for(;r!==void 0&&i.has(r);){if(a.has(r))throw new E(`「${T(e.text)}」のもとをたどると、自分に戻ってきます。`,t.start,t.end);a.add(r),r=i.get(r)}}let a=Object.fromEntries(Object.entries(t.properties).map(([e,t])=>[e,t.forThings?{...t,owners:[...t.owners,...i.keys()]}:t]));return{...t,words:r,properties:a,thingParents:Object.fromEntries(i)}}var cn=`記録`;function ln(e){let[t]=e.phrases,n=e.phrases.length===1&&t.particle.text===`を`?t.words:null;if(!n||n.kind!==`語`||!Mt(n.tokens))throw new E(`「作る：」の見出しは、「成績 という ${cn} を 作る：」か「敵 という 丸 を 作る：」の形で書きます。`,e.start,e.end);return n.tokens}function un(e){if(!e.record||fn(e))return!1;let[t]=e.phrases,n=e.phrases.length===1?t.words:null;return!(n?.kind===`語`&&Mt(n.tokens)&&T(n.tokens[2].text)!==cn)}var dn=`場面`;function fn(e){let[t]=e.phrases,n=e.phrases.length===1&&t.particle.text===`を`?t.words:null;return e.verb.length===1&&e.verb[0].text===`作る`&&!e.condition&&!e.branch&&n?.kind===`語`&&Mt(n.tokens)&&T(n.tokens[2].text)===dn}function pn(e,t){let n={...t.words},r=[];for(let i of e){if(!fn(i))continue;let e=ln(i)[0],a=T(e.text);if(r.includes(a))throw new E(`場面「${a}」は、もう作ってあります。`,e.start,e.end);if(t.words[a]||t.verbs[a]||Ye.includes(a)||a===dn)throw new E(`「${a}」は、もとからある言葉なので、場面の名前に使えません。`,e.start,e.end);r.push(a),n[a]=`場面`}return r.length===0?t:{...t,words:n,sceneNames:r}}function mn(e,t,n){let r=T(ln(e)[0].text);if(!n.sceneNames?.includes(r))throw new E(`場面を作る文は、いちばん外に書きます（字下げしない）。`,e.start,e.end);let i=e.body??[];for(let e of i){if(e.define)throw new E(`動詞を作る文（〜 とは：）は、場面の中には書けません。いちばん外に書きます。`,e.start,e.end);if(e.verb.length===1&&e.verb[0].text===`作る`&&!e.condition&&!e.branch&&!e.always&&!e.every)throw new E(`作る文は、場面の中には書けません。いちばん外に書きます。`,e.start,e.end)}let a=en(i,t,n),{start:o,end:s}=e;return{body:a,branch:null,loop:null,define:null,always:null,condition:null,every:null,action:{verb:`作る`,roles:{},start:o,end:s},scene:{name:r},start:o,end:s}}function hn(e){return T(ln(e)[0].text)}function gn(e,t,n,r=new Map){let i={};for(let t of e.body??[]){let[e,a]=t.phrases,o=e?.words.kind===`語`&&e.words.tokens.length===1?e.words.tokens[0]:null,s=!t.body&&!t.branch&&!t.loop&&!t.define&&!t.always&&!t.condition&&!t.every,c=t.verb.length===1&&t.verb[0].text===`する`&&t.phrases.length===2;if(!s||!c||o?.kind!==`項目`||e.particle.text!==`を`||a.particle.text!==`に`)throw new E(`「作る：」の中には、「｛項目｝ を 初めの値 に する。」だけを書きます。`,t.start,t.end);if(i[o.name])throw new E(`${o.text} は、もう書いてあります。`,o.start,o.end);let l=zt(wt(a.words,n),n),u=new Map,d=l.length>=2?_n(l,u,n):Jt(l[0],u,n);if(d===null||d===`不明`||d===`もの1つ`)throw new E(`初めの値には、数・文字・真偽（真、偽）・空・表 を書きます。`,a.words.start,a.words.end);i[o.name]={type:d,initial:l},r.set(o.name,o)}if(Object.keys(i).length===0)throw new E(`${t}の項目を、次の行から字下げして書きます（｛体力｝ を 3 に する。）。`,e.start,e.end);return i}function _n(e,t,n){for(let r of e)Xt(r,t,n);return`配列`}function vn(e,t,n){let r=e.record,i,a=``;if(r.kind===`その`){let e=yn(r.thing,n);i=n.thingFields?.[e],a=`「${e}」`}else if(r.kind===`項`){let e=T(r.token.text);if(n.records?.[e])i=n.records[e],a=`記録「${e}」`;else if(n.words[e]===`もの`&&n.thingFields?.[e])i=n.thingFields[e],a=`「${e}」`;else if(Tt(r.token,n)){let n=Wt(e,t,r.start,r.end);if(n===`もの1つ`||n===`不明`)return null;throw new E(`「${e}」は記録ではありません（${n}です）。項目を持つのは、記録と、作ったものです。`,r.start,r.end)}}if(!i)throw new E(`「${w(r)}」は、記録でも、作ったものでもありません。項目は「成績 の ｛最高点｝」「その 敵 の ｛体力｝」のように書きます。`,r.start,r.end);let o=i[e.field.name];if(!o){let t=Object.keys(i),n=t.length===0?`ありません`:` ${t.map(e=>`｛${e}｝`).join(`、`)} です`;throw new E(`${a}に、${e.field.text} はありません。作る文に書いた項目は${n}。`,e.field.start,e.field.end)}return o}function yn(e,t){let n=T(e.text);if(t.words[n]!==`もの`||on.includes(n))throw new E(`「${e.text}」は、画面のものではありません。「その」の後には、作ったもの（敵 など）を書きます。`,e.start,e.end);return n}function bn(e,t){let n=t.thingParents??{},r=new Map;for(let n of e){if(!n.record||un(n)||fn(n))continue;let e=T(ln(n)[0].text),i=new Map;r.set(e,{fields:gn(n,`「${e}」`,t,i),tokens:i})}let i={},a=t=>{if(i[t])return i[t];let o=n[t],s=o!==void 0&&o in n?a(o):{},c=r.get(t);for(let[t,n]of Object.entries(c?.fields??{})){let r=s[t];if(r&&r.type!==n.type){let n=c?.tokens.get(t);throw new E(`${n?.text??t} は、もとの「${o}」では${r.type}です。仲間でも${r.type}を書きます。`,n?.start??e[0].start,n?.end??e[0].end)}}return i[t]={...s,...c?.fields??{}},i[t]};for(let e of Object.keys(n))a(e);return{...t,thingFields:i}}function xn(e,t){let n={...t.records},r={...t.words};for(let i of e){if(!un(i))continue;let e=hn(i),a=i.phrases[0].words.tokens[0];if(n[e])throw new E(`記録「${e}」は、もう作ってあります。`,a.start,a.end);if(t.words[e]||t.verbs[e]||Ye.includes(e))throw new E(`「${e}」は、もとからある言葉なので、記録の名前に使えません。`,a.start,a.end);n[e]=gn(i,`記録「${e}」`,t),r[e]=`記録`}return{...t,words:r,records:n}}function Sn(e,t,n,r=[]){for(let i of e){let e=i.define?i.define.params.map(e=>T(e.name.text)):r;i.body&&Sn(i.body,t,n,e);let a=i.verb.length===1?i.verb[0].text:``,o=a===`する`?`を`:a===`入れる`?`に`:null;if(o!==null)for(let e of i.phrases){let{words:i}=e;if(e.particle.text!==o||i.kind!==`語`||i.tokens.length!==1)continue;let a=i.tokens[0],s=T(a.text);Tt(a,n)&&!r.includes(s)&&!t.has(s)&&t.set(s,`不明`)}}}function Cn(e,t=ot){let n=an(e,xn(e,bn(e,sn(e,pn(e,t))))),r=new Map;for(let t of e)if(t.define&&t.body){let e=t.define.params.map(e=>T(e.name.text));Sn(t.body,r,n,e)}let i=$t(n,r),a=[],o=e=>{try{return e()}catch(e){if(e instanceof E)return a.push(e),null;throw e}},s=e.map(e=>e.define?null:o(()=>i.checkOne(e))),c=e.map((e,t)=>e.define?o(()=>kn(e,r,null,n)):s[t]);if(a.length>0)throw a.length===1?a[0]:new vt(a.sort((e,t)=>e.start-t.start));let l=c;return En(l,!0),l}var wn=`「画面 の 大きさ を 横 1000 縦 600 に する。」`;function Tn(e){return e.action.verb===`する`&&e.action.roles.対象?.values[0]?.kind===`画面の大きさ`}function En(e,t){for(let n of e){n.body&&En(n.body,!1);let{action:e}=n;if(e.verb!==`する`)continue;let r=e.roles.値?.values;if(!Tn(n))continue;let i=n.condition||n.always||n.every||n.branch;if(!t||i)throw new E(`画面の大きさは、始めに一度だけ決めます。いちばん外に、「なら」や「ずっと」を付けずに書きます。`,n.start,n.end);let[a]=r??[];if(r?.length!==1||a.kind!==`位置`||a.y===null){let t=a??e;throw new E(`画面の大きさは、${wn}のように、横と縦の数で書きます。`,t.start,t.end)}for(let e of[a.x,a.y])if(e<100||e>3e3||!Number.isInteger(e))throw new E(`画面の横と縦は、100〜${Ge} の整数で書きます。`,a.start,a.end)}}function Dn(e,t,n){if(e.verb===`たつ`){if(t!==`たら`)throw new E(`繰り返すときは「3秒 ごと に」と書きます。「たつ」は「3秒 たったら」のように使います。`,e.start,e.end);if(!n||n.unit!==`秒`||n.value<=0)throw new E(`「たったら」の前には、「3秒」のように待つ時間を書きます（3秒 たったら、…）。`,e.start,e.end)}else if(n&&n.unit===`秒`)throw new E(`「${n.text}」は、「たったら」の前にだけ書けます。回数なら「3回」のように書きます。`,n.start,n.end)}var On=`まとまり`;function kn(e,t,n,r){if(e.branch&&Qt(e.branch,n,t,r),fn(e))return mn(e,t,r);if(e.record&&!un(e)){let t=Bt(e.phrases,e.verb,`言い切り`,r),n=t.roles.対象?.values[0],i=n?.kind===`名付け`?r.thingFields?.[n.name]:void 0;if(!i)throw new E(`ものを作る文は、いちばん外に書きます（字下げしない）。`,e.start,e.end);let{start:a,end:o}=e;return{body:null,branch:null,loop:null,define:null,always:null,condition:null,every:null,action:t,fields:i,start:a,end:o}}if(e.record){let t=hn(e),n=r.records?.[t];if(!n)throw new E(`記録を作る文は、いちばん外に書きます（字下げしない）。`,e.start,e.end);let{start:i,end:a}=e;return{body:null,branch:null,loop:null,define:null,always:null,condition:null,every:null,action:{verb:`作る`,roles:{},start:i,end:a},record:{name:t,fields:n},start:i,end:a}}let{define:i}=e;if(i){let n=new Map(t);for(let e of i.params){if(!Tt(e.name,r))throw new E(`「${e.name.text}」は、もとからある言葉なので、受け取る値の名前に使えません。`,e.name.start,e.name.end);n.set(T(e.name.text),`不明`)}let{start:a,end:o}=e;return{body:en(e.body??[],n,r),branch:null,loop:null,define:i,always:null,condition:null,every:null,action:{verb:On,roles:{},start:a,end:o},start:a,end:o}}if(e.body){let{start:n,end:i,loop:a}=e;Vt(e);let o=null;if(e.condition){let n=e.condition,i=n.kind===`たら`?`たら`:`言い切り`,a=Bt(n.phrases,n.verb,i,r);Zt(a,t,r),Dn(a,n.kind,n.count),o={...a,kind:n.kind,count:n.count,start:n.start,end:n.end}}if(a?.kind===`1つずつ`){let e=D(a.list,t,r);if(e!==`配列`&&e!==`文字`&&e!==`表`&&e!==`不明`&&e!==`ものの並び`)throw new E(`「${w(a.list)}」は、配列でも文字でもありません。`,a.list.start,a.list.end);if(!Tt(a.name,r))throw new E(`「${a.name.text}」は、もとからある言葉なので、入れる名前に使えません。`,a.name.start,a.name.end);t.set(T(a.name.text),e===`ものの並び`?`もの1つ`:`不明`)}if(a?.kind===`間`&&!Ut(D(a.test,t,r)))throw new E(`「の 間」の前には、比べる式（体力 > 0 など）を書きます。`,a.test.start,a.test.end);return{body:en(e.body,t,r),branch:e.branch,loop:a,define:null,always:e.always,condition:o,every:e.every,action:{verb:On,roles:{},start:n,end:i},start:n,end:i}}Vt(e);let{condition:a}=e,o=null;if(a){let e=a.kind===`たら`?`たら`:`言い切り`,n=Bt(a.phrases,a.verb,e,r);Zt(n,t,r),Dn(n,a.kind,a.count),o={...n,kind:a.kind,count:a.count,start:a.start,end:a.end}}let s=Bt(e.phrases,e.verb,`言い切り`,r);Zt(s,t,r);let c=s.verb===`作る`?s.roles.対象?.values[0]:void 0,l=c?.kind===`名付け`?r.thingFields?.[c.name]:void 0;return{body:null,branch:e.branch,loop:null,define:null,always:e.always,condition:o,every:e.every,action:s,...l?{fields:l}:{},start:e.start,end:e.end}}function An(){let e=new Map;return{load:t=>{let n=e.get(t);return n===void 0?null:JSON.parse(n)},save:(t,n)=>{e.set(t,JSON.stringify(n))},clear:()=>e.clear()}}var jn=An(),Mn=`表`;function Nn(e){return e instanceof Map?{[Mn]:[...e].map(([e,t])=>[e,Nn(t)])}:Array.isArray(e)?e.map(Nn):e}function Pn(e){if(typeof e==`number`||typeof e==`string`||typeof e==`boolean`)return e;if(Array.isArray(e)){let t=e.map(Pn);return t.every(e=>e!==void 0)?t:void 0}if(e&&typeof e==`object`&&Array.isArray(e[Mn])){let t=new Map;for(let n of e[Mn]){if(!Array.isArray(n)||typeof n[0]!=`string`)return;let e=Pn(n[1]);if(e===void 0)return;t.set(n[0],e)}return t}}function Fn(e){return e instanceof Map?`表`:Array.isArray(e)?`配列`:typeof e==`number`?`数`:typeof e==`string`?`文字`:`真偽`}function In(e){let t=new Map;for(let[n,r]of e){let e=jn.load(n)??{},i=new Map;for(let[t,n]of r){let r=t in e?Pn(e[t]):void 0;i.set(t,r!==void 0&&Fn(r)===Fn(n)?r:n)}t.set(n,i)}return{values:t,save(e){let n=t.get(e);n&&jn.save(e,Object.fromEntries([...n].map(([e,t])=>[e,Nn(t)])))}}}var Ln=Math.random,Rn=()=>new Date,zn=[`日`,`月`,`火`,`水`,`木`,`金`,`土`];function Bn(e){let t=Rn();switch(e){case`年`:return t.getFullYear();case`月`:return t.getMonth()+1;case`日`:return t.getDate();case`曜日`:return zn[t.getDay()];case`時`:return t.getHours();case`分`:return t.getMinutes();default:return t.getSeconds()}}var O=class{id;kind;constructor(e,t){this.id=e,this.kind=t}};function Vn(e){return e===null?`なし`:typeof e==`number`?`数`:typeof e==`string`?`文字`:typeof e==`boolean`?`真偽`:e instanceof Map?`表`:e instanceof O?`もの`:`配列`}function Hn(e){return e instanceof Map?new Map(e):Array.isArray(e)?[...e]:e}function Un(e,t){if(!e.reader)throw new E(`ゲームの様子は、ゲームの中でだけ読めます。`,t.start,t.end);return e.reader}function Wn(e,t,n,r){let i=e.get(t);if(i===void 0)throw new E(`「${t}」には、まだ値が入っていません。使う前に「${t} を 〜 に する。」を実行します。`,n,r);return i}function Gn(e,t,n,r){let i=Wn(e,t,n,r);return i instanceof Map?new Map(i):Array.isArray(i)?[...i]:i}function Kn(e,t){let n=e.record;if(n.kind===`その`){let e=Un(t,n);return{fields:e.fields(e.that(T(n.thing.text),n),n),record:null}}if(n.kind===`項`){let e=T(n.token.text),r=t.records?.values.get(e);if(r)return{fields:r,record:e};let i=t.get(e);if(i instanceof O)return{fields:Un(t,n).fields(i,n),record:null};if(i===void 0&&t.reader)return{fields:t.reader.fields(e,n),record:null}}throw new E(`「${w(n)}」は、記録でも、ものでもありません。`,n.start,n.end)}function qn(e,t,n){let{fields:r,record:i}=Kn(e,n),a=r.get(e.field.name);if(a===void 0)throw new E(`「${w(e.record)}」に、${e.field.text} はありません。`,e.field.start,e.field.end);if(Vn(a)!==Vn(t))throw new E(`${e.field.text} には、${Vn(a)}を入れます。入れようとした値は${Vn(t)}です。`,e.start,e.end);r.set(e.field.name,Hn(t)),i!==null&&n.records?.save(i)}function Jn(e,t,n){if(e.kind===`見出し`){let{table:r}=e;if(r.kind!==`項`)throw new E(`書き換えられるのは、「名前 の 「見出し」」の形だけです。`,e.start,e.end);let i=Wn(n,T(r.token.text),r.start,r.end);if(!(i instanceof Map))throw new E(`「${w(r)}」は表ではありません。`,r.start,r.end);i.set(ar(k(e.key,n)),t);return}let{list:r}=e;if(r.kind!==`項`)throw new E(`書き換えられるのは、「名前 の 1番目」の形だけです。`,e.start,e.end);let i=nr(Wn(n,T(r.token.text),r.start,r.end),r);i[er(i,k(e.index,n),r,e)]=t}function Yn(e,t,n,r){r.has(e)||r.set(e,[]);let i=Wn(r,e,t.start,t.end);if(!Array.isArray(i))throw new E(`「${e}」は配列ではありません。`,t.start,t.end);i.push(n)}function Xn(e,t,n,r){let i=Wn(r,e,t.start,t.end);if(!Array.isArray(i))throw new E(`「${e}」は配列ではありません。`,t.start,t.end);let a=i.findIndex(e=>e===n);a!==-1&&i.splice(a,1)}function Zn(e,t){if(e.kind===`押している`){let n=e.key.kind===`項`?T(e.key.token.text):``;return Un(t,e).held(n)===e.held}if(e.kind===`でない`)return!Zn(e.expr,t);if(e.kind!==`計算`||!Qn.includes(e.op)){let n=k(e,t);if(typeof n!=`boolean`)throw new E(`ここには、比べる式（体力 > 0 など）か、真偽を書きます。`,e.start,e.end);return n}if(e.op===`かつ`)return Zn(e.left,t)&&Zn(e.right,t);if(e.op===`または`)return Zn(e.left,t)||Zn(e.right,t);let n=k(e.left,t),r=k(e.right,t);if(n===null||r===null){if(e.op!==`=`&&e.op!==`!=`)throw new E(`なし（何も入っていない値）は、「=」と「!=」で比べるだけに使います。`,e.start,e.end);return n===r==(e.op===`=`)}if(Array.isArray(n)||Array.isArray(r)||n instanceof Map||r instanceof Map)throw new E(`配列や表は比べられません。中身は「〜 の 1番目」のように取り出して比べます。`,e.start,e.end);if(n instanceof O||r instanceof O){if(e.op!==`=`&&e.op!==`!=`||!(n instanceof O&&r instanceof O))throw new E(`ものは、同じ1つか（= と !=）だけ比べられます。`,e.start,e.end);return n.id===r.id==(e.op===`=`)}return $n(e,n,r)}var Qn=[`=`,`!=`,`<`,`>`,`<=`,`>=`,`かつ`,`または`];function $n(e,t,n){if((e.op===`=`||e.op===`!=`)&&typeof t!=typeof n)throw new E(`「${e.op}」で比べられるのは、数どうし、文字どうし、真偽どうしです。`,e.start,e.end);if(e.op!==`=`&&e.op!==`!=`&&(typeof t!=`number`||typeof n!=`number`))throw new E(`「${e.op}」で比べられるのは、数どうしだけです。`,e.start,e.end);switch(e.op){case`=`:return t===n;case`!=`:return t!==n;case`<`:return t<n;case`>`:return t>n;case`<=`:return t<=n;case`>=`:return t>=n;default:throw new E(`ここには、比べる式（体力 > 0 など）を書きます。`,e.start,e.end)}}function er(e,t,n,r,i=`個`){let a=w(n);if(typeof t!=`number`||!Number.isInteger(t)||t<1||t>e.length)throw new E(`「${a}」は${e.length===0?`空です`:`${e.length}${i}です。1から${e.length}までの番号で書きます`}。`,r.start,r.end);return t-1}function tr(e,t){if(typeof e!=`string`)throw new E(`「${w(t)}」は文字ではありません。`,t.start,t.end);return Array.from(e)}function nr(e,t){if(!Array.isArray(e))throw new E(`「${w(t)}」は配列ではありません。`,t.start,t.end);return e}function k(e,t){if(e.kind===`項`&&e.token.kind===`語`&&T(e.token.text)===`なし`&&!t.has(`なし`))return null;if(e.kind===`呼ぶ`){if(!e.checked)throw new E(`呼ぶ式が確かめられていません。`,e.start,e.end);let n=e.checked;return n.verb===`含む`||n.verb===`置き換える`||n.verb===`変える`?ir(n,t,e):Un(t,e).call(n,e)}if(e.kind===`道具`){let n=k(e.target,t);if(typeof n!=`number`)throw new E(`「${e.tool}」は、数に使います。`,e.start,e.end);if(e.tool===`平方根`&&n<0)throw new E(`平方根は、0 より小さい数には使えません。`,e.start,e.end);return e.tool===`絶対値`?Math.abs(n):Math.sqrt(n)}if(e.kind===`距離`){let n=Un(t,e),r=e=>{if(e.kind===`項`&&!t.has(T(e.token.text)))return n.center(T(e.token.text),e);let r=k(e,t);if(!(r instanceof O))throw new E(`「距離」は、ものどうしで測ります。`,e.start,e.end);return n.center(r,e)},i=r(e.a),a=r(e.b);return Math.hypot(i.x-a.x,i.y-a.y)}if(e.kind===`様子`){if(e.thing.kind===`項`){let n=T(e.thing.token.text);if(n in tt)return Bn(e.property);if(!t.has(n))return Un(t,e).thing(n,e.property,e)}let n=k(e.thing,t);if(!(n instanceof O))throw new E(`「${w(e.thing)}」は、画面のものではありません。`,e.thing.start,e.thing.end);return Un(t,e).thing(n,e.property,e)}if(e.kind===`乱数`){let n=k(e.min,t),r=k(e.max,t);if(typeof n!=`number`||typeof r!=`number`||!Number.isInteger(n)||!Number.isInteger(r))throw new E(`乱数の範囲は、整数で書きます（1〜6 の 乱数）。`,e.start,e.end);if(n>r)throw new E(`乱数の範囲は、小さい方を先に書きます（${r}〜${n} の 乱数）。`,e.start,e.end);return n+Math.floor(Ln()*(r-n+1))}if(e.kind===`どれか`){let n=nr(k(e.list,t),e.list);if(n.length===0)throw new E(`「${w(e.list)}」は空なので、どれかを選べません。`,e.start,e.end);return n[Math.floor(Ln()*n.length)]}if(e.kind===`範囲`){let n=k(e.list,t),r=e.unit===`文字目`?tr(n,e.list):nr(n,e.list),i=e.unit===`文字目`?`文字`:`個`,a=er(r,k(e.from,t),e.list,e,i),o=er(r,k(e.to,t),e.list,e,i);if(a>o)throw new E(`範囲は、小さい番号を先に書きます（2〜3文字目）。`,e.start,e.end);let s=r.slice(a,o+1);return e.unit===`文字目`?s.join(``):s}if(e.kind===`番目`&&e.unit===`文字目`){let n=tr(k(e.list,t),e.list);return n[er(n,k(e.index,t),e.list,e,`文字`)]}if(e.kind===`番目`){let n=nr(k(e.list,t),e.list);return n[er(n,k(e.index,t),e.list,e)]}if(e.kind===`個数`&&e.word===`文字数`)return tr(k(e.list,t),e.list).length;if(e.kind===`個数`){let n=k(e.list,t);return n instanceof Map?n.size:nr(n,e.list).length}if(e.kind===`見出し`){let n=k(e.table,t);if(!(n instanceof Map))throw new E(`「${w(e.table)}」は表ではありません。`,e.table.start,e.table.end);let r=ar(k(e.key,t)),i=n.get(r);if(i===void 0)throw new E(`「${w(e.table)}」に、見出し「${r}」はありません。`,e.start,e.end);return i}if(e.kind===`項`){let{token:n}=e;if(n.kind===`数`||n.kind===`文字`)return n.value;if(n.kind===`語`&&(n.text===`真`||n.text===`偽`))return n.text===`真`;let r=T(n.text);return(t.has(r)?null:t.reader?.list(r))||Gn(t,r,n.start,n.end)}if(e.kind===`項目`){let n=Kn(e,t).fields.get(e.field.name);if(n===void 0)throw new E(`「${w(e.record)}」に、${e.field.text} はありません。`,e.field.start,e.field.end);return Hn(n)}if(e.kind===`その`){let n=T(e.thing.text);return n===`行`?Un(t,e).row(e):Un(t,e).that(n,e)}if(e.kind===`押している`||e.kind===`でない`||Qn.includes(e.op))return Zn(e,t);let n=k(e.left,t),r=k(e.right,t);if(Array.isArray(n)||Array.isArray(r)||n instanceof Map||r instanceof Map)throw new E(`配列や表は、計算に使えません。中身は「〜 の 1番目」のように取り出して使います。`,e.start,e.end);if(n instanceof O||r instanceof O)throw new E(`ものは、計算に使えません。`,e.start,e.end);if(n===null||r===null){let t=n===null?e.left:e.right;throw new E(`「${w(t)}」は、今は何も入っていません（なし）。`,t.start,t.end)}if(e.op===`+`&&(typeof n==`string`||typeof r==`string`))return ar(n)+ar(r);if(typeof n!=`number`||typeof r!=`number`)throw new E(`文字に「${{"-":`-`,"*":`×`,"/":`÷`,"%":`%`}[e.op]??e.op}」は使えません。文字に使える記号は「+」（つなぐ）だけです。`,e.start,e.end);let i=n,a=r;switch(e.op){case`+`:return i+a;case`-`:return i-a;case`*`:return i*a;case`/`:if(a===0)throw new E(`0 で割ることはできません。`,e.start,e.end);return i/a;case`%`:if(a===0)throw new E(`0 で割った余りは求められません。`,e.start,e.end);return i%a;default:throw new E(`比べた結果は、計算に使えません。`,e.start,e.end)}}function rr(e,t,n){let[r]=e.roles[t]?.values??[];if(!r)throw new E(`「${e.verb}」に要る組がありません。`,e.start,e.end);return A(r,n)}function ir(e,t,n){if(e.verb===`含む`){let r=rr(e,`主語`,t),i=rr(e,`対象`,t);if(typeof r==`string`)return r.includes(ar(i));if(Array.isArray(r))return r.some(e=>e===i);if(r instanceof Map)return r.has(ar(i));throw new E(`「含む」の前（〜 が）には、文字か配列か表を書きます。`,n.start,n.end)}if(e.verb===`置き換える`){let r=rr(e,`出発点`,t),i=rr(e,`対象`,t),a=rr(e,`値`,t);if(typeof r!=`string`||typeof i!=`string`||typeof a!=`string`)throw new E(`「置き換える」には、文字を書きます。`,n.start,n.end);if(i===``)throw new E(`置き換える文字（〜 を）が空です。`,n.start,n.end);return r.split(i).join(a)}let r=rr(e,`対象`,t),[i]=e.roles.値?.values??[];if(i?.kind===`型`&&i.name===`整数`){let e=typeof r==`number`?r:typeof r==`string`&&r.trim()!==``?Number(r.trim()):NaN;if(Number.isNaN(e))throw new E(`「${ar(r)}」は、整数に変えられません。`,n.start,n.end);return Math.trunc(e)}if(i?.kind===`型`&&i.name===`数`){if(typeof r==`number`)return r;let e=typeof r==`string`&&r.trim()!==``?Number(r.trim()):NaN;if(Number.isNaN(e))throw new E(`「${ar(r)}」は、数に変えられません。`,n.start,n.end);return e}return ar(r)}function A(e,t){switch(e.kind){case`数`:return e.number;case`文字`:return e.text;case`名前`:return Gn(t,e.name,e.start,e.end);case`式`:return k(e.expr,t);case`空`:return[];case`真偽`:return e.value;case`表`:return new Map;default:throw new E(`ここには、数か文字か名前か式を書きます。`,e.start,e.end)}}function ar(e){return e===null?`なし`:typeof e==`string`?e:typeof e==`boolean`?e?`真`:`偽`:e instanceof Map?[...e].map(([e,t])=>`${e}：${ar(t)}`).join(`、`):Array.isArray(e)?e.map(ar).join(`、`):e instanceof O?e.kind:String(Number(e.toPrecision(12)))}function or(e){let t=new Map;for(let n of e)n.define&&n.body&&t.set(T(n.define.name.text),{define:n.define,body:n.body});return t}var sr=[`ゲーム`,`重力`,`背景`,`カメラ`];function cr(e){return ur(e,!1)??{width:800,height:450}}function lr(e){return ur(e,!0)??cr(e)}function ur(e,t){let n=null;for(let r of e){let e=r.action.roles.対象?.values[0],i=Tn(r)?r.action.roles.値?.values[0]:void 0;e?.kind===`画面の大きさ`&&(e.world??!1)===t&&i?.kind===`位置`&&i.y!==null&&(n={width:i.x,height:i.y})}return n}function dr(e,t){return t?e.screen:{width:e.camera.x+e.screen.width,height:e.world.height}}function fr(e,t,n){return t.part===``?{x:n.x+e.camera.x,y:n.y+e.camera.y}:n}function pr(e){let t=e.things.find(t=>j(t,e.rules.camera)&&t.part===``);if(!t)return;let n=(e,t)=>Math.min(Math.max(e,0),Math.max(0,t));e.camera={x:n(t.x+t.width/2-e.screen.width/2,e.world.width-e.screen.width),y:n(t.y+t.height/2-e.screen.height/2,e.world.height-e.screen.height)}}var mr=[`言葉`,`中身`];function hr(e){let{action:t}=e,n=t.roles.対象?.values[0];return!e.condition&&!e.branch&&!e.every&&!e.always&&t.verb===`する`&&n?.kind===`持ち物`&&n.pick===void 0&&mr.includes(n.property)&&(t.roles.値?.values??[]).some(e=>e.kind===`名前`||e.kind===`式`)}function gr(e){let t=e.roles.対象?.values[0];return e.verb===`する`&&t?.kind===`持ち物`&&(t.pick!==void 0||(e.roles.値?.values??[]).some(e=>e.kind===`名前`||e.kind===`式`))}function _r(e){let t=e.roles.対象?.values[0];return e.verb===`する`&&(t?.kind===`名前`||t?.kind===`式`&&(t.expr.kind===`番目`||t.expr.kind===`見出し`||t.expr.kind===`項目`))}function vr(e){let{verb:t}=e.action;return e.always===null&&e.branch===null&&e.condition===null&&e.every===null&&(t===`いる`||t===`する`&&!_r(e.action)&&!gr(e.action))}function yr(e){let t={};for(let[n,r]of e)qe.includes(r)?t[n]={...Ke,shape:r,sources:[],kinds:[n]}:Je.includes(r)&&(t[n]={...Ke,...Xe[r],shape:`四角`,part:r,sources:[],kinds:[n]});let n=!0;for(;n;){n=!1;for(let[r,i]of e){let e=t[i];!t[r]&&e&&(t[r]={...e,sources:[],kinds:[r,...e.kinds]},n=!0)}}return t}function br(e,t){return Object.values(e).filter(e=>e.kinds.includes(t))}function j(e,t){return t.some(t=>e.kinds.includes(t))}function xr(e,t,n){for(let r of br(e,t))r.sources.push(n)}function Sr(e){let t=new Map;for(let n of e){if(n.action.verb!==`作る`)continue;let[e]=n.action.roles.対象?.values??[];e?.kind===`名付け`&&t.set(e.name,e.base)}return t}function Cr(e,t,n){let r=t.stand.flatMap(e=>e.on),i=n.height;for(let t of e)j(t,r)&&(i=Math.min(i,t.y));return i}function wr(e,t,n,r,i){if(e.kind===`位置の式`&&i)return{x:Hr(e.x,i),y:e.y===null?n-t:r.height-Hr(e.y,i)-t};if(e.kind===`位置`){let i=e.y===null?n-t:r.height-e.y-t;return{x:e.x,y:i}}if(e.kind===`場所・向き`&&e.name in Qe)return{x:e.name===`右端`?r.width:Qe[e.name],y:n-t};throw new E(`ここには置けません。`,e.start,e.end)}function Tr(e,t){if(!e)throw new E(`場所がありません。`,t.start,t.end);if(e.kind===`場所・向き`&&!(e.name in Qe))throw new E(`「${e.name}」には置けません。`,e.start,e.end);if(e.kind===`位置の式`)throw new E(`「いる」の位置には、数を書きます（名前の値を覚える前に置くため）。名前や式の位置に置くときは、「〜 を 横 (x) 縦 (y) から 出す。」と書きます。`,e.start,e.end);if(e.kind!==`場所・向き`&&e.kind!==`位置`)throw new E(`ここには置けません。`,e.start,e.end);return e}function Er(e){return!sr.includes(e)}function Dr(e,t,n,r=[],i=new Map,a){let{対象:o,値:s}=n.roles;if(!o||!s)throw Error(`設定の文に、対象か値がありません。`);let c=s.values[0],l=o.values[0]?.kind===`持ち物`?o.values[0].property:``;if(l===`絵`){let n=s.values.length>=2?s.values.map(e=>A(e,i)):A(c,i);if(Array.isArray(n)){if(n.length===0||n.some(e=>typeof e!=`string`))throw new E(`並べる絵には、「歩く1.png」のような、ファイルの名前を書きます。`,c.start,c.end);let i=n,s=e=>{e.image=i[0],e.frames=i.length>=2?[...i]:[]};for(let n of o.values)if(n.kind===`持ち物`){if(n.pick&&a)s(a(n));else for(let a of n.owners)if(a===`背景`)t.image=i[0];else{for(let t of br(e,a))s(t);for(let e of r)e.kinds.includes(a)&&s(e)}}return}}if(l===`中身`){Nr(e,o.values,A(c,i),c,r,a);return}let u=c;if(c.kind===`名前`||c.kind===`式`||c.kind===`文字`){let e=A(c,i);if(l===`言葉`||l===`絵`){if(typeof e!=`string`)throw new E(`「${l}」には、文字を入れます${l===`言葉`?`（数なら「「」 + 点数」のように文字にします）`:`（「ねこ.png」のように、ファイルの名前を書きます）`}。`,c.start,c.end);u={kind:`文字`,text:e,start:c.start,end:c.end}}else if(l in qr){if(typeof e!=`string`)throw new E(`「${l}」には、文字（「赤」など）を入れます。`,c.start,c.end);u=Jr(l,e,c)}else u={kind:`数`,number:Yr(c,i),start:c.start,end:c.end}}for(let n of o.values){if(n.kind!==`持ち物`)throw Error(`設定の文の対象が、持ち物ではありません。`);if(n.pick){if(!a)throw Error(`1つだけの持ち物は、遊んでいる間に変えます。`);let e=a(n),t=e.y+e.height;kr(e,n.property,u),e.y=t-e.height}else for(let i of n.owners)if(i===`背景`)u.kind===`色の値`?t.color=u.name:u.kind===`文字`&&n.property===`絵`&&(t.image=u.text);else{if(!Er(i))throw Error(`「${i}」の型紙がありません。`);for(let t of br(e,i))kr(t,n.property,u);for(let e of r)if(e.kinds.includes(i)){let t=e.y+e.height;kr(e,n.property,u),e.y=t-e.height}}}}function Or(e,t,n,r){for(let i of n.roles.対象?.values??[])if(i.kind===`持ち物`)for(let n of i.owners)n===`背景`?t.sources.push(r):Er(n)&&xr(e,n,r)}function kr(e,t,n){n.kind===`数`?t===`大きさ`?(e.width=n.number,e.height=n.number):t===`幅`?e.width=n.number:t===`高さ`?e.height=n.number:t===`向き`?e.angle=Ar(n.number):t===`コマの間`&&(e.frameGap=Math.max(.01,n.number)):n.kind===`形の値`&&t===`形`?e.shape=n.name:n.kind===`色の値`&&t===`色`?e.color=n.name:n.kind===`模様の値`&&t===`模様`?e.pattern=n.name:n.kind===`文字`&&t===`言葉`?e.label=n.text:n.kind===`文字`&&t===`絵`&&(e.image=n.text,e.frames=[]),e.part===`字`&&(e.width=Mr(e.label,e.height))}function Ar(e){return(e%360+360)%360}function jr(e){let t=e*Math.PI/180;return{dx:Math.sin(t),dy:-Math.cos(t)}}function Mr(e,t){let n=0;for(let r of e)n+=(r.codePointAt(0)??0)<256?t*.6:t;return Math.round(n)}function Nr(e,t,n,r,i,a){if(!Array.isArray(n))throw new E(`一覧の中身には、配列を書きます。`,r.start,r.end);let o=[...n],s=(e,t)=>{if(e.part!==`一覧`)throw new E(`「中身」を持てるのは、一覧だけです。「${t}」は一覧ではありません。`,r.start,r.end)};for(let n of t)if(n.kind===`持ち物`){if(n.pick&&a){let e=a(n);s(e,e.name),Pr(e,o)}else for(let t of n.owners){for(let n of br(e,t))s(n,t),n.items=o;for(let e of i)e.kinds.includes(t)&&Pr(e,o)}}}function Pr(e,t){let n=e.listTop>=Fr(e)-1,r=e.items.length>0&&t.length>e.items.length;e.items=t,e.listTop=n&&r?Fr(e):Math.min(e.listTop,Fr(e))}function Fr(e){return Math.max(0,e.items.length*32+8-e.height)}function Ir(e,t){if(t<e.y||t>=e.y+e.height)return-1;let n=Math.floor((t-e.y-4+e.listTop)/32);return n>=0&&n<e.items.length?n:-1}var Lr=new WeakMap;function Rr(e,t,n,r,i,a){let{sources:o,kinds:s,fields:c,...l}=t,u=new Map;for(let[e,{initial:t}]of Object.entries(c??{})){let n=t.map(e=>A(e,new Map));u.set(e,t.length>=2?n:n[0])}return{...l,id:e.nextId++,name:n,kinds:[...s],x:r,y:i,vy:0,jumps:0,scroll:0,listTop:0,scene:null,sources:a?[...o,a]:[...o],fields:u}}function zr(e,t,n,r,i){let{主語:a,場所:o}=i.action.roles;if(!a||!o)throw Error(`配置の文に、主語か場所がありません。`);let s=Tr(o.values[0],o.phrase);return a.values.map(a=>{if(a.kind!==`もの`||!Er(a.name)||!t[a.name])throw new E(`「${a.kind===`もの`?a.name:`これ`}」は、「いる」で置けません。`,a.start,a.end);let o=t[a.name],{x:c,y:l}=wr(s,o.height,n,dr(r,o.part!==``));return Rr(e,o,a.name,c,l,{start:i.start,end:i.end})})}function Br(e){let{verb:t}=e.action;return e.always===null&&e.branch===null&&e.condition===null&&e.every===null&&(t===`かける`||t===`乗る`||t===`流す`||t===`通れない`||t===`ドラッグ できる`||t===`追う`)}function M(e,t){if(!e)throw Error(`「${t}」の文に、要る役割がありません。`);return e.values.filter(e=>e.kind!==`名前`&&e.kind!==`式`).map(e=>{if(e.kind!==`もの`||!Er(e.name))throw new E(`「${e.kind===`もの`?e.name:`これ`}」は、「${t}」で使えません。`,e.start,e.end);return e.name})}function Vr(e){let t=e?.values[0];if(!t)throw Error(`数がありません。`);return t}function Hr(e,t){let n=k(e,t);if(typeof n!=`number`)throw new E(`ここには数を書きます。`,e.start,e.end);return n}var Ur={右:{dx:1,dy:0},左:{dx:-1,dy:0},上:{dx:0,dy:-1},下:{dx:0,dy:1}};function Wr(e){let t=e.roles.場所?.values[0],n=e.roles.量;if(t?.kind===`場所・向き`){if(!(t.name in Ur)&&t.name!==`前`&&t.name!==`後ろ`)throw new E(`動かす向きは、右・左・上・下・前・後ろ です。「${t.name}」には動かせません。`,t.start,t.end);if(!n)throw new E(`どれだけ動かすかを、「5 だけ」のように書きます。`,e.start,e.end)}else if(n)throw new E(`位置へ動かすときは、「だけ」を書きません。`,n.phrase.start,n.phrase.end)}function Gr(e,t){let n=t.roles.場所?.values[0];if(n){for(let r of wi(e,t))if(n.kind===`場所・向き`){let i=n.name===`前`||n.name===`後ろ`?jr(r.angle):null,a=n.name===`後ろ`?-1:1,o=i?{dx:i.dx*a,dy:i.dy*a}:Ur[n.name],s=Yr(Vr(t.roles.量),e.variables),c={x:r.x,y:r.y};r.x+=o.dx*s,r.y+=o.dy*s,Kr(e,r,c)}else if(n.kind===`位置`||n.kind===`位置の式`){let t=n.kind===`位置`?n.x:Hr(n.x,e.variables),i=n.kind===`位置`?n.y:n.y===null?null:Hr(n.y,e.variables);r.x=t,i!==null&&(r.y=dr(e,r.part!==``).height-i-r.height)}}}function Kr(e,t,n){let r=t.x-n.x,i=t.y-n.y;if(r===0==(i===0))return;let a=e.rules.walls.filter(e=>j(t,e.who));if(a.length!==0)for(let o of e.things)o!==t&&a.some(e=>j(o,e.walls))&&(r>0&&n.y<o.y+o.height&&o.y<n.y+t.height&&o.x>=n.x+t.width&&t.x>=o.x+o.width?t.x=Math.min(t.x,o.x-t.width+1):r<0&&n.y<o.y+o.height&&o.y<n.y+t.height&&o.x+o.width<=n.x&&t.x+t.width<=o.x?t.x=Math.max(t.x,o.x+o.width-1):i>0&&n.x<o.x+o.width&&o.x<n.x+t.width&&o.y>=n.y+t.height&&t.y>=o.y+o.height?t.y=Math.min(t.y,o.y-t.height+1):i<0&&n.x<o.x+o.width&&o.x<n.x+t.width&&o.y+o.height<=n.y&&t.y+t.height<=o.y&&(t.y=Math.max(t.y,o.y+o.height-1)))}var qr={色:`色の値`,形:`形の値`,模様:`模様の値`};function Jr(e,t,n){let r=qr[e];if(r===`色の値`&&/^#[0-9a-fA-F]{6}$/.test(t))return{kind:`色の値`,name:t.toLowerCase(),start:n.start,end:n.end};if(r&&et[t]===r)return{kind:r,name:t,start:n.start,end:n.end};throw new E(`「${t}」は、${e}の値として使えません。`,n.start,n.end)}function Yr(e,t){if(e.kind===`数`||e.kind===`毎秒の数`||e.kind===`回数`||e.kind===`秒数`)return e.number;let n=e.kind===`毎秒の式`?k(e.expr,t):A(e,t);if(typeof n!=`number`)throw new E(`ここには数を書きます。`,e.start,e.end);return n}var Xr={左:-1};function Zr(e,t,n){let{verb:r,roles:i}=n.action,a={start:n.start,end:n.end},o=[];if(r===`かける`){let t=i.対象?.values[0];if(!t||t.kind!==`もの`||t.name!==`重力`){let e=t??n.action;throw new E(`「かける」で かけられるのは、重力だけです。`,e.start,e.end)}let s=M(i.相手,r);e.gravity.push({targets:s,strength:Vr(i.量),source:a}),o=s}else if(r===`乗る`){let t=M(i.主語,r),n=M(i.相手,r);e.stand.push({who:t,on:n,source:a}),o=[...t,...n]}else if(r===`追う`){let t=i.主語?.values[0];if(t?.kind!==`もの`||t.name!==`カメラ`){let e=t??n.action;throw new E(`「追う」の前には、カメラを書きます（カメラ は ねこ を 追う。）。`,e.start,e.end)}e.camera=M(i.対象,r),o=e.camera}else if(r===`ドラッグ できる`){let t=M(i.主語,r);e.drag.push({who:t,source:a}),o=t}else if(r===`通れない`){let t=M(i.主語,r),n=M(i.対象,r);e.walls.push({who:t,walls:n,source:a}),o=[...t,...n]}else if(r===`流す`){let t=M(i.対象,r),s=i.向き?.values[0];if(!s||s.kind!==`場所・向き`||!(s.name in Xr)){let e=s??n.action;throw new E(`流す向きは、今は「左」だけです。`,e.start,e.end)}e.flow.push({targets:t,speed:Vr(i.量),dx:Xr[s.name],source:a}),o=t}for(let e of new Set(o))xr(t,e,a)}function Qr(e){let t=M(e.roles.対象,e.verb),n=e.roles.出発点?.values[0];if(!n||n.kind===`場所・向き`&&!(n.name in Qe)||n.kind!==`場所・向き`&&n.kind!==`位置`&&n.kind!==`位置の式`){let t=n??e;throw new E(`ここからは出せません。`,t.start,t.end)}return{targets:t,from:n}}function $r(e,t,n){let r=n.every;if(!r)return;let{count:i}=r,{action:a}=n,o={start:n.start,end:n.end};li(t,a,o),n.body&&ui(t,n.body),e.push({action:a,body:n.body,interval:i.value,next:i.value,source:o})}function ei(e,t,n){return e.gravity.filter(e=>j({kinds:t},e.targets)).reduce((e,t)=>e+Yr(t.strength,n),0)}function ti(e,t,n,r){let i=M(n.roles.対象,n.verb),a=n.roles.上限?.values[0],o=a?.kind===`回数`?a.number:1/0,s=new Map;for(let i of n.roles.対象?.values??[]){if(i.kind!==`もの`||!Er(i.name))continue;let a=t[i.name]?.kinds??[i.name];if(!e.gravity.some(e=>j({kinds:a},e.targets)))throw new E(`「${i.name}」をジャンプさせるには、「${i.name} に 重力 を 〜 だけ かける。」も書いてください。`,i.start,i.end);if(r){let t=n.roles.量?Yr(Vr(n.roles.量),r):120,o=ei(e,a,r);s.set(i.name,o>0&&t>0?Math.sqrt(2*o*t):0)}}return{targets:i,speeds:s,limit:o}}var ni=[`押す`,`触れる`,`よける`,`出る`,`クリックする`,`終わる`,`ドラッグする`,`離す`],ri=[`出す`,`ジャンプ させる`,`書く`,`する`,`終わらせる`,`始める`,`切り替える`,`表示する`,`入れる`,`消す`,`動かす`,`回す`,`向ける`,`鳴らす`,`何度も 鳴らす`,`止める`,`返す`,On],ii=class{value;constructor(e){this.value=e}},ai=[`いる`,`する`],oi=[`かける`,`乗る`,`流す`,`通れない`,`ドラッグ できる`,`追う`];function si(e,t){let{verb:n,start:r,end:i}=e;return at.includes(n)?new E(`「${n}」は、かっこで囲んで値として使います（例：(名前 が 「ゆう」 を 含む)）。`,r,i):ni.includes(n)&&t!==`条件`?new E(`「${n}」は、「〜たら」や「〜 ごと に」の条件の中で使います。`,r,i):t===`条件`?new E(`「${n}」は、今は条件（〜たら、〜 ごと に）には使えません。`,r,i):n===`いる`?new E(`条件の文や「N秒 ごと に」の文では、「いる」は使えません。ものを出すときは「出す」を使います。`,r,i):new E(`「${n}」は、今は条件の文や「N秒 ごと に」の文では使えません。`,r,i)}function ci(e,t){return ri.includes(e)||t.has(e)}function li(e,t,n){if(!ci(t.verb,e.verbs))throw si(t,`動作`);let r=[];if(t.verb===`出す`)r.push(...Qr(t).targets);else if(t.verb===`ジャンプ させる`)r.push(...ti(e.rules,e.templates,t,null).targets);else if(t.verb===`終わらせる`)_i(t,`対象`,`「終わらせる」で終わらせられるのは、ゲームだけです。`);else if(t.verb===`始める`&&t.roles.対象?.values[0]?.kind!==`場面`)_i(t,`対象`,`「始める」で始められるのは、ゲームか場面だけです。`);else if(t.verb===`する`&&!_r(t))Or(e.templates,e.background,t,n);else if(t.verb===`動かす`)Wr(t),r.push(...M(t.roles.対象,t.verb));else if(t.verb===`消す`&&!t.roles.出発点)r.push(...M(t.roles.対象,t.verb));else if(t.verb===`回す`){let e=t.roles.向き?.values[0];if(e?.kind!==`場所・向き`||e.name!==`右`&&e.name!==`左`){let n=e??t;throw new E(`回す向きは、右（時計回り）か左です。`,n.start,n.end)}r.push(...M(t.roles.対象,t.verb))}else if(t.verb===`向ける`){let e=t.roles.向き?.values[0];if(e?.kind===`持ち物`&&e.property!==`ほう`)throw new E(`向けるほうは、「ねこ の ほう に 向ける」か、「90 に 向ける」のように書きます。`,e.start,e.end);r.push(...M(t.roles.対象,t.verb))}for(let t of new Set(r))xr(e.templates,t,n)}function ui(e,t){for(let n of t){if(n.condition?.verb===`たつ`){li(e,n.action,{start:n.start,end:n.end}),n.body&&ui(e,n.body);continue}if(n.condition||n.every)throw new E(`まとまりの中には、「〜たら」や「ごと に」の文は、今は書けません。`,n.start,n.end);let{verb:t}=n.action;if(!ci(t,e.verbs))throw oi.includes(t)?new E(`まとまりの中には、「${t}」の文は、今は書けません。`,n.start,n.end):si(n.action,`動作`);li(e,n.action,{start:n.start,end:n.end}),n.body&&ui(e,n.body)}}function di(){return{left:We,depth:0}}function fi(e,t,n,r){let i=()=>new E(`「${n.verb}」の呼び出しが深すぎます（500段まで）。自分を呼び続けていないか、確かめてください。`,n.start,n.end);if(r.depth>=500)throw i();let a=t.define.params.map(t=>{let[r]=n.roles[rn(t.particle)]?.values??[];return{name:T(t.name.text),data:A(r,e.variables)}}),o=a.map(({name:t})=>({name:t,had:e.variables.has(t),data:e.variables.get(t)}));for(let{name:t,data:n}of a)e.variables.set(t,n);r.depth+=1;try{gi(e,t.body,r);return}catch(e){if(e instanceof ii)return e.value;throw e instanceof RangeError?i():e}finally{--r.depth;for(let{name:t,had:n,data:r}of o)n&&r!==void 0?e.variables.set(t,r):e.variables.delete(t)}}function pi(e,t,n,r){let{loop:i}=t;if(!i){gi(e,n,r);return}let a=()=>{if(--r.left,r.left<0)throw new E(`繰り返しが多すぎます（合わせて${We}回まで）。終わらない繰り返しになっていないか、確かめてください。`,t.start,t.end)};if(i.kind===`1つずつ`){let t=k(i.list,e.variables),o=typeof t==`string`?Array.from(t):t instanceof Map?[...t.keys()]:t;if(!Array.isArray(o))throw new E(`「${w(i.list)}」は、配列でも文字でもありません。`,i.list.start,i.list.end);for(let t of[...o])t instanceof O&&!e.things.some(e=>e.id===t.id)||(a(),e.variables.set(T(i.name.text),t),gi(e,n,r))}else if(i.kind===`回数`)for(let t=0;t<i.count.value;t++)a(),gi(e,n,r);else for(;Zn(i.test,e.variables);)a(),gi(e,n,r)}function mi(e,t){let n=t.condition?.count?.value??0;e.waiting.push({at:e.time+n,sentence:t,scene:e.runningScene,things:e.eventThings,row:e.eventRow})}function hi(e,t,n,r){let i=e.eventThings,a=e.eventRow;e.eventThings=t,e.eventRow=n;try{r()}finally{e.eventThings=i,e.eventRow=a}}function gi(e,t,n=di()){let r=!1;for(let i of t){if(i.condition?.verb===`たつ`){mi(e,i);continue}let{branch:t}=i;if(t){if(t.kind===`なら`&&(r=!1),r||t.kind!==`そうでなければ`&&!Zn(t.test,e.variables))continue;r=!0}i.body?pi(e,i,i.body,n):Oi(e,i.action,{start:i.start,end:i.end},n)}}function _i(e,t,n){let r=e.roles[t]?.values[0];if(!r||r.kind!==`もの`||r.name!==`ゲーム`){let t=r??e;throw new E(n,t.start,t.end)}}function vi(e,t,n){let{condition:r,action:i}=n;if(!r||r.verb===`たつ`)return;if(!ni.includes(r.verb))throw si(r,`条件`);let a={start:n.start,end:n.end},o=r.roles.対象?.values[0];if(r.verb===`クリックする`&&o?.kind===`持ち物`){if(o.property!==`行`)throw new E(`クリックしたときに分かるのは、一覧の行だけです（買い物 の 行 を クリックしたら）。`,o.start,o.end);for(let e of o.owners){if(t.templates[e]?.part!==`一覧`)throw new E(`「${e}」は一覧ではありません。行があるのは一覧だけです（〜 という 一覧 を 作る。）。`,o.start,o.end);xr(t.templates,e,a)}}else if([`触れる`,`よける`,`出る`,`クリックする`,`ドラッグする`,`離す`].includes(r.verb)){let e=[r.roles.主語,r.roles.相手,r.roles.対象].filter(e=>e!==void 0&&e.values[0]?.kind!==`画面`).flatMap(e=>M(e,r.verb));for(let n of new Set(e))xr(t.templates,n,a)}else if(r.verb===`終わる`)_i(r,`主語`,`「終わる」の前に書けるのは、ゲームだけです（ゲーム が 終わったら）。`);else if(r.verb===`押す`&&r.roles.場所){for(let e of M(r.roles.場所,r.verb)){if(t.templates[e]?.part!==`欄`){let t=r.roles.場所.phrase;throw new E(`「で」の前には、欄を書きます。「${e}」は欄ではありません（〜 という 欄 を 作る。）。`,t.start,t.end)}xr(t.templates,e,a)}let e=(r.roles.対象?.values??[]).find(e=>e.kind!==`キー`||e.name!==`エンター`);if(e)throw new E(`欄で押したときに分かるのは、エンターだけです（品物欄 で エンター を 押したら）。`,e.start,e.end)}li(t,i,a),n.body&&ui(t,n.body),e.push({condition:r,action:i,body:n.body,seen:0,touching:[],touchedEver:new Set,dodged:new Set,entered:new Set,exited:new Set,source:a})}function yi(e){let{count:t,kind:n}=e.condition;return t?n===`たら`?e.seen===t.value:e.seen%t.value===0:!0}function bi(e,t,{pressed:n,clicks:r,entered:i,grabbed:a,released:o}){let{condition:s}=t;if(s.verb===`ドラッグする`||s.verb===`離す`){let e=M(s.roles.対象,s.verb);return(s.verb===`ドラッグする`?a:o).filter(t=>j(t,e)).map(e=>[e])}if(s.verb===`クリックする`){let t=s.roles.対象?.values[0];if(t?.kind===`画面`)return r.map(()=>[]);if(t?.kind===`持ち物`)return r.flatMap(n=>{let r=[...e.things].reverse().find(r=>t.owners.some(e=>r.kinds.includes(e))&&xi(r,fr(e,r,n))),i=r?Ir(r,fr(e,r,n).y):-1;if(!r||i===-1)return[];let a=[r];return Lr.set(a,r.items[i]),[a]});let n=M(s.roles.対象,s.verb);return r.flatMap(t=>{let r=[...e.things].reverse().find(r=>j(r,n)&&xi(r,fr(e,r,t)));return r?[[r]]:[]})}if(s.verb===`押す`&&s.roles.場所){let t=M(s.roles.場所,s.verb);return i.flatMap(n=>{let r=e.things.find(e=>e.id===n&&j(e,t));return r?[[r]]:[]})}if(s.verb===`押す`)return(s.roles.対象?.values??[]).filter(e=>e.kind===`キー`&&n.includes(e.name)).map(()=>[]);if(s.verb===`触れる`){let n=M(s.roles.主語,s.verb),r=M(s.roles.相手,s.verb),i=s.roles.出発点?.values[0],a=i?.kind===`場所・向き`?i.name:null,o=[],c=[],l=new Set(t.touching),u=e.things.filter(e=>j(e,n)),d=e.things.filter(e=>j(e,r));for(let t of u)for(let n of d){if(t===n)continue;let r=`${t.id}-${n.id}`,i=e.contacts.get(r);if((i||Gi(t,n))&&(o.push(r),!l.has(r))){let e=i??Hi(t,n);(a===null||e===a||a===`横`&&(e===`左`||e===`右`))&&c.push([t,n])}}return t.touching=o,c}if(s.verb===`よける`){let n=M(s.roles.主語,s.verb),r=M(s.roles.対象,s.verb),i=[],a=e.things.filter(e=>j(e,n)),o=e.things.filter(e=>j(e,r));for(let e of a)for(let n of o){if(e===n)continue;let r=`${e.id}-${n.id}`;Gi(e,n)?t.touchedEver.add(r):n.x+n.width<e.x&&!t.touchedEver.has(r)&&!t.dodged.has(r)&&(t.dodged.add(r),i.push([e,n]))}return i}if(s.verb===`出る`){let n=M(s.roles.主語,s.verb),r=s.roles.出発点?.values[0],i=r?.kind===`画面`?r.side:null,a=r?.kind===`画面`&&(r.world??!1),o=[];for(let r of e.things){if(!j(r,n))continue;let s=Si(r,r.part===``?a?{x:0,y:0,...e.world}:{...e.camera,...e.screen}:{x:0,y:0,...e.screen});s.length===0?(t.entered.add(r.id),t.exited.delete(r.id)):t.entered.has(r.id)&&!t.exited.has(r.id)&&(i===null||s.includes(i))&&(t.exited.add(r.id),o.push([r]))}return o}return[]}function xi(e,t){return t.x>=e.x&&t.x<e.x+e.width&&t.y>=e.y&&t.y<e.y+e.height}function Si(e,t){let n=[];return e.x+e.width<=t.x&&n.push(`左`),e.x>=t.x+t.width&&n.push(`右`),e.y+e.height<=t.y&&n.push(`上`),e.y>=t.y+t.height&&n.push(`下`),n}function Ci(e,t,n=[]){if(t.seen+=1,yi(t)){let r=e.eventThings,i=e.eventRow;e.eventThings=n,e.eventRow=Lr.get(n);try{Di(e,t.body,t.action,t.source)}finally{e.eventThings=r,e.eventRow=i}}}function wi(e,t){let n=t.roles.対象?.values??[],r=M(t.roles.対象,t.verb),i=n.some(e=>e.kind===`もの`&&e.that);if(i&&e.eventThings.length===0){let e=n[0]??t;throw new E(`「その」は、「〜たら」の中で、条件に出てきたもの（触れた岩など）を指すときに使います。`,e.start,e.end)}let a=i?e.eventThings:e.things,o=n.filter(e=>e.kind===`名前`||e.kind===`式`).map(t=>Ti(e,t));return[...a.filter(t=>j(t,r)&&e.things.includes(t)),...o]}function Ti(e,t){let n=A(t,e.variables),r=t.kind===`名前`?t.name:t.kind===`式`?w(t.expr):`これ`;if(n===null)throw new E(`「${r}」は、今は何も入っていません（なし）。`,t.start,t.end);if(!(n instanceof O))throw new E(`「${r}」は、画面のものではありません。`,t.start,t.end);let i=e.things.find(e=>e.id===n.id);if(!i)throw new E(`「${r}」は、もう消えています。`,t.start,t.end);return i}function Ei(e,t){let[n]=t.owners;if(t.pick===`名前`)return Ti(e,{kind:`名前`,name:n,start:t.start,end:t.end});let r=e.eventThings.find(t=>t.kinds.includes(n)&&e.things.includes(t));if(!r)throw new E(e.eventThings.length===0?`「その」は、「〜たら」の中で、条件に出てきたもの（触れた岩など）を指すときに使います。`:`「その ${n}」は、もう消えています。`,t.start,t.end);return r}function Di(e,t,n,r){t?gi(e,t):Oi(e,n,r)}function Oi(e,t,n,r=di()){let i=e.verbs.get(t.verb);if(i)fi(e,i,t,r);else{if(t.verb===`返す`){if(r.depth===0)throw new E(`「返す」は、作った動詞（〜 とは：）の中で使います。`,t.start,t.end);let[n]=t.roles.対象?.values??[];throw new ii(A(n,e.variables))}if(t.verb===`ジャンプ させる`){let{speeds:n,limit:r}=ti(e.rules,e.templates,t,e.variables);for(let t of e.things){let e=[...n.keys()].find(e=>t.kinds.includes(e)),i=e===void 0?void 0:n.get(e);i!==void 0&&t.jumps<r&&(t.vy=-i,t.jumps+=1)}}else if(t.verb===`終わらせる`){if(!e.over){e.over=!0;for(let t of e.triggers)t.condition.verb===`終わる`&&Ci(e,t)}}else if(t.verb===`始める`&&t.roles.対象?.values[0]?.kind===`場面`)e.pendingScene=t.roles.対象.values[0].name;else if(t.verb===`回す`){let n=t.roles.向き?.values[0],r=n?.kind===`場所・向き`&&n.name===`左`?-1:1,i=Yr(Vr(t.roles.量),e.variables);for(let n of wi(e,t))n.angle=Ar(n.angle+r*i)}else if(t.verb===`向ける`){let n=t.roles.向き?.values[0];for(let r of wi(e,t))if(n?.kind===`持ち物`){let t=n.pick?Ei(e,n):e.things.find(e=>n.owners.some(t=>e.kinds.includes(t)));if(!t)throw new E(`「${n.owners[0]}」は、今は画面にありません。`,n.start,n.end);let i=t.x+t.width/2-(r.x+r.width/2),a=t.y+t.height/2-(r.y+r.height/2);(i!==0||a!==0)&&(r.angle=Ar(Math.atan2(i,-a)*180/Math.PI))}else n&&(r.angle=Ar(Yr(n,e.variables)))}else if(t.verb===`鳴らす`||t.verb===`何度も 鳴らす`)for(let n of t.roles.対象?.values??[]){let r=A(n,e.variables);if(typeof r!=`string`)throw new E(`鳴らす音には、文字（「ジャンプ.mp3」のような、ファイルの名前）を書きます。`,n.start,n.end);e.sounds.push({kind:t.verb===`鳴らす`?`鳴らす`:`何度も`,name:r,scene:e.runningScene})}else if(t.verb===`止める`)e.sounds.push({kind:`止める`});else if(t.verb===`切り替える`){let[n]=t.roles.相手?.values??[];n?.kind===`場面`&&(e.pendingScene=n.name)}else if(t.verb===`始める`)e.over&&ji(e);else if(t.verb===`する`&&_r(t)){let[n]=t.roles.対象?.values??[],r=t.roles.値?.values??[],i=r.length===1&&r[0].kind===`模様の値`&&r[0].name===`なし`?null:r.length>=2?r.map(t=>A(t,e.variables)):A(r[0],e.variables);n?.kind===`名前`?e.variables.set(n.name,i):n?.kind===`式`&&(n.expr.kind===`番目`||n.expr.kind===`見出し`)?Jn(n.expr,i,e.variables):n?.kind===`式`&&n.expr.kind===`項目`&&qn(n.expr,i,e.variables)}else if(t.verb===`動かす`)Gr(e,t);else if(t.verb===`消す`&&t.roles.出発点){let[n]=t.roles.出発点.values;if(n?.kind===`名前`)for(let r of t.roles.対象?.values??[])Xn(n.name,n,A(r,e.variables),e.variables)}else if(t.verb===`消す`){let n=new Set(wi(e,t));e.things=e.things.filter(e=>!n.has(e))}else if(t.verb===`入れる`){let[n]=t.roles.相手?.values??[];if(n?.kind===`名前`)for(let r of t.roles.対象?.values??[])Yn(n.name,n,A(r,e.variables),e.variables)}else if(t.verb===`表示する`)for(let n of t.roles.対象?.values??[])e.output.push(ar(A(n,e.variables)));else if(t.verb===`する`)Dr(e.templates,e.background,t,e.things,e.variables,t=>Ei(e,t));else if(t.verb===`書く`){let r=t.roles.場所?.values[0],i=null,a=null;r?.kind===`位置`?(i=r.x,a=r.y===null?e.screen.height/2:e.screen.height-r.y):r?.kind===`位置の式`&&(i=Hr(r.x,e.variables),a=r.y===null?e.screen.height/2:e.screen.height-Hr(r.y,e.variables));let o=t.roles.値?.values??[],s=o.find(e=>e.kind===`色の値`),c=o.find(e=>e.kind===`文字の大きさ`),l={...s?.kind===`色の値`?{color:s.name}:{},...c?.kind===`文字の大きさ`?{size:c.number}:{}},u=t.roles.量?.values[0],d=u?.kind===`秒数`?e.time+u.number:null;for(let r of t.roles.対象?.values??[])r.kind===`文字`?e.texts.push({text:r.text,value:null,x:i,y:a,until:d,source:n,scene:e.runningScene,...l}):e.texts.push({text:ar(A(r,e.variables)),value:r,x:i,y:a,until:d,source:n,scene:e.runningScene,...l})}if(t.verb===`出す`){let{targets:n,from:r}=Qr(t),i=Cr(e.things,e.rules,e.world);for(let t of n){let n=e.templates[t],{x:a,y:o}=wr(r,n.height,i,dr(e,n.part!==``),e.variables),s=Rr(e,n,t,a,o,null);s.scene=e.runningScene,e.things.push(s)}}}}function ki(e){e.variables.reader={thing(t,n,r){let i=t instanceof O?e.things.find(e=>e.id===t.id):void 0;if(t instanceof O&&!i)throw new E(`「${w(r.kind===`様子`?r.thing:r)}」は、もう消えています。`,r.start,r.end);let a=t instanceof O?t.kind:t;if(et[a]===`マウス`)return n===`横`?e.mouse.x+e.camera.x:e.world.height-(e.mouse.y+e.camera.y);let o=i??e.things.find(e=>e.kinds.includes(a)),s=o??e.templates[a];if(!o&&(n===`横`||n===`縦`))throw new E(`「${a}」は、今は画面にありません。`,r.start,r.end);if(!s)throw new E(`「${a}」は、画面のものではありません。`,r.start,r.end);switch(n){case`横`:return o?o.x:0;case`縦`:return o?dr(e,o.part!==``).height-(o.y+o.height):0;case`幅`:case`大きさ`:return s.width;case`言葉`:return s.label;case`向き`:return s.angle;default:return s.height}},held:t=>e.heldKeys.includes(t),center(t,n){let r=t instanceof O?t.kind:t,i=t instanceof O?e.things.find(e=>e.id===t.id):e.things.find(e=>e.kinds.includes(r));if(!i)throw new E(t instanceof O?`「${w(n)}」は、もう消えています。`:`「${r}」は、今は画面にありません。`,n.start,n.end);return{x:i.x+i.width/2,y:i.y+i.height/2}},row(t){if(e.eventRow===void 0)throw new E(`「その 行」は、「買い物 の 行 を クリックしたら」の中で、クリックした行の中身を指すときに使います。`,t.start,t.end);return e.eventRow},that(t,n){if(e.eventThings.length===0)throw new E(`「その」は、「〜たら」の中で、条件に出てきたもの（触れた岩など）を指すときに使います。`,n.start,n.end);let r=e.eventThings.find(e=>e.kinds.includes(t));if(!r)throw new E(`条件に、「${t}」は出てきていません。`,n.start,n.end);return new O(r.id,r.name)},list(t){return br(e.templates,t).length?e.things.filter(e=>e.kinds.includes(t)).sort((e,t)=>e.id-t.id).map(e=>new O(e.id,e.name)):null},fields(t,n){if(t instanceof O){let r=e.things.find(e=>e.id===t.id);if(!r)throw new E(`「${w(n)}」は、もう消えています。`,n.start,n.end);return r.fields}let r=e.things.filter(e=>e.kinds.includes(t));if(r.length===0)throw new E(`「${t}」は、今は画面にありません。`,n.start,n.end);if(r.length>=2)throw new E(`「${t}」が${r.length}つあります。「その ${t}」か、1つを入れた名前で指します（${t} を 1つずつ 〜 に 入れて 繰り返す：）。`,n.start,n.end);return r[0].fields},call(t,n){let r=e.verbs.get(t.verb),i=r?fi(e,r,t,di()):void 0;if(i===void 0)throw new E(`「${t.verb}」は、値を返しませんでした。中で「〜 を 返す。」を書きます。`,n.start,n.end);return i}}}function Ai(e){let t=new Map;for(let n of e.sentences){if(!n.record)continue;let r=new Map;for(let[t,{initial:i}]of Object.entries(n.record.fields)){let n=i.map(t=>A(t,e.variables));r.set(t,i.length>=2?n:n[0])}t.set(n.record.name,r)}t.size>0&&(e.variables.records=In(t))}function ji(e){let t=Bi(e.sentences);t.heldKeys=e.heldKeys,t.mouse=e.mouse,t.sounds.unshift({kind:`止める`}),Object.assign(e,t),ki(e)}function Mi(e,t){let n=[],r=[];for(let i of e){let{verb:e}=i.action;if(!(i.define||i.action.verb===`作る`)){if(i.always)r.push(i);else if(i.branch){if(!ci(e,t))throw si(i.action,`動作`);n.push(i)}else if(i.condition?.verb===`たつ`)n.push(i);else if(!(i.condition||i.every||oi.includes(e))&&(!ai.includes(e)||_r(i.action)||gr(i.action))){if(!ci(e,t))throw si(i.action,`動作`);n.push(i)}}}return{once:n,frames:r}}function Ni(e,t){return{gravity:[...e.gravity,...t.gravity],stand:[...e.stand,...t.stand],flow:[...e.flow,...t.flow],walls:[...e.walls,...t.walls],drag:[...e.drag,...t.drag],camera:t.camera.length>0?t.camera:e.camera}}function Pi(e,t,n){let{once:r,frames:i}=Mi(e,n),a=e.filter(e=>vr(e)&&e.action.verb===`する`),o=e.filter(e=>r.includes(e)||a.includes(e)),s={gravity:[],stand:[],flow:[],walls:[],drag:[],camera:[]};for(let n of e.filter(Br))Zr(s,t.templates,n);let c={...t,rules:Ni(t.rules,s)};ui(c,i);let l=[],u=[];for(let t of e)t.condition===null&&t.every!==null&&$r(l,c,t),vi(u,c,t);for(let e of o)li(c,e.action,{start:e.start,end:e.end}),e.body&&ui(c,e.body);return{once:o,placings:e.filter(e=>vr(e)&&e.action.verb===`いる`),frames:i,timers:l,triggers:u,rules:s,shown:e.filter(hr)}}function Fi(e,t,n){let r=e.runningScene;e.runningScene=t;try{n()}finally{e.runningScene=r}}function Ii(e){return[[null,e.triggers],[e.scene?.name??null,e.scene?.triggers??[]]]}function Li(e){let t=e.action.roles.場所?.values[0];return t?.kind===`位置`&&t.y!==null}function Ri(e,t){let n=e.scenes.get(t);if(!n)throw Error(`場面「${t}」がありません。`);e.things=e.things.filter(e=>e.scene===null),e.texts=e.texts.filter(e=>(e.scene??null)===null),e.waiting=e.waiting.filter(e=>e.scene===null),e.scene&&e.sounds.push({kind:`片付ける`,scene:e.scene.name}),e.over=!1,e.overFor=0,e.rules=Ni(e.topRules,n.rules),e.scene={name:t,frames:n.frames,shown:n.shown,timers:n.timers.map(t=>({...t,next:e.time+t.interval})),triggers:n.triggers.map(e=>({...e,seen:0,touching:[],touchedEver:new Set,dodged:new Set,entered:new Set,exited:new Set}))},Fi(e,t,()=>{let r=(n,r)=>{for(let i of n)for(let n of zr(e,e.templates,r,e,i))n.scene=t,e.things.push(n)};r(n.placings.filter(Li),e.world.height),r(n.placings.filter(e=>!Li(e)),Cr(e.things,e.rules,e.world)),gi(e,n.once)}),pr(e)}function zi(e){for(let t=0;t<10&&e.pendingScene!==null;t++){let t=e.pendingScene;e.pendingScene=null,Ri(e,t)}}function Bi(e){let t=or(e),{once:n,frames:r}=Mi(e,t),i=e.filter(vr),a=new Set;if(n.some(e=>gr(e.action))){for(let e of i)e.action.verb===`する`&&!Tn(e)&&a.add(e);n.splice(0,n.length,...e.filter(e=>n.includes(e)||a.has(e)))}let o=yr(Sr(e)),s=cr(e),c=lr(e),l={screen:s,world:c,camera:{x:0,y:0}};for(let t of e){let[e]=t.action.verb===`作る`?t.action.roles.対象?.values??[]:[];t.fields&&e?.kind===`名付け`&&o[e.name]&&(o[e.name].fields=t.fields)}let u={color:Ze,image:``,sources:[]};for(let e of i)e.action.verb===`する`&&!Tn(e)&&(Dr(o,u,e.action),Or(o,u,e.action,{start:e.start,end:e.end}));let d={gravity:[],stand:[],flow:[],walls:[],drag:[],camera:[]};for(let t of e.filter(Br))Zr(d,o,t);let f={rules:d,templates:o,background:u,verbs:t};for(let e of t.values())ui(f,e.body);ui(f,r);let p=new Map;for(let n of e)n.scene&&n.body&&p.set(n.scene.name,Pi(n.body,f,t));let m=[];for(let t of e)t.condition===null&&t.every!==null&&$r(m,f,t);let h=[];for(let t of e)vi(h,f,t);for(let e of n)a.has(e)||(li(f,e.action,{start:e.start,end:e.end}),e.body&&ui(f,e.body));let g={nextId:1},_=[],v=i.filter(e=>e.action.verb===`いる`);for(let e of v.filter(Li))_.push(...zr(g,o,c.height,l,e));let y=Cr(_,d,c);for(let e of v.filter(e=>!Li(e)))_.push(...zr(g,o,y,l,e));let ee={sentences:e,time:0,templates:o,background:u,rules:d,timers:m,triggers:h,heldKeys:[],screen:s,world:c,camera:{x:0,y:0},mouse:{x:0,y:s.height},things:_,texts:[],variables:new Map,output:[],eventThings:[],eventRow:void 0,scenes:p,scene:null,topRules:d,pendingScene:null,runningScene:null,sounds:[],waiting:[],contacts:new Map,dragging:null,verbs:t,frames:r,shown:e.filter(hr),nextId:g.nextId,over:!1,overFor:0};return ki(ee),Ai(ee),gi(ee,n),zi(ee),pr(ee),ee}function Vi(e,t){let n=e.heldKeys.includes(`マウス`),r=e.dragging,i=r?e.things.find(e=>e.id===r.id):void 0;if(r&&(!i||!n))e.dragging=null,i&&t.released.push(i);else if(r&&i){let t=fr(e,i,e.mouse);i.x=t.x-r.dx,i.y=t.y-r.dy}if(!e.dragging&&t.pressed.includes(`マウス`)&&e.rules.drag.length>0){let n=t.clicks[0]??e.mouse,r=e.rules.drag.flatMap(e=>e.who),i=[...e.things].reverse().find(t=>j(t,r)&&xi(t,fr(e,t,n)));if(i){let r=fr(e,i,n);e.dragging={id:i.id,dx:r.x-i.x,dy:r.y-i.y},t.grabbed.push(i)}}}function Hi(e,t){let n=Math.min(e.x+e.width,t.x+t.width)-Math.max(e.x,t.x);return Math.min(e.y+e.height,t.y+t.height)-Math.max(e.y,t.y)<=n?e.y+e.height/2<t.y+t.height/2?`上`:`下`:e.x+e.width/2<t.x+t.width/2?`左`:`右`}function Ui(e,t=new Map){e.contacts=new Map;for(let n of e.rules.walls)for(let r of e.things)if(j(r,n.who))for(let i of e.things){if(i===r||!j(i,n.walls))continue;let a=t.get(r)??r.y,o=t.get(i)??i.y,s=a+r.height<=o,c=a>=o+i.height,l=Wi(r,i)&&(s&&r.y+r.height>i.y||c&&r.y<i.y+i.height),u=Gi(r,i);if(!u&&!l)continue;let d=s?`上`:c?`下`:Hi(r,i);if(d===`上`||d===`下`){let t=Math.max(r.x,i.x),a=Math.min(r.x+r.width,i.x+i.width),o=d===`上`?i.y:i.y+i.height;if(e.things.some(e=>e!==r&&e!==i&&j(e,n.walls)&&e.x<=t&&e.x+e.width>=a&&(d===`上`?e.y<o&&e.y+e.height>=o:e.y<=o&&e.y+e.height>o))||d===`上`&&r.vy<0||d===`下`&&r.vy>0){if(!u)continue;d=r.x+r.width/2<i.x+i.width/2?`左`:`右`}}d===`上`?(r.y=i.y-r.height,r.vy>0&&(r.vy=0),r.jumps=0):d===`下`?(r.y=i.y+i.height,r.vy=Math.max(r.vy,0)):r.x=d===`左`?i.x-r.width:i.x+i.width,e.contacts.set(`${r.id}-${i.id}`,d),e.contacts.set(`${i.id}-${r.id}`,{上:`下`,下:`上`,左:`右`,右:`左`}[d])}}function Wi(e,t){return e.x<t.x+t.width&&t.x<e.x+e.width}function Gi(e,t){return Wi(e,t)&&e.y<t.y+t.height&&t.y<e.y+e.height}function Ki(e,t,n){let r=t.y,i=n+e.height<=r,a=e.y+e.height>r;e.vy>=0&&i&&a&&Wi(e,t)&&(e.y=r-e.height,e.vy=0,e.jumps=0)}var qi=1e-9;function Ji(e,t){return e.x+e.width<0||e.y>t.height}function Yi(e){for(let t of e.texts)t.value&&(t.text=ar(A(t.value,e.variables)))}function Xi(e){let t=e=>e===`始める`||e===`切り替える`,n=e=>e.some(e=>t(e.action.verb)||e.body!==null&&n(e.body));return t(e.action.verb)||e.body!==null&&n(e.body)}function Zi(e,t={keys:[]}){Qi(e,t),zi(e),Yi(e)}function Qi(e,t){let n=$e,r=t.keys.filter(t=>!e.heldKeys.includes(t));e.heldKeys=[...t.keys],t.mouse&&(e.mouse=t.mouse);let i={pressed:r,clicks:t.clicks??[],entered:t.entered??[],grabbed:[],released:[]};Vi(e,i);for(let n of t.wheels??[]){let t=[...e.things].reverse().find(t=>t.part===`一覧`&&xi(t,fr(e,t,n)));t&&(t.listTop=Math.min(Math.max(t.listTop+n.dy,0),Fr(t)))}for(let{id:n,text:r}of t.typed??[]){let t=e.things.find(e=>e.id===n&&e.part===`欄`);t&&(t.label=r)}if(e.over){if(e.overFor+=n,e.overFor+qi<.5)return;for(let[t,n]of Ii(e))for(let r of n)if(Xi(r)){for(let n of bi(e,r,i)){if(!e.over||e.pendingScene!==null)break;Fi(e,t,()=>Ci(e,r,n))}if(!e.over||e.pendingScene!==null)return}return}let a=e.scene?.name??null;for(let[t,n]of[[null,e.frames],[a,e.scene?.frames??[]]])Fi(e,t,()=>{for(let t of n){if(e.over)break;t.body?gi(e,t.body):Oi(e,t.action,{start:t.start,end:t.end})}});if(e.over)return;let o=e.time+n;for(let[t,n]of[[null,e.timers],[a,e.scene?.timers??[]]])Fi(e,t,()=>{for(let t of n)for(;t.next<=o+qi;)Di(e,t.body,t.action,t.source),t.next+=t.interval});let s=e.waiting.filter(e=>e.at<=o+qi);if(s.length>0){e.waiting=e.waiting.filter(e=>!s.includes(e));for(let{sentence:t,scene:n,things:r,row:i}of s)Fi(e,n,()=>hi(e,r,i,()=>Di(e,t.body,t.action,{start:t.start,end:t.end})))}for(let t of e.rules.gravity)for(let r of e.things)j(r,t.targets)&&(r.vy+=Yr(t.strength,e.variables)*n);let c=new Map(e.things.map(e=>[e,e.y]));for(let t of e.things)t.y+=t.vy*n;for(let t of e.rules.flow){let r=Yr(t.speed,e.variables);for(let i of e.things)j(i,t.targets)&&(i.x+=t.dx*r*n)}for(let t of e.rules.stand)for(let n of e.things)if(j(n,t.who))for(let r of e.things)r!==n&&j(r,t.on)&&Ki(n,r,c.get(n)??n.y);Ui(e,c);for(let[t,n]of Ii(e))for(let r of n)for(let n of bi(e,r,i)){if(e.over)break;Fi(e,t,()=>Ci(e,r,n))}if(e.things=e.things.filter(t=>!Ji(t,e.world)),pr(e),e.texts=e.texts.filter(e=>e.until===null||e.until>o+qi),!e.over)for(let[t,n]of[[null,e.shown],[a,e.scene?.shown??[]]])Fi(e,t,()=>{for(let t of n)Oi(e,t.action,{start:t.start,end:t.end})});e.time=o}var $i={赤:`#e04040`,青:`#3a6fe0`,緑:`#3aa655`,黄:`#f2c230`,橙:`#f08a24`,紫:`#8a4fd0`,白:`#ffffff`,黒:`#000000`,灰:`#8a8a8a`};function ea(e){return $i[e]??e}var ta=40;function na(e,t){let{x:n,y:r,width:i,height:a}=t,o=(t.scroll%ta+ta)%ta;e.fillStyle=`rgba(0, 0, 0, 0.15)`;for(let t=n+o;t<n+i;t+=ta)e.fillRect(t,r,4,a)}function ra(e,t,n,r){if(t.part===`字`){ia(e,t);return}let{x:i,width:a,height:o}=t,s=r!==null&&r.x>=i&&r.x<i+a&&r.y>=t.y&&r.y<t.y+o,c=t.part===`ボタン`&&s&&r.down,l=c?t.y+2:t.y,u=t.part===`ボタン`?Math.min(10,o/2):4,d=ua(ea(t.color));e.save(),e.beginPath(),e.roundRect(i,l,a,o,u),e.fillStyle=ea(t.color),e.fill(),t.part===`ボタン`&&s&&(e.fillStyle=c?`rgba(0, 0, 0, 0.18)`:d?`rgba(0, 0, 0, 0.07)`:`rgba(255, 255, 255, 0.18)`,e.fill()),e.lineWidth=2,e.strokeStyle=`rgba(0, 0, 0, 0.35)`,e.stroke(),e.restore(),t.part===`欄`?n||sa(e,t):t.part===`一覧`?aa(e,t,s&&r?Ir(t,r.y):-1):la(e,c?{...t,y:l}:t)}function ia(e,t){t.label!==``&&(e.save(),e.font=ma(t.height),e.textAlign=`center`,e.textBaseline=`middle`,e.lineWidth=Math.max(2,t.height/8),e.strokeStyle=`#000000`,e.fillStyle=ea(t.color),pa(e,t.label,t.x+t.width/2,t.y+t.height/2),e.restore())}function aa(e,t,n){e.save(),e.beginPath(),e.rect(t.x,t.y,t.width,t.height),e.clip(),e.font=`18px sans-serif`,e.textBaseline=`middle`;let r=ua(ea(t.color));t.items.forEach((i,a)=>{let o=t.y+4+a*32-t.listTop;o+32<t.y||o>t.y+t.height||(a===n&&(e.fillStyle=r?`rgba(0, 0, 0, 0.06)`:`rgba(255, 255, 255, 0.1)`,e.fillRect(t.x+2,o,t.width-4,32)),e.fillStyle=r?`#1b1b1f`:`#ffffff`,e.fillText(ar(i),t.x+oa,o+16),e.fillStyle=r?`rgba(0, 0, 0, 0.12)`:`rgba(255, 255, 255, 0.15)`,e.fillRect(t.x+6,o+32-1,t.width-12,1))});let i=Fr(t);if(i>0){let n=t.height-8,a=Math.max(20,n*t.height/(t.height+i)),o=t.y+4+(n-a)*t.listTop/i;e.fillStyle=r?`rgba(0, 0, 0, 0.25)`:`rgba(255, 255, 255, 0.3)`,e.beginPath(),e.roundRect(t.x+t.width-8,o,4,a,2),e.fill()}e.restore()}var oa=10;function sa(e,t){let n=Math.max(10,Math.min(20,t.height*.5));e.save(),e.beginPath(),e.rect(t.x+2,t.y,t.width-4,t.height),e.clip(),e.font=`${n}px sans-serif`,e.textBaseline=`middle`,e.fillStyle=ua(ea(t.color))?`#1b1b1f`:`#ffffff`;let r=t.width-20,i=e.measureText(t.label).width,a=i>r?t.x+t.width-oa-i:t.x+oa;e.fillText(t.label,a,t.y+t.height/2),e.restore()}function ca(e,t,n=!1,r=null,i,a=0){if(t.part!==``){ra(e,t,n,r);return}if(t.angle!==0){let o=t.x+t.width/2,s=t.y+t.height/2;e.save(),e.translate(o,s),e.rotate(t.angle*Math.PI/180),e.translate(-o,-s),ca(e,{...t,angle:0},n,r,i,a),e.restore();return}let{x:o,y:s,width:c,height:l}=t,u=t.frames.length>=2?t.frames[Math.floor(a/t.frameGap)%t.frames.length]:t.image,d=u===``?null:i?.(u);d?(e.drawImage(d,o,s,c,l),la(e,t)):(e.fillStyle=ea(t.color),e.beginPath(),t.shape===`丸`?e.ellipse(o+c/2,s+l/2,c/2,l/2,0,0,Math.PI*2):t.shape===`三角`?(e.moveTo(o+c/2,s),e.lineTo(o+c,s+l),e.lineTo(o,s+l),e.closePath()):e.rect(o,s,c,l),e.fill(),t.pattern===`筋`&&na(e,t),la(e,t))}function la(e,t){if(t.label===``)return;let n=Math.max(10,Math.min(22,t.height*.5));e.save(),e.font=`${n}px sans-serif`,e.textAlign=`center`,e.textBaseline=`middle`,e.fillStyle=ua(ea(t.color))?`#1b1b1f`:`#ffffff`,e.fillText(t.label,t.x+t.width/2,t.y+t.height/2),e.restore()}function ua(e){let t=/^#([0-9a-f]{2})([0-9a-f]{2})([0-9a-f]{2})$/i.exec(e);if(!t)return!0;let[n,r,i]=t.slice(1).map(e=>parseInt(e,16));return .299*n+.587*r+.114*i>150}var da=32,fa=48;function pa(e,t,n,r){e.strokeText(t,n,r),e.fillText(t,n,r)}function ma(e){return`bold ${e}px sans-serif`}function ha(e,t,n){let r=(t,n,r)=>{let i=t.size??da;return e.font=ma(i),{text:t,x:n,y:r,width:e.measureText(t.text).width,height:i}},i=t.filter(e=>e.x===null),a=n.height/2-(i.length-1)*fa/2,o=i.map((e,t)=>r(e,n.width/2,a+t*fa));for(let e of t)e.x!==null&&e.y!==null&&o.push(r(e,e.x,e.y));return o}function ga(e,t){e.textAlign=`center`,e.textBaseline=`middle`,e.strokeStyle=`#000000`;for(let n of t){let t=n.text.size??da;e.font=ma(t),e.lineWidth=Math.max(2,t/8),e.fillStyle=n.text.color?ea(n.text.color):`#ffffff`,pa(e,n.text.text,n.x,n.y)}e.textAlign=`start`,e.textBaseline=`alphabetic`}var _a=`#ffd666`,va=4;function ya(e,t,n,r,i,a){e.save(),e.strokeStyle=_a,e.lineWidth=3,e.setLineDash(a?[8,6]:[]),e.strokeRect(t-va,n-va,r+8,i+8),e.restore()}var ba=15,xa=`${ba}px sans-serif`,Sa=20,Ca=8,wa=10,Ta=16;function Ea(e){let t=[e.name];for(let[n,r]of e.fields){let e=ar(r),i=e.length>Ta?`${e.slice(0,Ta)}…`:e;t.push(`｛${n}｝ ${i}`)}return t}function Da(e,t,n,r){let i=e.x+e.width+wa;i+t>r.width&&(i=e.x-wa-t);let a=e.y-n/2;return a=Math.min(Math.max(a,0),r.height-n),{x:Math.min(Math.max(i,0),r.width-t),y:a}}function Oa(e,t,n){let r=Ea(t);e.save(),e.font=xa;let i=Math.max(...r.map(t=>e.measureText(t).width))+16,a=(r.length-1)*Sa+ba+16,{x:o,y:s}=Da(t,i,a,n);e.fillStyle=`rgba(20, 20, 20, 0.85)`,e.fillRect(o,s,i,a),e.strokeStyle=_a,e.lineWidth=2,e.strokeRect(o,s,i,a),e.textBaseline=`top`,r.forEach((t,n)=>{e.fillStyle=n===0?_a:`#ffffff`,e.fillText(t,o+Ca,s+Ca+n*Sa)}),e.restore()}function ka(e){e.save(),e.fillStyle=`rgba(0, 0, 0, 0.55)`,e.fillRect(12,12,150,36),e.fillStyle=`#ffffff`,e.font=`bold 20px sans-serif`,e.textBaseline=`middle`,e.fillText(`⏸ 一時停止中`,24,30),e.restore()}function Aa(e,t,n,r=!1,i){let{width:a,height:o}=t.screen;e.fillStyle=ea(t.background.color),e.fillRect(0,0,a,o);let s=t.background.image===``?null:i?.(t.background.image);s&&e.drawImage(s,0,0,a,o),e.save(),e.translate(-t.camera.x,-t.camera.y);for(let n of t.things)n.part===``&&ca(e,n,!1,null,i,t.time);e.restore();for(let r of t.things)r.part!==``&&ca(e,r,r.id===n?.editing,n?.pointer??null,i,t.time);if(t.over&&(e.fillStyle=`rgba(0, 0, 0, 0.5)`,e.fillRect(0,0,a,o)),n)for(let r of t.things){let i=r.part===``?r.x-t.camera.x:r.x,a=r.part===``?r.y-t.camera.y:r.y;r.id===n.selected?ya(e,i,a,r.width,r.height,!1):n.linked.includes(r.id)&&ya(e,i,a,r.width,r.height,!0)}let c=ha(e,t.texts,t.screen);if(ga(e,c),n){for(let t of c){let r=t.text===n.selectedText;(r||n.linkedTexts.includes(t.text))&&ya(e,t.x-t.width/2,t.y-t.height/2,t.width,t.height,!r)}let r=t.things.find(e=>e.id===n.selected);r&&Oa(e,r.part===``?{...r,x:r.x-t.camera.x,y:r.y-t.camera.y}:r,t.screen)}r&&ka(e)}var ja={" ":`スペース`,Enter:`エンター`,ArrowUp:`上キー`,ArrowDown:`下キー`,ArrowLeft:`左キー`,ArrowRight:`右キー`};function Ma(e){return/^[a-zA-Z]$/.test(e)?e.toUpperCase():ja[e]??null}var Na={主語:`主語`,対象:`対象`,相手:`相手`,場所:`場所`,向き:`場所`,出発点:`場所`,値:`数量・値`,量:`数量・値`,上限:`数量・値`};function Pa(e){let t=[],n=[];for(let r of e)n.push(r),(r.kind===`句点`||r.kind===`コロン`)&&(t.push(n),n=[]);return n.length>0&&t.push(n),t}function Fa(e){return{start:e[0].start,end:e[e.length-1].end}}function Ia(e,t){let n;try{[n]=ve(e)}catch{return[]}if(!n)return[];let r=[],{branch:i,loop:a,define:o,condition:s,every:c,always:l}=n;l&&r.push({start:l.start,end:l.end,kind:`条件の印`});for(let e of[...i?.marks??[],...a?.marks??[],...o?.marks??[]])r.push({start:e.start,end:e.end,kind:`条件の印`});for(let e of o?n.phrases:[])r.push({start:e.start,end:e.end,kind:Na[rn(e.particle)]});a?.kind===`回数`&&r.push({start:a.count.start,end:a.count.end,kind:`数量・値`}),s&&(r.push({...Fa(s.verb),kind:`動作`}),r.push({...Fa(s.ending),kind:`条件の印`}),s.count&&r.push({start:s.count.start,end:s.count.end,kind:`数量・値`})),c&&r.push({start:c.start,end:c.end,kind:`数量・値`}),n.verb.length>0&&r.push({...Fa(n.verb),kind:`動作`});let[u,d]=n.phrases,f=u?.words.kind===`語`&&u.words.tokens.length===1&&u.words.tokens[0].kind===`項目`&&u.particle.text===`を`;if(n.record||f)return r.push({start:u.start,end:u.end,kind:`対象`}),f&&d&&r.push({start:d.start,end:d.end,kind:`数量・値`}),r;try{let e=t.checkOne(n),i=e.condition?[e.condition,e.action]:[e.action];for(let e of i)for(let[t,n]of Object.entries(e.roles))for(let{start:e,end:i}of[n.phrase,...n.more??[]])r.push({start:e,end:i,kind:Na[t]})}catch{}return r}var La=class extends Map{get(e){return super.get(e)??`不明`}};function Ra(e,t=ot){let n;try{n=He(e)}catch{return null}let r=Pa(n),i=[];for(let e of r)try{i.push(...ve(e))}catch{}let a=t;try{a=an(i.filter(e=>e.define),sn(i,t))}catch{}try{a=xn(he(n,e),a)}catch{}let o=$t(a,new La),s=r.flatMap(e=>Ia(e,o));for(let t of Se(e))s.push({...t,kind:`コメント`});return s}var za={赤:`#ff7f7f`,青:`#6fb0ff`,緑:`#7fd18b`,黄:`#ebd66c`,橙:`#f5a65b`,紫:`#c7a2ff`,白:`#e8e8e8`,黒:`#1b1b1f`,灰:`#8a8a8a`},Ba={赤:`#c8383a`,青:`#2a64c9`,緑:`#2f8a3e`,黄:`#9a7400`,橙:`#c2620a`,紫:`#8a3fc9`,白:`#ffffff`,黒:`#1f1f24`,灰:`#6e6e78`},Va={...Ba,赤:`#b8382f`,青:`#2f62b0`,緑:`#3f7f2a`,黄:`#8a5a00`,橙:`#b8560a`,紫:`#8445b0`,黒:`#4a3420`},Ha={夜:{colors:za,background:`#1b1b1f`,ui:{"ui-ground":`#0c0c0f`,"ui-panel":`#17171b`,"ui-panel-2":`#141418`,"ui-raised":`#222228`,"ui-input":`#1b1b20`,"ui-hover":`#23232a`,"ui-border":`#2a2a30`,"ui-border-strong":`#3a3a42`,"ui-text":`#e8e8e8`,"ui-text-muted":`#9a9aa5`,"ui-text-faint":`#77777f`,"ui-accent":`#3d5f8a`,"ui-selected":`#2c3a4f`,"ui-highlight":`#f08a24`,"ui-field":`#f0c040`,"ui-field-bg":`#2a2a20`,"ui-error":`#f07070`,"ui-tint":`rgba(255, 255, 255, 0.14)`,"editor-active-line":`#26262c`,"editor-caret":`#ffffff`,"editor-gutter":`#666670`,"editor-comment":`#7a8494`}},藤:{colors:Ba,background:`#efedf8`,ui:{"ui-ground":`#c9c3e3`,"ui-panel":`#e2def1`,"ui-panel-2":`#dcd8ee`,"ui-raised":`#f4f2fb`,"ui-input":`#faf9fd`,"ui-hover":`#d2cce9`,"ui-border":`#cbc4e3`,"ui-border-strong":`#aea5d3`,"ui-text":`#2a2440`,"ui-text-muted":`#5c5478`,"ui-text-faint":`#8a83a3`,"ui-accent":`#5b3fc4`,"ui-selected":`#cdc2f0`,"ui-highlight":`#6a4fd6`,"ui-field":`#7a40b8`,"ui-field-bg":`#e6defa`,"ui-error":`#c43a3a`,"ui-tint":`rgba(60, 40, 120, 0.10)`,"editor-active-line":`#e3dff3`,"editor-caret":`#2a2440`,"editor-gutter":`#9a93b5`,"editor-comment":`#7d7698`}},紙:{colors:Ba,background:`#ffffff`,ui:{"ui-ground":`#e4e4e8`,"ui-panel":`#f5f5f7`,"ui-panel-2":`#f0f0f3`,"ui-raised":`#ffffff`,"ui-input":`#ffffff`,"ui-hover":`#e6e6eb`,"ui-border":`#dcdce1`,"ui-border-strong":`#c4c4cc`,"ui-text":`#1f1f24`,"ui-text-muted":`#5a5a66`,"ui-text-faint":`#8c8c96`,"ui-accent":`#2f6fd6`,"ui-selected":`#d6e4fb`,"ui-highlight":`#e07a10`,"ui-field":`#946200`,"ui-field-bg":`#f6edcf`,"ui-error":`#c8383a`,"ui-tint":`rgba(0, 0, 0, 0.07)`,"editor-active-line":`#f3f4f7`,"editor-caret":`#1f1f24`,"editor-gutter":`#a0a0aa`,"editor-comment":`#7a8494`}},海:{colors:za,background:`#0d1828`,ui:{"ui-ground":`#070d18`,"ui-panel":`#0f1a2b`,"ui-panel-2":`#0c1626`,"ui-raised":`#16243a`,"ui-input":`#0b1524`,"ui-hover":`#182a42`,"ui-border":`#1c2c44`,"ui-border-strong":`#2b4060`,"ui-text":`#dfe8f5`,"ui-text-muted":`#8fa3bf`,"ui-text-faint":`#61758f`,"ui-accent":`#2f7fd0`,"ui-selected":`#1d3a5e`,"ui-highlight":`#3fb6e0`,"ui-field":`#f0c040`,"ui-field-bg":`#22281c`,"ui-error":`#ff7f7f`,"ui-tint":`rgba(160, 200, 255, 0.12)`,"editor-active-line":`#13223a`,"editor-caret":`#ffffff`,"editor-gutter":`#4f6482`,"editor-comment":`#6f86a6`}},桜:{colors:Ba,background:`#fdf6f8`,ui:{"ui-ground":`#ead3db`,"ui-panel":`#f7ecf0`,"ui-panel-2":`#f3e5eb`,"ui-raised":`#fff8fa`,"ui-input":`#fffafc`,"ui-hover":`#efdbe3`,"ui-border":`#e6cdd6`,"ui-border-strong":`#d4aebc`,"ui-text":`#3a2630`,"ui-text-muted":`#7a5866`,"ui-text-faint":`#a3838f`,"ui-accent":`#c4497a`,"ui-selected":`#f5d3e0`,"ui-highlight":`#d6578a`,"ui-field":`#94620a`,"ui-field-bg":`#f8ecd2`,"ui-error":`#c8383a`,"ui-tint":`rgba(120, 40, 70, 0.09)`,"editor-active-line":`#f8eaef`,"editor-caret":`#3a2630`,"editor-gutter":`#b8949f`,"editor-comment":`#9a7883`}},向日葵:{colors:Va,background:`#fbf5dc`,ui:{"ui-ground":`#e6d9a8`,"ui-panel":`#f6eecd`,"ui-panel-2":`#f2e8c3`,"ui-raised":`#fffaf0`,"ui-input":`#fffbea`,"ui-hover":`#ece0b2`,"ui-border":`#e2d29e`,"ui-border-strong":`#cdb877`,"ui-text":`#4a3420`,"ui-text-muted":`#7a5f3e`,"ui-text-faint":`#a08a68`,"ui-accent":`#b86a12`,"ui-selected":`#f1dc9a`,"ui-highlight":`#c9781a`,"ui-field":`#8a4a0a`,"ui-field-bg":`#f3e3b8`,"ui-error":`#b8382f`,"ui-tint":`rgba(90, 60, 20, 0.10)`,"editor-active-line":`#f4ebc8`,"editor-caret":`#4a3420`,"editor-gutter":`#b09a72`,"editor-comment":`#9a8360`}}},Ua={主語:`橙`,対象:`緑`,相手:`青`,場所:`紫`,"数量・値":`黄`,動作:`赤`};function Wa(e){let{colors:t}=Ha[e];return Object.fromEntries(Object.entries(Ua).map(([e,n])=>[e,t[n]]))}var Ga={主語:`主語`,対象:`対象`,相手:`相手`,場所:`場所`,数量:`数量・値`,動作:`動作`},Ka={theme:`夜`,roleColors:Wa(`夜`),background:Ha.夜.background,fontSize:18,musicVolume:100,soundVolume:100,hidden:[]};function qa(e,t){return Ha[t].colors[e]??e}function Ja(e,t){e.theme=t,e.background=Ha[t].background,e.roleColors=Wa(t)}function Ya(e,t,n){if(e.length!==1)throw new E(`設定では、値を1つだけ書きます。`,t,n);return e[0]}function Xa(e,t){let n=t.action.roles.対象,r=t.action.roles.値;if(!n||!r)throw new E(`「〜 の 色 を 〜 に する。」のように、「を」と「に」を書きます。`,t.start,t.end);let i=Ya(r.values,r.phrase.start,r.phrase.end);if(n.values.some(e=>e.kind===`テーマ`)){if(i.kind!==`テーマの値`)throw new E(`テーマには、${Ue.join(`・`)} のどれかを書きます。`,i.start,i.end);Ja(e,i.name)}else for(let t of n.values)if(t.kind===`持ち物`){for(let n of t.owners)if(t.property===`色`&&i.kind===`色の値`)n===`背景`?e.background=qa(i.name,e.theme):e.roleColors[Ga[n]]=qa(i.name,e.theme);else if(t.property===`大きさ`&&i.kind===`数`){if(i.number<8||i.number>72)throw new E(`文字の大きさは、8から72までの数で書きます。`,i.start,i.end);e.fontSize=i.number}else if(t.property===`音量`&&i.kind===`数`){if(i.number<0||i.number>100)throw new E(`音量は、0から100までの数で書きます。`,i.start,i.end);n===`音楽`?e.musicVolume=i.number:e.soundVolume=i.number}}}function Za(e){return e.action.verb===`する`&&(e.action.roles.対象?.values.some(e=>e.kind===`テーマ`)??!1)}function Qa(e){let t={...Ka,roleColors:{...Ka.roleColors},hidden:[]};for(let n of e)Za(n)&&!n.condition&&!n.every&&!n.branch&&Xa(t,n);for(let n of e){if(n.condition||n.every||n.branch)throw new E(`設定の文には、「〜たら」「ごと に」「なら」は書けません。`,n.start,n.end);if(n.action.verb===`隠す`)for(let e of n.action.roles.対象?.values??[])e.kind===`部品`&&!t.hidden.includes(e.name)&&t.hidden.push(e.name);else n.action.verb===`する`&&!Za(n)&&Xa(t,n)}return t}var $a={主語:`--role-subject`,対象:`--role-object`,相手:`--role-partner`,場所:`--role-place`,"数量・値":`--role-amount`,動作:`--role-action`};function eo(e){let t={"--editor-background":e.background,"--editor-font-size":`${e.fontSize}px`};for(let[n,r]of Object.entries(Ha[e.theme].ui))t[`--${n}`]=r;for(let[n,r]of Object.entries($a))t[r]=e.roleColors[n];return t}function to(e){return Qa(Cn(he(He(e)),ct))}var no=[],ro=[];(()=>{let e=`lc,34,7n,7,7b,19,,,,2,,2,,,20,b,1c,l,g,,2t,7,2,6,2,2,,4,z,,u,r,2j,b,1m,9,9,,o,4,,9,,3,,5,17,3,1n,9,16,o,,x,1i,3,,i,,7,a,2,t,3,1k,,,7,2,2,2,3,9,,a,2,q,,2,3,1k,,,5,4,2,2,3,3,,u,2,3,,b,3,1k,,,8,,3,,3,k,2,m,6,,3,1k,,,7,2,2,2,3,7,3,a,2,u,,1n,5,3,3,,4,9,,14,5,1j,,,7,,3,,4,7,2,b,2,t,3,1k,,,7,,3,,4,7,2,b,2,f,,c,4,1j,2,,7,,3,,4,9,,a,2,t,3,1y,,4,6,,,,8,i,2,1p,,,8,c,8,2q,,,a,b,7,21,2,r,,,,,,4,2,1d,k,,2,5,b,,10,9,,2u,b,,6,n,4,4,3,g,4,d,,,3,6,,f,,jj,3,qa,4,s,3,t,2,u,2,1s,w,9,,19,3,,,39,2,y,,3a,c,4,c,63,5,1l,a,,,,,2,o,2,,1c,1a,2,c,k,5,1b,h,12,9,c,3,u,d,1k,e,1c,k,48,3,,l,4,,6,,2,3,5i,1s,ek,,5f,x,2da,3,3x,,2o,w,fe,6,2x,2,n9w,4,,a,w,2,28,2,7k,,3,,4,,n,5,4,,2b,2,1e,i,q,i,d,,12,8,p,d,18,4,1b,e,10,,1v,e,c,,8,2,1a,,1f,,,3,2,2,5,2,,,15,5,5,2,6k,8,,2,fn4,,kh,g,g,g,a6,2,gt,,6a,,45,5,1ae,3,,2,5,4,14,3,4,,4l,2,fx,4,1t,5,8t,2,25,6,1y,b,1d,4,3e,3,1h,f,15,,2,2,a,4,19,b,7,,1p,3,10,e,g,2,18,,c,3,1c,e,8,4,,2,2k,c,6,,2,,4d,c,l,4,1j,2,,7,2,2,2,3,9,,a,2,2,7,3,5,1v,9,,,2,,,4,,5,,,e,2,2a,i,n,,29,k,6j,7,2,9,r,2,2a,h,2y,d,2t,3,2,a,74,f,6t,6,,2,2,4,,,,2,3x,7,2,7,3,,s,a,14,7,,4,8,,9,b,1a,g,5i,8,5j,8,,8,2a,m,,e,3e,6,3,,,2,,7,,,1u,5,,2,,5,9n,4,9,2,,,1c,7,3,5,n,,44l,,6,f,8ug,i,1xc,5,1n,7,t4,,,1j,7,4,29,,b,2,f57,2,3mp,1a,2,n,f2,5,3,6,8,8,2,7,u,4,44,3,1iz,1j,4,1e,8,,e,,m,5,,f,11s,7,,h,2,7,,2,,5,2s,,4g,7,af,,1p,4,e4,4,72,2,6r,,2,,7,2,5,,d6,7,31,7,240,5`.split(`,`).map(e=>e?parseInt(e,36):1);for(let t=0,n=0;t<e.length;t++)(t%2?ro:no).push(n+=e[t])})();function io(e){if(e<768)return!1;for(let t=0,n=no.length;;){let r=t+n>>1;if(e<no[r])n=r;else if(e>=ro[r])t=r+1;else return!0;if(t==n)return!1}}function ao(e){return e>=127462&&e<=127487}var oo=8205;function so(e,t,n=!0,r=!0){return(n?co:lo)(e,t,r)}function co(e,t,n){if(t==e.length)return t;t&&fo(e.charCodeAt(t))&&po(e.charCodeAt(t-1))&&t--;let r=uo(e,t);for(t+=mo(r);t<e.length;){let i=uo(e,t);if(r==oo||i==oo||n&&io(i))t+=mo(i),r=i;else if(ao(i)){let n=0,r=t-2;for(;r>=0&&ao(uo(e,r));)n++,r-=2;if(n%2==0)break;t+=2}else break}return t}function lo(e,t,n){for(;t>1;){let r=co(e,t-2,n);if(r<t)return r;t--}return 0}function uo(e,t){let n=e.charCodeAt(t);if(!po(n)||t+1==e.length)return n;let r=e.charCodeAt(t+1);return fo(r)?(n-55296<<10)+(r-56320)+65536:n}function fo(e){return e>=56320&&e<57344}function po(e){return e>=55296&&e<56320}function mo(e){return e<65536?1:2}var N=class e{lineAt(e){if(e<0||e>this.length)throw RangeError(`Invalid position ${e} in document of length ${this.length}`);return this.lineInner(e,!1,1,0)}line(e){if(e<1||e>this.lines)throw RangeError(`Invalid line number ${e} in ${this.lines}-line document`);return this.lineInner(e,!0,1,0)}replace(e,t,n){[e,t]=wo(this,e,t);let r=[];return this.decompose(0,e,r,2),n.length&&n.decompose(0,n.length,r,3),this.decompose(t,this.length,r,1),go.from(r,this.length-(t-e)+n.length)}append(e){return this.replace(this.length,this.length,e)}slice(e,t=this.length){[e,t]=wo(this,e,t);let n=[];return this.decompose(e,t,n,0),go.from(n,t-e)}eq(e){if(e==this)return!0;if(e.length!=this.length||e.lines!=this.lines)return!1;let t=this.scanIdentical(e,1),n=this.length-this.scanIdentical(e,-1),r=new bo(this),i=new bo(e);for(let e=t,a=t;;){if(r.next(e),i.next(e),e=0,r.lineBreak!=i.lineBreak||r.done!=i.done||r.value!=i.value)return!1;if(a+=r.value.length,r.done||a>=n)return!0}}iter(e=1){return new bo(this,e)}iterRange(e,t=this.length){return new xo(this,e,t)}iterLines(e,t){let n;if(e==null)n=this.iter();else{t??=this.lines+1;let r=this.line(e).from;n=this.iterRange(r,Math.max(r,t==this.lines+1?this.length:t<=1?0:this.line(t-1).to))}return new So(n)}toString(){return this.sliceString(0)}toJSON(){let e=[];return this.flatten(e),e}constructor(){}static of(t){if(t.length==0)throw RangeError(`A document must have at least one line`);return t.length==1&&!t[0]?e.empty:t.length<=32?new ho(t):go.from(ho.split(t,[]))}},ho=class e extends N{constructor(e,t=_o(e)){super(),this.text=e,this.length=t}get lines(){return this.text.length}get children(){return null}lineInner(e,t,n,r){for(let i=0;;i++){let a=this.text[i],o=r+a.length;if((t?n:o)>=e)return new Co(r,o,n,a);r=o+1,n++}}decompose(t,n,r,i){let a=t<=0&&n>=this.length?this:new e(yo(this.text,t,n),Math.min(n,this.length)-Math.max(0,t));if(i&1){let t=r.pop(),n=vo(a.text,t.text.slice(),0,a.length);if(n.length<=32)r.push(new e(n,t.length+a.length));else{let t=n.length>>1;r.push(new e(n.slice(0,t)),new e(n.slice(t)))}}else r.push(a)}replace(t,n,r){if(!(r instanceof e))return super.replace(t,n,r);[t,n]=wo(this,t,n);let i=vo(this.text,vo(r.text,yo(this.text,0,t)),n),a=this.length+r.length-(n-t);return i.length<=32?new e(i,a):go.from(e.split(i,[]),a)}sliceString(e,t=this.length,n=`
`){[e,t]=wo(this,e,t);let r=``;for(let i=0,a=0;i<=t&&a<this.text.length;a++){let o=this.text[a],s=i+o.length;i>e&&a&&(r+=n),e<s&&t>i&&(r+=o.slice(Math.max(0,e-i),t-i)),i=s+1}return r}flatten(e){for(let t of this.text)e.push(t)}scanIdentical(){return 0}static split(t,n){let r=[],i=-1;for(let a of t)r.push(a),i+=a.length+1,r.length==32&&(n.push(new e(r,i)),r=[],i=-1);return i>-1&&n.push(new e(r,i)),n}},go=class e extends N{constructor(e,t){super(),this.children=e,this.length=t,this.lines=0;for(let t of e)this.lines+=t.lines}lineInner(e,t,n,r){for(let i=0;;i++){let a=this.children[i],o=r+a.length,s=n+a.lines-1;if((t?s:o)>=e)return a.lineInner(e,t,n,r);r=o+1,n=s+1}}decompose(e,t,n,r){for(let i=0,a=0;a<=t&&i<this.children.length;i++){let o=this.children[i],s=a+o.length;if(e<=s&&t>=a){let i=r&(a<=e|(s>=t?2:0));a>=e&&s<=t&&!i?n.push(o):o.decompose(e-a,t-a,n,i)}a=s+1}}replace(t,n,r){if([t,n]=wo(this,t,n),r.lines<this.lines)for(let i=0,a=0;i<this.children.length;i++){let o=this.children[i],s=a+o.length;if(t>=a&&n<=s){let c=o.replace(t-a,n-a,r),l=this.lines-o.lines+c.lines;if(c.lines<l>>4&&c.lines>l>>6){let a=this.children.slice();return a[i]=c,new e(a,this.length-(n-t)+r.length)}return super.replace(a,s,c)}a=s+1}return super.replace(t,n,r)}sliceString(e,t=this.length,n=`
`){[e,t]=wo(this,e,t);let r=``;for(let i=0,a=0;i<this.children.length&&a<=t;i++){let o=this.children[i],s=a+o.length;a>e&&i&&(r+=n),e<s&&t>a&&(r+=o.sliceString(e-a,t-a,n)),a=s+1}return r}flatten(e){for(let t of this.children)t.flatten(e)}scanIdentical(t,n){if(!(t instanceof e))return 0;let r=0,[i,a,o,s]=n>0?[0,0,this.children.length,t.children.length]:[this.children.length-1,t.children.length-1,-1,-1];for(;;i+=n,a+=n){if(i==o||a==s)return r;let e=this.children[i],c=t.children[a];if(e!=c)return r+e.scanIdentical(c,n);r+=e.length+1}}static from(t,n=t.reduce((e,t)=>e+t.length+1,-1)){let r=0;for(let e of t)r+=e.lines;if(r<32){let e=[];for(let n of t)n.flatten(e);return new ho(e,n)}let i=Math.max(32,r>>5),a=i<<1,o=i>>1,s=[],c=0,l=-1,u=[];function d(t){let n;if(t.lines>a&&t instanceof e)for(let e of t.children)d(e);else t.lines>o&&(c>o||!c)?(f(),s.push(t)):t instanceof ho&&c&&(n=u[u.length-1])instanceof ho&&t.lines+n.lines<=32?(c+=t.lines,l+=t.length+1,u[u.length-1]=new ho(n.text.concat(t.text),n.length+1+t.length)):(c+t.lines>i&&f(),c+=t.lines,l+=t.length+1,u.push(t))}function f(){c!=0&&(s.push(u.length==1?u[0]:e.from(u,l)),l=-1,c=u.length=0)}for(let e of t)d(e);return f(),s.length==1?s[0]:new e(s,n)}};N.empty=new ho([``],0);function _o(e){let t=-1;for(let n of e)t+=n.length+1;return t}function vo(e,t,n=0,r=1e9){for(let i=0,a=0,o=!0;a<e.length&&i<=r;a++){let s=e[a],c=i+s.length;c>=n&&(c>r&&(s=s.slice(0,r-i)),i<n&&(s=s.slice(n-i)),o?(t[t.length-1]+=s,o=!1):t.push(s)),i=c+1}return t}function yo(e,t,n){return vo(e,[``],t,n)}var bo=class{constructor(e,t=1){this.dir=t,this.done=!1,this.lineBreak=!1,this.value=``,this.nodes=[e],this.offsets=[t>0?1:(e instanceof ho?e.text.length:e.children.length)<<1]}nextInner(e,t){for(this.done=this.lineBreak=!1;;){let n=this.nodes.length-1,r=this.nodes[n],i=this.offsets[n],a=i>>1,o=r instanceof ho?r.text.length:r.children.length;if(a==(t>0?o:0)){if(n==0)return this.done=!0,this.value=``,this;t>0&&this.offsets[n-1]++,this.nodes.pop(),this.offsets.pop()}else if((i&1)==(t>0?0:1)){if(this.offsets[n]+=t,e==0)return this.lineBreak=!0,this.value=`
`,this;e--}else if(r instanceof ho){let i=r.text[a+(t<0?-1:0)];if(this.offsets[n]+=t,i.length>Math.max(0,e))return this.value=e==0?i:t>0?i.slice(e):i.slice(0,i.length-e),this;e-=i.length}else{let i=r.children[a+(t<0?-1:0)];e>i.length?(e-=i.length,this.offsets[n]+=t):(t<0&&this.offsets[n]--,this.nodes.push(i),this.offsets.push(t>0?1:(i instanceof ho?i.text.length:i.children.length)<<1))}}}next(e=0){return e<0&&(this.nextInner(-e,-this.dir),e=this.value.length),this.nextInner(e,this.dir)}},xo=class{constructor(e,t,n){this.value=``,this.done=!1,this.cursor=new bo(e,t>n?-1:1),this.pos=t>n?e.length:0,this.from=Math.min(t,n),this.to=Math.max(t,n)}nextInner(e,t){if(t<0?this.pos<=this.from:this.pos>=this.to)return this.value=``,this.done=!0,this;e+=Math.max(0,t<0?this.pos-this.to:this.from-this.pos);let n=t<0?this.pos-this.from:this.to-this.pos;e>n&&(e=n),n-=e;let{value:r}=this.cursor.next(e);return this.pos+=(r.length+e)*t,this.value=r.length<=n?r:t<0?r.slice(r.length-n):r.slice(0,n),this.done=!this.value,this}next(e=0){return e<0?e=Math.max(e,this.from-this.pos):e>0&&(e=Math.min(e,this.to-this.pos)),this.nextInner(e,this.cursor.dir)}get lineBreak(){return this.cursor.lineBreak&&this.value!=``}},So=class{constructor(e){this.inner=e,this.afterBreak=!0,this.value=``,this.done=!1}next(e=0){let{done:t,lineBreak:n,value:r}=this.inner.next(e);return t&&this.afterBreak?(this.value=``,this.afterBreak=!1):t?(this.done=!0,this.value=``):n?this.afterBreak?this.value=``:(this.afterBreak=!0,this.next()):(this.value=r,this.afterBreak=!1),this}get lineBreak(){return!1}};typeof Symbol<`u`&&(N.prototype[Symbol.iterator]=function(){return this.iter()},bo.prototype[Symbol.iterator]=xo.prototype[Symbol.iterator]=So.prototype[Symbol.iterator]=function(){return this});var Co=class{constructor(e,t,n,r){this.from=e,this.to=t,this.number=n,this.text=r}get length(){return this.to-this.from}};function wo(e,t,n){return t=Math.max(0,Math.min(e.length,t)),[t,Math.max(t,Math.min(e.length,n))]}function To(e,t,n=!0,r=!0){return so(e,t,n,r)}function Eo(e){return e>=56320&&e<57344}function Do(e){return e>=55296&&e<56320}function Oo(e,t){let n=e.charCodeAt(t);if(!Do(n)||t+1==e.length)return n;let r=e.charCodeAt(t+1);return Eo(r)?(n-55296<<10)+(r-56320)+65536:n}function ko(e){return e<65536?1:2}var Ao=/\r\n?|\n/,jo=(function(e){return e[e.Simple=0]=`Simple`,e[e.TrackDel=1]=`TrackDel`,e[e.TrackBefore=2]=`TrackBefore`,e[e.TrackAfter=3]=`TrackAfter`,e})(jo||={}),Mo=class e{constructor(e){this.sections=e}get length(){let e=0;for(let t=0;t<this.sections.length;t+=2)e+=this.sections[t];return e}get newLength(){let e=0;for(let t=0;t<this.sections.length;t+=2){let n=this.sections[t+1];e+=n<0?this.sections[t]:n}return e}get empty(){return this.sections.length==0||this.sections.length==2&&this.sections[1]<0}iterGaps(e){for(let t=0,n=0,r=0;t<this.sections.length;){let i=this.sections[t++],a=this.sections[t++];a<0?(e(n,r,i),r+=i):r+=a,n+=i}}iterChangedRanges(e,t=!1){Io(this,e,t)}get invertedDesc(){let t=[];for(let e=0;e<this.sections.length;){let n=this.sections[e++],r=this.sections[e++];r<0?t.push(n,r):t.push(r,n)}return new e(t)}composeDesc(e){return this.empty?e:e.empty?this:Ro(this,e)}mapDesc(e,t=!1){return e.empty?this:Lo(this,e,t)}mapPos(e,t=-1,n=jo.Simple){let r=0,i=0;for(let a=0;a<this.sections.length;){let o=this.sections[a++],s=this.sections[a++],c=r+o;if(s<0){if(c>e)return i+(e-r);i+=o}else{if(n!=jo.Simple&&c>=e&&(n==jo.TrackDel&&r<e&&c>e||n==jo.TrackBefore&&r<e||n==jo.TrackAfter&&c>e))return null;if(c>e||c==e&&t<0&&!o)return e==r||t<0?i:i+s;i+=s}r=c}if(e>r)throw RangeError(`Position ${e} is out of range for changeset of length ${r}`);return i}touchesRange(e,t=e){for(let n=0,r=0;n<this.sections.length&&r<=t;){let i=this.sections[n++],a=this.sections[n++],o=r+i;if(a>=0&&r<=t&&o>=e)return r<e&&o>t?`cover`:!0;r=o}return!1}toString(){let e=``;for(let t=0;t<this.sections.length;){let n=this.sections[t++],r=this.sections[t++];e+=(e?` `:``)+n+(r>=0?`:`+r:``)}return e}toJSON(){return this.sections}static fromJSON(t){if(!Array.isArray(t)||t.length%2||t.some(e=>typeof e!=`number`))throw RangeError(`Invalid JSON representation of ChangeDesc`);return new e(t)}static create(t){return new e(t)}},No=class e extends Mo{constructor(e,t){super(e),this.inserted=t}apply(e){if(this.length!=e.length)throw RangeError(`Applying change set to a document with the wrong length`);return Io(this,(t,n,r,i,a)=>e=e.replace(r,r+(n-t),a),!1),e}mapDesc(e,t=!1){return Lo(this,e,t,!0)}invert(t){let n=this.sections.slice(),r=[];for(let e=0,i=0;e<n.length;e+=2){let a=n[e],o=n[e+1];if(o>=0){n[e]=o,n[e+1]=a;let s=e>>1;for(;r.length<s;)r.push(N.empty);r.push(a?t.slice(i,i+a):N.empty)}i+=a}return new e(n,r)}compose(e){return this.empty?e:e.empty?this:Ro(this,e,!0)}map(e,t=!1){return e.empty?this:Lo(this,e,t,!0)}iterChanges(e,t=!1){Io(this,e,t)}get desc(){return Mo.create(this.sections)}filter(t){let n=[],r=[],i=[],a=new zo(this);done:for(let e=0,o=0;;){let s=e==t.length?1e9:t[e++];for(;o<s||o==s&&a.len==0;){if(a.done)break done;let e=Math.min(a.len,s-o);Po(i,e,-1);let t=a.ins==-1?-1:a.off==0?a.ins:0;Po(n,e,t),t>0&&Fo(r,n,a.text),a.forward(e),o+=e}let c=t[e++];for(;o<c;){if(a.done)break done;let e=Math.min(a.len,c-o);Po(n,e,-1),Po(i,e,a.ins==-1?-1:a.off==0?a.ins:0),a.forward(e),o+=e}}return{changes:new e(n,r),filtered:Mo.create(i)}}toJSON(){let e=[];for(let t=0;t<this.sections.length;t+=2){let n=this.sections[t],r=this.sections[t+1];r<0?e.push(n):r==0?e.push([n]):e.push([n].concat(this.inserted[t>>1].toJSON()))}return e}static of(t,n,r){let i=[],a=[],o=0,s=null;function c(t=!1){if(!t&&!i.length)return;o<n&&Po(i,n-o,-1);let r=new e(i,a);s=s?s.compose(r.map(s)):r,i=[],a=[],o=0}function l(t){if(Array.isArray(t))for(let e of t)l(e);else if(t instanceof e){if(t.length!=n)throw RangeError(`Mismatched change set length (got ${t.length}, expected ${n})`);c(),s=s?s.compose(t.map(s)):t}else{let{from:e,to:s=e,insert:l}=t;if(e>s||e<0||s>n)throw RangeError(`Invalid change range ${e} to ${s} (in doc of length ${n})`);let u=l?typeof l==`string`?N.of(l.split(r||Ao)):l:N.empty,d=u.length;if(e==s&&d==0)return;e<o&&c(),e>o&&Po(i,e-o,-1),Po(i,s-e,d),Fo(a,i,u),o=s}}return l(t),c(!s),s}static empty(t){return new e(t?[t,-1]:[],[])}static fromJSON(t){if(!Array.isArray(t))throw RangeError(`Invalid JSON representation of ChangeSet`);let n=[],r=[];for(let e=0;e<t.length;e++){let i=t[e];if(typeof i==`number`)n.push(i,-1);else if(!Array.isArray(i)||typeof i[0]!=`number`||i.some((e,t)=>t&&typeof e!=`string`))throw RangeError(`Invalid JSON representation of ChangeSet`);else if(i.length==1)n.push(i[0],0);else{for(;r.length<e;)r.push(N.empty);r[e]=N.of(i.slice(1)),n.push(i[0],r[e].length)}}return new e(n,r)}static createSet(t,n){return new e(t,n)}};function Po(e,t,n,r=!1){if(t==0&&n<=0)return;let i=e.length-2;i>=0&&n<=0&&n==e[i+1]?e[i]+=t:i>=0&&t==0&&e[i]==0?e[i+1]+=n:r?(e[i]+=t,e[i+1]+=n):e.push(t,n)}function Fo(e,t,n){if(n.length==0)return;let r=t.length-2>>1;if(r<e.length)e[e.length-1]=e[e.length-1].append(n);else{for(;e.length<r;)e.push(N.empty);e.push(n)}}function Io(e,t,n){let r=e.inserted;for(let i=0,a=0,o=0;o<e.sections.length;){let s=e.sections[o++],c=e.sections[o++];if(c<0)i+=s,a+=s;else{let l=i,u=a,d=N.empty;for(;l+=s,u+=c,c&&r&&(d=d.append(r[o-2>>1])),!(n||o==e.sections.length||e.sections[o+1]<0);)s=e.sections[o++],c=e.sections[o++];t(i,l,a,u,d),i=l,a=u}}}function Lo(e,t,n,r=!1){let i=[],a=r?[]:null,o=new zo(e),s=new zo(t);for(let e=-1;;)if(o.done&&s.len||s.done&&o.len)throw Error(`Mismatched change set lengths`);else if(o.ins==-1&&s.ins==-1){let e=Math.min(o.len,s.len);Po(i,e,-1),o.forward(e),s.forward(e)}else if(s.ins>=0&&(o.ins<0||e==o.i||o.off==0&&(s.len<o.len||s.len==o.len&&!n))){let t=s.len;for(Po(i,s.ins,-1);t;){let n=Math.min(o.len,t);o.ins>=0&&e<o.i&&o.len<=n&&(Po(i,0,o.ins),a&&Fo(a,i,o.text),e=o.i),o.forward(n),t-=n}s.next()}else if(o.ins>=0){let t=0,n=o.len;for(;n;)if(s.ins==-1){let e=Math.min(n,s.len);t+=e,n-=e,s.forward(e)}else if(s.ins==0&&s.len<n)n-=s.len,s.next();else break;Po(i,t,e<o.i?o.ins:0),a&&e<o.i&&Fo(a,i,o.text),e=o.i,o.forward(o.len-n)}else if(o.done&&s.done)return a?No.createSet(i,a):Mo.create(i);else throw Error(`Mismatched change set lengths`)}function Ro(e,t,n=!1){let r=[],i=n?[]:null,a=new zo(e),o=new zo(t);for(let e=!1;;)if(a.done&&o.done)return i?No.createSet(r,i):Mo.create(r);else if(a.ins==0)Po(r,a.len,0,e),a.next();else if(o.len==0&&!o.done)Po(r,0,o.ins,e),i&&Fo(i,r,o.text),o.next();else if(a.done||o.done)throw Error(`Mismatched change set lengths`);else{let t=Math.min(a.len2,o.len),n=r.length;if(a.ins==-1){let n=o.ins==-1?-1:o.off?0:o.ins;Po(r,t,n,e),i&&n&&Fo(i,r,o.text)}else o.ins==-1?(Po(r,a.off?0:a.len,t,e),i&&Fo(i,r,a.textBit(t))):(Po(r,a.off?0:a.len,o.off?0:o.ins,e),i&&!o.off&&Fo(i,r,o.text));e=(a.ins>t||o.ins>=0&&o.len>t)&&(e||r.length>n),a.forward2(t),o.forward(t)}}var zo=class{constructor(e){this.set=e,this.i=0,this.next()}next(){let{sections:e}=this.set;this.i<e.length?(this.len=e[this.i++],this.ins=e[this.i++]):(this.len=0,this.ins=-2),this.off=0}get done(){return this.ins==-2}get len2(){return this.ins<0?this.len:this.ins}get text(){let{inserted:e}=this.set,t=this.i-2>>1;return t>=e.length?N.empty:e[t]}textBit(e){let{inserted:t}=this.set,n=this.i-2>>1;return n>=t.length&&!e?N.empty:t[n].slice(this.off,e==null?void 0:this.off+e)}forward(e){e==this.len?this.next():(this.len-=e,this.off+=e)}forward2(e){this.ins==-1?this.forward(e):e==this.ins?this.next():(this.ins-=e,this.off+=e)}},Bo=class e{constructor(e,t,n,r){this.from=e,this.to=t,this.flags=n,this.goalColumn=r}get anchor(){return this.flags&32?this.to:this.from}get head(){return this.flags&32?this.from:this.to}get empty(){return this.from==this.to}get assoc(){return this.flags&8?-1:this.flags&16?1:0}get undirectional(){return(this.flags&64)>0}get bidiLevel(){let e=this.flags&7;return e==7?null:e}map(t,n=-1){let r,i;return this.empty?r=i=t.mapPos(this.from,n):(r=t.mapPos(this.from,1),i=t.mapPos(this.to,-1)),r==this.from&&i==this.to?this:new e(r,i,this.flags,this.goalColumn)}extend(e,t=e,n=0){if(e<=this.anchor&&t>=this.anchor)return P.range(e,t,void 0,void 0,n);let r=Math.abs(e-this.anchor)>Math.abs(t-this.anchor)?e:t;return P.range(this.anchor,r,void 0,void 0,n)}eq(e,t=!1){return this.anchor==e.anchor&&this.head==e.head&&this.goalColumn==e.goalColumn&&(!t||!this.empty||this.assoc==e.assoc)}toJSON(){return{anchor:this.anchor,head:this.head}}static fromJSON(e){if(!e||typeof e.anchor!=`number`||typeof e.head!=`number`)throw RangeError(`Invalid JSON representation for SelectionRange`);return P.range(e.anchor,e.head)}static create(t,n,r,i){return new e(t,n,r,i)}},P=class e{constructor(e,t){this.ranges=e,this.mainIndex=t}map(t,n=-1){return t.empty?this:e.create(this.ranges.map(e=>e.map(t,n)),this.mainIndex)}eq(e,t=!1){if(this.ranges.length!=e.ranges.length||this.mainIndex!=e.mainIndex)return!1;for(let n=0;n<this.ranges.length;n++)if(!this.ranges[n].eq(e.ranges[n],t))return!1;return!0}get main(){return this.ranges[this.mainIndex]}asSingle(){return this.ranges.length==1?this:new e([this.main],0)}addRange(t,n=!0){return e.create([t].concat(this.ranges),n?0:this.mainIndex+1)}replaceRange(t,n=this.mainIndex){let r=this.ranges.slice();return r[n]=t,e.create(r,this.mainIndex)}toJSON(){return{ranges:this.ranges.map(e=>e.toJSON()),main:this.mainIndex}}static fromJSON(t){if(!t||!Array.isArray(t.ranges)||typeof t.main!=`number`||t.main>=t.ranges.length)throw RangeError(`Invalid JSON representation for EditorSelection`);return new e(t.ranges.map(e=>Bo.fromJSON(e)),t.main)}static single(t,n=t){return new e([e.range(t,n)],0)}static create(t,n=0){if(t.length==0)throw RangeError(`A selection needs at least one range`);for(let r=0,i=0;i<t.length;i++){let a=t[i];if(a.empty?a.from<=r:a.from<r)return e.normalized(t.slice(),n);r=a.to}return new e(t,n)}static cursor(e,t=0,n,r){return Bo.create(e,e,(t==0?0:t<0?8:16)|(n==null?7:Math.min(6,n)),r)}static range(e,t,n,r,i){let a=r==null?7:Math.min(6,r);return!i&&e!=t&&(i=t<e?1:-1),i&&(a|=i<0?8:16),t<e?Bo.create(t,e,a|32,n):Bo.create(e,t,a,n)}static undirectionalRange(e,t){return Bo.create(e,t,64,void 0)}static normalized(t,n=0){let r=t[n];t.sort((e,t)=>e.from-t.from),n=t.indexOf(r);for(let r=1;r<t.length;r++){let i=t[r],a=t[r-1];if(i.empty?i.from<=a.to:i.from<a.to){let o=a.from,s=Math.max(i.to,a.to);r<=n&&n--,t.splice(--r,2,i.anchor>i.head?e.range(s,o):e.range(o,s))}}return new e(t,n)}};function Vo(e,t){for(let n of e.ranges)if(n.to>t)throw RangeError(`Selection points outside of document`)}var Ho=0,F=class e{constructor(e,t,n,r,i){this.combine=e,this.compareInput=t,this.compare=n,this.isStatic=r,this.id=Ho++,this.default=e([]),this.extensions=typeof i==`function`?i(this):i}get reader(){return this}static define(t={}){return new e(t.combine||(e=>e),t.compareInput||((e,t)=>e===t),t.compare||(t.combine?(e,t)=>e===t:Uo),!!t.static,t.enables)}of(e){return new Wo([],this,0,e)}compute(e,t){if(this.isStatic)throw Error(`Can't compute a static facet`);return new Wo(e,this,1,t)}computeN(e,t){if(this.isStatic)throw Error(`Can't compute a static facet`);return new Wo(e,this,2,t)}from(e,t){return t||=e=>e,this.compute([e],n=>t(n.field(e)))}};function Uo(e,t){return e==t||e.length==t.length&&e.every((e,n)=>e===t[n])}var Wo=class{constructor(e,t,n,r){this.dependencies=e,this.facet=t,this.type=n,this.value=r,this.id=Ho++}dynamicSlot(e){let t=this.value,n=this.facet.compareInput,r=this.id,i=e[r]>>1,a=this.type==2,o=!1,s=!1,c=[];for(let t of this.dependencies)t==`doc`?o=!0:t==`selection`?s=!0:(e[t.id]??1)&1||c.push(e[t.id]);return{create(e){return e.values[i]=t(e),1},update(e,r){if(o&&r.docChanged||s&&(r.docChanged||r.selection)||Ko(e,c)){let r=t(e);if(a?!Go(r,e.values[i],n):!n(r,e.values[i]))return e.values[i]=r,1}return 0},reconfigure:(e,o)=>{let s,c=o.config.address[r];if(c!=null){let r=as(o,c);if(this.dependencies.every(t=>t instanceof F?o.facet(t)===e.facet(t):t instanceof Yo?o.field(t,!1)==e.field(t,!1):!0)||(a?Go(s=t(e),r,n):n(s=t(e),r)))return e.values[i]=r,0}else s=t(e);return e.values[i]=s,1}}}get extension(){return this}};function Go(e,t,n){if(e.length!=t.length)return!1;for(let r=0;r<e.length;r++)if(!n(e[r],t[r]))return!1;return!0}function Ko(e,t){let n=!1;for(let r of t)is(e,r)&1&&(n=!0);return n}function qo(e,t,n){let r=n.map(t=>e[t.id]),i=n.map(e=>e.type),a=r.filter(e=>!(e&1)),o=e[t.id]>>1;function s(e){let n=[];for(let t=0;t<r.length;t++){let a=as(e,r[t]);if(i[t]==2)for(let e of a)n.push(e);else n.push(a)}return t.combine(n)}return{create(e){for(let t of r)is(e,t);return e.values[o]=s(e),1},update(e,n){if(!Ko(e,a))return 0;let r=s(e);return t.compare(r,e.values[o])?0:(e.values[o]=r,1)},reconfigure(e,i){let a=Ko(e,r),c=i.config.facets[t.id],l=i.facet(t);if(c&&!a&&Uo(n,c))return e.values[o]=l,0;let u=s(e);return t.compare(u,l)?(e.values[o]=l,0):(e.values[o]=u,1)}}}var Jo=F.define({static:!0}),Yo=class e{constructor(e,t,n,r,i){this.id=e,this.createF=t,this.updateF=n,this.compareF=r,this.spec=i,this.provides=void 0}static define(t){let n=new e(Ho++,t.create,t.update,t.compare||((e,t)=>e===t),t);return t.provide&&(n.provides=t.provide(n)),n}create(e){return(e.facet(Jo).find(e=>e.field==this)?.create||this.createF)(e)}slot(e){let t=e[this.id]>>1;return{create:e=>(e.values[t]=this.create(e),1),update:(e,n)=>{let r=e.values[t],i=this.updateF(r,n);return this.compareF(r,i)?0:(e.values[t]=i,1)},reconfigure:(e,n)=>{let r=e.facet(Jo),i=n.facet(Jo),a;return(a=r.find(e=>e.field==this))&&a!=i.find(e=>e.field==this)?(e.values[t]=a.create(e),1):n.config.address[this.id]==null?(e.values[t]=this.create(e),1):(e.values[t]=n.field(this),0)}}}init(e){return[this,Jo.of({field:this,create:e})]}get extension(){return this}},Xo={lowest:4,low:3,default:2,high:1,highest:0};function Zo(e){return t=>new $o(t,e)}var Qo={highest:Zo(Xo.highest),high:Zo(Xo.high),default:Zo(Xo.default),low:Zo(Xo.low),lowest:Zo(Xo.lowest)},$o=class{constructor(e,t){this.inner=e,this.prec=t}get extension(){return this}},es=class e{of(e){return new ts(this,e)}reconfigure(t){return e.reconfigure.of({compartment:this,extension:t})}get(e){return e.config.compartments.get(this)}},ts=class{constructor(e,t){this.compartment=e,this.inner=t}get extension(){return this}},ns=class e{constructor(e,t,n,r,i,a){for(this.base=e,this.compartments=t,this.dynamicSlots=n,this.address=r,this.staticValues=i,this.facets=a,this.statusTemplate=[];this.statusTemplate.length<n.length;)this.statusTemplate.push(0)}staticFacet(e){let t=this.address[e.id];return t==null?e.default:this.staticValues[t>>1]}static resolve(t,n,r){let i=[],a=Object.create(null),o=new Map;for(let e of rs(t,n,o))e instanceof Yo?i.push(e):(a[e.facet.id]||(a[e.facet.id]=[])).push(e);let s=Object.create(null),c=[],l=[];for(let e of i)s[e.id]=l.length<<1,l.push(t=>e.slot(t));let u=r?.config.facets;for(let e in a){let t=a[e],n=t[0].facet,i=u&&u[e]||[];if(t.every(e=>e.type==0)){if(s[n.id]=c.length<<1|1,Uo(i,t))c.push(r.facet(n));else{let e=n.combine(t.map(e=>e.value));c.push(r&&n.compare(e,r.facet(n))?r.facet(n):e)}}else{for(let e of t)e.type==0?(s[e.id]=c.length<<1|1,c.push(e.value)):(s[e.id]=l.length<<1,l.push(t=>e.dynamicSlot(t)));s[n.id]=l.length<<1,l.push(e=>qo(e,n,t))}}let d=l.map(e=>e(s));return new e(t,o,d,s,c,a)}};function rs(e,t,n){let r=[[],[],[],[],[]],i=new Map;function a(e,o){let s=i.get(e);if(s!=null){if(s<=o)return;let t=r[s].indexOf(e);t>-1&&r[s].splice(t,1),e instanceof ts&&n.delete(e.compartment)}if(i.set(e,o),Array.isArray(e))for(let t of e)a(t,o);else if(e instanceof ts){if(n.has(e.compartment))throw RangeError(`Duplicate use of compartment in extensions`);let r=t.get(e.compartment)||e.inner;n.set(e.compartment,r),a(r,o)}else if(e instanceof $o)a(e.inner,e.prec);else if(e instanceof Yo)r[o].push(e),e.provides&&a(e.provides,o);else if(e instanceof Wo)r[o].push(e),e.facet.extensions&&a(e.facet.extensions,Xo.default);else{let t=e.extension;if(!t)throw Error(`Unrecognized extension value in extension set (${e}).`);if(t==e)throw Error(`Unrecognized extension value in extension set (${e}). This sometimes happens because multiple instances of @codemirror/state are loaded, breaking instanceof checks.`);a(t,o)}}return a(e,Xo.default),r.reduce((e,t)=>e.concat(t))}function is(e,t){if(t&1)return 2;let n=t>>1,r=e.status[n];if(r==4)throw Error(`Cyclic dependency between fields and/or facets`);if(r&2)return r;e.status[n]=4;let i=e.computeSlot(e,e.config.dynamicSlots[n]);return e.status[n]=2|i}function as(e,t){return t&1?e.config.staticValues[t>>1]:e.values[t>>1]}var os=F.define(),ss=F.define({combine:e=>e.some(e=>e),static:!0}),cs=F.define({combine:e=>e.length?e[0]:void 0,static:!0}),ls=F.define(),us=F.define(),ds=F.define(),fs=F.define({combine:e=>e.length?e[0]:!1}),ps=class{constructor(e,t){this.type=e,this.value=t}static define(){return new ms}},ms=class{of(e){return new ps(this,e)}},hs=class{constructor(e){this.map=e}of(e){return new I(this,e)}},I=class e{constructor(e,t){this.type=e,this.value=t}map(t){let n=this.type.map(this.value,t);return n===void 0?void 0:n==this.value?this:new e(this.type,n)}is(e){return this.type==e}static define(e={}){return new hs(e.map||(e=>e))}static mapEffects(e,t){if(!e.length)return e;let n=[];for(let r of e){let e=r.map(t);e&&n.push(e)}return n}};I.reconfigure=I.define(),I.appendConfig=I.define();var gs=class e{constructor(t,n,r,i,a,o){this.startState=t,this.changes=n,this.selection=r,this.effects=i,this.annotations=a,this.scrollIntoView=o,this._doc=null,this._state=null,r&&Vo(r,n.newLength),a.some(t=>t.type==e.time)||(this.annotations=a.concat(e.time.of(Date.now())))}static create(t,n,r,i,a,o){return new e(t,n,r,i,a,o)}get newDoc(){return this._doc||=this.changes.apply(this.startState.doc)}get newSelection(){return this.selection||this.startState.selection.map(this.changes)}get state(){return this._state||this.startState.applyTransaction(this),this._state}annotation(e){for(let t of this.annotations)if(t.type==e)return t.value}get docChanged(){return!this.changes.empty}get reconfigured(){return this.startState.config!=this.state.config}isUserEvent(t){let n=this.annotation(e.userEvent);return!!(n&&(n==t||n.length>t.length&&n.slice(0,t.length)==t&&n[t.length]==`.`))}};gs.time=ps.define(),gs.userEvent=ps.define(),gs.addToHistory=ps.define(),gs.remote=ps.define();function _s(e,t){let n=[];for(let r=0,i=0;;){let a,o;if(r<e.length&&(i==t.length||t[i]>=e[r]))a=e[r++],o=e[r++];else if(i<t.length)a=t[i++],o=t[i++];else return n;!n.length||n[n.length-1]<a?n.push(a,o):n[n.length-1]<o&&(n[n.length-1]=o)}}function vs(e,t,n){let r,i,a;return n?(r=t.changes,i=No.empty(t.changes.length),a=e.changes.compose(t.changes)):(r=t.changes.map(e.changes),i=e.changes.mapDesc(t.changes,!0),a=e.changes.compose(r)),{changes:a,selection:t.selection?t.selection.map(i):e.selection?.map(r),effects:I.mapEffects(e.effects,r).concat(I.mapEffects(t.effects,i)),annotations:e.annotations.length?e.annotations.concat(t.annotations):t.annotations,scrollIntoView:e.scrollIntoView||t.scrollIntoView}}function ys(e,t,n){let r=t.selection,i=ws(t.annotations);return t.userEvent&&(i=i.concat(gs.userEvent.of(t.userEvent))),{changes:t.changes instanceof No?t.changes:No.of(t.changes||[],n,e.facet(cs)),selection:r&&(r instanceof P?r:P.single(r.anchor,r.head)),effects:ws(t.effects),annotations:i,scrollIntoView:!!t.scrollIntoView}}function bs(e,t,n){let r=ys(e,t.length?t[0]:{},e.doc.length);t.length&&t[0].filter===!1&&(n=!1);for(let i=1;i<t.length;i++){t[i].filter===!1&&(n=!1);let a=!!t[i].sequential;r=vs(r,ys(e,t[i],a?r.changes.newLength:e.doc.length),a)}let i=gs.create(e,r.changes,r.selection,r.effects,r.annotations,r.scrollIntoView);return Ss(n?xs(i):i)}function xs(e){let t=e.startState,n=!0;for(let r of t.facet(ls)){let t=r(e);if(t===!1){n=!1;break}Array.isArray(t)&&(n=n===!0?t:_s(n,t))}if(n!==!0){let r,i;if(n===!1)i=e.changes.invertedDesc,r=No.empty(t.doc.length);else{let t=e.changes.filter(n);r=t.changes,i=t.filtered.mapDesc(t.changes).invertedDesc}e=gs.create(t,r,e.selection&&e.selection.map(i),I.mapEffects(e.effects,i),e.annotations,e.scrollIntoView)}let r=t.facet(us);for(let n=r.length-1;n>=0;n--){let i=r[n](e);e=i instanceof gs?i:Array.isArray(i)&&i.length==1&&i[0]instanceof gs?i[0]:bs(t,ws(i),!1)}return e}function Ss(e){let t=e.startState,n=t.facet(ds),r=e;for(let i=n.length-1;i>=0;i--){let a=n[i](e);a&&Object.keys(a).length&&(r=vs(r,ys(t,a,e.changes.newLength),!0))}return r==e?e:gs.create(t,e.changes,e.selection,r.effects,r.annotations,r.scrollIntoView)}var Cs=[];function ws(e){return e==null?Cs:Array.isArray(e)?e:[e]}var Ts=(function(e){return e[e.Word=0]=`Word`,e[e.Space=1]=`Space`,e[e.Other=2]=`Other`,e})(Ts||={}),Es=/[\u00df\u0587\u0590-\u05f4\u0600-\u06ff\u3040-\u309f\u30a0-\u30ff\u3400-\u4db5\u4e00-\u9fcc\uac00-\ud7af]/,Ds;try{Ds=RegExp(`[\\p{Alphabetic}\\p{Number}_]`,`u`)}catch{}function Os(e){if(Ds)return Ds.test(e);for(let t=0;t<e.length;t++){let n=e[t];if(/\w/.test(n)||n>``&&(n.toUpperCase()!=n.toLowerCase()||Es.test(n)))return!0}return!1}function ks(e){return t=>{if(!/\S/.test(t))return Ts.Space;if(Os(t))return Ts.Word;for(let n=0;n<e.length;n++)if(t.indexOf(e[n])>-1)return Ts.Word;return Ts.Other}}var L=class e{constructor(e,t,n,r,i,a){this.config=e,this.doc=t,this.selection=n,this.values=r,this.status=e.statusTemplate.slice(),this.computeSlot=i,a&&(a._state=this);for(let e=0;e<this.config.dynamicSlots.length;e++)is(this,e<<1);this.computeSlot=null}field(e,t=!0){let n=this.config.address[e.id];if(n==null){if(t)throw RangeError(`Field is not present in this state`)}else return is(this,n),as(this,n)}update(...e){return bs(this,e,!0)}applyTransaction(t){let n=this.config,{base:r,compartments:i}=n;for(let e of t.effects)e.is(es.reconfigure)?(n&&=(i=new Map,n.compartments.forEach((e,t)=>i.set(t,e)),null),i.set(e.value.compartment,e.value.extension)):e.is(I.reconfigure)?(n=null,r=e.value):e.is(I.appendConfig)&&(n=null,r=ws(r).concat(e.value));let a;n?a=t.startState.values.slice():(n=ns.resolve(r,i,this),a=new e(n,this.doc,this.selection,n.dynamicSlots.map(()=>null),(e,t)=>t.reconfigure(e,this),null).values);let o=t.startState.facet(ss)?t.newSelection:t.newSelection.asSingle();new e(n,t.newDoc,o,a,(e,n)=>n.update(e,t),t)}replaceSelection(e){return typeof e==`string`&&(e=this.toText(e)),this.changeByRange(t=>({changes:{from:t.from,to:t.to,insert:e},range:P.cursor(t.from+e.length,-1)}))}changeByRange(e){let t=this.selection,n=e(t.ranges[0]),r=this.changes(n.changes),i=[n.range],a=ws(n.effects);for(let n=1;n<t.ranges.length;n++){let o=e(t.ranges[n]),s=this.changes(o.changes),c=s.map(r);for(let e=0;e<n;e++)i[e]=i[e].map(c);let l=r.mapDesc(s,!0);i.push(o.range.map(l)),r=r.compose(c),a=I.mapEffects(a,c).concat(I.mapEffects(ws(o.effects),l))}return{changes:r,selection:P.create(i,t.mainIndex),effects:a}}changes(t=[]){return t instanceof No?t:No.of(t,this.doc.length,this.facet(e.lineSeparator))}toText(t){return N.of(t.split(this.facet(e.lineSeparator)||Ao))}sliceDoc(e=0,t=this.doc.length){return this.doc.sliceString(e,t,this.lineBreak)}facet(e){let t=this.config.address[e.id];return t==null?e.default:(is(this,t),as(this,t))}toJSON(e){let t={doc:this.sliceDoc(),selection:this.selection.toJSON()};if(e)for(let n in e){let r=e[n];r instanceof Yo&&this.config.address[r.id]!=null&&(t[n]=r.spec.toJSON(this.field(e[n]),this))}return t}static fromJSON(t,n={},r){if(!t||typeof t.doc!=`string`)throw RangeError(`Invalid JSON representation for EditorState`);let i=[];if(r){for(let e in r)if(Object.prototype.hasOwnProperty.call(t,e)){let n=r[e],a=t[e];i.push(n.init(e=>n.spec.fromJSON(a,e)))}}return e.create({doc:t.doc,selection:P.fromJSON(t.selection),extensions:n.extensions?i.concat([n.extensions]):i})}static create(t={}){let n=ns.resolve(t.extensions||[],new Map),r=t.doc instanceof N?t.doc:N.of((t.doc||``).split(n.staticFacet(e.lineSeparator)||Ao)),i=t.selection?t.selection instanceof P?t.selection:P.single(t.selection.anchor,t.selection.head):P.single(0);return Vo(i,r.length),n.staticFacet(ss)||(i=i.asSingle()),new e(n,r,i,n.dynamicSlots.map(()=>null),(e,t)=>t.create(e),null)}get tabSize(){return this.facet(e.tabSize)}get lineBreak(){return this.facet(e.lineSeparator)||`
`}get readOnly(){return this.facet(fs)}phrase(t,...n){for(let n of this.facet(e.phrases))if(Object.prototype.hasOwnProperty.call(n,t)){t=n[t];break}return n.length&&(t=t.replace(/\$(\$|\d*)/g,(e,t)=>{if(t==`$`)return`$`;let r=+(t||1);return!r||r>n.length?e:n[r-1]})),t}languageDataAt(e,t,n=-1){let r=[];for(let i of this.facet(os))for(let a of i(this,t,n))Object.prototype.hasOwnProperty.call(a,e)&&r.push(a[e]);return r}charCategorizer(e){let t=this.languageDataAt(`wordChars`,e);return ks(t.length?t[0]:``)}wordAt(e){let{text:t,from:n,length:r}=this.doc.lineAt(e),i=this.charCategorizer(e),a=e-n,o=e-n;for(;a>0;){let e=To(t,a,!1);if(i(t.slice(e,a))!=Ts.Word)break;a=e}for(;o<r;){let e=To(t,o);if(i(t.slice(o,e))!=Ts.Word)break;o=e}return a==o?null:P.range(a+n,o+n)}};L.allowMultipleSelections=ss,L.tabSize=F.define({combine:e=>e.length?e[0]:4}),L.lineSeparator=cs,L.readOnly=fs,L.phrases=F.define({compare(e,t){let n=Object.keys(e),r=Object.keys(t);return n.length==r.length&&n.every(n=>e[n]==t[n])}}),L.languageData=os,L.changeFilter=ls,L.transactionFilter=us,L.transactionExtender=ds,es.reconfigure=I.define();function As(e,t,n={}){let r={};for(let t of e)for(let e of Object.keys(t)){let i=t[e],a=r[e];if(a===void 0)r[e]=i;else if(a!==i&&i!==void 0){if(Object.hasOwnProperty.call(n,e))r[e]=n[e](a,i);else throw Error(`Config merge conflict for field `+e)}}for(let e in t)r[e]===void 0&&(r[e]=t[e]);return r}var js=class{eq(e){return this==e}range(e,t=e){return Ns.create(e,t,this)}};js.prototype.startSide=js.prototype.endSide=0,js.prototype.point=!1,js.prototype.mapMode=jo.TrackDel;function Ms(e,t){return e==t||e.constructor==t.constructor&&e.eq(t)}var Ns=class e{constructor(e,t,n){this.from=e,this.to=t,this.value=n}static create(t,n,r){return new e(t,n,r)}};function Ps(e,t){return e.from-t.from||e.value.startSide-t.value.startSide}var Fs=class e{constructor(e,t,n,r){this.from=e,this.to=t,this.value=n,this.maxPoint=r}get length(){return Is(this.to)}findIndex(e,t,n,r=0){let i=n?this.to:this.from;for(let a=r,o=i.length;;){if(a==o)return a;let r=a+o>>1,s=i[r]-e||(n?this.value[r].endSide:this.value[r].startSide)-t;if(r==a)return s>=0?a:o;s>=0?o=r:a=r+1}}between(e,t,n,r){for(let i=this.findIndex(t,-1e9,!0),a=this.findIndex(n,1e9,!1,i);i<a;i++)if(r(this.from[i]+e,this.to[i]+e,this.value[i])===!1)return!1}map(t,n,r,i,a){let o=[],s=[],c=[],l=-1,u=-1;iter:for(let e=0;e<this.value.length;e++){let d=this.value[e],f=this.from[e]+t,p=this.to[e]+t,m,h;if(f==p){let e=n.mapPos(f,d.startSide,d.mapMode);if(e==null||(m=h=e,d.startSide!=d.endSide&&(h=n.mapPos(f,d.endSide),h<m)))continue}else if(m=n.mapPos(f,d.startSide),h=n.mapPos(p,d.endSide),m>h||m==h&&d.startSide>0&&d.endSide<=0)continue;if(!((h-m||d.endSide-d.startSide)<0)){if(l<0&&(l=m),d.point&&(u=Math.max(u,h-m)),(m-r||d.startSide-i)>=0)o.push(d),s.push(m-l),c.push(h-l),r=h,i=d.endSide;else{if(m==h)for(let e=o.length;e>0;e--){if((m-(c[e-1]+l)||d.startSide-o[e-1].endSide)>=0){o.splice(e,0,d),s.splice(e,0,m-l),c.splice(e,0,h-l);continue iter}if((m-(s[e-1]+l)||d.endSide-o[e-1].startSide)>0)break}a(m,h,d)}}}return{mapped:o.length?new e(s,c,o,u):null,pos:l}}},R=class e{constructor(e,t,n,r){this.chunkPos=e,this.chunk=t,this.nextLayer=n,this.maxPoint=r}static create(t,n,r,i){return new e(t,n,r,i)}get length(){let e=this.chunk.length-1;return e<0?0:Math.max(this.chunkEnd(e),this.nextLayer.length)}get size(){if(this.isEmpty)return 0;let e=this.nextLayer.size;for(let t of this.chunk)e+=t.value.length;return e}chunkEnd(e){return this.chunkPos[e]+this.chunk[e].length}update(t){let{add:n=[],sort:r=!1,filterFrom:i=0,filterTo:a=this.length}=t,o=t.filter;if(n.length==0&&!o)return this;if(r&&(n=n.slice().sort(Ps)),this.isEmpty)return n.length?e.of(n):this;let s=new Bs(this,null,-1).goto(0),c=0,l=[],u=new Rs;for(;s.value||c<n.length;)if(c<n.length&&(s.from-n[c].from||s.startSide-n[c].value.startSide)>=0){let e=n[c++];u.addInner(e.from,e.to,e.value,!1)||l.push(e)}else s.rangeIndex==1&&s.chunkIndex<this.chunk.length&&(c==n.length||this.chunkEnd(s.chunkIndex)<n[c].from)&&(!o||i>this.chunkEnd(s.chunkIndex)||a<this.chunkPos[s.chunkIndex])&&u.addChunk(this.chunkPos[s.chunkIndex],this.chunk[s.chunkIndex])?s.nextChunk():((!o||i>s.to||a<s.from||o(s.from,s.to,s.value))&&(u.addInner(s.from,s.to,s.value,!1)||l.push(Ns.create(s.from,s.to,s.value))),s.next());return u.finishInner(this.nextLayer.isEmpty&&!l.length?e.empty:this.nextLayer.update({add:l,filter:o,filterFrom:i,filterTo:a}))}map(t){if(t.empty||this.isEmpty)return this;let n=[],r=[],i=-1,a,o=(e,t,n)=>{a||=new Rs,a.addRange(e,t,n,!1)};for(let e=0;e<this.chunk.length;e++){let a=this.chunkPos[e],s=this.chunk[e],c=t.touchesRange(a,a+s.length);if(c===!1)i=Math.max(i,s.maxPoint),n.push(s),r.push(t.mapPos(a));else if(c===!0){let[e,c]=n.length?[Is(r)+Is(n).length,Is(Is(n).value).endSide]:[-1,-1],{mapped:l,pos:u}=s.map(a,t,e,c,o);l&&(i=Math.max(i,l.maxPoint),n.push(l),r.push(u))}}let s=this.nextLayer.map(t);return a&&(s=a.finishInner(s)),n.length==0?s:new e(r,n,s||e.empty,i)}between(e,t,n){if(!this.isEmpty){for(let r=0;r<this.chunk.length;r++){let i=this.chunkPos[r],a=this.chunk[r];if(t>=i&&e<=i+a.length&&a.between(i,e-i,t-i,n)===!1)return}this.nextLayer.between(e,t,n)}}iter(e=0){return Vs.from([this]).goto(e)}get isEmpty(){return this.nextLayer==this}static iter(e,t=0){return Vs.from(e).goto(t)}static compare(e,t,n,r,i=-1){let a=e.filter(e=>e.maxPoint>0||!e.isEmpty&&e.maxPoint>=i),o=t.filter(e=>e.maxPoint>0||!e.isEmpty&&e.maxPoint>=i),s=zs(a,o,n),c=new Us(a,s,i),l=new Us(o,s,i);n.iterGaps((e,t,n)=>Ws(c,e,l,t,n,r)),n.empty&&n.length==0&&Ws(c,0,l,0,0,r)}static eq(e,t,n=0,r){r??=1e9-1;let i=e.filter(e=>!e.isEmpty&&t.indexOf(e)<0),a=t.filter(t=>!t.isEmpty&&e.indexOf(t)<0);if(i.length!=a.length)return!1;if(!i.length)return!0;let o=zs(i,a),s=new Us(i,o,0).goto(n),c=new Us(a,o,0).goto(n);for(;;){if(s.to!=c.to||!Gs(s.active,c.active)||s.point&&(!c.point||!Ms(s.point,c.point)))return!1;if(s.to>r)return!0;s.next(),c.next()}}static spans(e,t,n,r,i=-1){let a=new Us(e,null,i).goto(t),o=t,s=a.openStart;for(;;){let e=Math.min(a.to,n);if(a.point){let n=a.activeForPoint(a.to),i=a.pointFrom<t?n.length+1:a.point.startSide<0?n.length:Math.min(n.length,s);r.point(o,e,a.point,n,i,a.pointRank),s=Math.min(a.openEnd(e),n.length)}else e>o&&(r.span(o,e,a.active,s),s=a.openEnd(e));if(a.to>n)return s+(a.point&&a.to>n?1:0);o=a.to,a.next()}}static of(e,t=!1){let n=new Rs;for(let r of e instanceof Ns?[e]:t?Ls(e):e)n.add(r.from,r.to,r.value);return n.finish()}static join(t){if(!t.length)return e.empty;let n=Is(t);for(let r=t.length-2;r>=0;r--)for(let i=t[r];i!=e.empty;i=i.nextLayer)n=new e(i.chunkPos,i.chunk,n,Math.max(i.maxPoint,n.maxPoint));return n}};R.empty=new R([],[],null,-1);function Is(e){return e[e.length-1]}function Ls(e){if(e.length>1)for(let t=e[0],n=1;n<e.length;n++){let r=e[n];if(Ps(t,r)>0)return e.slice().sort(Ps);t=r}return e}R.empty.nextLayer=R.empty;var Rs=class e{finishChunk(e){this.chunks.push(new Fs(this.from,this.to,this.value,this.maxPoint)),this.chunkPos.push(this.chunkStart),this.chunkStart=-1,this.setMaxPoint=Math.max(this.setMaxPoint,this.maxPoint),this.maxPoint=-1,e&&(this.from=[],this.to=[],this.value=[])}constructor(){this.chunks=[],this.chunkPos=[],this.chunkStart=-1,this.last=null,this.lastFrom=-1e9,this.lastTo=-1e9,this.from=[],this.to=[],this.value=[],this.maxPoint=-1,this.setMaxPoint=-1,this.nextLayer=null}add(e,t,n){this.addRange(e,t,n,!0)}addRange(t,n,r,i){this.addInner(t,n,r,i)||(this.nextLayer||=new e).addRange(t,n,r,i)}addInner(e,t,n,r){let i=e-this.lastTo||n.startSide-this.last.endSide;if(r&&i<=0&&(e-this.lastFrom||n.startSide-this.last.startSide)<0)throw Error("Ranges must be added sorted by `from` position and `startSide`");return i<0?!1:(this.from.length==250&&this.finishChunk(!0),this.chunkStart<0&&(this.chunkStart=e),this.from.push(e-this.chunkStart),this.to.push(t-this.chunkStart),this.last=n,this.lastFrom=e,this.lastTo=t,this.value.push(n),n.point&&(this.maxPoint=Math.max(this.maxPoint,t-e)),!0)}addChunk(e,t){if((e-this.lastTo||t.value[0].startSide-this.last.endSide)<0)return!1;this.from.length&&this.finishChunk(!0),this.setMaxPoint=Math.max(this.setMaxPoint,t.maxPoint),this.chunks.push(t),this.chunkPos.push(e);let n=t.value.length-1;return this.last=t.value[n],this.lastFrom=t.from[n]+e,this.lastTo=t.to[n]+e,!0}finish(){return this.finishInner(R.empty)}finishInner(e){if(this.from.length&&this.finishChunk(!1),this.chunks.length==0)return e;let t=R.create(this.chunkPos,this.chunks,this.nextLayer?this.nextLayer.finishInner(e):e,this.setMaxPoint);return this.from=null,t}};function zs(e,t,n){let r=new Map;for(let t of e)for(let e=0;e<t.chunk.length;e++)t.chunk[e].maxPoint<=0&&r.set(t.chunk[e],t.chunkPos[e]);let i=new Set;for(let e of t)for(let t=0;t<e.chunk.length;t++){let a=r.get(e.chunk[t]);a!=null&&(n?n.mapPos(a):a)==e.chunkPos[t]&&!n?.touchesRange(a,a+e.chunk[t].length)&&i.add(e.chunk[t])}return i}var Bs=class{constructor(e,t,n,r=0){this.layer=e,this.skip=t,this.minPoint=n,this.rank=r}get startSide(){return this.value?this.value.startSide:0}get endSide(){return this.value?this.value.endSide:0}goto(e,t=-1e9){return this.chunkIndex=this.rangeIndex=0,this.gotoInner(e,t,!1),this}gotoInner(e,t,n){for(;this.chunkIndex<this.layer.chunk.length;){let t=this.layer.chunk[this.chunkIndex];if(!(this.skip&&this.skip.has(t)||this.layer.chunkEnd(this.chunkIndex)<e||t.maxPoint<this.minPoint))break;this.chunkIndex++,n=!1}if(this.chunkIndex<this.layer.chunk.length){let r=this.layer.chunk[this.chunkIndex].findIndex(e-this.layer.chunkPos[this.chunkIndex],t,!0);(!n||this.rangeIndex<r)&&this.setRangeIndex(r)}this.next()}forward(e,t){(this.to-e||this.endSide-t)<0&&this.gotoInner(e,t,!0)}next(){for(;;)if(this.chunkIndex==this.layer.chunk.length){this.from=this.to=1e9,this.value=null;break}else{let e=this.layer.chunkPos[this.chunkIndex],t=this.layer.chunk[this.chunkIndex],n=e+t.from[this.rangeIndex];if(this.from=n,this.to=e+t.to[this.rangeIndex],this.value=t.value[this.rangeIndex],this.setRangeIndex(this.rangeIndex+1),this.minPoint<0||this.value.point&&this.to-this.from>=this.minPoint)break}}setRangeIndex(e){if(e==this.layer.chunk[this.chunkIndex].value.length){if(this.chunkIndex++,this.skip)for(;this.chunkIndex<this.layer.chunk.length&&this.skip.has(this.layer.chunk[this.chunkIndex]);)this.chunkIndex++;this.rangeIndex=0}else this.rangeIndex=e}nextChunk(){this.chunkIndex++,this.rangeIndex=0,this.next()}compare(e){return this.from-e.from||this.startSide-e.startSide||this.rank-e.rank||this.to-e.to||this.endSide-e.endSide}},Vs=class e{constructor(e){this.heap=e}static from(t,n=null,r=-1){let i=[];for(let e=0;e<t.length;e++)for(let a=t[e];!a.isEmpty;a=a.nextLayer)a.maxPoint>=r&&i.push(new Bs(a,n,r,e));return i.length==1?i[0]:new e(i)}get startSide(){return this.value?this.value.startSide:0}goto(e,t=-1e9){for(let n of this.heap)n.goto(e,t);for(let e=this.heap.length>>1;e>=0;e--)Hs(this.heap,e);return this.next(),this}forward(e,t){for(let n of this.heap)n.forward(e,t);for(let e=this.heap.length>>1;e>=0;e--)Hs(this.heap,e);(this.to-e||this.value.endSide-t)<0&&this.next()}next(){if(this.heap.length==0)this.from=this.to=1e9,this.value=null,this.rank=-1;else{let e=this.heap[0];this.from=e.from,this.to=e.to,this.value=e.value,this.rank=e.rank,e.value&&e.next(),Hs(this.heap,0)}}};function Hs(e,t){for(let n=e[t];;){let r=(t<<1)+1;if(r>=e.length)break;let i=e[r];if(r+1<e.length&&i.compare(e[r+1])>=0&&(i=e[r+1],r++),n.compare(i)<0)break;e[r]=n,e[t]=i,t=r}}var Us=class{constructor(e,t,n){this.minPoint=n,this.active=[],this.activeTo=[],this.activeRank=[],this.minActive=-1,this.point=null,this.pointFrom=0,this.pointRank=0,this.to=-1e9,this.endSide=0,this.openStart=-1,this.cursor=Vs.from(e,t,n)}goto(e,t=-1e9){return this.cursor.goto(e,t),this.active.length=this.activeTo.length=this.activeRank.length=0,this.minActive=-1,this.to=e,this.endSide=t,this.openStart=-1,this.next(),this}forward(e,t){for(;this.minActive>-1&&(this.activeTo[this.minActive]-e||this.active[this.minActive].endSide-t)<0;)this.removeActive(this.minActive);this.cursor.forward(e,t)}removeActive(e){Ks(this.active,e),Ks(this.activeTo,e),Ks(this.activeRank,e),this.minActive=Js(this.active,this.activeTo)}addActive(e){let t=0,{value:n,to:r,rank:i}=this.cursor;for(;t<this.activeRank.length&&(i-this.activeRank[t]||r-this.activeTo[t])>0;)t++;qs(this.active,t,n),qs(this.activeTo,t,r),qs(this.activeRank,t,i),e&&qs(e,t,this.cursor.from),this.minActive=Js(this.active,this.activeTo)}next(){let e=this.to,t=this.point;this.point=null;let n=this.openStart<0?[]:null;for(;;){let r=this.minActive;if(r>-1&&(this.activeTo[r]-this.cursor.from||this.active[r].endSide-this.cursor.startSide)<0){if(this.activeTo[r]>e){this.to=this.activeTo[r],this.endSide=this.active[r].endSide;break}this.removeActive(r),n&&Ks(n,r)}else if(!this.cursor.value){this.to=this.endSide=1e9;break}else if(this.cursor.from>e){this.to=this.cursor.from,this.endSide=this.cursor.startSide;break}else{let e=this.cursor.value;if(!e.point)this.addActive(n),this.cursor.next();else if(t&&this.cursor.to==this.to&&this.cursor.from<this.cursor.to)this.cursor.next();else{this.point=e,this.pointFrom=this.cursor.from,this.pointRank=this.cursor.rank,this.to=this.cursor.to,this.endSide=e.endSide,this.cursor.next(),this.forward(this.to,this.endSide);break}}}if(n){this.openStart=0;for(let t=n.length-1;t>=0&&n[t]<e;t--)this.openStart++}}activeForPoint(e){if(!this.active.length)return this.active;let t=[];for(let n=this.active.length-1;n>=0&&!(this.activeRank[n]<this.pointRank);n--)(this.activeTo[n]>e||this.activeTo[n]==e&&this.active[n].endSide>=this.point.endSide)&&t.push(this.active[n]);return t.reverse()}openEnd(e){let t=0;for(let n=this.activeTo.length-1;n>=0&&this.activeTo[n]>e;n--)t++;return t}};function Ws(e,t,n,r,i,a){e.goto(t),n.goto(r);let o=r+i,s=r,c=r-t,l=!!a.boundChange;for(let t=!1;;){let r=e.to+c-n.to,i=r||e.endSide-n.endSide,u=i<0?e.to+c:n.to,d=Math.min(u,o);if(e.point||n.point?(e.point&&n.point&&Ms(e.point,n.point)&&Gs(e.activeForPoint(e.to),n.activeForPoint(n.to))||a.comparePoint(s,d,e.point,n.point),t=!1):(t&&=(a.boundChange(s),!1),d>s&&!Gs(e.active,n.active)&&a.compareRange(s,d,e.active,n.active),l&&d<o&&(r||e.openEnd(u)!=n.openEnd(u))&&(t=!0)),u>o)break;s=u,i<=0&&e.next(),i>=0&&n.next()}}function Gs(e,t){if(e.length!=t.length)return!1;for(let n=0;n<e.length;n++)if(e[n]!=t[n]&&!Ms(e[n],t[n]))return!1;return!0}function Ks(e,t){for(let n=t,r=e.length-1;n<r;n++)e[n]=e[n+1];e.pop()}function qs(e,t,n){for(let n=e.length-1;n>=t;n--)e[n+1]=e[n];e[t]=n}function Js(e,t){let n=-1,r=1e9;for(let i=0;i<t.length;i++)(t[i]-r||e[i].endSide-e[n].endSide)<0&&(n=i,r=t[i]);return n}function Ys(e,t,n=e.length){let r=0;for(let i=0;i<n&&i<e.length;)e.charCodeAt(i)==9?(r+=t-r%t,i++):(r++,i=To(e,i));return r}function Xs(e,t,n,r){for(let r=0,i=0;;){if(i>=t)return r;if(r==e.length)break;i+=e.charCodeAt(r)==9?n-i%n:1,r=To(e,r)}return r===!0?-1:e.length}for(var Zs=`ͼ`,Qs=typeof Symbol>`u`?`__ͼ`:Symbol.for(Zs),$s=typeof Symbol>`u`?`__styleSet`+Math.floor(Math.random()*1e8):Symbol(`styleSet`),ec=typeof globalThis<`u`?globalThis:typeof window<`u`?window:{},tc=class{constructor(e,t){this.rules=[];let{finish:n}=t||{};function r(e){return/^@/.test(e)?[e]:e.split(/,\s*/)}function i(e,t,a,o){let s=[],c=/^@(\w+)\b/.exec(e[0]),l=c&&c[1]==`keyframes`;if(c&&t==null)return a.push(e[0]+`;`);for(let n in t){let o=t[n];if(/&/.test(n))i(n.split(/,\s*/).map(t=>e.map(e=>t.replace(/&/,e))).reduce((e,t)=>e.concat(t)),o,a);else if(o&&typeof o==`object`){if(!c)throw RangeError(`The value of a property (`+n+`) should be a primitive value.`);i(r(n),o,s,l)}else o!=null&&s.push(n.replace(/_.*/,``).replace(/[A-Z]/g,e=>`-`+e.toLowerCase())+`: `+o+`;`)}(s.length||l)&&a.push((n&&!c&&!o?e.map(n):e).join(`, `)+` {`+s.join(` `)+`}`)}for(let t in e)i(r(t),e[t],this.rules)}getRules(){return this.rules.join(`
`)}static newName(){let e=ec[Qs]||1;return ec[Qs]=e+1,Zs+e.toString(36)}static mount(e,t,n){let r=e[$s],i=n&&n.nonce;r?i&&r.setNonce(i):r=new rc(e,i),r.mount(Array.isArray(t)?t:[t],e)}},nc=new Map,rc=class{constructor(e,t){let n=e.ownerDocument||e,r=n.defaultView;if(!e.head&&e.adoptedStyleSheets&&r.CSSStyleSheet){let t=nc.get(n);if(t)return e[$s]=t;this.sheet=new r.CSSStyleSheet,nc.set(n,this)}else this.styleTag=n.createElement(`style`),t&&this.styleTag.setAttribute(`nonce`,t);this.modules=[],e[$s]=this}mount(e,t){let n=this.sheet,r=0,i=0,a=!1;for(let t=0;t<e.length;t++){let o=e[t],s=this.modules.indexOf(o);if(s<i&&s>-1&&(this.modules.splice(s,1),a=!0,i--,s=-1),s==-1){if(this.modules.splice(i++,0,o),a=!0,n)for(let e=0;e<o.rules.length;e++)n.insertRule(o.rules[e],r++)}else{for(;i<s;)r+=this.modules[i++].rules.length;r+=o.rules.length,i++}}if(n)t.adoptedStyleSheets.indexOf(this.sheet)<0&&(t.adoptedStyleSheets=[this.sheet,...t.adoptedStyleSheets]);else{if(a){let e=``;for(let t=0;t<this.modules.length;t++)e+=this.modules[t].getRules()+`
`;this.styleTag.textContent=e}let e=t.head||t;this.styleTag.parentNode!=e&&e.insertBefore(this.styleTag,e.firstChild)}}setNonce(e){this.styleTag&&this.styleTag.getAttribute(`nonce`)!=e&&this.styleTag.setAttribute(`nonce`,e)}},ic={8:`Backspace`,9:`Tab`,10:`Enter`,12:`NumLock`,13:`Enter`,16:`Shift`,17:`Control`,18:`Alt`,20:`CapsLock`,27:`Escape`,32:` `,33:`PageUp`,34:`PageDown`,35:`End`,36:`Home`,37:`ArrowLeft`,38:`ArrowUp`,39:`ArrowRight`,40:`ArrowDown`,44:`PrintScreen`,45:`Insert`,46:`Delete`,59:`;`,61:`=`,91:`Meta`,92:`Meta`,106:`*`,107:`+`,108:`,`,109:`-`,110:`.`,111:`/`,144:`NumLock`,145:`ScrollLock`,160:`Shift`,161:`Shift`,162:`Control`,163:`Control`,164:`Alt`,165:`Alt`,173:`-`,186:`;`,187:`=`,188:`,`,189:`-`,190:`.`,191:`/`,192:"`",219:`[`,220:`\\`,221:`]`,222:`'`},ac={48:`)`,49:`!`,50:`@`,51:`#`,52:`$`,53:`%`,54:`^`,55:`&`,56:`*`,57:`(`,59:`:`,61:`+`,173:`_`,186:`:`,187:`+`,188:`<`,189:`_`,190:`>`,191:`?`,192:`~`,219:`{`,220:`|`,221:`}`,222:`"`},oc=typeof navigator<`u`&&/Mac/.test(navigator.platform),sc=typeof navigator<`u`&&/MSIE \d|Trident\/(?:[7-9]|\d{2,})\..*rv:(\d+)/.exec(navigator.userAgent),cc=0;cc<10;cc++)ic[48+cc]=ic[96+cc]=String(cc);for(var cc=1;cc<=24;cc++)ic[cc+111]=`F`+cc;for(var cc=65;cc<=90;cc++)ic[cc]=String.fromCharCode(cc+32),ac[cc]=String.fromCharCode(cc);for(var lc in ic)ac.hasOwnProperty(lc)||(ac[lc]=ic[lc]);function uc(e){var t=!(oc&&e.metaKey&&e.shiftKey&&!e.ctrlKey&&!e.altKey||sc&&e.shiftKey&&e.key&&e.key.length==1||e.key==`Unidentified`)&&e.key||(e.shiftKey?ac:ic)[e.keyCode]||e.key||`Unidentified`;return t==`Esc`&&(t=`Escape`),t==`Del`&&(t=`Delete`),t==`Left`&&(t=`ArrowLeft`),t==`Up`&&(t=`ArrowUp`),t==`Right`&&(t=`ArrowRight`),t==`Down`&&(t=`ArrowDown`),t}var dc=typeof navigator<`u`?navigator:{userAgent:``,vendor:``,platform:``},fc=typeof document<`u`?document:{documentElement:{style:{}}},pc=/Edge\/(\d+)/.exec(dc.userAgent),mc=/MSIE \d/.test(dc.userAgent),hc=/Trident\/(?:[7-9]|\d{2,})\..*rv:(\d+)/.exec(dc.userAgent),gc=!!(mc||hc||pc),_c=!gc&&/gecko\/(\d+)/i.test(dc.userAgent),vc=!gc&&/Chrome\/(\d+)/.exec(dc.userAgent),yc=`webkitFontSmoothing`in fc.documentElement.style,bc=!gc&&/Apple Computer/.test(dc.vendor),xc=bc&&(/Mobile\/\w+/.test(dc.userAgent)||dc.maxTouchPoints>2),z={mac:xc||/Mac/.test(dc.platform),windows:/Win/.test(dc.platform),linux:/Linux|X11/.test(dc.platform),ie:gc,ie_version:mc?fc.documentMode||6:hc?+hc[1]:pc?+pc[1]:0,gecko:_c,gecko_version:_c?+(/Firefox\/(\d+)/.exec(dc.userAgent)||[0,0])[1]:0,chrome:!!vc,chrome_version:vc?+vc[1]:0,ios:xc,android:/Android\b/.test(dc.userAgent),webkit:yc,webkit_version:yc?+(/\bAppleWebKit\/(\d+)/.exec(dc.userAgent)||[0,0])[1]:0,safari:bc,safari_version:bc?+(/\bVersion\/(\d+(\.\d+)?)/.exec(dc.userAgent)||[0,0])[1]:0,tabSize:fc.documentElement.style.tabSize==null?`-moz-tab-size`:`tab-size`};function Sc(e,t){for(let n in e)n==`class`&&t.class?t.class+=` `+e.class:n==`style`&&t.style?t.style+=`;`+e.style:t[n]=e[n];return t}var Cc=Object.create(null);function wc(e,t,n){if(e==t)return!0;e||=Cc,t||=Cc;let r=Object.keys(e),i=Object.keys(t);if(r.length-0!=i.length-0)return!1;for(let a of r)if(a!=n&&(i.indexOf(a)==-1||e[a]!==t[a]))return!1;return!0}function Tc(e,t){for(let n=e.attributes.length-1;n>=0;n--){let r=e.attributes[n].name;t[r]??e.removeAttribute(r)}for(let n in t){let r=t[n];n==`style`?e.style.cssText=r:e.getAttribute(n)!=r&&e.setAttribute(n,r)}}function Ec(e,t,n){let r=!1;if(t)for(let i in t)n&&i in n||(r=!0,i==`style`?e.style.cssText=``:e.removeAttribute(i));if(n)for(let i in n)t&&t[i]==n[i]||(r=!0,i==`style`?e.style.cssText=n[i]:e.setAttribute(i,n[i]));return r}function Dc(e){let t=Object.create(null);for(let n=0;n<e.attributes.length;n++){let r=e.attributes[n];t[r.name]=r.value}return t}var Oc=class{eq(e){return!1}updateDOM(e,t,n){return!1}compare(e){return this==e||this.constructor==e.constructor&&this.eq(e)}get estimatedHeight(){return-1}get lineBreaks(){return 0}ignoreEvent(e){return!0}coordsAt(e,t,n){return null}get isHidden(){return!1}get editable(){return!1}destroy(e){}},kc=(function(e){return e[e.Text=0]=`Text`,e[e.WidgetBefore=1]=`WidgetBefore`,e[e.WidgetAfter=2]=`WidgetAfter`,e[e.WidgetRange=3]=`WidgetRange`,e})(kc||={}),B=class extends js{constructor(e,t,n,r){super(),this.startSide=e,this.endSide=t,this.widget=n,this.spec=r}get heightRelevant(){return!1}static mark(e){return new Ac(e)}static widget(e){let t=Math.max(-1e4,Math.min(1e4,e.side||0)),n=!!e.block;return t+=n&&!e.inlineOrder?t>0?3e8:-4e8:t>0?1e8:-1e8,new Mc(e,t,t,n,e.widget||null,!1)}static replace(e){let t=!!e.block,n,r;if(e.isBlockGap)n=-5e8,r=4e8;else{let{start:i,end:a}=Nc(e,t);n=(i?t?-3e8:-1:5e8)-1,r=(a?t?2e8:1:-6e8)+1}return new Mc(e,n,r,t,e.widget||null,!0)}static line(e){return new jc(e)}static set(e,t=!1){return R.of(e,t)}hasHeight(){return this.widget?this.widget.estimatedHeight>-1:!1}};B.none=R.empty;var Ac=class e extends B{constructor(e){let{start:t,end:n}=Nc(e);super(t?-1:5e8,n?1:-6e8,null,e),this.tagName=e.tagName||`span`,this.attrs=e.class&&e.attributes?Sc(e.attributes,{class:e.class}):e.class?{class:e.class}:e.attributes||Cc}eq(t){return this==t||t instanceof e&&this.tagName==t.tagName&&wc(this.attrs,t.attrs)}range(e,t=e){if(e>=t)throw RangeError(`Mark decorations may not be empty`);return super.range(e,t)}};Ac.prototype.point=!1;var jc=class e extends B{constructor(e){super(-2e8,-2e8,null,e)}eq(t){return t instanceof e&&this.spec.class==t.spec.class&&wc(this.spec.attributes,t.spec.attributes)}range(e,t=e){if(t!=e)throw RangeError(`Line decoration ranges must be zero-length`);return super.range(e,t)}};jc.prototype.mapMode=jo.TrackBefore,jc.prototype.point=!0;var Mc=class e extends B{constructor(e,t,n,r,i,a){super(t,n,i,e),this.block=r,this.isReplace=a,this.mapMode=r?t<=0?jo.TrackBefore:jo.TrackAfter:jo.TrackDel}get type(){return this.startSide==this.endSide?this.startSide<=0?kc.WidgetBefore:kc.WidgetAfter:kc.WidgetRange}get heightRelevant(){return this.block||!!this.widget&&(this.widget.estimatedHeight>=5||this.widget.lineBreaks>0)}eq(t){return t instanceof e&&Pc(this.widget,t.widget)&&this.block==t.block&&this.startSide==t.startSide&&this.endSide==t.endSide}range(e,t=e){if(this.isReplace&&(e>t||e==t&&this.startSide>0&&this.endSide<=0))throw RangeError(`Invalid range for replacement decoration`);if(!this.isReplace&&t!=e)throw RangeError(`Widget decorations can only have zero-length ranges`);return super.range(e,t)}};Mc.prototype.point=!0;function Nc(e,t=!1){let{inclusiveStart:n,inclusiveEnd:r}=e;return n??=e.inclusive,r??=e.inclusive,{start:n??t,end:r??t}}function Pc(e,t){return e==t||!!(e&&t&&e.compare(t))}function Fc(e,t,n,r=0){let i=n.length-1;i>=0&&n[i]+r>=e?n[i]=Math.max(n[i],t):n.push(e,t)}var Ic=class e extends js{constructor(e,t,n){super(),this.tagName=e,this.attributes=t,this.rank=n}eq(t){return t==this||t instanceof e&&this.tagName==t.tagName&&wc(this.attributes,t.attributes)}static create(t){return new e(t.tagName,t.attributes||Cc,t.rank==null?50:Math.max(0,Math.min(t.rank,100)))}static set(e,t=!1){return R.of(e,t)}};Ic.prototype.startSide=Ic.prototype.endSide=-1;var Lc=e=>e.nodeType==1,Rc=e=>e.nodeType==3;function zc(e){let t;return t=e.nodeType==11?e.getSelection?e:e.ownerDocument:e,t.getSelection()}function Bc(e,t){return t?e==t||e.contains(t.nodeType==1?t:t.parentNode):!1}function Vc(e,t){if(!t.anchorNode)return!1;try{return Bc(e,t.anchorNode)}catch{return!1}}function Hc(e){return Rc(e)?al(e,0,e.nodeValue.length).getClientRects():Lc(e)?e.getClientRects():[]}function Uc(e,t,n,r){return n?Kc(e,t,n,r,-1)||Kc(e,t,n,r,1):!1}function Wc(e){for(var t=0;;t++)if(e=e.previousSibling,!e)return t}function Gc(e){return Lc(e)&&/^(DIV|P|LI|UL|OL|BLOCKQUOTE|DD|DT|H\d|SECTION|PRE)$/.test(e.nodeName)}function Kc(e,t,n,r,i){for(;;){if(e==n&&t==r)return!0;if(t==(i<0?0:qc(e))){if(e.nodeName==`DIV`)return!1;let n=e.parentNode;if(!n||!Lc(n))return!1;t=Wc(e)+(i<0?0:1),e=n}else if(Lc(e)){if(e=e.childNodes[t+(i<0?-1:0)],Lc(e)&&(e.nodeName==`IMG`||e.nodeName==`BR`||e.contentEditable==`false`))return!1;t=i<0?qc(e):0}else return!1}}function qc(e){return Rc(e)?e.nodeValue.length:e.childNodes.length}function Jc(e,t){let{left:n,right:r}=e;if(n==r)return e;let i=t?n:r;return{left:i,right:i,top:e.top,bottom:e.bottom}}function Yc(e){let t=e.visualViewport;return t?{left:0,right:t.width,top:0,bottom:t.height}:{left:0,right:e.innerWidth,top:0,bottom:e.innerHeight}}function Xc(e,t){let n=t.width/e.offsetWidth,r=t.height/e.offsetHeight;return(n>.995&&n<1.005||!isFinite(n)||Math.abs(t.width-e.offsetWidth)<1)&&(n=1),(r>.995&&r<1.005||!isFinite(r)||Math.abs(t.height-e.offsetHeight)<1)&&(r=1),{scaleX:n,scaleY:r}}function Zc(e,t,n,r,i,a,o,s){let c=e.ownerDocument,l=c.defaultView||window;for(let u=e,d=!1;u&&!d;)if(Lc(u)){let e,f=u==c.body,p=1,m=1,h=!0,g=!0;if(f)e=Yc(l);else{let t=getComputedStyle(u);if(/^(fixed|sticky)$/.test(t.position)&&(d=!0),(u.scrollHeight<=u.clientHeight||!/auto|scroll/.test(t.overflowY))&&(g=!1),(u.scrollWidth<=u.clientWidth||!/auto|scroll/.test(t.overflowX))&&(h=!1),!h&&!g){u=u.assignedSlot||u.parentNode;continue}let n=u.getBoundingClientRect();({scaleX:p,scaleY:m}=Xc(u,n)),e={left:n.left,right:n.left+u.clientWidth*p,top:n.top,bottom:n.top+u.clientHeight*m}}let _=0,v=0;if(g){if(i==`nearest`)t.top<e.top+o?(v=t.top-(e.top+o),n>0&&t.bottom>e.bottom+v&&(v=t.bottom-e.bottom+o)):t.bottom>e.bottom-o&&(v=t.bottom-e.bottom+o,n<0&&t.top-v<e.top&&(v=t.top-(e.top+o)));else{let r=t.bottom-t.top,a=e.bottom-e.top;v=(i==`center`&&r<=a?t.top+r/2-a/2:i==`start`||i==`center`&&n<0?t.top-o:t.bottom-a+o)-e.top}}if(h&&(r==`nearest`?t.left<e.left+a?(_=t.left-(e.left+a),n>0&&t.right>e.right+_&&(_=t.right-e.right+a)):t.right>e.right-a&&(_=t.right-e.right+a,n<0&&t.left<e.left+_&&(_=t.left-(e.left+a))):_=(r==`center`?t.left+(t.right-t.left)/2-(e.right-e.left)/2:r==`start`==s?t.left-a:t.right-(e.right-e.left)+a)-e.left),_||v){if(f)l.scrollBy(_,v);else{let e=0,n=0;if(v){let e=u.scrollTop;u.scrollTop+=v/m,n=(u.scrollTop-e)*m}if(_){let t=u.scrollLeft;u.scrollLeft+=_/p,e=(u.scrollLeft-t)*p}t={left:t.left-e,top:t.top-n,right:t.right-e,bottom:t.bottom-n},e&&Math.abs(e-_)<1&&(r=`nearest`),n&&Math.abs(n-v)<1&&(i=`nearest`)}}if(f)break;(t.top<e.top||t.bottom>e.bottom||t.left<e.left||t.right>e.right)&&(t={left:Math.max(t.left,e.left),right:Math.min(t.right,e.right),top:Math.max(t.top,e.top),bottom:Math.min(t.bottom,e.bottom)}),u=u.assignedSlot||u.parentNode}else if(u.nodeType==11)u=u.host;else break}function Qc(e,t=!0){let n=e.ownerDocument,r=null,i=null;for(let a=e.parentNode;a&&!(a==n.body||(!t||r)&&i);)if(Lc(a))!i&&a.scrollHeight>a.clientHeight&&/scroll|auto/.test(getComputedStyle(a).overflowY)&&(i=a),t&&!r&&a.scrollWidth>a.clientWidth&&/scroll|auto/.test(getComputedStyle(a).overflowX)&&(r=a),a=a.assignedSlot||a.parentNode;else if(a.nodeType==11)a=a.host;else break;return{x:r,y:i}}var $c=class{constructor(){this.anchorNode=null,this.anchorOffset=0,this.focusNode=null,this.focusOffset=0}eq(e){return this.anchorNode==e.anchorNode&&this.anchorOffset==e.anchorOffset&&this.focusNode==e.focusNode&&this.focusOffset==e.focusOffset}setRange(e){let{anchorNode:t,focusNode:n}=e;this.set(t,Math.min(e.anchorOffset,t?qc(t):0),n,Math.min(e.focusOffset,n?qc(n):0))}set(e,t,n,r){this.anchorNode=e,this.anchorOffset=t,this.focusNode=n,this.focusOffset=r}};function el(e){let t=[];for(let n=e;n;n=n.nodeType==11?n.host:n.parentNode)Lc(n)&&t.push({node:n,left:n.scrollLeft,top:n.scrollTop});return t}function tl(e,t=!0){for(let{node:n,left:r,top:i}of e)t&&n.scrollTop!=i&&(n.scrollTop=i),n.scrollLeft!=r&&(n.scrollLeft=r)}var nl=null;z.safari&&z.safari_version>=26&&(nl=!1);function rl(e){if(e.setActive)return e.setActive();if(nl)return e.focus(nl);let t=el(e);e.focus(nl==null?{get preventScroll(){return nl={preventScroll:!0},!0}}:void 0),nl||(nl=!1,tl(t))}var il;function al(e,t,n=t){let r=il||=document.createRange();return r.setEnd(e,n),r.setStart(e,t),r}function ol(e,t,n,r){let i={key:t,code:t,keyCode:n,which:n,cancelable:!0};r&&({altKey:i.altKey,ctrlKey:i.ctrlKey,shiftKey:i.shiftKey,metaKey:i.metaKey}=r);let a=new KeyboardEvent(`keydown`,i);a.synthetic=!0,e.dispatchEvent(a);let o=new KeyboardEvent(`keyup`,i);return o.synthetic=!0,e.dispatchEvent(o),a.defaultPrevented||o.defaultPrevented}function sl(e){for(;e;){if(e&&(e.nodeType==9||e.nodeType==11&&e.host))return e;e=e.assignedSlot||e.parentNode}return null}function cl(e,t){let n=t.focusNode,r=t.focusOffset;if(!n||t.anchorNode!=n||t.anchorOffset!=r)return!1;for(r=Math.min(r,qc(n));;)if(r){if(!Lc(n))return!1;let e=n.childNodes[r-1];e.contentEditable==`false`?r--:(n=e,r=qc(n))}else if(n==e)return!0;else r=Wc(n),n=n.parentNode}function ll(e){return e instanceof Window?e.pageYOffset>Math.max(0,e.document.documentElement.scrollHeight-e.innerHeight-4):e.scrollTop>Math.max(1,e.scrollHeight-e.clientHeight-4)}function ul(e,t){for(let n=e,r=t;;)if(Rc(n)&&r>0)return{node:n,offset:r};else if(Lc(n)&&r>0){if(n.contentEditable==`false`)return null;n=n.childNodes[r-1],r=qc(n)}else if(n.parentNode&&!Gc(n))r=Wc(n),n=n.parentNode;else return null}function dl(e,t){for(let n=e,r=t;;)if(Rc(n)&&r<n.nodeValue.length)return{node:n,offset:r};else if(Lc(n)&&r<n.childNodes.length){if(n.contentEditable==`false`)return null;n=n.childNodes[r],r=0}else if(n.parentNode&&!Gc(n))r=Wc(n)+1,n=n.parentNode;else return null}var fl=class e{constructor(e,t,n=!0){this.node=e,this.offset=t,this.precise=n}static before(t,n){return new e(t.parentNode,Wc(t),n)}static after(t,n){return new e(t.parentNode,Wc(t)+1,n)}},V=(function(e){return e[e.LTR=0]=`LTR`,e[e.RTL=1]=`RTL`,e})(V||={}),pl=V.LTR,ml=V.RTL;function hl(e){let t=[];for(let n=0;n<e.length;n++)t.push(1<<e[n]);return t}var gl=hl(`88888888888888888888888888888888888666888888787833333333337888888000000000000000000000000008888880000000000000000000000000088888888888888888888888888888888888887866668888088888663380888308888800000000000000000000000800000000000000000000000000000008`),_l=hl(`4444448826627288999999999992222222222222222222222222222222222222222222222229999999999999999999994444444444644222822222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222999999949999999229989999223333333333`),vl=Object.create(null),yl=[];for(let e of[`()`,`[]`,`{}`]){let t=e.charCodeAt(0),n=e.charCodeAt(1);vl[t]=n,vl[n]=-t}function bl(e){return e<=247?gl[e]:1424<=e&&e<=1524?2:1536<=e&&e<=1785?_l[e-1536]:1774<=e&&e<=2220?4:8192<=e&&e<=8204?256:64336<=e&&e<=65023?4:1}var xl=/[\u0590-\u05f4\u0600-\u06ff\u0700-\u08ac\ufb50-\ufdff]/,Sl=class{get dir(){return this.level%2?ml:pl}constructor(e,t,n){this.from=e,this.to=t,this.level=n}side(e,t){return this.dir==t==e?this.to:this.from}forward(e,t){return e==(this.dir==t)}static find(e,t,n,r){let i=-1;for(let a=0;a<e.length;a++){let o=e[a];if(o.from<=t&&o.to>=t){if(o.level==n)return a;(i<0||(r==0?e[i].level>o.level:r<0?o.from<t:o.to>t))&&(i=a)}}if(i<0)throw RangeError(`Index out of range`);return i}};function Cl(e,t){if(e.length!=t.length)return!1;for(let n=0;n<e.length;n++){let r=e[n],i=t[n];if(r.from!=i.from||r.to!=i.to||r.direction!=i.direction||!Cl(r.inner,i.inner))return!1}return!0}var H=[];function wl(e,t,n,r,i){for(let a=0;a<=r.length;a++){let o=a?r[a-1].to:t,s=a<r.length?r[a].from:n,c=a?256:i;for(let t=o,n=c,r=c;t<s;t++){let i=bl(e.charCodeAt(t));i==512?i=n:i==8&&r==4&&(i=16),H[t]=i==4?2:i,i&7&&(r=i),n=i}for(let e=o,t=c,r=c;e<s;e++){let i=H[e];if(i==128)e<s-1&&t==H[e+1]&&t&24?i=H[e]=t:H[e]=256;else if(i==64){let i=e+1;for(;i<s&&H[i]==64;)i++;let a=e&&t==8||i<n&&H[i]==8?r==1?1:8:256;for(let t=e;t<i;t++)H[t]=a;e=i-1}else i==8&&r==1&&(H[e]=1);t=i,i&7&&(r=i)}}}function Tl(e,t,n,r,i){let a=i==1?2:1;for(let o=0,s=0,c=0;o<=r.length;o++){let l=o?r[o-1].to:t,u=o<r.length?r[o].from:n;for(let t=l,n,r,o;t<u;t++)if(r=vl[n=e.charCodeAt(t)]){if(r<0){for(let e=s-3;e>=0;e-=3)if(yl[e+1]==-r){let n=yl[e+2],r=n&2?i:n&4?n&1?a:i:0;r&&(H[t]=H[yl[e]]=r),s=e;break}}else if(yl.length==189)break;else yl[s++]=t,yl[s++]=n,yl[s++]=c}else if((o=H[t])==2||o==1){let e=o==i;c=+!e;for(let t=s-3;t>=0;t-=3){let n=yl[t+2];if(n&2)break;if(e)yl[t+2]|=2;else{if(n&4)break;yl[t+2]|=4}}}}}function El(e,t,n,r){for(let i=0,a=r;i<=n.length;i++){let o=i?n[i-1].to:e,s=i<n.length?n[i].from:t;for(let c=o;c<s;){let o=H[c];if(o==256){let o=c+1;for(;;)if(o==s){if(i==n.length)break;o=n[i++].to,s=i<n.length?n[i].from:t}else if(H[o]==256)o++;else break;let l=a==1,u=l==((o<t?H[o]:r)==1)?l?1:2:r;for(let t=o,r=i,a=r?n[r-1].to:e;t>c;)t==a&&(t=n[--r].from,a=r?n[r-1].to:e),H[--t]=u;c=o}else a=o,c++}}}function Dl(e,t,n,r,i,a,o){let s=r%2?2:1;if(r%2==i%2)for(let c=t,l=0;c<n;){let t=!0,u=!1;if(l==a.length||c<a[l].from){let e=H[c];e!=s&&(t=!1,u=e==16)}let d=!t&&s==1?[]:null,f=t?r:r+1,p=c;run:for(;;)if(l<a.length&&p==a[l].from){if(u)break run;let m=a[l];if(!t)for(let e=m.to,t=l+1;;){if(e==n)break run;if(t<a.length&&a[t].from==e)e=a[t++].to;else if(H[e]==s)break run;else break}l++,d?d.push(m):(m.from>c&&o.push(new Sl(c,m.from,f)),Ol(e,m.direction==pl==!(f%2)?r:r+1,i,m.inner,m.from,m.to,o),c=m.to),p=m.to}else if(p==n||(t?H[p]!=s:H[p]==s))break;else p++;d?Dl(e,c,p,r+1,i,d,o):c<p&&o.push(new Sl(c,p,f)),c=p}else for(let c=n,l=a.length;c>t;){let n=!0,u=!1;if(!l||c>a[l-1].to){let e=H[c-1];e!=s&&(n=!1,u=e==16)}let d=!n&&s==1?[]:null,f=n?r:r+1,p=c;run:for(;;)if(l&&p==a[l-1].to){if(u)break run;let m=a[--l];if(!n)for(let e=m.from,n=l;;){if(e==t)break run;if(n&&a[n-1].to==e)e=a[--n].from;else if(H[e-1]==s)break run;else break}d?d.push(m):(m.to<c&&o.push(new Sl(m.to,c,f)),Ol(e,m.direction==pl==!(f%2)?r:r+1,i,m.inner,m.from,m.to,o),c=m.from),p=m.from}else if(p==t||(n?H[p-1]!=s:H[p-1]==s))break;else p--;d?Dl(e,p,c,r+1,i,d,o):p<c&&o.push(new Sl(p,c,f)),c=p}}function Ol(e,t,n,r,i,a,o){let s=t%2?2:1;wl(e,i,a,r,s),Tl(e,i,a,r,s),El(i,a,r,s),Dl(e,i,a,t,n,r,o)}function kl(e,t,n){if(!e)return[new Sl(0,0,+(t==ml))];if(t==pl&&!n.length&&!xl.test(e))return Al(e.length);if(n.length)for(;e.length>H.length;)H[H.length]=256;let r=[],i=t==pl?0:1;return Ol(e,i,i,n,0,e.length,r),r}function Al(e){return[new Sl(0,e,0)]}var jl=``;function Ml(e,t,n,r,i){if(!e.length)return null;let a=r.head-e.from,o;if(r.head==e.from&&r.assoc<0){if(!i)return null;a=t[o=0].side(!1,n)}else if(r.head==e.to&&r.assoc>0){if(i)return null;a=t[o=t.length-1].side(!0,n)}else o=Sl.find(t,a,r.bidiLevel??-1,r.assoc);let s=t[o],c=s.side(i,n);if(a==c){let e=o+=i?1:-1;if(e<0||e>=t.length)return null;s=t[o=e],a=s.side(!i,n),c=s.side(i,n)}let l=To(e.text,a,s.forward(i,n));(l<s.from||l>s.to)&&(l=c),jl=e.text.slice(Math.min(a,l),Math.max(a,l));let u=o==(i?t.length-1:0)?null:t[o+(i?1:-1)];if(l==c){if(!u)return i?P.cursor(e.to,1):P.cursor(e.from,-1);if(u.level+ +!i<s.level)return P.cursor(u.side(!i,n)+e.from,u.forward(i,n)?1:-1,u.level)}return P.cursor(l+e.from,s.forward(i,n)?-1:1,s.level)}function Nl(e,t,n){for(let r=t;r<n;r++){let t=bl(e.charCodeAt(r));if(t==1)return pl;if(t==2||t==4)return ml}}var Pl=F.define(),Fl=F.define(),Il=F.define(),Ll=F.define(),Rl=F.define(),zl=F.define(),Bl=F.define(),Vl=F.define(),Hl=F.define(),Ul=F.define({combine:e=>e.some(e=>e)}),Wl=F.define({combine:e=>e.some(e=>e)}),Gl=F.define(),Kl=class e{constructor(e,t,n,r,i,a=!1){this.range=e,this.y=t,this.x=n,this.yMargin=r,this.xMargin=i,this.isSnapshot=a}map(t){return t.empty?this:new e(this.range.map(t),this.y,this.x,this.yMargin,this.xMargin,this.isSnapshot)}clip(t){return this.range.to<=t.doc.length?this:new e(P.cursor(t.doc.length),this.y,this.x,this.yMargin,this.xMargin,this.isSnapshot)}},ql=I.define({map:(e,t)=>e.map(t)}),Jl=I.define();function Yl(e,t,n){let r=e.facet(Ll);r.length?r[0](t):window.onerror&&window.onerror(String(t),n,void 0,void 0,t)||(n?console.error(n+`:`,t):console.error(t))}var Xl=F.define({combine:e=>!e.length||e[0]}),Zl=0,Ql=F.define({combine(e){return e.filter((t,n)=>{for(let r=0;r<n;r++)if(e[r].plugin==t.plugin)return!1;return!0})}}),$l=class e{constructor(e,t,n,r,i){this.id=e,this.create=t,this.domEventHandlers=n,this.domEventObservers=r,this.baseExtensions=i(this),this.extension=this.baseExtensions.concat(Ql.of({plugin:this,arg:void 0}))}of(e){return this.baseExtensions.concat(Ql.of({plugin:this,arg:e}))}static define(t,n){let{eventHandlers:r,eventObservers:i,provide:a,decorations:o}=n||{};return new e(Zl++,t,r,i,e=>{let t=[];return o&&t.push(ru.of(t=>{let n=t.plugin(e);return n?o(n):B.none})),a&&t.push(a(e)),t})}static fromClass(t,n){return e.define((e,n)=>new t(e,n),n)}},eu=class{constructor(e){this.spec=e,this.mustUpdate=null,this.value=null}get plugin(){return this.spec&&this.spec.plugin}update(e){if(!this.value){if(this.spec)try{this.value=this.spec.plugin.create(e,this.spec.arg)}catch(t){Yl(e.state,t,`CodeMirror plugin crashed`),this.deactivate()}}else if(this.mustUpdate){let e=this.mustUpdate;if(this.mustUpdate=null,this.value.update)try{this.value.update(e)}catch(t){if(Yl(e.state,t,`CodeMirror plugin crashed`),this.value.destroy)try{this.value.destroy()}catch{}this.deactivate()}}return this}destroy(e){if(this.value?.destroy)try{this.value.destroy()}catch(t){Yl(e.state,t,`CodeMirror plugin crashed`)}}deactivate(){this.spec=this.value=null}},tu=F.define(),nu=F.define(),ru=F.define(),iu=F.define(),au=F.define(),ou=F.define(),su=F.define();function cu(e,t){let n=e.state.facet(su);if(!n.length)return n;let r=n.map(t=>t instanceof Function?t(e):t),i=[];return R.spans(r,t.from,t.to,{point(){},span(e,n,r,a){let o=e-t.from,s=n-t.from,c=i;for(let e=r.length-1;e>=0;e--,a--){let t=r[e].spec.bidiIsolate,n;if(a>0&&c.length&&(n=c[c.length-1]).to==o&&n.direction==t)n.to=s,c=n.inner;else{let e={from:o,to:s,direction:t,inner:[]};c.push(e),c=e.inner}}}}),lu(t.text,i)}function lu(e,t){for(let n of t){if(n.direction==null){for(let t=n.from,r=0;t<n.to;r++){let i=r<n.inner.length?n.inner[r]:null,a=Nl(e,t,i?i.from:n.to);if(a){n.direction=a;break}if(!i)break;t=i.to}n.direction??=V.LTR}lu(e,n.inner)}return t}var uu=F.define();function du(e){let t=0,n=0,r=0,i=0;for(let a of e.state.facet(uu)){let o=a(e);o&&(o.left!=null&&(t=Math.max(t,o.left)),o.right!=null&&(n=Math.max(n,o.right)),o.top!=null&&(r=Math.max(r,o.top)),o.bottom!=null&&(i=Math.max(i,o.bottom)))}return{left:t,right:n,top:r,bottom:i}}var fu=F.define(),pu=class e{constructor(e,t,n,r){this.fromA=e,this.toA=t,this.fromB=n,this.toB=r}join(t){return new e(Math.min(this.fromA,t.fromA),Math.max(this.toA,t.toA),Math.min(this.fromB,t.fromB),Math.max(this.toB,t.toB))}addToSet(e){let t=e.length,n=this;for(;t>0;t--){let r=e[t-1];if(!(r.fromA>n.toA)){if(r.toA<n.fromA)break;n=n.join(r),e.splice(t-1,1)}}return e.splice(t,0,n),e}static extendWithRanges(t,n){if(n.length==0)return t;let r=[];for(let i=0,a=0,o=0;;){let s=i<t.length?t[i].fromB:1e9,c=a<n.length?n[a]:1e9,l=Math.min(s,c);if(l==1e9)break;let u=l+o,d=l,f=u;for(;;)if(a<n.length&&n[a]<=d){let e=n[a+1];a+=2,d=Math.max(d,e);for(let e=i;e<t.length&&t[e].fromB<=d;e++)o=t[e].toA-t[e].toB;f=Math.max(f,e+o)}else if(i<t.length&&t[i].fromB<=d){let e=t[i++];d=Math.max(d,e.toB),f=Math.max(f,e.toA),o=e.toA-e.toB}else break;r.push(new e(u,f,l,d))}return r}},mu=class e{constructor(e,t,n){this.view=e,this.state=t,this.transactions=n,this.flags=0,this.startState=e.state,this.changes=No.empty(this.startState.doc.length);for(let e of n)this.changes=this.changes.compose(e.changes);let r=[];this.changes.iterChangedRanges((e,t,n,i)=>r.push(new pu(e,t,n,i))),this.changedRanges=r}static create(t,n,r){return new e(t,n,r)}get viewportChanged(){return(this.flags&4)>0}get viewportMoved(){return(this.flags&8)>0}get heightChanged(){return(this.flags&2)>0}get geometryChanged(){return this.docChanged||(this.flags&18)>0}get focusChanged(){return(this.flags&1)>0}get docChanged(){return!this.changes.empty}get selectionSet(){return this.transactions.some(e=>e.selection)}get empty(){return this.flags==0&&this.transactions.length==0}},hu=[],U=class{constructor(e,t,n=0){this.dom=e,this.length=t,this.flags=n,this.parent=null,e.cmTile=this}get breakAfter(){return this.flags&1}get children(){return hu}isWidget(){return!1}get isHidden(){return!1}isComposite(){return!1}isLine(){return!1}isText(){return!1}isBlock(){return!1}get domAttrs(){return null}sync(e){if(this.flags|=2,this.flags&4){this.flags&=-5;let e=this.domAttrs;e&&Tc(this.dom,e)}}toString(){return this.constructor.name+(this.children.length?`(${this.children})`:``)+(this.breakAfter?`#`:``)}destroy(){this.parent=null}setDOM(e){this.dom=e,e.cmTile=this}get posAtStart(){return this.parent?this.parent.posBefore(this):0}get posAtEnd(){return this.posAtStart+this.length}posBefore(e,t=this.posAtStart){let n=t;for(let t of this.children){if(t==e)return n;n+=t.length+t.breakAfter}throw RangeError(`Invalid child in posBefore`)}posAfter(e){return this.posBefore(e)+e.length}covers(e){return!0}coordsIn(e,t,n){return null}domPosFor(e,t){let n=Wc(this.dom),r=this.length?e>0:t>0;return new fl(this.parent.dom,n+ +!!r,e==0||e==this.length)}markDirty(e){this.flags&=-3,e&&(this.flags|=4),this.parent&&this.parent.flags&2&&this.parent.markDirty(!1)}get overrideDOMText(){return null}get root(){for(let e=this;e;e=e.parent)if(e instanceof vu)return e;return null}static get(e){return e.cmTile}},gu=class extends U{constructor(e){super(e,0),this._children=[]}isComposite(){return!0}get children(){return this._children}get lastChild(){return this.children.length?this.children[this.children.length-1]:null}append(e){this.children.push(e),e.parent=this}sync(e){if(this.flags&2)return;super.sync(e);let t=this.dom,n=null,r,i=e?.node==t?e:null,a=0;for(let o of this.children){if(o.sync(e),a+=o.length+o.breakAfter,r=n?n.nextSibling:t.firstChild,i&&r!=o.dom&&(i.written=!0),o.dom.parentNode==t)for(;r&&r!=o.dom;)r=_u(r);else t.insertBefore(o.dom,r);n=o.dom}for(r=n?n.nextSibling:t.firstChild,i&&r&&(i.written=!0);r;)r=_u(r);this.length=a}};function _u(e){let t=e.nextSibling;return e.parentNode.removeChild(e),t}var vu=class extends gu{constructor(e,t){super(t),this.view=e}owns(e){for(;e;e=e.parent)if(e==this)return!0;return!1}isBlock(){return!0}nearest(e){for(;;){if(!e)return null;let t=U.get(e);if(t&&this.owns(t))return t;e=e.parentNode}}blockTiles(e){for(let t=[],n=this,r=0,i=0;;)if(r==n.children.length){if(!t.length)return;n=n.parent,n.breakAfter&&i++,r=t.pop()}else{let a=n.children[r++];if(a instanceof yu)t.push(r),n=a,r=0;else{let t=i+a.length,n=e(a,i);if(n!==void 0)return n;i=t+a.breakAfter}}}resolveBlock(e,t){let n,r=-1,i,a=-1;if(this.blockTiles((o,s)=>{let c=s+o.length;if(e>=s&&e<=c){if(o.isWidget()&&t>=-1&&t<=1){if(o.flags&32)return!0;o.flags&16&&(n=void 0)}(s<e||e==c&&(t<-1?o.length:o.covers(1)))&&(!n||!o.isWidget()&&n.isWidget())&&(n=o,r=e-s),(c>e||e==s&&(t>1?o.length:o.covers(-1)))&&(!i||!o.isWidget()&&i.isWidget())&&(i=o,a=e-s)}}),!n&&!i)throw Error(`No tile at position `+e);return n&&t<0||!i?{tile:n,offset:r}:{tile:i,offset:a}}},yu=class e extends gu{constructor(e,t){super(e),this.wrapper=t}isBlock(){return!0}covers(e){return this.children.length?e<0?this.children[0].covers(-1):this.lastChild.covers(1):!1}get domAttrs(){return this.wrapper.attributes}static of(t,n){let r=new e(n||document.createElement(t.tagName),t);return n||(r.flags|=4),r}},bu=class e extends gu{constructor(e,t){super(e),this.attrs=t}isLine(){return!0}static start(t,n,r){let i=new e(n||document.createElement(`div`),t);return n&&r||(i.flags|=4),i}get domAttrs(){return this.attrs}resolveInline(e,t,n=!1){let r=null,i=-1,a=null,o=-1;function s(e,c){for(let l=0,u=0;l<e.children.length&&u<=c;l++){let d=e.children[l],f=u+d.length;f>=c&&(d.isComposite()?s(d,c-u):(!a||n&&a.isHidden&&(t>0&&!(a.flags&32)||n&&Su(a,d)))&&(f>c||d.flags&32&&t<=1)?(a=d,o=c-u):(u<c||d.flags&16&&!(n&&d.isHidden)&&t>=-1)&&(r=d,i=c-u)),u=f}}s(this,e);let c=(t<0?r:a)||r||a;return c?{tile:c,offset:c==r?i:o}:null}coordsIn(e,t,n){let r=this.resolveInline(e,t,!0);return r?r.tile.coordsIn(Math.max(0,r.offset),t,n):xu(this)}domIn(e,t){let n=this.resolveInline(e,t);if(n){let{tile:e,offset:r}=n;if(this.dom.contains(e.dom))return e.isText()?new fl(e.dom,Math.min(e.dom.nodeValue.length,r)):e.domPosFor(r,e.flags&16?1:e.flags&32?-1:t);let i=n.tile.parent,a=!1;for(let e of i.children){if(a)return new fl(e.dom,0);e==n.tile&&(a=!0)}}return new fl(this.dom,0)}};function xu(e){let t=e.dom.lastChild;if(!t)return e.dom.getBoundingClientRect();let n=Hc(t);return n[n.length-1]||null}function Su(e,t){let n=e.coordsIn(0,1),r=t.coordsIn(0,1);return n&&r&&r.top<n.bottom}var Cu=class e extends gu{constructor(e,t){super(e),this.mark=t}get domAttrs(){return this.mark.attrs}static of(t,n){let r=new e(n||document.createElement(t.tagName),t);return n||(r.flags|=4),r}},wu=class e extends U{constructor(e,t){super(e,t.length),this.text=t}sync(e){this.flags&2||(super.sync(e),this.dom.nodeValue!=this.text&&(e&&e.node==this.dom&&(e.written=!0),this.dom.nodeValue=this.text))}isText(){return!0}toString(){return JSON.stringify(this.text)}coordsIn(e,t,n){let r=this.dom.nodeValue.length;e>r&&(e=r);let i=e,a=e,o=0;e==0&&t<0||e==r&&t>=0?z.chrome||z.gecko||(e?(i--,o=1):a<r&&(a++,o=-1)):t<0?i--:a<r&&a++;let s=al(this.dom,i,a).getClientRects();if(!s.length)return null;let c=s[(o?o<0:t>=0)?0:s.length-1];return z.safari&&!o&&c.width==0&&(c=Array.prototype.find.call(s,e=>e.width)||c),n==null?c:Jc(c,(o?o>0:t<0)==n)}static of(t,n){let r=new e(n||document.createTextNode(t),t);return n||(r.flags|=2),r}},Tu=class e extends U{constructor(e,t,n,r){super(e,t,r),this.widget=n}isWidget(){return!0}get isHidden(){return this.widget.isHidden}covers(e){return this.flags&48?!1:(this.flags&(e<0?64:128))>0}coordsIn(e,t){return this.coordsInWidget(e,t,!1)}coordsInWidget(e,t,n){let r=this.widget.coordsAt(this.dom,e,t);if(r)return r;if(n)return Jc(this.dom.getBoundingClientRect(),this.length?e==0:t<=0);{let t=this.dom.getClientRects(),n=null;if(!t.length)return null;let r=this.flags&16?!0:this.flags&32?!1:e>0;for(let i=r?t.length-1:0;n=t[i],!(e>0?i==0:i==t.length-1||n.top<n.bottom);i+=r?-1:1);return Jc(n,!r)}}get overrideDOMText(){if(!this.length)return N.empty;let{root:e}=this;if(!e)return N.empty;let t=this.posAtStart;return e.view.state.doc.slice(t,t+this.length)}destroy(){super.destroy(),this.widget.destroy(this.dom)}static of(t,n,r,i,a){return a||(a=t.toDOM(n),t.editable||(a.contentEditable=`false`)),new e(a,r,t,i)}},Eu=class extends U{constructor(e){let t=document.createElement(`img`);t.className=`cm-widgetBuffer`,t.setAttribute(`aria-hidden`,`true`),super(t,0,e)}get isHidden(){return!0}get overrideDOMText(){return N.empty}coordsIn(e,t,n){let r=this.dom.getBoundingClientRect();return n==null?r:Jc(r,t>0==n)}},Du=class{constructor(e){this.index=0,this.beforeBreak=!1,this.parents=[],this.tile=e}advance(e,t,n){let{tile:r,index:i,beforeBreak:a,parents:o}=this;for(;e||t>0;)if(!r.isComposite()){let t=r.length;if(i<t&&e){let a=Math.min(e,t-i);n&&n.skip(r,i,i+a),e-=a,i+=a}if(i==t)a=!!r.breakAfter,{tile:r,index:i}=o.pop(),i++;else if(!e)break}else if(a){if(!e)break;n&&n.break(),e--,a=!1}else if(i==r.children.length){if(!e&&!o.length)break;n&&n.leave(r),a=!!r.breakAfter,{tile:r,index:i}=o.pop(),i++}else{let s=r.children[i],c=s.breakAfter;(t>0?s.length<=e:s.length<e)&&(!n||n.skip(s,0,s.length)!==!1||!s.isComposite)?(a=!!c,i++,e-=s.length):(o.push({tile:r,index:i}),r=s,i=0,n&&s.isComposite()&&n.enter(s))}return this.tile=r,this.index=i,this.beforeBreak=a,this}get root(){return this.parents.length?this.parents[0].tile:this.tile}},Ou=class{constructor(e,t,n,r){this.from=e,this.to=t,this.wrapper=n,this.rank=r}},ku=class{constructor(e,t,n){this.cache=e,this.root=t,this.blockWrappers=n,this.curLine=null,this.lastBlock=null,this.afterWidget=null,this.pos=0,this.wrappers=[],this.wrapperPos=0}addText(e,t,n,r){this.flushBuffer();let i=this.ensureMarks(t,n),a=i.lastChild;if(a&&a.isText()&&!(a.flags&8)&&a.length+e.length<512){this.cache.reused.set(a,2);let t=i.children[i.children.length-1]=new wu(a.dom,a.text+e);t.parent=i}else i.append(r||wu.of(e,this.cache.find(wu)?.dom));this.pos+=e.length,this.afterWidget=null}addComposition(e,t){let n=this.curLine;n.dom!=t.line.dom&&(n.setDOM(this.cache.reused.has(t.line)?zu(t.line.dom):t.line.dom),this.cache.reused.set(t.line,2));let r=n;for(let e=t.marks.length-1;e>=0;e--){let n=t.marks[e],i=r.lastChild;if(i instanceof Cu&&i.mark.eq(n.mark))i.dom!=n.dom&&i.setDOM(zu(n.dom)),r=i;else{let{dom:e}=n;this.cache.reused.get(n)&&U.get(n.dom)&&(e=zu(n.dom));let t=Cu.of(n.mark,e);r.append(t),r=t}this.cache.reused.set(n,2)}let i=U.get(e.text);i&&this.cache.reused.set(i,2);let a=new wu(e.text,e.text.nodeValue);a.flags|=8,this.pos=e.range.toB,r.append(a)}addInlineWidget(e,t,n){let r=this.afterWidget&&e.flags&48&&(this.afterWidget.flags&48)==(e.flags&48);r||this.flushBuffer();let i=this.ensureMarks(t,n);!r&&!(e.flags&16)&&i.append(this.getBuffer(1)),i.append(e),this.pos+=e.length,this.afterWidget=e}addMark(e,t,n){this.flushBuffer(),this.ensureMarks(t,n).append(e),this.pos+=e.length,this.afterWidget=null}addBlockWidget(e){this.getBlockPos().append(e),this.pos+=e.length,this.lastBlock=e,this.endLine()}continueWidget(e){let t=this.afterWidget||this.lastBlock;t.length+=e,this.pos+=e}addLineStart(e,t){e||=Iu;let n=bu.start(e,t||this.cache.find(bu)?.dom,!!t);this.getBlockPos().append(this.lastBlock=this.curLine=n)}addLine(e){this.getBlockPos().append(e),this.pos+=e.length,this.lastBlock=e,this.endLine()}addBreak(){this.lastBlock.flags|=1,this.endLine(),this.pos++}addLineStartIfNotCovered(e){this.blockPosCovered()||this.addLineStart(e)}ensureLine(e){this.curLine||this.addLineStart(e)}ensureMarks(e,t){let n=this.curLine;for(let r=e.length-1;r>=0;r--){let i=e[r],a;if(t>0&&(a=n.lastChild)&&a instanceof Cu&&a.mark.eq(i))n=a,t--;else{let e=Cu.of(i,this.cache.find(Cu,e=>e.mark.eq(i))?.dom);n.append(e),n=e,t=0}}return n}endLine(){if(this.curLine){this.flushBuffer();let e=this.curLine.lastChild;(!e||!Pu(this.curLine,!1)||e.dom.nodeName!=`BR`&&e.isWidget()&&!(z.ios&&Pu(this.curLine,!0)))&&this.curLine.append(this.cache.findWidget(Vu,0,32)||new Tu(Vu.toDOM(),0,Vu,32)),this.curLine=this.afterWidget=null}}updateBlockWrappers(){this.wrapperPos>this.pos+1e4&&(this.blockWrappers.goto(this.pos),this.wrappers.length=0);for(let e=this.wrappers.length-1;e>=0;e--)this.wrappers[e].to<this.pos&&this.wrappers.splice(e,1);for(let e=this.blockWrappers;e.value&&e.from<=this.pos;e.next())if(e.to>=this.pos){let t=e.rank*102+e.value.rank,n=new Ou(e.from,e.to,e.value,t),r=this.wrappers.length;for(;r>0&&(this.wrappers[r-1].rank-n.rank||this.wrappers[r-1].to-n.to)<0;)r--;this.wrappers.splice(r,0,n)}this.wrapperPos=this.pos}getBlockPos(){this.updateBlockWrappers();let e=this.root;for(let t of this.wrappers){let n=e.lastChild;if(t.from<this.pos&&n instanceof yu&&n.wrapper.eq(t.wrapper))e=n;else{let n=yu.of(t.wrapper,this.cache.find(yu,e=>e.wrapper.eq(t.wrapper))?.dom);e.append(n),e=n}}return e}blockPosCovered(){let e=this.lastBlock;return e!=null&&!e.breakAfter&&(!e.isWidget()||(e.flags&160)>0)}getBuffer(e){let t=2|(e<0?16:32),n=this.cache.find(Eu,void 0,1);return n&&(n.flags=t),n||new Eu(t)}flushBuffer(){this.afterWidget&&!(this.afterWidget.flags&32)&&(this.afterWidget.parent.append(this.getBuffer(-1)),this.afterWidget=null)}},Au=class{constructor(e){this.skipCount=0,this.text=``,this.textOff=0,this.cursor=e.iter()}skip(e){this.textOff+e<=this.text.length?this.textOff+=e:(this.skipCount+=e-(this.text.length-this.textOff),this.text=``,this.textOff=0)}next(e){if(this.textOff==this.text.length){let{value:t,lineBreak:n,done:r}=this.cursor.next(this.skipCount);if(this.skipCount=0,r)throw Error(`Ran out of text content when drawing inline views`);this.text=t;let i=this.textOff=Math.min(e,t.length);return n?null:t.slice(0,i)}let t=Math.min(this.text.length,this.textOff+e),n=this.text.slice(this.textOff,t);return this.textOff=t,n}},ju=[Tu,bu,wu,Cu,Eu,yu,vu];for(let e=0;e<ju.length;e++)ju[e].bucket=e;var Mu=class{constructor(e){this.view=e,this.buckets=ju.map(()=>[]),this.index=ju.map(()=>0),this.reused=new Map}add(e){let t=e.constructor.bucket,n=this.buckets[t];n.length<6?n.push(e):n[this.index[t]=(this.index[t]+1)%6]=e}find(e,t,n=2){let r=e.bucket,i=this.buckets[r],a=this.index[r];for(let e=0;e<i.length;e++){let o=(e+a)%i.length,s=i[o];if((!t||t(s))&&!this.reused.has(s))return i.splice(o,1),o<a&&this.index[r]--,this.reused.set(s,n),s}return null}findWidget(e,t,n){let r=this.buckets[0];if(r.length)for(let i=0,a=0;;i++){if(i==r.length){if(a)return null;a=1,i=0}let o=r[i];if(!this.reused.has(o)&&(a==0?o.widget.compare(e):o.widget.constructor==e.constructor&&e.updateDOM(o.dom,this.view,o.widget)))return r.splice(i,1),i<this.index[0]&&this.index[0]--,o.widget==e&&o.length==t&&(o.flags&497)==n?(this.reused.set(o,1),o):(this.reused.set(o,2),new Tu(o.dom,t,e,o.flags&-498|n))}}reuse(e){return this.reused.set(e,1),e}maybeReuse(e,t=2){if(!this.reused.has(e))return this.reused.set(e,t),e.dom}clear(){for(let e=0;e<this.buckets.length;e++)this.buckets[e].length=this.index[e]=0}},Nu=class{constructor(e,t,n,r,i){this.view=e,this.decorations=r,this.disallowBlockEffectsFor=i,this.openWidget=!1,this.openMarks=0,this.cache=new Mu(e),this.text=new Au(e.state.doc),this.builder=new ku(this.cache,new vu(e,e.contentDOM),R.iter(n)),this.cache.reused.set(t,2),this.old=new Du(t),this.reuseWalker={skip:(e,t,n)=>{if(this.cache.add(e),e.isComposite())return!1},enter:e=>this.cache.add(e),leave:()=>{},break:()=>{}}}run(e,t){let n=t&&this.getCompositionContext(t.text);for(let r=0,i=0,a=0;;){let o=a<e.length?e[a++]:null,s=o?o.fromA:this.old.root.length;if(s>r){let e=s-r;this.preserve(e,!a,!o),r=s,i+=e}if(!o)break;t&&o.fromA<=t.range.fromA&&o.toA>=t.range.toA?(this.forward(o.fromA,t.range.fromA,t.range.fromA<t.range.toA?1:-1),this.emit(i,t.range.fromB),this.builder.flushBuffer(),this.cache.clear(),this.builder.addComposition(t,n),this.text.skip(t.range.toB-t.range.fromB),this.forward(t.range.fromA,o.toA),this.emit(t.range.toB,o.toB)):(this.forward(o.fromA,o.toA),this.emit(i,o.toB)),i=o.toB,r=o.toA}return this.builder.curLine&&this.builder.endLine(),this.builder.root}preserve(e,t,n){let r=Ru(this.old),i=this.openMarks;this.old.advance(e,n?1:-1,{skip:(e,t,n)=>{if(e.isWidget()){if(this.openWidget)this.builder.continueWidget(n-t);else{let a=n>0||t<e.length?Tu.of(e.widget,this.view,n-t,e.flags&496,this.cache.maybeReuse(e)):this.cache.reuse(e);a.flags&256?(a.flags&=-2,this.builder.addBlockWidget(a)):(this.builder.ensureLine(null),this.builder.addInlineWidget(a,r,i),i=r.length)}}else if(e.isText())this.builder.ensureLine(null),!t&&n==e.length&&!this.cache.reused.has(e)?this.builder.addText(e.text,r,i,this.cache.reuse(e)):(this.cache.add(e),this.builder.addText(e.text.slice(t,n),r,i)),i=r.length;else if(e.isLine())e.flags&=-2,this.cache.reused.set(e,1),this.builder.addLine(e);else if(e instanceof Eu)this.cache.add(e);else if(e instanceof Cu)this.builder.ensureLine(null),this.builder.addMark(e,r,i),this.cache.reused.set(e,1),i=r.length;else return!1;this.openWidget=!1},enter:e=>{e.isLine()?this.builder.addLineStart(e.attrs,this.cache.maybeReuse(e)):(this.cache.add(e),e instanceof Cu&&r.unshift(e.mark)),this.openWidget=!1},leave:e=>{e.isLine()?r.length&&=i=0:e instanceof Cu&&(r.shift(),i=Math.min(i,r.length))},break:()=>{this.builder.addBreak(),this.openWidget=!1}}),this.text.skip(e)}emit(e,t){let n=null,r=this.builder,i=-1,a=R.spans(this.decorations,e,t,{point:(e,t,a,o,s,c)=>{if(a instanceof Mc){if(this.disallowBlockEffectsFor[c]){if(a.block)throw RangeError(`Block decorations may not be specified via plugins`);if(t>this.view.state.doc.lineAt(e).to)throw RangeError(`Decorations that replace line breaks may not be specified via plugins`)}if(i=o.length,s>o.length)r.continueWidget(t-e);else{let i=a.widget||(a.block?Bu.block:Bu.inline),c=Fu(a),l=this.cache.findWidget(i,t-e,c)||Tu.of(i,this.view,t-e,c);a.block?(a.startSide>0&&r.addLineStartIfNotCovered(n),r.addBlockWidget(l)):(r.ensureLine(n),r.addInlineWidget(l,o,s))}n=null}else n=Lu(n,a);t>e&&this.text.skip(t-e)},span:(e,t,a,o)=>{for(let i=e;i<t;){let s=this.text.next(Math.min(512,t-i));s==null?(r.addLineStartIfNotCovered(n),r.addBreak(),i++):(r.ensureLine(n),r.addText(s,a,i==e?o:a.length),i+=s.length),n=null}i=a.length}});i>-1&&(this.openWidget=a>i),this.openWidget||r.addLineStartIfNotCovered(n),this.openMarks=a}forward(e,t,n=1){t-e<=10?this.old.advance(t-e,n,this.reuseWalker):(this.old.advance(5,-1,this.reuseWalker),this.old.advance(t-e-10,-1),this.old.advance(5,n,this.reuseWalker))}getCompositionContext(e){let t=[],n=null;for(let r=e.parentNode;;r=r.parentNode){let e=U.get(r);if(r==this.view.contentDOM)break;e instanceof Cu?t.push(e):e?.isLine()?n=e:e instanceof yu||(r.nodeName==`DIV`&&!n?n=new bu(r,Iu):n||t.push(Cu.of(new Ac({tagName:r.nodeName.toLowerCase(),attributes:Dc(r)}),r)))}return n?{line:n,marks:t}:null}};function Pu(e,t){let n=e=>{for(let r of e.children)if((t?r.isText():r.length)||n(r))return!0;return!1};return n(e)}function Fu(e){let t=e.isReplace?(e.startSide<0?64:0)|(e.endSide>0?128:0):e.startSide>0?32:16;return e.block&&(t|=256),t}var Iu={class:`cm-line`};function Lu(e,t){let n=t.spec.attributes,r=t.spec.class;return!n&&!r||(e||={class:`cm-line`},n&&Sc(n,e),r&&(e.class+=` `+r)),e}function Ru(e){let t=[];for(let n=e.parents.length;n>1;n--){let r=n==e.parents.length?e.tile:e.parents[n].tile;r instanceof Cu&&t.push(r.mark)}return t}function zu(e){let t=U.get(e);return t&&t.setDOM(e.cloneNode()),e}var Bu=class extends Oc{constructor(e){super(),this.tag=e}eq(e){return e.tag==this.tag}toDOM(){return document.createElement(this.tag)}updateDOM(e){return e.nodeName.toLowerCase()==this.tag}get isHidden(){return!0}};Bu.inline=new Bu(`span`),Bu.block=new Bu(`div`);var Vu=new class extends Oc{toDOM(){return document.createElement(`br`)}get isHidden(){return!0}get editable(){return!0}},Hu=class{constructor(e){this.view=e,this.decorations=[],this.blockWrappers=[],this.dynamicDecorationMap=[!1],this.domChanged=null,this.hasComposition=null,this.editContextFormatting=B.none,this.lastCompositionAfterCursor=!1,this.minWidth=0,this.minWidthFrom=0,this.minWidthTo=0,this.impreciseAnchor=null,this.impreciseHead=null,this.forceSelection=!1,this.lastUpdate=Date.now(),this.updateDeco(),this.tile=new vu(e,e.contentDOM),this.updateInner([new pu(0,0,0,e.state.doc.length)],null)}update(e){let t=e.changedRanges;this.minWidth>0&&t.length&&(t.every(({fromA:e,toA:t})=>t<this.minWidthFrom||e>this.minWidthTo)?(this.minWidthFrom=e.changes.mapPos(this.minWidthFrom,1),this.minWidthTo=e.changes.mapPos(this.minWidthTo,1)):this.minWidth=this.minWidthFrom=this.minWidthTo=0),this.updateEditContextFormatting(e);let n=-1;this.view.inputState.composing>=0&&!this.view.observer.editContext&&(this.domChanged?.newSel?n=this.domChanged.newSel.head:!$u(e.changes,this.hasComposition)&&!e.selectionSet&&(n=e.state.selection.main.head));let r=n>-1?Ku(this.view,e.changes,n):null;if(this.domChanged=null,this.hasComposition){let{from:n,to:r}=this.hasComposition;t=new pu(n,r,e.changes.mapPos(n,-1),e.changes.mapPos(r,1)).addToSet(t.slice())}this.hasComposition=r?{from:r.range.fromB,to:r.range.toB}:null,(z.ie||z.chrome)&&!r&&e&&e.state.doc.lines!=e.startState.doc.lines&&(this.forceSelection=!0);let i=this.decorations,a=this.blockWrappers;this.updateDeco();let o=Yu(i,this.decorations,e.changes);o.length&&(t=pu.extendWithRanges(t,o));let s=Zu(a,this.blockWrappers,e.changes);return s.length&&(t=pu.extendWithRanges(t,s)),r&&!t.some(e=>e.fromA<=r.range.fromA&&e.toA>=r.range.toA)&&(t=r.range.addToSet(t.slice())),this.tile.flags&2&&t.length==0?!1:(this.updateInner(t,r),e.transactions.length&&(this.lastUpdate=Date.now()),!0)}updateInner(e,t){this.view.viewState.mustMeasureContent=!0;let{observer:n}=this.view;n.ignore(()=>{if(t||e.length){let n=this.tile,r=new Nu(this.view,n,this.blockWrappers,this.decorations,this.dynamicDecorationMap);t&&U.get(t.text)&&r.cache.reused.set(U.get(t.text),2),this.tile=r.run(e,t),Uu(n,r.cache.reused)}this.tile.dom.style.height=this.view.viewState.contentHeight/this.view.scaleY+`px`,this.tile.dom.style.flexBasis=this.minWidth?this.minWidth+`px`:``;let r=z.chrome||z.ios?{node:n.selectionRange.focusNode,written:!1}:void 0;this.tile.sync(r),r&&(r.written||n.selectionRange.focusNode!=r.node||!this.tile.dom.contains(r.node))&&(this.forceSelection=!0),this.tile.dom.style.height=``});let r=[];if(this.view.viewport.from||this.view.viewport.to<this.view.state.doc.length)for(let e of this.tile.children)e.isWidget()&&e.widget instanceof ed&&r.push(e.dom);n.updateGaps(r)}updateEditContextFormatting(e){this.editContextFormatting=this.editContextFormatting.map(e.changes);for(let t of e.transactions)for(let e of t.effects)e.is(Jl)&&(this.editContextFormatting=e.value)}updateSelection(e=!1,t=!1){(e||!this.view.observer.selectionRange.focusNode)&&this.view.observer.readSelectionRange();let{dom:n}=this.tile,r=this.view.root.activeElement,i=r==n,a=!i&&!(this.view.state.facet(Xl)||n.tabIndex>-1)&&Vc(n,this.view.observer.selectionRange)&&!(r&&n.contains(r));if(!(i||t||a))return;let o=this.forceSelection;this.forceSelection=!1;let s=this.view.state.selection.main,c,l;if(s.empty?l=c=this.inlineDOMNearPos(s.anchor,s.assoc||1):(l=this.inlineDOMNearPos(s.head,s.head==s.from?1:-1),c=this.inlineDOMNearPos(s.anchor,s.anchor==s.from?1:-1)),z.gecko&&s.empty&&!this.hasComposition&&Wu(c)){let e=document.createTextNode(``);this.view.observer.ignore(()=>c.node.insertBefore(e,c.node.childNodes[c.offset]||null)),c=l=new fl(e,0),o=!0}let u=this.view.observer.selectionRange;!o&&u.focusNode&&(Uc(c.node,c.offset,u.anchorNode,u.anchorOffset)&&Uc(l.node,l.offset,u.focusNode,u.focusOffset)||this.suppressWidgetCursorChange(u,s))||(this.view.observer.ignore(()=>{z.android&&z.chrome&&n.contains(u.focusNode)&&Qu(u.focusNode,n)&&(n.blur(),n.focus({preventScroll:!0}));let e=zc(this.view.root);if(e){if(s.empty){if(z.gecko){let e=qu(c.node,c.offset);if(e&&e!=3){let t=(e==1?ul:dl)(c.node,c.offset);t&&(c=new fl(t.node,t.offset))}}e.collapse(c.node,c.offset),s.bidiLevel!=null&&e.caretBidiLevel!==void 0&&(e.caretBidiLevel=s.bidiLevel)}else if(e.extend){e.collapse(c.node,c.offset);try{e.extend(l.node,l.offset)}catch{}}else{let t=document.createRange();s.anchor>s.head&&([c,l]=[l,c]),t.setEnd(l.node,l.offset),t.setStart(c.node,c.offset),e.removeAllRanges(),e.addRange(t)}}a&&this.view.root.activeElement==n&&(n.blur(),r&&r.focus())}),this.view.observer.setSelectionRange(c,l)),this.impreciseAnchor=c.precise?null:new fl(u.anchorNode,u.anchorOffset),this.impreciseHead=l.precise?null:new fl(u.focusNode,u.focusOffset)}suppressWidgetCursorChange(e,t){return this.hasComposition&&t.empty&&Uc(e.focusNode,e.focusOffset,e.anchorNode,e.anchorOffset)&&this.posFromDOM(e.focusNode,e.focusOffset)==t.head}enforceCursorAssoc(){if(this.hasComposition)return;let{view:e}=this,t=e.state.selection.main,n=zc(e.root),{anchorNode:r,anchorOffset:i}=e.observer.selectionRange;if(!n||!t.empty||!t.assoc||!n.modify)return;let a=this.lineAt(t.head,t.assoc);if(!a)return;let o=a.posAtStart;if(t.head==o||t.head==o+a.length)return;let s=this.coordsAt(t.head,-1),c=this.coordsAt(t.head,1);if(!s||!c||s.bottom>c.top)return;let l=this.domAtPos(t.head+t.assoc,t.assoc);n.collapse(l.node,l.offset),n.modify(`move`,t.assoc<0?`forward`:`backward`,`lineboundary`),e.observer.readSelectionRange();let u=e.observer.selectionRange;e.docView.posFromDOM(u.anchorNode,u.anchorOffset)!=t.from&&n.collapse(r,i)}posFromDOM(e,t){let n=this.tile.nearest(e);if(!n)return this.tile.dom.compareDocumentPosition(e)&2?0:this.view.state.doc.length;let r=n.posAtStart;if(n.isComposite()){let i;if(e==n.dom)i=n.dom.childNodes[t];else{let r=qc(e)==0?0:t==0?-1:1;for(;;){let t=e.parentNode;if(t==n.dom)break;r==0&&t.firstChild!=t.lastChild&&(r=e==t.firstChild?-1:1),e=t}i=r<0?e:e.nextSibling}if(i==n.dom.firstChild)return r;for(;i&&!U.get(i);)i=i.nextSibling;if(!i)return r+n.length;for(let e=0,t=r;;e++){let r=n.children[e];if(r.dom==i)return t;t+=r.length+r.breakAfter}}else if(n.isText())return e==n.dom?r+t:r+(t?n.length:0);else return r}domAtPos(e,t){let{tile:n,offset:r}=this.tile.resolveBlock(e,t);return n.isWidget()?n.domPosFor(r,t):n.domIn(r,t)}inlineDOMNearPos(e,t){let n,r=-1,i=!1,a,o=-1,s=!1;return this.tile.blockTiles((t,c)=>{if(t.isWidget()){if(t.flags&32&&c>=e)return!0;t.flags&16&&(i=!0)}else{let l=c+t.length;if(c<=e&&(n=t,r=e-c,i=l<e),l>=e&&!a&&(a=t,o=e-c,s=c>e),c>e&&a)return!0}}),!n&&!a?this.domAtPos(e,t):(i&&a?n=null:s&&n&&(a=null),n&&t<0||!a?n.domIn(r,t):a.domIn(o,t))}coordsAt(e,t,n){let{tile:r,offset:i}=this.tile.resolveBlock(e,t);return r.isWidget()?r.widget instanceof ed?null:r.coordsInWidget(i,t,!0):r.coordsIn(i,t,n)}lineAt(e,t){let{tile:n}=this.tile.resolveBlock(e,t);return n.isLine()?n:null}coordsForChar(e){let{tile:t,offset:n}=this.tile.resolveBlock(e,1);if(!t.isLine())return null;function r(e,t){if(e.isComposite())for(let n of e.children){if(n.length>=t){let e=r(n,t);if(e)return e}if(t-=n.length,t<0)break}else if(e.isText()&&t<e.length){let n=To(e.text,t);if(n==t)return null;let r=al(e.dom,t,n).getClientRects();for(let e=0;e<r.length;e++){let t=r[e];if(e==r.length-1||t.top<t.bottom&&t.left<t.right)return t}}return null}return r(t,n)}measureVisibleLineHeights(e){let t=[],{from:n,to:r}=e,i=this.view.contentDOM.clientWidth,a=i>Math.max(this.view.scrollDOM.clientWidth,this.minWidth)+1,o=-1,s=this.view.textDirection==V.LTR,c=0,l=(e,u,d)=>{for(let f=0;f<e.children.length&&!(u>r);f++){let r=e.children[f],p=u+r.length,m=r.dom.getBoundingClientRect(),{height:h}=m;if(d&&!f&&(c+=m.top-d.top),r instanceof yu)p>n&&l(r,u,m);else if(u>=n&&(c>0&&t.push(-c),t.push(h+c),c=0,a)){let e=r.dom.lastChild,t=e?Hc(e):[];if(t.length){let e=t[t.length-1],n=s?e.right-m.left:m.right-e.left;n>o&&(o=n,this.minWidth=i,this.minWidthFrom=u,this.minWidthTo=p)}}d&&f==e.children.length-1&&(c+=d.bottom-m.bottom),u=p+r.breakAfter}};return l(this.tile,0,null),t}textDirectionAt(e){let{tile:t}=this.tile.resolveBlock(e,1);return getComputedStyle(t.dom).direction==`rtl`?V.RTL:V.LTR}measureTextSize(){let e=this.tile.blockTiles(e=>{if(e.isLine()&&e.children.length&&e.length<=20){let t=0,n;for(let r of e.children){if(!r.isText()||/[^ -~]/.test(r.text))return;let e=Hc(r.dom);if(e.length!=1)return;t+=e[0].width,n=e[0].height}if(t)return{lineHeight:e.dom.getBoundingClientRect().height,charWidth:t/e.length,textHeight:n}}});if(e)return e;let t=document.createElement(`div`),n,r,i;return t.className=`cm-line`,t.style.width=`99999px`,t.style.position=`absolute`,t.textContent=`abc def ghi jkl mno pqr stu`,this.view.observer.ignore(()=>{this.tile.dom.appendChild(t);let e=Hc(t.firstChild)[0];n=t.getBoundingClientRect().height,r=e&&e.width?e.width/27:7,i=e&&e.height?e.height:n,t.remove()}),{lineHeight:n,charWidth:r,textHeight:i}}computeBlockGapDeco(){let e=[],t=this.view.viewState;for(let n=0,r=0;;r++){let i=r==t.viewports.length?null:t.viewports[r],a=i?i.from-1:this.view.state.doc.length;if(a>n){let r=(t.lineBlockAt(a).bottom-t.lineBlockAt(n).top)/this.view.scaleY;e.push(B.replace({widget:new ed(r),block:!0,inclusive:!0,isBlockGap:!0}).range(n,a))}if(!i)break;n=i.to+1}return B.set(e)}updateDeco(){let e=1,t=this.view.state.facet(ru).map(t=>(this.dynamicDecorationMap[e++]=typeof t==`function`)?t(this.view):t),n=!1,r=this.view.state.facet(au).map((e,t)=>{let r=typeof e==`function`;return r&&(n=!0),r?e(this.view):e});for(r.length&&(this.dynamicDecorationMap[e++]=n,t.push(R.join(r))),this.decorations=[this.editContextFormatting,...t,this.computeBlockGapDeco(),this.view.viewState.lineGapDeco];e<this.decorations.length;)this.dynamicDecorationMap[e++]=!1;this.blockWrappers=this.view.state.facet(iu).map(e=>typeof e==`function`?e(this.view):e)}scrollIntoView(e){if(e.isSnapshot){let t=this.view.viewState.lineBlockAt(e.range.head);this.view.scrollDOM.scrollTop=t.top-e.yMargin,this.view.scrollDOM.scrollLeft=e.xMargin;return}for(let t of this.view.state.facet(Gl))try{if(t(this.view,e.range,e))return!0}catch(e){Yl(this.view.state,e,`scroll handler`)}let{range:t}=e,n=this.coordsAt(t.head,t.assoc||(t.head>t.anchor?-1:1)),r;if(!n)return;!t.empty&&(r=this.coordsAt(t.anchor,t.anchor>t.head?-1:1))&&(n={left:Math.min(n.left,r.left),top:Math.min(n.top,r.top),right:Math.max(n.right,r.right),bottom:Math.max(n.bottom,r.bottom)});let i=du(this.view),a={left:n.left-i.left,top:n.top-i.top,right:n.right+i.right,bottom:n.bottom+i.bottom},{offsetWidth:o,offsetHeight:s}=this.view.scrollDOM;if(Zc(this.view.scrollDOM,a,t.head<t.anchor?-1:1,e.x,e.y,Math.max(Math.min(e.xMargin,o),-o),Math.max(Math.min(e.yMargin,s),-s),this.view.textDirection==V.LTR),window.visualViewport&&window.innerHeight-window.visualViewport.height>1&&(n.top>window.visualViewport.offsetTop+window.visualViewport.height||n.bottom<window.visualViewport.offsetTop)){let e=this.view.docView.lineAt(t.head,1);if(e){let t=el(e.dom);e.dom.scrollIntoView({block:`nearest`}),tl(t,!1)}}}lineHasWidget(e){let t=e=>e.isWidget()||e.children.some(t);return t(this.tile.resolveBlock(e,1).tile)}destroy(){Uu(this.tile)}};function Uu(e,t){let n=t?.get(e);if(n!=1){n??e.destroy();for(let n of e.children)Uu(n,t)}}function Wu(e){return Lc(e.node)&&e.node.firstChild&&(e.offset==0||e.node.childNodes[e.offset-1].contentEditable==`false`)&&(e.offset==e.node.childNodes.length||e.node.childNodes[e.offset].contentEditable==`false`)}function Gu(e,t){let n=e.observer.selectionRange;if(!n.focusNode)return null;let r=ul(n.focusNode,n.focusOffset),i=dl(n.focusNode,n.focusOffset),a=r||i;if(i&&r&&i.node!=r.node){let t=U.get(i.node);if(!t||t.isText()&&t.text!=i.node.nodeValue)a=i;else if(e.docView.lastCompositionAfterCursor){let e=U.get(r.node);!e||e.isText()&&e.text!=r.node.nodeValue||(a=i)}}if(e.docView.lastCompositionAfterCursor=a!=r,!a)return null;let o=t-a.offset;return{from:o,to:o+a.node.nodeValue.length,node:a.node}}function Ku(e,t,n){let r=Gu(e,n);if(!r)return null;let{node:i,from:a,to:o}=r,s=i.nodeValue;if(/[\n\r]/.test(s)||e.state.doc.sliceString(r.from,r.to)!=s)return null;let c=t.invertedDesc;return{range:new pu(c.mapPos(a),c.mapPos(o),a,o),text:i}}function qu(e,t){return Lc(e)?(t&&e.childNodes[t-1].contentEditable==`false`?1:0)|(t<e.childNodes.length&&e.childNodes[t].contentEditable==`false`?2:0):0}var Ju=class{constructor(){this.changes=[]}compareRange(e,t){Fc(e,t,this.changes)}comparePoint(e,t){Fc(e,t,this.changes)}boundChange(e){Fc(e,e,this.changes)}};function Yu(e,t,n){let r=new Ju;return R.compare(e,t,n,r),r.changes}var Xu=class{constructor(){this.changes=[]}compareRange(e,t){Fc(e,t,this.changes)}comparePoint(){}boundChange(e){Fc(e,e,this.changes)}};function Zu(e,t,n){let r=new Xu;return R.compare(e,t,n,r),r.changes}function Qu(e,t){for(let n=e;n&&n!=t;n=n.assignedSlot||n.parentNode)if(Lc(n)&&n.contentEditable==`false`)return!0;return!1}function $u(e,t){let n=!1;return t&&e.iterChangedRanges((e,r)=>{e<t.to&&r>t.from&&(n=!0)}),n}var ed=class extends Oc{constructor(e){super(),this.height=e}toDOM(){let e=document.createElement(`div`);return e.className=`cm-gap`,this.updateDOM(e),e}eq(e){return e.height==this.height}updateDOM(e){return e.style.height=this.height+`px`,!0}get editable(){return!0}get estimatedHeight(){return this.height}ignoreEvent(){return!1}};function td(e,t,n=1){let r=e.charCategorizer(t),i=e.doc.lineAt(t),a=t-i.from;if(i.length==0)return P.cursor(t);a==0?n=1:a==i.length&&(n=-1);let o=a,s=a;n<0?o=To(i.text,a,!1):s=To(i.text,a);let c=r(i.text.slice(o,s));for(;o>0;){let e=To(i.text,o,!1);if(r(i.text.slice(e,o))!=c)break;o=e}for(;s<i.length;){let e=To(i.text,s);if(r(i.text.slice(s,e))!=c)break;s=e}return P.undirectionalRange(o+i.from,s+i.from)}function nd(e,t,n,r,i){let a=Math.round((r-t.left)*e.defaultCharacterWidth);if(e.lineWrapping&&n.height>e.defaultLineHeight*1.5){let t=e.viewState.heightOracle.textHeight,r=Math.floor((i-n.top-(e.defaultLineHeight-t)*.5)/t);a+=r*e.viewState.heightOracle.lineLength}let o=e.state.sliceDoc(n.from,n.to);return n.from+Xs(o,a,e.state.tabSize)}function rd(e,t,n){let r=e.lineBlockAt(t);if(Array.isArray(r.type)){let e;for(let i of r.type){if(i.from>t)break;if(!(i.to<t)){if(i.from<t&&i.to>t)return i;(!e||i.type==kc.Text&&(e.type!=i.type||(n<0?i.from<t:i.to>t)))&&(e=i)}}return e||r}return r}function id(e,t,n,r){let i=rd(e,t.head,t.assoc||-1),a=!r||i.type!=kc.Text||!(e.lineWrapping||i.widgetLineBreaks)?null:e.coordsAtPos(t.assoc<0&&t.head>i.from?t.head-1:t.head);if(a){let t=e.dom.getBoundingClientRect(),r=e.textDirectionAt(i.from),o=e.posAndSideAtCoords({x:n==(r==V.LTR)?t.right-1:t.left+1,y:(a.top+a.bottom)/2});if(o)return P.cursor(o.pos,o.assoc)}return P.cursor(n?i.to:i.from,n?1:-1)}function ad(e,t,n,r){let i=e.state.doc.lineAt(t.head),a=e.bidiSpans(i),o=e.textDirectionAt(i.from);for(let s=t,c=null;;){let t=Ml(i,a,o,s,n),l=jl;if(!t){if(i.number==(n?e.state.doc.lines:1))return s;l=`
`,i=e.state.doc.line(i.number+(n?1:-1)),a=e.bidiSpans(i),t=n?P.cursor(i.from,-1):P.cursor(i.to,1)}if(!c){if(!r)return t;c=r(l)}else if(!c(l))return s;s=t}}function od(e,t,n){let r=e.state.charCategorizer(t),i=r(n);return e=>{let t=r(e);return i==Ts.Space&&(i=t),i==t}}function sd(e,t,n,r){let i=t.head,a=n?1:-1;if(i==(n?e.state.doc.length:0))return P.cursor(i,t.assoc);let o=t.goalColumn,s,c=e.contentDOM.getBoundingClientRect(),l=e.coordsAtPos(i,t.assoc||((t.empty?n:t.head==t.from)?1:-1)),u=e.documentTop;if(l)o??=l.left-c.left,s=a<0?l.top:l.bottom;else{let t=e.viewState.lineBlockAt(i);o??=Math.min(c.right-c.left,e.defaultCharacterWidth*(i-t.from)),s=(a<0?t.top:t.bottom)+u}let d=c.left+o,f=e.viewState.heightOracle.textHeight>>1,p=r??f;for(let t=0;;t+=f){let r=s+(p+t)*a,i=fd(e,{x:d,y:r},!1,a);if(n?r>c.bottom:r<c.top)return P.cursor(i.pos,i.assoc);let l=e.coordsAtPos(i.pos,i.assoc),u=l?(l.top+l.bottom)/2:0;if(!l||(n?u>s:u<s))return P.cursor(i.pos,i.assoc,void 0,o)}}function cd(e,t,n){for(;;){let r=0;for(let i of e)i.between(t-1,t+1,(e,i,a)=>{if(t>e&&t<i){let a=r||n||(t-e<i-t?-1:1);t=a<0?e:i,r=a}});if(!r)return t}}function ld(e,t){let n=null;for(let r=0;r<t.ranges.length;r++){let i=t.ranges[r],a=null;if(i.empty){let t=cd(e,i.from,0);t!=i.from&&(a=P.cursor(t,-1))}else{let t=cd(e,i.from,-1),n=cd(e,i.to,1);(t!=i.from||n!=i.to)&&(a=i.undirectional?P.undirectionalRange(i.from,i.to):P.range(i.from==i.anchor?t:n,i.from==i.head?t:n))}a&&(n||=t.ranges.slice(),n[r]=a)}return n?P.create(n,t.mainIndex):t}function ud(e,t,n){let r=cd(e.state.facet(ou).map(t=>t(e)),n.from,t.head>n.from?-1:1);return r==n.from?n:P.cursor(r,r<n.from?1:-1)}var dd=class{constructor(e,t){this.pos=e,this.assoc=t}};function fd(e,t,n,r){let i=e.contentDOM.getBoundingClientRect(),a=i.top+e.viewState.paddingTop,{x:o,y:s}=t,c=s-a,l;for(;;){if(c<0)return new dd(0,1);if(c>e.viewState.docHeight)return new dd(e.state.doc.length,-1);if(l=e.elementAtHeight(c),r==null)break;if(l.type==kc.Text){if(r<0?l.to<e.viewport.from:l.from>e.viewport.to)break;let t=e.docView.coordsAt(r<0?l.from:l.to,r>0?-1:1);if(t&&(r<0?t.top<=c+a:t.bottom>=c+a))break}let t=e.viewState.heightOracle.textHeight/2;c=r>0?l.bottom+t:l.top-t}if(e.viewport.from>=l.to||e.viewport.to<=l.from){if(n)return null;if(l.type==kc.Text){let t=nd(e,i,l,o,s);return new dd(t,t==l.from?1:-1)}}if(l.type!=kc.Text)return c<(l.top+l.bottom)/2?new dd(l.from,1):new dd(l.to,-1);let u=e.docView.lineAt(l.from,2);return u&&u.length==l.length||(u=e.docView.lineAt(l.from,-2)),new pd(e,o,s,e.textDirectionAt(l.from)).scanTile(u,l.from)}var pd=class{constructor(e,t,n,r){this.view=e,this.x=t,this.y=n,this.baseDir=r,this.line=null,this.spans=null}bidiSpansAt(e){return(!this.line||this.line.from>e||this.line.to<e)&&(this.line=this.view.state.doc.lineAt(e),this.spans=this.view.bidiSpans(this.line)),this}baseDirAt(e,t){let{line:n,spans:r}=this.bidiSpansAt(e);return r[Sl.find(r,e-n.from,-1,t)].level==this.baseDir}dirAt(e,t){let{line:n,spans:r}=this.bidiSpansAt(e);return r[Sl.find(r,e-n.from,-1,t)].dir}bidiIn(e,t){let{spans:n,line:r}=this.bidiSpansAt(e);return n.length>1||n.length&&(n[0].level!=this.baseDir||n[0].to+r.from<t)}scan(e,t,n=!1){let r=0,i=e.length-1,a=new Set,o=this.bidiIn(e[0],e[i]),s,c,l=-1,u=1e9,d;search:for(;r<i;){let n=i-r,f=r+i>>1;adjust:if(a.has(f)){for(let e=1;e<n;e++){let t=f+e;if(t>=i&&(t-=n),!a.has(t)){f=t;break adjust}}break search}a.add(f);let p=t(f),m=0;if(p)for(let e=0;e<p.length;e++){let t=p[e];if(!(t.width==0&&p.length>1)){if(t.bottom<this.y)(!s||s.bottom<t.bottom)&&(s=t),m=1;else if(t.top>this.y)(!c||c.top>t.top)&&(c=t),m=-1;else{let e=t.left>this.x?this.x-t.left:t.right<this.x?this.x-t.right:0,n=Math.abs(e);n<u&&(l=f,u=n,d=t),e&&(m=e<0==(this.baseDir==V.LTR)?-1:1)}}}m==-1&&(!o||this.baseDirAt(e[f],1))?i=f:m==1&&(!o||this.baseDirAt(e[f+1],-1))&&(r=f+1)}if(!d){if(!c&&!s)return{i:0,after:!1};let n=s&&(!c||this.y-s.bottom<c.top-this.y)?s:c;return this.y=(n.top+n.bottom)/2,this.scan(e,t,!0)}if(u&&!n){let{top:n,bottom:r}=d;if(s&&s.bottom>(n+n+r)/3)return this.y=s.bottom-1,this.scan(e,t,!0);if(c&&c.top<(n+r+r)/3)return this.y=c.top+1,this.scan(e,t,!0)}let f=(o?this.dirAt(e[l],1):this.baseDir)==V.LTR;return{i:l,after:this.x>(d.left+d.right)/2==f}}scanText(e,t){let n=[];for(let r=0;r<e.length;r=To(e.text,r))n.push(t+r);n.push(t+e.length);let r=this.scan(n,r=>{let i=n[r]-t,a=n[r+1]-t;return al(e.dom,i,a).getClientRects()});return r.after?new dd(n[r.i+1],-1):new dd(n[r.i],1)}scanTile(e,t){if(!e.length)return new dd(t,1);if(e.children.length==1){let n=e.children[0];if(n.isText())return this.scanText(n,t);if(n.isComposite())return this.scanTile(n,t)}let n=[t];for(let r=0,i=t;r<e.children.length;r++)n.push(i+=e.children[r].length);let r=this.scan(n,t=>{let n=e.children[t];return n.flags&48?null:(Lc(n.dom)?n.dom:al(n.dom,0,n.length)).getClientRects()}),i=e.children[r.i],a=n[r.i];return i.isText()?this.scanText(i,a):i.isComposite()?this.scanTile(i,a):r.after?new dd(n[r.i+1],-1):new dd(a,1)}},md=`￿`,hd=class{constructor(e,t){this.points=e,this.view=t,this.text=``,this.lineSeparator=t.state.facet(L.lineSeparator)}append(e){this.text+=e}lineBreak(){this.text+=md}readRange(e,t){if(!e)return this;let n=e.parentNode;for(let r=e;;){this.findPointBefore(n,r);let e=this.text.length;this.readNode(r);let i=U.get(r),a=r.nextSibling;if(a==t){i?.breakAfter&&!a&&n!=this.view.contentDOM&&this.lineBreak();break}let o=U.get(a);(i&&o?i.breakAfter:(i?i.breakAfter:Gc(r))||Gc(a)&&(r.nodeName!=`BR`||i?.isWidget())&&this.text.length>e)&&!_d(a,t)&&this.lineBreak(),r=a}return this.findPointBefore(n,t),this}readTextNode(e){let t=e.nodeValue;for(let n of this.points)n.node==e&&(n.pos=this.text.length+Math.min(n.offset,t.length));for(let n=0,r=this.lineSeparator?null:/\r\n?|\n/g;;){let i=-1,a=1,o;if(this.lineSeparator?(i=t.indexOf(this.lineSeparator,n),a=this.lineSeparator.length):(o=r.exec(t))&&(i=o.index,a=o[0].length),this.append(t.slice(n,i<0?t.length:i)),i<0)break;if(this.lineBreak(),a>1)for(let t of this.points)t.node==e&&t.pos>this.text.length&&(t.pos-=a-1);n=i+a}}readNode(e){let t=U.get(e),n=t&&t.overrideDOMText;if(n!=null){this.findPointInside(e,n.length);for(let e=n.iter();!e.next().done;)e.lineBreak?this.lineBreak():this.append(e.value)}else Rc(e)?this.readTextNode(e):e.nodeName==`BR`?e.nextSibling&&this.lineBreak():Lc(e)&&this.readRange(e.firstChild,null)}findPointBefore(e,t){for(let n of this.points)n.node==e&&e.childNodes[n.offset]==t&&(n.pos=this.text.length)}findPointInside(e,t){for(let n of this.points)(Rc(e)?n.node==e:e.contains(n.node))&&(n.pos=this.text.length+(gd(e,n.node,n.offset)?t:0))}};function gd(e,t,n){for(;;){if(!t||n<qc(t))return!1;if(t==e)return!0;n=Wc(t)+1,t=t.parentNode}}function _d(e,t){let n;for(;e!=t&&e;e=e.nextSibling){let t=U.get(e);if(!t?.isWidget())return!1;t&&(n||=[]).push(t)}if(n){for(let e of n)if(e.overrideDOMText?.length)return!1}return!0}var vd=class{constructor(e,t){this.node=e,this.offset=t,this.pos=-1}},yd=class{constructor(e,t,n,r){this.typeOver=r,this.bounds=null,this.text=``,this.domChanged=t>-1;let{impreciseHead:i,impreciseAnchor:a}=e.docView,o=e.state.selection;if(e.state.readOnly&&t>-1)this.newSel=null;else if(t>-1&&(this.bounds=bd(e.docView.tile,t,n,0))){let t=i||a?[]:Td(e),n=new hd(t,e);n.readRange(this.bounds.startDOM,this.bounds.endDOM),this.text=n.text,this.newSel=Ed(t,this.bounds.from)}else{let t=e.observer.selectionRange,n=i&&i.node==t.focusNode&&i.offset==t.focusOffset||!Bc(e.contentDOM,t.focusNode)?o.main.head:e.docView.posFromDOM(t.focusNode,t.focusOffset),r=a&&a.node==t.anchorNode&&a.offset==t.anchorOffset||!Bc(e.contentDOM,t.anchorNode)?o.main.anchor:e.docView.posFromDOM(t.anchorNode,t.anchorOffset),s=e.viewport;if((z.ios||z.chrome)&&n!=r&&Math.min(n,r)<=o.main.from&&Math.max(n,r)>=o.main.to&&(s.from>0||s.to<e.state.doc.length)){let t=Math.min(n,r),i=Math.max(n,r),a=s.from-t,o=s.to-i;a!=0&&a!=1&&t!=0||o!=0&&o!=-1&&i!=e.state.doc.length||(n=0,r=e.state.doc.length)}if(e.inputState.composing>-1&&o.ranges.length>1)this.newSel=o.replaceRange(P.range(r,n));else if(e.lineWrapping&&r==n&&!(o.main.empty&&o.main.head==n)&&e.inputState.lastTouchTime>Date.now()-100){let t=e.coordsAtPos(n,-1),r=0;t&&(r=e.inputState.lastTouchY<=t.bottom?-1:1),this.newSel=P.create([P.cursor(n,r)])}else this.newSel=P.single(r,n)}}};function bd(e,t,n,r){if(e.isComposite()){let i=-1,a=-1,o=-1,s=-1;for(let c=0,l=r,u=r;c<e.children.length;c++){let r=e.children[c],d=l+r.length;if(l<t&&d>n)return bd(r,t,n,l);if(d>=t&&i==-1&&(i=c,a=l),l>n&&r.dom.parentNode==e.dom){o=c,s=u;break}u=d,l=d+r.breakAfter}return{from:a,to:s<0?r+e.length:s,startDOM:(i?e.children[i-1].dom.nextSibling:null)||e.dom.firstChild,endDOM:o<e.children.length&&o>=0?e.children[o].dom:null}}return e.isText()?{from:r,to:r+e.length,startDOM:e.dom,endDOM:e.dom.nextSibling}:null}function xd(e,t){let n,{newSel:r}=t,{state:i}=e,a=i.selection.main,o=e.inputState.lastKeyTime>Date.now()-100?e.inputState.lastKeyCode:-1;if(t.bounds){let{from:e,to:r}=t.bounds,s=a.from,c=null;(o===8||z.android&&t.text.length<r-e)&&(s=a.to,c=`end`);let l=i.doc.sliceString(e,r,md),u,d;!a.empty&&a.from>=e&&a.to<=r&&(t.typeOver||l!=t.text)&&l.slice(0,a.from-e)==t.text.slice(0,a.from-e)&&l.slice(a.to-e)==t.text.slice(u=t.text.length-(l.length-(a.to-e)))?n={from:a.from,to:a.to,insert:N.of(t.text.slice(a.from-e,u).split(md))}:(d=wd(l,t.text,s-e,c))&&(z.chrome&&o==13&&d.toB==d.from+2&&t.text.slice(d.from,d.toB)==`￿￿`&&d.toB--,n={from:e+d.from,to:e+d.toA,insert:N.of(t.text.slice(d.from,d.toB).split(md))})}else r&&(!e.hasFocus&&i.facet(Xl)||Dd(r,a))&&(r=null);if(!n&&!r)return!1;if((z.mac||z.android)&&n&&n.from==n.to&&n.from==a.head-1&&/^\. ?$/.test(n.insert.toString())&&e.contentDOM.getAttribute(`autocorrect`)==`off`?(r&&n.insert.length==2&&(r=P.single(r.main.anchor-1,r.main.head-1)),n={from:n.from,to:n.to,insert:N.of([n.insert.toString().replace(`.`,` `)])}):i.doc.lineAt(a.from).to<a.to&&e.docView.lineHasWidget(a.to)&&e.inputState.insertingTextAt>Date.now()-50?n={from:a.from,to:a.to,insert:i.toText(e.inputState.insertingText)}:z.chrome&&n&&n.from==n.to&&n.from==a.head&&n.insert.toString()==`
 `&&e.lineWrapping&&(r&&=P.single(r.main.anchor-1,r.main.head-1),n={from:a.from,to:a.to,insert:N.of([` `])}),n)return Sd(e,n,r,o);if(r&&!Dd(r,a)){let t=!1,n=`select`;return e.inputState.lastSelectionTime>Date.now()-50&&(e.inputState.lastSelectionOrigin==`select`&&(t=!0),n=e.inputState.lastSelectionOrigin,n==`select.pointer`&&(r=ld(i.facet(ou).map(t=>t(e)),r))),e.dispatch({selection:r,scrollIntoView:t,userEvent:n}),!0}return!1}function Sd(e,t,n,r=-1){if(z.ios&&e.inputState.flushIOSKey(t))return!0;let i=e.state.selection.main;if(z.android&&(t.to==i.to&&(t.from==i.from||t.from==i.from-1&&e.state.sliceDoc(t.from,i.from)==` `)&&t.insert.length==1&&t.insert.lines==2&&ol(e.contentDOM,`Enter`,13)||(t.from==i.from-1&&t.to==i.to&&t.insert.length==0||r==8&&t.insert.length<t.to-t.from&&t.to>i.head)&&ol(e.contentDOM,`Backspace`,8)||t.from==i.from&&t.to==i.to+1&&t.insert.length==0&&ol(e.contentDOM,`Delete`,46)))return!0;let a=t.insert.toString();e.inputState.composing>=0&&e.inputState.composing++;let o,s=()=>o||=Cd(e,t,n);return e.state.facet(zl).some(n=>n(e,t.from,t.to,a,s))||e.dispatch(s()),!0}function Cd(e,t,n){let r,i=e.state,a=i.selection.main,o=-1;if(t.from==t.to&&t.from<a.from||t.from>a.to){let n=t.from<a.from?-1:1,r=n<0?a.from:a.to,s=cd(i.facet(ou).map(t=>t(e)),r,n);t.from==s&&(o=s)}if(o>-1)r={changes:t,selection:P.cursor(t.from+t.insert.length,-1)};else if(t.from>=a.from&&t.to<=a.to&&t.to-t.from>=(a.to-a.from)/3&&(!n||n.main.empty&&n.main.from==t.from+t.insert.length)&&e.inputState.composing<0){let n=a.from<t.from?i.sliceDoc(a.from,t.from):``,o=a.to>t.to?i.sliceDoc(t.to,a.to):``;r=i.replaceSelection(e.state.toText(n+t.insert.sliceString(0,void 0,e.state.lineBreak)+o))}else{let o=i.changes(t),s=n&&n.main.to<=o.newLength?n.main:void 0;if(i.selection.ranges.length>1&&(e.inputState.composing>=0||e.inputState.compositionPendingChange)&&t.to<=a.to+10&&t.to>=a.to-10){let c=e.state.sliceDoc(t.from,t.to),l,u=n&&Gu(e,n.main.head);if(u){let e=t.insert.length-(t.to-t.from);l={from:u.from,to:u.to-e}}else l=e.state.doc.lineAt(a.head);let d=a.to-t.to;r=i.changeByRange(n=>{if(n.from==a.from&&n.to==a.to)return{changes:o,range:s||n.map(o)};let r=n.to-d,u=r-c.length;if(e.state.sliceDoc(u,r)!=c||r>=l.from&&u<=l.to)return{range:n};let f=i.changes({from:u,to:r,insert:t.insert}),p=n.to-a.to;return{changes:f,range:s?P.range(Math.max(0,s.anchor+p),Math.max(0,s.head+p)):n.map(f)}})}else r={changes:o,selection:s&&i.selection.replaceRange(s)}}let s=`input.type`;return(e.composing||e.inputState.compositionPendingChange&&e.inputState.compositionEndedAt>Date.now()-50)&&(e.inputState.compositionPendingChange=!1,s+=`.compose`,e.inputState.compositionFirstChange&&(s+=`.start`,e.inputState.compositionFirstChange=!1)),i.update(r,{userEvent:s,scrollIntoView:!0})}function wd(e,t,n,r){let i=Math.min(e.length,t.length),a=0;for(;a<i&&e.charCodeAt(a)==t.charCodeAt(a);)a++;if(a==i&&e.length==t.length)return null;let o=e.length,s=t.length;for(;o>0&&s>0&&e.charCodeAt(o-1)==t.charCodeAt(s-1);)o--,s--;if(r==`end`){let e=Math.max(0,a-Math.min(o,s));n-=o+e-a}if(o<a&&e.length<t.length){let e=n<=a&&n>=o?a-n:0;a-=e,s=a+(s-o),o=a}else if(s<a){let e=n<=a&&n>=s?a-n:0;a-=e,o=a+(o-s),s=a}return{from:a,toA:o,toB:s}}function Td(e){let t=[];if(e.root.activeElement!=e.contentDOM)return t;let{anchorNode:n,anchorOffset:r,focusNode:i,focusOffset:a}=e.observer.selectionRange;return n&&(t.push(new vd(n,r)),(i!=n||a!=r)&&t.push(new vd(i,a))),t}function Ed(e,t){if(e.length==0)return null;let n=e[0].pos,r=e.length==2?e[1].pos:n;return n<0||r<0?null:n==r?P.create([P.cursor(r+t,-1)]):P.single(n+t,r+t)}function Dd(e,t){return t.head==e.main.head&&t.anchor==e.main.anchor}var Od=class{setSelectionOrigin(e){this.lastSelectionOrigin=e,this.lastSelectionTime=Date.now()}constructor(e){this.view=e,this.lastKeyCode=0,this.lastKeyTime=0,this.touchActive=!1,this.lastTouchTime=0,this.lastTouchX=0,this.lastTouchY=0,this.lastFocusTime=0,this.lastScrollTop=0,this.lastScrollLeft=0,this.lastWheelEvent=0,this.pendingIOSKey=void 0,this.lastIOSMomentumScroll=0,this.tabFocusMode=-1,this.lastSelectionOrigin=null,this.lastSelectionTime=0,this.lastContextMenu=0,this.scrollHandlers=[],this.handlers=Object.create(null),this.composing=-1,this.compositionFirstChange=null,this.compositionEndedAt=0,this.compositionPendingKey=!1,this.compositionPendingChange=!1,this.insertingText=``,this.insertingTextAt=0,this.mouseSelection=null,this.draggedContent=null,this.handleEvent=this.handleEvent.bind(this),this.notifiedFocused=e.hasFocus,z.safari&&e.contentDOM.addEventListener(`input`,()=>null),z.gecko&&ff(e.contentDOM.ownerDocument)}handleEvent(e){Hd(this.view,e)&&!this.ignoreDuringComposition(e)&&(e.type==`keydown`&&this.keydown(e)||(this.view.updateState==0?this.runHandlers(e.type,e):Promise.resolve().then(()=>this.runHandlers(e.type,e))))}runHandlers(e,t){let n=this.handlers[e];if(n){for(let e of n.observers)e(this.view,t);for(let e of n.handlers){if(t.defaultPrevented)break;if(e(this.view,t)){t.preventDefault();break}}}}ensureHandlers(e){let t=jd(e),n=this.handlers,r=this.view.contentDOM;for(let e in t)if(e!=`scroll`){let i=!t[e].handlers.length,a=n[e];a&&i!=!a.handlers.length&&(r.removeEventListener(e,this.handleEvent),a=null),a||r.addEventListener(e,this.handleEvent,{passive:i})}for(let e in n)e!=`scroll`&&!t[e]&&r.removeEventListener(e,this.handleEvent);this.handlers=t}keydown(e){if(this.lastKeyCode=e.keyCode,this.lastKeyTime=Date.now(),e.keyCode==9&&this.tabFocusMode>-1&&(!this.tabFocusMode||Date.now()<=this.tabFocusMode))return!0;if(this.tabFocusMode>0&&e.keyCode!=27&&Pd.indexOf(e.keyCode)<0&&(this.tabFocusMode=-1),z.android&&z.chrome&&!e.synthetic&&(e.keyCode==13||e.keyCode==8))return this.view.observer.delayAndroidKey(e.key,e.keyCode),!0;if(z.ios&&!e.synthetic&&!e.altKey&&!e.metaKey&&(Md.some(t=>t.keyCode==e.keyCode)&&!e.ctrlKey||Nd.indexOf(e.key)>-1&&e.ctrlKey)){let t={ctrlKey:e.ctrlKey,altKey:e.altKey,metaKey:e.metaKey,shiftKey:e.shiftKey};t.shiftKey&&z.ios&&!/^(off|none)$/.test(this.view.contentDOM.autocapitalize)&&kd(this.view.win)&&(t.shiftKey=!1);let n=this.pendingIOSKey={key:e.key,keyCode:e.keyCode,mods:t};return setTimeout(()=>{this.pendingIOSKey==n&&this.flushIOSKey()},50),!0}return e.keyCode!=229&&this.view.observer.forceFlush(),!1}flushIOSKey(e){let t=this.pendingIOSKey;return!t||this.view.observer.pendingRecords().length||t.key==`Enter`&&e&&e.from<e.to&&/^\S+$/.test(e.insert.toString())?!1:(this.pendingIOSKey=void 0,ol(this.view.contentDOM,t.key,t.keyCode,t.mods))}ignoreDuringComposition(e){return!/^key/.test(e.type)||e.synthetic?!1:this.composing>0?!0:z.safari&&!z.ios&&this.compositionPendingKey&&Date.now()-this.compositionEndedAt<100?(this.compositionPendingKey=!1,!0):!1}startMouseSelection(e){this.mouseSelection&&this.mouseSelection.destroy(),this.mouseSelection=e}update(e){this.view.observer.update(e),this.mouseSelection&&this.mouseSelection.update(e),this.draggedContent&&e.docChanged&&(this.draggedContent=this.draggedContent.map(e.changes)),e.transactions.length&&(this.lastKeyCode=this.lastSelectionTime=0)}destroy(){this.mouseSelection&&this.mouseSelection.destroy()}};function kd(e){return e.visualViewport?e.visualViewport.height*e.visualViewport.scale/e.document.documentElement.clientHeight<.85:!1}function Ad(e,t){return(n,r)=>{try{return t.call(e,r,n)}catch(e){Yl(n.state,e)}}}function jd(e){let t=Object.create(null);function n(e){return t[e]||(t[e]={observers:[],handlers:[]})}for(let t of e){let e=t.spec,r=e&&e.plugin.domEventHandlers,i=e&&e.plugin.domEventObservers;if(r)for(let e in r){let i=r[e];i&&n(e).handlers.push(Ad(t.value,i))}if(i)for(let e in i){let r=i[e];r&&n(e).observers.push(Ad(t.value,r))}}for(let e in Ud)n(e).handlers.push(Ud[e]);for(let e in Wd)n(e).observers.push(Wd[e]);return t}var Md=[{key:`Backspace`,keyCode:8,inputType:`deleteContentBackward`},{key:`Enter`,keyCode:13,inputType:`insertParagraph`},{key:`Enter`,keyCode:13,inputType:`insertLineBreak`},{key:`Delete`,keyCode:46,inputType:`deleteContentForward`}],Nd=`dthko`,Pd=[16,17,18,20,91,92,224,225],Fd=6;function Id(e){return Math.max(0,e)*.7+8}function Ld(e,t){return Math.max(Math.abs(e.clientX-t.clientX),Math.abs(e.clientY-t.clientY))}var Rd=class{constructor(e,t,n,r){this.view=e,this.startEvent=t,this.style=n,this.mustSelect=r,this.scrollSpeed={x:0,y:0},this.scrolling=-1,this.lastEvent=t,this.scrollParents=Qc(e.contentDOM),this.atoms=e.state.facet(ou).map(t=>t(e));let i=e.contentDOM.ownerDocument;i.addEventListener(`mousemove`,this.move=this.move.bind(this)),i.addEventListener(`mouseup`,this.up=this.up.bind(this)),this.extend=t.shiftKey,this.multiple=e.state.facet(L.allowMultipleSelections)&&zd(e,t),this.dragging=Vd(e,t)&&ef(t)==1?null:!1}start(e){this.dragging===!1&&this.select(e)}move(e){if(e.buttons==0)return this.destroy();if(this.dragging||this.dragging==null&&Ld(this.startEvent,e)<10)return;this.select(this.lastEvent=e);let t=0,n=0,r=0,i=0,a=this.view.win.innerWidth,o=this.view.win.innerHeight;this.scrollParents.x&&({left:r,right:a}=this.scrollParents.x.getBoundingClientRect()),this.scrollParents.y&&({top:i,bottom:o}=this.scrollParents.y.getBoundingClientRect());let s=du(this.view);e.clientX-s.left<=r+Fd?t=-Id(r-e.clientX):e.clientX+s.right>=a-Fd&&(t=Id(e.clientX-a)),e.clientY-s.top<=i+Fd?n=-Id(i-e.clientY):e.clientY+s.bottom>=o-Fd&&(n=Id(e.clientY-o)),this.setScrollSpeed(t,n)}up(e){this.dragging??this.select(this.lastEvent),this.dragging||e.preventDefault(),this.destroy()}destroy(){this.setScrollSpeed(0,0);let e=this.view.contentDOM.ownerDocument;e.removeEventListener(`mousemove`,this.move),e.removeEventListener(`mouseup`,this.up),this.view.inputState.mouseSelection=this.view.inputState.draggedContent=null}setScrollSpeed(e,t){this.scrollSpeed={x:e,y:t},e||t?this.scrolling<0&&(this.scrolling=setInterval(()=>this.scroll(),50)):this.scrolling>-1&&(clearInterval(this.scrolling),this.scrolling=-1)}scroll(){let{x:e,y:t}=this.scrollSpeed;e&&this.scrollParents.x&&(this.scrollParents.x.scrollLeft+=e,e=0),t&&this.scrollParents.y&&(this.scrollParents.y.scrollTop+=t,t=0),(e||t)&&this.view.win.scrollBy(e,t),this.dragging===!1&&this.select(this.lastEvent)}select(e){let{view:t}=this,n=ld(this.atoms,this.style.get(e,this.extend,this.multiple));(this.mustSelect||!n.eq(t.state.selection,this.dragging===!1))&&this.view.dispatch({selection:n,userEvent:`select.pointer`}),this.mustSelect=!1}update(e){e.transactions.some(e=>e.isUserEvent(`input.type`))?this.destroy():this.style.update(e)&&setTimeout(()=>this.select(this.lastEvent),20)}};function zd(e,t){let n=e.state.facet(Pl);return n.length?n[0](t):z.mac?t.metaKey:t.ctrlKey}function Bd(e,t){let n=e.state.facet(Fl);return n.length?n[0](t):z.mac?!t.altKey:!t.ctrlKey}function Vd(e,t){let{main:n}=e.state.selection;if(n.empty)return!1;let r=zc(e.root);if(!r||r.rangeCount==0)return!0;let i=r.getRangeAt(0).getClientRects();for(let e=0;e<i.length;e++){let n=i[e];if(n.left<=t.clientX&&n.right>=t.clientX&&n.top<=t.clientY&&n.bottom>=t.clientY)return!0}return!1}function Hd(e,t){if(!t.bubbles)return!0;if(t.defaultPrevented)return!1;for(let n=t.target,r;n!=e.contentDOM;n=n.parentNode)if(!n||n.nodeType==11||(r=U.get(n))&&r.isWidget()&&!r.isHidden&&r.widget.ignoreEvent(t))return!1;return!0}var Ud=Object.create(null),Wd=Object.create(null),Gd=z.ie&&z.ie_version<15||z.ios&&z.webkit_version<604;function Kd(e){let t=e.dom.parentNode;if(!t)return;let n=t.appendChild(document.createElement(`textarea`));n.style.cssText=`position: fixed; left: -10000px; top: 10px`,n.focus(),setTimeout(()=>{e.focus(),n.remove(),Jd(e,n.value)},50)}function qd(e,t,n){for(let r of e.facet(t))n=r(n,e);return n}function Jd(e,t){t=qd(e.state,Vl,t);let{state:n}=e,r,i=1,a=n.toText(t),o=a.lines==n.selection.ranges.length;if(sf!=null&&n.selection.ranges.every(e=>e.empty)&&sf==a.toString()){let e=-1;r=n.changeByRange(r=>{let s=n.doc.lineAt(r.from);if(s.from==e)return{range:r};e=s.from;let c=n.toText((o?a.line(i++).text:t)+n.lineBreak);return{changes:{from:s.from,insert:c},range:P.cursor(r.from+c.length,-1)}})}else r=o?n.changeByRange(e=>{let t=a.line(i++);return{changes:{from:e.from,to:e.to,insert:t.text},range:P.cursor(e.from+t.length,-1)}}):n.replaceSelection(a);e.dispatch(r,{userEvent:`input.paste`,scrollIntoView:!0})}Wd.scroll=e=>{let t=e.inputState;t.lastScrollTop=e.scrollDOM.scrollTop,t.lastScrollLeft=e.scrollDOM.scrollLeft,z.ios&&!t.touchActive&&(t.lastIOSMomentumScroll=Date.now())},Wd.wheel=Wd.mousewheel=e=>{e.inputState.lastWheelEvent=Date.now()},Ud.keydown=(e,t)=>(e.inputState.setSelectionOrigin(`select`),t.keyCode==27&&e.inputState.tabFocusMode!=0&&(e.inputState.tabFocusMode=Date.now()+2e3),!1),Wd.touchstart=(e,t)=>{let n=e.inputState,r=t.targetTouches[0];n.touchActive=!0,n.lastTouchTime=Date.now(),r&&(n.lastTouchX=r.clientX,n.lastTouchY=r.clientY),n.setSelectionOrigin(`select.pointer`)},Wd.touchmove=e=>{e.inputState.setSelectionOrigin(`select.pointer`)},Wd.touchend=(e,t)=>{e.inputState.touchActive=!1},Ud.mousedown=(e,t)=>{if(e.observer.flush(),e.inputState.lastTouchTime>Date.now()-2e3)return!1;let n=null;for(let r of e.state.facet(Il))if(n=r(e,t),n)break;if(!n&&t.button==0&&(n=tf(e,t)),n){let r=!e.hasFocus;e.inputState.startMouseSelection(new Rd(e,t,n,r)),r&&e.observer.ignore(()=>{rl(e.contentDOM);let t=e.root.activeElement;t&&!t.contains(e.contentDOM)&&t.blur()});let i=e.inputState.mouseSelection;if(i)return i.start(t),i.dragging===!1}else e.inputState.setSelectionOrigin(`select.pointer`);return!1};function Yd(e,t,n,r){if(r==1)return P.cursor(t,n);if(r==2)return td(e.state,t,n);{let r=e.docView.lineAt(t,n),i=e.state.doc.lineAt(r?r.posAtEnd:t),a=r?r.posAtStart:i.from,o=r?r.posAtEnd:i.to;return o<e.state.doc.length&&o==i.to&&o++,P.undirectionalRange(a,o)}}var Xd=z.ie&&z.ie_version<=11,Zd=null,Qd=0,$d=0;function ef(e){if(!Xd)return e.detail;let t=Zd,n=$d;return Zd=e,$d=Date.now(),Qd=!t||n>Date.now()-400&&Math.abs(t.clientX-e.clientX)<2&&Math.abs(t.clientY-e.clientY)<2?(Qd+1)%3:1}function tf(e,t){let n=e.posAndSideAtCoords({x:t.clientX,y:t.clientY},!1),r=ef(t),i=e.state.selection;return{update(e){e.docChanged&&(n.pos=e.changes.mapPos(n.pos),i=i.map(e.changes))},get(t,a,o){let s=e.posAndSideAtCoords({x:t.clientX,y:t.clientY},!1),c,l=Yd(e,s.pos,s.assoc,r);if(n.pos!=s.pos&&!a){let t=Yd(e,n.pos,n.assoc,r),i=Math.min(t.from,l.from),a=Math.max(t.to,l.to);l=i<l.from?P.range(i,a,l.assoc):P.range(a,i,l.assoc)}return a?i.replaceRange(i.main.extend(l.from,l.to,l.assoc)):o&&r==1&&i.ranges.length>1&&(c=nf(i,s.pos))?c:o?i.addRange(l):P.create([l])}}}function nf(e,t){for(let n=0;n<e.ranges.length;n++){let{from:r,to:i}=e.ranges[n];if(r<=t&&i>=t)return P.create(e.ranges.slice(0,n).concat(e.ranges.slice(n+1)),e.mainIndex==n?0:e.mainIndex-+(e.mainIndex>n))}return null}Ud.dragstart=(e,t)=>{let{selection:{main:n}}=e.state;if(t.target.draggable){let r=e.docView.tile.nearest(t.target);if(r&&r.isWidget()){let e=r.posAtStart,t=e+r.length;(e>=n.to||t<=n.from)&&(n=P.undirectionalRange(e,t))}}let{inputState:r}=e;return r.mouseSelection&&(r.mouseSelection.dragging=!0),r.draggedContent=n,t.dataTransfer&&(t.dataTransfer.setData(`Text`,qd(e.state,Hl,e.state.sliceDoc(n.from,n.to))),t.dataTransfer.effectAllowed=`copyMove`),!1},Ud.dragend=e=>(e.inputState.draggedContent=null,!1);function rf(e,t,n,r){if(n=qd(e.state,Vl,n),!n)return;let i=e.posAtCoords({x:t.clientX,y:t.clientY},!1),{draggedContent:a}=e.inputState,o=r&&a&&Bd(e,t)?{from:a.from,to:a.to}:null,s={from:i,insert:n},c=e.state.changes(o?[o,s]:s);e.focus(),e.dispatch({changes:c,selection:{anchor:c.mapPos(i,-1),head:c.mapPos(i,1)},userEvent:o?`move.drop`:`input.drop`}),e.inputState.draggedContent=null}Ud.drop=(e,t)=>{if(!t.dataTransfer)return!1;if(e.state.readOnly)return!0;let n=t.dataTransfer.files;if(n&&n.length){let r=Array(n.length),i=0,a=()=>{++i==n.length&&rf(e,t,r.filter(e=>e!=null).join(e.state.lineBreak),!1)};for(let e=0;e<n.length;e++){let t=new FileReader;t.onerror=a,t.onload=()=>{/[\x00-\x08\x0e-\x1f]{2}/.test(t.result)||(r[e]=t.result),a()},t.readAsText(n[e])}return!0}{let n=t.dataTransfer.getData(`Text`);if(n)return rf(e,t,n,!0),!0}return!1},Ud.paste=(e,t)=>{if(e.state.readOnly)return!0;e.observer.flush();let n=Gd?null:t.clipboardData;return n?(Jd(e,n.getData(`text/plain`)||n.getData(`text/uri-list`)),!0):(Kd(e),!1)};function af(e,t){let n=e.dom.parentNode;if(!n)return;let r=n.appendChild(document.createElement(`textarea`));r.style.cssText=`position: fixed; left: -10000px; top: 10px`,r.value=t,r.focus(),r.selectionEnd=t.length,r.selectionStart=0,setTimeout(()=>{r.remove(),e.focus()},50)}function of(e){let t=[],n=[],r=!1;for(let r of e.selection.ranges)r.empty||(t.push(e.sliceDoc(r.from,r.to)),n.push(r));if(!t.length){let i=-1;for(let{from:r}of e.selection.ranges){let a=e.doc.lineAt(r);a.number>i&&(t.push(a.text),n.push({from:a.from,to:Math.min(e.doc.length,a.to+1)})),i=a.number}r=!0}return{text:qd(e,Hl,t.join(e.lineBreak)),ranges:n,linewise:r}}var sf=null;Ud.copy=Ud.cut=(e,t)=>{if(!Vc(e.contentDOM,e.observer.selectionRange))return!1;let{text:n,ranges:r,linewise:i}=of(e.state);if(!n&&!i)return!1;sf=i?n:null,t.type==`cut`&&!e.state.readOnly&&e.dispatch({changes:r,scrollIntoView:!0,userEvent:`delete.cut`});let a=Gd?null:t.clipboardData;return a?(a.clearData(),a.setData(`text/plain`,n),!0):(af(e,n),!1)};var cf=ps.define();function lf(e,t){let n=[];for(let r of e.facet(Bl)){let i=r(e,t);i&&n.push(i)}return n.length?e.update({effects:n,annotations:cf.of(!0)}):null}function uf(e){setTimeout(()=>{let t=e.hasFocus;if(t!=e.inputState.notifiedFocused){let n=lf(e.state,t);n?e.dispatch(n):e.update([])}},10)}Wd.focus=e=>{e.inputState.lastFocusTime=Date.now(),!e.scrollDOM.scrollTop&&(e.inputState.lastScrollTop||e.inputState.lastScrollLeft)&&(e.scrollDOM.scrollTop=e.inputState.lastScrollTop,e.scrollDOM.scrollLeft=e.inputState.lastScrollLeft),uf(e)},Wd.blur=e=>{e.observer.clearSelectionRange(),uf(e)},Wd.compositionstart=Wd.compositionupdate=(e,t)=>{if(!e.observer.editContext&&(e.inputState.compositionFirstChange??(e.inputState.compositionFirstChange=!0),e.inputState.composing<0)){let{main:t}=e.state.selection;!t.empty&&e.lineBlockAt(t.from).from!=e.lineBlockAt(t.to).from&&!e.state.readOnly&&e.dispatch({changes:e.state.selection.ranges.filter(e=>!e.empty).map(e=>({from:e.from,to:e.to})),userEvent:`input`}),e.inputState.composing=0}},Wd.compositionend=e=>{e.observer.editContext||(e.inputState.composing=-1,e.inputState.compositionEndedAt=Date.now(),e.inputState.compositionPendingKey=!0,e.inputState.compositionPendingChange=e.observer.pendingRecords().length>0,e.inputState.compositionFirstChange=null,z.chrome&&z.android?e.observer.flushSoon():e.inputState.compositionPendingChange?Promise.resolve().then(()=>e.observer.flush()):setTimeout(()=>{e.inputState.composing<0&&e.docView.hasComposition&&e.update([])},50))},Wd.contextmenu=e=>{e.inputState.lastContextMenu=Date.now()},Ud.beforeinput=(e,t)=>{if((t.inputType==`insertText`||t.inputType==`insertCompositionText`)&&(e.inputState.insertingText=t.data,e.inputState.insertingTextAt=Date.now()),t.inputType==`insertReplacementText`&&e.observer.editContext){let n=t.dataTransfer?.getData(`text/plain`),r=t.getTargetRanges();if(n&&r.length){let t=r[0];return Sd(e,{from:e.posAtDOM(t.startContainer,t.startOffset),to:e.posAtDOM(t.endContainer,t.endOffset),insert:e.state.toText(n)},null),!0}}let n;if(z.chrome&&z.android&&(n=Md.find(e=>e.inputType==t.inputType))&&(e.observer.delayAndroidKey(n.key,n.keyCode),n.key==`Backspace`||n.key==`Delete`)){let t=window.visualViewport?.height||0;setTimeout(()=>{(window.visualViewport?.height||0)>t+10&&e.hasFocus&&(e.contentDOM.blur(),e.focus())},100)}return z.ios&&t.inputType==`deleteContentForward`&&e.observer.flushSoon(),z.safari&&t.inputType==`insertText`&&e.inputState.composing>=0&&setTimeout(()=>Wd.compositionend(e,t),20),!1};var df=new Set;function ff(e){df.has(e)||(df.add(e),e.addEventListener(`copy`,()=>{}),e.addEventListener(`cut`,()=>{}))}var pf=[`pre-wrap`,`normal`,`pre-line`,`break-spaces`],mf=!1;function hf(){mf=!1}var gf=class{constructor(e){this.lineWrapping=e,this.doc=N.empty,this.heightSamples={},this.lineHeight=14,this.charWidth=7,this.textHeight=14,this.lineLength=30}heightForGap(e,t){let n=this.doc.lineAt(t).number-this.doc.lineAt(e).number+1;return this.lineWrapping&&(n+=Math.max(0,Math.ceil((t-e-n*this.lineLength*.5)/this.lineLength))),this.lineHeight*n}heightForLine(e){return this.lineWrapping?(1+Math.max(0,Math.ceil((e-this.lineLength)/Math.max(1,this.lineLength-5))))*this.lineHeight:this.lineHeight}setDoc(e){return this.doc=e,this}mustRefreshForWrapping(e){return pf.indexOf(e)>-1!=this.lineWrapping}mustRefreshForHeights(e){let t=!1;for(let n=0;n<e.length;n++){let r=e[n];r<0?n++:this.heightSamples[Math.floor(r*10)]||(t=!0,this.heightSamples[Math.floor(r*10)]=!0)}return t}refresh(e,t,n,r,i,a){let o=pf.indexOf(e)>-1,s=Math.abs(t-this.lineHeight)>.3||this.lineWrapping!=o;if(this.lineWrapping=o,this.lineHeight=t,this.charWidth=n,this.textHeight=r,this.lineLength=i,s){this.heightSamples={};for(let e=0;e<a.length;e++){let t=a[e];t<0?e++:this.heightSamples[Math.floor(t*10)]=!0}}return s}},_f=class{constructor(e,t){this.from=e,this.heights=t,this.index=0}get more(){return this.index<this.heights.length}},vf=class e{constructor(e,t,n,r,i){this.from=e,this.length=t,this.top=n,this.height=r,this._content=i}get type(){return typeof this._content==`number`?kc.Text:Array.isArray(this._content)?this._content:this._content.type}get to(){return this.from+this.length}get bottom(){return this.top+this.height}get widget(){return this._content instanceof Mc?this._content.widget:null}get widgetLineBreaks(){return typeof this._content==`number`?this._content:0}join(t){let n=(Array.isArray(this._content)?this._content:[this]).concat(Array.isArray(t._content)?t._content:[t]);return new e(this.from,this.length+t.length,this.top,this.height+t.height,n)}},W=(function(e){return e[e.ByPos=0]=`ByPos`,e[e.ByHeight=1]=`ByHeight`,e[e.ByPosNoHeight=2]=`ByPosNoHeight`,e})(W||={}),yf=.001,bf=class e{constructor(e,t,n=2){this.length=e,this.height=t,this.flags=n}get outdated(){return(this.flags&2)>0}set outdated(e){this.flags=(e?2:0)|this.flags&-3}setHeight(e){this.height!=e&&(Math.abs(this.height-e)>yf&&(mf=!0),this.height=e)}replace(t,n,r){return e.of(r)}decomposeLeft(e,t){t.push(this)}decomposeRight(e,t){t.push(this)}applyChanges(e,t,n,r){let i=this,a=n.doc;for(let o=r.length-1;o>=0;o--){let{fromA:s,toA:c,fromB:l,toB:u}=r[o],d=i.lineAt(s,W.ByPosNoHeight,n.setDoc(t),0,0),f=d.to>=c?d:i.lineAt(c,W.ByPosNoHeight,n,0,0);for(u+=f.to-c,c=f.to;o>0&&d.from<=r[o-1].toA;)s=r[o-1].fromA,l=r[o-1].fromB,o--,s<d.from&&(d=i.lineAt(s,W.ByPosNoHeight,n,0,0));l+=d.from-s,s=d.from;let p=kf.build(n.setDoc(a),e,l,u);i=xf(i,i.replace(s,c,p))}return i.updateHeight(n,0)}static empty(){return new wf(0,0,0)}static of(t){if(t.length==1)return t[0];let n=0,r=t.length,i=0,a=0;for(;;)if(n==r){if(i>a*2){let e=t[n-1];e.break?t.splice(--n,1,e.left,null,e.right):t.splice(--n,1,e.left,e.right),r+=1+e.break,i-=e.size}else if(a>i*2){let e=t[r];e.break?t.splice(r,1,e.left,null,e.right):t.splice(r,1,e.left,e.right),r+=2+e.break,a-=e.size}else break}else if(i<a){let e=t[n++];e&&(i+=e.size)}else{let e=t[--r];e&&(a+=e.size)}let o=!1;return t[n-1]==null?(o=!0,n--):t[n]??(o=!0,r++),new Ef(e.of(t.slice(0,n)),o,e.of(t.slice(r)))}};function xf(e,t){return e==t?e:(e.constructor!=t.constructor&&(mf=!0),t)}bf.prototype.size=1;var Sf=B.replace({}),Cf=class extends bf{constructor(e,t,n){super(e,t),this.deco=n,this.spaceAbove=0}mainBlock(e,t){return new vf(t,this.length,e+this.spaceAbove,this.height-this.spaceAbove,this.deco||0)}blockAt(e,t,n,r){return this.spaceAbove&&e<n+this.spaceAbove?new vf(r,0,n,this.spaceAbove,Sf):this.mainBlock(n,r)}lineAt(e,t,n,r,i){let a=this.mainBlock(r,i);return this.spaceAbove?this.blockAt(0,n,r,i).join(a):a}forEachLine(e,t,n,r,i,a){e<=i+this.length&&t>=i&&a(this.lineAt(0,W.ByPos,n,r,i))}setMeasuredHeight(e){let t=e.heights[e.index++];t<0?(this.spaceAbove=-t,t=e.heights[e.index++]):this.spaceAbove=0,this.setHeight(t)}updateHeight(e,t=0,n=!1,r){return r&&r.from<=t&&r.more&&this.setMeasuredHeight(r),this.outdated=!1,this}toString(){return`block(${this.length})`}},wf=class e extends Cf{constructor(e,t,n){super(e,t,null),this.collapsed=0,this.widgetHeight=0,this.breaks=0,this.spaceAbove=n}mainBlock(e,t){return new vf(t,this.length,e+this.spaceAbove,this.height-this.spaceAbove,this.breaks)}replace(t,n,r){let i=r[0];return r.length==1&&(i instanceof e||i instanceof Tf&&i.flags&4)&&Math.abs(this.length-i.length)<10?(i instanceof Tf?i=new e(i.length,this.height,this.spaceAbove):i.height=this.height,this.outdated||(i.outdated=!1),i):bf.of(r)}updateHeight(e,t=0,n=!1,r){return r&&r.from<=t&&r.more?this.setMeasuredHeight(r):(n||this.outdated)&&(this.spaceAbove=0,this.setHeight(Math.max(this.widgetHeight,e.heightForLine(this.length-this.collapsed))+this.breaks*e.lineHeight)),this.outdated=!1,this}toString(){return`line(${this.length}${this.collapsed?-this.collapsed:``}${this.widgetHeight?`:`+this.widgetHeight:``})`}},Tf=class e extends bf{constructor(e){super(e,0)}heightMetrics(e,t){let n=e.doc.lineAt(t).number,r=e.doc.lineAt(t+this.length).number,i=r-n+1,a,o=0;if(e.lineWrapping){let t=Math.min(this.height,e.lineHeight*i);a=t/i,this.length>i+1&&(o=(this.height-t)/(this.length-i-1))}else a=this.height/i;return{firstLine:n,lastLine:r,perLine:a,perChar:o}}blockAt(e,t,n,r){let{firstLine:i,lastLine:a,perLine:o,perChar:s}=this.heightMetrics(t,r);if(t.lineWrapping){let i=r+(e<t.lineHeight?0:Math.round(Math.max(0,Math.min(1,(e-n)/this.height))*this.length)),a=t.doc.lineAt(i),c=o+a.length*s,l=Math.max(n,e-c/2);return new vf(a.from,a.length,l,c,0)}{let r=Math.max(0,Math.min(a-i,Math.floor((e-n)/o))),{from:s,length:c}=t.doc.line(i+r);return new vf(s,c,n+o*r,o,0)}}lineAt(e,t,n,r,i){if(t==W.ByHeight)return this.blockAt(e,n,r,i);if(t==W.ByPosNoHeight){let{from:t,to:r}=n.doc.lineAt(e);return new vf(t,r-t,0,0,0)}let{firstLine:a,perLine:o,perChar:s}=this.heightMetrics(n,i),c=n.doc.lineAt(e),l=o+c.length*s,u=c.number-a,d=r+o*u+s*(c.from-i-u);return new vf(c.from,c.length,Math.max(r,Math.min(d,r+this.height-l)),l,0)}forEachLine(e,t,n,r,i,a){e=Math.max(e,i),t=Math.min(t,i+this.length);let{firstLine:o,perLine:s,perChar:c}=this.heightMetrics(n,i);for(let l=e,u=r;l<=t;){let t=n.doc.lineAt(l);if(l==e){let n=t.number-o;u+=s*n+c*(e-i-n)}let r=s+c*t.length;a(new vf(t.from,t.length,u,r,0)),u+=r,l=t.to+1}}replace(t,n,r){let i=this.length-n;if(i>0){let t=r[r.length-1];t instanceof e?r[r.length-1]=new e(t.length+i):r.push(null,new e(i-1))}if(t>0){let n=r[0];n instanceof e?r[0]=new e(t+n.length):r.unshift(new e(t-1),null)}return bf.of(r)}decomposeLeft(t,n){n.push(new e(t-1),null)}decomposeRight(t,n){n.push(null,new e(this.length-t-1))}updateHeight(t,n=0,r=!1,i){let a=n+this.length;if(i&&i.from<=n+this.length&&i.more){let r=[],o=Math.max(n,i.from),s=-1;for(i.from>n&&r.push(new e(i.from-n-1).updateHeight(t,n));o<=a&&i.more;){let e=t.doc.lineAt(o).length;r.length&&r.push(null);let n=i.heights[i.index++],a=0;n<0&&(a=-n,n=i.heights[i.index++]),s==-1?s=n:Math.abs(n-s)>=yf&&(s=-2);let c=new wf(e,n,a);c.outdated=!1,r.push(c),o+=e+1}o<=a&&r.push(null,new e(a-o).updateHeight(t,o));let c=bf.of(r);return(s<0||Math.abs(c.height-this.height)>=yf||Math.abs(s-this.heightMetrics(t,n).perLine)>=yf)&&(mf=!0),xf(this,c)}return(r||this.outdated)&&(this.setHeight(t.heightForGap(n,n+this.length)),this.outdated=!1),this}toString(){return`gap(${this.length})`}},Ef=class extends bf{constructor(e,t,n){super(e.length+ +!!t+n.length,e.height+n.height,+!!t|(e.outdated||n.outdated?2:0)),this.left=e,this.right=n,this.size=e.size+n.size}get break(){return this.flags&1}blockAt(e,t,n,r){let i=n+this.left.height;return e<i?this.left.blockAt(e,t,n,r):this.right.blockAt(e,t,i,r+this.left.length+this.break)}lineAt(e,t,n,r,i){let a=r+this.left.height,o=i+this.left.length+this.break,s=t==W.ByHeight?e<a:e<o,c=s?this.left.lineAt(e,t,n,r,i):this.right.lineAt(e,t,n,a,o);if(this.break||(s?c.to<o:c.from>o))return c;let l=t==W.ByPosNoHeight?W.ByPosNoHeight:W.ByPos;return s?c.join(this.right.lineAt(o,l,n,a,o)):this.left.lineAt(o,l,n,r,i).join(c)}forEachLine(e,t,n,r,i,a){let o=r+this.left.height,s=i+this.left.length+this.break;if(this.break)e<s&&this.left.forEachLine(e,t,n,r,i,a),t>=s&&this.right.forEachLine(e,t,n,o,s,a);else{let c=this.lineAt(s,W.ByPos,n,r,i);e<c.from&&this.left.forEachLine(e,Math.min(t,c.from-1),n,r,i,a),c.to>=e&&c.from<=t&&a(c),t>c.to&&this.right.forEachLine(Math.max(e,c.to+1),t,n,o,s,a)}}replace(e,t,n){let r=this.left.length+this.break;if(t<r)return this.balanced(this.left.replace(e,t,n),this.right);if(e>this.left.length)return this.balanced(this.left,this.right.replace(e-r,t-r,n));let i=[];e>0&&this.decomposeLeft(e,i);let a=i.length;for(let e of n)i.push(e);if(e>0&&Df(i,a-1),t<this.length){let e=i.length;this.decomposeRight(t,i),Df(i,e)}return bf.of(i)}decomposeLeft(e,t){let n=this.left.length;if(e<=n)return this.left.decomposeLeft(e,t);t.push(this.left),this.break&&(n++,e>=n&&t.push(null)),e>n&&this.right.decomposeLeft(e-n,t)}decomposeRight(e,t){let n=this.left.length,r=n+this.break;if(e>=r)return this.right.decomposeRight(e-r,t);e<n&&this.left.decomposeRight(e,t),this.break&&e<r&&t.push(null),t.push(this.right)}balanced(e,t){return e.size>2*t.size||t.size>2*e.size?bf.of(this.break?[e,null,t]:[e,t]):(this.left=xf(this.left,e),this.right=xf(this.right,t),this.setHeight(e.height+t.height),this.outdated=e.outdated||t.outdated,this.size=e.size+t.size,this.length=e.length+this.break+t.length,this)}updateHeight(e,t=0,n=!1,r){let{left:i,right:a}=this,o=t+i.length+this.break,s=null;return r&&r.from<=t+i.length&&r.more?s=i=i.updateHeight(e,t,n,r):i.updateHeight(e,t,n),r&&r.from<=o+a.length&&r.more?s=a=a.updateHeight(e,o,n,r):a.updateHeight(e,o,n),s?this.balanced(i,a):(this.height=this.left.height+this.right.height,this.outdated=!1,this)}toString(){return this.left+(this.break?` `:`-`)+this.right}};function Df(e,t){let n,r;e[t]==null&&(n=e[t-1])instanceof Tf&&(r=e[t+1])instanceof Tf&&e.splice(t-1,3,new Tf(n.length+1+r.length))}var Of=5,kf=class e{constructor(e,t){this.pos=e,this.oracle=t,this.nodes=[],this.lineStart=-1,this.lineEnd=-1,this.covering=null,this.writtenTo=e}get isCovered(){return this.covering&&this.nodes[this.nodes.length-1]==this.covering}span(e,t){if(this.lineStart>-1){let e=Math.min(t,this.lineEnd),n=this.nodes[this.nodes.length-1];n instanceof wf?n.length+=e-this.pos:(e>this.pos||!this.isCovered)&&this.nodes.push(new wf(e-this.pos,-1,0)),this.writtenTo=e,t>e&&(this.nodes.push(null),this.writtenTo++,this.lineStart=-1)}this.pos=t}point(e,t,n){if(e<t||n.heightRelevant){let r=n.widget?n.widget.estimatedHeight:0,i=n.widget?n.widget.lineBreaks:0;r<0&&(r=this.oracle.lineHeight);let a=t-e;n.block?this.addBlock(new Cf(a,r,n)):(a||i||r>=Of)&&this.addLineDeco(r,i,a)}else t>e&&this.span(e,t);this.lineEnd>-1&&this.lineEnd<this.pos&&(this.lineEnd=this.oracle.doc.lineAt(this.pos).to)}enterLine(){if(this.lineStart>-1)return;let{from:e,to:t}=this.oracle.doc.lineAt(this.pos);this.lineStart=e,this.lineEnd=t,this.writtenTo<e&&((this.writtenTo<e-1||this.nodes[this.nodes.length-1]==null)&&this.nodes.push(this.blankContent(this.writtenTo,e-1)),this.nodes.push(null)),this.pos>e&&this.nodes.push(new wf(this.pos-e,-1,0)),this.writtenTo=this.pos}blankContent(e,t){let n=new Tf(t-e);return this.oracle.doc.lineAt(e).to==t&&(n.flags|=4),n}ensureLine(){this.enterLine();let e=this.nodes.length?this.nodes[this.nodes.length-1]:null;if(e instanceof wf)return e;let t=new wf(0,-1,0);return this.nodes.push(t),t}addBlock(e){this.enterLine();let t=e.deco;t&&t.startSide>0&&!this.isCovered&&this.ensureLine(),this.nodes.push(e),this.writtenTo=this.pos+=e.length,t&&t.endSide>0&&(this.covering=e)}addLineDeco(e,t,n){let r=this.ensureLine();r.length+=n,r.collapsed+=n,r.widgetHeight=Math.max(r.widgetHeight,e),r.breaks+=t,this.writtenTo=this.pos+=n}finish(e){let t=this.nodes.length==0?null:this.nodes[this.nodes.length-1];this.lineStart>-1&&!(t instanceof wf)&&!this.isCovered?this.nodes.push(new wf(0,-1,0)):(this.writtenTo<this.pos||t==null)&&this.nodes.push(this.blankContent(this.writtenTo,this.pos));let n=e;for(let e of this.nodes)e instanceof wf&&e.updateHeight(this.oracle,n),n+=e?e.length:1;return this.nodes}static build(t,n,r,i){let a=new e(r,t);return R.spans(n,r,i,a,0),a.finish(r)}};function Af(e,t,n){let r=new jf;return R.compare(e,t,n,r,0),r.changes}var jf=class{constructor(){this.changes=[]}compareRange(){}comparePoint(e,t,n,r){(e<t||n&&n.heightRelevant||r&&r.heightRelevant)&&Fc(e,t,this.changes,5)}};function Mf(e,t){let n=e.getBoundingClientRect(),r=e.ownerDocument,i=r.defaultView||window,a=Math.max(0,n.left),o=Math.min(i.innerWidth,n.right),s=Math.max(0,n.top),c=Math.min(i.innerHeight,n.bottom);for(let t=e.parentNode;t&&t!=r.body;)if(Lc(t)){let n=window.getComputedStyle(t);if((t.scrollHeight>t.clientHeight||t.scrollWidth>t.clientWidth)&&n.overflow!=`visible`){let n=t.getBoundingClientRect();a=Math.max(a,n.left),o=Math.min(o,n.right),s=Math.max(s,n.top),c=Math.min(t==e.parentNode?i.innerHeight:c,n.bottom)}t=n.position==`absolute`||n.position==`fixed`?t.offsetParent:t.parentNode}else if(t.nodeType==11)t=t.host;else break;return{left:a-n.left,right:Math.max(a,o)-n.left,top:s-(n.top+t),bottom:Math.max(s,c)-(n.top+t)}}function Nf(e){let t=e.getBoundingClientRect(),n=e.ownerDocument.defaultView||window;return t.left<n.innerWidth&&t.right>0&&t.top<n.innerHeight&&t.bottom>0}function Pf(e,t){let n=e.getBoundingClientRect();return{left:0,right:n.right-n.left,top:t,bottom:n.bottom-(n.top+t)}}var Ff=class{constructor(e,t,n,r){this.from=e,this.to=t,this.size=n,this.displaySize=r}static same(e,t){if(e.length!=t.length)return!1;for(let n=0;n<e.length;n++){let r=e[n],i=t[n];if(r.from!=i.from||r.to!=i.to||r.size!=i.size)return!1}return!0}draw(e,t){return B.replace({widget:new If(this.displaySize*(t?e.scaleY:e.scaleX),t)}).range(this.from,this.to)}},If=class extends Oc{constructor(e,t){super(),this.size=e,this.vertical=t}eq(e){return e.size==this.size&&e.vertical==this.vertical}toDOM(){let e=document.createElement(`div`);return this.vertical?e.style.height=this.size+`px`:(e.style.width=this.size+`px`,e.style.height=`2px`,e.style.display=`inline-block`),e}get estimatedHeight(){return this.vertical?this.size:-1}},Lf=class{constructor(e,t){this.view=e,this.state=t,this.pixelViewport={left:0,right:window.innerWidth,top:0,bottom:0},this.inView=!0,this.paddingTop=0,this.paddingBottom=0,this.contentDOMWidth=0,this.contentDOMHeight=0,this.editorHeight=0,this.editorWidth=0,this.scaleX=1,this.scaleY=1,this.scrollOffset=0,this.scrolledToBottom=!1,this.scrollAnchorPos=0,this.scrollAnchorHeight=-1,this.scaler=Uf,this.scrollTarget=null,this.printing=!1,this.mustMeasureContent=!0,this.defaultTextDirection=V.LTR,this.visibleRanges=[],this.mustEnforceCursorAssoc=!1;let n=t.facet(nu).some(e=>typeof e!=`function`&&e.class==`cm-lineWrapping`);this.heightOracle=new gf(n),this.stateDeco=Wf(t),this.heightMap=bf.empty().applyChanges(this.stateDeco,N.empty,this.heightOracle.setDoc(t.doc),[new pu(0,0,0,t.doc.length)]);for(let e=0;e<2&&(this.viewport=this.getViewport(0,null),this.updateForViewport());e++);this.updateViewportLines(),this.lineGaps=this.ensureLineGaps([]),this.lineGapDeco=B.set(this.lineGaps.map(e=>e.draw(this,!1))),this.scrollParent=e.scrollDOM,this.computeVisibleRanges()}updateForViewport(){let e=[this.viewport],{main:t}=this.state.selection;for(let n=0;n<=1;n++){let r=n?t.head:t.anchor;if(!e.some(({from:e,to:t})=>r>=e&&r<=t)){let{from:t,to:n}=this.lineBlockAt(r);e.push(new Rf(t,n))}}return this.viewports=e.sort((e,t)=>e.from-t.from),this.updateScaler()}updateScaler(){let e=this.scaler;return this.scaler=this.heightMap.height<=7e6?Uf:Gf.get(this.heightOracle,this.heightMap,this.viewports),e.eq(this.scaler)?0:2}updateViewportLines(){this.viewportLines=[],this.heightMap.forEachLine(this.viewport.from,this.viewport.to,this.heightOracle.setDoc(this.state.doc),0,0,e=>{this.viewportLines.push(Kf(e,this.scaler))})}update(e,t=null){this.state=e.state;let n=this.stateDeco;this.stateDeco=Wf(this.state);let r=e.changedRanges,i=pu.extendWithRanges(r,Af(n,this.stateDeco,e?e.changes:No.empty(this.state.doc.length))),a=this.heightMap.height,o=this.scrolledToBottom?null:this.scrollAnchorAt(this.scrollOffset);hf(),this.heightMap=this.heightMap.applyChanges(this.stateDeco,e.startState.doc,this.heightOracle.setDoc(this.state.doc),i),(this.heightMap.height!=a||mf)&&(e.flags|=2),o?(this.scrollAnchorPos=e.changes.mapPos(o.from,-1),this.scrollAnchorHeight=o.top):(this.scrollAnchorPos=-1,this.scrollAnchorHeight=a);let s=i.length?this.mapViewport(this.viewport,e.changes):this.viewport;(t&&(t.range.head<s.from||t.range.head>s.to)||!this.viewportIsAppropriate(s))&&(s=this.getViewport(0,t));let c=s.from!=this.viewport.from||s.to!=this.viewport.to;this.viewport=s,e.flags|=this.updateForViewport(),(c||!e.changes.empty||e.flags&2)&&this.updateViewportLines(),(this.lineGaps.length||this.viewport.to-this.viewport.from>4e3)&&this.updateLineGaps(this.ensureLineGaps(this.mapLineGaps(this.lineGaps,e.changes))),e.flags|=this.computeVisibleRanges(e.changes),t&&(this.scrollTarget=t),!this.mustEnforceCursorAssoc&&(e.selectionSet||e.focusChanged)&&e.view.lineWrapping&&e.state.selection.main.empty&&e.state.selection.main.assoc&&!e.state.facet(Wl)&&(this.mustEnforceCursorAssoc=!0)}measure(){let{view:e}=this,t=e.contentDOM,n=window.getComputedStyle(t),r=this.heightOracle,i=n.whiteSpace;this.defaultTextDirection=n.direction==`rtl`?V.RTL:V.LTR;let a=this.heightOracle.mustRefreshForWrapping(i)||this.mustMeasureContent===`refresh`,o=t.getBoundingClientRect(),s=a||this.mustMeasureContent||this.contentDOMHeight!=o.height;this.contentDOMHeight=o.height,this.mustMeasureContent=!1;let c=0,l=0;if(o.width&&o.height){let{scaleX:e,scaleY:n}=Xc(t,o);(e>.005&&Math.abs(this.scaleX-e)>.005||n>.005&&Math.abs(this.scaleY-n)>.005)&&(this.scaleX=e,this.scaleY=n,c|=16,a=s=!0)}let u=(parseInt(n.paddingTop)||0)*this.scaleY,d=(parseInt(n.paddingBottom)||0)*this.scaleY;(this.paddingTop!=u||this.paddingBottom!=d)&&(this.paddingTop=u,this.paddingBottom=d,c|=18),this.editorWidth!=e.scrollDOM.clientWidth&&(r.lineWrapping&&(s=!0),this.editorWidth=e.scrollDOM.clientWidth,c|=16);let f=Qc(this.view.contentDOM,!1).y;f!=this.scrollParent&&(this.scrollParent=f,this.scrollAnchorHeight=-1,this.scrollOffset=0);let p=this.getScrollOffset();this.scrollOffset!=p&&(this.scrollAnchorHeight=-1,this.scrollOffset=p),this.scrolledToBottom=ll(this.scrollParent||e.win);let m=(this.printing?Pf:Mf)(t,this.paddingTop),h=m.top-this.pixelViewport.top,g=m.bottom-this.pixelViewport.bottom;this.pixelViewport=m;let _=this.pixelViewport.bottom>this.pixelViewport.top&&this.pixelViewport.right>this.pixelViewport.left;if(_!=this.inView&&(this.inView=_,_&&(s=!0)),!this.inView&&!this.scrollTarget&&!Nf(e.dom))return 0;let v=o.width;if((this.contentDOMWidth!=v||this.editorHeight!=e.scrollDOM.clientHeight)&&(this.contentDOMWidth=o.width,this.editorHeight=e.scrollDOM.clientHeight,c|=16),s){let t=e.docView.measureVisibleLineHeights(this.viewport);if(r.mustRefreshForHeights(t)&&(a=!0),a||r.lineWrapping&&Math.abs(v-this.contentDOMWidth)>r.charWidth){let{lineHeight:n,charWidth:o,textHeight:s}=e.docView.measureTextSize();a=n>0&&r.refresh(i,n,o,s,Math.max(5,v/o),t),a&&(e.docView.minWidth=0,c|=16)}h>0&&g>0?l=Math.max(h,g):h<0&&g<0&&(l=Math.min(h,g)),hf();for(let n of this.viewports){let i=n.from==this.viewport.from?t:e.docView.measureVisibleLineHeights(n);this.heightMap=(a?bf.empty().applyChanges(this.stateDeco,N.empty,this.heightOracle,[new pu(0,0,0,e.state.doc.length)]):this.heightMap).updateHeight(r,0,a,new _f(n.from,i))}mf&&(c|=2)}let y=!this.viewportIsAppropriate(this.viewport,l)||this.scrollTarget&&(this.scrollTarget.range.head<this.viewport.from||this.scrollTarget.range.head>this.viewport.to);return y&&(c&2&&(c|=this.updateScaler()),this.viewport=this.getViewport(l,this.scrollTarget),c|=this.updateForViewport()),(c&2||y)&&this.updateViewportLines(),(this.lineGaps.length||this.viewport.to-this.viewport.from>4e3)&&this.updateLineGaps(this.ensureLineGaps(a?[]:this.lineGaps,e)),c|=this.computeVisibleRanges(),this.mustEnforceCursorAssoc&&(this.mustEnforceCursorAssoc=!1,e.docView.enforceCursorAssoc()),c}get visibleTop(){return this.scaler.fromDOM(this.pixelViewport.top)}get visibleBottom(){return this.scaler.fromDOM(this.pixelViewport.bottom)}getViewport(e,t){let n=.5-Math.max(-.5,Math.min(.5,e/1e3/2)),r=this.heightMap,i=this.heightOracle,{visibleTop:a,visibleBottom:o}=this,s=new Rf(r.lineAt(a-n*1e3,W.ByHeight,i,0,0).from,r.lineAt(o+(1-n)*1e3,W.ByHeight,i,0,0).to);if(t){let{head:e}=t.range;if(e<s.from||e>s.to){let n=Math.min(this.editorHeight,this.pixelViewport.bottom-this.pixelViewport.top),a=r.lineAt(e,W.ByPos,i,0,0),o;o=t.y==`center`?(a.top+a.bottom)/2-n/2:t.y==`start`||t.y==`nearest`&&e<s.from?a.top:a.bottom-n,s=new Rf(r.lineAt(o-500,W.ByHeight,i,0,0).from,r.lineAt(o+n+500,W.ByHeight,i,0,0).to)}}return s}mapViewport(e,t){let n=t.mapPos(e.from,-1),r=t.mapPos(e.to,1);return new Rf(this.heightMap.lineAt(n,W.ByPos,this.heightOracle,0,0).from,this.heightMap.lineAt(r,W.ByPos,this.heightOracle,0,0).to)}viewportIsAppropriate({from:e,to:t},n=0){if(!this.inView)return!0;let{top:r}=this.heightMap.lineAt(e,W.ByPos,this.heightOracle,0,0),{bottom:i}=this.heightMap.lineAt(t,W.ByPos,this.heightOracle,0,0),{visibleTop:a,visibleBottom:o}=this;return(e==0||r<=a-Math.max(10,Math.min(-n,250)))&&(t==this.state.doc.length||i>=o+Math.max(10,Math.min(n,250)))&&r>a-2e3&&i<o+2e3}mapLineGaps(e,t){if(!e.length||t.empty)return e;let n=[];for(let r of e)t.touchesRange(r.from,r.to)||n.push(new Ff(t.mapPos(r.from),t.mapPos(r.to),r.size,r.displaySize));return n}ensureLineGaps(e,t){let n=this.heightOracle.lineWrapping,r=n?1e4:2e3,i=r>>1,a=r<<1;if(this.defaultTextDirection!=V.LTR&&!n)return[];let o=[],s=(r,a,c,l)=>{if(a-r<i)return;let u=this.state.selection.main,d=[u.from];u.empty||d.push(u.to);for(let e of d)if(e>r&&e<a){s(r,e-10,c,l),s(e+10,a,c,l);return}let f=Hf(e,e=>e.from>=c.from&&e.to<=c.to&&Math.abs(e.from-r)<i&&Math.abs(e.to-a)<i&&!d.some(t=>e.from<t&&e.to>t));if(!f){if(a<c.to&&t&&n&&t.visibleRanges.some(e=>e.from<=a&&e.to>=a)){let e=t.moveToLineBoundary(P.cursor(a),!1,!0).head;e>r&&(a=e)}let e=this.gapSize(c,r,a,l);f=new Ff(r,a,e,n||e<2e6?e:2e6)}o.push(f)},c=t=>{if(t.length<a||t.type!=kc.Text)return;let i=zf(t.from,t.to,this.stateDeco);if(i.total<a)return;let o=this.scrollTarget?this.scrollTarget.range.head:null,c,l;if(n){let e=r/this.heightOracle.lineLength*this.heightOracle.lineHeight,n,a;if(o!=null){let r=Vf(i,o),s=((this.visibleBottom-this.visibleTop)/2+e)/t.height;n=r-s,a=r+s}else n=(this.visibleTop-t.top-e)/t.height,a=(this.visibleBottom-t.top+e)/t.height;c=Bf(i,n),l=Bf(i,a)}else{let n=i.total*this.heightOracle.charWidth,a=r*this.heightOracle.charWidth,s=0;if(n>2e6)for(let n of e)n.from>=t.from&&n.from<t.to&&n.size!=n.displaySize&&n.from*this.heightOracle.charWidth+s<this.pixelViewport.left&&(s=n.size-n.displaySize);let u=this.pixelViewport.left+s,d=this.pixelViewport.right+s,f,p;if(o!=null){let e=Vf(i,o),t=((d-u)/2+a)/n;f=e-t,p=e+t}else f=(u-a)/n,p=(d+a)/n;c=Bf(i,f),l=Bf(i,p)}c>t.from&&s(t.from,c,t,i),l<t.to&&s(l,t.to,t,i)};for(let e of this.viewportLines)Array.isArray(e.type)?e.type.forEach(c):c(e);return o}gapSize(e,t,n,r){let i=Vf(r,n)-Vf(r,t);return this.heightOracle.lineWrapping?e.height*i:r.total*this.heightOracle.charWidth*i}updateLineGaps(e){Ff.same(e,this.lineGaps)||(this.lineGaps=e,this.lineGapDeco=B.set(e.map(e=>e.draw(this,this.heightOracle.lineWrapping))))}computeVisibleRanges(e){let t=this.stateDeco;this.lineGaps.length&&(t=t.concat(this.lineGapDeco));let n=[];R.spans(t,this.viewport.from,this.viewport.to,{span(e,t){n.push({from:e,to:t})},point(){}},20);let r=0;if(n.length!=this.visibleRanges.length)r=12;else for(let t=0;t<n.length&&!(r&8);t++){let i=this.visibleRanges[t],a=n[t];(i.from!=a.from||i.to!=a.to)&&(r|=4,e&&e.mapPos(i.from,-1)==a.from&&e.mapPos(i.to,1)==a.to||(r|=8))}return this.visibleRanges=n,r}lineBlockAt(e){return e>=this.viewport.from&&e<=this.viewport.to&&this.viewportLines.find(t=>t.from<=e&&t.to>=e)||Kf(this.heightMap.lineAt(e,W.ByPos,this.heightOracle,0,0),this.scaler)}lineBlockAtHeight(e){return e>=this.viewportLines[0].top&&e<=this.viewportLines[this.viewportLines.length-1].bottom&&this.viewportLines.find(t=>t.top<=e&&t.bottom>=e)||Kf(this.heightMap.lineAt(this.scaler.fromDOM(e),W.ByHeight,this.heightOracle,0,0),this.scaler)}getScrollOffset(){return this.scrollParent==this.view.scrollDOM?this.scrollParent.scrollTop*this.scaleY:(this.scrollParent?this.scrollParent.getBoundingClientRect().top:0)-this.view.contentDOM.getBoundingClientRect().top}scrollAnchorAt(e){let t=this.lineBlockAtHeight(e+12-this.paddingTop);return t.from>=this.viewport.from||this.viewportLines[0].top-e>200?t:this.viewportLines[0]}elementAtHeight(e){return Kf(this.heightMap.blockAt(this.scaler.fromDOM(e),this.heightOracle,0,0),this.scaler)}get docHeight(){return this.scaler.toDOM(this.heightMap.height)}get contentHeight(){return this.docHeight+this.paddingTop+this.paddingBottom}},Rf=class{constructor(e,t){this.from=e,this.to=t}};function zf(e,t,n){let r=[],i=e,a=0;return R.spans(n,e,t,{span(){},point(e,t){e>i&&(r.push({from:i,to:e}),a+=e-i),i=t}},20),i<t&&(r.push({from:i,to:t}),a+=t-i),{total:a,ranges:r}}function Bf({total:e,ranges:t},n){if(n<=0)return t[0].from;if(n>=1)return t[t.length-1].to;let r=Math.floor(e*n);for(let e=0;;e++){let{from:n,to:i}=t[e],a=i-n;if(r<=a)return n+r;r-=a}}function Vf(e,t){let n=0;for(let{from:r,to:i}of e.ranges){if(t<=i){n+=t-r;break}n+=i-r}return n/e.total}function Hf(e,t){for(let n of e)if(t(n))return n}var Uf={toDOM(e){return e},fromDOM(e){return e},scale:1,eq(e){return e==this}};function Wf(e){let t=e.facet(ru).filter(e=>typeof e!=`function`),n=e.facet(au).filter(e=>typeof e!=`function`);return n.length&&t.push(R.join(n)),t}var Gf=class e{constructor(e,t){this.scale=e,this.viewports=t}static get(t,n,r){let i=0,a=0,o=0,s=r.map(({from:e,to:r})=>{let a=n.lineAt(e,W.ByPos,t,0,0).top,o=n.lineAt(r,W.ByPos,t,0,0).bottom;return i+=o-a,{from:e,to:r,top:a,bottom:o,domTop:0,domBottom:0}});if(n.height-i<10)return Uf;let c=(7e6-i)/(n.height-i);for(let e of s)e.domTop=o+(e.top-a)*c,o=e.domBottom=e.domTop+(e.bottom-e.top),a=e.bottom;return new e(c,s)}toDOM(e){for(let t=0,n=0,r=0;;t++){let i=t<this.viewports.length?this.viewports[t]:null;if(!i||e<i.top)return r+(e-n)*this.scale;if(e<=i.bottom)return i.domTop+(e-i.top);n=i.bottom,r=i.domBottom}}fromDOM(e){for(let t=0,n=0,r=0;;t++){let i=t<this.viewports.length?this.viewports[t]:null;if(!i||e<i.domTop)return n+(e-r)/this.scale;if(e<=i.domBottom)return i.top+(e-i.domTop);n=i.bottom,r=i.domBottom}}eq(t){return t instanceof e&&this.scale==t.scale&&this.viewports.length==t.viewports.length&&this.viewports.every((e,n)=>e.from==t.viewports[n].from&&e.to==t.viewports[n].to)}};function Kf(e,t){if(t.scale==1)return e;let n=t.toDOM(e.top),r=t.toDOM(e.bottom);return new vf(e.from,e.length,n,r-n,Array.isArray(e._content)?e._content.map(e=>Kf(e,t)):e._content)}var qf=F.define({combine:e=>e.join(` `)}),Jf=F.define({combine:e=>e.indexOf(!0)>-1}),Yf=tc.newName(),Xf=tc.newName(),Zf=tc.newName(),Qf={"&light":`.`+Xf,"&dark":`.`+Zf};function $f(e,t,n){return new tc(t,{finish(t){return/&/.test(t)?t.replace(/&\w*/,t=>{if(t==`&`)return e;if(!n||!n[t])throw RangeError(`Unsupported selector: ${t}`);return n[t]}):e+` `+t}})}var ep=$f(`.`+Yf,{"&":{position:`relative !important`,boxSizing:`border-box`,"&.cm-focused":{outline:`1px dotted #212121`},display:`flex !important`,flexDirection:`column`},".cm-scroller":{display:`flex !important`,alignItems:`flex-start !important`,fontFamily:`monospace`,lineHeight:1.4,height:`100%`,overflowX:`auto`,position:`relative`,zIndex:0,overflowAnchor:`none`},".cm-content":{margin:0,flexGrow:2,flexShrink:0,display:`block`,whiteSpace:`pre`,wordWrap:`normal`,boxSizing:`border-box`,minHeight:`100%`,padding:`4px 0`,outline:`none`,"&[contenteditable=true]":{WebkitUserModify:`read-write-plaintext-only`}},".cm-lineWrapping":{whiteSpace_fallback:`pre-wrap`,whiteSpace:`break-spaces`,wordBreak:`break-word`,overflowWrap:`anywhere`,flexShrink:1},"&light .cm-content":{caretColor:`black`},"&dark .cm-content":{caretColor:`white`},".cm-line":{display:`block`,padding:`0 2px 0 6px`},".cm-layer":{userSelect:`none`,position:`absolute`,left:0,top:0,contain:`size style`,"& > *":{position:`absolute`}},"&light .cm-selectionBackground":{background:`#d9d9d9`},"&dark .cm-selectionBackground":{background:`#222`},"&light.cm-focused > .cm-scroller > .cm-selectionLayer .cm-selectionBackground":{background:`#d7d4f0`},"&dark.cm-focused > .cm-scroller > .cm-selectionLayer .cm-selectionBackground":{background:`#233`},".cm-cursorLayer":{pointerEvents:`none`},"&.cm-focused > .cm-scroller > .cm-cursorLayer":{animation:`steps(1) cm-blink 1.2s infinite`},"@keyframes cm-blink":{"0%":{},"50%":{opacity:0},"100%":{}},"@keyframes cm-blink2":{"0%":{},"50%":{opacity:0},"100%":{}},".cm-cursor, .cm-dropCursor":{borderLeft:`1.2px solid black`,marginLeft:`-0.6px`,pointerEvents:`none`},".cm-cursor":{display:`none`},"&dark .cm-cursor":{borderLeftColor:`#ddd`},".cm-selectionHandle":{backgroundColor:`currentColor`,width:`1.5px`},".cm-selectionHandle-start::before, .cm-selectionHandle-end::before":{content:`""`,backgroundColor:`inherit`,borderRadius:`50%`,width:`8px`,height:`8px`,position:`absolute`,left:`-3.25px`},".cm-selectionHandle-start::before":{top:`-8px`},".cm-selectionHandle-end::before":{bottom:`-8px`},".cm-dropCursor":{position:`absolute`},"&.cm-focused > .cm-scroller > .cm-cursorLayer .cm-cursor":{display:`block`},".cm-iso":{unicodeBidi:`isolate`},".cm-announced":{position:`fixed`,top:`-10000px`},"@media print":{".cm-announced":{display:`none`}},"&light .cm-activeLine":{backgroundColor:`#cceeff44`},"&dark .cm-activeLine":{backgroundColor:`#99eeff33`},"&light .cm-specialChar":{color:`red`},"&dark .cm-specialChar":{color:`#f78`},".cm-gutters":{flexShrink:0,display:`flex`,height:`100%`,boxSizing:`border-box`,zIndex:200},".cm-gutters-before":{insetInlineStart:0},".cm-gutters-after":{insetInlineEnd:0},"&light .cm-gutters":{backgroundColor:`#f5f5f5`,color:`#6c6c6c`,border:`0px solid #ddd`,"&.cm-gutters-before":{borderRightWidth:`1px`},"&.cm-gutters-after":{borderLeftWidth:`1px`}},"&dark .cm-gutters":{backgroundColor:`#333338`,color:`#ccc`},".cm-gutter":{display:`flex !important`,flexDirection:`column`,flexShrink:0,boxSizing:`border-box`,minHeight:`100%`,overflow:`hidden`},".cm-gutterElement":{boxSizing:`border-box`},".cm-lineNumbers .cm-gutterElement":{padding:`0 3px 0 5px`,minWidth:`20px`,textAlign:`right`,whiteSpace:`nowrap`},"&light .cm-activeLineGutter":{backgroundColor:`#e2f2ff`},"&dark .cm-activeLineGutter":{backgroundColor:`#222227`},".cm-panels":{boxSizing:`border-box`,position:`sticky`,left:0,right:0,zIndex:300},"&light .cm-panels":{backgroundColor:`#f5f5f5`,color:`black`},".cm-panels-top":{top:`0`},".cm-panels-bottom":{bottom:`0`},"&light .cm-panels-top":{borderBottom:`1px solid #ddd`},"&light .cm-panels-bottom":{borderTop:`1px solid #ddd`},"&dark .cm-panels":{backgroundColor:`#333338`,color:`white`},".cm-dialog":{padding:`2px 19px 4px 6px`,position:`relative`,"& label":{fontSize:`80%`}},".cm-dialog-close":{position:`absolute`,top:`3px`,right:`4px`,backgroundColor:`inherit`,border:`none`,font:`inherit`,fontSize:`14px`,padding:`0`},".cm-tab":{display:`inline-block`,overflow:`hidden`,verticalAlign:`bottom`},".cm-widgetBuffer":{verticalAlign:`baseline`,height:`1em`,width:0,display:`inline`},".cm-placeholder":{color:`#888`,display:`inline-block`,verticalAlign:`top`,userSelect:`none`},".cm-highlightSpace":{background:`radial-gradient(circle at 50% 55%, #aaa 20%, transparent 0) no-repeat`,backgroundSize:`.4em`,backgroundPosition:`calc(min(50%, 0px)) center`},".cm-highlightTab":{backgroundImage:`url('data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" width="200" height="20"><path stroke="%23888" stroke-width="1" fill="none" d="M1 10H196L190 5M190 15L196 10M197 4L197 16"/></svg>')`,backgroundSize:`auto 100%`,backgroundPosition:`right 90%`,backgroundRepeat:`no-repeat`},".cm-trailingSpace":{backgroundColor:`#ff332255`},".cm-button":{verticalAlign:`middle`,color:`inherit`,fontSize:`70%`,padding:`.2em 1em`,borderRadius:`1px`},"&light .cm-button":{backgroundImage:`linear-gradient(#eff1f5, #d9d9df)`,border:`1px solid #888`,"&:active":{backgroundImage:`linear-gradient(#b4b4b4, #d0d3d6)`}},"&dark .cm-button":{backgroundImage:`linear-gradient(#393939, #111)`,border:`1px solid #888`,"&:active":{backgroundImage:`linear-gradient(#111, #333)`}},".cm-textfield":{verticalAlign:`middle`,color:`inherit`,fontSize:`70%`,border:`1px solid silver`,padding:`.2em .5em`},"&light .cm-textfield":{backgroundColor:`white`},"&dark .cm-textfield":{border:`1px solid #555`,backgroundColor:`inherit`}},Qf),tp={childList:!0,characterData:!0,subtree:!0,attributes:!0,characterDataOldValue:!0},np=z.ie&&z.ie_version<=11,rp=class{constructor(e){this.view=e,this.active=!1,this.editContext=null,this.selectionRange=new $c,this.selectionChanged=!1,this.delayedFlush=-1,this.resizeTimeout=-1,this.queue=[],this.delayedAndroidKey=null,this.flushingAndroidKey=-1,this.lastChange=0,this.scrollTargets=[],this.intersection=null,this.resizeScroll=null,this.intersecting=!1,this.gapIntersection=null,this.gaps=[],this.printQuery=null,this.parentCheck=-1,this.dom=e.contentDOM,this.observer=new MutationObserver(t=>{for(let e of t)this.queue.push(e);(z.ie&&z.ie_version<=11||z.ios&&e.composing)&&t.some(e=>e.type==`childList`&&e.removedNodes.length||e.type==`characterData`&&e.oldValue.length>e.target.nodeValue.length)?this.flushSoon():this.flush()}),window.EditContext&&z.android&&e.constructor.EDIT_CONTEXT!==!1&&!(z.chrome&&z.chrome_version<126)&&(this.editContext=new sp(e),e.state.facet(Xl)&&(e.contentDOM.editContext=this.editContext.editContext)),np&&(this.onCharData=e=>{this.queue.push({target:e.target,type:`characterData`,oldValue:e.prevValue}),this.flushSoon()}),this.onSelectionChange=this.onSelectionChange.bind(this),this.onResize=this.onResize.bind(this),this.onPrint=this.onPrint.bind(this),this.onScroll=this.onScroll.bind(this),window.matchMedia&&(this.printQuery=window.matchMedia(`print`)),typeof ResizeObserver==`function`&&(this.resizeScroll=new ResizeObserver(()=>{this.view.docView?.lastUpdate<Date.now()-75&&this.onResize()}),this.resizeScroll.observe(e.scrollDOM)),this.addWindowListeners(this.win=e.win),this.start(),typeof IntersectionObserver==`function`&&(this.intersection=new IntersectionObserver(e=>{this.parentCheck<0&&(this.parentCheck=setTimeout(this.listenForScroll.bind(this),1e3)),e.length>0&&e[e.length-1].intersectionRatio>0!=this.intersecting&&(this.intersecting=!this.intersecting,this.intersecting!=this.view.inView&&this.onScrollChanged(document.createEvent(`Event`)))},{threshold:[0,.001]}),this.intersection.observe(this.dom),this.gapIntersection=new IntersectionObserver(e=>{e.length>0&&e[e.length-1].intersectionRatio>0&&this.onScrollChanged(document.createEvent(`Event`))},{})),this.listenForScroll(),this.readSelectionRange()}onScrollChanged(e){this.view.inputState.runHandlers(`scroll`,e),this.intersecting&&this.view.measure()}onScroll(e){this.intersecting&&this.flush(this.pendingRecords().length>0),this.editContext&&this.view.requestMeasure(this.editContext.measureReq),this.onScrollChanged(e)}onResize(){this.resizeTimeout<0&&(this.resizeTimeout=setTimeout(()=>{this.resizeTimeout=-1,this.view.requestMeasure()},50))}onPrint(e){(e.type!=`change`&&e.type||e.matches)&&(this.view.viewState.printing=!0,this.view.measure(),setTimeout(()=>{this.view.viewState.printing=!1,this.view.requestMeasure()},500))}updateGaps(e){if(this.gapIntersection&&(e.length!=this.gaps.length||this.gaps.some((t,n)=>t!=e[n]))){this.gapIntersection.disconnect();for(let t of e)this.gapIntersection.observe(t);this.gaps=e}}onSelectionChange(e){let t=this.selectionChanged;if(!this.readSelectionRange()||this.delayedAndroidKey)return;let{view:n}=this,r=this.selectionRange;if(n.state.facet(Xl)?n.root.activeElement!=this.dom:!Vc(this.dom,r))return;let i=r.anchorNode&&n.docView.tile.nearest(r.anchorNode);i&&i.isWidget()&&i.widget.ignoreEvent(e)?t||(this.selectionChanged=!1):(z.ie&&z.ie_version<=11||z.android&&z.chrome)&&!n.state.selection.main.empty&&r.focusNode&&Uc(r.focusNode,r.focusOffset,r.anchorNode,r.anchorOffset)?this.flushSoon():this.flush(!1)}readSelectionRange(){let{view:e}=this,t=zc(e.root);if(!t)return!1;let n=z.safari&&e.root.nodeType==11&&e.root.activeElement==this.dom&&op(this.view,t)||t;if(!n||this.selectionRange.eq(n))return!1;let r=Vc(this.dom,n);return r&&!this.selectionChanged&&e.inputState.lastFocusTime>Date.now()-200&&e.inputState.lastTouchTime<Date.now()-300&&cl(this.dom,n)?(this.view.inputState.lastFocusTime=0,e.docView.updateSelection(),!1):(this.selectionRange.setRange(n),r&&(this.selectionChanged=!0),!0)}setSelectionRange(e,t){this.selectionRange.set(e.node,e.offset,t.node,t.offset),this.selectionChanged=!1}clearSelectionRange(){this.selectionRange.set(null,0,null,0)}listenForScroll(){this.parentCheck=-1;let e=0,t=null;for(let n=this.dom;n;)if(Lc(n))!t&&e<this.scrollTargets.length&&this.scrollTargets[e]==n?e++:t||=this.scrollTargets.slice(0,e),t&&t.push(n),n=n.assignedSlot||n.parentNode;else if(n.nodeType==11)n=n.host;else break;if(e<this.scrollTargets.length&&!t&&(t=this.scrollTargets.slice(0,e)),t){for(let e of this.scrollTargets)e.removeEventListener(`scroll`,this.onScroll);for(let e of this.scrollTargets=t)e.addEventListener(`scroll`,this.onScroll)}}ignore(e){if(!this.active)return e();try{return this.stop(),e()}finally{this.start(),this.clear()}}start(){this.active||=(this.observer.observe(this.dom,tp),np&&this.dom.addEventListener(`DOMCharacterDataModified`,this.onCharData),!0)}stop(){this.active&&(this.active=!1,this.observer.disconnect(),np&&this.dom.removeEventListener(`DOMCharacterDataModified`,this.onCharData))}clear(){this.processRecords(),this.queue.length=0,this.selectionChanged=!1}delayAndroidKey(e,t){if(!this.delayedAndroidKey){let e=()=>{let e=this.delayedAndroidKey;e&&(this.clearDelayedAndroidKey(),this.view.inputState.lastKeyCode=e.keyCode,this.view.inputState.lastKeyTime=Date.now(),!this.flush()&&e.force&&ol(this.dom,e.key,e.keyCode))};this.flushingAndroidKey=this.view.win.requestAnimationFrame(e)}this.delayedAndroidKey&&e!=`Enter`||(this.delayedAndroidKey={key:e,keyCode:t,force:this.lastChange<Date.now()-50||!!this.delayedAndroidKey?.force})}clearDelayedAndroidKey(){this.win.cancelAnimationFrame(this.flushingAndroidKey),this.delayedAndroidKey=null,this.flushingAndroidKey=-1}flushSoon(){this.delayedFlush<0&&(this.delayedFlush=this.view.win.requestAnimationFrame(()=>{this.delayedFlush=-1,this.flush()}))}forceFlush(){this.delayedFlush>=0&&(this.view.win.cancelAnimationFrame(this.delayedFlush),this.delayedFlush=-1),this.flush()}pendingRecords(){for(let e of this.observer.takeRecords())this.queue.push(e);return this.queue}processRecords(){let e=this.pendingRecords();e.length&&(this.queue=[]);let t=-1,n=-1,r=!1;for(let i of e){let e=this.readMutation(i);e&&(e.typeOver&&(r=!0),t==-1?{from:t,to:n}=e:(t=Math.min(e.from,t),n=Math.max(e.to,n)))}return{from:t,to:n,typeOver:r}}readChange(){let{from:e,to:t,typeOver:n}=this.processRecords(),r=this.selectionChanged&&Vc(this.dom,this.selectionRange);if(e<0&&!r)return null;e>-1&&(this.lastChange=Date.now()),this.view.inputState.lastFocusTime=0,this.selectionChanged=!1;let i=new yd(this.view,e,t,n);return this.view.docView.domChanged={newSel:i.newSel?i.newSel.main:null},i}flush(e=!0){if(this.delayedFlush>=0||this.delayedAndroidKey)return!1;e&&this.readSelectionRange();let t=this.selectionChanged,n=this.readChange();if(!n)return this.view.requestMeasure(),!1;let r=this.view.state,i=xd(this.view,n);return this.view.state==r&&(n.domChanged||t)&&this.view.update([]),i}readMutation(e){let t=this.view.docView.tile.nearest(e.target);if(!t||t.isWidget())return null;if(t.markDirty(e.type==`attributes`),e.type==`childList`){let n=ip(t,e.previousSibling||e.target.previousSibling,-1),r=ip(t,e.nextSibling||e.target.nextSibling,1);return{from:n?t.posAfter(n):t.posAtStart,to:r?t.posBefore(r):t.posAtEnd,typeOver:!1}}return e.type==`characterData`?{from:t.posAtStart,to:t.posAtEnd,typeOver:e.target.nodeValue==e.oldValue}:null}setWindow(e){e!=this.win&&(this.removeWindowListeners(this.win),this.win=e,this.addWindowListeners(this.win))}addWindowListeners(e){e.addEventListener(`resize`,this.onResize),this.printQuery?this.printQuery.addEventListener?this.printQuery.addEventListener(`change`,this.onPrint):this.printQuery.addListener(this.onPrint):e.addEventListener(`beforeprint`,this.onPrint),e.addEventListener(`scroll`,this.onScroll),e.document.addEventListener(`selectionchange`,this.onSelectionChange)}removeWindowListeners(e){e.removeEventListener(`scroll`,this.onScroll),e.removeEventListener(`resize`,this.onResize),this.printQuery?this.printQuery.removeEventListener?this.printQuery.removeEventListener(`change`,this.onPrint):this.printQuery.removeListener(this.onPrint):e.removeEventListener(`beforeprint`,this.onPrint),e.document.removeEventListener(`selectionchange`,this.onSelectionChange)}update(e){this.editContext&&(this.editContext.update(e),e.startState.facet(Xl)!=e.state.facet(Xl)&&(e.view.contentDOM.editContext=e.state.facet(Xl)?this.editContext.editContext:null))}destroy(){var e,t,n;this.stop(),(e=this.intersection)==null||e.disconnect(),(t=this.gapIntersection)==null||t.disconnect(),(n=this.resizeScroll)==null||n.disconnect();for(let e of this.scrollTargets)e.removeEventListener(`scroll`,this.onScroll);this.removeWindowListeners(this.win),clearTimeout(this.parentCheck),clearTimeout(this.resizeTimeout),this.win.cancelAnimationFrame(this.delayedFlush),this.win.cancelAnimationFrame(this.flushingAndroidKey),this.editContext&&(this.view.contentDOM.editContext=null,this.editContext.destroy())}};function ip(e,t,n){for(;t;){let r=U.get(t);if(r&&r.parent==e)return r;let i=t.parentNode;t=i==e.dom?n>0?t.nextSibling:t.previousSibling:i}return null}function ap(e,t){let n=t.startContainer,r=t.startOffset,i=t.endContainer,a=t.endOffset,o=e.docView.domAtPos(e.state.selection.main.anchor,1);return Uc(o.node,o.offset,i,a)&&([n,r,i,a]=[i,a,n,r]),{anchorNode:n,anchorOffset:r,focusNode:i,focusOffset:a}}function op(e,t){if(t.getComposedRanges){let n=t.getComposedRanges(e.root)[0];if(n)return ap(e,n)}let n=null;function r(e){e.preventDefault(),e.stopImmediatePropagation(),n=e.getTargetRanges()[0]}return e.contentDOM.addEventListener(`beforeinput`,r,!0),e.dom.ownerDocument.execCommand(`indent`),e.contentDOM.removeEventListener(`beforeinput`,r,!0),n?ap(e,n):null}var sp=class{constructor(e){this.from=0,this.to=0,this.pendingContextChange=null,this.handlers=Object.create(null),this.composing=null,this.resetRange(e.state);let t=this.editContext=new window.EditContext({text:e.state.doc.sliceString(this.from,this.to),selectionStart:this.toContextPos(Math.max(this.from,Math.min(this.to,e.state.selection.main.anchor))),selectionEnd:this.toContextPos(e.state.selection.main.head)});this.handlers.textupdate=n=>{let r=e.state.selection.main,{anchor:i,head:a}=r,o=this.toEditorPos(n.updateRangeStart),s=this.toEditorPos(n.updateRangeEnd);e.inputState.composing>=0&&!this.composing&&(this.composing={contextBase:n.updateRangeStart,editorBase:o,drifted:!1});let c=s-o>n.text.length;o==this.from&&i<this.from?o=i:s==this.to&&i>this.to&&(s=i);let l=wd(e.state.sliceDoc(o,s),n.text,(c?r.from:r.to)-o,c?`end`:null);if(!l){let t=P.single(this.toEditorPos(n.selectionStart),this.toEditorPos(n.selectionEnd));Dd(t,r)||e.dispatch({selection:t,userEvent:`select`});return}let u={from:l.from+o,to:l.toA+o,insert:N.of(n.text.slice(l.from,l.toB).split(`
`))};if((z.mac||z.android)&&u.from==a-1&&/^\. ?$/.test(n.text)&&e.contentDOM.getAttribute(`autocorrect`)==`off`&&(u={from:o,to:s,insert:N.of([n.text.replace(`.`,` `)])}),this.pendingContextChange=u,!e.state.readOnly){let t=this.to-this.from+(u.to-u.from+u.insert.length);Sd(e,u,P.single(this.toEditorPos(n.selectionStart,t),this.toEditorPos(n.selectionEnd,t)))}this.pendingContextChange&&(this.revertPending(e.state),this.setSelection(e.state)),u.from<u.to&&!u.insert.length&&e.inputState.composing>=0&&!/[\\p{Alphabetic}\\p{Number}_]/.test(t.text.slice(Math.max(0,n.updateRangeStart-1),Math.min(t.text.length,n.updateRangeStart+1)))&&this.handlers.compositionend(n)},this.handlers.characterboundsupdate=n=>{let r=[],i=null;for(let t=this.toEditorPos(n.rangeStart),a=this.toEditorPos(n.rangeEnd);t<a;t++){let n=e.coordsForChar(t);i=n&&new DOMRect(n.left,n.top,n.right-n.left,n.bottom-n.top)||i||new DOMRect,r.push(i)}t.updateCharacterBounds(n.rangeStart,r)},this.handlers.textformatupdate=t=>{let n=[];for(let e of t.getTextFormats()){let t=e.underlineStyle,r=e.underlineThickness;if(!/none/i.test(t)&&!/none/i.test(r)){let i=this.toEditorPos(e.rangeStart),a=this.toEditorPos(e.rangeEnd);if(i<a){let e=`text-decoration: underline ${/^[a-z]/.test(t)?t+` `:t==`Dashed`?`dashed `:t==`Squiggle`?`wavy `:``}${/thin/i.test(r)?1:2}px`;n.push(B.mark({attributes:{style:e}}).range(i,a))}}}e.dispatch({effects:Jl.of(B.set(n))})},this.handlers.compositionstart=()=>{e.inputState.composing<0&&(e.inputState.composing=0,e.inputState.compositionFirstChange=!0)},this.handlers.compositionend=()=>{if(e.inputState.composing=-1,e.inputState.compositionFirstChange=null,this.composing){let{drifted:t}=this.composing;this.composing=null,t&&this.reset(e.state)}};for(let e in this.handlers)t.addEventListener(e,this.handlers[e]);this.measureReq={read:e=>{let t=zc(e.root);t&&t.rangeCount&&this.editContext.updateSelectionBounds(t.getRangeAt(0).getBoundingClientRect())}}}applyEdits(e){let t=0,n=!1,r=this.pendingContextChange;return e.changes.iterChanges((i,a,o,s,c)=>{if(n)return;let l=c.length-(a-i);if(r&&a>=r.to){if(r.from==i&&r.to==a&&r.insert.eq(c)){r=this.pendingContextChange=null,t+=l,this.to+=l;return}r=null,this.revertPending(e.state)}if(i+=t,a+=t,a<=this.from)this.from+=l,this.to+=l;else if(i<this.to){if(i<this.from||a>this.to||this.to-this.from+c.length>3e4){n=!0;return}this.editContext.updateText(this.toContextPos(i),this.toContextPos(a),c.toString()),this.to+=l}t+=l}),r&&!n&&this.revertPending(e.state),!n}update(e){let t=this.pendingContextChange,n=e.startState.selection.main;this.composing&&(this.composing.drifted||!e.changes.touchesRange(n.from,n.to)&&e.transactions.some(e=>!e.isUserEvent(`input.type`)&&e.changes.touchesRange(this.from,this.to)))?(this.composing.drifted=!0,this.composing.editorBase=e.changes.mapPos(this.composing.editorBase)):!this.applyEdits(e)||!this.rangeIsValid(e.state)?(this.pendingContextChange=null,this.reset(e.state)):(e.docChanged||e.selectionSet||t)&&this.setSelection(e.state),(e.geometryChanged||e.docChanged||e.selectionSet)&&e.view.requestMeasure(this.measureReq)}resetRange(e){let{head:t}=e.selection.main;this.from=Math.max(0,t-1e4),this.to=Math.min(e.doc.length,t+1e4)}reset(e){this.resetRange(e),this.editContext.updateText(0,this.editContext.text.length,e.doc.sliceString(this.from,this.to)),this.setSelection(e)}revertPending(e){let t=this.pendingContextChange;this.pendingContextChange=null,this.editContext.updateText(this.toContextPos(t.from),this.toContextPos(t.from+t.insert.length),e.doc.sliceString(t.from,t.to))}setSelection(e){let{main:t}=e.selection,n=this.toContextPos(Math.max(this.from,Math.min(this.to,t.anchor))),r=this.toContextPos(t.head);(this.editContext.selectionStart!=n||this.editContext.selectionEnd!=r)&&this.editContext.updateSelection(n,r)}rangeIsValid(e){let{head:t}=e.selection.main;return!(this.from>0&&t-this.from<500||this.to<e.doc.length&&this.to-t<500||this.to-this.from>3e4)}toEditorPos(e,t=this.to-this.from){e=Math.min(e,t);let n=this.composing;return n&&n.drifted?n.editorBase+(e-n.contextBase):e+this.from}toContextPos(e){let t=this.composing;return t&&t.drifted?t.contextBase+(e-t.editorBase):e-this.from}destroy(){for(let e in this.handlers)this.editContext.removeEventListener(e,this.handlers[e])}},G=class e{get state(){return this.viewState.state}get viewport(){return this.viewState.viewport}get visibleRanges(){return this.viewState.visibleRanges}get inView(){return this.viewState.inView}get composing(){return!!this.inputState&&this.inputState.composing>0}get compositionStarted(){return!!this.inputState&&this.inputState.composing>=0}get root(){return this._root}get win(){return this.dom.ownerDocument.defaultView||window}constructor(e={}){this.plugins=[],this.pluginMap=new Map,this.editorAttrs={},this.contentAttrs={},this.bidiCache=[],this.destroyed=!1,this.updateState=2,this.measureScheduled=-1,this.measureRequests=[],this.clearAnnouncement=-1,this.contentDOM=document.createElement(`div`),this.scrollDOM=document.createElement(`div`),this.scrollDOM.tabIndex=-1,this.scrollDOM.className=`cm-scroller`,this.scrollDOM.appendChild(this.contentDOM),this.announceDOM=document.createElement(`div`),this.announceDOM.className=`cm-announced`,this.announceDOM.setAttribute(`aria-live`,`polite`),this.dom=document.createElement(`div`),this.dom.appendChild(this.announceDOM),this.dom.appendChild(this.scrollDOM),e.parent&&e.parent.appendChild(this.dom);let{dispatch:t}=e;this.dispatchTransactions=e.dispatchTransactions||t&&(e=>e.forEach(e=>t(e,this)))||(e=>this.update(e)),this.dispatch=this.dispatch.bind(this),this._root=e.root||sl(e.parent)||document,this.viewState=new Lf(this,e.state||L.create(e)),e.scrollTo&&e.scrollTo.is(ql)&&(this.viewState.scrollTarget=e.scrollTo.value.clip(this.viewState.state)),this.plugins=this.state.facet(Ql).map(e=>new eu(e));for(let e of this.plugins)e.update(this);this.observer=new rp(this),this.inputState=new Od(this),this.inputState.ensureHandlers(this.plugins),this.docView=new Hu(this),this.mountStyles(),this.updateAttrs(),this.updateState=0,this.requestMeasure(),document.fonts?.ready&&document.fonts.ready.then(()=>{this.viewState.mustMeasureContent=`refresh`,this.requestMeasure()})}dispatch(...e){let t=e.length==1&&e[0]instanceof gs?e:e.length==1&&Array.isArray(e[0])?e[0]:[this.state.update(...e)];this.dispatchTransactions(t,this)}update(t){if(this.updateState!=0)throw Error(`Calls to EditorView.update are not allowed while an update is in progress`);let n=!1,r=!1,i,a=this.state;for(let e of t){if(e.startState!=a)throw RangeError(`Trying to update state with a transaction that doesn't start from the previous state.`);a=e.state}if(this.destroyed){this.viewState.state=a;return}let o=this.hasFocus,s=0,c=null;t.some(e=>e.annotation(cf))?(this.inputState.notifiedFocused=o,s=1):o!=this.inputState.notifiedFocused&&(this.inputState.notifiedFocused=o,c=lf(a,o),c||(s=1));let l=this.observer.delayedAndroidKey,u=null;if(l?(this.observer.clearDelayedAndroidKey(),u=this.observer.readChange(),(u&&!this.state.doc.eq(a.doc)||!this.state.selection.eq(a.selection))&&(u=null)):this.observer.clear(),a.facet(L.phrases)!=this.state.facet(L.phrases))return this.setState(a);i=mu.create(this,a,t),i.flags|=s;let d=this.viewState.scrollTarget;try{this.updateState=2;for(let n of t){if(d&&=d.map(n.changes),n.scrollIntoView){let{main:t}=n.state.selection,{x:r,y:i}=this.state.facet(e.cursorScrollMargin);d=new Kl(t.empty?t:P.cursor(t.head,t.head>t.anchor?-1:1),`nearest`,`nearest`,i,r)}for(let e of n.effects)e.is(ql)&&(d=e.value.clip(this.state))}this.viewState.update(i,d),this.bidiCache=up.update(this.bidiCache,i.changes),i.empty||(this.updatePlugins(i),this.inputState.update(i)),n=this.docView.update(i),this.state.facet(fu)!=this.styleModules&&this.mountStyles(),r=this.updateAttrs(),this.showAnnouncements(t),this.docView.updateSelection(n,t.some(e=>e.isUserEvent(`select.pointer`)))}finally{this.updateState=0}if(i.startState.facet(qf)!=i.state.facet(qf)&&(this.viewState.mustMeasureContent=!0),(n||r||d||this.viewState.mustEnforceCursorAssoc||this.viewState.mustMeasureContent)&&this.requestMeasure(),n&&this.docViewUpdate(),!i.empty)for(let e of this.state.facet(Rl))try{e(i)}catch(e){Yl(this.state,e,`update listener`)}(c||u)&&Promise.resolve().then(()=>{c&&this.state==c.startState&&this.dispatch(c),u&&!xd(this,u)&&l.force&&ol(this.contentDOM,l.key,l.keyCode)})}setState(e){if(this.updateState!=0)throw Error(`Calls to EditorView.setState are not allowed while an update is in progress`);if(this.destroyed){this.viewState.state=e;return}this.updateState=2;let t=this.hasFocus;try{for(let e of this.plugins)e.destroy(this);this.viewState=new Lf(this,e),this.plugins=e.facet(Ql).map(e=>new eu(e)),this.pluginMap.clear();for(let e of this.plugins)e.update(this);this.docView.destroy(),this.docView=new Hu(this),this.inputState.ensureHandlers(this.plugins),this.mountStyles(),this.updateAttrs(),this.bidiCache=[]}finally{this.updateState=0}t&&this.focus(),this.requestMeasure()}updatePlugins(e){let t=e.startState.facet(Ql),n=e.state.facet(Ql);if(t!=n){let r=[];for(let i of n){let n=t.indexOf(i);if(n<0)r.push(new eu(i));else{let t=this.plugins[n];t.mustUpdate=e,r.push(t)}}for(let t of this.plugins)t.mustUpdate!=e&&t.destroy(this);this.plugins=r,this.pluginMap.clear()}else for(let t of this.plugins)t.mustUpdate=e;for(let e=0;e<this.plugins.length;e++)this.plugins[e].update(this);t!=n&&this.inputState.ensureHandlers(this.plugins)}docViewUpdate(){for(let e of this.plugins){let t=e.value;if(t&&t.docViewUpdate)try{t.docViewUpdate(this)}catch(e){Yl(this.state,e,`doc view update listener`)}}}measure(e=!0){if(this.destroyed)return;if(this.measureScheduled>-1&&this.win.cancelAnimationFrame(this.measureScheduled),this.observer.delayedAndroidKey){this.measureScheduled=-1,this.requestMeasure();return}this.measureScheduled=0,e&&this.observer.forceFlush();let t=null,n=this.viewState.scrollParent,r=this.viewState.getScrollOffset(),{scrollAnchorPos:i,scrollAnchorHeight:a,scaleY:o}=this.viewState;Math.abs(r-this.viewState.scrollOffset)>1&&(a=-1),this.viewState.scrollAnchorHeight=-1;try{for(let e=0;;e++){if(a<0){if(ll(n||this.win))i=-1,a=this.viewState.heightMap.height/this.viewState.scaleY;else{let e=this.viewState.scrollAnchorAt(r);i=e.from,a=e.top}o=this.viewState.scaleY}this.updateState=1;let s=this.viewState.measure();if(!s&&!this.measureRequests.length&&this.viewState.scrollTarget==null)break;if(e>5){console.warn(this.measureRequests.length?`Measure loop restarted more than 5 times`:`Viewport failed to stabilize`);break}let c=[];s&4||([this.measureRequests,c]=[c,this.measureRequests]);let l=c.map(e=>{try{return e.read(this)}catch(e){return Yl(this.state,e),lp}}),u=mu.create(this,this.state,[]),d=!1;u.flags|=s,t?t.flags|=s:t=u,this.updateState=2,u.empty||(this.updatePlugins(u),this.inputState.update(u),this.updateAttrs(),d=this.docView.update(u),d&&this.docViewUpdate());for(let e=0;e<c.length;e++)if(l[e]!=lp)try{let t=c[e];t.write&&t.write(l[e],this)}catch(e){Yl(this.state,e)}if(d&&this.docView.updateSelection(!0),!u.viewportChanged&&this.measureRequests.length==0){if(this.viewState.editorHeight){if(this.viewState.scrollTarget){this.docView.scrollIntoView(this.viewState.scrollTarget),this.viewState.scrollTarget=null,a=-1;continue}{let e=(i<0?this.viewState.heightMap.height:this.viewState.lineBlockAt(i).top)/this.viewState.scaleY-a/o;if((e>1||e<-1)&&!(z.ios&&this.inputState.lastIOSMomentumScroll>Date.now()-100)&&(n==this.scrollDOM||this.hasFocus||Math.max(this.inputState.lastWheelEvent,this.inputState.lastTouchTime)>Date.now()-100)){r+=e,n?i<0?n.scrollTop=n.scrollHeight:n.scrollTop+=e:this.win.scrollBy(0,e),a=-1;continue}}}break}}}finally{this.updateState=0,this.measureScheduled=-1}if(t&&!t.empty)for(let e of this.state.facet(Rl))e(t)}get themeClasses(){return Yf+` `+(this.state.facet(Jf)?Zf:Xf)+` `+this.state.facet(qf)}updateAttrs(){let e=dp(this,tu,{class:`cm-editor`+(this.hasFocus?` cm-focused `:` `)+this.themeClasses}),t={spellcheck:`false`,autocorrect:`off`,autocapitalize:`off`,writingsuggestions:`false`,translate:`no`,contenteditable:this.state.facet(Xl)?`true`:`false`,class:`cm-content`,style:`${z.tabSize}: ${this.state.tabSize}`,role:`textbox`,"aria-multiline":`true`};this.state.readOnly&&(t[`aria-readonly`]=`true`),dp(this,nu,t);let n=this.observer.ignore(()=>{let n=Ec(this.contentDOM,this.contentAttrs,t),r=Ec(this.dom,this.editorAttrs,e);return n||r});return this.editorAttrs=e,this.contentAttrs=t,n}showAnnouncements(t){let n=!0;for(let r of t)for(let t of r.effects)if(t.is(e.announce)){n&&=(this.announceDOM.textContent=``,this.win.clearTimeout(this.clearAnnouncement),this.clearAnnouncement=this.win.setTimeout(()=>{this.announceDOM.textContent=`\xA0`},200),!1);let e=this.announceDOM.appendChild(document.createElement(`div`));e.textContent=t.value}}mountStyles(){this.styleModules=this.state.facet(fu);let t=this.state.facet(e.cspNonce);tc.mount(this.root,this.styleModules.concat(ep).reverse(),t?{nonce:t}:void 0)}readMeasured(){if(this.updateState==2)throw Error(`Reading the editor layout isn't allowed during an update`);this.updateState==0&&this.measureScheduled>-1&&this.measure(!1)}requestMeasure(e){if(this.measureScheduled<0&&(this.measureScheduled=this.win.requestAnimationFrame(()=>this.measure())),e){if(this.measureRequests.indexOf(e)>-1)return;if(e.key!=null){for(let t=0;t<this.measureRequests.length;t++)if(this.measureRequests[t].key===e.key){this.measureRequests[t]=e;return}}this.measureRequests.push(e)}}plugin(e){let t=this.pluginMap.get(e);return(t===void 0||t&&t.plugin!=e)&&this.pluginMap.set(e,t=this.plugins.find(t=>t.plugin==e)||null),t&&t.update(this).value}get documentTop(){return this.contentDOM.getBoundingClientRect().top+this.viewState.paddingTop}get documentPadding(){return{top:this.viewState.paddingTop,bottom:this.viewState.paddingBottom}}get scaleX(){return this.viewState.scaleX}get scaleY(){return this.viewState.scaleY}elementAtHeight(e){return this.readMeasured(),this.viewState.elementAtHeight(e)}lineBlockAtHeight(e){return this.readMeasured(),this.viewState.lineBlockAtHeight(e)}get viewportLineBlocks(){return this.viewState.viewportLines}lineBlockAt(e){return this.viewState.lineBlockAt(e)}get contentHeight(){return this.viewState.contentHeight}moveByChar(e,t,n){return ud(this,e,ad(this,e,t,n))}moveByGroup(e,t){return ud(this,e,ad(this,e,t,t=>od(this,e.head,t)))}visualLineSide(e,t){return t?P.cursor(e.to,1):P.cursor(e.from,-1)}moveToLineBoundary(e,t,n=!0){return id(this,e,t,n)}moveVertically(e,t,n){return ud(this,e,sd(this,e,t,n))}domAtPos(e,t=1){return this.docView.domAtPos(e,t)}posAtDOM(e,t=0){return this.docView.posFromDOM(e,t)}posAtCoords(e,t=!0){this.readMeasured();let n=fd(this,e,t);return n&&n.pos}posAndSideAtCoords(e,t=!0){return this.readMeasured(),fd(this,e,t)}coordsAtPos(e,t=1){this.readMeasured();let n=this.state.doc.lineAt(e),r=this.bidiSpans(n),i=r[Sl.find(r,e-n.from,-1,t)];return n.length&&(e==n.from&&t<0||e==n.to&&t>0)&&i.dir!=this.textDirectionAt(n.from)&&(e==n.to?(e=n.from+i.from,t=1):(e=n.from+i.to,t=-1)),this.docView.coordsAt(e,t,i.dir==V.RTL)}coordsForChar(e){return this.readMeasured(),this.docView.coordsForChar(e)}get defaultCharacterWidth(){return this.viewState.heightOracle.charWidth}get defaultLineHeight(){return this.viewState.heightOracle.lineHeight}get textDirection(){return this.viewState.defaultTextDirection}textDirectionAt(e){return!this.state.facet(Ul)||e<this.viewport.from||e>this.viewport.to?this.textDirection:(this.readMeasured(),this.docView.textDirectionAt(e))}get lineWrapping(){return this.viewState.heightOracle.lineWrapping}bidiSpans(e){if(e.length>cp)return Al(e.length);let t=this.textDirectionAt(e.from),n;for(let r of this.bidiCache)if(r.from==e.from&&r.dir==t&&(r.fresh||Cl(r.isolates,n=cu(this,e))))return r.order;n||=cu(this,e);let r=kl(e.text,t,n);return this.bidiCache.push(new up(e.from,e.to,t,n,!0,r)),r}get hasFocus(){return(this.dom.ownerDocument.hasFocus()||z.safari&&this.inputState?.lastContextMenu>Date.now()-3e4)&&this.root.activeElement==this.contentDOM}focus(){this.observer.ignore(()=>{rl(this.contentDOM),this.docView.updateSelection()})}setRoot(e){this._root!=e&&(this._root=e,this.observer.setWindow((e.nodeType==9?e:e.ownerDocument).defaultView||window),this.mountStyles())}destroy(){this.root.activeElement==this.contentDOM&&this.contentDOM.blur();for(let e of this.plugins)e.destroy(this);this.plugins=[],this.inputState.destroy(),this.docView.destroy(),this.dom.remove(),this.observer.destroy(),this.win.clearTimeout(this.clearAnnouncement),this.measureScheduled>-1&&this.win.cancelAnimationFrame(this.measureScheduled),this.destroyed=!0}static scrollIntoView(e,t={}){return ql.of(new Kl(typeof e==`number`?P.cursor(e):e,t.y??`nearest`,t.x??`nearest`,t.yMargin??5,t.xMargin??5))}scrollSnapshot(){let{scrollTop:e,scrollLeft:t}=this.scrollDOM,n=this.viewState.scrollAnchorAt(e);return ql.of(new Kl(P.cursor(n.from),`start`,`start`,n.top-e,t,!0))}setTabFocusMode(e){e==null?this.inputState.tabFocusMode=this.inputState.tabFocusMode<0?0:-1:typeof e==`boolean`?this.inputState.tabFocusMode=e?0:-1:this.inputState.tabFocusMode!=0&&(this.inputState.tabFocusMode=Date.now()+e)}static domEventHandlers(e){return $l.define(()=>({}),{eventHandlers:e})}static domEventObservers(e){return $l.define(()=>({}),{eventObservers:e})}static theme(e,t){let n=tc.newName(),r=[qf.of(n),fu.of($f(`.${n}`,e))];return t&&t.dark&&r.push(Jf.of(!0)),r}static baseTheme(e){return Qo.lowest(fu.of($f(`.`+Yf,e,Qf)))}static findFromDOM(e){let t=e.querySelector(`.cm-content`);return(t&&U.get(t)||U.get(e))?.root?.view||null}};G.styleModule=fu,G.inputHandler=zl,G.clipboardInputFilter=Vl,G.clipboardOutputFilter=Hl,G.scrollHandler=Gl,G.focusChangeEffect=Bl,G.perLineTextDirection=Ul,G.exceptionSink=Ll,G.updateListener=Rl,G.editable=Xl,G.mouseSelectionStyle=Il,G.dragMovesSelection=Fl,G.clickAddsSelectionRange=Pl,G.decorations=ru,G.blockWrappers=iu,G.outerDecorations=au,G.atomicRanges=ou,G.bidiIsolatedRanges=su,G.cursorScrollMargin=F.define({combine:e=>{let t=5,n=5;for(let r of e)typeof r==`number`?t=n=r:{x:t,y:n}=r;return{x:t,y:n}}}),G.scrollMargins=uu,G.darkTheme=Jf,G.cspNonce=F.define({combine:e=>e.length?e[0]:``}),G.contentAttributes=nu,G.editorAttributes=tu,G.lineWrapping=G.contentAttributes.of({class:`cm-lineWrapping`}),G.announce=I.define();var cp=4096,lp={},up=class e{constructor(e,t,n,r,i,a){this.from=e,this.to=t,this.dir=n,this.isolates=r,this.fresh=i,this.order=a}static update(t,n){if(n.empty&&!t.some(e=>e.fresh))return t;let r=[],i=t.length?t[t.length-1].dir:V.LTR;for(let a=Math.max(0,t.length-10);a<t.length;a++){let o=t[a];o.dir==i&&!n.touchesRange(o.from,o.to)&&r.push(new e(n.mapPos(o.from,1),n.mapPos(o.to,-1),o.dir,o.isolates,!1,o.order))}return r}};function dp(e,t,n){for(let r=e.state.facet(t),i=r.length-1;i>=0;i--){let t=r[i],a=typeof t==`function`?t(e):t;a&&Sc(a,n)}return n}var fp=z.mac?`mac`:z.windows?`win`:z.linux?`linux`:`key`;function pp(e,t){let n=e.split(/-(?!$)/),r=n[n.length-1];r==`Space`&&(r=` `);let i,a,o,s;for(let e=0;e<n.length-1;++e){let r=n[e];if(/^(cmd|meta|m)$/i.test(r))s=!0;else if(/^a(lt)?$/i.test(r))i=!0;else if(/^(c|ctrl|control)$/i.test(r))a=!0;else if(/^s(hift)?$/i.test(r))o=!0;else if(/^mod$/i.test(r))t==`mac`?s=!0:a=!0;else throw Error(`Unrecognized modifier name: `+r)}return i&&(r=`Alt-`+r),a&&(r=`Ctrl-`+r),s&&(r=`Meta-`+r),o&&(r=`Shift-`+r),r}function mp(e,t,n){return t.altKey&&(e=`Alt-`+e),t.ctrlKey&&(e=`Ctrl-`+e),t.metaKey&&(e=`Meta-`+e),n!==!1&&t.shiftKey&&(e=`Shift-`+e),e}var hp=Qo.default(G.domEventHandlers({keydown(e,t){return Cp(vp(t.state),e,t,`editor`)}})),gp=F.define({enables:hp}),_p=new WeakMap;function vp(e){let t=e.facet(gp),n=_p.get(t);return n||_p.set(t,n=xp(t.reduce((e,t)=>e.concat(t),[]))),n}var yp=null,bp=4e3;function xp(e,t=fp){let n=Object.create(null),r=Object.create(null),i=(e,t)=>{let n=r[e];if(n==null)r[e]=t;else if(n!=t)throw Error(`Key binding `+e+` is used both as a regular binding and as a multi-stroke prefix`)},a=(e,r,a,o,s)=>{let c=n[e]||(n[e]=Object.create(null)),l=r.split(/ (?!$)/).map(e=>pp(e,t));for(let t=1;t<l.length;t++){let n=l.slice(0,t).join(` `);i(n,!0),c[n]||(c[n]={preventDefault:!0,stopPropagation:!1,run:[t=>{let r=yp={view:t,prefix:n,scope:e};return setTimeout(()=>{yp==r&&(yp=null)},bp),!0}]})}let u=l.join(` `);i(u,!1);let d=c[u]||(c[u]={preventDefault:!1,stopPropagation:!1,run:(c._any?.run)?.slice()||[]});a&&d.run.push(a),o&&(d.preventDefault=!0),s&&(d.stopPropagation=!0)};for(let r of e){let e=r.scope?r.scope.split(` `):[`editor`];if(r.any)for(let t of e){let e=n[t]||(n[t]=Object.create(null));e._any||={preventDefault:!1,stopPropagation:!1,run:[]};let{any:i}=r;for(let t in e)e[t].run.push(e=>i(e,Sp))}let i=r[t]||r.key;if(i)for(let t of e)a(t,i,r.run,r.preventDefault,r.stopPropagation),r.shift&&a(t,`Shift-`+i,r.shift,r.preventDefault,r.stopPropagation)}return n}var Sp=null;function Cp(e,t,n,r){Sp=t;let i=uc(t),a=ko(Oo(i,0))==i.length&&i!=` `,o=``,s=!1,c=!1,l=!1;yp&&yp.view==n&&yp.scope==r&&(o=yp.prefix+` `,Pd.indexOf(t.keyCode)<0&&(c=!0,yp=null));let u=new Set,d=e=>{if(e){for(let t of e.run)if(!u.has(t)&&(u.add(t),t(n)))return e.stopPropagation&&(l=!0),!0;e.preventDefault&&(e.stopPropagation&&(l=!0),c=!0)}return!1},f=e[r],p,m;return f&&(d(f[o+mp(i,t,!a)])?s=!0:a&&(t.altKey||t.metaKey||t.ctrlKey)&&!(z.windows&&t.ctrlKey&&t.altKey)&&!(z.mac&&t.altKey&&!(t.ctrlKey||t.metaKey))&&(p=ic[t.keyCode])&&p!=i?(d(f[o+mp(p,t,!0)])||t.shiftKey&&(m=ac[t.keyCode])!=i&&m!=p&&d(f[o+mp(m,t,!1)]))&&(s=!0):a&&t.shiftKey&&d(f[o+mp(i,t,!0)])&&(s=!0),!s&&d(f._any)&&(s=!0)),c&&(s=!0),s&&l&&t.stopPropagation(),Sp=null,s}var wp=class e{constructor(e,t,n,r,i){this.className=e,this.left=t,this.top=n,this.width=r,this.height=i}draw(){let e=document.createElement(`div`);return e.className=this.className,this.adjust(e),e}update(e,t){return t.className==this.className&&(this.adjust(e),!0)}adjust(e){e.style.left=this.left+`px`,e.style.top=this.top+`px`,this.width!=null&&(e.style.width=this.width+`px`),e.style.height=this.height+`px`}eq(e){return this.left==e.left&&this.top==e.top&&this.width==e.width&&this.height==e.height&&this.className==e.className}static forRange(t,n,r){if(r.empty){let i=t.coordsAtPos(r.head,r.assoc||1);if(!i)return[];let a=Tp(t);return[new e(n,i.left-a.left,i.top-a.top,null,i.bottom-i.top)]}return Dp(t,n,r)}};function Tp(e){let t=e.scrollDOM.getBoundingClientRect();return{left:(e.textDirection==V.LTR?t.left:t.right-e.scrollDOM.clientWidth*e.scaleX)-e.scrollDOM.scrollLeft*e.scaleX,top:t.top-e.scrollDOM.scrollTop*e.scaleY}}function Ep(e,t,n,r){let i=e.coordsAtPos(t,n*2);if(!i)return r;let a=e.dom.getBoundingClientRect(),o=(i.top+i.bottom)/2,s=e.posAtCoords({x:a.left+1,y:o}),c=e.posAtCoords({x:a.right-1,y:o});return s==null||c==null?r:{from:Math.max(r.from,Math.min(s,c)),to:Math.min(r.to,Math.max(s,c))}}function Dp(e,t,n){if(n.to<=e.viewport.from||n.from>=e.viewport.to)return[];let r=Math.max(n.from,e.viewport.from),i=Math.min(n.to,e.viewport.to),a=e.textDirection==V.LTR,o=e.contentDOM,s=o.getBoundingClientRect(),c=Tp(e),l=o.querySelector(`.cm-line`),u=l&&window.getComputedStyle(l),d=s.left+(u?parseInt(u.paddingLeft)+Math.min(0,parseInt(u.textIndent)):0),f=s.right-(u?parseInt(u.paddingRight):0),p=rd(e,r,1),m=rd(e,i,-1),h=p.type==kc.Text?p:null,g=m.type==kc.Text?m:null;if(h&&(e.lineWrapping||p.widgetLineBreaks)&&(h=Ep(e,r,1,h)),g&&(e.lineWrapping||m.widgetLineBreaks)&&(g=Ep(e,i,-1,g)),h&&g&&h.from==g.from&&h.to==g.to)return v(y(n.from,n.to,h));{let t=h?y(n.from,null,h):ee(p,!1),r=g?y(null,n.to,g):ee(m,!0),i=[];return(h||p).to<(g||m).from-(h&&g?1:0)||p.widgetLineBreaks>1&&t.bottom+e.defaultLineHeight/2<r.top?i.push(_(d,t.bottom,f,r.top)):t.bottom<r.top&&e.elementAtHeight((t.bottom+r.top)/2).type==kc.Text&&(t.bottom=r.top=(t.bottom+r.top)/2),v(t).concat(i).concat(v(r))}function _(e,n,r,i){return new wp(t,e-c.left,n-c.top,Math.max(0,r-e),i-n)}function v({top:e,bottom:t,horizontal:n}){let r=[];for(let i=0;i<n.length;i+=2)r.push(_(n[i],e,n[i+1],t));return r}function y(t,n,r){let i=1e9,o=-1e9,s=[];function c(t,n,c,l,u){let p=e.coordsAtPos(t,t==r.to?-2:2),m=e.coordsAtPos(c,c==r.from?2:-2);p&&m&&(i=Math.min(p.top,m.top,i),o=Math.max(p.bottom,m.bottom,o),u==V.LTR?s.push(a&&n?d:p.left,a&&l?f:m.right):s.push(!a&&l?d:m.left,!a&&n?f:p.right))}let l=t??r.from,u=n??r.to;for(let r of e.visibleRanges)if(r.to>l&&r.from<u)for(let i=Math.max(r.from,l),a=Math.min(r.to,u);;){let r=e.state.doc.lineAt(i);for(let o of e.bidiSpans(r)){let e=o.from+r.from,s=o.to+r.from;if(e>=a)break;s>i&&c(Math.max(e,i),t==null&&e<=l,Math.min(s,a),n==null&&s>=u,o.dir)}if(i=r.to+1,i>=a)break}return s.length==0&&c(l,t==null,u,n==null,e.textDirection),{top:i,bottom:o,horizontal:s}}function ee(e,t){let n=s.top+(t?e.top:e.bottom);return{top:n,bottom:n,horizontal:[]}}}function Op(e,t){return e.constructor==t.constructor&&e.eq(t)}var kp=class{constructor(e,t){this.view=e,this.layer=t,this.drawn=[],this.scaleX=1,this.scaleY=1,this.measureReq={read:this.measure.bind(this),write:this.draw.bind(this)},this.dom=e.scrollDOM.appendChild(document.createElement(`div`)),this.dom.classList.add(`cm-layer`),t.above&&this.dom.classList.add(`cm-layer-above`),t.class&&this.dom.classList.add(t.class),this.scale(),this.dom.setAttribute(`aria-hidden`,`true`),this.setOrder(e.state),e.requestMeasure(this.measureReq),t.mount&&t.mount(this.dom,e)}update(e){e.startState.facet(Ap)!=e.state.facet(Ap)&&this.setOrder(e.state),(this.layer.update(e,this.dom)||e.geometryChanged)&&(this.scale(),e.view.requestMeasure(this.measureReq))}docViewUpdate(e){this.layer.updateOnDocViewUpdate!==!1&&e.requestMeasure(this.measureReq)}setOrder(e){let t=0,n=e.facet(Ap);for(;t<n.length&&n[t]!=this.layer;)t++;this.dom.style.zIndex=String((this.layer.above?150:-1)-t)}measure(){return this.layer.markers(this.view)}scale(){let{scaleX:e,scaleY:t}=this.view;(e!=this.scaleX||t!=this.scaleY)&&(this.scaleX=e,this.scaleY=t,this.dom.style.transform=`scale(${1/e}, ${1/t})`)}draw(e){if(e.length!=this.drawn.length||e.some((e,t)=>!Op(e,this.drawn[t]))){let t=this.dom.firstChild,n=0;for(let r of e)r.update&&t&&r.constructor&&this.drawn[n].constructor&&r.update(t,this.drawn[n])?(t=t.nextSibling,n++):this.dom.insertBefore(r.draw(),t);for(;t;){let e=t.nextSibling;t.remove(),t=e}this.drawn=e,z.webkit&&(this.dom.style.display=this.dom.firstChild?``:`none`)}}destroy(){this.layer.destroy&&this.layer.destroy(this.dom,this.view),this.dom.remove()}},Ap=F.define();function jp(e){return[$l.define(t=>new kp(t,e)),Ap.of(e)]}var Mp=!z.ios,Np=F.define({combine(e){return As(e,{cursorBlinkRate:1200,drawRangeCursor:!0,iosSelectionHandles:!0},{cursorBlinkRate:(e,t)=>Math.min(e,t),drawRangeCursor:(e,t)=>e||t})}});function Pp(e={}){return[Np.of(e),Ip,Rp,Bp,Wl.of(!0)]}function Fp(e){return e.startState.facet(Np)!=e.state.facet(Np)}var Ip=jp({above:!0,markers(e){let{state:t}=e,n=t.facet(Np),r=[];for(let i of t.selection.ranges){let a=i==t.selection.main;if(i.empty||n.drawRangeCursor&&!(a&&z.ios&&n.iosSelectionHandles)){let t=a?`cm-cursor cm-cursor-primary`:`cm-cursor cm-cursor-secondary`,n=i.empty?i:P.cursor(i.head,i.assoc);for(let i of wp.forRange(e,t,n))r.push(i)}}return r},update(e,t){e.transactions.some(e=>e.selection)&&(t.style.animationName=t.style.animationName==`cm-blink`?`cm-blink2`:`cm-blink`);let n=Fp(e);return n&&Lp(e.state,t),e.docChanged||e.selectionSet||n},mount(e,t){Lp(t.state,e)},class:`cm-cursorLayer`});function Lp(e,t){t.style.animationDuration=e.facet(Np).cursorBlinkRate+`ms`}var Rp=jp({above:!1,markers(e){let t=[],{main:n,ranges:r}=e.state.selection;for(let i of r)if(!i.empty&&(Mp||i!=n))for(let n of wp.forRange(e,`cm-selectionBackground`,i))t.push(n);if(z.ios&&!n.empty&&e.state.facet(Np).iosSelectionHandles){for(let r of wp.forRange(e,`cm-selectionHandle cm-selectionHandle-start`,P.cursor(n.from,1)))t.push(r);for(let r of wp.forRange(e,`cm-selectionHandle cm-selectionHandle-end`,P.cursor(n.to,1)))t.push(r)}return t},update(e,t){return e.docChanged||e.selectionSet||e.viewportChanged||Fp(e)},class:`cm-selectionLayer`}),zp=z.gecko&&z.gecko_version==153?`#ffffff01`:`transparent`,Bp=Qo.highest(G.theme({".cm-line":{...Mp?{"& ::selection, &::selection":{backgroundColor:`${zp} !important`}}:{},caretColor:`transparent !important`},".cm-content":{caretColor:`transparent !important`,"& :focus":{caretColor:`initial !important`,...Mp?{"&::selection, & ::selection":{backgroundColor:`Highlight !important`}}:{}}}}));/x/.unicode;function Vp(){return Up}var Hp=B.line({class:`cm-activeLine`}),Up=$l.fromClass(class{constructor(e){this.decorations=this.getDeco(e)}update(e){(e.docChanged||e.selectionSet)&&(this.decorations=this.getDeco(e.view))}getDeco(e){let t=-1,n=[];for(let r of e.state.selection.ranges){let i=e.lineBlockAt(r.head);i.from>t&&(n.push(Hp.range(i.from)),t=i.from)}return B.set(n)}},{decorations:e=>e.decorations}),Wp=class extends js{compare(e){return this==e||this.constructor==e.constructor&&this.eq(e)}eq(e){return!1}destroy(e){}};Wp.prototype.elementClass=``,Wp.prototype.toDOM=void 0,Wp.prototype.mapMode=jo.TrackBefore,Wp.prototype.startSide=Wp.prototype.endSide=-1,Wp.prototype.point=!0;var Gp=F.define(),Kp=F.define(),qp={class:``,renderEmptyElements:!1,elementStyle:``,markers:()=>R.empty,lineMarker:()=>null,widgetMarker:()=>null,lineMarkerChange:null,initialSpacer:null,updateSpacer:null,domEventHandlers:{},side:`before`},Jp=F.define();function Yp(e){return[Zp(),Jp.of({...qp,...e})]}var Xp=F.define({combine:e=>e.some(e=>e)});function Zp(e){let t=[Qp];return e&&e.fixed===!1&&t.push(Xp.of(!0)),t}var Qp=$l.fromClass(class{constructor(e){this.view=e,this.domAfter=null,this.prevViewport=e.viewport,this.dom=document.createElement(`div`),this.dom.className=`cm-gutters cm-gutters-before`,this.dom.setAttribute(`aria-hidden`,`true`),this.dom.style.minHeight=this.view.contentHeight/this.view.scaleY+`px`,this.gutters=e.state.facet(Jp).map(t=>new nm(e,t)),this.fixed=!e.state.facet(Xp);for(let e of this.gutters)e.config.side==`after`?this.getDOMAfter().appendChild(e.dom):this.dom.appendChild(e.dom);this.fixed&&(this.dom.style.position=`sticky`),this.syncGutters(!1),e.scrollDOM.insertBefore(this.dom,e.contentDOM)}getDOMAfter(){return this.domAfter||(this.domAfter=document.createElement(`div`),this.domAfter.className=`cm-gutters cm-gutters-after`,this.domAfter.setAttribute(`aria-hidden`,`true`),this.domAfter.style.minHeight=this.view.contentHeight/this.view.scaleY+`px`,this.domAfter.style.position=this.fixed?`sticky`:``,this.view.scrollDOM.appendChild(this.domAfter)),this.domAfter}update(e){if(this.updateGutters(e)){let t=this.prevViewport,n=e.view.viewport,r=Math.min(t.to,n.to)-Math.max(t.from,n.from);this.syncGutters(r<(n.to-n.from)*.8)}if(e.geometryChanged){let e=this.view.contentHeight/this.view.scaleY+`px`;this.dom.style.minHeight=e,this.domAfter&&(this.domAfter.style.minHeight=e)}this.view.state.facet(Xp)!=!this.fixed&&(this.fixed=!this.fixed,this.dom.style.position=this.fixed?`sticky`:``,this.domAfter&&(this.domAfter.style.position=this.fixed?`sticky`:``)),this.prevViewport=e.view.viewport}syncGutters(e){let t=this.dom.nextSibling;e&&(this.dom.remove(),this.domAfter&&this.domAfter.remove());let n=R.iter(this.view.state.facet(Gp),this.view.viewport.from),r=[],i=this.gutters.map(e=>new tm(e,this.view.viewport,-this.view.documentPadding.top));for(let e of this.view.viewportLineBlocks)if(r.length&&(r=[]),Array.isArray(e.type)){let t=!0;for(let a of e.type)if(a.type==kc.Text&&t){em(n,r,a.from);for(let e of i)e.line(this.view,a,r);t=!1}else if(a.widget)for(let e of i)e.widget(this.view,a)}else if(e.type==kc.Text){em(n,r,e.from);for(let t of i)t.line(this.view,e,r)}else if(e.widget)for(let t of i)t.widget(this.view,e);for(let e of i)e.finish();e&&(this.view.scrollDOM.insertBefore(this.dom,t),this.domAfter&&this.view.scrollDOM.appendChild(this.domAfter))}updateGutters(e){let t=e.startState.facet(Jp),n=e.state.facet(Jp),r=e.docChanged||e.heightChanged||e.viewportChanged||!R.eq(e.startState.facet(Gp),e.state.facet(Gp),e.view.viewport.from,e.view.viewport.to);if(t==n)for(let t of this.gutters)t.update(e)&&(r=!0);else{r=!0;let i=[];for(let r of n){let n=t.indexOf(r);n<0?i.push(new nm(this.view,r)):(this.gutters[n].update(e),i.push(this.gutters[n]))}for(let e of this.gutters)e.dom.remove(),i.indexOf(e)<0&&e.destroy();for(let e of i)e.config.side==`after`?this.getDOMAfter().appendChild(e.dom):this.dom.appendChild(e.dom);this.gutters=i}return r}destroy(){for(let e of this.gutters)e.destroy();this.dom.remove(),this.domAfter&&this.domAfter.remove()}},{provide:e=>G.scrollMargins.of(t=>{let n=t.plugin(e);if(!n||n.gutters.length==0||!n.fixed)return null;let r=n.dom.offsetWidth*t.scaleX,i=n.domAfter?n.domAfter.offsetWidth*t.scaleX:0;return t.textDirection==V.LTR?{left:r,right:i}:{right:r,left:i}})});function $p(e){return Array.isArray(e)?e:[e]}function em(e,t,n){for(;e.value&&e.from<=n;)e.from==n&&t.push(e.value),e.next()}var tm=class{constructor(e,t,n){this.gutter=e,this.height=n,this.i=0,this.cursor=R.iter(e.markers,t.from)}addElement(e,t,n){let{gutter:r}=this,i=(t.top-this.height)/e.scaleY,a=t.height/e.scaleY;if(this.i==r.elements.length){let t=new rm(e,a,i,n);r.elements.push(t),r.dom.appendChild(t.dom)}else r.elements[this.i].update(e,a,i,n);this.height=t.bottom,this.i++}line(e,t,n){let r=[];em(this.cursor,r,t.from),n.length&&(r=r.concat(n));let i=this.gutter.config.lineMarker(e,t,r);i&&r.unshift(i);let a=this.gutter;(r.length!=0||a.config.renderEmptyElements)&&this.addElement(e,t,r)}widget(e,t){let n=this.gutter.config.widgetMarker(e,t.widget,t),r=n?[n]:null;for(let n of e.state.facet(Kp)){let i=n(e,t.widget,t);i&&(r||=[]).push(i)}r&&this.addElement(e,t,r)}finish(){let e=this.gutter;for(;e.elements.length>this.i;){let t=e.elements.pop();e.dom.removeChild(t.dom),t.destroy()}}},nm=class{constructor(e,t){this.view=e,this.config=t,this.elements=[],this.spacer=null,this.dom=document.createElement(`div`),this.dom.className=`cm-gutter`+(this.config.class?` `+this.config.class:``);for(let n in t.domEventHandlers)this.dom.addEventListener(n,r=>{let i=r.target,a;if(i!=this.dom&&this.dom.contains(i)){for(;i.parentNode!=this.dom;)i=i.parentNode;let e=i.getBoundingClientRect();a=(e.top+e.bottom)/2}else a=r.clientY;let o=e.lineBlockAtHeight(a-e.documentTop);t.domEventHandlers[n](e,o,r)&&r.preventDefault()});this.markers=$p(t.markers(e)),t.initialSpacer&&(this.spacer=new rm(e,0,0,[t.initialSpacer(e)]),this.dom.appendChild(this.spacer.dom),this.spacer.dom.style.cssText+=`visibility: hidden; pointer-events: none`)}update(e){let t=this.markers;if(this.markers=$p(this.config.markers(e.view)),this.spacer&&this.config.updateSpacer){let t=this.config.updateSpacer(this.spacer.markers[0],e);t!=this.spacer.markers[0]&&this.spacer.update(e.view,0,0,[t])}let n=e.view.viewport;return!R.eq(this.markers,t,n.from,n.to)||(this.config.lineMarkerChange?this.config.lineMarkerChange(e):!1)}destroy(){for(let e of this.elements)e.destroy()}},rm=class{constructor(e,t,n,r){this.height=-1,this.above=0,this.markers=[],this.dom=document.createElement(`div`),this.dom.className=`cm-gutterElement`,this.update(e,t,n,r)}update(e,t,n,r){this.height!=t&&(this.height=t,this.dom.style.height=t+`px`),this.above!=n&&(this.dom.style.marginTop=(this.above=n)?n+`px`:``),im(this.markers,r)||this.setMarkers(e,r)}setMarkers(e,t){let n=`cm-gutterElement`,r=this.dom.firstChild;for(let i=0,a=0;;){let o=a,s=i<t.length?t[i++]:null,c=!1;if(s){let e=s.elementClass;e&&(n+=` `+e);for(let e=a;e<this.markers.length;e++)if(this.markers[e].compare(s)){o=e,c=!0;break}}else o=this.markers.length;for(;a<o;){let e=this.markers[a++];if(e.toDOM){e.destroy(r);let t=r.nextSibling;r.remove(),r=t}}if(!s)break;s.toDOM&&(c?r=r.nextSibling:this.dom.insertBefore(s.toDOM(e),r)),c&&a++}this.dom.className=n,this.markers=t}destroy(){this.setMarkers(null,[])}};function im(e,t){if(e.length!=t.length)return!1;for(let n=0;n<e.length;n++)if(!e[n].compare(t[n]))return!1;return!0}var am=F.define(),om=F.define(),sm=F.define({combine(e){return As(e,{formatNumber:String,domEventHandlers:{}},{domEventHandlers(e,t){let n=Object.assign({},e);for(let e in t){let r=n[e],i=t[e];n[e]=r?(e,t,n)=>r(e,t,n)||i(e,t,n):i}return n}})}}),cm=class extends Wp{constructor(e){super(),this.number=e}eq(e){return this.number==e.number}toDOM(){return document.createTextNode(this.number)}};function lm(e,t){return e.state.facet(sm).formatNumber(t,e.state)}var um=Jp.compute([sm],e=>({class:`cm-lineNumbers`,renderEmptyElements:!1,markers(e){return e.state.facet(am)},lineMarker(e,t,n){return n.some(e=>e.toDOM)?null:new cm(lm(e,e.state.doc.lineAt(t.from).number))},widgetMarker:(e,t,n)=>{for(let r of e.state.facet(om)){let i=r(e,t,n);if(i)return i}return null},lineMarkerChange:e=>e.startState.facet(sm)!=e.state.facet(sm),initialSpacer(e){return new cm(lm(e,fm(e.state.doc.lines)))},updateSpacer(e,t){let n=lm(t.view,fm(t.view.state.doc.lines));return n==e.number?e:new cm(n)},domEventHandlers:e.facet(sm).domEventHandlers,side:`before`}));function dm(e={}){return[sm.of(e),Zp(),um]}function fm(e){let t=9;for(;t<e;)t=t*10+9;return t}var pm=new class extends Wp{constructor(){super(...arguments),this.elementClass=`cm-activeLineGutter`}},mm=Gp.compute([`selection`],e=>{let t=[],n=-1;for(let r of e.selection.ranges){let i=e.doc.lineAt(r.head).from;i>n&&(n=i,t.push(pm.range(i)))}return R.of(t)});function hm(){return mm}var gm=1024,_m=0,vm=class{constructor(e,t){this.from=e,this.to=t}},K=class{constructor(e={}){this.id=_m++,this.perNode=!!e.perNode,this.deserialize=e.deserialize||(()=>{throw Error(`This node type doesn't define a deserialize function`)}),this.combine=e.combine||null}add(e){if(this.perNode)throw RangeError(`Can't add per-node props to node types`);return typeof e!=`function`&&(e=xm.match(e)),t=>{let n=e(t);return n===void 0?null:[this,n]}}};K.closedBy=new K({deserialize:e=>e.split(` `)}),K.openedBy=new K({deserialize:e=>e.split(` `)}),K.group=new K({deserialize:e=>e.split(` `)}),K.isolate=new K({deserialize:e=>{if(e&&e!=`rtl`&&e!=`ltr`&&e!=`auto`)throw RangeError(`Invalid value for isolate: `+e);return e||`auto`}}),K.contextHash=new K({perNode:!0}),K.lookAhead=new K({perNode:!0}),K.mounted=new K({perNode:!0});var ym=class{constructor(e,t,n,r=!1){this.tree=e,this.overlay=t,this.parser=n,this.bracketed=r}static get(e){return e&&e.props&&e.props[K.mounted.id]}},bm=Object.create(null),xm=class e{constructor(e,t,n,r=0){this.name=e,this.props=t,this.id=n,this.flags=r}static define(t){let n=t.props&&t.props.length?Object.create(null):bm,r=+!!t.top|(t.skipped?2:0)|(t.error?4:0)|(t.name==null?8:0),i=new e(t.name||``,n,t.id,r);if(t.props){for(let e of t.props)if(Array.isArray(e)||(e=e(i)),e){if(e[0].perNode)throw RangeError(`Can't store a per-node prop on a node type`);n[e[0].id]=e[1]}}return i}prop(e){return this.props[e.id]}get isTop(){return(this.flags&1)>0}get isSkipped(){return(this.flags&2)>0}get isError(){return(this.flags&4)>0}get isAnonymous(){return(this.flags&8)>0}is(e){if(typeof e==`string`){if(this.name==e)return!0;let t=this.prop(K.group);return t?t.indexOf(e)>-1:!1}return this.id==e}static match(e){let t=Object.create(null);for(let n in e)for(let r of n.split(` `))t[r]=e[n];return e=>{for(let n=e.prop(K.group),r=-1;r<(n?n.length:0);r++){let i=t[r<0?e.name:n[r]];if(i)return i}}}};xm.none=new xm(``,Object.create(null),0,8);var Sm=new WeakMap,Cm=new WeakMap,q;(function(e){e[e.ExcludeBuffers=1]=`ExcludeBuffers`,e[e.IncludeAnonymous=2]=`IncludeAnonymous`,e[e.IgnoreMounts=4]=`IgnoreMounts`,e[e.IgnoreOverlays=8]=`IgnoreOverlays`,e[e.EnterBracketed=16]=`EnterBracketed`})(q||={});var wm=class e{constructor(e,t,n,r,i){if(this.type=e,this.children=t,this.positions=n,this.length=r,this.props=null,i&&i.length){this.props=Object.create(null);for(let[e,t]of i)this.props[typeof e==`number`?e:e.id]=t}}toString(){let e=ym.get(this);if(e&&!e.overlay)return e.tree.toString();let t=``;for(let e of this.children){let n=e.toString();n&&(t&&(t+=`,`),t+=n)}return this.type.name?(/\W/.test(this.type.name)&&!this.type.isError?JSON.stringify(this.type.name):this.type.name)+(t.length?`(`+t+`)`:``):t}cursor(e=0){return new Rm(this.topNode,e)}cursorAt(e,t=0,n=0){let r=new Rm(Sm.get(this)||this.topNode);return r.moveTo(e,t),Sm.set(this,r._tree),r}get topNode(){return new Am(this,0,0,null)}resolve(e,t=0){let n=Om(Sm.get(this)||this.topNode,e,t,!1);return Sm.set(this,n),n}resolveInner(e,t=0){let n=Om(Cm.get(this)||this.topNode,e,t,!0);return Cm.set(this,n),n}resolveStack(e,t=0){return Lm(this,e,t)}iterate(e){let{enter:t,leave:n,from:r=0,to:i=this.length}=e,a=e.mode||0,o=(a&q.IncludeAnonymous)>0;for(let e=this.cursor(a|q.IncludeAnonymous);;){let a=!1;if(e.from<=i&&e.to>=r&&(!o&&e.type.isAnonymous||t(e)!==!1)){if(e.firstChild())continue;a=!0}for(;a&&n&&(o||!e.type.isAnonymous)&&n(e),!e.nextSibling();){if(!e.parent())return;a=!0}}}prop(e){return e.perNode?this.props?this.props[e.id]:void 0:this.type.prop(e)}get propValues(){let e=[];if(this.props)for(let t in this.props)e.push([+t,this.props[t]]);return e}balance(t={}){return this.children.length<=8?this:Um(xm.none,this.children,this.positions,0,this.children.length,0,this.length,(t,n,r)=>new e(this.type,t,n,r,this.propValues),t.makeTree||((t,n,r)=>new e(xm.none,t,n,r)))}static build(e){return Bm(e)}};wm.empty=new wm(xm.none,[],[],0);var Tm=class e{constructor(e,t){this.buffer=e,this.index=t}get id(){return this.buffer[this.index-4]}get start(){return this.buffer[this.index-3]}get end(){return this.buffer[this.index-2]}get size(){return this.buffer[this.index-1]}get pos(){return this.index}next(){this.index-=4}fork(){return new e(this.buffer,this.index)}},Em=class e{constructor(e,t,n){this.buffer=e,this.length=t,this.set=n}get type(){return xm.none}toString(){let e=[];for(let t=0;t<this.buffer.length;)e.push(this.childString(t)),t=this.buffer[t+3];return e.join(`,`)}childString(e){let t=this.buffer[e],n=this.buffer[e+3],r=this.set.types[t],i=r.name;if(/\W/.test(i)&&!r.isError&&(i=JSON.stringify(i)),e+=4,n==e)return i;let a=[];for(;e<n;)a.push(this.childString(e)),e=this.buffer[e+3];return i+`(`+a.join(`,`)+`)`}findChild(e,t,n,r,i){let{buffer:a}=this,o=-1;for(let s=e;s!=t&&!(Dm(i,r,a[s+1],a[s+2])&&(o=s,n>0));s=a[s+3]);return o}slice(t,n,r){let i=this.buffer,a=new Uint16Array(n-t),o=0;for(let e=t,s=0;e<n;){a[s++]=i[e++],a[s++]=i[e++]-r;let n=a[s++]=i[e++]-r;a[s++]=i[e++]-t,o=Math.max(o,n)}return new e(a,o,this.set)}};function Dm(e,t,n,r){switch(e){case-2:return n<t;case-1:return r>=t&&n<t;case 0:return n<t&&r>t;case 1:return n<=t&&r>t;case 2:return r>t;case 4:return!0}}function Om(e,t,n,r){for(;e.from==e.to||(n<1?e.from>=t:e.from>t)||(n>-1?e.to<=t:e.to<t);){let t=!r&&e instanceof Am&&e.index<0?null:e.parent;if(!t)return e;e=t}let i=r?0:q.IgnoreOverlays;if(r)for(let r=e,a=r.parent;a;r=a,a=r.parent)r instanceof Am&&r.index<0&&a.enter(t,n,i)?.from!=r.from&&(e=a);for(;;){let r=e.enter(t,n,i);if(!r)return e;e=r}}var km=class{cursor(e=0){return new Rm(this,e)}getChild(e,t=null,n=null){let r=jm(this,e,t,n);return r.length?r[0]:null}getChildren(e,t=null,n=null){return jm(this,e,t,n)}resolve(e,t=0){return Om(this,e,t,!1)}resolveInner(e,t=0){return Om(this,e,t,!0)}matchContext(e){return Mm(this.parent,e)}enterUnfinishedNodesBefore(e){let t=this.childBefore(e),n=this;for(;t;){let e=t.lastChild;if(!e||e.to!=t.to)break;e.type.isError&&e.from==e.to?(n=t,t=e.prevSibling):t=e}return n}get node(){return this}get next(){return this.parent}},Am=class e extends km{constructor(e,t,n,r){super(),this._tree=e,this.from=t,this.index=n,this._parent=r}get type(){return this._tree.type}get name(){return this._tree.type.name}get to(){return this.from+this._tree.length}nextChild(t,n,r,i,a=0){for(let o=this;;){for(let{children:s,positions:c}=o._tree,l=n>0?s.length:-1;t!=l;t+=n){let l=s[t],u=c[t]+o.from,d;if(a&q.EnterBracketed&&l instanceof wm&&(d=ym.get(l))&&!d.overlay&&d.bracketed&&r>=u&&r<=u+l.length||Dm(i,r,u,u+l.length)){if(l instanceof Em){if(a&q.ExcludeBuffers)continue;let e=l.findChild(0,l.buffer.length,n,r-u,i);if(e>-1)return new Pm(new Nm(o,l,t,u),null,e)}else if(a&q.IncludeAnonymous||!l.type.isAnonymous||zm(l)){let s;if(!(a&q.IgnoreMounts)&&(s=ym.get(l))&&!s.overlay)return new e(s.tree,u,t,o);let c=new e(l,u,t,o);return a&q.IncludeAnonymous||!c.type.isAnonymous?c:c.nextChild(n<0?l.children.length-1:0,n,r,i,a)}}}if(a&q.IncludeAnonymous||!o.type.isAnonymous||(t=o.index>=0?o.index+n:n<0?-1:o._parent._tree.children.length,o=o._parent,!o))return null}}get firstChild(){return this.nextChild(0,1,0,4)}get lastChild(){return this.nextChild(this._tree.children.length-1,-1,0,4)}childAfter(e){return this.nextChild(0,1,e,2)}childBefore(e){return this.nextChild(this._tree.children.length-1,-1,e,-2)}prop(e){return this._tree.prop(e)}enter(t,n,r=0){let i;if(!(r&q.IgnoreOverlays)&&(i=ym.get(this._tree))&&i.overlay){let a=t-this.from,o=r&q.EnterBracketed&&i.bracketed;for(let{from:t,to:r}of i.overlay)if((n>0||o?t<=a:t<a)&&(n<0||o?r>=a:r>a))return new e(i.tree,i.overlay[0].from+this.from,-1,this)}return this.nextChild(0,1,t,n,r)}nextSignificantParent(){let e=this;for(;e.type.isAnonymous&&e._parent;)e=e._parent;return e}get parent(){return this._parent?this._parent.nextSignificantParent():null}get nextSibling(){return this._parent&&this.index>=0?this._parent.nextChild(this.index+1,1,0,4):null}get prevSibling(){return this._parent&&this.index>=0?this._parent.nextChild(this.index-1,-1,0,4):null}get tree(){return this._tree}toTree(){return this._tree}toString(){return this._tree.toString()}};function jm(e,t,n,r){let i=e.cursor(),a=[];if(!i.firstChild())return a;if(n!=null){for(let e=!1;!e;)if(e=i.type.is(n),!i.nextSibling())return a}for(;;){if(r!=null&&i.type.is(r))return a;if(i.type.is(t)&&a.push(i.node),!i.nextSibling())return r==null?a:[]}}function Mm(e,t,n=t.length-1){for(let r=e;n>=0;r=r.parent){if(!r)return!1;if(!r.type.isAnonymous){if(t[n]&&t[n]!=r.name)return!1;n--}}return!0}var Nm=class{constructor(e,t,n,r){this.parent=e,this.buffer=t,this.index=n,this.start=r}},Pm=class e extends km{get name(){return this.type.name}get from(){return this.context.start+this.context.buffer.buffer[this.index+1]}get to(){return this.context.start+this.context.buffer.buffer[this.index+2]}constructor(e,t,n){super(),this.context=e,this._parent=t,this.index=n,this.type=e.buffer.set.types[e.buffer.buffer[n]]}child(t,n,r){let{buffer:i}=this.context,a=i.findChild(this.index+4,i.buffer[this.index+3],t,n-this.context.start,r);return a<0?null:new e(this.context,this,a)}get firstChild(){return this.child(1,0,4)}get lastChild(){return this.child(-1,0,4)}childAfter(e){return this.child(1,e,2)}childBefore(e){return this.child(-1,e,-2)}prop(e){return this.type.prop(e)}enter(t,n,r=0){if(r&q.ExcludeBuffers)return null;let{buffer:i}=this.context,a=i.findChild(this.index+4,i.buffer[this.index+3],n>0?1:-1,t-this.context.start,n);return a<0?null:new e(this.context,this,a)}get parent(){return this._parent||this.context.parent.nextSignificantParent()}externalSibling(e){return this._parent?null:this.context.parent.nextChild(this.context.index+e,e,0,4)}get nextSibling(){let{buffer:t}=this.context,n=t.buffer[this.index+3];return n<(this._parent?t.buffer[this._parent.index+3]:t.buffer.length)?new e(this.context,this._parent,n):this.externalSibling(1)}get prevSibling(){let{buffer:t}=this.context,n=this._parent?this._parent.index+4:0;return this.index==n?this.externalSibling(-1):new e(this.context,this._parent,t.findChild(n,this.index,-1,0,4))}get tree(){return null}toTree(){let e=[],t=[],{buffer:n}=this.context,r=this.index+4,i=n.buffer[this.index+3];if(i>r){let a=n.buffer[this.index+1];e.push(n.slice(r,i,a)),t.push(0)}return new wm(this.type,e,t,this.to-this.from)}toString(){return this.context.buffer.childString(this.index)}};function Fm(e){if(!e.length)return null;let t=0,n=e[0];for(let r=1;r<e.length;r++){let i=e[r];(i.from>n.from||i.to<n.to)&&(n=i,t=r)}let r=n instanceof Am&&n.index<0?null:n.parent,i=e.slice();return r?i[t]=r:i.splice(t,1),new Im(i,n)}var Im=class{constructor(e,t){this.heads=e,this.node=t}get next(){return Fm(this.heads)}};function Lm(e,t,n){let r=e.resolveInner(t,n),i=null;for(let e=r instanceof Am?r:r.context.parent;e;e=e.parent)if(e.index<0){let a=e.parent;(i||=[r]).push(a.resolve(t,n)),e=a}else{let a=ym.get(e.tree);if(a&&a.overlay&&a.overlay[0].from<=t&&a.overlay[a.overlay.length-1].to>=t){let o=new Am(a.tree,a.overlay[0].from+e.from,-1,e);(i||=[r]).push(Om(o,t,n,!1))}}return i?Fm(i):r}var Rm=class{get name(){return this.type.name}constructor(e,t=0){if(this.buffer=null,this.stack=[],this.index=0,this.bufferNode=null,this.mode=t&~q.EnterBracketed,e instanceof Am)this.yieldNode(e);else{this._tree=e.context.parent,this.buffer=e.context;for(let t=e._parent;t;t=t._parent)this.stack.unshift(t.index);this.bufferNode=e,this.yieldBuf(e.index)}}yieldNode(e){return e?(this._tree=e,this.type=e.type,this.from=e.from,this.to=e.to,!0):!1}yieldBuf(e,t){this.index=e;let{start:n,buffer:r}=this.buffer;return this.type=t||r.set.types[r.buffer[e]],this.from=n+r.buffer[e+1],this.to=n+r.buffer[e+2],!0}yield(e){return e?e instanceof Am?(this.buffer=null,this.yieldNode(e)):(this.buffer=e.context,this.yieldBuf(e.index,e.type)):!1}toString(){return this.buffer?this.buffer.buffer.childString(this.index):this._tree.toString()}enterChild(e,t,n){if(!this.buffer)return this.yield(this._tree.nextChild(e<0?this._tree._tree.children.length-1:0,e,t,n,this.mode));let{buffer:r}=this.buffer,i=r.findChild(this.index+4,r.buffer[this.index+3],e,t-this.buffer.start,n);return i<0?!1:(this.stack.push(this.index),this.yieldBuf(i))}firstChild(){return this.enterChild(1,0,4)}lastChild(){return this.enterChild(-1,0,4)}childAfter(e){return this.enterChild(1,e,2)}childBefore(e){return this.enterChild(-1,e,-2)}enter(e,t,n=this.mode){return this.buffer?n&q.ExcludeBuffers?!1:this.enterChild(1,e,t):this.yield(this._tree.enter(e,t,n))}parent(){if(!this.buffer)return this.yieldNode(this.mode&q.IncludeAnonymous?this._tree._parent:this._tree.parent);if(this.stack.length)return this.yieldBuf(this.stack.pop());let e=this.mode&q.IncludeAnonymous?this.buffer.parent:this.buffer.parent.nextSignificantParent();return this.buffer=null,this.yieldNode(e)}sibling(e){if(!this.buffer)return this._tree._parent?this.yield(this._tree.index<0?null:this._tree._parent.nextChild(this._tree.index+e,e,0,4,this.mode)):!1;let{buffer:t}=this.buffer,n=this.stack.length-1;if(e<0){let e=n<0?0:this.stack[n]+4;if(this.index!=e)return this.yieldBuf(t.findChild(e,this.index,-1,0,4))}else{let e=t.buffer[this.index+3];if(e<(n<0?t.buffer.length:t.buffer[this.stack[n]+3]))return this.yieldBuf(e)}return n<0&&this.yield(this.buffer.parent.nextChild(this.buffer.index+e,e,0,4,this.mode))}nextSibling(){return this.sibling(1)}prevSibling(){return this.sibling(-1)}atLastNode(e){let t,n,{buffer:r}=this;if(r){if(e>0){if(this.index<r.buffer.buffer.length)return!1}else for(let e=0;e<this.index;e++)if(r.buffer.buffer[e+3]<this.index)return!1;({index:t,parent:n}=r)}else({index:t,_parent:n}=this._tree);for(;n;{index:t,_parent:n}=n)if(t>-1)for(let r=t+e,i=e<0?-1:n._tree.children.length;r!=i;r+=e){let e=n._tree.children[r];if(this.mode&q.IncludeAnonymous||e instanceof Em||!e.type.isAnonymous||zm(e))return!1}return!0}move(e,t){if(t&&this.enterChild(e,0,4))return!0;for(;;){if(this.sibling(e))return!0;if(this.atLastNode(e)||!this.parent())return!1}}next(e=!0){return this.move(1,e)}prev(e=!0){return this.move(-1,e)}moveTo(e,t=0){for(;(this.from==this.to||(t<1?this.from>=e:this.from>e)||(t>-1?this.to<=e:this.to<e))&&this.parent(););for(;this.enterChild(1,e,t););return this}get node(){if(!this.buffer)return this._tree;let e=this.bufferNode,t=null,n=0;if(e&&e.context==this.buffer)scan:for(let r=this.index,i=this.stack.length;i>=0;){for(let a=e;a;a=a._parent)if(a.index==r){if(r==this.index)return a;t=a,n=i+1;break scan}r=this.stack[--i]}for(let e=n;e<this.stack.length;e++)t=new Pm(this.buffer,t,this.stack[e]);return this.bufferNode=new Pm(this.buffer,t,this.index)}get tree(){return this.buffer?null:this._tree._tree}iterate(e,t){for(let n=0;;){let r=!1;if(this.type.isAnonymous||e(this)!==!1){if(this.firstChild()){n++;continue}this.type.isAnonymous||(r=!0)}for(;;){if(r&&t&&t(this),r=this.type.isAnonymous,!n)return;if(this.nextSibling())break;this.parent(),n--,r=!0}}}matchContext(e){if(!this.buffer)return Mm(this.node.parent,e);let{buffer:t}=this.buffer,{types:n}=t.set;for(let r=e.length-1,i=this.stack.length-1;r>=0;i--){if(i<0)return Mm(this._tree,e,r);let a=n[t.buffer[this.stack[i]]];if(!a.isAnonymous){if(e[r]&&e[r]!=a.name)return!1;r--}}return!0}};function zm(e){return e.children.some(e=>e instanceof Em||!e.type.isAnonymous||zm(e))}function Bm(e){let{buffer:t,nodeSet:n,maxBufferLength:r=gm,reused:i=[],minRepeatType:a=n.types.length}=e,o=Array.isArray(t)?new Tm(t,t.length):t,s=n.types,c=0,l=0;function u(e,t,_,v,y,ee){let{id:te,start:ne,end:b,size:x}=o,S=l,re=c;if(x<0){if(o.next(),x==-1){let t=i[te];_.push(t),v.push(ne-e);return}if(x==-3){c=te;return}if(x==-4){l=te;return}throw RangeError(`Unrecognized record size: ${x}`)}let ie=s[te],C,w,ae=ne-e;if(b-ne<=r&&(w=h(o.pos-t,y))){let t=new Uint16Array(w.size-w.skip),r=o.pos-w.size,i=t.length;for(;o.pos>r;)i=g(w.start,t,i);C=new Em(t,b-w.start,n),ae=w.start-e}else{let e=o.pos-x;o.next();let t=[],n=[],i=te>=a?te:-1,s=0,c=b,h=S;for(;o.pos>e;)i>=0&&o.id==i&&o.size>=0?(o.end<=c-r&&(p(t,n,ne,s,o.end,c,i,h,re),s=t.length,c=o.end,h=l),o.next()):ee>2500?d(ne,e,t,n):u(ne,e,t,n,i,ee+1);if(i>=0&&s>0&&s<t.length&&p(t,n,ne,s,ne,c,i,h,re),t.reverse(),n.reverse(),i>-1&&s>0){let e=f(ie,re);C=Um(ie,t,n,0,t.length,0,b-ne,e,e)}else C=m(ie,t,n,b-ne,S-b,re)}_.push(C),v.push(ae)}function d(e,t,i,a){let s=[],c=0,l=-1;for(;o.pos>t;){let{id:e,start:t,end:n,size:i}=o;if(i>4)o.next();else if(l>-1&&t<l)break;else l<0&&(l=n-r),s.push(e,t,n),c++,o.next()}if(c){let t=new Uint16Array(c*4),r=s[s.length-2];for(let e=s.length-3,n=0;e>=0;e-=3)t[n++]=s[e],t[n++]=s[e+1]-r,t[n++]=s[e+2]-r,t[n++]=n;i.push(new Em(t,s[2]-r,n)),a.push(r-e)}}function f(e,t){return(n,r,i)=>{let a=0,o=n.length-1,s,c;if(o>=0&&(s=n[o])instanceof wm){if(!o&&s.type==e&&s.length==i)return s;(c=s.prop(K.lookAhead))&&(a=r[o]+s.length+c-i)}return m(e,n,r,i,a,t)}}function p(e,t,r,i,a,o,s,c,l){let u=[],d=[];for(;e.length>i;)u.push(e.pop()),d.push(t.pop()+r-a);e.push(m(n.types[s],u,d,o-a,c-o,l)),t.push(a-r)}function m(e,t,n,r,i,a,o){if(a){let e=[K.contextHash,a];o=o?[e].concat(o):[e]}if(i>25){let e=[K.lookAhead,i];o=o?[e].concat(o):[e]}return new wm(e,t,n,r,o)}function h(e,t){let n=o.fork(),i=0,s=0,c=0,l=n.end-r,u={size:0,start:0,skip:0};scan:for(let r=n.pos-e;n.pos>r;){let e=n.size;if(n.id==t&&e>=0){u.size=i,u.start=s,u.skip=c,c+=4,i+=4,n.next();continue}let o=n.pos-e;if(e<0||o<r||n.start<l)break;let d=n.id>=a?4:0,f=n.start;for(n.next();n.pos>o;){if(n.size<0){if(n.size==-3||n.size==-4)d+=4;else break scan}else n.id>=a&&(d+=4);n.next()}s=f,i+=e,c+=d}return(t<0||i==e)&&(u.size=i,u.start=s,u.skip=c),u.size>4?u:void 0}function g(e,t,n){let{id:r,start:i,end:s,size:u}=o;if(o.next(),u>=0&&r<a){let a=n;if(u>4){let r=o.pos-(u-4);for(;o.pos>r;)n=g(e,t,n)}t[--n]=a,t[--n]=s-e,t[--n]=i-e,t[--n]=r}else u==-3?c=r:u==-4&&(l=r);return n}let _=[],v=[];for(;o.pos>0;)u(e.start||0,e.bufferStart||0,_,v,-1,0);let y=e.length??(_.length?v[0]+_[0].length:0);return new wm(s[e.topID],_.reverse(),v.reverse(),y)}var Vm=new WeakMap;function Hm(e,t){if(!e.isAnonymous||t instanceof Em||t.type!=e)return 1;let n=Vm.get(t);if(n==null){n=1;for(let r of t.children){if(r.type!=e||!(r instanceof wm)){n=1;break}n+=Hm(e,r)}Vm.set(t,n)}return n}function Um(e,t,n,r,i,a,o,s,c){let l=0;for(let n=r;n<i;n++)l+=Hm(e,t[n]);let u=Math.ceil(l*1.5/8),d=[],f=[];function p(t,n,r,i,o){for(let s=r;s<i;){let r=s,l=n[s],m=Hm(e,t[s]);for(s++;s<i;s++){let n=Hm(e,t[s]);if(m+n>=u)break;m+=n}if(s==r+1){if(m>u){let e=t[r];p(e.children,e.positions,0,e.children.length,n[r]+o);continue}d.push(t[r])}else{let i=n[s-1]+t[s-1].length-l;d.push(Um(e,t,n,r,s,l,i,null,c))}f.push(l+o-a)}}return p(t,n,r,i,0),(s||c)(d,f,o)}var Wm=class e{constructor(e,t,n,r,i=!1,a=!1){this.from=e,this.to=t,this.tree=n,this.offset=r,this.open=!!i|(a?2:0)}get openStart(){return(this.open&1)>0}get openEnd(){return(this.open&2)>0}static addTree(t,n=[],r=!1){let i=[new e(0,t.length,t,0,!1,r)];for(let e of n)e.to>t.length&&i.push(e);return i}static applyChanges(t,n,r=128){if(!n.length)return t;let i=[],a=1,o=t.length?t[0]:null;for(let s=0,c=0,l=0;;s++){let u=s<n.length?n[s]:null,d=u?u.fromA:1e9;if(d-c>=r)for(;o&&o.from<d;){let n=o;if(c>=n.from||d<=n.to||l){let t=Math.max(n.from,c)-l,r=Math.min(n.to,d)-l;n=t>=r?null:new e(t,r,n.tree,n.offset+l,s>0,!!u)}if(n&&i.push(n),o.to>d)break;o=a<t.length?t[a++]:null}if(!u)break;c=u.toA,l=u.toA-u.toB}return i}},Gm=class{startParse(e,t,n){return typeof e==`string`&&(e=new Km(e)),n=n?n.length?n.map(e=>new vm(e.from,e.to)):[new vm(0,0)]:[new vm(0,e.length)],this.createParse(e,t||[],n)}parse(e,t,n){let r=this.startParse(e,t,n);for(;;){let e=r.advance();if(e)return e}}},Km=class{constructor(e){this.string=e}get length(){return this.string.length}chunk(e){return this.string.slice(e)}get lineChunks(){return!1}read(e,t){return this.string.slice(e,t)}};new K({perNode:!0});var qm=0,Jm=class e{constructor(e,t,n,r){this.name=e,this.set=t,this.base=n,this.modified=r,this.id=qm++}toString(){let{name:e}=this;for(let t of this.modified)t.name&&(e=`${t.name}(${e})`);return e}static define(t,n){let r=typeof t==`string`?t:`?`;if(t instanceof e&&(n=t),n?.base)throw Error(`Can not derive from a modified tag`);let i=new e(r,[],null,[]);if(i.set.push(i),n)for(let e of n.set)i.set.push(e);return i}static defineModifier(e){let t=new Xm(e);return e=>e.modified.indexOf(t)>-1?e:Xm.get(e.base||e,e.modified.concat(t).sort((e,t)=>e.id-t.id))}},Ym=0,Xm=class e{constructor(e){this.name=e,this.instances=[],this.id=Ym++}static get(t,n){if(!n.length)return t;let r=n[0].instances.find(e=>e.base==t&&Zm(n,e.modified));if(r)return r;let i=[],a=new Jm(t.name,i,t,n);for(let e of n)e.instances.push(a);let o=Qm(n);for(let n of t.set)if(!n.modified.length)for(let t of o)i.push(e.get(n,t));return a}};function Zm(e,t){return e.length==t.length&&e.every((e,n)=>e==t[n])}function Qm(e){let t=[[]];for(let n=0;n<e.length;n++)for(let r=0,i=t.length;r<i;r++)t.push(t[r].concat(e[n]));return t.sort((e,t)=>t.length-e.length)}function $m(e){let t=Object.create(null);for(let n in e){let r=e[n];Array.isArray(r)||(r=[r]);for(let e of n.split(` `))if(e){let n=[],i=2,a=e;for(let t=0;;){if(a==`...`&&t>0&&t+3==e.length){i=1;break}let r=/^"(?:[^"\\]|\\.)*?"|[^\/!]+/.exec(a);if(!r)throw RangeError(`Invalid path: `+e);if(n.push(r[0]==`*`?``:r[0][0]==`"`?JSON.parse(r[0]):r[0]),t+=r[0].length,t==e.length)break;let o=e[t++];if(t==e.length&&o==`!`){i=0;break}if(o!=`/`)throw RangeError(`Invalid path: `+e);a=e.slice(t)}let o=n.length-1,s=n[o];if(!s)throw RangeError(`Invalid path: `+e);t[s]=new th(r,i,o>0?n.slice(0,o):null).sort(t[s])}}return eh.add(t)}var eh=new K({combine(e,t){let n,r,i;for(;e||t;){if(!e||t&&e.depth<=t.depth?(i=t,t=t.next):(i=e,e=e.next),n&&n.mode==i.mode&&!i.context&&!n.context)continue;let a=new th(i.tags,i.mode,i.context);n?n.next=a:r=a,n=a}return r}}),th=class{constructor(e,t,n,r){this.tags=e,this.mode=t,this.context=n,this.next=r}get opaque(){return this.mode==0}get inherit(){return this.mode==1}sort(e){return!e||e.depth<this.depth?(this.next=e,this):(e.next=this.sort(e.next),e)}get depth(){return this.context?this.context.length:0}};th.empty=new th([],2,null);function nh(e,t){let n=Object.create(null);for(let t of e)if(!Array.isArray(t.tag))n[t.tag.id]=t.class;else for(let e of t.tag)n[e.id]=t.class;let{scope:r,all:i=null}=t||{};return{style:e=>{let t=i;for(let r of e)for(let e of r.set){let r=n[e.id];if(r){t=t?t+` `+r:r;break}}return t},scope:r}}var J=Jm.define,rh=J(),ih=J(),ah=J(ih),oh=J(ih),sh=J(),ch=J(sh),lh=J(sh),uh=J(),dh=J(uh),fh=J(),ph=J(),mh=J(),hh=J(mh),gh=J(),Y={comment:rh,lineComment:J(rh),blockComment:J(rh),docComment:J(rh),name:ih,variableName:J(ih),typeName:ah,tagName:J(ah),propertyName:oh,attributeName:J(oh),className:J(ih),labelName:J(ih),namespace:J(ih),macroName:J(ih),literal:sh,string:ch,docString:J(ch),character:J(ch),attributeValue:J(ch),number:lh,integer:J(lh),float:J(lh),bool:J(sh),regexp:J(sh),escape:J(sh),color:J(sh),url:J(sh),keyword:fh,self:J(fh),null:J(fh),atom:J(fh),unit:J(fh),modifier:J(fh),operatorKeyword:J(fh),controlKeyword:J(fh),definitionKeyword:J(fh),moduleKeyword:J(fh),operator:ph,derefOperator:J(ph),arithmeticOperator:J(ph),logicOperator:J(ph),bitwiseOperator:J(ph),compareOperator:J(ph),updateOperator:J(ph),definitionOperator:J(ph),typeOperator:J(ph),controlOperator:J(ph),punctuation:mh,separator:J(mh),bracket:hh,angleBracket:J(hh),squareBracket:J(hh),paren:J(hh),brace:J(hh),content:uh,heading:dh,heading1:J(dh),heading2:J(dh),heading3:J(dh),heading4:J(dh),heading5:J(dh),heading6:J(dh),contentSeparator:J(uh),list:J(uh),quote:J(uh),emphasis:J(uh),strong:J(uh),link:J(uh),monospace:J(uh),strikethrough:J(uh),inserted:J(),deleted:J(),changed:J(),invalid:J(),meta:gh,documentMeta:J(gh),annotation:J(gh),processingInstruction:J(gh),definition:Jm.defineModifier(`definition`),constant:Jm.defineModifier(`constant`),function:Jm.defineModifier(`function`),standard:Jm.defineModifier(`standard`),local:Jm.defineModifier(`local`),special:Jm.defineModifier(`special`)};for(let e in Y){let t=Y[e];t instanceof Jm&&(t.name=e)}nh([{tag:Y.link,class:`tok-link`},{tag:Y.heading,class:`tok-heading`},{tag:Y.emphasis,class:`tok-emphasis`},{tag:Y.strong,class:`tok-strong`},{tag:Y.keyword,class:`tok-keyword`},{tag:Y.atom,class:`tok-atom`},{tag:Y.bool,class:`tok-bool`},{tag:Y.url,class:`tok-url`},{tag:Y.labelName,class:`tok-labelName`},{tag:Y.inserted,class:`tok-inserted`},{tag:Y.deleted,class:`tok-deleted`},{tag:Y.literal,class:`tok-literal`},{tag:Y.string,class:`tok-string`},{tag:Y.number,class:`tok-number`},{tag:[Y.regexp,Y.escape,Y.special(Y.string)],class:`tok-string2`},{tag:Y.variableName,class:`tok-variableName`},{tag:Y.local(Y.variableName),class:`tok-variableName tok-local`},{tag:Y.definition(Y.variableName),class:`tok-variableName tok-definition`},{tag:Y.special(Y.variableName),class:`tok-variableName2`},{tag:Y.definition(Y.propertyName),class:`tok-propertyName tok-definition`},{tag:Y.typeName,class:`tok-typeName`},{tag:Y.namespace,class:`tok-namespace`},{tag:Y.className,class:`tok-className`},{tag:Y.macroName,class:`tok-macroName`},{tag:Y.propertyName,class:`tok-propertyName`},{tag:Y.operator,class:`tok-operator`},{tag:Y.comment,class:`tok-comment`},{tag:Y.meta,class:`tok-meta`},{tag:Y.invalid,class:`tok-invalid`},{tag:Y.punctuation,class:`tok-punctuation`}]);var _h=new K,vh=new K,yh=class{constructor(e,t,n=[],r=``){this.data=e,this.name=r,L.prototype.hasOwnProperty(`tree`)||Object.defineProperty(L.prototype,"tree",{get(){return xh(this)}}),this.parser=t,this.extension=[Ah.of(this),L.languageData.of((e,t,n)=>{let r=bh(e,t,n),i=r.type.prop(_h);if(!i)return[];let a=e.facet(i),o=r.type.prop(vh);if(o){let i=r.resolve(t-r.from,n);for(let t of o)if(t.test(i,e)){let n=e.facet(t.facet);return t.type==`replace`?n:n.concat(a)}}return a})].concat(n)}isActiveAt(e,t,n=-1){return bh(e,t,n).type.prop(_h)==this.data}findRegions(e){let t=e.facet(Ah);if(t?.data==this.data)return[{from:0,to:e.doc.length}];if(!t||!t.allowsNesting)return[];let n=[],r=(e,t)=>{if(e.prop(_h)==this.data){n.push({from:t,to:t+e.length});return}let i=e.prop(K.mounted);if(i){if(i.tree.prop(_h)==this.data){if(i.overlay)for(let e of i.overlay)n.push({from:e.from+t,to:e.to+t});else n.push({from:t,to:t+e.length});return}if(i.overlay){let e=n.length;if(r(i.tree,i.overlay[0].from+t),n.length>e)return}}for(let n=0;n<e.children.length;n++){let i=e.children[n];i instanceof wm&&r(i,e.positions[n]+t)}};return r(xh(e),0),n}get allowsNesting(){return!0}};yh.setState=I.define();function bh(e,t,n){let r=e.facet(Ah),i=xh(e).topNode;if(!r||r.allowsNesting)for(let e=i;e;e=e.enter(t,n,q.ExcludeBuffers|q.EnterBracketed))e.type.isTop&&(i=e);return i}function xh(e){let t=e.field(yh.state,!1);return t?t.tree:wm.empty}var Sh=class{constructor(e){this.doc=e,this.cursorPos=0,this.string=``,this.cursor=e.iter()}get length(){return this.doc.length}syncTo(e){return this.string=this.cursor.next(e-this.cursorPos).value,this.cursorPos=e+this.string.length,this.cursorPos-this.string.length}chunk(e){return this.syncTo(e),this.string}get lineChunks(){return!0}read(e,t){let n=this.cursorPos-this.string.length;return e<n||t>=this.cursorPos?this.doc.sliceString(e,t):this.string.slice(e-n,t-n)}},Ch=null,wh=class e{constructor(e,t,n=[],r,i,a,o,s){this.parser=e,this.state=t,this.fragments=n,this.tree=r,this.treeLen=i,this.viewport=a,this.skipped=o,this.scheduleOn=s,this.parse=null,this.tempSkipped=[]}static create(t,n,r){return new e(t,n,[],wm.empty,0,r,[],null)}startParse(){return this.parser.startParse(new Sh(this.state.doc),this.fragments)}work(e,t){return t!=null&&t>=this.state.doc.length&&(t=void 0),this.tree!=wm.empty&&this.isDone(t??this.state.doc.length)?(this.takeTree(),!0):this.withContext(()=>{if(typeof e==`number`){let t=Date.now()+e;e=()=>Date.now()>t}for(this.parse||=this.startParse(),t!=null&&(this.parse.stoppedAt==null||this.parse.stoppedAt>t)&&t<this.state.doc.length&&this.parse.stopAt(t);;){let n=this.parse.advance();if(n){if(this.fragments=this.withoutTempSkipped(Wm.addTree(n,this.fragments,this.parse.stoppedAt!=null)),this.treeLen=this.parse.stoppedAt??this.state.doc.length,this.tree=n,this.parse=null,this.treeLen<(t??this.state.doc.length))this.parse=this.startParse();else return!0}if(e())return!1}})}takeTree(){let e,t;this.parse&&(e=this.parse.parsedPos)>=this.treeLen&&((this.parse.stoppedAt==null||this.parse.stoppedAt>e)&&this.parse.stopAt(e),this.withContext(()=>{for(;!(t=this.parse.advance()););}),this.treeLen=e,this.tree=t,this.fragments=this.withoutTempSkipped(Wm.addTree(this.tree,this.fragments,!0)),this.parse=null)}withContext(e){let t=Ch;Ch=this;try{return e()}finally{Ch=t}}withoutTempSkipped(e){for(let t;t=this.tempSkipped.pop();)e=Th(e,t.from,t.to);return e}changes(t,n){let{fragments:r,tree:i,treeLen:a,viewport:o,skipped:s}=this;if(this.takeTree(),!t.empty){let e=[];if(t.iterChangedRanges((t,n,r,i)=>e.push({fromA:t,toA:n,fromB:r,toB:i})),r=Wm.applyChanges(r,e),i=wm.empty,a=0,o={from:t.mapPos(o.from,-1),to:t.mapPos(o.to,1)},this.skipped.length){s=[];for(let e of this.skipped){let n=t.mapPos(e.from,1),r=t.mapPos(e.to,-1);n<r&&s.push({from:n,to:r})}}}return new e(this.parser,n,r,i,a,o,s,this.scheduleOn)}updateViewport(e){if(this.viewport.from==e.from&&this.viewport.to==e.to)return!1;this.viewport=e;let t=this.skipped.length;for(let t=0;t<this.skipped.length;t++){let{from:n,to:r}=this.skipped[t];n<e.to&&r>e.from&&(this.fragments=Th(this.fragments,n,r),this.skipped.splice(t--,1))}return this.skipped.length>=t?!1:(this.reset(),!0)}reset(){this.parse&&=(this.takeTree(),null)}skipUntilInView(e,t){this.skipped.push({from:e,to:t})}static getSkippingParser(e){return new class extends Gm{createParse(t,n,r){let i=r[0].from,a=r[r.length-1].to;return{parsedPos:i,advance(){let t=Ch;if(t){for(let e of r)t.tempSkipped.push(e);e&&(t.scheduleOn=t.scheduleOn?Promise.all([t.scheduleOn,e]):e)}return this.parsedPos=a,new wm(xm.none,[],[],a-i)},stoppedAt:null,stopAt(){}}}}}isDone(e){e=Math.min(e,this.state.doc.length);let t=this.fragments;return this.treeLen>=e&&t.length&&t[0].from==0&&t[0].to>=e}static get(){return Ch}};function Th(e,t,n){return Wm.applyChanges(e,[{fromA:t,toA:n,fromB:t,toB:n}])}var Eh=class e{constructor(e){this.context=e,this.tree=e.tree}apply(t){if(!t.docChanged&&this.tree==this.context.tree)return this;let n=this.context.changes(t.changes,t.state),r=this.context.treeLen==t.startState.doc.length?void 0:Math.max(t.changes.mapPos(this.context.treeLen),n.viewport.to);return n.work(20,r)||n.takeTree(),new e(n)}static init(t){let n=Math.min(3e3,t.doc.length),r=wh.create(t.facet(Ah).parser,t,{from:0,to:n});return r.work(20,n)||r.takeTree(),new e(r)}};yh.state=Yo.define({create:Eh.init,update(e,t){for(let e of t.effects)if(e.is(yh.setState))return e.value;return t.startState.facet(Ah)==t.state.facet(Ah)?e.apply(t):Eh.init(t.state)}});var Dh=e=>{let t=setTimeout(()=>e(),500);return()=>clearTimeout(t)};typeof requestIdleCallback<`u`&&(Dh=e=>{let t=-1,n=setTimeout(()=>{t=requestIdleCallback(e,{timeout:400})},100);return()=>t<0?clearTimeout(n):cancelIdleCallback(t)});var Oh=typeof navigator<`u`&&navigator.scheduling?.isInputPending?()=>navigator.scheduling.isInputPending():null,kh=$l.fromClass(class{constructor(e){this.view=e,this.working=null,this.workScheduled=0,this.chunkEnd=-1,this.chunkBudget=-1,this.work=this.work.bind(this),this.scheduleWork()}update(e){let t=this.view.state.field(yh.state).context;(t.updateViewport(e.view.viewport)||this.view.viewport.to>t.treeLen)&&this.scheduleWork(),(e.docChanged||e.selectionSet)&&(this.view.hasFocus&&(this.chunkBudget+=50),this.scheduleWork()),this.checkAsyncSchedule(t)}scheduleWork(){if(this.working)return;let{state:e}=this.view,t=e.field(yh.state);t.tree==t.context.tree&&t.context.isDone(e.doc.length)||(this.working=Dh(this.work))}work(e){this.working=null;let t=Date.now();if(this.chunkEnd<t&&(this.chunkEnd<0||this.view.hasFocus)&&(this.chunkEnd=t+3e4,this.chunkBudget=3e3),this.chunkBudget<=0)return;let{state:n,viewport:{to:r}}=this.view,i=n.field(yh.state);if(i.tree==i.context.tree&&i.context.isDone(r+1e5))return;let a=Date.now()+Math.min(this.chunkBudget,100,e&&!Oh?Math.max(25,e.timeRemaining()-5):1e9),o=i.context.treeLen<r&&n.doc.length>r+1e3,s=i.context.work(()=>Oh&&Oh()||Date.now()>a,r+(o?0:1e5));this.chunkBudget-=Date.now()-t,(s||this.chunkBudget<=0)&&(i.context.takeTree(),this.view.dispatch({effects:yh.setState.of(new Eh(i.context))})),this.chunkBudget>0&&(!s||o)&&this.scheduleWork(),this.checkAsyncSchedule(i.context)}checkAsyncSchedule(e){e.scheduleOn&&=(this.workScheduled++,e.scheduleOn.then(()=>this.scheduleWork()).catch(e=>Yl(this.view.state,e)).then(()=>this.workScheduled--),null)}destroy(){this.working&&this.working()}isWorking(){return!!(this.working||this.workScheduled>0)}},{eventHandlers:{focus(){this.scheduleWork()}}}),Ah=F.define({combine(e){return e.length?e[0]:null},enables:e=>[yh.state,kh,G.contentAttributes.compute([e],t=>{let n=t.facet(e);return n&&n.name?{"data-language":n.name}:{}})]}),jh=F.define(),Mh=F.define({combine:e=>{if(!e.length)return`  `;let t=e[0];if(!t||/\S/.test(t)||Array.from(t).some(e=>e!=t[0]))throw Error(`Invalid indent unit: `+JSON.stringify(e[0]));return t}});function Nh(e){let t=e.facet(Mh);return t.charCodeAt(0)==9?e.tabSize*t.length:t.length}function Ph(e,t){let n=``,r=e.tabSize,i=e.facet(Mh)[0];if(i==`	`){for(;t>=r;)n+=`	`,t-=r;i=` `}for(let e=0;e<t;e++)n+=i;return n}function Fh(e,t){e instanceof L&&(e=new Ih(e));for(let n of e.state.facet(jh)){let r=n(e,t);if(r!==void 0)return r}let n=xh(e.state);return n.length>=t?Rh(e,n,t):null}var Ih=class{constructor(e,t={}){this.state=e,this.options=t,this.unit=Nh(e)}lineAt(e,t=1){let n=this.state.doc.lineAt(e),{simulateBreak:r,simulateDoubleBreak:i}=this.options;return r!=null&&r>=n.from&&r<=n.to?i&&r==e?{text:``,from:e}:(t<0?r<e:r<=e)?{text:n.text.slice(r-n.from),from:r}:{text:n.text.slice(0,r-n.from),from:n.from}:n}textAfterPos(e,t=1){if(this.options.simulateDoubleBreak&&e==this.options.simulateBreak)return``;let{text:n,from:r}=this.lineAt(e,t);return n.slice(e-r,Math.min(n.length,e+100-r))}column(e,t=1){let{text:n,from:r}=this.lineAt(e,t),i=this.countColumn(n,e-r),a=this.options.overrideIndentation?this.options.overrideIndentation(r):-1;return a>-1&&(i+=a-this.countColumn(n,n.search(/\S|$/))),i}countColumn(e,t=e.length){return Ys(e,this.state.tabSize,t)}lineIndent(e,t=1){let{text:n,from:r}=this.lineAt(e,t),i=this.options.overrideIndentation;if(i){let e=i(r);if(e>-1)return e}return this.countColumn(n,n.search(/\S|$/))}get simulatedBreak(){return this.options.simulateBreak||null}},Lh=new K;function Rh(e,t,n){let r=t.resolveStack(n),i=t.resolveInner(n,-1).resolve(n,0).enterUnfinishedNodesBefore(n);if(i!=r.node){let e=[];for(let t=i;t&&!(t.from<r.node.from||t.to>r.node.to||t.from==r.node.from&&t.type==r.node.type);t=t.parent)e.push(t);for(let t=e.length-1;t>=0;t--)r={node:e[t],next:r}}return zh(r,e,n)}function zh(e,t,n){for(let r=e;r;r=r.next){let e=Vh(r.node);if(e)return e(Uh.create(t,n,r))}return 0}function Bh(e){return e.pos==e.options.simulateBreak&&e.options.simulateDoubleBreak}function Vh(e){let t=e.type.prop(Lh);if(t)return t;let n=e.firstChild,r;if(n&&(r=n.type.prop(K.closedBy))){let t=e.lastChild,n=t&&r.indexOf(t.name)>-1;return e=>Kh(e,!0,1,void 0,n&&!Bh(e)?t.from:void 0)}return e.parent==null?Hh:null}function Hh(){return 0}var Uh=class e extends Ih{constructor(e,t,n){super(e.state,e.options),this.base=e,this.pos=t,this.context=n}get node(){return this.context.node}static create(t,n,r){return new e(t,n,r)}get textAfter(){return this.textAfterPos(this.pos)}get baseIndent(){return this.baseIndentFor(this.node)}baseIndentFor(e){let t=this.state.doc.lineAt(e.from);for(;;){let n=e.resolve(t.from);for(;n.parent&&n.parent.from==n.from;)n=n.parent;if(Wh(n,e))break;t=this.state.doc.lineAt(n.from)}return this.lineIndent(t.from)}continue(){return zh(this.context.next,this.base,this.pos)}};function Wh(e,t){for(let n=t;n;n=n.parent)if(e==n)return!0;return!1}function Gh(e){let t=e.node,n=t.childAfter(t.from),r=t.lastChild;if(!n)return null;let i=e.options.simulateBreak,a=e.state.doc.lineAt(n.from),o=i==null||i<=a.from?a.to:Math.min(a.to,i);for(let e=n.to;;){let i=t.childAfter(e);if(!i||i==r)return null;if(!i.type.isSkipped){if(i.from>=o)return null;let e=/^ */.exec(a.text.slice(n.to-a.from))[0].length;return{from:n.from,to:n.to+e}}e=i.to}}function Kh(e,t,n,r,i){let a=e.textAfter,o=a.match(/^\s*/)[0].length,s=r&&a.slice(o,o+r.length)==r||i==e.pos+o,c=t?Gh(e):null;return c?s?e.column(c.from):e.column(c.to):e.baseIndent+(s?0:e.unit*n)}var qh=F.define(),Jh=new K;function Yh(e,t,n){let r=xh(e);if(r.length<n)return null;let i=r.resolveStack(n,1),a=null;for(let o=i;o;o=o.next){let i=o.node;if(i.to<=n||i.from>n)continue;if(a&&i.from<t)break;let s=i.type.prop(Jh);if(s&&(i.to<r.length-50||r.length==e.doc.length||!Xh(i))){let r=s(i,e);r&&r.from<=n&&r.from>=t&&r.to>n&&(a=r)}}return a}function Xh(e){let t=e.lastChild;return t&&t.to==e.to&&t.type.isError}function Zh(e,t,n){for(let r of e.facet(qh)){let i=r(e,t,n);if(i)return i}return Yh(e,t,n)}function Qh(e,t){let n=t.mapPos(e.from,1),r=t.mapPos(e.to,-1);return n>=r?void 0:{from:n,to:r}}var $h=I.define({map:Qh}),eg=I.define({map:Qh}),tg=Yo.define({create(){return B.none},update(e,t){t.isUserEvent(`delete`)&&t.changes.iterChangedRanges((t,n)=>e=ng(e,t,n)),e=e.map(t.changes);let n=[];for(let r of t.effects)r.is($h)&&!ig(e,r.value.from,r.value.to)?n.push(r.value):r.is(eg)&&(e=e.update({filter:(e,t)=>r.value.from!=e||r.value.to!=t,filterFrom:r.value.from,filterTo:r.value.to}));if(n.length){let{preparePlaceholder:r}=t.state.facet(og),i=n.map(e=>(r?B.replace({widget:new ug(r(t.state,e))}):lg).range(e.from,e.to));e=e.update({add:i})}return t.selection&&(e=ng(e,t.selection.main.head)),e},provide:e=>G.decorations.from(e),toJSON(e,t){let n=[];return e.between(0,t.doc.length,(e,t)=>{n.push(e,t)}),n},fromJSON(e){if(!Array.isArray(e)||e.length%2)throw RangeError(`Invalid JSON for fold state`);let t=[];for(let n=0;n<e.length;){let r=e[n++],i=e[n++];if(typeof r!=`number`||typeof i!=`number`)throw RangeError(`Invalid JSON for fold state`);t.push(lg.range(r,i))}return B.set(t,!0)}});function ng(e,t,n=t){let r=!1;return e.between(t,n,(e,i)=>{e<n&&i>t&&(r=!0)}),r?e.update({filterFrom:t,filterTo:n,filter:(e,r)=>e>=n||r<=t}):e}function rg(e,t,n){var r;let i=null;return(r=e.field(tg,!1))==null||r.between(t,n,(e,t)=>{(!i||i.from>e)&&(i={from:e,to:t})}),i}function ig(e,t,n){let r=!1;return e.between(t,t,(e,i)=>{e==t&&i==n&&(r=!0)}),r}var ag={placeholderDOM:null,preparePlaceholder:null,placeholderText:`…`},og=F.define({combine(e){return As(e,ag)}});function sg(e){let t=[tg,mg];return e&&t.push(og.of(e)),t}function cg(e,t){let{state:n}=e,r=n.facet(og),i=t=>{let n=e.lineBlockAt(e.posAtDOM(t.target)),r=rg(e.state,n.from,n.to);r&&e.dispatch({effects:eg.of(r)}),t.preventDefault()};if(r.placeholderDOM)return r.placeholderDOM(e,i,t);let a=document.createElement(`span`);return a.textContent=r.placeholderText,a.setAttribute(`aria-label`,n.phrase(`folded code`)),a.title=n.phrase(`unfold`),a.className=`cm-foldPlaceholder`,a.onclick=i,a}var lg=B.replace({widget:new class extends Oc{toDOM(e){return cg(e,null)}}}),ug=class extends Oc{constructor(e){super(),this.value=e}eq(e){return this.value==e.value}toDOM(e){return cg(e,this.value)}},dg={openText:`⌄`,closedText:`›`,markerDOM:null,domEventHandlers:{},foldingChanged:()=>!1},fg=class extends Wp{constructor(e,t){super(),this.config=e,this.open=t}eq(e){return this.config==e.config&&this.open==e.open}toDOM(e){if(this.config.markerDOM)return this.config.markerDOM(this.open);let t=document.createElement(`span`);return t.textContent=this.open?this.config.openText:this.config.closedText,t.title=e.state.phrase(this.open?`Fold line`:`Unfold line`),t}};function pg(e={}){let t={...dg,...e},n=new fg(t,!0),r=new fg(t,!1),i=$l.fromClass(class{constructor(e){this.from=e.viewport.from,this.markers=this.buildMarkers(e)}update(e){(e.docChanged||e.viewportChanged||e.startState.facet(Ah)!=e.state.facet(Ah)||e.startState.field(tg,!1)!=e.state.field(tg,!1)||xh(e.startState)!=xh(e.state)||t.foldingChanged(e))&&(this.markers=this.buildMarkers(e.view))}buildMarkers(e){let t=new Rs;for(let i of e.viewportLineBlocks){let a=rg(e.state,i.from,i.to)?r:Zh(e.state,i.from,i.to)?n:null;a&&t.add(i.from,i.from,a)}return t.finish()}}),{domEventHandlers:a}=t;return[i,Yp({class:`cm-foldGutter`,markers(e){return e.plugin(i)?.markers||R.empty},initialSpacer(){return new fg(t,!1)},domEventHandlers:{...a,click:(e,t,n)=>{if(a.click&&a.click(e,t,n))return!0;let r=rg(e.state,t.from,t.to);if(r)return e.dispatch({effects:eg.of(r)}),!0;let i=Zh(e.state,t.from,t.to);return i?(e.dispatch({effects:$h.of(i)}),!0):!1}}}),sg()]}var mg=G.baseTheme({".cm-foldPlaceholder":{backgroundColor:`#eee`,border:`1px solid #ddd`,color:`#888`,borderRadius:`.2em`,margin:`0 1px`,padding:`0 1px`,cursor:`pointer`},".cm-foldGutter span":{padding:`0 1px`,cursor:`pointer`}});Y.meta,Y.link,Y.heading,Y.emphasis,Y.strong,Y.strikethrough,Y.keyword,Y.atom,Y.bool,Y.url,Y.contentSeparator,Y.labelName,Y.literal,Y.inserted,Y.string,Y.deleted,Y.regexp,Y.escape,Y.string,Y.variableName,Y.variableName,Y.typeName,Y.namespace,Y.className,Y.variableName,Y.macroName,Y.propertyName,Y.comment,Y.invalid;var hg=1e4,gg=`()[]{}`,_g=new K;function vg(e,t,n){let r=e.prop(t<0?K.openedBy:K.closedBy);if(r)return r;if(e.name.length==1){let r=n.indexOf(e.name);if(r>-1&&r%2==+(t<0))return[n[r+t]]}return null}function yg(e){let t=e.type.prop(_g);return t?t(e.node):e}function bg(e,t,n,r={}){let i=r.maxScanDistance||hg,a=r.brackets||gg,o=xh(e),s=o.resolveInner(t,n);for(let r=s;r;r=r.parent){let i=vg(r.type,n,a);if(i&&r.from<r.to){let o=yg(r);if(o&&(n>0?t>=o.from&&t<o.to:t>o.from&&t<=o.to))return xg(e,t,n,r,o,i,a)}}return Sg(e,t,n,o,s.type,i,a)}function xg(e,t,n,r,i,a,o){let s=r.parent,c={from:i.from,to:i.to},l=0,u=s?.cursor();if(u&&(n<0?u.childBefore(r.from):u.childAfter(r.to)))do if(n<0?u.to<=r.from:u.from>=r.to){if(l==0&&a.indexOf(u.type.name)>-1&&u.from<u.to){let e=yg(u);return{start:c,end:e?{from:e.from,to:e.to}:void 0,matched:!0}}if(vg(u.type,n,o))l++;else if(vg(u.type,-n,o)){if(l==0){let e=yg(u);return{start:c,end:e&&e.from<e.to?{from:e.from,to:e.to}:void 0,matched:!1}}l--}}while(n<0?u.prevSibling():u.nextSibling());return{start:c,matched:!1}}function Sg(e,t,n,r,i,a,o){if(n<0?!t:t==e.doc.length)return null;let s=n<0?e.sliceDoc(t-1,t):e.sliceDoc(t,t+1),c=o.indexOf(s);if(c<0||c%2==0!=n>0)return null;let l={from:n<0?t-1:t,to:n>0?t+1:t},u=e.doc.iterRange(t,n>0?e.doc.length:0),d=0;for(let e=0;!u.next().done&&e<=a;){let a=u.value;n<0&&(e+=a.length);let s=t+e*n;for(let e=n>0?0:a.length-1,t=n>0?a.length:-1;e!=t;e+=n){let t=o.indexOf(a[e]);if(!(t<0||r.resolveInner(s+e,1).type!=i)){if(t%2==0==n>0)d++;else if(d==1)return{start:l,end:{from:s+e,to:s+e+1},matched:t>>1==c>>1};else d--}}n>0&&(e+=a.length)}return u.done?{start:l,matched:!1}:null}var Cg=Object.create(null),wg=[xm.none],Tg=[],Eg=Object.create(null),Dg=Object.create(null);for(let[e,t]of[[`variable`,`variableName`],[`variable-2`,`variableName.special`],[`string-2`,`string.special`],[`def`,`variableName.definition`],[`tag`,`tagName`],[`attribute`,`attributeName`],[`type`,`typeName`],[`builtin`,`variableName.standard`],[`qualifier`,`modifier`],[`error`,`invalid`],[`header`,`heading`],[`property`,`propertyName`]])Dg[e]=kg(Cg,t);function Og(e,t){Tg.indexOf(e)>-1||(Tg.push(e),console.warn(t))}function kg(e,t){let n=[];for(let r of t.split(` `)){let t=[];for(let n of r.split(`.`)){let r=e[n]||Y[n];r?typeof r==`function`?t.length?t=t.map(r):Og(n,`Modifier ${n} used at start of tag`):t.length?Og(n,`Tag ${n} used as modifier`):t=Array.isArray(r)?r:[r]:Og(n,`Unknown highlighting tag ${n}`)}for(let e of t)n.push(e)}if(!n.length)return 0;let r=t.replace(/ /g,`_`),i=r+` `+n.map(e=>e.id),a=Eg[i];if(a)return a.id;let o=Eg[i]=xm.define({id:wg.length,name:r,props:[$m({[r]:n})]});return wg.push(o),o.id}V.RTL,V.LTR;var Ag=e=>{let{state:t}=e,n=t.doc.lineAt(t.selection.main.from),r=Fg(e.state,n.from);return r.line?Mg(e):r.block?Pg(e):!1};function jg(e,t){return({state:n,dispatch:r})=>{if(n.readOnly)return!1;let i=e(t,n);return i?(r(n.update(i)),!0):!1}}var Mg=jg(Bg,0),Ng=jg(zg,0),Pg=jg((e,t)=>zg(e,t,Rg(t)),0);function Fg(e,t){let n=e.languageDataAt(`commentTokens`,t,1);return n.length?n[0]:{}}var Ig=50;function Lg(e,{open:t,close:n},r,i){let a=e.sliceDoc(r-Ig,r),o=e.sliceDoc(i,i+Ig),s=/\s*$/.exec(a)[0].length,c=/^\s*/.exec(o)[0].length,l=a.length-s;if(a.slice(l-t.length,l)==t&&o.slice(c,c+n.length)==n)return{open:{pos:r-s,margin:s&&1},close:{pos:i+c,margin:c&&1}};let u,d;i-r<=100?u=d=e.sliceDoc(r,i):(u=e.sliceDoc(r,r+Ig),d=e.sliceDoc(i-Ig,i));let f=/^\s*/.exec(u)[0].length,p=/\s*$/.exec(d)[0].length,m=d.length-p-n.length;return u.slice(f,f+t.length)==t&&d.slice(m,m+n.length)==n?{open:{pos:r+f+t.length,margin:+!!/\s/.test(u.charAt(f+t.length))},close:{pos:i-p-n.length,margin:+!!/\s/.test(d.charAt(m-1))}}:null}function Rg(e){let t=[];for(let n of e.selection.ranges){let r=e.doc.lineAt(n.from),i=n.to<=r.to?r:e.doc.lineAt(n.to);i.from>r.from&&i.from==n.to&&(i=n.to==r.to+1?r:e.doc.lineAt(n.to-1));let a=t.length-1;a>=0&&t[a].to>r.from?t[a].to=i.to:t.push({from:r.from+/^\s*/.exec(r.text)[0].length,to:i.to})}return t}function zg(e,t,n=t.selection.ranges){let r=n.map(e=>Fg(t,e.from).block);if(!r.every(e=>e))return null;let i=n.map((e,n)=>Lg(t,r[n],e.from,e.to));if(e!=2&&!i.every(e=>e))return{changes:t.changes(n.map((e,t)=>i[t]?[]:[{from:e.from,insert:r[t].open+` `},{from:e.to,insert:` `+r[t].close}]))};if(e!=1&&i.some(e=>e)){let e=[];for(let t=0,n;t<i.length;t++)if(n=i[t]){let i=r[t],{open:a,close:o}=n;e.push({from:a.pos-i.open.length,to:a.pos+a.margin},{from:o.pos-o.margin,to:o.pos+i.close.length})}return{changes:e}}return null}function Bg(e,t,n=t.selection.ranges){let r=[],i=-1;ranges:for(let{from:e,to:a}of n){let n=r.length,o=1e9,s;for(let n=e;n<=a;){let c=t.doc.lineAt(n);if(s==null&&(s=Fg(t,c.from).line,!s))continue ranges;if(c.from>i&&(e==a||a>c.from)){i=c.from;let e=/^\s*/.exec(c.text)[0].length,t=e==c.length,n=c.text.slice(e,e+s.length)==s?e:-1;e<c.text.length&&e<o&&(o=e),r.push({line:c,comment:n,token:s,indent:e,empty:t,single:!1})}n=c.to+1}if(o<1e9)for(let e=n;e<r.length;e++)r[e].indent<r[e].line.text.length&&(r[e].indent=o);r.length==n+1&&(r[n].single=!0)}if(e!=2&&r.some(e=>e.comment<0&&(!e.empty||e.single))){let e=[];for(let{line:t,token:n,indent:i,empty:a,single:o}of r)(o||!a)&&e.push({from:t.from+i,insert:n+` `});let n=t.changes(e);return{changes:n,selection:t.selection.map(n,1)}}if(e!=1&&r.some(e=>e.comment>=0)){let e=[];for(let{line:t,comment:n,token:i}of r)if(n>=0){let r=t.from+n,a=r+i.length;t.text[a-t.from]==` `&&a++,e.push({from:r,to:a})}return{changes:e}}return null}var Vg=ps.define(),Hg=ps.define(),Ug=F.define(),Wg=F.define({combine(e){return As(e,{minDepth:100,newGroupDelay:500,joinToEvent:(e,t)=>t},{minDepth:Math.max,newGroupDelay:Math.min,joinToEvent:(e,t)=>(n,r)=>e(n,r)||t(n,r)})}}),Gg=Yo.define({create(){return u_.empty},update(e,t){let n=t.state.facet(Wg),r=t.annotation(Vg);if(r){let i=Qg.fromTransaction(t,r.selection),a=r.side,o=a==0?e.undone:e.done;return o=i?$g(o,o.length,n.minDepth,i):a_(o,t.startState.selection),new u_(a==0?r.rest:o,a==0?o:r.rest)}let i=t.annotation(Hg);if((i==`full`||i==`before`)&&(e=e.isolate()),t.annotation(gs.addToHistory)===!1)return t.changes.empty?e:e.addMapping(t.changes.desc);let a=Qg.fromTransaction(t),o=t.annotation(gs.time),s=t.annotation(gs.userEvent);return a?e=e.addChanges(a,o,s,n,t):t.selection&&(e=e.addSelection(t.startState.selection,o,s,n.newGroupDelay)),(i==`full`||i==`after`)&&(e=e.isolate()),e},toJSON(e){return{done:e.done.map(e=>e.toJSON()),undone:e.undone.map(e=>e.toJSON())}},fromJSON(e){return new u_(e.done.map(Qg.fromJSON),e.undone.map(Qg.fromJSON))}});function Kg(e={}){return[Gg,Wg.of(e),G.domEventHandlers({beforeinput(e,t){let n=e.inputType==`historyUndo`?Jg:e.inputType==`historyRedo`?Yg:null;return n?(e.preventDefault(),n(t)):!1}})]}function qg(e,t){return function({state:n,dispatch:r}){if(!t&&n.readOnly)return!1;let i=n.field(Gg,!1);if(!i)return!1;let a=i.pop(e,n,t);return a?(r(a),!0):!1}}var Jg=qg(0,!1),Yg=qg(1,!1),Xg=qg(0,!0),Zg=qg(1,!0),Qg=class e{constructor(e,t,n,r,i){this.changes=e,this.effects=t,this.mapped=n,this.startSelection=r,this.selectionsAfter=i}setSelAfter(t){return new e(this.changes,this.effects,this.mapped,this.startSelection,t)}toJSON(){return{changes:this.changes?.toJSON(),mapped:this.mapped?.toJSON(),startSelection:this.startSelection?.toJSON(),selectionsAfter:this.selectionsAfter.map(e=>e.toJSON())}}static fromJSON(t){return new e(t.changes&&No.fromJSON(t.changes),[],t.mapped&&Mo.fromJSON(t.mapped),t.startSelection&&P.fromJSON(t.startSelection),t.selectionsAfter.map(P.fromJSON))}static fromTransaction(t,n){let r=r_;for(let e of t.startState.facet(Ug)){let n=e(t);n.length&&(r=r.concat(n))}return!r.length&&t.changes.empty?null:new e(t.changes.invert(t.startState.doc),r,void 0,n||t.startState.selection,r_)}static selection(t){return new e(void 0,r_,void 0,void 0,t)}};function $g(e,t,n,r){let i=t+1>n+20?t-n-1:0,a=e.slice(i,t);return a.push(r),a}function e_(e,t){let n=[],r=!1;return e.iterChangedRanges((e,t)=>n.push(e,t)),t.iterChangedRanges((e,t,i,a)=>{for(let e=0;e<n.length;){let t=n[e++],o=n[e++];a>=t&&i<=o&&(r=!0)}}),r}function t_(e,t){return e.ranges.length==t.ranges.length&&e.ranges.filter((e,n)=>e.empty!=t.ranges[n].empty).length===0}function n_(e,t){return e.length?t.length?e.concat(t):e:t}var r_=[],i_=200;function a_(e,t){if(e.length){let n=e[e.length-1],r=n.selectionsAfter.slice(Math.max(0,n.selectionsAfter.length-i_));return r.length&&r[r.length-1].eq(t)?e:(r.push(t),$g(e,e.length-1,1e9,n.setSelAfter(r)))}return[Qg.selection([t])]}function o_(e){let t=e[e.length-1],n=e.slice();return n[e.length-1]=t.setSelAfter(t.selectionsAfter.slice(0,t.selectionsAfter.length-1)),n}function s_(e,t){if(!e.length)return e;let n=e.length,r=r_;for(;n;){let i=c_(e[n-1],t,r);if(i.changes&&!i.changes.empty||i.effects.length){let t=e.slice(0,n);return t[n-1]=i,t}t=i.mapped,n--,r=i.selectionsAfter}return r.length?[Qg.selection(r)]:r_}function c_(e,t,n){let r=n_(e.selectionsAfter.length?e.selectionsAfter.map(e=>e.map(t)):r_,n);if(!e.changes)return Qg.selection(r);let i=e.changes.map(t),a=t.mapDesc(e.changes,!0),o=e.mapped?e.mapped.composeDesc(a):a;return new Qg(i,I.mapEffects(e.effects,t),o,e.startSelection.map(a),r)}var l_=/^(input\.type|delete)($|\.)/,u_=class e{constructor(e,t,n=0,r=void 0){this.done=e,this.undone=t,this.prevTime=n,this.prevUserEvent=r}isolate(){return this.prevTime?new e(this.done,this.undone):this}addChanges(t,n,r,i,a){let o=this.done,s=o[o.length-1];return o=s&&s.changes&&!s.changes.empty&&t.changes&&(!r||l_.test(r))&&(!s.selectionsAfter.length&&n-this.prevTime<i.newGroupDelay&&i.joinToEvent(a,e_(s.changes,t.changes))||r==`input.type.compose`)?$g(o,o.length-1,i.minDepth,new Qg(t.changes.compose(s.changes),n_(I.mapEffects(t.effects,s.changes),s.effects),s.mapped,s.startSelection,r_)):$g(o,o.length,i.minDepth,t),new e(o,r_,n,r)}addSelection(t,n,r,i){let a=this.done.length?this.done[this.done.length-1].selectionsAfter:r_;return a.length>0&&n-this.prevTime<i&&r==this.prevUserEvent&&r&&/^select($|\.)/.test(r)&&t_(a[a.length-1],t)?this:new e(a_(this.done,t),this.undone,n,r)}addMapping(t){return new e(s_(this.done,t),s_(this.undone,t),this.prevTime,this.prevUserEvent)}pop(e,t,n){let r=e==0?this.done:this.undone;if(r.length==0)return null;let i=r[r.length-1],a=i.selectionsAfter[0]||(i.startSelection?i.startSelection.map(i.changes.invertedDesc,1):t.selection);if(n&&i.selectionsAfter.length)return t.update({selection:i.selectionsAfter[i.selectionsAfter.length-1],annotations:Vg.of({side:e,rest:o_(r),selection:a}),userEvent:e==0?`select.undo`:`select.redo`,scrollIntoView:!0});if(i.changes){let n=r.length==1?r_:r.slice(0,r.length-1);return i.mapped&&(n=s_(n,i.mapped)),t.update({changes:i.changes,selection:i.startSelection,effects:i.effects,annotations:Vg.of({side:e,rest:n,selection:a}),filter:!1,userEvent:e==0?`undo`:`redo`,scrollIntoView:!0})}return null}};u_.empty=new u_(r_,r_);var d_=[{key:`Mod-z`,run:Jg,preventDefault:!0},{key:`Mod-y`,mac:`Mod-Shift-z`,run:Yg,preventDefault:!0},{linux:`Ctrl-Shift-z`,run:Yg,preventDefault:!0},{key:`Mod-u`,run:Xg,preventDefault:!0},{key:`Alt-u`,mac:`Mod-Shift-u`,run:Zg,preventDefault:!0}];function f_(e,t){return P.create(e.ranges.map(t),e.mainIndex)}function p_(e,t){return e.update({selection:t,scrollIntoView:!0,userEvent:`select`})}function m_({state:e,dispatch:t},n){let r=f_(e.selection,n);return!r.eq(e.selection,!0)&&(t(p_(e,r)),!0)}function h_(e,t){return P.cursor(t?e.to:e.from)}function g_(e,t){return m_(e,n=>n.empty?e.moveByChar(n,t):h_(n,t))}function __(e){return e.textDirectionAt(e.state.selection.main.head)==V.LTR}var v_=e=>g_(e,!__(e)),y_=e=>g_(e,__(e));function b_(e,t){return m_(e,n=>n.empty?e.moveByGroup(n,t):h_(n,t))}var x_=e=>b_(e,!__(e)),S_=e=>b_(e,__(e));typeof Intl<`u`&&Intl.Segmenter;function C_(e,t,n){if(t.type.prop(n))return!0;let r=t.to-t.from;return r&&(r>2||/[^\s,.;:]/.test(e.sliceDoc(t.from,t.to)))||t.firstChild}function w_(e,t,n){let r=xh(e).resolveInner(t.head),i=n?K.closedBy:K.openedBy;for(let a=t.head;;){let t=n?r.childAfter(a):r.childBefore(a);if(!t)break;C_(e,t,i)?r=t:a=n?t.to:t.from}let a=r.type.prop(i),o,s;return s=a&&(o=n?bg(e,r.from,1):bg(e,r.to,-1))&&o.matched?n?o.end.to:o.end.from:n?r.to:r.from,P.cursor(s,n?-1:1)}var T_=e=>m_(e,t=>w_(e.state,t,!__(e))),E_=e=>m_(e,t=>w_(e.state,t,__(e)));function D_(e,t){return m_(e,n=>{if(!n.empty)return h_(n,t);let r=e.moveVertically(n,t);return r.head==n.head?e.moveToLineBoundary(n,t):r})}var O_=e=>D_(e,!1),k_=e=>D_(e,!0);function A_(e){let t=e.scrollDOM.clientHeight<e.scrollDOM.scrollHeight-2,n=0,r=0,i;if(t){for(let t of e.state.facet(G.scrollMargins)){let i=t(e);i?.top&&(n=Math.max(i?.top,n)),i?.bottom&&(r=Math.max(i?.bottom,r))}i=e.scrollDOM.clientHeight-n-r}else i=(e.dom.ownerDocument.defaultView||window).innerHeight;return{marginTop:n,marginBottom:r,selfScroll:t,height:Math.max(e.defaultLineHeight,i-5)}}function j_(e,t){let n=A_(e),{state:r}=e,i=f_(r.selection,r=>r.empty?e.moveVertically(r,t,n.height):h_(r,t));if(i.eq(r.selection))return!1;let a;if(n.selfScroll){let t=e.coordsAtPos(r.selection.main.head),o=e.scrollDOM.getBoundingClientRect(),s=o.top+n.marginTop,c=o.bottom-n.marginBottom;t&&t.top>s&&t.bottom<c&&(a=G.scrollIntoView(i.main.head,{y:`start`,yMargin:t.top-s}))}return e.dispatch(p_(r,i),{effects:a}),!0}var M_=e=>j_(e,!1),N_=e=>j_(e,!0);function P_(e,t,n){let r=e.lineBlockAt(t.head),i=e.moveToLineBoundary(t,n);if(i.head==t.head&&i.head!=(n?r.to:r.from)&&(i=e.moveToLineBoundary(t,n,!1)),!n&&i.head==r.from&&r.length){let n=/^\s*/.exec(e.state.sliceDoc(r.from,Math.min(r.from+100,r.to)))[0].length;n&&t.head!=r.from+n&&(i=P.cursor(r.from+n))}return i}var F_=e=>m_(e,t=>P_(e,t,!0)),I_=e=>m_(e,t=>P_(e,t,!1)),L_=e=>m_(e,t=>P_(e,t,!__(e))),R_=e=>m_(e,t=>P_(e,t,__(e))),z_=e=>m_(e,t=>e.moveToLineBoundary(t,!1,!1)),B_=e=>m_(e,t=>e.moveToLineBoundary(t,!0,!1));function V_(e,t,n){let r=!1,i=f_(e.selection,t=>{let i=bg(e,t.head,-1)||bg(e,t.head,1)||t.head>0&&bg(e,t.head-1,1)||t.head<e.doc.length&&bg(e,t.head+1,-1);if(!i||!i.end)return t;r=!0;let a=i.start.from==t.head?i.end.to:i.end.from;return n?P.range(t.anchor,a):P.cursor(a)});return r?(t(p_(e,i)),!0):!1}var H_=({state:e,dispatch:t})=>V_(e,t,!1);function U_(e,t,n){let r=f_(e.state.selection,e=>{e.undirectional&&e.head>=e.anchor!=t&&(e=P.range(e.head,e.anchor));let r=n(e);return P.range(e.anchor,r.head,r.goalColumn,r.bidiLevel||void 0,r.assoc)});return!r.eq(e.state.selection)&&(e.dispatch(p_(e.state,r)),!0)}function W_(e,t){return U_(e,t,n=>e.moveByChar(n,t))}var G_=e=>W_(e,!__(e)),K_=e=>W_(e,__(e));function q_(e,t){return U_(e,t,n=>e.moveByGroup(n,t))}var J_=e=>q_(e,!__(e)),Y_=e=>q_(e,__(e)),X_=e=>{let t=!__(e);return U_(e,t,n=>w_(e.state,n,t))},Z_=e=>{let t=__(e);return U_(e,t,n=>w_(e.state,n,t))};function Q_(e,t){return U_(e,t,n=>e.moveVertically(n,t))}var $_=e=>Q_(e,!1),ev=e=>Q_(e,!0);function tv(e,t){return U_(e,t,n=>e.moveVertically(n,t,A_(e).height))}var nv=e=>tv(e,!1),rv=e=>tv(e,!0),iv=e=>U_(e,!0,t=>P_(e,t,!0)),av=e=>U_(e,!1,t=>P_(e,t,!1)),ov=e=>{let t=!__(e);return U_(e,t,n=>P_(e,n,t))},sv=e=>{let t=__(e);return U_(e,t,n=>P_(e,n,t))},cv=e=>U_(e,!1,t=>P.cursor(e.lineBlockAt(t.head).from)),lv=e=>U_(e,!0,t=>P.cursor(e.lineBlockAt(t.head).to)),uv=({state:e,dispatch:t})=>(t(p_(e,{anchor:0})),!0),dv=({state:e,dispatch:t})=>(t(p_(e,{anchor:e.doc.length})),!0),fv=({state:e,dispatch:t})=>(t(p_(e,{anchor:e.selection.main.anchor,head:0})),!0),pv=({state:e,dispatch:t})=>(t(p_(e,{anchor:e.selection.main.anchor,head:e.doc.length})),!0),mv=({state:e,dispatch:t})=>(t(e.update({selection:{anchor:0,head:e.doc.length},userEvent:`select`})),!0),hv=({state:e,dispatch:t})=>{let n=Pv(e).map(({from:t,to:n})=>P.undirectionalRange(t,Math.min(n+1,e.doc.length)));return t(e.update({selection:P.create(n),userEvent:`select`})),!0},gv=({state:e,dispatch:t})=>{let n=f_(e.selection,t=>{let n=xh(e),r=n.resolveStack(t.from,1);if(t.empty){let e=n.resolveStack(t.from,-1);e.node.from>=r.node.from&&e.node.to<=r.node.to&&(r=e)}for(let e=r;e;e=e.next){let{node:n}=e;if((n.from<t.from&&n.to>=t.to||n.to>t.to&&n.from<=t.from)&&e.next)return P.undirectionalRange(n.from,n.to)}return t});return!n.eq(e.selection)&&(t(p_(e,n)),!0)};function _v(e,t){let{state:n}=e,r=n.selection,i=n.selection.ranges.slice();for(let r of n.selection.ranges){let a=n.doc.lineAt(r.head);if(t?a.to<e.state.doc.length:a.from>0)for(let n=r;;){let r=e.moveVertically(n,t);if(r.head<a.from||r.head>a.to){i.some(e=>e.head==r.head)||i.push(r);break}if(r.head==n.head)break;n=r}}return i.length!=r.ranges.length&&(e.dispatch(p_(n,P.create(i,i.length-1))),!0)}var vv=e=>_v(e,!1),yv=e=>_v(e,!0),bv=({state:e,dispatch:t})=>{let n=e.selection,r=null;return n.ranges.length>1?r=P.create([n.main]):n.main.empty||(r=P.create([P.cursor(n.main.head)])),r?(t(p_(e,r)),!0):!1};function xv(e,t){if(e.state.readOnly)return!1;let n=`delete.selection`,{state:r}=e,i=r.changeByRange(r=>{let{from:i,to:a}=r;if(i==a){let o=t(r);o<i?(n=`delete.backward`,o=Sv(e,o,!1)):o>i&&(n=`delete.forward`,o=Sv(e,o,!0)),i=Math.min(i,o),a=Math.max(a,o)}else i=Sv(e,i,!1),a=Sv(e,a,!0);return i==a?{range:r}:{changes:{from:i,to:a},range:P.cursor(i,i<r.head?-1:1)}});return!i.changes.empty&&(e.dispatch(r.update(i,{scrollIntoView:!0,userEvent:n,effects:n==`delete.selection`?G.announce.of(r.phrase(`Selection deleted`)):void 0})),!0)}function Sv(e,t,n){if(e instanceof G)for(let r of e.state.facet(G.atomicRanges).map(t=>t(e)))r.between(t,t,(e,r)=>{e<t&&r>t&&(t=n?r:e)});return t}var Cv=(e,t,n)=>xv(e,r=>{let i=r.from,{state:a}=e,o=a.doc.lineAt(i),s,c;if(n&&!t&&i>o.from&&i<o.from+200&&!/[^ \t]/.test(s=o.text.slice(0,i-o.from))){if(s[s.length-1]==`	`)return i-1;let e=Ys(s,a.tabSize)%Nh(a)||Nh(a);for(let t=0;t<e&&s[s.length-1-t]==` `;t++)i--;c=i}else c=To(o.text,i-o.from,t,t)+o.from,c==i&&o.number!=(t?a.doc.lines:1)?c+=t?1:-1:!t&&/[\ufe00-\ufe0f]/.test(o.text.slice(c-o.from,i-o.from))&&(c=To(o.text,c-o.from,!1,!1)+o.from);return c}),wv=e=>Cv(e,!1,!0),Tv=e=>Cv(e,!0,!1),Ev=(e,t)=>xv(e,n=>{let r=n.head,{state:i}=e,a=i.doc.lineAt(r),o=i.charCategorizer(r);for(let e=null;;){if(r==(t?a.to:a.from)){r==n.head&&a.number!=(t?i.doc.lines:1)&&(r+=t?1:-1);break}let s=To(a.text,r-a.from,t)+a.from,c=a.text.slice(Math.min(r,s)-a.from,Math.max(r,s)-a.from),l=o(c);if(e!=null&&l!=e)break;(c!=` `||r!=n.head)&&(e=l),r=s}return r}),Dv=e=>Ev(e,!1),Ov=e=>Ev(e,!0),kv=e=>xv(e,t=>{let n=e.lineBlockAt(t.head).to;return t.head<n?n:Math.min(e.state.doc.length,t.head+1)}),Av=e=>xv(e,t=>{let n=e.moveToLineBoundary(t,!1).head;return t.head>n?n:Math.max(0,t.head-1)}),jv=e=>xv(e,t=>{let n=e.moveToLineBoundary(t,!0).head;return t.head<n?n:Math.min(e.state.doc.length,t.head+1)}),Mv=({state:e,dispatch:t})=>{if(e.readOnly)return!1;let n=e.changeByRange(e=>({changes:{from:e.from,to:e.to,insert:N.of([``,``])},range:P.cursor(e.from)}));return t(e.update(n,{scrollIntoView:!0,userEvent:`input`})),!0},Nv=({state:e,dispatch:t})=>{if(e.readOnly)return!1;let n=e.changeByRange(t=>{if(!t.empty||t.from==0||t.from==e.doc.length)return{range:t};let n=t.from,r=e.doc.lineAt(n),i=n==r.from?n-1:To(r.text,n-r.from,!1)+r.from,a=n==r.to?n+1:To(r.text,n-r.from,!0)+r.from;return{changes:{from:i,to:a,insert:e.doc.slice(n,a).append(e.doc.slice(i,n))},range:P.cursor(a)}});return!n.changes.empty&&(t(e.update(n,{scrollIntoView:!0,userEvent:`move.character`})),!0)};function Pv(e){let t=[],n=-1;for(let r of e.selection.ranges){let i=e.doc.lineAt(r.from),a=e.doc.lineAt(r.to);if(!r.empty&&r.to==a.from&&(a=e.doc.lineAt(r.to-1)),n>=i.number){let e=t[t.length-1];e.to=a.to,e.ranges.push(r)}else t.push({from:i.from,to:a.to,ranges:[r]});n=a.number+1}return t}function Fv(e,t,n){if(e.readOnly)return!1;let r=[],i=[];for(let t of Pv(e)){if(n?t.to==e.doc.length:t.from==0)continue;let a=e.doc.lineAt(n?t.to+1:t.from-1),o=a.length+1;if(n){r.push({from:t.to,to:a.to},{from:t.from,insert:a.text+e.lineBreak});for(let n of t.ranges)i.push(P.range(Math.min(e.doc.length,n.anchor+o),Math.min(e.doc.length,n.head+o)))}else{r.push({from:a.from,to:t.from},{from:t.to,insert:e.lineBreak+a.text});for(let e of t.ranges)i.push(P.range(e.anchor-o,e.head-o))}}return r.length?(t(e.update({changes:r,scrollIntoView:!0,selection:P.create(i,e.selection.mainIndex),userEvent:`move.line`})),!0):!1}var Iv=({state:e,dispatch:t})=>Fv(e,t,!1),Lv=({state:e,dispatch:t})=>Fv(e,t,!0);function Rv(e,t,n){if(e.readOnly)return!1;let r=[];for(let t of Pv(e))n?r.push({from:t.from,insert:e.doc.slice(t.from,t.to)+e.lineBreak}):r.push({from:t.to,insert:e.lineBreak+e.doc.slice(t.from,t.to)});let i=e.changes(r);return t(e.update({changes:i,selection:e.selection.map(i,n?1:-1),scrollIntoView:!0,userEvent:`input.copyline`})),!0}var zv=({state:e,dispatch:t})=>Rv(e,t,!1),Bv=({state:e,dispatch:t})=>Rv(e,t,!0),Vv=e=>{if(e.state.readOnly)return!1;let{state:t}=e,n=t.changes(Pv(t).map(({from:e,to:n})=>(e>0?e--:n<t.doc.length&&n++,{from:e,to:n}))),r=f_(t.selection,t=>{let n;if(e.lineWrapping){let r=e.lineBlockAt(t.head),i=e.coordsAtPos(t.head,t.assoc||1);i&&(n=r.bottom+e.documentTop-i.bottom+e.defaultLineHeight/2)}return e.moveVertically(t,!0,n)}).map(n);return e.dispatch({changes:n,selection:r,scrollIntoView:!0,userEvent:`delete.line`}),!0};function Hv(e,t){if(/\(\)|\[\]|\{\}/.test(e.sliceDoc(t-1,t+1)))return{from:t,to:t};let n=xh(e).resolveInner(t),r=n.childBefore(t),i=n.childAfter(t),a;return r&&i&&r.to<=t&&i.from>=t&&(a=r.type.prop(K.closedBy))&&a.indexOf(i.name)>-1&&e.doc.lineAt(r.to).from==e.doc.lineAt(i.from).from&&!/\S/.test(e.sliceDoc(r.to,i.from))?{from:r.to,to:i.from}:null}var Uv=Gv(!1),Wv=Gv(!0);function Gv(e){return({state:t,dispatch:n})=>{if(t.readOnly)return!1;let r=t.changeByRange(n=>{let{from:r,to:i}=n,a=t.doc.lineAt(r),o=!e&&r==i&&Hv(t,r);e&&(r=i=(i<=a.to?a:t.doc.lineAt(i)).to);let s=new Ih(t,{simulateBreak:r,simulateDoubleBreak:!!o}),c=Fh(s,r);for(c??=Ys(/^\s*/.exec(t.doc.lineAt(r).text)[0],t.tabSize);i<a.to&&/\s/.test(a.text[i-a.from]);)i++;o?{from:r,to:i}=o:r>a.from&&r<a.from+100&&!/\S/.test(a.text.slice(0,r))&&(r=a.from);let l=[``,Ph(t,c)];return o&&l.push(Ph(t,s.lineIndent(a.from,-1))),{changes:{from:r,to:i,insert:N.of(l)},range:P.cursor(r+1+l[1].length)}});return n(t.update(r,{scrollIntoView:!0,userEvent:`input`})),!0}}function Kv(e,t){let n=-1;return e.changeByRange(r=>{let i=[];for(let a=r.from;a<=r.to;){let o=e.doc.lineAt(a);o.number>n&&(r.empty||r.to>o.from)&&(t(o,i,r),n=o.number),a=o.to+1}let a=e.changes(i);return{changes:i,range:P.range(a.mapPos(r.anchor,1),a.mapPos(r.head,1))}})}var qv=({state:e,dispatch:t})=>{if(e.readOnly)return!1;let n=Object.create(null),r=new Ih(e,{overrideIndentation:e=>n[e]??-1}),i=Kv(e,(t,i,a)=>{let o=Fh(r,t.from);if(o==null)return;/\S/.test(t.text)||(o=0);let s=/^\s*/.exec(t.text)[0],c=Ph(e,o);(s!=c||a.from<t.from+s.length)&&(n[t.from]=o,i.push({from:t.from,to:t.from+s.length,insert:c}))});return i.changes.empty||t(e.update(i,{userEvent:`indent`})),!0},Jv=({state:e,dispatch:t})=>!e.readOnly&&(t(e.update(Kv(e,(t,n)=>{n.push({from:t.from,insert:e.facet(Mh)})}),{userEvent:`input.indent`})),!0),Yv=({state:e,dispatch:t})=>!e.readOnly&&(t(e.update(Kv(e,(t,n)=>{let r=/^\s*/.exec(t.text)[0];if(!r)return;let i=Ys(r,e.tabSize),a=0,o=Ph(e,Math.max(0,i-Nh(e)));for(;a<r.length&&a<o.length&&r.charCodeAt(a)==o.charCodeAt(a);)a++;n.push({from:t.from+a,to:t.from+r.length,insert:o.slice(a)})}),{userEvent:`delete.dedent`})),!0),Xv=e=>(e.setTabFocusMode(),!0),Zv=[{key:`Ctrl-b`,run:v_,shift:G_,preventDefault:!0},{key:`Ctrl-f`,run:y_,shift:K_},{key:`Ctrl-p`,run:O_,shift:$_},{key:`Ctrl-n`,run:k_,shift:ev},{key:`Ctrl-a`,run:z_,shift:cv},{key:`Ctrl-e`,run:B_,shift:lv},{key:`Ctrl-d`,run:Tv},{key:`Ctrl-h`,run:wv},{key:`Ctrl-k`,run:kv},{key:`Ctrl-Alt-h`,run:Dv},{key:`Ctrl-o`,run:Mv},{key:`Ctrl-t`,run:Nv},{key:`Ctrl-v`,run:N_}],Qv=[{key:`ArrowLeft`,run:v_,shift:G_,preventDefault:!0},{key:`Mod-ArrowLeft`,mac:`Alt-ArrowLeft`,run:x_,shift:J_,preventDefault:!0},{mac:`Cmd-ArrowLeft`,run:L_,shift:ov,preventDefault:!0},{key:`ArrowRight`,run:y_,shift:K_,preventDefault:!0},{key:`Mod-ArrowRight`,mac:`Alt-ArrowRight`,run:S_,shift:Y_,preventDefault:!0},{mac:`Cmd-ArrowRight`,run:R_,shift:sv,preventDefault:!0},{key:`ArrowUp`,run:O_,shift:$_,preventDefault:!0},{mac:`Cmd-ArrowUp`,run:uv,shift:fv},{mac:`Ctrl-ArrowUp`,run:M_,shift:nv},{key:`ArrowDown`,run:k_,shift:ev,preventDefault:!0},{mac:`Cmd-ArrowDown`,run:dv,shift:pv},{mac:`Ctrl-ArrowDown`,run:N_,shift:rv},{key:`PageUp`,run:M_,shift:nv},{key:`PageDown`,run:N_,shift:rv},{key:`Home`,run:I_,shift:av,preventDefault:!0},{key:`Mod-Home`,run:uv,shift:fv},{key:`End`,run:F_,shift:iv,preventDefault:!0},{key:`Mod-End`,run:dv,shift:pv},{key:`Enter`,run:Uv,shift:Uv},{key:`Mod-a`,run:mv},{key:`Backspace`,run:wv,shift:wv,preventDefault:!0},{key:`Delete`,run:Tv,preventDefault:!0},{key:`Mod-Backspace`,mac:`Alt-Backspace`,run:Dv,preventDefault:!0},{key:`Mod-Delete`,mac:`Alt-Delete`,run:Ov,preventDefault:!0},{mac:`Mod-Backspace`,run:Av,preventDefault:!0},{mac:`Mod-Delete`,run:jv,preventDefault:!0}].concat(Zv.map(e=>({mac:e.key,run:e.run,shift:e.shift}))),$v=[{key:`Alt-ArrowLeft`,mac:`Ctrl-ArrowLeft`,run:T_,shift:X_},{key:`Alt-ArrowRight`,mac:`Ctrl-ArrowRight`,run:E_,shift:Z_},{key:`Alt-ArrowUp`,run:Iv},{key:`Shift-Alt-ArrowUp`,run:zv},{key:`Alt-ArrowDown`,run:Lv},{key:`Shift-Alt-ArrowDown`,run:Bv},{key:`Mod-Alt-ArrowUp`,run:vv},{key:`Mod-Alt-ArrowDown`,run:yv},{key:`Escape`,run:bv},{key:`Mod-Enter`,run:Wv},{key:`Alt-l`,mac:`Ctrl-l`,run:hv},{key:`Mod-i`,run:gv,preventDefault:!0},{key:`Mod-[`,run:Yv},{key:`Mod-]`,run:Jv},{key:`Mod-Alt-\\`,run:qv},{key:`Shift-Mod-k`,run:Vv},{key:`Shift-Mod-\\`,run:H_},{key:`Mod-/`,run:Ag},{key:`Alt-A`,mac:`Ctrl-A`,run:Ng},{key:`Ctrl-m`,mac:`Shift-Alt-m`,run:Xv}].concat(Qv);function ey(e,t){return`\n${/^\t*/.exec(e)?.[0]??``}${/[:：]\s*$/.test(t)?`	`:``}`}var ty=({state:e,dispatch:t})=>{let n=e.changeByRange(t=>{let n=e.doc.lineAt(t.from),r=ey(n.text,n.text.slice(0,t.from-n.from));return{changes:{from:t.from,to:t.to,insert:r},range:P.cursor(t.from+r.length)}});return t(e.update(n,{scrollIntoView:!0,userEvent:`input`})),!0};function ny(e){let t=new Map;for(let n of e.selection.ranges){let r=e.doc.lineAt(n.from).number,i=e.doc.lineAt(n.to).number;for(let n=r;n<=i;n++){let r=e.doc.line(n);t.set(n,{from:r.from,text:r.text})}}return[...t.values()]}var ry=({state:e,dispatch:t})=>{if(e.selection.ranges.every(e=>e.empty))return t(e.update(e.replaceSelection(`	`),{scrollIntoView:!0,userEvent:`input`})),!0;let n=ny(e).map(e=>({from:e.from,insert:`	`}));return t(e.update({changes:n,userEvent:`input.indent`})),!0},iy=({state:e,dispatch:t})=>{let n=ny(e).filter(e=>e.text.startsWith(`	`)).map(e=>({from:e.from,to:e.from+1}));return n.length>0&&t(e.update({changes:n,userEvent:`delete.dedent`})),!0},ay=({state:e,dispatch:t})=>{let n=ny(e).filter(e=>e.text.trim()!==``);if(n.length===0)return!0;let r=e=>/^\t*#/.test(e),i=n.every(e=>r(e.text)),a=n.map(e=>{let t=/^\t*/.exec(e.text)?.[0].length??0;if(i){let n=/^#\s?/.exec(e.text.slice(t))?.[0].length??1;return{from:e.from+t,to:e.from+t+n}}return{from:e.from+t,insert:`# `}});return t(e.update({changes:a,userEvent:`input`})),!0};function oy(e){let t=[],n=null,r=0;for(let i of e.split(`
`)){let e=r+i.length,a=i.trim();n===null&&a===`# ▼ 変えられる`?n=e+1:n!==null&&a===`# ▲ ここまで`&&(t.push({from:n,end:Math.max(n,r-1)}),n=null),r=e+1}return n!==null&&t.push({from:Math.min(n,e.length),end:e.length}),t}function sy(e,t,n){return e.some(e=>e.from<=t&&n<=e.end)}function cy(e){let t=oy(e),n=e.split(`
`),r=[],i=0;for(let e of n)r.push(i),i+=e.length+1;let a=e=>e.trim().startsWith(`#`),o=e=>e.trim()===`# ▼ 変えられる`||e.trim()===`# ▲ ここまで`,s=[];for(let e=0;e<n.length;e++){let i=n[e];if(!a(i)||o(i)||e>0&&n[e-1].trim()!==``)continue;let c=e;for(;c+1<n.length&&n[c+1].trim()!==``;)c+=1;if(c===e)continue;let l=n.slice(e+1,c+1),u=r[e]+i.length,d=r[c]+n[c].length;t.some(e=>e.from<=d&&u<=e.end)||l.some(o)||l.every(a)||s.push({title:i.trim().replace(/^#\s*/,``),from:u,to:d,lines:l.length})}return s}function ly(e){let t=[],n=0;for(let r of e.split(`
`)){let e=/^(?!\s*#).* を (\S+) に する。\s*$/.exec(r);if(e){let r=n+e.index+e[0].lastIndexOf(` を ${e[1]} に する。`)+3;t.push({from:r,to:r+e[1].length})}n+=r.length+1}return t}function uy(e){return e.split(`
`).filter(e=>e.trim()===`# ▼ 変えられる`||e.trim()===`# ▲ ここまで`).length}var dy=L.transactionFilter.of(e=>{if(!e.docChanged)return e;let t=oy(e.startState.doc.toString()),n=!0;return e.changes.iterChanges((e,r)=>{sy(t,e,r)||(n=!1)}),n&&uy(e.newDoc.toString())!==uy(e.startState.doc.toString())&&(n=!1),n?e:[]}),fy=B.line({class:`nk-editable`}),py=B.line({class:`nk-mark`}),my=B.line({class:`nk-locked`});function hy(e){let t=new Rs,n=oy(e.doc.toString());for(let r=1;r<=e.doc.lines;r++){let i=e.doc.line(r),a=i.text.trim();a===`# ▼ 変えられる`||a===`# ▲ ここまで`?t.add(i.from,i.from,py):n.some(e=>e.from<=i.from&&i.to<=e.end)?t.add(i.from,i.from,fy):t.add(i.from,i.from,my)}return t.finish()}var gy=Yo.define({create:hy,update:(e,t)=>t.docChanged?hy(t.state):e,provide:e=>G.decorations.from(e)}),_y=I.define(),vy={主語:`nk-subject`,対象:`nk-object`,相手:`nk-partner`,場所:`nk-place`,"数量・値":`nk-amount`,動作:`nk-action`,条件の印:`nk-condition`,コメント:`nk-comment`},yy=Yo.define({create:()=>B.none,update(e,t){let n=e.map(t.changes);for(let e of t.effects)e.is(_y)&&(n=B.set(e.value,!0));return n},provide:e=>G.decorations.from(e)});function by(e){let t=e.state.doc.toString(),n=Ra(t);if(!n)return;let r=n.filter(e=>e.start<e.end&&e.end<=t.length&&vy[e.kind]).map(e=>B.mark({class:vy[e.kind]}).range(e.start,e.end));e.dispatch({effects:_y.of(r)})}var xy=G.theme({"&":{height:`100%`,fontSize:`var(--editor-font-size)`,backgroundColor:`var(--editor-background)`,color:`var(--ui-text)`},".cm-scroller":{fontFamily:`"BIZ UDGothic", "Cascadia Mono", "MS Gothic", monospace`,lineHeight:`1.65`},".cm-content":{padding:`10px 0`,caretColor:`var(--editor-caret)`},".cm-cursor":{borderLeftColor:`var(--editor-caret)`,borderLeftWidth:`2px`},".cm-gutters":{backgroundColor:`var(--editor-background)`,color:`var(--editor-gutter)`,border:`none`},".cm-lineNumbers .cm-gutterElement":{padding:`0 10px 0 14px`},".cm-activeLine":{backgroundColor:`var(--editor-active-line)`},".cm-activeLineGutter":{backgroundColor:`transparent`,color:`var(--ui-text)`},"&.cm-focused .cm-selectionBackground, .cm-selectionBackground":{backgroundColor:`var(--ui-selected) !important`},".nk-locked":{opacity:.55},".nk-editable":{backgroundColor:`color-mix(in srgb, var(--ui-highlight) 12%, transparent)`,boxShadow:`inset 3px 0 0 var(--ui-highlight)`},".nk-mark":{backgroundColor:`color-mix(in srgb, var(--ui-highlight) 22%, transparent)`,boxShadow:`inset 3px 0 0 var(--ui-highlight)`},".nk-mark .nk-comment":{color:`var(--ui-highlight)`,fontStyle:`normal`,fontWeight:`bold`},".nk-pen":{color:`var(--ui-highlight)`,padding:`0 4px`},".nk-subject":{color:`var(--role-subject)`},".nk-object":{color:`var(--role-object)`},".nk-partner":{color:`var(--role-partner)`},".nk-place":{color:`var(--role-place)`},".nk-amount":{color:`var(--role-amount)`},".nk-action":{color:`var(--role-action)`},".nk-condition":{fontWeight:`bold`,backgroundColor:`var(--ui-tint)`,borderRadius:`3px`},".nk-comment":{color:`var(--editor-comment)`,fontStyle:`italic`},".nk-folded":{marginLeft:`10px`,padding:`0 8px`,borderRadius:`999px`,fontSize:`0.85em`,color:`var(--ui-text-muted)`,backgroundColor:`var(--ui-hover)`,border:`1px solid var(--ui-border)`,cursor:`pointer`},".nk-fold-mark":{color:`var(--editor-gutter)`,cursor:`pointer`,padding:`0 2px`}}),Sy=new class extends Wp{toDOM(){let e=document.createElement(`span`);return e.className=`nk-pen`,e.textContent=`✏`,e}},Cy=Yp({class:`nk-pen-gutter`,markers(e){let t=new Rs,n=oy(e.state.doc.toString());for(let r=1;r<=e.state.doc.lines;r++){let i=e.state.doc.line(r);n.some(e=>e.from<=i.from&&i.to<=e.end)&&t.add(i.from,i.from,Sy)}return t.finish()},initialSpacer:()=>Sy}),wy=qh.of((e,t,n)=>{let r=cy(e.doc.toString()).find(e=>e.from===n);return r&&t<=r.from?{from:r.from,to:r.to}:null}),Ty=sg({preparePlaceholder:(e,t)=>e.doc.lineAt(t.to).number-e.doc.lineAt(t.from).number,placeholderDOM(e,t,n){let r=document.createElement(`span`);return r.className=`nk-folded`,r.textContent=`🔒 ${n}行`,r.title=`押すと開く（書き換えられない行）`,r.onclick=t,r}}),Ey=pg({markerDOM(e){let t=document.createElement(`span`);return t.className=`nk-fold-mark`,t.textContent=e?`▾`:`▸`,t}}),Dy=Yo.define({create:e=>ly(e.doc.toString()),update(e,t){return t.docChanged?e.map(e=>({from:t.changes.mapPos(e.from,-1),to:t.changes.mapPos(e.to,1)})):e}}),Oy=L.transactionFilter.of(e=>{if(!e.docChanged)return e;let t=e.startState.field(Dy),n=!0;return e.changes.iterChanges((e,r,i,a,o)=>{(!t.some(t=>t.from<=e&&r<=t.to)||/[\n\t]/.test(o.toString()))&&(n=!1)}),n?e:[]}),ky=G.decorations.compute([Dy],e=>B.set(e.field(Dy).filter(e=>e.from<e.to).map(e=>B.mark({class:`nk-value`}).range(e.from,e.to)),!0)),Ay=G.theme({".nk-value":{padding:`1px 6px`,borderRadius:`6px`,backgroundColor:`color-mix(in srgb, var(--ui-highlight) 18%, transparent)`,border:`1px solid var(--ui-highlight)`}});function jy(e){return({state:t,dispatch:n})=>{let r=t.field(Dy,!1)??[];if(r.length===0)return!0;let i=t.selection.main.head,a=r.filter(e=>e.to<i).length-1,o=e?r.findIndex(e=>e.from>i):a,s=o===-1?r[e?0:r.length-1]:r[o];return n(t.update({selection:P.range(s.from,s.to),scrollIntoView:!0})),!0}}var My=Qo.highest(gp.of([{key:`Enter`,run:ty},{key:`Tab`,run:ry,shift:iy},{key:`Mod-/`,run:ay}])),Ny=Qo.highest(gp.of([{key:`Tab`,run:jy(!0),shift:jy(!1)},{key:`Enter`,run:()=>!0}])),Py=G.contentAttributes.of({style:`tab-size: 2em`});function Fy(e,t,n=`ステージ`){let r=n===`ステージ`?[Ey,Cy,wy,Ty,dy,gy,My]:[Dy,Oy,ky,Ay,Ny],i=[dm(),...r,Vp(),hm(),Pp(),Kg(),Mh.of(`	`),L.tabSize.of(4),Py,gp.of([...$v,...d_]),yy,xy,G.updateListener.of(e=>{e.docChanged&&(by(e.view),t())})],a=new G({parent:e,state:L.create({doc:``,extensions:i})});return{load(e){if(a.setState(L.create({doc:e,extensions:i})),by(a),n!==`ステージ`)return;let t=oy(e)[0];a.dispatch({effects:[...cy(e).map(e=>$h.of({from:e.from,to:e.to})),...t?[G.scrollIntoView(t.from,{y:`center`})]:[]],selection:t?{anchor:t.from}:void 0})},text:()=>a.state.doc.toString(),composing:()=>a.composing,goTo(e){let t=Math.min(e,a.state.doc.length);a.dispatch({selection:{anchor:t},scrollIntoView:!0}),a.focus()}}}function Iy(e){return e instanceof vt?e.all.map(e=>({message:e.message,at:e.start})):e instanceof E||e instanceof b?[{message:e.message,at:e.start}]:[{message:e instanceof Error?e.message:String(e),at:null}]}function Ly(e,t){return e.slice(0,t).split(`
`).length}var Ry=new URL(`ねこ右ジャンプ-D-tegsyp.png`,import.meta.url).href,zy=new URL(`ねこ右歩き1-DFeRQjxO.png`,import.meta.url).href,By=new URL(`ねこ右歩き2-C9j3ZjY4.png`,import.meta.url).href,Vy=new URL(`ねこ右立ち-yVSSotMM.png`,import.meta.url).href,Hy=new URL(`ねこ左ジャンプ-Cf2QTqL4.png`,import.meta.url).href,Uy=new URL(`ねこ左歩き1-CbTo1o9j.png`,import.meta.url).href,Wy=new URL(`ねこ左歩き2-DzvWM6uP.png`,import.meta.url).href,Gy=new URL(`ねこ左立ち-B4dzWgiV.png`,import.meta.url).href,Ky=new URL(`ねずみ歩き1-CkXy_47m.png`,import.meta.url).href,qy=new URL(`ねずみ歩き2-DZSysLWR.png`,import.meta.url).href,Jy=new URL(`タイトル-IfPuDTDj.png`,import.meta.url).href,Yy=new URL(`ボタン-DSbPDDrh.png`,import.meta.url).href,Xy=new URL(`ボタン明るい-BeaHbUPi.png`,import.meta.url).href,Zy=new URL(`台-D5TuT__M.png`,import.meta.url).href,Qy=new URL(`地面-Ntk4iOVw.png`,import.meta.url).href,$y=new URL(`地面右端-CD3ZM8sP.png`,import.meta.url).href,eb=new URL(`地面左端-BWLOFCIG.png`,import.meta.url).href,tb=new URL(`壁-SFrhQN3T.png`,import.meta.url).href,nb=new URL(`扉-BG9nep7E.png`,import.meta.url).href,rb=new URL(`旗-DVw-pGvv.png`,import.meta.url).href,ib=new URL(`札-BmnT6-d8.png`,import.meta.url).href,ab=new URL(`札クリア-CAy9kkii.png`,import.meta.url).href,ob=new URL(`空-BoShLO8C.png`,import.meta.url).href,sb=new URL(`肉球-C__bgVMw.png`,import.meta.url).href,cb=new URL(`錠-Cid16t7d.png`,import.meta.url).href,lb=new URL(`鍵-BUg4jjct.png`,import.meta.url).href,ub=new URL(`雲中-Ds0hTbSP.png`,import.meta.url).href,db=new URL(`雲大-C5yQJ-6u.png`,import.meta.url).href,fb=new URL(`雲小-hhtSCFHl.png`,import.meta.url).href,pb=new URL(`魚-BIcp8K5Y.png`,import.meta.url).href,mb=new URL(`クリア-C3vp8bcz.mp3`,import.meta.url).href,hb=new URL(`曲-D19jjwT-.mp3`,import.meta.url).href,gb=vb(Object.assign({"../ゲーム/絵/ねこ右ジャンプ.png":Ry,"../ゲーム/絵/ねこ右歩き1.png":zy,"../ゲーム/絵/ねこ右歩き2.png":By,"../ゲーム/絵/ねこ右立ち.png":Vy,"../ゲーム/絵/ねこ左ジャンプ.png":Hy,"../ゲーム/絵/ねこ左歩き1.png":Uy,"../ゲーム/絵/ねこ左歩き2.png":Wy,"../ゲーム/絵/ねこ左立ち.png":Gy,"../ゲーム/絵/ねずみ歩き1.png":Ky,"../ゲーム/絵/ねずみ歩き2.png":qy,"../ゲーム/絵/タイトル.png":Jy,"../ゲーム/絵/ボタン.png":Yy,"../ゲーム/絵/ボタン明るい.png":Xy,"../ゲーム/絵/台.png":Zy,"../ゲーム/絵/地面.png":Qy,"../ゲーム/絵/地面右端.png":$y,"../ゲーム/絵/地面左端.png":eb,"../ゲーム/絵/壁.png":tb,"../ゲーム/絵/扉.png":nb,"../ゲーム/絵/旗.png":rb,"../ゲーム/絵/札.png":ib,"../ゲーム/絵/札クリア.png":ab,"../ゲーム/絵/空.png":ob,"../ゲーム/絵/肉球.png":sb,"../ゲーム/絵/錠.png":cb,"../ゲーム/絵/鍵.png":lb,"../ゲーム/絵/雲中.png":ub,"../ゲーム/絵/雲大.png":db,"../ゲーム/絵/雲小.png":fb,"../ゲーム/絵/魚.png":pb})),_b=vb(Object.assign({"../ゲーム/音/クリア.mp3":mb,"../ゲーム/音/曲.mp3":hb}));function vb(e){return new Map(Object.entries(e).map(([e,t])=>[e.split(`/`).pop(),t]))}var yb=new Map;function bb(e){let t=yb.get(e);if(t instanceof HTMLImageElement)return t;if(!t){let t=gb.get(e);if(!t)return yb.set(e,`ない`),null;yb.set(e,`読み込み中`);let n=new Image;n.onload=()=>yb.set(e,n),n.onerror=()=>yb.set(e,`ない`),n.src=t}return null}var xb={bgm:.03,se:.03},Sb=[];function Cb(e){for(let t of Sb.filter(e))t.audio.pause();Sb=Sb.filter(t=>!e(t))}function wb(){Cb(()=>!0)}function Tb(e,t){xb.bgm=Eb(e),xb.se=Eb(t);for(let e of Sb)e.audio.volume=e.loop?xb.bgm:xb.se}function Eb(e){return Number.isFinite(e)?Math.min(1,Math.max(0,e)):0}function Db(e){for(let t of e)if(t.kind===`鳴らす`||t.kind===`何度も`){let e=t.kind===`何度も`,n=_b.get(t.name);if(!n||e&&Sb.some(e=>e.loop&&e.name===t.name))continue;let r=new Audio(n);r.loop=e,r.volume=e?xb.bgm:xb.se;let i={audio:r,name:t.name,scene:t.scene,loop:e};r.addEventListener(`ended`,()=>{Sb=Sb.filter(e=>e!==i)}),Sb.push(i),r.play().catch(()=>{})}else t.kind===`止める`?wb():Cb(e=>e.loop&&e.scene===t.scene)}var Ob=`nekoto:セーブ`;function kb(){return{cleared:[],texts:{},settings:null,unlockAll:!1,tutorialSeen:!1}}function Ab(e){try{let t=e.getItem(Ob);if(!t)return kb();let n=JSON.parse(t);return{cleared:Array.isArray(n.cleared)?n.cleared.filter(e=>typeof e==`string`):[],texts:n.texts&&typeof n.texts==`object`?n.texts:{},settings:typeof n.settings==`string`?n.settings:null,unlockAll:n.unlockAll===!0,tutorialSeen:n.tutorialSeen===!0}}catch{return kb()}}function jb(e,t){try{return e.setItem(Ob,JSON.stringify(t)),!0}catch{return!1}}function Mb(e){try{e.removeItem(Ob)}catch{}}function Nb(e,t,n){let r=e.texts[t];return r&&r.base===n?r.text:n}function Pb(e,t,n,r){r===n?delete e.texts[t]:e.texts[t]={base:n,text:r}}var Fb=`# ステージ1：ジャンプ
# ねこを旗まで連れていこう。左右キーで歩き、スペースでジャンプ。
# 高い壁があって越えられない。
# ✏ の付いた行は、自由に書き換えてよい。答えは1つじゃない。
# ヒント1：「ねこの力」のところを見てみよう。
# ヒント2：ジャンプの文の数が、跳ぶ高さ。壁の高さは 160 くらい。
# ヒント3：「ねこ を 50 だけ」の 50 を 200 にしてみよう。

# 世界
世界 の 大きさ を 横 2400 縦 450 に する。
カメラ は ねこ を 追う。

# 空と音
# ▼ 変えられる
背景 の 絵 を 「空.png」 に する。
「曲.mp3」 を 何度も 鳴らす。
# ▲ ここまで

# 雲
# ▼ 変えられる
雲 という 四角 を 作る。
雲 の 絵 を 「雲大.png」 に する。
雲 の 幅 を 200 に する。
雲 の 高さ を 100 に する。
雲 は 横 150 縦 300 に いる。
雲 は 横 900 縦 330 に いる。
雲 は 横 1700 縦 310 に いる。
小雲 という 雲 を 作る。
小雲 の 絵 を 「雲小.png」 に する。
小雲 の 幅 を 120 に する。
小雲 の 高さ を 60 に する。
小雲 は 横 550 縦 360 に いる。
小雲 は 横 1300 縦 300 に いる。
小雲 は 横 2100 縦 350 に いる。
# ▲ ここまで

# 地面（80 ずつ並べる）
地面 という 四角 を 作る。
地面 の 絵 を 「地面.png」 に する。
地面 の 幅 を 80 に する。
地面 の 高さ を 80 に する。
置く横 を 0 に する。
30回 繰り返す：
	地面 を 横 (置く横) 縦 0 から 出す。
	置く横 を 置く横 + 80 に する。

# 壁
壁 という 四角 を 作る。
壁 の 絵 を 「壁.png」 に する。
壁 の 幅 を 80 に する。
壁 の 高さ を 80 に する。

# 壁を置く
壁 は 横 1100 縦 80 に いる。
壁 は 横 1100 縦 160 に いる。

# 世界の左右の端（見えない壁。ねこが世界の外へ出ないように。どんなに高く跳んでも越えられないよう、とても高くする）
端 という 壁 を 作る。
端 の 高さ を 1000000000 に する。
端 は 横 -80 縦 0 に いる。
端 は 横 2400 縦 0 に いる。

# ゴール
旗 という 四角 を 作る。
旗 の 絵 を 「旗.png」 に する。
旗 の 幅 を 60 に する。
旗 の 高さ を 180 に する。
旗 は 横 2250 縦 80 に いる。

# ねこ
ねこ という 四角 を 作る。
ねこ の 絵 を 「ねこ右立ち.png」 に する。
ねこ は 横 80 縦 80 に いる。
ねこ は 地面 と 壁 を 通れない。

# ねこの力（大きさ・重さ・歩く速さ・ジャンプ）
# ▼ 変えられる
ねこ の 幅 を 56 に する。
ねこ の 高さ を 56 に する。
ねこ に 重力 を 1500 だけ かける。
ずっと：
	右キー を 押している なら、ねこ を 右 に 5 だけ 動かす。
	左キー を 押している なら、ねこ を 左 に 5 だけ 動かす。
スペース を 押したら、ねこ を 50 だけ 1回 まで ジャンプ させる。
# ▲ ここまで

# ねこの見た目（向き・歩く・ジャンプ）
顔 を 「右」 に する。
空中 を 偽 に する。
スペース を 押したら、空中 を 真 に する。
ねこ が 地面 と 壁 に 上 から 触れたら、空中 を 偽 に する。
ずっと：
	右キー を 押している なら、顔 を 「右」 に する。
	左キー を 押している なら、顔 を 「左」 に する。
	ねこ の 絵 を 「ねこ」 + 顔 + 「立ち.png」 に する。
	右キー を 押している または 左キー を 押している なら、ねこ の 絵 を (「ねこ」 + 顔 + 「歩き1.png」) と (「ねこ」 + 顔 + 「歩き2.png」) に する。
	空中 なら、ねこ の 絵 を 「ねこ」 + 顔 + 「ジャンプ.png」 に する。

# 落ちたら、はじめの場所に戻る（世界の左右の外へ出たときも。外に出たままだと、ねこが片付けられて消えるため）
ずっと：
	ねこ の 縦 < 0 なら、ねこ を 横 80 縦 80 に 動かす。
	(ねこ の 横) < 0 または (ねこ の 横) > 2400 なら、ねこ を 横 80 縦 80 に 動かす。
# とても速く動くと、上の「ずっと」の文で調べる前に、1コマで世界の外へ抜けてしまう。出たらすぐ戻す（「出たら」は、動いたあとに調べる）。
ねこ が 世界 の 下 から 出たら、ねこ を 横 80 縦 80 に 動かす。
ねこ が 世界 の 左 から 出たら、ねこ を 横 80 縦 80 に 動かす。
ねこ が 世界 の 右 から 出たら、ねこ を 横 80 縦 80 に 動かす。

# クリア
クリア を 偽 に する。
ねこ が 旗 に 触れたら、クリア を 真 に する。

# クリアの演出
# ▼ 変えられる
ねこ が 旗 に 触れたら：
	音 を 止める。
	「クリア.mp3」 を 鳴らす。
	「クリア！」 を 赤 で 大きさ 64 で 書く。
# ▲ ここまで

# 自由に書けるところ（文を足してみよう）
# ▼ 変えられる

# ▲ ここまで
`,Ib=`# ステージ2：向き
# ねこを旗まで連れていこう。左右キーで歩き、スペースでジャンプ。
# 右キーを押しても、旗のほうへ進まない。
# ✏ の付いた行は、自由に書き換えてよい。答えは1つじゃない。
# ヒント1：右キーを押したときの文を見てみよう。
# ヒント2：右キーを押したとき、ねこはどっちに動くことになっている？
# ヒント3：右キーの行の「左」を「右」にしてみよう。

# 世界
世界 の 大きさ を 横 2400 縦 450 に する。
カメラ は ねこ を 追う。

# 空と音
# ▼ 変えられる
背景 の 絵 を 「空.png」 に する。
「曲.mp3」 を 何度も 鳴らす。
# ▲ ここまで

# 雲
# ▼ 変えられる
雲 という 四角 を 作る。
雲 の 絵 を 「雲大.png」 に する。
雲 の 幅 を 200 に する。
雲 の 高さ を 100 に する。
雲 は 横 150 縦 300 に いる。
雲 は 横 900 縦 330 に いる。
雲 は 横 1700 縦 310 に いる。
小雲 という 雲 を 作る。
小雲 の 絵 を 「雲小.png」 に する。
小雲 の 幅 を 120 に する。
小雲 の 高さ を 60 に する。
小雲 は 横 550 縦 360 に いる。
小雲 は 横 1300 縦 300 に いる。
小雲 は 横 2100 縦 350 に いる。
# ▲ ここまで

# 地面（80 ずつ並べる）
地面 という 四角 を 作る。
地面 の 絵 を 「地面.png」 に する。
地面 の 幅 を 80 に する。
地面 の 高さ を 80 に する。
置く横 を 0 に する。
30回 繰り返す：
	地面 を 横 (置く横) 縦 0 から 出す。
	置く横 を 置く横 + 80 に する。

# 壁
壁 という 四角 を 作る。
壁 の 絵 を 「壁.png」 に する。
壁 の 幅 を 80 に する。
壁 の 高さ を 80 に する。

# 壁を置く
壁 は 横 700 縦 80 に いる。
壁 は 横 1500 縦 80 に いる。

# 世界の左右の端（見えない壁。ねこが世界の外へ出ないように。どんなに高く跳んでも越えられないよう、とても高くする）
端 という 壁 を 作る。
端 の 高さ を 1000000000 に する。
端 は 横 -80 縦 0 に いる。
端 は 横 2400 縦 0 に いる。

# ゴール
旗 という 四角 を 作る。
旗 の 絵 を 「旗.png」 に する。
旗 の 幅 を 60 に する。
旗 の 高さ を 180 に する。
旗 は 横 2250 縦 80 に いる。

# ねこ
ねこ という 四角 を 作る。
ねこ の 絵 を 「ねこ右立ち.png」 に する。
ねこ は 横 80 縦 80 に いる。
ねこ は 地面 と 壁 を 通れない。

# ねこの力（大きさ・重さ・歩く速さ・ジャンプ）
# ▼ 変えられる
ねこ の 幅 を 56 に する。
ねこ の 高さ を 56 に する。
ねこ に 重力 を 1500 だけ かける。
ずっと：
	右キー を 押している なら、ねこ を 左 に 5 だけ 動かす。
	左キー を 押している なら、ねこ を 左 に 5 だけ 動かす。
スペース を 押したら、ねこ を 200 だけ 1回 まで ジャンプ させる。
# ▲ ここまで

# ねこの見た目（向き・歩く・ジャンプ）
顔 を 「右」 に する。
空中 を 偽 に する。
スペース を 押したら、空中 を 真 に する。
ねこ が 地面 と 壁 に 上 から 触れたら、空中 を 偽 に する。
ずっと：
	右キー を 押している なら、顔 を 「右」 に する。
	左キー を 押している なら、顔 を 「左」 に する。
	ねこ の 絵 を 「ねこ」 + 顔 + 「立ち.png」 に する。
	右キー を 押している または 左キー を 押している なら、ねこ の 絵 を (「ねこ」 + 顔 + 「歩き1.png」) と (「ねこ」 + 顔 + 「歩き2.png」) に する。
	空中 なら、ねこ の 絵 を 「ねこ」 + 顔 + 「ジャンプ.png」 に する。

# 落ちたら、はじめの場所に戻る（世界の左右の外へ出たときも。外に出たままだと、ねこが片付けられて消えるため）
ずっと：
	ねこ の 縦 < 0 なら、ねこ を 横 80 縦 80 に 動かす。
	(ねこ の 横) < 0 または (ねこ の 横) > 2400 なら、ねこ を 横 80 縦 80 に 動かす。
# とても速く動くと、上の「ずっと」の文で調べる前に、1コマで世界の外へ抜けてしまう。出たらすぐ戻す（「出たら」は、動いたあとに調べる）。
ねこ が 世界 の 下 から 出たら、ねこ を 横 80 縦 80 に 動かす。
ねこ が 世界 の 左 から 出たら、ねこ を 横 80 縦 80 に 動かす。
ねこ が 世界 の 右 から 出たら、ねこ を 横 80 縦 80 に 動かす。

# クリア
クリア を 偽 に する。
ねこ が 旗 に 触れたら、クリア を 真 に する。

# クリアの演出
# ▼ 変えられる
ねこ が 旗 に 触れたら：
	音 を 止める。
	「クリア.mp3」 を 鳴らす。
	「クリア！」 を 赤 で 大きさ 64 で 書く。
# ▲ ここまで

# 自由に書けるところ（文を足してみよう）
# ▼ 変えられる

# ▲ ここまで
`,Lb=`# ステージ3：速さ
# ねこを旗まで連れていこう。左右キーで歩き、スペースでジャンプ。
# 穴が広くて跳び越えられない。落ちると、はじめの場所に戻る。
# ✏ の付いた行は、自由に書き換えてよい。答えは1つじゃない。
# ヒント1：跳ぶ高さではなく、横に進む速さが足りない。
# ヒント2：歩く文の「だけ」の前の数が、1コマに進む長さ。
# ヒント3：右キーの行の 2 を 6 にしてみよう。

# 世界
世界 の 大きさ を 横 2400 縦 450 に する。
カメラ は ねこ を 追う。

# 空と音
# ▼ 変えられる
背景 の 絵 を 「空.png」 に する。
「曲.mp3」 を 何度も 鳴らす。
# ▲ ここまで

# 雲
# ▼ 変えられる
雲 という 四角 を 作る。
雲 の 絵 を 「雲大.png」 に する。
雲 の 幅 を 200 に する。
雲 の 高さ を 100 に する。
雲 は 横 150 縦 300 に いる。
雲 は 横 900 縦 330 に いる。
雲 は 横 1700 縦 310 に いる。
小雲 という 雲 を 作る。
小雲 の 絵 を 「雲小.png」 に する。
小雲 の 幅 を 120 に する。
小雲 の 高さ を 60 に する。
小雲 は 横 550 縦 360 に いる。
小雲 は 横 1300 縦 300 に いる。
小雲 は 横 2100 縦 350 に いる。
# ▲ ここまで

# 地面（80 ずつ並べる）
地面 という 四角 を 作る。
地面 の 絵 を 「地面.png」 に する。
地面 の 幅 を 80 に する。
地面 の 高さ を 80 に する。
地面右端 という 地面 を 作る。
地面右端 の 絵 を 「地面右端.png」 に する。
地面左端 という 地面 を 作る。
地面左端 の 絵 を 「地面左端.png」 に する。
置く横 を 0 に する。
10回 繰り返す：
	地面 を 横 (置く横) 縦 0 から 出す。
	置く横 を 置く横 + 80 に する。
地面右端 は 横 800 縦 0 に いる。
地面左端 は 横 1200 縦 0 に いる。
置く横 を 1280 に する。
14回 繰り返す：
	地面 を 横 (置く横) 縦 0 から 出す。
	置く横 を 置く横 + 80 に する。

# 壁
壁 という 四角 を 作る。
壁 の 絵 を 「壁.png」 に する。
壁 の 幅 を 80 に する。
壁 の 高さ を 80 に する。

# 世界の左右の端（見えない壁。ねこが世界の外へ出ないように。どんなに高く跳んでも越えられないよう、とても高くする）
端 という 壁 を 作る。
端 の 高さ を 1000000000 に する。
端 は 横 -80 縦 0 に いる。
端 は 横 2400 縦 0 に いる。

# ゴール
旗 という 四角 を 作る。
旗 の 絵 を 「旗.png」 に する。
旗 の 幅 を 60 に する。
旗 の 高さ を 180 に する。
旗 は 横 2250 縦 80 に いる。

# ねこ
ねこ という 四角 を 作る。
ねこ の 絵 を 「ねこ右立ち.png」 に する。
ねこ は 横 80 縦 80 に いる。
ねこ は 地面 と 壁 を 通れない。

# ねこの力（大きさ・重さ・歩く速さ・ジャンプ）
# ▼ 変えられる
ねこ の 幅 を 56 に する。
ねこ の 高さ を 56 に する。
ねこ に 重力 を 1500 だけ かける。
ずっと：
	右キー を 押している なら、ねこ を 右 に 2 だけ 動かす。
	左キー を 押している なら、ねこ を 左 に 2 だけ 動かす。
スペース を 押したら、ねこ を 200 だけ 1回 まで ジャンプ させる。
# ▲ ここまで

# ねこの見た目（向き・歩く・ジャンプ）
顔 を 「右」 に する。
空中 を 偽 に する。
スペース を 押したら、空中 を 真 に する。
ねこ が 地面 と 壁 に 上 から 触れたら、空中 を 偽 に する。
ずっと：
	右キー を 押している なら、顔 を 「右」 に する。
	左キー を 押している なら、顔 を 「左」 に する。
	ねこ の 絵 を 「ねこ」 + 顔 + 「立ち.png」 に する。
	右キー を 押している または 左キー を 押している なら、ねこ の 絵 を (「ねこ」 + 顔 + 「歩き1.png」) と (「ねこ」 + 顔 + 「歩き2.png」) に する。
	空中 なら、ねこ の 絵 を 「ねこ」 + 顔 + 「ジャンプ.png」 に する。

# 落ちたら、はじめの場所に戻る（世界の左右の外へ出たときも。外に出たままだと、ねこが片付けられて消えるため）
ずっと：
	ねこ の 縦 < 0 なら、ねこ を 横 80 縦 80 に 動かす。
	(ねこ の 横) < 0 または (ねこ の 横) > 2400 なら、ねこ を 横 80 縦 80 に 動かす。
# とても速く動くと、上の「ずっと」の文で調べる前に、1コマで世界の外へ抜けてしまう。出たらすぐ戻す（「出たら」は、動いたあとに調べる）。
ねこ が 世界 の 下 から 出たら、ねこ を 横 80 縦 80 に 動かす。
ねこ が 世界 の 左 から 出たら、ねこ を 横 80 縦 80 に 動かす。
ねこ が 世界 の 右 から 出たら、ねこ を 横 80 縦 80 に 動かす。

# クリア
クリア を 偽 に する。
ねこ が 旗 に 触れたら、クリア を 真 に する。

# クリアの演出
# ▼ 変えられる
ねこ が 旗 に 触れたら：
	音 を 止める。
	「クリア.mp3」 を 鳴らす。
	「クリア！」 を 赤 で 大きさ 64 で 書く。
# ▲ ここまで

# 自由に書けるところ（文を足してみよう）
# ▼ 変えられる

# ▲ ここまで
`,Rb=`# ステージ4：台
# ねこを旗まで連れていこう。左右キーで歩き、スペースでジャンプ。
# 旗は高い壁の上。浮いている台を使いたいけれど、ねこは台をすり抜けてしまう。
# ここからは、2か所以上書き換えないとクリアできない。
# ✏ の付いた行は、自由に書き換えてよい。答えは1つじゃない。
# ヒント1：ねこが台をすり抜けるのは、台に乗る決まりがないから。ジャンプも少し足りない。
# ヒント2：「自由に書けるところ」に、乗る決まりの文を書いてみよう。ジャンプの数も大きく。
# ヒント3：「ねこ は 台 に 乗る。」と書いて、ジャンプを 150 にしてみよう。

# 世界
世界 の 大きさ を 横 2400 縦 450 に する。
カメラ は ねこ を 追う。

# 空と音
# ▼ 変えられる
背景 の 絵 を 「空.png」 に する。
「曲.mp3」 を 何度も 鳴らす。
# ▲ ここまで

# 雲
# ▼ 変えられる
雲 という 四角 を 作る。
雲 の 絵 を 「雲大.png」 に する。
雲 の 幅 を 200 に する。
雲 の 高さ を 100 に する。
雲 は 横 150 縦 300 に いる。
雲 は 横 900 縦 330 に いる。
雲 は 横 1700 縦 310 に いる。
小雲 という 雲 を 作る。
小雲 の 絵 を 「雲小.png」 に する。
小雲 の 幅 を 120 に する。
小雲 の 高さ を 60 に する。
小雲 は 横 550 縦 360 に いる。
小雲 は 横 1300 縦 300 に いる。
小雲 は 横 2100 縦 350 に いる。
# ▲ ここまで

# 地面（80 ずつ並べる）
地面 という 四角 を 作る。
地面 の 絵 を 「地面.png」 に する。
地面 の 幅 を 80 に する。
地面 の 高さ を 80 に する。
置く横 を 0 に する。
30回 繰り返す：
	地面 を 横 (置く横) 縦 0 から 出す。
	置く横 を 置く横 + 80 に する。

# 壁
壁 という 四角 を 作る。
壁 の 絵 を 「壁.png」 に する。
壁 の 幅 を 80 に する。
壁 の 高さ を 80 に する。

# 浮いている台
台 という 四角 を 作る。
台 の 絵 を 「台.png」 に する。
台 の 幅 を 160 に する。
台 の 高さ を 40 に する。
台 は 横 1150 縦 170 に いる。
台 は 横 1450 縦 270 に いる。

# 高い壁（上に旗）
置く横 を 1760 に する。
8回 繰り返す：
	壁 を 横 (置く横) 縦 80 から 出す。
	置く横 を 置く横 + 80 に する。
置く横 を 1760 に する。
8回 繰り返す：
	壁 を 横 (置く横) 縦 160 から 出す。
	置く横 を 置く横 + 80 に する。
置く横 を 1760 に する。
8回 繰り返す：
	壁 を 横 (置く横) 縦 240 から 出す。
	置く横 を 置く横 + 80 に する。

# 世界の左右の端（見えない壁。ねこが世界の外へ出ないように。どんなに高く跳んでも越えられないよう、とても高くする）
端 という 壁 を 作る。
端 の 高さ を 1000000000 に する。
端 は 横 -80 縦 0 に いる。
端 は 横 2400 縦 0 に いる。

# ゴール
旗 という 四角 を 作る。
旗 の 絵 を 「旗.png」 に する。
旗 の 幅 を 60 に する。
旗 の 高さ を 180 に する。
旗 は 横 2250 縦 320 に いる。

# ねこ
ねこ という 四角 を 作る。
ねこ の 絵 を 「ねこ右立ち.png」 に する。
ねこ は 横 80 縦 80 に いる。
ねこ は 地面 と 壁 を 通れない。

# ねこの力（大きさ・重さ・歩く速さ・ジャンプ）
# ▼ 変えられる
ねこ の 幅 を 56 に する。
ねこ の 高さ を 56 に する。
ねこ に 重力 を 1500 だけ かける。
ずっと：
	右キー を 押している なら、ねこ を 右 に 5 だけ 動かす。
	左キー を 押している なら、ねこ を 左 に 5 だけ 動かす。
スペース を 押したら、ねこ を 100 だけ 1回 まで ジャンプ させる。
# ▲ ここまで

# ねこの見た目（向き・歩く・ジャンプ）
顔 を 「右」 に する。
空中 を 偽 に する。
スペース を 押したら、空中 を 真 に する。
ねこ が 地面 と 壁 に 上 から 触れたら、空中 を 偽 に する。
ずっと：
	右キー を 押している なら、顔 を 「右」 に する。
	左キー を 押している なら、顔 を 「左」 に する。
	ねこ の 絵 を 「ねこ」 + 顔 + 「立ち.png」 に する。
	右キー を 押している または 左キー を 押している なら、ねこ の 絵 を (「ねこ」 + 顔 + 「歩き1.png」) と (「ねこ」 + 顔 + 「歩き2.png」) に する。
	空中 なら、ねこ の 絵 を 「ねこ」 + 顔 + 「ジャンプ.png」 に する。

# 落ちたら、はじめの場所に戻る（世界の左右の外へ出たときも。外に出たままだと、ねこが片付けられて消えるため）
ずっと：
	ねこ の 縦 < 0 なら、ねこ を 横 80 縦 80 に 動かす。
	(ねこ の 横) < 0 または (ねこ の 横) > 2400 なら、ねこ を 横 80 縦 80 に 動かす。
# とても速く動くと、上の「ずっと」の文で調べる前に、1コマで世界の外へ抜けてしまう。出たらすぐ戻す（「出たら」は、動いたあとに調べる）。
ねこ が 世界 の 下 から 出たら、ねこ を 横 80 縦 80 に 動かす。
ねこ が 世界 の 左 から 出たら、ねこ を 横 80 縦 80 に 動かす。
ねこ が 世界 の 右 から 出たら、ねこ を 横 80 縦 80 に 動かす。

# クリア
クリア を 偽 に する。
ねこ が 旗 に 触れたら、クリア を 真 に する。

# クリアの演出
# ▼ 変えられる
ねこ が 旗 に 触れたら：
	音 を 止める。
	「クリア.mp3」 を 鳴らす。
	「クリア！」 を 赤 で 大きさ 64 で 書く。
# ▲ ここまで

# 自由に書けるところ（文を足してみよう）
# ▼ 変えられる

# ▲ ここまで
`,zb=`# ステージ5：ねずみ
# ねこを旗まで連れていこう。左右キーで歩き、スペースでジャンプ。
# ねずみに触れると、はじめの場所に戻されてしまう。その先には高い壁も。
# ✏ の付いた行は、自由に書き換えてよい。答えは1つじゃない。
# ヒント1：ねずみに触れたときの文を見てみよう。その先の壁も高い。
# ヒント2：戻される代わりに、ねずみを消すことはできないかな。
# ヒント3：「その ねずみ を 消す。」に書き換えて、ジャンプを 200 にしてみよう。

# 世界
世界 の 大きさ を 横 2400 縦 450 に する。
カメラ は ねこ を 追う。

# 空と音
# ▼ 変えられる
背景 の 絵 を 「空.png」 に する。
「曲.mp3」 を 何度も 鳴らす。
# ▲ ここまで

# 雲
# ▼ 変えられる
雲 という 四角 を 作る。
雲 の 絵 を 「雲大.png」 に する。
雲 の 幅 を 200 に する。
雲 の 高さ を 100 に する。
雲 は 横 150 縦 300 に いる。
雲 は 横 900 縦 330 に いる。
雲 は 横 1700 縦 310 に いる。
小雲 という 雲 を 作る。
小雲 の 絵 を 「雲小.png」 に する。
小雲 の 幅 を 120 に する。
小雲 の 高さ を 60 に する。
小雲 は 横 550 縦 360 に いる。
小雲 は 横 1300 縦 300 に いる。
小雲 は 横 2100 縦 350 に いる。
# ▲ ここまで

# 地面（80 ずつ並べる）
地面 という 四角 を 作る。
地面 の 絵 を 「地面.png」 に する。
地面 の 幅 を 80 に する。
地面 の 高さ を 80 に する。
置く横 を 0 に する。
30回 繰り返す：
	地面 を 横 (置く横) 縦 0 から 出す。
	置く横 を 置く横 + 80 に する。

# 壁
壁 という 四角 を 作る。
壁 の 絵 を 「壁.png」 に する。
壁 の 幅 を 80 に する。
壁 の 高さ を 80 に する。

# ねずみ（ねこの先から、次々わいて左へ歩く）
ねずみ という 四角 を 作る。
ねずみ の 絵 を 「ねずみ歩き1.png」 と 「ねずみ歩き2.png」 に する。
ねずみ の 幅 を 56 に する。
ねずみ の 高さ を 56 に する。
ねずみ に 重力 を 1500 だけ かける。
ねずみ は 地面 を 通れない。
ねずみ は 横 700 縦 80 に いる。
ねずみ は 横 1000 縦 80 に いる。
ねずみ を 2秒 ごと に 横 (ねこ の 横 + 700) 縦 80 から 出す。
ずっと：
	ねずみ を 左 に 2 だけ 動かす。

# 壁を置く
壁 は 横 1700 縦 80 に いる。
壁 は 横 1700 縦 160 に いる。

# 世界の左右の端（見えない壁。ねこが世界の外へ出ないように。どんなに高く跳んでも越えられないよう、とても高くする）
端 という 壁 を 作る。
端 の 高さ を 1000000000 に する。
端 は 横 -80 縦 0 に いる。
端 は 横 2400 縦 0 に いる。

# ゴール
旗 という 四角 を 作る。
旗 の 絵 を 「旗.png」 に する。
旗 の 幅 を 60 に する。
旗 の 高さ を 180 に する。
旗 は 横 2250 縦 80 に いる。

# ねこ
ねこ という 四角 を 作る。
ねこ の 絵 を 「ねこ右立ち.png」 に する。
ねこ は 横 80 縦 80 に いる。
ねこ は 地面 と 壁 を 通れない。

# ねこの力（大きさ・重さ・歩く速さ・ジャンプ）
# ▼ 変えられる
ねこ の 幅 を 56 に する。
ねこ の 高さ を 56 に する。
ねこ に 重力 を 1500 だけ かける。
ずっと：
	右キー を 押している なら、ねこ を 右 に 5 だけ 動かす。
	左キー を 押している なら、ねこ を 左 に 5 だけ 動かす。
スペース を 押したら、ねこ を 100 だけ 1回 まで ジャンプ させる。
# ▲ ここまで

# ねずみに触れたら
# ▼ 変えられる
ねこ が ねずみ に 触れたら、ねこ を 横 80 縦 80 に 動かす。
# ▲ ここまで

# ねこの見た目（向き・歩く・ジャンプ）
顔 を 「右」 に する。
空中 を 偽 に する。
スペース を 押したら、空中 を 真 に する。
ねこ が 地面 と 壁 に 上 から 触れたら、空中 を 偽 に する。
ずっと：
	右キー を 押している なら、顔 を 「右」 に する。
	左キー を 押している なら、顔 を 「左」 に する。
	ねこ の 絵 を 「ねこ」 + 顔 + 「立ち.png」 に する。
	右キー を 押している または 左キー を 押している なら、ねこ の 絵 を (「ねこ」 + 顔 + 「歩き1.png」) と (「ねこ」 + 顔 + 「歩き2.png」) に する。
	空中 なら、ねこ の 絵 を 「ねこ」 + 顔 + 「ジャンプ.png」 に する。

# 落ちたら、はじめの場所に戻る（世界の左右の外へ出たときも。外に出たままだと、ねこが片付けられて消えるため）
ずっと：
	ねこ の 縦 < 0 なら、ねこ を 横 80 縦 80 に 動かす。
	(ねこ の 横) < 0 または (ねこ の 横) > 2400 なら、ねこ を 横 80 縦 80 に 動かす。
# とても速く動くと、上の「ずっと」の文で調べる前に、1コマで世界の外へ抜けてしまう。出たらすぐ戻す（「出たら」は、動いたあとに調べる）。
ねこ が 世界 の 下 から 出たら、ねこ を 横 80 縦 80 に 動かす。
ねこ が 世界 の 左 から 出たら、ねこ を 横 80 縦 80 に 動かす。
ねこ が 世界 の 右 から 出たら、ねこ を 横 80 縦 80 に 動かす。

# クリア
クリア を 偽 に する。
ねこ が 旗 に 触れたら、クリア を 真 に する。

# クリアの演出
# ▼ 変えられる
ねこ が 旗 に 触れたら：
	音 を 止める。
	「クリア.mp3」 を 鳴らす。
	「クリア！」 を 赤 で 大きさ 64 で 書く。
# ▲ ここまで

# 自由に書けるところ（文を足してみよう）
# ▼ 変えられる

# ▲ ここまで
`,Bb=`# ステージ6：壁と穴
# ねこを旗まで連れていこう。左右キーで歩き、スペースでジャンプ。
# 高い壁のあとに、広い穴。
# ✏ の付いた行は、自由に書き換えてよい。答えは1つじゃない。
# ヒント1：壁を越えるのと、穴を越えるのに、それぞれ足りないものがある。
# ヒント2：高さはジャンプの数。遠くまで跳ぶには、歩く速さ。
# ヒント3：ジャンプを 200 に、右キーの行の 2 を 6 にしてみよう。

# 世界
世界 の 大きさ を 横 2400 縦 450 に する。
カメラ は ねこ を 追う。

# 空と音
# ▼ 変えられる
背景 の 絵 を 「空.png」 に する。
「曲.mp3」 を 何度も 鳴らす。
# ▲ ここまで

# 雲
# ▼ 変えられる
雲 という 四角 を 作る。
雲 の 絵 を 「雲大.png」 に する。
雲 の 幅 を 200 に する。
雲 の 高さ を 100 に する。
雲 は 横 150 縦 300 に いる。
雲 は 横 900 縦 330 に いる。
雲 は 横 1700 縦 310 に いる。
小雲 という 雲 を 作る。
小雲 の 絵 を 「雲小.png」 に する。
小雲 の 幅 を 120 に する。
小雲 の 高さ を 60 に する。
小雲 は 横 550 縦 360 に いる。
小雲 は 横 1300 縦 300 に いる。
小雲 は 横 2100 縦 350 に いる。
# ▲ ここまで

# 地面（80 ずつ並べる）
地面 という 四角 を 作る。
地面 の 絵 を 「地面.png」 に する。
地面 の 幅 を 80 に する。
地面 の 高さ を 80 に する。
地面右端 という 地面 を 作る。
地面右端 の 絵 を 「地面右端.png」 に する。
地面左端 という 地面 を 作る。
地面左端 の 絵 を 「地面左端.png」 に する。
置く横 を 0 に する。
17回 繰り返す：
	地面 を 横 (置く横) 縦 0 から 出す。
	置く横 を 置く横 + 80 に する。
地面右端 は 横 1360 縦 0 に いる。
地面左端 は 横 1760 縦 0 に いる。
置く横 を 1840 に する。
7回 繰り返す：
	地面 を 横 (置く横) 縦 0 から 出す。
	置く横 を 置く横 + 80 に する。

# 壁
壁 という 四角 を 作る。
壁 の 絵 を 「壁.png」 に する。
壁 の 幅 を 80 に する。
壁 の 高さ を 80 に する。

# 壁を置く
壁 は 横 900 縦 80 に いる。
壁 は 横 900 縦 160 に いる。

# 世界の左右の端（見えない壁。ねこが世界の外へ出ないように。どんなに高く跳んでも越えられないよう、とても高くする）
端 という 壁 を 作る。
端 の 高さ を 1000000000 に する。
端 は 横 -80 縦 0 に いる。
端 は 横 2400 縦 0 に いる。

# ゴール
旗 という 四角 を 作る。
旗 の 絵 を 「旗.png」 に する。
旗 の 幅 を 60 に する。
旗 の 高さ を 180 に する。
旗 は 横 2250 縦 80 に いる。

# ねこ
ねこ という 四角 を 作る。
ねこ の 絵 を 「ねこ右立ち.png」 に する。
ねこ は 横 80 縦 80 に いる。
ねこ は 地面 と 壁 を 通れない。

# ねこの力（大きさ・重さ・歩く速さ・ジャンプ）
# ▼ 変えられる
ねこ の 幅 を 56 に する。
ねこ の 高さ を 56 に する。
ねこ に 重力 を 1500 だけ かける。
ずっと：
	右キー を 押している なら、ねこ を 右 に 2 だけ 動かす。
	左キー を 押している なら、ねこ を 左 に 2 だけ 動かす。
スペース を 押したら、ねこ を 100 だけ 1回 まで ジャンプ させる。
# ▲ ここまで

# ねこの見た目（向き・歩く・ジャンプ）
顔 を 「右」 に する。
空中 を 偽 に する。
スペース を 押したら、空中 を 真 に する。
ねこ が 地面 と 壁 に 上 から 触れたら、空中 を 偽 に する。
ずっと：
	右キー を 押している なら、顔 を 「右」 に する。
	左キー を 押している なら、顔 を 「左」 に する。
	ねこ の 絵 を 「ねこ」 + 顔 + 「立ち.png」 に する。
	右キー を 押している または 左キー を 押している なら、ねこ の 絵 を (「ねこ」 + 顔 + 「歩き1.png」) と (「ねこ」 + 顔 + 「歩き2.png」) に する。
	空中 なら、ねこ の 絵 を 「ねこ」 + 顔 + 「ジャンプ.png」 に する。

# 落ちたら、はじめの場所に戻る（世界の左右の外へ出たときも。外に出たままだと、ねこが片付けられて消えるため）
ずっと：
	ねこ の 縦 < 0 なら、ねこ を 横 80 縦 80 に 動かす。
	(ねこ の 横) < 0 または (ねこ の 横) > 2400 なら、ねこ を 横 80 縦 80 に 動かす。
# とても速く動くと、上の「ずっと」の文で調べる前に、1コマで世界の外へ抜けてしまう。出たらすぐ戻す（「出たら」は、動いたあとに調べる）。
ねこ が 世界 の 下 から 出たら、ねこ を 横 80 縦 80 に 動かす。
ねこ が 世界 の 左 から 出たら、ねこ を 横 80 縦 80 に 動かす。
ねこ が 世界 の 右 から 出たら、ねこ を 横 80 縦 80 に 動かす。

# クリア
クリア を 偽 に する。
ねこ が 旗 に 触れたら、クリア を 真 に する。

# クリアの演出
# ▼ 変えられる
ねこ が 旗 に 触れたら：
	音 を 止める。
	「クリア.mp3」 を 鳴らす。
	「クリア！」 を 赤 で 大きさ 64 で 書く。
# ▲ ここまで

# 自由に書けるところ（文を足してみよう）
# ▼ 変えられる

# ▲ ここまで
`,Vb=`# ステージ7：がけ
# ねこを旗まで連れていこう。左右キーで歩き、スペースでジャンプ。
# 右キーで左へ行ってしまう。旗は高いがけの上。
# ✏ の付いた行は、自由に書き換えてよい。答えは1つじゃない。
# ヒント1：まずは向き。それから、がけはジャンプ1回では届かない。
# ヒント2：「1回 まで」の数を変えると、空中でもう一度跳べる。
# ヒント3：右キーの行の「左」を「右」に、「1回 まで」を「2回 まで」にしてみよう。

# 世界
世界 の 大きさ を 横 2400 縦 450 に する。
カメラ は ねこ を 追う。

# 空と音
# ▼ 変えられる
背景 の 絵 を 「空.png」 に する。
「曲.mp3」 を 何度も 鳴らす。
# ▲ ここまで

# 雲
# ▼ 変えられる
雲 という 四角 を 作る。
雲 の 絵 を 「雲大.png」 に する。
雲 の 幅 を 200 に する。
雲 の 高さ を 100 に する。
雲 は 横 150 縦 300 に いる。
雲 は 横 900 縦 330 に いる。
雲 は 横 1700 縦 310 に いる。
小雲 という 雲 を 作る。
小雲 の 絵 を 「雲小.png」 に する。
小雲 の 幅 を 120 に する。
小雲 の 高さ を 60 に する。
小雲 は 横 550 縦 360 に いる。
小雲 は 横 1300 縦 300 に いる。
小雲 は 横 2100 縦 350 に いる。
# ▲ ここまで

# 地面（80 ずつ並べる）
地面 という 四角 を 作る。
地面 の 絵 を 「地面.png」 に する。
地面 の 幅 を 80 に する。
地面 の 高さ を 80 に する。
置く横 を 0 に する。
30回 繰り返す：
	地面 を 横 (置く横) 縦 0 から 出す。
	置く横 を 置く横 + 80 に する。

# 壁
壁 という 四角 を 作る。
壁 の 絵 を 「壁.png」 に する。
壁 の 幅 を 80 に する。
壁 の 高さ を 80 に する。

# 高いがけ（上に旗）
置く横 を 1600 に する。
10回 繰り返す：
	壁 を 横 (置く横) 縦 80 から 出す。
	置く横 を 置く横 + 80 に する。
置く横 を 1600 に する。
10回 繰り返す：
	壁 を 横 (置く横) 縦 160 から 出す。
	置く横 を 置く横 + 80 に する。

# 世界の左右の端（見えない壁。ねこが世界の外へ出ないように。どんなに高く跳んでも越えられないよう、とても高くする）
端 という 壁 を 作る。
端 の 高さ を 1000000000 に する。
端 は 横 -80 縦 0 に いる。
端 は 横 2400 縦 0 に いる。

# ゴール
旗 という 四角 を 作る。
旗 の 絵 を 「旗.png」 に する。
旗 の 幅 を 60 に する。
旗 の 高さ を 180 に する。
旗 は 横 2250 縦 240 に いる。

# ねこ
ねこ という 四角 を 作る。
ねこ の 絵 を 「ねこ右立ち.png」 に する。
ねこ は 横 80 縦 80 に いる。
ねこ は 地面 と 壁 を 通れない。

# ねこの力（大きさ・重さ・歩く速さ・ジャンプ）
# ▼ 変えられる
ねこ の 幅 を 56 に する。
ねこ の 高さ を 56 に する。
ねこ に 重力 を 1500 だけ かける。
ずっと：
	右キー を 押している なら、ねこ を 左 に 5 だけ 動かす。
	左キー を 押している なら、ねこ を 左 に 5 だけ 動かす。
スペース を 押したら、ねこ を 150 だけ 1回 まで ジャンプ させる。
# ▲ ここまで

# ねこの見た目（向き・歩く・ジャンプ）
顔 を 「右」 に する。
空中 を 偽 に する。
スペース を 押したら、空中 を 真 に する。
ねこ が 地面 と 壁 に 上 から 触れたら、空中 を 偽 に する。
ずっと：
	右キー を 押している なら、顔 を 「右」 に する。
	左キー を 押している なら、顔 を 「左」 に する。
	ねこ の 絵 を 「ねこ」 + 顔 + 「立ち.png」 に する。
	右キー を 押している または 左キー を 押している なら、ねこ の 絵 を (「ねこ」 + 顔 + 「歩き1.png」) と (「ねこ」 + 顔 + 「歩き2.png」) に する。
	空中 なら、ねこ の 絵 を 「ねこ」 + 顔 + 「ジャンプ.png」 に する。

# 落ちたら、はじめの場所に戻る（世界の左右の外へ出たときも。外に出たままだと、ねこが片付けられて消えるため）
ずっと：
	ねこ の 縦 < 0 なら、ねこ を 横 80 縦 80 に 動かす。
	(ねこ の 横) < 0 または (ねこ の 横) > 2400 なら、ねこ を 横 80 縦 80 に 動かす。
# とても速く動くと、上の「ずっと」の文で調べる前に、1コマで世界の外へ抜けてしまう。出たらすぐ戻す（「出たら」は、動いたあとに調べる）。
ねこ が 世界 の 下 から 出たら、ねこ を 横 80 縦 80 に 動かす。
ねこ が 世界 の 左 から 出たら、ねこ を 横 80 縦 80 に 動かす。
ねこ が 世界 の 右 から 出たら、ねこ を 横 80 縦 80 に 動かす。

# クリア
クリア を 偽 に する。
ねこ が 旗 に 触れたら、クリア を 真 に する。

# クリアの演出
# ▼ 変えられる
ねこ が 旗 に 触れたら：
	音 を 止める。
	「クリア.mp3」 を 鳴らす。
	「クリア！」 を 赤 で 大きさ 64 で 書く。
# ▲ ここまで

# 自由に書けるところ（文を足してみよう）
# ▼ 変えられる

# ▲ ここまで
`,Hb=`# ステージ8：鍵と扉
# ねこを旗まで連れていこう。左右キーで歩き、スペースでジャンプ。
# 扉が閉まっていて通れない。高いところに鍵がある。
# ✏ の付いた行は、自由に書き換えてよい。答えは1つじゃない。
# ヒント1：鍵に触れたら扉が開く、という決まりがまだない。鍵も高いところにある。
# ヒント2：「〜 が 〜 に 触れたら、〜 を 消す。」の形で書けるよ。
# ヒント3：「ねこ が 鍵 に 触れたら、扉 を 消す。」と書いて、ジャンプを 200 にしてみよう。

# 世界
世界 の 大きさ を 横 2400 縦 450 に する。
カメラ は ねこ を 追う。

# 空と音
# ▼ 変えられる
背景 の 絵 を 「空.png」 に する。
「曲.mp3」 を 何度も 鳴らす。
# ▲ ここまで

# 雲
# ▼ 変えられる
雲 という 四角 を 作る。
雲 の 絵 を 「雲大.png」 に する。
雲 の 幅 を 200 に する。
雲 の 高さ を 100 に する。
雲 は 横 150 縦 300 に いる。
雲 は 横 900 縦 330 に いる。
雲 は 横 1700 縦 310 に いる。
小雲 という 雲 を 作る。
小雲 の 絵 を 「雲小.png」 に する。
小雲 の 幅 を 120 に する。
小雲 の 高さ を 60 に する。
小雲 は 横 550 縦 360 に いる。
小雲 は 横 1300 縦 300 に いる。
小雲 は 横 2100 縦 350 に いる。
# ▲ ここまで

# 地面（80 ずつ並べる）
地面 という 四角 を 作る。
地面 の 絵 を 「地面.png」 に する。
地面 の 幅 を 80 に する。
地面 の 高さ を 80 に する。
置く横 を 0 に する。
30回 繰り返す：
	地面 を 横 (置く横) 縦 0 から 出す。
	置く横 を 置く横 + 80 に する。

# 壁
壁 という 四角 を 作る。
壁 の 絵 を 「壁.png」 に する。
壁 の 幅 を 80 に する。
壁 の 高さ を 80 に する。

# 鍵（高いところ）と扉
鍵 という 四角 を 作る。
鍵 の 絵 を 「鍵.png」 に する。
鍵 の 幅 を 50 に する。
鍵 の 高さ を 50 に する。
鍵 は 横 1100 縦 260 に いる。
扉 という 四角 を 作る。
扉 の 絵 を 「扉.png」 に する。
扉 の 幅 を 120 に する。
扉 の 高さ を 300 に する。
扉 は 横 1800 縦 80 に いる。

# 世界の左右の端（見えない壁。ねこが世界の外へ出ないように。どんなに高く跳んでも越えられないよう、とても高くする）
端 という 壁 を 作る。
端 の 高さ を 1000000000 に する。
端 は 横 -80 縦 0 に いる。
端 は 横 2400 縦 0 に いる。

# ゴール
旗 という 四角 を 作る。
旗 の 絵 を 「旗.png」 に する。
旗 の 幅 を 60 に する。
旗 の 高さ を 180 に する。
旗 は 横 2250 縦 80 に いる。

# ねこ
ねこ という 四角 を 作る。
ねこ の 絵 を 「ねこ右立ち.png」 に する。
ねこ は 横 80 縦 80 に いる。
ねこ は 地面 と 壁 と 扉 を 通れない。

# ねこの力（大きさ・重さ・歩く速さ・ジャンプ）
# ▼ 変えられる
ねこ の 幅 を 56 に する。
ねこ の 高さ を 56 に する。
ねこ に 重力 を 1500 だけ かける。
ずっと：
	右キー を 押している なら、ねこ を 右 に 5 だけ 動かす。
	左キー を 押している なら、ねこ を 左 に 5 だけ 動かす。
スペース を 押したら、ねこ を 100 だけ 1回 まで ジャンプ させる。
# ▲ ここまで

# ねこの見た目（向き・歩く・ジャンプ）
顔 を 「右」 に する。
空中 を 偽 に する。
スペース を 押したら、空中 を 真 に する。
ねこ が 地面 と 壁 と 扉 に 上 から 触れたら、空中 を 偽 に する。
ずっと：
	右キー を 押している なら、顔 を 「右」 に する。
	左キー を 押している なら、顔 を 「左」 に する。
	ねこ の 絵 を 「ねこ」 + 顔 + 「立ち.png」 に する。
	右キー を 押している または 左キー を 押している なら、ねこ の 絵 を (「ねこ」 + 顔 + 「歩き1.png」) と (「ねこ」 + 顔 + 「歩き2.png」) に する。
	空中 なら、ねこ の 絵 を 「ねこ」 + 顔 + 「ジャンプ.png」 に する。

# 落ちたら、はじめの場所に戻る（世界の左右の外へ出たときも。外に出たままだと、ねこが片付けられて消えるため）
ずっと：
	ねこ の 縦 < 0 なら、ねこ を 横 80 縦 80 に 動かす。
	(ねこ の 横) < 0 または (ねこ の 横) > 2400 なら、ねこ を 横 80 縦 80 に 動かす。
# とても速く動くと、上の「ずっと」の文で調べる前に、1コマで世界の外へ抜けてしまう。出たらすぐ戻す（「出たら」は、動いたあとに調べる）。
ねこ が 世界 の 下 から 出たら、ねこ を 横 80 縦 80 に 動かす。
ねこ が 世界 の 左 から 出たら、ねこ を 横 80 縦 80 に 動かす。
ねこ が 世界 の 右 から 出たら、ねこ を 横 80 縦 80 に 動かす。

# クリア
クリア を 偽 に する。
ねこ が 旗 に 触れたら、クリア を 真 に する。

# クリアの演出
# ▼ 変えられる
ねこ が 旗 に 触れたら：
	音 を 止める。
	「クリア.mp3」 を 鳴らす。
	「クリア！」 を 赤 で 大きさ 64 で 書く。
# ▲ ここまで

# 自由に書けるところ（文を足してみよう）
# ▼ 変えられる

# ▲ ここまで
`,Ub=`# ステージ9：重い世界
# ねこを旗まで連れていこう。左右キーで歩き、スペースでジャンプ。
# 重力が強くて、穴を跳び越えられない。ねずみもいるし、高い壁もある。
# ✏ の付いた行は、自由に書き換えてよい。答えは1つじゃない。
# ヒント1：重力が強いと、すぐ落ちてしまう。ねずみと壁もある。
# ヒント2：直すのは、重力の数・ねずみに触れたとき・ジャンプの3か所。
# ヒント3：重力を 1500 に、ジャンプを 200 にして、ねずみに触れたら「その ねずみ を 消す。」にしてみよう。

# 世界
世界 の 大きさ を 横 2400 縦 450 に する。
カメラ は ねこ を 追う。

# 空と音
# ▼ 変えられる
背景 の 絵 を 「空.png」 に する。
「曲.mp3」 を 何度も 鳴らす。
# ▲ ここまで

# 雲
# ▼ 変えられる
雲 という 四角 を 作る。
雲 の 絵 を 「雲大.png」 に する。
雲 の 幅 を 200 に する。
雲 の 高さ を 100 に する。
雲 は 横 150 縦 300 に いる。
雲 は 横 900 縦 330 に いる。
雲 は 横 1700 縦 310 に いる。
小雲 という 雲 を 作る。
小雲 の 絵 を 「雲小.png」 に する。
小雲 の 幅 を 120 に する。
小雲 の 高さ を 60 に する。
小雲 は 横 550 縦 360 に いる。
小雲 は 横 1300 縦 300 に いる。
小雲 は 横 2100 縦 350 に いる。
# ▲ ここまで

# 地面（80 ずつ並べる）
地面 という 四角 を 作る。
地面 の 絵 を 「地面.png」 に する。
地面 の 幅 を 80 に する。
地面 の 高さ を 80 に する。
地面右端 という 地面 を 作る。
地面右端 の 絵 を 「地面右端.png」 に する。
地面左端 という 地面 を 作る。
地面左端 の 絵 を 「地面左端.png」 に する。
置く横 を 0 に する。
19回 繰り返す：
	地面 を 横 (置く横) 縦 0 から 出す。
	置く横 を 置く横 + 80 に する。
地面右端 は 横 1520 縦 0 に いる。
地面左端 は 横 1840 縦 0 に いる。
置く横 を 1920 に する。
6回 繰り返す：
	地面 を 横 (置く横) 縦 0 から 出す。
	置く横 を 置く横 + 80 に する。

# 壁
壁 という 四角 を 作る。
壁 の 絵 を 「壁.png」 に する。
壁 の 幅 を 80 に する。
壁 の 高さ を 80 に する。

# ねずみ（ねこの先から、次々わいて左へ歩く）
ねずみ という 四角 を 作る。
ねずみ の 絵 を 「ねずみ歩き1.png」 と 「ねずみ歩き2.png」 に する。
ねずみ の 幅 を 56 に する。
ねずみ の 高さ を 56 に する。
ねずみ に 重力 を 1500 だけ かける。
ねずみ は 地面 を 通れない。
ねずみ は 横 600 縦 80 に いる。
ねずみ は 横 900 縦 80 に いる。
ねずみ を 2秒 ごと に 横 (ねこ の 横 + 700) 縦 80 から 出す。
ずっと：
	ねずみ を 左 に 2 だけ 動かす。

# 壁を置く
壁 は 横 1100 縦 80 に いる。
壁 は 横 1100 縦 160 に いる。

# 世界の左右の端（見えない壁。ねこが世界の外へ出ないように。どんなに高く跳んでも越えられないよう、とても高くする）
端 という 壁 を 作る。
端 の 高さ を 1000000000 に する。
端 は 横 -80 縦 0 に いる。
端 は 横 2400 縦 0 に いる。

# ゴール
旗 という 四角 を 作る。
旗 の 絵 を 「旗.png」 に する。
旗 の 幅 を 60 に する。
旗 の 高さ を 180 に する。
旗 は 横 2250 縦 80 に いる。

# ねこ
ねこ という 四角 を 作る。
ねこ の 絵 を 「ねこ右立ち.png」 に する。
ねこ は 横 80 縦 80 に いる。
ねこ は 地面 と 壁 を 通れない。

# ねこの力（大きさ・重さ・歩く速さ・ジャンプ）
# ▼ 変えられる
ねこ の 幅 を 56 に する。
ねこ の 高さ を 56 に する。
ねこ に 重力 を 6000 だけ かける。
ずっと：
	右キー を 押している なら、ねこ を 右 に 5 だけ 動かす。
	左キー を 押している なら、ねこ を 左 に 5 だけ 動かす。
スペース を 押したら、ねこ を 100 だけ 1回 まで ジャンプ させる。
# ▲ ここまで

# ねずみに触れたら
# ▼ 変えられる
ねこ が ねずみ に 触れたら、ねこ を 横 80 縦 80 に 動かす。
# ▲ ここまで

# ねこの見た目（向き・歩く・ジャンプ）
顔 を 「右」 に する。
空中 を 偽 に する。
スペース を 押したら、空中 を 真 に する。
ねこ が 地面 と 壁 に 上 から 触れたら、空中 を 偽 に する。
ずっと：
	右キー を 押している なら、顔 を 「右」 に する。
	左キー を 押している なら、顔 を 「左」 に する。
	ねこ の 絵 を 「ねこ」 + 顔 + 「立ち.png」 に する。
	右キー を 押している または 左キー を 押している なら、ねこ の 絵 を (「ねこ」 + 顔 + 「歩き1.png」) と (「ねこ」 + 顔 + 「歩き2.png」) に する。
	空中 なら、ねこ の 絵 を 「ねこ」 + 顔 + 「ジャンプ.png」 に する。

# 落ちたら、はじめの場所に戻る（世界の左右の外へ出たときも。外に出たままだと、ねこが片付けられて消えるため）
ずっと：
	ねこ の 縦 < 0 なら、ねこ を 横 80 縦 80 に 動かす。
	(ねこ の 横) < 0 または (ねこ の 横) > 2400 なら、ねこ を 横 80 縦 80 に 動かす。
# とても速く動くと、上の「ずっと」の文で調べる前に、1コマで世界の外へ抜けてしまう。出たらすぐ戻す（「出たら」は、動いたあとに調べる）。
ねこ が 世界 の 下 から 出たら、ねこ を 横 80 縦 80 に 動かす。
ねこ が 世界 の 左 から 出たら、ねこ を 横 80 縦 80 に 動かす。
ねこ が 世界 の 右 から 出たら、ねこ を 横 80 縦 80 に 動かす。

# クリア
クリア を 偽 に する。
ねこ が 旗 に 触れたら、クリア を 真 に する。

# クリアの演出
# ▼ 変えられる
ねこ が 旗 に 触れたら：
	音 を 止める。
	「クリア.mp3」 を 鳴らす。
	「クリア！」 を 赤 で 大きさ 64 で 書く。
# ▲ ここまで

# 自由に書けるところ（文を足してみよう）
# ▼ 変えられる

# ▲ ここまで
`,Wb=`# ステージ10：総まとめ
# ねこを旗まで連れていこう。左右キーで歩き、スペースでジャンプ。
# ここまでの全部。右キーで左へ行くし、ジャンプは低いし、ねずみもいるし、穴も広い。
# ✏ の付いた行は、自由に書き換えてよい。答えは1つじゃない。
# ヒント1：向き・高さ・ねずみ・速さ。ここまでのステージを思い出そう。
# ヒント2：右キーの行は、向きと数の2か所を直す。
# ヒント3：右キーの行を「右 に 6 だけ」に、ジャンプを 200 に、ねずみは「その ねずみ を 消す。」にしてみよう。

# 世界
世界 の 大きさ を 横 2400 縦 450 に する。
カメラ は ねこ を 追う。

# 空と音
# ▼ 変えられる
背景 の 絵 を 「空.png」 に する。
「曲.mp3」 を 何度も 鳴らす。
# ▲ ここまで

# 雲
# ▼ 変えられる
雲 という 四角 を 作る。
雲 の 絵 を 「雲大.png」 に する。
雲 の 幅 を 200 に する。
雲 の 高さ を 100 に する。
雲 は 横 150 縦 300 に いる。
雲 は 横 900 縦 330 に いる。
雲 は 横 1700 縦 310 に いる。
小雲 という 雲 を 作る。
小雲 の 絵 を 「雲小.png」 に する。
小雲 の 幅 を 120 に する。
小雲 の 高さ を 60 に する。
小雲 は 横 550 縦 360 に いる。
小雲 は 横 1300 縦 300 に いる。
小雲 は 横 2100 縦 350 に いる。
# ▲ ここまで

# 地面（80 ずつ並べる）
地面 という 四角 を 作る。
地面 の 絵 を 「地面.png」 に する。
地面 の 幅 を 80 に する。
地面 の 高さ を 80 に する。
地面右端 という 地面 を 作る。
地面右端 の 絵 を 「地面右端.png」 に する。
地面左端 という 地面 を 作る。
地面左端 の 絵 を 「地面左端.png」 に する。
置く横 を 0 に する。
19回 繰り返す：
	地面 を 横 (置く横) 縦 0 から 出す。
	置く横 を 置く横 + 80 に する。
地面右端 は 横 1520 縦 0 に いる。
地面左端 は 横 1920 縦 0 に いる。
置く横 を 2000 に する。
5回 繰り返す：
	地面 を 横 (置く横) 縦 0 から 出す。
	置く横 を 置く横 + 80 に する。

# 壁
壁 という 四角 を 作る。
壁 の 絵 を 「壁.png」 に する。
壁 の 幅 を 80 に する。
壁 の 高さ を 80 に する。

# ねずみ（ねこの先から、次々わいて左へ歩く）
ねずみ という 四角 を 作る。
ねずみ の 絵 を 「ねずみ歩き1.png」 と 「ねずみ歩き2.png」 に する。
ねずみ の 幅 を 56 に する。
ねずみ の 高さ を 56 に する。
ねずみ に 重力 を 1500 だけ かける。
ねずみ は 地面 を 通れない。
ねずみ は 横 700 縦 80 に いる。
ねずみ は 横 1000 縦 80 に いる。
ねずみ を 2秒 ごと に 横 (ねこ の 横 + 700) 縦 80 から 出す。
ずっと：
	ねずみ を 左 に 2 だけ 動かす。

# 壁を置く
壁 は 横 1100 縦 80 に いる。
壁 は 横 1100 縦 160 に いる。

# 世界の左右の端（見えない壁。ねこが世界の外へ出ないように。どんなに高く跳んでも越えられないよう、とても高くする）
端 という 壁 を 作る。
端 の 高さ を 1000000000 に する。
端 は 横 -80 縦 0 に いる。
端 は 横 2400 縦 0 に いる。

# ゴール
旗 という 四角 を 作る。
旗 の 絵 を 「旗.png」 に する。
旗 の 幅 を 60 に する。
旗 の 高さ を 180 に する。
旗 は 横 2250 縦 80 に いる。

# ねこ
ねこ という 四角 を 作る。
ねこ の 絵 を 「ねこ右立ち.png」 に する。
ねこ は 横 80 縦 80 に いる。
ねこ は 地面 と 壁 を 通れない。

# ねこの力（大きさ・重さ・歩く速さ・ジャンプ）
# ▼ 変えられる
ねこ の 幅 を 56 に する。
ねこ の 高さ を 56 に する。
ねこ に 重力 を 1500 だけ かける。
ずっと：
	右キー を 押している なら、ねこ を 左 に 2 だけ 動かす。
	左キー を 押している なら、ねこ を 左 に 2 だけ 動かす。
スペース を 押したら、ねこ を 100 だけ 1回 まで ジャンプ させる。
# ▲ ここまで

# ねずみに触れたら
# ▼ 変えられる
ねこ が ねずみ に 触れたら、ねこ を 横 80 縦 80 に 動かす。
# ▲ ここまで

# ねこの見た目（向き・歩く・ジャンプ）
顔 を 「右」 に する。
空中 を 偽 に する。
スペース を 押したら、空中 を 真 に する。
ねこ が 地面 と 壁 に 上 から 触れたら、空中 を 偽 に する。
ずっと：
	右キー を 押している なら、顔 を 「右」 に する。
	左キー を 押している なら、顔 を 「左」 に する。
	ねこ の 絵 を 「ねこ」 + 顔 + 「立ち.png」 に する。
	右キー を 押している または 左キー を 押している なら、ねこ の 絵 を (「ねこ」 + 顔 + 「歩き1.png」) と (「ねこ」 + 顔 + 「歩き2.png」) に する。
	空中 なら、ねこ の 絵 を 「ねこ」 + 顔 + 「ジャンプ.png」 に する。

# 落ちたら、はじめの場所に戻る（世界の左右の外へ出たときも。外に出たままだと、ねこが片付けられて消えるため）
ずっと：
	ねこ の 縦 < 0 なら、ねこ を 横 80 縦 80 に 動かす。
	(ねこ の 横) < 0 または (ねこ の 横) > 2400 なら、ねこ を 横 80 縦 80 に 動かす。
# とても速く動くと、上の「ずっと」の文で調べる前に、1コマで世界の外へ抜けてしまう。出たらすぐ戻す（「出たら」は、動いたあとに調べる）。
ねこ が 世界 の 下 から 出たら、ねこ を 横 80 縦 80 に 動かす。
ねこ が 世界 の 左 から 出たら、ねこ を 横 80 縦 80 に 動かす。
ねこ が 世界 の 右 から 出たら、ねこ を 横 80 縦 80 に 動かす。

# クリア
クリア を 偽 に する。
ねこ が 旗 に 触れたら、クリア を 真 に する。

# クリアの演出
# ▼ 変えられる
ねこ が 旗 に 触れたら：
	音 を 止める。
	「クリア.mp3」 を 鳴らす。
	「クリア！」 を 赤 で 大きさ 64 で 書く。
# ▲ ここまで

# 自由に書けるところ（文を足してみよう）
# ▼ 変えられる

# ▲ ここまで
`,Gb=`# ステージ11：トゲの天井
# ねこを旗まで連れていこう。左右キーで歩き、スペースでジャンプ。
# ここからは、むずかしいステージ。天井にトゲがあって、高く跳びすぎると戻される。
# その先には、広い穴。
# ✏ の付いた行は、自由に書き換えてよい。答えは1つじゃない。
# ヒント1：跳ぶたびにトゲに当たっている。高ければいい、というわけではない。
# ヒント2：ジャンプはトゲに届かない高さに。穴を越えるには、ほかの数も変えよう。
# ヒント3：ジャンプを 200 に、右キーの行の 2 を 6 にしてみよう。

# 世界
世界 の 大きさ を 横 2400 縦 450 に する。
カメラ は ねこ を 追う。

# 空と音
# ▼ 変えられる
背景 の 絵 を 「空.png」 に する。
「曲.mp3」 を 何度も 鳴らす。
# ▲ ここまで

# 雲
# ▼ 変えられる
雲 という 四角 を 作る。
雲 の 絵 を 「雲大.png」 に する。
雲 の 幅 を 200 に する。
雲 の 高さ を 100 に する。
雲 は 横 150 縦 300 に いる。
雲 は 横 900 縦 330 に いる。
雲 は 横 1700 縦 310 に いる。
小雲 という 雲 を 作る。
小雲 の 絵 を 「雲小.png」 に する。
小雲 の 幅 を 120 に する。
小雲 の 高さ を 60 に する。
小雲 は 横 550 縦 360 に いる。
小雲 は 横 1300 縦 300 に いる。
小雲 は 横 2100 縦 350 に いる。
# ▲ ここまで

# 地面（80 ずつ並べる）
地面 という 四角 を 作る。
地面 の 絵 を 「地面.png」 に する。
地面 の 幅 を 80 に する。
地面 の 高さ を 80 に する。
地面右端 という 地面 を 作る。
地面右端 の 絵 を 「地面右端.png」 に する。
地面左端 という 地面 を 作る。
地面左端 の 絵 を 「地面左端.png」 に する。
置く横 を 0 に する。
10回 繰り返す：
	地面 を 横 (置く横) 縦 0 から 出す。
	置く横 を 置く横 + 80 に する。
地面右端 は 横 800 縦 0 に いる。
地面左端 は 横 1200 縦 0 に いる。
置く横 を 1280 に する。
14回 繰り返す：
	地面 を 横 (置く横) 縦 0 から 出す。
	置く横 を 置く横 + 80 に する。

# 壁
壁 という 四角 を 作る。
壁 の 絵 を 「壁.png」 に する。
壁 の 幅 を 80 に する。
壁 の 高さ を 80 に する。

# トゲの天井（触れると、はじめの場所に戻る）
トゲ という 三角 を 作る。
トゲ の 色 を 赤 に する。
トゲ の 幅 を 80 に する。
トゲ の 高さ を 40 に する。
トゲ の 向き を 180 に する。
置く横 を 0 に する。
30回 繰り返す：
	トゲ を 横 (置く横) 縦 410 から 出す。
	置く横 を 置く横 + 80 に する。
ねこ が トゲ に 触れたら、ねこ を 横 80 縦 80 に 動かす。

# 世界の左右の端（見えない壁。ねこが世界の外へ出ないように。どんなに高く跳んでも越えられないよう、とても高くする）
端 という 壁 を 作る。
端 の 高さ を 1000000000 に する。
端 は 横 -80 縦 0 に いる。
端 は 横 2400 縦 0 に いる。

# ゴール
旗 という 四角 を 作る。
旗 の 絵 を 「旗.png」 に する。
旗 の 幅 を 60 に する。
旗 の 高さ を 180 に する。
旗 は 横 2250 縦 80 に いる。

# ねこ
ねこ という 四角 を 作る。
ねこ の 絵 を 「ねこ右立ち.png」 に する。
ねこ は 横 80 縦 80 に いる。
ねこ は 地面 と 壁 を 通れない。

# ねこの力（大きさ・重さ・歩く速さ・ジャンプ）
# ▼ 変えられる
ねこ の 幅 を 56 に する。
ねこ の 高さ を 56 に する。
ねこ に 重力 を 1500 だけ かける。
ずっと：
	右キー を 押している なら、ねこ を 右 に 2 だけ 動かす。
	左キー を 押している なら、ねこ を 左 に 2 だけ 動かす。
スペース を 押したら、ねこ を 400 だけ 1回 まで ジャンプ させる。
# ▲ ここまで

# ねこの見た目（向き・歩く・ジャンプ）
顔 を 「右」 に する。
空中 を 偽 に する。
スペース を 押したら、空中 を 真 に する。
ねこ が 地面 と 壁 に 上 から 触れたら、空中 を 偽 に する。
ずっと：
	右キー を 押している なら、顔 を 「右」 に する。
	左キー を 押している なら、顔 を 「左」 に する。
	ねこ の 絵 を 「ねこ」 + 顔 + 「立ち.png」 に する。
	右キー を 押している または 左キー を 押している なら、ねこ の 絵 を (「ねこ」 + 顔 + 「歩き1.png」) と (「ねこ」 + 顔 + 「歩き2.png」) に する。
	空中 なら、ねこ の 絵 を 「ねこ」 + 顔 + 「ジャンプ.png」 に する。

# 落ちたら、はじめの場所に戻る（世界の左右の外へ出たときも。外に出たままだと、ねこが片付けられて消えるため）
ずっと：
	ねこ の 縦 < 0 なら、ねこ を 横 80 縦 80 に 動かす。
	(ねこ の 横) < 0 または (ねこ の 横) > 2400 なら、ねこ を 横 80 縦 80 に 動かす。
# とても速く動くと、上の「ずっと」の文で調べる前に、1コマで世界の外へ抜けてしまう。出たらすぐ戻す（「出たら」は、動いたあとに調べる）。
ねこ が 世界 の 下 から 出たら、ねこ を 横 80 縦 80 に 動かす。
ねこ が 世界 の 左 から 出たら、ねこ を 横 80 縦 80 に 動かす。
ねこ が 世界 の 右 から 出たら、ねこ を 横 80 縦 80 に 動かす。

# クリア
クリア を 偽 に する。
ねこ が 旗 に 触れたら、クリア を 真 に する。

# クリアの演出
# ▼ 変えられる
ねこ が 旗 に 触れたら：
	音 を 止める。
	「クリア.mp3」 を 鳴らす。
	「クリア！」 を 赤 で 大きさ 64 で 書く。
# ▲ ここまで

# 自由に書けるところ（文を足してみよう）
# ▼ 変えられる

# ▲ ここまで
`,Kb=`# ステージ12：せまいトンネル
# ねこを旗まで連れていこう。左右キーで歩き、スペースでジャンプ。
# トンネルの天井が低くて、ねこが入れない。トンネルの上は、トゲまでふさがっている。
# トンネルの中には、ねずみもいる。
# ✏ の付いた行は、自由に書き換えてよい。答えは1つじゃない。
# ヒント1：トンネルの天井の下は 50。ねこの高さは？
# ヒント2：「ねこの力」に、ねこの大きさの文がある。トンネルの中のねずみにも気をつけて。
# ヒント3：ねこの高さを 40 にして、ねずみに触れたら「その ねずみ を 消す。」にしてみよう。

# 世界
世界 の 大きさ を 横 2400 縦 450 に する。
カメラ は ねこ を 追う。

# 空と音
# ▼ 変えられる
背景 の 絵 を 「空.png」 に する。
「曲.mp3」 を 何度も 鳴らす。
# ▲ ここまで

# 雲
# ▼ 変えられる
雲 という 四角 を 作る。
雲 の 絵 を 「雲大.png」 に する。
雲 の 幅 を 200 に する。
雲 の 高さ を 100 に する。
雲 は 横 150 縦 300 に いる。
雲 は 横 900 縦 330 に いる。
雲 は 横 1700 縦 310 に いる。
小雲 という 雲 を 作る。
小雲 の 絵 を 「雲小.png」 に する。
小雲 の 幅 を 120 に する。
小雲 の 高さ を 60 に する。
小雲 は 横 550 縦 360 に いる。
小雲 は 横 1300 縦 300 に いる。
小雲 は 横 2100 縦 350 に いる。
# ▲ ここまで

# 地面（80 ずつ並べる）
地面 という 四角 を 作る。
地面 の 絵 を 「地面.png」 に する。
地面 の 幅 を 80 に する。
地面 の 高さ を 80 に する。
置く横 を 0 に する。
30回 繰り返す：
	地面 を 横 (置く横) 縦 0 から 出す。
	置く横 を 置く横 + 80 に する。

# 壁
壁 という 四角 を 作る。
壁 の 絵 を 「壁.png」 に する。
壁 の 幅 を 80 に する。
壁 の 高さ を 80 に する。

# トゲの天井（触れると、はじめの場所に戻る）
トゲ という 三角 を 作る。
トゲ の 色 を 赤 に する。
トゲ の 幅 を 80 に する。
トゲ の 高さ を 40 に する。
トゲ の 向き を 180 に する。
置く横 を 0 に する。
30回 繰り返す：
	トゲ を 横 (置く横) 縦 410 から 出す。
	置く横 を 置く横 + 80 に する。
ねこ が トゲ に 触れたら、ねこ を 横 80 縦 80 に 動かす。

# せまいトンネル（天井の下は 50 しかない）
置く横 を 960 に する。
9回 繰り返す：
	壁 を 横 (置く横) 縦 130 から 出す。
	置く横 を 置く横 + 80 に する。
置く横 を 960 に する。
9回 繰り返す：
	壁 を 横 (置く横) 縦 210 から 出す。
	置く横 を 置く横 + 80 に する。
置く横 を 960 に する。
9回 繰り返す：
	壁 を 横 (置く横) 縦 290 から 出す。
	置く横 を 置く横 + 80 に する。
置く横 を 960 に する。
9回 繰り返す：
	壁 を 横 (置く横) 縦 370 から 出す。
	置く横 を 置く横 + 80 に する。

# ねずみ（ねこの先から、次々わいて左へ歩く）
ねずみ という 四角 を 作る。
ねずみ の 絵 を 「ねずみ歩き1.png」 と 「ねずみ歩き2.png」 に する。
ねずみ の 幅 を 56 に する。
ねずみ の 高さ を 56 に する。
ねずみ に 重力 を 1500 だけ かける。
ねずみ は 地面 を 通れない。
ねずみ は 横 1300 縦 80 に いる。
ねずみ を 2秒 ごと に 横 (ねこ の 横 + 700) 縦 80 から 出す。
ずっと：
	ねずみ を 左 に 2 だけ 動かす。

# 世界の左右の端（見えない壁。ねこが世界の外へ出ないように。どんなに高く跳んでも越えられないよう、とても高くする）
端 という 壁 を 作る。
端 の 高さ を 1000000000 に する。
端 は 横 -80 縦 0 に いる。
端 は 横 2400 縦 0 に いる。

# ゴール
旗 という 四角 を 作る。
旗 の 絵 を 「旗.png」 に する。
旗 の 幅 を 60 に する。
旗 の 高さ を 180 に する。
旗 は 横 2250 縦 80 に いる。

# ねこ
ねこ という 四角 を 作る。
ねこ の 絵 を 「ねこ右立ち.png」 に する。
ねこ は 横 80 縦 80 に いる。
ねこ は 地面 と 壁 を 通れない。

# ねこの力（大きさ・重さ・歩く速さ・ジャンプ）
# ▼ 変えられる
ねこ の 幅 を 56 に する。
ねこ の 高さ を 56 に する。
ねこ に 重力 を 1500 だけ かける。
ずっと：
	右キー を 押している なら、ねこ を 右 に 5 だけ 動かす。
	左キー を 押している なら、ねこ を 左 に 5 だけ 動かす。
スペース を 押したら、ねこ を 200 だけ 1回 まで ジャンプ させる。
# ▲ ここまで

# ねずみに触れたら
# ▼ 変えられる
ねこ が ねずみ に 触れたら、ねこ を 横 80 縦 80 に 動かす。
# ▲ ここまで

# ねこの見た目（向き・歩く・ジャンプ）
顔 を 「右」 に する。
空中 を 偽 に する。
スペース を 押したら、空中 を 真 に する。
ねこ が 地面 と 壁 に 上 から 触れたら、空中 を 偽 に する。
ずっと：
	右キー を 押している なら、顔 を 「右」 に する。
	左キー を 押している なら、顔 を 「左」 に する。
	ねこ の 絵 を 「ねこ」 + 顔 + 「立ち.png」 に する。
	右キー を 押している または 左キー を 押している なら、ねこ の 絵 を (「ねこ」 + 顔 + 「歩き1.png」) と (「ねこ」 + 顔 + 「歩き2.png」) に する。
	空中 なら、ねこ の 絵 を 「ねこ」 + 顔 + 「ジャンプ.png」 に する。

# 落ちたら、はじめの場所に戻る（世界の左右の外へ出たときも。外に出たままだと、ねこが片付けられて消えるため）
ずっと：
	ねこ の 縦 < 0 なら、ねこ を 横 80 縦 80 に 動かす。
	(ねこ の 横) < 0 または (ねこ の 横) > 2400 なら、ねこ を 横 80 縦 80 に 動かす。
# とても速く動くと、上の「ずっと」の文で調べる前に、1コマで世界の外へ抜けてしまう。出たらすぐ戻す（「出たら」は、動いたあとに調べる）。
ねこ が 世界 の 下 から 出たら、ねこ を 横 80 縦 80 に 動かす。
ねこ が 世界 の 左 から 出たら、ねこ を 横 80 縦 80 に 動かす。
ねこ が 世界 の 右 から 出たら、ねこ を 横 80 縦 80 に 動かす。

# クリア
クリア を 偽 に する。
ねこ が 旗 に 触れたら、クリア を 真 に する。

# クリアの演出
# ▼ 変えられる
ねこ が 旗 に 触れたら：
	音 を 止める。
	「クリア.mp3」 を 鳴らす。
	「クリア！」 を 赤 で 大きさ 64 で 書く。
# ▲ ここまで

# 自由に書けるところ（文を足してみよう）
# ▼ 変えられる

# ▲ ここまで
`,qb=`# ステージ13：スイッチの橋
# ねこを旗まで連れていこう。左右キーで歩き、スペースでジャンプ。
# とても広い穴。手前のスイッチを踏むと、橋が出るらしい……けれど、出る場所がおかしい。
# ✏ の付いた行は、自由に書き換えてよい。答えは1つじゃない。
# ヒント1：スイッチを踏むと、橋はどこに出ている？
# ヒント2：「横」は左からの位置、「縦」は下からの位置。穴は横 880 から始まっていて、地面の高さは 80。
# ヒント3：「橋 を 横 880 縦 40 から 出す。」にしてみよう。

# 世界
世界 の 大きさ を 横 2400 縦 450 に する。
カメラ は ねこ を 追う。

# 空と音
# ▼ 変えられる
背景 の 絵 を 「空.png」 に する。
「曲.mp3」 を 何度も 鳴らす。
# ▲ ここまで

# 雲
# ▼ 変えられる
雲 という 四角 を 作る。
雲 の 絵 を 「雲大.png」 に する。
雲 の 幅 を 200 に する。
雲 の 高さ を 100 に する。
雲 は 横 150 縦 300 に いる。
雲 は 横 900 縦 330 に いる。
雲 は 横 1700 縦 310 に いる。
小雲 という 雲 を 作る。
小雲 の 絵 を 「雲小.png」 に する。
小雲 の 幅 を 120 に する。
小雲 の 高さ を 60 に する。
小雲 は 横 550 縦 360 に いる。
小雲 は 横 1300 縦 300 に いる。
小雲 は 横 2100 縦 350 に いる。
# ▲ ここまで

# 地面（80 ずつ並べる）
地面 という 四角 を 作る。
地面 の 絵 を 「地面.png」 に する。
地面 の 幅 を 80 に する。
地面 の 高さ を 80 に する。
地面右端 という 地面 を 作る。
地面右端 の 絵 を 「地面右端.png」 に する。
地面左端 という 地面 を 作る。
地面左端 の 絵 を 「地面左端.png」 に する。
置く横 を 0 に する。
10回 繰り返す：
	地面 を 横 (置く横) 縦 0 から 出す。
	置く横 を 置く横 + 80 に する。
地面右端 は 横 800 縦 0 に いる。
地面左端 は 横 1680 縦 0 に いる。
置く横 を 1760 に する。
8回 繰り返す：
	地面 を 横 (置く横) 縦 0 から 出す。
	置く横 を 置く横 + 80 に する。

# 壁
壁 という 四角 を 作る。
壁 の 絵 を 「壁.png」 に する。
壁 の 幅 を 80 に する。
壁 の 高さ を 80 に する。

# トゲの天井（触れると、はじめの場所に戻る）
トゲ という 三角 を 作る。
トゲ の 色 を 赤 に する。
トゲ の 幅 を 80 に する。
トゲ の 高さ を 40 に する。
トゲ の 向き を 180 に する。
置く横 を 0 に する。
30回 繰り返す：
	トゲ を 横 (置く横) 縦 410 から 出す。
	置く横 を 置く横 + 80 に する。
ねこ が トゲ に 触れたら、ねこ を 横 80 縦 80 に 動かす。

# スイッチと橋
スイッチ という 四角 を 作る。
スイッチ の 色 を 黄 に する。
スイッチ の 幅 を 60 に する。
スイッチ の 高さ を 20 に する。
スイッチ は 横 700 縦 80 に いる。
台 という 四角 を 作る。
台 の 絵 を 「台.png」 に する。
台 の 幅 を 160 に する。
台 の 高さ を 40 に する。
橋 という 台 を 作る。
橋 の 幅 を 800 に する。

# 世界の左右の端（見えない壁。ねこが世界の外へ出ないように。どんなに高く跳んでも越えられないよう、とても高くする）
端 という 壁 を 作る。
端 の 高さ を 1000000000 に する。
端 は 横 -80 縦 0 に いる。
端 は 横 2400 縦 0 に いる。

# ゴール
旗 という 四角 を 作る。
旗 の 絵 を 「旗.png」 に する。
旗 の 幅 を 60 に する。
旗 の 高さ を 180 に する。
旗 は 横 2250 縦 80 に いる。

# ねこ
ねこ という 四角 を 作る。
ねこ の 絵 を 「ねこ右立ち.png」 に する。
ねこ は 横 80 縦 80 に いる。
ねこ は 地面 と 壁 と 台 を 通れない。

# ねこの力（大きさ・重さ・歩く速さ・ジャンプ）
# ▼ 変えられる
ねこ の 幅 を 56 に する。
ねこ の 高さ を 56 に する。
ねこ に 重力 を 1500 だけ かける。
ずっと：
	右キー を 押している なら、ねこ を 右 に 5 だけ 動かす。
	左キー を 押している なら、ねこ を 左 に 5 だけ 動かす。
スペース を 押したら、ねこ を 200 だけ 1回 まで ジャンプ させる。
# ▲ ここまで

# スイッチを踏んだら
# ▼ 変えられる
ねこ が スイッチ に 触れたら、橋 を 横 100 縦 380 から 出す。
# ▲ ここまで

# ねこの見た目（向き・歩く・ジャンプ）
顔 を 「右」 に する。
空中 を 偽 に する。
スペース を 押したら、空中 を 真 に する。
ねこ が 地面 と 壁 と 台 に 上 から 触れたら、空中 を 偽 に する。
ずっと：
	右キー を 押している なら、顔 を 「右」 に する。
	左キー を 押している なら、顔 を 「左」 に する。
	ねこ の 絵 を 「ねこ」 + 顔 + 「立ち.png」 に する。
	右キー を 押している または 左キー を 押している なら、ねこ の 絵 を (「ねこ」 + 顔 + 「歩き1.png」) と (「ねこ」 + 顔 + 「歩き2.png」) に する。
	空中 なら、ねこ の 絵 を 「ねこ」 + 顔 + 「ジャンプ.png」 に する。

# 落ちたら、はじめの場所に戻る（世界の左右の外へ出たときも。外に出たままだと、ねこが片付けられて消えるため）
ずっと：
	ねこ の 縦 < 0 なら、ねこ を 横 80 縦 80 に 動かす。
	(ねこ の 横) < 0 または (ねこ の 横) > 2400 なら、ねこ を 横 80 縦 80 に 動かす。
# とても速く動くと、上の「ずっと」の文で調べる前に、1コマで世界の外へ抜けてしまう。出たらすぐ戻す（「出たら」は、動いたあとに調べる）。
ねこ が 世界 の 下 から 出たら、ねこ を 横 80 縦 80 に 動かす。
ねこ が 世界 の 左 から 出たら、ねこ を 横 80 縦 80 に 動かす。
ねこ が 世界 の 右 から 出たら、ねこ を 横 80 縦 80 に 動かす。

# クリア
クリア を 偽 に する。
ねこ が 旗 に 触れたら、クリア を 真 に する。

# クリアの演出
# ▼ 変えられる
ねこ が 旗 に 触れたら：
	音 を 止める。
	「クリア.mp3」 を 鳴らす。
	「クリア！」 を 赤 で 大きさ 64 で 書く。
# ▲ ここまで

# 自由に書けるところ（文を足してみよう）
# ▼ 変えられる

# ▲ ここまで
`,Jb=`# ステージ14：エレベーター
# ねこを旗まで連れていこう。左右キーで歩き、スペースでジャンプ。
# 旗は高いがけの上。がけの手前にはトゲがあって、跳んでは登れない。
# エレベーターがあるけれど、乗っても動かないし、上まで行かない。
# ✏ の付いた行は、自由に書き換えてよい。答えは1つじゃない。
# ヒント1：エレベーターが動かないのは、エレベーターに乗ったときの文のせい。
# ヒント2：動かすには「動く」を 真 に。上の止まりは、がけの上と同じ高さに（がけの上は 320、エレベーターの厚さは 40）。
# ヒント3：乗ったときの文を「動く を 真 に する。」に、上の止まりを 280 にしてみよう。

# 世界
世界 の 大きさ を 横 2400 縦 450 に する。
カメラ は ねこ を 追う。

# 空と音
# ▼ 変えられる
背景 の 絵 を 「空.png」 に する。
「曲.mp3」 を 何度も 鳴らす。
# ▲ ここまで

# 雲
# ▼ 変えられる
雲 という 四角 を 作る。
雲 の 絵 を 「雲大.png」 に する。
雲 の 幅 を 200 に する。
雲 の 高さ を 100 に する。
雲 は 横 150 縦 300 に いる。
雲 は 横 900 縦 330 に いる。
雲 は 横 1700 縦 310 に いる。
小雲 という 雲 を 作る。
小雲 の 絵 を 「雲小.png」 に する。
小雲 の 幅 を 120 に する。
小雲 の 高さ を 60 に する。
小雲 は 横 550 縦 360 に いる。
小雲 は 横 1300 縦 300 に いる。
小雲 は 横 2100 縦 350 に いる。
# ▲ ここまで

# 地面（80 ずつ並べる）
地面 という 四角 を 作る。
地面 の 絵 を 「地面.png」 に する。
地面 の 幅 を 80 に する。
地面 の 高さ を 80 に する。
地面右端 という 地面 を 作る。
地面右端 の 絵 を 「地面右端.png」 に する。
地面左端 という 地面 を 作る。
地面左端 の 絵 を 「地面左端.png」 に する。
置く横 を 0 に する。
19回 繰り返す：
	地面 を 横 (置く横) 縦 0 から 出す。
	置く横 を 置く横 + 80 に する。
地面右端 は 横 1520 縦 0 に いる。
地面左端 は 横 1760 縦 0 に いる。
置く横 を 1840 に する。
7回 繰り返す：
	地面 を 横 (置く横) 縦 0 から 出す。
	置く横 を 置く横 + 80 に する。

# 壁
壁 という 四角 を 作る。
壁 の 絵 を 「壁.png」 に する。
壁 の 幅 を 80 に する。
壁 の 高さ を 80 に する。

# トゲの天井（触れると、はじめの場所に戻る）
トゲ という 三角 を 作る。
トゲ の 色 を 赤 に する。
トゲ の 幅 を 80 に する。
トゲ の 高さ を 40 に する。
トゲ の 向き を 180 に する。
置く横 を 0 に する。
30回 繰り返す：
	トゲ を 横 (置く横) 縦 410 から 出す。
	置く横 を 置く横 + 80 に する。
ねこ が トゲ に 触れたら、ねこ を 横 80 縦 80 に 動かす。

# がけの手前の低いトゲ
置く横 を 1100 に する。
6回 繰り返す：
	トゲ を 横 (置く横) 縦 250 から 出す。
	置く横 を 置く横 + 80 に する。

# 高いがけ（上に旗）
置く横 を 1760 に する。
8回 繰り返す：
	壁 を 横 (置く横) 縦 80 から 出す。
	置く横 を 置く横 + 80 に する。
置く横 を 1760 に する。
8回 繰り返す：
	壁 を 横 (置く横) 縦 160 から 出す。
	置く横 を 置く横 + 80 に する。
置く横 を 1760 に する。
8回 繰り返す：
	壁 を 横 (置く横) 縦 240 から 出す。
	置く横 を 置く横 + 80 に する。

# エレベーター（乗ると動く……はず）
台 という 四角 を 作る。
台 の 絵 を 「台.png」 に する。
台 の 幅 を 160 に する。
台 の 高さ を 40 に する。
エレベーター という 台 を 作る。
エレベーター は 横 1600 縦 40 に いる。
動く を 偽 に する。

# 世界の左右の端（見えない壁。ねこが世界の外へ出ないように。どんなに高く跳んでも越えられないよう、とても高くする）
端 という 壁 を 作る。
端 の 高さ を 1000000000 に する。
端 は 横 -80 縦 0 に いる。
端 は 横 2400 縦 0 に いる。

# ゴール
旗 という 四角 を 作る。
旗 の 絵 を 「旗.png」 に する。
旗 の 幅 を 60 に する。
旗 の 高さ を 180 に する。
旗 は 横 2250 縦 320 に いる。

# ねこ
ねこ という 四角 を 作る。
ねこ の 絵 を 「ねこ右立ち.png」 に する。
ねこ は 横 80 縦 80 に いる。
ねこ は 地面 と 壁 と 台 を 通れない。

# ねこの力（大きさ・重さ・歩く速さ・ジャンプ）
# ▼ 変えられる
ねこ の 幅 を 56 に する。
ねこ の 高さ を 56 に する。
ねこ に 重力 を 1500 だけ かける。
ずっと：
	右キー を 押している なら、ねこ を 右 に 5 だけ 動かす。
	左キー を 押している なら、ねこ を 左 に 5 だけ 動かす。
スペース を 押したら、ねこ を 200 だけ 1回 まで ジャンプ させる。
# ▲ ここまで

# エレベーター
# ▼ 変えられる
上の止まり を 150 に する。
ねこ が エレベーター に 上 から 触れたら、動く を 偽 に する。
# ▲ ここまで

# エレベーターの動き（下の止まり 40 と、上の止まりの間を行ったり来たり）
上がる を 真 に する。
ずっと：
	動く なら：
		上がる なら、エレベーター を 上 に 2 だけ 動かす。
		上がる = 偽 なら、エレベーター を 下 に 2 だけ 動かす。
		(エレベーター の 縦) >= 上の止まり なら、上がる を 偽 に する。
		(エレベーター の 縦) <= 40 なら、上がる を 真 に する。

# ねこの見た目（向き・歩く・ジャンプ）
顔 を 「右」 に する。
空中 を 偽 に する。
スペース を 押したら、空中 を 真 に する。
ねこ が 地面 と 壁 と 台 に 上 から 触れたら、空中 を 偽 に する。
ずっと：
	右キー を 押している なら、顔 を 「右」 に する。
	左キー を 押している なら、顔 を 「左」 に する。
	ねこ の 絵 を 「ねこ」 + 顔 + 「立ち.png」 に する。
	右キー を 押している または 左キー を 押している なら、ねこ の 絵 を (「ねこ」 + 顔 + 「歩き1.png」) と (「ねこ」 + 顔 + 「歩き2.png」) に する。
	空中 なら、ねこ の 絵 を 「ねこ」 + 顔 + 「ジャンプ.png」 に する。

# 落ちたら、はじめの場所に戻る（世界の左右の外へ出たときも。外に出たままだと、ねこが片付けられて消えるため）
ずっと：
	ねこ の 縦 < 0 なら、ねこ を 横 80 縦 80 に 動かす。
	(ねこ の 横) < 0 または (ねこ の 横) > 2400 なら、ねこ を 横 80 縦 80 に 動かす。
# とても速く動くと、上の「ずっと」の文で調べる前に、1コマで世界の外へ抜けてしまう。出たらすぐ戻す（「出たら」は、動いたあとに調べる）。
ねこ が 世界 の 下 から 出たら、ねこ を 横 80 縦 80 に 動かす。
ねこ が 世界 の 左 から 出たら、ねこ を 横 80 縦 80 に 動かす。
ねこ が 世界 の 右 から 出たら、ねこ を 横 80 縦 80 に 動かす。

# クリア
クリア を 偽 に する。
ねこ が 旗 に 触れたら、クリア を 真 に する。

# クリアの演出
# ▼ 変えられる
ねこ が 旗 に 触れたら：
	音 を 止める。
	「クリア.mp3」 を 鳴らす。
	「クリア！」 を 赤 で 大きさ 64 で 書く。
# ▲ ここまで

# 自由に書けるところ（文を足してみよう）
# ▼ 変えられる

# ▲ ここまで
`,Yb=`# ステージ15：魚あつめ
# ねこを旗まで連れていこう。左右キーで歩き、スペースでジャンプ。
# 魚を集めると、旗の前の扉が開く。でも、魚の数え方がおかしいし、1匹はトゲの近くにいる。
# ✏ の付いた行は、自由に書き換えてよい。答えは1つじゃない。
# ヒント1：左上の魚の数を見ながら、魚に触れてみよう。数は増えている？
# ヒント2：「集めた + 0」では増えない。それと、トゲの近くの魚は取れなくても大丈夫にできないかな。
# ヒント3：「集めた + 1」にして、必要を 2 にしてみよう。

# 世界
世界 の 大きさ を 横 2400 縦 450 に する。
カメラ は ねこ を 追う。

# 空と音
# ▼ 変えられる
背景 の 絵 を 「空.png」 に する。
「曲.mp3」 を 何度も 鳴らす。
# ▲ ここまで

# 雲
# ▼ 変えられる
雲 という 四角 を 作る。
雲 の 絵 を 「雲大.png」 に する。
雲 の 幅 を 200 に する。
雲 の 高さ を 100 に する。
雲 は 横 150 縦 300 に いる。
雲 は 横 900 縦 330 に いる。
雲 は 横 1700 縦 310 に いる。
小雲 という 雲 を 作る。
小雲 の 絵 を 「雲小.png」 に する。
小雲 の 幅 を 120 に する。
小雲 の 高さ を 60 に する。
小雲 は 横 550 縦 360 に いる。
小雲 は 横 1300 縦 300 に いる。
小雲 は 横 2100 縦 350 に いる。
# ▲ ここまで

# 地面（80 ずつ並べる）
地面 という 四角 を 作る。
地面 の 絵 を 「地面.png」 に する。
地面 の 幅 を 80 に する。
地面 の 高さ を 80 に する。
置く横 を 0 に する。
30回 繰り返す：
	地面 を 横 (置く横) 縦 0 から 出す。
	置く横 を 置く横 + 80 に する。

# 壁
壁 という 四角 を 作る。
壁 の 絵 を 「壁.png」 に する。
壁 の 幅 を 80 に する。
壁 の 高さ を 80 に する。

# トゲの天井（触れると、はじめの場所に戻る）
トゲ という 三角 を 作る。
トゲ の 色 を 赤 に する。
トゲ の 幅 を 80 に する。
トゲ の 高さ を 40 に する。
トゲ の 向き を 180 に する。
置く横 を 0 に する。
30回 繰り返す：
	トゲ を 横 (置く横) 縦 410 から 出す。
	置く横 を 置く横 + 80 に する。
ねこ が トゲ に 触れたら、ねこ を 横 80 縦 80 に 動かす。

# 魚
魚 という 四角 を 作る。
魚 の 絵 を 「魚.png」 に する。
魚 の 幅 を 40 に する。
魚 の 高さ を 40 に する。
魚 は 横 600 縦 100 に いる。
魚 は 横 1100 縦 100 に いる。
魚 は 横 1500 縦 400 に いる。
集めた を 0 に する。

# 扉（集めたら開く）
扉 という 四角 を 作る。
扉 の 絵 を 「扉.png」 に する。
扉 の 幅 を 120 に する。
扉 の 高さ を 300 に する。
扉 は 横 2000 縦 80 に いる。

# 世界の左右の端（見えない壁。ねこが世界の外へ出ないように。どんなに高く跳んでも越えられないよう、とても高くする）
端 という 壁 を 作る。
端 の 高さ を 1000000000 に する。
端 は 横 -80 縦 0 に いる。
端 は 横 2400 縦 0 に いる。

# ゴール
旗 という 四角 を 作る。
旗 の 絵 を 「旗.png」 に する。
旗 の 幅 を 60 に する。
旗 の 高さ を 180 に する。
旗 は 横 2250 縦 80 に いる。

# ねこ
ねこ という 四角 を 作る。
ねこ の 絵 を 「ねこ右立ち.png」 に する。
ねこ は 横 80 縦 80 に いる。
ねこ は 地面 と 壁 と 扉 を 通れない。

# ねこの力（大きさ・重さ・歩く速さ・ジャンプ）
# ▼ 変えられる
ねこ の 幅 を 56 に する。
ねこ の 高さ を 56 に する。
ねこ に 重力 を 1500 だけ かける。
ずっと：
	右キー を 押している なら、ねこ を 右 に 5 だけ 動かす。
	左キー を 押している なら、ねこ を 左 に 5 だけ 動かす。
スペース を 押したら、ねこ を 200 だけ 1回 まで ジャンプ させる。
# ▲ ここまで

# 魚を集める
# ▼ 変えられる
必要 を 3 に する。
ねこ が 魚 に 触れたら：
	その 魚 を 消す。
	集めた を 集めた + 0 に する。
# ▲ ここまで

# 集めた数を出して、必要な数になったら扉を開ける
「魚：」 + 集めた + 「 / 」 + 必要 を 横 90 縦 420 に 書く。
ずっと：
	集めた >= 必要 なら、扉 を 消す。

# ねこの見た目（向き・歩く・ジャンプ）
顔 を 「右」 に する。
空中 を 偽 に する。
スペース を 押したら、空中 を 真 に する。
ねこ が 地面 と 壁 と 扉 に 上 から 触れたら、空中 を 偽 に する。
ずっと：
	右キー を 押している なら、顔 を 「右」 に する。
	左キー を 押している なら、顔 を 「左」 に する。
	ねこ の 絵 を 「ねこ」 + 顔 + 「立ち.png」 に する。
	右キー を 押している または 左キー を 押している なら、ねこ の 絵 を (「ねこ」 + 顔 + 「歩き1.png」) と (「ねこ」 + 顔 + 「歩き2.png」) に する。
	空中 なら、ねこ の 絵 を 「ねこ」 + 顔 + 「ジャンプ.png」 に する。

# 落ちたら、はじめの場所に戻る（世界の左右の外へ出たときも。外に出たままだと、ねこが片付けられて消えるため）
ずっと：
	ねこ の 縦 < 0 なら、ねこ を 横 80 縦 80 に 動かす。
	(ねこ の 横) < 0 または (ねこ の 横) > 2400 なら、ねこ を 横 80 縦 80 に 動かす。
# とても速く動くと、上の「ずっと」の文で調べる前に、1コマで世界の外へ抜けてしまう。出たらすぐ戻す（「出たら」は、動いたあとに調べる）。
ねこ が 世界 の 下 から 出たら、ねこ を 横 80 縦 80 に 動かす。
ねこ が 世界 の 左 から 出たら、ねこ を 横 80 縦 80 に 動かす。
ねこ が 世界 の 右 から 出たら、ねこ を 横 80 縦 80 に 動かす。

# クリア
クリア を 偽 に する。
ねこ が 旗 に 触れたら、クリア を 真 に する。

# クリアの演出
# ▼ 変えられる
ねこ が 旗 に 触れたら：
	音 を 止める。
	「クリア.mp3」 を 鳴らす。
	「クリア！」 を 赤 で 大きさ 64 で 書く。
# ▲ ここまで

# 自由に書けるところ（文を足してみよう）
# ▼ 変えられる

# ▲ ここまで
`,Xb=`# ステージ16：向かい風
# ねこを旗まで連れていこう。左右キーで歩き、スペースでジャンプ。
# 強い向かい風で、前に進めない。ねずみもやってくる。
# ✏ の付いた行は、自由に書き換えてよい。答えは1つじゃない。
# ヒント1：向かい風の文を見てみよう。ねこはいつも左に押されている。
# ヒント2：風を弱くするか、なくしてみよう。ねずみに触れたときの文も。
# ヒント3：風を「左 に 1 だけ」にして、ねずみに触れたら「その ねずみ を 消す。」にしてみよう。

# 世界
世界 の 大きさ を 横 2400 縦 450 に する。
カメラ は ねこ を 追う。

# 空と音
# ▼ 変えられる
背景 の 絵 を 「空.png」 に する。
「曲.mp3」 を 何度も 鳴らす。
# ▲ ここまで

# 雲
# ▼ 変えられる
雲 という 四角 を 作る。
雲 の 絵 を 「雲大.png」 に する。
雲 の 幅 を 200 に する。
雲 の 高さ を 100 に する。
雲 は 横 150 縦 300 に いる。
雲 は 横 900 縦 330 に いる。
雲 は 横 1700 縦 310 に いる。
小雲 という 雲 を 作る。
小雲 の 絵 を 「雲小.png」 に する。
小雲 の 幅 を 120 に する。
小雲 の 高さ を 60 に する。
小雲 は 横 550 縦 360 に いる。
小雲 は 横 1300 縦 300 に いる。
小雲 は 横 2100 縦 350 に いる。
# ▲ ここまで

# 地面（80 ずつ並べる）
地面 という 四角 を 作る。
地面 の 絵 を 「地面.png」 に する。
地面 の 幅 を 80 に する。
地面 の 高さ を 80 に する。
置く横 を 0 に する。
30回 繰り返す：
	地面 を 横 (置く横) 縦 0 から 出す。
	置く横 を 置く横 + 80 に する。

# 壁
壁 という 四角 を 作る。
壁 の 絵 を 「壁.png」 に する。
壁 の 幅 を 80 に する。
壁 の 高さ を 80 に する。

# トゲの天井（触れると、はじめの場所に戻る）
トゲ という 三角 を 作る。
トゲ の 色 を 赤 に する。
トゲ の 幅 を 80 に する。
トゲ の 高さ を 40 に する。
トゲ の 向き を 180 に する。
置く横 を 0 に する。
30回 繰り返す：
	トゲ を 横 (置く横) 縦 410 から 出す。
	置く横 を 置く横 + 80 に する。
ねこ が トゲ に 触れたら、ねこ を 横 80 縦 80 に 動かす。

# ねずみ（ねこの先から、次々わいて左へ歩く）
ねずみ という 四角 を 作る。
ねずみ の 絵 を 「ねずみ歩き1.png」 と 「ねずみ歩き2.png」 に する。
ねずみ の 幅 を 56 に する。
ねずみ の 高さ を 56 に する。
ねずみ に 重力 を 1500 だけ かける。
ねずみ は 地面 を 通れない。
ねずみ は 横 900 縦 80 に いる。
ねずみ は 横 1500 縦 80 に いる。
ねずみ を 2秒 ごと に 横 (ねこ の 横 + 700) 縦 80 から 出す。
ずっと：
	ねずみ を 左 に 2 だけ 動かす。

# 世界の左右の端（見えない壁。ねこが世界の外へ出ないように。どんなに高く跳んでも越えられないよう、とても高くする）
端 という 壁 を 作る。
端 の 高さ を 1000000000 に する。
端 は 横 -80 縦 0 に いる。
端 は 横 2400 縦 0 に いる。

# ゴール
旗 という 四角 を 作る。
旗 の 絵 を 「旗.png」 に する。
旗 の 幅 を 60 に する。
旗 の 高さ を 180 に する。
旗 は 横 2250 縦 80 に いる。

# ねこ
ねこ という 四角 を 作る。
ねこ の 絵 を 「ねこ右立ち.png」 に する。
ねこ は 横 80 縦 80 に いる。
ねこ は 地面 と 壁 を 通れない。

# ねこの力（大きさ・重さ・歩く速さ・ジャンプ）
# ▼ 変えられる
ねこ の 幅 を 56 に する。
ねこ の 高さ を 56 に する。
ねこ に 重力 を 1500 だけ かける。
ずっと：
	右キー を 押している なら、ねこ を 右 に 5 だけ 動かす。
	左キー を 押している なら、ねこ を 左 に 5 だけ 動かす。
スペース を 押したら、ねこ を 200 だけ 1回 まで ジャンプ させる。
# ▲ ここまで

# 向かい風
# ▼ 変えられる
ずっと：
	ねこ を 左 に 6 だけ 動かす。
# ▲ ここまで

# ねずみに触れたら
# ▼ 変えられる
ねこ が ねずみ に 触れたら、ねこ を 横 80 縦 80 に 動かす。
# ▲ ここまで

# ねこの見た目（向き・歩く・ジャンプ）
顔 を 「右」 に する。
空中 を 偽 に する。
スペース を 押したら、空中 を 真 に する。
ねこ が 地面 と 壁 に 上 から 触れたら、空中 を 偽 に する。
ずっと：
	右キー を 押している なら、顔 を 「右」 に する。
	左キー を 押している なら、顔 を 「左」 に する。
	ねこ の 絵 を 「ねこ」 + 顔 + 「立ち.png」 に する。
	右キー を 押している または 左キー を 押している なら、ねこ の 絵 を (「ねこ」 + 顔 + 「歩き1.png」) と (「ねこ」 + 顔 + 「歩き2.png」) に する。
	空中 なら、ねこ の 絵 を 「ねこ」 + 顔 + 「ジャンプ.png」 に する。

# 落ちたら、はじめの場所に戻る（世界の左右の外へ出たときも。外に出たままだと、ねこが片付けられて消えるため）
ずっと：
	ねこ の 縦 < 0 なら、ねこ を 横 80 縦 80 に 動かす。
	(ねこ の 横) < 0 または (ねこ の 横) > 2400 なら、ねこ を 横 80 縦 80 に 動かす。
# とても速く動くと、上の「ずっと」の文で調べる前に、1コマで世界の外へ抜けてしまう。出たらすぐ戻す（「出たら」は、動いたあとに調べる）。
ねこ が 世界 の 下 から 出たら、ねこ を 横 80 縦 80 に 動かす。
ねこ が 世界 の 左 から 出たら、ねこ を 横 80 縦 80 に 動かす。
ねこ が 世界 の 右 から 出たら、ねこ を 横 80 縦 80 に 動かす。

# クリア
クリア を 偽 に する。
ねこ が 旗 に 触れたら、クリア を 真 に する。

# クリアの演出
# ▼ 変えられる
ねこ が 旗 に 触れたら：
	音 を 止める。
	「クリア.mp3」 を 鳴らす。
	「クリア！」 を 赤 で 大きさ 64 で 書く。
# ▲ ここまで

# 自由に書けるところ（文を足してみよう）
# ▼ 変えられる

# ▲ ここまで
`,Zb=`# ステージ17：落ちてくる岩
# ねこを旗まで連れていこう。左右キーで歩き、スペースでジャンプ。
# 空から岩が次々落ちてくる。当たると戻される。その先には、広い穴。
# ✏ の付いた行は、自由に書き換えてよい。答えは1つじゃない。
# ヒント1：岩に当たると戻される。その先の穴も広い。
# ヒント2：岩に当たったときの文を変えられる。穴を越えるには、歩く速さ。
# ヒント3：岩に触れたら「その 岩 を 消す。」に、右キーの行の 2 を 6 にしてみよう。

# 世界
世界 の 大きさ を 横 2400 縦 450 に する。
カメラ は ねこ を 追う。

# 空と音
# ▼ 変えられる
背景 の 絵 を 「空.png」 に する。
「曲.mp3」 を 何度も 鳴らす。
# ▲ ここまで

# 雲
# ▼ 変えられる
雲 という 四角 を 作る。
雲 の 絵 を 「雲大.png」 に する。
雲 の 幅 を 200 に する。
雲 の 高さ を 100 に する。
雲 は 横 150 縦 300 に いる。
雲 は 横 900 縦 330 に いる。
雲 は 横 1700 縦 310 に いる。
小雲 という 雲 を 作る。
小雲 の 絵 を 「雲小.png」 に する。
小雲 の 幅 を 120 に する。
小雲 の 高さ を 60 に する。
小雲 は 横 550 縦 360 に いる。
小雲 は 横 1300 縦 300 に いる。
小雲 は 横 2100 縦 350 に いる。
# ▲ ここまで

# 地面（80 ずつ並べる）
地面 という 四角 を 作る。
地面 の 絵 を 「地面.png」 に する。
地面 の 幅 を 80 に する。
地面 の 高さ を 80 に する。
地面右端 という 地面 を 作る。
地面右端 の 絵 を 「地面右端.png」 に する。
地面左端 という 地面 を 作る。
地面左端 の 絵 を 「地面左端.png」 に する。
置く横 を 0 に する。
17回 繰り返す：
	地面 を 横 (置く横) 縦 0 から 出す。
	置く横 を 置く横 + 80 に する。
地面右端 は 横 1360 縦 0 に いる。
地面左端 は 横 1760 縦 0 に いる。
置く横 を 1840 に する。
7回 繰り返す：
	地面 を 横 (置く横) 縦 0 から 出す。
	置く横 を 置く横 + 80 に する。

# 壁
壁 という 四角 を 作る。
壁 の 絵 を 「壁.png」 に する。
壁 の 幅 を 80 に する。
壁 の 高さ を 80 に する。

# トゲの天井（触れると、はじめの場所に戻る）
トゲ という 三角 を 作る。
トゲ の 色 を 赤 に する。
トゲ の 幅 を 80 に する。
トゲ の 高さ を 40 に する。
トゲ の 向き を 180 に する。
置く横 を 0 に する。
30回 繰り返す：
	トゲ を 横 (置く横) 縦 410 から 出す。
	置く横 を 置く横 + 80 に する。
ねこ が トゲ に 触れたら、ねこ を 横 80 縦 80 に 動かす。

# 落ちてくる岩（ねこの少し先に落ちる）
岩 という 丸 を 作る。
岩 の 色 を 灰 に する。
岩 の 幅 を 50 に する。
岩 の 高さ を 50 に する。
岩 に 重力 を 1500 だけ かける。
岩 を 0.4秒 ごと に 横 (ねこ の 横 + 120) 縦 450 から 出す。

# 世界の左右の端（見えない壁。ねこが世界の外へ出ないように。どんなに高く跳んでも越えられないよう、とても高くする）
端 という 壁 を 作る。
端 の 高さ を 1000000000 に する。
端 は 横 -80 縦 0 に いる。
端 は 横 2400 縦 0 に いる。

# ゴール
旗 という 四角 を 作る。
旗 の 絵 を 「旗.png」 に する。
旗 の 幅 を 60 に する。
旗 の 高さ を 180 に する。
旗 は 横 2250 縦 80 に いる。

# ねこ
ねこ という 四角 を 作る。
ねこ の 絵 を 「ねこ右立ち.png」 に する。
ねこ は 横 80 縦 80 に いる。
ねこ は 地面 と 壁 を 通れない。

# ねこの力（大きさ・重さ・歩く速さ・ジャンプ）
# ▼ 変えられる
ねこ の 幅 を 56 に する。
ねこ の 高さ を 56 に する。
ねこ に 重力 を 1500 だけ かける。
ずっと：
	右キー を 押している なら、ねこ を 右 に 2 だけ 動かす。
	左キー を 押している なら、ねこ を 左 に 2 だけ 動かす。
スペース を 押したら、ねこ を 200 だけ 1回 まで ジャンプ させる。
# ▲ ここまで

# 岩に当たったら
# ▼ 変えられる
ねこ が 岩 に 触れたら、ねこ を 横 80 縦 80 に 動かす。
# ▲ ここまで

# ねこの見た目（向き・歩く・ジャンプ）
顔 を 「右」 に する。
空中 を 偽 に する。
スペース を 押したら、空中 を 真 に する。
ねこ が 地面 と 壁 に 上 から 触れたら、空中 を 偽 に する。
ずっと：
	右キー を 押している なら、顔 を 「右」 に する。
	左キー を 押している なら、顔 を 「左」 に する。
	ねこ の 絵 を 「ねこ」 + 顔 + 「立ち.png」 に する。
	右キー を 押している または 左キー を 押している なら、ねこ の 絵 を (「ねこ」 + 顔 + 「歩き1.png」) と (「ねこ」 + 顔 + 「歩き2.png」) に する。
	空中 なら、ねこ の 絵 を 「ねこ」 + 顔 + 「ジャンプ.png」 に する。

# 落ちたら、はじめの場所に戻る（世界の左右の外へ出たときも。外に出たままだと、ねこが片付けられて消えるため）
ずっと：
	ねこ の 縦 < 0 なら、ねこ を 横 80 縦 80 に 動かす。
	(ねこ の 横) < 0 または (ねこ の 横) > 2400 なら、ねこ を 横 80 縦 80 に 動かす。
# とても速く動くと、上の「ずっと」の文で調べる前に、1コマで世界の外へ抜けてしまう。出たらすぐ戻す（「出たら」は、動いたあとに調べる）。
ねこ が 世界 の 下 から 出たら、ねこ を 横 80 縦 80 に 動かす。
ねこ が 世界 の 左 から 出たら、ねこ を 横 80 縦 80 に 動かす。
ねこ が 世界 の 右 から 出たら、ねこ を 横 80 縦 80 に 動かす。

# クリア
クリア を 偽 に する。
ねこ が 旗 に 触れたら、クリア を 真 に する。

# クリアの演出
# ▼ 変えられる
ねこ が 旗 に 触れたら：
	音 を 止める。
	「クリア.mp3」 を 鳴らす。
	「クリア！」 を 赤 で 大きさ 64 で 書く。
# ▲ ここまで

# 自由に書けるところ（文を足してみよう）
# ▼ 変えられる

# ▲ ここまで
`,Qb=`# ステージ18：見えない床
# ねこを旗まで連れていこう。左右キーで歩き、スペースでジャンプ。
# とても広い穴の上に、空と同じ色の床が浮いている。見えないし、乗れない。ねずみもいる。
# ✏ の付いた行は、自由に書き換えてよい。答えは1つじゃない。
# ヒント1：穴の上には、空と同じ色の床が3つある。色を変えると見えるかも。
# ヒント2：見えるようになっても、乗る決まりがないと乗れない。ねずみにも気をつけて。
# ヒント3：「ねこ は 見えない床 に 乗る。」と書いて、ねずみに触れたら「その ねずみ を 消す。」にしてみよう。

# 世界
世界 の 大きさ を 横 2400 縦 450 に する。
カメラ は ねこ を 追う。

# 空と音
# ▼ 変えられる
背景 の 絵 を 「空.png」 に する。
「曲.mp3」 を 何度も 鳴らす。
# ▲ ここまで

# 雲
# ▼ 変えられる
雲 という 四角 を 作る。
雲 の 絵 を 「雲大.png」 に する。
雲 の 幅 を 200 に する。
雲 の 高さ を 100 に する。
雲 は 横 150 縦 300 に いる。
雲 は 横 900 縦 330 に いる。
雲 は 横 1700 縦 310 に いる。
小雲 という 雲 を 作る。
小雲 の 絵 を 「雲小.png」 に する。
小雲 の 幅 を 120 に する。
小雲 の 高さ を 60 に する。
小雲 は 横 550 縦 360 に いる。
小雲 は 横 1300 縦 300 に いる。
小雲 は 横 2100 縦 350 に いる。
# ▲ ここまで

# 地面（80 ずつ並べる）
地面 という 四角 を 作る。
地面 の 絵 を 「地面.png」 に する。
地面 の 幅 を 80 に する。
地面 の 高さ を 80 に する。
地面右端 という 地面 を 作る。
地面右端 の 絵 を 「地面右端.png」 に する。
地面左端 という 地面 を 作る。
地面左端 の 絵 を 「地面左端.png」 に する。
置く横 を 0 に する。
10回 繰り返す：
	地面 を 横 (置く横) 縦 0 から 出す。
	置く横 を 置く横 + 80 に する。
地面右端 は 横 800 縦 0 に いる。
地面左端 は 横 1680 縦 0 に いる。
置く横 を 1760 に する。
8回 繰り返す：
	地面 を 横 (置く横) 縦 0 から 出す。
	置く横 を 置く横 + 80 に する。

# 壁
壁 という 四角 を 作る。
壁 の 絵 を 「壁.png」 に する。
壁 の 幅 を 80 に する。
壁 の 高さ を 80 に する。

# トゲの天井（触れると、はじめの場所に戻る）
トゲ という 三角 を 作る。
トゲ の 色 を 赤 に する。
トゲ の 幅 を 80 に する。
トゲ の 高さ を 40 に する。
トゲ の 向き を 180 に する。
置く横 を 0 に する。
30回 繰り返す：
	トゲ を 横 (置く横) 縦 410 から 出す。
	置く横 を 置く横 + 80 に する。
ねこ が トゲ に 触れたら、ねこ を 横 80 縦 80 に 動かす。

# 見えない床
見えない床 という 四角 を 作る。
見えない床 の 色 を #a8dbf0 に する。
見えない床 の 幅 を 160 に する。
見えない床 の 高さ を 30 に する。
見えない床 は 横 1000 縦 110 に いる。
見えない床 は 横 1250 縦 150 に いる。
見えない床 は 横 1500 縦 110 に いる。

# ねずみ（ねこの先から、次々わいて左へ歩く）
ねずみ という 四角 を 作る。
ねずみ の 絵 を 「ねずみ歩き1.png」 と 「ねずみ歩き2.png」 に する。
ねずみ の 幅 を 56 に する。
ねずみ の 高さ を 56 に する。
ねずみ に 重力 を 1500 だけ かける。
ねずみ は 地面 を 通れない。
ねずみ は 横 700 縦 80 に いる。
ねずみ を 2秒 ごと に 横 (ねこ の 横 + 700) 縦 80 から 出す。
ずっと：
	ねずみ を 左 に 2 だけ 動かす。

# 世界の左右の端（見えない壁。ねこが世界の外へ出ないように。どんなに高く跳んでも越えられないよう、とても高くする）
端 という 壁 を 作る。
端 の 高さ を 1000000000 に する。
端 は 横 -80 縦 0 に いる。
端 は 横 2400 縦 0 に いる。

# ゴール
旗 という 四角 を 作る。
旗 の 絵 を 「旗.png」 に する。
旗 の 幅 を 60 に する。
旗 の 高さ を 180 に する。
旗 は 横 2250 縦 80 に いる。

# ねこ
ねこ という 四角 を 作る。
ねこ の 絵 を 「ねこ右立ち.png」 に する。
ねこ は 横 80 縦 80 に いる。
ねこ は 地面 と 壁 を 通れない。

# ねこの力（大きさ・重さ・歩く速さ・ジャンプ）
# ▼ 変えられる
ねこ の 幅 を 56 に する。
ねこ の 高さ を 56 に する。
ねこ に 重力 を 1500 だけ かける。
ずっと：
	右キー を 押している なら、ねこ を 右 に 5 だけ 動かす。
	左キー を 押している なら、ねこ を 左 に 5 だけ 動かす。
スペース を 押したら、ねこ を 200 だけ 1回 まで ジャンプ させる。
# ▲ ここまで

# ねずみに触れたら
# ▼ 変えられる
ねこ が ねずみ に 触れたら、ねこ を 横 80 縦 80 に 動かす。
# ▲ ここまで

# ねこの見た目（向き・歩く・ジャンプ）
顔 を 「右」 に する。
空中 を 偽 に する。
スペース を 押したら、空中 を 真 に する。
ねこ が 地面 と 壁 に 上 から 触れたら、空中 を 偽 に する。
ずっと：
	右キー を 押している なら、顔 を 「右」 に する。
	左キー を 押している なら、顔 を 「左」 に する。
	ねこ の 絵 を 「ねこ」 + 顔 + 「立ち.png」 に する。
	右キー を 押している または 左キー を 押している なら、ねこ の 絵 を (「ねこ」 + 顔 + 「歩き1.png」) と (「ねこ」 + 顔 + 「歩き2.png」) に する。
	空中 なら、ねこ の 絵 を 「ねこ」 + 顔 + 「ジャンプ.png」 に する。

# 落ちたら、はじめの場所に戻る（世界の左右の外へ出たときも。外に出たままだと、ねこが片付けられて消えるため）
ずっと：
	ねこ の 縦 < 0 なら、ねこ を 横 80 縦 80 に 動かす。
	(ねこ の 横) < 0 または (ねこ の 横) > 2400 なら、ねこ を 横 80 縦 80 に 動かす。
# とても速く動くと、上の「ずっと」の文で調べる前に、1コマで世界の外へ抜けてしまう。出たらすぐ戻す（「出たら」は、動いたあとに調べる）。
ねこ が 世界 の 下 から 出たら、ねこ を 横 80 縦 80 に 動かす。
ねこ が 世界 の 左 から 出たら、ねこ を 横 80 縦 80 に 動かす。
ねこ が 世界 の 右 から 出たら、ねこ を 横 80 縦 80 に 動かす。

# クリア
クリア を 偽 に する。
ねこ が 旗 に 触れたら、クリア を 真 に する。

# クリアの演出
# ▼ 変えられる
ねこ が 旗 に 触れたら：
	音 を 止める。
	「クリア.mp3」 を 鳴らす。
	「クリア！」 を 赤 で 大きさ 64 で 書く。
# ▲ ここまで

# 自由に書けるところ（文を足してみよう）
# ▼ 変えられる

# ▲ ここまで
`,$b=`# ステージ19：さかさま
# ねこを旗まで連れていこう。左右キーで歩き、スペースでジャンプ。
# 重力が上向きで、ねこがトゲの天井へ落ちていく。しかも5秒ごとに、はじめの場所に戻される。
# ✏ の付いた行は、自由に書き換えてよい。答えは1つじゃない。
# ヒント1：重力の数が、マイナスになっている。
# ヒント2：重力を直しても、5秒ごとに戻される。旗まで歩くには、もっと時間がかかる。
# ヒント3：重力を 1500 に、「5秒 ごと」を「20秒 ごと」にしてみよう。

# 世界
世界 の 大きさ を 横 2400 縦 450 に する。
カメラ は ねこ を 追う。

# 空と音
# ▼ 変えられる
背景 の 絵 を 「空.png」 に する。
「曲.mp3」 を 何度も 鳴らす。
# ▲ ここまで

# 雲
# ▼ 変えられる
雲 という 四角 を 作る。
雲 の 絵 を 「雲大.png」 に する。
雲 の 幅 を 200 に する。
雲 の 高さ を 100 に する。
雲 は 横 150 縦 300 に いる。
雲 は 横 900 縦 330 に いる。
雲 は 横 1700 縦 310 に いる。
小雲 という 雲 を 作る。
小雲 の 絵 を 「雲小.png」 に する。
小雲 の 幅 を 120 に する。
小雲 の 高さ を 60 に する。
小雲 は 横 550 縦 360 に いる。
小雲 は 横 1300 縦 300 に いる。
小雲 は 横 2100 縦 350 に いる。
# ▲ ここまで

# 地面（80 ずつ並べる）
地面 という 四角 を 作る。
地面 の 絵 を 「地面.png」 に する。
地面 の 幅 を 80 に する。
地面 の 高さ を 80 に する。
置く横 を 0 に する。
30回 繰り返す：
	地面 を 横 (置く横) 縦 0 から 出す。
	置く横 を 置く横 + 80 に する。

# 壁
壁 という 四角 を 作る。
壁 の 絵 を 「壁.png」 に する。
壁 の 幅 を 80 に する。
壁 の 高さ を 80 に する。

# トゲの天井（触れると、はじめの場所に戻る）
トゲ という 三角 を 作る。
トゲ の 色 を 赤 に する。
トゲ の 幅 を 80 に する。
トゲ の 高さ を 40 に する。
トゲ の 向き を 180 に する。
置く横 を 0 に する。
30回 繰り返す：
	トゲ を 横 (置く横) 縦 410 から 出す。
	置く横 を 置く横 + 80 に する。
ねこ が トゲ に 触れたら、ねこ を 横 80 縦 80 に 動かす。

# 世界の左右の端（見えない壁。ねこが世界の外へ出ないように。どんなに高く跳んでも越えられないよう、とても高くする）
端 という 壁 を 作る。
端 の 高さ を 1000000000 に する。
端 は 横 -80 縦 0 に いる。
端 は 横 2400 縦 0 に いる。

# ゴール
旗 という 四角 を 作る。
旗 の 絵 を 「旗.png」 に する。
旗 の 幅 を 60 に する。
旗 の 高さ を 180 に する。
旗 は 横 2250 縦 80 に いる。

# ねこ
ねこ という 四角 を 作る。
ねこ の 絵 を 「ねこ右立ち.png」 に する。
ねこ は 横 80 縦 80 に いる。
ねこ は 地面 と 壁 を 通れない。

# ねこの力（大きさ・重さ・歩く速さ・ジャンプ）
# ▼ 変えられる
ねこ の 幅 を 56 に する。
ねこ の 高さ を 56 に する。
ねこ に 重力 を -1500 だけ かける。
ずっと：
	右キー を 押している なら、ねこ を 右 に 5 だけ 動かす。
	左キー を 押している なら、ねこ を 左 に 5 だけ 動かす。
スペース を 押したら、ねこ を 200 だけ 1回 まで ジャンプ させる。
# ▲ ここまで

# 時間で戻される
# ▼ 変えられる
ねこ を 5秒 ごと に 横 80 縦 80 に 動かす。
# ▲ ここまで

# ねこの見た目（向き・歩く・ジャンプ）
顔 を 「右」 に する。
空中 を 偽 に する。
スペース を 押したら、空中 を 真 に する。
ねこ が 地面 と 壁 に 上 から 触れたら、空中 を 偽 に する。
ずっと：
	右キー を 押している なら、顔 を 「右」 に する。
	左キー を 押している なら、顔 を 「左」 に する。
	ねこ の 絵 を 「ねこ」 + 顔 + 「立ち.png」 に する。
	右キー を 押している または 左キー を 押している なら、ねこ の 絵 を (「ねこ」 + 顔 + 「歩き1.png」) と (「ねこ」 + 顔 + 「歩き2.png」) に する。
	空中 なら、ねこ の 絵 を 「ねこ」 + 顔 + 「ジャンプ.png」 に する。

# 落ちたら、はじめの場所に戻る（世界の左右の外へ出たときも。外に出たままだと、ねこが片付けられて消えるため）
ずっと：
	ねこ の 縦 < 0 なら、ねこ を 横 80 縦 80 に 動かす。
	(ねこ の 横) < 0 または (ねこ の 横) > 2400 なら、ねこ を 横 80 縦 80 に 動かす。
# とても速く動くと、上の「ずっと」の文で調べる前に、1コマで世界の外へ抜けてしまう。出たらすぐ戻す（「出たら」は、動いたあとに調べる）。
ねこ が 世界 の 下 から 出たら、ねこ を 横 80 縦 80 に 動かす。
ねこ が 世界 の 左 から 出たら、ねこ を 横 80 縦 80 に 動かす。
ねこ が 世界 の 右 から 出たら、ねこ を 横 80 縦 80 に 動かす。

# クリア
クリア を 偽 に する。
ねこ が 旗 に 触れたら、クリア を 真 に する。

# クリアの演出
# ▼ 変えられる
ねこ が 旗 に 触れたら：
	音 を 止める。
	「クリア.mp3」 を 鳴らす。
	「クリア！」 を 赤 で 大きさ 64 で 書く。
# ▲ ここまで

# 自由に書けるところ（文を足してみよう）
# ▼ 変えられる

# ▲ ここまで
`,ex=`# ステージ20：総まとめ2
# ねこを旗まで連れていこう。左右キーで歩き、スペースでジャンプ。
# さいごのステージ。トゲ・せまいトンネル・ねずみ・時間。ここまでの全部を思い出そう。
# ✏ の付いた行は、自由に書き換えてよい。答えは1つじゃない。
# ヒント1：トゲ・トンネル・ねずみ・時間。ステージ11からを思い出そう。
# ヒント2：ジャンプは低く、ねこは小さく、ねずみは消して、時間は長く。
# ヒント3：ジャンプを 200、ねこの高さを 40、ねずみは「その ねずみ を 消す。」、「5秒 ごと」を「20秒 ごと」にしてみよう。

# 世界
世界 の 大きさ を 横 2400 縦 450 に する。
カメラ は ねこ を 追う。

# 空と音
# ▼ 変えられる
背景 の 絵 を 「空.png」 に する。
「曲.mp3」 を 何度も 鳴らす。
# ▲ ここまで

# 雲
# ▼ 変えられる
雲 という 四角 を 作る。
雲 の 絵 を 「雲大.png」 に する。
雲 の 幅 を 200 に する。
雲 の 高さ を 100 に する。
雲 は 横 150 縦 300 に いる。
雲 は 横 900 縦 330 に いる。
雲 は 横 1700 縦 310 に いる。
小雲 という 雲 を 作る。
小雲 の 絵 を 「雲小.png」 に する。
小雲 の 幅 を 120 に する。
小雲 の 高さ を 60 に する。
小雲 は 横 550 縦 360 に いる。
小雲 は 横 1300 縦 300 に いる。
小雲 は 横 2100 縦 350 に いる。
# ▲ ここまで

# 地面（80 ずつ並べる）
地面 という 四角 を 作る。
地面 の 絵 を 「地面.png」 に する。
地面 の 幅 を 80 に する。
地面 の 高さ を 80 に する。
置く横 を 0 に する。
30回 繰り返す：
	地面 を 横 (置く横) 縦 0 から 出す。
	置く横 を 置く横 + 80 に する。

# 壁
壁 という 四角 を 作る。
壁 の 絵 を 「壁.png」 に する。
壁 の 幅 を 80 に する。
壁 の 高さ を 80 に する。

# トゲの天井（触れると、はじめの場所に戻る）
トゲ という 三角 を 作る。
トゲ の 色 を 赤 に する。
トゲ の 幅 を 80 に する。
トゲ の 高さ を 40 に する。
トゲ の 向き を 180 に する。
置く横 を 0 に する。
30回 繰り返す：
	トゲ を 横 (置く横) 縦 410 から 出す。
	置く横 を 置く横 + 80 に する。
ねこ が トゲ に 触れたら、ねこ を 横 80 縦 80 に 動かす。

# せまいトンネル
置く横 を 960 に する。
9回 繰り返す：
	壁 を 横 (置く横) 縦 130 から 出す。
	置く横 を 置く横 + 80 に する。
置く横 を 960 に する。
9回 繰り返す：
	壁 を 横 (置く横) 縦 210 から 出す。
	置く横 を 置く横 + 80 に する。
置く横 を 960 に する。
9回 繰り返す：
	壁 を 横 (置く横) 縦 290 から 出す。
	置く横 を 置く横 + 80 に する。
置く横 を 960 に する。
9回 繰り返す：
	壁 を 横 (置く横) 縦 370 から 出す。
	置く横 を 置く横 + 80 に する。

# ねずみ（ねこの先から、次々わいて左へ歩く）
ねずみ という 四角 を 作る。
ねずみ の 絵 を 「ねずみ歩き1.png」 と 「ねずみ歩き2.png」 に する。
ねずみ の 幅 を 56 に する。
ねずみ の 高さ を 56 に する。
ねずみ に 重力 を 1500 だけ かける。
ねずみ は 地面 を 通れない。
ねずみ は 横 1300 縦 80 に いる。
ねずみ を 2秒 ごと に 横 (ねこ の 横 + 700) 縦 80 から 出す。
ずっと：
	ねずみ を 左 に 2 だけ 動かす。

# 世界の左右の端（見えない壁。ねこが世界の外へ出ないように。どんなに高く跳んでも越えられないよう、とても高くする）
端 という 壁 を 作る。
端 の 高さ を 1000000000 に する。
端 は 横 -80 縦 0 に いる。
端 は 横 2400 縦 0 に いる。

# ゴール
旗 という 四角 を 作る。
旗 の 絵 を 「旗.png」 に する。
旗 の 幅 を 60 に する。
旗 の 高さ を 180 に する。
旗 は 横 2250 縦 80 に いる。

# ねこ
ねこ という 四角 を 作る。
ねこ の 絵 を 「ねこ右立ち.png」 に する。
ねこ は 横 80 縦 80 に いる。
ねこ は 地面 と 壁 を 通れない。

# ねこの力（大きさ・重さ・歩く速さ・ジャンプ）
# ▼ 変えられる
ねこ の 幅 を 56 に する。
ねこ の 高さ を 56 に する。
ねこ に 重力 を 1500 だけ かける。
ずっと：
	右キー を 押している なら、ねこ を 右 に 5 だけ 動かす。
	左キー を 押している なら、ねこ を 左 に 5 だけ 動かす。
スペース を 押したら、ねこ を 400 だけ 1回 まで ジャンプ させる。
# ▲ ここまで

# ねずみに触れたら
# ▼ 変えられる
ねこ が ねずみ に 触れたら、ねこ を 横 80 縦 80 に 動かす。
# ▲ ここまで

# 時間で戻される
# ▼ 変えられる
ねこ を 5秒 ごと に 横 80 縦 80 に 動かす。
# ▲ ここまで

# ねこの見た目（向き・歩く・ジャンプ）
顔 を 「右」 に する。
空中 を 偽 に する。
スペース を 押したら、空中 を 真 に する。
ねこ が 地面 と 壁 に 上 から 触れたら、空中 を 偽 に する。
ずっと：
	右キー を 押している なら、顔 を 「右」 に する。
	左キー を 押している なら、顔 を 「左」 に する。
	ねこ の 絵 を 「ねこ」 + 顔 + 「立ち.png」 に する。
	右キー を 押している または 左キー を 押している なら、ねこ の 絵 を (「ねこ」 + 顔 + 「歩き1.png」) と (「ねこ」 + 顔 + 「歩き2.png」) に する。
	空中 なら、ねこ の 絵 を 「ねこ」 + 顔 + 「ジャンプ.png」 に する。

# 落ちたら、はじめの場所に戻る（世界の左右の外へ出たときも。外に出たままだと、ねこが片付けられて消えるため）
ずっと：
	ねこ の 縦 < 0 なら、ねこ を 横 80 縦 80 に 動かす。
	(ねこ の 横) < 0 または (ねこ の 横) > 2400 なら、ねこ を 横 80 縦 80 に 動かす。
# とても速く動くと、上の「ずっと」の文で調べる前に、1コマで世界の外へ抜けてしまう。出たらすぐ戻す（「出たら」は、動いたあとに調べる）。
ねこ が 世界 の 下 から 出たら、ねこ を 横 80 縦 80 に 動かす。
ねこ が 世界 の 左 から 出たら、ねこ を 横 80 縦 80 に 動かす。
ねこ が 世界 の 右 から 出たら、ねこ を 横 80 縦 80 に 動かす。

# クリア
クリア を 偽 に する。
ねこ が 旗 に 触れたら、クリア を 真 に する。

# クリアの演出
# ▼ 変えられる
ねこ が 旗 に 触れたら：
	音 を 止める。
	「クリア.mp3」 を 鳴らす。
	「クリア！」 を 赤 で 大きさ 64 で 書く。
# ▲ ここまで

# 自由に書けるところ（文を足してみよう）
# ▼ 変えられる

# ▲ ここまで
`,tx=`# ねこと のメニュー（タイトルとステージ選択）
# ねこと（アプリ）とは、次の名前でやり取りする。
#   画面の幅   … アプリが入れる（見えている横の長さ。窓に合わせて変わる）
#   ステージ名 … アプリが入れる（ステージの名前の並び）
#   クリアした … アプリが入れる（ステージごとに、クリアしたら 真）
#   遊べる     … アプリが入れる（ステージごとに、遊べるなら 真。前のステージをクリアするまでは 偽 で、南京錠を出す）
#   遊ぶ       … ステージの番号を入れると、アプリがそのステージを始める（0 なら、まだクリアしていない最初のステージ。-1 なら何もしない）
#   設定を開く … 真 にすると、アプリが設定の画面を開く
#   ページ数       … アプリが入れる（ステージ選択のページの数。1ページに10ステージ）
#   ひらけたページ … アプリが入れる（行けるページの数。前のページを全部クリアすると、次のページがひらく）
画面の幅 を 800 に する。
ステージ名 を 空 に する。
クリアした を 空 に する。
遊べる を 空 に する。
ページ数 を 1 に する。
ひらけたページ を 1 に する。
ページ を 1 に する。
遊ぶ を なし に する。
設定を開く を 偽 に する。
真ん中 を 400 に する。

# 世界（画面の横幅は窓に合わせて広がるので、世界を広くしておく）
世界 の 大きさ を 横 2400 縦 450 に する。

# 空と音
背景 の 絵 を 「空.png」 に する。
「曲.mp3」 を 何度も 鳴らす。

# 雲（ゆっくり流れる）
雲 という 四角 を 作る。
雲 の 絵 を 「雲大.png」 に する。
雲 の 幅 を 200 に する。
雲 の 高さ を 100 に する。
雲 は 横 120 縦 320 に いる。
雲 は 横 1150 縦 300 に いる。
小雲 という 雲 を 作る。
小雲 の 絵 を 「雲小.png」 に する。
小雲 の 幅 を 120 に する。
小雲 の 高さ を 60 に する。
小雲 は 横 700 縦 370 に いる。
小雲 は 横 1600 縦 350 に いる。
ずっと：
	雲 を 1つずつ くも に 入れて 繰り返す：
		くも を 左 に 0.3 だけ 動かす。
		(くも の 横) < -200 なら、くも を 横 (画面の幅 + 50) 縦 (くも の 縦) に 動かす。

# 地面（画面の下に並べる）
地面 という 四角 を 作る。
地面 の 絵 を 「地面.png」 に する。
地面 の 幅 を 80 に する。
地面 の 高さ を 80 に する。
置く横 を 0 に する。
30回 繰り返す：
	地面 を 横 (置く横) 縦 0 から 出す。
	置く横 を 置く横 + 80 に する。

# 飾り：歩くねこと旗
ねこ という 四角 を 作る。
ねこ の 絵 を 「ねこ右歩き1.png」 と 「ねこ右歩き2.png」 に する。
ねこ の コマの間 を 0.3 に する。
ねこ の 幅 を 72 に する。
ねこ の 高さ を 72 に する。
ねこ は 横 0 縦 80 に いる。
旗 という 四角 を 作る。
旗 の 絵 を 「旗.png」 に する。
旗 の 幅 を 50 に する。
旗 の 高さ を 150 に する。
旗 は 横 0 縦 80 に いる。
ずっと：
	真ん中 を 画面の幅 / 2 に する。
# 飾りのねこと旗は、タイトルの場面だけで見せる（ステージ選択では、札の後ろにはみ出すので、画面の外へ）。

# ボタン（台の絵の上に、言葉を書く）
ボタン台 という 四角 を 作る。
ボタン台 の 絵 を 「ボタン.png」 に する。
ボタン台 の 色 を 白 に する。
ボタン台 の 幅 を 200 に する。
ボタン台 の 高さ を 40 に する。
はじめボタン という ボタン台 を 作る。
はじめボタン の 言葉 を 「▶ はじめる」 に する。
えらぶボタン という ボタン台 を 作る。
えらぶボタン の 言葉 を 「ステージを えらぶ」 に する。
せっていボタン という ボタン台 を 作る。
せっていボタン の 言葉 を 「⚙ せってい」 に する。
もどるボタン という ボタン台 を 作る。
もどるボタン の 言葉 を 「◀ もどる」 に する。

# マウスがボタンに乗っているか（ボタンの左はしの横と、下はしの縦を渡す）。乗っていれば「乗っている」が 真
左はしx に 下はしy から 光らせる とは：
	乗っている を 偽 に する。
	(マウス の 横) >= 左はしx かつ (マウス の 横) <= 左はしx + 200 かつ (マウス の 縦) >= 下はしy かつ (マウス の 縦) <= 下はしy + 40 なら、乗っている を 真 に する。

# 字の部品は、置いた横の位置が左はし（幅は文字に合わせて決まる）。真ん中にそろえるときは、幅の半分だけ左に置く。

# クレジット（右下に、いつも出す）
クレジット という 字 を 作る。
クレジット の 言葉 を 「音楽：もみじばミュージック ／ 音楽：魔王魂」 に する。
クレジット の 大きさ を 12 に する。
クレジット の 色 を 白 に する。
クレジット は 横 500 縦 8 に いる。
ずっと、クレジット を 横 (画面の幅 - (クレジット の 幅) - 12) 縦 8 に 動かす。

# タイトル
ロゴ という 四角 を 作る。
ロゴ の 絵 を 「タイトル.png」 に する。
ロゴ の 幅 を 330 に する。
ロゴ の 高さ を 110 に する。
副題 という 字 を 作る。
副題 の 言葉 を 「文を 書きかえて、旗まで 行こう」 に する。
副題 の 大きさ を 17 に する。
副題 の 色 を 白 に する。

タイトル という 場面 を 作る：
	ロゴ は 横 235 縦 272 に いる。
	副題 は 横 400 縦 236 に いる。
	はじめボタン は 横 300 縦 160 に いる。
	えらぶボタン は 横 300 縦 110 に いる。
	せっていボタン は 横 300 縦 60 に いる。
	ずっと：
		ねこ を 横 40 縦 80 に 動かす。
		旗 を 横 (画面の幅 - 120) 縦 80 に 動かす。
		ロゴ を 横 (真ん中 - 165) 縦 272 に 動かす。
		副題 を 横 (真ん中 - (副題 の 幅) / 2) 縦 236 に 動かす。
		はじめボタン を 横 (真ん中 - 100) 縦 160 に 動かす。
		えらぶボタン を 横 (真ん中 - 100) 縦 110 に 動かす。
		せっていボタン を 横 (真ん中 - 100) 縦 60 に 動かす。
		(真ん中 - 100) に 160 から 光らせる。
		はじめボタン の 絵 を 「ボタン.png」 に する。
		乗っている なら、はじめボタン の 絵 を 「ボタン明るい.png」 に する。
		(真ん中 - 100) に 110 から 光らせる。
		えらぶボタン の 絵 を 「ボタン.png」 に する。
		乗っている なら、えらぶボタン の 絵 を 「ボタン明るい.png」 に する。
		(真ん中 - 100) に 60 から 光らせる。
		せっていボタン の 絵 を 「ボタン.png」 に する。
		乗っている なら、せっていボタン の 絵 を 「ボタン明るい.png」 に する。
	はじめボタン を クリックしたら、遊ぶ を 0 に する。
	エンター を 押したら、遊ぶ を 0 に する。
	スペース を 押したら、遊ぶ を 0 に する。
	えらぶボタン を クリックしたら、ステージ選択 に 切り替える。
	せっていボタン を クリックしたら、設定を開く を 真 に する。

# ステージの札（1列に5枚ずつ。真ん中に番号、右上の角に印：クリアしたステージには肉球、まだ遊べないステージには南京錠）
札 という 四角 を 作る：
	｛番号｝ を 0 に する。
札 の 絵 を 「札.png」 に する。
札 の 色 を 白 に する。
札 の 幅 を 80 に する。
札 の 高さ を 80 に する。
肉球 という 四角 を 作る。
肉球 の 絵 を 「肉球.png」 に する。
肉球 の 幅 を 28 に する。
肉球 の 高さ を 28 に する。
錠 という 四角 を 作る。
錠 の 絵 を 「錠.png」 に する。
錠 の 幅 を 28 に する。
錠 の 高さ を 28 に する。
札名 という 字 を 作る。
札名 の 大きさ を 14 に する。
札名 の 色 を 白 に する。
# 札の番号（札の表の真ん中に置く。札の絵は下に厚みがあるので、表の真ん中は少し上）
札番号 という 字 を 作る。
札番号 の 大きさ を 20 に する。
札番号 の 色 を 白 に する。
見出し という 字 を 作る。
見出し の 言葉 を 「ステージを えらぶ（」 + ページ + 「 / 」 + ページ数 + 「）」 に する。
見出し の 大きさ を 26 に する。
見出し の 色 を 白 に する。

# ページをめくる矢印（行けるページがあるときだけ、画面に出す）
次へボタン という ボタン台 を 作る。
次へボタン の 幅 を 40 に する。
次へボタン の 高さ を 40 に する。
次へボタン の 言葉 を 「▶」 に する。
# 前へボタンは、次へボタンの仲間にしない（仲間にすると、次へボタンの「クリックしたら」も動いて、ページが戻らない）。
前へボタン という ボタン台 を 作る。
前へボタン の 幅 を 40 に する。
前へボタン の 高さ を 40 に する。
前へボタン の 言葉 を 「◀」 に する。

ステージ選択 という 場面 を 作る：
	見出し は 横 400 縦 388 に いる。
	もどるボタン は 横 300 縦 110 に いる。
	次へボタン は 横 5000 縦 381 に いる。
	前へボタン は 横 5000 縦 381 に いる。
	# 今のページの10枚だけ並べる（1ページに5枚ずつ2段）。
	番 を 0 に する。
	並べた を 0 に する。
	ステージ名 を 1つずつ 名 に 入れて 繰り返す：
		番 を 番 + 1 に する。
		番 > (ページ - 1) * 10 かつ 番 <= ページ * 10 なら：
			列 を 並べた % 5 に する。
			段 を (並べた - 列) / 5 に する。
			左はし を 真ん中 - 256 + 列 * 108 に する。
			下はし を 294 - 段 * 112 に する。
			並べた を 並べた + 1 に する。
			札 を 横 (左はし) 縦 (下はし) から 出す。
			ふだ を 札 の 並べた 番目 に する。
			ふだ の ｛番号｝ を 番 に する。
			クリアした の 番 番目 なら、肉球 を 横 (左はし + 60) 縦 (下はし + 60) から 出す。
			札番号 を 横 (左はし) 縦 (下はし + 34) から 出す。
			ばんごう を 札番号 の 並べた 番目 に する。
			ばんごう の 言葉 を 「」 + 番 に する。
			ばんごう を 横 (左はし + 40 - (ばんごう の 幅) / 2) 縦 (下はし + 34) に 動かす。
			遊べる の 番 番目 = 偽 なら：
				錠 を 横 (左はし + 60) 縦 (下はし + 60) から 出す。
				ふだ の ｛番号｝ を 0 - 1 に する。
			札名 を 横 (左はし) 縦 (下はし - 20) から 出す。
			なまえ を 札名 の 並べた 番目 に する。
			なまえ の 言葉 を 名 に する。
			なまえ を 横 (左はし + 40 - (なまえ の 幅) / 2) 縦 (下はし - 20) に 動かす。
	札 を クリックしたら、遊ぶ を その 札 の ｛番号｝ に する。
	もどるボタン を クリックしたら、タイトル に 切り替える。
	次へボタン を クリックしたら：
		ページ を ページ + 1 に する。
		ステージ選択 に 切り替える。
	前へボタン を クリックしたら：
		ページ を ページ - 1 に する。
		ステージ選択 に 切り替える。
	ずっと：
		ねこ を 横 5000 縦 80 に 動かす。
		旗 を 横 5000 縦 80 に 動かす。
		見出し を 横 (真ん中 - (見出し の 幅) / 2) 縦 388 に 動かす。
		もどるボタン を 横 (真ん中 - 100) 縦 110 に 動かす。
		(真ん中 - 100) に 110 から 光らせる。
		もどるボタン の 絵 を 「ボタン.png」 に する。
		乗っている なら、もどるボタン の 絵 を 「ボタン明るい.png」 に する。
		# 次のページは、ひらけたページまで。前のページは、2ページ目から。見せないときは画面の右の外へ（左の外に出たものは片付けられて消えるため）。
		# 矢印は、見出しの両どなりに置く（札の左右だと、窓が狭いときに画面の外へはみ出すため）。
		次へボタン を 横 5000 縦 381 に 動かす。
		ページ < ひらけたページ なら、次へボタン を 横 (真ん中 + (見出し の 幅) / 2 + 16) 縦 381 に 動かす。
		前へボタン を 横 5000 縦 381 に 動かす。
		ページ > 1 なら、前へボタン を 横 (真ん中 - (見出し の 幅) / 2 - 56) 縦 381 に 動かす。

タイトル を 始める。
`,nx=`# せってい
# 枠の中（数と、テーマの名前）を書き換えられる。書き換えると、すぐ変わる。

# 見た目
# テーマは、夜・藤・紙・海・桜・向日葵 から選ぶ。
テーマ を 夜 に する。
文字 の 大きさ を 18 に する。

# 音の大きさ（0〜100）
音楽 の 音量 を 3 に する。
効果音 の 音量 を 3 に する。
`,X=Object.entries(Object.assign({"../ゲーム/ステージ/01_ジャンプ.wokoto":Fb,"../ゲーム/ステージ/02_向き.wokoto":Ib,"../ゲーム/ステージ/03_速さ.wokoto":Lb,"../ゲーム/ステージ/04_台.wokoto":Rb,"../ゲーム/ステージ/05_ねずみ.wokoto":zb,"../ゲーム/ステージ/06_壁と穴.wokoto":Bb,"../ゲーム/ステージ/07_がけ.wokoto":Vb,"../ゲーム/ステージ/08_鍵と扉.wokoto":Hb,"../ゲーム/ステージ/09_重い世界.wokoto":Ub,"../ゲーム/ステージ/10_総まとめ.wokoto":Wb,"../ゲーム/ステージ/11_トゲの天井.wokoto":Gb,"../ゲーム/ステージ/12_せまいトンネル.wokoto":Kb,"../ゲーム/ステージ/13_スイッチの橋.wokoto":qb,"../ゲーム/ステージ/14_エレベーター.wokoto":Jb,"../ゲーム/ステージ/15_魚あつめ.wokoto":Yb,"../ゲーム/ステージ/16_向かい風.wokoto":Xb,"../ゲーム/ステージ/17_落ちてくる岩.wokoto":Zb,"../ゲーム/ステージ/18_見えない床.wokoto":Qb,"../ゲーム/ステージ/19_さかさま.wokoto":$b,"../ゲーム/ステージ/20_総まとめ2.wokoto":ex})).map(([e,t])=>{let n=e.split(`/`).pop();return{file:n,title:rx(n),...ix(t)}}).sort((e,t)=>e.file.localeCompare(t.file,`ja`));function rx(e){return e.replace(/\.wokoto$/,``).replace(/^\d+_/,``)}function ix(e){let t=[],n=[];for(let r of e.split(`
`)){let e=/^#\s*ヒント(\d+)[：:]\s*(.*)$/.exec(r.trim());e?t.push({order:Number(e[1]),text:e[2]}):n.push(r)}return{text:n.join(`
`),hints:t.sort((e,t)=>e.order-t.order).map(e=>e.text)}}function ax(e,t,n=!1){return n||e===0||t.has(e)||t.has(e-1)}function ox(){return Math.max(1,Math.ceil(X.length/10))}function sx(e,t=!1){if(t)return ox();let n=1;for(;n<ox();){let t=(n-1)*10;if(!X.slice(t,t+10).every((n,r)=>e.has(t+r)))break;n+=1}return n}var cx=Object.assign({"../ゲーム/画面/メニュー.wokoto":tx,"../ゲーム/画面/設定.wokoto":nx}),lx=cx[`../ゲーム/画面/メニュー.wokoto`]??``;function ux(e,t,n=!1){if(e===0){let e=X.findIndex((e,n)=>!t.has(n));return e===-1?X.length-1:e}return typeof e==`number`&&Number.isInteger(e)&&e>=1&&e<=X.length&&ax(e-1,t,n)?e-1:null}var dx=cx[`../ゲーム/画面/設定.wokoto`]??``,fx=(()=>{try{return window.localStorage}catch{return null}})(),Z=fx?Ab(fx):kb();function px(){return fx?jb(fx,Z):!1}var Q=document.querySelector(`#game`),mx=document.querySelector(`#start`),hx=document.querySelector(`#file-name`),gx=document.querySelector(`#tab`),_x=document.querySelector(`#problems`),vx=document.querySelector(`#status-problems`),yx=document.querySelector(`#status-stage`),bx=document.querySelector(`#reset`),xx=document.querySelector(`#cleared`),Sx=document.querySelector(`#menu`),Cx=document.querySelector(`#next`),wx=Q.getContext(`2d`),Tx=document.querySelector(`#settings`),Ex=document.querySelector(`#settings-problems`),Dx=Z.settings??dx,Ox=!1;function kx(e){for(let[t,n]of Object.entries(eo(e)))document.documentElement.style.setProperty(t,n);Tb(e.musicVolume/100,e.soundVolume/100)}function Ax(e){try{kx(to(e)),Dx=e,Ex.hidden=!0;let t=e===dx?null:e;Z.settings!==t&&(Z.settings=t,px())}catch(t){Ex.replaceChildren(...Iy(t).map(t=>t.at===null?t.message:`${Ly(e,t.at)}行目：${t.message}`).map(e=>{let t=document.createElement(`li`);return t.textContent=e,t})),Ex.hidden=!1}}Ax(Dx);var jx,Mx=Fy(document.querySelector(`#settings-code`),()=>{window.clearTimeout(jx),jx=window.setTimeout(function e(){Mx.composing()?jx=window.setTimeout(e,300):Ax(Mx.text())},300)},`設定`);function Nx(){Ox=!0,Tx.hidden=!1,Mx.load(Dx)}function Px(){window.clearTimeout(jx),Ax(Mx.text()),Ox=!1,Tx.hidden=!0,Q.focus()}document.querySelector(`#close-settings`).addEventListener(`click`,Px),document.querySelector(`#open-settings`).addEventListener(`click`,Nx);var Fx=document.querySelector(`#save-note`),Ix;function Lx(e){Fx.textContent=e,window.clearTimeout(Ix),Ix=window.setTimeout(()=>Fx.textContent=``,2500)}document.querySelector(`#save-now`).addEventListener(`click`,()=>{window.clearTimeout(jx),Ax(Mx.text()),Lx(px()?`セーブしました`:`セーブできませんでした（このブラウザでは残せません）`)});var Rx=document.querySelector(`#unlock-all`);function zx(){Rx.textContent=Z.unlockAll?`🔒 順番にひらく`:`🔓 全部ひらく`}zx(),Rx.addEventListener(`click`,()=>{Z.unlockAll=!Z.unlockAll,px(),zx(),Lx(Z.unlockAll?`全部のステージを遊べるようにしました`:`前のステージをクリアするまで、選べないようにしました`),Kx===`メニュー`&&eS()}),document.querySelector(`#erase-save`).addEventListener(`click`,()=>{window.confirm(`クリアした記録・書き換えた文・設定を、全部消してはじめに戻しますか？（元に戻せません）`)&&(fx&&Mb(fx),Object.assign(Z,kb()),qx.clear(),zx(),Mx.load(dx),Ax(dx),Kx===`ステージ`?$x(Ux):eS(),Lx(`セーブを消しました`))});var Bx=1;function Vx(e){let t=Q.parentElement.getBoundingClientRect(),n=Q.getBoundingClientRect().height||t.height,r=e.screen.height,i=Math.max(1,Math.min(Math.round(r*t.width/n),e.world.width));e.screen.width!==i&&(e.screen={width:i,height:r}),Bx=Math.max(1,n*(window.devicePixelRatio||1)/r);let a=Math.round(i*Bx),o=Math.round(r*Bx);(Q.width!==a||Q.height!==o)&&(Q.width=a,Q.height=o)}var $=null,Hx=``,Ux=0,Wx=!1,Gx=!1,Kx=`メニュー`,qx=new Set(X.flatMap((e,t)=>Z.cleared.includes(e.file)?[t]:[]));function Jx(e,t,n){_x.replaceChildren(),n&&_x.append(Object.assign(document.createElement(`li`),{textContent:n}));let r=Iy(t);for(let t of r){let n=document.createElement(`li`);if(n.textContent=t.message,t.at!==null){let r=document.createElement(`span`);r.className=`line`,r.textContent=`${Ly(e,t.at)}行目`,n.append(r),n.addEventListener(`click`,()=>Qx.goTo(t.at))}_x.append(n)}_x.hidden=!1,vx.textContent=`✖ 問題 ${r.length}`,vx.classList.add(`bad`)}function Yx(){_x.hidden=!0,_x.replaceChildren(),vx.textContent=`✔ 問題なし`,vx.classList.remove(`bad`)}function Xx(e){try{return $=Bi(Cn(he(He(e),e))),Hx=e,Wx=!1,xx.hidden=!0,Yx(),wb(),Gx&&Db($.sounds.splice(0)),!0}catch(t){return Jx(e,t),!1}}var Zx,Qx=Fy(document.querySelector(`#code`),()=>{window.clearTimeout(Zx),Zx=window.setTimeout(function e(){Kx===`ステージ`&&(Qx.composing()?Zx=window.setTimeout(e,300):(Xx(Qx.text()),Pb(Z,X[Ux].file,X[Ux].text,Qx.text()),px()))},300),gx.classList.toggle(`changed`,Qx.text()!==X[Ux].text)});function $x(e){(e!==Ux||Kx!==`ステージ`)&&(hS=0,fS.hidden=!0),Ux=e;let t=X[e],n=Nb(Z,t.file,t.text);hx.textContent=t.file,yx.textContent=`ステージ ${e+1} / ${X.length}：${t.title}`,gx.classList.toggle(`changed`,n!==t.text),Cx.textContent=e+1<X.length?`つぎのステージへ ▶`:`メニューへ ▶`,Kx=`ステージ`,document.body.classList.remove(`menu`),window.clearTimeout(Zx),Qx.load(n),Xx(t.text),n!==t.text&&Xx(n),!Z.tutorialSeen&&!cS&&uS()}function eS(){Kx===`ステージ`&&(window.clearTimeout(Zx),Pb(Z,X[Ux].file,X[Ux].text,Qx.text()),px()),Kx=`メニュー`,document.body.classList.add(`menu`),Xx(lx),$?.variables.set(`ステージ名`,X.map(e=>e.title)),$?.variables.set(`クリアした`,X.map((e,t)=>qx.has(t))),$?.variables.set(`遊べる`,X.map((e,t)=>ax(t,qx,Z.unlockAll)));let e=sx(qx,Z.unlockAll);$?.variables.set(`ページ数`,ox()),$?.variables.set(`ひらけたページ`,e),$?.variables.set(`ページ`,Math.min(Math.floor(Ux/10)+1,e))}function tS(e){e.variables.set(`画面の幅`,e.screen.width);let t=e.variables.get(`遊ぶ`);if(t!=null){e.variables.set(`遊ぶ`,null);let n=ux(t,qx,Z.unlockAll);n!==null&&($x(n),Q.focus())}e.variables.get(`設定を開く`)===!0&&(e.variables.set(`設定を開く`,!1),Nx())}var nS=document.querySelector(`#tutorial`),rS=[...nS.querySelectorAll(`.page`)],iS=document.querySelector(`#tutorial-page`),aS=document.querySelector(`#tutorial-back`),oS=document.querySelector(`#tutorial-next`),sS=0,cS=!1;function lS(e){sS=e,rS.forEach((t,n)=>t.hidden=n!==e),iS.textContent=`${e+1} / ${rS.length}`,aS.hidden=e===0,oS.textContent=e+1<rS.length?`つぎへ ▶`:`はじめる ▶`}function uS(){cS=!0,nS.hidden=!1,lS(0),oS.focus()}function dS(){cS=!1,nS.hidden=!0,Z.tutorialSeen||(Z.tutorialSeen=!0,px()),Q.focus()}aS.addEventListener(`click`,()=>lS(Math.max(0,sS-1))),oS.addEventListener(`click`,()=>{sS+1<rS.length?lS(sS+1):dS()}),document.querySelector(`#open-tutorial`).addEventListener(`click`,uS);var fS=document.querySelector(`#hint-panel`),pS=document.querySelector(`#hint-list`),mS=document.querySelector(`#hint-more`),hS=0;function gS(){let e=X[Ux].hints;pS.replaceChildren(...e.slice(0,hS).map(e=>{let t=document.createElement(`li`);return t.textContent=e,t})),fS.hidden=hS===0,mS.hidden=hS>=e.length}function _S(){let e=X[Ux].hints;e.length===0?(pS.replaceChildren(Object.assign(document.createElement(`li`),{textContent:`このステージには、ヒントがありません。`})),fS.hidden=!1,mS.hidden=!0):(hS=Math.min(hS+1,e.length),gS())}document.querySelector(`#hint`).addEventListener(`click`,_S),mS.addEventListener(`click`,_S),document.querySelector(`#hint-close`).addEventListener(`click`,()=>{fS.hidden=!0}),bx.addEventListener(`click`,()=>{let e=X[Ux];(Qx.text()===e.text||window.confirm(`書き換えた文を消して、はじめの文に戻しますか？`))&&(window.clearTimeout(Zx),Pb(Z,e.file,e.text,e.text),px(),$x(Ux),Q.focus())}),Cx.addEventListener(`click`,()=>{Ux+1<X.length?$x(Ux+1):eS(),Q.focus()}),Sx.addEventListener(`click`,()=>{eS(),Q.focus()}),eS();var vS=new Set,yS=new Set,bS=[],xS,SS=`マウス`;function CS(e){let t=Q.getBoundingClientRect(),n=$?.screen??{width:Q.width,height:Q.height};return{x:(e.clientX-t.left)*n.width/t.width,y:(e.clientY-t.top)*n.height/t.height}}Q.addEventListener(`pointermove`,e=>{xS=CS(e)}),Q.addEventListener(`pointerdown`,e=>{let t=CS(e);xS=t,bS.push(t),vS.add(SS),yS.add(SS)}),window.addEventListener(`pointerup`,()=>vS.delete(SS));var wS=e=>e.target instanceof Element&&e.target.closest(`#code, #settings`)!==null;window.addEventListener(`keydown`,e=>{if(cS){e.key===`ArrowRight`||e.key===`Enter`?oS.click():e.key===`ArrowLeft`?lS(Math.max(0,sS-1)):e.key===`Escape`&&dS(),e.preventDefault();return}if(e.key===`Escape`&&!e.isComposing&&e.target instanceof Element&&e.target.closest(`#code`)){e.preventDefault(),document.activeElement?.blur(),Q.focus();return}if(e.key===`Escape`&&!e.isComposing&&Ox){e.preventDefault(),Px();return}if(wS(e))return;let t=Ma(e.key);t&&(e.preventDefault(),vS.add(t),yS.add(t))}),window.addEventListener(`keyup`,e=>{let t=Ma(e.key);t&&vS.delete(t)}),window.addEventListener(`blur`,()=>vS.clear()),document.querySelector(`#code`).addEventListener(`focusin`,()=>vS.clear());for(let e of document.querySelectorAll(`#tabs, #hint-panel, #cleared`))e.addEventListener(`click`,e=>{let t=e.target instanceof Element?e.target.closest(`button`):null;t&&document.activeElement===t&&(t.blur(),Q.focus())});Q.addEventListener(`pointerdown`,()=>{document.activeElement?.blur(),Q.focus()}),mx.addEventListener(`click`,()=>{Gx=!0,mx.hidden=!0,Q.focus(),$&&Db($.sounds.splice(0))});var TS=0,ES=null;function DS(e){if(ES!==null&&(TS+=(e-ES)/1e3),ES=e,$&&(Gx||Kx===`メニュー`)&&!Ox&&!cS){let e=0;for(;TS>=.016666666666666666&&e<5;){let t=Gx?{keys:[...new Set([...vS,...yS])],clicks:bS,mouse:xS}:{keys:[]};yS.clear(),bS=[];try{Zi($,t),Gx&&Db($.sounds.splice(0))}catch(e){let t=Hx;wb();let n=$.time>=1;n?Kx===`メニュー`?eS():Xx(t):$=null;let r=e instanceof Error&&e.message.includes(`今は画面にありません`);Jx(t,e,(n?`遊んでいる途中で止まったので、はじめからやり直しました。`:`遊び始めてすぐ止まってしまいます。`)+(r?`ものが世界の外へ飛び出して、消えてしまったようです。数を小さくしてみよう。`:``));break}if(Kx===`メニュー`){if(tS($),Kx!==`メニュー`)break}else!Wx&&$.variables.get(`クリア`)===!0&&(Wx=!0,qx.add(Ux),xx.hidden=!1,Z.cleared.includes(X[Ux].file)||(Z.cleared.push(X[Ux].file),px()));TS-=$e,e+=1}e===5&&(TS=0)}else TS=0;$&&(Vx($),wx.setTransform(Bx,0,0,Bx,0,0),wx.imageSmoothingQuality=`high`,Aa(wx,$,{selected:null,linked:[],selectedText:null,linkedTexts:[],editing:null,pointer:null},!1,bb)),requestAnimationFrame(DS)}requestAnimationFrame(DS);