'use server';

import { z } from 'zod';

import { prisma } from '@/lib/prisma';
import { userSchema } from '@/lib/validations/user';

export async function createUser(user: z.infer<typeof userSchema>) {
  const createdUser = await prisma.user.create({
    data: user,
  });
  return createdUser;
}
