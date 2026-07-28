import * as THREE from "three";
import { WORLD, heightAt, isWalkableAt } from "./world-data.js?v=world9";

function part(size, color, position) {
  const mesh = new THREE.Mesh(
    new THREE.BoxGeometry(...size),
    new THREE.MeshStandardMaterial({ color, roughness: 0.82 }),
  );
  mesh.position.set(...position);
  mesh.castShadow = true;
  return mesh;
}

export function createExplorer(palette) {
  const group = new THREE.Group();
  group.name = "voxel-explorer";
  const body = part([0.58, 0.72, 0.38], palette["accent-cyan"], [0, 0.94, 0]);
  const head = part([0.56, 0.56, 0.56], palette["explorer-skin"], [0, 1.58, 0]);
  const hair = part([0.6, 0.2, 0.6], palette["building-dark"], [0, 1.91, 0]);
  const leftArm = part([0.18, 0.62, 0.22], palette["explorer-skin"], [-0.42, 0.98, 0]);
  const rightArm = part([0.18, 0.62, 0.22], palette["explorer-skin"], [0.42, 0.98, 0]);
  const leftLeg = part([0.2, 0.58, 0.25], palette.roof, [-0.18, 0.35, 0]);
  const rightLeg = part([0.2, 0.58, 0.25], palette.roof, [0.18, 0.35, 0]);
  const face = new THREE.Group();
  face.name = "explorer-face";
  const leftEye = part([0.08, 0.09, 0.035], palette["building-dark"], [-0.13, 1.64, 0.295]);
  const rightEye = part([0.08, 0.09, 0.035], palette["building-dark"], [0.13, 1.64, 0.295]);
  face.add(leftEye, rightEye);
  const scarf = part([0.68, 0.16, 0.46], palette["explorer-scarf"], [0, 1.28, 0]);
  scarf.name = "explorer-scarf";
  const pack = part([0.46, 0.62, 0.2], palette["explorer-pack"], [0, 0.98, -0.3]);
  pack.name = "explorer-pack";
  const map = part([0.22, 0.28, 0.08], palette["accent-cyan"], [0.46, 0.95, 0.19]);
  map.name = "explorer-map";
  const shadow = new THREE.Mesh(
    new THREE.CircleGeometry(0.5, 16),
    new THREE.MeshBasicMaterial({
      color: palette["shadow-contact"],
      transparent: true,
      opacity: 0.35,
      depthWrite: false,
    }),
  );
  shadow.name = "explorer-shadow";
  shadow.rotation.x = -Math.PI / 2;
  shadow.position.y = 0.02;
  group.add(
    shadow,
    body,
    head,
    hair,
    face,
    scarf,
    pack,
    map,
    leftArm,
    rightArm,
    leftLeg,
    rightLeg,
  );
  group.position.set(3 * WORLD.tileSize, heightAt(3, 0), 0);
  group.userData.limbs = { leftArm, rightArm, leftLeg, rightLeg };
  group.userData.walkTime = 0;
  group.userData.arrivalTime = 0;
  return group;
}

export function moveExplorer(explorer, input, delta, reducedMotion) {
  const direction = new THREE.Vector2(input.x, input.z);
  if (direction.lengthSq() === 0) {
    const { rightArm } = explorer.userData.limbs;
    explorer.userData.arrivalTime = Math.max(0, explorer.userData.arrivalTime - delta);
    Object.values(explorer.userData.limbs).forEach((limb) => {
      limb.rotation.x *= 0.72;
      limb.rotation.z *= 0.72;
    });
    if (!reducedMotion && explorer.userData.arrivalTime > 0) {
      rightArm.rotation.z = -1.4 + Math.sin(explorer.userData.arrivalTime * 12) * 0.22;
    }
    return false;
  }

  explorer.userData.arrivalTime = 0;
  direction.normalize();
  const speed = 4.2;
  const nextX = explorer.position.x + direction.x * speed * delta;
  const nextZ = explorer.position.z + direction.y * speed * delta;
  if (isWalkableAt(nextX, explorer.position.z)) explorer.position.x = nextX;
  if (isWalkableAt(explorer.position.x, nextZ)) explorer.position.z = nextZ;

  const tileX = Math.round(explorer.position.x / WORLD.tileSize);
  const tileZ = Math.round(explorer.position.z / WORLD.tileSize);
  explorer.position.y = heightAt(tileX, tileZ) + 0.03;
  explorer.rotation.y = Math.atan2(direction.x, direction.y);
  explorer.userData.walkTime += delta * 10;

  if (!reducedMotion) {
    const swing = Math.sin(explorer.userData.walkTime) * 0.55;
    const { leftArm, rightArm, leftLeg, rightLeg } = explorer.userData.limbs;
    leftArm.rotation.x = swing;
    rightArm.rotation.x = -swing;
    leftLeg.rotation.x = -swing;
    rightLeg.rotation.x = swing;
  }
  return true;
}

export function celebrateArrival(explorer, target, reducedMotion) {
  const directionX = target.x - explorer.position.x;
  const directionZ = target.z - explorer.position.z;
  explorer.rotation.y = Math.atan2(directionX, directionZ);
  explorer.userData.arrivalTime = reducedMotion ? 0 : 1.2;
}

export function fastTravelExplorer(explorer, village) {
  const approachZ =
    village.position.z + (village.position.z > 0 ? -2 : 2);
  const worldX = village.position.x * WORLD.tileSize;
  const worldZ = approachZ * WORLD.tileSize;
  if (!isWalkableAt(worldX, worldZ)) return false;

  explorer.position.set(
    worldX,
    heightAt(village.position.x, approachZ) + 0.03,
    worldZ,
  );
  explorer.userData.walkTime = 0;
  explorer.userData.arrivalTime = 0;
  return true;
}
