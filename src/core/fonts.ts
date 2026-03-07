import fs from 'node:fs/promises';
import path from 'node:path';

const fontCache = new Map<string, Promise<ArrayBuffer>>();

const FONT_FILES = {
  inter: 'inter.woff',
  minecraft: 'minecraft.woff',
  'open-sans': 'open-sans.ttf',
  geist: 'geist.woff',
} as const;

type FontFamily = keyof typeof FONT_FILES;

const FONT_DIR = path.join(process.cwd(), 'src', 'assets');

export function getFontBuffer(fontFamily: FontFamily | string = 'inter' as FontFamily): Promise<ArrayBuffer> {
  const family = (fontFamily in FONT_FILES ? fontFamily : 'inter') as FontFamily;

  let cached = fontCache.get(family);
  if (cached) return cached;

  const fontPromise = loadFont(family);

  fontCache.set(family, fontPromise);
  return fontPromise;
}

async function loadFont(fontFamily: FontFamily): Promise<ArrayBuffer> {
  const fileName = FONT_FILES[fontFamily];
  const fontPath = path.join(FONT_DIR, fileName);

  try {
    const buffer = await fs.readFile(fontPath);
    return buffer.buffer.slice(
      buffer.byteOffset,
      buffer.byteOffset + buffer.byteLength
    );
  } catch (error) {
    fontCache.delete(fontFamily);
    console.error(`Error loading font ${fontFamily}:`, error);

    if (fontFamily !== 'inter') {
      return getFontBuffer('inter');
    }

    throw new Error('Font cannot be loaded');
  }
}
