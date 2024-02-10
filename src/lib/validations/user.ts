import { z } from 'zod';

export const userSchema = z.object({
  username: z
    .string()
    .min(3, {
      message: 'O usuário precisa ter no mínimo 3 letras',
    })
    .regex(/^([a-z\\\\-]+)$/i, {
      message: 'O usuário só pode conter letras e hifens',
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
});

export const updateProfileSchema = z.object({
  bio: z.string(),
});
