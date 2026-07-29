import * as THREE from "three";
import { GLTFLoader } from "three/addons/loaders/GLTFLoader.js";
import { WORLD, heightAt } from "./world-data.js?v=world9";

const ASSET_ROOT = "/assets/blender/glb";

const ASSETS = Object.freeze({
  explorer: "01-explorer.glb",
  city: "02-cyan-tower.glb",
  desert: "03-automation-workshop.glb",
  snow: "04-relay-station.glb",
  coast: "05-lighthouse.glb",
  forest: "06-starlight-observatory.glb",
  pines: "07-pine-set.glb",
  houses: "08-house-set.glb",
  rocks: "09-rock-set.glb",
  cacti: "10-cactus-set.glb",
  reeds: "11-coast-vegetation.glb",
  buoys: "12-buoy-set.glb",
  plaza: "13-plaza-beacon-kit.glb",
  stories: "14-story-props.glb",
});

const LANDMARK_SCALE = Object.freeze({
  forest: 0.64,
  city: 0.62,
  desert: 0.64,
  snow: 0.64,
  coast: 0.64,
});

const DETAIL_PLACEMENTS = Object.freeze([
  { asset: "pines", prefix: "Pine_0_", tile: [-34, -19], scale: 0.48, rotation: 0.2 },
  { asset: "pines", prefix: "Pine_1_", tile: [-26, -19], scale: 0.46, rotation: -0.4 },
  { asset: "pines", prefix: "Pine_2_", tile: [-34, -12], scale: 0.43, rotation: 0.7 },
  { asset: "pines", prefix: "Pine_3_", tile: [-34, 13], scale: 0.46, rotation: 0.3 },
  { asset: "pines", prefix: "Pine_4_", tile: [-25, 19], scale: 0.48, rotation: -0.6 },
  { asset: "houses", prefix: "House_0_", tile: [0, -21], scale: 0.48, rotation: 0.1 },
  { asset: "houses", prefix: "House_1_", tile: [8, -21], scale: 0.46, rotation: -0.25 },
  { asset: "houses", prefix: "House_2_", tile: [20, 20], scale: 0.46, rotation: 0.3 },
  { asset: "houses", prefix: "House_3_", tile: [28, 20], scale: 0.46, rotation: -0.4 },
  { asset: "rocks", prefix: "Rock_0_", tile: [-33, -13], scale: 0.62, rotation: 0.3 },
  { asset: "rocks", prefix: "Rock_2_", tile: [-34, 20], scale: 0.58, rotation: -0.2 },
  { asset: "rocks", prefix: "Rock_4_", tile: [27, -10], scale: 0.54, rotation: 0.5 },
  { asset: "cacti", prefix: "Cactus_0_", tile: [26, -18], scale: 0.48, rotation: 0.2 },
  { asset: "cacti", prefix: "Cactus_2_", tile: [34, -17], scale: 0.46, rotation: -0.35 },
  { asset: "cacti", prefix: "Cactus_4_", tile: [35, -10], scale: 0.5, rotation: 0.4 },
  { asset: "reeds", prefix: "Reeds_0_", tile: [30, 20], scale: 0.44, rotation: 0.1 },
  { asset: "reeds", prefix: "Reeds_2_", tile: [31, 14], scale: 0.42, rotation: -0.3 },
  { asset: "buoys", prefix: "Buoy_0_", tile: [34, 18], scale: 0.5, rotation: 0.2 },
  { asset: "buoys", prefix: "Buoy_3_", tile: [35, 14], scale: 0.48, rotation: -0.2 },
  {
    asset: "stories",
    prefix: "Story_Forest_",
    tile: [-26, -14],
    scale: 0.4,
    rotation: 0.2,
  },
  {
    asset: "stories",
    prefix: "Story_City_",
    tile: [8, -16],
    scale: 0.4,
    rotation: -0.2,
  },
  {
    asset: "stories",
    prefix: "Story_Desert_",
    tile: [27, -17],
    scale: 0.4,
    rotation: 0.3,
  },
  {
    asset: "stories",
    prefix: "Story_Snow_",
    tile: [-26, 15],
    scale: 0.4,
    rotation: -0.25,
  },
  {
    asset: "stories",
    prefix: "Story_Coast_",
    tile: [28, 15],
    scale: 0.4,
    rotation: 0.15,
  },
]);

