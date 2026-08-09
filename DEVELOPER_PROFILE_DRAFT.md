# 김수현 개발자 이력 소개서 초안

> 보관용 초안입니다. 아래의 과거 PR·commit 수치와 BFF/SGAL 표현은 현재 공개 이력서의 근거가 아닙니다. 최신 code-grounded 문장은 clone 코드·테스트·배포 설정을 직접 확인한 `resume/CODE_LEVEL_PROJECT_AUDIT.md`와 `resume/developer-resume.html`을 기준으로 사용합니다.

- 작성 기준일: 2026-08-04
- 문서 성격: GitHub 프로젝트 기여 조사와 사용자 확인 경력을 바탕으로 작성한 개발자 소개서 초안
- 권장 용도: 이력서 상단 소개, 경력기술서 서문, 포트폴리오 프로필

## 한 줄 소개

Text-to-SQL DAG 아키텍처와 AI·데이터 서비스 백엔드를 중심으로, C#/.NET 및 TypeScript/React 기반의 B2B 서비스 설계·구현·운영 안정화를 수행해 온 개발자입니다.

## 개발자 소개

김수현은 고객사 PoC와 상용 B2B 서비스에서 AI 질의, LLM 연동, 문서·Excel 데이터 처리, 인증·Identity, 업무 도메인 기능을 개발해 왔습니다. 특히 `kt-gsi`에서는 Text-to-SQL 처리 흐름을 DAG 구조로 설계하고 핵심 오케스트레이션 역할을 수행했으며, secrets 관리와 cloud/keyless 전환, SQL 오류 대응까지 연결해 AI 질의 서비스의 실행 기반을 정비했습니다.

또한 금융권 AI 서비스의 Azure OpenAI 운영 안정화와 SDK 마이그레이션, NHBank·SK AX 프로젝트의 Kubernetes 배포, 비정형 Excel 파서의 헤더·날짜·희소 데이터 처리, CXP 플랫폼의 인증·모델 관리·배포 구조, 온프레미스 AI 에이전트의 handoff·orchestration workflow를 수행했습니다. 기능을 단순히 추가하는 데 그치지 않고, 실제 운영에서 발생하는 오류와 고객 피드백을 PR 단위의 개선 작업으로 분해해 제품에 반영하는 데 강점이 있습니다.

## 핵심 전문성

- AI·데이터: Text-to-SQL, DAG orchestration, Azure OpenAI, LLM SDK migration, RAG/CXP, Cosmos DB, Azure Form Recognizer, 비정형 Excel·문서 파싱
- 백엔드: C#/.NET, ASP.NET Core, Azure Functions, REST API, DI, CRUD, 업무 도메인 모델링, FastAPI 개인 학습 프로젝트
- 프론트엔드: TypeScript, React, Next.js, Blazor, BFF, 인증 쿠키, 모델·프로바이더 관리 UI
- 인증·플랫폼: Kubernetes 배포, Keycloak, ASP.NET Identity, secrets import/export, cloud/keyless configuration, standalone 배포
- 개발 방식: PR 기반 기능 개발, 오류 재현·수정, 고객 피드백 반영, PoC-to-product iteration, 운영 안정화

## 대표 프로젝트 경험

### 1. kt-gsi | Text-to-SQL 질의 서비스

- 최신 확인 활동: 2026-07-18
- 역할: Text-to-SQL DAG 아키텍처 핵심 설계 및 AI 검색·질의 서비스 백엔드 개발
- 주요 기여:
  - Text-to-SQL 처리 흐름을 DAG 구조로 설계하고 핵심 오케스트레이션 담당
  - secrets import/export와 Azure 리소스 기반 설정 경계 정리
  - 로컬 DB 의존성을 제거하고 cloud/keyless 기준으로 전환
  - 날짜 타입 오류 사전 차단·재시도와 상품 조회 조건 개선
