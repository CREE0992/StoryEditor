/* 互动剧情编辑器: deterministic business rules. MIT License. */
(function(){
'use strict';
const H=typeof module==='object'&&module.exports?require('./common.js'):globalThis.OPC;
const {clone,esc,num,money,lines,choices,required,tableRows,metric,note,safeName,csv,parseCSV,day,today,unique,replaceTokens,documentHTML,crc32,zipBytes}=H;
const process=function process(d){
 const nodes=tableRows(d,'nodes'),links=Array.isArray(d.links)?d.links:[],ids=nodes.map(n=>required(n.id,'节点ID'));if(unique(ids).length!==ids.length)throw Error('节点ID重复');if(!ids.includes(d.start))throw Error('起始节点不存在');const vars={};for(const s of lines(d.vars)){const m=s.match(/^([A-Za-z_]\w*)=(-?\d+)$/);if(!m)throw Error('变量格式应为名称=整数');vars[m[1]]=Number(m[2]);}
 const notes=[];for(const e of links){if(!ids.includes(e.from)||!ids.includes(e.to))throw Error('选项引用不存在的节点：'+e.from+' → '+e.to);required(e.label,'选项文字');for(const [type,re] of [['condition',/^([A-Za-z_]\w*)\s*(>=|<=|==|!=|>|<)\s*(-?\d+)$/],['effect',/^([A-Za-z_]\w*)\s*(\+=|-=|=)\s*(-?\d+)$/]]){if(e[type]){const m=e[type].match(re);if(!m||!Object.hasOwn(vars,m[1]))throw Error('条件/变化格式错误或变量未定义：'+e[type]);}}}
 const reached=new Set([d.start]);let change=true;while(change){change=false;for(const e of links)if(reached.has(e.from)&&!reached.has(e.to)){reached.add(e.to);change=true;}}for(const id of ids)if(!reached.has(id))notes.push('结构上不可达节点：'+id);
 return {metrics:[metric('剧情节点',nodes.length),metric('交互选项',links.length),metric('结局节点',nodes.filter(n=>!links.some(e=>e.from===n.id)).length)],columns:['节点','剧情','选项数量'],rows:nodes.map(n=>[n.id,n.text,links.filter(e=>e.from===n.id).length]),notes,view:{kind:'game',title:d.title,nodes,links,vars,start:d.start},files:[{name:'剧情数据.json',text:JSON.stringify({title:d.title,nodes,links,vars,start:d.start},null,2)}]};
};
const api={process};
if(typeof module==='object'&&module.exports)module.exports=api;else globalThis.Core=api;
})();
