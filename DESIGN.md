# Voxel Village Portfolio Design System

## 1. Atmosphere & Identity

어두운 우주 위에 놓인 밝고 정교한 장난감 마을 지도다. 방문자는 작은 복셀 탐험가를 직접 움직여 서로 다른 생태 마을과 랜드마크를 발견한다. 시그니처는 숲·도시·사막·설원·항구가 도로, 철도, 강으로 연결되고 각 마을 중앙에 하나의 강한 프로젝트 랜드마크가 서 있는 구성이다. 기준 이미지는 `assets/concepts/voxel-flat-portfolio-world-concept.png`이며, 특정 게임의 캐릭터·에셋·UI는 복제하지 않는다.

## 2. Color

| Role | Token | Value | Usage |
|---|---|---|---|
| Space/deep | `--space-deep` | `#030819` | 월드 밖 배경 |
| Space/core | `--space-core` | `#071a3b` | 지도 주변 광원 |
| Surface/glass | `--surface-glass` | `rgba(4, 17, 39, 0.82)` | HUD와 상세 패널 |
| Text/primary | `--text-primary` | `#f4fbff` | 제목과 주요 정보 |
| Text/secondary | `--text-secondary` | `#9fd3df` | 설명과 메타데이터 |
| Border/glow | `--border-glow` | `rgba(103, 230, 243, 0.42)` | 선택과 포커스 |
| Accent/cyan | `--accent-cyan` | `#67e6f3` | 랜드마크 비콘 |
| Water/deep | `--water-deep` | `#087f9c` | 깊은 물 |
| Water/light | `--water-light` | `#22c6cf` | 강과 해안 |
| Forest/deep | `--forest-deep` | `#347f36` | 숲 바닥과 수목 |
| Meadow | `--meadow` | `#7fbd48` | 초원 |
| City | `--city` | `#91b9b4` | 도시 지면 |
| Coast | `--coast` | `#68bd86` | 항구 초지 |
| Sand | `--sand` | `#e8b84f` | 사막과 해변 |
| Snow | `--snow` | `#e8f4f4` | 설원 |
| Ice | `--ice` | `#9fd9df` | 얼음 지형 |
| Road | `--road` | `#3e454d` | 도로 |
| Rail | `--rail` | `#76553d` | 철도 침목 |
| Building/light | `--building-light` | `#e8e2ce` | 건물 벽 |
| Building/dark | `--building-dark` | `#485565` | 도시 구조 |
| Roof | `--roof` | `#2e5b83` | 마을 지붕 |
| Beacon | `--beacon` | `#4ce6ff` | 선택 가능한 노드 |
| Warning | `--warning` | `#ff9d4d` | 사막 작업장 포인트 |
| Soil/deep | `--soil-deep` | `#273f43` | 절벽과 지도 하부 |
| Soil/mid | `--soil-mid` | `#48645c` | 두 번째 지층 |
| Cliff/light | `--cliff-light` | `#6f8c72` | 지형 수직면 하이라이트 |
| Road/marking | `--road-marking` | `#f6d46b` | 도로 중앙선 |
| Rail/metal | `--rail-metal` | `#a9bbc0` | 두 줄 레일 |
| Shore/foam | `--shore-foam` | `#b8f4e8` | 물과 육지의 경계 |
| Explorer/skin | `--explorer-skin` | `#f2c7a5` | 캐릭터 얼굴과 손 |
| Explorer/scarf | `--explorer-scarf` | `#ff6f61` | 캐릭터 정체성 포인트 |
| Explorer/pack | `--explorer-pack` | `#5c3f35` | 배낭 |
| Shadow/contact | `--shadow-contact` | `#030819` | 랜드마크·캐릭터 접촉 그림자. 투명도는 재질에서 적용 |

모든 UI와 3D 재질은 위 역할에서만 가져온다. 생태색은 월드 안에서, 청록색은 선택과 상호작용 상태에서만 사용한다.

## 3. Typography

| Level | Size | Weight | Line Height | Tracking | Usage |
|---|---|---|---|---|---|
| Display | `clamp(1.75rem, 4vw, 3.5rem)` | 800 | 1.0 | `-0.04em` | 월드 제목 |
| H2 | `1.25rem` | 800 | 1.2 | `-0.02em` | 선택 마을 |
| Body | `1rem` | 500 | 1.5 | `-0.01em` | 설명 |
| Caption | `0.75rem` | 700 | 1.4 | `0.12em` | 상태와 생태 라벨 |

