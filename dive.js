"use strict";const $=id=>document.getElementById(id),clamp=(v,a=0,b=1)=>Math.min(b,Math.max(a,v)),rm=matchMedia('(prefers-reduced-motion:reduce)'),fine=matchMedia('(hover:hover) and (pointer:fine)'),base='https://gwonjae06-droid.github.io/',gh='https://github.com/gwonjae06-droid/';function node(tag,text,cls){const e=document.createElement(tag);if(text)e.textContent=text;if(cls)e.className=cls;return e;}function safe(s){try{const u=new URL(s);return ['http:','https:'].includes(u.protocol)?u.href:null;}catch{return null;}}function link(text,url){const a=node('a',text);if(safe(url)){a.href=url;a.target='_blank';a.rel='noopener noreferrer';}return a;}
const projects=[{"name":"GAME WORKS","tech":"GAMES / WORLDS I BUILD","desc":"좋아하는 이야기를 직접 경험할 수 있도록 만들고 있습니다. 장르가 달라도 전투의 리듬과 이야기의 분위기를 플레이로 전달하고 싶다는 마음은 같습니다.","kind":"game","tone":"#1c3444","image":"game-works-logo.svg","url":"https://github.com/gwonjae06-droid/ochams-3d-battle","code":"https://github.com/gwonjae06-droid?tab=repositories","games":[{"name":"OCHAMS 3D BATTLE","url":"https://github.com/gwonjae06-droid/ochams-3d-battle"},{"name":"CAMPUS LEGENDS","url":"https://github.com/gwonjae06-droid/campus-legends"},{"name":"OIBUNG TRIALS","url":"https://github.com/gwonjae06-droid/oibung-trials"}]},{"name":"MINDSCAPE","tech":"PSYCHOLOGY / INTERACTIVE LEARNING","desc":"사람이 무엇에 끌리고 어떻게 판단하는지 궁금합니다. 심리학 개념을 먼저 직접 경험한 뒤, 그 이유를 쉽게 이해하도록 구성한 학습 공간입니다.","kind":"tool","tone":"#283751","image":"mindscape-logo.svg","url":"https://gwonjae06-droid.github.io/mindscape/","code":"https://github.com/gwonjae06-droid/mindscape"},{"name":"UNI-SURVIVAL","tech":"CAMPUS / PRACTICAL TOOL","desc":"과제, 팀플, 공강, 메일처럼 대학생의 일상에 있는 문제들을 다루는 도구입니다. 화면을 단순화해 필요한 기능을 빠르게 찾고 쓸 수 있도록 다듬고 있습니다.","kind":"tool","tone":"#294e58","image":"uni-survival-logo.svg","url":"https://gwonjae06-droid.github.io/portfolio/uni-survival/","code":"https://github.com/gwonjae06-droid/portfolio/tree/main/uni-survival"}];
projects.forEach((p,i)=>{const c=node('article',null,'card'),art=node('div',null,'art'),body=node('div',null,'body'),links=node('div',null,'links');c.dataset.kind=p.kind;art.style.setProperty('--tone',p.tone);const image=node('img');image.src='./assets/'+p.image;image.alt=p.name+' 대표 로고';image.loading='lazy';image.decoding='async';art.append(image);body.append(node('small',p.tech),node('h3',p.name),node('p',p.desc));links.append(link('체험하기 ↗',p.url),link('코드 ↗',p.code));body.append(links);if(p.games){const details=node('details',null,'game-list'),summary=node('summary','포함된 게임 프로젝트 보기');details.append(summary);p.games.forEach(g=>details.append(link(g.name+' ↗',g.url)));body.append(details);}c.append(art,body);$('cards').append(c);c.onpointermove=e=>{if(!fine.matches||rm.matches)return;const r=c.getBoundingClientRect(),x=clamp((e.clientX-r.left)/r.width),y=clamp((e.clientY-r.top)/r.height);c.style.setProperty('--x',x*100+'%');c.style.setProperty('--y',y*100+'%');c.style.setProperty('--rx',(0.5-y)*5+'deg');c.style.setProperty('--ry',(x-.5)*5+'deg');};c.onpointerleave=()=>{c.style.setProperty('--rx','0deg');c.style.setProperty('--ry','0deg');};});
const courses=[['AI 콘텐츠','(26-1) 성균공부방 : Share via AI','2026.06.22–07.31'],['AI 개발','바이브 코딩 마스터 클래스 with Claude','2026.06.01–06.25'],['데이터 분석','ChatGPT로 쉽게 하는 파이썬 데이터 분석','2026.06.23–07.12'],['머신러닝','파이썬 활용 머신러닝과 딥러닝 기초다지기','2026.06.23–07.12'],['AI 학습','KT AICE Associate 자격증 취득 과정','2026.07.13–08.02'],['영상 제작','2026 인텐시브 워크숍 "AI와 함께하는 영상 만들기(1차)"','2026.05.19–05.23']];courses.forEach(p=>{const c=node('article',null,'course reveal');c.append(node('small',p[0]),node('h3',p[1]),node('time',p[2]));$('courses').append(c);});
document.querySelectorAll('[data-filter]').forEach(b=>b.onclick=()=>{let n=0;document.querySelectorAll('[data-filter]').forEach(x=>x.setAttribute('aria-pressed',String(x===b)));document.querySelectorAll('.card').forEach(c=>{c.hidden=b.dataset.filter!=='all'&&c.dataset.kind!==b.dataset.filter;if(!c.hidden)n++;});$('count').textContent=String(n).padStart(2,'0');layout=true;});$('find').onclick=()=>{const open=$('secret').hidden;$('secret').hidden=!open;$('find').setAttribute('aria-expanded',String(open));};if('IntersectionObserver'in window){const ob=new IntersectionObserver(es=>es.forEach(e=>{if(e.isIntersecting){e.target.classList.remove('wait');ob.unobserve(e.target);}}),{threshold:.08});document.querySelectorAll('.reveal').forEach(e=>{e.classList.add('wait');ob.observe(e);});}
const canvas=$('ocean'),ctx=canvas.getContext('2d',{alpha:true}),zones=[...document.querySelectorAll('[data-zone]')],nav=[...document.querySelectorAll('[data-nav]')],rnd=n=>{const a=Math.sin(n*127.1+311.7)*43758.5453;return a-Math.floor(a);};let W=1,H=1,dpr=1,layout=true,boxes=[],maxY=1,sy=scrollY,prevY=sy,target=0,depth=0,velocity=0,roll=0,pan=0,zoom=1,last=0,raf=0,mx=.5,my=.4,dirty=true,lastAudio=0,lastDepth=-1,zoneIndex=-1;const motes=Array.from({length:72},(_,i)=>[rnd(i+1),rnd(i+81),rnd(i+161)]),perf={frames:0,fps:0,drawMs:0};window.__diveDiagnostics=perf;let sample=0,frames=0;
function size(){W=innerWidth;H=innerHeight;dpr=Math.min(devicePixelRatio||1,W<700?1:1.25);canvas.width=Math.round(W*dpr);canvas.height=Math.round(H*dpr);ctx?.setTransform(dpr,0,0,dpr,0,0);layout=dirty=true;}addEventListener('resize',size);addEventListener('scroll',()=>{sy=scrollY;dirty=true;},{passive:true});addEventListener('pointermove',e=>{if(fine.matches){mx=e.clientX/W;my=e.clientY/H;dirty=true;}});new ResizeObserver(()=>{layout=dirty=true;}).observe(document.body);size();
function measure(){boxes=zones.map(z=>{const r=z.getBoundingClientRect();return [r.top+scrollY,r.height,+z.dataset.min,+z.dataset.max];});maxY=Math.max(1,document.documentElement.scrollHeight-H);layout=false;}
function point(){const ref=sy+H*(.38+.62*clamp(sy/maxY));let i=0,p=0;boxes.forEach((b,n)=>{if(ref>=b[0]){i=n;p=clamp((ref-b[0])/Math.max(1,b[1]));}});if(sy>=maxY-2){i=boxes.length-1;p=1;}target=boxes[i][2]+(boxes[i][3]-boxes[i][2])*p;const value=Math.round(target);const dp=$('depthProgress');if(dp)dp.style.height=(clamp(sy/maxY)*100)+'%';if(value!==lastDepth){$('depthValue').textContent=value.toLocaleString('en-US');lastDepth=value;}if(i!==zoneIndex){$('zoneName').textContent=zones[i].dataset.zone;nav.forEach(a=>a.classList.toggle('on',a.hash==='#'+zones[i].id));zoneIndex=i;}}
function draw(t){
if(!ctx)return;
const d=clamp(depth/10994), sun=clamp(1-depth/2050), deep=clamp((depth-850)/9300);
const photo=$('ocean-photo'), stars=$('starfield');
if(photo){
  // The photograph is strictly invisible by ~2.4km. No surface in deep chapters.
  const visibility=clamp(1-depth/2400);
  const wave=rm.matches?0:1;
  const dx=(Math.sin(t*.31)*10+Math.sin(t*.13+1.9)*5)*visibility*wave;
  const dy=(Math.cos(t*.24)*6+Math.sin(t*.17)*3)*visibility*wave;
  photo.style.setProperty('--photo-opacity',visibility.toFixed(3));
  photo.style.setProperty('--photo-blur',(deep*12).toFixed(1)+'px');
  photo.style.setProperty('--photo-scale',(1.065-depth/10994*.045).toFixed(3));
  photo.style.setProperty('--photo-shift-x',dx.toFixed(2)+'px');
  photo.style.setProperty('--photo-shift-y',dy.toFixed(2)+'px');
  // Surface recedes upward as the viewer descends.
  photo.style.backgroundPosition='center '+(-6+clamp(depth/2000)*30).toFixed(1)+'%';
}
if(stars){
  // The darkness bridges to the unknown sky without showing stars in shallow water.
  const starsAlpha=clamp((depth-7450)/2850);
  stars.style.setProperty('--stars-opacity',starsAlpha.toFixed(3));
  stars.style.setProperty('--star-drift',rm.matches?'0px':(-Math.sin(t*.08)*6*starsAlpha).toFixed(2)+'px');
}
ctx.clearRect(0,0,W,H);
const darkness=ctx.createLinearGradient(0,0,0,H);
darkness.addColorStop(0,'rgba(1,6,15,'+(.03+deep*.76).toFixed(3)+')');
darkness.addColorStop(.5,'rgba(1,6,16,'+(.13+deep*.75).toFixed(3)+')');
darkness.addColorStop(1,'rgba(0,3,10,'+(.23+deep*.70).toFixed(3)+')');
ctx.fillStyle=darkness;ctx.fillRect(0,0,W,H);
if(sun>.025){
  ctx.save();
  ctx.globalAlpha=.54*sun;
  const yy=H*(.08-sun*.16);
  for(let n=0;n<5;n++){
    ctx.beginPath();
    for(let x=-20;x<=W+20;x+=14){
      const wave=Math.sin(x*.007+t*.48+n*.7)*5+Math.sin(x*.018-t*.29+n)*3.5+Math.sin(x*.035+t*.19)*1.5;
      const y=yy+wave+n*10;
      x<=-20?ctx.moveTo(x,y):ctx.lineTo(x,y);
    }
    ctx.lineWidth=n===0?1.7:.7;
    ctx.strokeStyle=['rgba(232,255,253,.47)','rgba(215,250,249,.25)','rgba(190,241,247,.18)','rgba(193,243,247,.08)','rgba(193,243,247,.05)'][n];
    ctx.stroke();
  }
  ctx.restore();
  // Diffuse shafts of light — only light and water, never fish or solid props.
  ctx.save();ctx.globalCompositeOperation='screen';
  for(let i=0;i<7;i++){
    const x=W*(.05+i*.16)+Math.sin(t*.21+i)*W*.015;
    const spread=60+i*13;
    const ray=ctx.createLinearGradient(x,0,x,H*.93);
    ray.addColorStop(0,'rgba(220,255,255,'+(.065*sun).toFixed(3)+')');
    ray.addColorStop(1,'rgba(127,190,207,0)');
    ctx.fillStyle=ray;
    ctx.beginPath();
    ctx.moveTo(x-18,-18);
    ctx.bezierCurveTo(x-spread*.4,H*.23,x-spread,H*.55,x-spread*1.8,H*.93);
    ctx.bezierCurveTo(x+spread,H*.57,x+spread*.2,H*.25,x+24,-18);
    ctx.closePath();ctx.fill();
  }
  ctx.restore();
}
const fog=ctx.createRadialGradient(W*.53,H*.25,10,W*.53,H*.52,Math.max(W,H)*.86);
fog.addColorStop(0,'rgba(0,0,0,0)');
fog.addColorStop(1,'rgba(0,1,8,'+(.32+d*.46).toFixed(3)+')');
ctx.fillStyle=fog;ctx.fillRect(0,0,W,H);
}
function prepareStarfield(){
const layer=$('starfield');if(!layer)return;
let seed=907;
const random=()=>{seed=(seed*1664525+1013904223)>>>0;return seed/4294967296;};
const gradients=[];
for(let i=0;i<90;i++){
 const x=(random()*98+1).toFixed(2),y=(random()*98+1).toFixed(2);
 const size=(i%17===0?1.25:.55+random()*.55).toFixed(2);
 const alpha=(.22+random()*.58).toFixed(2);
 const end=(+size+.75).toFixed(2);
 gradients.push('radial-gradient(circle at '+x+'% '+y+'%,rgba(218,238,255,'+alpha+') 0 '+size+'px,transparent '+end+'px)');
}
layer.style.backgroundImage=gradients.join(',');
}
prepareStarfield();

