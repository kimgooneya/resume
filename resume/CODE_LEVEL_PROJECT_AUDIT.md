# 코드 근거 기반 주요 프로젝트 감사

자료 기준일: 2026-08-05

이 문서는 PR 개수나 커밋 수가 아니라, clone된 저장소의 실제 코드·테스트·배포 설정에서 확인한 기술 근거를 기록한다. 이력서의 짧은 문장은 이 문서의 관찰 결과를 압축한 것이며, 확인되지 않은 비용·시간·장애율은 추정하지 않는다. 공개 저장소에 포함되는 문서이므로 로컬 절대 경로·원격 조직명·커밋 식별자·고객 식별자는 기록하지 않는다.

코드 관찰은 동작·검증·배포 경계의 근거이며 저자성이나 실제 담당 범위를 자동 증명하지 않는다. 이력서의 역할 서술은 사용자가 확인한 경력 맥락과 코드 관찰을 결합한 것으로, 제출 전 담당 범위와 공개 권한을 별도 확인한다.

## 조사 범위

| 프로젝트 | 조사한 clone 식별자 | 코드 근거 |
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

- `Server/Application/Features/Chat/Pipeline/WorkflowOrchestrationService.cs:35-235`가 Synonym → Multiturn → Normalization/TableSchema/FewShot/Rule → Sql → Answer 노드를 조합하고 SQL 노드에 5초 timeout과 2회 재시도를 설정한다.
- `TextToSql/Dag/Core/Engine.cs:60-355`는 unbounded channel, 병렬 실행도, fan-in barrier, 동적 전이를 사용하고 노드 실패를 후속 descendant로 전파한다. 실행 결과와 토큰 사용량은 DAG context에 기록된다.
- `TextToSql/Dag/Nodes/SqlNode.Run.cs:44-166`은 schema 선택 → LLM SQL 생성 → semantic guard → SELECT-only security check → count 래핑 조회 → 실제 결과 조회 순서로 동작한다. PostgreSQL timeout/deadlock/serialization 상태를 별도 분류한다.
- `TextToSql/Dag/Nodes/SqlNode.SemanticValidation.cs:36-193`의 인접 채널·`varchar` 날짜 `to_char` guard와 `SqlNodeSecurityCheckTests`의 DML/DDL/복수 statement 차단이 SQL 안전 경계의 근거다.
- `TextToSql/Dag/Nodes/DateHintExtractor.cs:17-175`와 `NormalizationNode.DateUtils.cs:20-105`는 한국어 연·월·분기·상대 기간을 해석하고 미래 기간 및 잘못된 날짜를 정규화한다.
- `Server/Bootstrap/DependencyInjection/CompositionRoot.cs:157-220,308-330`은 PostgreSQL/Mongo 설정을 fail-fast하고 배포 managed identity와 로컬 API key/`DefaultAzureCredential` 경로를 분리한다.

### 금융 AI 서비스 · TCB/LLM 응답 계약

- `Server/Controllers/TCBController.cs:60-133`가 레거시 입력을 분해·정규화한 뒤 TCB 서비스로 전달하고, 실패도 TCB 응답 형태로 반환한다.
- `Server/Services/SemanticKernel/Custom/TCBService.cs:41-215,236-253`가 34개 TCB 모듈을 typed switch로 선택하고 필수 필드를 확인한 뒤 프롬프트별 출력 검증과 최대 5회 재시도를 수행한다. 빈 입력은 LLM 호출 전에 구조화된 validation failure로 끝난다.
- `Server/Services/Cognitive/AzureOpenAIService.cs:434-475,622-719`가 Azure SDK 호출·streaming chunk·provider usage를 처리하고, usage가 없으면 system/user/output 토큰을 fallback 계산한다.
- `Server/Services/SemanticKernel/Custom/TCBErrorSanitizer.cs:48-77,160-225`가 Azure 상태 코드·JSON path·timeout·내부 예외를 안전한 한국어 오류 계약으로 매핑하고 provider header/internal marker를 제거한다.
- `Server/Program.cs:147-204,209-244`와 `KeyVaultService.cs:22-90`은 모델·endpoint·Key Vault 설정을 startup에서 확인하고 managed identity 기반 secret cache를 구성한다.
- `Server.Tests/Tcb/TcbDeterministicModuleTests.cs`, `TCBErrorSanitizerTests.cs`, `TcbLlmModuleTests.cs`에서 deterministic path·오류 누출 방지·34개 모듈 API 응답 계약을 검증한다.

