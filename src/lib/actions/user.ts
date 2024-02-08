'use server';

import { z } from 'zod';

import { prisma } from '@/lib/prisma';
import { userSchema } from '@/lib/validations/user';

export async function createUser(user: z.infer<typeof userSchema>) {
  const existingUser = await prisma.user.findUnique({
    where: { username: user.username },
  });

  if (existingUser) throw new Error('User already exists');

  return prisma.user.create({
    data: user,
  });
}
