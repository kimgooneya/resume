import * as THREE from "three";
import { createTerrainDecor } from "./terrain-decor.js?v=world2-intro8";
import { createTerrainRoutes } from "./terrain-routes.js?v=world2-intro5";
import { createTerrainSurfaces } from "./terrain-surfaces.js?v=world2-intro64";

export function createTerrain(palette) {
  const group = new THREE.Group();
  group.name = "terrain";
  group.add(
    createTerrainSurfaces(palette),
    createTerrainRoutes(palette),
    createTerrainDecor(palette),
  );
  return group;
}
