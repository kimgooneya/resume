const STAGES = Object.freeze(["closed", "problem", "approach", "result"]);

function snapshot(stage, projectIntroductionOpen) {
  return Object.freeze({ stage, projectIntroductionOpen });
}

export function createDialogueMachine({
  completed = false,
  onComplete = () => {},
  onProjectIntroduction = () => {},
} = {}) {
  let stage = STAGES[0];
  let projectIntroductionOpen = false;
  let completionEmitted = completed;

  function getState() {
    return snapshot(stage, projectIntroductionOpen);
  }

  function open() {
    if (stage === "closed") stage = "problem";
    return getState();
  }

  function advance() {
    if (stage === "problem") {
      stage = "approach";
    } else if (stage === "approach") {
      stage = "result";
      if (!completionEmitted) {
        completionEmitted = true;
        onComplete();
      }
    }
    return getState();
  }

  function close() {
    stage = "closed";
    projectIntroductionOpen = false;
    return getState();
  }

  function back() {
    if (projectIntroductionOpen) {
      projectIntroductionOpen = false;
      return getState();
    }
    return close();
  }

  function openProjectIntroduction() {
    if (stage !== "result" || projectIntroductionOpen) return false;
    projectIntroductionOpen = true;
    onProjectIntroduction();
    return true;
  }

  return Object.freeze({
    advance,
    back,
    close,
    getState,
    open,
    openProjectIntroduction,
  });
}
