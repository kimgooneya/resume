import * as THREE from "three";
import {
  WORLD,
  heightAt,
  isRoadAt,
  isWaterAt,
} from "./world-data.js?v=world9";

function finishBatch(mesh) {
  mesh.instanceMatrix.needsUpdate = true;
  mesh.computeBoundingBox();
  mesh.computeBoundingSphere();
  mesh.castShadow = true;
  mesh.receiveShadow = true;
  return mesh;
}

function roadAxisAt(x, z) {
  return isRoadAt(x - 1, z) || isRoadAt(x + 1, z) ? "x" : "z";
}

function roadCells() {
  const cells = [];
  for (let z = WORLD.minZ; z <= WORLD.maxZ; z += 1) {
    for (let x = WORLD.minX; x <= WORLD.maxX; x += 1) {
      if (isRoadAt(x, z)) cells.push({ x, z, axis: roadAxisAt(x, z) });
    }
  }
  return cells;
}

function addRoads(group, palette) {
  const cells = roadCells();
  const decks = new THREE.InstancedMesh(
    new THREE.BoxGeometry(WORLD.tileSize * 1.01, 0.09, WORLD.tileSize * 1.01),
    new THREE.MeshStandardMaterial({ color: palette.road, roughness: 0.94 }),
    cells.length,
  );
  decks.name = "road-decks";
  const marked = cells.filter(({ x, z, axis }) => (axis === "x" ? x : z) % 2 === 0);
  const markings = new THREE.InstancedMesh(
    new THREE.BoxGeometry(WORLD.tileSize * 0.38, 0.018, 0.055),
    new THREE.MeshStandardMaterial({
      color: palette["road-marking"],
      roughness: 0.82,
    }),
    marked.length,
  );
  markings.name = "road-markings";
  const bridgeCells = cells.filter(({ x, z }) => isWaterAt(x, z));
  const supports = new THREE.InstancedMesh(
    new THREE.BoxGeometry(0.12, 1, 0.12),
    new THREE.MeshStandardMaterial({ color: palette["soil-mid"], roughness: 0.98 }),
    bridgeCells.length * 2,
  );
  supports.name = "road-bridge-supports";
  const transform = new THREE.Object3D();

  cells.forEach(({ x, z }, index) => {
    transform.position.set(x * WORLD.tileSize, heightAt(x, z) + 0.085, z * WORLD.tileSize);
    transform.rotation.set(0, 0, 0);
    transform.scale.set(1, 1, 1);
    transform.updateMatrix();
    decks.setMatrixAt(index, transform.matrix);
  });
  marked.forEach(({ x, z, axis }, index) => {
    transform.position.set(x * WORLD.tileSize, heightAt(x, z) + 0.142, z * WORLD.tileSize);
    transform.rotation.set(0, axis === "x" ? 0 : Math.PI / 2, 0);
    transform.updateMatrix();
    markings.setMatrixAt(index, transform.matrix);
  });
  bridgeCells.forEach(({ x, z, axis }, index) => {
    const y = heightAt(x, z);
    for (let side = -1; side <= 1; side += 2) {
      const offsetX = axis === "x" ? 0 : side * 0.24;
      const offsetZ = axis === "x" ? side * 0.24 : 0;
      transform.position.set(
        x * WORLD.tileSize + offsetX,
        y / 2,
        z * WORLD.tileSize + offsetZ,
      );
      transform.rotation.set(0, 0, 0);
      transform.scale.set(1, y, 1);
      transform.updateMatrix();
      supports.setMatrixAt(index * 2 + (side + 1) / 2, transform.matrix);
    }
  });
  group.add(finishBatch(decks), finishBatch(markings), finishBatch(supports));
}

function railCells() {
  const cells = [];
  for (let x = WORLD.minX + 2; x < WORLD.maxX - 3; x += 1) {
    const z = Math.round(x * 0.22 + 3);
    if (!isWaterAt(x, z) || x < 6) cells.push({ x, z, water: isWaterAt(x, z) });
  }
  return cells;
}

function addRail(group, palette) {
  const cells = railCells();
  const angle = -0.22;
  const sleepers = new THREE.InstancedMesh(
    new THREE.BoxGeometry(0.18, 0.07, WORLD.tileSize * 0.92),
    new THREE.MeshStandardMaterial({ color: palette.rail, roughness: 0.94 }),
    cells.length,
  );
  sleepers.name = "rail-sleepers";
  const railGeometry = new THREE.BoxGeometry(WORLD.tileSize * 1.08, 0.08, 0.075);
  const railMaterial = new THREE.MeshStandardMaterial({
    color: palette["rail-metal"],
    roughness: 0.48,
    metalness: 0.62,
  });
  const left = new THREE.InstancedMesh(railGeometry, railMaterial, cells.length);
  const right = new THREE.InstancedMesh(railGeometry, railMaterial, cells.length);
  left.name = "rail-left";
  right.name = "rail-right";
  const waterCells = cells.filter(({ water }) => water);
  const supports = new THREE.InstancedMesh(
    new THREE.BoxGeometry(0.12, 1, 0.12),
    new THREE.MeshStandardMaterial({ color: palette.rail, roughness: 0.96 }),
    waterCells.length * 2,
  );
  supports.name = "rail-bridge-supports";
  const transform = new THREE.Object3D();
  const gaugeX = Math.sin(angle) * 0.22;
  const gaugeZ = Math.cos(angle) * 0.22;

  cells.forEach(({ x, z, water }, index) => {
    const y = water ? 0.82 : heightAt(x, z) + 0.12;
    transform.position.set(x * WORLD.tileSize, y, z * WORLD.tileSize);
    transform.rotation.set(0, angle + Math.PI / 2, 0);
    transform.scale.set(1, 1, 1);
    transform.updateMatrix();
    sleepers.setMatrixAt(index, transform.matrix);

    transform.rotation.set(0, angle, 0);
    transform.position.set(x * WORLD.tileSize + gaugeX, y + 0.07, z * WORLD.tileSize + gaugeZ);
    transform.updateMatrix();
    left.setMatrixAt(index, transform.matrix);
    transform.position.set(x * WORLD.tileSize - gaugeX, y + 0.07, z * WORLD.tileSize - gaugeZ);
    transform.updateMatrix();
    right.setMatrixAt(index, transform.matrix);
  });
  waterCells.forEach(({ x, z }, index) => {
    for (let side = -1; side <= 1; side += 2) {
      transform.position.set(
        x * WORLD.tileSize + side * 0.24,
        0.39,
        z * WORLD.tileSize,
      );
      transform.rotation.set(0, 0, 0);
      transform.scale.set(1, 0.78, 1);
      transform.updateMatrix();
      supports.setMatrixAt(index * 2 + (side + 1) / 2, transform.matrix);
    }
  });
  group.add(
    finishBatch(sleepers),
    finishBatch(left),
    finishBatch(right),
    finishBatch(supports),
  );
}

export function createTerrainRoutes(palette) {
  const group = new THREE.Group();
  group.name = "terrain-routes";
  addRoads(group, palette);
  addRail(group, palette);
  return group;
}
