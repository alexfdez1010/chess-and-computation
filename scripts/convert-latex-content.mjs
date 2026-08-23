#!/usr/bin/env node

/**
 * Convert the bilingual LaTeX sources of "Ajedrez y Computacion" into the
 * deliberately boring Markdown contract consumed by Astro content collections.
 *
 * No npm dependencies are used: the script runs with either Bun or Node and is
 * deterministic, so generated content can be reviewed and regenerated easily.
 */

import { mkdir, readFile, writeFile } from "node:fs/promises";
import { dirname, join, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const ROOT = resolve(dirname(fileURLToPath(import.meta.url)), "..");
const SOURCE_ROOT = join(ROOT, "tmp/source/AC");
const OUTPUT_ROOT = join(ROOT, "src/content");
const LANGUAGES = ["es", "en"];
let bibliographyByKey = new Map();
let unavailableAssetsByLang = new Map(LANGUAGES.map((lang) => [lang, new Set()]));

const yamlString = (value) => JSON.stringify(String(value));

function slugify(value) {
  return plainText(value)
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "") || "section";
}

function stripComments(source) {
  return source
    .split("\n")
    .map((line) => {
      for (let i = 0; i < line.length; i += 1) {
        if (line[i] !== "%") continue;
        let slashes = 0;
        for (let j = i - 1; j >= 0 && line[j] === "\\"; j -= 1) slashes += 1;
        if (slashes % 2 === 0) return line.slice(0, i);
      }
      return line;
    })
    .join("\n");
}