let ac=null,master,filter,noiseGain,drone,enabled=false;function audioUpdate(){if(!ac||ac.state!=='running')return;const d=clamp(depth/10994),now=ac.currentTime,level=enabled&&!document.hidden?.065:0;master.gain.setTargetAtTime(level,now,.35);filter.frequency.setTargetAtTime(1800*(1-d)+110,now,.5);noiseGain.gain.setTargetAtTime(.24+Math.abs(velocity)*.3,now,.25);drone.frequency.setTargetAtTime(42-15*d+Math.abs(velocity)*5,now,.8);}
function makeAudio(){const A=window.AudioContext||window.webkitAudioContext;if(!A)throw Error();ac=new A();master=ac.createGain();master.gain.value=0;const limiter=ac.createDynamicsCompressor();limiter.threshold.value=-18;limiter.ratio.value=12;master.connect(limiter);limiter.connect(ac.destination);filter=ac.createBiquadFilter();filter.type='lowpass';filter.frequency.value=1800;noiseGain=ac.createGain();noiseGain.gain.value=.2;const buffer=ac.createBuffer(1,ac.sampleRate*2,ac.sampleRate),data=buffer.getChannelData(0);let brown=0;for(let i=0;i<data.length;i++){brown=(brown+(Math.random()*2-1)*.02)/1.02;data[i]=brown*3.5;}const source=ac.createBufferSource();source.buffer=buffer;source.loop=true;source.connect(filter);filter.connect(noiseGain);noiseGain.connect(master);source.start();drone=ac.createOscillator();drone.type='sine';drone.frequency.value=42;const dg=ac.createGain();dg.gain.value=.12;drone.connect(dg);dg.connect(master);drone.start();}
function audioUI(){const b=$('sound');b.textContent=enabled?'심해 소리 끄기':'심해 소리 켜기';b.setAttribute('aria-pressed',String(enabled));b.setAttribute('aria-label',enabled?'잠수음 끄기':'잠수음 켜기');}$('sound').onclick=async()=>{const b=$('sound');b.disabled=true;try{if(!ac)makeAudio();enabled=!enabled;if(enabled)await ac.resume();audioUI();audioUpdate();}catch(e){enabled=false;audioUI();b.setAttribute('aria-label','이 브라우저에서 잠수음을 사용할 수 없습니다');}finally{b.disabled=false;}};
function frame(ms){raf=0;if(document.hidden)return;const start=performance.now(),dt=clamp((ms-last)/1000,.001,.05),ease=1-Math.exp(-dt*9);last=ms;if(layout)measure();if(dirty||Math.abs(depth-target)>1)point();const raw=clamp((sy-prevY)/Math.max(dt,.001)/2200,-1,1);prevY=sy;velocity+=(raw-velocity)*ease;depth=rm.matches?target:depth+(target-depth)*ease;const rr=rm.matches?0:Math.sin(sy*.00045)*.018+velocity*.026;roll+=(rr-roll)*ease;pan+=((rm.matches?0:Math.sin(sy*.0006)*W*.025+(mx-.5)*W*.012)-pan)*ease;zoom+=((rm.matches?1:1.055+Math.abs(velocity)*.065)-zoom)*ease;if(!rm.matches||dirty||Math.abs(depth-target)>1)draw(rm.matches?0:ms/1000);dirty=false;if(ms-lastAudio>50){audioUpdate();lastAudio=ms;}perf.frames++;frames++;perf.drawMs+=(performance.now()-start-perf.drawMs)*.05;if(ms-sample>1200){perf.fps=frames*1000/(ms-sample);sample=ms;frames=0;}raf=requestAnimationFrame(frame);}document.addEventListener('visibilitychange',()=>{if(document.hidden){cancelAnimationFrame(raf);raf=0;if(ac)ac.suspend().catch(()=>{});}else{last=performance.now();sample=last;frames=0;prevY=sy=scrollY;layout=dirty=true;if(enabled&&ac)ac.resume().catch(()=>{enabled=false;audioUI();});if(!raf)raf=requestAnimationFrame(frame);}});rm.addEventListener('change',()=>{dirty=true;document.querySelectorAll('.card').forEach(c=>{c.style.setProperty('--rx','0deg');c.style.setProperty('--ry','0deg');});});raf=requestAnimationFrame(frame);
