# 개발자 이력서용 프로젝트 기여 정리

- 기준일: 2026-08-01
- 대상: 전체 조사 보고서에서 직접 PR·commit·review 근거가 확인된 프로젝트
- 주 계정: kimgooneya / GitHub ID 26292512 / 프로필명 Soo Hyeon Kim
- 문서 목적: 비공개 저장소의 작업을 프로젝트 단위 역할과 이력서 문장으로 재구성
- 사용 전 확인: 비공개 프로젝트명·고객명·기능명은 NDA와 회사 정책에 따라 익명화하거나 제외해야 합니다.

## 이력서 상단 요약문

C#/.NET 및 TypeScript/React 기반의 B2B AI·데이터 서비스 개발 경험을 보유하고 있습니다. 고객사 PoC와 상용 서비스에서 LLM/Azure OpenAI 연동, 인증·Identity, CXP 백엔드/프론트엔드, 데이터 파싱·리포트, 업무 도메인 CRUD와 운영 안정화까지 담당했습니다. GitHub 근거상 authored PR 700건 이상이 관찰되며, 주요 저장소에서 병합된 기능·수정 PR을 반복적으로 납품했습니다. 단, 검색 상한과 rate limit 때문에 전체 합계는 하한으로만 사용해야 합니다.

## 핵심 역량 키워드

- Backend: C#, .NET, ASP.NET Core, Azure Functions, REST API, CRUD, DI
- AI/Data: Azure OpenAI, LLM SDK migration, Text-to-SQL, DAG orchestration, RAG/CXP, Cosmos DB, Form Recognizer, Excel/document parsing
- Frontend: React, TypeScript, Next.js, Blazor, BFF, authentication cookie, model management UI
- Platform: Keycloak, Identity, secrets import/export, cloud/keyless configuration, deployment configuration
- Delivery: PR 기반 개발, 기능 단위 릴리스, 운영 오류 수정, 고객 피드백 반영, PoC-to-product iteration

## 프로젝트별 이력서용 정리

- 정렬 기준: GitHub 감사에서 확인된 프로젝트별 최신 PR·commit 활동일 내림차순입니다. 날짜는 프로젝트 전체 기간이 아니라 이번 조사에서 확인된 최신 활동일입니다.

### langcodestartup/kt-gsi

- 역할: Text-to-SQL DAG 아키텍처 핵심 설계 및 AI 검색/질의 서비스 백엔드·보안 설정 개발자
- 최신 확인 활동: 2026-07-18 (GitHub PR/commit 기준)
- 기여:
  - Text-to-SQL 처리 흐름을 DAG 구조로 설계하고 핵심 오케스트레이션 역할 수행
  - secrets import/export와 Azure 리소스 기반 설정 경계 정리
  - 로컬 DB 의존성을 제거하고 cloud/keyless 기준으로 전환
  - 날짜 타입 오류 사전 차단·재시도, 상품 조회 조건과 채널 앵커링 로직 개선
  - 9개 authored PR을 모두 병합
