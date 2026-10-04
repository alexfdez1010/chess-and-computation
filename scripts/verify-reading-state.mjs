import assert from 'node:assert/strict';

const values = new Map([
  ['ac-read:es:board', '1'],
  ['ac-last:es', 'board'],
  ['ac-last:en', 'introduction'],
]);
let blocked = false;
let quotaExceeded = false;
const browser = new EventTarget();
Object.defineProperty(browser, 'localStorage', {
  get() {
    if (blocked) throw new Error('Storage is blocked');
    return {
      getItem: (key) => values.get(key) ?? null,
      setItem(key, value) {
        if (quotaExceeded) throw new Error('Storage quota exceeded');
        values.set(key, value);
      },
    };
  },
});
globalThis.window = browser;
const attributes = new Set();
globalThis.document = {
  querySelectorAll: () => [{
    dataset: { readingKey: 'es:board' },
    toggleAttribute(name, present) { present ? attributes.add(name) : attributes.delete(name); },
  }],
};

const state = await import('../src/lib/reading-state.ts');
assert.equal(state.getReadStatus('es', 'board'), true, 'Existing read keys must remain compatible');
assert.equal(state.getReadStatus('en', 'board'), false, 'Languages have independent reading state');
assert.equal(state.getLastVisited('es', ['board']), 'board');
assert.equal(state.getLastVisited('es', ['introduction']), null, 'Removed routes must not become resume links');
assert.equal(state.getLastVisited('en', ['introduction']), 'introduction');

let detail;
browser.addEventListener(state.READ_STATUS_EVENT, (event) => { detail = event.detail; });
state.setReadStatus('es', 'board', false);
assert.equal(values.get('ac-read:es:board'), '0');
assert.deepEqual(detail, { lang: 'es', slug: 'board', done: false });
assert.equal(attributes.has('data-read'), false, 'Markers follow read status changes');

blocked = true;
assert.doesNotThrow(() => state.setReadStatus('es', 'board', true));
assert.equal(state.getReadStatus('es', 'board'), true, 'Blocked storage keeps current page state in memory');
assert.equal(attributes.has('data-read'), true);
assert.doesNotThrow(() => state.setLastVisited('es', 'alpha-beta'));
assert.equal(state.getLastVisited('es', ['alpha-beta']), 'alpha-beta');
assert.equal(state.getLastVisited('en', ['board']), null);

blocked = false;
quotaExceeded = true;
state.setReadStatus('es', 'board', false);
assert.equal(state.getReadStatus('es', 'board'), false, 'Full storage keeps current page state in memory');
state.setLastVisited('es', '../../outside');
assert.equal(state.getLastVisited('es', ['board', 'alpha-beta']), null, 'Only actual route slugs are accepted');

quotaExceeded = false;
values.set('ac-read:es:board', '1');
const storageEvent = new Event('storage');
storageEvent.key = 'ac-read:es:board';
browser.dispatchEvent(storageEvent);
assert.equal(state.getReadStatus('es', 'board'), true, 'Storage events refresh state from other tabs');
assert.equal(attributes.has('data-read'), true);

console.log('Reading state verified: persistence, route validation, blocked/full storage, events, and live markers.');