- Primary: `"Trebuchet MS", "Avenir Next", system-ui, sans-serif`
- Mono: `"SFMono-Regular", Consolas, monospace`
- 한국어는 `word-break: keep-all`을 사용하고 제목은 최대 두 줄로 유지한다.
- HUD의 한국어 본문은 `Pretendard Variable`, `SUIT Variable`, `"Apple SD Gothic Neo"` 순서의 지역 폰트 스택을 사용한다. 별도 네트워크 폰트 요청은 만들지 않는다.

## 4. Spacing & Layout

기본 단위는 4px이다.

| Token | Value | Usage |
|---|---|---|
| `--space-1` | `4px` | 아이콘 내부 |
| `--space-2` | `8px` | 조밀한 인라인 간격 |
| `--space-3` | `12px` | 버튼 내부 |
| `--space-4` | `16px` | HUD 내부 |
| `--space-6` | `24px` | 모바일 여백 |
| `--space-8` | `32px` | 데스크톱 여백 |

### UI Geometry & Responsive Tokens

| Group | Tokens | Purpose |
|---|---|---|
| Stroke | `--stroke`, `--stroke-strong`, `--focus-ring`, `--focus-offset` | 패널 선과 키보드 포커스 |
| Radius | `--radius-sm`, `--radius-md`, `--radius-lg` | 키, 버튼, 패널 |
| Control | `--control-min`, `--control-pad`, `--key-min` | 44px 이상 터치와 키캡 |
| Component width | `--hud-width`, `--title-width`, `--lede-width`, `--nav-width`, `--detail-width`, `--intro-width`, `--status-min-width` | 데스크톱 HUD 비율 |
| Mobile position | `--nav-mobile-top`, `--nav-hint-mobile-top`, `--pad-mobile-bottom` | 375–767px의 겹침 없는 스택 |
| Compact position | `--nav-compact-top`, `--nav-hint-compact-top`, `--pad-compact-bottom` | 390×700 이하 높이 대응 |
| Surface | `--blur-sm`, `--blur-lg`, `--shadow-text`, `--shadow-panel`, `--shadow-hint`, `--shadow-status-dot` | 지도 위 가독성 |
| Progress | `--progress-width`, `--compass-size`, `--grain-opacity`, `--vignette-strength` | 발견 진행률과 분위기 |

- 활자 구현은 `--font-sans`, `--font-mono`, `--weight-*`, `--leading-*`, `--type-display`, `--type-display-mobile`, `--type-h2`, `--type-body`, `--type-ui`, `--type-caption`, `--type-micro`, `--type-xs`를 사용한다.
- 자간은 `--track-*`, 모션은 `--motion-fast`, `--motion-standard`, `--motion-reduced`만 사용한다.
- 반응형 미디어 쿼리 자체의 경계값만 CSS 상수로 남기고, 내부 배치값은 위 토큰을 사용한다.

- 캔버스는 `100dvh`를 채우며 스크롤은 지도가 소유한다.
- 데스크톱은 좌상단 제목, 우측 마을 내비게이션, 좌하단 조작 안내, 우하단 선택 상세를 사용한다.
- 767px 이하에서는 제목과 내비게이션을 상단에 압축하고 상세 패널은 하단 한 열로 둔다.
- 375px에서 월드의 핵심 랜드마크와 선택 패널이 겹치지 않아야 한다.

## 5. Components

### Flat World Canvas

- **Structure**: 96×60 셀 직교 카메라 WebGL 캔버스, 4단 층고 타일, 절벽 캡, 해안선, 도로·철도·다리, 마을과 랜드마크
- **Variants**: 데스크톱 시작 화면 전체 지도, 이동 후 캐릭터 추적 지도, 모바일 근접 지도
- **States**: 로딩, 준비, 이동, 확대, 랜드마크 hover, selected
- **Accessibility**: 캔버스 한국어 라벨, `WASD`와 방향키로 캐릭터 이동
- **Motion**: 시작 화면은 다섯 생태를 모두 보여주고 첫 이동 뒤 카메라는 캐릭터를 부드럽게 추적
- **Layout**: 전체 뷰포트 shell. 768–1024px 태블릿에서도 D-pad를 유지하고, 375–767px에서는 상세 패널이 목적지를 가리지 않도록 카메라 안전 오프셋을 적용한다.
- **Performance**: 지형·도로·철도·반복 소품은 `InstancedMesh`를 유지하고, 프레임 루프에서는 새 벡터나 재질을 할당하지 않는다.