### 인증·실행 플랫폼 · 브라우저 인증과 실행 환경 계약

- `src/app/api/auth/token/route.ts`는 authorization-code/refresh grant를 인증 서버에 전달하고 access·refresh token을 JSON으로 노출하지 않은 채 HttpOnly cookie로 발급한다. `src/lib/api-client.ts`는 401에서 동시 refresh를 하나로 합치고 원 요청을 한 번만 재시도한다.
- `src/services/document.service.ts`는 paged knowledge tree와 multipart upload progress를 제공하고, 삭제·이동 요청에 `Idempotency-Key`를 부여한다.
- `next.config.ts`와 `Dockerfile`은 standalone 산출물과 `/api` rewrite를 분리해 같은 빌드가 runtime API 설정으로 실행되도록 한다.
- enterprise `lib/axios.ts`, `proxy.ts`, `app/api/auth/token/route.ts`도 인증 cookie와 401 refresh/retry 경계를 구현한다. 두 frontend의 인증 코드는 서로 다른 client/refresh-cookie 정책을 사용하므로 하나의 추상 레이어 문장으로 합치지 않는다.
- backend `KeyCloakService.cs`는 authorization_code/password/refresh_token/client_credentials 흐름을 제공하고, `GlobalExceptionHandler.cs`는 인증·404·입력·충돌을 RFC ProblemDetails로 변환한다.
- `IntegrationDbContext.cs`는 provider/model 테이블과 soft-delete filter/domain-event 저장 경계를 정의하고, `DeleteLlmModelListEndpoint.cs`는 사용자 권한을 확인한 ID 목록 삭제와 실패 ID 반환을 수행한다. Cosmos bulk 처리라고 표현하지 않는다.

### 온프레미스 AI 에이전트 · 스트리밍과 handoff

- `be/Agents/Orchestrator/OrchestratorAgent.cs:15-62`가 Email/Jira/Meeting agent를 생성하고 각 agent를 function tool로 노출하며 context와 response language 전파를 요구한다.
- `be/Agents/Base/BaseAgent.cs:110-205,257-350`은 thread를 Mongo에 serialize/deserialize하고 streaming chunk를 누적해 assistant message로 저장한다. 저장 실패는 로그 후 fallback한다.
- `be/Api/Hubs/ChatHub.cs:94-260`는 SignalR에서 사용자 메시지를 저장하고 agent streaming을 chunk/MessageComplete 이벤트로 전달한다.
- `be/Agents/Workflows/HandOffWorkflow.cs:25-48`에는 triage에서 math/history로 이어지는 reciprocal handoff 그래프가 있다.
- `docker-compose.onpremise.yml:1-40`은 Mongo/JWT/5000 포트 기준의 on-premise 배포 경계를 정의하고, `fe/dcai-next/lib/i18n.ts`는 ko/en/ar 번역과 localStorage 언어 선택을 구성한다.

### 금융 문서 PoC · 검증 결과 계약

- `function_app.py:10-137`은 analysis/all·feature·basedata HTTP 입력을 명시적으로 검사하고 400/500 응답을 feature 단계별 JSON 계약으로 반환한다.
- `services/f1_analyzer_service.py:16-116`은 Excel sheet/converter를 읽고 validation class를 동적으로 로드한다. `validations/utils.py:16-85`의 `ValidationResult`는 상태·행/오류 수·결과 파일·diff 정보를 한 계약으로 묶는다.
- `functions/base.py:60-72,170-240`은 merge → validation → CSV/XLSX 저장 → error_count/diff 계산을 한 파이프라인으로 묶는다. F2/F3 서비스는 오류 CSV를 재분석해 feature별 오류 목록을 만든다.
- `Infrastructure/AzureFunction/Clients/AzureFunctionHttpClient.cs:4-14`와 DI 설정은 앱에서 Azure Function으로 넘어가는 얇은 HTTP 경계와 5분 timeout을 정의한다.
- `helper/zip_function.py:23-100`에는 CSV 병합 로직 앞의 hard-coded early return이 있어 산출물 설명에서 “완성된 Excel merge”라고 단정하지 않는다.

### 제조 품질 · 데이터 변환과 리포트

