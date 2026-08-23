import type { APIRoute } from 'astro';

export const GET: APIRoute = ({ site }) => {
  const origin = site || new URL('https://chess-and-computation.alejandrofernandezcamello.me');
  return new Response(`User-agent: *\nAllow: /\n\nSitemap: ${new URL('/sitemap-index.xml', origin)}\n`, {
    headers: { 'Content-Type': 'text/plain; charset=utf-8' },
  });
};
