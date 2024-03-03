import { z } from 'zod';

export const updateProfileSchema = z.object({
  username: z
    .string()
    .min(3, {
      message: 'O usuário precisa ter no mínimo 3 letras',
    })
    .regex(/^([a-z\-_.]+)$/i, {
      message: 'O usuário só pode conter letras, hifens, pontos e underscores',
    })
    .transform((username) => username.toLowerCase()),
  name: z
    .string()
    .min(1, {
      message: 'O nome é obrigatório',
    })
    .refine((name) => name.trim().split(' ').length > 1, {
      message: 'Digite seu nome completo',
    }),
  bio: z.string(),
});