function plainText(value) {
  return String(value ?? "")
    .replace(/<[^>]+>/g, " ")
    .replace(/^#{1,6}\s+/gm, "")
    .replace(/!\[([^\]]*)\]\([^)]*\)/g, "$1")
    .replace(/\[([^\]]+)\]\([^)]*\)/g, "$1")
    .replace(/[*_`>|]/g, "")
    .replace(/\\(?:textit|textbf|textrm|emph|text|mathrm|mathbf|mathit)\s*\{([^{}]*)\}/g, "$1")
    .replace(/\\(?:href)\s*\{[^{}]*\}\s*\{([^{}]*)\}/g, "$1")
    .replace(/\\(?:cite|ref|label|footnote)\s*\{[^{}]*\}/g, "")
    .replace(/\$+[^$]*\$+/g, " ")
    .replace(/\\[a-zA-Z*]+(?:\[[^\]]*\])?/g, " ")
    .replace(/[{}]/g, "")
    .replace(/\\([%&#_$])/g, "$1")
    .replace(/\s+/g, " ")
    .trim();
}

function makeDescription(body) {
  const withoutHeadings = String(body).replace(/^#{1,6}\s+.*$/gm, " ");
  const text = plainText(withoutHeadings);
  if (!text) return "";
  const sentences = text.match(/[^.!?]+(?:[.!?]+(?=\s|$)|$)/g)?.map((sentence) => sentence.trim()).filter(Boolean) || [text];
  let description = "";
  for (const sentence of sentences) {
    const candidate = description ? `${description} ${sentence}` : sentence;
    if (candidate.length > 220) break;
    description = candidate;
    if (description.length >= 120) break;
  }
  if (!description) description = sentences[0];
  // A first sentence can be longer than a useful chapter deck. In that case,
  // cut only at a word boundary and make the shortened text a proper sentence.
  if (description.length > 220 || (description.length < 120 && sentences.length > 1)) {
    const source = description.length > 220 ? description : `${description} ${sentences[1]}`;
    const window = source.slice(0, 220);
    const clauseEnd = Math.max(
      window.lastIndexOf(","),
      window.lastIndexOf(";"),
      window.lastIndexOf(":"),
      window.lastIndexOf(" --"),
      window.lastIndexOf(" —"),
    );
    let clipped = clauseEnd >= 80 ? window.slice(0, clauseEnd) : window.replace(/\s+\S*$/, "");
    const weakEndings = new Set(["a", "an", "and", "as", "at", "by", "for", "from", "in", "of", "on", "or", "the", "to", "with", "de", "del", "el", "en", "la", "las", "los", "o", "para", "por", "que", "un", "una", "y"]);
    let words = clipped.replace(/[,:;\s]+$/, "").split(/\s+/);
    while (words.length > 1 && weakEndings.has(words.at(-1).toLowerCase())) words.pop();
    description = `${words.join(" ")}.`;
  }
  if (!/[.!?]$/.test(description)) description = `${description.replace(/[,:;\s]+$/, "")}.`;
  return description;
}

function escapeHtml(value) {
  return String(value)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

function escapeAttribute(value) {
  return escapeHtml(value).replace(/'/g, "&#39;");
}

function publicAssetPath(sourcePath) {
  const relative = String(sourcePath).replace(/^\.\//, "").replace(/^images\//, "");
  return `/assets/book/${relative}`;
}

function sourceAssetPath(sourcePath) {
  return String(sourcePath).replace(/^\.\//, "").replace(/^images\//, "");
}

function localizedDiagramKey(lang, sourcePath, caption) {
  const path = sourceAssetPath(sourcePath);
  if (lang === "es" && path === "alpha-beta/pruning-example.png") return "alpha-beta";
  if (lang !== "en") return null;
  const replacements = new Map([
    ["alphazero/network.png", "alphazero-network"],
    ["alphazero/residual.png", "alphazero-residual"],
    ["alphazero/directions.png", "alphazero-directions"],
    ["alphazero/final_MCTS.png", "mcts-final"],
    ["definition/example_definition.png", "definition"],
    ["game-tree/tree.png", "game-tree"],
    ["n-queens/myplot.png", "n-queens"],
    ["game/image2.png", "game-tree"],
    ["game/image3.png", "game-tree"],
  ]);
  if (path === "alphazero/initial_MCTS.png") return /after|despu[eé]s|final/i.test(plainText(caption)) ? "mcts-final" : "mcts-initial";
  return replacements.get(path) || null;
}

function localizedDiagram(key, caption) {
  const label = plainText(caption);
  return `<div class=\"localized-diagram\" data-diagram=\"${escapeAttribute(key)}\" data-label=\"${escapeAttribute(label)}\" role=\"img\" aria-label=\"${escapeAttribute(label)}\">${escapeHtml(label)}</div>`;
}

function protectMath(text) {
  const values = [];
  const add = (match) => {
    const token = `@@MATH_${values.length}@@`;
    values.push(match);
    return token;
  };
  let output = text.replace(/\\\(([\s\S]*?)\\\)/g, (_, formula) => add(`$${formula}$`));
  output = output.replace(/\$(?!\$)(?:\\.|[^$\n])*\$/g, add);
  return { output, values };
}

function restoreMath(text, values) {
  // Nested inline conversions (notably footnotes) can see a token protected by
  // their caller. Preserve unknown tokens for the outer conversion to restore.
  return text.replace(/@@MATH_(\d+)@@/g, (match, index) => values[Number(index)] ?? match);
}

function inlineMarkdown(input, lang) {
  const protectedMath = protectMath(String(input).trim());
  let text = protectedMath.output;
  // Run simple brace commands repeatedly so nested emphasis is handled too.
  for (let pass = 0; pass < 5; pass += 1) {
    text = text
      .replace(/\\textbf\s*\{([^{}]*)\}/g, "**$1**")
      .replace(/\\(?:textit|emph)\s*\{([^{}]*)\}/g, "*$1*")
      .replace(/\\(?:textrm|text|mathrm|mathbf|mathit)\s*\{([^{}]*)\}/g, "$1");
  }
  text = text
    .replace(/\\href\s*\{([^{}]+)\}\s*\{([^{}]+)\}/g, "[$2]($1)")
    .replace(/\\url\s*\{([^{}]+)\}/g, "<$1>")
    .replace(/\\cite(?:p|t)?\s*\{([^{}]+)\}/g, (_, keys) => keys.split(",").map((key) => {
      const clean = key.trim();
      const entry = bibliographyByKey.get(clean);
      const firstAuthor = (entry?.fields.author || entry?.fields.editor || clean)
        .split(/\s+and\s+/i)[0]
        .replace(/\s*,.*$/, "")
        .trim();
      const year = entry?.fields.year;
      const label = year ? `${firstAuthor}, ${year}` : firstAuthor;
      return `<cite><a href=\"/${lang}/references#cite-${slugify(clean)}\" data-cite=\"${escapeAttribute(clean)}\">[${escapeHtml(label)}]</a></cite>`;
    }).join(" "))
    .replace(/\\ref\s*\{([^{}]+)\}/g, (_, label) => `[${lang === "es" ? "referencia" : "reference"}](#${slugify(label)})`)
    .replace(/\\label\s*\{([^{}]+)\}/g, (_, label) => `<span id=\"${slugify(label)}\"></span>`)
    .replace(/\\footnote\s*\{((?:[^{}]|\{[^{}]*\})*)\}/g, (_, note) => `<span class=\"footnote\" role=\"note\">${inlineHtml(note, lang)}</span>`)
    .replace(/\\(?:newline|linebreak)\b/g, "  \n")
    .replace(/\\hfill\b/g, " ")
    .replace(/``|''/g, '"')
    .replace(/---/g, "—")
    .replace(/~/g, " ")
    .replace(/\\([%&#_$])/g, "$1")
    .replace(/\s+([,.;:!?])/g, "$1")
    .replace(/[ \t]+/g, " ");
  return restoreMath(text, protectedMath.values).trim();
}

function inlineHtml(input, lang) {
  return inlineMarkdown(input, lang)
    .replace(/!\[([^\]]*)\]\(([^)]+)\)/g, '<img src="$2" alt="$1" />')
    .replace(/\[([^\]]+)\]\(([^)]+)\)/g, '<a href="$2">$1</a>')
    .replace(/\*\*([^*]+)\*\*/g, "<strong>$1</strong>")
    .replace(/\*([^*]+)\*/g, "<em>$1</em>");
}

