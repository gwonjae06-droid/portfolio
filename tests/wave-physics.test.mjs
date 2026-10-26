import {test} from 'node:test';
import assert from 'node:assert/strict';
import {WaveField,FloatingBody} from '../wave-physics.mjs';
const energy=f=>f.current.reduce((s,v)=>s+v*v,0);
test('an impulse travels beyond its source and dissipates',()=>{
  const f=new WaveField(72,48);f.disturb(.5,.5,.3,2);
  const initial=energy(f);let maxAway=0;
  for(let i=0;i<100;i++){f.step();maxAway=Math.max(maxAway,Math.abs(f.sample(.62,.5)));}
  assert.ok(maxAway>.001,'wave propagated to a neighboring region');
  for(let i=0;i<1500;i++)f.step();
  assert.ok(energy(f)<initial*.001,'wave energy decays');
});
test('repeated disturbances stay finite and bounded',()=>{
  const f=new WaveField(48,32);
  for(let i=0;i<2000;i++){if(i%7===0)f.disturb((i%47)/47,(i%31)/31,.3);f.step();}
  assert.ok(f.current.every(x=>Number.isFinite(x)&&Math.abs(x)<2));
});
test('buoyancy and horizontal drift react to a nearby wave',()=>{
  const flat=new WaveField(),wave=new WaveField(),a=new FloatingBody(),b=new FloatingBody();
  wave.disturb(.72,.54,.5,4);
  let difference=0,tilt=0;
  for(let i=0;i<240;i++){flat.step();wave.step();a.step(flat,i/60);b.step(wave,i/60);difference=Math.max(difference,Math.hypot(a.x-b.x,a.y-b.y));tilt=Math.max(tilt,Math.abs(a.angle-b.angle));}
  assert.ok(difference>.005,'body translates under wave force');assert.ok(tilt>1,'body rotates on the wave slope');
});
test('reset removes every disturbance and samples at edges are safe',()=>{
  const f=new WaveField();f.disturb(.02,.99,.4);f.step();f.clear();
  assert.equal(energy(f),0);for(const p of [[0,0],[1,1],[-1,2]])assert.equal(f.sample(...p),0);
});
