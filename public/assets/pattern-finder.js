(() => {
 const groups=[
  [['Bike',1,10],['Bike',1,14],['Clothing',1,8],['Small electrical',0,16]],
  [['Clothing',1,9],['Bike',1,15],['Small electrical',1,12],['Clothing',0,12]],
  [['Small electrical',0,30],['Small electrical',1,26],['Bike',0,22],['Clothing',1,22]],
  [['Bike',1,10],['Clothing',1,12],['Bike',0,14],['Small electrical',1,12]],
  [['Small electrical',0,28],['Small electrical',1,30],['Small electrical',0,24],['Bike',1,18]],
  [['Clothing',1,8],['Bike',1,14],['Small electrical',1,16],['Clothing',1,10]]
 ];
 const rows=groups.flatMap((g,i)=>g.map((r,j)=>({id:i*4+j+1,session:i+1,item:r[0],fixed:Boolean(r[1]),wait:r[2],volunteers:[2,4].includes(i)?2:4})));
 const item=document.querySelector('#item-filter'),volunteers=document.querySelector('#volunteer-filter'),session=document.querySelector('#session-filter'),guess=document.querySelector('#pattern-guess');
 const el=(tag,text,cls)=>{const n=document.createElement(tag);if(text!==undefined)n.textContent=text;if(cls)n.className=cls;return n;};
 function selected(){return rows.filter(r=>(item.value==='all'||r.item===item.value)&&(volunteers.value==='all'||r.volunteers===Number(volunteers.value))&&(session.value==='all'||r.session===Number(session.value)));}
 function stats(data){return {count:data.length,fixed:data.filter(r=>r.fixed).length,wait:data.length?data.reduce((n,r)=>n+r.wait,0)/data.length:0};}
 function render(){const data=selected(),s=stats(data),metrics=document.querySelector('#data-metrics');metrics.replaceChildren();[[String(s.count),'visits selected'],[s.count?`${Math.round(s.fixed/s.count*100)}%`:'—','fixed'],[s.count?`${Number(s.wait.toFixed(1))} min`:'—','average wait']].forEach(([value,label])=>{const card=el('div',undefined,'metric');card.append(el('strong',value),el('span',label));metrics.append(card);});document.querySelector('#sample-caution').textContent=s.count===0?'No visits in this selection. Try another filter.':s.count<5?'Fewer than five visits. Too few to say much.':'Small, invented sample. A pattern is a question to explore.';
  const bars=document.querySelector('#bar-list');bars.replaceChildren();['Bike','Small electrical','Clothing'].forEach(type=>{const part=data.filter(r=>r.item===type),p=stats(part),row=el('div',undefined,'bar-row'),meter=el('meter');meter.min=0;meter.max=100;meter.value=p.count?p.fixed/p.count*100:0;meter.setAttribute('aria-label',`${type}: ${p.fixed} of ${p.count} fixed`);if(!p.count)row.classList.add('no-visits');row.append(el('span',type),meter,el('span',p.count?`${p.fixed} / ${p.count} fixed`:'No visits'));bars.append(row);});const tbody=document.querySelector('#visit-rows');tbody.replaceChildren();data.forEach(r=>{const tr=el('tr');[r.id,r.session,r.item,r.fixed?'Yes':'No',`${r.wait} min`,r.volunteers].forEach(v=>tr.append(el('td',String(v))));tbody.append(tr);});document.querySelector('#pattern-result').textContent='';
 }
 [item,volunteers,session].forEach(s=>s.addEventListener('change',render));document.querySelector('#test-pattern').addEventListener('click',()=>{const s=stats(selected());document.querySelector('#pattern-result').textContent=s.count?`${s.fixed} of ${s.count} visits were fixed. Average wait: ${Number(s.wait.toFixed(1))} minutes. Compare those figures with your guess${guess.value.trim()?` (“${guess.value.trim()}”)`:''}. What else could explain them?`:'There are no visits to compare. Change a filter first.';});document.querySelector('#data-reset').addEventListener('click',()=>{item.value=volunteers.value=session.value='all';guess.value='';render();});render();
})();
