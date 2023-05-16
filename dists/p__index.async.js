"use strict";(self.webpackChunk=self.webpackChunk||[]).push([[866],{24437:function(ee,B,c){c.r(B),c.d(B,{default:function(){return M}});var T=c(15009),i=c.n(T),z=c(99289),m=c.n(z),b=c(5574),X=c.n(b),S=c(67294),N=c(22253),O=c(82670),H=c(11889),$=function(s){var R=s.url,E=s.data,j=s.method,U=j===void 0?"post":j,A=s.headers,F=A===void 0?{}:A,g=s.requestList;return new Promise(function(P,q){var k=new XMLHttpRequest;k.open(U,R),Object.keys(F).forEach(function(w){k.setRequestHeader(w,F[w])}),k.send(E),k.onload=function(w){if(g){var Z=g.findIndex(function(D){return D===k});g.splice(Z,1)}return P({data:w.target.response})},g==null||g.push(k)})},o=c(85893),J=5*1024*1024,G=function(){var s=(0,S.useRef)({file:null,worker:{},fileHash:"",requestXhrList:[],uploadedNum:0}),R=(0,S.useState)(0),E=X()(R,2),j=E[0],U=E[1],A=(0,S.useState)(0),F=X()(A,2),g=F[0],P=F[1],q=function(n){for(var e=arguments.length>1&&arguments[1]!==void 0?arguments[1]:J,a=[],r=0;r<n.size;)a.push({file:n.slice(r,r+e)}),r+=e;return a},k=function(){var l=m()(i()().mark(function n(){var e,a,r;return i()().wrap(function(t){for(;;)switch(t.prev=t.next){case 0:return e=s.current,a=e.file,r=e.fileHash,t.next=3,$({url:"http://localhost:8100/merge",method:"post",data:JSON.stringify({fileName:a==null?void 0:a.name,size:J,fileHash:r})});case 3:case"end":return t.stop()}},n)}));return function(){return l.apply(this,arguments)}}(),w=function(){var l=m()(i()().mark(function n(){var e,a,r,u,t,p,d=arguments;return i()().wrap(function(y){for(;;)switch(y.prev=y.next){case 0:return e=d.length>0&&d[0]!==void 0?d[0]:[],a=s.current,r=a.file,u=a.chunkData,t=a.requestXhrList,p=u.filter(function(h){var v=h.hash;return!e.includes(v)}).map(function(h){var v=new FormData;return v.append("chunk",h==null?void 0:h.chunk),v.append("hash",h==null?void 0:h.hash),v.append("fileHash",h.fileHash),v.append("fileName",r==null?void 0:r.name),{formData:v}}).map(function(){var h=m()(i()().mark(function v(_){var I,L;return i()().wrap(function(C){for(;;)switch(C.prev=C.next){case 0:return C.next=2,$({url:"http://localhost:8100/upload",method:"post",data:_.formData,requestList:t});case 2:return I=C.sent,L=JSON.parse(I.data),(L==null?void 0:L.code)===1&&(s.current.uploadedNum++,P(100/u.length*s.current.uploadedNum)),C.abrupt("return",L);case 6:case"end":return C.stop()}},v)}));return function(v){return h.apply(this,arguments)}}()),y.next=5,Promise.all(p);case 5:if(e.length+p.length!==u.length){y.next=8;break}return y.next=8,k();case 8:case"end":return y.stop()}},n)}));return function(){return l.apply(this,arguments)}}(),Z=function(n){return new Promise(function(e){var a=new Worker("/hash.js");a.postMessage({fileChunkList:n}),a.onmessage=function(r){var u=r.data,t=u.percentage,p=u.hash;U(t),p&&e(p)},s.current.worker=a})},D=function(){var l=m()(i()().mark(function n(e,a){var r;return i()().wrap(function(t){for(;;)switch(t.prev=t.next){case 0:return t.next=2,$({url:"http://localhost:8100/verify",method:"post",data:JSON.stringify({fileName:e,fileHash:a})});case 2:return r=t.sent,t.abrupt("return",JSON.parse(r==null?void 0:r.data));case 4:case"end":return t.stop()}},n)}));return function(e,a){return l.apply(this,arguments)}}(),K=function(){var l=m()(i()().mark(function n(e){return i()().wrap(function(r){for(;;)switch(r.prev=r.next){case 0:s.current.file=e.target.files[0];case 1:case"end":return r.stop()}},n)}));return function(e){return l.apply(this,arguments)}}(),Q=function(){var l=m()(i()().mark(function n(){var e,a,r,u,t,p;return i()().wrap(function(f){for(;;)switch(f.prev=f.next){case 0:if(e=s.current.file,e){f.next=4;break}return N.ZP.info("\u8BF7\u5148\u4E0A\u4F20\u6587\u4EF6"),f.abrupt("return");case 4:return a=q(e),f.next=8,Z(a);case 8:return r=f.sent,f.next=11,D(e.name,r);case 11:if(u=f.sent,t=u.shouldUpload,p=u.uploadedList,t){f.next=17;break}return N.ZP.success("\u6587\u4EF6\u4E0A\u4F20\u6210\u529F (\u5B9E\u9645\u4E0A\u670D\u52A1\u5668\u5DF2\u7ECF\u6587\u4EF6\u4E86\uFF0C\u4E0D\u9700\u8981\u4E0A\u4F20\uFF0C\u8FD9\u91CC\u53EA\u662F\u7ED9\u5BA2\u6237\u770B\u7684\u5047\u8C61)"),f.abrupt("return");case 17:return s.current.chunkData=a.map(function(y,h){return{chunk:y.file,hash:"".concat(r,"-").concat(h),fileHash:r}}),s.current.fileHash=r,f.next=21,w(p);case 21:case"end":return f.stop()}},n)}));return function(){return l.apply(this,arguments)}}(),V=function(){var n=s.current.requestXhrList;n.forEach(function(e){return e==null?void 0:e.abort()}),s.current.requestXhrList=[]},Y=function(){var l=m()(i()().mark(function n(){var e,a,r,u,t;return i()().wrap(function(d){for(;;)switch(d.prev=d.next){case 0:if(e=s.current,a=e.file,r=e.fileHash,a){d.next=3;break}return d.abrupt("return");case 3:return d.next=5,D(a.name,r);case 5:return u=d.sent,t=u.uploadedList,d.next=9,w(t);case 9:case"end":return d.stop()}},n)}));return function(){return l.apply(this,arguments)}}(),x=function(){var l=m()(i()().mark(function n(){var e,a;return i()().wrap(function(u){for(;;)switch(u.prev=u.next){case 0:return u.next=2,$({url:"http://localhost:8100/delete",method:"post"});case 2:e=u.sent,a=JSON.parse(e==null?void 0:e.data),N.ZP.success(a.message);case 5:case"end":return u.stop()}},n)}));return function(){return l.apply(this,arguments)}}();return(0,o.jsxs)("div",{children:[(0,o.jsx)("input",{type:"file",onChange:K}),(0,o.jsxs)("div",{children:["\u8BA1\u7B97\u6587\u4EF6\u5185\u5BB9 hash \u7684\u8FDB\u5EA6\uFF1A",(0,o.jsx)(O.Z,{percent:j,style:{width:"400px"}})]}),(0,o.jsxs)("div",{children:["\u4E0A\u4F20\u6587\u4EF6\u7684\u8FDB\u5EA6\uFF1A",(0,o.jsx)(O.Z,{percent:g,style:{width:"400px"}})]}),(0,o.jsx)(H.Z,{onClick:Q,children:"\u4E0A\u4F20"}),(0,o.jsx)(H.Z,{onClick:V,children:"\u6682\u505C\u4E0A\u4F20"}),(0,o.jsx)(H.Z,{type:"primary",onClick:Y,children:"\u6062\u590D\u4E0A\u4F20"}),(0,o.jsx)(H.Z,{onClick:x,title:"\u5220\u9664\u670D\u52A1\u5668\u7AEF\u5B58\u653E\u5207\u7247\u7684\u76EE\u5F55",children:"\u5220\u9664"})]})},M=G}}]);
