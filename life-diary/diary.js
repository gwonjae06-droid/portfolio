'use strict';
const KEY='life-diary.entries.v1';
const DRAFT_KEY='life-diary.draft.v1';
const $=id=>document.getElementById(id);
const form=$('entry-form'),moods=['','힘들었어','조금 흐림','그저 그래','괜찮았어','행복했어'];
const localDate=(date=new Date())=>`${date.getFullYear()}-${String(date.getMonth()+1).padStart(2,'0')}-${String(date.getDate()).padStart(2,'0')}`;
const validDate=s=>typeof s==='string'&&/^\d{4}-\d{2}-\d{2}$/.test(s)&&s>='1900-01-01'&&s<='2100-12-31'&&localDate(new Date(s+'T12:00:00'))===s;
const validHours=n=>n===null||(typeof n==='number'&&Number.isFinite(n)&&n>=0&&n<=24&&n*2===Math.round(n*2));
function validEntry(e){return e&&validDate(e.date)&&Number.isInteger(e.mood)&&e.mood>=1&&e.mood<=5&&typeof e.title==='string'&&e.title.trim().length>0&&e.title.length<=100&&typeof e.body==='string'&&e.body.length<=10000&&validHours(e.sleep)&&validHours(e.focus);}
function clean(e){return {date:e.date,mood:e.mood,title:e.title.trim(),body:e.body,sleep:e.sleep,focus:e.focus};}
let entries={},selected=localDate(),dirty=false,blocked=false,pending=null;
// Unsaved writing is kept only in this browser tab. Internal navigation and the browser
// back button must never depend on a native beforeunload confirmation dialog.
function saveDraft(){
  if(!dirty)return;
  try{sessionStorage.setItem(DRAFT_KEY,JSON.stringify({date:selected,mood:form.elements.mood.value,title:$('title').value,body:$('body').value,sleep:$('sleep').value,focus:$('focus').value}));}catch{/* Private browsing may block storage; navigation must still work. */}
}
function clearDraft(){try{sessionStorage.removeItem(DRAFT_KEY);}catch{}}
function restoreDraft(){
  let draft;
  try{draft=JSON.parse(sessionStorage.getItem(DRAFT_KEY)||'null');}catch{return;}
  if(!draft||!validDate(draft.date)||typeof draft.title!=='string'||typeof draft.body!=='string'||draft.title.length>100||draft.body.length>10000)return;
  loadDate(draft.date);
  form.elements.mood.value=['1','2','3','4','5'].includes(draft.mood)?draft.mood:'';
  $('title').value=draft.title;
  $('body').value=draft.body;
  for(const key of ['sleep','focus']){const value=draft[key];if(typeof value==='string'&&/^(?:[0-9]{1,2}(?:\.5)?|)$/.test(value))$(key).value=value;}
  dirty=true;
  if(!blocked)$('status').textContent='작성 중이던 내용을 복원했습니다. 포트폴리오로 돌아가도 같은 탭에서는 임시 보관됩니다.';
}

