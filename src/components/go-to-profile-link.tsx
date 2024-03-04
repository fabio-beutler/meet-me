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

export function GoToProfileLink({ session }: GoToProfileLinkProps) {
  const pathname = usePathname();

  if (pathname.startsWith('/profile')) return null;

  return (
    <Button asChild variant="outline" className="text-base">
      <Link href={`/profile/${session.user.username}`}>Perfil</Link>
    </Button>
  );
}
