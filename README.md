# Chess and Computation

A bilingual Astro web edition of *Ajedrez y Computación / Chess and Computation* by Alejandro Fernández Camello.

## Development

```sh
bun install --frozen-lockfile
bun run dev
```

## Production build

```sh
bun run build
```

The production origin is fixed to
`https://chess-and-computation.alejandrofernandezcamello.me`. Astro uses it for
canonical and alternate URLs, Open Graph metadata, JSON-LD, `robots.txt`, and
the sitemap; no environment variable is required.

The build generates the Spanish and English reading routes, localized diagrams, KaTeX equations, search, SEO metadata, and static book assets.

## Content pipeline

The source LaTeX lives in the upstream repository used under `tmp/source/AC` during conversion. Regenerate the Markdown content with:

```sh
bun scripts/convert-latex-content.mjs
```

Book assets and generated board SVGs have separate verification scripts under `scripts/`.

See [the design system](docs/DESIGN_SYSTEM.md) for visual, accessibility, localization, and content rules.