- 성과: authored PR 9개 전부 병합
- 이력서 표현: `Text-to-SQL DAG 아키텍처를 핵심적으로 설계하고, AI 질의 서비스의 설정·실행 흐름과 SQL 오류 대응을 개선했습니다.`

### 2. NHBank | 금융권 AI 백엔드

- 최신 확인 활동: 2026-06-20
- 역할: 금융권 AI 백엔드 및 LLM 통합 개발
- 주요 기여:
  - Azure OpenAI 토큰 사용량 안정화
  - LLM 환경변수화와 Azure.AI.OpenAI SDK v2 마이그레이션
  - Kubernetes 환경에 애플리케이션 배포
  - TCB 오류 수정, 서비스 최신화, 라이브 컨트롤러 기능 반영
- 성과: 기능 PR 5개 확인
- 이력서 표현: `금융 AI 서비스의 Azure OpenAI 운영 안정화와 SDK v2 마이그레이션을 수행하고, Kubernetes 환경 배포와 오류 수정까지 제품에 반영했습니다.`

### 3. excel-parser | 비정형 Excel 데이터 처리

- 최신 확인 활동: 2026-06-13
- 역할: 비정형 Excel 데이터 파싱·추출 라이브러리 개발
- 주요 기여:
  - 희소 시계열의 날짜 행과 빈 헤더 선행 키 컬럼 보존
  - 다단 헤더·병합 제목행·BIS Quarterly Series 헤더 탐지
  - notes 표면화와 date dtype 실패 시 중단 방지
- 성과: authored PR 12개 중 11개 병합
- 이력서 표현: `비정형 Excel 추출 라이브러리에서 헤더 탐지, 다단 헤더, 희소 시계열, 날짜 타입 오류 처리를 개선했습니다.`

### 4. CXP 플랫폼 | 인증·프론트엔드·공통 백엔드

- 최신 확인 활동: 2026-03-26부터 2025-06-12까지 확인
- 대상 프로젝트: `langcode.cxp.front`, `cxp-light-fe`, `langcode.cxp.back`, `Langcode.CXP`, `LangcodeApp`
- 역할: CXP 플랫폼의 백엔드·프론트엔드·인증·배포 기능 개발
- 주요 기여:
  - Keycloak 로그인과 Identity 모듈 구현·리팩터링
  - BFF Auth Proxy를 통한 cross-origin 인증 쿠키 문제 해결
  - 모델·프로바이더 관리 및 채팅 모델 선택 UI 구현
  - standalone 배포, runtime 환경변수, refresh token 쿠키 정책 정비
  - 고객·파트너 CRUD, 공통 모델, Cosmos bulk service 구현
- 성과: `cxp-light-fe` authored PR 15개 전부 병합, `langcode.cxp.back` authored PR 24개 관찰
- 이력서 표현: `CXP 플랫폼에서 Keycloak·Identity 인증과 BFF 인증 프록시를 구현하고, 모델 관리 UI와 standalone 배포 구조를 정비했습니다.`

### 5. dcai-onpremise | 온프레미스 AI 에이전트

- 최신 확인 활동: 2025-12-10
- 역할: AI 에이전트 handoff·orchestration 및 운영 화면 개발
- 주요 기여:
  - AI Agents Phase 4 구현
  - agent handoff와 orchestration workflow 구현
  - urgent alert, 3-panel dashboard, light/dark theme, 다국어 회의록 기능 반영
- 성과: authored PR 8개 전부 병합
- 이력서 표현: `온프레미스 AI 에이전트 시스템에서 handoff·orchestration workflow와 운영 대시보드·다국어 회의록 기능을 구현했습니다.`

### 6. KyoboPrePoC | 문서 처리 PoC

- 최신 확인 활동: 2025-08-08
- 역할: 금융·문서 처리 PoC 및 서버리스 기능 개발
- 주요 기여:
  - 검증 결과와 F1 오류 메시지 표시 개선
  - Excel 저장, output path, 범위 지정 스타일 구현
  - 오차 값 표시 정책과 사용자 피드백 반영
