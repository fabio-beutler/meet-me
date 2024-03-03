'use server';

import { z } from 'zod';

import { auth } from '@/lib/auth';
import { prisma } from '@/lib/prisma';
import { updateProfileSchema } from '@/lib/validations/user';

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
