const {test}=require('node:test');
const assert=require('node:assert/strict');
const fs=require('node:fs');
const vm=require('node:vm');
const path=require('node:path');
const source=fs.readFileSync(path.join(__dirname,'../life-diary/diary.js'),'utf8');
const context=vm.createContext({document:{getElementById:()=>({})}});
vm.runInContext(source.slice(0,source.indexOf('let entries='))+'\nthis.validate=validEntry;',context);
const valid={date:'2026-10-26',mood:4,title:'하루의 기록',body:'작은 순간',sleep:7.5,focus:0};
test('accepts zero hours and missing optional values',()=>{
  assert.equal(context.validate(valid),true);assert.equal(context.validate({...valid,sleep:null,focus:null}),true);
});
test('rejects impossible dates in imported records',()=>{
  for(const date of ['2026-02-29','2026-13-01','2026-10-32','x','2026-1-2'])assert.equal(context.validate({...valid,date}),false);
  assert.equal(context.validate({...valid,date:'2024-02-29'}),true);
});
test('rejects invalid backup data without coercing types',()=>{
  for(const change of [{mood:'4'},{mood:6},{sleep:'7.5'},{sleep:-1},{focus:25},{sleep:NaN},{sleep:1.25},{title:'   '},{body:{}},{title:'x'.repeat(101)},{body:'x'.repeat(10001)}])assert.equal(context.validate({...valid,...change}),false);
});
