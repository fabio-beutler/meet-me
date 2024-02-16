'use server';

import { isBefore, startOfHour } from 'date-fns';
import { z } from 'zod';

import { prisma } from '@/lib/prisma';
import { createScheduleSchema } from '@/lib/validations/schedule';

export async function createSchedule(
  username: string,
  params: z.infer<typeof createScheduleSchema>,
) {
  const parsedData = createScheduleSchema.safeParse(params);

  if (!parsedData.success) {
    throw new Error('Invalid data');
  }

  const user = await prisma.user.findUnique({
    where: { username },
  });

  if (!user) {
    throw new Error('User not found');
  }

  const { data } = parsedData;

  const schedulingDate = startOfHour(data.date);

  if (isBefore(schedulingDate, new Date())) {
    throw new Error('You cannot schedule an appointment on a past date');
  }

  const conflictingScheduling = await prisma.scheduling.findFirst({
    where: {
      user_id: user.id,
      date: schedulingDate,
    },
  });

  if (conflictingScheduling) {
    throw new Error('There is already a scheduling for this date');
  }

  return prisma.scheduling.create({
    data: {
      date: schedulingDate,
      name: data.name,
      email: data.email,
      observations: data.observations,
      user_id: user.id,
    },
  });
}
