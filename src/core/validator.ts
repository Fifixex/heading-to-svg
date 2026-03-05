import { z } from 'zod';

export const querySchema = z.object({
  text: z.string().min(1).max(200),
  fontSize: z.coerce.number().min(10).max(150).default(60),
  color: z
    .string()
    .regex(/^#?[0-9A-Fa-f]{3,8}$/, 'Color hex inválido')
    .default('#000000'),
  animation: z
    .enum(['none', 'fade', 'bounce', 'writing', 'rainbow'])
    .default('none'),
  duration: z.coerce.number().min(0.5).max(10).default(2),
  width: z.coerce.number().min(100).max(1200).optional(),
  height: z.coerce.number().min(50).max(600).optional(),
});

export type SvgParams = z.infer<typeof querySchema>;
