import { prisma } from '@/lib/prisma';

export const GET = async (
  request: Request,
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
  return Response.json(userTimeIntervals);
};
