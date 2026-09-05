# Chess and Computation design system

This system translates the visual logic of chess into an editorial reading experience. It avoids decorative chess motifs unless they communicate structure, state, or movement.

## Principles

1. **The page is the board.** Layouts use a stable grid, clear ranks of information, and deliberate asymmetry.
2. **Content remains primary.** Long-form text, equations, diagrams, and code are never placed inside ornamental cards.
3. **One move at a time.** Motion explains a transition or sequence. It does not run continuously without purpose.
4. **Both languages are first-class.** Spanish and English share routes, hierarchy, components, and equivalent visual assets.
5. **Source fidelity beats reinvention.** Original vectors and diagrams are reused when language-neutral. Localized web diagrams replace image text that would be wrong for the active language.

## Design dials

- Design variance: **6/10**. Editorial offset without sacrificing navigation.
- Motion intensity: **4/10**. Load and state transitions only, always reduced-motion safe.
- Visual density: **5/10**. Comfortable reading with a persistent, information-rich index.

## Color tokens

| Token | Light | Dark | Purpose |
| --- | --- | --- | --- |
| `--paper` | `#f3f3ed` | `#111512` | Page canvas |
| `--paper-raised` | `#fafaf6` | `#171c19` | Controls and figures |
| `--ink` | `#171a18` | `#eef1eb` | Primary text |
| `--ink-soft` | `#5c625e` | `#a9b0aa` | Secondary text |
| `--accent` | `#176b4d` | `#66c69d` | Links, active state, progress |
| `--accent-soft` | `#d8e7df` | `#1b3b2e` | Selection and depth |
| `--board-dark` | `#225f49` | `#2f8d67` | Dark chess squares |
| `--board-light` | `#dfe6da` | `#29332c` | Light chess squares |

The green accent is the only chromatic accent. Amber is reserved for semantic move arrows and highlighted squares inside chess diagrams.

## Typography

- Display and long-form body: an editorial system serif with local fallbacks (`Iowan Old Style`, Baskerville, Georgia).
- Navigation and UI: Avenir/Helvetica family.
- Coordinates, metadata, and code: platform monospace.
- Maximum prose measure: 68 characters, with a 20px base and 1.8 line height on desktop; 18px on mobile.

Serif is intentional here because the product is a book and publication, not a marketing dashboard.

## Geometry

- Base radius: 5px. Buttons, controls, figures, and focus surfaces use the same restrained radius.
- Header: 68px desktop, 60px mobile.
- Sidebar: 280px desktop, off-canvas below 900px.
- Reading content: 1060px page container, 68ch prose measure.
- The 8x8 rhythm appears in chess assets and spacing decisions, not as decorative grid lines across the entire page.

## Components

### Header

Sticky, single-line, and under 80px. It exposes search, equivalent-language navigation, theme, and the mobile contents trigger.

### Book index

Persistent on desktop chapter pages and off-canvas on mobile. The homepage uses its full-width index instead of repeating the sidebar. Active sections use `--accent-soft`; hierarchy is expressed with grouping and whitespace.

### Chapter page

Chapter identity, semantic headings, rendered equations, original or localized figures, reading state, and adjacent chapter navigation.

### Chessboards

Primary presentation uses pre-rendered SVGs generated from the structured source position. Every board retains a semantic fallback with piece, square, mark, label, and arrow data.

### Localized diagrams

Used only when an original image contains language-specific text without a counterpart. Labels are selected from the active locale, and motion collapses under `prefers-reduced-motion`.

### Flowcharts

Algorithm flowcharts and the four notation examples are generated from the
source TikZ with Mermaid. Terminal, input/output, decision, and process shapes
remain semantically distinct; branch labels and return edges must match the
book. Mermaid is loaded only on routes containing a flowchart, and every chart
retains a localized text fallback and an accessible figure label.

### Search

Keyboard-accessible dialog with a named mobile trigger, visible input focus, and a 44px close target. Results always link to the active locale and expose a clear empty state.

## Accessibility

- WCAG AA color contrast is the minimum; body text targets AAA.
- Every interactive element has a visible focus state and tactile active feedback.
- A skip link precedes global navigation.
- Theme defaults to the operating-system preference and can be overridden.
- Motion is disabled for reduced-motion preferences.
- Figures have captions and meaningful alternative text; chessboards keep structured semantic descriptions.

## Responsive behavior

- At 900px and below: sidebar becomes off-canvas and all main layouts become a single column. Closed navigation is inert; open navigation contains keyboard focus and makes background content inert. Escape, the menu button, and the backdrop dismiss it.
- At 901–1150px: chapter headers stack to keep long bilingual titles readable beside the index.
- At 640px and below: controls compact to icons, chapter headers stack, tables scroll horizontally, and pagination becomes one column.
- No layout uses `h-screen`; viewport-dependent heights use `100dvh`.

## SEO and sharing

Every route must provide canonical and alternate-language links, localized Open Graph metadata, Twitter cards, and structured data. The project ships a sitemap, robots policy, real favicon, and 1200x630 share images.

## Homepage and information hierarchy

- A 1440px maximum canvas pairs the title and reading action with the existing editorial image.
- No ornamental borders, image shadows, topic strips, or edition badges. The hero identifies the author and states the subject and free access once. Language switching stays in the header.
- The reading action is primary; buying the print book is a quiet secondary link.
- Index entries pair a serif title with a readable description at every viewport size. Numbers support hierarchy without competing with titles.
- Header controls have 44px targets. Navigation uses 14px text, captions use 12–13px text, and metadata uses at least 11px where practical.
- Wide equations and code scroll inside their own containers; citations wrap without widening the page.
- Use whitespace for header, sidebar, index, and pagination grouping. Keep borders only when they communicate content or state: table cells, diagram connections, checkboxes, focus outlines, and the search input/results boundary.
- Chapter descriptions remain in metadata, search, and the index; do not repeat them above the opening paragraph. Avoid repeating the chapter category below the breadcrumb.
- Use direct labels such as “Contents” instead of promotional headings or explanatory copy that merely describes the interface.
