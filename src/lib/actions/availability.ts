'use server';

import { endOfDay, getDay, isBefore, setHours, startOfToday } from 'date-fns';

import { prisma } from '@/lib/prisma';

type GetUserAvailabilityParams = {
  username: string;
  date: Date;
};

type GetUserBlockedDatesParams = {
  username: string;
  year: number;
  month: number;
};

export async function getUserAvailability(params: GetUserAvailabilityParams) {
  const user = await prisma.user.findUnique({
    where: { username: params.username },
  });

  if (!user) {
    return { error: 'User not found', availability: null };
  }

  const isPastDate = isBefore(endOfDay(params.date), startOfToday());

  if (isPastDate) {
    return { error: 'Date now allowed', availability: null };
  }

  const userAvailability = await prisma.userTimeInterval.findFirst({
    where: {
      user_id: user.id,
      week_day: getDay(params.date),
    },
  });

  if (!userAvailability) {
    return { error: "User hasn't available times", availability: null };
  }

  const { time_start_in_minutes, time_end_in_minutes } = userAvailability;

  const startHour = Math.floor(time_start_in_minutes / 60);
  const endHour = Math.floor(time_end_in_minutes / 60);

  const possibleTimes = Array.from({ length: endHour - startHour }).map((_, index) => {
    return startHour + index;
  });

  const blockedTimes = await prisma.scheduling.findMany({
    select: {
      date: true,
    },
    where: {
      user_id: user.id,
      date: {
        gte: setHours(params.date, startHour),
        lte: setHours(params.date, endHour),
      },
    },
  });

  const availableTimes = possibleTimes.filter(
    (time) => !blockedTimes.some((blockedTime) => blockedTime.date.getHours() === time),
  );

  return { error: null, availability: { possibleTimes, availableTimes } };
}

export async function getUserBlockedDates(params: GetUserBlockedDatesParams) {
  const user = await prisma.user.findUnique({
    where: { username: params.username },
  });

  if (!user) {
    return { error: 'User not found', blockedWeekDays: null };
  }

  const availableWeekDays = await prisma.userTimeInterval.findMany({
    select: {
      week_day: true,
    },
    where: {
      user_id: user.id,
    },
  });

  const blockedWeekDays = [0, 1, 2, 3, 4, 5, 6].filter(
    (weekDay) =>
      !availableWeekDays.some(
        (availableWeekDay) => availableWeekDay.week_day === weekDay,
      ),
  );

  return { error: null, blockedWeekDays: blockedWeekDays };
}
