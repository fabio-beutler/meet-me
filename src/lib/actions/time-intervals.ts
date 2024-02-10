'use server';

import { getServerSession } from 'next-auth';
import { z } from 'zod';

import { authOptions } from '@/app/api/auth/[...nextauth]/route';
import { prisma } from '@/lib/prisma';
import { timeIntervalsSchema } from '@/lib/validations/datetime';

export async function createTimeInterval({
  intervals,
}: z.infer<typeof timeIntervalsSchema>) {
  const session = await getServerSession(authOptions);

  if (!session) {
    return { data: null, error: 'Usuário não autenticado' };
  }

  await Promise.all(
    intervals.map((interval) => {
      return prisma.userTimeInterval.create({
        data: {
          week_day: interval.weekDay,
          time_start_in_minutes: interval.startTimeInMinutes,
          time_end_in_minutes: interval.endTimeInMinutes,
          user_id: session.user.id,
        },
      });
    }),
  );

  return { data: 'Intervalos de tempo criados com sucesso', error: null };
}
