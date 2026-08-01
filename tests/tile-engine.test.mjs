import { describe, expect, test } from "bun:test";

import {
  canInteract,
  createTileState,
  getInteractableResident,
  reduceTileState,
} from "../preview/tile-engine.js";
import {
  MAP_HEIGHT,
  MAP_WIDTH,
  REGIONS_BY_ID,
  isWalkableTile,
} from "../preview/region-data.js";

const STEPS = [
  ["up", 0, -1],
  ["right", 1, 0],
  ["down", 0, 1],
  ["left", -1, 0],
];

function shortestRoute(region) {
  const queue = [{ x: region.start.x, y: region.start.y, actions: [] }];
  const seen = new Set([`${region.start.x},${region.start.y}`]);

  for (let index = 0; index < queue.length; index += 1) {
    const current = queue[index];
    if (current.x === region.interaction.x && current.y === region.interaction.y) {
      return current.actions;
    }
    for (const [action, deltaX, deltaY] of STEPS) {
      const x = current.x + deltaX;
      const y = current.y + deltaY;
      const key = `${x},${y}`;
      if (
        x >= 0 && x < MAP_WIDTH && y >= 0 && y < MAP_HEIGHT &&
        !seen.has(key) && isWalkableTile(region.tiles[y][x])
      ) {
        seen.add(key);
        queue.push({ x, y, actions: [...current.actions, action] });
      }
    }
  }
  throw new Error("test fixture must have a route");
}

function openRegion(start = { x: 12, y: 9 }) {
  return {
    id: "open",
    start,
    resident: { id: "open-resident", x: 30, y: 30 },
    tiles: Array.from({ length: MAP_HEIGHT }, () =>
      Array.from({ length: MAP_WIDTH }, () => "path")),
  };
}

