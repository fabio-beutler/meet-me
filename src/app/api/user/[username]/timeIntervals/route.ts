import { NextRequest, NextResponse } from 'next/server';

import { prisma } from '@/lib/prisma';

export const GET = async (
  request: NextRequest,
  {
    params,
  }: {
    params: { username: string };
  },
) => {
  const userTimeIntervals = await prisma.user.findUnique({
    where: {
      username: params.username,
    },
    select: {
      timeIntervals: true,
    },
  });
  return NextResponse.json(userTimeIntervals);
};
