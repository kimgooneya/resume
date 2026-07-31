import { describe, expect, test } from "bun:test";

import { REGION_IDS } from "../preview/region-data.js";
import {
  PROGRESS_STORAGE_KEY,
  createProgressStore,
} from "../preview/progress-store.js";

function createStorage(initial = {}) {
  const values = new Map(Object.entries(initial));
  return {
    getItem: (key) => values.get(key) ?? null,
    removeItem: (key) => values.delete(key),
    setItem: (key, value) => values.set(key, value),
    value: (key) => values.get(key) ?? null,
  };
}

describe("session progress store", () => {
  test("uses the versioned key and stores only ordered completions", () => {
    // Given: an empty session storage
    const storage = createStorage();
    const store = createProgressStore({ storage });

    // When: regions are completed out of catalogue order
    store.complete("coast");
    store.complete("forest");
    store.complete("desert");

    // Then: the only payload fields are version and stable region-order IDs
    expect(PROGRESS_STORAGE_KEY).toBe("classic-rpg-portfolio:v1");
    expect(JSON.parse(storage.value(PROGRESS_STORAGE_KEY))).toEqual({
      version: 1,
      completedRegionIds: ["forest", "desert", "coast"],
    });
  });

  test("complete is allowlisted and idempotent", () => {
    // Given: an empty progress store
    const storage = createStorage();
    const store = createProgressStore({ storage });

    // When: an unknown ID and a duplicate known ID are recorded
    const outcomes = [
      store.complete("unknown"),
      store.complete("city"),
      store.complete("city"),
    ];

    // Then: only the first known completion changes progress
    expect(outcomes).toEqual([false, true, false]);
    expect(store.getCompletedRegionIds()).toEqual(["city"]);
  });

  test("reloads persisted completion in catalogue order", () => {
    // Given: valid persisted completions in unstable order
    const storage = createStorage({
      [PROGRESS_STORAGE_KEY]: JSON.stringify({
        version: 1,
        completedRegionIds: ["snow", "forest", "city"],
      }),
    });

    // When: a store is created for the session
    const completed = createProgressStore({ storage }).getCompletedRegionIds();

    // Then: progress is normalized to current region order
    expect(completed).toEqual(["forest", "city", "snow"]);
  });

  test("filters unknown persisted IDs using current region data", () => {
    // Given: a payload mixing known, duplicate, and unknown IDs
    const storage = createStorage({
      [PROGRESS_STORAGE_KEY]: JSON.stringify({
        version: 1,
        completedRegionIds: ["removed-region", "coast", "coast"],
      }),
    });

    // When: persisted progress is loaded
    const completed = createProgressStore({ storage }).getCompletedRegionIds();

    // Then: only the allowlisted completion survives
    expect(completed).toEqual(["coast"]);
    expect(completed.every((id) => REGION_IDS.includes(id))).toBe(true);
  });

  test("recovers empty progress from corrupt JSON", () => {
    // Given: malformed persisted JSON
    const storage = createStorage({ [PROGRESS_STORAGE_KEY]: "{bad json" });

    // When: progress is loaded
    const store = createProgressStore({ storage });

    // Then: the app receives a usable empty store
    expect(store.getCompletedRegionIds()).toEqual([]);
    expect(store.complete("forest")).toBe(true);
  });

  test("recovers from malformed and mismatched-version payloads", () => {
    // Given: stale or structurally invalid persisted values
    const payloads = [
      JSON.stringify({ version: 2, completedRegionIds: ["forest"] }),
      JSON.stringify({ version: 1, completedRegionIds: "forest" }),
      JSON.stringify(["forest"]),
      "null",
    ];

    // When: each payload is loaded
    const recovered = payloads.map((payload) => createProgressStore({
      storage: createStorage({ [PROGRESS_STORAGE_KEY]: payload }),
    }).getCompletedRegionIds());

    // Then: none is trusted as current progress
    expect(recovered).toEqual([[], [], [], []]);
  });

  test("falls back to in-memory progress when storage methods throw", () => {
    // Given: a sessionStorage implementation blocked by the browser
    const storage = {
      getItem: () => { throw new DOMException("blocked"); },
      setItem: () => { throw new DOMException("blocked"); },
      removeItem: () => { throw new DOMException("blocked"); },
    };
    const store = createProgressStore({ storage });

    // When: progress is completed and read
    const changed = store.complete("desert");

    // Then: progress remains usable for this runtime
    expect(changed).toBe(true);
    expect(store.isCompleted("desert")).toBe(true);
    expect(store.getCompletedRegionIds()).toEqual(["desert"]);
  });

  test("continues in memory when only persistence writes fail", () => {
    // Given: readable storage whose writes fail
    const storage = {
      getItem: () => JSON.stringify({ version: 1, completedRegionIds: ["forest"] }),
      setItem: () => { throw new DOMException("quota"); },
      removeItem: () => { throw new DOMException("blocked"); },
    };
    const store = createProgressStore({ storage });

    // When: another region is completed
    store.complete("city");

    // Then: both completions remain available in memory
    expect(store.getCompletedRegionIds()).toEqual(["forest", "city"]);
  });

  test("cancels reset unless it is explicitly confirmed", () => {
    // Given: stored completion
    const storage = createStorage();
    const store = createProgressStore({ storage });
    store.complete("snow");

    // When: reset is not confirmed
    const reset = store.reset(false);

    // Then: progress and storage are preserved
    expect(reset).toBe(false);
    expect(store.getCompletedRegionIds()).toEqual(["snow"]);
    expect(storage.value(PROGRESS_STORAGE_KEY)).not.toBeNull();
  });

  test("clears progress only after confirmed reset", () => {
    // Given: stored completion
    const storage = createStorage();
    const store = createProgressStore({ storage });
    store.complete("forest");
    store.complete("coast");

    // When: reset is confirmed
    const reset = store.reset(true);

    // Then: both memory and session persistence are empty
    expect(reset).toBe(true);
    expect(store.getCompletedRegionIds()).toEqual([]);
    expect(storage.value(PROGRESS_STORAGE_KEY)).toBeNull();
  });
});
