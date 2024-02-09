import { z } from 'zod';

export const timeIntervalsSchema = z.object({});

export enum WeekDay {
  Domingo,
  'Segunda-feira',
  'Terça-feira',
  'Quarta-feira',
  'Quinta-feira',
  'Sexta-feira',
  Sábado,
}
