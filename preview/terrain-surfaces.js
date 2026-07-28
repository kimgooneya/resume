import * as THREE from "three";
import {
  WORLD,
  heightAt,
  isWaterAt,
  tileKindAt,
} from "./world-data.js?v=world9";

const colorByKind = Object.freeze({
  water: "water-light",
  forest: "forest-deep",
  city: "city",
  desert: "sand",
  snow: "snow",
  coast: "coast",
  meadow: "meadow",
});

const neighbors = Object.freeze([
  { dx: 1, dz: 0, rotation: 0 },
  { dx: -1, dz: 0, rotation: 0 },
  { dx: 0, dz: 1, rotation: Math.PI / 2 },
  { dx: 0, dz: -1, rotation: Math.PI / 2 },
]);

function finishBatch(mesh, hasColor = false) {
  mesh.instanceMatrix.needsUpdate = true;
  if (hasColor) mesh.instanceColor.needsUpdate = true;
  mesh.computeBoundingBox();
  mesh.computeBoundingSphere();
  mesh.castShadow = true;
  mesh.receiveShadow = true;
  return mesh;
}

function createColumns(palette) {
  const baseOverlap = 0.12;
  const count =
    (WORLD.maxX - WORLD.minX + 1) * (WORLD.maxZ - WORLD.minZ + 1);
  const mesh = new THREE.InstancedMesh(
    new THREE.BoxGeometry(WORLD.tileSize * 1.005, 1, WORLD.tileSize * 1.005),
    new THREE.MeshBasicMaterial({ color: palette["text-primary"] }),
    count,
  );
  mesh.name = "terrain-columns";
  const transform = new THREE.Object3D();
  let index = 0;

  for (let z = WORLD.minZ; z <= WORLD.maxZ; z += 1) {
    for (let x = WORLD.minX; x <= WORLD.maxX; x += 1) {
      const height = heightAt(x, z);
      transform.position.set(
        x * WORLD.tileSize,
        (height - baseOverlap) / 2,
        z * WORLD.tileSize,
      );
      transform.scale.set(1, height + baseOverlap, 1);
      transform.updateMatrix();
      mesh.setMatrixAt(index, transform.matrix);
      mesh.setColorAt(
        index,
        new THREE.Color(palette[colorByKind[tileKindAt(x, z)]]),
      );
      index += 1;
    }
  }
  finishBatch(mesh, true);
  mesh.castShadow = false;
  mesh.receiveShadow = false;
  return mesh;
}

function createCaps(palette) {
  const count =
    (WORLD.maxX - WORLD.minX + 1) * (WORLD.maxZ - WORLD.minZ + 1);
  const mesh = new THREE.InstancedMesh(
    new THREE.BoxGeometry(WORLD.tileSize * 0.94, 0.08, WORLD.tileSize * 0.94),
    new THREE.MeshStandardMaterial({ color: palette["text-primary"], roughness: 0.86 }),
    count,
  );
  mesh.name = "terrain-caps";
  const transform = new THREE.Object3D();
  let index = 0;

  for (let z = WORLD.minZ; z <= WORLD.maxZ; z += 1) {
    for (let x = WORLD.minX; x <= WORLD.maxX; x += 1) {
      transform.position.set(
        x * WORLD.tileSize,
        heightAt(x, z) + 0.04,
        z * WORLD.tileSize,
      );
      transform.scale.set(1, 1, 1);
      transform.updateMatrix();
      mesh.setMatrixAt(index, transform.matrix);
      mesh.setColorAt(
        index,
        new THREE.Color(palette[colorByKind[tileKindAt(x, z)]]),
      );
      index += 1;
    }
  }
  return finishBatch(mesh, true);
}

