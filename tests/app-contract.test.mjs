import { describe, expect, test } from "bun:test";
import { readFileSync } from "node:fs";

const html = readFileSync(new URL("../preview/index.html", import.meta.url), "utf8");
const styles = readFileSync(new URL("../preview/styles.css", import.meta.url), "utf8");
const responsive = readFileSync(
  new URL("../preview/responsive.css", import.meta.url),
  "utf8",
);
const main = readFileSync(new URL("../preview/main.js", import.meta.url), "utf8");

const requiredIds = [
  "site-masthead",
  "initial-region-selection",
  "map-canvas",
  "position-status",
  "interaction-status",
  "field-guide",
  "mobile-regions-trigger",
  "mobile-region-panel",
  "dialogue-box",
  "move-up",
  "move-down",
  "move-left",
  "move-right",
  "action-a",
  "action-b",
  "reset-trigger",
  "reset-confirmation",
  "app-status",
  "load-error",
  "reload-data",
  "project-dialog",
];

const regionIds = ["forest", "city", "desert", "snow", "coast"];

const canonicalTokens = {
  "--chrome-light": "#ded7bd",
  "--chrome-mid": "#a7a18d",
  "--chrome-dark": "#555950",
  "--chrome-ink": "#252b27",
  "--lcd-0": "#17291f",
  "--lcd-1": "#31553f",
  "--lcd-2": "#7a9b58",
  "--lcd-3": "#c8d98b",
  "--space-1": "4px",
  "--space-2": "8px",
  "--space-3": "12px",
  "--space-4": "16px",
  "--space-6": "24px",
  "--space-8": "32px",
  "--font-weight-strong": "700",
  "--font-size-micro": "0.6875rem",
  "--font-size-small": "0.75rem",
  "--font-size-ui": "0.8125rem",
  "--font-size-action": "1.75rem",
  "--font-size-title": "clamp(1.25rem, 3vw, 1.75rem)",
  "--font-size-selection-title": "clamp(1.1rem, 2.4vw, 1.5rem)",
  "--leading-tight": "1.25",
  "--leading-copy": "1.65",
  "--tracking-kicker": "0.08em",
  "--tracking-label": "0.12em",
  "--pixel-border": "4px",
  "--border-thin": "2px",
  "--detail-step": "3px",
  "--focus-outline": "3px",
  "--focus-offset": "2px",
  "--shadow-step": "4px",
  "--shadow-shell": "6px",
  "--shadow-dialog": "8px",
  "--control-inset": "3px",
  "--control-min": "56px",
  "--map-share": "74fr",
  "--guide-share": "22fr",
  "--deck-share": "18vh",
  "--dpad-size": "168px",
  "--action-size": "64px",
  "--shell-max": "1260px",
  "--masthead-min-height": "60px",
  "--guide-min-width": "224px",
  "--map-canvas-width": "384px",
  "--map-canvas-height": "288px",
  "--map-authored-width": "600px",
  "--map-rail-inset": "12px",
  "--dialog-max-width": "640px",
  "--dialogue-max-width": "65%",
  "--completion-size": "16px",
  "--compact-control-padding": "6px",
  "--control-deck-inline-padding": "36px",
  "--mobile-trigger-min-height": "48px",
  "--guide-compact-min-height": "280px",
  "--region-compact-min-width": "116px",
  "--control-deck-mobile-min-height": "152px",
  "--status-gap-mobile": "2px",
  "--stamp-width": "48px",
  "--stamp-height": "40px",
  "--stamp-border": "var(--detail-step)",
  "--stamp-gap": "var(--space-2)",
  "--stamp-baseline-height": "var(--space-1)",
  "--stamp-baseline-inset": "var(--space-1)",
  "--stamp-baseline-offset": "var(--detail-step)",
};

