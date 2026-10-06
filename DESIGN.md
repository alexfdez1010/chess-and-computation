---
name: "Ajedrez y Computación"
description: "A modern mathematics manual for studying chess algorithms"
colors:
  paper: "#fafbff"
  paper-raised: "#edf1fb"
  ink: "#142248"
  ink-soft: "#505d78"
  line: "#d5dcef"
  line-strong: "#8896b6"
  accent: "#2345ec"
  accent-soft: "#e3e9ff"
  board-dark: "#3454d4"
  board-light: "#e3e9ff"
  code: "#121b32"
  citron: "#d9f65c"
  cover: "#2345ec"
  cover-ink: "#ffffff"
  primary-hover: "#ebff9e"
  rail-hover: "#e8ff92"
  cover-board-dark: "#b7c6ff"
  dark-paper: "#121b32"
  dark-paper-raised: "#182540"
  dark-ink: "#edf1ff"
  dark-ink-soft: "#b2bed7"
  dark-line: "#34425f"
  dark-line-strong: "#7d8cac"
  dark-accent: "#9cacff"
  dark-accent-soft: "#263667"
  dark-board-dark: "#5671cc"
  dark-board-light: "#283655"
  dark-code: "#0b1223"
typography:
  display:
    fontFamily: "'Archivo Black', 'Archivo', sans-serif"
    fontSize: "clamp(64px, 7.1vw, 96px)"
    fontWeight: 400
    lineHeight: 0.98
    letterSpacing: "-.035em"
  headline:
    fontFamily: "'Archivo Black', 'Archivo', sans-serif"
    fontSize: "clamp(38px, 4.2vw, 62px)"
    fontWeight: 400
    lineHeight: 1.06
    letterSpacing: "-.03em"
  section:
    fontFamily: "'Archivo Black', 'Archivo', sans-serif"
    fontSize: "clamp(28px, 2.7vw, 38px)"
    fontWeight: 400
    lineHeight: 1.2
    letterSpacing: "-.025em"
  title:
    fontFamily: "'Archivo', 'Helvetica Neue', Arial, sans-serif"
    fontSize: "23px"
    fontWeight: 750
    lineHeight: 1.3
    letterSpacing: "-.015em"
  body:
    fontFamily: "'Source Serif 4', Georgia, serif"
    fontSize: "20px"
    fontWeight: 400
    lineHeight: 1.8
  body-mobile:
    fontFamily: "'Source Serif 4', Georgia, serif"
    fontSize: "18px"
    fontWeight: 400
    lineHeight: 1.8
  label:
    fontFamily: "'Archivo', 'Helvetica Neue', Arial, sans-serif"
    fontSize: "13px"
    fontWeight: 450
    lineHeight: 1.45
  caption:
    fontFamily: "'Archivo', 'Helvetica Neue', Arial, sans-serif"
    fontSize: "13px"
    fontWeight: 500
    lineHeight: 1.6
  coordinate:
    fontFamily: "'SFMono-Regular', Consolas, 'Liberation Mono', monospace"
    fontSize: "12px"
rounded:
  square: "0"
  code: "2px"
  control: "3px"
  dialog: "8px"
spacing:
  control-gap: "8px"
  header-gap: "12px"
  navigation-gap: "16px"
  inset: "24px"
  section-gap: "32px"
  chapter-gap: "44px"
components:
  button-primary:
    backgroundColor: "{colors.citron}"
    textColor: "{colors.ink}"
    rounded: "{rounded.control}"
    padding: "14px 20px"
  button-primary-hover:
    backgroundColor: "{colors.primary-hover}"
  button-secondary:
    backgroundColor: "transparent"
    textColor: "{colors.cover-ink}"
    rounded: "{rounded.control}"
    padding: "12px 0"
  navigation-current:
    backgroundColor: "{colors.cover}"
    textColor: "{colors.paper}"
    rounded: "{rounded.square}"
    padding: "10px 8px"
  pagination:
    backgroundColor: "{colors.paper-raised}"
    textColor: "{colors.ink}"
    rounded: "{rounded.square}"
    padding: "24px"
  read-status:
    backgroundColor: "{colors.paper}"
    textColor: "{colors.ink}"
    rounded: "{rounded.square}"
    padding: "12px 16px"
  read-status-done:
    backgroundColor: "{colors.citron}"
    textColor: "{colors.ink}"
  search-input:
    backgroundColor: "transparent"
    textColor: "{colors.ink}"
    padding: "10px"
---

# Design System: Ajedrez y Computación

## Overview

**Creative North Star: "Mathematics in play"**

A bright mathematics manual with assertive cobalt fields, citron actions and quiet study pages. Large, compact display type identifies the book and chapters; serif prose supports sustained reading. Chess geometry represents actual positions and legal moves.

The system serves students navigating a bilingual book. Hierarchy comes from type, spacing and meaningful color states. The book title, author, educational text and source diagrams remain authoritative.

**Key Characteristics:**
- Cobalt identity and citron actions
- Archivo Black headings, Archivo controls, Source Serif study prose
- Flat rectangular surfaces and purposeful chess geometry
- Equivalent Spanish and English reading experiences

## Colors

### Primary

Cobalt (`accent`, `cover`) anchors the cover, chapter numbers and current chapter. The cover retains its saturated identity in both themes; reading links use the theme's accent.

### Secondary

Citron marks the principal reading action, the chapter rail, selected cover square and completed reading state. Its controls keep dark ink in either theme. Lighter citron fills distinguish action and rail hover states.

### Neutral

