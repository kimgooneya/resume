import { describe, expect, test } from "bun:test";

import { createDialogueBox } from "../preview/dialogue-box.js";
import { REGIONS_BY_ID } from "../preview/region-data.js";

class FakeElement {
  constructor() {
    this.attributes = new Map();
    this.dataset = {};
    this.hidden = false;
    this.textContent = "";
    this.children = [];
  }

  getAttribute(name) {
    return this.attributes.get(name) ?? null;
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
}

function createDialogueFixture() {
  const elements = {
    "#dialogue-box": new FakeElement(),
    "#dialogue-speaker": new FakeElement(),
    "#dialogue-progress": new FakeElement(),
    "#dialogue-copy": new FakeElement(),
    ".dialogue-actions": new FakeElement(),
  };
  elements["#dialogue-box"].hidden = true;
  const stageElements = ["problem", "approach", "result"].map((stage) => {
    const element = new FakeElement();
    element.dataset.dialogueStage = stage;
    return element;
  });
  const root = {
    ownerDocument: {
      createElement: (tagName) => ({ tagName: tagName.toUpperCase(), textContent: "\n" }),
      createTextNode: (textContent) => ({ textContent }),
    },
    querySelector: (selector) => elements[selector],
    querySelectorAll: (selector) => selector === "[data-dialogue-stage]" ? stageElements : [],
  };
  return { elements, root, stageElements };
}

describe("resident dialogue box", () => {
  test("Given ineligible positions, When dialogue is requested, Then it stays closed", () => {
    // Given: an authored resident and a dialogue surface
    const { elements, root } = createDialogueFixture();
    const dialogue = createDialogueBox({ root });
    const resident = REGIONS_BY_ID.forest.resident;

    // When: adjacency or facing eligibility is absent
    const outcomes = [
      dialogue.open({ resident, isAdjacent: false, isFacing: true }),
      dialogue.open({ resident, isAdjacent: true, isFacing: false }),
      dialogue.open({ resident }),
    ];

    // Then: no request opens the dialogue
    expect(outcomes).toEqual([false, false, false]);
    expect(elements["#dialogue-box"].hidden).toBe(true);
    expect(dialogue.isOpen()).toBe(false);
  });

  test("Given malformed resident boundaries, When eligible dialogue is requested, Then it returns false without throwing", () => {
    // Given: malformed shapes at each resident dialogue boundary
    const invalidResidents = [
      null,
      {},
      { projectId: "forest", role: "연구원", dialogue: {} },
      {
        projectId: "forest",
        role: "연구원",
        dialogue: {
          problem: { lines: ["하나", "둘"] },
          approach: { lines: null },
          result: { lines: ["하나", "둘"] },
        },
      },
    ];

    // When: each otherwise-eligible request reaches the UI boundary
    const outcomes = invalidResidents.map((resident) => {
      const { root } = createDialogueFixture();
      return createDialogueBox({ root }).open({
        isAdjacent: true,
        isFacing: true,
        resident,
      });
    });

    // Then: malformed input is rejected as data, not raised as a runtime error
    expect(outcomes).toEqual([false, false, false, false]);
  });

  test("Given an eligible resident, When dialogue opens, Then Korean role, lines, stage, and hints render", () => {
    // Given: the forest resident and a dialogue surface
    const { elements, root, stageElements } = createDialogueFixture();
    const modes = [];
    const dialogue = createDialogueBox({ root, onModeChange: (mode) => modes.push(mode) });
    const resident = REGIONS_BY_ID.forest.resident;

    // When: the caller proves adjacency and facing
    const opened = dialogue.open({ resident, isAdjacent: true, isFacing: true });

    // Then: the first authored stage is exposed accessibly
    expect(opened).toBe(true);
    expect(elements["#dialogue-box"].hidden).toBe(false);
    expect(elements["#dialogue-box"].getAttribute("aria-live")).toBe("polite");
    expect(elements["#dialogue-speaker"].textContent).toBe("데이터 연구원");
    expect(elements["#dialogue-copy"].textContent.split("\n")).toEqual(
      resident.dialogue.problem.lines,
    );
    expect(elements["#dialogue-copy"].dataset.lineCount).toBe("2");
    expect(elements["#dialogue-copy"].children.filter(({ tagName }) => tagName === "BR"))
      .toHaveLength(1);
    expect(elements["#dialogue-progress"].textContent).toBe("01/03");
    expect(elements[".dialogue-actions"].textContent).toBe("A 다음 · B 닫기");
    expect(stageElements[0].getAttribute("aria-current")).toBe("step");
    expect(modes).toEqual(["dialogue"]);
  });

  test("Given open dialogue, When A, Enter, or Space advances, Then result completes once", () => {
    // Given: three fresh eligible dialogues and completion observers
    const actions = ["A", "Enter", " "];
    const results = actions.map((action) => {
      const { elements, root } = createDialogueFixture();
      const completed = [];
      const dialogue = createDialogueBox({
        root,
        onComplete: (projectId) => completed.push(projectId),
      });
      dialogue.open({
        resident: REGIONS_BY_ID.city.resident,
        isAdjacent: true,
        isFacing: true,
      });

      // When: the action advances into approach and then result
      dialogue.handleAction(action);
      dialogue.handleAction(action);

      // Then: result-stage rendering and completion are observable
      return {
        actions: elements[".dialogue-actions"].textContent,
        completed,
        progress: elements["#dialogue-progress"].textContent,
      };
    });

    expect(results).toEqual(actions.map(() => ({
      actions: "A 기록 자세히 보기 · B 대화 끝내기",
      completed: ["city"],
      progress: "03/03",
    })));
  });

  test("Given result dialogue, When A is pressed, Then the optional record gets the exact control", () => {
    // Given: a dialogue at result and a concrete A control
    const { root } = createDialogueFixture();
    const requests = [];
    const dialogue = createDialogueBox({
      root,
      onOpenProject: (request) => requests.push(request),
    });
    const actionControl = { id: "action-a" };
    dialogue.open({
      resident: REGIONS_BY_ID.desert.resident,
      isAdjacent: true,
      isFacing: true,
    });
    dialogue.advance();
    dialogue.advance();

    // When: A repeats while open, then requests again after the record closes
    const outcomes = [
      dialogue.handleAction("A", actionControl),
      dialogue.handleAction("A", actionControl),
      dialogue.closeProject(),
      dialogue.handleAction("A", actionControl),
    ];

    // Then: each real opening preserves the exact invoking object
    expect(outcomes).toEqual([true, false, true, true]);
    expect(requests).toEqual([
      { invokingControl: actionControl, projectId: "desert" },
      { invokingControl: actionControl, projectId: "desert" },
    ]);
  });

  test("Given an early or completed conversation, When B closes and it reopens, Then completion is not false or repeated", () => {
    // Given: one dialogue controller and completion observer
    const { root } = createDialogueFixture();
    const completed = [];
    const modes = [];
    const dialogue = createDialogueBox({
      root,
      onComplete: (projectId) => completed.push(projectId),
      onModeChange: (mode) => modes.push(mode),
    });
    const resident = REGIONS_BY_ID.snow.resident;
    dialogue.open({ resident, isAdjacent: true, isFacing: true });
    dialogue.advance();

    // When: it closes early, then is completed and revisited
    dialogue.handleAction("B");
    dialogue.open({ resident, isAdjacent: true, isFacing: true });
    dialogue.advance();
    dialogue.advance();
    dialogue.close();
    dialogue.open({ resident, isAdjacent: true, isFacing: true });
    dialogue.advance();
    dialogue.advance();

    // Then: only result entry completes and only once per project
    expect(completed).toEqual(["snow"]);
    expect(modes).toContain("map");
  });
});
