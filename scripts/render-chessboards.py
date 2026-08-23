#!/usr/bin/env python3
"""Render every declarative book chessboard as a stable, deduplicated SVG.

The semantic board data in ``src/content/{es,en}`` remains the source of truth
and doubles as the accessible/client-rendered fallback.  Install the sole
dependency with:

    python3 -m pip install python-chess

Then run this script from the repository root.  It writes only
``public/assets/boards`` and patches the chessboard divs in the Markdown files.
"""

from __future__ import annotations

import hashlib
import html
from html.parser import HTMLParser
import json
from pathlib import Path
import re
import sys
import xml.etree.ElementTree as ET

try:
    import chess
    import chess.svg
except ImportError as error:  # pragma: no cover - exercised by a clean machine
    raise SystemExit(
        "python-chess is required: python3 -m pip install python-chess"
    ) from error


ROOT = Path(__file__).resolve().parents[1]
CONTENT = ROOT / "src" / "content"
OUTPUT = ROOT / "public" / "assets" / "boards"
DIV_RE = re.compile(r'<div\s+[^>]*class="chessboard"[^>]*>(?:\s*<img\s+[^>]*>)?\s*</div>')
SVG_NS = "http://www.w3.org/2000/svg"
XLINK_NS = "http://www.w3.org/1999/xlink"
ET.register_namespace("", SVG_NS)
ET.register_namespace("xlink", XLINK_NS)

COLORS = {
    "square light": "#e9eadf",
    "square dark": "#557363",
    "square light lastmove": "#b8cbbd",
    "square dark lastmove": "#315b49",
    "margin": "#18261f",
    "inner border": "#18261f",
    "outer border": "#18261f",
    "coord": "#f1f0e8",
    "arrow green": "#195f47d9",
    "arrow yellow": "#b17c28d9",
}


class FirstTag(HTMLParser):
    def __init__(self) -> None:
        super().__init__()
        self.attrs: dict[str, str] = {}

    def handle_starttag(self, tag: str, attrs: list[tuple[str, str | None]]) -> None:
        if tag == "div" and not self.attrs:
            self.attrs = {key: value or "" for key, value in attrs}


def parse_attrs(fragment: str) -> dict[str, str]:
    parser = FirstTag()
    parser.feed(fragment)
    return parser.attrs


def canonical(attrs: dict[str, str]) -> str:
    semantic = {
        key: value
        for key, value in attrs.items()
        if key.startswith("data-") and key not in {"data-rendered", "data-board-asset"}
    }
    return json.dumps(semantic, sort_keys=True, ensure_ascii=False, separators=(",", ":"))


def board_name(attrs: dict[str, str]) -> str:
    digest = hashlib.sha256(canonical(attrs).encode()).hexdigest()[:16]
    return f"board-{attrs.get('data-size', '8')}x{attrs.get('data-size', '8')}-{digest}.svg"


def square_parts(value: str, size: int) -> tuple[int, int] | None:
    match = re.fullmatch(r"([a-j])(10|[1-9])", value.strip(), re.I)
    if not match:
        return None
    file_index = ord(match.group(1).lower()) - ord("a")
    rank = int(match.group(2))
    if file_index >= size or rank > size:
        return None
    return file_index, rank


def parse_pairs(value: str, size: int) -> list[tuple[tuple[int, int], tuple[int, int]]]:
    pairs = []
    for item in filter(None, (part.strip() for part in value.split(","))):
        match = re.fullmatch(r"([a-j](?:10|[1-9]))\s*(?:-|:|>)\s*([a-j](?:10|[1-9]))", item, re.I)
        if not match:
            continue
        start, end = square_parts(match.group(1), size), square_parts(match.group(2), size)
        if start and end:
            pairs.append((start, end))
    return pairs


def board_from_attrs(attrs: dict[str, str]) -> chess.Board:
    fen = attrs.get("data-fen", "start")
    pieces = attrs.get("data-pieces", "").strip()
    if pieces:
        board = chess.Board(None)
        for notation in filter(None, (part.strip() for part in pieces.split(","))):
            match = re.fullmatch(r"([kqrbnpKQRBNP])([a-h][1-8])", notation)
            if match:
                board.set_piece_at(chess.parse_square(match.group(2)), chess.Piece.from_symbol(match.group(1)))
        return board
    if fen == "start":
        return chess.Board()
    return chess.Board(fen)


