import * as THREE from "three";
import { mergeGeometries } from "three/addons/utils/BufferGeometryUtils.js";

export const ASSET_NAMES = Object.freeze([
  "pine-tree",
  "round-rock",
  "soft-cloud",
  "forest-observatory",
]);

const COLORS = Object.freeze({
  bark: 0x8b5a2b,
  cloudLight: 0xf7fbff,
  cloudShade: 0xcfe8f3,
  foliageDark: 0x2f7d45,
  foliageLight: 0x63b34f,
  glass: 0x36a9d6,
  observatoryAccent: 0xff8a4c,
  observatoryBase: 0x6d7890,
  observatoryLight: 0xf1eadb,
  rockDark: 0x667085,
  rockLight: 0x98a2b3,
});

const UNIT_CUBE = new THREE.BoxGeometry(1, 1, 1);

function cube(position, size, color, rotation = [0, 0, 0]) {
  return Object.freeze({ color, position, rotation, size });
}

function createAsset(name, cubes) {
  const geometriesByColor = new Map();

  for (const spec of cubes) {
    const geometry = UNIT_CUBE.clone();
    const matrix = new THREE.Matrix4();
    const quaternion = new THREE.Quaternion().setFromEuler(
      new THREE.Euler(...spec.rotation),
    );
    matrix.compose(
      new THREE.Vector3(...spec.position),
      quaternion,
      new THREE.Vector3(...spec.size),
    );
    geometry.applyMatrix4(matrix);

    const geometries = geometriesByColor.get(spec.color) ?? [];
    geometries.push(geometry);
    geometriesByColor.set(spec.color, geometries);
  }

  const group = new THREE.Group();
  group.name = name;

  for (const [color, geometries] of geometriesByColor) {
    const geometry = mergeGeometries(geometries, false);
    geometry.computeBoundingBox();
    geometry.computeBoundingSphere();

    const mesh = new THREE.Mesh(
      geometry,
      new THREE.MeshStandardMaterial({
        color,
        flatShading: true,
        metalness: 0,
        roughness: 0.92,
      }),
    );
    mesh.castShadow = true;
    mesh.receiveShadow = true;
    mesh.name = `${name}-${color.toString(16)}`;
    group.add(mesh);
  }

  return group;
}

function createPineTree() {
  return createAsset("pine-tree", [
    cube([0, 1.5, 0], [0.7, 3, 0.7], COLORS.bark),
    cube([0, 2.7, 0], [2.8, 1.3, 2.8], COLORS.foliageDark),
    cube([0.5, 3.45, 0], [2.1, 1.1, 2.1], COLORS.foliageLight),
    cube([-0.25, 4.15, 0.2], [1.35, 1, 1.35], COLORS.foliageDark),
    cube([0, 4.75, 0], [0.7, 0.7, 0.7], COLORS.foliageLight),
  ]);
}

function createRoundRock() {
  return createAsset("round-rock", [
    cube([0, 0.45, 0], [2.4, 0.9, 1.8], COLORS.rockDark),
    cube([-0.55, 1.05, 0.1], [1.25, 0.9, 1.25], COLORS.rockLight),
    cube([0.65, 0.9, -0.15], [1.05, 0.75, 1.1], COLORS.rockDark),
    cube([0.05, 1.45, 0.2], [0.85, 0.5, 0.8], COLORS.rockLight),
  ]);
}

function createSoftCloud() {
  return createAsset("soft-cloud", [
    cube([-1.5, 0.55, 0], [2, 1.1, 1.35], COLORS.cloudShade),
    cube([0, 0.7, 0], [2.4, 1.4, 1.65], COLORS.cloudLight),
    cube([1.55, 0.55, 0], [1.7, 1.1, 1.25], COLORS.cloudShade),
    cube([-0.6, 1.35, 0], [1.35, 1.1, 1.2], COLORS.cloudLight),
    cube([0.65, 1.45, 0], [1.55, 1.25, 1.3], COLORS.cloudLight),
  ]);
}

function createForestObservatory() {
  return createAsset("forest-observatory", [
    cube([0, 0.25, 0], [5, 0.5, 5], COLORS.observatoryBase),
    cube([0, 0.75, 1.75], [3.2, 0.5, 1], COLORS.observatoryBase),
    cube([0, 1.65, 0], [3.2, 2.8, 3.2], COLORS.observatoryLight),
    cube([0, 3.15, 0], [3.6, 0.35, 3.6], COLORS.observatoryBase),
    cube([0, 3.55, 0], [3.2, 0.55, 3.2], COLORS.observatoryLight),
    cube([0, 4.05, 0], [2.4, 0.55, 2.4], COLORS.observatoryLight),
    cube([0, 4.5, 0], [1.5, 0.45, 1.5], COLORS.observatoryLight),
    cube([0, 2, 1.65], [1.25, 1.15, 0.2], COLORS.glass),
    cube([1.65, 2, 0], [0.2, 1.15, 1.25], COLORS.glass),
    cube([-1.65, 2, 0], [0.2, 1.15, 1.25], COLORS.glass),
    cube([0, 4.95, 0], [0.3, 0.7, 0.3], COLORS.observatoryAccent),
    cube(
      [0, 5.35, -0.25],
      [0.55, 0.55, 2.1],
      COLORS.observatoryBase,
      [Math.PI / 5, 0, 0],
    ),
    cube(
      [0, 5.75, -0.85],
      [0.85, 0.85, 0.35],
      COLORS.glass,
      [Math.PI / 5, 0, 0],
    ),
  ]);
}

export function createAssetLibrary() {
  return new Map([
    ["pine-tree", createPineTree()],
    ["round-rock", createRoundRock()],
    ["soft-cloud", createSoftCloud()],
    ["forest-observatory", createForestObservatory()],
  ]);
}
