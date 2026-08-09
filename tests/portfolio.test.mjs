import { describe, expect, test } from "bun:test";
import { readFileSync } from "node:fs";

const html = readFileSync(new URL("../preview/index.html", import.meta.url), "utf8");
const css = readFileSync(new URL("../preview/portfolio.css", import.meta.url), "utf8");
const script = readFileSync(new URL("../preview/portfolio.js", import.meta.url), "utf8");
const data = readFileSync(new URL("../preview/portfolio-data.js", import.meta.url), "utf8");

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

  test("renders evidence-driven case data without shipping the raw audit", () => {
    expect(data.match(/number: /g)).toHaveLength(22);
    expect(data).toContain("Text-to-SQL DAG");
    expect(data).toContain("NHBank");
    expect(data).toContain("인증 쿠키·API 재시도");
    expect(data).toContain("dcai-onpremise");
    expect(data).toContain("CelltrionPowerBIWebApp");
    expect(data).toContain("LangcodeApp");
    expect(data).toContain("role:");
    expect(data).toContain("problem:");
    expect(data).toContain("contributions:");
    expect(data).toContain("stack:");
    expect(data).toContain("https://github.com/kimgooneya");
    expect(data).not.toContain("https://github.com/shkim");
    expect(data).not.toContain("GITHUB_CONTRIBUTION_AUDIT");
    expect(data).not.toContain('number: "07"');
    expect(data).not.toContain("RFID 제품 유지보수");
    expect(data).toContain("ExcelFactory");
    expect(script).toContain("textContent");
    expect(script).toContain("document.createElement(\"dialog\")");
    expect(script).toContain("MY ROLE");
    expect(script).toContain("CONTRIBUTIONS");
    expect(script).toContain("aria-describedby");
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