def labels(attrs: dict[str, str]) -> dict[str, str]:
    try:
        value = json.loads(attrs.get("data-labels", "{}"))
        return {str(key): str(label) for key, label in value.items()}
    except (TypeError, ValueError):
        return {}


def add_svg_labels(svg: str, attrs: dict[str, str], size: int) -> str:
    values = labels(attrs)
    if not values:
        return svg
    root = ET.fromstring(svg)
    # python-chess: 15 unit coordinate margin, 1 unit inner/outer borders,
    # then 45 units per square.
    offset, square = 17, 45
    for name, value in values.items():
        position = square_parts(name, size)
        if not position:
            continue
        file_index, rank = position
        node = ET.SubElement(root, f"{{{SVG_NS}}}text", {
            "x": str(offset + (file_index + 0.5) * square),
            "y": str(offset + (size - rank + 0.5) * square),
            "text-anchor": "middle",
            "dominant-baseline": "central",
            "font-family": "ui-monospace, SFMono-Regular, Menlo, monospace",
            "font-size": "13",
            "font-weight": "700",
            "fill": "#ffffff" if (file_index + rank) % 2 else "#17231d",
        })
        node.text = value
    return ET.tostring(root, encoding="unicode")


def render_standard(attrs: dict[str, str]) -> str:
    board = board_from_attrs(attrs)
    marked = [] if labels(attrs) else parse_pairs(attrs.get("data-marks", ""), 8)
    arrows = []
    for start, end in parse_pairs(attrs.get("data-arrows", ""), 8) + marked:
        # ``square_parts`` keeps human-readable ranks (1..8), while
        # python-chess expects a zero-based rank index.
        from_square = chess.square(start[0], start[1] - 1)
        to_square = chess.square(end[0], end[1] - 1)
        arrows.append(chess.svg.Arrow(from_square, to_square, color="#195f47d9"))
    svg = chess.svg.board(
        board,
        arrows=arrows,
        coordinates=True,
        borders=True,
        colors=COLORS,
        size=None,
        style=".piece { filter: drop-shadow(0 1px 0 rgba(255,255,255,.18)); }",
    )
    return add_svg_labels(svg, attrs, 8)


def custom_piece_defs(symbols: set[str]) -> str:
    return "".join(chess.svg.PIECES[symbol] for symbol in sorted(symbols))


def render_variable(attrs: dict[str, str], size: int) -> str:
    square, margin, border = 45, 15, 1
    offset = margin + border * 2
    full = size * square + 2 * offset
    pieces: list[tuple[str, int, int]] = []
    for notation in filter(None, (part.strip() for part in attrs.get("data-pieces", "").split(","))):
        match = re.fullmatch(r"([kqrbnpKQRBNP])([a-j](?:10|[1-9]))", notation)
        position = square_parts(match.group(2), size) if match else None
        if match and position:
            pieces.append((match.group(1), *position))

    out = [
        f'<svg xmlns="{SVG_NS}" xmlns:xlink="{XLINK_NS}" viewBox="0 0 {full} {full}" role="img">',
        f'<defs>{custom_piece_defs({piece[0] for piece in pieces})}'
        '<marker id="arrowhead" markerWidth="8" markerHeight="8" refX="6" refY="3" orient="auto" markerUnits="strokeWidth"><path d="M0,0 L0,6 L7,3 z" fill="#195f47"/></marker></defs>',
        f'<rect x="0" y="0" width="{full}" height="{full}" rx="2" fill="{COLORS["margin"]}"/>',
    ]
    for file_index in range(size):
        for row in range(size):
            rank = size - row
            color = COLORS["square dark"] if (file_index + rank) % 2 else COLORS["square light"]
            out.append(f'<rect x="{offset + file_index*square}" y="{offset + row*square}" width="{square}" height="{square}" fill="{color}"/>')
    coord_style = 'font-family="ui-monospace,monospace" font-size="8" font-weight="700" fill="#f1f0e8" text-anchor="middle"'
    for file_index in range(size):
        x = offset + (file_index + 0.5) * square
        out.append(f'<text x="{x}" y="11" {coord_style}>{chr(97+file_index)}</text><text x="{x}" y="{full-5}" {coord_style}>{chr(97+file_index)}</text>')
    for rank in range(1, size + 1):
        y = offset + (size - rank + 0.5) * square + 3
        out.append(f'<text x="8" y="{y}" {coord_style}>{rank}</text><text x="{full-8}" y="{y}" {coord_style}>{rank}</text>')
    for symbol, file_index, rank in pieces:
        x, y = offset + file_index * square, offset + (size-rank) * square
        out.append(f'<use href="#{"white" if symbol.isupper() else "black"}-{chess.piece_name(chess.PIECE_SYMBOLS.index(symbol.lower()))}" x="{x}" y="{y}"/>')
    values = labels(attrs)
    for name, value in values.items():
        position = square_parts(name, size)
        if position:
            file_index, rank = position
            x, y = offset + (file_index + .5)*square, offset + (size-rank+.5)*square
            fill = "#ffffff" if (file_index + rank) % 2 else "#17231d"
            out.append(f'<text x="{x}" y="{y}" text-anchor="middle" dominant-baseline="central" font-family="ui-monospace,monospace" font-size="13" font-weight="700" fill="{fill}">{html.escape(value)}</text>')
    pairs = parse_pairs(attrs.get("data-arrows", ""), size)
    if not values:
        pairs += parse_pairs(attrs.get("data-marks", ""), size)
    for start, end in pairs:
        x1, y1 = offset+(start[0]+.5)*square, offset+(size-start[1]+.5)*square
        x2, y2 = offset+(end[0]+.5)*square, offset+(size-end[1]+.5)*square
        if start == end:
            out.append(f'<circle cx="{x1}" cy="{y1}" r="14" fill="none" stroke="#195f47" stroke-width="4" opacity=".86"/>')
        else:
            dx, dy = x2-x1, y2-y1
            length = max((dx*dx+dy*dy)**.5, 1)
            x2, y2 = x2-dx/length*10, y2-dy/length*10
            out.append(f'<line x1="{x1}" y1="{y1}" x2="{x2}" y2="{y2}" stroke="#195f47" stroke-width="5" stroke-linecap="round" opacity=".86" marker-end="url(#arrowhead)"/>')
    out.append("</svg>")
    return "".join(out)


