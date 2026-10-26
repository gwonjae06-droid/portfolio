import {WaveField,FloatingBody} from './wave-physics.mjs';
import {createWaterRenderer} from './water-renderer.mjs';

const water=document.getElementById('water'),abyss=document.getElementById('abyss'),floater=document.getElementById('floater');
const ctx=abyss.getContext('2d'),reduced=matchMedia('(prefers-reduced-motion: reduce)');
const field=new WaveField(),body=new FloatingBody();
const clamp=(v,a=0,b=1)=>Math.max(a,Math.min(b,v));
let renderer=null,w=innerWidth,h=innerHeight,last=0,time=0,accumulator=0,raf=0,scroll=scrollY,progress=0,dirty=true,lastPointer=null,lastImpulse=0,lastWaterFrame=0;
const rand=n=>{const x=Math.sin(n*127.1+311.7)*43758.5453;return x-Math.floor(x);};
const stars=Array.from({length:180},(_,i)=>({x:rand(i+2),y:rand(i+203),size:i%19===0?2:.35+rand(i+92)*.9,phase:rand(i+339)*6.28}));
function initRenderer(){try{renderer=createWaterRenderer(water,field);renderer?.resize(w,h);}catch(error){console.warn('Water rendering unavailable; using the lightweight fallback.',error.message);renderer=null;}}
initRenderer();
water.addEventListener('webglcontextlost',e=>{e.preventDefault();renderer=null;dirty=true;});
water.addEventListener('webglcontextrestored',()=>{initRenderer();dirty=true;});
function resize(){w=innerWidth;h=innerHeight;const dpr=Math.min(devicePixelRatio||1,1.5);abyss.width=Math.round(w*dpr);abyss.height=Math.round(h*dpr);ctx?.setTransform(dpr,0,0,dpr,0,0);renderer?.resize(w,h);body.moveHome(w<600?.76:.77,w<600?.74:.55);dirty=true;}
resize();addEventListener('resize',resize);
addEventListener('scroll',()=>{scroll=scrollY;dirty=true;},{passive:true});
new ResizeObserver(()=>{dirty=true;}).observe(document.body);
function disturb(event,force=false){
  if(reduced.matches||scroll>h*.8||event.target.closest('a,button,input,textarea'))return;
  const now=performance.now(),x=event.clientX/w,y=event.clientY/h;
  if(!force&&now-lastImpulse<28)return;
  const speed=lastPointer?Math.hypot(x-lastPointer.x,y-lastPointer.y):0;
  if(force||speed>.001){field.disturb(x,y,force?.3:Math.min(.18,.035+speed*1.8),force?3.2:2.2);lastImpulse=now;dirty=true;}
  lastPointer={x,y};
}
addEventListener('pointermove',e=>disturb(e),{passive:true});addEventListener('pointerdown',e=>disturb(e,true),{passive:true});addEventListener('pointerleave',()=>{lastPointer=null;});
function sparkle(x,y,size,alpha){
  ctx.globalAlpha=alpha;ctx.fillStyle='#d4e6ff';ctx.beginPath();ctx.arc(x,y,size*.45,0,Math.PI*2);ctx.fill();
  if(size>1.5){const glow=ctx.createRadialGradient(x,y,0,x,y,size*6);glow.addColorStop(0,'#a6d0ff70');glow.addColorStop(1,'#a6d0ff00');ctx.fillStyle=glow;ctx.fillRect(x-size*6,y-size*6,size*12,size*12);ctx.strokeStyle='#d8eaffaa';ctx.lineWidth=.65;ctx.beginPath();ctx.moveTo(x-size*3,y);ctx.lineTo(x+size*3,y);ctx.moveTo(x,y-size*4);ctx.lineTo(x,y+size*4);ctx.stroke();}
}
function drawBackground(t){
  if(!ctx)return;
  const descent=clamp(scroll/(h*1.15)),deep=clamp((scroll-h*.7)/(h*3)),cosmos=clamp((progress-.5)/.38);
  ctx.clearRect(0,0,w,h);
  if(descent>.001){const g=ctx.createLinearGradient(0,0,w*.4,h);g.addColorStop(0,`rgba(3,${Math.round(35-deep*30)},${Math.round(52-deep*39)},${descent})`);g.addColorStop(1,`rgba(1,${Math.round(18-deep*15)},${Math.round(32-deep*25)},${descent})`);ctx.fillStyle=g;ctx.fillRect(0,0,w,h);}
  if(!renderer&&descent<1){ctx.save();ctx.globalAlpha=(1-descent)*.35;ctx.strokeStyle='#a7d8df';for(let j=0;j<20;j++){ctx.beginPath();for(let x=0;x<w+10;x+=10){const y=h*(.1+j*.045)+Math.sin(x*.015+t+j)*7+field.sample(x/w,j/20)*h*.08;x?ctx.lineTo(x,y):ctx.moveTo(x,y);}ctx.stroke();}ctx.restore();}
  const light=descent*(1-deep)*.1;
  if(light>0){ctx.save();ctx.globalCompositeOperation='screen';for(let i=0;i<4;i++){const x=w*(.4+i*.2)+Math.sin(t*.1+i)*20,g=ctx.createLinearGradient(x,0,x,h);g.addColorStop(0,`rgba(112,193,210,${light})`);g.addColorStop(1,'rgba(112,193,210,0)');ctx.fillStyle=g;ctx.beginPath();ctx.moveTo(x,0);ctx.lineTo(x+25,0);ctx.lineTo(x-w*.15,h);ctx.lineTo(x-w*.4,h);ctx.fill();}ctx.restore();}
  // The same particles slowly become distant stars as daylight disappears.
  ctx.save();for(let i=0;i<stars.length;i++){
    const s=stars[i],drift=reduced.matches?0:t*(.8+s.size*.4),parallax=scroll*(.025+s.size*.016);
    const x=s.x*w+(reduced.matches?0:Math.sin(t*.06+s.phase)*4),y=((s.y*h-parallax-drift)%h+h)%h;
    const twinkle=reduced.matches?.7:.7+.3*Math.sin(t*(.4+s.size*.2)+s.phase);
    const alpha=(cosmos*.65+(1-cosmos)*descent*.17)*twinkle;
    if(alpha>.002)sparkle(x,y,s.size,alpha);
  }ctx.restore();
  if(cosmos>.1){ctx.save();ctx.globalCompositeOperation='screen';const cloud=ctx.createRadialGradient(w*.8,h*.34,0,w*.8,h*.34,w*.65);cloud.addColorStop(0,`rgba(25,39,91,${cosmos*.12})`);cloud.addColorStop(.5,`rgba(24,31,68,${cosmos*.045})`);cloud.addColorStop(1,'rgba(0,0,0,0)');ctx.fillStyle=cloud;ctx.fillRect(0,0,w,h);ctx.restore();}
}
function frame(ms){
  raf=0;if(document.hidden)return;
  const dt=Math.min((ms-last)/1000||0,1/20);last=ms;
  progress=clamp(scroll/Math.max(1,document.documentElement.scrollHeight-h));
  const visible=scroll<h*1.2,opacity=clamp(1-scroll/(h*.75));
  if(!reduced.matches){time+=dt;if(visible){accumulator+=dt;for(let n=0;accumulator>=1/60&&n<4;n++){field.step();body.step(field,time);accumulator-=1/60;}}}
  if(visible&&(dirty||(!reduced.matches&&ms-lastWaterFrame>32))){renderer?.render(reduced.matches?0:time);lastWaterFrame=ms;}
  if(dirty||!reduced.matches){
    water.style.opacity=String(clamp(1-scroll/(h*1.2)));
    floater.style.opacity=String(opacity);
    floater.style.visibility=opacity<.001?'hidden':'visible';
    const x=(reduced.matches?body.homeX:body.x)*w,y=(reduced.matches?body.homeY:body.y)*h-scroll*.58;
    floater.style.transform=`translate(${x}px,${y}px) translate(-50%,-50%) rotate(${reduced.matches?0:body.angle}deg)`;
    drawBackground(reduced.matches?0:time);dirty=false;
  }
  raf=requestAnimationFrame(frame);
}
document.addEventListener('visibilitychange',()=>{if(document.hidden){cancelAnimationFrame(raf);raf=0;}else{last=performance.now();dirty=true;if(!raf)raf=requestAnimationFrame(frame);}});
reduced.addEventListener('change',()=>{field.clear();body.vx=body.vy=0;dirty=true;});
raf=requestAnimationFrame(frame);
