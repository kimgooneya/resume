import { portfolioData } from "./portfolio-data.js";
import { groupCasesByProject } from "./project-groups.js";

const create = (tag, className, text) => {
  const element = document.createElement(tag);
  if (className) element.className = className;
  if (text) element.textContent = text;
  return element;
};

const appendList = (parent, items, className = "") => {
  const list = create("ul", className);
  items.forEach((item) => list.append(create("li", "", item)));
  parent.append(list);
  return list;
};

const createDetailBlock = (label, value, className = "") => {
  const block = create("div", `case-detail-block ${className}`.trim());
  block.append(create("h4", "eyebrow", label));
  block.append(create("p", "outcome-copy", value));
  return block;
};

const provenanceLabel = (caseStudy) =>
  caseStudy.provenance === "code-observed" ? "CODE OBSERVED" : "USER CONFIRMED ONLY";

const createCaseOverview = (caseStudy) => {
  const overview = create("dl", "case-overview");
  [
    ["ROLE (USER-CONFIRMED)", caseStudy.role],
    ["EVIDENCE SCOPE", provenanceLabel(caseStudy)],
    ["SCOPE", caseStudy.scope],
  ].forEach(([label, value]) => {
    const item = create("div", "case-overview-item");
    item.append(create("dt", "eyebrow", label));
    item.append(create("dd", "case-overview-value", value));
    overview.append(item);
  });
  return overview;
};

const createCaseDetailGrid = (caseStudy) => {
  const detailGrid = create("div", "case-detail-grid");
  detailGrid.append(
    createDetailBlock("MY ROLE (USER-CONFIRMED)", caseStudy.role),
    createDetailBlock("EVIDENCE SCOPE", provenanceLabel(caseStudy)),
    createDetailBlock("PROBLEM", caseStudy.problem),
  );
  const contributions = create("div", "case-detail-block");
  contributions.append(create("h4", "eyebrow", "CONTRIBUTIONS"));
  appendList(contributions, caseStudy.contributions);
  const decisions = create("div", "case-detail-block");
  decisions.append(create("h4", "eyebrow", "DECISIONS"));
  appendList(decisions, caseStudy.decisions);
  const stack = create("div", "case-detail-block");
  stack.append(create("h4", "eyebrow", "STACK"));
  appendList(stack, caseStudy.stack, "case-stack");
  const outcome = create("div", "case-detail-block");
  outcome.append(create("h4", "eyebrow", "OUTCOME"));
  outcome.append(create("p", "outcome-copy", caseStudy.outcome));
  outcome.append(create("p", "evidence-copy", caseStudy.evidence));
  detailGrid.append(contributions, decisions, stack, outcome);
  return detailGrid;
};

const createCaseDialog = (caseStudy, trigger, implementationNumber) => {
  const dialog = document.createElement("dialog");
  const dialogId = `case-dialog-${caseStudy.number}`;
  const titleId = `${dialogId}-title`;
  dialog.id = dialogId;
  dialog.className = "case-dialog";
  dialog.setAttribute("aria-labelledby", titleId);

  const shell = create("div", "case-dialog-shell");
  const header = create("header", "case-dialog-header");
  const headingGroup = create("div", "case-dialog-heading");
  headingGroup.append(
    create("p", "eyebrow", `IMPLEMENTATION ${implementationNumber} · ${caseStudy.period}`),
    create("p", "case-dialog-project", caseStudy.project),
  );
  const title = create("h2", "case-dialog-title", caseStudy.title);
  title.id = titleId;
  headingGroup.append(title);
  const summary = create("p", "case-dialog-summary", caseStudy.summary);
  summary.id = `${dialogId}-summary`;
  dialog.setAttribute("aria-describedby", summary.id);
  const close = create("button", "case-dialog-close", "닫기");
  close.type = "button";
  close.setAttribute("aria-label", "상세 사례 닫기");
  close.addEventListener("click", () => dialog.close());
  header.append(headingGroup, close);

  shell.append(header, summary);
  shell.append(createCaseOverview(caseStudy), createCaseDetailGrid(caseStudy));
  dialog.append(shell);
  dialog.addEventListener("click", (event) => {
    if (event.target === dialog) dialog.close();
  });
  dialog.addEventListener("cancel", (event) => {
    event.preventDefault();
    dialog.close();
  });
  dialog.addEventListener("keydown", (event) => {
    if (event.key === "Escape") dialog.close();
  });
  dialog.addEventListener("close", () => trigger.focus());
  return dialog;
};

