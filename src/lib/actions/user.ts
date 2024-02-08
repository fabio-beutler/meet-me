'use server';

import { cookies } from 'next/headers';
import { z } from 'zod';

import { prisma } from '@/lib/prisma';
import { userSchema } from '@/lib/validations/user';

export async function createUser(user: z.infer<typeof userSchema>) {
  const existingUser = await prisma.user.findUnique({
    where: { username: user.username },
  });

  if (existingUser) return { data: null, error: 'Usuário já cadastrado' };

  const createdUser = await prisma.user.create({
    data: user,
  });

  cookies().set('@meetMe:userId', createdUser.id, {
    httpOnly: true,
    maxAge: 60 * 60 * 24 * 7, // 1 week
  });

  return { data: createdUser, error: null };
}
