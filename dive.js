"use strict";const $=id=>document.getElementById(id),clamp=(v,a=0,b=1)=>Math.min(b,Math.max(a,v)),rm=matchMedia('(prefers-reduced-motion:reduce)'),fine=matchMedia('(hover:hover) and (pointer:fine)'),base='https://gwonjae06-droid.github.io/',gh='https://github.com/gwonjae06-droid/';function node(tag,text,cls){const e=document.createElement(tag);if(text)e.textContent=text;if(cls)e.className=cls;return e;}function safe(s){try{const u=new URL(s);return ['http:','https:'].includes(u.protocol)?u.href:null;}catch{return null;}}function link(text,url){const a=node('a',text);if(safe(url)){a.href=url;a.target='_blank';a.rel='noopener noreferrer';}return a;}
const projects=[{"name":"GAME WORKS","tech":"GAMES / WORLDS I BUILD","desc":"좋아하는 이야기를 직접 경험할 수 있도록 만들고 있습니다. 장르가 달라도 전투의 리듬과 이야기의 분위기를 플레이로 전달하고 싶다는 마음은 같습니다.","kind":"game","tone":"#1c3444","image":"game-works-logo.svg","url":"https://github.com/gwonjae06-droid/ochams-3d-battle","code":"https://github.com/gwonjae06-droid?tab=repositories","games":[{"name":"OCHAMS 3D BATTLE","url":"https://github.com/gwonjae06-droid/ochams-3d-battle"},{"name":"CAMPUS LEGENDS","url":"https://github.com/gwonjae06-droid/campus-legends"},{"name":"OIBUNG TRIALS","url":"https://github.com/gwonjae06-droid/oibung-trials"}]},{"name":"MINDSCAPE","tech":"PSYCHOLOGY / INTERACTIVE LEARNING","desc":"사람이 무엇에 끌리고 어떻게 판단하는지 궁금합니다. 심리학 개념을 먼저 직접 경험한 뒤, 그 이유를 쉽게 이해하도록 구성한 학습 공간입니다.","kind":"tool","tone":"#283751","image":"mindscape-logo.svg","url":"https://gwonjae06-droid.github.io/mindscape/","code":"https://github.com/gwonjae06-droid/mindscape"},{"name":"UNI-SURVIVAL","tech":"CAMPUS / PRACTICAL TOOL","desc":"과제, 팀플, 공강, 메일처럼 대학생의 일상에 있는 문제들을 다루는 도구입니다. 화면을 단순화해 필요한 기능을 빠르게 찾고 쓸 수 있도록 다듬고 있습니다.","kind":"tool","tone":"#294e58","image":"uni-survival-logo.svg","url":"https://gwonjae06-droid.github.io/portfolio/uni-survival/","code":"https://github.com/gwonjae06-droid/portfolio/tree/main/uni-survival"}];
projects.forEach((p,i)=>{const c=node('article',null,'card'),art=node('div',null,'art'),body=node('div',null,'body'),links=node('div',null,'links');c.dataset.kind=p.kind;art.style.setProperty('--tone',p.tone);const image=node('img');image.src='./assets/'+p.image;image.alt=p.name+' 대표 로고';image.loading='lazy';image.decoding='async';art.append(image);body.append(node('small',p.tech),node('h3',p.name),node('p',p.desc));links.append(link('체험하기 ↗',p.url),link('코드 ↗',p.code));body.append(links);if(p.games){const details=node('details',null,'game-list'),summary=node('summary','포함된 게임 프로젝트 보기');details.append(summary);p.games.forEach(g=>details.append(link(g.name+' ↗',g.url)));body.append(details);}c.append(art,body);$('cards').append(c);c.onpointermove=e=>{if(!fine.matches||rm.matches)return;const r=c.getBoundingClientRect(),x=clamp((e.clientX-r.left)/r.width),y=clamp((e.clientY-r.top)/r.height);c.style.setProperty('--x',x*100+'%');c.style.setProperty('--y',y*100+'%');c.style.setProperty('--rx',(0.5-y)*5+'deg');c.style.setProperty('--ry',(x-.5)*5+'deg');};c.onpointerleave=()=>{c.style.setProperty('--rx','0deg');c.style.setProperty('--ry','0deg');};});
const courses=[['AI 콘텐츠','(26-1) 성균공부방 : Share via AI','2026.06.22–07.31'],['AI 개발','바이브 코딩 마스터 클래스 with Claude','2026.06.01–06.25'],['데이터 분석','ChatGPT로 쉽게 하는 파이썬 데이터 분석','2026.06.23–07.12'],['머신러닝','파이썬 활용 머신러닝과 딥러닝 기초다지기','2026.06.23–07.12'],['AI 학습','KT AICE Associate 자격증 취득 과정','2026.07.13–08.02'],['영상 제작','2026 인텐시브 워크숍 "AI와 함께하는 영상 만들기(1차)"','2026.05.19–05.23']];courses.forEach(p=>{const c=node('article',null,'course reveal');c.append(node('small',p[0]),node('h3',p[1]),node('time',p[2]));$('courses').append(c);});
document.querySelectorAll('[data-filter]').forEach(b=>b.onclick=()=>{let n=0;document.querySelectorAll('[data-filter]').forEach(x=>x.setAttribute('aria-pressed',String(x===b)));document.querySelectorAll('.card').forEach(c=>{c.hidden=b.dataset.filter!=='all'&&c.dataset.kind!==b.dataset.filter;if(!c.hidden)n++;});$('count').textContent=String(n).padStart(2,'0');layout=true;});$('find').onclick=()=>{const open=$('secret').hidden;$('secret').hidden=!open;$('find').setAttribute('aria-expanded',String(open));};if('IntersectionObserver'in window){const ob=new IntersectionObserver(es=>es.forEach(e=>{if(e.isIntersecting){e.target.classList.remove('wait');ob.unobserve(e.target);}}),{threshold:.08});document.querySelectorAll('.reveal').forEach(e=>{e.classList.add('wait');ob.observe(e);});}
const canvas=$('ocean'),ctx=canvas.getContext('2d',{alpha:true}),zones=[...document.querySelectorAll('[data-zone]')],nav=[...document.querySelectorAll('[data-nav]')],rnd=n=>{const a=Math.sin(n*127.1+311.7)*43758.5453;return a-Math.floor(a);};let W=1,H=1,dpr=1,layout=true,boxes=[],maxY=1,sy=scrollY,prevY=sy,target=0,depth=0,velocity=0,roll=0,pan=0,zoom=1,last=0,raf=0,mx=.5,my=.4,dirty=true,lastAudio=0,lastDepth=-1,zoneIndex=-1;const motes=Array.from({length:72},(_,i)=>[rnd(i+1),rnd(i+81),rnd(i+161)]),perf={frames:0,fps:0,drawMs:0};window.__diveDiagnostics=perf;let sample=0,frames=0;
function size(){W=innerWidth;H=innerHeight;dpr=Math.min(devicePixelRatio||1,W<700?1:1.25);canvas.width=Math.round(W*dpr);canvas.height=Math.round(H*dpr);ctx?.setTransform(dpr,0,0,dpr,0,0);if(starCanvas&&starCtx){starCanvas.width=Math.round(W*dpr);starCanvas.height=Math.round(H*dpr);starCtx.setTransform(dpr,0,0,dpr,0,0);}if(surfaceRenderer)surfaceRenderer.resize(W,H,dpr);layout=dirty=true;}addEventListener('resize',size);addEventListener('scroll',()=>{sy=scrollY;dirty=true;},{passive:true});addEventListener('pointermove',e=>{if(fine.matches){mx=e.clientX/W;my=e.clientY/H;dirty=true;}});new ResizeObserver(()=>{layout=dirty=true;}).observe(document.body);
function measure(){boxes=zones.map(z=>{const r=z.getBoundingClientRect();return [r.top+scrollY,r.height,+z.dataset.min,+z.dataset.max];});maxY=Math.max(1,document.documentElement.scrollHeight-H);layout=false;}
function point(){const ref=sy+H*(.38+.62*clamp(sy/maxY));let i=0,p=0;boxes.forEach((b,n)=>{if(ref>=b[0]){i=n;p=clamp((ref-b[0])/Math.max(1,b[1]));}});if(sy>=maxY-2){i=boxes.length-1;p=1;}target=boxes[i][2]+(boxes[i][3]-boxes[i][2])*p;const value=Math.round(target);const dp=$('depthProgress');if(dp)dp.style.height=(clamp(sy/maxY)*100)+'%';if(value!==lastDepth){$('depthValue').textContent=value.toLocaleString('en-US');lastDepth=value;}if(i!==zoneIndex){$('zoneName').textContent=zones[i].dataset.zone;nav.forEach(a=>a.classList.toggle('on',a.hash==='#'+zones[i].id));zoneIndex=i;}}
// Procedural water: the photograph never changes position. The fluid surface itself
// changes shape, light normals and caustics on the GPU instead.
const surfaceCanvas=$('surface-animation'),starCanvas=$('starfield');
const starCtx=starCanvas?.getContext('2d',{alpha:true});
let surfaceRenderer=null,starSprites=null,starPoints=null;
function createWaterRenderer(element){
  if(!element)return null;
  let gl;
  try{gl=element.getContext('webgl',{alpha:true,premultipliedAlpha:false,antialias:false,preserveDrawingBuffer:false});}
  catch(e){return null;}
  if(!gl)return null;
  const vert=String.raw`attribute vec2 aPosition;
void main(){ gl_Position=vec4(aPosition,0.0,1.0); }`;
  const frag=String.raw`precision mediump float;
uniform vec2 uResolution;
uniform float uTime;
uniform float uReveal;
float heightField(vec2 p,float t){
  return .17*sin(p.x*10.0+t*1.15+sin(p.y*7.0-t*.45)*.7)
       + .075*sin(p.x*18.0-p.y*5.0-t*1.5)
       + .045*sin((p.x+p.y)*29.0+t*.75);
}
void main(){
  vec2 uv=gl_FragCoord.xy/uResolution;
  float aspect=uResolution.x/max(uResolution.y,1.0);
  vec2 p=vec2((uv.x-.5)*aspect,uv.y);
  float t=uTime;
  float h=heightField(p,t);
  float hx=heightField(p+vec2(.009,0.0),t)-heightField(p-vec2(.009,0.0),t);
  float hy=heightField(p+vec2(0.0,.009),t)-heightField(p-vec2(0.0,.009),t);
  vec3 normal=normalize(vec3(-hx*3.8,-hy*3.4,.24));
  // A changing normal makes specular highlights slide across the water.
  vec3 light=normalize(vec3(-.38,.62,1.0));
  float reflected=max(dot(reflect(-light,normal),vec3(0.0,0.0,1.0)),0.0);
  float glimmer=pow(reflected,12.0);
  vec2 rippled=p+normal.xy*.022;
  float ca1=sin(rippled.x*28.0+sin(rippled.y*15.0-t*.78)*2.3+t*.60);
  float ca2=sin(rippled.y*22.0-sin(rippled.x*13.0+t*.63)*2.2-t*.87);
  float caustic=pow(1.0-abs(ca1*ca2),10.0);
  float fineWaves=pow(1.0-abs(sin(p.x*38.0+h*6.0+t*.72)),19.0);
  float topMask=smoothstep(.30,.98,uv.y);
  float atmosphere=clamp(.11+.31*uv.y,0.0,1.0);
  float rays=pow(max(.0,sin(p.x*7.0+sin(t*.16+p.y*2.0)*.55)),12.0)
             *smoothstep(.05,1.0,uv.y)*.2;
  vec3 base=mix(vec3(.015,.095,.15),vec3(.10,.46,.54),smoothstep(.13,1.0,uv.y));
  vec3 color=base
    +(vec3(.60,.94,.94)*caustic*(.14+.72*topMask))
    +(vec3(.79,.97,1.0)*glimmer*.48*topMask)
    +(vec3(.65,.88,.9)*fineWaves*.11*topMask)
    +vec3(.3,.7,.79)*rays;
  // Strong rippling ceiling, soft disappearing caustic light underneath.
  float alpha=clamp((.10+topMask*.56+caustic*.16*topMask+rays*.33)*uReveal,0.0,.92);
  gl_FragColor=vec4(color,alpha);
}`;
  function shader(type,src){const s=gl.createShader(type);gl.shaderSource(s,src);gl.compileShader(s);if(!gl.getShaderParameter(s,gl.COMPILE_STATUS)){gl.deleteShader(s);return null;}return s;}
  const v=shader(gl.VERTEX_SHADER,vert),f=shader(gl.FRAGMENT_SHADER,frag);
  if(!v||!f)return null;
  const program=gl.createProgram();gl.attachShader(program,v);gl.attachShader(program,f);gl.linkProgram(program);
  if(!gl.getProgramParameter(program,gl.LINK_STATUS))return null;
  gl.deleteShader(v);gl.deleteShader(f);
  const buffer=gl.createBuffer();gl.bindBuffer(gl.ARRAY_BUFFER,buffer);
  gl.bufferData(gl.ARRAY_BUFFER,new Float32Array([-1,-1,1,-1,-1,1,1,1]),gl.STATIC_DRAW);
  const attr=gl.getAttribLocation(program,'aPosition');
  const uResolution=gl.getUniformLocation(program,'uResolution');
  const uTime=gl.getUniformLocation(program,'uTime');
  const uReveal=gl.getUniformLocation(program,'uReveal');
  let lastW=0,lastH=0;
  element.addEventListener('webglcontextlost',event=>{event.preventDefault();surfaceRenderer=null;});
  element.addEventListener('webglcontextrestored',()=>{surfaceRenderer=createWaterRenderer(element);});
  return {
    resize(w,h,pixelRatio){
      // Reduced internal resolution saves battery; the shader is intentionally soft.
      const scale=Math.min(pixelRatio, w<720?.85:1.25);
      const width=Math.max(1,Math.round(w*scale)),height=Math.max(1,Math.round(h*scale));
      if(width!==lastW||height!==lastH){
        element.width=lastW=width;element.height=lastH=height;
        gl.viewport(0,0,width,height);
      }
    },
    render(t,reveal){
      if(reveal<=.005)return;
      gl.viewport(0,0,element.width,element.height);
      gl.clearColor(0,0,0,0);gl.clear(gl.COLOR_BUFFER_BIT);
      gl.useProgram(program);gl.bindBuffer(gl.ARRAY_BUFFER,buffer);
      gl.enableVertexAttribArray(attr);gl.vertexAttribPointer(attr,2,gl.FLOAT,false,0,0);
      gl.uniform2f(uResolution,element.width,element.height);
      gl.uniform1f(uTime,t);
      gl.uniform1f(uReveal,reveal);
      gl.drawArrays(gl.TRIANGLE_STRIP,0,4);
    }
  };
}
function starSprite(size){
  const pad=5;
  const e=document.createElement('canvas'),n=Math.ceil(size*2+pad*2);e.width=e.height=n;
  const s=e.getContext('2d');const c=n*.5;
  // Soft bloom plus four extended tapered rays — never circular star icons.
  const glow=s.createRadialGradient(c,c,0,c,c,size*.9);
  glow.addColorStop(0,'rgba(255,255,255,.9)');
  glow.addColorStop(.13,'rgba(193,225,255,.5)');
  glow.addColorStop(1,'rgba(145,191,255,0)');
  s.fillStyle=glow;s.fillRect(0,0,n,n);
  function diamond(rx,ry,opacity){
    s.fillStyle='rgba(236,247,255,'+opacity+')';
    s.beginPath();s.moveTo(c,c-ry);s.lineTo(c+rx,c);s.lineTo(c,c+ry);s.lineTo(c-rx,c);s.closePath();s.fill();
  }
  diamond(Math.max(.65,size*.095),size*.9,.78);
  diamond(size*.78,Math.max(.65,size*.075),.72);
  diamond(Math.max(.4,size*.04),size*.35,.95);
  s.fillStyle='#ffffff';s.fillRect(c-.6,c-.6,1.2,1.2);
  return e;
}
function prepareSparkles(){
  if(!starCtx)return;
  starSprites=[starSprite(17),starSprite(10),starSprite(6)];
  let seed=907;const rnd=()=>{seed=(1664525*seed+1013904223)>>>0;return seed/4294967296;};
  starPoints=Array.from({length:95},(_,i)=>({
    x:.025+rnd()*.95,y:.04+rnd()*.92,
    phase:rnd()*Math.PI*2,speed:.5+rnd()*1.4,
    base:.26+rnd()*.42,sprite:i%15===0?0:i%5===0?1:2
  }));
}
function renderSparkles(t,opacity){
  if(!starCtx||!starSprites||!starPoints)return;
  starCtx.clearRect(0,0,W,H);
  if(opacity<=.006)return;
  starCtx.save();starCtx.globalCompositeOperation='screen';
  starPoints.forEach((p,i)=>{
    const twinkle=rm.matches?.63:(.48+.52*Math.sin(t*p.speed+p.phase));
    const alpha=(p.base+.43*twinkle)*opacity;
    const sprite=starSprites[p.sprite],sz=p.sprite===0?34:p.sprite===1?20:12;
    const scale=rm.matches?1:.88+.24*twinkle;
    starCtx.globalAlpha=alpha;
    starCtx.drawImage(sprite,p.x*W-sz*scale/2,p.y*H-sz*scale/2,sz*scale,sz*scale);
  });
  starCtx.restore();
}
surfaceRenderer=createWaterRenderer(surfaceCanvas);
prepareSparkles();
// Initialize only after all canvas variables and renderers are defined.
size();
function draw(t){
if(!ctx)return;
const d=clamp(depth/10994),sun=clamp(1-depth/2050),deep=clamp((depth-850)/9300);
const photo=$('ocean-photo'),stars=$('starfield');
const visibility=clamp(1-depth/2400);
if(photo){
  // Static photographic plate; no translate, no scale, no background movement.
  photo.style.setProperty('--photo-opacity',visibility.toFixed(3));
  photo.style.setProperty('--photo-blur',(deep*7).toFixed(1)+'px');
}
if(surfaceRenderer)surfaceRenderer.render(t,visibility);
if(surfaceCanvas)surfaceCanvas.style.setProperty('--surface-opacity',visibility.toFixed(3));
const starsAlpha=clamp((depth-7450)/2850);
if(stars)stars.style.setProperty('--stars-opacity',starsAlpha.toFixed(3));
renderSparkles(t,1);
ctx.clearRect(0,0,W,H);
const darkness=ctx.createLinearGradient(0,0,0,H);
darkness.addColorStop(0,'rgba(1,6,15,'+(.03+deep*.76).toFixed(3)+')');
darkness.addColorStop(.5,'rgba(1,6,16,'+(.13+deep*.75).toFixed(3)+')');
darkness.addColorStop(1,'rgba(0,3,10,'+(.23+deep*.70).toFixed(3)+')');
ctx.fillStyle=darkness;ctx.fillRect(0,0,W,H);
if(sun>.025){
  // Canvas 2D fallback when WebGL is disabled or not supported.
  if(!surfaceRenderer){
    ctx.save();ctx.globalCompositeOperation='screen';ctx.globalAlpha=.43*sun;
    for(let n=0;n<11;n++){
      ctx.beginPath();
      for(let x=-16;x<W+24;x+=12){
        const y=H*(.11+n*.039)
          +Math.sin(x*.012+t*.55+n*.73)*9
          +Math.sin(x*.028-t*.31+n*.41)*4;
        x===-16?ctx.moveTo(x,y):ctx.lineTo(x,y);
      }
      ctx.lineWidth=n%3===0?1.6:.65;
      ctx.strokeStyle=n%3===0?'rgba(210,255,255,.48)':'rgba(170,240,250,.26)';
      ctx.stroke();
    }
    ctx.restore();
  }
  // Atmospheric light shafts in the water, not moving photographic elements.
  ctx.save();ctx.globalCompositeOperation='screen';
  for(let i=0;i<6;i++){
    const x=W*(.05+i*.19)+Math.sin(t*.19+i)*W*.018;
    const spread=60+i*13;
    const ray=ctx.createLinearGradient(x,0,x,H*.89);
    ray.addColorStop(0,'rgba(225,255,254,'+(.06*sun).toFixed(3)+')');
    ray.addColorStop(1,'rgba(127,190,207,0)');
    ctx.fillStyle=ray;
    ctx.beginPath();ctx.moveTo(x-16,-18);
    ctx.bezierCurveTo(x-spread*.4,H*.23,x-spread,H*.55,x-spread*1.7,H*.9);
    ctx.bezierCurveTo(x+spread,H*.57,x+spread*.2,H*.25,x+24,-18);
    ctx.closePath();ctx.fill();
  }ctx.restore();
}
const fog=ctx.createRadialGradient(W*.53,H*.25,10,W*.53,H*.52,Math.max(W,H)*.86);
fog.addColorStop(0,'rgba(0,0,0,0)');
fog.addColorStop(1,'rgba(0,1,8,'+(.32+d*.46).toFixed(3)+')');
ctx.fillStyle=fog;ctx.fillRect(0,0,W,H);
}

