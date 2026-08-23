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
- Maximum prose measure: 720px, with an 18px base and 1.82 line height on desktop.

Serif is intentional here because the product is a book and publication, not a marketing dashboard.

## Geometry

- Base radius: 4px. Buttons, controls, figures, and focus surfaces use the same restrained radius.
- Header: 68px desktop, 60px mobile.
- Sidebar: 292px desktop, off-canvas below 900px.
- Reading content: 920px page container, 720px prose measure.
- The 8x8 rhythm appears in chess assets and spacing decisions, not as decorative grid lines across the entire page.

## Components

### Header

Sticky, single-line, and under 80px. It exposes search, equivalent-language navigation, theme, and the mobile contents trigger.

### Book index

Persistent on desktop and off-canvas on mobile. Active sections use `--accent-soft`; hierarchy is expressed with grouping and whitespace.

### Chapter page

Chapter identity, localized deck, semantic headings, rendered equations, original or localized figures, reading state, and adjacent chapter navigation.

### Chessboards

Primary presentation uses pre-rendered SVGs generated from the structured source position. Every board retains a semantic fallback with piece, square, mark, label, and arrow data.

### Localized diagrams

Used only when an original image contains language-specific text without a counterpart. Labels are selected from the active locale, and motion collapses under `prefers-reduced-motion`.

### Search

Keyboard-accessible dialog. Results always link to the active locale and expose a clear empty state.

## Accessibility

- WCAG AA color contrast is the minimum; body text targets AAA.
- Every interactive element has a visible focus state and tactile active feedback.
- A skip link precedes global navigation.
- Theme defaults to the operating-system preference and can be overridden.
- Motion is disabled for reduced-motion preferences.
- Figures have captions and meaningful alternative text; chessboards keep structured semantic descriptions.

## Responsive behavior

- Below 900px: sidebar becomes off-canvas and all main layouts become a single column.
- Below 640px: controls compact to icons, chapter headers stack, tables scroll horizontally, and pagination becomes one column.
- No layout uses `h-screen`; viewport-dependent heights use `100dvh`.

## SEO and sharing

Every route must provide canonical and alternate-language links, localized Open Graph metadata, Twitter cards, and structured data. The project ships a sitemap, robots policy, real favicon, and 1200x630 share images.

