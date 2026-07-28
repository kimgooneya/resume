import { describe, expect, test } from "bun:test";
import * as THREE from "three";

import { ASSET_NAMES, createAssetLibrary } from "../scripts/voxel-assets.mjs";

describe("voxel asset library", () => {
  test("creates every starter asset", () => {
    // Given: the starter asset definitions
    // When: the complete library is built
    const assets = createAssetLibrary();

    // Then: every named asset is present
    expect([...assets.keys()]).toEqual(ASSET_NAMES);
  });

  test("places every asset on the ground plane", () => {
    // Given: the generated starter assets
    const assets = createAssetLibrary();

    // When: each world-space bounding box is measured
    const minimumHeights = [...assets.values()].map(
      (asset) => new THREE.Box3().setFromObject(asset).min.y,
    );

    // Then: every asset starts at y = 0
    expect(minimumHeights.every((height) => Math.abs(height) < 0.0001)).toBe(
      true,
    );
  });

  test("merges cubes into a small material-based mesh set", () => {
    // Given: the generated starter assets
    const assets = createAssetLibrary();

    // When: renderable meshes are counted
    const meshCounts = [...assets.values()].map(
      (asset) =>
        asset.children.filter((child) => child instanceof THREE.Mesh).length,
    );

    // Then: every asset uses at most six draw-call groups
    expect(meshCounts.every((count) => count > 0 && count <= 6)).toBe(true);
  });
});
