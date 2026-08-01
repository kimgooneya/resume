import { describe, expect, test } from "bun:test";

import { createInputController, normalizeKey } from "../preview/input-controller.js";

class FakeTarget {
  constructor() {
    this.listeners = new Map();
    this.capturedPointers = new Set();
    this.visibilityState = "visible";
  }

  addEventListener(type, listener) {
    const listeners = this.listeners.get(type) ?? [];
    listeners.push(listener);
    this.listeners.set(type, listeners);
  }

  removeEventListener(type, listener) {
    const listeners = this.listeners.get(type) ?? [];
    this.listeners.set(type, listeners.filter((candidate) => candidate !== listener));
  }

  emit(type, event = {}) {
    for (const listener of this.listeners.get(type) ?? []) {
      listener({ preventDefault() {}, ...event });
    }
  }

  setPointerCapture(pointerId) {
    this.capturedPointers.add(pointerId);
  }

  releasePointerCapture(pointerId) {
    this.capturedPointers.delete(pointerId);
  }

  hasPointerCapture(pointerId) {
    return this.capturedPointers.has(pointerId);
  }

  listenerCount() {
    return [...this.listeners.values()].flat().length;
  }
}

function createClock() {
  let now = 0;
  let nextId = 1;
  const tasks = new Map();
  return {
    setTimeout(callback, delay) {
      const id = nextId++;
      tasks.set(id, { callback, due: now + delay });
      return id;
    },
    clearTimeout(id) {
      tasks.delete(id);
    },
    advance(milliseconds) {
      const target = now + milliseconds;
      for (;;) {
        const next = [...tasks.entries()]
          .filter(([, task]) => task.due <= target)
          .sort(([, left], [, right]) => left.due - right.due)[0];
        if (!next) break;
        const [id, task] = next;
        tasks.delete(id);
        now = task.due;
        task.callback();
      }
      now = target;
    },
    pending() {
      return tasks.size;
    },
  };
}

function createFixture({ mode = "map", getMode, extraButtons = {} } = {}) {
  const windowTarget = new FakeTarget();
  const documentTarget = new FakeTarget();
  const clock = createClock();
  const buttons = {
    ...Object.fromEntries(
      ["up", "down", "left", "right", "a", "b", "close"].map((action) => [
        action,
        new FakeTarget(),
      ]),
    ),
    ...extraButtons,
  };
  const actions = [];
  const controller = createInputController({
    mode,
    getMode,
    buttons,
    documentTarget,
    onAction: (action) => actions.push(action),
    timers: clock,
    windowTarget,
  });
  return { actions, buttons, clock, controller, documentTarget, windowTarget };
}

function keyEvent(code, target) {
  let prevented = false;
  return {
    code,
    target,
    preventDefault() {
      prevented = true;
    },
    get prevented() {
      return prevented;
    },
  };
}

