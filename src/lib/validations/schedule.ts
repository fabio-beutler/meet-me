import { z } from 'zod';

export const scheduleConfirmFormSchema = z.object({
  name: z.string().min(3, { message: 'Por favor, preencha seu nome' }),
  email: z.string().email({ message: 'Por favor, preencha um e-mail válido' }),
  observations: z.string().optional(),
});