function replaceEnvironments(source, name, replacer) {
  const begin = `\\begin{${name}}`;
  const end = `\\end{${name}}`;
  let cursor = 0;
  let output = "";
  while (cursor < source.length) {
    const start = source.indexOf(begin, cursor);
    if (start < 0) return output + source.slice(cursor);
    output += source.slice(cursor, start);
    let depth = 1;
    let scan = start + begin.length;
    while (depth > 0) {
      const nextBegin = source.indexOf(begin, scan);
      const nextEnd = source.indexOf(end, scan);
      if (nextEnd < 0) {
        output += source.slice(start);
        return output;
      }
      if (nextBegin >= 0 && nextBegin < nextEnd) {
        depth += 1;
        scan = nextBegin + begin.length;
      } else {
        depth -= 1;
        if (depth === 0) {
          const body = source.slice(start + begin.length, nextEnd);
          const raw = source.slice(start, nextEnd + end.length);
          output += replacer(body, raw);
          cursor = nextEnd + end.length;
        } else scan = nextEnd + end.length;
      }
    }
  }
  return output;
}

function extractCommandOptions(source, command) {
  const index = source.indexOf(`\\${command}`);
  if (index < 0) return null;
  let cursor = index + command.length + 1;
  while (/\s/.test(source[cursor] ?? "")) cursor += 1;
  if (source[cursor] !== "[") return { options: "", start: index, end: cursor };
  const end = source.indexOf("]", cursor + 1);
  if (end < 0) return null;
  return { options: source.slice(cursor + 1, end), start: index, end: end + 1 };
}

function optionValues(options, key) {
  const values = [];
  const pattern = new RegExp(`(?:^|[,\\n])\\s*${key}\\s*=\\s*(\\{[^}]*\\}|[^,\\n]+)`, "g");
  let match;
  while ((match = pattern.exec(options))) values.push(match[1].trim().replace(/^\{|\}$/g, "").trim());
  return values;
}

function boardHtml(options, label = "Chess position") {
  const fen = optionValues(options, "setfen")[0] || "start";
  const maxfield = optionValues(options, "maxfield")[0] || "h8";
  const size = Number(maxfield.match(/(\d+)$/)?.[1] || 8);
  const pieces = optionValues(options, "setpieces").join(", ");
  const marks = [...optionValues(options, "markfields"), ...optionValues(options, "markregions")].join(", ");
  const arrows = optionValues(options, "markmoves").join(", ");
  const labels = {};
  const labelPattern = /(?:^|[,\n])\s*text\s*=\s*([^,\n]+)\s*,\s*markregions\s*=\s*\{([^}]*)\}/g;
  let labelMatch;
  while ((labelMatch = labelPattern.exec(options))) {
    const value = plainText(labelMatch[1]);
    for (const region of labelMatch[2].split(",")) {
      const [from, to = from] = region.trim().split("-");
      // Text-style regions in the source target individual squares. Retaining
      // both endpoints also makes the data safe if a range is introduced later.
      if (from) labels[from] = value;
      if (to && to !== from) labels[to] = value;
    }
  }
  const attributes = [
    `class=\"chessboard\"`,
    `data-fen=\"${escapeAttribute(fen)}\"`,
    `data-size=\"${size}\"`,
    pieces && `data-pieces=\"${escapeAttribute(pieces)}\"`,
    marks && `data-marks=\"${escapeAttribute(marks)}\"`,
    arrows && `data-arrows=\"${escapeAttribute(arrows)}\"`,
    Object.keys(labels).length && `data-labels=\"${escapeAttribute(JSON.stringify(labels))}\"`,
    `data-chess-options=\"${escapeAttribute(JSON.stringify(options.replace(/\s+/g, " ").trim()))}\"`,
    `role=\"img\"`,
    `aria-label=\"${escapeAttribute(label)}\"`,
  ].filter(Boolean).join(" ");
  return `<div ${attributes}></div>`;
}

