# Generated book content

Run `bun scripts/convert-latex-content.mjs` (or the same command with Node) to
regenerate the Spanish and English Markdown from `tmp/source/AC`.
After regenerating, run `tmp/board-venv/bin/python scripts/render-chessboards.py`
to rebuild and inject the source-faithful SVG chessboards.

Each locale contains one Markdown file per `\\input` in the book's `main.tex`,
plus a bibliography page and `manifest.json` for deterministic navigation.
The navigation contract mirrors `main.tex`: `bookChapter` identifies chapters
`0`–`5`, appendices `A`–`D`, or `references`; `sectionNumber` identifies the
section route (`1.1`, `3.0`, etc.); `bookChapterTitle` and `sectionTitle` are
localized; and `navDepth` is `1` for landings/appendices and `2` for sections.
Images intentionally use `/assets/book/...`; the site build is responsible for
making the repository's `images` directory available at that public path.

Most LaTeX is converted to portable Markdown/HTML. Chessboard diagrams expose
their source positions as `.chessboard[data-fen]`. Unsupported drawing/layout
constructs are emitted as visible `.latex-source` blocks instead of being lost.
TikZ flowcharts are converted to localized Mermaid definitions, including node
shapes, decision labels, and return edges.
