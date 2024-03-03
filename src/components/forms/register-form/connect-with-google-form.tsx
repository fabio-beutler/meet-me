import Image from 'next/image';

import { Button } from '@/components/ui/button';
import { auth, signIn, signOut } from '@/lib/auth';

export async function ConnectWithGoogleForm() {
  const session = await auth();

  if (!session) {
    return (
      <form
        action={async () => {
          'use server';
          await signIn('google');
        }}
      >
        <Button type="submit" variant="outline" className="flex items-center gap-2">
          <Image
            src="/google-logo.webp"
            alt="Google Logo"
            width={40}
            height={40}
            className="h-full w-full"
          />
          Continuar com Google
        </Button>
      </form>
    );
  }

  return (
    <form
      action={async () => {
        'use server';
        await signOut();
      }}
    >
      <Button type="submit" variant="default">
        sair
      </Button>
    </form>
  );
}
