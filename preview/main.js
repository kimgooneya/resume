import * as THREE from "three";
import { MapControls } from "three/addons/controls/MapControls.js";
import { createZoomController } from "./camera-zoom.js?v=world2-intro5";
import { celebrateArrival, fastTravelExplorer, moveExplorer } from "./explorer.js?v=fast-travel1";
import { createHud } from "./hud.js?v=fast-travel1";
import { createMovementController } from "./movement-controller.js?v=touch-stick1";
import { loadProjects } from "./project-content.js?v=world2-intro5";
import { createProjectDialog } from "./project-dialog.js?v=world2-intro5";
import { readPalette } from "./theme.js";
import { createStage } from "./stage.js?v=world2-intro15";
import { VILLAGES, WORLD } from "./world-data.js?v=world9";
import { createPortfolioWorld, createStarField } from "./world.js?v=blender-p1-1";

const palette = readPalette();
const projects = await loadProjects();

const shell = document.querySelector("#world-canvas");
const loading = document.querySelector("#loading");
const introTrigger = document.querySelector("#intro-trigger");
const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
const { camera, renderer, scene } = createStage(palette, shell);

const world = await createPortfolioWorld(palette);
scene.add(world.group, createStarField(palette));

const controls = new MapControls(camera, renderer.domElement);
controls.enableDamping = true;
controls.dampingFactor = 0.08;
controls.enablePan = false;
controls.enableRotate = false;
controls.minZoom = 0.68;
controls.maxZoom = 3.2;
controls.zoomToCursor = true;

const raycaster = new THREE.Raycaster();
const pointer = new THREE.Vector2();
let activeDestination = null;
let nearbyVillage = null;
let hoveredDestination = null;
let travelViewEntered = false;
const zoom = createZoomController(1);
const discoveredVillages = new Set();
const projectDialog = createProjectDialog();
const hud = createHud(
  VILLAGES,
  setDestination,
  openNearbyIntroduction,
  fastTravelToDestination,
);
const movement = createMovementController(
  document.querySelector("#movement-stick"),
  {
    isEnabled: () => !projectDialog.isOpen(),
    onStart: enterTravelView,
    onPulse: pulseMovement,
  },
);

function setDestination(id) {
  activeDestination = VILLAGES.find((village) => village.id === id) ?? null;
  hud.setActive(id);
  if (activeDestination?.id === nearbyVillage?.id) {
    hud.arrive(activeDestination, projects[activeDestination.id]);
  } else if (activeDestination) {
    hud.select(activeDestination, projects[activeDestination.id]);
  }
  updateMarkerScales();
  updateJourneyStatus();
}

function updateMarkerScales() {
  world.markers.forEach((marker, markerId) => {
    let scale = 1;
    if (markerId === activeDestination?.id) scale = 1.08;
    else if (markerId === hoveredDestination) scale = 1.04;
    marker.scale.setScalar(scale);
  });
}

function enterTravelView() {
  if (travelViewEntered || window.innerWidth < 768) return;
  travelViewEntered = true;
  zoom.animateTo(2.1);
}

function openNearbyIntroduction() {
  if (!nearbyVillage || projectDialog.isOpen()) return;
  projectDialog.open(nearbyVillage, projects[nearbyVillage.id]);
}

function fastTravelToDestination() {
  if (
    !activeDestination ||
    projectDialog.isOpen() ||
    !fastTravelExplorer(world.explorer, activeDestination)
  ) {
    return;
  }
  movement.reset();
  nearbyVillage = null;
  travelViewEntered = true;
  zoom.animateTo(2.1);
  checkLandmarkProximity();
  updateJourneyStatus();
  introTrigger.focus({ preventScroll: true });
}

function arriveAtVillage(village) {
  setDestination(village.id);
  hud.arrive(village, projects[village.id]);
  if (!discoveredVillages.has(village.id)) {
    discoveredVillages.add(village.id);
    hud.setDiscovered(discoveredVillages.size);
    celebrateArrival(
      world.explorer,
      {
        x: village.position.x * WORLD.tileSize,
        z: village.position.z * WORLD.tileSize,
      },
      reducedMotion.matches,
    );
    world.effects.celebrate(world.explorer.position);
  }
}

function updateJourneyStatus() {
  hud.updateJourney(activeDestination, world.explorer, WORLD.tileSize);
}

function checkLandmarkProximity() {
  let closest = null;
  let closestDistance = Number.POSITIVE_INFINITY;
  VILLAGES.forEach((village) => {
    const distance = Math.hypot(
      world.explorer.position.x - village.position.x * WORLD.tileSize,
      world.explorer.position.z - village.position.z * WORLD.tileSize,
    );
    if (distance < closestDistance) {
      closest = village;
      closestDistance = distance;
    }
  });
  const nextNearby =
    closestDistance < WORLD.tileSize * 2.8 ? closest : null;
  if (nextNearby?.id === nearbyVillage?.id) return;
  nearbyVillage = nextNearby;
  if (nearbyVillage) arriveAtVillage(nearbyVillage);
  else {
    hud.leaveArrival();
    if (activeDestination) {
      hud.select(activeDestination, projects[activeDestination.id]);
    }
  }
}

