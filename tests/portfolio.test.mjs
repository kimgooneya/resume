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

  test("uses concise Korean resume copy across the public archive", () => {
    expect(html).toContain("01 / 주요 프로젝트");
    expect(html).toContain("02 / 핵심 역량");
    expect(html).toContain("03 / 추가 경험");
    expect(html).toContain("추가 프로젝트 및");
    expect(html).toContain("Claude Code를 활용한 엔터프라이즈 프로그램 배포");
    expect(html).toContain("개발 원칙");
    expect(html).toContain("연락처");
    expect(html).not.toContain("SELECTED PROJECTS");
    expect(html).not.toContain("WIDER CONTEXT");
    expect(html).not.toContain("LET'S CONNECT");
    expect(script).toContain("담당 역할");
    expect(script).toContain("검증 범위");
    expect(script).toContain("주요 기여");
    expect(script).toContain("성과 및 결과");
    expect(script).toContain("구현 ${implementationNumber}");
    expect(script).not.toContain("ROLE (USER-CONFIRMED)");
    expect(script).not.toContain("IMPLEMENTATIONS");
    expect(portfolioData.supporting).toEqual([
      "Claude Code를 활용한 엔터프라이즈 프로그램 배포·산출물 작성",
      "Microsoft Agent Framework 기반 Agentic Service 구축·LangChain 구조 비교",
      "Azure OpenAI와 SDK v2 전환",
      "에이전트 오케스트레이션과 온프레미스 실행 환경",
      "금융·제조 도메인의 진단, 과금, 사전검증 PoC",
    ]);
  });

  test("exposes structured case provenance", () => {
    expect(portfolioData.cases).toHaveLength(9);
    expect(portfolioData.cases.map(({ number }) => number)).toEqual(["01", "02", "06", "08", "12", "13", "15", "17", "18"]);
    expect(
      portfolioData.cases.every(
        ({ number, role, problem, contributions, stack, evidence }) =>
          Boolean(number && role && problem && contributions.length && stack.length && evidence),
      ),
    ).toBe(true);
    expect(
      portfolioData.cases.every(({ provenance }) => ["code-observed", "user-confirmed-only"].includes(provenance)),
    ).toBe(true);
    expect(portfolioData.cases.filter(({ evidence }) => evidence.startsWith("코드 감사:")).length).toBe(7);
    expect(portfolioData.cases.filter(({ evidence }) => evidence.includes("이번 clone 감사 범위 외")).length).toBe(2);
    expect(portfolioData.cases.filter(({ provenance }) => provenance === "code-observed").length).toBe(7);
    expect(portfolioData.cases.filter(({ provenance }) => provenance === "user-confirmed-only").length).toBe(2);
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

  test("groups implementation records under the selected client projects", () => {
    // Given: every implementation record keeps its public project name
    const projects = groupCasesByProject(portfolioData.cases);

    // When: the archive organizes the records by project
    const nhNonghyup = projects.find(({ title }) => title === "NH농협");
    const paperPop = projects.find(({ title }) => title === "페이퍼팝");
    const celltrion = projects.find(({ title }) => title === "셀트리온");

    // Then: feature-level records stay intact inside one project hierarchy
    expect(projects).toHaveLength(7);
    expect(projects.map(({ title }) => title)).toEqual([
      "KT GSI 홈쇼핑",
      "NH농협",
      "두바이 GDRFA",
      "교보생명",
      "SPin · Azure 구독청구 시스템",
      "페이퍼팝",
      "셀트리온",
    ]);
    expect(nhNonghyup?.features.map(({ number, title }) => [number, title])).toEqual([
      ["02", "LLM 연동 운영 계약"],
      ["08", "검증 실패의 다음 행동 안내"],
    ]);
    expect(paperPop?.features.map(({ number }) => number)).toEqual(["15"]);
    expect(celltrion?.features.map(({ number }) => number)).toEqual(["17", "18"]);
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