const renderProfile = () => {
  const profile = portfolioData.profile;
  document.querySelectorAll("[data-profile-eyebrow]").forEach((element) => {
    element.textContent = profile.eyebrow;
  });
  document.querySelectorAll("[data-profile-name]").forEach((element) => {
    element.textContent = profile.name;
  });
  const heroTitle = document.querySelector("[data-profile-title]");
  if (heroTitle) {
    heroTitle.replaceChildren();
    profile.title.split("\n").forEach((line, index, lines) => {
      heroTitle.append(document.createTextNode(line));
      if (index < lines.length - 1) heroTitle.append(document.createElement("br"));
    });
  }
  const summary = document.querySelector("[data-profile-summary]");
  if (summary) summary.textContent = profile.summary;
  const asOf = document.querySelector("[data-profile-as-of]");
  if (asOf) asOf.textContent = profile.asOf;
};

const renderCapabilities = () => {
  const target = document.querySelector("#capability-list");
  if (!target) return;
  portfolioData.capabilities.forEach((capability) => {
    const item = create("article", "capability-item");
    const index = create("p", "eyebrow capability-index", capability.index);
    const title = create("h3", "", capability.title);
    const detail = create("p", "capability-detail", capability.detail);
    const proof = create("p", "capability-proof", capability.proof);
    item.append(index, title, detail, proof);
    target.append(item);
  });
};

const renderProjects = () => {
  const target = document.querySelector("#case-study-list");
  if (!target) return;
  groupCasesByProject(portfolioData.cases).forEach((project) => {
    const article = create("article", "project-case");
    article.id = `project-${project.number}`;

    const header = create("header", "project-header");
    const index = create("div", "project-index");
    index.append(
      create("p", "eyebrow", `PROJECT ${project.number}`),
      create("p", "project-period mono", project.period),
    );
    const heading = create("div", "project-heading");
    heading.append(
      create("h3", "project-title", project.title),
      create("p", "project-count mono", `${project.features.length} IMPLEMENTATIONS`),
    );
    header.append(index, heading);

    const featureList = create("div", "project-feature-list");
    project.features.forEach((caseStudy, featureIndex) => {
      const implementationNumber = String(featureIndex + 1).padStart(2, "0");
      const feature = create("section", "project-feature");
      feature.id = `case-${caseStudy.number}`;

      const featureMeta = create("div", "case-index");
      featureMeta.append(
        create("p", "eyebrow", `IMPLEMENTATION ${implementationNumber}`),
        create("p", "case-label", caseStudy.label),
        create("p", "case-period mono", caseStudy.period),
      );

      const body = create("div", "case-body");
      body.append(create("h4", "case-title", caseStudy.title));
      body.append(create("p", "case-summary", caseStudy.summary));
      body.append(createCaseOverview(caseStudy));

      const openButton = create("button", "case-open");
      openButton.type = "button";
      openButton.setAttribute("aria-haspopup", "dialog");
      openButton.setAttribute("aria-label", `${caseStudy.project} ${caseStudy.title} 구현 상세 열기`);
      openButton.append(
        create("span", "case-open-label", "역할·판단·결과 상세 보기"),
        create("span", "case-open-mark", "↗"),
      );
      const dialog = createCaseDialog(caseStudy, openButton, implementationNumber);
      openButton.setAttribute("aria-controls", dialog.id);
      openButton.addEventListener("click", () => {
        dialog.showModal();
        dialog.querySelector(".case-dialog-close").focus();
      });
      body.append(openButton);
      feature.append(featureMeta, body, dialog);
      featureList.append(feature);
    });

    article.append(header, featureList);
    target.append(article);
  });
};

const renderSupporting = () => {
  const target = document.querySelector("#supporting-list");
  if (!target) return;
  portfolioData.supporting.forEach((item, index) => {
    const row = create("li", "supporting-row");
    row.append(create("span", "mono", `0${index + 1}`), create("span", "", item));
    target.append(row);
  });
};

const renderContact = () => {
  const github = document.querySelector("[data-contact-github]");
  if (github) {
    github.href = portfolioData.contact.github;
    github.textContent = portfolioData.contact.githubLabel;
  }
  const resume = document.querySelector("[data-contact-resume]");
  if (resume) resume.href = portfolioData.contact.resume;
};

renderProfile();
renderCapabilities();
renderProjects();
renderSupporting();
renderContact();