function parseDiagram(body, label) {
  const nodes = [...body.matchAll(/\\node\s*(?:\[([^\]]*)\])?\s*(?:\(([^)]+)\))?\s*(?:\[([^\]]*)\])?\s*\{([^{}]*)\}\s*;/g)]
    .map((match, index) => ({
      id: match[2] || `node-${index + 1}`,
      type: [match[1], match[3]].filter(Boolean).join(",").split(",")[0].trim() || "process",
      label: plainText(match[4]),
    }));
  const nodeIds = new Set(nodes.map((node) => node.id));
  const edges = [...body.matchAll(/\\draw[^;]*;/g)].flatMap((match) => {
    const ids = [...match[0].matchAll(/\(([^)]+)\)/g)].map((item) => item[1]).filter((id) => nodeIds.has(id));
    if (ids.length < 2) return [];
    const edgeLabel = match[0].match(/node(?:\[[^\]]*\])?\s*\{([^{}]*)\}/)?.[1];
    return [{ from: ids[0], to: ids.at(-1), label: edgeLabel ? plainText(edgeLabel) : "" }];
  });
  const cleanMermaidLabel = (value) => value.replace(/"/g, "'").replace(/\s+/g, " ").trim();
  const mermaidId = (id) => `node_${id.replace(/[^a-zA-Z0-9_]/g, "_")}`;
  const shape = (node) => {
    const text = cleanMermaidLabel(node.label);
    const id = mermaidId(node.id);
    if (node.type === "startstop") return `${id}([\"${text}\"]):::terminal`;
    if (node.type === "io") return `${id}[/\"${text}\"/]:::io`;
    if (node.type === "decision") return `${id}{\"${text}\"}:::decision`;
    return `${id}[\"${text}\"]:::process`;
  };
  const mermaid = [
    `flowchart ${edges.length ? "TD" : "LR"}`,
    ...nodes.map((node) => `  ${shape(node)}`),
    ...edges.map((edge) => `  ${mermaidId(edge.from)} -->${edge.label ? `|${cleanMermaidLabel(edge.label)}|` : ""} ${mermaidId(edge.to)}`),
    ...(edges.length || nodes.length < 2 ? [] : [`  ${nodes.map((node) => mermaidId(node.id)).join(" ~~~ ")}`]),
    "  classDef terminal fill:#46765f,color:#fff,stroke:#2f5d48,stroke-width:2px",
    "  classDef io fill:#e8eee9,color:#171a17,stroke:#46765f,stroke-width:1.5px",
    "  classDef decision fill:#f1eee2,color:#171a17,stroke:#46765f,stroke-width:2px",
    "  classDef process fill:#f7f7f1,color:#171a17,stroke:#6f786f,stroke-width:1.5px",
  ].join("\n");
  const summary = nodes.map((node) => escapeHtml(node.label)).filter(Boolean).join(" → ");
  return `<div class=\"localized-diagram flow-diagram mermaid-flowchart\" data-diagram=\"flowchart\" data-node-count=\"${nodes.length}\" data-mermaid=\"${escapeAttribute(mermaid)}\" role=\"img\" aria-label=\"${escapeAttribute(label)}\">${summary}</div>`;
}

function tabularRows(body, lang) {
  return body
    .replace(/\\hline/g, "")
    .split(/\\\\(?:\[[^\]]*\])?/)
    .map((row) => row.trim())
    .filter(Boolean)
    .map((row) => row.split("&").map((cell) => inlineMarkdown(cell.trim(), lang)));
}

