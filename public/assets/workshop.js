const deck = document.querySelector('#presentation');
if (deck) {
  const slides = [
    {kicker:'01 / A little imagination',title:'What could you make in twenty minutes?',description:'Start with a small idea that helps someone. We’ll try a story, then a practical task.',label:'Explore the demos ↓',href:'#demos'},
    {kicker:'02 / Creative code',title:'Give a small idea room to grow.',description:'A tiny courier has a seed to deliver. Add a helper, change the pace, and see how the story feels.',label:'Open Seed Courier ↗',href:'demos/seed-courier.html'},
    {kicker:'03 / Words & judgment',title:'Can you find your next step?',description:'Read a fictional volunteer notice. Check the prepared AI draft: did the times, exceptions, and missing details survive?',label:'Open Make it clearer ↗',href:'demos/make-it-clearer.html'},
    {kicker:'04 / Your turn',title:'Make one small thing useful.',description:'Pick a fictional task. Give the model a clear brief. Change one detail, then ask a partner to check the result.',label:'Choose an activity ↗',href:'workshop.html'}
  ];
  let index = 0;
  const previous = document.querySelector('#previous-slide');
  const next = document.querySelector('#next-slide');
  function render() {
    const s = slides[index];
    document.querySelector('#slide-kicker').textContent=s.kicker;
    document.querySelector('#slide-title').textContent=s.title;
    document.querySelector('#slide-description').textContent=s.description;
    const link=document.querySelector('#slide-link'); link.textContent=s.label; link.href=s.href;
    document.querySelector('#slide-count').textContent=`${index+1} / ${slides.length}`;
    previous.disabled=index===0; next.disabled=index===slides.length-1;
  }
  function closeDeck() {if(document.fullscreenElement) document.exitFullscreen().catch(()=>{});deck.close();}
  document.querySelector('#start-workshop').addEventListener('click',()=>{index=0;render();deck.showModal();});
  document.querySelector('#close-deck').addEventListener('click',closeDeck);
  document.querySelector('#slide-link').addEventListener('click',()=>{if(index===0)closeDeck();});
  previous.addEventListener('click',()=>{index=Math.max(0,index-1);render();});
  next.addEventListener('click',()=>{index=Math.min(slides.length-1,index+1);render();});
  deck.addEventListener('keydown',e=>{if(e.key==='ArrowRight'){e.preventDefault();next.click();}if(e.key==='ArrowLeft'){e.preventDefault();previous.click();}});
  deck.addEventListener('cancel',()=>{if(document.fullscreenElement)document.exitFullscreen().catch(()=>{});});
  const fullscreen=document.querySelector('#fullscreen');
  if(!deck.requestFullscreen) fullscreen.hidden=true;
  fullscreen.addEventListener('click',async()=>{try{if(document.fullscreenElement)await document.exitFullscreen();else await deck.requestFullscreen();}catch{fullscreen.textContent='Use your browser’s full screen';}});
  document.addEventListener('fullscreenchange',()=>{fullscreen.textContent=document.fullscreenElement?'Exit full screen':'Full screen';});
}

document.querySelectorAll('[data-copy]').forEach(button=>button.addEventListener('click',async()=>{
  const text=document.querySelector(button.dataset.copy).innerText;
  try{await navigator.clipboard.writeText(text);button.textContent='Copied';setTimeout(()=>button.textContent='Copy prompt',1800);}
  catch{const range=document.createRange();range.selectNodeContents(document.querySelector(button.dataset.copy));const selection=getSelection();selection.removeAllRanges();selection.addRange(range);button.textContent='Text selected. Copy with your keyboard.';}
}));
