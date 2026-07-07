/* =============================================
   챗봇 시스템 프롬프트
   ============================================= */
const SYSTEM_PROMPT = `너는 이 포트폴리오 주인의 페르소나 비서야. 방문자에게 밝고 정중하게, 주인을 잘 아는 사람처럼 답해. 답은 2~4문장, 마크다운 기호(별표 등) 없이 평문으로만.
아래 이력 지식을 근거로 답하되, 지식에 없는 질문이 오면 아는 선에서 자연스럽게 답하고 "자세한 건 저에게 직접 물어보시는 게 정확해요. 연락처를 참고해 주세요!"로 부드럽게 연결해. 과장하거나 없는 경력을 만들어내지 마.

이력 지식:
**1. 한 줄 소개**
성균관대학교 사회과학계열 재학 중인 이권재는 복잡한 현상을 구조화하고, AI·데이터 기반 솔루션을 설계·실행하는 리더십과 실무 역량을 갖춘 인재입니다.

---

**2. 기본 정보**
- **소속** : 성균관대학교 사회과학계열 (학생)
- **전공** : 사회과학계열 (전공 미정)
- **연락처·주소** : 포함하지 않음
- **주요 언어** : 한국어(모국어), 영어(업무 수행 가능)
- **핵심 역량** : 구조적 통찰, AI 워크플로우 기획, 파이썬 데이터 분석·시각화, 팀 리더십, 학술·브랜딩 글쓰기

---

**3. 경험 요약**

| 기간 | 프로젝트·역할 | 핵심 내용 (1~2문장) |
|------|----------------|-------------------|
| **2026.06 ~ 현재** | **성균공부방 : Share via AI (VIA 16기 조장)** | 4인 팀을 리드해 생성형 AI 툴들의 메커니즘을 빠르게 분석하고, 시각·텍스트 콘텐츠 생산 파이프라인을 설계·운용함. 팀 전체 아웃풋 퀄리티를 끌어올리는 프롬프트 엔지니어링 가이드라인을 제정하고 오류율을 지속적으로 낮추고 있음. |
| **2026.05** | **의료 취약 지역 분석 시스템 (개인 프로젝트)** | 혜화동 지역의 인프라 사각지대 데이터를 수집·정제·결합한 뒤, 히트맵과 비콘 데이터를 활용한 파이썬 시각화 코드로 가독성 높은 지도·프로토타입을 구현함. 결과적으로 구체적인 의료 취약 지점을 명확히 도출해 정책적·시민적 관심을 촉발. |
| **2026.04 ~ 2026.05** | **교내 서포터즈 뉴스레터 발행 프로젝트** | 뉴스레터 메인 에디터로서 5월 성공 서한·결의문을 기획·집필, 조직이 지향하는 메시지를 학술적·감성적으로 전달함으로써 서포터즈 활동의 가치와 성과를 독자들에게 효과적으로 각인시킴. |
| **2026.03** | **학생성공센터 서포터즈 3기 (콘텐츠 에디터)** | 학생성공센터 뉴스레터 기획·콘텐츠 작성 담당. 핵심 가치를 논리적으로 풀어내어 대중과의 소통 방식을 지속적으로 개선하고 있음. |

---

**4. 강점 다섯 가지**

1. **구조적 통찰력 & 빠른 적응력**
   - 복잡한 시스템(예: AI 툴, 의료 인프라 데이터)을 핵심 뼈대로 빠르게 파악하고, 실제 파이프라인으로 전환한 사례가 다수.

2. **AI·프롬프트 엔지니어링을 통한 업무 효율 향상**
   - VIA 프로젝트에서 팀 전체 프롬프트 표준화 가이드라인을 수립해 오류율을 최소화하고, 일관된 고품질 AI 결과물을 생산.

3. **데이터 기반 문제 정의와 시각화 역량**
   - 의료 취약 지역 프로젝트에서 서로 다른 공공 데이터셋을 통합·정제하고, 히트맵·비콘 결합 시각화로 인프라 공백 지역을 직관적으로 도출.

4. **팀 리더십 및 일정 관리**
   - VIA 조장으로 거시적 타임라인을 설계·실행하고, 팀원별 강점을 매핑해 업무 분배를 최적화, 프로젝트 진행 속도를 유지.

5. **학술·브랜딩 커뮤니케이션 능력**
   - 뉴스레터·성공 서한·결의문 등 감성·학문적 메시지를 전문 에디터 수준에서 기획·작성, 조직 가치와 성과를 외부 구독자에게 효과적으로 전달.

---

**5. 예상 질문과 답**

| 예상 질문 | 이력 기반 답변 |
|-----------|----------------|
| **어떤 프로젝트에서 AI를 실제로 활용했나요?** | VIA(성균공부방) 프로젝트에서 4인 팀을 리드해 ChatGPT·Claude 등 생성형 AI 툴을 활용한 시각·텍스트 콘텐츠 생산 파이프라인을 구축했으며, 프롬프트 엔지니어링 가이드라인을 제정해 팀 전체 아웃풋 퀄리티를 향상시켰습니다. |
| **데이터 분석·시각화 경험이 있나요?** | 의료 취약 지역 분석 시스템에서 공공 인구·의료기관 위치 데이터를 수집·정제·결합하고, 파이썬 히트맵과 비콘 데이터를 결합한 시각화 코드를 구현해 인프라 사각지대 지도를 만들었습니다. |
| **팀 프로젝트에서의 리더십 경험을 알려 주세요.** | VIA 프로젝트 조장으로 전체 일정 관리와 팀원별 역할 배분을 담당했으며, 정기적인 내부 피드백 세션을 운영해 AI 결과물의 오류율을 지속적으로 낮추고, 프로젝트 진행을 원활히 이끌었습니다. |

*※ 위 내용은 이력서에 기재된 사실만을 바탕으로 작성되었습니다.*`;