function parseTabularHtml(body, lang) {
  const rows = tabularRows(body, lang).map((row) => row.map((cell) => inlineHtml(cell, lang)));
  if (!rows.length) return "";
  const cells = rows.map((row, rowIndex) => {
    const tag = rowIndex === 0 ? "th" : "td";
    return `    <tr>${row.map((cell) => `<${tag}>${cell}</${tag}>`).join("")}</tr>`;
  });
  return `<table>\n${cells.join("\n")}\n  </table>`;
}

function parseFigure(body, lang) {
  const captions = [...body.matchAll(/\\caption(?:\[[^\]]*\])?\s*\{([^{}]*)\}/gs)];
  const labels = [...body.matchAll(/\\label\s*\{([^{}]+)\}/gs)];
  const captionMatch = captions.at(-1);
  const labelMatch = labels.at(-1);
  const caption = inlineHtml(captionMatch?.[1] || (lang === "es" ? "Ilustración" : "Illustration"), lang);
  const id = slugify(labelMatch?.[1] || plainText(caption));
  const images = [...body.matchAll(/\\includegraphics(?:\[[^\]]*\])?\s*\{([^{}]+)\}/g)];
  const boardMatches = [...body.matchAll(/\\chessboard\s*\[([\s\S]*?)\]/g)];
  const rendered = images.map((match) => {
    let path = match[1].replace(/^\.\//, "");
    // Upstream English LaTeX still points at the Spanish SAN-labelled variant.
    if (lang === "en" && /min-max\/example1-es\.png$/.test(path)) {
      path = path.replace(/example1-es\.png$/, "example1-en.png");
    }
    // The second upstream MCTS figure accidentally repeats the initial image.
    // Its caption identifies the post-simulation state and therefore final_MCTS.
    if (/alphazero\/initial_MCTS\.png$/.test(path) && /after|despu[eé]s|final/i.test(plainText(caption))) {
      path = path.replace(/initial_MCTS\.png$/, "final_MCTS.png");
    }
    const diagramKey = localizedDiagramKey(lang, path, caption);
    if (diagramKey) return `  ${localizedDiagram(diagramKey, caption)}`;
    const relative = sourceAssetPath(path);
    if (unavailableAssetsByLang.get(lang)?.has(relative)) {
      throw new Error(`Missing localized replacement for ${lang}: ${relative}`);
    }
    return `  <img src=\"${escapeAttribute(publicAssetPath(path))}\" alt=\"${escapeAttribute(plainText(caption))}\" loading=\"lazy\" />`;
  });
  for (const match of boardMatches) {
    rendered.push(`  ${boardHtml(match[1], plainText(caption))}`);
  }
  if (!rendered.length) {
    const equations = [...body.matchAll(/\\begin\{(?:align\*?|equation\*?)\}([\s\S]*?)\\end\{(?:align\*?|equation\*?)\}/g)];
    for (const equation of equations) {
      const rawMath = equation[1].trim();
      // An align environment can legally start each row with `&`. Once the
      // outer LaTeX environment is removed for the web renderer, those
      // alignment points are invalid unless we restore an aligned wrapper.
      const math = rawMath.startsWith("&")
        ? `\\begin{aligned}\n${rawMath}\n\\end{aligned}`
        : rawMath;
      rendered.push(`  <div class=\"figure-equation\" data-math=\"${escapeAttribute(math)}\" aria-label=\"${escapeAttribute(plainText(math))}\"></div>`);
    }
    const tabular = body.match(/\\begin\{tabular\}(?:\[[^\]]*\])?\s*\{[^{}]*\}([\s\S]*?)\\end\{tabular\}/);
    if (tabular) rendered.push(`  <div class=\"figure-table\">\n${parseTabularHtml(tabular[1], lang)}\n  </div>`);
    const tikz = body.match(/\\begin\{tikzpicture\}(?:\[[^\]]*\])?([\s\S]*?)\\end\{tikzpicture\}/);
    if (tikz) rendered.push(`  ${parseDiagram(tikz[1], plainText(caption))}`);
  }
  return `<figure id=\"${id}\">\n${rendered.join("\n")}\n  <figcaption>${caption}</figcaption>\n</figure>`;
}

function parseList(body, ordered, lang) {
  const pieces = body.split(/\\item(?:\s*\[[^\]]*\])?\s*/).slice(1);
  if (!pieces.length) return fallbackLatex(body, `${ordered ? "enumerate" : "itemize"}`);
  return pieces.map((piece, index) => {
    const marker = ordered ? `${index + 1}.` : "-";
    const content = inlineMarkdown(piece.replace(/\n\s*\n/g, " ").trim(), lang)
      .split("\n").join("\n  ");
    return `${marker} ${content}`;
  }).join("\n");
}

