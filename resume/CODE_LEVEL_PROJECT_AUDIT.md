# 코드 근거 기반 주요 프로젝트 감사

자료 기준일: 2026-08-05

이 문서는 PR 개수나 커밋 수가 아니라, clone된 저장소의 실제 코드·테스트·배포 설정에서 확인한 기술 근거를 기록한다. 이력서의 짧은 문장은 이 문서의 관찰 결과를 압축한 것이며, 확인되지 않은 비용·시간·장애율은 추정하지 않는다. 공개 저장소에 포함되는 문서이므로 로컬 절대 경로·원격 조직명·커밋 식별자·고객 식별자·내부 파일 경로는 기록하지 않는다.

코드 관찰은 동작·검증·배포 경계의 근거이며 저자성이나 실제 담당 범위를 자동 증명하지 않는다. 이력서의 역할 서술은 사용자가 확인한 경력 맥락과 코드 관찰을 결합한 것으로, 제출 전 담당 범위와 공개 권한을 별도 확인한다.

## 조사 범위

| 공개 식별자 | 조사한 clone 식별자 | 코드 근거 |
| --- | --- | --- |
| AI 질의 플랫폼 | `clone-a` | 확인 |
| 금융 AI 서비스 | `clone-b` | 확인 |
| 인증·실행 플랫폼 (light) | `clone-c` | 확인 |
| 인증·실행 플랫폼 (enterprise) | `clone-d` | 확인 |
| 인증·실행 플랫폼 (backend) | `clone-e` | 확인 |
| 온프레미스 AI 에이전트 | `clone-f` | 확인 |
| 금융 문서 PoC | `clone-g/h` | 확인 |
| 제조 품질 WebApp/Function | `clone-i/j` | 확인 |
| 진단 rulebase | `clone-k` | 확인 |
| 구독 청구 | `clone-l` | 확인 |
| 건강 데이터 | `clone-m` | 확인 |

배포 프로젝트 clone에는 소스·설정·테스트가 없었다. 별도 Text-to-SQL 디렉터리는 원격이 연결된 git clone이 아니므로 이번 코드 근거에는 포함하지 않았고, Text-to-SQL 주장은 조사한 AI 질의 플랫폼 실행 경로로 한정했다.

고객 Kubernetes 배포 경험은 사용자 확인 이력으로만 남기며, 로컬 clone에서 코드·설정·테스트를 확인하지 못했으므로 아래의 코드 근거 요약에는 포함하지 않는다. 고객·도메인 시스템명과 내부 구현 세부사항은 공개 권한이 있는 범위에서만 이력서에 사용해야 한다.

## 코드에서 확인한 기술 흐름

### AI 질의 플랫폼 · Text-to-SQL 실행 엔진

- 오케스트레이션 경계는 Synonym → Multiturn → Normalization/TableSchema/FewShot/Rule → SQL → Answer 순서의 DAG를 구성하고, SQL 단계에 5초 timeout과 2회 재시도를 둔다.
- DAG 실행 엔진은 unbounded channel, 병렬 실행도, fan-in barrier, 동적 전이를 사용하며 노드 실패를 후속 descendant로 전파한다. 결과와 토큰 사용량은 실행 context에 기록된다.
- SQL 실행 노드는 schema 선택 → LLM SQL 생성 → semantic guard → SELECT-only security check → count 래핑 조회 → 실제 결과 조회 순서로 동작하며 PostgreSQL timeout/deadlock/serialization 상태를 분류한다.
- 인접 채널·`varchar` 날짜 `to_char` guard와 DML/DDL/복수 statement 차단 테스트가 SQL 안전 경계를 고정한다.
- 한국어 연·월·분기·상대 기간 해석, 미래 기간 거부, 잘못된 날짜 정규화, 배포 managed identity와 로컬 credential 분리가 확인된다.

### 금융 AI 서비스 · TCB/LLM 응답 계약

- 입력 controller는 레거시 입력을 분해·정규화하고 실패도 같은 응답 계약으로 반환한다.
- 34개 typed module을 선택하고 필수 필드를 LLM 호출 전에 확인하며, 프롬프트별 출력 검증과 최대 5회 재시도를 수행한다.
- Azure chat 호출·streaming chunk·provider usage를 처리하고 usage가 없으면 system/user/output 토큰을 fallback 계산한다.
- 오류 sanitizer는 Azure 상태·JSON path·timeout·내부 예외를 안전한 한국어 계약으로 매핑하고 provider header/internal marker를 제거한다.
- 모델·endpoint·secret 설정 startup 검증, managed identity secret cache, deterministic path·누출 방지·모듈 응답 계약 테스트가 확인된다.

### 인증·실행 플랫폼 · 브라우저 인증과 실행 환경 계약