try{const raw=localStorage.getItem(KEY);if(raw){const data=JSON.parse(raw);if(!Array.isArray(data)||!data.every(validEntry))throw Error('invalid');entries=Object.fromEntries(data.map(e=>[e.date,clean(e)]));}}
catch{blocked=true;$('status').textContent='저장된 기록을 읽지 못했습니다. 기존 데이터를 보호하기 위해 새 저장을 멈췄습니다. 브라우저 저장소 설정을 확인해 주세요.';}
function persist(next){try{localStorage.setItem(KEY,JSON.stringify(Object.values(next)));entries=next;return true;}catch{$('status').textContent='저장하지 못했습니다. 브라우저 저장 공간이나 개인정보 보호 설정을 확인해 주세요. 작성 내용은 화면에 남아 있습니다.';return false;}}
function element(tag,text,className){const e=document.createElement(tag);if(text!==undefined)e.textContent=text;if(className)e.className=className;return e;}
function loadDate(date){selected=date;form.reset();$('date').value=date;const e=entries[date];if(e){form.elements.mood.value=String(e.mood);$('title').value=e.title;$('body').value=e.body;$('sleep').value=e.sleep??'';$('focus').value=e.focus??'';}$('entry-state').textContent=e?'저장된 기록 수정':'새 기록';if(!blocked)$('status').textContent='';dirty=false;}
function changeDate(date){if(!validDate(date)){$('date').value=selected;return;}$('date').value=selected;if(date===selected)return;if(dirty){pending=date;$('leave-dialog').showModal();}else loadDate(date);}
$('date').min='1900-01-01';$('date').max='2100-12-31';
$('date').addEventListener('change',()=>changeDate($('date').value));
form.addEventListener('input',event=>{if(event.target.id!=='date'){dirty=true;saveDraft();}});
form.addEventListener('change',event=>{if(event.target.id!=='date'){dirty=true;saveDraft();}});
$('today').addEventListener('click',()=>changeDate(localDate()));
$('stay').addEventListener('click',()=>{pending=null;$('leave-dialog').close();});
$('leave-dialog').addEventListener('cancel',()=>{pending=null;});
$('leave').addEventListener('click',()=>{const date=pending;pending=null;$('leave-dialog').close();if(date){clearDraft();loadDate(date);}});
// Avoid beforeunload: some in-app browsers swallow the native confirmation and
// make the portfolio link and browser Back appear broken. A tab-scoped draft is safer.
window.addEventListener('pagehide',saveDraft);
form.addEventListener('submit',event=>{
  event.preventDefault();if(blocked)return;if(!form.reportValidity())return;
  const e={date:selected,mood:Number(form.elements.mood.value),title:$('title').value.trim(),body:$('body').value,sleep:$('sleep').value===''?null:Number($('sleep').value),focus:$('focus').value===''?null:Number($('focus').value)};
  if(!validEntry(e)){$('status').textContent='날짜, 한 문장 기록, 시간 입력을 확인해 주세요.';return;}
  if(persist({...entries,[selected]:e})){dirty=false;clearDraft();$('entry-state').textContent='저장된 기록 수정';$('status').textContent='이 브라우저에 저장했어요. 오늘의 조각이 하나 쌓였습니다.';$('month').value=selected.slice(0,7);render();}
});
function render(){
  const all=Object.values(entries);$('total').textContent=all.length;
  for(const field of ['sleep','focus']){const values=all.filter(e=>e[field]!==null);$('avg-'+field).textContent=values.length?(values.reduce((sum,e)=>sum+e[field],0)/values.length).toFixed(1):'—';}
  const chart=$('chart');chart.replaceChildren();const descriptions=[];
  for(let i=13;i>=0;i--){const date=new Date();date.setDate(date.getDate()-i);const key=localDate(date),e=entries[key],bar=element('div',undefined,'chart-day'+(e?'':' empty'));bar.title=key+' · '+(e?moods[e.mood]:'기록 없음');if(e){const fill=element('i');fill.style.height=e.mood/5*80+'%';bar.append(fill);descriptions.push(key+' '+moods[e.mood]);}bar.append(element('small',String(date.getDate())));chart.append(bar);}
  chart.setAttribute('aria-label','최근 14일 기분: '+(descriptions.join(', ')||'아직 기록이 없습니다.'));
  const query=$('search').value.trim().toLocaleLowerCase(),month=$('month').value;
  const filtered=all.filter(e=>(!month||e.date.startsWith(month))&&(!query||(e.title+' '+e.body).toLocaleLowerCase().includes(query))).sort((a,b)=>b.date.localeCompare(a.date));
  const list=$('entries');list.replaceChildren();
  if(!filtered.length)list.append(element('p',query?'검색한 단어가 담긴 기록이 없어요.':'아직 이 달의 기록이 없어요. 오늘의 작은 순간부터 남겨 보세요.','empty-note'));
  for(const e of filtered){const button=element('button',undefined,'entry');button.type='button';const row=element('div',undefined,'entry-top');row.append(element('span',e.date.replaceAll('-','. ')),element('span',moods[e.mood]));button.append(row,element('strong',e.title));if(e.body)button.append(element('p',e.body));button.setAttribute('aria-label',e.date+' '+e.title+' 기록 열기');button.addEventListener('click',()=>{changeDate(e.date);if(!pending)form.scrollIntoView({behavior:matchMedia('(prefers-reduced-motion: reduce)').matches?'instant':'smooth',block:'start'});});list.append(button);}
  $('export').disabled=all.length===0;
}
$('month').value=localDate().slice(0,7);$('month').addEventListener('change',render);$('search').addEventListener('input',render);
$('export').addEventListener('click',()=>{const data={format:'life-diary',version:1,entries:Object.values(entries)};const url=URL.createObjectURL(new Blob([JSON.stringify(data,null,2)],{type:'application/json'}));const a=element('a');a.href=url;a.download='내-인생-다이어리-'+localDate()+'.json';a.click();setTimeout(()=>URL.revokeObjectURL(url),1000);$('backup-status').textContent='백업 파일을 내려받았습니다.';});
$('import').addEventListener('change',async event=>{
  const file=event.target.files[0];if(!file)return;
  try{if(blocked)throw Error('blocked');if(file.size>10*1024*1024)throw Error('size');const data=JSON.parse(await file.text());if(data.format!=='life-diary'||data.version!==1||!Array.isArray(data.entries)||data.entries.length>20000||!data.entries.every(validEntry))throw Error('invalid');const next={...entries};let added=0;for(const e of data.entries){if(!next[e.date]){next[e.date]=clean(e);added++;}}if(!persist(next))throw Error('save');render();if(!dirty)loadDate(selected);$('backup-status').textContent=added+'개의 기록을 불러왔습니다. 이미 있는 날짜는 그대로 두었습니다.';}
  catch{$('backup-status').textContent='불러오지 못했습니다. 이 다이어리에서 내보낸 10MB 이하 JSON 백업 파일과 브라우저 저장소 설정을 확인해 주세요.';}
  finally{event.target.value='';}
});
// Never silently overwrite another open tab's newer records.
window.addEventListener('storage',event=>{if(event.key===KEY){blocked=true;form.querySelector('[type=submit]').disabled=true;$('status').textContent='다른 탭에서 기록이 바뀌었습니다. 작성 중인 내용을 복사해 보관한 뒤 새로고침해 주세요.';}});
form.querySelector('[type=submit]').disabled=blocked;loadDate(selected);restoreDraft();render();
