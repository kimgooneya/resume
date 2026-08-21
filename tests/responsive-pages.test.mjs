import { describe, expect, test } from "bun:test";
import { readFileSync } from "node:fs";

const portfolioCss = readFileSync(
  new URL("../preview/portfolio.css", import.meta.url),
  "utf8",
);
const exploreCss = readFileSync(
  new URL("../preview/responsive.css", import.meta.url),
  "utf8",
);
const resumeHtml = readFileSync(
  new URL("../preview/resume/developer-resume.html", import.meta.url),
  "utf8",
);

function mediaBlock(source, query) {
  const start = source.indexOf(`@media ${query}`);
  if (start < 0) return "";
  const next = source.indexOf("@media", start + 1);
  return source.slice(start, next < 0 ? source.length : next);
}

describe("GitHub Pages responsive surfaces", () => {
  test("the portfolio replaces the dense diagram and exposes touch-sized navigation on phones", () => {
    const mobile = mediaBlock(portfolioCss, "(max-width: 560px)");

    expect(mobile).toMatch(/\.archive-nav\s*\{[^}]*grid-template-columns:\s*repeat\(2,/s);
    expect(mobile).toMatch(/\.archive-nav a\s*\{[^}]*min-height:\s*44px/s);
    expect(mobile).toMatch(/\.hero-diagram svg\s*\{[^}]*display:\s*none/s);
    expect(mobile).toMatch(/\.diagram-mobile-summary\s*\{[^}]*display:\s*block/s);
    expect(mobile).toMatch(/\.hero-actions \.button\s*\{[^}]*width:\s*100%/s);
  });

  test("the explorer keeps movement, action, and help controls in explicit mobile grid areas", () => {
    const mobile = mediaBlock(exploreCss, "(max-width: 600px)");

    expect(mobile).toContain('"dpad actions"');
    expect(mobile).toContain('"help help"');
    expect(mobile).toMatch(/\.dpad-group\s*\{[^}]*grid-area:\s*dpad/s);
    expect(mobile).toMatch(/\.action-buttons\s*\{[^}]*grid-area:\s*actions/s);
    expect(mobile).toMatch(/\.keyboard-help\s*\{[^}]*grid-area:\s*help/s);
    expect(mobile).toMatch(/\.mobile-region-panel:not\(\[hidden\]\)\s*\{[^}]*max-block-size:\s*calc\(100dvh - var\(--space-4\)\)/s);
  });

  test("the resume switches from print-scale text to readable mobile typography", () => {
    const tablet = mediaBlock(resumeHtml, "screen and (max-width: 840px)");
    const phone = mediaBlock(resumeHtml, "screen and (max-width: 480px)");

    expect(tablet).toContain("--type-body: 15px");
    expect(tablet).toContain("--type-project: 16px");
    expect(tablet).toMatch(/\.contact-list a\s*\{[^}]*min-height:\s*44px/s);
    expect(tablet).toMatch(/\.evidence-item\s*\{[^}]*white-space:\s*normal/s);
    expect(phone).toMatch(/\.resume-sheet\s*\{[^}]*padding:\s*28px 18px/s);
  });
});
