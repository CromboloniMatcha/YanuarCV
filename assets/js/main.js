(()=>{
const D=window.CV,$=s=>document.querySelector(s);
const views=[['roster','Roster'],['skills','Skills'],['dossier','Dossier'],['missions','Missions'],['deployments','Deployments'],['credentials','Credentials']];
const nav=$('#nav'),stage=$('#stage'),wipe=$('#wipe'),boot=$('#boot');
let cur=views.some(v=>v[0]===location.hash.slice(1))?location.hash.slice(1):'roster',op=0,busy=false,ready=false,entered=false;
nav.innerHTML=views.map(([id,l],i)=>`<a href="#${id}" data-v="${id}"><b>0${i+1}</b>${l}</a>`).join('');
const chips=a=>a.map(s=>`<span class="chip">${s}</span>`).join('');
const R={
roster:()=>{const o=D.operators[op];return `<section class="roster row g-0">
 <div class="col-lg-5 portrait-col"><div class="frame cut"><div class="portrait cut"><svg viewBox="0 0 100 120"><circle cx="50" cy="42" r="20"/><path d="M12 120c0-34 16-48 38-48s38 14 38 48z"/></svg><span>PHOTO PENDING</span><img src="assets/img/photo.jpg" alt="Portrait of ${D.name}" onload="this.closest('.frame').classList.add('has-photo')" onerror="this.remove()"></div><div class="tag">${o.code}</div></div></div>
 <div class="col-lg-7 info"><p class="mono">// ${o.class}</p><h1>${D.name}</h1><h2>${o.title}</h2><p class="lead">${o.desc}</p>
 <div class="stats">${Object.entries(o.stats).map(([k,v])=>`<div class="stat"><span>${k}</span><i><u style="--v:${v}%"></u></i><em>${v}</em></div>`).join('')}</div>
 <div>${chips(o.skills)}</div></div>
 <div class="col-12 switch">${D.operators.map((x,i)=>`<button class="cut ${i===op?'on':''}" data-op="${i}"><b>${x.code}</b>${x.short}</button>`).join('')}<small>Q / E</small></div></section>`},
skills:()=>`<section class="rv"><p class="mono">// SKILL MATRIX</p><h1>Skills</h1><div class="row g-4 align-items-center"><div class="col-lg-7"><div id="radar" class="radar"></div></div><div class="col-lg-5"><div class="panel">${Object.entries(D.skillMatrix).map(([k,v])=>`<div class="stat"><span>${k}</span><i><u style="--v:${v}%"></u></i><em>${v}</em></div>`).join('')}</div></div></div></section>`,
dossier:()=>`<section class="rv"><p class="mono">// PERSONNEL DOSSIER</p><h1>About</h1>
 <div class="row g-4"><div class="col-lg-7"><p class="lead">${D.about}</p><a class="btn-e cut" href="${D.cvFile}" download>DOWNLOAD CV (PDF)</a></div>
 <div class="col-lg-5"><div class="panel"><h3>Education</h3>${D.education.map(e=>`<div class="ed"><span class="mono">${e.y}</span><br><b>${e.t}</b><small>${e.o}</small></div>`).join('')}</div>
 <div class="panel mt-3"><h3>Contact</h3><a href="mailto:${D.email}">${D.email}</a>${D.links.filter(l=>l.u).map(l=>`<a href="${l.u}" target="_blank" rel="noopener noreferrer">${l.l} &#8599;</a>`).join('')}</div></div></div></section>`,
missions:()=>`<section class="rv"><p class="mono">// MISSION LOG</p><h1>Experience</h1><div>${D.experience.map(x=>`<div class="mi"><div><span class="mono">${x.year}</span><br><em class="st">${x.status}</em></div><div><h3>${x.title}</h3><p class="mono">${x.org}</p><ul>${x.pts.map(p=>`<li>${p}</li>`).join('')}</ul></div></div>`).join('')}</div></section>`,
deployments:()=>`<section class="rv"><p class="mono">// DEPLOYMENTS</p><h1>Projects</h1><div class="row row-cols-1 row-cols-md-2 row-cols-xl-3 g-3">${D.projects.map(p=>`<div class="col"><a class="cp" href="${p.url}" target="_blank" rel="noopener noreferrer"><div class="thumb"${p.img?` style="background-image:url('${p.img}')"`:''}><span>${p.type}</span></div><div class="body"><h3>${p.title}</h3><p>${p.summary}</p><div>${chips(p.tags)}</div><span class="go">OPEN PROJECT &#8599;</span></div></a></div>`).join('')}</div></section>`,
credentials:()=>`<section class="rv"><p class="mono">// CREDENTIALS</p><h1>Certifications</h1><div class="row row-cols-1 row-cols-md-2 g-3">${D.certs.map((c,i)=>`<div class="col"><div class="panel"><span class="mono">CERT-0${i+1}</span><h3>${c}</h3></div></div>`).join('')}</div></section>`
};
function render(gl){
 stage.innerHTML=R[cur]();stage.className=gl?'gl':'';
 stage.querySelectorAll('.info>*,.rv>*').forEach((e,i)=>e.style.setProperty('--n',i%12));
 nav.querySelectorAll('a').forEach(a=>a.classList.toggle('on',a.dataset.v===cur));
 requestAnimationFrame(()=>requestAnimationFrame(()=>stage.classList.add('in')));
 if(cur==='skills')drawChart();
}
function swap(fn,fast){
 if(busy)return;busy=true;wipe.className='';void wipe.offsetWidth;wipe.className='run'+(fast?' fast':'');
 setTimeout(fn,fast?200:300);setTimeout(()=>busy=false,fast?450:650);
}
const setOp=i=>{const n=D.operators.length;swap(()=>{op=(i+n)%n;render(true)},true)};
const goView=()=>{const v=location.hash.slice(1);if(R[v]&&v!==cur)swap(()=>{cur=v;render()})};
addEventListener('hashchange',goView);
stage.addEventListener('click',e=>{
 const b=e.target.closest('[data-op]');if(b)setOp(+b.dataset.op);
 const f=e.target.closest('.has-photo');
 if(f){$('#lb img').src=f.querySelector('img').src;$('#lb').hidden=false}
});
function enter(){if(!ready||entered)return;entered=true;boot.classList.add('off');setTimeout(()=>boot.remove(),750)}
boot.addEventListener('click',enter);
addEventListener('keydown',e=>{
 if(!entered){enter();return}
 const k=e.key.toLowerCase();
 if(k==='escape')$('#lb').hidden=true;
 if((k==='q'||k==='e')&&cur==='roster')setOp(op+(k==='e'?1:-1));
 else if(/^[1-6]$/.test(k))location.hash=views[k-1][0];
});
const lines=['> INITIALIZING PERSONNEL FILE...','> LOADING MODULES [ PYTHON / ML / BI / WEB ]','> VERIFYING OPERATOR: YANUAR N. WICAKSONO','> STATUS: ONLINE'];
let n=0;(function t(){if(n<lines.length){$('#bootlog').append(lines[n++]+'\n');setTimeout(t,380)}else{$('#bootgo').hidden=false;ready=true}})();
const clk=()=>$('#clk').textContent=new Date().toLocaleTimeString('en-GB');clk();setInterval(clk,1000);
// Plotly skill chart (script loads only when the Skills page opens)
let plotlyP;
const loadPlotly=()=>plotlyP||(plotlyP=new Promise((ok,no)=>{const s=document.createElement('script');s.src='https://cdn.jsdelivr.net/npm/plotly.js-dist-min@2.35.2/plotly.min.js';s.onload=ok;s.onerror=()=>{plotlyP=null;no()};document.head.append(s)}));
function drawChart(){
 const el=$('#radar');if(!el)return;
 const k=Object.keys(D.skillMatrix),v=Object.values(D.skillMatrix),c=a=>[...a,a[0]];
 loadPlotly().then(()=>{
  if(!el.isConnected)return;
  Plotly.newPlot(el,[{type:'scatterpolar',r:c(v.map(()=>0)),theta:c(k),customdata:c(v),fill:'toself',fillcolor:'rgba(255,230,0,.5)',line:{color:'#141414',width:2.5},marker:{size:8,color:'#141414',symbol:'diamond'},hovertemplate:'%{theta}: %{customdata}<extra></extra>'}],
  {polar:{bgcolor:'rgba(0,0,0,0)',radialaxis:{range:[0,100],gridcolor:'#c6c6be',linecolor:'#141414',tickfont:{size:10}},angularaxis:{gridcolor:'#c6c6be',linecolor:'#141414'}},paper_bgcolor:'rgba(0,0,0,0)',font:{family:'Share Tech Mono, monospace',color:'#141414',size:12},margin:{t:30,b:30,l:70,r:70},showlegend:false},
  {displayModeBar:false,responsive:true}).then(()=>{
   const t0=performance.now();
   (function f(t){const p=Math.min(1,(t-t0)/900),e=1-Math.pow(1-p,3);Plotly.restyle(el,{r:[c(v.map(x=>x*e))]});if(p<1&&el.isConnected)requestAnimationFrame(f)})(t0);
  });
 }).catch(()=>{el.textContent='Chart could not load. Check your connection and reload.'});
}
// Photo parallax (off when the visitor prefers reduced motion)
if(!matchMedia('(prefers-reduced-motion:reduce)').matches){
 let raf;
 addEventListener('mousemove',e=>{cancelAnimationFrame(raf);raf=requestAnimationFrame(()=>{
  stage.style.setProperty('--px',(e.clientX/innerWidth-.5).toFixed(3));
  stage.style.setProperty('--py',(e.clientY/innerHeight-.5).toFixed(3));
 })});
}
// Photo viewer: click anywhere to close
$('#lb').addEventListener('click',()=>$('#lb').hidden=true);
render();
})();
