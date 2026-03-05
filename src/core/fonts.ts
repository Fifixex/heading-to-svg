import fs from 'node:fs/promises';
import path from 'node:path';

let fontBuffer: ArrayBuffer | null = null;

export async function getFontBuffer(): Promise<ArrayBuffer> {
  if (fontBuffer) return fontBuffer;
  const fontPath = path.join(process.cwd(), 'src', 'assets', 'inter.woff');
  const buffer = await fs.readFile(fontPath);
  fontBuffer = buffer.buffer.slice(buffer.byteOffset, buffer.byteOffset + buffer.byteLength) as ArrayBuffer;
  return fontBuffer;
}