const tokenConsumers = {
  "--space-8": /\.control-deck\s*\{[^}]*gap:\s*var\(--space-8\)/s,
  "--font-weight-strong": /body\s*\{[^}]*font-weight:\s*var\(--font-weight-strong\)/s,
  "--font-size-micro": /\.masthead-kicker\s*\{[^}]*font-size:\s*var\(--font-size-micro\)/s,
  "--font-size-small": /\.system-messages\s*\{[^}]*font-size:\s*var\(--font-size-small\)/s,
  "--font-size-ui": /\.keyboard-help\s*\{[^}]*font-size:\s*var\(--font-size-ui\)/s,
  "--font-size-action": /\.action-buttons button\s*\{[^}]*font-size:\s*var\(--font-size-action\)/s,
  "--font-size-title": /\.masthead h1\s*\{[^}]*font-size:\s*var\(--font-size-title\)/s,
  "--font-size-selection-title": /\.initial-selection h2\s*\{[^}]*font-size:\s*var\(--font-size-selection-title\)/s,
  "--leading-tight": /\.masthead h1\s*\{[^}]*line-height:\s*var\(--leading-tight\)/s,
  "--leading-copy": /\.initial-selection p\s*\{[^}]*line-height:\s*var\(--leading-copy\)/s,
  "--tracking-kicker": /\.masthead-kicker\s*\{[^}]*letter-spacing:\s*var\(--tracking-kicker\)/s,
  "--tracking-label": /\.guide-header p\s*\{[^}]*letter-spacing:\s*var\(--tracking-label\)/s,
  "--border-thin": /\.text-button\s*\{[^}]*border-width:\s*0 0 var\(--border-thin\)/s,
  "--detail-step": /\.completion-box\s*\{[^}]*border:\s*var\(--detail-step\) solid/s,
  "--focus-outline": /:focus-visible\s*\{[^}]*outline:\s*var\(--focus-outline\) solid/s,
  "--focus-offset": /:focus-visible\s*\{[^}]*outline-offset:\s*var\(--focus-offset\)/s,
  "--shadow-step": /\.map-panel,\s*\.field-guide\s*\{[^}]*box-shadow:\s*var\(--shadow-step\) var\(--shadow-step\)/s,
  "--shadow-shell": /\.game-shell\s*\{[^}]*box-shadow:\s*var\(--shadow-shell\) var\(--shadow-shell\)/s,
  "--shadow-dialog": /\.project-dialog\s*\{[^}]*box-shadow:\s*var\(--shadow-dialog\) var\(--shadow-dialog\)/s,
  "--control-inset": /\.dpad button\s*\{[^}]*box-shadow:\s*inset var\(--control-inset\) var\(--control-inset\)/s,
  "--masthead-min-height": /\.masthead\s*\{[^}]*min-height:\s*var\(--masthead-min-height\)/s,
  "--guide-min-width": /\.play-grid\s*\{[^}]*minmax\(var\(--guide-min-width\),\s*var\(--guide-share\)\)/s,
  "--map-canvas-width": /#map-canvas\s*\{[^}]*width:\s*var\(--map-canvas-width\)/s,
  "--map-canvas-height": /\.map-screen\s*\{[^}]*min-height:\s*var\(--map-canvas-height\)/s,
  "--map-authored-width": /\.map-screen::before,\s*\.map-screen::after\s*\{[^}]*var\(--map-authored-width\)/s,
  "--map-rail-inset": /\.map-screen::before\s*\{[^}]*var\(--map-rail-inset\)/s,
  "--dialog-max-width": /\.project-dialog\s*\{[^}]*width:\s*min\(var\(--dialog-max-width\)/s,
  "--dialogue-max-width": /\.dialogue-box\s*\{[^}]*max-width:\s*var\(--dialogue-max-width\)/s,
  "--completion-size": /\.completion-box\s*\{[^}]*width:\s*var\(--completion-size\)[^}]*height:\s*var\(--completion-size\)/s,
  "--compact-control-padding": /\.region-list button\s*\{[^}]*padding:\s*var\(--compact-control-padding\)/s,
  "--control-deck-inline-padding": /\.control-deck\s*\{[^}]*padding:\s*var\(--space-1\) var\(--control-deck-inline-padding\)/s,
  "--mobile-trigger-min-height": /\.mobile-regions-trigger\s*\{[^}]*min-height:\s*var\(--mobile-trigger-min-height\)/s,
  "--guide-compact-min-height": /\.field-guide\s*\{[^}]*min-height:\s*var\(--guide-compact-min-height\)/s,
  "--region-compact-min-width": /\.region-list\s*\{[^}]*minmax\(var\(--region-compact-min-width\),\s*1fr\)/s,
  "--control-deck-mobile-min-height": /\.control-deck\s*\{[^}]*min-block-size:\s*var\(--control-deck-mobile-min-height\)/s,
  "--status-gap-mobile": /\.masthead-status\s*\{[^}]*gap:\s*var\(--status-gap-mobile\)/s,
  "--stamp-width": /\.region-stamps\s*\{[^}]*repeat\(5,\s*var\(--stamp-width\)\)/s,
  "--stamp-height": /\.region-stamps li\s*\{[^}]*height:\s*var\(--stamp-height\)/s,
  "--stamp-border": /\.region-stamps li\s*\{[^}]*border:\s*var\(--stamp-border\) solid/s,
  "--stamp-gap": /\.region-stamps\s*\{[^}]*gap:\s*var\(--stamp-gap\)/s,
  "--stamp-baseline-height": /\.region-stamps span\s*\{[^}]*height:\s*var\(--stamp-baseline-height\)/s,
  "--stamp-baseline-inset": /\.region-stamps span\s*\{[^}]*right:\s*var\(--stamp-baseline-inset\)[^}]*left:\s*var\(--stamp-baseline-inset\)/s,
  "--stamp-baseline-offset": /\.region-stamps span\s*\{[^}]*bottom:\s*var\(--stamp-baseline-offset\)/s,
};