### Voxel Explorer

- **Structure**: 얼굴, 머리, 몸통, 팔, 다리, 산호색 스카프, 갈색 배낭, 청록 지도 단말로 만든 복셀 캐릭터와 바닥 그림자
- **States**: idle, walking, landmark-near, arrived
- **Accessibility**: 키보드 `WASD`/방향키, 모바일 4방향 조작 버튼
- **Motion**: 이동 중 팔다리만 짧게 교차하고 지형색 발자국을 제한적으로 남긴다. 도착 시 랜드마크를 바라보고 한 번 손을 흔든다. 모션 감소에서는 보행·도착 흔들림을 제거한다.
- **Layout**: 지형 경계와 물을 넘지 않으며 캐릭터 중심 추적 카메라 사용

### Village Navigation

- **Structure**: 5개의 마을 선택 버튼
- **States**: default, hover, active, focus-visible, selected
- **Accessibility**: 실제 `<button>`, `aria-pressed`, 44px 이상 터치 타깃
- **Motion**: 선택 시 해당 마을의 방향과 거리를 안내하며 캐릭터가 접근하면 상세를 자동 공개
- **Layout**: 데스크톱 세로 cluster, 모바일 가로 scroll cluster

### Project Detail

- **Structure**: 생태 라벨, 랜드마크명, 프로젝트 역할, 도착 시 `SPACE 소개 보기` 행동
- **States**: 기본 안내, 목적지 선택, 도착·소개 대기, 소개 열림
- **Accessibility**: `aria-live="polite"`로 선택 결과 전달
- **Motion**: 선택 내용은 220ms opacity/transform 전환
- **Layout**: compact card

### Project Introduction Dialog

- **Structure**: 마을·역할·프로젝트명, 요약, 세 가지 핵심 성과, 기술 스택, 닫기 버튼
- **Data**: `preview/projects.json`이 소개 문구의 단일 원본이며 3D 좌표 데이터와 분리한다.
- **States**: closed, open
- **Accessibility**: 랜드마크 2.8타일 이내에서 `Space`로 열고 `Escape` 또는 닫기 버튼으로 닫는다. 모바일은 동일한 소개 열기 버튼을 제공한다.
- **Motion**: dialog backdrop과 panel은 220ms opacity/transform으로만 전환하며 모션 감소에서는 즉시 표시한다.
- **Layout**: 데스크톱 중앙 modal, 모바일 하단 inset sheet

### Discovery Progress & Compass

- **Structure**: `DISCOVERED 00/05` 진행률, `ZOOM 100%` 배율, 현재 목적지 이름·거리, 목적지 방향을 가리키는 사용자 제작 SVG 화살표
- **States**: free, tracking, near, discovered
- **Accessibility**: 텍스트 거리와 상태를 항상 함께 제공하고 방향 아이콘에 의존하지 않는다.
- **Motion**: 방향 화살표는 목적지가 바뀌거나 캐릭터가 이동할 때만 회전하며 모션 감소에서는 즉시 갱신한다.
- **Layout**: 데스크톱 우하단 상태 패널, 모바일 상세 카드 상단의 작은 진행 상태

### Landmark Beacon

- **Structure**: 마을별 광장·계단·환경 소품, 3단 이상 랜드마크 본체, 청록 큐브, 선택 링, 접촉 그림자, raycast hit area
- **States**: default, hover, selected, discovered
- **Accessibility**: 키보드 접근은 Village Navigation이 동일 기능 제공
- **Motion**: hover와 selected에만 scale/opacity 변화
- **Layout**: 월드 좌표

## 6. Motion & Interaction

| Type | Duration | Easing | Usage |
|---|---|---|---|
| Micro | `120ms` | `ease-out` | 버튼 press와 hover |
| Standard | `220ms` | `ease-in-out` | 상세 패널 상태 |
| Camera follow | `220ms` | `ease-out` | 캐릭터 추적 |

