import type { AstroComponentFactory } from 'astro/runtime/server/index.js';

export type Language = 'es' | 'en';

export type ChapterFrontmatter = {
  title: string;
  description?: string;
  chapter?: string | number;
  part?: string;
  order?: number;
  bookChapter?: string;
  bookChapterTitle?: string;
  sectionNumber?: string;
  sectionTitle?: string;
  navDepth?: 1 | 2;
  pairedSlug?: string;
  draft?: boolean;
};

export type ChapterEntry = ChapterFrontmatter & {
  lang: Language;
  slug: string;
  Content: AstroComponentFactory;
};

type MarkdownModule = {
  frontmatter: ChapterFrontmatter;
  default: AstroComponentFactory;
};

const modules = import.meta.glob<MarkdownModule>('/src/content/**/*.{md,mdx}', {
  eager: true,
});

const pathPattern = /^\/src\/content\/(es|en)\/(.+)\.(?:md|mdx)$/;

export const chapters: ChapterEntry[] = Object.entries(modules)
  .flatMap(([path, module]) => {
    const match = path.match(pathPattern);
    if (!match || module.frontmatter?.draft) return [];
    const [, lang, sourceSlug] = match;
    const slug = sourceSlug.replace(/\/index$/, '');
    const explicitOrder = Number(module.frontmatter?.order);
    const chapterOrder = Number(module.frontmatter?.chapter);
    return [{
      ...module.frontmatter,
      title: module.frontmatter?.title || slug.replaceAll('-', ' '),
      lang: lang as Language,
      slug,
      order: Number.isFinite(explicitOrder) ? explicitOrder : (Number.isFinite(chapterOrder) ? chapterOrder : 999),
      Content: module.default,
    }];
  })
  .sort((a, b) => (a.order ?? 999) - (b.order ?? 999) || a.title.localeCompare(b.title));

export function chaptersFor(lang: Language) {
  return chapters.filter((chapter) => chapter.lang === lang);
}

export type NavigationGroup = {
  key: string;
  title: string;
  kind: 'introduction' | 'chapter' | 'appendix' | 'references';
  landing?: ChapterEntry;
  sections: ChapterEntry[];
};

export function navigationGroupsFor(lang: Language): NavigationGroup[] {
  const groups = new Map<string, ChapterEntry[]>();
  for (const entry of chaptersFor(lang)) {
    const key = entry.bookChapter || String(entry.order ?? '');
    const items = groups.get(key) || [];
    items.push(entry);
    groups.set(key, items);
  }
  return [...groups].map(([key, items]) => {
    const landing = items.find((entry) => entry.navDepth === 1);
    const kind = key === '0' ? 'introduction' : key === 'references' ? 'references' : /^[A-D]$/.test(key) ? 'appendix' : 'chapter';
    return {
      key,
      title: items[0]?.bookChapterTitle || items[0]?.chapter?.toString() || items[0]?.title || key,
      kind,
      landing,
      sections: items.filter((entry) => entry !== landing),
    };
  });
}

export function equivalentPath(entry: ChapterEntry, target: Language) {
  const paired = entry.pairedSlug || entry.slug;
  const exact = chapters.find((chapter) => chapter.lang === target && chapter.slug === paired);
  return exact ? `/${target}/${exact.slug}` : `/${target}`;
}

export const copy = {
  es: {
    title: 'Ajedrez y Computación',
    subtitle: 'Del tablero a la inteligencia artificial',
    description: 'Una edición web abierta sobre algoritmos, búsqueda, aprendizaje y el juego que convirtió el cálculo en estrategia.',
    contents: 'Contenido', search: 'Buscar', searchHint: 'Busca conceptos, capítulos y técnicas',
    theme: 'Cambiar tema', language: 'Read in English', onPage: 'En esta página',
    start: 'Empezar a leer', continue: 'Continuar', read: 'Marcar como leído', readDone: 'Capítulo leído',
    previous: 'Anterior', next: 'Siguiente', chapters: 'capítulos', sections: 'secciones', noResults: 'No hay resultados para esta búsqueda.',
  },
  en: {
    title: 'Chess and computation',
    subtitle: 'From the board to artificial intelligence',
    description: 'An open web edition about algorithms, search, learning, and the game that turned calculation into strategy.',
    contents: 'Contents', search: 'Search', searchHint: 'Search concepts, chapters, and techniques',
    theme: 'Switch theme', language: 'Leer en español', onPage: 'On this page',
    start: 'Start reading', continue: 'Continue', read: 'Mark as read', readDone: 'Chapter read',
    previous: 'Previous', next: 'Next', chapters: 'chapters', sections: 'sections', noResults: 'No results for this search.',
  },
} as const;