let ac=null,master,filter,noiseGain,drone,enabled=false;function audioUpdate(){if(!ac||ac.state!=='running')return;const d=clamp(depth/10994),now=ac.currentTime,level=enabled&&!document.hidden?.065:0;master.gain.setTargetAtTime(level,now,.35);filter.frequency.setTargetAtTime(1800*(1-d)+110,now,.5);noiseGain.gain.setTargetAtTime(.24+Math.abs(velocity)*.3,now,.25);drone.frequency.setTargetAtTime(42-15*d+Math.abs(velocity)*5,now,.8);}
function makeAudio(){const A=window.AudioContext||window.webkitAudioContext;if(!A)throw Error();ac=new A();master=ac.createGain();master.gain.value=0;const limiter=ac.createDynamicsCompressor();limiter.threshold.value=-18;limiter.ratio.value=12;master.connect(limiter);limiter.connect(ac.destination);filter=ac.createBiquadFilter();filter.type='lowpass';filter.frequency.value=1800;noiseGain=ac.createGain();noiseGain.gain.value=.2;const buffer=ac.createBuffer(1,ac.sampleRate*2,ac.sampleRate),data=buffer.getChannelData(0);let brown=0;for(let i=0;i<data.length;i++){brown=(brown+(Math.random()*2-1)*.02)/1.02;data[i]=brown*3.5;}const source=ac.createBufferSource();source.buffer=buffer;source.loop=true;source.connect(filter);filter.connect(noiseGain);noiseGain.connect(master);source.start();drone=ac.createOscillator();drone.type='sine';drone.frequency.value=42;const dg=ac.createGain();dg.gain.value=.12;drone.connect(dg);dg.connect(master);drone.start();}
function audioUI(){const b=$('sound');b.textContent=enabled?'심해 소리 끄기':'심해 소리 켜기';b.setAttribute('aria-pressed',String(enabled));b.setAttribute('aria-label',enabled?'잠수음 끄기':'잠수음 켜기');}$('sound').onclick=async()=>{const b=$('sound');b.disabled=true;try{if(!ac)makeAudio();enabled=!enabled;if(enabled)await ac.resume();audioUI();audioUpdate();}catch(e){enabled=false;audioUI();b.setAttribute('aria-label','이 브라우저에서 잠수음을 사용할 수 없습니다');}finally{b.disabled=false;}};
function frame(ms){raf=0;if(document.hidden)return;const start=performance.now(),dt=clamp((ms-last)/1000,.001,.05),ease=1-Math.exp(-dt*9);last=ms;if(layout)measure();if(dirty||Math.abs(depth-target)>1)point();const raw=clamp((sy-prevY)/Math.max(dt,.001)/2200,-1,1);prevY=sy;velocity+=(raw-velocity)*ease;depth=rm.matches?target:depth+(target-depth)*ease;const rr=rm.matches?0:Math.sin(sy*.00045)*.018+velocity*.026;roll+=(rr-roll)*ease;pan+=((rm.matches?0:Math.sin(sy*.0006)*W*.025+(mx-.5)*W*.012)-pan)*ease;zoom+=((rm.matches?1:1.055+Math.abs(velocity)*.065)-zoom)*ease;if(!rm.matches||dirty||Math.abs(depth-target)>1)draw(rm.matches?0:ms/1000);dirty=false;if(ms-lastAudio>50){audioUpdate();lastAudio=ms;}perf.frames++;frames++;perf.drawMs+=(performance.now()-start-perf.drawMs)*.05;if(ms-sample>1200){perf.fps=frames*1000/(ms-sample);sample=ms;frames=0;}raf=requestAnimationFrame(frame);}document.addEventListener('visibilitychange',()=>{if(document.hidden){cancelAnimationFrame(raf);raf=0;if(ac)ac.suspend().catch(()=>{});}else{last=performance.now();sample=last;frames=0;prevY=sy=scrollY;layout=dirty=true;if(enabled&&ac)ac.resume().catch(()=>{enabled=false;audioUI();});if(!raf)raf=requestAnimationFrame(frame);}});rm.addEventListener('change',()=>{dirty=true;document.querySelectorAll('.card').forEach(c=>{c.style.setProperty('--rx','0deg');c.style.setProperty('--ry','0deg');});});raf=requestAnimationFrame(frame);