- `WASD`와 방향키는 캐릭터 이동, 휠은 `0.68–3.2×` 범위의 지속 확대·축소, 클릭은 랜드마크 선택이다.
- 모바일은 엄지로 누르는 4방향 패드가 같은 이동 입력을 제공한다.
- 랜드마크 2.8타일 안에 들어오면 발견 상태와 소개 열기 행동을 표시하고, `Space` 입력 뒤에만 JSON 소개 dialog를 연다.
- 지도 자체에 장식용 자동 애니메이션을 넣지 않는다.
- `prefers-reduced-motion: reduce`에서는 카메라 이동을 즉시 완료한다.
- CSS 애니메이션은 `transform`, `opacity`만 사용한다.
- 첫 이동의 확대는 즉시 점프하지 않고 220ms 목표 줌으로 보간한다.
- 카메라는 이동 방향으로 최대 1.2타일 앞을 본다. 정지하면 탐험가 중심으로 돌아온다.
- 발자국·도착 링은 이동과 발견을 설명하는 의미 기반 모션이며 무한 반복하지 않는다.

## 7. Depth & Surface

전략은 **mixed**다. 지도는 좌상단 방향광을 기준으로 밝은 상단 캡, 어두운 수직 지층, 접촉 그림자, 4단 복셀 층고로 미니어처 깊이를 만든다. 물은 두 명도 띠와 해안 거품을 사용한다. 청록 비콘의 글로우는 작은 additive halo로만 표현하고 전체 화면 bloom은 사용하지 않는다. UI는 반투명 남색, 얇은 청록 테두리, 내부 하이라이트, 약한 컬러 그림자로 지도와 분리한다. 화면 가장자리 비네트와 2% 이하의 grain은 HUD보다 뒤에 놓인다.

### Landmark Scene Grammar

모든 마을은 `광장 → 프로젝트 건물 → 꼭대기 비콘`의 세 계층을 공유한다. 건물은 역할별로 다음 소품을 가진다.

| Village | Architecture | Story props |
|---|---|---|
| Forest | 계단식 관측소, 반구형 돔, 기울어진 망원경 | 데이터 큐브, 별 표식, 작은 소나무 |
| City | 세 층 시안 타워, 창 패턴, 안테나 | 서버 큐브, 신호 기둥, 벤치 |
| Desert | 톱니 공방, 물탱크, 크레인 | 공구 상자, 태양 패널, 사암 바위 |
| Snow | 기지 박스, 줄무늬 마스트, 접시 안테나 | 케이블 박스, 얼음 기둥, 경고 표식 |
| Coast | 줄무늬 등대, 발코니, 발광 램프 | 부두, 작은 배, 부표 |

### Terrain Grammar

- 육지는 `0.54 / 0.78 / 1.02 / 1.26`의 네 층고만 사용하며 마을 광장과 주요 도로는 접근 가능한 낮은 층고로 평탄화한다.
- 인접 타일과의 높이 차는 상단 캡과 어두운 지층으로 읽히게 한다.
- 도로는 끊김 없는 어두운 데크와 노란 점선, 철도는 갈색 침목과 은색 두 줄 레일을 사용한다.
- 강을 지나는 주도로와 철도에는 지지대가 있는 다리를 둔다.
- 숲·설원에는 수목과 바위, 사막에는 선인장·사암, 항구에는 갈대·부표를 제한적으로 배치한다.

## 8. Accessibility Constraints & Accepted Debt

### Constraints

- WCAG 2.2 AA 목표: 본문 4.5:1, 큰 텍스트 3:1 이상
- 모든 마을은 포인터와 키보드 양쪽에서 선택 가능
- 44px 이상 터치 타깃과 명확한 `focus-visible`
- 모션 감소에서 카메라 이동 애니메이션 비활성화
- 발견 진행률은 색만으로 표시하지 않고 `00/05` 텍스트를 병기
- 200% 확대와 375px에서 한국어 어절 분리, 클리핑, 가로 스크롤 금지

### Accepted Debt

| Item | Location | Why accepted | Owner / Exit |
|---|---|---|---|
| 현재 마을은 실제 포트폴리오 데이터 대신 역할별 예시 설명을 사용 | `preview/projects.json` | 프로젝트 원문이 아직 제공되지 않음 | 실제 포트폴리오 콘텐츠 연결 시 JSON만 교체 |
| 모바일에서 전체 화면 bloom·SSAO를 사용하지 않음 | `preview/main.js` | 정적 호스팅과 저전력 기기의 60fps 우선 | 기기별 성능 예산과 실제 모델 데이터가 확보되면 선택적 후처리 검토 |
