import { describe, expect, test } from "bun:test";

import { createApplication } from "../preview/main.js";
import { PROGRESS_STORAGE_KEY } from "../preview/progress-store.js";
import { REGIONS, isWalkableTile } from "../preview/region-data.js";

const projects = await Bun.file(new URL("../preview/projects.json", import.meta.url)).json();

// allow: SIZE_OK — the DOM/canvas harness and full five-region journey form one integration artifact.
class FakeTarget {
  constructor() {
    this.listeners = new Map();
  }

  addEventListener(type, listener) {
    this.listeners.set(type, [...(this.listeners.get(type) ?? []), listener]);
  }

  removeEventListener(type, listener) {
    this.listeners.set(
      type,
      (this.listeners.get(type) ?? []).filter((candidate) => candidate !== listener),
    );
  }

  emit(type, event = {}) {
    for (const listener of this.listeners.get(type) ?? []) {
      listener({ currentTarget: this, preventDefault() {}, target: this, ...event });
    }
  }

  listenerCount() {
    return [...this.listeners.values()].flat().length;
  }
}

class FakeElement extends FakeTarget {
  constructor(ownerDocument, tagName = "div") {
    super();
    this.ownerDocument = ownerDocument;
    this.tagName = tagName.toUpperCase();
    this.attributes = new Map();
    this.children = [];
    this.dataset = {};
    this.disabled = false;
    this.hidden = false;
    this.open = false;
    this.textContent = "";
    this.queries = new Map();
  }

  append(...children) {
    for (const child of children) child.parentElement = this;
    this.children.push(...children);
  }

  checkVisibility() {
    return this.parentElement?.visible !== false;
  }

  click() {
    if (!this.disabled) this.emit("click");
  }

  close() {
    if (!this.open) return;
    this.open = false;
    this.emit("close");
  }

  focus() {
    this.ownerDocument.activeElement = this;
  }

  getAttribute(name) {
    return this.attributes.get(name) ?? null;
  }

  querySelector(selector) {
    return this.queries.get(selector) ?? null;
  }

  removeAttribute(name) {
    this.attributes.delete(name);
  }

  replaceChildren(...children) {
    this.children = children;
    this.textContent = children.map((child) => child.textContent).join("");
  }

  setAttribute(name, value) {
    this.attributes.set(name, String(value));
  }

  showModal() {
    this.open = true;
  }
}

function createStorage(serialized = null) {
  const values = new Map(serialized === null ? [] : [[PROGRESS_STORAGE_KEY, serialized]]);
  return {
    getItem: (key) => values.get(key) ?? null,
    removeItem: (key) => values.delete(key),
    setItem: (key, value) => values.set(key, value),
    value: (key) => values.get(key) ?? null,
  };
}

