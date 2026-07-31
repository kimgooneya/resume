# Pocket Field Guide Portfolio Design System

## 0. Direction Log

- Brief: 기존 3D 복셀 포트폴리오를 1980년대 말–1990년대 초 단색 휴대용 2D RPG의 맵 이동과 대화형 소개 경험으로 전면 개편한다.
- Reference grammar: 초기 4단계 LCD 팔레트, 낮은 논리 해상도, 정방형 타일, 사각 대화창, 큰 십자 방향 패드 문법을 참고하되 특정 게임이나 기기의 로고, 캐릭터, 몬스터, 지도, 명칭, 사운드, 외형, 에셋은 복제하지 않는다.
- Generated studies:
  - `assets/concepts/classic-portfolio-ui-reference.png` (1586×992): 타일·대화창·D-pad 문법 참고.
  - `assets/concepts/classic-portfolio-wide-regions-reference.png` (1672×941): 넓은 맵 비중과 마을별 색상 참고. 여러 지역이 한 지도에 이어진 구조는 이후 사용자 피드백으로 폐기했으므로 지리 구조의 기준으로 사용하지 않는다.
- Final layout contract: 상단 플레이 영역에서 현재 지역의 로컬 맵 74%, 지역 목록 22%, 외곽 여백 4%. 전체 화면 하단 18–22%는 상시 보이는 조작 덱으로 사용한다. 4px 잉크 테두리, 밝은 내부 하이라이트, 오른쪽/아래 단차 그림자를 구현 기준으로 삼는다.
- Signature moment: 방문자가 작은 개발자 캐릭터를 직접 움직여 다섯 작업소 앞 표지판을 읽고, 하단 대화창에서 실제 프로젝트 소개를 발견한다.
- Interaction reference: beui.dev `center-morph-modal`의 포커스 복귀와 reduced-motion 계약만 가져오고, 시각 전환은 고전 게임의 즉시 나타나는 대화창 문법으로 재해석한다.

## 1. Atmosphere & Identity

초기 단색 휴대용 게임 카트리지에서 막 꺼낸 듯한 작은 포트폴리오 지역이다. 화면은 정확히 네 단계로 나뉜 LCD 팔레트와 짙은 1픽셀 윤곽, 큰 픽셀 덩어리로 구성한다. 컬러 일러스트처럼 세밀한 명암, 안티앨리어싱, 현대적인 유리 패널, 그라데이션, 둥근 카드, 3D 원근은 사용하지 않는다.

핵심 경험은 `지역 목록에서 선택 → 해당 지역 안에서 탐험 → 랜드마크 옆 주민과 대화 → 작업 소개 읽기`다. 지역 사이는 걸어서 이동할 수 없으며 지역 목록만이 유일한 지역 전환 수단이다. 소개 내용은 장식보다 우선하고, 모든 기능은 키보드와 터치 양쪽에서 완주할 수 있어야 한다.

## 2. Color

LCD 플레이 영역의 지도, 탐험 수첩, 대화창만 `dark`, `deep`, `mid`, `light` 네 단계의 지역 팔레트를 사용한다. 외곽 셸과 하단 조작 덱은 지역 테마와 완전히 분리된 고정 중립 팔레트를 사용한다.

| Role | Token | Value | Usage |
|---|---|---|---|
| Page ink | `--ink-0` | `#17291f` | 본문, 외곽선, 가장 어두운 타일 |
| Deep ink | `--ink-1` | `#31553f` | 그림자, 나무, 물결 |
| Mid LCD | `--lcd-2` | `#7a9b58` | 중간 지형, 비활성 상태 |
| Light LCD | `--lcd-3` | `#c8d98b` | 기본 화면, 패널 배경 |
| Paper | `--paper` | `#eef2c2` | 셸과 화면 바깥 여백만 |
| Shell | `--shell` | `#d7d0b5` | 바깥 프레임 |
| Shell shadow | `--shell-shadow` | `#8b866f` | 프레임 단차 |
| Focus | `--focus` | `#fffbd1` | 포커스와 선택 커서 |
| Danger | `--danger` | `#65221f` | 오류/차단 상태만; `--chrome-mid` 배경 대비 4.5:1 이상 |

색만으로 상태를 구분하지 않는다. 선택 상태에는 `▶`, 테두리, 텍스트를 함께 사용한다.

### Fixed Shell & Control Palette

아래 색상은 모든 마을에서 절대 바뀌지 않는다. `data-theme`은 이 토큰을 덮어쓸 수 없다.

| Role | Token | Value | Usage |
|---|---|---|---|
| Chrome light | `--chrome-light` | `#ded7bd` | 외곽 셸, 조작 덱 바탕 |
| Chrome mid | `--chrome-mid` | `#a7a18d` | 내부 단차, 버튼 하이라이트 |
| Chrome dark | `--chrome-dark` | `#555950` | D-pad와 A/B 버튼 |
| Chrome ink | `--chrome-ink` | `#252b27` | 조작부 외곽선과 라벨 |

