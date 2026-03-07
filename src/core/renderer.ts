import satori from 'satori';
import { getAnimationCss } from '../animations/index.js';
import { getFontBuffer } from './fonts.js';
import type { SvgParams } from './validator.js';

export async function renderSvg(params: SvgParams): Promise<string> {
  const fontBuffer = await getFontBuffer(params.fontFamily);
  const textVal = params.text.replace(/\\n/g, '\n');
  const lines = textVal.split('\n');

  const children = lines.map((line) => ({
    type: 'div',
    props: {
      style: { display: 'flex' },
      children: line || ' ',
    },
  }));

  const elements = {
    type: 'div',
    props: {
      className: 'wrapper',
      style: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        width: params.width ? `${params.width}px` : '100%',
        height: params.height ? `${params.height}px` : '100%',
        color: params.color,
        fontSize: params.fontSize,
        fontFamily: params.fontFamily
      },
      children
    },
  };

  const svg = await satori(elements, {
    width: params.width as number,
    height: params.height as number,
    fonts: [
      {
        name: params.fontFamily,
        data: fontBuffer,
        weight: 400,
        style: 'normal',
      },
    ],
  });

  const css = getAnimationCss(params);
  if (css) {
    return svg.replace(/(<svg[^>]*>)/, `$1<style>${css}</style>`);
  }

  return svg;
}
