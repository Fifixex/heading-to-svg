export type RGBTuple = [number, number, number];

export interface RGBGradient {
  from: RGBTuple;
  to: RGBTuple;
}

export type ColorValue = RGBTuple | RGBGradient;

export interface SVGParserOptions {
  text: string;
  font: string;
  size: number;
  colors: ColorValue;
}

/**
 * SVGParser handles the conversion of text to SVG with custom styling
 * Manages font loading and color application for SVG text rendering
 */
export class SVGParser {
  public text: string;
  public font: string;
  public size: number;
  public colors: ColorValue;

  constructor(options: SVGParserOptions) {
    this.text = options.text;
    this.font = options.font;
    this.size = options.size;
    this.colors = this.normalizeColors(options.colors);
  }

  /**
   * Normalizes color options into a consistent format
   * @param colors - Color options that can be a single color, gradient, or map of named colors
   * @returns A record mapping color names to their values
   */
  private normalizeColors(colors: ColorValue): ColorValue {
    if (Array.isArray(colors)) {
      return colors;
    }

    if (this.isGradient(colors)) {
      return colors;
    }
    return colors;
  }

  /**
   * Type guard to check if a value is a gradient
   */
  private isGradient(
    value: ColorValue | Record<string, ColorValue>,
  ): value is RGBGradient {
    return 'from' in value && 'to' in value;
  }
}
