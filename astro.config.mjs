import { defineConfig } from 'astro/config';
import { unified } from '@astrojs/markdown-remark';
import sitemap from '@astrojs/sitemap';
import remarkMath from 'remark-math';
import rehypeKatex from 'rehype-katex';

export default defineConfig({
  site: 'https://chess-and-computation.alejandrofernandezcamello.me',
  trailingSlash: 'never',
  integrations: [sitemap()],
  markdown: {
    processor: unified({ remarkPlugins: [remarkMath], rehypePlugins: [[rehypeKatex, { strict: 'ignore' }]] }),
    shikiConfig: { theme: 'github-dark-default', wrap: true },
  },
  vite: {
    build: { cssMinify: 'lightningcss' },
  },
});
