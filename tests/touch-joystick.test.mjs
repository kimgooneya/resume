import { describe, expect, test } from "bun:test";

import {
  createTouchJoystick,
  joystickVector,
  mapJoystickToWorld,
} from "../preview/touch-joystick.js";

class FakeEventTarget {
  constructor(bounds = { left: 0, top: 0, width: 112, height: 112 }) {
    this.bounds = bounds;
    this.listeners = new Map();
    this.attributes = new Map();
    this.capturedPointers = new Set();
    this.style = {
      values: new Map(),
      setProperty: (name, value) => this.style.values.set(name, value),
    };
    this.classList = {
      values: new Set(),
      add: (name) => this.classList.values.add(name),
      remove: (name) => this.classList.values.delete(name),
    };
  }

  addEventListener(type, listener) {
    const listeners = this.listeners.get(type) ?? [];
    listeners.push(listener);
    this.listeners.set(type, listeners);
  }

  emit(type, event = {}) {
    for (const listener of this.listeners.get(type) ?? []) {
      listener({ preventDefault() {}, ...event });
    }
  }

  querySelector() {
    return new FakeEventTarget({ left: 32, top: 32, width: 48, height: 48 });
  }

  getBoundingClientRect() {
    return this.bounds;
  }

  setPointerCapture(pointerId) {
    this.capturedPointers.add(pointerId);
  }

  hasPointerCapture(pointerId) {
    return this.capturedPointers.has(pointerId);
  }

  releasePointerCapture(pointerId) {
    this.capturedPointers.delete(pointerId);
  }

  setAttribute(name, value) {
    this.attributes.set(name, value);
  }
}

describe("touch joystick", () => {
  test("stays idle while the pointer is inside the dead zone", () => {
    // Given: a joystick with a 50px travel radius and a 14% dead zone
    // When: the thumb moves only 6px from center
    const vector = joystickVector(
      { x: 56, y: 50 },
      { x: 50, y: 50 },
      50,
    );

    // Then: movement remains stopped while visual feedback follows the thumb
    expect(vector.input).toEqual({ x: 0, y: 0 });
    expect(vector.thumb).toEqual({ x: 6, y: 0 });
  });

  test("clamps thumb travel and normalizes input at the outer edge", () => {
    // Given: a 50px joystick radius
    // When: the pointer moves 100px to the right
    const vector = joystickVector(
      { x: 150, y: 50 },
      { x: 50, y: 50 },
      50,
    );

    // Then: the thumb stays in its base and input reaches full strength
    expect(vector.thumb).toEqual({ x: 50, y: 0 });
    expect(vector.input.x).toBeCloseTo(1);
    expect(vector.input.y).toBeCloseTo(0);
  });

  test("rotates screen direction into the isometric movement axes", () => {
    // Given: a full-strength drag toward screen right
    // When: it is converted to world movement
    const movement = mapJoystickToWorld({ x: 1, y: 0 });

    // Then: it matches the existing right-button diagonal
    expect(movement.x).toBeCloseTo(Math.SQRT1_2);
    expect(movement.z).toBeCloseTo(-Math.SQRT1_2);
  });

  test("keeps the first pointer in control when a second touch lands", () => {
    const originalWindow = globalThis.window;
    const fakeWindow = new FakeEventTarget();
    globalThis.window = fakeWindow;

    try {
      const stick = new FakeEventTarget();
      const inputs = [];
      createTouchJoystick(stick, (input) => inputs.push(input));

      stick.emit("pointerdown", {
        pointerId: 1,
        clientX: 88,
        clientY: 56,
      });
      stick.emit("pointerdown", {
        pointerId: 2,
        clientX: 24,
        clientY: 56,
      });
      stick.emit("pointerup", { pointerId: 2 });

      expect(inputs.at(-1).x).toBeCloseTo(1);
      expect(stick.attributes.get("aria-pressed")).toBe("true");
      expect(stick.capturedPointers.has(1)).toBe(true);
      expect(stick.capturedPointers.has(2)).toBe(false);
    } finally {
      if (originalWindow === undefined) {
        delete globalThis.window;
      } else {
        globalThis.window = originalWindow;
      }
    }
  });
});
