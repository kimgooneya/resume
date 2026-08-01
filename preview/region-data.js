import {
  SCENERY_BANDS,
  SCENERY_BY_REGION_ID,
  SCENERY_KINDS,
  SCENERY_ROLES,
} from "./region-scenery.js";

export const MAP_WIDTH = 40;
export const MAP_HEIGHT = 64;
export const VIEWPORT_WIDTH = 24;
export const VIEWPORT_HEIGHT = 18;
export const TILE_SIZE = 16;

export const REGION_DIMENSIONS = Object.freeze({
  map: Object.freeze({ width: MAP_WIDTH, height: MAP_HEIGHT }),
  viewport: Object.freeze({ width: VIEWPORT_WIDTH, height: VIEWPORT_HEIGHT }),
  tileSize: TILE_SIZE,
});

export const TILE_KINDS = Object.freeze({
  TERRAIN: "terrain",
  PATH: "path",
  START: "start",
  INTERACTION: "interaction",
  LANDMARK: "landmark",
  RESIDENT: "resident",
  SIGN: "sign",
});

export const REGION_IDS = Object.freeze(["forest", "city", "desert", "snow", "coast"]);
export const DIALOGUE_STAGES = Object.freeze(["closed", "problem", "approach", "result"]);

const WALKABLE_TILES = new Set([
  TILE_KINDS.PATH,
  TILE_KINDS.START,
  TILE_KINDS.INTERACTION,
  TILE_KINDS.SIGN,
]);
const CARDINAL_STEPS = Object.freeze([[0, -1], [1, 0], [0, 1], [-1, 0]]);
const LANDMARK_SPRITES = new Set(["observatory", "tower", "workshop", "relay", "lighthouse"]);
const RESIDENT_SPRITES = new Set(["researcher", "engineer", "maker", "controller", "guide"]);

