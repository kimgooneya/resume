import { REGIONS } from "./region-data.js";

const TOTAL_REGIONS = 5;

export function formatProgress(completedCount, totalCount = TOTAL_REGIONS) {
  return `${String(completedCount).padStart(2, "0")}/${String(totalCount).padStart(2, "0")}`;
}

export function createFieldGuideState(regionIds, completedRegionIds = []) {
  const allowedIds = new Set(regionIds);
  const completed = new Set(completedRegionIds.filter((id) => allowedIds.has(id)));
  return Object.freeze({
    completedRegionIds: regionIds.filter((id) => completed.has(id)),
    mobileMenuOpen: false,
    resetConfirmationOpen: false,
    selectedRegionId: null,
  });
}

function requireElement(document, selector) {
  const element = document?.querySelector?.(selector);
  if (!element) throw new TypeError(`Missing required field guide element: ${selector}`);
  return element;
}

function createRegionButton(document, region) {
  const button = document.createElement("button");
  button.type = "button";
  button.dataset.regionId = region.id;

  const cursor = document.createElement("span");
  cursor.className = "region-cursor";
  cursor.setAttribute("aria-hidden", "true");
  cursor.textContent = "▶";
  const summary = document.createElement("span");
  const name = document.createElement("strong");
  name.textContent = region.label;
  const role = document.createElement("small");
  role.textContent = region.resident.role;
  summary.append(name, role);
  const completion = document.createElement("span");
  completion.className = "completion-box";
  completion.setAttribute("aria-hidden", "true");
  button.append(cursor, summary, completion);
  return button;
}

function safeFocus(element) {
  element?.focus?.({ preventScroll: true });
}