조작 덱에는 숲 녹색, 도시 청색, 사막 황토, 설원 남색, 해안 청록을 사용하지 않는다. A/B 버튼도 지역별 강조색 없이 `--chrome-dark`로 통일한다.

### Village Palette Variants

마을 선택 또는 진입 시 `data-theme`은 LCD 플레이 영역의 네 단계 램프만 바꾼다. 조작 덱과 외곽 셸은 영향을 받지 않으며, 구조와 명암 역할은 그대로 유지한다.

| Village | Dark | Deep | Mid | Light | Character |
|---|---|---|---|---|---|
| Forest | `#0f1f14` | `#315b35` | `#78a34e` | `#d5e596` | 짙은 소나무와 이끼 |
| City | `#152530` | `#31536b` | `#7595a1` | `#d2e1d0` | 청회색 금속과 콘크리트 |
| Desert | `#2b1a10` | `#7a4b28` | `#c2944f` | `#f0dda2` | 황토와 마른 모래 |
| Snow | `#25283d` | `#4c5478` | `#909ab5` | `#e6ebd1` | 푸른 그림자와 서리 |
| Coast | `#102c2b` | `#1f6260` | `#63a08a` | `#d4e5ad` | 바닷물과 해안 풀 |

## 3. Typography

- Display/UI: `"DungGeunMo", "Galmuri11", "Apple SD Gothic Neo", "Courier New", monospace`
- 모든 텍스트는 정수 픽셀 크기와 굵기 700을 사용한다.
- 한국어는 `word-break: keep-all`, `overflow-wrap: break-word`를 사용한다.
- 제목과 버튼은 과도한 영문 대문자를 피하고, 시스템 라벨에만 짧은 영문을 허용한다.

| Token | Value | Usage |
|---|---|---|
| `--type-title` | `clamp(1.25rem, 3vw, 1.75rem)` | 페이지 제목 |
| `--type-dialog` | `clamp(0.875rem, 2vw, 1rem)` | 대화/소개 본문 |
| `--type-ui` | `0.8125rem` | 버튼과 메뉴 |
| `--type-micro` | `0.6875rem` | 상태 표시 |
| `--leading-tight` | `1.25` | 제목 |
| `--leading-copy` | `1.65` | 한국어 본문 |

## 4. Spacing & Layout

기본 단위는 4px이다.

| Token | Value | Usage |
|---|---|---|
| `--space-1` | `4px` | 픽셀 단차 |
| `--space-2` | `8px` | 조밀한 간격 |
| `--space-3` | `12px` | 버튼 내부 |
| `--space-4` | `16px` | 패널 내부 |
| `--space-6` | `24px` | 큰 구획 |
| `--space-8` | `32px` | 데스크톱 바깥 여백 |
| `--pixel-border` | `4px` | 모든 주요 패널 테두리 |
| `--control-min` | `56px` | 최소 터치 타깃 |
| `--dpad-size` | `128px` | 데스크톱 십자 방향 패드 |
| `--action-size` | `64px` | 데스크톱 A/B 버튼 |
| `--game-max` | `70rem` | 전체 게임 셸 최대폭 |
| `--map-ratio` | `4 / 3` | 24×18 타일 맵 비율 |

- 전체 셸은 `min-height: 100dvh`이며 문서가 세로 스크롤을 소유한다.
- 데스크톱: 상단 플레이 영역에서 왼쪽 지도는 74%, 오른쪽 지역 메뉴는 22%를 사용한다. 하단 조작 덱은 전체 셸 높이의 18–22%를 차지한다.
- 900px 이하: 지도 위, 메뉴 아래 한 열로 전환한다.
- 600px 이하: 바깥 프레임을 화면 가장자리까지 확장하고 112px D-pad와 56px A/B를 지도 아래 고정 배치한다.
- 지도 캔버스는 논리 해상도 `384×288`, 24×18 타일, 16px 셀을 사용하고 CSS에서 정수 배율로 확대한다.

## 5. Components

### Game Shell

- **Structure**: masthead, LCD map frame, side menu, large control deck, footer status
- **States**: loading, ready, dialog-open
- **Surface**: 둥근 카드 대신 4px 사각 픽셀 테두리와 오른쪽/아래 단차 그림자
- **Responsive**: 900px 이하 한 열, 600px 이하 프레임 단차 축소

### Local Tile Map

