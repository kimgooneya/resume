import { describe, expect, test } from "bun:test";

import { REGIONS } from "../preview/region-data.js";
import { createFieldGuide, createFieldGuideState, formatProgress } from "../preview/field-guide.js";

class FakeElement {
  constructor(tagName = "div") {
    this.tagName = tagName.toUpperCase();
    this.children = [];
    this.dataset = {};
    this.listeners = new Map();
    this.attributes = new Map();
    this.hidden = false;
    this.textContent = "";
    this.focused = false;
  }

  addEventListener(type, listener) {
    this.listeners.set(type, [...(this.listeners.get(type) ?? []), listener]);
  }

  append(...children) {
    this.children.push(...children);
  }

  emit(type, event = {}) {
    for (const listener of this.listeners.get(type) ?? []) listener({ currentTarget: this, preventDefault() {}, ...event });
  }

  focus() {
    this.focused = true;
    this.focusOptions = arguments[0];
  }

  replaceChildren(...children) {
    this.children = children;
  }

  setAttribute(name, value) {
    this.attributes.set(name, String(value));
  }

  getAttribute(name) {
    return this.attributes.get(name) ?? null;
  }
}

function createFixture() {
  const desktopList = new FakeElement("nav");
  desktopList.append(new FakeElement("button"));
  const elements = new Map([
    ["#field-guide .region-list", desktopList],
    ["[data-mobile-region-list]", new FakeElement()],
    ["#mobile-region-panel", new FakeElement("section")],
    ["#mobile-regions-trigger", new FakeElement("button")],
    ["[data-mobile-menu-close]", new FakeElement("button")],
    ["#reset-trigger", new FakeElement("button")],
    ["#reset-confirmation", new FakeElement("fieldset")],
    ["[data-reset-confirm]", new FakeElement("button")],
    ["[data-reset-cancel]", new FakeElement("button")],
    ["#guide-completion", new FakeElement("strong")],
    ["#completion-count", new FakeElement("strong")],
    ["#app-status", new FakeElement("p")],
  ]);
  const selections = [];
  const menuStates = [];
  let resetCalls = 0;
  const completed = new Set(["forest", "coast"]);
  const guide = createFieldGuide({
    document: {
      createElement: (tagName) => new FakeElement(tagName),
      querySelector: (selector) => elements.get(selector) ?? null,
    },
    onMenuStateChange: (open) => menuStates.push(open),
    onRegionSelect: (regionId) => selections.push(regionId),
    progressStore: {
      getCompletedRegionIds: () => [...completed],
      reset: (confirmed) => {
        resetCalls += Number(confirmed);
        if (confirmed) completed.clear();
        return confirmed;
      },
    },
    regions: REGIONS,
  });
  return { elements, guide, menuStates, selections, get resetCalls() { return resetCalls; } };
}

