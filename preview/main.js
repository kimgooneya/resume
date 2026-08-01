import { createDialogueBox } from "./dialogue-box.js";
import { createFieldGuide } from "./field-guide.js";
import { createInputController } from "./input-controller.js";
import { loadProjects as fetchProjects } from "./project-content.js";
import { createProgressStore } from "./progress-store.js";
import { createProjectDialog } from "./project-dialog.js";
import { REGION_IDS, REGIONS, getRegion } from "./region-data.js";
import { createTileState, getInteractableResident, reduceTileState } from "./tile-engine.js";
import { renderTileWorld } from "./tile-renderer.js";

const DIRECTIONS = new Set(["up", "down", "left", "right"]);

export function formatResidentInteraction(role) {
  const finalCharacter = [...role.trim()].at(-1);
  const codePoint = finalCharacter?.codePointAt(0);
  const hasFinalConsonant = codePoint >= 0xac00 && codePoint <= 0xd7a3
    && (codePoint - 0xac00) % 28 !== 0;
  return `${role}${hasFinalConsonant ? "과" : "와"} 대화할 수 있습니다`;
}

function tileStateSignature({ regionId, player, camera }) {
  return `${regionId}:${player.x}:${player.y}:${player.facing}:${camera.x}:${camera.y}`;
}

function requireElement(document, selector) {
  const element = document.querySelector(selector);
  if (!element) throw new TypeError(`Missing required application element: ${selector}`);
  return element;
}

function validProject(project) {
  return project !== null
    && typeof project === "object"
    && ["role", "year", "title", "summary"]
      .every((field) => typeof project[field] === "string")
    && Array.isArray(project.highlights)
    && project.highlights.length === 3
    && project.highlights.every((highlight) => typeof highlight === "string")
    && Array.isArray(project.stack)
    && project.stack.length > 0
    && project.stack.every((technology) => typeof technology === "string");
}

function validProjects(projects) {
  return projects !== null
    && typeof projects === "object"
    && Object.keys(projects).length === REGION_IDS.length
    && REGION_IDS.every((regionId) => validProject(projects[regionId]));
}

