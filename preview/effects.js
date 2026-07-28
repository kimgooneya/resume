import * as THREE from "three";
import { WORLD, tileKindAt } from "./world-data.js?v=world9";

const particleColor = Object.freeze({
  water: "shore-foam",
  forest: "meadow",
  city: "rail-metal",
  desert: "sand",
  snow: "snow",
  coast: "shore-foam",
  meadow: "meadow",
});

export function createWorldEffects(palette) {
  const group = new THREE.Group();
  group.name = "world-effects";
  const capacity = 36;
  const particles = new THREE.InstancedMesh(
    new THREE.BoxGeometry(0.09, 0.05, 0.09),
    new THREE.MeshBasicMaterial({
      color: palette["text-primary"],
      transparent: true,
      opacity: 0.72,
      depthWrite: false,
    }),
    capacity,
  );
  particles.name = "terrain-footsteps";
  particles.instanceMatrix.setUsage(THREE.DynamicDrawUsage);
  const ages = new Float32Array(capacity);
  const positions = Array.from({ length: capacity }, () => new THREE.Vector3());
  const transform = new THREE.Object3D();
  for (let index = 0; index < capacity; index += 1) {
    transform.scale.setScalar(0);
    transform.updateMatrix();
    particles.setMatrixAt(index, transform.matrix);
    particles.setColorAt(index, new THREE.Color(palette.meadow));
  }
  particles.instanceMatrix.needsUpdate = true;
  particles.instanceColor.needsUpdate = true;

  const arrivalMaterial = new THREE.MeshBasicMaterial({
    color: palette.beacon,
    transparent: true,
    opacity: 0,
    depthWrite: false,
    blending: THREE.AdditiveBlending,
  });
  const arrival = new THREE.Mesh(
    new THREE.RingGeometry(0.45, 0.56, 24),
    arrivalMaterial,
  );
  arrival.name = "arrival-ring";
  arrival.rotation.x = -Math.PI / 2;
  arrival.visible = false;
  group.add(particles, arrival);

  let cursor = 0;
  let stepCooldown = 0;
  let arrivalTime = 0;

  function emitStep(position) {
    if (stepCooldown > 0) return;
    const tileX = Math.round(position.x / WORLD.tileSize);
    const tileZ = Math.round(position.z / WORLD.tileSize);
    const kind = tileKindAt(tileX, tileZ);
    ages[cursor] = 0.5;
    positions[cursor].set(
      position.x + ((cursor % 2) * 2 - 1) * 0.16,
      position.y + 0.06,
      position.z,
    );
    particles.setColorAt(cursor, new THREE.Color(palette[particleColor[kind]]));
    particles.instanceColor.needsUpdate = true;
    cursor = (cursor + 1) % capacity;
    stepCooldown = 0.12;
  }

  function celebrate(position) {
    arrival.position.set(position.x, position.y + 0.08, position.z);
    arrival.scale.setScalar(1);
    arrivalMaterial.opacity = 0.72;
    arrival.visible = true;
    arrivalTime = 0.8;
  }

  function update(delta, reducedMotion) {
    stepCooldown = Math.max(0, stepCooldown - delta);
    let changed = false;
    for (let index = 0; index < capacity; index += 1) {
      if (ages[index] <= 0) continue;
      ages[index] = Math.max(0, ages[index] - delta);
      const life = ages[index] / 0.5;
      transform.position.copy(positions[index]);
      transform.rotation.set(0, 0, 0);
      transform.scale.setScalar(reducedMotion ? 0 : life);
      transform.updateMatrix();
      particles.setMatrixAt(index, transform.matrix);
      changed = true;
    }
    if (changed) particles.instanceMatrix.needsUpdate = true;

    if (arrivalTime <= 0) return;
    arrivalTime = Math.max(0, arrivalTime - delta);
    if (reducedMotion || arrivalTime === 0) {
      arrival.visible = false;
      arrivalMaterial.opacity = 0;
      return;
    }
    const progress = 1 - arrivalTime / 0.8;
    arrival.scale.setScalar(1 + progress * 2.4);
    arrivalMaterial.opacity = (1 - progress) * 0.72;
  }

  return { group, emitStep, celebrate, update };
}
