import { createDialogueMachine } from "./dialogue-state.js";

const STAGES = Object.freeze(["problem", "approach", "result"]);
const ADVANCE_ACTIONS = new Set(["A", "a", "Enter", " ", "Space"]);
const BACK_ACTIONS = new Set(["B", "b", "Escape"]);

export function createDialogueBox({
  root = document,
  onComplete = () => {},
  onModeChange = () => {},
  onOpenProject = () => {},
} = {}) {
  const box = root.querySelector("#dialogue-box");
  const speaker = root.querySelector("#dialogue-speaker");
  const progress = root.querySelector("#dialogue-progress");
  const copy = root.querySelector("#dialogue-copy");
  const actions = root.querySelector(".dialogue-actions");
  const stageElements = [...root.querySelectorAll("[data-dialogue-stage]")];
  const ownerDocument = root.ownerDocument ?? root;
  const completedProjectIds = new Set();
  let machine = null;
  let resident = null;
  let invokingControl = null;

  box.setAttribute("aria-live", "polite");

  function render() {
    const { stage } = machine.getState();
    const stageIndex = STAGES.indexOf(stage);
    box.hidden = stage === "closed";
    if (box.hidden) return;

    const lines = resident.dialogue[stage].lines;
    speaker.textContent = resident.role;
    progress.textContent = `0${stageIndex + 1}/03`;
    copy.replaceChildren(...lines.flatMap((line, index) => (
      index === 0
        ? [ownerDocument.createTextNode(line)]
        : [ownerDocument.createElement("br"), ownerDocument.createTextNode(line)]
    )));
    copy.dataset.lineCount = String(lines.length);
    actions.textContent = stage === "result"
      ? "A 기록 자세히 보기 · B 대화 끝내기"
      : "A 다음 · B 닫기";

    for (const element of stageElements) {
      if (element.dataset.dialogueStage === stage) {
        element.setAttribute("aria-current", "step");
      } else {
        element.removeAttribute("aria-current");
      }
    }
  }

  function open(request = {}) {
    const {
      completed = false,
      invokingControl: nextInvokingControl = null,
      isAdjacent,
      isFacing,
      resident: nextResident,
    } = request ?? {};
    const hasValidDialogue = (
      nextResident !== null
      && typeof nextResident === "object"
      && typeof nextResident.projectId === "string"
      && typeof nextResident.role === "string"
      && STAGES.every((stage) => {
        const lines = nextResident.dialogue?.[stage]?.lines;
        return Array.isArray(lines)
          && lines.length >= 2
          && lines.length <= 4
          && lines.every((line) => typeof line === "string");
      })
    );
    if (isAdjacent !== true || isFacing !== true || !hasValidDialogue) return false;

    resident = nextResident;
    invokingControl = nextInvokingControl;
    machine = createDialogueMachine({
      completed: completed || completedProjectIds.has(resident.projectId),
      onComplete: () => {
        completedProjectIds.add(resident.projectId);
        onComplete(resident.projectId);
      },
      onProjectIntroduction: () => onOpenProject({
        invokingControl,
        projectId: resident.projectId,
      }),
    });
    machine.open();
    render();
    onModeChange("dialogue");
    return true;
  }

  function advance() {
    if (!machine || machine.getState().stage === "closed") return false;
    machine.advance();
    render();
    return true;
  }

  function close() {
    if (!machine || machine.getState().stage === "closed") return false;
    machine.close();
    render();
    onModeChange("map");
    return true;
  }

  function closeProject() {
    if (!machine?.getState().projectIntroductionOpen) return false;
    machine.back();
    render();
    return true;
  }

  function handleAction(action, sourceControl = null) {
    if (!machine || machine.getState().stage === "closed") return false;
    if (BACK_ACTIONS.has(action)) return close();
    if (!ADVANCE_ACTIONS.has(action)) return true;

    if (machine.getState().stage === "result") {
      invokingControl = sourceControl ?? invokingControl;
      return machine.openProjectIntroduction();
    }
    return advance();
  }

  return Object.freeze({
    advance,
    close,
    closeProject,
    handleAction,
    isOpen: () => machine?.getState().stage !== "closed" && machine !== null,
    open,
  });
}
