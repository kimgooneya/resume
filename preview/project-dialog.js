export function createProjectDialog() {
  const dialog = document.querySelector("#project-intro");
  const closeButton = dialog.querySelector("[data-dialog-close]");
  const content = {
    biome: dialog.querySelector("#intro-biome"),
    year: dialog.querySelector("#intro-year"),
    title: dialog.querySelector("#intro-title"),
    role: dialog.querySelector("#intro-role"),
    summary: dialog.querySelector("#intro-summary"),
    highlights: dialog.querySelector("#intro-highlights"),
    stack: dialog.querySelector("#intro-stack"),
  };

  function close() {
    if (!dialog.open) return;
    dialog.classList.remove("is-visible");
    dialog.close();
  }

  function open(village, project) {
    content.biome.textContent = `${village.biome.toUpperCase()} VILLAGE`;
    content.year.textContent = project.year;
    content.title.textContent = project.title;
    content.role.textContent = project.role;
    content.summary.textContent = project.summary;
    content.highlights.replaceChildren(
      ...project.highlights.map((highlight) => {
        const item = document.createElement("li");
        item.textContent = highlight;
        return item;
      }),
    );
    content.stack.replaceChildren(
      ...project.stack.map((technology) => {
        const item = document.createElement("li");
        item.textContent = technology;
        return item;
      }),
    );
    if (!dialog.open) {
      dialog.showModal();
      requestAnimationFrame(() => {
        requestAnimationFrame(() => {
          if (dialog.open) dialog.classList.add("is-visible");
        });
      });
    }
    closeButton.focus();
  }

  closeButton.addEventListener("click", close);
  dialog.addEventListener("click", (event) => {
    if (event.target === dialog) close();
  });

  return {
    close,
    isOpen: () => dialog.open,
    open,
  };
}
