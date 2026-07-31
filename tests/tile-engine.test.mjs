import { describe, expect, test } from "bun:test";

import {
  canInteract,
  createTileState,
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
      player: { x: 20, y: 58, facing: "down" },
      camera: { x: 8, y: 46 },
    });
    expect(Object.isFrozen(state)).toBe(true);
    expect(Object.isFrozen(state.player)).toBe(true);
    expect(Object.isFrozen(state.camera)).toBe(true);
  });

  test("moves exactly one walkable tile for one accepted action", () => {
    // Given: a player beside a walkable forest tile
    const forest = REGIONS_BY_ID.forest;
    const before = createTileState(forest);

    // When: one left action is reduced
    const after = reduceTileState(before, "left", forest);

    // Then: only one tile is traversed and the prior state stays unchanged
    expect(after.player).toEqual({ x: 19, y: 58, facing: "left" });
    expect(before.player).toEqual({ x: 20, y: 58, facing: "down" });
  });

  test("changes facing but not position for blocked and out-of-bounds steps", () => {
    // Given: one collision tile and one state at the map boundary
    const forest = REGIONS_BY_ID.forest;
    const collision = createTileState(forest);
    const boundary = Object.freeze({
      regionId: forest.id,
      player: Object.freeze({ x: 0, y: 0, facing: "down" }),
      camera: Object.freeze({ x: 0, y: 0 }),
    });

    // When: each player steps toward the invalid destination
    const blocked = reduceTileState(collision, "up", forest);
    const outside = reduceTileState(boundary, "left", forest);

    // Then: both inputs apply facing without applying position
    expect(blocked.player).toEqual({ x: 20, y: 58, facing: "up" });
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
      expect(state.camera.x).toBeWithin(0, 17);
      expect(state.camera.y).toBeWithin(0, 47);
      expect(
        (screenX >= 8 && screenX <= 15) ||
        state.camera.x === 0 ||
        state.camera.x === 16,
      ).toBe(true);
      expect(
        (screenY >= 6 && screenY <= 11) ||
        state.camera.y === 0 ||
        state.camera.y === 46,
      ).toBe(true);
    }
    const nonFacing = state;
    const facing = reduceTileState(nonFacing, "right", forest);

    // Then: interaction is exposed only for Manhattan distance one plus facing
    expect(route.length).toBeGreaterThanOrEqual(110);
    expect(nonFacing.player).toEqual({ x: 5, y: 11, facing: "up" });
    expect(canInteract(nonFacing, forest)).toBe(false);
    expect(facing.player).toEqual({ x: 5, y: 11, facing: "right" });
    expect(canInteract(facing, forest)).toBe(true);
    expect(reduceTileState(facing, "A", forest)).toBe(facing);
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
      player: Object.freeze({ x: 24, y: 52, facing: "down" }),
      camera: Object.freeze({ x: 16, y: 46 }),
    });

    // When: successful left and up steps cross each boundary
    const left = reduceTileState(state, "left", region);
    const up = reduceTileState(left, "up", region);

    // Then: origins shift one tile on both axes
    expect(left.camera).toEqual({ x: 15, y: 46 });
    expect(up.camera).toEqual({ x: 15, y: 45 });
  });

  test("clamps camera origin at all four map edges", () => {
    // Given: successful movements at each camera clamp
    const region = openRegion();
    const cases = [
      [{ x: 8, y: 20, facing: "right" }, { x: 0, y: 11 }, "left", { x: 0, y: 11 }],
      [{ x: 31, y: 20, facing: "left" }, { x: 16, y: 11 }, "right", { x: 16, y: 11 }],
      [{ x: 20, y: 6, facing: "down" }, { x: 8, y: 0 }, "up", { x: 8, y: 0 }],
      [{ x: 20, y: 57, facing: "up" }, { x: 8, y: 46 }, "down", { x: 8, y: 46 }],
    ];

    // When: each action attempts to track beyond an origin limit
    const cameras = cases.map(([player, camera, action]) =>
      reduceTileState({
        regionId: region.id,
        player: Object.freeze(player),
        camera: Object.freeze(camera),
      }, action, region).camera);

    // Then: x remains within 0..16 and y remains within 0..46
    expect(cameras).toEqual(cases.map((entry) => entry[3]));
  });

  test("ignores malformed actions and malformed stale coordinates", () => {
    // Given: a valid state and a stale state outside the map
    const forest = REGIONS_BY_ID.forest;
    const valid = createTileState(forest);
    const malformed = {
      regionId: forest.id,
      player: { x: Number.NaN, y: 58, facing: "down" },
      camera: { x: 8, y: 46 },
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
    // Given: a mutable valid state whose next forest tile is blocked
    const forest = REGIONS_BY_ID.forest;
    const state = {
      regionId: forest.id,
      player: { x: 20, y: 58, facing: "down" },
      camera: { x: 8, y: 46 },
    };
    const cameraBefore = { ...state.camera };

    // When: the blocked action is reduced
    const blocked = reduceTileState(state, "up", forest);

    // Then: caller-owned input remains mutable and unchanged while output is deeply frozen
    expect(Object.isFrozen(state)).toBe(false);
    expect(Object.isFrozen(state.player)).toBe(false);
    expect(Object.isFrozen(state.camera)).toBe(false);
    expect(state.camera).toEqual(cameraBefore);
    expect(blocked.player).toEqual({ x: 20, y: 58, facing: "up" });
    expect(blocked.camera).toEqual(cameraBefore);
    expect(blocked.camera).not.toBe(state.camera);
    expect(Object.isFrozen(blocked)).toBe(true);
    expect(Object.isFrozen(blocked.player)).toBe(true);
    expect(Object.isFrozen(blocked.camera)).toBe(true);
  });

  test("applies every repeated blocked input without accumulating movement", () => {
    // Given: a blocked tile directly north of the forest start
    const forest = REGIONS_BY_ID.forest;
    let state = createTileState(forest);

    // When: the same blocked input is reduced repeatedly
    for (let count = 0; count < 50; count += 1) {
      state = reduceTileState(state, "up", forest);
    }

    // Then: position and camera never advance while facing is applied
    expect(state.player).toEqual({ x: 20, y: 58, facing: "up" });
    expect(state.camera).toEqual({ x: 8, y: 46 });
  });
});
