'use server';

import { z } from 'zod';

import { prisma } from '@/lib/prisma';
import { userSchema } from '@/lib/validations/user';

export async function createUser(user: z.infer<typeof userSchema>) {
  const existingUser = await prisma.user.findUnique({
    where: { username: user.username },
  });

  if (existingUser) return { data: null, error: 'User already exists' };

  const createdUser = prisma.user.create({
    data: user,
  });

  return { data: createdUser, error: null };
}