function createSurface({ desktopGuideVisible = true, reduced = false } = {}) {
  const document = new FakeTarget();
  document.activeElement = null;
  document.body = new FakeElement(document, "body");
  document.body.dataset = {};
  const elements = new Map();
  const add = (selector, tagName = "div") => {
    const element = new FakeElement(document, tagName);
    elements.set(selector, element);
    return element;
  };
  add(".game-shell", "main");
  const canvas = add("#map-canvas", "canvas");
  const context = {
    fillRectCalls: 0,
    fillStyle: "",
    imageSmoothingEnabled: true,
    fillRect() {
      this.fillRectCalls += 1;
    },
  };
  canvas.getContext = () => context;
  add("#initial-region-selection", "section");
  add("#current-region", "strong");
  add("#position-status", "strong");
  add("#interaction-status", "strong");
  add("#app-status", "p");
  add("#load-error", "div");
  add("#reload-data", "button");
  for (const id of ["move-up", "move-down", "move-left", "move-right", "action-a", "action-b"]) {
    add(`#${id}`, "button");
  }
  const desktopGuide = add("#field-guide .region-list", "nav");
  desktopGuide.visible = desktopGuideVisible;
  add("[data-mobile-region-list]");
  add("#mobile-region-panel", "section");
  add("#mobile-regions-trigger", "button");
  add("[data-mobile-menu-close]", "button");
  add("#reset-trigger", "button");
  add("#reset-confirmation", "fieldset");
  add("[data-reset-confirm]", "button");
  add("[data-reset-cancel]", "button");
  add("#guide-completion", "strong");
  add("#completion-count", "strong");
  add("#dialogue-box", "section").hidden = true;
  add("#dialogue-speaker", "strong");
  add("#dialogue-progress", "span");
  add("#dialogue-copy", "p");
  add(".dialogue-actions", "p");
  const stages = ["problem", "approach", "result"].map((stage) => {
    const element = new FakeElement(document, "li");
    element.dataset.dialogueStage = stage;
    return element;
  });
  const dialog = add("#project-dialog", "dialog");
  const dialogClose = add("[data-dialog-close]", "button");
  for (const selector of [
    "#project-meta",
    "#project-title",
    "#project-summary",
    "#project-highlights",
    "#project-stack",
  ]) {
    dialog.queries.set(selector, add(selector));
  }
  dialog.queries.set("[data-dialog-close]", dialogClose);
  document.createElement = (tagName) => new FakeElement(document, tagName);
  document.createTextNode = (textContent) => ({ textContent });
  document.querySelector = (selector) => elements.get(selector) ?? null;
  document.querySelectorAll = (selector) => {
    if (selector === "[data-dialogue-stage]") return stages;
    if (selector.startsWith("[data-mobile-region-list]")) {
      return elements.get("[data-mobile-region-list]").children;
    }
    if (selector.startsWith("#field-guide .region-list")) {
      return elements.get("#field-guide .region-list").children;
    }
    return [];
  };
  const media = new FakeTarget();
  media.matches = reduced;
  const window = new FakeTarget();
  window.matchMedia = () => media;
  return { canvas, context, document, elements, media, window };
}

function shortestActions(region) {
  const queue = [{ ...region.start, actions: [] }];
  const seen = new Set([`${region.start.x},${region.start.y}`]);
  const steps = [
    ["up", 0, -1],
    ["right", 1, 0],
    ["down", 0, 1],
    ["left", -1, 0],
  ];
  for (let index = 0; index < queue.length; index += 1) {
    const current = queue[index];
    if (current.x === region.interaction.x && current.y === region.interaction.y) {
      return current.actions;
    }
    for (const [action, deltaX, deltaY] of steps) {
      const x = current.x + deltaX;
      const y = current.y + deltaY;
      const key = `${x},${y}`;
      if (!seen.has(key) && isWalkableTile(region.tiles[y]?.[x])) {
        seen.add(key);
        queue.push({ x, y, actions: [...current.actions, action] });
      }
    }
  }
  throw new Error(`No route for ${region.id}`);
}

function press(window, code) {
  window.emit("keydown", { code, repeat: false });
  window.emit("keyup", { code });
}

