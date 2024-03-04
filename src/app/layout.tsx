import './globals.css';

import type { Metadata } from 'next';
import { Roboto_Flex } from 'next/font/google';
import React from 'react';

import { Providers } from '@/app/providers';
import { FloatingHeader } from '@/components/floating-header';
import { Toaster } from '@/components/ui/sonner';
import { cn } from '@/lib/utils';

const roboto = Roboto_Flex({ subsets: ['latin'], variable: '--roboto' });

export const metadata: Metadata = {
  title: 'Meet Me',
  description:
    'Conecte seu calendário e permita que as pessoas marquem agendamentos no seu tempo livre',
  openGraph: {
    type: 'website',
    locale: 'pt_BR',
    url: 'https://meetme.vercel.app',
    siteName: 'Meet Me',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR" suppressHydrationWarning>
      <body
        className={cn(
          'min-h-screen bg-background font-sans text-foreground antialiased',
          roboto.variable,
        )}
      >
        <Providers>
          {children}
          <Toaster richColors />
          <FloatingHeader />
        </Providers>
      </body>
    </html>
  );
}
