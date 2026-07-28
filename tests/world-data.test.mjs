import { describe, expect, test } from "bun:test";
import {
  VILLAGES,
  WORLD,
  heightAt,
  isRoadAt,
  isWaterAt,
  terrainLevelAt,
  tileKindAt,
} from "../preview/world-data.js";

describe("flat voxel world data", () => {
  test("provides a 96 by 60 cell world", () => {
    const width = WORLD.maxX - WORLD.minX + 1;
    const depth = WORLD.maxZ - WORLD.minZ + 1;

    expect(width).toBe(96);
    expect(depth).toBe(60);
  });

  test("defines five uniquely named villages", () => {
    const ids = VILLAGES.map(({ id }) => id);

    expect(VILLAGES).toHaveLength(5);
    expect(new Set(ids).size).toBe(5);
  });

  test("places every village on its intended biome", () => {
    const actual = VILLAGES.map(({ biome, position }) => [
      biome,
      tileKindAt(position.x, position.z),
    ]);

    expect(actual).toEqual([
      ["forest", "forest"],
      ["city", "city"],
      ["desert", "desert"],
      ["snow", "snow"],
      ["coast", "coast"],
    ]);
  });

  test("keeps every village out of water", () => {
    const waterVillages = VILLAGES.filter(({ position }) =>
      isWaterAt(position.x, position.z),
    );

    expect(waterVillages).toEqual([]);
  });

  test("creates both a river and a coastal sea", () => {
    expect(isWaterAt(-1, -8)).toBe(true);
    expect(isWaterAt(36, 18)).toBe(true);
    expect(isWaterAt(-32, -14)).toBe(false);
  });

  test("uses four discrete terrain levels across dry land", () => {
    // Given: every dry cell in the playable world
    const levels = new Set();

    // When: the discrete terrain level is sampled
    for (let z = WORLD.minZ; z <= WORLD.maxZ; z += 1) {
      for (let x = WORLD.minX; x <= WORLD.maxX; x += 1) {
        if (!isWaterAt(x, z)) levels.add(terrainLevelAt(x, z));
      }
    }

    // Then: the miniature landscape has four intentional terraces
    expect([...levels].sort()).toEqual([0, 1, 2, 3]);
  });

  test("keeps landmark plazas level and walkable", () => {
    // Given: the cells immediately surrounding each landmark
    const plazaSamples = VILLAGES.flatMap(({ position }) => [
      [position.x, position.z],
      [position.x + 1, position.z],
      [position.x - 1, position.z],
      [position.x, position.z + 1],
      [position.x, position.z - 1],
    ]);

    // When: their surface heights are measured
    const heights = plazaSamples.map(([x, z]) => heightAt(x, z));

    // Then: every plaza stays on the shared access level
    expect(new Set(heights)).toEqual(new Set([0.78]));
  });

  test("connects every village to the main road", () => {
    // Given: each village spur between its plaza and the main east-west road
    const connected = VILLAGES.map(({ position }) => {
      const start = Math.min(0, position.z);
      const end = Math.max(0, position.z);

      // When: every cell on the spur is inspected
      return Array.from({ length: end - start + 1 }, (_, offset) =>
        isRoadAt(position.x, start + offset),
      ).every(Boolean);
    });

    // Then: no landmark becomes an isolated decorative island
    expect(connected).toEqual([true, true, true, true, true]);
  });
});