const REGION_TABLE = [
  {
    id: "forest", label: "숲 마을", terrain: "pine", landmarkLabel: "별빛 관측소",
    palette: ["#0f1f14", "#315b35", "#78a34e", "#d5e596"],
    start: { x: 20, y: 58 },
    interaction: { x: 5, y: 11 },
    landmark: { x: 6, y: 9, sprite: "observatory", prop: "telescope" },
    resident: ["forest-researcher", "데이터 연구원", "researcher", "관측 노트", { x: 6, y: 11 }, [
      ["관측소는 북쪽에 있어요.", "표지판을 따라 천천히 올라오세요."],
      ["신호가 흩어져 있으면 변화가 늦게 보여요.", "팀이 같은 흐름을 보게 할 방법이 필요했죠."],
      ["지표를 한 화면에 모으고 이상을 비교했어요.", "반복 보고는 요약 흐름으로 가볍게 만들었고요."],
      ["이제 변화 신호를 더 빨리 함께 확인합니다.", "관측의 결과를 기록으로 이어갈 수 있어요."],
    ]],
    additionalResidents: [
      {
        id: "forest-collector", role: "현장 수집가", sprite: "guide", prop: "표본 가방",
        position: { x: 12, y: 31 }, interaction: { x: 12, y: 32 },
        lines: [
          ["먼저 현장의 신호를 모았어요.", "누락된 조각은 판단을 늦추니까요."],
          ["입력마다 출처와 시간을 붙였습니다.", "다음 사람이 맥락을 잃지 않게 했죠."],
          ["작은 기록도 같은 형식으로 쌓이게 했어요.", "비교할 수 있는 재료가 생겼습니다."],
          ["관측 재료가 팀의 공용 언어가 됐어요.", "이제 분석가에게 바로 넘길 수 있습니다."],
        ],
      },
      {
        id: "forest-analyst", role: "패턴 분석가", sprite: "researcher", prop: "패턴 카드",
        position: { x: 26, y: 39 }, interaction: { x: 25, y: 39 },
        lines: [
          ["숫자만 늘어놓으면 이상을 놓쳐요.", "변화를 한눈에 읽을 기준이 필요했죠."],
          ["비교 축과 예외 기준을 먼저 정했습니다.", "사람이 다시 확인할 지점도 남겼고요."],
          ["반복되는 패턴은 요약하고 경계값은 표시했어요.", "탐색과 검증을 한 화면에 묶었습니다."],
          ["팀은 같은 신호를 보고 대화할 수 있어요.", "분석이 다음 행동으로 이어집니다."],
        ],
      },
      {
        id: "forest-editor", role: "기록 편집자", sprite: "maker", prop: "관측 보드",
        position: { x: 30, y: 53 }, interaction: { x: 29, y: 53 },
        lines: [
          ["좋은 분석도 기록되지 않으면 사라져요.", "결정의 이유를 남기는 일을 맡았습니다."],
          ["핵심과 근거를 한 장에 정리했어요.", "읽는 순서가 자연스럽게 보이도록 했죠."],
          ["결과 옆에 다음 질문을 붙였습니다.", "관측과 실행 사이의 빈칸을 줄였어요."],
          ["작업은 다시 읽을 수 있는 지식이 됐습니다.", "다음 관측도 더 빠르게 시작할 수 있어요."],
        ],
      },
    ],
    signposts: [{ x: 20, y: 57 }, { x: 11, y: 52 }, { x: 17, y: 40 }],
  },
  {
    id: "city", label: "도시 마을", terrain: "concrete", landmarkLabel: "시안 타워",
    palette: ["#152530", "#31536b", "#7595a1", "#d2e1d0"],
    start: { x: 7, y: 57 },
    interaction: { x: 31, y: 9 },
    landmark: { x: 32, y: 6, sprite: "tower", prop: "terminal" },
    resident: ["city-engineer", "제품 기술자", "engineer", "도시 배치도", { x: 32, y: 9 }, [
      ["시안 타워는 북쪽 중심가 끝에 있어요.", "갈림길의 안내 표식을 확인해 보세요."],
      ["화면만 고치면 다음 변화에서 다시 흔들려요.", "사용자 흐름과 구조를 함께 정리해야 했죠."],
      ["여정을 기준으로 화면과 공통 상태를 다시 설계했어요.", "실험과 배포도 확인 가능한 흐름으로 묶었고요."],
      ["바뀌어도 무너지지 않는 제품의 길이 생겼습니다.", "결정의 기록을 이어서 볼 수 있어요."],
    ]],
    additionalResidents: [
      {
        id: "city-researcher", role: "사용자 연구원", sprite: "researcher", prop: "관찰 카드",
        position: { x: 10, y: 20 }, interaction: { x: 10, y: 21 },
        lines: [
          ["기능보다 먼저 사용자의 망설임을 봤어요.", "어디서 멈추는지 기록했습니다."],
          ["말과 행동이 어긋나는 순간을 찾았죠.", "가정 대신 실제 흐름을 기준으로 삼았어요."],
          ["핵심 여정을 짧은 장면으로 나누었습니다.", "각 장면에 필요한 정보만 남겼고요."],
          ["제품의 첫 인상이 훨씬 분명해졌어요.", "다음 설계가 사용자에게서 시작됩니다."],
        ],
      },
      {
        id: "city-designer", role: "흐름 설계자", sprite: "guide", prop: "흐름 지도",
        position: { x: 25, y: 35 }, interaction: { x: 24, y: 35 },
        lines: [
          ["화면 사이의 연결을 정리하는 일을 해요.", "좋은 기능도 길을 잃으면 쓰이지 않거든요."],
          ["공통 상태와 예외 경로를 함께 그렸습니다.", "전환마다 다음 선택이 보이게 했죠."],
          ["반복되는 패턴은 작은 부품으로 묶었어요.", "변경이 한곳에서 퍼지도록 만들었습니다."],
          ["제품 전체가 하나의 여정처럼 읽혀요.", "사용자와 팀 모두 덜 헤매게 됐습니다."],
        ],
      },
      {
        id: "city-reviewer", role: "품질 검토자", sprite: "controller", prop: "검수 목록",
        position: { x: 8, y: 50 }, interaction: { x: 9, y: 50 },
        lines: [
          ["작동하는 것만으로는 충분하지 않아요.", "변경 뒤에도 약속이 남아 있는지 봅니다."],
          ["중요한 흐름을 실제 입력으로 반복했어요.", "실패가 드러나는 경계도 체크했습니다."],
          ["화면 계약과 데이터 계약을 함께 고정했죠.", "작은 수정이 전체를 깨지 않게 했어요."],
          ["안심하고 다음 실험으로 넘어갈 수 있어요.", "제품의 속도와 안정성을 같이 지켰습니다."],
        ],
      },
    ],
    signposts: [{ x: 8, y: 56 }, { x: 12, y: 51 }, { x: 19, y: 34 }],
  },
  {
    id: "desert", label: "사막 마을", terrain: "sandstone", landmarkLabel: "자동화 공방",
    palette: ["#2b1a10", "#7a4b28", "#c2944f", "#f0dda2"],
    start: { x: 32, y: 59 },
    interaction: { x: 8, y: 10 },
    landmark: { x: 6, y: 7, sprite: "workshop", prop: "gear-stack" },
    resident: ["desert-maker", "자동화 장인", "maker", "공방 도면", { x: 9, y: 10 }, [
      ["공방은 북쪽 바위 공터에 있습니다.", "톱니 표식이 보이는 길을 따라오세요."],
      ["같은 손길이 되풀이되면 판단할 시간이 줄어들어요.", "먼저 반복되는 길을 찾아야 했죠."],
      ["입력과 검수를 작은 흐름으로 나누어 도구로 만들었어요.", "실패 지점도 바로 찾도록 상태를 남겼고요."],
      ["사람은 판단과 창작에 더 오래 머물 수 있게 됐습니다.", "공방의 기록을 이어서 볼 수 있어요."],
    ]],
    additionalResidents: [
      {
        id: "desert-observer", role: "반복 관찰자", sprite: "researcher", prop: "작업 표본",
        position: { x: 28, y: 20 }, interaction: { x: 28, y: 21 },
        lines: [
          ["사람이 반복하는 일을 먼저 세어 봤어요.", "습관 속에 자동화의 시작이 있거든요."],
          ["입력, 판단, 결과를 따로 적었습니다.", "어디까지 맡길 수 있는지 보이게 했죠."],
          ["반복 횟수와 실패 지점을 비교했어요.", "작은 낭비도 흐름의 단서가 됐습니다."],
          ["도구를 만들 이유가 숫자로 드러났어요.", "이제 공방 설계자에게 넘길 수 있습니다."],
        ],
      },
      {
        id: "desert-builder", role: "흐름 제작자", sprite: "engineer", prop: "자동화 도식",
        position: { x: 12, y: 35 }, interaction: { x: 13, y: 35 },
        lines: [
          ["자동화는 버튼 하나로 끝나지 않아요.", "작업의 순서를 먼저 이해해야 합니다."],
          ["작은 단계마다 입력과 출력을 정의했죠.", "중간에 사람이 확인할 곳도 남겼어요."],
          ["재사용할 수 있는 단위로 조립했습니다.", "새 업무에도 같은 원리를 적용할 수 있어요."],
          ["반복은 줄고 판단의 공간은 넓어졌습니다.", "도구가 사람의 일을 대신 정리해 줍니다."],
        ],
      },
      {
        id: "desert-auditor", role: "실패 기록관", sprite: "controller", prop: "실행 기록",
        position: { x: 29, y: 52 }, interaction: { x: 30, y: 52 },
        lines: [
          ["잘 된 실행보다 멈춘 실행이 더 많은 걸 말해요.", "실패를 숨기지 않고 모았습니다."],
          ["오류와 재시도를 같은 기록에 남겼죠.", "원인을 찾는 시간이 짧아졌습니다."],
          ["검수 결과를 다음 실행에 연결했어요.", "자동화가 스스로 배우는 흐름이 됐고요."],
          ["공방은 빠르면서도 설명 가능한 곳입니다.", "사람이 언제든 다시 판단할 수 있어요."],
        ],
      },
    ],
    signposts: [{ x: 31, y: 58 }, { x: 19, y: 52 }, { x: 8, y: 33 }],
  },
  {
    id: "snow", label: "설원 마을", terrain: "snowbank", landmarkLabel: "릴레이 기지",
    palette: ["#25283d", "#4c5478", "#909ab5", "#e6ebd1"],
    start: { x: 20, y: 60 },
    interaction: { x: 19, y: 10 },
    landmark: { x: 20, y: 7, sprite: "relay", prop: "warning-beacon" },
    resident: ["snow-controller", "운영 관제사", "controller", "릴레이 기록", { x: 20, y: 10 }, [
      ["릴레이 기지는 북쪽 통신탑 아래에 있어요.", "깃발과 표지판을 보며 눈길을 따라오세요."],
      ["장애를 피할 수만은 없어서 돌아오는 길이 필요했어요.", "상태를 빨리 판단할 기준부터 정리했죠."],
      ["헬스 체크와 경보, 안전한 복구 절차를 이어 놓았어요.", "운영 문서도 같은 실행 기준으로 정돈했고요."],
      ["문제가 생겨도 회복 경로를 잃지 않게 됐습니다.", "기지의 기록을 이어서 볼 수 있어요."],
    ]],
    additionalResidents: [
      {
        id: "snow-monitor", role: "상태 감시자", sprite: "researcher", prop: "상태 패널",
        position: { x: 8, y: 20 }, interaction: { x: 8, y: 21 },
        lines: [
          ["서비스의 평온한 순간도 계속 살펴봐요.", "정상 범위를 알아야 이상을 찾으니까요."],
          ["응답 시간과 자원 변화를 함께 기록했죠.", "한 숫자만 보고 오판하지 않게 했어요."],
          ["작은 흔들림을 팀이 공유할 신호로 바꿨습니다.", "문제가 커지기 전에 볼 수 있어요."],
          ["운영은 감이 아니라 관찰의 기록이 됐습니다.", "관제사에게 믿을 만한 단서를 줍니다."],
        ],
      },
      {
        id: "snow-responder", role: "복구 설계자", sprite: "maker", prop: "복구 상자",
        position: { x: 28, y: 35 }, interaction: { x: 27, y: 35 },
        lines: [
          ["문제가 나면 누구나 당황하기 쉬워요.", "미리 돌아갈 길을 설계했습니다."],
          ["복구 순서와 중단 기준을 작은 단계로 나눴죠.", "실행하는 사람의 부담을 줄였어요."],
          ["연습 가능한 절차로 문서를 바꾸었습니다.", "실전에서도 손이 먼저 움직이게 했고요."],
          ["장애 뒤에도 팀은 다음 선택을 압니다.", "회복이 시스템의 기본 동작이 됐어요."],
        ],
      },
      {
        id: "snow-publisher", role: "운영 기록자", sprite: "guide", prop: "배포 달력",
        position: { x: 14, y: 52 }, interaction: { x: 15, y: 52 },
        lines: [
          ["배포는 끝이 아니라 관찰의 시작이에요.", "변경 뒤의 상태를 기록합니다."],
          ["무엇이 언제 바뀌었는지 한곳에 모았죠.", "문제와 원인을 연결할 수 있게 했어요."],
          ["실행 로그와 사람의 판단을 함께 남겼습니다.", "다음 배포가 더 차분해졌고요."],
          ["운영의 기억이 팀의 자산으로 쌓입니다.", "안정성을 반복해서 키울 수 있어요."],
        ],
      },
    ],
    signposts: [{ x: 21, y: 59 }, { x: 15, y: 54 }, { x: 13, y: 35 }],
  },
  {
    id: "coast", label: "항구 마을", terrain: "tide", landmarkLabel: "연결의 등대",
    palette: ["#102c2b", "#1f6260", "#63a08a", "#d4e5ad"],
    start: { x: 5, y: 58 },
    interaction: { x: 32, y: 10 },
    landmark: { x: 34, y: 7, sprite: "lighthouse", prop: "signal-lantern" },
    resident: ["coast-guide", "협업 안내원", "guide", "항로 수첩", { x: 33, y: 10 }, [
      ["등대는 북쪽 작은 반도에 서 있어요.", "신호 깃발이 가리키는 부두를 따라오세요."],
      ["정보만 모아서는 팀이 같은 결정을 내리기 어려워요.", "사라지는 맥락을 다시 잇는 일이 필요했죠."],
      ["상태와 담당자 맥락을 한 흐름에서 보게 만들었어요.", "중요도에 맞춰 알림도 가볍게 정리했고요."],
      ["팀은 같은 맥락에서 더 빠르게 움직이게 됐습니다.", "등대의 기록을 이어서 볼 수 있어요."],
    ]],
    additionalResidents: [
      {
        id: "coast-coordinator", role: "맥락 조율자", sprite: "engineer", prop: "항로 지도",
        position: { x: 26, y: 20 }, interaction: { x: 26, y: 21 },
        lines: [
          ["각 팀은 자기 바다만 보기 쉬워요.", "서로의 상태를 번역하는 일을 합니다."],
          ["담당자와 목적을 정보 옆에 붙였죠.", "읽는 사람이 바로 판단할 수 있게 했어요."],
          ["흩어진 메모를 같은 흐름으로 연결했습니다.", "중요한 맥락이 물결처럼 이어졌고요."],
          ["인수인계가 기록을 따라 자연스럽게 흘러요.", "협업의 마찰이 줄었습니다."],
        ],
      },
      {
        id: "coast-signal", role: "신호 설계자", sprite: "researcher", prop: "신호 깃발",
        position: { x: 10, y: 35 }, interaction: { x: 10, y: 36 },
        lines: [
          ["모든 알림이 큰 소리일 필요는 없어요.", "사람이 알아야 할 신호를 골랐습니다."],
          ["상태와 중요도를 함께 표시했죠.", "긴급함과 참고를 구분할 수 있게 했어요."],
          ["반복되는 알림은 묶고 필요한 것만 띄웠습니다.", "팀의 집중을 지킬 수 있었고요."],
          ["신호가 많아도 항로는 선명합니다.", "다음 행동을 놓치지 않아요."],
        ],
      },
      {
        id: "coast-listener", role: "회고 기록자", sprite: "maker", prop: "회고 수첩",
        position: { x: 24, y: 52 }, interaction: { x: 23, y: 52 },
        lines: [
          ["일이 끝난 뒤의 목소리도 모아요.", "다음 항해의 방향이 그 안에 있으니까요."],
          ["결정과 결과를 함께 돌아보았습니다.", "누가 무엇을 배웠는지 남겼어요."],
          ["회고의 질문을 작업 흐름에 연결했죠.", "배운 내용이 바로 다음 설계로 갑니다."],
          ["팀의 경험이 사라지지 않고 축적됩니다.", "협업은 매번 조금 더 나아져요."],
        ],
      },
    ],
    signposts: [{ x: 6, y: 57 }, { x: 14, y: 53 }, { x: 19, y: 31 }],
  },
];

