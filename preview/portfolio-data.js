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
      detail: "비정형 Excel 파싱, 시계열 변환, 스키마 검증과 오류 경계",
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
      title: "질의를 실행 가능한 DAG로 바꾸기",
      summary:
        "자연어 질문이 SQL 한 줄로 끝나지 않는 상황에서, 계획·실행·검증을 분리해 실패 지점을 읽을 수 있는 흐름으로 만들었습니다.",
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
      label: "데이터 처리 도구",
      period: "2025–2026",
      title: "비정형 파일을 신뢰 가능한 데이터로",
      summary:
        "사람이 작성한 Excel 파일은 표 하나의 모양으로 오지 않습니다. 병합 셀과 빈 구간을 보존하면서 후속 분석이 읽을 수 있는 구조로 변환했습니다.",
      decisions: [
        "입력 표의 헤더·병합·빈 행을 별도 단계로 인식해 변환 책임을 분리",
        "희소 시계열을 분석 모델이 소비할 수 있는 형태로 정규화",
        "파서의 경계 오류를 재현 가능한 fixture와 테스트로 고정",
      ],
      outcome: "데이터를 읽는 사람과 다음 시스템 모두가 변환 결과를 추적할 수 있게 했습니다.",
      evidence: "GitHub 활동 감사에서 관련 authored PR 11건, 병합 PR 12건이 확인됨",
    },
    {
      number: "03",
      label: "플랫폼 엔지니어링",
      period: "2024–2026",
      title: "인증에서 배포까지 하나의 제품 경계로",
      summary:
        "프론트엔드 화면, BFF, Keycloak 인증, 런타임 구성, 배포 흐름을 따로 놓지 않고 한 제품의 운영 경계로 연결했습니다.",
      decisions: [
        "인증 상태와 화면 권한을 BFF 경계에서 명확하게 전달",
        "환경별 값은 런타임 설정으로 분리해 동일한 빌드 산출물을 재사용",
        "배포와 오류 복구를 문서가 아닌 반복 가능한 명령으로 정리",
      ],
      outcome: "기능 구현 이후의 인증·설정·배포 리스크를 팀이 함께 확인할 수 있게 했습니다.",
      evidence: "GitHub 활동 감사에서 플랫폼 관련 authored PR 15건이 병합된 것으로 확인",
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
