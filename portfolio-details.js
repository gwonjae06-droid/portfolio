/* Project case studies and opt-in live previews; no framework or network analytics. */
(()=>{'use strict';
const PROJECTS={
 games:{
  title:'GAME WORKS',kicker:'GAME DESIGN & DEVELOPMENT',
  summary:'오이붕 아레나는 현재 웹에서 플레이할 수 있으며, 나머지 게임들은 개발 중입니다.',
  tags:['2D 웹 게임','액션 시뮬레이션','게임 개발'],
  why:'캐릭터별 행동을 직접 구성하고 전투를 시뮬레이션하는 실험을 시작으로, 다양한 게임의 플레이 경험을 만들어 보고 있습니다.',
  features:[
   '오이붕 아레나: 커스텀 캐릭터 제작, 블록 기반 스킬 구성, 자동 전투와 전투 이펙트를 갖춘 2D 웹 게임',
   'OChams 3D Battle — 개발 중',
   'CAMPUS LEGENDS — 개발 중',
   'Oibung Trials — 개발 중'
  ],
  decisions:'현재 직접 플레이 가능한 오이붕 아레나의 링크만 공개하고, 개발 중인 다른 게임은 링크 없이 상태만 안내합니다.',
  status:'오이붕 아레나: 플레이 가능. OChams 3D Battle · CAMPUS LEGENDS · Oibung Trials: 개발 중.',
  preview:'https://gwonjae06-droid.github.io/oibung-ballfight-base/',
  previewTitle:'오이붕 아레나 실제 웹 게임',previewName:'오이붕 아레나 플레이',
  links:[
   ['오이붕 아레나 플레이','https://gwonjae06-droid.github.io/oibung-ballfight-base/']
  ],
  sub:[
   ['오이붕 아레나','HTML · CSS · JavaScript','커스텀 캐릭터를 만들고 스킬을 조합해 자동 전투를 즐기는 2D 아레나'],
   ['OChams 3D Battle','개발 중',''],
   ['CAMPUS LEGENDS','개발 중',''],
   ['Oibung Trials','개발 중','']
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
   card.append(make('h4','',name),make('span','',tech));
   if(desc)card.append(make('p','',desc));
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