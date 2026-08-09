# 개발자 이력서 프로젝트 근거 보관 안내

이 파일은 과거 조사 메모의 공개 안전 요약본이다. 원본 조사에 포함됐던 private repository 식별자, 원격 URL, PR·commit 식별자, 고객명은 공개 작업본에서 제거했다. 과거 활동 수치는 코드 수준 성과 근거가 아니므로 현재 이력서와 portfolio에서 사용하지 않는다.

최신 기술 근거는 [코드 근거 감사](resume/CODE_LEVEL_PROJECT_AUDIT.md)와 [개발자 이력서](resume/developer-resume.html)를 기준으로 한다. 감사 문서는 clone된 저장소에서 관찰한 실행 경계·검증·테스트·배포 설정을 설명하며, 코드 관찰만으로 저자성이나 실제 담당 범위를 자동 증명하지 않는다. 제출 전에 역할과 공개 권한을 별도로 확인한다.

## 공개용 코드 근거 색인

| 공개 식별자 | 확인한 기술 경계 |
| --- | --- |
| AI 질의 플랫폼 | DAG 오케스트레이션, fan-in, SQL semantic/security guard, PostgreSQL 재시도 |
| 금융 AI 서비스 | typed TCB module, 입력·출력 검증, LLM retry, token usage fallback, 오류 sanitizer |
| 인증·실행 플랫폼 | HttpOnly cookie, 동시 refresh, 401 retry, Idempotency-Key 변경 요청, standalone runtime |
| 온프레미스 에이전트 | handoff workflow, SignalR streaming, thread persistence |
| 금융 문서 PoC | 동적 validation, ValidationResult, 오류 CSV 재분석, Azure Function 경계 |
| 진단 rulebase | Excel 계층 검증·sanitize, 카드 기반 go-back 흐름 |
| 구독 청구 | subscriptionId 그룹화, reseller 보완, Cosmos bulk write |
| 건강 데이터 | checkpoint 증분 조회, 단위 정규화, 통계 upsert |
| 제조 품질 리포트 | report grouping, partial/full 표시, LIMS mapping, 차트·다운로드 |
| 제조 서버리스 로직 | LIMS mapping, MSP/EBR 계산, CSV 산출 |

## 제외 원칙

- clone에 소스·설정·테스트가 없거나 공개 권한이 확인되지 않은 프로젝트는 코드 근거로 산정하지 않는다.
- 고객·도메인·내부 심볼은 공개 권한이 없는 경우 일반화된 식별자로 바꾼다.
- 사용자 확인 경력은 코드 감사 결과와 구분해 표시한다.
