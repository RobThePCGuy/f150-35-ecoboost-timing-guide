(function(){
  'use strict';
  const data=window.JOB_DATA,core=window.JobCore,content=document.querySelector('#content');
  const storageKey='f150-timing-job-v1';
  let state={lastStage:1,done:{}},storageOK=true;
  try{state=core.readState(localStorage.getItem(storageKey));}catch(_){storageOK=false;}
  function save(){
    try{localStorage.setItem(storageKey,JSON.stringify(state));}catch(_){storageOK=false;}
    document.querySelector('#storage-warning').hidden=storageOK;
  }
  const stepCounts=data.stages.map(s=>{const t=document.createElement('template');t.innerHTML=s.html;return t.content.querySelectorAll('ol.steps > li').length;});
  function stageProgress(n){
    const total=stepCounts[n-1];let done=0;
    for(let i=1;i<=total;i++)if(state.done['s'+n+'-'+i])done++;
    return {done,total};
  }
  const links=document.querySelector('#stage-links');
  data.stages.forEach(s=>{
    const li=document.createElement('li'),a=document.createElement('a');
    a.href='#stage/'+s.number;a.dataset.stage=String(s.number);
    const num=document.createElement('span');num.className='stage-number';num.textContent=String(s.number).padStart(2,'0');
    const title=document.createElement('span');title.textContent=s.title;
    const tick=document.createElement('span');tick.className='stage-tick';tick.setAttribute('aria-hidden','true');
    a.append(num,title,tick);li.append(a);links.append(li);
  });
  function refreshTicks(){
    document.querySelectorAll('[data-stage]').forEach(a=>{
      const p=stageProgress(Number(a.dataset.stage));
      a.querySelector('.stage-tick').textContent=p.total&&p.done===p.total?'✓':'';
    });
  }
  function home(){
    content.innerHTML=`<div class="hero"><p class="eyebrow">2011–2014 F-150 · 3.5L ECOBOOST</p><h1>Let's do it.</h1><p class="hero-intro">Timing chains, phasers and oil pump.<br>One stage at a time, in the right order.</p><a class="primary" href="#stage/${state.lastStage}">${state.lastStage===1?"Start with stage 1 →":`Back to stage ${state.lastStage} →`}</a></div><section class="home-facts" aria-label="Job details"><div><p class="eyebrow">THE KITS</p><strong>Cloyes + Melling</strong><p>9-0738SAVVT3 · M390HV</p></div><div><p class="eyebrow">THE ROUTE</p><strong>16 stages</strong><p>Every bolt bagged and tracked</p></div><div><p class="eyebrow">THE FINISH</p><strong>Misfire relearn</strong><p>FORScan, required every time</p></div></section><div class="reference-body readme">${data.readme}</div>`;
    const h=content.querySelector('.readme h1');if(h)h.remove();
  }
  function stage(route){
    const s=data.stages[route.stage-1];state.lastStage=s.number;save();
    content.innerHTML=`<div class="stage-toolbar"><a href="#home">← The job</a><span class="progress" id="progress"></span><button type="button" id="print-page">Print this stage</button></div><div class="reference-body stage-body">${s.html}</div><nav class="stage-actions" aria-label="Stage navigation">${s.number>1?`<a class="secondary" href="#stage/${s.number-1}">← Previous</a>`:'<span></span>'}${s.number<16?`<a class="primary" href="#stage/${s.number+1}">Next: stage ${s.number+1} →</a>`:'<a class="primary" href="#home">Back to the job →</a>'}</nav>`;
    const progress=document.querySelector('#progress');
    function showProgress(){const p=stageProgress(s.number);progress.textContent=p.total?`${p.done} of ${p.total} steps done`:'';refreshTicks();}
    content.querySelectorAll('ol.steps > li').forEach((li,k)=>{
      const id='s'+s.number+'-'+(k+1),box=document.createElement('input');
      box.type='checkbox';box.className='step-check';box.checked=!!state.done[id];box.setAttribute('aria-label','Step '+(k+1)+' done');
      li.classList.toggle('is-done',box.checked);
      box.addEventListener('change',()=>{if(box.checked)state.done[id]=true;else delete state.done[id];li.classList.toggle('is-done',box.checked);save();showProgress();});
      li.prepend(box);
    });
    showProgress();
    document.querySelector('#print-page').addEventListener('click',()=>window.print());
  }
  function reference(ref){
    content.innerHTML='<div class="stage-toolbar"><a href="#stage/'+state.lastStage+'">← Back to stage '+state.lastStage+'</a></div><div class="reference-body">'+ref.html+'</div>';
    if(ref.key==='bolts'){
      content.querySelectorAll('tbody tr').forEach(tr=>{
        const bag=tr.cells[0]&&tr.cells[0].textContent.trim();if(!/^B\d\d-\d\d$/.test(bag))return;
        const id='bag-'+bag,box=document.createElement('input');
        box.type='checkbox';box.className='step-check';box.checked=!!state.done[id];box.setAttribute('aria-label','Bag '+bag+' back in');
        tr.classList.toggle('is-done',box.checked);
        box.addEventListener('change',()=>{if(box.checked)state.done[id]=true;else delete state.done[id];tr.classList.toggle('is-done',box.checked);save();});
        tr.cells[0].prepend(box);
      });
    }
  }
  function render(){
    const route=core.route(location.hash);
    document.querySelector('#stage-sidebar').classList.toggle('is-stage',route.view==='stage');
    document.querySelectorAll('[data-stage]').forEach(a=>{
      if(route.view==='stage'&&Number(a.dataset.stage)===route.stage)a.setAttribute('aria-current','step');else a.removeAttribute('aria-current');
    });
    document.querySelectorAll('[data-nav]').forEach(a=>{
      const active=a.dataset.nav===(route.view==='stage'?'home':route.view==='reference'?route.key:'home');
      if(active)a.setAttribute('aria-current','page');else a.removeAttribute('aria-current');
    });
    if(route.view==='stage')stage(route);
    else if(route.view==='reference'){
      const ref=data.references.find(x=>x.key===route.key);
      if(ref)reference(ref);else{location.replace('#home');return;}
    }else home();
    refreshTicks();
    const title=content.querySelector('h1');document.title=(title?title.textContent+' · ':'')+'F-150 EcoBoost Timing Job';
    document.querySelector('#storage-warning').hidden=storageOK;
    document.querySelector('#stage-menu').open=window.innerWidth>=1050;
    window.scrollTo(0,0);content.focus({preventScroll:true});
    if(route.anchor){const target=content.querySelector('[id="'+route.anchor+'"]');if(target)target.scrollIntoView({block:'start'});}
  }
  document.querySelector('.skip').addEventListener('click',event=>{event.preventDefault();content.focus();});
  window.addEventListener('hashchange',render);render();
})();
