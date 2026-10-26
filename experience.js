import {WaveField,FloatingBody} from './wave-physics.mjs';
import {createWaterRenderer} from './water-renderer.mjs';

const water=document.getElementById('water'),abyss=document.getElementById('abyss'),floater=document.getElementById('floater');
const ctx=abyss.getContext('2d'),reduced=matchMedia('(prefers-reduced-motion: reduce)');
const field=new WaveField(),body=new FloatingBody();
const clamp=(v,a=0,b=1)=>Math.max(a,Math.min(b,v));
let renderer=null,w=innerWidth,h=innerHeight,last=0,time=0,accumulator=0,raf=0,scroll=scrollY,progress=0,dirty=true,lastPointer=null,lastImpulse=0,lastWaterFrame=0;
const rand=n=>{const x=Math.sin(n*127.1+311.7)*43758.5453;return x-Math.floor(x);};
const stars=Array.from({length:180},(_,i)=>({x:rand(i+2),y:rand(i+203),size:i%19===0?2:.35+rand(i+92)*.9,phase:rand(i+339)*6.28}));

// Constellations live only around the closing chapter, away from the central copy.
const closingChapter=document.getElementById('depths');
const constellationPaths=[
 [[.075,.19],[.16,.13],[.25,.24],[.32,.20],[.35,.34],[.26,.41]],
 [[.76,.13],[.86,.20],[.935,.14],[.90,.32],[.79,.39],[.73,.32]],
 [[.07,.80],[.17,.66],[.245,.77],[.32,.69],[.38,.85]],
 [[.70,.74],[.79,.64],[.91,.76],[.86,.88]]
];
let constellationStartedAt=null;
function starVertex(point,i,t){
 const sway=reduced.matches?0:Math.sin(t*.12+i*1.83)*1.6;
 return {x:point[0]*w+sway,y:point[1]*h+sway*.65};
}
function traceConstellation(points,fraction){
 if(fraction<=0)return null;
 const segments=[];let total=0;
 for(let i=1;i<points.length;i++){
  const distance=Math.hypot(points[i].x-points[i-1].x,points[i].y-points[i-1].y);
  segments.push(distance);total+=distance;
 }
 let remaining=total*clamp(fraction),tip=points[0];
 ctx.beginPath();ctx.moveTo(tip.x,tip.y);
 for(let i=0;i<segments.length;i++){
  const a=points[i],b=points[i+1],d=segments[i];
  if(remaining>=d){ctx.lineTo(b.x,b.y);tip=b;remaining-=d;}
  else{
   const u=d?remaining/d:0;
   tip={x:a.x+(b.x-a.x)*u,y:a.y+(b.y-a.y)*u};
   ctx.lineTo(tip.x,tip.y);break;
  }
 }
 return tip;
}
function glowStar(x,y,size,alpha,t,phase){
 if(alpha<=.005)return;
 const r=size*3.6,g=ctx.createRadialGradient(x,y,0,x,y,r);
 g.addColorStop(0,'rgba(240,249,255,'+(alpha*.44).toFixed(3)+')');
 g.addColorStop(.24,'rgba(156,208,255,'+(alpha*.12).toFixed(3)+')');
 g.addColorStop(1,'rgba(112,172,238,0)');
 ctx.fillStyle=g;ctx.fillRect(x-r,y-r,r*2,r*2);
 const blink=reduced.matches?1:.78+.22*Math.sin(t*1.9+phase);
 ctx.fillStyle='rgba(231,246,255,'+(alpha*blink*.88).toFixed(3)+')';
 ctx.beginPath();ctx.moveTo(x,y-size*1.65);
 ctx.lineTo(x+size*.13,y-size*.18);
 ctx.lineTo(x+size*1.28,y);
 ctx.lineTo(x+size*.13,y+size*.16);
 ctx.lineTo(x,y+size*1.65);
 ctx.lineTo(x-size*.13,y+size*.16);
 ctx.lineTo(x-size*1.28,y);
 ctx.lineTo(x-size*.13,y-size*.18);
 ctx.closePath();ctx.fill();
}
function drawConstellations(t){
 if(!closingChapter||!ctx)return;
 const box=closingChapter.getBoundingClientRect();
 if(box.top>=h*.98||box.bottom<=h*.06){constellationStartedAt=null;return;}
 if(constellationStartedAt===null)constellationStartedAt=t;
 const visibility=clamp((h*.98-box.top)/(h*.58))*clamp((box.bottom-h*.06)/(h*.28));
 if(visibility<.002)return;
 const elapsed=reduced.matches?Infinity:Math.max(0,t-constellationStartedAt);
 const mobile=w<650;
 ctx.save();ctx.globalCompositeOperation='screen';ctx.lineCap='round';ctx.lineJoin='round';
 constellationPaths.forEach((path,pathIndex)=>{
  const pts=path.map((p,i)=>starVertex(p,i+pathIndex*7,t));
  const p=reduced.matches?1:clamp((elapsed-pathIndex*.54)/2.15);
  const eased=p*p*(3-2*p);
  const pulse=reduced.matches?1:.86+.14*Math.sin(t*.91+pathIndex*1.27);
  // The entire constellation is barely visible before the bright joining trace.
  ctx.beginPath();ctx.moveTo(pts[0].x,pts[0].y);
  for(let i=1;i<pts.length;i++)ctx.lineTo(pts[i].x,pts[i].y);
  ctx.shadowBlur=0;ctx.lineWidth=mobile?.58:.74;
  ctx.strokeStyle='rgba(172,204,232,'+(visibility*.058).toFixed(3)+')';ctx.stroke();
  if(eased>.001){
   ctx.shadowColor='rgba(155,213,255,.65)';
   ctx.shadowBlur=mobile?9:17;ctx.lineWidth=mobile?1.6:2.3;
   ctx.strokeStyle='rgba(102,177,242,'+(visibility*.15*eased*pulse).toFixed(3)+')';
   const tip=traceConstellation(pts,eased);ctx.stroke();
   ctx.shadowBlur=mobile?4:7;ctx.lineWidth=mobile?.65:1.05;
   ctx.strokeStyle='rgba(214,239,255,'+(visibility*.52*eased*pulse).toFixed(3)+')';
   traceConstellation(pts,eased);ctx.stroke();ctx.shadowBlur=0;
   // A moving point of light traces the path one segment at a time.
   if(p>.03&&p<.98&&tip){
    const r=mobile?9:13,g=ctx.createRadialGradient(tip.x,tip.y,0,tip.x,tip.y,r);
    g.addColorStop(0,'rgba(255,255,255,'+(visibility*.56).toFixed(3)+')');
    g.addColorStop(.3,'rgba(176,221,255,'+(visibility*.18).toFixed(3)+')');
    g.addColorStop(1,'rgba(176,221,255,0)');
    ctx.fillStyle=g;ctx.fillRect(tip.x-r,tip.y-r,r*2,r*2);
   }
  }
  pts.forEach((point,i)=>{
   const lit=clamp((eased-i/(pts.length-1))*6);
   const shimmer=reduced.matches?1:.69+.31*Math.sin(t*(1.55+i*.1)+i*2.3+pathIndex);
   const size=(mobile?2:2.65)*(i%3===0?1.2:1);
   glowStar(point.x,point.y,size,visibility*(.20+lit*.66)*shimmer,t,i+pathIndex*1.7);
  });
 });
 ctx.restore();
}

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
// Only the ocean's middle depths are changed here. The surface's WebGL
// physics, shaders, interaction and floating object are deliberately untouched.
function whaleSilhouette(x,y,scale,dir,opacity){
  if(opacity<.003)return;
  ctx.save();
  ctx.translate(x,y);
  ctx.scale(dir*scale,scale);
  ctx.globalAlpha=opacity;
  ctx.filter='blur(2px)';
  ctx.lineWidth=1.3;
  ctx.fillStyle='rgba(6,27,41,.85)';
  ctx.strokeStyle='rgba(152,210,214,.52)';
  ctx.shadowColor='rgba(122,205,219,.33)';
  ctx.shadowBlur=14;
  // Broad, gently curved whale body. The dark shape is a distant shadow.
  ctx.beginPath();
  ctx.moveTo(-147,3);
  ctx.bezierCurveTo(-125,-19,-89,-36,-32,-42);
  ctx.bezierCurveTo(-4,-44,40,-40,76,-28);
  ctx.bezierCurveTo(122,-17,151,-6,164,7);
  ctx.bezierCurveTo(142,16,111,27,76,30);
  ctx.bezierCurveTo(24,44,-38,37,-94,19);
  ctx.bezierCurveTo(-126,11,-142,8,-147,3);
  ctx.closePath();
  ctx.fill();ctx.stroke();
  // Tail flukes, offset behind the body.
  ctx.beginPath();
  ctx.moveTo(-139,2);
  ctx.bezierCurveTo(-167,-7,-180,-28,-205,-33);
  ctx.bezierCurveTo(-200,-14,-186,-1,-169,3);
  ctx.bezierCurveTo(-186,10,-201,22,-206,34);
  ctx.bezierCurveTo(-180,30,-162,13,-139,6);
  ctx.closePath();ctx.fill();ctx.stroke();
  // Small dorsal fin and one slow, dropped flipper.
  ctx.beginPath();
  ctx.moveTo(-36,-41);
  ctx.quadraticCurveTo(-23,-63,-5,-45);
  ctx.closePath();ctx.fill();
  ctx.beginPath();
  ctx.moveTo(-24,27);
  ctx.quadraticCurveTo(-17,59,10,76);
  ctx.quadraticCurveTo(22,64,24,33);
  ctx.closePath();ctx.fill();ctx.stroke();
  ctx.restore();
}
function drawMidwater(t,descent,deep){
  // Begin after the initial surface hero and fade out before the cosmic end.
  const arrived=clamp((scroll/h-.82)/.72);
  const leaving=1-clamp((progress-.69)/.15);
  const amount=arrived*leaving;
  if(amount<.002)return;
  const light=amount*(1-deep*.66);
  ctx.save();ctx.globalCompositeOperation='screen';
  // Large soft patches of drifting underwater illumination, never straight rays.
  for(let i=0;i<6;i++){
    const cx=w*(.10+i*.19)+Math.sin(t*.11+i*1.79)*w*.07;
    const cy=h*(.15+(i%4)*.21)+Math.cos(t*.14+i*1.11)*h*.055;
    const radius=Math.max(w,h)*(.17+(i%3)*.035);
    const glow=ctx.createRadialGradient(cx,cy,0,cx,cy,radius);
    glow.addColorStop(0,'rgba(89,191,196,'+(.085*light).toFixed(4)+')');
    glow.addColorStop(.37,'rgba(53,154,178,'+(.046*light).toFixed(4)+')');
    glow.addColorStop(1,'rgba(30,109,145,0)');
    ctx.fillStyle=glow;
    ctx.fillRect(cx-radius,cy-radius,radius*2,radius*2);
  }
  // Organic caustic ripples slowly sway, like watching light through water.
  ctx.filter='blur(2.5px)';
  ctx.lineCap='round';
  for(let band=0;band<10;band++){
    const y0=h*(.13+band*.092);
    const opacity=(.085+.024*Math.sin(band*2.4+t*.31))*light;
    ctx.strokeStyle='rgba(147,223,221,'+Math.max(.009,opacity).toFixed(4)+')';
    ctx.lineWidth=band%3===0?3.1:1.6;
    ctx.beginPath();
    for(let x=-12;x<=w+12;x+=12){
      const y=y0
       +Math.sin(x*.0061+t*.29+band*.53)*13
       +Math.sin(x*.016-t*.43+band*1.27)*6
       +Math.cos(x*.0027+t*.11+band)*12;
      x===-12?ctx.moveTo(x,y):ctx.lineTo(x,y);
    }
    ctx.stroke();
  }
  ctx.restore();
  // Low-contrast wildlife passes well behind the reading area.
  // Each silhouette remains translucent and blurred, never covering text.
  const travel=(t*.009+0.16)%1.55;
  const travel2=(t*.006+.78)%1.55;
  const bigScale=Math.min(2.05,Math.max(.82,w/950));
  whaleSilhouette((-0.22+travel)*w,h*.58+Math.sin(t*.18)*h*.025,bigScale,1,amount*.16);
  whaleSilhouette((1.21-travel2)*w,h*.27+Math.sin(t*.13+1.8)*h*.016,bigScale*.48,-1,amount*.082);
}
function drawBackground(t){
  if(!ctx)return;
  const descent=clamp(scroll/(h*1.15)),deep=clamp((scroll-h*.7)/(h*3)),cosmos=clamp((progress-.5)/.38);
  ctx.clearRect(0,0,w,h);
  if(descent>.001){const g=ctx.createLinearGradient(0,0,w*.4,h);g.addColorStop(0,`rgba(3,${Math.round(35-deep*30)},${Math.round(52-deep*39)},${descent})`);g.addColorStop(1,`rgba(1,${Math.round(18-deep*15)},${Math.round(32-deep*25)},${descent})`);ctx.fillStyle=g;ctx.fillRect(0,0,w,h);}
  if(!renderer&&descent<1){ctx.save();ctx.globalAlpha=(1-descent)*.35;ctx.strokeStyle='#a7d8df';for(let j=0;j<20;j++){ctx.beginPath();for(let x=0;x<w+10;x+=10){const y=h*(.1+j*.045)+Math.sin(x*.015+t+j)*7+field.sample(x/w,j/20)*h*.08;x?ctx.lineTo(x,y):ctx.moveTo(x,y);}ctx.stroke();}ctx.restore();}
  // Between the bright surface and the hadal zone, the background stays fluid.
  // There are no beam polygons or hard-edged geometric shapes in this layer.
  drawMidwater(t,descent,deep);
  // The same particles slowly become distant stars as daylight disappears.
  ctx.save();for(let i=0;i<stars.length;i++){
    const s=stars[i],drift=reduced.matches?0:t*(.8+s.size*.4),parallax=scroll*(.025+s.size*.016);
    const x=s.x*w+(reduced.matches?0:Math.sin(t*.06+s.phase)*4),y=((s.y*h-parallax-drift)%h+h)%h;
    const twinkle=reduced.matches?.7:.7+.3*Math.sin(t*(.4+s.size*.2)+s.phase);
    const alpha=(cosmos*.65+(1-cosmos)*descent*.17)*twinkle;
    if(alpha>.002)sparkle(x,y,s.size,alpha);
  }ctx.restore();
  if(cosmos>.1){ctx.save();ctx.globalCompositeOperation='screen';const cloud=ctx.createRadialGradient(w*.8,h*.34,0,w*.8,h*.34,w*.65);cloud.addColorStop(0,`rgba(25,39,91,${cosmos*.12})`);cloud.addColorStop(.5,`rgba(24,31,68,${cosmos*.045})`);cloud.addColorStop(1,'rgba(0,0,0,0)');ctx.fillStyle=cloud;ctx.fillRect(0,0,w,h);ctx.restore();}
  drawConstellations(t);
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
