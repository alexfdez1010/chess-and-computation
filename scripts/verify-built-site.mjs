#!/usr/bin/env node

import { access, readFile, readdir } from 'node:fs/promises';
import { join, resolve } from 'node:path';

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

const files = await walk(dist);
const htmlFiles = files.filter((file) => file.endsWith('.html'));
const htmlByFile = new Map(await Promise.all(htmlFiles.map(async (file) => [file, await readFile(file, 'utf8')])));
let flowchartCount = 0;
let mermaidFlowchartCount = 0;

for (const [file, html] of htmlByFile) {
  const relative = file.slice(dist.length);
  if (/\bundefined\b/.test(html)) failures.push(`${relative}: contains "undefined"`);
  flowchartCount += (html.match(/data-diagram="flowchart"/g) || []).length;
  mermaidFlowchartCount += (html.match(/class="[^"]*mermaid-flowchart[^"]*"[^>]*data-diagram="flowchart"[^>]*data-mermaid="[^"]+"/g) || []).length;
  if (/data-diagram="flowchart"[^>]*data-(?:nodes|edges)=/.test(html)) failures.push(`${relative}: contains a legacy non-Mermaid flowchart`);

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

for (const required of ['robots.txt', 'sitemap-index.xml', 'favicon.svg', 'assets/social/og-es.png', 'assets/social/og-en.png']) {
  if (!await exists(join(dist, required))) failures.push(`missing generated artifact /${required}`);
}

if (failures.length) {
  console.error(`built-site QA failed (${failures.length})\n${failures.map((failure) => `- ${failure}`).join('\n')}`);
  process.exit(1);
}

console.log(`built-site QA passed: ${htmlFiles.length} HTML pages and ${files.length} generated files`);
