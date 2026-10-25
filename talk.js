'use strict';
const notes = [
  ['0:00–0:30 · 30 seconds', `I’m Juan Petter. I build ARF, a control plane between AI agents and infrastructure. In the next seven minutes, I’ll show how a proposed action is allowed to run, refused, or held for a person. The key is the order: a governed attempt is recorded before execution.`],
  ['0:30–1:30 · 60 seconds', `Agents with write access can change storage, cloud resources and databases. A plausible answer can still lead to the wrong action. Imagine a request to delete a volume: the important question is whether this particular action, against this particular target, has authority to run.\nARF puts that decision at the execution boundary. The agent proposes. Policy and risk assessment decide what may proceed. The executor must respect that decision. That separation lets us inspect what was permitted and compare it with what actually happened.`],
  ['1:30–3:00 · 90 seconds', `Start with the proposed tool call. The ONTAP proxy must know what the tool changes, what resource it targets, and whether the action can be reversed. It evaluates policy and configured risk priors.\nApprove means this action passes the required checks. ARF records the attempt, executes, then checks the result with a separate read. Deny means the action is unsupported or outside policy. It is not forwarded upstream. Escalate means this decision requires a person. The action waits for approval scoped to that action and target. Approval for one volume cannot authorize another.\nThe core has Bayesian risk models, but this proxy demonstration uses configured per-tool priors. I’m showing the execution boundary here. If running late, skip that last sentence and preserve all three outcomes.`],
  ['3:00–6:00 · 180 seconds', `Use the rehearsed governed-run dashboard only if it is connected to the intended environment and its displayed evidence is verified. The existing public dashboard is simulated. Do not call its synthetic controls a live infrastructure run. This deck’s bundled fallback is explicitly a recorded run against simulated ONTAP.\n3:00–3:35 — Show an allowlisted read. It passes through without a proxy governance-ledger entry. Say “this allowlisted read,” not “all reads are free.”\n3:35–4:30 — Show create_snapshot: execution_attempted, completed result, and the independent snapshot_present read-back. The 30-second film summarizes this earlier step; use the run evidence in the rehearsal notes when narrating it.\n4:30–5:35 — Show the delete waiting for an admin, approval bound to app_data rather than scratch, and unsupported delete_lun refused with zero upstream calls. Never approve or execute a real delete for this talk preparation.\n5:35–6:00 — Return to the ledger. In fallback mode play the bundled 30-second film once, then pause and narrate these same beats. It is an existing visualization of the October 3 simulated run, not a new live run or a 90-second capture.`],
  ['6:00–7:00 · 60 seconds', `The signed audit path gives you hash-chained entries and Ed25519 signatures. With signing enabled, a tenant can export the API audit bundle and verify it offline with the public key. Editing an entry makes the verifier identify a hash mismatch.\nTwo boundaries matter. A signature protects the record; it does not by itself prove the physical outcome. That is why the independent read matters. And a valid chain does not prove nothing was removed from its end. For completeness you compare against a separately retained chain head.\nThe practical result is a decision before execution and a record the customer can check afterward. Probabilistic in. Auditable action out. Thank you.`]
];
const slides = [...document.querySelectorAll('.slide')];
const film = document.getElementById('film');
let current = 0;
function resize(){document.documentElement.style.setProperty('--scale', Math.min(innerWidth/1600, innerHeight/900));}
function show(index){
  current = Math.max(0, Math.min(slides.length-1,index));
  slides.forEach((slide,i)=>{slide.hidden=i!==current;slide.classList.toggle('active',i===current);});
  if(current!==3) film.pause();
  document.getElementById('counter').textContent=`${current+1} / ${slides.length}`;
  document.getElementById('prev').disabled=current===0;
  document.getElementById('next').disabled=current===slides.length-1;
  document.getElementById('timing').textContent=notes[current][0];
  const content=document.getElementById('note-text');content.replaceChildren();
  notes[current][1].split('\n').forEach(text=>{const p=document.createElement('p');p.textContent=text;content.append(p);});
  history.replaceState(null,'',`#${current+1}`);
}
function toggleNotes(){const panel=document.getElementById('notes');panel.hidden=!panel.hidden;document.getElementById('notes-toggle').setAttribute('aria-expanded',String(!panel.hidden));}
async function fullscreen(){try{if(document.fullscreenElement)await document.exitFullscreen();else await document.documentElement.requestFullscreen();}catch{/* Browser may disallow fullscreen; deck remains usable. */}}
document.getElementById('prev').onclick=()=>show(current-1);
document.getElementById('next').onclick=()=>show(current+1);
document.getElementById('notes-toggle').onclick=toggleNotes;
document.getElementById('fullscreen').onclick=fullscreen;
addEventListener('keydown',event=>{
  if(event.target.closest('video,button,input,textarea,a')||event.ctrlKey||event.metaKey||event.altKey)return;
  const key=event.key.toLowerCase();
  if(['arrowright','pagedown',' '].includes(key)){event.preventDefault();show(current+1);}
  else if(['arrowleft','pageup'].includes(key)){event.preventDefault();show(current-1);}
  else if(key==='home'){event.preventDefault();show(0);}
  else if(key==='end'){event.preventDefault();show(slides.length-1);}
  else if(key==='n')toggleNotes();else if(key==='f')fullscreen();
});
addEventListener('resize',resize);
addEventListener('hashchange',()=>show(Number(location.hash.slice(1))-1||0));
resize();show(Number(location.hash.slice(1))-1||0);
