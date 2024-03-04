import React from 'react';

import { ConnectWithGoogleForm } from '@/components/forms/register-form/connect-with-google-form';
import { GoToProfileLink } from '@/components/go-to-profile-link';
import { ThemeSwitcherButton } from '@/components/theme-switcher-button';
import { auth } from '@/lib/auth';

export async function FloatingHeader() {
  const session = await auth();

  return (
    <div className="fixed left-0 right-0 top-0 flex h-16 items-center justify-end gap-2 bg-background/70 px-4 md:bg-transparent">
      {session && <GoToProfileLink session={session} />}
      {session && <ConnectWithGoogleForm />}
      <ThemeSwitcherButton />
    </div>
  );
}
