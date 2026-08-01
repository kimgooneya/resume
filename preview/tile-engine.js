import {
  MAP_HEIGHT,
  MAP_WIDTH,
  VIEWPORT_HEIGHT,
  VIEWPORT_WIDTH,
  isWalkableTile,
} from "./region-data.js";

export const SAFE_SCREEN_BOUNDS = Object.freeze({
  minX: 8,
  maxX: 15,
  minY: 6,
  maxY: 11,
});

export const CAMERA_ORIGIN_BOUNDS = Object.freeze({
  minX: 0,
  maxX: MAP_WIDTH - VIEWPORT_WIDTH,
  minY: 0,
  maxY: MAP_HEIGHT - VIEWPORT_HEIGHT,
});

const DIRECTION_STEPS = Object.freeze({
  up: Object.freeze({ x: 0, y: -1 }),
  right: Object.freeze({ x: 1, y: 0 }),
  down: Object.freeze({ x: 0, y: 1 }),
  left: Object.freeze({ x: -1, y: 0 }),
});

function clamp(value, minimum, maximum) {
  return Math.min(maximum, Math.max(minimum, value));
}

function isMapPoint(point) {
  return Number.isInteger(point?.x) &&
    Number.isInteger(point?.y) &&
    point.x >= 0 &&
    point.x < MAP_WIDTH &&
    point.y >= 0 &&
    point.y < MAP_HEIGHT;
}

function isRegion(region) {
  return typeof region?.id === "string" &&
    isMapPoint(region.start) &&
    Array.isArray(region.tiles) &&
    region.tiles.length === MAP_HEIGHT &&
    region.tiles.every((row) => Array.isArray(row) && row.length === MAP_WIDTH);
}

function freezeState(regionId, player, camera) {
  return Object.freeze({
    regionId,
    player: Object.freeze(player),
    camera: Object.freeze(camera),
  });
}

function trackAxis(position, origin, safeMinimum, safeMaximum, originMaximum) {
  const screenPosition = position - origin;
  if (screenPosition < safeMinimum) {
    return clamp(position - safeMinimum, 0, originMaximum);
  }
  if (screenPosition > safeMaximum) {
    return clamp(position - safeMaximum, 0, originMaximum);
  }
  return origin;
}

function isUsableState(state) {
  return typeof state?.regionId === "string" &&
    isMapPoint(state.player) &&
    Number.isInteger(state.camera?.x) &&
    Number.isInteger(state.camera?.y);
}

export function createTileState(region) {
  if (!isRegion(region)) {
    throw new TypeError("region must provide a valid ID, start, and expanded tile map");
  }
  const camera = {
    x: clamp(
      region.start.x - Math.floor((SAFE_SCREEN_BOUNDS.minX + SAFE_SCREEN_BOUNDS.maxX) / 2),
      CAMERA_ORIGIN_BOUNDS.minX,
      CAMERA_ORIGIN_BOUNDS.maxX,
    ),
    y: clamp(
      region.start.y - SAFE_SCREEN_BOUNDS.maxY,
      CAMERA_ORIGIN_BOUNDS.minY,
      CAMERA_ORIGIN_BOUNDS.maxY,
    ),
  };
  return freezeState(
    region.id,
    { x: region.start.x, y: region.start.y, facing: "down" },
    camera,
  );
}

export function reduceTileState(state, action, region) {
  if (state?.regionId !== region?.id) return createTileState(region);
  const step = typeof action === "string" && Object.hasOwn(DIRECTION_STEPS, action)
    ? DIRECTION_STEPS[action]
    : undefined;
  if (!step || !isUsableState(state)) return state;

  const nextX = state.player.x + step.x;
  const nextY = state.player.y + step.y;
  const destination = region.tiles[nextY]?.[nextX];
  if (!isWalkableTile(destination)) {
    return freezeState(
      state.regionId,
      { x: state.player.x, y: state.player.y, facing: action },
      { ...state.camera },
    );
  }

  const camera = {
    x: trackAxis(
      nextX,
      state.camera.x,
      SAFE_SCREEN_BOUNDS.minX,
      SAFE_SCREEN_BOUNDS.maxX,
      CAMERA_ORIGIN_BOUNDS.maxX,
    ),
    y: trackAxis(
      nextY,
      state.camera.y,
      SAFE_SCREEN_BOUNDS.minY,
      SAFE_SCREEN_BOUNDS.maxY,
      CAMERA_ORIGIN_BOUNDS.maxY,
    ),
  };
  return freezeState(
    state.regionId,
    { x: nextX, y: nextY, facing: action },
    camera,
  );
}

export function getInteractableResident(state, region) {
  if (state?.regionId !== region?.id || !isUsableState(state)) return null;
  const facing = state.player.facing;
  const step = typeof facing === "string" && Object.hasOwn(DIRECTION_STEPS, facing)
    ? DIRECTION_STEPS[facing]
    : undefined;
  if (!step) return null;
  const residents = Array.isArray(region.residents)
    ? region.residents
    : [region.resident].filter(Boolean);
  return residents.find((resident) =>
    isMapPoint(resident) &&
    state.player.x + step.x === resident.x &&
    state.player.y + step.y === resident.y,
  ) ?? null;
}

export function canInteract(state, region) {
  return getInteractableResident(state, region) !== null;
}