/* =============================================
   다크모드 토글 — localStorage에 테마 저장
   ============================================= */
(function initTheme() {
  const themeToggle = document.getElementById('themeToggle');
  const savedTheme = localStorage.getItem('theme');

  if (savedTheme === 'dark') {
    document.documentElement.setAttribute('data-theme', 'dark');
  }

  themeToggle.addEventListener('click', function () {
    const isDark = document.documentElement.getAttribute('data-theme') === 'dark';

    if (isDark) {
      document.documentElement.removeAttribute('data-theme');
      localStorage.setItem('theme', 'light');
    } else {
      document.documentElement.setAttribute('data-theme', 'dark');
      localStorage.setItem('theme', 'dark');
    }
  });
})();


/* =============================================
   내비게이션 스크롤 효과 — 배경 & 그림자
   ============================================= */
(function initNavbarScroll() {
  const navbar = document.getElementById('navbar');

  function updateNavbar() {
    if (window.scrollY > 20) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }
  }

  window.addEventListener('scroll', updateNavbar, { passive: true });
  updateNavbar();
})();


/* =============================================
   부드러운 스크롤 — 내비 링크 & CTA 버튼
   ============================================= */
(function initSmoothScroll() {
  const scrollLinks = document.querySelectorAll('a[href^="#"], [data-section]');

  scrollLinks.forEach(function (link) {
    link.addEventListener('click', function (e) {
      const targetId = link.getAttribute('data-section')
        ? link.getAttribute('data-section')
        : link.getAttribute('href').slice(1);

      const target = document.getElementById(targetId);
      if (!target) return;

      e.preventDefault();
      target.scrollIntoView({ behavior: 'smooth' });

      const navLinks = document.getElementById('navLinks');
      if (navLinks.classList.contains('open')) {
        navLinks.classList.remove('open');
        document.getElementById('navToggle').setAttribute('aria-expanded', 'false');
      }
    });
  });
})();


/* =============================================
   등장 애니메이션 — IntersectionObserver
   ============================================= */
(function initRevealAnimation() {
  const revealElements = document.querySelectorAll('.reveal');

  const observer = new IntersectionObserver(
    function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          observer.unobserve(entry.target);
        }
      });
    },
    {
      threshold: 0.12,
      rootMargin: '0px 0px -40px 0px'
    }
  );

  revealElements.forEach(function (el) {
    observer.observe(el);
  });
})();


/* =============================================
   모바일 햄버거 메뉴 토글
   ============================================= */
(function initMobileNav() {
  const navToggle = document.getElementById('navToggle');
  const navLinks = document.getElementById('navLinks');

  navToggle.addEventListener('click', function () {
    const isOpen = navLinks.classList.toggle('open');
    navToggle.setAttribute('aria-expanded', isOpen);
    navToggle.setAttribute('aria-label', isOpen ? '메뉴 닫기' : '메뉴 열기');
  });
})();


/* =============================================
   챗봇 — Upstage API 연동
   ============================================= */
