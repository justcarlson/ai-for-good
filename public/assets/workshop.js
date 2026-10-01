const deck = document.querySelector('#presentation');
if (deck) {
  const slides = [
  {
    "kicker": "01 / Next week",
    "title": "Who needs this piece of writing?",
    "description": "Pick one reader: a student, a funder or a supporter. Name what they should know or do next.",
    "label": "Try the writing practice →",
    "href": "writing.html"
  },
  {
    "kicker": "02 / R-T-C-F",
    "title": "Role, Task, Context, Format.",
    "description": "Write each box for a task you do. Most weak results come from a thin Context box.",
    "label": "Try the builder ↗",
    "href": "nonprofit.html#builder"
  },
  {
    "kicker": "03 / Made-up data",
    "title": "Real structure, invented values.",
    "description": "No real names, contact details, donor, student, family, payroll or attendance records. Check accuracy, privacy and voice before anything is sent.",
    "label": "See the presets ↗",
    "href": "nonprofit.html#presets"
  },
  {
    "kicker": "04 / The session",
    "title": "Your host leads from here.",
    "description": "Prompt School and The Build run on the official site. The practice activities stay available if you want them.",
    "label": "Open the official AI Lab ↗",
    "href": "https://rtcf-workshop.emergent.host/"
  }
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
  document.querySelector('#slide-link').addEventListener('click',()=>{if(document.querySelector("#slide-link").getAttribute("href").startsWith("#"))closeDeck();});
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
  catch{const range=document.createRange();range.selectNodeContents(document.querySelector(button.dataset.copy));const selection=getSelection();selection.removeAllRanges();selection.addRange(range);button.textContent='Selected. Press Ctrl+C or ⌘C to copy.';}
}));
