import { REGION_IDS } from "./region-data.js";

export const PROGRESS_STORAGE_KEY = "classic-rpg-portfolio:v1";

const VERSION = 1;
const REGION_ID_SET = new Set(REGION_IDS);

function defaultStorage() {
  try {
    return globalThis.sessionStorage ?? null;
  } catch {
    return null;
  }
}

function parseCompletedRegionIds(serialized) {
  if (serialized === null) return [];

  try {
    const payload = JSON.parse(serialized);
    if (
      payload === null
      || typeof payload !== "object"
      || payload.version !== VERSION
      || !Array.isArray(payload.completedRegionIds)
    ) {
      return [];
    }
    const completed = new Set(
      payload.completedRegionIds.filter(
        (regionId) => typeof regionId === "string" && REGION_ID_SET.has(regionId),
      ),
    );
    return REGION_IDS.filter((regionId) => completed.has(regionId));
  } catch {
    return [];
  }
}

export function createProgressStore({ storage = defaultStorage() } = {}) {
  let completedRegionIds = [];

  try {
    completedRegionIds = parseCompletedRegionIds(
      storage?.getItem(PROGRESS_STORAGE_KEY) ?? null,
    );
  } catch {
    completedRegionIds = [];
  }

  function persist() {
    const payload = JSON.stringify({
      version: VERSION,
      completedRegionIds,
    });
    try {
      storage?.setItem(PROGRESS_STORAGE_KEY, payload);
    } catch {
    }
  }

  function complete(regionId) {
    if (!REGION_ID_SET.has(regionId) || completedRegionIds.includes(regionId)) {
      return false;
    }
    const completed = new Set([...completedRegionIds, regionId]);
    completedRegionIds = REGION_IDS.filter((id) => completed.has(id));
    persist();
    return true;
  }

  function reset(confirmed) {
    if (confirmed !== true) return false;
    completedRegionIds = [];
    try {
      storage?.removeItem(PROGRESS_STORAGE_KEY);
    } catch {
    }
    return true;
  }

  return Object.freeze({
    complete,
    getCompletedRegionIds: () => [...completedRegionIds],
    isCompleted: (regionId) => completedRegionIds.includes(regionId),
    reset,
  });
}