(function initChatbot() {
  const UPSTAGE_URL = 'https://api.upstage.ai/v1/chat/completions';
  const API_KEY_STORAGE = 'upstage_api_key';
  const isLocalFile = location.protocol === 'file:';

  const chatToggle = document.getElementById('chatToggle');
  const chatPanel = document.getElementById('chatPanel');
  const chatClose = document.getElementById('chatClose');
  const chatMessages = document.getElementById('chatMessages');
  const chatForm = document.getElementById('chatForm');
  const chatInput = document.getElementById('chatInput');
  const chatSend = document.getElementById('chatSend');

  // 대화 기록 (API 전송용)
  const conversationHistory = [];

  let isSending = false;
  let loadingEl = null;

  // 환영 메시지 표시
  appendMessage(
    'bot',
    '안녕하세요! 이권재의 AI 비서예요. 권재님의 경력이나 프로젝트에 대해 궁금한 점을 편하게 물어보세요.'
  );

  // 패널 열기/닫기
  chatToggle.addEventListener('click', function () {
    const isOpen = chatPanel.classList.toggle('open');
    chatToggle.setAttribute('aria-expanded', isOpen);
    chatToggle.setAttribute('aria-label', isOpen ? '채팅 닫기' : '채팅 열기');
    chatPanel.setAttribute('aria-hidden', !isOpen);
    if (isOpen) chatInput.focus();
  });

  chatClose.addEventListener('click', function () {
    chatPanel.classList.remove('open');
    chatToggle.setAttribute('aria-expanded', 'false');
    chatToggle.setAttribute('aria-label', '채팅 열기');
    chatPanel.setAttribute('aria-hidden', 'true');
  });

  // 메시지 DOM 추가
  function appendMessage(type, text) {
    const el = document.createElement('div');
    el.className = 'chat-message chat-message--' + type;
    el.textContent = text;
    chatMessages.appendChild(el);
    chatMessages.scrollTop = chatMessages.scrollHeight;
    return el;
  }

  // 로딩 표시
  function showLoading() {
    loadingEl = document.createElement('div');
    loadingEl.className = 'chat-loading';
    loadingEl.innerHTML = '<span></span><span></span><span></span>';
    chatMessages.appendChild(loadingEl);
    chatMessages.scrollTop = chatMessages.scrollHeight;
  }

  function hideLoading() {
    if (loadingEl) {
      loadingEl.remove();
      loadingEl = null;
    }
  }

  // 전송 중 UI 잠금
  function setSendingState(sending) {
    isSending = sending;
    chatSend.disabled = sending;
    chatInput.disabled = sending;
  }

  // 로컬 파일 환경: API 키 가져오기
  function getLocalApiKey() {
    let key = localStorage.getItem(API_KEY_STORAGE);
    if (key) return key;

    key = window.prompt('Upstage API 키를 붙여넣어 주세요 (up_으로 시작)');
    if (!key || !key.trim()) return null;

    key = key.trim();
    localStorage.setItem(API_KEY_STORAGE, key);
    return key;
  }

  // API 요청 — 환경에 따라 분기
  async function sendToUpstage(messages) {
    if (isLocalFile) {
      const apiKey = getLocalApiKey();
      if (!apiKey) throw { type: 'cancelled' };

      const response = await fetch(UPSTAGE_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: 'Bearer ' + apiKey,
        },
        body: JSON.stringify({ model: 'solar-pro3', messages }),
      });

      const data = await response.json();

      if (response.status === 401) {
        localStorage.removeItem(API_KEY_STORAGE);
        throw { type: 'auth' };
      }

      if (!response.ok) throw { type: 'error', data };
      return data;
    }

    const response = await fetch('/api/chat', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ messages }),
    });

    const data = await response.json();
    if (!response.ok) throw { type: 'error', data };
    return data;
  }

  // 메시지 전송 처리
  async function handleSend(text) {
    if (isSending || !text.trim()) return;

    const userText = text.trim();
    chatInput.value = '';
    appendMessage('user', userText);
    conversationHistory.push({ role: 'user', content: userText });

    setSendingState(true);
    showLoading();

    const messages = [
      { role: 'system', content: SYSTEM_PROMPT },
      ...conversationHistory,
    ];

    try {
      const data = await sendToUpstage(messages);
      hideLoading();

      const reply = data.choices && data.choices[0] && data.choices[0].message
        ? data.choices[0].message.content
        : null;

      if (!reply) {
        appendMessage('error', '잠시 후 다시 시도해 주세요.');
        conversationHistory.pop();
        return;
      }

      appendMessage('bot', reply);
      conversationHistory.push({ role: 'assistant', content: reply });
    } catch (err) {
      hideLoading();

      if (err.type === 'cancelled') {
        conversationHistory.pop();
        chatMessages.lastChild.remove();
        return;
      }

      if (err.type === 'auth') {
        appendMessage('error', '키가 올바르지 않아요. 다시 질문하시면 새로 입력받을게요.');
        conversationHistory.pop();
        return;
      }

      appendMessage('error', '잠시 후 다시 시도해 주세요.');
      conversationHistory.pop();
    } finally {
      setSendingState(false);
      chatInput.focus();
    }
  }

  // 폼 제출
  chatForm.addEventListener('submit', function (e) {
    e.preventDefault();
    handleSend(chatInput.value);
  });

  // Enter로 전송, Shift+Enter로 줄바꿈
  chatInput.addEventListener('keydown', function (e) {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend(chatInput.value);
    }
  });
})();
