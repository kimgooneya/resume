import { portfolioData } from "./portfolio-data.js";

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

const renderCases = () => {
  const target = document.querySelector("#case-study-list");
  if (!target) return;
  portfolioData.cases.forEach((caseStudy) => {
    const article = create("article", "case-study");
    article.id = `case-${caseStudy.number}`;

    const index = create("div", "case-index");
    index.append(
      create("p", "eyebrow", `CASE ${caseStudy.number}`),
      create("p", "case-label", caseStudy.label),
      create("p", "case-period mono", caseStudy.period),
    );

    const body = create("div", "case-body");
    body.append(create("h3", "case-title", caseStudy.title));
    body.append(create("p", "case-summary", caseStudy.summary));

    const details = document.createElement("details");
    details.className = "case-details";
    const summary = document.createElement("summary");
    const detailsLabel = create("span", "details-label", "판단과 결과 펼치기");
    const detailsMark = create("span", "details-mark", "+");
    summary.append(
      detailsLabel,
      detailsMark,
    );
    details.addEventListener("toggle", () => {
      detailsLabel.textContent = details.open ? "판단과 결과 접기" : "판단과 결과 펼치기";
      detailsMark.textContent = details.open ? "−" : "+";
    });
    details.append(summary);

    const detailGrid = create("div", "case-detail-grid");
    const decisions = create("div", "case-detail-block");
    decisions.append(create("h4", "eyebrow", "DECISIONS"));
    appendList(decisions, caseStudy.decisions);
    const outcome = create("div", "case-detail-block");
    outcome.append(create("h4", "eyebrow", "OUTCOME"));
    outcome.append(create("p", "outcome-copy", caseStudy.outcome));
    outcome.append(create("p", "evidence-copy", caseStudy.evidence));
    detailGrid.append(decisions, outcome);
    details.append(detailGrid);
    body.append(details);
    article.append(index, body);
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
renderCases();
renderSupporting();
renderContact();
