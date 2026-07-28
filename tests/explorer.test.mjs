import { describe, expect, test } from "bun:test";

import {
  celebrateArrival,
  createExplorer,
  moveExplorer,
} from "../preview/explorer.js";

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
});