- **Structure**: 지역마다 독립된 40×64 타일 세로형 맵, 길·환경물·랜드마크·주민·캐릭터. 화면에는 한 번에 24×18 타일만 보인다.
- **States**: free, destination-selected, landmark-near, discovered
- **Rendering**: `imageSmoothingEnabled = false`, `image-rendering: pixelated`
- **Accessibility**: 캔버스 주변에 현재 위치, 목적지, 상호작용 가능 상태를 텍스트로 제공
- **Motion**: 한 칸 이동은 즉시 갱신한다. 자동 장식 애니메이션은 없다.
- **Boundary**: 캐릭터는 현재 지역 경계를 넘을 수 없고 다른 지역으로 이어지는 출구·도로를 두지 않는다.

### Scrolling Camera

- **Viewport**: 논리 화면 `384×288`, 24×18 타일. 지역 전체 40×64 타일 중 현재 위치 주변만 보여준다.
- **Primary axis**: 시작점은 남쪽, 랜드마크는 북쪽에 둔다. 주 동선은 최소 2.5개 뷰포트 높이이며 카메라는 상하 이동을 중심으로 따라간다.
- **Follow**: 캐릭터가 화면 중앙의 8×6 타일 안전 영역을 벗어날 때 카메라가 한 타일 단위로 따라간다.
- **Edge clamp**: 지역 가장자리에서는 카메라를 맵 경계에 고정해 빈 바깥 영역이 보이지 않게 한다.
- **Region entry**: 지역 목록에서 선택하면 지역 시작점에 캐릭터를 배치하고 카메라를 해당 시작점에 즉시 맞춘다.
- **Landmark reveal**: 시작점에서 랜드마크까지 길·표지판·환경 실루엣으로 방향을 안내한다. 현대적인 미니맵이나 화면 위 화살표는 사용하지 않는다.
- **Reduced motion**: 카메라 보간 없이 즉시 다음 타일 위치로 갱신한다. 기본 모드에서도 고전 게임처럼 짧고 단단한 타일 스크롤만 사용한다.

### Player Sprite

- **Structure**: 16×20px 고유 개발자 캐릭터. 캡, 가방, 얼굴, 다리의 단순 픽셀 블록
- **States**: idle, step-a, step-b, near
- **Input**: WASD/방향키 또는 터치 방향 패드
- **Collision**: 물, 나무, 건물 본체, 지도 경계를 통과하지 않는다.

### Region Menu

- **Structure**: 다섯 프로젝트 작업소의 실제 `<button>` 목록
- **States**: default, hover, focus-visible, selected, discovered
- **Feedback**: 선택 행 앞에 `▶`, 발견 행 뒤에 `완료`
- **Action**: 선택 즉시 해당 지역의 독립 로컬 맵을 불러오고 캐릭터를 지역 시작점에 배치한다. 걸어서 지역을 바꾸는 대체 경로는 제공하지 않는다.
- **Persistence**: 지역 목록은 플레이 중에도 항상 접근 가능하다.
- **Theme**: 선택한 지역의 팔레트로 메뉴 커서·버튼·맵 전체를 함께 전환한다.

### Landmark Resident

각 지역은 하나의 랜드마크와 그 앞을 지키는 한 명의 주민을 가진다. 주민에게 A/Enter로 말을 걸면 작업 소개가 열린다.

| Region | Landmark | Resident role | Explains |
|---|---|---|---|
| Forest | 별빛 관측소 | 데이터 연구원 | 데이터·AI 작업의 문제와 관측 방식 |
| City | 시안 타워 | 제품 기술자 | 제품 설계와 엔지니어링 판단 |
| Desert | 자동화 공방 | 자동화 장인 | 반복 업무를 도구로 바꾼 과정 |
| Snow | 릴레이 기지 | 운영 관제사 | 안정성·배포·복구 체계 |
| Coast | 연결의 등대 | 협업 안내원 | 사람과 시스템의 맥락 연결 |

- **States**: idle, player-near, talking, explained
- **Interaction**: 캐릭터가 주민을 향한 상태에서 A/Enter를 누르면 대화 시작
- **Content**: 첫 대화는 주민의 한 문장 소개, 다음 입력은 구조화된 프로젝트 소개
- **Discovery**: 프로젝트 소개를 끝까지 열었을 때 해당 지역을 `완료`로 기록

### Dialogue Box

- **Structure**: speaker label, 2–4줄 본문, 다음 행동 힌트
- **States**: welcome, navigation, nearby, selected, error
- **Motion**: 내용 교체는 즉시 수행한다. 캐럿 점멸 같은 무한 장식은 사용하지 않는다.
- **Accessibility**: `aria-live="polite"`, 자연스러운 한국어 줄바꿈

### Project Introduction

