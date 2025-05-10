import { Hono } from 'hono';
import { SVGParser, type SVGParserOptions } from './SVGParser.js';
import { Text } from './Text.js';
import { parseQueryParams } from './utils.js';

export const app = new Hono().basePath('/api');

app.get('/', (c) => {
  const options = parseQueryParams(c.req.query());
  const parser = new SVGParser(options) satisfies SVGParserOptions;
  c.header('Content-Type', 'image/svg+xml');
  return c.html(<Text {...parser} />);
});
