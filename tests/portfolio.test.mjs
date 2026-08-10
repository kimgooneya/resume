import { describe, expect, test } from "bun:test";
import { readFileSync } from "node:fs";
import { portfolioData } from "../preview/portfolio-data.js";
import { groupCasesByProject } from "../preview/project-groups.js";

const html = readFileSync(new URL("../preview/index.html", import.meta.url), "utf8");
const css = readFileSync(new URL("../preview/portfolio.css", import.meta.url), "utf8");
const script = readFileSync(new URL("../preview/portfolio.js", import.meta.url), "utf8");

describe("professional archive entry", () => {
  test("keeps the public page separate from the game shell", () => {
    expect(html).toContain('<main id="main-content">');
    expect(html).toContain('href="./explore.html"');
    expect(html).toContain('href="./resume/developer-resume.html"');
    expect(html).not.toContain('id="map-canvas"');
    expect(html).not.toContain('src="./main.js"');
  });

  test("includes the reference-led typography and real structural sections", () => {
    expect(html).toContain("Hahmlet");
    expect(html).toContain("pretendard@");
    expect(html).toContain('id="work"');
    expect(html).toContain('id="about"');
    expect(html).toContain('id="archive"');
    expect(html).toContain('id="contact"');
    expect(html).toContain("<svg");
    expect(html).toContain('aria-describedby="diagram-description"');
    expect(html).toContain("SCHEMA RETRIEVAL");
    expect(html).toContain('M340 275H364');
    expect(html).toContain('M484 168V216H420V250');
    expect(script).toContain('document.createElement("dialog")');
    expect(script).toContain("상세 사례 닫기");
  });

  test("exposes structured case provenance", () => {
    expect(portfolioData.cases).toHaveLength(22);
    expect(new Set(portfolioData.cases.map(({ number }) => number))).toHaveLength(22);
    expect(
      portfolioData.cases.every(
        ({ number, role, problem, contributions, stack, evidence }) =>
          Boolean(number && role && problem && contributions.length && stack.length && evidence),
      ),
    ).toBe(true);
    expect(
      portfolioData.cases.every(({ provenance }) => ["code-observed", "user-confirmed-only"].includes(provenance)),
    ).toBe(true);
    expect(portfolioData.cases.filter(({ evidence }) => evidence.startsWith("코드 감사:")).length).toBeGreaterThanOrEqual(10);
    expect(portfolioData.cases.filter(({ evidence }) => evidence.includes("이번 clone 감사 범위 외")).length).toBeGreaterThanOrEqual(5);
    expect(portfolioData.cases.filter(({ provenance }) => provenance === "code-observed").length).toBeGreaterThanOrEqual(10);
    expect(portfolioData.cases.filter(({ provenance }) => provenance === "user-confirmed-only").length).toBeGreaterThanOrEqual(5);
    expect(
      portfolioData.cases
        .filter(({ provenance }) => provenance === "code-observed")
        .every(({ role, contributions }) => role.includes("사용자 확인") && contributions.every((item) => item.includes("코드 감사 관찰"))),
    ).toBe(true);
    expect(
      portfolioData.cases
        .filter(({ provenance }) => provenance === "user-confirmed-only")
        .every(({ role, evidence }) => role.includes("사용자 확인만") && evidence.includes("감사 범위 외")),
    ).toBe(true);
    expect(portfolioData.capabilities).toHaveLength(3);
    expect(portfolioData.capabilities.every(({ index, title, detail, proof }) => Boolean(index && title && detail && proof))).toBe(true);
    expect(portfolioData.contact.github).toBe("https://github.com/kimgooneya");
    expect(script).toContain("textContent");
    expect(script).toContain("document.createElement(\"dialog\")");
    expect(script).toContain("aria-describedby");
  });

  test("groups implementation records under their owning projects", () => {
    // Given: every implementation record keeps its public project name
    const projects = groupCasesByProject(portfolioData.cases);

    // When: the archive organizes the records by project
    const authenticationPlatform = projects.find(({ title }) => title === "인증·실행 플랫폼");
    const manufacturingQuality = projects.find(({ title }) => title === "제조 품질 시스템");

    // Then: feature-level records stay intact inside one project hierarchy
    expect(projects).toHaveLength(17);
    expect(authenticationPlatform?.period).toBe("2021.12 — 2026.03");
    expect(authenticationPlatform?.features.map(({ title }) => title)).toEqual([
      "빌드 산출물·실행 환경 분리",
      "인증 경계와 제품 화면 연결",
      "로그인 흐름 책임 경계 복구",
      "사용자 확인 이력 · 공통 모델",
      "사용자 확인 이력 · 지식 업무",
    ]);
    expect(manufacturingQuality?.features.map(({ title }) => title)).toEqual([
      "제조 데이터 의사결정 리포트",
      "리포트 업무 규칙의 서버리스 분리",
    ]);
    expect(script).toContain("project.features.forEach");
    expect(script).toContain("createCaseDialog(caseStudy, openButton, implementationNumber)");
    expect(css).toContain(".project-case");
    expect(css).toContain(".project-feature-list");
  });

  test("keeps the archive visual system token-driven and responsive", () => {
    expect(css).toContain("--archive-paper: #f6f4ee");
    expect(css).toContain("--archive-overlay: rgb(31 35 31 / 48%)");
    expect(css).toContain("--archive-font-display: \"Hahmlet\"");
    expect(css).toContain("--archive-type-hero-mobile");
    expect(css).toContain("--archive-dialog-duration: 640ms");
    expect(css).toContain("--archive-dialog-ease: cubic-bezier(0.22, 1, 0.36, 1)");
    expect(css).toContain("@keyframes archive-dialog-enter");
    expect(css).toContain(".case-dialog[open]::backdrop");
    expect(css).toContain("html:has(.case-dialog[open])");
    expect(css).toContain(".case-overview");
    expect(css).toContain(".case-stack");
    expect(css).toContain("scroll-snap-type: y mandatory");
    expect(css).not.toContain("scroll-snap-stop");
    expect(css).toContain(".case-dialog");
    expect(css).toContain("overflow: hidden");
    expect(css).toContain(".case-dialog-close:focus-visible");
    expect(css).toContain("word-break: keep-all");
    expect(css).toContain("@media (max-width: 560px)");
    expect(css).toContain("@media (prefers-reduced-motion: reduce)");
    expect(css).not.toContain("linear-gradient");
    expect(css).not.toContain("backdrop-filter");
  });
});
