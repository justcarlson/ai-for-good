(() => {
 const params=new URLSearchParams(location.search);let host=params.get('host')==='1';
 const items=WORKSHOP_LIBRARY.activities,grid=document.querySelector('#activity-grid');
 const theme=document.querySelector('#theme-filter'),format=document.querySelector('#format-filter'),time=document.querySelector('#time-filter');
 function el(tag,text,cls){const n=document.createElement(tag);if(text!==undefined)n.textContent=text;if(cls)n.className=cls;return n;}
 function render(){
  grid.replaceChildren();const limit=Number(time.value),short=limit===5;
  const shown=items.filter(a=>(theme.value==='all'||a.theme===theme.value)&&(format.value==='all'||a.kind===format.value)&&(time.value==='all'||(short?a.demoMinutes:a.activityMinutes)<=limit));
  document.querySelector('#filter-status').textContent=`${shown.length} of ${items.length} activities`;
  shown.forEach(a=>{const card=el('article',undefined,'activity-card');const meta=el('div');meta.append(el('span',a.theme,'eyebrow'),el('span',String(items.indexOf(a)+1).padStart(2,'0'),'card-mark'));const heading=el('h2');const guide=`activity.html?id=${a.id}${host?'&host=1':''}`;const link=el('a',a.title);link.href=a.demoPath||guide;heading.append(link);const links=el('div',undefined,'card-links');const open=el('a',a.demoPath?'Open demo ↗':'Open activity ↗','text-link');open.href=a.demoPath||guide;links.append(open);if(a.demoPath){const notes=el('a',host?'Presenter guide':'Activity guide');notes.href=guide;links.append(notes);}card.append(meta,heading,el('p',a.summary),el('div',`${a.demoMinutes} min to show · ${a.activityMinutes} min to try`,'activity-times'),links);grid.append(card);});
  if(!shown.length)grid.append(el('p','No activities fit these filters. Try a longer time or another theme.','no-results'));
  const toggle=document.querySelector('#host-toggle');toggle.setAttribute('aria-pressed',String(host));toggle.textContent=`Presenter mode ${host?'on':'off'}`;document.querySelector('#host-note').hidden=!host;
 }
 [theme,format,time].forEach(x=>x.addEventListener('change',render));document.querySelector('#host-toggle').addEventListener('click',()=>{host=!host;render();});render();
})();