describe("field guide state", () => {
  test("Given five catalogue IDs, When guide state is created, Then selection starts empty and progress is padded", () => {
    const state = createFieldGuideState(REGIONS.map((region) => region.id));

    expect(state).toEqual({ completedRegionIds: [], mobileMenuOpen: false, resetConfirmationOpen: false, selectedRegionId: null });
    expect(formatProgress(0, 5)).toBe("00/05");
    expect(formatProgress(5, 5)).toBe("05/05");
  });

  test("Given the rendered guide, When each catalogue button activates, Then only list activation selects ordered regions", () => {
    const fixture = createFixture();
    const buttons = fixture.elements.get("#field-guide .region-list").children;

    expect(buttons).toHaveLength(5);
    expect(buttons.map((button) => button.dataset.regionId)).toEqual(["forest", "city", "desert", "snow", "coast"]);
    for (const button of buttons) button.emit("click");
    expect(fixture.selections).toEqual(["forest", "city", "desert", "snow", "coast"]);
    expect(fixture.guide.selectRegion("not-a-region")).toBe(false);
    expect(fixture.selections).toHaveLength(5);
  });

  test("Given completion and initial selection, When the adapter renders and focuses, Then selected and completed semantics are observable", () => {
    const fixture = createFixture();
    const [forest, city] = fixture.elements.get("#field-guide .region-list").children;

    fixture.guide.focusInitialRegion();
    fixture.guide.selectRegion("city", city);

    expect(forest.getAttribute("aria-label")).toContain("완료");
    expect(city.getAttribute("aria-pressed")).toBe("true");
    expect(fixture.elements.get("#guide-completion").textContent).toBe("02/05");
    expect(fixture.elements.get("#completion-count").textContent).toBe("02/05");
    expect(forest.focused).toBe(true);
  });

  test("Given the desktop guide is hidden, When initial focus is assigned, Then the first visible mobile region button receives focus", () => {
    const fixture = createFixture();
    const forest = fixture.elements.get("#field-guide .region-list").children[0];
    const trigger = fixture.elements.get("#mobile-regions-trigger");
    const mobileForest = fixture.elements.get("[data-mobile-region-list]").children[0];
    forest.checkVisibility = () => false;

    fixture.guide.focusInitialRegion();

    expect(forest.focused).toBe(false);
    expect(trigger.focused).toBe(false);
    expect(fixture.guide.getState().mobileMenuOpen).toBe(true);
    expect(fixture.elements.get("#mobile-region-panel").hidden).toBe(false);
    expect(mobileForest.focused).toBe(true);
    expect(mobileForest.focusOptions).toEqual({ preventScroll: true });
  });

  test("Given a mobile menu opener, When B closes the menu, Then movement is blocked only while open and focus returns to its owner", () => {
    const fixture = createFixture();
    const trigger = fixture.elements.get("#mobile-regions-trigger");

    trigger.emit("click");
    expect(fixture.guide.isMovementBlocked()).toBe(true);
    expect(fixture.guide.handleAction("up")).toBe(true);
    expect(fixture.guide.getFocusOwner()).toBe(trigger);
    expect(fixture.guide.handleAction("B")).toBe(true);

    expect(fixture.guide.isMovementBlocked()).toBe(false);
    expect(trigger.focused).toBe(true);
    expect(fixture.menuStates).toEqual([true, false]);
    expect(fixture.elements.get("#mobile-region-panel").hidden).toBe(true);
  });

  test("Given an open mobile menu, When a valid mobile region is selected, Then it closes, returns focus, and selects only that region", () => {
    const fixture = createFixture();
    const trigger = fixture.elements.get("#mobile-regions-trigger");
    trigger.emit("click");
    fixture.elements.get("[data-mobile-region-list]").children[3].emit("click");

    expect(fixture.selections).toEqual(["snow"]);
    expect(fixture.guide.getState().mobileMenuOpen).toBe(false);
    expect(trigger.focused).toBe(true);
  });

  test("Given completed progress, When reset is cancelled then confirmed, Then only confirmation clears and announces the result", () => {
    const fixture = createFixture();
    fixture.elements.get("#reset-trigger").emit("click");
    fixture.elements.get("[data-reset-cancel]").emit("click");
    expect(fixture.resetCalls).toBe(0);

    fixture.elements.get("#reset-trigger").emit("click");
    fixture.elements.get("[data-reset-confirm]").emit("click");

    expect(fixture.resetCalls).toBe(1);
    expect(fixture.elements.get("#guide-completion").textContent).toBe("00/05");
    expect(fixture.elements.get("#app-status").textContent).toContain("초기화");
    expect(fixture.elements.get("#reset-trigger").focused).toBe(true);
  });

  test("Given malformed pointer and keyboard events, When they reach the adapter, Then no region selection or mode change occurs", () => {
    const fixture = createFixture();
    const desktopList = fixture.elements.get("#field-guide .region-list");

    desktopList.emit("click", { currentTarget: desktopList, target: { dataset: { regionId: "unknown" } } });
    expect(fixture.guide.handleAction("up")).toBe(false);

    expect(fixture.selections).toEqual([]);
    expect(fixture.guide.getState().mobileMenuOpen).toBe(false);
  });
});