export async function createApplication(
  { document = globalThis.document, window = globalThis.window, loadProjects = fetchProjects,
    storage, timers = globalThis } = {},
) {
  const shell = requireElement(document, ".game-shell");
  const canvas = requireElement(document, "#map-canvas");
  const initialSelection = requireElement(document, "#initial-region-selection");
  const currentRegion = requireElement(document, "#current-region");
  const positionStatus = requireElement(document, "#position-status");
  const interactionStatus = requireElement(document, "#interaction-status");
  const appStatus = requireElement(document, "#app-status");
  const loadError = requireElement(document, "#load-error");
  const reloadButton = requireElement(document, "#reload-data");
  const controls = {
    a: requireElement(document, "#action-a"), b: requireElement(document, "#action-b"),
  };
  const context = canvas.getContext("2d");
  if (!context) throw new TypeError("The map canvas requires a 2D context");

  const progressStore = createProgressStore(storage === undefined ? {} : { storage });
  const reducedMotion = window.matchMedia?.("(prefers-reduced-motion: reduce)")
    ?? { matches: false, addEventListener() {}, removeEventListener() {} };
  let mode = "loading", region = null, tileState = null, projects = null;
  let destroyed = false, loading = false, inputController;

  function setMode(nextMode) {
    mode = nextMode;
    inputController?.setMode(nextMode);
  }

  function setControlsEnabled(enabled) {
    for (const control of Object.values(controls)) control.disabled = !enabled;
  }

  function updateMapText() {
    if (!region || !tileState) return;
    const activeResident = getInteractableResident(tileState, region);
    currentRegion.textContent = region.label;
    positionStatus.textContent = `${region.label} · ${tileState.player.x}, ${tileState.player.y}`;
    interactionStatus.textContent = activeResident
      ? formatResidentInteraction(activeResident.role)
      : `${region.residents.length}명의 주민을 찾아 대화해 보세요`;
    canvas.setAttribute(
      "aria-label",
      `${region.label} 지도. 현재 위치 ${tileState.player.x}, ${tileState.player.y}. ${interactionStatus.textContent}`,
    );
  }

  function draw() {
    if (!region || !tileState) return;
    updateMapText();
    const activeResident = getInteractableResident(tileState, region);
    renderTileWorld(context, region, tileState, {
      interactionAvailable: activeResident !== null,
      interactionResident: activeResident,
    });
  }

  const projectDialog = createProjectDialog(
    { root: document, onClose: () => dialogue.closeProject(), onModeChange: setMode },
  );
  const dialogue = createDialogueBox({
    root: document,
    onComplete: (regionId) => {
      if (progressStore.complete(regionId)) {
        fieldGuide.updateProgress();
        appStatus.textContent = `${getRegion(regionId).label} 탐험을 완료했습니다.`;
      }
    },
    onModeChange: setMode,
    onOpenProject: ({ invokingControl, projectId }) => projectDialog.open({
      invokingControl,
      project: projects?.[projectId],
      returnMode: "dialogue",
    }),
  });

  function selectRegion(regionId) {
    if (!projects || destroyed) return false;
    const nextRegion = getRegion(regionId);
    if (!nextRegion) return false;
    projectDialog.close();
    dialogue.close();
    region = nextRegion;
    tileState = createTileState(region);
    shell.dataset.theme = region.id;
    initialSelection.hidden = true;
    inputController?.reset();
    setMode("map");
    draw();
    appStatus.textContent = `${region.label} 탐험을 시작했습니다.`;
    return true;
  }

  const fieldGuide = createFieldGuide({
    document,
    onMenuStateChange: (open) => setMode(open
      ? "mobile-menu"
      : region ? "map" : "initial-selection"),
    onRegionSelect: selectRegion,
    progressStore,
    regions: REGIONS,
  });

  function selectionAction(action) {
    const mobile = mode === "mobile-menu";
    if (action === "B") return fieldGuide.handleAction(action);
    const selector = mobile
      ? "[data-mobile-region-list] button[data-region-id]"
      : "#field-guide .region-list button[data-region-id]";
    const buttons = [...document.querySelectorAll(selector)];
    const activeIndex = Math.max(0, buttons.indexOf(document.activeElement));
    if (action === "A") {
      buttons[activeIndex]?.click();
      return true;
    }
    if (!DIRECTIONS.has(action) || buttons.length === 0) return false;
    const offset = action === "up" || action === "left" ? -1 : 1;
    buttons[(activeIndex + offset + buttons.length) % buttons.length].focus();
    return true;
  }

  function handleAction(action) {
    if (destroyed || loading || !projects) return false;
    if (mode === "initial-selection" || mode === "mobile-menu") {
      return selectionAction(action);
    }
    if (mode === "project-dialog") return projectDialog.handleAction(action);
    if (mode === "dialogue") return dialogue.handleAction(action, controls.a);
    if (mode !== "map" || !region || !tileState) return false;
    if (DIRECTIONS.has(action)) {
      const nextState = reduceTileState(tileState, action, region);
      if (tileStateSignature(nextState) === tileStateSignature(tileState)) return false;
      tileState = nextState;
      draw();
      return true;
    }
    const interactableResident = getInteractableResident(tileState, region);
    if (action === "A" && interactableResident) {
      return dialogue.open({
        completed: progressStore.isCompleted(region.id),
        invokingControl: document.activeElement,
        isAdjacent: true,
        isFacing: true,
        resident: interactableResident,
      });
    }
    return false;
  }

  inputController = createInputController(
    { buttons: controls, documentTarget: document, getMode: () => mode,
      onAction: handleAction, timers, windowTarget: window },
  );

  function reflectMotionPreference() { shell.dataset.reducedMotion = String(reducedMotion.matches); }
  reducedMotion.addEventListener?.("change", reflectMotionPreference);
  reflectMotionPreference();

  async function reload() {
    if (destroyed || loading) return false;
    loading = true;
    setMode("loading");
    setControlsEnabled(false);
    reloadButton.disabled = true;
    loadError.hidden = true;
    shell.dataset.state = "loading";
    appStatus.textContent = "지역 기록을 불러오는 중입니다.";
    try {
      const loaded = await loadProjects();
      if (destroyed) return false;
      if (!validProjects(loaded)) throw new TypeError("Project records are malformed");
      projects = loaded;
      loadError.hidden = true;
      shell.dataset.state = "ready";
      document.body.dataset.ready = "true";
      appStatus.textContent = "탐험할 지역을 선택하세요.";
      setControlsEnabled(true);
      setMode(region ? "map" : "initial-selection");
      return true;
    } catch {
      if (destroyed) return false;
      projects = null;
      loadError.hidden = false;
      shell.dataset.state = "error";
      document.body.dataset.ready = "false";
      appStatus.textContent = "지역 기록을 불러오지 못했습니다. 다시 불러오기를 선택하세요.";
      setMode("error");
      return false;
    } finally {
      if (!destroyed) {
        loading = false;
        reloadButton.disabled = false;
      }
    }
  }

  function requestReload() { void reload(); }
  reloadButton.addEventListener("click", requestReload);
  if (await reload()) fieldGuide.focusInitialRegion();

  return Object.freeze({
    destroy() {
      if (destroyed) return false;
      destroyed = true;
      reloadButton.removeEventListener("click", requestReload);
      reducedMotion.removeEventListener?.("change", reflectMotionPreference);
      inputController.destroy();
      fieldGuide.destroy();
      projectDialog.destroy();
      return true;
    },
    getState: () => ({ mode, regionId: region?.id ?? null, tileState }),
    handleAction,
    reload,
  });
}

if (typeof document !== "undefined" && typeof window !== "undefined") {
  void createApplication().catch(() => {
    const error = document.querySelector("#load-error");
    if (error) error.hidden = false;
  });
}