describe("pure tile engine", () => {
  test("creates an immutable region-entry state at the southern start", () => {
    // Given: the forest region
    const forest = REGIONS_BY_ID.forest;

    // When: its tile state is created
    const state = createTileState(forest);

    // Then: player and camera reset immediately without persisted position
    expect(state).toEqual({
      regionId: "forest",
      player: { x: 30, y: 40, facing: "down" },
      camera: { x: 19, y: 29 },
    });
    expect(Object.isFrozen(state)).toBe(true);
    expect(Object.isFrozen(state.player)).toBe(true);
    expect(Object.isFrozen(state.camera)).toBe(true);
  });

  test("keeps every region start on-screen without a first-move camera jump", () => {
    // Given: every region at its fresh southern-start entry state
    const entries = Object.values(REGIONS_BY_ID).map((region) => ({
      region,
      before: createTileState(region),
    }));

    // When: the player takes the first walkable northward step
    const observations = entries.map(({ region, before }) => ({
      before,
      after: reduceTileState(before, "up", region),
    }));

    // Then: the fresh camera already contains the player in the documented safe area
    expect(observations.every(({ before }) => {
      const screenX = before.player.x - before.camera.x;
      const screenY = before.player.y - before.camera.y;
      return screenX >= 8 && screenX <= 15 && screenY >= 6 && screenY <= 11;
    })).toBe(true);
    expect(observations.every(({ before, after }) =>
      after.camera.x === before.camera.x && after.camera.y === before.camera.y)).toBe(true);
  });

  test("moves exactly one walkable tile for one accepted action", () => {
    // Given: a player beside a walkable forest tile
    const forest = REGIONS_BY_ID.forest;
    const before = createTileState(forest);

    // When: one left action is reduced
    const after = reduceTileState(before, "left", forest);

    // Then: only one tile is traversed and the prior state stays unchanged
    expect(after.player).toEqual({ x: 29, y: 40, facing: "left" });
    expect(before.player).toEqual({ x: 30, y: 40, facing: "down" });
  });

  test("changes facing but not position for blocked and out-of-bounds steps", () => {
    // Given: a resident collision tile and one state at the map boundary
    const forest = REGIONS_BY_ID.forest;
    const collisionResident = forest.residents[1];
    const collision = Object.freeze({
      regionId: forest.id,
      player: Object.freeze({ ...collisionResident.interaction, facing: "down" }),
      camera: Object.freeze({ x: 0, y: 0 }),
    });
    const boundary = Object.freeze({
      regionId: forest.id,
      player: Object.freeze({ x: 0, y: 0, facing: "down" }),
      camera: Object.freeze({ x: 0, y: 0 }),
    });

    // When: each player steps toward the invalid destination
    const blocked = reduceTileState(collision, "up", forest);
    const outside = reduceTileState(boundary, "left", forest);

    // Then: both inputs apply facing without applying position
    expect(blocked.player).toEqual({ ...collisionResident.interaction, facing: "up" });
    expect(outside.player).toEqual({ x: 0, y: 0, facing: "left" });
    expect(blocked.camera).toEqual(collision.camera);
    expect(outside.camera).toEqual(boundary.camera);
    expect(blocked.camera).not.toBe(collision.camera);
    expect(outside.camera).not.toBe(boundary.camera);
  });

  test("reaches the forest resident only while adjacent and facing them", () => {
    // Given: the complete shortest southern-start-to-resident route
    const forest = REGIONS_BY_ID.forest;
    let state = createTileState(forest);
    const route = shortestRoute(forest);

    // When: every route action and the final facing action are reduced
    for (const action of route) {
      const previous = state;
      state = reduceTileState(state, action, forest);
      const screenX = state.player.x - state.camera.x;
      const screenY = state.player.y - state.camera.y;
      expect(Math.abs(state.player.x - previous.player.x) +
        Math.abs(state.player.y - previous.player.y)).toBe(1);
      expect(state.camera.x).toBeWithin(0, MAP_WIDTH - 24 + 1);
      expect(state.camera.y).toBeWithin(0, MAP_HEIGHT - 18 + 1);
      expect(
        (screenX >= 8 && screenX <= 15) ||
        state.camera.x === 0 ||
        state.camera.x === MAP_WIDTH - 24,
      ).toBe(true);
      expect(
        (screenY >= 6 && screenY <= 11) ||
        state.camera.y === 0 ||
        state.camera.y === MAP_HEIGHT - 18,
      ).toBe(true);
    }
    const nonFacing = state;
    const facing = reduceTileState(nonFacing, "right", forest);

    // Then: interaction is exposed only for Manhattan distance one plus facing
    expect(route.length).toBeGreaterThanOrEqual(8);
    expect(nonFacing.player).toEqual({ x: 29, y: 28, facing: "up" });
    expect(canInteract(nonFacing, forest)).toBe(false);
    expect(facing.player).toEqual({ x: 29, y: 28, facing: "right" });
    expect(canInteract(facing, forest)).toBe(true);
    expect(reduceTileState(facing, "A", forest)).toBe(facing);
  });

  test("keeps every central landmark fully below the top canvas edge during an approach", () => {
    // Given: each region's walkable route from the southern start to its central interaction point
    const observations = Object.values(REGIONS_BY_ID).map((region) => {
      let state = createTileState(region);
      for (const action of shortestRoute(region)) state = reduceTileState(state, action, region);
      return { region, state };
    });

    // When: the explorer enters the close-range landmark precinct
    const landmarkRows = observations.map(({ region, state }) => region.landmark.y - state.camera.y);
    const playerRows = observations.map(({ state }) => state.player.y - state.camera.y);

    // Then: all tall landmark tops have five tile rows of headroom without losing the player safe zone
    expect(landmarkRows.every((row) => row >= 5)).toBe(true);
    expect(playerRows.every((row) => row >= 6 && row <= 11)).toBe(true);
  });

  test("finds any resident in the open map, not only the landmark resident", () => {
    // Given: a player at the interaction point of a secondary resident
    const region = REGIONS_BY_ID.forest;
    const resident = region.residents[1];
    const facing = resident.x > resident.interaction.x
      ? "right"
      : resident.x < resident.interaction.x
        ? "left"
        : resident.y > resident.interaction.y
          ? "down"
          : "up";
    const state = {
      regionId: region.id,
      player: { ...resident.interaction, facing },
      camera: { x: 0, y: 0 },
    };

    // When: interaction eligibility is checked against the full resident roster
    const found = getInteractableResident(state, region);

    // Then: the secondary resident is the active project explainer
    expect(found).toBe(resident);
    expect(canInteract(state, region)).toBe(true);
  });

  test("resets instead of applying movement when a stale state enters a region", () => {
    // Given: a moved forest state and a different selected region
    const forest = REGIONS_BY_ID.forest;
    const city = REGIONS_BY_ID.city;
    const stale = reduceTileState(createTileState(forest), "left", forest);

    // When: the stale state is reduced against the selected city
    const entered = reduceTileState(stale, "left", city);

    // Then: city starts fresh and the triggering action is not queued
    expect(entered).toEqual(createTileState(city));
    expect(entered.regionId).toBe("city");
  });

  test("tracks both axes at the inclusive safe-zone boundaries", () => {
    // Given: a player at safe screen x=15 and y=11
    const region = openRegion();
    const state = Object.freeze({
      regionId: region.id,
      player: Object.freeze({ x: 15, y: 11, facing: "up" }),
      camera: Object.freeze({ x: 0, y: 0 }),
    });

    // When: successful right and down steps cross each boundary
    const right = reduceTileState(state, "right", region);
    const down = reduceTileState(right, "down", region);

    // Then: origins shift one tile and keep the player on safe x=15,y=11
    expect(right.camera).toEqual({ x: 1, y: 0 });
    expect(down.camera).toEqual({ x: 1, y: 1 });
    expect([down.player.x - down.camera.x, down.player.y - down.camera.y])
      .toEqual([15, 11]);
  });

  test("tracks back toward the inclusive safe-zone minimums", () => {
    // Given: a player at safe screen x=8 and y=6
    const region = openRegion();
    const state = Object.freeze({
      regionId: region.id,
      player: Object.freeze({ x: 24, y: 28, facing: "down" }),
      camera: Object.freeze({ x: 16, y: 22 }),
    });

    // When: successful left and up steps cross each boundary
    const left = reduceTileState(state, "left", region);
    const up = reduceTileState(left, "up", region);

    // Then: origins shift one tile on both axes
    expect(left.camera).toEqual({ x: 15, y: 22 });
    expect(up.camera).toEqual({ x: 15, y: 21 });
  });

  test("clamps camera origin at all four map edges", () => {
    // Given: successful movements at each camera clamp
    const region = openRegion();
    const cases = [
      [{ x: 8, y: 20, facing: "right" }, { x: 0, y: 11 }, "left", { x: 0, y: 11 }],
      [{ x: 43, y: 20, facing: "left" }, { x: 36, y: 11 }, "right", { x: 36, y: 11 }],
      [{ x: 20, y: 6, facing: "down" }, { x: 8, y: 0 }, "up", { x: 8, y: 0 }],
      [{ x: 20, y: 37, facing: "up" }, { x: 8, y: 32 }, "down", { x: 8, y: 32 }],
    ];

    // When: each action attempts to track beyond an origin limit
    const cameras = cases.map(([player, camera, action]) =>
      reduceTileState({
        regionId: region.id,
        player: Object.freeze(player),
        camera: Object.freeze(camera),
      }, action, region).camera);

    // Then: x remains within 0..36 and y remains within 0..32
    expect(cameras).toEqual(cases.map((entry) => entry[3]));
  });

  test("ignores malformed actions and malformed stale coordinates", () => {
    // Given: a valid state and a stale state outside the map
    const forest = REGIONS_BY_ID.forest;
    const valid = createTileState(forest);
    const malformed = {
      regionId: forest.id,
      player: { x: Number.NaN, y: 36, facing: "down" },
      camera: { x: 12, y: 22 },
    };

    // When: unsupported inputs cross the pure reducer boundary
    const unchanged = [undefined, null, {}, "north", "A", "B", "__proto__", "constructor"]
      .map((action) => reduceTileState(valid, action, forest));
    const stale = reduceTileState(malformed, "left", forest);

    // Then: no movement, interaction, queue, or exception is introduced
    expect(unchanged.every((state) => state === valid)).toBe(true);
    expect(stale).toBe(malformed);
    expect(() => createTileState({ id: "bad", start: { x: -1, y: 2 } }))
      .toThrow(TypeError);
  });

  test("does not freeze or mutate caller-owned camera on blocked reduction", () => {
    // Given: a mutable valid state whose next forest tile is a resident
    const forest = REGIONS_BY_ID.forest;
    const blockedResident = forest.residents[1];
    const state = {
      regionId: forest.id,
      player: { ...blockedResident.interaction, facing: "down" },
      camera: { x: 0, y: 0 },
    };
    const cameraBefore = { ...state.camera };

    // When: the blocked action is reduced
    const blocked = reduceTileState(state, "up", forest);

    // Then: caller-owned input remains mutable and unchanged while output is deeply frozen
    expect(Object.isFrozen(state)).toBe(false);
    expect(Object.isFrozen(state.player)).toBe(false);
    expect(Object.isFrozen(state.camera)).toBe(false);
    expect(state.camera).toEqual(cameraBefore);
    expect(blocked.player).toEqual({ ...blockedResident.interaction, facing: "up" });
    expect(blocked.camera).toEqual(cameraBefore);
    expect(blocked.camera).not.toBe(state.camera);
    expect(Object.isFrozen(blocked)).toBe(true);
    expect(Object.isFrozen(blocked.player)).toBe(true);
    expect(Object.isFrozen(blocked.camera)).toBe(true);
  });

  test("applies every repeated blocked input without accumulating movement", () => {
    // Given: a blocked resident directly north of the player
    const forest = REGIONS_BY_ID.forest;
    let state = Object.freeze({
      regionId: forest.id,
      player: Object.freeze({ ...forest.residents[1].interaction, facing: "down" }),
      camera: Object.freeze({ x: 0, y: 0 }),
    });

    // When: the same blocked input is reduced repeatedly
    for (let count = 0; count < 50; count += 1) {
      state = reduceTileState(state, "up", forest);
    }

    // Then: position and camera never advance while facing is applied
    expect(state.player).toEqual({ ...forest.residents[1].interaction, facing: "up" });
    expect(state.camera).toEqual({ x: 0, y: 0 });
  });
});
