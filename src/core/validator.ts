import { z } from 'zod';

const FONTS = ['Inter', 'Roboto', 'JetBrains Mono', 'Fira Code', 'Open Sans', 'Geist'] as const;

export const querySchema = z.object({
  text: z
    .string()
    .min(1, 'Text cannot be empty')
    .max(200, 'Max 200 characters'),

  fontSize: z.coerce
    .number()
    .int()
    .min(10)
    .max(150)
    .default(60),

  fontFamily: z
    .enum(FONTS)
    .default('Inter'),

  color: z
    .string()
    .trim()
    .transform((val) => (val.startsWith('#') ? val : `#${val}`))
    .refine((val) => /^#([0-9A-Fa-f]{3}|[0-9A-Fa-f]{6}|[0-9A-Fa-f]{8})$/.test(val), {
      message: 'Hex color must be 3, 6 or 8 characters (with or without #)',
    })
    .default('#000000'),

  animation: z
    .enum(['none', 'fade', 'bounce', 'writing', 'rainbow'])
    .default('none'),

  duration: z.coerce
    .number()
    .min(0.5)
    .max(10)
    .default(2),

  width: z.coerce.number().int().min(100).max(1200).optional(),
  height: z.coerce.number().int().min(50).max(600).optional(),
});

export type SvgParams = z.infer<typeof querySchema>;
