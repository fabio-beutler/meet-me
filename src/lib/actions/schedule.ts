'use server';

import { addHours, isBefore, startOfHour } from 'date-fns';
import { google } from 'googleapis';
import { z } from 'zod';

import { getGoogleOAuthToken } from '@/lib/google';
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

  const scheduling = await prisma.scheduling.create({
    data: {
      date: schedulingDate,
      name: data.name,
      email: data.email,
      observations: data.observations,
      user_id: user.id,
    },
  });

  const calendar = google.calendar({
    version: 'v3',
    auth: await getGoogleOAuthToken(user.id),
  });

  await calendar.events.insert({
    calendarId: 'primary',
    conferenceDataVersion: 1,
    requestBody: {
      summary: `Meet Me: ${data.name}`,
      description: data.observations,
      start: {
        dateTime: schedulingDate.toISOString(),
      },
      end: {
        dateTime: addHours(schedulingDate, 1).toISOString(),
      },
      attendees: [{ email: data.email, displayName: data.name }],
      conferenceData: {
        createRequest: {
          requestId: scheduling.id,
          conferenceSolutionKey: {
            type: 'hangoutsMeet',
          },
        },
      },
    },
  });

  return;
}