describe("action-normalized input controller", () => {
  test("rejects WASD and pointer movement while keeping arrow-key movement", () => {
    // Given: a map controller with the keyboard-only movement contract
    const fixture = createFixture();

    // When: legacy movement keys and visible directional controls are pressed
    for (const code of ["KeyW", "KeyA", "KeyS", "KeyD"]) {
      fixture.windowTarget.emit("keydown", keyEvent(code));
      fixture.windowTarget.emit("keyup", { code });
    }
    for (const [action, pointerId] of [["up", 1], ["down", 2], ["left", 3], ["right", 4]]) {
      fixture.buttons[action].emit("pointerdown", { pointerId });
      fixture.buttons[action].emit("pointerup", { pointerId });
    }

    // Then: only physical arrow keys can emit movement actions
    expect(["KeyW", "KeyA", "KeyS", "KeyD"].map(normalizeKey)).toEqual([null, null, null, null]);
    expect(fixture.actions).toEqual([]);
    fixture.windowTarget.emit("keydown", keyEvent("ArrowUp"));
    expect(fixture.actions).toEqual(["up"]);
    fixture.controller.destroy();
  });

  test("normalizes arrow-key mappings and ignores legacy movement keys", () => {
    // Given: the supported keyboard codes
    const mysteryButton = new FakeTarget();
    const fixture = createFixture({ extraButtons: { mystery: mysteryButton } });
    const expected = {
      ArrowUp: "up", ArrowDown: "down", ArrowLeft: "left", ArrowRight: "right",
      Enter: "A", Space: "A", Escape: "B",
    };

    // When: each code crosses the input boundary
    // Then: only the documented normalized action is produced
    for (const [code, action] of Object.entries(expected)) {
      expect(normalizeKey(code)).toBe(action);
    }
    expect(normalizeKey("KeyQ")).toBeNull();
    expect(normalizeKey(undefined)).toBeNull();
    fixture.windowTarget.emit("keydown", keyEvent("KeyQ"));
    mysteryButton.emit("pointerdown", { pointerId: 1 });
    expect(fixture.actions).toEqual([]);
    expect(mysteryButton.listenerCount()).toBe(0);
    fixture.controller.destroy();
  });

  test("keeps A/B buttons available without turning the keyboard movement guide into a pointer control", () => {
    // Given: an enabled map controller with the keyboard-only movement contract
    const fixture = createFixture();
    const keyboard = ["ArrowUp", "ArrowDown", "ArrowLeft", "ArrowRight", "Enter", "Escape"];

    // When: keyboard keys and their equivalent buttons are pressed
    for (const code of keyboard) {
      fixture.windowTarget.emit("keydown", keyEvent(code));
      fixture.windowTarget.emit("keyup", { code });
    }
    for (const [action, pointerId] of [["up", 1], ["down", 2], ["left", 3], ["right", 4], ["a", 5], ["b", 6]]) {
      fixture.buttons[action].emit("pointerdown", { pointerId });
      fixture.buttons[action].emit("pointerup", { pointerId });
    }

    // Then: arrows and A/B work, while the directional pointer cells stay inert
    expect(fixture.actions).toEqual(["up", "down", "left", "right", "A", "B", "A", "B"]);
  });

  test("fires a direction immediately then repeats at 240ms and every 120ms", () => {
    // Given: a held direction and a deterministic fake timer
    const fixture = createFixture();

    // When: time advances across repeat boundaries
    fixture.windowTarget.emit("keydown", keyEvent("ArrowUp"));
    fixture.clock.advance(239);
    expect(fixture.actions).toEqual(["up"]);
    fixture.clock.advance(1);
    fixture.clock.advance(120);

    // Then: the first hold action is at 240ms and later actions are 120ms apart
    expect(fixture.actions).toEqual(["up", "up", "up"]);
  });

  for (const [name, start, stop] of [
    ["keyboard release", (fixture) => fixture.windowTarget.emit("keydown", keyEvent("ArrowUp")), (fixture) => fixture.windowTarget.emit("keyup", { code: "ArrowUp" })],
    ["window blur", (fixture) => fixture.windowTarget.emit("keydown", keyEvent("ArrowUp")), (fixture) => fixture.windowTarget.emit("blur")],
    ["document visibility loss", (fixture) => fixture.windowTarget.emit("keydown", keyEvent("ArrowUp")), (fixture) => {
      fixture.documentTarget.visibilityState = "hidden";
      fixture.documentTarget.emit("visibilitychange");
    }],
    ["mode change", (fixture) => fixture.windowTarget.emit("keydown", keyEvent("ArrowUp")), (fixture) => fixture.controller.setMode("dialogue")],
    ["explicit reset", (fixture) => fixture.windowTarget.emit("keydown", keyEvent("ArrowUp")), (fixture) => fixture.controller.reset()],
  ]) {
    test(`stops held direction on ${name}`, () => {
      // Given: a repeating directional hold
      const fixture = createFixture();
      start(fixture);

      // When: the interruption occurs before the first repeat
      stop(fixture);
      fixture.clock.advance(1_000);

      // Then: no deferred movement leaks through and all timers are gone
      expect(fixture.actions).toEqual(["up"]);
      expect(fixture.clock.pending()).toBe(0);
    });
  }

  test("ignores editable targets without blocking their native key behavior", () => {
    // Given: text-entry and content-editable targets
    const fixture = createFixture();
    const targets = [
      { tagName: "INPUT" }, { tagName: "TEXTAREA" }, { tagName: "SELECT" },
      { isContentEditable: true },
    ];

    // When: an owned key is pressed inside each editable target
    const events = targets.map((target) => keyEvent("Space", target));
    for (const event of events) fixture.windowTarget.emit("keydown", event);

    // Then: no game action is emitted and the browser is not prevented
    expect(fixture.actions).toEqual([]);
    expect(events.map((event) => event.prevented)).toEqual([false, false, false, false]);
  });

  test("prevents default only for owned non-editable keys", () => {
    // Given: a map controller focused outside an editable or native button element
    const fixture = createFixture();
    const owned = keyEvent("Enter", { tagName: "CANVAS" });
    const unknown = keyEvent("KeyQ", { tagName: "CANVAS" });

    // When: owned and unknown keys are dispatched
    fixture.windowTarget.emit("keydown", owned);
    fixture.windowTarget.emit("keydown", unknown);

    // Then: only the owned key is consumed
    expect(owned.prevented).toBe(true);
    expect(unknown.prevented).toBe(false);
  });

  test("leaves A-key activation native on non-control buttons while preserving the visible A control", () => {
    // Given: a map control and a separate native mobile-menu trigger
    const fixture = createFixture();
    const mobileTrigger = { id: "mobile-regions-trigger", tagName: "BUTTON" };
    const triggerEvent = keyEvent("Enter", mobileTrigger);
    const controlEvent = keyEvent("Enter", fixture.buttons.a);

    // When: Enter reaches each focused button
    fixture.windowTarget.emit("keydown", triggerEvent);
    fixture.windowTarget.emit("keydown", controlEvent);

    // Then: the trigger keeps its browser click while the physical A control retains parity
    expect(triggerEvent.prevented).toBe(false);
    expect(controlEvent.prevented).toBe(true);
    expect(fixture.actions).toEqual(["A"]);
    fixture.controller.destroy();
  });

  test("leaves mapped-but-unowned keys native in dialogue mode", () => {
    // Given: a dialogue controller on a real cancelable EventTarget
    const windowTarget = new EventTarget();
    const documentTarget = new EventTarget();
    const actions = [];
    const controller = createInputController({
      mode: "dialogue",
      windowTarget,
      documentTarget,
      onAction: (action) => actions.push(action),
    });

    // When: a direction, confirmation, and Escape key are dispatched
    const events = ["ArrowUp", "Enter", "Escape"].map((code) => {
      const event = new Event("keydown", { cancelable: true });
      Object.defineProperty(event, "code", { value: code });
      windowTarget.dispatchEvent(event);
      return event;
    });

    // Then: only dialogue-owned actions prevent native behavior or emit
    expect(events.map((event) => event.defaultPrevented)).toEqual([false, true, true]);
    expect(actions).toEqual(["A", "B"]);
    controller.destroy();
  });

  test("leaves mapped-but-unowned keys native in project-dialog mode", () => {
    // Given: a project-dialog controller on a real cancelable EventTarget
    const windowTarget = new EventTarget();
    const documentTarget = new EventTarget();
    const actions = [];
    const controller = createInputController({
      mode: "project-dialog",
      windowTarget,
      documentTarget,
      onAction: (action) => actions.push(action),
    });

    // When: a direction, confirmation, and Escape key are dispatched
    const events = ["ArrowUp", "Enter", "Escape"].map((code) => {
      const event = new Event("keydown", { cancelable: true });
      Object.defineProperty(event, "code", { value: code });
      windowTarget.dispatchEvent(event);
      return event;
    });

    // Then: only project-dialog-owned Escape prevents native behavior or emits
    expect(events.map((event) => event.defaultPrevented)).toEqual([false, false, true]);
    expect(actions).toEqual(["B"]);
    controller.destroy();
  });

  test("uses the active mode as an input precedence matrix", () => {
    // Given: one controller at each input layer
    const cases = [
      ["initial-selection", ["up", "A", "B"]],
      ["mobile-menu", ["up", "A", "B"]],
      ["map", ["up", "A", "B"]],
      ["dialogue", ["A", "B"]],
      ["project-dialog", ["B"]],
    ];

    // When: movement, confirmation, and back inputs arrive
    // Then: each layer receives only the actions it owns
    for (const [mode, expected] of cases) {
      const fixture = createFixture({ mode });
      for (const code of ["ArrowUp", "Enter", "Escape"]) {
        fixture.windowTarget.emit("keydown", keyEvent(code));
      }
      expect(fixture.actions).toEqual(expected);
      fixture.controller.destroy();
    }
  });

  test("stops a hold when an externally supplied mode changes", () => {
    // Given: a controller whose app mode can change independently
    let mode = "map";
    const fixture = createFixture({ getMode: () => mode });
    fixture.windowTarget.emit("keydown", keyEvent("ArrowUp"));

    // When: an overlay opens before the repeat threshold
    mode = "dialogue";
    fixture.clock.advance(240);

    // Then: input ownership blocks the queued map movement
    expect(fixture.actions).toEqual(["up"]);
    expect(fixture.clock.pending()).toBe(0);
  });

  test("maps the project dialog close control to its owned back action", () => {
    // Given: the project dialog has exclusive input ownership
    const fixture = createFixture({ mode: "project-dialog" });

    // When: its close button is pressed
    fixture.buttons.close.emit("pointerdown", { pointerId: 1 });

    // Then: the same B action as Escape is delivered
    expect(fixture.actions).toEqual(["B"]);
    fixture.controller.destroy();
  });

  test("destroy removes listeners and cancels outstanding repeat work", () => {
    // Given: a controller with an active keyboard hold
    const fixture = createFixture();
    fixture.windowTarget.emit("keydown", keyEvent("ArrowUp"));

    // When: the controller is destroyed
    fixture.controller.destroy();
    fixture.clock.advance(1_000);
    fixture.windowTarget.emit("keydown", keyEvent("ArrowDown"));

    // Then: no actions or live timer/listener resources remain
    expect(fixture.actions).toEqual(["up"]);
    expect(fixture.clock.pending()).toBe(0);
    expect(fixture.windowTarget.listenerCount()).toBe(0);
    expect(fixture.documentTarget.listenerCount()).toBe(0);
    expect(fixture.buttons.up.listenerCount()).toBe(0);
  });
});