- 대상 프로젝트: `KyoboPrePoC`, `KyoboPrePoC-Function`
- 이력서 표현: `금융 문서 처리 PoC에서 검증 결과와 오류 메시지 표시를 개선하고, 서버리스 Excel 출력 기능을 구현했습니다.`

### 7. SK AX | Kubernetes 배포

- 역할: 고객 프로젝트의 Kubernetes 기반 애플리케이션 배포
- 주요 기여:
  - Kubernetes 환경에 애플리케이션 배포
- 확인 범위: 사용자 확인 경력. 공개 GitHub에서는 Kubernetes manifest·Helm·kubectl 관련 직접 근거를 확인하지 못함
- 이력서 표현: `SK AX 프로젝트에서 Kubernetes 기반 애플리케이션 배포를 수행했습니다.`

### 8. 제조·진단·업무 도메인 서비스

- `CelltrionPowerBIWebApp`: CPVR/APQR 리포트, LIMS 매핑, 차트·필터·다운로드·인쇄 기능 개발. authored PR 75개 중 72개 병합
- `CelltrionPowerBIFunction`: LIMS 매핑 CRUD, 캠페인·수율 계산 서버리스 로직 개발. authored PR 17개 전부 병합
- `Seegene.V2`: SGAL 오류 및 검사 업무 로직 수정. authored PR 44개 전부 병합
- `SpinInvoice`: 구독·청구 기능과 오류 수정. authored PR 54개 중 47개 병합
- `KbhcCosmosEngine`: 누락 데이터 정규화, Journey 통계, 식이·음료·음주 기능 개선
- 이력서 표현: `제조·진단·청구 도메인 서비스에서 업무 로직과 데이터 리포트 기능을 개발하고, 반복적인 오류 수정과 고객 요구사항을 제품에 반영했습니다.`

### 9. fastapi-tutorial | 개인 학습 프로젝트

- 최신 확인 활동: 2024-04-27
- 역할: FastAPI 기반 API 구현 학습
- 주요 기여:
  - Pydantic 모델 기반 POST·PUT API 구현
  - Query·Path 입력 검증 라우트 구현
  - Uvicorn 실행 방법 문서화
