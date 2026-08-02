import {
  MAP_HEIGHT,
  MAP_WIDTH,
  TILE_KINDS,
  TILE_SIZE,
  VIEWPORT_HEIGHT,
  VIEWPORT_WIDTH,
} from "./region-data.js";
import { renderLandmarkTerrain, renderRegionScenery } from "./scenery-renderer.js";
import {
  drawLandmark,
  drawMarker,
  drawPlayer,
  drawResident,
  drawSign,
} from "./world-sprites.js";

const TILE_VALUES = new Set(Object.values(TILE_KINDS));
const FACING_VALUES = new Set(["up", "right", "down", "left"]);
const LANDMARK_SPRITES = new Set(["observatory", "tower", "workshop", "relay", "lighthouse"]);
const RESIDENT_SPRITES = new Set(["researcher", "engineer", "maker", "controller", "guide"]);
const CAMERA_MAX_X = MAP_WIDTH - VIEWPORT_WIDTH;
const CAMERA_MAX_Y = MAP_HEIGHT - VIEWPORT_HEIGHT;

function assertRenderInput(context, region, state) {
  const validPalette = Array.isArray(region?.palette) &&
    region.palette.length === 4 &&
    new Set(region.palette).size === 4 &&
    region.palette.every((tone) => typeof tone === "string");
  const validTiles = Array.isArray(region?.tiles) &&
    region.tiles.length === MAP_HEIGHT &&
    region.tiles.every((row) =>
      Array.isArray(row) &&
      row.length === MAP_WIDTH &&
      row.every((tile) => TILE_VALUES.has(tile)));
  const validCamera = Number.isInteger(state?.camera?.x) &&
    Number.isInteger(state?.camera?.y) &&
    state.camera.x >= 0 &&
    state.camera.x <= CAMERA_MAX_X &&
    state.camera.y >= 0 &&
    state.camera.y <= CAMERA_MAX_Y;
  const validPlayer = Number.isInteger(state?.player?.x) &&
    Number.isInteger(state?.player?.y) &&
    state.player.x >= 0 &&
    state.player.x < MAP_WIDTH &&
    state.player.y >= 0 &&
    state.player.y < MAP_HEIGHT;
  const validFacing = typeof state?.player === "object" &&
    state.player !== null &&
    Object.hasOwn(state.player, "facing") &&
    FACING_VALUES.has(state.player.facing);
  const residents = Array.isArray(region?.residents) && region.resident === region.residents[0]
    ? region.residents
    : [region?.resident].filter(Boolean);
  const validSprites = LANDMARK_SPRITES.has(region?.landmark?.sprite) &&
    typeof region.landmark.prop === "string" &&
    residents.length > 0 &&
    residents.every((resident) => RESIDENT_SPRITES.has(resident.sprite) && typeof resident.prop === "string");
  const validScenery = Array.isArray(region?.scenery);

  if (
    typeof context?.fillRect !== "function" ||
    typeof region?.id !== "string" ||
    state?.regionId !== region.id ||
    !validPalette ||
    !validTiles ||
    !validCamera ||
    !validPlayer ||
    !validFacing ||
    !validSprites ||
    !validScenery
  ) {
    throw new TypeError("renderer requires a valid context, region, and tile state");
  }
}

function fill(context, color, x, y, width, height) {
  context.fillStyle = color;
  context.fillRect(x, y, width, height);
}

function screenPoint(point, camera) {
  const tileX = point.x - camera.x;
  const tileY = point.y - camera.y;
  if (tileX < 0 || tileX >= VIEWPORT_WIDTH || tileY < 0 || tileY >= VIEWPORT_HEIGHT) {
    return null;
  }
  return { x: tileX * TILE_SIZE, y: tileY * TILE_SIZE };
}

export function renderTileWorld(context, region, state, { interactionAvailable = false, interactionResident = null } = {}) {
  assertRenderInput(context, region, state);
  context.imageSmoothingEnabled = false;
  const { camera } = state;

  for (let screenY = 0; screenY < VIEWPORT_HEIGHT; screenY += 1) {
    for (let screenX = 0; screenX < VIEWPORT_WIDTH; screenX += 1) {
      const tile = region.tiles[camera.y + screenY][camera.x + screenX];
      const path = tile === TILE_KINDS.PATH ||
        tile === TILE_KINDS.START ||
        tile === TILE_KINDS.INTERACTION ||
        tile === TILE_KINDS.SIGN;
      fill(
        context,
        region.palette[path ? 2 : 1],
        screenX * TILE_SIZE,
        screenY * TILE_SIZE,
        TILE_SIZE,
        TILE_SIZE,
      );
    }
  }

  renderRegionScenery(context, region, camera);
  renderLandmarkTerrain(context, region, camera);
  for (let screenY = 0; screenY < VIEWPORT_HEIGHT; screenY += 1) {
    for (let screenX = 0; screenX < VIEWPORT_WIDTH; screenX += 1) {
      const worldX = camera.x + screenX;
      const worldY = camera.y + screenY;
      if (region.tiles[worldY][worldX] !== TILE_KINDS.SIGN) continue;
      drawSign(context, region.palette, {
        x: screenX * TILE_SIZE,
        y: screenY * TILE_SIZE,
      });
    }
  }

  const landmark = screenPoint(region.landmark, camera);
  if (landmark) drawLandmark(context, region, landmark);
  const residents = Array.isArray(region.residents) && region.resident === region.residents[0]
    ? region.residents
    : [region.resident].filter(Boolean);
  for (const residentData of residents) {
    const resident = screenPoint(residentData, camera);
    if (resident) drawResident(context, region, resident, residentData);
  }
  const player = screenPoint(state.player, camera);
  if (player) drawPlayer(context, region.palette, state.player, player);
  const markerData = interactionResident?.interaction
    ?? (interactionAvailable ? region.interaction : null);
  const marker = markerData ? screenPoint(markerData, camera) : null;
  if (marker) drawMarker(context, region.palette, marker);
}