Paper is a near-white study canvas; raised paper groups controls, navigation and quotations. Ink and soft ink separate primary prose from descriptions and captions. White is reserved for the cover and cobalt identity surfaces. Dark mode substitutes the `dark-*` values for corresponding reading tokens. Board and code colors remain semantic roles.

**The State Color Rule.** Keep the current chapter cobalt, the current in-page heading in the soft accent, and completed reading citron; these states convey different information.

## Typography

Use the frontmatter roles and the self-hosted families declared in `src/styles/fonts.css`. Archivo Black is a static face at weight 400. Archivo supplies normal UI weights 400–900; Source Serif 4 supplies normal and italic weights 400–700. Font provenance and SIL Open Font License copies live in `public/fonts/README.md`.

Display and chapter headings are compact and tightly tracked. The cover's final title line uses `clamp(37px, 4.8vw, 68px)`; its serif conjunction uses `clamp(26px, 3vw, 38px)`. Chapter section headings use the `section` role; smaller headings and index entries use Archivo. Prose has a maximum measure of 68ch. Captions use Archivo, while coordinates, section references and code use the monospace stack.

At 640px and below, chapter titles use `clamp(33px, 9vw, 48px)` with line height 1.09; section headings are 28px and tertiary headings 22px. The mobile cover uses `clamp(58px, 18vw, 84px)` and `clamp(34px, 10.3vw, 50px)` for its two title lines.

**The Heading Rule.** Do not append decorative periods to titles or subtitles. Preserve punctuation that belongs to the educational source.

## Layout

The sticky header is 76px high, becoming 64px at 640px. Chapter pages use a 290px desktop index and a main container up to 1180px wide. Desktop chapter padding is `clamp(40px, 5vw, 72px)` vertically and `clamp(32px, 5vw, 80px)` horizontally. The homepage has no desktop sidebar; its cover is full width and its directory has a 1440px maximum canvas. Cover content uses a 1312px alignment reference and a two-column 1.15:1 grid. The board is at most 520px wide.

- At 1180px and above, the language name is visible beside its code.
- At 901–1150px, chapter identity stacks to protect long translated titles. At 901–1100px the cover tightens its padding and title scale.
- At 1100px and above, eligible interactive lessons pair the stage and explanation in two columns.
- At 900px and below, the chapter sidebar becomes a drawer up to `min(340px, 88vw)`, and the directory becomes one column. The cover remains two columns until 640px. The five-chapter rail scrolls horizontally with at least 160px per entry.
- At 640px and below, the cover and chapter identity stack; the board is at most 370px wide; chapter padding becomes `32px 22px 52px`; pagination becomes one column; tables scroll locally.
- At 360px and below, the wordmark text is hidden and cover actions stack.

Use `100dvh` for viewport-dependent surfaces. Equations, code and tables own their overflow; they must not widen the page.

## Elevation & Depth

Surfaces are flat at rest. Paper and raised paper provide depth without card shadows. The mobile navigation drawer alone uses `20px 0 60px color-mix(in srgb, var(--ink) 15%, transparent)` to distinguish an overlay. The search modal uses a translucent ink backdrop with 3px blur and no surface shadow. Small inset checkbox and diagram-marker outlines indicate state rather than elevation.

## Shapes

Reading surfaces, chapter numbers, navigation and pagination are square. Small controls use the control radius; the search dialog alone has the dialog radius. Figure vectors retain their semantic shapes, including decision nodes, chess squares and move paths.

**The Meaningful Geometry Rule.** Borders and lines must communicate content, a control boundary, focus or state. Use spacing and type to group headers, indexes, footers and pagination; do not add decorative divider lines.

## Components

### Buttons

The primary cover action is a citron rectangle with dark ink, a minimum height of 52px and an inline SVG arrow. Hover lightens the fill and moves the arrow 4px. The quiet secondary cover action is white text on the cobalt field and turns citron on hover. Ordinary controls target at least 44px. Focus uses a 2px accent outline with 5px offset; on the cover it is citron. Active buttons move down 1px.

### Navigation

Chapter links use a number column and wrapping Archivo title, a minimum height of 44px, and no ornamental rule. Current chapters use cobalt with light text and citron numbering in both themes; hover uses soft accent. In-page headings have a separate soft-accent location state. The mobile drawer traps focus while open and makes background content inert.

### Search

The input is borderless inside a header separated from results by one meaningful line. Its focus outline is inset by 2px. The dialog is at most 680px wide and `min(680px, 80dvh)` tall. Results use number/title/description rows, soft-accent hover and focus, and a persistent status count. The close target is 44px.

### Reading state and pagination

The read toggle has a meaningful outline and square checkbox; completion switches it to citron. Its pressed state and label remain synchronized. Previous/next cards use raised paper, square corners and no border; hover uses soft accent. A 3px reading-progress meter sits at the header's lower edge above the article.

### Cover board and lessons

The cover's own SVG shows an 8×8 board and legal opening moves from the published knight tour. Its path traces once over 1800ms; reduced motion shows the completed path. The board links to the actual lesson. Interactive study figures preserve original figures, captions and semantic descriptions. Their colors, connections and highlighted squares describe algorithm state.

## Do's and Don'ts

### Do

- **Do** use the actual book index, section numbers and legal chess geometry.
- **Do** keep study prose at 68ch with the implemented serif roles.
- **Do** preserve visible keyboard focus, reduced-motion behavior and equivalent bilingual routes.
- **Do** keep borders and diagram lines only when they communicate content or state.

### Don't

- **Don't** add decorative divider lines or periods to headings.
- **Don't** introduce shadowed cards or rounded containers into ordinary reading layouts.
- **Don't** replace educational text, source diagrams or real chapter labels with invented content.
- **Don't** turn the cover's fixed cobalt into the dark theme's softer link accent.
