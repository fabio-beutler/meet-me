'use server';

import { z } from 'zod';

import { auth } from '@/lib/auth';
import { prisma } from '@/lib/prisma';
import { timeIntervalsSchema } from '@/lib/validations/datetime';

export async function createTimeInterval({
  intervals,
}: z.infer<typeof timeIntervalsSchema>) {
  const session = await auth();

  if (!session) {
    return { data: null, error: 'Usuário não autenticado' };
  }

  if (!session.user.id) {
    return { data: null, error: 'Usuário não encontrado' };
  }

  const id = session.user.id;

  await Promise.all(
    intervals.map((interval) => {
      return prisma.userTimeInterval.create({
        data: {
          week_day: interval.weekDay,
          time_start_in_minutes: interval.startTimeInMinutes,
          time_end_in_minutes: interval.endTimeInMinutes,
          user_id: id,
        },
      });
    }),
  );

  return { data: 'Intervalos de tempo criados com sucesso', error: null };
}
