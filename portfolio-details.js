/* Project case studies and opt-in live previews; no framework or network analytics. */
(()=>{'use strict';
const PROJECTS={
 games:{
  title:'GAME WORKS',kicker:'GAME DESIGN & DEVELOPMENT',summary:'장르와 기술이 서로 다른 세 게임을 통해 전투 연출, 탐험, 보스전의 경험을 실험하고 있습니다.',
  tags:['게임 기획','인터랙션','게임 로직'],
  why:'이야기 속 장면을 읽기만 하는 대신, 조작하고 선택하며 경험할 수 있도록 만들고 싶었습니다. 그래서 전투 중심 시연, 캠퍼스 공포 게임, 마인크래프트 보스전 모드를 각각 다른 방식으로 제작하고 있습니다.',
  features:['OChams 3D Battle: 전체 화면 턴제 전투, 캐릭터 애니메이션과 시네마틱 액션 연출을 다루는 웹 프로토타입','CAMPUS LEGENDS: Three.js 기반 3D 캠퍼스 공포게임 EP01. 탐색, 위험, 체크포인트, 두 엔딩을 구현한 로컬 개발 단계','Oibung Trials: Minecraft Java 1.21.1 NeoForge 기반 보스 러시 모드. 보스 3종과 전용 전투 공간'],
  decisions:'게임마다 요구되는 상호작용을 분리했습니다. OChams는 화면 전체의 전투 연출, CAMPUS LEGENDS는 탐색과 입력·체크포인트의 연결, Oibung Trials는 모드 환경에서의 보스전 구조에 초점을 둡니다.',
  status:'OChams는 공개 웹 시연 주소가 있습니다. CAMPUS LEGENDS는 로컬 개발·테스트 단계이며 공개 웹 실행 주소는 확인되지 않았습니다. Oibung Trials는 Minecraft용 모드 프로젝트로 별도 실행 환경이 필요합니다.',
  preview:'https://gwonjae06-droid.github.io/ochams-3d-battle/',
  previewTitle:'OChams 3D Battle 실제 공개 웹 시연',previewName:'OChams 웹 플레이',
  links:[
   ['OChams 직접 플레이','https://gwonjae06-droid.github.io/ochams-3d-battle/'],
   ['OChams 소스','https://github.com/gwonjae06-droid/ochams-3d-battle'],
   ['CAMPUS LEGENDS 저장소','https://github.com/gwonjae06-droid/campus-legends'],
   ['Oibung Trials 저장소','https://github.com/gwonjae06-droid/oibung-trials']
  ],
  sub:[
   ['OChams 3D Battle','JavaScript · 웹','턴제 전투 화면, 캐릭터 동작, 연출 중심의 시연'],
   ['CAMPUS LEGENDS','TypeScript · Vite · Three.js','캠퍼스 괴담을 탐색하는 3D 공포게임, 로컬 개발 단계'],
   ['Oibung Trials','Java · NeoForge','세 보스와 전용 아레나를 갖춘 Minecraft 보스 러시 모드']
  ]
 },
 mindscape:{
  title:'MINDSCAPE',kicker:'INTERACTIVE PSYCHOLOGY',summary:'심리학 개념을 외우는 대신, 가상의 상황에서 행동을 선택한 뒤 그 판단을 돌아보는 학습 사이트입니다.',
  tags:['HTML/CSS','JavaScript','스토리 분기','심리학 학습'],
  why:'심리학의 개념을 정의로만 읽으면 일상과 연결하기 어려울 수 있습니다. 친숙한 인간관계와 사회적 상황을 이야기로 제시하고, 독자가 직접 선택할 수 있게 구성했습니다.',
  features:['인간관계·사회·집단·윤리·인지의 다섯 카테고리','14개 주제의 선택형 짧은 이야기와 분기별 피드백','원리, 유사 개념, 연구 근거, 실생활 적용을 정리한 보충 노트','스트룹·작업기억·확증편향·프레이밍 관련 체험과 학습 완료 표시'],
  decisions:'이야기 → 선택 → 해설 → 이해도 확인의 흐름으로 콘텐츠를 정리했습니다. 짧은 선택 결과는 성격이나 능력의 진단으로 해석하지 않도록 안내하고, 보충 설명에 참고 자료를 연결했습니다.',
  status:'GitHub Pages에서 공개된 학습 사이트이며, 콘텐츠와 UI를 계속 개선하고 있습니다.',
  preview:'https://gwonjae06-droid.github.io/mindscape/',
  previewTitle:'MINDSCAPE 실제 심리학 학습 웹사이트',previewName:'MINDSCAPE 체험',
  links:[['실제 사이트 열기','https://gwonjae06-droid.github.io/mindscape/'],['소스 코드','https://github.com/gwonjae06-droid/mindscape']]
 },
 diary:{
  title:'내 인생 다이어리',kicker:'PERSONAL RECORD & DATA',summary:'하루의 기분, 수면, 집중 시간과 생각을 기록하고 작은 흐름을 돌아볼 수 있는 개인 기록 도구입니다.',
  tags:['HTML/CSS','JavaScript','localStorage','데이터 백업'],
  why:'하루가 지나면 쉽게 잊히는 상태와 경험을 간단히 기록하고, 나중에 변화의 흐름을 살펴볼 수 있게 하려고 만들었습니다.',
  features:['날짜별 일기 작성·수정과 달력 기반 탐색','작성 내용 검색, 5단계 기분 기록','최근 14일 기분 그래프와 수면·집중 시간 평균','브라우저 내 저장 및 JSON 백업·복원'],
  decisions:'개인 기록을 서버에 올리지 않고 브라우저에 보관하도록 했습니다. 기기를 바꾸거나 브라우저 데이터를 지울 때 기록이 없어질 수 있어 백업 기능과 저장 관련 안내를 제공합니다.',
  status:'포트폴리오 안에서 직접 실행할 수 있습니다. 계정 기반 동기화·암호화 보관 기능은 제공하지 않습니다.',
  preview:null,previewTitle:'내 인생 다이어리',previewName:'다이어리 열기',
  previewNotice:'개인 일기는 현재 브라우저에 실제 작성된 내용이 표시될 수 있어 포트폴리오 안에 미리보기를 삽입하지 않습니다. 새 탭에서 앱을 열어 직접 확인해 주세요.',
  links:[['다이어리 열기','./life-diary/'],['소스 코드','https://github.com/gwonjae06-droid/portfolio/tree/main/life-diary']]
 },
 campus:{
  title:'UNI-SURVIVAL',kicker:'TOOLS FOR CAMPUS LIFE',summary:'대학생이 실제로 마주치는 과제, 팀플, 공강, 교수님 메일 문제를 웹 도구로 풀어보는 프로젝트입니다.',
  tags:['HTML/CSS','JavaScript','대학생 도구','폼·계산기'],
  why:'반복되는 대학생활의 작은 문제를 매번 처음부터 고민하지 않고, 필요한 순간 짧게 입력해 해결할 수 있는 도구로 만들어 보고 싶었습니다.',
  features:['마감 역산을 돕는 과제 시간 계산과 4단계 작업 쪼개기','팀원 강점을 고려한 팀플 역할 분배와 공지문 생성','짧은 공강 시간을 위한 조건 기반 품앗이 보드','교수님 메일 초안·예절 점검 및 작성 도구'],
  decisions:'긴 사용 설명 없이 도구의 목적이 바로 드러나도록 기능을 분리했습니다. 입력 조건, 결과, 복사·공유용 텍스트처럼 실제 사용 단계로 화면을 구성했습니다.',
  status:'포트폴리오 안에서 사용 가능한 웹 프로젝트입니다. 추천 결과나 시간 예측은 입력 조건을 바탕으로 한 보조 도구입니다.',
  preview:'./uni-survival/',
  previewTitle:'UNI-SURVIVAL 실제 대학생활 도구',previewName:'UNI-SURVIVAL 실행',
  links:[['실제 사이트 열기','./uni-survival/'],['소스 코드','https://github.com/gwonjae06-droid/portfolio/tree/main/uni-survival']]
 }
};
const dialog=document.getElementById('projectDialog');
if(!dialog)return;
const byId=id=>document.getElementById(id);
const make=(tag,cls,text)=>{const el=document.createElement(tag);if(cls)el.className=cls;if(text!==undefined)el.textContent=text;return el;};
const addList=(host,items)=>{host.replaceChildren();items.forEach(line=>host.append(make('li','',line)));};
let selectedKey=null;
function addExternalLink(label,href){
 const a=make('a','',label+' ↗');
 a.href=href;a.target='_blank';a.rel='noopener noreferrer';
 return a;
}
function loadPreview(){
 const p=PROJECTS[selectedKey];
 if(!p||!p.preview)return;
 const host=byId('previewHost');host.replaceChildren();
 const frame=make('iframe','');
 frame.title=p.previewTitle;
 frame.src=p.preview;
 frame.loading='eager';
 frame.referrerPolicy='strict-origin-when-cross-origin';
 frame.setAttribute('allowfullscreen','');
 host.append(frame);
 byId('previewLoad').disabled=true;
 byId('previewLoad').textContent='미리보기 불러옴';
}
function openProject(key){
 const p=PROJECTS[key];
 if(!p)return;
 selectedKey=key;
 byId('detailTitle').textContent=p.title;
 byId('detailKicker').textContent=p.kicker;
 byId('detailSummary').textContent=p.summary;
 byId('detailWhy').textContent=p.why;
 byId('detailDecisions').textContent=p.decisions;
 byId('detailStatus').textContent=p.status;
 addList(byId('detailFeatures'),p.features);
 const tags=byId('detailTags');tags.replaceChildren();
 p.tags.forEach(s=>tags.append(make('span','',s)));
 const sub=byId('detailSubprojects');sub.replaceChildren();
 sub.hidden=!p.sub;
 if(p.sub){
  p.sub.forEach(([name,tech,desc])=>{
   const card=make('article','detail-subproject');
   card.append(make('h4','',name),make('span','',tech),make('p','',desc));
   sub.append(card);
  });
 }
 const links=byId('detailLinks');links.replaceChildren();
 p.links.forEach(([label,url])=>links.append(addExternalLink(label,url)));
 const host=byId('previewHost');host.replaceChildren();
 const btn=byId('previewLoad');btn.disabled=false;
 if(p.preview){
  btn.hidden=false;btn.textContent='실제 화면 불러오기 ↗';
  host.append(make('p','', '버튼을 누르면 '+p.previewName+' 페이지를 이 창 안에서 불러옵니다. 처음 방문할 때는 로딩이 필요할 수 있습니다.'));
 }else{
  btn.hidden=true;
  host.append(make('p','',p.previewNotice||'이 프로젝트는 화면 삽입 미리보기를 제공하지 않습니다.'));
 }
 byId('previewNote').textContent=p.preview
  ?'일부 환경에서는 사이트가 창 안에 표시되지 않을 수 있습니다. 아래의 실제 사이트 링크로 이동해 주세요.'
  :'개인 데이터 보호를 위해 별도의 공개 데모 화면을 사용하지 않습니다.';
 dialog.showModal();
}
const triggers=[...document.querySelectorAll('[data-project].project-detail-button')];
triggers.forEach(button=>button.addEventListener('click',()=>openProject(button.dataset.project)));
byId('projectDialogClose').addEventListener('click',()=>dialog.close());
byId('previewLoad').addEventListener('click',loadPreview);
dialog.addEventListener('click',event=>{
 if(event.target!==dialog)return;
 const rect=dialog.getBoundingClientRect();
 if(event.clientX<rect.left||event.clientX>rect.right||event.clientY<rect.top||event.clientY>rect.bottom)dialog.close();
});
dialog.addEventListener('close',()=>{
 selectedKey=null;
 byId('previewHost').replaceChildren(); // stop a loaded iframe and any background playback
});
})();