export function createFieldGuide({
  document = globalThis.document,
  onMenuStateChange = () => {},
  onRegionSelect = () => {},
  progressStore,
  regions = REGIONS,
} = {}) {
  const regionIds = regions.map((region) => region.id);
  const regionIdSet = new Set(regionIds);
  const desktopList = requireElement(document, "#field-guide .region-list");
  const mobileList = requireElement(document, "[data-mobile-region-list]");
  const mobilePanel = requireElement(document, "#mobile-region-panel");
  const mobileTrigger = requireElement(document, "#mobile-regions-trigger");
  const mobileClose = requireElement(document, "[data-mobile-menu-close]");
  const resetTrigger = requireElement(document, "#reset-trigger");
  const resetConfirmation = requireElement(document, "#reset-confirmation");
  const resetConfirm = requireElement(document, "[data-reset-confirm]");
  const resetCancel = requireElement(document, "[data-reset-cancel]");
  const completionLabels = [
    requireElement(document, "#guide-completion"),
    requireElement(document, "#completion-count"),
  ];
  const announcement = requireElement(document, "#app-status");
  const buttonsById = new Map();
  const listeners = [];
  let state = createFieldGuideState(regionIds, progressStore?.getCompletedRegionIds?.() ?? []);
  let focusOwner = null;

  desktopList.replaceChildren?.();
  mobileList.replaceChildren?.();

  function listen(element, type, listener) {
    element.addEventListener(type, listener);
    listeners.push([element, type, listener]);
  }

  function completedIds() {
    const completed = progressStore?.getCompletedRegionIds?.() ?? [];
    const completedSet = new Set(Array.isArray(completed) ? completed : []);
    return regionIds.filter((regionId) => completedSet.has(regionId));
  }

  function render() {
    const completedSet = new Set(state.completedRegionIds);
    const progress = formatProgress(completedSet.size, regionIds.length);
    for (const label of completionLabels) label.textContent = progress;
    for (const [regionId, buttons] of buttonsById) {
      const selected = state.selectedRegionId === regionId;
      const completed = completedSet.has(regionId);
      for (const button of buttons) {
        const region = regions.find((candidate) => candidate.id === regionId);
        button.setAttribute("aria-pressed", String(selected));
        button.setAttribute("aria-label", `${region.label}, ${region.resident.role}, ${completed ? "완료" : "미완료"}`);
        button.setAttribute("data-completed", String(completed));
      }
    }
    mobilePanel.hidden = !state.mobileMenuOpen;
    mobileTrigger.setAttribute("aria-expanded", String(state.mobileMenuOpen));
    resetConfirmation.hidden = !state.resetConfirmationOpen;
  }

  function updateProgress() {
    state = { ...state, completedRegionIds: completedIds() };
    render();
  }

  function closeMobileMenu() {
    if (!state.mobileMenuOpen) return false;
    state = { ...state, mobileMenuOpen: false };
    render();
    onMenuStateChange(false);
    safeFocus(focusOwner);
    return true;
  }

  function openMobileMenu(owner = mobileTrigger) {
    if (state.mobileMenuOpen) return false;
    focusOwner = owner;
    state = { ...state, mobileMenuOpen: true };
    render();
    onMenuStateChange(true);
    safeFocus(buttonsById.get(regionIds[0])?.[1]);
    return true;
  }

  function selectRegion(regionId, owner = null) {
    if (!regionIdSet.has(regionId)) return false;
    focusOwner = owner ?? focusOwner;
    state = { ...state, selectedRegionId: regionId };
    render();
    onRegionSelect(regionId);
    closeMobileMenu();
    return true;
  }

  function requestReset() {
    if (state.resetConfirmationOpen) return false;
    focusOwner = resetTrigger;
    state = { ...state, resetConfirmationOpen: true };
    render();
    safeFocus(resetConfirm);
    return true;
  }

  function cancelReset() {
    if (!state.resetConfirmationOpen) return false;
    state = { ...state, resetConfirmationOpen: false };
    render();
    safeFocus(focusOwner);
    return true;
  }

  function confirmReset() {
    if (!state.resetConfirmationOpen || progressStore?.reset?.(true) !== true) return false;
    state = { ...state, completedRegionIds: [], resetConfirmationOpen: false };
    render();
    announcement.textContent = "완료 기록을 초기화했습니다.";
    safeFocus(focusOwner);
    return true;
  }

  for (const region of regions) {
    const desktopButton = createRegionButton(document, region);
    const mobileButton = createRegionButton(document, region);
    buttonsById.set(region.id, [desktopButton, mobileButton]);
    listen(desktopButton, "click", () => selectRegion(region.id, desktopButton));
    listen(mobileButton, "click", () => selectRegion(region.id, mobileTrigger));
    desktopList.append(desktopButton);
    mobileList.append(mobileButton);
  }
  mobilePanel.hidden = true;
  resetConfirmation.hidden = true;
  listen(mobileTrigger, "click", () => openMobileMenu(mobileTrigger));
  listen(mobileClose, "click", closeMobileMenu);
  listen(resetTrigger, "click", requestReset);
  listen(resetCancel, "click", cancelReset);
  listen(resetConfirm, "click", confirmReset);
  render();

  function focusInitialRegion() {
    const initialButton = buttonsById.get(regionIds[0])?.[0];
    if (initialButton?.checkVisibility?.() === false) {
      openMobileMenu(mobileTrigger);
      return;
    }
    safeFocus(initialButton);
  }

  return Object.freeze({
    closeMobileMenu,
    confirmReset,
    destroy() {
      for (const [element, type, listener] of listeners) element.removeEventListener?.(type, listener);
    },
    focusInitialRegion,
    getState: () => ({ ...state, completedRegionIds: [...state.completedRegionIds] }),
    getFocusOwner: () => focusOwner,
    handleAction(action) {
      if (action === "B") return cancelReset() || closeMobileMenu();
      return state.mobileMenuOpen;
    },
    isMovementBlocked: () => state.mobileMenuOpen,
    openMobileMenu,
    requestReset,
    selectRegion,
    updateProgress,
  });
}
