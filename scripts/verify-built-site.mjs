#!/usr/bin/env node

import { access, readFile, readdir } from 'node:fs/promises';
import { join, resolve } from 'node:path';
import katex from 'katex';

const root = resolve(import.meta.dirname, '..');
const dist = join(root, 'dist');
const failures = [];

async function walk(directory) {
  const entries = await readdir(directory, { withFileTypes: true });
  return (await Promise.all(entries.map((entry) => {
    const path = join(directory, entry.name);
    return entry.isDirectory() ? walk(path) : path;
  }))).flat();
}

async function exists(path) {
  try { await access(path); return true; } catch { return false; }
}

function routeCandidates(pathname) {
  const clean = decodeURIComponent(pathname).replace(/^\/+/, '');
  return [join(dist, clean), join(dist, clean, 'index.html'), join(dist, `${clean}.html`)];
}

function decodeHtml(value) {
  return value
    .replace(/&#(?:x([0-9a-f]+)|(\d+));/gi, (_, hex, decimal) => String.fromCodePoint(Number.parseInt(hex || decimal, hex ? 16 : 10)))
    .replaceAll('&amp;', '&')
    .replaceAll('&quot;', '"')
    .replaceAll('&lt;', '<')
    .replaceAll('&gt;', '>')
    .replaceAll('&#39;', "'");
}

const files = await walk(dist);
const htmlFiles = files.filter((file) => file.endsWith('.html'));
const htmlByFile = new Map(await Promise.all(htmlFiles.map(async (file) => [file, await readFile(file, 'utf8')])));
let flowchartCount = 0;
let mermaidFlowchartCount = 0;
const localizedMermaidKeys = [
  'alpha-beta',
  'alphazero-directions',
  'alphazero-network',
  'alphazero-residual',
  'game-tree',
  'mcts-final',
  'mcts-initial',
];
const localizedMermaidCounts = new Map(localizedMermaidKeys.map((key) => [key, 0]));
let mdpChessFlowCount = 0;
let mdpChessboardCount = 0;
let subfigureGridCount = 0;
let subfigureCount = 0;
let captionedSubfigureCount = 0;
let matrixFormulaCount = 0;
const matrixEnvironment = /\\begin\{(?:[bpvVB]?matrix|smallmatrix|array)\}/;

for (const [file, html] of htmlByFile) {
  const relative = file.slice(dist.length);
  if (/\bundefined\b/.test(html)) failures.push(`${relative}: contains "undefined"`);
  flowchartCount += (html.match(/data-diagram="flowchart"/g) || []).length;
  mermaidFlowchartCount += (html.match(/class="[^"]*mermaid-flowchart[^"]*"[^>]*data-diagram="flowchart"[^>]*data-mermaid="[^"]+"/g) || []).length;
  for (const key of localizedMermaidKeys) {
    localizedMermaidCounts.set(key, localizedMermaidCounts.get(key) + (html.match(new RegExp(`data-diagram="${key}"`, 'g')) || []).length);
  }
  mdpChessFlowCount += (html.match(/class="[^"]*mdp-chess-flow[^"]*"/g) || []).length;
  mdpChessboardCount += (html.match(/class="chessboard"[^>]*data-board-asset=/g) || []).length;
  subfigureGridCount += (html.match(/class="subfigure-grid"/g) || []).length;
  subfigureCount += (html.match(/<figure class="subfigure"(?:\s|>)/g) || []).length;
  captionedSubfigureCount += (html.match(/<figure class="subfigure"[^>]*>[\s\S]*?<figcaption>[\s\S]*?<\/figcaption>\s*<\/figure>/g) || []).length;
  if (/data-diagram="flowchart"[^>]*data-(?:nodes|edges)=/.test(html)) failures.push(`${relative}: contains a legacy non-Mermaid flowchart`);

  const mathSources = [
    ...html.matchAll(/data-math="([\s\S]*?)"/g),
    ...html.matchAll(/<annotation encoding="application\/x-tex">([\s\S]*?)<\/annotation>/g),
  ];
  for (const match of mathSources) {
    const formula = decodeHtml(match[1]);
    if (!matrixEnvironment.test(formula)) continue;
    matrixFormulaCount += 1;
    try {
      katex.renderToString(formula, { displayMode: true, throwOnError: true, strict: 'error' });
    } catch (error) {
      failures.push(`${relative}: invalid matrix formula (${error.message})`);
    }
  }

  const ids = [...html.matchAll(/\sid="([^"]+)"/g)].map((match) => match[1]);
  const duplicates = ids.filter((id, index) => ids.indexOf(id) !== index);
  if (duplicates.length) failures.push(`${relative}: duplicate ids ${[...new Set(duplicates)].join(', ')}`);

  if (relative !== '/index.html') {
    const h1Count = (html.match(/<h1(?:\s|>)/g) || []).length;
    if (h1Count !== 1) failures.push(`${relative}: expected one h1, found ${h1Count}`);
    if (!/<link rel="canonical" href="[^"]+">/.test(html)) failures.push(`${relative}: missing canonical`);
    if (!/<meta property="og:image" content="[^"]+">/.test(html)) failures.push(`${relative}: missing og:image`);
    const jsonLd = html.match(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/)?.[1];
    try { JSON.parse(jsonLd || ''); } catch { failures.push(`${relative}: invalid or missing JSON-LD`); }
  }
  if (relative.startsWith('/es/') || relative === '/es/index.html') {
    if (!html.includes('<meta property="og:site_name" content="Ajedrez y Computación">')) {
      failures.push(`${relative}: incorrect Spanish book title`);
    }
  }

  for (const match of html.matchAll(/<(?:a|img|script|link)\b[^>]*?\b(?:href|src)="([^"]+)"/g)) {
    const value = match[1];
    if (!value.startsWith('/') || value.startsWith('//')) continue;
    const [pathname, fragment] = value.split('#', 2);
    const candidates = routeCandidates(pathname || relative);
    const target = (await Promise.all(candidates.map(async (candidate) => await exists(candidate) ? candidate : null))).find(Boolean);
    if (!target) { failures.push(`${relative}: broken local reference ${value}`); continue; }
    if (fragment && target.endsWith('.html')) {
      const targetHtml = htmlByFile.get(target) || await readFile(target, 'utf8');
      const decoded = decodeURIComponent(fragment).replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
      if (!new RegExp(`\\sid="${decoded}"`).test(targetHtml)) failures.push(`${relative}: missing fragment target ${value}`);
    }
  }

  for (const image of html.matchAll(/<img\b([^>]*)>/g)) {
    const attrs = image[1];
    if (!/\balt="[^"]*"/.test(attrs)) failures.push(`${relative}: image without alt attribute`);
  }
}

if (flowchartCount !== 12 || mermaidFlowchartCount !== flowchartCount) {
  failures.push(`expected 12 Mermaid flowcharts, found ${mermaidFlowchartCount}/${flowchartCount}`);
}
for (const [key, count] of localizedMermaidCounts) {
  if (count !== 2) failures.push(`expected paired ${key} diagrams, found ${count}`);
}
if (mdpChessFlowCount !== 2 || mdpChessboardCount < 4) {
  failures.push(`expected two localized MDP chess flows with generated boards, found ${mdpChessFlowCount} flows and ${mdpChessboardCount} boards`);
}
if (subfigureGridCount !== 26 || subfigureCount !== 88 || captionedSubfigureCount !== subfigureCount) {
  failures.push(`expected 26 grouped figures with 88 captioned panels, found ${subfigureGridCount} groups and ${captionedSubfigureCount}/${subfigureCount} captioned panels`);
}
if (matrixFormulaCount !== 36) failures.push(`expected 36 matrix formulas, found ${matrixFormulaCount}`);

const legacyLocalizedBitmaps = [
  'alpha-beta/pruning-example.png',
  'alphazero/directions.png',
  'alphazero/final_MCTS.png',
  'alphazero/initial_MCTS.png',
  'alphazero/network.png',
  'alphazero/residual.png',
  'definition/example_definition.png',
  'game-tree/tree.png',
];
for (const bitmap of legacyLocalizedBitmaps) {
  if ([...htmlByFile.values()].some((html) => html.includes(`/assets/book/${bitmap}`))) {
    failures.push(`localized flow still references language-specific bitmap ${bitmap}`);
  }
}

for (const required of [
  'robots.txt',
  'sitemap-index.xml',
  'favicon.ico',
  'favicon-16x16.png',
  'favicon-32x32.png',
  'apple-touch-icon.png',
  'icon-192.png',
  'icon-512.png',
  'site.webmanifest',
  'assets/brand/book-icon.png',
  'assets/social/og-es.png',
  'assets/social/og-en.png',
]) {
  if (!await exists(join(dist, required))) failures.push(`missing generated artifact /${required}`);
}
const spanishOgSvg = await readFile(join(root, 'public/assets/social/og-es.svg'), 'utf8');
if (!spanishOgSvg.includes('<title id="title">Ajedrez y Computación</title>')) {
  failures.push('Spanish social artwork has incorrect book title');
}

if (failures.length) {
  console.error(`built-site QA failed (${failures.length})\n${failures.map((failure) => `- ${failure}`).join('\n')}`);
  process.exit(1);
}

console.log(`built-site QA passed: ${htmlFiles.length} HTML pages and ${files.length} generated files`);