function deepFreeze(value) {
  if (value && typeof value === "object" && !Object.isFrozen(value)) {
    for (const child of Object.values(value)) deepFreeze(child);
    Object.freeze(value);
  }
  return value;
}

function buildMap({ signposts, start, landmark, residents }) {
  const tiles = Array.from({ length: MAP_HEIGHT }, (_, y) =>
    Array.from({ length: MAP_WIDTH }, (_, x) =>
      x === 0 || y === 0 || x === MAP_WIDTH - 1 || y === MAP_HEIGHT - 1
        ? TILE_KINDS.TERRAIN
        : TILE_KINDS.PATH,
    ),
  );
  for (const signpost of signposts) tiles[signpost.y][signpost.x] = TILE_KINDS.SIGN;
  for (const resident of residents) {
    tiles[resident.interaction.y][resident.interaction.x] = TILE_KINDS.INTERACTION;
  }
  tiles[start.y][start.x] = TILE_KINDS.START;
  for (const resident of residents) tiles[resident.y][resident.x] = TILE_KINDS.RESIDENT;
  tiles[landmark.y][landmark.x] = TILE_KINDS.LANDMARK;
  return { tiles };
}

function routeDistance(tiles, start, target) {
  const queue = [[start.x, start.y, 0]];
  const seen = new Set([`${start.x},${start.y}`]);
  for (let index = 0; index < queue.length; index += 1) {
    const [x, y, distance] = queue[index];
    if (x === target.x && y === target.y) return distance;
    for (const [deltaX, deltaY] of CARDINAL_STEPS) {
      const nextX = x + deltaX;
      const nextY = y + deltaY;
      const key = `${nextX},${nextY}`;
      if (nextX >= 0 && nextX < MAP_WIDTH && nextY >= 0 && nextY < MAP_HEIGHT && !seen.has(key) && isWalkableTile(tiles[nextY][nextX])) {
        seen.add(key);
        queue.push([nextX, nextY, distance + 1]);
      }
    }
  }
  return null;
}