- WebApp의 `Client/Pages/Report/CPVRReportTable.razor`는 ParaCode/ZCE_IDENTIFIER 기준으로 원시 결과를 그룹화하고 partial/full report와 decimal/spec 표시를 분기한다.
- `Client/Services/Report/ChartMaker*.cs`와 `Client/Pages/Ad-hocInfo/SpecBasic.razor`는 차트·trend·table 구성, 권한 확인, response 오류 모달, Excel 다운로드 경계를 제공한다.
- Function의 `Functions/AboutLIMS/NewLIMSRule.cs`는 LIMS parameter와 ReportFlag를 바탕으로 RawFlag를 결정하고 Cosmos 항목을 bulk update한다.
- `Functions/AboutLIMS/MSPGenerator.cs`는 manufacturing order와 inspection lot를 BatchNumber로 join하고 cancellation 시점을 반영해 MSP CSV를 만든다. `AboutEBR/InspectionLotFunc.cs`는 transfer/cancellation timestamp를 비교해 취소 상태를 계산한다.
- `Functions/AboutEBR/CalculationLogic.cs`는 Blob Excel을 읽고 RFC_TO_POWER_BI 조건으로 대상을 매칭한 뒤 Initial/Final 계산 레코드를 생성한다.

### 진단 rulebase · 의사결정 트리

- `Server/Services/KnowledgeBase/KnowledgeFactory/ExcelFactory.cs`는 단일 sheet·답변 header·merged-cell hierarchy를 검증하고 HtmlSanitizer 후 sanitized row를 행 번호와 함께 거부한다.
- `.../DocumentService.cs`는 Rulebase type을 확인하고 파싱된 `RulebaseQuestion/Answers`를 persistence 경계에 저장한다.
- `Client/Modules/Chat/Cards/CardRenderer.razor`와 채팅 서비스 코드는 parent/answer 기반 다음 단계, 첫/마지막 노드, go-back을 카드 UI와 timeout/cancellation telemetry에 연결한다.
- 코드에서 특정 제품명 문자열 자체는 확인하지 않았으므로 이력서에는 “검사 rulebase 의사결정 트리”로만 표현한다.

### 구독 청구 · CSV와 Cosmos 집계

- `Server/SPin/Services/InvoiceService.cs:102-218,564-710`은 invoice CSV를 읽고 subscriptionId별로 주문 라인을 그룹화해 subtotal/tax/total을 합산하며 reseller MPN이 비어 있으면 과거 레코드에서 분류 정보를 보완한다.
- 같은 서비스의 reset 경로는 기간별 subscription line/blob을 제거한 뒤 재처리하고, 파일 단위 예외는 로그 후 건너뛰며 외부 예외는 invoice metadata를 정리한다.
- `Server/Repository/Foundation/CommonModelRepository.cs:13-122`와 `Services/Cosmos/CosmosService.cs:12-52`는 tenant container·partition key·bulk execution client를 캡슐화한다. UI는 누락 MPN 행을 표시하고 보정한다.

### 건강 데이터 · checkpoint 기반 통계

- `Test.cs:81-230`은 Mongo 최신 `CreateAt`와 Cosmos checkpoint를 비교해 변경분만 읽고, `UnitHelper.ToMg_dl`로 mmol/L을 mg/dL로 통일한 뒤 source/date별 all·AC·PC 통계를 bulk upsert한다.
- `Test.cs:260-608`은 day/week/month/year 조회에서 pre-aggregated stats를 재그룹화해 평균·최소·최대·시간대 값을 JSON 계약으로 반환한다.
- `Model/Stat/GlucoseStat.cs:11-73`은 deterministic id와 day-based partition key를 정의한다.
- AC/PC 데이터가 비어 있을 때 기본값 0으로 집계될 수 있고, 별도 unit/integration test suite는 확인되지 않았다. 이를 개선 성과나 수치로 포장하지 않는다.

## 이력서 반영 원칙

1. PR/commit 개수는 주요 성과 근거에서 제거한다.
2. 각 프로젝트는 `문제/경계 → 코드 구현 → 관찰 가능한 동작` 순서로 한두 문장에 압축한다.
3. 추상 레이어 이름보다 cookie 발급·401 재시도·idempotency·runtime rewrite처럼 코드가 실제로 하는 일을 쓴다.
4. 테스트가 없거나 결함이 관찰된 프로젝트는 완성도나 운영 효과를 과장하지 않는다.
5. 실제 비용·시간·장애율·처리량을 측정한 자료가 없으면 수치화하지 않는다.
