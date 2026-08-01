const KEY_ACTIONS = Object.freeze({
  ArrowUp: "up",
  ArrowDown: "down",
  ArrowLeft: "left",
  ArrowRight: "right",
  Enter: "A",
  Space: "A",
  Escape: "B",
});

const BUTTON_ACTIONS = Object.freeze({
  a: "A",
  b: "B",
  close: "B",
});

const DIRECTION_ACTIONS = new Set(["up", "down", "left", "right"]);
const MODE_ACTIONS = Object.freeze({
  "initial-selection": new Set(["up", "down", "left", "right", "A", "B"]),
  "mobile-menu": new Set(["up", "down", "left", "right", "A", "B"]),
  map: new Set(["up", "down", "left", "right", "A", "B"]),
  dialogue: new Set(["A", "B"]),
  "project-dialog": new Set(["B"]),
});

export function normalizeKey(code) {
  return typeof code === "string" ? KEY_ACTIONS[code] ?? null : null;
}

function isEditableTarget(target) {
  if (!target || typeof target !== "object") return false;
  if (target.isContentEditable === true) return true;
  const tagName = typeof target.tagName === "string" ? target.tagName.toUpperCase() : "";
  if (["INPUT", "TEXTAREA", "SELECT"].includes(tagName)) return true;
  if (typeof target.closest === "function") {
    return target.closest("input, textarea, select, [contenteditable='true']") !== null;
  }
  return false;
}

function isNonControlNativeButton(target, buttons) {
  if (!target || typeof target !== "object") return false;
  const button = typeof target.closest === "function"
    ? target.closest("button")
    : typeof target.tagName === "string" && target.tagName.toUpperCase() === "BUTTON"
      ? target
      : null;
  return button !== null && !Object.values(buttons).includes(button);
}

export function createInputController(options = {}) {
  const onAction = typeof options.onAction === "function" ? options.onAction : () => {};
  const timers = options.timers ?? globalThis;
  const windowTarget = options.windowTarget ?? globalThis.window;
  const documentTarget = options.documentTarget ?? globalThis.document;
  const buttons = options.buttons ?? {};
  const getMode = typeof options.getMode === "function" ? options.getMode : null;
  const listeners = [];
  const holds = new Map();
  let mode = options.mode ?? "initial-selection";
  let destroyed = false;

  function currentMode() {
    return getMode ? getMode() : mode;
  }

  function owns(action) {
    return MODE_ACTIONS[currentMode()]?.has(action) ?? false;
  }

  function emit(action) {
    if (!destroyed && owns(action)) onAction(action);
  }

  function clearHold(action) {
    const hold = holds.get(action);
    if (!hold) return;
    if (hold.timer !== null) timers.clearTimeout(hold.timer);
    holds.delete(action);
  }

  function repeat(action) {
    const hold = holds.get(action);
    if (!hold) return;
    if (!owns(action)) {
      clearHold(action);
      return;
    }
    emit(action);
    hold.timer = timers.setTimeout(() => repeat(action), 120);
  }

  function startHold(action, source) {
    let hold = holds.get(action);
    if (hold) {
      hold.sources.add(source);
      return;
    }
    if (!owns(action)) return;
    hold = { sources: new Set([source]), timer: null };
    holds.set(action, hold);
    emit(action);
    hold.timer = timers.setTimeout(() => repeat(action), 240);
  }

  function stopHold(action, source) {
    const hold = holds.get(action);
    if (!hold) return;
    hold.sources.delete(source);
    if (hold.sources.size === 0) clearHold(action);
  }

  function reset() {
    for (const action of holds.keys()) clearHold(action);
  }

  function handleKeyDown(event) {
    const action = normalizeKey(event.code);
    if (!action || isEditableTarget(event.target)) return;
    if (!owns(action)) return;
    if (action === "A" && isNonControlNativeButton(event.target, buttons)) return;
    event.preventDefault();
    if (event.repeat) return;
    if (DIRECTION_ACTIONS.has(action)) startHold(action, `key:${event.code}`);
    else emit(action);
  }

  function handleKeyUp(event) {
    const action = normalizeKey(event.code);
    if (action && DIRECTION_ACTIONS.has(action)) stopHold(action, `key:${event.code}`);
  }

  function addListener(target, type, listener) {
    if (!target?.addEventListener) return;
    target.addEventListener(type, listener);
    listeners.push([target, type, listener]);
  }

  function attachButton(button, action) {
    if (!button?.addEventListener) return;
    const sourceFor = (pointerId) => `pointer:${action}:${pointerId}`;
    const release = (event) => {
      const source = sourceFor(event.pointerId);
      stopHold(action, source);
      if (button.hasPointerCapture?.(event.pointerId)) button.releasePointerCapture(event.pointerId);
    };
    addListener(button, "pointerdown", (event) => {
      event.preventDefault();
      button.setPointerCapture?.(event.pointerId);
      if (DIRECTION_ACTIONS.has(action)) startHold(action, sourceFor(event.pointerId));
      else emit(action);
    });
    addListener(button, "pointerup", release);
    addListener(button, "pointercancel", release);
    addListener(button, "lostpointercapture", release);
  }

  addListener(windowTarget, "keydown", handleKeyDown);
  addListener(windowTarget, "keyup", handleKeyUp);
  addListener(windowTarget, "blur", reset);
  addListener(documentTarget, "visibilitychange", () => {
    if (documentTarget.visibilityState !== "visible") reset();
  });
  for (const [name, action] of Object.entries(BUTTON_ACTIONS)) attachButton(buttons[name], action);

  return {
    setMode(nextMode) {
      if (mode !== nextMode) reset();
      mode = nextMode;
    },
    reset,
    destroy() {
      if (destroyed) return;
      destroyed = true;
      reset();
      for (const [target, type, listener] of listeners) {
        target.removeEventListener?.(type, listener);
      }
      listeners.length = 0;
    },
  };
}
