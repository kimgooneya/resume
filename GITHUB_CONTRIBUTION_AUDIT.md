# GitHub Contribution Audit: kimgooneya, shkim, 김수현

- Audit date: 2026-08-01 (Asia/Seoul)
- Target: all accessible private GitHub project activity attributable to the requested identities, not a curated “major projects” subset.
- Primary authenticated identity: `kimgooneya` / GitHub user ID `26292512`.
- Evidence standard: exact repository URLs, PR/issue/review IDs, commit SHAs, dates, and confidence labels are retained where the connected GitHub surface returned them.
- Important interpretation rule: a bounded query returning no record is marked as no-evidence/unknown, never silently converted into proof of no historical contribution.

## Executive result

The parallel audit covered the full name-based `langcodestartup` inventory (65 A-H, 113 I-R, and 33 S-Z repository names; 211 connector-visible repositories in total) and the accessible private `kimgooneya/*` repositories plus the explicitly named external repositories. The earlier CLI private filter returned 206 `langcodestartup` repositories; the agent evidence retains the additional name-matched repositories when the connector labeled them public so that the complete organization inventory is not silently dropped.

The broad connected account inventory reported 221 private repositories across 244 accessible repositories. That total is a connector-wide scope and is not added to the 211-organization count because the two inventories use different endpoints and ownership filters.

## Identity resolution

| Requested name | Resolved identity | Confidence | Treatment in this report |
|---|---|---:|---|
| `kimgooneya` | GitHub login `kimgooneya`, ID `26292512`, profile name “Soo Hyeon Kim” | High | Count as the primary identity. |
| `김수현` | No separate GitHub login; plausible Korean-name alias for “Soo Hyeon Kim” | Medium | Keep as an alias, but do not claim API-level proof of the Korean spelling. |
| `shkim` | Separate login `shkim`, ID `1094548` | High as a distinct account | Keep separate from `kimgooneya`; do not merge totals. |
| `langcode-shkim` | Commit metadata identity ID `87595334` observed in the Langcode repositories | Medium related-identity signal | Report separately as a related/possible alias, not as proven account ownership. |

## Contribution totals and evidence

- A-H slice: 128 authored PRs across 6 repositories; 124 merged, 3 closed unmerged, 1 open. The same slice returned no authored issues and no matching branch names.
- I-R slice: 776 exact paginated core-REST commit records for `kimgooneya`, 338 exact PR records in the memo, and 0 `shkim` authored commits/PRs returned by that fallback. All 113 repositories are represented; 74 repositories retain reviewer/comment UNKNOWN status because GitHub Search rate limits prevented a complete sweep.
- S-Z slice: positive evidence in SamsungSHI, Seegene.V2, SPinAutoUpload, SpinInvoice, TestProvisioning, and ToyProjects; 27 other S-Z repositories have bounded no-evidence results. Seegene.V2 has 44/44 authored PRs merged; SpinInvoice has 54 authored PRs, 47 merged.
- Other private repositories: recent positive commit evidence in 11 of 13 private `kimgooneya/*` repositories; `wezenhealthcare/wezen-rfid-scanner` has at least 100 merged authored PRs under a 100-result cap.
- Cross-surface non-commit evidence: 2 `kimgooneya` review submissions, 5 `kimgooneya` PR conversation comments, and 3 `shkim` PR conversation comments. No standalone issue records were returned in the connected cross-private search. Releases, Discussions, and a global issue-comment feed were not exposed by the connected tool surface.

## What the exact evidence shows

The highest-confidence contribution patterns are:

- **Celltrion Power BI:** repeated merged PRs for LIMS mapping CRUD and validation, campaign/MSP/yield-rate logic, calculation rules, CPVR/APQR report tables and charts, report filters/downloads, print/layout behavior, and production feedback fixes.
- **NHBank:** Azure OpenAI token-usage stabilization, LLM environment-variable and SDK migration, TCB fixes, service modernization, and live-controller work.
- **KT GSI:** secret import/export and boundary handling, Azure-resource-based configuration, removal of local DB dependency, date/query safety, retry behavior, and removal of unwanted channel anchoring.
- **Langcode CXP/backend/front:** authored PR activity is evidenced in `Langcode.CXP`, `Langcode.CXP.V2`, `langcode.cxp.back`, `cxp-be`, `cxp-light-fe`, and `langcode.cxp.front`; exact per-repository counts and PR IDs are in the appendices.
- **Seegene and Spin:** Seegene.V2 has a fully merged 44-PR authored series, while SpinInvoice has a 54-PR series with 47 merged; direct commits also show both `kimgooneya` and `langcode-shkim` metadata in SpinInvoice.
- **Other project work:** SamsungSHI, TestProvisioning, ToyProjects, SPinAutoUpload, and multiple private personal repositories have exact commit evidence. `wezenhealthcare/wezen-rfid-scanner` has a large merged-PR lower bound.
- **Separate `shkim` activity:** exact public PR evidence includes `shkim/fundamental-react#1/#2`, `shkim/XingSharp#1`, `sdcoffey/techan#22`, and `yann-shi/hero#18`; this is not merged into the `kimgooneya` totals.

## Limitations and safe conclusions

- GitHub Search imposed a 30 requests/minute cap and connector calls also returned secondary HTTP 403s. Rows marked UNKNOWN, rate-limited, or at least are not complete totals.
- Some PR searches have a 100-result cap. `wezenhealthcare/wezen-rfid-scanner` is explicitly a lower bound.
- Commit checks in the S-Z slice sampled the latest 3 commits per repository; private `kimgooneya/*` checks sampled up to 5. The A-H and I-R agents supplemented this with PR-head SHAs and core REST commit pagination where available.
- `chwonseok/ChartJsLibrary` and `differz-inc/langcode` returned 404/not found through the authenticated connector. No contribution conclusion is possible for those repositories from this session.
- The local `gh` token was invalid. Positive evidence came from the connected GitHub API surface; no credential or PII was written to the report.
- The report deliberately keeps `shkim`, `langcode-shkim`, and the Korean name alias separate unless the evidence directly supports a link.

## Full repository-by-repository evidence

The following appendices contain every repository section produced by the four parallel agents, including exact links, branch inventories, positive findings, bounded no-evidence rows, and query limitations. They are included verbatim so this master file is self-contained.


## Appendix A — A-H repository audit

# Member A — langcodestartup A–H contribution audit

Generated: 2026-08-01T07:54:05.934Z

## Scope and evidence method

- Scope: the 65 accessible `langcodestartup/*` repositories whose names begin A–H (case-insensitive), matching the team roster. Three were returned as public (`ExampleApp`, `dcai-mock`, `excel-parser`); they are retained and labeled because the roster filter is name-based.
- Identity anchor: authored PR objects consistently identify `kimgooneya` (GitHub user id `26292512`; avatar URL `https://avatars.githubusercontent.com/u/26292512?v=4`). The requested aliases `shkim` and `김수현` were searched as author-qualified commit aliases; no `shkim` PR/issue/branch evidence appeared.
- Repository inventory: GitHub connector `github_list_repositories(owner=langcodestartup,page_size=1000)` returned 211 accessible repositories; the A–H filter returned 65.
- PR scan: `github_get_users_recent_prs_in_repo(repository_full_name=<repo>, state=all, limit=100, include_comments=false, include_diff=false)` for each A–H repository.
- Issue scan: `github_search_issues(query=author:kimgooneya, repository_full_name=<repo>, state=all, topn=100)` for each A–H repository.
- Branch scan: `github_search_branches(owner=langcodestartup, repo_name=<repo>, query=kimgooneya, page_size=100)` for each A–H repository.
- Commit scan: author-qualified text searches such as `a author:<alias>` were run against active repositories; exact commit URLs/SHAs returned by the connector are recorded below. PR head SHAs are also recorded as exact commit anchors.

## Cross-repository result

- Authored PRs: **128** across **6** repositories; **124** merged, **3** closed without merge, **1** open.
- Authored issues: **0** returned across all 65 repositories.
- Branch names matching `kimgooneya`: **0** returned across all 65 repositories.
- Review search (`reviewed-by:kimgooneya`) returned 0 PRs in each of the six PR-active repositories. Representative PR timeline fetches for one PR per active repository returned no comments/review events.

## Repository evidence

### langcodestartup/AIChallenge

- Visibility: **private**; default branch: `master`; repository URL: https://github.com/langcodestartup/AIChallenge
- No matching authored PRs or authored issues were returned for the requested identity in this repository; the `kimgooneya` branch-name search also returned no match. Commit searches are covered by the limitations section below, so this is an observed no-evidence result rather than proof that every historical author string is absent.

### langcodestartup/anomaly-detector-quickstart

- Visibility: **private**; default branch: `master`; repository URL: https://github.com/langcodestartup/anomaly-detector-quickstart
- No matching authored PRs or authored issues were returned for the requested identity in this repository; the `kimgooneya` branch-name search also returned no match. Commit searches are covered by the limitations section below, so this is an observed no-evidence result rather than proof that every historical author string is absent.

### langcodestartup/authexample

- Visibility: **private**; default branch: `master`; repository URL: https://github.com/langcodestartup/authexample
- No matching authored PRs or authored issues were returned for the requested identity in this repository; the `kimgooneya` branch-name search also returned no match. Commit searches are covered by the limitations section below, so this is an observed no-evidence result rather than proof that every historical author string is absent.

### langcodestartup/azureml-insiders

- Visibility: **private**; default branch: `main`; repository URL: https://github.com/langcodestartup/azureml-insiders
- No matching authored PRs or authored issues were returned for the requested identity in this repository; the `kimgooneya` branch-name search also returned no match. Commit searches are covered by the limitations section below, so this is an observed no-evidence result rather than proof that every historical author string is absent.

### langcodestartup/AzurePIITest

- Visibility: **private**; default branch: `master`; repository URL: https://github.com/langcodestartup/AzurePIITest
- No matching authored PRs or authored issues were returned for the requested identity in this repository; the `kimgooneya` branch-name search also returned no match. Commit searches are covered by the limitations section below, so this is an observed no-evidence result rather than proof that every historical author string is absent.

### langcodestartup/AzureServiceBusBotRelay

- Visibility: **private**; default branch: `master`; repository URL: https://github.com/langcodestartup/AzureServiceBusBotRelay
- No matching authored PRs or authored issues were returned for the requested identity in this repository; the `kimgooneya` branch-name search also returned no match. Commit searches are covered by the limitations section below, so this is an observed no-evidence result rather than proof that every historical author string is absent.

### langcodestartup/B4PLAY

- Visibility: **private**; default branch: `master`; repository URL: https://github.com/langcodestartup/B4PLAY
- No matching authored PRs or authored issues were returned for the requested identity in this repository; the `kimgooneya` branch-name search also returned no match. Commit searches are covered by the limitations section below, so this is an observed no-evidence result rather than proof that every historical author string is absent.

### langcodestartup/b4play-poc

- Visibility: **private**; default branch: `master`; repository URL: https://github.com/langcodestartup/b4play-poc
- No matching authored PRs or authored issues were returned for the requested identity in this repository; the `kimgooneya` branch-name search also returned no match. Commit searches are covered by the limitations section below, so this is an observed no-evidence result rather than proof that every historical author string is absent.

### langcodestartup/Beyondhoneycom

- Visibility: **private**; default branch: `master`; repository URL: https://github.com/langcodestartup/Beyondhoneycom
- Evidence summary: **1 authored PRs** (1 merged, 0 closed-unmerged, 0 open); authored-issue search returned no matches; branch-name query returned no matches.
- PR #1: [Core](https://github.com/langcodestartup/Beyondhoneycom/pull/1) — created 2022-08-09T10:36:44Z; state `closed`; merged 2022-08-09T10:36:54Z; head `42a72c6668a56d5025e6b70a8fe9e88c76b99c25`; base `1a6143ef01d6f0c4226aa5477744722911da7071`; 12 commit(s).

### langcodestartup/BeyondHoneyComData

- Visibility: **private**; default branch: `master`; repository URL: https://github.com/langcodestartup/BeyondHoneyComData
- No matching authored PRs or authored issues were returned for the requested identity in this repository; the `kimgooneya` branch-name search also returned no match. Commit searches are covered by the limitations section below, so this is an observed no-evidence result rather than proof that every historical author string is absent.

### langcodestartup/BlazorAuthenticationTutorial

- Visibility: **private**; default branch: `master`; repository URL: https://github.com/langcodestartup/BlazorAuthenticationTutorial
- No matching authored PRs or authored issues were returned for the requested identity in this repository; the `kimgooneya` branch-name search also returned no match. Commit searches are covered by the limitations section below, so this is an observed no-evidence result rather than proof that every historical author string is absent.

### langcodestartup/BlazorFileUploadTest

- Visibility: **private**; default branch: `master`; repository URL: https://github.com/langcodestartup/BlazorFileUploadTest
- No matching authored PRs or authored issues were returned for the requested identity in this repository; the `kimgooneya` branch-name search also returned no match. Commit searches are covered by the limitations section below, so this is an observed no-evidence result rather than proof that every historical author string is absent.

### langcodestartup/BlazorTester

- Visibility: **private**; default branch: `master`; repository URL: https://github.com/langcodestartup/BlazorTester
- No matching authored PRs or authored issues were returned for the requested identity in this repository; the `kimgooneya` branch-name search also returned no match. Commit searches are covered by the limitations section below, so this is an observed no-evidence result rather than proof that every historical author string is absent.

### langcodestartup/BlazorWithCarbon

- Visibility: **private**; default branch: `master`; repository URL: https://github.com/langcodestartup/BlazorWithCarbon
- No matching authored PRs or authored issues were returned for the requested identity in this repository; the `kimgooneya` branch-name search also returned no match. Commit searches are covered by the limitations section below, so this is an observed no-evidence result rather than proof that every historical author string is absent.

### langcodestartup/Carbon11Test

- Visibility: **private**; default branch: `master`; repository URL: https://github.com/langcodestartup/Carbon11Test
- No matching authored PRs or authored issues were returned for the requested identity in this repository; the `kimgooneya` branch-name search also returned no match. Commit searches are covered by the limitations section below, so this is an observed no-evidence result rather than proof that every historical author string is absent.

### langcodestartup/CelltrionPowerBIFunction

- Visibility: **private**; default branch: `master`; repository URL: https://github.com/langcodestartup/CelltrionPowerBIFunction
- Evidence summary: **17 authored PRs** (17 merged, 0 closed-unmerged, 0 open); authored-issue search returned no matches; branch-name query returned no matches.
- PR #33: [LIMS mapping item  체크 로직 완료](https://github.com/langcodestartup/CelltrionPowerBIFunction/pull/33) — created 2023-04-07T05:40:19Z; state `closed`; merged 2023-04-07T05:40:45Z; head `d9b14fc7e5dd9559a8b14c57c208ceb9ec34f682`; base `2769c9e01ccea7ad108a3cccf0a03ce96c5bfc2e`; 7 commit(s).
- PR #27: [림스 맵핑 코드 미부착 판정 로직 완성](https://github.com/langcodestartup/CelltrionPowerBIFunction/pull/27) — created 2023-03-31T02:05:07Z; state `closed`; merged 2023-03-31T02:05:38Z; head `afb0d94df7d711c1e959237ea13a2197eee18834`; base `2437e3cc678469c779d1230d0c402d3765fedd80`; 2 commit(s).
- PR #23: [림스 수정 대상 조회 기능 완료](https://github.com/langcodestartup/CelltrionPowerBIFunction/pull/23) — created 2023-03-27T00:15:52Z; state `closed`; merged 2023-03-27T00:16:47Z; head `b48fa16787b3223cf68cd731bcd25cc02d3ea430`; base `0e6ca35a1a8eaae1731f28595f03196ce07c7b49`; 5 commit(s).
- PR #22: [변경 이력 기능 구현 완료](https://github.com/langcodestartup/CelltrionPowerBIFunction/pull/22) — created 2023-03-24T00:20:55Z; state `closed`; merged 2023-03-24T00:21:12Z; head `3cbd999f13dc844257288681cb8221404a2e7c6e`; base `de440e12fd34ca395ff697708420021ae8c127a4`; 2 commit(s).
- PR #21: [Dev/yeild rate variable crud](https://github.com/langcodestartup/CelltrionPowerBIFunction/pull/21) — created 2023-03-23T05:16:56Z; state `closed`; merged 2023-03-23T05:17:35Z; head `150119be721ff774f337e7f91a042bf2a77e0c43`; base `ee3a30fc77de13a37a74e1472cd91d8475a7be86`; 17 commit(s).
- PR #20: [Ad Hoc Calculation 대상 작업 완료](https://github.com/langcodestartup/CelltrionPowerBIFunction/pull/20) — created 2023-03-22T09:24:32Z; state `closed`; merged 2023-03-22T09:24:44Z; head `f94741424a99c6c7762f2888950ce4750824803c`; base `60dd8454d1ea7b6f5bad369fb9486229dd084973`; 6 commit(s).
- PR #19: [LIMS Mapping CRUD 완료](https://github.com/langcodestartup/CelltrionPowerBIFunction/pull/19) — created 2023-03-22T06:33:58Z; state `closed`; merged 2023-03-22T06:34:07Z; head `b0f496d3d26fc643cd8f0b6019371fef7849756e`; base `77f08a8edc38be90ca99ccee9e83f291c1942324`; 4 commit(s).
- PR #16: [MSP리스트 + 캠페인 생성 로직 변경 반영](https://github.com/langcodestartup/CelltrionPowerBIFunction/pull/16) — created 2023-03-21T01:31:38Z; state `closed`; merged 2023-03-21T01:31:47Z; head `92d01f12c892ba102ebc81c1ad2a0458503bef6c`; base `17067c26525015609bf6dc42424bcc7631ed11e8`; 3 commit(s).
- PR #15: [캠페인 로직 변경 반영](https://github.com/langcodestartup/CelltrionPowerBIFunction/pull/15) — created 2023-03-19T06:14:21Z; state `closed`; merged 2023-03-19T06:14:29Z; head `792de6323ccb31880ed9e19d0a9136f150a2507f`; base `934b9b79c4aa4653de0f814dd6c4f4b289f27424`; 1 commit(s).
- PR #14: [MSP 리스트, 검사 로트 수정](https://github.com/langcodestartup/CelltrionPowerBIFunction/pull/14) — created 2023-03-17T09:53:10Z; state `closed`; merged 2023-03-17T09:53:24Z; head `02bf7fec3de7dda578ccf05caa94bec4452b03ec`; base `06d06ad77ffc39004d1ef6ea273c4114226057d5`; 3 commit(s).
- PR #13: [Dev/campaign add field](https://github.com/langcodestartup/CelltrionPowerBIFunction/pull/13) — created 2023-03-17T06:13:47Z; state `closed`; merged 2023-03-17T06:13:54Z; head `fc8e1f59ad611672de89cbb98a7a8650ecff934c`; base `e61077618a3acc9009620a6cb7183f13f85ddde2`; 16 commit(s).
- PR #12: [Dev/campaing edit](https://github.com/langcodestartup/CelltrionPowerBIFunction/pull/12) — created 2023-03-13T03:35:14Z; state `closed`; merged 2023-03-13T03:35:23Z; head `5568ebd127965fef5754093aae8774b0c0bff67d`; base `c69f23f6ab05ac00bdbaa29d41f6a67a74e96686`; 6 commit(s).
- PR #11: [Dev/msp generate edit](https://github.com/langcodestartup/CelltrionPowerBIFunction/pull/11) — created 2023-03-10T11:57:20Z; state `closed`; merged 2023-03-10T11:58:15Z; head `024efceef5993cc8018df73728a36f5503551b6b`; base `a1754a35c7fb7479019a07e43f67344dacddb78c`; 5 commit(s).
- PR #10: [Dev/msp generate edit](https://github.com/langcodestartup/CelltrionPowerBIFunction/pull/10) — created 2023-03-10T09:10:05Z; state `closed`; merged 2023-03-10T09:10:13Z; head `8989f247ed6e7b135ff64ce32fe3109f2df52a11`; base `dbec7954591d2114e9bba80dc0012b23763a3264`; 2 commit(s).
- PR #9: [Dev/manufacturing edit](https://github.com/langcodestartup/CelltrionPowerBIFunction/pull/9) — created 2023-03-10T05:37:47Z; state `closed`; merged 2023-03-10T05:38:41Z; head `7b18c91c2df8e0bdbd303d9948c01bcf62e5f30c`; base `befa5d02c1737574a5059ddfc9d8fdf1a71cd1ed`; 4 commit(s).
- PR #4: [제조지시서 중복데이터 처리 로직 완료](https://github.com/langcodestartup/CelltrionPowerBIFunction/pull/4) — created 2023-03-09T05:38:24Z; state `closed`; merged 2023-03-09T05:42:46Z; head `82d81974fa41a09c213eca7f82a988b23ca23f9b`; base `9c3d600fdcb82a7a539be500efd2f2f0f3759b65`; 2 commit(s).
- PR #1: [Add campaign zp02 except logic](https://github.com/langcodestartup/CelltrionPowerBIFunction/pull/1) — created 2023-03-08T02:43:30Z; state `closed`; merged 2023-03-08T02:43:42Z; head `0f06fe297c479c512c6dbae1875a59796ac5a359`; base `5094903fff2ab680843b1492d73842f2b94c8606`; 2 commit(s).

### langcodestartup/CelltrionPowerBIWebApp

- Visibility: **private**; default branch: `Develop`; repository URL: https://github.com/langcodestartup/CelltrionPowerBIWebApp
- Evidence summary: **75 authored PRs** (72 merged, 3 closed-unmerged, 0 open); authored-issue search returned no matches; branch-name query returned no matches.
- PR #264: [Dev/cpvr table error](https://github.com/langcodestartup/CelltrionPowerBIWebApp/pull/264) — created 2023-07-17T07:48:12Z; state `closed`; merged 2023-07-17T07:48:18Z; head `b589df6c5157e82987739c56a25c0e18b3c84961`; base `89bfddf2f6bcb8f23c6eaf6a8205b3dc9bb4d99a`; 3 commit(s).
- PR #262: [🔨 CPVR CSV 다운로드 파일명 변경](https://github.com/langcodestartup/CelltrionPowerBIWebApp/pull/262) — created 2023-07-17T02:19:43Z; state `closed`; merged 2023-07-17T02:20:12Z; head `f4293070517e0dbe346c3353ac7c0a0f7328c7f3`; base `c10715bc673c6d3d763fb9df11a5157089822f80`; 1 commit(s).
- PR #260: [table error 수정 + sql 방어로직 추가](https://github.com/langcodestartup/CelltrionPowerBIWebApp/pull/260) — created 2023-07-16T03:49:14Z; state `closed`; merged 2023-07-16T03:49:31Z; head `5f422c188a1c0a9be87383268b4c99112643ee28`; base `c10eac10b954730408c53011d027a8b6f7afd864`; 3 commit(s).
- PR #257: [피드백 내용 반영](https://github.com/langcodestartup/CelltrionPowerBIWebApp/pull/257) — created 2023-07-12T07:49:32Z; state `closed`; merged 2023-07-12T07:49:39Z; head `15fd2d4fb5fe655d3fc38d7f51ebd1da18673354`; base `ea597e9c4b95a74c7514ff111e20c750671ca482`; 5 commit(s).
- PR #255: [🔨 script 수정 완료 프린트 새 창 가운데 표시 + 3줄 이상 파라미터 이름 표시 문제 수정](https://github.com/langcodestartup/CelltrionPowerBIWebApp/pull/255) — created 2023-07-11T02:00:34Z; state `closed`; merged 2023-07-11T02:00:43Z; head `3f41d37a660cc76ff0c1fbcf2a25439025d62d99`; base `32576aa5c606277af53255ce80aff2e6a1f38d7a`; 1 commit(s).
- PR #254: [쿼리 오류 수정](https://github.com/langcodestartup/CelltrionPowerBIWebApp/pull/254) — created 2023-07-10T05:09:05Z; state `closed`; merged 2023-07-10T05:09:33Z; head `bf373a8ce97e0202480e7d48b5fe4736bf90610f`; base `e3c36b59f7cd530d768caf662523e3764a807d48`; 3 commit(s).
- PR #253: [🔨 Buffer/Media query 수정](https://github.com/langcodestartup/CelltrionPowerBIWebApp/pull/253) — created 2023-07-10T03:03:54Z; state `closed`; merged 2023-07-10T03:04:01Z; head `4844e35eb35848e803eed67488cf0eab14afcb5e`; base `455fae9d5ae506a87c1219e371f1ab37e4387078`; 1 commit(s).
- PR #252: [🔨 피드백 반영 완료](https://github.com/langcodestartup/CelltrionPowerBIWebApp/pull/252) — created 2023-07-09T22:43:35Z; state `closed`; merged 2023-07-09T22:44:02Z; head `5160795809da9b66a9bb324e92a622b35e77a779`; base `777067f7ebb3892f3baecccae675c15fc197a755`; 14 commit(s).
- PR #249: [CPVR 피드백 반영](https://github.com/langcodestartup/CelltrionPowerBIWebApp/pull/249) — created 2023-07-07T03:07:56Z; state `closed`; merged 2023-07-07T03:08:03Z; head `f1bde90a11e2879050ad2b80e980d7b95dc1d8eb`; base `e201508aee5f62ad66895715a56933104cade278`; 2 commit(s).
- PR #248: [Print 페이지 나누기  기능 완성](https://github.com/langcodestartup/CelltrionPowerBIWebApp/pull/248) — created 2023-07-06T10:50:18Z; state `closed`; merged 2023-07-06T10:50:54Z; head `87c31f3a5baf136b439ebb5057b5663ad7202d3d`; base `0c362438a16ffc317fb847c5859976cceeffc9dc`; 6 commit(s).
- PR #246: [검토 용 임시 적용](https://github.com/langcodestartup/CelltrionPowerBIWebApp/pull/246) — created 2023-07-06T06:30:21Z; state `closed`; merged 2023-07-06T06:30:28Z; head `e42cbe1f9e23fa2461b974a4c8ce8554d8fd1a8a`; base `6f46d24eae5b382d850596d3eede294562b75a50`; 4 commit(s).
- PR #245: [MMA Table 기능 완료](https://github.com/langcodestartup/CelltrionPowerBIWebApp/pull/245) — created 2023-07-05T18:16:34Z; state `closed`; merged 2023-07-05T18:16:45Z; head `dc846460037d918c70b49151b1849a32483af56c`; base `6f55984df5a001e3093388bdabb2cba98da4fa45`; 20 commit(s).
- PR #242: [✨ CPVR 채번 기능 추가](https://github.com/langcodestartup/CelltrionPowerBIWebApp/pull/242) — created 2023-07-05T00:12:20Z; state `closed`; merged 2023-07-05T00:13:26Z; head `ec7b655a4c16e0b63c077892bcc919635ed24d79`; base `4520310e2f55f44523cc068f43435c81fede3caa`; 4 commit(s).
- PR #238: [✨ CPVR - Description 정렬, Prameter Show Hide 저장 기능 복구](https://github.com/langcodestartup/CelltrionPowerBIWebApp/pull/238) — created 2023-07-04T00:06:43Z; state `closed`; merged 2023-07-04T00:06:50Z; head `6ec5493e356cab182ae648d4230c937cce5af754`; base `a6bdb302c3c131683547b18dc6bb7d1cb9bf99a8`; 6 commit(s).
- PR #236: [기능 추가](https://github.com/langcodestartup/CelltrionPowerBIWebApp/pull/236) — created 2023-07-03T11:39:01Z; state `closed`; merged 2023-07-03T11:39:27Z; head `7cd59a422771a1f995b4d6f58b1596ea3868667f`; base `6ff3ee8612a01d45f3f8650f5fbe3bffd280a139`; 3 commit(s).
- PR #234: [CPVR 문제점 수정](https://github.com/langcodestartup/CelltrionPowerBIWebApp/pull/234) — created 2023-07-02T18:13:24Z; state `closed`; merged 2023-07-02T18:13:40Z; head `6533ec6654857e8d63c61ef659ed604589273d88`; base `a0d80a383b7ae7104880df03c58487479d53280f`; 6 commit(s).
- PR #232: [Dev/rework cpvr table](https://github.com/langcodestartup/CelltrionPowerBIWebApp/pull/232) — created 2023-06-29T19:52:42Z; state `closed`; merged 2023-06-29T19:52:56Z; head `6b870c9d4b1d8516051a6836468fe20d3f866ddb`; base `e4aadfef10d3319754b4930eaceb1049adf05d0d`; 7 commit(s).
- PR #231: [📌 CPVR 피드백 작업](https://github.com/langcodestartup/CelltrionPowerBIWebApp/pull/231) — created 2023-06-29T19:39:40Z; state `closed`; merged not merged; head `3001d54b053170c6e279acb5ff4088ff4e6149c1`; base `e4aadfef10d3319754b4930eaceb1049adf05d0d`; 6 commit(s).
- PR #229: [🔨 Normality 검증 수정](https://github.com/langcodestartup/CelltrionPowerBIWebApp/pull/229) — created 2023-06-29T07:41:11Z; state `closed`; merged 2023-06-29T07:41:21Z; head `1fcfeb86781015b790df9bb3d9bf06eb1d214c9b`; base `97d5526b2cfc0f70e09c5feb12d9d56a61c98f2a`; 1 commit(s).
- PR #228: [숨김 항목 안보이도록 변경](https://github.com/langcodestartup/CelltrionPowerBIWebApp/pull/228) — created 2023-06-29T06:12:05Z; state `closed`; merged 2023-06-29T06:14:02Z; head `0c5442fe053d53e407a5648f3c5564cac619586e`; base `18bcd06fe749bb75e293b12c24f3d131c0410d5a`; 6 commit(s).
- PR #227: [🔨 0629 피드백 반영](https://github.com/langcodestartup/CelltrionPowerBIWebApp/pull/227) — created 2023-06-29T06:09:41Z; state `closed`; merged 2023-06-29T06:10:58Z; head `0df5b5af2c028a6c7df31702ae5d3384ee46768f`; base `e57d1a12efd3be0f55dfd50e7d4e48aa1a45b26a`; 5 commit(s).
- PR #226: [✨ 특정 MSP 조회 기능 완료](https://github.com/langcodestartup/CelltrionPowerBIWebApp/pull/226) — created 2023-06-29T01:16:33Z; state `closed`; merged 2023-06-29T01:16:40Z; head `68a46e908b5570e564494bde3dd272f206be7b04`; base `8d15e97971e52e757cd841070cdefc9b41b04d03`; 1 commit(s).
- PR #225: [🔨 CPVR 오류 사항 반영](https://github.com/langcodestartup/CelltrionPowerBIWebApp/pull/225) — created 2023-06-29T00:20:15Z; state `closed`; merged 2023-06-29T00:21:16Z; head `059113630d1b9972dff56fa6aaf4015ddeccb0a9`; base `aa8c8cc54bdc7ae6baba1aa385509a8e04254d1e`; 8 commit(s).
- PR #220: [✨ CPVR 테이블 작업 완료](https://github.com/langcodestartup/CelltrionPowerBIWebApp/pull/220) — created 2023-06-27T19:09:24Z; state `closed`; merged 2023-06-27T19:10:09Z; head `4926e4881d4cf810d640295d3fbef2b08e80ad32`; base `f8de9df9f9953c9560edfdb8e90fb41445fa7a20`; 12 commit(s).
- PR #217: [🎨 CPVR 리포트 디자인 완료](https://github.com/langcodestartup/CelltrionPowerBIWebApp/pull/217) — created 2023-06-26T06:30:37Z; state `closed`; merged 2023-06-26T06:30:50Z; head `59da2c04f8fc3fe036a0fdbdabf22ad7fa27ce43`; base `498c0411c65b0f00ac48f612e7876fb47651c211`; 1 commit(s).
- PR #216: [📡보고용 - 리포트 프린트 기능 중간 완성](https://github.com/langcodestartup/CelltrionPowerBIWebApp/pull/216) — created 2023-06-26T01:21:55Z; state `closed`; merged 2023-06-26T01:22:25Z; head `e7c9d15d7183f6d5246b0b352e317585dd5b510f`; base `716cb82944d4e1153e42c2a6bb442ae3e85e9e5f`; 6 commit(s).
- PR #215: [비어있는 값 있을 때 리포트 표기 오류 수정](https://github.com/langcodestartup/CelltrionPowerBIWebApp/pull/215) — created 2023-06-24T16:06:31Z; state `closed`; merged 2023-06-24T16:07:02Z; head `87ba87ef6a3d8f58f3fa76e07ddbbbec862ccc8a`; base `e06a7c96a2641f5da05bbb1ce89140a78f1c0606`; 4 commit(s).
- PR #214: [작업 내용 반영](https://github.com/langcodestartup/CelltrionPowerBIWebApp/pull/214) — created 2023-06-24T07:55:25Z; state `closed`; merged 2023-06-24T07:55:32Z; head `f3d83358569ce94c47c1c844d513b44600b872f6`; base `a703a5165dbfb781bc67946aa019c1820fb2bf4d`; 21 commit(s).
- PR #210: [토요일 검토용 배포 수행](https://github.com/langcodestartup/CelltrionPowerBIWebApp/pull/210) — created 2023-06-23T12:48:17Z; state `closed`; merged 2023-06-23T12:48:35Z; head `8fc71c97a74cf0328502a152c5717e5cccbf1e2c`; base `c9b509e5201c3057e4ba24883a1e31c29758498a`; 18 commit(s).
- PR #209: [🔨임시 코드 수정](https://github.com/langcodestartup/CelltrionPowerBIWebApp/pull/209) — created 2023-06-23T01:57:35Z; state `closed`; merged 2023-06-23T01:58:01Z; head `d7ccbb4836f5f8fa17420d94742d81324c522594`; base `d36fcfc443ca45b2a639fa8fbe7b565bbb9fa31d`; 10 commit(s).
- PR #208: [임시코드 배포용](https://github.com/langcodestartup/CelltrionPowerBIWebApp/pull/208) — created 2023-06-23T00:39:17Z; state `closed`; merged 2023-06-23T00:39:25Z; head `0eecc06e12298fdc408179b9c3a22dcd4e8043b7`; base `3888fcfd31db8c3c4de88dc5e1cee308ae079102`; 6 commit(s).
- PR #205: [🔨CPVR Report Parameter순서 정보 DB 저장](https://github.com/langcodestartup/CelltrionPowerBIWebApp/pull/205) — created 2023-06-22T06:54:14Z; state `closed`; merged 2023-06-22T06:54:23Z; head `b0d3a2ab41bc1cffe9791983024dd2062140d00d`; base `0e335952dcb7ae037edc040651a76060060989b9`; 1 commit(s).
- PR #203: [🔨CPVR APQR 조회 조건 수정](https://github.com/langcodestartup/CelltrionPowerBIWebApp/pull/203) — created 2023-06-22T04:11:01Z; state `closed`; merged 2023-06-22T04:11:20Z; head `b5b92e49401daede3716f1924882127b3f373dad`; base `7ab5fa1ea94a9e3caffb2c6fb3574ad48714adce`; 2 commit(s).
- PR #201: [📌최신 내용 반영](https://github.com/langcodestartup/CelltrionPowerBIWebApp/pull/201) — created 2023-06-22T00:36:36Z; state `closed`; merged 2023-06-22T00:36:52Z; head `9c0fd2f201394ec2b52ce145ff22425065e8b9ad`; base `9fc8f5409ce2a7074c190e3cba2e9ab45170cf27`; 8 commit(s).
- PR #194: [🔨CPVR 리포트 수정](https://github.com/langcodestartup/CelltrionPowerBIWebApp/pull/194) — created 2023-06-19T00:02:17Z; state `closed`; merged 2023-06-19T00:02:42Z; head `9c475d97b25c5cb8ab09d3da2082e0834f6f5e34`; base `52abd79c4979465dd34a1168477662d68c381f8f`; 13 commit(s).
- PR #185: [✨CPVR APQR 리포트 초안 완성](https://github.com/langcodestartup/CelltrionPowerBIWebApp/pull/185) — created 2023-06-12T08:23:53Z; state `closed`; merged 2023-06-12T08:24:14Z; head `291a2a19c557d784d9c263bbcb24afa64543d706`; base `5bae3eefdbbbb2e7aa2d3f07e162810b27cf7faa`; 7 commit(s).
- PR #183: [✨CPVR 기능 추가(PD ParaName 보여주기 여부, ProcessDesc 순서 정렬)](https://github.com/langcodestartup/CelltrionPowerBIWebApp/pull/183) — created 2023-06-11T23:42:07Z; state `closed`; merged 2023-06-11T23:44:04Z; head `f413b26371078a14586c9a38b6b48afd1305c819`; base `031d3f6717323d06d533c06083a85be3e1644331`; 9 commit(s).
- PR #176: [✨ CPVR 리포트 기본 레이아웃 반영 + 원천 DB 변경 작업](https://github.com/langcodestartup/CelltrionPowerBIWebApp/pull/176) — created 2023-06-06T23:48:48Z; state `closed`; merged 2023-06-06T23:49:36Z; head `7423b7bbcce41a9317aa5b624985bbdc477bea93`; base `de25c1e1b9af05107ff08b76442486790048a3d4`; 11 commit(s).
- PR #175: [✨차트 순서대로 보여주기 작업 완료](https://github.com/langcodestartup/CelltrionPowerBIWebApp/pull/175) — created 2023-06-04T08:09:22Z; state `closed`; merged 2023-06-04T08:09:55Z; head `5bb87ff1038497c5a27acfe11b42b99705ea0e53`; base `7684bd52b51fc9c8200cb4c42e6b82796a3f8bc1`; 15 commit(s).
- PR #169: [🔨Fix 보고서 로직 수정 Cpk 계산식 분모 값 계산 수정](https://github.com/langcodestartup/CelltrionPowerBIWebApp/pull/169) — created 2023-06-01T06:38:43Z; state `closed`; merged 2023-06-01T06:38:59Z; head `97494cc751b1420b5657e28f61aed5a9a3f5a9a8`; base `88ba1ae9db4ac166bfa8b944aaf0e8aae6de00c4`; 2 commit(s).
- PR #167: [✨Feature  보고서 차트 상 DsLotModel Batch의 표시 방법 변경](https://github.com/langcodestartup/CelltrionPowerBIWebApp/pull/167) — created 2023-05-31T12:25:11Z; state `closed`; merged 2023-05-31T12:25:23Z; head `996d77cf0e58adb5d1b6be5d94ef84017f2dac3a`; base `b023c016d4609e4ced7c68f3b66189265c0f8d88`; 2 commit(s).
- PR #166: [CPVR 수정, 기능 변경](https://github.com/langcodestartup/CelltrionPowerBIWebApp/pull/166) — created 2023-05-31T07:33:57Z; state `closed`; merged 2023-05-31T07:34:23Z; head `91b357537570fa042aafc3ad9d9e28c330feff6b`; base `933487c3a860475c3db5b928c8d91e5e7f5c22fa`; 1 commit(s).
- PR #165: [🔨Fix 보고서 - 필터 값 없는 경우 처리 추가](https://github.com/langcodestartup/CelltrionPowerBIWebApp/pull/165) — created 2023-05-31T02:18:57Z; state `closed`; merged 2023-05-31T02:19:14Z; head `61c304902b949b971157903d967fcc68de0ae14c`; base `9ee27d05e7743baf7c601ad97da2d39be636988a`; 1 commit(s).
- PR #164: [✨Chart 중복 데이터 표시 기능](https://github.com/langcodestartup/CelltrionPowerBIWebApp/pull/164) — created 2023-05-31T00:31:40Z; state `closed`; merged 2023-05-31T00:31:58Z; head `4eb1d733c99a4122eb8afe2ec0d8202a029bf493`; base `b55dbee557d7edb1e3434aa1db69d99b41ee537b`; 2 commit(s).
- PR #163: [CPVR APQR 우선순위 작업 완료](https://github.com/langcodestartup/CelltrionPowerBIWebApp/pull/163) — created 2023-05-30T14:52:23Z; state `closed`; merged 2023-05-30T14:53:10Z; head `e4a9886a74d5891515d84f3db38b77f39122002c`; base `6c8204622cfb7beefd7998ce232fbe85420612a4`; 2 commit(s).
- PR #162: [✨ CPVR APQR 차트 우선 기능 작업 완료](https://github.com/langcodestartup/CelltrionPowerBIWebApp/pull/162) — created 2023-05-30T14:47:14Z; state `closed`; merged 2023-05-30T14:49:16Z; head `e4a9886a74d5891515d84f3db38b77f39122002c`; base `85a56bad9e17fd1fcd22d100d4bfa886895bc464`; 31 commit(s).
- PR #155: [🔨Fix CPVR Report 시각화 변경](https://github.com/langcodestartup/CelltrionPowerBIWebApp/pull/155) — created 2023-05-29T23:48:32Z; state `closed`; merged 2023-05-29T23:48:39Z; head `7092296ddc69811c5d81e8eaea906b08f429e6d8`; base `42a138b8248c5329c3f6428076c501223a06ad3c`; 15 commit(s).
- PR #141: [CPVR APQR 페이지 작업내역](https://github.com/langcodestartup/CelltrionPowerBIWebApp/pull/141) — created 2023-05-24T16:08:57Z; state `closed`; merged 2023-05-24T16:09:08Z; head `e0878055115deaa34c93017aa305f3667f89f2a4`; base `fac9cbb7931dd73a824391ba5c0b87817fa8af3b`; 66 commit(s).
- PR #140: [CPVR APQR 선 작업 반영](https://github.com/langcodestartup/CelltrionPowerBIWebApp/pull/140) — created 2023-05-24T16:06:55Z; state `closed`; merged not merged; head `e0878055115deaa34c93017aa305f3667f89f2a4`; base `85a56bad9e17fd1fcd22d100d4bfa886895bc464`; 70 commit(s).
- PR #122: [리포트 - APQR 보고서 FillingStartDate 항시 출력](https://github.com/langcodestartup/CelltrionPowerBIWebApp/pull/122) — created 2023-05-17T01:40:57Z; state `closed`; merged 2023-05-17T01:41:04Z; head `ca95959c13068a0eea2b914374cbf0386a39cfc6`; base `2ef42bdb8459f36a348b009feff7144d7270ce79`; 6 commit(s).
- PR #120: [리포트 필터 적용](https://github.com/langcodestartup/CelltrionPowerBIWebApp/pull/120) — created 2023-05-16T08:05:25Z; state `closed`; merged 2023-05-16T08:05:38Z; head `7c703ef2f7c1bb6137500cba04413d0609448b41`; base `7c6c176d24b292d9523984346ccf371b4eaa489c`; 5 commit(s).
- PR #118: [APQR CPVR 리포트 테이블, 차트 기본 기능 완료](https://github.com/langcodestartup/CelltrionPowerBIWebApp/pull/118) — created 2023-05-16T01:00:02Z; state `closed`; merged 2023-05-16T01:00:10Z; head `222ff1468c11bc07f5f011052eff3cae65d2fb02`; base `727e4d21a7a9b878c7d72104f655e04ae0b1ed89`; 7 commit(s).
- PR #116: [오류 수정 반영](https://github.com/langcodestartup/CelltrionPowerBIWebApp/pull/116) — created 2023-05-15T09:00:21Z; state `closed`; merged 2023-05-15T09:00:55Z; head `81c1828bdf5f751582b39f6a58e9ae38aebadd88`; base `b7a11a6a53b719f152c4195fef5c964b73d7a77d`; 5 commit(s).
- PR #114: [누락된 Description 항목 반영](https://github.com/langcodestartup/CelltrionPowerBIWebApp/pull/114) — created 2023-05-15T05:14:36Z; state `closed`; merged 2023-05-15T05:14:42Z; head `80ac2a6768f5931b8418d5cdb199cd7076492fc3`; base `a54e806b78656d8df0377c7cdeb8ee7d8ee7673b`; 1 commit(s).
- PR #113: [리포트 데이터 다운로드 기능 완성](https://github.com/langcodestartup/CelltrionPowerBIWebApp/pull/113) — created 2023-05-15T02:33:29Z; state `closed`; merged 2023-05-15T02:33:37Z; head `27d744595a88982621b185b43739f872869338c7`; base `443cb213ae13192fcaaa5d1437318930b4de4956`; 2 commit(s).
- PR #112: [현재 배포 버젼 반영 (#110)](https://github.com/langcodestartup/CelltrionPowerBIWebApp/pull/112) — created 2023-05-15T01:16:33Z; state `closed`; merged 2023-05-15T01:16:40Z; head `ddf2b60c700b5ec7069d14742cadfdc7d912fe02`; base `2a7d3310a32a84171786300e2c6d381153108cea`; 1 commit(s).
- PR #111: [현재 배포 버젼 반영 (#110)](https://github.com/langcodestartup/CelltrionPowerBIWebApp/pull/111) — created 2023-05-15T01:12:55Z; state `closed`; merged not merged; head `ddf2b60c700b5ec7069d14742cadfdc7d912fe02`; base `0773c0c31d076e1be3dfd669ef7c5171810c1617`; 1 commit(s).
- PR #110: [현재 배포 버젼 반영](https://github.com/langcodestartup/CelltrionPowerBIWebApp/pull/110) — created 2023-05-15T01:07:16Z; state `closed`; merged 2023-05-15T01:07:23Z; head `3e989047b85b46380b065b9ee0ffb497be27b1f1`; base `2a7d3310a32a84171786300e2c6d381153108cea`; 28 commit(s).
- PR #107: [리포트 - 버퍼 미디어 출력 및 검색 데이터 다운로드](https://github.com/langcodestartup/CelltrionPowerBIWebApp/pull/107) — created 2023-05-12T00:02:15Z; state `closed`; merged 2023-05-12T00:02:23Z; head `906986836baee4fd61b974c586a536fdbda7b865`; base `ab19eb06bb7e5cbf2a578e31978ea5d9433ac966`; 5 commit(s).
- PR #106: [차트 안그려지는 버그 수정](https://github.com/langcodestartup/CelltrionPowerBIWebApp/pull/106) — created 2023-05-11T04:04:42Z; state `closed`; merged 2023-05-11T04:04:51Z; head `8cf1851e3f77d193652a0009055dd6efac69c796`; base `a2b33b2a99fdfafbafc9d7f6b37d02512f55d65e`; 1 commit(s).
- PR #105: [Working/report query](https://github.com/langcodestartup/CelltrionPowerBIWebApp/pull/105) — created 2023-05-11T00:17:16Z; state `closed`; merged 2023-05-11T00:17:27Z; head `16c378b8238c727bbdb9efb9142e2a29a1472bda`; base `dbabf3f3927ec9fc94d048f12f0bc7683ff4f478`; 25 commit(s).
- PR #99: [차트 표시 완료](https://github.com/langcodestartup/CelltrionPowerBIWebApp/pull/99) — created 2023-04-29T11:46:20Z; state `closed`; merged 2023-04-29T11:46:42Z; head `71bdb666c008c193b9b6912b18d6c730c280fd79`; base `637810f3f16982a4276983dbc6fa050af81c93fa`; 10 commit(s).
- PR #95: [보고서 기능 1차 완료](https://github.com/langcodestartup/CelltrionPowerBIWebApp/pull/95) — created 2023-04-24T13:16:07Z; state `closed`; merged 2023-04-24T13:16:19Z; head `d28b51987be4c01ffbff0c3359d42f623e335ecf`; base `686a85a5a78fc08d23b07dec408b09f974ab6a21`; 54 commit(s).
- PR #73: [LIMS  Mapping refactoring 완료](https://github.com/langcodestartup/CelltrionPowerBIWebApp/pull/73) — created 2023-04-07T02:01:21Z; state `closed`; merged 2023-04-07T02:01:30Z; head `35624aa99f417eeb5393e19eb105d4aca6dd987c`; base `e0d3a7e6cce78e268c9dd9069e4372a50a10e161`; 40 commit(s).
- PR #68: [현재 배포 기준 Core 설정](https://github.com/langcodestartup/CelltrionPowerBIWebApp/pull/68) — created 2023-04-04T01:29:23Z; state `closed`; merged 2023-04-04T01:29:29Z; head `6fbb7f122a54547dbc758a47c5c3b46fa72b1cdd`; base `2bd2fffd90ea18c7ed12b69d3703d7ffa8be224c`; 2 commit(s).
- PR #67: [Yield API CRUD 완성](https://github.com/langcodestartup/CelltrionPowerBIWebApp/pull/67) — created 2023-04-04T00:48:56Z; state `closed`; merged 2023-04-04T00:49:03Z; head `ff926b23377a3e717d4b33a931f38ae07d0b4c11`; base `388f3871a1d263f625b3de4beea736ef5c0a075e`; 3 commit(s).
- PR #65: [일부 사항 변경 후 다른 작업을 위한 중간 커밋](https://github.com/langcodestartup/CelltrionPowerBIWebApp/pull/65) — created 2023-03-31T07:58:00Z; state `closed`; merged 2023-03-31T07:58:15Z; head `528b008509cc2b0b3fcf32745b9659128d968453`; base `57bf0054733fd2afb7d4a8da8ec90c6f8edb5db2`; 6 commit(s).
- PR #60: [API Refactoring 진행](https://github.com/langcodestartup/CelltrionPowerBIWebApp/pull/60) — created 2023-03-30T01:47:05Z; state `closed`; merged 2023-03-30T01:47:13Z; head `d3dc2a95e92cd3f62ce5883f645e1dd6e6675fa7`; base `d1d58945f919708c716276bf4e02b5e2f1b9d82f`; 16 commit(s).
- PR #58: [SpecBasic API 완료](https://github.com/langcodestartup/CelltrionPowerBIWebApp/pull/58) — created 2023-03-29T07:36:21Z; state `closed`; merged 2023-03-29T07:36:35Z; head `9a1c4fd125ab89d3d6d760f1f1eca4f078c44010`; base `ba6ddff35c4ac835d336672c3599feede0722921`; 6 commit(s).
- PR #57: [CalculationTargetModel API CRUD 기능 완성](https://github.com/langcodestartup/CelltrionPowerBIWebApp/pull/57) — created 2023-03-29T06:59:26Z; state `closed`; merged 2023-03-29T06:59:33Z; head `515f866877ddc07f9d092f175faa8b02e7b914ed`; base `7ce6eab65f4a21fea677abd17fd4164f10838f10`; 5 commit(s).
- PR #56: [림스 CRUD과 관련한 체이닝 로직 수정 페이지 네이션 표시 오류 수정](https://github.com/langcodestartup/CelltrionPowerBIWebApp/pull/56) — created 2023-03-29T02:52:23Z; state `closed`; merged 2023-03-29T02:52:30Z; head `395edc1302c536c00ada89aaa34d4c8d79bd0dff`; base `e3d4202cbb5e40c5ae62201ff7a2a56aed6d92a6`; 24 commit(s).
- PR #50: [림스 코드 수정 로직 중간 반영](https://github.com/langcodestartup/CelltrionPowerBIWebApp/pull/50) — created 2023-03-28T06:06:39Z; state `closed`; merged 2023-03-28T06:06:47Z; head `cc761de944ae6c4c32b78407d0959c3e31e7a82e`; base `5f3baced505bdedb2b531c1cd86931fcf4d3607a`; 16 commit(s).
- PR #49: [림스 데이터 테이블 UI 기능 개선 및 변경](https://github.com/langcodestartup/CelltrionPowerBIWebApp/pull/49) — created 2023-03-28T00:43:13Z; state `closed`; merged 2023-03-28T00:43:27Z; head `46fd3fd4fba41f6e96474d8eb0c2f3b05542c39c`; base `f5f7478c1422bbd82b5525a425465b9abfcdc7b8`; 7 commit(s).
- PR #48: [림스 업데이트 오타수정](https://github.com/langcodestartup/CelltrionPowerBIWebApp/pull/48) — created 2023-03-27T02:45:16Z; state `closed`; merged 2023-03-27T02:45:23Z; head `bce52774fa15bbba456765bd0b60eb058cf35711`; base `44a6113747a2230ebab99fe38cd9f4e00acb653e`; 2 commit(s).
- PR #45: [림스 기능 구현](https://github.com/langcodestartup/CelltrionPowerBIWebApp/pull/45) — created 2023-03-27T00:14:22Z; state `closed`; merged 2023-03-27T00:14:38Z; head `872d4ebea9570ac94729047c6c6b128014204f49`; base `c76c711ed0c034b2e9efead9070487a4065a9553`; 14 commit(s).

### langcodestartup/CelltrionStastics

- Visibility: **private**; default branch: `master`; repository URL: https://github.com/langcodestartup/CelltrionStastics
- No matching authored PRs or authored issues were returned for the requested identity in this repository; the `kimgooneya` branch-name search also returned no match. Commit searches are covered by the limitations section below, so this is an observed no-evidence result rather than proof that every historical author string is absent.

### langcodestartup/CES

- Visibility: **private**; default branch: `master`; repository URL: https://github.com/langcodestartup/CES
- No matching authored PRs or authored issues were returned for the requested identity in this repository; the `kimgooneya` branch-name search also returned no match. Commit searches are covered by the limitations section below, so this is an observed no-evidence result rather than proof that every historical author string is absent.

### langcodestartup/ChanelPoC

- Visibility: **private**; default branch: `master`; repository URL: https://github.com/langcodestartup/ChanelPoC
- No matching authored PRs or authored issues were returned for the requested identity in this repository; the `kimgooneya` branch-name search also returned no match. Commit searches are covered by the limitations section below, so this is an observed no-evidence result rather than proof that every historical author string is absent.

### langcodestartup/ChanelPoCApp

- Visibility: **private**; default branch: `master`; repository URL: https://github.com/langcodestartup/ChanelPoCApp
- No matching authored PRs or authored issues were returned for the requested identity in this repository; the `kimgooneya` branch-name search also returned no match. Commit searches are covered by the limitations section below, so this is an observed no-evidence result rather than proof that every historical author string is absent.

### langcodestartup/Changshin

- Visibility: **private**; default branch: `master`; repository URL: https://github.com/langcodestartup/Changshin
- No matching authored PRs or authored issues were returned for the requested identity in this repository; the `kimgooneya` branch-name search also returned no match. Commit searches are covered by the limitations section below, so this is an observed no-evidence result rather than proof that every historical author string is absent.

### langcodestartup/ChangshinV2

- Visibility: **private**; default branch: `master`; repository URL: https://github.com/langcodestartup/ChangshinV2
- No matching authored PRs or authored issues were returned for the requested identity in this repository; the `kimgooneya` branch-name search also returned no match. Commit searches are covered by the limitations section below, so this is an observed no-evidence result rather than proof that every historical author string is absent.

### langcodestartup/ChangshinV3

- Visibility: **private**; default branch: `master`; repository URL: https://github.com/langcodestartup/ChangshinV3
- No matching authored PRs or authored issues were returned for the requested identity in this repository; the `kimgooneya` branch-name search also returned no match. Commit searches are covered by the limitations section below, so this is an observed no-evidence result rather than proof that every historical author string is absent.

### langcodestartup/ChatbotMockup

- Visibility: **private**; default branch: `master`; repository URL: https://github.com/langcodestartup/ChatbotMockup
- No matching authored PRs or authored issues were returned for the requested identity in this repository; the `kimgooneya` branch-name search also returned no match. Commit searches are covered by the limitations section below, so this is an observed no-evidence result rather than proof that every historical author string is absent.

### langcodestartup/ChopSticksPocApi

- Visibility: **private**; default branch: `master`; repository URL: https://github.com/langcodestartup/ChopSticksPocApi
- No matching authored PRs or authored issues were returned for the requested identity in this repository; the `kimgooneya` branch-name search also returned no match. Commit searches are covered by the limitations section below, so this is an observed no-evidence result rather than proof that every historical author string is absent.

### langcodestartup/CommonModelSample

- Visibility: **private**; default branch: `master`; repository URL: https://github.com/langcodestartup/CommonModelSample
- No matching authored PRs or authored issues were returned for the requested identity in this repository; the `kimgooneya` branch-name search also returned no match. Commit searches are covered by the limitations section below, so this is an observed no-evidence result rather than proof that every historical author string is absent.

### langcodestartup/ConferenceRoomScheduler

- Visibility: **private**; default branch: `master`; repository URL: https://github.com/langcodestartup/ConferenceRoomScheduler
- No matching authored PRs or authored issues were returned for the requested identity in this repository; the `kimgooneya` branch-name search also returned no match. Commit searches are covered by the limitations section below, so this is an observed no-evidence result rather than proof that every historical author string is absent.

### langcodestartup/CookieServiceProvider

- Visibility: **private**; default branch: `master`; repository URL: https://github.com/langcodestartup/CookieServiceProvider
- No matching authored PRs or authored issues were returned for the requested identity in this repository; the `kimgooneya` branch-name search also returned no match. Commit searches are covered by the limitations section below, so this is an observed no-evidence result rather than proof that every historical author string is absent.

### langcodestartup/CosmosGettingStarted

- Visibility: **private**; default branch: `master`; repository URL: https://github.com/langcodestartup/CosmosGettingStarted
- No matching authored PRs or authored issues were returned for the requested identity in this repository; the `kimgooneya` branch-name search also returned no match. Commit searches are covered by the limitations section below, so this is an observed no-evidence result rather than proof that every historical author string is absent.

### langcodestartup/CTKCLIP

- Visibility: **private**; default branch: `master`; repository URL: https://github.com/langcodestartup/CTKCLIP
- No matching authored PRs or authored issues were returned for the requested identity in this repository; the `kimgooneya` branch-name search also returned no match. Commit searches are covered by the limitations section below, so this is an observed no-evidence result rather than proof that every historical author string is absent.

### langcodestartup/CXP_ARM_Template

- Visibility: **private**; default branch: `main`; repository URL: https://github.com/langcodestartup/CXP_ARM_Template
- No matching authored PRs or authored issues were returned for the requested identity in this repository; the `kimgooneya` branch-name search also returned no match. Commit searches are covered by the limitations section below, so this is an observed no-evidence result rather than proof that every historical author string is absent.

### langcodestartup/cxp_telemetry_receiver

- Visibility: **private**; default branch: `main`; repository URL: https://github.com/langcodestartup/cxp_telemetry_receiver
- No matching authored PRs or authored issues were returned for the requested identity in this repository; the `kimgooneya` branch-name search also returned no match. Commit searches are covered by the limitations section below, so this is an observed no-evidence result rather than proof that every historical author string is absent.

### langcodestartup/cxp-be

- Visibility: **private**; default branch: `main`; repository URL: https://github.com/langcodestartup/cxp-be
- No matching authored PRs or authored issues were returned for the requested identity in this repository; the `kimgooneya` branch-name search also returned no match. Commit searches are covered by the limitations section below, so this is an observed no-evidence result rather than proof that every historical author string is absent.

### langcodestartup/cxp-document

- Visibility: **private**; default branch: `main`; repository URL: https://github.com/langcodestartup/cxp-document
- No matching authored PRs or authored issues were returned for the requested identity in this repository; the `kimgooneya` branch-name search also returned no match. Commit searches are covered by the limitations section below, so this is an observed no-evidence result rather than proof that every historical author string is absent.

### langcodestartup/CXP-ERD

- Visibility: **private**; default branch: `main`; repository URL: https://github.com/langcodestartup/CXP-ERD
- No matching authored PRs or authored issues were returned for the requested identity in this repository; the `kimgooneya` branch-name search also returned no match. Commit searches are covered by the limitations section below, so this is an observed no-evidence result rather than proof that every historical author string is absent.

### langcodestartup/cxp-light-fe

- Visibility: **private**; default branch: `main`; repository URL: https://github.com/langcodestartup/cxp-light-fe
- Evidence summary: **15 authored PRs** (15 merged, 0 closed-unmerged, 0 open); authored-issue search returned no matches; branch-name query returned no matches.
- PR #16: [feat: BFF Auth Proxy 적용 — cross-origin 인증 쿠키 문제 해결](https://github.com/langcodestartup/cxp-light-fe/pull/16) — created 2026-03-20T07:34:36Z; state `closed`; merged 2026-03-20T07:34:57Z; head `554807efa73d20e79e9d4dde6ed200da8849e605`; base `ce4ecb54abf36c468c8404f1c407ee669518ee9d`; 1 commit(s).
- PR #15: [chore: main 브랜치 정리 — 디자인/목업 삭제 및 문서 추가](https://github.com/langcodestartup/cxp-light-fe/pull/15) — created 2026-03-20T03:07:54Z; state `closed`; merged 2026-03-20T03:08:07Z; head `377c56c68eb2a702cc2b571ecda9cfd610d02b6a`; base `b5da785f917892edd564ed56786af531d19fa147`; 3 commit(s).
- PR #14: [chore: 배포 설정 보완 — 가이드 대비 Gap 수정](https://github.com/langcodestartup/cxp-light-fe/pull/14) — created 2026-03-20T02:26:35Z; state `closed`; merged 2026-03-20T02:26:48Z; head `73acee23054b525d897db97bf4f313c029ad51e2`; base `4272d7366d91683139c010c595770f065866d756`; 3 commit(s).
- PR #13: [chore: standalone 배포 설정 + 환경변수 통일](https://github.com/langcodestartup/cxp-light-fe/pull/13) — created 2026-03-20T00:56:44Z; state `closed`; merged 2026-03-20T00:56:56Z; head `6aa631435ee38f057f42e625bf52dfbff3acab89`; base `56064d163a229c49da1dc21f52fc031fc06c57a7`; 2 commit(s).
- PR #12: [feat: 모델 관리 페이지 유형별 설정 지원 (#12)](https://github.com/langcodestartup/cxp-light-fe/pull/12) — created 2026-03-17T05:27:54Z; state `closed`; merged 2026-03-17T05:28:06Z; head `13ce2ee5c84795192e4080795ba50f9afdc4128e`; base `adc18d94de4aae169343f600bb679b8914ad1378`; 7 commit(s).
- PR #11: [feat: 채팅 페이지 모델 셀렉트박스를 조직 모델 API로 전환](https://github.com/langcodestartup/cxp-light-fe/pull/11) — created 2026-03-17T04:48:57Z; state `closed`; merged 2026-03-17T04:49:09Z; head `c90c6426156fdda049bb5b6e31c4de6e1f312b8a`; base `b35b490f80b894f38d53556e612084ed23f21879`; 1 commit(s).
- PR #10: [refactor: 모델 관리를 모달에서 별도 페이지로 전환](https://github.com/langcodestartup/cxp-light-fe/pull/10) — created 2026-03-17T04:37:59Z; state `closed`; merged 2026-03-17T04:38:14Z; head `f839228b53f9532ca78b37aa0e2e64c5aff6b59d`; base `eb27025cfd4429064c0fa6370089b8a97c65fbbe`; 1 commit(s).
- PR #9: [feat: 프로필 페이지에서 닉네임 수정 기능 추가](https://github.com/langcodestartup/cxp-light-fe/pull/9) — created 2026-03-17T04:01:28Z; state `closed`; merged 2026-03-17T04:01:40Z; head `69ec943a606f80b3d1885a5a610fa62b261cedc6`; base `3ae1cfeefe07f040614c28e0e5bfdc6b97fd7808`; 1 commit(s).
- PR #8: [feat: 프로바이더/모델 관리 UI 분리](https://github.com/langcodestartup/cxp-light-fe/pull/8) — created 2026-03-17T02:56:12Z; state `closed`; merged 2026-03-17T02:56:37Z; head `779bdf5e2f9804ae5f03956d3aafee83541669cf`; base `05c8a60cf810ef5019afb363524ce77f8c70aa35`; 1 commit(s).
- PR #7: [refactor: Settings 페이지를 사이드 패널 레이아웃으로 리팩토링](https://github.com/langcodestartup/cxp-light-fe/pull/7) — created 2026-03-17T02:55:38Z; state `closed`; merged 2026-03-17T02:55:58Z; head `1d06f75ded6c34cc2ca37067f0d29b332d3411a4`; base `1beefb771b28ac98f9c90383a09d16720fc2cf4a`; 1 commit(s).
- PR #6: [fix: 설정 탭을 관리자 전용으로 변경](https://github.com/langcodestartup/cxp-light-fe/pull/6) — created 2026-03-17T02:22:14Z; state `closed`; merged 2026-03-17T02:22:30Z; head `09aff3c99f46ae9aa663b03015a263d007c475f9`; base `9531e4f6d288f172ca21f325d7e0ef85aec2205c`; 1 commit(s).
- PR #5: [fix: 가입 요청 상태 Select를 상태 컬럼으로 이동 및 확인 버튼 조건부 표시](https://github.com/langcodestartup/cxp-light-fe/pull/5) — created 2026-03-17T01:33:14Z; state `closed`; merged 2026-03-17T01:33:27Z; head `fd34177e4088c087beb5cf9eef96a9762dd2b69c`; base `3140bae7e2ee671fa70d6aed2bef4013036dbb43`; 1 commit(s).
- PR #4: [fix: 가입 신청 거부 상태 표시 버그 수정 및 관리 UI 개선](https://github.com/langcodestartup/cxp-light-fe/pull/4) — created 2026-03-17T01:24:50Z; state `closed`; merged 2026-03-17T01:26:45Z; head `eb8113032fc62057a0a4359ad9ecafc30cb156c6`; base `41f9db293956af642ac4c7f3913b0ca8315fe55f`; 2 commit(s).
- PR #3: [feat: 초대 관리 탭에서 거절된 참여 요청도 표시](https://github.com/langcodestartup/cxp-light-fe/pull/3) — created 2026-03-16T09:52:28Z; state `closed`; merged 2026-03-16T09:52:37Z; head `4f64236f974afe027e121782725189bbe8501c08`; base `2d21637f049cae4a79d26e1aa1f5f70b62f62014`; 1 commit(s).
- PR #2: [feat: Cookie-only 인증 방식으로 전환](https://github.com/langcodestartup/cxp-light-fe/pull/2) — created 2026-03-16T09:33:06Z; state `closed`; merged 2026-03-16T09:33:14Z; head `34e54ea0224c77d6c19313abe1277f61c90eefe0`; base `956e8e7e9899b3e5b019787f23d140d2a5a26f26`; 2 commit(s).

### langcodestartup/cxp-onpremise-front

- Visibility: **private**; default branch: `main`; repository URL: https://github.com/langcodestartup/cxp-onpremise-front
- No matching authored PRs or authored issues were returned for the requested identity in this repository; the `kimgooneya` branch-name search also returned no match. Commit searches are covered by the limitations section below, so this is an observed no-evidence result rather than proof that every historical author string is absent.

### langcodestartup/cxp-search

- Visibility: **private**; default branch: `main`; repository URL: https://github.com/langcodestartup/cxp-search
- No matching authored PRs or authored issues were returned for the requested identity in this repository; the `kimgooneya` branch-name search also returned no match. Commit searches are covered by the limitations section below, so this is an observed no-evidence result rather than proof that every historical author string is absent.

### langcodestartup/cxp-v3-mono

- Visibility: **private**; default branch: `master`; repository URL: https://github.com/langcodestartup/cxp-v3-mono
- No matching authored PRs or authored issues were returned for the requested identity in this repository; the `kimgooneya` branch-name search also returned no match. Commit searches are covered by the limitations section below, so this is an observed no-evidence result rather than proof that every historical author string is absent.

### langcodestartup/CXP.Global

- Visibility: **private**; default branch: `master`; repository URL: https://github.com/langcodestartup/CXP.Global
- No matching authored PRs or authored issues were returned for the requested identity in this repository; the `kimgooneya` branch-name search also returned no match. Commit searches are covered by the limitations section below, so this is an observed no-evidence result rather than proof that every historical author string is absent.

### langcodestartup/CXP.LGUplus

- Visibility: **private**; default branch: `master`; repository URL: https://github.com/langcodestartup/CXP.LGUplus
- No matching authored PRs or authored issues were returned for the requested identity in this repository; the `kimgooneya` branch-name search also returned no match. Commit searches are covered by the limitations section below, so this is an observed no-evidence result rather than proof that every historical author string is absent.

### langcodestartup/CXPDemo.v2

- Visibility: **private**; default branch: `master`; repository URL: https://github.com/langcodestartup/CXPDemo.v2
- No matching authored PRs or authored issues were returned for the requested identity in this repository; the `kimgooneya` branch-name search also returned no match. Commit searches are covered by the limitations section below, so this is an observed no-evidence result rather than proof that every historical author string is absent.

### langcodestartup/CXPDevTest

- Visibility: **private**; default branch: `master`; repository URL: https://github.com/langcodestartup/CXPDevTest
- No matching authored PRs or authored issues were returned for the requested identity in this repository; the `kimgooneya` branch-name search also returned no match. Commit searches are covered by the limitations section below, so this is an observed no-evidence result rather than proof that every historical author string is absent.

### langcodestartup/DanalPoC

- Visibility: **private**; default branch: `master`; repository URL: https://github.com/langcodestartup/DanalPoC
- No matching authored PRs or authored issues were returned for the requested identity in this repository; the `kimgooneya` branch-name search also returned no match. Commit searches are covered by the limitations section below, so this is an observed no-evidence result rather than proof that every historical author string is absent.

### langcodestartup/Datavoucher2023

- Visibility: **private**; default branch: `master`; repository URL: https://github.com/langcodestartup/Datavoucher2023
- No matching authored PRs or authored issues were returned for the requested identity in this repository; the `kimgooneya` branch-name search also returned no match. Commit searches are covered by the limitations section below, so this is an observed no-evidence result rather than proof that every historical author string is absent.

### langcodestartup/dcai-mock

- Visibility: **public**; default branch: `master`; repository URL: https://github.com/langcodestartup/dcai-mock
- No matching authored PRs or authored issues were returned for the requested identity in this repository; the `kimgooneya` branch-name search also returned no match. Commit searches are covered by the limitations section below, so this is an observed no-evidence result rather than proof that every historical author string is absent.

### langcodestartup/dcai-onpremise

- Visibility: **private**; default branch: `main`; repository URL: https://github.com/langcodestartup/dcai-onpremise
- Evidence summary: **8 authored PRs** (8 merged, 0 closed-unmerged, 0 open); authored-issue search returned no matches; branch-name query returned no matches.
- PR #8: [Remove React interface and refine agent implementations](https://github.com/langcodestartup/dcai-onpremise/pull/8) — created 2025-12-10T10:18:56Z; state `closed`; merged 2025-12-10T10:19:18Z; head `f6fae650ea9562fb16e145e3fc037da282f5e562`; base `3179088feba175ba02b767c4ca9c2b90fb4e3eba`; 4 commit(s).
- PR #7: [오케스트레이션](https://github.com/langcodestartup/dcai-onpremise/pull/7) — created 2025-11-18T11:57:22Z; state `closed`; merged 2025-11-18T11:57:28Z; head `ea9e89eb373bcc30a8f19fa23524996c29b0e600`; base `64327122579eb686b87b584e013366720ac2e76e`; 2 commit(s).
- PR #6: [Update meeting minutes template and add multilingual support](https://github.com/langcodestartup/dcai-onpremise/pull/6) — created 2025-11-18T03:24:25Z; state `closed`; merged 2025-11-18T03:24:54Z; head `a4783b4fcb713eafcf8e804ab0a5ff559f03385c`; base `09890b42fd295636ef703ce37bdc0ed3bbeb715c`; 6 commit(s).
- PR #5: [Feature/remove-old-orchestration](https://github.com/langcodestartup/dcai-onpremise/pull/5) — created 2025-11-17T11:37:01Z; state `closed`; merged 2025-11-17T11:37:12Z; head `e1a164410bfbe012fa1a9155733ca46de25dac85`; base `46cc891b8aa5d811c932c94ee49dbe424287f1e9`; 11 commit(s).
- PR #4: [Implement agent handoff workflow orchestration](https://github.com/langcodestartup/dcai-onpremise/pull/4) — created 2025-11-17T11:32:24Z; state `closed`; merged 2025-11-17T11:38:19Z; head `5c83cc02901a0c7680cca76dbcd91beeda26e3e6`; base `46cc891b8aa5d811c932c94ee49dbe424287f1e9`; 1 commit(s).
- PR #3: [feat: Implement urgent alerts and 3-panel dashboard layout](https://github.com/langcodestartup/dcai-onpremise/pull/3) — created 2025-11-12T10:42:01Z; state `closed`; merged 2025-11-12T10:50:49Z; head `2da4106741d9c5809d4b919b1651858c110c079d`; base `3a2ec89cb3e43134bedabe6813d57b04583dc61a`; 1 commit(s).
- PR #2: [feat: Implement light/dark theme toggle functionality](https://github.com/langcodestartup/dcai-onpremise/pull/2) — created 2025-11-11T12:53:08Z; state `closed`; merged 2025-11-11T12:55:31Z; head `7b7f8b338d4bbd2d1863d91e2f85717023204d8c`; base `ca781eeda58e33574382ebaf6e7bc836849d937c`; 1 commit(s).
- PR #1: [feat: Complete Phase 4 - AI Agents Implementation (F011-F016)](https://github.com/langcodestartup/dcai-onpremise/pull/1) — created 2025-11-11T12:44:35Z; state `closed`; merged 2025-11-11T12:46:04Z; head `ca99d6067916ff28b7b93f0441dbcb787a894efa`; base `28048eaf2b1901f0e8a9caa46ab59e5f1041fc71`; 3 commit(s).

### langcodestartup/DotNetTest

- Visibility: **private**; default branch: `master`; repository URL: https://github.com/langcodestartup/DotNetTest
- No matching authored PRs or authored issues were returned for the requested identity in this repository; the `kimgooneya` branch-name search also returned no match. Commit searches are covered by the limitations section below, so this is an observed no-evidence result rather than proof that every historical author string is absent.

### langcodestartup/ECMdemo

- Visibility: **private**; default branch: `master`; repository URL: https://github.com/langcodestartup/ECMdemo
- No matching authored PRs or authored issues were returned for the requested identity in this repository; the `kimgooneya` branch-name search also returned no match. Commit searches are covered by the limitations section below, so this is an observed no-evidence result rather than proof that every historical author string is absent.

### langcodestartup/Emart24

- Visibility: **private**; default branch: `master`; repository URL: https://github.com/langcodestartup/Emart24
- No matching authored PRs or authored issues were returned for the requested identity in this repository; the `kimgooneya` branch-name search also returned no match. Commit searches are covered by the limitations section below, so this is an observed no-evidence result rather than proof that every historical author string is absent.

### langcodestartup/ExampleApp

- Visibility: **public**; default branch: `master`; repository URL: https://github.com/langcodestartup/ExampleApp
- No matching authored PRs or authored issues were returned for the requested identity in this repository; the `kimgooneya` branch-name search also returned no match. Commit searches are covered by the limitations section below, so this is an observed no-evidence result rather than proof that every historical author string is absent.

### langcodestartup/ExampleUploadToBlob

- Visibility: **private**; default branch: `master`; repository URL: https://github.com/langcodestartup/ExampleUploadToBlob
- No matching authored PRs or authored issues were returned for the requested identity in this repository; the `kimgooneya` branch-name search also returned no match. Commit searches are covered by the limitations section below, so this is an observed no-evidence result rather than proof that every historical author string is absent.

### langcodestartup/excel-parser

- Visibility: **public**; default branch: `main`; repository URL: https://github.com/langcodestartup/excel-parser
- Evidence summary: **12 authored PRs** (11 merged, 0 closed-unmerged, 1 open); authored-issue search returned no matches; branch-name query returned no matches.
- PR #26: [[codex] 희소 시계열 날짜 행 보존](https://github.com/langcodestartup/excel-parser/pull/26) — created 2026-06-13T15:49:05Z; state `closed`; merged 2026-06-13T15:52:43Z; head `b0f9e9a2496482d4c7d1b02d0409c13a3f11f07a`; base `f73e504fab4c412c6bb9761f1a69b6d24049aa95`; 1 commit(s).
- PR #25: [[codex] BIS Quarterly Series 코드 헤더 탐지](https://github.com/langcodestartup/excel-parser/pull/25) — created 2026-06-13T15:42:14Z; state `closed`; merged 2026-06-13T15:47:59Z; head `2a5b3607b7a4e024c86d85230808ddb5f92065fe`; base `88bc785d62cc6f544335ebb2eec733802aba2db9`; 1 commit(s).
- PR #21: [[codex] 빈 헤더 선행 키 컬럼 보존](https://github.com/langcodestartup/excel-parser/pull/21) — created 2026-06-12T13:54:45Z; state `closed`; merged 2026-06-12T13:56:18Z; head `cfe49c5a53ac2867da6e00969fc650afe141ee4c`; base `3f8a489e2a9fbccc0467c15db1d52a0b763739b5`; 1 commit(s).
- PR #20: [[codex] date dtype 캐스팅 실패 시 extract 중단 방지](https://github.com/langcodestartup/excel-parser/pull/20) — created 2026-06-12T13:43:28Z; state `open`; merged not merged; head `031503238a94bbd6271eadb218eb31aa4895f0f9`; base `3f8a489e2a9fbccc0467c15db1d52a0b763739b5`; 1 commit(s).
- PR #15: [feat: 블록 단위 오버라이드 채널 [D7] — 적층 테이블의 개별 블록 header_row 지정 (#9)](https://github.com/langcodestartup/excel-parser/pull/15) — created 2026-06-12T06:54:00Z; state `closed`; merged 2026-06-12T07:21:59Z; head `5af41afa00d9bfd3c81e49c43a22356780119702`; base `834a712006517baa8c2732d8b7df169e059dc5fe`; 9 commit(s).
- PR #14: [fix: v1 inspect()와 v2 extract()의 비정형 시트 판정 불일치 해소 (#10)](https://github.com/langcodestartup/excel-parser/pull/14) — created 2026-06-12T05:25:36Z; state `closed`; merged 2026-06-12T06:14:41Z; head `9f7dea3a145d85f5649ad7dc5d0f09c3d5c0dae1`; base `fac27ae73fd3a1c974f060692283411ffa8c1d3e`; 1 commit(s).
- PR #13: [헤더 점수 type_consistency에 lookahead 증거 가중 적용 (issue #8 제안 2)](https://github.com/langcodestartup/excel-parser/pull/13) — created 2026-06-12T01:13:35Z; state `closed`; merged 2026-06-12T01:57:17Z; head `917acc512f11acfa81f1fcb0f0ba5a52e14acec0`; base `5f69704458602143a08a594fcbedc4a158d4168e`; 2 commit(s).
- PR #12: [fix: 병합 제목행이 다단 헤더 밴드를 통째로 무효화하던 문제 (#7)](https://github.com/langcodestartup/excel-parser/pull/12) — created 2026-06-12T01:10:06Z; state `closed`; merged 2026-06-12T01:43:57Z; head `b4011b66472b09d65eada7d9078bac4dcd7851ef`; base `68f083ce92966b2f8e9094f4b46fd7127c5bf1a9`; 1 commit(s).
- PR #11: [헤더 위에서 흡수된 행을 notes로 표면화 (issue #8 제안 1)](https://github.com/langcodestartup/excel-parser/pull/11) — created 2026-06-12T01:03:20Z; state `closed`; merged 2026-06-12T01:54:15Z; head `d5b3100ac3207485e7f0fca8ac87072c479dcbba`; base `68f083ce92966b2f8e9094f4b46fd7127c5bf1a9`; 1 commit(s).
- PR #6: [fix: 비표(non-tabular) 판정을 텍스트 시작 열에 무관한 내용 인식형 휴리스틱으로 개선 (#3)](https://github.com/langcodestartup/excel-parser/pull/6) — created 2026-06-11T23:57:17Z; state `closed`; merged 2026-06-12T03:29:10Z; head `700164b8184e979487677eec1afe158ea8faf9a3`; base `4446543ef0e2b05c0a9099b60a566facca0fed93`; 8 commit(s).
- PR #5: [fix: 세로 병합 헤더 컬럼명이 ColumnProfile.name에 누락되던 문제 (#1)](https://github.com/langcodestartup/excel-parser/pull/5) — created 2026-06-11T01:43:11Z; state `closed`; merged 2026-06-11T01:59:06Z; head `058d19ddb8b143daafd965e39d3b9c9fa66f0d32`; base `c13f57ad9717e5e6194d8ba96f4340d0dc7ce8f7`; 2 commit(s).
- PR #4: [제외된 소계/합계 행을 notes로 표면화 (issue #2)](https://github.com/langcodestartup/excel-parser/pull/4) — created 2026-06-11T01:43:09Z; state `closed`; merged 2026-06-11T01:48:26Z; head `edc5da4246a826f51270357e147a4592f3916d6a`; base `c13f57ad9717e5e6194d8ba96f4340d0dc7ce8f7`; 2 commit(s).

### langcodestartup/FFmpegFunction

- Visibility: **private**; default branch: `master`; repository URL: https://github.com/langcodestartup/FFmpegFunction
- No matching authored PRs or authored issues were returned for the requested identity in this repository; the `kimgooneya` branch-name search also returned no match. Commit searches are covered by the limitations section below, so this is an observed no-evidence result rather than proof that every historical author string is absent.

### langcodestartup/FunctionDemo

- Visibility: **private**; default branch: `master`; repository URL: https://github.com/langcodestartup/FunctionDemo
- No matching authored PRs or authored issues were returned for the requested identity in this repository; the `kimgooneya` branch-name search also returned no match. Commit searches are covered by the limitations section below, so this is an observed no-evidence result rather than proof that every historical author string is absent.

### langcodestartup/GennieTest

- Visibility: **private**; default branch: `master`; repository URL: https://github.com/langcodestartup/GennieTest
- No matching authored PRs or authored issues were returned for the requested identity in this repository; the `kimgooneya` branch-name search also returned no match. Commit searches are covered by the limitations section below, so this is an observed no-evidence result rather than proof that every historical author string is absent.

### langcodestartup/goodneighbors-poc

- Visibility: **private**; default branch: `master`; repository URL: https://github.com/langcodestartup/goodneighbors-poc
- No matching authored PRs or authored issues were returned for the requested identity in this repository; the `kimgooneya` branch-name search also returned no match. Commit searches are covered by the limitations section below, so this is an observed no-evidence result rather than proof that every historical author string is absent.

### langcodestartup/GSchargev.V2

- Visibility: **private**; default branch: `master`; repository URL: https://github.com/langcodestartup/GSchargev.V2
- No matching authored PRs or authored issues were returned for the requested identity in this repository; the `kimgooneya` branch-name search also returned no match. Commit searches are covered by the limitations section below, so this is an observed no-evidence result rather than proof that every historical author string is absent.

### langcodestartup/GSITestRepo

- Visibility: **private**; default branch: `master`; repository URL: https://github.com/langcodestartup/GSITestRepo
- No matching authored PRs or authored issues were returned for the requested identity in this repository; the `kimgooneya` branch-name search also returned no match. Commit searches are covered by the limitations section below, so this is an observed no-evidence result rather than proof that every historical author string is absent.

### langcodestartup/HaedreamCrawling

- Visibility: **private**; default branch: `master`; repository URL: https://github.com/langcodestartup/HaedreamCrawling
- No matching authored PRs or authored issues were returned for the requested identity in this repository; the `kimgooneya` branch-name search also returned no match. Commit searches are covered by the limitations section below, so this is an observed no-evidence result rather than proof that every historical author string is absent.

### langcodestartup/HanterGlobal

- Visibility: **private**; default branch: `master`; repository URL: https://github.com/langcodestartup/HanterGlobal
- No matching authored PRs or authored issues were returned for the requested identity in this repository; the `kimgooneya` branch-name search also returned no match. Commit searches are covered by the limitations section below, so this is an observed no-evidence result rather than proof that every historical author string is absent.

### langcodestartup/harness-experiment

- Visibility: **private**; default branch: `main`; repository URL: https://github.com/langcodestartup/harness-experiment
- No matching authored PRs or authored issues were returned for the requested identity in this repository; the `kimgooneya` branch-name search also returned no match. Commit searches are covered by the limitations section below, so this is an observed no-evidence result rather than proof that every historical author string is absent.

### langcodestartup/Hmall

- Visibility: **private**; default branch: `master`; repository URL: https://github.com/langcodestartup/Hmall
- No matching authored PRs or authored issues were returned for the requested identity in this repository; the `kimgooneya` branch-name search also returned no match. Commit searches are covered by the limitations section below, so this is an observed no-evidence result rather than proof that every historical author string is absent.

### langcodestartup/HWOC

- Visibility: **private**; default branch: `master`; repository URL: https://github.com/langcodestartup/HWOC
- No matching authored PRs or authored issues were returned for the requested identity in this repository; the `kimgooneya` branch-name search also returned no match. Commit searches are covered by the limitations section below, so this is an observed no-evidence result rather than proof that every historical author string is absent.

## Direct commit evidence returned by author-qualified searches

- `langcodestartup/Carbon11Test`: [50459d9e29cf31309804f8ffc940ef63be666374](https://github.com/langcodestartup/Carbon11Test/commit/50459d9e29cf31309804f8ffc940ef63be666374) — `fix theme`; 2022-06-03T23:57:24+09:00; matched alias `김수현` with query `fix author:김수현`.
- `langcodestartup/dcai-onpremise`: [5c83cc02901a0c7680cca76dbcd91beeda26e3e6](https://github.com/langcodestartup/dcai-onpremise/commit/5c83cc02901a0c7680cca76dbcd91beeda26e3e6) — `docs(agents): add comprehensive handoff orchestration guide`; 2025-11-17T11:31:30Z; matched `김수현`.
- `langcodestartup/dcai-onpremise`: [f405b2609e7aad53a18ce26427a3c364bacf0426](https://github.com/langcodestartup/dcai-onpremise/commit/f405b2609e7aad53a18ce26427a3c364bacf0426) — `fix(signalr): migrate to SSE transport and fix MongoDB ObjectId serialization`; 2025-11-17T12:02:55+09:00; matched `kimgooneya` and `김수현`.
- `langcodestartup/dcai-onpremise`: [fee37c31fb953bdecf6f81d402457ee45993a528](https://github.com/langcodestartup/dcai-onpremise/commit/fee37c31fb953bdecf6f81d402457ee45993a528) — `feat: Add .env file loading support for Development environment`; 2025-11-15T12:22:02+09:00; matched `kimgooneya` and `김수현`.
- `langcodestartup/dcai-onpremise`: [79e15db0bdece9acab76ef3b98e36fd7a51a589e](https://github.com/langcodestartup/dcai-onpremise/commit/79e15db0bdece9acab76ef3b98e36fd7a51a589e) — `feat(ui): Replace emoji icons with Lucide React icons`; 2025-11-12T20:58:13+09:00; matched `kimgooneya` and `김수현`.
- `langcodestartup/dcai-onpremise`: [90fc2d8ed8461aa71c0665c280ec158b6148a58f](https://github.com/langcodestartup/dcai-onpremise/commit/90fc2d8ed8461aa71c0665c280ec158b6148a58f) — `feat: Implement Admin page with Project and LLM management (F021)`; 2025-11-11T12:19:28+09:00; matched `kimgooneya` and `김수현`.
- `langcodestartup/dcai-onpremise`: [1d9be400dde0944abe799602808eb556b1955a30](https://github.com/langcodestartup/dcai-onpremise/commit/1d9be400dde0944abe799602808eb556b1955a30) — `feat: Implement Mock Services (Phase 2)`; 2025-11-11T02:26:20+09:00; matched `kimgooneya` and `김수현`.
- `langcodestartup/excel-parser`: [834a712006517baa8c2732d8b7df169e059dc5fe](https://github.com/langcodestartup/excel-parser/commit/834a712006517baa8c2732d8b7df169e059dc5fe) — `fix: v1 inspect()와 v2 extract()의 비정형 시트 판정 불일치 해소 (#10) (#14)`; 2026-06-12T15:14:41+09:00; matched `kimgooneya` and `김수현`.
- `langcodestartup/excel-parser`: [68f083ce92966b2f8e9094f4b46fd7127c5bf1a9](https://github.com/langcodestartup/excel-parser/commit/68f083ce92966b2f8e9094f4b46fd7127c5bf1a9) — `fix: 세로 병합 헤더 컬럼명이 ColumnProfile.name에 누락되던 문제 (#1) (#5)`; 2026-06-11T10:59:05Z; matched `kimgooneya` and `김수현`.

## Gaps and limitations

- Local `gh auth status` reported the configured `kimgooneya` token invalid, so this memo uses the authenticated GitHub connector rather than the local CLI. No token or secret is included.
- The commit-search connector requires at least one non-qualifier text term. Author-qualified searches therefore cannot prove a complete commit count: commits whose message does not match the chosen term may be omitted, and the connector’s `topn`/GitHub search cap can truncate large result sets. PR records’ head SHAs and commit counts are exact but do not enumerate each commit’s author.
- Connector calls were completed without rate-limit errors, but the long optional multi-term sweep was stopped after 72/180 calls to avoid unnecessary load; the bounded per-repository PR, issue, branch, and targeted commit queries above are the durable evidence.
- Review/comment coverage is negative evidence from search and representative timeline fetches, not a full per-PR review-thread export. The six active repositories had no `reviewed-by:kimgooneya` search hits.
- No claim is made that `shkim` and `김수현` are separate GitHub accounts; the overlap of exact commit SHAs in `dcai-onpremise` and `excel-parser` supports treating them as aliases of the same contribution identity with **medium confidence**, while `kimgooneya` user identity is **high confidence** from PR author objects.



## Appendix B — I-R repository audit

# Member B evidence memo: langcodestartup repositories I-R

Generated: 2026-08-01T07:56:04.292Z

## Scope and method

- Inventory: all 113 `langcodestartup` repositories whose names begin I through R, case-insensitive, obtained from `GET /orgs/langcodestartup/repos?type=all` with the authenticated GitHub CLI account `kimgooneya`.
- Identity strings searched: GitHub logins `kimgooneya` and `shkim`, plus the literal Korean name `김수현` in GitHub Search queries. The public profile records were not treated as proof that the two logins are the same person.
- Evidence surfaces: commit search, issue/PR author search, issue/PR commenter search, reviewed-by search, core REST commit/PR/issue endpoints, repository branch inventory, and repository metadata. Exact URLs, numbers/IDs, SHAs, and dates are retained when returned.
- Important limitation: GitHub Search enforced its 30 requests/minute cap during the broad sweep. Core REST fallback evidence is included below; commenter/reviewer identities were not exhaustively recovered after the cap, so absence of those activities is not asserted.

## Coverage summary

- Inventory rows: 113
- Current memo status: every inventory row represented below; exact records are provisional where Search was rate-limited.

## LangcodeLanding

- Repository: [langcodestartup/LangcodeLanding](https://github.com/langcodestartup/LangcodeLanding)
- Default branch: `master`; visibility: private; archived: no
- Branch inventory observed: 1 branch(es)
  - `master` (5b023f5061fd)
- Search query state: **PARTIAL / one or more query errors**; successful result sets: 4
- Contribution evidence in current pass: **No matching authored commits, PRs, or issues returned by paginated core REST; reviewer/comment activity remains UNKNOWN because Search was rate-limited**.

## PythonGAST

- Repository: [langcodestartup/PythonGAST](https://github.com/langcodestartup/PythonGAST)
- Default branch: `master`; visibility: private; archived: no
- Branch inventory observed: 1 branch(es)
  - `master` (4f1c7c5925d9)
- Search query state: **PARTIAL / one or more query errors**; successful result sets: 4
- Contribution evidence in current pass: **No matching authored commits, PRs, or issues returned by paginated core REST; reviewer/comment activity remains UNKNOWN because Search was rate-limited**.

## LangcodeDemo

- Repository: [langcodestartup/LangcodeDemo](https://github.com/langcodestartup/LangcodeDemo)
- Default branch: `master`; visibility: private; archived: no
- Branch inventory observed: 1 branch(es)
  - `master` (04535ef68c74)
- Search query state: **PARTIAL / one or more query errors**; successful result sets: 4
- Contribution evidence in current pass: **No matching authored commits, PRs, or issues returned by paginated core REST; reviewer/comment activity remains UNKNOWN because Search was rate-limited**.

## LangcodeLangdingV2

- Repository: [langcodestartup/LangcodeLangdingV2](https://github.com/langcodestartup/LangcodeLangdingV2)
- Default branch: `master`; visibility: private; archived: no
- Branch inventory observed: 4 branch(es)
  - `jshan/team` (6da852feccf3), `master` (8909080b867c), `ui` (8dc5fb0f1540), `yjkoh/font` (da25369fe700)
- Search query state: **PARTIAL / one or more query errors**; successful result sets: 4
- Contribution evidence in current pass: **No matching authored commits, PRs, or issues returned by paginated core REST; reviewer/comment activity remains UNKNOWN because Search was rate-limited**.

## LangcodeAlpha

- Repository: [langcodestartup/LangcodeAlpha](https://github.com/langcodestartup/LangcodeAlpha)
- Default branch: `master`; visibility: private; archived: no
- Branch inventory observed: 5 branch(es)
  - `Demo` (2cafcfadc56c), `fordemo` (d27aeb6c39f5), `jshan/listTemplate` (f1b6431d4465), `master` (040dfacec8ac), `yjkoh/snapshotTempalte` (b892216dc5ca)
- Search query state: **PARTIAL / one or more query errors**; successful result sets: 4
- Contribution evidence in current pass: **No matching authored commits, PRs, or issues returned by paginated core REST; reviewer/comment activity remains UNKNOWN because Search was rate-limited**.

## LangcodeApp

- Repository: [langcodestartup/LangcodeApp](https://github.com/langcodestartup/LangcodeApp)
- Default branch: `master`; visibility: private; archived: no
- Branch inventory observed: 21 branch(es)
  - `demo/reference` (c9995f3674e8), `development` (0689263fd8af), `feature/backend/WorkToDo` (5c538091c8e1), `feature/base/mjkim` (0a41c5d69426), `feature/filecontroller` (5613d9ffe168), `feature/foundation/mjkim` (b3c9cdefc805), `feature/jschoi` (e7f4d5b5bed6), `feature/mvp/mjkim` (15172e4f43d4), `feature/readonly/demo` (56991d40fa8b), `feature/reference/mjkim` (bad4a936c387), `feature/storyboard/jschoi` (c2623922501e), `feature/storyboard/jylee` (dd4e042106f0), `feature/ui/AnalysisTimeTracker` (c84959fb7a2c), `feature/ui/analysisDashboard` (e2b98c82033b), `feature/ui/analysisTimeTrackerMVP` (902e8fa52b87), `feature/ui/jyl/cooperationui` (ea27e8e12b30), `feature/ui/jyl/main_jy` (4be21bbf6189), `feature/ui/jylee3` (4c7215cb42f7), `feature/ui/training` (d11ef1704472), `master` (8fb21ff24ebf), …
- Search query state: **PARTIAL / one or more query errors**; successful result sets: 4
- Matching commit records returned:
  - [71e4db15fa96](https://github.com/langcodestartup/LangcodeApp/commit/71e4db15fa96c991b7ab2df167589a1fbb78b1b1) — kimgooneya — 2021-08-20 — Feature/storyboard/jylee (#16) _(core REST commit?author=kimgooneya)_
- Matching issue/PR records returned:
  - PR [#44 🔨 Bug fix - Guide Reference](https://github.com/langcodestartup/LangcodeApp/pull/44) — login kimgooneya — opened 2021-12-10 — state closed — merged 2021-12-10 _(core REST)_
  - PR [#43 🔨 Bug fix - Guide QnA CRUD error](https://github.com/langcodestartup/LangcodeApp/pull/43) — login kimgooneya — opened 2021-12-10 — state closed — merged 2021-12-10 _(core REST)_
  - PR [#40 Guide Channel 표시 부분 버그 픽스 - input tag 문제로 인함](https://github.com/langcodestartup/LangcodeApp/pull/40) — login kimgooneya — opened 2021-12-09 — state closed — merged 2021-12-09 _(core REST)_
  - PR [#39 reference crud complete](https://github.com/langcodestartup/LangcodeApp/pull/39) — login kimgooneya — opened 2021-12-03 — state closed — merged 2021-12-03 _(core REST)_
  - PR [#37 Feature/studyroom revise](https://github.com/langcodestartup/LangcodeApp/pull/37) — login kimgooneya — opened 2021-11-22 — state closed — merged 2021-11-22 _(core REST)_
  - PR [#36 Feature/training/page refactoring](https://github.com/langcodestartup/LangcodeApp/pull/36) — login kimgooneya — opened 2021-11-15 — state closed — merged 2021-11-15 _(core REST)_
  - PR [#35 Feature/guide/referencepage](https://github.com/langcodestartup/LangcodeApp/pull/35) — login kimgooneya — opened 2021-11-12 — state closed — merged 2021-11-12 _(core REST)_
  - PR [#34 Feature/develop/shkim](https://github.com/langcodestartup/LangcodeApp/pull/34) — login kimgooneya — opened 2021-11-08 — state closed — merged 2021-11-08 _(core REST)_
  - PR [#31 Feature/guide/referencepage](https://github.com/langcodestartup/LangcodeApp/pull/31) — login kimgooneya — opened 2021-11-08 — state closed — merged 2021-11-08 _(core REST)_
  - PR [#30 Feature/develop/shkim](https://github.com/langcodestartup/LangcodeApp/pull/30) — login kimgooneya — opened 2021-11-08 — state closed _(core REST)_
  - PR [#28 GuideQnA Feature v0.9](https://github.com/langcodestartup/LangcodeApp/pull/28) — login kimgooneya — opened 2021-11-02 — state closed — merged 2021-11-02 _(core REST)_
  - PR [#27 Guide QnA 기능 완성](https://github.com/langcodestartup/LangcodeApp/pull/27) — login kimgooneya — opened 2021-11-02 — state closed _(core REST)_
  - PR [#26 Feature/develop/shk/class room crud](https://github.com/langcodestartup/LangcodeApp/pull/26) — login kimgooneya — opened 2021-10-07 — state closed _(core REST)_
  - PR [#25 Feature/develop/shk/class room crud](https://github.com/langcodestartup/LangcodeApp/pull/25) — login kimgooneya — opened 2021-10-07 — state closed _(core REST)_
  - PR [#24 Feature/develop/shk/class room crud](https://github.com/langcodestartup/LangcodeApp/pull/24) — login kimgooneya — opened 2021-10-06 — state closed — merged 2021-10-06 _(core REST)_
  - PR [#22 Feature/develop/shk/training design](https://github.com/langcodestartup/LangcodeApp/pull/22) — login kimgooneya — opened 2021-09-16 — state closed — merged 2021-09-16 _(core REST)_
  - PR [#21 Feature/develop/shk/reply](https://github.com/langcodestartup/LangcodeApp/pull/21) — login kimgooneya — opened 2021-09-02 — state closed — merged 2021-09-02 _(core REST)_
  - PR [#20 Feature/develop/shk/training](https://github.com/langcodestartup/LangcodeApp/pull/20) — login kimgooneya — opened 2021-08-31 — state closed — merged 2021-08-31 _(core REST)_
  - PR [#19 Feature/develop/shk/classroom component](https://github.com/langcodestartup/LangcodeApp/pull/19) — login kimgooneya — opened 2021-08-30 — state closed — merged 2021-08-30 _(core REST)_
  - PR [#17 Feature/UI/jylee2](https://github.com/langcodestartup/LangcodeApp/pull/17) — login kimgooneya — opened 2021-08-24 — state closed — merged 2021-08-24 _(core REST)_
  - PR [#16 Feature/storyboard/jylee](https://github.com/langcodestartup/LangcodeApp/pull/16) — login kimgooneya — opened 2021-08-20 — state closed — merged 2021-08-20 _(core REST)_
  - PR [#15 Feature/shkim](https://github.com/langcodestartup/LangcodeApp/pull/15) — login kimgooneya — opened 2021-08-20 — state closed — merged 2021-08-20 _(core REST)_
  - PR [#14 Feature/storyboard/jylee](https://github.com/langcodestartup/LangcodeApp/pull/14) — login kimgooneya — opened 2021-08-19 — state closed _(core REST)_
  - PR [#13 Feature/dashboard](https://github.com/langcodestartup/LangcodeApp/pull/13) — login kimgooneya — opened 2021-08-18 — state closed _(core REST)_
  - PR [#12 Feature/dashboard](https://github.com/langcodestartup/LangcodeApp/pull/12) — login kimgooneya — opened 2021-08-18 — state closed — merged 2021-08-18 _(core REST)_
  - PR [#11 Develop](https://github.com/langcodestartup/LangcodeApp/pull/11) — login kimgooneya — opened 2021-08-16 — state closed — merged 2021-08-16 _(core REST)_
  - PR [#10 Feature/article+editor](https://github.com/langcodestartup/LangcodeApp/pull/10) — login kimgooneya — opened 2021-08-16 — state closed — merged 2021-08-16 _(core REST)_
  - PR [#9 Feature/article+editor](https://github.com/langcodestartup/LangcodeApp/pull/9) — login kimgooneya — opened 2021-08-16 — state closed — merged 2021-08-16 _(core REST)_
  - PR [#8 Feature/article+editor](https://github.com/langcodestartup/LangcodeApp/pull/8) — login kimgooneya — opened 2021-08-13 — state closed — merged 2021-08-13 _(core REST)_
  - PR [#7 Feature/article+editor](https://github.com/langcodestartup/LangcodeApp/pull/7) — login kimgooneya — opened 2021-08-13 — state closed _(core REST)_
  - PR [#6 Feature/article](https://github.com/langcodestartup/LangcodeApp/pull/6) — login kimgooneya — opened 2021-08-13 — state closed — merged 2021-08-13 _(core REST)_
  - PR [#5 Feature/storyboard/jschoi](https://github.com/langcodestartup/LangcodeApp/pull/5) — login kimgooneya — opened 2021-08-13 — state closed — merged 2021-08-13 _(core REST)_
  - PR [#4 Feature/dash board](https://github.com/langcodestartup/LangcodeApp/pull/4) — login kimgooneya — opened 2021-08-10 — state closed — merged 2021-08-10 _(core REST)_
  - PR [#3 Feature/editor revision](https://github.com/langcodestartup/LangcodeApp/pull/3) — login kimgooneya — opened 2021-08-10 — state closed — merged 2021-08-10 _(core REST)_

## LINQexample

- Repository: [langcodestartup/LINQexample](https://github.com/langcodestartup/LINQexample)
- Default branch: `master`; visibility: public; archived: no
- Branch inventory observed: 7 branch(es)
  - `master` (50ffd81e031b), `question/jylee` (d3a39de39040), `question/mjkim` (c1966d231d7c), `question/shkim` (501afc64cc55), `question/wschoi` (ff5c801ade12), `sh-edit` (1bd832ab498e), `yjkang` (d614ba07597e)
- Search query state: **PARTIAL / one or more query errors**; successful result sets: 4
- Contribution evidence in current pass: **No matching authored commits, PRs, or issues returned by paginated core REST; reviewer/comment activity remains UNKNOWN because Search was rate-limited**.

## PublicRoomV1

- Repository: [langcodestartup/PublicRoomV1](https://github.com/langcodestartup/PublicRoomV1)
- Default branch: `master`; visibility: private; archived: no
- Branch inventory observed: 14 branch(es)
  - `backend/sessiondb` (ecc8ca208184), `backend/templayout` (f5eadd7b6e02), `dev/final` (dda1f2d79247), `feature/canvas` (0ebb5fdf9a05), `feature/eventmain` (de3abd8deb54), `feature/finalui2` (92d21cef7fc1), `feature/finaluitest` (5b2e49c3e33f), `feature/lock-button` (49b8e2cd86b8), `feature/newlayout` (836355e31e1f), `feature/scroll` (d59ff0249f9d), `feature/template` (470bc9af02ec), `feature/uiupdate4` (07098a3fa065), `master` (ff89d15ed6a0), `mjkim` (401935f4f0ba)
- Search query state: **PARTIAL / one or more query errors**; successful result sets: 4
- Contribution evidence in current pass: **No matching authored commits, PRs, or issues returned by paginated core REST; reviewer/comment activity remains UNKNOWN because Search was rate-limited**.

## PocMBK

- Repository: [langcodestartup/PocMBK](https://github.com/langcodestartup/PocMBK)
- Default branch: `master`; visibility: private; archived: no
- Branch inventory observed: 1 branch(es)
  - `master` (75a41015f7e0)
- Search query state: **PARTIAL / one or more query errors**; successful result sets: 4
- Contribution evidence in current pass: **No matching authored commits, PRs, or issues returned by paginated core REST; reviewer/comment activity remains UNKNOWN because Search was rate-limited**.

## PaperPop

- Repository: [langcodestartup/PaperPop](https://github.com/langcodestartup/PaperPop)
- Default branch: `master`; visibility: private; archived: no
- Branch inventory observed: 1 branch(es)
  - `master` (a2ba7825da61)
- Search query state: **PARTIAL / one or more query errors**; successful result sets: 4
- Matching commit records returned:
  - [a2ba7825da61](https://github.com/langcodestartup/PaperPop/commit/a2ba7825da61f548df321eea2bb080107b3d8654) — kimgooneya — 2023-08-23 — 업로드 양식 오류 수정 _(core REST commit?author=kimgooneya)_
  - [ce406203621d](https://github.com/langcodestartup/PaperPop/commit/ce406203621da99d274e64f1f7ee37a51e4f3fba) — kimgooneya — 2023-08-23 — 업로드 파일 -> Order 변환 부문 오류 수정 _(core REST commit?author=kimgooneya)_
  - [ba9cde863cbc](https://github.com/langcodestartup/PaperPop/commit/ba9cde863cbc06fe766b77e4db2e0447ef8ca790) — kimgooneya — 2023-08-22 — Merge branch 'master' of https://github.com/langcodestartup/PaperPop _(core REST commit?author=kimgooneya)_
  - [787fecda56a0](https://github.com/langcodestartup/PaperPop/commit/787fecda56a03f31f6c08b207b33ab06125acd4d) — kimgooneya — 2023-08-22 — CNPlus 변경 양식 지원을 위한 수정 _(core REST commit?author=kimgooneya)_
  - [384bdd356a76](https://github.com/langcodestartup/PaperPop/commit/384bdd356a76d83cf42f058252387d638ee625dc) — kimgooneya — 2023-08-22 — CNPlus 업로드 템플릿 양식 수정 _(core REST commit?author=kimgooneya)_
  - [7e014edf76e4](https://github.com/langcodestartup/PaperPop/commit/7e014edf76e44c6488e2be933af58089d0db1f0e) — kimgooneya — 2023-08-12 — 권장되는 nuget 패키지 설치 _(core REST commit?author=kimgooneya)_
  - [62a32da714e8](https://github.com/langcodestartup/PaperPop/commit/62a32da714e833b611fcd1908dabf44315b269a6) — kimgooneya — 2023-08-12 — nuget update and net6 -> net7 _(core REST commit?author=kimgooneya)_
  - [7a91809aa270](https://github.com/langcodestartup/PaperPop/commit/7a91809aa270aaf848e351b7abcb668375ae5c1e) — kimgooneya — 2022-09-15 — 상품 전체 삭제 버튼 제거 _(core REST commit?author=kimgooneya)_
  - [4431c413bed8](https://github.com/langcodestartup/PaperPop/commit/4431c413bed8ec0b878b8fa534de5b694191c406) — kimgooneya — 2022-09-13 — Release 1.09 _(core REST commit?author=kimgooneya)_
  - [1a647e04107c](https://github.com/langcodestartup/PaperPop/commit/1a647e04107c0148cd4a59582606ee854e8f7eff) — kimgooneya — 2022-09-07 — 수정 _(core REST commit?author=kimgooneya)_
  - [0c611e9a65f8](https://github.com/langcodestartup/PaperPop/commit/0c611e9a65f8adabf0686b2254f33a8f56a9e383) — kimgooneya — 2022-09-07 — Release 1.08 (#99) _(core REST commit?author=kimgooneya)_
  - [0f57bb828869](https://github.com/langcodestartup/PaperPop/commit/0f57bb8288696bfba7a50bd09218a7cc1e364917) — kimgooneya — 2022-09-06 — order 패치 (#98) _(core REST commit?author=kimgooneya)_
  - [21b166ce85f7](https://github.com/langcodestartup/PaperPop/commit/21b166ce85f76358f1050308b81d0119f121d917) — kimgooneya — 2022-08-26 — Release 1.07 (#97) _(core REST commit?author=kimgooneya)_
  - [03eb663f5906](https://github.com/langcodestartup/PaperPop/commit/03eb663f5906ea952c8594ba2bfa62a0b3e4efcf) — kimgooneya — 2022-08-26 — Release 1.06  (#94) _(core REST commit?author=kimgooneya)_
  - [ef6526d01e6c](https://github.com/langcodestartup/PaperPop/commit/ef6526d01e6c031ce2e685f26cff524a9c1671fa) — kimgooneya — 2022-08-23 — Release 1.05 (#93) _(core REST commit?author=kimgooneya)_
  - [bec0004d2c18](https://github.com/langcodestartup/PaperPop/commit/bec0004d2c18147e0dee08efbd723325f20f636f) — kimgooneya — 2022-08-23 — Release 1.04 (#91) _(core REST commit?author=kimgooneya)_
  - [5218e9cbbb9d](https://github.com/langcodestartup/PaperPop/commit/5218e9cbbb9d6da66d88fc451ac8e54093bdd591) — kimgooneya — 2022-08-19 — Release 1.03 (#90) _(core REST commit?author=kimgooneya)_
  - [ee74acb74327](https://github.com/langcodestartup/PaperPop/commit/ee74acb74327f92430ddd1edd1981ea596b86481) — kimgooneya — 2022-08-19 — Release 1.03 (#87) _(core REST commit?author=kimgooneya)_
  - [30e7e1232ea7](https://github.com/langcodestartup/PaperPop/commit/30e7e1232ea76bc7764d7880d2d5ea8501b8f302) — kimgooneya — 2022-08-19 — Release 1.02 (#84) _(core REST commit?author=kimgooneya)_
  - [89507b684daa](https://github.com/langcodestartup/PaperPop/commit/89507b684daa273e5aa841ec668d9e0e3c21ee0a) — kimgooneya — 2022-08-18 — Release 1.01 배포 (#83) _(core REST commit?author=kimgooneya)_
  - [d67b7a176853](https://github.com/langcodestartup/PaperPop/commit/d67b7a176853418894bf5677b07125fe1389fd13) — kimgooneya — 2022-08-18 — Release 1.0 (#82) _(core REST commit?author=kimgooneya)_
  - [674de3ce6cf5](https://github.com/langcodestartup/PaperPop/commit/674de3ce6cf5398e1b2dd562471e04248550d118) — kimgooneya — 2022-03-10 — 변경 사항 반영 (#37) _(core REST commit?author=kimgooneya)_
  - [61430ae65e66](https://github.com/langcodestartup/PaperPop/commit/61430ae65e66644299eb7047bf3f627f3bbc2ea1) — kimgooneya — 2022-03-08 — Hot fix 꼬임해결 (#33) _(core REST commit?author=kimgooneya)_
  - [09c23acf2206](https://github.com/langcodestartup/PaperPop/commit/09c23acf220687f95c7527242343b41761e4b13c) — kimgooneya — 2022-03-08 — 22.03.08 패치 _(core REST commit?author=kimgooneya)_
  - [ab59a0e3cda0](https://github.com/langcodestartup/PaperPop/commit/ab59a0e3cda019bb32025f0be156a0125c1672b4) — kimgooneya — 2022-03-02 — hot fix - 엑셀 등록 문제 해결 (#25) _(core REST commit?author=kimgooneya)_
  - [ceb58a10aeb5](https://github.com/langcodestartup/PaperPop/commit/ceb58a10aeb5946d94ee94e6c1ace9f9e3dae9c6) — kimgooneya — 2022-03-02 — Feature - 자동 SKU 등록 기능 추가 (#23) _(core REST commit?author=kimgooneya)_
  - [3d58eb920f2e](https://github.com/langcodestartup/PaperPop/commit/3d58eb920f2e5d216bd140224ac657966eeaa515) — kimgooneya — 2022-02-25 — 버그 수정 - 분리 시 숫자 오류 (#20) (#21) _(core REST commit?author=kimgooneya)_
  - [76ee39dab893](https://github.com/langcodestartup/PaperPop/commit/76ee39dab893e1e458056fd6313137deee3c70a2) — kimgooneya — 2022-02-25 — 주문 조회시 동일인 처리 문제 수정 - regex 사용이 잘못됨 (#19) _(core REST commit?author=kimgooneya)_
  - [c4022c11b318](https://github.com/langcodestartup/PaperPop/commit/c4022c11b3189bef0be0c0166d5923b79dee70d7) — kimgooneya — 2022-02-25 — 동일인 색상 처리 (#17) _(core REST commit?author=kimgooneya)_
  - [aeccce630415](https://github.com/langcodestartup/PaperPop/commit/aeccce6304152977b13bd3b95f0f146c4cd27450) — kimgooneya — 2022-02-24 — Feature - 테이블 축소 기능 추가, 폰트 어썸 추가 (#16) _(core REST commit?author=kimgooneya)_
  - [a0e7469abc33](https://github.com/langcodestartup/PaperPop/commit/a0e7469abc3394b210f2e71b4603c1f3730220b1) — kimgooneya — 2022-02-23 — Bug fix - 분리 시 쇼핑몰 정보 누락 수정 (#15) _(core REST commit?author=kimgooneya)_
  - [284317496ffb](https://github.com/langcodestartup/PaperPop/commit/284317496ffbe1dfed0b3bedb35b3031d38cebc0) — kimgooneya — 2022-02-23 — Bug fix - JsonTable 새로운 줄 버그 (#14) _(core REST commit?author=kimgooneya)_
  - [6b725ff538a1](https://github.com/langcodestartup/PaperPop/commit/6b725ff538a1895583f130e862b0cbabfec18708) — kimgooneya — 2022-02-23 — Feature/allorders (#13) _(core REST commit?author=kimgooneya)_
  - [addfca52fe19](https://github.com/langcodestartup/PaperPop/commit/addfca52fe19f4329bc867919fbe165b000bcb65) — kimgooneya — 2022-02-11 — 🔨기능 정리 (#12) _(core REST commit?author=kimgooneya)_
  - [00945b989372](https://github.com/langcodestartup/PaperPop/commit/00945b98937245d545b70efc663c723baa72fe95) — kimgooneya — 2022-02-04 — bug fix - jsontable, context right click, ordersearvice amount column _(core REST commit?author=kimgooneya)_
  - [7df645e25349](https://github.com/langcodestartup/PaperPop/commit/7df645e25349e605f71720f289915cd86f6df6c4) — kimgooneya — 2022-02-04 — 디테일 항목 수정 _(core REST commit?author=kimgooneya)_
  - [34e130db2576](https://github.com/langcodestartup/PaperPop/commit/34e130db2576dae526953adfa9d90370f52dfc3a) — kimgooneya — 2022-02-04 — 주문 관리 context menu 정리 _(core REST commit?author=kimgooneya)_
  - [ed555d4a5054](https://github.com/langcodestartup/PaperPop/commit/ed555d4a5054d2daf8da40939ed807a32d60c55a) — kimgooneya — 2022-02-04 — ⭐1차 작업 완료 (#11) _(core REST commit?author=kimgooneya)_
  - [efd13b5105f3](https://github.com/langcodestartup/PaperPop/commit/efd13b5105f3691487cc295e86795b5c051ed671) — kimgooneya — 2022-02-03 — Feature/excelupload (#10) _(core REST commit?author=kimgooneya)_
  - [3e030846afe8](https://github.com/langcodestartup/PaperPop/commit/3e030846afe87ca523afe6c1aada13289c537c3d) — kimgooneya — 2022-02-03 — Product mapping table CRUD 완료 (#9) _(core REST commit?author=kimgooneya)_
  - [2f3747f5c534](https://github.com/langcodestartup/PaperPop/commit/2f3747f5c5346697dd09c647958873e5f30c8f2c) — kimgooneya — 2022-02-02 — 기능 보류 (#8) _(core REST commit?author=kimgooneya)_
  - [78102657aa17](https://github.com/langcodestartup/PaperPop/commit/78102657aa171a9abaf4237ddf24ae954eda5971) — kimgooneya — 2022-01-31 — Authentication delete _(core REST commit?author=kimgooneya)_
  - [dcb1583da5e3](https://github.com/langcodestartup/PaperPop/commit/dcb1583da5e338f3848ed58aaca6271011518d6a) — kimgooneya — 2022-01-29 — cosmos patch item, table item patch (#7) _(core REST commit?author=kimgooneya)_
  - [d4a46e0b113a](https://github.com/langcodestartup/PaperPop/commit/d4a46e0b113aff374e4d188a50ad7b402adb2cda) — kimgooneya — 2022-01-27 — 🔨 basic layout and design complete (#6) _(core REST commit?author=kimgooneya)_
  - [461e07554603](https://github.com/langcodestartup/PaperPop/commit/461e075546037a7a08788a831e01fbecfec8de14) — kimgooneya — 2022-01-25 — 🔨Feature/querydata (#5) _(core REST commit?author=kimgooneya)_
  - [5e8c0ae8dbe3](https://github.com/langcodestartup/PaperPop/commit/5e8c0ae8dbe315eba752d5dbde2cdf87ac622e58) — kimgooneya — 2022-01-24 — Change System.Text.Json->Newtonsoft.Json _(core REST commit?author=kimgooneya)_
  - [c092afe5fdde](https://github.com/langcodestartup/PaperPop/commit/c092afe5fdde6b23402608f18833a7df1515d776) — kimgooneya — 2022-01-24 — 🔨 add Feature/jsontable (#4) _(core REST commit?author=kimgooneya)_
  - [80366d1ac125](https://github.com/langcodestartup/PaperPop/commit/80366d1ac12557fc255896aa6f75f9dc069b4cf9) — kimgooneya — 2022-01-20 — Feature/salesmanagebase (#3) _(core REST commit?author=kimgooneya)_
  - [ad0217e63e8e](https://github.com/langcodestartup/PaperPop/commit/ad0217e63e8e52ed9cff1c4179bc3f01f4d4527e) — kimgooneya — 2022-01-15 — add mapping page base, add  jsontable base, edit mapping data. edit controllers (#2) _(core REST commit?author=kimgooneya)_
  - [a3e09a11db69](https://github.com/langcodestartup/PaperPop/commit/a3e09a11db69866fe29aa96dd17ad1e8c5ed33fe) — kimgooneya — 2022-01-12 — Orderpage base (#1) _(core REST commit?author=kimgooneya)_
  - [fe8b143e8d05](https://github.com/langcodestartup/PaperPop/commit/fe8b143e8d055500d742fd567f2e7dd661f2f4be) — kimgooneya — 2021-12-16 — 초기 커밋. _(core REST commit?author=kimgooneya)_
  - [488a30ea2539](https://github.com/langcodestartup/PaperPop/commit/488a30ea2539edd8773d7acbf11632be8e08e564) — kimgooneya — 2021-12-16 — .gitignore 및 .gitattributes를 추가하세요. _(core REST commit?author=kimgooneya)_
- Matching issue/PR records returned:
  - PR [#99 Release 1.08](https://github.com/langcodestartup/PaperPop/pull/99) — login kimgooneya — opened 2022-09-07 — state closed — merged 2022-09-07 _(core REST)_
  - PR [#98 order 패치](https://github.com/langcodestartup/PaperPop/pull/98) — login kimgooneya — opened 2022-09-06 — state closed — merged 2022-09-06 _(core REST)_
  - PR [#97 Release 1.07](https://github.com/langcodestartup/PaperPop/pull/97) — login kimgooneya — opened 2022-08-26 — state closed — merged 2022-08-26 _(core REST)_
  - PR [#96 OrderLine 배송(집하) 갱신 시에 ProductName을 기준으로 갱신하는 부분 추가](https://github.com/langcodestartup/PaperPop/pull/96) — login kimgooneya — opened 2022-08-26 — state closed — merged 2022-08-26 _(core REST)_
  - PR [#95 배송 판정 추가](https://github.com/langcodestartup/PaperPop/pull/95) — login kimgooneya — opened 2022-08-26 — state closed _(core REST)_
  - PR [#94 Release 1.06 ](https://github.com/langcodestartup/PaperPop/pull/94) — login kimgooneya — opened 2022-08-26 — state closed — merged 2022-08-26 _(core REST)_
  - PR [#93 Release 1.05](https://github.com/langcodestartup/PaperPop/pull/93) — login kimgooneya — opened 2022-08-23 — state closed — merged 2022-08-23 _(core REST)_
  - PR [#92 제품 전체 삭제 기능 변경](https://github.com/langcodestartup/PaperPop/pull/92) — login kimgooneya — opened 2022-08-23 — state closed — merged 2022-08-23 _(core REST)_
  - PR [#91 Release 1.04](https://github.com/langcodestartup/PaperPop/pull/91) — login kimgooneya — opened 2022-08-23 — state closed — merged 2022-08-23 _(core REST)_
  - PR [#90 Release 1.03](https://github.com/langcodestartup/PaperPop/pull/90) — login kimgooneya — opened 2022-08-19 — state closed — merged 2022-08-19 _(core REST)_
  - PR [#89 수정 사항 반영](https://github.com/langcodestartup/PaperPop/pull/89) — login kimgooneya — opened 2022-08-19 — state closed _(core REST)_
  - PR [#88 Release 수정사항 리베이스 머지](https://github.com/langcodestartup/PaperPop/pull/88) — login kimgooneya — opened 2022-08-19 — state closed _(core REST)_
  - PR [#87 Release 1.03](https://github.com/langcodestartup/PaperPop/pull/87) — login kimgooneya — opened 2022-08-19 — state closed — merged 2022-08-19 _(core REST)_
  - PR [#86 배포용](https://github.com/langcodestartup/PaperPop/pull/86) — login kimgooneya — opened 2022-08-19 — state closed _(core REST)_
  - PR [#85 Release](https://github.com/langcodestartup/PaperPop/pull/85) — login kimgooneya — opened 2022-08-19 — state closed — merged 2022-08-19 _(core REST)_
  - PR [#84 Release 1.02](https://github.com/langcodestartup/PaperPop/pull/84) — login kimgooneya — opened 2022-08-19 — state closed — merged 2022-08-19 _(core REST)_
  - PR [#83 Release 1.01 배포](https://github.com/langcodestartup/PaperPop/pull/83) — login kimgooneya — opened 2022-08-18 — state closed — merged 2022-08-18 _(core REST)_
  - PR [#82 Release 1.0](https://github.com/langcodestartup/PaperPop/pull/82) — login kimgooneya — opened 2022-08-18 — state closed — merged 2022-08-18 _(core REST)_
  - PR [#81 ㅁㅁ](https://github.com/langcodestartup/PaperPop/pull/81) — login kimgooneya — opened 2022-08-18 — state closed _(core REST)_
  - PR [#80 Release 임시 변경내용 반영](https://github.com/langcodestartup/PaperPop/pull/80) — login kimgooneya — opened 2022-08-18 — state closed — merged 2022-08-18 _(core REST)_
  - PR [#79 배포](https://github.com/langcodestartup/PaperPop/pull/79) — login kimgooneya — opened 2022-08-18 — state closed — merged 2022-08-18 _(core REST)_
  - PR [#78 browser openreadstream 사이즈를 넉넉하게 변경](https://github.com/langcodestartup/PaperPop/pull/78) — login kimgooneya — opened 2022-08-18 — state closed — merged 2022-08-18 _(core REST)_
  - PR [#77 Release에서 바꾼거 반영](https://github.com/langcodestartup/PaperPop/pull/77) — login kimgooneya — opened 2022-08-18 — state closed — merged 2022-08-18 _(core REST)_
  - PR [#76 퍼블리싱후 문제 수정](https://github.com/langcodestartup/PaperPop/pull/76) — login kimgooneya — opened 2022-08-17 — state closed — merged 2022-08-17 _(core REST)_
  - PR [#75 Hotfix/publish](https://github.com/langcodestartup/PaperPop/pull/75) — login kimgooneya — opened 2022-08-17 — state closed — merged 2022-08-17 _(core REST)_
  - PR [#74 hot fix 에러 수정](https://github.com/langcodestartup/PaperPop/pull/74) — login kimgooneya — opened 2022-08-17 — state closed — merged 2022-08-17 _(core REST)_
  - PR [#73 에러해결, CSV 저장](https://github.com/langcodestartup/PaperPop/pull/73) — login kimgooneya — opened 2022-08-17 — state closed — merged 2022-08-17 _(core REST)_
  - PR [#72 Release에서 바꾼 내용 반영](https://github.com/langcodestartup/PaperPop/pull/72) — login kimgooneya — opened 2022-08-17 — state closed — merged 2022-08-17 _(core REST)_
  - PR [#71 Program.cs 변경 배포 불가능 문제 수정중](https://github.com/langcodestartup/PaperPop/pull/71) — login kimgooneya — opened 2022-08-16 — state closed — merged 2022-08-16 _(core REST)_
  - PR [#70 테이블 가상화, 엑셀 -> CSV 업다운로드 변경](https://github.com/langcodestartup/PaperPop/pull/70) — login kimgooneya — opened 2022-08-16 — state closed — merged 2022-08-16 _(core REST)_
  - PR [#69 Working/upload csv](https://github.com/langcodestartup/PaperPop/pull/69) — login kimgooneya — opened 2022-08-15 — state closed — merged 2022-08-15 _(core REST)_
  - PR [#68 Working/virtualize table](https://github.com/langcodestartup/PaperPop/pull/68) — login kimgooneya — opened 2022-08-15 — state closed — merged 2022-08-15 _(core REST)_
  - PR [#67 Working/analysis page improvement](https://github.com/langcodestartup/PaperPop/pull/67) — login kimgooneya — opened 2022-06-16 — state closed — merged 2022-06-16 _(core REST)_
  - PR [#66 분석 페이지 영업일만 표시](https://github.com/langcodestartup/PaperPop/pull/66) — login kimgooneya — opened 2022-05-11 — state closed — merged 2022-05-11 _(core REST)_
  - PR [#65 특수 문자 페이지 기능 추가](https://github.com/langcodestartup/PaperPop/pull/65) — login kimgooneya — opened 2022-05-10 — state closed — merged 2022-05-10 _(core REST)_
  - PR [#64 특수문자 기능 추가](https://github.com/langcodestartup/PaperPop/pull/64) — login kimgooneya — opened 2022-05-09 — state closed — merged 2022-05-09 _(core REST)_
  - PR [#63 Hotfix/missmatch](https://github.com/langcodestartup/PaperPop/pull/63) — login kimgooneya — opened 2022-04-11 — state closed — merged 2022-04-11 _(core REST)_
  - PR [#62 Hotfix/missmatch](https://github.com/langcodestartup/PaperPop/pull/62) — login kimgooneya — opened 2022-04-11 — state closed — merged 2022-04-11 _(core REST)_
  - PR [#61 Hotfix/localtime](https://github.com/langcodestartup/PaperPop/pull/61) — login kimgooneya — opened 2022-04-07 — state closed — merged 2022-04-07 _(core REST)_
  - PR [#60 Hotfix/localtime](https://github.com/langcodestartup/PaperPop/pull/60) — login kimgooneya — opened 2022-04-07 — state closed — merged 2022-04-07 _(core REST)_
  - PR [#59 Hotfix/gyeongdong error](https://github.com/langcodestartup/PaperPop/pull/59) — login kimgooneya — opened 2022-04-06 — state closed — merged 2022-04-06 _(core REST)_
  - PR [#58 Hotfix/gyeongdong error](https://github.com/langcodestartup/PaperPop/pull/58) — login kimgooneya — opened 2022-04-06 — state closed — merged 2022-04-06 _(core REST)_
  - PR [#57 Hotfix/gyeongdong error](https://github.com/langcodestartup/PaperPop/pull/57) — login kimgooneya — opened 2022-04-06 — state closed — merged 2022-04-06 _(core REST)_
  - PR [#56 Hotfix/gyeongdong error](https://github.com/langcodestartup/PaperPop/pull/56) — login kimgooneya — opened 2022-04-06 — state closed — merged 2022-04-06 _(core REST)_
  - PR [#55 Hotfix - 중복 주문 처리 변경](https://github.com/langcodestartup/PaperPop/pull/55) — login kimgooneya — opened 2022-04-05 — state closed — merged 2022-04-05 _(core REST)_
  - PR [#54 중복 주문 처리 변경](https://github.com/langcodestartup/PaperPop/pull/54) — login kimgooneya — opened 2022-04-05 — state closed — merged 2022-04-05 _(core REST)_
  - PR [#53 22-04-05 패치](https://github.com/langcodestartup/PaperPop/pull/53) — login kimgooneya — opened 2022-04-05 — state closed — merged 2022-04-05 _(core REST)_
  - PR [#52 Hotfix/layoutfix](https://github.com/langcodestartup/PaperPop/pull/52) — login kimgooneya — opened 2022-04-05 — state closed — merged 2022-04-05 _(core REST)_
  - PR [#51 22-04-04 패치](https://github.com/langcodestartup/PaperPop/pull/51) — login kimgooneya — opened 2022-04-04 — state closed — merged 2022-04-04 _(core REST)_
  - PR [#50 판매 분석 데이터 json수정](https://github.com/langcodestartup/PaperPop/pull/50) — login kimgooneya — opened 2022-04-04 — state closed — merged 2022-04-04 _(core REST)_
  - PR [#49 22-03-30 패치](https://github.com/langcodestartup/PaperPop/pull/49) — login kimgooneya — opened 2022-03-30 — state closed — merged 2022-03-30 _(core REST)_
  - PR [#48 Hotfix/vacation](https://github.com/langcodestartup/PaperPop/pull/48) — login kimgooneya — opened 2022-03-30 — state closed — merged 2022-03-30 _(core REST)_
  - PR [#47 판매 데이터 기능 표시 완료](https://github.com/langcodestartup/PaperPop/pull/47) — login kimgooneya — opened 2022-03-21 — state closed — merged 2022-03-21 _(core REST)_
  - PR [#46 Hotfix - 상품 중복 등록 금지](https://github.com/langcodestartup/PaperPop/pull/46) — login kimgooneya — opened 2022-03-18 — state closed — merged 2022-03-18 _(core REST)_
  - PR [#45 중복등록 금지](https://github.com/langcodestartup/PaperPop/pull/45) — login kimgooneya — opened 2022-03-18 — state closed — merged 2022-03-18 _(core REST)_
  - PR [#44 Hotfix-03.15](https://github.com/langcodestartup/PaperPop/pull/44) — login kimgooneya — opened 2022-03-15 — state closed — merged 2022-03-15 _(core REST)_
  - PR [#43 변경사항 반영](https://github.com/langcodestartup/PaperPop/pull/43) — login kimgooneya — opened 2022-03-14 — state closed — merged 2022-03-14 _(core REST)_
  - PR [#42 Hotfix - 주문 등록 로직 수정](https://github.com/langcodestartup/PaperPop/pull/42) — login kimgooneya — opened 2022-03-14 — state closed — merged 2022-03-14 _(core REST)_
  - PR [#41 엑셀 익스포트 문제 해결](https://github.com/langcodestartup/PaperPop/pull/41) — login kimgooneya — opened 2022-03-11 — state closed — merged 2022-03-11 _(core REST)_
  - PR [#40 Hotfix/excelexport](https://github.com/langcodestartup/PaperPop/pull/40) — login kimgooneya — opened 2022-03-11 — state closed _(core REST)_
  - PR [#39 Feature - 현재 테이블 아이템들 전체 삭제](https://github.com/langcodestartup/PaperPop/pull/39) — login kimgooneya — opened 2022-03-11 — state closed — merged 2022-03-11 _(core REST)_
  - PR [#38 Feature - SKU 검색](https://github.com/langcodestartup/PaperPop/pull/38) — login kimgooneya — opened 2022-03-11 — state closed — merged 2022-03-11 _(core REST)_
  - PR [#37 변경 사항 반영](https://github.com/langcodestartup/PaperPop/pull/37) — login kimgooneya — opened 2022-03-10 — state closed — merged 2022-03-10 _(core REST)_
  - PR [#36 HotFix - xlsx 삭제, 상품 엑셀 업로드 실패](https://github.com/langcodestartup/PaperPop/pull/36) — login kimgooneya — opened 2022-03-10 — state closed — merged 2022-03-10 _(core REST)_
  - PR [#35 페이지 레이아웃 수정 완료](https://github.com/langcodestartup/PaperPop/pull/35) — login kimgooneya — opened 2022-03-08 — state closed — merged 2022-03-08 _(core REST)_
  - PR [#34 정리내용 반영](https://github.com/langcodestartup/PaperPop/pull/34) — login kimgooneya — opened 2022-03-08 — state closed — merged 2022-03-08 _(core REST)_
  - PR [#33 Hot fix 꼬임해결](https://github.com/langcodestartup/PaperPop/pull/33) — login kimgooneya — opened 2022-03-08 — state closed — merged 2022-03-08 _(core REST)_
  - PR [#32 Hotfix/errorclear](https://github.com/langcodestartup/PaperPop/pull/32) — login kimgooneya — opened 2022-03-08 — state closed — merged 2022-03-08 _(core REST)_
  - PR [#31 22.03.08](https://github.com/langcodestartup/PaperPop/pull/31) — login kimgooneya — opened 2022-03-08 — state closed — merged 2022-03-08 _(core REST)_
  - PR [#30 제품 엑셀 업로드 기능 추가](https://github.com/langcodestartup/PaperPop/pull/30) — login kimgooneya — opened 2022-03-08 — state closed — merged 2022-03-08 _(core REST)_
  - PR [#29 재주문 처리 기능 추가 - 주문 번호 자동생성, jsontable 축소를 컴포넌트에서 지우고 페이지에서 조절, orderse…](https://github.com/langcodestartup/PaperPop/pull/29) — login kimgooneya — opened 2022-03-07 — state closed — merged 2022-03-07 _(core REST)_
  - PR [#28 Feature - 경동 고정 값 반영](https://github.com/langcodestartup/PaperPop/pull/28) — login kimgooneya — opened 2022-03-04 — state closed — merged 2022-03-04 _(core REST)_
  - PR [#27 Feature - 엑셀 업로드 구분](https://github.com/langcodestartup/PaperPop/pull/27) — login kimgooneya — opened 2022-03-04 — state closed — merged 2022-03-04 _(core REST)_
  - PR [#26 Fix - 사용하지 않는 데이터 정리](https://github.com/langcodestartup/PaperPop/pull/26) — login kimgooneya — opened 2022-03-04 — state closed — merged 2022-03-04 _(core REST)_
  - PR [#25 hot fix - 엑셀 등록 문제 해결](https://github.com/langcodestartup/PaperPop/pull/25) — login kimgooneya — opened 2022-03-02 — state closed — merged 2022-03-02 _(core REST)_
  - PR [#24 Hotfix/exceltable](https://github.com/langcodestartup/PaperPop/pull/24) — login kimgooneya — opened 2022-03-02 — state closed — merged 2022-03-02 _(core REST)_
  - PR [#23 Feature - 자동 SKU 등록 기능 추가](https://github.com/langcodestartup/PaperPop/pull/23) — login kimgooneya — opened 2022-03-02 — state closed — merged 2022-03-02 _(core REST)_
  - PR [#22 Feature - 자동 SKU 등록 기능 완료](https://github.com/langcodestartup/PaperPop/pull/22) — login kimgooneya — opened 2022-02-28 — state closed — merged 2022-02-28 _(core REST)_
  - PR [#21 버그 수정 - 분리 시 숫자 오류 (#20)](https://github.com/langcodestartup/PaperPop/pull/21) — login kimgooneya — opened 2022-02-25 — state closed — merged 2022-02-25 _(core REST)_
  - PR [#20 버그 수정 - 분리 시 숫자 오류](https://github.com/langcodestartup/PaperPop/pull/20) — login kimgooneya — opened 2022-02-25 — state closed — merged 2022-02-25 _(core REST)_
  - PR [#19 Bug Fix - 주문 조회 시 동일인 처리 문제 수정 - regex 사용이 잘못됨](https://github.com/langcodestartup/PaperPop/pull/19) — login kimgooneya — opened 2022-02-25 — state closed — merged 2022-02-25 _(core REST)_
  - PR [#18 기능 추가 패치 22.02.25](https://github.com/langcodestartup/PaperPop/pull/18) — login kimgooneya — opened 2022-02-25 — state closed — merged 2022-02-25 _(core REST)_
  - PR [#17 Feature - 동일인 색상 처리 추가](https://github.com/langcodestartup/PaperPop/pull/17) — login kimgooneya — opened 2022-02-25 — state closed — merged 2022-02-25 _(core REST)_
  - PR [#16 Feature - 테이블 축소 기능 추가, 폰트 어썸 추가](https://github.com/langcodestartup/PaperPop/pull/16) — login kimgooneya — opened 2022-02-24 — state closed — merged 2022-02-24 _(core REST)_
  - PR [#15 Bug fix - 분리 시 쇼핑몰 정보 누락 수정](https://github.com/langcodestartup/PaperPop/pull/15) — login kimgooneya — opened 2022-02-23 — state closed — merged 2022-02-23 _(core REST)_
  - PR [#14 Bug fix - JsonTable 새로운 줄 버그](https://github.com/langcodestartup/PaperPop/pull/14) — login kimgooneya — opened 2022-02-23 — state closed — merged 2022-02-23 _(core REST)_
  - PR [#13 Feature/allorders](https://github.com/langcodestartup/PaperPop/pull/13) — login kimgooneya — opened 2022-02-23 — state closed — merged 2022-02-23 _(core REST)_
  - PR [#12 🔨기능 정리](https://github.com/langcodestartup/PaperPop/pull/12) — login kimgooneya — opened 2022-02-11 — state closed — merged 2022-02-11 _(core REST)_
  - PR [#11 ⭐1차 작업 완료](https://github.com/langcodestartup/PaperPop/pull/11) — login kimgooneya — opened 2022-02-04 — state closed — merged 2022-02-04 _(core REST)_
  - PR [#10 Feature/excelupload](https://github.com/langcodestartup/PaperPop/pull/10) — login kimgooneya — opened 2022-02-03 — state closed — merged 2022-02-03 _(core REST)_
  - PR [#9 Product mapping table CRUD 완료](https://github.com/langcodestartup/PaperPop/pull/9) — login kimgooneya — opened 2022-02-03 — state closed — merged 2022-02-03 _(core REST)_
  - PR [#8 기능 보류](https://github.com/langcodestartup/PaperPop/pull/8) — login kimgooneya — opened 2022-02-02 — state closed — merged 2022-02-02 _(core REST)_
  - PR [#7 🔨cosmos patch item, table item patch](https://github.com/langcodestartup/PaperPop/pull/7) — login kimgooneya — opened 2022-01-29 — state closed — merged 2022-01-29 _(core REST)_
  - PR [#6 🔨 basic layout and design complete](https://github.com/langcodestartup/PaperPop/pull/6) — login kimgooneya — opened 2022-01-27 — state closed — merged 2022-01-27 _(core REST)_
  - PR [#5 🔨Feature/querydata](https://github.com/langcodestartup/PaperPop/pull/5) — login kimgooneya — opened 2022-01-25 — state closed — merged 2022-01-25 _(core REST)_
  - PR [#4 🔨 add Feature/jsontable](https://github.com/langcodestartup/PaperPop/pull/4) — login kimgooneya — opened 2022-01-24 — state closed — merged 2022-01-24 _(core REST)_
  - PR [#3 Feature/salesmanagebase](https://github.com/langcodestartup/PaperPop/pull/3) — login kimgooneya — opened 2022-01-20 — state closed — merged 2022-01-20 _(core REST)_
  - PR [#2 🔨 기능 추가](https://github.com/langcodestartup/PaperPop/pull/2) — login kimgooneya — opened 2022-01-15 — state closed — merged 2022-01-15 _(core REST)_
  - PR [#1 Orderpage base](https://github.com/langcodestartup/PaperPop/pull/1) — login kimgooneya — opened 2022-01-12 — state closed — merged 2022-01-12 _(core REST)_

## Langcode.PoC.Alpha

- Repository: [langcodestartup/Langcode.PoC.Alpha](https://github.com/langcodestartup/Langcode.PoC.Alpha)
- Default branch: `master`; visibility: private; archived: no
- Branch inventory observed: 1 branch(es)
  - `master` (487959b82f2b)
- Search query state: **PARTIAL / one or more query errors**; successful result sets: 4
- Contribution evidence in current pass: **No matching authored commits, PRs, or issues returned by paginated core REST; reviewer/comment activity remains UNKNOWN because Search was rate-limited**.

## LangcodeWork

- Repository: [langcodestartup/LangcodeWork](https://github.com/langcodestartup/LangcodeWork)
- Default branch: `master`; visibility: private; archived: no
- Branch inventory observed: 5 branch(es)
  - `master` (79d2d68018d0), `poc-kbhc/master` (fba3745daab6), `temp/hanwha` (4f4af1b164a2), `temp/sandbox` (8caf502b54f4), `temp/voucher` (bc3122a72ccf)
- Search query state: **PARTIAL / one or more query errors**; successful result sets: 4
- Contribution evidence in current pass: **No matching authored commits, PRs, or issues returned by paginated core REST; reviewer/comment activity remains UNKNOWN because Search was rate-limited**.

## LandingV3

- Repository: [langcodestartup/LandingV3](https://github.com/langcodestartup/LandingV3)
- Default branch: `master`; visibility: private; archived: no
- Branch inventory observed: 7 branch(es)
  - `dev` (45d441249dcb), `feature/jisoo` (8b0b637f931d), `feature/jylee` (154dde787be7), `feature/wschoi2` (0ce51283880a), `feature/yjkoh` (de4e643f76cc), `master` (2ce9b40198ee), `working/refactoring` (45d441249dcb)
- Search query state: **PARTIAL / one or more query errors**; successful result sets: 4
- Contribution evidence in current pass: **No matching authored commits, PRs, or issues returned by paginated core REST; reviewer/comment activity remains UNKNOWN because Search was rate-limited**.

## LangcodeWorkSaaS

- Repository: [langcodestartup/LangcodeWorkSaaS](https://github.com/langcodestartup/LangcodeWorkSaaS)
- Default branch: `master`; visibility: private; archived: no
- Branch inventory observed: 2 branch(es)
  - `feature/ui` (6165df04a0fd), `master` (1cca24f1afac)
- Search query state: **PARTIAL / one or more query errors**; successful result sets: 4
- Contribution evidence in current pass: **No matching authored commits, PRs, or issues returned by paginated core REST; reviewer/comment activity remains UNKNOWN because Search was rate-limited**.

## Langcode.CarbonDesign

- Repository: [langcodestartup/Langcode.CarbonDesign](https://github.com/langcodestartup/Langcode.CarbonDesign)
- Default branch: `master`; visibility: private; archived: no
- Branch inventory observed: 18 branch(es)
  - `datavoucher/dv-2024` (53af82de1fe7), `datavoucher/dv-2025` (5f8b36414fb5), `development` (f652ee2323ae), `feature/blob` (da91d4cf1a9c), `feature/uicomponent` (a7969dc91763), `master` (d1fe5ea82f40), `origin/working/2023voucher` (98aeaab062ec), `working/chat-function` (899d7ec18d5b), `working/data-picker` (d4ed9bc92c69), `working/edit-style` (45b89a411267), `working/new-side-nav` (1f4a43483624), `working/organize` (836b45173dc2), `working/pagination` (429bf7d00d4d), `working/slider` (c998ece119a4), `working/startuphub` (b0be8616f616), `working/tag` (5ad8ab84fe0c), `working/voucher-edit` (2be3dea8020c), `working/wschoi-voucher` (0297a0c65a88)
- Search query state: **PARTIAL / one or more query errors**; successful result sets: 4
- Matching commit records returned:
  - [dcfcb74fb9c7](https://github.com/langcodestartup/Langcode.CarbonDesign/commit/dcfcb74fb9c7f5260087c0b372e645cd8e4e4819) — kimgooneya — 2022-03-02 — Working/content switcher 추가 완료 (#4) _(core REST commit?author=kimgooneya)_
- Matching issue/PR records returned:
  - PR [#4 Working/content switcher 추가 완료](https://github.com/langcodestartup/Langcode.CarbonDesign/pull/4) — login kimgooneya — opened 2022-03-02 — state closed — merged 2022-03-02 _(core REST)_

## KbhcCosmosEngine

- Repository: [langcodestartup/KbhcCosmosEngine](https://github.com/langcodestartup/KbhcCosmosEngine)
- Default branch: `master`; visibility: private; archived: no
- Branch inventory observed: 21 branch(es)
  - `base` (7551d9dbcede), `deploy/prod202320231103` (c3aa7acfb35a), `deploy/qa20230304` (035a7a507e65), `fix/activity` (ac7a28f3de78), `fix/editFetchLogicByCheckPoint` (73a944592cbd), `master` (33c08a30302b), `moitonRecordAddActivity` (39e2bbcfa4c4), `prod/2022-11` (9838d23a113e), `prod/2023-01-12` (39ad82b9c9e7), `prod/2023-09-08` (39ad82b9c9e7), `prod-09` (1db335d28886), `publish` (97d609dc03fb), `qa2` (97d609dc03fb), `rollback2` (7120d206b75b), `wokring/CalcIncomingData` (b6d23f185eae), `working/cosmosTest` (69b8c1bf6e05), `working/date-exception-meal-composition` (0362162e6d60), `working/no-data-waist` (235ce978e50d), `working/nodata/bloodpressure` (efad0bef2058), `working/nodata/hiking-pulse` (2a5bc8ed1088), …
- Search query state: **PARTIAL / one or more query errors**; successful result sets: 4
- Matching issue/PR records returned:
  - PR [#62 식이 - 음료, 음주 기능 반영](https://github.com/langcodestartup/KbhcCosmosEngine/pull/62) — login kimgooneya — opened 2022-10-13 — state closed — merged 2022-10-13 _(core REST)_
  - PR [#61 값이 없는 음식 데이터도 0으로 환산하여 적용](https://github.com/langcodestartup/KbhcCosmosEngine/pull/61) — login kimgooneya — opened 2022-10-04 — state closed — merged 2022-10-04 _(core REST)_
  - PR [#60 식이 오류 수정](https://github.com/langcodestartup/KbhcCosmosEngine/pull/60) — login kimgooneya — opened 2022-09-22 — state closed — merged 2022-09-22 _(core REST)_
  - PR [#59 식이 오류 수정](https://github.com/langcodestartup/KbhcCosmosEngine/pull/59) — login kimgooneya — opened 2022-09-22 — state closed _(core REST)_
  - PR [#57 식이 오류 문제 처리  Journey 통계 수정 요청 22.06.22](https://github.com/langcodestartup/KbhcCosmosEngine/pull/57) — login kimgooneya — opened 2022-06-22 — state closed — merged 2022-06-22 _(core REST)_
  - PR [#56 식이-통계조회 수정 요청 내용 반영 + affectedStatDate 추가](https://github.com/langcodestartup/KbhcCosmosEngine/pull/56) — login kimgooneya — opened 2022-06-20 — state closed — merged 2022-06-20 _(core REST)_
  - PR [#55 식이, 체성분 queryDate 항목 수정 및 오류 추가](https://github.com/langcodestartup/KbhcCosmosEngine/pull/55) — login kimgooneya — opened 2022-06-15 — state closed — merged 2022-06-15 _(core REST)_
  - PR [#54 Working/month date split](https://github.com/langcodestartup/KbhcCosmosEngine/pull/54) — login kimgooneya — opened 2022-06-15 — state closed — merged 2022-06-15 _(core REST)_
  - PR [#53 Working/month date split](https://github.com/langcodestartup/KbhcCosmosEngine/pull/53) — login kimgooneya — opened 2022-06-13 — state closed — merged 2022-06-13 _(core REST)_
  - PR [#52 체성분 잘못된 arguments 입력 오류 처리](https://github.com/langcodestartup/KbhcCosmosEngine/pull/52) — login kimgooneya — opened 2022-06-13 — state closed — merged 2022-06-13 _(core REST)_
  - PR [#51 Working/meal response code](https://github.com/langcodestartup/KbhcCosmosEngine/pull/51) — login kimgooneya — opened 2022-06-13 — state closed — merged 2022-06-13 _(core REST)_
  - PR [#50 식이 recordkey 없을때 처리](https://github.com/langcodestartup/KbhcCosmosEngine/pull/50) — login kimgooneya — opened 2022-06-13 — state closed — merged 2022-06-13 _(core REST)_
  - PR [#49 Working/no data waist](https://github.com/langcodestartup/KbhcCosmosEngine/pull/49) — login kimgooneya — opened 2022-06-13 — state closed — merged 2022-06-13 _(core REST)_
  - PR [#48 허리둘레 no data 응답 처리 완료](https://github.com/langcodestartup/KbhcCosmosEngine/pull/48) — login kimgooneya — opened 2022-06-13 — state closed _(core REST)_
  - PR [#47 체성분 완료](https://github.com/langcodestartup/KbhcCosmosEngine/pull/47) — login kimgooneya — opened 2022-06-10 — state closed — merged 2022-06-10 _(core REST)_
  - PR [#46 체성분 완료](https://github.com/langcodestartup/KbhcCosmosEngine/pull/46) — login kimgooneya — opened 2022-06-10 — state closed _(core REST)_
  - PR [#45 식이 완료](https://github.com/langcodestartup/KbhcCosmosEngine/pull/45) — login kimgooneya — opened 2022-06-10 — state closed — merged 2022-06-10 _(core REST)_
  - PR [#44 식이 완료](https://github.com/langcodestartup/KbhcCosmosEngine/pull/44) — login kimgooneya — opened 2022-06-10 — state closed — merged 2022-06-10 _(core REST)_
  - PR [#39 알콜, 수분 식사시점, 일간 데이터 완성](https://github.com/langcodestartup/KbhcCosmosEngine/pull/39) — login kimgooneya — opened 2022-06-10 — state closed — merged 2022-06-10 _(core REST)_
  - PR [#38 Composition no data exception remove](https://github.com/langcodestartup/KbhcCosmosEngine/pull/38) — login kimgooneya — opened 2022-06-09 — state closed — merged 2022-06-09 _(core REST)_
  - PR [#37 composition no data exception remove](https://github.com/langcodestartup/KbhcCosmosEngine/pull/37) — login kimgooneya — opened 2022-06-09 — state closed _(core REST)_
  - PR [#36 식이 stat count 0 data 처리 완료](https://github.com/langcodestartup/KbhcCosmosEngine/pull/36) — login kimgooneya — opened 2022-06-09 — state closed — merged 2022-06-09 _(core REST)_
  - PR [#35 Working/meal alchol](https://github.com/langcodestartup/KbhcCosmosEngine/pull/35) — login kimgooneya — opened 2022-06-02 — state closed — merged 2022-06-02 _(core REST)_
  - PR [#34 Working/fix sleep](https://github.com/langcodestartup/KbhcCosmosEngine/pull/34) — login kimgooneya — opened 2022-05-30 — state closed — merged 2022-05-30 _(core REST)_
  - PR [#33 체성분 water 단위 kg 변경](https://github.com/langcodestartup/KbhcCosmosEngine/pull/33) — login kimgooneya — opened 2022-05-27 — state closed — merged 2022-05-27 _(core REST)_
  - PR [#32 체성분 주간, 월간, 연간 average 항목에 대한 수식 오류 수정](https://github.com/langcodestartup/KbhcCosmosEngine/pull/32) — login kimgooneya — opened 2022-05-26 — state closed — merged 2022-05-26 _(core REST)_
  - PR [#30 Working/meal fix](https://github.com/langcodestartup/KbhcCosmosEngine/pull/30) — login kimgooneya — opened 2022-05-26 — state closed — merged 2022-05-26 _(core REST)_
  - PR [#26 오류 내용 수정](https://github.com/langcodestartup/KbhcCosmosEngine/pull/26) — login kimgooneya — opened 2022-05-12 — state closed — merged 2022-05-12 _(core REST)_
  - PR [#19 Working/mergebranch](https://github.com/langcodestartup/KbhcCosmosEngine/pull/19) — login kimgooneya — opened 2022-04-26 — state closed — merged 2022-04-26 _(core REST)_
  - PR [#11 Record 데이터 병합](https://github.com/langcodestartup/KbhcCosmosEngine/pull/11) — login kimgooneya — opened 2022-04-19 — state closed — merged 2022-04-19 _(core REST)_
  - PR [#4 fix no data](https://github.com/langcodestartup/KbhcCosmosEngine/pull/4) — login kimgooneya — opened 2022-04-13 — state closed — merged 2022-04-13 _(core REST)_
  - PR [#1 fix utc, fix stats, change value dict](https://github.com/langcodestartup/KbhcCosmosEngine/pull/1) — login kimgooneya — opened 2022-04-13 — state closed — merged 2022-04-13 _(core REST)_

## KbhcDbSyncFunction

- Repository: [langcodestartup/KbhcDbSyncFunction](https://github.com/langcodestartup/KbhcDbSyncFunction)
- Default branch: `master`; visibility: private; archived: no
- Branch inventory observed: 2 branch(es)
  - `master` (78fedad04d8d), `prod` (dbb74e6cc77a)
- Search query state: **PARTIAL / one or more query errors**; successful result sets: 4
- Contribution evidence in current pass: **No matching authored commits, PRs, or issues returned by paginated core REST; reviewer/comment activity remains UNKNOWN because Search was rate-limited**.

## LangcodeCarbon

- Repository: [langcodestartup/LangcodeCarbon](https://github.com/langcodestartup/LangcodeCarbon)
- Default branch: `master`; visibility: private; archived: no
- Branch inventory observed: 1 branch(es)
  - `master` (419defdb2028)
- Search query state: **PARTIAL / one or more query errors**; successful result sets: 4
- Contribution evidence in current pass: **No matching authored commits, PRs, or issues returned by paginated core REST; reviewer/comment activity remains UNKNOWN because Search was rate-limited**.

## Langcode.CXP

- Repository: [langcodestartup/Langcode.CXP](https://github.com/langcodestartup/Langcode.CXP)
- Default branch: `master`; visibility: private; archived: no
- Branch inventory observed: 100 branch(es)
  - `CarbonComponent/CarbonTableLabelElement` (a6ea29f68dfa), `CarbonComponent/CleanCodeRenderer` (2c52d3a0536c), `CarbonComponent/DeleteLeftPanel` (b89163e471f5), `CarbonComponent/InlineLoading` (71119dadaa2d), `CarbonComponent/LabelElement` (59b85769fad9), `CarbonComponent/Loading` (ebd1c96d7996), `CarbonComponent/Slider` (2c048f400d50), `CarbonComponent/Tabs` (95e7054466b6), `CarbonComponent/Tag` (eb7cd2435a47), `CarbonComponent/actionType` (4864d1fe9dca), `CarbonComponent/headerbase` (9bd51e45dcab), `Component/QuickGrid` (cf871e0608b9), `Component/QuickGridExpandable` (b28a21076325), `Component/QuickGridTest2` (ddf271eb1c63), `Core` (958d47a3ffbb), `Ground/Carbon_v11` (fc6e1f64cf65), `Ground/Chat` (672d6b957cff), `Ground/IntoRenderer` (9ffc3b7372f1), `OldCore` (8845fb8846f4), `active/cxp-app` (3fc45949cab3), …
- Search query state: **PARTIAL / one or more query errors**; successful result sets: 4
- Matching commit records returned:
  - [d4d58560491c](https://github.com/langcodestartup/Langcode.CXP/commit/d4d58560491cb6e16ec777a9d8e9581e6d477483) — kimgooneya — 2022-11-15 — Netmarble master branch set (#45) _(core REST commit?author=kimgooneya)_
- Matching issue/PR records returned:
  - PR [#45 Netmarble master branch set](https://github.com/langcodestartup/Langcode.CXP/pull/45) — login kimgooneya — opened 2022-11-15 — state closed — merged 2022-11-15 _(core REST)_
  - PR [#20 common model, field, type 수정](https://github.com/langcodestartup/Langcode.CXP/pull/20) — login kimgooneya — opened 2022-07-28 — state closed — merged 2022-07-28 _(core REST)_
  - PR [#13 코스모스 벌크 서비스 추가](https://github.com/langcodestartup/Langcode.CXP/pull/13) — login kimgooneya — opened 2022-07-22 — state closed — merged 2022-07-22 _(core REST)_
  - PR [#12 고객, 파트너 정보 CRUD 완성](https://github.com/langcodestartup/Langcode.CXP/pull/12) — login kimgooneya — opened 2022-07-21 — state closed — merged 2022-07-21 _(core REST)_
  - PR [#11 고객, 파트너 정보 CRUD 완성](https://github.com/langcodestartup/Langcode.CXP/pull/11) — login kimgooneya — opened 2022-07-21 — state closed _(core REST)_
  - PR [#10 Invoice 일부 수정, 파트너, 고객 CRUD 기능 완료](https://github.com/langcodestartup/Langcode.CXP/pull/10) — login kimgooneya — opened 2022-07-20 — state closed — merged 2022-07-20 _(core REST)_
  - PR [#9 Invoice 일부 수정, 파트너, 고객 CRUD 기능 완료](https://github.com/langcodestartup/Langcode.CXP/pull/9) — login kimgooneya — opened 2022-07-20 — state closed _(core REST)_
  - PR [#8 SchemaInfo Controller + Service 독립](https://github.com/langcodestartup/Langcode.CXP/pull/8) — login kimgooneya — opened 2022-07-19 — state closed — merged 2022-07-19 _(core REST)_
  - PR [#6 Spininvoice/working/invoice insert](https://github.com/langcodestartup/Langcode.CXP/pull/6) — login kimgooneya — opened 2022-07-19 — state closed — merged 2022-07-19 _(core REST)_
  - PR [#5 Spininvoice/working/invoice insert](https://github.com/langcodestartup/Langcode.CXP/pull/5) — login kimgooneya — opened 2022-07-19 — state closed _(core REST)_
  - PR [#3 블롭 직배송 완료](https://github.com/langcodestartup/Langcode.CXP/pull/3) — login kimgooneya — opened 2022-07-18 — state closed — merged 2022-07-18 _(core REST)_
  - PR [#2 커먼 모델 테이블의 셀 컴포넌트 수정](https://github.com/langcodestartup/Langcode.CXP/pull/2) — login kimgooneya — opened 2022-07-18 — state closed — merged 2022-07-18 _(core REST)_
  - PR [#1 Spininvoice/commonmodel](https://github.com/langcodestartup/Langcode.CXP/pull/1) — login kimgooneya — opened 2022-07-18 — state closed — merged 2022-07-18 _(core REST)_

## PopperTest

- Repository: [langcodestartup/PopperTest](https://github.com/langcodestartup/PopperTest)
- Default branch: `master`; visibility: private; archived: no
- Branch inventory observed: 1 branch(es)
  - `master` (1857fa50cd44)
- Search query state: **PARTIAL / one or more query errors**; successful result sets: 4
- Contribution evidence in current pass: **No matching authored commits, PRs, or issues returned by paginated core REST; reviewer/comment activity remains UNKNOWN because Search was rate-limited**.

## MongoDbTest

- Repository: [langcodestartup/MongoDbTest](https://github.com/langcodestartup/MongoDbTest)
- Default branch: `master`; visibility: private; archived: no
- Branch inventory observed: 1 branch(es)
  - `master` (bd101d4000ae)
- Search query state: **PARTIAL / one or more query errors**; successful result sets: 4
- Contribution evidence in current pass: **No matching authored commits, PRs, or issues returned by paginated core REST; reviewer/comment activity remains UNKNOWN because Search was rate-limited**.

## KbhcBot

- Repository: [langcodestartup/KbhcBot](https://github.com/langcodestartup/KbhcBot)
- Default branch: `master`; visibility: private; archived: no
- Branch inventory observed: 6 branch(es)
  - `Core` (56ad1755d48a), `Working/Content-1` (a105dfb340bb), `Working/Demo` (75947899dccd), `Working/prod` (eae06b4e9c53), `Working/qa` (3fddeb828231), `master` (0aae9d563d8f)
- Search query state: **PARTIAL / one or more query errors**; successful result sets: 4
- Contribution evidence in current pass: **No matching authored commits, PRs, or issues returned by paginated core REST; reviewer/comment activity remains UNKNOWN because Search was rate-limited**.

## ML.NET_Test

- Repository: [langcodestartup/ML.NET_Test](https://github.com/langcodestartup/ML.NET_Test)
- Default branch: `master`; visibility: private; archived: no
- Branch inventory observed: 1 branch(es)
  - `master` (9a33055157a2)
- Search query state: **PARTIAL / one or more query errors**; successful result sets: 4
- Contribution evidence in current pass: **No matching authored commits, PRs, or issues returned by paginated core REST; reviewer/comment activity remains UNKNOWN because Search was rate-limited**.

## MBition

- Repository: [langcodestartup/MBition](https://github.com/langcodestartup/MBition)
- Default branch: `master`; visibility: private; archived: no
- Branch inventory observed: 17 branch(es)
  - `Core` (9cc7faf8c660), `dev/knowledgebase` (fc5f2572d275), `dev/knowledgebase2` (51ea73137072), `dev/temp` (7fdd0cf59fee), `master` (1a6143ef01d6), `working/cloneChangshinChatUI` (42ae1bc96935), `working/modal` (21df1ee47cea), `working/pull` (0003ba6f2f2a), `working/records` (d877f881505d), `working/rocketchat` (b59f74a7c046), `working/run4` (c9e83782b01b), `working/run5` (1d6d100cc269), `working/run6` (6ebb9b27ca89), `working/run7` (f8278fa4b8a3), `working/run8` (1b5f45d24eea), `working/run9` (583666126cfb), `working/webhook` (4ffe3863f359)
- Search query state: **PARTIAL / one or more query errors**; successful result sets: 4
- Contribution evidence in current pass: **No matching authored commits, PRs, or issues returned by paginated core REST; reviewer/comment activity remains UNKNOWN because Search was rate-limited**.

## MLNetKeywordExtraction

- Repository: [langcodestartup/MLNetKeywordExtraction](https://github.com/langcodestartup/MLNetKeywordExtraction)
- Default branch: `master`; visibility: private; archived: no
- Branch inventory observed: 1 branch(es)
  - `master` (fe2979eecf14)
- Search query state: **PARTIAL / one or more query errors**; successful result sets: 4
- Contribution evidence in current pass: **No matching authored commits, PRs, or issues returned by paginated core REST; reviewer/comment activity remains UNKNOWN because Search was rate-limited**.

## LatentDirichletAllocation

- Repository: [langcodestartup/LatentDirichletAllocation](https://github.com/langcodestartup/LatentDirichletAllocation)
- Default branch: `master`; visibility: private; archived: no
- Branch inventory observed: 1 branch(es)
  - `master` (e5abea5bc47a)
- Search query state: **PARTIAL / one or more query errors**; successful result sets: 4
- Contribution evidence in current pass: **No matching authored commits, PRs, or issues returned by paginated core REST; reviewer/comment activity remains UNKNOWN because Search was rate-limited**.

## MBitionTopic

- Repository: [langcodestartup/MBitionTopic](https://github.com/langcodestartup/MBitionTopic)
- Default branch: `master`; visibility: private; archived: no
- Branch inventory observed: 1 branch(es)
  - `master` (4dd6b5719dd1)
- Search query state: **PARTIAL / one or more query errors**; successful result sets: 4
- Contribution evidence in current pass: **No matching authored commits, PRs, or issues returned by paginated core REST; reviewer/comment activity remains UNKNOWN because Search was rate-limited**.

## NetmarblePoC

- Repository: [langcodestartup/NetmarblePoC](https://github.com/langcodestartup/NetmarblePoC)
- Default branch: `master`; visibility: private; archived: no
- Branch inventory observed: 7 branch(es)
  - `development` (333a0ddff3c5), `master` (1a6143ef01d6), `netmarble/add-data-ingest` (023f138ad17c), `netmarble/v1` (d4d17fc9332c), `netmarble/v2` (54c7cde9384c), `working/scroll-doc-v2` (95ac86af680e), `working/split-section` (2639228eda9a)
- Search query state: **PARTIAL / one or more query errors**; successful result sets: 4
- Matching issue/PR records returned:
  - PR [#1 Ibk/v1](https://github.com/langcodestartup/NetmarblePoC/pull/1) — login kimgooneya — opened 2022-11-10 — state closed — merged 2022-11-10 _(core REST)_

## kotraPoC

- Repository: [langcodestartup/kotraPoC](https://github.com/langcodestartup/kotraPoC)
- Default branch: `master`; visibility: private; archived: no
- Branch inventory observed: 3 branch(es)
  - `develop` (9eec0b3dd853), `master` (30a89d52cbda), `working/card-virtualize` (30a89d52cbda)
- Search query state: **PARTIAL / one or more query errors**; successful result sets: 4
- Matching commit records returned:
  - [c7cd8672b4e3](https://github.com/langcodestartup/kotraPoC/commit/c7cd8672b4e370dd9fc3cf46b82850c64b7cf4b1) — kimgooneya — 2022-07-28 — common model, field, type 수정 (#20) _(core REST commit?author=kimgooneya)_

## ibkPoC

- Repository: [langcodestartup/ibkPoC](https://github.com/langcodestartup/ibkPoC)
- Default branch: `master`; visibility: private; archived: no
- Branch inventory observed: 8 branch(es)
  - `ibk/chatmodal` (624ccd726da9), `ibk/v1` (556ff1a967c4), `master` (8978401fa1a2), `working/card-message-match` (006af51b6b1a), `working/handle-document-type` (bc2e05e01f54), `working/qna` (c390ce693a21), `working/refactoring` (ef813233cfbd), `working/virtualize-chat` (c5a68066cd7e)
- Search query state: **PARTIAL / one or more query errors**; successful result sets: 4
- Matching commit records returned:
  - [8978401fa1a2](https://github.com/langcodestartup/ibkPoC/commit/8978401fa1a2e4a2ac63172b1c3a09b5947f8a6f) — kimgooneya — 2022-12-08 — 역방향 정렬 -> 순방향 정렬로 변경 _(core REST commit?author=kimgooneya)_
  - [006af51b6b1a](https://github.com/langcodestartup/ibkPoC/commit/006af51b6b1ac88ab1a6f42fe05b50b582b82f28) — kimgooneya — 2022-12-08 — 역방향 정렬 -> 순방향 정렬로 변경 _(core REST commit?author=kimgooneya)_
  - [061f811749a6](https://github.com/langcodestartup/ibkPoC/commit/061f811749a69bf6b0c9363a67a3ecb01f96196c) — kimgooneya — 2022-12-08 — Test #2 FeedBack Requirement 적용 _(core REST commit?author=kimgooneya)_
  - [1f9b15c18b7f](https://github.com/langcodestartup/ibkPoC/commit/1f9b15c18b7fc6f768bb4f6b546d717a87c4fa5b) — kimgooneya — 2022-12-08 — chat input auto height 적용 _(core REST commit?author=kimgooneya)_
  - [d78e9b3abdef](https://github.com/langcodestartup/ibkPoC/commit/d78e9b3abdefdca1c004a26b8108728ab6580363) — kimgooneya — 2022-12-08 — 반영완료 _(core REST commit?author=kimgooneya)_
  - [c47ec08b9e83](https://github.com/langcodestartup/ibkPoC/commit/c47ec08b9e837ec268b39d005d94532b4388a25c) — kimgooneya — 2022-12-06 —  chunk 진행 중 _(core REST commit?author=kimgooneya)_
  - [e33a514c811d](https://github.com/langcodestartup/ibkPoC/commit/e33a514c811dd8a98902629481c976279417c81c) — kimgooneya — 2022-11-29 — 중간저장 _(core REST commit?author=kimgooneya)_
  - [fe66156020bc](https://github.com/langcodestartup/ibkPoC/commit/fe66156020bcc418ae2e8e93031a60a5458e7e6b) — kimgooneya — 2022-11-25 — 가상화 지원 완료 _(core REST commit?author=kimgooneya)_
  - [abf4ce37bcd0](https://github.com/langcodestartup/ibkPoC/commit/abf4ce37bcd08bffd8c57a918f80cc1e42fb3290) — kimgooneya — 2022-11-25 — 모달 띄우기 기본 미리 보기 적용 - 버그 있음 _(core REST commit?author=kimgooneya)_
  - [f0cc9fe5bca0](https://github.com/langcodestartup/ibkPoC/commit/f0cc9fe5bca09e0bff7e9e9e4a60c87f9eeab38c) — kimgooneya — 2022-11-25 — using 정리 _(core REST commit?author=kimgooneya)_
  - [615f14871469](https://github.com/langcodestartup/ibkPoC/commit/615f1487146914a5f3a85ecd56e2df4fc950d00b) — kimgooneya — 2022-11-24 — 반응 속도를 위해 카드 접어서 표시 css 도 변경 _(core REST commit?author=kimgooneya)_
  - [b87c8a3b91eb](https://github.com/langcodestartup/ibkPoC/commit/b87c8a3b91eb042dd44ba83391b3716f60fac6fd) — kimgooneya — 2022-11-24 — apply virtualize chat messages _(core REST commit?author=kimgooneya)_
  - [086f1c811e5f](https://github.com/langcodestartup/ibkPoC/commit/086f1c811e5ff2557e94cf749624a83e640f69c2) — kimgooneya — 2022-11-10 — Merge branch 'ibk/chatmodal' into ibk/v1 _(core REST commit?author=kimgooneya)_
  - [624ccd726da9](https://github.com/langcodestartup/ibkPoC/commit/624ccd726da941a6192738e1cd346ca43ea3ba9f) — kimgooneya — 2022-11-10 — pdf modal complete _(core REST commit?author=kimgooneya)_
  - [32c6e143a59a](https://github.com/langcodestartup/ibkPoC/commit/32c6e143a59a5dc5cf965daae173b70a5c2d67d6) — kimgooneya — 2022-11-10 — pdf  modal add _(core REST commit?author=kimgooneya)_
  - [c7cd8672b4e3](https://github.com/langcodestartup/ibkPoC/commit/c7cd8672b4e370dd9fc3cf46b82850c64b7cf4b1) — kimgooneya — 2022-07-28 — common model, field, type 수정 (#20) _(core REST commit?author=kimgooneya)_
- Matching issue/PR records returned:
  - PR [#2 역방향 정렬 -> 순방향 정렬로 변경](https://github.com/langcodestartup/ibkPoC/pull/2) — login kimgooneya — opened 2022-12-08 — state closed — merged 2022-12-08 _(core REST)_
  - PR [#1 Test #2 FeedBack Requirement 적용](https://github.com/langcodestartup/ibkPoC/pull/1) — login kimgooneya — opened 2022-12-08 — state closed — merged 2022-12-08 _(core REST)_

## LInqExampleWithTest

- Repository: [langcodestartup/LInqExampleWithTest](https://github.com/langcodestartup/LInqExampleWithTest)
- Default branch: `master`; visibility: private; archived: no
- Branch inventory observed: 1 branch(es)
  - `master` (9772d9fa9cd1)
- Search query state: **PARTIAL / one or more query errors**; successful result sets: 4
- Contribution evidence in current pass: **No matching authored commits, PRs, or issues returned by paginated core REST; reviewer/comment activity remains UNKNOWN because Search was rate-limited**.

## LandingV4

- Repository: [langcodestartup/LandingV4](https://github.com/langcodestartup/LandingV4)
- Default branch: `master`; visibility: private; archived: no
- Branch inventory observed: 7 branch(es)
  - `deploy` (ceef427d2656), `dev` (4e83938e5980), `fix` (81b4e5aa3536), `localization-middleware` (7695cfcb27ed), `master` (35b9e33d9596), `test` (f49968a31739), `yjkang` (dcf11cf3d0d0)
- Search query state: **PARTIAL / one or more query errors**; successful result sets: 4
- Contribution evidence in current pass: **No matching authored commits, PRs, or issues returned by paginated core REST; reviewer/comment activity remains UNKNOWN because Search was rate-limited**.

## IdentityExample

- Repository: [langcodestartup/IdentityExample](https://github.com/langcodestartup/IdentityExample)
- Default branch: `master`; visibility: private; archived: no
- Branch inventory observed: 1 branch(es)
  - `master` (472bc711a2fe)
- Search query state: **PARTIAL / one or more query errors**; successful result sets: 4
- Matching commit records returned:
  - [472bc711a2fe](https://github.com/langcodestartup/IdentityExample/commit/472bc711a2fe77f002f9941364ca5053c9cf2a49) — kimgooneya — 2023-02-15 — complete _(core REST commit?author=kimgooneya)_
  - [3440b532b393](https://github.com/langcodestartup/IdentityExample/commit/3440b532b393aca9e9e9432c498738f8cbe59642) — kimgooneya — 2023-02-15 — Scaffolding Register Page _(core REST commit?author=kimgooneya)_
  - [76028886be7d](https://github.com/langcodestartup/IdentityExample/commit/76028886be7d3dd6b4688bbd5caba8f882d24864) — kimgooneya — 2023-02-15 — Add project files. _(core REST commit?author=kimgooneya)_
  - [ad7e8e23eb92](https://github.com/langcodestartup/IdentityExample/commit/ad7e8e23eb92e35709193d969251ef4d21777057) — kimgooneya — 2023-02-15 — Add .gitattributes and .gitignore. _(core REST commit?author=kimgooneya)_

## NotionAPI

- Repository: [langcodestartup/NotionAPI](https://github.com/langcodestartup/NotionAPI)
- Default branch: `main`; visibility: private; archived: no
- Branch inventory observed: 3 branch(es)
  - `core` (bb675d624c05), `main` (6de7f4aeb092), `working/html-generator` (4644a497b18a)
- Search query state: **PARTIAL / one or more query errors**; successful result sets: 4
- Contribution evidence in current pass: **No matching authored commits, PRs, or issues returned by paginated core REST; reviewer/comment activity remains UNKNOWN because Search was rate-limited**.

## Langcode.CXP.v2.UI

- Repository: [langcodestartup/Langcode.CXP.v2.UI](https://github.com/langcodestartup/Langcode.CXP.v2.UI)
- Default branch: `master`; visibility: private; archived: no
- Branch inventory observed: 4 branch(es)
  - `core` (e2df98327c6a), `master` (6efc7c4adeb4), `working/BotAlarm` (f99f8d0cb6d3), `working/dashboard-1` (7f93883d1e07)
- Search query state: **PARTIAL / one or more query errors**; successful result sets: 4
- Contribution evidence in current pass: **No matching authored commits, PRs, or issues returned by paginated core REST; reviewer/comment activity remains UNKNOWN because Search was rate-limited**.

## KT

- Repository: [langcodestartup/KT](https://github.com/langcodestartup/KT)
- Default branch: `master`; visibility: private; archived: no
- Branch inventory observed: 87 branch(es)
  - `CarbonComponent/CarbonTableLabelElement` (a6ea29f68dfa), `CarbonComponent/CleanCodeRenderer` (2c52d3a0536c), `CarbonComponent/DeleteLeftPanel` (b89163e471f5), `CarbonComponent/InlineLoading` (71119dadaa2d), `CarbonComponent/LabelElement` (59b85769fad9), `CarbonComponent/Loading` (ebd1c96d7996), `CarbonComponent/Slider` (2c048f400d50), `CarbonComponent/Tabs` (95e7054466b6), `CarbonComponent/Tag` (eb7cd2435a47), `CarbonComponent/actionType` (4864d1fe9dca), `CarbonComponent/headerbase` (9bd51e45dcab), `Core` (958d47a3ffbb), `Ground/Carbon_v11` (fc6e1f64cf65), `Ground/Chat` (672d6b957cff), `Ground/IntoRenderer` (9ffc3b7372f1), `OldCore` (8845fb8846f4), `active/cxp-app` (28b7d8704724), `demo/ahn` (8c0a43028ba6), `demo/chanel-202203` (84f83dfc8056), `demo/gpt` (0df6c9226ac6), …
- Search query state: **PARTIAL / one or more query errors**; successful result sets: 4
- Matching commit records returned:
  - [d4d58560491c](https://github.com/langcodestartup/KT/commit/d4d58560491cb6e16ec777a9d8e9581e6d477483) — kimgooneya — 2022-11-15 — Netmarble master branch set (#45) _(core REST commit?author=kimgooneya)_

## KoreaSeven

- Repository: [langcodestartup/KoreaSeven](https://github.com/langcodestartup/KoreaSeven)
- Default branch: `master`; visibility: private; archived: no
- Branch inventory observed: 59 branch(es)
  - `CarbonComponent/CarbonTableLabelElement` (a6ea29f68dfa), `CarbonComponent/CleanCodeRenderer` (2c52d3a0536c), `CarbonComponent/DeleteLeftPanel` (b89163e471f5), `CarbonComponent/InlineLoading` (71119dadaa2d), `CarbonComponent/LabelElement` (59b85769fad9), `CarbonComponent/Loading` (ebd1c96d7996), `CarbonComponent/Slider` (2c048f400d50), `CarbonComponent/Tabs` (95e7054466b6), `CarbonComponent/Tag` (eb7cd2435a47), `CarbonComponent/actionType` (4864d1fe9dca), `CarbonComponent/headerbase` (9bd51e45dcab), `Component/QuickGrid` (ddf271eb1c63), `Component/QuickGridTest2` (ddf271eb1c63), `Core` (958d47a3ffbb), `Ground/Carbon_v11` (fc6e1f64cf65), `Ground/Chat` (672d6b957cff), `Ground/IntoRenderer` (9ffc3b7372f1), `OldCore` (8845fb8846f4), `active/cxp-app` (28b7d8704724), `demo/ahn` (8c0a43028ba6), …
- Search query state: **PARTIAL / one or more query errors**; successful result sets: 4
- Matching commit records returned:
  - [d4d58560491c](https://github.com/langcodestartup/KoreaSeven/commit/d4d58560491cb6e16ec777a9d8e9581e6d477483) — kimgooneya — 2022-11-15 — Netmarble master branch set (#45) _(core REST commit?author=kimgooneya)_

## LgjCenter

- Repository: [langcodestartup/LgjCenter](https://github.com/langcodestartup/LgjCenter)
- Default branch: `master`; visibility: private; archived: no
- Branch inventory observed: 46 branch(es)
  - `CarbonComponent/CarbonTableLabelElement` (a6ea29f68dfa), `CarbonComponent/CleanCodeRenderer` (2c52d3a0536c), `CarbonComponent/DeleteLeftPanel` (b89163e471f5), `CarbonComponent/InlineLoading` (71119dadaa2d), `CarbonComponent/LabelElement` (59b85769fad9), `CarbonComponent/Loading` (ebd1c96d7996), `CarbonComponent/Slider` (2c048f400d50), `CarbonComponent/Tabs` (95e7054466b6), `CarbonComponent/Tag` (eb7cd2435a47), `CarbonComponent/actionType` (4864d1fe9dca), `CarbonComponent/headerbase` (9bd51e45dcab), `Component/QuickGrid` (cf871e0608b9), `Component/QuickGridExpandable` (b28a21076325), `Component/QuickGridTest2` (ddf271eb1c63), `Core` (958d47a3ffbb), `Ground/Carbon_v11` (fc6e1f64cf65), `Ground/Chat` (672d6b957cff), `Ground/IntoRenderer` (9ffc3b7372f1), `OldCore` (8845fb8846f4), `active/cxp-app` (3fc45949cab3), …
- Search query state: **PARTIAL / one or more query errors**; successful result sets: 4
- Matching commit records returned:
  - [d4d58560491c](https://github.com/langcodestartup/LgjCenter/commit/d4d58560491cb6e16ec777a9d8e9581e6d477483) — kimgooneya — 2022-11-15 — Netmarble master branch set (#45) _(core REST commit?author=kimgooneya)_

## LDAP_Exam

- Repository: [langcodestartup/LDAP_Exam](https://github.com/langcodestartup/LDAP_Exam)
- Default branch: `main`; visibility: private; archived: no
- Branch inventory observed: 0 branch(es)
- Search query state: **PARTIAL / one or more query errors**; successful result sets: 4
- Contribution evidence in current pass: **No Git repository content; no contribution evidence possible**.

## LDAP_ConsoleApp_Exam

- Repository: [langcodestartup/LDAP_ConsoleApp_Exam](https://github.com/langcodestartup/LDAP_ConsoleApp_Exam)
- Default branch: `master`; visibility: private; archived: no
- Branch inventory observed: 1 branch(es)
  - `master` (53ffeb7ce6be)
- Search query state: **PARTIAL / one or more query errors**; successful result sets: 4
- Contribution evidence in current pass: **No matching authored commits, PRs, or issues returned by paginated core REST; reviewer/comment activity remains UNKNOWN because Search was rate-limited**.

## KotraCrawling

- Repository: [langcodestartup/KotraCrawling](https://github.com/langcodestartup/KotraCrawling)
- Default branch: `main`; visibility: private; archived: no
- Branch inventory observed: 1 branch(es)
  - `main` (07aabcb4bc1c)
- Search query state: **PARTIAL / one or more query errors**; successful result sets: 7
- Contribution evidence in current pass: **No matching authored commits, PRs, or issues returned by paginated core REST; reviewer/comment activity remains UNKNOWN because Search was rate-limited**.

## NHBank

- Repository: [langcodestartup/NHBank](https://github.com/langcodestartup/NHBank)
- Default branch: `master`; visibility: private; archived: no
- Branch inventory observed: 6 branch(es)
  - `feat/blob-crd` (fa959b99f659), `master` (b2f0b280bb0c), `release/2025-02-14` (a267a857097c), `release/2025-04-18` (3f2ee3eaa493), `working/log-add` (067609821ffe), `working/rag-log` (1a08933c3f2f)
- Search query state: **PARTIAL / one or more query errors**; successful result sets: 8
- Matching commit records returned:
  - [b2f0b280bb0c](https://github.com/langcodestartup/NHBank/commit/b2f0b280bb0cd52eede95269e481de79e3d2f708) — kimgooneya — 2026-06-20 — Azure OpenAI 토큰 사용량 안정화 _(core REST commit?author=kimgooneya)_
  - [33fa8066870f](https://github.com/langcodestartup/NHBank/commit/33fa8066870f35dbb9699515fa6c5752caf51a85) — kimgooneya — 2026-05-13 — fix: SK 1.76.0 Handlebars 인코딩 회귀 해결 + obsolete invalid-deployment 테스트 제거 _(core REST commit?author=kimgooneya)_
  - [6bfe639eb1cc](https://github.com/langcodestartup/NHBank/commit/6bfe639eb1ccc7d3de1b0209b06cbc41b1ce6718) — kimgooneya — 2026-05-13 — docs: LLM 환경변수화 + SDK v2 배포 환경 적용 가이드 추가 _(core REST commit?author=kimgooneya)_
  - [ee514b27b3c9](https://github.com/langcodestartup/NHBank/commit/ee514b27b3c9d9940cb200f10b8cea7afedcc8c7) — kimgooneya — 2026-05-13 — Postman 컬렉션의 사용자 지정 모델 쿼리 항목 제거 _(core REST commit?author=kimgooneya)_
  - [9c7951424bcf](https://github.com/langcodestartup/NHBank/commit/9c7951424bcf8de8a2a5663309f0ac587f8414f3) — kimgooneya — 2026-05-13 — LLM 환경변수화 + SDK v2 마이그레이션 implementation plan 추가 _(core REST commit?author=kimgooneya)_
  - [92a5d79fe296](https://github.com/langcodestartup/NHBank/commit/92a5d79fe29662027042e8f7c524d8b23859aef0) — kimgooneya — 2026-05-13 — LLM 환경변수화 + Azure SDK v2 마이그레이션 설계 문서 추가 _(core REST commit?author=kimgooneya)_
  - [a8da320606ab](https://github.com/langcodestartup/NHBank/commit/a8da320606ab220cf0302e09b40b9022176013c7) — kimgooneya — 2026-05-13 — refactor: LLM 환경변수화 + Azure.AI.OpenAI v2 마이그레이션 (#97) _(core REST commit?author=kimgooneya)_
  - [bb931ef9ad89](https://github.com/langcodestartup/NHBank/commit/bb931ef9ad8983ec22e2739982a1029bef6ce99f) — kimgooneya — 2026-05-12 — Postman 컬렉션의 레거시 입력 키를 소스 스키마로 정합 _(core REST commit?author=kimgooneya)_
  - [4a6ea594b5c5](https://github.com/langcodestartup/NHBank/commit/4a6ea594b5c541d655442b571aa76419a0591f9d) — kimgooneya — 2026-05-12 — Server.Tests/Tcb 재구성: typed fixture + 전수 통합 + 응답 아티팩트 _(core REST commit?author=kimgooneya)_
  - [561a23ea08b5](https://github.com/langcodestartup/NHBank/commit/561a23ea08b5eecba6d00d69225be6a46d890b71) — kimgooneya — 2026-05-12 — TCB 토큰 카운팅을 effectiveModel로 분기 + 다중 모델 스트리밍 토큰 추적 _(core REST commit?author=kimgooneya)_
  - [4fc94b5a044c](https://github.com/langcodestartup/NHBank/commit/4fc94b5a044cfdce4ba0983daadea1cdec12340f) — kimgooneya — 2026-05-12 — TCB 35개 모듈에 RequiredColumns + AF01 출력 검증 부착 _(core REST commit?author=kimgooneya)_
  - [8caa747a8071](https://github.com/langcodestartup/NHBank/commit/8caa747a8071350b1c7b36269f4afc767a716068) — kimgooneya — 2026-05-12 — TCBService에 규격 검증 파이프라인 통합 _(core REST commit?author=kimgooneya)_
  - [aa17a71228ad](https://github.com/langcodestartup/NHBank/commit/aa17a71228adf2f1f32ed7307919a45b87562c4d) — kimgooneya — 2026-05-12 — TCB 응답 규격 검증 프레임워크 추가 _(core REST commit?author=kimgooneya)_
  - [4765256ef0c0](https://github.com/langcodestartup/NHBank/commit/4765256ef0c03eeba8ea72f7edf2773e8962b4d7) — kimgooneya — 2026-05-12 — TCBErrorSanitizer 단위 테스트 추가 _(core REST commit?author=kimgooneya)_
  - [e175f38bf322](https://github.com/langcodestartup/NHBank/commit/e175f38bf32209906bf36b4d4123aa42634b5387) — kimgooneya — 2026-05-12 — VS Code F5 디버깅 설정 추가 _(core REST commit?author=kimgooneya)_
  - [452d58b361c6](https://github.com/langcodestartup/NHBank/commit/452d58b361c63c63061ddda845f8f18221b8d466) — kimgooneya — 2026-05-12 — TCB 에러 응답 sanitize + JSON 필드 경로 노출 _(core REST commit?author=kimgooneya)_
  - [8846f5d91130](https://github.com/langcodestartup/NHBank/commit/8846f5d91130652255f8e7f911eec837affb43e0) — kimgooneya — 2026-05-12 — .gitignore: .claude/scheduled_tasks.lock 무시 _(core REST commit?author=kimgooneya)_
  - [67151338931e](https://github.com/langcodestartup/NHBank/commit/67151338931e091af60090f79bdb0a445b72dc31) — kimgooneya — 2026-05-12 — SignalR 정리 후속: 미들웨어의 /hub, /lib 경로 우회 제거 _(core REST commit?author=kimgooneya)_
  - [c57078f56aa6](https://github.com/langcodestartup/NHBank/commit/c57078f56aa6ec11bf59af52ea4d3e8516b8c94c) — kimgooneya — 2026-05-12 — RoundRobin 제거 및 AzureOpenAI 단일 클라이언트 리팩터 _(core REST commit?author=kimgooneya)_
  - [e839f38b58d2](https://github.com/langcodestartup/NHBank/commit/e839f38b58d21d70dfa629e1dc3468649732ec7d) — kimgooneya — 2026-05-12 — TCB API 테스트 프로젝트(Server.Tests) 추가 _(core REST commit?author=kimgooneya)_
  - [f137ceb357d5](https://github.com/langcodestartup/NHBank/commit/f137ceb357d5d1892e5c1d8ab72958f0d2b739f8) — kimgooneya — 2026-05-12 — SignalR 제거 _(core REST commit?author=kimgooneya)_
  - [4457137fc4c3](https://github.com/langcodestartup/NHBank/commit/4457137fc4c3bd6b32086411eb07f95caf1ad351) — kimgooneya — 2025-05-12 — 배포 환경 설정 정보 추가 _(core REST commit?author=kimgooneya)_
  - [c0bf3ee6c38b](https://github.com/langcodestartup/NHBank/commit/c0bf3ee6c38b7f47023ca9bea67c1ceeb768f4d1) — kimgooneya — 2025-05-12 — 마스터 변경 _(core REST commit?author=kimgooneya)_
  - [360ec556f65c](https://github.com/langcodestartup/NHBank/commit/360ec556f65cc971ab862ca9c03c80e610030c5b) — kimgooneya — 2025-04-22 — READ ME 수정 _(core REST commit?author=kimgooneya)_
  - [bc6d78a2e1a2](https://github.com/langcodestartup/NHBank/commit/bc6d78a2e1a20d4998c54daa76591565bf419d8a) — kimgooneya — 2025-04-22 — 클라이언트 삭제 _(core REST commit?author=kimgooneya)_
  - [f81e1e1a2861](https://github.com/langcodestartup/NHBank/commit/f81e1e1a286181567cf3a28fc2a03ced07de7c07) — kimgooneya — 2025-04-22 — 프로젝트 경량화 _(core REST commit?author=kimgooneya)_
  - [3f2ee3eaa493](https://github.com/langcodestartup/NHBank/commit/3f2ee3eaa4939586d1c59ece8741b873a4973e47) — kimgooneya — 2025-04-18 — 배포용 파일 생성 요청 powershell 파일 작성 _(core REST commit?author=kimgooneya)_
  - [ba896057534f](https://github.com/langcodestartup/NHBank/commit/ba896057534f1820ba82dc9f6cec3287cccfd31a) — kimgooneya — 2025-04-18 — 블롭 스트리밍 업로드 _(core REST commit?author=kimgooneya)_
  - [9c7c061e1c5d](https://github.com/langcodestartup/NHBank/commit/9c7c061e1c5d4dcdf0aa378052be47ac68f5617f) — kimgooneya — 2025-04-18 — 변경 옵션 적용 _(core REST commit?author=kimgooneya)_
  - [30e7d3fac166](https://github.com/langcodestartup/NHBank/commit/30e7d3fac166d932e280603e8fa208beae61b51b) — kimgooneya — 2025-04-18 — 코드 경량화 - 클라이언트 웹 내용 삭제 _(core REST commit?author=kimgooneya)_
  - [83e44232c6d9](https://github.com/langcodestartup/NHBank/commit/83e44232c6d93e089555fb217c1f5ba8cac1818c) — kimgooneya — 2025-04-18 — 배포 경량화 - ibm 삭제 _(core REST commit?author=kimgooneya)_
  - [56c0c62a1567](https://github.com/langcodestartup/NHBank/commit/56c0c62a15673dbb9ede39c037876dfb2bc34382) — kimgooneya — 2025-03-25 — 블롭 조회용 API 추가 _(core REST commit?author=kimgooneya)_
  - [e8876522503f](https://github.com/langcodestartup/NHBank/commit/e8876522503fc14f83cb7812a5b1741b96cfdea6) — kimgooneya — 2025-03-10 — - `SixLabors.ImageSharp` 패키지 버전 업데이트 _(core REST commit?author=kimgooneya)_
  - [f52a121b3dbc](https://github.com/langcodestartup/NHBank/commit/f52a121b3dbc6090359734dd565fbcba20f98350) — kimgooneya — 2025-03-07 — TCB 오류 수정 (#91) _(core REST commit?author=kimgooneya)_
  - [a267a857097c](https://github.com/langcodestartup/NHBank/commit/a267a857097cedbeaf8bd5361127b6a15108c812) — kimgooneya — 2025-02-20 — 로그 추가 _(core REST commit?author=kimgooneya)_
  - [092ed0d13eae](https://github.com/langcodestartup/NHBank/commit/092ed0d13eae95a9f0eb107130b13bcec56ac8c5) — kimgooneya — 2025-02-07 — 농협 서비스 최신화 (#90) _(core REST commit?author=kimgooneya)_
  - [63fda922b7ee](https://github.com/langcodestartup/NHBank/commit/63fda922b7eeece74e78f70d9fdffd7a10071410) — kimgooneya — 2024-10-08 — EntityFrameWorkCore에서 최신버젼 SQLite 참조하도록 수정 _(core REST commit?author=kimgooneya)_
  - [ff3875d2c31c](https://github.com/langcodestartup/NHBank/commit/ff3875d2c31cd445bfe1f8f5add3e369e3352cbe) — kimgooneya — 2024-04-15 — PIIEntityInfos 기본값 가지도록 변경 _(core REST commit?author=kimgooneya)_
  - [6fa1c8b1475b](https://github.com/langcodestartup/NHBank/commit/6fa1c8b1475bf4a39bc3b6320c3004be7084cee6) — kimgooneya — 2024-04-12 — [FIX] 근거 문서 답변 처리 오류 수정 _(core REST commit?author=kimgooneya)_
  - [5ff4dfcf427c](https://github.com/langcodestartup/NHBank/commit/5ff4dfcf427c863ca8847cf290623f5782d0ef4b) — kimgooneya — 2024-04-12 — [FIX] streaming 시 temp 항목만 업데이트 되도록 변경 _(core REST commit?author=kimgooneya)_
  - [bb6f84456b24](https://github.com/langcodestartup/NHBank/commit/bb6f84456b24fbec6f9e65b3e9c974a9384af549) — kimgooneya — 2024-04-12 — [FIX] Decoding upload Filename _(core REST commit?author=kimgooneya)_
  - [8b5fb42bd52c](https://github.com/langcodestartup/NHBank/commit/8b5fb42bd52cd996a13d86a97ae688af2cf33aa5) — kimgooneya — 2024-04-11 — Add ignore _(core REST commit?author=kimgooneya)_
  - [50a12cf373cc](https://github.com/langcodestartup/NHBank/commit/50a12cf373cc10a02a9ad88c8ff694805b5a844d) — kimgooneya — 2024-04-07 — add ignore _(core REST commit?author=kimgooneya)_
  - [f9a8eaf31957](https://github.com/langcodestartup/NHBank/commit/f9a8eaf319572d235e459318ed97db6f78636cad) — kimgooneya — 2024-04-07 — 기능 변경 반영 _(core REST commit?author=kimgooneya)_
  - [6e0f96bbae3a](https://github.com/langcodestartup/NHBank/commit/6e0f96bbae3ab71bf34d98a8aabc00a7c2d2426b) — kimgooneya — 2024-04-06 — FIX: Return liveChatMessageId as Response MessageId _(core REST commit?author=kimgooneya)_
  - [5b532131a0b1](https://github.com/langcodestartup/NHBank/commit/5b532131a0b1de5245c6c2224fc94a36a1f9fd67) — kimgooneya — 2024-04-06 — FIX: GeneralGPT Response Streaming _(core REST commit?author=kimgooneya)_
  - [fca0f24d05d1](https://github.com/langcodestartup/NHBank/commit/fca0f24d05d1318a7f75e567da4565453543a8b7) — kimgooneya — 2024-04-01 — fielddict 사용법 수정 _(core REST commit?author=kimgooneya)_
  - [c58feec58ae6](https://github.com/langcodestartup/NHBank/commit/c58feec58ae6a5ba6b38f7ff7b23fc5f22fdeecf) — kimgooneya — 2024-04-01 — 챗팅 세션 아이디 정상화 _(core REST commit?author=kimgooneya)_
  - [eae5a9d92e75](https://github.com/langcodestartup/NHBank/commit/eae5a9d92e75ba7d6cd7303795f77d8a689715aa) — kimgooneya — 2024-03-23 — item 저장 오류 처리 추가 _(core REST commit?author=kimgooneya)_
  - [34bea85fff36](https://github.com/langcodestartup/NHBank/commit/34bea85fff363d9b1eb06db73a96c9f36b74e4a8) — kimgooneya — 2024-03-23 — 프롬프트 입력 type 양식 지정 <> 추가 _(core REST commit?author=kimgooneya)_
  - [5e32b07bab8e](https://github.com/langcodestartup/NHBank/commit/5e32b07bab8e19310c8205d012ba92bd043d788e) — kimgooneya — 2024-03-22 — unuse using 정리 _(core REST commit?author=kimgooneya)_
  - [97215b517cd6](https://github.com/langcodestartup/NHBank/commit/97215b517cd6ea05373ec336de03d8c6e42a9fcb) — kimgooneya — 2024-03-22 — chatsessionid 적용 _(core REST commit?author=kimgooneya)_
  - [8c01b1c99d56](https://github.com/langcodestartup/NHBank/commit/8c01b1c99d56856c1983081ef79762866f4bc7f7) — kimgooneya — 2024-03-20 — 변경 로직에 맞추어 내용 수정 _(core REST commit?author=kimgooneya)_
  - [89b9f3c53b7b](https://github.com/langcodestartup/NHBank/commit/89b9f3c53b7bf7ebd447123b0cb42fb333c43f9c) — kimgooneya — 2024-03-19 — Merge pull request #84 from langcodestartup/feature/live-api _(core REST commit?author=kimgooneya)_
  - [9859f20f1909](https://github.com/langcodestartup/NHBank/commit/9859f20f1909380e130e9d3a45afc38ea0fcc101) — kimgooneya — 2024-03-19 — 라이브 컨트롤러 추가 _(core REST commit?author=kimgooneya)_
  - [ec349d69fb7d](https://github.com/langcodestartup/NHBank/commit/ec349d69fb7d6f165633586f3ceff6968454a63f) — kimgooneya — 2024-03-18 — 변경반영 _(core REST commit?author=kimgooneya)_
  - [fefc693851b0](https://github.com/langcodestartup/NHBank/commit/fefc693851b07f4794d2353a320552977c910fe3) — kimgooneya — 2024-03-15 — Top 문서 Scrore 기준으로 변경 _(core REST commit?author=kimgooneya)_
  - [f094b80fa9e9](https://github.com/langcodestartup/NHBank/commit/f094b80fa9e967753231ae92f9c19f6302accfe8) — kimgooneya — 2024-03-15 — 코드 정리 _(core REST commit?author=kimgooneya)_
  - [e8a938cfd32f](https://github.com/langcodestartup/NHBank/commit/e8a938cfd32f915f8cd226f7f9d348d4029dc82f) — kimgooneya — 2024-03-15 — PDF 전달 병합 _(core REST commit?author=kimgooneya)_
  - [c2f59dc4be47](https://github.com/langcodestartup/NHBank/commit/c2f59dc4be4716282d08f79d49369080d6dfc4cb) — kimgooneya — 2024-03-15 — 업데이트 요청 메시지 변경 _(core REST commit?author=kimgooneya)_
  - [8efd0b2baf73](https://github.com/langcodestartup/NHBank/commit/8efd0b2baf73116a4bf93789d9fda50cf8b48d5f) — kimgooneya — 2024-03-13 — 3자 -> 10자 업데이트로 변경 _(core REST commit?author=kimgooneya)_
  - [8cd7845788d9](https://github.com/langcodestartup/NHBank/commit/8cd7845788d9d481add535848635bce882d8106f) — kimgooneya — 2024-03-13 — a _(core REST commit?author=kimgooneya)_
  - [192540818f7d](https://github.com/langcodestartup/NHBank/commit/192540818f7d7b3d00a3c17607c348a82cb9265f) — kimgooneya — 2024-03-13 — 수정사항 반영 _(core REST commit?author=kimgooneya)_
  - [4825d6e0d6b1](https://github.com/langcodestartup/NHBank/commit/4825d6e0d6b1e6135a4ebc5f643204cfdad93fd2) — kimgooneya — 2024-03-13 — API 수정 사항 반영 _(core REST commit?author=kimgooneya)_
  - [1c9838a286c7](https://github.com/langcodestartup/NHBank/commit/1c9838a286c79585d34852ff66c64b221dd15067) — kimgooneya — 2024-03-12 — 우진쌤 코드 병합 _(core REST commit?author=kimgooneya)_
  - [3ac8c410518b](https://github.com/langcodestartup/NHBank/commit/3ac8c410518bf6f1d30c8a510bce09ec0a6036d2) — kimgooneya — 2024-03-11 — 적용 _(core REST commit?author=kimgooneya)_
  - [b561d8974dee](https://github.com/langcodestartup/NHBank/commit/b561d8974deefd082365fcf9e773c2f022f73f04) — kimgooneya — 2023-08-17 — KnowlegeBase Factory 추가 _(core REST commit?author=kimgooneya)_
  - [8de14f06cad7](https://github.com/langcodestartup/NHBank/commit/8de14f06cad7e269e69054a72d1b9ca481a6c8bd) — kimgooneya — 2023-08-17 — DI 추가 _(core REST commit?author=kimgooneya)_
  - [93ba6d96e9dd](https://github.com/langcodestartup/NHBank/commit/93ba6d96e9dd5679ba5233a818f64b3d587046e2) — kimgooneya — 2023-08-17 — Nuget Package 추가 _(core REST commit?author=kimgooneya)_
  - [d4a88ff5dff8](https://github.com/langcodestartup/NHBank/commit/d4a88ff5dff8cc5c29a60ebcc093141976ef1a03) — kimgooneya — 2023-08-17 — Form Recognizer 서비스 추가 _(core REST commit?author=kimgooneya)_
  - [c7cd8672b4e3](https://github.com/langcodestartup/NHBank/commit/c7cd8672b4e370dd9fc3cf46b82850c64b7cf4b1) — kimgooneya — 2022-07-28 — common model, field, type 수정 (#20) _(core REST commit?author=kimgooneya)_
- Matching issue/PR records returned:
  - PR [#98 [codex] Azure OpenAI 토큰 사용량 안정화](https://github.com/langcodestartup/NHBank/pull/98) — login kimgooneya — opened 2026-06-20 — state closed — merged 2026-06-20 _(core REST)_
  - PR [#97 refactor: LLM 환경변수화 + Azure.AI.OpenAI v2 마이그레이션](https://github.com/langcodestartup/NHBank/pull/97) — login kimgooneya — opened 2026-05-13 — state closed — merged 2026-05-13 _(core REST)_
  - PR [#91 TCB 오류 수정](https://github.com/langcodestartup/NHBank/pull/91) — login kimgooneya — opened 2025-03-07 — state closed — merged 2025-03-07 _(core REST)_
  - PR [#90 농협 서비스 최신화](https://github.com/langcodestartup/NHBank/pull/90) — login kimgooneya — opened 2025-02-07 — state closed — merged 2025-02-07 _(core REST)_
  - PR [#84 라이브 컨트롤러 추가](https://github.com/langcodestartup/NHBank/pull/84) — login kimgooneya — opened 2024-03-19 — state closed — merged 2024-03-19 _(core REST)_

## Jiran-delete

- Repository: [langcodestartup/Jiran-delete](https://github.com/langcodestartup/Jiran-delete)
- Default branch: `master`; visibility: private; archived: no
- Branch inventory observed: 1 branch(es)
  - `master` (d4d58560491c)
- Search query state: **PARTIAL / one or more query errors**; successful result sets: 7
- Matching commit records returned:
  - [d4d58560491c](https://github.com/langcodestartup/Jiran-delete/commit/d4d58560491cb6e16ec777a9d8e9581e6d477483) — kimgooneya — 2022-11-15 — Netmarble master branch set (#45) _(core REST commit?author=kimgooneya)_

## jiran

- Repository: [langcodestartup/jiran](https://github.com/langcodestartup/jiran)
- Default branch: `master`; visibility: private; archived: no
- Branch inventory observed: 52 branch(es)
  - `CarbonComponent/CarbonTableLabelElement` (a6ea29f68dfa), `CarbonComponent/CleanCodeRenderer` (2c52d3a0536c), `CarbonComponent/DeleteLeftPanel` (b89163e471f5), `CarbonComponent/InlineLoading` (71119dadaa2d), `CarbonComponent/LabelElement` (59b85769fad9), `CarbonComponent/Loading` (ebd1c96d7996), `CarbonComponent/Slider` (2c048f400d50), `CarbonComponent/Tabs` (95e7054466b6), `CarbonComponent/Tag` (eb7cd2435a47), `CarbonComponent/actionType` (4864d1fe9dca), `CarbonComponent/headerbase` (9bd51e45dcab), `Component/QuickGrid` (cf871e0608b9), `Component/QuickGridExpandable` (b28a21076325), `Component/QuickGridTest2` (ddf271eb1c63), `Core` (958d47a3ffbb), `Ground/Carbon_v11` (fc6e1f64cf65), `Ground/Chat` (672d6b957cff), `Ground/IntoRenderer` (9ffc3b7372f1), `OldCore` (8845fb8846f4), `active/cxp-app` (3fc45949cab3), …
- Search query state: **PARTIAL / one or more query errors**; successful result sets: 8
- Matching commit records returned:
  - [d4d58560491c](https://github.com/langcodestartup/jiran/commit/d4d58560491cb6e16ec777a9d8e9581e6d477483) — kimgooneya — 2022-11-15 — Netmarble master branch set (#45) _(core REST commit?author=kimgooneya)_

## KBLife

- Repository: [langcodestartup/KBLife](https://github.com/langcodestartup/KBLife)
- Default branch: `master`; visibility: private; archived: no
- Branch inventory observed: 63 branch(es)
  - `CarbonComponent/CarbonTableLabelElement` (a6ea29f68dfa), `CarbonComponent/CleanCodeRenderer` (2c52d3a0536c), `CarbonComponent/DeleteLeftPanel` (b89163e471f5), `CarbonComponent/InlineLoading` (71119dadaa2d), `CarbonComponent/LabelElement` (59b85769fad9), `CarbonComponent/Loading` (ebd1c96d7996), `CarbonComponent/Slider` (2c048f400d50), `CarbonComponent/Tabs` (95e7054466b6), `CarbonComponent/Tag` (eb7cd2435a47), `CarbonComponent/actionType` (4864d1fe9dca), `CarbonComponent/headerbase` (9bd51e45dcab), `Component/QuickGrid` (cf871e0608b9), `Component/QuickGridExpandable` (b28a21076325), `Component/QuickGridTest2` (ddf271eb1c63), `Core` (958d47a3ffbb), `Ground/Carbon_v11` (fc6e1f64cf65), `Ground/Chat` (672d6b957cff), `Ground/IntoRenderer` (9ffc3b7372f1), `OldCore` (8845fb8846f4), `active/cxp-app` (3fc45949cab3), …
- Search query state: **PARTIAL / one or more query errors**; successful result sets: 7
- Matching commit records returned:
  - [d4d58560491c](https://github.com/langcodestartup/KBLife/commit/d4d58560491cb6e16ec777a9d8e9581e6d477483) — kimgooneya — 2022-11-15 — Netmarble master branch set (#45) _(core REST commit?author=kimgooneya)_

## KotraCurationAPI

- Repository: [langcodestartup/KotraCurationAPI](https://github.com/langcodestartup/KotraCurationAPI)
- Default branch: `master`; visibility: private; archived: no
- Branch inventory observed: 2 branch(es)
  - `master` (fea77776eef6), `mockup` (b228ce74f4de)
- Search query state: **PARTIAL / one or more query errors**; successful result sets: 8
- Contribution evidence in current pass: **No matching authored commits, PRs, or issues returned by paginated core REST; reviewer/comment activity remains UNKNOWN because Search was rate-limited**.

## KtFinance

- Repository: [langcodestartup/KtFinance](https://github.com/langcodestartup/KtFinance)
- Default branch: `master`; visibility: private; archived: no
- Branch inventory observed: 77 branch(es)
  - `CarbonComponent/CarbonTableLabelElement` (a6ea29f68dfa), `CarbonComponent/CleanCodeRenderer` (2c52d3a0536c), `CarbonComponent/DeleteLeftPanel` (b89163e471f5), `CarbonComponent/InlineLoading` (71119dadaa2d), `CarbonComponent/LabelElement` (59b85769fad9), `CarbonComponent/Loading` (ebd1c96d7996), `CarbonComponent/Slider` (2c048f400d50), `CarbonComponent/Tabs` (95e7054466b6), `CarbonComponent/Tag` (eb7cd2435a47), `CarbonComponent/actionType` (4864d1fe9dca), `CarbonComponent/headerbase` (9bd51e45dcab), `Core` (958d47a3ffbb), `Ground/Carbon_v11` (fc6e1f64cf65), `Ground/Chat` (672d6b957cff), `Ground/IntoRenderer` (9ffc3b7372f1), `OldCore` (8845fb8846f4), `active/cxp-app` (28b7d8704724), `demo/ahn` (8c0a43028ba6), `demo/chanel-202203` (84f83dfc8056), `demo/gpt` (0df6c9226ac6), …
- Search query state: **PARTIAL / one or more query errors**; successful result sets: 8
- Matching commit records returned:
  - [d4d58560491c](https://github.com/langcodestartup/KtFinance/commit/d4d58560491cb6e16ec777a9d8e9581e6d477483) — kimgooneya — 2022-11-15 — Netmarble master branch set (#45) _(core REST commit?author=kimgooneya)_

## KtEnter

- Repository: [langcodestartup/KtEnter](https://github.com/langcodestartup/KtEnter)
- Default branch: `master`; visibility: private; archived: no
- Branch inventory observed: 76 branch(es)
  - `CarbonComponent/CarbonTableLabelElement` (a6ea29f68dfa), `CarbonComponent/CleanCodeRenderer` (2c52d3a0536c), `CarbonComponent/DeleteLeftPanel` (b89163e471f5), `CarbonComponent/InlineLoading` (71119dadaa2d), `CarbonComponent/LabelElement` (59b85769fad9), `CarbonComponent/Loading` (ebd1c96d7996), `CarbonComponent/Slider` (2c048f400d50), `CarbonComponent/Tabs` (95e7054466b6), `CarbonComponent/Tag` (eb7cd2435a47), `CarbonComponent/actionType` (4864d1fe9dca), `CarbonComponent/headerbase` (9bd51e45dcab), `Core` (958d47a3ffbb), `Ground/Carbon_v11` (fc6e1f64cf65), `Ground/Chat` (672d6b957cff), `Ground/IntoRenderer` (9ffc3b7372f1), `OldCore` (8845fb8846f4), `active/cxp-app` (28b7d8704724), `demo/ahn` (8c0a43028ba6), `demo/chanel-202203` (84f83dfc8056), `demo/gpt` (0df6c9226ac6), …
- Search query state: **PARTIAL / one or more query errors**; successful result sets: 7
- Matching commit records returned:
  - [d4d58560491c](https://github.com/langcodestartup/KtEnter/commit/d4d58560491cb6e16ec777a9d8e9581e6d477483) — kimgooneya — 2022-11-15 — Netmarble master branch set (#45) _(core REST commit?author=kimgooneya)_

## KotraAPIAdmin

- Repository: [langcodestartup/KotraAPIAdmin](https://github.com/langcodestartup/KotraAPIAdmin)
- Default branch: `master`; visibility: private; archived: no
- Branch inventory observed: 1 branch(es)
  - `master` (1a4882891ba6)
- Search query state: **PARTIAL / one or more query errors**; successful result sets: 4
- Contribution evidence in current pass: **No matching authored commits, PRs, or issues returned by paginated core REST; reviewer/comment activity remains UNKNOWN because Search was rate-limited**.

## NHRS

- Repository: [langcodestartup/NHRS](https://github.com/langcodestartup/NHRS)
- Default branch: `master`; visibility: private; archived: no
- Branch inventory observed: 3 branch(es)
  - `dev/knowledge-user` (90ef9b3d8512), `dev/query-for-dash-board` (c3b9002b5e58), `master` (dc316dd9db0c)
- Search query state: **PARTIAL / one or more query errors**; successful result sets: 4
- Matching commit records returned:
  - [dc316dd9db0c](https://github.com/langcodestartup/NHRS/commit/dc316dd9db0cf008a70749e08964e466e30d559c) — kimgooneya — 2024-06-28 — [EDIT] 구조 변경 (#113) _(core REST commit?author=kimgooneya)_
  - [db7aaa2203fc](https://github.com/langcodestartup/NHRS/commit/db7aaa2203fc756f14ba4ddfce6256ce2694273c) — kimgooneya — 2024-06-03 — [EDIT] 채팅 이력 표시 항목 변경 (#112) _(core REST commit?author=kimgooneya)_
  - [f6c4914091c0](https://github.com/langcodestartup/NHRS/commit/f6c4914091c038a2643f509f6f32ed345967d352) — kimgooneya — 2024-05-31 — [FIX] TCB API 수정 (#111) _(core REST commit?author=kimgooneya)_
  - [0fb72cf3d462](https://github.com/langcodestartup/NHRS/commit/0fb72cf3d4627bf2dcb59959e439399e8a9e9a82) — kimgooneya — 2024-05-30 — 대시보드 표시 쿼리 (#110) _(core REST commit?author=kimgooneya)_
  - [1259ded0f7d8](https://github.com/langcodestartup/NHRS/commit/1259ded0f7d8b5ff1a838b347e36f589d5e92d4e) — kimgooneya — 2024-05-24 — [FIX] 조회 조건 UI, 필터 수정 _(core REST commit?author=kimgooneya)_
  - [2b74245da3bc](https://github.com/langcodestartup/NHRS/commit/2b74245da3bc183091863b5f0aa75c737cc1a48f) — kimgooneya — 2024-05-23 — [FIX] 시스템 권한 설정 조회 UI 수정 _(core REST commit?author=kimgooneya)_
  - [fe4f0c510500](https://github.com/langcodestartup/NHRS/commit/fe4f0c510500ae3e451042ef9eec6b1a5ff62f57) — kimgooneya — 2024-05-23 — [FIX] 봇 사용자 권한 설정 조회 UI 수정 _(core REST commit?author=kimgooneya)_
  - [bf6d01b637f2](https://github.com/langcodestartup/NHRS/commit/bf6d01b637f2c7c09e3e78b7d3fbfb2bff9cdd4a) — kimgooneya — 2024-05-23 — [FIX] 금지어 날짜 조회 조건 추가 _(core REST commit?author=kimgooneya)_
  - [0d67139c8c7e](https://github.com/langcodestartup/NHRS/commit/0d67139c8c7e37228a7d8e090b1eea043e5ba045) — kimgooneya — 2024-05-23 — [FIX] 모니터링 조회 조건 수정 _(core REST commit?author=kimgooneya)_
  - [1cde56162757](https://github.com/langcodestartup/NHRS/commit/1cde56162757182035f96127e430d4a1113de11b) — kimgooneya — 2024-05-23 — [FIX] 지식저장소 설정 저장소 아이디 검색 조건 추가 _(core REST commit?author=kimgooneya)_
  - [d7802022129b](https://github.com/langcodestartup/NHRS/commit/d7802022129b4480b4cfa7b30a5bf497d0e98bbc) — kimgooneya — 2024-05-23 — [FIX] 봇 관리 사용 가능 상태 조회 조건 추가 _(core REST commit?author=kimgooneya)_
  - [c772ebdd6225](https://github.com/langcodestartup/NHRS/commit/c772ebdd622567aa72ebff251a79be9540fe96e1) — kimgooneya — 2024-05-23 — [FIX] 임베딩시 권한 확인 과정 생략 _(core REST commit?author=kimgooneya)_
  - [8a6f69e27479](https://github.com/langcodestartup/NHRS/commit/8a6f69e27479a12f5fe40925f637a3a9edd8306b) — kimgooneya — 2024-05-23 — [FEATURE] 임베딩 복사 붙여넣기 완료 _(core REST commit?author=kimgooneya)_
  - [b0d742675deb](https://github.com/langcodestartup/NHRS/commit/b0d742675deb447804fdbf005ae6c0552703d33b) — kimgooneya — 2024-05-22 — [FIX] 지식 저장소 동기화 시 클라우드 업로드 기능 수정 #109 _(core REST commit?author=kimgooneya)_
  - [9dd720127b48](https://github.com/langcodestartup/NHRS/commit/9dd720127b4852c93add78e2571a65f1d700d441) — kimgooneya — 2024-05-22 — 스웨거 추가 (#108) _(core REST commit?author=kimgooneya)_
  - [619c62f95927](https://github.com/langcodestartup/NHRS/commit/619c62f95927eead96e22cb6fa63f769f0dfe882) — kimgooneya — 2024-05-21 — JWT 인증 기능 추가 (#107) _(core REST commit?author=kimgooneya)_
  - [f04f2a91785e](https://github.com/langcodestartup/NHRS/commit/f04f2a91785efdb8499449376539c962d9682800) — kimgooneya — 2024-05-19 — Swagger 추가 (#106) _(core REST commit?author=kimgooneya)_
  - [a54c1ccd67fb](https://github.com/langcodestartup/NHRS/commit/a54c1ccd67fb48bac83ad3e115e78c666f21df09) — kimgooneya — 2024-05-17 — 시스템 관리 UI 개선 (#105) _(core REST commit?author=kimgooneya)_
  - [1aad9d5a0b85](https://github.com/langcodestartup/NHRS/commit/1aad9d5a0b85c63d8d8c2b8fd8f38da9216ce1c0) — kimgooneya — 2024-05-16 — 모니터링 다운로드 기능 완료 _(core REST commit?author=kimgooneya)_
  - [793ecb4f4f97](https://github.com/langcodestartup/NHRS/commit/793ecb4f4f97f8184a36ac3603bac5e868475b05) — kimgooneya — 2024-05-14 — 로컬 환경 변경 _(core REST commit?author=kimgooneya)_
  - [9d17c0acec77](https://github.com/langcodestartup/NHRS/commit/9d17c0acec77566881c1178e22b11ba99d7d2836) — kimgooneya — 2024-05-14 — 엑셀 날짜 표기 수정 _(core REST commit?author=kimgooneya)_
  - [70cf466d0cc8](https://github.com/langcodestartup/NHRS/commit/70cf466d0cc8fd1bbf7efd433d06ef523a1e0557) — kimgooneya — 2024-05-14 — 채팅 데이터 쿼리 수정 _(core REST commit?author=kimgooneya)_
  - [f19c1c129c7b](https://github.com/langcodestartup/NHRS/commit/f19c1c129c7b9ee4c09af712862421b2ef3d554d) — kimgooneya — 2024-05-14 — UI 수정 완료 _(core REST commit?author=kimgooneya)_
  - [7b3eed63d5ed](https://github.com/langcodestartup/NHRS/commit/7b3eed63d5ed4c791766f2648dd54809d7f0a18b) — kimgooneya — 2024-04-18 — [FEATURE] TCB 기능 완료 (#102) _(core REST commit?author=kimgooneya)_
  - [bd29f04573cc](https://github.com/langcodestartup/NHRS/commit/bd29f04573cc83d8f10ee7962acd578d4419468e) — kimgooneya — 2024-04-18 — 관리자 페이지의 봇, 지식 저장소는 모두 조회 이용가능하도록 a tag 이용한 직접 접근 허용 (#101) _(core REST commit?author=kimgooneya)_
  - [8d1620c07008](https://github.com/langcodestartup/NHRS/commit/8d1620c070089c1330f0b246b9107d255c604a58) — kimgooneya — 2024-04-17 — [FIX] TCB 생성후 Navigation 문제 수정 _(core REST commit?author=kimgooneya)_
  - [ad73dea79a18](https://github.com/langcodestartup/NHRS/commit/ad73dea79a188b58feea851c1bcb245e673d0ed0) — kimgooneya — 2024-04-17 — [FIX] Get KnowledgeBase FirstOrDefault로 변경 _(core REST commit?author=kimgooneya)_
  - [124efc86b822](https://github.com/langcodestartup/NHRS/commit/124efc86b822272b41241faa73d0f038e8006f47) — kimgooneya — 2024-04-17 — [FIX] 검색 버튼 -> 돋보기 아이콘 클릭으로 변경 _(core REST commit?author=kimgooneya)_
  - [31eb364e7c78](https://github.com/langcodestartup/NHRS/commit/31eb364e7c78e03557785f40b512148179d98094) — kimgooneya — 2024-04-17 — [FIX] ApprovalModel, MessageBox 수정 사항 반영 누락 수정 _(core REST commit?author=kimgooneya)_
  - [60cfe2f0c01c](https://github.com/langcodestartup/NHRS/commit/60cfe2f0c01cdbaa255e1014dc00b5453cfb4e0f) — kimgooneya — 2024-04-17 — [FIX] ApprovalModal MessageBox 불필요한 내용 삭제 _(core REST commit?author=kimgooneya)_
  - [777e627b3ccb](https://github.com/langcodestartup/NHRS/commit/777e627b3ccb8b0211613b5519b602bb44321324) — kimgooneya — 2024-04-17 — [FIX] Feedback 기능 오류 수정 완료 - AnswerId 고유성 _(core REST commit?author=kimgooneya)_
  - [403fc639a9cc](https://github.com/langcodestartup/NHRS/commit/403fc639a9cc9748abaef337184143f9e9ba7800) — kimgooneya — 2024-04-17 — [FIX] 결재자 목록 취소시에 목록 초기화 _(core REST commit?author=kimgooneya)_
  - [490406ed4a17](https://github.com/langcodestartup/NHRS/commit/490406ed4a17ec2e24522551e21138675f1f63b0) — kimgooneya — 2024-04-17 — [FIX] message, approvalmodal layout으로 이관 _(core REST commit?author=kimgooneya)_
  - [7cb7955132dc](https://github.com/langcodestartup/NHRS/commit/7cb7955132dc45d48bd876e8f867a91cfb86768a) — kimgooneya — 2024-04-16 — [FIX] 지식 저장소 검증 _(core REST commit?author=kimgooneya)_
  - [675708edbfae](https://github.com/langcodestartup/NHRS/commit/675708edbfae3798ebaa191ff9d821f103da31eb) — kimgooneya — 2024-04-16 — 승인 표시 방법 변경 _(core REST commit?author=kimgooneya)_
  - [3d139cfd9266](https://github.com/langcodestartup/NHRS/commit/3d139cfd9266673447b271cda3215555b782ae8c) — kimgooneya — 2024-04-16 — [FEATURE] TCB 등록 완료 _(core REST commit?author=kimgooneya)_
  - [0e8e65c70d4d](https://github.com/langcodestartup/NHRS/commit/0e8e65c70d4d10632430f9ab644a38326e5f68c4) — kimgooneya — 2024-04-15 — 마이너 수정 _(core REST commit?author=kimgooneya)_
  - [348c2bad2341](https://github.com/langcodestartup/NHRS/commit/348c2bad2341dde46ca370bc4d31eb976e25b20b) — kimgooneya — 2024-04-15 — Prompt 길이 제한 해제 _(core REST commit?author=kimgooneya)_
  - [dedce352a359](https://github.com/langcodestartup/NHRS/commit/dedce352a359f3cc635d0f7a27667515b2eca326) — kimgooneya — 2024-04-15 — TCB 생성 수정 (ChangeRequest로 변경 필요) _(core REST commit?author=kimgooneya)_
  - [3b8a6d09f45d](https://github.com/langcodestartup/NHRS/commit/3b8a6d09f45d446b27fff07879359200cde6cc0a) — kimgooneya — 2024-04-15 — CSS 정리 _(core REST commit?author=kimgooneya)_
  - [7852d1dab985](https://github.com/langcodestartup/NHRS/commit/7852d1dab985cc4258bf390efe01dd9415b7e658) — kimgooneya — 2024-04-15 — CSS 정리 _(core REST commit?author=kimgooneya)_
  - [fc3f759f643c](https://github.com/langcodestartup/NHRS/commit/fc3f759f643c55d2026416220df5b139b1178945) — kimgooneya — 2024-04-15 — DI 정리 _(core REST commit?author=kimgooneya)_
  - [748b0e38a8c9](https://github.com/langcodestartup/NHRS/commit/748b0e38a8c9138afd7957ee2ecb68636abadc84) — kimgooneya — 2024-04-15 — ChangeRequest 공백 처리 _(core REST commit?author=kimgooneya)_
  - [bfb52e8c0bb1](https://github.com/langcodestartup/NHRS/commit/bfb52e8c0bb105f64353d993ce04dd23901df260) — kimgooneya — 2024-04-15 — 공백 삭제 _(core REST commit?author=kimgooneya)_
  - [6e2509724d30](https://github.com/langcodestartup/NHRS/commit/6e2509724d303ed9694caf2ce77ef95236dd97e4) — kimgooneya — 2024-04-15 — 변경 반영 _(core REST commit?author=kimgooneya)_
  - [caab3bc5d785](https://github.com/langcodestartup/NHRS/commit/caab3bc5d785460b1c84985d1b489dafed2d0058) — kimgooneya — 2024-04-15 — 조회 쿼리 변경 반영 _(core REST commit?author=kimgooneya)_
  - [783fce4830df](https://github.com/langcodestartup/NHRS/commit/783fce4830df74f9b383fce2065c3b7abe17597a) — kimgooneya — 2024-04-15 — [FIX] 결재 문제 수정 _(core REST commit?author=kimgooneya)_
  - [3f54139e61df](https://github.com/langcodestartup/NHRS/commit/3f54139e61df71ac5db38a32145ebfe90e13e1fb) — kimgooneya — 2024-04-15 — 누락항목 추가 _(core REST commit?author=kimgooneya)_
  - [a2cf0bc8ced0](https://github.com/langcodestartup/NHRS/commit/a2cf0bc8ced0759660e511109c7be5c616e413f9) — kimgooneya — 2024-04-15 — 누락 항목 추가 _(core REST commit?author=kimgooneya)_
  - [794211e8b96d](https://github.com/langcodestartup/NHRS/commit/794211e8b96d169a0b44833b80eb8bf32f814c5b) — kimgooneya — 2024-04-15 — [FEATURE] Add AuthHelper _(core REST commit?author=kimgooneya)_
  - [e75659425153](https://github.com/langcodestartup/NHRS/commit/e7565942515371f913c49c0422ec783ee851fc8a) — kimgooneya — 2024-04-15 — [FIX] 시스템 관리자 쿼리 수정 _(core REST commit?author=kimgooneya)_
  - [08e6c117af68](https://github.com/langcodestartup/NHRS/commit/08e6c117af688c6458fbee5b24dc9270a63e041b) — kimgooneya — 2024-04-14 — css 수정 _(core REST commit?author=kimgooneya)_
  - [0c6fff65831d](https://github.com/langcodestartup/NHRS/commit/0c6fff65831deaed81a0b7302ae9acea16a46e7e) — kimgooneya — 2024-04-14 — [FEATURE] 승인 조회기능 완료 _(core REST commit?author=kimgooneya)_
  - [9c964f330505](https://github.com/langcodestartup/NHRS/commit/9c964f330505516488092ee1375b02c78c8ccb56) — kimgooneya — 2024-04-14 — [FIX] ApprovalStatusEnum All 추가 _(core REST commit?author=kimgooneya)_
  - [3366e366def5](https://github.com/langcodestartup/NHRS/commit/3366e366def5f9cea9585c0115974d0365f3519c) — kimgooneya — 2024-04-14 — [FIX] 마이너 변경 _(core REST commit?author=kimgooneya)_
  - [fe17b3a983b1](https://github.com/langcodestartup/NHRS/commit/fe17b3a983b133755626581ad9f345f562ba098d) — kimgooneya — 2024-04-14 — [FIX] Approval Query 방식 변경 _(core REST commit?author=kimgooneya)_
  - [3becd64f798d](https://github.com/langcodestartup/NHRS/commit/3becd64f798dd491e8adfba998cfadf57288457b) — kimgooneya — 2024-04-13 — [FIX] input change _(core REST commit?author=kimgooneya)_
  - [43499d8294a0](https://github.com/langcodestartup/NHRS/commit/43499d8294a0082b95e8d38e4e633d37c9934fa1) — kimgooneya — 2024-04-13 — [FIX] 시스템 권한 설정 조회 수정 _(core REST commit?author=kimgooneya)_
  - [3825bac64e17](https://github.com/langcodestartup/NHRS/commit/3825bac64e17f0d43a19d8a26fc95c8cc22130c3) — kimgooneya — 2024-04-13 — [FIX] 봇 권한 설정 _(core REST commit?author=kimgooneya)_
  - [fe7c28fdd2be](https://github.com/langcodestartup/NHRS/commit/fe7c28fdd2be8475f7f0cd7424aca817ea16590a) — kimgooneya — 2024-04-13 — [FIX] 금지어 UI 수정 _(core REST commit?author=kimgooneya)_
  - [65945bd1129d](https://github.com/langcodestartup/NHRS/commit/65945bd1129dc81d7f065e36c08d5d03aa8bdd85) — kimgooneya — 2024-04-13 — [FIX] 모니터링 조회 조건 수정 _(core REST commit?author=kimgooneya)_
  - [bd9304348014](https://github.com/langcodestartup/NHRS/commit/bd9304348014aea9fae04a8e0b4a53edae405ea7) — kimgooneya — 2024-04-13 — [FIX] 관리자 - 지식 저장소 조회 기능 수정 _(core REST commit?author=kimgooneya)_
  - [994053ab0936](https://github.com/langcodestartup/NHRS/commit/994053ab0936ca93d23bf620f8ebdeca5addbb35) — kimgooneya — 2024-04-12 — [FIX] program.cs 변수 명 수정 _(core REST commit?author=kimgooneya)_
  - [65ec251a7d83](https://github.com/langcodestartup/NHRS/commit/65ec251a7d83a9b2144766070bf14299a58844ec) — kimgooneya — 2024-04-12 — [FIX] API 주소 변경 _(core REST commit?author=kimgooneya)_
  - [c9c2af9a3f31](https://github.com/langcodestartup/NHRS/commit/c9c2af9a3f31c8e3d2ca8eb26cfbbc334473493b) — kimgooneya — 2024-04-12 — [FIX] 기존 봇 선택시 오류 사항 수정 _(core REST commit?author=kimgooneya)_
  - [7c78871b081b](https://github.com/langcodestartup/NHRS/commit/7c78871b081b0867c797e2c32db899779bf0d4f1) — kimgooneya — 2024-04-12 — [FIX] 지식 저장소 문서 skip take 규칙 오류 수정 _(core REST commit?author=kimgooneya)_
  - [22dfe98549af](https://github.com/langcodestartup/NHRS/commit/22dfe98549af0cb8f18580383abd709e3a9b0296) — kimgooneya — 2024-04-12 — [FIX] Streaming 규칙 번경 _(core REST commit?author=kimgooneya)_
  - [4246d20d1c00](https://github.com/langcodestartup/NHRS/commit/4246d20d1c00d7e723a3db2fe600c6307e2a775c) — kimgooneya — 2024-04-12 — [FIX] 결재자 엔터키 검색 수정 _(core REST commit?author=kimgooneya)_
  - [5363e0608d5b](https://github.com/langcodestartup/NHRS/commit/5363e0608d5ba09d503619809e29a3e808b350f3) — kimgooneya — 2024-04-12 — [FIX] 파일 업로드 기능 수정사항 반영 _(core REST commit?author=kimgooneya)_
  - [1a2941d52119](https://github.com/langcodestartup/NHRS/commit/1a2941d521198057d77c3562c0047c625f23c50a) — kimgooneya — 2024-04-12 — [FIX] 파일 업로드 기능 수정 _(core REST commit?author=kimgooneya)_
  - [bafb34cc1b4a](https://github.com/langcodestartup/NHRS/commit/bafb34cc1b4a0ec149683634d89e16a1b0fd6430) — kimgooneya — 2024-04-12 — [FIX] 관리자의 사용자 권한 수정 기능 _(core REST commit?author=kimgooneya)_
  - [5e84bf423459](https://github.com/langcodestartup/NHRS/commit/5e84bf42345947d8b0dd6ac092bc233d379704a0) — kimgooneya — 2024-04-12 — [FIX] 외부직원 추가 기능 UI 변경 _(core REST commit?author=kimgooneya)_
  - [9dff53298092](https://github.com/langcodestartup/NHRS/commit/9dff532980921764cdef916c68bb7bc440217cd4) — kimgooneya — 2024-04-12 — [FIX] 지식저장소 공유 범위 부서->팀단위로 변경 _(core REST commit?author=kimgooneya)_
  - [35431a570960](https://github.com/langcodestartup/NHRS/commit/35431a5709607bae771da4060f809f25ab6b2cb3) — kimgooneya — 2024-04-11 — [FEATURE] 권한 미보유 시 보여주는 페이지 지정 _(core REST commit?author=kimgooneya)_
  - [da86f86c5221](https://github.com/langcodestartup/NHRS/commit/da86f86c5221b4f440628cc1e27be3c3427312e4) — kimgooneya — 2024-04-11 — [FIX] 사용자 권한별 페이지 설정 _(core REST commit?author=kimgooneya)_
  - [316c56ad3eec](https://github.com/langcodestartup/NHRS/commit/316c56ad3eecdf5b48604f6b1161a8cc5617ac1b) — kimgooneya — 2024-04-11 — [FIX] 오류 수정 _(core REST commit?author=kimgooneya)_
  - [c3cec33cb05f](https://github.com/langcodestartup/NHRS/commit/c3cec33cb05f3621145baf44e03e7f48179669ce) — kimgooneya — 2024-04-11 — 피드백 표시 조건 및 버그 수정 _(core REST commit?author=kimgooneya)_
  - [ddafda4b3515](https://github.com/langcodestartup/NHRS/commit/ddafda4b35159bf938d3033806fb00e7539af406) — kimgooneya — 2024-04-11 — [FIX] 지식 저장소 업로드 과정 수정 _(core REST commit?author=kimgooneya)_
  - [b709b6c0b456](https://github.com/langcodestartup/NHRS/commit/b709b6c0b4562609270fa1f8d0de2e151008539f) — kimgooneya — 2024-04-11 — PII 내용 추가 _(core REST commit?author=kimgooneya)_
  - [60afc80ddc45](https://github.com/langcodestartup/NHRS/commit/60afc80ddc45d8530b13d15f1dc7849cb9e3cee0) — kimgooneya — 2024-04-11 — [FIX] 봇 관리 UI 및 기능 수정 _(core REST commit?author=kimgooneya)_
  - [8c1a3256efb9](https://github.com/langcodestartup/NHRS/commit/8c1a3256efb920e611f0af5f5d611937264c57ff) — kimgooneya — 2024-04-11 — [FIX] Feedback 기능 수정 _(core REST commit?author=kimgooneya)_
  - [1e631fd4da4d](https://github.com/langcodestartup/NHRS/commit/1e631fd4da4d5645173c76ab0fd7619ef97e56cc) — kimgooneya — 2024-04-11 — [FIX] LLM 사용량 저장 로직 수정 _(core REST commit?author=kimgooneya)_
  - [f4daf9fe83dc](https://github.com/langcodestartup/NHRS/commit/f4daf9fe83dc9094284a3e7dc02ffeb19353ca5b) — kimgooneya — 2024-04-11 — [FIX] Upload Error _(core REST commit?author=kimgooneya)_
  - [0ee5cdab8457](https://github.com/langcodestartup/NHRS/commit/0ee5cdab8457b6f4194ef05d75c1d4f7e9384be5) — kimgooneya — 2024-04-11 — [FIX] 객체 최신화 _(core REST commit?author=kimgooneya)_
  - [cefe4e828011](https://github.com/langcodestartup/NHRS/commit/cefe4e8280112eda49ac16092d81c11c4b878631) — kimgooneya — 2024-04-10 — [FEATURE] 관리자 권한 부여 페이지 변경 _(core REST commit?author=kimgooneya)_
  - [e1c367e14212](https://github.com/langcodestartup/NHRS/commit/e1c367e14212147126ebe5722bc73be0ffd7d0a2) — kimgooneya — 2024-04-10 — [FIX] 프롬프트 수정 시 이름 공백, 내용 공백 가능하도록 변경 _(core REST commit?author=kimgooneya)_
  - [cbbe8c840372](https://github.com/langcodestartup/NHRS/commit/cbbe8c8403726d46660926c4c6920bb2a704d99f) — kimgooneya — 2024-04-10 — [FIX] 봇관리페이지에서 봇 유형 표기, 생성자 표기 완료 _(core REST commit?author=kimgooneya)_
  - [b51d49bd7a69](https://github.com/langcodestartup/NHRS/commit/b51d49bd7a69633f7fc7099efd55ec3f7f0ac464) — kimgooneya — 2024-04-10 — FIX: 글자색상 문제 해결 _(core REST commit?author=kimgooneya)_
  - [d65829f90522](https://github.com/langcodestartup/NHRS/commit/d65829f90522379825b659961a2f36bf23ce9fe6) — kimgooneya — 2024-04-10 — FEATURE: 업로드 가능한 유형 지정(hwp doc pdf) _(core REST commit?author=kimgooneya)_
  - [92676f02c165](https://github.com/langcodestartup/NHRS/commit/92676f02c165d22c12a156287664ce45714b8e18) — kimgooneya — 2024-04-10 — FIX: TCB 생성 UI에서 GPT 선택항목 Disable표시 _(core REST commit?author=kimgooneya)_
  - [832cb72fc036](https://github.com/langcodestartup/NHRS/commit/832cb72fc0369cd5f3cb6c5e48b117652e4c754a) — kimgooneya — 2024-04-10 — FIX: 지식저장소 문서 표시 UI 수정 _(core REST commit?author=kimgooneya)_
  - [b4a85df7e7ba](https://github.com/langcodestartup/NHRS/commit/b4a85df7e7bac1e7fb02f2a51ab356ce91eade7d) — kimgooneya — 2024-04-10 — FIX: 로그 출력 순서 최신날짜 부터 _(core REST commit?author=kimgooneya)_
  - [cacd710eec3c](https://github.com/langcodestartup/NHRS/commit/cacd710eec3c589791f2e218c6c32e78be6ffff5) — kimgooneya — 2024-04-10 — FEATURE: 로그인 이력 추가 _(core REST commit?author=kimgooneya)_
  - [92659b27a70b](https://github.com/langcodestartup/NHRS/commit/92659b27a70bba64bc57a369c73b484af613c088) — kimgooneya — 2024-04-10 — FIX: 불필요한 정보 삭제 _(core REST commit?author=kimgooneya)_
  - [c12a970a1296](https://github.com/langcodestartup/NHRS/commit/c12a970a1296a610c66338577f66af4e534448a0) — kimgooneya — 2024-04-10 — FIX: 권한 명칭 오류 수정 _(core REST commit?author=kimgooneya)_
  - [8fbab44db962](https://github.com/langcodestartup/NHRS/commit/8fbab44db962188ad48ebfd5836e96761c8430fb) — kimgooneya — 2024-04-10 — FIX 설정탭 라우팅 재설정 _(core REST commit?author=kimgooneya)_
  - [d4127790f81a](https://github.com/langcodestartup/NHRS/commit/d4127790f81a1f07176316417042e55e6bc5cf71) — kimgooneya — 2024-04-10 — FIX 시간, 날짜 표시 형식 수정 _(core REST commit?author=kimgooneya)_
  - [a241a92627d3](https://github.com/langcodestartup/NHRS/commit/a241a92627d333f10b535178983bbc6a80460869) — kimgooneya — 2024-04-10 — FIX 보여지는 페이지 목록 수정 _(core REST commit?author=kimgooneya)_
  - [b8c6d2d11167](https://github.com/langcodestartup/NHRS/commit/b8c6d2d11167897a84f4ae13302a3f172f41dcc3) — kimgooneya — 2024-04-10 — FEATURE 피드백 기능 수정 UI DB API _(core REST commit?author=kimgooneya)_
  - [33c3f9d53d57](https://github.com/langcodestartup/NHRS/commit/33c3f9d53d57b0eea063e439391b64d56d5fc594) — kimgooneya — 2024-04-09 — FIX: 라우팅 변경 + 시스템 관리자 추가 _(core REST commit?author=kimgooneya)_
  - [a89bcb47e1f1](https://github.com/langcodestartup/NHRS/commit/a89bcb47e1f1db1310b1df5cf80a02fecf956ae9) — kimgooneya — 2024-04-09 — # 봇만들기 지식 저장소 선택 안하는 경우 오류 _(core REST commit?author=kimgooneya)_
  - [5cc1a4ccf749](https://github.com/langcodestartup/NHRS/commit/5cc1a4ccf749416793b9db5ba797a675827f9273) — kimgooneya — 2024-04-09 — text color 수정 _(core REST commit?author=kimgooneya)_
  - [4c213cb4ec87](https://github.com/langcodestartup/NHRS/commit/4c213cb4ec872ff08b354d397bb016f7b71ef41e) — kimgooneya — 2024-04-09 — text color 오류 수정 _(core REST commit?author=kimgooneya)_
  - [ac5731cd96ea](https://github.com/langcodestartup/NHRS/commit/ac5731cd96ea067028da96a3268865f92cf6b2b2) — kimgooneya — 2024-04-09 — FIX: Dropdown JS 호출 오류 수정 _(core REST commit?author=kimgooneya)_
  - [8f378327a316](https://github.com/langcodestartup/NHRS/commit/8f378327a316c6b6663feaae8261eb5961a6e1a9) — kimgooneya — 2024-04-07 — FEATURE: 지식 저장소 선택 내용 반영 _(core REST commit?author=kimgooneya)_
  - [b45233017c47](https://github.com/langcodestartup/NHRS/commit/b45233017c47abccc615498169892681a410756f) — kimgooneya — 2024-04-07 — FIX: 지식 저장소 지정 질문 기능 완료 _(core REST commit?author=kimgooneya)_
  - [4a0c4cdedf6a](https://github.com/langcodestartup/NHRS/commit/4a0c4cdedf6a2f8ab4cc899d39de0d6a6dd9f1f5) — kimgooneya — 2024-04-07 — FIX 지식 저장소 드랍다운 UI 완료 _(core REST commit?author=kimgooneya)_
  - [c92891f9e47e](https://github.com/langcodestartup/NHRS/commit/c92891f9e47ea4f3f282e0e70262bf1bc5b2fe18) — kimgooneya — 2024-04-06 — FIX: 날짜 형식 오류 수정 _(core REST commit?author=kimgooneya)_
  - [665f635c883a](https://github.com/langcodestartup/NHRS/commit/665f635c883a44d18ceca658e486603d80b83065) — kimgooneya — 2024-04-06 — FIX: 조회 조건에 DELETESTATUS 추가 _(core REST commit?author=kimgooneya)_
  - [5ba1fea1a127](https://github.com/langcodestartup/NHRS/commit/5ba1fea1a127b3f185c9e6f766c96ff3247d2144) — kimgooneya — 2024-04-06 — 코드 정리 _(core REST commit?author=kimgooneya)_
  - [54aab1b7304c](https://github.com/langcodestartup/NHRS/commit/54aab1b7304c78c218211ea01c68b9641f0fc30a) — kimgooneya — 2024-04-06 — 코드정리 _(core REST commit?author=kimgooneya)_
  - [26feac65939c](https://github.com/langcodestartup/NHRS/commit/26feac65939cda9f72c68a0045878ba9d2a05b70) — kimgooneya — 2024-04-06 — 복의 지식 저장소 목록 수정 기능 수정 _(core REST commit?author=kimgooneya)_
  - [42eeae7e77f4](https://github.com/langcodestartup/NHRS/commit/42eeae7e77f4237dbb94bcc6c58044d36ffccca0) — kimgooneya — 2024-04-06 — DELTE: 지식저장소 제목 수정 기능 폐기 _(core REST commit?author=kimgooneya)_
  - [7149d0a66ad6](https://github.com/langcodestartup/NHRS/commit/7149d0a66ad602c31f9aaf81ad95d417326d837b) — kimgooneya — 2024-04-06 — FIX: 지식 저장소 필수 항목 표기 추가 _(core REST commit?author=kimgooneya)_
  - [bf7b4f39a541](https://github.com/langcodestartup/NHRS/commit/bf7b4f39a5418aa155d1c2a37707c9f42368e1cf) — kimgooneya — 2024-04-06 — FIX 권한에 따른 기능 표기 수정 _(core REST commit?author=kimgooneya)_
  - [1ea58b9cd14c](https://github.com/langcodestartup/NHRS/commit/1ea58b9cd14cc94aab4c3aea6354ca0e1381c841) — kimgooneya — 2024-04-06 — FIX: 같은 부서 사람이 만든 지식 저장소만 보이도록 변경 _(core REST commit?author=kimgooneya)_
  - [96403afb7c99](https://github.com/langcodestartup/NHRS/commit/96403afb7c999e06d7666c82c451aa6a1be3875b) — kimgooneya — 2024-04-06 — 코드 정리 _(core REST commit?author=kimgooneya)_
  - [63562fcfcf65](https://github.com/langcodestartup/NHRS/commit/63562fcfcf65f4eb9f014a2ac4eb0b018145d7c5) — kimgooneya — 2024-04-06 — FIX 탭 전환 시 selectedPrompt null _(core REST commit?author=kimgooneya)_
  - [4c5b72253088](https://github.com/langcodestartup/NHRS/commit/4c5b722530887be83a383f723412d1050cf5bd29) — kimgooneya — 2024-04-06 — TCB 표시 방식 변경 _(core REST commit?author=kimgooneya)_
  - [f5d273beb43f](https://github.com/langcodestartup/NHRS/commit/f5d273beb43f60cf8da947f2fc5659c99d6377ca) — kimgooneya — 2024-04-06 — FIX BotPrompt 컴포넌트 TCB 표시 오류 수정 _(core REST commit?author=kimgooneya)_
  - [fc87b6950895](https://github.com/langcodestartup/NHRS/commit/fc87b6950895a7865d98e712fe0a57ae4b73c3d2) — kimgooneya — 2024-04-06 — FEATURE: TCB 생성 시 LLM 선택 고정 사항 안내 _(core REST commit?author=kimgooneya)_
  - [193693bbcaeb](https://github.com/langcodestartup/NHRS/commit/193693bbcaeb4c68100a12dd0f7e3fa62747aa57) — kimgooneya — 2024-04-06 — FIX: favicon 변경 _(core REST commit?author=kimgooneya)_
  - [feca88f312db](https://github.com/langcodestartup/NHRS/commit/feca88f312dbe5bde185ee6dce641685cb48d857) — kimgooneya — 2024-04-05 — FIX: OBS 표기 항목 FOS로 변경 _(core REST commit?author=kimgooneya)_
  - [48e2fff3cf05](https://github.com/langcodestartup/NHRS/commit/48e2fff3cf054c38a61fe8aae2d1d2c3c0c46925) — kimgooneya — 2024-04-05 — FIX 프롬프트 편집 표기 순서 및 한글 표시 완료 _(core REST commit?author=kimgooneya)_
  - [c83bca1e590a](https://github.com/langcodestartup/NHRS/commit/c83bca1e590abbc08d959232c7bc1dfe9a30f631) — kimgooneya — 2024-04-05 — FIX 봇 타입이 '범용'인 경우 지식저장소 연결 탭 안보이게 처리 _(core REST commit?author=kimgooneya)_
  - [9a43145d40a7](https://github.com/langcodestartup/NHRS/commit/9a43145d40a7822108b7438aac6ec238ff617b94) — kimgooneya — 2024-04-05 — FIX 서비스 추가 기능 _(core REST commit?author=kimgooneya)_
  - [b870845c8851](https://github.com/langcodestartup/NHRS/commit/b870845c8851a4a5d2600a22a4b5c781853f21bd) — kimgooneya — 2024-04-05 — FIX 봇 수정 UI 오류 수정 _(core REST commit?author=kimgooneya)_
  - [652cab976625](https://github.com/langcodestartup/NHRS/commit/652cab97662572bd514ae52f6bf423a85c6d5c77) — kimgooneya — 2024-04-05 — Fix 설정-지식 저장소 오류 수정 _(core REST commit?author=kimgooneya)_
  - [09c54c27cffb](https://github.com/langcodestartup/NHRS/commit/09c54c27cffb6b6558fb4531601b6ee85d3c00fb) — kimgooneya — 2024-04-05 — 결재자 선택 중복 확인 _(core REST commit?author=kimgooneya)_
  - [a9f24155ec45](https://github.com/langcodestartup/NHRS/commit/a9f24155ec4599f84a710af5ae6b78406a9dd4c5) — kimgooneya — 2024-04-05 — FIX 프롬프트 내용이 챗 바디에 들어가서 생기는 문제 수정 _(core REST commit?author=kimgooneya)_
  - [efb10b3a266e](https://github.com/langcodestartup/NHRS/commit/efb10b3a266e2eeb2c624dfa852eeea59064175e) — kimgooneya — 2024-04-05 — FIX 봇 이름 중복 체크 수정 _(core REST commit?author=kimgooneya)_
  - [e13e35cbf4b3](https://github.com/langcodestartup/NHRS/commit/e13e35cbf4b3ab8b48608519a5cd7f68624cbc4d) — kimgooneya — 2024-04-05 — FEATURE: 상신 이력 표시 _(core REST commit?author=kimgooneya)_
  - [696249cade12](https://github.com/langcodestartup/NHRS/commit/696249cade12df89fdd721d24f35b66229c10cb1) — kimgooneya — 2024-04-05 — Fix Create Request 함수명 수정 누락 내용 보충 _(core REST commit?author=kimgooneya)_
  - [123aacc8b5b8](https://github.com/langcodestartup/NHRS/commit/123aacc8b5b86bd050ed45dc600e699bb0af39b7) — kimgooneya — 2024-04-05 — Fix Create Request 함수 명 수정 _(core REST commit?author=kimgooneya)_
  - [698a8fdd159f](https://github.com/langcodestartup/NHRS/commit/698a8fdd159f9ddccb684759b3ff56d811cd8e74) — kimgooneya — 2024-04-05 — Fix 임베딩 코드 정리 _(core REST commit?author=kimgooneya)_
  - [35c5fccd613a](https://github.com/langcodestartup/NHRS/commit/35c5fccd613ae78b9e6803bcdcab5215108489f6) — kimgooneya — 2024-04-04 — FEATURE: 지식 저장소 이름 중복 여부 체크 _(core REST commit?author=kimgooneya)_
  - [4f0dff1463c5](https://github.com/langcodestartup/NHRS/commit/4f0dff1463c56f2d55b65e1ca95baf42bd5dcc4f) — kimgooneya — 2024-04-04 — RE: BotKnowledgeService 함수 정리 _(core REST commit?author=kimgooneya)_
  - [114f08676760](https://github.com/langcodestartup/NHRS/commit/114f086767603b16de6edcf177c9ab6e2603ced7) — kimgooneya — 2024-04-04 — RE: BotKnowledge 함수정리 _(core REST commit?author=kimgooneya)_
  - [0d6497663773](https://github.com/langcodestartup/NHRS/commit/0d6497663773a125bad9e761c14f8bbad74db890) — kimgooneya — 2024-04-04 — RE KnowledgeService 함수 정리 _(core REST commit?author=kimgooneya)_
  - [39c9659c01f9](https://github.com/langcodestartup/NHRS/commit/39c9659c01f93f183917e3ae3e8299d226348000) — kimgooneya — 2024-04-04 — Fix 봇 권한에 따라 보여주는 항목 수정 _(core REST commit?author=kimgooneya)_
  - [ac08e9765215](https://github.com/langcodestartup/NHRS/commit/ac08e976521568be967ca609f1cc645efd6f0185) — kimgooneya — 2024-04-04 — Fix Azure 문서 삭제 요청 API 수정 _(core REST commit?author=kimgooneya)_
  - [910e3fd244c7](https://github.com/langcodestartup/NHRS/commit/910e3fd244c79f4f07cfcc685118f285f5073816) — kimgooneya — 2024-04-04 — 승인시 내용 항목 Title 추가 _(core REST commit?author=kimgooneya)_
  - [0472a545cc5f](https://github.com/langcodestartup/NHRS/commit/0472a545cc5fb80b635bee1f159ccd65bff89a25) — kimgooneya — 2024-04-04 — Fix 답변 문서 타이틀 못찾았을때 원본 문서 ID 전달 _(core REST commit?author=kimgooneya)_
  - [c8ddc619b26c](https://github.com/langcodestartup/NHRS/commit/c8ddc619b26cc9dbc783c51f3abd03a767ac0566) — kimgooneya — 2024-04-03 — Fix 봇 권한 체크 (#97) _(core REST commit?author=kimgooneya)_
  - [62b2e2010868](https://github.com/langcodestartup/NHRS/commit/62b2e2010868b0a8d61b0a8479b394043a3acea4) — kimgooneya — 2024-04-03 — Fix 봇 사용자 권한 기능 전면 수정 (#96) _(core REST commit?author=kimgooneya)_
  - [dc1898815af1](https://github.com/langcodestartup/NHRS/commit/dc1898815af1d25c119beeb51ab0d9b5fb90a82e) — kimgooneya — 2024-04-02 — Feature 봇 설정 변경 페이지 (#95) _(core REST commit?author=kimgooneya)_
  - [7d56495fcb37](https://github.com/langcodestartup/NHRS/commit/7d56495fcb37243487f02828ea8275de31456b67) — kimgooneya — 2024-04-01 — AI 프롬프트 생성 추가 _(core REST commit?author=kimgooneya)_
  - [8eaf1588822d](https://github.com/langcodestartup/NHRS/commit/8eaf1588822da3b9b3a5794312fb1c2ec770e24a) — kimgooneya — 2024-04-01 — 봇유저 권한 체크 로직 수정 _(core REST commit?author=kimgooneya)_
  - [c335f3ba9345](https://github.com/langcodestartup/NHRS/commit/c335f3ba93458b61766044fe893967040f32154f) — kimgooneya — 2024-04-01 — 봇사용자, 봇지식저장소 업데이트 로직 수정 _(core REST commit?author=kimgooneya)_
  - [84ed1ea2cc64](https://github.com/langcodestartup/NHRS/commit/84ed1ea2cc64ed6b2ab9792f51426fc463c75ee9) — kimgooneya — 2024-04-01 — 일괄결재 기능 ON _(core REST commit?author=kimgooneya)_
  - [31cc698ec2dc](https://github.com/langcodestartup/NHRS/commit/31cc698ec2dc8fc6bcfa3e3c9f8dbab64bc8253d) — kimgooneya — 2024-04-01 — 외부직원 엔터 검색 _(core REST commit?author=kimgooneya)_
  - [4ed88c0acd2e](https://github.com/langcodestartup/NHRS/commit/4ed88c0acd2eef2ca84af19aae9a6eca6c741823) — kimgooneya — 2024-04-01 — 코드 수정 _(core REST commit?author=kimgooneya)_
  - [8cecdb0baef2](https://github.com/langcodestartup/NHRS/commit/8cecdb0baef2d9dd8954eccfb641d175287ee576) — kimgooneya — 2024-04-01 — 불필요한 로직 삭제 _(core REST commit?author=kimgooneya)_
  - [729987ebcaee](https://github.com/langcodestartup/NHRS/commit/729987ebcaeecfa72972162bf5f0c630ad050d6d) — kimgooneya — 2024-04-01 — 글자 색상 문제 수정 _(core REST commit?author=kimgooneya)_
  - [70375bd44ec8](https://github.com/langcodestartup/NHRS/commit/70375bd44ec852a5aca78a1079dd8b0604a455c0) — kimgooneya — 2024-04-01 — 코드 모양 수정 _(core REST commit?author=kimgooneya)_
  - [9f058c4b8f16](https://github.com/langcodestartup/NHRS/commit/9f058c4b8f16f6ada9c9820e9abc44b6350bf98f) — kimgooneya — 2024-04-01 — 승인 모달 CSS 수정 _(core REST commit?author=kimgooneya)_
  - [060dc05fb9ad](https://github.com/langcodestartup/NHRS/commit/060dc05fb9ad686092e39c9b30cadbe353083a76) — kimgooneya — 2024-04-01 — T 사번 삭제 _(core REST commit?author=kimgooneya)_
  - [acf10c273c8f](https://github.com/langcodestartup/NHRS/commit/acf10c273c8f3651fd6cc5da71c27d3f44e4b5d8) — kimgooneya — 2024-04-01 — 모니터링 필터 전체 항목 추가 _(core REST commit?author=kimgooneya)_
  - [4349b8a0e3e4](https://github.com/langcodestartup/NHRS/commit/4349b8a0e3e417474e66d2232dfe07243befa466) — kimgooneya — 2024-04-01 — Fix 업로드 css 및 표시 수정 _(core REST commit?author=kimgooneya)_
  - [d180332e899a](https://github.com/langcodestartup/NHRS/commit/d180332e899acae6c0dfd6a01b88d613995bb91c) — kimgooneya — 2024-03-31 — 채팅 처리 변경 (#92) _(core REST commit?author=kimgooneya)_
  - [01320278d899](https://github.com/langcodestartup/NHRS/commit/01320278d899b1448c3eb00a23a693bc70d236fc) — kimgooneya — 2024-03-31 — 봇 지식저장소 등록 삭제 기능 추가 (#91) _(core REST commit?author=kimgooneya)_
  - [46aaa32e7e19](https://github.com/langcodestartup/NHRS/commit/46aaa32e7e19c403c96ea82158df3ee52de6eba3) — kimgooneya — 2024-03-31 — Fix 봇-지식저장소 연결 삭제 (#90) _(core REST commit?author=kimgooneya)_
  - [122f50b26fbd](https://github.com/langcodestartup/NHRS/commit/122f50b26fbdad534d03ad399d547ab1036a3f6f) — kimgooneya — 2024-03-30 — Fix 문서 검색 기능 완료 (#89) _(core REST commit?author=kimgooneya)_
  - [b58c6b549ca5](https://github.com/langcodestartup/NHRS/commit/b58c6b549ca594c9b34588b4638b757e34796bbd) — kimgooneya — 2024-03-30 — 문서 정보 표시 오류 수정 (#88) _(core REST commit?author=kimgooneya)_
  - [551508c3f9b5](https://github.com/langcodestartup/NHRS/commit/551508c3f9b5f1759ef4d7670288948f758b00c1) — kimgooneya — 2024-03-30 — Fix 모니터링 항목 미출력 오류 수정 (#87) _(core REST commit?author=kimgooneya)_
  - [7a618c4be90e](https://github.com/langcodestartup/NHRS/commit/7a618c4be90e695043093103fe793cac9d32b41d) — kimgooneya — 2024-03-30 — Fix LLM 선택은 항상 하나만 가능하도록 변경 (#86) _(core REST commit?author=kimgooneya)_
  - [de026eefb9a4](https://github.com/langcodestartup/NHRS/commit/de026eefb9a405b8b7c32401c7a783057fd35e22) — kimgooneya — 2024-03-30 — Fix 봇 생성 단계에서 프롬프트 지워지는 문제 수정 (#85) _(core REST commit?author=kimgooneya)_
  - [491fa44962c5](https://github.com/langcodestartup/NHRS/commit/491fa44962c5d8d08439937be1205b9544045ef8) — kimgooneya — 2024-03-30 — Feature AI Prompt 기능 추가 (#84) _(core REST commit?author=kimgooneya)_
  - [2141aff5fc8e](https://github.com/langcodestartup/NHRS/commit/2141aff5fc8ef687f8f6d4b0d1a2d1605cc41658) — kimgooneya — 2024-03-30 — 금지어 삭제 오류 수정 (#83) _(core REST commit?author=kimgooneya)_
  - [f8cb6ad6ded9](https://github.com/langcodestartup/NHRS/commit/f8cb6ad6ded9ff162a6f4769f7034f0acc0dc10e) — kimgooneya — 2024-03-29 — Fix 봇 채팅 - 사용자 추가하기 에러 (#82) _(core REST commit?author=kimgooneya)_
  - [413d3791e5e4](https://github.com/langcodestartup/NHRS/commit/413d3791e5e42a431fd434b844fffd3723dab6e7) — kimgooneya — 2024-03-29 — Fix 외부 직원 페이지 네이션 오류 수정 (#81) _(core REST commit?author=kimgooneya)_
  - [b34bf3968e1c](https://github.com/langcodestartup/NHRS/commit/b34bf3968e1c9e9b88d4af69eeaaebacd5c17205) — kimgooneya — 2024-03-29 — Fix 봇 사용자 수정 로직 수정 (#80) _(core REST commit?author=kimgooneya)_
  - [79896ea1f09e](https://github.com/langcodestartup/NHRS/commit/79896ea1f09eae82dff5dcbac9c93d2c11d0ebcd) — kimgooneya — 2024-03-29 — Fix 본인이 만든 지식저장소는 봇 연결과 별개로 조회하도록 변경 (#79) _(core REST commit?author=kimgooneya)_
  - [cff35064f01a](https://github.com/langcodestartup/NHRS/commit/cff35064f01ad345cc8103d0dc2f8eff90c1ec53) — kimgooneya — 2024-03-29 — 외부직원 직급 항목 삭제 (#78) _(core REST commit?author=kimgooneya)_
  - [d2b436d4c42d](https://github.com/langcodestartup/NHRS/commit/d2b436d4c42d33c61eacb815e7c2fee7a23c64df) — kimgooneya — 2024-03-29 — Fix 닫기 버튼 색상 _(core REST commit?author=kimgooneya)_
  - [a049391284f9](https://github.com/langcodestartup/NHRS/commit/a049391284f958165b5e7757cac615c3a380973d) — kimgooneya — 2024-03-29 — Fix 봇 수정 페이지 선택 오류 수정 (#77) _(core REST commit?author=kimgooneya)_
  - [6f4e85ed07e9](https://github.com/langcodestartup/NHRS/commit/6f4e85ed07e9fde55d5ad9fb65292e76130ce8a4) — kimgooneya — 2024-03-29 — Fix 봇 중목 이름 체크 로직 수정 (#76) _(core REST commit?author=kimgooneya)_
  - [e08c354781d0](https://github.com/langcodestartup/NHRS/commit/e08c354781d00e3a17d985f381c9f3d75127646c) — kimgooneya — 2024-03-29 — 검색 필터 조건 변경 (#75) _(core REST commit?author=kimgooneya)_
  - [261801aa4338](https://github.com/langcodestartup/NHRS/commit/261801aa43387833fec3a9b8e80d052b89b36651) — kimgooneya — 2024-03-29 — 프롬프트 수정 오류 처리 (#74) _(core REST commit?author=kimgooneya)_
  - [1e152b3bd835](https://github.com/langcodestartup/NHRS/commit/1e152b3bd835f539db0fd33e65215d2e465db28d) — kimgooneya — 2024-03-29 — 금지어 문제 수정 (#73) _(core REST commit?author=kimgooneya)_
  - [15b77abd716d](https://github.com/langcodestartup/NHRS/commit/15b77abd716dffa9636033e3fdcf5487c601df50) — kimgooneya — 2024-03-28 — 네비게이션 항목 수정 (#72) _(core REST commit?author=kimgooneya)_
  - [0cee91d1da3c](https://github.com/langcodestartup/NHRS/commit/0cee91d1da3cf35d5bae67075685b91454e2521b) — kimgooneya — 2024-03-28 — 모니터링 오류 수정 (#71) _(core REST commit?author=kimgooneya)_
  - [d6b65debc170](https://github.com/langcodestartup/NHRS/commit/d6b65debc170dbeb90cc8dcfef4ec83f5b6fdf7a) — kimgooneya — 2024-03-28 — 사용자 권한 편집 기능 수정 및 UI 수정 (#70) _(core REST commit?author=kimgooneya)_
  - [f1be07a11178](https://github.com/langcodestartup/NHRS/commit/f1be07a111784eb6bd50d85b973e2ef7d06a7bb4) — kimgooneya — 2024-03-28 — 봇 유저 관계 페이지 오류 수정 (#69) _(core REST commit?author=kimgooneya)_
  - [385688c6d8bf](https://github.com/langcodestartup/NHRS/commit/385688c6d8bf5f58141f3b0b5671dd6c5c0b2830) — kimgooneya — 2024-03-28 — 피드백 기능 완료 (#68) _(core REST commit?author=kimgooneya)_
  - [9bbcf25605f9](https://github.com/langcodestartup/NHRS/commit/9bbcf25605f9b20d93d9522df4ebf7e2ace337e5) — kimgooneya — 2024-03-28 — 봇 로딩 화면 수정 _(core REST commit?author=kimgooneya)_
  - [99fbe46e50db](https://github.com/langcodestartup/NHRS/commit/99fbe46e50db98416b6e3c26b6f25d29c59ab0df) — kimgooneya — 2024-03-28 — 챗 문제 해결, 피드백 등록 (#67) _(core REST commit?author=kimgooneya)_
  - [c3ec17dc97f2](https://github.com/langcodestartup/NHRS/commit/c3ec17dc97f229f8a2c1de68af49cc67c6928809) — kimgooneya — 2024-03-27 — 피드백 기능 완료 (#66) _(core REST commit?author=kimgooneya)_
  - [b85ee9c193b2](https://github.com/langcodestartup/NHRS/commit/b85ee9c193b2735d855722c9302e3ac2b4dc1e1a) — kimgooneya — 2024-03-27 — 새로운 외부 직원 추가기능 완료 (#65) _(core REST commit?author=kimgooneya)_
  - [6c28dce8df63](https://github.com/langcodestartup/NHRS/commit/6c28dce8df63004b34342cab89a811778ba2d8af) — kimgooneya — 2024-03-27 — 모니터링 로그 기능 정상화 (#64) _(core REST commit?author=kimgooneya)_
  - [3d81d6e6158d](https://github.com/langcodestartup/NHRS/commit/3d81d6e6158db408db0a536d7dd222c349ffd87a) — kimgooneya — 2024-03-27 — chat message color 수정 (#63) _(core REST commit?author=kimgooneya)_
  - [85286bd28f50](https://github.com/langcodestartup/NHRS/commit/85286bd28f50c839c32dc67e7fdd6d6ca9e43b64) — kimgooneya — 2024-03-27 — 결재자 id 조회 조건 추가 (#62) _(core REST commit?author=kimgooneya)_
  - [7e1ed49df3e2](https://github.com/langcodestartup/NHRS/commit/7e1ed49df3e28748e169eda1c42076879c9b3b12) — kimgooneya — 2024-03-27 — 결재자 선택시 시스템 관리자만 선택하는 경우는 안되도록 메세지 처리 (#61) _(core REST commit?author=kimgooneya)_
  - [1aefbde10454](https://github.com/langcodestartup/NHRS/commit/1aefbde1045448e7d594ad0db9fec906d38c3759) — kimgooneya — 2024-03-27 — 봇 - 유저 삭제 표시 전환 _(core REST commit?author=kimgooneya)_
  - [137fe24b0c61](https://github.com/langcodestartup/NHRS/commit/137fe24b0c619527f323092c3d491a5e82ef4c5c) — kimgooneya — 2024-03-27 — 수정 _(core REST commit?author=kimgooneya)_
  - [a948835d703a](https://github.com/langcodestartup/NHRS/commit/a948835d703ac13a03c7abeb0bf8f241f9416930) — kimgooneya — 2024-03-27 — 순서 정렬 수정, 봇 수정 시 에러페이지 수정, 봇 이름 체크 로직 수정 (#60) _(core REST commit?author=kimgooneya)_
  - [b7029a5ac533](https://github.com/langcodestartup/NHRS/commit/b7029a5ac53300eba991234c7a9595532b4cd971) — kimgooneya — 2024-03-27 — 첫페이지 에러 문제 해결 (#59) _(core REST commit?author=kimgooneya)_
  - [61d92baeead0](https://github.com/langcodestartup/NHRS/commit/61d92baeead0f39c6d0b02c89c51e1ca20530a20) — kimgooneya — 2024-03-26 — 봇 사용자 권한 변경 수정 (#58) _(core REST commit?author=kimgooneya)_
  - [749819505577](https://github.com/langcodestartup/NHRS/commit/749819505577de7825f929cd02f5e2f1b5e9e1ab) — kimgooneya — 2024-03-26 — 결재 이력 조회 조건 수정 (#56) _(core REST commit?author=kimgooneya)_
  - [7e2ce3a81c16](https://github.com/langcodestartup/NHRS/commit/7e2ce3a81c160975c8a984d028009406716ce7e1) — kimgooneya — 2024-03-26 — 경로 미입력시 오류 표시 (#55) _(core REST commit?author=kimgooneya)_
  - [56bcc0f46ca9](https://github.com/langcodestartup/NHRS/commit/56bcc0f46ca908b35d1d916d4cb7156086af837c) — kimgooneya — 2024-03-25 — 지식 베이스 검색기능 수정 (#54) _(core REST commit?author=kimgooneya)_
  - [0633c6af4d33](https://github.com/langcodestartup/NHRS/commit/0633c6af4d331bae8c10a6aa7a5dfb1cf5955342) — kimgooneya — 2024-03-25 — 결재 승인 조건 추가 (#53) _(core REST commit?author=kimgooneya)_
  - [5e7d5f2b2c45](https://github.com/langcodestartup/NHRS/commit/5e7d5f2b2c45ee32926a218eb4d9e01989c88b04) — kimgooneya — 2024-03-25 — 필터 변경 조건 및 설정 수정 (#52) _(core REST commit?author=kimgooneya)_
  - [a2e6d38ddb31](https://github.com/langcodestartup/NHRS/commit/a2e6d38ddb31793cf894c8e6d98219c4f92b5468) — kimgooneya — 2024-03-25 — JWT 변경 (#51) _(core REST commit?author=kimgooneya)_
  - [d3048b8390f9](https://github.com/langcodestartup/NHRS/commit/d3048b8390f99b0ca56c9f2bc257d1269bc57e94) — kimgooneya — 2024-03-25 — 외부 사용자 삭제 기능 수정 (#50) _(core REST commit?author=kimgooneya)_
  - [702fa9bfff2a](https://github.com/langcodestartup/NHRS/commit/702fa9bfff2abdc72ccbddf728efa635ae04a299) — kimgooneya — 2024-03-24 — 로그, 금지어 검출 기능 추가 (#49) _(core REST commit?author=kimgooneya)_
  - [db756e26fde1](https://github.com/langcodestartup/NHRS/commit/db756e26fde167f2d69acccf897a3b7664f3db2d) — kimgooneya — 2024-03-24 — 파일 업로드 UI 수정 (#48) _(core REST commit?author=kimgooneya)_
  - [4bb49494d8ef](https://github.com/langcodestartup/NHRS/commit/4bb49494d8ef43477ccf0f068c4fbfadd7322ed5) — kimgooneya — 2024-03-23 — 첫 생성시 봇 이름 체크 (#47) _(core REST commit?author=kimgooneya)_
  - [f27e0f20431a](https://github.com/langcodestartup/NHRS/commit/f27e0f20431a94a283977ff4e3f6cece90428621) — kimgooneya — 2024-03-23 — 승인/반려 항목 완료 후 버튼 및 입력 비활성화 표시 (#46) _(core REST commit?author=kimgooneya)_
  - [b6bfcd7b136a](https://github.com/langcodestartup/NHRS/commit/b6bfcd7b136ae75befd157db39299ee42e87858e) — kimgooneya — 2024-03-23 — 프롬프트 수정 시 문제 사항 조치 완료 (#45) _(core REST commit?author=kimgooneya)_
  - [266f30fc7389](https://github.com/langcodestartup/NHRS/commit/266f30fc7389001fd34db9ac4dc8ab36baa06cf3) — kimgooneya — 2024-03-21 — 스트리밍 기능 구현 (#44) _(core REST commit?author=kimgooneya)_
  - [35dbcb86b11a](https://github.com/langcodestartup/NHRS/commit/35dbcb86b11a4f00adb98f493acdaee3ff4797f9) — kimgooneya — 2024-03-21 — 결재 승인 UI, 프로세스 로직 수정 (#43) _(core REST commit?author=kimgooneya)_
  - [9b6e14e4fafd](https://github.com/langcodestartup/NHRS/commit/9b6e14e4fafd9548c3c2b29d5a86c33930a8ebf0) — kimgooneya — 2024-03-21 — 클라우드 환경 용 설정 적용 _(core REST commit?author=kimgooneya)_
  - [d0930b4e4976](https://github.com/langcodestartup/NHRS/commit/d0930b4e4976dc9828dc94c107e58bd4dc8eaa32) — kimgooneya — 2024-03-20 — PDF 표시 되도록 수정 (#42) _(core REST commit?author=kimgooneya)_
  - [6735ee2a2bcd](https://github.com/langcodestartup/NHRS/commit/6735ee2a2bcdce99e911a30a0be7c66693009a9d) — kimgooneya — 2024-03-19 — 지식 저장소 안바뀌는 문제 수정 - 렌더링 순서 문제 (#41) _(core REST commit?author=kimgooneya)_
  - [f073a8fc258e](https://github.com/langcodestartup/NHRS/commit/f073a8fc258edeb988a1f0040aff28f4a8c33c10) — kimgooneya — 2024-03-19 — 테스트용 코드 주석처리 _(core REST commit?author=kimgooneya)_
  - [23f545d30d9b](https://github.com/langcodestartup/NHRS/commit/23f545d30d9ba8b2c271d0644872d46eed0d3807) — kimgooneya — 2024-03-19 — 애져 연결 테스트 추가 (#40) _(core REST commit?author=kimgooneya)_
  - [e61228726542](https://github.com/langcodestartup/NHRS/commit/e61228726542904c85b503706acf0aaa9223dc3d) — kimgooneya — 2024-03-19 — 업로드 로직 수정 (#39) _(core REST commit?author=kimgooneya)_
  - [e2694a9a8dcf](https://github.com/langcodestartup/NHRS/commit/e2694a9a8dcf40faf0b32640cb6315783205deb2) — kimgooneya — 2024-03-19 — PII 기능 추가 (#38) _(core REST commit?author=kimgooneya)_
  - [2113e0fe3dde](https://github.com/langcodestartup/NHRS/commit/2113e0fe3dde6520137b0e865382b61c6bfa49e6) — kimgooneya — 2024-03-18 — 승인 완료 후 항목 변경 프로세스 완료 (#37) _(core REST commit?author=kimgooneya)_
  - [b8ab7839bafb](https://github.com/langcodestartup/NHRS/commit/b8ab7839bafb9ba44ac5eff969405896e2beb1d5) — kimgooneya — 2024-03-15 — 수정 _(core REST commit?author=kimgooneya)_
  - [689ac2d67a2f](https://github.com/langcodestartup/NHRS/commit/689ac2d67a2f3ccfcfcd067089b4612ea7110df6) — kimgooneya — 2024-03-15 — nugetpkg 수정 _(core REST commit?author=kimgooneya)_
  - [3f03ac84432c](https://github.com/langcodestartup/NHRS/commit/3f03ac84432c42d52fdffdbd2cc389da5fcf0efd) — kimgooneya — 2024-03-15 — 초기 설정 수정 _(core REST commit?author=kimgooneya)_
  - [c57a59a97820](https://github.com/langcodestartup/NHRS/commit/c57a59a97820800985d8a16ebe30c95a8bbffe48) — kimgooneya — 2024-03-15 — 승인 오류 수정 _(core REST commit?author=kimgooneya)_
  - [a2d5d0b3af25](https://github.com/langcodestartup/NHRS/commit/a2d5d0b3af252ea46d43a2b7c2e73a164a884b1f) — kimgooneya — 2024-03-15 — UI 수정 _(core REST commit?author=kimgooneya)_
  - [842885f5f585](https://github.com/langcodestartup/NHRS/commit/842885f5f58551be0fe02877c93dde663064660b) — kimgooneya — 2024-03-15 — 안쓰는 css 삭제 _(core REST commit?author=kimgooneya)_
  - [749794758b93](https://github.com/langcodestartup/NHRS/commit/749794758b935e16aa1c11fa9e4a1d230fc6eaea) — kimgooneya — 2024-03-15 — 로깅 패키지 삭제 _(core REST commit?author=kimgooneya)_
  - [e1705de610e8](https://github.com/langcodestartup/NHRS/commit/e1705de610e8738a4c2a88593ad7c5edae1de09f) — kimgooneya — 2024-03-15 — 비동기 메서드 수정 _(core REST commit?author=kimgooneya)_
  - [5512a54d843a](https://github.com/langcodestartup/NHRS/commit/5512a54d843a6ce1f184189d47b26ca0449fd360) — kimgooneya — 2024-03-15 — 렌더 문제 수정 _(core REST commit?author=kimgooneya)_
  - [24e2eb6ff40f](https://github.com/langcodestartup/NHRS/commit/24e2eb6ff40f11c7292b424dd4413cb55c2f29fd) — kimgooneya — 2024-03-14 — 승인 오류 메세지 출력 (#36) _(core REST commit?author=kimgooneya)_
  - [828cc0924c12](https://github.com/langcodestartup/NHRS/commit/828cc0924c12dbbd6f2a04c97205b23775e0139a) — kimgooneya — 2024-03-14 — 로그아웃 기능 완료 (#35) _(core REST commit?author=kimgooneya)_
  - [81f458b32e72](https://github.com/langcodestartup/NHRS/commit/81f458b32e72ab14401fb68011f65e4dfb0ab1ce) — kimgooneya — 2024-03-14 — PII 적용 완료 (#34) _(core REST commit?author=kimgooneya)_
  - [e5ad02404f24](https://github.com/langcodestartup/NHRS/commit/e5ad02404f246c4b99e9fc98615984cd6ef1dfaf) — kimgooneya — 2024-03-14 — 전체적 변경 (#33) _(core REST commit?author=kimgooneya)_
  - [6a1b227ea64c](https://github.com/langcodestartup/NHRS/commit/6a1b227ea64c5f360e85f4764f9becc5f65ed279) — kimgooneya — 2024-03-12 — 로그인 기능 수정 (#32) _(core REST commit?author=kimgooneya)_
  - [148a8d4d3a57](https://github.com/langcodestartup/NHRS/commit/148a8d4d3a574245107167797009252c5ebd417c) — kimgooneya — 2024-03-12 — 테스트 배포용 처리 _(core REST commit?author=kimgooneya)_
  - [0b02fb32468b](https://github.com/langcodestartup/NHRS/commit/0b02fb32468b4782c7c87225050f5cbb5ebdf8ff) — kimgooneya — 2024-03-12 — 배포용 git ignore 처리 _(core REST commit?author=kimgooneya)_
  - [68124748721f](https://github.com/langcodestartup/NHRS/commit/68124748721f68ec89609ce43406c3a9ef7a9ad1) — kimgooneya — 2024-03-12 — 데이터 업로드 기능 수정, DB 엔티티 수정 (#31) _(core REST commit?author=kimgooneya)_
  - [cb4391775895](https://github.com/langcodestartup/NHRS/commit/cb4391775895bf900968f3b938e19b09dc441f4c) — kimgooneya — 2024-03-10 — 프롬프트 테스트 기능 완료 (#30) _(core REST commit?author=kimgooneya)_
  - [06de0bb13d9f](https://github.com/langcodestartup/NHRS/commit/06de0bb13d9f0fc6b8a8b7dcc04646db7258edaf) — kimgooneya — 2024-03-10 — API 채팅 기능 완료 _(core REST commit?author=kimgooneya)_
  - [574bcfd7f762](https://github.com/langcodestartup/NHRS/commit/574bcfd7f76265932bc0734d8de7844481ef9081) — kimgooneya — 2024-03-09 — 삭제 항목들 미조회 (#28) _(core REST commit?author=kimgooneya)_
  - [8cb9bf484bb1](https://github.com/langcodestartup/NHRS/commit/8cb9bf484bb173770a0c80539bcd74c178ce9895) — kimgooneya — 2024-03-09 — 반려 기능 수정 완료 (#27) _(core REST commit?author=kimgooneya)_
  - [74d3b340208c](https://github.com/langcodestartup/NHRS/commit/74d3b340208c03a42230ddf2b14504e7ae7b8069) — kimgooneya — 2024-03-09 — 관리자 페이지에서 지식 저장소 편집 기능 완료 (#26) _(core REST commit?author=kimgooneya)_
  - [a08ea8088715](https://github.com/langcodestartup/NHRS/commit/a08ea808871506170c0d390ab65d6be31202ac5b) — kimgooneya — 2024-03-08 — 외부 직원 관리 페이지 사용자 편집시 오류 수정 (#25) _(core REST commit?author=kimgooneya)_
  - [d4826b0b2e57](https://github.com/langcodestartup/NHRS/commit/d4826b0b2e578da0252dfef31a7a4c4360deeaf1) — kimgooneya — 2024-03-08 — T 사번 관리 페이지 및 기능 추가 (#24) _(core REST commit?author=kimgooneya)_
  - [2539a35c82fc](https://github.com/langcodestartup/NHRS/commit/2539a35c82fcd8d04d74c6921d4ed4303b5f76c9) — kimgooneya — 2024-03-05 — 봇 페이지 기능 정리 (#23) _(core REST commit?author=kimgooneya)_
  - [9c06fae596c8](https://github.com/langcodestartup/NHRS/commit/9c06fae596c89276effa34adafed5e87cb1f3128) — kimgooneya — 2024-03-03 — 시스템 관리자 UI 미비점 적용 완료 (#22) _(core REST commit?author=kimgooneya)_
  - [1202a565ac77](https://github.com/langcodestartup/NHRS/commit/1202a565ac7760bf4e5017290766411097f52348) — kimgooneya — 2024-02-29 — 모니터링 서비스 기능 완료 (#21) _(core REST commit?author=kimgooneya)_
  - [757389037e9c](https://github.com/langcodestartup/NHRS/commit/757389037e9c79777286997bfd259661e74f22fa) — kimgooneya — 2024-02-29 — 배치 UI 및 기능 완료 (#20) _(core REST commit?author=kimgooneya)_
  - [6df8e9894b08](https://github.com/langcodestartup/NHRS/commit/6df8e9894b086cda831f90a22d2e5ac51b533837) — kimgooneya — 2024-02-28 — 관리 권한 기능 완료 (#19) _(core REST commit?author=kimgooneya)_
  - [b1978cbde6c2](https://github.com/langcodestartup/NHRS/commit/b1978cbde6c276fe1501f7dcb4f04370de47a730) — kimgooneya — 2024-02-27 — 설정 페이지 기능 2/4 (#18) _(core REST commit?author=kimgooneya)_
  - [82977fca385b](https://github.com/langcodestartup/NHRS/commit/82977fca385b17571878c5672e93549032db9a38) — kimgooneya — 2024-02-25 — 프롬프트 기본 기능 완료 (#17) _(core REST commit?author=kimgooneya)_
  - [0b3c5aafd35d](https://github.com/langcodestartup/NHRS/commit/0b3c5aafd35d1460b43ed094cce8d4e1601ac6e2) — kimgooneya — 2024-02-23 — 지식 저장소 업로드 삭제 기능 완료 (#16) _(core REST commit?author=kimgooneya)_
  - [1f36aad47682](https://github.com/langcodestartup/NHRS/commit/1f36aad476824a91813493687c54bb5975804f4d) — kimgooneya — 2024-02-22 — 데이터 구조 변경 및 지식 저장소 생성 승인 완료 (#15) _(core REST commit?author=kimgooneya)_
  - [f8069564c347](https://github.com/langcodestartup/NHRS/commit/f8069564c3470f29b540e301bc1566071d729f9f) — kimgooneya — 2024-02-20 — UI 반영 및 구조 변경 (#14) _(core REST commit?author=kimgooneya)_
  - [5e79fdb3911d](https://github.com/langcodestartup/NHRS/commit/5e79fdb3911d775faf0773ddc3f034572e1c8868) — kimgooneya — 2024-02-15 — 봇 생성 기능 완료 (승인 대상 등록, 참조 관계) (#10) _(core REST commit?author=kimgooneya)_
  - [6cd326270425](https://github.com/langcodestartup/NHRS/commit/6cd32627042598b7508ac54fa7b1467f6dac5673) — kimgooneya — 2024-01-14 — 최신 UI + 서비스 로직 (#5) _(core REST commit?author=kimgooneya)_
- Matching issue/PR records returned:
  - PR [#113 [EDIT] 구조 변경](https://github.com/langcodestartup/NHRS/pull/113) — login kimgooneya — opened 2024-06-28 — state closed — merged 2024-06-28 _(core REST)_
  - PR [#112 [EDIT] 채팅 이력 표시 항목 변경](https://github.com/langcodestartup/NHRS/pull/112) — login kimgooneya — opened 2024-06-03 — state closed — merged 2024-06-03 _(core REST)_
  - PR [#111 [FIX] TCB API 수정](https://github.com/langcodestartup/NHRS/pull/111) — login kimgooneya — opened 2024-05-31 — state closed — merged 2024-05-31 _(core REST)_
  - PR [#110 대시보드 표시 쿼리](https://github.com/langcodestartup/NHRS/pull/110) — login kimgooneya — opened 2024-05-30 — state closed — merged 2024-05-30 _(core REST)_
  - PR [#109 [FIX] 지식 저장소 동기화 시 클라우드 업로드 기능 수정](https://github.com/langcodestartup/NHRS/pull/109) — login kimgooneya — opened 2024-05-22 — state closed — merged 2024-05-22 _(core REST)_
  - PR [#108 스웨거 추가](https://github.com/langcodestartup/NHRS/pull/108) — login kimgooneya — opened 2024-05-22 — state closed — merged 2024-05-22 _(core REST)_
  - PR [#107 JWT 인증 기능 추가](https://github.com/langcodestartup/NHRS/pull/107) — login kimgooneya — opened 2024-05-21 — state closed — merged 2024-05-21 _(core REST)_
  - PR [#106 Swagger 추가](https://github.com/langcodestartup/NHRS/pull/106) — login kimgooneya — opened 2024-05-19 — state closed — merged 2024-05-19 _(core REST)_
  - PR [#105 시스템 관리 UI 개선](https://github.com/langcodestartup/NHRS/pull/105) — login kimgooneya — opened 2024-05-17 — state closed — merged 2024-05-17 _(core REST)_
  - PR [#102 [FEATURE] TCB 기능 완료](https://github.com/langcodestartup/NHRS/pull/102) — login kimgooneya — opened 2024-04-18 — state closed — merged 2024-04-18 _(core REST)_
  - PR [#101 관리자 페이지의 봇, 지식 저장소는 모두 조회 이용가능하도록 a tag 이용한 직접 접근 허용](https://github.com/langcodestartup/NHRS/pull/101) — login kimgooneya — opened 2024-04-18 — state closed — merged 2024-04-18 _(core REST)_
  - PR [#97 Fix 봇 권한 체크](https://github.com/langcodestartup/NHRS/pull/97) — login kimgooneya — opened 2024-04-03 — state closed — merged 2024-04-03 _(core REST)_
  - PR [#96 Fix 봇 사용자 권한 기능 전면 수정](https://github.com/langcodestartup/NHRS/pull/96) — login kimgooneya — opened 2024-04-03 — state closed — merged 2024-04-03 _(core REST)_
  - PR [#95 Feature 봇 설정 변경 페이지](https://github.com/langcodestartup/NHRS/pull/95) — login kimgooneya — opened 2024-04-02 — state closed — merged 2024-04-02 _(core REST)_
  - PR [#92 채팅 처리 변경](https://github.com/langcodestartup/NHRS/pull/92) — login kimgooneya — opened 2024-03-31 — state closed — merged 2024-03-31 _(core REST)_
  - PR [#91 봇 지식저장소 등록 삭제 기능 추가](https://github.com/langcodestartup/NHRS/pull/91) — login kimgooneya — opened 2024-03-31 — state closed — merged 2024-03-31 _(core REST)_
  - PR [#90 Fix 봇-지식저장소 연결 삭제](https://github.com/langcodestartup/NHRS/pull/90) — login kimgooneya — opened 2024-03-31 — state closed — merged 2024-03-31 _(core REST)_
  - PR [#89 문서 검색 기능 완료](https://github.com/langcodestartup/NHRS/pull/89) — login kimgooneya — opened 2024-03-30 — state closed — merged 2024-03-30 _(core REST)_
  - PR [#88 문서 정보 표시 오류 수정](https://github.com/langcodestartup/NHRS/pull/88) — login kimgooneya — opened 2024-03-30 — state closed — merged 2024-03-30 _(core REST)_
  - PR [#87 Fix 모니터링 항목 미출력 오류 수정](https://github.com/langcodestartup/NHRS/pull/87) — login kimgooneya — opened 2024-03-30 — state closed — merged 2024-03-30 _(core REST)_
  - PR [#86 LLM 선택은 항상 하나만 가능하도록 변경](https://github.com/langcodestartup/NHRS/pull/86) — login kimgooneya — opened 2024-03-30 — state closed — merged 2024-03-30 _(core REST)_
  - PR [#85 Fix 봇 생성 단계에서 프롬프트 지워지는 문제 수정](https://github.com/langcodestartup/NHRS/pull/85) — login kimgooneya — opened 2024-03-30 — state closed — merged 2024-03-30 _(core REST)_
  - PR [#84 Feature AI Prompt 기능 추가](https://github.com/langcodestartup/NHRS/pull/84) — login kimgooneya — opened 2024-03-30 — state closed — merged 2024-03-30 _(core REST)_
  - PR [#83 Fix 금지어 삭제 오류 수정](https://github.com/langcodestartup/NHRS/pull/83) — login kimgooneya — opened 2024-03-30 — state closed — merged 2024-03-30 _(core REST)_
  - PR [#82 Fix 봇 채팅 - 사용자 추가하기 에러](https://github.com/langcodestartup/NHRS/pull/82) — login kimgooneya — opened 2024-03-29 — state closed — merged 2024-03-29 _(core REST)_
  - PR [#81 외부 직원 페이지 네이션 오류 수정](https://github.com/langcodestartup/NHRS/pull/81) — login kimgooneya — opened 2024-03-29 — state closed — merged 2024-03-29 _(core REST)_
  - PR [#80 Fix 봇 사용자 수정 로직 수정](https://github.com/langcodestartup/NHRS/pull/80) — login kimgooneya — opened 2024-03-29 — state closed — merged 2024-03-29 _(core REST)_
  - PR [#79 Fix 본인이 만든 지식저장소는 봇 연결과 별개로 조회하도록 수정](https://github.com/langcodestartup/NHRS/pull/79) — login kimgooneya — opened 2024-03-29 — state closed — merged 2024-03-29 _(core REST)_
  - PR [#78 Fix 외부직원 저장 오류 수정 및 표시 내용 수정](https://github.com/langcodestartup/NHRS/pull/78) — login kimgooneya — opened 2024-03-29 — state closed — merged 2024-03-29 _(core REST)_
  - PR [#77 Fix 봇 수정 페이지 선택 오류 수정](https://github.com/langcodestartup/NHRS/pull/77) — login kimgooneya — opened 2024-03-29 — state closed — merged 2024-03-29 _(core REST)_
  - PR [#76 Fix 봇 중목 이름 체크 로직 수정](https://github.com/langcodestartup/NHRS/pull/76) — login kimgooneya — opened 2024-03-29 — state closed — merged 2024-03-29 _(core REST)_
  - PR [#75 검색 필터 조건 변경](https://github.com/langcodestartup/NHRS/pull/75) — login kimgooneya — opened 2024-03-29 — state closed — merged 2024-03-29 _(core REST)_
  - PR [#74 프롬프트 수정 오류 처리](https://github.com/langcodestartup/NHRS/pull/74) — login kimgooneya — opened 2024-03-29 — state closed — merged 2024-03-29 _(core REST)_
  - PR [#73 금지어 문제 수정](https://github.com/langcodestartup/NHRS/pull/73) — login kimgooneya — opened 2024-03-29 — state closed — merged 2024-03-29 _(core REST)_
  - PR [#72 네비게이션 항목 수정](https://github.com/langcodestartup/NHRS/pull/72) — login kimgooneya — opened 2024-03-28 — state closed — merged 2024-03-28 _(core REST)_
  - PR [#71 모니터링 오류 수정](https://github.com/langcodestartup/NHRS/pull/71) — login kimgooneya — opened 2024-03-28 — state closed — merged 2024-03-28 _(core REST)_
  - PR [#70 사용자 권한 편집 기능 수정 및 UI 수정](https://github.com/langcodestartup/NHRS/pull/70) — login kimgooneya — opened 2024-03-28 — state closed — merged 2024-03-28 _(core REST)_
  - PR [#69 봇 유저 관계 페이지 오류 수정](https://github.com/langcodestartup/NHRS/pull/69) — login kimgooneya — opened 2024-03-28 — state closed — merged 2024-03-28 _(core REST)_
  - PR [#68 피드백 기능 완료](https://github.com/langcodestartup/NHRS/pull/68) — login kimgooneya — opened 2024-03-28 — state closed — merged 2024-03-28 _(core REST)_
  - PR [#67 챗 문제 해결, 피드백 등록](https://github.com/langcodestartup/NHRS/pull/67) — login kimgooneya — opened 2024-03-28 — state closed — merged 2024-03-28 _(core REST)_
  - PR [#66 피드백 기능 완료](https://github.com/langcodestartup/NHRS/pull/66) — login kimgooneya — opened 2024-03-27 — state closed — merged 2024-03-27 _(core REST)_
  - PR [#65 새로운 외부 직원 추가기능 완료](https://github.com/langcodestartup/NHRS/pull/65) — login kimgooneya — opened 2024-03-27 — state closed — merged 2024-03-27 _(core REST)_
  - PR [#64 모니터링 로그 기능 정상화](https://github.com/langcodestartup/NHRS/pull/64) — login kimgooneya — opened 2024-03-27 — state closed — merged 2024-03-27 _(core REST)_
  - PR [#63 chat message color 수정](https://github.com/langcodestartup/NHRS/pull/63) — login kimgooneya — opened 2024-03-27 — state closed — merged 2024-03-27 _(core REST)_
  - PR [#62 결재자 id 조회 조건 추가](https://github.com/langcodestartup/NHRS/pull/62) — login kimgooneya — opened 2024-03-27 — state closed — merged 2024-03-27 _(core REST)_
  - PR [#61 결재자 선택시 시스템 관리자만 선택하는 경우는 안되도록 메세지 처리](https://github.com/langcodestartup/NHRS/pull/61) — login kimgooneya — opened 2024-03-27 — state closed — merged 2024-03-27 _(core REST)_
  - PR [#60 순서 정렬 수정, 봇 수정 시 에러페이지 수정, 봇 이름 체크 로직 수정](https://github.com/langcodestartup/NHRS/pull/60) — login kimgooneya — opened 2024-03-27 — state closed — merged 2024-03-27 _(core REST)_
  - PR [#59 첫페이지 에러 문제 해결](https://github.com/langcodestartup/NHRS/pull/59) — login kimgooneya — opened 2024-03-27 — state closed — merged 2024-03-27 _(core REST)_
  - PR [#58 봇 사용자 권한 변경 수정](https://github.com/langcodestartup/NHRS/pull/58) — login kimgooneya — opened 2024-03-26 — state closed — merged 2024-03-26 _(core REST)_
  - PR [#56 결재 이력 조회 조건 수정](https://github.com/langcodestartup/NHRS/pull/56) — login kimgooneya — opened 2024-03-26 — state closed — merged 2024-03-26 _(core REST)_
  - PR [#55 지식저장소 경로 미입력시 오류 표시](https://github.com/langcodestartup/NHRS/pull/55) — login kimgooneya — opened 2024-03-26 — state closed — merged 2024-03-26 _(core REST)_
  - PR [#54 지식 베이스 검색기능 수정](https://github.com/langcodestartup/NHRS/pull/54) — login kimgooneya — opened 2024-03-25 — state closed — merged 2024-03-25 _(core REST)_
  - PR [#53 결재 승인 조건 추가](https://github.com/langcodestartup/NHRS/pull/53) — login kimgooneya — opened 2024-03-25 — state closed — merged 2024-03-25 _(core REST)_
  - PR [#52 필터 변경 조건 및 설정 수정](https://github.com/langcodestartup/NHRS/pull/52) — login kimgooneya — opened 2024-03-25 — state closed — merged 2024-03-25 _(core REST)_
  - PR [#51 JWT 변경](https://github.com/langcodestartup/NHRS/pull/51) — login kimgooneya — opened 2024-03-25 — state closed — merged 2024-03-25 _(core REST)_
  - PR [#50 외부 사용자 삭제 기능 수정](https://github.com/langcodestartup/NHRS/pull/50) — login kimgooneya — opened 2024-03-25 — state closed — merged 2024-03-25 _(core REST)_
  - PR [#49 로그, 금지어 검출 기능 추가](https://github.com/langcodestartup/NHRS/pull/49) — login kimgooneya — opened 2024-03-24 — state closed — merged 2024-03-24 _(core REST)_
  - PR [#48 파일 업로드 UI 수정](https://github.com/langcodestartup/NHRS/pull/48) — login kimgooneya — opened 2024-03-24 — state closed — merged 2024-03-24 _(core REST)_
  - PR [#47 첫 생성시 봇 이름 체크](https://github.com/langcodestartup/NHRS/pull/47) — login kimgooneya — opened 2024-03-23 — state closed — merged 2024-03-23 _(core REST)_
  - PR [#46 승인/반려 항목 완료 후 버튼 및 입력 비활성화 표시](https://github.com/langcodestartup/NHRS/pull/46) — login kimgooneya — opened 2024-03-23 — state closed — merged 2024-03-23 _(core REST)_
  - PR [#45 프롬프트 수정 시 문제 사항 조치 완료](https://github.com/langcodestartup/NHRS/pull/45) — login kimgooneya — opened 2024-03-23 — state closed — merged 2024-03-23 _(core REST)_
  - PR [#44 스트리밍 기능 구현](https://github.com/langcodestartup/NHRS/pull/44) — login kimgooneya — opened 2024-03-21 — state closed — merged 2024-03-21 _(core REST)_
  - PR [#43 결재 승인 UI, 프로세스 로직 수정](https://github.com/langcodestartup/NHRS/pull/43) — login kimgooneya — opened 2024-03-21 — state closed — merged 2024-03-21 _(core REST)_
  - PR [#42 PDF 표시 되도록 수정](https://github.com/langcodestartup/NHRS/pull/42) — login kimgooneya — opened 2024-03-20 — state closed — merged 2024-03-20 _(core REST)_
  - PR [#41 지식 저장소 안바뀌는 문제 수정 - 렌더링 순서 문제](https://github.com/langcodestartup/NHRS/pull/41) — login kimgooneya — opened 2024-03-19 — state closed — merged 2024-03-19 _(core REST)_
  - PR [#40 애져 연결 테스트 추가](https://github.com/langcodestartup/NHRS/pull/40) — login kimgooneya — opened 2024-03-19 — state closed — merged 2024-03-19 _(core REST)_
  - PR [#39 업로드 로직 수정](https://github.com/langcodestartup/NHRS/pull/39) — login kimgooneya — opened 2024-03-19 — state closed — merged 2024-03-19 _(core REST)_
  - PR [#38 PII 기능 추가](https://github.com/langcodestartup/NHRS/pull/38) — login kimgooneya — opened 2024-03-19 — state closed — merged 2024-03-19 _(core REST)_
  - PR [#37 승인 완료 후 항목 변경 프로세스 완료](https://github.com/langcodestartup/NHRS/pull/37) — login kimgooneya — opened 2024-03-18 — state closed — merged 2024-03-18 _(core REST)_
  - PR [#36 승인 오류 메세지 출력](https://github.com/langcodestartup/NHRS/pull/36) — login kimgooneya — opened 2024-03-14 — state closed — merged 2024-03-14 _(core REST)_
  - PR [#35 로그아웃 기능 완료](https://github.com/langcodestartup/NHRS/pull/35) — login kimgooneya — opened 2024-03-14 — state closed — merged 2024-03-14 _(core REST)_
  - PR [#34 PII 적용 완료](https://github.com/langcodestartup/NHRS/pull/34) — login kimgooneya — opened 2024-03-14 — state closed — merged 2024-03-14 _(core REST)_
  - PR [#33 전체적 변경](https://github.com/langcodestartup/NHRS/pull/33) — login kimgooneya — opened 2024-03-14 — state closed — merged 2024-03-14 _(core REST)_
  - PR [#32 로그인 기능 수정](https://github.com/langcodestartup/NHRS/pull/32) — login kimgooneya — opened 2024-03-12 — state closed — merged 2024-03-12 _(core REST)_
  - PR [#31 데이터 업로드 기능 수정, DB 엔티티 수정](https://github.com/langcodestartup/NHRS/pull/31) — login kimgooneya — opened 2024-03-12 — state closed — merged 2024-03-12 _(core REST)_
  - PR [#30 프롬프트 테스트 기능 완료](https://github.com/langcodestartup/NHRS/pull/30) — login kimgooneya — opened 2024-03-10 — state closed — merged 2024-03-10 _(core REST)_
  - PR [#29 API 채팅 가능](https://github.com/langcodestartup/NHRS/pull/29) — login kimgooneya — opened 2024-03-10 — state closed — merged 2024-03-10 _(core REST)_
  - PR [#28 삭제 항목들 미조회](https://github.com/langcodestartup/NHRS/pull/28) — login kimgooneya — opened 2024-03-09 — state closed — merged 2024-03-09 _(core REST)_
  - PR [#27 반려 기능 수정 완료](https://github.com/langcodestartup/NHRS/pull/27) — login kimgooneya — opened 2024-03-09 — state closed — merged 2024-03-09 _(core REST)_
  - PR [#26 관리자 페이지에서 지식 저장소 편집 기능 완료](https://github.com/langcodestartup/NHRS/pull/26) — login kimgooneya — opened 2024-03-09 — state closed — merged 2024-03-09 _(core REST)_
  - PR [#25 외부 직원 관리 페이지 사용자 편집시 오류 수정](https://github.com/langcodestartup/NHRS/pull/25) — login kimgooneya — opened 2024-03-08 — state closed — merged 2024-03-08 _(core REST)_
  - PR [#24 T 사번 관리 페이지 및 기능 추가](https://github.com/langcodestartup/NHRS/pull/24) — login kimgooneya — opened 2024-03-08 — state closed — merged 2024-03-08 _(core REST)_
  - PR [#23 봇 페이지 기능 정리](https://github.com/langcodestartup/NHRS/pull/23) — login kimgooneya — opened 2024-03-05 — state closed — merged 2024-03-05 _(core REST)_
  - PR [#22 시스템 관리자 UI 미비점 적용 완료](https://github.com/langcodestartup/NHRS/pull/22) — login kimgooneya — opened 2024-03-03 — state closed — merged 2024-03-03 _(core REST)_
  - PR [#21 모니터링 서비스 기능 완료](https://github.com/langcodestartup/NHRS/pull/21) — login kimgooneya — opened 2024-02-29 — state closed — merged 2024-02-29 _(core REST)_
  - PR [#20 배치 UI 및 기능 완료](https://github.com/langcodestartup/NHRS/pull/20) — login kimgooneya — opened 2024-02-29 — state closed — merged 2024-02-29 _(core REST)_
  - PR [#19 관리 권한 기능 완료](https://github.com/langcodestartup/NHRS/pull/19) — login kimgooneya — opened 2024-02-28 — state closed — merged 2024-02-28 _(core REST)_
  - PR [#18 설정 페이지 기능 2/4](https://github.com/langcodestartup/NHRS/pull/18) — login kimgooneya — opened 2024-02-27 — state closed — merged 2024-02-27 _(core REST)_
  - PR [#17 프롬프트 기본 기능 완료](https://github.com/langcodestartup/NHRS/pull/17) — login kimgooneya — opened 2024-02-25 — state closed — merged 2024-02-25 _(core REST)_
  - PR [#16 지식 저장소 업로드 삭제 기능 완료](https://github.com/langcodestartup/NHRS/pull/16) — login kimgooneya — opened 2024-02-23 — state closed — merged 2024-02-23 _(core REST)_
  - PR [#15 데이터 구조 변경 및 지식 저장소 생성 승인 완료](https://github.com/langcodestartup/NHRS/pull/15) — login kimgooneya — opened 2024-02-22 — state closed — merged 2024-02-22 _(core REST)_
  - PR [#14 UI 반영 및 구조 변경](https://github.com/langcodestartup/NHRS/pull/14) — login kimgooneya — opened 2024-02-20 — state closed — merged 2024-02-20 _(core REST)_
  - PR [#13 UI 업데이트 데이터 구조 변경](https://github.com/langcodestartup/NHRS/pull/13) — login kimgooneya — opened 2024-02-20 — state closed _(core REST)_
  - PR [#12 Knowledge 기능 추가](https://github.com/langcodestartup/NHRS/pull/12) — login kimgooneya — opened 2024-02-19 — state closed _(core REST)_
  - PR [#10 봇 생성 기능 완료 ](https://github.com/langcodestartup/NHRS/pull/10) — login kimgooneya — opened 2024-02-15 — state closed — merged 2024-02-15 _(core REST)_
  - PR [#5 최신 UI + 서비스 로직 반영](https://github.com/langcodestartup/NHRS/pull/5) — login kimgooneya — opened 2024-01-14 — state closed — merged 2024-01-14 _(core REST)_

## Kicox

- Repository: [langcodestartup/Kicox](https://github.com/langcodestartup/Kicox)
- Default branch: `master`; visibility: private; archived: no
- Branch inventory observed: 79 branch(es)
  - `CarbonComponent/CarbonTableLabelElement` (a6ea29f68dfa), `CarbonComponent/CleanCodeRenderer` (2c52d3a0536c), `CarbonComponent/DeleteLeftPanel` (b89163e471f5), `CarbonComponent/InlineLoading` (71119dadaa2d), `CarbonComponent/LabelElement` (59b85769fad9), `CarbonComponent/Loading` (ebd1c96d7996), `CarbonComponent/Slider` (2c048f400d50), `CarbonComponent/Tabs` (95e7054466b6), `CarbonComponent/Tag` (eb7cd2435a47), `CarbonComponent/actionType` (4864d1fe9dca), `CarbonComponent/headerbase` (9bd51e45dcab), `Component/QuickGrid` (cf871e0608b9), `Component/QuickGridExpandable` (b28a21076325), `Component/QuickGridTest2` (ddf271eb1c63), `Core` (958d47a3ffbb), `Ground/Carbon_v11` (fc6e1f64cf65), `Ground/Chat` (672d6b957cff), `Ground/IntoRenderer` (9ffc3b7372f1), `OldCore` (8845fb8846f4), `active/cxp-app` (3fc45949cab3), …
- Search query state: **PARTIAL / one or more query errors**; successful result sets: 4
- Matching commit records returned:
  - [d4d58560491c](https://github.com/langcodestartup/Kicox/commit/d4d58560491cb6e16ec777a9d8e9581e6d477483) — kimgooneya — 2022-11-15 — Netmarble master branch set (#45) _(core REST commit?author=kimgooneya)_

## KtSCM

- Repository: [langcodestartup/KtSCM](https://github.com/langcodestartup/KtSCM)
- Default branch: `master`; visibility: private; archived: no
- Branch inventory observed: 3 branch(es)
  - `Kt/SCM/core` (711e3d76d5db), `Kt/SCM/working/work-on-feedback` (3cd2a5d88150), `master` (d4d58560491c)
- Search query state: **PARTIAL / one or more query errors**; successful result sets: 4
- Matching commit records returned:
  - [d4d58560491c](https://github.com/langcodestartup/KtSCM/commit/d4d58560491cb6e16ec777a9d8e9581e6d477483) — kimgooneya — 2022-11-15 — Netmarble master branch set (#45) _(core REST commit?author=kimgooneya)_

## KtSCMpoc

- Repository: [langcodestartup/KtSCMpoc](https://github.com/langcodestartup/KtSCMpoc)
- Default branch: `master`; visibility: private; archived: no
- Branch inventory observed: 76 branch(es)
  - `CarbonComponent/CarbonTableLabelElement` (a6ea29f68dfa), `CarbonComponent/CleanCodeRenderer` (2c52d3a0536c), `CarbonComponent/DeleteLeftPanel` (b89163e471f5), `CarbonComponent/InlineLoading` (71119dadaa2d), `CarbonComponent/LabelElement` (59b85769fad9), `CarbonComponent/Loading` (ebd1c96d7996), `CarbonComponent/Slider` (2c048f400d50), `CarbonComponent/Tabs` (95e7054466b6), `CarbonComponent/Tag` (eb7cd2435a47), `CarbonComponent/actionType` (4864d1fe9dca), `CarbonComponent/headerbase` (9bd51e45dcab), `Core` (958d47a3ffbb), `Ground/Carbon_v11` (fc6e1f64cf65), `Ground/Chat` (672d6b957cff), `Ground/IntoRenderer` (9ffc3b7372f1), `OldCore` (8845fb8846f4), `active/cxp-app` (28b7d8704724), `demo/ahn` (8c0a43028ba6), `demo/chanel-202203` (84f83dfc8056), `demo/gpt` (0df6c9226ac6), …
- Search query state: **PARTIAL / one or more query errors**; successful result sets: 4
- Matching commit records returned:
  - [d4d58560491c](https://github.com/langcodestartup/KtSCMpoc/commit/d4d58560491cb6e16ec777a9d8e9581e6d477483) — kimgooneya — 2022-11-15 — Netmarble master branch set (#45) _(core REST commit?author=kimgooneya)_

## Nhtest

- Repository: [langcodestartup/Nhtest](https://github.com/langcodestartup/Nhtest)
- Default branch: `master`; visibility: private; archived: no
- Branch inventory observed: 47 branch(es)
  - `CarbonComponent/CarbonTableLabelElement` (a6ea29f68dfa), `CarbonComponent/CleanCodeRenderer` (2c52d3a0536c), `CarbonComponent/DeleteLeftPanel` (b89163e471f5), `CarbonComponent/InlineLoading` (71119dadaa2d), `CarbonComponent/LabelElement` (59b85769fad9), `CarbonComponent/Loading` (ebd1c96d7996), `CarbonComponent/Slider` (2c048f400d50), `CarbonComponent/Tabs` (95e7054466b6), `CarbonComponent/Tag` (eb7cd2435a47), `CarbonComponent/actionType` (4864d1fe9dca), `CarbonComponent/headerbase` (9bd51e45dcab), `Component/QuickGrid` (cf871e0608b9), `Component/QuickGridExpandable` (b28a21076325), `Component/QuickGridTest2` (ddf271eb1c63), `Core` (958d47a3ffbb), `Ground/Carbon_v11` (fc6e1f64cf65), `Ground/Chat` (672d6b957cff), `Ground/IntoRenderer` (9ffc3b7372f1), `OldCore` (8845fb8846f4), `active/cxp-app` (3fc45949cab3), …
- Search query state: **PARTIAL / one or more query errors**; successful result sets: 4
- Matching commit records returned:
  - [d4d58560491c](https://github.com/langcodestartup/Nhtest/commit/d4d58560491cb6e16ec777a9d8e9581e6d477483) — kimgooneya — 2022-11-15 — Netmarble master branch set (#45) _(core REST commit?author=kimgooneya)_

## KotraCXP

- Repository: [langcodestartup/KotraCXP](https://github.com/langcodestartup/KotraCXP)
- Default branch: `master`; visibility: private; archived: no
- Branch inventory observed: 7 branch(es)
  - `dev` (af12c4a07db5), `master` (73d0c74fc4d4), `v1/dev` (597f8cbd7819), `v1/master` (d4d58560491c), `v2/main` (2735fc026458), `v2/opensearch` (461008d9623c), `v2/searchwithpipeline` (5288f83fec06)
- Search query state: **PARTIAL / one or more query errors**; successful result sets: 4
- Matching commit records returned:
  - [b561d8974dee](https://github.com/langcodestartup/KotraCXP/commit/b561d8974deefd082365fcf9e773c2f022f73f04) — kimgooneya — 2023-08-17 — KnowlegeBase Factory 추가 _(core REST commit?author=kimgooneya)_
  - [8de14f06cad7](https://github.com/langcodestartup/KotraCXP/commit/8de14f06cad7e269e69054a72d1b9ca481a6c8bd) — kimgooneya — 2023-08-17 — DI 추가 _(core REST commit?author=kimgooneya)_
  - [93ba6d96e9dd](https://github.com/langcodestartup/KotraCXP/commit/93ba6d96e9dd5679ba5233a818f64b3d587046e2) — kimgooneya — 2023-08-17 — Nuget Package 추가 _(core REST commit?author=kimgooneya)_
  - [d4a88ff5dff8](https://github.com/langcodestartup/KotraCXP/commit/d4a88ff5dff8cc5c29a60ebcc093141976ef1a03) — kimgooneya — 2023-08-17 — Form Recognizer 서비스 추가 _(core REST commit?author=kimgooneya)_
  - [c7cd8672b4e3](https://github.com/langcodestartup/KotraCXP/commit/c7cd8672b4e370dd9fc3cf46b82850c64b7cf4b1) — kimgooneya — 2022-07-28 — common model, field, type 수정 (#20) _(core REST commit?author=kimgooneya)_

## KoreaSevenV2

- Repository: [langcodestartup/KoreaSevenV2](https://github.com/langcodestartup/KoreaSevenV2)
- Default branch: `master`; visibility: private; archived: no
- Branch inventory observed: 72 branch(es)
  - `CarbonComponent/CarbonTableLabelElement` (a6ea29f68dfa), `CarbonComponent/CleanCodeRenderer` (2c52d3a0536c), `CarbonComponent/DeleteLeftPanel` (b89163e471f5), `CarbonComponent/InlineLoading` (71119dadaa2d), `CarbonComponent/LabelElement` (59b85769fad9), `CarbonComponent/Loading` (ebd1c96d7996), `CarbonComponent/Slider` (2c048f400d50), `CarbonComponent/Tabs` (95e7054466b6), `CarbonComponent/Tag` (eb7cd2435a47), `CarbonComponent/actionType` (4864d1fe9dca), `CarbonComponent/headerbase` (9bd51e45dcab), `Component/QuickGrid` (cf871e0608b9), `Component/QuickGridExpandable` (b28a21076325), `Component/QuickGridTest2` (ddf271eb1c63), `Core` (958d47a3ffbb), `Ground/Carbon_v11` (fc6e1f64cf65), `Ground/Chat` (672d6b957cff), `Ground/IntoRenderer` (9ffc3b7372f1), `OldCore` (8845fb8846f4), `active/cxp-app` (3fc45949cab3), …
- Search query state: **PARTIAL / one or more query errors**; successful result sets: 4
- Matching commit records returned:
  - [d4d58560491c](https://github.com/langcodestartup/KoreaSevenV2/commit/d4d58560491cb6e16ec777a9d8e9581e6d477483) — kimgooneya — 2022-11-15 — Netmarble master branch set (#45) _(core REST commit?author=kimgooneya)_

## Langcode.CXP.V2

- Repository: [langcodestartup/Langcode.CXP.V2](https://github.com/langcodestartup/Langcode.CXP.V2)
- Default branch: `master`; visibility: private; archived: no
- Branch inventory observed: 51 branch(es)
  - `dev` (9569e110d23e), `kkw/prompttest` (1e0c5c0a7793), `master` (df61d2a4ae75), `test/multi-agent` (0be04e7d27df), `ur/inviteuser` (84a46a3fdf12), `v2.3/KT` (e82c7c5c0ce9), `v2.3/bug/authErr` (7e825608d88b), `v2.3/deepseek` (9406a195b91d), `v2.3/demo/english/eugenus` (9cc6f36a8c31), `v2.3/demo/english/inditex-2` (1114ef1d4c5c), `v2.3/demo/english/main` (3de8b18e0eb3), `v2.3/demo/healthchk` (4b49f16e9c1f), `v2.3/demo/ir/main` (2016752674ad), `v2.3/demo/korean/gvally` (c4cbd850591d), `v2.3/demo/korean/kakaobank` (fb7aadc30d33), `v2.3/demo/korean/kblife` (156618192f38), `v2.3/demo/korean/kotra-paris` (a5ae9e84c601), `v2.3/demo/korean/next-rise` (2a2600a1cdca), `v2.3/demo/korean/riotgames` (6fecf3b1e71c), `v2.3/demo/korean/uplus` (2ed15ae19102), …
- Search query state: **PARTIAL / one or more query errors**; successful result sets: 4
- Matching issue/PR records returned:
  - PR [#157 Revert 1 work/sfr 003](https://github.com/langcodestartup/Langcode.CXP.V2/pull/157) — login kimgooneya — opened 2024-10-29 — state closed _(core REST)_

## PairWork

- Repository: [langcodestartup/PairWork](https://github.com/langcodestartup/PairWork)
- Default branch: `master`; visibility: private; archived: no
- Branch inventory observed: 1 branch(es)
  - `master` (b3b44a02a702)
- Search query state: **PARTIAL / one or more query errors**; successful result sets: 4
- Contribution evidence in current pass: **No matching authored commits, PRs, or issues returned by paginated core REST; reviewer/comment activity remains UNKNOWN because Search was rate-limited**.

## Langcode.CXP.V2.Viva

- Repository: [langcodestartup/Langcode.CXP.V2.Viva](https://github.com/langcodestartup/Langcode.CXP.V2.Viva)
- Default branch: `master`; visibility: private; archived: no
- Branch inventory observed: 1 branch(es)
  - `master` (da82b6d7e1b3)
- Search query state: **PARTIAL / one or more query errors**; successful result sets: 4
- Contribution evidence in current pass: **No matching authored commits, PRs, or issues returned by paginated core REST; reviewer/comment activity remains UNKNOWN because Search was rate-limited**.

## NHBank_Chat

- Repository: [langcodestartup/NHBank_Chat](https://github.com/langcodestartup/NHBank_Chat)
- Default branch: `master`; visibility: private; archived: no
- Branch inventory observed: 12 branch(es)
  - `NHBank_Chat/working/KSH` (f476a24e7d3d), `dev` (e251f6b113e8), `master` (da82b6d7e1b3), `v2.3/JiraIntegration` (2dc47af0d500), `v2.3/blobname` (19f6bc234242), `v2.3/jiratest` (2f19f040db8c), `v2.3/localization` (992191fc6c34), `v2.3/main` (19f6bc234242), `v2.3/multiLLM` (0c0952ec653c), `v2.3/role` (f445478c8f57), `v2.3/telemetry` (ee323825e180), `v2.3/viva-tech` (b16504d37a84)
- Search query state: **PARTIAL / one or more query errors**; successful result sets: 4
- Contribution evidence in current pass: **No matching authored commits, PRs, or issues returned by paginated core REST; reviewer/comment activity remains UNKNOWN because Search was rate-limited**.

## Langcode.Teaser

- Repository: [langcodestartup/Langcode.Teaser](https://github.com/langcodestartup/Langcode.Teaser)
- Default branch: `master`; visibility: private; archived: no
- Branch inventory observed: 1 branch(es)
  - `master` (6147dca968bb)
- Search query state: **PARTIAL / one or more query errors**; successful result sets: 4
- Contribution evidence in current pass: **No matching authored commits, PRs, or issues returned by paginated core REST; reviewer/comment activity remains UNKNOWN because Search was rate-limited**.

## IntegrationFunction

- Repository: [langcodestartup/IntegrationFunction](https://github.com/langcodestartup/IntegrationFunction)
- Default branch: `master`; visibility: private; archived: no
- Branch inventory observed: 5 branch(es)
  - `feature/jira` (cb5dd07c4d90), `feature/main` (5e220ceee374), `feature/notion-2` (7ea079380929), `feature/outlook` (676dd82ac2c5), `master` (00e9da4a3e4f)
- Search query state: **PARTIAL / one or more query errors**; successful result sets: 4
- Contribution evidence in current pass: **No matching authored commits, PRs, or issues returned by paginated core REST; reviewer/comment activity remains UNKNOWN because Search was rate-limited**.

## PollyExamples

- Repository: [langcodestartup/PollyExamples](https://github.com/langcodestartup/PollyExamples)
- Default branch: `master`; visibility: private; archived: no
- Branch inventory observed: 1 branch(es)
  - `master` (cf72c529d4dd)
- Search query state: **PARTIAL / one or more query errors**; successful result sets: 4
- Matching commit records returned:
  - [cf72c529d4dd](https://github.com/langcodestartup/PollyExamples/commit/cf72c529d4dde6790c53cb119681dfcbac739107) — kimgooneya — 2024-06-10 — 동작 수행 확인 완료 _(core REST commit?author=kimgooneya)_
  - [791958034789](https://github.com/langcodestartup/PollyExamples/commit/79195803478955db87fc7757dbb1e6a5b74a07ce) — kimgooneya — 2024-06-05 — Add project files. _(core REST commit?author=kimgooneya)_
  - [64c263c7b977](https://github.com/langcodestartup/PollyExamples/commit/64c263c7b9778a1298050d630463fa486da84eab) — kimgooneya — 2024-06-05 — Add .gitattributes and .gitignore. _(core REST commit?author=kimgooneya)_

## Langcode.CXP.Publishing

- Repository: [langcodestartup/Langcode.CXP.Publishing](https://github.com/langcodestartup/Langcode.CXP.Publishing)
- Default branch: `main`; visibility: private; archived: no
- Branch inventory observed: 2 branch(es)
  - `main` (846d14ecb3a9), `new` (f8b105b09313)
- Search query state: **PARTIAL / one or more query errors**; successful result sets: 4
- Contribution evidence in current pass: **No matching authored commits, PRs, or issues returned by paginated core REST; reviewer/comment activity remains UNKNOWN because Search was rate-limited**.

## PremierPartnersPoC

- Repository: [langcodestartup/PremierPartnersPoC](https://github.com/langcodestartup/PremierPartnersPoC)
- Default branch: `master`; visibility: private; archived: no
- Branch inventory observed: 76 branch(es)
  - `dev` (6dfe6aff31c1), `master` (da82b6d7e1b3), `pp/cfd-card` (5b63c3b1eeaa), `pp/dev/kkw` (5ad27c174470), `pp/dev/retrySearch` (87a7160a8e7e), `pp/main` (1237a984c3fc), `pp/plan-service` (4e3ccd681ee6), `pp/refac-hyk` (058321fde974), `pp/source-documents` (16be888c2038), `pp/work/add-refer-CFD` (6c19ef7c5ed8), `pp/work/fix-makeragtask-prompt` (ad63db3a511a), `pp/work/step-seven` (28cdc9e8686b), `pp/work/target` (25e95b2f7b8b), `pp/working/CFD` (445c9bfccc41), `pp/working/converttoquarter` (e1786fa4daee), `pp/working/feedback` (ff477445b4fe), `pp/working/kkw-0812` (7b030bb0569e), `pp/working/mjkim-0810` (5f3bffd2e6fc), `pp/working/postvalue` (ec8e95492784), `pp/working/postvalueprevalue` (e6f7a8834319), …
- Search query state: **PARTIAL / one or more query errors**; successful result sets: 4
- Contribution evidence in current pass: **No matching authored commits, PRs, or issues returned by paginated core REST; reviewer/comment activity remains UNKNOWN because Search was rate-limited**.

## PoscoDX

- Repository: [langcodestartup/PoscoDX](https://github.com/langcodestartup/PoscoDX)
- Default branch: `master`; visibility: private; archived: no
- Branch inventory observed: 31 branch(es)
  - `dev` (f78acd952813), `master` (da82b6d7e1b3), `v2.3/demo/airforce/main` (76e125549ace), `v2.3/demo/ir/main` (2016752674ad), `v2.3/demo/langcode/main` (2564c18ca47c), `v2.3/demo/one-eleven/main` (97360fe3ae0a), `v2.3/demo/poscodx/demo-test` (0d624422511a), `v2.3/demo/poscodx/main` (7b696587ed8e), `v2.3/demo/poscodx/test` (0d624422511a), `v2.3/demo/shinwon/main` (d01e5dccd196), `v2.3/demo/sk-band/main` (a5a4137afc99), `v2.3/demo/uplus/main` (f61957ffd44f), `v2.3/demo/uplus/main-test` (1d182736eb11), `v2.3/demo/viva/main` (7c3b21e7cc48), `v2.3/integration/outlook` (a279736435bc), `v2.3/integration/slack` (f4626dabd039), `v2.3/isjoo-samsungtest` (34960feb10d4), `v2.3/localization` (992191fc6c34), `v2.3/main` (2fab209caf00), `v2.3/new-publishing` (81bf6e98eb16), …
- Search query state: **PARTIAL / one or more query errors**; successful result sets: 4
- Contribution evidence in current pass: **No matching authored commits, PRs, or issues returned by paginated core REST; reviewer/comment activity remains UNKNOWN because Search was rate-limited**.

## Landing.CXP.Personal

- Repository: [langcodestartup/Landing.CXP.Personal](https://github.com/langcodestartup/Landing.CXP.Personal)
- Default branch: `master`; visibility: private; archived: no
- Branch inventory observed: 6 branch(es)
  - `deploy` (5cb90d0292b0), `dev` (4e83938e5980), `localization-middleware` (7695cfcb27ed), `master` (35b9e33d9596), `mhhan` (e08e152b691f), `yjkang` (dcf11cf3d0d0)
- Search query state: **PARTIAL / one or more query errors**; successful result sets: 4
- Contribution evidence in current pass: **No matching authored commits, PRs, or issues returned by paginated core REST; reviewer/comment activity remains UNKNOWN because Search was rate-limited**.

## KT.V2

- Repository: [langcodestartup/KT.V2](https://github.com/langcodestartup/KT.V2)
- Default branch: `master`; visibility: private; archived: no
- Branch inventory observed: 4 branch(es)
  - `KT/core` (e82c7c5c0ce9), `dev` (f78acd952813), `master` (da82b6d7e1b3), `v2.3/main` (51f49b83b14a)
- Search query state: **PARTIAL / one or more query errors**; successful result sets: 4
- Contribution evidence in current pass: **No matching authored commits, PRs, or issues returned by paginated core REST; reviewer/comment activity remains UNKNOWN because Search was rate-limited**.

## NHAML.V2

- Repository: [langcodestartup/NHAML.V2](https://github.com/langcodestartup/NHAML.V2)
- Default branch: `master`; visibility: private; archived: no
- Branch inventory observed: 6 branch(es)
  - `dev` (f78acd952813), `master` (da82b6d7e1b3), `nh-aml/FDS/main` (7eb58ddf8b48), `nh-aml/main` (66ef8ba3ae38), `v2.3/main` (088a899d9359), `v2.3/newBootUp` (1fb69becc003)
- Search query state: **PARTIAL / one or more query errors**; successful result sets: 4
- Contribution evidence in current pass: **No matching authored commits, PRs, or issues returned by paginated core REST; reviewer/comment activity remains UNKNOWN because Search was rate-limited**.

## Kpartners.CXP

- Repository: [langcodestartup/Kpartners.CXP](https://github.com/langcodestartup/Kpartners.CXP)
- Default branch: `master`; visibility: private; archived: no
- Branch inventory observed: 1 branch(es)
  - `master` (9593e8c3d236)
- Search query state: **PARTIAL / one or more query errors**; successful result sets: 4
- Contribution evidence in current pass: **No matching authored commits, PRs, or issues returned by paginated core REST; reviewer/comment activity remains UNKNOWN because Search was rate-limited**.

## KTTeamsApp

- Repository: [langcodestartup/KTTeamsApp](https://github.com/langcodestartup/KTTeamsApp)
- Default branch: `main`; visibility: private; archived: no
- Branch inventory observed: 12 branch(es)
  - `advanced` (37bee228b37d), `delete` (0e36454fb8cc), `dev` (e6410347e43b), `feat-0925` (697412958d28), `feat-backdoor` (2f4fd8c72ee5), `fix/calendar-unavailable-users` (7c577500bd58), `fix-adaptivecard` (6c6946964bcf), `langcode-test` (50446218ba7d), `main` (e6410347e43b), `old/master` (617419288775), `test/performance-test-code` (9c4a1d451f7a), `working/performance` (1a93ad4b3f5c)
- Search query state: **PARTIAL / one or more query errors**; successful result sets: 4
- Contribution evidence in current pass: **No matching authored commits, PRs, or issues returned by paginated core REST; reviewer/comment activity remains UNKNOWN because Search was rate-limited**.

## react-poc

- Repository: [langcodestartup/react-poc](https://github.com/langcodestartup/react-poc)
- Default branch: `master`; visibility: private; archived: no
- Branch inventory observed: 14 branch(es)
  - `Settiing-DefaultSetting` (9922807779c0), `bot/scenario` (dd4fbd410113), `bot-data-integration` (b78e1deb437f), `botDetail/user` (a6022de2612a), `feat/llm-integration` (db3e0cc6c325), `integration` (c9d46e8ae406), `kb/qna` (8651a96bc672), `knowleagebaselistnadd` (f7182e9248a7), `knowledgebase-dict` (f6304b09e372), `master` (5029a584465e), `setting/company` (8059486e0a89), `setting-account` (e393ba04edc4), `ur_membersetting` (a24b265576d4), `work/knowledgebase-ksh` (f7f5f4fe042a)
- Search query state: **PARTIAL / one or more query errors**; successful result sets: 4
- Contribution evidence in current pass: **No matching authored commits, PRs, or issues returned by paginated core REST; reviewer/comment activity remains UNKNOWN because Search was rate-limited**.

## KTTeamsApp.APIServer

- Repository: [langcodestartup/KTTeamsApp.APIServer](https://github.com/langcodestartup/KTTeamsApp.APIServer)
- Default branch: `master`; visibility: private; archived: no
- Branch inventory observed: 1 branch(es)
  - `master` (ff716de6e23b)
- Search query state: **PARTIAL / one or more query errors**; successful result sets: 4
- Contribution evidence in current pass: **No matching authored commits, PRs, or issues returned by paginated core REST; reviewer/comment activity remains UNKNOWN because Search was rate-limited**.

## Muin-Crawling

- Repository: [langcodestartup/Muin-Crawling](https://github.com/langcodestartup/Muin-Crawling)
- Default branch: `master`; visibility: private; archived: no
- Branch inventory observed: 1 branch(es)
  - `master` (3ac8bb251969)
- Search query state: **PARTIAL / one or more query errors**; successful result sets: 4
- Contribution evidence in current pass: **No matching authored commits, PRs, or issues returned by paginated core REST; reviewer/comment activity remains UNKNOWN because Search was rate-limited**.

## Muin-Hotel

- Repository: [langcodestartup/Muin-Hotel](https://github.com/langcodestartup/Muin-Hotel)
- Default branch: `main`; visibility: private; archived: no
- Branch inventory observed: 2 branch(es)
  - `dev` (615658efde9a), `main` (204c23ac9dea)
- Search query state: **PARTIAL / one or more query errors**; successful result sets: 4
- Contribution evidence in current pass: **No matching authored commits, PRs, or issues returned by paginated core REST; reviewer/comment activity remains UNKNOWN because Search was rate-limited**.

## KTExcelParse

- Repository: [langcodestartup/KTExcelParse](https://github.com/langcodestartup/KTExcelParse)
- Default branch: `main`; visibility: private; archived: no
- Branch inventory observed: 1 branch(es)
  - `main` (ac329e24af2b)
- Search query state: **PARTIAL / one or more query errors**; successful result sets: 4
- Contribution evidence in current pass: **No matching authored commits, PRs, or issues returned by paginated core REST; reviewer/comment activity remains UNKNOWN because Search was rate-limited**.

## RAG-Evaluation

- Repository: [langcodestartup/RAG-Evaluation](https://github.com/langcodestartup/RAG-Evaluation)
- Default branch: `main`; visibility: private; archived: no
- Branch inventory observed: 3 branch(es)
  - `feat/ragas` (b7039f2bf26c), `feat/tonic_wrapper` (0302cbac3d27), `main` (98e002fb97d0)
- Search query state: **PARTIAL / one or more query errors**; successful result sets: 4
- Contribution evidence in current pass: **No matching authored commits, PRs, or issues returned by paginated core REST; reviewer/comment activity remains UNKNOWN because Search was rate-limited**.

## LCDocumentParser

- Repository: [langcodestartup/LCDocumentParser](https://github.com/langcodestartup/LCDocumentParser)
- Default branch: `main`; visibility: private; archived: no
- Branch inventory observed: 1 branch(es)
  - `main` (74052831aa83)
- Search query state: **PARTIAL / one or more query errors**; successful result sets: 4
- Matching commit records returned:
  - [74052831aa83](https://github.com/langcodestartup/LCDocumentParser/commit/74052831aa8325fb1a35dfb0db803fd91cdb2336) — kimgooneya — 2025-03-10 — 문서 엔드포인트에 주석 추가 및 임포트 안정성 개선 _(core REST commit?author=kimgooneya)_
  - [f86421ed3fe6](https://github.com/langcodestartup/LCDocumentParser/commit/f86421ed3fe67c292fedcbc8cb76adb903747b24) — kimgooneya — 2025-03-10 — 수정사항 반영영 _(core REST commit?author=kimgooneya)_
  - [9d44e9f37277](https://github.com/langcodestartup/LCDocumentParser/commit/9d44e9f372771cbb136d8f28eee8e327dd92f2a8) — kimgooneya — 2025-03-07 — 프로젝트 초기 설정 및 기본 구조 생성 _(core REST commit?author=kimgooneya)_
  - [c89b7482be2b](https://github.com/langcodestartup/LCDocumentParser/commit/c89b7482be2b78f5a8c4b5fe5ae9547679a9a2db) — kimgooneya — 2025-03-07 — Initial commit _(core REST commit?author=kimgooneya)_

## LotteMembers

- Repository: [langcodestartup/LotteMembers](https://github.com/langcodestartup/LotteMembers)
- Default branch: `master`; visibility: private; archived: no
- Branch inventory observed: 7 branch(es)
  - `LotteMembers/kkw` (73c252fbe495), `lotte/hyk` (5a09da0a10b4), `lotte/upload-data` (5b3894f30919), `master` (958a0be0434b), `working/chatservice-init` (dc22dc1c98cb), `working/multiturn` (4ee747ae44ed), `working/report-ui-2` (06a8cdcf3ada)
- Search query state: **PARTIAL / one or more query errors**; successful result sets: 4
- Contribution evidence in current pass: **No matching authored commits, PRs, or issues returned by paginated core REST; reviewer/comment activity remains UNKNOWN because Search was rate-limited**.

## langcode.cxp.back

- Repository: [langcodestartup/langcode.cxp.back](https://github.com/langcodestartup/langcode.cxp.back)
- Default branch: `master`; visibility: private; archived: no
- Branch inventory observed: 6 branch(es)
  - `master` (71c90c7ad009), `work/function-base` (6ebaf5d27305), `work/github-action` (e9b75cd95117), `work/keycloak-login` (d6b77219b5e2), `work/mediator` (f1b4eb7526f7), `work/pv3-8-sign-in` (f338e889a331)
- Search query state: **PARTIAL / one or more query errors**; successful result sets: 4
- Matching commit records returned:
  - [577e48ccdfba](https://github.com/langcodestartup/langcode.cxp.back/commit/577e48ccdfbaf204353da78dbebb73ba16fa2f23) — kimgooneya — 2025-06-12 — pv3-8-sign-in _(core REST commit?author=kimgooneya)_
  - [8b00d833c6ed](https://github.com/langcodestartup/langcode.cxp.back/commit/8b00d833c6edc7ba3b9de751a8207541c889c35c) — kimgooneya — 2025-06-11 — Keycloak 로그인 기능 구현 (#31) _(core REST commit?author=kimgooneya)_
  - [4264c8864e51](https://github.com/langcodestartup/langcode.cxp.back/commit/4264c8864e51b8ec69cfc4a3cbc42936aa14e69c) — kimgooneya — 2025-06-04 — 오류수정 _(core REST commit?author=kimgooneya)_
  - [9e3269433391](https://github.com/langcodestartup/langcode.cxp.back/commit/9e32694333917dd21cfa7a95b193637c9e88456a) — kimgooneya — 2025-05-27 — Identity 모듈 동작하도록 수정 (#24) _(core REST commit?author=kimgooneya)_
  - [7aa92071e99a](https://github.com/langcodestartup/langcode.cxp.back/commit/7aa92071e99a549d4e4ff500e7ecfb52c314f027) — kimgooneya — 2025-05-21 — Identities 모듈 코드 리펙토링 (#22) _(core REST commit?author=kimgooneya)_
  - [3056de5a8fba](https://github.com/langcodestartup/langcode.cxp.back/commit/3056de5a8fba00f194a09f87c751a17c759de40b) — kimgooneya — 2025-05-19 — User Module List 의 Query Paremeter, Endpoint 수정 _(core REST commit?author=kimgooneya)_
  - [653f5c3a8248](https://github.com/langcodestartup/langcode.cxp.back/commit/653f5c3a824807ddfd5a09bffe0a6d86ab909533) — kimgooneya — 2025-05-19 — 중간 합병 (#21) _(core REST commit?author=kimgooneya)_
  - [2bd70624e307](https://github.com/langcodestartup/langcode.cxp.back/commit/2bd70624e30770b97fcd0172c2c0e6b1fc33ae6e) — kimgooneya — 2025-05-15 — 문서화 패키지 Scalar 적용 (#20) _(core REST commit?author=kimgooneya)_
  - [4fe87b8bc3a5](https://github.com/langcodestartup/langcode.cxp.back/commit/4fe87b8bc3a54b50ab8ff7e92a07962b0446677e) — kimgooneya — 2025-05-15 — unit of work 의존성 주입 수정 (#19) _(core REST commit?author=kimgooneya)_
  - [e683b42d3b1b](https://github.com/langcodestartup/langcode.cxp.back/commit/e683b42d3b1b5c56a8660cfdd537e34a4ec89267) — kimgooneya — 2025-05-15 — Http Module 삭제 -> Application/Feature 하위 항목으로 편입 (#18) _(core REST commit?author=kimgooneya)_
  - [0cc548b024f0](https://github.com/langcodestartup/langcode.cxp.back/commit/0cc548b024f0309a513b5e0652633cb8f515f802) — kimgooneya — 2025-05-15 — 중간 결과 전파용 (#17) _(core REST commit?author=kimgooneya)_
  - [829d5f29c254](https://github.com/langcodestartup/langcode.cxp.back/commit/829d5f29c25480507c0bc52a59242bb6f314abca) — kimgooneya — 2025-05-09 — Scalar UI 검토 _(core REST commit?author=kimgooneya)_
  - [5a59128327fb](https://github.com/langcodestartup/langcode.cxp.back/commit/5a59128327fb8899b9b65c205a8aca83bc41432d) — kimgooneya — 2025-05-08 — 오류 수정 (#16) _(core REST commit?author=kimgooneya)_
  - [40c17c463b6b](https://github.com/langcodestartup/langcode.cxp.back/commit/40c17c463b6bb5393ab33dfe43e1ffa480142b09) — kimgooneya — 2025-05-08 — 오타 수정 _(core REST commit?author=kimgooneya)_
  - [b7eb47f6bcd3](https://github.com/langcodestartup/langcode.cxp.back/commit/b7eb47f6bcd3a1bef65e5688da4e37f9971d07e0) — kimgooneya — 2025-05-08 — User Module 전면 개편 (#15) _(core REST commit?author=kimgooneya)_
  - [b52786af1c63](https://github.com/langcodestartup/langcode.cxp.back/commit/b52786af1c639b9b320c2726b6d326e35124b851) — kimgooneya — 2025-05-07 — user module 작업 v0.9 (#14) _(core REST commit?author=kimgooneya)_
  - [4bfffb2fcaf3](https://github.com/langcodestartup/langcode.cxp.back/commit/4bfffb2fcaf397afdf0a102453804193d81632a2) — kimgooneya — 2025-04-30 — 태초 회귀 (#13) _(core REST commit?author=kimgooneya)_
  - [93e703ab9975](https://github.com/langcodestartup/langcode.cxp.back/commit/93e703ab99754cf881a2a57136f98d55d13873b6) — kimgooneya — 2025-04-30 — 기초 코드 내용 재설정 (#12) _(core REST commit?author=kimgooneya)_
  - [189412a3efb6](https://github.com/langcodestartup/langcode.cxp.back/commit/189412a3efb64b2ad2272fa4fca1156cb15cf6e1) — kimgooneya — 2025-04-29 — Permission Detail Feautres 작업 (#11) _(core REST commit?author=kimgooneya)_
  - [e6b6964e1e96](https://github.com/langcodestartup/langcode.cxp.back/commit/e6b6964e1e960d2bf446d846d949c166e9b67be0) — kimgooneya — 2025-04-29 — permission-features (#10) _(core REST commit?author=kimgooneya)_
  - [67bff96c341b](https://github.com/langcodestartup/langcode.cxp.back/commit/67bff96c341b82bfb10410c1cd2cb92e54381e36) — kimgooneya — 2025-04-28 — Work/role-feautres (#9) _(core REST commit?author=kimgooneya)_
  - [64d60fe62ff8](https://github.com/langcodestartup/langcode.cxp.back/commit/64d60fe62ff87a1c92d590a3f5d2a337fa47f633) — kimgooneya — 2025-04-28 — Role Module 수정 (#8) _(core REST commit?author=kimgooneya)_
  - [02b518b6cdd7](https://github.com/langcodestartup/langcode.cxp.back/commit/02b518b6cdd7972005c6ec54fad603ae1fb2efb2) — kimgooneya — 2025-04-28 — 인코딩 이슈 해결 (#7) _(core REST commit?author=kimgooneya)_
  - [08a2f175d402](https://github.com/langcodestartup/langcode.cxp.back/commit/08a2f175d4020de7162738d8304a8ae651fad06e) — kimgooneya — 2025-04-28 — update user 작성 + 주석 한글 -> 영어 + 모듈 오탈자 수정 (#5) _(core REST commit?author=kimgooneya)_
  - [758dcb673735](https://github.com/langcodestartup/langcode.cxp.back/commit/758dcb6737357b947bdd73e8be83820db9fdc25a) — kimgooneya — 2025-04-28 — Get users 작업 완료 (#4) _(core REST commit?author=kimgooneya)_
  - [8ca7c785b90b](https://github.com/langcodestartup/langcode.cxp.back/commit/8ca7c785b90b4404c5d7869ba79239da9d4fbfa1) — kimgooneya — 2025-04-25 — 사용자 조회 기능 수정 (#3) _(core REST commit?author=kimgooneya)_
  - [624880a08cda](https://github.com/langcodestartup/langcode.cxp.back/commit/624880a08cda9fae6788f63611fb7c2816166608) — kimgooneya — 2025-04-25 — 내용 정리 _(core REST commit?author=kimgooneya)_
  - [26f5b522df3d](https://github.com/langcodestartup/langcode.cxp.back/commit/26f5b522df3da0176a0c6ea4caf3022d3b331ec1) — kimgooneya — 2025-04-25 — Delete User Validator 추가 _(core REST commit?author=kimgooneya)_
  - [71ae6b60c19e](https://github.com/langcodestartup/langcode.cxp.back/commit/71ae6b60c19e0de54e660cae1938018f64463710) — kimgooneya — 2025-04-25 — User Create 완료 _(core REST commit?author=kimgooneya)_
  - [901876347059](https://github.com/langcodestartup/langcode.cxp.back/commit/901876347059fbb957f496836413cf9f9e79bae3) — kimgooneya — 2025-04-25 — 현재 완료 _(core REST commit?author=kimgooneya)_
  - [281ab355ccc2](https://github.com/langcodestartup/langcode.cxp.back/commit/281ab355ccc2f2b3085591501ffbc639b60fd074) — kimgooneya — 2025-04-25 — a _(core REST commit?author=kimgooneya)_
  - [a99f41bf5db0](https://github.com/langcodestartup/langcode.cxp.back/commit/a99f41bf5db014cfb51b417f8bf46092f473558f) — kimgooneya — 2025-04-25 — Merge branch 'work/mediator' into work/roles-module _(core REST commit?author=kimgooneya)_
  - [610723ddbf64](https://github.com/langcodestartup/langcode.cxp.back/commit/610723ddbf6488df3d8a9c61329f2c61837953dd) — kimgooneya — 2025-04-24 — 중간저장장 _(core REST commit?author=kimgooneya)_
  - [fd0602b3c368](https://github.com/langcodestartup/langcode.cxp.back/commit/fd0602b3c368aa340f1638935662e32da3a4ecee) — kimgooneya — 2025-04-24 — Role 완료료 _(core REST commit?author=kimgooneya)_
  - [3bd880817cad](https://github.com/langcodestartup/langcode.cxp.back/commit/3bd880817cad2687b68e0379f460dd485eb13a6a) — kimgooneya — 2025-04-24 — Role 파일 구조 설정 완료 _(core REST commit?author=kimgooneya)_
  - [9a7bcdd8aba9](https://github.com/langcodestartup/langcode.cxp.back/commit/9a7bcdd8aba982cfeaf45cc33eb5cf79f88828ce) — kimgooneya — 2025-04-24 — DB 환경 설정 변수 추가 DB OR PostgreSQL _(core REST commit?author=kimgooneya)_
  - [1dcf0b8e67ae](https://github.com/langcodestartup/langcode.cxp.back/commit/1dcf0b8e67ae34e48fe259ec06b6a056516cb824) — kimgooneya — 2025-04-24 — 데이터 시딩 추가 _(core REST commit?author=kimgooneya)_
  - [af527e280bec](https://github.com/langcodestartup/langcode.cxp.back/commit/af527e280becdf72d175ca1eec42fab5967ab6ca) — kimgooneya — 2025-04-24 — GenericRepository 수정 ICommonTable 항목 한정 _(core REST commit?author=kimgooneya)_
  - [36e7f746b874](https://github.com/langcodestartup/langcode.cxp.back/commit/36e7f746b8749f36cfb46763973a180b20e4f406) — kimgooneya — 2025-04-24 — public으로 interface 변경 _(core REST commit?author=kimgooneya)_
  - [dc6d870b169a](https://github.com/langcodestartup/langcode.cxp.back/commit/dc6d870b169ac3fb65ea3d7a23a753a65dd0a1ca) — kimgooneya — 2025-04-24 — User CQRS 적용 1단계 완료 _(core REST commit?author=kimgooneya)_
  - [7c26bd4f293d](https://github.com/langcodestartup/langcode.cxp.back/commit/7c26bd4f293d885fd6da204cbdac1871b5add03f) — kimgooneya — 2025-04-23 — Module 이 ASP NET Core 참조할 수 있게 변경 _(core REST commit?author=kimgooneya)_
  - [74d362228bfe](https://github.com/langcodestartup/langcode.cxp.back/commit/74d362228bfeb957d15bded68cc683d3a117463e) — kimgooneya — 2025-04-23 — 기초공사 진행 중 _(core REST commit?author=kimgooneya)_
  - [6bcc5fc7b43e](https://github.com/langcodestartup/langcode.cxp.back/commit/6bcc5fc7b43eda4858bad6a4443ccf70235867ea) — kimgooneya — 2025-04-21 — modular monolith + vertical slice architecture _(core REST commit?author=kimgooneya)_
  - [f7d023c9bd12](https://github.com/langcodestartup/langcode.cxp.back/commit/f7d023c9bd120eb7f4b2d40458f9cf0f34af3131) — kimgooneya — 2025-04-16 — Domain 재작업 필요하여 수정정 _(core REST commit?author=kimgooneya)_
  - [a606e8084cfe](https://github.com/langcodestartup/langcode.cxp.back/commit/a606e8084cfe9500a4715c7c1c0fb09501ce0c98) — kimgooneya — 2025-04-03 — 내용 반영영 _(core REST commit?author=kimgooneya)_
  - [59003acf1950](https://github.com/langcodestartup/langcode.cxp.back/commit/59003acf1950723b9b6b32449104747b25da96ce) — kimgooneya — 2025-04-02 — 기본 csproj 구성 _(core REST commit?author=kimgooneya)_
  - [fc2a1f37c0aa](https://github.com/langcodestartup/langcode.cxp.back/commit/fc2a1f37c0aa3f26a82097835ae6cfbdeafd4821) — kimgooneya — 2025-04-02 — 초기화 _(core REST commit?author=kimgooneya)_
  - [d2476697c7a6](https://github.com/langcodestartup/langcode.cxp.back/commit/d2476697c7a6a7324a44088fa479a4b5d9d39772) — kimgooneya — 2025-03-27 — all clear _(core REST commit?author=kimgooneya)_
  - [3346bc8f4d73](https://github.com/langcodestartup/langcode.cxp.back/commit/3346bc8f4d739283cd2680d73f8293944d267ccf) — kimgooneya — 2025-03-27 — 1 _(core REST commit?author=kimgooneya)_
  - [0372253086dc](https://github.com/langcodestartup/langcode.cxp.back/commit/0372253086dc9e80f335ab05ba1393f3a55752c3) — kimgooneya — 2025-03-27 — 1 _(core REST commit?author=kimgooneya)_
  - [5b981f9f571e](https://github.com/langcodestartup/langcode.cxp.back/commit/5b981f9f571ef2ba1822a9cd3e45dfc8c5e148ef) — kimgooneya — 2025-03-27 — Refactor project to implement Clean Architecture _(core REST commit?author=kimgooneya)_
  - [1842e741e35f](https://github.com/langcodestartup/langcode.cxp.back/commit/1842e741e35f722d2b01619adec625314ee088e4) — kimgooneya — 2025-03-27 — 변경내용 반영 _(core REST commit?author=kimgooneya)_
  - [da73c9d0f04e](https://github.com/langcodestartup/langcode.cxp.back/commit/da73c9d0f04e40ee567cd10bc451070ffed47921) — kimgooneya — 2025-03-13 — 나머지 항목추가 _(core REST commit?author=kimgooneya)_
  - [c73ad9581e55](https://github.com/langcodestartup/langcode.cxp.back/commit/c73ad9581e55a3ac09d6f7d6c9f66da889fbf165) — kimgooneya — 2025-03-13 — 공통 내용 작업 _(core REST commit?author=kimgooneya)_
  - [2039fb9f8ef8](https://github.com/langcodestartup/langcode.cxp.back/commit/2039fb9f8ef889f4ee58c187291efbf595f6ff60) — kimgooneya — 2025-03-13 — 파일 추가 _(core REST commit?author=kimgooneya)_
  - [61691c2141aa](https://github.com/langcodestartup/langcode.cxp.back/commit/61691c2141aa80070291fce8214e0fbdb0765ba0) — kimgooneya — 2025-03-13 — EF Core 설치 및 Db 연결을 위한 설정 진행 _(core REST commit?author=kimgooneya)_
  - [3f806ae691d3](https://github.com/langcodestartup/langcode.cxp.back/commit/3f806ae691d3d994bb09958c1437926c0deed83a) — kimgooneya — 2025-03-13 — 유닛테스트 추가 _(core REST commit?author=kimgooneya)_
  - [18160458d6c9](https://github.com/langcodestartup/langcode.cxp.back/commit/18160458d6c97b9719a98b5925d2ebeeba05642d) — kimgooneya — 2025-03-13 — 초기 프로젝트 설정 _(core REST commit?author=kimgooneya)_
  - [d207cc58780d](https://github.com/langcodestartup/langcode.cxp.back/commit/d207cc58780d4b9f3ec26ce605b2fcf5a076721e) — kimgooneya — 2025-03-13 — 변경내용 반영영 _(core REST commit?author=kimgooneya)_
  - [e26022a0df49](https://github.com/langcodestartup/langcode.cxp.back/commit/e26022a0df49f6817a76f66102a8c212e3509276) — kimgooneya — 2025-03-12 — 초기 커밋. _(core REST commit?author=kimgooneya)_
  - [2086b5b6c052](https://github.com/langcodestartup/langcode.cxp.back/commit/2086b5b6c052453ef164792cd84e7c4c6245df9b) — kimgooneya — 2025-03-12 — .gitattributes 및 .gitignore을(를) 추가합니다. _(core REST commit?author=kimgooneya)_
- Matching issue/PR records returned:
  - PR [#33 사용자 추가 기능 개발](https://github.com/langcodestartup/langcode.cxp.back/pull/33) — login kimgooneya — opened 2025-06-12 — state closed — merged 2025-06-12 _(core REST)_
  - PR [#31 Keycloak 로그인 기능 구현](https://github.com/langcodestartup/langcode.cxp.back/pull/31) — login kimgooneya — opened 2025-06-11 — state closed — merged 2025-06-11 _(core REST)_
  - PR [#24 동작하도록 수정](https://github.com/langcodestartup/langcode.cxp.back/pull/24) — login kimgooneya — opened 2025-05-27 — state closed — merged 2025-05-27 _(core REST)_
  - PR [#22 코드 리펙토링](https://github.com/langcodestartup/langcode.cxp.back/pull/22) — login kimgooneya — opened 2025-05-21 — state closed — merged 2025-05-21 _(core REST)_
  - PR [#21 중간 합병](https://github.com/langcodestartup/langcode.cxp.back/pull/21) — login kimgooneya — opened 2025-05-19 — state closed — merged 2025-05-19 _(core REST)_
  - PR [#20 문서화 패키지 Scalar 적용](https://github.com/langcodestartup/langcode.cxp.back/pull/20) — login kimgooneya — opened 2025-05-15 — state closed — merged 2025-05-15 _(core REST)_
  - PR [#19 unit of work 의존성 주입 수정](https://github.com/langcodestartup/langcode.cxp.back/pull/19) — login kimgooneya — opened 2025-05-15 — state closed — merged 2025-05-15 _(core REST)_
  - PR [#18 Http Module 삭제 -> Application/Feature 하위 항목으로 편입](https://github.com/langcodestartup/langcode.cxp.back/pull/18) — login kimgooneya — opened 2025-05-15 — state closed — merged 2025-05-15 _(core REST)_
  - PR [#17 중간 결과 전파용](https://github.com/langcodestartup/langcode.cxp.back/pull/17) — login kimgooneya — opened 2025-05-15 — state closed — merged 2025-05-15 _(core REST)_
  - PR [#16 오류 수정](https://github.com/langcodestartup/langcode.cxp.back/pull/16) — login kimgooneya — opened 2025-05-08 — state closed — merged 2025-05-08 _(core REST)_
  - PR [#15 User Module 전면 개편](https://github.com/langcodestartup/langcode.cxp.back/pull/15) — login kimgooneya — opened 2025-05-08 — state closed — merged 2025-05-08 _(core REST)_
  - PR [#14 user module 작업 v0.9](https://github.com/langcodestartup/langcode.cxp.back/pull/14) — login kimgooneya — opened 2025-05-07 — state closed — merged 2025-05-07 _(core REST)_
  - PR [#13 태초 회귀](https://github.com/langcodestartup/langcode.cxp.back/pull/13) — login kimgooneya — opened 2025-04-30 — state closed — merged 2025-04-30 _(core REST)_
  - PR [#12 기초 코드 내용 재설정](https://github.com/langcodestartup/langcode.cxp.back/pull/12) — login kimgooneya — opened 2025-04-30 — state closed — merged 2025-04-30 _(core REST)_
  - PR [#11 Permission Detail Feautres 작업](https://github.com/langcodestartup/langcode.cxp.back/pull/11) — login kimgooneya — opened 2025-04-29 — state closed — merged 2025-04-29 _(core REST)_
  - PR [#10 permission-features](https://github.com/langcodestartup/langcode.cxp.back/pull/10) — login kimgooneya — opened 2025-04-29 — state closed — merged 2025-04-29 _(core REST)_
  - PR [#9 Work/role-feautres](https://github.com/langcodestartup/langcode.cxp.back/pull/9) — login kimgooneya — opened 2025-04-28 — state closed — merged 2025-04-28 _(core REST)_
  - PR [#8 Role Module 수정](https://github.com/langcodestartup/langcode.cxp.back/pull/8) — login kimgooneya — opened 2025-04-28 — state closed — merged 2025-04-28 _(core REST)_
  - PR [#7 인코딩 이슈 해결](https://github.com/langcodestartup/langcode.cxp.back/pull/7) — login kimgooneya — opened 2025-04-28 — state closed — merged 2025-04-28 _(core REST)_
  - PR [#5 update user 작성 + 주석 한글 -> 영어 + 모듈 오탈자 수정](https://github.com/langcodestartup/langcode.cxp.back/pull/5) — login kimgooneya — opened 2025-04-28 — state closed — merged 2025-04-28 _(core REST)_
  - PR [#4 Get users 작업 완료](https://github.com/langcodestartup/langcode.cxp.back/pull/4) — login kimgooneya — opened 2025-04-28 — state closed — merged 2025-04-28 _(core REST)_
  - PR [#3 사용자 조회 기능 수정](https://github.com/langcodestartup/langcode.cxp.back/pull/3) — login kimgooneya — opened 2025-04-25 — state closed — merged 2025-04-25 _(core REST)_
  - PR [#2 DeleteUser](https://github.com/langcodestartup/langcode.cxp.back/pull/2) — login kimgooneya — opened 2025-04-25 — state closed — merged 2025-04-25 _(core REST)_
  - PR [#1 User Create 완료](https://github.com/langcodestartup/langcode.cxp.back/pull/1) — login kimgooneya — opened 2025-04-25 — state closed — merged 2025-04-25 _(core REST)_

## keycloak-react

- Repository: [langcodestartup/keycloak-react](https://github.com/langcodestartup/keycloak-react)
- Default branch: `main`; visibility: private; archived: no
- Branch inventory observed: 1 branch(es)
  - `main` (5cf95e8d53f2)
- Search query state: **PARTIAL / one or more query errors**; successful result sets: 4
- Matching commit records returned:
  - [5cf95e8d53f2](https://github.com/langcodestartup/keycloak-react/commit/5cf95e8d53f297af00192127083206fa658ba464) — kimgooneya — 2025-03-21 — Update README.md _(core REST commit?author=kimgooneya)_
  - [995ec5403631](https://github.com/langcodestartup/keycloak-react/commit/995ec54036315a91bfa95a923b21f07b1c19bb31) — kimgooneya — 2025-03-21 — code complete _(core REST commit?author=kimgooneya)_
  - [1dc93701452d](https://github.com/langcodestartup/keycloak-react/commit/1dc93701452d96e9be426d2d48540f4b06209b27) — kimgooneya — 2025-03-19 — Initialize project using Create React App _(core REST commit?author=kimgooneya)_

## KoreaSeven.V2

- Repository: [langcodestartup/KoreaSeven.V2](https://github.com/langcodestartup/KoreaSeven.V2)
- Default branch: `main`; visibility: private; archived: no
- Branch inventory observed: 17 branch(es)
  - `develop` (077f12e14603), `feature/domaindelete` (80969f016644), `feature/dragdrop` (74987824df79), `feature/mergeMain` (4268ff5941b4), `feature/multiturn` (eb925162209e), `feature/quickgridscenario` (635ee748e16f), `feature/scenario-back` (706b0f033370), `feature/scenario-front` (029fce01dcf2), `fix/design` (029fce01dcf2), `fix/short-answer-prmt` (f34e15b17625), `hotfix/error` (3466ffb0cbee), `hotfix/telemetry-error` (bfb892616834), `main` (d57d0f9a2d69), `revert-36-tipa/feature/productModel` (0699711d2d91), `tipa/feature/function` (42364790023b), `tipa/feature/product-upload` (c6a92524031e), `tipa/main` (5a5114db1bb0)
- Search query state: **PARTIAL / one or more query errors**; successful result sets: 4
- Matching commit records returned:
  - [b561d8974dee](https://github.com/langcodestartup/KoreaSeven.V2/commit/b561d8974deefd082365fcf9e773c2f022f73f04) — kimgooneya — 2023-08-17 — KnowlegeBase Factory 추가 _(core REST commit?author=kimgooneya)_
  - [8de14f06cad7](https://github.com/langcodestartup/KoreaSeven.V2/commit/8de14f06cad7e269e69054a72d1b9ca481a6c8bd) — kimgooneya — 2023-08-17 — DI 추가 _(core REST commit?author=kimgooneya)_
  - [93ba6d96e9dd](https://github.com/langcodestartup/KoreaSeven.V2/commit/93ba6d96e9dd5679ba5233a818f64b3d587046e2) — kimgooneya — 2023-08-17 — Nuget Package 추가 _(core REST commit?author=kimgooneya)_
  - [d4a88ff5dff8](https://github.com/langcodestartup/KoreaSeven.V2/commit/d4a88ff5dff8cc5c29a60ebcc093141976ef1a03) — kimgooneya — 2023-08-17 — Form Recognizer 서비스 추가 _(core REST commit?author=kimgooneya)_
  - [c7cd8672b4e3](https://github.com/langcodestartup/KoreaSeven.V2/commit/c7cd8672b4e370dd9fc3cf46b82850c64b7cf4b1) — kimgooneya — 2022-07-28 — common model, field, type 수정 (#20) _(core REST commit?author=kimgooneya)_

## KTCICDTest

- Repository: [langcodestartup/KTCICDTest](https://github.com/langcodestartup/KTCICDTest)
- Default branch: `master`; visibility: private; archived: no
- Branch inventory observed: 2 branch(es)
  - `main` (8d8c2f211c69), `master` (571683b160c2)
- Search query state: **PARTIAL / one or more query errors**; successful result sets: 4
- Contribution evidence in current pass: **No matching authored commits, PRs, or issues returned by paginated core REST; reviewer/comment activity remains UNKNOWN because Search was rate-limited**.

## langcode.cxp.front

- Repository: [langcodestartup/langcode.cxp.front](https://github.com/langcodestartup/langcode.cxp.front)
- Default branch: `main`; visibility: private; archived: no
- Branch inventory observed: 10 branch(es)
  - `main` (23241917a6a8), `working/bottomsheet` (189b019050fc), `working/button` (8479f40e71cf), `working/keycloak` (4ff2fb54e669), `working/prompt` (b3d30e0c61ea), `working/prompt-2` (3b2ed523cfe2), `working/prompt-page` (52d671860caa), `working/setting-company-ui` (e269f61f5321), `working/signup` (553cf848b1d3), `working/user-management` (052fefd27989)
- Search query state: **PARTIAL / one or more query errors**; successful result sets: 4
- Matching commit records returned:
  - [f768454b87ea](https://github.com/langcodestartup/langcode.cxp.front/commit/f768454b87ea568523c9a88eeb2d23d361f35db6) — kimgooneya — 2026-03-26 — feat: Chrome 디버깅 자동화를 위한 dev.mjs 및 VS Code 실행 설정 추가 (.gitignore 반영) _(core REST commit?author=kimgooneya)_
  - [b35971c4fc75](https://github.com/langcodestartup/langcode.cxp.front/commit/b35971c4fc75d505e8088bf907fde8f6762080de) — kimgooneya — 2026-03-23 — fix: 서버 전용 환경변수 런타임 전환 및 배포 문서 오류 교정 (#69) _(core REST commit?author=kimgooneya)_
  - [2de19066f43f](https://github.com/langcodestartup/langcode.cxp.front/commit/2de19066f43f42d280c1c0272a07788675dededf) — kimgooneya — 2026-03-23 — fix: standalone 빌드 실패 방지를 위해 중복 next.config.ts 삭제 (#68) _(core REST commit?author=kimgooneya)_
  - [9b7d21007b48](https://github.com/langcodestartup/langcode.cxp.front/commit/9b7d21007b483f51d93f4df61949b5aeea628388) — kimgooneya — 2026-03-23 — feat: refresh token 쿠키 maxAge를 8시간으로 단축 (#67) _(core REST commit?author=kimgooneya)_
  - [b1520af04153](https://github.com/langcodestartup/langcode.cxp.front/commit/b1520af0415306eb89a88c6bbc024859bf09f727) — kimgooneya — 2026-03-23 — docs: worktree, commit, pull, pull request 가이드라인 추가 및 한국어 사용 명시 _(core REST commit?author=kimgooneya)_
  - [6c22c66b5da0](https://github.com/langcodestartup/langcode.cxp.front/commit/6c22c66b5da07ac3891fdb80542c27195b98e618) — kimgooneya — 2026-03-23 — fix: 로그아웃 후 /connect/logout으로 리다이렉트하여 백엔드 세션 종료 (#66) _(core REST commit?author=kimgooneya)_
  - [3fc3a7e4f107](https://github.com/langcodestartup/langcode.cxp.front/commit/3fc3a7e4f107a48495d79656a52445bb17c42825) — kimgooneya — 2026-03-23 — feat: 프로필 호버 툴팁 UI 추가 및 테마 변수 수정 (#65) _(core REST commit?author=kimgooneya)_
  - [09d76dd57abc](https://github.com/langcodestartup/langcode.cxp.front/commit/09d76dd57abcbfafdac0e28154087228057951ec) — kimgooneya — 2026-03-23 — chore: Next.js 16에서 지원 중단된 eslint 설정 제거 (#64) _(core REST commit?author=kimgooneya)_
  - [0f06c72269ba](https://github.com/langcodestartup/langcode.cxp.front/commit/0f06c72269bad37521fa87df23b6d4f6e36d21a0) — kimgooneya — 2026-03-20 — docs: BFF Auth Proxy 적용 가이드 문서 추가 _(core REST commit?author=kimgooneya)_
  - [281356680ace](https://github.com/langcodestartup/langcode.cxp.front/commit/281356680acef19ac96ca12237c3bdf2218d5fe3) — kimgooneya — 2026-03-20 — feat: 배포 설정, 에이전트 관리 화면, KB 상세 개선, 인증 BFF 프록시 적용 (#63) _(core REST commit?author=kimgooneya)_
  - [be6de2026414](https://github.com/langcodestartup/langcode.cxp.front/commit/be6de2026414ebb518d35028277a7b7102c5d482) — kimgooneya — 2026-03-19 — feat(auth): 백엔드 로그인 페이지 기반 인증 마이그레이션 및 프로필 툴팁 추가 (#62) _(core REST commit?author=kimgooneya)_
  - [761bebc0083d](https://github.com/langcodestartup/langcode.cxp.front/commit/761bebc0083de32ad2bce6379fb5d38e1982200d) — kimgooneya — 2026-03-18 — chore: add CLAUDE.md with project conventions _(core REST commit?author=kimgooneya)_
  - [90db198eea30](https://github.com/langcodestartup/langcode.cxp.front/commit/90db198eea301abb35691e6faa01b1067caaf528) — kimgooneya — 2026-03-18 — Merge pull request #61 from langcodestartup/fix/npm-audit-vulnerabilities _(core REST commit?author=kimgooneya)_
  - [ff4f200638ac](https://github.com/langcodestartup/langcode.cxp.front/commit/ff4f200638ac60a4647431ffc63c1d31e06c4d3a) — kimgooneya — 2026-03-18 — chore: F5 디버그 모드 설정 추가 _(core REST commit?author=kimgooneya)_
  - [16ac221db2c0](https://github.com/langcodestartup/langcode.cxp.front/commit/16ac221db2c04dc6d157cd316c80a0ca2d64d82f) — kimgooneya — 2026-03-18 — docs: add BE API guide documents _(core REST commit?author=kimgooneya)_
  - [b4e668a7f98c](https://github.com/langcodestartup/langcode.cxp.front/commit/b4e668a7f98c7c77dbb203e0e2182afd75d71bf9) — kimgooneya — 2026-03-18 — chore: update yarn.lock after npm audit fix _(core REST commit?author=kimgooneya)_
  - [2ef948f2c912](https://github.com/langcodestartup/langcode.cxp.front/commit/2ef948f2c9122258c9d98068c8d443d5685b7247) — kimgooneya — 2026-03-18 — fix: npm 보안 취약점 수정 (11 → 1) _(core REST commit?author=kimgooneya)_
- Matching issue/PR records returned:
  - PR [#69 fix: 서버 전용 환경변수 런타임 전환 및 배포 문서 오류 교정](https://github.com/langcodestartup/langcode.cxp.front/pull/69) — login kimgooneya — opened 2026-03-23 — state closed — merged 2026-03-23 _(core REST)_
  - PR [#68 fix: 중복 next.config.ts 삭제로 standalone 빌드 안정성 확보](https://github.com/langcodestartup/langcode.cxp.front/pull/68) — login kimgooneya — opened 2026-03-23 — state closed — merged 2026-03-23 _(core REST)_
  - PR [#67 feat: refresh token 쿠키 세션 수명 8시간으로 단축](https://github.com/langcodestartup/langcode.cxp.front/pull/67) — login kimgooneya — opened 2026-03-23 — state closed — merged 2026-03-23 _(core REST)_
  - PR [#66 fix: 로그아웃 시 /connect/logout으로 리다이렉트하여 세션 종료](https://github.com/langcodestartup/langcode.cxp.front/pull/66) — login kimgooneya — opened 2026-03-23 — state closed — merged 2026-03-23 _(core REST)_
  - PR [#65 fix: 프로필 툴팁 배경색 투명 문제 수정](https://github.com/langcodestartup/langcode.cxp.front/pull/65) — login kimgooneya — opened 2026-03-23 — state closed — merged 2026-03-23 _(core REST)_
  - PR [#64 chore: Next.js 16에서 지원 중단된 eslint 설정 제거](https://github.com/langcodestartup/langcode.cxp.front/pull/64) — login kimgooneya — opened 2026-03-23 — state closed — merged 2026-03-23 _(core REST)_
  - PR [#63 feat: 배포 설정, 에이전트 관리 화면, KB 상세 개선, 인증 BFF 프록시 적용](https://github.com/langcodestartup/langcode.cxp.front/pull/63) — login kimgooneya — opened 2026-03-20 — state closed — merged 2026-03-20 _(core REST)_
  - PR [#62 feat(auth): 백엔드 로그인 페이지 기반 인증 마이그레이션 및 프로필 툴팁 추가](https://github.com/langcodestartup/langcode.cxp.front/pull/62) — login kimgooneya — opened 2026-03-19 — state closed — merged 2026-03-19 _(core REST)_
  - PR [#61 fix: npm 보안 취약점 수정 (11 → 1)](https://github.com/langcodestartup/langcode.cxp.front/pull/61) — login kimgooneya — opened 2026-03-18 — state closed — merged 2026-03-18 _(core REST)_

## Pumex

- Repository: [langcodestartup/Pumex](https://github.com/langcodestartup/Pumex)
- Default branch: `master`; visibility: private; archived: no
- Branch inventory observed: 1 branch(es)
  - `master` (e39a55bc0b84)
- Search query state: **PARTIAL / one or more query errors**; successful result sets: 4
- Contribution evidence in current pass: **No matching authored commits, PRs, or issues returned by paginated core REST; reviewer/comment activity remains UNKNOWN because Search was rate-limited**.

## kotra-crawler

- Repository: [langcodestartup/kotra-crawler](https://github.com/langcodestartup/kotra-crawler)
- Default branch: `main`; visibility: private; archived: no
- Branch inventory observed: 1 branch(es)
  - `main` (87663535d752)
- Search query state: **PARTIAL / one or more query errors**; successful result sets: 4
- Contribution evidence in current pass: **No matching authored commits, PRs, or issues returned by paginated core REST; reviewer/comment activity remains UNKNOWN because Search was rate-limited**.

## lfnetworks-cxp-demo

- Repository: [langcodestartup/lfnetworks-cxp-demo](https://github.com/langcodestartup/lfnetworks-cxp-demo)
- Default branch: `master`; visibility: private; archived: no
- Branch inventory observed: 9 branch(es)
  - `factoryUpload` (d3892e6e7215), `feature/ExecuteSequentialQueries` (ac7d0c199118), `feature/blob` (f1ce9f84ba23), `feature/btn` (f0b79fcada27), `feature/linqRegex` (58b77c1b2e5b), `feature/prompt` (7a5559dda206), `feature/repository` (8afc3ed7c708), `master` (c01eb33ab4dd), `modPrompt` (bd9dc4f05fe4)
- Search query state: **PARTIAL / one or more query errors**; successful result sets: 4
- Contribution evidence in current pass: **No matching authored commits, PRs, or issues returned by paginated core REST; reviewer/comment activity remains UNKNOWN because Search was rate-limited**.

## lfcxp-demo-console

- Repository: [langcodestartup/lfcxp-demo-console](https://github.com/langcodestartup/lfcxp-demo-console)
- Default branch: `main`; visibility: private; archived: no
- Branch inventory observed: 1 branch(es)
  - `main` (d973ec4e4d1c)
- Search query state: **PARTIAL / one or more query errors**; successful result sets: 4
- Contribution evidence in current pass: **No matching authored commits, PRs, or issues returned by paginated core REST; reviewer/comment activity remains UNKNOWN because Search was rate-limited**.

## KT-Gennie

- Repository: [langcodestartup/KT-Gennie](https://github.com/langcodestartup/KT-Gennie)
- Default branch: `master`; visibility: private; archived: no
- Branch inventory observed: 8 branch(es)
  - `debug/redirect-loop-investigation` (b336a832fdf1), `feat-blob` (a60f9ae0a10f), `feat-download-all-kbs` (63606e657f25), `feat-factory` (5ff7902625dd), `feat-multiple-pdf` (5814cb40e55c), `feat-remove-sso` (ac3d809debd9), `fix-signalr` (a57b497f431d), `master` (497791304e89)
- Search query state: **PARTIAL / one or more query errors**; successful result sets: 4
- Matching commit records returned:
  - [b561d8974dee](https://github.com/langcodestartup/KT-Gennie/commit/b561d8974deefd082365fcf9e773c2f022f73f04) — kimgooneya — 2023-08-17 — KnowlegeBase Factory 추가 _(core REST commit?author=kimgooneya)_
  - [8de14f06cad7](https://github.com/langcodestartup/KT-Gennie/commit/8de14f06cad7e269e69054a72d1b9ca481a6c8bd) — kimgooneya — 2023-08-17 — DI 추가 _(core REST commit?author=kimgooneya)_
  - [93ba6d96e9dd](https://github.com/langcodestartup/KT-Gennie/commit/93ba6d96e9dd5679ba5233a818f64b3d587046e2) — kimgooneya — 2023-08-17 — Nuget Package 추가 _(core REST commit?author=kimgooneya)_
  - [d4a88ff5dff8](https://github.com/langcodestartup/KT-Gennie/commit/d4a88ff5dff8cc5c29a60ebcc093141976ef1a03) — kimgooneya — 2023-08-17 — Form Recognizer 서비스 추가 _(core REST commit?author=kimgooneya)_
  - [c7cd8672b4e3](https://github.com/langcodestartup/KT-Gennie/commit/c7cd8672b4e370dd9fc3cf46b82850c64b7cf4b1) — kimgooneya — 2022-07-28 — common model, field, type 수정 (#20) _(core REST commit?author=kimgooneya)_

## Nol-Universe

- Repository: [langcodestartup/Nol-Universe](https://github.com/langcodestartup/Nol-Universe)
- Default branch: `master`; visibility: private; archived: no
- Branch inventory observed: 2 branch(es)
  - `feat/semanticVector` (1e9cf9ef8f6b), `master` (29f600aade73)
- Search query state: **PARTIAL / one or more query errors**; successful result sets: 4
- Contribution evidence in current pass: **No matching authored commits, PRs, or issues returned by paginated core REST; reviewer/comment activity remains UNKNOWN because Search was rate-limited**.

## nol_azfunc

- Repository: [langcodestartup/nol_azfunc](https://github.com/langcodestartup/nol_azfunc)
- Default branch: `main`; visibility: private; archived: no
- Branch inventory observed: 2 branch(es)
  - `main` (8f56cf199e73), `refactor` (a8b12433f776)
- Search query state: **PARTIAL / one or more query errors**; successful result sets: 4
- Contribution evidence in current pass: **No matching authored commits, PRs, or issues returned by paginated core REST; reviewer/comment activity remains UNKNOWN because Search was rate-limited**.

## kyobo-pre-mvp

- Repository: [langcodestartup/kyobo-pre-mvp](https://github.com/langcodestartup/kyobo-pre-mvp)
- Default branch: `master`; visibility: private; archived: no
- Branch inventory observed: 1 branch(es)
  - `master` (98ab4b59c855)
- Search query state: **PARTIAL / one or more query errors**; successful result sets: 4
- Matching commit records returned:
  - [98ab4b59c855](https://github.com/langcodestartup/kyobo-pre-mvp/commit/98ab4b59c85503b692d34b4c1ecd23d694351206) — kimgooneya — 2025-06-13 — git ignore 수정 _(core REST commit?author=kimgooneya)_
  - [f0d77475edc8](https://github.com/langcodestartup/kyobo-pre-mvp/commit/f0d77475edc8b769e1c486d0b6b9e270195e74dc) — kimgooneya — 2025-06-13 — F042 기준 수정 완료 _(core REST commit?author=kimgooneya)_
  - [35a7dc81d8d9](https://github.com/langcodestartup/kyobo-pre-mvp/commit/35a7dc81d8d9ed322f3112b3edcd7c10a5936f25) — kimgooneya — 2025-06-13 — F040 변수 변경 - 위탁 유형코드 _(core REST commit?author=kimgooneya)_
  - [e81aef4897c8](https://github.com/langcodestartup/kyobo-pre-mvp/commit/e81aef4897c859537b02732e0fd6e47cf8530402) — kimgooneya — 2025-06-13 — F042 검증 로직 변경 _(core REST commit?author=kimgooneya)_
  - [15c223d31005](https://github.com/langcodestartup/kyobo-pre-mvp/commit/15c223d310054e6b494bb2d0a7e61ba5e3b1a5cd) — kimgooneya — 2025-06-13 — Merge branch 'master' of https://github.com/langcodestartup/kyobo-pre-mvp _(core REST commit?author=kimgooneya)_
  - [f5a850abd489](https://github.com/langcodestartup/kyobo-pre-mvp/commit/f5a850abd48951c615531813ff2da3b91882068e) — kimgooneya — 2025-06-13 — F040 수정 - 검증 로직 변경 _(core REST commit?author=kimgooneya)_
  - [32ab59604ca6](https://github.com/langcodestartup/kyobo-pre-mvp/commit/32ab59604ca64c3480b9ba867281f7d2985079c7) — kimgooneya — 2025-06-05 — F019.ipynb 파일 수정:  예외 처리 함수 추가 _(core REST commit?author=kimgooneya)_
  - [05c80b3b1c15](https://github.com/langcodestartup/kyobo-pre-mvp/commit/05c80b3b1c15755e60e833468a4f820c4ecd4518) — kimgooneya — 2025-06-05 — df 사용하도록 전수 변경 _(core REST commit?author=kimgooneya)_
  - [70d37c1d5292](https://github.com/langcodestartup/kyobo-pre-mvp/commit/70d37c1d5292d485afcc4ea836dd90d5d2ab0e5e) — kimgooneya — 2025-06-04 — Merge branch 'master' of https://github.com/langcodestartup/kyobo-pre-mvp _(core REST commit?author=kimgooneya)_
  - [09c6ed3235f3](https://github.com/langcodestartup/kyobo-pre-mvp/commit/09c6ed3235f3e0cb7ef13b649afe4ff4d17a9cec) — kimgooneya — 2025-06-04 — 변경반영 _(core REST commit?author=kimgooneya)_
  - [13a52731166f](https://github.com/langcodestartup/kyobo-pre-mvp/commit/13a52731166f9593281b8588f2c63cdadb42b2e0) — kimgooneya — 2025-06-04 — F047 완료 _(core REST commit?author=kimgooneya)_
  - [8a82bfc3e360](https://github.com/langcodestartup/kyobo-pre-mvp/commit/8a82bfc3e360541b5e11bb2b14a362f4e01c47a7) — kimgooneya — 2025-05-30 — F046 작업 완료 _(core REST commit?author=kimgooneya)_
  - [5a9a83e88eb4](https://github.com/langcodestartup/kyobo-pre-mvp/commit/5a9a83e88eb4f427b290aa26fde168f03e3a85b2) — kimgooneya — 2025-05-30 — F045 작업 완료 _(core REST commit?author=kimgooneya)_
  - [0dd60e8008c8](https://github.com/langcodestartup/kyobo-pre-mvp/commit/0dd60e8008c842a8b0794129946323712e1e0ae8) — kimgooneya — 2025-05-30 — 공백 블록 제거 _(core REST commit?author=kimgooneya)_
  - [e1e9f8a24945](https://github.com/langcodestartup/kyobo-pre-mvp/commit/e1e9f8a24945fef9dc02e9366e0209c2aad4294a) — kimgooneya — 2025-05-30 — F043 작업완료 _(core REST commit?author=kimgooneya)_
  - [8edfa189a842](https://github.com/langcodestartup/kyobo-pre-mvp/commit/8edfa189a8420e866e70261847c36fe1a2593de5) — kimgooneya — 2025-05-30 — 환경변수 수정 _(core REST commit?author=kimgooneya)_
  - [c07ae85160f2](https://github.com/langcodestartup/kyobo-pre-mvp/commit/c07ae85160f25f980e99545260b2fafbc69e7f93) — kimgooneya — 2025-05-30 — 코드 표기 오류 수정 _(core REST commit?author=kimgooneya)_
  - [8bcf71d30312](https://github.com/langcodestartup/kyobo-pre-mvp/commit/8bcf71d30312e8136e85e3a3775ba2b298cc006f) — kimgooneya — 2025-05-30 — F040 작업 완료 _(core REST commit?author=kimgooneya)_
  - [395656353129](https://github.com/langcodestartup/kyobo-pre-mvp/commit/3956563531294173ee3cc21cbcefe130b75978c9) — kimgooneya — 2025-05-30 — F042 작업완료 _(core REST commit?author=kimgooneya)_
  - [7b809d4089e0](https://github.com/langcodestartup/kyobo-pre-mvp/commit/7b809d4089e014753daba0a9146f7a7df7abc365) — kimgooneya — 2025-05-29 — F040 중간저장 _(core REST commit?author=kimgooneya)_
  - [7156fa35657b](https://github.com/langcodestartup/kyobo-pre-mvp/commit/7156fa35657b9b1850985943c801bf88332a2f78) — kimgooneya — 2025-05-29 — 마이너 변경 _(core REST commit?author=kimgooneya)_
  - [4e0270e63262](https://github.com/langcodestartup/kyobo-pre-mvp/commit/4e0270e6326299bc1519623257ad408b09db2232) — kimgooneya — 2025-05-29 — F029 완료 _(core REST commit?author=kimgooneya)_
  - [26e5ab674a72](https://github.com/langcodestartup/kyobo-pre-mvp/commit/26e5ab674a72d74661bb8d0b4e1c9df79bf2f2f6) — kimgooneya — 2025-05-29 — Merge branch 'master' of https://github.com/langcodestartup/kyobo-pre-mvp _(core REST commit?author=kimgooneya)_
  - [4153ef94e889](https://github.com/langcodestartup/kyobo-pre-mvp/commit/4153ef94e889f65843e19ff020511944b28add05) — kimgooneya — 2025-05-29 — F028 완료 _(core REST commit?author=kimgooneya)_
  - [c493083ed57d](https://github.com/langcodestartup/kyobo-pre-mvp/commit/c493083ed57d630cb0192969fc099915a7bc2336) — kimgooneya — 2025-05-29 — 환경변수 수정 _(core REST commit?author=kimgooneya)_
  - [b05d91a6de43](https://github.com/langcodestartup/kyobo-pre-mvp/commit/b05d91a6de4330355be70f95b3e4c04ead53041a) — kimgooneya — 2025-05-29 — 환경변경 _(core REST commit?author=kimgooneya)_
  - [7f54a1f206e9](https://github.com/langcodestartup/kyobo-pre-mvp/commit/7f54a1f206e97836e3edb8181e4f740a4feefa23) — kimgooneya — 2025-05-29 — F027 완료 _(core REST commit?author=kimgooneya)_
  - [03fa10ac3685](https://github.com/langcodestartup/kyobo-pre-mvp/commit/03fa10ac36858be33b64e27f036607b147695609) — kimgooneya — 2025-05-29 — F027 재작성 _(core REST commit?author=kimgooneya)_
  - [407f21a2e134](https://github.com/langcodestartup/kyobo-pre-mvp/commit/407f21a2e13403b98e06d2714da367d0a53a0185) — kimgooneya — 2025-05-29 — 설정 파일 추가 _(core REST commit?author=kimgooneya)_
  - [af1b1d233d60](https://github.com/langcodestartup/kyobo-pre-mvp/commit/af1b1d233d60ff80c99b39413ee8e9e0752904e4) — kimgooneya — 2025-05-29 — F026 기능 완료 _(core REST commit?author=kimgooneya)_
  - [a7f9f2a12c82](https://github.com/langcodestartup/kyobo-pre-mvp/commit/a7f9f2a12c823940e55ac02492f58a976b103255) — kimgooneya — 2025-05-29 — F026 작업 완료 _(core REST commit?author=kimgooneya)_
  - [76b77dce527a](https://github.com/langcodestartup/kyobo-pre-mvp/commit/76b77dce527a22f7fdcb5fac960d421facfc8a72) — kimgooneya — 2025-05-28 — 변경 반영 _(core REST commit?author=kimgooneya)_
  - [9c86941b316a](https://github.com/langcodestartup/kyobo-pre-mvp/commit/9c86941b316ae88f417f075958565a134f4ea73c) — kimgooneya — 2025-05-28 — 코드 관리를 위해서 분리 _(core REST commit?author=kimgooneya)_
  - [4752dc6157a6](https://github.com/langcodestartup/kyobo-pre-mvp/commit/4752dc6157a6800dd365a0108055e921dd546293) — kimgooneya — 2025-05-28 — Merge branch 'master' of https://github.com/langcodestartup/kyobo-pre-mvp _(core REST commit?author=kimgooneya)_
  - [5bfd79ab1d7e](https://github.com/langcodestartup/kyobo-pre-mvp/commit/5bfd79ab1d7e4f3d73ffba16ac5acef9ee96d380) — kimgooneya — 2025-05-28 — 위탁유형 타임스탬프 추가 _(core REST commit?author=kimgooneya)_
  - [9d1248de766a](https://github.com/langcodestartup/kyobo-pre-mvp/commit/9d1248de766ab84343e3b65d022b2dc581cc3ae5) — kimgooneya — 2025-05-28 — ## 위탁유형 \| 위촉 유형 구분 _(core REST commit?author=kimgooneya)_
  - [d54dd0ec3748](https://github.com/langcodestartup/kyobo-pre-mvp/commit/d54dd0ec37484f9b6b76750dccd7998a7d53495e) — kimgooneya — 2025-05-28 — ignore 항목 추가 _(core REST commit?author=kimgooneya)_
  - [5b3d52ce3f0a](https://github.com/langcodestartup/kyobo-pre-mvp/commit/5b3d52ce3f0a0bddbeebfce21ddd8c1b9d4468a7) — kimgooneya — 2025-05-28 — 미사용 항목 삭제 _(core REST commit?author=kimgooneya)_
  - [10a71be70f73](https://github.com/langcodestartup/kyobo-pre-mvp/commit/10a71be70f73c4e1b4c900fb1693c3ebf3081804) — kimgooneya — 2025-05-28 — 기본설정 _(core REST commit?author=kimgooneya)_
  - [772802cdedd2](https://github.com/langcodestartup/kyobo-pre-mvp/commit/772802cdedd22c6ee989b793a52f22a4430a828b) — kimgooneya — 2025-05-28 — 초기 설정 _(core REST commit?author=kimgooneya)_

## NolUniverseClientSide

- Repository: [langcodestartup/NolUniverseClientSide](https://github.com/langcodestartup/NolUniverseClientSide)
- Default branch: `master`; visibility: private; archived: no
- Branch inventory observed: 2 branch(es)
  - `master` (6b8aa73a86ba), `ui` (73b1b90e5c22)
- Search query state: **PARTIAL / one or more query errors**; successful result sets: 4
- Contribution evidence in current pass: **No matching authored commits, PRs, or issues returned by paginated core REST; reviewer/comment activity remains UNKNOWN because Search was rate-limited**.

## KyoboPrePoC

- Repository: [langcodestartup/KyoboPrePoC](https://github.com/langcodestartup/KyoboPrePoC)
- Default branch: `master`; visibility: private; archived: no
- Branch inventory observed: 3 branch(es)
  - `master` (77e26615d9e6), `work/add-jgagent` (6540b4266b43), `work/add-jgagent-documentdate` (dcfbd6208af1)
- Search query state: **PARTIAL / one or more query errors**; successful result sets: 4
- Matching commit records returned:
  - [77e26615d9e6](https://github.com/langcodestartup/KyoboPrePoC/commit/77e26615d9e635c20fe49c70daba0c63097fdb64) — kimgooneya — 2025-08-08 — 표시 형식 수정 - 오차 항목 노란색 표시 _(core REST commit?author=kimgooneya)_
  - [ab6ab0ea0c5e](https://github.com/langcodestartup/KyoboPrePoC/commit/ab6ab0ea0c5e8db71cb78b3158e2d0f621a58b84) — kimgooneya — 2025-08-04 — F1 오류 메세지 표시 방법 변경 _(core REST commit?author=kimgooneya)_
  - [3b79a315f72b](https://github.com/langcodestartup/KyoboPrePoC/commit/3b79a315f72b29d62cb2dafa91ec3f22af4866ed) — kimgooneya — 2025-08-04 — ChatMessageType 추가(None, Complete) _(core REST commit?author=kimgooneya)_
  - [162f23d80818](https://github.com/langcodestartup/KyoboPrePoC/commit/162f23d80818afdaba384e81753f02cfbc101a5b) — kimgooneya — 2025-08-04 — 0 보다 큰 값이 아닌 0 이 아닌 값이 나오도록 변경 _(core REST commit?author=kimgooneya)_
  - [8742d0510c79](https://github.com/langcodestartup/KyoboPrePoC/commit/8742d0510c797526b9aa9ffc4c0b91b59d61d4d9) — kimgooneya — 2025-08-04 — 0 보다 큰 값이 아닌 0이 아닌 값으로 조건 변경 _(core REST commit?author=kimgooneya)_
  - [de0c3bdcdd76](https://github.com/langcodestartup/KyoboPrePoC/commit/de0c3bdcdd76702b95fdab17ca43f14af1d237dd) — kimgooneya — 2025-08-04 — F3 기능 완료 _(core REST commit?author=kimgooneya)_
  - [df5c3420f550](https://github.com/langcodestartup/KyoboPrePoC/commit/df5c3420f5504fa840012e84bb4fdeb696e68a68) — kimgooneya — 2025-08-02 — F2 기능 답변 완료 _(core REST commit?author=kimgooneya)_
  - [da7756f96962](https://github.com/langcodestartup/KyoboPrePoC/commit/da7756f969620e4b63d105cc6133b8092ac2277e) — kimgooneya — 2025-08-02 — 코드 수정 _(core REST commit?author=kimgooneya)_
  - [9d90fe3d2987](https://github.com/langcodestartup/KyoboPrePoC/commit/9d90fe3d298708cee15465d253d1c94287c3d43e) — kimgooneya — 2025-08-01 — 오류 항목 bold 적용 _(core REST commit?author=kimgooneya)_
  - [c9d1fb9d9a46](https://github.com/langcodestartup/KyoboPrePoC/commit/c9d1fb9d9a468011d5974e381b55a780eacefc22) — kimgooneya — 2025-08-01 — Merge branch 'master' of https://github.com/langcodestartup/KyoboPrePoC _(core REST commit?author=kimgooneya)_
  - [2c50cfec8aa1](https://github.com/langcodestartup/KyoboPrePoC/commit/2c50cfec8aa1d36e46e55a228891cf4ab5f4a459) — kimgooneya — 2025-08-01 — 프롬프트 수정 + 응답 테이블 양식 수정 _(core REST commit?author=kimgooneya)_
  - [b82571f8fe90](https://github.com/langcodestartup/KyoboPrePoC/commit/b82571f8fe9016b2b8bbd1edce97c03043c95a53) — kimgooneya — 2025-08-01 — 호환성 문제 완벽 해결 _(core REST commit?author=kimgooneya)_
  - [d05dd51478ee](https://github.com/langcodestartup/KyoboPrePoC/commit/d05dd51478ee97d2f7f2d33413f426dabf10abf3) — kimgooneya — 2025-08-01 — 호환성 문제 해결 _(core REST commit?author=kimgooneya)_
  - [089f954f3e7f](https://github.com/langcodestartup/KyoboPrePoC/commit/089f954f3e7f77b4732b62d6913cfc5545267289) — kimgooneya — 2025-07-31 — F3 기능 블락 _(core REST commit?author=kimgooneya)_
  - [2e318dde9104](https://github.com/langcodestartup/KyoboPrePoC/commit/2e318dde9104fd54b19368505a0b6d1ad0fdfd25) — kimgooneya — 2025-07-31 — Merge branch 'master' of https://github.com/langcodestartup/KyoboPrePoC _(core REST commit?author=kimgooneya)_
  - [371f75553101](https://github.com/langcodestartup/KyoboPrePoC/commit/371f75553101ffcf8c96aa9c8721c1bb527fcc65) — kimgooneya — 2025-07-31 — validation 이름 조치 _(core REST commit?author=kimgooneya)_
  - [1e166e8ab68f](https://github.com/langcodestartup/KyoboPrePoC/commit/1e166e8ab68f6fbefd5b81dda6d15421f42f53f0) — kimgooneya — 2025-07-31 — F1 전체 검증 기능 수정 _(core REST commit?author=kimgooneya)_
  - [442f0ddb024a](https://github.com/langcodestartup/KyoboPrePoC/commit/442f0ddb024a3f5da049e8b789dad090e0f69236) — kimgooneya — 2025-07-31 — Merge branch 'master' of https://github.com/langcodestartup/KyoboPrePoC _(core REST commit?author=kimgooneya)_
  - [47263bad7858](https://github.com/langcodestartup/KyoboPrePoC/commit/47263bad78589538b5cb4f6077d1dd9ac76000d1) — kimgooneya — 2025-07-31 — F019 조치 완료 _(core REST commit?author=kimgooneya)_
  - [cc579ea89467](https://github.com/langcodestartup/KyoboPrePoC/commit/cc579ea89467f13b51f8eb994997daa0eca7eb12) — kimgooneya — 2025-07-31 — 리팩토링 반영 _(core REST commit?author=kimgooneya)_
  - [22fcbba05d98](https://github.com/langcodestartup/KyoboPrePoC/commit/22fcbba05d98a8019ea1e54a1e920bd8a92ad8fe) — kimgooneya — 2025-07-30 — 오류 지적 사항 반영 완료 _(core REST commit?author=kimgooneya)_
  - [65cc070c46a1](https://github.com/langcodestartup/KyoboPrePoC/commit/65cc070c46a16ffddd05f296b6f10754d09bb296) — kimgooneya — 2025-07-28 — G10 표시 항목 수정 _(core REST commit?author=kimgooneya)_
  - [3f9473318ff8](https://github.com/langcodestartup/KyoboPrePoC/commit/3f9473318ff8dc52af5f8a2973e7f538aa9f74c6) — kimgooneya — 2025-07-28 — G10 표시 작업 완료 _(core REST commit?author=kimgooneya)_
  - [30c8b24abb8f](https://github.com/langcodestartup/KyoboPrePoC/commit/30c8b24abb8fd78ef30fe4065d161938f921a395) — kimgooneya — 2025-07-24 — 작업 완료 _(core REST commit?author=kimgooneya)_
  - [0c5cbcbc2eb7](https://github.com/langcodestartup/KyoboPrePoC/commit/0c5cbcbc2eb76022dd76a07ac350815f7129261a) — kimgooneya — 2025-07-24 — ValidationResult json parsing 오류 수정 _(core REST commit?author=kimgooneya)_
  - [5d1498fb976b](https://github.com/langcodestartup/KyoboPrePoC/commit/5d1498fb976b87c5e12da826e978ccb2a31d026a) — kimgooneya — 2025-07-24 — F1 기능 완료 _(core REST commit?author=kimgooneya)_
  - [ddf1002e1d86](https://github.com/langcodestartup/KyoboPrePoC/commit/ddf1002e1d865b2ba605288d3ab28d4b61eda4a3) — kimgooneya — 2025-07-24 — 타임아웃 시간 5분으로 고정 _(core REST commit?author=kimgooneya)_
  - [dd8943d0d306](https://github.com/langcodestartup/KyoboPrePoC/commit/dd8943d0d3065dcfa6f220d34a261efdbb4bb502) — kimgooneya — 2025-07-24 — F1 기능 중간 점검용 _(core REST commit?author=kimgooneya)_
  - [2790711bbe76](https://github.com/langcodestartup/KyoboPrePoC/commit/2790711bbe76b583645bedb12debc80003341cb5) — kimgooneya — 2025-07-24 — ValidationResult 프로퍼티 변경 _(core REST commit?author=kimgooneya)_
  - [c3906b6e7474](https://github.com/langcodestartup/KyoboPrePoC/commit/c3906b6e74745de8bf8fb7284a104d91c65b1083) — kimgooneya — 2025-07-23 — 참조 코드 수정 _(core REST commit?author=kimgooneya)_
  - [ab7349269b51](https://github.com/langcodestartup/KyoboPrePoC/commit/ab7349269b510005515b595af727c4467c199458) — kimgooneya — 2025-07-22 — 테이블 보여주기 기능 완료 (#6) _(core REST commit?author=kimgooneya)_
  - [aeddf0c9283c](https://github.com/langcodestartup/KyoboPrePoC/commit/aeddf0c9283c7aeeee9451b25f2600242a24fc23) — kimgooneya — 2025-07-17 — 제규정 문서 파라미터 추출 기능 완료 (#5) _(core REST commit?author=kimgooneya)_
  - [4a41a6ee8ba6](https://github.com/langcodestartup/KyoboPrePoC/commit/4a41a6ee8ba6b03cb974741637d841b4f7804ec0) — kimgooneya — 2025-07-14 — 문서 내 파라미터 읽기 기능 완료 _(core REST commit?author=kimgooneya)_
  - [75baba4e75cc](https://github.com/langcodestartup/KyoboPrePoC/commit/75baba4e75cce6122cdca9d73f6b9e3f4c5ab04c) — kimgooneya — 2025-07-08 — 기능 단위 분석 기능 호출 _(core REST commit?author=kimgooneya)_
  - [762a244f08c3](https://github.com/langcodestartup/KyoboPrePoC/commit/762a244f08c3a1275f389d642004f5575aff06f3) — kimgooneya — 2025-07-07 — 표기 수정 _(core REST commit?author=kimgooneya)_
  - [f146e042aca0](https://github.com/langcodestartup/KyoboPrePoC/commit/f146e042aca07083b22513d0bf0baf6af6e50d1e) — kimgooneya — 2025-07-07 — 교보 플러그인 전체 테스크 동작 방식 변경 _(core REST commit?author=kimgooneya)_
  - [0cdbd459e4b8](https://github.com/langcodestartup/KyoboPrePoC/commit/0cdbd459e4b884821eccbafa3e0c4c787f89ef96) — kimgooneya — 2025-06-30 — Semantic kernel 응답 작업 완료 _(core REST commit?author=kimgooneya)_
  - [69e0587eb08e](https://github.com/langcodestartup/KyoboPrePoC/commit/69e0587eb08e79c5d4ad8e0059f5f02af208cf4a) — kimgooneya — 2025-06-30 — Kernel 기능 완료 _(core REST commit?author=kimgooneya)_
  - [72613f328212](https://github.com/langcodestartup/KyoboPrePoC/commit/72613f328212c74f04f70a18c647c9aee68b20bb) — kimgooneya — 2025-06-28 — 패키지 오류 정정 _(core REST commit?author=kimgooneya)_
  - [2fd02310af38](https://github.com/langcodestartup/KyoboPrePoC/commit/2fd02310af3824b9b1fe380e9c77d183106b2528) — kimgooneya — 2025-06-26 — 파일명 수정 _(core REST commit?author=kimgooneya)_
  - [2729f609662a](https://github.com/langcodestartup/KyoboPrePoC/commit/2729f609662a9802769988a03b8cedb9eb614bc2) — kimgooneya — 2025-06-26 — 교보 모듈 작업 완료 (#3) _(core REST commit?author=kimgooneya)_
  - [aa9357d46687](https://github.com/langcodestartup/KyoboPrePoC/commit/aa9357d466878a291f5075b57539f9a7f17adf69) — kimgooneya — 2025-06-19 — Merge branch 'master' of https://github.com/langcodestartup/KyoboPrePoC _(core REST commit?author=kimgooneya)_
  - [7a28ddac81fd](https://github.com/langcodestartup/KyoboPrePoC/commit/7a28ddac81fd8acff6f3ba0d0f600db7e6c47180) — kimgooneya — 2025-06-19 — 미사용 using삭제 _(core REST commit?author=kimgooneya)_
  - [5ce9e176b612](https://github.com/langcodestartup/KyoboPrePoC/commit/5ce9e176b61206efbe79ad5764a52d84ff20cb37) — kimgooneya — 2025-06-19 — 최신 문서 적용 _(core REST commit?author=kimgooneya)_
  - [402d9ae973df](https://github.com/langcodestartup/KyoboPrePoC/commit/402d9ae973df7b387e7bcdd73515ce9ccfb96447) — kimgooneya — 2025-06-18 — xlsb 확장자 지원 _(core REST commit?author=kimgooneya)_
  - [130bd666203a](https://github.com/langcodestartup/KyoboPrePoC/commit/130bd666203af96cad9ebb56f3e830ddf03b0b07) — kimgooneya — 2025-06-18 — 파일 경로 처리 오류 수정 _(core REST commit?author=kimgooneya)_
  - [d69febdf4e9d](https://github.com/langcodestartup/KyoboPrePoC/commit/d69febdf4e9d284e79dceae2dd2a7831336cadc8) — kimgooneya — 2025-06-17 — azure function 통합 기능 완료(#2) _(core REST commit?author=kimgooneya)_
  - [4c1ef3cf62de](https://github.com/langcodestartup/KyoboPrePoC/commit/4c1ef3cf62ded51ef10c5c56170471dd77d4f881) — kimgooneya — 2025-06-17 — API 답변 가능 상태 _(core REST commit?author=kimgooneya)_
  - [7a2c8bdf1cf5](https://github.com/langcodestartup/KyoboPrePoC/commit/7a2c8bdf1cf5caf405fd3244c478a725bbb6cdbe) — kimgooneya — 2025-06-17 — API 답변 가능 상태 _(core REST commit?author=kimgooneya)_
  - [958d1742e426](https://github.com/langcodestartup/KyoboPrePoC/commit/958d1742e42681b8c8db6aa3fd174af5fada041a) — kimgooneya — 2025-06-16 — 프로젝트 정리 _(core REST commit?author=kimgooneya)_
- Matching issue/PR records returned:
  - PR [#6 테이블 보여주기 기능 완료](https://github.com/langcodestartup/KyoboPrePoC/pull/6) — login kimgooneya — opened 2025-07-22 — state closed — merged 2025-07-22 _(core REST)_
  - PR [#5 제규정 문서 파라미터 추출 기능 완료](https://github.com/langcodestartup/KyoboPrePoC/pull/5) — login kimgooneya — opened 2025-07-15 — state closed — merged 2025-07-17 _(core REST)_
  - PR [#4 문서 내 파라미터 읽기 기능 완료](https://github.com/langcodestartup/KyoboPrePoC/pull/4) — login kimgooneya — opened 2025-07-14 — state closed — merged 2025-07-14 _(core REST)_
  - PR [#3 교보 모듈 작업 완료](https://github.com/langcodestartup/KyoboPrePoC/pull/3) — login kimgooneya — opened 2025-06-26 — state closed — merged 2025-06-26 _(core REST)_
  - PR [#2 azure function 통합 기능 성공](https://github.com/langcodestartup/KyoboPrePoC/pull/2) — login kimgooneya — opened 2025-06-17 — state closed — merged 2025-06-17 _(core REST)_
  - PR [#1 API 답변 가능 상태](https://github.com/langcodestartup/KyoboPrePoC/pull/1) — login kimgooneya — opened 2025-06-17 — state closed — merged 2025-06-17 _(core REST)_

## KyoboPrePoC-Function

- Repository: [langcodestartup/KyoboPrePoC-Function](https://github.com/langcodestartup/KyoboPrePoC-Function)
- Default branch: `main`; visibility: private; archived: no
- Branch inventory observed: 5 branch(es)
  - `group` (788ed106ce34), `main` (d59938dbacd0), `work/fix-rowdata-errormessage` (ecee19ac25ce), `work/group15sum` (536c64cb296c), `work/test-feature` (d710859ae94f)
- Search query state: **PARTIAL / one or more query errors**; successful result sets: 4
- Matching commit records returned:
  - [d59938dbacd0](https://github.com/langcodestartup/KyoboPrePoC-Function/commit/d59938dbacd09bbbcf08d2295330000c8172fdff) — kimgooneya — 2025-08-08 — F049 오류 내용 중 오차 값 표기 삭제 _(core REST commit?author=kimgooneya)_
  - [d04f984649d6](https://github.com/langcodestartup/KyoboPrePoC-Function/commit/d04f984649d689693b64efce24fa6002ed5cf60a) — kimgooneya — 2025-08-05 — 엑셀 범위 지정 스타일 적용 _(core REST commit?author=kimgooneya)_
  - [de212e3e95ab](https://github.com/langcodestartup/KyoboPrePoC-Function/commit/de212e3e95ab644db0f96e37c87f208bbbfccce8) — kimgooneya — 2025-08-05 — save output path excel _(core REST commit?author=kimgooneya)_
  - [27c714863a4f](https://github.com/langcodestartup/KyoboPrePoC-Function/commit/27c714863a4f04a4afa2ed66941445b37fef74b8) — kimgooneya — 2025-08-04 — Merge branch 'main' of https://github.com/langcodestartup/KyoboPrePoC-Function _(core REST commit?author=kimgooneya)_
  - [81a74ff95976](https://github.com/langcodestartup/KyoboPrePoC-Function/commit/81a74ff959762bcf90a1eb4caa229be7290155c6) — kimgooneya — 2025-08-04 — 엑셀 저장 기능 완료 _(core REST commit?author=kimgooneya)_
  - [8a699e330c3c](https://github.com/langcodestartup/KyoboPrePoC-Function/commit/8a699e330c3c19c4091571e3a53bfcf4552a6f17) — kimgooneya — 2025-08-04 — 기본 로깅 및 필요없는 설정 삭제 _(core REST commit?author=kimgooneya)_
  - [c6f706d8cdf9](https://github.com/langcodestartup/KyoboPrePoC-Function/commit/c6f706d8cdf921ac3d88a6984f5cc8b48a2b41ac) — kimgooneya — 2025-08-04 — import 정리 _(core REST commit?author=kimgooneya)_
  - [38d62f73f9e3](https://github.com/langcodestartup/KyoboPrePoC-Function/commit/38d62f73f9e3a2da139c7e32964d9a53917bcaee) — kimgooneya — 2025-08-04 — F081 수정 _(core REST commit?author=kimgooneya)_
  - [05448ed7f25f](https://github.com/langcodestartup/KyoboPrePoC-Function/commit/05448ed7f25f0d35cd8da991512be22ab4a308ea) — kimgooneya — 2025-08-04 — 미사용 기능 삭제 _(core REST commit?author=kimgooneya)_
  - [bcd9775f0143](https://github.com/langcodestartup/KyoboPrePoC-Function/commit/bcd9775f0143ff3090fedefcfa55eda4c38d2437) — kimgooneya — 2025-08-04 — F028 프라임리더스 클럽 명칭 정정 _(core REST commit?author=kimgooneya)_
  - [6ae99cce37cc](https://github.com/langcodestartup/KyoboPrePoC-Function/commit/6ae99cce37cc47250a2b2a7021ae4e726a41abe0) — kimgooneya — 2025-08-04 — F022 오류 수정 _(core REST commit?author=kimgooneya)_
  - [9f1fa188ad04](https://github.com/langcodestartup/KyoboPrePoC-Function/commit/9f1fa188ad0498947871dd3f7456c232e06e34b2) — kimgooneya — 2025-08-04 — F073 불러오는 파일 이름 수정 _(core REST commit?author=kimgooneya)_
  - [de89b9f4baf8](https://github.com/langcodestartup/KyoboPrePoC-Function/commit/de89b9f4baf88d29b0e421d6445c688402e2a6c2) — kimgooneya — 2025-08-04 — F049 불러오는 파일 이름 수정 _(core REST commit?author=kimgooneya)_
  - [d47862a2c9aa](https://github.com/langcodestartup/KyoboPrePoC-Function/commit/d47862a2c9aa9fa08b27f3ca180422f10189efab) — kimgooneya — 2025-08-04 — F027 제목 수정 _(core REST commit?author=kimgooneya)_
  - [d786942422d6](https://github.com/langcodestartup/KyoboPrePoC-Function/commit/d786942422d62bede7507b652334d7b57048eaf4) — kimgooneya — 2025-08-04 — F025 제목 수정 _(core REST commit?author=kimgooneya)_
  - [2c08ffdc228a](https://github.com/langcodestartup/KyoboPrePoC-Function/commit/2c08ffdc228a567aec59e424041e90e0c1665f01) — kimgooneya — 2025-08-04 — base.py 불필요한 오류 추출 코드 삭제 _(core REST commit?author=kimgooneya)_
  - [a18d427905e6](https://github.com/langcodestartup/KyoboPrePoC-Function/commit/a18d427905e67e28a2ffca0c33b5d6e82ffa9c7e) — kimgooneya — 2025-08-04 — f022 조직코드 오류 수정 _(core REST commit?author=kimgooneya)_
  - [e21e83930377](https://github.com/langcodestartup/KyoboPrePoC-Function/commit/e21e83930377d32d5a9049fc614c694579533f5c) — kimgooneya — 2025-08-04 — 불필요한 컬럼 로드 수정 _(core REST commit?author=kimgooneya)_
  - [8b7c1f6f270c](https://github.com/langcodestartup/KyoboPrePoC-Function/commit/8b7c1f6f270c4b2d5f92d8abba67efb80d464e33) — kimgooneya — 2025-08-04 — diff aggregate 조건 변경 _(core REST commit?author=kimgooneya)_
  - [121075524e1d](https://github.com/langcodestartup/KyoboPrePoC-Function/commit/121075524e1de6aadad018e8fb25c7b7988b95c0) — kimgooneya — 2025-08-04 — ignor 추가 _(core REST commit?author=kimgooneya)_
  - [ec6b9f9e6a70](https://github.com/langcodestartup/KyoboPrePoC-Function/commit/ec6b9f9e6a70216ff0610afee3abd1de2541d0af) — kimgooneya — 2025-08-04 — 검증 단어 삭제 _(core REST commit?author=kimgooneya)_
  - [ee670f8e6e75](https://github.com/langcodestartup/KyoboPrePoC-Function/commit/ee670f8e6e75928782cdf741481e2afe8aa90bfe) — kimgooneya — 2025-08-03 — 미사용 컬럼 출력 오류 수정 _(core REST commit?author=kimgooneya)_
  - [f697a81b08a2](https://github.com/langcodestartup/KyoboPrePoC-Function/commit/f697a81b08a2047348ef7db11989d638fda8b940) — kimgooneya — 2025-08-03 — F3 기능 완료 _(core REST commit?author=kimgooneya)_
  - [3186ecf41c0b](https://github.com/langcodestartup/KyoboPrePoC-Function/commit/3186ecf41c0b3d15783ea7e2a8e2fa8dcd965e6c) — kimgooneya — 2025-08-03 — F3 기능 완료 _(core REST commit?author=kimgooneya)_
  - [904aa21a5a3c](https://github.com/langcodestartup/KyoboPrePoC-Function/commit/904aa21a5a3c222ee7745481fd370b76829b1ee9) — kimgooneya — 2025-08-02 — F019 수정 _(core REST commit?author=kimgooneya)_
  - [ac65ee01b137](https://github.com/langcodestartup/KyoboPrePoC-Function/commit/ac65ee01b137bfd408562d7b764276609995b6ed) — kimgooneya — 2025-08-02 — 오타수정 _(core REST commit?author=kimgooneya)_
  - [78f957694567](https://github.com/langcodestartup/KyoboPrePoC-Function/commit/78f957694567d4439e0cb6e79b05ff533f581713) — kimgooneya — 2025-08-02 — F081 오타 수정 _(core REST commit?author=kimgooneya)_
  - [331e5b8624a1](https://github.com/langcodestartup/KyoboPrePoC-Function/commit/331e5b8624a14194d652f62013189ed26984a0ed) — kimgooneya — 2025-08-02 — F040 오타 수정 _(core REST commit?author=kimgooneya)_
  - [3e067d87a205](https://github.com/langcodestartup/KyoboPrePoC-Function/commit/3e067d87a205f4516c58de86fd19f1aeb1c0aebc) — kimgooneya — 2025-08-01 — 로그 수정 _(core REST commit?author=kimgooneya)_
  - [c69ddf4ca0d0](https://github.com/langcodestartup/KyoboPrePoC-Function/commit/c69ddf4ca0d0bb8ef5c8a8ec677591d240f6cf75) — kimgooneya — 2025-08-01 — thread safe logger _(core REST commit?author=kimgooneya)_
  - [e4b529773a0f](https://github.com/langcodestartup/KyoboPrePoC-Function/commit/e4b529773a0f1a2de6de9f1e23c54f89b655fe24) — kimgooneya — 2025-08-01 — Merge branch 'main' of https://github.com/langcodestartup/KyoboPrePoC-Function _(core REST commit?author=kimgooneya)_
  - [978da23fad69](https://github.com/langcodestartup/KyoboPrePoC-Function/commit/978da23fad692ea72615dfe4a6858074901fe618) — kimgooneya — 2025-08-01 — 로거 설정 변경 _(core REST commit?author=kimgooneya)_
  - [6698940bf40d](https://github.com/langcodestartup/KyoboPrePoC-Function/commit/6698940bf40d8f98f2f490f7673025f191e90e81) — kimgooneya — 2025-08-01 — excel save 중간 저장 _(core REST commit?author=kimgooneya)_
  - [97061f1154c6](https://github.com/langcodestartup/KyoboPrePoC-Function/commit/97061f1154c6cc033777b8b54eccc5dea566a64d) — kimgooneya — 2025-08-01 — Merge branch 'main' of https://github.com/langcodestartup/KyoboPrePoC-Function _(core REST commit?author=kimgooneya)_
  - [af39f8a3fbad](https://github.com/langcodestartup/KyoboPrePoC-Function/commit/af39f8a3fbad0cc013efabb07d2f4a6a9a7d003f) — kimgooneya — 2025-08-01 — 파일명 얻기 수정 _(core REST commit?author=kimgooneya)_
  - [db5e282c01e4](https://github.com/langcodestartup/KyoboPrePoC-Function/commit/db5e282c01e4c986c865bf984517e23b4c0e83fb) — kimgooneya — 2025-07-31 — Merge branch 'main' of https://github.com/langcodestartup/KyoboPrePoC-Function _(core REST commit?author=kimgooneya)_
  - [5ca169fb830f](https://github.com/langcodestartup/KyoboPrePoC-Function/commit/5ca169fb830fbe0df0fe5f94dc4b3b418e07ca46) — kimgooneya — 2025-07-31 — F081 수정 _(core REST commit?author=kimgooneya)_
  - [cb8c7267c3b3](https://github.com/langcodestartup/KyoboPrePoC-Function/commit/cb8c7267c3b3cb18ba3919dd9a226da6511c167f) — kimgooneya — 2025-07-31 — F077 수정 _(core REST commit?author=kimgooneya)_
  - [1bdbc16b7bcb](https://github.com/langcodestartup/KyoboPrePoC-Function/commit/1bdbc16b7bcb0276f3f13154a7ebdd97ac181761) — kimgooneya — 2025-07-31 — F115 오류 수정 _(core REST commit?author=kimgooneya)_
  - [add32d899625](https://github.com/langcodestartup/KyoboPrePoC-Function/commit/add32d899625bf77659927a0cc50788e16d2c0fd) — kimgooneya — 2025-07-31 — 제외 지점 대상 삭제 _(core REST commit?author=kimgooneya)_
  - [fb21d15fcffe](https://github.com/langcodestartup/KyoboPrePoC-Function/commit/fb21d15fcffe94e93694f8414e87f651c697b83f) — kimgooneya — 2025-07-31 — F114 조치 완료 _(core REST commit?author=kimgooneya)_
  - [01c20a158c8a](https://github.com/langcodestartup/KyoboPrePoC-Function/commit/01c20a158c8ab95805f2a2c13e4c17d049815167) — kimgooneya — 2025-07-31 — 변경 내용 반영 _(core REST commit?author=kimgooneya)_
  - [f67bc9cc5d64](https://github.com/langcodestartup/KyoboPrePoC-Function/commit/f67bc9cc5d64c1e892dc7b8fd1884f4e8fb95ca3) — kimgooneya — 2025-07-31 — F077 수정 _(core REST commit?author=kimgooneya)_
  - [ea33cce154e9](https://github.com/langcodestartup/KyoboPrePoC-Function/commit/ea33cce154e9e7e18b395409c94d6956d8e87678) — kimgooneya — 2025-07-31 — 기준 코드 수정 _(core REST commit?author=kimgooneya)_
  - [d106d0df83a7](https://github.com/langcodestartup/KyoboPrePoC-Function/commit/d106d0df83a7aca348d0ff9072cfe09130750aca) — kimgooneya — 2025-07-31 — 조치 완료 _(core REST commit?author=kimgooneya)_
  - [1292407be17a](https://github.com/langcodestartup/KyoboPrePoC-Function/commit/1292407be17abcde9a29fdc42adb0834a3ae8ce0) — kimgooneya — 2025-07-31 — 최적화 변경 내용 반영 _(core REST commit?author=kimgooneya)_
  - [6a897283a653](https://github.com/langcodestartup/KyoboPrePoC-Function/commit/6a897283a653dfab191640ec13c2b3625d36618e) — kimgooneya — 2025-07-31 — F2 기능 오류 없으면 지점 정보 스킵 _(core REST commit?author=kimgooneya)_
  - [b914d91511bd](https://github.com/langcodestartup/KyoboPrePoC-Function/commit/b914d91511bdae44598a6da0a684a9930fe22676) — kimgooneya — 2025-07-29 — F045 컬럼명 수정 _(core REST commit?author=kimgooneya)_
  - [8aae75af47eb](https://github.com/langcodestartup/KyoboPrePoC-Function/commit/8aae75af47eb35d2f26123d3a97654eec406e963) — kimgooneya — 2025-07-29 — F030 F031 시트 정보 수정 _(core REST commit?author=kimgooneya)_
  - [67efec4f4b5e](https://github.com/langcodestartup/KyoboPrePoC-Function/commit/67efec4f4b5e2ffe54fdcd7d79092a2ed4d1e710) — kimgooneya — 2025-07-29 — F028 merge 옵션 수정 _(core REST commit?author=kimgooneya)_
  - [bb99b975a419](https://github.com/langcodestartup/KyoboPrePoC-Function/commit/bb99b975a4195a9b6417ac621785eca68bfdbdbc) — kimgooneya — 2025-07-29 — loguru 변경 적용 및 한글 지원 _(core REST commit?author=kimgooneya)_
  - [3d1bb7a695c2](https://github.com/langcodestartup/KyoboPrePoC-Function/commit/3d1bb7a695c2f421c782986ac270f5b15d582dfd) — kimgooneya — 2025-07-29 — F022 G10 항목 그대로 반환 _(core REST commit?author=kimgooneya)_
  - [7d70f7fa6eb5](https://github.com/langcodestartup/KyoboPrePoC-Function/commit/7d70f7fa6eb5f278f97a620b8153207ef0e5273a) — kimgooneya — 2025-07-29 — F073 단순 파일 정리 _(core REST commit?author=kimgooneya)_
  - [3bb56e3cbacb](https://github.com/langcodestartup/KyoboPrePoC-Function/commit/3bb56e3cbacbb52c18ffc40786637500ac958517) — kimgooneya — 2025-07-29 — F052 검증 로직 수정 _(core REST commit?author=kimgooneya)_
  - [fa44c3c41148](https://github.com/langcodestartup/KyoboPrePoC-Function/commit/fa44c3c4114888721790ae749f59989251a4fd36) — kimgooneya — 2025-07-29 — F048 get sum result 수정 _(core REST commit?author=kimgooneya)_
  - [7394657c5852](https://github.com/langcodestartup/KyoboPrePoC-Function/commit/7394657c5852959f317c88810d3599b077f50397) — kimgooneya — 2025-07-29 — F047 get sum result 수정 _(core REST commit?author=kimgooneya)_
  - [f39a8fdf6684](https://github.com/langcodestartup/KyoboPrePoC-Function/commit/f39a8fdf66849e1b708b4707ce6dd3aabf258223) — kimgooneya — 2025-07-29 — F045 참조 시트 정보 이름 오류 수정 _(core REST commit?author=kimgooneya)_
  - [64b280598366](https://github.com/langcodestartup/KyoboPrePoC-Function/commit/64b280598366dbe3547fc4563d9f6a1410344a37) — kimgooneya — 2025-07-28 — F042 오류 수정 _(core REST commit?author=kimgooneya)_
  - [7d9fe01505ae](https://github.com/langcodestartup/KyoboPrePoC-Function/commit/7d9fe01505aed7c3e7af0caca18e5ad77b76c7c1) — kimgooneya — 2025-07-28 — G10 DF merge 변경 _(core REST commit?author=kimgooneya)_
  - [317741e56011](https://github.com/langcodestartup/KyoboPrePoC-Function/commit/317741e56011fec48a8f8b560ee943fac3754dd6) — kimgooneya — 2025-07-28 — F028 df merge _(core REST commit?author=kimgooneya)_
  - [2e428991231a](https://github.com/langcodestartup/KyoboPrePoC-Function/commit/2e428991231a6790327e0a43161b279adc70947c) — kimgooneya — 2025-07-28 — F027 df merge 변경 _(core REST commit?author=kimgooneya)_
  - [255c1fc706cc](https://github.com/langcodestartup/KyoboPrePoC-Function/commit/255c1fc706cc1bb93e8c5d5e418aeb29d934c8a0) — kimgooneya — 2025-07-28 — F025 df merge 변경 _(core REST commit?author=kimgooneya)_
  - [381413899d14](https://github.com/langcodestartup/KyoboPrePoC-Function/commit/381413899d14f0b1b759bd86ca3d421c8fe1da78) — kimgooneya — 2025-07-28 — 로거 변경 _(core REST commit?author=kimgooneya)_
  - [01da280a35e7](https://github.com/langcodestartup/KyoboPrePoC-Function/commit/01da280a35e79735304d5760b0af90077b76a2ea) — kimgooneya — 2025-07-28 — Merge branch 'main' of https://github.com/langcodestartup/KyoboPrePoC-Function _(core REST commit?author=kimgooneya)_
  - [27189bd1128c](https://github.com/langcodestartup/KyoboPrePoC-Function/commit/27189bd1128c520a0f51d4607819046234c3aa0e) — kimgooneya — 2025-07-28 — 로거 추가 _(core REST commit?author=kimgooneya)_
  - [804d6bf3013a](https://github.com/langcodestartup/KyoboPrePoC-Function/commit/804d6bf3013a701a068c95697b3f829e315cc5bb) — kimgooneya — 2025-07-28 — 로거 변경 _(core REST commit?author=kimgooneya)_
  - [9669d533fb59](https://github.com/langcodestartup/KyoboPrePoC-Function/commit/9669d533fb59fb82a58318a68bdc6251819f0140) — kimgooneya — 2025-07-28 — F022 변경 _(core REST commit?author=kimgooneya)_
  - [6f87ed44b51b](https://github.com/langcodestartup/KyoboPrePoC-Function/commit/6f87ed44b51bec62b5e4ffc569f482bdff174e9f) — kimgooneya — 2025-07-28 — 로거 변경 _(core REST commit?author=kimgooneya)_
  - [20b8f2bdadeb](https://github.com/langcodestartup/KyoboPrePoC-Function/commit/20b8f2bdadeb3c26b73f4ad6d713f1e264983e7c) — kimgooneya — 2025-07-24 — F3 기능 완료 _(core REST commit?author=kimgooneya)_
  - [16764b1eaf49](https://github.com/langcodestartup/KyoboPrePoC-Function/commit/16764b1eaf4981c1eb804e46f7dc299cbc4000ee) — kimgooneya — 2025-07-24 — Merge branch 'main' of https://github.com/langcodestartup/KyoboPrePoC-Function _(core REST commit?author=kimgooneya)_
  - [a85dae755ad9](https://github.com/langcodestartup/KyoboPrePoC-Function/commit/a85dae755ad952d08b9e2ebe0236dc232a19e17d) — kimgooneya — 2025-07-24 — 배포준비 _(core REST commit?author=kimgooneya)_
  - [759ede322a96](https://github.com/langcodestartup/KyoboPrePoC-Function/commit/759ede322a967d435a5acf5aa531e5df471ec741) — kimgooneya — 2025-07-24 — F081 _(core REST commit?author=kimgooneya)_
  - [f1dbb7a9f629](https://github.com/langcodestartup/KyoboPrePoC-Function/commit/f1dbb7a9f62983874babb4074ce0555f5dbfb32a) — kimgooneya — 2025-07-24 — F071, F072 _(core REST commit?author=kimgooneya)_
  - [3cb48a04ebfd](https://github.com/langcodestartup/KyoboPrePoC-Function/commit/3cb48a04ebfda06abefe0a9aeb1c89c480d9587a) — kimgooneya — 2025-07-24 — SheetConfig 수정 _(core REST commit?author=kimgooneya)_
  - [e78107370814](https://github.com/langcodestartup/KyoboPrePoC-Function/commit/e78107370814f42446acf0f9749cf0b8cd0615f3) — kimgooneya — 2025-07-24 — vaildated_feature 포함 여부 삭제 _(core REST commit?author=kimgooneya)_
  - [666d40e844d7](https://github.com/langcodestartup/KyoboPrePoC-Function/commit/666d40e844d7f8bd69c785afb47ae0851b187b94) — kimgooneya — 2025-07-24 — Base 수정, 저장 경로 상단, Valid 처리 잠시 취소 _(core REST commit?author=kimgooneya)_
  - [163524e38bcd](https://github.com/langcodestartup/KyoboPrePoC-Function/commit/163524e38bcd0c961ee340b2a87909d8a06a0e53) — kimgooneya — 2025-07-24 — Work/new-f1 (#8) _(core REST commit?author=kimgooneya)_
  - [3f1574cec6b0](https://github.com/langcodestartup/KyoboPrePoC-Function/commit/3f1574cec6b0db2ebea0d4025d1225f9d3133584) — kimgooneya — 2025-07-24 — f2 작업 완료 _(core REST commit?author=kimgooneya)_
  - [889fa7848933](https://github.com/langcodestartup/KyoboPrePoC-Function/commit/889fa784893345a63d8e1f8f4c43aedeb61f840e) — kimgooneya — 2025-07-24 — 명칭 정리 및 번경 _(core REST commit?author=kimgooneya)_
  - [d210a79a2841](https://github.com/langcodestartup/KyoboPrePoC-Function/commit/d210a79a28416ec13859503b1ad887ec13dd19a2) — kimgooneya — 2025-07-24 — 명칭 정리 및 변경 _(core REST commit?author=kimgooneya)_
  - [20036d244fe0](https://github.com/langcodestartup/KyoboPrePoC-Function/commit/20036d244fe0caf387b2ac6eed052c94b51b7671) — kimgooneya — 2025-07-24 — G10 F053 complete _(core REST commit?author=kimgooneya)_
  - [61539b0aee8b](https://github.com/langcodestartup/KyoboPrePoC-Function/commit/61539b0aee8b8a2c447fba65bd64f0b3acb9f61a) — kimgooneya — 2025-07-24 — G10 F052 complete _(core REST commit?author=kimgooneya)_
  - [2823b5445a51](https://github.com/langcodestartup/KyoboPrePoC-Function/commit/2823b5445a512c03d1d9959a920b2d2c7d12d145) — kimgooneya — 2025-07-24 — G10 F051 complete _(core REST commit?author=kimgooneya)_
  - [e018f023c542](https://github.com/langcodestartup/KyoboPrePoC-Function/commit/e018f023c542f4c1a7d10355f1652e6a10ec9e35) — kimgooneya — 2025-07-24 — G10 F50 complete _(core REST commit?author=kimgooneya)_
  - [85ff979dd1bc](https://github.com/langcodestartup/KyoboPrePoC-Function/commit/85ff979dd1bca2bd5ca777cf2ed61a5aa8ea6d6c) — kimgooneya — 2025-07-24 — G10 F049 complete _(core REST commit?author=kimgooneya)_
  - [096ae56df72c](https://github.com/langcodestartup/KyoboPrePoC-Function/commit/096ae56df72c3bfb16a10b2efc36859aa4b52c31) — kimgooneya — 2025-07-24 — G10 F048 complete _(core REST commit?author=kimgooneya)_
  - [8a10fdf2ad2c](https://github.com/langcodestartup/KyoboPrePoC-Function/commit/8a10fdf2ad2c581ad4dfb4b52fbd2d03cb8eec37) — kimgooneya — 2025-07-24 — G10 features dataframe copy _(core REST commit?author=kimgooneya)_
  - [b98ed13f043d](https://github.com/langcodestartup/KyoboPrePoC-Function/commit/b98ed13f043ded8671f94b9a6778309ca1b920f9) — kimgooneya — 2025-07-24 — G10 F047 complete _(core REST commit?author=kimgooneya)_
  - [b47f0bb7d4ba](https://github.com/langcodestartup/KyoboPrePoC-Function/commit/b47f0bb7d4ba8f4aa1e753ec2cb651fb35f24cfc) — kimgooneya — 2025-07-24 — G10 F046 complete _(core REST commit?author=kimgooneya)_
  - [ea0c7d7c460d](https://github.com/langcodestartup/KyoboPrePoC-Function/commit/ea0c7d7c460de2828d399b9704f9a66deeecfa5c) — kimgooneya — 2025-07-24 — G10 F045 complete _(core REST commit?author=kimgooneya)_
  - [14e78cd0fa08](https://github.com/langcodestartup/KyoboPrePoC-Function/commit/14e78cd0fa08dd35f4e8533b85d9cb2645a750da) — kimgooneya — 2025-07-24 — G10 F043 complete _(core REST commit?author=kimgooneya)_
  - [1fd6987d49cd](https://github.com/langcodestartup/KyoboPrePoC-Function/commit/1fd6987d49cd261f2abf9f734b683aa8152e4fee) — kimgooneya — 2025-07-23 — G10 F042 complete _(core REST commit?author=kimgooneya)_
  - [352a98901fe0](https://github.com/langcodestartup/KyoboPrePoC-Function/commit/352a98901fe0f631e68fe70847916a45a9ac632c) — kimgooneya — 2025-07-23 — Work/validation_result (#7) _(core REST commit?author=kimgooneya)_
  - [c5ca3ebb4128](https://github.com/langcodestartup/KyoboPrePoC-Function/commit/c5ca3ebb4128a5c0ac00d7180332dfc38681047b) — kimgooneya — 2025-07-23 — Work/validation_result (#6) _(core REST commit?author=kimgooneya)_
  - [da47446bad10](https://github.com/langcodestartup/KyoboPrePoC-Function/commit/da47446bad10160af2217961544a518287cf233a) — kimgooneya — 2025-07-17 — 최신 변경 내용 반영 (#4) _(core REST commit?author=kimgooneya)_
  - [17c33ae3ee36](https://github.com/langcodestartup/KyoboPrePoC-Function/commit/17c33ae3ee361fd6ec06e8c8c94c139dd94838a9) — kimgooneya — 2025-07-16 — 검증용 기능 수정 (#2) _(core REST commit?author=kimgooneya)_
  - [7cd890399451](https://github.com/langcodestartup/KyoboPrePoC-Function/commit/7cd8903994512c2b1560f41cb9f61ae701c04c85) — kimgooneya — 2025-07-15 — Cosmos DB를 이용한 Params 로딩 및 적용 _(core REST commit?author=kimgooneya)_
  - [d649ba607c50](https://github.com/langcodestartup/KyoboPrePoC-Function/commit/d649ba607c503834b6db6f239aa23f72d27eb0c6) — kimgooneya — 2025-07-08 — 분석기능 추가 _(core REST commit?author=kimgooneya)_
  - [3f601c04f64a](https://github.com/langcodestartup/KyoboPrePoC-Function/commit/3f601c04f64a142d8f063a028b1659f1c3bb2abb) — kimgooneya — 2025-07-07 — csv read converter None 기본값 추가 _(core REST commit?author=kimgooneya)_
  - [4fdc7dba0a6f](https://github.com/langcodestartup/KyoboPrePoC-Function/commit/4fdc7dba0a6f4896cbf2d25dd5d27299a2f38f42) — kimgooneya — 2025-07-05 — 함수 기능 수정 _(core REST commit?author=kimgooneya)_
  - [273102ac5407](https://github.com/langcodestartup/KyoboPrePoC-Function/commit/273102ac5407f711256307500249db1123215127) — kimgooneya — 2025-07-03 — f081 기능 추가 - f040 이후 연계 검증 _(core REST commit?author=kimgooneya)_
  - [e93c1fc1b288](https://github.com/langcodestartup/KyoboPrePoC-Function/commit/e93c1fc1b288758f969f7bf0a8d73e08bdb9e168) — kimgooneya — 2025-07-03 — 데이터변경 반영 _(core REST commit?author=kimgooneya)_
  - [dba6e0f75e9d](https://github.com/langcodestartup/KyoboPrePoC-Function/commit/dba6e0f75e9d625be00f9437245165a76a51e5ce) — kimgooneya — 2025-07-01 — F040 집계 오류 내용 수정 _(core REST commit?author=kimgooneya)_
  - [1388fdc746e2](https://github.com/langcodestartup/KyoboPrePoC-Function/commit/1388fdc746e2a9eab23485c7a73f272bb61ef4ae) — kimgooneya — 2025-07-01 — gitignore 수정 _(core REST commit?author=kimgooneya)_
  - [989eea13fc8b](https://github.com/langcodestartup/KyoboPrePoC-Function/commit/989eea13fc8bc3d7e086c117215dc8aaf0b12840) — kimgooneya — 2025-07-01 — F40 컬럼 순서 변경 및 오류 표시 내용 수정 _(core REST commit?author=kimgooneya)_
  - [28bc78058739](https://github.com/langcodestartup/KyoboPrePoC-Function/commit/28bc78058739537b0a922a5ec8056186ea194afb) — kimgooneya — 2025-06-30 — f081 수정 _(core REST commit?author=kimgooneya)_
  - [159fa7a7fc55](https://github.com/langcodestartup/KyoboPrePoC-Function/commit/159fa7a7fc5511d198d061a5f946faf48eb54f56) — kimgooneya — 2025-06-30 — csv 분석기 작업 완료 _(core REST commit?author=kimgooneya)_
  - [58dec7a14069](https://github.com/langcodestartup/KyoboPrePoC-Function/commit/58dec7a14069651a678265ceff0daf8ea19bf0eb) — kimgooneya — 2025-06-30 — F081 오류 메세지 문구 오류 수정 _(core REST commit?author=kimgooneya)_
  - [f1c8c640b9d6](https://github.com/langcodestartup/KyoboPrePoC-Function/commit/f1c8c640b9d61b9ab5eb4686329bd3bc1d1cbd85) — kimgooneya — 2025-06-25 — F088 메세지 수정 _(core REST commit?author=kimgooneya)_
  - [8f47b7d831a6](https://github.com/langcodestartup/KyoboPrePoC-Function/commit/8f47b7d831a61d80dc36229a2bb34a8648d13bd1) — kimgooneya — 2025-06-25 — F081 수정 _(core REST commit?author=kimgooneya)_
  - [ddb4889ce85c](https://github.com/langcodestartup/KyoboPrePoC-Function/commit/ddb4889ce85c5530c6c56f2991799b50996a315e) — kimgooneya — 2025-06-25 — F40 판정 로직 수정 _(core REST commit?author=kimgooneya)_
  - [98ab085cd36f](https://github.com/langcodestartup/KyoboPrePoC-Function/commit/98ab085cd36f468af7da85ba636dc93dad41fad7) — kimgooneya — 2025-06-25 — base 값 가져오는 코드 추가 _(core REST commit?author=kimgooneya)_
  - [492f1260c7c9](https://github.com/langcodestartup/KyoboPrePoC-Function/commit/492f1260c7c9053cfe6a1640ba3d2dfc4b9eba6d) — kimgooneya — 2025-06-25 — 누락 package 추가 _(core REST commit?author=kimgooneya)_
  - [76b308091768](https://github.com/langcodestartup/KyoboPrePoC-Function/commit/76b308091768fda61a283fb4c1872c6598f95cf7) — kimgooneya — 2025-06-25 — function_app 복구 _(core REST commit?author=kimgooneya)_
  - [39190a4c4d3b](https://github.com/langcodestartup/KyoboPrePoC-Function/commit/39190a4c4d3bc0ad516411521061a887a75b7b17) — kimgooneya — 2025-06-25 — gitignore추가 _(core REST commit?author=kimgooneya)_
  - [daaffe434445](https://github.com/langcodestartup/KyoboPrePoC-Function/commit/daaffe434445c320a1e1b23b6e917b054415f034) — kimgooneya — 2025-06-25 — 변경반영 _(core REST commit?author=kimgooneya)_
  - [e0ae9c2fe1d4](https://github.com/langcodestartup/KyoboPrePoC-Function/commit/e0ae9c2fe1d41972e28ac2749c214e1489319a92) — kimgooneya — 2025-06-24 — 시트정보 누락 수정 _(core REST commit?author=kimgooneya)_
  - [1ad08fd9fa56](https://github.com/langcodestartup/KyoboPrePoC-Function/commit/1ad08fd9fa562b3acd9e999103ca651f9b778cc4) — kimgooneya — 2025-06-24 — sheet 정보 추가 _(core REST commit?author=kimgooneya)_
  - [1f96367b964d](https://github.com/langcodestartup/KyoboPrePoC-Function/commit/1f96367b964dcfb2ff515b71b902cce96f34e851) — kimgooneya — 2025-06-24 — Merge branch 'main' of https://github.com/langcodestartup/KyoboPrePoC-Function _(core REST commit?author=kimgooneya)_
  - [3d4a4a9314fe](https://github.com/langcodestartup/KyoboPrePoC-Function/commit/3d4a4a9314fe9ee3321d524cd3db30b3af2d98c5) — kimgooneya — 2025-06-24 — 1차 작업 완료 _(core REST commit?author=kimgooneya)_
  - [bf4d1237ef1f](https://github.com/langcodestartup/KyoboPrePoC-Function/commit/bf4d1237ef1f55b795381b8b8692f9f210af4dec) — kimgooneya — 2025-06-19 — f045 결과 파일 이름 수정 _(core REST commit?author=kimgooneya)_
  - [39adf6aed4d0](https://github.com/langcodestartup/KyoboPrePoC-Function/commit/39adf6aed4d0d1b0f0855129706748313ca5f74c) — kimgooneya — 2025-06-19 — f156 조직 필터 추가 _(core REST commit?author=kimgooneya)_
  - [c31e8ab64325](https://github.com/langcodestartup/KyoboPrePoC-Function/commit/c31e8ab643253419892b0f54144737652292f577) — kimgooneya — 2025-06-19 — 컨설턴트등급 공백 문자열 처리 추가 _(core REST commit?author=kimgooneya)_
  - [c63b976aca49](https://github.com/langcodestartup/KyoboPrePoC-Function/commit/c63b976aca49a99f99747ebfb6aa715639d9f356) — kimgooneya — 2025-06-19 — f035 JOIN KEY 설정 오류 수정 _(core REST commit?author=kimgooneya)_
  - [f13aff92e1c6](https://github.com/langcodestartup/KyoboPrePoC-Function/commit/f13aff92e1c6c2f8e2b13275d66b624072d740e2) — kimgooneya — 2025-06-19 — 컬럼 오기입 수정 _(core REST commit?author=kimgooneya)_
  - [5ca145404711](https://github.com/langcodestartup/KyoboPrePoC-Function/commit/5ca145404711557e3c92c061a61bf77680b94256) — kimgooneya — 2025-06-19 — decimal 변경 공백 오류 처리 추가 _(core REST commit?author=kimgooneya)_
  - [232d9abffe16](https://github.com/langcodestartup/KyoboPrePoC-Function/commit/232d9abffe160e4ff3ed91222f9cfdc3aed75968) — kimgooneya — 2025-06-19 — f115 조건 추가 _(core REST commit?author=kimgooneya)_
  - [2499ce86e88f](https://github.com/langcodestartup/KyoboPrePoC-Function/commit/2499ce86e88fb15b659fe6a79fb7eba717a6a05e) — kimgooneya — 2025-06-19 — f098 조건 추가 _(core REST commit?author=kimgooneya)_
  - [709cf107ac6f](https://github.com/langcodestartup/KyoboPrePoC-Function/commit/709cf107ac6fc70255c4a549a9a5b5736e5b7188) — kimgooneya — 2025-06-19 — f088 조건 변경 _(core REST commit?author=kimgooneya)_
  - [c524706d4106](https://github.com/langcodestartup/KyoboPrePoC-Function/commit/c524706d41066194ef0d22763b54952be18c392b) — kimgooneya — 2025-06-19 — 깃 변경 _(core REST commit?author=kimgooneya)_
  - [c6275f24e4ff](https://github.com/langcodestartup/KyoboPrePoC-Function/commit/c6275f24e4ff1be07ca2de326c78c8f3ac1d9dd8) — kimgooneya — 2025-06-19 — 깃 변경 _(core REST commit?author=kimgooneya)_
  - [5f1aa3a0fac9](https://github.com/langcodestartup/KyoboPrePoC-Function/commit/5f1aa3a0fac9f69ac5df7fbbc728e09645483e6a) — kimgooneya — 2025-06-19 — int 읽기를 decimal로 읽기로 변경 _(core REST commit?author=kimgooneya)_
  - [3c7e9225f778](https://github.com/langcodestartup/KyoboPrePoC-Function/commit/3c7e9225f778b22fcc54e82d51b8cdfcca6e107d) — kimgooneya — 2025-06-19 — f080 컬럼 값 읽기 변경 float -> int _(core REST commit?author=kimgooneya)_
  - [afe3c301bcad](https://github.com/langcodestartup/KyoboPrePoC-Function/commit/afe3c301bcad9807acc4ddac8d95a8d65470cebf) — kimgooneya — 2025-06-19 — f115 누락 항목 수정 _(core REST commit?author=kimgooneya)_
  - [269a6eadb855](https://github.com/langcodestartup/KyoboPrePoC-Function/commit/269a6eadb855276244e71f3640bc3aa938d1eab9) — kimgooneya — 2025-06-19 — f098 누락 항목 수정 _(core REST commit?author=kimgooneya)_
  - [68cc8e6e9311](https://github.com/langcodestartup/KyoboPrePoC-Function/commit/68cc8e6e9311217802c1dd3d75efd35cb90ec5fe) — kimgooneya — 2025-06-19 — f095 누락 항목 수정 _(core REST commit?author=kimgooneya)_
  - [588963033d55](https://github.com/langcodestartup/KyoboPrePoC-Function/commit/588963033d55633b6144eaaba541d10f6c2e8a6c) — kimgooneya — 2025-06-19 — f089 누락 항목 수정 _(core REST commit?author=kimgooneya)_
  - [8bad9c54f414](https://github.com/langcodestartup/KyoboPrePoC-Function/commit/8bad9c54f414df49e56398bb2239e48e7c6e1a43) — kimgooneya — 2025-06-19 — f088 누락 항목 수정 _(core REST commit?author=kimgooneya)_
  - [0796c6dba807](https://github.com/langcodestartup/KyoboPrePoC-Function/commit/0796c6dba807b91c027349053f82263b99625186) — kimgooneya — 2025-06-19 — F040 로직 수정 _(core REST commit?author=kimgooneya)_
  - [6be5b494abfa](https://github.com/langcodestartup/KyoboPrePoC-Function/commit/6be5b494abfab84b2ec8e2d9bab6aa4713f4e28d) — kimgooneya — 2025-06-18 — 블롭 덮어쓰기 적용 _(core REST commit?author=kimgooneya)_
  - [6b6e071aed6b](https://github.com/langcodestartup/KyoboPrePoC-Function/commit/6b6e071aed6bae2bf1141d2b6fb8fce6990bbc61) — kimgooneya — 2025-06-18 — 시트 파일 경로 표시 _(core REST commit?author=kimgooneya)_
  - [212c5c5d6878](https://github.com/langcodestartup/KyoboPrePoC-Function/commit/212c5c5d6878565b2bb9d3872b6868421c83786e) — kimgooneya — 2025-06-17 — 저장 경로 및 방식 수정 _(core REST commit?author=kimgooneya)_
  - [7f82f29d9fca](https://github.com/langcodestartup/KyoboPrePoC-Function/commit/7f82f29d9fcadc9d1a9ae5dd84fc391e7f012d0b) — kimgooneya — 2025-06-17 — 환경변수 불러오기 수정 _(core REST commit?author=kimgooneya)_
  - [51eea79978f7](https://github.com/langcodestartup/KyoboPrePoC-Function/commit/51eea79978f7484c1c63146421a52b4e000135fe) — kimgooneya — 2025-06-17 — 환경변수 불러오기 수정 _(core REST commit?author=kimgooneya)_
  - [4325a0640073](https://github.com/langcodestartup/KyoboPrePoC-Function/commit/4325a064007326dc4d376dcd582b3a4e6a347347) — kimgooneya — 2025-06-17 — ValidBase가 csv 저장 하지 않게 처리 _(core REST commit?author=kimgooneya)_
  - [2d0b9824f2b5](https://github.com/langcodestartup/KyoboPrePoC-Function/commit/2d0b9824f2b54083c226b19c6c8800824c69665f) — kimgooneya — 2025-06-17 — 펑션에 올리지 않을 항목 추가 _(core REST commit?author=kimgooneya)_
  - [084114a6d9b0](https://github.com/langcodestartup/KyoboPrePoC-Function/commit/084114a6d9b028e303ee5e0c3fdca35f04142d77) — kimgooneya — 2025-06-17 — 환경변수 체크용 _(core REST commit?author=kimgooneya)_
  - [a1eb5189ac65](https://github.com/langcodestartup/KyoboPrePoC-Function/commit/a1eb5189ac65d677bb8f66d256031460551a5027) — kimgooneya — 2025-06-17 — 누락 패키지 추가 _(core REST commit?author=kimgooneya)_
  - [3a2576d81f4d](https://github.com/langcodestartup/KyoboPrePoC-Function/commit/3a2576d81f4d7749f42cad6af6c0b2e74282eda7) — kimgooneya — 2025-06-17 — azure blob 등록 _(core REST commit?author=kimgooneya)_
  - [8b201be6ef0f](https://github.com/langcodestartup/KyoboPrePoC-Function/commit/8b201be6ef0f3019fb2dd500690d9df018671e68) — kimgooneya — 2025-06-17 — 코드 정리 _(core REST commit?author=kimgooneya)_
  - [47d86f19ca76](https://github.com/langcodestartup/KyoboPrePoC-Function/commit/47d86f19ca76f6a2cf0f3e28439b3a544cd7478b) — kimgooneya — 2025-06-17 — 로컬 csv 산출물 ignore 추가 _(core REST commit?author=kimgooneya)_
  - [42f3561776b7](https://github.com/langcodestartup/KyoboPrePoC-Function/commit/42f3561776b74c9edc14edb0dac53c24305fdce2) — kimgooneya — 2025-06-17 — 누락 requirements 추가 - 배포에 반드시 필요 _(core REST commit?author=kimgooneya)_
  - [7f03953828c0](https://github.com/langcodestartup/KyoboPrePoC-Function/commit/7f03953828c015126404cd8643f61a5b8cd8fc74) — kimgooneya — 2025-06-17 — 기능 추가 완료 _(core REST commit?author=kimgooneya)_
  - [b6754f70dc15](https://github.com/langcodestartup/KyoboPrePoC-Function/commit/b6754f70dc15b451d25c8b5e3f31291830afa079) — kimgooneya — 2025-06-17 — 성우진 작업 마이그레이션 완료 _(core REST commit?author=kimgooneya)_
  - [6843e6013e3c](https://github.com/langcodestartup/KyoboPrePoC-Function/commit/6843e6013e3c885d4b2f51f34757564d6492bba9) — kimgooneya — 2025-06-17 — 기능 복구 완료 _(core REST commit?author=kimgooneya)_
  - [587933853cac](https://github.com/langcodestartup/KyoboPrePoC-Function/commit/587933853cac233b34136a3a2f3b875c71819f42) — kimgooneya — 2025-06-17 — 김수현 코드 이관 완료 _(core REST commit?author=kimgooneya)_
  - [ffaf705db404](https://github.com/langcodestartup/KyoboPrePoC-Function/commit/ffaf705db40472366f1474fd3e07ea0a116afc8f) — kimgooneya — 2025-06-17 — API 답변 가능상태 _(core REST commit?author=kimgooneya)_
  - [55c993a79b51](https://github.com/langcodestartup/KyoboPrePoC-Function/commit/55c993a79b51beda4f2fec3ab04d00cb96e6d575) — kimgooneya — 2025-06-16 — initial commit _(core REST commit?author=kimgooneya)_
- Matching issue/PR records returned:
  - PR [#8 Work/new-f1](https://github.com/langcodestartup/KyoboPrePoC-Function/pull/8) — login kimgooneya — opened 2025-07-24 — state closed — merged 2025-07-24 _(core REST)_
  - PR [#7 Work/validation_result](https://github.com/langcodestartup/KyoboPrePoC-Function/pull/7) — login kimgooneya — opened 2025-07-23 — state closed — merged 2025-07-23 _(core REST)_
  - PR [#6 Work/validation_result](https://github.com/langcodestartup/KyoboPrePoC-Function/pull/6) — login kimgooneya — opened 2025-07-23 — state closed — merged 2025-07-23 _(core REST)_
  - PR [#4 최신 변경 내용 반영](https://github.com/langcodestartup/KyoboPrePoC-Function/pull/4) — login kimgooneya — opened 2025-07-17 — state closed — merged 2025-07-17 _(core REST)_
  - PR [#2 검증용 기능 수정](https://github.com/langcodestartup/KyoboPrePoC-Function/pull/2) — login kimgooneya — opened 2025-07-16 — state closed — merged 2025-07-16 _(core REST)_
  - PR [#1 Add Cosmos DB integration and parameter handling](https://github.com/langcodestartup/KyoboPrePoC-Function/pull/1) — login kimgooneya — opened 2025-07-15 — state closed — merged 2025-07-15 _(core REST)_

## OC_Console

- Repository: [langcodestartup/OC_Console](https://github.com/langcodestartup/OC_Console)
- Default branch: `main`; visibility: private; archived: no
- Branch inventory observed: 4 branch(es)
  - `featrue/trableAI` (4fc4a8d0865c), `main` (4022f734de8f), `working/hj` (36d4e2f6048d), `working/kt-test` (86960a2b7e79)
- Search query state: **PARTIAL / one or more query errors**; successful result sets: 4
- Contribution evidence in current pass: **No matching authored commits, PRs, or issues returned by paginated core REST; reviewer/comment activity remains UNKNOWN because Search was rate-limited**.

## KateMultiAgent

- Repository: [langcodestartup/KateMultiAgent](https://github.com/langcodestartup/KateMultiAgent)
- Default branch: `master`; visibility: private; archived: no
- Branch inventory observed: 1 branch(es)
  - `master` (6a709ad15d49)
- Search query state: **PARTIAL / one or more query errors**; successful result sets: 4
- Contribution evidence in current pass: **No matching authored commits, PRs, or issues returned by paginated core REST; reviewer/comment activity remains UNKNOWN because Search was rate-limited**.

## Langcode.CXP.V2.Demo

- Repository: [langcodestartup/Langcode.CXP.V2.Demo](https://github.com/langcodestartup/Langcode.CXP.V2.Demo)
- Default branch: `master`; visibility: private; archived: no
- Branch inventory observed: 4 branch(es)
  - `demo/ooshot` (8aaaf971c674), `english/main` (5e7f447299cf), `korean/main` (0d417f6c7914), `master` (0d417f6c7914)
- Search query state: **PARTIAL / one or more query errors**; successful result sets: 4
- Contribution evidence in current pass: **No matching authored commits, PRs, or issues returned by paginated core REST; reviewer/comment activity remains UNKNOWN because Search was rate-limited**.

## Langcode.CXP.K7

- Repository: [langcodestartup/Langcode.CXP.K7](https://github.com/langcodestartup/Langcode.CXP.K7)
- Default branch: `develop`; visibility: private; archived: no
- Branch inventory observed: 18 branch(es)
  - `cert/main` (71983a88d0b6), `chore/nuget-updates-all` (a4e31696a551), `chore/replace-fluentassertions-with-awesomeassertions` (b9826b14b096), `develop` (56b968863930), `feat/K7-432-excel-failed-product-visibility` (d90bb9f162c9), `feat/doc-note` (465a8b4682b8), `feature/K7-345-gpt-5.4-split-compare` (83c3725eb568), `feature/location` (7b5f833ce781), `fix/K7-408-pos-android-bridge-guard` (1d568e6a07d7), `fix/openapi-analyzer-removal-cross-platform` (27f12e61aabb), `fix/scenario-agent-llm-validation` (cd5c75b4fd6b), `hotfix/K7-408-init-guard` (de76716833b6), `hotfix/K7-408-pos-chatbot-blank` (f521f7aef255), `hotfix/K7-414-notice-localstorage-timeout` (005b0f982b1c), `main` (60301f475f7f), `publish` (eb89f4c1390c), `test/claude` (03c8b6869710), `ui/admin-component` (e5bcf6485dbb)
- Search query state: **PARTIAL / one or more query errors**; successful result sets: 4
- Contribution evidence in current pass: **No matching authored commits, PRs, or issues returned by paginated core REST; reviewer/comment activity remains UNKNOWN because Search was rate-limited**.

## kt-ai-safety

- Repository: [langcodestartup/kt-ai-safety](https://github.com/langcodestartup/kt-ai-safety)
- Default branch: `master`; visibility: private; archived: no
- Branch inventory observed: 3 branch(es)
  - `feat-hierarchyselector` (ea77fde87009), `feat-table-filter` (88b665ae4dc2), `master` (c4f6ffc9a186)
- Search query state: **PARTIAL / one or more query errors**; successful result sets: 4
- Contribution evidence in current pass: **No matching authored commits, PRs, or issues returned by paginated core REST; reviewer/comment activity remains UNKNOWN because Search was rate-limited**.

## kt-webproxy-nginx

- Repository: [langcodestartup/kt-webproxy-nginx](https://github.com/langcodestartup/kt-webproxy-nginx)
- Default branch: `main`; visibility: private; archived: no
- Branch inventory observed: 1 branch(es)
  - `main` (ace670a0be1e)
- Search query state: **PARTIAL / one or more query errors**; successful result sets: 4
- Contribution evidence in current pass: **No matching authored commits, PRs, or issues returned by paginated core REST; reviewer/comment activity remains UNKNOWN because Search was rate-limited**.

## LSElectric

- Repository: [langcodestartup/LSElectric](https://github.com/langcodestartup/LSElectric)
- Default branch: `master`; visibility: private; archived: no
- Branch inventory observed: 33 branch(es)
  - `bug/gis` (31de657173cf), `bug/testapi` (b5d5d7a01584), `dev` (8adfa8eec425), `dev-sql` (f1c8be82d54d), `feat/GIS` (0a4a908966f6), `feat/GIS1110` (923ef32f83bd), `feat/clientCon` (30d886098149), `feat/cosmos` (049582ebf10b), `feat/duplicate` (e7b376da568c), `feat/gis1024` (5fd66eaf4d99), `feat/gis1124` (12c6a98e4e30), `feat/gis1202` (ab3536bb9fa1), `feat/gis1216` (2bcca8a08413), `feat/input-modal` (68490d79d774), `feat/inputMerge` (c9b1cdd18875), `feat/ls-deploy` (39355cd9454d), `feat/processing-` (e949667adba2), `feat/provisioning` (0b543cf23e93), `feat/qna` (578c3389fce2), `feat/tempid-server` (22f99b2aadd8), …
- Search query state: **PARTIAL / one or more query errors**; successful result sets: 4
- Contribution evidence in current pass: **No matching authored commits, PRs, or issues returned by paginated core REST; reviewer/comment activity remains UNKNOWN because Search was rate-limited**.

## KT-Global-Demo

- Repository: [langcodestartup/KT-Global-Demo](https://github.com/langcodestartup/KT-Global-Demo)
- Default branch: `master`; visibility: private; archived: no
- Branch inventory observed: 2 branch(es)
  - `master` (e2787c067cea), `release-kor` (0622398a09cd)
- Search query state: **PARTIAL / one or more query errors**; successful result sets: 4
- Contribution evidence in current pass: **No matching authored commits, PRs, or issues returned by paginated core REST; reviewer/comment activity remains UNKNOWN because Search was rate-limited**.

## KT-Global-Demo-Eng

- Repository: [langcodestartup/KT-Global-Demo-Eng](https://github.com/langcodestartup/KT-Global-Demo-Eng)
- Default branch: `master`; visibility: private; archived: no
- Branch inventory observed: 2 branch(es)
  - `feat/seed` (0ae113958a0f), `master` (4fbb8b57b527)
- Search query state: **PARTIAL / one or more query errors**; successful result sets: 4
- Contribution evidence in current pass: **No matching authored commits, PRs, or issues returned by paginated core REST; reviewer/comment activity remains UNKNOWN because Search was rate-limited**.

## landing.publishing

- Repository: [langcodestartup/landing.publishing](https://github.com/langcodestartup/landing.publishing)
- Default branch: `main`; visibility: private; archived: no
- Branch inventory observed: 1 branch(es)
  - `main` (344293b5ea71)
- Search query state: **PARTIAL / one or more query errors**; successful result sets: 4
- Contribution evidence in current pass: **No matching authored commits, PRs, or issues returned by paginated core REST; reviewer/comment activity remains UNKNOWN because Search was rate-limited**.

## mline-poc

- Repository: [langcodestartup/mline-poc](https://github.com/langcodestartup/mline-poc)
- Default branch: `main`; visibility: private; archived: no
- Branch inventory observed: 4 branch(es)
  - `error/260209-02` (b1829a6cea35), `error/260209` (0bc0d03a4f3e), `feat/voice` (7088caf63901), `main` (8d65cf2eeae5)
- Search query state: **PARTIAL / one or more query errors**; successful result sets: 4
- Contribution evidence in current pass: **No matching authored commits, PRs, or issues returned by paginated core REST; reviewer/comment activity remains UNKNOWN because Search was rate-limited**.

## langcode.landing.BE

- Repository: [langcodestartup/langcode.landing.BE](https://github.com/langcodestartup/langcode.landing.BE)
- Default branch: `master`; visibility: private; archived: no
- Branch inventory observed: 1 branch(es)
  - `master` (5ca7f2dce69f)
- Search query state: **PARTIAL / one or more query errors**; successful result sets: 4
- Contribution evidence in current pass: **No matching authored commits, PRs, or issues returned by paginated core REST; reviewer/comment activity remains UNKNOWN because Search was rate-limited**.

## langcode.landing.FE

- Repository: [langcodestartup/langcode.landing.FE](https://github.com/langcodestartup/langcode.landing.FE)
- Default branch: `main`; visibility: private; archived: no
- Branch inventory observed: 1 branch(es)
  - `main` (07832b0e9c58)
- Search query state: **PARTIAL / one or more query errors**; successful result sets: 4
- Contribution evidence in current pass: **No matching authored commits, PRs, or issues returned by paginated core REST; reviewer/comment activity remains UNKNOWN because Search was rate-limited**.

## LGE-CS-PoC

- Repository: [langcodestartup/LGE-CS-PoC](https://github.com/langcodestartup/LGE-CS-PoC)
- Default branch: `main`; visibility: private; archived: no
- Branch inventory observed: 2 branch(es)
  - `main` (6f355e00aadf), `test/cache` (7370fc418efc)
- Search query state: **PARTIAL / one or more query errors**; successful result sets: 4
- Contribution evidence in current pass: **No matching authored commits, PRs, or issues returned by paginated core REST; reviewer/comment activity remains UNKNOWN because Search was rate-limited**.

## ourhome_demo

- Repository: [langcodestartup/ourhome_demo](https://github.com/langcodestartup/ourhome_demo)
- Default branch: `main`; visibility: private; archived: no
- Branch inventory observed: 3 branch(es)
  - `claude/excel-export-recipes-IIMey` (38db09933678), `claude/smart-tools-for-agent` (69103adfcd0b), `main` (c3baf9ba2e8b)
- Search query state: **PARTIAL / one or more query errors**; successful result sets: 4
- Contribution evidence in current pass: **No matching authored commits, PRs, or issues returned by paginated core REST; reviewer/comment activity remains UNKNOWN because Search was rate-limited**.

## langcode.cxp.erd

- Repository: [langcodestartup/langcode.cxp.erd](https://github.com/langcodestartup/langcode.cxp.erd)
- Default branch: `main`; visibility: private; archived: no
- Branch inventory observed: 1 branch(es)
  - `main` (53b6fd24d4ae)
- Search query state: **PARTIAL / one or more query errors**; successful result sets: 4
- Contribution evidence in current pass: **No matching authored commits, PRs, or issues returned by paginated core REST; reviewer/comment activity remains UNKNOWN because Search was rate-limited**.

## kt-gsi

- Repository: [langcodestartup/kt-gsi](https://github.com/langcodestartup/kt-gsi)
- Default branch: `main`; visibility: private; archived: no
- Branch inventory observed: 2 branch(es)
  - `main` (7f0654263b11), `worktree-KG-217-custom-week-date-resolver` (edae162d14f2)
- Search query state: **PARTIAL / one or more query errors**; successful result sets: 4
- Matching commit records returned:
  - [7f0654263b11](https://github.com/langcodestartup/kt-gsi/commit/7f0654263b11e5090c4229f9bb6667417b668d1b) — kimgooneya — 2026-07-18 — KG-225 [refactor]: 로컬 DB 의존성 제거 및 클라우드/keyless 기준 전환 (#9) _(core REST commit?author=kimgooneya)_
  - [6befcb5fd531](https://github.com/langcodestartup/kt-gsi/commit/6befcb5fd53139c8341a1c62dc7590040f3ae88e) — kimgooneya — 2026-07-18 — KG-224 [fix]: 회사 미언급 상품 답변의 자사 채널 강제 주입 제거 (#8) _(core REST commit?author=kimgooneya)_
  - [d370b4ec3e7b](https://github.com/langcodestartup/kt-gsi/commit/d370b4ec3e7bb8a83d97f9fbc39ce4be8bf25d95) — kimgooneya — 2026-07-18 — KG-223 [fix]: varchar 날짜 컬럼 to_char 직접 사용 사전 차단 및 42883 재시도 추가 (#7) _(core REST commit?author=kimgooneya)_
  - [8575f68e7192](https://github.com/langcodestartup/kt-gsi/commit/8575f68e7192ea37f5e850abee07929f013d657c) — kimgooneya — 2026-07-18 — KG-221 [fix]: 회사 미언급 상품 질문에 자사 앵커링 제거 (#6) _(core REST commit?author=kimgooneya)_
  - [00de11a68d95](https://github.com/langcodestartup/kt-gsi/commit/00de11a68d956d8f22e52eba98d231112d0f156f) — kimgooneya — 2026-07-18 — KG-220 [fix]: 상품명 조회 시 자사 채널 필터 제거로 타사 상품 조회 가능 (#5) _(core REST commit?author=kimgooneya)_
  - [795234cabc46](https://github.com/langcodestartup/kt-gsi/commit/795234cabc46cc325a8c2e162161641029ae3e14) — kimgooneya — 2026-07-09 — [fix]: dev secrets export Azure 리소스 기준 적용 _(core REST commit?author=kimgooneya)_
  - [b1914ed45879](https://github.com/langcodestartup/kt-gsi/commit/b1914ed4587926262d465f396a8c3f82fc6e9b37) — kimgooneya — 2026-07-08 — [fix]: dev secrets import 파일 경로 입력 지원 (#3) _(core REST commit?author=kimgooneya)_
  - [74c88a82a0b9](https://github.com/langcodestartup/kt-gsi/commit/74c88a82a0b9e3dbd5a87979c4ef6f32bff3fd2c) — kimgooneya — 2026-07-08 — [fix]: 로컬 secrets import 흐름과 인증 로그 정리 _(core REST commit?author=kimgooneya)_
  - [fcf7419ef704](https://github.com/langcodestartup/kt-gsi/commit/fcf7419ef704c2bd6508d32bdee17046af303ee7) — kimgooneya — 2026-07-08 — Codex/resource secret boundary (#1) _(core REST commit?author=kimgooneya)_
- Matching issue/PR records returned:
  - PR [#9 KG-225 [refactor]: 로컬 DB 의존성 제거 및 클라우드/keyless 기준 전환](https://github.com/langcodestartup/kt-gsi/pull/9) — login kimgooneya — opened 2026-07-18 — state closed — merged 2026-07-18 _(core REST)_
  - PR [#8 KG-224 [fix]: 회사 미언급 상품 답변의 자사 채널 강제 주입 제거](https://github.com/langcodestartup/kt-gsi/pull/8) — login kimgooneya — opened 2026-07-18 — state closed — merged 2026-07-18 _(core REST)_
  - PR [#7 KG-223 [fix]: varchar 날짜 컬럼 to_char 직접 사용 사전 차단 및 42883 재시도 추가](https://github.com/langcodestartup/kt-gsi/pull/7) — login kimgooneya — opened 2026-07-18 — state closed — merged 2026-07-18 _(core REST)_
  - PR [#6 KG-221 [fix]: 회사 미언급 상품 질문에 자사 앵커링 제거](https://github.com/langcodestartup/kt-gsi/pull/6) — login kimgooneya — opened 2026-07-18 — state closed — merged 2026-07-18 _(core REST)_
  - PR [#5 KG-220 [fix]: 상품명 조회 시 자사 채널 필터 제거로 타사 상품 조회 가능](https://github.com/langcodestartup/kt-gsi/pull/5) — login kimgooneya — opened 2026-07-18 — state closed — merged 2026-07-18 _(core REST)_
  - PR [#4 [fix]: dev secrets export Azure 리소스 기준 적용](https://github.com/langcodestartup/kt-gsi/pull/4) — login kimgooneya — opened 2026-07-09 — state closed — merged 2026-07-09 _(core REST)_
  - PR [#3 [fix]: dev secrets import 파일 경로 입력 지원](https://github.com/langcodestartup/kt-gsi/pull/3) — login kimgooneya — opened 2026-07-08 — state closed — merged 2026-07-08 _(core REST)_
  - PR [#2 [fix]: 로컬 secrets import 흐름과 인증 로그 정리](https://github.com/langcodestartup/kt-gsi/pull/2) — login kimgooneya — opened 2026-07-08 — state closed — merged 2026-07-08 _(core REST)_
  - PR [#1 Codex/resource secret boundary](https://github.com/langcodestartup/kt-gsi/pull/1) — login kimgooneya — opened 2026-07-08 — state closed — merged 2026-07-08 _(core REST)_

## langcode-ai-guidebook

- Repository: [langcodestartup/langcode-ai-guidebook](https://github.com/langcodestartup/langcode-ai-guidebook)
- Default branch: `main`; visibility: private; archived: no
- Branch inventory observed: 0 branch(es)
- Search query state: **PARTIAL / one or more query errors**; successful result sets: 4
- Contribution evidence in current pass: **No Git repository content; no contribution evidence possible**.



## Appendix C — S-Z and other private repositories

# Member C evidence memo: S–Z and other private repositories

Audit date: 2026-08-01 (Asia/Seoul)

## Scope and method

- Authenticated GitHub identity from the connector: `kimgooneya`, user ID `26292512`.
- Enumerated `langcodestartup` repositories with repository search pages 1–3: 211 repositories total; 33 whose names begin S–Z (case-insensitive) were in scope.
- Enumerated `kimgooneya/*`: 31 repositories, of which 13 were private. Also checked the named external repositories `chwonseok/ChartJsLibrary`, `differz-inc/langcode`, `PyeongsaengCoding/LInqExampleWithTest`, and `wezenhealthcare/wezen-rfid-scanner`.
- For each S–Z repository, searched the latest three commits (`query=""`, `topn=3`) and fetched each commit for resolved author/committer metadata. For private `kimgooneya/*` repositories, searched/fetched up to the latest five commits. Positive findings below are exact commit URLs, SHAs, dates, and connector-resolved authors.
- PR discovery used `get_users_recent_prs_in_repo` with `state=all`, `limit=100`. Issue discovery used `search_issues` with `author:kimgooneya`; no user-authored non-PR issues were returned in scope. Review/comment checks were sampled on representative positive PRs.
- `kimgooneya` is high-confidence as the target identity. `langcode-shkim` (user ID `87595334`, observed on fetched commits) and display name `Soo Hyeon Kim` are recorded as aliases/related identities; linkage to `kimgooneya` is medium confidence from repository overlap and naming, not a verified account-ownership assertion. The literal search aliases `shkim` and `김수현` did not produce independent connector search hits.

## Executive findings

- Positive S–Z evidence: `SamsungSHI` (one fetched commit authored by `kimgooneya`), `Seegene.V2` (44/44 authored PRs merged; recent fetched commits include `kimgooneya`), `SPinAutoUpload` (three recent commits by `kimgooneya`), `SpinInvoice` (54 authored PRs, 47 merged; recent commits by both `kimgooneya` and `langcode-shkim`), `TestProvisioning` (one recent fetched commit by `kimgooneya`), and `ToyProjects` (three recent commits by `kimgooneya`).
- No matching activity was found in the inspected recent-commit windows, authored-PR searches, or authored-issue searches for the other 27 S–Z repositories. This is a bounded no-evidence result, not proof of zero historical activity.
- Positive outside-private evidence: recent commits in 11 of 13 private `kimgooneya/*` repositories; `v0-instagram-dm-chat` recent commits were by `v0`, while `MusicJail`, `JwtWebApiTutorial`, `FrontEndTest`, `TESTGIT`, `BlazorTester`, `fastapi-tutorial`, `react-study`, `sy-newyork-trip`, `almott`, and `Draftly` show `kimgooneya`/related-authored commits. `DotNetTest` and `GameStore` show `langcode-shkim` commits.
- `wezenhealthcare/wezen-rfid-scanner` has at least 100 recent merged PRs authored by `kimgooneya` in the connector result (the API request hit the 100-result cap), plus direct commits by `kimgooneya`; this is substantial positive evidence.
- `chwonseok/ChartJsLibrary` and `differz-inc/langcode` returned GitHub API 404/not found through the authenticated connector. `PyeongsaengCoding/LInqExampleWithTest` was accessible but its inspected commits were authored by `PyeongsaengCoding`/`jschoi`, not a target identity.

## langcodestartup S–Z repositories

### langcodestartup/SamsungCnt

No target match in the latest three commits; example inspected commit [78bbbad](https://github.com/langcodestartup/SamsungCnt/commit/78bbbad3307a67981af7aef874bb0a6da44671d8), 2024-07-30, author `JongPil-lee`. Authored PR and authored-issue searches returned none.

### langcodestartup/SamsungSHI

Positive commit: [d4d5856](https://github.com/langcodestartup/SamsungSHI/commit/d4d58560491cb6e16ec777a9d8e9581e6d477483), 2022-11-15T02:24:03Z, author `kimgooneya`, title “Netmarble master branch set (#45)”. No authored PR or authored issue was returned.

### langcodestartup/SamsungSHI_Delete

No target match; inspected [3d9af96](https://github.com/langcodestartup/SamsungSHI_Delete/commit/3d9af96a7fbb7101c6f38258df3f0608330a7463), 2023-12-19, author `Jooinseok`. No authored PR/issue evidence.

### langcodestartup/SamsungSHI.V2

No target match; latest inspected commit [da82b6d](https://github.com/langcodestartup/SamsungSHI.V2/commit/da82b6d7e1b3261d2e693198681bcdcdebd819a5), 2024-03-25, author `JongPil-lee`. No authored PR/issue evidence.

### langcodestartup/SamsungSHI.V2.2025

No target match; latest inspected commit [11ce27c](https://github.com/langcodestartup/SamsungSHI.V2.2025/commit/11ce27ccbe63663de8c430d955a09fa2ce37059b), 2025-10-02, author `tksgo1995`. No authored PR/issue evidence.

### langcodestartup/Seegene.CXP

No target match in the latest three commits; latest inspected commit [da82b6d](https://github.com/langcodestartup/Seegene.CXP/commit/da82b6d7e1b3261d2e693198681bcdcdebd819a5), 2024-03-25, author `JongPil-lee`. No authored PR/issue evidence.

### langcodestartup/Seegene.V2

Positive PR evidence: 44 authored PRs, all merged, numbers `1,2,3,5,6,7,8,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,30,34,35,36,39,44,45,46,48,49,51,52,53,54,55,56,59,60,62,63`. Exact recent examples:

- [PR #63](https://github.com/langcodestartup/Seegene.V2/pull/63), merged 2024-12-04T03:30:05Z, head SHA `38c1e929ce1a89dc0667cb6a6ef31d65478e6717`, “FIX SGAL-94 로직 수정”.
- [PR #62](https://github.com/langcodestartup/Seegene.V2/pull/62), merged 2024-12-03T08:55:19Z, head SHA `41892f69a623553691009e483e4b5f2d4e8d5693`, “FIX SGAL-94 로직 수정”.
- [PR #60](https://github.com/langcodestartup/Seegene.V2/pull/60), merged 2024-12-03T06:37:12Z, head SHA `58dc4103d13951c1675a66cfc8487c5b8b44fa5f`, “FIX SGAL-093”.

Direct commit confirmation includes [60347e2](https://github.com/langcodestartup/Seegene.V2/commit/60347e2eeda52f790daa3c4e29b3c211fab23bcf), 2024-12-04T03:30:05Z, author `kimgooneya`, and [29aa954](https://github.com/langcodestartup/Seegene.V2/commit/29aa954d49bfbb119efa26404f6ff60c3600988b), 2024-12-03T08:55:19Z, author `kimgooneya`.

### langcodestartup/seegeneAzureFunction

No target match; latest inspected [be91686](https://github.com/langcodestartup/seegeneAzureFunction/commit/be91686b99b4e1bbde66811ee21e1566405d5194), 2025-01-02, author `choiungryeol`. No authored PR/issue evidence.

### langcodestartup/SemanticKernel-ToyProject

No target match; latest inspected [9716428](https://github.com/langcodestartup/SemanticKernel-ToyProject/commit/9716428ee1e9e4ccca85abbcaac9619d3cdc18da), 2024-11-12, author `tksgo1995`. No authored PR/issue evidence.

### langcodestartup/ServiceBusRelayUtil

No target match; latest inspected [d7a3c45](https://github.com/langcodestartup/ServiceBusRelayUtil/commit/d7a3c459e8a354bf8b3996f797bfb5a7f67061c4), 2023-11-15, author `PyeongsaengCoding`. No authored PR/issue evidence.

### langcodestartup/SGSKorea

No target match; latest inspected [5cbf91a](https://github.com/langcodestartup/SGSKorea/commit/5cbf91a74b93d56683687b94a71ecbb9d4a8d125), 2024-12-05, author `Hyunyoung-Ko`. No authored PR/issue evidence.

### langcodestartup/shi-legal

No target match; latest inspected [298a2ac](https://github.com/langcodestartup/shi-legal/commit/298a2ac104a0ae9df201db772022e1d73340a056), 2025-09-19, author `tksgo1995`. No authored PR/issue evidence.

### langcodestartup/shiazureFunction

No target match; latest inspected [f2b6c67](https://github.com/langcodestartup/shiazureFunction/commit/f2b6c671a06bd348c47b08824fdfd56a107b4b29), 2024-12-18, author display name `대철 김`. No authored PR/issue evidence.

### langcodestartup/ShinhanPoC

No target match; latest inspected [e6a75e6](https://github.com/langcodestartup/ShinhanPoC/commit/e6a75e6445ef26feb4ba3e79442e325dd5056b2d), 2025-09-28, author `chwonseok`. No authored PR/issue evidence.

### langcodestartup/skax-pub

No target match; latest inspected [ad1e931](https://github.com/langcodestartup/skax-pub/commit/ad1e931fafa4714d2ae04e5ea2f38e446e276b13), 2026-07-30, author `meme-h`. No authored PR/issue evidence.

### langcodestartup/SkinCafeineDemo

No target match; latest inspected [6bf4b2b](https://github.com/langcodestartup/SkinCafeineDemo/commit/6bf4b2b6e36033fbeb3a5e82c0238fa38e949b9b), 2025-03-26, author `HeonjiH`. No authored PR/issue evidence.

### langcodestartup/SlackTest

No target match; latest inspected [e152169](https://github.com/langcodestartup/SlackTest/commit/e15216900569a53b215c4024c611d2047810e8f9), 2024-06-18, author display name `성우진`. No authored PR/issue evidence.

### langcodestartup/smtech-oracle-mcp-demo

No target match; latest inspected [418b2d0](https://github.com/langcodestartup/smtech-oracle-mcp-demo/commit/418b2d0f67b5f025bff493dfac24d4fe3776b074), 2026-02-10, author `goraegorae`. No authored PR/issue evidence.

### langcodestartup/SPinAutoUpload

Positive recent commits by `kimgooneya`: [38ad709](https://github.com/langcodestartup/SPinAutoUpload/commit/38ad70978e67dd84793fde2c2416388828604b81), 2022-10-24T03:35:04Z; [2958232](https://github.com/langcodestartup/SPinAutoUpload/commit/295823239324126eb9e9e2cd6d8a2b3ae3a96cca), 2022-10-19T08:51:31Z; [72672d2](https://github.com/langcodestartup/SPinAutoUpload/commit/72672d20ec5e2435f819cd20608d1dabaf27a40f), 2022-10-18T10:08:50Z. No authored PR/issue evidence returned.

### langcodestartup/SpinInvoice

Positive PR evidence: 54 authored PRs, 47 merged and 7 closed unmerged; IDs `1,2,4,6,8,9,13,35,38,39,41,43,45,47,51,53,55,56,57,59,60,61,63,64,65,66,67,68,69,70,71,75,76,78,79,80,81,82,83,84,85,86,87,88,89,90,91,92,93,94,95,96,97,98`. Exact examples: [PR #98](https://github.com/langcodestartup/SpinInvoice/pull/98), merged 2023-07-16T14:48:46Z, head SHA `859d67af51cee2d2df4f0d73ab0183f897ac4654`; [PR #95](https://github.com/langcodestartup/SpinInvoice/pull/95), merged 2023-05-29T08:01:31Z, head SHA `af5f818871cba4e963a4a86981669284e3c25060`; [PR #1](https://github.com/langcodestartup/SpinInvoice/pull/1), created 2022-07-29T03:01:18Z, closed unmerged, head SHA `bbc0f07f5be5ee316eea052c29c8f7f8ffdd73c7`.

Direct commits confirm both observed aliases: [63906a3](https://github.com/langcodestartup/SpinInvoice/commit/63906a3efdaf8eeac75f8fc39b7eae03d5eb07a8), 2023-08-11T02:18:09Z, author `kimgooneya`; [75e8bd0](https://github.com/langcodestartup/SpinInvoice/commit/75e8bd029e09b1ed5067c39b7280a815038e6356), 2023-10-17T01:09:56Z, author/committer `langcode-shkim` (ID `87595334`). Additional `kimgooneya` commits include [03f5969](https://github.com/langcodestartup/SpinInvoice/commit/03f59696b3edf1e2de3c72ad9af5d9ca8a14a1b4), 2023-08-07T09:32:59Z.

### langcodestartup/TeamsAppTest

No target match; latest inspected [5bb0833](https://github.com/langcodestartup/TeamsAppTest/commit/5bb08336528f703ed1669fde18cf559f51b2162e), 2023-11-02, author `KimKwanwoo`. No authored PR/issue evidence.

### langcodestartup/telemetry_receive

No target match; latest inspected [6f5f41e](https://github.com/langcodestartup/telemetry_receive/commit/6f5f41e495db30481da1815eddbd3f9aed8270f9), 2024-04-29, author display name `대철 김`. No authored PR/issue evidence.

### langcodestartup/TensorflowInsight

No target match; latest inspected [6d2c186](https://github.com/langcodestartup/TensorflowInsight/commit/6d2c186e93a330b6fd3d35f20826c4feee320203), 2021-01-13, author `goraegorae`. No authored PR/issue evidence.

### langcodestartup/TestProvisioning

Positive recent commit: [d4d5856](https://github.com/langcodestartup/TestProvisioning/commit/d4d58560491cb6e16ec777a9d8e9581e6d477483), 2022-11-15T02:24:03Z, author `kimgooneya`. No authored PR/issue evidence returned.

### langcodestartup/ToyProjects

Positive recent commits by `kimgooneya`: [a4706da](https://github.com/langcodestartup/ToyProjects/commit/a4706da807d04239e6dee44aca4c298f61485515), 2024-07-16T02:18:31Z; [4f6f5b8](https://github.com/langcodestartup/ToyProjects/commit/4f6f5b83c515ac197d0dd4d859cb9ecf7c80f191), 2024-07-14T01:17:48Z; [03e411f](https://github.com/langcodestartup/ToyProjects/commit/03e411f201c3d127638967549f0b7d1e7e2472c8), 2024-07-14T01:17:25Z. No authored PR/issue evidence returned.

### langcodestartup/VisualCampTechDemo

No target match; latest inspected [22b51af](https://github.com/langcodestartup/VisualCampTechDemo/commit/22b51af1c8701c3f2a80b9499bec61f52010d697), 2020-11-10, author `goraegorae`. No authored PR/issue evidence.

### langcodestartup/VivaTech2025

No target match; latest inspected [de935b6](https://github.com/langcodestartup/VivaTech2025/commit/de935b6fa8f452c017b3bc9d37e25a450d82a8c2), 2025-06-02, author display name `우진 성`. No authored PR/issue evidence.

### langcodestartup/WellStory

No target match; latest inspected [b581419](https://github.com/langcodestartup/WellStory/commit/b581419d844e3195fc12a4191575dbc544aa462b), 2025-11-17, author `Hyunyoung-Ko`. No authored PR/issue evidence.

### langcodestartup/WellstoryPocTest

No target match; latest inspected [3df7a6a](https://github.com/langcodestartup/WellstoryPocTest/commit/3df7a6a2286b0a7218067b7671b4660743fc00d0), 2025-07-03, author `kykson2`. No authored PR/issue evidence.

### langcodestartup/WiznetCsvGenerator

No target match; latest inspected [17534a3](https://github.com/langcodestartup/WiznetCsvGenerator/commit/17534a362d2dc123c1d1c97ab3e5c967ce31fc43), 2022-10-06, author display name `원석 최`. No authored PR/issue evidence.

### langcodestartup/WorkflowTest

No target match; latest inspected [35a4398](https://github.com/langcodestartup/WorkflowTest/commit/35a43988b3720110847936a6d501c4491a4ae6ea), 2026-03-16, author `Hyunyoung-Ko`. No authored PR/issue evidence.

### langcodestartup/WsFederationApp

No target match; latest inspected [08b445a](https://github.com/langcodestartup/WsFederationApp/commit/08b445a35b9c5bdd44c7be4ddb0b736dbec78d02), 2023-12-12, author `jschoi`. No authored PR/issue evidence.

### langcodestartup/ynu-imgaug

No target match; latest inspected [4de8d37](https://github.com/langcodestartup/ynu-imgaug/commit/4de8d377ab92bfb9c51bd72d09df46f123d23313), 2022-09-07, author `chwonseok`. No authored PR/issue evidence.

## Other accessible private repositories

### kimgooneya/MusicJail

Positive commits: [a42eaed](https://github.com/kimgooneya/MusicJail/commit/a42eaeda9cb840997d5c7bf062b8ff705ab9674c), 2022-06-30, and [5ca8b89](https://github.com/kimgooneya/MusicJail/commit/5ca8b8961769e298c2066144f9330f13f9826a93), 2022-02-27; both author/committer `kimgooneya`. PR search was rate-limited (403) in one pass; no positive PR result was retained.

### kimgooneya/JwtWebApiTutorial

Positive commits: [83b3b01](https://github.com/kimgooneya/JwtWebApiTutorial/commit/83b3b01e506537a8d9b84ae7fe581bc3853434b8), 2022-11-21, and [aff8d38](https://github.com/kimgooneya/JwtWebApiTutorial/commit/aff8d3864e490900cf4d1863021c4e2877f2238f), 2022-11-21; author/committer `kimgooneya`.

### kimgooneya/DotNetTest

Positive related-alias commits: [e448187](https://github.com/kimgooneya/DotNetTest/commit/e44818712d977c8d4a84e283dd9039ea528365b5), 2023-10-27, and [54267fd](https://github.com/kimgooneya/DotNetTest/commit/54267fdbb6eefaffd77394d037c19aac059073c3), 2023-10-27; author/committer `langcode-shkim`.

### kimgooneya/FrontEndTest

Positive commit: [3425813](https://github.com/kimgooneya/FrontEndTest/commit/34258139c2587d2cb453e5f369f625c5e1800810), 2022-12-15, author/committer `kimgooneya`.

### kimgooneya/TESTGIT

Positive commits include [9b1028e](https://github.com/kimgooneya/TESTGIT/commit/9b1028eaf260e08d3ac93f302706d4bc4c073530), 2023-01-30, and [a144b6a](https://github.com/kimgooneya/TESTGIT/commit/a144b6ac0efb16c03e4f87a615d35349e37ba62c), 2023-01-30; author/committer `kimgooneya`.

### kimgooneya/BlazorTester

Positive commits include [8c657ed](https://github.com/kimgooneya/BlazorTester/commit/8c657ed35b315ae3a8ecab058f82e3fa71ae9ef9), 2023-07-13, author `kimgooneya`; and [5d86963](https://github.com/kimgooneya/BlazorTester/commit/5d8696374f249b2d23c480fbfe8544b536c5de5a), 2023-07-13, author display name `Soo Hyeon Kim`.

### kimgooneya/fastapi-tutorial

Positive commits include [ae994c6](https://github.com/kimgooneya/fastapi-tutorial/commit/ae994c65880d27fdadb979398b18897310517436), 2024-04-27, and [d4caf9b](https://github.com/kimgooneya/fastapi-tutorial/commit/d4caf9b4ba8f6ae385316561264c772fb28a590c), 2024-04-27; author/committer `kimgooneya`.

### kimgooneya/react-study

Positive commit: [2fe82f4](https://github.com/kimgooneya/react-study/commit/2fe82f424c58f18174abc6100e9ddeba35077342), 2025-01-03, author/committer `kimgooneya`.

### kimgooneya/GameStore

Positive related-alias commits include [c91efa1](https://github.com/kimgooneya/GameStore/commit/c91efa1904c2e0570529beb9770fc35ce883d3b8), 2025-01-15, and [82dccfe](https://github.com/kimgooneya/GameStore/commit/82dccfe57b994a8105a8fc7b3aa336d81cf96921), 2025-01-15; author/committer `langcode-shkim`.

### kimgooneya/v0-instagram-dm-chat

No target match in the latest four commits; latest inspected [1202f59](https://github.com/kimgooneya/v0-instagram-dm-chat/commit/1202f59a40b52550ce51317d544b6d9fcd619d6d), 2025-09-28, author/committer `v0`. PR search was rate-limited in one pass.

### kimgooneya/almott

Positive merge commits authored by `kimgooneya`, including [2b21904](https://github.com/kimgooneya/almott/commit/2b21904e4994d0a2f24184edf90c6ed67c44704e), 2026-01-19, and [0e5596f](https://github.com/kimgooneya/almott/commit/0e5596fb0f7654cf7245ef94355ce0cc847345c8), 2026-01-18.

### kimgooneya/Draftly

Positive commits include [410ddc3](https://github.com/kimgooneya/Draftly/commit/410ddc3adef02acc5b6ffa895703bedab931dcfc), 2026-04-18, and [e8dfc33](https://github.com/kimgooneya/Draftly/commit/e8dfc330fa9f41248915ce0e4a27a8f0dda7e763), 2026-04-18; author `kimgooneya`.

### kimgooneya/sy-newyork-trip

Positive commit: [ce993e0](https://github.com/kimgooneya/sy-newyork-trip/commit/ce993e0f06a1b5b4f282542e70d1290bd663ff6a), 2026-04-12, author/committer `kimgooneya`.

### chwonseok/ChartJsLibrary

GitHub connector `get_repo` returned HTTP 404/not found. No contribution conclusion is possible from this account/session.

### differz-inc/langcode

GitHub connector `get_repo` returned HTTP 404/not found. No contribution conclusion is possible from this account/session.

### PyeongsaengCoding/LInqExampleWithTest

Repository is accessible and private. Inspected nine commits; no target match. Latest [f46bf98](https://github.com/PyeongsaengCoding/LInqExampleWithTest/commit/f46bf986e41ad282a3e7ea49a7462100aaf89719), 2022-11-24, author `PyeongsaengCoding`; other recent authors were `jschoi` and `PyeongsaengCoding`. No pull request #1 exists in the connector response, and no authored issue evidence.

### wezenhealthcare/wezen-rfid-scanner

Strong positive evidence. The user-PR connector returned 100/100 merged authored PRs, IDs 34–141 with some gaps, capped at 100 results. Exact recent examples:

- [PR #141](https://github.com/wezenhealthcare/wezen-rfid-scanner/pull/141), merged 2026-04-04T04:47:08Z, head SHA `f88650faf7e1abc3f4347bae28157acc6867cc36`.
- [PR #140](https://github.com/wezenhealthcare/wezen-rfid-scanner/pull/140), merged 2026-04-04T04:36:22Z, head SHA `29d26019e3c225b4f5d903c1c9a704c1842e47ef`.
- [PR #42](https://github.com/wezenhealthcare/wezen-rfid-scanner/pull/42), merged 2026-02-28T07:39:03Z, head SHA `b4673a1daad04eb4cde2600c9f8293af13279ff1`.
- [PR #41](https://github.com/wezenhealthcare/wezen-rfid-scanner/pull/41), merged 2026-02-28T07:23:00Z, head SHA `67375ce35647faac5eb5847baf0144e46c28f23e`.

Direct commit confirmation includes [36c2098](https://github.com/wezenhealthcare/wezen-rfid-scanner/commit/36c2098bef61eb38214cf22430679c5857cf4cc2), 2026-04-04T04:47:08Z, and [8996777](https://github.com/wezenhealthcare/wezen-rfid-scanner/commit/899677763069a40ae151c00c472caf5da2d7040d), 2026-04-04T04:36:22Z, both authored by `kimgooneya`. Sampled PR review-submission and combined-comment endpoints for PRs 34, 42, and 141 returned zero review/comment records.

## Branch, review, and limitation notes

- Repository metadata exposed default branches for the complete enumerated set; positive PR results exposed the authored head branches and exact head SHAs. I did not claim branch ownership from branch names alone.
- `list_pull_request_reviews` and `fetch_pr_comments` returned zero records for sampled PRs in `Seegene.V2`, `SpinInvoice`, and `wezen-rfid-scanner`; `reviewed-by:kimgooneya` and `commenter:kimgooneya` PR searches returned zero on the sampled `Seegene.V2` repository. This does not exclude review activity in unqueried PRs.
- The local `gh` CLI token was invalid and could not be used. All positive evidence in this memo comes from the authenticated GitHub connector; the CLI failure is not treated as a GitHub no-evidence result.
- GitHub search/connector caps materially constrain completeness: organization inventory used three 100-result pages; commit checks used only the latest 3 (S–Z) or 5 (private user repositories); PR result requests were capped at 100; private-repository PR searches intermittently returned HTTP 403 rate-limit errors; two named repositories returned 404. Therefore “no evidence” means no match in the stated bounded queries.
- No writes or mutations were made to GitHub.


## Appendix D — identity, PR, review, and non-commit audit

# Member D: identity, PR, review, and non-commit activity audit

Audit date: 2026-08-01 (Asia/Seoul)

Scope: identity resolution and non-commit GitHub activity for `kimgooneya`, `shkim`, and the requested Korean name `김수현`, across repositories accessible to the connected GitHub account. This memo is additive; it does not modify the A-C repository memos.

## Executive findings

- The authenticated GitHub identity is `kimgooneya`, GitHub numeric user ID `26292512`, profile name `Soo Hyeon Kim`, and the profile email is present in the API response but redacted here as PII. This is **high confidence**, based on the authenticated profile endpoint and PR payloads carrying the same numeric ID.
- `shkim` is a different GitHub identity: numeric user ID `1094548`, login `shkim`, and avatar URL `https://avatars.githubusercontent.com/u/1094548?v=4`. This is **high confidence** as a distinct account from `kimgooneya` because the IDs differ. The connector did not expose a standalone arbitrary-user profile endpoint, so no public name/email was available for `shkim`.
- `김수현` is best treated as a **medium-confidence human-name alias** for the authenticated `kimgooneya` / Soo Hyeon Kim identity, but the GitHub API did not return a Korean-name field. A direct GitHub user search for `김수현` was rejected as an invalid/unsearchable listed user. Do not count it as a third GitHub login.
- Authored PR searches found extensive `kimgooneya` activity in the repository families listed below. The table records exact observed counts and PR IDs where the search was below the connector's 100-result cap; rows marked `at least` or `capped` are deliberately not presented as totals.
- Non-commit evidence found: two review submissions by `kimgooneya`, five PR conversation comments by `kimgooneya`, and three PR conversation comments by `shkim`. No standalone issue activity was returned by the cross-private-repository issue searches. Releases and Discussions could not be exhaustively queried because no corresponding read tools were exposed by the connected GitHub surface.

## Identity map

| Requested identifier | GitHub login | Numeric ID | Evidence | Confidence |
|---|---|---:|---|---|
| `kimgooneya` | `kimgooneya` | `26292512` | `github_get_profile` returned `Soo Hyeon Kim`; `github_get_user_login` returned the same login/ID; PR metadata for `langcodestartup/kt-gsi#9`, `langcodestartup/excel-parser#26`, `langcodestartup/LangcodeApp#6`, `wezenhealthcare/wezen-rfid-scanner#108`, and `kimgooneya/resume#4` carried the same user ID. | High |
| `김수현` | No separate login resolved | likely `kimgooneya` / `Soo Hyeon Kim` | Romanized profile name is `Soo Hyeon Kim`; direct search query `author:김수현` was rejected by GitHub as an invalid/unsearchable listed user. No API field explicitly supplied the Korean spelling. | Medium |
| `shkim` | `shkim` | `1094548` | PR metadata for `shkim/fundamental-react#2` and `yann-shi/hero#18` carried login `shkim` and ID `1094548`; this differs from `26292512`. | High |

## Authored PR index: kimgooneya identity

Counts below are authored PR search results, not commit counts. Each repository URL is exact. For contiguous PR IDs, the notation `#1-#N` means every ID in that interval was returned by the repository-scoped search. `at least` means the 100-result connector cap or a secondary rate limit prevented an uncapped total.

| Repository | Observed authored PR count | Exact observed PR IDs / URL anchor |
|---|---:|---|
| `langcodestartup/LangcodeApp` | 34 | #3-#17, #19-#22, #24-#28, #30-#31, #34-#37, #39-#40, #43-#44; [PR list](https://github.com/langcodestartup/LangcodeApp/pulls?q=is%3Apr+author%3Akimgooneya) |
| `langcodestartup/PaperPop` | 99 | #1-#99; [PR list](https://github.com/langcodestartup/PaperPop/pulls?q=is%3Apr+author%3Akimgooneya) |
| `langcodestartup/Langcode.CarbonDesign` | 1 | #4; [PR](https://github.com/langcodestartup/Langcode.CarbonDesign/pull/4) |
| `langcodestartup/KbhcCosmosEngine` | 32 | #1, #4, #11, #19, #26, #30, #32-#39, #44-#57, #59-#62; [PR list](https://github.com/langcodestartup/KbhcCosmosEngine/pulls?q=is%3Apr+author%3Akimgooneya) |
| `langcodestartup/Langcode.CXP` | 13 | #1-#3, #5-#6, #8-#13, #20, #45; [PR list](https://github.com/langcodestartup/Langcode.CXP/pulls?q=is%3Apr+author%3Akimgooneya) |
| `langcodestartup/SpinInvoice` | 54 | #1-#2, #4, #6, #8-#9, #13, #35, #38-#39, #41, #43, #45, #47, #51, #53, #55-#57, #59-#61, #63-#71, #75-#76, #78-#98; [PR list](https://github.com/langcodestartup/SpinInvoice/pulls?q=is%3Apr+author%3Akimgooneya) |
| `langcodestartup/Beyondhoneycom` | 1 | #1; [PR](https://github.com/langcodestartup/Beyondhoneycom/pull/1) |
| `langcodestartup/NetmarblePoC` | 1 | #1; [PR](https://github.com/langcodestartup/NetmarblePoC/pull/1) |
| `langcodestartup/ibkPoC` | 2 | #1-#2; [PR list](https://github.com/langcodestartup/ibkPoC/pulls?q=is%3Apr+author%3Akimgooneya) |
| `langcodestartup/CelltrionPowerBIFunction` | 17 | #1, #4, #9-#16, #19-#23, #27, #33; [PR list](https://github.com/langcodestartup/CelltrionPowerBIFunction/pulls?q=is%3Apr+author%3Akimgooneya) |
| `langcodestartup/CelltrionPowerBIWebApp` | 75 | #45, #48-#50, #56-#58, #60, #65, #67-#68, #73, #95, #99, #105-#107, #110-#114, #116, #118, #120, #122, #140-#141, #155, #162-#167, #169, #175-#176, #183, #185, #194, #201, #203, #205, #208-#210, #214-#217, #220, #225-#229, #231-#232, #234, #236, #238, #242, #245-#246, #248-#249, #252-#255, #257, #260, #262, #264; [PR list](https://github.com/langcodestartup/CelltrionPowerBIWebApp/pulls?q=is%3Apr+author%3Akimgooneya) |
| `langcodestartup/NHRS` | 96 | #5, #10, #12-#56, #58-#92, #95-#97, #101-#102, #105-#113; [PR list](https://github.com/langcodestartup/NHRS/pulls?q=is%3Apr+author%3Akimgooneya) |
| `langcodestartup/NHBank` | 5 | #84, #90-#91, #97-#98; [PR list](https://github.com/langcodestartup/NHBank/pulls?q=is%3Apr+author%3Akimgooneya) |
| `langcodestartup/Seegene.V2` | 44 | #1-#3, #5-#8, #11-#27, #30, #34-#36, #39, #44-#46, #48-#49, #51-#56, #59-#60, #62-#63; [PR list](https://github.com/langcodestartup/Seegene.V2/pulls?q=is%3Apr+author%3Akimgooneya) |
| `langcodestartup/Langcode.CXP.V2` | 1 | #157; [PR](https://github.com/langcodestartup/Langcode.CXP.V2/pull/157) |
| `langcodestartup/goodneighbors-poc` | 1 | #1; [PR](https://github.com/langcodestartup/goodneighbors-poc/pull/1) |
| `langcodestartup/langcode.cxp.back` | 24 | #1-#5, #7-#22, #24, #31, #33; [PR list](https://github.com/langcodestartup/langcode.cxp.back/pulls?q=is%3Apr+author%3Akimgooneya) |
| `langcodestartup/KyoboPrePoC` | 6 | #1-#6; [PR list](https://github.com/langcodestartup/KyoboPrePoC/pulls?q=is%3Apr+author%3Akimgooneya) |
| `langcodestartup/KyoboPrePoC-Function` | 6 | #1-#2, #4, #6-#8; [PR list](https://github.com/langcodestartup/KyoboPrePoC-Function/pulls?q=is%3Apr+author%3Akimgooneya) |
| `kimgooneya/uigen` | 2 | #1, #3; [PR list](https://github.com/kimgooneya/uigen/pulls?q=is%3Apr+author%3Akimgooneya) |
| `kimgooneya/almott` | at least 6 | #1-#2, #4-#7 observed across date-partitioned searches; final repo query was secondary-rate-limited; [PR list](https://github.com/kimgooneya/almott/pulls?q=is%3Apr+author%3Akimgooneya) |
| `langcodestartup/dcai-onpremise` | at least 8 | #1-#8 observed in 2025 date-partitioned search; final repo query was secondary-rate-limited; [PR list](https://github.com/langcodestartup/dcai-onpremise/pulls?q=is%3Apr+author%3Akimgooneya) |
| `wezenhealthcare/wezen-rfid-scanner` | at least 100 | #1-#52, #60-#108 observed before the 100-result cap; IDs #53-#59 and any later IDs require a fresh uncapped query; [PR list](https://github.com/wezenhealthcare/wezen-rfid-scanner/pulls?q=is%3Apr+author%3Akimgooneya) |
| `langcodestartup/cxp-be` | at least 25 | #1-#25 observed in global 2026 search; per-repository requery was secondary-rate-limited; [PR list](https://github.com/langcodestartup/cxp-be/pulls?q=is%3Apr+author%3Akimgooneya) |
| `langcodestartup/cxp-light-fe` | at least 4 | #2-#5 observed in global 2026 search; per-repository requery was secondary-rate-limited; [PR list](https://github.com/langcodestartup/cxp-light-fe/pulls?q=is%3Apr+author%3Akimgooneya) |
| `kimgooneya/Draftly` | 10 observed | #2-#11 excluding no IDs; [PR list](https://github.com/kimgooneya/Draftly/pulls?q=is%3Apr+author%3Akimgooneya) |
| `langcodestartup/langcode.cxp.front` | at least 4 | #61-#62, #64, #69 observed in global 2026 search; requery rate-limited; [PR list](https://github.com/langcodestartup/langcode.cxp.front/pulls?q=is%3Apr+author%3Akimgooneya) |
| `langcodestartup/excel-parser` | 12 | #4-#6, #11-#15, #20-#21, #25-#26; [PR list](https://github.com/langcodestartup/excel-parser/pulls?q=is%3Apr+author%3Akimgooneya) |
| `kimgooneya/ai-translator` | 20 observed | #1-#20; [PR list](https://github.com/kimgooneya/ai-translator/pulls?q=is%3Apr+author%3Akimgooneya) |
| `langcodestartup/kt-gsi` | 9 | #1-#9; [PR list](https://github.com/langcodestartup/kt-gsi/pulls?q=is%3Apr+author%3Akimgooneya) |
| `kimgooneya/resume` | 4 | #1-#4; [PR list](https://github.com/kimgooneya/resume/pulls?q=is%3Apr+author%3Akimgooneya) |

The observed lower bound across the rows above is 716 PR records when capped rows are counted at their lower bound. This is a lower bound, not a claim that 716 is the complete total.

## Authored PR index: shkim identity

| Repository | PR | Exact evidence |
|---|---:|---|
| `yann-shi/hero` | #18 | [PR #18](https://github.com/yann-shi/hero/pull/18); authored by `shkim` ID `1094548`; created `2017-05-11T20:16:07Z`; closed `2017-05-12T06:26:47Z`; not merged. |
| `shkim/XingSharp` | #1 | [PR #1](https://github.com/shkim/XingSharp/pull/1); returned by `author:shkim`. |
| `sdcoffey/techan` | #22 | [PR #22](https://github.com/sdcoffey/techan/pull/22); returned by `author:shkim`. |
| `shkim/fundamental-react` | #1 | [PR #1](https://github.com/shkim/fundamental-react/pull/1); returned by `author:shkim`. |
| `shkim/fundamental-react` | #2 | [PR #2](https://github.com/shkim/fundamental-react/pull/2); authored by `shkim` ID `1094548`; created `2023-04-05T18:49:57Z`; merged `2023-04-05T18:50:42Z`; merge commit `f04e70cd1d4775916ba8023162f6535703e38c5c`. |

No PR was returned for `reviewed-by:shkim`. The search returned one PR for `commenter:shkim`, `yann-shi/hero#18`, and its exact comments are listed below.

## Non-commit activity evidence

### kimgooneya reviews

The global `reviewed-by:kimgooneya` search returned exactly two PRs in the accessible index. `fetch_pr_comments` supplied the concrete review IDs and timestamps:

| Repository / PR | Activity | Review ID | Date | URL |
|---|---|---:|---|---|
| `langcodestartup/langcode.cxp.back#29` | `COMMENTED`, body `완료` | `2912340698` | `2025-06-10T07:39:42Z` | [review event](https://github.com/langcodestartup/langcode.cxp.back/pull/29#pullrequestreview-2912340698) |
| `langcodestartup/langcode.cxp.back#34` | `APPROVED`, body `검토완료` | `2923315086` | `2025-06-13T03:21:03Z` | [review event](https://github.com/langcodestartup/langcode.cxp.back/pull/34#pullrequestreview-2923315086) |

The PR metadata for `langcode.cxp.back#34` shows the PR author was `tksgo1995` (ID `36852046`), so this is review activity by `kimgooneya` on another user's PR, not an authored-PR duplicate.

### kimgooneya PR conversation comments

The global `commenter:kimgooneya` search returned five PRs, and targeted timeline fetches confirmed these exact issue-comment IDs:

| Repository / PR | Comment ID | Date | URL |
|---|---:|---|---|
| `langcodestartup/LangcodeApp#3` | `895658346` | `2021-08-10T01:23:51Z` | [issue comment](https://github.com/langcodestartup/LangcodeApp/pull/3#issuecomment-895658346) |
| `langcodestartup/LangcodeApp#4` | `895662648` | `2021-08-10T01:38:10Z` | [issue comment](https://github.com/langcodestartup/LangcodeApp/pull/4#issuecomment-895662648) |
| `langcodestartup/LangcodeApp#6` | `898226311` | `2021-08-13T06:35:14Z` | [issue comment](https://github.com/langcodestartup/LangcodeApp/pull/6#issuecomment-898226311) |
| `langcodestartup/langcode.cxp.back#29` | review `2912340698` | `2025-06-10T07:39:42Z` | [review comment/event](https://github.com/langcodestartup/langcode.cxp.back/pull/29#pullrequestreview-2912340698) |
| `langcodestartup/langcode.cxp.back#34` | review `2923315086` | `2025-06-13T03:21:03Z` | [review comment/event](https://github.com/langcodestartup/langcode.cxp.back/pull/34#pullrequestreview-2923315086) |

### shkim PR conversation comments

`fetch_pr_comments` for `yann-shi/hero#18` returned three comments by `shkim` ID `1094548`:

| Comment ID | Date | URL |
|---:|---|---|
| `300979489` | `2017-05-12T04:14:44Z` | [issue comment](https://github.com/yann-shi/hero/pull/18#issuecomment-300979489) |
| `300990557` | `2017-05-12T05:56:26Z` | [issue comment](https://github.com/yann-shi/hero/pull/18#issuecomment-300990557) |
| `300994570` | `2017-05-12T06:26:47Z` | [issue comment](https://github.com/yann-shi/hero/pull/18#issuecomment-300994570) |

The same timeline contained six total events, including the PR's discussion/review context; only the three attributable comments are counted here.

## Representative authored/merged PR metadata

These records were fetched with `github_get_pr_info` to verify that search hits resolve to the expected identity and to preserve exact dates/SHAs:

| PR | Identity / status | Exact dates and SHAs |
|---|---|---|
| [kt-gsi#9](https://github.com/langcodestartup/kt-gsi/pull/9) | `kimgooneya` ID `26292512`, merged | created `2026-07-18T10:51:13Z`; merged `2026-07-18T10:51:15Z`; head `ce584139531156b561c9f6307ae680a8f295bc6c`; merge `7f0654263b11e5090c4229f9bb6667417b668d1b`. |
| [excel-parser#26](https://github.com/langcodestartup/excel-parser/pull/26) | `kimgooneya` ID `26292512`, merged | created `2026-06-13T15:49:05Z`; merged `2026-06-13T15:52:43Z`; head `b0f9e9a2496482d4c7d1b02d0409c13a3f11f07a`; merge `3397198b3dfdf30727e572355e77a8fd999e05a1`. |
| [LangcodeApp#6](https://github.com/langcodestartup/LangcodeApp/pull/6) | `kimgooneya` ID `26292512`, merged | created `2021-08-13T06:34:59Z`; merged `2021-08-13T06:35:23Z`; head `91033d8450a9a9f1b5588b9d19a69dbd3383c13a`; merge `37c4ea534931131fa671d3c916acd131f49d49c3`. |
| [wezen-rfid-scanner#108](https://github.com/wezenhealthcare/wezen-rfid-scanner/pull/108) | `kimgooneya` ID `26292512`, merged | created `2026-03-27T14:39:23Z`; merged `2026-03-27T14:39:34Z`; head `08bc16c198b4f936f8814b8c4786ca1ebdec8319`; merge `be258c8af4bbcaca59d63b79e03c9bd78af75a7d`. |
| [resume#4](https://github.com/kimgooneya/resume/pull/4) | `kimgooneya` ID `26292512`, merged | created `2026-08-01T06:19:40Z`; merged `2026-08-01T06:20:10Z`; head `f6f8f4a0981acf02b13d063a598b921eee68febf`; merge `91837fc6b6f48a46308bedd7f71d945f449a846f`. |
| [fundamental-react#2](https://github.com/shkim/fundamental-react/pull/2) | `shkim` ID `1094548`, merged | created `2023-04-05T18:49:57Z`; merged `2023-04-05T18:50:42Z`; head `6f5fbd15fe388e18383190de33f546215842a495`; merge `f04e70cd1d4775916ba8023162f6535703e38c5c`. |
| [hero#18](https://github.com/yann-shi/hero/pull/18) | `shkim` ID `1094548`, closed, not merged | created `2017-05-11T20:16:07Z`; closed `2017-05-12T06:26:47Z`; head `fc5a132caa1200061638d77445501b4cfefa4a64`. |

## API query scope and limitations

### Queries run

- `github_get_profile`, `github_get_user_login` for authenticated identity.
- `github_list_repositories(page_size=1000)` returned 244 accessible repositories: 221 private and 23 public. `github_list_installed_accounts` returned `kimgooneya`, `wezenhealthcare`, `PyeongsaengCoding`, and `langcodestartup`; `github_list_user_orgs` returned no org memberships.
- `github_search_prs` for `author:kimgooneya`, `author:shkim`, `reviewed-by:kimgooneya`, `reviewed-by:shkim`, `commenter:kimgooneya`, and `commenter:shkim`. `kimgooneya` searches were partitioned by creation date and then narrowed by repository where possible.
- `github_search_issues` across the 221 private repositories for `author:kimgooneya`, `commenter:kimgooneya`, `author:shkim`, and `commenter:shkim` returned zero records. This should be interpreted as no returned evidence, not proof that no historical issue interaction exists, because the connector's multi-repository issue search behavior is not independently verifiable here.
- `github_fetch_pr_comments` for the six targeted PRs listed above, covering issue comments, inline review comments, and review submissions in one normalized timeline.
- `github_get_pr_info` for the representative PRs listed above.

### Gaps and caps

- The connector's PR search `topn` cap is 100. Date partitioning removed truncation for most periods, but `wezenhealthcare/wezen-rfid-scanner` still returned 100 results and is therefore a lower bound. The 2026 March global slice also reached 100 before the repository sweep was rate-limited.
- GitHub returned secondary-rate-limit (HTTP 403) responses during the final burst of repository-scoped queries. Rows explicitly marked `at least` or `requery rate-limited` are not complete totals.
- The local `gh` CLI could not be used as a fallback: `gh auth status` reported the configured `kimgooneya` token invalid, and API calls also failed with a connection error. No token value was copied into this memo.
- No read tool for GitHub Releases, Discussions, user events, or a global standalone issue-comment feed was exposed in the connected app. Releases and Discussions are therefore unverified, not negative findings.
- Search-result payloads did not reliably include author/date fields; exact dates, IDs, and merge status are included only where `get_pr_info` or `fetch_pr_comments` was run. The remaining authored-PR rows are exact URL/ID search evidence but not individually status-verified.
- Commit authorship, branch-only activity, and repository-wide commit searches belong to the A-C repository slices and are intentionally not duplicated here.
