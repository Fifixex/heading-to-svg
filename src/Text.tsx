import type { FC } from 'hono/jsx';
import type { RGBGradient, SVGParserOptions } from '.';

export const Text: FC<SVGParserOptions> = ({ text, font, size, colors }) => {
  const gradientDef = generateGradient(colors);
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={500}
      height={500}
      viewBox={'0 0 500 500'}
    >
      <defs dangerouslySetInnerHTML={{ __html: gradientDef }} />
      <g transform="translate(10, 30)">
        <text
          fill={'url(#gradient)'}
          x="0"
          y="0"
          font-size={size}
          font-family={font}
        >
          {text}
        </text>
      </g>
    </svg>
  );
};

function generateGradient(color: SVGParserOptions['colors']) {
  if (Array.isArray(color)) {
    const [r, g, b] = color;
    return (
      <linearGradient id="gradient" gradientTransform="rotate(90)">
        <stop offset="0%" stop-color={`rgb(${r},${g},${b})`} />
        <stop offset="100%" stop-color="transparent" />
      </linearGradient>
    );
  }

  if ('from' in color && 'to' in color) {
    const { from, to } = color as RGBGradient;
    return (
      <linearGradient id="gradient" gradientTransform="rotate(90)">
        <stop offset="0%" stop-color={`rgb(${from.join(',')})`} />
        <stop offset="100%" stop-color={`rgb(${to.join(',')})`} />
      </linearGradient>
    );
  }

  return '';
}