function pulseMovement(input) {
  moveExplorer(world.explorer, input, 0.05, reducedMotion.matches);
  checkLandmarkProximity();
  updateJourneyStatus();
}

function updateViewport() {
  const aspect = window.innerWidth / window.innerHeight;
  const viewHeight = window.innerWidth < 768 ? 24 : 52;
  camera.left = (-viewHeight * aspect) / 2;
  camera.right = (viewHeight * aspect) / 2;
  camera.top = viewHeight / 2;
  camera.bottom = -viewHeight / 2;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
}

window.addEventListener("keydown", (event) => {
  if (event.code === "Escape" && projectDialog.isOpen()) {
    projectDialog.close();
    return;
  }
  if (event.code === "Space") {
    if (
      !event.repeat &&
      nearbyVillage &&
      !projectDialog.isOpen() &&
      (!(event.target instanceof HTMLButtonElement) || event.target === introTrigger)
    ) {
      event.preventDefault();
      openNearbyIntroduction();
    }
    return;
  }
});
window.addEventListener("resize", updateViewport);

renderer.domElement.addEventListener("pointerup", (event) => {
  const rect = renderer.domElement.getBoundingClientRect();
  pointer.x = ((event.clientX - rect.left) / rect.width) * 2 - 1;
  pointer.y = -((event.clientY - rect.top) / rect.height) * 2 + 1;
  raycaster.setFromCamera(pointer, camera);
  const [hit] = raycaster.intersectObjects(world.hitAreas, false);
  if (hit) setDestination(hit.object.userData.villageId);
});
renderer.domElement.addEventListener("pointermove", (event) => {
  const rect = renderer.domElement.getBoundingClientRect();
  pointer.x = ((event.clientX - rect.left) / rect.width) * 2 - 1;
  pointer.y = -((event.clientY - rect.top) / rect.height) * 2 + 1;
  raycaster.setFromCamera(pointer, camera);
  const [hit] = raycaster.intersectObjects(world.hitAreas, false);
  const nextHovered = hit?.object.userData.villageId ?? null;
  if (nextHovered === hoveredDestination) return;
  hoveredDestination = nextHovered;
  renderer.domElement.style.cursor = nextHovered ? "pointer" : "crosshair";
  updateMarkerScales();
});
renderer.domElement.addEventListener(
  "wheel",
  () => {
    travelViewEntered = true;
    zoom.cancel();
  },
  { passive: true },
);

updateViewport();
loading.hidden = true;
document.body.dataset.ready = "true";

const cameraOffset = new THREE.Vector3(10, 13, 12);
const cameraTarget = new THREE.Vector3();
const desiredCameraPosition = new THREE.Vector3();
const travelDirection = new THREE.Vector2();
const timer = new THREE.Timer();
timer.connect(document);
renderer.setAnimationLoop((timestamp) => {
  timer.update(timestamp);
  const delta = Math.min(timer.getDelta(), 0.05);
  const input = movement.read();
  const moved = moveExplorer(world.explorer, input, delta, reducedMotion.matches);
  if (moved) {
    travelDirection.set(input.x, input.z).normalize();
    world.effects.emitStep(world.explorer.position);
  } else {
    travelDirection.multiplyScalar(reducedMotion.matches ? 0 : 0.86);
  }
  cameraTarget.copy(world.explorer.position);
  cameraTarget.x += travelDirection.x * WORLD.tileSize * 1.2;
  cameraTarget.z += travelDirection.y * WORLD.tileSize * 1.2;
  if (window.innerWidth < 768) {
    const safeOffset = nearbyVillage ? -3.6 : 2.1;
    cameraTarget.x += WORLD.tileSize * safeOffset;
    cameraTarget.z += WORLD.tileSize * safeOffset;
  }
  controls.target.lerp(cameraTarget, reducedMotion.matches ? 1 : 0.12);
  desiredCameraPosition.copy(cameraTarget).add(cameraOffset);
  camera.position.lerp(
    desiredCameraPosition,
    reducedMotion.matches ? 1 : 0.12,
  );
  camera.zoom = zoom.update(camera.zoom, delta, reducedMotion.matches);
  camera.updateProjectionMatrix();
  world.effects.update(delta, reducedMotion.matches);
  controls.update(delta);
  hud.updateZoom(camera.zoom);
  if (moved) {
    checkLandmarkProximity();
    updateJourneyStatus();
  }
  renderer.render(scene, camera);
});