function parseTable(body, lang) {
  const tabular = body.match(/\\begin\{tabular\}(?:\[[^\]]*\])?\s*\{[^{}]*\}([\s\S]*?)\\end\{tabular\}/);
  if (!tabular) return fallbackLatex(body, "table");
  const caption = body.match(/\\caption(?:\[[^\]]*\])?\s*\{([^{}]*)\}/s)?.[1];
  const markdown = parseTabularBody(tabular[1], lang);
  if (!markdown) return "";
  return caption ? `${markdown}\n\n*${inlineMarkdown(caption, lang)}*` : markdown;
}

function parseTabularBody(body, lang) {
  const rows = tabularRows(body, lang);
  if (!rows.length) return "";
  const columns = Math.max(...rows.map((row) => row.length));
  const normalized = rows.map((row) => [...row, ...Array(columns - row.length).fill("")]);
  const header = normalized[0];
  return [
    `| ${header.join(" | ")} |`,
    `| ${header.map(() => "---").join(" | ")} |`,
    ...normalized.slice(1).map((row) => `| ${row.join(" | ")} |`),
  ].join("\n");
}

function fallbackLatex(body, kind) {
  const summary = plainText(body);
  return `<aside class=\"conversion-note\" data-source-kind=\"${escapeAttribute(kind)}\">${escapeHtml(summary || "Supplementary diagram")}</aside>`;
}