function assert(condition, message) {
  if (!condition) throw new TypeError(message);
}

export function isWalkableTile(tile) {
  return WALKABLE_TILES.has(tile);
}

export function validateRegion(region) {
  assert(region && typeof region === "object", "region must be an object");
  assert(REGION_IDS.includes(region.id), "region ID is invalid");
  const validPoint = (point) => Number.isInteger(point?.x) && Number.isInteger(point?.y) && point.x > 0 && point.x < MAP_WIDTH - 1 && point.y > 0 && point.y < MAP_HEIGHT - 1;
  const validDialogue = (resident) => DIALOGUE_STAGES.every((stage) => {
    const lines = resident.dialogue?.[stage]?.lines;
    return Array.isArray(lines) && lines.length >= 2 && lines.length <= 4 && lines.every((line) => typeof line === "string");
  });
  const residents = region.residents;
  assert(Array.isArray(residents) && residents.length >= 4, "each map needs at least four residents");
  assert(residents.every((resident) =>
    resident?.projectId === region.id &&
    typeof resident.id === "string" &&
    typeof resident.role === "string" &&
    RESIDENT_SPRITES.has(resident.sprite) &&
    typeof resident.prop === "string" &&
    validPoint(resident) &&
    validPoint(resident.interaction) &&
    validDialogue(resident) &&
    Math.abs(resident.interaction.x - resident.x) + Math.abs(resident.interaction.y - resident.y) === 1,
  ), "resident dialogue or placement metadata is invalid");
  assert(new Set(residents.map(({ id }) => id)).size === residents.length, "resident IDs must be unique");
  assert(region.resident === residents[0], "primary resident must be the first roster entry");
  assert(LANDMARK_SPRITES.has(region.landmark?.sprite) && typeof region.landmark.prop === "string", "landmark sprite metadata is invalid");
  assert(Array.isArray(region.palette) && region.palette.length === 4 && new Set(region.palette).size === 4, "palette must contain exactly four unique tones");
  assert(Array.isArray(region.scenery) && region.scenery.length >= 3 && region.scenery.every(
    ({ kind, role, band, x, y, width, height, mask }) => {
      const maskValid = Array.isArray(mask) &&
        mask.length === height &&
        mask.every((row) => typeof row === "string" && row.length === width && /^[.#]+$/.test(row));
      const filled = maskValid
        ? mask.reduce((count, row) => count + [...row].filter((cell) => cell === "#").length, 0)
        : 0;
      const fillRatio = filled / (width * height);
      return SCENERY_KINDS.includes(kind) &&
        SCENERY_ROLES.includes(role) &&
        SCENERY_BANDS.includes(band) &&
        [x, y, width, height].every(Number.isInteger) &&
        x >= 0 && y >= 0 && width >= 2 && height >= 2 &&
        x + width <= MAP_WIDTH && y + height <= MAP_HEIGHT &&
        maskValid && filled >= 8 && fillRatio >= 0.35 && fillRatio <= 0.9;
    },
  ), "scenery descriptors are invalid");
  assert(Array.isArray(region.tiles) && region.tiles.length === MAP_HEIGHT && region.tiles.every((row) => Array.isArray(row) && row.length === MAP_WIDTH), "map dimensions must be 40 by 64");
  const counts = Object.fromEntries(["start", "landmark", "resident", "interaction"].map((tile) => [tile, 0]));
  for (let y = 0; y < MAP_HEIGHT; y += 1) for (let x = 0; x < MAP_WIDTH; x += 1) {
    const tile = region.tiles[y][x];
    assert(Object.values(TILE_KINDS).includes(tile), "map contains an unknown tile");
    if (tile in counts) counts[tile] += 1;
    assert(!(isWalkableTile(tile) && (x === 0 || y === 0 || x === MAP_WIDTH - 1 || y === MAP_HEIGHT - 1)), "walkable edge exit is forbidden");
  }
  assert(counts.start === 1 && counts.landmark === 1 && counts.resident === residents.length && counts.interaction === residents.length, "map special-cell counts do not match the resident roster");
  assert(region.tiles.slice(1, -1).every((row) => row.slice(1, -1).every((tile) => tile !== TILE_KINDS.TERRAIN)), "map interior must remain open for free exploration");
  const coordinateMatches = (point, tile) => point?.x >= 0 && point?.x < MAP_WIDTH && point?.y >= 0 && point?.y < MAP_HEIGHT && region.tiles[point.y][point.x] === tile;
  assert(coordinateMatches(region.start, "start") && coordinateMatches(region.landmark, "landmark") && residents.every((resident) => coordinateMatches(resident, "resident") && coordinateMatches(resident.interaction, "interaction")), "special coordinates must match map tiles");
  assert(region.start.y >= 52 && region.landmark.y <= 12 && region.resident.y <= 12, "start and northern landmark positions are invalid");
  assert(Array.isArray(region.signposts) && region.signposts.length >= 2 && region.signposts.every(({ x, y }) => region.tiles[y]?.[x] === "sign" && CARDINAL_STEPS.some(([deltaX, deltaY]) => isWalkableTile(region.tiles[y + deltaY]?.[x + deltaX]))), "sign coverage is invalid");
  const distance = routeDistance(region.tiles, region.start, region.interaction);
  assert(distance !== null && distance >= 40 && distance <= 80, "primary resident must be reachable across the open field");
  return true;
}

function buildRegion(config) {
  const { id, label, terrain, landmarkLabel, palette, start, interaction, landmark, signposts } = config;
  const [residentId, role, sprite, prop, residentPoint, lines] = config.resident;
  const residentConfigs = [
    { id: residentId, role, sprite, prop, position: residentPoint, interaction, lines },
    ...(config.additionalResidents ?? []),
  ];
  const residents = residentConfigs.map((residentConfig) => {
    const dialogue = Object.fromEntries(DIALOGUE_STAGES.map((stage, index) => [stage, Object.freeze({ lines: Object.freeze(residentConfig.lines[index]) })]));
    return {
      id: residentConfig.id,
      role: residentConfig.role,
      sprite: residentConfig.sprite,
      prop: residentConfig.prop,
      projectId: id,
      ...residentConfig.position,
      interaction: { ...residentConfig.interaction },
      dialogue,
    };
  });
  const { tiles } = buildMap({ signposts, start, landmark, residents });
  const region = {
    id, label, terrain, landmarkLabel, palette, tiles,
    scenery: SCENERY_BY_REGION_ID[id],
    start: { ...start },
    landmark: { ...landmark },
    residents,
    resident: residents[0],
    interaction: { ...residents[0].interaction },
    signposts,
  };
  validateRegion(region);
  return deepFreeze(region);
}

export const REGIONS = Object.freeze(REGION_TABLE.map(buildRegion));
export const REGIONS_BY_ID = Object.freeze(Object.fromEntries(REGIONS.map((region) => [region.id, region])));
export const RESIDENTS_BY_PROJECT_ID = Object.freeze(Object.fromEntries(REGIONS.map((region) => [region.id, region.residents])));

export function getRegion(regionId) {
  return REGIONS_BY_ID[regionId] ?? null;
}
