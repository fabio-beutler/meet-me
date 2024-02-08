'use client';

import { ArrowRight, Check } from 'lucide-react';
import { signIn, signOut, useSession } from 'next-auth/react';

import { Box } from '@/components/ui/box';
import { Button } from '@/components/ui/button';

export function ConnectGoogleBox() {
  const session = useSession();
  console.log(session);

  return (
    <Box className="space-y-4 border">
      <div className="flex items-center justify-between rounded-md border border-muted-foreground/30 px-6 py-4">
        <p>Google Calendar</p>
        {session.status === 'authenticated' ? (
          <Button
            type="button"
            variant="secondary"
            size="sm"
            className="border border-secondary-foreground hover:bg-secondary-foreground hover:text-secondary"
            onClick={() => signOut()}
          >
            Conectado
            <Check className="ml-2 size-4" />
          </Button>
        ) : (
          <Button
            type="button"
            variant="secondary"
            size="sm"
            className="border border-secondary-foreground hover:bg-secondary-foreground hover:text-secondary"
            onClick={() => signIn('google')}
          >
            Conectar
            <ArrowRight className="ml-2 size-4" />
          </Button>
        )}
      </div>
      <Button type="submit" className="w-full">
        Próximo passo
        <ArrowRight className="ml-2 size-4" />
      </Button>
    </Box>
  );
}