function convertLatex(source, lang) {
  let text = stripComments(source).replace(/\r\n?/g, "\n");
  const blocks = [];
  const stash = (value) => {
    const token = `@@BLOCK_${blocks.length}@@`;
    blocks.push(value.trim());
    return `\n\n${token}\n\n`;
  };

  for (const env of ["minted"]) {
    text = replaceEnvironments(text, env, (body, raw) => {
      const language = raw.match(/\\begin\{minted\}(?:\[[^\]]*\])?\s*\{([^{}]+)\}/)?.[1] || "text";
      // The generic environment helper leaves minted's {language} prefix in body.
      const code = body.replace(/^\s*(?:\[[^\]]*\]\s*)?\{[^{}]+\}\s*/, "").trim();
      return stash(`\`\`\`${language}\n${code}\n\`\`\``);
    });
  }
  // Figures are handled first because they can contain equations, tables,
  // diagrams, subfigures, and boards that belong to the same caption.
  text = replaceEnvironments(text, "figure", (body) => stash(parseFigure(body, lang)));
  for (const env of ["align", "align*", "equation", "equation*", "gather", "gather*"]) {
    text = replaceEnvironments(text, env, (body) => stash(`$$\n${body.trim()}\n$$`));
  }
  text = replaceEnvironments(text, "table", (body) => stash(parseTable(body, lang)));
  text = replaceEnvironments(text, "tabular", (body) => stash(parseTabularBody(body.replace(/^\s*\{[^{}]*\}/, ""), lang)));
  text = replaceEnvironments(text, "itemize", (body) => stash(parseList(body, false, lang)));
  text = replaceEnvironments(text, "enumerate", (body) => stash(parseList(body, true, lang)));
  text = replaceEnvironments(text, "quote", (body) => stash(inlineMarkdown(body, lang).split("\n").map((line) => `> ${line}`).join("\n")));
  text = replaceEnvironments(text, "tikzpicture", (body) => stash(parseDiagram(body, "Diagram")));

  // Stand-alone chessboard commands (outside figures).
  while (text.includes("\\chessboard")) {
    const command = extractCommandOptions(text, "chessboard");
    if (!command || command.end <= command.start) break;
    const board = boardHtml(command.options);
    text = text.slice(0, command.start) + stash(board) + text.slice(command.end);
  }

  text = text.replace(/\\includegraphics(?:\[[^\]]*\])?\s*\{([^{}]+)\}/g, (_, path) =>
    stash(`![Illustration](${publicAssetPath(path)})`));
  text = text
    .replace(/\\subsubsection\*?\s*\{((?:[^{}]|\{[^{}]*\})*)\}/g, (_, title) => `\n\n#### ${inlineMarkdown(title, lang)}\n\n`)
    .replace(/\\subsection\*?\s*\{((?:[^{}]|\{[^{}]*\})*)\}/g, (_, title) => `\n\n### ${inlineMarkdown(title, lang)}\n\n`)
    .replace(/\\section\*?\s*\{((?:[^{}]|\{[^{}]*\})*)\}/g, (_, title) => `\n\n## ${inlineMarkdown(title, lang)}\n\n`)
    .replace(/\\(?:centering|newpage|clearpage|vspace\*?\s*\{[^{}]*\}|hfill)\b/g, "")
    .replace(/\\begin\{(?:center|flushleft|flushright)\}|\\end\{(?:center|flushleft|flushright)\}/g, "");

  const chunks = text.split(/\n\s*\n+/).map((chunk) => chunk.trim()).filter(Boolean);
  const markdown = chunks.map((chunk) => {
    if (/^@@BLOCK_\d+@@$/.test(chunk) || /^#{2,4}\s/.test(chunk)) return chunk;
    // Unknown block environments remain visible and recoverable rather than
    // silently disappearing from the web edition.
    if (/\\(?:begin|end)\{/.test(chunk)) return fallbackLatex(chunk, "unsupported");
    return inlineMarkdown(chunk.replace(/\n+/g, " "), lang);
  }).join("\n\n");

  return markdown.replace(/@@BLOCK_(\d+)@@/g, (_, index) => blocks[Number(index)]).trim() + "\n";
}

function parseMain(source, lang) {
  const clean = stripComments(source);
  const command = /\\(appendix|chapter\*?|section\*?|input)\s*(?:\{([^{}]+)\})?/g;
  const pages = [];
  let chapter = "";
  let bookChapter = "0";
  let pendingTitle = "";
  let pendingKind = "chapter";
  let part = "book";
  let order = 0;
  let chapterIndex = 0;
  let appendixIndex = 0;
  let sectionIndex = 0;
  let match;
  while ((match = command.exec(clean))) {
    const type = match[1];
    const value = match[2] || "";
    if (type === "appendix") {
      part = "appendix";
    } else if (type.startsWith("chapter")) {
      chapter = plainText(value);
      pendingTitle = chapter;
      pendingKind = "chapter";
      sectionIndex = 0;
      if (part === "appendix") {
        bookChapter = String.fromCharCode("A".charCodeAt(0) + appendixIndex);
        appendixIndex += 1;
      } else if (type === "chapter*") {
        bookChapter = "0";
      } else {
        chapterIndex += 1;
        bookChapter = String(chapterIndex);
      }
    } else if (type.startsWith("section")) {
      pendingTitle = plainText(value);
      pendingKind = "section";
      sectionIndex += 1;
    } else if (type === "input" && value.startsWith(`${lang}/`)) {
      const sourceName = value.slice(lang.length + 1).replace(/\.tex$/, "");
      const isAppendix = part === "appendix";
      const isLanding = pendingKind === "chapter";
      const sectionNumber = isAppendix
        ? bookChapter
        : bookChapter === "0"
          ? "0"
          : isLanding
            ? `${bookChapter}.0`
            : `${bookChapter}.${sectionIndex}`;
      const sectionTitle = pendingTitle || plainText(sourceName);
      pages.push({
        sourceName,
        slug: slugify(sourceName),
        title: sectionTitle,
        chapter,
        part,
        order: order++,
        bookChapter,
        bookChapterTitle: chapter,
        sectionNumber,
        sectionTitle,
        navDepth: isLanding || isAppendix || bookChapter === "0" ? 1 : 2,
      });
      pendingTitle = "";
      pendingKind = "content";
    }
  }
  return pages;
}

function parseBibtex(source) {
  const entries = [];
  const entryPattern = /@(\w+)\s*\{\s*([^,]+),/g;
  let match;
  while ((match = entryPattern.exec(source))) {
    let cursor = entryPattern.lastIndex;
    let depth = 1;
    while (cursor < source.length && depth > 0) {
      if (source[cursor] === "{") depth += 1;
      else if (source[cursor] === "}") depth -= 1;
      cursor += 1;
    }
    const raw = source.slice(entryPattern.lastIndex, cursor - 1);
    const fields = {};
    const fieldPattern = /(\w+)\s*=\s*(?:\{((?:[^{}]|\{[^{}]*\})*)\}|"([^"]*)")\s*,?/gs;
    let field;
    while ((field = fieldPattern.exec(raw))) fields[field[1].toLowerCase()] = plainText(field[2] ?? field[3]);
    entries.push({ type: match[1].toLowerCase(), key: match[2].trim(), fields });
    entryPattern.lastIndex = cursor;
  }
  return entries;
}

function referencesMarkdown(entries, lang) {
  const lines = entries.map(({ key, fields }) => {
    const authors = fields.author || fields.editor || "";
    const year = fields.year ? ` (${fields.year})` : "";
    const title = fields.title || key;
    const venue = fields.journal || fields.booktitle || fields.publisher || "";
    const target = fields.url || (fields.doi ? `https://doi.org/${fields.doi}` : "");
    const linkedTitle = target ? `[${title}](${target})` : title;
    return `<li id=\"cite-${slugify(key)}\"><span class=\"citation-key\">${escapeHtml(key)}</span> ${inlineMarkdown(authors, lang)}${year}. ${linkedTitle}${venue ? `. ${inlineMarkdown(venue, lang)}` : ""}.</li>`;
  });
  return `<ol class=\"bibliography\">\n${lines.join("\n")}\n</ol>\n`;
}

async function writePage(lang, page, body) {
  const description = page.description || makeDescription(body);
  const frontmatter = [
    "---",
    `title: ${yamlString(page.title)}`,
    `description: ${yamlString(description)}`,
    `chapter: ${yamlString(page.chapter)}`,
    `part: ${yamlString(page.part)}`,
    `order: ${page.order}`,
    `bookChapter: ${yamlString(page.bookChapter)}`,
    `bookChapterTitle: ${yamlString(page.bookChapterTitle)}`,
    `sectionNumber: ${yamlString(page.sectionNumber)}`,
    `sectionTitle: ${yamlString(page.sectionTitle)}`,
    `navDepth: ${page.navDepth}`,
    `pairedSlug: ${yamlString(page.slug)}`,
    `source: ${yamlString(page.sourceName === "references" ? "bibliography.bib" : `${lang}/${page.sourceName}.tex`)}`,
    "draft: false",
    "---",
  ].join("\n");
  await writeFile(join(OUTPUT_ROOT, lang, `${page.slug}.md`), `${frontmatter}\n\n${body}`, "utf8");
}

async function main() {
  const assetManifest = JSON.parse(await readFile(join(ROOT, "public/assets/asset-manifest.json"), "utf8"));
  unavailableAssetsByLang = new Map(LANGUAGES.map((lang) => [lang, new Set(
    assetManifest.localeSpecific
      .filter((asset) => asset.missing?.includes(lang))
      .map((asset) => asset.path),
  )]));
  const bibliography = parseBibtex(await readFile(join(SOURCE_ROOT, "bibliography.bib"), "utf8"));
  bibliographyByKey = new Map(bibliography.map((entry) => [entry.key, entry]));
  for (const lang of LANGUAGES) {
    const outputDir = join(OUTPUT_ROOT, lang);
    await mkdir(outputDir, { recursive: true });
    const pages = parseMain(await readFile(join(SOURCE_ROOT, lang, "main.tex"), "utf8"), lang);
    for (const page of pages) {
      const source = await readFile(join(SOURCE_ROOT, lang, `${page.sourceName}.tex`), "utf8");
      await writePage(lang, page, convertLatex(source, lang));
    }
    const referencePage = {
      sourceName: "references",
      slug: "references",
      title: lang === "es" ? "Referencias" : "References",
      chapter: lang === "es" ? "Referencias" : "References",
      part: "backmatter",
      order: pages.length,
      bookChapter: "references",
      bookChapterTitle: lang === "es" ? "Referencias" : "References",
      sectionNumber: "references",
      sectionTitle: lang === "es" ? "Referencias" : "References",
      navDepth: 1,
      description: lang === "es" ? "Bibliografía y fuentes citadas en Ajedrez y computación." : "Bibliography and sources cited in Chess and computation.",
    };
    await writePage(lang, referencePage, referencesMarkdown(bibliography, lang));
    const manifest = [...pages, referencePage].map(({ sourceName, ...page }) => ({ ...page, source: sourceName }));
    await writeFile(join(outputDir, "manifest.json"), `${JSON.stringify({ lang, pages: manifest }, null, 2)}\n`, "utf8");
  }
  process.stdout.write(`Generated bilingual content in ${OUTPUT_ROOT}\n`);
}

await main();
