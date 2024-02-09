'use client';

import { ArrowRight, Check } from 'lucide-react';
import { useSearchParams } from 'next/navigation';
import { signIn, signOut, useSession } from 'next-auth/react';

import { Box } from '@/components/ui/box';
import { Button } from '@/components/ui/button';

export function ConnectGoogleBox() {
  const session = useSession();
  const searchParams = useSearchParams();
  const hasAuthError = searchParams.get('error') === 'permissions';
  const isSignedIn = session.status === 'authenticated';

  return (
    <Box className="space-y-4 border">
      <div className="flex items-center justify-between rounded-md border border-muted-foreground/30 px-6 py-4">
        <p>Google Calendar</p>
        {isSignedIn ? (
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
      {hasAuthError && (
        <p className="text-sm text-red-400">
          Falha ao se conectar ao Google, verifique se você habilitou as permissão de
          acesso ao Google Calendar
        </p>
      )}
      <Button type="submit" className="w-full" disabled={!isSignedIn}>
        Próximo passo
        <ArrowRight className="ml-2 size-4" />
      </Button>
    </Box>
  );
}
