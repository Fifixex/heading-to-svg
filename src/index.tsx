import { Text } from './Text';

export type RGBTuple = [number, number, number];

export interface RGBGradient {
  from: RGBTuple;
  to: RGBTuple;
}

type ColorValue = RGBTuple | RGBGradient;
type ColorOption = ColorValue | Record<string, ColorValue>;

export interface SVGParserOptions {
  text: string;
  font: string;
  size: number;
  colors: ColorOption;
}

/**
 * SVGParser handles the conversion of text to SVG with custom styling
 * Manages font loading and color application for SVG text rendering
 */
export class SVGParser {
  private text: string;
  private font: string;
  private size: number;
  private colors: ColorOption;

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
  private normalizeColors(
    colors: ColorOption,
  ): Record<string, RGBTuple | RGBGradient> {
    if (Array.isArray(colors)) {
      return { default: colors };
    }

    if (this.isGradient(colors)) {
      return { default: colors };
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

  public render() {
    return (
      <Text
        text={this.text}
        colors={this.colors}
        font={this.font}
        size={this.size}
      />
    );
  }
}
