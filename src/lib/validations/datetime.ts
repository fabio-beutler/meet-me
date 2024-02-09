import { z } from 'zod';

import { convertTimeStringToMinutes } from '@/lib/utils';

export const timeIntervalsSchema = z.object({
  intervals: z
    .array(
      z.object({
        weekDay: z.number().min(0).max(6),
        enabled: z.boolean(),
        startTime: z.string(),
        endTime: z.string(),
      }),
    )
    .length(7)
    .transform((intervals) => intervals.filter((interval) => interval.enabled))
    .refine((intervals) => intervals.length > 0, {
      message: 'Pelo menos um intervalo de horário deve ser definido.',
    })
    .transform((intervals) =>
      intervals.map((interval) => ({
        weekDay: interval.weekDay,
        startTimeInMinutes: convertTimeStringToMinutes(interval.startTime),
        endTimeInMinutes: convertTimeStringToMinutes(interval.endTime),
      })),
    )
    .refine(
      (intervals) =>
        intervals.every(
          (interval) => interval.endTimeInMinutes - interval.startTimeInMinutes >= 60,
        ),
      {
        message: 'O intervalo de horário deve ser de pelo menos 1 hora.',
      },
    ),
});

export enum WeekDay {
  Domingo,
  'Segunda-feira',
  'Terça-feira',
  'Quarta-feira',
  'Quinta-feira',
  'Sexta-feira',
  Sábado,
}