function declarations(block) {
  return [...block.matchAll(/(--[\w-]+)\s*:\s*([^;]+);/g)].map(
    ([, name, value]) => [name, value.trim()],
  );
}

function assertAcyclicTokens(tokenEntries) {
  const graph = new Map(
    tokenEntries.map(([name, value]) => [
      name,
      [...value.matchAll(/var\((--[\w-]+)/g)].map((match) => match[1]),
    ]),
  );
  const visiting = new Set();
  const visited = new Set();
  function visit(token) {
    if (visiting.has(token)) throw new Error(`cyclic token: ${token}`);
    if (visited.has(token)) return;
    visiting.add(token);
    for (const dependency of graph.get(token) ?? []) {
      if (graph.has(dependency)) visit(dependency);
    }
    visiting.delete(token);
    visited.add(token);
  }
  for (const token of graph.keys()) visit(token);
}

function assertPixelArtGeometryBoundary(candidateStyles) {
  const startMarker = "/* PIXEL_ART_GEOMETRY_START: irreducible per-region pseudo-element coordinates, box-shadows, and transforms only. */";
  const endMarker = "/* PIXEL_ART_GEOMETRY_END */";
  expect(candidateStyles.match(/PIXEL_ART_GEOMETRY_START/g)?.length).toBe(1);
  expect(candidateStyles.match(/PIXEL_ART_GEOMETRY_END/g)?.length).toBe(1);
  const start = candidateStyles.indexOf(startMarker);
  const end = candidateStyles.indexOf(endMarker);
  expect(start).toBeGreaterThan(-1);
  expect(end).toBeGreaterThan(start);

  const pixelArtBlock = candidateStyles.slice(start + startMarker.length, end);
  const pixelArtRules = [...pixelArtBlock.matchAll(/([^{}]+)\{([^}]*)\}/g)];
  expect(pixelArtRules).toHaveLength(10);
  for (const [, selector, body] of pixelArtRules) {
    expect(selector.trim()).toMatch(
      /^\.region-stamps \[data-region-preview="(?:forest|city|desert|snow|coast)"\]::(?:before|after)$/,
    );
    const properties = [...body.matchAll(/([\w-]+)\s*:/g)].map((match) => match[1]);
    expect(properties.every((property) => [
      "left",
      "right",
      "bottom",
      "width",
      "height",
      "box-shadow",
      "transform",
    ].includes(property))).toBe(true);
  }

  const governedCss = `${candidateStyles.slice(0, start)}${candidateStyles.slice(end + endMarker.length)}`;
  for (const selector of [
    ".region-stamps",
    ".region-stamps li",
    ".region-stamps span",
    ".region-list small",
    ".completion-box",
  ]) {
    const escaped = selector.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
    const bodies = [...governedCss.matchAll(
      new RegExp(`${escaped}\\s*\\{([^}]*)\\}`, "gs"),
    )].map((match) => match[1]);
    expect(bodies.length).toBeGreaterThan(0);
    expect(bodies.join("\n")).not.toMatch(
      /(?:grid-template(?:-columns|-rows)?|(?:min-|max-)?(?:width|height|inline-size|block-size)|gap|row-gap|column-gap|margin(?:-(?:top|right|bottom|left|inline(?:-start|-end)?|block(?:-start|-end)?))?|padding(?:-(?:top|right|bottom|left|inline(?:-start|-end)?|block(?:-start|-end)?))?|border(?:-(?:top|right|bottom|left|inline(?:-start|-end)?|block(?:-start|-end)?))?(?:-width)?|inset(?:-(?:top|right|bottom|left|inline(?:-start|-end)?|block(?:-start|-end)?))?|top|right|bottom|left)\s*:[^;]*\b\d+(?:\.\d+)?px\b/,
    );
  }
}

