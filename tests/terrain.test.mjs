import { describe, expect, test } from "bun:test";
import * as THREE from "three";

import { createTerrain } from "../preview/terrain.js";

const palette = Object.freeze({
  "accent-cyan": "#67e6f3",
  "building-dark": "#485565",
  "building-light": "#e8e2ce",
  "cliff-light": "#6f8c72",
  "coast": "#68bd86",
  "city": "#91b9b4",
  "forest-deep": "#347f36",
  "ice": "#9fd9df",
  "meadow": "#7fbd48",
  "rail": "#76553d",
  "rail-metal": "#a9bbc0",
  "road": "#3e454d",
  "road-marking": "#f6d46b",
  "roof": "#2e5b83",
  "sand": "#e8b84f",
  "shore-foam": "#b8f4e8",
  "snow": "#e8f4f4",
  "soil-deep": "#273f43",
  "soil-mid": "#48645c",
  "space-core": "#071a3b",
  "text-primary": "#f4fbff",
  "water-deep": "#087f9c",
  "water-light": "#22c6cf",
  "warning": "#ff9d4d",
});

describe("terrain renderer", () => {
  test("composes named surface, route, and decor layers", () => {
    // Given: the complete terrain palette
    // When: the portfolio terrain is created
    const terrain = createTerrain(palette);

    // Then: every visual responsibility has one inspectable layer
    expect(terrain).toBeInstanceOf(THREE.Group);
    expect(terrain.name).toBe("terrain");
    expect(terrain.children.map(({ name }) => name)).toEqual([
      "terrain-surfaces",
      "terrain-routes",
      "terrain-decor",
    ]);
  });

  test("batches layered terrain and transportation geometry", () => {
    // Given: a rendered terrain
    const terrain = createTerrain(palette);

    // When: named repeated batches are inspected
    const names = new Set();
    terrain.traverse((object) => {
      if (object instanceof THREE.InstancedMesh) names.add(object.name);
    });

    // Then: the expensive repeated details remain instanced
    expect(names).toEqual(
      new Set([
        "terrain-columns",
        "terrain-caps",
        "terrain-cliffs",
        "shore-foam",
        "road-decks",
        "road-markings",
        "road-bridge-supports",
        "rail-sleepers",
        "rail-left",
        "rail-right",
        "rail-bridge-supports",
        "tree-trunks",
        "tree-crowns",
        "house-walls",
        "house-roofs",
        "biome-rocks",
        "desert-cacti",
        "coast-reeds",
        "coast-buoys",
      ]),
    );
  });
});
