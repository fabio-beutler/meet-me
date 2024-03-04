'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

import { Button } from '@/components/ui/button';

interface GoToProfileLinkProps {
  session: {
    user: {
      username: string;
    };
  };
}

export function ProfileCalendarSwitchLink({ session }: GoToProfileLinkProps) {
  const pathname = usePathname();

  if (pathname.startsWith(`/profile`))
    return (
      <Button asChild variant="default" className="text-base">
        <Link href={`/calendar/${session.user.username}`}>Calendário</Link>
      </Button>
    );

  if (pathname.startsWith(`/calendar`))
    return (
      <Button asChild variant="outline" className="text-base">
        <Link href={`/profile/${session.user.username}`}>Perfil</Link>
      </Button>
    );

  return null;
}
