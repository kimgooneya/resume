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

const WALKABLE_TILES = new Set([TILE_KINDS.PATH, TILE_KINDS.START, TILE_KINDS.INTERACTION]);
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
    route: [
      { x: 20, y: 58 }, { x: 12, y: 58 }, { x: 12, y: 48 },
      { x: 27, y: 48 }, { x: 27, y: 42 }, { x: 16, y: 42 }, { x: 16, y: 36 },
      { x: 30, y: 36 }, { x: 30, y: 29 }, { x: 21, y: 29 }, { x: 21, y: 23 },
      { x: 10, y: 23 }, { x: 10, y: 17 }, { x: 5, y: 17 }, { x: 5, y: 11 },
    ],
    branches: [
      [{ x: 12, y: 52 }, { x: 7, y: 52 }, { x: 7, y: 46 }, { x: 18, y: 46 }, { x: 18, y: 48 }],
      [{ x: 16, y: 40 }, { x: 9, y: 40 }, { x: 9, y: 33 }, { x: 25, y: 33 }, { x: 25, y: 36 }],
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
    route: [
      { x: 7, y: 57 }, { x: 7, y: 52 }, { x: 25, y: 52 }, { x: 25, y: 47 },
      { x: 10, y: 47 }, { x: 10, y: 41 }, { x: 32, y: 41 }, { x: 32, y: 35 },
      { x: 18, y: 35 }, { x: 18, y: 29 }, { x: 6, y: 29 }, { x: 6, y: 23 },
      { x: 27, y: 23 }, { x: 27, y: 17 }, { x: 14, y: 17 }, { x: 14, y: 12 },
      { x: 31, y: 12 }, { x: 31, y: 9 },
    ],
    branches: [
      [{ x: 12, y: 52 }, { x: 12, y: 55 }, { x: 20, y: 55 }, { x: 20, y: 52 }],
      [{ x: 20, y: 35 }, { x: 20, y: 32 }, { x: 28, y: 32 }, { x: 28, y: 35 }],
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
    route: [
      { x: 32, y: 59 }, { x: 32, y: 53 }, { x: 18, y: 53 }, { x: 18, y: 49 },
      { x: 30, y: 49 }, { x: 30, y: 44 }, { x: 11, y: 44 }, { x: 11, y: 39 },
      { x: 24, y: 39 }, { x: 24, y: 34 }, { x: 7, y: 34 }, { x: 7, y: 28 },
      { x: 19, y: 28 }, { x: 19, y: 22 }, { x: 33, y: 22 }, { x: 33, y: 16 },
      { x: 20, y: 16 }, { x: 20, y: 12 }, { x: 8, y: 12 }, { x: 8, y: 10 },
    ],
    branches: [
      [{ x: 22, y: 53 }, { x: 22, y: 56 }, { x: 28, y: 56 }, { x: 28, y: 53 }],
      [{ x: 11, y: 42 }, { x: 4, y: 42 }, { x: 4, y: 37 }, { x: 20, y: 37 }, { x: 20, y: 39 }],
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
    route: [
      { x: 20, y: 60 }, { x: 20, y: 55 }, { x: 14, y: 55 }, { x: 14, y: 51 },
      { x: 24, y: 51 }, { x: 24, y: 46 }, { x: 17, y: 46 }, { x: 17, y: 41 },
      { x: 26, y: 41 }, { x: 26, y: 36 }, { x: 12, y: 36 }, { x: 12, y: 31 },
      { x: 22, y: 31 }, { x: 22, y: 26 }, { x: 16, y: 26 }, { x: 16, y: 21 },
      { x: 25, y: 21 }, { x: 25, y: 16 }, { x: 19, y: 16 }, { x: 19, y: 10 },
    ],
    branches: [
      [{ x: 14, y: 53 }, { x: 9, y: 53 }, { x: 9, y: 49 }, { x: 20, y: 49 }, { x: 20, y: 51 }],
      [{ x: 12, y: 34 }, { x: 5, y: 34 }, { x: 5, y: 29 }, { x: 19, y: 29 }, { x: 19, y: 31 }],
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
    route: [
      { x: 5, y: 58 }, { x: 5, y: 54 }, { x: 13, y: 54 }, { x: 13, y: 48 },
      { x: 7, y: 48 }, { x: 7, y: 43 }, { x: 22, y: 43 }, { x: 22, y: 38 },
      { x: 30, y: 38 }, { x: 30, y: 32 }, { x: 18, y: 32 }, { x: 18, y: 27 },
      { x: 34, y: 27 }, { x: 34, y: 21 }, { x: 26, y: 21 }, { x: 26, y: 16 },
      { x: 35, y: 16 }, { x: 35, y: 12 }, { x: 32, y: 12 }, { x: 32, y: 10 },
    ],
    branches: [
      [{ x: 10, y: 54 }, { x: 10, y: 57 }, { x: 17, y: 57 }, { x: 17, y: 50 }, { x: 13, y: 50 }],
      [{ x: 22, y: 41 }, { x: 17, y: 41 }, { x: 17, y: 35 }, { x: 26, y: 35 }, { x: 26, y: 38 }],
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

function carveLine(tiles, from, to) {
  const deltaX = Math.sign(to.x - from.x);
  const deltaY = Math.sign(to.y - from.y);
  for (let x = from.x, y = from.y; x !== to.x + deltaX || y !== to.y + deltaY; x += deltaX, y += deltaY) {
    tiles[y][x] = TILE_KINDS.PATH;
  }
}

function buildMap({ route, branches: branchRoutes, signposts, start, interaction, resident, landmark }) {
  const tiles = Array.from({ length: MAP_HEIGHT }, () => Array(MAP_WIDTH).fill(TILE_KINDS.TERRAIN));
  for (let index = 1; index < route.length; index += 1) carveLine(tiles, route[index - 1], route[index]);
  const branches = branchRoutes.map((branch) => {
    for (let index = 1; index < branch.length; index += 1) carveLine(tiles, branch[index - 1], branch[index]);
    return { entry: { ...branch[0] }, rejoin: { ...branch.at(-1) } };
  });
  for (const signpost of signposts) tiles[signpost.y][signpost.x] = TILE_KINDS.SIGN;
  tiles[start.y][start.x] = TILE_KINDS.START;
  tiles[interaction.y][interaction.x] = TILE_KINDS.INTERACTION;
  tiles[resident.y][resident.x] = TILE_KINDS.RESIDENT;
  tiles[landmark.y][landmark.x] = TILE_KINDS.LANDMARK;
  return { tiles, branches };
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
  assert(region.resident?.projectId === region.id, "resident project ID must match region ID");
  assert(typeof region.resident.id === "string" && typeof region.resident.role === "string" && RESIDENT_SPRITES.has(region.resident.sprite) && typeof region.resident.prop === "string" && DIALOGUE_STAGES.every((stage) => Array.isArray(region.resident.dialogue?.[stage]?.lines) && region.resident.dialogue[stage].lines.length >= 2 && region.resident.dialogue[stage].lines.length <= 4), "resident dialogue metadata is invalid");
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
  assert(Object.values(counts).every((count) => count === 1), "map needs one start, landmark, resident, and interaction");
  const coordinateMatches = (point, tile) => point?.x >= 0 && point?.x < MAP_WIDTH && point?.y >= 0 && point?.y < MAP_HEIGHT && region.tiles[point.y][point.x] === tile;
  assert(coordinateMatches(region.start, "start") && coordinateMatches(region.landmark, "landmark") && coordinateMatches(region.resident, "resident") && coordinateMatches(region.interaction, "interaction"), "special coordinates must match map tiles");
  assert(region.start.y >= 52 && region.landmark.y <= 12 && region.resident.y <= 12, "start and northern landmark positions are invalid");
  assert(Math.abs(region.interaction.x - region.resident.x) + Math.abs(region.interaction.y - region.resident.y) === 1, "interaction must be adjacent to resident");
  assert(Array.isArray(region.branches) && region.branches.length >= 2 && region.branches.every(({ entry, rejoin }) => coordinateMatches(entry, "path") && coordinateMatches(rejoin, "path") && entry.x !== rejoin.x), "rejoining side branches are invalid");
  assert(Array.isArray(region.signposts) && region.signposts.length >= 2 && region.signposts.every(({ x, y }) => region.tiles[y]?.[x] === "sign" && CARDINAL_STEPS.some(([deltaX, deltaY]) => isWalkableTile(region.tiles[y + deltaY]?.[x + deltaX]))), "sign coverage is invalid");
  const distance = routeDistance(region.tiles, region.start, region.interaction);
  assert(distance !== null && distance >= 110 && distance <= 180, "interaction must be reachable in 110 to 180 steps");
  return true;
}

function buildRegion(config) {
  const { id, label, terrain, landmarkLabel, palette, start, interaction, landmark, signposts } = config;
  const [residentId, role, sprite, prop, residentPoint, lines] = config.resident;
  const { tiles, branches } = buildMap({ ...config, resident: residentPoint });
  const dialogue = Object.fromEntries(DIALOGUE_STAGES.map((stage, index) => [stage, Object.freeze({ lines: Object.freeze(lines[index]) })]));
  const region = {
    id, label, terrain, landmarkLabel, palette, tiles,
    scenery: SCENERY_BY_REGION_ID[id],
    start: { ...start },
    landmark: { ...landmark },
    resident: { id: residentId, role, sprite, prop, projectId: id, ...residentPoint, dialogue },
    interaction: { ...interaction },
    branches,
    signposts,
  };
  validateRegion(region);
  return deepFreeze(region);
}

export const REGIONS = Object.freeze(REGION_TABLE.map(buildRegion));
export const REGIONS_BY_ID = Object.freeze(Object.fromEntries(REGIONS.map((region) => [region.id, region])));
export const RESIDENTS_BY_PROJECT_ID = Object.freeze(Object.fromEntries(REGIONS.map((region) => [region.resident.projectId, region.resident])));

export function getRegion(regionId) {
  return REGIONS_BY_ID[regionId] ?? null;
}
