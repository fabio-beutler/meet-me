import { Metadata } from 'next';
import { notFound } from 'next/navigation';

import { ScheduleForm } from '@/components/forms/schedule/schedule-form';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { prisma } from '@/lib/prisma';

interface ScheduleUserCalendarProps {
  params: {
    username: string;
  };
}

export async function generateMetadata({
  params,
}: ScheduleUserCalendarProps): Promise<Metadata> {
  const user = await prisma.user.findUnique({ where: { username: params.username } });
  if (!user) {
    return notFound();
  }
  return {
    title: `Agendar com ${user.name} | Meet Me`,
  };
}

export default async function ScheduleUserCalendarPage(props: ScheduleUserCalendarProps) {
  const user = await prisma.user.findUnique({
    where: {
      username: props.params.username,
    },
  });

  if (!user) {
    return notFound();
  }

  const userInitials =
    user.name
      .split(' ')
      .map((word) => word[0])
      .join('') || '';

  return (
    <main className="mx-auto max-w-[852px] px-4 pb-4 pt-20">
      <header className="flex flex-col items-center">
        <Avatar className="size-20">
          <AvatarImage
            src={user.avatar_url ?? undefined}
            alt={`Foto de perfil de ${user.name}`}
          />

          <AvatarFallback className="bg-primary-foreground text-2xl">
            {userInitials}
          </AvatarFallback>
        </Avatar>
        <h1 className="mt-2 text-2xl font-bold leading-relaxed tracking-wide">
          {user.name}
        </h1>
        <p className="text-lg text-muted-foreground">{user.bio}</p>
      </header>

      <div className="mx-auto mb-0 mt-6">
        <ScheduleForm />
      </div>
    </main>
  );
}
