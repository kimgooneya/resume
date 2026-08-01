# Classic A4 Resume Design System

## 0. Research Log

- Embedded refs: shortlisted `notion.md`, `wired.md`, and `claude.md` for editorial, paper-like document surfaces; picked `minimalist-skill.md` + `notion.md` because the request is a classic, readable, print-first resume without decorative UI.
- Lazyweb: skipped because this is a static offline document, not a product-screen research task.
- Imagen drafts: skipped because the output must remain text-first, selectable, and reliable when exported to PDF.

## 1. Atmosphere & Identity

A quiet editorial resume that feels like a well-typeset professional document rather than a marketing page. The signature is a warm paper canvas, restrained ink-blue accents, thin rules, and a strong typographic hierarchy that keeps the candidate's role and impact easy to scan.

## 2. Color

### Palette

| Role | Token | Value | Usage |
|---|---|---|---|
| Paper | `--paper` | `#fbfaf7` | Resume sheet background |
| Paper surround | `--paper-surround` | `#e8e5df` | Screen-only canvas around the sheet |
| Ink | `--ink` | `#242321` | Headings and primary body text |
| Ink secondary | `--ink-secondary` | `#625f59` | Supporting descriptions and metadata |
| Ink muted | `--ink-muted` | `#8c8880` | Captions and dates |
| Rule | `--rule` | `#d9d5ce` | Dividers and timeline rules |
| Accent | `--accent` | `#24546a` | Section labels, links, role highlights |
| Accent soft | `--accent-soft` | `#e7eff1` | Small evidence labels and subtle callouts |

### Rules

- The accent is used only for navigational or semantic emphasis, never as a large decorative fill.
- Body text stays near-black rather than pure black for comfortable print reading.
- Screen-only surround and shadow disappear in print.

## 3. Typography

### Scale

| Token | Value | Weight | Usage |
|---|---:|---:|---|
| `--type-name` | `30px` | 700 | Candidate name |
| `--type-title` | `11px` | 700 | Professional title and eyebrow |
| `--type-section` | `11px` | 700 | Section headings |
| `--type-project` | `12px` | 700 | Project names |
| `--type-body` | `10.5px` | 400 | Resume body copy |
| `--type-meta` | `9.5px` | 600 | Dates, technologies, compact labels |
| `--type-footer` | `9px` | 400 | Page footer and document notes |

### Font Stack

- Primary: `"Noto Sans KR", "Apple SD Gothic Neo", "Malgun Gothic", sans-serif`
- Display serif: `"Iowan Old Style", "Palatino Linotype", "Book Antiqua", "Noto Serif KR", serif`
- Mono: `"SFMono-Regular", "Cascadia Code", "Liberation Mono", monospace`

### Rules

- Korean copy uses `word-break: keep-all` and `overflow-wrap: anywhere` only for long URLs or identifiers.
- Body text never falls below 8.5px in print.
- Display serif is limited to the name and short pull quote so it remains legible with Korean fallback fonts.

## 4. Spacing & Layout

The base unit is 4px. The physical page is A4 portrait: 210mm × 297mm, with 16mm top/bottom and 17mm side padding.

| Token | Value | Usage |
|---|---:|---|
| `--space-1` | `4px` | Inline labels and metadata |
| `--space-2` | `8px` | Compact list spacing |
| `--space-3` | `12px` | Project internals |
| `--space-4` | `16px` | Section separation |
| `--space-5` | `20px` | Major content separation |
| `--page-width` | `210mm` | Physical page width |
| `--page-height` | `297mm` | Physical page height |
| `--page-padding-x` | `17mm` | Printable side inset |
| `--page-padding-y` | `16mm` | Printable top/bottom inset |

### Grid

- Desktop and print: a fixed 25mm metadata rail and flexible content column for experience rows.
- Page 1: masthead, profile, competencies, and the four most recent project groups.
- Page 2: remaining project groups, working strengths, selected outcomes, and positioning statement.
- Screen widths below 840px collapse every experience row to one readable column so the layout remains readable on tablet screens.

## 5. Components

### Resume Sheet

- **Structure**: outer `main.print-preview` containing `article.resume-sheet` sheets; each sheet uses `header + sections + footer`
- **Variants**: screen, print
- **Spacing**: page padding tokens; section gap `--space-5`
- **States**: default, print
- **Accessibility**: semantic landmarks, logical heading order, selectable text, visible link underlines
- **Motion**: none in print; screen-only link color transitions are optional and non-essential
- **Layout**: fixed A4 page on desktop screen and print; narrow screens use a full-width single-column reading layout with no horizontal overflow

### Masthead

- **Structure**: name, professional title, contact links, short positioning statement
- **Variants**: full masthead on page 1; compact running context on page 2
- **Spacing**: `--space-2` and `--space-4`
- **States**: default
- **Accessibility**: contact items are real anchors with descriptive labels
- **Motion**: none required
- **Layout**: two-column desktop row, stacked narrow-screen row

### Section Heading

- **Structure**: overline label, title, thin rule
- **Variants**: `profile`, `competencies`, `experience`, `strengths`, `outcomes`
- **Spacing**: `--space-4` above, `--space-2` below
- **States**: default
- **Accessibility**: each section has a unique heading and predictable order
- **Motion**: none
- **Layout**: full content width

### Experience Row

- **Structure**: metadata rail, project title, role line, contribution bullets, evidence line
- **Variants**: single project, grouped domain projects
- **Spacing**: `--space-2` to `--space-3`; `--rule` between rows
- **States**: default, print
- **Accessibility**: list semantics for contributions; dates exposed as text, not color alone
- **Motion**: none
- **Layout**: two-column rail/content grid; one column below 840px

### Evidence Label

- **Structure**: short metric or technology phrase in a compact inline label
- **Variants**: metric, technology, caveat
- **Spacing**: `4px 7px`
- **States**: default
- **Accessibility**: text remains meaningful without background color
- **Motion**: none
- **Layout**: inline cluster with wrapping allowed

## 6. Motion & Interaction

- This is a print-first static document. No entrance, scroll, or decorative animation is used.
- Contact links may change from `--accent` to `--ink` on hover, but the page remains fully understandable without hover.
- `prefers-reduced-motion` is respected by keeping the document motion-free.

## 7. Depth & Surface

The strategy is `borders-only` with a paper surface. The screen preview may use one very soft shadow on the page sheet; print removes it completely. No gradients, glass, large cards, or decorative illustrations are used.

## 8. Accessibility Constraints & Accepted Debt

### Constraints

- Target WCAG 2.2 AA for text and links.
- All content remains selectable and available in the DOM; no information is encoded only in color.
- Links have visible text and print-friendly URLs where appropriate.
- Korean text must not produce single-syllable orphan lines in headings or key statements at 375px, 768px, or A4 print width.
- The document must print without clipping, horizontal overflow, or accidental background-color dependence.

### Accepted Debt

| Item | Location | Why accepted | Exit |
|---|---|---|---|
| Actual employment dates and contact details are placeholders for final review | `developer-resume.html` | The project audit provides repository activity dates, not HR-confirmed employment records | Replace with verified personal data before submission |
| Private repository names may need anonymization | `developer-resume.html` | NDA and company policy can restrict disclosure | Replace names with product/domain descriptions before external sharing |
