import fs from 'node:fs/promises';
import path from 'node:path';
let fontBuffer = null;
export async function getFontBuffer() {
    if (fontBuffer)
        return fontBuffer;
    const fontPath = path.join(process.cwd(), 'src', 'assets', 'inter.woff');
    const buffer = await fs.readFile(fontPath);
    fontBuffer = buffer.buffer.slice(buffer.byteOffset, buffer.byteOffset + buffer.byteLength);
    return fontBuffer;
}
