import { Hono } from 'hono';
import { zValidator } from '@hono/zod-validator';
import { querySchema } from './core/validator.js';
import { renderSvg } from './core/renderer.js';

export const app = new Hono().basePath('/api');

app.get('/', zValidator('query', querySchema), async (c) => {
  const options = c.req.valid('query');
  const content = await renderSvg(options);
  c.header('Content-Type', 'image/svg+xml');
  c.header('Cache-Control', 'public, max-age=86400, s-maxage=31536000, stale-while-revalidate=86400');
  c.header('Content-Security-Policy', "default-src 'none'; style-src 'unsafe-inline';");

  return c.body(content);
});