describe("classic RPG application integration", () => {
  test("Given the untouched initial screen, When records load, Then no region theme is applied until selection", async () => {
    // Given: the neutral initial selection surface
    const surface = createSurface();

    // When: records finish loading without selecting a region
    const app = await createApplication({
      document: surface.document,
      loadProjects: async () => projects,
      storage: createStorage(),
      window: surface.window,
    });

    // Then: the map stays unthemed until an explicit list choice applies the city palette
    expect(surface.elements.get(".game-shell").dataset.theme).toBeUndefined();
    surface.elements.get("#field-guide .region-list").children[1].click();
    expect(surface.elements.get(".game-shell").dataset.theme).toBe("city");
    app.destroy();
  });

  test("Given malformed resolved records, When startup validation runs, Then Korean retry UI blocks the application", async () => {
    // Given: every project-dialog boundary violated independently
    const malformedRecords = [
      { ...projects, forest: { ...projects.forest, title: 42 } },
      { ...projects, city: { ...projects.city, highlights: ["하나", "둘"] } },
      { ...projects, desert: { ...projects.desert, stack: [] } },
      { ...projects, snow: { ...projects.snow, summary: null } },
      { ...projects, coast: { ...projects.coast, role: undefined } },
      { ...projects, extra: projects.forest },
    ];

    // When: each resolved payload crosses the application boundary
    for (const records of malformedRecords) {
      const surface = createSurface();
      const app = await createApplication({
        document: surface.document,
        loadProjects: async () => records,
        storage: createStorage(),
        window: surface.window,
      });

      // Then: malformed data never reaches dialogue and exposes the Korean retry surface
      expect(app.getState().mode).toBe("error");
      expect(surface.elements.get("#load-error").hidden).toBe(false);
      expect(surface.elements.get("#reload-data").disabled).toBe(false);
      expect(surface.elements.get("#app-status").textContent)
        .toBe("지역 기록을 불러오지 못했습니다. 다시 불러오기를 선택하세요.");
      app.destroy();
    }
  });

  test("Given an in-flight reload, When the application is destroyed before resolution, Then settled data cannot mutate the surface", async () => {
    // Given: a ready application and a controlled second request
    const surface = createSurface();
    const pending = Promise.withResolvers();
    let requests = 0;
    const app = await createApplication({
      document: surface.document,
      loadProjects: () => {
        requests += 1;
        return requests === 1 ? Promise.resolve(projects) : pending.promise;
      },
      storage: createStorage(),
      window: surface.window,
    });
    const reloadResult = app.reload();
    expect(app.destroy()).toBe(true);
    const afterDestroy = {
      actionDisabled: surface.elements.get("#action-a").disabled,
      errorHidden: surface.elements.get("#load-error").hidden,
      mode: app.getState().mode,
      reloadDisabled: surface.elements.get("#reload-data").disabled,
      shellState: surface.elements.get(".game-shell").dataset.state,
      status: surface.elements.get("#app-status").textContent,
    };

    // When: the request resolves after all application owners are destroyed
    pending.resolve(projects);

    // Then: the async continuation reports cancellation and performs no late mutation
    expect(await reloadResult).toBe(false);
    expect({
      actionDisabled: surface.elements.get("#action-a").disabled,
      errorHidden: surface.elements.get("#load-error").hidden,
      mode: app.getState().mode,
      reloadDisabled: surface.elements.get("#reload-data").disabled,
      shellState: surface.elements.get(".game-shell").dataset.state,
      status: surface.elements.get("#app-status").textContent,
    }).toEqual(afterDestroy);
  });

  test("Given a mobile initial selection, When records load successfully, Then the visible mobile guide owns selection input", async () => {
    // Given: the desktop guide is hidden by the mobile breakpoint
    const surface = createSurface({ desktopGuideVisible: false });

    // When: application records finish loading
    const app = await createApplication({
      document: surface.document,
      loadProjects: async () => projects,
      storage: createStorage(),
      window: surface.window,
    });
    const mobileList = surface.elements.get("[data-mobile-region-list]");

    // Then: initial focus and directional/A ownership stay with the visible mobile list
    expect(app.getState().mode).toBe("mobile-menu");
    expect(surface.elements.get("#mobile-region-panel").hidden).toBe(false);
    expect(surface.document.activeElement).toBe(mobileList.children[0]);
    expect(app.handleAction("down")).toBe(true);
    expect(surface.document.activeElement).toBe(mobileList.children[1]);
    expect(app.handleAction("A")).toBe(true);
    expect(app.getState()).toMatchObject({ mode: "map", regionId: "city" });
    app.destroy();
  });

  test("Given a mobile initial selection, When record loading fails, Then the error mode stays visible without opening the menu", async () => {
    // Given: the desktop guide is hidden by the mobile breakpoint
    const surface = createSurface({ desktopGuideVisible: false });

    // When: application records reject during startup
    const app = await createApplication({
      document: surface.document,
      loadProjects: async () => { throw new TypeError("network failure"); },
      storage: createStorage(),
      window: surface.window,
    });

    // Then: the error surface remains the input owner and the mobile panel stays closed
    expect(app.getState().mode).toBe("error");
    expect(surface.elements.get("#mobile-region-panel").hidden).toBe(true);
    expect(surface.elements.get("#mobile-regions-trigger").getAttribute("aria-expanded")).toBe("false");
    app.destroy();
  });

  test("Given unchanged blocked-facing state, When the same blocked movement repeats, Then only the first facing change redraws", async () => {
    // Given: forest starts facing down with blocked terrain directly north
    const surface = createSurface();
    const app = await createApplication({
      document: surface.document,
      loadProjects: async () => projects,
      storage: createStorage(),
      window: surface.window,
    });
    surface.elements.get("#field-guide .region-list").children[0].click();
    const before = surface.context.fillRectCalls;

    // When: north is pressed twice without any intervening state change
    app.handleAction("up");
    const afterFacingChange = surface.context.fillRectCalls;
    const firstState = app.getState().tileState;
    app.handleAction("up");

    // Then: facing changes/render once, while the deep-identical repeat is ignored
    expect(afterFacingChange).toBeGreaterThan(before);
    expect(app.getState().tileState).toEqual(firstState);
    expect(surface.context.fillRectCalls).toBe(afterFacingChange);
    app.destroy();
  });

  test("Given valid records, When every region journey completes, Then state, rendering, dialogue, records, and session progress stay integrated", async () => {
    // Given: a real application graph over deterministic DOM, canvas, and session adapters
    const surface = createSurface({ reduced: true });
    const storage = createStorage();
    const app = await createApplication({
      document: surface.document,
      loadProjects: async () => projects,
      storage,
      window: surface.window,
    });
    const list = surface.elements.get("#field-guide .region-list");
    const expectedInteractionStatuses = [
      "데이터 연구원과 대화할 수 있습니다",
      "제품 기술자와 대화할 수 있습니다",
      "자동화 장인과 대화할 수 있습니다",
      "운영 관제사와 대화할 수 있습니다",
      "협업 안내원과 대화할 수 있습니다",
    ];

    // When: each list-only region is selected and its resident flow is completed
    for (const [index, region] of REGIONS.entries()) {
      list.children[index].click();
      expect(app.getState().regionId).toBe(region.id);
      expect(app.getState().tileState.player).toEqual({ ...region.start, facing: "down" });
      expect(surface.elements.get(".game-shell").dataset.theme).toBe(region.id);
      const drawCount = surface.context.fillRectCalls;
      app.handleAction("B");
      expect(surface.context.fillRectCalls).toBe(drawCount);
      for (const action of shortestActions(region)) app.handleAction(action);
      app.handleAction("right");
      expect(surface.elements.get("#interaction-status").textContent)
        .toBe(expectedInteractionStatuses[index]);
      press(surface.window, "Enter");
      const position = surface.elements.get("#position-status").textContent;
      const dialogueDrawCount = surface.context.fillRectCalls;
      press(surface.window, "ArrowUp");
      expect(surface.elements.get("#position-status").textContent).toBe(position);
      expect(surface.context.fillRectCalls).toBe(dialogueDrawCount);
      press(surface.window, "Enter");
      press(surface.window, "Enter");
      if (index === 0) {
        press(surface.window, "Enter");
        expect(surface.elements.get("#project-dialog").open).toBe(true);
        surface.elements.get("[data-dialog-close]").click();
        expect(surface.elements.get("#project-dialog").open).toBe(false);
        press(surface.window, "Enter");
        press(surface.window, "Escape");
        press(surface.window, "Enter");
        surface.elements.get("#project-dialog").emit("click", {
          target: surface.elements.get("#project-dialog"),
        });
        expect(surface.elements.get("#project-dialog").open).toBe(false);
      }
      press(surface.window, "Escape");
    }

    // Then: all completion IDs persisted once and the runtime stayed immediate
    expect(JSON.parse(storage.value(PROGRESS_STORAGE_KEY)).completedRegionIds)
      .toEqual(REGIONS.map(({ id }) => id));
    expect(surface.elements.get("#guide-completion").textContent).toBe("05/05");
    surface.elements.get("#reset-trigger").click();
    surface.elements.get("[data-reset-confirm]").click();
    expect(surface.elements.get("#guide-completion").textContent).toBe("00/05");
    expect(storage.value(PROGRESS_STORAGE_KEY)).toBeNull();
    expect(surface.elements.get(".game-shell").dataset.reducedMotion).toBe("true");
    expect(app.destroy()).toBe(true);
    expect(surface.window.listenerCount()).toBe(0);
    expect(surface.document.listenerCount()).toBe(0);
    expect(surface.media.listenerCount()).toBe(0);
    expect(surface.elements.get("#reload-data").listenerCount()).toBe(0);
    expect(surface.elements.get("#project-dialog").listenerCount()).toBe(0);
    expect(surface.elements.get("[data-dialog-close]").listenerCount()).toBe(0);
    expect(list.children.every((button) => button.listenerCount() === 0)).toBe(true);
    expect(Object.values({
      a: surface.elements.get("#action-a"),
      b: surface.elements.get("#action-b"),
      down: surface.elements.get("#move-down"),
      left: surface.elements.get("#move-left"),
      right: surface.elements.get("#move-right"),
      up: surface.elements.get("#move-up"),
    }).every((button) => button.listenerCount() === 0)).toBe(true);
  });

  test("Given saved or malformed session data, When a fresh application loads, Then completion recovers without restoring a region", async () => {
    // Given: one valid completed payload and one corrupt payload
    const payloads = [
      JSON.stringify({ version: 1, completedRegionIds: ["coast", "forest"] }),
      "{malformed",
    ];

    // When: separate application sessions load each payload
    const states = [];
    for (const payload of payloads) {
      const surface = createSurface();
      const app = await createApplication({
        document: surface.document,
        loadProjects: async () => projects,
        storage: createStorage(payload),
        window: surface.window,
      });
      states.push({
        focused: surface.document.activeElement?.dataset.regionId,
        progress: surface.elements.get("#guide-completion").textContent,
        regionId: app.getState().regionId,
      });
      app.destroy();
    }

    // Then: only allowlisted progress returns while selection always starts empty
    expect(states).toEqual([
      { focused: "forest", progress: "02/05", regionId: null },
      { focused: "forest", progress: "00/05", regionId: null },
    ]);
  });

  test("Given throwing storage accessors, When completion and confirmed reset run, Then the in-memory application remains usable", async () => {
    // Given: storage whose read, write, and removal accessors are unavailable
    const throwingStorage = {};
    for (const method of ["getItem", "setItem", "removeItem"]) {
      Object.defineProperty(throwingStorage, method, {
        get() {
          throw new DOMException(`${method} blocked`);
        },
      });
    }
    const surface = createSurface();
    const app = await createApplication({
      document: surface.document,
      loadProjects: async () => projects,
      storage: throwingStorage,
      window: surface.window,
    });
    const forest = REGIONS[0];
    surface.elements.get("#field-guide .region-list").children[0].click();

    // When: the resident result completes and the two-step reset is confirmed
    for (const action of shortestActions(forest)) app.handleAction(action);
    app.handleAction("right");
    press(surface.window, "Enter");
    press(surface.window, "Enter");
    press(surface.window, "Enter");
    surface.elements.get("#reset-trigger").click();
    surface.elements.get("[data-reset-confirm]").click();

    // Then: exceptions remain contained and the live guide resets normally
    expect(surface.elements.get("#guide-completion").textContent).toBe("00/05");
    expect(app.getState().regionId).toBe("forest");
    app.destroy();
  });

  test("Given a failed project request, When reload succeeds, Then Korean recovery UI blocks play but preserves region navigation", async () => {
    // Given: a fetch seam returning HTTP 500 before a valid response
    const surface = createSurface();
    let succeeds = false;
    const mockedFetch = async () => succeeds
      ? new Response(JSON.stringify(projects), { status: 200 })
      : new Response("failure", { status: 500 });
    const app = await createApplication({
      document: surface.document,
      loadProjects: async () => {
        const response = await mockedFetch();
        if (!response.ok) throw new Error(String(response.status));
        return response.json();
      },
      storage: createStorage(),
      window: surface.window,
    });
    const failure = {
      actionDisabled: surface.elements.get("#action-a").disabled,
      errorVisible: !surface.elements.get("#load-error").hidden,
      koreanStatus: surface.elements.get("#app-status").textContent,
      mode: app.getState().mode,
    };

    // When: play is attempted in the error state, then data reloads
    const list = surface.elements.get("#field-guide .region-list");
    list.children[1].click();
    press(surface.window, "ArrowUp");
    succeeds = true;
    const recovered = await app.reload();

    // Then: the failure was visible/blocked and recovery leaves initial navigation stable
    expect(failure).toEqual({
      actionDisabled: true,
      errorVisible: true,
      koreanStatus: "지역 기록을 불러오지 못했습니다. 다시 불러오기를 선택하세요.",
      mode: "error",
    });
    expect(recovered).toBe(true);
    expect(surface.elements.get("#load-error").hidden).toBe(true);
    expect(surface.elements.get("#action-a").disabled).toBe(false);
    expect(list.children).toHaveLength(5);
    expect(list.children.every((button) => button.disabled === false)).toBe(true);
    expect(app.getState()).toMatchObject({ mode: "initial-selection", regionId: null });
    app.destroy();
  });
});