function setRenderQuality(root) {
  root.traverse((object) => {
    if (!object.isMesh) return;
    object.castShadow = true;
    object.receiveShadow = true;
  });
}

function groundAndCenter(root, scale) {
  root.scale.setScalar(scale);
  root.updateMatrixWorld(true);
  const bounds = new THREE.Box3().setFromObject(root);
  const center = bounds.getCenter(new THREE.Vector3());
  root.position.x -= center.x;
  root.position.y -= bounds.min.y;
  root.position.z -= center.z;
  root.updateMatrixWorld(true);
  return root;
}

function cloneSelection(source, prefixes, scale) {
  const selection = new THREE.Group();
  const matches = Array.isArray(prefixes) ? prefixes : [prefixes];
  source.children.forEach((object) => {
    if (matches.some((prefix) => object.name.startsWith(prefix))) {
      selection.add(object.clone(true));
    }
  });
  setRenderQuality(selection);
  return groundAndCenter(selection, scale);
}

function placeAtTile(object, tileX, tileZ, rotation = 0) {
  object.position.x += tileX * WORLD.tileSize;
  object.position.y += heightAt(tileX, tileZ);
  object.position.z += tileZ * WORLD.tileSize;
  object.rotation.y = rotation;
  return object;
}

function pivotChildren(joint, pivot, extraChildren = []) {
  const children = [...joint.children, ...extraChildren];
  children.forEach((child) => {
    child.position.sub(pivot);
    if (child.parent !== joint) joint.add(child);
  });
  joint.position.copy(pivot);
}

function installExplorer(explorer, source) {
  const visual = source.clone(true);
  const leftArm = visual.getObjectByName("Explorer_ArmJoint_L");
  const rightArm = visual.getObjectByName("Explorer_ArmJoint_R");
  const leftLeg = visual.getObjectByName("Explorer_LegJoint_L");
  const rightLeg = visual.getObjectByName("Explorer_LegJoint_R");

  pivotChildren(leftArm, new THREE.Vector3(-0.68, 1.94, 0));
  pivotChildren(rightArm, new THREE.Vector3(0.68, 1.94, 0));
  pivotChildren(
    leftLeg,
    new THREE.Vector3(-0.27, 1.12, 0),
    [visual.getObjectByName("Explorer_Boot_L")],
  );
  pivotChildren(
    rightLeg,
    new THREE.Vector3(0.27, 1.12, 0),
    [visual.getObjectByName("Explorer_Boot_R")],
  );

  setRenderQuality(visual);
  groundAndCenter(visual, 0.62);
  visual.name = "blender-explorer";
  explorer.clear();
  explorer.add(visual);
  explorer.userData.limbs = { leftArm, rightArm, leftLeg, rightLeg };
}

function installLandmarks(markers, loaded) {
  markers.forEach((marker, id) => {
    const visual = loaded[id].scene.clone(true);
    setRenderQuality(visual);
    groundAndCenter(visual, LANDMARK_SCALE[id]);
    visual.name = `blender-landmark-${id}`;
    marker.clear();
    marker.add(visual);
  });
}

function createDetailedProps(loaded) {
  const group = new THREE.Group();
  group.name = "blender-detailed-props";
  DETAIL_PLACEMENTS.forEach(({ asset, prefix, tile, scale, rotation }) => {
    const prop = cloneSelection(loaded[asset].scene, prefix, scale);
    prop.name = `${prefix.toLowerCase()}detail`;
    group.add(placeAtTile(prop, tile[0], tile[1], rotation));
  });

  const plaza = cloneSelection(
    loaded.plaza.scene,
    ["PlazaKit_", "Beacon_1_"],
    0.48,
  );
  plaza.name = "central-plaza-beacon-kit";
  group.add(placeAtTile(plaza, -5, 5, -0.2));
  return group;
}

export async function upgradePortfolioAssets({ explorer, markers }) {
  const loader = new GLTFLoader();
  const entries = await Promise.all(
    Object.entries(ASSETS).map(async ([key, filename]) => [
      key,
      await loader.loadAsync(`${ASSET_ROOT}/${filename}`),
    ]),
  );
  const loaded = Object.fromEntries(entries);
  installExplorer(explorer, loaded.explorer.scene);
  installLandmarks(markers, loaded);
  return createDetailedProps(loaded);
}
