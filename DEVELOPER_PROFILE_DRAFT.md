# 개발자 프로필 초안 보관 안내

이 파일은 공개 제출 전 검토를 위한 안전한 프로필 초안이다. 과거 PR·commit 수치, private repository provenance, 고객명과 내부 프로젝트 식별자는 포함하지 않는다. 최신 표현은 [코드 근거 감사](resume/CODE_LEVEL_PROJECT_AUDIT.md)와 [개발자 이력서](resume/developer-resume.html)를 기준으로 한다.

## 코드에서 확인한 기술 축

- AI 실행 흐름: Text-to-SQL DAG, 병렬 fan-in, SQL 안전 경계, LLM retry와 token accounting
- 데이터 신뢰성: 날짜·단위 정규화, schema/row validation, 오류 계약, 증분 checkpoint
- 제품 운영: HttpOnly cookie 인증, 동시 refresh와 401 retry, standalone runtime, 서버리스·Cosmos 경계
- 업무 도메인: 문서·Excel rulebase, 제조 리포트, 구독 청구, 건강 데이터 통계

## 역할 서술 원칙

코드 감사는 구현의 동작과 테스트·배포 경계를 보여주지만 저자성을 자동 증명하지 않는다. 이력서의 역할·담당 범위 문장은 사용자가 확인한 경력 맥락과 코드 관찰을 결합해 작성하며, 제출 전 담당 범위와 고객 공개 권한을 다시 확인한다.