- 이력서 문장: Text-to-SQL DAG 아키텍처를 핵심적으로 설계하고, AI 질의 서비스의 secrets 관리·cloud/keyless 전환과 SQL 오류 대응을 포함한 9개 병합 PR을 수행했습니다.
- 근거: [PR #9](https://github.com/langcodestartup/kt-gsi/pull/9), [PR #7](https://github.com/langcodestartup/kt-gsi/pull/7), [PR #1](https://github.com/langcodestartup/kt-gsi/pull/1)

### langcodestartup/NHBank

- 역할: 금융권 AI 백엔드 및 LLM 통합 개발자
- 최신 확인 활동: 2026-06-20 (GitHub PR/commit 기준)
- 기여:
  - Azure OpenAI 토큰 사용량 안정화
  - LLM 환경변수화와 Azure.AI.OpenAI SDK v2 마이그레이션
  - TCB 오류 수정, 서비스 최신화, 라이브 컨트롤러 기능 반영
- 이력서 문장: 금융 AI 서비스에서 Azure OpenAI 운영 안정화와 SDK v2 마이그레이션을 수행하고, 환경변수 기반 배포와 오류 수정까지 5개 기능 PR로 반영했습니다.
- 근거: [PR #98](https://github.com/langcodestartup/NHBank/pull/98), [PR #97](https://github.com/langcodestartup/NHBank/pull/97), [PR #91](https://github.com/langcodestartup/NHBank/pull/91)

### langcodestartup/excel-parser

- 역할: 비정형 Excel 데이터 파싱·추출 라이브러리 개발자
- 최신 확인 활동: 2026-06-13 (GitHub PR/commit 기준)
- 기여:
  - 희소 시계열의 날짜 행과 빈 헤더 선행 키 컬럼 보존
  - BIS Quarterly Series 헤더 탐지와 다단 헤더·병합 제목행 처리
  - 비표 데이터 휴리스틱, notes 표면화, date dtype 실패 시 중단 방지
  - 12개 authored PR 중 11개 병합
- 이력서 문장: 비정형 Excel 추출 라이브러리에서 헤더 탐지·다단 헤더·희소 시계열·날짜 타입 오류 처리를 개선해 12개 PR 중 11개를 병합했습니다.
- 근거: [PR #26](https://github.com/langcodestartup/excel-parser/pull/26), [PR #25](https://github.com/langcodestartup/excel-parser/pull/25), [PR #20](https://github.com/langcodestartup/excel-parser/pull/20)

### wezenhealthcare/wezen-rfid-scanner

- 역할: RFID 스캐너 제품의 지속 개발·유지보수 기여자
- 최신 확인 활동: 2026-04-04 (GitHub PR/commit 기준)
- 기여:
  - 100건 결과 상한에 도달한 authored PR 결과에서 최소 100개 병합 PR 확인
  - 직접 authored commit도 확인
  - 검색 상한 때문에 실제 전체 PR 수는 더 클 수 있음
- 이력서 문장: RFID 스캐너 제품에서 최소 100개의 병합 PR을 수행하며 지속적인 기능 개발과 유지보수에 기여했습니다.
- 근거: [PR #141](https://github.com/wezenhealthcare/wezen-rfid-scanner/pull/141), [PR #140](https://github.com/wezenhealthcare/wezen-rfid-scanner/pull/140), [commit #141](https://github.com/wezenhealthcare/wezen-rfid-scanner/commit/36c2098bef61eb38214cf22430679c5857cf4cc2)

### langcodestartup/langcode.cxp.front

- 역할: CXP 프론트엔드 빌드·런타임·인증 개발자
- 최신 확인 활동: 2026-03-26 (GitHub PR/commit 기준)
- 기여:
  - standalone 빌드 실패 원인 제거와 Next runtime 환경변수 전환
  - refresh token 쿠키 정책 조정
  - Chrome 디버깅 자동화 스크립트와 worktree/PR 개발 가이드 추가
- 이력서 문장: CXP 프론트엔드의 standalone 빌드와 런타임 환경변수를 정비하고 refresh token 쿠키·개발 자동화·배포 문서를 개선했습니다.
- 근거: [commit: runtime 환경변수](https://github.com/langcodestartup/langcode.cxp.front/commit/b35971c4fc75d505e8088bf907fde8f6762080de), [commit: standalone 빌드](https://github.com/langcodestartup/langcode.cxp.front/commit/2de19066f43f42d280c1c0272a07788675dededf)

### langcodestartup/cxp-light-fe

- 역할: CXP 프론트엔드 및 배포 설정 개발자
- 최신 확인 활동: 2026-03-20 (GitHub PR/commit 기준)
- 기여:
  - BFF Auth Proxy로 cross-origin 인증 쿠키 문제 해결
  - 모델 관리·프로바이더 관리·채팅 모델 선택 UI 구현
  - standalone 배포, 환경변수 통일, Settings 레이아웃과 프로필 수정 기능 반영
  - 15개 authored PR을 모두 병합
- 이력서 문장: CXP 프론트엔드에서 BFF 인증 프록시와 모델 관리 UI를 구현하고, standalone 배포·환경변수 설정을 정비하는 15개 병합 PR을 수행했습니다.
- 근거: [PR #16](https://github.com/langcodestartup/cxp-light-fe/pull/16), [PR #13](https://github.com/langcodestartup/cxp-light-fe/pull/13), [PR #10](https://github.com/langcodestartup/cxp-light-fe/pull/10)

### langcodestartup/dcai-onpremise

- 역할: 온프레미스 AI 에이전트·오케스트레이션 개발자
- 최신 확인 활동: 2025-12-10 (GitHub PR/commit 기준)
- 기여:
  - AI Agents Phase 4 구현
  - agent handoff와 orchestration workflow 구현
  - urgent alert, 3-panel dashboard, light/dark theme, multilingual meeting minutes 기능 반영
  - 8개 authored PR을 모두 병합
- 이력서 문장: 온프레미스 AI 에이전트 시스템에서 handoff·orchestration workflow와 운영 대시보드·다국어 회의록 기능을 구현하는 8개 병합 PR을 수행했습니다.
- 근거: [PR #8](https://github.com/langcodestartup/dcai-onpremise/pull/8), [PR #4](https://github.com/langcodestartup/dcai-onpremise/pull/4), [PR #3](https://github.com/langcodestartup/dcai-onpremise/pull/3)

### langcodestartup/KyoboPrePoC

- 역할: 금융·문서 처리 PoC 기능 개발자
- 최신 확인 활동: 2025-08-08 (GitHub PR/commit 기준)
- 기여:
  - ChatMessageType 확장과 F1 오류 메시지 표시 개선
  - 검증 조건과 오차 항목 표시 방식 개선
  - 6개 authored PR이 관찰됨
- 이력서 문장: 금융 문서 처리 PoC에서 검증 결과와 오류 메시지 표시를 개선하고 사용자 피드백을 반영했습니다.
- 근거: [commit: 오류 메시지 표시](https://github.com/langcodestartup/KyoboPrePoC/commit/ab6ab0ea0c5e8db71cb78b3158e2d0f621a58b84)

### langcodestartup/KyoboPrePoC-Function

- 역할: 문서 처리 서버리스 기능 개발자
- 최신 확인 활동: 2025-08-08 (GitHub PR/commit 기준)
- 기여:
  - Excel 저장 기능과 output path 처리 구현
  - Excel 범위 지정 스타일과 오차 값 표시 정책 반영
  - 6개 authored PR이 관찰됨
- 이력서 문장: 문서 처리 서버리스 기능에서 Excel 저장·출력 경로·범위 스타일을 구현하고 결과 표시 정책을 정비했습니다.
- 근거: [commit: Excel 저장](https://github.com/langcodestartup/KyoboPrePoC-Function/commit/81a74ff959762bcf90a1eb4caa229be7290155c6), [commit: output path](https://github.com/langcodestartup/KyoboPrePoC-Function/commit/de212e3e95ab644db0f96e37c87f208bbbfccce8)

### langcodestartup/langcode.cxp.back

- 역할: CXP 백엔드 인증·Identity 모듈 개발자
- 최신 확인 활동: 2025-06-12 (GitHub PR/commit 기준)
- 기여:
  - Keycloak 로그인 기능 구현
  - Identities 모듈 리팩터링과 Identity 모듈 동작 복구
  - 로그인 흐름과 백엔드 인증 안정화에 참여
  - authored PR 24개가 관찰됨
- 이력서 문장: CXP 백엔드에서 Keycloak 로그인과 Identity 모듈을 구현·리팩터링해 인증 흐름을 안정화했습니다.
- 근거: [commit: Keycloak 로그인](https://github.com/langcodestartup/langcode.cxp.back/commit/8b00d833c6edc7ba3b9de751a8207541c889c35c), [PR 목록](https://github.com/langcodestartup/langcode.cxp.back/pulls?q=is%3Apr+author%3Akimgooneya)

### langcodestartup/keycloak-react

- 역할: React 기반 인증 프론트엔드 개발자
- 최신 확인 활동: 2025-03-21 (GitHub PR/commit 기준)
- 기여:
  - Create React App 기반 프로젝트 초기화
  - Keycloak 관련 코드 완성과 사용 문서 정리
- 이력서 문장: React 기반 Keycloak 인증 프론트엔드의 초기 구조와 구현을 완성하고 사용 문서를 정리했습니다.
- 근거: [commit: code complete](https://github.com/langcodestartup/keycloak-react/commit/995ec54036315a91bfa95a923b21f07b1c19bb31)

### langcodestartup/LCDocumentParser

- 역할: 문서 파싱 서비스 초기 구조·안정화 개발자
- 최신 확인 활동: 2025-03-10 (GitHub PR/commit 기준)
- 기여:
  - 프로젝트 기본 구조와 문서 엔드포인트 초기화
  - import 안정성 개선과 API 주석 보강
- 이력서 문장: 문서 파싱 서비스의 초기 구조와 엔드포인트를 구성하고 import 안정성을 개선했습니다.
- 근거: [commit: import 안정성 개선](https://github.com/langcodestartup/LCDocumentParser/commit/74052831aa8325fb1a35dfb0db803fd91cdb2336), [commit: 초기 구조](https://github.com/langcodestartup/LCDocumentParser/commit/9d44e9f372771cbb136d8f28eee8e327dd92f2a8)

### langcodestartup/Seegene.V2

- 역할: 진단·검사 업무 시스템의 기능 개발자
- 최신 확인 활동: 2024-12-04 (GitHub PR/commit 기준)
- 기여:
  - SGAL 오류 및 검사 업무 로직 수정
  - 44개 authored PR을 모두 병합
- 이력서 문장: 진단·검사 업무 시스템에서 SGAL 오류와 업무 로직을 수정하고 44개 authored PR을 모두 병합했습니다.
- 근거: [PR #63](https://github.com/langcodestartup/Seegene.V2/pull/63), [PR #62](https://github.com/langcodestartup/Seegene.V2/pull/62), [PR #60](https://github.com/langcodestartup/Seegene.V2/pull/60)

### langcodestartup/NHRS

- 역할: AI 상담·모니터링 서비스 풀스택 개발자
- 최신 확인 활동: 2024-06-28 (GitHub PR/commit 기준)
- 기여:
  - 채팅 이력 표시와 대시보드 조회 쿼리 개선
  - TCB API, 조회 조건 UI, 필터, 구조 변경 반영
  - 96개 authored PR이 관찰된 장기 기능·운영 개선 흐름에 참여
- 이력서 문장: AI 상담·모니터링 서비스의 대시보드·채팅 이력·조회 필터와 TCB 연동을 지속 개선하며 96개 authored PR 규모의 기능 개발 및 운영 수정에 참여했습니다.
- 근거: [PR 목록](https://github.com/langcodestartup/NHRS/pulls?q=is%3Apr+author%3Akimgooneya), [commit #113](https://github.com/langcodestartup/NHRS/commit/dc316dd9db0cf008a70749e08964e466e30d559c)

### langcodestartup/SpinInvoice

- 역할: 구독·청구 업무 시스템 개발자
- 최신 확인 활동: 2023-10-17 (GitHub PR/commit 기준)
- 기여:
  - 청구·구독 업무 기능과 오류 수정 PR을 반복적으로 반영
  - 54개 authored PR 중 47개 병합
  - commit metadata에서 primary 계정과 langcode-shkim 계정의 활동이 함께 관찰되므로 기여 주체는 분리 기록
- 이력서 문장: 구독 청구 시스템의 기능 개발과 오류 수정을 지속 수행해 54개 authored PR 중 47개를 병합했습니다.
- 근거: [PR #98](https://github.com/langcodestartup/SpinInvoice/pull/98), [PR #95](https://github.com/langcodestartup/SpinInvoice/pull/95), [commit: kimgooneya](https://github.com/langcodestartup/SpinInvoice/commit/63906a3efdaf8eeac75f8fc39b7eae03d5eb07a8)

### langcodestartup/KbhcCosmosEngine

- 역할: 식이·건강 데이터 서비스 백엔드 개발자
- 최신 확인 활동: 2023-09-08 (GitHub PR/commit 기준)
- 기여:
  - 식이 데이터 오류 수정과 누락 값을 0으로 환산하는 처리
  - Journey 통계 수정 및 식이·음료·음주 기능 반영
  - 32개 authored PR이 관찰됨
- 이력서 문장: 식이·건강 데이터 서비스에서 누락 데이터 정규화와 통계·식이 기능을 개선하는 32개 authored PR을 수행했습니다.
- 근거: [PR #62](https://github.com/langcodestartup/KbhcCosmosEngine/pull/62), [PR #61](https://github.com/langcodestartup/KbhcCosmosEngine/pull/61)

### langcodestartup/PaperPop

- 역할: 주문·업로드 업무 시스템 개발자
- 최신 확인 활동: 2023-08-23 (GitHub PR/commit 기준)
- 기여:
  - 업로드 템플릿과 CNPlus 변경 양식 지원
  - 업로드 파일을 Order 데이터로 변환하는 오류 수정
  - 99개 authored PR이 관찰됨
- 이력서 문장: 주문·업로드 업무 시스템에서 외부 양식(CNPlus) 대응과 파일-to-Order 변환 오류를 개선하며 99개 authored PR에 참여했습니다.
- 근거: [PR 목록](https://github.com/langcodestartup/PaperPop/pulls?q=is%3Apr+author%3Akimgooneya), [commit: 업로드 변환 오류](https://github.com/langcodestartup/PaperPop/commit/ce406203621da99d274e64f1f7ee37a51e4f3fba)

### langcodestartup/KotraCXP

- 역할: 문서·지식 기반 AI 서비스 개발자
- 최신 확인 활동: 2023-08-17 (GitHub PR/commit 기준)
- 기여:
  - KnowledgeBase Factory, DI, NuGet 패키지 구성
  - Azure Form Recognizer 서비스 연동
  - 공통 모델·필드·타입 정비
- 이력서 문장: 문서·지식 기반 AI 서비스에서 KnowledgeBase Factory와 DI 구조를 구성하고 Azure Form Recognizer 연동을 구현했습니다.
- 근거: [commit: Form Recognizer](https://github.com/langcodestartup/KotraCXP/commit/d4a88ff5dff8cc5c29a60ebcc093141976ef1a03), [commit: KnowledgeBase Factory](https://github.com/langcodestartup/KotraCXP/commit/b561d8974deefd082365fcf9e773c2f022f73f04)

### langcodestartup/CelltrionPowerBIWebApp

- 역할: 제조·품질 데이터 리포트 웹 애플리케이션 개발자
- 최신 확인 활동: 2023-07-17 (GitHub PR/commit 기준)
- 기여:
  - CPVR/APQR 리포트의 테이블·차트·필터·다운로드·인쇄 기능 구현
  - LIMS 매핑, 파라미터 표시, 쿼리 오류와 빈 값 처리, SQL 방어 로직 개선
  - 고객 피드백을 기능 단위 PR로 분해해 75개 authored PR 중 72개를 병합
- 이력서 문장: 제조 데이터 분석 서비스의 CPVR/APQR 리포트 기능을 개발하고, LIMS 매핑·차트·필터·다운로드·인쇄와 오류 대응을 포함한 75개 PR로 기능을 납품했습니다.
- 근거: [PR #264](https://github.com/langcodestartup/CelltrionPowerBIWebApp/pull/264), [PR #245](https://github.com/langcodestartup/CelltrionPowerBIWebApp/pull/245), [PR #113](https://github.com/langcodestartup/CelltrionPowerBIWebApp/pull/113)

### langcodestartup/CelltrionPowerBIFunction

- 역할: 제조 데이터 업무 로직 및 서버리스 백엔드 개발자
- 최신 확인 활동: 2023-04-07 (GitHub PR/commit 기준)
- 기여:
  - LIMS 매핑 CRUD와 미부착 판정·대상 조회·변경 이력 기능 구현
  - MSP/캠페인·수율 변수 CRUD·Ad Hoc Calculation 로직 개발
  - 17개 authored PR을 모두 병합
- 이력서 문장: 제조 데이터 도메인의 LIMS 매핑·캠페인·수율 계산 서버리스 기능을 구현하고 17개 병합 PR로 업무 로직을 제품에 반영했습니다.
- 근거: [PR #33](https://github.com/langcodestartup/CelltrionPowerBIFunction/pull/33), [PR #19](https://github.com/langcodestartup/CelltrionPowerBIFunction/pull/19), [PR #20](https://github.com/langcodestartup/CelltrionPowerBIFunction/pull/20)

### langcodestartup/IdentityExample

- 역할: ASP.NET Identity 인증 예제 개발자
- 최신 확인 활동: 2023-02-15 (GitHub PR/commit 기준)
- 기여:
  - ASP.NET Identity 기반 프로젝트 초기화
  - Register 페이지 scaffolding 구현
- 이력서 문장: ASP.NET Identity 기반 인증 예제의 프로젝트 초기 구조와 회원가입 페이지 scaffolding을 구현했습니다.
- 근거: [commit: Register Page](https://github.com/langcodestartup/IdentityExample/commit/3440b532b393aca9e9e9432c498738f8cbe59642)

### langcodestartup/ibkPoC

- 역할: 금융권 PoC 채팅 UI·피드백 기능 개발자
- 최신 확인 활동: 2022-12-08 (GitHub PR/commit 기준)
- 기여:
  - 채팅 입력창 자동 높이 조정
  - 피드 정렬과 테스트 피드백 요구사항 반영
- 이력서 문장: 금융권 AI PoC에서 채팅 입력 UX와 피드 정렬·피드백 요구사항을 반영했습니다.
- 근거: [commit: chat input auto height](https://github.com/langcodestartup/ibkPoC/commit/1f9b15c18b7fc6f768bb4f6b546d717a87c4fa5b)

### langcodestartup/Langcode.CXP

- 역할: CXP 플랫폼 공통 모델·도메인 기능 개발자
- 최신 확인 활동: 2022-11-15 (GitHub PR/commit 기준)
- 기여:
  - 고객·파트너 정보 CRUD 구현
  - 공통 모델·필드·타입 정비
  - Cosmos bulk service 추가 및 플랫폼 기능 확장
- 이력서 문장: CXP 플랫폼의 공통 도메인 모델과 고객·파트너 CRUD를 구현하고 Cosmos bulk service를 추가했습니다.
- 근거: [PR #20](https://github.com/langcodestartup/Langcode.CXP/pull/20), [PR #13](https://github.com/langcodestartup/Langcode.CXP/pull/13), [PR #12](https://github.com/langcodestartup/Langcode.CXP/pull/12)

### langcodestartup/Langcode.CarbonDesign

- 역할: Carbon Design System UI 개발자
- 최신 확인 활동: 2022-03-02 (GitHub PR/commit 기준)
- 기여:
  - Content switcher 컴포넌트 구현
  - 1개 병합 PR 확인
- 이력서 문장: Carbon Design System 기반 UI에서 content switcher 컴포넌트를 구현했습니다.
- 근거: [PR #4](https://github.com/langcodestartup/Langcode.CarbonDesign/pull/4)

### langcodestartup/LangcodeApp

- 역할: CXP 애플리케이션 기능 개발자
- 최신 확인 활동: 2021-12-10 (GitHub PR/commit 기준)
- 기여:
  - Guide QnA CRUD와 Reference CRUD 기능 구현
  - Guide 화면 버그 수정과 storyboard 기능 개발
  - 34개 authored PR이 관찰됨
- 이력서 문장: CXP 애플리케이션의 Guide·Reference 업무 기능과 CRUD 흐름을 구현하고 UI/스토리보드 오류를 수정했습니다.
- 근거: [PR #44](https://github.com/langcodestartup/LangcodeApp/pull/44), [PR #43](https://github.com/langcodestartup/LangcodeApp/pull/43), [PR #39](https://github.com/langcodestartup/LangcodeApp/pull/39)



### 기타 직접 commit 근거 프로젝트

| 프로젝트 | 역할·기여를 안전하게 표현하는 문장 | 근거 |
|---|---|---|
| langcodestartup/SPinAutoUpload | 자동 업로드 기능 개발 및 유지보수에 참여. 세부 도메인 역할은 추가 diff 확인 후 확정 | [commit](https://github.com/langcodestartup/SPinAutoUpload/commit/38ad70978e67dd84793fde2c2416388828604b81) |
| langcodestartup/TestProvisioning | 프로비저닝 테스트/구성 작업에 직접 commit으로 참여 | [commit](https://github.com/langcodestartup/TestProvisioning/commit/d4d58560491cb6e16ec777a9d8e9581e6d477483) |
| langcodestartup/ToyProjects | 예제·토이 프로젝트 구현에 직접 commit으로 참여 | [commit](https://github.com/langcodestartup/ToyProjects/commit/a4706da807d04239e6dee44aca4c298f61485515) |
| langcodestartup/SamsungSHI | 브랜치/배포 기준 정리 commit이 확인되며, 기능 역할은 diff 확인 후 확정 | [commit](https://github.com/langcodestartup/SamsungSHI/commit/d4d58560491cb6e16ec777a9d8e9581e6d477483) |
| langcodestartup/KT-Gennie, KoreaSeven.V2 | KnowledgeBase Factory·DI·NuGet·Form Recognizer 관련 구현 commit이 관찰됨 | [KT-Gennie commit](https://github.com/langcodestartup/KT-Gennie/commit/b561d8974deefd082365fcf9e773c2f022f73f04) |
| langcodestartup/KotraCXP | 지식 기반·문서 인식 서비스의 공통 모델과 Azure Form Recognizer 연동 | [commit](https://github.com/langcodestartup/KotraCXP/commit/d4a88ff5dff8cc5c29a60ebcc093141976ef1a03) |
| langcodestartup/PollyExamples | Polly 예제 프로젝트 초기 구조와 동작 확인 | [commit](https://github.com/langcodestartup/PollyExamples/commit/cf72c529d4dde6790c53cb119681dfcbac739107) |
| langcodestartup/NetmarblePoC | PoC 기능 브랜치/PR 구현에 참여 | [PR #1](https://github.com/langcodestartup/NetmarblePoC/pull/1) |

### 공통 branch 기준 commit만 확인된 프로젝트

아래 프로젝트는 동일한 “Netmarble master branch set” commit이 각 저장소에서 관찰된 경우입니다. 실제 기능 소유권이나 프로젝트 내 책임 범위는 이 기록만으로 확정할 수 없으므로, 이력서에는 “브랜치 기준 정리·코드 동기화에 참여” 수준으로만 기재하는 것이 안전합니다.

| 프로젝트 | 근거 기반 표현 |
|---|---|
| langcodestartup/KT | 브랜치 기준 정리·코드 동기화 commit에 참여 |
| langcodestartup/KoreaSeven | 브랜치 기준 정리·코드 동기화 commit에 참여 |
| langcodestartup/KoreaSevenV2 | 브랜치 기준 정리·코드 동기화 commit에 참여 |
| langcodestartup/LgjCenter | 브랜치 기준 정리·코드 동기화 commit에 참여 |
| langcodestartup/jiran | 브랜치 기준 정리·코드 동기화 commit에 참여 |
| langcodestartup/Jiran-delete | 브랜치 기준 정리·코드 동기화 commit에 참여 |
| langcodestartup/KBLife | 브랜치 기준 정리·코드 동기화 commit에 참여 |
| langcodestartup/Kicox | 브랜치 기준 정리·코드 동기화 commit에 참여 |
| langcodestartup/KtEnter | 브랜치 기준 정리·코드 동기화 commit에 참여 |
| langcodestartup/KtFinance | 브랜치 기준 정리·코드 동기화 commit에 참여 |
| langcodestartup/KtSCM | 브랜치 기준 정리·코드 동기화 commit에 참여 |
| langcodestartup/KtSCMpoc | 브랜치 기준 정리·코드 동기화 commit에 참여 |
| langcodestartup/Nhtest | 브랜치 기준 정리·코드 동기화 commit에 참여 |

## 개인 저장소 직접 기여 근거

아래 항목은 private personal repository에서 직접 commit이 확인됐지만, 현재 감사 자료만으로는 기능 범위를 이력서 문장으로 강하게 확정하기 어렵습니다. README와 전체 diff를 추가 확인한 뒤 사용하십시오.

| 프로젝트 | 이력서에 안전한 표현 | 근거 |
|---|---|---|
| kimgooneya/MusicJail | 개인 프로젝트 코드 구현 및 유지보수 | [commit](https://github.com/kimgooneya/MusicJail/commit/a42eaeda9cb840997d5c7bf062b8ff705ab9674c) |
| kimgooneya/JwtWebApiTutorial | JWT 기반 Web API 학습·구현 프로젝트 | [commit](https://github.com/kimgooneya/JwtWebApiTutorial/commit/83b3b01e506537a8d9b84ae7fe581bc3853434b8) |
| kimgooneya/FrontEndTest | 프론트엔드 테스트·구현 프로젝트 | [commit](https://github.com/kimgooneya/FrontEndTest/commit/34258139c2587d2cb453e5f369f625c5e1800810) |
| kimgooneya/TESTGIT | Git/개발 실험 프로젝트 구현 | [commit](https://github.com/kimgooneya/TESTGIT/commit/9b1028eaf260e08d3ac93f302706d4bc4c073530) |
| kimgooneya/BlazorTester | Blazor 테스트·구현 프로젝트 | [commit](https://github.com/kimgooneya/BlazorTester/commit/8c657ed35b315ae3a8ecab058f82e3fa71ae9ef9) |
| kimgooneya/fastapi-tutorial | FastAPI 학습·API 구현 프로젝트 | [commit](https://github.com/kimgooneya/fastapi-tutorial/commit/ae994c65880d27fdadb979398b18897310517436) |
| kimgooneya/react-study | React 학습·구현 프로젝트 | [commit](https://github.com/kimgooneya/react-study/commit/2fe82f424c58f18174abc6100e9ddeba35077342) |
| kimgooneya/almott | 개인 서비스 기능 개발·병합 작업 | [commit](https://github.com/kimgooneya/almott/commit/2b21904e4994d0a2f24184edf90c6ed67c44704e) |
| kimgooneya/Draftly | 개인 서비스 기능 개발·유지보수 | [commit](https://github.com/kimgooneya/Draftly/commit/410ddc3adef02acc5b6ffa895703bedab931dcfc) |
| kimgooneya/sy-newyork-trip | 개인 프로젝트 기능 구현 | [commit](https://github.com/kimgooneya/sy-newyork-trip/commit/ce993e0f06a1b5b4f282542e70d1290bd663ff6) |
| kimgooneya/DotNetTest, kimgooneya/GameStore | langcode-shkim commit metadata가 확인되며, kimgooneya와 동일인으로 단정하지 않음 | [DotNetTest commit](https://github.com/kimgooneya/DotNetTest/commit/e44818712d977c8d4a84e283dd9039ea528365b5), [GameStore commit](https://github.com/kimgooneya/GameStore/commit/c91efa1904c2e0570529beb9770fc35ce883d3b8) |

## 동일인 여부가 확인되지 않은 shkim 활동

다음은 GitHub ID 1094548의 별도 shkim 계정에서 확인된 활동입니다. 본인 계정임을 추가 확인하기 전에는 kimgooneya 경력으로 합산하지 마십시오.

- [fundamental-react #1](https://github.com/shkim/fundamental-react/pull/1), [#2](https://github.com/shkim/fundamental-react/pull/2)
- [XingSharp #1](https://github.com/shkim/XingSharp/pull/1)
- [techan #22](https://github.com/sdcoffey/techan/pull/22)
- [hero #18](https://github.com/yann-shi/hero/pull/18)

## 전체 프로젝트 상태 매트릭스

- 근거 확인: 직접 PR·commit 근거가 있어 역할 문장을 작성할 수 있음
- 현재 조사에서 직접 근거 미확인: 조사 범위에서 매칭 증거가 반환되지 않았거나 검색 제한으로 확정할 수 없음
- 접근 불가: 404로 반환되어 기여 여부를 판단할 수 없음
- 이 표는 전체 조사 대상 프로젝트를 포함합니다. “근거 미확인”은 “기여하지 않음”을 의미하지 않습니다.
- I-R 구간의 원자료는 저장소명만 기록된 행이 있어, 소유자가 생략된 이름은 langcodestartup 저장소로 해석합니다.

| 프로젝트 | 상태 | 이력서 사용 판단 |
|---|---|---|
| chwonseok/ChartJsLibrary | 접근 불가 | 추가 권한 확인 필요 |
| differz-inc/langcode | 접근 불가 | 추가 권한 확인 필요 |
| ibkPoC | 근거 확인 | 역할 문장 작성 가능 |
| IntegrationFunction | 현재 조사에서 직접 근거 미확인 | 이력서에 임의 기재하지 않음 |
| jiran | 근거 확인 | 역할 문장 작성 가능 |
| Jiran-delete | 근거 확인 | 역할 문장 작성 가능 |
| KateMultiAgent | 현재 조사에서 직접 근거 미확인 | 이력서에 임의 기재하지 않음 |
| KbhcBot | 현재 조사에서 직접 근거 미확인 | 이력서에 임의 기재하지 않음 |
| KbhcCosmosEngine | 근거 확인 | 역할 문장 작성 가능 |
| KbhcDbSyncFunction | 현재 조사에서 직접 근거 미확인 | 이력서에 임의 기재하지 않음 |
| KBLife | 근거 확인 | 역할 문장 작성 가능 |
| keycloak-react | 근거 확인 | 역할 문장 작성 가능 |
| Kicox | 근거 확인 | 역할 문장 작성 가능 |
| kimgooneya/almott | 근거 확인 | 개인 서비스 기능 개발·병합 근거는 있으나 세부 역할 추가 확인 필요 |
| kimgooneya/BlazorTester | 근거 확인 | 역할 문장 작성 가능 |
| kimgooneya/DotNetTest | 관련 identity 근거 확인 | kimgooneya와 동일인으로 합산하지 않음 |
| kimgooneya/Draftly | 근거 확인 | 역할 문장 작성 가능 |
| kimgooneya/fastapi-tutorial | 근거 확인 | 역할 문장 작성 가능 |
| kimgooneya/FrontEndTest | 근거 확인 | 역할 문장 작성 가능 |
| kimgooneya/GameStore | 관련 identity 근거 확인 | kimgooneya와 동일인으로 합산하지 않음 |
| kimgooneya/JwtWebApiTutorial | 근거 확인 | 역할 문장 작성 가능 |
| kimgooneya/MusicJail | 근거 확인 | 역할 문장 작성 가능 |
| kimgooneya/react-study | 근거 확인 | 역할 문장 작성 가능 |
| kimgooneya/sy-newyork-trip | 근거 확인 | 역할 문장 작성 가능 |
| kimgooneya/TESTGIT | 근거 확인 | 역할 문장 작성 가능 |
| kimgooneya/v0-instagram-dm-chat | 현재 조사에서 직접 근거 미확인 | 이력서에 임의 기재하지 않음 |
| KoreaSeven | 근거 확인 | 역할 문장 작성 가능 |
| KoreaSeven.V2 | 근거 확인 | 역할 문장 작성 가능 |
| KoreaSevenV2 | 근거 확인 | 역할 문장 작성 가능 |
| kotra-crawler | 현재 조사에서 직접 근거 미확인 | 이력서에 임의 기재하지 않음 |
| KotraAPIAdmin | 현재 조사에서 직접 근거 미확인 | 이력서에 임의 기재하지 않음 |
| KotraCrawling | 현재 조사에서 직접 근거 미확인 | 이력서에 임의 기재하지 않음 |
| KotraCurationAPI | 현재 조사에서 직접 근거 미확인 | 이력서에 임의 기재하지 않음 |
| KotraCXP | 근거 확인 | 역할 문장 작성 가능 |
| kotraPoC | 근거 확인 | 역할 문장 작성 가능 |
| Kpartners.CXP | 현재 조사에서 직접 근거 미확인 | 이력서에 임의 기재하지 않음 |
| KT | 근거 확인 | 역할 문장 작성 가능 |
| kt-ai-safety | 현재 조사에서 직접 근거 미확인 | 이력서에 임의 기재하지 않음 |
| KT-Gennie | 근거 확인 | 역할 문장 작성 가능 |
| KT-Global-Demo | 현재 조사에서 직접 근거 미확인 | 이력서에 임의 기재하지 않음 |
| KT-Global-Demo-Eng | 현재 조사에서 직접 근거 미확인 | 이력서에 임의 기재하지 않음 |
| kt-gsi | 근거 확인 | 역할 문장 작성 가능 |
| kt-webproxy-nginx | 현재 조사에서 직접 근거 미확인 | 이력서에 임의 기재하지 않음 |
| KT.V2 | 현재 조사에서 직접 근거 미확인 | 이력서에 임의 기재하지 않음 |
| KTCICDTest | 현재 조사에서 직접 근거 미확인 | 이력서에 임의 기재하지 않음 |
| KtEnter | 근거 확인 | 역할 문장 작성 가능 |
| KTExcelParse | 현재 조사에서 직접 근거 미확인 | 이력서에 임의 기재하지 않음 |
| KtFinance | 근거 확인 | 역할 문장 작성 가능 |
| KtSCM | 근거 확인 | 역할 문장 작성 가능 |
| KtSCMpoc | 근거 확인 | 역할 문장 작성 가능 |
| KTTeamsApp | 현재 조사에서 직접 근거 미확인 | 이력서에 임의 기재하지 않음 |
| KTTeamsApp.APIServer | 현재 조사에서 직접 근거 미확인 | 이력서에 임의 기재하지 않음 |
| kyobo-pre-mvp | 근거 확인 | 역할 문장 작성 가능 |
| KyoboPrePoC | 근거 확인 | 역할 문장 작성 가능 |
| KyoboPrePoC-Function | 근거 확인 | 역할 문장 작성 가능 |
| Landing.CXP.Personal | 현재 조사에서 직접 근거 미확인 | 이력서에 임의 기재하지 않음 |
| landing.publishing | 현재 조사에서 직접 근거 미확인 | 이력서에 임의 기재하지 않음 |
| LandingV3 | 현재 조사에서 직접 근거 미확인 | 이력서에 임의 기재하지 않음 |
| LandingV4 | 현재 조사에서 직접 근거 미확인 | 이력서에 임의 기재하지 않음 |
| langcode-ai-guidebook | 현재 조사에서 직접 근거 미확인 | 이력서에 임의 기재하지 않음 |
| Langcode.CarbonDesign | 근거 확인 | 역할 문장 작성 가능 |
| Langcode.CXP | 근거 확인 | 역할 문장 작성 가능 |
| langcode.cxp.back | 근거 확인 | 역할 문장 작성 가능 |
| langcode.cxp.erd | 현재 조사에서 직접 근거 미확인 | 이력서에 임의 기재하지 않음 |
| langcode.cxp.front | 근거 확인 | 역할 문장 작성 가능 |
| Langcode.CXP.K7 | 현재 조사에서 직접 근거 미확인 | 이력서에 임의 기재하지 않음 |
| Langcode.CXP.Publishing | 현재 조사에서 직접 근거 미확인 | 이력서에 임의 기재하지 않음 |
| Langcode.CXP.V2 | 근거 확인 | 역할 문장 작성 가능 |
| Langcode.CXP.V2.Demo | 현재 조사에서 직접 근거 미확인 | 이력서에 임의 기재하지 않음 |
| Langcode.CXP.v2.UI | 현재 조사에서 직접 근거 미확인 | 이력서에 임의 기재하지 않음 |
| Langcode.CXP.V2.Viva | 현재 조사에서 직접 근거 미확인 | 이력서에 임의 기재하지 않음 |
| langcode.landing.BE | 현재 조사에서 직접 근거 미확인 | 이력서에 임의 기재하지 않음 |
| langcode.landing.FE | 현재 조사에서 직접 근거 미확인 | 이력서에 임의 기재하지 않음 |
| Langcode.PoC.Alpha | 현재 조사에서 직접 근거 미확인 | 이력서에 임의 기재하지 않음 |
| Langcode.Teaser | 현재 조사에서 직접 근거 미확인 | 이력서에 임의 기재하지 않음 |
| LangcodeAlpha | 현재 조사에서 직접 근거 미확인 | 이력서에 임의 기재하지 않음 |
| LangcodeApp | 근거 확인 | 역할 문장 작성 가능 |
| LangcodeCarbon | 현재 조사에서 직접 근거 미확인 | 이력서에 임의 기재하지 않음 |
| LangcodeDemo | 현재 조사에서 직접 근거 미확인 | 이력서에 임의 기재하지 않음 |
| LangcodeLanding | 현재 조사에서 직접 근거 미확인 | 이력서에 임의 기재하지 않음 |
| LangcodeLangdingV2 | 현재 조사에서 직접 근거 미확인 | 이력서에 임의 기재하지 않음 |
| langcodestartup/AIChallenge | 현재 조사에서 직접 근거 미확인 | 이력서에 임의 기재하지 않음 |
| langcodestartup/anomaly-detector-quickstart | 현재 조사에서 직접 근거 미확인 | 이력서에 임의 기재하지 않음 |
| langcodestartup/authexample | 현재 조사에서 직접 근거 미확인 | 이력서에 임의 기재하지 않음 |
| langcodestartup/azureml-insiders | 현재 조사에서 직접 근거 미확인 | 이력서에 임의 기재하지 않음 |
| langcodestartup/AzurePIITest | 현재 조사에서 직접 근거 미확인 | 이력서에 임의 기재하지 않음 |
| langcodestartup/AzureServiceBusBotRelay | 현재 조사에서 직접 근거 미확인 | 이력서에 임의 기재하지 않음 |
| langcodestartup/B4PLAY | 현재 조사에서 직접 근거 미확인 | 이력서에 임의 기재하지 않음 |
| langcodestartup/b4play-poc | 현재 조사에서 직접 근거 미확인 | 이력서에 임의 기재하지 않음 |
| langcodestartup/Beyondhoneycom | 근거 확인 | 역할 문장 작성 가능 |
| langcodestartup/BeyondHoneyComData | 현재 조사에서 직접 근거 미확인 | 이력서에 임의 기재하지 않음 |
| langcodestartup/BlazorAuthenticationTutorial | 현재 조사에서 직접 근거 미확인 | 이력서에 임의 기재하지 않음 |
| langcodestartup/BlazorFileUploadTest | 현재 조사에서 직접 근거 미확인 | 이력서에 임의 기재하지 않음 |
| langcodestartup/BlazorTester | 현재 조사에서 직접 근거 미확인 | 이력서에 임의 기재하지 않음 |
| langcodestartup/BlazorWithCarbon | 현재 조사에서 직접 근거 미확인 | 이력서에 임의 기재하지 않음 |
| langcodestartup/Carbon11Test | 근거 확인 | 역할 문장 작성 가능 |
| langcodestartup/CelltrionPowerBIFunction | 근거 확인 | 역할 문장 작성 가능 |
| langcodestartup/CelltrionPowerBIWebApp | 근거 확인 | 역할 문장 작성 가능 |
| langcodestartup/CelltrionStastics | 현재 조사에서 직접 근거 미확인 | 이력서에 임의 기재하지 않음 |
| langcodestartup/CES | 현재 조사에서 직접 근거 미확인 | 이력서에 임의 기재하지 않음 |
| langcodestartup/ChanelPoC | 현재 조사에서 직접 근거 미확인 | 이력서에 임의 기재하지 않음 |
| langcodestartup/ChanelPoCApp | 현재 조사에서 직접 근거 미확인 | 이력서에 임의 기재하지 않음 |
| langcodestartup/Changshin | 현재 조사에서 직접 근거 미확인 | 이력서에 임의 기재하지 않음 |
| langcodestartup/ChangshinV2 | 현재 조사에서 직접 근거 미확인 | 이력서에 임의 기재하지 않음 |
| langcodestartup/ChangshinV3 | 현재 조사에서 직접 근거 미확인 | 이력서에 임의 기재하지 않음 |
| langcodestartup/ChatbotMockup | 현재 조사에서 직접 근거 미확인 | 이력서에 임의 기재하지 않음 |
| langcodestartup/ChopSticksPocApi | 현재 조사에서 직접 근거 미확인 | 이력서에 임의 기재하지 않음 |
| langcodestartup/CommonModelSample | 현재 조사에서 직접 근거 미확인 | 이력서에 임의 기재하지 않음 |
| langcodestartup/ConferenceRoomScheduler | 현재 조사에서 직접 근거 미확인 | 이력서에 임의 기재하지 않음 |
| langcodestartup/CookieServiceProvider | 현재 조사에서 직접 근거 미확인 | 이력서에 임의 기재하지 않음 |
| langcodestartup/CosmosGettingStarted | 현재 조사에서 직접 근거 미확인 | 이력서에 임의 기재하지 않음 |
| langcodestartup/CTKCLIP | 현재 조사에서 직접 근거 미확인 | 이력서에 임의 기재하지 않음 |
| langcodestartup/CXP_ARM_Template | 현재 조사에서 직접 근거 미확인 | 이력서에 임의 기재하지 않음 |
| langcodestartup/cxp_telemetry_receiver | 현재 조사에서 직접 근거 미확인 | 이력서에 임의 기재하지 않음 |
| langcodestartup/cxp-be | 현재 조사에서 직접 근거 미확인 | 이력서에 임의 기재하지 않음 |
| langcodestartup/cxp-document | 현재 조사에서 직접 근거 미확인 | 이력서에 임의 기재하지 않음 |
| langcodestartup/CXP-ERD | 현재 조사에서 직접 근거 미확인 | 이력서에 임의 기재하지 않음 |
| langcodestartup/cxp-light-fe | 근거 확인 | 역할 문장 작성 가능 |
| langcodestartup/cxp-onpremise-front | 현재 조사에서 직접 근거 미확인 | 이력서에 임의 기재하지 않음 |
| langcodestartup/cxp-search | 현재 조사에서 직접 근거 미확인 | 이력서에 임의 기재하지 않음 |
| langcodestartup/cxp-v3-mono | 현재 조사에서 직접 근거 미확인 | 이력서에 임의 기재하지 않음 |
| langcodestartup/CXP.Global | 현재 조사에서 직접 근거 미확인 | 이력서에 임의 기재하지 않음 |
| langcodestartup/CXP.LGUplus | 현재 조사에서 직접 근거 미확인 | 이력서에 임의 기재하지 않음 |
| langcodestartup/CXPDemo.v2 | 현재 조사에서 직접 근거 미확인 | 이력서에 임의 기재하지 않음 |
| langcodestartup/CXPDevTest | 현재 조사에서 직접 근거 미확인 | 이력서에 임의 기재하지 않음 |
| langcodestartup/DanalPoC | 현재 조사에서 직접 근거 미확인 | 이력서에 임의 기재하지 않음 |
| langcodestartup/Datavoucher2023 | 현재 조사에서 직접 근거 미확인 | 이력서에 임의 기재하지 않음 |
| langcodestartup/dcai-mock | 현재 조사에서 직접 근거 미확인 | 이력서에 임의 기재하지 않음 |
| langcodestartup/dcai-onpremise | 근거 확인 | 역할 문장 작성 가능 |
| langcodestartup/DotNetTest | 현재 조사에서 직접 근거 미확인 | 이력서에 임의 기재하지 않음 |
| langcodestartup/ECMdemo | 현재 조사에서 직접 근거 미확인 | 이력서에 임의 기재하지 않음 |
| langcodestartup/Emart24 | 현재 조사에서 직접 근거 미확인 | 이력서에 임의 기재하지 않음 |
| langcodestartup/ExampleApp | 현재 조사에서 직접 근거 미확인 | 이력서에 임의 기재하지 않음 |
| langcodestartup/ExampleUploadToBlob | 현재 조사에서 직접 근거 미확인 | 이력서에 임의 기재하지 않음 |
| langcodestartup/excel-parser | 근거 확인 | 역할 문장 작성 가능 |
| langcodestartup/FFmpegFunction | 현재 조사에서 직접 근거 미확인 | 이력서에 임의 기재하지 않음 |
| langcodestartup/FunctionDemo | 현재 조사에서 직접 근거 미확인 | 이력서에 임의 기재하지 않음 |
| langcodestartup/GennieTest | 현재 조사에서 직접 근거 미확인 | 이력서에 임의 기재하지 않음 |
| langcodestartup/goodneighbors-poc | 현재 조사에서 직접 근거 미확인 | 이력서에 임의 기재하지 않음 |
| langcodestartup/GSchargev.V2 | 현재 조사에서 직접 근거 미확인 | 이력서에 임의 기재하지 않음 |
| langcodestartup/GSITestRepo | 현재 조사에서 직접 근거 미확인 | 이력서에 임의 기재하지 않음 |
| langcodestartup/HaedreamCrawling | 현재 조사에서 직접 근거 미확인 | 이력서에 임의 기재하지 않음 |
| langcodestartup/HanterGlobal | 현재 조사에서 직접 근거 미확인 | 이력서에 임의 기재하지 않음 |
| langcodestartup/harness-experiment | 현재 조사에서 직접 근거 미확인 | 이력서에 임의 기재하지 않음 |
| langcodestartup/Hmall | 현재 조사에서 직접 근거 미확인 | 이력서에 임의 기재하지 않음 |
| langcodestartup/HWOC | 현재 조사에서 직접 근거 미확인 | 이력서에 임의 기재하지 않음 |
| langcodestartup/SamsungCnt | 현재 조사에서 직접 근거 미확인 | 이력서에 임의 기재하지 않음 |
| langcodestartup/SamsungSHI | 근거 확인 | 역할 문장 작성 가능 |
| langcodestartup/SamsungSHI_Delete | 현재 조사에서 직접 근거 미확인 | 이력서에 임의 기재하지 않음 |
| langcodestartup/SamsungSHI.V2 | 현재 조사에서 직접 근거 미확인 | 이력서에 임의 기재하지 않음 |
| langcodestartup/SamsungSHI.V2.2025 | 현재 조사에서 직접 근거 미확인 | 이력서에 임의 기재하지 않음 |
| langcodestartup/Seegene.CXP | 현재 조사에서 직접 근거 미확인 | 이력서에 임의 기재하지 않음 |
| langcodestartup/Seegene.V2 | 근거 확인 | 역할 문장 작성 가능 |
| langcodestartup/seegeneAzureFunction | 현재 조사에서 직접 근거 미확인 | 이력서에 임의 기재하지 않음 |
| langcodestartup/SemanticKernel-ToyProject | 현재 조사에서 직접 근거 미확인 | 이력서에 임의 기재하지 않음 |
| langcodestartup/ServiceBusRelayUtil | 현재 조사에서 직접 근거 미확인 | 이력서에 임의 기재하지 않음 |
| langcodestartup/SGSKorea | 현재 조사에서 직접 근거 미확인 | 이력서에 임의 기재하지 않음 |
| langcodestartup/shi-legal | 현재 조사에서 직접 근거 미확인 | 이력서에 임의 기재하지 않음 |
| langcodestartup/shiazureFunction | 현재 조사에서 직접 근거 미확인 | 이력서에 임의 기재하지 않음 |
| langcodestartup/ShinhanPoC | 현재 조사에서 직접 근거 미확인 | 이력서에 임의 기재하지 않음 |
| langcodestartup/skax-pub | 현재 조사에서 직접 근거 미확인 | 이력서에 임의 기재하지 않음 |
| langcodestartup/SkinCafeineDemo | 현재 조사에서 직접 근거 미확인 | 이력서에 임의 기재하지 않음 |
| langcodestartup/SlackTest | 현재 조사에서 직접 근거 미확인 | 이력서에 임의 기재하지 않음 |
| langcodestartup/smtech-oracle-mcp-demo | 현재 조사에서 직접 근거 미확인 | 이력서에 임의 기재하지 않음 |
| langcodestartup/SPinAutoUpload | 근거 확인 | 역할 문장 작성 가능 |
| langcodestartup/SpinInvoice | 근거 확인 | 역할 문장 작성 가능 |
| langcodestartup/TeamsAppTest | 현재 조사에서 직접 근거 미확인 | 이력서에 임의 기재하지 않음 |
| langcodestartup/telemetry_receive | 현재 조사에서 직접 근거 미확인 | 이력서에 임의 기재하지 않음 |
| langcodestartup/TensorflowInsight | 현재 조사에서 직접 근거 미확인 | 이력서에 임의 기재하지 않음 |
| langcodestartup/TestProvisioning | 근거 확인 | 역할 문장 작성 가능 |
| langcodestartup/ToyProjects | 근거 확인 | 역할 문장 작성 가능 |
| langcodestartup/VisualCampTechDemo | 현재 조사에서 직접 근거 미확인 | 이력서에 임의 기재하지 않음 |
| langcodestartup/VivaTech2025 | 현재 조사에서 직접 근거 미확인 | 이력서에 임의 기재하지 않음 |
| langcodestartup/WellStory | 현재 조사에서 직접 근거 미확인 | 이력서에 임의 기재하지 않음 |
| langcodestartup/WellstoryPocTest | 현재 조사에서 직접 근거 미확인 | 이력서에 임의 기재하지 않음 |
| langcodestartup/WiznetCsvGenerator | 현재 조사에서 직접 근거 미확인 | 이력서에 임의 기재하지 않음 |
| langcodestartup/WorkflowTest | 현재 조사에서 직접 근거 미확인 | 이력서에 임의 기재하지 않음 |
| langcodestartup/WsFederationApp | 현재 조사에서 직접 근거 미확인 | 이력서에 임의 기재하지 않음 |
| langcodestartup/ynu-imgaug | 현재 조사에서 직접 근거 미확인 | 이력서에 임의 기재하지 않음 |
| LangcodeWork | 현재 조사에서 직접 근거 미확인 | 이력서에 임의 기재하지 않음 |
| LangcodeWorkSaaS | 현재 조사에서 직접 근거 미확인 | 이력서에 임의 기재하지 않음 |
| LatentDirichletAllocation | 현재 조사에서 직접 근거 미확인 | 이력서에 임의 기재하지 않음 |
| LCDocumentParser | 근거 확인 | 역할 문장 작성 가능 |
| LDAP_ConsoleApp_Exam | 현재 조사에서 직접 근거 미확인 | 이력서에 임의 기재하지 않음 |
| LDAP_Exam | 현재 조사에서 직접 근거 미확인 | 이력서에 임의 기재하지 않음 |
| lfcxp-demo-console | 현재 조사에서 직접 근거 미확인 | 이력서에 임의 기재하지 않음 |
| lfnetworks-cxp-demo | 현재 조사에서 직접 근거 미확인 | 이력서에 임의 기재하지 않음 |
| LGE-CS-PoC | 현재 조사에서 직접 근거 미확인 | 이력서에 임의 기재하지 않음 |
| LgjCenter | 근거 확인 | 역할 문장 작성 가능 |
| LINQexample | 현재 조사에서 직접 근거 미확인 | 이력서에 임의 기재하지 않음 |
| LInqExampleWithTest | 현재 조사에서 직접 근거 미확인 | 이력서에 임의 기재하지 않음 |
| LotteMembers | 현재 조사에서 직접 근거 미확인 | 이력서에 임의 기재하지 않음 |
| LSElectric | 현재 조사에서 직접 근거 미확인 | 이력서에 임의 기재하지 않음 |
| MBition | 현재 조사에서 직접 근거 미확인 | 이력서에 임의 기재하지 않음 |
| MBitionTopic | 현재 조사에서 직접 근거 미확인 | 이력서에 임의 기재하지 않음 |
| ML.NET_Test | 현재 조사에서 직접 근거 미확인 | 이력서에 임의 기재하지 않음 |
| mline-poc | 현재 조사에서 직접 근거 미확인 | 이력서에 임의 기재하지 않음 |
| MLNetKeywordExtraction | 현재 조사에서 직접 근거 미확인 | 이력서에 임의 기재하지 않음 |
| MongoDbTest | 현재 조사에서 직접 근거 미확인 | 이력서에 임의 기재하지 않음 |
| Muin-Crawling | 현재 조사에서 직접 근거 미확인 | 이력서에 임의 기재하지 않음 |
| Muin-Hotel | 현재 조사에서 직접 근거 미확인 | 이력서에 임의 기재하지 않음 |
| NetmarblePoC | 근거 확인 | 역할 문장 작성 가능 |
| NHAML.V2 | 현재 조사에서 직접 근거 미확인 | 이력서에 임의 기재하지 않음 |
| NHBank | 근거 확인 | 역할 문장 작성 가능 |
| NHBank_Chat | 현재 조사에서 직접 근거 미확인 | 이력서에 임의 기재하지 않음 |
| NHRS | 근거 확인 | 역할 문장 작성 가능 |
| Nhtest | 근거 확인 | 역할 문장 작성 가능 |
| nol_azfunc | 현재 조사에서 직접 근거 미확인 | 이력서에 임의 기재하지 않음 |
| Nol-Universe | 현재 조사에서 직접 근거 미확인 | 이력서에 임의 기재하지 않음 |
| NolUniverseClientSide | 현재 조사에서 직접 근거 미확인 | 이력서에 임의 기재하지 않음 |
| NotionAPI | 현재 조사에서 직접 근거 미확인 | 이력서에 임의 기재하지 않음 |
| OC_Console | 현재 조사에서 직접 근거 미확인 | 이력서에 임의 기재하지 않음 |
| ourhome_demo | 현재 조사에서 직접 근거 미확인 | 이력서에 임의 기재하지 않음 |
| PairWork | 현재 조사에서 직접 근거 미확인 | 이력서에 임의 기재하지 않음 |
| PaperPop | 근거 확인 | 역할 문장 작성 가능 |
| PocMBK | 현재 조사에서 직접 근거 미확인 | 이력서에 임의 기재하지 않음 |
| PollyExamples | 근거 확인 | 역할 문장 작성 가능 |
| PopperTest | 현재 조사에서 직접 근거 미확인 | 이력서에 임의 기재하지 않음 |
| PoscoDX | 현재 조사에서 직접 근거 미확인 | 이력서에 임의 기재하지 않음 |
| PremierPartnersPoC | 현재 조사에서 직접 근거 미확인 | 이력서에 임의 기재하지 않음 |
| PublicRoomV1 | 현재 조사에서 직접 근거 미확인 | 이력서에 임의 기재하지 않음 |
| Pumex | 현재 조사에서 직접 근거 미확인 | 이력서에 임의 기재하지 않음 |
| PyeongsaengCoding/LInqExampleWithTest | 현재 조사에서 직접 근거 미확인 | 이력서에 임의 기재하지 않음 |
| PythonGAST | 현재 조사에서 직접 근거 미확인 | 이력서에 임의 기재하지 않음 |
| RAG-Evaluation | 현재 조사에서 직접 근거 미확인 | 이력서에 임의 기재하지 않음 |
| react-poc | 현재 조사에서 직접 근거 미확인 | 이력서에 임의 기재하지 않음 |
| wezenhealthcare/wezen-rfid-scanner | 근거 확인 | 역할 문장 작성 가능 |

## 이력서 작성 시 권장 원칙

1. 프로젝트명보다 역할과 결과를 먼저 씁니다. 예: “CXP 프론트엔드 개발”처럼 직무를 앞에 둡니다.
2. PR 수는 보조 지표로만 사용하고, 기능·문제·개선 결과를 함께 씁니다.
3. “주도”, “설계”, “아키텍처 오너” 같은 표현은 전체 diff와 책임 범위를 확인한 뒤 사용합니다.
4. 검색 결과가 하한인 프로젝트는 “최소 N개” 또는 “N개 관찰”이라고 씁니다.
5. 고객사와 private 저장소는 공개 가능한 범위를 먼저 확인하고, 필요하면 “금융권 AI 서비스”, “제조 데이터 플랫폼”처럼 익명화합니다.
6. 상세 원자료는 [전체 GitHub 기여 감사 보고서](./GITHUB_CONTRIBUTION_AUDIT.md)에서 확인합니다.
