(function(root,factory){
  const api=factory();
  if(typeof module==='object'&&module.exports)module.exports=api;
  else root.JobCore=api;
})(typeof globalThis==='object'?globalThis:this,function(){
  'use strict';
  function route(hash){
    const stage=/^#stage\/(\d+)(?:\/([A-Za-z0-9_.:-]+))?$/.exec(hash);
    if(stage&&Number(stage[1])>=1&&Number(stage[1])<=16)return {view:'stage',stage:Number(stage[1]),anchor:stage[2]||''};
    const ref=/^#ref\/([a-z0-9-]+)(?:\/([A-Za-z0-9_.:-]+))?$/.exec(hash);
    if(ref)return {view:'reference',key:ref[1],anchor:ref[2]||''};
    return {view:'home'};
  }
  function readState(raw){
    const s={lastStage:1,done:{}};
    try{
      const v=JSON.parse(raw);
      if(v&&Number.isInteger(v.lastStage)&&v.lastStage>=1&&v.lastStage<=16)s.lastStage=v.lastStage;
      if(v&&v.done&&typeof v.done==='object')for(const k of Object.keys(v.done))if(/^(s\d+-\d+|bag-B\d\d-\d\d)$/.test(k)&&v.done[k]===true)s.done[k]=true;
    }catch(_){}
    return s;
  }
  return {route,readState};
});
