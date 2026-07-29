import { describe, expect, test } from "bun:test";

import {
  celebrateArrival,
  createExplorer,
  fastTravelExplorer,
  moveExplorer,
} from "../preview/explorer.js";
import { VILLAGES, WORLD, heightAt } from "../preview/world-data.js";

const palette = Object.freeze({
  "accent-cyan": "#67e6f3",
  "building-dark": "#485565",
  "building-light": "#e8e2ce",
  "explorer-pack": "#5c3f35",
  "explorer-scarf": "#ff6f61",
  "explorer-skin": "#f2c7a5",
  "roof": "#2e5b83",
  "shadow-contact": "#030819",
});

describe("voxel explorer", () => {
  test("has a face, scarf, backpack, and map device", () => {
    // Given: the explorer palette
    // When: the character is assembled
    const explorer = createExplorer(palette);

    // Then: the identity parts are inspectable and present
    const names = explorer.children.map(({ name }) => name);
    expect(
      ["explorer-face", "explorer-scarf", "explorer-pack", "explorer-map"].every(
        (name) => names.includes(name),
      ),
    ).toBe(true);
  });

  test("faces a landmark and enters a finite arrival state", () => {
    // Given: an idle explorer and a landmark to the east
    const explorer = createExplorer(palette);

    // When: arrival feedback is triggered
    celebrateArrival(explorer, { x: explorer.position.x + 4, z: explorer.position.z }, false);

    // Then: the explorer turns and the wave state can settle
    expect(explorer.userData.arrivalTime).toBeGreaterThan(0);
    expect(explorer.rotation.y).toBeCloseTo(Math.PI / 2);
    moveExplorer(explorer, { x: 0, z: 0 }, 2, false);
    expect(explorer.userData.arrivalTime).toBe(0);
  });

  test("scales walking speed with analog input strength", () => {
    // Given: two explorers starting on the same walkable road
    const fullStrength = createExplorer(palette);
    const halfStrength = createExplorer(palette);
    const startingZ = fullStrength.position.z;

    // When: both move for the same frame at different stick strengths
    moveExplorer(fullStrength, { x: 0, z: 1 }, 0.05, false);
    moveExplorer(halfStrength, { x: 0, z: 0.5 }, 0.05, false);

    // Then: half deflection travels half as far
    const fullDistance = fullStrength.position.z - startingZ;
    const halfDistance = halfStrength.position.z - startingZ;
    expect(halfDistance).toBeCloseTo(fullDistance / 2);
  });

  test("fast travels to a walkable landmark approach cell", () => {
    VILLAGES.forEach((village) => {
      // Given: a fresh explorer and a village on either side of the main road
      const explorer = createExplorer(palette);

      // When: fast travel is requested
      const moved = fastTravelExplorer(explorer, village);
      const approachZ =
        village.position.z + (village.position.z > 0 ? -2 : 2);

      // Then: the explorer lands two cells from the landmark on its road
      expect(moved).toBe(true);
      expect(explorer.position.x).toBe(village.position.x * WORLD.tileSize);
      expect(explorer.position.z).toBe(approachZ * WORLD.tileSize);
      expect(explorer.position.y).toBe(
        heightAt(village.position.x, approachZ) + 0.03,
      );
    });
  });
});
