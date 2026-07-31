import { describe, expect, test } from "bun:test";
import { readFileSync } from "node:fs";

import { createProjectDialog } from "../preview/project-dialog.js";

const projects = JSON.parse(
  readFileSync(new URL("../preview/projects.json", import.meta.url), "utf8"),
);

class FakeElement {
  constructor() {
    this.attributes = new Map();
    this.listeners = new Map();
    this.open = false;
    this.textContent = "";
    this.children = [];
    this.focusCount = 0;
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

  dispatch(type, event = {}) {
    for (const listener of this.listeners.get(type) ?? []) listener({
      preventDefault: () => {},
      target: this,
      ...event,
    });
  }

  close() {
    this.open = false;
    this.dispatch("close");
  }

  focus() {
    this.focusCount += 1;
  }

  replaceChildren(...children) {
    this.children = children;
  }

  setAttribute(name, value) {
    this.attributes.set(name, String(value));
  }

  showModal() {
    this.open = true;
  }

  listenerCount() {
    return [...this.listeners.values()].flat().length;
  }
}

function createProjectFixture() {
  const dialog = new FakeElement();
  const closeButton = new FakeElement();
  const elements = {
    "#project-dialog": dialog,
    "[data-dialog-close]": closeButton,
    "#project-meta": new FakeElement(),
    "#project-title": new FakeElement(),
    "#project-summary": new FakeElement(),
    "#project-highlights": new FakeElement(),
    "#project-stack": new FakeElement(),
  };
  dialog.querySelector = (selector) => elements[selector];
  const ownerDocument = {
    createElement: () => new FakeElement(),
  };
  const root = {
    ownerDocument,
    querySelector: (selector) => elements[selector],
  };
  return { closeButton, dialog, elements, root };
}

describe("native project record dialog", () => {
  test("Given a project model, When opened, Then it renders the record, focuses close, and owns mode", () => {
    // Given: a native-dialog fixture and the authoritative forest record
    const { closeButton, dialog, elements, root } = createProjectFixture();
    const modes = [];
    const projectDialog = createProjectDialog({
      root,
      onModeChange: (mode) => modes.push(mode),
    });

    // When: the record is opened
    projectDialog.open({
      invokingControl: new FakeElement(),
      project: projects.forest,
    });

    // Then: the model and modal accessibility state are observable
    expect(dialog.open).toBe(true);
    expect(dialog.attributes.get("aria-live")).toBe("polite");
    expect(elements["#project-meta"].textContent).toBe("DATA & AI · 2025");
    expect(elements["#project-title"].textContent).toBe("별빛 관측소");
    expect(elements["#project-summary"].textContent).toBe(projects.forest.summary);
    expect(elements["#project-highlights"].children.map(({ textContent }) => textContent))
      .toEqual(projects.forest.highlights);
    expect(elements["#project-stack"].children.map(({ textContent }) => textContent))
      .toEqual(projects.forest.stack);
    expect(closeButton.focusCount).toBe(1);
    expect(modes).toEqual(["project-dialog"]);
  });

  test("Given malformed record boundaries, When open is requested, Then it returns false without throwing", () => {
    // Given: missing project and invalid collection shapes
    const fixture = createProjectFixture();
    const projectDialog = createProjectDialog({ root: fixture.root });
    const valid = projects.forest;
    const requests = [
      undefined,
      {},
      { project: null },
      { project: { ...valid, highlights: null } },
      { project: { ...valid, stack: "Python" } },
    ];

    // When: each request reaches the project-record boundary
    const outcomes = requests.map((request) => projectDialog.open(request));

    // Then: no malformed record opens or mutates modal ownership
    expect(outcomes).toEqual([false, false, false, false, false]);
    expect(fixture.dialog.open).toBe(false);
  });

  for (const [method, closeRecord] of [
    ["close button", ({ closeButton }) => closeButton.dispatch("click")],
    ["B", ({ projectDialog }) => projectDialog.handleAction("B")],
    ["Escape", ({ dialog }) => dialog.dispatch("cancel")],
    ["backdrop", ({ dialog }) => dialog.dispatch("click", { target: dialog })],
  ]) {
    test(`Given an open record, When closed by ${method}, Then exact invoking focus and mode return`, () => {
      // Given: an open record with a unique invoking control
      const fixture = createProjectFixture();
      const invokingControl = new FakeElement();
      const modes = [];
      let closeCount = 0;
      const projectDialog = createProjectDialog({
        root: fixture.root,
        onClose: () => closeCount += 1,
        onModeChange: (mode) => modes.push(mode),
      });
      projectDialog.open({
        invokingControl,
        project: projects.coast,
        returnMode: "dialogue",
      });

      // When: this supported close path is used
      closeRecord({ ...fixture, projectDialog });

      // Then: the dialog closes, restores the same object, and releases mode
      expect(fixture.dialog.open).toBe(false);
      expect(invokingControl.focusCount).toBe(1);
      expect(closeCount).toBe(1);
      expect(modes).toEqual(["project-dialog", "dialogue"]);
    });
  }

  test("Given an open record, When map-like input is attempted, Then it remains blocked", () => {
    // Given: an open project record
    const fixture = createProjectFixture();
    const projectDialog = createProjectDialog({ root: fixture.root });
    projectDialog.open({
      invokingControl: new FakeElement(),
      project: projects.city,
    });

    // When: a movement action reaches the dialog boundary
    const consumed = projectDialog.handleAction("move-up");

    // Then: the overlay consumes it without closing
    expect(consumed).toBe(true);
    expect(fixture.dialog.open).toBe(true);
  });

  test("Given a non-focusable invoker, When the record closes, Then close notification remains safe and one-shot", () => {
    // Given: an open record whose caller cannot receive focus
    const fixture = createProjectFixture();
    let closeCount = 0;
    const projectDialog = createProjectDialog({
      root: fixture.root,
      onClose: () => closeCount += 1,
    });
    projectDialog.open({
      invokingControl: {},
      project: projects.snow,
    });

    // When: the dialog closes normally
    const closed = projectDialog.close();

    // Then: lifecycle completion does not depend on a focus method
    expect(closed).toBe(true);
    expect(closeCount).toBe(1);
  });

  test("Given a controller lifecycle, When destroyed twice and reinitialized, Then listeners and callbacks do not duplicate", () => {
    // Given: one open controller with attached listeners
    const fixture = createProjectFixture();
    const firstInvoker = new FakeElement();
    let closeCount = 0;
    const first = createProjectDialog({
      root: fixture.root,
      onClose: () => closeCount += 1,
    });
    first.open({
      invokingControl: firstInvoker,
      project: projects.city,
    });

    // When: it is destroyed repeatedly, then a replacement completes one close
    const destroyOutcomes = [first.destroy(), first.destroy()];
    const listenerCountAfterDestroy =
      fixture.dialog.listenerCount() + fixture.closeButton.listenerCount();
    const second = createProjectDialog({
      root: fixture.root,
      onClose: () => closeCount += 1,
    });
    second.open({
      invokingControl: new FakeElement(),
      project: projects.city,
    });
    fixture.closeButton.dispatch("click");

    // Then: teardown cleared the old modal state and only replacement callbacks ran
    expect(destroyOutcomes).toEqual([true, false]);
    expect(listenerCountAfterDestroy).toBe(0);
    expect(firstInvoker.focusCount).toBe(0);
    expect(fixture.dialog.open).toBe(false);
    expect(closeCount).toBe(1);
    expect(fixture.dialog.listenerCount() + fixture.closeButton.listenerCount()).toBe(4);
  });
});