- 근거: [main.py](https://github.com/kimgooneya/fastapi-tutorial/blob/ae994c65880d27fdadb979398b18897310517436/main.py), [commit ae994c6](https://github.com/kimgooneya/fastapi-tutorial/commit/ae994c65880d27fdadb979398b18897310517436), [commit d4caf9b](https://github.com/kimgooneya/fastapi-tutorial/commit/d4caf9b4ba8f6ae385316561264c772fb28a590c)
- 이력서 표현: `FastAPI 개인 학습 프로젝트에서 Pydantic 모델 기반 API와 Query·Path 입력 검증 라우트를 구현했습니다.`

## 업무 방식과 강점

### 복잡한 AI 흐름을 실행 가능한 구조로 전환

Text-to-SQL DAG 설계와 AI 에이전트 orchestration 경험을 바탕으로, 여러 단계의 질의·처리 흐름을 책임 단위로 분리하고 서비스 코드로 연결합니다. 단순한 모델 호출보다 설정 경계, 실패 지점, 재시도, 데이터 조건까지 함께 설계하는 방식으로 문제를 해결합니다.

### 운영 문제를 기능 개선으로 연결

날짜 타입 오류, 인증 쿠키, 환경변수, secrets, SDK 변경처럼 운영에서 반복되는 문제를 원인 단위로 분해하고 재현 가능한 수정으로 전환합니다. 이후 PR 단위로 변경 범위를 관리해 배포와 리뷰가 가능한 형태로 전달합니다.

### 백엔드와 프론트엔드를 연결하는 제품 관점

API·도메인 모델·인증·배포 설정뿐 아니라 모델 관리 UI, 채팅 UX, 필터, 리포트 출력까지 함께 다룹니다. 이 때문에 기능을 특정 레이어에 한정하지 않고 사용자 흐름과 운영 환경까지 연결해 구현할 수 있습니다.

## 정량 근거 요약

- `kimgooneya` 계정은 GitHub 프로필 ID 26292512의 `Soo Hyeon Kim`으로 확인된 고신뢰 계정입니다.
- 전체 감사에서 authored PR 700건 이상이 관찰되었습니다. GitHub 검색 상한과 rate limit 때문에 실제 수가 아닌 관찰 하한으로 사용해야 합니다.
- `kt-gsi` 9개, `cxp-light-fe` 15개, `Seegene.V2` 44개 authored PR은 모두 병합된 것으로 확인되었습니다.
- `CelltrionPowerBIWebApp`은 75개 중 72개, `SpinInvoice`는 54개 중 47개 authored PR이 병합되었습니다.

## 이력서 상단에 바로 사용할 수 있는 문장

### 짧은 버전

`C#/.NET과 TypeScript/React를 기반으로 B2B AI·데이터 서비스를 개발해 왔으며, Text-to-SQL DAG 아키텍처, LLM 연동, Kubernetes 배포, 인증·Identity, 문서·Excel 파싱, 운영 안정화까지 수행했습니다.`

### 일반 버전

`B2B AI·데이터 서비스 개발자로서 Text-to-SQL DAG 아키텍처와 AI 에이전트 orchestration을 설계하고, Azure OpenAI·Cosmos DB·Form Recognizer 기반 백엔드와 TypeScript/React 프론트엔드를 구현했습니다. 금융·제조·진단·헬스케어 도메인에서 Kubernetes 배포, 인증, 데이터 파싱, 리포트, 업무 CRUD와 운영 오류를 개선해 제품에 반영했습니다.`

### 경력기술서용 버전

`Text-to-SQL DAG 설계를 중심으로 AI 질의 서비스의 실행 흐름을 구조화하고, secrets 관리·cloud/keyless 전환·SQL 오류 재시도까지 구현했습니다. 동시에 Azure OpenAI SDK 마이그레이션, Kubernetes 배포, 비정형 Excel 파싱, Keycloak·BFF 인증, CXP 모델 관리 UI, 온프레미스 AI 에이전트 workflow를 개발하며 백엔드와 프론트엔드를 연결하는 제품 개발을 수행했습니다.`

## 제출 전 정리할 항목

- 비공개 저장소명과 고객사·제품명은 NDA와 지원 기업의 공개 범위에 맞춰 익명화합니다.
- NHBank·SK AX의 Kubernetes 배포 경험은 사용자 확인 경력이며 공개 GitHub에서 직접 근거가 확인되지 않았으므로, 제출 시 담당 범위와 공개 가능 수준을 다시 확인합니다.
- FastAPI는 개인 학습 프로젝트 근거로만 사용하고 실무·프로덕션 경력으로 확대 표현하지 않습니다.
- `shkim` 계정은 `kimgooneya`와 동일인 여부가 확인되지 않았으므로 본인 경력 합산에서 제외하거나 별도 검증 후 사용합니다.
- `700건 이상`, `최소 100개`와 같은 수치는 검색 상한을 반영한 관찰 하한이므로, 공식 이력서에서는 “700건 이상 관찰” 또는 프로젝트별 병합 PR 수로 표현하는 편이 안전합니다.
- 실제 지원 시에는 대표 프로젝트 3~5개를 남기고, 각 프로젝트에 기간·팀 규모·본인 책임 범위·성과 지표를 추가하면 완성도가 높아집니다.

## 근거 문서

- 프로젝트별 상세 정리: [DEVELOPER_RESUME_PROJECTS.md](DEVELOPER_RESUME_PROJECTS.md)
- 전체 GitHub 감사 원문: [GITHUB_CONTRIBUTION_AUDIT.md](GITHUB_CONTRIBUTION_AUDIT.md)
