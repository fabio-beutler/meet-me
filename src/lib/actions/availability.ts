'use server';

import { endOfDay, getDay, isBefore, set, startOfToday } from 'date-fns';

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

  const startHour = time_start_in_minutes / 60;
  const endHour = time_end_in_minutes / 60;

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
        gte: set(params.date, {
          hours: startHour,
          minutes: 0,
          seconds: 0,
          milliseconds: 0,
        }),
        lte: set(params.date, {
          hours: endHour,
          minutes: 0,
          seconds: 0,
          milliseconds: 0,
        }),
      },
    },
  });

  const availableTimes = possibleTimes.filter((time) => {
    const isTimeBlocked = blockedTimes.some(
      (blockedTime) => blockedTime.date.getHours() === time,
    );
    const isTimeInPast = isBefore(set(params.date, { hours: time }), new Date());
    return !isTimeBlocked && !isTimeInPast;
  });

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

  const blockedDaysRaw = await prisma.$queryRaw<
    Array<{
      date: number;
    }>
  >`
  SELECT
    EXTRACT(DAY FROM S.date) AS date,
    COUNT(S.date) AS amount,
    ((UTI.time_end_in_minutes - UTI.time_start_in_minutes) / 60) AS size

  FROM schedulings S

  LEFT JOIN user_time_intervals UTI
    ON UTI.week_day = WEEKDAY(DATE_ADD(S.date, INTERVAL 1 DAY))

  WHERE S.user_id = ${user.id}
    AND DATE_FORMAT(S.date, "%Y-%m") = ${`${params.year}-${params.month.toString().padStart(2, '0')}`}

  GROUP BY EXTRACT(DAY FROM S.date),
    ((UTI.time_end_in_minutes - UTI.time_start_in_minutes) / 60)

  HAVING amount >= size
  `;

  const blockedDates = blockedDaysRaw.map((blockedDay) => Number(blockedDay.date));
  return { error: null, blockedWeekDays: { blockedWeekDays, blockedDates } };
}
