'use client';

import { setDefaultOptions } from 'date-fns';
import { ptBR } from 'date-fns/locale';
import { SessionProvider } from 'next-auth/react';
import React from 'react';

export function Providers({ children }: { children: React.ReactNode }) {
  setDefaultOptions({ locale: ptBR });
  return <SessionProvider>{children}</SessionProvider>;
}
