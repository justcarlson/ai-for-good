(() => {
 const canvas=document.querySelector('#scene'),ctx=canvas.getContext('2d');
 if(!ctx || typeof drawScene!=='function'){document.querySelector('#stage-caption').textContent='The scene could not load. Open the workshop prompts to explore the idea.';return;}
 const motionQuery=matchMedia('(prefers-reduced-motion:reduce)');
 let motion=!motionQuery.matches,playing=motion,t=0,invited=0,last=0,currentStage=-1;
 const pace=document.querySelector('#pace'),palette=document.querySelector('#palette');
 const pause=document.querySelector('#play-pause'),motionButton=document.querySelector('#motion-toggle'),next=document.querySelector('#next-scene');
 const stages=[{time:0,text:'A tiny courier has a seed to deliver.'},{time:8,text:'A little help makes the path easier.'},{time:17,text:'Helping hands bring the street to life.'},{time:29,text:'There’s room for a seed to become a tree.'},{time:38,text:'A shared garden, grown one small act at a time.'}];
 const snapshots=[0,12,24,35,45];
 function stageAt(){let i=0;while(i<4&&t>=stages[i+1].time)i++;return i;}
 function updateUI(){
  const i=stageAt();
  if(i!==currentStage){currentStage=i;document.querySelector('#stage-caption').textContent=stages[i].text;}
  document.querySelectorAll('.timeline button').forEach((b,k)=>b.setAttribute('aria-pressed',String(k===i)));
  pause.textContent=playing?'Pause':'Play';pause.hidden=!motion;
  motionButton.textContent=motion?'Motion on':'Motion off';motionButton.setAttribute('aria-pressed',String(motion));next.hidden=motion;
  document.querySelector('#helper-count').textContent=`${invited} helper${invited===1?'':'s'} invited`;
  document.querySelector('#add-helper').disabled=invited>=5;
  const seconds=Math.floor(t);document.querySelector('#time-label').textContent=`0:${String(seconds).padStart(2,'0')} / 0:45`;
 }
 function draw(){
  const auto=Math.min(5,Math.max(0,Math.floor((t-8)/6)+1));
  drawScene(ctx,canvas.width,canvas.height,t,Math.max(invited,auto),palette.value);updateUI();
 }
 function resize(){const width=canvas.getBoundingClientRect().width;const dpr=Math.min(devicePixelRatio||1,2);canvas.width=Math.round(width*dpr);canvas.height=Math.round(width*dpr/2);draw();}
 function frame(now){const dt=last?Math.min((now-last)/1000,.06):0;last=now;if(motion&&playing&&document.visibilityState==='visible'){t=Math.min(45,t+dt*Number(pace.value));if(t>=45)playing=false;draw();}requestAnimationFrame(frame);}
 function reset(){t=0;invited=0;currentStage=-1;playing=motion;draw();}
 function addHelper(){invited=Math.min(5,invited+1);if(t<11)t=11;draw();}
 document.querySelector('#add-helper').addEventListener('click',addHelper);
 pause.addEventListener('click',()=>{if(t>=45)t=0;playing=!playing;draw();});
 document.querySelector('#replay').addEventListener('click',reset);
 motionButton.addEventListener('click',()=>{motion=!motion;playing=motion&&t<45;draw();});
 next.addEventListener('click',()=>{t=snapshots[(stageAt()+1)%5];draw();});
 document.querySelectorAll('.timeline button').forEach(button=>button.addEventListener('click',()=>{t=Number(button.dataset.time);if(t>=45)playing=false;draw();}));
 palette.addEventListener('change',draw);
 document.addEventListener('keydown',event=>{if(event.altKey||event.ctrlKey||event.metaKey||event.repeat||event.target.closest('button,a,input,select,textarea,summary,[contenteditable]'))return;
  if(event.code==='Space'){event.preventDefault();addHelper();}
  if(event.key.toLowerCase()==='p'&&motion)pause.click();
  if(event.key.toLowerCase()==='r')reset();
 });
 motionQuery.addEventListener('change',e=>{motion=!e.matches;playing=motion&&t<45;draw();});
 document.addEventListener('visibilitychange',()=>{last=0;});
 new ResizeObserver(resize).observe(canvas);resize();requestAnimationFrame(frame);
})();
