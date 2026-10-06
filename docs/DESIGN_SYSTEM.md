# Design system and reading architecture

The canonical visual rules and implemented tokens are in [DESIGN.md](../DESIGN.md). The matching [.impeccable/design.json](../.impeccable/design.json) provides component previews, motion, breakpoints and metadata. Read those files before extending the interface. This document records functional behavior that the visual system must preserve.

## Sources and assets

- `BookLayout.astro` imports `global.css`, `redesign.css` and `reader.css` in that order; lesson behavior imports `lessons.css` separately.
- Self-hosted Archivo, Archivo Black and Source Serif 4 use `font-display: swap`. Official download sources and SIL Open Font License copies are recorded in [public/fonts/README.md](../public/fonts/README.md).
- The cover board and rook wordmark are local SVG geometry. No generated raster was added by the redesign. Existing book figures, icons and social assets remain project assets.
- Keep all source text, routes, chapter order, mathematics, figures and lesson models. Original language-neutral vectors are reused; diagrams with text use the active locale.

## Navigation and reading state

The homepage exposes the full book directory and five-chapter rail. Chapter pages retain a desktop index and an in-page heading list above it. Current chapter and current heading use distinct `aria-current` states. Opening the mobile index focuses the current chapter; closed navigation is inert, open navigation contains focus and makes background content inert. Escape, backdrop and menu button dismiss it.

Reading state and the last visited section remain on the device, separately for each language. Completed sections receive a check in both indexes; the homepage resumes the last visited section. The read toggle synchronizes its label and `aria-pressed`. Blocked or full storage falls back to page-local state without disabling controls. Restoring a chapter from browser history refreshes its visit and state. The reading meter updates after scrolling, resizing, figure changes and font loading.

## Search and themes

Search uses the active locale, ignores accents and matches every query word against real titles and descriptions. It preserves the query on reopen, renders at most twelve matches and announces the full match count separately. Enter opens the first match; arrow keys move between input and results; Tab follows native order. Header and status remain visible while results scroll. `/` opens search outside editable controls; Escape closes it and returns focus.

Theme defaults to the operating-system preference unless the reader saved an override. Both reading themes preserve contrast and focus. The cobalt cover, citron controls and cobalt chapter identity retain their visual identity across themes.

## Figures, accessibility and output

Chessboards retain structured descriptions of pieces, squares, labels, marks and arrows. Localized diagrams and interactive lessons retain captions and accessible fallback content. Flowcharts preserve the source's terminal, input/output, decision and process semantics, branch labels and return edges; Mermaid loads only on routes with flowcharts. Reduced motion disables decorative transitions and renders the cover path complete. Print hides interactive controls and exposes original lesson figures.

Keep the skip link, meaningful image alternatives, keyboard focus, localized labels and at least 44px ordinary control targets. Wide tables, equations and code scroll inside their own containers. Every route retains canonical and alternate-language URLs, localized social metadata and structured data. The sitemap, robots policy, favicon and existing share images remain part of the publication.
