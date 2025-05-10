import type { ColorValue, RGBTuple, SVGParserOptions } from './SVGParser.js';

export function parseQueryParams(
  query: Record<string, string>,
): SVGParserOptions {
  const text = query.text || 'Heading to Text';
  const size = Number.parseInt(query.size || '24');
  const font = query.font || 'sans-serif';
  const colors = parseColor(query.color);

  return {
    text,
    size,
    font,
    colors,
  };
}

function parseColor(input?: string): ColorValue {
  if (!input) return [0, 0, 0];
  if (input.includes(';')) {
    const parts = input.split(';');
    const from = parts[0];
    const to = parts[1];

    if (from && to) {
      const fromRGB = from.split(',').map(Number) as RGBTuple;
      const toRGB = to.split(',').map(Number) as RGBTuple;
      return { from: fromRGB, to: toRGB };
    }
  }

  return input.split(',').map(Number) as RGBTuple;
}
