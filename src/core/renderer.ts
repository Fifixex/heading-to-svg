import satori from 'satori';
import { getFontBuffer } from './fonts';
import { getAnimationCss } from '../animations';
import type { SvgParams } from './validator';

export async function renderSvg(params: SvgParams): Promise<string> {
  const fontBuffer = await getFontBuffer();
  const textVal = params.text.replace(/\\n/g, '\n');
  const lines = textVal.split('\n');

  const elements = {
    type: 'div',
    props: {
      style: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        width: params.width ? `${params.width}px` : '100%',
        height: params.height ? `${params.height}px` : '100%',
        color: params.color,
        fontSize: params.fontSize,
      },
      className: 'wrapper',
      children: lines.map((line, i) => ({
        type: 'div', // Using div instead of span ensures flex vertical stacking correctly if not configured perfectly, though flex column does this anyway
        props: {
          style: { display: 'flex' },
          children: line || ' ' // Handle empty lines
        }
      }))
    }
  };

  const svgRaw = await satori(elements as any, {
    width: params.width as number,
    height: params.height as number,
    fonts: [
      {
        name: 'Inter',
        data: fontBuffer,
        weight: 400,
        style: 'normal',
      },
    ],
  });

  const css = getAnimationCss(params);
  if (css) {
    return svgRaw.replace(/(<svg[^>]*>)/, `$1<style>${css}</style>`);
  }

  return svgRaw;
}
