import { Hono } from 'hono';
import { handle } from 'hono/vercel';
import { SVGParser } from '../src';
import { parseQueryParams } from '../src/utils';

export const config = {
  runtime: 'edge',
};

const app = new Hono().basePath('/api');

app.get('/', (c) => {
  const options = parseQueryParams(c.req.query());
  const parser = new SVGParser(options);
  const svg = parser.render();

  c.header('Content-Type', 'image/svg+xml');
  return c.html(svg);
});

export default handle(app);