def render(attrs: dict[str, str]) -> str:
    size = max(1, min(10, int(attrs.get("data-size", "8"))))
    return render_standard(attrs) if size == 8 else render_variable(attrs, size)


def patched_div(fragment: str, attrs: dict[str, str], filename: str) -> str:
    # Preserve every original semantic/accessibility attribute. data-rendered
    # prevents the legacy Unicode renderer from replacing the source-faithful SVG.
    opening = fragment[: fragment.index(">")]
    opening = re.sub(r'\s+data-(?:rendered|board-asset)="[^"]*"', "", opening)
    opening += f' data-rendered="source" data-board-asset="{filename}"'
    image = (
        f'<img class="source-chessboard" src="/assets/boards/{filename}" alt="" '
        'aria-hidden="true" loading="lazy" decoding="async" '
        'style="display:block;width:100%;height:auto;margin:0;border-radius:0" '
        'onerror="this.parentElement.removeAttribute(\'data-rendered\');this.remove()" />'
    )
    return f"{opening}>{image}</div>"


def main() -> int:
    files = sorted((CONTENT / "es").glob("*.md")) + sorted((CONTENT / "en").glob("*.md"))
    occurrences: list[tuple[Path, str, dict[str, str]]] = []
    for path in files:
        source = path.read_text()
        for match in DIV_RE.finditer(source):
            attrs = parse_attrs(match.group(0))
            occurrences.append((path, match.group(0), attrs))

    unique: dict[str, dict[str, str]] = {}
    for _, _, attrs in occurrences:
        unique.setdefault(board_name(attrs), attrs)
    OUTPUT.mkdir(parents=True, exist_ok=True)
    for old in OUTPUT.glob("board-*.svg"):
        if old.name not in unique:
            old.unlink()
    for filename, attrs in unique.items():
        (OUTPUT / filename).write_text(render(attrs))

    for path in files:
        source = path.read_text()
        source = DIV_RE.sub(lambda match: patched_div(match.group(0), parse_attrs(match.group(0)), board_name(parse_attrs(match.group(0)))), source)
        path.write_text(source)

    es_count = sum(1 for path, _, _ in occurrences if path.parent.name == "es")
    en_count = len(occurrences) - es_count
    print(f"Rendered {len(unique)} unique SVGs for {es_count} es + {en_count} en board occurrences.")
    if es_count != en_count or len(unique) > es_count:
        print("Board parity/deduplication check failed.", file=sys.stderr)
        return 1
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
