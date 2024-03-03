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
  const user = await prisma.user.findUnique({
    where: {
      username: params.username,
    },
    include: {
      timeIntervals: true,
    },
  });
  return NextResponse.json(user);
};
