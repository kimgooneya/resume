import * as THREE from "three";
import { VILLAGES, WORLD, heightAt } from "./world-data.js?v=world9";

function material(color, options = {}) {
  return new THREE.MeshStandardMaterial({
    color,
    roughness: options.roughness ?? 0.78,
    metalness: options.metalness ?? 0,
    emissive: options.emissive ?? color,
    emissiveIntensity: options.emissiveIntensity ?? 0,
    transparent: options.transparent ?? false,
    opacity: options.opacity ?? 1,
  });
}

function block(size, color, position) {
  const mesh = new THREE.Mesh(new THREE.BoxGeometry(...size), material(color));
  mesh.position.set(...position);
  mesh.castShadow = true;
  mesh.receiveShadow = true;
  return mesh;
}

function cylinder(radiusTop, radiusBottom, height, color, y, segments = 8) {
  const mesh = new THREE.Mesh(
    new THREE.CylinderGeometry(radiusTop, radiusBottom, height, segments),
    material(color),
  );
  mesh.position.y = y;
  mesh.castShadow = true;
  mesh.receiveShadow = true;
  return mesh;
}

function createPlaza(palette, accent) {
  const group = new THREE.Group();
  group.add(
    block([3.8, 0.18, 3.8], palette["soil-mid"], [0, 0.09, 0]),
    block([3.2, 0.16, 3.2], palette["building-light"], [0, 0.25, 0]),
    block([1.2, 0.14, 0.62], accent, [0, 0.4, 1.75]),
  );
  [
    [-1.35, -1.35],
    [1.35, -1.35],
    [-1.35, 1.35],
    [1.35, 1.35],
  ].forEach(([x, z]) => {
    group.add(
      block([0.12, 0.72, 0.12], palette["building-dark"], [x, 0.65, z]),
      block([0.22, 0.18, 0.22], palette.beacon, [x, 1.08, z]),
    );
  });
  const shadow = new THREE.Mesh(
    new THREE.CircleGeometry(1.7, 24),
    new THREE.MeshBasicMaterial({
      color: palette["shadow-contact"],
      transparent: true,
      opacity: 0.7,
      depthWrite: false,
    }),
  );
  shadow.rotation.x = -Math.PI / 2;
  shadow.position.y = 0.43;
  group.add(shadow);
  return group;
}

function createObservatory(palette) {
  const group = new THREE.Group();
  group.add(
    createPlaza(palette, palette["forest-deep"]),
    block([2.6, 0.32, 2.4], palette.roof, [0, 0.58, 0]),
    block([2.3, 1.05, 2.05], palette["building-light"], [0, 1.24, 0]),
    block([0.52, 0.52, 0.52], palette["accent-cyan"], [-1.35, 0.72, -0.8]),
    block([0.34, 0.34, 0.34], palette.beacon, [-1.35, 1.15, -0.8]),
  );
  const dome = new THREE.Mesh(
    new THREE.SphereGeometry(0.88, 12, 8, 0, Math.PI * 2, 0, Math.PI / 2),
    material(palette.roof),
  );
  dome.position.y = 1.76;
  dome.castShadow = true;
  const scope = block([0.32, 0.32, 1.7], palette["building-dark"], [0.42, 2.26, 0.3]);
  scope.rotation.x = -0.6;
  group.add(dome, scope);
  return group;
}

function createTower(palette) {
  const group = new THREE.Group();
  group.add(
    createPlaza(palette, palette.city),
    block([2.3, 0.7, 2.3], palette["building-dark"], [0, 0.78, 0]),
    block([1.72, 1.55, 1.72], palette["building-light"], [0, 1.9, 0]),
    block([1.35, 1.15, 1.35], palette.city, [0, 3.25, 0]),
    block([0.95, 0.9, 0.95], palette["accent-cyan"], [0, 4.25, 0]),
    block([0.14, 1.45, 0.14], palette.beacon, [0, 5.4, 0]),
  );
  [-0.88, 0, 0.88].forEach((yOffset) => {
    group.add(
      block([1.78, 0.12, 0.08], palette.beacon, [0, 1.9 + yOffset, 0.9]),
      block([0.08, 0.12, 1.78], palette.beacon, [0.9, 1.9 + yOffset, 0]),
    );
  });
  return group;
}

