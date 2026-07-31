import { describe, expect, test } from "bun:test";

import { createDialogueMachine } from "../preview/dialogue-state.js";

describe("dialogue state machine", () => {
  test("advances from closed through all three dialogue stages", () => {
    // Given: a newly created dialogue
    const machine = createDialogueMachine();

    // When: it is opened and advanced twice
    const states = [machine.open(), machine.advance(), machine.advance()];

    // Then: the exact authored stage order is exposed
    expect(states.map(({ stage }) => stage)).toEqual(["problem", "approach", "result"]);
  });

  test("records completion exactly when result is entered", () => {
    // Given: an incomplete dialogue with a completion observer
    const completed = [];
    const machine = createDialogueMachine({ onComplete: () => completed.push("forest") });
    machine.open();
    machine.advance();

    // When: result is entered
    machine.advance();

    // Then: completion has fired exactly once
    expect(completed).toEqual(["forest"]);
  });

  test("does not record completion before result", () => {
    // Given: a dialogue that has only reached approach
    let completionCount = 0;
    const machine = createDialogueMachine({ onComplete: () => completionCount += 1 });
    machine.open();

    // When: the dialogue advances once
    machine.advance();

    // Then: completion has not fired
    expect(completionCount).toBe(0);
  });

  test("closes immediately on B before result without completing", () => {
    // Given: an incomplete dialogue at approach
    let completionCount = 0;
    const machine = createDialogueMachine({ onComplete: () => completionCount += 1 });
    machine.open();
    machine.advance();

    // When: B is pressed early
    const state = machine.back();

    // Then: dialogue closes without a completion
    expect(state).toEqual({ stage: "closed", projectIntroductionOpen: false });
    expect(completionCount).toBe(0);
  });

  test("reopens a cancelled dialogue from problem", () => {
    // Given: a dialogue closed early from approach
    const machine = createDialogueMachine();
    machine.open();
    machine.advance();
    machine.back();

    // When: the dialogue is opened again
    const state = machine.open();

    // Then: it restarts from problem
    expect(state.stage).toBe("problem");
  });

  test("does not repeat completion when result is revisited", () => {
    // Given: a dialogue that has already reached result once
    let completionCount = 0;
    const machine = createDialogueMachine({ onComplete: () => completionCount += 1 });
    machine.open();
    machine.advance();
    machine.advance();
    machine.back();

    // When: the completed dialogue is traversed again
    machine.open();
    machine.advance();
    machine.advance();

    // Then: the machine-level completion callback remains one-shot
    expect(completionCount).toBe(1);
  });

  test("does not emit completion for a previously completed region", () => {
    // Given: a revisit machine initialized as completed
    let completionCount = 0;
    const machine = createDialogueMachine({
      completed: true,
      onComplete: () => completionCount += 1,
    });

    // When: all dialogue stages are revisited
    machine.open();
    machine.advance();
    machine.advance();

    // Then: persisted completion is not emitted again
    expect(completionCount).toBe(0);
  });

  test("opens the optional project introduction only from result", () => {
    // Given: a dialogue at approach
    const machine = createDialogueMachine();
    machine.open();
    machine.advance();

    // When: project introduction is requested too early
    const opened = machine.openProjectIntroduction();

    // Then: the request is rejected and the stage remains unchanged
    expect(opened).toBe(false);
    expect(machine.getState()).toEqual({ stage: "approach", projectIntroductionOpen: false });
  });

  test("opens a project introduction idempotently without affecting completion", () => {
    // Given: a dialogue at result
    let completionCount = 0;
    let openCount = 0;
    const machine = createDialogueMachine({
      onComplete: () => completionCount += 1,
      onProjectIntroduction: () => openCount += 1,
    });
    machine.open();
    machine.advance();
    machine.advance();

    // When: the optional record is requested repeatedly
    const outcomes = [machine.openProjectIntroduction(), machine.openProjectIntroduction()];

    // Then: it opens once and completion remains tied to result entry
    expect(outcomes).toEqual([true, false]);
    expect(openCount).toBe(1);
    expect(completionCount).toBe(1);
  });

  test("B closes an open project introduction before closing dialogue", () => {
    // Given: a result dialogue with its project introduction open
    const machine = createDialogueMachine();
    machine.open();
    machine.advance();
    machine.advance();
    machine.openProjectIntroduction();

    // When: B is pressed once
    const state = machine.back();

    // Then: the record closes and the result dialogue remains
    expect(state).toEqual({ stage: "result", projectIntroductionOpen: false });
  });

  test("advance at result and close at closed are idempotent", () => {
    // Given: a dialogue at result
    const machine = createDialogueMachine();
    machine.open();
    machine.advance();
    machine.advance();

    // When: it is advanced again, then closed repeatedly
    const resultState = machine.advance();
    machine.close();
    const closedState = machine.close();

    // Then: terminal operations keep stable states
    expect(resultState.stage).toBe("result");
    expect(closedState).toEqual({ stage: "closed", projectIntroductionOpen: false });
  });
});
