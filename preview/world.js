import * as THREE from "three";
import { createWorldEffects } from "./effects.js?v=world2-intro5";
import { createExplorer } from "./explorer.js?v=world2-intro5";
import { createLandmarks } from "./landmarks.js?v=world2-intro5";
import { createTerrain } from "./terrain.js?v=world2-intro64";

export function createPortfolioWorld(palette) {
  const group = new THREE.Group();
  const terrain = createTerrain(palette);
  const landmarks = createLandmarks(palette);
  const explorer = createExplorer(palette);
  const effects = createWorldEffects(palette);
  group.add(terrain, landmarks.group, effects.group, explorer);
  return {
    group,
    explorer,
    hitAreas: landmarks.hitAreas,
    markers: landmarks.markers,
    effects,
  };
}

export function createStarField(palette) {
  const group = new THREE.Group();
  group.name = "star-field";
  [0, 1].forEach((layer) => {
    const count = layer === 0 ? 220 : 90;
    const positions = new Float32Array(count * 3);
    for (let index = 0; index < count; index += 1) {
      const angle = index * 2.3999632297 + layer * 0.8;
      const radius = 52 + layer * 22 + (index % 17);
      positions[index * 3] = Math.cos(angle) * radius;
      positions[index * 3 + 1] = 12 + (index % 13) * (1.6 + layer * 0.4);
      positions[index * 3 + 2] = Math.sin(angle) * radius;
    }
    const geometry = new THREE.BufferGeometry();
    geometry.setAttribute("position", new THREE.BufferAttribute(positions, 3));
    const stars = new THREE.Points(
      geometry,
      new THREE.PointsMaterial({
        color: palette[layer === 0 ? "text-primary" : "accent-cyan"],
        size: layer === 0 ? 0.07 : 0.11,
        transparent: true,
        opacity: layer === 0 ? 0.62 : 0.34,
      }),
    );
    stars.name = `star-layer-${layer + 1}`;
    group.add(stars);
  });
  return group;
}
