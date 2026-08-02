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
    expect(html).toContain('M484 184V232H420V250');
    expect(script).toContain('document.createElement("details")');
    expect(script).toContain("판단과 결과 접기");
  });

  test("renders evidence-driven case data without shipping the raw audit", () => {
    expect(data.match(/number: /g)).toHaveLength(3);
    expect(data).toContain("Text-to-SQL DAG");
    expect(data).toContain("비정형 Excel");
    expect(data).toContain("인증·BFF");
    expect(data).toContain("https://github.com/kimgooneya");
    expect(data).not.toContain("https://github.com/shkim");
    expect(data).not.toContain("GITHUB_CONTRIBUTION_AUDIT");
    expect(script).toContain("textContent");
    expect(script).toContain("document.createElement(\"details\")");
  });

  test("keeps the archive visual system token-driven and responsive", () => {
    expect(css).toContain("--archive-paper: #f6f4ee");
    expect(css).toContain("--archive-font-display: \"Hahmlet\"");
    expect(css).toContain("word-break: keep-all");
    expect(css).toContain("@media (max-width: 560px)");
    expect(css).toContain("@media (prefers-reduced-motion: reduce)");
    expect(css).not.toContain("linear-gradient");
    expect(css).not.toContain("backdrop-filter");
  });
});
