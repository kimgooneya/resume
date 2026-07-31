const CLOSE_ACTIONS = new Set(["B", "b", "Escape"]);

export function createProjectDialog({
  root = document,
  onClose = () => {},
  onModeChange = () => {},
} = {}) {
  const dialog = root.querySelector("#project-dialog");
  const closeButton = dialog.querySelector("[data-dialog-close]");
  const ownerDocument = root.ownerDocument ?? root;
  const content = {
    meta: dialog.querySelector("#project-meta"),
    title: dialog.querySelector("#project-title"),
    summary: dialog.querySelector("#project-summary"),
    highlights: dialog.querySelector("#project-highlights"),
    stack: dialog.querySelector("#project-stack"),
  };
  let invokingControl = null;
  let returnMode = "dialogue";
  let destroyed = false;

  function close() {
    if (destroyed || !dialog.open) return false;
    dialog.close();
    return true;
  }

  function open(request = {}) {
    const {
      invokingControl: nextInvokingControl,
      project,
      returnMode: nextReturnMode = "dialogue",
    } = request ?? {};
    const hasValidProject = (
      project !== null
      && typeof project === "object"
      && ["role", "year", "title", "summary"].every(
        (field) => typeof project[field] === "string",
      )
      && Array.isArray(project.highlights)
      && project.highlights.length === 3
      && project.highlights.every((highlight) => typeof highlight === "string")
      && Array.isArray(project.stack)
      && project.stack.length > 0
      && project.stack.every((technology) => typeof technology === "string")
    );
    if (destroyed || !hasValidProject) return false;

    invokingControl = nextInvokingControl;
    returnMode = nextReturnMode;
    content.meta.textContent = `${project.role} · ${project.year}`;
    content.title.textContent = project.title;
    content.summary.textContent = project.summary;
    content.highlights.replaceChildren(
      ...project.highlights.map((highlight) => {
        const item = ownerDocument.createElement("li");
        item.textContent = highlight;
        return item;
      }),
    );
    content.stack.replaceChildren(
      ...project.stack.map((technology) => {
        const item = ownerDocument.createElement("li");
        item.textContent = technology;
        return item;
      }),
    );
    if (!dialog.open) dialog.showModal();
    onModeChange("project-dialog");
    closeButton.focus();
    return true;
  }

  function handleBackdropClick(event) {
    if (event.target === dialog) close();
  }

  function handleCancel(event) {
    event.preventDefault();
    close();
  }

  function handleClose() {
    onClose();
    onModeChange(returnMode);
    if (typeof invokingControl?.focus === "function") invokingControl.focus();
    invokingControl = null;
  }

  dialog.setAttribute("aria-live", "polite");
  closeButton.addEventListener("click", close);
  dialog.addEventListener("click", handleBackdropClick);
  dialog.addEventListener("cancel", handleCancel);
  dialog.addEventListener("close", handleClose);

  function handleAction(action) {
    if (destroyed || !dialog.open) return false;
    if (CLOSE_ACTIONS.has(action)) close();
    return true;
  }

  function destroy() {
    if (destroyed) return false;
    destroyed = true;
    closeButton.removeEventListener("click", close);
    dialog.removeEventListener("click", handleBackdropClick);
    dialog.removeEventListener("cancel", handleCancel);
    dialog.removeEventListener("close", handleClose);
    if (dialog.open) dialog.close();
    invokingControl = null;
    returnMode = "dialogue";
    return true;
  }

  return Object.freeze({
    close,
    destroy,
    handleAction,
    isOpen: () => dialog.open,
    open,
  });
}
