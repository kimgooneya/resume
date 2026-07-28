import * as THREE from "three";
import {
  VILLAGES,
  WORLD,
  heightAt,
  isRoadAt,
  isWaterAt,
  tileKindAt,
} from "./world-data.js?v=world9";

function nearLandmark(x, z) {
  return VILLAGES.some(
    ({ position }) => Math.hypot(x - position.x, z - position.z) < 3.6,
  );
}

function finishBatch(mesh, hasColor = false) {
  mesh.instanceMatrix.needsUpdate = true;
  if (hasColor) mesh.instanceColor.needsUpdate = true;
  mesh.computeBoundingBox();
  mesh.computeBoundingSphere();
  mesh.castShadow = true;
  mesh.receiveShadow = true;
  return mesh;
}

function instanced(name, geometry, color, count, options = {}) {
  const mesh = new THREE.InstancedMesh(
    geometry,
    new THREE.MeshStandardMaterial({
      color,
      roughness: options.roughness ?? 0.9,
      metalness: options.metalness ?? 0,
    }),
    count,
  );
  mesh.name = name;
  return mesh;
}

function collectProps() {
  const props = {
    trees: [],
    houses: [],
    rocks: [],
    cacti: [],
    reeds: [],
    buoys: [],
  };
  for (let z = WORLD.minZ + 2; z < WORLD.maxZ - 1; z += 1) {
    for (let x = WORLD.minX + 2; x < WORLD.maxX - 1; x += 1) {
      const water = isWaterAt(x, z);
      const hash = Math.abs((x * 17 + z * 31 + x * z * 3) % 19);
      if (water) {
        const besideCoast = [
          [x + 1, z],
          [x - 1, z],
          [x, z + 1],
          [x, z - 1],
        ].some(([nextX, nextZ]) => !isWaterAt(nextX, nextZ) && tileKindAt(nextX, nextZ) === "coast");
        if (besideCoast && hash < 5 && !isRoadAt(x, z)) props.buoys.push({ x, z });
        continue;
      }
      if (isRoadAt(x, z) || nearLandmark(x, z)) continue;
      const kind = tileKindAt(x, z);
      if ((kind === "forest" || kind === "snow") && hash < 7) {
        props.trees.push({ x, z, kind });
      }
      if ((kind === "city" || kind === "coast") && hash < 4) {
        props.houses.push({ x, z, kind });
      }
      if ((kind === "forest" || kind === "snow" || kind === "desert") && hash >= 7 && hash < 10) {
        props.rocks.push({ x, z, kind });
      }
      if (kind === "desert" && hash < 5) props.cacti.push({ x, z });
      const besideWater =
        isWaterAt(x + 1, z) ||
        isWaterAt(x - 1, z) ||
        isWaterAt(x, z + 1) ||
        isWaterAt(x, z - 1);
      if (kind === "coast" && besideWater && hash < 10) props.reeds.push({ x, z });
    }
  }
  return props;
}

function addTrees(group, palette, trees) {
  const trunks = instanced(
    "tree-trunks",
    new THREE.BoxGeometry(0.18, 0.65, 0.18),
    palette.rail,
    trees.length,
  );
  const crowns = instanced(
    "tree-crowns",
    new THREE.ConeGeometry(0.42, 0.92, 4),
    palette["forest-deep"],
    trees.length,
  );
  const transform = new THREE.Object3D();
  trees.forEach(({ x, z, kind }, index) => {
    const y = heightAt(x, z);
    transform.position.set(x * WORLD.tileSize, y + 0.32, z * WORLD.tileSize);
    transform.rotation.set(0, Math.PI / 4, 0);
    transform.scale.set(1, 1, 1);
    transform.updateMatrix();
    trunks.setMatrixAt(index, transform.matrix);
    transform.position.y = y + 0.95;
    transform.scale.setScalar(kind === "snow" ? 0.9 : 1);
    transform.updateMatrix();
    crowns.setMatrixAt(index, transform.matrix);
    crowns.setColorAt(index, new THREE.Color(palette[kind === "snow" ? "ice" : "forest-deep"]));
  });
  group.add(finishBatch(trunks), finishBatch(crowns, true));
}

function addHouses(group, palette, houses) {
  const walls = instanced(
    "house-walls",
    new THREE.BoxGeometry(0.66, 1, 0.66),
    palette["building-light"],
    houses.length,
  );
  const roofs = instanced(
    "house-roofs",
    new THREE.ConeGeometry(0.56, 0.45, 4),
    palette.roof,
    houses.length,
  );
  const transform = new THREE.Object3D();
  houses.forEach(({ x, z, kind }, index) => {
    const y = heightAt(x, z);
    const wallHeight = 0.62 + (index % 3) * 0.14;
    transform.position.set(x * WORLD.tileSize, y + wallHeight / 2, z * WORLD.tileSize);
    transform.rotation.set(0, 0, 0);
    transform.scale.set(1, wallHeight, 1);
    transform.updateMatrix();
    walls.setMatrixAt(index, transform.matrix);
    walls.setColorAt(index, new THREE.Color(palette[kind === "coast" ? "coast" : "building-light"]));
    transform.position.y = y + wallHeight + 0.22;
    transform.rotation.set(0, Math.PI / 4, 0);
    transform.scale.set(1, 1, 1);
    transform.updateMatrix();
    roofs.setMatrixAt(index, transform.matrix);
  });
  group.add(finishBatch(walls, true), finishBatch(roofs));
}

function addBiomeDetails(group, palette, props) {
  const rocks = instanced(
    "biome-rocks",
    new THREE.DodecahedronGeometry(0.28, 0),
    palette["cliff-light"],
    props.rocks.length,
  );
  const cacti = instanced(
    "desert-cacti",
    new THREE.BoxGeometry(0.22, 0.85, 0.22),
    palette["forest-deep"],
    props.cacti.length,
  );
  const reeds = instanced(
    "coast-reeds",
    new THREE.BoxGeometry(0.08, 0.46, 0.08),
    palette["shore-foam"],
    props.reeds.length,
  );
  const buoys = instanced(
    "coast-buoys",
    new THREE.CylinderGeometry(0.12, 0.18, 0.42, 6),
    palette.warning,
    props.buoys.length,
  );
  const transform = new THREE.Object3D();
  const place = (items, mesh, yOffset, scale = 1) => {
    items.forEach(({ x, z }, index) => {
      transform.position.set(
        x * WORLD.tileSize,
        heightAt(x, z) + yOffset,
        z * WORLD.tileSize,
      );
      transform.rotation.set(0, ((x + z) % 4) * (Math.PI / 4), 0);
      transform.scale.setScalar(scale);
      transform.updateMatrix();
      mesh.setMatrixAt(index, transform.matrix);
    });
    finishBatch(mesh);
  };
  place(props.rocks, rocks, 0.18);
  place(props.cacti, cacti, 0.42);
  place(props.reeds, reeds, 0.22, 0.8);
  place(props.buoys, buoys, 0.24);
  group.add(rocks, cacti, reeds, buoys);
}

export function createTerrainDecor(palette) {
  const group = new THREE.Group();
  group.name = "terrain-decor";
  const props = collectProps();
  addTrees(group, palette, props.trees);
  addHouses(group, palette, props.houses);
  addBiomeDetails(group, palette, props);
  return group;
}
