import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import vm from 'node:vm';
import ts from 'typescript';

// Run the shipped component scripts against a small DOM boundary. Native dialog
// focus containment and responsive layout remain part of browser verification.
class Element {
  constructor(tagName = 'DIV') {
    this.tagName = tagName;
    this.children = [];
    this.listeners = new Map();
    this.attributes = new Map();
    this.dataset = {};
    this.value = '';
    this.textContent = '';
    this.hidden = false;
    this.open = false;
    this.isContentEditable = false;
  }
  addEventListener(type, callback) {
    const callbacks = this.listeners.get(type) || [];
    callbacks.push(callback);
    this.listeners.set(type, callbacks);
  }
  dispatch(type, values = {}) {
    const event = { target: this, preventDefault() { this.defaultPrevented = true; }, ...values };
    this.listeners.get(type)?.forEach((callback) => callback(event));
    return event;
  }
  append(...children) {
    for (const child of children) {
      child.parent = this;
      this.children.push(child);
    }
  }
  replaceChildren(...children) { this.children = []; this.append(...children); }
  get firstElementChild() { return this.children[0]; }
  get previousElementSibling() { return this.parent?.children[this.parent.children.indexOf(this) - 1]; }
  get nextElementSibling() { return this.parent?.children[this.parent.children.indexOf(this) + 1]; }
  closest(selector) { return selector === 'a' && this.tagName === 'A' ? this : this.parent?.closest(selector); }
  querySelector(selector) { return this.selectors?.[selector] || (selector === 'a' ? this.children.find((item) => item.tagName === 'A') : null); }
  focus() { document.activeElement = this; }
  click() { this.clicked = true; this.dispatch('click'); }
  showModal() { this.open = true; }
  close() { this.open = false; this.dispatch('close'); }
  setAttribute(name, value) { this.attributes.set(name, value); }
  toggleAttribute(name, present) { present ? this.attributes.set(name, '') : this.attributes.delete(name); }
}

const document = new Element();
document.body = { classList: { contains: () => false } };
document.createElement = (name) => new Element(name.toUpperCase());
const input = new Element('INPUT');
const results = new Element();
const empty = new Element();
const summary = new Element();
const trigger = new Element('BUTTON');
const close = new Element('BUTTON');
const form = new Element('FORM');
const dialog = new Element('DIALOG');
dialog.selectors = { input, '.search-results': results, '.search-empty': empty, '.search-summary': summary, '[data-search-close]': close, form };
document.selectors = { '[data-search-dialog]': dialog, '[data-search-open]': trigger };
const searchEntries = [
  { title: 'Árbol de búsqueda', description: 'Poda de posiciones', slug: 'arbol', chapter: '2.1' },
  ...Array.from({ length: 13 }, (_, index) => ({ title: `Ajedrez ${index}`, description: 'Estrategia', slug: `chess-${index}`, chapter: String(index) })),
];
const searchSource = await readFile(new URL('../src/components/SearchDialog.astro', import.meta.url), 'utf8');
vm.runInNewContext(searchSource.match(/<script\b[^>]*>([\s\S]*?)<\/script>/)[1], {
  document, searchEntries, lang: 'es', requestAnimationFrame: (callback) => callback(),
});

trigger.click();
assert.equal(dialog.open, true);
assert.equal(document.activeElement, input);
assert.equal(results.children.length, 12, 'Empty query has a bounded initial result list');
assert.equal(summary.textContent, '12 de 14 resultados');
input.value = '  PODA arbol  ';
input.dispatch('input');
assert.equal(results.children.length, 1, 'Search ignores accents, case, word order and extra spaces');
assert.equal(results.firstElementChild.href, '/es/arbol', 'Results preserve locale');
assert.equal(results.firstElementChild.children[0].textContent, '2.1', 'Results retain real section numbers');
input.dispatch('keydown', { key: 'ArrowDown' });
assert.equal(document.activeElement, results.firstElementChild);
results.dispatch('keydown', { key: 'ArrowUp', target: results.firstElementChild });
assert.equal(document.activeElement, input);
form.dispatch('submit');
assert.equal(results.firstElementChild.clicked, true, 'Enter opens the first match');
input.value = 'unmatched concept';
input.dispatch('input');
assert.equal(empty.hidden, false);
assert.equal(summary.textContent, '0 resultados');
assert.doesNotThrow(() => form.dispatch('submit'), 'Enter with no matches must not navigate or throw');
close.click();
assert.equal(document.activeElement, trigger);
trigger.click();
assert.equal(input.value, 'unmatched concept', 'Reopening preserves the query');
document.dispatch('keydown', { key: 'Escape' });
assert.equal(dialog.open, false);
document.activeElement = trigger;
document.dispatch('keydown', { key: '/', ctrlKey: true });
assert.equal(dialog.open, false, 'Modified shortcuts do not open search');
document.dispatch('keydown', { key: '/' });
assert.equal(dialog.open, true);

const browser = new Element();
const button = new Element('BUTTON');
button.dataset = { lang: 'es', slug: 'arbol', idleLabel: 'Marcar como leído', doneLabel: 'Lectura completada' };
const label = new Element();
button.selectors = { '[data-read-label]': label };
document.selectors = { '[data-read-status]': button };
let lastVisited;
let done = false;
const progressSource = await readFile(new URL('../src/components/ReadingProgress.astro', import.meta.url), 'utf8');
const progressScript = progressSource.match(/<script>([\s\S]*?)<\/script>/)[1].replace(/^\s*import .*;$/gm, '');
vm.runInNewContext(ts.transpileModule(progressScript, { compilerOptions: { target: ts.ScriptTarget.ES2022 } }).outputText, {
  document, window: browser, requestAnimationFrame: () => 1,
  getReadStatus: () => done,
  setReadStatus: (_lang, _slug, value) => { done = value; browser.dispatch('read-change'); },
  setLastVisited: (_lang, slug) => { lastVisited = slug; },
  syncReadingMarkers() {}, READ_STATUS_EVENT: 'read-change',
});
assert.equal(lastVisited, 'arbol');
button.click();
assert.equal(button.attributes.get('aria-pressed'), 'true');
assert.equal(label.textContent, 'Lectura completada');
lastVisited = 'a-later-chapter';
done = false;
browser.dispatch('pageshow', { persisted: true });
assert.equal(lastVisited, 'arbol', 'Back/forward restoration refreshes the resume destination');
assert.equal(button.attributes.get('aria-pressed'), 'false', 'Restored pages refresh reading state');

console.log('Reader controls verified: search matching, empty state, keyboard actions, toggle state and restored visits.');
