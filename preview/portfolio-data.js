export const portfolioData = {
  profile: {
    name: "김수현",
    eyebrow: "B2B AI · DATA SERVICES",
    title: "복잡한 AI\n흐름을 제품으로\n연결합니다",
    summary:
      "Text-to-SQL, 데이터 처리, 인증과 운영 안정화를 설계·구현합니다. 문제를 작은 실행 단위로 나누고, 팀이 오래 운영할 수 있는 경계까지 함께 만듭니다.",
    asOf: "자료 기준일 2026.08",
  },
  capabilities: [
    {
      index: "01",
      title: "AI 실행 흐름",
      detail: "Text-to-SQL DAG, LLM SDK 마이그레이션, 재시도 가능한 작업 단위",
      proof: "질의 계획을 관찰 가능한 단계로 나눕니다.",
    },
    {
      index: "02",
      title: "데이터 신뢰성",
      detail: "입력 정규화, 시계열 변환, 스키마 검증과 오류 경계",
      proof: "입력의 불확실성을 제품 안에서 설명합니다.",
    },
    {
      index: "03",
      title: "제품 운영",
      detail: "인증·BFF, 런타임 설정, 배포 자동화, 복구 가능한 운영 흐름",
      proof: "기능이 운영되는 마지막 구간까지 설계합니다.",
    },
  ],
  cases: [
    {
      number: "01",
      label: "AI 질의 백엔드",
      period: "2026.07",
      project: "AI 질의 플랫폼 · kt-gsi",
      role: "백엔드·오케스트레이션 설계 담당",
      scope: "실행 흐름 · 설정 경계 · SQL 오류 대응",
      title: "질의를 실행 가능한 DAG로 바꾸기",
      summary:
        "자연어 질문이 SQL 한 줄로 끝나지 않는 상황에서, 계획·실행·검증을 분리해 실패 지점을 읽을 수 있는 흐름으로 만들었습니다.",
      problem:
        "질의가 여러 단계의 판단과 데이터 조회를 거치면서, 한 번의 모델 호출만으로는 실패 원인과 재시도 지점을 설명하기 어려웠습니다.",
      contributions: [
        "Text-to-SQL 처리 흐름을 DAG 구조로 설계하고 핵심 오케스트레이션을 담당",
        "secrets import/export와 Azure 리소스 기반 설정 경계를 정리",
        "로컬 DB 의존성을 줄이고 cloud/keyless 기준으로 실행 환경을 전환",
        "날짜 타입 오류 사전 차단·재시도와 상품 조회 조건·채널 앵커링 로직 개선",
      ],
      stack: ["C#/.NET", "Text-to-SQL", "DAG orchestration", "Azure", "SQL"],
      decisions: [
        "질의 계획을 단계별 책임 단위로 쪼개고 각 결과를 다음 노드의 입력으로 연결",
        "클라우드 자격 증명과 런타임 설정을 코드 밖 경계로 이동",
        "날짜 조건·재시도·실행 결과를 같은 관찰 흐름에서 검증",
      ],
      outcome: "Text-to-SQL 작업에서 확인 가능한 실행 경로와 회귀 기준을 남겼습니다.",
      evidence: "GitHub 활동 감사에서 관련 authored PR 9건이 병합된 것으로 확인",
    },
    {
      number: "02",
      label: "금융 AI 백엔드",
      period: "2026.06",
      project: "금융 AI 서비스 · NHBank",
      role: "AI 백엔드·SDK 마이그레이션 담당",
      scope: "LLM 연동 · 토큰 사용량 · 배포 설정",
      title: "LLM 연동을 운영 가능한 계약으로",
      summary:
        "금융권 AI 서비스의 모델 연동을 SDK와 환경 설정 변화에 흔들리지 않도록 정리하고, 운영 중 발생한 오류까지 같은 릴리스 흐름으로 연결했습니다.",
      problem:
        "Azure OpenAI 사용량과 SDK 계약이 바뀌는 상황에서 환경별 설정, 토큰 사용, 오류 수정이 서로 다른 작업으로 흩어져 있었습니다.",
      contributions: [
        "Azure OpenAI 토큰 사용량을 안정화하고 호출 경계를 점검",
        "LLM 설정을 환경변수 기반으로 전환해 배포 환경의 차이를 줄임",
        "Azure.AI.OpenAI SDK v2 마이그레이션과 서비스 최신화 수행",
        "TCB 오류 수정과 라이브 컨트롤러 기능을 제품 흐름에 반영",
      ],
      stack: ["C#/.NET", "Azure OpenAI", "SDK v2", "환경변수 구성"],
      decisions: [
        "모델 호출 코드와 환경별 설정을 분리해 SDK 변경의 영향 범위를 제한",
        "토큰 사용량과 오류 대응을 운영 설정의 일부로 함께 검증",
        "기능 수정과 서비스 최신화를 별도 PR로 쪼개 리뷰 가능한 단위로 전달",
      ],
      outcome: "LLM SDK 변경과 운영 환경 차이를 분리해 금융 AI 백엔드의 업데이트 경로를 단순화했습니다.",
      evidence: "GitHub 활동 감사에서 관련 기능 PR 5건이 확인됨",
    },
    {
      number: "03",
      label: "플랫폼 엔지니어링",
      period: "2025–2026",
      project: "CXP 플랫폼 · cxp-light-fe / langcode.cxp.back",
      role: "풀스택·인증·배포 구조 담당",
      scope: "BFF 인증 · 모델 관리 UI · 런타임 구성",
      title: "인증 경계를 제품 경계로",
      summary:
        "프론트엔드 화면, BFF, Keycloak 인증, 런타임 구성, 배포 흐름을 따로 놓지 않고 한 제품의 운영 경계로 연결했습니다.",
      problem:
        "cross-origin 환경의 인증 쿠키와 모델 관리 화면, standalone 배포 설정이 서로 다른 레이어에 흩어져 있어 기능 이후의 운영 책임이 불분명했습니다.",
      contributions: [
        "Keycloak 로그인과 Identity 모듈을 구현·리팩터링",
        "BFF Auth Proxy로 cross-origin 인증 쿠키 문제를 해결",
        "모델·프로바이더 관리와 채팅 모델 선택 UI 구현",
        "standalone 배포, runtime 환경변수, refresh token 쿠키 정책 정비",
      ],
      stack: ["TypeScript/React", "C#/.NET", "BFF", "Keycloak", "Cosmos DB"],
      decisions: [
        "인증 상태와 화면 권한을 BFF 경계에서 명확하게 전달",
        "환경별 값은 런타임 설정으로 분리해 동일한 빌드 산출물을 재사용",
        "배포와 오류 복구를 문서가 아닌 반복 가능한 명령으로 정리",
      ],
      outcome: "기능 구현 이후의 인증·설정·배포 리스크를 팀이 함께 확인할 수 있게 했습니다.",
      evidence: "GitHub 활동 감사에서 플랫폼 관련 authored PR 15건이 병합된 것으로 확인",
    },
    {
      number: "04",
      label: "온프레미스 AI 에이전트",
      period: "2025.12",
      project: "온프레미스 에이전트 · dcai-onpremise",
      role: "에이전트 오케스트레이션·운영 UI 담당",
      scope: "handoff · workflow · 운영 대시보드",
      title: "에이전트 간 handoff를 운영 흐름으로",
      summary:
        "온프레미스 실행 환경에서 여러 에이전트의 handoff와 오케스트레이션을 운영자가 확인할 수 있는 제품 흐름으로 연결했습니다.",
      problem:
        "에이전트가 다음 역할로 넘겨지는 과정과 긴급 상태를 한 화면에서 설명하지 못하면, 운영자는 결과만 보고 실패 원인을 추적해야 했습니다.",
      contributions: [
        "AI Agents Phase 4 기능을 구현하고 에이전트 handoff 흐름을 연결",
        "orchestration workflow를 운영 상태가 보이는 단계로 정리",
        "urgent alert와 3-panel dashboard로 실행 맥락을 시각화",
        "light/dark theme과 다국어 회의록 기능을 제품 흐름에 반영",
      ],
      stack: ["AI agents", "orchestration workflow", "on-premise", "3-panel dashboard", "i18n"],
      decisions: [
        "handoff를 암묵적인 호출이 아니라 확인 가능한 workflow 단계로 표현",
        "긴급 알림과 회의록을 운영 대시보드의 동일한 맥락에 배치",
        "온프레미스 환경에서도 설정과 화면 상태를 재현할 수 있게 구성",
      ],
      outcome: "에이전트 실행 결과뿐 아니라 handoff·경고·회의 맥락까지 운영자가 따라갈 수 있게 했습니다.",
      evidence: "GitHub 활동 감사에서 관련 authored PR 8건이 모두 병합된 것으로 확인",
    },
  ],
  supporting: [
    "Azure OpenAI와 SDK v2 전환",
    "에이전트 오케스트레이션과 온프레미스 실행 환경",
    "금융·제조 도메인의 진단, 과금, 사전검증 PoC",
  ],
  contact: {
    github: "https://github.com/kimgooneya",
    githubLabel: "github.com/kimgooneya",
    resume: "../resume/developer-resume.html",
  },
};