function createCliffs(palette) {
  const faces = [];
  for (let z = WORLD.minZ; z <= WORLD.maxZ; z += 1) {
    for (let x = WORLD.minX; x <= WORLD.maxX; x += 1) {
      const height = heightAt(x, z);
      neighbors.forEach(({ dx, dz, rotation }) => {
        const neighborX = x + dx;
        const neighborZ = z + dz;
        const inside =
          neighborX >= WORLD.minX &&
          neighborX <= WORLD.maxX &&
          neighborZ >= WORLD.minZ &&
          neighborZ <= WORLD.maxZ;
        const coveredByFascia =
          !inside && (neighborX > WORLD.maxX || neighborZ > WORLD.maxZ);
        if (coveredByFascia) return;
        const lowerHeight = inside ? heightAt(neighborX, neighborZ) : 0;
        if (height - lowerHeight < 0.12) return;
        faces.push({ x, z, dx, dz, rotation, height, lowerHeight });
      });
    }
  }
  const mesh = new THREE.InstancedMesh(
    new THREE.BoxGeometry(0.08, 1, WORLD.tileSize * 1.01),
    new THREE.MeshBasicMaterial({ color: palette["cliff-light"] }),
    faces.length,
  );
  mesh.name = "terrain-cliffs";
  const transform = new THREE.Object3D();
  faces.forEach((face, index) => {
    const difference = face.height - face.lowerHeight;
    transform.position.set(
      (face.x + face.dx * 0.55) * WORLD.tileSize,
      face.lowerHeight + difference / 2,
      (face.z + face.dz * 0.55) * WORLD.tileSize,
    );
    transform.rotation.set(0, face.rotation, 0);
    transform.scale.set(1, difference, 1);
    transform.updateMatrix();
    mesh.setMatrixAt(index, transform.matrix);
  });
  finishBatch(mesh);
  mesh.castShadow = false;
  mesh.receiveShadow = false;
  return mesh;
}

function createShoreFoam(palette) {
  const edges = [];
  for (let z = WORLD.minZ; z <= WORLD.maxZ; z += 1) {
    for (let x = WORLD.minX; x <= WORLD.maxX; x += 1) {
      if (!isWaterAt(x, z)) continue;
      neighbors.forEach(({ dx, dz, rotation }) => {
        if (!isWaterAt(x + dx, z + dz)) edges.push({ x, z, dx, dz, rotation });
      });
    }
  }
  const mesh = new THREE.InstancedMesh(
    new THREE.BoxGeometry(0.12, 0.025, WORLD.tileSize * 0.74),
    new THREE.MeshStandardMaterial({
      color: palette["shore-foam"],
      roughness: 0.5,
      transparent: true,
      opacity: 0.86,
    }),
    edges.length,
  );
  mesh.name = "shore-foam";
  const transform = new THREE.Object3D();
  edges.forEach(({ x, z, dx, dz, rotation }, index) => {
    transform.position.set(
      (x + dx * 0.43) * WORLD.tileSize,
      heightAt(x, z) + 0.095,
      (z + dz * 0.43) * WORLD.tileSize,
    );
    transform.rotation.set(0, rotation, 0);
    transform.scale.set(1, 1, 1);
    transform.updateMatrix();
    mesh.setMatrixAt(index, transform.matrix);
  });
  return finishBatch(mesh);
}

function createFrontFascia(palette) {
  const group = new THREE.Group();
  group.name = "terrain-front-fascia";
  const z = WORLD.maxZ;
  let runStart = WORLD.minX;
  let runHeight = heightAt(runStart, z);
  let runWater = isWaterAt(runStart, z);

  const addRun = (runEnd) => {
    const tileCount = runEnd - runStart + 1;
    const mesh = new THREE.Mesh(
      new THREE.BoxGeometry(tileCount * WORLD.tileSize + 0.01, runHeight, 0.14),
      new THREE.MeshBasicMaterial({
        color: palette[runWater ? "water-deep" : "cliff-light"],
      }),
    );
    mesh.position.set(
      ((runStart + runEnd) * WORLD.tileSize) / 2,
      runHeight / 2,
      (z + 0.58) * WORLD.tileSize,
    );
    group.add(mesh);
  };

  for (let x = WORLD.minX + 1; x <= WORLD.maxX; x += 1) {
    const height = heightAt(x, z);
    const water = isWaterAt(x, z);
    if (height === runHeight && water === runWater) continue;
    addRun(x - 1);
    runStart = x;
    runHeight = height;
    runWater = water;
  }
  addRun(WORLD.maxX);
  return group;
}

