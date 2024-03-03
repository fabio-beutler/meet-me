'use server';

import { cookies } from 'next/headers';
import { z } from 'zod';

import { auth } from '@/lib/auth';
import { prisma } from '@/lib/prisma';
import { updateProfileSchema, userSchema } from '@/lib/validations/user';

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

export async function updateUser(values: z.infer<typeof updateProfileSchema>) {
  const session = await auth();

  if (!session) {
    return { data: null, error: 'Usuário não autenticado' };
  }

  const updatedUser = await prisma.user.update({
    where: { id: session.user.id },
    data: values,
  });

  return { data: updatedUser, error: null };
}
