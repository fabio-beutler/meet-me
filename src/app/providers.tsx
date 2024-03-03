'use client';

import { setDefaultOptions } from 'date-fns';
import { ptBR } from 'date-fns/locale';
import { SessionProvider } from 'next-auth/react';
import React from 'react';

import { ThemeProvider } from '@/components/theme-provider';

export function Providers({ children }: { children: React.ReactNode }) {
  setDefaultOptions({ locale: ptBR });
  return (
    <ThemeProvider
      attribute="class"
      defaultTheme="system"
      enableSystem
      disableTransitionOnChange
    >
      <SessionProvider>{children}</SessionProvider>
    </ThemeProvider>
  );
}
