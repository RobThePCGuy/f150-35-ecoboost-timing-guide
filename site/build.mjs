// Builds the GitHub Pages site (docs/) from the Markdown in this repo.
// No dependencies: node site/build.mjs
import {readFileSync,writeFileSync,readdirSync,mkdirSync,copyFileSync} from 'node:fs';
import {join,dirname} from 'node:path';
import {fileURLToPath} from 'node:url';
const root=join(dirname(fileURLToPath(import.meta.url)),'..'),out=join(root,'docs');
const esc=s=>s.replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;');
const slug=s=>s.toLowerCase().replace(/<[^>]+>/g,'').replace(/[^a-z0-9]+/g,'-').replace(/^-|-$/g,'');
const refKeys={'BOLTS.md':'bolts','TORQUE.md':'torque','PARTS.md':'parts','RELEARN.md':'relearn'};
function linkTarget(href){
  if(/^https?:/.test(href))return {href,ext:true};
  const f=href.split('/').pop().split('#')[0];
  const st=/^(\d\d)-.*\.md$/.exec(f);
  if(st)return {href:'#stage/'+Number(st[1])};
  if(refKeys[f])return {href:'#ref/'+refKeys[f]};
  if(f==='LICENSE')return {href:'https://github.com/RobThePCGuy/f150-35-ecoboost-timing-guide/blob/main/LICENSE',ext:true};
  if(f==='README.md')return {href:'#home'};
  return {href};
}
function inline(t){
  const codes=[];
  t=t.replace(/`([^`]+)`/g,(_,c)=>{codes.push(c);return '\u0000'+(codes.length-1)+'\u0000';});
  t=esc(t);
  t=t.replace(/\[([^\]]+)\]\(([^)]+)\)/g,(_,txt,href)=>{const l=linkTarget(href.replace(/&amp;/g,'&'));return `<a href="${esc(l.href)}"${l.ext?' target="_blank" rel="noopener"':''}>${txt}</a>`;});
  t=t.replace(/\*\*([^*]+)\*\*/g,'<strong>$1</strong>').replace(/(^|[^*\w])\*([^*\s][^*]*?)\*(?!\w)/g,'$1<em>$2</em>');
  t=t.replace(/(Bag(?:s)? B\d\d-\d\d[^.;]*?)(?=$|\.\s|;)/g,'<span class="bag">$1</span>');
  return t.replace(/\u0000(\d+)\u0000/g,(_,i)=>{const c=esc(codes[i]);return /^From bags? |^Bags? /.test(codes[i])?`<span class="bag">${c}</span>`:`<code>${c}</code>`;});
}
const indentOf=l=>l.match(/^ */)[0].length;
function parseList(lines,i,base){
  const ordered=/^\s*\d+\.\s/.test(lines[i]);const items=[];
  while(i<lines.length){
    const l=lines[i];
    if(!l.trim()){
      // A blank line stays inside the list when the list carries on after it.
      let j=i;while(j<lines.length&&!lines[j].trim())j++;
      if(j<lines.length&&(indentOf(lines[j])>base||(indentOf(lines[j])===base&&/^\s*(?:[-*]|\d+\.)\s/.test(lines[j]))&&(/^\s*\d+\.\s/.test(lines[j])===ordered||indentOf(lines[j])>base))){i=j;continue;}
      break;
    }
    const ind=indentOf(l),m=/^\s*(?:[-*]|\d+\.)\s+(.*)$/.exec(l);
    if(m&&ind===base){items.push({text:m[1],body:[],step:ordered?Number(/\d+/.exec(l)[0]):0});i++;continue;}
    if(ind>base&&items.length){
      if(m){const r=parseList(lines,i,ind);items[items.length-1].body.push(r.html);i=r.i;continue;}
      items[items.length-1].body.push('<p class="note">'+inline(l.trim())+'</p>');i++;continue;
    }
    break;
  }
  const tag=ordered?'ol':'ul';
  return {i,html:`<${tag}>`+items.map(it=>`<li${it.step?` data-n="${it.step}"`:''}>${inline(it.text)}${it.body.join('')}</li>`).join('')+`</${tag}>`};
}
function md(src,opts={}){
  const lines=src.replace(/\r/g,'').split('\n');let html='',i=0,title='';
  while(i<lines.length){
    const l=lines[i];
    if(!l.trim()){i++;continue;}
    let h=/^(#{1,4})\s+(.*)$/.exec(l);
    if(h){const n=h[1].length,txt=inline(h[2]);if(n===1&&!title)title=h[2];html+=`<h${n} id="${slug(h[2])}">${txt}</h${n}>`;i++;continue;}
    if(/^\|/.test(l)){
      const rows=[];while(i<lines.length&&/^\|/.test(lines[i]))rows.push(lines[i++]);
      const cells=r=>r.replace(/^\||\|$/g,'').split('|').map(c=>c.trim());
      const head=cells(rows[0]),body=rows.slice(2).map(cells);
      html+='<div class="table-wrap"><table><thead><tr>'+head.map(c=>`<th>${inline(c)}</th>`).join('')+'</tr></thead><tbody>'+body.map(r=>'<tr>'+r.map((c,k)=>`<td data-label="${esc(head[k]||'').replace(/<[^>]+>/g,'')}">${inline(c)}</td>`).join('')+'</tr>').join('')+'</tbody></table></div>';
      continue;
    }
    if(/^\s*(?:[-*]|\d+\.)\s/.test(l)){const r=parseList(lines,i,indentOf(l));html+=r.html;i=r.i;continue;}
    const para=[];while(i<lines.length&&lines[i].trim()&&!/^(#|\||\s*(?:[-*]|\d+\.)\s)/.test(lines[i]))para.push(lines[i++].trim());
    html+='<p>'+inline(para.join(' '))+'</p>';
  }
  return {title,html};
}
// Stage pages: the app adds a checkbox to each step in ol.steps.
function stageHtml(n,src){
  let {title,html}=md(src);
  title=title.replace(/^Stage \d+:\s*/,'');
  html=html.replace(/<h1[^>]*>.*?<\/h1>/,`<p class="eyebrow">STAGE ${n} OF 16</p><h1>${n}. ${inline(title)}</h1>`);
  // Every top-level numbered list between "Steps" and the next h2 is a step list.
  html=html.replace(/(<h2 id="steps">Steps<\/h2>)([\s\S]*?)(?=<h2|$)/,(_,h,body)=>{
    let depth=0;
    return h+body.replace(/<(\/?)(ol|ul)>/g,(m,close,tag)=>{
      if(close){depth--;return m;}
      depth++;return depth===1&&tag==='ol'?'<ol class="steps">':m;
    });
  });
  return {title,html};
}
const stageFiles=readdirSync(join(root,'stages')).filter(f=>/^\d\d-.*\.md$/.test(f)).sort();
const stages=stageFiles.map(f=>{const n=Number(f.slice(0,2));const s=stageHtml(n,readFileSync(join(root,'stages',f),'utf8'));return {number:n,title:s.title,html:s.html};});
const refs=[['parts','Parts','PARTS.md'],['bolts','Bolts: what goes where','BOLTS.md'],['torque','Torque and specs','TORQUE.md'],['relearn','Misfire relearn','RELEARN.md']].map(([key,title,f])=>({key,title,html:md(readFileSync(join(root,f),'utf8')).html}));
const readme=md(readFileSync(join(root,'README.md'),'utf8')).html;
mkdirSync(out,{recursive:true});
writeFileSync(join(out,'data.js'),'window.JOB_DATA = '+JSON.stringify({stages,references:refs,readme}).replace(/<\//g,'<\\/')+';\n');
for(const f of ['index.html','app.css','core.js','app.js','print.html','print.js'])copyFileSync(join(root,'site',f),join(out,f));
writeFileSync(join(out,'.nojekyll'),'');
console.log(`built ${stages.length} stages, ${refs.length} references -> docs/`);
