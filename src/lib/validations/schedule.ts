import { z } from 'zod';

export const scheduleConfirmFormSchema = z.object({
  name: z.string().min(3, { message: 'Por favor, preencha seu nome' }),
  email: z.string().email({ message: 'Por favor, preencha um e-mail válido' }),
  observations: z.string().optional(),
});

export const createScheduleSchema = z.object({
  name: z.string(),
  email: z.string().email(),
  observations: z.string().optional(),
  date: z.coerce.date(),
});
