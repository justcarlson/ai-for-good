const draft=document.querySelector('#draft');
const before=document.querySelector('#before-reveal');
const reveal=document.querySelector('#reveal');
const caption=document.querySelector('#source-caption');
const cards=[...document.querySelectorAll('[data-matches]')];
function highlight(keys){
 document.querySelectorAll('[data-source]').forEach(el=>el.classList.toggle('highlight',keys.includes(el.dataset.source)));
}
reveal.addEventListener('click',()=>{draft.hidden=false;before.hidden=true;reveal.setAttribute('aria-expanded','true');cards[0].focus();});
cards.forEach(card=>{card.setAttribute('aria-pressed','false');card.addEventListener('click',()=>{
 cards.forEach(x=>x.setAttribute('aria-pressed',String(x===card)));
 const keys=card.dataset.matches.split(',');highlight(keys);
 const source=keys.map(key=>document.querySelector(`[data-source="${key}"]`).textContent).join(' ');
 caption.textContent=`Source: ${source}`;
 if(matchMedia('(max-width:850px)').matches)document.querySelector('.source-panel').scrollIntoView({block:'start',behavior:matchMedia('(prefers-reduced-motion:reduce)').matches?'instant':'smooth'});
});});
document.querySelectorAll('[data-answer]').forEach(button=>{button.setAttribute('aria-pressed','false');button.addEventListener('click',()=>{
 document.querySelectorAll('[data-answer]').forEach(x=>x.setAttribute('aria-pressed',String(x===button)));
 const correct=button.dataset.answer==='optional';
 document.querySelector('#answer-feedback').textContent=correct?'Right. “If you have one” makes the bag optional.':'Look again: the notice says “if you have one.” The bag is optional.';
 highlight(['bag']);caption.textContent='Source: Bring a reusable bag if you have one.';
});});
document.querySelector('#reset').addEventListener('click',()=>{
 draft.hidden=true;before.hidden=false;reveal.setAttribute('aria-expanded','false');highlight([]);
 cards.forEach(x=>x.setAttribute('aria-pressed','false'));
 document.querySelectorAll('[data-answer]').forEach(x=>x.setAttribute('aria-pressed','false'));
 caption.textContent='Which time applies to you?';document.querySelector('#answer-feedback').textContent='';reveal.focus();
});