- **Structure**: 상단 프로젝트명/역할/연도, 요약, 세 가지 결과, 기술 목록, 닫기 버튼
- **Data**: `preview/projects.json`을 단일 원본으로 유지한다.
- **States**: closed, open
- **Input**: 건물 앞 `Space`/`Enter`/A 버튼으로 열고 `Escape`/B/닫기로 닫는다.
- **Focus**: 열 때 닫기 버튼에 포커스, 닫을 때 직전 트리거로 복귀
- **Motion**: 기본은 120ms opacity/scale. reduced-motion에서는 즉시 표시

### Touch Controls

- **Structure**: 하단 조작 덱의 왼쪽에 128px 십자형 4방향 패드, 오른쪽에 64px A/B 버튼을 엇갈려 배치한다. 키보드 환경에서도 시각적으로 항상 표시한다.
- **Color boundary**: 덱 바탕은 `--chrome-light`, D-pad와 A/B는 `--chrome-dark`, 외곽선과 라벨은 `--chrome-ink`를 사용한다. 지역 선택으로 변하지 않는다.
- **States**: idle, pressed, focus-visible
- **Accessibility**: 각 방향과 기능에 명확한 `aria-label`, 56px 이상 타깃
- **Visibility**: 모든 화면에서 표시하며 600px 이하에서 D-pad 112px, A/B 56px까지만 축소한다.
- **Hierarchy**: `이동` 텍스트는 패드 아래 보조 라벨로 두고, 작은 키 아이콘만 있는 기존 푸터 표현은 사용하지 않는다.

## 6. Motion & Interaction

| Token | Value | Usage |
|---|---|---|
| `--motion-fast` | `90ms` | 버튼 누름 |
| `--motion-dialog` | `120ms` | 소개창 열기/닫기 |
| `--motion-reduced` | `0.01ms` | 모션 감소 |

- 공간 이동은 현재 지역 안에서만 격자 한 칸 단위이며 큐를 만들지 않는다.
- 지역 목록 선택은 로컬 맵을 즉시 교체한다. 지역 사이를 잇는 보행 경로, 출구, 월드맵은 만들지 않는다.
- 카메라는 캐릭터를 따라 지역 내부를 스크롤하며, 이동하지 않는 동안 자동으로 움직이지 않는다.
- 키 반복은 브라우저 기본 repeat를 허용하되 대화창이 열린 동안 맵 입력을 차단한다.
- 목적지는 점선이나 화살표보다 길 위의 작은 `X` 타일과 텍스트 거리를 함께 보여준다.
- 버튼은 hover/focus에서 전경·배경 반전, press에서 `translate(2px, 2px)`만 사용한다.
- 모든 전환은 `transform`, `opacity`만 사용한다.
- `prefers-reduced-motion: reduce`에서는 소개창 전환을 제거한다.

## 7. Depth & Surface

전략은 `pixel-step`이다. 모든 표면은 다음 세 층으로 읽힌다.

1. 짙은 4px 외곽선
2. 밝은 내부 2px 하이라이트
3. 오른쪽/아래 4px 단차 그림자

그라데이션, blur, glassmorphism, 둥근 pill, 발광 효과는 금지한다. 지도 깊이는 색면이 아니라 1–2px 픽셀 디더링, 나무의 겹침, 건물의 지붕/벽 명도 차로 만든다.

## 8. Accessibility Constraints & Accepted Debt

### Constraints

- 모든 핵심 흐름을 키보드만으로 완료 가능
- 44px 이상 터치 타깃
- `focus-visible`은 3px 밝은 외곽선과 2px 간격
- 프로젝트 소개는 native `<dialog>`와 포커스 복귀 사용
- 현재 위치/목적지/상호작용 상태를 캔버스 밖 텍스트로 중복 제공
- 375px, 768px, 1280px에서 가로 스크롤·CJK 고아 줄·버튼 겹침 금지
- 색 대비는 본문 4.5:1 이상

### Personas

- 키보드 사용자: Tab, 방향키, Enter/Space, Escape만으로 탐험과 소개 열기/닫기 가능
- 터치 사용자: 방향 패드, A/B, 지역 메뉴로 동일 흐름 가능
- 모션 민감 사용자: 맵 자동 이동과 장식 애니메이션 없이 즉시 상태 전환
- 저시력 사용자: 확대 시 픽셀 캔버스는 유지되고 텍스트 UI는 브라우저 확대에 맞춰 커짐

### Accepted Debt

| Item | Location | Why accepted | Exit |
|---|---|---|---|
| 실제 경력/프로젝트 원문 대신 역할별 예시 데이터 사용 | `preview/projects.json` | 사용자 원문이 아직 없음 | 원문 제공 시 JSON만 교체 |
| 외부 픽셀 폰트를 내려받지 않음 | typography tokens | 오프라인·정적 배포와 성능 우선 | 로컬 라이선스 폰트가 제공되면 WOFF2 서브셋 추가 |