- authorization-code/refresh grant를 인증 서버에 전달하고 access·refresh token을 JSON에 노출하지 않은 HttpOnly cookie로 발급한다. API client는 동시 refresh를 하나로 합치고 원 요청을 한 번만 재시도한다.
- 문서 목록·multipart upload progress를 제공하고 삭제·이동 요청에 `Idempotency-Key`를 부여한다.
- standalone 산출물과 `/api` rewrite를 분리해 동일 build를 runtime API 설정으로 실행한다.
- light/enterprise frontend는 서로 다른 client와 refresh-cookie 정책을 사용하며 backend는 authorization_code/password/refresh_token/client_credentials 흐름과 RFC ProblemDetails 오류 계약을 제공한다.
- provider/model 테이블, soft-delete filter, domain-event 저장, 권한이 확인된 ID 목록 삭제와 실패 ID 반환이 확인된다. Cosmos bulk 처리라고 표현하지 않는다.

### 온프레미스 AI 에이전트 · 스트리밍과 handoff

- 오케스트레이터는 Email/Jira/Meeting agent를 function tool로 노출하고 context와 response language 전파를 요구한다.
- base agent는 thread를 Mongo에 serialize/deserialize하고 streaming chunk를 누적해 assistant message로 저장하며 저장 실패는 fallback한다.
- chat hub는 사용자 메시지를 저장하고 agent streaming을 chunk/완료 이벤트로 전달한다.
- handoff workflow에는 triage에서 math/history로 이어지는 reciprocal 그래프가 있고, 배포 경계는 Mongo/JWT/5000 포트와 ko/en/ar 언어 선택을 포함한다.

### 금융 문서 PoC · 검증 결과 계약

- 세 HTTP route는 입력을 명시적으로 검사하고 400/500 응답을 단계별 JSON 계약으로 반환한다.
- Excel sheet/converter와 validation class를 동적으로 로드하며 상태·행 수·오류 수·결과 파일·diff를 하나의 `ValidationResult`로 묶는다.
- merge → validation → CSV/XLSX 저장 → error_count/diff 계산 파이프라인과 오류 CSV 재분석 단계가 확인된다.
- 앱과 Azure Function 사이의 HTTP 경계에는 5분 timeout이 있다. CSV 병합 함수 앞의 hard-coded early return은 완성된 merge 성과로 단정하지 않는다.

### 제조 품질 · 데이터 변환과 리포트

- 리포트 데이터는 식별자 기준으로 그룹화되고 partial/full 표시·decimal/spec·chart/trend/table 분기가 적용된다.
- 권한 확인, response 오류 모달, Excel 다운로드, LIMS mapping과 차트·필터·인쇄 경계가 확인된다.
- 서버리스 함수는 LIMS parameter와 report flag로 raw-data 상태를 결정하고 Cosmos 항목을 bulk update한다.
- 제조 order와 inspection lot를 batch 기준으로 join하고 cancellation timestamp를 반영하며, Blob Excel 계산은 조건 매칭 후 Initial/Final 레코드를 생성한다.

### 진단 rulebase · 의사결정 트리

- Excel ingestion은 단일 sheet·답변 header·merged-cell hierarchy를 검증하고 sanitizer가 변경한 행을 행 번호와 함께 거부한다.
- rulebase type을 확인하고 질문·답변 계층을 persistence 경계에 저장한다.
- 카드 UI와 chat service는 parent/answer 기반 다음 단계, 첫/마지막 노드, go-back, timeout/cancellation telemetry를 연결한다.
- 특정 제품명 문자열은 코드에서 확인하지 않았으므로 공개 표현은 “검사 rulebase 의사결정 트리”로 한정한다.

### 구독 청구 · CSV와 Cosmos 집계

- invoice CSV를 읽고 subscriptionId별 주문 라인을 그룹화해 subtotal/tax/total을 합산하며 reseller 식별자가 비어 있으면 과거 레코드에서 분류 정보를 보완한다.
- reset 경로는 기간별 line/blob을 제거한 뒤 재처리하고, 파일 단위 예외는 로그 후 건너뛰며 외부 예외는 metadata를 정리한다.
- tenant container·partition key·bulk execution client가 repository 경계로 캡슐화되고 UI는 누락 식별자 행을 표시한다.

### 건강 데이터 · checkpoint 기반 통계

- Mongo 최신 변경 시점과 Cosmos checkpoint를 비교해 변경분만 읽고 mmol/L을 mg/dL로 통일한 뒤 source/date별 all·AC·PC 통계를 bulk upsert한다.
- day/week/month/year 조회는 pre-aggregated stats를 재그룹화해 평균·최소·최대·시간대 값을 JSON 계약으로 반환한다.
- deterministic id와 day-based partition key가 정의된다.
- AC/PC 데이터가 비어 있을 때 기본값 0으로 집계될 수 있고 별도 unit/integration test suite는 확인되지 않았다. 이를 개선 성과나 수치로 포장하지 않는다.

## 이력서 반영 원칙

1. PR/commit 개수는 주요 성과 근거에서 제거한다.
2. 각 프로젝트는 `문제/경계 → 코드 구현 → 관찰 가능한 동작` 순서로 한두 문장에 압축한다.
3. 추상 레이어 이름보다 cookie 발급·401 재시도·idempotency·runtime rewrite처럼 코드가 실제로 하는 일을 쓴다.
4. 테스트가 없거나 결함이 관찰된 프로젝트는 완성도나 운영 효과를 과장하지 않는다.
5. 실제 비용·시간·장애율·처리량을 측정한 자료가 없으면 수치화하지 않는다.