function createRightFascia(palette) {
  const group = new THREE.Group();
  group.name = "terrain-right-fascia";
  const x = WORLD.maxX;
  let runStart = WORLD.minZ;
  let runHeight = heightAt(x, runStart);
  let runWater = isWaterAt(x, runStart);

  const addRun = (runEnd) => {
    const tileCount = runEnd - runStart + 1;
    const mesh = new THREE.Mesh(
      new THREE.BoxGeometry(0.14, runHeight, tileCount * WORLD.tileSize + 0.01),
      new THREE.MeshBasicMaterial({
        color: palette[runWater ? "water-deep" : "cliff-light"],
      }),
    );
    mesh.position.set(
      (x + 0.58) * WORLD.tileSize,
      runHeight / 2,
      ((runStart + runEnd) * WORLD.tileSize) / 2,
    );
    group.add(mesh);
  };

  for (let z = WORLD.minZ + 1; z <= WORLD.maxZ; z += 1) {
    const height = heightAt(x, z);
    const water = isWaterAt(x, z);
    if (height === runHeight && water === runWater) continue;
    addRun(z - 1);
    runStart = z;
    runHeight = height;
    runWater = water;
  }
  addRun(WORLD.maxZ);
  return group;
}

function createRemainingFascias(palette) {
  const group = new THREE.Group();
  group.name = "terrain-remaining-fascias";
  const width = (WORLD.maxX - WORLD.minX + 1) * WORLD.tileSize + 0.01;
  const depth = (WORLD.maxZ - WORLD.minZ + 1) * WORLD.tileSize + 0.01;
  const material = new THREE.MeshBasicMaterial({
    color: palette["cliff-light"],
  });
  const back = new THREE.Mesh(
    new THREE.BoxGeometry(width, 0.78, 0.14),
    material,
  );
  back.position.set(
    ((WORLD.minX + WORLD.maxX) * WORLD.tileSize) / 2,
    0.39,
    (WORLD.minZ - 0.58) * WORLD.tileSize,
  );
  const left = new THREE.Mesh(
    new THREE.BoxGeometry(0.14, 0.78, depth),
    material,
  );
  left.position.set(
    (WORLD.minX - 0.58) * WORLD.tileSize,
    0.39,
    ((WORLD.minZ + WORLD.maxZ) * WORLD.tileSize) / 2,
  );
  group.add(back, left);
  return group;
}

export function createTerrainSurfaces(palette) {
  const group = new THREE.Group();
  group.name = "terrain-surfaces";
  const width = (WORLD.maxX - WORLD.minX + 1) * WORLD.tileSize + 1.14;
  const depth = (WORLD.maxZ - WORLD.minZ + 1) * WORLD.tileSize + 0.9;
  const base = new THREE.Mesh(
    new THREE.BoxGeometry(width, 0.8, depth),
    new THREE.MeshStandardMaterial({ color: palette["space-core"], roughness: 0.94 }),
  );
  base.name = "terrain-base";
  base.position.set(
    ((WORLD.minX + WORLD.maxX) * WORLD.tileSize) / 2,
    -0.42,
    ((WORLD.minZ + WORLD.maxZ) * WORLD.tileSize) / 2,
  );
  base.receiveShadow = true;
  group.add(
    base,
    createColumns(palette),
    createCaps(palette),
    createCliffs(palette),
    createShoreFoam(palette),
    createFrontFascia(palette),
    createRightFascia(palette),
    createRemainingFascias(palette),
  );
  return group;
}
