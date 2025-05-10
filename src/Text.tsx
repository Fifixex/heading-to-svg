import type { FC } from 'hono/jsx';
import type { SVGParserOptions } from './SVGParser.js';

export const Text: FC<SVGParserOptions> = ({ text, font, size, colors }) => {
  const isGradient = 'from' in colors && 'to' in colors;
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="400" height="100">
      <title>Heading to SVG</title>
      {isGradient && (
        <defs>
          <linearGradient id="gradient" gradientTransform="rotate(90)">
            <stop offset="0%" stop-color={`rgb(${colors.from})`} />
            <stop offset="100%" stop-color={`rgb(${colors.to})`} />
          </linearGradient>
        </defs>
      )}
      <text
        x="10"
        y="50"
        font-family={font}
        font-size={size}
        fill={isGradient ? 'url(#gradient)' : `rgb(${colors})`}
      >
        {text}
      </text>
    </svg>
  );
};