function createWorkshop(palette) {
  const group = new THREE.Group();
  group.add(
    createPlaza(palette, palette.sand),
    block([2.8, 1.25, 2.25], palette["building-light"], [0, 1.03, 0]),
    block([3.05, 0.34, 2.5], palette.warning, [0, 1.78, 0]),
    block([0.58, 1.7, 0.58], palette["building-dark"], [-0.82, 2.48, 0]),
    cylinder(0.56, 0.56, 1.35, palette["water-deep"], 1.45),
    block([0.18, 2.4, 0.18], palette["building-dark"], [1.55, 1.62, -0.8]),
    block([1.35, 0.16, 0.16], palette.warning, [0.95, 2.76, -0.8]),
  );
  const gear = new THREE.Mesh(
    new THREE.TorusGeometry(0.45, 0.14, 6, 8),
    material(palette["rail-metal"], { metalness: 0.5 }),
  );
  gear.position.set(-0.78, 2.9, 0.1);
  gear.rotation.y = Math.PI / 2;
  gear.castShadow = true;
  group.add(gear);
  return group;
}

function createRelay(palette) {
  const group = new THREE.Group();
  group.add(
    createPlaza(palette, palette.ice),
    block([2.45, 1.25, 2.25], palette["building-light"], [0, 1.02, 0]),
    block([1.3, 0.48, 0.72], palette["building-dark"], [-0.5, 1.88, 0.45]),
    block([0.68, 0.5, 0.68], palette["accent-cyan"], [1.28, 0.72, -0.9]),
  );
  const mast = block([0.24, 3.65, 0.24], palette.warning, [0, 3.1, 0]);
  group.add(
    block([0.32, 0.46, 0.32], palette["building-light"], [0, 2.25, 0]),
    block([0.32, 0.46, 0.32], palette["building-light"], [0, 3.18, 0]),
    block([0.32, 0.46, 0.32], palette["building-light"], [0, 4.1, 0]),
  );
  const dish = new THREE.Mesh(
    new THREE.CylinderGeometry(0.1, 0.9, 0.28, 12, 1, false, 0, Math.PI),
    material(palette.ice),
  );
  dish.position.set(0.18, 4.0, 0);
  dish.rotation.z = -0.45;
  group.add(mast, dish);
  return group;
}

function createLighthouse(palette) {
  const group = new THREE.Group();
  group.add(
    createPlaza(palette, palette.coast),
    block([1.0, 0.22, 3.6], palette.rail, [1.7, 0.54, 0.9]),
    block([0.58, 0.4, 1.15], palette.roof, [1.72, 0.82, 1.45]),
  );
  const tower = new THREE.Mesh(
    new THREE.CylinderGeometry(0.62, 0.95, 3.5, 8),
    material(palette["building-light"]),
  );
  tower.position.y = 2.15;
  tower.castShadow = true;
  const stripe = cylinder(0.76, 0.84, 0.55, palette.warning, 2.15);
  const balcony = cylinder(0.95, 0.95, 0.14, palette["building-dark"], 3.96);
  const lamp = block([1.18, 0.78, 1.18], palette.beacon, [0, 4.42, 0]);
  const roof = new THREE.Mesh(
    new THREE.ConeGeometry(0.9, 0.7, 8),
    material(palette.roof),
  );
  roof.position.y = 5.12;
  roof.castShadow = true;
  group.add(tower, stripe, balcony, lamp, roof);
  return group;
}

const landmarkFactories = {
  forest: createObservatory,
  city: createTower,
  desert: createWorkshop,
  snow: createRelay,
  coast: createLighthouse,
};

export function createLandmarks(palette) {
  const group = new THREE.Group();
  const hitAreas = [];
  const markers = new Map();

  VILLAGES.forEach((village) => {
    const marker = landmarkFactories[village.id](palette);
    marker.position.set(
      village.position.x * WORLD.tileSize,
      heightAt(village.position.x, village.position.z),
      village.position.z * WORLD.tileSize,
    );
    marker.userData.villageId = village.id;

    const beacon = new THREE.Mesh(
      new THREE.OctahedronGeometry(0.24),
      material(palette.beacon, {
        emissive: palette.beacon,
        emissiveIntensity: 1.6,
        roughness: 0.28,
      }),
    );
    beacon.position.y = village.id === "city" ? 5.8 : 4.8;
    marker.add(beacon);

    const halo = new THREE.Mesh(
      new THREE.RingGeometry(0.3, 0.56, 24),
      new THREE.MeshBasicMaterial({
        color: palette.beacon,
        transparent: true,
        opacity: 0.28,
        depthWrite: false,
        blending: THREE.AdditiveBlending,
      }),
    );
    halo.position.y = 0.5;
    halo.rotation.x = -Math.PI / 2;
    marker.add(halo);

    const hitArea = new THREE.Mesh(
      new THREE.BoxGeometry(3.3, 6, 3.3),
      new THREE.MeshBasicMaterial({ transparent: true, opacity: 0 }),
    );
    hitArea.position.copy(marker.position);
    hitArea.position.y += 2.5;
    hitArea.userData.villageId = village.id;
    hitAreas.push(hitArea);
    markers.set(village.id, marker);
    group.add(marker, hitArea);
  });

  return { group, hitAreas, markers };
}