function assertContract(candidateHtml, candidateStyles, candidateResponsive) {
  for (const id of requiredIds) {
    expect(candidateHtml).toMatch(new RegExp(`id=["']${id}["']`));
  }

  expect(candidateHtml).toMatch(
    /<canvas[^>]*id=["']map-canvas["'][^>]*width=["']384["'][^>]*height=["']288["']/,
  );
  expect(candidateHtml).toMatch(/id=["']position-status["'][^>]*aria-live=/);
  expect(candidateHtml).toMatch(/id=["']interaction-status["'][^>]*aria-live=/);
  expect(candidateHtml).toMatch(/<dialog[^>]*id=["']project-dialog["']/);
  expect(candidateHtml).toMatch(/id=["']load-error["'][^>]*role=["']alert["']/);
  expect(candidateHtml).toMatch(/id=["']app-status["'][^>]*role=["']status["']/);

  for (const direction of ["up", "down", "left", "right"]) {
    expect(candidateHtml).toMatch(
      new RegExp(
        `<button[^>]*id=["']move-${direction}["'][^>]*data-action=["']move-${direction}["']`,
      ),
    );
  }
  for (const action of ["a", "b"]) {
    expect(candidateHtml).toMatch(
      new RegExp(
        `<button[^>]*id=["']action-${action}["'][^>]*data-action=["']${action}["']`,
      ),
    );
  }
  for (const regionId of regionIds) {
    expect(candidateHtml).toMatch(
      new RegExp(`data-region-id=["']${regionId}["']`),
    );
    expect(candidateHtml).toMatch(
      new RegExp(`data-region-preview=["']${regionId}["']`),
    );
  }
  for (const stage of ["problem", "approach", "result"]) {
    expect(candidateHtml).toMatch(
      new RegExp(`data-dialogue-stage=["']${stage}["']`),
    );
  }

  expect(candidateHtml).not.toContain("touch-joystick.css");
  expect(candidateHtml).not.toMatch(/classic-region-.*\.(?:png|jpe?g|webp)/i);

  const combinedCss = `${candidateStyles}\n${candidateResponsive}`;
  expect(candidateHtml).toMatch(/<main class=["']game-shell["'](?![^>]*data-theme)/);
  const rootBlock = candidateStyles.match(/:root\s*\{([^}]*)\}/)?.[1] ?? "";
  const rootDeclarations = declarations(rootBlock);
  const rootNames = rootDeclarations.map(([name]) => name);
  expect(new Set(rootNames).size).toBe(rootNames.length);
  const rootValues = Object.fromEntries(rootDeclarations);
  for (const [token, value] of Object.entries(canonicalTokens)) {
    expect(rootValues[token]).toBe(value);
    expect(combinedCss).toMatch(new RegExp(`var\\(${token.replaceAll("-", "\\-")}\\)`));
  }
  assertAcyclicTokens(rootDeclarations);
  assertPixelArtGeometryBoundary(candidateStyles);
  for (const consumer of Object.values(tokenConsumers)) {
    expect(combinedCss).toMatch(consumer);
  }

  expect(combinedCss).not.toMatch(
    /(?:linear|radial|conic|repeating-linear|repeating-radial)-gradient\s*\(/i,
  );
  expect(combinedCss).not.toMatch(/(?:backdrop-)?filter\s*:[^;]*blur\s*\(/i);
  expect(combinedCss).not.toMatch(/border-radius\s*:/i);
  expect(combinedCss).not.toMatch(/touch-joystick/i);

  const themeBlocks = candidateStyles.match(
    /\[data-theme=["'][^"']+["']\]\s*\{[^}]*\}/g,
  );
  expect(themeBlocks?.length).toBe(5);
  for (const themeBlock of themeBlocks ?? []) {
    expect(themeBlock).not.toMatch(/--chrome-(?:light|mid|dark|ink)\s*:/);
    expect(themeBlock.match(/--lcd-[0-3]\s*:/g)?.length).toBe(4);
  }

  expect(candidateResponsive).toMatch(/--dpad-size\s*:\s*112px/);
  expect(candidateResponsive).toMatch(/--action-size\s*:\s*56px/);
  const mediaQueries = [...candidateResponsive.matchAll(/@media\s*\(([^)]+)\)/g)]
    .map((match) => match[1].replace(/\s+/g, ""));
  expect(mediaQueries).toEqual([
    "min-width:600px",
    "max-width:900px",
    "max-width:600px",
    "prefers-reduced-motion:reduce",
  ]);
  expect(candidateResponsive).not.toMatch(
    /#map-canvas\s*\{[^}]*width\s*:\s*768px/s,
  );
  const mobileDeck = candidateResponsive.match(
    /@media\s*\(max-width:\s*600px\)[\s\S]*?(?=@media|$)/,
  )?.[0] ?? "";
  expect(mobileDeck).toMatch(
    /\.control-deck\s*\{[\s\S]*?grid-template-columns:\s*var\(--dpad-size\)\s+minmax\(0,\s*1fr\)/,
  );
  expect(mobileDeck).toMatch(
    /\.action-buttons\s*\{[\s\S]*?min-width:\s*0\b/,
  );
  expect(mobileDeck).toMatch(
    /\.action-buttons\s*\{[\s\S]*?justify-content:\s*center\b/,
  );
  expect(candidateHtml).toMatch(
    /<div(?=[^>]*data-mobile-region-list)(?=[^>]*class=["'][^"']*region-list)/,
  );
  expect(mobileDeck).toMatch(
    /\.mobile-region-panel \.region-list\s*\{[\s\S]*?grid-template-columns:\s*1fr\b/,
  );
  expect(combinedCss).toMatch(
    /\.dpad button\s*\{[\s\S]*?min-width:\s*var\(--control-min\)[\s\S]*?min-height:\s*var\(--control-min\)/,
  );
  expect(candidateStyles).toMatch(
    /\.skip-link\s*\{[\s\S]*?width:\s*1px\b[\s\S]*?height:\s*1px\b[\s\S]*?overflow:\s*hidden\b[\s\S]*?clip-path:\s*inset\(50%\)/,
  );
  expect(combinedCss).toMatch(
    /\.action-buttons button\s*\{[\s\S]*?width:\s*var\(--action-size\)[\s\S]*?height:\s*var\(--action-size\)/,
  );
  expect(mobileDeck).toMatch(/--dpad-size\s*:\s*112px/);
  expect(mobileDeck).toMatch(/--action-size\s*:\s*56px/);
  expect(mobileDeck).toMatch(
    /#load-error\s*\{[^}]*flex-direction:\s*column[^}]*align-items:\s*stretch/s,
  );
  expect(mobileDeck).toMatch(/#reload-data\s*\{[^}]*align-self:\s*end/s);
  expect(mobileDeck).toMatch(
    /\.masthead\s*\{[^}]*grid-template-columns:\s*minmax\(0,\s*1fr\)/s,
  );
  expect(mobileDeck).toMatch(
    /\.masthead-status\s*\{[^}]*width:\s*100%[^}]*grid-template-columns:\s*minmax\(0,\s*1fr\)\s+auto/s,
  );
  expect(candidateStyles).toMatch(
    /\.dpad\s*\{[^}]*width:\s*var\(--dpad-size\)[^}]*height:\s*var\(--dpad-size\)[^}]*grid-template:\s*repeat\(3,\s*1fr\)\s*\/\s*repeat\(3,\s*1fr\)/s,
  );
  expect(candidateStyles).toMatch(
    /\.masthead\s*\{[^}]*gap:\s*var\(--space-4\)[^}]*padding:\s*var\(--space-2\)\s+calc\(var\(--space-4\)\s*\+\s*var\(--space-1\)\)/s,
  );
  expect(candidateStyles).toMatch(
    /#map-canvas\s*\{[^}]*width\s*:\s*var\(--map-canvas-width\)[^}]*max-width\s*:\s*100%[^}]*height\s*:\s*auto[^}]*image-rendering\s*:\s*pixelated/s,
  );
  expect(candidateStyles).toMatch(
    /\.map-screen::before,\s*\.map-screen::after\s*\{[^}]*width:\s*max\(0px,\s*calc\(\(100%\s*-\s*var\(--map-authored-width\)\)\s*\/\s*2\)\)[^}]*background:\s*var\(--lcd-1\)/s,
  );
  expect(candidateStyles).toMatch(
    /\.map-screen::before\s*\{[^}]*border-right:\s*var\(--pixel-border\)\s+solid\s+var\(--lcd-0\)/s,
  );
  expect(candidateStyles).toMatch(
    /\.map-screen::after\s*\{[^}]*border-left:\s*var\(--pixel-border\)\s+solid\s+var\(--lcd-0\)/s,
  );
  expect(mobileDeck).toMatch(
    /\.masthead\s*\{[^}]*padding:\s*var\(--space-2\)\s+var\(--space-3\)/s,
  );
  expect(mobileDeck).toMatch(
    /\.mobile-regions-trigger\s*\{[^}]*box-shadow:\s*var\(--shadow-step\)\s+var\(--shadow-step\)\s+0\s+var\(--chrome-ink\)/s,
  );
  expect(combinedCss).toMatch(
    /body\s*\{[^}]*overflow-x\s*:\s*hidden[^}]*overflow-y\s*:\s*auto/s,
  );
}

describe("classic RPG shell contract", () => {
  test("Given the checked-in shell, When its static contract is inspected, Then every required surface is present", () => {
    assertContract(html, styles, responsive);
  });

  test("Given a themed chrome leak, When the contract is inspected, Then the invalid theme is rejected", () => {
    const leakedStyles = styles.replace(
      /(\[data-theme=["']forest["']\]\s*\{)/,
      "$1\n  --chrome-dark: #315b35;",
    );
    expect(() => assertContract(html, leakedStyles, responsive)).toThrow();
  });

  test("Given a missing action button, When the contract is inspected, Then the incomplete deck is rejected", () => {
    const missingAction = html.replace(
      /<button[^>]*id=["']action-b["'][\s\S]*?<\/button>/,
      "",
    );
    expect(() => assertContract(missingAction, styles, responsive)).toThrow();
  });

  test("Given token declarations or aliases drift, When the contract is inspected, Then every mutation is rejected", () => {
    const mutations = [
      styles.replace("--space-8: 32px;", ""),
      styles.replace("--space-8: 32px;", "--space-8: var(--space-8);"),
      styles.replace("--map-canvas-width: 384px;", "--map-canvas-width: 385px;"),
      styles.replace("--map-canvas-height: 288px;", "--map-canvas-height: 289px;"),
      styles.replace("--map-authored-width: 600px;", "--map-authored-width: 601px;"),
      styles.replace("--dpad-size: 168px;", "--dpad-size: 128px;"),
      styles.replace("--control-min: 56px;", "--control-min: 44px;"),
      styles.replace("--action-size: 64px;", "--action-size: 60px;"),
    ];
    for (const mutation of mutations) {
      expect(() => assertContract(html, mutation, responsive)).toThrow();
    }
  });

  test("Given a selector bypasses semantic tokens, When the contract is inspected, Then the literal regression is rejected", () => {
    const mutations = [
      styles.replace("gap: var(--space-4); padding:", "gap: 16px; padding:"),
      styles.replace(
        "box-shadow: var(--shadow-shell) var(--shadow-shell) 0 var(--chrome-ink);",
        "box-shadow: 6px 6px 0 var(--chrome-ink);",
      ),
      styles.replace(
        "background: var(--lcd-1);",
        "background: var(--chrome-mid);",
      ),
    ];
    for (const mutation of mutations) {
      expect(() => assertContract(html, mutation, responsive)).toThrow();
    }
  });

  test("Given reusable stamp geometry escapes the token boundary, When the contract is inspected, Then only irreducible pixel art stays allowlisted", () => {
    const mutations = [
      styles.replace("repeat(5, var(--stamp-width))", "repeat(5, 48px)"),
      styles.replace("gap: var(--stamp-gap)", "gap: 8px"),
      styles.replace("width: var(--stamp-width)", "width: 48px"),
      styles.replace("height: var(--stamp-height)", "height: 40px"),
      styles.replace("border: var(--stamp-border) solid", "border: 3px solid"),
      styles.replace("margin-top: var(--detail-step)", "margin-top: 3px"),
      styles.replace("border: var(--detail-step) solid", "border: 3px solid"),
      styles.replace(
        "gap: var(--stamp-gap); margin: 0; padding: 0;",
        "gap: var(--stamp-gap); margin: 0; padding: 8px;",
      ),
      styles.replace(
        "gap: var(--stamp-gap); margin: 0; padding: 0;",
        "gap: var(--stamp-gap); margin-inline: 8px; padding: 0;",
      ),
      styles.replace(
        "border: var(--detail-step) solid currentColor;",
        "border: var(--detail-step) solid currentColor; border-top-width: 3px;",
      ),
      styles.replace(
        "width: var(--stamp-width); height: var(--stamp-height);",
        "width: var(--stamp-width); height: var(--stamp-height); inset-inline-start: 3px;",
      ),
      styles.replace("/* PIXEL_ART_GEOMETRY_END */", ""),
    ];
    for (const mutation of mutations) {
      expect(() => assertContract(html, mutation, responsive)).toThrow();
    }
  });

  test("Given responsive boundaries or physical controls drift, When the contract is inspected, Then every mutation is rejected", () => {
    const mutations = [
      responsive.replace("max-width: 900px", "max-width: 899px"),
      responsive.replace("max-width: 600px", "max-width: 599px"),
      responsive.replace("--dpad-size: 112px", "--dpad-size: 114px"),
      responsive.replace("--action-size: 56px", "--action-size: 55px"),
      responsive.replace(
        "padding: var(--space-2) var(--space-3);",
        "padding: 8px 12px;",
      ),
      responsive.replace(
        "box-shadow: var(--shadow-step) var(--shadow-step) 0 var(--chrome-ink);",
        "box-shadow: 4px 4px 0 var(--chrome-ink);",
      ),
    ];
    for (const mutation of mutations) {
      expect(() => assertContract(html, styles, mutation)).toThrow();
    }
  });

  test("Given the application entry graph, When its runtime imports are inspected, Then only the tile application is connected", () => {
    expect(main).toMatch(/export\s+async\s+function\s+createApplication/);
    expect(main).not.toMatch(
      /(?:from\s+["'][^"']*(?:three|world|stage|explorer|camera-zoom|movement-controller|effects|touch-joystick)|MapControls|fastTravel|\bzoom\b)/,
    );
  });
});
