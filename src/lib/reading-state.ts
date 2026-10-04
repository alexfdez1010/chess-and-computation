import type { Language } from '../components/content';

export const READ_STATUS_EVENT = 'ac:read-status-change';
const memory = new Map<string, string | null>();

function read(key: string): string | null {
  if (memory.has(key)) return memory.get(key) ?? null;
  try {
    return window.localStorage.getItem(key);
  } catch {
    return null;
  }
}

function write(key: string, value: string): void {
  // Keep the current page usable even if storage is blocked or full.
  try {
    window.localStorage.setItem(key, value);
    memory.delete(key);
  } catch {
    memory.set(key, value);
  }
}

export function getReadStatus(lang: Language, slug: string): boolean {
  return read(`ac-read:${lang}:${slug}`) === '1';
}

export function setReadStatus(lang: Language, slug: string, done: boolean): void {
  write(`ac-read:${lang}:${slug}`, done ? '1' : '0');
  window.dispatchEvent(new CustomEvent(READ_STATUS_EVENT, { detail: { lang, slug, done } }));
}

export function setLastVisited(lang: Language, slug: string): void {
  write(`ac-last:${lang}`, slug);
}

export function getLastVisited(lang: Language, validSlugs: readonly string[]): string | null {
  const slug = read(`ac-last:${lang}`);
  return slug !== null && validSlugs.includes(slug) ? slug : null;
}

export function syncReadingMarkers(): void {
  document.querySelectorAll<HTMLElement>('[data-reading-key]').forEach((element) => {
    const key = element.dataset.readingKey ?? '';
    const separator = key.indexOf(':');
    const lang = key.slice(0, separator);
    const slug = key.slice(separator + 1);
    if ((lang === 'es' || lang === 'en') && slug) {
      element.toggleAttribute('data-read', getReadStatus(lang, slug));
    }
  });
}

if (typeof window !== 'undefined') {
  window.addEventListener(READ_STATUS_EVENT, syncReadingMarkers);
  window.addEventListener('pageshow', syncReadingMarkers);
  window.addEventListener('storage', (event) => {
    if (event.key === null) memory.clear();
    else if (event.key.startsWith('ac-read:') || event.key.startsWith('ac-last:')) memory.delete(event.key);
    else return;
    syncReadingMarkers();
  });
}
