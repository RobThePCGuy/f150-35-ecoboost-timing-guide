(function(){
  'use strict';
  const d=window.JOB_DATA,all=document.querySelector('#all'),ref=k=>d.references.find(r=>r.key===k);
  const parts=[['Parts',ref('parts').html],['Bolts',ref('bolts').html]];
  d.stages.forEach(s=>parts.push(['Stage '+s.number,s.html]));
  parts.push(['Torque',ref('torque').html],['Relearn',ref('relearn').html]);
  all.innerHTML=parts.map(([k,h])=>`<section class="print-section">${h}</section>`).join('');
  // Links that point inside the site become plain text on paper.
  all.querySelectorAll('a[href^="#"]').forEach(a=>a.replaceWith(...a.childNodes));
  document.querySelector('#print-all').addEventListener('click',()=>window.print());
})();
