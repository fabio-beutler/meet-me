'use server';

import { endOfDay, getDay, isBefore, startOfToday } from 'date-fns';

import { prisma } from '@/lib/prisma';

type GetUserAvailabilityParams = {
  username: string;
  date: Date;
};

export async function getUserAvailability(params: GetUserAvailabilityParams) {
  const user = await prisma.user.findUnique({
    where: { username: params.username },
  });

  if (!user) {
    return { availability: [] };
  }

  const isPastDate = isBefore(endOfDay(params.date), startOfToday());

  if (isPastDate) {
    return { availability: [] };
  }

  const userAvailability = await prisma.userTimeInterval.findFirst({
    where: {
      user_id: user.id,
      week_day: getDay(params.date),
    },
  });

  if (!userAvailability) {
    return { availability: [] };
  }

  const { time_start_in_minutes, time_end_in_minutes } = userAvailability;

  const startHour = Math.floor(time_start_in_minutes / 60);
  const endHour = Math.floor(time_end_in_minutes / 60);

  const possibleHours = Array.from({ length: endHour - startHour }).map((_, index) => {
    return startHour + index;
  });

  return possibleHours;
}
